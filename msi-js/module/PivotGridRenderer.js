// PivotGridRenderer.js
import { ExportManager } from './ExportManager.js';
import { ExcelDataGridExporter } from './ExcelDataGridExporter.js';
import { preparePivotDateIntervals } from './PivotDateIntervals.js';
import { getUserViewStore, reportKeyOf } from './UserViewStore.js';

export class PivotGridRenderer {
  static render(container, data, report) {
    // Проверка наличия данных
    if (!data) {
      console.warn('Нет данных для отображения PivotGrid');
      $(container).html('<div style="padding: 20px; text-align: center; color: #999;">Нет данных для отображения</div>');
      return null;
    }
    
    // Создаем dataSource для pivot из rows и columns, если dataSource не существует
    let pivotDataSource = data.dataSource;

    // Счётчик активных загрузок: лоадер показывается на первой и скрывается,
    // когда все параллельные load() завершились.
    let pendingLoads = 0;
    const notifyLoading = function(isLoading) {
      if (isLoading) {
        pendingLoads++;
        if (pendingLoads === 1 && data.onLoadingChanged) data.onLoadingChanged(true);
      } else {
        pendingLoads = pendingLoads > 0 ? pendingLoads - 1 : 0;
        if (pendingLoads === 0 && data.onLoadingChanged) data.onLoadingChanged(false);
      }
    };
    
    // Сервер отдаёт ключи групп дат строками ("2025-01-01"). DevExpress в remote-режиме
    // НЕ десериализует их в Date, когда у поля задан groupInterval (см. внутреннюю S()),
    // поэтому заголовки не форматируются (нет "Год/Квартал/Месяц"). Преобразуем ключи
    // в Date на клиенте — дальше DevExpress форматирует их так же, как в дашборде.
    function toPivotDate(value) {
      if (value === null || value === undefined || value instanceof Date) return value;
      const m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?/.exec(String(value));
      if (!m) return value;
      return new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
    }
    function convertGroupKeys(nodes, groupFields, level) {
      if (!Array.isArray(nodes) || level >= groupFields.length) return nodes;
      const g = groupFields[level] || {};
      const isDateGroup = typeof g.groupInterval === 'string' && g.groupInterval !== '';
      for (let i = 0; i < nodes.length; i++) {
        if (isDateGroup) nodes[i].key = toPivotDate(nodes[i].key);
        if (nodes[i].items) convertGroupKeys(nodes[i].items, groupFields, level + 1);
      }
      return nodes;
    }

    if (data.serverPivot) {
      const token = data.token;
      const apiBase = data.apiBase;
      pivotDataSource = new DevExpress.data.CustomStore({
        key: undefined,
        load: function(options) {
          notifyLoading(true);
          const payload = {
            token,
            group: options.group,
            groupSummary: options.groupSummary,
            totalSummary: options.totalSummary,
            filter: options.filter,
            skip: options.skip,
            take: options.take,
            requireGroupCount: !!options.requireGroupCount
          };
          console.log('PivotGrid: серверный pivot-запрос, group:', (options.group || []).length, 'summary:', (options.groupSummary || []).length, 'total:', (options.totalSummary || []).length);
          return axios.post(apiBase + '/api/report/pivot', payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 3600000
          }).then(function(resp) {
            notifyLoading(false);
            const groupKeys = (options.group || []).map(function (g) {
              return g && g.groupInterval ? g : {};
            });
            const nodes = convertGroupKeys(resp.data.data || [], groupKeys, 0);
            return {
              data: nodes,
              totalCount: resp.data.totalCount,
              groupCount: resp.data.groupCount,
              summary: resp.data.summary
            };
          }).catch(function(err) {
            notifyLoading(false);
            throw err;
          });
        }
      });
    } else if (!pivotDataSource && data.rows && data.columns) {
      pivotDataSource = data.rows.map(row => {
        const obj = {};
        data.columns.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
      console.log(pivotDataSource.length);
    }
    
    // Если нет данных для отображения
    if (!pivotDataSource || pivotDataSource.length === 0) {
      console.warn('Нет данных для отображения PivotGrid');
      $(container).html('<div style="padding: 20px; text-align: center; color: #999;">Нет данных для отображения</div>');
      return null;
    }

    const exportHeaderOptions = {
      exportRowFieldHeaders: true,
      exportColumnFieldHeaders: true,
      exportDataFieldHeaders: false,
      exportFilterFieldHeaders: false,
    };

    const drillDownState = {
      dataSource: null,
      columns: []
    };

    const gridColumns = report?.fields?.grid || [];
    
    const getDrillDownColumns = () => {
      if (gridColumns.length > 0) {
        return gridColumns.map(col => {
          if (col.columns && Array.isArray(col.columns)) {
            return {
              caption: col.caption || col.dataField,
              columns: col.columns.map(subCol => ({
                dataField: subCol.dataField,
                caption: subCol.caption || subCol.dataField,
                dataType: subCol.dataType || 'string',
                format: subCol.format,
                visible: subCol.visible !== false,
                width: subCol.width
              }))
            };
          }
          return {
            dataField: col.dataField,
            caption: col.caption || col.dataField,
            dataType: col.dataType || 'string',
            format: col.format,
            visible: col.visible !== false,
            width: col.width
          };
        });
      }
      return [];
    };

    // Проверяем существование элемента #pay-popup
    const $payPopup = $('#pay-popup');
    let payPopupInstance = null;
    
    if ($payPopup.length) {
      payPopupInstance = $payPopup.dxPopup({
        width: 1200,
        height: 660,
        showCloseButton: true,
        showBorders: true,
        hideOnOutsideClick: true,
        resizeEnabled: true,
        onResize: function() {
          const dataGrid = $('.drill-down').dxDataGrid('instance');
          if (dataGrid) {
            setTimeout(() => dataGrid.updateDimensions(), 50);
          }
        },
        contentTemplate: () => {
          return $('<div />')
            .addClass('drill-down')
            .css({ width: '100%', height: '100%' })
            .dxDataGrid({
              allowColumnResizing: true,
              showBorders: true,
              columnResizingMode: 'nextColumn',
              showColumnLines: true,
              allowColumnReordering: true,
              columnAutoWidth: true,
              grouping: { autoExpandAll: false },
              groupPanel: { visible: true },
              remoteOperations: true,
              paging: { enabled: true, pageSize: 20 },
              pager: {
                visible: true,
                showPageSizeSelector: true,
                allowedPageSizes: [10, 20, 50, 100, 500],
                showInfo: true,
                showNavigationButtons: true
              },
              scrolling: { mode: 'virtual', rowRenderingMode: 'virtual' },
              columnChooser: { enabled: true, mode: "select", height: 450, width: 450 },
              headerFilter: { search: { enabled: true }, visible: true },
              filterPanel: { visible: true },
              filterBuilderPopup: { width: 800, title: "Фильтр : " },
              export: { enabled: true },
              onExporting: function(e) {
                ExcelDataGridExporter.export(e, 'Детализация');
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
        },
        onShowing: () => {
          const dataGrid = $('.drill-down').dxDataGrid('instance');
          if (dataGrid && drillDownState.dataSource) {
            dataGrid.option('dataSource', drillDownState.dataSource);
            dataGrid.option('columns', drillDownState.columns);
            setTimeout(() => dataGrid.updateDimensions(), 50);
          }
        },
        onShown: () => {
          const dataGrid = $('.drill-down').dxDataGrid('instance');
          if (dataGrid) dataGrid.updateDimensions();
        }
      }).dxPopup('instance');
    }

    const isServerPivot = !!data.serverPivot;

    // Используем поля отчёта как есть — ровно так же, как DashboardRenderer.
    let pivotSourceFields = report?.fields?.pivot || [];

    // Недельные интервалы DevExpress не умеет — предрасчёт Monday-ключа и подписи.
    if (Array.isArray(pivotDataSource)) {
      const prepared = preparePivotDateIntervals(pivotSourceFields, pivotDataSource);
      pivotSourceFields = prepared.fields;
      pivotDataSource = prepared.rows;
    }

    // Свод и дашборд делят одно сохранённое состояние раскладки (как в DashboardRenderer),
    // иначе дашборд показывает сохранённую пользователем раскладку (Год/Месяц/День),
    // а свод — свою по умолчанию (Год/Квартал/Месяц).
    const viewStore = getUserViewStore();
    const pivotReportKey = reportKeyOf(report);

    return $('<div>').dxPivotGrid({
      dataSource: {
        fields: pivotSourceFields,
        store: pivotDataSource,
        ...(isServerPivot ? { remoteOperations: true } : {})
      },
      ...(isServerPivot ? { remoteOperations: true } : {}),
      stateStoring: viewStore ? viewStore.pivotStateStoring(pivotReportKey) : undefined,
      allowExpandAll: true,
      allowSortingBySummary: true,
      allowSorting: true,
      allowFiltering: true,
      showBorders: true,
      showColumnGrandTotals: false,
      showColumnTotals: false,
      showTotalsPrior: 'both',
      showRowGrandTotals: true,
      showRowTotals: false,
      loadPanel: { enabled: false },
      height: '90.9vh',
      width: 'stretch',
      elementAttr: { class: 'pg-over' },
      scrolling: { mode: 'virtual', rowRenderingMode: 'virtual', columnRenderingMode: 'virtual' },
      headerFilter: { search: { enabled: true }, showRelevantValues: true, width: 450, height: 500 },
      fieldPanel: {
        showColumnFields: true,
        showRowFields: true,
        showFilterFields: false,
        showDataFields: false,
        allowFieldDragging: true,
        visible: true
      },
      fieldChooser: { enabled: true },
      onCellClick: (e) => {
        if (e.area === 'data' && payPopupInstance) {
          const pivotGridDataSource = e.component.getDataSource();
          if (pivotGridDataSource) {
            const rowPathName = e.cell.rowPath && e.cell.rowPath.length > 0 ? e.cell.rowPath[e.cell.rowPath.length - 1] : 'Итого';
            const columnPathName = e.cell.columnPath && e.cell.columnPath.length > 0 ? e.cell.columnPath[e.cell.columnPath.length - 1] : 'Итого';
            const popupTitle = ` ${rowPathName || 'Итого'} - ${columnPathName || 'Итого'} : `;

            if (isServerPivot) {
              const rowFields = pivotGridDataSource.fields().filter(f => f.area === 'row' && f.dataField);
              const colFields = pivotGridDataSource.fields().filter(f => f.area === 'column' && f.dataField);
              const rowValues = {};
              const colValues = {};
              (e.cell.rowPath || []).forEach((v, i) => {
                if (i < rowFields.length && v !== undefined && v !== null) rowValues[rowFields[i].dataField] = v;
              });
              (e.cell.columnPath || []).forEach((v, i) => {
                if (i < colFields.length && v !== undefined && v !== null) colValues[colFields[i].dataField] = v;
              });
              if (Object.keys(rowValues).length + Object.keys(colValues).length === 0) return;
              console.log('🔍 DrillDown: rowValues', JSON.stringify(rowValues), 'colValues', JSON.stringify(colValues));
              drillDownState.dataSource = new DevExpress.data.CustomStore({
                key: undefined,
                load: function(options) {
                  const pageSize = options.take || 100;
                  const page = Math.floor((options.skip || 0) / pageSize) + 1;
                  console.log('🔍 DrillDown load:', { token: data.token.slice(0,8)+'...', rowValues, colValues, page, pageSize });
                  return axios.post(data.apiBase + '/api/report/drilldown', {
                    token: data.token, rowValues, colValues, page, pageSize
                  }, { headers: { 'Content-Type': 'application/json' }, timeout: 3600000 }).then(function(resp) {
                    console.log('🔍 DrillDown response:', resp.data.totalRows, 'rows');
                    return { data: resp.data.rows, totalCount: resp.data.totalRows };
                  }).catch(function(err) {
                    console.error('🔍 DrillDown ERROR:', err);
                    throw err;
                  });
                }
              });
            } else {
              drillDownState.dataSource = pivotGridDataSource.createDrillDownDataSource(e.cell);
            }
            const drillColumns = getDrillDownColumns();
            
            if (drillColumns.length > 0) {
              drillDownState.columns = drillColumns;
            } else {
              const fields = pivotGridDataSource.fields();
              drillDownState.columns = fields.map(field => ({
                dataField: field.dataField || field.caption,
                caption: field.caption || field.dataField,
                dataType: field.dataType || 'string',
                visible: true
              }));
            }
            
            payPopupInstance.option('title', popupTitle);
            payPopupInstance.show();
          }
        }
      },
      onContentReady: function(e) {
        setTimeout(() => e.component.updateDimensions(), 0);
      },
      export: { enabled: true },
      onExporting: function(e) {
        ExportManager.exportPivotGrid(e, {
          mode: isServerPivot ? 'server' : 'client',
          reportName: report?.text,
          totalRows: (data && data.totalRows) || (Array.isArray(pivotDataSource) ? pivotDataSource.length : 0),
          apiBase: isServerPivot ? data.apiBase : undefined,
          token: isServerPivot ? data.token : undefined,
          exportHeaderOptions: exportHeaderOptions
        });
      },
      onContextMenuPreparing: (e) => {
        if (!e.items) e.items = [];
        const pivotGridInstance = e.component;
        const dataSource = pivotGridInstance.getDataSource();
        const sourceField = e.field;

        if (e.items && e.items.length > 0) {
          e.items.forEach(function(item) {
            if (item.text === 'Раскрыть все' || item.name === 'expandAll') item.icon = 'expand';
            if (item.text === 'Свернуть все' || item.name === 'collapseAll') item.icon = 'collapse';
          });

          const sortItems = [];
          const otherItems = [];
          e.items.forEach(item => {
            const itemText = item.text?.toLowerCase() || '';
            const itemName = item.name?.toLowerCase() || '';
            if (itemText.includes('sort') || itemText.includes('сортиров') ||
                itemText.includes('возраст') || itemText.includes('убыван') ||
                itemName.includes('sort') || itemName.includes('ascending') || itemName.includes('descending')) {
              sortItems.push(item);
            } else {
              otherItems.push(item);
            }
          });
          if (sortItems.length > 0) {
            e.items = [...otherItems, { beginGroup: true, text: "Сортировка", icon: "sort", items: sortItems }];
          }
        }

        if (sourceField && sourceField.dataType === 'number' && dataSource) {
          const setSummaryType = function(args) {
            dataSource.field(sourceField.index, { summaryType: args.itemData.value });
            dataSource.load();
          };
          const menuItems = [];
          e.items.push({ beginGroup: true, text: 'Тип значения', items: menuItems });
          const summaryTypes = [
            { text: 'Сумма', value: 'sum' },
            { text: 'Среднее', value: 'avg' },
            { text: 'Минимум', value: 'min' },
            { text: 'Максимум', value: 'max' }
          ];
          summaryTypes.forEach(summaryType => {
            const isSelected = e.field.summaryType === summaryType.value;
            menuItems.push({
              text: isSelected ? `${summaryType.text} ✓` : summaryType.text,
              value: summaryType.value,
              onItemClick: setSummaryType,
              selected: isSelected,
            });
          });
        }

        if (pivotGridInstance) {
          const currentOptions = pivotGridInstance.option('fieldPanel') || {};
          e.items.push(
            {
              beginGroup: true,
              text: currentOptions.showColumnFields ? 'Поля колонок ✓' : 'Поля колонок',
              icon: 'columnfield',
              onItemClick: () => {
                const newValue = !currentOptions.showColumnFields;
                pivotGridInstance.option('fieldPanel.showColumnFields', newValue);
                if (dataSource) dataSource.load();
                DevExpress.ui.notify(`Поля колонок ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
              }
            },
            {
              text: currentOptions.showRowFields ? 'Поля строк ✓' : 'Поля строк',
              icon: 'rowfield',
              onItemClick: () => {
                const newValue = !currentOptions.showRowFields;
                pivotGridInstance.option('fieldPanel.showRowFields', newValue);
                if (dataSource) dataSource.load();
                DevExpress.ui.notify(`Поля строк ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
              }
            },
            {
              text: currentOptions.showFilterFields ? 'Поля фильтров ✓' : 'Поля фильтров',
              icon: 'filter',
              onItemClick: () => {
                const newValue = !currentOptions.showFilterFields;
                pivotGridInstance.option('fieldPanel.showFilterFields', newValue);
                if (dataSource) dataSource.load();
                DevExpress.ui.notify(`Поля фильтров ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
              }
            },
            {
              text: currentOptions.showDataFields ? 'Поля данных ✓' : 'Поля данных',
              icon: 'datafield',
              onItemClick: () => {
                const newValue = !currentOptions.showDataFields;
                pivotGridInstance.option('fieldPanel.showDataFields', newValue);
                if (dataSource) dataSource.load();
                DevExpress.ui.notify(`Поля данных ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
              }
            }
          );

          const currentRowTotals = pivotGridInstance.option('showRowTotals');
          const currentColumnTotals = pivotGridInstance.option('showColumnTotals');
          e.items.push(
            {
              beginGroup: true,
              text: currentRowTotals ? 'Итоги по строкам ✓' : 'Итоги по строкам',
              icon: 'rowproperties',
              onItemClick: () => {
                const newValue = !pivotGridInstance.option('showRowTotals');
                pivotGridInstance.option('showRowTotals', newValue);
                DevExpress.ui.notify(`Итоги по строкам ${newValue ? 'включены' : 'отключены'}`, 'info', 1500);
              }
            },
            {
              text: currentColumnTotals ? 'Итоги по колонкам ✓' : 'Итоги по колонкам',
              icon: 'columnproperties',
              onItemClick: () => {
                const newValue = !pivotGridInstance.option('showColumnTotals');
                pivotGridInstance.option('showColumnTotals', newValue);
                DevExpress.ui.notify(`Итоги по колонкам ${newValue ? 'включены' : 'отключены'}`, 'info', 1500);
              }
            }
          );
        }
      }
    }).appendTo(container);
  }
}