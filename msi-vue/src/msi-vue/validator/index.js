import { createWidget, stub } from '../create-widget.js';

export const DxValidator = createWidget('dxValidator', [
  'validationRules','validationGroup','onValidated'
]);

export const DxValidationRule = stub('DxValidationRule');
export const DxRequiredRule = stub('DxRequiredRule');
export const DxEmailRule = stub('DxEmailRule');
export const DxStringLengthRule = stub('DxStringLengthRule');
export const DxRangeRule = stub('DxRangeRule');
export const DxPatternRule = stub('DxPatternRule');
export const DxCompareRule = stub('DxCompareRule');
export const DxAsyncRule = stub('DxAsyncRule');
export const DxCustomRule = stub('DxCustomRule');

export default DxValidator;