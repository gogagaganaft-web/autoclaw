<template>
  <div
    ref="hostEl"
    class="rmp"
    :style="{ height: `${height}px` }"
  />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

// Перенос боевого createRangeMonthsItem: dxRangeSelector со шкалой по месяцам.
// Правая граница внутри виджета — начало СЛЕДУЮЩЕГО месяца, при сохранении
// откатываем её на месяц назад (как в боевом коде).

const props = defineProps<{
  value: { start?: string; end?: string } | null | undefined,
  height?: number,
  maxRange?: { months?: number },
  calendarOptions?: Record<string, unknown>,
  /** Границы шкалы: приоритет над calendarOptions.min/max и автограницами. */
  minDate?: string,
  maxDate?: string,
}>();

const emit = defineEmits<{ 'update:value': [{ start: string; end: string }] }>();

const hostEl = ref<HTMLElement | null>(null);
const heightValue = ref(props.height ?? 65);
const height = heightValue;

let widget: any = null;
let syncing = false;

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}

function monthLabel(iso: string): string {
  if (!iso) return '';
  const [y, m] = iso.split('-');
  const names = ['янв.', 'февр.', 'март', 'апр.', 'май', 'июнь',
    'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];
  return `${names[Number(m) - 1]} ${y} г.`;
}

function parseRange(): { start: Date; end: Date } {
  const raw = props.value || {};
  const parse = (s: unknown): Date | null => {
    if (!s) return null;
    const d = new Date(String(s));
    return Number.isNaN(d.getTime()) ? null : startOfMonth(d);
  };
  const start = parse(raw.start) ?? startOfMonth(new Date(new Date().getFullYear(), 0, 1));
  const end = parse(raw.end) ?? startOfMonth(new Date());
  return { start, end };
}

/** Границы шкалы: ручные min/max из полей фильтра главнее calendarOptions
 * и умолчаний (январь текущего года .. следующий месяц). */
function scaleBounds(): { scaleStart: Date; scaleEnd: Date } {
  const opts = props.calendarOptions ?? {};
  const manualMin = props.minDate ? String(props.minDate) : '';
  const manualMax = props.maxDate ? String(props.maxDate) : '';
  const scaleStart = manualMin || opts.min
    ? startOfMonth(new Date(String(manualMin || opts.min)))
    : startOfMonth(new Date(new Date().getFullYear(), 0, 1));
  const scaleEndRaw = manualMax || opts.max ? new Date(String(manualMax || opts.max)) : new Date();
  const scaleEnd = startOfMonth(new Date(scaleEndRaw.getFullYear(), scaleEndRaw.getMonth() + 1, 1));
  return { scaleStart, scaleEnd };
}

/** Значение вне шкалы даёт E2203 («range is invalid») — например, месяц из
 * сохранённого состояния раньше января шкалы. Вписываем диапазон в границы. */
function clampedValue(start: Date, end: Date): Date[] {
  const { scaleStart, scaleEnd } = scaleBounds();
  const from = start < scaleStart ? scaleStart : (start > scaleEnd ? scaleEnd : start);
  let to = startOfMonth(new Date(end.getFullYear(), end.getMonth() + 1, 1));
  if (to > scaleEnd) to = scaleEnd;
  if (to < from) to = from;
  return [from, to];
}

function ensureWidget() {
  if (widget || !hostEl.value) return;
  // RangeSelector в MSI лежит в viz, а не в ui (в отличие от прочих виджетов).
  const Ctor = (window as any).MSI?.ui?.dxRangeSelector
    || (window as any).MSI?.viz?.dxRangeSelector;
  if (!Ctor) return;

  const { scaleStart, scaleEnd } = scaleBounds();
  const { start, end } = parseRange();
  const value = clampedValue(start, end);

  widget = new Ctor(hostEl.value, {
    height: heightValue.value,
    scale: {
      startValue: scaleStart,
      endValue: scaleEnd,
      minorTickInterval: 'month',
      tickInterval: 'month',
      label: {
        format: 'month',
        customizeText: (e: { value: unknown }) => monthLabel(toISO(startOfMonth(new Date(e.value as string)))),
      },
    },
    behavior: { snapToTicks: true, valueChangeMode: 'onMoving' },
    sliderMarker: {
      format: 'month',
      customizeText: (e: { value: unknown; component?: { option: (n: string) => unknown } }) => {
        const d = startOfMonth(new Date(e.value as string));
        try {
          const current = e.component?.option('value') as unknown[] | undefined;
          if (current && current[1] && d.getTime() === startOfMonth(new Date(current[1] as string)).getTime()) {
            d.setDate(0);
          }
        } catch { /* маркер без компонента */ }
        return monthLabel(toISO(d));
      },
    },
    value,
    maxRange: props.maxRange?.months ? { months: props.maxRange.months } : undefined,
    onValueChanged: (e: { value: unknown[] }) => {
      if (syncing) return;
      const startValue = startOfMonth(new Date(e.value[0] as string));
      const endNext = startOfMonth(new Date(e.value[1] as string));
      const endValue = startOfMonth(new Date(endNext.getFullYear(), endNext.getMonth() - 1, 1));
      emit('update:value', {
        start: toISO(startValue),
        end: toISO(endValue < startValue ? startValue : endValue),
      });
    },
  });
}

onMounted(() => {
  ensureWidget();
});

// Смена границ шкалы — пересоздать виджет: шкала задаётся при создании.
watch(() => [props.minDate, props.maxDate], () => {
  try { widget?.dispose?.(); } catch { /* ignore */ }
  widget = null;
  ensureWidget();
});

watch(() => props.value, () => {
  if (!widget) return;
  const { start, end } = parseRange();
  syncing = true;
  try {
    widget.option('value', clampedValue(start, end));
  } finally {
    syncing = false;
  }
}, { deep: true });

onBeforeUnmount(() => {
  try {
    widget?.dispose?.();
  } catch { /* виджет уже снят */ }
  widget = null;
});
</script>

<style scoped>
.rmp {
  width: 100%;
}
</style>
