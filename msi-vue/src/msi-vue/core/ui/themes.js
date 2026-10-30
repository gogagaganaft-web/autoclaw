export function current(theme) {
  const t = window.MSI?.ui?.themes;
  if (!t) { console.warn('[msi-vue] MSI.ui.themes not found'); return theme; }
  if (theme === undefined) return t.current ? t.current() : undefined;
  return t.current ? t.current(theme) : undefined;
}
export function ready(callback) {
  if (window.MSI?.ui?.themes?.ready) return window.MSI.ui.themes.ready(callback);
  if (typeof callback === 'function') callback();
  return Promise.resolve();
}