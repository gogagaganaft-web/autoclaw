// Иерархия отчётов: разделы (is_section = true) и вложенные в них отчёты.
// Дерево строится на клиенте из плоского списка GET /api/reports — отдельный
// эндпоинт не нужен, отчётов немного.

import type { Report } from '@/services/reports-api';

export interface ReportNode {
  report: Report;
  children: ReportNode[];
}

export function isSection(report: Report): boolean {
  return report.is_section === true;
}

export function isHidden(report: Report): boolean {
  return report.config?.hidden === true;
}

/** Порядок внутри уровня: sort_order, затем название (по-русски), затем id. */
export function compareReports(a: Report, b: Report): number {
  const byOrder = (a.sort_order ?? 0) - (b.sort_order ?? 0);
  if (byOrder !== 0) return byOrder;
  const byTitle = a.title.localeCompare(b.title, 'ru');
  if (byTitle !== 0) return byTitle;
  return a.id - b.id;
}

/**
 * Плоский список → лес. Потомки группируются по parent_id; запись, чей родитель
 * не найден или не является разделом, попадает в корень (данные не теряются).
 */
export function buildReportTree(reports: Report[]): ReportNode[] {
  const nodes = new Map<number, ReportNode>();
  reports.forEach((report) => nodes.set(report.id, { report, children: [] }));

  const roots: ReportNode[] = [];
  reports.forEach((report) => {
    const node = nodes.get(report.id)!;
    const parent = report.parent_id != null ? nodes.get(report.parent_id) : undefined;
    if (parent && parent !== node && isSection(parent.report)) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  const sortNodes = (list: ReportNode[]) => {
    list.sort((a, b) => compareReports(a.report, b.report));
    list.forEach((node) => sortNodes(node.children));
  };
  sortNodes(roots);
  return roots;
}

/** Дети раздела (parentId = null — верхний уровень), разделы и отчёты вместе. */
export function reportChildren(reports: Report[], parentId: number | null): Report[] {
  return reports
    .filter((report) => (report.parent_id ?? null) === parentId)
    .sort(compareReports);
}

/** Раздел по ключу. */
export function sectionByKey(reports: Report[], key: string): Report | undefined {
  return reports.find((report) => report.key === key && isSection(report));
}

/** Предки записи от ближайшего родителя к корню. */
export function reportAncestors(reports: Report[], report: Report): Report[] {
  const byId = new Map(reports.map((item) => [item.id, item]));
  const chain: Report[] = [];
  const seen = new Set<number>([report.id]);
  let current = report.parent_id != null ? byId.get(report.parent_id) : undefined;
  while (current && !seen.has(current.id)) {
    chain.push(current);
    seen.add(current.id);
    current = current.parent_id != null ? byId.get(current.parent_id) : undefined;
  }
  return chain;
}

/** Верхний раздел, в котором лежит запись (для меню и хлебных крошек). */
export function topSectionOf(reports: Report[], report: Report): Report | undefined {
  const chain = reportAncestors(reports, report);
  return chain.length ? chain[chain.length - 1] : undefined;
}

/** Путь от корня до раздела включительно. */
export function sectionPath(reports: Report[], section: Report): Report[] {
  return [...reportAncestors(reports, section)].reverse().concat(section);
}

/** Все вложенные отчёты (не разделы) на любой глубине. */
export function nestedReports(reports: Report[], section: Report): Report[] {
  const result: Report[] = [];
  const walk = (parentId: number) => {
    reports
      .filter((report) => report.parent_id === parentId)
      .forEach((child) => {
        if (isSection(child)) walk(child.id);
        else result.push(child);
      });
  };
  walk(section.id);
  return result;
}

/** Обход дерева в порядке отображения (раздел, затем его содержимое). */
export function flattenTree(nodes: ReportNode[]): ReportNode[] {
  const result: ReportNode[] = [];
  const walk = (list: ReportNode[]) => {
    list.forEach((node) => {
      result.push(node);
      walk(node.children);
    });
  };
  walk(nodes);
  return result;
}
