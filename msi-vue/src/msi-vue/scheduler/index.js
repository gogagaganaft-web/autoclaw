import { createWidget, stub } from '../create-widget.js';
export const DxScheduler = createWidget('dxScheduler', ['dataSource','views','currentView','currentDate','startDayHour','endDayHour','onAppointmentClick']);
export const DxView = stub('DxView');
export const DxResource = stub('DxResource');
export default DxScheduler;