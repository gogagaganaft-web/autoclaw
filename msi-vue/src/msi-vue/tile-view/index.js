import { createWidget } from '../create-widget.js';

export const DxTileView = createWidget('dxTileView', [
  'items', 'itemTemplate', 'baseItemWidth', 'baseItemHeight', 'itemMargin',
  'direction', 'height', 'width', 'showScrollbar', 'noDataText', 'onItemClick',
]);

export default DxTileView;
