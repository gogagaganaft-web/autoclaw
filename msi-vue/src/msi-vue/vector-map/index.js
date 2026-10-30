import { createWidget, configComponent } from '../create-widget.js';

export const DxVectorMap = createWidget('dxVectorMap', [
  'layers','bounds','zoomFactor','center','onClick'
]);

// The vector map expects a `layers` array; DxLayer maps itself to that key.
export const DxLayer = configComponent('DxLayer', { key: 'layers', collection: true });
export const DxSource = configComponent('DxSource');
export const DxLegend = configComponent('DxLegend');
export const DxTooltip = configComponent('DxTooltip');
export const DxVectorMapTypes = {};
export const DxMargin = configComponent('DxMargin');
export const DxBorder = configComponent('DxBorder');
export const DxFont = configComponent('DxFont');
export const DxSize = configComponent('DxSize');
export const DxExport = configComponent('DxExport');

export default DxVectorMap;