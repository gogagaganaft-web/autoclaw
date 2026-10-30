<template>
  <div class="view-wrapper fa">
    <div class="fa__body">
      <div class="fa__main">
      <div class="fa__toolbar theme-dependent">
        <dx-button
          icon="refresh"
          styling-mode="outlined"
          hint="Обновить список"
          @click="load()"
        />
        <dx-button
          icon="plus"
          styling-mode="outlined"
          hint="Новый фильтр"
          @click="openCreate()"
        />
        <dx-button
          icon="copy"
          styling-mode="outlined"
          hint="Дублировать выбранный"
          :disabled="!selectedField"
          @click="openDuplicate()"
        />
        <dx-button
          icon="trash"
          styling-mode="outlined"
          hint="Удалить выбранный"
          :disabled="!selectedField"
          @click="removeSelected()"
        />
        <dx-button
          icon="panelright"
          :type="panelOpen ? 'default' : 'normal'"
          :styling-mode="panelOpen ? 'contained' : 'outlined'"
          :hint="panelOpen ? 'Скрыть панель' : 'Открыть панель'"
          :disabled="!selectedField"
          @click="togglePanel()"
        />

        <span class="fa__spacer" />

        <span
          v-if="status"
          class="fa__status"
          :class="{ 'fa__status--error': statusError }"
        >{{ status }}</span>
      </div>
        <dx-data-grid
          ref="gridRef"
          class="fa__grid"
          :data-source="rows"
          :columns="columns"
          :show-borders="true"
          :column-auto-width="true"
          :allow-column-resizing="true"
          :word-wrap-enabled="true"
          :hover-state-enabled="true"
          :selection="{ mode: 'single' }"
          :selected-row-keys="selectedField ? [selectedField] : []"
          key-expr="field"
          height="100%"
          @row-click="onRowClick"
        />
      </div>

      <div
        v-show="panelOpen"
        class="fa__splitter"
        role="separator"
        aria-orientation="vertical"
        title="Потяните, чтобы изменить ширину панели"
        @mousedown="startResize"
      />

      <section
        v-show="panelOpen"
        class="fa__panel theme-dependent"
        :style="{ width: `${panelWidth}px` }"
      >
        <header class="fa__panel-head">
          <div class="fa__panel-title">
            <template v-if="panelMode === 'create'">
              {{ createMode === 'copy' ? 'Копия фильтра' : 'Новый фильтр' }}
              <span class="fa__panel-sub">· {{ typeTitle(createType) }}</span>
            </template>
            <template v-else-if="currentItem">
              {{ currentField }}
              <span class="fa__panel-sub">· {{ typeTitle(currentItem.type) }}</span>
            </template>
            <template v-else>
              Фильтр
            </template>
          </div>
          <dx-button
            v-if="panelMode === 'edit' && currentField"
            icon="clock"
            styling-mode="text"
            hint="История изменений"
            @click="openHistory()"
          />
          <dx-button
            icon="close"
            styling-mode="text"
            hint="Закрыть"
            @click="closePanel()"
          />
        </header>

        <div class="fa__panel-body">
          <!-- Создание: тип и ключ задают каркас, дальше те же секции правки -->
          <template v-if="panelMode === 'create'">
            <label class="fa__field">
              <span class="fa__field-label">Тип</span>
              <select
                v-model="createType"
                class="fa__native-select"
              >
                <optgroup
                  v-for="group in typeGroups"
                  :key="group.code"
                  :label="group.title"
                >
                  <option
                    v-for="option in group.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </optgroup>
              </select>
            </label>

            <label class="fa__field">
              <span class="fa__field-label">Ключ поля <b>*</b></span>
              <input
                v-model="createField"
                class="fa__native-input"
                placeholder="например, ПериодМесяцы"
              >
            </label>

            <label class="fa__field">
              <span class="fa__field-label">Подпись</span>
              <input
                v-model="createLabel"
                class="fa__native-input"
                placeholder="Период расчета"
              >
            </label>
          </template>

          <template v-if="activeType">
            <div class="fa__section-title">
              Пример фильтра
            </div>
            <!-- Ключ: смена строки/типа/состояния правки пересоздаёт пример
                 с нуля — виджеты не таскают значения прошлого фильтра. -->
            <filter-preview
              :key="`preview:${panelMode}:${currentField}:${activeType}:${editNonce}`"
              :def="liveConfig"
              :items-override="previewItemsOverride"
              @update:value="previewValue = $event"
            />
            <div
              v-if="previewRows.length"
              class="fa__values"
            >
              <div class="fa__hint">
                Возвращаемые значения
              </div>
              <div
                v-for="row in previewRows"
                :key="row.token"
                class="fa__value-row"
              >
                <code class="fa__value-token">{{ row.token }}</code>
                <span class="fa__value-arrow">→</span>
                <span
                  class="fa__value-text"
                  :class="{ 'fa__value-text--empty': row.empty }"
                >{{ row.value }}</span>
              </div>
            </div>

            <!-- Секции правки: аккордеоном, «Данные» меняет пример сразу.
                 Ключ пересоздаёт формы при смене фильтра/типа: dxForm не
                 отслеживает глубокие замены form-data живого объекта. -->
            <div
              :key="accordionKey"
              class="fa__acc"
            >
              <div
                v-for="section in activeSections"
                :key="section.code"
                class="fa__acc-item"
                :class="{ 'fa__acc-item--open': openSections.has(section.code) }"
              >
                <button
                  type="button"
                  class="fa__acc-head"
                  @click="toggleSection(section.code)"
                >
                  <span class="fa__acc-chev" />
                  {{ section.title }}
                </button>

                <div
                  v-if="openSections.has(section.code)"
                  class="fa__acc-body"
                  :class="{ 'fa__acc-body--tall': section.code === 'data' && sqlPropName }"
                >
                  <dx-form
                    v-if="section.items.length"
                    :items="section.items"
                    :form-data="editData"
                    :col-count="2"
                    label-location="top"
                    :show-colon-after-label="false"
                    :on-field-data-changed="onEditFieldChanged"
                  />

                  <!-- Список запросов: все варианты токенов подстановки -->
                  <template v-if="section.code === 'queries'">
                    <div
                      v-if="queryTokens.length"
                      class="fa__hint"
                    >
                      Все варианты подстановки в SQL отчётов:
                    </div>
                    <div
                      v-for="item in queryTokens"
                      :key="item.token"
                      class="fa__token-row"
                    >
                      <code class="fa__value-token">{{ item.token }}</code>
                      <span class="fa__hint">{{ item.hint }}</span>
                    </div>
                    <div
                      v-if="!queryTokens.length"
                      class="fa__hint"
                    >
                      Укажите ключ поля — варианты построятся от него.
                    </div>
                  </template>

                  <!-- Список отчетов: где фильтр используется -->
                  <template v-if="section.code === 'usage'">
                    <div
                      v-if="usageLoading"
                      class="fa__hint"
                    >
                      Загрузка…
                    </div>
                    <template v-else-if="usageReports.length">
                      <div class="fa__hint">
                        Использован в отчётах ({{ usageReports.length }}):
                      </div>
                      <div class="fa__usage-list">
                        <div
                          v-for="report in usageReports"
                          :key="report.key"
                          class="fa__usage-row"
                        >
                          <span class="fa__usage-title">{{ report.title }}</span>
                          <code class="fa__usage-key">{{ report.key }}</code>
                          <dx-button
                            text="Открыть"
                            styling-mode="text"
                            @click="openReport(report.key)"
                          />
                        </div>
                      </div>
                      <div class="fa__hint">
                        Чтобы удалить фильтр, замените его другим
                        или сначала удалите/отвяжите фильтр в этих отчётах.
                      </div>
                    </template>
                    <div
                      v-else
                      class="fa__hint"
                    >
                      Не используется ни в одном отчёте.
                    </div>
                  </template>

                  <template v-if="section.code === 'data'">
                    <!-- Список (поиск, чекбокс): таблица id/name при itemsKind=list -->
                    <template v-if="activeType === 'multi-select-list' && defItemsTable">
                      <div class="fa__items-grid">
                          <dx-data-grid
                            :data-source="itemsRows"
                            :columns="[
                              { dataField: 'id', caption: 'id', width: 120 },
                              { dataField: 'name', caption: 'name' },
                              { caption: '', width: 34, cellTemplate: 'delItem', allowSorting: false },
                            ]"
                            :show-borders="true"
                            height="260"
                            key-expr="_row"
                            @row-updated="onItemsRowUpdated"
                          >
                            <template #delItem="{ data }">
                              <span
                                class="dx-icon dx-icon-trash fa__items-del"
                                title="Удалить строку"
                                @click="removeItemRow(data._row)"
                              />
                            </template>
                          </dx-data-grid>
                        </div>
                        <div class="fa__check-row">
                          <dx-button
                            text="Добавить строку"
                            icon="plus"
                            styling-mode="outlined"
                            @click="addItemRow()"
                          />
                          <span class="fa__hint">Таблица заполняет items; SQL-вариант сохраняется в конфиге</span>
                        </div>
                    </template>

                    <template v-if="sqlPropName && !defItemsTable">
                      <!-- «Проверить» — первой строкой, рядом вердикт -->
                      <div class="fa__check-row">
                        <dx-button
                          text="Проверить"
                          icon="check"
                          styling-mode="outlined"
                          :disabled="checking"
                          @click="checkSql()"
                        />
                        <span
                          v-if="checkVerdict"
                          class="fa__verdict"
                          :class="{ 'fa__verdict--error': checkFailed }"
                        >{{ checkVerdict }}</span>
                      </div>

                      <div class="fa__sql">
                        <sql-editor
                          :model-value="sqlDraft"
                          :height="sqlEditorHeight"
                          :db-name="String(liveConfig.dbName || '')"
                          @update:model-value="onSqlInput($event)"
                        />
                      </div>

                      <!-- Горизонтальный ресайз: высота редактора ↔ грида -->
                      <div
                        class="fa__hresizer"
                        role="separator"
                        aria-orientation="horizontal"
                        title="Потяните, чтобы изменить высоту редактора и таблицы"
                        @mousedown="startSqlResize"
                      />

                      <div
                        class="fa__check-grid"
                        :style="{ height: checkGridHeight + 'px' }"
                      >
                        <dx-data-grid
                          :data-source="checkRows"
                          :columns="checkColumns"
                          :show-borders="true"
                          :height="checkGridHeight"
                        />
                      </div>
                      <div class="fa__hint">
                        Плоский справочник: колонки id и name. Иерархический: ID, PARENT
                        (для hr-fond ещё GRP и NODE).
                      </div>
                    </template>
                    <div
                      v-else
                      class="fa__hint"
                    >
                      У этого типа нет SQL справочника.
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </template>
        </div>

        <footer class="fa__panel-foot">
          <dx-button
            v-if="panelMode === 'edit' && dirty"
            text="Отменить правки"
            styling-mode="text"
            @click="resetEditState()"
          />
          <dx-button
            :text="panelMode === 'create' ? 'Создать' : 'Сохранить'"
            type="default"
            styling-mode="contained"
            :disabled="!canSave"
            @click="savePanel()"
          />
        </footer>
      </section>
    </div>

    <history-drawer
      :visible="historyOpen"
      :title="historyTitle"
      :items="historyItems"
      @close="historyOpen = false"
    />

    <!-- Удаление используемого фильтра: заменить на другой или сначала
         разобраться с отчётами вручную -->
    <div
      v-if="deleteDialogOpen"
      class="fa__overlay"
      @click.self="deleteDialogOpen = false"
    >
      <div class="fa__dialog theme-dependent">
        <header class="fa__dialog-head">
          <span>Удаление фильтра «{{ deleteTarget }}»</span>
          <button
            type="button"
            class="fa__dialog-close"
            @click="deleteDialogOpen = false"
          >
            ×
          </button>
        </header>

        <div
          v-if="deleteUsage.length"
          class="fa__hint"
        >
          Фильтр используется в отчётах ({{ deleteUsage.length }}):
        </div>
        <div
          v-if="deleteUsage.length"
          class="fa__usage-list fa__usage-list--dialog"
        >
          <div
            v-for="report in deleteUsage"
            :key="report.key"
            class="fa__usage-row"
          >
            <span class="fa__usage-title">{{ report.title }}</span>
            <code class="fa__usage-key">{{ report.key }}</code>
          </div>
        </div>

        <div
          v-if="deleteQueryUsage.length"
          class="fa__hint"
        >
          Фильтр участвует в запросах ({{ deleteQueryUsage.length }}):
        </div>
        <div
          v-if="deleteQueryUsage.length"
          class="fa__usage-list fa__usage-list--dialog"
        >
          <div
            v-for="query in deleteQueryUsage"
            :key="query.key"
            class="fa__usage-row"
          >
            <span class="fa__usage-title">{{ query.title }}</span>
            <code class="fa__usage-key">{{ query.key }}</code>
          </div>
        </div>

        <label class="fa__field">
          <span class="fa__field-label">Заменить в этих отчётах на</span>
          <dx-select-box
            :items="replacementOptions"
            value-expr="value"
            display-expr="label"
            :value="deleteReplacement"
            placeholder="Выберите фильтр"
            @value-changed="deleteReplacement = $event.value"
          />
        </label>
        <div class="fa__hint">
          Токены SQL ({{ '{' }}{{ deleteTarget }}{{ '}' }} и его _start/_end)
          будут переписаны на новый фильтр. Либо сначала удалите
          или отвяжите фильтр в этих отчётах и запросах вручную.
        </div>

        <div class="fa__dialog-foot">
          <dx-button
            text="Отмена"
            styling-mode="outlined"
            :disabled="deleteBusy"
            @click="deleteDialogOpen = false"
          />
          <dx-button
            text="Заменить и удалить"
            type="default"
            styling-mode="contained"
            :disabled="!deleteReplacement || deleteBusy"
            @click="confirmReplaceAndDelete()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { SIDE_MENU_MIN_WIDTH, setSideMenuWidth, sideMenuWidth } from '@/composables/use-side-menu';
import { DxButton } from 'devextreme-vue/button';
import { DxDataGrid } from 'devextreme-vue/data-grid';
import { DxForm } from 'devextreme-vue/form';
import { DxSelectBox } from 'devextreme-vue/select-box';
import FilterPreview from '@/components/library/filter-preview.vue';
import HistoryDrawer, { type HistoryItem } from '@/components/common/history-drawer.vue';
import SqlEditor from '@/components/report-editor/sql-editor.vue';
import { filtersApi, type FilterDef } from '@/services/filters-api';
import { reportsApi, type Report } from '@/services/reports-api';
import { queriesApi, type QueryDef } from '@/services/queries-api';
import { tokenRe } from '@/utils/sql-completion';
import {
  FILTER_GROUP_TITLES,
  FILTER_PROTOTYPES,
  filterPrototype,
  filterPrototypeProps,
  type FilterProp,
} from '@/utils/filter-prototypes';
import {
  defaultFilterDef,
  defaultVarNames,
  placeholderTokens,
} from '@/utils/filter-values';
import { interpolateQuery } from '@/utils/query-interpolate';

// ─── СОСТОЯНИЕ ──────────────────────────────────────────────────────────────

const PROP_GROUP_TITLES: Record<string, string> = {
  main: 'Основное',
  data: 'Данные',
  layout: 'Расположение',
  search: 'Поиск',
  format: 'Формат',
};

/** Порядок секций аккордеона. */
const SECTION_ORDER = ['main', 'data', 'layout', 'search', 'format'];

const items = ref<FilterDef[]>([]);
const status = ref('');
const statusError = ref(false);

// Панель: закрыта, правка выбранного фильтра или создание нового.
const gridRef = ref<any>(null);

/** Грид не следит за контейнером сам: после смены ширины пересчитываем
 *  раскладку и прячем «Тип», когда таблица ужалась до колонки «Подпись». */
const GRID_TYPE_COLUMN_MIN = 430;

async function refreshGrid() {
  const inst = gridRef.value?.instance;
  if (!inst) return;
  // Ширину меряем после ре-рендера Vue: на mouseup DOM ещё старый.
  await nextTick();
  try {
    inst.updateDimensions?.();
    const width = document.querySelector('.fa__main')?.clientWidth ?? 0;
    inst.columnOption('typeCaption', 'visible', width >= GRID_TYPE_COLUMN_MIN);
  } catch { /* грид ещё не смонтирован */ }
}

const panelMode = ref<'closed' | 'edit' | 'create'>('closed');
// Стартовая ширина панели — доля окна: фиксированные 520px на узком экране
// съедали больше половины области и гроздили таблицу до ~400px.
const panelWidth = ref(Math.min(560, Math.max(360, Math.round(window.innerWidth * 0.3))));
const currentField = ref('');
const selectedField = ref('');

const sqlDraft = ref('');
const dirty = ref(false);
const checking = ref(false);
const checkVerdict = ref('');
const checkFailed = ref(false);
/** Таблица id/name — источник «Списка» при itemsKind=list. */
const defMonthsKind = computed(() => liveConfig.value.itemsKind === 'months');
const defItemsTable = computed(() =>
  activeType.value === 'multi-select-list' && liveConfig.value.itemsKind === 'list');

interface ItemRow { _row: number; id: string; name: string }
const itemsRows = ref<ItemRow[]>([]);
let itemRowSeq = 0;

function syncItemsEditor(): void {
  const raw = Array.isArray(editData.items) ? editData.items : [];
  itemRowSeq = 0;
  itemsRows.value = raw.map((it: Record<string, unknown>) => ({
    _row: ++itemRowSeq,
    id: String(it?.id ?? ''),
    name: String(it?.name ?? ''),
  }));
}

function onItemsRowUpdated(e: { data?: Record<string, unknown> }): void {
  if (!e.data) return;
  const row = itemsRows.value.find((r) => r._row === e.data?._row);
  if (row) {
    row.id = String(e.data.id ?? '');
    row.name = String(e.data.name ?? '');
  }
  commitItemsToEditData();
}

function addItemRow(): void {
  itemRowSeq += 1;
  itemsRows.value = [...itemsRows.value, { _row: itemRowSeq, id: '', name: '' }];
  commitItemsToEditData();
}

function removeItemRow(row: number): void {
  itemsRows.value = itemsRows.value.filter((r) => r._row !== row);
  commitItemsToEditData();
}

/** Грид пишет массив прямо в editData.items — assembleConfig возьмёт его. */
function commitItemsToEditData(): void {
  editData.items = itemsRows.value
    .filter((r) => String(r.id).trim() !== '' || r.name.trim() !== '')
    .map((r) => ({ id: autoType(String(r.id)), name: r.name }));
  dirty.value = true;
}

function autoType(value: string): string | number {
  if (value !== '' && Number.isFinite(Number(value))) return Number(value);
  return value;
}

const checkColumns = ref<Array<{ dataField: string; caption: string }>>([]);
const checkRows = ref<Record<string, unknown>[]>([]);
/** Высоты редактора SQL и грида результатов; меняются полоской между ними. */
const sqlEditorHeight = ref(400);
const checkGridHeight = ref(400);
const previewItems = ref<Array<{ id: unknown; name: string }>>([]);
const previewValue = ref<unknown>(null);

// Аккордеон секций: какие открыты.
const openSections = ref(new Set<string>(['main', 'data']));

const historyOpen = ref(false);
const historyTitle = ref('');
const historyItems = ref<HistoryItem[]>([]);

const createMode = ref<'new' | 'copy'>('new');
const createType = ref('dateRange');
const createField = ref('');
const createLabel = ref('');
let copySource: FilterDef | null = null;

// Рабочее состояние правки: что показано в секциях и что уйдёт в «Сохранить».
const editData = reactive<Record<string, unknown>>({});
let editConfig: Record<string, unknown> = {};
let editSortOrder = 0;

// ─── ТАБЛИЦА ────────────────────────────────────────────────────────────────

function typeTitle(code: string): string {
  return filterPrototype(code)?.title || code;
}

function optionToIsoDay(value: unknown): string {
  if (!value) return '';
  if (value instanceof Date) {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
  }
  if (typeof value === 'string') return value.slice(0, 10);
  if (typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    const year = Number(rec.year);
    const month = Number(rec.month);
    const day = Number(rec.day ?? 1);
    if (Number.isFinite(year) && Number.isFinite(month)) {
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${year}-${pad(month + 1)}-${pad(day)}`;
    }
  }
  return '';
}

const rows = computed(() => items.value.map((item) => ({
  field: item.field,
  sort_order: item.sort_order,
  type: item.type,
  typeCaption: typeTitle(item.type),
  label: item.label || '',
  dbName: String((item.config as Record<string, unknown>)?.dbName || ''),
})));

const columns = [
  // При сжатии таблицы (панель растянута широко) «Тип» прячется первым —
  // остаётся колонка «Подпись».
  { dataField: 'typeCaption', caption: 'Тип', minWidth: 220, hidingPriority: 0 },
  { dataField: 'label', caption: 'Подпись', minWidth: 180 },
];

function onRowClick(e: { rowType?: string; data?: { field?: string } }) {
  if (e.rowType !== 'data') return;
  selectFilter(String(e.data?.field || ''));
}

// ─── АКТИВНЫЙ ТИП И СЕКЦИИ ──────────────────────────────────────────────────

const currentItem = computed(() => items.value.find((item) => item.field === currentField.value));
const activeType = computed(() =>
  panelMode.value === 'create' ? createType.value : String(currentItem.value?.type || ''));

const sqlPropName = computed(() => {
  const proto = activeType.value ? filterPrototype(activeType.value) : null;
  if (!proto) return '';
  const prop = filterPrototypeProps(proto.code).find((item) => item.kind === 'sql');
  return prop ? prop.name : '';
});

/** Поля формы для секции: только то, что реально читает сборщик. */
function formItemFor(prop: FilterProp): Record<string, unknown> {
  const base: Record<string, unknown> = {
    dataField: prop.name,
    label: { text: prop.label },
  };

  switch (prop.kind) {
    case 'flag':
      return { ...base, editorType: 'dxCheckBox', editorOptions: { width: 'auto' } };
    case 'number':
      return {
        ...base,
        editorType: 'dxNumberBox',
        editorOptions: { showClearButton: true, width: '100%' },
      };
    case 'select':
      return {
        ...base,
        editorType: 'dxSelectBox',
        editorOptions: {
          items: prop.options || [],
          valueExpr: 'value',
          displayExpr: 'label',
          showClearButton: true,
          width: '100%',
        },
      };
    case 'date':
      return {
        ...base,
        editorType: 'dxDateBox',
        editorOptions: {
          type: 'date', displayFormat: 'yyyy-MM-dd', showClearButton: true, width: '100%',
        },
      };
    case 'tokens':
      return {
        ...base,
        colSpan: 2,
        editorType: 'dxTagBox',
        editorOptions: {
          acceptCustomValue: true,
          showClearButton: true,
          showSelectionControls: false,
          width: '100%',
          placeholder: 'ПериодДни_start, ПериодДни_end',
        },
      };
    case 'items':
    case 'json':
      return {
        ...base,
        colSpan: 2,
        editorType: 'dxTextArea',
        editorOptions: { height: 96, autoResizeEnabled: false, width: '100%' },
        // Значение хранится текстом: JSON нельзя редактировать объектом.
        dataField: `${prop.name}Text`,
        label: { text: `${prop.label} (JSON)` },
      };
    default:
      return { ...base, editorOptions: { width: '100%' } };
  }
}

interface EditSection {
  code: string;
  title: string;
  items: Record<string, unknown>[];
}

const activeSections = computed<EditSection[]>(() => {
  const proto = activeType.value ? filterPrototype(activeType.value) : null;
  if (!proto) return [];

  const hasSqlProp = filterPrototypeProps(proto.code).some((item) => item.kind === 'sql');

  const sortOrderItem: Record<string, unknown> = {
    dataField: 'sort_order',
    label: { text: 'Порядок в панели' },
    editorType: 'dxNumberBox',
    editorOptions: { min: 0, showClearButton: false, width: '100%' },
  };

  const groups = new Map<string, FilterProp[]>();
  for (const prop of filterPrototypeProps(proto.code)) {
    if (prop.kind === 'sql' || prop.name === 'field') continue;
    const list = groups.get(prop.group) ?? [];
    list.push(prop);
    groups.set(prop.group, list);
  }

  const sections: EditSection[] = [];
  for (const code of SECTION_ORDER) {
    const props = groups.get(code);
    // У типов с SQL справочником секция «Данные» есть всегда — даже без
    // полей формы (dbName/preload переехали в «Основное»).
    if ((!props || !props.length) && !(code === 'data' && hasSqlProp)) continue;
    const groupItems = (props ?? []).map((prop) => formItemFor(prop));
    // Порядок в панели — вопрос раскладки, поэтому он в этой группе.
    if (code === 'layout') groupItems.unshift(sortOrderItem);
    sections.push({
      code,
      title: PROP_GROUP_TITLES[code] || code,
      items: groupItems,
    });
  }

  // «Список запросов»: все варианты токенов подстановки этого фильтра.
  sections.push({ code: 'queries', title: 'Список запросов', items: [] });

  // «Список отчетов»: где фильтр используется. Только для существующего.
  if (panelMode.value === 'edit') {
    sections.push({
      code: 'usage',
      title: reportsCache.value
        ? `Список отчетов (${usageReports.value.length})`
        : 'Список отчетов',
      items: [],
    });
  }
  return sections;
});

/** Открыт один раздел: новый клик сворачивает остальные. */
function toggleSection(code: string) {
  openSections.value = openSections.value.has(code) ? new Set() : new Set([code]);
}

/** Все варианты токенов фильтра для SQL-запросов (включая _start/_end/_num). */
const queryTokens = computed<Array<{ token: string; hint: string }>>(() => {
  const type = activeType.value;
  const proto = type ? filterPrototype(type) : null;
  const field = panelMode.value === 'create' ? createField.value.trim() : currentField.value;
  if (!proto || !field) return [];
  // Токены идут из var (контракт SQL), не из шаблона прототипа.
  const names = placeholderTokens(
    proto,
    field,
    (liveConfig.value.var as string[] | undefined) ?? undefined,
  ).map((token) => token.replace(/^\{|\}$/g, ''));
  return names.map((name) => {
    let hint = 'Значение фильтра';
    if (name.endsWith('_start')) hint = 'Начало диапазона';
    else if (name.endsWith('_end')) hint = 'Конец диапазона';
    return { token: `{${name}}`, hint };
  });
});

/** Формы аккордеона живут, пока не сменился фильтр, тип или состояние правки.
     Нонус: dxForm не подтягивает замену значений в том же объекте form-data
     (шим сравнивает по ссылке), поэтому реинициализация пересоздаёт формы. */
const editNonce = ref(0);
const accordionKey = computed(() =>
  `${panelMode.value === 'create' ? `create:${createType.value}` : `edit:${currentField.value}:${activeType.value}`}#${editNonce.value}`);

// ─── «ДЕЙСТВУЕТ»: ОТЧЁТЫ С ФИЛЬТРОМ ─────────────────────────────────────────

const router = useRouter();

const reportsCache = ref<Report[] | null>(null);
const usageLoading = ref(false);

function escapeRe(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Токены фильтра в SQL: {Поле}, {Поле_start}, {Поле_end}, *_num. */
function tokenRe(field: string, global = false): RegExp {
  return new RegExp(
    `\\{${escapeRe(field)}((?:_start|_end|_start_num|_end_num)?)\\}`,
    global ? 'g' : '',
  );
}

/** Отчёт использует фильтр: по config.filters (объект легаси или массив
     спецификаций) или по токенам в query_text. */
function reportUsesFilter(report: Report, field: string): boolean {
  const filters = (report.config as Record<string, unknown> | undefined)?.filters;
  if (Array.isArray(filters)) {
    if (filters.some((item) => item && typeof item === 'object'
      && String((item as Record<string, unknown>).name ?? '') === field)) return true;
  } else if (filters && typeof filters === 'object'
    && field in (filters as Record<string, unknown>)) {
    return true;
  }
  return tokenRe(field).test(String(report.query_text || ''));
}

/** Список отчётов грузится один раз и только когда понадобился. */
async function ensureReports(): Promise<Report[]> {
  if (!reportsCache.value) {
    usageLoading.value = true;
    try {
      reportsCache.value = (await reportsApi.list()).filter((r) => !r.is_section);
    } finally {
      usageLoading.value = false;
    }
  }
  return reportsCache.value;
}

const usageReports = computed<Report[]>(() => {
  if (panelMode.value !== 'edit' || !currentField.value || !reportsCache.value) return [];
  return reportsCache.value.filter((report) => reportUsesFilter(report, currentField.value));
});

const queriesCache = ref<QueryDef[] | null>(null);

/** Список запросов грузится лениво — нужен для контроля удаления. */
async function ensureQueries(): Promise<QueryDef[]> {
  if (!queriesCache.value) {
    try {
      queriesCache.value = (await queriesApi.list()).queries || [];
    } catch {
      queriesCache.value = [];
    }
  }
  return queriesCache.value;
}

/** Запрос использует фильтр: по списку filters или по токенам в SQL. */
function queryUsesFilter(query: QueryDef, field: string): boolean {
  if ((query.filters || []).some((name) => name === field)) return true;
  return tokenRe(field).test(String(query.sql || ''));
}

const usedQueries = computed<QueryDef[]>(() => {
  if (panelMode.value !== 'edit' || !currentField.value || !queriesCache.value) return [];
  return queriesCache.value.filter((query) => queryUsesFilter(query, currentField.value));
});

watch([openSections, currentField], () => {
  if (panelMode.value === 'edit' && openSections.value.has('usage') && !reportsCache.value) {
    void ensureReports();
  }
});

function openReport(key: string) {
  void router.push(`/report/${encodeURIComponent(key)}`);
}

// ─── СБОРКА КОНФИГА: ЖИВОЙ ПРЕДПРОСМОТР И СОХРАНЕНИЕ ────────────────────────

function toEditData(item: FilterDef): Record<string, unknown> {
  const proto = filterPrototype(item.type);
  const config = (item.config ?? {}) as Record<string, unknown>;
  const data: Record<string, unknown> = {
    sort_order: item.sort_order,
    label: item.label || '',
  };

  for (const prop of proto ? filterPrototypeProps(proto.code) : []) {
    if (prop.kind === 'sql') continue;
    const value = config[prop.name];
    if (prop.kind === 'items' || prop.kind === 'json') {
      data[`${prop.name}Text`] = value === undefined ? '' : JSON.stringify(value, null, 2);
      continue;
    }
    data[prop.name] = value ?? prop.default ?? '';
  }

  if (item.type === 'dateRangeMonths') {
    const opts = (config.calendarOptions ?? {}) as Record<string, unknown>;
    data.minDate = optionToIsoDay(opts.min);
    data.maxDate = optionToIsoDay(opts.max);
  }
  return data;
}

/**
 * Конфиг из текущего состояния формы. strict=true — для сохранения:
 * битый JSON останавливает. strict=false — для живого примера: битый JSON
 * просто не попадает в предпросмотр, редактор не дёргается на каждый символ.
 */
function assembleConfig(strict: boolean): { config?: Record<string, unknown>; error?: string } {
  const type = activeType.value;
  const proto = type ? filterPrototype(type) : null;
  if (!proto) return { error: 'Неизвестный тип фильтра' };

  const config: Record<string, unknown> = { ...editConfig };
  // items из грида id/name уже массив — берём как есть (проп убран из формы).
  if (Array.isArray(editData.items)) config.items = editData.items;
  for (const prop of filterPrototypeProps(proto.code)) {
    if (prop.kind === 'sql') continue;
    if (prop.name === 'items' && Array.isArray(editData.items)) continue;

    if (prop.kind === 'items' || prop.kind === 'json') {
      const text = String(editData[`${prop.name}Text`] ?? '');
      if (!text.trim()) {
        delete config[prop.name];
        continue;
      }
      try {
        config[prop.name] = JSON.parse(text);
      } catch {
        if (strict) return { error: `JSON «${prop.label}»: синтаксическая ошибка` };
      }
      continue;
    }

    if (!(prop.name in editData)) continue;
    const value = editData[prop.name];
    config[prop.name] = prop.kind === 'tokens' && Array.isArray(value)
      ? value.map((v) => String(v).trim()).filter(Boolean)
      : value;
  }

  if (type === 'dateRangeMonths') {
    const opts = { ...((config.calendarOptions as Record<string, unknown>) ?? {}) };
    const min = String(editData.minDate || '').slice(0, 10);
    const max = String(editData.maxDate || '').slice(0, 10);
    if (min) opts.min = min; else delete opts.min;
    if (max) opts.max = max; else delete opts.max;
    if (Object.keys(opts).length) config.calendarOptions = opts;
    else delete config.calendarOptions;
    delete config.minDate;
    delete config.maxDate;
  }

  if (sqlPropName.value) config[sqlPropName.value] = sqlDraft.value;

  const field = panelMode.value === 'create' ? createField.value.trim() : currentField.value;
  const label = panelMode.value === 'create'
    ? createLabel.value
    : String(editData.label ?? '');
  config.field = field;
  config.type = type;
  config.label = String(label || config.label || '');

  if (panelMode.value === 'create'
      && (!Array.isArray(config.var) || !(config.var as unknown[]).length)) {
    config.var = defaultVarNames(proto, field);
  }
  return { config };
}

/** Пример фильтра видит несохранённые правки сразу. */
const liveConfig = computed<Record<string, unknown>>(() => assembleConfig(false).config ?? {});

function onEditFieldChanged(e: { dataField?: string; value?: unknown }) {
  if (!e.dataField) return;
  editData[e.dataField] = e.value;
  dirty.value = true;
}

// ─── ПРЕДПРОСМОТР ЗНАЧЕНИЙ ──────────────────────────────────────────────────

function isEmptyPreviewValue(value: unknown): boolean {
  if (value === null || value === undefined || value === '') return true;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    return !rec.start && !rec.end;
  }
  return false;
}

/** Ручной список элементов главнее результатов проверки SQL. */
const previewItemsOverride = computed(() => {
  const own = liveConfig.value.items;
  if (Array.isArray(own) && own.length) return [];
  return previewItems.value;
});

const previewRows = computed<Array<{ token: string; value: string; empty: boolean }>>(() => {
  const type = activeType.value;
  if (!type) return [];
  const proto = filterPrototype(type);
  if (!proto) return [];

  const field = panelMode.value === 'create' ? createField.value.trim() : currentField.value;
  const tokens = placeholderTokens(
    proto,
    field,
    liveConfig.value.var as string[] | undefined,
  );
  if (!tokens.length) return [];

  if (isEmptyPreviewValue(previewValue.value)) {
    return tokens.map((token) => ({ token, value: '— не выбрано', empty: true }));
  }

  // Подставляем значение тем же кодом, что и в запросе: видно, что получит SQL.
  // Карта — по именам var (контракт SQL), как buildPayload отчёта.
  const names = tokens.map((token) => token.replace(/^\{|\}$/g, ''));
  const raw = previewValue.value;
  let values: Record<string, unknown>;
  if (names.length >= 2 && raw && typeof raw === 'object' && !Array.isArray(raw)) {
    const rec = raw as Record<string, unknown>;
    values = { [names[0]]: rec.start ?? '', [names[1]]: rec.end ?? '' };
  } else if (names.length >= 1) {
    values = { [names[0]]: raw };
  } else {
    values = { [field]: raw };
  }
  const interpolated = interpolateQuery(tokens.join(' '), values);
  return tokens.map((token) => {
    const hit = interpolated.applied.find((entry) => entry.token === token);
    return hit
      ? { token, value: hit.value, empty: false }
      : { token, value: '— не выбрано', empty: true };
  });
});

// ─── ПРОВЕРКА SQL ───────────────────────────────────────────────────────────

// Кэш результатов проверки: при переключении фильтров не дёргаем БД заново.
interface CheckCacheEntry {
  sql: string;
  columns: Array<{ dataField: string; caption: string }>;
  rows: Record<string, unknown>[];
  items: Array<{ id: unknown; name: string }>;
  verdict: string;
  failed: boolean;
}
const checkCache = new Map<string, CheckCacheEntry>();
let checkToken = 0;

function applyCheckResult(entry: CheckCacheEntry) {
  checkColumns.value = entry.columns;
  checkRows.value = entry.rows;
  checkVerdict.value = entry.verdict;
  checkFailed.value = entry.failed;
  previewItems.value = entry.items;
}

function resetCheck() {
  checkVerdict.value = '';
  checkFailed.value = false;
  checkColumns.value = [];
  checkRows.value = [];
  previewItems.value = [];
  previewValue.value = null;
}

async function autoCheck() {
  const field = currentField.value;
  const sql = sqlDraft.value.trim();
  if (field) {
    const cached = checkCache.get(field);
    if (cached && cached.sql === sql) {
      applyCheckResult(cached);
      return;
    }
  }
  await checkSql(true);
}

async function checkSql(silent = false) {
  const sql = sqlDraft.value.trim();
  const dbName = String(liveConfig.value.dbName || '');
  const type = activeType.value;

  if (!sql) {
    checkVerdict.value = 'SQL не заполнен';
    checkFailed.value = true;
    return;
  }
  if (!dbName) {
    checkVerdict.value = 'Сначала укажите базу данных (секция «Данные»)';
    checkFailed.value = true;
    return;
  }

  const token = ++checkToken;
  const field = currentField.value;
  if (!silent) checking.value = true;
  resetCheck();

  try {
    const res = await reportsApi.execute(dbName, sql);
    if (res.error) {
      checkVerdict.value = `MS SQL: ${res.error}`;
      checkFailed.value = true;
      return;
    }

    const columns = (res.columns || []).map((column, index) => {
      const field = typeof column === 'string'
        ? column
        : String((column as Record<string, unknown>).dataField ?? `col${index + 1}`);
      return { dataField: field, caption: field };
    });
    const rowsMapped = (res.rows || []).map((row) => {
      const record: Record<string, unknown> = {};
      columns.forEach((column, index) => {
        record[column.dataField] = Array.isArray(row) ? row[index] : null;
      });
      return record;
    });

    checkColumns.value = columns;
    checkRows.value = rowsMapped.slice(0, 100);

    const lower = columns.map((column) => column.dataField.toLowerCase());
    const hasId = lower.includes('id');
    const hasName = lower.includes('name') || lower.includes('node');
    const hasParent = lower.includes('parent');
    const hierarchical = type === 'hr-fond' || type === 'hierarchical-list';
    const parts: string[] = [`колонок: ${columns.length}`, `строк: ${rowsMapped.length}`];

    if (hierarchical) {
      if (hasId && hasParent) parts.push('иерархия распознана: ID + PARENT');
      else {
        checkFailed.value = true;
        parts.push('для дерева нужны колонки ID и PARENT');
      }
    } else if (hasId && hasName) {
      parts.push('плоский справочник: id + name');
    } else if (columns.length >= 2) {
      parts.push(`id/name по имени не найдены — будут взяты 1-я и 2-я: ${columns[0].dataField}, ${columns[1].dataField}`);
    } else {
      checkFailed.value = true;
      parts.push('нужны минимум две колонки: id и name');
    }

    // Заполняем «Пример фильтра» тем, что вернула проверка: списку нужны
    // элементы, иначе он выглядит пустым.
    const items = rowsMapped.slice(0, 200).map((row, index) => {
      const idField = columns[0]?.dataField;
      const nameField = columns[1]?.dataField ?? columns[0]?.dataField;
      return {
        id: row[idField] ?? index,
        name: String(row[nameField] ?? row[idField] ?? ''),
      };
    });

    const verdict = parts.join(' · ');

    // Ответ мог прийти уже после переключения на другой фильтр.
    if (token !== checkToken) return;

    checkVerdict.value = verdict;
    previewItems.value = items;
    if (field) {
      checkCache.set(field, {
        sql,
        columns,
        rows: rowsMapped.slice(0, 100),
        items,
        verdict,
        failed: checkFailed.value,
      });
    }
  } catch (e) {
    if (token === checkToken) {
      checkVerdict.value = `Ошибка: ${(e as Error).message}`;
      checkFailed.value = true;
    }
  } finally {
    if (!silent) checking.value = false;
  }
}

function onSqlInput(value: string) {
  sqlDraft.value = value;
}

// Правки SQL: помечаем грязь и через паузу перепроверяем — пример обновится сам.
let sqlCheckTimer: number | undefined;
watch(sqlDraft, (value) => {
  const saved = String((editConfig[sqlPropName.value] as string | undefined) ?? '');
  if (value === saved) return;
  dirty.value = true;
  window.clearTimeout(sqlCheckTimer);
  sqlCheckTimer = window.setTimeout(() => {
    if (sqlDraft.value.trim()) void checkSql(true);
  }, 700);
});
onBeforeUnmount(() => window.clearTimeout(sqlCheckTimer));

// ─── ВЫБОР ФИЛЬТРА И ПАНЕЛЬ ─────────────────────────────────────────────────

const panelOpen = computed(() => panelMode.value !== 'closed');

watch(panelOpen, async (isOpen) => {
  await nextTick();
  refreshGrid();
});

function initEditState(item: FilterDef) {
  const proto = filterPrototype(item.type);
  const sqlProp = proto
    ? filterPrototypeProps(proto.code).find((p) => p.kind === 'sql')
    : null;

  editConfig = { ...((item.config ?? {}) as Record<string, unknown>) };
  editSortOrder = item.sort_order;
  for (const key of Object.keys(editData)) delete editData[key];
  Object.assign(editData, toEditData(item));
  sqlDraft.value = sqlProp ? String(editConfig[sqlProp.name] || '') : '';
  editNonce.value += 1;
  dirty.value = false;
  openSections.value = new Set();
  resetCheck();
  syncItemsEditor();

  // У фильтра есть SQL — сразу применяем его к примеру, не дожидаясь «Проверить».
  if (sqlProp && sqlDraft.value.trim()) void autoCheck();
}

function confirmDiscard(): boolean {
  return !dirty.value
    || window.confirm('Есть несохранённые изменения. Отменить их?');
}

function selectFilter(field: string) {
  const item = items.value.find((row) => row.field === field);
  if (!item) return;
  if (!confirmDiscard()) return;

  currentField.value = field;
  selectedField.value = field;
  panelMode.value = 'edit';
  status.value = '';
  statusError.value = false;
  initEditState(item);
}

function togglePanel() {
  if (panelOpen.value) {
    closePanel();
    return;
  }
  if (selectedField.value) selectFilter(selectedField.value);
}

function closePanel() {
  if (!confirmDiscard()) return;
  panelMode.value = 'closed';
  currentField.value = '';
  // Строка остаётся выбранной: иначе булавка в тулбаре гаснет и панель
  // нельзя открыть снова, не кликая по строке.
  sqlDraft.value = '';
  dirty.value = false;
  resetCheck();
}

function resetEditState() {
  const item = currentItem.value;
  if (item) initEditState(item);
}

async function openHistory() {
  const field = currentField.value;
  if (!field) return;
  try {
    const data = await filtersApi.history(field);
    historyTitle.value = field;
    historyItems.value = (data.revisions || []).map((revision) => ({
      id: revision.id,
      action: revision.action,
      at: revision.changed_at,
      by: revision.changed_by,
    }));
    historyOpen.value = true;
  } catch (e) {
    status.value = `История недоступна: ${(e as Error).message}`;
    statusError.value = true;
  }
}

// ─── СОЗДАНИЕ И КОПИРОВАНИЕ ─────────────────────────────────────────────────

const typeGroups = computed(() => {
  const order: Array<'range' | 'list' | 'other'> = ['range', 'list', 'other'];
  return order.map((code) => ({
    code,
    title: FILTER_GROUP_TITLES[code],
    options: FILTER_PROTOTYPES
      .filter((proto) => proto.group === code && !proto.legacy)
      .map((proto) => ({ value: proto.code, label: proto.title })),
  })).filter((group) => group.options.length > 0);
});

function initCreateState() {
  const proto = filterPrototype(createType.value);
  const base = createMode.value === 'copy' && copySource
    ? {
      ...((copySource.config ?? {}) as Record<string, unknown>),
      type: proto?.code ?? createType.value,
      field: '',
      label: createLabel.value,
    }
    : (proto ? defaultFilterDef(proto, '') : {});

  editConfig = { ...base };
  editSortOrder = items.value.length;
  for (const key of Object.keys(editData)) delete editData[key];
  Object.assign(editData, toEditData({
    field: '',
    type: createType.value,
    label: String(base.label || ''),
    sort_order: editSortOrder,
    config: base,
  }));
  const sqlProp = proto ? filterPrototypeProps(proto.code).find((p) => p.kind === 'sql') : null;
  sqlDraft.value = sqlProp ? String(base[sqlProp.name] || '') : '';
  editNonce.value += 1;
  dirty.value = false;
  openSections.value = new Set();
  resetCheck();
  syncItemsEditor();
}

function openCreate() {
  if (!confirmDiscard()) return;
  createMode.value = 'new';
  copySource = null;
  createType.value = 'dateRange';
  createField.value = '';
  createLabel.value = '';
  panelMode.value = 'create';
  status.value = '';
  statusError.value = false;
  initCreateState();
}

function openDuplicate() {
  const item = items.value.find((row) => row.field === selectedField.value);
  if (!item) return;
  if (!confirmDiscard()) return;
  createMode.value = 'copy';
  copySource = item;
  createType.value = item.type;
  createField.value = '';
  createLabel.value = `${item.label || item.field} (копия)`;
  panelMode.value = 'create';
  status.value = '';
  statusError.value = false;
  initCreateState();
}

// Смена типа в режиме создания: каркас полей строится под новый тип.
watch(createType, () => {
  if (panelMode.value === 'create') initCreateState();
});

function validateCreateKey(field: string): string {
  if (!field) return 'Укажите ключ поля';
  if (!/^[A-Za-zА-Яа-яЁё_][A-Za-zА-Яа-яЁё0-9_]*$/.test(field)) {
    return 'Ключ: буквы, цифры и подчёркивание, без пробелов';
  }
  if (items.value.some((row) => row.field === field)) return `Ключ «${field}» уже занят`;
  return '';
}

const canSave = computed(() => {
  if (panelMode.value === 'create') return !validateCreateKey(createField.value.trim());
  return panelMode.value === 'edit' && dirty.value;
});

// ─── СОХРАНЕНИЕ ─────────────────────────────────────────────────────────────

async function savePanel() {
  if (panelMode.value === 'create') {
    await createFilter();
    return;
  }
  if (panelMode.value !== 'edit') return;

  const field = currentField.value;
  const type = activeType.value;
  const { config, error } = assembleConfig(true);
  if (error || !config) {
    status.value = error || 'Не удалось собрать конфиг';
    statusError.value = true;
    return;
  }

  try {
    await filtersApi.update(field, {
      field,
      type,
      label: String(config.label || ''),
      sort_order: Number(editData.sort_order ?? editSortOrder ?? 0),
      config,
    });
    checkCache.delete(field);
    await load();
    // Правки записаны: без сброса selectFilter спросит подтверждение
    // и заблокирует страницу родным window.confirm.
    dirty.value = false;
    selectFilter(field);
    status.value = `Сохранено: ${field}`;
    statusError.value = false;
  } catch (err) {
    status.value = `Не удалось сохранить: ${(err as Error).message}`;
    statusError.value = true;
  }
}

async function createFilter() {
  const field = createField.value.trim();
  const keyError = validateCreateKey(field);
  if (keyError) {
    status.value = keyError;
    statusError.value = true;
    return;
  }
  const proto = filterPrototype(createType.value);
  if (!proto) {
    status.value = 'Выберите тип фильтра';
    statusError.value = true;
    return;
  }

  const { config, error } = assembleConfig(true);
  if (error || !config) {
    status.value = error || 'Не удалось собрать конфиг';
    statusError.value = true;
    return;
  }
  config.field = field;
  config.type = proto.code;
  config.label = String(createLabel.value.trim() || config.label || '');
  if (!Array.isArray(config.var) || !(config.var as unknown[]).length) {
    config.var = defaultVarNames(proto, field);
  }

  try {
    await filtersApi.create({
      field,
      type: proto.code,
      label: String(config.label || ''),
      sort_order: items.value.length,
      config,
    });
    await load();
    dirty.value = false;
    panelMode.value = 'edit';
    selectFilter(field);
    status.value = `Создан: ${field}`;
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось создать: ${(e as Error).message}`;
    statusError.value = true;
  }
}

// ─── УДАЛЕНИЕ ИСПОЛЬЗУЕМОГО ФИЛЬТРА ─────────────────────────────────────────

const deleteDialogOpen = ref(false);
const deleteTarget = ref('');
const deleteUsage = ref<Report[]>([]);
/** Запросы, использующие удаляемый фильтр. */
const deleteQueryUsage = ref<QueryDef[]>([]);
const deleteReplacement = ref('');
const deleteBusy = ref(false);

const replacementOptions = computed(() => items.value
  .filter((item) => item.field !== deleteTarget.value)
  .map((item) => ({ value: item.field, label: `${item.field} — ${item.label || item.type}` })));

/** Патч отчёта: фильтр заменён в config.filters и в токенах SQL. */
function replaceFilterInReport(report: Report, from: string, to: string): Partial<Report> {
  const config = { ...((report.config ?? {}) as Record<string, unknown>) };
  const filters = config.filters;
  if (Array.isArray(filters)) {
    config.filters = filters.map((item) => (item && typeof item === 'object'
      && String((item as Record<string, unknown>).name ?? '') === from)
      ? { ...(item as Record<string, unknown>), name: to }
      : item);
  } else if (filters && typeof filters === 'object'
    && from in (filters as Record<string, unknown>)) {
    const next: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(filters as Record<string, unknown>)) {
      next[key === from ? to : key] = value;
    }
    config.filters = next;
  }

  const queryText = String(report.query_text || '')
    .replace(tokenRe(from, true), (_match, suffix: string) => `{${to}${suffix}}`);

  // PUT перезаписывает отчёт целиком: шлём все поля, какие вернул список.
  return {
    key: report.key,
    title: report.title,
    icon: report.icon,
    image: report.image ?? '',
    query_text: queryText,
    query_key: report.query_key ?? '',
    config,
    parent_id: report.parent_id ?? null,
    is_section: report.is_section ?? false,
    sort_order: report.sort_order ?? 0,
  };
}

async function confirmReplaceAndDelete() {
  const from = deleteTarget.value;
  const to = deleteReplacement.value;
  if (!from || !to) return;
  const affected = deleteUsage.value.length;

  deleteBusy.value = true;
  try {
    for (const report of deleteUsage.value) {
      await reportsApi.update(report.key, replaceFilterInReport(report, from, to));
    }
    for (const query of deleteQueryUsage.value) {
      await queriesApi.update(query.key, {
        key: query.key,
        title: query.title,
        tags: query.tags || [],
        db_key: query.db_key,
        // После замены имя может совпасть с уже существующим — без дублей.
        filters: [...new Set((query.filters || []).map((name) => (name === from ? to : name)))],
        sql: String(query.sql || '')
          .replace(tokenRe(from, true), (_match, suffix: string) => `{${to}${suffix}}`),
        columns: query.columns,
      });
    }
    await filtersApi.remove(from);
    reportsCache.value = null;
    queriesCache.value = null;
    deleteDialogOpen.value = false;
    dirty.value = false;
    if (currentField.value === from) closePanel();
    await load();
    status.value = `Фильтр «${from}» заменён на «${to}» `
      + `в ${affected} отч. и ${deleteQueryUsage.value.length} запр. и удалён`;
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось заменить и удалить: ${(e as Error).message}`;
    statusError.value = true;
  } finally {
    deleteBusy.value = false;
  }
}

async function removeSelected() {
  const field = selectedField.value;
  if (!field) return;

  // Решение принимаем по свежим данным: кэш мог протухнуть.
  reportsCache.value = null;
  queriesCache.value = null;
  let usage: Report[] = [];
  let usedQueryList: QueryDef[] = [];
  try {
    usage = (await ensureReports()).filter((report) => reportUsesFilter(report, field));
    usedQueryList = (await ensureQueries()).filter((query) => queryUsesFilter(query, field));
  } catch (e) {
    status.value = `Не удалось проверить отчёты и запросы: ${(e as Error).message}`;
    statusError.value = true;
    return;
  }

  if (!usage.length && !usedQueryList.length) {
    if (!window.confirm(`Удалить фильтр «${field}»?`)) return;
    try {
      await filtersApi.remove(field);
      // Фильтра больше нет: правки по нему теряются без второго вопроса.
      dirty.value = false;
      if (currentField.value === field) closePanel();
      await load();
      status.value = `Удалён: ${field}`;
      statusError.value = false;
    } catch (e) {
      status.value = `Не удалось удалить: ${(e as Error).message}`;
      statusError.value = true;
    }
    return;
  }

  deleteTarget.value = field;
  deleteUsage.value = usage;
  deleteQueryUsage.value = usedQueryList;
  deleteReplacement.value = '';
  deleteDialogOpen.value = true;
}

// ─── ЗАГРУЗКА ───────────────────────────────────────────────────────────────

async function load() {
  try {
    const data = await filtersApi.list();
    items.value = data.filters || [];
  } catch (e) {
    status.value = `Не удалось прочитать фильтры: ${(e as Error).message}`;
    statusError.value = true;
  }
}

// ─── РАЗДЕЛИТЕЛЬ ────────────────────────────────────────────────────────────

let resizing = false;
let resizeStartX = 0;
let resizeStartWidth = panelWidth.value;
/** Ширина таблицы и меню на старте тяги: панель растёт за их счёт. */
let resizeStartGridWidth = 0;
let resizeStartMenuWidth = sideMenuWidth.value;

/** Минимум таблицы: колонка «Подпись» + рамки. */
const GRID_MIN_WIDTH = 220;

function onMouseMove(event: MouseEvent) {
  if (!resizing) return;
  const delta = resizeStartX - event.clientX;

  // Панель тянем до 75% окна. Место берём сначала у таблицы (до «Подпись»),
  // затем у левого меню (до его минимума).
  const maxPanel = Math.round(window.innerWidth * 0.75);
  const gridGives = Math.max(0, resizeStartGridWidth - GRID_MIN_WIDTH);
  const menuGives = Math.max(0, resizeStartMenuWidth - SIDE_MENU_MIN_WIDTH);
  const upper = Math.min(maxPanel, resizeStartWidth + gridGives + menuGives);
  const next = Math.min(upper, Math.max(360, resizeStartWidth + delta));
  panelWidth.value = next;

  // Сколько не влезло за счёт таблицы — отбираем у меню (и возвращаем
  // обратно, когда панель сужают).
  const overflow = Math.max(0, next - resizeStartWidth - gridGives);
  setSideMenuWidth(Math.max(SIDE_MENU_MIN_WIDTH, Math.round(resizeStartMenuWidth - overflow)));
}

function onMouseUp() {
  resizing = false;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  refreshGrid();
}

// ─── Горизонтальный ресайз: SQL-редактор ↔ грид результатов ─────────────────

let sqlResizing = false;
let sqlResizeStartY = 0;
let sqlResizeStartEditor = 0;
let sqlResizeStartGrid = 0;

function onSqlResizeMove(event: MouseEvent) {
  if (!sqlResizing) return;
  const delta = event.clientY - sqlResizeStartY;
  // Суммарная высота двух панелей постоянна: сколько забрал редактор,
  // столько отдал грид. Минимум 120px каждой.
  const editor = Math.min(sqlResizeStartEditor + sqlResizeStartGrid - 120,
    Math.max(120, sqlResizeStartEditor + delta));
  sqlEditorHeight.value = editor;
  checkGridHeight.value = Math.max(120, sqlResizeStartEditor + sqlResizeStartGrid - editor);
}

function onSqlResizeUp() {
  sqlResizing = false;
  document.removeEventListener('mousemove', onSqlResizeMove);
  document.removeEventListener('mouseup', onSqlResizeUp);
}

function startSqlResize(event: MouseEvent) {
  sqlResizing = true;
  sqlResizeStartY = event.clientY;
  sqlResizeStartEditor = sqlEditorHeight.value;
  sqlResizeStartGrid = checkGridHeight.value;
  document.addEventListener('mousemove', onSqlResizeMove);
  document.addEventListener('mouseup', onSqlResizeUp);
}

function startResize(event: MouseEvent) {
  resizing = true;
  resizeStartX = event.clientX;
  resizeStartWidth = panelWidth.value;
  resizeStartGridWidth = document.querySelector('.fa__main')?.getBoundingClientRect().width ?? 600;
  resizeStartMenuWidth = sideMenuWidth.value;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

onMounted(() => {
  void load();
});

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onSqlResizeMove);
  document.removeEventListener('mouseup', onSqlResizeUp);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
});
</script>

<style scoped>
.fa {
  display: flex;
  flex-direction: column;
  /* Как в редакторе отчётов: страница не растягивается, панель живёт
     внутри области контента и не уходит на всю высоту экрана. */
  height: calc(100vh - 120px);
  min-height: 480px;
}

.fa__toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0 8px;
  flex: 0 0 auto;
  margin-bottom: 8px;
}

.fa__spacer {
  flex: 1 1 auto;
}

.fa__status {
  font-size: 12px;
  color: var(--dx-color-text, #374151);
}

.fa__status--error {
  color: var(--dx-color-danger, #b91c1c);
}

.fa__body {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  padding: 0 12px 12px;
}

.fa__main {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  height: 100%;
}

/* DevExtreme оборачивает виджет в свой div: растягиваем обёртку, иначе
   грид получает height:100% от блока без высоты и схлопывается. */
.fa__main > .dx-widget {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.fa__main > .dx-widget > .dx-datagrid {
  flex: 1 1 auto;
  min-height: 0;
}

.fa__splitter {
  position: relative;
  width: 6px;
  flex: 0 0 auto;
  cursor: col-resize;
  background: transparent;
  transition: background-color 0.15s ease;
}

/* «Пилюля» по центру — как у шторки панели фильтров в отчёте. */
.fa__splitter::after {
  position: absolute;
  top: 50%;
  left: 1px;
  width: 4px;
  height: 40px;
  border-radius: 2px;
  content: "";
  background-color: var(--border-color, rgba(128, 128, 128, 0.35));
  transform: translateY(-50%);
}

.fa__splitter:hover,
.fa__splitter:active {
  background-color: color-mix(in srgb, var(--border-color), var(--base-text-color) 25%);
}

.fa__panel {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  height: 100%;
  min-height: 0;
  /* Без явного цвета текст наследует чёрный и пропадает в тёмной теме. */
  color: var(--dx-color-text, #1f2937);
  background-color: var(--dx-component-color-bg, #fff);
  border-left: 1px solid var(--border-color, rgba(128, 128, 128, 0.3));
  box-shadow: -6px 0 22px rgba(0, 0, 0, 0.22);
  overflow: hidden;
}

.fa__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
  flex: 0 0 auto;
}

.fa__panel-title {
  font-weight: 600;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fa__panel-sub {
  font-weight: 400;
  opacity: 0.65;
}

.fa__panel-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  overflow: auto;
  flex: 1 1 auto;
  min-height: 0;
}

.fa__panel-foot {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid var(--dx-color-border, #e5e7eb);
  flex: 0 0 auto;
}

.fa__section-title {
  margin-top: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.6;
}

/* ─── Аккордеон секций правки ───────────────────────────────────────────── */

/* flex: 0 0 auto — иначе flex-колонка панели сжимает аккордеон и режет
   содержимое; прокручивается вся панель (см. .fa__panel-body). */
.fa__acc {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
}

.fa__acc-item + .fa__acc-item {
  border-top: 1px solid var(--dx-color-border, #e5e7eb);
}

.fa__acc-head {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  font: inherit;
  font-weight: 600;
  text-align: left;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.fa__acc-head:hover {
  background-color: color-mix(in srgb, var(--dx-color-border, #e5e7eb) 35%, transparent);
}

.fa__acc-chev {
  width: 0;
  height: 0;
  flex: 0 0 auto;
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 5px solid currentColor;
  opacity: 0.6;
  transition: transform 0.15s ease;
}

.fa__acc-item--open .fa__acc-chev {
  transform: rotate(90deg);
}

.fa__acc-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 4px 12px 12px;
}

/* «Данные» с SQL: редактор и грид с результатами — блок не ниже 800px,
   дальше панель прокручивается целиком. */
.fa__acc-body--tall {
  min-height: 800px;
}

/* Полоса прокрутки панели в стиле MSI (DevExtreme): тонкий скруглённый
   ползунок, прозрачный трек. */
.fa__panel-body::-webkit-scrollbar {
  width: 8px;
}

.fa__panel-body::-webkit-scrollbar-track {
  background: transparent;
}

.fa__panel-body::-webkit-scrollbar-thumb {
  background-color: rgba(128, 128, 128, 0.45);
  border-radius: 4px;
  background-clip: padding-box;
}

.fa__panel-body::-webkit-scrollbar-thumb:hover {
  background-color: rgba(128, 128, 128, 0.75);
}

.fa__values {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 10px;
  border: 1px dashed var(--dx-color-border, #cbd5e1);
  border-radius: 8px;
}

.fa__value-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-size: 12px;
  flex-wrap: wrap;
}

.fa__token-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 12px;
}

.fa__value-token {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
  opacity: 0.8;
}

.fa__value-arrow {
  opacity: 0.5;
}

.fa__value-text {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  word-break: break-word;
}

.fa__value-text--empty {
  opacity: 0.55;
  font-style: italic;
}

.fa__hint {
  font-size: 11px;
  opacity: 0.7;
}

.fa__sql {
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
}

.fa__items-grid {
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
}

.fa__items-del {
  cursor: pointer;
}

.fa__check-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.fa__verdict {
  font-size: 11px;
  color: var(--dx-color-success, #15803d);
}

.fa__verdict--error {
  color: var(--dx-color-danger, #b91c1c);
}

.fa__check-grid {
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
}

/* Горизонтальный ресайз между SQL-редактором и гридом результатов. */
.fa__hresizer {
  position: relative;
  height: 6px;
  flex: 0 0 auto;
  cursor: row-resize;
}

.fa__hresizer::after {
  position: absolute;
  top: 2px;
  left: 50%;
  width: 48px;
  height: 2px;
  border-radius: 1px;
  content: "";
  background-color: var(--border-color, rgba(128, 128, 128, 0.45));
  transform: translateX(-50%);
}

.fa__hresizer:hover::after,
.fa__hresizer:active::after {
  background-color: var(--dx-color-primary, #337ab7);
}

.fa__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fa__field-label {
  font-size: 12px;
  color: var(--dx-color-text, #4b5563);
}

.fa__native-select,
.fa__native-input {
  width: 100%;
  padding: 6px 8px;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid var(--dx-color-border, #d1d5db);
  border-radius: 8px;
}

/* ─── Действует: список отчётов ─────────────────────────────────────────── */

.fa__usage-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.fa__usage-list--dialog {
  max-height: 180px;
  overflow: auto;
  padding: 6px 10px;
  border: 1px dashed var(--dx-color-border, #cbd5e1);
  border-radius: 8px;
}

.fa__usage-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.fa__usage-title {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fa__usage-key {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
  opacity: 0.7;
}

/* ─── Диалог удаления используемого фильтра ─────────────────────────────── */

.fa__overlay {
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.35);
}

.fa__dialog {
  color: var(--dx-color-text, #1f2937);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 460px;
  max-width: 92vw;
  padding: 16px;
  background: var(--dx-color-main-bg, #fff);
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.25);
}

.fa__dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.fa__dialog-close {
  width: 28px;
  height: 28px;
  font-size: 18px;
  line-height: 1;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
}

.fa__dialog-foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
