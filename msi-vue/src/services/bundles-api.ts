/** API именованных наборов каталога «фильтры+запросы+отчёты» (store :7505). */

export interface BundleInfo {
  id: number;
  name: string;
  description: string;
  version: number;
  item_counts: string;
  created_by: string;
  created_at?: string;
  updated_at?: string;
}

export interface Bundle extends BundleInfo {
  payload: string;
}

export interface BundleLogEntry {
  id: number;
  action: string;
  branches: string;
  applied_by: string;
  applied_at?: string;
  details: string;
}

export interface BundleScope {
  filters?: 'all' | 'used';
  queries?: 'all' | 'used';
  report_roots?: string[];
  with_toolbar?: boolean;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const dev = typeof localStorage !== 'undefined' ? localStorage.getItem('gr.devUser') : '';
  const headers: Record<string, string> = { 'Content-Type': 'application/json; charset=utf-8' };
  if (dev) headers['X-Dev-User'] = dev;
  const res = await fetch(url, { ...init, headers: { ...headers, ...(init?.headers as Record<string, string>) } });
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body && body.error) message = body.error;
    } catch { /* без JSON */ }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const bundlesApi = {
  list(): Promise<{ bundles: BundleInfo[] }> {
    return request('/api/bundles');
  },

  get(id: number): Promise<Bundle> {
    return request(`/api/bundles/${id}`);
  },

  /** Снять снимок текущего каталога. */
  create(payload: { name: string; description?: string; scope?: BundleScope }): Promise<{ id: number; item_counts: string }> {
    return request('/api/bundles', { method: 'POST', body: JSON.stringify(payload) });
  },

  /** Переснять снимок (новая версия). */
  resnapshot(id: number, payload: { name?: string; description?: string; scope?: BundleScope }): Promise<{ id: number; item_counts: string }> {
    return request(`/api/bundles/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  },

  remove(id: number): Promise<{ message: string }> {
    return request(`/api/bundles/${id}`, { method: 'DELETE' });
  },

  /** Экспорт в JSON-файл: скачивание. */
  async exportFile(id: number): Promise<void> {
    const dev = typeof localStorage !== 'undefined' ? localStorage.getItem('gr.devUser') : '';
    const headers: Record<string, string> = {};
    if (dev) headers['X-Dev-User'] = dev;
    const res = await fetch(`/api/bundles/${id}/export`, { headers });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const disposition = res.headers.get('Content-Disposition') || '';
    const match = /filename="([^"]+)"/.exec(disposition);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = match ? match[1] : `bundle-${id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },

  /** Импорт из JSON (текст файла). */
  importFile(payload: { name?: string; description?: string; payload: string }): Promise<{ id: number; item_counts: string }> {
    return request('/api/bundles/import', { method: 'POST', body: JSON.stringify(payload) });
  },

  /** Применить набор: merge — добавить/обновить, replace — скрыть лишнее у филиалов. */
  apply(id: number, mode: 'merge' | 'replace', branches: string[]): Promise<{ message: string }> {
    return request(`/api/bundles/${id}/apply`, { method: 'POST', body: JSON.stringify({ mode, branches }) });
  },

  log(id: number): Promise<{ log: BundleLogEntry[] }> {
    return request(`/api/bundles/${id}/log`);
  },
};
