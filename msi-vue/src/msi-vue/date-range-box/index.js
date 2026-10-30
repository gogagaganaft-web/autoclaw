import { createWidget } from '../create-widget.js';

// Обёртка MSI dxDateRangeBox. На проде диапазон месяцев — это именно она:
// pickerType: 'calendar' + calendarOptions { zoomLevel: 'year', calendarView: 'month' }.
export const DxDateRangeBox = createWidget('dxDateRangeBox', [
  'startDate', 'endDate', 'value', 'displayFormat', 'pickerType', 'calendarOptions',
  'openOnFieldClick', 'showClearButton', 'disabled', 'placeholder', 'label',
  'labelMode', 'opened', 'width', 'dropDownOptions', 'onValueChanged', 'onOpened',
]);
export default DxDateRangeBox;
