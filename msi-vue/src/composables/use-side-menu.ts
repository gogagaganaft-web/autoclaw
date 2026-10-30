// Состояние левой панели навигации.
//
// Панелью управляет layout (side-nav-outer-toolbar.vue), но свернуть её нужно
// и странице отчёта: после успешного формирования отчёта панель убирается,
// чтобы освободить место таблице/своду.

import { ref } from 'vue';

/** Открыта ли левая панель навигации. */
export const sideMenuOpened = ref(true);

let initialized = false;

/** Задаёт стартовое состояние один раз — при первом монтировании layout. */
export function initSideMenu(opened: boolean): void {
  if (initialized) return;
  initialized = true;
  sideMenuOpened.value = opened;
}

/** Свернуть левую панель (иконки/шапка остаются). */
export function closeSideMenu(): void {
  sideMenuOpened.value = false;
}

// ─── Ширина панели навигации ────────────────────────────────────────────────
// Общая для layout и страниц: правая панель редактора фильтров при растяжении
// до 75% окна отжимает левое меню, а таблица остаётся с колонкой «Подпись».

const MENU_WIDTH_KEY = 'gr.sidePanelWidth';
const DEFAULT_MENU_WIDTH = 250;
const MIN_MENU_WIDTH = 200;
const MAX_MENU_WIDTH = 560;

function readMenuWidth(): number {
  try {
    const raw = Number(localStorage.getItem(MENU_WIDTH_KEY));
    if (Number.isFinite(raw) && raw >= MIN_MENU_WIDTH && raw <= MAX_MENU_WIDTH) {
      return raw;
    }
  } catch {
    /* localStorage недоступен — берём значение по умолчанию */
  }
  return DEFAULT_MENU_WIDTH;
}

/** Ширина левой панели навигации, px. */
export const sideMenuWidth = ref(readMenuWidth());

/** Границы ширины меню — нужны страницам, которые делят с ним место. */
export const SIDE_MENU_MIN_WIDTH = MIN_MENU_WIDTH;

/** Задать ширину меню (с ограничениями) и сохранить выбор. */
export function setSideMenuWidth(px: number): void {
  const next = Math.min(MAX_MENU_WIDTH, Math.max(MIN_MENU_WIDTH, Math.round(px)));
  if (next === sideMenuWidth.value) return;
  sideMenuWidth.value = next;
  try {
    localStorage.setItem(MENU_WIDTH_KEY, String(next));
  } catch {
    /* ширина не сохранится — не критично */
  }
}
