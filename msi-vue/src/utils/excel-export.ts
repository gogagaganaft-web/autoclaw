/**
 * Экспорт в Excel — перенос боевого оформления msi-js/module:
 *   - ExcelDataGridExporter/ExcelPivotGridExporter: заголовок A1:3,
 *     шапка с заливкой и рамками, зебра строк, тонкие внутренние и
 *     medium-внешние границы, подвал «Отчёт - дата», ширина колонок
 *     по содержимому (10..40);
 *   - ExportManager: ≤1 млн — клиентский Excel; >1 млн — проверка памяти
 *     браузера и CSV-части по 1 млн в ZIP через /api/export (7501);
 *     свод по исходнику >1 млн — запрет.
 *
 * ExcelJS и file-saver подгружаются лениво — только в момент выгрузки.
 */

import type ExcelJS from 'exceljs';

const MAX_ROWS = 1_000_000;

/** Эвристика прод-варианта: байт на строку для оценки памяти клиента. */
const BYTES_PER_ROW_ESTIMATE = 250;

function deviceMemoryGB(): number | null {
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory) return nav.deviceMemory;
  const perf = performance as Performance & {
    memory?: { jsHeapSizeLimit: number };
  };
  if (perf.memory?.jsHeapSizeLimit) {
    return Math.max(1, Math.round(perf.memory.jsHeapSizeLimit / (1024 * 1024 * 1024)));
  }
  return null;
}

/** Хватит ли браузеру памяти для выгрузки заданного объёма. */
export function sufficientClientMemory(totalRows: number): boolean {
  const gb = deviceMemoryGB();
  if (!gb) return true;
  const needed = totalRows * BYTES_PER_ROW_ESTIMATE;
  const available = gb * 0.6 * 1024 * 1024 * 1024;
  return needed <= available;
}

export { MAX_ROWS };

type ThinBorders = Record<string, unknown>;

const THIN: ThinBorders = { style: 'thin', color: { argb: '000000' } };
const MEDIUM: ThinBorders = { style: 'medium', color: { argb: '000000' } };

export interface ReportSheetOptions {
  /** Имя отчёта: заголовок A1 и подвал. */
  title: string;
  /** Строка шапки колонок (экспорт всегда с topLeftCell {row:4}). */
  headerRow?: number;
  /** Шрифт шапки: у таблицы 9, у свода 12 (как на проде). */
  headerFontSize?: number;
  /** Подвал с датой; отключается для сводных без строк данных. */
  withFooter?: boolean;
}

/** Оформление листа по образцу боевого ExcelDataGridExporter. */
export function styleReportWorksheet(
  worksheet: ExcelJS.Worksheet,
  opts: ReportSheetOptions,
): void {
  const headerRowNum = opts.headerRow ?? 4;
  const headerFontSize = opts.headerFontSize ?? 9;

  let maxColumn = 1;
  let lastRow = headerRowNum;
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber < headerRowNum) return;
    row.eachCell({ includeEmpty: false }, (_cell, colNumber) => {
      if (colNumber > maxColumn) maxColumn = colNumber;
    });
    if (rowNumber > lastRow) lastRow = rowNumber;
  });

  // Заголовок: объединённые строки 1-3 по всей ширине.
  worksheet.mergeCells(1, 1, 3, maxColumn);
  const titleCell = worksheet.getCell('A1');
  titleCell.value = opts.title;
  titleCell.font = { name: 'Arial', size: 14, bold: true };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  worksheet.getRow(1).height = 25;
  worksheet.getRow(2).height = 25;
  worksheet.getRow(3).height = 25;

  // Шапка: заливка, жирный, рамки.
  const headerRow = worksheet.getRow(headerRowNum);
  for (let col = 1; col <= maxColumn; col += 1) {
    const cell = headerRow.getCell(col);
    cell.font = { bold: true, name: 'Arial', size: headerFontSize };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F2F2F2' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = { top: THIN, left: THIN, bottom: THIN, right: THIN };
  }
  headerRow.height = 25;

  // Данные: зебра, рамки, числа вправо с 0.00, текст влево.
  for (let rowNum = headerRowNum + 1; rowNum <= lastRow; rowNum += 1) {
    const row = worksheet.getRow(rowNum);
    if (!row || row.getCell(1).value === undefined) continue;
    const backgroundColor = rowNum % 2 === 0 ? 'FFFFFFFF' : 'FFF2F2F2';
    row.eachCell({ includeEmpty: false }, (cell) => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: backgroundColor } };
      cell.border = { top: THIN, left: THIN, bottom: THIN, right: THIN };
      if (typeof cell.value === 'number') {
        cell.alignment = { horizontal: 'right', vertical: 'middle' };
        cell.numFmt = '0.00';
      } else {
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
      }
      cell.font = { name: 'Arial', size: 10 };
    });
    row.height = 20;
  }

  // Внешний контур medium: верх/низ и левый/правый край.
  for (let col = 1; col <= maxColumn; col += 1) {
    const topCell = worksheet.getRow(headerRowNum).getCell(col);
    topCell.border = { ...topCell.border, top: MEDIUM };
    const bottomCell = worksheet.getRow(lastRow).getCell(col);
    bottomCell.border = { ...bottomCell.border, bottom: MEDIUM };
  }
  for (let rowNum = headerRowNum; rowNum <= lastRow; rowNum += 1) {
    const rowObj = worksheet.getRow(rowNum);
    const leftCell = rowObj.getCell(1);
    leftCell.border = { ...leftCell.border, left: MEDIUM };
    const rightCell = rowObj.getCell(maxColumn);
    rightCell.border = { ...rightCell.border, right: MEDIUM };
  }

  // Подвал: «Отчёт - дата формирования».
  if (opts.withFooter !== false && lastRow > headerRowNum) {
    const footerIndex = lastRow + 2;
    worksheet.mergeCells(footerIndex, 1, footerIndex, maxColumn);
    const footerCell = worksheet.getRow(footerIndex).getCell(1);
    footerCell.value = `${opts.title} - ${new Date().toLocaleString('ru-RU')}`;
    footerCell.font = { name: 'Arial', size: 8, italic: true };
    footerCell.alignment = { horizontal: 'left', vertical: 'middle' };
  }

  // Ширина колонок по содержимому: 10..40, +2 запас.
  for (let col = 1; col <= maxColumn; col += 1) {
    const column = worksheet.getColumn(col);
    let maxLength = 10;
    const headerCell = worksheet.getRow(headerRowNum).getCell(col);
    if (headerCell?.value) maxLength = Math.max(maxLength, String(headerCell.value).length);
    for (let rowNum = headerRowNum + 1; rowNum <= lastRow; rowNum += 1) {
      const cell = worksheet.getRow(rowNum).getCell(col);
      if (cell?.value) maxLength = Math.max(maxLength, String(cell.value).length);
    }
    column.width = Math.min(Math.max(maxLength + 2, 10), 40);
  }
}

// ─── Выгрузка > 1 млн: CSV-части в ZIP через 7501 /api/export ────────────────

export interface ExportPart { url: string; name?: string }
export interface ExportColumnsSpec { dataField: string; caption?: string }

async function downloadParts(apiBase: string, parts: ExportPart[]): Promise<void> {
  const { saveAs } = await import('file-saver-es');
  for (const part of parts) {
    try {
      const res = await fetch(apiBase + part.url);
      if (!res.ok) continue;
      const blob = await res.blob();
      saveAs(blob, part.name || part.url.split('/').pop() || 'export.zip');
    } catch { /* часть не скачалась — идём дальше */ }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
}

/**
 * Серверная выгрузка больших объёмов (клиентский режим 7501):
 * CSV-части по 1 млн строк, каждая в своём ZIP. Возвращает true при успехе.
 */
export async function exportRowsViaServer(
  rows: Record<string, unknown>[],
  columns: ExportColumnsSpec[],
  reportName: string,
  apiBase = '',
): Promise<boolean> {
  const dev = typeof localStorage !== 'undefined' ? localStorage.getItem('gr.devUser') : '';
  const res = await fetch(`${apiBase}/api/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...(dev ? { 'X-Dev-User': dev } : {}),
    },
    body: JSON.stringify({
      data: rows,
      columns: columns.map((c) => ({
        dataField: c.dataField,
        caption: c.caption || c.dataField,
      })),
      reportName,
    }),
  });
  if (!res.ok) {
    let message = `${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch { /* без JSON */ }
    throw new Error(message);
  }

  const contentType = res.headers.get('Content-Type') || '';
  // ≤1 млн: прямой XLSX в ответе.
  if (contentType.includes('spreadsheet')) {
    const { saveAs } = await import('file-saver-es');
    const blob = await res.blob();
    saveAs(blob, `${reportName}.xlsx`);
    return true;
  }

  const manifest = await res.json() as { parts?: ExportPart[] };
  const parts = manifest.parts ?? [];
  if (!parts.length) throw new Error('выгрузка не дала файлов');
  await downloadParts(apiBase, parts);
  return true;
}
