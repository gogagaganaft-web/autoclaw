// FilterStorage — значения фильтров панели «Контур данных».
// Хранение локальное, по ключу отчёта: как в легаси-классе FilterStorage,
// но бэкенд — localStorage браузера, а не серверный файл.
//
// Состояния видов (pivot/grid/dashboard/map) живут отдельно — в БД report,
// в таблицах user_report_state / user_report_view.

const PREFIX = 'gr.filters.';

/** Ключ localStorage для отчёта. */
export function filterStorageKey(reportKey: string): string {
  return `${PREFIX}${reportKey}`;
}

export class FilterStorage {
  readonly reportKey: string;

  constructor(reportKey: string) {
    this.reportKey = String(reportKey || '');
  }

  /** Все значения фильтров (включая *_displayText / *_displayData) или null. */
  load(): Record<string, unknown> | null {
    if (!this.reportKey) return null;
    try {
      const raw = localStorage.getItem(filterStorageKey(this.reportKey));
      if (!raw) return null;
      const parsed = JSON.parse(raw) as unknown;
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
      return parsed as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  /** Сохраняет копию значений: массивы и объекты не должны уезжать по ссылке. */
  save(filters: Record<string, unknown>): void {
    if (!this.reportKey) return;
    try {
      const copy: Record<string, unknown> = {};
      for (const [field, value] of Object.entries(filters)) {
        if (Array.isArray(value)) copy[field] = value.slice();
        else if (value && typeof value === 'object') copy[field] = JSON.parse(JSON.stringify(value));
        else copy[field] = value;
      }
      localStorage.setItem(filterStorageKey(this.reportKey), JSON.stringify(copy));
    } catch {
      /* приватный режим или переполнение — не критично */
    }
  }

  clear(): void {
    if (!this.reportKey) return;
    try {
      localStorage.removeItem(filterStorageKey(this.reportKey));
    } catch {
      /* см. выше */
    }
  }
}

export function filterStorage(reportKey: string): FilterStorage {
  return new FilterStorage(reportKey);
}
