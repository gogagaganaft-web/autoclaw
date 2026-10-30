import { createWidget } from '../create-widget.js';

export const DxTreeList = createWidget('dxTreeList', [
  'dataSource', 'columns', 'keyExpr', 'parentIdExpr', 'autoExpandAll',
  'showBorders', 'showColumnHeaders', 'showRowLines', 'showColumnLines',
  'rowAlternationEnabled', 'hoverStateEnabled', 'wordWrapEnabled',
  'columnAutoWidth', 'selection', 'selectedRowKeys', 'expandedRowKeys',
  'focusedRowEnabled', 'focusedRowKey', 'scrolling', 'paging', 'height', 'width',
  'noDataText', 'loadPanel',
  'onRowClick', 'onRowPrepared', 'onRowExpanded', 'onRowCollapsed', 'onSelectionChanged',
  'onContentReady', 'onCellPrepared',
]);

export default DxTreeList;
