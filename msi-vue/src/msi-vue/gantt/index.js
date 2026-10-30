import { createWidget, stub } from '../create-widget.js';
export const DxGantt = createWidget('dxGantt', ['tasks','dependencies','resources','resourceAssignments','editing','validation','onTaskClick']);
export const DxTasks = stub('DxTasks');
export const DxEditing = stub('DxEditing');
export const DxValidation = stub('DxValidation');
export const DxColumn = stub('DxColumn');
export const DxToolbar = stub('DxToolbar');
export const DxItem = stub('DxItem');
export default DxGantt;