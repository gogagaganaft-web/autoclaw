// Аутентификация: dev-режим — выбор пользователя (X-Dev-User), роль и филиал
// приходят с сервера из dbo.app_user. На проде логины придут из синка с
// Bitrix24 — контракт /api/me не меняется.

import { reactive } from 'vue';

export type Role = 'superadmin' | 'admin' | 'user';

export interface CurrentUser {
  login: string;
  display_name: string;
  role: Role;
  branch: string; // '1'..'9', '' = не привязан
  provider: string;
  isDevAuth: boolean;
}

const DEV_USER_KEY = 'gr.devUser';

export const currentUser = reactive<{ value: CurrentUser | null }>({ value: null });

function devUserHeader(): string {
  try {
    return localStorage.getItem(DEV_USER_KEY) || '';
  } catch {
    return '';
  }
}

async function apiGet<T>(url: string): Promise<T> {
  const headers: Record<string, string> = {};
  const dev = devUserHeader();
  if (dev) headers['X-Dev-User'] = dev;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

/** Загружает текущего пользователя (роль/филиал) с сервера. */
export async function fetchMe(): Promise<CurrentUser | null> {
  try {
    let me: Record<string, unknown> | null = null;
    try {
      me = await apiGet<Record<string, unknown>>('/api/me');
    } catch {
      // Холодный старт: первый запрос может обогнать загрузку — один повтор.
      await new Promise((resolve) => setTimeout(resolve, 500));
      me = await apiGet<Record<string, unknown>>('/api/me');
    }
    currentUser.value = {
      login: String(me.login ?? ''),
      display_name: String(me.display_name ?? me.login ?? ''),
      role: (me.role as Role) ?? 'user',
      branch: String(me.branch ?? ''),
      provider: String(me.provider ?? 'local'),
      isDevAuth: me.isDevAuth === true,
    };
  } catch {
    // сервер недоступен — работаем как самый простой пользователь
    currentUser.value = {
      login: '', display_name: '', role: 'user', branch: '',
      provider: 'local', isDevAuth: false,
    };
  }
  return currentUser.value;
}

/** Dev-переключатель: войти как другой пользователь каталога app_user. */
export async function switchDevUser(login: string): Promise<CurrentUser | null> {
  try {
    localStorage.setItem(DEV_USER_KEY, login);
  } catch { /* localStorage недоступен — заголовок просто не уйдёт */ }
  return fetchMe();
}

export function logOut(): void {
  try {
    localStorage.removeItem(DEV_USER_KEY);
  } catch { /* ignore */ }
  currentUser.value = null;
  void fetchMe();
}

export interface AppUserRow {
  login: string;
  display_name: string;
  role_code: Role;
  branch_code: string;
}

export async function fetchUsers(): Promise<AppUserRow[]> {
  try {
    const data = await apiGet<{ users: AppUserRow[] }>('/api/users');
    return data.users ?? [];
  } catch {
    return [];
  }
}

export function isSuperAdmin(): boolean {
  return currentUser.value?.role === 'superadmin';
}

export function isAdmin(): boolean {
  const role = currentUser.value?.role;
  return role === 'admin' || role === 'superadmin';
}

// ─── Совместимость со старым API (страницы входа, шапка) ──────────────────────

export interface UserInfo {
  email: string;
  name: string;
  lastName: string;
  avatarUrl: string;
}

export const defaultUser: UserInfo = {
  email: '',
  name: '',
  lastName: '',
  avatarUrl: '',
};

export type AuthUser = { isOk: boolean, data?: UserInfo | null };

interface AuthInfo {
  _user: UserInfo | null,
  loggedIn: () => boolean,
  logOut: () => Promise<void>,
  logIn: (email: string, password: string) => Promise<Record<string, unknown>>,
  createAccount: (email: string, password: string) => Promise<Record<string, unknown>>,
  resetPassword: (email: string) => Promise<Record<string, unknown>>,
  changePassword: (email: string, recoveryCode: string) => Promise<Record<string, unknown>>,
  getUser: () => Promise<AuthUser>,
}

export const authInfo: AuthInfo = {
  get _user(): UserInfo | null {
    const u = currentUser.value;
    if (!u) return null;
    return { ...defaultUser, email: u.login, name: u.display_name };
  },
  set _user(v: UserInfo | null) { /* состояние теперь живёт на сервере */ },

  loggedIn() {
    return !!currentUser.value;
  },

  async logIn(email: string) {
    await switchDevUser(email);
    return { isOk: true, data: this._user };
  },

  async logOut() {
    logOut();
  },

  async getUser() {
    return { isOk: true, data: this._user };
  },

  async resetPassword() {
    return { isOk: true };
  },

  async changePassword() {
    return { isOk: true };
  },

  async createAccount() {
    return { isOk: true };
  },
};
