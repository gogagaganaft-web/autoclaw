// pivotChartModule.js
(function(global) {
    'use strict';
    
    class PivotChartModule {
        constructor(pivotGridSelector, options = {}) {
            this.pivotGridSelector = pivotGridSelector;
            this.pivotGridInstance = null;
            this.chartInstance = null;
            this.options = {
                chartHeight: options.chartHeight || 400,
                defaultChartType: options.defaultChartType || 'bar',
                tooltipFormat: options.tooltipFormat || 'currency',
                showLegend: options.showLegend !== false,
                enableExport: options.enableExport !== false,
                enableTypeSelector: options.enableTypeSelector !== false,
                title: options.title || 'Анализ данных',
                ...options
            };
            
            this.init();
        }
        
        init() {
            const self = this;
            
            // Ждем загрузки DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => self.setup());
            } else {
                self.setup();
            }
        }
        
        setup() {
            const self = this;
            
            // Проверяем существование PivotGrid
            if ($(this.pivotGridSelector).length === 0) {
                console.error(`PivotChartModule: Элемент ${this.pivotGridSelector} не найден`);
                return;
            }
            
            // Получаем экземпляр PivotGrid
            this.pivotGridInstance = $(this.pivotGridSelector).dxPivotGrid('instance');
            
            if (!this.pivotGridInstance) {
                // Если экземпляр еще не создан, ждем
                this.waitForPivotGrid();
            } else {
                this.createChartInterface();
            }
        }
        
        waitForPivotGrid() {
            const self = this;
            let attempts = 0;
            const maxAttempts = 30;
            
            const checkInterval = setInterval(() => {
                attempts++;
                const instance = $(self.pivotGridSelector).dxPivotGrid('instance');
                
                if (instance) {
                    self.pivotGridInstance = instance;
                    clearInterval(checkInterval);
                    self.createChartInterface();
                } else if (attempts >= maxAttempts) {
                    clearInterval(checkInterval);
                    console.error('PivotChartModule: Не удалось найти экземпляр PivotGrid');
                }
            }, 200);
        }
        
        createChartInterface() {
            // Создаем контейнер для графика
            this.createChartContainer();
            
            // Создаем панель управления
            if (this.options.enableTypeSelector) {
                this.createControlPanel();
            }
            
            // Создаем кнопку экспорта
            if (this.options.enableExport) {
                this.createExportButton();
            }
            
            // Создаем график
            this.createChart();
            
            // Привязываем график к PivotGrid
            this.bindChart();
            
            // Добавляем обработчики событий PivotGrid
            this.addPivotGridEvents();
        }
        
        createChartContainer() {
            // Проверяем, существует ли уже контейнер
            if ($('#pivot-chart-container').length === 0) {
                const containerHtml = `
                    <div id="pivot-chart-wrapper" style="margin-top: 20px;">
                        <div id="pivot-chart-controls" style="margin-bottom: 10px;"></div>
                        <div id="pivot-chart-container" style="min-height: ${this.options.chartHeight}px;"></div>
                    </div>
                `;
                $(this.pivotGridSelector).after(containerHtml);
            }
        }
        
        createControlPanel() {
            const panelHtml = `
                <div style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                    <label style="margin-right: 10px; font-weight: bold;">Тип графика:</label>
                    <select id="pivot-chart-type" style="padding: 5px 10px; margin-right: 15px; border-radius: 4px; border: 1px solid #ddd;">
                        <option value="bar">Столбчатая диаграмма</option>
                        <option value="line">Линейный график</option>
                        <option value="area">Диаграмма области</option>
                        <option value="stackedBar">Столбчатая с накоплением</option>
                        <option value="fullStackedBar">100% столбчатая</option>
                        <option value="stackedLine">Линейный с накоплением</option>
                        <option value="fullStackedLine">100% линейный</option>
                        <option value="stackedArea">Область с накоплением</option>
                        <option value="fullStackedArea">100% область</option>
                        <option value="pie">Круговая диаграмма</option>
                        <option value="doughnut">Кольцевая диаграмма</option>
                        <option value="scatter">Точечная диаграмма</option>
                    </select>
                    
                    <label style="margin-right: 10px; margin-left: 15px;">Режим данных:</label>
                    <select id="pivot-chart-mode" style="padding: 5px 10px; border-radius: 4px; border: 1px solid #ddd;">
                        <option value="splitPanes">Разделенные панели</option>
                        <option value="singleAxis">Одна ось</option>
                    </select>
                </div>
            `;
            
            $('#pivot-chart-controls').html(panelHtml);
            
            // Обработчики событий
            const self = this;
            $('#pivot-chart-type').on('change', function() {
                self.updateChartType($(this).val());
            });
            
            $('#pivot-chart-mode').on('change', function() {
                self.bindChart($(this).val());
            });
        }
        
        createExportButton() {
            const buttonHtml = `
                <div style="margin: 10px 0; text-align: right;">
                    <button id="pivot-export-chart" style="padding: 5px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        📊 Экспорт графика (PNG)
                    </button>
                </div>
            `;
            
            $('#pivot-chart-controls').append(buttonHtml);
            
            const self = this;
            $('#pivot-export-chart').on('click', function() {
                self.exportChart();
            });
        }
        
        createChart() {
            try {
                this.chartInstance = $('#pivot-chart-container').dxChart({
                    commonSeriesSettings: {
                        type: this.options.defaultChartType,
                        argumentField: 'argument',
                        valueField: 'value',
                        label: {
                            visible: false
                        }
                    },
                    tooltip: {
                        enabled: true,
                        format: this.options.tooltipFormat,
                        customizeTooltip: function(args) {
                            return {
                                html: `<strong>${args.seriesName}</strong><br/>
                                       Значение: ${args.valueText}`
                            };
                        }
                    },
                    legend: {
                        visible: this.options.showLegend,
                        position: 'top',
                        horizontalAlignment: 'center'
                    },
                    size: {
                        height: this.options.chartHeight
                    },
                    title: {
                        text: this.options.title,
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    valueAxis: {
                        title: {
                            text: 'Сумма'
                        },
                        label: {
                            format: this.options.tooltipFormat
                        }
                    },
                    argumentAxis: {
                        title: {
                            text: 'Категории'
                        },
                        label: {
                            rotationAngle: 45
                        }
                    }
                }).dxChart('instance');
                
                console.log('График успешно создан');
                return true;
                
            } catch(e) {
                console.error('Ошибка создания графика:', e);
                return false;
            }
        }
        
        bindChart(displayMode = null) {
            if (!this.pivotGridInstance || !this.chartInstance) {
                console.log('Невозможно привязать график: экземпляры не инициализированы');
                return;
            }
            
            try {
                const mode = displayMode || $('#pivot-chart-mode').val() || 'splitPanes';
                
                this.pivotGridInstance.bindChart(this.chartInstance, {
                    dataFieldsDisplayMode: mode,
                    alternateDataFields: false
                });
                
                console.log(`График привязан к PivotGrid (режим: ${mode})`);
                
                // Принудительно обновляем график
                setTimeout(() => {
                    if (this.chartInstance) {
                        this.chartInstance.render();
                    }
                }, 100);
                
            } catch(e) {
                console.error('Ошибка привязки графика:', e);
            }
        }
        
        updateChartType(chartType) {
            if (!this.chartInstance) return;
            
            try {
                this.chartInstance.option('commonSeriesSettings.type', chartType);
                this.chartInstance.render();
                console.log(`Тип графика изменен на: ${chartType}`);
            } catch(e) {
                console.error('Ошибка изменения типа графика:', e);
            }
        }
        
        exportChart() {
            if (!this.chartInstance) return;
            
            try {
                this.chartInstance.exportTo('image/png', 'pivot_chart.png', {
                    width: 1200,
                    height: 600,
                    backgroundColor: '#ffffff',
                    format: 'PNG'
                });
                console.log('Экспорт графика выполнен');
            } catch(e) {
                console.error('Ошибка экспорта графика:', e);
            }
        }
        
        addPivotGridEvents() {
            const self = this;
            
            // Следим за изменениями в PivotGrid
            if (this.pivotGridInstance) {
                const originalContentReady = this.pivotGridInstance.option('onContentReady');
                
                this.pivotGridInstance.option('onContentReady', function(e) {
                    if (originalContentReady) {
                        originalContentReady(e);
                    }
                    // Обновляем график при изменении данных
                    setTimeout(() => {
                        self.bindChart();
                    }, 200);
                });
            }
        }
        
        refresh() {
            if (this.pivotGridInstance) {
                const dataSource = this.pivotGridInstance.getDataSource();
                if (dataSource && dataSource.reload) {
                    dataSource.reload();
                    console.log('Данные обновлены');
                    setTimeout(() => {
                        this.bindChart();
                    }, 200);
                }
            }
        }
        
        destroy() {
            if (this.chartInstance) {
                this.chartInstance.dispose();
            }
            $('#pivot-chart-wrapper').remove();
            this.chartInstance = null;
            this.pivotGridInstance = null;
        }
    }
    
    // Автоматическая инициализация для элементов с data-chart-module
    function autoInit() {
        if (typeof jQuery === 'undefined') {
            setTimeout(autoInit, 100);
            return;
        }
        
        $(document).ready(function() {
            $('[data-chart-module="true"]').each(function() {
                const $this = $(this);
                const pivotGridId = $this.attr('id');
                
                if (pivotGridId) {
                    new PivotChartModule(`#${pivotGridId}`, {
                        chartHeight: $this.data('chart-height') || 400,
                        defaultChartType: $this.data('chart-type') || 'bar',
                        tooltipFormat: $this.data('tooltip-format') || 'currency',
                        showLegend: $this.data('show-legend') !== false,
                        enableExport: $this.data('enable-export') !== false,
                        enableTypeSelector: $this.data('enable-type-selector') !== false,
                        title: $this.data('chart-title') || 'Анализ данных'
                    });
                }
            });
        });
    }
    
    // Экспортируем класс
    global.PivotChartModule = PivotChartModule;
    
    // Запускаем автоинициализацию
    setTimeout(autoInit, 200);
    
})(typeof window !== 'undefined' ? window : this);