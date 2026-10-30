// Активный раздел отчётов: выбранная на стартовой странице карточка. По нему
// строятся хлебные крошки/подсветка стартовой страницы; выбор запоминается
// между сессиями. (Левое меню показывает всю иерархию разделов и отчётов.)

import { ref } from 'vue';
import type { Report } from '@/services/reports-api';
import { isSection, reportAncestors, topSectionOf } from '@/utils/report-tree';

const STORAGE_KEY = 'gr.activeSection';

function readStored(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

/** Ключ верхнего раздела, внутри которого сейчас работает пользователь. */
export const activeSectionKey = ref<string>(readStored());

export function setActiveSection(key: string | null | undefined): void {
  const value = key || '';
  if (activeSectionKey.value === value) {
    return;
  }
  activeSectionKey.value = value;
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* localStorage может быть недоступен — не критично */
  }
}

/**
 * Определяет раздел по маршруту:
 *   /reports/<key>  — раздел (или верхний раздел вложенного раздела);
 *   /report/<key>   — верхний раздел отчёта (нет раздела — сброс).
 * Возвращает ключ верхнего раздела либо '' (стартовая страница или маршрут вне
 * отчётов).
 */
export function sectionKeyForRoute(reports: Report[], path: string): string {
  const clean = (path || '').replace(/^#/, '');
  const sectionMatch = /^\/reports\/([^/]+)/.exec(clean);
  if (sectionMatch) {
    let key = sectionMatch[1];
    try {
      key = decodeURIComponent(key);
    } catch { /* оставляем как есть */ }
    const section = reports.find((report) => report.key === key && isSection(report));
    if (!section) return '';
    return topSectionOf(reports, section)?.key || section.key;
  }

  const reportMatch = /^\/report\/([^/]+)/.exec(clean);
  if (reportMatch) {
    let key = reportMatch[1];
    try {
      key = decodeURIComponent(key);
    } catch { /* оставляем как есть */ }
    const report = reports.find((item) => item.key === key);
    if (!report) return '';
    return topSectionOf(reports, report)?.key || '';
  }

  // Стартовая страница без выбранного раздела — меню остаётся компактным.
  if (clean === '/reports' || clean === '/' || clean === '') {
    return '';
  }
  // Любая другая страница: сохраняем последний выбранный раздел.
  return activeSectionKey.value;
}

/** Раздел по ключу (только is_section). */
export function sectionByKeyOrNull(reports: Report[], key: string): Report | null {
  return reports.find((report) => report.key === key && isSection(report)) || null;
}

/** Путь от корня до раздела — для хлебных крошек стартовой страницы. */
export function pathToSection(reports: Report[], section: Report): Report[] {
  return [...reportAncestors(reports, section)].reverse().concat(section);
}
