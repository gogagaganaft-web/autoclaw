import { createWidget, stub } from '../create-widget.js';

export const DxForm = createWidget('dxForm', [
  'formData','items','colCount','labelLocation','showColonAfterLabel','onFieldDataChanged'
]);

export const DxItem = stub('DxItem');
export const DxLabel = stub('DxLabel');
export const DxColCountByScreen = stub('DxColCountByScreen');
export const DxButtonItem = stub('DxButtonItem');
export const DxButtonOptions = stub('DxButtonOptions');
export const DxGroupItem = stub('DxGroupItem');
export const DxGroupOptions = stub('DxGroupOptions');
export const DxSimpleItem = stub('DxSimpleItem');
export const DxTabbedItem = stub('DxTabbedItem');
export const DxTab = stub('DxTab');
export const DxEmptyItem = stub('DxEmptyItem');
export const DxEditorOptions = stub('DxEditorOptions');
export const DxFormTypes = {};

export const DxValidationRule = stub('DxValidationRule');
export const DxRequiredRule = stub('DxRequiredRule');
export const DxEmailRule = stub('DxEmailRule');
export const DxStringLengthRule = stub('DxStringLengthRule');
export const DxRangeRule = stub('DxRangeRule');
export const DxPatternRule = stub('DxPatternRule');
export const DxCompareRule = stub('DxCompareRule');
export const DxAsyncRule = stub('DxAsyncRule');
export const DxCustomRule = stub('DxCustomRule');

export default DxForm;