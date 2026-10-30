<template>
  <div class="fp">
    <div class="fp__label">
      {{ labelText }}
    </div>

    <dx-button-group
      v-if="type === 'button-group'"
      :items="buttons"
      key-expr="id"
      display-expr="text"
      :selected-item-keys="groupKeys"
      :selection-mode="def.multiple ? 'multiple' : 'single'"
      styling-mode="text"
      @selection-changed="onGroupChanged"
    />

    <range-months-picker
      v-else-if="type === 'range-months'"
      :value="range"
      :height="Number(def.height) || 65"
      :max-range="maxRange"
      :calendar-options="calendarOptions"
      :min-date="def.minDate ? String(def.minDate).slice(0, 10) : undefined"
      :max-date="def.maxDate ? String(def.maxDate).slice(0, 10) : undefined"
      @update:value="onRange($event)"
    />

    <month-range-picker
      v-else-if="type === 'dateRangeMonths'"
      :value="range"
      :placeholder="placeholder"
      :width="340"
      :max-range="maxRange"
      :calendar-options="calendarOptions"
      @update:value="onRange($event)"
    />

    <range-scale-picker
      v-else-if="type === 'range-days'"
      mode="days"
      :value="range"
      :height="Number(def.height) || 65"
      :min-date="def.minDate ? String(def.minDate) : undefined"
      :max-date="def.maxDate ? String(def.maxDate) : undefined"
      :max-range="dayMaxRange"
      @update:value="onRange($event)"
    />

    <range-scale-picker
      v-else-if="type === 'range-number'"
      mode="number"
      :value="numberRange"
      :height="Number(def.height) || 65"
      :min="numberOrUndefined(def.min)"
      :max="numberOrUndefined(def.max)"
      :step="numberOrUndefined(def.step)"
      @update:value="onNumberRange($event)"
    />

    <!-- Период дней: тот же dxDateRangeBox, что в панели отчёта -->
    <dx-date-range-box
      v-else-if="type === 'dateRange'"
      :start-date="datePart('start')"
      :end-date="datePart('end')"
      :min="def.minDate ? String(def.minDate) : undefined"
      :max="def.maxDate ? String(def.maxDate) : undefined"
      :show-clear-button="true"
      display-format="dd.MM.yyyy"
      @value-changed="onDateRangeChanged"
    />

    <!-- Список с поиском: тот же list-picker, что в панели отчёта
         (dxList + строка поиска + чекбоксы, как в FormItemBuilder) -->
    <list-picker
      v-else-if="type === 'multi-select-list'"
      :value="multiValue"
      :items="items"
      :placeholder="placeholder"
      :multiple="def.multiple !== false"
      :search="def.searchEnabled !== false"
      :search-mode="strOrUndefined(def.searchMode)"
      :search-expr="def.searchExpr as string[] | undefined"
      :search-timeout="numberOrUndefined(def.searchTimeout)"
      :search-placeholder="strOrUndefined(def.searchPlaceholder)"
      :select-all-mode="strOrUndefined(def.selectAllMode)"
      :page-load-mode="strOrUndefined(def.pageLoadMode)"
      :show-scrollbar="strOrUndefined(def.showScrollbar)"
      @update:value="onMulti($event)"
    />

    <!-- Подключения: тот же dxTagBox, что в панели отчёта -->
    <dx-tag-box
      v-else-if="isMulti"
      :value="multiValue"
      :items="items"
      value-expr="id"
      display-expr="name"
      :search-enabled="def.searchEnabled !== false"
      :show-selection-controls="def.showSelectionControls !== false"
      :show-clear-button="def.showClearButton !== false"
      :multiline="def.multiline === true"
      :placeholder="placeholder"
      @value-changed="onMulti($event.value)"
    />

    <dx-select-box
      v-else-if="type === 'select'"
      :value="scalar"
      :items="items"
      value-expr="id"
      display-expr="name"
      :accept-custom-value="true"
      :search-enabled="true"
      :show-clear-button="true"
      :placeholder="placeholder"
      @value-changed="onScalar($event.value)"
    />

    <!-- Иерархический справочник и фонд: то же дерево, что в панели отчёта,
         со строкой поиска (filterRow, как в боевом FullTreeList) -->
    <fond-tree-picker
      v-else-if="isTree"
      :value="treeValue"
      :db-name="String(def.dbName || '')"
      :root-value="Number(def.rootValue) || undefined"
      :sql="def.itemsQuery ? String(def.itemsQuery) : undefined"
      :preload="def.preload === true"
      :search="def.searchEnabled !== false"
      :placeholder="placeholder || 'Выберите фонд'"
      @update:value="onTreeSelection"
    />

    <!-- Серверные списки без данных: показываем, откуда они берутся. -->
    <div
      v-else
      class="fp__server"
    >
      {{ serverHint }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DxButtonGroup } from 'devextreme-vue/button-group';
import { DxDateRangeBox } from 'devextreme-vue/date-range-box';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxTagBox } from 'devextreme-vue/tag-box';
import RangeMonthsPicker from '@/components/library/range-months-picker.vue';
import RangeScalePicker from '@/components/library/range-scale-picker.vue';
import FondTreePicker from '@/components/library/fond-tree-picker.vue';
import ListPicker from '@/components/library/list-picker.vue';
import MonthRangePicker from '@/components/library/month-range-picker.vue';
import { monthItems } from '@/utils/filter-values';

// Предпросмотр фильтра: те же компоненты и те же настройки, что рисует панель
// «Контур данных» при формировании отчёта. Значения живут только здесь —
// редактор ничего не сохраняет.

const props = defineProps<{
  def: Record<string, unknown>;
  /** Значение, которое нужно показать сразу (например, умолчание по дате). */
  initialValue?: unknown;
  /** Элементы из проверки SQL: показываем их, пока в конфиге пусто. */
  itemsOverride?: Array<{ id: unknown; name: string }>;
}>();

// Значение наружу: страница фильтров собирает из них «что уйдёт в SQL».
const emit = defineEmits<{ 'update:value': [unknown] }>();

const type = computed(() => String(props.def.type || ''));
const placeholder = computed(() => String(props.def.placeholder || ''));
const labelText = computed(() => String(props.def.placeholder || props.def.label || props.def.field || 'Поле'));

const items = computed(() => {
  if (props.itemsOverride && props.itemsOverride.length) return props.itemsOverride;
  const raw = Array.isArray(props.def.items) ? props.def.items : [];
  if (raw.length) return raw;

  // Месяцы — тот же формат, что наполняет buildFilterFields для панели:
  // id «ГГГГ-ММ-01» (единый формат таксономии).
  const listType = ['multi-select', 'multi-select-fl', 'multi-select-list', 'select'].includes(type.value);
  const monthsByKind = props.def.itemsKind === 'months';
  if (listType && (props.def.dynamicDefault || monthsByKind) && !props.def.itemsQuery) {
    return monthItems();
  }
  return raw;
});
const buttons = computed(() => items.value.map((item) => {
  const rec = item as Record<string, unknown>;
  return { id: rec.id, text: rec.text ?? rec.name ?? rec.id };
}));

const isMulti = computed(() => ['multi-select', 'multi-select-fl'].includes(type.value));
const isTree = computed(() => type.value === 'hierarchical-list' || type.value === 'hr-fond');

const range = ref<{ start: string; end: string }>({ start: '', end: '' });
const numberRange = ref<{ start: number | null; end: number | null }>({ start: null, end: null });
const multiValue = ref<unknown[]>([]);
const scalar = ref<unknown>(null);
const groupKeys = ref<unknown[]>([]);
const treeValue = ref<number[]>([]);
const dateRange = ref<[Date, Date] | null>(null);

const maxRange = computed(() => (props.def.maxRange as { months?: number } | undefined));
const dayMaxRange = computed(() => (props.def.maxRange as { days?: number } | undefined));
const calendarOptions = computed(() => (props.def.calendarOptions as Record<string, unknown> | undefined));

function numberOrUndefined(value: unknown): number | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function strOrUndefined(value: unknown): string | undefined {
  return value === null || value === undefined || value === '' ? undefined : String(value);
}

const serverHint = computed(() => {
  const kind = String(props.def.itemsKind || '');
  if (kind === 'databases-ul') return 'Подключения env ЮЛ';
  if (kind === 'databases-fl') return 'Подключения env ФЛ';
  const db = String(props.def.dbName || '');
  if (type.value === 'hierarchical-list') {
    return db ? `Иерархический список: ${db}` : 'Иерархический список: укажите dbName';
  }
  if (type.value === 'hr-fond') {
    return db ? `Дерево фондов: ${db}` : 'Дерево фондов: укажите dbName';
  }
  if (type.value === 'multi-select-list' && props.def.itemsQuery) {
    return db ? `Список с сервера: ${db}` : 'Список с сервера: укажите dbName';
  }
  return 'Нет элементов для предпросмотра';
});

function iso(date: Date | null | undefined): string {
  if (!date || Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Границы диапазона дат для dxDateRangeBox (как rangePart в панели). */
function datePart(part: 'start' | 'end'): string | null {
  const d = part === 'start' ? dateRange.value?.[0] : dateRange.value?.[1];
  return d ? iso(d) : null;
}

function onRange(value: { start: string | number; end: string | number }) {
  const next = { start: String(value.start ?? ''), end: String(value.end ?? '') };
  range.value = next;
  emit('update:value', next);
}

function onNumberRange(value: { start: string | number; end: string | number }) {
  const next = { start: Number(value.start), end: Number(value.end) };
  numberRange.value = next;
  emit('update:value', next);
}

function onDateRangeChanged(e: { value?: unknown[] }) {
  const value = Array.isArray(e?.value) ? e.value : [];
  const [start, end] = value as [Date | undefined, Date | undefined];
  dateRange.value = start && end ? [start, end] : null;
  emit('update:value', { start: iso(start), end: iso(end) });
}

function onMulti(value: unknown[] | unknown) {
  if (props.def.multiple === false) {
    scalar.value = value ?? null;
    emit('update:value', scalar.value);
    return;
  }
  multiValue.value = Array.isArray(value) ? value : [];
  emit('update:value', multiValue.value);
}

/** Дерево: значение наружу — в блоке SQL видна строка ID, как в запросе. */
function onTreeSelection(value: number[]) {
  treeValue.value = value ?? [];
  emit('update:value', treeValue.value);
}

function onScalar(value: unknown) {
  scalar.value = value;
  emit('update:value', value);
}

function onGroupChanged(e: { component?: { option: (name: string) => unknown } }) {
  const selected = e.component?.option('selectedItemKeys');
  groupKeys.value = Array.isArray(selected) ? selected : [selected];
  emit('update:value', props.def.multiple ? groupKeys.value : groupKeys.value[0]);
}

function applyInitial(value: unknown) {
  if (value === null || value === undefined) return;

  if (Array.isArray(value)) {
    multiValue.value = [...value];
    groupKeys.value = [...value];
    if (isTree.value) treeValue.value = [...value];
    return;
  }

  if (typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    const start = String(rec.start ?? '');
    const end = String(rec.end ?? '');
    if (!start && !end) return;

    if (type.value === 'dateRange') {
      const from = start ? new Date(start) : null;
      const to = end ? new Date(end) : null;
      dateRange.value = from && to && !Number.isNaN(from.getTime()) && !Number.isNaN(to.getTime())
        ? [from, to]
        : null;
    } else {
      range.value = { start, end };
    }
    return;
  }

  scalar.value = value;
}

watch(() => props.initialValue, (value) => applyInitial(value), { deep: true, immediate: true });

// Смена типа — сброс значений предпросмотра, чтобы не тащить чужие данные.
watch(type, () => {
  range.value = { start: '', end: '' };
  multiValue.value = [];
  scalar.value = null;
  groupKeys.value = [];
  dateRange.value = null;
});
</script>

<style scoped>
.fp {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fp__label {
  font-size: 12px;
  color: var(--dx-color-text, #4b5563);
}

.fp__server {
  padding: 8px 10px;
  border: 1px dashed var(--dx-color-border, #cbd5e1);
  border-radius: 8px;
  font-size: 12px;
  opacity: 0.75;
}
</style>
