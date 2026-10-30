// FormItemBuilder.js
import { FondTreeList } from './FondTreeList.js';
import { FullTreeList } from './FullTreeList.js';
import { DateUtils } from './DateUtils.js';

export class FormItemBuilder {
  constructor(context) {
    this.context = context;
  }

  buildFormItems(filters) {
    var itemsWithOrder = [];
    var self = this;

    Object.keys(filters).forEach(function(field) {
      var filterDef = self.context.sharedToolbar.find(function(f) { return f.field === field; });
      if (!filterDef) return;

      var value = self.context.values[field] !== undefined ? self.context.values[field] : filters[field];

      if (filterDef.dynamicDefault) {
        var now = new Date();
        if (filterDef.type === 'dateRangeMonths') {
          filterDef.calendarOptions = filterDef.calendarOptions || {};
          if (!filterDef.calendarOptions.min) filterDef.calendarOptions.min = new Date(now.getFullYear() - 1, 0, 1);
          if (!filterDef.calendarOptions.max) filterDef.calendarOptions.max = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          if (!value || typeof value !== 'object' || Object.keys(value).length === 0 ||
              (!value.Начало && !value.Окончание && !value.start && !value.end)) {
            var lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            var ds = lm.getFullYear() + '-' + String(lm.getMonth() + 1).padStart(2, '0') + '-01';
            value = { Начало: ds, Окончание: ds };
            filters[field] = value;
            self.context.values[field] = value;
          }
        }
        if (filterDef.type === 'dateRange') {
          if (!filterDef.minDate)
            filterDef.minDate = (now.getFullYear() - 1) + '-01-01';
          if (!filterDef.maxDate) {
            filterDef.maxDate = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
          }
          // Дефолтное значение, если не задано (с начала месяца до сегодня)
          if (!value || typeof value !== 'object' || Object.keys(value).length === 0 ||
              (!value.start && !value.end && !value.Начало && !value.Окончание)) {
            var monthStart = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-01';
            value = { start: monthStart, end: filterDef.maxDate };
            filters[field] = value;
            self.context.values[field] = value;
          }
        }
        if ((filterDef.type === 'select' || filterDef.type === 'multi-select-list') && (!filterDef.items || filterDef.items.length === 0)) {
          var months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
          var items = [];
          var endYear = now.getFullYear();
          var endMonth = now.getMonth();
          var startYear = endYear - 1;
          for (var y = endYear; y >= startYear; y--) {
            var mStart = (y === endYear) ? endMonth : 11;
            var mEnd = (y === startYear) ? 0 : 0;
            for (var m = mStart; m >= mEnd; m--) {
              items.push({ id: y * 10000 + (m + 1) * 100 + 1, name: y + ' ' + months[m] });
            }
          }
          filterDef.items = items;
        }
      }

      var formItem = self.createFormItem(filterDef, field, value, false);
      if (formItem) {
        formItem.order = filterDef.formOrder !== undefined ? filterDef.formOrder : 999;
        if (filterDef.formColSpan !== undefined) formItem.colSpan = filterDef.formColSpan;
        itemsWithOrder.push(formItem);
      }
    });

    itemsWithOrder.sort(function(a, b) { return a.order - b.order; });
    return itemsWithOrder;
  }

  createFormItem(filterDef, field, value, useTempStorage) {
    var type = filterDef.type;

    // Универсальный предзагрузчик: любой фильтр с preload:true + itemsQuery + dbName
    if (filterDef.preload === true && filterDef.itemsQuery && filterDef.dbName) {
        var execUrl = (this.context.globalSettings && this.context.globalSettings.serverExecuteUrl) || 'http://localhost:7501/api/execute';
        FullTreeList.preload(filterDef.dbName, filterDef.itemsQuery, execUrl);
    }

    switch (type) {
      case "hierarchical-list":
        return this.createHierarchicalListItem(filterDef, field, value, useTempStorage);
      case "hr-fond":
        return this.createHrFondItem(filterDef, field, value, useTempStorage);
      case "dateRange":
        return this.createDateRangeItem(filterDef, field, value, useTempStorage);
      case "select":
        return this.createSelectItem(filterDef, field, value, useTempStorage);
      case "multi-select":
      case "multi-select-fl":
        return this.createMultiSelectItem(filterDef, field, value, useTempStorage);
      case "multi-select-list":
        return this.createMultiSelectListItem(filterDef, field, value, useTempStorage);
      case "button-group":
        return this.createButtonGroupItem(filterDef, field, value, useTempStorage);
      case "dateRangeMonths":
        return this.createDateRangeMonthsItem(filterDef, field, value, useTempStorage);
      case "range-months":
        return this.createRangeMonthsItem(filterDef, field, value, useTempStorage);
      case "range-days":
        return this.createRangeDaysItem(filterDef, field, value, useTempStorage);
      case "range-number":
        return this.createRangeNumberItem(filterDef, field, value, useTempStorage);
      default:
        return null;
    }
  }

  createHierarchicalListItem(filterDef, field, value, useTempStorage) {
    var dbName = filterDef.dbName;
    var label = filterDef.placeholder || filterDef.label;
    var placeholder = filterDef.placeholder;
    var width = filterDef.width || '100%';
    var height = filterDef.height || '400px';
    var showClearButton = false;
    var labelMode = filterDef.labelMode || 'static';
    
    if (!dbName) {
        console.error('Для поля ' + field + ' не указано dbName');
        return null;
    }

    var containerId = 'tree-container-' + field + '-' + Date.now() + (useTempStorage ? '-temp' : '-main');
    var selectedValue = [];
    var selectedText = '';
    var selectedData = [];
    
    // Если есть сохраненное значение, восстанавливаем
    if (Array.isArray(value)) {
        selectedValue = value.slice();
    } else if (value !== null && value !== undefined) {
        selectedValue = [value];
    }
    
    var targetTreeInstances = useTempStorage ? this.context.tempTreeInstances : this.context.treeInstances;
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    
    var displayTextField = field + '_displayText';
    var displayDataField = field + '_displayData';
    
    // Восстанавливаем текст из сохраненных display полей
    if (targetValues[displayTextField]) {
        selectedText = targetValues[displayTextField];
        selectedData = targetValues[displayDataField] || [];
    } else if (selectedValue.length > 0) {
        // Если нет сохраненного текста, но есть ID, показываем ID как временное решение
        selectedText = selectedValue.join(', ');
    }
    
    console.log('createHierarchicalListItem - поле ' + field + ', selectedValue:', selectedValue);
    console.log('createHierarchicalListItem - восстановленный текст:', selectedText);
    
    // Получаем URL сервера из глобальных настроек
    var serverExecuteUrl = this.context.globalSettings ? this.context.globalSettings.serverExecuteUrl : 'https://sp.kaesbt.ru:7501/api/execute';
    
    return {
        dataField: field,
        label: { text: label }, _label: filterDef.label,
        colSpan: 2,
        editorType: 'dxDropDownBox',
        editorOptions: {
            placeholder: placeholder || 'Выбрать...',
                displayExpr: 'name',
            valueExpr: 'id',
            value: selectedValue,
            labelMode: labelMode,
            
            showClearButton: showClearButton,
            dataSource: selectedData,
            text: selectedText,
            contentTemplate: function(e) {
                var $treeContainer = $('<div>').attr('id', containerId).css({ 
                    width: '100%', 
                    height: height,
                    overflow: 'auto'
                });
                
                var treeInstance = new FondTreeList({
                    container: $treeContainer,
                    rootValue: 0,
                    dbName: dbName,
                    fetchUrl: serverExecuteUrl,
                    dropDownInstance: e.component,
                    initialSelectedIds: selectedValue,
                    onSelectionChange: function(ids, items) {
                        targetValues[field] = ids;
                        targetValues[displayTextField] = items.map(function(i) { return i.name; }).join(', ');
                        targetValues[displayDataField] = items;
                        console.log('Сохранены данные для поля ' + field + ':');
                        console.log('  IDs:', ids);
                        console.log('  Текст:', targetValues[displayTextField]);
                    }
                });
                
                targetTreeInstances.set(field, treeInstance);
                
                return $treeContainer;
            },
            onValueChanged: function(e) {
                var treeInstance = targetTreeInstances.get(field);
                if (!treeInstance) return;

                var currentValue = e.value || [];
                targetValues[field] = currentValue;

                var selectedItems = treeInstance.getSelectedItems();

                // Clear button — очищаем дерево
                if (currentValue.length === 0 && selectedItems.length > 0) {
                    treeInstance.deselectAll();
                    selectedItems = [];
                }

                if (selectedItems && selectedItems.length > 0) {
                    var displayText = selectedItems.map(function(i) { return i.name; }).join(', ');
                    targetValues[displayTextField] = displayText;
                    targetValues[displayDataField] = selectedItems;
                } else {
                    targetValues[displayTextField] = '';
                    targetValues[displayDataField] = [];
                }
            },
            onOpened: function(e) {
                var treeInstance = targetTreeInstances.get(field);
                if (treeInstance && treeInstance.updateDimensions) {
                    setTimeout(function() { 
                        treeInstance.updateDimensions(); 
                    }, 100);
                }
            }
        }
    };
  }

  createHrFondItem(filterDef, field, value, useTempStorage) {
    var dbName = filterDef.dbName;
    var itemsQuery = filterDef.itemsQuery;
    var label = filterDef.placeholder || filterDef.label;
    var placeholder = filterDef.placeholder;
    var width = filterDef.width || '100%';
    var height = filterDef.height || '400px';
    var showClearButton = filterDef.showClearButton !== undefined ? filterDef.showClearButton : true;
    var labelMode = filterDef.labelMode || 'static';

    if (!dbName) {
        console.error('Для поля ' + field + ' не указано dbName');
        return null;
    }

    if (!itemsQuery) {
        console.error('Для поля ' + field + ' не указан itemsQuery');
        return null;
    }

    var containerId = 'hr-tree-container-' + field + '-' + Date.now() + (useTempStorage ? '-temp' : '-main');
    var selectedValue = [];
    var selectedText = '';
    var selectedData = [];

    if (Array.isArray(value)) {
        selectedValue = value.slice();
    } else if (value !== null && value !== undefined) {
        selectedValue = [value];
    }

    var targetTreeInstances = useTempStorage ? this.context.tempTreeInstances : this.context.treeInstances;
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;

    var displayTextField = field + '_displayText';
    var displayDataField = field + '_displayData';

    if (targetValues[displayTextField]) {
        selectedText = targetValues[displayTextField];
        selectedData = targetValues[displayDataField] || [];
    } else if (selectedValue.length > 0) {
        selectedText = selectedValue.join(', ');
    }

    console.log('createHrFondItem - поле ' + field + ', selectedValue:', selectedValue);

    var serverExecuteUrl = this.context.globalSettings ? this.context.globalSettings.serverExecuteUrl : 'https://sp.kaesbt.ru:7501/api/execute';

    return {
        dataField: field,
        label: { text: label }, _label: filterDef.label,
        colSpan: 2,
        editorType: 'dxDropDownBox',
        editorOptions: {
            placeholder: placeholder || 'Выбрать...',
                displayExpr: 'name',
            valueExpr: 'id',
            value: selectedValue,
            labelMode: labelMode,

            showClearButton: showClearButton,
            dataSource: selectedData,
            text: selectedText,
            contentTemplate: function(e) {
                var $treeContainer = $('<div>').attr('id', containerId).css({
                    width: '100%',
                    height: height,
                    overflow: 'auto'
                });

                var treeInstance = new FullTreeList({
                    container: $treeContainer,
                    rootValue: 0,
                    dbName: dbName,
                    fetchUrl: serverExecuteUrl,
                    dropDownInstance: e.component,
                    initialSelectedIds: selectedValue,
                    itemsQuery: itemsQuery,
                    onSelectionChange: function(ids, items) {
                        targetValues[field] = ids;
                        targetValues[displayTextField] = items.map(function(i) { return i.name; }).join(', ');
                        targetValues[displayDataField] = items;
                        console.log('Сохранены данные для поля ' + field + ':');
                        console.log('  IDs:', ids);
                        console.log('  Текст:', targetValues[displayTextField]);
                    }
                });

                targetTreeInstances.set(field, treeInstance);

                return $treeContainer;
            },
            onValueChanged: function(e) {
                var treeInstance = targetTreeInstances.get(field);
                if (!treeInstance) return;

                var currentValue = e.value || [];
                targetValues[field] = currentValue;

                var selectedItems = treeInstance.getSelectedItems();

                // Clear button — очищаем дерево
                if (currentValue.length === 0 && selectedItems.length > 0) {
                    treeInstance.deselectAll();
                    selectedItems = [];
                }

                if (selectedItems && selectedItems.length > 0) {
                    var displayText = selectedItems.map(function(i) { return i.name; }).join(', ');
                    targetValues[displayTextField] = displayText;
                    targetValues[displayDataField] = selectedItems;
                } else {
                    targetValues[displayTextField] = '';
                    targetValues[displayDataField] = [];
                }
            },
            onOpened: function(e) {
                var treeInstance = targetTreeInstances.get(field);
                if (treeInstance) {
                    setTimeout(function() {
                        if (treeInstance.updateDimensions) treeInstance.updateDimensions();
                        if (treeInstance.focusFilterRow) treeInstance.focusFilterRow();
                    }, 200);
                }
            }
        }
    };
  }

  createDateRangeItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var width = filterDef.width || '100%';
    var labelMode = filterDef.labelMode || 'static';
    var applyValueMode = filterDef.applyValueMode || 'instantly';
    var displayFormat = filterDef.displayFormat || 'dd.MM.yyyy';
    var placeholder = filterDef.placeholder || 'Выберите период';
    var calendarZoomLevel = filterDef.calendarZoomLevel || 'month';
    var minDate = filterDef.minDate;
    var maxDate = filterDef.maxDate;
    var firstDayOfWeek = filterDef.firstDayOfWeek !== undefined ? filterDef.firstDayOfWeek : 1;
    var calendarOptions = filterDef.calendarOptions || {};
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    var self = this;
    
    var autoSave = this.context.autoSaveFilters ? this.context.autoSaveFilters.bind(this.context) : function() {};
    
    var initialDateRange = [null, null];
    if (value) {
      if (value.start && value.end) {
        initialDateRange = [new Date(value.start), new Date(value.end)];
      } else if (Array.isArray(value) && value.length === 2) {
        var d0 = value[0], d1 = value[1];
        if (d0 instanceof Date && d1 instanceof Date && !isNaN(d0.getTime()) && !isNaN(d1.getTime())) {
          initialDateRange = [d0, d1];
        } else {
          var pd0 = new Date(d0), pd1 = new Date(d1);
          if (!isNaN(pd0.getTime()) && !isNaN(pd1.getTime())) {
            initialDateRange = [pd0, pd1];
          }
        }
      }
    }
    
    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      colSpan: 2,
      editorType: 'dxDateRangeBox',
      editorOptions: {
        labelMode: labelMode,
        
        applyValueMode: applyValueMode,
        value: initialDateRange,
        displayFormat: displayFormat,
        placeholder: placeholder,
        hoverStateEnabled: true,
        elementAttr: {
          class: "days-calendar"
        },
        calendarOptions: {
          zoomLevel: calendarZoomLevel,
          min: minDate ? new Date(minDate) : undefined,
          max: maxDate ? new Date(maxDate) : undefined,
          selectionMode: 'range',
          firstDayOfWeek: firstDayOfWeek,
          ...calendarOptions
        },
        onValueChanged: function(e) {
          var val = e.value || [];
          if (val.length === 2 && val[0] && val[1]) {
            var startDate = val[0] instanceof Date && !isNaN(val[0]) ? val[0] : null;
            var endDate = val[1] instanceof Date && !isNaN(val[1]) ? val[1] : null;
            
            if (startDate && endDate) {
              targetValues[field] = {
                start: DateUtils.toISODate(startDate),
                end: DateUtils.toISODate(endDate)
              };
              autoSave();
            }
          } else {
            targetValues[field] = null;
          }
        }
      }
    };
  }

  createSelectItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var items = filterDef.items;
    var width = filterDef.width || '100%';
    var labelMode = filterDef.labelMode || 'static';
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    
    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      editorType: 'dxSelectBox',
      editorOptions: {
        labelMode: labelMode,
        
        dataSource: items,
        displayExpr: 'name',
        valueExpr: 'id',
        value: value,
        onValueChanged: function(e) {
          targetValues[field] = e.value;
        }
      }
    };
  }

  createMultiSelectItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var items = filterDef.items;
    var width = filterDef.width || '100%';
    var labelMode = filterDef.labelMode || 'static';
    var multiline = filterDef.multiline !== undefined ? filterDef.multiline : false;
    var showSelectionControls = filterDef.showSelectionControls !== undefined ? filterDef.showSelectionControls : true;
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    
    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      colSpan: 2,
      editorType: 'dxTagBox',
      editorOptions: {
        labelMode: labelMode,
        
        items: items,
        value: Array.isArray(value) ? value : [],
        multiline: multiline,
        valueExpr: 'id',
        displayExpr: 'name',
        showSelectionControls: showSelectionControls,
        onValueChanged: function(e) {
          targetValues[field] = e.value;
        }
      }
    };
  }

  createMultiSelectListItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var items = filterDef.items || [];
    var itemsQuery = filterDef.itemsQuery;
    var dbName = filterDef.dbName;
    var width = filterDef.width || '100%';
    var labelMode = filterDef.labelMode || 'static';
    var showClearButton = filterDef.showClearButton !== undefined ? filterDef.showClearButton : true;
    var showSelectionControls = filterDef.showSelectionControls !== undefined ? filterDef.showSelectionControls : true;
    var selectAllMode = filterDef.selectAllMode || 'allPages';
    var searchEnabled = filterDef.searchEnabled !== undefined ? filterDef.searchEnabled : true;
    var searchExpr = filterDef.searchExpr || ['name'];
    var searchMode = filterDef.searchMode || 'contains';
    var searchTimeout = filterDef.searchTimeout || 500;
    var searchPlaceholder = filterDef.searchPlaceholder || 'Поиск...';
    var pageLoadMode = filterDef.pageLoadMode || 'scrollBottom';
    var showScrollbar = filterDef.showScrollbar || 'onHover';
    
    var selectedValues = Array.isArray(value) ? value : [];
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    var listInstance = null;
    var resolvedItems = items;
    var self = this;

    // Загружаем динамические элементы из БД
    if (itemsQuery && dbName) {
      var cacheKey = field + '_items';
      if (this.context._itemsCache && this.context._itemsCache[cacheKey]) {
        resolvedItems = this.context._itemsCache[cacheKey];
      } else {
        var execUrl = (this.context.globalSettings && this.context.globalSettings.serverExecuteUrl) || 'http://localhost:7501/api/execute';
        $.ajax({
          url: execUrl,
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ dbName: dbName, sql: itemsQuery }),
          async: false,
          success: function(resp) {
            if (resp.rows) {
              resolvedItems = resp.rows.map(function(row) {
                return { id: row[0], name: row[1] };
              });
              resolvedItems.unshift({ id: -1, name: 'Не указан' });
              if (!self.context._itemsCache) self.context._itemsCache = {};
              self.context._itemsCache[cacheKey] = resolvedItems;
            }
          }
        });
      }
    }
    
    // Поля для хранения названий
    var displayTextField = field + '_displayText';
    var displayDataField = field + '_displayData';
    
    // Формируем начальные названия
    var initialText = '';
    var initialDisplayData = [];
    if (selectedValues.length > 0 && resolvedItems) {
      for (var i = 0; i < selectedValues.length; i++) {
        var found = null;
        for (var j = 0; j < resolvedItems.length; j++) {
          if (resolvedItems[j].id === selectedValues[i]) {
            found = resolvedItems[j];
            break;
          }
        }
        if (found) {
          initialDisplayData.push({ id: found.id, name: found.name });
          initialText += (initialText ? ', ' : '') + found.name;
        }
      }
      targetValues[displayTextField] = initialText;
      targetValues[displayDataField] = initialDisplayData;
    }
    
    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      colSpan: 2,
      editorType: 'dxDropDownBox',
      editorOptions: {
        value: selectedValues,
        valueExpr: 'id',
        displayExpr: 'name',
        labelMode: labelMode,
        
        showClearButton: showClearButton,
        showSelectionControls: showSelectionControls,
        dataSource: resolvedItems,
        text: initialText,
        contentTemplate: function(e) {
          var $list = $('<div>');
          listInstance = $list;
          $list.dxList({
            dataSource: resolvedItems,
            selectionMode: 'all',
            showSelectionControls: true,
            selectedItemKeys: selectedValues,
            selectAllMode: selectAllMode,
            keyExpr: 'id',
            displayExpr: 'name',
            searchEnabled: searchEnabled,
            searchExpr: searchExpr,
            searchMode: searchMode,
            searchTimeout: searchTimeout,
            searchPlaceholder: searchPlaceholder,
            pageLoadMode: pageLoadMode,
            showScrollbar: showScrollbar,
            onSelectionChanged: function(args) {
              var selected = args.component.option('selectedItemKeys');
              e.component.option('value', selected);
              targetValues[field] = selected;
              
              // Сохраняем названия
              var selectedItems = [];
              var selectedNames = [];
              for (var k = 0; k < selected.length; k++) {
                var foundItem = null;
                for (var m = 0; m < items.length; m++) {
                  if (items[m].id === selected[k]) {
                    foundItem = items[m];
                    break;
                  }
                }
                if (foundItem) {
                  selectedItems.push({ id: foundItem.id, name: foundItem.name });
                  selectedNames.push(foundItem.name);
                }
              }
              targetValues[displayTextField] = selectedNames.join(', ');
              targetValues[displayDataField] = selectedItems;
            }
          });
          return $list;
        },
        onValueChanged: function(e) {
          var selected = e.value || [];
          targetValues[field] = selected;
          
          // Сохраняем названия
          var selectedItems = [];
          var selectedNames = [];
          for (var k = 0; k < selected.length; k++) {
            var foundItem = null;
            for (var m = 0; m < items.length; m++) {
              if (items[m].id === selected[k]) {
                foundItem = items[m];
                break;
              }
            }
            if (foundItem) {
              selectedItems.push({ id: foundItem.id, name: foundItem.name });
              selectedNames.push(foundItem.name);
            }
          }
          targetValues[displayTextField] = selectedNames.join(', ');
          targetValues[displayDataField] = selectedItems;
          
          if (listInstance) {
            listInstance.dxList('instance').option('selectedItemKeys', selected);
          }
        }
      }
    };
  }

  createButtonGroupItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var items = filterDef.items;
    var width = filterDef.width || '100%';
    var multiple = filterDef.multiple !== undefined ? filterDef.multiple : false;
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    
    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      editorType: 'dxButtonGroup',
      editorOptions: {
        items: items,
        keyExpr: 'id',
        displayExpr: 'text',
        selectionMode: multiple ? 'multiple' : 'single',
        selectedItemKeys: Array.isArray(value) ? value : [value],
        stylingMode: 'text',
        onSelectionChanged: function(e) {
          var sel = e.component.option('selectedItemKeys');
          targetValues[field] = multiple ? sel : sel[0];
        }
      }
    };
  }

createDateRangeMonthsItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var width = filterDef.width || '100%';
    var labelMode = filterDef.labelMode || 'static';
    var displayFormat = filterDef.displayFormat || 'MMM yyyy';
    var pickerType = filterDef.pickerType || 'calendar';
    var calendarOptions = filterDef.calendarOptions || {};
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    
    // Определяем min и max из calendarOptions или используем значения по умолчанию
    var minDate = calendarOptions.min ? new Date(calendarOptions.min) : new Date(2025, 0, 1);
    var maxDate = calendarOptions.max ? new Date(calendarOptions.max) : new Date(2025, 11, 1);
    
    // Инициализация начальных дат
    var initialStart = null;
    var initialEnd = null;
    
    // Проверяем разные варианты входных данных
    if (value && typeof value === 'object') {
        if (value.start && value.end) {
            // Формат {start: "2025-01-01", end: "2025-12-01"}
            var startFromValue = new Date(value.start);
            var endFromValue = new Date(value.end);
            if (!isNaN(startFromValue.getTime()) && !isNaN(endFromValue.getTime())) {
                initialStart = DateUtils.startOfMonth(startFromValue);
                initialEnd = DateUtils.startOfMonth(endFromValue);
            }
        } else if (value.Начало && value.Окончание) {
            // Формат {Начало: "2025-01-01", Окончание: "2025-12-01"}
            var startFromValue = new Date(value.Начало);
            var endFromValue = new Date(value.Окончание);
            if (!isNaN(startFromValue.getTime()) && !isNaN(endFromValue.getTime())) {
                initialStart = DateUtils.startOfMonth(startFromValue);
                initialEnd = DateUtils.startOfMonth(endFromValue);
            }
        } else if (Array.isArray(value) && value.length === 2) {
            // Формат [Date, Date]
            var d0 = value[0];
            var d1 = value[1];
            if (d0 && d1) {
                if (d0 instanceof Date && d1 instanceof Date && !isNaN(d0.getTime()) && !isNaN(d1.getTime())) {
                    initialStart = DateUtils.startOfMonth(d0);
                    initialEnd = DateUtils.startOfMonth(d1);
                } else {
                    var parsed0 = new Date(d0);
                    var parsed1 = new Date(d1);
                    if (!isNaN(parsed0.getTime()) && !isNaN(parsed1.getTime())) {
                        initialStart = DateUtils.startOfMonth(parsed0);
                        initialEnd = DateUtils.startOfMonth(parsed1);
                    }
                }
            }
        }
    }
    
    // Если значение не передано или не распознано, используем min и max из конфигурации
    if (!initialStart || !initialEnd) {
        initialStart = DateUtils.startOfMonth(minDate);
        initialEnd = DateUtils.startOfMonth(maxDate);
    }
    
    // Дополнительная проверка: если начальная дата больше конечной, меняем их местами
    if (initialStart > initialEnd) {
        var temp = initialStart;
        initialStart = initialEnd;
        initialEnd = temp;
    }
    
    // Убеждаемся, что даты не выходят за пределы min/max
    if (initialStart < minDate) initialStart = DateUtils.startOfMonth(minDate);
    if (initialEnd > maxDate) initialEnd = DateUtils.startOfMonth(maxDate);
    
    // ВАЖНО: Инициализируем targetValues правильным форматом
    var initialStartISO = DateUtils.toISODate(initialStart);
    var initialEndISO = DateUtils.toISODate(initialEnd);
    
    // Устанавливаем значение в targetValues, если оно еще не установлено или отличается
    var currentTargetValue = targetValues[field];
    if (!currentTargetValue || 
        currentTargetValue.start !== initialStartISO || 
        currentTargetValue.end !== initialEndISO) {
        targetValues[field] = { 
            start: initialStartISO, 
            end: initialEndISO 
        };
        // Синхронизация с Период
        if (field !== 'Период') {
          targetValues['Период'] = { start: initialStartISO, end: initialEndISO };
        }
        console.log('Инициализирован ' + field + ':', targetValues[field]);
    }
    
    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      colSpan: 2,
      editorType: 'dxDateRangeBox',
      editorOptions: {
        labelMode: labelMode,
        
        displayFormat: displayFormat,
        pickerType: pickerType,
        value: [initialStart, initialEnd],
        elementAttr: {
          class: "months-calendar"
        },
        calendarOptions: {
          zoomLevel: calendarOptions.zoomLevel || 'year',
          calendarView: calendarOptions.calendarView || 'month',
          maxZoomLevel: calendarOptions.maxZoomLevel || 'year',
          minZoomLevel: calendarOptions.minZoomLevel || 'year',
          min: minDate,
          max: maxDate,
          selectionMode: calendarOptions.selectionMode || 'range',
          ...calendarOptions,
          onOptionChanged: function(e) {
            // Сохраняем оригинальный обработчик из конфигурации, если он есть
            if (calendarOptions.onOptionChanged && typeof calendarOptions.onOptionChanged === 'function') {
              calendarOptions.onOptionChanged(e);
            }
            if (e.name === 'zoomLevel' && e.value !== 'year') {
              e.component.option('zoomLevel', 'year');
            }
          },
          onInitialized: function(e) {
            // Сохраняем оригинальный обработчик из конфигурации, если он есть
            if (calendarOptions.onInitialized && typeof calendarOptions.onInitialized === 'function') {
              calendarOptions.onInitialized(e);
            }
            var $calendarElement = e.component.$element();
            if ($calendarElement && !$calendarElement.hasClass('months-calendar-inner')) {
              $calendarElement.addClass('months-calendar-inner');
            }
          },
          onOpened: function(e) {
            // Сохраняем оригинальный обработчик из конфигурации, если он есть
            if (calendarOptions.onOpened && typeof calendarOptions.onOpened === 'function') {
              calendarOptions.onOpened(e);
            }
            var calendar = e.component.getCalendar();
            if (calendar) {
              var $calendarElement = calendar.$element();
              if ($calendarElement && !$calendarElement.hasClass('months-calendar-inner')) {
                $calendarElement.addClass('months-calendar-inner');
              }
              
              calendar.option('min', minDate);
              calendar.option('max', maxDate);
              calendar.option('zoomLevel', calendarOptions.zoomLevel || 'year');
              calendar.option('calendarView', calendarOptions.calendarView || 'month');
              var currentValue = e.component.option('value');
              var currentDate = (currentValue && currentValue[0]) ? currentValue[0] : minDate;
              calendar.option('currentDate', currentDate);
            }
          }
        },
        onValueChanged: function(e) {
          var val = e.value || [];
          if (val.length !== 2) return;

          var startDate = val[0] instanceof Date && !isNaN(val[0]) ? val[0] : null;
          var endDate = val[1] instanceof Date && !isNaN(val[1]) ? val[1] : null;
          if (!startDate || !endDate) return;

          var start = DateUtils.startOfMonth(startDate);
          var end = DateUtils.startOfMonth(endDate);
          
          // Ограничиваем значения min и max
          if (start < minDate) start = DateUtils.startOfMonth(minDate);
          if (end > maxDate) end = DateUtils.startOfMonth(maxDate);
          
          // Устанавливаем value как массив Date объектов для отображения
          e.component.option('value', [start, end]);

          // Сохраняем в targetValues как объект с ISO строками
          var startISO = DateUtils.toISODate(start);
          var endISO = DateUtils.toISODate(end);
          
          // Проверяем, изменилось ли значение перед сохранением
          var currentValue = targetValues[field];
          if (!currentValue || 
              currentValue.start !== startISO || 
              currentValue.end !== endISO) {
            targetValues[field] = { 
              start: startISO, 
              end: endISO 
            };
            // Синхронизация с Период
            if (field !== 'Период') {
              targetValues['Период'] = { start: startISO, end: endISO };
            }
            if (self.context && typeof self.context.autoSaveFilters === 'function') {
              self.context.autoSaveFilters();
            }
          }
          
          console.log('Сохранен ПериодМесяцы:', targetValues[field]);
        }
      }
    };
}

  createRangeMonthsItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var width = filterDef.width || '100%';
    var height = filterDef.height || 65;
    var maxRange = filterDef.maxRange;
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    var self = this;
    
    // Читаем даты из сохранённого значения, схемы отчёта или умолчаний
    var startDate = null;
    var endDate = null;

    if (value && typeof value === 'object') {
        if (value.start && value.end) {
            startDate = new Date(value.start);
            endDate = new Date(value.end);
        } else if (value.Начало && value.Окончание) {
            startDate = new Date(value.Начало);
            endDate = new Date(value.Окончание);
        } else if (Array.isArray(value) && value.length === 2) {
            var d0 = value[0], d1 = value[1];
            if (d0 instanceof Date && d1 instanceof Date && !isNaN(d0.getTime()) && !isNaN(d1.getTime())) {
                startDate = d0;
                endDate = d1;
            } else {
                startDate = new Date(d0);
                endDate = new Date(d1);
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                    startDate = endDate = null;
                }
            }
        }
    }

    // Fallback к схеме отчёта
    var schemaStart = (this.context.report.filters && this.context.report.filters.Период && this.context.report.filters.Период.Начало)
      ? new Date(this.context.report.filters.Период.Начало)
      : new Date(new Date().getFullYear(), 0, 1);
    var schemaEnd = (this.context.report.filters && this.context.report.filters.Период && this.context.report.filters.Период.Окончание)
      ? new Date(this.context.report.filters.Период.Окончание)
      : new Date();

    if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        startDate = schemaStart;
        endDate = schemaEnd;
    }

    // Инициализация targetValues, если ещё не установлены
    if (!targetValues[field]) {
        var initStart = DateUtils.toISODate(DateUtils.startOfMonth(startDate));
        var initEnd = DateUtils.toISODate(DateUtils.startOfMonth(endDate));
        targetValues[field] = { start: initStart, end: initEnd };
        if (field !== 'ПериодМесяцы') {
            targetValues['ПериодМесяцы'] = { start: initStart, end: initEnd };
        }
    }

    // Шкала — весь допустимый диапазон из схемы
    var scaleStart = DateUtils.startOfMonth(schemaStart);
    var scaleEnd = new Date(schemaEnd);
    scaleEnd.setMonth(scaleEnd.getMonth() + 1);
    scaleEnd = DateUtils.startOfMonth(scaleEnd);

    // Для dxRangeSelector: правый маркер на 1-м СЛЕДУЮЩЕГО месяца
    var widgetEndDate = new Date(endDate);
    widgetEndDate.setMonth(widgetEndDate.getMonth() + 1);
    
    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      colSpan: 2,
      template: function(data, $element) {
        var $rs = $('<div>').dxRangeSelector({
          height: height,
          scale: {
            startValue: scaleStart,
            endValue: scaleEnd,
            minorTickInterval: 'month',
            tickInterval: 'month',
            label: {
              format: 'month',
              customizeText: function(e) { 
                return DateUtils.formatDate(new Date(e.value)); 
              }
            }
          },
          behavior: {
            snapToTicks: true,
            valueChangeMode: 'onMoving'
          },
          sliderMarker: {
            format: 'month',
            customizeText: function(e) {
              var d = new Date(e.value);
              // Только для правого маркера (начало следующего месяца)
              try {
                var val = e.component && e.component.option('value');
                if (val && val[1] && d.getTime() === val[1].getTime() && d.getDate() === 1) {
                  d.setDate(0);
                }
              } catch(ex) {}
              return DateUtils.formatDate(d);
            }
          },
          value: [
            DateUtils.startOfMonth(startDate),
            DateUtils.startOfMonth(widgetEndDate)
          ],
          maxRange: maxRange ? { months: maxRange.months } : undefined,
          onValueChanged: function(e) {
            var startValue = e.value[0];
            var endValue = e.value[1];
            var startISO = DateUtils.toISODate(DateUtils.startOfMonth(startValue));
            // endValue = начало следующего месяца → откатываем на месяц назад
            var endMonth = new Date(endValue);
            endMonth.setMonth(endMonth.getMonth() - 1);
            var endISO = DateUtils.toISODate(DateUtils.startOfMonth(endMonth));
            if (endISO < startISO) endISO = startISO;
            targetValues[field] = { start: startISO, end: endISO };
            // Синхронизация с ПериодМесяцы
            if (field !== 'ПериодМесяцы') {
              targetValues['ПериодМесяцы'] = { start: startISO, end: endISO };
            }
            if (self.context && typeof self.context.autoSaveFilters === 'function') {
              self.context.autoSaveFilters();
            }
          }
        });
        $element.append($rs);
      }
    };
  }

  // Шкала по дням: два ползунка, значение { start, end } в ISO.
  createRangeDaysItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var height = filterDef.height || 65;
    var maxRange = filterDef.maxRange;
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    var self = this;

    function parseDay(raw) {
      if (!raw) return null;
      var d = new Date(raw);
      if (isNaN(d.getTime())) return null;
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    var startDate = parseDay(value && (value.start || value.Начало));
    var endDate = parseDay(value && (value.end || value.Окончание));
    if (!startDate) startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    if (!endDate) endDate = new Date();
    if (endDate < startDate) endDate = startDate;

    if (!targetValues[field]) {
      targetValues[field] = { start: DateUtils.toISODate(startDate), end: DateUtils.toISODate(endDate) };
    }

    var scaleStart = parseDay(filterDef.minDate) || new Date(new Date().getFullYear() - 1, 0, 1);
    var scaleEnd = parseDay(filterDef.maxDate) || new Date();

    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      colSpan: 2,
      template: function(data, $element) {
        var $rs = $('<div>').dxRangeSelector({
          height: height,
          scale: {
            startValue: scaleStart,
            endValue: scaleEnd,
            minorTickInterval: 'day',
            tickInterval: 'month',
            label: {
              customizeText: function(e) { return DateUtils.formatDate(new Date(e.value)); }
            }
          },
          behavior: { snapToTicks: false, valueChangeMode: 'onMoving' },
          sliderMarker: {
            customizeText: function(e) { return DateUtils.formatDate(new Date(e.value)); }
          },
          value: [startDate, endDate],
          maxRange: (maxRange && maxRange.days) ? { days: maxRange.days } : undefined,
          onValueChanged: function(e) {
            var s = new Date(e.value[0]);
            var t = new Date(e.value[1]);
            var startISO = DateUtils.toISODate(new Date(s.getFullYear(), s.getMonth(), s.getDate()));
            var endISO = DateUtils.toISODate(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
            if (endISO < startISO) endISO = startISO;
            targetValues[field] = { start: startISO, end: endISO };
            if (self.context && typeof self.context.autoSaveFilters === 'function') {
              self.context.autoSaveFilters();
            }
          }
        });
        $element.append($rs);
      }
    };
  }

  // Числовая шкала: границы из min/max, шаг из step, значение — числа.
  createRangeNumberItem(filterDef, field, value, useTempStorage) {
    var label = filterDef.placeholder || filterDef.label;
    var height = filterDef.height || 65;
    var targetValues = useTempStorage ? this.context.tempValues : this.context.values;
    var self = this;

    var min = (filterDef.min !== undefined && filterDef.min !== null) ? Number(filterDef.min) : 0;
    var max = (filterDef.max !== undefined && filterDef.max !== null) ? Number(filterDef.max) : 100;
    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 100;
    if (max < min) { var swap = min; min = max; max = swap; }

    function toNumber(raw) {
      if (raw === null || raw === undefined || raw === '') return null;
      var n = Number(raw);
      return isFinite(n) ? n : null;
    }

    var startValue = toNumber(value && value.start);
    var endValue = toNumber(value && value.end);
    if (startValue === null) startValue = min;
    if (endValue === null) endValue = max;
    if (endValue < startValue) endValue = startValue;

    if (!targetValues[field]) {
      targetValues[field] = { start: startValue, end: endValue };
    }

    var step = filterDef.step ? Number(filterDef.step) : undefined;

    return {
      dataField: field,
      label: { text: label }, _label: filterDef.label,
      colSpan: 2,
      template: function(data, $element) {
        var $rs = $('<div>').dxRangeSelector({
          height: height,
          scale: {
            startValue: min,
            endValue: max,
            tickInterval: step,
            label: { customizeText: function(e) { return String(e.value); } }
          },
          behavior: { snapToTicks: !!step, valueChangeMode: 'onMoving' },
          sliderMarker: { customizeText: function(e) { return String(e.value); } },
          value: [startValue, endValue],
          onValueChanged: function(e) {
            targetValues[field] = { start: Number(e.value[0]), end: Number(e.value[1]) };
            if (self.context && typeof self.context.autoSaveFilters === 'function') {
              self.context.autoSaveFilters();
            }
          }
        });
        $element.append($rs);
      }
    };
  }
}