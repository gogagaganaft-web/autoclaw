import { createWidget, configComponent } from '../create-widget.js';

export const DxPieChart = createWidget('dxPieChart', [
  'dataSource','series','legend','title','tooltip','onPointClick'
]);

export const DxSeries = configComponent('DxSeries');
export const DxLegend = configComponent('DxLegend');
export const DxTitle = configComponent('DxTitle');
export const DxTooltip = configComponent('DxTooltip');
export const DxFont = configComponent('DxFont');
export const DxMargin = configComponent('DxMargin');
export const DxBorder = configComponent('DxBorder');
export const DxSize = configComponent('DxSize');
export const DxLabel = configComponent('DxLabel');
export const DxFormat = configComponent('DxFormat');
export const DxConnector = configComponent('DxConnector');
export const DxExport = configComponent('DxExport');
export const DxAnimation = configComponent('DxAnimation');
export const DxLoadingIndicator = configComponent('DxLoadingIndicator');

// Aliases for direct imports without `as`
export const DxPieLabel = DxLabel;
export const DxPieSeries = DxSeries;
export const DxPieFont = DxFont;
export const DxPieMargin = DxMargin;
export const DxPieLegend = DxLegend;
export const DxPieSize = DxSize;

export default DxPieChart;