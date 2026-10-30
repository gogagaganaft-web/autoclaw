export function exportDataGrid(options) {
  console.warn('[msi-vue] exportDataGrid (excel) not implemented');
  if (options && typeof options.onExporting === 'function') options.onExporting();
}
export function exportPivotGrid() { console.warn('[msi-vue] exportPivotGrid (excel) not implemented'); }
export default { exportDataGrid, exportPivotGrid };