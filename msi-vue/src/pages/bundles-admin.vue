<template>
  <div class="view-wrapper bundles">
    <div class="bundles__toolbar theme-dependent">
      <dx-button
        icon="refresh"
        styling-mode="outlined"
        hint="Обновить список"
        @click="load()"
      />
      <dx-button
        icon="plus"
        text="Снять снимок"
        type="default"
        styling-mode="contained"
        hint="Сохранить текущее состояние каталога как набор"
        @click="snapshotOpen = true"
      />
      <label class="bundles__upload">
        <input
          type="file"
          accept=".json,application/json"
          @change="onImportFile($event)"
        >
        <dx-button
          icon="upload"
          text="Импорт JSON"
          styling-mode="outlined"
          tag="span"
        />
      </label>
      <span class="bundles__spacer" />
      <span
        v-if="status"
        class="bundles__status"
        :class="{ 'bundles__status--error': statusError }"
      >{{ status }}</span>
    </div>

    <dx-data-grid
      :data-source="rows"
      :columns="columns"
      :show-borders="true"
      height="100%"
      key-expr="id"
      @row-click="onRowClick"
    >
      <template #actions-template>
        <dx-button
          icon="redo"
          styling-mode="text"
          hint="Переснять снимок (новая версия)"
          @click="resnapshot($event)"
        />
      </template>
    </dx-data-grid>

    <!-- Диалог «Снять снимок» -->
    <div
      v-if="snapshotOpen"
      class="bundles__overlay"
      @click.self="snapshotOpen = false"
    >
      <div class="bundles__dialog theme-dependent">
        <header class="bundles__dialog-head">
          <span>Снять снимок каталога</span>
          <button
            type="button"
            class="bundles__close"
            @click="snapshotOpen = false"
          >×</button>
        </header>

        <label class="bundles__field">
          <span class="bundles__field-label">Имя набора *</span>
          <input
            v-model="snapshotName"
            class="bundles__input"
            placeholder="Например: Прод 1.0"
          >
        </label>
        <label class="bundles__field">
          <span class="bundles__field-label">Описание</span>
          <input
            v-model="snapshotDescription"
            class="bundles__input"
            placeholder="Что вошло и зачем"
          >
        </label>

        <dx-check-box
          :value="snapshotOnlyUsed"
          text="Только используемые фильтры и запросы"
          @value-changed="snapshotOnlyUsed = $event.value"
        />
        <dx-check-box
          :value="snapshotToolbar"
          text="Включить панель фильтров (toolbar)"
          @value-changed="snapshotToolbar = $event.value"
        />

        <div class="bundles__dialog-foot">
          <dx-button
            text="Отмена"
            styling-mode="outlined"
            @click="snapshotOpen = false"
          />
          <dx-button
            text="Снять"
            type="default"
            styling-mode="contained"
            :disabled="!snapshotName.trim() || busy"
            @click="createSnapshot()"
          />
        </div>
      </div>
    </div>

    <!-- Диалог «Применить» -->
    <div
      v-if="applyTarget"
      class="bundles__overlay"
      @click.self="applyTarget = null"
    >
      <div class="bundles__dialog theme-dependent">
        <header class="bundles__dialog-head">
          <span>Применить «{{ applyTarget.name }}»</span>
          <button
            type="button"
            class="bundles__close"
            @click="applyTarget = null"
          >×</button>
        </header>
        <div class="bundles__hint">
          {{ applyTarget.item_counts }} · версия {{ applyTarget.version }}
        </div>

        <div class="bundles__field">
          <span class="bundles__field-label">Филиалы (пусто = без замены веток)</span>
          <div class="bundles__branches">
            <dx-check-box
              v-for="n in 9"
              :key="n"
              :value="applyBranches.includes(String(n))"
              :text="`Филиал ${n}`"
              @value-changed="toggleBranch(String(n), $event.value)"
            />
          </div>
        </div>

        <dx-radio-group
          :value="applyMode"
          :items="applyModes"
          value-expr="value"
          display-expr="text"
          @value-changed="applyMode = $event.value"
        />

        <div class="bundles__hint">
          «Заменить» прячет отчёты выбранных филиалов, не вошедшие в набор.
        </div>

        <div class="bundles__dialog-foot">
          <dx-button
            text="Отмена"
            styling-mode="outlined"
            :disabled="busy"
            @click="applyTarget = null"
          />
          <dx-button
            text="Применить"
            type="default"
            styling-mode="contained"
            :disabled="busy"
            @click="applyBundle()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { DxButton } from 'devextreme-vue/button';
import { DxCheckBox, DxRadioGroup } from 'devextreme-vue';

import { DxDataGrid } from 'devextreme-vue/data-grid';

import { bundlesApi, type BundleInfo } from '@/services/bundles-api';

// Управление наборами — только SuperAdmin (маршрут закрыт и на сервере).

const bundles = ref<BundleInfo[]>([]);
const status = ref('');
const statusError = ref(false);
const busy = ref(false);

const snapshotOpen = ref(false);
const snapshotName = ref('');
const snapshotDescription = ref('');
const snapshotOnlyUsed = ref(true);
const snapshotToolbar = ref(true);

const applyTarget = ref<BundleInfo | null>(null);
const applyMode = ref<'merge' | 'replace'>('merge');
const applyBranches = ref<string[]>([]);

const applyModes = [
  { value: 'merge', text: 'Добавить/обновить (merge)' },
  { value: 'replace', text: 'Заменить ветки филиалов (replace)' },
];

const rows = computed(() => bundles.value.map((b) => ({ ...b })));

const columns = [
  { dataField: 'name', caption: 'Набор', minWidth: 180 },
  { dataField: 'item_counts', caption: 'Состав', minWidth: 200 },
  { dataField: 'version', caption: 'Вер.', width: 60 },
  { dataField: 'created_by', caption: 'Автор', width: 130 },
  {
    dataField: 'updated_at',
    caption: 'Обновлён',
    dataType: 'date',
    format: 'dd.MM.yyyy HH:mm',
    width: 140,
  },
];

async function load(): Promise<void> {
  try {
    const data = await bundlesApi.list();
    bundles.value = data.bundles ?? [];
  } catch (e) {
    status.value = `Не удалось прочитать наборы: ${(e as Error).message}`;
    statusError.value = true;
  }
}

async function createSnapshot(): Promise<void> {
  busy.value = true;
  try {
    const res = await bundlesApi.create({
      name: snapshotName.value.trim(),
      description: snapshotDescription.value,
      scope: {
        filters: snapshotOnlyUsed.value ? 'used' : 'all',
        queries: snapshotOnlyUsed.value ? 'used' : 'all',
        with_toolbar: snapshotToolbar.value,
      },
    });
    status.value = `Снимок создан: ${res.item_counts}`;
    statusError.value = false;
    snapshotOpen.value = false;
    snapshotName.value = '';
    snapshotDescription.value = '';
    await load();
  } catch (e) {
    status.value = (e as Error).message;
    statusError.value = true;
  } finally {
    busy.value = false;
  }
}

async function resnapshot(b: BundleInfo): Promise<void> {
  busy.value = true;
  try {
    const res = await bundlesApi.resnapshot(b.id, {});
    status.value = `«${b.name}» переснят: ${res.item_counts}`;
    statusError.value = false;
    await load();
  } catch (e) {
    status.value = (e as Error).message;
    statusError.value = true;
  } finally {
    busy.value = false;
  }
}

async function onImportFile(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  input.value = '';
  if (!file) return;
  busy.value = true;
  try {
    const text = await file.text();
    const res = await bundlesApi.importFile({
      name: file.name.replace(/\.json$/i, ''),
      payload: text,
    });
    status.value = `Импортирован набор: ${res.item_counts}`;
    statusError.value = false;
    await load();
  } catch (e) {
    status.value = `Импорт не удался: ${(e as Error).message}`;
    statusError.value = true;
  } finally {
    busy.value = false;
  }
}

function onRowClick(e: { rowType?: string; data?: BundleInfo & Record<string, unknown> }): void {
  if (e.rowType !== 'data' || !e.data) return;
  const b = e.data as BundleInfo;
  void bundlesApi.exportFile(b.id).catch((err: Error) => {
    status.value = `Экспорт не удался: ${err.message}`;
    statusError.value = true;
  });
}

function toggleBranch(n: string, on: boolean): void {
  applyBranches.value = on
    ? [...new Set([...applyBranches.value, n])]
    : applyBranches.value.filter((x) => x !== n);
}

async function applyBundle(): Promise<void> {
  if (!applyTarget.value) return;
  busy.value = true;
  try {
    const res = await bundlesApi.apply(applyTarget.value.id, applyMode.value, applyBranches.value);
    status.value = res.message;
    statusError.value = false;
    applyTarget.value = null;
    await load();
  } catch (e) {
    status.value = (e as Error).message;
    statusError.value = true;
  } finally {
    busy.value = false;
  }
}

onMounted(() => {
  void load();
});
</script>

<style scoped>
.bundles {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  min-height: 480px;
}

.bundles__toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0 8px;
  margin-bottom: 8px;
}

.bundles__spacer { flex: 1 1 auto; }

.bundles__status { font-size: 12px; color: var(--dx-color-text, #374151); }
.bundles__status--error { color: var(--dx-color-danger, #b91c1c); }

.bundles__upload input[type="file"] { display: none; }

.bundles__overlay {
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.35);
}

.bundles__dialog {
  color: var(--dx-color-text, #1f2937);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 460px;
  max-width: 92vw;
  max-height: 88vh;
  overflow: auto;
  padding: 16px;
  background: var(--dx-color-main-bg, #fff);
  border-radius: 12px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.25);
}

.bundles__dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
}

.bundles__close {
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

.bundles__field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bundles__field-label {
  font-size: 12px;
  color: var(--dx-color-text, #4b5563);
}

.bundles__input {
  width: 100%;
  padding: 6px 8px;
  font: inherit;
  color: inherit;
  background: transparent;
  border: 1px solid var(--dx-color-border, #d1d5db);
  border-radius: 8px;
}

.bundles__branches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}

.bundles__dialog-foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.bundles__hint { font-size: 11px; opacity: 0.7; }
</style>
