export function registerGradient(type, options) {
  const viz = window.MSI?.viz;
  if (viz?.registerGradient) return viz.registerGradient(type, options);
  console.warn('[msi-vue] MSI.viz.registerGradient not found');
}
export const ChartsColor = {};
export default { registerGradient, ChartsColor };