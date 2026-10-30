import { createWidget } from '../create-widget.js';

// Обёртка MSI-класса dxButtonGroup: кнопочные фильтры строятся тем же способом,
// что и остальные контролы панели (window.MSI.ui.dxButtonGroup).
export const DxButtonGroup = createWidget('dxButtonGroup', [
  'items', 'keyExpr', 'displayExpr', 'selectedItemKeys', 'selectedItems',
  'selectionMode', 'showSelectionControls', 'stylingMode', 'width', 'disabled',
  'buttonTemplate', 'itemTemplate', 'onSelectionChanged', 'onItemClick',
]);
export const DxButtonGroupTypes = {};
export default DxButtonGroup;
