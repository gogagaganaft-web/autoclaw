<template>
  <div
    class="view-wrapper report-page"
    :class="{ 'is-pinned': filtersOpen && filtersPinned }"
    :style="{ '--filters-panel-width': `${filtersWidth}px` }"
  >
    <div
      class="report-body"
      :class="{ 'is-resizing': filtersResizing }"
    >
      <!-- Верхняя панель (drawer): состояние вида + действия -->
      <div class="report-drawer theme-dependent">
        <div class="report-drawer__content">
          <!-- Виды просмотра — группа кнопок. У каждой кнопки справа стрелка:
               её меню — сохранённые состояния этого вида. Клик по состоянию
               переключает вид и восстанавливает снимок. -->
          <div
            v-if="modes.length"
            class="report-modes"
          >
            <dx-drop-down-button
              v-for="(mode, index) in modes"
              :key="mode.type"
              :element-attr="{ class: modeItemClass(index) }"
              :text="modeButtonText(mode)"
              :icon="modeIcon(mode.type)"
              :split-button="true"
              :items="modeMenuItems(mode.type)"
              display-expr="text"
              :drop-down-options="{ width: 360 }"
              styling-mode="outlined"
              :hint="modeHint(mode.type)"
              :disabled="controlsDisabled"
              :on-button-click="() => selectMode(index)"
              :on-item-click="(e: any) => onModeMenuItemClick(mode.type, e)"
            >
              <!-- Пункт меню: название состояния и время создания во всплывающей
                   подсказке (title). Свой шаблон нужен, потому что встроенный
                   список DevExtreme не выводит hint пункта. -->
              <template #item="{ data }">
                <div
                  class="report-state-item"
                  :title="data?.hint || null"
                >
                  <i
                    v-if="data?.icon"
                    class="dx-icon report-state-item__check"
                    :class="`dx-icon-${data.icon}`"
                  />
                  <span class="report-state-item__text">{{ data?.text }}</span>
                </div>
              </template>
            </dx-drop-down-button>
          </div>

          <div class="report-drawer__actions">
            <dx-button
              icon="add"
              hint="Создать новое состояние для текущего вида"
              styling-mode="outlined"
              :disabled="controlsDisabled"
              @click="createModeView()"
            />
            <dx-button
              icon="save"
              hint="Сохранить состояние отображения и фильтры для текущего режима"
              styling-mode="outlined"
              :disabled="viewActionsDisabled"
              @click="saveModeView()"
            />
            <dx-button
              icon="rename"
              hint="Переименовать сохранённое представление"
              styling-mode="outlined"
              :disabled="viewActionsDisabled"
              @click="openRename()"
            />
            <dx-button
              icon="trash"
              hint="Удалить сохранённое представление текущего режима"
              styling-mode="outlined"
              :disabled="viewActionsDisabled"
              @click="askDelete()"
            />
            <span class="report-drawer__divider" />
            <dx-button
              v-if="chooserMode"
              icon="columnchooser"
              :hint="chooserHint"
              styling-mode="outlined"
              :disabled="controlsDisabled"
              @click="openFieldChooser()"
            />
            <dx-button
              icon="exportxlsx"
              hint="Экспорт в EXCEL"
              styling-mode="outlined"
              :disabled="isExporting || controlsDisabled"
              @click="exportExcel()"
            />
            <span class="report-drawer__divider" />
            <dx-button
              icon="panelright"
              hint="Контур данных"
              :type="filtersOpen ? 'default' : 'normal'"
              :styling-mode="filtersOpen ? 'contained' : 'outlined'"
              @click="toggleFilters()"
            />
            <dx-button
              icon="refresh"
              hint="Обновить данные"
              type="default"
              styling-mode="contained"
              :disabled="controlsDisabled"
              @click="loadData()"
            />
            <dx-button
              icon="preferences"
              hint="Настроить отчёт"
              styling-mode="outlined"
              :disabled="controlsDisabled"
              @click="openEditor()"
            />
          </div>
        </div>
      </div>

      <div class="report-main">
        <div
          v-if="dataError"
          class="report-error"
        >
          {{ dataError }}
        </div>

        <div
          ref="viewsRef"
          class="report-views"
        >
          <!-- Виджет показываем только после того, как отчёт сформирован
               и данные получены: до этого область отчёта остаётся пустой. -->
          <div
            v-if="dataLoaded && activeMode?.type === 'grid'"
            :key="`grid-${viewInstanceKey}`"
            class="view-host"
          >
            <dx-data-grid
              ref="gridRef"
              :data-source="rowObjects"
              :columns="gridColumns"
              :show-borders="true"
              :row-alternation-enabled="true"
              :column-auto-width="true"
              :height="viewHeight"
              :paging="{ pageSize: 20 }"
              :pager="{ visible: true, showPageSizeSelector: true, allowedPageSizes: [10, 20, 50, 100, 500], showInfo: true }"
              :filter-row="{ visible: true }"
              :header-filter="{ visible: true, search: { enabled: true } }"
              :group-panel="{ visible: true }"
              :column-chooser="{ enabled: true, mode: 'select' }"
              :toolbar="{ visible: false }"
              :on-content-ready="onGridContentReady"
            />
          </div>

          <div
            v-else-if="dataLoaded && activeMode?.type === 'pivot'"
            :key="`pivot-${viewInstanceKey}`"
            class="view-host"
          >
            <dx-pivot-grid
              ref="pivotRef"
              :data-source="pivotDataSource"
              :show-borders="true"
              :height="viewHeight"
              :allow-expand-all="true"
              :allow-sorting="true"
              :allow-sorting-by-summary="true"
              :allow-filtering="true"
              :show-column-grand-totals="false"
              :show-column-totals="false"
              show-totals-prior="both"
              :show-row-grand-totals="true"
              :show-row-totals="false"
              :scrolling="{ mode: 'virtual', rowRenderingMode: 'virtual', columnRenderingMode: 'virtual' }"
              :header-filter="{ search: { enabled: true }, showRelevantValues: true, width: 450, height: 500 }"
              :filter-panel="{ visible: true }"
              :field-panel="{ showColumnFields: true, showRowFields: true, showFilterFields: false, showDataFields: false, allowFieldDragging: true, visible: true }"
              :field-chooser="{ enabled: true }"
              :on-content-ready="pivotContentReady"
              :on-cell-click="pivotCellClick"
              :on-context-menu-preparing="pivotContextMenu"
            />
          </div>

          <div
            v-else-if="dataLoaded && activeMode?.type === 'map'"
            :key="`map-${viewInstanceKey}`"
            class="view-host"
            :style="{ height: `${viewHeight}px` }"
          >
            <yandex-map
              :points="mapPoints"
              :zoom="mapZoom"
              :center="mapCenter"
              :auto-fit="mapAutoFit"
              @update:zoom="onMapZoom"
              @update:center="onMapCenter"
            />
          </div>

          <div
            v-else-if="dataLoaded && activeMode?.type === 'dashboard'"
            :key="`dashboard-${viewInstanceKey}`"
            class="view-host view-host--dashboard"
          >
            <div class="dashboard-chart__bar">
              <span class="dashboard-chart__label">Тип графика</span>
              <dx-select-box
                :items="CHART_TYPES"
                value-expr="type"
                display-expr="name"
                :value="chartType"
                :width="230"
                @value-changed="chartType = $event.value"
              />
              <span class="dashboard-chart__label">Палитра</span>
              <dx-select-box
                :items="CHART_PALETTES"
                value-expr="value"
                display-expr="name"
                :value="chartPalette"
                :width="190"
                @value-changed="chartPalette = $event.value"
              />
              <dx-button
                class="dashboard-chart__toggle"
                :text="pivotCollapsed ? 'Показать свод' : 'Скрыть свод'"
                :icon="pivotCollapsed ? 'chevronup' : 'chevrondown'"
                styling-mode="outlined"
                @click="pivotCollapsed = !pivotCollapsed"
              />
            </div>

            <dx-chart
              ref="chartRef"
              :height="chartHeight"
              :common-series-settings="{ type: chartType }"
              :palette="chartPalette"
              :tooltip="chartTooltip"
              :value-axis="{ title: 'Сумма', label: { format: 'currency' } }"
              :argument-axis="{ title: 'Период' }"
              :legend="{ visible: true, horizontalAlignment: 'right', position: 'outside' }"
            />

            <dx-pivot-grid
              v-show="!pivotCollapsed"
              ref="pivotChartRef"
              :data-source="pivotDataSource"
              :show-borders="true"
              :height="pivotChartHeight"
              :allow-expand-all="true"
              :allow-sorting="true"
              :allow-sorting-by-summary="true"
              :allow-filtering="true"
              :show-column-grand-totals="false"
              :show-column-totals="false"
              :show-row-grand-totals="true"
              :show-row-totals="false"
              :scrolling="{ mode: 'virtual', rowRenderingMode: 'virtual', columnRenderingMode: 'virtual' }"
              :header-filter="{ search: { enabled: true }, showRelevantValues: true }"
              :field-panel="{ showColumnFields: true, showRowFields: true, showFilterFields: true, showDataFields: true, allowFieldDragging: true, visible: true }"
              :field-chooser="{ enabled: true }"
              :on-content-ready="dashboardPivotReady"
            />
          </div>

          <div
            v-else-if="dataLoaded"
            class="report-empty"
          >
            Режим «{{ activeMode?.title || '—' }}» пока не поддерживается.
          </div>
        </div>
      </div>
    </div>

    <!-- Подложка: панель фильтров открыта, но не закреплена -->
    <div
      v-if="filtersOpen && !filtersPinned"
      class="filters-scrim"
      @click="filtersOpen = false"
    />

    <!-- Правая панель: границы данных — фильтры самого отчёта -->
    <aside
      class="filters-panel theme-dependent"
      :class="{ 'is-open': filtersOpen, 'is-pinned': filtersPinned }"
    >
      <!-- Шторка: тянем за левый край панели и меняем её ширину. -->
      <div
        v-if="filtersOpen"
        class="filters-panel__grip"
        role="separator"
        aria-orientation="vertical"
        title="Потяните, чтобы изменить ширину панели"
        @pointerdown="startFiltersResize"
      />

      <header class="filters-panel__head">
        <i class="dx-icon dx-icon-taskcomplete" />
        <span class="filters-panel__title">Контур данных</span>
        <!-- Кнопки панели — штатные dx-button MSI, чтобы они наследовали тему:
             своя разметка в тёмной теме оставалась с тёмным текстом. -->
        <dx-button
          :icon="filtersPinned ? 'pin' : 'unpin'"
          :hint="filtersPinned ? 'Открепить' : 'Закрепить'"
          :type="filtersPinned ? 'default' : 'normal'"
          styling-mode="text"
          @click="togglePin()"
        />
        <dx-button
          icon="close"
          hint="Закрыть"
          styling-mode="text"
          @click="filtersOpen = false"
        />
      </header>

      <div class="filters-panel__body">
        <filter-panel
          v-if="fields.length"
          v-model="filterValues"
          :fields="fields"
          :databases="databases"
          vertical
          @apply="onApplyFilters()"
        />
        <div
          v-else
          class="filters-panel__empty"
        >
          У отчёта нет собственных фильтров — данные загружаются сразу.
        </div>
      </div>
    </aside>

    <!-- Переименование сохранённого представления -->
    <div
      v-if="renameVisible"
      class="modal-layer"
      @click.self="renameVisible = false"
    >
      <div
        class="modal-card theme-dependent"
        role="dialog"
        aria-modal="true"
      >
        <header class="modal-card__head">
          <span class="modal-card__title">Переименовать представление</span>
          <button
            class="icon-btn"
            type="button"
            title="Закрыть"
            @click="renameVisible = false"
          >
            <i class="dx-icon dx-icon-close" />
          </button>
        </header>
        <div class="modal-card__body">
          <dx-text-box
            :value="renameValue"
            :max-length="80"
            placeholder="Название представления"
            @value-changed="renameValue = $event.value"
            @enter-key="applyRename()"
          />
        </div>
        <footer class="modal-card__foot">
          <dx-button
            text="Отмена"
            styling-mode="outlined"
            @click="renameVisible = false"
          />
          <dx-button
            text="Переименовать"
            type="default"
            styling-mode="contained"
            @click="applyRename()"
          />
        </footer>
      </div>
    </div>

    <!-- Удаление сохранённого представления -->
    <div
      v-if="confirmDelete"
      class="modal-layer"
      @click.self="confirmDelete = false"
    >
      <div
        class="modal-card theme-dependent"
        role="dialog"
        aria-modal="true"
      >
        <header class="modal-card__head">
          <span class="modal-card__title">Удалить сохранённое состояние?</span>
          <button
            class="icon-btn"
            type="button"
            title="Закрыть"
            @click="confirmDelete = false"
          >
            <i class="dx-icon dx-icon-close" />
          </button>
        </header>
        <div class="modal-card__body">
          <div class="modal-card__text">
            Состояние «{{ actionMode?.name || activeMode?.title || '' }}»
            будет удалено. Вид переключится на оставшееся состояние или вернётся
            к настройкам из конфигурации, данные запрошены заново.
          </div>
        </div>
        <footer class="modal-card__foot">
          <dx-button
            text="Отмена"
            styling-mode="outlined"
            @click="confirmDelete = false"
          />
          <dx-button
            text="Удалить"
            type="danger"
            styling-mode="contained"
            @click="deleteModeView()"
          />
        </footer>
      </div>
    </div>

    <dx-load-panel
      :visible="isLoading"
      :show-pane="false"
      :position="{ of: '.view-wrapper' }"
      container=".view-wrapper"
    />

    <!-- Детализация свода: клик по ячейке данных открывает строки, из которых
         она собрана (в MSI — попап с таблицей детализации). -->
    <dx-popup
      :key="drillKey"
      :visible="drillVisible"
      :title="drillTitle"
      :width="drillWidth"
      :height="drillHeight"
      :show-close-button="true"
      :show-borders="true"
      :hide-on-outside-click="true"
      :resize-enabled="true"
      :on-resize="onDrillResize"
      :on-hidden="onDrillHidden"
    >
      <template #content>
        <div class="drill-grid-wrap">
          <dx-data-grid
            ref="drillGridRef"
            height="100%"
            :data-source="drillDataSource"
            :columns="drillColumns"
            :allow-column-resizing="true"
            :show-borders="true"
            column-resizing-mode="nextColumn"
            :show-column-lines="true"
            :allow-column-reordering="true"
            :column-auto-width="true"
            :grouping="{ autoExpandAll: false }"
            :group-panel="{ visible: true }"
            :paging="{ enabled: true, pageSize: 20 }"
            :pager="{ visible: true, showPageSizeSelector: true, allowedPageSizes: [10, 20, 50, 100, 500], showInfo: true, showNavigationButtons: true }"
            :scrolling="{ mode: 'standard' }"
            :column-chooser="{ enabled: true, mode: 'select', height: 450, width: 450 }"
            :header-filter="{ search: { enabled: true }, visible: true }"
            :filter-panel="{ visible: true }"
            :filter-builder-popup="{ width: 800, title: 'Фильтр : ' }"
            :on-context-menu-preparing="drillContextMenu"
          />
        </div>
      </template>
    </dx-popup>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DxButton } from 'devextreme-vue/button';
import { DxDropDownButton } from 'devextreme-vue/drop-down-button';
import { DxDataGrid } from 'devextreme-vue/data-grid';
import { DxPivotGrid } from 'devextreme-vue/pivot-grid';
import { DxChart } from 'devextreme-vue/chart';
import { DxSelectBox } from 'devextreme-vue/select-box';
import { DxLoadPanel } from 'devextreme-vue/load-panel';
import { DxPopup } from 'devextreme-vue/popup';
import { DxTextBox } from 'devextreme-vue/text-box';
import notify from 'devextreme/ui/notify';
import type * as ExcelJS from 'exceljs';
import FilterPanel from '@/components/library/filter-panel.vue';
import YandexMap, { type MapPoint } from '@/components/library/yandex-map.vue';
import { reportsApi, Report, ReportConfig, ToolbarItem, SysRequestItem } from '@/services/reports-api';
import {
  exportRowsViaServer,
  MAX_ROWS,
  sufficientClientMemory,
  styleReportWorksheet,
  type ExportColumnsSpec,
} from '@/utils/excel-export';
import {
  buildFilterFields, buildModes, defaultModeIndex, gridColumnsFor, initialFilterValues,
  mapSettingsFor, pivotFieldsFor, toPlainDeep, asRecord, DB_FIELDS,
  type FilterField, type FilterItem, type ModeTab, type ModeType,
} from '@/utils/report-config';
import { userDefaultDbId } from '@/utils/default-db';
import {
  defaultViewName, hydrateReportView, loadReportView, modeViews, newSavedViewId, pickedView, removeReportView,
  saveReportView,
  type ReportViewState, type SavedModeView, type SavedWidgetState,
} from '@/utils/report-view-state';
import { closeSideMenu } from '@/composables/use-side-menu';
import { filterStorage } from '@/utils/filter-storage';

const route = useRoute();
const router = useRouter();

const key = computed(() => String(route.params.key ?? ''));

// Данные отчёта получены хотя бы раз. До этого верхняя панель заблокирована
// целиком (виды просмотра, состояния, «Обновить данные», экспорт): отчёт
// открывается с открытой панелью «Контур данных», и запускает его
// «Сформировать отчёт». «Контур данных» остаётся активным — это единственная
// кнопка, которая нужна до загрузки данных.
const dataLoaded = ref(false);

const isLoading = ref(false);
const isExporting = ref(false);
// Общая блокировка панели: пока данных нет или идёт запрос к MS SQL.
const controlsDisabled = computed(() => !dataLoaded.value || isLoading.value);
// Выбор полей/столбцов есть у свода (включая график) и у таблицы; у карты — нет.
const chooserMode = computed(() => {
  const type = activeMode.value?.type;
  return type === 'pivot' || type === 'dashboard' || type === 'grid';
});
const chooserHint = computed(() => (activeMode.value?.type === 'grid' ? 'Выбор столбцов' : 'Выбор полей'));
const dataError = ref('');
const report = ref<Report | null>(null);
const config = ref<ReportConfig>({});
const toolbar = ref<Record<string, unknown>[]>([]);
const databases = ref<FilterItem[]>([]);

const fields = ref<FilterField[]>([]);
const modes = ref<ModeTab[]>([]);
const filterValues = ref<Record<string, unknown>>({});
const modeIndex = ref(0);

const columns = ref<string[]>([]);
const rows = ref<unknown[][]>([]);

const activeMode = computed<ModeTab | undefined>(() => modes.value[modeIndex.value]);
// Высота виджета — это реальная высота области просмотра. Так она подстраивается
// под верхнюю панель (с чипсами и кнопками), нижнюю статусную строку и
// закреплённую панель фильтров.
const viewsRef = ref<HTMLElement | null>(null);
const viewHeight = ref(360);
// Меняем ключ у вида, чтобы после удаления снимка виджет пересоздался
// с чистой конфигурацией отчёта, а не сохранял старую раскладку.
const viewInstanceKey = ref(0);
let viewsObserver: ResizeObserver | null = null;

function measureViewHeight() {
  const el = viewsRef.value;
  if (!el) return;
  const styles = getComputedStyle(el);
  const padding = (parseFloat(styles.paddingTop) || 0) + (parseFloat(styles.paddingBottom) || 0);
  const next = Math.max(220, Math.floor(el.clientHeight - padding));
  if (Math.abs(next - viewHeight.value) > 1) viewHeight.value = next;
}

// ─── Сохранённое представление ──────────────────────────────────────────────
// Кнопки «Создать новое / Сохранить / Переименовать / Удалить» в верхней панели
// управляют снимками состояния каждого режима (таблица/свод/инфографика/карта)
// и значениями фильтров. У вида может быть несколько снимков; они живут
// в localStorage по ключу отчёта, выбранный снимок запоминается в `selected`.

const viewState = ref<ReportViewState | null>(null);
// Состояние, с которым работают кнопки «Сохранить»/«Переименовать»/«Удалить».
// Отчёт открывается в дефолтном виде, поэтому «первый попавшийся» снимок сам
// не подхватывается. Если список состояний уже есть, но ни одно не выбрано,
// «Переименовать»/«Удалить» работают с последним сохранённым (диалоги
// показывают его имя, так что действие не выглядит «слепым»).
const actionMode = computed<SavedModeView | null>(() => {
  const mode = activeMode.value;
  if (!mode) return null;
  const views = modeViews(viewState.value, mode.type);
  return pickedView(viewState.value, mode.type) ?? views[views.length - 1] ?? null;
});

// Пока у вида нет ни одного сохранённого состояния, доступна только «Создать»:
// «Сохранить», «Переименовать» и «Удалить» заблокированы.
const hasModeViews = computed(() => {
  const mode = activeMode.value;
  return !!mode && modeViews(viewState.value, mode.type).length > 0;
});

const viewActionsDisabled = computed(() => controlsDisabled.value || !hasModeViews.value);

// ─── Виды просмотра: группа кнопок с состояниями ────────────────────────────
// Каждая кнопка переключает вид просмотра. Стрелка справа открывает меню с
// сохранёнными состояниями именно этого вида: клик по состоянию переключает
// вид и восстанавливает снимок (конфигурацию виджета, настройки и фильтры).

// Иконки видов просмотра (глифы MSI).
const MODE_ICONS: Record<ModeType, string> = {
  pivot: 'hierarchy',
  grid: 'smalliconslayout',
  dashboard: 'chart',
  map: 'map',
};

function modeIcon(type: ModeType): string {
  return MODE_ICONS[type] ?? 'chart';
}

// Акцентная заливка активного вида — только когда данные уже получены:
// при первом открытии все кнопки заблокированы и ничего не должно «гореть».
function modeItemClass(index: number): string {
  const active = index === modeIndex.value && dataLoaded.value;
  return active ? 'report-modes__item is-active' : 'report-modes__item';
}

// Подпись кнопки вида: пока состояние не выбрано — название вида («СВОД»),
// после выбора/создания — имя состояния («СВОД [1]»).
function modeButtonText(mode: ModeTab): string {
  const current = pickedView(viewState.value, mode.type);
  return current ? current.name : mode.title;
}

interface ModeMenuItem {
  text: string;
  saved: boolean;
  id?: string;
  icon?: string;
  hint?: string;
  disabled?: boolean;
}

// Время создания состояния для подсказки (hint) в меню и на кнопке.
function savedAtLabel(timestamp: number | undefined): string {
  if (!timestamp) return 'время не сохранено';
  return new Date(timestamp).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const DEFAULT_VIEW_HINT = 'Состояние отчёта по умолчанию: раскладка и фильтры из конфигурации';

// Пункты меню вида: первым — состояние отчёта по умолчанию («СВОД»), затем
// сохранённые состояния «СВОД [1]», «СВОД [2]». Выбранное отмечено галочкой.
function modeMenuItems(type: ModeType): ModeMenuItem[] {
  const mode = modes.value.find((item) => item.type === type);
  const views = modeViews(viewState.value, type);
  const current = pickedView(viewState.value, type);
  const items: ModeMenuItem[] = [{
    text: mode?.title ?? '',
    saved: false,
    hint: DEFAULT_VIEW_HINT,
    icon: current ? undefined : 'check',
  }];
  for (const view of views) {
    items.push({
      text: view.name,
      id: view.id,
      saved: true,
      hint: `Создано: ${savedAtLabel(view.savedAt)}`,
      icon: current?.id === view.id ? 'check' : undefined,
    });
  }
  return items;
}

function modeHint(type: ModeType): string {
  const views = modeViews(viewState.value, type);
  const current = pickedView(viewState.value, type);
  const parts: string[] = [];
  if (current) {
    parts.push(`Состояние «${current.name}»`, `создано ${savedAtLabel(current.savedAt)}`);
  } else {
    parts.push('Состояние отчёта по умолчанию');
  }
  parts.push(views.length ? `сохранённых состояний: ${views.length}` : 'сохранённых состояний нет');
  return parts.join(' · ');
}

function onModeMenuItemClick(type: ModeType, e: { itemData?: ModeMenuItem }) {
  const item = e?.itemData;
  if (!item || item.disabled) return;
  if (!item.saved) {
    // Пункт «СВОД» — состояние отчёта по умолчанию (как клик по кнопке вида).
    const mode = modes.value.find((candidate) => candidate.type === type);
    if (mode) resetModeView(mode);
    return;
  }
  applySavedView(type, item.id);
}

function selectMode(index: number) {
  if (index < 0) return;
  const mode = modes.value[index];
  if (!mode) return;
  // Клик по кнопке уже открытого вида возвращает его к состоянию отчёта:
  // так пользователь выходит из сохранённого состояния, не удаляя его.
  if (index === modeIndex.value) {
    resetModeView(mode);
    return;
  }
  modeIndex.value = index;
}

// Возврат вида к конфигурации отчёта: снимаем выбор снимка, возвращаем фильтры
// из конфигурации и пересоздаём виджет с чистым источником данных.
function resetModeView(mode: ModeTab) {
  const state = viewState.value;
  if (!state?.selected?.[mode.type]) return;
  const selected = { ...state.selected };
  delete selected[mode.type];
  const next: ReportViewState = { ...state, selected, updatedAt: Date.now() };
  viewState.value = next;
  if (key.value) saveReportView(key.value, next);

  applyGeneration += 1;
  appliedWidgetStamp = '';
  appliedWidgetInstance = null;
  appliedWidgetSource = null;
  if (mode.type === 'dashboard') {
    chartType.value = 'bar';
    chartPalette.value = 'material';
    pivotCollapsed.value = false;
  } else if (mode.type === 'map') {
    mapZoomOverride.value = null;
    mapCenterOverride.value = null;
  }
  viewInstanceKey.value += 1;
  // Возврат к виду по умолчанию меняет только раскладку. Значения фильтров
  // живут отдельно (localStorage по ключу отчёта) и не сбрасываются, набор
  // данных тоже остаётся прежним — перезапроса нет.
  notify(`Вид «${mode.title}» возвращён к состоянию отчёта`, 'success', 2200);
}

const renameVisible = ref(false);
const renameValue = ref('');
const confirmDelete = ref(false);

// ─── Правая панель фильтров (границы данных) ────────────────────────────────

const PANEL_PREF_KEY = 'gr.reportFiltersPanel';
const filtersOpen = ref(true);
const filtersPinned = ref(true);

function readPanelPref() {
  try {
    const raw = localStorage.getItem(PANEL_PREF_KEY);
    if (raw === 'closed') {
      filtersOpen.value = false;
      filtersPinned.value = false;
    } else if (raw === 'open') {
      filtersOpen.value = true;
      filtersPinned.value = false;
    } else if (raw === 'pinned') {
      filtersOpen.value = true;
      filtersPinned.value = true;
    }
  } catch {
    /* localStorage недоступен — остаются значения по умолчанию */
  }
}

function persistPanelPref() {
  try {
    const value = !filtersOpen.value ? 'closed' : (filtersPinned.value ? 'pinned' : 'open');
    localStorage.setItem(PANEL_PREF_KEY, value);
  } catch {
    /* см. выше */
  }
}

function toggleFilters() {
  if (filtersOpen.value) {
    filtersOpen.value = false;
    return;
  }
  // Панель всегда открывается закреплённой (как «Закрепить» в её шапке):
  // она отодвигает отчёт, а не перекрывает его подложкой.
  filtersPinned.value = true;
  filtersOpen.value = true;
}

function togglePin() {
  filtersPinned.value = !filtersPinned.value;
  if (filtersPinned.value) filtersOpen.value = true;
}

// ── Ресайз правой панели («шторка» за левым краем) ──────────────────────────

const PANEL_WIDTH_KEY = 'gr.reportFiltersWidth';
const DEFAULT_PANEL_WIDTH = 384;
const MIN_PANEL_WIDTH = 280;
const MAX_PANEL_WIDTH = 760;

function readPanelWidth(): number {
  try {
    const raw = Number(localStorage.getItem(PANEL_WIDTH_KEY));
    if (Number.isFinite(raw) && raw >= MIN_PANEL_WIDTH && raw <= MAX_PANEL_WIDTH) {
      return raw;
    }
  } catch {
    /* localStorage недоступен — берём значение по умолчанию */
  }
  return DEFAULT_PANEL_WIDTH;
}

const filtersWidth = ref(readPanelWidth());
const filtersResizing = ref(false);

function persistPanelWidth(): void {
  try {
    localStorage.setItem(PANEL_WIDTH_KEY, String(Math.round(filtersWidth.value)));
  } catch {
    /* localStorage недоступен — ширина не сохранится */
  }
}

/** Тянем шторку: панель прижата к правому краю, поэтому курсор левее — шире. */
function startFiltersResize(event: PointerEvent): void {
  event.preventDefault();

  const startX = event.clientX;
  const startWidth = filtersWidth.value;
  let refreshTimer = 0;

  const onMove = (e: PointerEvent) => {
    const next = startWidth - (e.clientX - startX);
    filtersWidth.value = Math.min(MAX_PANEL_WIDTH, Math.max(MIN_PANEL_WIDTH, Math.round(next)));

    // Ширина области отчёта меняется на ходу — своду нужно обновить размеры.
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(refreshViewDimensions, 120);
  };

  const onUp = () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.clearTimeout(refreshTimer);
    filtersResizing.value = false;
    document.body.classList.remove('is-resizing-filters');
    persistPanelWidth();
    refreshViewDimensions();
  };

  filtersResizing.value = true;
  document.body.classList.add('is-resizing-filters');
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
}

// Панель меняет ширину области отчёта — своду нужно пересчитать размеры
// (DevExtreme сам реагирует только на resize окна).
function refreshViewDimensions() {
  window.setTimeout(() => {
    pivotRef.value?.instance?.updateDimensions?.();
    pivotChartRef.value?.instance?.updateDimensions?.();
  }, 260);
}

watch([filtersOpen, filtersPinned], () => {
  persistPanelPref();
  refreshViewDimensions();
});

// Положение панели запоминаем между визитами: по умолчанию она закреплена.
readPanelPref();

// Фильтры самого отчёта — ровно то, что объявлено в его config.filters.
const reportFilters = computed(() => fields.value);

// Строки как объекты: { columnName: value } — формат для grid и pivot.
const rowObjects = computed<Record<string, unknown>[]>(() => rows.value.map((row) => {
  const obj: Record<string, unknown> = {};
  columns.value.forEach((col, i) => { obj[col] = row[i]; });
  return obj;
}));

const gridColumns = computed(() => (
  activeMode.value ? toPlainDeep(gridColumnsFor(config.value, activeMode.value, columns.value)) : []
));

const pivotFields = computed(() => (
  activeMode.value ? toPlainDeep(pivotFieldsFor(config.value, activeMode.value)) : []
));

// DevExtreme PivotGrid ожидает поля внутри dataSource: { store, fields }.
const pivotDataSource = computed(() => ({
  store: rowObjects.value,
  fields: pivotFields.value,
}));

// ─── ИНФОГРАФИКА (dashboard) ─────────────────────────────────────────────────
// Как в MSI: снизу сводная таблица, сверху — график, привязанный к её
// источнику данных (pivotGrid.bindChart), с выбором типа графика и палитры;
// свод можно свернуть и оставить график во всю высоту.

type ChartInstance = {
  option: (name: string, value?: unknown) => unknown,
};
type PivotHostInstance = PivotComponentLike & {
  bindChart: (chart: unknown, options?: Record<string, unknown>) => void,
};
type GridInstanceLike = {
  state?: (state?: unknown) => unknown,
  option?: (name: string, value?: unknown) => unknown,
  showColumnChooser?: () => void,
};

const CHART_TYPES = [
  { name: 'Столбчатый', type: 'bar' },
  { name: 'Линейный', type: 'line' },
  { name: 'Область', type: 'area' },
  { name: 'Столбчатый с накоплением', type: 'stackedBar' },
  { name: 'Столбчатый в 100%', type: 'fullStackedBar' },
];

const CHART_PALETTES = [
  { name: 'Корпоратив', value: 'material' },
  { name: 'Финансы', value: 'violet' },
  { name: 'Лето', value: 'soft' },
  { name: 'Гармония', value: 'harmony light' },
];

const chartRef = ref<{ instance: ChartInstance | null } | null>(null);
const pivotChartRef = ref<{ instance: PivotHostInstance | null } | null>(null);
const gridRef = ref<{ instance: GridInstanceLike | null } | null>(null);
const pivotRef = ref<{ instance: PivotHostInstance | null } | null>(null);
const chartType = ref('bar');
const chartPalette = ref('material');
const pivotCollapsed = ref(false);

const chartTooltip = {
  enabled: true,
  customizeTooltip: (args: { seriesName?: string; originalValue?: unknown }) => {
    const value = args.originalValue;
    const text = typeof value === 'number'
      ? `${value.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} руб.`
      : String(value ?? '');
    return { html: `${args.seriesName || ''}<br/><div>${text}</div>` };
  },
};

// Экземпляры виджетов появляются после монтирования и пересоздаются при
// переключении вкладок, поэтому привязку пробуем несколько раз.
let bindChartTimer: number | undefined;

// Высоты в пикселях: DevExtreme-график не разворачивается по flex-контейнеру
// (остаётся дефолтные 400 px), поэтому считаем их сами, как для других видов.
const dashboardHeight = computed(() => Math.max(300, viewHeight.value - 56));
const halfHeight = computed(() => Math.round((dashboardHeight.value - 8) / 2));
const chartHeight = computed(() => (pivotCollapsed.value ? dashboardHeight.value : halfHeight.value));
const pivotChartHeight = computed(() => halfHeight.value);

async function bindChart(attempt = 0) {
  if (activeMode.value?.type !== 'dashboard') return;
  await nextTick();
  const pivot = pivotChartRef.value?.instance;
  const chart = chartRef.value?.instance;
  if (pivot && chart) {
    try {
      pivot.bindChart(chart, { dataFieldsDisplayMode: 'singleAxis', alternateDataFields: true });
    } catch (err) {
      console.warn('[report] не удалось привязать график к своду', err);
    }
    return;
  }
  if (attempt < 30) {
    window.clearTimeout(bindChartTimer);
    bindChartTimer = window.setTimeout(() => { void bindChart(attempt + 1); }, 100);
  }
}

watch([activeMode, pivotDataSource], () => { void bindChart(); });

// Верхняя панель и панель фильтров меняют высоту области просмотра.
// После таких изменений пересчитываем высоту вида.
watch([viewState, modes, filtersOpen, filtersPinned], () => { void nextTick(measureViewHeight); });

onBeforeUnmount(() => {
  window.clearTimeout(bindChartTimer);
  viewsObserver?.disconnect();
  viewsObserver = null;
});

// ─── СВОД: контекстное меню и детализация (как в MSI PivotGridRenderer) ─────

type PivotDataSourceLike = {
  field: (index: number, options: Record<string, unknown>) => void,
  load: () => unknown,
  createDrillDownDataSource: (cell: unknown) => unknown,
  getAreaFields?: (area: string) => PivotAreaFieldLike[],
  state?: (state?: unknown, force?: boolean) => unknown,
};
type PivotAreaFieldLike = {
  dataField?: string,
  caption?: string,
  groupName?: string,
  groupIndex?: number,
  dataType?: string,
};
type DrillCellLike = {
  rowPath?: unknown[],
  columnPath?: unknown[],
  dataIndex?: number,
};
type PivotComponentLike = {
  option: (name: string, value?: unknown) => unknown,
  getDataSource: () => PivotDataSourceLike,
  updateDimensions: () => void,
  showFieldChooser?: () => void,
  getFieldChooserPopup?: () => { show?: () => void } | null,
};
type PivotFieldLike = {
  index?: number,
  dataType?: string,
  summaryType?: string,
  caption?: string,
  dataField?: string,
};
type ContextItem = Record<string, unknown>;
type PivotContextArgs = {
  items?: ContextItem[],
  field?: PivotFieldLike,
  component: PivotComponentLike,
};
type GridContextArgs = {
  items?: ContextItem[],
  component: { option: (name: string, value?: unknown) => unknown },
};

// DevExtreme иногда неверно считает размеры свода внутри flex-контейнера,
// после догрузки данных пересчитываем их (в MSI то же самое в onContentReady).
function pivotContentReady(e: { component: PivotComponentLike }) {
  window.setTimeout(() => e.component.updateDimensions(), 0);
  applySavedWidget('pivot', e.component);
}

function dashboardPivotReady(e: { component: PivotComponentLike }) {
  window.setTimeout(() => e.component.updateDimensions(), 0);
  applySavedWidget('dashboard', e.component);
}

function onGridContentReady(e: { component?: unknown }) {
  applySavedWidget('grid', e?.component ?? gridRef.value?.instance);
}

// ─── Снимок виджета: сохранить/восстановить раскладку режима ────────────────
// DataGrid отдаёт своё состояние через state(); у PivotGrid состояние живёт в
// источнике данных (getDataSource().state()), туда же его и возвращаем.

function captureWidgetState(type: ModeType): SavedWidgetState | null {
  if (type === 'grid') {
    const instance = gridRef.value?.instance;
    if (!instance || typeof instance.state !== 'function') return null;
    try {
      return { kind: 'dataGrid', value: instance.state() };
    } catch {
      return null;
    }
  }
  if (type === 'pivot' || type === 'dashboard') {
    const instance = type === 'pivot' ? pivotRef.value?.instance : pivotChartRef.value?.instance;
    const source = instance?.getDataSource?.();
    if (!source || typeof source.state !== 'function') return null;
    try {
      return { kind: 'pivot', value: source.state() };
    } catch {
      return null;
    }
  }
  return null;
}

function applyWidgetState(type: ModeType, instance: unknown, saved: SavedWidgetState): boolean {
  if (saved.kind === 'dataGrid') {
    const widget = instance as GridInstanceLike | null;
    if (!widget || typeof widget.state !== 'function') return false;
    try {
      widget.state(saved.value);
      return true;
    } catch {
      return false;
    }
  }
  if (type === 'grid') return false;
  const source = (instance as PivotHostInstance | null)?.getDataSource?.();
  if (!source || typeof source.state !== 'function') return false;
  // Поля снимка могли быть сохранены на другом наборе колонок: неизвестное
  // поле оставляет свод без данных. Отбрасываем такие поля, а если не осталось
  // ни одного поля данных — не применяем снимок вовсе.
  const safe = sanitizePivotState(saved.value, columns.value);
  if (!safe) return false;
  try {
    source.state(safe, true);
    return true;
  } catch {
    return false;
  }
}

/** Оставляет в снимке свода только поля, которые есть в текущем наборе колонок. */
function sanitizePivotState(state: unknown, cols: string[]): unknown | null {
  const source = state as { fields?: unknown } | null;
  if (!source || !Array.isArray(source.fields)) return state;
  const known = new Set(cols.map((col) => String(col)));
  const fields = (source.fields as Record<string, unknown>[]).filter((field) => {
    const name = String(field?.dataField ?? '');
    return known.has(name) || name.startsWith('__gi_');
  });
  if (!fields.length) return null;
  if (!fields.some((field) => field.area === 'data')) return null;
  return { ...(source as Record<string, unknown>), fields };
}

// Снимок применяем один раз на конкретный экземпляр виджета и его источник
// данных: content-ready приходит и после смены фильтров, и повторное
// применение откатывало бы правки, сделанные вручную. Но при переходе между
// видами DevExtreme создаёт новый экземпляр (а при обновлении данных —
// новый источник), и снимок нужно вернуть заново, иначе выбранное состояние
// «теряется»: свод после ТАБЛИЦЫ показывает дефолтную раскладку.
let applyGeneration = 0;
let appliedWidgetStamp = '';
let appliedWidgetInstance: unknown = null;
let appliedWidgetSource: unknown = null;

function applySavedWidget(type: ModeType, instance: unknown) {
  const saved = pickedView(viewState.value, type)?.widget;
  if (!saved || !instance) return;
  // У свода состояние живёт в источнике данных: он может пересоздаться
  // (например, при обновлении store), хотя сам виджет остался прежним.
  const source = type === 'grid'
    ? null
    : (instance as PivotHostInstance)?.getDataSource?.() ?? null;
  const stamp = `${applyGeneration}|${modeIndex.value}|${type}`;
  if (
    appliedWidgetStamp === stamp
    && appliedWidgetInstance === instance
    && appliedWidgetSource === source
  ) return;
  if (applyWidgetState(type, instance, saved)) {
    appliedWidgetStamp = stamp;
    appliedWidgetInstance = instance;
    appliedWidgetSource = source;
    // После применения состояния виджет нужно перечитать: без reload он
    // остаётся с прежней отрисовкой (после смены вида — с дефолтной).
    const ds = (instance as { getDataSource?: () => { reload?: () => void } } | null)
      ?.getDataSource?.();
    if (ds && typeof ds.reload === 'function') ds.reload();
    return true;
  }
  return false;
}

function itemText(item: ContextItem): string {
  return String(item.text ?? '').toLowerCase();
}

function itemName(item: ContextItem): string {
  return String(item.name ?? '').toLowerCase();
}

// Пункт меню для вкл/выкл области панели полей («Поля колонок», «Поля строк»…).
function fieldPanelItem(
  label: string,
  icon: string,
  optionKey: string,
  e: PivotContextArgs,
): ContextItem {
  const panel = asRecord(e.component.option('fieldPanel'));
  const enabled = panel[optionKey] !== false;
  return {
    text: enabled ? `${label} ✓` : label,
    icon,
    onItemClick: () => {
      const current = asRecord(e.component.option('fieldPanel'));
      const next = current[optionKey] === false;
      e.component.option(`fieldPanel.${optionKey}`, next);
      void e.component.getDataSource().load();
      notify(`${label}: ${next ? 'показаны' : 'скрыты'}`, 'success', 1500);
    },
  };
}

function pivotContextMenu(e: PivotContextArgs) {
  const items = e.items ?? [];
  const sortItems: ContextItem[] = [];
  const otherItems: ContextItem[] = [];

  for (const item of items) {
    const text = itemText(item);
    const name = itemName(item);
    if (text === 'раскрыть все' || name === 'expandall') item.icon = 'expand';
    if (text === 'свернуть все' || name === 'collapseall') item.icon = 'collapse';
    const isSort = text.includes('сортиров') || text.includes('возраст') || text.includes('убыван')
      || name.includes('sort') || name.includes('ascending') || name.includes('descending');
    (isSort ? sortItems : otherItems).push(item);
  }
  // Экспорт — самый первый пункт меню (та же иконка, что у кнопки в шапке).
  const exportItem: ContextItem = {
    text: 'Экспорт в Excel',
    icon: 'exportxlsx',
    disabled: isExporting.value,
    onItemClick: () => {
      void exportExcel();
    },
  };
  // DevExtreme отдаёт пункты сортировки отдельными записями — собираем подменю.
  e.items = [
    exportItem,
    ...(sortItems.length
      ? [...otherItems, { beginGroup: true, text: 'Сортировка', icon: 'sort', items: sortItems }]
      : otherItems),
  ];

  // Тип значения для числового поля: Сумма / Среднее / Минимум / Максимум.
  const field = e.field;
  if (field && field.dataType === 'number' && typeof field.index === 'number') {
    const index = field.index;
    const types = [
      { text: 'Сумма', value: 'sum' },
      { text: 'Среднее', value: 'avg' },
      { text: 'Минимум', value: 'min' },
      { text: 'Максимум', value: 'max' },
    ];
    e.items.push({
      beginGroup: true,
      text: 'Тип значения',
      items: types.map((type) => ({
        text: field.summaryType === type.value ? `${type.text} ✓` : type.text,
        value: type.value,
        onItemClick: () => {
          e.component.getDataSource().field(index, { summaryType: type.value });
          void e.component.getDataSource().load();
          notify(`Тип значения: ${type.text.toLowerCase()}`, 'success', 1500);
        },
      })),
    });
  }

  e.items.push(
    fieldPanelItem('Поля колонок', 'columnfield', 'showColumnFields', e),
    fieldPanelItem('Поля строк', 'rowfield', 'showRowFields', e),
    fieldPanelItem('Поля фильтров', 'filter', 'showFilterFields', e),
    fieldPanelItem('Поля данных', 'datafield', 'showDataFields', e),
  );

  // Итоги — одним подменю: промежуточные (по строкам/колонкам) и общие
  // (Grand Total). Отметка ✓ показывает текущее состояние.
  const totals = [
    { text: 'По строкам', option: 'showRowTotals', icon: 'rowproperties' },
    { text: 'По колонкам', option: 'showColumnTotals', icon: 'columnproperties' },
    { text: 'Всего по строкам', option: 'showRowGrandTotals', icon: 'rowproperties' },
    { text: 'Всего по колонкам', option: 'showColumnGrandTotals', icon: 'columnproperties' },
  ];
  e.items.push({
    beginGroup: true,
    text: 'Итоги',
    icon: 'tableproperties',
    items: totals.map((total) => {
      const enabled = Boolean(e.component.option(total.option));
      return {
        text: enabled ? `${total.text} ✓` : total.text,
        icon: total.icon,
        onItemClick: () => {
          const next = !Boolean(e.component.option(total.option));
          e.component.option(total.option, next);
          notify(`${total.text}: ${next ? 'включены' : 'отключены'}`, 'success', 1500);
        },
      };
    }),
  });
}

// ─── Детализация свода: клик по ячейке данных показывает строки, из которых
// она собрана (в MSI это попап с гридом детализации).

const drillVisible = ref(false);
// Попап детализации пересоздаётся на каждый клик: содержимое попапа рендерится
// один раз, поэтому без нового key грид продолжал бы показывать строки
// предыдущей ячейки (заголовок менялся, а данные — нет).
const drillKey = ref(0);
const drillTitle = ref('');
// 1200×660 как в MSI, но не шире/выше окна браузера: на 1050 px попап
// уезжал за левый край экрана.
const drillWidth = ref(1200);
const drillHeight = ref(660);
const drillGridRef = ref<{ instance: { updateDimensions: () => void } | null } | null>(null);
// Плоские (не proxy) объекты: DevExtreme ломается на Vue-прокси в опциях,
// поэтому колонки детализации держим в shallowRef и строим через toPlainDeep.
const drillColumns = shallowRef<Record<string, unknown>[]>([]);
// DataSource детализации отдаём в грид как есть, ленивая подгрузка строк
// сохраняется; в reactive-обёртке DevExtreme ломается на прокси-объектах,
// поэтому shallowRef.
const drillDataSource = shallowRef<unknown>(null);

function drillDownColumns(): Record<string, unknown>[] {
  const gridMode = modes.value.find((m) => m.type === 'grid');
  const configured = gridMode
    ? toPlainDeep(gridColumnsFor(config.value, gridMode, columns.value))
    : [];
  const source = configured.length
    ? configured
    : columns.value.map((col) => ({ dataField: col, caption: col }));

  return (source as Record<string, unknown>[]).map((col) => {
    const nested = Array.isArray(col.columns) ? col.columns as Record<string, unknown>[] : [];
    if (nested.length) {
      return {
        caption: col.caption || col.dataField,
        columns: nested.map((sub) => ({
          dataField: sub.dataField,
          caption: sub.caption || sub.dataField,
          dataType: sub.dataType || 'string',
          format: sub.format,
          visible: sub.visible !== false,
          width: sub.width,
        })),
      };
    }
    return {
      dataField: col.dataField,
      caption: col.caption || col.dataField,
      dataType: col.dataType || 'string',
      format: col.format,
      visible: col.visible !== false,
      width: col.width,
    };
  });
}

// ─── Детализация: в попапе только строки кликнувшей ячейки ───────────────────

// Строки для попапа собирает штатный механизм DevExtreme
// (createDrillDownDataSource по cell) — свой фильтр по путям не строим.

function drillPathName(path: unknown[]): string {
  const value = path.length ? path[path.length - 1] : undefined;
  if (value === null || value === undefined || value === '') return 'Итого';
  return String(value);
}

function pivotCellClick(e: {
  area?: string,
  cell?: DrillCellLike,
  component: PivotComponentLike,
}) {
  if (e.area !== 'data' || !e.cell) return;
  const cell = e.cell;
  const rowPath = Array.isArray(cell.rowPath) ? cell.rowPath : [];
  const columnPath = Array.isArray(cell.columnPath) ? cell.columnPath : [];

  drillTitle.value = ` ${drillPathName(rowPath)} — ${drillPathName(columnPath)} `;
  drillColumns.value = drillDownColumns();
  drillWidth.value = Math.max(480, Math.min(1200, Math.round(window.innerWidth * 0.96)));
  drillHeight.value = Math.max(360, Math.min(660, Math.round(window.innerHeight * 0.9)));
  drillDataSource.value = e.component.getDataSource().createDrillDownDataSource(cell);
  drillKey.value += 1;
  drillVisible.value = true;
}

function onDrillHidden() {
  drillVisible.value = false;
}

function onDrillResize() {
  window.setTimeout(() => drillGridRef.value?.instance?.updateDimensions(), 50);
}

// Колонки грида могут быть сгруппированы (как «Адрес» в конфигурации отчёта),
// поэтому для меню разворачиваем дерево и показываем каждый лист отдельно.
function flattenColumns(columns: Record<string, unknown>[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  for (const column of columns) {
    out.push(column);
    if (Array.isArray(column.columns)) {
      out.push(...flattenColumns(column.columns as Record<string, unknown>[]));
    }
  }
  return out;
}

function sameColumn(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  if (a.dataField && b.dataField) return a.dataField === b.dataField;
  return (a.caption || '') === (b.caption || '');
}

function mapColumns(
  columns: Record<string, unknown>[],
  fn: (column: Record<string, unknown>) => Record<string, unknown>,
): Record<string, unknown>[] {
  return columns.map((column) => {
    const next = fn(column);
    if (Array.isArray(next.columns)) {
      return { ...next, columns: mapColumns(next.columns as Record<string, unknown>[], fn) };
    }
    return next;
  });
}

function drillContextMenu(e: GridContextArgs & { row?: { rowType?: string } }) {
  // Как в MSI: меню столбцов доступно только по правому клику на строке данных.
  if (!e.row || e.row.rowType !== 'data') return;
  const items = e.items ?? [];
  const columns = () => (e.component.option('columns') as Record<string, unknown>[]) || [];
  e.items = items;
  e.items.push({
    beginGroup: true,
    text: 'Управление столбцами',
    items: flattenColumns(columns()).map((column) => ({
      text: String(column.caption || column.dataField || ''),
      onItemClick: () => {
        e.component.option('columns', mapColumns(columns(), (col) => (
          sameColumn(col, column) ? { ...col, visible: col.visible === false } : col
        )));
      },
    })),
  });
  e.items.push({
    beginGroup: true,
    text: 'Показать все столбцы',
    onItemClick: () => {
      e.component.option('columns', mapColumns(columns(), (col) => ({ ...col, visible: true })));
      notify('Показаны все столбцы', 'success', 1500);
    },
  });
  e.items.push({
    text: 'Скрыть все столбцы',
    onItemClick: () => {
      e.component.option('columns', mapColumns(columns(), (col) => ({ ...col, visible: false })));
      notify('Столбцы скрыты', 'success', 1500);
    },
  });
}

// Положение карты: сохранённый вид важнее авто-подгонки под точки.
const mapZoomOverride = ref<number | null>(null);
const mapCenterOverride = ref<[number, number] | null>(null);

const mapZoom = computed(() => (
  mapZoomOverride.value
  ?? (activeMode.value ? mapSettingsFor(config.value, activeMode.value).zoom : 5)
));

const mapCenter = computed<[number, number] | undefined>(() => (
  mapCenterOverride.value
  ?? (activeMode.value ? mapSettingsFor(config.value, activeMode.value).center : undefined)
));

const mapAutoFit = computed(() => mapZoomOverride.value === null && mapCenterOverride.value === null);

function onMapZoom(zoom: number) {
  if (Number.isFinite(zoom)) mapZoomOverride.value = zoom;
}

function onMapCenter(center: [number, number]) {
  if (Array.isArray(center) && center.length === 2) {
    mapCenterOverride.value = [Number(center[0]), Number(center[1])];
  }
}

const mapPoints = computed<MapPoint[]>(() => {
  const mode = activeMode.value;
  if (!mode) return [];
  const settings = mapSettingsFor(config.value, mode);
  const sample = rowObjects.value[0] || {};

  const latField = settings.latField || pickField(sample, ['lat', 'latitude', 'широта'], /^(lat|latitude|широта)$/i);
  const lonField = settings.lonField || pickField(sample, ['lon', 'lng', 'longitude', 'долгота'], /^(lon|lng|longitude|долгота)$/i);
  const titleField = settings.titleField || pickField(sample, ['название', 'name', 'адрес', 'address']);
  const valueField = settings.valueField || pickField(sample, ['сумма', 'amount', 'значение', 'value']);
  const addressField = pickField(sample, ['адрес', 'address']);

  if (!latField || !lonField) return [];

  return rowObjects.value
    .map((row) => {
      const title = titleField ? String(row[titleField] ?? '') : '';
      const value = valueField ? row[valueField] : undefined;
      return {
        lat: Number(row[latField]),
        lon: Number(row[lonField]),
        title: value !== undefined && value !== null && value !== ''
          ? `${title}${title ? ' — ' : ''}${value}`
          : title,
        address: addressField ? String(row[addressField] ?? '') : undefined,
      } as MapPoint;
    })
    .filter((point) => (Number.isFinite(point.lat) && Number.isFinite(point.lon)) || point.address);
});

function pickField(sample: Record<string, unknown>, names: string[], re?: RegExp): string {
  const keys = Object.keys(sample);
  for (const name of names) {
    const found = keys.find((k) => k.toLowerCase() === name.toLowerCase());
    if (found) return found;
  }
  if (re) {
    const found = keys.find((k) => re.test(k));
    if (found) return found;
  }
  return '';
}

function openEditor() {
  router.push('/admin/reports');
}

// Кнопка «Выбор полей» (глиф columnchooser): у свода — попап выбора полей,
// у таблицы — выбор столбцов (отдельной кнопки «Настроить отчёт» больше нет).
function openFieldChooser() {
  const mode = activeMode.value;
  if (!mode) return;
  if (mode.type === 'grid') {
    const grid = gridRef.value?.instance as GridInstanceLike | null;
    if (grid?.showColumnChooser) {
      grid.showColumnChooser();
    } else {
      notify('Настройка столбцов пока недоступна', 'warning', 2000);
    }
    return;
  }
  const pivot = (mode.type === 'dashboard'
    ? pivotChartRef.value?.instance
    : pivotRef.value?.instance) as PivotComponentLike | null;
  if (pivot?.showFieldChooser) {
    pivot.showFieldChooser();
    return;
  }
  // В этой сборке DevExtreme публичный showFieldChooser недоступен,
  // но попап выбора полей можно открыть напрямую.
  if (pivot?.getFieldChooserPopup?.()?.show) {
    pivot.getFieldChooserPopup()?.show?.();
    return;
  }
  notify('Выбор полей пока недоступен', 'warning', 2000);
}

// ─── Выгрузка в Excel ────────────────────────────────────────────────────────
// Экспорт делает настоящий DevExtreme-экспортёр из загруженного MSI (он умеет
// DataGrid и PivotGrid). ExcelJS и saveAs собирают и скачивают файл; для карты
// и на случай недоступного виджета выгружаем текущие строки отчёта.

type ExcelExporterLike = {
  exportDataGrid?: (options: Record<string, unknown>) => Promise<unknown>;
  exportPivotGrid?: (options: Record<string, unknown>) => Promise<unknown>;
};

function msiExcelExporter(): ExcelExporterLike | null {
  const msi = (window as unknown as { MSI?: { excelExporter?: ExcelExporterLike } }).MSI;
  return msi?.excelExporter ?? null;
}

// ExcelJS и FileSaver нужны только по кнопке «Экспорт в EXCEL», поэтому
// подгружаем их лениво, а не тащим в начальный бандл отчёта.
async function loadExcelModules() {
  const exceljs = await import('exceljs');
  const WorkbookCtor = (exceljs.Workbook
    ?? (exceljs as unknown as { default?: typeof ExcelJS.Workbook }).default) as typeof ExcelJS.Workbook;
  const { saveAs } = await import('file-saver-es');
  return { WorkbookCtor, saveAs };
}

function excelFileName(value: string): string {
  const cleaned = value.replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned || 'Отчет';
}

function fillWorksheetFromRows(worksheet: ExcelJS.Worksheet) {
  const header = columns.value.length
    ? columns.value
    : Object.keys(rowObjects.value[0] ?? {});
  header.forEach((caption, index) => {
    const cell = worksheet.getCell(4, index + 1);
    cell.value = caption;
    cell.font = { name: 'Arial', size: 11, bold: true };
  });
  rows.value.forEach((row, rowIndex) => {
    header.forEach((_, columnIndex) => {
      const value = row[columnIndex];
      worksheet.getCell(rowIndex + 5, columnIndex + 1).value = value === undefined || value === null
        ? ''
        : value as never;
    });
  });
  worksheet.columns = header.map(() => ({ width: 18 }));
}

/**
 * Оформление листа — перенос боевого ExcelDataGridExporter: зебра, рамки,
 * medium-контур, подвал с датой, ширина колонок по содержимому.
 */
function styleExcelWorksheet(worksheet: ExcelJS.Worksheet, title: string, headerFontSize = 9) {
  styleReportWorksheet(worksheet, { title, headerFontSize });
}

async function exportExcel() {
  const mode = activeMode.value;
  if (!mode) return;
  if (!rows.value.length) {
    notify('Нет данных для выгрузки в Excel', 'warning', 2200);
    return;
  }

  const title = report.value?.title || key.value || 'Отчет';
  const totalRows = rows.value.length;

  // Правила ExportManager (боевой вариант):
  //  - свод по исходнику > 1 млн — запрет;
  //  - таблица > 1 млн — память клиента, иначе CSV-части в ZIP через 7501;
  //  - до 1 млн — клиентский Excel с боевым оформлением.
  if ((mode.type === 'pivot' || mode.type === 'dashboard') && totalRows > MAX_ROWS) {
    notify('Выгрузка невозможна: исходные данные свода превышают 1 млн строк', 'warning', 5000);
    return;
  }
  if (mode.type === 'grid' && totalRows > MAX_ROWS && !sufficientClientMemory(totalRows)) {
    notify('Недостаточно памяти браузера для выгрузки более 1 млн записей', 'warning', 7000);
    return;
  }

  isExporting.value = true;
  try {
    if (mode.type === 'grid' && totalRows > MAX_ROWS) {
      notify('Подготовка выгрузки (> 1 млн записей)...', 'info', 2500);
      await exportRowsViaServer(rowObjects.value, exportColumnsSpec(), excelFileName(title));
      notify('Выгрузка сформирована (части ZIP)', 'success', 2500);
      return;
    }

    const { WorkbookCtor, saveAs } = await loadExcelModules();
    const workbook = new WorkbookCtor();
    const worksheet = workbook.addWorksheet('Отчет');
    const exporter = msiExcelExporter();
    const options = {
      worksheet,
      topLeftCell: { row: 4, column: 1 },
      autoFilterEnabled: true,
    };

    let exported = false;
    if (mode.type === 'grid' && exporter?.exportDataGrid && gridRef.value?.instance) {
      await exporter.exportDataGrid({ ...options, component: gridRef.value.instance });
      exported = true;
    } else if ((mode.type === 'pivot' || mode.type === 'dashboard') && exporter?.exportPivotGrid) {
      const instance = mode.type === 'pivot'
        ? pivotRef.value?.instance
        : pivotChartRef.value?.instance;
      if (instance) {
        await exporter.exportPivotGrid({ ...options, component: instance });
        exported = true;
      }
    }
    if (!exported) fillWorksheetFromRows(worksheet);

    // Свод (прод): шапка крупнее, данные без подвала-даты в ячейках —
    // оформление то же, размер шрифта шапки 12.
    styleExcelWorksheet(worksheet, title, exported && mode.type !== 'grid' ? 12 : 9);
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer as ArrayBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      `${excelFileName(title)}.xlsx`,
    );
    notify('Файл Excel сформирован', 'success', 2200);
  } catch (err) {
    console.error('[report] не удалось выгрузить в Excel', err);
    notify(`Не удалось выгрузить в Excel: ${(err as Error).message}`, 'error', 3000);
  } finally {
    isExporting.value = false;
  }
}

/** Колонки для серверной выгрузки: подписи из конфигурации видов отчёта. */
function exportColumnsSpec(): ExportColumnsSpec[] {
  const captions = columns.value.length
    ? columns.value
    : Object.keys(rowObjects.value[0] ?? {});
  const fields = modeFields(activeMode.value);
  return captions.map((caption, index) => ({
    dataField: fields[index]?.dataField || caption,
    caption,
  }));
}

/** Поля активного вида: по конфигурации, порядок как в columns. */
function modeFields(mode: typeof activeMode.value): Array<{ dataField?: string }> {
  if (!mode) return [];
  const views = (report.value?.config as Record<string, unknown> | undefined)?.views;
  const viewList = Array.isArray(views) ? views as Array<Record<string, unknown>> : [];
  const view = viewList.find((v) => v.key === mode.key || v.type === mode.type) || {};
  const cols = Array.isArray(view.columns) ? view.columns as Array<{ dataField?: string }> : [];
  return cols;
}

// Применяем фильтры из снимка состояния. Возвращаем true, если значения
// изменились: тогда нужно перезапросить данные, чтобы переключился датасет.
function applyFilters(saved: Record<string, unknown> | undefined): boolean {
  if (!saved || typeof saved !== 'object') return false;
  const next = { ...filterValues.value };
  let changed = false;
  for (const field of fields.value) {
    if (!(field.field in saved)) continue;
    const value = saved[field.field];
    if (JSON.stringify(value) !== JSON.stringify(next[field.field])) {
      next[field.field] = value;
      changed = true;
    }
    // Подписи выбранных узлов дерева (ФОНД_displayText): без них при
    // повторном открытии бокс показывает ID вместо имён.
    const textKey = `${field.field}_displayText`;
    if (typeof saved[textKey] === 'string' && saved[textKey]) {
      next[textKey] = saved[textKey];
    }
  }
  if (changed) filterValues.value = next;
  return changed;
}

// Значения фильтров по умолчанию — как при открытии отчёта: из конфигурации
// плюс первая доступная база, если конкретная не задана.
function defaultFilterValues(): Record<string, unknown> {
  const next = initialFilterValues(fields.value, config.value);
  const firstDb = databases.value[0]?.id;
  if (firstDb !== undefined) {
    for (const field of DB_FIELDS) {
      const current = next[field];
      if (Array.isArray(current) && current.length === 0) next[field] = [firstDb];
    }
  }
  return next;
}

function applyDefaultFilters(): boolean {
  const next = defaultFilterValues();
  let changed = false;
  for (const field of fields.value) {
    const value = next[field.field];
    if (JSON.stringify(value) !== JSON.stringify(filterValues.value[field.field])) {
      changed = true;
      break;
    }
  }
  if (changed) filterValues.value = next;
  return changed;
}

// Значения фильтров живут в localStorage по ключу отчёта (как FilterStorage
// в легаси). Состояния видов при этом пишутся в БД — это разные хранилища.
function persistFilters(): void {
  if (key.value) filterStorage(key.value).save(toPlainDeep(filterValues.value) as Record<string, unknown>);
}

watch(filterValues, () => {
  persistFilters();
}, { deep: true });

// Открываем вид просмотра и применяем выбранный снимок, даже если этот вид
// уже открыт (тогда content-ready не сработает). Вместе со снимком виджета
// восстанавливаются фильтры состояния — датасет переключается.
function applySavedView(type: ModeType, id?: string) {
  const index = modes.value.findIndex((mode) => mode.type === type);
  if (index < 0) return;
  const state = viewState.value;
  const view = state && id
    ? modeViews(state, type).find((item) => item.id === id)
    : undefined;
  if (!state || !view) return;

  const next: ReportViewState = {
    ...state,
    selected: { ...(state.selected ?? {}), [type]: id },
    updatedAt: Date.now(),
  };
  viewState.value = next;
  if (key.value) saveReportView(key.value, next);

  // Значения фильтров живут отдельно (localStorage по ключу отчёта) и при
  // переключении варианта не меняются: иначе сохранённый вариант с числами
  // вместо ISO-дат обнуляет панель. Вариант задаёт только отображение.

  modeIndex.value = index;
  appliedWidgetStamp = '';
  appliedWidgetInstance = null;
  appliedWidgetSource = null;
  void nextTick(() => {
    const mode = activeMode.value;
    if (!mode) return;
    applySavedUi(mode);
    const instance = mode.type === 'grid'
      ? gridRef.value?.instance
      : mode.type === 'pivot'
        ? pivotRef.value?.instance
        : mode.type === 'dashboard'
          ? pivotChartRef.value?.instance
          : null;
    if (instance) applySavedWidget(mode.type, instance);
  });
  // Набор данных не перезапрашивается: смена варианта — это сортировка,
  // порядок и набор полей поверх уже полученных строк.
}

// ─── Создать новое / Сохранить / Переименовать / Удалить состояние ──────────

function captureUiState(type: ModeType): Record<string, unknown> {
  if (type === 'dashboard') {
    return {
      chartType: chartType.value,
      chartPalette: chartPalette.value,
      pivotCollapsed: pivotCollapsed.value,
    };
  }
  if (type === 'map') {
    return {
      zoom: mapZoom.value,
      center: mapCenter.value ? [mapCenter.value[0], mapCenter.value[1]] : null,
    };
  }
  return {};
}

// Имя нового состояния: «СВОД [1]», «СВОД [2]», … — номер всегда следующий
// за максимальным уже занятым.
function newViewName(mode: ModeTab, state: ReportViewState | null): string {
  const base = defaultViewName(mode.title);
  const views = modeViews(state, mode.type);
  const used = new Set(views.map((view) => view.name));
  const pattern = new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\[(\\d+)\\]$`);
  let next = 1;
  for (const view of views) {
    const match = pattern.exec(view.name);
    if (match) next = Math.max(next, Number(match[1]) + 1);
  }
  while (used.has(`${base} [${next}]`)) next += 1;
  return `${base} [${next}]`;
}

// Снимок текущего отображения (виджет + настройки страницы) и фильтров.
function snapshotState(mode: ModeTab, state: ReportViewState | null, views: SavedModeView[], viewId: string): ReportViewState {
  return {
    version: 1,
    filters: toPlainDeep(filterValues.value) as Record<string, unknown>,
    activeMode: mode.type,
    modes: { ...(state?.modes ?? {}), [mode.type]: views },
    selected: { ...(state?.selected ?? {}), [mode.type]: viewId },
    updatedAt: Date.now(),
  };
}

// «Создать новое» — добавляет ещё одно состояние вида, не трогая остальные.
function createModeView() {
  const mode = activeMode.value;
  if (!key.value || !mode) return;
  const state = viewState.value;
  const view: SavedModeView = {
    id: newSavedViewId(),
    name: newViewName(mode, state),
    widget: captureWidgetState(mode.type),
    ui: captureUiState(mode.type),
    filters: toPlainDeep(filterValues.value) as Record<string, unknown>,
    savedAt: Date.now(),
  };
  const next = snapshotState(mode, state, [...modeViews(state, mode.type), view], view.id);
  viewState.value = next;
  saveReportView(key.value, next);
  notify(`Создано новое состояние вида «${mode.title}»: «${view.name}»`, 'success', 2400);
}

// «Сохранить» — перезаписывает выбранное состояние вида (или создаёт первое).
function saveModeView() {
  const mode = activeMode.value;
  if (!key.value || !mode) return;
  const state = viewState.value;
  const current = pickedView(state, mode.type);
  const fresh = {
    widget: captureWidgetState(mode.type),
    ui: captureUiState(mode.type),
    filters: toPlainDeep(filterValues.value) as Record<string, unknown>,
    savedAt: Date.now(),
  };
  let view: SavedModeView;
  let views: SavedModeView[];
  if (current) {
    view = { ...current, ...fresh };
    views = modeViews(state, mode.type).map((item) => (item.id === current.id ? view : item));
  } else {
    view = { id: newSavedViewId(), name: newViewName(mode, state), ...fresh };
    views = [...modeViews(state, mode.type), view];
  }
  const next = snapshotState(mode, state, views, view.id);
  viewState.value = next;
  saveReportView(key.value, next);
  notify(`Состояние «${view.name}» сохранено`, 'success', 2000);
}

// Понятная подсказка, когда «Переименовать»/«Удалить» нажали без выбранного
// снимка: состояния у вида могут быть, но ни одно не выбрано.
function noSavedViewMessage(mode: ModeTab | undefined): string {
  if (!mode) return 'Сначала сохраните состояние режима';
  return modeViews(viewState.value, mode.type).length
    ? 'Сначала выберите сохранённое состояние в меню вида'
    : 'Сначала сохраните состояние режима';
}

function openRename() {
  const target = actionMode.value;
  if (!target) {
    notify(noSavedViewMessage(activeMode.value), 'warning', 2800);
    return;
  }
  renameValue.value = target.name;
  renameVisible.value = true;
}

function askDelete() {
  if (!actionMode.value) {
    notify(noSavedViewMessage(activeMode.value), 'warning', 2800);
    return;
  }
  confirmDelete.value = true;
}

function applyRename() {
  const mode = activeMode.value;
  const state = viewState.value;
  const current = actionMode.value;
  if (!mode || !state || !current || !key.value) {
    renameVisible.value = false;
    return;
  }
  const name = renameValue.value.trim() || current.name;
  const views = modeViews(state, mode.type)
    .map((view) => (view.id === current.id ? { ...view, name } : view));
  const next: ReportViewState = {
    ...state,
    modes: { ...state.modes, [mode.type]: views },
    // Переименованное состояние становится текущим — подпись кнопки вида
    // сразу показывает новое имя, даже если до этого ничего не было выбрано.
    selected: { ...(state.selected ?? {}), [mode.type]: current.id },
    updatedAt: Date.now(),
  };
  viewState.value = next;
  saveReportView(key.value, next);
  renameVisible.value = false;
  notify(`Состояние переименовано: «${name}»`, 'success', 2000);
}

function deleteModeView() {
  const mode = activeMode.value;
  const state = viewState.value;
  const current = actionMode.value;
  confirmDelete.value = false;
  if (!mode || !state || !current || !key.value) return;
  const views = modeViews(state, mode.type).filter((view) => view.id !== current.id);
  const modes = { ...state.modes };
  if (views.length) modes[mode.type] = views;
  else delete modes[mode.type];
  const selected = { ...(state.selected ?? {}) };
  if (views.length) selected[mode.type] = views[0].id;
  else delete selected[mode.type];

  // Если снимков больше нет — убираем запись целиком, чтобы фильтры
  // удалённого представления не применялись при следующем открытии.
  if (Object.keys(modes).length) {
    const next: ReportViewState = { ...state, modes, selected, updatedAt: Date.now() };
    viewState.value = next;
    saveReportView(key.value, next);
  } else {
    viewState.value = null;
    removeReportView(key.value);
  }

  // Удаление снимка должно сразу вернуть виджет к конфигурации отчёта:
  // пересоздаём виджет (сбрасываем раскладку) и заново запрашиваем данные.
  applyGeneration += 1;
  appliedWidgetStamp = '';
  appliedWidgetInstance = null;
  appliedWidgetSource = null;
  const rest = modeViews(viewState.value, mode.type);
  if (!rest.length) {
    if (mode.type === 'dashboard') {
      chartType.value = 'bar';
      chartPalette.value = 'material';
      pivotCollapsed.value = false;
    } else if (mode.type === 'map') {
      mapZoomOverride.value = null;
      mapCenterOverride.value = null;
    }
  }
  viewInstanceKey.value += 1;
  // Вместе с удалённым состоянием уходят и его фильтры: берём фильтры
  // следующего состояния либо значения по умолчанию.
  const nextView = rest[0];
  if (nextView) applyFilters(nextView.filters ?? state.filters);
  else applyDefaultFilters();
  void nextTick(() => {
    void loadData();
    if (rest.length) applySavedUi(mode);
  });
  notify(
    rest.length
      ? `Состояние «${current.name}» удалено, применено «${rest[0].name}»`
      : `Сохранённое состояние режима «${mode.title}» удалено, таблица обновлена`,
    'success',
    2200,
  );
}

// Применяем сохранённые настройки страницы при входе в режим: тип графика и
// свёрнутый свод у инфографики, зум и центр у карты.
function applySavedUi(mode: ModeTab | undefined) {
  if (!mode) return;
  const ui = pickedView(viewState.value, mode.type)?.ui;
  if (!ui) return;
  if (mode.type === 'dashboard') {
    if (typeof ui.chartType === 'string') chartType.value = ui.chartType;
    if (typeof ui.chartPalette === 'string') chartPalette.value = ui.chartPalette;
    if (typeof ui.pivotCollapsed === 'boolean') pivotCollapsed.value = ui.pivotCollapsed;
  } else if (mode.type === 'map') {
    if (typeof ui.zoom === 'number') mapZoomOverride.value = ui.zoom;
    if (Array.isArray(ui.center) && ui.center.length === 2) {
      mapCenterOverride.value = [Number(ui.center[0]), Number(ui.center[1])];
    }
  }
}

// «Сформировать отчёт»: после успешной загрузки данных сворачиваем обе панели —
// левое меню и «Контур данных», — чтобы отчёт занял всё рабочее окно.
function onApplyFilters() {
  void loadData({ collapsePanels: true });
}

// При смене вида просмотра применяются его сохранённые настройки.
watch(activeMode, (mode) => applySavedUi(mode));

// Приводит значение фильтра к скаляру: в SQL должны уходить id, а не объекты
// {id, name} из списков и не служебные *_displayText/*_displayData.
function normalizeFilterValue(value: unknown): unknown {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (Array.isArray(value)) {
    return value.map((item) => (item && typeof item === 'object' && 'id' in item
      ? (item as { id: unknown }).id
      : item));
  }
  if (value && typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    if ('start' in rec || 'end' in rec) {
      return { start: rec.start ?? '', end: rec.end ?? '' };
    }
    if ('id' in rec) return rec.id;
  }
  return value;
}

function buildPayload(): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const field of fields.value) {
    const value = normalizeFilterValue(filterValues.value[field.field]) ?? null;
    // var — контракт SQL: значения уходят под стандартными именами
    // (d/m/n_start+end, транслит списков). Без var — по имени поля.
    const names = field.var?.length ? field.var : [field.field];
    if (names.length >= 2 && value && typeof value === 'object' && !Array.isArray(value)) {
      const rec = value as Record<string, unknown>;
      payload[names[0]] = rec.start ?? '';
      payload[names[1]] = rec.end ?? '';
    } else {
      payload[names[0]] = value;
    }
  }
  // Выбор MS SQL-базы отдельным контролом не показываем: подставляем БД
  // по умолчанию текущего пользователя (единый механизм default-db).
  // Если отчёт объявил БД_ЮЛ/БД_ФЛ в config.filters, остаётся выбор
  // пользователя (поле уже в payload).
  const defaultDb = userDefaultDbId(databases.value);
  for (const field of DB_FIELDS) {
    if (field in payload) continue;
    payload[field] = defaultDb !== undefined ? [defaultDb] : null;
  }
  return payload;
}

async function loadData(options: { collapsePanels?: boolean } = {}) {
  if (!key.value) return;
  isLoading.value = true;
  dataError.value = '';
  try {
    const res = await reportsApi.getData(key.value, buildPayload());
    if (res.error) {
      dataError.value = res.error;
      // Уже загруженный набор сохраняем: ошибка обновления не должна
      // оставлять пользователя с пустым отчётом.
      if (!dataLoaded.value) {
        columns.value = [];
        rows.value = [];
      }
    } else {
      columns.value = res.columns || [];
      rows.value = res.rows || [];
      dataLoaded.value = true;
      if (options.collapsePanels) {
        // Отчёт сформирован без ошибок — убираем панель фильтров и сворачиваем
        // левое меню: обе панели больше не нужны, отчёт занимает всё место.
        filtersOpen.value = false;
        filtersPinned.value = false;
        closeSideMenu();
      }
    }
  } catch (err) {
    dataError.value = `Ошибка загрузки данных: ${(err as Error).message}`;
    columns.value = [];
    rows.value = [];
    dataLoaded.value = false;
  } finally {
    isLoading.value = false;
  }
}

async function loadReport() {
  if (!key.value) return;
  isLoading.value = true;
  dataError.value = '';
  dataLoaded.value = false;
  // При переключении отчёта в левом меню сразу убираем данные предыдущего:
  // иначе под новым заголовком остаётся старая таблица/свод.
  columns.value = [];
  rows.value = [];
  mapZoomOverride.value = null;
  mapCenterOverride.value = null;
  try {
    const [rep, toolbarConfig, dbConfig] = await Promise.all([
      reportsApi.get(key.value),
      reportsApi.getToolbar().catch((): { toolbar: ToolbarItem[]; sysrequest?: SysRequestItem[] } => ({ toolbar: [] })),
      reportsApi.getDatabases().catch(() => ({ databases: [] })),
    ]);

    report.value = rep;
    config.value = asRecord(rep.config) as ReportConfig;
    toolbar.value = (toolbarConfig.toolbar || []) as Record<string, unknown>[];
    databases.value = (dbConfig.databases || []) as FilterItem[];

    modes.value = buildModes(config.value);
    modeIndex.value = defaultModeIndex(config.value, modes.value);

    // SQL дерева фондов: из sysrequest (env.js), иначе встроенный в фронтенд.
    const sysRequests = toolbarConfig.sysrequest || [];
    const fondRequest = sysRequests.find((s) => /ФОНД/i.test(String(s.name || '')) || s.id === '0') || sysRequests[0];
    const fondSql = fondRequest?.query ? String(fondRequest.query) : undefined;

    fields.value = buildFilterFields(config.value, toolbar.value, databases.value, fondSql);
    filterValues.value = initialFilterValues(fields.value, config.value);
    // Сохранённые значения фильтров важнее значений по умолчанию.
    const storedFilters = filterStorage(key.value).load();
    if (storedFilters) {
      const merged = { ...filterValues.value };
      for (const field of fields.value) {
        if (!(field.field in storedFilters)) continue;
        const raw = storedFilters[field.field];
        // Пустые значения из localStorage не должны перекрывать дефолт отчёта
        // (иначе dynamicDefault «прошлый месяц» затирается пустым диапазоном).
        const isEmpty = raw === null || raw === undefined || raw === ''
          || (Array.isArray(raw) && raw.length === 0)
          || (typeof raw === 'object' && !Array.isArray(raw)
            && !(raw as Record<string, unknown>).start
            && !(raw as Record<string, unknown>).end
            && !(raw as Record<string, unknown>).Начало
            && !(raw as Record<string, unknown>).Окончание);
        if (!isEmpty) merged[field.field] = raw;
        // Подписи выбранных узлов дерева: иначе бокс после перезагрузки
        // показывает ID вместо имён.
        const textKey = `${field.field}_displayText`;
        if (typeof storedFilters[textKey] === 'string' && storedFilters[textKey]) {
          merged[textKey] = storedFilters[textKey];
        }
      }
      filterValues.value = merged;
    }

    // Отчёт всегда открывается в своём дефолтном виде. Сохранённые состояния
    // остаются в меню видов, но снимок применяется только после явного выбора
    // в меню (и действует до выбора другого снимка или клика по кнопке вида).
    // Фильтры при открытии — из конфигурации отчёта, а не из снимка.
    // Состояние вида и фильтров — из MS SQL; localStorage остаётся кэшем.
    try {
      await hydrateReportView(key.value);
    } catch {
      /* сервер состояния недоступен — работаем на локальном кэше */
    }
    const stored = loadReportView(key.value);
    viewState.value = stored && stored.selected
      ? { ...stored, selected: {} }
      : stored;
    applyGeneration += 1;
    appliedWidgetStamp = '';
    appliedWidgetInstance = null;
  appliedWidgetSource = null;

    // По умолчанию выбираем первую настроенную базу, если ничего не выбрано.
    const firstDb = databases.value[0]?.id;
    if (firstDb !== undefined) {
      for (const field of DB_FIELDS) {
        const current = filterValues.value[field];
        if (Array.isArray(current) && current.length === 0) {
          filterValues.value = { ...filterValues.value, [field]: [firstDb] };
        }
      }
    }

    // Отчёт открывается без запроса к MS SQL: сразу показываем панель
    // «Контур данных» (закреплённой), пользователь проверяет/задаёт фильтры и
    // сам запускает отчёт кнопкой «Сформировать отчёт».
    filtersPinned.value = true;
    filtersOpen.value = true;

    // Отчёт без объявленных фильтров: панель «Контур данных» не нужна —
    // сразу формируем результат.
    if (!fields.value.length) {
      filtersOpen.value = false;
      filtersPinned.value = false;
      void loadData();
    }
    columns.value = [];
    rows.value = [];
    dataError.value = '';
  } catch (err) {
    dataError.value = `Ошибка загрузки отчёта: ${(err as Error).message}`;
  } finally {
    isLoading.value = false;
  }
}

watch(key, loadReport);
onMounted(() => {
  if (typeof ResizeObserver !== 'undefined' && viewsRef.value) {
    viewsObserver = new ResizeObserver(measureViewHeight);
    viewsObserver.observe(viewsRef.value);
  }
  void nextTick(measureViewHeight);
  void loadReport();
});
</script>

<style scoped lang="scss">
.view-wrapper.report-page {
  position: absolute;
  inset: 0;
  padding-top: var(--content-padding);
  overflow: hidden;
  // Свой текст наследует токен темы MSI: без этого он оставался чёрным
  // в тёмной теме (наследовался цвет браузера по умолчанию).
  color: var(--base-text-color);

  .report-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    min-height: 0;
    transition: padding-right 0.22s ease;
  }

  // Пока тянем шторку — ширина области отчёта без анимации.
  .report-body.is-resizing {
    transition: none;
  }

  &.is-pinned .report-body {
    padding-right: var(--filters-panel-width, 384px);
  }
}

// Пока тянем шторку правой панели — курсор и выделение фиксированы.
:global(body.is-resizing-filters) {
  cursor: col-resize;
  user-select: none;
}

/* ── Верхняя панель (drawer): состояние вида и действия ──────────────────── */

.report-drawer {
  flex: 0 0 auto;
  padding: 0 16px;

  &__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px 14px;
    padding: 8px 0;
  }

  &__saved {
    display: flex;
    align-items: center;
    flex: 1 1 280px;
    min-width: 0;
    // Без overflow: hidden — иначе выпадающий список TagBox обрезается.
    overflow: visible;
  }

  &__actions {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    margin-left: auto;
  }

  &__divider {
    width: 1px;
    height: 22px;
    margin: 0 4px;
    background-color: var(--border-color, rgba(128, 128, 128, 0.3));
  }
}

.report-main {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.report-views {
  flex: 1;
  min-height: 0;
  padding: 8px 16px 16px;
  overflow: auto;
}

.view-host {
  width: 100%;
}

/* Детализация свода: грид занимает ровно высоту попапа, иначе он растягивает
   контент и строки уезжают за пределы окна. */
.drill-grid-wrap {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

/* ── Виды просмотра: группа кнопок с сохранёнными состояниями ─────────────── */

.report-modes {
  display: inline-flex;
  align-items: stretch;
  flex: 0 1 auto;
  min-width: 0;

  &__item {
    display: inline-flex;

    // Склеиваем кнопки в единую группу: общая рамка, без двойных границ.
    &:not(:first-child) {
      margin-left: -1px;
    }

    :deep(.dx-button) {
      border-radius: 0;
    }

    &:first-child :deep(.dx-button:first-child) {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child :deep(.dx-button:last-child) {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    // Активный вид просмотра — акцентный фон (как у кнопки «Обновить данные»).
    &.is-active :deep(.dx-button) {
      position: relative;
      z-index: 1;
      background-color: var(--dx-color-primary, #0f6cbd);
      border-color: var(--dx-color-primary, #0f6cbd);
      color: #fff;
    }

    &.is-active :deep(.dx-button .dx-icon) {
      color: #fff;
    }
  }
}

/* Пункт меню состояния: галочка выбранного и название. Время создания —
   во всплывающей подсказке (атрибут title). */
.report-state-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;

  &__check {
    flex: 0 0 16px;
    width: 16px;
    margin: 0;
    color: var(--dx-color-primary, #0f6cbd);
  }

  &__text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

/* Встроенные кнопки выбора столбцов/полей убраны из таблиц: их действия
   теперь на кнопке «Настроить отчёт» в верхней панели. */
:deep(.dx-pivotgrid-field-chooser-button),
:deep(.dx-datagrid-column-chooser-button),
:deep(.dx-datagrid .dx-toolbar) {
  display: none;
}

// ИНФОГРАФИКА: сверху график, снизу свод (как в MSI).
.view-host--dashboard {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dashboard-chart__bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dashboard-chart__label {
  font-size: 12px;
  opacity: 0.75;
}

.dashboard-chart__toggle {
  margin-left: auto;
}

.report-error {
  color: #d9534f;
  padding: 8px 16px;
  font-size: 13px;
  white-space: pre-wrap;
}

.report-empty {
  opacity: 0.75;
  padding: 24px 0;
}

/* ── Правая панель: контур данных (фильтры отчёта) ────────────────────────── */

.filters-scrim {
  position: absolute;
  inset: 0;
  z-index: 15;
  background-color: rgba(0, 0, 0, 0.08);
}

.filters-panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  display: flex;
  flex-direction: column;
  width: var(--filters-panel-width, 384px);
  max-width: 92vw;
  background-color: var(--dx-component-color-bg, #fff);
  color: var(--base-text-color);
  border-left: 1px solid var(--border-color, rgba(128, 128, 128, 0.3));
  box-shadow: -6px 0 22px rgba(0, 0, 0, 0.22);
  transform: translateX(102%);
  transition: transform 0.22s ease;
  pointer-events: none;

  &.is-open {
    transform: translateX(0);
    pointer-events: auto;
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
  }

  // Заголовок панели; управляющие кнопки — штатные dx-button MSI.
  // Шторка: узкая полоса у левого края, за неё тянем — меняем ширину.
  &__grip {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 6px;
    cursor: col-resize;
    background-color: transparent;
    transition: background-color 0.15s ease;

    &::after {
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

    &:hover,
    &:active {
      background-color: color-mix(in srgb, var(--border-color), var(--base-text-color) 25%);
    }
  }

  &__title {
    flex: 1 1 auto;
    font-size: 14px;
    font-weight: 500;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1 1 auto;
    min-height: 0;
    padding: 12px;
    overflow: auto;
  }

  &__empty {
    font-size: 13px;
    opacity: 0.7;
  }
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: rgba(128, 128, 128, 0.15);
  }

  &.is-active {
    color: #ff7200;
    border-color: currentColor;
    background-color: rgba(255, 114, 0, 0.12);
  }

  .dx-icon {
    font-size: 16px;
  }
}

/* ── Модальные окна «Переименовать» и «Удалить» ──────────────────────────── */

.modal-layer {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.28);
}

.modal-card {
  display: flex;
  flex-direction: column;
  width: 440px;
  max-width: 100%;
  max-height: 90vh;
  background-color: var(--dx-component-color-bg, #fff);
  color: inherit;
  border-radius: 6px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  &__head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
  }

  &__title {
    flex: 1 1 auto;
    font-size: 15px;
    font-weight: 500;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 12px;
    overflow: auto;
  }

  &__text {
    font-size: 13px;
    line-height: 1.45;
    opacity: 0.85;
  }

  &__foot {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 10px 12px;
    border-top: 1px solid var(--border-color, rgba(128, 128, 128, 0.25));
  }
}
</style>
