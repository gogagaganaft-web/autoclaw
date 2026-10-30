<template>
  <div class="view-wrapper reports-home">
    <div class="reports-home__head">
      <div class="reports-home__crumbs">
        <button
          type="button"
          class="reports-home__crumb"
          @click="openRoot()"
        >
          Все разделы
        </button>
        <template
          v-for="(crumb, index) in breadcrumbs"
          :key="crumb.id"
        >
          <span class="reports-home__sep">/</span>
          <button
            type="button"
            class="reports-home__crumb"
            :class="{ 'is-current': index === breadcrumbs.length - 1 }"
            @click="openSection(crumb)"
          >
            {{ crumb.title || crumb.key }}
          </button>
        </template>
      </div>

      <div class="reports-home__title">
        {{ current ? current.title || current.key : 'Список отчетов' }}
      </div>
      <div class="reports-home__subtitle">
        {{ current
          ? 'Выберите отчёт или подраздел — они также доступны в меню слева.'
          : 'Выберите раздел или откройте отчёт из меню слева.' }}
      </div>
    </div>

    <div
      v-if="loading"
      class="reports-home__state"
    >
      Загрузка…
    </div>

    <div
      v-else-if="error"
      class="reports-home__state is-error"
    >
      <span>{{ error }}</span>
      <dx-button
        text="Повторить"
        icon="refresh"
        styling-mode="outlined"
        @click="load()"
      />
    </div>

    <div
      v-else-if="!cards.length"
      class="reports-home__state"
    >
      {{ current
        ? 'В этом разделе пока нет отчётов.'
        : 'Разделы ещё не созданы — добавьте их в разделе «Отчёты и фильтры».' }}
    </div>

    <!-- Разделы и отчёты — плитки dxTileView (msi.js) -->
    <div
      v-else
      ref="tilesHost"
      class="reports-home__tiles"
    >
      <dx-tile-view
        :items="cards"
        :base-item-width="tileWidth"
        :base-item-height="tileHeight"
        :item-margin="tileGap"
        direction="vertical"
        height="100%"
        :show-scrollbar="'onScroll'"
        @item-click="onTileClick"
      >
        <template #item="{ data }">
          <div
            class="report-card"
            :class="[
              data.kind === 'section' ? 'report-card--section' : 'report-card--report',
              `report-card--tone-${data.tone}`,
            ]"
          >
            <span class="report-card__media">
              <img
                v-if="data.imageUrl"
                :src="data.imageUrl"
                :alt="data.title"
                class="report-card__image"
              >
              <i
                v-else
                class="dx-icon report-card__icon"
                :class="`dx-icon-${data.icon}`"
              />
            </span>
            <span class="report-card__body">
              <span class="report-card__title">{{ data.title }}</span>
              <span class="report-card__meta">{{ data.meta }}</span>
            </span>
            <span class="report-card__arrow">›</span>
          </div>
        </template>
      </dx-tile-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DxButton } from 'devextreme-vue/button';
import { DxTileView } from 'devextreme-vue/tile-view';
import { reportsApi, type Report } from '@/services/reports-api';
import {
  isHidden,
  isSection,
  nestedReports,
  reportChildren,
  sectionByKey,
  topSectionOf,
} from '@/utils/report-tree';
import {
  pathToSection,
  setActiveSection,
} from '@/composables/use-report-sections';

/** Плитка стартовой страницы (раздел или отчёт). */
interface HomeCard {
  id: string;
  kind: 'section' | 'report';
  key: string;
  title: string;
  meta: string;
  icon: string;
  imageUrl: string;
  /** Индекс палитры для плитки раздела. */
  tone: number;
}

const route = useRoute();
const router = useRouter();

/** Плоский список отчётов и разделов. */
const allReports = ref<Report[]>([]);
const loading = ref(true);
const error = ref('');

const sectionKey = computed(() => {
  const raw = route.params.sectionKey;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
});

/** Раздел, содержимое которого показано (null — верхний уровень). */
const current = computed<Report | null>(() => {
  if (!sectionKey.value) return null;
  return sectionByKey(allReports.value, sectionKey.value) || null;
});

const breadcrumbs = computed<Report[]>(() =>
  current.value ? pathToSection(allReports.value, current.value) : [],
);

const parentId = computed<number | null>(() => (current.value ? current.value.id : null));

/** Подразделы текущего уровня — все, включая пока пустые (структура видна). */
const sections = computed<Report[]>(() =>
  reportChildren(allReports.value, parentId.value).filter(isSection),
);

/** Отчёты текущего уровня; скрытые (config.hidden) не показываем. */
const visibleReports = computed<Report[]>(() =>
  reportChildren(allReports.value, parentId.value).filter(
    (report) => !isSection(report) && !isHidden(report),
  ),
);

function toSectionCard(section: Report, index: number): HomeCard {
  return {
    id: `sec-${section.id}`,
    kind: 'section',
    key: section.key,
    title: section.title || section.key,
    meta: countLabel(section),
    icon: section.image && !isImageUrl(section.image) ? section.image : (section.icon || 'folder'),
    imageUrl: isImageUrl(section.image) ? (section.image as string) : '',
    tone: index % 4,
  };
}

function toReportCard(report: Report): HomeCard {
  return {
    id: `rep-${report.id}`,
    kind: 'report',
    key: report.key,
    title: report.title || report.key,
    meta: report.key,
    icon: report.icon || 'chart',
    imageUrl: '',
    tone: 0,
  };
}

const cards = computed<HomeCard[]>(() => [
  ...sections.value.map(toSectionCard),
  ...visibleReports.value.map(toReportCard),
]);

// ─── Плитки: ширина подстраивается под контейнер ─────────────────────────────

const TILE_MIN_WIDTH = 260;
const TILE_MAX_COLUMNS = 4;

const tilesHost = ref<HTMLElement | null>(null);
const tileGap = 16;
const tileHeight = 96;
const tileWidth = ref(TILE_MIN_WIDTH);
let resizeObserver: ResizeObserver | null = null;

function measureTiles(): void {
  const el = tilesHost.value;
  if (!el) return;
  const style = getComputedStyle(el);
  const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  const width = el.clientWidth - padding;
  if (width <= 0) return;
  const columns = Math.max(
    1,
    Math.min(TILE_MAX_COLUMNS, Math.floor((width + tileGap) / (TILE_MIN_WIDTH + tileGap))),
  );
  tileWidth.value = Math.max(
    TILE_MIN_WIDTH,
    Math.floor((width - tileGap * (columns - 1)) / columns),
  );
}

watch(tilesHost, (el) => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (!el) return;
  resizeObserver = new ResizeObserver(measureTiles);
  resizeObserver.observe(el);
  measureTiles();
});

onMounted(load);

onBeforeUnmount(() => resizeObserver?.disconnect());

// Прямая ссылка на несуществующий раздел — возвращаемся на стартовую.
watch([sectionKey, allReports], () => {
  if (sectionKey.value && allReports.value.length && !current.value) {
    router.replace('/reports');
  }
});

function visibleContent(section: Report): number {
  return nestedReports(allReports.value, section).filter((report) => !isHidden(report)).length;
}

function isImageUrl(image?: string | null): boolean {
  if (!image) return false;
  return (
    /^(https?:)?\/\//i.test(image)
    || image.startsWith('/')
    || image.startsWith('data:')
    || image.startsWith('assets/')
  );
}

function plural(count: number, forms: [string, string, string]): string {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
}

function countLabel(section: Report): string {
  const total = visibleContent(section);
  const subs = reportChildren(allReports.value, section.id).filter(
    (report) => isSection(report) && visibleContent(report) > 0,
  ).length;
  const parts = [total
    ? `${total} ${plural(total, ['отчёт', 'отчёта', 'отчётов'])}`
    : 'пока нет отчётов'];
  if (subs) parts.push(`${subs} ${plural(subs, ['подраздел', 'подраздела', 'подразделов'])}`);
  return parts.join(' · ');
}

async function load(): Promise<void> {
  loading.value = true;
  error.value = '';
  try {
    allReports.value = await reportsApi.list();
    if (sectionKey.value && !current.value) {
      router.replace('/reports');
    }
  } catch (e) {
    error.value = `Не удалось загрузить список отчётов: ${(e as Error).message}`;
  } finally {
    loading.value = false;
  }
}

function openRoot(): void {
  setActiveSection(null);
  router.push('/reports');
}

function openSection(section: Report): void {
  setActiveSection(topSectionOf(allReports.value, section)?.key || section.key);
  router.push(`/reports/${encodeURIComponent(section.key)}`);
}

function openReport(report: Report): void {
  setActiveSection(topSectionOf(allReports.value, report)?.key || '');
  router.push(`/report/${encodeURIComponent(report.key)}`);
}

function onTileClick(e: { itemData?: HomeCard }): void {
  const card = e.itemData;
  if (!card) return;
  if (card.kind === 'section') {
    const section = sectionByKey(allReports.value, card.key);
    if (section) openSection(section);
  } else {
    const report = allReports.value.find((item) => item.key === card.key);
    if (report) openReport(report);
  }
}
</script>

<style scoped lang="scss">
.reports-home {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.reports-home__head {
  flex: 0 0 auto;
  padding: 12px 16px 0;
}

.reports-home__crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--texteditor-label-color, #6b7280);
}

.reports-home__crumb {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &.is-current {
    color: var(--base-text-color, #202020);
    font-weight: 600;
    cursor: default;
    text-decoration: none;
  }
}

.reports-home__sep {
  opacity: 0.6;
}

.reports-home__title {
  margin-top: 6px;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.2;
}

.reports-home__subtitle {
  margin-top: 4px;
  font-size: 14px;
  opacity: 0.7;
}

.reports-home__state {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 32px 16px;
  font-size: 14px;
  opacity: 0.75;

  &.is-error {
    color: var(--dx-color-danger, #d9534f);
    opacity: 1;
  }
}

.reports-home__tiles {
  flex: 1 1 auto;
  min-height: 0;
}

/* ── Плитки dxTileView ────────────────────────────────────────────────────── */

.reports-home__tiles :deep(.dx-tile) {
  border: 1px solid var(--border-color, rgba(128, 128, 128, 0.28));
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: box-shadow 0.16s ease, border-color 0.16s ease;
}

.reports-home__tiles :deep(.dx-tile.dx-state-hover) {
  border-color: var(--dx-color-primary, #337ab7);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.reports-home__tiles :deep(.dx-tile-content) {
  height: 100%;
}

.report-card {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

.report-card__media {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  color: #fff;
  background: linear-gradient(135deg, #4a7fb5, #274b73);
}

.report-card--tone-1 .report-card__media {
  background: linear-gradient(135deg, #4fa3a3, #226b6b);
}

.report-card--tone-2 .report-card__media {
  background: linear-gradient(135deg, #b98b4a, #7a5421);
}

.report-card--tone-3 .report-card__media {
  background: linear-gradient(135deg, #8a6fbe, #533a86);
}

.report-card--report .report-card__media {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: linear-gradient(135deg, #5b9bd5, #2f6fa8);
}

.report-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.report-card__icon {
  font-size: 26px;
  color: #fff;
}

.report-card__body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex-grow: 1;
}

.report-card__title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.report-card__meta {
  font-size: 12px;
  opacity: 0.65;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.report-card__arrow {
  flex: 0 0 auto;
  font-size: 22px;
  opacity: 0.45;
}
</style>
