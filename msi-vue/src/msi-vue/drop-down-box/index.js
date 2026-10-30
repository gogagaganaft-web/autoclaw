import { createWidget } from '../create-widget.js';

// Обёртка MSI dxDropDownBox: на проде поле фильтра — это выпадающая панель,
// внутри которой лежит конкретный виджет (дерево, список, кнопки, календарь).
export const DxDropDownBox = createWidget('dxDropDownBox', [
  'value', 'valueExpr', 'displayExpr', 'dataSource', 'items', 'contentTemplate',
  'opened', 'showClearButton', 'placeholder', 'label', 'labelMode', 'disabled',
  'acceptCustomValue', 'openOnFieldClick', 'showDropDownButton', 'dropDownOptions',
  'onValueChanged', 'onOpened', 'onClosed', 'onContentReady', 'width', 'height',
]);
export default DxDropDownBox;
