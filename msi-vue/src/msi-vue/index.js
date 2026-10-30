// Root module msi-vue: re-export all components (each name exactly once)

export { DxAccordion, DxItem as DxAccordionItem } from './accordion/index.js';
export { DxBullet, DxBulletTooltip, DxBulletSize } from './bullet/index.js';
export { DxButton, DxButtonTypes } from './button/index.js';
export { DxButtonGroup, DxButtonGroupTypes } from './button-group/index.js';
export { DxChart } from './chart/index.js';
export { DxChat } from './chat/index.js';
export {
  DxDataGrid, DxColumn, DxColumnChooser, DxColumnFixing, DxColumnLookup,
  DxEditing, DxPaging, DxPager, DxFilterRow, DxHeaderFilter,
  DxGroupPanel, DxMasterDetail, DxSelection, DxScrolling, DxStateStoring,
  DxSorting, DxSummary, DxTotalItem, DxGroupItem, DxSearchPanel, DxFilterPanel,
  DxToolbar as DxDataGridToolbar, DxItem as DxDataGridItem,
  DxExport, DxKeyboardNavigation, DxRowDragging,
  DxLoadPanel as DxDataGridLoadPanel, DxRemoteOperations, DxDataGridTypes
} from './data-grid/index.js';
export { DxDateBox } from './date-box/index.js';
export { DxDropDownButton, DxItem as DxDropDownItem, DxDropDownButtonTypes } from './drop-down-button/index.js';
export { DxFileUploader } from './file-uploader/index.js';
export {
  DxForm, DxItem as DxFormItem, DxLabel, DxColCountByScreen, DxButtonItem,
  DxButtonOptions, DxGroupItem as DxFormGroupItem, DxGroupOptions,
  DxSimpleItem, DxTabbedItem, DxTab, DxEmptyItem, DxEditorOptions, DxFormTypes
} from './form/index.js';
export {
  DxFunnel, DxMargin as DxFunnelMargin, DxBorder as DxFunnelBorder,
  DxLegend as DxFunnelLegend, DxTitle as DxFunnelTitle,
  DxTooltip as DxFunnelTooltip, DxFont as DxFunnelFont,
  DxLabel as DxFunnelLabel, DxConnector, DxSize as DxFunnelSize
} from './funnel/index.js';
export {
  DxGantt, DxTasks, DxEditing as DxGanttEditing, DxValidation,
  DxColumn as DxGanttColumn, DxToolbar as DxGanttToolbar, DxItem as DxGanttItem
} from './gantt/index.js';
export { DxList } from './list/index.js';
export { DxLoadIndicator } from './load-indicator/index.js';
export { DxLoadPanel } from './load-panel/index.js';
export { DxNumberBox } from './number-box/index.js';
export { DxPieChart, DxSeries as DxPieSeries, DxLegend as DxPieLegend,
  DxTitle as DxPieTitle, DxTooltip as DxPieTooltip, DxFont
} from './pie-chart/index.js';
export {
  DxPivotGrid, DxPivotGridField, DxPivotGridFieldChooser, DxPivotGridExport,
  DxPivotGridTypes,
} from './pivot-grid/index.js';
export { DxPopup, DxToolbarItem as DxPopupItem, DxAnimation } from './popup/index.js';
export { DxRangeSelector, DxSeries as DxRangeSelectorSeries } from './range-selector/index.js';
export { DxScheduler, DxView, DxResource } from './scheduler/index.js';
export { DxScrollView } from './scroll-view/index.js';
export { DxSelectBox } from './select-box/index.js';
export { DxSortable, DxSortableTypes } from './sortable/index.js';
export { DxSpeedDialAction } from './speed-dial-action/index.js';
export { DxSplitter, DxItem as DxSplitterItem } from './splitter/index.js';
export { DxTabPanel, DxItem as DxTabPanelItem } from './tab-panel/index.js';
export { DxTagBox, DxTagBoxTypes } from './tag-box/index.js';
export { DxTabs, DxItem as DxTabItem, DxTabsTypes } from './tabs/index.js';
export { DxTileView } from './tile-view/index.js';
export { DxTextArea } from './text-area/index.js';
export { DxTextBox, DxTextBoxTypes } from './text-box/index.js';
export { DxToolbar, DxItem as DxToolbarItem } from './toolbar/index.js';
export { DxTreeView } from './tree-view/index.js';
export { DxTreeList } from './tree-list/index.js';
export { DxValidationGroup } from './validation-group/index.js';
export {
  DxValidator, DxValidationRule, DxRequiredRule, DxEmailRule,
  DxStringLengthRule, DxRangeRule, DxPatternRule, DxCompareRule,
  DxAsyncRule, DxCustomRule
} from './validator/index.js';
export {
  DxVectorMap, DxLayer, DxSource,
  DxLegend as DxVectorMapLegend, DxTooltip as DxVectorMapTooltip, DxVectorMapTypes
} from './vector-map/index.js';
export { ChartsColor, registerGradient } from './common/charts/index.js';


import { createWidget } from './create-widget.js';
export const DxCalendar = createWidget('dxCalendar', ['value','min','max','disabled','onValueChanged']);
export const DxTooltip = createWidget('dxTooltip', ['target','visible','contentTemplate','position']);
export const DxCheckBox = createWidget('dxCheckBox', ['value','text','disabled','onValueChanged']);
export { DxDrawer } from './core/drawer.js';
export const DxDropDownBox = createWidget('dxDropDownBox', ['value','items','dataSource','contentTemplate','onValueChanged']);
export const DxRadioGroup = createWidget('dxRadioGroup', ['value', 'items', 'valueExpr', 'displayExpr', 'layout', 'onValueChanged']);
