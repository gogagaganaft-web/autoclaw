// ExcelPivotGridExporter.js
export class ExcelPivotGridExporter {
  static export(e, reportName, exportHeaderOptions) {
    let NameReport = reportName || 'Сводная Таблица';
    let fileNameReport = NameReport + '.xlsx';

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    DevExpress.excelExporter.exportPivotGrid({
      component: e.component,
      worksheet,
      topLeftCell: { row: 4, column: 1 },
      ...exportHeaderOptions,
    }).then(() => {
      let maxColumn = 1;
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        row.eachCell({ includeEmpty: false }, (cell, colNumber) => {
          if (colNumber > maxColumn) maxColumn = colNumber;
        });
      });

      // Заголовок
      worksheet.mergeCells(1, 1, 3, maxColumn);
      const titleCell = worksheet.getCell('A1');
      titleCell.value = NameReport;
      titleCell.font = { size: 12, bold: true, name: 'Arial' };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

      worksheet.getRow(1).height = 25;
      worksheet.getRow(2).height = 25;
      worksheet.getRow(3).height = 25;

      // Заголовки столбцов
      const headerRow = worksheet.getRow(4);
      if (headerRow) {
        headerRow.eachCell((cell) => {
          cell.font = { size: 12, bold: true, name: 'Arial' };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F2F2F2' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
          };
        });
        headerRow.height = 25;
      }

      // Данные с чередованием цветов
      for (let rowNum = 5; rowNum <= worksheet.rowCount; rowNum++) {
        const row = worksheet.getRow(rowNum);
        if (row && row.getCell(1).value !== undefined) {
          const color = rowNum % 2 === 0 ? 'FFFFFFFF' : 'FFF2F2F2';
          row.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
            cell.border = {
              top: { style: 'thin', color: { argb: '000000' } },
              left: { style: 'thin', color: { argb: '000000' } },
              bottom: { style: 'thin', color: { argb: '000000' } },
              right: { style: 'thin', color: { argb: '000000' } }
            };
            if (typeof cell.value === 'number') {
              cell.alignment = { horizontal: 'right' };
              cell.numFmt = '0.00';
            }
          });
          row.height = 20;
        }
      }

      // Внешние границы
      const lastRow = worksheet.rowCount;
      for (let col = 1; col <= maxColumn; col++) {
        const cellTop = worksheet.getRow(4).getCell(col);
        if (cellTop) {
          cellTop.border = { ...cellTop.border, top: { style: 'medium', color: { argb: '000000' } } };
        }
        const cellBottom = worksheet.getRow(lastRow).getCell(col);
        if (cellBottom) {
          cellBottom.border = { ...cellBottom.border, bottom: { style: 'medium', color: { argb: '000000' } } };
        }
      }

      for (let row = 4; row <= lastRow; row++) {
        const rowObj = worksheet.getRow(row);
        if (rowObj) {
          const leftCell = rowObj.getCell(1);
          if (leftCell) {
            leftCell.border = { ...leftCell.border, left: { style: 'medium', color: { argb: '000000' } } };
          }
          const rightCell = rowObj.getCell(maxColumn);
          if (rightCell) {
            rightCell.border = { ...rightCell.border, right: { style: 'medium', color: { argb: '000000' } } };
          }
        }
      }

      // Сохранение
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileNameReport);
      });
    });

    e.cancel = true;
  }
}