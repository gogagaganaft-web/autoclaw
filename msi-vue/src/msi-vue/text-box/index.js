import { createWidget } from '../create-widget.js';
export { DxButton, DxButton as DxTextBoxButton } from '../button/index.js';
export const DxTextBox = createWidget('dxTextBox', ['value','placeholder','readOnly','disabled','mode','onValueChanged']);
export const DxTextBoxTypes = {};
export default DxTextBox;