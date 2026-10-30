// «Хлебные крошки» текущей страницы — путь выбранного в левом меню пункта
// (Список отчетов / ОРН / Платежи). Строятся по уже загруженным строкам меню
// (reportMenuRows + navigationItems): без отдельного запроса к API и без
// дублирования иерархии. Обновляются реактивно — как только меню догрузилось.

import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { navigationItems, reportMenuRows, type ReportMenuRow } from '@/composables/use-navigation';
import type { SideNavigationItem } from '@/types';

export interface Breadcrumb {
  text: string;
  /** Маршрут перехода; у текущей страницы ссылки нет. */
  path?: string;
}

/**
 * Ключи в отчётах кириллические, а route.path приходит в percent-кодировке
 * (`/report/%D0%9E...`), тогда как пути строк меню — декодированные.
 * Сравниваем оба варианта.
 */
function routePaths(routePath: string): string[] {
  const paths = [routePath];
  try {
    const decoded = decodeURIComponent(routePath);
    if (decoded !== routePath) paths.push(decoded);
  } catch {
    // Некорректная последовательность — оставляем как есть.
  }
  return paths;
}

/** Цепочка статических пунктов меню до текущего маршрута. */
function staticChain(items: SideNavigationItem[], paths: string[], chain: SideNavigationItem[] = []): SideNavigationItem[] | null {
  for (const item of items) {
    const next = [...chain, item];
    if (item.path && paths.includes(item.path)) return next;
    if (item.items?.length) {
      const found = staticChain(item.items, paths, next);
      if (found) return found;
    }
  }
  return null;
}

/** Строка меню отчётов и все её родители — от корня до самого пункта. */
function reportChain(rows: ReportMenuRow[], leaf: ReportMenuRow): ReportMenuRow[] {
  const byId = new Map(rows.map((row) => [row.id, row]));
  const chain: ReportMenuRow[] = [];
  const seen = new Set<string>();
  let current: ReportMenuRow | undefined = leaf;
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    chain.unshift(current);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return chain;
}

export function useBreadcrumbs() {
  const route = useRoute();

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const paths = routePaths(route.path);

    // Отчёт или раздел отчётов: путь по иерархии меню (parentId).
    const row = reportMenuRows.value.find((item) => paths.includes(item.path));
    if (row) {
      return [
        { text: 'Список отчетов', path: '/reports' },
        ...reportChain(reportMenuRows.value, row).map((item) => ({
          text: item.text,
          path: item.path,
        })),
      ];
    }

    // Стартовая страница отчётов.
    if (paths.includes('/reports')) return [{ text: 'Список отчетов' }];

    // Отчёт открыт по прямой ссылке — меню ещё не загрузилось.
    if (route.name === 'report-view') {
      return [
        { text: 'Список отчетов', path: '/reports' },
        { text: String(route.params.key ?? '') },
      ];
    }

    // Статические разделы левого меню: Администрирование / Отчёты и фильтры.
    const chain = staticChain(navigationItems.value, paths);
    if (chain) {
      return chain.map((item) => ({
        text: item.text,
        path: item.path || undefined,
      }));
    }

    return [];
  });

  return { breadcrumbs };
}
