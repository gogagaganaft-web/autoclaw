/**
 * API запросов отчётов (служба store, 7505).
 *
 * Запрос — это SQL плюс тема (теги), набор фильтров и снимок колонок последнего
 * удачного запуска. Отчёт ссылается на запрос ключом, но держит и свой снимок
 * SQL в reports.query_text.
 */

export interface QueryDef {
  key: string;
  title: string;
  tags: string[];
  db_key?: string;
  filters: string[];
  sql: string;
  columns?: QueryColumn[];
  updated_at?: string;
  updated_by?: string;
}

export interface QueryColumn {
  dataField: string;
  caption?: string;
  type?: string;
}

export interface QueryPayload {
  key: string;
  title: string;
  tags: string[];
  db_key?: string;
  filters: string[];
  sql: string;
  columns?: QueryColumn[];
}

export interface QueryRevision {
  id: number;
  action: string;
  sql?: string;
  changed_at?: string;
  changed_by?: string;
}

export interface ExecuteResult {
  columns: Array<string | { dataField?: string; caption?: string }>;
  rows: unknown[][];
  error?: string;
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
    } catch { /* ответ без JSON */ }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const queriesApi = {
  list(): Promise<{ queries: QueryDef[]; total: number }> {
    return request<{ queries: QueryDef[]; total: number }>('/api/queries');
  },

  create(payload: QueryPayload): Promise<QueryDef> {
    return request<QueryDef>('/api/queries', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update(key: string, payload: QueryPayload): Promise<QueryDef> {
    return request<QueryDef>(`/api/queries/${encodeURIComponent(key)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  remove(key: string): Promise<{ message: string }> {
    return request<{ message: string }>(`/api/queries/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });
  },

  saveColumns(key: string, columns: QueryColumn[]): Promise<QueryDef> {
    return request<QueryDef>(`/api/queries/${encodeURIComponent(key)}/columns`, {
      method: 'PUT',
      body: JSON.stringify({ columns }),
    });
  },

  history(key: string, limit = 50): Promise<{ revisions: QueryRevision[]; total: number }> {
    return request<{ revisions: QueryRevision[]; total: number }>(
      `/api/queries/${encodeURIComponent(key)}/history?limit=${limit}`,
    );
  },

  /** Тестовый запуск: SQL уже с подставленными значениями. */
  execute(dbName: string, sql: string): Promise<ExecuteResult> {
    return request<ExecuteResult>('/api/execute', {
      method: 'POST',
      body: JSON.stringify({ dbName, sql }),
    });
  },
};
