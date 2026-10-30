// FilterStorage.js
// Публичный API сохранён (saveFilters/loadFilters/clearFilters), но бэкенд —
// персональный серверный файл через UserViewStore (текущее состояние отчёта).
import { getUserViewStore, reportKeyOf } from './UserViewStore.js';

export class FilterStorage {

  constructor(reportKey, reportId) {
    this.reportKey = reportKeyOf({ id: reportId, key: reportKey });
    console.log('FilterStorage создан с ключом:', this.reportKey);
  }
  // Сохранить все значения фильтров (включая display поля)
  saveFilters(filters) {
    var store = getUserViewStore();
    if (!store || !this.reportKey) return;
    try {
      var filtersToSave = {};
      for (var field in filters) {
        if (filters.hasOwnProperty(field)) {
          if (Array.isArray(filters[field])) {
            filtersToSave[field] = filters[field].slice();
          } else if (typeof filters[field] === 'object' && filters[field] !== null) {
            filtersToSave[field] = JSON.parse(JSON.stringify(filters[field]));
          } else {
            filtersToSave[field] = filters[field];
          }
        }
      }
      store.setFilters(this.reportKey, filtersToSave);
      console.log('FilterStorage.saveFilters - сохранено для ключа ' + this.reportKey + ':', filtersToSave);
    } catch(e) {
      console.error('Ошибка сохранения фильтров:', e);
    }
  }

  // Загрузить значения фильтров
  loadFilters() {
    var store = getUserViewStore();
    if (!store || !this.reportKey) return null;
    try {
      var filters = store.getFilters(this.reportKey);
      if (filters) {
        console.log('FilterStorage.loadFilters - загружено для ключа ' + this.reportKey + ':', filters);
      }
      return filters;
    } catch(e) {
      console.error('Ошибка загрузки фильтров:', e);
      return null;
    }
  }

  // Очистить сохраненные фильтры
  clearFilters() {
    var store = getUserViewStore();
    if (!store || !this.reportKey) return;
    store.setFilters(this.reportKey, {});
    console.log('FilterStorage.clearFilters - очищено для ключа ' + this.reportKey);
  }
}
