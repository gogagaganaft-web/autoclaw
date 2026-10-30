<template>
  <div class="view-wrapper wz">
    <div class="wz__head theme-dependent">
      <div class="wz__steps">
        <div
          v-for="(title, index) in stepTitles"
          :key="title"
          class="wz__step"
          :class="{
            'wz__step--active': step === index + 1,
            'wz__step--done': step > index + 1,
          }"
        >
          <span class="wz__step-num">{{ index + 1 }}</span>
          <span class="wz__step-title">{{ title }}</span>
        </div>
      </div>
    </div>

    <div class="wz__body">
      <!-- ШАГ 1: выбор готового запроса -->
      <section
        v-if="step === 1"
        class="wz__card theme-dependent"
      >
        <h3 class="wz__card-title">
          Выбор готового запроса
        </h3>
        <p class="wz__hint">
          Запрос задаёт SQL, фильтры, базу и колонки отчёта.
          Готовые запросы ведутся на странице «Запросы».
        </p>

        <label class="wz__field">
          <span class="wz__label">Запрос <b>*</b></span>
          <dx-select-box
            :value="queryKey"
            :items="queryOptions"
            value-expr="key"
            display-expr="title"
            :show-clear-button="true"
            :search-enabled="true"
            placeholder="Выберите запрос"
            @value-changed="onQueryChanged($event.value)"
          />
        </label>

        <template v-if="query">
          <div class="wz__chips">
            <span class="wz__label">Фильтры:</span>
            <span
              v-for="field in query.filters || []"
              :key="field"
              class="wz__chip"
            >{{ field }}</span>
            <span
              v-if="!(query.filters || []).length"
              class="wz__hint"
            >нет — отчёт без панели фильтров</span>
          </div>

          <div class="wz__chips">
            <span class="wz__label">База:</span>
            <span class="wz__chip">{{ dbName }}</span>
            <span class="wz__label">Колонок:</span>
            <span class="wz__chip">{{ columns.length }}</span>
          </div>

          <div class="wz__code">{{ query.sql }}</div>

          <p
            v-if="!columns.length"
            class="wz__status wz__status--error"
          >
            У запроса нет сохранённых колонок: выполните его на странице
            «Запросы» и сохраните колонки — иначе не из чего собирать виды.
          </p>
        </template>

        <div
          v-if="status"
          class="wz__status"
          :class="{ 'wz__status--error': statusError }"
        >
          {{ status }}
        </div>
      </section>

      <!-- ШАГ 2: набор полей для видов просмотра -->
      <section
        v-else-if="step === 2"
        class="wz__card wz__card--split theme-dependent"
      >
        <p class="wz__hint">
          Колонки берутся из сохранённых колонок запроса
          «{{ query?.title || queryKey }}». У каждого вида — свой набор полей.
        </p>
        <report-views-editor
          :views="views"
          :columns="columns"
          @update:views="views = $event"
        />
      </section>

      <!-- ШАГ 3: сохранение -->
      <section
        v-else
        class="wz__card theme-dependent"
      >
        <h3 class="wz__card-title">
          Сохранение отчёта
        </h3>

        <label class="wz__field">
          <span class="wz__label">Ключ отчёта <b>*</b></span>
          <dx-text-box
            :value="key"
            placeholder="например, RPT_OSV_BRANCH"
            @value-changed="key = $event.value"
          />
        </label>

        <label class="wz__field">
          <span class="wz__label">Название <b>*</b></span>
          <dx-text-box
            :value="title"
            placeholder="ОСВ по филиалам"
            @value-changed="title = $event.value"
          />
        </label>

        <label class="wz__field">
          <span class="wz__label">Раздел</span>
          <dx-select-box
            :value="parentId"
            :items="sectionOptions"
            value-expr="id"
            display-expr="title"
            :show-clear-button="true"
            placeholder="Корень дерева"
            @value-changed="parentId = $event.value"
          />
        </label>

        <div class="wz__summary">
          <div>запрос: {{ query?.title || queryKey }}</div>
          <div>фильтров: {{ (query?.filters || []).length }}</div>
          <div>колонок: {{ columns.length }}</div>
          <div>видов: {{ views.length }}</div>
        </div>

        <div
          v-if="status"
          class="wz__status"
          :class="{ 'wz__status--error': statusError }"
        >
          {{ status }}
        </div>
      </section>
    </div>

    <footer class="wz__foot theme-dependent">
      <dx-button
        text="Назад"
        styling-mode="outlined"
        :disabled="step === 1"
        @click="step -= 1"
      />
      <span class="wz__spacer" />
      <dx-button
        v-if="step < 3"
        text="Далее"
        icon="arrowright"
        type="default"
        styling-mode="contained"
        @click="next()"
      />
      <dx-button
        v-else
        text="Создать отчёт"
        icon="save"
        type="success"
        styling-mode="contained"
        :disabled="saving"
        @click="finish()"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxTextBox } from 'devextreme-vue/text-box';
import ReportViewsEditor from '@/components/report-editor/report-views-editor.vue';
import { queriesApi, type QueryColumn, type QueryDef } from '@/services/queries-api';
import { reportsApi, type Report } from '@/services/reports-api';
import { createView, mergeViewFields, type ReportViewDef } from '@/utils/report-views';

// ─── СОСТОЯНИЕ ──────────────────────────────────────────────────────────────

interface SectionOption { id: number; title: string }

const stepTitles = ['Выбор готового запроса', 'Поля видов просмотра', 'Сохранение'];
const step = ref(1);
const saving = ref(false);
const status = ref('');
const statusError = ref(false);

const queries = ref<QueryDef[]>([]);
const reports = ref<Report[]>([]);

const queryKey = ref('');
const views = ref<ReportViewDef[]>([]);
const key = ref('');
const title = ref('');
const parentId = ref<number | null>(null);

// ─── ВЫЧИСЛЯЕМЫЕ ─────────────────────────────────────────────────────────────

const queryOptions = computed(() => queries.value
  .map((query) => ({ key: query.key, title: query.title })));

const query = computed(() => queries.value.find((item) => item.key === queryKey.value) || null);

const dbName = computed(() => query.value?.db_key || 'не указана');

/** Колонки видов — сохранённые колонки запроса (ведутся на странице «Запросы»). */
const columns = computed<QueryColumn[]>(() => (query.value?.columns || []).map((column) => ({
  dataField: column.dataField,
  caption: column.caption,
})));

const editorColumns = computed(() => columns.value.map((column) => ({
  name: column.dataField,
  caption: column.caption,
})));

const sectionOptions = computed<SectionOption[]>(() => reports.value
  .filter((report) => report.is_section)
  .map((report) => ({ id: report.id, title: report.title || report.key })));

// ─── ЗАГРУЗКА ───────────────────────────────────────────────────────────────

async function load() {
  try {
    const [queryList, reportList] = await Promise.all([
      queriesApi.list(),
      reportsApi.list(),
    ]);

    queries.value = queryList.queries || [];
    reports.value = reportList || [];
  } catch (e) {
    status.value = `Не удалось загрузить справочники: ${(e as Error).message}`;
    statusError.value = true;
  }
}

function onQueryChanged(value: string) {
  queryKey.value = value || '';
  // Поля видов привязаны к колонкам запроса — при смене запроса начинаем заново.
  views.value = [];
}

// ─── ШАГИ ───────────────────────────────────────────────────────────────────

function next() {
  if (step.value === 1) {
    if (!query.value) {
      status.value = 'Выберите запрос';
      statusError.value = true;
      return;
    }
    if (!columns.value.length) {
      status.value = 'У запроса нет сохранённых колонок — сначала сохраните их на странице «Запросы»';
      statusError.value = true;
      return;
    }
    // Первый вид создаём по умолчанию: дальше пользователь добавит остальные.
    if (!views.value.length) {
      views.value = [createView('grid', editorColumns.value)];
    }
  }

  if (step.value === 2) {
    const available = editorColumns.value;
    if (available.length) {
      views.value = views.value.map((view) => ({
        ...view,
        fields: mergeViewFields(available, view.fields),
      }));
    }
  }

  status.value = '';
  statusError.value = false;
  step.value = Math.min(3, step.value + 1);
}

async function finish() {
  const errors: string[] = [];
  const reportKey = key.value.trim();
  const reportTitle = title.value.trim();

  if (!query.value) errors.push('Выберите запрос');
  if (!reportKey) errors.push('Укажите ключ отчёта');
  else if (!/^[A-Za-zА-Яа-яЁё_][A-Za-zА-Яа-яЁё0-9_]*$/.test(reportKey)) {
    errors.push('Ключ: буквы, цифры и подчёркивание, без пробелов');
  } else if (reports.value.some((report) => report.key === reportKey)) {
    errors.push(`Ключ «${reportKey}» уже занят`);
  }
  if (!reportTitle) errors.push('Укажите название');

  if (errors.length) {
    status.value = errors[0];
    statusError.value = true;
    return;
  }

  // config.filters — объект «поле → значение по умолчанию»: просмотр строит
  // панель по toolbar, а значения берёт отсюда. Поля — фильтры запроса.
  const configFilters: Record<string, unknown> = {};
  for (const field of query.value?.filters || []) {
    configFilters[field] = null;
  }

  const payload = {
    key: reportKey,
    title: reportTitle,
    icon: 'chart',
    image: '',
    query_text: query.value?.sql || '',
    query_key: queryKey.value,
    parent_id: parentId.value,
    is_section: false,
    sort_order: 99,
    config: {
      filters: configFilters,
      queryKey: queryKey.value,
      defaultView: 'grid',
      views: views.value.map((view) => ({
        key: view.key,
        type: view.type,
        title: view.title,
        fields: view.fields,
      })),
    },
  };

  saving.value = true;
  try {
    await reportsApi.create(payload as never);
    status.value = `Отчёт «${reportTitle}» создан`;
    statusError.value = false;
    window.location.hash = `#/report/${encodeURIComponent(reportKey)}`;
  } catch (e) {
    status.value = `Не удалось создать отчёт: ${(e as Error).message}`;
    statusError.value = true;
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  void load();
});
</script>

<style scoped>
.wz {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.wz__head {
  padding: 10px 16px;
}

.wz__steps {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.wz__step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  opacity: 0.55;
}

.wz__step--active {
  opacity: 1;
  font-weight: 600;
}

.wz__step--done {
  opacity: 0.85;
}

.wz__step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  font-size: 12px;
  border: 1px solid currentColor;
  border-radius: 50%;
}

.wz__step--done .wz__step-num {
  color: #fff;
  background: #22c55e;
  border-color: #22c55e;
}

.wz__step--active .wz__step-num {
  color: #fff;
  background: #3b82f6;
  border-color: #3b82f6;
}

.wz__body {
  flex: 1 1 auto;
  min-height: 0;
  padding: 14px 16px;
  overflow: auto;
}

.wz__card {
  color: var(--dx-color-text, #1f2937);
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
  padding: 16px;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 12px;
}

.wz__card--split {
  max-width: none;
  gap: 10px;
}

.wz__card-title {
  margin: 0;
  font-size: 15px;
}

.wz__hint {
  margin: 0;
  font-size: 12px;
  opacity: 0.7;
}

.wz__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.wz__label {
  font-size: 12px;
  color: var(--dx-color-text, #4b5563);
}

.wz__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.wz__chip {
  padding: 2px 8px;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 12px;
  border: 1px dashed var(--dx-color-border, #cbd5e1);
  border-radius: 8px;
}

.wz__code {
  margin: 0;
  padding: 10px 12px;
  max-height: 240px;
  overflow: auto;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  border: 1px solid var(--dx-color-border, #e5e7eb);
  border-radius: 8px;
}

.wz__status {
  font-size: 12px;
}

.wz__status--error {
  color: var(--dx-color-danger, #b91c1c);
}

.wz__summary {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
  opacity: 0.8;
}

.wz__foot {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-top: 1px solid var(--dx-color-border, #e5e7eb);
}

.wz__spacer {
  flex: 1 1 auto;
}
</style>
