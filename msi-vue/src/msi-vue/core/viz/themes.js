export function currentTheme(theme) {
  const viz = window.MSI?.viz;
  if (!viz) { console.warn('[msi-vue] MSI.viz not found'); return theme; }
  if (theme === undefined) return viz.currentTheme ? viz.currentTheme() : undefined;
  return viz.currentTheme ? viz.currentTheme(theme) : undefined;
}
export function refreshTheme() {
  if (window.MSI?.viz?.refreshTheme) window.MSI.viz.refreshTheme();
  else console.warn('[msi-vue] MSI.viz.refreshTheme not found');
}
export function registerTheme(name, theme) {
  if (window.MSI?.viz?.registerTheme) window.MSI.viz.registerTheme(name, theme);
}
export default { currentTheme, refreshTheme, registerTheme };