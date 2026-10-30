// ExcelDataGridExporter.js
export class ExcelDataGridExporter {
  static export(e, reportName) {
    let NameReport = reportName || 'Таблица';
    let fileNameReport = NameReport + '.xlsx';

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Отчет');

    DevExpress.excelExporter.exportDataGrid({
      component: e.component,
      worksheet,
      topLeftCell: { row: 4, column: 1 },
    }).then((cellRange) => {
      const maxColumn = cellRange.to.column || 1;
      
      // Заголовок
      worksheet.mergeCells(1, 1, 3, maxColumn);
      const titleCell = worksheet.getCell('A1');
      titleCell.value = NameReport;
      titleCell.font = { name: 'Arial', size: 14, bold: true };
      titleCell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      
      worksheet.getRow(1).height = 25;
      worksheet.getRow(2).height = 25;
      worksheet.getRow(3).height = 25;
      
      // Заголовки столбцов
      const headerRow = worksheet.getRow(4);
      if (headerRow) {
        for (let col = 1; col <= maxColumn; col++) {
          const cell = headerRow.getCell(col);
          if (cell) {
            cell.font = { bold: true, name: 'Arial', size: 9 };
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F2F2F2' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
            cell.border = {
              top: { style: 'thin', color: { argb: '000000' } },
              left: { style: 'thin', color: { argb: '000000' } },
              bottom: { style: 'thin', color: { argb: '000000' } },
              right: { style: 'thin', color: { argb: '000000' } }
            };
          }
        }
        headerRow.height = 25;
      }
      
      // Данные
      const startRow = 5;
      const endRow = cellRange.to.row;
      
      for (let rowNum = startRow; rowNum <= endRow; rowNum++) {
        const row = worksheet.getRow(rowNum);
        if (!row || row.getCell(1).value === undefined) continue;
        
        const isEven = rowNum % 2 === 0;
        const backgroundColor = isEven ? 'FFFFFFFF' : 'FFF2F2F2';
        
        row.eachCell({ includeEmpty: false }, (cell) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: backgroundColor } };
          cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
          };
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
      
      // Внешние границы
      for (let col = 1; col <= maxColumn; col++) {
        const cellTop = worksheet.getRow(4).getCell(col);
        if (cellTop) {
          cellTop.border = { ...cellTop.border, top: { style: 'medium', color: { argb: '000000' } } };
        }
        const cellBottom = worksheet.getRow(endRow).getCell(col);
        if (cellBottom) {
          cellBottom.border = { ...cellBottom.border, bottom: { style: 'medium', color: { argb: '000000' } } };
        }
      }
      
      for (let row = 4; row <= endRow; row++) {
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
      
      // Подвал
      const footerRowIndex = endRow + 2;
      worksheet.mergeCells(footerRowIndex, 1, footerRowIndex, maxColumn);
      const footerRow = worksheet.getRow(footerRowIndex);
      footerRow.getCell(1).value = NameReport + ' - ' + new Date().toLocaleString('ru-RU');
      footerRow.getCell(1).font = { name: 'Arial', size: 8, italic: true };
      footerRow.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
      
      // Ширина столбцов
      for (let col = 1; col <= maxColumn; col++) {
        const column = worksheet.getColumn(col);
        if (column) {
          let maxLength = 10;
          const headerCell = worksheet.getRow(4).getCell(col);
          if (headerCell && headerCell.value) {
            maxLength = Math.max(maxLength, headerCell.value.toString().length);
          }
          for (let row = 5; row <= endRow; row++) {
            const cell = worksheet.getRow(row).getCell(col);
            if (cell && cell.value) {
              maxLength = Math.max(maxLength, cell.value.toString().length);
            }
          }
          column.width = Math.min(Math.max(maxLength + 2, 10), 40);
        }
      }
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), fileNameReport);
      });
    });
    
    e.cancel = true;
  }
}