export default class DataSource {
  constructor(options) {
    const Ctor = window.MSI?.data?.DataSource;
    if (!Ctor) {
      console.warn('[msi-vue] MSI.data.DataSource not found, using stub');
      this._options = options;
      this._items = options?.store?.data || [];
      return;
    }
    return new Ctor(options);
  }
}