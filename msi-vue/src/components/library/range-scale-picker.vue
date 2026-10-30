<template>
  <div
    ref="hostEl"
    class="rsp"
    :style="{ height: `${height}px` }"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Шкала-диапазон на MSI dxRangeSelector: два ползунка, значение {start, end}.
//
// mode='days'   — шкала по дням, на выходе ISO `ГГГГ-ММ-ДД`;
// mode='number' — числовая шкала, границы из min/max, на выходе числа.
//
// Месячную шкалу рисует range-months-picker (там своя логика правой границы
// и подписей месяцев), поэтому этот компонент её не заменяет.

const props = defineProps<{
  mode: 'days' | 'number';
  value: { start?: string | number | null; end?: string | number | null } | null | undefined;
  height?: number;
  min?: number;
  max?: number;
  step?: number;
  minDate?: string;
  maxDate?: string;
  maxRange?: Record<string, number>;
}>();

const emit = defineEmits<{ 'update:value': [{ start: string | number; end: string | number }] }>();

const hostEl = ref<HTMLElement | null>(null);
const heightValue = ref(props.height ?? 65);
const height = heightValue;

let widget: any = null;
let syncing = false;

function pad2(value: number): string {
  return String(value).padStart(2, '0');
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function toIsoDay(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function formatDay(value: unknown): string {
  const d = new Date(String(value));
  if (Number.isNaN(d.getTime())) return '';
  return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
}

function parseDay(raw: unknown): Date | null {
  if (raw === null || raw === undefined || raw === '') return null;
  const d = new Date(String(raw));
  return Number.isNaN(d.getTime()) ? null : startOfDay(d);
}

// ─── Границы шкалы ──────────────────────────────────────────────────────────

function dayScale(): { start: Date; end: Date } {
  const now = new Date();
  const start = parseDay(props.minDate) ?? startOfDay(new Date(now.getFullYear() - 1, 0, 1));
  const end = parseDay(props.maxDate) ?? startOfDay(now);
  return end < start ? { start: end, end: start } : { start, end };
}

function numberScale(): { start: number; end: number } {
  const min = Number.isFinite(props.min) ? Number(props.min) : 0;
  const max = Number.isFinite(props.max) ? Number(props.max) : 100;
  return max < min ? { start: max, end: min } : { start: min, end: max };
}

// ─── Значение ───────────────────────────────────────────────────────────────

function dayValue(): Date[] {
  const { start, end } = dayScale();
  const rawStart = parseDay(props.value?.start) ?? start;
  const rawEnd = parseDay(props.value?.end) ?? end;
  return rawEnd < rawStart ? [rawStart, rawStart] : [rawStart, rawEnd];
}

function numberValue(): number[] {
  const { start, end } = numberScale();
  const rawStart = Number(props.value?.start);
  const rawEnd = Number(props.value?.end);
  const from = Number.isFinite(rawStart) ? rawStart : start;
  const to = Number.isFinite(rawEnd) ? rawEnd : end;
  return to < from ? [from, from] : [from, to];
}

function currentValue(): Date[] | number[] {
  return props.mode === 'days' ? dayValue() : numberValue();
}

// ─── Сборка виджета ─────────────────────────────────────────────────────────

function onChanged(value: unknown[]) {
  if (syncing) return;
  if (props.mode === 'number') {
    const from = Number(value[0]);
    const to = Number(value[1]);
    emit('update:value', { start: from, end: to });
    return;
  }
  const from = startOfDay(new Date(String(value[0])));
  const to = startOfDay(new Date(String(value[1])));
  emit('update:value', { start: toIsoDay(from), end: toIsoDay(to) });
}

function buildOptions(): Record<string, unknown> {
  const common = {
    height: heightValue.value,
    behavior: { valueChangeMode: 'onMoving', snapToTicks: props.mode === 'number' && Boolean(props.step) },
    onValueChanged: (e: { value: unknown[] }) => onChanged(e.value || []),
  } as Record<string, unknown>;

  if (props.mode === 'number') {
    const { start, end } = numberScale();
    return {
      ...common,
      scale: {
        startValue: start,
        endValue: end,
        tickInterval: props.step || undefined,
        label: { customizeText: (e: { value: unknown }) => String(e.value) },
      },
      sliderMarker: { customizeText: (e: { value: unknown }) => String(e.value) },
      value: numberValue(),
    };
  }

  const { start, end } = dayScale();
  return {
    ...common,
    scale: {
      startValue: start,
      endValue: end,
      minorTickInterval: 'day',
      tickInterval: 'month',
      label: { customizeText: (e: { value: unknown }) => formatDay(e.value) },
    },
    sliderMarker: { customizeText: (e: { value: unknown }) => formatDay(e.value) },
    value: dayValue(),
    maxRange: props.maxRange && Object.keys(props.maxRange).length ? props.maxRange : undefined,
  };
}

function ensureWidget() {
  if (widget || !hostEl.value) return;
  // RangeSelector в MSI лежит в viz, но в части сборок попадает в ui.
  const Ctor = (window as any).MSI?.viz?.dxRangeSelector
    || (window as any).MSI?.ui?.dxRangeSelector;
  if (!Ctor) return;
  widget = new Ctor(hostEl.value, buildOptions());
}

function rebuild() {
  try {
    widget?.dispose?.();
  } catch { /* виджет уже снят */ }
  widget = null;
  ensureWidget();
}

onMounted(() => {
  ensureWidget();
});

watch(() => props.value, () => {
  if (!widget) return;
  syncing = true;
  try {
    widget.option('value', currentValue());
  } finally {
    syncing = false;
  }
}, { deep: true });

// Границы шкалы могли приехать позже фильтра — тогда виджет пересобирается.
watch(() => [props.mode, props.min, props.max, props.step, props.minDate, props.maxDate], () => {
  rebuild();
});

onBeforeUnmount(() => {
  try {
    widget?.dispose?.();
  } catch { /* виджет уже снят */ }
  widget = null;
});
</script>

<style scoped>
.rsp {
  width: 100%;
}
</style>
