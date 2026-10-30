// ExportManager.js — разводка выгрузки по правилам:
//  DataGrid <= 1 млн:
//    7501 (клиент)           → Excel (клиентский ExcelJS), как сейчас
//    7502/7504 (сервер)      → сервер: XLSX → ZIP одним файлом (архив)
//  DataGrid > 1 млн:
//    7501 (клиент)           → проверить память браузера; если хватает —
//                              данные на 7501 /api/export (CSV-части по 1 млн,
//                              каждый в свой ZIP); если мало — сообщение
//    7502/7504 (сервер)      → сервер: CSV-части по 1 млн, каждая в свой ZIP,
//                              скачивание всех частей
//  PivotGrid > 1 млн         → запрет выгрузки
import { ExcelDataGridExporter } from './ExcelDataGridExporter.js';
import { ExcelPivotGridExporter } from './ExcelPivotGridExporter.js';

const MAX_ROWS = 1000000;

// Средняя эвристика: байт на строку для оценки потребностей клиента.
const BYTES_PER_ROW_ESTIMATE = 250;

function getDeviceMemoryGB() {
  if (navigator.deviceMemory) return navigator.deviceMemory;
  if (window.performance && performance.memory && performance.memory.jsHeapSizeLimit) {
    return Math.max(1, Math.round(performance.memory.jsHeapSizeLimit / (1024 * 1024 * 1024)));
  }
  return null;
}

// Оценка: хватит ли клиенту памяти для выгрузки через сервер 7501.
function sufficientClientMemory(totalRows) {
  const gb = getDeviceMemoryGB();
  if (!gb) return true;
  const needed = totalRows * BYTES_PER_ROW_ESTIMATE;
  const available = gb * 0.6 * 1024 * 1024 * 1024;
  return needed <= available;
}

function normalizeServerColumns(cols) {
  if (!Array.isArray(cols)) return [];
  return cols.map(function(c) {
    if (typeof c === 'string') return { dataField: c, caption: c };
    if (c && typeof c === 'object') {
      return { dataField: c.dataField || c.caption || '', caption: c.caption || c.dataField || '' };
    }
    return null;
  }).filter(function(c) { return c && c.dataField; });
}

function showExportLoader(message) {
  const $panel = $('#loadPanel');
  if (!$panel.length) return;
  const inst = $panel.data('dxLoadPanel');
  if (inst) {
    if (message) inst.option('message', message);
    inst.show();
  }
}

function updateExportLoader(message) {
  const $panel = $('#loadPanel');
  if (!$panel.length || !message) return;
  const inst = $panel.data('dxLoadPanel');
  if (inst) inst.option('message', message);
}

function hideExportLoader() {
  const $panel = $('#loadPanel');
  if (!$panel.length) return;
  const inst = $panel.data('dxLoadPanel');
  if (inst) inst.hide();
}

async function downloadAll(apiBase, parts) {
  for (const part of parts || []) {
    const a = document.createElement('a');
    a.href = apiBase + part.url;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    await new Promise(resolve => setTimeout(resolve, 400));
  }
}

export class ExportManager {
  // ─── DATA GRID ──────────────────────────────────────────────────────────
  static async exportDataGrid(e, opts) {
    e.cancel = true;
    const reportName = opts.reportName || 'Отчет';
    const mode = opts.mode || opts.reportProcessing || 'client';
    const totalRows = opts.totalRows != null
      ? opts.totalRows
      : (Array.isArray(opts.rows) ? opts.rows.length : 0);

    try {
      // 7502/7504 (серверные режимы): выгрузка всегда на сервере
      // — <=1M: XLSX→ZIP, >1M: CSV-части по 1M в ОДНОМ ZIP.
      if (mode === 'server' || mode === 'server-multi') {
        if (!opts.token) {
          DevExpress.ui.notify('Сервер экспорта: отсутствует токен сессии', 'error', 5000, { position: "center", direction: "up-push" });
          return;
        }
        const apiBase = opts.apiBase || opts.reportApiBase;
        showExportLoader(totalRows > MAX_ROWS
          ? 'Подготовка выгрузки (> 1 млн записей)...'
          : 'Подготовка выгрузки...');
        const resp = await axios.post(apiBase + '/api/report/export', { token: opts.token, reportName: reportName }, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 3600000
        });
        const jobId = resp.data && resp.data.jobId;
        if (!jobId) {
          // Фолбэк на старый синхронный бэкенд
          hideExportLoader();
          const parts = resp.data && resp.data.parts ? resp.data.parts : [];
          if (parts.length === 0) {
            DevExpress.ui.notify('Выгрузка не дала файлов', 'warning', 4000, { position: "center", direction: "up-push" });
            return;
          }
          await downloadAll(apiBase, parts);
          return;
        }
        let parts = null;
        while (true) {
          await new Promise(function(r) { setTimeout(r, 1000); });
          const s = await axios.get(apiBase + '/api/report/export/status?jobId=' + encodeURIComponent(jobId), { timeout: 30000 });
          const job = s.data || {};
          if (job.state === 'done') { parts = job.parts; break; }
          if (job.state === 'error') {
            hideExportLoader();
            DevExpress.ui.notify('Ошибка выгрузки: ' + (job.error || 'ошибка'), 'error', 6000, { position: "center", direction: "up-push" });
            return;
          }
          if (job.part && job.totalParts) updateExportLoader('Подготовка части ' + job.part + ' из ' + job.totalParts + '...');
        }
        hideExportLoader();
        if (!parts || parts.length === 0) {
          DevExpress.ui.notify('Выгрузка не дала файлов', 'warning', 4000, { position: "center", direction: "up-push" });
          return;
        }
        await downloadAll(apiBase, parts);
        return;
      }

      // 7501 (клиент): до 1 млн — текущий клиентский Excel (ExcelJS)
      if (totalRows <= MAX_ROWS) {
        ExcelDataGridExporter.export(e, reportName);
        return;
      }

      // 7501 (клиент), > 1 млн: проверяем память браузера
      if (!sufficientClientMemory(totalRows)) {
        DevExpress.ui.notify(
          'Недостаточно памяти браузера для выгрузки более 1 млн записей. Рекомендуем переключить режим отчёта с «Клиент» на «Сервер» (7502) и повторить выгрузку.',
          'warning', 9000, { position: "center", direction: "up-push" }
        );
        return;
      }

      DevExpress.ui.notify('Подготовка выгрузки через сервер (7501)...', 'info', 3000, { position: "center", direction: "up-push" });
      const apiBase = opts.apiBase || opts.serverExecuteUrl || 'http://localhost:7501';
      const columnsServer = normalizeServerColumns(opts.columnsForServer || []);
      const resp = await axios.post(apiBase + '/api/export', {
        data: opts.rows || [],
        columns: columnsServer,
        reportName: reportName
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 3600000
      });

      const parts = resp.data && resp.data.parts ? resp.data.parts : [];
      if (parts.length === 0) {
        DevExpress.ui.notify('Выгрузка не дала файлов', 'warning', 4000, { position: "center", direction: "up-push" });
        return;
      }
      await downloadAll(apiBase, parts);
    } catch (err) {
      hideExportLoader();
      console.error('ExportManager.exportDataGrid error:', err);
      const msg = (err && err.response && err.response.data && err.response.data.error) || err.message || 'Ошибка выгрузки';
      DevExpress.ui.notify('Ошибка выгрузки: ' + msg, 'error', 5000, { position: "center", direction: "up-push" });
    }
  }

  // ─── PIVOT GRID ─────────────────────────────────────────────────────────
  static async exportPivotGrid(e, opts) {
    e.cancel = true;
    const reportName = opts.reportName || 'Отчет';
    const sourceRows = opts.totalRows != null
      ? opts.totalRows
      : (Array.isArray(opts.rows) ? opts.rows.length : 0);

    try {
      // Исходник <= 1 млн - привычная клиентская выгрузка (ExcelJS)
      if (sourceRows <= MAX_ROWS) {
        ExcelPivotGridExporter.export(e, reportName, opts.exportHeaderOptions || {});
        return;
      }

      // Исходник > 1 млн: свод агрегируется на сервере (7502/7504),
      // выгрузка тоже серверная (XLSX в ZIP) - лимит по ячейкам не нужен.
      const component = e.component;
      if (component && component.option && component.option('remoteOperations')) {
        const apiBase = opts.apiBase || '';
        if (!opts.token || !apiBase) {
          DevExpress.ui.notify('Серверная выгрузка: нет данных для формирования свода (нет токена/сервера)', 'warning', 5000, { position: "center", direction: "up-push" });
          return;
        }
        const ds = component.getDataSource();
        const fields = (ds && ds.fields) ? ds.fields() : [];
        const rowSelectors = fields.filter(f => f.area === 'row' && f.dataField).map(f => ({ selector: f.dataField }));
        const colSelectors = fields.filter(f => f.area === 'column' && f.dataField).map(f => ({ selector: f.dataField }));
        const dataFields = fields.filter(f => f.area === 'data' && f.dataField).map(f => ({ selector: f.dataField, summaryType: f.summaryType || 'sum' }));
        if (dataFields.length === 0) {
          DevExpress.ui.notify('Нет полей данных для выгрузки свода', 'warning', 5000, { position: "center", direction: "up-push" });
          return;
        }
        DevExpress.ui.notify('Подготовка выгрузки свода на сервере...', 'info', 3000, { position: "center", direction: "up-push" });
        const resp = await axios.post(apiBase + '/api/report/pivot/export', {
          token: opts.token,
          group: rowSelectors,
          groupColumns: colSelectors,
          groupSummary: dataFields,
          filter: (ds && ds.filter) ? ds.filter() : null,
          reportName: reportName
        }, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 3600000
        });
        const parts = resp.data && resp.data.parts ? resp.data.parts : [];
        if (parts.length === 0) {
          DevExpress.ui.notify('Выгрузка не сформирована', 'warning', 4000, { position: "center", direction: "up-push" });
          return;
        }
        await downloadAll(apiBase, parts);
        return;
      }

      // Локальный свод (без сервера): проверка размера на клиенте
      const cells = countPivotCells(component);
      if (cells > MAX_ROWS) {
        DevExpress.ui.notify(
          'Выгрузка невозможна: агрегированная сводная содержит более 1 млн ячеек.',
          'warning', 6000, { position: "center", direction: "up-push" }
        );
        return;
      }

      ExcelPivotGridExporter.export(e, reportName, opts.exportHeaderOptions || {});
    } catch (err) {
      console.error('ExportManager.exportPivotGrid error:', err);
      const msg = (err && err.response && err.response.data && err.response.data.error) || err.message || 'Ошибка выгрузки';
      DevExpress.ui.notify('Ошибка выгрузки: ' + msg, 'error', 5000, { position: "center", direction: "up-push" });
    }
  }
}

// Подсчёт ячеек клиентской сводной по загруженному в браузер агрегату.
function countPivotCells(component) {
  if (!component || !component.getDataSource) return 0;
  const ds = component.getDataSource();
  if (!ds) return 0;

  let rows = 0;
  (function walk(items) {
    for (const item of items || []) {
      rows++;
      if (item.children) walk(item.children);
    }
  })(ds.items());

  let cols = 0;
  try {
    const data = ds.getData();
    if (data && data.length && data[0].data) {
      cols = Object.keys(data[0].data).length;
    }
  } catch (err) {
    cols = 0;
  }
  return rows * cols;
}

export { MAX_ROWS };