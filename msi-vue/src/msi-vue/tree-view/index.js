import { createWidget } from '../create-widget.js';
export const DxTreeView = createWidget('dxTreeView', [
  'items','dataSource','displayExpr','keyExpr','expandedExpr',
  'searchEnabled','searchExpr','searchMode','searchTimeout','searchPlaceholder',
  'selectedItemKeys','selectionMode','expandAllEnabled','showCheckBoxesMode',
  'onItemClick','onSelectionChanged','onContentReady',
]);
export default DxTreeView;