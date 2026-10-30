export default class SelectBox {
  constructor(element, options) {
    const Ctor = window.MSI?.ui?.dxSelectBox;
    if (!Ctor) { console.warn('[msi-vue] MSI.ui.dxSelectBox not found'); return; }
    return new Ctor(element, options);
  }
}