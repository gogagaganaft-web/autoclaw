<template>
  <div
    class="mrp"
    :style="width ? { width: `${width}px` } : undefined"
  >
    <div
      class="mrp__field"
      @click="toggle()"
    >
      <span
        v-if="!hasValue"
        class="mrp__placeholder"
      >{{ placeholder || 'Выберите период' }}</span>
      <span
        v-else
        class="mrp__value"
      >{{ labelStart }} <span class="mrp__arrow-inline">→</span> {{ labelEnd }}</span>
      <span class="mrp__tools">
        <span
          v-if="hasValue"
          class="mrp__clear"
          title="Очистить"
          @click.stop="clear()"
        >&times;</span>
        <span class="mrp__chevron">&#9662;</span>
      </span>
    </div>

    <div
      v-if="open"
      class="mrp__popup"
      @mouseleave="hoverKey = ''"
    >
      <div
        v-for="year in years"
        :key="year"
        class="mrp__year"
      >
        <div class="mrp__year-title">
          {{ year }}
        </div>
        <div class="mrp__months">
          <button
            v-for="m in 12"
            :key="m"
            type="button"
            class="mrp__month"
            :class="monthClass(year, m)"
            @click="pick(year, m)"
            @mouseenter="hoverKey = keyOf(year, m)"
          >
            {{ monthShort(m) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// Месячный диапазон: два клика (начало → конец), панель не закрывается после
// первого клика, при наведении показывается пунктирный предпросмотр периода.
// Заменяет dxDateRangeBox там, где на проде используется month-календарь.

const props = defineProps<{
  value: { start?: string; end?: string } | null | undefined,
  placeholder?: string,
  width?: number,
  maxRange?: { months?: number },
  calendarOptions?: Record<string, unknown>,
}>();

const emit = defineEmits<{ 'update:value': [{ start: string; end: string }] }>();

// В сетке выбора — короткие названия, в строке значения — полные.
const MONTHS_SHORT = ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь',
  'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];
const MONTHS_FULL = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
  'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

const open = ref(false);
const anchor = ref('');
const hoverKey = ref('');

const startKey = computed(() => (props.value?.start || '').slice(0, 7));
const endKey = computed(() => (props.value?.end || '').slice(0, 7));
const hasValue = computed(() => Boolean(startKey.value && endKey.value));

function keyOf(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

const years = computed<number[]>(() => {
  const opts = props.calendarOptions ?? {};
  // По умолчанию — текущий год и предыдущий (2026 → 2025).
  const minDate = opts.min ? new Date(String(opts.min)) : new Date(new Date().getFullYear() - 1, 0, 1);
  const maxDate = opts.max ? new Date(String(opts.max)) : new Date();
  const from = minDate.getFullYear();
  const to = Math.max(maxDate.getFullYear(), from);
  const list: number[] = [];
  for (let y = from; y <= to; y += 1) list.push(y);
  return list;
});

function monthShort(m: number): string {
  return MONTHS_SHORT[m - 1];
}

function formatLabel(key: string): string {
  if (!key) return '';
  const [y, m] = key.split('-');
  return `${MONTHS_FULL[Number(m) - 1]} ${y}`;
}

const labelStart = computed(() => formatLabel(startKey.value));
const labelEnd = computed(() => formatLabel(endKey.value));

function monthClass(year: number, month: number): Record<string, boolean> {
  const key = keyOf(year, month);
  const start = startKey.value;
  const end = endKey.value;
  const inRange = Boolean(start && end && key >= start && key <= end);
  const previewFrom = anchor.value && hoverKey.value
    ? (anchor.value < hoverKey.value ? anchor.value : hoverKey.value)
    : '';
  const previewTo = anchor.value && hoverKey.value
    ? (anchor.value < hoverKey.value ? hoverKey.value : anchor.value)
    : '';
  const inPreview = Boolean(previewFrom && key >= previewFrom && key <= previewTo);
  return {
    'is-start': key === start,
    'is-end': key === end,
    'is-range': inRange,
    'is-preview': !inRange && inPreview,
    'is-preview-start': inPreview && key === previewFrom,
    'is-preview-end': inPreview && key === previewTo,
  };
}

function addMonths(key: string, delta: number): string {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function monthsBetween(from: string, to: string): number {
  const [fy, fm] = from.split('-').map(Number);
  const [ty, tm] = to.split('-').map(Number);
  return (ty - fy) * 12 + (tm - fm) + 1;
}

function pick(year: number, month: number) {
  const key = keyOf(year, month);
  if (!anchor.value) {
    anchor.value = key;
    hoverKey.value = '';
    return;
  }
  let from = anchor.value < key ? anchor.value : key;
  let to = anchor.value < key ? key : anchor.value;
  const limit = props.maxRange?.months;
  if (limit && monthsBetween(from, to) > limit) {
    to = addMonths(from, limit - 1);
  }
  emit('update:value', { start: `${from}-01`, end: `${to}-01` });
  anchor.value = '';
  hoverKey.value = '';
  open.value = false;
}

function toggle() {
  open.value = !open.value;
  if (!open.value) {
    anchor.value = '';
    hoverKey.value = '';
  }
}

function clear() {
  emit('update:value', { start: '', end: '' });
  open.value = false;
  anchor.value = '';
}
</script>

<style scoped lang="scss">
.mrp {
  position: relative;
  width: 100%;
}

.mrp__field {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid rgba(128, 128, 128, 0.35);
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.mrp__placeholder {
  color: rgba(128, 128, 128, 0.9);
}

.mrp__value {
  flex: 1 1 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mrp__arrow-inline {
  opacity: 0.6;
  margin: 0 2px;
}

.mrp__tools {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.mrp__clear {
  cursor: pointer;
  opacity: 0.6;
}

.mrp__chevron {
  opacity: 0.6;
}

.mrp__popup {
  position: absolute;
  z-index: 1200;
  top: calc(100% + 4px);
  left: 0;
  display: flex;
  gap: 24px;
  padding: 12px 16px;
  background: var(--base-bg, #fff);
  border: 1px solid rgba(128, 128, 128, 0.25);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
}

.mrp__year {
  min-width: 220px;
}

.mrp__year-title {
  text-align: center;
  font-weight: 600;
  padding-bottom: 8px;
}

.mrp__months {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

/* Ячейка месяца: подсветка диапазона занимает всю высоту, без «половинок». */
.mrp__month {
  position: relative;
  height: 34px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  border-radius: 0;
}

.mrp__month::before {
  content: '';
  position: absolute;
  inset: 0;
  background: transparent;
  z-index: 0;
}

.mrp__month.is-range::before {
  background: rgba(59, 130, 246, 0.18);
}

.mrp__month.is-start::before,
.mrp__month.is-end::before {
  background: rgba(59, 130, 246, 0.35);
  border-radius: 10px;
}

.mrp__month.is-preview::before {
  border-top: 1px dashed rgba(59, 130, 246, 0.9);
  border-bottom: 1px dashed rgba(59, 130, 246, 0.9);
  border-radius: 10px;
}

.mrp__month.is-preview-start::before {
  border-left: 1px dashed rgba(59, 130, 246, 0.9);
}

.mrp__month.is-preview-end::before {
  border-right: 1px dashed rgba(59, 130, 246, 0.9);
}

.mrp__month span,
.mrp__month {
  z-index: 1;
}

.mrp__month:hover {
  color: var(--dx-color-primary, #1d4ed8);
}
</style>
