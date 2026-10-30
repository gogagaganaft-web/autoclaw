import { DataGridRenderer } from './DataGridRenderer.js';
import { PivotGridRenderer } from './PivotGridRenderer.js';
import { DashboardRenderer } from './DashboardRenderer.js';
import { MapRenderer } from './MapRenderer.js';
import { StatisticRenderer } from './StatisticRenderer.js';
import { ReportQuery } from './ReportQuery.js';
import { ExportManager } from './ExportManager.js';
import { saveStats } from './ReportStats.js';
import { interpolateQuery, removeClauseWithParam } from './QueryInterpolator.js';

function getErrorMessage(error) {
    var statusTexts = {
        400: 'Неверный запрос',
        401: 'Не авторизован',
        403: 'Доступ запрещён',
        404: 'Нет данных',
        405: 'Метод не разрешён',
        408: 'Таймаут запроса',
        409: 'Конфликт',
        422: 'Ошибка валидации',
        429: 'Слишком много запросов',
        500: 'Внутренняя ошибка сервера',
        502: 'Плохой шлюз',
        503: 'Сервис недоступен',
        504: 'Таймаут шлюза'
    };
    if (error.response) {
        return error.response.data && error.response.data.message
            || statusTexts[error.response.status]
            || error.response.statusText
            || 'Ошибка сервера';
    }
    if (error.message) {
        if (error.message.indexOf('timeout') >= 0 || error.message.indexOf('timeout') >= 0) return 'Таймаут соединения';
        if (error.message.indexOf('Network Error') >= 0) return 'Сетевая ошибка';
        return error.message;
    }
    return 'Неизвестная ошибка';
}

export class ReportRenderer {
  constructor(containerSelector, report, globalSettings = {}) {
    this.container = $(containerSelector);
    this.report = report;
    this.mode = 'grid';
    this.lastParams = {};
    this.lastResult = null;
    this.currentRenderer = null;
    this.reportToken = null;
    this.reportColumns = null;
    this.reportTotalRows = 0;
    this.reportServerPivot = false;
    
    this.globalSettings = {
      serverExecuteMultiUrl: globalSettings.serverExecuteMultiUrl || 'http://localhost:7501/api/execute-multi',
      requestTimeout: globalSettings.requestTimeout || 3600000
    };

    this.apiBase = globalSettings.apiBase || 'http://localhost:7502';
    this.apiBaseLarge = globalSettings.apiBaseLarge || globalSettings.apiBase || 'http://localhost:7502';
    this.apiBaseMulti = globalSettings.apiBaseMulti || 'http://localhost:7504';
    this.reportApiBase = this.apiBase;
    this.onSave = globalSettings.onSave || null;
    this.onSaveFields = globalSettings.onSaveFields || null;
    this.onDatasetFields = globalSettings.onDatasetFields || null;
    if (!window.__reportRenderers) window.__reportRenderers = new Set();
    window.__reportRenderers.add(this);
    console.log('ReportRenderer.apiBase:', this.apiBase, 'processing:', this.report.processing);
  }

  // Выбор баз: если отчёт сам НЕ задаёт БД_ЮЛ/БД_ФЛ в filters —
  // игнорируем выбор в панели фильтров и используем report.db.
  _resolveDbNames(params) {
    params = params || {};
    var rf = this.report.filters || {};
    var declaresBd = Object.prototype.hasOwnProperty.call(rf, 'БД_ЮЛ')
                  || Object.prototype.hasOwnProperty.call(rf, 'БД_ФЛ');
    var raw;
    if (declaresBd) {
      raw = params.БД_ЮЛ || params.БД_ФЛ;
      console.log('[db] отчёт задаёт БД-фильтры → выбор пользователя:', raw);
    } else {
      raw = this.report.db || DEFAULT_DB_FL;
      console.log('[db] отчёт не задаёт БД-фильтры → report.db:', raw);
    }
    if (!Array.isArray(raw)) raw = raw ? [raw] : [];
    if (raw.length === 0) raw = [this.report.db || DEFAULT_DB_FL];
    return raw;
  }

  async render(params, onCompleteCallback) {
    this.lastParams = params;
    const abortController = new AbortController();
    this.abortController = abortController;
    window.currentAbortController = abortController;
    const startTime = Date.now();

    try {
      if (this.mode === 'query') {
        this.cleanupCurrentRenderer();
        this.container.empty();
        this.renderQuery();
      } else if (this.report.processing === 'server') {
        await this.renderBigReport(params);
      } else if (this.report.processing === 'server-multi') {
        await this.renderBigReportMulti(params);
      } else {
        var dbName = this._resolveDbNames(params);
        console.log('[render client] mode:', this.mode, '| text:', this.report.text, '| dbName:', dbName, '| query len:', (this.report.query || '').length);
        this.cleanupCurrentRenderer();
        this.container.empty();
        const sql = interpolateQuery(this.report.query, params);
        const result = await this.fetchData(sql, dbName);
        this.lastResult = result;

        if (this.mode === 'pivot') {
          this.renderPivotGrid(result);
        } else if (this.mode === 'dashboard') {
          this.renderDashboard(result);
        } else if (this.mode === 'map') {
          this.renderMap(result);
        } else if (this.mode === 'statistic') {
          this.renderStatistic();
        } else {
          this.renderDataGrid(result);
        }
      }

      if (onCompleteCallback && typeof onCompleteCallback === 'function') {
        onCompleteCallback();
      }

      var durationMs = Date.now() - startTime;
      if (this.mode !== 'query') {
        var totalRows = 0;
        if (this.reportTotalRows) {
          totalRows = this.reportTotalRows;
        } else if (this.lastResult && this.lastResult.totalRows) {
          totalRows = this.lastResult.totalRows;
        } else if (this.lastResult && this.lastResult.rows) {
          totalRows = this.lastResult.rows.length;
        }
        saveStats(this.report.id, this.report.text, params, durationMs, totalRows);
      }

      if (window.refreshStats && typeof window.refreshStats === 'function') {
        window.refreshStats(this.report.id);
      }
    } finally {
      if (this.abortController === window.currentAbortController) {
        window.currentAbortController = null;
      }
      this.abortController = null;
    }
  }

  // ─── BIG SERVER REPORT ──────────────────────────────────────────────────

  async renderBigReport(params) {
    let dbNames = this._resolveDbNames(params);
    console.log('renderBigReport dbNames:', dbNames, 'report.db:', this.report.db);
    const sql = interpolateQuery(this.report.query, params);

    this.cleanupCurrentRenderer();
    this.container.empty();
    await this.closeBigReportSession();
    this.lastResult = null;
    this.reportApiBase = this.apiBase;
    this.reportServerPivot = false;

    DevExpress.ui.notify('Выполнение запроса (сервер)...', 'info', 3000, { position: "center", direction: "up-push" });
    this.showLoadPanel();
    const elapsedTimer = this.startElapsedTimer(this.apiBase);

    try {
      const response = await axios.post(this.apiBase + '/api/report/init', 
        { dbNames, sql, reportName: this.report.text },
        { headers: { 'Content-Type': 'application/json' }, timeout: this.globalSettings.requestTimeout, signal: this.abortController.signal }
      );

      const { token, columns, totalRows } = response.data;
      this.reportToken = token;
      this.reportColumns = columns;
      this.reportTotalRows = totalRows;
      console.log('renderBigReport: получен токен', token.slice(0,8)+'...', 'строк:', totalRows);

      if (totalRows === 0) {
        DevExpress.ui.notify('Нет данных для отображения', 'info', 3000, { position: "center", direction: "up-push" });
      } else {
        DevExpress.ui.notify(`Готово: ${totalRows} записей`, 'success', 3000, { position: "center", direction: "up-push" });
      }

      if (!token) {
        this.currentRenderer = null;
        return;
      }

      if (this.mode === 'pivot' || this.mode === 'dashboard' || this.mode === 'map') {
        const data = await this.fetchAllReportData();
        if (this.mode === 'pivot') this.renderPivotGrid(data);
        else if (this.mode === 'dashboard') this.renderDashboard(data);
        else this.renderMap(data);
      } else {
        this.renderBigReportDataGrid({ token, columns, totalRows });
      }
    } catch (error) {
      if (axios.isCancel(error)) return;
      const msg = getErrorMessage(error);
      DevExpress.ui.notify(`Ошибка: ${msg}`, 'error', 5000, { position: "center", direction: "up-push" });
      console.error('Ошибка renderBigReport:', error);
    } finally {
      if (elapsedTimer) clearInterval(elapsedTimer);
      this.hideLoadPanel();
    }
  }

  async renderBigReportMulti(params) {
    let dbNames = this._resolveDbNames(params);
    const sql = interpolateQuery(this.report.query, params);

    console.groupCollapsed(`%c[7504 renderBigReportMulti] ${this.report.text}`, 'color:#0a7;font-weight:bold');
    console.log('БД (dbNames):', dbNames);
    console.log('SQL запроса (после интерполяции):');
    console.log(sql);
    console.groupEnd();

    this.cleanupCurrentRenderer();
    this.container.empty();
    await this.closeBigReportSession();
    this.lastResult = null;

    const requestId = this._newRequestId();
    DevExpress.ui.notify('Выполнение запроса (сервер, мульти-БД)...', 'info', 3000, { position: "center", direction: "up-push" });
    this._showMultiProgressOverlay(dbNames);
    this._startMultiProgressPolling(this.apiBaseMulti, requestId);

    let ok = false;
    try {
      const response = await axios.post(this.apiBaseMulti + '/api/report/init', 
        { dbNames, sql, reportName: this.report.text, requestId },
        { headers: { 'Content-Type': 'application/json' }, timeout: this.globalSettings.requestTimeout, signal: this.abortController.signal }
      );

      const { token, columns, totalRows, dbStats, errors } = response.data;
      this.reportToken = token;
      this.reportColumns = columns;
      this.reportTotalRows = totalRows;
      this.reportApiBase = this.apiBaseMulti;
      this.reportServerPivot = true;
      console.log('renderBigReportMulti: получен токен', token.slice(0,8)+'...', 'строк:', totalRows);
      if (dbStats && dbStats.length) {
        console.table(dbStats);
      } else {
        console.warn('dbStats отсутствует в ответе init (сервер не обновлён?)');
      }
      if (errors && errors.length) {
        const d = response.data;
        DevExpress.ui.notify(
          'Выполнено ' + (d.ok || 0) + ' из ' + (d.total || 0) + ' филиалов.\n' + errors.join('\n'),
          'warning', 8000, { position: 'center', direction: 'up-push' }
        );
      }

      ok = true;
      if (this._progressTitleEl) this._progressTitleEl.text('Готово: ' + totalRows + ' записей');

      if (totalRows === 0) {
        DevExpress.ui.notify('Нет данных для отображения', 'info', 3000, { position: "center", direction: "up-push" });
      } else {
        DevExpress.ui.notify(`Готово: ${totalRows} записей`, 'success', 3000, { position: "center", direction: "up-push" });
      }

      if (!token) {
        this.currentRenderer = null;
        return;
      }

      if (this.mode === 'pivot' && !this._pivotNeedsClientAggregation()) {
        this._renderServerPivot(token, this.apiBaseMulti, totalRows);
      } else if (this.mode === 'pivot' || this.mode === 'dashboard' || this.mode === 'map') {
        // Свод с интервалами дат (groupInterval) строим на клиенте — так же и тот же
        // рендер, что и в дашборде (сервер не форматирует интервалы как DevExpress).
        const data = await this.fetchAllReportData();
        if (this.mode === 'pivot') this.renderPivotGrid(data);
        else if (this.mode === 'dashboard') this.renderDashboard(data);
        else this.renderMap(data);
      } else {
        this.renderBigReportDataGrid({ token, columns, totalRows });
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        this._hideMultiProgressOverlay();
        return;
      }
      const msg = getErrorMessage(error);
      DevExpress.ui.notify(`Ошибка: ${msg}`, 'error', 5000, { position: "center", direction: "up-push" });
      console.error('Ошибка renderBigReportMulti:', error);
    } finally {
      this._stopMultiProgressPolling();
      if (ok) {
        const self = this;
        setTimeout(function() { self._hideMultiProgressOverlay(); }, 1500);
      }
    }
  }

  _newRequestId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  _ensureMultiProgressStyles() {
    if (document.getElementById('multi-progress-styles')) return;
    const st = document.createElement('style');
    st.id = 'multi-progress-styles';
    st.textContent = `
.multi-progress-overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:20000;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center}
.multi-progress-card{background:#202b3a;border:1px solid #3a4a5e;border-radius:10px;padding:18px 22px;min-width:380px;max-width:640px;max-height:80vh;overflow:auto;box-shadow:0 8px 30px rgba(0,0,0,.5);color:#dfe7f0;font-family:Roboto,Arial,sans-serif;font-size:13px}
.multi-progress-title{font-size:15px;font-weight:600;margin-bottom:12px;color:#7ab3ff}
.multi-progress-row{display:flex;align-items:center;gap:10px;padding:5px 0}
.multi-progress-db{width:190px;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#cfd8e3}
.multi-progress-bar{width:220px;flex:none}
.multi-progress-bar .dx-progressbar-container{height:8px}
.multi-progress-status{flex:1;color:#aab6c4}
.multi-progress-status.ok{color:#7ed957}
.multi-progress-status.err{color:#ff6b6b}
.multi-progress-foot{margin-top:12px;color:#8fa1b3;font-size:12px}
.multi-progress-foot .multi-progress-mem{color:#7f93a8}
`;
    document.head.appendChild(st);
  }

  _showMultiProgressOverlay(dbNames) {
    this._ensureMultiProgressStyles();
    this._hideMultiProgressOverlay();
    const overlay = $('<div>').addClass('multi-progress-overlay').appendTo(document.body);
    const card = $('<div class="multi-progress-card">').appendTo(overlay);
    this._progressTitleEl = $('<div class="multi-progress-title">').text('Выполнение шардированного параллельного запроса на SQL-серверах в филиалах').appendTo(card);
    this._progressRows = {};
    const self = this;
    dbNames.forEach(function(name) {
      const row = $('<div class="multi-progress-row">').appendTo(card);
      const nameEl = $('<div class="multi-progress-db">').text(name).appendTo(row);
      const barEl = $('<div class="multi-progress-bar">').appendTo(row);
      const statusEl = $('<div class="multi-progress-status">').text('подключение…').appendTo(row);
      let bar = null;
      try {
        bar = new DevExpress.ui.dxProgressBar(barEl.get(0), { min: 0, max: 100, value: 10, showStatus: false });
      } catch (e) { bar = null; }
      self._progressRows[name] = { bar: bar, statusEl: statusEl, nameEl: nameEl, domRow: row };
    });
    const foot = $('<div class="multi-progress-foot">').appendTo(card);
    this._progressElapsedEl = $('<span class="multi-progress-elapsed">0 с</span>').appendTo(foot);
    this._progressMemEl = $('<span class="multi-progress-mem">').appendTo(foot);
    this._progressOverlay = overlay;
    this._progressSorted = false;

    this._progressEscHandler = function(e) {
      if (e.key === 'Escape') self.abortController.abort();
    };
    $(document).on('keydown', this._progressEscHandler);
  }

  _hideMultiProgressOverlay() {
    if (this._progressOverlay) {
      this._progressOverlay.remove();
      this._progressOverlay = null;
      this._progressRows = null;
      this._progressTitleEl = null;
      this._progressElapsedEl = null;
      this._progressMemEl = null;
    }
    if (this._progressEscHandler) {
      $(document).off('keydown', this._progressEscHandler);
      this._progressEscHandler = null;
    }
  }

  _startMultiProgressPolling(apiBase, requestId) {
    const self = this;
    const startedAt = Date.now();
    this._stopMultiProgressPolling();
    this._progressTimer = setInterval(function() {
      if (!self._progressOverlay) return;
      const elapsed = +((Date.now() - startedAt) / 1000).toFixed(3);
      if (self._progressElapsedEl) self._progressElapsedEl.text('Общее время: ' + elapsed + ' с');
      if (self._progressMemEl) {
        axios.get(apiBase + '/api/mem', { timeout: 2500 })
          .then(function(resp) {
            const d = resp && resp.data;
            if (!d || typeof d.rssMB !== 'number' || !self._progressMemEl) return;
            const total = d.totalMB || 0;
            const pct = d.percent != null ? d.percent : (total > 0 ? (d.rssMB / total) * 100 : 0);
            const totalStr = total >= 1024 ? (total / 1024).toFixed(1) + ' ГБ' : Math.round(total) + ' МБ';
            self._progressMemEl.text(' · сервер: ' + Math.round(d.rssMB) + ' МБ (' + pct.toFixed(2) + '% от ' + totalStr + ')');
          })
          .catch(function() {});
      }
      axios.get(apiBase + '/api/multi/progress?requestId=' + encodeURIComponent(requestId), { timeout: 2500 })
        .then(function(resp) { self._applyMultiProgress(resp.data); })
        .catch(function() {});
    }, 700);
  }

  _stopMultiProgressPolling() {
    if (this._progressTimer) {
      clearInterval(this._progressTimer);
      this._progressTimer = null;
    }
  }

  _applyMultiProgress(data) {
    if (!data || !data.dbs || !this._progressRows) return;
    const self = this;
    const now = Date.now();
    data.dbs.forEach(function(d) {
      const row = self._progressRows[d.db];
      if (!row) return;
      if (d.label && row.nameEl) row.nameEl.text(d.label);

      let value = 10;
      let text = 'подключение…';
      let cls = '';

      if (d.state === 'exec') {
        if (!row._execAt) row._execAt = now;
        row._prevState = 'exec';
        const s = +((now - row._execAt) / 1000).toFixed(3);
        value = 45 + Math.min(35, Math.round((s / 30) * 35));
        text = s + ' с';
      } else if (d.state === 'rows' || d.state === 'ok' || d.state === 'error') {
        if (row._prevState !== d.state) {
          row._frozenElapsed = row._execAt ? +((now - row._execAt) / 1000).toFixed(3) : 0;
          row._prevState = d.state;
        }
        const s = row._frozenElapsed;
        if (d.state === 'rows') {
          value = 80;
          text = 'строк: ' + d.rows + ' (' + s + ' с)';
        } else if (d.state === 'ok') {
          value = 100;
          text = '✓ ' + d.rows + ' строк (' + s + ' с)';
          cls = 'ok';
        } else {
          value = 100;
          text = '✗ ' + (d.error || 'ошибка') + (s > 0 ? ' (' + s + ' с)' : '');
          cls = 'err';
        }
      }

      if (row.bar) {
        try { row.bar.option('value', value); } catch (e) {}
      }
      row.statusEl.text(text).removeClass('ok err').addClass(cls);
    });

    if (!self._progressSorted) {
      var allLabelled = true;
      data.dbs.forEach(function(d) { if (!d.label) allLabelled = false; });
      if (allLabelled) {
        var card = self._progressOverlay.find('.multi-progress-card');
        var foot = card.find('.multi-progress-foot').detach();
        var rows = card.find('.multi-progress-row').detach().toArray();
        rows.sort(function(a, b) {
          return $(a).find('.multi-progress-db').text().localeCompare($(b).find('.multi-progress-db').text());
        });
        card.append(rows);
        card.append(foot);
        self._progressSorted = true;
      }
    }
  }

  renderBigReportDataGrid(data) {
    const { token, columns, totalRows } = data;
    if (!token) {
      console.warn('renderBigReportDataGrid: пустой токен — рендер грида пропущен');
      return;
    }
    console.log('Рендерим DataGrid (серверный пейджинг+фильтр+сортировка), строк:', totalRows);

    const self = this;

    console.log('renderBigReportDataGrid: токен для store', token.slice(0,8)+'...');
    const store = new DevExpress.data.CustomStore({
      key: undefined,
      load: function(loadOptions) {
        const pageSize = loadOptions.take || 100;
        const page = Math.floor((loadOptions.skip || 0) / pageSize) + 1;

        const payload = { token, page, pageSize };
        if (loadOptions.filter) {
          payload.filter = loadOptions.filter;
        }
        if (loadOptions.sort) {
          payload.sort = loadOptions.sort;
        }

        console.log('store.load page:', page, 'token:', token.slice(0,8)+'...');
        return axios.post(self.apiBase + '/api/report/page', payload,
          { headers: { 'Content-Type': 'application/json' }, timeout: self.globalSettings.requestTimeout }
        ).then(function(response) {
          const rows = response.data.rows.map(function(row) {
            const obj = {};
            columns.forEach(function(col, i) {
              obj[col] = row[i];
            });
            return obj;
          });
          console.log('store.load ответ: строк:', rows.length, 'totalRows:', response.data.totalRows);
          return {
            data: rows,
            totalCount: response.data.totalRows
          };
        }).catch(function(err) {
          var msg = getErrorMessage(err);
          DevExpress.ui.notify('Ошибка загрузки: ' + msg, 'error', 5000, { position: "center", direction: "up-push" });
          throw new Error(msg);
        });
      }
    });

    const gridColumns = columns.map(function(col) {
      return { dataField: col, caption: col };
    });

    const gridContainer = $('<div>').appendTo(this.container);
    this.currentRenderer = gridContainer.dxDataGrid({
      dataSource: {
        store: store,
        paginate: true,
        pageSize: 100
      },
      columns: gridColumns,
      remoteOperations: {
        paging: true,
        filtering: true,
        sorting: true,
        groupPaging: false
      },
      showBorders: true,
      allowColumnResizing: true,
      columnAutoWidth: true,
      height: '90.9vh',
      showColumnLines: true,
      loadPanel: { enabled: true },
      scrolling: { mode: 'standard' },
      paging: { enabled: true, pageSize: 100 },
      pager: {
        visible: true,
        showPageSizeSelector: true,
        allowedPageSizes: [50, 100, 200, 500],
        showInfo: true,
        showNavigationButtons: true
      },
      columnChooser: {
        mode: "select", height: 450, width: 450, enabled: true,
        position: { my: 'center top', at: 'center top', of: '#datagrid' }
      },
      columnResizingMode: 'nextColumn',
      filterPanel: { visible: true },
      filterBuilderPopup: { width: 800, title: "Фильтр : " },
      headerFilter: { visible: true, search: { enabled: true } },
      export: { enabled: true },
      onContentReady: function(e) {
        if (!e || !e.component) return;
        var gridWidth = 0;
        var cols = e.component.getVisibleColumns();
        if (cols && cols.length > 0) {
          cols.forEach(function(col) {
            gridWidth += col.width || 0;
          });
        }
        if (gridWidth > 0) {
          e.element.css('width', gridWidth + 'px');
        }
      },
      onExporting: function(e) {
        ExportManager.exportDataGrid(e, {
          mode: self.report.processing || 'server',
          reportName: self.report?.text,
          token: token,
          apiBase: self.reportApiBase || self.apiBase,
          totalRows: totalRows,
          rows: []
        });
      },
      onContextMenuPreparing: function(e) {
        if (e.row && e.row.rowType === "data") {
          if (!e.items) e.items = [];
          const dataGridInstance = e.component;
          const currentColumns = dataGridInstance.option('columns');
          e.items.push(
            {
              beginGroup: true,
              text: 'Управление столбцами',
              items: currentColumns.map(column => ({
                text: column.caption || column.dataField,
                onItemClick: () => {
                  const newColumns = currentColumns.map(col => {
                    if (col.dataField === column.dataField) {
                      return { ...col, visible: !col.visible };
                    }
                    return col;
                  });
                  dataGridInstance.option('columns', newColumns);
                }
              }))
            },
            {
              beginGroup: true,
              text: 'Показать все столбцы',
              onItemClick: () => {
                const newColumns = currentColumns.map(col => ({ ...col, visible: true }));
                dataGridInstance.option('columns', newColumns);
              }
            },
            {
              text: 'Скрыть все столбцы',
              onItemClick: () => {
                const newColumns = currentColumns.map(col => ({ ...col, visible: false }));
                dataGridInstance.option('columns', newColumns);
              }
            },
            {
              beginGroup: true,
              text: 'Экспорт в EXCEL',
              onItemClick: () => {
                DevExpress.ui.notify("Экспорт в EXCEL", "success", 1500);
                dataGridInstance.exportToExcel();
              }
            }
          );
        }
      }
    });
  }

  async closeBigReportSession() {
    if (this.reportToken) {
      try {
        const opts = { headers: { 'Content-Type': 'application/json' } };
        if (this.abortController) opts.signal = this.abortController.signal;
        await axios.post(this.reportApiBase + '/api/report/close',
          { token: this.reportToken }, opts
        );
      } catch(e) {
        if (!axios.isCancel(e)) console.warn('Error closing report session:', e);
      }
      this.reportToken = null;
      this.reportColumns = null;
      this.reportTotalRows = 0;
    }
  }

  async fetchAllReportData() {
    if (this.lastResult && this.lastResult.dataSource) {
      return this.lastResult;
    }

    const pageSize = 50000;
    const totalPages = Math.ceil(this.reportTotalRows / pageSize);
    const startTime = new Date();
    console.log('fetchAllReportData: загрузка', this.reportTotalRows, 'записей пачками по', pageSize);
    DevExpress.ui.notify(`Загрузка ${this.reportTotalRows} записей...`, 'info', 3000, { position: "center", direction: "up-push" });
    this.showLoadPanel();

    const apiBase = this.reportApiBase || this.apiBase;
    const token = this.reportToken;
    const columns = this.reportColumns;
    const signal = this.abortController ? this.abortController.signal : null;
    let allRows = [];
    console.log(`fetchAllReportData: пагинация по ${apiBase}/api/report/page, token=${token ? token.slice(0,8)+'...' : 'нет'}`);

    try {
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.post(apiBase + '/api/report/page',
          { token, page, pageSize },
          { headers: { 'Content-Type': 'application/json' }, timeout: this.globalSettings.requestTimeout, signal }
        );
        const rows = response.data.rows.map(function(row) {
          const obj = {};
          columns.forEach(function(col, i) {
            obj[col] = row[i];
          });
          return obj;
        });
        allRows = allRows.concat(rows);
        DevExpress.ui.notify(`Загружено ${allRows.length} из ${this.reportTotalRows}`, 'info', 1500, { position: "center", direction: "up-push" });
      }

      const result = {
        columns: columns,
        rows: allRows,
        dataSource: allRows,
        totalRows: this.reportTotalRows
      };
      this.lastResult = result;
      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
      DevExpress.ui.notify(`Получено ${allRows.length} записей.  Время : ${elapsedSeconds} сек`, 'success', 2000, { position: "center", direction: "up-push" });
      console.log('fetchAllReportData: загружено', result.totalRows);
      return result;
    } catch (error) {
      if (axios.isCancel(error)) return;
      const msg = getErrorMessage(error);
      console.error('fetchAllReportData error:', error);
      DevExpress.ui.notify(`Ошибка загрузки: ${msg}`, 'error', 5000, { position: "center", direction: "up-push" });
    } finally {
      this.hideLoadPanel();
    }
  }

  // ─── RENDERERS ───────────────────────────────────────────────────────────

  renderDataGrid(data) {
    console.log('Рендерим таблицу (DataGrid)');
    this.currentRenderer = DataGridRenderer.render(this.container, data, this.report);
  }

  renderPivotGrid(data) {
    console.log('Рендерим сводную таблицу (PivotGrid)');
    this.currentRenderer = PivotGridRenderer.render(this.container, data, this.report);
  }

  // Свод с полями-интервалами дат (groupInterval) сервер отдаёт без формата,
  // который показывает DevExpress в дашборде, поэтому такие отчёты рендерим на клиенте.
  _pivotNeedsClientAggregation() {
    const fields = (this.report && this.report.fields && this.report.fields.pivot) || [];
    return fields.some(function (f) { return f && f.groupInterval; });
  }

  _renderServerPivot(token, apiBase, totalRows) {
    this.showLoadPanel();
    this.renderPivotGrid({
      serverPivot: true,
      token: token,
      apiBase: apiBase,
      totalRows: totalRows,
      onLoadingChanged: (isLoading) => {
        if (isLoading) this.showLoadPanel();
        else this.hideLoadPanel();
      }
    });
  }

  renderDashboard(data) {
    console.log('Рендерим инфографику (Dashboard)');
    this.currentRenderer = DashboardRenderer.render(this.container, data, this.report);
  }

  renderMap(data) {
    console.log('Рендерим карту (Map)');
    this.currentRenderer = MapRenderer.render(this.container, data, this.report);
  }

  renderStatistic() {
    console.log('Рендерим статистику');
    this.currentRenderer = StatisticRenderer.render(this.container, this.report);
  }

  renderQuery() {
    console.log('Рендерим редактор запроса');
    this.cleanupCurrentRenderer();
    this.container.empty();
    var clientBase = (this.globalSettings.serverExecuteMultiUrl || 'http://localhost:7501/api/execute-multi').replace(/\/api\/execute-multi$/, '') || 'http://localhost:7501';
    var instance = ReportQuery.render(this.container, this.report, {
      apiBase: this.apiBase || 'http://localhost:7501',
      apiBases: {
        client: clientBase,
        server: this.apiBaseLarge || 'http://localhost:7502',
        'server-multi': this.apiBaseMulti || 'http://localhost:7504'
      },
      onSave: this.onSave,
      onSaveFields: this.onSaveFields,
      onDatasetFields: this.onDatasetFields
    });
    this.currentRenderer = instance;
  }

  cleanupCurrentRenderer() {
    if (this.currentRenderer) {
      if (typeof this.currentRenderer.cleanup === 'function') {
        console.log('Очистка текущего рендера');
        this.currentRenderer.cleanup();
      }
      this.currentRenderer = null;
    }
  }

  // ─── SET MODE ────────────────────────────────────────────────────────────

  setMode(mode) {
    console.log('ReportRenderer.setMode - переключение с:', this.mode, 'на:', mode);

    if (this.mode === 'map' && this.currentRenderer) {
      if (typeof this.currentRenderer.cleanup === 'function') {
        console.log('Очистка элементов карты');
        this.currentRenderer.cleanup();
      }
      this.currentRenderer = null;
    }

    this.mode = mode;

    if (this.reportToken) {
      this.cleanupCurrentRenderer();
      this.container.empty();

      if (mode === 'pivot' && this.reportServerPivot && !this._pivotNeedsClientAggregation()) {
        this._renderServerPivot(this.reportToken, this.reportApiBase, this.reportTotalRows);
      } else if (mode === 'pivot' || mode === 'dashboard' || mode === 'map') {
        if (this.lastResult && this.lastResult.dataSource) {
          const data = this.lastResult;
          if (mode === 'pivot') this.renderPivotGrid(data);
          else if (mode === 'dashboard') this.renderDashboard(data);
          else this.renderMap(data);
        } else {
          this.fetchAllReportData().then(data => {
            if (mode === 'pivot') this.renderPivotGrid(data);
            else if (mode === 'dashboard') this.renderDashboard(data);
            else this.renderMap(data);
          }).catch(function(e) {
            console.error('Error switching mode:', e);
          });
        }
      } else if (mode === 'statistic') {
        this.renderStatistic();
      } else if (mode === 'query') {
        this.renderQuery();
      } else {
        this.renderBigReportDataGrid({
          token: this.reportToken,
          columns: this.reportColumns,
          totalRows: this.reportTotalRows
        });
      }
    } else if (this.lastResult) {
      console.log('Перерендериваем с новым режимом:', mode);
      this.container.empty();

      if (mode === 'pivot') {
        this.renderPivotGrid(this.lastResult);
      } else if (mode === 'dashboard') {
        this.renderDashboard(this.lastResult);
      } else if (mode === 'map') {
        this.renderMap(this.lastResult);
      } else if (mode === 'statistic') {
        this.renderStatistic();
      } else if (mode === 'query') {
        this.renderQuery();
      } else {
        this.renderDataGrid(this.lastResult);
      }
    } else {
      if (mode === 'statistic') {
        this.renderStatistic();
      } else if (mode === 'query') {
        this.renderQuery();
      } else {
        console.warn('Нет сохраненных данных для перерендеринга');
      }
    }
  }

  destroy() {
    console.log('Уничтожение ReportRenderer');
    this.closeBigReportSession();
    this.cleanupCurrentRenderer();
    this.container.empty();
    this.currentRenderer = null;
    this.lastResult = null;
    if (window.__reportRenderers) {
      window.__reportRenderers.delete(this);
    }
  }

  // Закрытие сессии "в последний момент" (смена отчёта, выход, pagehide):
  // fetch с keepalive не обрезается при закрытии/уходе со страницы.
  closeReportSessionKeepAlive() {
    if (!this.reportToken) return;
    const token = this.reportToken;
    const url = (this.reportApiBase || this.apiBase) + '/api/report/close';
    this.reportToken = null;
    this.reportColumns = null;
    this.reportTotalRows = 0;
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
        keepalive: true
      }).catch(function() {});
    } catch(e) {
      console.warn('closeReportSessionKeepAlive error:', e);
    }
  }

  // ─── QUERY / OLD STUFF ───────────────────────────────────────────────────

  async fetchData(sql, dbName) {
    const startTime = new Date();
    DevExpress.ui.notify(`Подключение...`, 'success', 1000, { position: "center", direction: "up-push" });    
    const updateElapsedTime = () => {
      const currentTime = new Date();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    DevExpress.ui.notify(`Получение данных: ${elapsedSeconds} сек`, 'success', 1000, { position: "center", direction: "up-push" });
    };
    
    const timerInterval = setInterval(updateElapsedTime, 1000);
    
    try {
      const $loadPanel = $('#loadPanel');
      let loadPanelInstance = null;
      if ($loadPanel.length > 0) {
        loadPanelInstance = $loadPanel.data('dxLoadPanel');
        if (loadPanelInstance) {
          loadPanelInstance.show();
        }
      }

      const dbNames = Array.isArray(dbName) ? dbName : [dbName || DEFAULT_DB_FL];
      if (dbNames.length === 0) dbNames = [this.report.db || DEFAULT_DB_FL];
      console.log('[fetchData] report.text:', this.report.text, '| dbNames:', JSON.stringify(dbNames), '| sql len:', (sql || '').length);
      console.log('[fetchData] sql начало:', (sql || '').slice(0, 80).replace(/\r?\n/g, '\\n'));

      const response = await axios.post(this.globalSettings.serverExecuteMultiUrl, 
        {
          dbNames: dbNames,
          sql: sql,
          reportName: this.report.text || ''
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: this.globalSettings.requestTimeout,
          signal: this.abortController ? this.abortController.signal : null
        }
      );

      clearInterval(timerInterval);
      
      if (response.status === 204) {
        DevExpress.ui.notify('Данные не найдены (204 No Content)', 'warning', 2000, { position: "center", direction: "up-push" });
        return { columns: [], rows: [], dataSource: [] };
      }

      const { columns, rows } = response.data;
      const dataSource = rows.map(row => {
        const obj = {};
        columns.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
      
      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
      DevExpress.ui.notify(`Получено ${rows.length} записей.  Время : ${elapsedSeconds} сек`,'success',2000, { position: "center", direction: "up-push" });
      return { columns, rows, dataSource };
      
    } catch (error) {
      clearInterval(timerInterval);
      if (axios.isCancel(error)) return { columns: [], rows: [], dataSource: [] };
      console.error('Ошибка при загрузке данных:', error);
      const endTime = new Date();
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
      DevExpress.ui.notify('Ошибка загрузки данных', 'error', 2000, { position: "center", direction: "up-push" });
      return { columns: [], rows: [], dataSource: [] };
    } finally {
      const $loadPanel = $('#loadPanel');
      if ($loadPanel.length > 0) {
        const loadPanelInstance = $loadPanel.data('dxLoadPanel');
        if (loadPanelInstance) {
          loadPanelInstance.hide();
        }
      }
    }
  }

  showLoadPanel() {
    const $panel = $('#loadPanel');
    if ($panel.length > 0) {
      const instance = $panel.data('dxLoadPanel');
      if (instance) instance.show();
    }
  }

  hideLoadPanel() {
    const $panel = $('#loadPanel');
    if ($panel.length > 0) {
      const instance = $panel.data('dxLoadPanel');
      if (instance) instance.hide();
    }
    this.disposeElapsedToast();
  }

  disposeElapsedToast() {
    if (!this._elapsedToast) return;
    try {
      if (this._elapsedToast.instance && typeof this._elapsedToast.instance.hide === 'function') {
        this._elapsedToast.instance.hide();
      }
    } catch (err) {
      console.warn('disposeElapsedToast hide error:', err);
    }
    try {
      if (this._elapsedToast.element) this._elapsedToast.element.remove();
    } catch (err) {
      console.warn('disposeElapsedToast remove error:', err);
    }
    this._elapsedToast = null;
  }

  startElapsedTimer(apiBase) {
    const startTime = new Date();
    const portMatch = apiBase ? apiBase.match(/:(\d{4})$/) : null;
    const port = portMatch ? portMatch[1] : null;
    const memLabels = { '7502': 'Сервер', '7504': 'Мульти-Сервер' };
    const memLabel = memLabels[port];

    this.disposeElapsedToast();

    let $line1 = null;
    let $line2 = null;
    let toastInstance = null;

    try {
      const $toast = $('<div>').appendTo(document.body);
      $toast.dxToast({
        type: 'success',
        displayTime: 600000,
        position: { my: 'center bottom', at: 'center bottom', of: window, offset: '0 -20' },
        closeOnSwipe: false,
        closeOnClick: false,
        hideOnOutsideClick: false,
        contentTemplate: function(content) {
          const $c = $(content);
          if ($c.find('.mem-stat-line').length > 0) return content;
          $c.addClass('mem-toast-wrap').css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            whiteSpace: 'normal',
            maxWidth: '80vw'
          });
          $line1 = $('<div class="mem-to-line" style="display:block;width:100%;text-align:center;font-size:14px;line-height:1.3;white-space:normal;">').appendTo($c);
          $line2 = $('<div class="mem-to-line" style="display:block;width:100%;text-align:center;font-size:13px;opacity:0.85;line-height:1.3;white-space:normal;">').appendTo($c);
          return content;
        }
      });
      toastInstance = $toast.dxToast('instance');
      this._elapsedToast = { instance: toastInstance, element: $toast };
      toastInstance.show();
    } catch (err) {
      console.warn('startElapsedTimer: dxToast недоступен, fallback на notify', err);
      this._elapsedToast = null;
    }

    const updateElapsedTime = () => {
      const currentTime = new Date();
      const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
      const message = `Получение данных: ${elapsedSeconds} сек`;

      if (!this._elapsedToast || !toastInstance) {
        DevExpress.ui.notify(message, 'success', 1000, { position: "center", direction: "up-push" });
        return;
      }

      if ($line1) $line1.text(message);

      if (!memLabel) {
        if ($line2) $line2.hide();
        return;
      }

      axios.get(apiBase + '/api/mem', { timeout: 2500 })
        .then(function(resp) {
          const data = resp && resp.data;
          const rss = data ? data.rssMB : null;
          if (typeof rss !== 'number' || !$line2) return;
          const total = data.totalMB || 0;
          const percent = data.percent != null
            ? data.percent
            : (total > 0 ? (rss / total) * 100 : 0);
          const totalStr = total >= 1024
            ? (total / 1024).toFixed(1) + ' ГБ'
            : Math.round(total) + ' МБ';
          $line2.show().text(
            `Использование памяти (${memLabel}) : ${Math.round(rss)} МБ (${percent.toFixed(2)}% от ${totalStr})`
          );
        })
        .catch(function() {
          if ($line2) $line2.hide();
        });
    };
    return setInterval(updateElapsedTime, 1000);
  }
}
