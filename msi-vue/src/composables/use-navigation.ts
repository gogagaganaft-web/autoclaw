// Динамическое левое меню: статические разделы (app-navigation.ts) плюс
// раздел «Отчёты», который строится из иерархии таблицы reports
// (is_section + parent_id, GET /api/reports).
//
// Иерархию отчётов рисует dxTreeList (msi.js): все разделы и их отчёты.
// Статические пункты («Администрирование», «Authentication», «Common»)
// остаются в dxTreeView.

import { ref } from 'vue';
import { navigation as staticNavigation } from '@/app-navigation';
import type { SideNavigationItem } from '@/types';
import { reportsApi, Report } from '@/services/reports-api';
import { isHidden, isSection, reportChildren } from '@/utils/report-tree';
import { setActiveSection, sectionKeyForRoute } from '@/composables/use-report-sections';

/** Реактивные пункты статической части меню для side-navigation-menu.vue. */
export const navigationItems = ref<SideNavigationItem[]>([]);

/** Строка dxTreeList в меню (плоский список, дерево — по parentId). */
export interface ReportMenuRow {
  id: string;
  parentId: string | null;
  text: string;
  /** Путь пункта: раздел — `/reports/<key>`, отчёт — `/report/<key>`. */
  path: string;
  icon: string;
  kind: 'section' | 'report';
}

/** Иерархия отчётов для dxTreeList в левом меню. */
export const reportMenuRows = ref<ReportMenuRow[]>([]);

/** Последний загруженный список отчётов — для перестроения без запроса. */
let cachedReports: Report[] | null = null;

function cloneItem(item: SideNavigationItem): SideNavigationItem {
  return {
    ...item,
    items: item.items?.map(cloneItem),
  };
}

/** Вложенные строки раздела: подразделы — ветками, отчёты — листьями. */
function collectRows(reports: Report[], parentId: number | null, parentRowId: string | null, out: ReportMenuRow[]): void {
  for (const report of reportChildren(reports, parentId)) {
    if (isSection(report)) {
      const rowId = `sec:${report.id}`;
      out.push({
        id: rowId,
        parentId: parentRowId,
        text: report.title || report.key,
        path: `/reports/${report.key}`,
        icon: report.icon || 'folder',
        kind: 'section',
      });
      collectRows(reports, report.id, rowId, out);
    } else if (!isHidden(report)) {
      out.push({
        id: `rep:${report.id}`,
        parentId: parentRowId,
        text: report.title || report.key,
        path: `/report/${report.key}`,
        icon: report.icon || 'chart',
        kind: 'report',
      });
    }
  }
}

/** Полная иерархия разделов и отчётов — дерево меню, независимое от раздела. */
function buildReportRows(reports: Report[]): ReportMenuRow[] {
  const rows: ReportMenuRow[] = [];
  collectRows(reports, null, null, rows);
  return rows;
}

/** Одинаковы ли строки меню — чтобы не перерисовывать виджет на каждом переходе. */
function sameRows(left: ReportMenuRow[], right: ReportMenuRow[]): boolean {
  if (left.length !== right.length) return false;
  return left.every((row, index) => {
    const other = right[index];
    return row.id === other.id
      && row.parentId === other.parentId
      && row.text === other.text
      && row.path === other.path
      && row.icon === other.icon
      && row.kind === other.kind;
  });
}

function rebuild(): void {
  // Статические пункты неизменны: новый массив каждый раз сбрасывал бы
  // раскрытые группы dxTreeView. Пересборка нужна при смене пользователя
  // (пункты зависят от роли) — сверяем по видимости.
  const fresh = staticNavigation
    .filter((item) => {
      const nav = item as { visible?: () => boolean };
      return !nav.visible || nav.visible();
    })
    .map((item) => {
      const clone = cloneItem(item);
      if (clone.items) {
        clone.items = clone.items.filter((child) => {
          const nav = child as { visible?: () => boolean };
          return !nav.visible || nav.visible();
        });
      }
      return clone;
    });
  const freshPaths = JSON.stringify(fresh.map((i) => [i.text, i.items?.map((c) => c.text)]));
  const currentPaths = JSON.stringify(navigationItems.value.map((i) => [i.text, i.items?.map((c) => c.text)]));
  if (!navigationItems.value.length || freshPaths !== currentPaths) {
    navigationItems.value = fresh;
  }
  const rows = cachedReports ? buildReportRows(cachedReports) : [];
  // Переход по меню не должен перезагружать dataSource TreeList: это сбрасывало
  // выделение и раскрытие веток. Обновляем ссылку, только если строки изменились.
  if (!sameRows(reportMenuRows.value, rows)) {
    reportMenuRows.value = rows;
  }
}

// Смена раздела не меняет дерево: пункты меню — вся иерархия отчётов.
// (Активный раздел хранится для стартовой страницы/хлебных крошек.)

/**
 * Загружает отчёты и перестраивает меню.
 * path — текущий маршрут: по нему синхронизируется активный раздел.
 */
export async function refreshNavigation(path = ''): Promise<void> {
  try {
    const reports = await reportsApi.list();
    cachedReports = reports;
    if (path) {
      setActiveSection(sectionKeyForRoute(reports, path));
    }
    rebuild();
  } catch {
    cachedReports = null;
    rebuild();
  }
}
