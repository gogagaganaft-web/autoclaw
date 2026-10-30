<template>
  <div class="rve">
    <div class="rve__tabs">
      <button
        v-for="(view, index) in views"
        :key="view.key + index"
        type="button"
        class="rve__tab"
        :class="{ 'rve__tab--active': index === activeIndex }"
        @click="activeIndex = index"
      >
        <span>{{ view.title || view.type }}</span>
        <span class="rve__tab-count">{{ view.fields.filter((f) => f.visible).length }}</span>
        <span
          class="rve__tab-close"
          title="Удалить вид"
          @click.stop="removeView(index)"
        >×</span>
      </button>

      <span class="rve__spacer" />

      <dx-select-box
        class="rve__add-type"
        :items="availableTypes"
        value-expr="value"
        display-expr="label"
        :value="newType"
        placeholder="Добавить вид"
        @value-changed="newType = $event.value"
      />
      <dx-button
        icon="plus"
        styling-mode="outlined"
        hint="Добавить вид"
        :disabled="!newType"
        @click="addView()"
      />
    </div>

    <div
      v-if="activeView"
      class="rve__body"
    >
      <div class="rve__actions">
        <dx-button
          text="Взять колонки из запроса"
          icon="refresh"
          styling-mode="outlined"
          :disabled="!columns.length"
          @click="fillFromColumns()"
        />
        <dx-button
          text="Показать все"
          styling-mode="text"
          @click="setAllVisible(true)"
        />
        <dx-button
          text="Скрыть все"
          styling-mode="text"
          @click="setAllVisible(false)"
        />
        <span class="rve__spacer" />
        <span class="rve__hint">
          {{ columns.length ? `Колонок в запросе: ${columns.length}` : 'У запроса нет сохранённых колонок' }}
        </span>
      </div>

      <div class="rve__table-wrap">
        <table class="rve__table">
          <thead>
            <tr>
              <th class="rve__col-on">Вид</th>
              <th>Поле</th>
              <th>Подпись</th>
              <th class="rve__col-width">Ширина</th>
              <th class="rve__col-format">Формат</th>
              <th
                v-if="activeView.type === 'pivot'"
                class="rve__col-area"
              >
                Область
              </th>
              <th class="rve__col-order" />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(field, index) in activeView.fields"
              :key="field.name"
              class="rve__row"
              :class="{
                'rve__row--hidden': !field.visible,
                'rve__row--drag': dragIndex === index,
                'rve__row--over': overIndex === index && dragIndex !== index,
              }"
              draggable="true"
              @dragstart="onDragStart(index, $event)"
              @dragover.prevent="onDragOver(index)"
              @dragleave="onDragLeave(index)"
              @drop.prevent="onDrop(index)"
              @dragend="resetDrag()"
            >
              <td class="rve__drag-cell">
                <span
                  class="rve__grip"
                  title="Перетащите строку, чтобы изменить порядок"
                >⋮⋮</span>
                <input
                  type="checkbox"
                  :checked="field.visible"
                  @change="setVisible(field, $event)"
                >
              </td>
              <td class="rve__name">
                {{ field.name }}
              </td>
              <td>
                <input
                  class="rve__input"
                  :value="field.caption"
                  @input="setCaption(field, $event)"
                >
              </td>
              <td>
                <input
                  class="rve__input rve__input--num"
                  :value="field.width ?? ''"
                  @input="setWidth(field, $event)"
                >
              </td>
              <td>
                <input
                  class="rve__input"
                  :value="field.format || ''"
                  placeholder="0.00"
                  @input="setFormat(field, $event)"
                >
              </td>
              <td v-if="activeView.type === 'pivot'">
                <select
                  class="rve__input"
                  :value="field.area || ''"
                  @change="setArea(field, $event)"
                >
                  <option value="">
                    —
                  </option>
                  <option
                    v-for="option in areaOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </td>
              <td class="rve__order">
                <button
                  type="button"
                  class="rve__move"
                  title="Выше"
                  :disabled="index === 0"
                  @click="move(index, -1)"
                >↑</button>
                <button
                  type="button"
                  class="rve__move"
                  title="Ниже"
                  :disabled="index === activeView.fields.length - 1"
                  @click="move(index, 1)"
                >↓</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="!activeView.fields.length"
          class="rve__empty"
        >
          Полей нет: выберите запрос с сохранёнными колонками и нажмите «Взять колонки из запроса».
        </div>
      </div>
    </div>

    <div
      v-else
      class="rve__empty"
    >
      У отчёта нет видов. Добавьте вид: СВОД, ТАБЛИЦА, ИНФОГРАФИКА или КАРТА.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { DxSelectBox } from 'devextreme-vue/select-box';
import {
  AREA_OPTIONS,
  VIEW_TITLES,
  VIEW_TYPES,
  createView,
  mergeViewFields,
  type ReportViewDef,
  type ViewField,
  type ViewType,
} from '@/utils/report-views';

// Редактор видов отчёта: вкладки видов и таблица полей. Массив видов
// принадлежит странице — структурные изменения отдаются через update:views,
// настройки полей меняются на месте (объекты реактивны).

const props = defineProps<{
  views: ReportViewDef[];
  columns: Array<{ name: string; caption?: string }>;
}>();

const emit = defineEmits<{ 'update:views': [ReportViewDef[]] }>();

const activeIndex = ref(0);
const dragIndex = ref<number | null>(null);
const overIndex = ref<number | null>(null);
const newType = ref<ViewType | ''>('');
const areaOptions = AREA_OPTIONS;

const activeView = computed<ReportViewDef | undefined>(() => props.views[activeIndex.value]);

const availableTypes = computed(() => VIEW_TYPES
  .filter((type) => !props.views.some((view) => view.type === type))
  .map((type) => ({ value: type, label: VIEW_TITLES[type] })));

watch(availableTypes, (types) => {
  if (!types.some((item) => item.value === newType.value)) {
    newType.value = '';
  }
});

watch(() => props.views.length, (length) => {
  if (activeIndex.value > length - 1) activeIndex.value = Math.max(0, length - 1);
});

function addView() {
  if (!newType.value) return;
  const created = createView(newType.value, props.columns);
  emit('update:views', [...props.views, created]);
  activeIndex.value = props.views.length;
  newType.value = '';
}

function removeView(index: number) {
  const next = props.views.filter((_, position) => position !== index);
  emit('update:views', next);
  activeIndex.value = Math.min(activeIndex.value, Math.max(0, next.length - 1));
}

function fillFromColumns() {
  if (!activeView.value) return;
  activeView.value.fields = mergeViewFields(props.columns, activeView.value.fields);
}

function setAllVisible(value: boolean) {
  if (!activeView.value) return;
  for (const field of activeView.value.fields) field.visible = value;
}

function setVisible(field: ViewField, event: Event) {
  const target = event.target as HTMLInputElement | null;
  field.visible = Boolean(target?.checked);
}

function setCaption(field: ViewField, event: Event) {
  const target = event.target as HTMLInputElement | null;
  field.caption = target?.value ?? field.caption;
}

function setWidth(field: ViewField, event: Event) {
  const target = event.target as HTMLInputElement | null;
  const raw = target?.value ?? '';
  if (!raw.trim()) {
    delete field.width;
    return;
  }
  const width = Number(raw);
  if (Number.isFinite(width)) field.width = width;
}

function setFormat(field: ViewField, event: Event) {
  const target = event.target as HTMLInputElement | null;
  const value = (target?.value ?? '').trim();
  if (!value) delete field.format;
  else field.format = value;
}

function setArea(field: ViewField, event: Event) {
  const target = event.target as HTMLSelectElement | null;
  const value = target?.value ?? '';
  if (!value) delete field.area;
  else field.area = value;
}

function onDragStart(index: number, event: DragEvent) {
  dragIndex.value = index;
  event.dataTransfer?.setData('text/plain', String(index));
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
}

function onDragOver(index: number) {
  if (dragIndex.value === null) return;
  overIndex.value = index;
}

function onDragLeave(index: number) {
  if (overIndex.value === index) overIndex.value = null;
}

function onDrop(index: number) {
  const from = dragIndex.value;
  const fields = activeView.value?.fields;
  if (from === null || !fields || from === index) {
    resetDrag();
    return;
  }

  const [item] = fields.splice(from, 1);
  fields.splice(index, 0, item);
  resetDrag();
}

function resetDrag() {
  dragIndex.value = null;
  overIndex.value = null;
}

function move(index: number, delta: number) {
  if (!activeView.value) return;
  const target = index + delta;
  if (target < 0 || target >= activeView.value.fields.length) return;
  const fields = activeView.value.fields;
  const [item] = fields.splice(index, 1);
  fields.splice(target, 0, item);
}
</script>

<style scoped>
.rve {
  color: var(--dx-color-text, #1f2937);
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  gap: 8px;
}

.rve__tabs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.rve__tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  color: inherit;
  background: transparent;
  border: 1px solid var(--dx-color-border, #d1d5db);
  border-radius: 8px;
  cursor: pointer;
}

.rve__tab--active {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.12);
}

.rve__tab-count {
  opacity: 0.6;
}

.rve__tab-close {
  opacity: 0.5;
}

.rve__tab-close:hover {
  opacity: 1;
}

.rve__spacer {
  flex: 1 1 auto;
}

.rve__add-type {
  width: 180px;
}

.rve__body {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 auto;
  gap: 8px;
}

.rve__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rve__hint {
  font-size: 11px;
  opacity: 0.7;
}

.rve__table-wrap {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
}

.rve__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.rve__table th,
.rve__table td {
  padding: 4px 8px;
  text-align: left;
  border-bottom: 1px solid var(--dx-color-border, #f1f5f9);
  white-space: nowrap;
}

.rve__table th {
  position: sticky;
  top: 0;
  background: var(--dx-color-main-bg, #fff);
  font-weight: 600;
  z-index: 1;
}

.rve__row--drag {
  opacity: 0.45;
}

.rve__row--over td {
  box-shadow: inset 0 2px 0 #3b82f6;
}

.rve__drag-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.rve__grip {
  cursor: grab;
  opacity: 0.5;
  letter-spacing: -2px;
}

.rve__grip:active {
  cursor: grabbing;
}

.rve__row--hidden {
  opacity: 0.5;
}

.rve__name {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

.rve__col-on {
  width: 40px;
}

.rve__col-width {
  width: 90px;
}

.rve__col-format {
  width: 100px;
}

.rve__col-area {
  width: 120px;
}

.rve__col-order {
  width: 64px;
}

.rve__input {
  width: 100%;
  padding: 2px 6px;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 6px;
}

.rve__input:focus {
  border-color: #93c5fd;
  outline: none;
}

.rve__input--num {
  text-align: right;
}

.rve__order {
  display: flex;
  gap: 2px;
}

.rve__move {
  width: 22px;
  height: 20px;
  padding: 0;
  line-height: 1;
  color: inherit;
  background: transparent;
  border: 1px solid var(--dx-color-border, #d1d5db);
  border-radius: 4px;
  cursor: pointer;
}

.rve__move:disabled {
  opacity: 0.35;
  cursor: default;
}

.rve__empty {
  padding: 16px;
  font-size: 12px;
  opacity: 0.7;
}
</style>
