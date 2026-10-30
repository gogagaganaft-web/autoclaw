// Клиент API backend (Go, :7070). В контейнере nginx проксирует /api,
// в dev-режиме тот же путь настраивается proxy в vite.config.js.

// ─── ОПИСАНИЕ ОТЧЁТА (config) ─────────────────────────────────────────────────

/** Описание фильтра отчёта. Значение подставляется в SQL вместо {{name}}. */
export interface ReportFilterSpec {
  name: string;
  label?: string;
  /** string | number | date | bool | stringList | numberList */
  type?: string;
  default?: unknown;
}

export interface ReportGridColumn {
  dataField: string;
  caption?: string;
  dataType?: string;
  format?: unknown;
  width?: number;
  [key: string]: unknown;
}

export interface ReportPivotField {
  dataField: string;
  /** row | column | data | filter */
  area?: string;
  summaryType?: string;
  caption?: string;
  [key: string]: unknown;
}

export interface ReportViewConfig {
  type: 'grid' | 'pivot' | 'map';
  key?: string;
  title?: string;
  /** grid */
  columns?: ReportGridColumn[];
  summary?: unknown[];
  /** pivot */
  fields?: ReportPivotField[];
  /** map */
  latitudeField?: string;
  longitudeField?: string;
  titleField?: string;
  zoom?: number;
  center?: [number, number];
}

/** Элемент глобальной панели фильтров (перенос из env.js, GET /api/toolbar). */
export interface ToolbarItem {
  field?: string;
  label?: string;
  type?: string;
  items?: unknown[];
  /** Для type=hierarchical-list: MS SQL-база, из которой грузится дерево. */
  dbName?: string;
  [key: string]: unknown;
}

/** Системные запросы (sysrequest из env.js): дерево фондов и т.п. */
export interface SysRequestItem {
  id?: string;
  name?: string;
  query?: string;
  [key: string]: unknown;
}

/** Результат POST /api/execute (одиночный MS SQL-запрос). */
export interface ExecuteResult {
  columns: string[];
  rows: unknown[][];
  error?: string;
}

/** Типизированная схема reports.config (гибрид: новая + легаси MSI). */
export interface ReportConfig {
  /** Ключ MS SQL-базы из /api/meta/databases (DB1UL, DB2UL, …). */
  db?: string;
  /** Группа в левом меню (необязательно). */
  groupKey?: string;
  /**
   * Скрыть отчёт в левом меню (в списке /api/reports он остаётся и открывается
   * по прямой ссылке #/report/<key>). Используется, чтобы «убрать» отчёты, пока
   * они не доведены.
   */
  hidden?: boolean;
  /** Новая схема: массив описаний фильтров. */
  filters?: ReportFilterSpec[];
  views?: ReportViewConfig[];
  /** key вида, открываемого по умолчанию. */
  defaultView?: string;
  /** Легаси-схема MSI: секции визуализаций (grid, pivot, map, chart). */
  fields?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Report {
  id: number;
  key: string;
  title: string;
  icon: string;
  /** Картинка карточки раздела: URL или имя иконки DevExtreme. */
  image?: string | null;
  query_text: string;
  /** Ключ запроса (dbo.report_query): задаёт колонки для видов. */
  query_key?: string;
  config: ReportConfig;
  /** Родительский раздел (null — верхний уровень). */
  parent_id?: number | null;
  /** Запись является разделом (папкой), а не запускаемым отчётом. */
  is_section?: boolean;
  sort_order?: number;
  /** Филиал раздела дерева ('1'..'9'); отчёты наследуют раздел. */
  branch_code?: string;
  updated_at?: string;
}

export interface ReportData {
  columns: string[];
  rows: unknown[][];
  error?: string;
}

export interface DatabaseInfo {
  id: string;
  name: string;
  server?: string;
  database?: string;
}

/** Сохранённый вид пользователя (серверное хранилище MS SQL). */
export interface SavedViewDto {
  id: string;
  mode: string;
  name: string;
  widget?: unknown;
  ui?: Record<string, unknown> | null;
  filters?: Record<string, unknown> | null;
  savedAt?: string;
}

/** Состояние пользователя по отчёту: последние фильтры и сохранённые виды. */
export interface UserReportState {
  filters?: Record<string, unknown>;
  selected?: Record<string, string>;
  activeMode?: string | null;
  views: SavedViewDto[];
  version: number;
  updatedAt?: string;
}

/** Текущий пользователь (на dev — условная авторизация). */
export interface MeInfo {
  login: string;
  roles: string[];
  provider: string;
  isDevAuth: boolean;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...((init?.headers as Record<string, string> | undefined) ?? {}),
    },
  });
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch { /* ответ без JSON-тела */ }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export const reportsApi = {
  list(): Promise<Report[]> {
    return request<Report[]>('/api/reports');
  },
  get(key: string): Promise<Report> {
    return request<Report>(`/api/reports/${encodeURIComponent(key)}`);
  },
  create(report: Partial<Report>): Promise<{ id: number }> {
    return request<{ id: number }>('/api/reports', {
      method: 'POST',
      body: JSON.stringify(report),
    });
  },
  update(key: string, report: Partial<Report>): Promise<{ id: number }> {
    return request<{ id: number }>(`/api/reports/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify(report),
    });
  },
  remove(key: string): Promise<{ message: string }> {
    return request<{ message: string }>(`/api/reports/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });
  },
  /** Выполняет SQL отчёта на MS SQL, подставляя значения фильтров. */
  getData(key: string, filters: Record<string, unknown>): Promise<ReportData> {
    return request<ReportData>(`/api/reports/${encodeURIComponent(key)}/data`, {
      method: 'POST',
      body: JSON.stringify({ filters }),
    });
  },
  getDatabases(): Promise<{ databases: DatabaseInfo[] }> {
    return request<{ databases: DatabaseInfo[] }>('/api/meta/databases');
  },
  /** Элементы списка с серверным поиском и постраничной выдачей (multi-select-list). */
  items(params: {
    dbName: string; sql: string; idField?: string; nameField?: string;
    search?: string; skip?: number; take?: number;
  }): Promise<{ items: { id: unknown; name: string }[]; count: number }> {
    return request('/api/items', { method: 'POST', body: JSON.stringify(params) });
  },
  /** Текущий пользователь: на dev — логин из окружения. */
  getMe(): Promise<MeInfo> {
    return request<MeInfo>('/api/me');
  },
  /** Состояние пользователя по отчёту (фильтры + сохранённые виды). */
  getUserState(key: string): Promise<UserReportState> {
    return request<UserReportState>(`/api/user-state/${encodeURIComponent(key)}`);
  },
  /** Сохраняет состояние целиком; version передаётся в If-Match, при расхождении — 409. */
  putUserState(
    key: string,
    state: Partial<UserReportState>,
    version: number,
  ): Promise<UserReportState> {
    return request<UserReportState>(`/api/user-state/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: { 'If-Match': String(version) },
      body: JSON.stringify(state),
    });
  },
  getToolbar(): Promise<{ source?: string; toolbar: ToolbarItem[]; sysrequest?: SysRequestItem[] }> {
    return request<{ source?: string; toolbar: ToolbarItem[]; sysrequest?: SysRequestItem[] }>('/api/toolbar');
  },
  /** Выполняет произвольный SQL на одной MS SQL-базе (дерево фондов и пр.). */
  execute(dbName: string, sql: string): Promise<ExecuteResult> {
    return request<ExecuteResult>('/api/execute', {
      method: 'POST',
      body: JSON.stringify({ dbName, sql }),
    });
  },
  saveToolbar(config: unknown): Promise<{ message: string }> {
    return request<{ message: string }>('/api/toolbar', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  },
};
