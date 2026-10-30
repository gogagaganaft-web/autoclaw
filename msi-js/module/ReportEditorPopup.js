import { FormItemBuilder } from './FormItemBuilder.js';

export class ReportEditorPopup {
  constructor(report, options = {}) {
    this.report = report;
    this.options = options;
    this.popupInstance = null;
    this._formItemBuilder = null;
    this._filterFormContainer = null;
    this._setDefaultDb();
  }

  _setDefaultDb() {
    if (this.report.dbType && this.report.db) { console.log('_setDefaultDb: already set', this.report.dbType, this.report.db); return; }
    var section = this._findSection();
    console.log('_setDefaultDb: section =', section, 'report.id =', this.report.id);
    if (section === 'ЮЛ') {
      if (!this.report.dbType) this.report.dbType = 'БД_ЮЛ';
      if (!this.report.db) this.report.db = DEFAULT_DB_UL;
    } else {
      if (!this.report.dbType) this.report.dbType = 'БД_ФЛ';
      if (!this.report.db) this.report.db = DEFAULT_DB_FL;
    }
    console.log('_setDefaultDb: set dbType =', this.report.dbType, 'db =', this.report.db);
  }

  _findSection() {
    if (typeof reports === 'undefined') return 'ФЛ';
    var targetId = this.report.id;
    function search(items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id !== undefined && items[i].id === targetId) return true;
        if (items[i].items && search(items[i].items)) return true;
      }
      return false;
    }
    for (var i = 0; i < reports.length; i++) {
      if (reports[i].items && search(reports[i].items)) return reports[i].key;
    }
    return 'ФЛ';
  }

  _ensureFormBuilder() {
    if (this._formItemBuilder) return this._formItemBuilder;
    var self = this;
    // Ensure filters is an object
    if (!self.report.filters || typeof self.report.filters !== 'object') self.report.filters = {};
    // Merge stored display fields into self.report.filters
    var storedData = this.getStoredData();
    var stored = storedData[this.report.key] || {};
    if (stored.filters) {
      Object.keys(stored.filters).forEach(function(k) {
        if (self.report.filters[k] === undefined) self.report.filters[k] = stored.filters[k];
      });
    }
    var ctx = {
      sharedToolbar: typeof toolbar !== 'undefined' ? toolbar : [],
      values: self.report.filters,
      tempValues: {},
      treeInstances: new Map(),
      tempTreeInstances: new Map(),
      _itemsCache: {},
      globalSettings: {
        serverExecuteUrl: self.options.apiBase ? self.options.apiBase + '/api/execute' : 'http://localhost:7501/api/execute',
      }
    };
    self._formBuilderCtx = ctx;
    self._formItemBuilder = new FormItemBuilder(ctx);
    return self._formItemBuilder;
  }

  show() {
    var self = this;
    this.loadReportChanges();

    this.popupInstance = $("#editorPopup").dxPopup({
      title: 'Редактор отчетов',
      visible: true,
      fullScreen: true,
      showCloseButton: true,
      hideOnOutsideClick: true,
      contentTemplate: function(contentElement) {
        var safeTmpl = function(fn) {
          return function() {
            try { return fn.apply(self, arguments); } catch(ex) { console.error('tab error:', ex); return $('<div>').text('Ошибка: ' + ex.message); }
          };
        };
          var tabsData = [
          { text: "Запрос", builder: function() { return self.createQueryTab(); } },
          { text: "Фильтры", builder: function() { return self.createFiltersTab(); } },
          { text: "Поля", builder: function() { return self.createFieldsTab(); } },
          { text: "Список отчетов", builder: function() { return self.createReportsTreeListTab(); } }
        ];
        var $container = $('<div>', { style: 'height:calc(100vh - 70px);display:flex;flex-direction:column' });
        var $tabs = $('<div>').dxTabs({
          stylingMode: 'primary',
          dataSource: tabsData,
          selectedIndex: 0,
          onSelectionChanged: function(e) {
            var idx = e.component.option('selectedIndex');
            $contents.children().each(function(i) {
              var $c = $(this);
              $c.toggle(i === idx);
              if (i === idx && !$c.data('filled')) {
                $c.data('filled', true);
                try {
                  var content = tabsData[idx].builder();
                  $c.append(content);
                } catch(ex) {
                  console.error('tab error:', ex);
                  $c.append($('<div>').text('Ошибка: ' + ex.message));
                }
              }
            });
          }
        });
        var $contents = $('<div>', { style: 'flex:1;min-height:0' });
        tabsData.forEach(function(tab, i) {
          var $div = $('<div>', { style: 'height:100%' }).toggle(i === 0);
          $contents.append($div);
        });
        // fill first tab immediately
        var $first = $contents.children().eq(0).data('filled', true);
        $first.append(safeTmpl(tabsData[0].builder)());
        $container.append($tabs);
        $container.append($contents);
        contentElement.append($container);
      },
      toolbarItems: [
        { widget: "dxButton", toolbar: "bottom", location: "before", options: { text: "Сохранить", type: "success", icon: 'save', onClick: function() { self.saveReportChanges(); self.popupInstance.hide(); } } },
        { widget: "dxButton", toolbar: "bottom", location: "after", options: { text: "Выйти", stylingMode: "outlined", icon: 'close', onClick: function() { self.popupInstance.hide(); } } }
      ]
    }).dxPopup('instance');
  }

  // ─── Поля: вкладка с внутренними табами для grid, pivot, chart, map ───
  createFieldsTab() {
    var self = this;

    var fieldConfigs = [
      { key: 'grid',  title: 'ТАБЛИЦА', lookup: 'Grid', icon: 'smalliconslayout', columns: []},
      { key: 'pivot', title: 'СВОД', lookup: 'Pivot', icon: 'hierarchy', columns: [
        { caption: "Наименование", dataField: 'dataField', width: 180 },
        { caption: "Заголовок", dataField: 'caption', width: 150 },
        { caption: "Позиция", dataField: 'area', width: 100 },
        { caption: "Тип", dataField: 'summaryType', width: 100 },
        { caption: "Формат", dataField: 'format.type', width: 100 },
        { caption: "Округление", dataField: 'format.precision', width: 90 }
      ]},
      { key: 'chart', title: 'ИНФОГРАФИКА', lookup: 'Chart', icon: 'chart', columns: [
        { caption: "Наименование", dataField: 'dataField', width: 180 },
        { caption: "Заголовок", dataField: 'caption', width: 150 },
        { caption: "Ось/Знач", dataField: 'area', width: 100 },
        { caption: "Тип", dataField: 'summaryType', width: 100 }
      ]},
      { key: 'map', title: 'КАРТА', lookup: 'Map', icon: 'map', columns: [
        { caption: "Наименование", dataField: 'dataField', width: 180 },
        { caption: "Заголовок", dataField: 'caption', width: 150 },
        { caption: "Назначение", dataField: 'area', width: 120 }
      ]}
    ];

    var $tabPanelDiv = $('<div>', { style: 'display:flex;flex-direction:column;height:100%' });
    var $content = $('<div>', { style: 'flex:1;min-height:0' });
    var $tabs = $('<div>').dxTabs({
      stylingMode: 'secondary',
      dataSource: fieldConfigs.map(function(cfg) { return { text: cfg.title, icon: cfg.icon, lookup: cfg.lookup, key: cfg.key, columns: cfg.columns }; }),
      selectedIndex: 0,
      onSelectionChanged: function(e) {
        var idx = e.component.option('selectedIndex');
        $content.children().each(function(i) {
          var $c = $(this);
          $c.toggle(i === idx);
          if (i === idx && !$c.data('filled')) {
            $c.data('filled', true);
            try {
              var cfg = fieldConfigs[idx];
              $c.append(self.createFieldTab(cfg.lookup, cfg.key, cfg.columns));
            } catch(ex) {
              console.error('field tab error:', ex);
              $c.append($('<div>').text('Ошибка: ' + ex.message));
            }
          }
        });
      }
    });
    fieldConfigs.forEach(function(cfg, i) {
      var $div = $('<div>', { style: 'height:100%' }).toggle(i === 0);
      if (i === 0) {
        try {
          $div.append(self.createFieldTab(cfg.lookup, cfg.key, cfg.columns));
          $div.data('filled', true);
        } catch(ex) {
          $div.append($('<div>').text('Ошибка: ' + ex.message));
        }
      }
      $content.append($div);
    });
    $tabPanelDiv.append($tabs);
    $tabPanelDiv.append($content);

    return $tabPanelDiv;
  }

  // ─── Запрос ───
  createQueryTab() {
    var self = this;
    var $container = $('<div>', { style: 'display:flex;flex-direction:column;height:100%' });

    // Toolbar: RadioGroup (БД_ФЛ / БД_ЮЛ) + DB SelectBox + Filter TagBox + Execute button
    var $toolbar = $('<div>', { style: 'display:flex;align-items:center;gap:8px;padding:4px 0;flex:0 0 auto' });
    var $selectBox = $('<div>', { style: 'width:220px' }).dxSelectBox({
      placeholder: 'Выберите БД',
      searchEnabled: true,
      showClearButton: true,
      displayExpr: 'name',
      valueExpr: 'id',
      disabled: true,
      value: self.report.db || null,
      onValueChanged: function(e) {
        self.report.db = e.value || '';
      }
    });
    var $radio = $('<div>', { style: 'width:180px' }).dxRadioGroup({
      items: [
        { id: 'БД_ФЛ', name: 'БД ФЛ' },
        { id: 'БД_ЮЛ', name: 'БД ЮЛ' }
      ],
      valueExpr: 'id',
      displayExpr: 'name',
      layout: 'horizontal',
      value: self.report.dbType || '',
      onValueChanged: function(e) {
        self.report.dbType = e.value;
        console.log('radio onValueChanged: value =', e.value, 'previous =', e.previousValue);
        if (!e.value) { $selectBox.dxSelectBox('instance').option('disabled', true); return; }
        var filterDef = null;
        if (typeof toolbar !== 'undefined') {
          for (var i = 0; i < toolbar.length; i++) {
            if (toolbar[i].field === e.value) { filterDef = toolbar[i]; break; }
          }
        }
        console.log('radio: filterDef found =', !!filterDef, 'items:', filterDef && filterDef.items ? filterDef.items.length : 0);
        var sb = $selectBox.dxSelectBox('instance');
        sb.option('disabled', false);
        sb.option('items', filterDef && filterDef.items ? filterDef.items : []);
        if (e.previousValue && e.value !== e.previousValue) {
          sb.option('value', null);
        }
      }
    });
    $toolbar.append($radio);
    $toolbar.append($selectBox);
    // Manually populate selectBox items and value based on dbType
    if (self.report.dbType) {
      var filterDef = null;
      if (typeof toolbar !== 'undefined') {
        for (var i = 0; i < toolbar.length; i++) {
          if (toolbar[i].field === self.report.dbType) { filterDef = toolbar[i]; break; }
        }
      }
      var sb = $selectBox.dxSelectBox('instance');
      if (sb) {
        var items = filterDef && filterDef.items ? filterDef.items : [];
        console.log('Manually setting selectBox items:', items.length, 'value:', self.report.db);
        sb.option('disabled', false);
        sb.option('items', items);
        if (self.report.db) sb.option('value', self.report.db);
      }
    }
    // Filter TagBox
    $toolbar.append($('<span>', { style: 'white-space:nowrap;font-size:12px' }).text('Фильтры:'));
    var filterItems = typeof toolbar !== 'undefined' ? toolbar.map(function(f) {
      return { field: f.field, label: (f.field || '') + ': ' + (f.placeholder || f.label || f.field) };
    }) : [];
    var selectedFilters = Object.keys(self.report.filters || {});
    var $tagBox = $('<div>', { style: 'flex:1;min-width:120px' }).dxTagBox({
      placeholder: 'Выберите фильтры',
      items: filterItems,
      valueExpr: 'field',
      displayExpr: 'label',
      value: selectedFilters,
      searchEnabled: true,
      showSelectionControls: true,
      multiline: false,
      onValueChanged: function(e) {
        var prev = e.previousValue || [];
        var curr = e.value || [];
        if (!self.report.filters) self.report.filters = {};
        curr.forEach(function(field) {
          if (prev.indexOf(field) === -1) {
            var found = toolbar.find(function(f) { return f.field === field; });
            self.report.filters[field] = (found && (found.type === 'date-range' || found.type === 'datebox')) ? {} : [];
          }
        });
        prev.forEach(function(field) {
          if (curr.indexOf(field) === -1) delete self.report.filters[field];
        });
        rebuildFilterForm();
      }
    });
    $toolbar.append($tagBox);
    var $runBtn = $('<div>').dxButton({
      text: 'Выполнить', type: 'success', icon: 'run',
      onClick: function() { self.runPreview(); }
    });
    $toolbar.append($runBtn);
    $container.append($toolbar);

    // Monaco Editor area
    var $editorArea = $('<div>', { style: 'flex:1;min-height:0;border:1px solid #ccc' });
    $container.append($editorArea);

    // Filter form section (builds form controls for selected filters)
    var $filterFormArea = $('<div>', { style: 'flex:0 0 auto;max-height:40%;overflow-y:auto;border-top:1px solid #ddd;display:none' });
    $container.append($filterFormArea);

    function rebuildFilterForm() {
      var filterKeys = Object.keys(self.report.filters || {});
      $filterFormArea.empty();
      if (filterKeys.length === 0) { $filterFormArea.hide(); return; }
      $filterFormArea.show();
      var builder = self._ensureFormBuilder();
      var ctx = self._formBuilderCtx;
      ctx.values = self.report.filters;
      var items = builder.buildFormItems(self.report.filters);
      $('<div>').dxForm({
        colCount: 3,
        labelLocation: 'top',
        items: items,
        onFieldDataChanged: function(e) {
          if (!self.report.filters) self.report.filters = {};
          self.report.filters[e.dataField] = e.value;
        }
      }).appendTo($filterFormArea);
    }
    rebuildFilterForm();

    // Separator
    $container.append($('<hr>', { style: 'margin:4px 0;border:0;border-top:1px solid #ccc;flex:0 0 auto' }));

    // Result DataGrid
    var $preview = $('<div>', { style: 'flex:1;min-height:0' }).dxDataGrid({
      showBorders: true,
      scrolling: { mode: 'virtual' },
      columns: [{ caption: 'Предпросмотр', dataField: 'preview' }],
      loadingIndicator: { enabled: true },
      onInitialized: function(e) {
        self._previewGrid = e.component;
      }
    });
    $container.append($preview);

    // Initialize Monaco Editor
    self._initMonaco($editorArea[0], self.report.query || '');

    return $container;
  }

  _initMonaco(containerEl, value) {
    var self = this;
    if (window.monaco && window.monaco.editor) {
      self._monacoEditor = monaco.editor.create(containerEl, {
        value: value || '',
        language: 'sql',
        theme: 'vs-dark',
        minimap: { enabled: false },
        fontSize: 13,
        automaticLayout: true
      });
      self._monacoEditor.onDidChangeModelContent(function() {
        self.report.query = self._monacoEditor.getValue();
      });
      return;
    }
    // Loader already loaded via script tag in index.php
    if (typeof require !== 'undefined' && require.config) {
      require.config({ paths: { vs: 'monaco/vs' } });
      require(['vs/editor/editor.main'], function() {
        self._monacoEditor = monaco.editor.create(containerEl, {
          value: value || '',
          language: 'sql',
          theme: 'vs-dark',
          minimap: { enabled: false },
          fontSize: 13,
          automaticLayout: true
        });
        self._monacoEditor.onDidChangeModelContent(function() {
          self.report.query = self._monacoEditor.getValue();
        });
      });
      return;
    }
    // Monaco not loaded yet - load from local
    var loader = document.createElement('script');
    loader.src = 'monaco/vs/loader.js';
    loader.onload = function() {
      require.config({ paths: { vs: 'monaco/vs' } });
      require(['vs/editor/editor.main'], function() {
        self._monacoEditor = monaco.editor.create(containerEl, {
          value: value || '',
          language: 'sql',
          theme: 'vs-dark',
          minimap: { enabled: false },
          fontSize: 13,
          automaticLayout: true
        });
        self._monacoEditor.onDidChangeModelContent(function() {
          self.report.query = self._monacoEditor.getValue();
        });
      });
    };
    document.head.appendChild(loader);
  }

  runPreview() {
    var self = this;
    var query = this.report.query;
    console.log('runPreview called, hasPreviewGrid:', !!self._previewGrid);
    if (!query || !self._previewGrid) {
      console.warn('runPreview aborted: missing query or grid');
      return;
    }

    console.group('▶️ runPreview — выполнение запроса');

    console.log('Исходный SQL:', query);
    console.log('Фильтры отчета:', JSON.parse(JSON.stringify(self.report.filters || {})));
    console.log('БД:', self.report.db);

    // Auto-add TOP(1000) to SELECT queries
    var trimmed = query.trim();
    if (/^SELECT\b/i.test(trimmed) && !/\bTOP\s*\(?\d+\)?\b/i.test(trimmed)) {
      query = query.replace(/\bSELECT\b/i, 'SELECT TOP 1000');
      console.log('Добавлен TOP 1000');
    }
    // Substitute {FieldName} placeholders with filter values
    var substitutions = [];
    query = query.replace(/\{([^}]+)\}/g, function(match, fieldName) {
      var val = self.report.filters ? self.report.filters[fieldName] : undefined;
      if (val === undefined || val === null) {
        substitutions.push({ placeholder: match, value: '⚠ НЕ НАЙДЕН' });
        return match;
      }
      if (Array.isArray(val)) {
        if (val.length === 0) {
          substitutions.push({ placeholder: match, value: '⚠ ПУСТОЙ МАССИВ' });
          return match;
        }
        var joined = val.join(',');
        substitutions.push({ placeholder: match, value: joined });
        return joined;
      }
      if (typeof val === 'object') {
        var id = val.id;
        if (id === undefined || id === null || id === '') {
          substitutions.push({ placeholder: match, value: '⚠ ОБЪЕКТ БЕЗ ID' });
          return match;
        }
        substitutions.push({ placeholder: match, value: String(id) });
        return String(id);
      }
      var s = String(val);
      if (s === '') {
        substitutions.push({ placeholder: match, value: '⚠ ПУСТАЯ СТРОКА' });
        return match;
      }
      // Format YYYYMMDD numbers as 'YYYY-MM-DD' for SQL dates
      if (/^\d{8}$/.test(s)) {
        var formatted = "'" + s.slice(0,4) + '-' + s.slice(4,6) + '-' + s.slice(6,8) + "'";
        substitutions.push({ placeholder: match, value: formatted });
        return formatted;
      }
      substitutions.push({ placeholder: match, value: s });
      return s;
    });
    console.log('🔄 Замены плейсхолдеров:', substitutions);
    // Warn about unresolved placeholders
    var unresolved = query.match(/\{[^}]+\}/g);
    if (unresolved) console.warn('⚠ Нераспознанные плейсхолдеры:', unresolved.join(', '));
    console.log('📝 Итоговый SQL:', query);
    var apiBase = this.options.apiBase || 'http://localhost:7501';
    var multiUrl = apiBase + '/api/execute';
    var payload = { dbName: self.report.db || '', sql: query };
    console.log('📦 Payload:', JSON.stringify(payload, null, 2));
    console.log('🌐 URL:', multiUrl);
    console.groupEnd();
    self._previewGrid.option('loadingIndicator', { visible: true });
    $.ajax({
      url: multiUrl,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(payload),
      success: function(resp) {
        console.log('runPreview response:', resp);
        var cols = [];
        var data = [];
        if (resp && resp.columns && Array.isArray(resp.columns)) {
          cols = resp.columns.map(function(c) {
            var name = typeof c === 'object' ? (c.dataField || c.caption || '') : String(c);
            return { caption: name, dataField: name };
          });
          if (resp.rows && Array.isArray(resp.rows)) {
            data = resp.rows.map(function(row) {
              var obj = {};
              if (Array.isArray(row)) {
                resp.columns.forEach(function(c, i) {
                  var name = typeof c === 'object' ? (c.dataField || c.caption || 'col' + i) : String(c);
                  obj[name] = row[i];
                });
              } else if (typeof row === 'object') {
                Object.keys(row).forEach(function(k) { obj[k] = row[k]; });
              }
              return obj;
            });
          }
        } else if (resp && resp.data && Array.isArray(resp.data)) {
          data = resp.data;
          if (data.length > 0) {
            cols = Object.keys(data[0]).map(function(k) {
              return { caption: k, dataField: k };
            });
          }
        }
        if (cols.length > 0) self._previewGrid.option('columns', cols);
        self._previewGrid.option('dataSource', data);
        self._previewGrid.option('loadingIndicator', { visible: false });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('runPreview failed:', textStatus, errorThrown, jqXHR.responseText);
        self._previewGrid.option('loadingIndicator', { visible: false });
      }
    });
  }

  // ─── Фильтры (два dxList c itemDragging) ───
  createFiltersTab() {
    var self = this;

    var $container = $('<div>', { style: 'display:flex;gap:16px;height:100%' });
    var allFilters = toolbar.slice();

    function getAvailableItems() {
      return allFilters.filter(function(f) { return !self.report.filters || self.report.filters[f.field] === undefined; });
    }

    function getReportItems() {
      var keys = Object.keys(self.report.filters || {});
      var items = [];
      keys.forEach(function(k) {
        var found = allFilters.find(function(f) { return f.field === k; });
        if (found) items.push(found);
      });
      return items;
    }

    function syncReportOrder(items) {
      var newFilters = {};
      items.forEach(function(item) {
        var key = item.field;
        if (self.report.filters && self.report.filters[key] !== undefined) {
          newFilters[key] = self.report.filters[key];
        }
      });
      self.report.filters = newFilters;
    }

    function addFilterToReport(key) {
      if (!self.report.filters) self.report.filters = {};
      if (self.report.filters[key]) return;
      var found = allFilters.find(function(f) { return f.field === key; });
      self.report.filters[key] = (found && (found.type === 'date-range' || found.type === 'datebox')) ? {} : [];
    }

    function refreshAllLists() {
      var avail = $availList.dxList('instance');
      if (avail) avail.option('dataSource', getAvailableItems().slice());
      var rpt = $reportList.dxList('instance');
      if (rpt) rpt.option('dataSource', getReportItems().slice());
    }

    // -- Левый список: доступные --
    var $leftCol = $('<div>', { style: 'flex:1;display:flex;flex-direction:column' });
    $leftCol.append($('<div>', { style: 'font-weight:bold;margin-bottom:6px;font-size:13px' }).text('Доступные фильтры (env.js)'));

    var $availList = $('<div>', { style: 'flex:1' }).dxList({
      dataSource: getAvailableItems().slice(),
      displayExpr: function(item) { return (item.label || item.field) + ' [' + item.field + ']'; },
      height: '100%',
      noDataText: 'Нет доступных фильтров',
      itemDragging: {
        group: 'filtersGroup',
        allowReordering: false,
        onDragStart: function(e) {
          var item = e.itemData || (e.fromIndex >= 0 ? (e.component ? e.component.option('dataSource')[e.fromIndex] : null) : null);
          if (item) self._dragItem = item;
        }
      }
    });
    $leftCol.append($availList);

    // ─── Правый список: фильтры отчета ───
    var $rightCol = $('<div>', { style: 'flex:1;display:flex;flex-direction:column' });
    $rightCol.append($('<div>', { style: 'font-weight:bold;margin-bottom:6px;font-size:13px' }).text('Фильтры отчета'));

    var $reportList = $('<div>', { style: 'flex:1' }).dxList({
      dataSource: getReportItems().slice(),
      displayExpr: function(item) { return (item.label || item.field) + ' [' + item.field + ']'; },
      height: '100%',
      noDataText: 'Нет фильтров отчета',
      itemDragging: {
        group: 'filtersGroup',
        allowReordering: true,
        onDragStart: function(e) {
          var item = e.itemData || (e.fromIndex >= 0 ? (e.component ? e.component.option('dataSource')[e.fromIndex] : null) : null);
          if (item) self._dragItem = item;
        },
        onAdd: function(e) {
          var item = self._dragItem;
          self._dragItem = null;
          if (!item) return;
          addFilterToReport(item.field);
          if (e.component) {
            var ds = e.component.option('dataSource').slice();
            if (e.toIndex >= 0 && e.toIndex <= ds.length) {
              ds.splice(e.toIndex, 0, item);
              e.component.option('dataSource', ds);
            }
          }
          setTimeout(refreshAllLists, 0);
        },
        onRemove: function(e) {
          var item = self._dragItem;
          self._dragItem = null;
          if (!item) item = e.itemData || (e.fromIndex >= 0 ? (e.component ? e.component.option('dataSource')[e.fromIndex] : null) : null);
          if (!item) return;
          if (self.report.filters) delete self.report.filters[item.field];
          setTimeout(refreshAllLists, 0);
        },
        onReorder: function(e) {
          var items = e.component.option('dataSource').slice();
          syncReportOrder(items);
        }
      }
    });
    $rightCol.append($reportList);

    $container.append($leftCol);
    $container.append($rightCol);

    refreshAllLists();
    return $container;
  }

  // ─── Helper: flatten nested columns → flat tree ───
  _flattenForTree(arr, parentId) {
    var self = this;
    var result = [];
    (arr || []).forEach(function(item, idx) {
      var id = (parentId ? parentId + '_' : '') + idx;
      var node = { id: id, parentId: parentId, caption: item.caption || item.dataField || '', dataField: item.dataField || '' };
      if (item.fixed) node.fixed = item.fixed;
      if (item.fixedPosition) node.fixedPosition = item.fixedPosition;
      if (item.groupIndex !== undefined && item.groupIndex !== null) node.groupIndex = item.groupIndex;
      if (item.format) {
        node.formatType = item.format.type || '';
        node.formatPrecision = item.format.precision !== undefined ? item.format.precision : null;
      }
      node._isGroup = !!item.columns;
      result.push(node);
      if (item.columns && item.columns.length) {
        result = result.concat(self._flattenForTree(item.columns, id));
      }
    });
    return result;
  }

  // ─── Helper: unflatten flat tree → nested columns ───
  _unflattenColumns(nodes) {
    var map = {}, roots = [];
    nodes.forEach(function(n) { map[n.id] = n; n.children = []; });
    nodes.forEach(function(n) {
      if (n.parentId && map[n.parentId]) map[n.parentId].children.push(n);
      else roots.push(n);
    });
    function build(node) {
      if (!node._isGroup) {
        var col = { dataField: node.dataField, caption: node.caption || node.dataField };
        if (node.fixed) col.fixed = true;
        if (node.fixedPosition) col.fixedPosition = node.fixedPosition;
        if (node.groupIndex !== undefined && node.groupIndex !== null && node.groupIndex !== '') col.groupIndex = Number(node.groupIndex);
        if (node.formatType) {
          col.format = { type: node.formatType };
          if (node.formatPrecision !== undefined && node.formatPrecision !== null && node.formatPrecision !== '') col.format.precision = Number(node.formatPrecision);
        }
        return col;
      }
      var grp = { caption: node.caption || '' };
      if (node.children.length) {
        grp.columns = node.children.map(build);
      }
      return grp;
    }
    return roots.map(build);
  }

  // ─── Поля (Grid → TreeList, остальные → DataGrid) ───
  createFieldTab(title, key, columns) {
    var self = this;
    try {
      // Grid → hierarchical TreeList editor
      if (key === 'grid') {
        var src = self.report.fields.grid || [];
        var treeData = self._flattenForTree(src, null);
        var $tl = $("<div>").dxTreeList({
          dataSource: treeData,
          keyExpr: 'id',
          parentIdExpr: 'parentId',
          showRowLines: true,
          showBorders: true,
          columnAutoWidth: true,
          allowColumnResizing: true,
          columnResizingMode: 'widget',
          rootValue: null,
          height: '100%',
          scrolling: { mode: 'virtual' },
          editing: {
            mode: 'row',
            allowUpdating: true,
            allowAdding: true,
            allowDeleting: true,
            texts: { addRowToNode: 'Добавить группу/поле' }
          },
          columns: [
            { caption: 'Заголовок', dataField: 'caption', width: 200 },
            { caption: 'Поле', dataField: 'dataField', width: 180 },
            { caption: 'Формат', dataField: 'formatType', width: 120 },
            { caption: 'Точн.', dataField: 'formatPrecision', dataType: 'number', width: 70 },
            { caption: 'Фикс.', dataField: 'fixed', dataType: 'boolean', width: 70 },
            { caption: 'Позиция', dataField: 'fixedPosition', lookup: { dataSource: ['left','right'], displayExpr: function(v) { return v; } }, width: 90 },
            { caption: 'Групп.индекс', dataField: 'groupIndex', dataType: 'number', width: 90 },
            { caption: 'Группа', dataField: '_isGroup', dataType: 'boolean', width: 80 }
          ],
          onRowInserted: function(e) {
            if (!self.report.fields.grid) self.report.fields.grid = [];
            var flat = e.component.getDataSource().items();
            self.report.fields.grid = self._unflattenColumns(flat);
          },
          onRowUpdated: function(e) {
            var flat = e.component.getDataSource().items();
            self.report.fields.grid = self._unflattenColumns(flat);
          },
          onRowRemoved: function(e) {
            var flat = e.component.getDataSource().items();
            self.report.fields.grid = flat.length ? self._unflattenColumns(flat) : [];
          },
          rowDragging: {
            allowReordering: true,
            allowDropInsideItem: true,
            showDragIcons: true,
            onReorder: function(e) {
              var flat = e.component.getDataSource().items();
              self.report.fields.grid = self._unflattenColumns(flat);
            }
          }
        });
        return $tl;
      }

      // Pivot / Chart / Map → flat DataGrid
      var src = (this.report.fields && Array.isArray(this.report.fields[key])) ? this.report.fields[key] : [];
      var dataSource = src.length ? src.slice() : [];
      return $("<div>").dxDataGrid({
        dataSource: dataSource,
        columns: columns,
        height: '100%',
        editing: { mode: "row", allowUpdating: true, allowAdding: true, allowDeleting: true },
        allowColumnResizing: true,
        columnResizingMode: 'widget',
        rowDragging: {
          allowReordering: true,
          onReorder: function(e) {
            var items = self.report.fields[key];
            if (!items) return;
            var movedItem = items.splice(e.fromIndex, 1)[0];
            items.splice(e.toIndex, 0, movedItem);
            self.report.fields[key] = items;
            e.component.refresh();
          }
        },
        onRowUpdated: function(e) { try { self.syncField(key, e.data); } catch(ex) { console.error('syncField error', ex); } },
        onRowInserted: function(e) { if (!self.report.fields[key]) self.report.fields[key] = []; self.report.fields[key].push(e.data); },
        onRowRemoved: function(e) { var arr = self.report.fields[key] || []; var idx = arr.findIndex(function(f) { return f && f.dataField === e.data.dataField; }); if (idx >= 0) { arr.splice(idx, 1); if (arr.length === 0) delete self.report.fields[key]; } },
        scrolling: { mode: 'virtual' },
        showBorders: true
      });
    } catch(ex) {
      console.error('createFieldTab error:', ex);
      return $('<div>').text('Ошибка: ' + ex.message);
    }
  }

  // ─── Список отчетов (TreeList) ───
  createReportsTreeListTab() {
    var self = this;
    var flatData = [];

    function walkTree(nodes) {
      nodes.forEach(function(node) {
        if (node.items) {
          flatData.push({
            id: node.id,
            parent: node.parent,
            type: 'group',
            groupKey: node.key,
            text: node.text || node.key,
            icon: node.icon || '',
            visible: true,
            _ref: node
          });
          walkTree(node.items);
        } else {
          flatData.push({
            id: node.id,
            parent: node.parent,
            type: 'item',
            text: node.text,
            icon: node.icon || 'chart',
            visible: node.visible !== false,
            hasQuery: !!node.query,
            processing: node.processing || 'client',
            description: node.description || '',
            _ref: node
          });
        }
      });
    }
    walkTree(reports);

    return $("<div>").dxTreeList({
      dataSource: flatData,
      keyExpr: 'id',
      parentIdExpr: 'parent',
      rootValue: 0,
      height: '100%',
      scrolling: { mode: 'virtual' },
      columns: [
        { caption: "Текст", dataField: 'text', width: 250 },
        { caption: "Ключ группы", dataField: 'groupKey', width: 100 },
        { caption: "ID", dataField: 'id', width: 60 },
        { caption: "Parent", dataField: 'parent', width: 60 },
        { caption: "Иконка", dataField: 'icon', width: 80 },
        { caption: "Видим", dataField: 'visible', dataType: 'boolean', width: 70 },
        { caption: "Описание", dataField: 'description', width: 300 },
        { caption: "Тип", dataField: 'type', width: 70, visible: false }
      ],
      editing: {
        mode: "row",
        allowUpdating: true,
        allowAdding: true,
        allowDeleting: true,
        texts: {
          addRowToNode: "Добавить отчет",
          deleteRow: "Удалить"
        }
      },
      rowDragging: {
        allowDropInsideItem: true,
        allowReordering: true,
        onReorder: function(e) {
          self._reorderReportNode(e, flatData);
        }
      },
      onRowUpdated: function(e) {
        if (e.data.type === 'item') {
          e.data._ref.text = e.data.text;
          e.data._ref.icon = e.data.icon;
          e.data._ref.visible = e.data.visible;
          e.data._ref.description = e.data.description;
        } else if (e.data.type === 'group') {
          e.data._ref.text = e.data.text;
          e.data._ref.key = e.data.groupKey;
        }
      },
      onRowInserted: function(e) {
        var maxId = flatData.reduce(function(m, f) { return Math.max(m, f.id || 0); }, 0);
        if (e.data.type === 'group') {
          var newGroup = { id: maxId + 1, parent: 0, key: e.data.groupKey || 'new', text: e.data.text || 'Новая группа', items: [] };
          reports.push(newGroup);
        } else if (e.data.type === 'item') {
          var parentRow = flatData.find(function(f) { return f.id === e.data.parent; });
          if (parentRow && parentRow.type === 'group') {
            var group = parentRow._ref;
            var newItem = { id: maxId + 1, parent: e.data.parent, text: e.data.text || 'Новый отчет', icon: 'chart', description: e.data.description || '' };
            group.items.push(newItem);
          }
        }
      },
      onRowRemoved: function(e) {
        var ref = e.data._ref;
        if (ref.items) {
          var gi = reports.indexOf(ref);
          if (gi >= 0) { reports.splice(gi, 1); return; }
          reports.forEach(function(g) {
            if (g.items) {
              var idx = g.items.indexOf(ref);
              if (idx >= 0) { g.items.splice(idx, 1); return; }
            }
          });
        } else {
          reports.forEach(function(g) {
            if (g.items) {
              var idx = g.items.indexOf(ref);
              if (idx >= 0) { g.items.splice(idx, 1); return; }
            }
          });
        }
      },
      onEditorPreparing: function(e) {
        if (e.dataField === 'id' || e.dataField === 'type') {
          e.editorOptions.disabled = true;
        }
        if (e.dataField === 'groupKey') {
          e.editorOptions.disabled = (e.row && e.row.data && e.row.data.type === 'item');
        }
        if (e.dataField === 'parent') {
          e.editorOptions.disabled = true;
        }
      },
      paging: { enabled: false },
      height: 500,
      showBorders: true,
      autoExpandAll: true
    });
  }

  _findParentGroup(ref) {
    function search(nodes) {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.items) {
          if (n.items.indexOf(ref) >= 0) return n;
          var found = search(n.items);
          if (found) return found;
        }
      }
      return null;
    }
    return search(reports);
  }

  _reorderReportNode(e, flatData) {
    var draggedData = e.itemData;
    var targetData = e.targetItemData;
    if (!draggedData || !targetData) return;

    var ref = draggedData._ref;
    var targetRef = targetData._ref;
    var isGroup = draggedData.type === 'group';
    var targetIsGroup = targetData.type === 'group';

    if (isGroup && targetIsGroup) {
      var dragIdx = reports.indexOf(ref);
      var targetIdx = reports.indexOf(targetRef);
      if (dragIdx >= 0 && targetIdx >= 0) {
        var item = reports.splice(dragIdx, 1)[0];
        reports.splice(targetIdx, 0, item);
      }
    } else if (!isGroup && targetIsGroup) {
      var oldParent = this._findParentGroup(ref);
      if (oldParent) {
        var idx = oldParent.items.indexOf(ref);
        if (idx >= 0) oldParent.items.splice(idx, 1);
      }
      ref.parent = targetRef.id;
      targetRef.items.push(ref);
    } else if (!isGroup && !targetIsGroup) {
      var oldParent = this._findParentGroup(ref);
      var newParent = this._findParentGroup(targetRef) || oldParent;
      if (oldParent) {
        var idx = oldParent.items.indexOf(ref);
        if (idx >= 0) oldParent.items.splice(idx, 1);
      }
      if (newParent) {
        var targetIdx = newParent.items.indexOf(targetRef);
        if (targetIdx >= 0) {
          newParent.items.splice(targetIdx, 0, ref);
        } else {
          newParent.items.push(ref);
        }
      }
      ref.parent = newParent ? newParent.id : targetRef.parent;
    }
  }

  // ─── Сохранение / Загрузка ───
  getStoredData() {
    var data = localStorage.getItem('reportsData');
    return data ? JSON.parse(data) : {};
  }

  saveStoredData(data) {
    localStorage.setItem('reportsData', JSON.stringify(data));
  }

  saveReportChanges() {
    var self = this;
    // save to localStorage for session restore
    var storedData = this.getStoredData();
    storedData[this.report.key] = {
      query: this.report.query,
      filters: this.report.filters,
      fields: this.report.fields
    };
    this.saveStoredData(storedData);
    localStorage.setItem('reportsData_override', JSON.stringify(storedData));
    localStorage.setItem('toolbarData_override', JSON.stringify(this.getToolbarOverrides()));
    // save to server (rpt.js only)
    var saveFileUrl = this.options.saveFileUrl || 'http://localhost:7501/api/save-file';
    var rptContent = this.generateRptJsContent();
    $.ajax({
      url: saveFileUrl,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ path: (window.FRONTEND_DATA_DIR ? window.FRONTEND_DATA_DIR + '/' : '') + 'rpt.js', content: rptContent }),
      success: function() {
        DevExpress.ui.notify('Сохранено в rpt.js', 'success', 2000);
      },
      error: function(xhr) {
        DevExpress.ui.notify('Ошибка сохранения: ' + (xhr.responseJSON ? xhr.responseJSON.error : xhr.statusText), 'error', 3000);
      }
    });
  }

  loadReportChanges() {
    var storedData = this.getStoredData();
    if (storedData[this.report.key]) {
      if (storedData[this.report.key].query) this.report.query = storedData[this.report.key].query;
      if (storedData[this.report.key].filters) this.report.filters = storedData[this.report.key].filters;
      if (storedData[this.report.key].fields) this.report.fields = storedData[this.report.key].fields;
    }
  }

  getToolbarOverrides() {
    var overrides = {};
    toolbar.forEach(function(f) {
      overrides[f.field] = { type: f.type, label: f.label, dbName: f.dbName, formOrder: f.formOrder, items: f.items, itemsQuery: f.itemsQuery };
    });
    return overrides;
  }

  generateRptJsContent() {
    return 'const reports = ' + JSON.stringify(reports, null, 2) + ';';
  }

  syncField(key, data) {
    if (!this.report.fields[key]) this.report.fields[key] = [];
    var idx = this.report.fields[key].findIndex(function(f) { return f.dataField === data.dataField; });
    if (idx >= 0) this.report.fields[key][idx] = data;
  }
}