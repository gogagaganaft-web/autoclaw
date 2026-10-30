/**
 * Виды просмотра отчёта и их поля.
 *
 * В боевом каталоге `config.views` — массив строк (`["pivot","grid"]`). Новая
 * схема добавляет на каждый вид набор полей, поэтому views нормализуются в
 * объекты. Строки продолжают читаться: старые отчёты не ломаются.
 */

export type ViewType = 'pivot' | 'grid' | 'dashboard' | 'map';

export interface ViewField {
  /** Имя колонки из запроса. */
  name: string;
  caption: string;
  visible: boolean;
  width?: number;
  format?: string;
  /** Только для свода: rows / columns / data / filter. */
  area?: string;
}

export interface ReportViewDef {
  key: string;
  type: ViewType;
  title: string;
  fields: ViewField[];
}

export const VIEW_TITLES: Record<ViewType, string> = {
  pivot: 'СВОД',
  grid: 'ТАБЛИЦА',
  dashboard: 'ИНФОГРАФИКА',
  map: 'КАРТА',
};

export const VIEW_TYPES: ViewType[] = ['pivot', 'grid', 'dashboard', 'map'];

export const AREA_OPTIONS = [
  { value: 'rows', label: 'Строки' },
  { value: 'columns', label: 'Колонки' },
  { value: 'data', label: 'Данные' },
  { value: 'filter', label: 'Фильтр' },
];

function isViewType(value: string): value is ViewType {
  return (VIEW_TYPES as string[]).includes(value);
}

/** Поле из любого источника → ViewField. */
export function normalizeField(raw: unknown): ViewField | null {
  if (!raw || typeof raw !== 'object') return null;
  const rec = raw as Record<string, unknown>;
  const name = String(rec.name ?? rec.dataField ?? '').trim();
  if (!name) return null;

  const field: ViewField = {
    name,
    caption: String(rec.caption ?? name),
    visible: rec.visible !== false,
  };
  if (rec.width !== undefined && rec.width !== null && rec.width !== '') {
    const width = Number(rec.width);
    if (Number.isFinite(width)) field.width = width;
  }
  if (typeof rec.format === 'string' && rec.format) field.format = rec.format;
  if (typeof rec.area === 'string' && rec.area) field.area = rec.area;
  return field;
}

/** views из конфига → объекты; строки старых отчётов тоже понимаются. */
export function normalizeViews(raw: unknown): ReportViewDef[] {
  if (!Array.isArray(raw)) return [];

  const views: ReportViewDef[] = [];
  for (const entry of raw) {
    if (typeof entry === 'string') {
      const type = entry as ViewType;
      views.push({
        key: entry,
        type: isViewType(type) ? type : 'grid',
        title: isViewType(type) ? VIEW_TITLES[type] : entry,
        fields: [],
      });
      continue;
    }

    if (!entry || typeof entry !== 'object') continue;
    const rec = entry as Record<string, unknown>;
    const typeRaw = String(rec.type ?? rec.key ?? '').trim();
    if (!typeRaw) continue;
    const type = isViewType(typeRaw) ? typeRaw : 'grid';
    const fields = Array.isArray(rec.fields)
      ? rec.fields.map(normalizeField).filter((field): field is ViewField => field !== null)
      : [];

    views.push({
      key: String(rec.key ?? typeRaw),
      type,
      title: String(rec.title ?? VIEW_TITLES[type]),
      fields,
    });
  }
  return views;
}

/** Колонки запроса → поля вида: настройки существующих сохраняются. */
export function mergeViewFields(
  columns: Array<{ name: string; caption?: string }>,
  existing: ViewField[],
): ViewField[] {
  const byName = new Map(existing.map((field) => [field.name, field]));
  return columns.map((column) => {
    const found = byName.get(column.name);
    if (found) {
      return { ...found, caption: found.caption || column.caption || column.name };
    }
    return {
      name: column.name,
      caption: column.caption || column.name,
      visible: true,
    };
  });
}

/** Видимые поля в порядке настройки — для отрисовки отчёта. */
export function visibleFields(view: ReportViewDef): ViewField[] {
  return view.fields.filter((field) => field.visible);
}

/** Новый вид с готовым набором полей. */
export function createView(type: ViewType, columns: Array<{ name: string; caption?: string }>): ReportViewDef {
  return {
    key: type,
    type,
    title: VIEW_TITLES[type],
    fields: mergeViewFields(columns, []),
  };
}

/**
 * Формат из редактора видов → формат DevExtreme.
 *
 * Поддерживаются шаблоны чисел («0», «0.00», «#,##0.00») и именованные
 * варианты (percent, currency, date). Неизвестная строка не применяется:
 * лучше показать значение как есть, чем уронить грид.
 */
export function toColumnFormat(format?: string): Record<string, unknown> | undefined {
  const value = (format || '').trim();
  if (!value) return undefined;

  const numeric = /^#?(,?#+)?0(\.(0+))?$/.exec(value);
  if (numeric) {
    const precision = numeric[3] ? numeric[3].length : 0;
    return { type: 'fixedPoint', precision, useThousandsSeparator: value.includes(',') };
  }

  if (value === 'percent') return { type: 'percent', precision: 0 };
  if (value === 'currency') return { type: 'currency', precision: 2 };
  if (value === 'date') return { type: 'date', dateType: 'date' };
  return undefined;
}

/** Область свода в терминах DevExtreme: rows → row. */
export function toPivotArea(area?: string): string | undefined {
  switch (area) {
    case 'rows': return 'row';
    case 'columns': return 'column';
    case 'data': return 'data';
    case 'filter': return 'filter';
    default: return undefined;
  }
}

/**
 * Поля вида → колонки dxDataGrid.
 *
 * Порядок задаёт вид; колонки, которых нет в результате запроса, отбрасываются
 * (как pruneColumns). Если полей нет — возвращается пустой массив, и вызывающий
 * код использует прежнее поведение.
 */
export function viewColumnsFromFields(
  fields: ViewField[],
  dataColumns: string[],
): Record<string, unknown>[] {
  if (!fields.length) return [];

  const available = new Set(dataColumns);
  return fields
    .filter((field) => !dataColumns.length || available.has(field.name))
    .map((field) => {
      const column: Record<string, unknown> = {
        dataField: field.name,
        caption: field.caption || field.name,
        visible: field.visible,
      };
      if (field.width) {
        column.width = field.width;
      }
      const format = toColumnFormat(field.format);
      if (format) {
        column.format = format;
      }
      return column;
    });
}

/** Поля вида → поля dxPivotGrid (с областями). */
export function viewPivotFieldsFromFields(fields: ViewField[]): Record<string, unknown>[] {
  return fields.map((field) => {
    const pivotField: Record<string, unknown> = {
      dataField: field.name,
      caption: field.caption || field.name,
    };
    const area = toPivotArea(field.area);
    if (area) pivotField.area = area;
    const format = toColumnFormat(field.format);
    if (format) pivotField.format = format;
    return pivotField;
  });
}
