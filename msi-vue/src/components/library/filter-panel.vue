<template>
  <div
    class="filter-panel"
    :class="{ 'filter-panel--vertical': vertical }"
  >
    <div
      class="filter-grid"
      :class="{ 'filter-grid--vertical': vertical }"
    >
      <div
        v-for="field in orderedFields"
        :key="field.field"
        class="filter-item"
        :style="itemStyle(field)"
      >
        <label class="filter-label">{{ field.label }}</label>

        <!-- button-group: MSI dxButtonGroup, как остальные контролы панели -->
        <dx-button-group
          v-if="field.kind === 'buttons'"
          :items="field.items"
          key-expr="id"
          display-expr="name"
          :selected-item-keys="groupKeys(field)"
          selection-mode="single"
          @selection-changed="onGroupChanged(field, $event)"
        />

        <!-- range-months / dateRangeMonths: диапазон месяцев -->
        <!-- range-months: ползунок dxRangeSelector со шкалой месяцев, как на проде -->
        <range-months-picker
          v-else-if="field.kind === 'months'"
          :value="rangeObject(field)"
          :max-range="field.maxRange"
          :calendar-options="field.calendarOptions"
          :min-date="field.minDate || undefined"
          :max-date="field.maxDate || undefined"
          @update:value="setRangeObject(field, $event)"
        />

        <!-- dateRangeMonths: календарь-сетка месяцев, два клика и пунктирный предпросмотр -->
        <month-range-picker
          v-else-if="field.kind === 'monthRange'"
          :value="rangeObject(field)"
          :placeholder="field.placeholder"
          :width="field.kind === 'monthRange' ? 350 : undefined"
          :max-range="field.maxRange"
          :calendar-options="field.calendarOptions"
          @update:value="setRangeObject(field, $event)"
        />

        <!-- range-days: шкала по дням, значение ГГГГ-ММ-ДД -->
        <range-scale-picker
          v-else-if="field.kind === 'rangeDays'"
          mode="days"
          :value="rangeObject(field)"
          :height="field.height"
          :min-date="field.minDate"
          :max-date="field.maxDate"
          :max-range="field.maxRange"
          @update:value="setRangeObject(field, $event)"
        />

        <!-- range-number: числовая шкала с границами из конфига -->
        <range-scale-picker
          v-else-if="field.kind === 'numberRange'"
          mode="number"
          :value="numberRangeObject(field)"
          :height="field.height"
          :min="field.min"
          :max="field.max"
          :step="field.step"
          @update:value="setNumberRange(field, $event)"
        />

        <!-- multi-select-list: список с поиском в выпадающей панели, как в
             боевом FormItemBuilder (dxList + searchEnabled + «выбрать всё») -->
        <list-picker
          v-else-if="field.kind === 'multiList'"
          :value="multiValue(field)"
          :items="itemsFor(field)"
          :placeholder="field.placeholder"
          :multiple="field.multiple !== false"
          :search="field.search !== false"
          :search-mode="field.searchMode"
          :search-expr="field.searchExpr"
          :search-timeout="field.searchTimeout"
          :search-placeholder="field.searchPlaceholder"
          :select-all-mode="field.selectAllMode"
          :page-load-mode="field.pageLoadMode"
          :show-scrollbar="field.showScrollbar"
          @update:value="setListValue(field, $event)"
        />

        <!-- multi-select / multi-select-fl: подключения тегами (dxTagBox) -->
        <dx-tag-box
          v-else-if="field.kind === 'multi'"
          :value="multiValue(field)"
          :items="itemsFor(field)"
          value-expr="id"
          display-expr="name"
          :search-enabled="field.searchable !== false"
          :show-selection-controls="true"
          :show-clear-button="true"
          :placeholder="field.placeholder || ''"
          :multiline="false"
          @value-changed="setValue(field, $event.value || [])"
        />

        <dx-select-box
          v-else-if="field.kind === 'select'"
          :value="modelValue[field.field] ?? null"
          :items="selectItemsFor(field)"
          :accept-custom-value="true"
          :search-enabled="true"
          value-expr="id"
          display-expr="name"
          :show-clear-button="true"
          :placeholder="field.placeholder || 'Выберите значение'"
          @value-changed="setValue(field, $event.value)"
        />

        <!-- dateRange: один контрол MSI dxDateRangeBox, как в боевом FormItemBuilder -->
        <dx-date-range-box
          v-else-if="field.kind === 'dateRange'"
          :start-date="rangePart(field, 'start')"
          :end-date="rangePart(field, 'end')"
          :min="field.minDate || undefined"
          :max="field.maxDate || undefined"
          :show-clear-button="true"
          display-format="dd.MM.yyyy"
          @value-changed="onDateRangeChanged(field, $event)"
        />

        <dx-date-box
          v-else-if="field.kind === 'date'"
          :value="modelValue[field.field] ?? null"
          type="date"
          display-format="dd.MM.yyyy"
          :show-clear-button="true"
          @value-changed="setValue(field, toDateString($event.value))"
        />

        <dx-number-box
          v-else-if="field.kind === 'number'"
          :value="modelValue[field.field] ?? null"
          :show-clear-button="true"
          @value-changed="setValue(field, $event.value)"
        />

        <dx-check-box
          v-else-if="field.kind === 'bool'"
          :value="!!modelValue[field.field]"
          @value-changed="setValue(field, $event.value)"
        />

        <!-- hierarchical-list / hr-fond: дерево фондов со строкой поиска -->
        <fond-tree-picker
          v-else-if="field.kind === 'tree'"
          :value="treeValue(field)"
          :db-name="field.dbName || userDefaultDbId(databases ?? [])"
          :root-value="field.rootValue"
          :sql="field.treeSql"
          :preload="field.preload === true"
          :search="field.search !== false"
          :saved-text="String(draft[field.field + '_displayText'] || '')"
          :placeholder="field.placeholder || 'Выберите фонд'"
          @update:value="setValue(field, $event)"
          @update:names="setTreeNames(field, $event)"
        />

        <dx-text-box
          v-else
          :value="modelValue[field.field] ?? ''"
          :placeholder="field.placeholder || ''"
          @value-changed="setValue(field, $event.value)"
        />
      </div>
    </div>

    <div class="filter-actions">
      <dx-button
        text="Сбросить"
        icon="clearcircle"
        styling-mode="outlined"
        @click="reset()"
      />
      <dx-button
        text="Сформировать отчёт"
        icon="checkmarkcircle"
        type="default"
        styling-mode="contained"
        @click="$emit('apply')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { DxTagBox } from 'devextreme-vue/tag-box';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxDateBox } from 'devextreme-vue/date-box';
import { DxDateRangeBox } from 'devextreme-vue/date-range-box';
import { DxNumberBox } from 'devextreme-vue/number-box';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxCheckBox } from 'devextreme-vue';
import { DxButton } from 'devextreme-vue/button';
import { DxButtonGroup } from 'devextreme-vue/button-group';
import FondTreePicker from '@/components/library/fond-tree-picker.vue';
import ListPicker from '@/components/library/list-picker.vue';
import { userDefaultDbId } from '@/utils/default-db';
import MonthRangePicker from '@/components/library/month-range-picker.vue';
import RangeMonthsPicker from '@/components/library/range-months-picker.vue';
import RangeScalePicker from '@/components/library/range-scale-picker.vue';
import { reportsApi } from '@/services/reports-api';
import { monthItems as monthListItems } from '@/utils/filter-values';
import type { FilterField, FilterItem } from '@/utils/report-config';

const props = defineProps<{
  fields: FilterField[],
  modelValue: Record<string, unknown>,
  /** Вертикальная раскладка — для правой панели фильтров. */
  vertical?: boolean,
  /** Доступные базы — для БД по умолчанию (справочники без явной dbName). */
  databases?: Array<{ id: string }>,
}>();

const emit = defineEmits<{
  'update:modelValue': [Record<string, unknown>],
  apply: [],
}>();

// Локальная копия значений: props обновляются только на следующем рендере, и
// два изменения подряд (например, два DateBox одного диапазона) перетирали бы
// друг друга, если собирать новый объект из props.modelValue.
const draft = ref<Record<string, unknown>>({ ...props.modelValue });

watch(() => props.modelValue, (value) => {
  draft.value = { ...value };
});

// ─── Порядок и раскладка (formOrder / formColSpan / formColIndex) ────────────
const orderedFields = computed(() => props.fields
  .map((field, index) => ({ field, index }))
  .sort((a, b) => {
    const ao = a.field.order ?? 999;
    const bo = b.field.order ?? 999;
    if (ao !== bo) return ao - bo;
    return a.index - b.index;
  })
  .map((item) => item.field)
  // button-group без элементов рисовать нечем: на проде они приходят из отчёта,
  // а если отчёт их не объявил — пустой блок только мешает.
  .filter((field) => !(field.kind === 'buttons' && !(field.items ?? []).length)));

function itemStyle(field: FilterField): Record<string, string> {
  if (props.vertical) return {};
  const span = Math.min(Math.max(field.span ?? 1, 1), 2);
  const col = Math.min(Math.max(field.col ?? 0, 0), 1);
  return { gridColumn: `${col + 1} / span ${span}` };
}

// ─── Элементы списков ────────────────────────────────────────────────────────
const loadedItems = ref<Record<string, FilterItem[]>>({});

/** Элементы select + текущее значение, если его нет в списке (числа YYYYMMDD и т.п.). */
function selectItems(field: FilterField): FilterItem[] {
  const base = itemsFor(field);
  const value = draft.value[field.field];
  if (value === null || value === undefined || value === '') return base;
  if (base.some((item) => String(item.id) === String(value))) return base;
  return [...base, { id: value, name: String(value) }];
}

function itemsFor(field: FilterField): FilterItem[] {
  const loaded = loadedItems.value[field.field];
  if (loaded?.length) return loaded;
  const base = field.items ?? [];
  if (base.length) return base;
  // multi/multiList без справочника («РасчетыеМесяцы») — месяцы строим сами.
  return field.kind === 'multi' || field.kind === 'multiList' ? monthMultiItems(field) : [];
}

async function loadItems(field: FilterField) {
  if (!field.itemsQuery) return;
  // БД справочника: явная из определения фильтра, иначе умолчание пользователя.
  const dbName = field.dbName || userDefaultDbId(props.databases ?? []);
  if (!dbName) return;
  if ((field.items ?? []).length > 0) return;
  if (loadedItems.value[field.field]?.length) return;
  // Списки до ~1000 записей: тянем itemsQuery целиком и фильтруем в клиенте.
  // Для больших объёмов есть POST /api/items (search/skip/take) — переключим,
  // когда появятся такие списки.
  try {
    const result = await reportsApi.execute(dbName, field.itemsQuery);
    const rows = result.rows ?? [];
    // Контракт itemsQuery: первая колонка — id, вторая — подпись; для
    // hr-fond пятой колонкой идёт готовое имя узла (NODE).
    const nameIndex = (result.columns?.length ?? 0) >= 5 ? 4 : 1;
    loadedItems.value = {
      ...loadedItems.value,
      [field.field]: rows.map((row) => ({
        id: row[0],
        name: String(row[nameIndex] ?? row[1] ?? row[0]),
      })),
    };
  } catch {
    /* нет доступа к базе — остаётся пустой список */
  }
}

onMounted(() => {
  for (const field of props.fields) void loadItems(field);
});

watch(() => props.fields, (fields) => {
  for (const field of fields) void loadItems(field);
}, { deep: false });

// ─── Значения и подписи ──────────────────────────────────────────────────────
function commit(next: Record<string, unknown>) {
  draft.value = next;
  emit('update:modelValue', next);
}

/** Дублирует выбранные значения в *_displayText / *_displayData, как легаси-панель. */
function withDisplay(field: FilterField, value: unknown, next: Record<string, unknown>) {
  const items = itemsFor(field);
  if (!items.length) return;
  if (Array.isArray(value)) {
    const picked = items.filter((item) => value.some((v) => String(v) === String(item.id)));
    next[`${field.field}_displayText`] = picked.map((item) => item.name).join(', ');
    next[`${field.field}_displayData`] = picked;
  } else if (value !== null && value !== undefined && value !== '') {
    const one = items.find((item) => String(item.id) === String(value));
    next[`${field.field}_displayText`] = one ? one.name : String(value);
    next[`${field.field}_displayData`] = one ? [one] : [];
  } else {
    next[`${field.field}_displayText`] = '';
    next[`${field.field}_displayData`] = [];
  }
}


/** Месячное поле без справочника: select или multi («РасчетыеМесяцы»). */
function isMonthField(field: FilterField): boolean {
  if (field.kind !== 'select' && field.kind !== 'multi' && field.kind !== 'multiList') return false;
  if ((field.items ?? []).length || field.itemsQuery) return false;
  return /месяц/i.test(`${field.field} ${field.label}`);
}

function isMonthSelect(field: FilterField): boolean {
  return field.kind === 'select' && isMonthField(field);
}

/** Месяцы для multi/multiList-поля без справочника. */
function monthMultiItems(field: FilterField): FilterItem[] {
  return isMonthField(field) ? (monthListItems() as unknown as FilterItem[]) : [];
}

function selectItemsFor(field: FilterField): FilterItem[] {
  const base = selectItems(field);
  if (base.length || !isMonthSelect(field)) return base;
  return monthListItems() as unknown as FilterItem[];
}

function setValue(field: FilterField, value: unknown) {
  const next = { ...draft.value, [field.field]: value };
  withDisplay(field, value, next);
  commit(next);
}

/** Списки: одиночный режим отдаёт скаляр, множественный — массив. */
function setListValue(field: FilterField, value: unknown) {
  setValue(field, field.multiple === false ? (Array.isArray(value) ? (value[0] ?? null) : value) : value);
}

/** Дерево не имеет локального справочника — имена приходят из пикера. */
function setTreeNames(field: FilterField, names: string) {
  if (draft.value[`${field.field}_displayText`] === names) return;
  commit({ ...draft.value, [`${field.field}_displayText`]: names });
}

// ─── button-group ────────────────────────────────────────────────────────────
function groupKeys(field: FilterField): unknown[] {
  const value = draft.value[field.field];
  return value === null || value === undefined || value === '' ? [] : [value];
}

function onGroupChanged(field: FilterField, event: { addedItems?: { id?: unknown }[] }) {
  const item = event?.addedItems?.[0];
  setValue(field, item && item.id !== undefined ? item.id : null);
}

function multiValue(field: FilterField): unknown[] {
  const value = draft.value[field.field];
  return Array.isArray(value) ? value : [];
}

function treeValue(field: FilterField): number[] {
  const value = draft.value[field.field];
  return Array.isArray(value) ? (value as number[]) : [];
}



function rangePart(field: FilterField, part: 'start' | 'end'): string | null {
  const range = (draft.value[field.field] || {}) as Record<string, unknown>;
  const value = (range[part] ?? range[part === 'start' ? 'Начало' : 'Окончание']) as string | undefined;
  return value || null;
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value ? String(value).slice(0, 10) : '';
}

/** dxDateRangeBox отдаёт [start, end] — раскладываем в наш диапазон. */
function onDateRangeChanged(field: FilterField, event: { value?: unknown[] }) {
  const value = Array.isArray(event?.value) ? event.value : [];
  commit({
    ...draft.value,
    [field.field]: { start: toDateString(value[0]), end: toDateString(value[1]) },
  });
}

/** Текущее значение диапазона как объект { start, end }. */
function rangeObject(field: FilterField): { start: string; end: string } {
  const raw = (draft.value[field.field] || {}) as Record<string, unknown>;
  return {
    start: String(raw.start ?? raw.Начало ?? ''),
    end: String(raw.end ?? raw.Окончание ?? ''),
  };
}

function setRangeObject(field: FilterField, value: { start: string | number; end: string | number }) {
  const next = {
    ...draft.value,
    [field.field]: { start: String(value.start ?? ''), end: String(value.end ?? '') },
  };
  commit(next);
}

/** Значение числовой шкалы: числа, а не строки — иначе в SQL уйдёт "500". */
function numberRangeObject(field: FilterField): { start: number | null; end: number | null } {
  const raw = (draft.value[field.field] || {}) as Record<string, unknown>;
  const asNumber = (value: unknown): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  };
  return { start: asNumber(raw.start), end: asNumber(raw.end) };
}

function setNumberRange(field: FilterField, value: { start: string | number; end: string | number }) {
  const next = { ...draft.value, [field.field]: { start: Number(value.start), end: Number(value.end) } };
  commit(next);
}

function setRange(field: FilterField, part: 'start' | 'end', value: unknown) {
  const current = (draft.value[field.field] || { start: '', end: '' }) as Record<string, unknown>;
  const next = {
    ...draft.value,
    [field.field]: { ...current, [part]: toDateString(value) },
  };
  commit(next);
}

// ─── Сброс ───────────────────────────────────────────────────────────────────
/** Значения по умолчанию: из конфигурации, иначе пустые. Для месяцев — прошлый месяц. */
function defaultFor(field: FilterField): unknown {
  if (field.defaultValue !== undefined && field.defaultValue !== null) return field.defaultValue;
  if (field.kind === 'multi' || field.kind === 'multiList' || field.kind === 'tree') return [];
  if (field.kind === 'dateRange' || field.kind === 'months' || field.kind === 'monthRange' || field.kind === 'rangeDays') {
    const now = new Date();
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const month = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-01`;
    if (field.kind === 'dateRange' || field.kind === 'rangeDays') return { start: '', end: '' };
    return { start: month, end: month };
  }
  if (field.kind === 'numberRange') return { start: null, end: null };
  return null;
}

function reset() {
  const cleared: Record<string, unknown> = {};
  for (const field of props.fields) {
    const value = defaultFor(field);
    cleared[field.field] = value;
    withDisplay(field, value, cleared);
  }
  commit(cleared);
  emit('apply');
}
</script>

<style scoped lang="scss">
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

/* Форма из двух колонок: formColSpan/formColIndex задают позицию поля. */
.filter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 16px;
  align-items: start;
}

.filter-grid--vertical {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.filter-label {
  font-size: 12px;
  /* Токен MSI: в тёмной теме подпись иначе наследует цвет страницы. */
  color: var(--texteditor-label-color, var(--base-text-color));
}

.filter-range {
  display: flex;
  gap: 6px;
}

.filter-range > * {
  flex: 1 1 0;
  min-width: 0;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.filter-button {
  padding: 4px 12px;
  border: 1px solid rgba(128, 128, 128, 0.4);
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.filter-button--active {
  border-color: var(--dx-color-primary, #ff5722);
  color: var(--dx-color-primary, #ff5722);
}

.filter-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

/* Вертикальная раскладка: панель фильтров справа от отчёта. */
.filter-panel--vertical {
  padding: 0;
  border-bottom: none;
}

.filter-panel--vertical .filter-item {
  width: 100%;
  min-width: 0;
}

.filter-panel--vertical .filter-actions {
  margin-top: 4px;
}
</style>
