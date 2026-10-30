// DashboardRenderer.js
import { ExportManager } from './ExportManager.js';
import { preparePivotDateIntervals } from './PivotDateIntervals.js';
import { getUserViewStore, reportKeyOf } from './UserViewStore.js';

export class DashboardRenderer {
  static render(container, data, report) {
    // ==================== ПРОВЕРКА ДАННЫХ ====================
    if (!data) {
      console.warn('Нет данных для отображения Dashboard');
      $(container).html('<div>Нет данных для отображения</div>');
      return null;
    }
    
    console.log('DashboardRenderer - полученные данные:', data);
    
    // ==================== ПОДГОТОВКА DATA SOURCE ====================
    let pivotDataSource = data.dataSource;
    
    if (!pivotDataSource && data.rows && data.columns) {
      pivotDataSource = data.rows.map(row => {
        const obj = {};
        data.columns.forEach((col, i) => obj[col] = row[i]);
        return obj;
      });
      console.log('Создан pivotDataSource из rows, количество записей:', pivotDataSource.length);
    }
    
    if (!pivotDataSource || pivotDataSource.length === 0) {
      $(container).html('<div>Нет данных для отображения</div>');
      return null;
    }

    // ==================== КОНФИГУРАЦИЯ ====================
    var chartTypes = [
      { name: 'Столбчатый', type: 'bar', icon: 'chart' },
      { name: 'Линейный', type: 'line', icon: 'chart' },
      { name: 'Область', type: 'area', icon: 'chart' },
      { name: 'Столбчатый с накоплением', type: 'stackedBar', icon: 'chart' },
      { name: 'Столбчатый в 100%', type: 'fullStackedBar', icon: 'chart' }
    ];
    
    var palettes = [
      { name: 'Атом', value: 'material', icon: 'palette' },
      { name: 'Финансы', value: 'violet', icon: 'palette' },
      { name: 'Лето', value: 'soft', icon: 'palette' },
      { name: 'Гармония', value: 'harmony light', icon: 'palette' }
    ];
    
    // Режимы отображения данных
    var displayModes = [
      { mode: 'singleAxis', icon: 'columnfield', hint: 'Режим: одна ось' },
      { mode: 'splitPanes', icon: 'columnfield', hint: 'Режим: раздельные панели' },
      { mode: 'splitAxes', icon: 'columnfield', hint: 'Режим: раздельные оси' }
    ];
    
    // ==================== ЗАГРУЗКА СОСТОЯНИЯ ====================
    var viewStore = getUserViewStore();
    var dashboardReportKey = reportKeyOf(report);

    var savedState = null;
    var isPivotCollapsed = false;
    var selectedChartIndex = 0;
    var selectedPalette = 'material';
    var dataFieldsDisplayMode = 'singleAxis';
    var currentModeIndex = 0;

    try {
      if (viewStore && dashboardReportKey) {
        savedState = viewStore.getDashboard(dashboardReportKey);
      }
      if (savedState) {
        isPivotCollapsed = savedState.isPivotCollapsed === true;
        selectedChartIndex = savedState.selectedChartIndex || 0;
        selectedPalette = savedState.selectedPalette || 'material';
        dataFieldsDisplayMode = savedState.dataFieldsDisplayMode || 'singleAxis';
        currentModeIndex = savedState.currentModeIndex || 0;
        console.log('Загружено состояние дашборда:', savedState);
      }
    } catch(e) {
      console.error('Ошибка загрузки состояния дашборда:', e);
    }
    
    // ==================== ПЕРЕМЕННЫЕ СОСТОЯНИЯ ====================
    var charts = [];
    var multiViewInstance = null;
    var pivotGridInstance = null;
    var isStateLoaded = false;
    var isDestroyed = false;
    var isUpdatingPalette = false;
    var isMultiViewCreated = false;
    var contentReadyTimer = null;
    var isPivotReadyFired = false;
    var isMultiViewContentReadyFired = false;
    
    // DOM элементы
    var $dashboard, $topSection, $bottomSection, $multiView;
    var togglePivotButton;
    var displayModeButton;
    
    // ==================== СОЗДАНИЕ DOM СТРУКТУРЫ ====================
    $(container).empty();
    
    var originalBottomFlex = '0 0 calc(50% - 7.5px)';
    var collapsedBottomFlex = '0 0 0px';
    
    $dashboard = $('<div>').css({
      display: 'flex',
      flexDirection: 'column',
      height: '90.9vh',
      gap: '0px',
      position: 'relative'
    }).appendTo(container);
    
    // Верхняя секция с графиком
    $topSection = $('<div>').css({
      flex: isPivotCollapsed ? '1 1 auto' : '0 0 calc(50% - 7.5px)',
      overflow: 'hidden',
      minHeight: '300px',
      transition: 'flex 0.3s ease',
      margin: '15px 15px 0 15px',
      position: 'relative'
    }).appendTo($dashboard);
    
    var $chartContainer = $('<div>').css({ width: '100%', height: '100%' }).appendTo($topSection);
    $multiView = $('<div>').css({ width: '100%', height: '100%' }).appendTo($chartContainer);
    
        // Плавающий тулбар поверх графика (снизу справа)
    var $floatingToolbar = $('<div>').addClass('dashboard-toolbar').css({
      position: 'absolute',
      bottom: '0px',
      right: '5px',
      zIndex: 100,
      background: '#363640',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      padding: '4px',
      display: 'flex',
      gap: '4px',
      border: 'none'
    }).appendTo($topSection);
    
    // Принудительное применение стилей для иконок тулбара
    var styleId = 'dashboard-toolbar-styles';
    if (!$('#' + styleId).length) {
      $('<style>', { id: styleId }).text(`
        .dashboard-toolbar .dx-button .dx-icon,
        .dashboard-toolbar .dx-button .dx-icon:before,
        .dashboard-toolbar .dx-button.dx-button-default .dx-icon,
        .dashboard-toolbar .dx-button.dx-button-default .dx-icon:before,
        .dashboard-toolbar .dx-button.dx-button-text .dx-icon,
        .dashboard-toolbar .dx-button.dx-button-text .dx-icon:before {
          color: #ffffff !important;
        }
        .dashboard-toolbar .dx-button .dx-button-text {
          color: #ffffff !important;
        }
        .dashboard-toolbar .dx-button.dx-button-default {
          background-color: transparent !important;
        }
        .dashboard-toolbar .dx-button.dx-button-default:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
        }
        .dashboard-toolbar .dx-dropdownbutton .dx-button .dx-icon,
        .dashboard-toolbar .dx-dropdownbutton .dx-button .dx-icon:before {
          color: #ffffff !important;
        }
        .dashboard-toolbar .dx-button .dx-icon-image:before,
        .dashboard-toolbar .dx-button .dx-icon-pdffile:before,
        .dashboard-toolbar .dx-button .dx-icon-print:before,
        .dashboard-toolbar .dx-button .dx-icon-chart:before,
        .dashboard-toolbar .dx-button .dx-icon-palette:before,
        .dashboard-toolbar .dx-button .dx-icon-chevronleft:before,
        .dashboard-toolbar .dx-button .dx-icon-chevronright:before,
        .dashboard-toolbar .dx-button .dx-icon-chevrondown:before,
        .dashboard-toolbar .dx-button .dx-icon-chevronup:before {
          color: #ffffff !important;
        }
      `).appendTo('head');
    }
    // Кнопка предыдущего графика
    var $prevChartBtn = $('<div>').appendTo($floatingToolbar);
    $prevChartBtn.dxButton({
      icon: 'chevronleft',
      hint: 'Предыдущий график',
      type: 'default',
      stylingMode: 'contained',
      elementAttr: { style: 'background: transparent; color: white;' },
      onClick: function(e) {
        e.event.stopPropagation();
        if (multiViewInstance) {
          var currentIndex = multiViewInstance.option('selectedIndex');
          var newIndex = currentIndex > 0 ? currentIndex - 1 : chartTypes.length - 1;
          multiViewInstance.option('selectedIndex', newIndex);
        }
      }
    });
    
    // Кнопка следующего графика
    var $nextChartBtn = $('<div>').appendTo($floatingToolbar);
    $nextChartBtn.dxButton({
      icon: 'chevronright',
      hint: 'Следующий график',
      type: 'default',
      stylingMode: 'contained',
      elementAttr: { style: 'background: transparent; color: white;' },
      onClick: function(e) {
        e.event.stopPropagation();
        if (multiViewInstance) {
          var currentIndex = multiViewInstance.option('selectedIndex');
          var newIndex = (currentIndex + 1) % chartTypes.length;
          multiViewInstance.option('selectedIndex', newIndex);
        }
      }
    });
    
    // Разделитель
    $('<div>').css({ width: '1px', height: 'auto', background: '#555', margin: '0 2px' }).appendTo($floatingToolbar);
    
    // Кнопка смены типа графика - используем dxDropDownButton
    var chartTypeItems = [];
    for (var i = 0; i < chartTypes.length; i++) {
      chartTypeItems.push({
        text: chartTypes[i].name,
        selected: i === selectedChartIndex,
        onClick: (function(idx) {
          return function() {
            if (multiViewInstance) {
              multiViewInstance.option('selectedIndex', idx);
              DevExpress.ui.notify('Тип графика: ' + chartTypes[idx].name, 'info', 1500);
            }
          };
        })(i)
      });
    }
    
    var $chartTypeBtn = $('<div>').appendTo($floatingToolbar);
    $chartTypeBtn.dxDropDownButton({
      icon: 'chart',
      text: '',
      hint: 'Тип графика',
      stylingMode: 'text',
      dropDownOptions: { width: 180 },
      items: chartTypeItems,
      onItemClick: function(e) {
        e.event.stopPropagation();
        e.itemData.onClick();
      }
    });
    
    // Кнопка смены палитры
    var paletteItems = [];
    for (var i = 0; i < palettes.length; i++) {
      paletteItems.push({
        text: palettes[i].name,
        selected: selectedPalette === palettes[i].value,
        onClick: (function(idx) {
          return function() {
            selectedPalette = palettes[idx].value;
            updateAllChartsPalette(selectedPalette);
            saveDashboardState();
            DevExpress.ui.notify('Палитра: ' + palettes[idx].name, 'info', 1500);
          };
        })(i)
      });
    }
    
    var $paletteBtn = $('<div>').appendTo($floatingToolbar);
    $paletteBtn.dxDropDownButton({
      icon: 'palette',
      text: '',
      hint: 'Цветовая палитра',
      stylingMode: 'text',
      dropDownOptions: { width: 180 },
      items: paletteItems,
      onItemClick: function(e) {
        e.event.stopPropagation();
        e.itemData.onClick();
      }
    });
    
    // Разделитель
    $('<div>').css({ width: '1px', height: 'auto', background: '#555', margin: '0 2px' }).appendTo($floatingToolbar);
    
    // Кнопка экспорта PNG
    var $exportPngBtn = $('<div>').appendTo($floatingToolbar);
    $exportPngBtn.dxButton({
      icon: 'image',
      hint: 'Экспорт PNG',
      type: 'default',
      stylingMode: 'contained',
      elementAttr: { style: 'background: transparent; color: white;' },
      onClick: function(e) {
        e.event.stopPropagation();
        exportCurrentChart('png');
      }
    });
    
    // Кнопка экспорта PDF
    var $exportPdfBtn = $('<div>').appendTo($floatingToolbar);
    $exportPdfBtn.dxButton({
      icon: 'pdffile',
      hint: 'Экспорт PDF',
      type: 'default',
      stylingMode: 'contained',
      elementAttr: { style: 'background: transparent; color: white;' },
      onClick: function(e) {
        e.event.stopPropagation();
        exportCurrentChart('pdf');
      }
    });
    
    // Кнопка печати
    var $printBtn = $('<div>').appendTo($floatingToolbar);
    $printBtn.dxButton({
      icon: 'print',
      hint: 'Печать',
      type: 'default',
      stylingMode: 'contained',
      elementAttr: { style: 'background: transparent; color: white;' },
      onClick: function(e) {
        e.event.stopPropagation();
        printCurrentChart();
      }
    });
    
    // Разделитель
    $('<div>').css({ width: '1px', height: 'auto', background: '#555', margin: '0 2px' }).appendTo($floatingToolbar);
    
    // Кнопка переключения режима отображения данных
    var $displayModeBtn = $('<div>').appendTo($floatingToolbar);
    displayModeButton = $displayModeBtn.dxButton({
      icon: displayModes[currentModeIndex].icon,
      hint: displayModes[currentModeIndex].hint,
      type: 'default',
      stylingMode: 'contained',
      elementAttr: { style: 'background: transparent; color: white;' },
      onClick: function(e) {
        e.event.stopPropagation();
        cycleDataFieldsDisplayMode();
      }
    }).dxButton('instance');
    
    // Разделитель
    $('<div>').css({ width: '1px', height: 'auto', background: '#555', margin: '0 2px' }).appendTo($floatingToolbar);
    
    // Кнопка скрыть/показать таблицу
    var $toggleTableBtn = $('<div>').appendTo($floatingToolbar);
    togglePivotButton = $toggleTableBtn.dxButton({
      icon: isPivotCollapsed ? 'chevronup' : 'chevrondown',
      hint: isPivotCollapsed ? 'Показать таблицу' : 'Скрыть таблицу',
      type: 'default',
      stylingMode: 'contained',
      elementAttr: { style: 'background: transparent; color: white;' },
      onClick: function(e) {
        e.event.stopPropagation();
        togglePivot();
      }
    }).dxButton('instance');
    
    // Нижняя секция - PivotGrid
    $bottomSection = $('<div>').css({
      flex: isPivotCollapsed ? collapsedBottomFlex : originalBottomFlex,
      overflow: 'auto',
      transition: 'flex 0.3s ease',
      display: isPivotCollapsed ? 'none' : 'block',
      margin: '15px'
    }).appendTo($dashboard);
    
    // ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
    
    function saveDashboardState() {
      if (isDestroyed) return;
      var state = {
        isPivotCollapsed: isPivotCollapsed,
        selectedChartIndex: multiViewInstance ? multiViewInstance.option('selectedIndex') : selectedChartIndex,
        selectedPalette: selectedPalette,
        dataFieldsDisplayMode: dataFieldsDisplayMode,
        currentModeIndex: currentModeIndex,
        timestamp: Date.now()
      };
      try {
        if (viewStore && dashboardReportKey) viewStore.setDashboard(dashboardReportKey, state);
      } catch(e) {
        console.error('Ошибка сохранения состояния дашборда:', e);
      }
    }
    
    function updateToggleButtonText() {
      if (isDestroyed || !togglePivotButton) return;
      togglePivotButton.option({
        icon: isPivotCollapsed ? 'chevronup' : 'chevrondown',
        hint: isPivotCollapsed ? 'Показать таблицу' : 'Скрыть таблицу'
      });
    }
    
    function togglePivot() {
      if (isDestroyed) return;
      isPivotCollapsed = !isPivotCollapsed;
      
      if (isPivotCollapsed) {
        $bottomSection.css('flex', collapsedBottomFlex).hide();
        $topSection.css('flex', '1 1 auto');
      } else {
        $bottomSection.css('flex', originalBottomFlex).show();
        $topSection.css('flex', '0 0 calc(50% - 7.5px)');
      }
      
      updateToggleButtonText();
      saveDashboardState();
      
      setTimeout(function() {
        if (isDestroyed || !multiViewInstance) return;
        var currentIndex = multiViewInstance.option('selectedIndex');
        multiViewInstance.option('selectedIndex', currentIndex);
      }, 400);
    }
    
    function updateAllChartsPalette(palette) {
      if (isDestroyed || isUpdatingPalette) return;
      isUpdatingPalette = true;
      
      for (var i = 0; i < charts.length; i++) {
        var chart = charts[i];
        if (chart && typeof chart.option === 'function') {
          try {
            chart.option('palette', palette);
          } catch(e) {}
        }
      }
      
      setTimeout(function() { isUpdatingPalette = false; }, 500);
    }
    
    function exportCurrentChart(format) {
      var currentIndex = multiViewInstance ? multiViewInstance.option('selectedIndex') : selectedChartIndex;
      var currentChart = charts[currentIndex];
      if (currentChart && typeof currentChart.exportTo === 'function') {
        var mimeType = format === 'png' ? 'image/png' : 'application/pdf';
        var fileName = 'chart.' + format;
        currentChart.exportTo(mimeType, fileName, {
          width: 1200,
          height: 600,
          backgroundColor: '#ffffff'
        });
        DevExpress.ui.notify('Экспорт ' + format.toUpperCase() + ' выполнен', 'success', 1500);
      } else {
        DevExpress.ui.notify('График еще не загружен', 'warning', 1500);
      }
    }
    
    function printCurrentChart() {
      var currentIndex = multiViewInstance ? multiViewInstance.option('selectedIndex') : selectedChartIndex;
      var currentChart = charts[currentIndex];
      if (currentChart && typeof currentChart.print === 'function') {
        currentChart.print();
        DevExpress.ui.notify('Отправлено на печать', 'success', 1500);
      } else {
        DevExpress.ui.notify('График еще не загружен', 'warning', 1500);
      }
    }
    
    // Функция циклического переключения режима отображения данных
    function cycleDataFieldsDisplayMode() {
      // Переключаем на следующий режим
      currentModeIndex = (currentModeIndex + 1) % displayModes.length;
      dataFieldsDisplayMode = displayModes[currentModeIndex].mode;
      
      // Обновляем иконку и подсказку кнопки
      if (displayModeButton) {
        displayModeButton.option({
          icon: displayModes[currentModeIndex].icon,
          hint: displayModes[currentModeIndex].hint
        });
      }
      
      // Уведомление о переключении
      var modeNames = {
        'singleAxis': 'одна ось',
        'splitPanes': 'раздельные панели',
        'splitAxes': 'раздельные оси'
      };
      DevExpress.ui.notify('Режим: ' + modeNames[dataFieldsDisplayMode], 'info', 2000);
      
      // Перепривязываем все графики с новым режимом
      for (var i = 0; i < charts.length; i++) {
        var chart = charts[i];
        if (chart && pivotGridInstance) {
          try {
            pivotGridInstance.bindChart(chart, {
              dataFieldsDisplayMode: dataFieldsDisplayMode,
              putDataFieldsInto: 'series',
              alternateDataFields: false
            });
            
            var chartConfig = chartTypes[i];
            if (chartConfig) {
              chart.option('commonSeriesSettings', { type: chartConfig.type });
            }
            
            console.log('✅ Режим отображения изменен на:', dataFieldsDisplayMode, 'для графика', i);
          } catch(err) {
            console.error('Ошибка обновления режима графика:', err);
          }
        }
      }
      
      saveDashboardState();
    }



// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ UNIT ====================

function getUnitFromSeries(args) {
  try {
    // Получаем доступ к dataField через разные возможные пути
    var dataField = null;
    var unit = '';
    
    // Вариант 1: Через series (если есть)
    if (args.series && args.series.getOptions) {
      var seriesOptions = args.series.getOptions();
      dataField = seriesOptions.valueField || seriesOptions.field;
    }
    
    // Вариант 2: Через point
    if (!dataField && args.point && args.point.data) {
      // Для PivotGrid точки данных содержат информацию о полях
      var pointData = args.point.data;
      if (pointData && pointData.dataField) {
        dataField = pointData.dataField;
      }
    }
    
    // Вариант 3: Если знаем структуру - seriesName может быть значением измерения
    // В этом случае нужно найти соответствующее поле данных
    if (!dataField && pivotGridInstance) {
      var dataSource = pivotGridInstance.getDataSource();
      if (dataSource) {
        // Получаем все поля данных
        var dataFields = dataSource.getAreaFields('data');
        if (dataFields && dataFields.length > 0) {
          // Если несколько полей данных, берем первое (или нужно определить логику)
          dataField = dataFields[0]?.dataField;
          unit = dataFields[0]?.unit;
        }
      }
    }
    
    // Если получили dataField, ищем unit в определении полей
    if (dataField) {
      var fields = report?.fields?.pivot || [];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        if (field.dataField === dataField || field.caption === dataField) {
          unit = field.unit || '';
          console.log('Найден unit для dataField', dataField, ':', unit);
          break;
        }
      }
    }
    
    // Если всё еще нет unit, используем карту по умолчанию
    if (!unit) {
      // Карта соответствия caption полей и unit
      var defaultUnits = {
        'Количество': 'шт.',
        'Сумма': 'руб.',
        'Кол-во': 'шт.'
      };
      
      // Проверяем, не является ли args.seriesName значением из defaultUnits
      if (args.seriesName && defaultUnits[args.seriesName]) {
        unit = defaultUnits[args.seriesName];
      } else {
        // Пытаемся найти среди всех полей
        var fields = report?.fields?.pivot || [];
        for (var i = 0; i < fields.length; i++) {
          if (fields[i].unit) {
            unit = fields[i].unit;
            break; // берем первый попавшийся unit
          }
        }
      }
    }
    
    console.log('Определен unit для серии', args.seriesName, ':', unit);
    return unit;
    
  } catch(err) {
    console.error('Ошибка получения unit:', err);
    return '';
  }
}

   
    // ==================== ФУНКЦИИ СОЗДАНИЯ ГРАФИКОВ ====================
    
    function createChart(type, containerId) {
      var $container = $('#' + containerId);
      if ($container.length === 0) return null;
      
      var chart = $container.dxChart({
        commonSeriesSettings: { type: type },
        palette: selectedPalette,
        dataSource: [],
        tooltip: {
          enabled: true,
customizeTooltip: function(args) {
  var valueText = args.value;
  var seriesName = args.seriesName || 'Значение';
  
  // Передаем весь args для более полного анализа
  var unit = getUnitFromSeries(args);
  
  if (typeof valueText === 'number') {
    valueText = valueText.toLocaleString('ru-RU', { 
      style: 'decimal', 
      maximumFractionDigits: 0 
    }) + (unit ? ' ' + unit : '');
  }
  
  return {
    html: (seriesName || 'Значение') + '<br/><div>' + (valueText || args.valueText) + '</div>'
  };
}        },
        valueAxis: {
          title: { text: 'Сумма' },
          label: { format: 'currency' }
        },
        argumentAxis: {
          title: { text: 'Период' },
          label: { rotationAngle: 45, overlappingBehavior: 'rotate' }
        },
        legend: {
          visible: true,
          horizontalAlignment: 'right',
          position: 'outside'
        },
        export: { enabled: false },
        size: { height: '100%', width: '100%' },
        title: { font: { size: 14, weight: 'bold' } }
      }).dxChart('instance');
      
      return chart;
    }
    
    function bindChartToPivot(chart, type) {
      if (!chart || !pivotGridInstance) return;
      
      try {
        pivotGridInstance.bindChart(chart, {
          dataFieldsDisplayMode: dataFieldsDisplayMode,
          putDataFieldsInto: 'series',
          alternateDataFields: false
        });
        
        chart.option('commonSeriesSettings', { type: type });
        
        console.log('✅ График привязан к PivotGrid, режим:', dataFieldsDisplayMode);
      } catch(err) {
        console.error('Ошибка привязки графика:', err);
      }
    }
    
    // ==================== СОЗДАНИЕ ВСЕХ ГРАФИКОВ ====================
    
    function createAllChartsAndMultiView() {
      if (isDestroyed || isMultiViewCreated) return;
      
      isMultiViewCreated = true;
      console.log('Создание MultiView и графиков...');
      
      var chartItems = [];
      
      for (var i = 0; i < chartTypes.length; i++) {
        var containerId = 'chart-container-' + i + '-' + Date.now();
        var chartConfig = chartTypes[i];
        
        chartItems.push({
          template: (function(idx, id, config) {
            return function() {
              var $div = $('<div>').css({ width: '100%', height: '100%', position: 'relative' });
              $('<div>').attr('id', id).css({ width: '100%', height: '100%' }).appendTo($div);
              
              setTimeout(function() {
                if (isDestroyed || charts[idx]) return;
                
                var chart = createChart(config.type, id);
                if (chart && pivotGridInstance) {
                  bindChartToPivot(chart, config.type);
                  charts[idx] = chart;
                  console.log('✅ График ' + chartTypes[idx].name + ' создан');
                }
              }, 100);
              
              return $div;
            };
          })(i, containerId, chartConfig)
        });
      }
      
      multiViewInstance = $multiView.dxMultiView({
        items: chartItems,
        selectedIndex: selectedChartIndex,
        animationEnabled: true,
        loop: true,
        swipeEnabled: true,
        showNavButtons: false,
        height: '100%',
        width: '100%',
        onSelectionChanged: function(e) {
          if (isDestroyed) return;
          var newIndex = e.component.option('selectedIndex');
          selectedChartIndex = newIndex;
          saveDashboardState();
          
          var chartConfig = chartTypes[newIndex];
          var currentChart = charts[newIndex];
          
          if (currentChart && pivotGridInstance) {
            bindChartToPivot(currentChart, chartConfig.type);
          }
          
          console.log('Выбран график:', chartConfig.name);
        },
        onContentReady: function(e) {
          if (isDestroyed || isMultiViewContentReadyFired) return;
          isMultiViewContentReadyFired = true;
          console.log('MultiView готов');
        }
      }).dxMultiView('instance');
    }
    
    // ==================== НАСТРОЙКА ПОЛЕЙ PIVOTGRID ====================
    
    var pivotFields = [];
    var fieldNames = {};
    var fieldCounter = {};
    
    if (report?.fields?.pivot && report.fields.pivot.length > 0) {
      for (var i = 0; i < report.fields.pivot.length; i++) {
        var field = report.fields.pivot[i];
        var fieldName = field.dataField || field.caption;
        
        if (!fieldNames[fieldName]) {
          fieldNames[fieldName] = true;
          pivotFields.push(field);
        } else {
          if (!fieldCounter[fieldName]) fieldCounter[fieldName] = 1;
          fieldCounter[fieldName]++;
          var newField = JSON.parse(JSON.stringify(field));
          newField.caption = field.caption + ' (' + fieldCounter[fieldName] + ')';
          newField.dataField = field.dataField + '_' + fieldCounter[fieldName];
          pivotFields.push(newField);
        }
      }
    }
    
    if (pivotFields.length === 0 && data.columns && data.columns.length > 0) {
      for (var i = 0; i < Math.min(data.columns.length, 5); i++) {
        var col = data.columns[i];
        pivotFields.push({ dataField: col, caption: col, area: 'row' });
      }
      if (data.columns.length > 5) {
        pivotFields.push({
          dataField: data.columns[data.columns.length - 1],
          caption: data.columns[data.columns.length - 1],
          area: 'data',
          dataType: 'number',
          summaryType: 'sum'
        });
      }
    }

    // Недельные интервалы (groupInterval "week") DevExpress не умеет — предрасчёт
    // Monday-ключа и подписи "пп.ММ–пп.ММ", как и в своде.
    if (Array.isArray(pivotDataSource)) {
      var preparedWeek = preparePivotDateIntervals(pivotFields, pivotDataSource);
      pivotFields = preparedWeek.fields;
      pivotDataSource = preparedWeek.rows;
    }

    // ==================== ОБРАБОТЧИК КОНТЕКСТНОГО МЕНЮ PIVOT ====================
    
    function handlePivotContextMenu(e) {
      if (!e.items) e.items = [];
      const pivotLocal = e.component;
      const dataSource = pivotLocal.getDataSource();
      const sourceField = e.field;
      
      e.items.forEach(function(item) {
        if (item.text === 'Expand all' || item.text === 'Раскрыть все' || item.name === 'expandAll') item.icon = 'expand';
        if (item.text === 'Collapse all' || item.text === 'Свернуть все' || item.name === 'collapseAll') item.icon = 'collapse';
      });
      
      if (e.items && e.items.length > 0) {
        const sortItems = [];
        const otherItems = [];
        e.items.forEach(item => {
          const itemText = (item.text || '').toLowerCase();
          const itemName = (item.name || '').toLowerCase();
          if (itemText.includes('sort') || itemText.includes('сортиров') ||
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
      
      const currentOptions = pivotLocal.option('fieldPanel') || {};
      e.items.push(
        { beginGroup: true, text: currentOptions.showColumnFields ? 'Поля колонок ✓' : 'Поля колонок', icon: 'columnfield',
          onItemClick: () => { 
            const newValue = !currentOptions.showColumnFields;
            pivotLocal.option('fieldPanel.showColumnFields', newValue);
            DevExpress.ui.notify(`Поля колонок ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
          } },
        { text: currentOptions.showRowFields ? 'Поля строк ✓' : 'Поля строк', icon: 'rowfield',
          onItemClick: () => { 
            const newValue = !currentOptions.showRowFields;
            pivotLocal.option('fieldPanel.showRowFields', newValue);
            DevExpress.ui.notify(`Поля строк ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
          } },
        { text: currentOptions.showFilterFields ? 'Поля фильтров ✓' : 'Поля фильтров', icon: 'filter',
          onItemClick: () => { 
            const newValue = !currentOptions.showFilterFields;
            pivotLocal.option('fieldPanel.showFilterFields', newValue);
            DevExpress.ui.notify(`Поля фильтров ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
          } },
        { text: currentOptions.showDataFields ? 'Поля данных ✓' : 'Поля данных', icon: 'datafield',
          onItemClick: () => { 
            const newValue = !currentOptions.showDataFields;
            pivotLocal.option('fieldPanel.showDataFields', newValue);
            DevExpress.ui.notify(`Поля данных ${newValue ? 'показаны' : 'скрыты'}`, 'info', 1500);
          } }
      );
      
      const currentRowTotals = pivotLocal.option('showRowTotals');
      const currentColumnTotals = pivotLocal.option('showColumnTotals');
      e.items.push(
        { beginGroup: true, text: currentRowTotals ? 'Итоги по строкам ✓' : 'Итоги по строкам', icon: 'rowproperties',
          onItemClick: () => { 
            const newValue = !pivotLocal.option('showRowTotals');
            pivotLocal.option('showRowTotals', newValue);
            DevExpress.ui.notify(`Итоги по строкам ${newValue ? 'включены' : 'отключены'}`, 'info', 1500);
          } },
        { text: currentColumnTotals ? 'Итоги по колонкам ✓' : 'Итоги по колонкам', icon: 'columnproperties',
          onItemClick: () => { 
            const newValue = !pivotLocal.option('showColumnTotals');
            pivotLocal.option('showColumnTotals', newValue);
            DevExpress.ui.notify(`Итоги по колонкам ${newValue ? 'включены' : 'отключены'}`, 'info', 1500);
          } }
      );
      
      if (multiViewInstance) {
        var chartTypeItems = [];
        for (var i = 0; i < chartTypes.length; i++) {
          (function(idx) {
            var ct = chartTypes[idx];
            chartTypeItems.push({
              text: ct.name, icon: ct.icon,
              selected: multiViewInstance.option('selectedIndex') === idx,
              onItemClick: function() { 
                multiViewInstance.option('selectedIndex', idx);
                DevExpress.ui.notify('График: ' + ct.name, 'info', 1500);
              }
            });
          })(i);
        }
        
        var paletteItems = [];
        for (var i = 0; i < palettes.length; i++) {
          (function(idx) {
            var p = palettes[idx];
            paletteItems.push({
              text: p.name, icon: p.icon,
              selected: selectedPalette === p.value,
              onItemClick: function() {
                selectedPalette = p.value;
                updateAllChartsPalette(selectedPalette);
                saveDashboardState();
                DevExpress.ui.notify('Палитра: ' + p.name, 'info', 1500);
              }
            });
          })(i);
        }
        
        e.items.push({ beginGroup: true, text: 'Тип графика', icon: 'chart', items: chartTypeItems });
        e.items.push({ beginGroup: true, text: 'Цветовая палитра', icon: 'palette', items: paletteItems });
      }
    }
    
    // ==================== СОЗДАНИЕ PIVOTGRID ====================
    
    pivotGridInstance = $bottomSection.dxPivotGrid({
      dataSource: { fields: pivotFields, store: pivotDataSource },
      remoteOperations: true,
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
      loadPanel: { enabled: true },
      height: '100%',
      width: '100%',
      scrolling: { mode: 'virtual', rowRenderingMode: 'virtual', columnRenderingMode: 'virtual' },
      headerFilter: { search: { enabled: true }, showRelevantValues: true, width: 450, height: 500 },
      fieldPanel: {
        showColumnFields: true,
        showRowFields: true,
        showFilterFields: true,
        showDataFields: true,
        allowFieldDragging: true,
        visible: true
      },
      fieldChooser: { enabled: true },
      export: { enabled: true },
      stateStoring: viewStore ? viewStore.pivotStateStoring(dashboardReportKey) : undefined,
      onExporting: function(e) {
        ExportManager.exportPivotGrid(e, {
          reportName: report?.text,
          totalRows: Array.isArray(pivotDataSource) ? pivotDataSource.length : 0,
          exportHeaderOptions: {
            exportRowFieldHeaders: true,
            exportColumnFieldHeaders: true,
            exportDataFieldHeaders: false,
            exportFilterFieldHeaders: false
          }
        });
      },
      onContextMenuPreparing: function(e) {
        handlePivotContextMenu(e);
      },
      onContentReady: function(e) {
        if (isPivotReadyFired) return;
        isPivotReadyFired = true;
        console.log('✅ PivotGrid для дашборда готов');
        
        contentReadyTimer = setTimeout(function() {
          if (isDestroyed) return;
          if (!isStateLoaded && !isMultiViewCreated) {
            isStateLoaded = true;
            createAllChartsAndMultiView();
          }
        }, 300);
      }
    }).dxPivotGrid('instance');
    
    // ==================== ОЧИСТКА ПРИ ВЫХОДЕ ====================
    
    $(window).on('pagehide', function(e) {
      if (e.persisted) return;
      isDestroyed = true;
      if (contentReadyTimer) clearTimeout(contentReadyTimer);
    });
    
    console.log('✅ Dashboard создан');
    return { pivotGrid: pivotGridInstance, multiView: multiViewInstance, charts: charts, togglePivot: togglePivot };
  }
}