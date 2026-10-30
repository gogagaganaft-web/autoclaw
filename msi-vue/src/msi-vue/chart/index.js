import { createWidget, configComponent } from '../create-widget.js';

export const DxChart = createWidget('dxChart', [
  'dataSource','series','commonSeriesSettings','argumentAxis','valueAxis','legend','title','tooltip','onPointClick'
]);

export const DxSeries = configComponent('DxSeries');
export const DxCommonSeriesSettings = configComponent('DxCommonSeriesSettings');
export const DxCommonAxisSettings = configComponent('DxCommonAxisSettings');
export const DxSeriesTemplate = configComponent('DxSeriesTemplate');
export const DxPoint = configComponent('DxPoint');
export const DxArgumentAxis = configComponent('DxArgumentAxis');
export const DxValueAxis = configComponent('DxValueAxis');
export const DxLegend = configComponent('DxLegend');
export const DxTitle = configComponent('DxTitle');
export const DxTooltip = configComponent('DxTooltip');
export const DxMargin = configComponent('DxMargin');
export const DxBorder = configComponent('DxBorder');
export const DxFont = configComponent('DxFont');
export const DxLabel = configComponent('DxLabel');
export const DxFormat = configComponent('DxFormat');
export const DxTick = configComponent('DxTick');
export const DxMinorTick = configComponent('DxMinorTick');
export const DxGrid = configComponent('DxGrid');
export const DxMinorGrid = configComponent('DxMinorGrid');
export const DxStrip = configComponent('DxStrip');
export const DxConstantLine = configComponent('DxConstantLine');
export const DxPane = configComponent('DxPane');
export const DxSize = configComponent('DxSize');
export const DxExport = configComponent('DxExport');
export const DxAnimation = configComponent('DxAnimation');
export const DxLoadingIndicator = configComponent('DxLoadingIndicator');
export const DxZoomAndPan = configComponent('DxZoomAndPan');

// Aliases for direct imports without `as`
export const DxChartLabel = DxLabel;
export const DxChartFormat = DxFormat;

export default DxChart;