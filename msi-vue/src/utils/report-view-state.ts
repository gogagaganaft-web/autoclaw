// Состояние отображения отчёта: то, что пользователь настраивает в каждом виде
// (таблица / свод / инфографика / карта) и в фильтрах. Хранится в localStorage
// по ключу отчёта; у каждого режима — своё представление (колонки и их порядок,
// раскладка полей свода, тип графика, зум карты), плюс снимок фильтров.
//
// Виджеты DevExtreme в localStorage ничего не пишут (stateStoring выключен):
// состоянием управляют кнопки «Сохранить / Переименовать / Удалить» на
// странице отчёта, поэтому снимок можно отменить и почистить.

import type { ModeType } from '@/utils/report-config';
import { reportsApi, type UserReportState } from '@/services/reports-api';

/**
 * Снимок виджета:
 *   dataGrid — то, что отдаёт DataGrid.state();
 *   pivot    — состояние источника свода (PivotGrid.getDataSource().state()).
 */
export interface SavedWidgetState {
  kind: 'dataGrid' | 'pivot';
  value: unknown;
}

export interface SavedModeView {
  /** Идентификатор состояния (уникален в пределах отчёта). */
  id: string;
  /** Имя состояния (подпись кнопки вида, пункт меню и «Переименовать»). */
  name: string;
  widget?: SavedWidgetState | null;
  /** Настройки страницы: тип графика/палитра/свёрнутый свод, зум и центр карты. */
  ui?: Record<string, unknown>;
  /** Значения фильтров на момент сохранения — при выборе состояния датасет
   *  переключается вместе с ними. */
  filters?: Record<string, unknown>;
  savedAt: number;
}

export interface ReportViewState {
  version: 1;
  /** Значения фильтров на момент сохранения (при открытии отчёта не применяются). */
  filters: Record<string, unknown>;
  /** Режим на момент сохранения (при открытии отчёта показывается режим по умолчанию). */
  activeMode?: ModeType;
  /** Сохранённые состояния по видам просмотра: у вида их может быть несколько. */
  modes: Partial<Record<ModeType, SavedModeView[]>>;
  /** Выбранное состояние каждого вида (id) — именно его применяем. */
  selected?: Partial<Record<ModeType, string>>;
  updatedAt: number;
}

const STORAGE_PREFIX = 'gr.reportView.';

export function reportViewStorageKey(reportKey: string): string {
  return `${STORAGE_PREFIX}${reportKey}`;
}

/**
 * Базовое имя состояния вида — заголовок вида («СВОД», «ТАБЛИЦА», …).
 * Новые состояния нумеруются от него: «СВОД [1]», «СВОД [2]», …
 */
export function defaultViewName(modeTitle: string): string {
  return modeTitle || 'Вид';
}

/** Уникальный идентификатор нового состояния. */
export function newSavedViewId(): string {
  return `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

/** Все сохранённые состояния вида просмотра (в порядке добавления). */
export function modeViews(
  state: ReportViewState | null | undefined,
  type: ModeType,
): SavedModeView[] {
  const list = state?.modes?.[type];
  return Array.isArray(list) ? list : [];
}

/**
 * Только явно выбранное состояние вида (без запасного «первого»).
 * Отчёт открывается в своём дефолтном виде, поэтому применять снимок можно
 * лишь после того, как пользователь выбрал его в меню вида.
 */
export function pickedView(
  state: ReportViewState | null | undefined,
  type: ModeType,
): SavedModeView | null {
  const id = state?.selected?.[type];
  if (!id) return null;
  return modeViews(state, type).find((view) => view.id === id) ?? null;
}

// Старые записи хранили по одному состоянию на вид (`modes.grid = {...}`).
// Приводим их к массивам, чтобы «Создать новое» могло добавлять состояния.
function normalizeState(raw: ReportViewState): ReportViewState {
  const modes: Partial<Record<ModeType, SavedModeView[]>> = {};
  const rawModes = (raw.modes ?? {}) as Record<string, unknown>;
  for (const [type, value] of Object.entries(rawModes)) {
    const list = Array.isArray(value) ? value : [value];
    const views = (list as Partial<SavedModeView>[])
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        ...item,
        id: typeof item.id === 'string' && item.id ? item.id : newSavedViewId(),
        name: typeof item.name === 'string' && item.name ? item.name : 'Мой вид',
        savedAt: typeof item.savedAt === 'number' ? item.savedAt : Date.now(),
      })) as SavedModeView[];
    if (views.length) modes[type as ModeType] = views;
  }
  return { ...raw, modes };
}

// ─── Серверное хранилище (MS SQL: dbo.user_report_view / dbo.user_report_state) ──
// localStorage остаётся кэшем последнего ответа: если бэкенд недоступен, интерфейс
// продолжает работать, но источник истины — БД.

const memory = new Map<string, ReportViewState | null>();
let serverVersion = 0;

function fromServer(raw: UserReportState): ReportViewState | null {
  const modes: Partial<Record<ModeType, SavedModeView[]>> = {};
  for (const view of raw.views ?? []) {
    const type = view.mode as ModeType;
    const list = modes[type] ?? (modes[type] = []);
    list.push({
      id: view.id,
      name: view.name,
      widget: (view.widget as SavedWidgetState | null) ?? null,
      ui: (view.ui as Record<string, unknown> | undefined) ?? undefined,
      filters: (view.filters as Record<string, unknown> | undefined) ?? undefined,
      savedAt: view.savedAt ? Date.parse(view.savedAt) : Date.now(),
    });
  }
  const hasViews = Object.keys(modes).length > 0;
  if (!hasViews && !raw.filters) return null;
  return {
    version: 1,
    filters: raw.filters ?? {},
    selected: (raw.selected ?? {}) as Partial<Record<ModeType, string>>,
    modes,
    updatedAt: raw.updatedAt ? Date.parse(raw.updatedAt) : Date.now(),
  };
}

function toServer(state: ReportViewState) {
  const views = Object.entries(state.modes ?? {}).flatMap(([mode, list]) =>
    (list ?? []).map((view) => ({
      id: view.id,
      mode,
      name: view.name,
      widget: view.widget ?? null,
      ui: view.ui ?? null,
      filters: view.filters ?? null,
      savedAt: new Date(view.savedAt ?? Date.now()).toISOString(),
    })),
  );
  return {
    filters: state.filters ?? {},
    selected: state.selected ?? {},
    activeMode: state.activeMode ?? null,
    views,
    version: 1,
  };
}

/** Читает состояние из MS SQL и обновляет кэш. Ошибку пробрасывает вызывающему. */
export async function hydrateReportView(reportKey: string): Promise<ReportViewState | null> {
  const raw = await reportsApi.getUserState(reportKey);
  serverVersion = typeof raw.version === 'number' ? raw.version : 0;
  const state = fromServer(raw);
  memory.set(reportKey, state);
  try {
    if (state) localStorage.setItem(reportViewStorageKey(reportKey), JSON.stringify(state));
    else localStorage.removeItem(reportViewStorageKey(reportKey));
  } catch {
    /* приватный режим — не критично */
  }
  return state;
}

async function pushReportView(reportKey: string, state: ReportViewState): Promise<void> {
  try {
    const saved = await reportsApi.putUserState(reportKey, toServer(state), serverVersion);
    if (typeof saved?.version === 'number') serverVersion = saved.version;
    const fresh = saved ? fromServer(saved) : null;
    if (fresh) memory.set(reportKey, fresh);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    // 409: состояние изменилось в другой вкладке — перечитываем, чтобы не затереть.
    if (message.includes('409') || message.toLowerCase().includes('conflict')) {
      await hydrateReportView(reportKey).catch(() => undefined);
    }
  }
}

/** Синхронное чтение: память → localStorage (после hydrate — серверные данные). */
export function loadReportView(reportKey: string): ReportViewState | null {
  if (memory.has(reportKey)) return memory.get(reportKey) ?? null;
  const local = loadLocalReportView(reportKey);
  memory.set(reportKey, local);
  return local;
}

function loadLocalReportView(reportKey: string): ReportViewState | null {
  try {
    const raw = localStorage.getItem(reportViewStorageKey(reportKey));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ReportViewState;
    if (!parsed || parsed.version !== 1 || typeof parsed.modes !== 'object') return null;
    const state = normalizeState(parsed);
    return Object.keys(state.modes).length ? state : null;
  } catch {
    return null;
  }
}

export function saveReportView(reportKey: string, state: ReportViewState): void {
  memory.set(reportKey, state);
  try {
    localStorage.setItem(reportViewStorageKey(reportKey), JSON.stringify(state));
  } catch {
    /* localStorage может быть недоступен (приватный режим) — не критично */
  }
  void pushReportView(reportKey, state);
}

export function removeReportView(reportKey: string): void {
  memory.set(reportKey, null);
  try {
    localStorage.removeItem(reportViewStorageKey(reportKey));
  } catch {
    /* см. выше */
  }
  void pushReportView(reportKey, {
    version: 1,
    filters: {},
    selected: {},
    modes: {},
    updatedAt: Date.now(),
  });
}
