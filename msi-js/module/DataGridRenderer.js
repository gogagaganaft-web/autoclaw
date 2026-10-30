// DataGridRenderer.js
import { ExportManager } from './ExportManager.js';
import { dedupeColumns } from './ColumnsUtil.js';

export class DataGridRenderer {
  static render(container, data, report) {
    return $('<div style="background-color: #3d3d47">').dxDataGrid({
      dataSource: data.dataSource,
      remoteOperations: {
        filtering: true,
        sorting: true,
        paging: true,
        summary: true,
        grouping: true
      },
      columns: dedupeColumns(report.fields?.grid || data.columns || []),
      showBorders: true,
      allowColumnResizing: true,
      columnAutoWidth: true,
      height: '90.9vh',
      showColumnLines: true,
      grouping: { autoExpandAll: false },
      loadPanel: { enabled: true },
      groupPanel: { visible: true },
      scrolling: { rowRenderingMode: 'virtual' },
      paging: { enabled: true, pageSize: 10 },
      pager: {
        visible: true,
        showPageSizeSelector: true,
        allowedPageSizes: [10, 50, 100, 500],
        showInfo: true,
        showNavigationButtons: true
      },
      columnChooser: {
        mode: "select",
        height: 450,
        width: 450,
        enabled: true,
        position: { my: 'center top', at: 'center top', of: '#datagrid' }
      },
      columnResizingMode: 'nextColumn',
      filterPanel: { visible: true },
      filterBuilderPopup: { width: 800, title: "Фильтр : " },
      headerFilter: { visible: true, search: { enabled: true } },
      export: { enabled: true },
      onContentReady: function(e) {
        if (!e || !e.component) {
          console.warn("Ошибка выгрузки");
          return;
        }
        var gridWidth = 0;
        var columns = e.component.getVisibleColumns();
        if (columns && columns.length > 0) {
          columns.forEach(function(column) {
            gridWidth += column.width || 0;
          });
        }
        if (gridWidth > 0) {
          e.element.css('width', gridWidth + 'px');
        }
      },
      onExporting: function(e) {
        ExportManager.exportDataGrid(e, {
          mode: 'client',
          reportName: report?.text,
          totalRows: data.totalRows || (data.dataSource ? data.dataSource.length : 0),
          rows: data.dataSource || [],
          columnsForServer: (report.fields && report.fields.grid) || data.columns || []
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
    }).appendTo(container);
  }
}