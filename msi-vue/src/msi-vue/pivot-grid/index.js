import { createWidget, configComponent } from '../create-widget.js';

// MSI exposes the widget as MSI.ui.dxPivotGrid (см. public/msi/msi.js).
export const DxPivotGrid = createWidget('dxPivotGrid', [
  'dataSource', 'fields', 'showBorders', 'wordWrapEnabled',
  'showColumnGrandTotals', 'showRowGrandTotals', 'showColumnTotals', 'showRowTotals',
  'allowExpandAll', 'allowSorting', 'allowSortingBySummary', 'allowFiltering',
  'allowFieldChooser', 'height', 'fieldChooser', 'headerFilter', 'scrolling',
  'stateStoring', 'loadPanel',
  'onCellClick', 'onCellPrepared', 'onContextMenuPreparing', 'onExporting',
]);

// DxPivotGridField maps itself into the parent's `fields` collection.
export const DxPivotGridField = configComponent('DxPivotGridField', {
  key: 'fields',
  collection: true,
});

export const DxPivotGridFieldChooser = createWidget('dxPivotGridFieldChooser', [
  'dataSource', 'layout', 'height', 'width', 'onContextMenuPreparing',
]);

export const DxPivotGridExport = configComponent('DxPivotGridExport', { key: 'export' });

export const DxPivotGridTypes = {};

export default DxPivotGrid;
