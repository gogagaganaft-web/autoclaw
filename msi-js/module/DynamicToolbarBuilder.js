// DynamicToolbarBuilder.js
import { ReportRenderer } from './ReportRenderer.js';
import { FormItemBuilder } from './FormItemBuilder.js';
import { FilterStorage } from './FilterStorage.js';
import { ReportEditorPopup } from './ReportEditorPopup.js';
import { getStats, getSummary, clearStats } from './ReportStats.js';
import { dedupeColumns } from './ColumnsUtil.js';
import { getUserViewStore, reportKeyOf } from './UserViewStore.js';
const REPORT_BUTTON_TEXT_DEFAULT = 'ОТЧЕТ';

export class DynamicToolbarBuilder {
  constructor(toolbarInstance, report, sharedToolbar, fondTree, drillPopup, createHierarchicalList, drawer, globalSettings = {}) {
    this.toolbarInstance = toolbarInstance;
    this.report = report;
    this.sharedToolbar = sharedToolbar;
    this.values = {};
    this.fondTree = fondTree;
    this.drillPopup = drillPopup;
    this.drawer = drawer;
    this.reportContainer = $('#reportContainer');
    this.renderer = null;
    this.reportButton = null;
    this.modeButtonGroup = null;
    this._modeItems = [];
    this._modeButtons = [];
    this._dataFetched = false;
    this._mandatoryFields = [];
    
    this.createHierarchicalList = createHierarchicalList;
    this.treeInstances = new Map();
    this.tempValues = {};
    this.tempTreeInstances = new Map();
    this._queryTagboxFields = null;
    this._queryTagboxInstance = null;
    
    this.globalSettings = {
      rootValue: globalSettings.rootValue !== undefined ? globalSettings.rootValue : 0,
      showEditorButton: globalSettings.showEditorButton !== undefined ? globalSettings.showEditorButton : true,
      serverExecuteUrl: globalSettings.serverExecuteUrl || 'http://localhost:7501/api/execute',
      serverExecuteMultiUrl: globalSettings.serverExecuteMultiUrl || 'http://localhost:7501/api/execute-multi',
      serverSaveFileUrl: globalSettings.serverSaveFileUrl || '',
      serverLoadFileUrl: globalSettings.serverLoadFileUrl || '',
      serverExecSelectUrl: globalSettings.serverExecSelectUrl || '',
      apiBaseLarge: globalSettings.apiBaseLarge || 'http://localhost:7502',
      apiBasePreload: globalSettings.apiBasePreload || 'http://localhost:7503',
      apiBaseMulti: globalSettings.apiBaseMulti || 'http://localhost:7504',
      userReportFile: globalSettings.userReportFile || '',
      requestTimeout: globalSettings.requestTimeout || 3600000,
      reportButtonText: globalSettings.reportButtonText || REPORT_BUTTON_TEXT_DEFAULT,
      drawerDdbLinkCoefficient: globalSettings.drawerDdbLinkCoefficient !== undefined ? globalSettings.drawerDdbLinkCoefficient : 1.0,
      logoutUrl: globalSettings.logoutUrl || '/auth/?logout=yes'
    };

    var uniqueId = report.id || report.key;
    this.reportKey = reportKeyOf(report) || (uniqueId !== undefined && uniqueId !== null ? String(uniqueId) : null);
    this.filterStorage = new FilterStorage(report.key, uniqueId);
    this._initialReportFilters = JSON.parse(JSON.stringify(report.filters || {}));
    console.log('FilterStorage создан для отчета:', report.key, 'с ID:', uniqueId);
    this.formItemBuilder = new FormItemBuilder(this);
    this.modeButtonGroup = this._createModeController();
    var store = getUserViewStore();
    var savedMode = (store && this.reportKey) ? store.getMode(this.reportKey) : null;
    this.currentMode = savedMode || this.getDefaultMode();
    console.log('Режим:', this.currentMode, savedMode ? '(из UserViewStore)' : '(по умолчанию)');
  }

  // Единый признак служебного (пересоздаваемого) элемента тулбара текущего отчёта.
  static isTransientToolbarItem(it, reportButtonText) {
    if (!it || !it.widget) return false;
    if (it.modeButton && it.widget === 'dxDropDownButton') return true;
    if (it.widget === 'dxButtonGroup' && it.options && it.options.keyExpr === 'mode') return true;
    if (it.widget === 'dxButton' && it.options && it.options.text === reportButtonText) return true;
    return false;
  }

  getValues() {
    return this.values || {};
  }

  autoSaveFilters() {
    if (this.filterStorage) {
      this.filterStorage.saveFilters(this.values);
    }
  }

  getFullValues() {
    var base = this.getValues();
    var self = this;

    // Нормализация: Период / ПериодМесяцы могли сохраниться как массив [Date, Date] из предыдущих версий
    var periodFields = ['Период', 'ПериодМесяцы'];
    periodFields.forEach(function(f) {
      if (base[f] && Array.isArray(base[f]) && base[f].length === 2) {
        // Конвертируем массив в {start, end} используя даты как end месяца
        var startDate = new Date(base[f][0]);
        var endDate = new Date(base[f][1]);
        var endOfMonth = new Date(endDate);
        endOfMonth.setDate(0); // последний день предыдущего месяца
        var startISO = DateUtils.toISODate(startDate);
        var endISO = DateUtils.toISODate(endOfMonth);
        if (endISO < startISO) endISO = startISO;
        base[f] = {
          start: startISO,
          end: endISO
        };
      }
    });
    // Нормализация ПериодДни: массив [Date, Date] → {start, end}
    if (base['ПериодДни'] && Array.isArray(base['ПериодДни']) && base['ПериодДни'].length === 2) {
      base['ПериодДни'] = {
        start: DateUtils.toISODate(new Date(base['ПериодДни'][0])),
        end: DateUtils.toISODate(new Date(base['ПериодДни'][1]))
      };
    }

    // Заполняем значения по умолчанию для полей, к которым пользователь не прикасался
    if (self.report && self.report.filters) {
      for (var f in self.report.filters) {
        if (self.report.filters.hasOwnProperty(f) && base[f] === undefined && self.report.filters[f] !== undefined) {
          base[f] = self.report.filters[f];
        }
      }
    }

    console.group('📊 getFullValues — сбор значений фильтров');

    console.log('Базовые значения (this.values):', JSON.parse(JSON.stringify(base)));

    this.treeInstances.forEach(function(treeInstance, field) {
      if (treeInstance && treeInstance.getSelectedItems) {
        var selected = treeInstance.getSelectedItems();
        var selectedIds = selected.map(function(item) { return item.id; });
        var selectedNames = selected.map(function(item) { return item.name; }).join(', ');
        base[field] = selectedIds;
        console.log('🌳 Дерево [' + field + ']: выбрано ' + selected.length + ' узлов → ' + selectedNames);
      }
    });

    if (this.fondTree && this.fondTree.getSelectedItems) {
      var fonds = this.fondTree.getSelectedItems().map(function(item) { return item.id; });
      base.fonds = fonds;
      console.log('🏛  fondTree: выбрано ' + fonds.length + ' фондов → ' + fonds.join(', '));
    }

    console.log('✅ Итоговый объект params:', JSON.parse(JSON.stringify(base)));
    console.groupEnd();

    return base;
  }

  updateReportButton() {
    if (this.reportButton) {
      this.reportButton.option({
        text: 'ОБНОВИТЬ',
        elementAttr: {
          style: 'background-color: #ff5722; color: white;'
        }
      });
    }
  }

  clearAllFilters() {
    console.log('DynamicToolbarBuilder.clearAllFilters');
    
    for (var field in this.report.filters) {
      if (this.report.filters.hasOwnProperty(field)) {
        if (Array.isArray(this.report.filters[field])) {
          this.report.filters[field] = [];
        } else if (typeof this.report.filters[field] === 'object' && this.report.filters[field] !== null) {
          this.report.filters[field] = {};
        } else {
          this.report.filters[field] = null;
        }
      }
    }
    
    this.values = {};
    
    this.treeInstances.forEach(function(treeInstance, field) {
      if (treeInstance && treeInstance.deselectAll) {
        treeInstance.deselectAll();
      }
    });
    this.treeInstances.clear();
    
    this.refreshReport();
    
    DevExpress.ui.notify('Все фильтры очищены', 'info', 1500);
  }

  getDefaultMode() {
    const hasGrid = this.report.fields && this.report.fields.grid && this.report.fields.grid.length > 0;
    const hasPivot = this.report.fields && this.report.fields.pivot && this.report.fields.pivot.length > 0;
    const hasChart = this.report.fields && (this.report.fields.dashboard !== undefined || this.report.fields.chart !== undefined);
    const hasMap = this.report.fields && this.report.fields.map !== undefined;
    var statsCount = 0;
    try { statsCount = getStats(this.report.id).length; } catch(e) {}
    const hasStatistic = this.report.fields && this.report.fields.statistic !== undefined && statsCount >= 10;
    
    if (hasGrid) return 'grid';
    if (hasPivot) return 'pivot';
    if (hasChart) return 'dashboard';
    if (hasMap) return 'map';
    if (hasStatistic) return 'statistic';
    
    return 'grid';
  }

  buildDrawerContent() {
    if (!this.drawer) return;
    var self = this;

    var $panelInner = $('#drawer-panel-inner');
    if ($panelInner.length === 0) return;

    $panelInner.empty();
    $panelInner.css({ padding: '15px', overflow: 'auto', height: '100%', width: '100%', background: 'rgb(54, 54, 64)' });

    var $container = $('<div>').addClass('drawer-filter-inner');
    $panelInner.append($container);

    // Редактор имени отчёта для режима "Редактировать"/"Создать" (скрыт по умолчанию)
    var $reportNameDiv = $('<div>', { style: 'margin-top:10px;display:none' });
    var $reportNameBox = $('<div>').dxTextBox({
      label: 'Название отчёта',
      labelMode: 'floating',
      value: self.report.text || '',
      onValueChanged: function(e) {
        self.report.text = e.value;
      }
    });
    $reportNameDiv.append($reportNameBox);
    $container.append($reportNameDiv);
    self._reportNameDiv = $reportNameDiv;
    self._reportNameBox = $reportNameBox.dxTextBox('instance');

    // Редактор описания отчёта для режима "Редактировать"/"Создать" (скрыт по умолчанию)
    var $reportDescDiv = $('<div>', { style: 'margin-top:10px;display:none' });
    var $reportDescBox = $('<div>').dxTextArea({
      label: 'Описание отчёта',
      labelMode: 'floating',
      height: 60,
      autoResizeEnabled: false,
      value: self.report.description || '',
      onValueChanged: function(e) {
        self.report.description = e.value;
      }
    });
    $reportDescDiv.append($reportDescBox);
    $container.append($reportDescDiv);
    self._reportDescDiv = $reportDescDiv;
    self._reportDescBox = $reportDescBox.dxTextArea('instance');
    var $descWrap = self._reportDescBox.element();
    var $descTa = $descWrap.find('.dx-texteditor-input');
    $descWrap.css({ height: 'auto' });
    $descWrap.find('.dx-texteditor-container').css({ height: 'auto', overflow: 'visible' });
    $descWrap.find('.dx-texteditor-input-container').css({ height: 'auto', overflow: 'visible' });
    $descTa.css({ resize: 'vertical', overflow: 'auto', height: '60px', minHeight: '40px' });

    // Tagbox выбора фильтров для режима "Редактировать" (скрыт по умолчанию)
    var $queryTagBoxDiv = $('<div>', { style: 'margin-top:10px;display:none' });
    var filterItems = typeof toolbar !== 'undefined' ? toolbar.map(function(f) {
      return { field: f.field, label: (f.field || '') + ': ' + (f.placeholder || f.label || f.field) };
    }) : [];
    var $queryTagBox = $('<div>').dxTagBox({
      placeholder: 'Выберите фильтры',
      items: filterItems,
      valueExpr: 'field',
      displayExpr: 'label',
      value: Object.keys(self.report.filters || {}),
      label: 'Фильтры контура данных',
      labelMode: 'outside',
      width: '100%',
      searchEnabled: true,
      showSelectionControls: true,
      multiline: true,
      onValueChanged: function(e) {
        self._queryTagboxFields = e.value || [];
        if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setDrawerFilters === 'function') {
          self.renderer.currentRenderer.setDrawerFilters(self._queryTagboxFields);
        }
        self._rebuildDrawerFilterForm();
        if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setSelectedFilters === 'function') {
          self.renderer.currentRenderer.setSelectedFilters(self.values);
        }
      }
    });
    $queryTagBoxDiv.append($queryTagBox);
    $container.append($queryTagBoxDiv);
    self._queryTagboxInstance = $queryTagBox.dxTagBox('instance');

    self._refreshMandatoryFields = function() {
      self._mandatoryFields = [];
      if (self.report.mandatory && Array.isArray(self.report.mandatory)) {
        self.report.mandatory.forEach(function(f) {
          if (self.report.filters && self.report.filters[f] !== undefined) {
            self._mandatoryFields.push(f);
          }
        });
      }
    };

    self._refreshMandatoryFields();

    var $form = $('<div>').dxForm({
      colCount: 2,
      colCountByScreen: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
      labelLocation: 'top',
      items: this.formItemBuilder.buildFormItems(this.report.filters || {}),
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
        // Внедрение чекбоксов обязательности (только в режиме редактирования)
        if (self.renderer && self.renderer.mode === 'query') {
          Object.keys(self.report.filters || {}).forEach(function(fieldName) {
            var editor = e.component.getEditor(fieldName);
            if (!editor) return;
            var $content = $(editor.element()).parent();
            if (!$content.length) return;
            $content.find('.mandatory-cb').remove();
            $content.css({ display: 'flex', alignItems: 'center', gap: '6px' });
            $(editor.element()).css({ flex: '1' });
            var isMandatory = (self.report.mandatory || []).indexOf(fieldName) >= 0;
            var $cb = $('<span>', { class: 'mandatory-cb' }).dxCheckBox({
              hint: 'Пользователю обязательно нужно заполнить этот фильтр',
              value: isMandatory,
              onValueChanged: function(ev) {
                if (!self.report.mandatory) self.report.mandatory = [];
                if (ev.value) {
                  if (self.report.mandatory.indexOf(fieldName) < 0)
                    self.report.mandatory.push(fieldName);
                } else {
                  var idx = self.report.mandatory.indexOf(fieldName);
                  if (idx >= 0) self.report.mandatory.splice(idx, 1);
                }
                self._refreshMandatoryFields();
                self._updateExecuteBtn();
              }
            });
            $content.prepend($cb);
          });
        }
        // Проверить обязательные поля после готовности формы
        self._updateExecuteBtn();
      },
      onFieldDataChanged: function(e) {
        // Поля с dxRangeSelector и dxDateRangeBox управляются своим onValueChanged — не перезаписываем массивом
        if (Array.isArray(e.value) && (e.dataField === 'Период' || e.dataField === 'ПериодМесяцы' || e.dataField === 'ПериодДни')) return;
        self.values[e.dataField] = e.value;
        self.autoSaveFilters();
        self._updateExecuteBtn();
      }
    });
    var $formWrap = $('<div>').addClass('drawer-form-wrap').css({ border: '1px dotted #555', margin: '10px 0', padding: '10px', borderRadius: '10px' });
    var $formTitle = $('<div>').css({
      fontSize: '13px', color: '#aaa',
      position: 'absolute', top: '-9px', left: '12px',
      background: 'rgb(54, 54, 64)', padding: '0 6px'
    }).text('Контур данных для отчета');
    var $resetLabel = $('<div>').css({
      fontSize: '13px', color: '#888',
      position: 'absolute', top: '-9px', right: '12px',
      background: 'rgb(54, 54, 64)', padding: '0 6px',
      cursor: 'pointer'
    }).text('Сброс значений');
    $resetLabel.on('mouseenter', function() { $resetLabel.css('color', '#ffffff'); });
    $resetLabel.on('mouseleave', function() { $resetLabel.css('color', '#888'); });
    $resetLabel.on('click', function() { self.clearReportCache(); });
    $formWrap.css('position', 'relative').append($formTitle).append($resetLabel);
    $formWrap.append($form);
    $container.append($formWrap);
    self._filterFormInstance = $form.dxForm('instance');
    self._filterFormWrap = $formWrap;
    self._updateFilterFormVisibility();

    var $drawerEl = this.drawer.element();
    var $panelContent = $drawerEl.find('.dx-drawer-panel-content');
    var $wrapper = $drawerEl.find('.dx-drawer-wrapper');

    if ($wrapper.find('.drawer-resize-grip').length === 0) {
      var $grip = $('<div>').addClass('drawer-resize-grip').css({
        width: '4px', cursor: 'col-resize',
        alignSelf: 'stretch', flex: '0 0 4px',
        position: 'relative'
      });
      $panelContent.after($grip);

      self.drawer.option('onOptionChanged', function(e) {
        if (e.name === 'opened') {
          $grip.css('visibility', e.value ? 'visible' : 'hidden');
        }
      });

      var isResizing = false;
      $grip.on('mousedown', function(e) {
        isResizing = true;
        $grip.addClass('resizing');
        e.preventDefault();
      });

      $(document).off('.drawerResize').on('mousemove.drawerResize', function(e) {
        if (!isResizing) return;
        var rect = $drawerEl[0].getBoundingClientRect();
        var w = Math.max(400, Math.min(e.clientX - rect.left, window.innerWidth * 0.6));
        $panelContent.css({ width: w + 'px', minWidth: w + 'px' });
        self.drawer.option('maxSize', w);
        self.drawer._savedPanelWidth = w;
        if (self._filterFormInstance) self._filterFormInstance.repaint();
        var ddbW = Math.round(w * self.globalSettings.drawerDdbLinkCoefficient);
        var $ddb = $(self.toolbarInstance.element()).find('.dx-dropdownbox').first();
        var ddbInst = $ddb.length ? $ddb.dxDropDownBox('instance') : null;
        if (ddbInst) ddbInst.option('width', ddbW);
      }).on('mouseup.drawerResize', function() {
        isResizing = false;
        $grip.removeClass('resizing');
      });

      $grip.css('visibility', self.drawer.option('opened') ? 'visible' : 'hidden');
    }

    var initW = self.drawer._savedPanelWidth || Math.round(window.innerWidth * 0.4);
    var ddbW = Math.round(initW * self.globalSettings.drawerDdbLinkCoefficient);
    var $ddb = $(self.toolbarInstance.element()).find('.dx-dropdownbox').first();
    var ddbInst = $ddb.length ? $ddb.dxDropDownBox('instance') : null;
    if (ddbInst) ddbInst.option('width', ddbW);
  }

  _rebuildDrawerFilterForm() {
    var self = this;
    if (!self._filterFormInstance) return;
    var $panelInner = $('#drawer-panel-inner');
    if ($panelInner.length === 0) return;
    var $formWrap = $panelInner.find('.drawer-form-wrap');
    var isQueryMode = self.renderer && self.renderer.mode === 'query';
    var filterKeys = isQueryMode && self._queryTagboxFields ? self._queryTagboxFields : Object.keys(self.report.filters || {});
    var activeFilters = {};
    filterKeys.forEach(function(f) {
      if (self.report.filters && self.report.filters[f] !== undefined) {
        activeFilters[f] = self.report.filters[f];
      }
    });
    self._mandatoryFields = [];
    if (self.report.mandatory && Array.isArray(self.report.mandatory)) {
      self.report.mandatory.forEach(function(f) {
        if (activeFilters[f] !== undefined) {
          self._mandatoryFields.push(f);
        }
      });
    }
    var newForm = $('<div>').dxForm({
      colCount: 2,
      colCountByScreen: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
      labelLocation: 'top',
      items: self.formItemBuilder.buildFormItems(activeFilters),
      onContentReady: function(e) {
        var items = e.component.option('items');
        items.forEach(function(item) {
          if (item._label) {
            var editor = e.component.getEditor(item.dataField);
            if (editor) editor.option('label', item._label);
          }
        });
        // Внедрение чекбоксов обязательности (только в режиме редактирования)
        if (self.renderer && self.renderer.mode === 'query') {
          Object.keys(self.report.filters || {}).forEach(function(fieldName) {
            var editor = e.component.getEditor(fieldName);
            if (!editor) return;
            var $content = $(editor.element()).parent();
            if (!$content.length) return;
            $content.find('.mandatory-cb').remove();
            $content.css({ display: 'flex', alignItems: 'center', gap: '6px' });
            $(editor.element()).css({ flex: '1' });
            var isMandatory = (self.report.mandatory || []).indexOf(fieldName) >= 0;
            var $cb = $('<span>', { class: 'mandatory-cb' }).dxCheckBox({
              hint: 'Пользователю обязательно нужно заполнить этот фильтр',
              value: isMandatory,
              onValueChanged: function(ev) {
                if (!self.report.mandatory) self.report.mandatory = [];
                if (ev.value) {
                  if (self.report.mandatory.indexOf(fieldName) < 0)
                    self.report.mandatory.push(fieldName);
                } else {
                  var idx = self.report.mandatory.indexOf(fieldName);
                  if (idx >= 0) self.report.mandatory.splice(idx, 1);
                }
                self._refreshMandatoryFields();
                self._updateExecuteBtn();
              }
            });
            $content.prepend($cb);
          });
        }
        self._filterFormInstance = e.component;
        self._updateExecuteBtn();
      },
      onFieldDataChanged: function(e) {
        if (Array.isArray(e.value) && (e.dataField === 'Период' || e.dataField === 'ПериодМесяцы' || e.dataField === 'ПериодДни')) return;
        self.values[e.dataField] = e.value;
        self.autoSaveFilters();
        self._updateExecuteBtn();
        if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setFilterValues === 'function') {
          self.renderer.currentRenderer.setFilterValues(self.values);
        }
        if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setSelectedFilters === 'function') {
          self.renderer.currentRenderer.setSelectedFilters(self.values);
        }
      }
    });
    // Заменяем только форму, сохраняя заголовок и обёртку
    $formWrap.find('.dx-form').remove();
    $formWrap.append(newForm);
    self._filterFormWrap = $formWrap;
    self._updateFilterFormVisibility();
  }

  _updateFilterFormVisibility() {
    if (!this._filterFormWrap) return;
    var hasItems = false;
    if (this._filterFormInstance) {
      var items = this._filterFormInstance.option('items');
      hasItems = !!(items && items.length > 0);
    }
    this._filterFormWrap.toggle(hasItems);
  }

  _populateViewPanel(cols) {
    var self = this;
    var keys = ['grid', 'pivot', 'dashboard', 'map'];
    keys.forEach(function(key) {
      if (!self.report.fields) self.report.fields = {};
      var existing = Array.isArray(self.report.fields[key]) ? self.report.fields[key].slice() : [];
      var existingFields = [];
      (function collect(arr) {
        (arr || []).forEach(function(f) {
          if (f && f.dataField) existingFields.push(f.dataField);
          if (f && f.columns && f.columns.length) collect(f.columns);
        });
      })(existing);
      var newRows = [];
      cols.forEach(function(c) {
        if (existingFields.indexOf(c.dataField) < 0) {
          var row = { dataField: c.dataField, caption: c.caption || c.dataField };
          if (c.format) {
            if (key === 'grid') {
              row.formatType = c.format.type || '';
              row.formatPrecision = c.format.precision;
            } else {
              row['format.type'] = c.format.type || '';
              row['format.precision'] = c.format.precision;
            }
          }
          if (key === 'dashboard') row.chartType = '';
          newRows.push(row);
        }
      });
      if (newRows.length > 0) {
        existing = existing.concat(newRows);
        self.report.fields[key] = existing;
      }
    });
  }

  _updateDrawerQueryUI(isQueryMode) {
    var self = this;
    if (self._reportNameDiv) {
      self._reportNameDiv.toggle(isQueryMode);
    }
    if (self._reportDescDiv) {
      self._reportDescDiv.toggle(isQueryMode);
    }
    if (self._queryTagboxInstance) {
      var $tagboxDiv = $(self._queryTagboxInstance.element()).parent();
      if (isQueryMode) {
        $tagboxDiv.show();
        self._queryTagboxInstance.option('value', Object.keys(self.report.filters || {}));
      } else {
        $tagboxDiv.hide();
      }
    }
    if (self._executeBtnGroup) {
      self._executeBtnGroup.option('disabled', isQueryMode);
    }
    if (self.modeButtonGroup) {
      self.modeButtonGroup.option('disabled', isQueryMode ? true : self._shouldDisableMode());
    }
    self._queryTagboxFields = isQueryMode ? (self._queryTagboxInstance ? self._queryTagboxInstance.option('value') : Object.keys(self.report.filters || {})) : null;
    self._rebuildDrawerFilterForm();
  }

refreshReport() {
    if (this.drawer) this.drawer.option('opened', false);
    var self = this;
    var params = this.getFullValues();
    
    this.filterStorage.saveFilters(this.values);
    
    const currentModeToRestore = this.currentMode;
    console.log('Обновление отчета, сохраняем режим:', currentModeToRestore);
    
    var onRenderDone = function() {
      self._dataFetched = true;
      if (self.modeButtonGroup) {
        self._updateModeButtons();
        self.modeButtonGroup.option('selectedItemKeys', [currentModeToRestore]);
        self.modeButtonGroup.repaint();
      }
      // Проверяем — не появилась ли статистика (>=10 запусков)
      self._ensureStatMode();
    };

    if (this.renderer) {
      this.reportContainer.empty();
      this.renderer.mode = currentModeToRestore;
      this.renderer.render(params, onRenderDone);
    } else {
      var apiBase = this.globalSettings.serverExecuteMultiUrl;
      var idx = apiBase.lastIndexOf('/api/');
      apiBase = idx >= 0 ? apiBase.substring(0, idx) : 'http://localhost:7501';
      if (this.report.processing === 'server') {
        apiBase = this.globalSettings.apiBaseLarge || 'http://localhost:7502';
      } else if (this.report.processing === 'server-multi') {
        apiBase = this.globalSettings.apiBaseMulti || 'http://localhost:7504';
      }
      console.log('apiBase for report:', apiBase, 'processing:', this.report.processing);
      this.renderer = new ReportRenderer(
        this.reportContainer, 
        this.report,
        {
          serverExecuteMultiUrl: this.globalSettings.serverExecuteMultiUrl,
          requestTimeout: this.globalSettings.requestTimeout,
          apiBase: apiBase,
          apiBaseLarge: this.globalSettings.apiBaseLarge,
          apiBaseMulti: this.globalSettings.apiBaseMulti
        }
      );
      this.renderer.mode = currentModeToRestore;
      this.renderer.render(params, onRenderDone);
    }
  }

  // ─── Кнопки режимов (по кнопке на режим, стрелка = меню вариантов) ────────

  // Контроллер для сохранения прежнего API вызовов: this.modeButtonGroup.option('items'|'disabled'|'selectedItemKeys').
  _createModeController() {
    var self = this;
    var controller = {
      option: function(name, value) {
        if (arguments.length === 1) {
          if (name === 'items') return self._modeItems;
          return null;
        }
        if (name === 'items') self._applyModeItems(value || []);
        else if (name === 'disabled') self._setModeButtonsDisabled(!!value);
        else if (name === 'selectedItemKeys') self._setSelectedMode((value && value[0]) || null);
        return controller;
      },
      repaint: function() {}
    };
    return controller;
  }

  _buildModeToolbarItems(modeItems) {
    var self = this;
    var avail = {
      grid: { text: 'ТАБЛИЦА', mode: 'grid', icon: 'smalliconslayout' },
      pivot: { text: 'СВОД', mode: 'pivot', icon: 'hierarchy' },
      dashboard: { text: 'ИНФОГРАФИКА', mode: 'dashboard', icon: 'chart' },
      map: { text: 'КАРТА', mode: 'map', icon: 'map' },
      statistic: { text: 'СТАТИСТИКА', mode: 'statistic', icon: 'description' }
    };
    return (modeItems || []).map(function(mi) {
      var def = avail[mi.mode] || mi;
      var modeKey = def.mode;
      var active = self.currentMode === modeKey;
      return {
        location: 'after',
        locateInMenu: 'auto',
        widget: 'dxDropDownButton',
        modeButton: true,
        mode: modeKey,
        options: {
          splitButton: true,
          text: def.text,
          icon: def.icon,
          stylingMode: active ? 'contained' : 'outlined',
          type: active ? 'default' : 'normal',
          disabled: self._shouldDisableMode(),
          hint: 'Режим «' + def.text + '»; стрелка — варианты отображения',
          useSelectMode: false,
          showArrowIcon: true,
          dropDownOptions: { width: self._variantMenuWidth(modeKey) },
          items: self._buildVariantMenuItems(modeKey),
          onButtonClick: function() { self.switchMode(modeKey); },
          onItemClick: function(e) { self._onVariantMenuItemClick(modeKey, e.itemData); },
          onOptionChanged: function(e) {
            if (e.name === 'opened' && e.value) {
              try {
                e.component.option('items', self._buildVariantMenuItems(modeKey));
                e.component.option('dropDownOptions.width', self._variantMenuWidth(modeKey));
              } catch(err) {}
            }
          },
          onInitialized: function(e) {
            self._modeButtons.push({ mode: modeKey, instance: e.component });
          }
        }
      };
    });
  }

  // Ширина выпадающего меню вариантов под самое длинное название, чтобы ничего не обрезалось.
  _variantMenuWidth(mode) {
    var items = this._buildVariantMenuItems(mode) || [];
    var maxLen = 0;
    items.forEach(function(it) {
      var t = it && it.text ? String(it.text) : '';
      if (t.length > maxLen) maxLen = t.length;
    });
    var w = Math.round(maxLen * 8.5) + 90;
    if (w < 240) w = 240;
    if (w > 640) w = 640;
    return w;
  }

  // Пересобирает кнопки режимов в тулбаре (используется при смене доступных режимов в редакторе).
  _applyModeItems(modeItems) {
    modeItems = (modeItems || []).slice();
    var sigOf = function(arr) { return (arr || []).map(function(m) { return m.mode + ':' + m.text; }).join(','); };
    var sameSet = sigOf(modeItems) === sigOf(this._modeItems) && this._modeButtons.length > 0;
    this._modeItems = modeItems;
    if (sameSet) {
      // Состав режимов не изменился — просто синхронизируем состояние кнопок.
      this._setSelectedMode(this.currentMode);
      return;
    }
    this._modeButtons = [];
    if (!this.toolbarInstance) return;
    var rbt = this.globalSettings.reportButtonText || 'СФОРМИРОВАТЬ ОТЧЕТ';
    var items = (this.toolbarInstance.option('items') || []).filter(function(it) {
      return !(it && it.modeButton);
    });
    var modeToolbarItems = [];
    if (this._modeItems.length > 0 && this.report && this.report.text) {
      modeToolbarItems = this._buildModeToolbarItems(this._modeItems);
    }
    var insertAt = items.length;
    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      if (it && it.widget === 'dxButton' && it.options && it.options.text === rbt) { insertAt = i; break; }
    }
    var newItems = items.slice(0, insertAt).concat(modeToolbarItems, items.slice(insertAt));
    this.toolbarInstance.option('items', newItems);
  }

  _setModeButtonsDisabled(disabled) {
    (this._modeButtons || []).forEach(function(b) {
      try { if (b.instance) b.instance.option('disabled', !!disabled); } catch(e) {}
    });
  }

  _setSelectedMode(mode) {
    (this._modeButtons || []).forEach(function(b) {
      try {
        if (!b.instance) return;
        var active = b.mode === mode;
        b.instance.option('type', active ? 'default' : 'normal');
        b.instance.option('stylingMode', active ? 'contained' : 'outlined');
      } catch(e) {}
    });
  }

  _ensureStatMode() {
    if (!this.modeButtonGroup) return;
    if (!this.globalSettings.showEditorButton) return;
    if (this._statModeAdded) return;
    var count = 0;
    try { count = getStats(this.report.id).length; } catch(e) {}
    if (count < 10) return;
    this._statModeAdded = true;
    var currentItems = this.modeButtonGroup.option('items');
    if (currentItems.some(function(it) { return it.mode === 'statistic'; })) return;
    var newItems = currentItems.slice();
    newItems.push({ text: 'СТАТИСТИКА', mode: 'statistic', icon: 'description' });
    this.modeButtonGroup.option('items', newItems);
  }

  _updateModeButtonGroup() {
    var self = this;
    if (!self.modeButtonGroup) return;
    var hasGrid = self.report.fields && self.report.fields.grid && self.report.fields.grid.length > 0;
    var hasPivot = self.report.fields && self.report.fields.pivot && self.report.fields.pivot.length > 0;
    var hasChart = self.report.fields && (self.report.fields.dashboard !== undefined || self.report.fields.chart !== undefined);
    var hasMap = self.report.fields && self.report.fields.map !== undefined;
    var availableModes = {
      grid: { text: 'ТАБЛИЦА', mode: 'grid', icon: 'smalliconslayout' },
      pivot: { text: 'СВОД', mode: 'pivot', icon: 'hierarchy' },
      dashboard: { text: 'ИНФОГРАФИКА', mode: 'dashboard', icon: 'chart' },
      map: { text: 'КАРТА', mode: 'map', icon: 'map' }
    };
    var hasMode = { grid: hasGrid, pivot: hasPivot, dashboard: hasChart, map: hasMap };
    var modeItems = [];
    var viewOrder = self.report.views || ['grid', 'pivot', 'dashboard', 'map'];
    viewOrder.forEach(function(v) {
      if (hasMode[v] && availableModes[v]) {
        modeItems.push(availableModes[v]);
      }
    });
    if (modeItems.length > 0 && self.report.text) {
      self.modeButtonGroup.option('items', modeItems);
      self.modeButtonGroup.option('disabled', self._shouldDisableMode());
      if (!self.currentMode || !modeItems.some(function(i) { return i.mode === self.currentMode; })) {
        self.currentMode = modeItems[0].mode;
        self.modeButtonGroup.option('selectedItemKeys', [self.currentMode]);
      }
    }
    self._ensureStatMode();
  }

  _mandatoryFieldsFilled() {
    if (!this._mandatoryFields || this._mandatoryFields.length === 0) return true;
    for (var i = 0; i < this._mandatoryFields.length; i++) {
      var f = this._mandatoryFields[i];
      var v = this.values[f];
      if (v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) {
        return false;
      }
    }
    return true;
  }

  _shouldDisableMode() {
    if (this.renderer && this.renderer.mode === 'query') return true;
    if (!this._dataFetched) return true;
    if (!this._mandatoryFieldsFilled()) return true;
    return false;
  }

  _updateModeButtons() {
    if (!this.modeButtonGroup) return;
    this.modeButtonGroup.option('disabled', this._shouldDisableMode());
  }

  _updateExecuteBtn() {
    if (!this._executeBtnGroup) return;
    if (this.renderer && this.renderer.mode === 'query') {
      this._executeBtnGroup.option('disabled', true);
      this._updateModeButtons();
      return;
    }
    var disabled = false;
    if (this._mandatoryFields && this._mandatoryFields.length > 0) {
      for (var i = 0; i < this._mandatoryFields.length; i++) {
        var f = this._mandatoryFields[i];
        var v = this.values[f];
        if (v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) {
          disabled = true;
          break;
        }
      }
    }
    this._executeBtnGroup.option('disabled', disabled);
    this._updateModeButtons();
  }

  loadSavedFilters() {
    this._mergeSavedFilters(this.filterStorage.loadFilters());
  }

  // Слияние сохранённых значений в this.values и this.report.filters по правилу
  // «только поля, присутствующие в текущем определении отчёта» (защита от устаревших полей).
  _mergeSavedFilters(savedFilters) {
    if (!savedFilters) return;
    console.log('Загружаем сохраненные фильтры для отчета ' + this.report.key + ':', savedFilters);
    for (var field in savedFilters) {
      if (savedFilters.hasOwnProperty(field)) {
        this.values[field] = savedFilters[field];

        if (field.indexOf('_displayText') === -1 && field.indexOf('_displayData') === -1) {
          if (this.report.filters && this.report.filters[field] !== undefined) {
            if (typeof savedFilters[field] === 'object' && savedFilters[field] !== null) {
              for (var prop in savedFilters[field]) {
                if (savedFilters[field].hasOwnProperty(prop)) {
                  if (this.report.filters[field] === null || typeof this.report.filters[field] !== 'object') {
                    this.report.filters[field] = {};
                  }
                  this.report.filters[field][prop] = savedFilters[field][prop];
                }
              }
            } else {
              this.report.filters[field] = savedFilters[field];
            }
          }
        }
      }
    }
  }

  openReportEditor() {
    const editor = new ReportEditorPopup(this.report, {
      saveFileUrl: this.globalSettings.serverSaveFileUrl,
      loadFileUrl: this.globalSettings.serverLoadFileUrl,
      multiUrl: this.globalSettings.serverExecuteMultiUrl
    });
    editor.show();
  }

  clearReportCache() {
    var self = this;
    if (!this.reportKey) return;
    var store = getUserViewStore();
    if (store) store.clearCurrent(this.reportKey);
    // Возвращаем определение фильтров к исходному, иначе getFullValues()
    // повторно подставит очищенные значения из this.report.filters.
    if (this._initialReportFilters) {
      this.report.filters = JSON.parse(JSON.stringify(this._initialReportFilters));
    }
    this.values = {};
    if (this._filterFormInstance) {
      var items = this._filterFormInstance.option('items');
      if (items && Array.isArray(items)) {
        items.forEach(function(item) {
          if (item.dataField) {
            var editor = self._filterFormInstance.getEditor(item.dataField);
            if (editor) {
              try {
                editor.reset();
              } catch(e) {
                // сложные редакторы (tree, dateRange) обрабатываем отдельно
              }
            }
          }
        });
      }
      this._filterFormInstance.repaint();
    }
    this._refreshVariantMenu();
    DevExpress.ui.notify('Значения фильтров очищены', 'info', 1500);
  }

  _setAuxGroupEditState(editing) {
    var group = this._auxBtnGroup || (window.editBtnGroupInstance || null);
    if (!group) return;
    var hasReport = !!this.report.text;
    var items = editing ? [
      { tag: 'create', icon: 'addtableheader', hint: 'Создать Отчет', disabled: true },
      { tag: 'edit', icon: 'edit', hint: 'РЕДАКТИРОВАТЬ', disabled: true },
      { tag: 'cancel', icon: 'revert', hint: 'ОТМЕНА' },
      { tag: 'save', icon: 'save', hint: 'Сохранить отчет' },
      { tag: 'delete', icon: 'deletetable', hint: 'Удалить Отчет', disabled: true }
    ] : [
      { tag: 'create', icon: 'addtableheader', hint: 'Создать Отчет' },
      { tag: 'edit', icon: this._isUserReport(this.report) ? 'edit' : 'copy',
        hint: this._isUserReport(this.report) ? 'Редактировать Отчет' : 'Копировать Отчет в новый и редактировать',
        disabled: !hasReport },
      { tag: 'cancel', icon: 'revert', hint: 'ОТМЕНА', disabled: true },
      { tag: 'save', icon: 'save', hint: 'Сохранить отчет', disabled: true },
      { tag: 'delete', icon: 'deletetable', hint: 'Удалить Отчет',
        disabled: !(hasReport && this._isUserReport(this.report)) }
    ];
    group.option('items', items);
  }

  // Пересоздаёт ключ отчёта и хранилище фильтров после смены активного объекта отчёта
  // (создание/редактирование/удаление), чтобы состояние писалось под верным reportKey.
  _syncReportKey() {
    this.reportKey = reportKeyOf(this.report) || this.reportKey;
    var uid = this.report.id || this.report.key;
    this.filterStorage = new FilterStorage(this.report.key, uid);
  }

  _nextReportId() {
    var maxId = 0;
    (function walk(nodes) {
      nodes.forEach(function(n) {
        if (n.id !== undefined && Number(n.id) > maxId) maxId = Number(n.id);
        if (n.items) walk(n.items);
      });
    })(typeof reports !== 'undefined' ? reports : []);
    return maxId + 1;
  }

  _formatTimestamp(d) {
    var p = function(n) { return (n < 10 ? '0' : '') + n; };
    return p(d.getDate()) + '.' + p(d.getMonth() + 1) + '.' + d.getFullYear() + ' ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds());
  }

  _isUserReport(report) {
    var id = report && report.id;
    if (id === undefined || id === null) return false;
    var found = false;
    (function walk(nodes) {
      if (found) return;
      nodes.forEach(function(n) {
        if (found) return;
        if (n.items) {
          if (n.key === 'Дополнительные Отчеты') {
            (function findIn(items) {
              items.forEach(function(r) {
                if (found) return;
                if (r.items) {
                  findIn(r.items);
                } else if (r.id === id) {
                  found = true;
                }
              });
            })(n.items);
          } else {
            walk(n.items);
          }
        }
      });
    })(typeof reports !== 'undefined' ? reports : []);
    return found;
  }

  _findReportInTreeById(id) {
    var result = null;
    (function walk(nodes) {
      nodes.forEach(function(n) {
        if (result) return;
        if (n.items) {
          walk(n.items);
        } else if (n.id === id) {
          result = n;
        }
      });
    })(typeof reports !== 'undefined' ? reports : []);
    return result;
  }

  _startCreateSession() {
    this._sessionMode = 'create';
    this._editIsCopy = null;
    this._sessionSavedId = null;
    this._savedReportForSession = this.report;
    this._initialReportFilters = {};
    this.report = {
      id: this._nextReportId(),
      parent: window.USER_REPORTS_GROUP_ID !== undefined ? window.USER_REPORTS_GROUP_ID : 3000,
      text: 'Новый отчёт [' + this._formatTimestamp(new Date()) + ']',
      icon: 'chart',
      description: '',
      filters: {},
      processing: 'client',
      views: ['grid'],
      fields: {},
      query: ''
    };
    this._syncReportKey();
    if (this._reportNameBox) this._reportNameBox.option('value', this.report.text);
    if (this._reportDescBox) this._reportDescBox.option('value', this.report.description || '');
    if (this.renderer) {
      try { this.renderer.cleanupCurrentRenderer(); } catch(e) {}
      this.renderer = null;
    }
    this._showAuxMode('query');
  }

  _startEditSession() {
    this._sessionMode = 'edit';
    this._editIsCopy = !this._isUserReport(this.report);
    this._sessionSavedId = null;
    this._savedReportForSession = this.report;
    this.report = JSON.parse(JSON.stringify(this.report));
    var oldText = this._savedReportForSession.text || 'Отчёт';
    this.report.text = this._editIsCopy ? oldText + ' [' + this._formatTimestamp(new Date()) + ']' : oldText;
    this._syncReportKey();
    if (this._reportNameBox) this._reportNameBox.option('value', this.report.text);
    if (this._reportDescBox) this._reportDescBox.option('value', this.report.description || '');
    if (this.renderer) {
      try { this.renderer.cleanupCurrentRenderer(); } catch(e) {}
      this.renderer = null;
    }
    this._showAuxMode('query');
  }

  _loadUserReportArray() {
    var loadUrl = this.globalSettings.serverLoadFileUrl;
    return $.ajax({
      url: loadUrl + '?path=' + encodeURIComponent(this.globalSettings.userReportFile || 'user_rpt.json'),
      method: 'GET',
      cache: false
    }).then(function(resp) {
      if (!resp || !resp.content) return [];
      var parsed = JSON.parse(resp.content);
      return Array.isArray(parsed) ? parsed : [parsed];
    }).catch(function() {
      return [];
    });
  }

  _saveEditedReport(skipEndSession) {
    var entity = JSON.parse(JSON.stringify(this.report));
    var origFilters = this._initialReportFilters || {};
    var curFilters = this.report.filters || {};
    var savedFilters = {};
    Object.keys(curFilters).forEach(function(f) {
      if (f.indexOf('_displayText') >= 0 || f.indexOf('_displayData') >= 0) return;
      var v = curFilters[f];
      var origV = origFilters[f];
      if (Array.isArray(v)) {
        savedFilters[f] = [];
      } else if (v && typeof v === 'object') {
        if (origV && typeof origV === 'object' && !Array.isArray(origV) && Object.keys(origV).length > 0) {
          savedFilters[f] = JSON.parse(JSON.stringify(origV));
        } else {
          savedFilters[f] = {};
        }
      } else {
        savedFilters[f] = v;
      }
    });
    entity.filters = savedFilters;
    entity.parent = window.USER_REPORTS_GROUP_ID !== undefined ? window.USER_REPORTS_GROUP_ID : 3000;
    var previewRenderer = this.renderer && this.renderer.currentRenderer;
    var hasGridView = !entity.views || entity.views.indexOf('grid') >= 0;
    if ((!entity.fields || !entity.fields.grid || !Array.isArray(entity.fields.grid) || entity.fields.grid.length === 0) &&
        hasGridView &&
        previewRenderer && previewRenderer._previewGridColumns && previewRenderer._previewGridColumns.length > 0) {
      if (!entity.fields) entity.fields = {};
      entity.fields.grid = previewRenderer._previewGridColumns.slice();
    }
    if (!entity.text || !entity.text.trim()) {
      entity.text = 'Новый отчёт [' + this._formatTimestamp(new Date()) + ']';
    }
    if (this._sessionMode === 'edit' && this._editIsCopy === false) {
      this._sessionSavedId = entity.id;
    } else {
      entity.id = this._nextReportId();
      this._sessionSavedId = entity.id;
    }
    if (entity.fields && Array.isArray(entity.fields.grid)) {
      entity.fields.grid = dedupeColumns(entity.fields.grid);
    }
    this._writeUserReport(entity, !!skipEndSession);
  }

  _writeUserReport(entity, skipEndSession) {
    var self = this;
    var path = this.globalSettings.userReportFile || 'user_rpt.json';
    DevExpress.ui.notify('Сохранение...', 'info', 1200);
    this._loadUserReportArray().then(function(arr) {
      var idx = arr.findIndex(function(r) { return r.id === entity.id; });
      if (idx >= 0) {
        arr[idx] = entity;
      } else {
        arr.push(entity);
      }
      return $.ajax({
        url: self.globalSettings.serverSaveFileUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ path: path, content: JSON.stringify(arr, null, 2) })
      });
    }).then(function() {
      DevExpress.ui.notify('Отчёт сохранён', 'success', 2000);
      var refresh = window.refreshUserReportTree ? window.refreshUserReportTree() : Promise.resolve();
      return refresh;
    }).then(function() {
      if (skipEndSession) {
        self._updateModeButtonGroup();
      } else {
        self._endSession();
      }
    }).catch(function(xhr) {
      var msg = xhr && xhr.responseJSON ? xhr.responseJSON.error : (xhr && xhr.statusText ? xhr.statusText : 'неизвестная ошибка');
      DevExpress.ui.notify('Ошибка сохранения: ' + msg, 'error', 3500);
    });
  }

  _deleteReport() {
    var self = this;
    var id = this.report && this.report.id;
    if (id === undefined || id === null) return;
    if (!this._isUserReport(this.report)) return;
    var reportText = this.report.text || 'Отчёт';
    DevExpress.ui.dialog.confirm('Удалить отчёт "' + reportText + '"?', 'Удаление отчёта').done(function(result) {
      if (!result) return;
      var path = self.globalSettings.userReportFile || 'user_rpt.json';
      self._loadUserReportArray().then(function(arr) {
        var idx = arr.findIndex(function(r) { return r.id === id; });
        if (idx < 0) return [];
        arr.splice(idx, 1);
        return $.ajax({
          url: self.globalSettings.serverSaveFileUrl,
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ path: path, content: JSON.stringify(arr, null, 2) })
        });
      }).then(function() {
        DevExpress.ui.notify('Отчёт удалён', 'success', 2000);
        var refresh = window.refreshUserReportTree ? window.refreshUserReportTree() : Promise.resolve();
        return refresh;
      }).then(function() {
        if (window.dropDownInstance) {
          window.dropDownInstance.option('value', null);
          window.dropDownInstance.option('displayValue', '');
        }
        self.report = {
          id: 0,
          key: 'empty-report',
          text: '',
          icon: 'chart',
          description: '',
          filters: {},
          processing: 'client',
          views: ['grid'],
          fields: {},
          query: ''
        };
        self._syncReportKey();
        self._sessionMode = null;
        self._editIsCopy = null;
        self._sessionSavedId = null;
        self._savedReportForSession = null;
        self._dataFetched = false;
        if (self.renderer) {
          try { self.renderer.cleanupCurrentRenderer(); } catch(e) {}
          self.renderer = null;
        }
        self.reportContainer.empty();
        self._setAuxGroupEditState(false);
        self._updateDrawerQueryUI(false);
        self._updateModeButtonGroup();
      }).catch(function(xhr) {
        var msg = xhr && xhr.responseJSON ? xhr.responseJSON.error : (xhr && xhr.statusText ? xhr.statusText : 'неизвестная ошибка');
        DevExpress.ui.notify('Ошибка удаления: ' + msg, 'error', 3500);
      });
    });
  }

  _cancelEditSession() {
    if (this._savedReportForSession) {
      this.report = this._savedReportForSession;
    }
    this._syncReportKey();
    this._sessionMode = null;
    this._editIsCopy = null;
    this._sessionSavedId = null;
    this._savedReportForSession = null;
    this._dataFetched = false;
    this.renderer = null;
    this.reportContainer.empty();
    this._setAuxGroupEditState(false);
    this._updateDrawerQueryUI(false);
    this._updateModeButtonGroup();
  }

  _endSession() {
    if (this._sessionMode === 'create') {
      var createdId = this._sessionSavedId;
      var created = createdId !== null && createdId !== undefined ? this._findReportInTreeById(createdId) : null;
      if (created) {
        this.report = created;
        if (window.dropDownInstance) {
          window.dropDownInstance.option('value', created.id);
          window.dropDownInstance.option('displayValue', created.text || '');
        }
      }
    } else if (this._sessionMode === 'edit' && this._editIsCopy === false && this._sessionSavedId !== null && this._sessionSavedId !== undefined) {
      var updated = this._findReportInTreeById(this._sessionSavedId);
      if (updated) {
        this.report = updated;
      } else if (this._savedReportForSession) {
        this.report = this._savedReportForSession;
      }
    } else if (this._savedReportForSession) {
      this.report = this._savedReportForSession;
    }
    this._syncReportKey();
    this._sessionMode = null;
    this._editIsCopy = null;
    this._sessionSavedId = null;
    this._savedReportForSession = null;
    this._dataFetched = false;
    this.renderer = null;
    this.reportContainer.empty();
    this._setAuxGroupEditState(false);
    this._updateDrawerQueryUI(false);
    this._updateModeButtonGroup();
  }

  addReportButton() {
  }

  updateReportButton() {
  }

  switchMode(mode) {
    console.log('DynamicToolbarBuilder: переключение режима на:', mode);
    
    if (mode !== 'statistic' && mode !== 'query') {
      this.currentMode = mode;
      var store = getUserViewStore();
      if (store && this.reportKey) {
        store.setMode(this.reportKey, mode);
      }
      this._setSelectedMode(mode);
    }
    
    if (mode === 'statistic') {
      this._showAuxMode('statistic');
      return;
    }
    
    if (!this.renderer) {
      this.refreshReport();
    } else {
      this.renderer.setMode(mode);
    }
    
    if (mode !== 'query') {
      this._updateDrawerQueryUI(false);
    }
    
    this.updateReportButton();
  }

  _showAuxMode(mode) {
    var self = this;
    if (mode === 'query') {
      this._setAuxGroupEditState(true);
      if (this._executeBtnGroup) this._executeBtnGroup.option('disabled', true);
      if (this.modeButtonGroup) this.modeButtonGroup.option('disabled', true);
    }
    var onSaveCallback = mode === 'query' ? function() {
      self._saveEditedReport();
    } : undefined;
    var onSaveFieldsCallback = mode === 'query' ? function() {
      self._saveEditedReport(true);
    } : undefined;
    if (!this.renderer) {
      this.loadSavedFilters();
      this.reportContainer.empty();
      var apiBase = this.globalSettings.serverExecuteMultiUrl;
      var idx = apiBase.lastIndexOf('/api/');
      apiBase = idx >= 0 ? apiBase.substring(0, idx) : 'http://localhost:7501';
      if (this.report.processing === 'server') {
        apiBase = this.globalSettings.apiBaseLarge || 'http://localhost:7502';
      } else if (this.report.processing === 'server-multi') {
        apiBase = this.globalSettings.apiBaseMulti || 'http://localhost:7504';
      }
      this.renderer = new ReportRenderer(
        this.reportContainer,
        this.report,
        {
          serverExecuteMultiUrl: this.globalSettings.serverExecuteMultiUrl,
          requestTimeout: this.globalSettings.requestTimeout,
          apiBase: apiBase,
          apiBaseLarge: this.globalSettings.apiBaseLarge,
          apiBaseMulti: this.globalSettings.apiBaseMulti,
          onSave: onSaveCallback,
          onSaveFields: onSaveFieldsCallback,
          onDatasetFields: function(cols) { self._populateViewPanel(cols); }
        }
      );
      this.renderer.mode = mode;
      this.renderer.render({}, function() {
        if (mode !== 'query') {
          self._dataFetched = true;
        }
        if (self.modeButtonGroup) {
          self._updateModeButtons();
        }
        self._ensureStatMode();
        if (mode === 'query') {
          self._updateDrawerQueryUI(true);
          if (self.drawer) self.drawer.option('opened', true);
          if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setFilterValues === 'function') {
            self.renderer.currentRenderer.setFilterValues(self.values);
          }
          if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setSelectedFilters === 'function') {
            self.renderer.currentRenderer.setSelectedFilters(self.values);
          }
        }
      });
    } else {
      if (mode === 'query') {
        this.renderer.onSave = onSaveCallback;
        this.renderer.onSaveFields = onSaveFieldsCallback;
        this.renderer.onDatasetFields = function(cols) { self._populateViewPanel(cols); };
      }
      this.renderer.setMode(mode);
      if (mode !== 'query') {
        self._updateDrawerQueryUI(false);
      } else {
        self._updateDrawerQueryUI(true);
        if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setFilterValues === 'function') {
          self.renderer.currentRenderer.setFilterValues(self.values);
        }
        if (self.renderer && self.renderer.currentRenderer && typeof self.renderer.currentRenderer.setSelectedFilters === 'function') {
          self.renderer.currentRenderer.setSelectedFilters(self.values);
        }
      }
    }
  }

  render(autoShowFilters) {
    this.reportContainer.empty();
    this._dataFetched = false;
    this._modeButtons = [];
    this._modeItems = [];

    var self = this;
    
    this.loadSavedFilters();
    this.treeInstances.clear();
    
    var currentItems = this.toolbarInstance.option('items');
    var reportButtonText = this.globalSettings.reportButtonText || 'СФОРМИРОВАТЬ ОТЧЕТ';
    var baseItems = currentItems.filter(function(it) {
      return !DynamicToolbarBuilder.isTransientToolbarItem(it, reportButtonText);
    });
    var reportItems = [];

    const hasGrid = this.report.fields && this.report.fields.grid && this.report.fields.grid.length > 0;
    const hasPivot = this.report.fields && this.report.fields.pivot && this.report.fields.pivot.length > 0;
    const hasChart = this.report.fields && (this.report.fields.dashboard !== undefined || this.report.fields.chart !== undefined);
    const hasMap = this.report.fields && this.report.fields.map !== undefined;

    const availableModes = {
      grid: { text: 'ТАБЛИЦА', mode: 'grid', icon: 'smalliconslayout' },
      pivot: { text: 'СВОД', mode: 'pivot', icon: 'hierarchy' },
      dashboard: { text: 'ИНФОГРАФИКА', mode: 'dashboard', icon: 'chart' },
      map: { text: 'КАРТА', mode: 'map', icon: 'map' },
      statistic: { text: 'СТАТИСТИКА', mode: 'statistic', icon: 'description' }
    };
    const hasMode = { grid: hasGrid, pivot: hasPivot, dashboard: hasChart, map: hasMap };
    
    var modeItems = [];
    var viewOrder = this.report.views || ['grid', 'pivot', 'dashboard', 'map'];
    viewOrder.forEach(function(v) {
      if (hasMode[v] && availableModes[v]) {
        modeItems.push(availableModes[v]);
      }
    });
    
    let defaultMode = this.getDefaultMode();
    
    if (!this.currentMode || !modeItems.some(item => item.mode === this.currentMode)) {
      this.currentMode = defaultMode;
    }
    
    if (modeItems.length > 0 && this.report.text) {
      this._modeItems = modeItems.slice();
      this._buildModeToolbarItems(modeItems).forEach(function(it) {
        reportItems.push(it);
      });
    }
    if (this.report.text) {
      reportItems.push({
        location: 'after',
        locateInMenu: 'auto',
        widget: 'dxButton',
        options: {
          text: self.globalSettings.reportButtonText || 'СФОРМИРОВАТЬ ОТЧЕТ',
          icon: 'refresh',
          type: 'success',
          stylingMode: 'contained',
          disabled: false,
          onInitialized: function(e) {
            self._executeBtnGroup = e.component;
          },
          onClick: function() {
            self.refreshReport();
          }
        }
      });
    }

    var newItems = baseItems.concat(reportItems);
    this.toolbarInstance.option('items', newItems);

    // tooltip описания отчёта на выпадающем списке
    if (self.report.description) {
      var $ddb = $(self.toolbarInstance.element()).find('.dx-dropdownbox').first();
      var ddbInst = $ddb.length ? $ddb.dxDropDownBox('instance') : null;
      if (ddbInst) {
        ddbInst.option('hint', self.report.description);
      }
    }

    try {
      this.buildDrawerContent();
      this._updateExecuteBtn();
    } catch(e) {
      console.error('Ошибка buildDrawerContent:', e);
    }
    
    if (autoShowFilters === true) {
      setTimeout(function() {
        if (!self.drawer) return;
        try {
          self.drawer.option('opened', true);
        } catch(e) { console.error('Ошибка drawer.open:', e); }
      }, 300);
    }
  }

  // ─── Варианты отображения (персональные профили) ─────────────────────────

  _buildVariantMenuItems(mode) {
    var store = getUserViewStore();
    if (!store || !this.reportKey || !mode) return [];
    var variants = store.listVariants(this.reportKey, mode);
    var active = store.getActiveVariant(this.reportKey, mode);
    var modified = store.isModified(this.reportKey, mode);
    var items = [];
    if (variants.length === 0) {
      items.push({ key: 'variant:none', text: 'Нет вариантов', icon: 'info', disabled: true });
    } else {
      variants.forEach(function(v) {
        var isActive = v.name === active;
        var suffix = (isActive && modified) ? ' (изменён)' : '';
        items.push({
          key: 'variant:' + v.name,
          text: v.name + suffix,
          icon: isActive ? (modified ? 'edit' : 'check') : 'doc',
          variantName: v.name
        });
      });
    }
    var title = this._modeTitle(mode);
    items.push({ key: 'action:save', text: 'Сохранить' , icon: 'save', beginGroup: true });
    items.push({ key: 'action:rename', text: 'Переименовать', icon: 'edit', disabled: !active, variantName: active });
    items.push({ key: 'action:delete', text: 'Удалить', icon: 'trash', disabled: !active, variantName: active });
    return items;
  }

  _refreshVariantMenu() {
    var self = this;
    (this._modeButtons || []).forEach(function(b) {
      try { if (b.instance) b.instance.option('items', self._buildVariantMenuItems(b.mode)); } catch(e) {}
    });
  }

  _modeTitle(mode) {
    var titles = { grid: 'ТАБЛИЦА', pivot: 'СВОД', dashboard: 'ИНФОГРАФИКА', map: 'КАРТА', statistic: 'СТАТИСТИКА' };
    return titles[mode] || (mode ? String(mode).toUpperCase() : 'ВАРИАНТ');
  }

  _onVariantMenuItemClick(mode, itemData) {
    if (!itemData) return;
    if (itemData.variantName && itemData.key && itemData.key.indexOf('variant:') === 0) {
      this._applyVariant(mode, itemData.variantName);
      return;
    }
    if (itemData.key === 'action:save') this._openVariantSaveDialog(mode);
    else if (itemData.key === 'action:rename') this._renameActiveVariant(mode);
    else if (itemData.key === 'action:delete') this._deleteActiveVariant(mode);
  }

  _escapeHtml(value) {
    return $('<div>').text(value === undefined || value === null ? '' : String(value)).html();
  }

  _variantStateSnapshot(mode) {
    var store = getUserViewStore();
    var snap = {
      mode: mode || this.currentMode || null,
      filters: JSON.parse(JSON.stringify(this.values || {})),
      pivot: {},
      dashboard: {}
    };
    if (store && this.reportKey) {
      snap.pivot = store.getPivot(this.reportKey) || {};
      snap.dashboard = store.getDashboard(this.reportKey) || {};
    }
    return snap;
  }

  // Применение варианта: заполняет фильтры и восстанавливает вид БЕЗ запуска запроса.
  _applyVariant(mode, name) {
    var store = getUserViewStore();
    if (!store || !this.reportKey || !mode) return;
    var state = store.getVariantState(this.reportKey, mode, name);
    if (!state) {
      DevExpress.ui.notify('Вариант «' + this._escapeHtml(name) + '» не найден', 'warning', 2000);
      return;
    }
    // 1. Заполняем значения фильтров из варианта (от чистого определения отчёта)
    this.values = {};
    if (this._initialReportFilters) {
      this.report.filters = JSON.parse(JSON.stringify(this._initialReportFilters));
    }
    this._mergeSavedFilters(state.filters || {});
    // 2. Пересоздаём редакторы формы фильтров под новые значения
    try { this._rebuildDrawerFilterForm(); } catch(e) { console.error('applyVariant: ошибка перестройки формы:', e); }
    // 3. Фиксируем текущее состояние и активный вариант этого режима
    store.applyVariant(this.reportKey, mode, name);
    // 4. Режим: применяем только при наличии рендера (иначе без SQL)
    this.currentMode = mode;
    this._setSelectedMode(mode);
    if (this.renderer) {
      try { this.switchMode(mode); } catch(e) { console.error('applyVariant: ошибка смены режима:', e); }
    }
    this._refreshVariantMenu();
    DevExpress.ui.notify('Вариант «' + this._escapeHtml(name) + '» применён', 'success', 2000);
  }

  _openVariantSaveDialog(mode) {
    var self = this;
    var store = getUserViewStore();
    if (!store || !this.reportKey || !mode) return;
    var active = store.getActiveVariant(this.reportKey, mode);
    var modified = store.isModified(this.reportKey, mode);
    var count = store.listVariants(this.reportKey, mode).length;
    var defaultName = active || (this._modeTitle(mode) + (count + 1));
    var extraButtons = [];
    if (active && modified) {
      extraButtons.push({
        text: 'Обновить «' + active + '»',
        type: 'default',
        onClick: function() {
          store.saveVariant(self.reportKey, mode, active, self._variantStateSnapshot(mode));
          store.applyVariant(self.reportKey, mode, active);
          self._refreshVariantMenu();
          DevExpress.ui.notify('Вариант «' + self._escapeHtml(active) + '» обновлён', 'success', 2000);
        }
      });
    }
    this._promptVariantName({
      title: 'Сохранить вариант для режима «' + this._modeTitle(mode) + '»',
      initial: defaultName,
      okText: 'Сохранить как новый',
      extraButtons: extraButtons,
      onOk: function(name) {
        var doSave = function() {
          store.saveVariant(self.reportKey, mode, name, self._variantStateSnapshot(mode));
          store.applyVariant(self.reportKey, mode, name);
          self._refreshVariantMenu();
          DevExpress.ui.notify('Вариант «' + self._escapeHtml(name) + '» сохранён', 'success', 2000);
        };
        if (store.hasVariant(self.reportKey, mode, name)) {
          DevExpress.ui.dialog.confirm('Вариант «' + self._escapeHtml(name) + '» уже существует. Перезаписать?', 'Перезапись варианта')
            .done(function(ok) { if (ok) doSave(); });
        } else {
          doSave();
        }
      }
    });
  }

  _promptVariantName(opts) {
    var $wrapper = $('<div>').appendTo(document.body);
    var $content = $('<div>').css({ padding: '10px' });
    var $box = $('<div>').appendTo($content);
    $box.dxTextBox({
      label: 'Имя варианта',
      labelMode: 'floating',
      value: opts.initial || ''
    });
    var boxInst = $box.dxTextBox('instance');
    var $btns = $('<div>').css({ display: 'flex', justifyContent: 'flex-end', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }).appendTo($content);

    var popupInst = null;
    var closed = false;
    var close = function() {
      if (closed) return;
      closed = true;
      try { if (popupInst) popupInst.dispose(); } catch(e) {}
      $wrapper.remove();
    };

    (opts.extraButtons || []).forEach(function(b) {
      $('<div>').appendTo($btns).dxButton({
        text: b.text,
        type: b.type || 'normal',
        onClick: function() { close(); if (b.onClick) b.onClick(); }
      });
    });
    $('<div>').appendTo($btns).dxButton({ text: 'Отмена', onClick: close });
    $('<div>').appendTo($btns).dxButton({
      text: opts.okText || 'Сохранить',
      type: 'default',
      onClick: function() {
        var name = String(boxInst.option('value') || '').trim();
        if (!name) {
          DevExpress.ui.notify('Укажите имя варианта', 'warning', 2000);
          return;
        }
        close();
        if (opts.onOk) opts.onOk(name);
      }
    });

    popupInst = $wrapper.dxPopup({
      title: opts.title || 'Вариант отображения',
      width: 420,
      height: 'auto',
      showCloseButton: true,
      hideOnOutsideClick: true,
      contentTemplate: function() { return $content; },
      onHidden: function() { close(); }
    }).dxPopup('instance');
    popupInst.show();
  }

  _renameActiveVariant(mode) {
    var self = this;
    var store = getUserViewStore();
    if (!store || !this.reportKey || !mode) return;
    var active = store.getActiveVariant(this.reportKey, mode);
    if (!active) { DevExpress.ui.notify('Нет активного варианта', 'warning', 2000); return; }
    this._promptVariantName({
      title: 'Переименовать вариант (' + this._modeTitle(mode) + ')',
      initial: active,
      okText: 'Переименовать',
      onOk: function(newName) {
        if (!newName || newName === active) return;
        if (store.hasVariant(self.reportKey, mode, newName)) {
          DevExpress.ui.notify('Вариант «' + self._escapeHtml(newName) + '» уже существует', 'warning', 2500);
          return;
        }
        store.renameVariant(self.reportKey, mode, active, newName);
        self._refreshVariantMenu();
        DevExpress.ui.notify('Вариант переименован в «' + self._escapeHtml(newName) + '»', 'success', 2000);
      }
    });
  }

  _deleteActiveVariant(mode) {
    var self = this;
    var store = getUserViewStore();
    if (!store || !this.reportKey || !mode) return;
    var active = store.getActiveVariant(this.reportKey, mode);
    if (!active) { DevExpress.ui.notify('Нет активного варианта', 'warning', 2000); return; }
    DevExpress.ui.dialog.confirm('Удалить вариант «' + this._escapeHtml(active) + '»?', 'Удаление варианта').done(function(ok) {
      if (!ok) return;
      store.deleteVariant(self.reportKey, mode, active);
      self._refreshVariantMenu();
      DevExpress.ui.notify('Вариант «' + self._escapeHtml(active) + '» удалён', 'success', 2000);
    });
  }
}
