import { createWidget, stub } from '../create-widget.js';

export const DxFunnel = createWidget('dxFunnel', [
  'dataSource','argumentField','valueField','legend','title','tooltip','onItemClick'
]);

export const DxMargin = stub('DxMargin');
export const DxBorder = stub('DxBorder');
export const DxLegend = stub('DxLegend');
export const DxTitle = stub('DxTitle');
export const DxTooltip = stub('DxTooltip');
export const DxFont = stub('DxFont');
export const DxLabel = stub('DxLabel');
export const DxFormat = stub('DxFormat');
export const DxConnector = stub('DxConnector');
export const DxSize = stub('DxSize');
export const DxExport = stub('DxExport');
export const DxAnimation = stub('DxAnimation');
export const DxLoadingIndicator = stub('DxLoadingIndicator');
export const DxItem = stub('DxItem');

// Aliases for direct imports without `as`
export const DxFunnelLegend = DxLegend;

export default DxFunnel;