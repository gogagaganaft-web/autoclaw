import { getStats, getSummary, clearStats } from './ReportStats.js';

export class StatisticRenderer {
  static render(container, report) {
    var reportId = report.id;
    var data = getStats(reportId).slice().reverse();
    var summary = getSummary(reportId);

    container.empty();

    if (data.length === 0) {
      container.append(
        $('<div>').css({ textAlign: 'center', padding: '40px', fontSize: '16px', color: '#888' })
          .text('Статистика пока пуста — выполните отчёт')
      );
      return null;
    }

    // Заголовок
    var title = 'Статистика по отчёту: ' + (report.text || '');
    if (summary) {
      title += '  |  Среднее: ' + summary.avgSec + 'с  ·  Последний: ' + summary.lastSec + 'с  ·  Всего: ' + summary.count;
    }

    var $header = $('<div>').css({ padding: '10px 14px', fontSize: '14px', fontWeight: 'bold', color: '#ccc', background: '#2a2a36', borderBottom: '1px solid #444' }).text(title);
    container.append($header);

    // Кнопка очистки
    var $toolbar = $('<div>').css({ padding: '6px 14px', background: '#2a2a36', borderBottom: '1px solid #444', display: 'flex', gap: '8px', alignItems: 'center' });
    var $clearBtn = $('<div>').dxButton({
      text: 'Очистить статистику',
      icon: 'trash',
      stylingMode: 'outlined',
      type: 'danger',
      onClick: function() {
        clearStats(reportId);
        StatisticRenderer.render(container, report);
      }
    });
    $toolbar.append($clearBtn);
    container.append($toolbar);

    // DataGrid
    var $grid = $('<div>').css({ height: 'calc(90.9vh - 100px)' });
    container.append($grid);

    $grid.dxDataGrid({
      dataSource: data,
      showBorders: true,
      hoverStateEnabled: true,
      width: '100%',
      columnAutoWidth: true,
      allowColumnResizing: true,
      columnResizingMode: 'widget',
      wordWrapEnabled: true,
      scrolling: { mode: 'virtual' },
      paging: { enabled: true, pageSize: 50 },
      pager: {
        visible: true,
        showPageSizeSelector: true,
        allowedPageSizes: [10, 50, 100, 500],
        showInfo: true,
        showNavigationButtons: true
      },
      sorting: { mode: 'multiple' },
      headerFilter: { visible: true },
      columns: [
        { caption: 'Исполнено', dataField: 'ts', width: 155, sortOrder: 'desc',
          calculateCellValue: function(row) {
            try {
              var d = new Date(row.ts);
              return d.toLocaleDateString('ru-RU', { day:'2-digit', month:'2-digit', year:'2-digit' })
                + ' ' + d.toLocaleTimeString('ru-RU', { hour:'2-digit', minute:'2-digit' });
            } catch(e) { return row.ts || ''; }
          }
        },
        { dataField: 'durationMs', caption: 'Время, мс', width: 100,
          calculateCellValue: function(row) {
            return (row.durationMs / 1000).toFixed(1) + 'с';
          },
          alignment: 'right'
        },
        { dataField: 'rows', caption: 'Записей', width: 90,
          calculateCellValue: function(row) {
            if (!row.rows) return '0';
            return Number(row.rows).toLocaleString('ru-RU');
          },
          alignment: 'right'
        },
        { dataField: 'filters', caption: 'Фильтры',
          cssClass: 'stats-filter-cell'
        }
      ]
    });

    return null;
  }
}
