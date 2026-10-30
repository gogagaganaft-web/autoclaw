/**
 * API фильтров «Контура данных» (служба store, порт 7505).
 *
 * Фильтр хранится как объект: служебные поля (field, type, label) продублированы
 * в колонках таблицы filter_def, остальное лежит в config — ровно в том виде,
 * в каком раньше лежало в ui_config.toolbar.
 */

export interface FilterDef {
  field: string;
  type: string;
  label?: string;
  sort_order: number;
  config: Record<string, unknown>;
  updated_at?: string;
  updated_by?: string;
}

export interface FilterPayload {
  field: string;
  type: string;
  label?: string;
  sort_order?: number;
  config: Record<string, unknown>;
}

export interface FilterRevision {
  id: number;
  field: string;
  action: string;
  config?: Record<string, unknown>;
  changed_at?: string;
  changed_by?: string;
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

export const filtersApi = {
  list(): Promise<{ filters: FilterDef[]; total: number }> {
    return request<{ filters: FilterDef[]; total: number }>('/api/filters');
  },

  create(payload: FilterPayload): Promise<FilterDef> {
    return request<FilterDef>('/api/filters', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update(field: string, payload: FilterPayload): Promise<FilterDef> {
    return request<FilterDef>(`/api/filters/${encodeURIComponent(field)}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  remove(field: string): Promise<{ message: string }> {
    return request<{ message: string }>(`/api/filters/${encodeURIComponent(field)}`, {
      method: 'DELETE',
    });
  },

  reorder(fields: string[]): Promise<{ filters: FilterDef[] }> {
    return request<{ filters: FilterDef[] }>('/api/filters/reorder', {
      method: 'POST',
      body: JSON.stringify({ fields }),
    });
  },

  history(field: string, limit = 50): Promise<{ revisions: FilterRevision[]; total: number }> {
    return request<{ revisions: FilterRevision[]; total: number }>(
      `/api/filters/${encodeURIComponent(field)}/history?limit=${limit}`,
    );
  },
};
