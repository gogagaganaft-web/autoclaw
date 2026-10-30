// FiltersPopup.js
const REPORT_BUTTON_TEXT = 'ОТЧЕТ';
export class FiltersPopup {
  constructor(context) {
    this.context = context;
    this.popupInstance = null;
    this.formContainer = null;
  }

  show() {
    var self = this;
    var filterKeys = [];
    var filters = this.context.report.filters || {};
    
    for (var key in filters) {
      if (filters.hasOwnProperty(key)) {
        filterKeys.push(key);
      }
    }
    
    if (filterKeys.length === 0) {
      DevExpress.ui.notify('Нет доступных фильтров', 'warning', 1500);
      return;
    }
    
    // Используем текущие значения из context.values
    this.context.tempValues = {};
    for (var field in this.context.values) {
      if (this.context.values.hasOwnProperty(field)) {
        if (Array.isArray(this.context.values[field])) {
          this.context.tempValues[field] = this.context.values[field].slice();
        } else if (typeof this.context.values[field] === 'object' && this.context.values[field] !== null) {
          this.context.tempValues[field] = JSON.parse(JSON.stringify(this.context.values[field]));
        } else {
          this.context.tempValues[field] = this.context.values[field];
        }
      }
    }
    
    console.log('FiltersPopup.show() - tempValues:', JSON.stringify(this.context.tempValues));
    
    this.context.tempTreeInstances.clear();
    
    this.formContainer = $('<div>').css({ padding: '20px', minWidth: '500px' });
    
    var formItems = this.buildFormItems(filterKeys);
    
    if (formItems.length === 0) {
      DevExpress.ui.notify('Нет элементов для отображения', 'warning', 1500);
      return;
    }
    
    this.createForm(formItems);
    this.createPopup();
  }

  buildFormItems(filterKeys) {
    var itemsWithOrder = [];
    var self = this;
    
    filterKeys.forEach(function(field) {
      var filterDef = self.context.sharedToolbar.find(function(f) { return f.field === field; });
      if (!filterDef) return;
      
      var tempValue = self.context.tempValues[field];
      
      console.log('buildFormItems - поле ' + field + ', значение:', tempValue);
      
      var formItem = self.context.formItemBuilder.createFormItem(filterDef, field, tempValue, true);
      if (formItem) {
        formItem.order = filterDef.formOrder !== undefined ? filterDef.formOrder : 999;
        if (filterDef.formColSpan !== undefined) formItem.colSpan = filterDef.formColSpan;
        formItem.colIndex = filterDef.formColIndex !== undefined ? filterDef.formColIndex : undefined;
        itemsWithOrder.push(formItem);
      }
    });
    
    itemsWithOrder.sort(function(a, b) { return a.order - b.order; });
    
    return itemsWithOrder;
  }

  createForm(formItems) {
    var self = this;
    this.formContainer.dxForm({
      formData: this.context.tempValues,
      labelLocation: 'top',
      colCount: 2,
      colCountByScreen: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
      items: formItems,
      onContentReady: function(e) {
        var items = e.component.option('items');
        items.forEach(function(item) {
          if (item._label) {
            var editor = e.component.getEditor(item.dataField);
            if (editor) {
              editor.option('label', item._label);
            }
          }
        });
      }
    });
  }

  createPopup() {
    var self = this;
    var $popup = $('<div>').appendTo('body');
    
    this.popupInstance = $popup.dxPopup({
      title: 'Набор данных для: ' + (this.context.report.text || this.context.report.key || 'Отчет'),
      width: 850,
      height: 'auto',
      visible: true,
      showCloseButton: true,
      showTitle: true,
      dragEnabled: true,
      resizeEnabled: true,
      contentTemplate: function() { return self.formContainer; },
      toolbarItems: [
        {
          widget: 'dxButton',
          toolbar: 'bottom',
          location: 'after',
          options: {
          text: REPORT_BUTTON_TEXT,
          icon: 'refresh',
          type: 'success',
          stylingMode: 'contained',
          onClick: function() { 
              self.applyFilters(); 
            }
          }
        }
      ],
      onHidden: function() {
        self.context.tempValues = {};
        self.context.tempTreeInstances.clear();
        $popup.remove();
        self.popupInstance = null;
      }
    }).dxPopup('instance');
  }

  applyFilters() {
    var self = this;
    
    console.log('applyFilters - tempValues:', JSON.stringify(this.context.tempValues));
    
    // Копируем все временные значения в основные (включая display поля)
    this.context.values = {};
    for (var field in this.context.tempValues) {
      if (this.context.tempValues.hasOwnProperty(field)) {
        if (Array.isArray(this.context.tempValues[field])) {
          this.context.values[field] = this.context.tempValues[field].slice();
        } else if (typeof this.context.tempValues[field] === 'object' && this.context.tempValues[field] !== null) {
          this.context.values[field] = JSON.parse(JSON.stringify(this.context.tempValues[field]));
        } else {
          this.context.values[field] = this.context.tempValues[field];
        }
      }
    }
    
    // Обновляем фильтры в отчете (только основные поля, без display)
    for (var field in this.context.values) {
      if (this.context.values.hasOwnProperty(field)) {
        if (field.indexOf('_displayText') === -1 && field.indexOf('_displayData') === -1) {
          if (this.context.report.filters && this.context.report.filters[field] !== undefined) {
            this.context.report.filters[field] = this.context.values[field];
          }
        }
      }
    }
    
    // Обновляем отчет
    this.context.refreshReport();
    this.context.addReportButton();
    this.context.updateReportButton();
    
    if (this.context.drawer) {
      this.context.drawer.toggle(false);
    }
    
    this.popupInstance.hide();
    //DevExpress.ui.notify('Отчет сформирован', 'success', 1500);
  }
}