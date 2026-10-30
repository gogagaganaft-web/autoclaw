import { ref } from 'vue';

type Theme = 'light' | 'dark';

const storageKey = 'app-theme';
const paletteStorageKey = 'app-palette';

// Оба стилевых файла MSI объявлены в index.html и переключаются по href.
const darkStylesheetId = 'msi-theme-dark';
const lightStylesheetId = 'msi-theme-light';

/** Цветовые схемы MSI: файлы public/msi/<id>.light.css и <id>.dark.css.
 * Старые поколения (blue/purple/p) не включаем: в них нет --dx-*
 * переменных и части иконок — токены приложения и меню деградируют. */
export type PaletteId = 's' | 'b' | 'e' | 'l' | 'o';

export interface PaletteOption {
  id: PaletteId;
  name: string;
  /** Акцент темы — цветной кружок в меню выбора. */
  accent: string;
}

export const PALETTES: PaletteOption[] = [
  { id: 's', name: 'Синяя (Стандарт)', accent: '#5486ff' },
  { id: 'b', name: 'Синяя (Кобальт)', accent: '#0F6CBD' },
  { id: 'e', name: 'Синяя (Небесный)', accent: '#03a9f4' },
//  { id: 'l', name: 'Фиолетовая', accent: '#9c27b0' },
//  { id: 'o', name: 'Оранжевая', accent: '#ff5722' },
];

function isPaletteId(value: unknown): value is PaletteId {
  return PALETTES.some((palette) => palette.id === value);
}

function getStoredPalette(): PaletteId {
  const stored = window.localStorage.getItem(paletteStorageKey);
  return isPaletteId(stored) ? stored : 's';
}

/** Ссылки обоих <link> ведут на файлы выбранной палитры.
 * Каталог берём из текущей ссылки: сборка добавляет base (/gr/msi/…),
 * поэтому абсолютный путь «/msi/…» здесь нельзя — он мимо dev-сервера и прода.
 * Disabled-состояние тёмной ссылки остаётся под управлением темы. */
function applyPaletteLinks(palette: PaletteId) {
  const light = document.getElementById(lightStylesheetId) as HTMLLinkElement | null;
  const dark = document.getElementById(darkStylesheetId) as HTMLLinkElement | null;
  if (!light || !dark) return;
  const dir = light.href.slice(0, light.href.lastIndexOf('/') + 1);
  light.href = `${dir}${palette}.light.css`;
  dark.href = `${dir}${palette}.dark.css`;
}

function getStoredTheme(): Theme {
  const stored = window.localStorage.getItem(storageKey);
  return stored === 'dark' ? 'dark' : 'light';
}

function getNextTheme(theme: Theme): Theme {
  return theme === 'light' ? 'dark' : 'light';
}

function applyDarkStylesheet(enabled: boolean) {
  const link = document.getElementById(darkStylesheetId) as HTMLLinkElement | null;
  if (link) {
    link.disabled = !enabled;
  }
}

class ThemeService {
  currentTheme = ref<Theme>(getStoredTheme());
  currentPalette = ref<PaletteId>(getStoredPalette());

  isFluent(): boolean {
    return false;
  }

  async loadThemes() {
    // Both MSI stylesheets are declared in index.html; nothing to load at runtime.
  }

  async setAppTheme(theme: Theme = this.currentTheme.value) {
    this.currentTheme.value = theme;

    // Включаем/выключаем тёмную стилевую MSI и переключаем классы на <html>,
    // чтобы CSS-токены приложения (app-variables.scss) реагировали на тему.
    // НЕ вызываем MSI.ui.themes.current() — это даёт E0021 / W0004.
    applyDarkStylesheet(theme === 'dark');
    applyPaletteLinks(this.currentPalette.value);
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.classList.toggle('theme-light', theme === 'light');

    // Обновляем viz-тему MSI, если метод доступен (безопасно)
    try {
      const msi = (window as unknown as { MSI?: { viz?: { refreshTheme?: () => void } } }).MSI;
      msi?.viz?.refreshTheme?.();
    } catch (e) {
      console.warn('[theme-service] MSI.viz.refreshTheme failed', e);
    }
  }

  switchAppTheme() {
    const newTheme = getNextTheme(this.currentTheme.value);
    this.setAppTheme(newTheme);
    window.localStorage.setItem(storageKey, newTheme);
  }

  /** Смена палитры: сохранить, перекинуть ссылки и перезагрузить страницу.
   * MSI кэширует семейство темы при загрузке (классы dx-theme-* на body,
   * рантайм-смена даёт E0021), поэтому чистое состояние даёт только
   * перезагрузка — inline-скрипт в index.html применит палитру до отрисовки. */
  setAppPalette(palette: PaletteId) {
    if (!isPaletteId(palette) || palette === this.currentPalette.value) return;
    this.currentPalette.value = palette;
    window.localStorage.setItem(paletteStorageKey, palette);
    applyPaletteLinks(palette);
    window.location.reload();
  }
}

export const themeService = new ThemeService();
