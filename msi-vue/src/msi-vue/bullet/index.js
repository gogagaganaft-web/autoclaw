import { createWidget, stub } from '../create-widget.js';

export const DxBullet = createWidget('dxBullet', [
  'value','target','showTarget','showZeroLevel','startScaleValue','endScaleValue'
]);

export const DxTooltip = stub('DxTooltip');
export const DxSize = stub('DxSize');
export const DxFormat = stub('DxFormat');
export const DxMargin = stub('DxMargin');
export const DxBorder = stub('DxBorder');
export const DxFont = stub('DxFont');
export const DxLabel = stub('DxLabel');
export const DxExport = stub('DxExport');
export const DxAnimation = stub('DxAnimation');
export const DxLoadingIndicator = stub('DxLoadingIndicator');

// Aliases for direct imports without `as`
export const DxBulletTooltip = DxTooltip;
export const DxBulletSize = DxSize;

export default DxBullet;