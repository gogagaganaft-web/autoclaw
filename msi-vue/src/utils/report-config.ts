// Нормализация config отчёта: поддерживаются ДВЕ схемы (гибрид).
//
//  1. Легаси (формат оригинала MSI): config.fields.grid/pivot (+ map/chart),
//     config.filters — объект; плейсхолдеры в SQL одинарные {name}.
//  2. Новая: config.views[] (grid/pivot/map), config.filters — массив описаний.
//
// Модуль приводит обе схемы к общим структурам, которые использует страница
// отчёта (/report/:key) и панель фильтров.

import type { ReportConfig } from '@/services/reports-api';
import { DEFAULT_FOND_ROOT, FOND_TREE_SQL } from '@/utils/fond-tree';
import { viewColumnsFromFields, viewPivotFieldsFromFields } from '@/utils/report-views';
import { monthItems } from '@/utils/filter-values';

export type FilterKind =
  | 'multi'
  | 'multiList'
  | 'select'
  | 'dateRange'
  | 'date'
  | 'number'
  | 'bool'
  | 'text'
  | 'tree'
  | 'months'
  | 'monthRange'
  | 'rangeDays'
  | 'numberRange'
  | 'buttons';

export interface FilterItem { id: unknown; name: string }

export interface FilterField {
  field: string;
  label: string;
  kind: FilterKind;
  items: FilterItem[];
  placeholder?: string;
  /** Для kind='tree' (hierarchical-list): MS SQL-база дерева. */
  dbName?: string;
  /** Для kind='tree': корневой ID иерархии. */
  rootValue?: number;
  /** Для kind='tree': SQL уровня дерева с плейсхолдером {finalIds}. */
  treeSql?: string;
  /** Исходный тип панели (env.js / config.filters): multi-select-list, hr-fond, … */
  type?: string;
  /** formOrder — порядок вывода в форме. */
  order?: number;
  /** formColSpan — сколько колонок занимает поле (форма из двух колонок). */
  span?: number;
  /** formColIndex — с какой колонки начинается (0..1). */
  col?: number;
  /** itemsQuery — SQL загрузки элементов для multi-select-list / hr-fond. */
  itemsQuery?: string;
  /** Множественный выбор. */
  multiple?: boolean;
  /** Поиск по элементам списка (TagBox). */
  searchable?: boolean;
  /** Строка поиска: список с поиском и деревья справочников. */
  search?: boolean;
  /** Режим поиска dxList: contains / startswith / equals. */
  searchMode?: string;
  /** Поля, по которым ищет dxList (по умолчанию name). */
  searchExpr?: string[];
  /** Задержка поиска, мс. */
  searchTimeout?: number;
  /** Placeholder строки поиска. */
  searchPlaceholder?: string;
  /** Режим «выбрать всё»: allPages / page. */
  selectAllMode?: string;
  /** Догрузка страниц списка: scrollBottom / nextButton. */
  pageLoadMode?: string;
  /** Полоса прокрутки списка: onHover / always / never. */
  showScrollbar?: string;
  /** Значение по умолчанию. */
  defaultValue?: unknown;
  /** preload: true — тянуть дерево целиком (hr-fond). */
  preload?: boolean;
  /** Ручные границы для dateRange / range-days / range-number (ISO): приоритет над вычисляемыми. */
  minDate?: string;
  maxDate?: string;
  /** Источник элементов списка: list, query, months, databases. */
  itemsKind?: string;
  /** Признак баз для itemsKind='databases': UL — ЮЛ, FL — ФЛ. */
  dbSuffix?: string;
  /** Границы числовой шкалы (range-number): в SQL не подставляются. */
  min?: number;
  max?: number;
  step?: number;
  height?: number;
  /** dynamicDefault: подставлять значение от текущей даты. */
  dynamicDefault?: boolean;
  /** displayFormat из env.js (например «MMM yyyy»). */
  displayFormat?: string;
  /** pickerType и calendarOptions — режим календаря для диапазона месяцев. */
  pickerType?: string;
  calendarOptions?: Record<string, unknown>;
  /** maxRange для range-months (например { months: 12 }). */
  maxRange?: Record<string, number>;
  /** Колонки значения и подписи для itemsQuery (multi-select-list). */
  idField?: string;
  nameField?: string;
  /** Плейсхолдеры SQL (контракт с запросом): ['m_start','m_end'] или ['fond']. */
  var?: string[];
}

export type ModeType = 'grid' | 'pivot' | 'map' | 'dashboard';

export interface ModeTab { key: string; title: string; type: ModeType }

export interface MapSettings {
  latField: string;
  lonField: string;
  titleField: string;
  valueField: string;
  zoom: number;
  center?: [number, number];
}

export const DB_FIELDS = ['БД_ЮЛ', 'БД_ФЛ'];

const MODE_TITLES: Record<ModeType, string> = {
  pivot: 'СВОД',
  grid: 'ТАБЛИЦА',
  dashboard: 'ИНФОГРАФИКА',
  map: 'КАРТА',
};

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

// DevExtreme ломается на прокси-объектах Vue: если в сводную таблицу передать
// поля прямо из реактивного config, они не раскладываются по областям —
// остаются пустые «Drop ... Fields Here» и ни одной ячейки данных (в MSI
// конфиг приходит из обычного JSON, поэтому там этой проблемы нет). Отдаём
// виджетам обычные объекты; функции (selector и т.п.) сохраняем как есть.
export function toPlainDeep<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => toPlainDeep(item)) as unknown as T;
  }
  if (value instanceof Date || typeof value === 'function') {
    return value;
  }
  if (value && typeof value === 'object') {
    const proto = Object.getPrototypeOf(value);
    if (proto === Object.prototype || proto === null) {
      const out: Record<string, unknown> = {};
      for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
        out[key] = toPlainDeep(item);
      }
      return out as T;
    }
  }
  return value;
}

function toItemList(raw: unknown): FilterItem[] {
  return asArray(raw).map((it) => {
    if (it && typeof it === 'object') {
      const obj = it as Record<string, unknown>;
      const id = obj.id ?? obj.value;
      const name = obj.name ?? obj.text ?? String(id ?? '');
      return { id, name: String(name) };
    }
    return { id: it, name: String(it) };
  });
}

function isLegacyFilters(filters: unknown): boolean {
  return !!filters && typeof filters === 'object' && !Array.isArray(filters);
}

// ─── Вкладки (режимы отображения) ────────────────────────────────────────────

export function buildModes(config: ReportConfig): ModeTab[] {
  // config.views в боевом каталоге — массив строк: ["pivot", "grid"].
  // Раньше здесь ждали объекты { type }, поэтому такие отчёты оставались
  // без режимов и показывали «Режим «—» пока не поддерживается».
  const views = asArray(config.views) as unknown[];
  if (views.length) {
    const tabs = views
      .map((raw, i): ModeTab | null => {
        if (typeof raw === 'string') {
          const type = raw as ModeType;
          return { key: raw, title: MODE_TITLES[type] || raw, type };
        }
        const rec = asRecord(raw);
        const type = typeof rec.type === 'string' ? (rec.type as ModeType) : null;
        if (!type) return null;
        return {
          key: String(rec.key || type || i),
          title: String(rec.title || MODE_TITLES[type] || type),
          type,
        };
      })
      .filter((tab): tab is ModeTab => tab !== null);
    if (tabs.length) return tabs;
  }

  // Легаси: режимы по наличию секций fields (порядок как в оригинале).
  const fields = asRecord(config.fields);
  const tabs: ModeTab[] = [];
  if (asArray(fields.pivot).length) tabs.push({ key: 'pivot', title: MODE_TITLES.pivot, type: 'pivot' });
  if (asArray(fields.grid).length) tabs.push({ key: 'grid', title: MODE_TITLES.grid, type: 'grid' });
  if (fields.chart !== undefined) tabs.push({ key: 'dashboard', title: MODE_TITLES.dashboard, type: 'dashboard' });
  if (fields.map !== undefined) tabs.push({ key: 'map', title: MODE_TITLES.map, type: 'map' });
  if (!tabs.length) tabs.push({ key: 'grid', title: MODE_TITLES.grid, type: 'grid' });
  return tabs;
}


export function defaultModeIndex(config: ReportConfig, modes: ModeTab[]): number {
  const wanted = config.defaultView;
  if (typeof wanted === 'string') {
    const idx = modes.findIndex((m) => m.key === wanted || m.type === wanted);
    if (idx >= 0) return idx;
  }
  return 0;
}

// ─── Колонки / поля визуализаций ─────────────────────────────────────────────

// Колонки конфига, которых нет в результате запроса, всегда пустые (в MSI такие
// столбцы рисуются пустыми). Убираем их — включая пустые группы, — чтобы в
// сетке не оставалось «мёртвых» столбцов. Колонки без dataField (например, с
// calculateCellValue или caption-группой) сохраняются.
function pruneColumns(
  columns: Record<string, unknown>[],
  dataColumns: string[],
): Record<string, unknown>[] {
  const known = new Set(dataColumns);
  const result: Record<string, unknown>[] = [];

  for (const column of columns) {
    const nested = asArray(column.columns) as Record<string, unknown>[];
    if (nested.length) {
      const children = pruneColumns(nested, dataColumns);
      if (children.length) result.push({ ...column, columns: children });
      continue;
    }
    const field = column.dataField;
    if (typeof field === 'string' && field !== '' && !known.has(field)) continue;
    result.push(column);
  }

  return result;
}

export function gridColumnsFor(
  config: ReportConfig,
  mode: ModeTab,
  dataColumns: string[],
): Record<string, unknown>[] {
  const views = asArray(config.views) as Record<string, unknown>[];
  const view = views.find((v) => v.key === mode.key || v.type === mode.type);

  // Новая схема: view.fields с видимостью, подписью, шириной и форматом.
  const viewFields = asArray(view?.fields) as Record<string, unknown>[];
  if (viewFields.length) {
    const fromFields = viewColumnsFromFields(
      viewFields.map((field) => ({
        name: String(field.name ?? field.dataField ?? ''),
        caption: String(field.caption ?? field.name ?? ''),
        visible: field.visible !== false,
        width: typeof field.width === 'number' ? field.width : undefined,
        format: typeof field.format === 'string' ? field.format : undefined,
      })).filter((field) => field.name !== ''),
      dataColumns,
    );
    if (fromFields.length) return fromFields;
  }

  const columns = asArray(view?.columns) as Record<string, unknown>[];
  if (columns.length) return dataColumns.length ? pruneColumns(columns, dataColumns) : columns;

  const legacy = asArray(asRecord(config.fields).grid) as Record<string, unknown>[];
  if (legacy.length) return dataColumns.length ? pruneColumns(legacy, dataColumns) : legacy;

  return dataColumns.map((col) => ({ dataField: col, caption: col }));
}

// Поле свода без dataField не адресует данные: DevExtreme показывает вместо
// значения весь объект строки («[object Object]»), а штатная детализация по
// такому пути возвращает пустой результат (в ОРН_5 так задано поле «Услуга»,
// хотя столбца «Услуга» в результате запроса нет). Такие поля отбрасываем —
// как pruneColumns отбрасывает колонки грида, которых нет в данных.
// Уровни группировки (groupName/groupIndex) не трогаем: dataField у них
// наследуется от исходного поля.
function sanitizePivotFields(
  fields: Record<string, unknown>[],
): Record<string, unknown>[] {
  return fields.filter((field) => {
    if (!field || typeof field !== 'object') return false;
    if (typeof field.dataField === 'string' && field.dataField !== '') return true;
    return !!field.groupName || field.groupIndex !== undefined;
  });
}

export function pivotFieldsFor(config: ReportConfig, mode: ModeTab): Record<string, unknown>[] {
  const views = asArray(config.views) as Record<string, unknown>[];
  const view = views.find((v) => v.key === mode.key || v.type === mode.type);
  const fields = asArray(view?.fields) as Record<string, unknown>[];

  if (fields.length) {
    // Поля новой схемы: область rows/columns/… и формат из редактора видов.
    const mapped = viewPivotFieldsFromFields(fields.map((field) => ({
      name: String(field.name ?? field.dataField ?? ''),
      caption: String(field.caption ?? field.name ?? ''),
      visible: field.visible !== false,
      format: typeof field.format === 'string' ? field.format : undefined,
      area: typeof field.area === 'string' ? field.area : undefined,
    })).filter((field) => field.name !== ''));
    if (mapped.length) return sanitizePivotFields(mapped);
    return sanitizePivotFields(fields);
  }

  const legacy = asArray(asRecord(config.fields).pivot) as Record<string, unknown>[];
  return sanitizePivotFields(legacy);
}

export function mapSettingsFor(config: ReportConfig, mode: ModeTab): MapSettings {
  const views = asArray(config.views) as Record<string, unknown>[];
  const view = (views.find((v) => v.key === mode.key || v.type === mode.type) || {}) as Record<string, unknown>;
  const legacy = asRecord(asRecord(config.fields).map);

  return {
    latField: String(view.latitudeField || legacy.latitudeField || legacy.latField || ''),
    lonField: String(view.longitudeField || legacy.longitudeField || legacy.lonField || ''),
    titleField: String(view.titleField || legacy.titleField || legacy.nameField || ''),
    valueField: String(view.valueField || legacy.valueField || ''),
    zoom: Number(view.zoom || legacy.zoom || 5) || 5,
    center: (view.center || legacy.center) as [number, number] | undefined,
  };
}

// ─── Панель фильтров ─────────────────────────────────────────────────────────

function kindFromToolbarType(type: string): FilterKind {
  switch (type) {
    case 'multi-select-list':
      return 'multiList';
    case 'multi-select':
    case 'multi-select-fl':
      return 'multi';
    case 'select':
      return 'select';
    case 'button-group':
      return 'buttons';
    case 'dateRange':
      return 'dateRange';
    case 'dateRangeMonths':
      return 'monthRange';
    case 'range-months':
      return 'months';
    case 'range-days':
      return 'rangeDays';
    case 'range-number':
      return 'numberRange';
    case 'hierarchical-list':
    case 'hr-fond':
      return 'tree';
    default:
      return 'text';
  }
}

function kindFromSpecType(type: string | undefined): FilterKind {
  switch ((type || '').toLowerCase()) {
    case 'bool':
    case 'boolean':
    case 'check':
      return 'bool';
    case 'number':
    case 'int':
    case 'integer':
    case 'float':
    case 'decimal':
      return 'number';
    case 'date':
    case 'datetime':
      return 'date';
    case 'list':
    case 'stringlist':
    case 'numberlist':
    case 'intlist':
      return 'multi';
    default:
      return 'text';
  }
}

function dbField(field: string, databases: FilterItem[], label: string, placeholder?: string): FilterField {
  return {
    field,
    label,
    kind: 'multi',
    placeholder,
    items: databases.map((d) => ({ id: d.id, name: d.name })),
  };
}

/**
 * Подключения для БД_ЮЛ / БД_ФЛ.
 *
 * Список приходит из env служб (`/api/meta/databases`), признак — суффикс
 * ключа: DB1UL → ЮЛ, DB1FL → ФЛ. Без отбора в оба фильтра попадали все базы,
 * и БД_ФЛ показывал базы ЮЛ.
 */
function dbFieldFor(field: string, databases: FilterItem[], def: Record<string, unknown>, isFl: boolean): FilterField {
  const suffix = String(def.dbSuffix || (isFl ? 'FL' : 'UL')).toUpperCase();
  const own = databases.filter((d) => String(d.id ?? '').toUpperCase().endsWith(suffix));
  const placeholder = def.placeholder ? String(def.placeholder) : undefined;
  const label = String(def.label || (isFl ? 'Подключения ФЛ' : 'Подключения ЮЛ'));
  return dbField(field, own.length ? own : databases, label, placeholder);
}

function fieldFromToolbar(
  field: string,
  def: Record<string, unknown>,
  databases: FilterItem[],
  fondSql?: string,
): FilterField {
  if (field === 'БД_ЮЛ' || field === 'БД_ФЛ') {
    return dbFieldFor(field, databases, def, field === 'БД_ФЛ');
  }
  const kind = kindFromToolbarType(String(def.type || 'text'));
  const base: FilterField = {
    field,
    label: String(def.label || field),
    kind,
    items: toItemList(def.items),
    placeholder: def.placeholder ? String(def.placeholder) : undefined,
  };
  base.type = String(def.type || '');
  base.order = def.formOrder !== undefined ? Number(def.formOrder) : undefined;
  base.span = def.formColSpan !== undefined ? Number(def.formColSpan) : undefined;
  base.col = def.formColIndex !== undefined ? Number(def.formColIndex) : undefined;
  base.itemsQuery = def.itemsQuery ? String(def.itemsQuery) : undefined;
  // БД справочника нужна всем серверным спискам (УК, ПОСТ, УКП), не только
  // дереву фонда: без неё панель фильтров не выполняет itemsQuery.
  base.dbName = def.dbName ? String(def.dbName) : '';
  base.defaultValue = def.default;
  base.multiple = /multi|hierarchical|hr-fond/i.test(base.type);
  base.searchable = def.searchEnabled === true || kind === 'multi';
  // Строка поиска: список с поиском и деревья — как в боевом FormItemBuilder
  // (dxList searchEnabled, у дерева filterRow). По умолчанию включена.
  if (kind === 'multiList' || kind === 'tree') {
    base.search = def.searchEnabled !== false;
  }
  if (kind === 'multiList') {
    base.searchMode = def.searchMode ? String(def.searchMode) : undefined;
    base.searchExpr = Array.isArray(def.searchExpr)
      ? (def.searchExpr as unknown[]).map(String)
      : undefined;
    base.searchTimeout = def.searchTimeout !== undefined ? Number(def.searchTimeout) : undefined;
    base.searchPlaceholder = def.searchPlaceholder ? String(def.searchPlaceholder) : undefined;
    base.selectAllMode = def.selectAllMode ? String(def.selectAllMode) : undefined;
    base.pageLoadMode = def.pageLoadMode ? String(def.pageLoadMode) : undefined;
    base.showScrollbar = def.showScrollbar ? String(def.showScrollbar) : undefined;
  }
  base.preload = def.preload === true;
  base.minDate = def.minDate ? String(def.minDate).slice(0, 10) : undefined;
  base.maxDate = def.maxDate ? String(def.maxDate).slice(0, 10) : undefined;
  base.dynamicDefault = def.dynamicDefault === true;
  base.displayFormat = def.displayFormat ? String(def.displayFormat) : undefined;
  base.pickerType = def.pickerType ? String(def.pickerType) : undefined;
  base.calendarOptions = def.calendarOptions as Record<string, unknown> | undefined;
  base.maxRange = def.maxRange as Record<string, number> | undefined;
  base.idField = def.idField ? String(def.idField) : 'ID';
  base.nameField = def.nameField ? String(def.nameField) : '';
  base.itemsKind = def.itemsKind ? String(def.itemsKind) : undefined;
  base.dbSuffix = def.dbSuffix ? String(def.dbSuffix) : undefined;
  if (Array.isArray(def.var) && def.var.length) {
    base.var = (def.var as unknown[]).map(String).filter(Boolean);
  }
  // Источник «Подключения env ЮЛ/ФЛ»: элементы — базы из env по признаку.
  // Работает для списков и для тегов подключений (multi-select*).
  const kindRaw = String(def.itemsKind ?? '');
  if (kindRaw === 'databases-ul' || kindRaw === 'databases-fl' || kindRaw === 'databases') {
    const suffix = kindRaw === 'databases' ? '' : (kindRaw === 'databases-fl' ? 'FL' : 'UL');
    const own = suffix
      ? databases.filter((d) => String(d.id ?? '').toUpperCase().endsWith(suffix))
      : databases;
    base.items = own.length ? own : databases;
    if (suffix) base.dbSuffix = suffix;
  }
  if (kind === 'multiList') {
    base.multiple = def.multiple !== false;
  }
  base.min = def.min !== undefined && def.min !== null ? Number(def.min) : undefined;
  base.max = def.max !== undefined && def.max !== null ? Number(def.max) : undefined;
  base.step = def.step !== undefined && def.step !== null ? Number(def.step) : undefined;
  base.height = def.height !== undefined && def.height !== null ? Number(def.height) : undefined;

  if (kind === 'tree') {
    base.rootValue = def.rootValue !== undefined ? Number(def.rootValue) : DEFAULT_FOND_ROOT;
    base.treeSql = (def.itemsQuery ? String(def.itemsQuery) : '') || fondSql || FOND_TREE_SQL;
  }
  return base;
}

/**
 * Строит список фильтров панели — ровно то, что объявил сам отчёт в
 * `config.filters` (легаси-объект `{поле}` или массив `{name}`).
 *
 * БД_ЮЛ/БД_ФЛ не добавляются автоматически: база для запроса подставляется
 * без участия пользователя (см. `buildPayload` в report-view). Показать выбор
 * баз можно, только объявив эти поля в `config.filters` отчёта.
 */
export function buildFilterFields(
  config: ReportConfig,
  toolbar: Record<string, unknown>[],
  databases: FilterItem[],
  fondSql?: string,
): FilterField[] {
  const defs = new Map<string, Record<string, unknown>>();
  for (const item of toolbar) {
    const field = item?.field;
    if (typeof field === 'string') defs.set(field, item);
  }

  const result: FilterField[] = [];
  const seen = new Set<string>();

  const specs = asArray(config.filters);
  if (specs.length) {
    for (const raw of specs) {
      const spec = asRecord(raw);
      const name = String(spec.name || '');
      if (!name || seen.has(name)) continue;
      seen.add(name);
      result.push({
        field: name,
        label: String(spec.label || name),
        kind: kindFromSpecType(spec.type as string | undefined),
        items: toItemsFromSpec(spec),
      });
    }
  } else if (isLegacyFilters(config.filters)) {
    const filters = asRecord(config.filters);
    for (const field of Object.keys(filters)) {
      if (seen.has(field)) continue;
      seen.add(field);
      result.push(fieldFromToolbar(field, defs.get(field) || {}, databases, fondSql));
    }
  }

  // dynamicDefault у списков: месяцы текущего и прошлого года, как в боевом
  // buildFormItems. Иначе пользователь видит пустой список и выбрать нечего.
  for (const field of result) {
    const months = field.itemsKind === 'months';
    if (!months && !field.dynamicDefault) continue;
    if (field.kind !== 'multi' && field.kind !== 'multiList' && field.kind !== 'select') continue;
    if ((field.items ?? []).length || field.itemsQuery) continue;
    field.items = monthItems() as unknown as FilterItem[];
  }

  return result;
}

function toItemsFromSpec(spec: Record<string, unknown>): FilterItem[] {
  const options = spec.options ?? spec.items;
  return options ? toItemList(options) : [];
}

// ─── Начальные значения фильтров ─────────────────────────────────────────────

function normalizeRange(value: unknown): { start: string; end: string } {
  const obj = asRecord(value);
  const start = obj.start ?? obj.Начало ?? '';
  const end = obj.end ?? obj.Окончание ?? '';
  return { start: String(start).slice(0, 10), end: String(end).slice(0, 10) };
}

export function initialFilterValues(
  fields: FilterField[],
  config: ReportConfig,
): Record<string, unknown> {
  const values: Record<string, unknown> = {};

  // Значения по умолчанию из config.filters (обе схемы).
  const specs = asArray(config.filters);
  if (specs.length) {
    for (const raw of specs) {
      const spec = asRecord(raw);
      const name = String(spec.name || '');
      if (name && spec.default !== undefined && spec.default !== null) {
        values[name] = spec.default;
      }
    }
  } else if (isLegacyFilters(config.filters)) {
    const filters = asRecord(config.filters);
    for (const [name, value] of Object.entries(filters)) {
      if (value === null || value === undefined) continue;
      values[name] = value;
    }
  }

  // Приводим значения к ожидаемому виду для каждого контрола.
  for (const field of fields) {
    const current = values[field.field];
    if (field.kind === 'dateRange' || field.kind === 'date') {
      if (field.kind === 'dateRange') {
        // Ручные minDate/maxDate главнее вычисляемых: значение обрезаем по ним.
        const min = field.minDate || '';
        const max = field.maxDate || '';
        let value = normalizeRange(current);

        if (!value.start && !value.end && field.dynamicDefault) {
          const now = new Date();
          const pad = (n: number) => String(n).padStart(2, '0');
          const monthStart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`;
          value = { start: monthStart, end: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` };
        }

        if (min && value.start && value.start < min) value.start = min;
        if (max && value.end && value.end > max) value.end = max;
        if (min && value.end && value.end < min) value = { start: min, end: min };
        if (max && value.start && value.start > max) value = { start: max, end: max };

        values[field.field] = value;
      } else {
        values[field.field] = current ? String(current).slice(0, 10) : '';
      }
    } else if (field.kind === 'multi') {
      if (current === undefined || current === null || current === '') values[field.field] = [];
      else if (!Array.isArray(current)) values[field.field] = [current];
    } else if (field.kind === 'months' || field.kind === 'monthRange') {
      // Как в боевом createDateRangeMonthsItem: границы берём из
      // calendarOptions.min/max, по умолчанию 2025-01-01 … 2025-12-01.
      // Значение приводим к началу месяца, границы меняем местами при инверсии.
      const range = normalizeRange(current);
      if (!range.start || !range.end) {
        const opts = (field.calendarOptions ?? {}) as Record<string, unknown>;
        // По умолчанию текущий год и предыдущий: 2025-01 … 2026-12.
        const thisYear = new Date().getFullYear();
        const minDate = opts.min ? new Date(String(opts.min)) : new Date(thisYear - 1, 0, 1);
        const maxDate = opts.max ? new Date(String(opts.max)) : new Date(thisYear, 11, 1);
        const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
        let start = startOfMonth(minDate);
        let end = startOfMonth(maxDate);
        if (start > end) [start, end] = [end, start];
        const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
        values[field.field] = { start: iso(start), end: iso(end) };
      } else {
        values[field.field] = range;
      }
    } else if (field.kind === 'select'
      && (current === undefined || current === null || current === ''
        || (Array.isArray(current) && current.length === 0))) {
      // select без значения и без справочника («РасчетыйМесяц»): прошлый месяц,
      // как на проде. Пользователь может переопределить значение вручную.
      if (!(field.items ?? []).length && !field.itemsQuery && /месяц/i.test(`${field.field} ${field.label}`)) {
        const now = new Date();
        const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        values[field.field] = prev.getFullYear() * 10000 + (prev.getMonth() + 1) * 100 + 1;
      }
    } else if (field.kind === 'buttons') {
      values[field.field] = current ?? null;
    } else if (field.kind === 'tree') {
      if (current === undefined || current === null || current === '') values[field.field] = [];
      else if (Array.isArray(current)) values[field.field] = current;
      else values[field.field] = String(current).split(',').map((s) => Number(s.trim())).filter((n) => Number.isFinite(n));
    } else if (values[field.field] === undefined) {
      values[field.field] = null;
    }
  }

  // Боевой FormItemBuilder синхронизирует ПериодМесяцы и Период: выставили один —
  // второй получает то же значение (сравнение по ISO-датам).
  const periodFields = ['ПериодМесяцы', 'Период'];
  const source = periodFields.find((name) => {
    const v = values[name] as { start?: string; end?: string } | undefined;
    return v && v.start && v.end;
  });
  if (source) {
    const src = values[source] as { start: string; end: string };
    for (const name of periodFields) {
      if (name === source) continue;
      if (name in values) values[name] = { start: src.start, end: src.end };
    }
  }

  return values;
}
