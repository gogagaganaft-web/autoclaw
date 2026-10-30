import { createWidget, configComponent } from '../create-widget.js';

export const DxRangeSelector = createWidget('dxRangeSelector', [
  'dataSource','chart','scale','behavior','sliderMarker','onValueChanged'
]);

export const DxSeries = configComponent('DxSeries');
export const DxCommonSeriesSettings = configComponent('DxCommonSeriesSettings');
export const DxChart = configComponent('DxChart');
export const DxValueAxis = configComponent('DxValueAxis');
export const DxArgumentAxis = configComponent('DxArgumentAxis');
export const DxScale = configComponent('DxScale');
export const DxLabel = configComponent('DxLabel');
export const DxFormat = configComponent('DxFormat');
export const DxTick = configComponent('DxTick');
export const DxMinorTick = configComponent('DxMinorTick');
export const DxGrid = configComponent('DxGrid');
export const DxMinorGrid = configComponent('DxMinorGrid');
export const DxMarker = configComponent('DxMarker');
export const DxBehavior = configComponent('DxBehavior');
export const DxSliderMarker = configComponent('DxSliderMarker');
export const DxMargin = configComponent('DxMargin');
export const DxBorder = configComponent('DxBorder');
export const DxFont = configComponent('DxFont');
export const DxSize = configComponent('DxSize');
export const DxLegend = configComponent('DxLegend');
export const DxTitle = configComponent('DxTitle');
export const DxTooltip = configComponent('DxTooltip');
export const DxExport = configComponent('DxExport');

// Aliases for direct imports without `as`
export const DxRangeSelectorChart = DxChart;
export const DxRangeSelectorLabel = DxLabel;

export default DxRangeSelector;