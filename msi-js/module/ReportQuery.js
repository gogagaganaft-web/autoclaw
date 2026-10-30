import { FormItemBuilder } from './FormItemBuilder.js';
import { interpolateQuery } from './QueryInterpolator.js';

export class ReportQuery {
  constructor(report, options = {}) {
    this.report = report;
    this.options = options;
    this._apiBases = options.apiBases || {};
    var proc = (this.report.processing || 'client');
    if (this._apiBases[proc]) this.options.apiBase = this._apiBases[proc];
    this._formItemBuilder = null;
    this._formBuilderCtx = null;
    this._previewGrid = null;
    this._monacoEditor = null;
    this.popupInstance = null;
    this._contextMenu = null;
    this._chipsContainer = null;
    this._chipElements = {};
    if (!this.report.db) {
      this.report.db = window.DEFAULT_DB_FL;
    }
  }

  static render(container, report, options = {}) {
    var instance = new ReportQuery(report, options);
    if (typeof container === 'string') container = $(container);
    container.empty();
    instance._buildContent().appendTo(container);
    return instance;
  }

  cleanup() {
    if (this._monacoEditor) {
      this._monacoEditor.dispose();
      this._monacoEditor = null;
    }
    if (this._contextMenu) {
      this._contextMenu.remove();
      this._contextMenu = null;
    }
    $(document).off('click.contextMenu');
    this._previewGrid = null;
    this._previewGridColumns = null;
    this.popupInstance = null;
    this._chipsContainer = null;
  }

  show() {
    var self = this;
    if (this.popupInstance) {
      this.popupInstance.show();
      return;
    }
    var $popup = $('<div>').dxPopup({
      width: '90vw',
      height: '90vh',
      showCloseButton: true,
      showTitle: true,
      title: 'SQL Запрос — ' + (this.report.text || ''),
      resizeEnabled: true,
      contentTemplate: function() {
        return self._buildContent();
      },
      onHidden: function() {
        if (self._monacoEditor) {
          self._monacoEditor.dispose();
          self._monacoEditor = null;
        }
        self.popupInstance = null;
      }
    });
    this.popupInstance = $popup.dxPopup('instance');
    this.popupInstance.show();
  }

  setSelectedFilters(filters) {
    var self = this;
    var expanded = {};
    Object.keys(filters || {}).forEach(function(field) {
      expanded[field] = filters[field];
      var def = (typeof toolbar !== 'undefined' ? toolbar : []).find(function(f) { return f.field === field; });
      if (def && Array.isArray(def.var)) {
        def.var.forEach(function(v) {
          if (v !== field) {
            var subfield = v.replace(field + '_', '');
            var val = filters[field] || {};
            if (subfield === 'start') expanded[v] = val.startDate || val.start;
            else if (subfield === 'end') expanded[v] = val.endDate || val.end;
            else expanded[v] = val[subfield];
          }
        });
      }
    });
    this._previewValues = expanded;
    this._rebuildChips();
  }

  _rebuildChips() {
    var self = this;
    if (!this._chipsContainer) return;
    this._chipsContainer.empty();
    this._chipElements = {};
    var shown = 0;
    var selected = this.report.filters || {};
    Object.keys(selected).forEach(function(field) {
      var def = (typeof toolbar !== 'undefined' ? toolbar : []).find(function(f) { return f.field === field; });
      if (def && Array.isArray(def.var)) {
        def.var.forEach(function(v) {
          self._addChip(v);
          shown++;
        });
      } else {
        self._addChip(field);
        shown++;
      }
    });
    if (shown === 0) {
      this._chipsContainer.append($('<span>', { style: 'color:#555;font-size:11px;white-space:nowrap' }).text('Выберите фильтры в панели слева'));
    }
    this._updateChipHighlights();
  }

  _addChip(varName) {
    var self = this;
    var $chip = $('<span>', {
      draggable: true,
      style: 'display:inline-flex;align-items:center;padding:3px 8px;font-size:12px;line-height:20px;font-family:Consolas,monospace;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:4px;cursor:pointer;white-space:nowrap;flex-shrink:0;user-select:none;transition:all 0.15s'
    });
    $chip.append($('<span>', { style: 'color:rgba(255,255,255,0.45)' }).text('{'));
    $chip.append($('<span>', { style: 'color:#fff' }).text(varName));
    $chip.append($('<span>', { style: 'color:rgba(255,255,255,0.45)' }).text('}'));
    $chip.on('mouseenter', function() {
      $chip.css({
        background: '#5e5e6e',
        borderColor: 'rgba(255,255,255,0.25)'
      });
    });
    $chip.on('mouseleave', function() { self._updateChipHighlights(); });
    $chip.on('click', function() {
      self._insertPlaceholder(varName);
    });
    $chip.on('dragstart', function(e) {
      e.originalEvent.dataTransfer.setData('application/x-placeholder', varName);
    });
    this._chipsContainer.append($chip);
    if (!this._chipElements) this._chipElements = {};
    this._chipElements[varName] = $chip;
  }

  _updateChipHighlights() {
    var self = this;
    var query = this.report.query || '';
    var matches = query.match(/\{([^}]+)\}/g) || [];
    var used = {};
    matches.forEach(function(m) { used[m.slice(1, -1)] = true; });
    Object.keys(this._chipElements || {}).forEach(function(varName) {
      var $chip = self._chipElements[varName];
      if (!$chip || !$chip.length) return;
      if (used[varName]) {
        $chip.css({ background: '#525261', borderColor: 'rgba(255,255,255,0.2)' });
        $chip.find('span').eq(1).css('color', '#8bc34a');
      } else {
        $chip.css({ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' });
        $chip.find('span').eq(1).css('color', '#fff');
      }
    });
  }

  _insertPlaceholder(varName) {
    if (!this._monacoEditor) return;
    var text = '{' + varName + '}';
    var selection = this._monacoEditor.getSelection();
    var range = new monaco.Range(
      selection.startLineNumber, selection.startColumn,
      selection.endLineNumber, selection.endColumn
    );
    this._monacoEditor.executeEdits('insert-placeholder', [
      { range: range, text: text, forceMoveMarkers: true }
    ]);
    this._monacoEditor.focus();
  }

  _buildContent() {
    var self = this;
    var $container = $('<div>', { style: 'display:flex;flex-direction:column;height:calc(100vh - 100px);background:#1e1e1e' });

    var $toolbar = $('<div>').dxToolbar({
      items: [
        {
          location: 'before',
          widget: 'dxDropDownButton',
          options: {
            text: 'НАСТРОЙКА ОТЧЕТА',
            icon: 'preferences',
            items: self._settingsMenuItems(),
            onInitialized: function(e) {
              self._settingsButton = e.component;
            },
            itemTemplate: function(data, index, element) {
              if (data.header) {
                $(element).text(data.text).css({
                  fontSize: '11px', color: '#888',
                  padding: '4px 10px', fontWeight: 600
                });
                return;
              }
              var $row = $('<div>', { style: 'display:flex;align-items:center;gap:8px;width:100%;min-width:150px' });
              if (data.processing && data.checked) {
                $('<span>', { 'class': 'dx-icon dx-icon-check' }).appendTo($row);
              } else if (data.processing) {
                $('<span>', { style: 'display:inline-block;width:16px' }).appendTo($row);
              } else if (data.icon) {
                $('<span>', { 'class': 'dx-icon dx-icon-' + data.icon }).appendTo($row);
              }
              $('<span>').text(data.text).appendTo($row);
              $(element).append($row);
            },
            onItemClick: function(e) {
              if (e.itemData.processing) {
                self._setProcessing(e.itemData.processing);
                self._rebuildMenuItems();
              } else if (e.itemData.text === 'СОХРАНИТЬ ОТЧЕТ') {
                self._onSave();
              } else {
                var modeMap = { 'ТАБЛИЦА (поля)': 'grid', 'СВОД (поля)': 'pivot', 'ИНФОГРАФИКА': 'dashboard', 'КАРТА': 'map' };
                var key = modeMap[e.itemData.text] || e.itemData.text;
                self._openFieldPopup(key);
              }
            }
          }
        },
        {
          location: 'center',
          template: function(data, index, element) {
            var $row = $('<div>', { style: 'flex:1;overflow-x:auto;display:flex;align-items:center;gap:5px;padding:0 4px' });
            self._chipsContainer = $row;
            $row.append($('<span>', { style: 'color:#555;font-size:11px' }).text('Нет фильтров'));
            $(element).append($row);
          }
        },
        {
          location: 'after',
          widget: 'dxButton',
          options: {
            text: 'ТЕСТ-ЗАПРОС', icon: 'refresh', type: 'success', stylingMode: 'contained',
            onClick: function() { self.runPreview(); }
          }
        }
      ]
    });
    $container.append($toolbar);

    var $editorArea = $('<div>', { style: 'flex:1;min-height:0;border:1px solid #ccc' });
    $container.append($editorArea);

    $editorArea.on('dragover', function(e) { e.preventDefault(); });
    $editorArea.on('drop', function(e) {
      e.preventDefault();
      var varName = e.originalEvent.dataTransfer.getData('application/x-placeholder');
      if (varName && self._monacoEditor) self._insertPlaceholder(varName);
    });

    var $resizeHandle = $('<div>', { 'class': 'query-resize-handle' });
    $container.append($resizeHandle);

    var $preview = $('<div>', { style: 'flex:1;min-height:0;height:100%' }).dxDataGrid({
      showBorders: true,
      scrolling: { mode: 'virtual' },
      columns: [{ caption: 'Предпросмотр', dataField: 'preview' }],
      height: '100%',
      loadingIndicator: { enabled: true },
      onInitialized: function(e) {
        self._previewGrid = e.component;
      }
    });
    $container.append($preview);

    var isResizing = false;
    $resizeHandle.on('mousedown', function(e) {
      isResizing = true;
      $resizeHandle.addClass('active');
      var startY = e.clientY;
      var startH = $editorArea.height();
      e.preventDefault();
      $(document).on('mousemove.resize', function(ev) {
        if (!isResizing) return;
        var delta = ev.clientY - startY;
        var newEditorH = startH + delta;
        var ch = $container.height();
        var minH = 60;
        if (newEditorH < minH || newEditorH > ch - minH - 40) return;
        $editorArea.css('height', newEditorH + 'px');
        $editorArea.css('flex', 'none');
        $preview.css('flex', '1');
      });
      $(document).on('mouseup.resize', function() {
        isResizing = false;
        $resizeHandle.removeClass('active');
        $(document).off('mousemove.resize mouseup.resize');
      });
    });

    setTimeout(function() {
      self._initMonaco($editorArea[0], self.report.query || '');
    }, 100);

    return $container;
  }

  _initMonaco(containerEl, value) {
    var self = this;
    if (window.monaco && window.monaco.editor) {
      self._monacoEditor = monaco.editor.create(containerEl, {
        value: value || '',
        language: 'sql',
        theme: 'vs-dark',
        minimap: { enabled: true, scale: 1, showSlider: 'mouseover' },
        fontSize: 13,
        automaticLayout: true,
        dragAndDrop: false,
        contextmenu: false,
        mouseWheelZoom: true
      });
      self._monacoEditor.onDidChangeModelContent(function() {
        self.report.query = self._monacoEditor.getValue();
        self._updateChipHighlights();
      });
      $(containerEl).on('wheel', function(e) {
        if (e.originalEvent && e.originalEvent.ctrlKey) e.preventDefault();
      });
      self._setupCustomContextMenu(containerEl);
      return;
    }
    if (typeof require !== 'undefined' && require.config) {
      require.config({
        paths: { vs: 'monaco/vs' },
        'vs/nls': { availableLanguages: { '*': 'ru' } }
      });
      require(['vs/editor/editor.main'], function() {
        self._monacoEditor = monaco.editor.create(containerEl, {
          value: value || '',
          language: 'sql',
          theme: 'vs-dark',
          minimap: { enabled: true, scale: 1, showSlider: 'mouseover' },
          fontSize: 13,
          automaticLayout: true,
          dragAndDrop: false,
          contextmenu: false,
          mouseWheelZoom: true
        });
self._monacoEditor.onDidChangeModelContent(function() {
          self.report.query = self._monacoEditor.getValue();
        self._updateChipHighlights();
          });
          self._setupCustomContextMenu(containerEl);
          $(containerEl).on('wheel', function(e) {
            if (e.originalEvent && e.originalEvent.ctrlKey) e.preventDefault();
          });
          self._setupCustomContextMenu(containerEl);
      });
    }
  }

  _setupCustomContextMenu(containerEl) {
    var self = this;
    var $menu = this._contextMenu;
    if (!$menu) {
      $menu = $('<div>', {
        style: 'position:fixed;background:#2d2d2d;border:1px solid #555;border-radius:4px;padding:4px 0;z-index:10000;display:none;min-width:180px;box-shadow:0 4px 12px rgba(0,0,0,0.5)'
      });
      function addItem(text, action) {
        $('<div>', {
          style: 'padding:6px 16px;color:#ccc;cursor:pointer;font-size:13px'
        }).text(text)
          .on('mouseenter', function() { $(this).css('background', '#094771'); })
          .on('mouseleave', function() { $(this).css('background', 'transparent'); })
          .on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            $menu.hide();
            if (!action || !self._monacoEditor) return;
            self._monacoEditor.focus();
            if (action === 'editor.action.clipboardPasteAction') {
              if (navigator.clipboard && navigator.clipboard.readText) {
                navigator.clipboard.readText().then(function(text) {
                  if (text != null && self._monacoEditor) {
                    self._monacoEditor.trigger('keyboard', 'type', { text: text });
                  }
                }).catch(function() {
                  DevExpress.ui.notify('Используйте Ctrl+V для вставки', 'success', 2000);
                  self._monacoEditor.focus();
                });
              } else {
                DevExpress.ui.notify('Используйте Ctrl+V для вставки', 'success', 2000);
                self._monacoEditor.focus();
              }
            } else {
              var act = self._monacoEditor.getAction(action);
              if (act) act.run(); else self._monacoEditor.trigger(null, action);
            }
          })
          .appendTo($menu);
      }
      function addSeparator() {
        $('<div>', { style: 'height:1px;background:#444;margin:4px 8px' }).appendTo($menu);
      }
      addItem('Вырезать',          'editor.action.clipboardCutAction');
      addItem('Копировать',        'editor.action.clipboardCopyAction');
      addItem('Вставить',          'editor.action.clipboardPasteAction');
      addSeparator();
      addItem('Отменить',          'undo');
      addItem('Повторить',         'redo');
      addSeparator();
      addItem('Выделить всё',      'editor.action.selectAll');
      addItem('Найти',             'actions.find');
      addItem('Заменить',          'editor.action.startFindReplaceAction');
      addSeparator();
      addItem('Форматировать',     'editor.action.formatDocument');
      addItem('Закомментировать',  'editor.action.commentLine');
      addSeparator();
      addItem('Верхний регистр',   'editor.action.transformToUppercase');
      addItem('Нижний регистр',    'editor.action.transformToLowercase');
      $(document).on('click.contextMenu', function(ev) {
        if ($menu.is(':visible') && !$menu.is(ev.target) && !$menu.has(ev.target).length)
          $menu.hide();
      });
      $('body').append($menu);
      this._contextMenu = $menu;
    }
    $(containerEl).on('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $menu.css({ left: e.clientX + 'px', top: e.clientY + 'px' }).show();
    });
  }

  _onSave() {
    if (this.options.onSave) {
      this.options.onSave(this.report);
    }
  }

  setDrawerFilters(fields) {
    var self = this;
    if (!self.report.filters || typeof self.report.filters !== 'object') self.report.filters = {};
    var prev = Object.keys(self.report.filters);
    var curr = fields || [];
    curr.forEach(function(field) {
      if (prev.indexOf(field) === -1) {
        var found = typeof toolbar !== 'undefined' ? toolbar.find(function(f) { return f.field === field; }) : null;
        self.report.filters[field] = (found && (found.type === 'date-range' || found.type === 'datebox')) ? {} : [];
      }
    });
    prev.forEach(function(field) {
      if (curr.indexOf(field) === -1) delete self.report.filters[field];
    });
  }

  setFilterValues(values) {
    this._previewValues = values || {};
  }

  _ensureFormBuilder() {
    if (this._formItemBuilder) return this._formItemBuilder;
    var self = this;
    if (!self.report.filters || typeof self.report.filters !== 'object') self.report.filters = {};
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

  _currentApiBase() {
    var proc = this.report.processing || 'client';
    return this._apiBases[proc] || this.options.apiBase || 'http://localhost:7501';
  }

  _settingsMenuItems() {
    var proc = this.report.processing || 'client';
    return [
      { text: 'СОХРАНИТЬ ОТЧЕТ', icon: 'save' },
      { text: 'ТАБЛИЦА (поля)', icon: 'smalliconslayout', beginGroup: true },
      { text: 'СВОД (поля)', icon: 'hierarchy' },
      { text: 'ИНФОГРАФИКА', icon: 'chart' },
      { text: 'КАРТА', icon: 'map' },
      { text: 'РЕЖИМ ОБРАБОТКИ', header: true, beginGroup: true },
      { text: 'Клиент', processing: 'client', checked: proc === 'client' },
      { text: 'Сервер', processing: 'server', checked: proc === 'server' },
      { text: 'Мульти-Сервер', processing: 'server-multi', checked: proc === 'server-multi' }
    ];
  }

  _rebuildMenuItems() {
    if (this._settingsButton) {
      this._settingsButton.option('items', this._settingsMenuItems());
    }
  }

  _setProcessing(processing) {
    if (!processing || this.report.processing === processing) return;
    this.report.processing = processing;
    if (this._apiBases[processing]) this.options.apiBase = this._apiBases[processing];
    var names = { client: 'Клиент', server: 'Сервер', 'server-multi': 'Мульти-Сервер' };
    DevExpress.ui.notify('Режим обработки: ' + (names[processing] || processing), 'success', 2000);
  }

  runPreview() {
    var self = this;
    var query = this.report.query;
    if (!query || !self._previewGrid) return;

    var filterDefs = typeof toolbar !== 'undefined' ? toolbar : [];
    var missing = [];
    Object.keys(self.report.filters || {}).forEach(function(field) {
      var def = filterDefs.find(function(f) { return f.field === field; });
      if (!def) {
        var val = self._previewValues ? self._previewValues[field] : undefined;
        if (val === undefined || val === null || (typeof val !== 'object' && String(val).trim() === '')) {
          missing.push(field);
        }
        return;
      }
      var vars = Array.isArray(def.var) && def.var.length > 0 ? def.var : [field];
      var allFilled = vars.every(function(v) {
        var val = self._previewValues ? self._previewValues[v] : undefined;
        if (val === undefined || val === null) {
          val = self.report.filters ? self.report.filters[v] : undefined;
        }
        if (val === undefined || val === null) return false;
        if (Array.isArray(val)) return val.length > 0;
        if (typeof val === 'object') return val.id !== undefined && val.id !== null && val.id !== '';
        return String(val).trim() !== '';
      });
      if (!allFilled) missing.push(def.placeholder || def.label || field);
    });
    if (missing.length > 0) {
      DevExpress.ui.notify(missing.map(function(f) { return '{' + f + '} - нет значения'; }).join('\n'), 'error', 6000);
      return;
    }

    // Проверка обязательных полей (из галочек контура данных)
    var mandatory = self.report.mandatory || [];
    var mandatoryMissing = [];
    mandatory.forEach(function(f) {
      var def = filterDefs.find(function(d) { return d.field === f; });
      if (!def) {
        var val = self._previewValues ? self._previewValues[f] : undefined;
        if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0))
          mandatoryMissing.push(f);
        return;
      }
      var vars = Array.isArray(def.var) && def.var.length > 0 ? def.var : [f];
      var allFilled = vars.every(function(v) {
        var val = self._previewValues ? self._previewValues[v] : undefined;
        if (val === undefined || val === null) val = self.report.filters ? self.report.filters[v] : undefined;
        if (val === undefined || val === null) return false;
        if (Array.isArray(val)) return val.length > 0;
        if (typeof val === 'object') return val.id !== undefined && val.id !== null && val.id !== '';
        return String(val).trim() !== '';
      });
      if (!allFilled) mandatoryMissing.push(def.placeholder || def.label || f);
    });
    if (mandatoryMissing.length > 0) {
      DevExpress.ui.notify('Обязательные поля не заполнены:\n' + mandatoryMissing.join(', '), 'error', 5000);
      return;
    }

    var trimmed = query.trim();
    if (/^SELECT\b/i.test(trimmed) && !/\bTOP\s*\(?\d+\)?\b/i.test(trimmed)) {
      query = query.replace(/\bSELECT\b/i, 'SELECT TOP 1000');
    }

    var params = {};
    var pv = self._previewValues || {};
    var rf = self.report.filters || {};
    Object.keys(pv).forEach(function(k) {
      if (/_start$/.test(k) || /_end$/.test(k) || /_start_num$/.test(k) || /_end_num$/.test(k)) return;
      params[k] = pv[k];
    });
    Object.keys(rf).forEach(function(k) {
      if (params[k] === undefined) params[k] = rf[k];
    });
    // Нормализация периодов (как в getFullValues основного отчёта)
    (function normalizePeriods(p) {
      function iso(d) { return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); }
      ['Период', 'ПериодМесяцы'].forEach(function(f) {
        if (p[f] && Array.isArray(p[f]) && p[f].length === 2) {
          var s = new Date(p[f][0]);
          var e = new Date(p[f][1]);
          e.setDate(0);
          var startISO = iso(s);
          var endISO = iso(e);
          if (endISO < startISO) endISO = startISO;
          p[f] = { start: startISO, end: endISO };
        }
      });
      if (p['ПериодДни'] && Array.isArray(p['ПериодДни']) && p['ПериодДни'].length === 2) {
        p['ПериодДни'] = { start: iso(new Date(p['ПериодДни'][0])), end: iso(new Date(p['ПериодДни'][1])) };
      }
    })(params);
    var sql = interpolateQuery(query, params);
    console.log('runPreview SQL (после интерполяции):', sql);

    var apiBase = this._currentApiBase();
    var processing = self.report.processing || 'client';
    var isServerProcessing = (processing === 'server' || processing === 'server-multi');

    var pv = self._previewValues || {};
    var declaresBd = Object.prototype.hasOwnProperty.call(rf, 'БД_ЮЛ')
                  || Object.prototype.hasOwnProperty.call(rf, 'БД_ФЛ');
    var dbNames;
    if (declaresBd) {
      dbNames = pv['БД_ЮЛ'] || pv['БД_ФЛ'] || [];
      console.log('[db] отчёт задаёт БД-фильтры → выбор пользователя:', dbNames);
    } else {
      dbNames = self.report.db || window.DEFAULT_DB_FL;
      console.log('[db] отчёт не задаёт БД-фильтры → report.db:', dbNames);
    }
    if (!Array.isArray(dbNames)) dbNames = dbNames ? [dbNames] : [];
    if (dbNames.length === 0) dbNames = [self.report.db || window.DEFAULT_DB_FL];
    console.log('runPreview processing:', processing, 'dbNames:', dbNames);

    self._previewGrid.beginCustomLoading('Выполнение запроса...');

    function applyPreviewData(cols, data) {
      self._previewGridColumns = cols.map(function(c) {
        var col = { dataField: c.dataField };
        if (c.caption && c.caption !== c.dataField) col.caption = c.caption;
        var numeric = true;
        var anyNum = false;
        var maxDec = 0;
        for (var r = 0; r < data.length && r < 300; r++) {
          var v = data[r][c.dataField];
          if (v === null || v === undefined || v === '') continue;
          if (typeof v === 'number') {
            anyNum = true;
            var dec = (String(v).split('.')[1] || '').length;
            if (dec > maxDec) maxDec = dec;
            continue;
          }
          if (typeof v === 'string' && v.trim() !== '' && !isNaN(Number(v.replace(',', '.')))) {
            anyNum = true;
            var s = v.trim();
            var decS = (s.split(',')[1] || s.split('.')[1] || '').length;
            if (decS > maxDec) maxDec = decS;
            continue;
          }
          numeric = false;
          break;
        }
        if (numeric && anyNum) {
          col.format = { type: 'fixedPoint', precision: Math.min(maxDec, 4) };
        }
        return col;
      });
      if (self.options.onDatasetFields && self._previewGridColumns.length > 0) {
        self.options.onDatasetFields(self._previewGridColumns.slice());
      }
      if (cols.length > 0) self._previewGrid.option('columns', cols);
      self._previewGrid.option('dataSource', data);
      self._previewGrid.option('columnAutoWidth', true);
      self._previewGrid.endCustomLoading();
      if (data.length === 0 && cols.length === 0) {
        console.warn('runPreview: нет данных или неизвестный формат ответа');
        DevExpress.ui.notify('Нет данных для отображения', 'info', 2000);
      }
    }

    function handlePreviewError(jqXHR, textStatus, errorThrown) {
      console.error('runPreview error:', textStatus, errorThrown);
      self._previewGrid.endCustomLoading();
      var errMsg = '';
      try { var resp = JSON.parse(jqXHR.responseText); errMsg = resp.error || resp.message || ''; } catch(e) {}
      if (!errMsg) errMsg = errorThrown || textStatus || 'Неизвестная ошибка';
      DevExpress.ui.notify(errMsg, 'error', 8000);
    }

    if (isServerProcessing) {
      var reportName = self.report.text || '';
      var initDbNames = dbNames;
      $.ajax({
        url: apiBase + '/api/report/init',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ dbNames: initDbNames, sql: sql, reportName: reportName }),
        success: function(resp) {
          var token = resp && resp.token;
          var columns = resp && resp.columns;
          if (!token && Array.isArray(columns)) {
            self._previewGrid.endCustomLoading();
            DevExpress.ui.notify('Нет данных для отображения', 'info', 3000);
            return;
          }
          if (!token || !Array.isArray(columns)) {
            self._previewGrid.endCustomLoading();
            var initErr = (resp && (resp.error || resp.message)) || 'Ошибка инициализации запроса';
            DevExpress.ui.notify(initErr, 'error', 8000);
            return;
          }
          $.ajax({
            url: apiBase + '/api/report/page',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ token: token, page: 1, pageSize: 1000 }),
            success: function(pageResp) {
              $.ajax({
                url: apiBase + '/api/report/close',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ token: token })
              });
              var pageRows = (pageResp && pageResp.rows) || [];
              if (!Array.isArray(pageRows)) pageRows = [];
              var cols = columns.map(function(c) {
                var name = typeof c === 'object' ? (c.dataField || c.caption || '') : String(c);
                return { caption: name, dataField: name };
              });
              var data = pageRows.map(function(row) {
                var obj = {};
                if (Array.isArray(row)) {
                  columns.forEach(function(c, i) {
                    var name = typeof c === 'object' ? (c.dataField || c.caption || 'col' + i) : String(c);
                    obj[name] = row[i];
                  });
                } else if (typeof row === 'object') {
                  Object.keys(row).forEach(function(k) { obj[k] = row[k]; });
                }
                return obj;
              });
              applyPreviewData(cols, data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              handlePreviewError(jqXHR, textStatus, errorThrown);
            }
          });
        },
        error: function(jqXHR, textStatus, errorThrown) {
          handlePreviewError(jqXHR, textStatus, errorThrown);
        }
      });
    } else {
      var multiUrl = apiBase + '/api/execute-multi';
      var payload = { dbNames: dbNames, sql: sql, reportName: self.report.text || '' };
      console.log('runPreview payload:', payload);
      $.ajax({
        url: multiUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(resp) {
          var cols = [];
          var data = [];
          if (resp && resp.columns && Array.isArray(resp.columns)) {
            cols = resp.columns.map(function(c) {
              if (typeof c === 'object') {
                var df = c.dataField || c.caption || '';
                return { caption: c.caption || df, dataField: df };
              }
              return { caption: String(c), dataField: String(c) };
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
          applyPreviewData(cols, data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          handlePreviewError(jqXHR, textStatus, errorThrown);
        }
      });
    }
  }

  _openFieldPopup(modeKey) {
    var self = this;
    var modeNames = { 'grid': 'ТАБЛИЦА', 'pivot': 'СВОД', 'dashboard': 'ИНФОГРАФИКА', 'map': 'КАРТА' };
    var modeName = modeNames[modeKey] || modeKey;
    if (!modeKey) return;

    var snapshotFields = null;
    if (self.report.fields && self.report.fields[modeKey] !== undefined) {
      snapshotFields = JSON.parse(JSON.stringify(self.report.fields[modeKey]));
    }
    var snapshotViews = (self.report.views || []).slice();
    var snapshotBalloon = self.report.mapSettings && self.report.mapSettings.balloon
      ? JSON.parse(JSON.stringify(self.report.mapSettings.balloon)) : null;

    var workingCopy = snapshotFields !== null ? JSON.parse(JSON.stringify(snapshotFields)) : [];
    if (!self.report.fields) self.report.fields = {};
    self.report.fields[modeKey] = workingCopy;

    var inViews = snapshotViews.indexOf(modeKey) >= 0;
    var checkInstance = null;

    var popupId = 'fieldPopup_' + modeKey + '_' + Date.now();
    var $popupDiv = $('<div>').attr('id', popupId).appendTo('body');

    $popupDiv.dxPopup({
      visible: true,
      width: '900px',
      height: '80vh',
      resizeEnabled: true,
      showCloseButton: true,
      showTitle: true,
      title: 'Поля данных — ' + modeName,
      contentTemplate: function() {
        var $wrap = $('<div>').css({ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' });

        var $checkRow = $('<div>').css({ marginBottom: '10px', paddingTop: '5px' });
        checkInstance = $('<div>').appendTo($checkRow).dxCheckBox({
          text: 'Включить ' + modeName + ' в отчёт',
          value: inViews
        }).dxCheckBox('instance');
        $wrap.append($checkRow);

        if (modeKey === 'map') {
          var $gridWrap = $('<div>').css({ flex: '1', minHeight: 0 });
          $gridWrap.append(self._createFieldGrid(modeKey));
          $wrap.append($gridWrap);

          var mapItems = (self.report.fields[modeKey] || []).map(function(f) { return { dataField: f.dataField, caption: f.caption || f.dataField }; });
          var $balloonBlock = $('<div>').css({ marginTop: '10px', padding: '8px', border: '1px solid #444', borderRadius: '6px', flexShrink: 0 });
          $('<div>').css({ fontSize: '12px', color: '#aaa', marginBottom: '5px' }).text('Баллун').appendTo($balloonBlock);
          var $balloonRow = $('<div>').css({ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' });
          $('<div>').appendTo($balloonRow).dxTagBox({
            placeholder: 'Поля баллуна',
            value: snapshotBalloon ? snapshotBalloon.fields : [],
            items: mapItems,
            displayExpr: 'caption',
            valueExpr: 'dataField',
            onValueChanged: function(e) {
              if (!self.report.mapSettings) self.report.mapSettings = {};
              if (!self.report.mapSettings.balloon) self.report.mapSettings.balloon = {};
              self.report.mapSettings.balloon.fields = e.value;
            }
          });
          $('<div>').css({ width: '80px' }).appendTo($balloonRow).dxNumberBox({
            placeholder: 'от',
            value: snapshotBalloon ? snapshotBalloon.minZoom : null,
            min: 0, max: 22, showSpinButtons: true,
            onValueChanged: function(e) {
              if (!self.report.mapSettings) self.report.mapSettings = {};
              if (!self.report.mapSettings.balloon) self.report.mapSettings.balloon = {};
              self.report.mapSettings.balloon.minZoom = e.value;
            }
          });
          $('<span>').css({ color: '#aaa', fontSize: '12px' }).text('до').appendTo($balloonRow);
          $('<div>').css({ width: '80px' }).appendTo($balloonRow).dxNumberBox({
            placeholder: 'до',
            value: snapshotBalloon ? snapshotBalloon.maxZoom : null,
            min: 0, max: 22, showSpinButtons: true,
            onValueChanged: function(e) {
              if (!self.report.mapSettings) self.report.mapSettings = {};
              if (!self.report.mapSettings.balloon) self.report.mapSettings.balloon = {};
              self.report.mapSettings.balloon.maxZoom = e.value;
            }
          });
          $wrap.append($balloonBlock);
        } else {
          var $gridWrap = $('<div>').css({ flex: '1', minHeight: 0 });
          $gridWrap.append(self._createFieldGrid(modeKey));
          $wrap.append($gridWrap);
        }

        return $wrap;
      },
      toolbarItems: [
        {
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: {
            text: 'Отменить',
            icon: 'revert',
            onClick: function() {
              if (snapshotFields !== null) {
                if (!self.report.fields) self.report.fields = {};
                self.report.fields[modeKey] = snapshotFields;
              } else {
                if (self.report.fields) delete self.report.fields[modeKey];
              }
              self.report.views = snapshotViews;
              if (snapshotBalloon !== null) {
                if (!self.report.mapSettings) self.report.mapSettings = {};
                self.report.mapSettings.balloon = snapshotBalloon;
              } else if (self.report.mapSettings && self.report.mapSettings.balloon) {
                delete self.report.mapSettings.balloon;
                if (Object.keys(self.report.mapSettings).length === 0) delete self.report.mapSettings;
              }
              $popupDiv.dxPopup('instance').hide();
            }
          }
        },
        {
          toolbar: 'bottom',
          location: 'after',
          widget: 'dxButton',
          options: {
            text: 'Сохранить',
            type: 'default',
            icon: 'check',
            onClick: function() {
              var views = snapshotViews.slice();
              var checked = checkInstance ? checkInstance.option('value') : false;
              var idx = views.indexOf(modeKey);
              if (checked && idx < 0) {
                views.push(modeKey);
                var order = ['grid', 'pivot', 'dashboard', 'map'];
                views.sort(function(a, b) { return order.indexOf(a) - order.indexOf(b); });
              } else if (!checked && idx >= 0) {
                views.splice(idx, 1);
              }
              self.report.views = views;
              if (self.options.onSaveFields) self.options.onSaveFields(self.report);
              $popupDiv.dxPopup('instance').hide();
            }
          }
        }
      ],
      onHidden: function() {
        $popupDiv.remove();
      }
    });
  }

  _createFieldGrid(modeKey) {
    var self = this;

    if (modeKey === 'grid') {
      var src = (self.report.fields && self.report.fields.grid) || [];
      var treeData = self._flattenForTree(src, null);
      return $('<div>').dxTreeList({
        dataSource: treeData,
        keyExpr: 'id',
        parentIdExpr: 'parentId',
        rootValue: null,
        showRowLines: true,
        showBorders: true,
        columnAutoWidth: true,
        height: '100%',
        scrolling: { mode: 'virtual' },
        editing: { mode: 'cell', allowUpdating: true, allowAdding: true, allowDeleting: true },
        columns: [
          { caption: 'Заголовок', dataField: 'caption', width: 200 },
          { caption: 'Поле', dataField: 'dataField', width: 180 },
          { caption: 'Формат', dataField: 'formatType', width: 120 },
          { caption: 'Точн.', dataField: 'formatPrecision', dataType: 'number', width: 70 },
          { caption: 'Фикс.', dataField: 'fixed', dataType: 'boolean', width: 70 },
          { caption: 'Позиция', dataField: 'fixedPosition', width: 90 },
          { caption: 'Групп.индекс', dataField: 'groupIndex', dataType: 'number', width: 90 },
          { caption: 'Группа', dataField: '_isGroup', dataType: 'boolean', width: 80 }
        ],
        onRowInserted: function(e) {
          if (!self.report.fields) self.report.fields = {};
          if (!self.report.fields.grid) self.report.fields.grid = [];
          var flat = e.component.getDataSource().items();
          self.report.fields.grid = self._unflattenColumns(flat);
        },
        onRowUpdated: function(e) {
          if (!self.report.fields) self.report.fields = {};
          var flat = e.component.getDataSource().items();
          self.report.fields.grid = self._unflattenColumns(flat);
        },
        onRowRemoved: function(e) {
          if (!self.report.fields) self.report.fields = {};
          var flat = e.component.getDataSource().items();
          self.report.fields.grid = self._unflattenColumns(flat);
        }
      });
    }

    var columns = {
      pivot: [
        { caption: 'Наименование', dataField: 'dataField', width: 180 },
        { caption: 'Заголовок', dataField: 'caption', width: 150 },
        { caption: 'Позиция', dataField: 'area', width: 100 },
        { caption: 'Тип', dataField: 'summaryType', width: 100 },
        { caption: 'Формат', dataField: 'format.type', width: 100 },
        { caption: 'Округление', dataField: 'format.precision', width: 90 }
      ],
      chart: [
        { caption: 'Наименование', dataField: 'dataField', width: 180 },
        { caption: 'Заголовок', dataField: 'caption', width: 150 },
        { caption: 'Ось/Знач', dataField: 'area', width: 100 },
        { caption: 'Тип', dataField: 'summaryType', width: 100 }
      ],
      map: [
        { caption: 'Наименование', dataField: 'dataField', width: 180 },
        { caption: 'Заголовок', dataField: 'caption', width: 150 },
        { caption: 'Назначение', dataField: 'area', width: 120 }
      ]
    };

    var colDef = columns[modeKey] || columns.pivot;
    var src = (self.report.fields && Array.isArray(self.report.fields[modeKey])) ? self.report.fields[modeKey] : [];
    var dataSource = src.length ? src.slice() : [];

    return $('<div>').dxDataGrid({
      dataSource: dataSource,
      columns: colDef,
      height: '100%',
      columnAutoWidth: true,
      editing: { mode: 'cell', allowUpdating: true, allowAdding: true, allowDeleting: true },
      allowColumnResizing: true,
      columnResizingMode: 'widget',
      showBorders: true,
      scrolling: { mode: 'virtual' },
      onRowUpdated: function(e) {
        if (!e.data || !e.data.dataField) return;
        if (!self.report.fields) self.report.fields = {};
        if (!self.report.fields[modeKey]) self.report.fields[modeKey] = [];
        var idx = self.report.fields[modeKey].findIndex(function(f) { return f && f.dataField === e.data.dataField; });
        if (idx >= 0) self.report.fields[modeKey][idx] = e.data;
      },
      onRowInserted: function(e) {
        if (!e.data || !e.data.dataField) return;
        if (!self.report.fields) self.report.fields = {};
        if (!self.report.fields[modeKey]) self.report.fields[modeKey] = [];
        self.report.fields[modeKey].push(e.data);
      },
      onRowRemoved: function(e) {
        if (!e.data || !e.data.dataField) return;
        if (!self.report.fields) self.report.fields = {};
        var arr = self.report.fields[modeKey] || [];
        var idx = arr.findIndex(function(f) { return f && f.dataField === e.data.dataField; });
        if (idx >= 0) { arr.splice(idx, 1); if (arr.length === 0) delete self.report.fields[modeKey]; }
      }
    });
  }

  _flattenForTree(arr, parentId) {
    var self = this;
    var result = [];
    (arr || []).forEach(function(item, idx) {
      var id = (parentId ? parentId + '_' : '') + idx;
      var node = { id: id, parentId: parentId, caption: item.caption || item.dataField || '', dataField: item.dataField || '' };
      if (item.fixed) node.fixed = item.fixed;
      if (item.fixedPosition) node.fixedPosition = item.fixedPosition;
      if (item.groupIndex !== undefined) node.groupIndex = item.groupIndex;
      if (item.format) { node.formatType = item.format.type || ''; node.formatPrecision = item.format.precision; }
      node._isGroup = !!(item.columns && item.columns.length);
      result.push(node);
      if (item.columns && item.columns.length) result = result.concat(self._flattenForTree(item.columns, id));
    });
    return result;
  }

  _unflattenColumns(nodes) {
    var map = {}, roots = [];
    (nodes || []).forEach(function(n) { map[n.id] = n; n.children = []; });
    (nodes || []).forEach(function(n) {
      if (n.parentId && map[n.parentId]) map[n.parentId].children.push(n);
      else roots.push(n);
    });
    function build(node) {
      if (!node._isGroup) {
        if (!node.dataField) return null;
        var col = { dataField: node.dataField, caption: node.caption || node.dataField };
        if (node.fixed) col.fixed = true;
        if (node.fixedPosition) col.fixedPosition = node.fixedPosition;
        if (node.groupIndex !== undefined && node.groupIndex !== null && node.groupIndex !== '') col.groupIndex = Number(node.groupIndex);
        if (node.formatType) { col.format = { type: node.formatType }; if (node.formatPrecision !== undefined) col.format.precision = Number(node.formatPrecision); }
        return col;
      }
      var grp = { caption: node.caption || '' };
      if (node.children.length) grp.columns = node.children.map(build).filter(Boolean);
      return grp;
    }
    return roots.map(build).filter(Boolean);
  }
}
