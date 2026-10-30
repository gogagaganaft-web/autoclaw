import { createWidget, stub } from '../create-widget.js';
export const DxList = createWidget('dxList', ['items','dataSource','itemTemplate','showSelectionControls','selectionMode','onItemClick','onSelectionChanged']);
export const DxItem = stub('DxItem');
export default DxList;