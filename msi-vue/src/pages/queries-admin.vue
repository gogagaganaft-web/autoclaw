<template>
  <div class="view-wrapper qa">
    <div class="qa__toolbar theme-dependent">
      <dx-button
        icon="refresh"
        styling-mode="outlined"
        hint="Обновить список"
        @click="load()"
      />
      <dx-button
        icon="plus"
        styling-mode="outlined"
        hint="Новый запрос"
        @click="createNew()"
      />
      <dx-button
        icon="copy"
        styling-mode="outlined"
        hint="Дублировать"
        :disabled="!current.key"
        @click="duplicate()"
      />
      <dx-button
        icon="trash"
        styling-mode="outlined"
        hint="Удалить"
        :disabled="!current.key && !isNew"
        @click="removeCurrent()"
      />

      <span class="qa__toolbar-split" />

      <dx-button
        icon="panelright"
        :class="{ 'qa__icon-flip': true }"
        :type="listOpen ? 'default' : 'normal'"
        :styling-mode="listOpen ? 'contained' : 'outlined'"
        :hint="listOpen ? 'Скрыть список запросов' : 'Открыть список запросов'"
        @click="listOpen = !listOpen"
      />
      <dx-button
        icon="panelright"
        :type="propsOpen ? 'default' : 'normal'"
        :styling-mode="propsOpen ? 'contained' : 'outlined'"
        :hint="propsOpen ? 'Скрыть свойства' : 'Открыть свойства'"
        @click="propsOpen = !propsOpen"
      />

      <span class="qa__spacer" />

      <span
        v-if="status"
        class="qa__status"
        :class="{ 'qa__status--error': statusError }"
      >{{ status }}</span>
      <dx-button
        icon="clock"
        styling-mode="text"
        hint="История изменений"
        :disabled="!current.key"
        @click="openHistory()"
      />
      <dx-button
        text="Выполнить"
        icon="run"
        type="success"
        styling-mode="contained"
        :disabled="!canRun"
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

    <div class="qa__body">
      <aside
        v-show="listOpen"
        class="qa__list theme-dependent"
        :style="{ width: `${listWidth}px` }"
      >
        <header class="qa__panel-head">
          <span>Запросы <span class="qa__count">{{ items.length }}</span></span>
          <dx-button
            icon="close"
            styling-mode="text"
            hint="Скрыть панель"
            @click="listOpen = false"
          />
        </header>
        <div class="qa__grid-wrap">
          <dx-data-grid
            :data-source="gridRows"
            :columns="gridColumns"
            :show-borders="false"
            :show-column-lines="false"
            :allow-column-resizing="true"
            :hover-state-enabled="true"
            :word-wrap-enabled="true"
            :selection="{ mode: 'single' }"
            :selected-row-keys="selectedRowKeys"
            key-expr="key"
            height="100%"
            @row-click="onRowClick"
          />
        </div>
      </aside>

      <div
        v-show="listOpen"
        class="qa__vsplitter"
        role="separator"
        title="Изменить ширину"
        @mousedown="startListResize"
      />

      <section class="qa__editor">
        <div class="qa__editor-head">
          <label class="qa__hfield qa__hfield--tags">
            <span class="qa__field-label">Темы</span>
            <dx-tag-box
              :value="current.tags"
              :items="themeOptions"
              :accept-custom-value="true"
              :show-selection-controls="true"
              placeholder="ОСВ, КТР, Платежи…"
              @value-changed="current.tags = $event.value || []"
            />
          </label>
          <label class="qa__hfield qa__hfield--db">
            <span class="qa__field-label">База</span>
            <dx-select-box
              :value="current.db_key"
              :items="dbOptions"
              value-expr="id"
              display-expr="name"
              :show-clear-button="true"
              placeholder="Не выбрана"
              @value-changed="current.db_key = $event.value"
            />
          </label>
          <span class="qa__spacer" />
          <dx-button
            icon="edit"
            styling-mode="text"
            hint="Свойства и значения фильтров"
            @click="propsOpen = !propsOpen"
          />
        </div>

        <div class="qa__chips">
          <template v-if="insertTokens.length">
            <button
              v-for="token in insertTokens"
              :key="token"
              type="button"
              class="qa__chip"
              :title="'Вставить ' + token"
              @click="insert(token)"
            >
              {{ token }}
            </button>
          </template>
          <span
            v-else
            class="qa__hint"
          >Выберите фильтры в свойствах — появятся плейсхолдеры</span>
        </div>

        <div
          class="qa__monaco"
          :style="{ height: `${editorHeight}px` }"
        >
          <sql-editor
            ref="editorRef"
            v-model="draft.sql"
            :height="Math.max(120, editorHeight - 10)"
          />
        </div>

        <div
          class="qa__hsplitter"
          @mousedown="startVerticalResize"
        />

        <div class="qa__result">
          <div
            v-if="resultHint"
            class="qa__result-hint"
          >
            {{ resultHint }}
          </div>
          <dx-data-grid
            :data-source="resultRows"
            :columns="resultColumns"
            :show-borders="true"
            :column-auto-width="true"
            :allow-column-resizing="true"
            :hover-state-enabled="true"
            height="100%"
          />
        </div>
      </section>

      <div
        v-show="propsOpen"
        class="qa__vsplitter"
        role="separator"
        title="Изменить ширину"
        @mousedown="startPropsResize"
      />

      <aside
        v-show="propsOpen"
        class="qa__props theme-dependent"
        :style="{ width: `${propsWidth}px` }"
      >
        <header class="qa__props-head">
          <span>Свойства запроса</span>
          <dx-button
            icon="close"
            styling-mode="text"
            hint="Закрыть"
            @click="propsOpen = false"
          />
        </header>

        <div class="qa__props-body">
          <section class="qa__section">
            <button
              type="button"
              class="qa__section-head"
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
              class="qa__section-body"
            >
              <label class="qa__field">
                <span class="qa__field-label">Ключ (GUID)</span>
                <dx-text-box
                  :value="current.key"
                  :read-only="true"
                  :hint="isNew ? 'Создан автоматически' : 'Ключ не меняется'"
                />
              </label>

              <label class="qa__field">
                <span class="qa__field-label">Название <b>*</b></span>
                <dx-text-box
                  :value="current.title"
                  @value-changed="current.title = $event.value"
                />
              </label>
            </div>
          </section>

          <label class="qa__field">
            <span class="qa__field-label">Фильтры запроса</span>
            <dx-tag-box
              :value="current.filters"
              :items="filterOptions"
              value-expr="field"
              display-expr="caption"
              :search-enabled="true"
              :show-selection-controls="true"
              placeholder="Выберите фильтры"
              @value-changed="current.filters = $event.value || []"
            />
            <span class="qa__hint">Из них строится форма значений и плейсхолдеры.</span>
          </label>

          <template v-if="selectedDefs.length">
            <div class="qa__section-title">
              Значения фильтров
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
              class="qa__value"
            >
              <filter-preview
                :def="def.config"
                :initial-value="values[def.field]"
                :items-override="serverItems[def.field]"
                @update:value="setValue(def.field, $event)"
              />
              <span
                v-if="serverErrors[def.field]"
                class="qa__value-error"
              >{{ serverErrors[def.field] }}</span>
            </div>
          </template>
        </div>
      </aside>
    </div>

    <history-drawer
      :visible="historyOpen"
      :title="historyTitle"
      :items="historyItems"
      @close="historyOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { DxDataGrid } from 'devextreme-vue/data-grid';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxTagBox } from 'devextreme-vue/tag-box';
import { DxTextBox } from 'devextreme-vue/text-box';
import FilterPreview from '@/components/library/filter-preview.vue';
import HistoryDrawer, { type HistoryItem } from '@/components/common/history-drawer.vue';
import SqlEditor from '@/components/report-editor/sql-editor.vue';
import { filtersApi, type FilterDef } from '@/services/filters-api';
import {
  queriesApi,
  type QueryColumn,
  type QueryDef,
  type QueryPayload,
} from '@/services/queries-api';
import { reportsApi, type ExecuteResult } from '@/services/reports-api';
import { filterPrototype } from '@/utils/filter-prototypes';
import { dynamicFilterValue, placeholderTokens } from '@/utils/filter-values';
import { interpolateQuery, type TokenAlias } from '@/utils/query-interpolate';
import { userDefaultDbId } from '@/utils/default-db';

// ─── СОСТОЯНИЕ ──────────────────────────────────────────────────────────────

interface DatabaseOption {
  id: string;
  name: string;
}

/**
 * Левый грид — только навигация по запросам, редактирования в нём нет.
 */
const items = ref<QueryDef[]>([]);
const filterDefs = ref<FilterDef[]>([]);
const dbOptions = ref<DatabaseOption[]>([]);

const status = ref('');
const statusError = ref(false);
const running = ref(false);
const isNew = ref(false);
const listOpen = ref(true);
const listWidth = ref(280);
const propsOpen = ref(true);
const propsWidth = ref(360);
const editorHeight = ref(340);
/** Раздел «Основное» в свойствах: по умолчанию свёрнут. */
const mainOpen = ref(false);

const current = reactive<{
  key: string;
  title: string;
  tags: string[];
  db_key: string;
  filters: string[];
  sql: string;
}>({
  key: '',
  title: '',
  tags: [],
  db_key: '',
  filters: [],
  sql: '',
});

const draft = reactive<{ sql: string }>({ sql: '' });
const values = reactive<Record<string, unknown>>({});

const historyOpen = ref(false);
const historyTitle = ref('');
const historyItems = ref<HistoryItem[]>([]);

const resultRows = ref<Record<string, unknown>[]>([]);
const resultColumns = ref<Array<{ dataField: string; caption: string }>>([]);
const resultHint = ref('');

const editorRef = ref<{ insertPlaceholder: (text: string) => void } | null>(null);

// ─── ВЫЧИСЛЯЕМЫЕ ─────────────────────────────────────────────────────────────

const canRun = computed(() => Boolean(draft.sql.trim()) && !running.value);
const canSave = computed(() => Boolean(current.key.trim() && current.title.trim() && draft.sql.trim()));

/** Колонки левого грида — только чтение, переход по строке. */
const gridColumns = computed(() => [
  {
    dataField: 'key',
    caption: 'Ключ',
    width: 120,
  },
  {
    dataField: 'title',
    caption: 'Название',
    minWidth: 120,
  },
]);

/** Пористое редактирование ячейки: только имя/название, только в выбранной строке. */

const gridRows = computed(() => items.value);
const selectedRowKeys = computed(() => (current.key ? [current.key] : []));

function onRowClick(event: { data?: QueryDef }) {
  const row = event?.data;
  if (!row) return;
  open(row.key);
}

const filterOptions = computed(() => filterDefs.value.map((def) => ({
  field: def.field,
  caption: `${def.field} — ${def.label || def.type}`,
})));

const themeOptions = computed(() => {
  const all = new Set<string>();
  for (const item of items.value) {
    for (const tag of item.tags || []) all.add(tag);
  }
  return [...all].sort();
});

const selectedDefs = computed(() => filterDefs.value.filter((def) => current.filters.includes(def.field)));

// ─── SQL-СПРАВОЧНИКИ ФИЛЬТРОВ ────────────────────────────────────────────────

/**
 * Элементы серверных списков (УК, УКП, ПОСТ — itemsQuery в конфиге).
 * filter-preview сам SQL не исполняет: значения в панель значений грузит
 * страница — тем же вызовом, что «Проверить» на странице фильтров.
 */
const serverItems = ref<Record<string, Array<{ id: unknown; name: string }>>>({});
const serverErrors = ref<Record<string, string>>({});
const serverCache = new Map<string, { sql: string; dbName: string, items: Array<{ id: unknown; name: string }> }>();
const serverPending = new Set<string>();

/** id/name — 1-я и 2-я колонки результата (как маппинг проверки SQL фильтров). */
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

const insertTokens = computed(() => {
  const tokens: string[] = [];
  for (const def of selectedDefs.value) {
    const proto = filterPrototype(def.type);
    if (!proto) continue;
    tokens.push(...placeholderTokens(proto, def.field, def.config.var as string[] | undefined));
  }
  return [...new Set(tokens)];
});

/**
 * Имена из `var` → поле фильтра.
 *
 * В SQL пишутся латинские токены ({fond}, {m_start}), а значения хранятся
 * по ключу фильтра (ФОНД, ПериодМесяцы), поэтому без этой связи подстановка
 * ничего не находит и запуск блокируется на «Не заполнены значения».
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

// ─── ЗАГРУЗКА ───────────────────────────────────────────────────────────────

async function load() {
  try {
    const [list, filters, databases] = await Promise.all([
      queriesApi.list(),
      filtersApi.list().catch(() => ({ filters: [] as FilterDef[], total: 0 })),
      reportsApi.getDatabases().catch(() => ({ databases: [] })),
    ]);

    items.value = list.queries || [];
    filterDefs.value = filters.filters || [];
    dbOptions.value = (databases.databases || []).map((db) => ({ id: db.id, name: db.name }));

    if (!items.value.length) return;

    const stillExists = items.value.some((item) => item.key === current.key);
    if (!stillExists) {
      open(items.value[0].key);
    }
  } catch (e) {
    status.value = `Не удалось прочитать запросы: ${(e as Error).message}`;
    statusError.value = true;
  }
}

function applyQuery(item: QueryDef) {
  current.key = item.key;
  current.title = item.title || '';
  current.tags = [...(item.tags || [])];
  current.db_key = item.db_key || '';
  current.filters = [...(item.filters || [])];
  current.sql = item.sql || '';
  draft.sql = item.sql || '';
  isNew.value = false;

  for (const key of Object.keys(values)) delete values[key];
  resultRows.value = [];
  resultColumns.value = [];
  resultHint.value = '';
}

/**
 * Ключ нового запроса — GUID: он больше не вводится руками и не правится.
 * `randomUUID` есть только в защищённом контексте (localhost — да), поэтому
 * ниже есть запасная генерация v4.
 */
function newKey(): string {
  const c = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();
  const bytes = new Uint8Array(16);
  c.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function applyNew(seed: Partial<QueryDef> = {}) {
  current.key = newKey();
  current.title = '';
  current.tags = [];
  current.db_key = '';
  current.filters = [];
  current.sql = '';
  draft.sql = '';
  isNew.value = true;
  propsOpen.value = true;
  mainOpen.value = true;
  resultRows.value = [];
  resultColumns.value = [];
  resultHint.value = '';
  Object.assign(current, seed);
}

function clearCurrent() {
  current.key = '';
  current.title = '';
  current.tags = [];
  current.db_key = '';
  current.filters = [];
  current.sql = '';
  draft.sql = '';
  isNew.value = false;
  resultRows.value = [];
  resultColumns.value = [];
  resultHint.value = '';
}

function open(key: string) {
  const item = items.value.find((row) => row.key === key);
  if (!item) return;
  applyQuery(item);
  status.value = '';
  statusError.value = false;
}

function createNew() {
  applyNew();
  status.value = 'Новый запрос: заполните название и SQL, ключ создан автоматически';
  statusError.value = false;
}

function duplicate() {
  if (!current.key) return;
  applyNew({
    title: `${current.title} (копия)`,
    tags: [...current.tags],
    db_key: current.db_key,
    filters: [...current.filters],
    sql: draft.sql,
  });
  status.value = 'Копия создана: новый ключ, проверьте название';
  statusError.value = false;
}

// ─── СОХРАНЕНИЕ ─────────────────────────────────────────────────────────────

function validate(): string[] {
  const errors: string[] = [];
  const key = current.key.trim();

  if (!key) errors.push('Ключ не создан — нажмите «Новый запрос»');
  else if (!/^[A-Za-zА-Яа-яЁё0-9_-]+$/.test(key)) {
    errors.push('Ключ: буквы, цифры, дефис и подчёркивание, без пробелов');
  } else if (isNew.value && items.value.some((item) => item.key === key)) {
    errors.push(`Ключ «${key}» уже занят`);
  }
  if (!current.title.trim()) errors.push('Укажите название');
  if (!draft.sql.trim()) errors.push('SQL не заполнен');

  return errors;
}

async function save() {
  const errors = validate();
  if (errors.length) {
    status.value = errors[0];
    statusError.value = true;
    return;
  }

  const payload: QueryPayload = {
    key: current.key.trim(),
    title: current.title.trim(),
    tags: current.tags,
    db_key: current.db_key,
    filters: current.filters,
    sql: draft.sql,
    columns: resultColumns.value.map((column) => ({ dataField: column.dataField, caption: column.caption })),
  };

  try {
    if (isNew.value) {
      await queriesApi.create(payload);
      isNew.value = false;
    } else {
      await queriesApi.update(current.key, payload);
    }
    await load();
    open(payload.key);
    status.value = `Сохранено: ${payload.key}`;
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось сохранить: ${(e as Error).message}`;
    statusError.value = true;
  }
}

async function removeCurrent() {
  if (isNew.value) {
    // Новый запрос ещё не на сервере — просто сбрасываем форму.
    const next = items.value[0];
    if (next) open(next.key);
    else clearCurrent();
    status.value = 'Новый запрос отменён';
    statusError.value = false;
    return;
  }
  if (!current.key) return;
  if (!window.confirm(`Удалить запрос «${current.key}»?`)) return;

  try {
    await queriesApi.remove(current.key);
    clearCurrent();
    await load();
    status.value = 'Запрос удалён';
    statusError.value = false;
  } catch (e) {
    status.value = `Не удалось удалить: ${(e as Error).message}`;
    statusError.value = true;
  }
}

// ─── ВЫПОЛНЕНИЕ ─────────────────────────────────────────────────────────────

async function openHistory() {
  if (!current.key) return;
  try {
    const data = await queriesApi.history(current.key);
    historyTitle.value = current.key;
    historyItems.value = (data.revisions || []).map((revision) => ({
      id: revision.id,
      action: revision.action,
      at: revision.changed_at,
      by: revision.changed_by,
      detail: revision.sql ? revision.sql.slice(0, 400) : undefined,
    }));
    historyOpen.value = true;
  } catch (e) {
    status.value = `История недоступна: ${(e as Error).message}`;
    statusError.value = true;
  }
}

/** Динамические умолчания фильтров — как в боевом dynamicDefault. */
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

function setValue(field: string, value: unknown) {
  values[field] = value;
}

function insert(token: string) {
  editorRef.value?.insertPlaceholder(token);
}

function columnsFromResult(raw: unknown[]): QueryColumn[] {
  return raw.map((column, index) => {
    if (typeof column === 'string') {
      return { dataField: column, caption: column };
    }
    const rec = column as Record<string, unknown>;
    return {
      dataField: String(rec.dataField ?? rec.name ?? `col${index + 1}`),
      caption: String(rec.caption ?? rec.dataField ?? rec.name ?? `col${index + 1}`),
    };
  });
}

async function run() {
  if (isNew.value) {
    status.value = 'Сначала сохраните запрос';
    statusError.value = true;
    return;
  }

  const result = interpolateQuery(draft.sql, values, filterAliases());
  if (result.unresolved.length) {
    status.value = `Не заполнены значения: ${result.unresolved.join(', ')}`;
    statusError.value = true;
    return;
  }

  running.value = true;
  status.value = 'Выполняется…';
  statusError.value = false;

  try {
    const response = await queriesApi.execute(
      current.db_key || userDefaultDbId(dbOptions.value),
      result.sql,
    );
    if (response.error) throw new Error(response.error);

    const columns = columnsFromResult(response.columns || []);
    const rows = (response.rows || []).map((row) => {
      const record: Record<string, unknown> = {};
      columns.forEach((column, index) => {
        record[column.dataField] = Array.isArray(row) ? row[index] : null;
      });
      return record;
    });

    resultColumns.value = columns.map((column) => ({ dataField: column.dataField, caption: column.caption || column.dataField }));
    resultRows.value = rows;
    resultHint.value = `Строк: ${rows.length}${result.removedClauses ? `, вырезано условий: ${result.removedClauses}` : ''}`;

    await queriesApi.saveColumns(current.key, columns).catch(() => undefined);
    status.value = `Выполнено: ${rows.length} строк`;
    statusError.value = false;
  } catch (e) {
    resultRows.value = [];
    status.value = `Ошибка выполнения: ${(e as Error).message}`;
    statusError.value = true;
  } finally {
    running.value = false;
  }
}

// ─── РАЗДЕЛИТЕЛЬ ────────────────────────────────────────────────────────────

let resizingVertical = false;
let resizeStartY = 0;
let resizeStartHeight = 0;

function onVerticalMove(event: MouseEvent) {
  if (!resizingVertical) return;
  const delta = event.clientY - resizeStartY;
  editorHeight.value = Math.min(window.innerHeight - 260, Math.max(140, resizeStartHeight + delta));
}

function stopVerticalResize() {
  resizingVertical = false;
  document.removeEventListener('mousemove', onVerticalMove);
  document.removeEventListener('mouseup', stopVerticalResize);
}

function startVerticalResize(event: MouseEvent) {
  resizingVertical = true;
  resizeStartY = event.clientY;
  resizeStartHeight = editorHeight.value;
  document.addEventListener('mousemove', onVerticalMove);
  document.addEventListener('mouseup', stopVerticalResize);
}

// ─── ШИРИНА БОКОВЫХ ПАНЕЛЕЙ ────────────────────────────────────────────────

const LIST_MIN = 240;
const LIST_MAX = 720;
const PROPS_MIN = 300;

let resizingSide: 'list' | 'props' | null = null;
let sideStartX = 0;
let sideStartWidth = 0;

function onSideMove(event: MouseEvent) {
  if (!resizingSide) return;
  const delta = event.clientX - sideStartX;

  if (resizingSide === 'list') {
    listWidth.value = Math.min(LIST_MAX, Math.max(LIST_MIN, sideStartWidth + delta));
    return;
  }

  // Правая панель растёт влево: ширина — обратная дельта.
  const max = Math.max(PROPS_MIN, window.innerWidth - 480);
  propsWidth.value = Math.min(max, Math.max(PROPS_MIN, sideStartWidth - delta));
}

function stopSideResize() {
  resizingSide = null;
  document.removeEventListener('mousemove', onSideMove);
  document.removeEventListener('mouseup', stopSideResize);
}

function startSideResize(event: MouseEvent, side: 'list' | 'props') {
  event.preventDefault();
  resizingSide = side;
  sideStartX = event.clientX;
  sideStartWidth = side === 'list' ? listWidth.value : propsWidth.value;
  document.addEventListener('mousemove', onSideMove);
  document.addEventListener('mouseup', stopSideResize);
}

function startListResize(event: MouseEvent) {
  startSideResize(event, 'list');
}

function startPropsResize(event: MouseEvent) {
  startSideResize(event, 'props');
}

onMounted(() => {
  void load();
});

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onVerticalMove);
  document.removeEventListener('mouseup', stopVerticalResize);
  document.removeEventListener('mousemove', onSideMove);
  document.removeEventListener('mouseup', stopSideResize);
});
</script>

<style scoped>
.qa {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.qa__toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  flex: 0 0 auto;
}

.qa__spacer {
  flex: 1 1 auto;
}

.qa__status {
  font-size: 12px;
}

.qa__status--error {
  color: var(--dx-color-danger, #b91c1c);
}

.qa__value-error {
  font-size: 12px;
  color: var(--dx-color-danger, #b91c1c);
}

.qa__body {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  gap: 6px;
  padding: 0 12px 12px;
}

.qa__list {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  min-width: 0;
  max-width: 32vw;
  min-height: 0;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
  color: var(--dx-color-text, #1f2937);
  background: var(--dx-component-color-bg, #fff);
}

.qa__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 4px 4px 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
  flex: 0 0 auto;
}

.qa__grid-wrap {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

/* Разделитель ширины боковых панелей */
.qa__vsplitter {
  flex: 0 0 auto;
  align-self: stretch;
  width: 6px;
  border-radius: 3px;
  cursor: col-resize;
  background: color-mix(in srgb, var(--dx-color-border, #e5e7eb) 55%, transparent);
}

.qa__vsplitter:hover,
.qa__vsplitter:active {
  background: color-mix(in srgb, var(--dx-color-primary, #337ab7) 35%, transparent);
}

.qa__toolbar-split {
  width: 1px;
  align-self: stretch;
  margin: 2px 2px;
  background: var(--dx-color-border, #e5e7eb);
}

/* Кнопка левой панели — та же иконка, зеркально */
.qa__icon-flip {
  display: inline-flex;
  transform: scaleX(-1);
}

.qa__count {
  opacity: 0.6;
  font-weight: 400;
  margin-left: 4px;
}

.qa__editor {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 320px;
  min-height: 0;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
  color: var(--dx-color-text, #1f2937);
  background: var(--dx-component-color-bg, #fff);
}

.qa__editor-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 8px 12px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
  flex: 0 0 auto;
}

/* Поля в шапке редактора: подпись слева от контрола */
.qa__hfield {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.qa__hfield .qa__field-label {
  flex: 0 0 auto;
}

.qa__hfield--tags {
  flex: 1 1 260px;
  min-width: 200px;
  max-width: 420px;
}

.qa__hfield--db {
  flex: 0 1 240px;
  min-width: 200px;
}

.qa__hfield > *:last-child {
  flex: 1 1 auto;
  min-width: 0;
}

.qa__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px 12px 0;
}

.qa__chip {
  padding: 3px 10px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 11px;
  border: 1px solid var(--dx-color-border, #cbd5e1);
  border-radius: 12px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.qa__chip:hover {
  border-color: var(--dx-color-primary, #337ab7);
  color: var(--dx-color-primary, #337ab7);
}

.qa__hint {
  font-size: 11px;
  opacity: 0.7;
}

.qa__monaco {
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
}

.qa__hsplitter {
  height: 6px;
  cursor: row-resize;
  background: var(--dx-component-color-bg, #fff);
  flex: 0 0 auto;
}

.qa__hsplitter:hover {
  background: color-mix(in srgb, var(--dx-color-primary, #337ab7) 25%, var(--dx-component-color-bg, #fff));
}

.qa__result {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  padding: 4px;
}

.qa__result-hint {
  padding: 2px 8px;
  font-size: 11px;
  opacity: 0.7;
  flex: 0 0 auto;
}

.qa__props {
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  height: 100%;
  max-width: 34vw;
  min-height: 0;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
  overflow: hidden;
  color: var(--dx-color-text, #1f2937);
  background: var(--dx-component-color-bg, #fff);
}

.qa__props-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 8px 12px;
  font-weight: 600;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
  flex: 0 0 auto;
}

.qa__props-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  overflow-y: auto;
  flex: 1 1 auto;
  min-height: 0;
}

.qa__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.qa__field-label {
  font-size: 12px;
  color: var(--dx-color-text, #4b5563);
}

/* Аккордеон в свойствах: «Основное» и дальше по образцу */
.qa__section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qa__section-head {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 6px 0;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: inherit;
  text-align: left;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--dx-color-border, #e5e7eb);
  cursor: pointer;
}

.qa__section-head:hover {
  color: var(--dx-color-primary, #337ab7);
}

.qa__section-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 2px;
}

.qa__section-title {
  margin-top: 4px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.6;
}

.qa__value {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border: 1px dashed var(--dx-color-border, #cbd5e1);
  border-radius: 8px;
}
</style>
