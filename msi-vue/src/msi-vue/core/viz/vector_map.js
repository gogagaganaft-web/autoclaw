export default class VectorMap {
  constructor(element, options) {
    const Ctor = window.MSI?.viz?.dxVectorMap;
    if (!Ctor) { console.warn('[msi-vue] MSI.viz.dxVectorMap not found'); return; }
    return new Ctor(element, options);
  }
}