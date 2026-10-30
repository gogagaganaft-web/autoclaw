<template>
  <div class="report-editor">
    <div class="report-editor__head">
      <h2>{{ isNew ? 'Новый отчёт' : `Редактор: ${form.title || form.key}` }}</h2>
      <dx-button
        text="Сохранить"
        icon="save"
        type="success"
        styling-mode="contained"
        :disabled="saving || !canSave"
        @click="save()"
      />
    </div>

    <div
      v-if="status"
      class="report-editor__status"
      :class="{ 'report-editor__status--error': statusError }"
    >
      {{ status }}
    </div>

    <div class="report-editor__grid">
      <section class="report-editor__panel">
        <h3>Основное</h3>
        <label class="field">
          <span>Ключ</span>
          <dx-text-box
            :value="form.key"
            :disabled="!isNew"
            @value-changed="form.key = $event.value"
          />
        </label>
        <label class="field">
          <span>Название</span>
          <dx-text-box
            :value="form.title"
            @value-changed="form.title = $event.value"
          />
        </label>
        <label class="field">
          <span>Иконка</span>
          <dx-select-box
            :value="form.icon"
            :items="icons"
            @value-changed="form.icon = $event.value"
          />
        </label>
        <label class="field">
          <span>Обработка</span>
          <dx-select-box
            :value="form.processing"
            :items="['client', 'server']"
            @value-changed="form.processing = $event.value"
          />
        </label>
        <label class="field">
          <span>Режимы</span>
          <dx-tag-box
            :value="form.views"
            :items="['grid', 'pivot', 'dashboard', 'map']"
            :show-selection-controls="true"
            @value-changed="form.views = $event.value || []"
          />
        </label>
        <label class="field">
          <span>Строк на странице</span>
          <dx-number-box
            :value="form.rowPageSize"
            :min="10"
            :max="10000"
            @value-changed="form.rowPageSize = $event.value"
          />
        </label>
      </section>

      <section class="report-editor__panel">
        <h3>Фильтры</h3>
        <div
          v-for="filter in filters"
          :key="filter.name"
          class="filter-row"
        >
          <span class="filter-row__name">{{ filter.name }}</span>
          <span class="filter-row__type">{{ filter.type }}</span>
          <dx-button
            v-if="filter.range"
            text="_start"
            styling-mode="text"
            @click="insert(`{${filter.name}_start}`)"
          />
          <dx-button
            v-if="filter.range"
            text="_end"
            styling-mode="text"
            @click="insert(`{${filter.name}_end}`)"
          />
          <dx-button
            v-else
            text="{ }"
            styling-mode="text"
            @click="insert(`{${filter.name}}`)"
          />
        </div>
        <p
          v-if="!filters.length"
          class="hint"
        >
          У отчёта нет объявленных фильтров — добавьте их в конфигурации.
        </p>
      </section>
    </div>

    <h3 class="report-editor__sql-title">
      SQL запрос
    </h3>
    <sql-editor
      ref="editorRef"
      v-model="form.query"
      :height="380"
      :db-name="String(form.config?.db || '')"
    />

    <section class="preview">
      <div class="preview__toolbar">
        <dx-tag-box
          class="preview__fields"
          :value="previewFields"
          :items="filterOptions"
          :show-selection-controls="true"
          :show-clear-button="true"
          placeholder="Фильтры для подстановки"
          @value-changed="previewFields = $event.value || []"
        />
        <dx-button
          text="Выполнить"
          icon="run"
          type="success"
          styling-mode="contained"
          :disabled="previewRunning || !form.query"
          @click="runPreview()"
        />
      </div>

      <div
        v-for="name in previewFields"
        :key="name"
        class="preview__field"
      >
        <span class="preview__label">{{ name }}</span>
        <dx-text-box
          :value="previewValues[name] || ''"
          placeholder="значение или список через запятую"
          @value-changed="previewValues[name] = $event.value"
        />
      </div>

      <div
        v-if="previewWarnings.length"
        class="preview__warn"
      >
        {{ previewWarnings.join('; ') }}
      </div>
      <div
        v-if="previewError"
        class="preview__error"
      >
        {{ previewError }}
      </div>

      <dx-data-grid
        v-if="previewColumns.length"
        class="preview__grid"
        :data-source="previewRows"
        :columns="previewGridColumns"
        :show-borders="true"
        :column-auto-width="true"
        :allow-column-resizing="true"
        height="360"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DxButton } from 'devextreme-vue/button';
import { DxTextBox } from 'devextreme-vue/text-box';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxTagBox } from 'devextreme-vue/tag-box';
import { DxNumberBox } from 'devextreme-vue/number-box';
import { DxDataGrid } from 'devextreme-vue/data-grid';
import { DxPopup } from 'devextreme-vue/popup';
import SqlEditor from '@/components/report-editor/sql-editor.vue';
import { reportsApi, type Report, type ToolbarItem } from '@/services/reports-api';

// Редактор отчёта: перенос ReportEditorDrawer (поля) и ReportEditorPopup
// (панель фильтров + вставка placeholder'ов в Monaco).

const route = useRoute();
const router = useRouter();
const editorRef = ref<{ insertPlaceholder: (text: string) => void; setValue: (text: string) => void } | null>(null);

const icons = ['chart', 'smalliconslayout', 'hierarchy', 'map', 'chevronup', 'fields', 'file'];

const key = computed(() => String(route.params.key ?? ''));
const isNew = computed(() => !key.value);

const form = reactive({
  key: '',
  title: '',
  icon: 'chart',
  processing: 'client',
  views: ['grid'] as string[],
  rowPageSize: 100,
  query: '',
  config: {} as Record<string, unknown>,
  parentId: null as number | null,
  sortOrder: 0,
});

const saving = ref(false);
const status = ref('');
const statusError = ref(false);
const toolbar = ref<ToolbarItem[]>([]);

// Предпросмотр: какие фильтры включены, их значения, результат и ошибки.
const previewFields = ref<string[]>([]);
const previewValues = reactive<Record<string, string>>({});
const previewColumns = ref<string[]>([]);
const previewRows = ref<Record<string, unknown>[]>([]);
const previewError = ref('');
const previewRunning = ref(false);
const previewWarnings = ref<string[]>([]);

const canSave = computed(() => form.key.trim().length > 0 && form.title.trim().length > 0);

const filters = computed(() => {
  const raw = (form.config?.filters ?? {}) as Record<string, unknown>;
  const names = Array.isArray(raw) ? [] : Object.keys(raw);
  return names.map((name) => {
    const def = toolbar.value.find((item) => String(item.field) === name);
    const type = String(def?.type ?? '');
    const range = /dateRange|range-|monthRange|months/i.test(type);
    return { name, type: type || '—', range };
  });
});

function insert(text: string) {
  editorRef.value?.insertPlaceholder(text);
}

function applyReport(report: Report) {
  form.key = report.key;
  form.title = report.title || '';
  form.icon = report.icon || 'chart';
  form.views = Array.isArray((report.config as Record<string, unknown>)?.views)
    ? ((report.config as Record<string, unknown>).views as string[])
    : ['grid'];
  form.processing = String((report.config as Record<string, unknown>)?.processing ?? 'client');
  form.rowPageSize = Number((report.config as Record<string, unknown>)?.rowPageSize ?? 100);
  form.query = report.query_text || '';
  form.config = (report.config as Record<string, unknown>) ?? {};
  form.parentId = report.parent_id ?? null;
  form.sortOrder = report.sort_order ?? 0;
}

async function load() {
  try {
    const [toolbarData, report] = await Promise.all([
      reportsApi.getToolbar().catch(() => ({ toolbar: [] as ToolbarItem[] })),
      key.value ? reportsApi.get(key.value) : Promise.resolve(null),
    ]);
    toolbar.value = (toolbarData.toolbar || []) as ToolbarItem[];
    if (report) {
      applyReport(report);
      await nextTick();
      // Явно отдаём текст редактору: подписка на prop может сработать раньше
      // создания Monaco, и тогда полотно остаётся пустым.
      editorRef.value?.setValue(form.query);
    }
  } catch (e) {
    status.value = `Не удалось открыть отчёт: ${(e as Error).message}`;
    statusError.value = true;
  }
}

async function save() {
  if (!canSave.value) return;
  saving.value = true;
  status.value = '';
  statusError.value = false;
  const views = form.views.length ? form.views : ['grid'];
  const config = {
    ...form.config,
    views,
    defaultView: 'grid',
    processing: form.processing,
    rowPageSize: form.rowPageSize,
  };
  const payload = {
    key: form.key,
    title: form.title,
    icon: form.icon,
    image: '',
    query_text: form.query,
    config,
    parent_id: form.parentId,
    is_section: false,
    sort_order: form.sortOrder,
  };
  try {
    if (isNew.value) {
      await reportsApi.create(payload);
      status.value = 'Отчёт создан';
      void router.push(`/report-editor/${encodeURIComponent(form.key)}`);
    } else {
      await reportsApi.update(form.key, payload);
      status.value = 'Сохранено';
    }
  } catch (e) {
    status.value = `Ошибка сохранения: ${(e as Error).message}`;
    statusError.value = true;
  } finally {
    saving.value = false;
  }
}

const filterOptions = computed(() => filters.value.map((f) => f.name));
const previewGridColumns = computed(() => previewColumns.value.map((col) => ({ dataField: col, caption: col })));

function joinList(raw: string): string {
  return raw.split(',').map((s) => s.trim()).filter(Boolean).join(',');
}

async function runPreview() {
  previewRunning.value = true;
  previewError.value = '';
  previewWarnings.value = [];
  try {
    let sql = form.query || '';
    if (/^\s*select\b/i.test(sql) && !/\btop\s*\(?\d+\)?/i.test(sql)) {
      sql = sql.replace(/\bselect\b/i, 'SELECT TOP 1000');
    }
    sql = sql.replace(/\{([^}]+)\}/g, (match, name: string) => {
      const raw = previewValues[name];
      if (raw === undefined || raw === '') {
        previewWarnings.value = [...previewWarnings.value, `${match}: значение не задано`];
        return match;
      }
      const value = joinList(raw);
      if (!value) {
        previewWarnings.value = [...previewWarnings.value, `${match}: пустой список`];
        return match;
      }
      return value;
    });
    const dbName = String((form.config as Record<string, unknown>).db || 'DB1UL');
    const res = await reportsApi.execute(dbName, sql);
    if (res.error) {
      previewError.value = res.error;
      previewColumns.value = [];
      previewRows.value = [];
    } else {
      previewColumns.value = res.columns || [];
      previewRows.value = (res.rows || []).map((row) => {
        const obj: Record<string, unknown> = {};
        (res.columns || []).forEach((col, i) => { obj[col] = row[i]; });
        return obj;
      });
    }
  } catch (e) {
    previewError.value = (e as Error).message;
  } finally {
    previewRunning.value = false;
  }
}

onMounted(() => {
  void load();
});
</script>

<style scoped lang="scss">
.report-editor {
  padding: 16px 20px;
  max-width: 1200px;
}

.report-editor__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;

  h2 {
    margin: 0;
    font-size: 18px;
  }
}

.report-editor__status {
  margin-bottom: 12px;
  color: #2e7d32;
  font-size: 13px;

  &--error {
    color: #c62828;
  }
}

.report-editor__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  margin-bottom: 16px;
}

.report-editor__panel {
  display: flex;
  flex-direction: column;
  gap: 10px;

  h3 {
    margin: 0 0 4px;
    font-size: 14px;
    opacity: 0.85;
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;

  span {
    color: var(--texteditor-label-color, var(--base-text-color));
  }
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 0;
  border-bottom: 1px dashed rgba(128, 128, 128, 0.25);
  font-size: 13px;
}

.filter-row__name {
  flex: 1 1 auto;
}

.filter-row__type {
  opacity: 0.6;
  font-size: 11px;
}

.hint {
  opacity: 0.7;
  font-size: 12px;
}

.preview {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.preview__toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview__fields {
  flex: 1 1 auto;
}

.preview__field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview__label {
  min-width: 160px;
  font-size: 12px;
  opacity: 0.8;
}

.preview__warn {
  color: #a15c00;
  font-size: 12px;
}

.preview__error {
  color: #c62828;
  font-size: 13px;
}

.report-editor__sql-title {
  margin: 0 0 8px;
  font-size: 14px;
  opacity: 0.85;
}
</style>
