import { createWidget } from '../create-widget.js';

export const DxTagBox = createWidget('dxTagBox', [
  'items','dataSource','value','displayExpr','valueExpr','searchEnabled','searchExpr',
  'showSelectionControls','showClearButton','placeholder','multiline','maxDisplayedTags',
  'applyValueMode','selectAllMode','onValueChanged',
]);

export const DxTagBoxTypes = {};

export default DxTagBox;
