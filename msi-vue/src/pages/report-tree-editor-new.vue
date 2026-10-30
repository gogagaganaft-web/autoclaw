<template>
  <div class="view-wrapper rte">
    <!-- Верхний тулбар: выбор отчёта (dxDropDownBox + dxTreeView, как в старом
         jQuery-проекте) + CRUD таблицы отчётов + запуск + сохранение -->
    <div class="rte__topbar theme-dependent">
      <dx-drop-down-box
        ref="pickerRef"
        class="rte__picker"
        width="37vw"
        :value="selectedTreeId"
        value-expr="id"
        :display-value="selectedHierarchy"
        placeholder="Выберите отчет..."
        :show-clear-button="false"
        :drop-down-options="{ width: 'auto' }"
      >
        <template #content>
          <dx-tree-view
            :items="pickerItems"
            key-expr="id"
            display-expr="text"
            selection-mode="single"
            :selected-item-keys="selectedTreeId != null ? [selectedTreeId] : []"
            :search-enabled="true"
            search-mode="contains"
            :search-expr="['text']"
            search-placeholder="Поиск..."
            height="340"
            :focus-state-enabled="false"
            expand-event="click"
            @item-click="onPickerItemClick"
          />
        </template>
      </dx-drop-down-box>

      <span class="rte__topbar-split" />

      <dx-button
        icon="refresh"
        styling-mode="outlined"
        hint="Обновить список"
        @click="loadTree()"
      />
      <dx-button
        icon="plus"
        styling-mode="outlined"
        hint="Новый отчёт"
        @click="createNode()"
      />
      <dx-button
        icon="folder"
        styling-mode="outlined"
        hint="Новый раздел"
        @click="createSection()"
      />
      <dx-button
        icon="copy"
        styling-mode="outlined"
        hint="Дублировать отчёт"
        :disabled="!selected.key || selected.isSection"
        @click="duplicateNode()"
      />
      <dx-button
        icon="trash"
        styling-mode="outlined"
        hint="Удалить выбранный отчёт"
        :disabled="!selected.key"
        @click="deleteNode()"
      />

      <span class="rte__topbar-split" />

      <dx-button
        icon="panelright"
        :type="propsOpen ? 'default' : 'normal'"
        :styling-mode="propsOpen ? 'contained' : 'outlined'"
        :hint="propsOpen ? 'Скрыть свойства' : 'Открыть свойства'"
        @click="propsOpen = !propsOpen"
      />

      <span class="rte__spacer" />

      <span
        v-if="status"
        class="rte__status"
        :class="{ 'rte__status--error': statusError }"
      >{{ status }}</span>
      <dx-button
        text="Выполнить"
        icon="run"
        type="success"
        styling-mode="contained"
        :disabled="!canRun || running"
        @click="run()"
      />
      <dx-button
        text="Сохранить"
        icon="save"
        type="default"
        styling-mode="contained"
        :disabled="!canSave"
        @click="save()"
      />
    </div>

    <div class="rte__body">
      <!-- Центр: редактор SQL + результат -->
      <main class="rte__work">
        <div class="rte__work-tabs">
          <button
            class="rte__tab"
            :class="{ 'rte__tab--active': centerMode === 'sql' }"
            type="button"
            @click="centerMode = 'sql'"
          >
            <i class="dx-icon dx-icon-variable" />
            <span>SQL</span>
          </button>
          <button
            class="rte__tab"
            :class="{ 'rte__tab--active': centerMode === 'views' }"
            type="button"
            @click="centerMode = 'views'"
          >
            <i class="dx-icon dx-icon-chart" />
            <span>Виды</span>
          </button>
          <span class="rte__spacer" />
          <span
            v-if="running"
            class="rte__status"
          >Выполняется…</span>
        </div>

        <template v-if="centerMode === 'sql'">
          <!-- Плейсхолдеры выбранных фильтров: клик вставляет токен в SQL -->
          <div class="rte__chips">
            <template v-if="insertTokens.length">
              <button
                v-for="token in insertTokens"
                :key="token"
                type="button"
                class="rte__chip"
                :title="'Вставить ' + token"
                @click="insert(token)"
              >
                {{ token }}
              </button>
            </template>
            <span
              v-else
              class="rte__hint"
            >Фильтры в свойствах отчёта зададут плейсхолдеры</span>
          </div>

          <div class="rte__sql">
            <sql-editor
              ref="editorRef"
              v-model="form.query"
              :height="sqlHeight"
            />
          </div>

          <div
            class="rte__hsplitter"
            role="separator"
            title="Потяните, чтобы изменить высоту редактора"
            @mousedown="startSqlResize($event)"
          />

          <div class="rte__grid">
            <dx-data-grid
              v-if="resultColumns.length"
              :data-source="resultRows"
              :columns="resultColumns"
              :show-borders="true"
              :allow-column-resizing="true"
              :column-auto-width="true"
              :row-alternation-enabled="true"
              :header-filter="{ visible: true }"
              :filter-row="{ visible: true, applyFilter: 'auto' }"
              height="100%"
            />
            <div
              v-else
              class="rte__empty"
            >
              {{ form.key ? 'Нажмите «Выполнить», чтобы увидеть результат' : 'Выберите отчёт в тулбаре сверху' }}
            </div>
          </div>
        </template>

        <div
          v-else
          class="rte__views"
        >
          <p class="rte__hint">
            Колонки берутся из последнего запуска или из сохранённых колонок
            привязанного запроса. У каждого вида — свой набор полей.
          </p>
          <report-views-editor
            :views="views"
            :columns="viewsColumns"
            @update:views="views = $event"
          />
        </div>
      </main>

      <div
        v-show="propsOpen"
        class="rte__vsplitter"
        role="separator"
        title="Потяните, чтобы изменить ширину свойств"
        @mousedown="startPropsResize($event)"
      />

      <!-- Справа: свойства отчёта -->
      <aside
        v-show="propsOpen"
        class="rte__props theme-dependent"
        :style="{ width: `${propsWidth}px` }"
      >
        <header class="rte__panel-head">
          <span>Свойства отчёта</span>
          <dx-button
            icon="close"
            styling-mode="text"
            hint="Скрыть панель"
            @click="propsOpen = false"
          />
        </header>

        <div class="rte__props-body">
          <div
            v-if="!form.key"
            class="rte__empty"
          >
            Выберите отчёт в выпадающем списке сверху.
          </div>

          <template v-else>
            <button
              class="rte__acc"
              type="button"
              @click="mainOpen = !mainOpen"
            >
              <i
                class="dx-icon"
                :class="mainOpen ? 'dx-icon-chevronup' : 'dx-icon-chevrondown'"
              />
              <span>Основное</span>
            </button>

            <div
              v-show="mainOpen"
              class="rte__acc-body"
            >
              <label class="rte__field">
                <span class="rte__label">Ключ</span>
                <dx-text-box
                  :value="form.key"
                  :read-only="true"
                  hint="Ключ не меняется"
                />
              </label>
              <label class="rte__field">
                <span class="rte__label">Название <b>*</b></span>
                <dx-text-box
                  :value="form.title"
                  @value-changed="form.title = $event.value"
                />
              </label>
              <label class="rte__field">
                <span class="rte__label">Раздел</span>
                <!-- Ввод показывает ключ (особенность сборки MSI dxSelectBox),
                     названия — в выпадающем списке. -->
                <dx-select-box
                  :value="form.parentId"
                  :items="parentOptions"
                  value-expr="id"
                  display-expr="title"
                  :show-clear-button="true"
                  placeholder="Корень дерева"
                  @value-changed="form.parentId = $event.value"
                />
              </label>
              <label
                v-if="!selected.isSection"
                class="rte__field"
              >
                <span class="rte__label">Запрос</span>
                <dx-select-box
                  :value="queryKey"
                  :items="queryOptions"
                  value-expr="key"
                  display-expr="title"
                  :show-clear-button="true"
                  :search-enabled="true"
                  placeholder="Запрос не выбран"
                  hint="Запрос задаёт колонки для видов отчёта"
                  @value-changed="onQueryChanged($event.value)"
                />
              </label>
              <label
                v-if="!selected.isSection"
                class="rte__field"
              >
                <span class="rte__label">База данных</span>
                <dx-select-box
                  :value="dbKey"
                  :items="dbOptions"
                  value-expr="id"
                  display-expr="name"
                  :show-clear-button="true"
                  placeholder="Не выбрана"
                  @value-changed="dbKey = $event.value"
                />
              </label>
            </div>

            <template v-if="!selected.isSection">
              <div class="rte__section-title">
                Фильтры
              </div>
              <dx-tag-box
                :value="selectedFilters"
                :items="filterOptions"
                value-expr="field"
                display-expr="caption"
                :search-enabled="true"
                :show-selection-controls="true"
                placeholder="Выберите фильтры отчёта"
                @value-changed="selectedFilters = $event.value || []"
              />
              <span class="rte__hint">Ключи config.filters — плейсхолдеры панели «Контур данных».</span>

              <template v-if="selectedDefs.length">
                <div class="rte__section-title">
                  Значения для запуска
                </div>
                <dx-button
                  text="Значения по умолчанию"
                  icon="refresh"
                  styling-mode="outlined"
                  hint="Подставить динамические умолчания (прошлый месяц, начало месяца)"
                  @click="applyDefaults()"
                />
                <div
                  v-for="def in selectedDefs"
                  :key="def.field"
                  class="rte__value"
                >
                  <filter-preview
                    :def="def.config"
                    :initial-value="values[def.field]"
                    :items-override="serverItems[def.field]"
                    @update:value="setValue(def.field, $event)"
                  />
                  <span
                    v-if="serverErrors[def.field]"
                    class="rte__value-error"
                  >{{ serverErrors[def.field] }}</span>
                </div>
              </template>
            </template>
          </template>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { DxDataGrid } from 'devextreme-vue/data-grid';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxTagBox } from 'devextreme-vue/tag-box';
import { DxTextBox } from 'devextreme-vue/text-box';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxTreeView from 'devextreme-vue/tree-view';
import FilterPreview from '@/components/library/filter-preview.vue';
import SqlEditor from '@/components/report-editor/sql-editor.vue';
import ReportViewsEditor from '@/components/report-editor/report-views-editor.vue';
import { reportsApi, type ExecuteResult, type Report } from '@/services/reports-api';
import { queriesApi, type QueryDef } from '@/services/queries-api';
import { filtersApi, type FilterDef } from '@/services/filters-api';
import { dynamicFilterValue, placeholderTokens } from '@/utils/filter-values';
import { filterPrototype } from '@/utils/filter-prototypes';
import { interpolateQuery, type TokenAlias } from '@/utils/query-interpolate';
import { userDefaultDbId } from '@/utils/default-db';
import { normalizeViews, type ReportViewDef } from '@/utils/report-views';

// ─── СОСТОЯНИЕ ──────────────────────────────────────────────────────────────

const editorRef = ref<{ insertPlaceholder: (t: string) => void; setValue: (t: string) => void } | null>(null);
const pickerRef = ref<{ instance: { close: () => void; option: (name: string, value?: unknown) => unknown } } | null>(null);

const form = reactive({
  key: '',
  title: '',
  query: '',
  config: {} as Record<string, unknown>,
  parentId: null as number | null,
  sortOrder: 0,
  icon: 'chart',
});

const status = ref('');
const statusError = ref(false);
const resultColumns = ref<{ dataField: string; caption: string }[]>([]);
const resultRows = ref<Record<string, unknown>[]>([]);

const centerMode = ref<'sql' | 'views'>('sql');
const treeRows = ref<Report[]>([]);
const queries = ref<QueryDef[]>([]);
const filterDefs = ref<FilterDef[]>([]);
const dbOptions = ref<Array<{ id: string; name: string }>>([]);

const queryKey = ref('');
const dbKey = ref('');
const views = ref<ReportViewDef[]>([]);
const selectedFilters = ref<string[]>([]);
const values = reactive<Record<string, unknown>>({});

const sqlHeight = ref(300);
/** Панель свойств — примерно 40% ширины окна при открытии. */
const propsWidth = ref(Math.min(900, Math.max(360, Math.round(window.innerWidth * 0.4))));
const propsOpen = ref(true);
/** Раздел «Основное» свёрнут по умолчанию (аккордеон). */
const mainOpen = ref(false);
const running = ref(false);
const selected = reactive<{ key: string; id: number | null; isSection: boolean }>({
  key: '',
  id: null,
  isSection: false,
});

/** Выбранный в dxDropDownBox узел и его «путь» для поля ввода. */
const selectedTreeId = ref<number | null>(null);
const selectedHierarchy = ref('');

// ─── ДЕРЕВО В ТУЛБАРЕ (dxDropDownBox + dxTreeView) ──────────────────────────

interface PickerNode {
  id: number;
  key: string;
  text: string;
  isSection: boolean;
  items?: PickerNode[];
}

/** Узлы дерева для тулбара: разделы — ветки, отчёты — листья. */
const pickerItems = computed<PickerNode[]>(() => {
  const rows = treeRows.value;
  const known = new Set(rows.map((row) => row.id));
  const byParent = new Map<number | null, Report[]>();
  for (const row of rows) {
    // Сироты (родитель удалён) — в корне, иначе узел потеряется.
    const parent = row.parent_id != null && known.has(row.parent_id) ? row.parent_id : null;
    if (!byParent.has(parent)) byParent.set(parent, []);
    byParent.get(parent)!.push(row);
  }
  const build = (parent: number | null): PickerNode[] => (byParent.get(parent) ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((row) => ({
      id: row.id,
      key: row.key,
      text: row.title || row.key,
      isSection: row.is_section === true,
      ...(row.is_section === true ? { items: build(row.id) } : {}),
    }));
  return build(null);
});

/** «КТР › Платежи» — путь до узла по родителям. */
function hierarchyOf(row: Report): string {
  const byId = new Map(treeRows.value.map((item) => [item.id, item]));
  const parts: string[] = [];
  let current: Report | undefined = row;
  while (current) {
    parts.unshift(current.title || current.key);
    current = current.parent_id != null ? byId.get(current.parent_id) : undefined;
  }
  return parts.join(' › ');
}

/** Клик по разделу раскрывает его нативно (expand-event="click");
 * клик по отчёту — выбрать его и закрыть выпадающую панель. */
function onPickerItemClick(e: { itemData?: unknown }) {
  const data = e.itemData as PickerNode | undefined;
  if (!data || data.isSection) return;

  selected.key = data.key;
  selected.id = data.id;
  selected.isSection = false;
  selectedTreeId.value = data.id;
  // Путь строим по строке из treeRows: в узле дерева нет parent_id.
  const row = treeRows.value.find((item) => item.key === data.key);
  selectedHierarchy.value = row ? hierarchyOf(row) : data.text;
  void selectReport(data.key);
  try { pickerRef.value?.instance.close(); } catch { /* панель уже закрыта */ }
}

/** Сборка MSI пишет в поле ввода сырой ключ узла — показываем «путь» отчёта.
 * Виджет перерисовывает input после смены value, поэтому правим в nextTick. */
function setPickerDisplay() {
  const input = document.querySelector('.rte__topbar .dx-dropdownbox input') as HTMLInputElement | null;
  if (input && selectedHierarchy.value) {
    input.value = selectedHierarchy.value;
    input.title = selectedHierarchy.value;
  }
}

watch(selectedHierarchy, () => {
  void nextTick(() => setPickerDisplay());
  window.setTimeout(setPickerDisplay, 0);
});

// ─── ВЫЧИСЛЯЕМЫЕ ─────────────────────────────────────────────────────────────

const canRun = computed(() => Boolean(form.key && form.query && !selected.isSection));
const canSave = computed(() => Boolean(form.key && form.title));

const parentOptions = computed(() => treeRows.value
  .filter((report) => report.is_section && report.key !== form.key)
  .map((report) => ({ id: report.id, title: report.title || report.key })));

const queryOptions = computed(() => queries.value.map((item) => ({
  key: item.key,
  title: item.title,
})));

const activeQuery = computed(() => queries.value.find((item) => item.key === queryKey.value));

const filterOptions = computed(() => filterDefs.value.map((def) => ({
  field: def.field,
  caption: `${def.field} — ${def.label || def.type}`,
})));

const selectedDefs = computed(() => filterDefs.value
  .filter((def) => selectedFilters.value.includes(def.field)));

/** Колонки для видов: последний запуск надёжнее, иначе — колонки запроса. */
const viewsColumns = computed(() => {
  if (resultColumns.value.length) {
    return resultColumns.value.map((column) => ({ name: column.dataField, caption: column.caption }));
  }
  return (activeQuery.value?.columns || []).map((column) => ({
    name: column.dataField,
    caption: column.caption,
  }));
});

/** Плейсхолдеры выбранных фильтров — чипы над редактором. */
const insertTokens = computed(() => {
  const tokens: string[] = [];
  for (const def of selectedDefs.value) {
    const proto = filterPrototype(def.type);
    if (!proto) continue;
    tokens.push(...placeholderTokens(proto, def.field, def.config.var as string[] | undefined));
  }
  return [...new Set(tokens)];
});

// ─── SQL-СПРАВОЧНИКИ ФИЛЬТРОВ (УК, УКП, ПОСТ — itemsQuery в конфиге) ─────────

const serverItems = ref<Record<string, Array<{ id: unknown; name: string }>>>({});
const serverErrors = ref<Record<string, string>>({});
const serverCache = new Map<string, { sql: string; dbName: string, items: Array<{ id: unknown; name: string }> }>();
const serverPending = new Set<string>();

function itemsFromResult(res: ExecuteResult): Array<{ id: unknown; name: string }> {
  return (res.rows || []).map((row, index) => ({
    id: row[0] ?? index,
    name: String(row[1] ?? row[0] ?? ''),
  }));
}

async function loadServerItems(def: FilterDef) {
  const config = def.config || {};
  const sql = String(config.itemsQuery || '').trim();
  const dbName = String(config.dbName || '');
  if (!sql || !dbName) return;

  const cached = serverCache.get(def.field);
  if (cached && cached.sql === sql && cached.dbName === dbName) {
    serverItems.value = { ...serverItems.value, [def.field]: cached.items };
    return;
  }
  if (serverPending.has(def.field)) return;
  serverPending.add(def.field);

  try {
    const res = await reportsApi.execute(dbName, sql);
    if (res.error) {
      serverErrors.value = { ...serverErrors.value, [def.field]: `MS SQL: ${res.error}` };
      return;
    }
    const items = itemsFromResult(res);
    serverCache.set(def.field, { sql, dbName, items });
    serverItems.value = { ...serverItems.value, [def.field]: items };
    serverErrors.value = { ...serverErrors.value, [def.field]: '' };
  } catch (e) {
    serverErrors.value = { ...serverErrors.value, [def.field]: `Справочник не загружен: ${(e as Error).message}` };
  } finally {
    serverPending.delete(def.field);
  }
}

watch(selectedDefs, (defs) => {
  defs.forEach((def) => void loadServerItems(def));
}, { immediate: true });

// ─── ЗНАЧЕНИЯ ФИЛЬТРОВ ──────────────────────────────────────────────────────

function setValue(field: string, value: unknown) {
  values[field] = value;
}

function applyDefaults() {
  let filled = 0;
  for (const def of selectedDefs.value) {
    const proto = filterPrototype(def.type);
    if (!proto) continue;
    const value = dynamicFilterValue(proto);
    if (value === undefined) continue;
    values[def.field] = value;
    filled += 1;
  }
  status.value = filled
    ? `Подставлены значения по умолчанию: ${filled}`
    : 'У выбранных фильтров нет динамических значений';
  statusError.value = filled === 0;
}

function insert(token: string) {
  editorRef.value?.insertPlaceholder(token);
}

/**
 * SQL пишется латинскими токенами ({fond}, {m_start}), а значения хранятся
 * по ключу фильтра (ФОНД, ПериодМесяцы) — эта связь и есть алиасы.
 */
function filterAliases(): TokenAlias[] {
  const list: TokenAlias[] = [];
  for (const def of selectedDefs.value) {
    const proto = filterPrototype(def.type);
    if (!proto) continue;
    const tokens = placeholderTokens(proto, def.field, def.config.var as string[] | undefined);
    tokens.forEach((token, index) => {
      list.push({ name: token.replace(/^\{|\}$/g, ''), field: def.field, index });
    });
  }
  return list;
}

// ─── ОТКРЫТИЕ ОТЧЁТА ────────────────────────────────────────────────────────

function applyReport(report: Report) {
  form.key = report.key;
  form.title = report.title || '';
  form.query = report.query_text || '';
  form.config = (report.config as Record<string, unknown>) ?? {};
  form.parentId = report.parent_id ?? null;
  form.sortOrder = report.sort_order ?? 0;
  form.icon = report.icon || 'chart';
  const config = form.config;
  queryKey.value = report.query_key || String(config.queryKey || '');
  dbKey.value = String(config.db || '');
  const rawFilters = config.filters;
  selectedFilters.value = (rawFilters && typeof rawFilters === 'object' && !Array.isArray(rawFilters))
    ? Object.keys(rawFilters)
    : [];
  views.value = normalizeViews(config.views);
  centerMode.value = 'sql';
  status.value = '';
  statusError.value = false;
  resultColumns.value = [];
  resultRows.value = [];
  for (const key of Object.keys(values)) delete values[key];
  void editorRef.value?.setValue(form.query);
}

async function selectReport(key: string) {
  try {
    const report = await reportsApi.get(key);
    applyReport(report);
    await new Promise((r) => setTimeout(r, 0));
    editorRef.value?.setValue(form.query);
  } catch (e) {
    status.value = `Не удалось открыть: ${(e as Error).message}`;
    statusError.value = true;
  }
}

function onQueryChanged(value: string) {
  queryKey.value = value || '';
  const query = queries.value.find((item) => item.key === value);
  if (!query) return;
  if (query.sql && !form.query) {
    form.query = query.sql;
    void editorRef.value?.setValue(query.sql);
  }
  if (!dbKey.value && query.db_key) dbKey.value = query.db_key;
}

// ─── CRUD ───────────────────────────────────────────────────────────────────

async function createSection() {
  const stamp = Date.now().toString(36).toUpperCase();
  try {
    await reportsApi.create({
      key: `SEC_${stamp}`,
      title: 'Новый раздел',
      icon: 'folder',
      image: '',
      query_text: '',
      config: {},
      parent_id: null,
      is_section: true,
      sort_order: 0,
    });
    await loadTree();
    status.value = `Создан раздел SEC_${stamp}`;
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось создать раздел: ${(e as Error).message}`;
    statusError.value = true;
  }
}

async function createNode() {
  const stamp = Date.now().toString(36).toUpperCase();
  try {
    const res = await reportsApi.create({
      key: `NEW_${stamp}`,
      title: 'Новый отчёт',
      icon: 'chart',
      image: '',
      query_text: '',
      config: { filters: {}, views: ['grid'], processing: 'client' },
      parent_id: selected.isSection ? selected.id : null,
      is_section: false,
      sort_order: 0,
    });
    await loadTree();
    status.value = `Создан отчёт NEW_${stamp} (id ${res.id})`;
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось создать: ${(e as Error).message}`;
    statusError.value = true;
  }
}

async function duplicateNode() {
  const key = selected.key;
  if (!key) return;
  try {
    const src = await reportsApi.get(key);
    if (src.is_section) {
      status.value = 'Дублировать можно только отчёт, не раздел';
      statusError.value = true;
      return;
    }
    const stamp = Date.now().toString(36).toUpperCase();
    const newKey = `${src.key}_${stamp}`.slice(0, 60);
    await reportsApi.create({
      key: newKey,
      title: `${src.title || src.key} (копия)`,
      icon: src.icon || 'chart',
      image: src.image || '',
      query_text: src.query_text || '',
      config: src.config ?? {},
      parent_id: src.parent_id ?? null,
      is_section: false,
      sort_order: (src.sort_order ?? 0) + 1,
    });
    await loadTree();
    status.value = `Создана копия ${newKey}`;
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось дублировать: ${(e as Error).message}`;
    statusError.value = true;
  }
}

async function deleteNode() {
  const key = selected.key;
  if (!key) return;
  // Удаление необратимо — подтверждаем явно.
  const ok = window.confirm(`Удалить «${form.title || key}»? Действие необратимо.`);
  if (!ok) return;
  try {
    await reportsApi.remove(key);
    selected.key = '';
    selected.id = null;
    selected.isSection = false;
    selectedTreeId.value = null;
    selectedHierarchy.value = '';
    form.key = '';
    form.title = '';
    form.query = '';
    resultColumns.value = [];
    resultRows.value = [];
    await loadTree();
    status.value = `Отчёт ${key} удалён`;
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось удалить: ${(e as Error).message}`;
    statusError.value = true;
  }
}

async function loadTree() {
  try {
    treeRows.value = await reportsApi.list();
  } catch (e) {
    status.value = `Список отчётов: ${(e as Error).message}`;
    statusError.value = true;
  }
}

// ─── ВЫПОЛНЕНИЕ ─────────────────────────────────────────────────────────────

async function run() {
  const result = interpolateQuery(form.query, values, filterAliases());
  if (result.unresolved.length) {
    status.value = `Не заполнены значения: ${result.unresolved.join(', ')}`;
    statusError.value = true;
    return;
  }

  running.value = true;
  status.value = 'Выполняется…';
  statusError.value = false;
  try {
    let sql = result.sql;
    if (/^\s*select\b/i.test(sql) && !/\btop\s*\(?\d+\)?/i.test(sql)) {
      sql = sql.replace(/\bselect\b/i, 'SELECT TOP 1000');
    }
    const dbName = dbKey.value || activeQuery.value?.db_key || userDefaultDbId(dbOptions.value);
    const res = await reportsApi.execute(dbName, sql);
    if (res.error) {
      status.value = `Ошибка выполнения: ${res.error}`;
      statusError.value = true;
      resultColumns.value = [];
      resultRows.value = [];
      return;
    }
    resultColumns.value = (res.columns || []).map((c) => ({ dataField: c, caption: c }));
    resultRows.value = (res.rows || []).map((row) => {
      const obj: Record<string, unknown> = {};
      (res.columns || []).forEach((col, i) => { obj[col] = row[i]; });
      return obj;
    });
    status.value = `Выполнено: ${resultRows.value.length} строк, колонок: ${resultColumns.value.length}`;
    statusError.value = false;
  } catch (e) {
    status.value = `Ошибка выполнения: ${(e as Error).message}`;
    statusError.value = true;
  } finally {
    running.value = false;
  }
}

// ─── СОХРАНЕНИЕ ─────────────────────────────────────────────────────────────

/** config.filters: значения полей сохраняются, у новых полей — null. */
function mergedConfigFilters(): Record<string, unknown> {
  const previous = (form.config?.filters
    && typeof form.config.filters === 'object'
    && !Array.isArray(form.config.filters))
    ? form.config.filters as Record<string, unknown>
    : {};
  const out: Record<string, unknown> = {};
  for (const field of selectedFilters.value) {
    out[field] = field in previous ? previous[field] : null;
  }
  return out;
}

async function save() {
  try {
    // Виды сохраняются объектами с полями; если видов нет — grid по умолчанию,
    // иначе отчёт открывается заглушкой «режим не поддерживается».
    const savedViews = views.value.length
      ? views.value.map((view) => ({
        key: view.key,
        type: view.type,
        title: view.title,
        fields: view.fields.map((field) => ({ ...field })),
      }))
      : ['grid'];
    const config = {
      ...form.config,
      filters: selected.isSection ? (form.config.filters ?? {}) : mergedConfigFilters(),
      views: savedViews,
      defaultView: 'grid',
      queryKey: queryKey.value,
      ...(selected.isSection ? {} : { db: dbKey.value }),
    };
    await reportsApi.update(form.key, {
      key: form.key,
      title: form.title,
      icon: form.icon,
      image: '',
      query_text: form.query,
      query_key: queryKey.value,
      config,
      parent_id: form.parentId,
      is_section: selected.isSection,
      sort_order: form.sortOrder,
    });
    form.config = config;
    status.value = 'Сохранено';
    statusError.value = false;
    await loadTree();
  } catch (e) {
    status.value = `Ошибка сохранения: ${(e as Error).message}`;
    statusError.value = true;
  }
}

// ─── РЕСАЙЗЕРЫ ПАНЕЛЕЙ ──────────────────────────────────────────────────────

function startPropsResize(event: MouseEvent) {
  const startX = event.clientX;
  const startWidth = propsWidth.value;
  const move = (e: MouseEvent) => {
    propsWidth.value = Math.max(280, Math.min(startWidth - (e.clientX - startX), 640));
  };
  const up = () => {
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
  };
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
}

function startSqlResize(event: MouseEvent) {
  const startY = event.clientY;
  const startHeight = sqlHeight.value;
  const move = (e: MouseEvent) => {
    const next = Math.max(120, Math.min(startHeight + (e.clientY - startY), window.innerHeight - 320));
    sqlHeight.value = next;
  };
  const up = () => {
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);
  };
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
}

// ─── ЗАГРУЗКА ───────────────────────────────────────────────────────────────

async function loadQueries() {
  try {
    const data = await queriesApi.list();
    queries.value = data.queries || [];
  } catch {
    queries.value = [];
  }
}

async function loadFilterDefs() {
  try {
    const data = await filtersApi.list();
    filterDefs.value = data.filters || [];
  } catch {
    filterDefs.value = [];
  }
}

async function loadDatabases() {
  try {
    const data = await reportsApi.getDatabases();
    dbOptions.value = (data.databases || []).map((db) => ({ id: db.id, name: db.name }));
  } catch {
    dbOptions.value = [];
  }
}

onMounted(() => {
  void loadTree();
  void loadQueries();
  void loadFilterDefs();
  void loadDatabases();
  // Placeholder поля выбора: сборка MSI не применяет опцию placeholder.
  const input = document.querySelector('.rte__topbar .dx-dropdownbox input') as HTMLInputElement | null;
  if (input && !input.placeholder) input.placeholder = 'Выберите отчет...';
});
</script>

<style scoped lang="scss">
.rte {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

// ── Верхний тулбар ──────────────────────────────────────────────────────────

.rte__topbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  flex: 0 0 auto;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
}

.rte__topbar-split {
  width: 1px;
  height: 22px;
  background: var(--dx-color-border, #e5e7eb);
}

.rte__picker {
  flex: 0 0 auto;
  max-width: 40vw;
}

.rte__spacer {
  flex: 1 1 auto;
}

.rte__status {
  font-size: 12px;
  color: #2e7d32;

  &--error {
    color: #c62828;
  }
}

// ── Тело ─────────────────────────────────────────────────────────────────────

.rte__body {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
}

.rte__props {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--dx-component-color-bg, #fff);
  border-left: 1px solid var(--dx-color-border, #e5e7eb);
}

.rte__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  font-size: 13px;
  font-weight: 600;
  flex: 0 0 auto;
}

.rte__vsplitter {
  width: 6px;
  flex: 0 0 auto;
  cursor: col-resize;
  background: linear-gradient(to right, transparent 2px, rgba(128, 128, 128, 0.35) 2px, rgba(128, 128, 128, 0.35) 4px, transparent 4px);
}

// ── Центр: SQL + результат / Виды ────────────────────────────────────────────

.rte__work {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 8px 12px;
  gap: 8px;
}

.rte__work-tabs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 0 0 auto;
}

.rte__tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 13px;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;

  &--active {
    opacity: 1;
    font-weight: 600;
    border-color: var(--dx-color-primary, #3b82f6);
    color: var(--dx-color-primary, #3b82f6);
  }
}

.rte__sql {
  flex: 0 0 auto;
  min-height: 120px;
}

.rte__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  flex: 0 0 auto;
}

.rte__chip {
  padding: 2px 8px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 12px;
  border: 1px dashed var(--dx-color-border, #cbd5e1);
  border-radius: 8px;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:hover {
    border-color: var(--dx-color-primary, #3b82f6);
    color: var(--dx-color-primary, #3b82f6);
  }
}

.rte__hsplitter {
  height: 8px;
  flex: 0 0 auto;
  cursor: row-resize;
  background: linear-gradient(to bottom, transparent 3px, rgba(128, 128, 128, 0.35) 3px, rgba(128, 128, 128, 0.35) 5px, transparent 5px);
}

.rte__grid {
  flex: 1 1 auto;
  min-height: 160px;
  display: flex;
  flex-direction: column;
}

.rte__views {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rte__empty {
  padding: 24px;
  text-align: center;
  opacity: 0.6;
  font-size: 13px;
}

.rte__hint {
  margin: 0;
  font-size: 12px;
  opacity: 0.7;
}

// ── Панель свойств ──────────────────────────────────────────────────────────

.rte__props-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 4px 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rte__section-title {
  font-size: 13px;
  font-weight: 600;
  padding-top: 6px;
  border-top: 1px solid var(--dx-color-border, #e5e7eb);
}

.rte__acc {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0 4px;
  font-size: 13px;
  font-weight: 600;
  background: transparent;
  border: none;
  border-top: 1px solid var(--dx-color-border, #e5e7eb);
  color: inherit;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.rte__acc-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rte__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rte__label {
  font-size: 12px;
  color: var(--dx-color-text, #4b5563);
}

.rte__value {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rte__value-error {
  font-size: 12px;
  color: var(--dx-color-danger, #b91c1c);
}
</style>

<style lang="scss">
// Попап выбора отчёта рендерится вне компонента (scoped сюда не доезжает).
// MSI ставит шеврон раскрытия отдельным элементом ПОД пунктом — собираем
// узел в строку: шеврон слева (order:-1), пункт рядом, дети — строкой ниже.
// Применимо только к деревьям в выпадающих панелях (такое дерево одно —
// выбор отчёта на этой странице).
.dx-dropdowneditor-overlay .dx-treeview-node {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.dx-dropdowneditor-overlay .dx-treeview-toggle-item-visibility {
  order: -1;
}

.dx-dropdowneditor-overlay .dx-treeview-item {
  flex: 1 1 auto;
  min-width: 0;
}

.dx-dropdowneditor-overlay .dx-treeview-node-container {
  flex: 1 1 100%;
}

.dx-dropdowneditor-overlay .dx-treeview-node-loadindicator {
  display: none;
}

// Попап сайзится по содержимому (ширина 'auto' из dropDownOptions),
// но не уже 420px и не шире 60vw; пункты не переносятся.
.dx-dropdowneditor-overlay .dx-overlay-content {
  width: auto !important;
  min-width: 420px;
  max-width: 60vw;
}

.dx-dropdowneditor-overlay .dx-treeview-item {
  white-space: nowrap;
}
</style>
