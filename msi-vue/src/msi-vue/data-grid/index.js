import { createWidget, stub } from '../create-widget.js';

export const DxDataGrid = createWidget('dxDataGrid', [
  'dataSource','columns','showBorders','paging','pager','filterRow',
  'headerFilter','groupPanel','masterDetail','onRowClick','onSelectionChanged',
  'searchPanel','hoverStateEnabled','columnAutoWidth','allowColumnResizing',
  'wordWrapEnabled','showColumnLines','showColumnHeaders','focusedRowEnabled',
  'selectedRowKeys','focusedRowKey','height','width','editing','sortByColumnGroup',
  'columnHidingEnabled','loadPanel','scrolling','summary','sorting','selection',
]);

export const DxColumn = stub('DxColumn');
export const DxColumnChooser = stub('DxColumnChooser');
export const DxColumnFixing = stub('DxColumnFixing');
export const DxColumnLookup = stub('DxColumnLookup');
export const DxEditing = stub('DxEditing');
export const DxPaging = stub('DxPaging');
export const DxPager = stub('DxPager');
export const DxFilterRow = stub('DxFilterRow');
export const DxHeaderFilter = stub('DxHeaderFilter');
export const DxGroupPanel = stub('DxGroupPanel');
export const DxMasterDetail = stub('DxMasterDetail');
export const DxSelection = stub('DxSelection');
export const DxScrolling = stub('DxScrolling');
export const DxStateStoring = stub('DxStateStoring');
export const DxSorting = stub('DxSorting');
export const DxSummary = stub('DxSummary');
export const DxTotalItem = stub('DxTotalItem');
export const DxGroupItem = stub('DxGroupItem');
export const DxSearchPanel = stub('DxSearchPanel');
export const DxFilterPanel = stub('DxFilterPanel');
export const DxToolbar = stub('DxToolbar');
export const DxItem = stub('DxItem');
export const DxExport = stub('DxExport');
export const DxKeyboardNavigation = stub('DxKeyboardNavigation');
export const DxRowDragging = stub('DxRowDragging');
export const DxLoadPanel = stub('DxLoadPanel');
export const DxRemoteOperations = stub('DxRemoteOperations');
export const DxDataGridTypes = {};

// Column child components
export const DxLookup = stub('DxLookup');
export const DxFormat = stub('DxFormat');
export const DxButton = stub('DxButton');
export const DxValidationRule = stub('DxValidationRule');
export const DxRequiredRule = stub('DxRequiredRule');
export const DxEmailRule = stub('DxEmailRule');
export const DxStringLengthRule = stub('DxStringLengthRule');
export const DxRangeRule = stub('DxRangeRule');
export const DxPatternRule = stub('DxPatternRule');
export const DxCompareRule = stub('DxCompareRule');
export const DxAsyncRule = stub('DxAsyncRule');
export const DxCustomRule = stub('DxCustomRule');

export default DxDataGrid;