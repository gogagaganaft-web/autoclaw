// MapRenderer.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
export class MapRenderer {
  static render(container, data, report) {
    // Проверка наличия данных
    if (!data) {
      console.warn('Нет данных для отображения Карты');
      $(container).html('<div>Нет данных для отображения</div>');
      return null;
    }
    
    console.log('MapRenderer - полученные данные:', data);
    
    // Создаем dataSource из rows и columns
    let mapDataSource = data.dataSource;
    
    if (!mapDataSource && data.rows && data.columns) {
      mapDataSource = data.rows.map(function(row) {
        var obj = {};
        data.columns.forEach(function(col, i) { obj[col] = row[i]; });
        return obj;
      });
      console.log('Создан mapDataSource из rows, количество записей:', mapDataSource.length);
    }
    
    if (!mapDataSource || mapDataSource.length === 0) {
      $(container).html('<div>Нет данных для отображения на карте</div>');
      return null;
    }

    // АГРЕГАЦИЯ ДАННЫХ ПО ДОМАМ
    const aggregatedData = this.aggregateByHouse(mapDataSource);
    console.log(`Агрегировано: ${aggregatedData.length} домов (было ${mapDataSource.length} записей)`);
    
    if (aggregatedData.length === 0) {
      $(container).html('<div style="padding: 20px; color: red;">Нет домов с корректными координатами</div>');
      return null;
    }
    
    // Очищаем контейнер
    $(container).empty();
    
    // Сохраняем ссылки на созданные элементы
    let createdElements = {
      mapContainer: null,
      panelWrapper: null,
      buttonWrapper: null,
      drawer: null
    };
    
    // Создаем контейнер для карты
    var $mapContainer = $('<div>').attr('id', 'yandex-map-' + Date.now()).css({
      width: '100%',
      height: '90.9vh',
      position: 'relative',
      zIndex: 1
    }).appendTo(container);
    
    createdElements.mapContainer = $mapContainer;
    
    // Создаем контейнер для панели
    var $panelWrapper = $('<div>').css({
      position: 'fixed',
      right: 0,
      top: 78,
      zIndex: 1000,
      pointerEvents: 'none',
      display: 'block'
    }).appendTo('body');
    
    createdElements.panelWrapper = $panelWrapper;
    
    // Контейнер для кнопки
    var $buttonWrapper = $('<div>').css({
      position: 'fixed',
      right: '13px',
      top: '120px',
      zIndex: 1001,
      pointerEvents: 'auto',
      display: 'block'
    }).appendTo('body');
    
    createdElements.buttonWrapper = $buttonWrapper;
    
    // Переменные для хранения состояния
    let objectManager = null;
    let mapInstance = null;
    
    // Создаем drawer
    var drawer = $panelWrapper.dxDrawer({
      opened: false,
      position: 'right',
      closeOnOutsideClick: true,
      shading: true,
      shadingColor: 'rgba(0, 0, 0, 0.5)',
      template: function() {
        var $panel = $('<div>').css({
          width: '320px',
          height: '90.9vh',
          backgroundColor: '#fff',
          pointerEvents: 'auto',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)'
        });
        
        // Заголовок панели
        $('<div>').dxToolbar({
          items: [{
            widget: 'dxButton',
            options: {
              icon: 'close',
              stylingMode: 'text',
              onClick: function() {
                drawer.hide();
              }
            }
          },
          {
            text: 'Список домов',
            location: 'center'
          }]
        }).appendTo($panel);
        
        // Поиск
        $('<div>').css({
          padding: '10px'
        }).dxTextBox({
          placeholder: 'Поиск адреса...',
          stylingMode: 'filled',
          onValueChanged: function(e) {
            filterByAddress(e.value);
          }
        }).appendTo($panel);
        
        // Контейнер для списка домов
        var $listContainer = $('<div>').css({
          flex: 1,
          overflow: 'auto',
          padding: '10px'
        }).appendTo($panel);
        
        // Создаем список домов с количеством ЛС
        var housesList = buildHousesList(aggregatedData);
        
        if (housesList && housesList.length > 0) {
          $listContainer.dxList({
            dataSource: housesList,
            displayExpr: 'displayName',
            itemTemplate: function(item) {
              return $('<div>').css({
                padding: '8px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }).html(`
                <div style="font-weight: bold;">${escapeHtml(item.address)}</div>
                <div style="font-size: 12px; color: #666;">
                  ЛС: ${item.lsCount} | Сумма: ${item.totalSum.toLocaleString('ru-RU')} руб.
                </div>
                <div style="font-size: 11px; color: #999;">ID дома: ${escapeHtml(String(item.houseId))}</div>
              `).on('click', function() {
                if (mapInstance && item.coords) {
                  mapInstance.setCenter(item.coords, 16);
                  drawer.hide();
                }
              });
            },
            searchEnabled: true,
            searchExpr: 'address'
          });
        } else {
          $listContainer.html('<div style="padding: 20px; text-align: center;">Нет данных</div>');
        }
        
        // Функция фильтрации по адресу
        function filterByAddress(searchText) {
          if (!objectManager) return;
          
          if (!searchText || searchText.length < 3) {
            objectManager.setFilter(null);
            return;
          }
          
          const lowerSearch = searchText.toLowerCase();
          objectManager.setFilter(function(obj) {
            return obj.address && obj.address.toLowerCase().indexOf(lowerSearch) !== -1;
          });
        }
        
        return $panel;
      }
    }).dxDrawer('instance');
    
    createdElements.drawer = drawer;
    
    // Кнопка меню
    $buttonWrapper.dxButton({
      icon: 'list',
      stylingMode: 'outlined',
      hint: 'Список домов',
      onClick: function() {
        drawer.toggle();
      }
    });
    
    // Функция построения списка домов
    function buildHousesList(data) {
      return data.map(function(item) {
        return {
          id: item.houseId,
          address: item.address,
          houseId: item.houseId,
          lsCount: item.lsCount,
          totalSum: item.totalSum,
          coords: [item.lat, item.lon],
          displayName: `${item.address} (${item.lsCount} ЛС)`
        };
      }).sort(function(a, b) {
        return b.lsCount - a.lsCount;
      });
    }
    
    // Экранирование HTML (локальная функция)
    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
    
    // Форматирование суммы
    function formatSum(sum) {
      if (sum >= 1000000) return (sum / 1000000).toFixed(1) + ' млн';
      if (sum >= 1000) return (sum / 1000).toFixed(0) + ' тыс';
      return sum.toLocaleString('ru-RU');
    }
    
    // Функция для получения цвета метки на основе количества ЛС
    function getPresetByLsCount(lsCount) {
      if (lsCount >= 100) return 'islands#redIcon';
      if (lsCount >= 50) return 'islands#orangeIcon';
      if (lsCount >= 20) return 'islands#yellowIcon';
      if (lsCount >= 10) return 'islands#greenIcon';
      if (lsCount >= 5) return 'islands#blueIcon';
      return 'islands#grayIcon';
    }
    
let mapRetryCount = 0;
const MAP_RETRY_LIMIT = 40;

function initMap() {
  if (typeof ymaps === 'undefined') {
    mapRetryCount++;
    if (mapRetryCount >= MAP_RETRY_LIMIT) {
      console.warn('Яндекс.Карты недоступны (нет связи с CDN)');
      if (createdElements.mapContainer) {
        createdElements.mapContainer.html(
          '<div style="position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);text-align:center;color:#666;font-size:15px;padding:20px;">' +
          '<div style="font-size:28px;margin-bottom:10px;">Карта недоступна</div>' +
          'Нет связи с Яндекс.Картами.<br>' +
          '<span style="font-size:12px;color:#999;">Проверьте доступ в интернет и обновите страницу</span>' +
          '</div>'
        );
      }
      return;
    }
    console.log('Ожидание загрузки Яндекс.Карт...');
    setTimeout(initMap, 500);
    return;
  }
  
  console.log('Яндекс.Карты загружены');
  
  ymaps.ready(function() {
    console.log('Создание карты...');
    
    // Центр Мурманской области
    var center = [69.4, 32.4];
    
    if (aggregatedData.length > 0) {
      center = [aggregatedData[0].lat, aggregatedData[0].lon];
      console.log('Центр карты:', center);
    }
    
    mapInstance = new ymaps.Map($mapContainer[0], {
      center: center,
      zoom: 11,
      controls: ['zoomControl', 'fullscreenControl']
    });
    
    // Монохромный режим
    $mapContainer.css({
      filter: 'grayscale(100%)',
      '-webkit-filter': 'grayscale(100%)'
    });
    
    // СОЗДАЁМ КЛАСТЕРИЗАТОР
    var clusterer = new ymaps.Clusterer({
      // Настройки кластеров
      preset: 'islands#invertedBlueClusterIcons',
      groupByCoordinates: false,
      clusterDisableClickZoom: false,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false,
      
      // Размер сетки для кластеризации (чем меньше, тем больше кластеров)
      gridSize: 64,
      
      // Минимальное количество меток для кластеризации
      minClusterSize: 3,
      
      // Настройки внешнего вида кластера
      clusterIconLayout: 'default#pieChart',
      clusterIconPieChartRadius: 28,
      clusterIconPieChartStrokeWidth: 2,
      clusterIconPieChartStrokeStyle: '#ffffff',
      clusterIconPieChartCaptionMargin: 10,
      clusterIconPieChartCaptionSize: 14,
      clusterIconPieChartCaptionWeight: 'bold',
      
      // Настройки отдельных меток в кластере
      clusterCaption: '[count] объектов',
      balloonMaxWidth: 350
    });
    
    // Создаём массив меток
    var placemarks = [];
    
    aggregatedData.forEach(function(house) {
      if (house.lat && house.lon && !isNaN(house.lat) && !isNaN(house.lon)) {
        
        // Принудительное исправление координат
        let finalLat = house.lat;
        let finalLon = house.lon;
        
        if (finalLat < 50 && finalLon > 50) {
          const temp = finalLat;
          finalLat = finalLon;
          finalLon = temp;
        }
        
        var preset = getPresetByLsCount(house.lsCount);
        
        // Создаём метку
        var placemark = new ymaps.Placemark(
          [finalLat, finalLon],
          {
            balloonContentHeader: `<b>${escapeHtml(house.address)}</b>`,
            balloonContentBody: `
              <table style="width: 100%;">
                <tr><td style="padding: 4px 0;"><strong>ID дома:</strong></td>
                <td>${escapeHtml(String(house.houseId))}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>Количество ЛС:</strong></td>
                <td>${house.lsCount}</td></tr>
                <tr><td style="padding: 4px 0;"><strong>Общая сумма:</strong></td>
                <td>${house.totalSum.toLocaleString('ru-RU')} руб.</td></tr>
              </table>
            `,
            hintContent: `${house.address}\nЛС: ${house.lsCount} | Сумма: ${formatSum(house.totalSum)} руб.`
          },
          {
            preset: preset,
            iconCaption: String(house.lsCount),
            balloonMaxWidth: 350
          }
        );
        
        placemarks.push(placemark);
      }
    });
    
    console.log(`Добавляем ${placemarks.length} меток в кластеризатор`);
    
    if (placemarks.length === 0) {
      $mapContainer.html('<div style="padding: 20px;">Нет данных для отображения</div>');
      return;
    }
    
    // Добавляем метки в кластеризатор
    clusterer.add(placemarks);
    
    // Добавляем кластеризатор на карту
    mapInstance.geoObjects.add(clusterer);
    
    // Сохраняем ссылку для фильтрации
    objectManager = clusterer; // для совместимости с существующим кодом
    
    // Масштабирование по границам
    try {
      var bounds = clusterer.getBounds();
      if (bounds) {
        mapInstance.setBounds(bounds, { checkZoomRange: true, zoomMargin: 50 });
        console.log('Границы кластеров:', bounds);
      }
    } catch(e) {
      console.warn('Ошибка установки границ:', e);
    }
    
    console.log('Карта создана с кластеризацией (ymaps.Clusterer)');
  });
}
    
    initMap();
    
    // Функция для полного удаления элементов карты
    const cleanup = () => {
      console.log('Полное удаление элементов карты');
      
      if (objectManager && mapInstance) {
        mapInstance.geoObjects.remove(objectManager);
        objectManager = null;
      }
      
      if (mapInstance) {
        mapInstance.destroy();
        mapInstance = null;
      }
      
      if (createdElements.panelWrapper) {
        createdElements.panelWrapper.remove();
        createdElements.panelWrapper = null;
      }
      
      if (createdElements.buttonWrapper) {
        createdElements.buttonWrapper.remove();
        createdElements.buttonWrapper = null;
      }
      
      if (createdElements.mapContainer) {
        createdElements.mapContainer.css('display', 'none');
      }
    };
    
    const show = () => {
      if (createdElements.mapContainer) {
        createdElements.mapContainer.css('display', 'block');
      }
      if (!mapInstance) {
        initMap();
      }
    };
    
    console.log('✅ Карта создана');
    return { 
      map: mapInstance, 
      drawer: drawer,
      objectManager: objectManager,
      cleanup: cleanup,
      show: show
    };
  }
  
  static aggregateByHouse(dataSource) {
    const housesMap = new Map();
    
    console.log('=== АГРЕГАЦИЯ ДАННЫХ ===');
    console.log('Всего записей:', dataSource.length);
    
    for (const item of dataSource) {
      // ВАШИ ПОЛЯ ИЗ SQL
      const houseId = item['Дом'];           // ID дома
      const address = item['Адрес'];         // Адрес
      const latRaw = item['geo_lat'];        // Широта из SQL
      const lonRaw = item['geo_lon'];        // Долгота из SQL
      const sum = parseFloat(item['Сумма'] || 0);
      
      // Парсим координаты
      let lat = parseFloat(latRaw);
      let lon = parseFloat(lonRaw);
      
      if (isNaN(lat) || isNaN(lon)) {
        console.warn(`Некорректные координаты для ${address}: lat=${latRaw}, lon=${lonRaw}`);
        continue;
      }
      
      // Ключ для группировки по дому
      const key = houseId ? String(houseId) : address;
      
      if (!housesMap.has(key)) {
        housesMap.set(key, {
          houseId: houseId || key,
          address: address || `Дом ${key}`,
          lat: lat,
          lon: lon,
          lsCount: 0,
          totalSum: 0
        });
      }
      
      const house = housesMap.get(key);
      house.lsCount++;
      house.totalSum += sum;
    }
    
    // Преобразуем в массив
    let result = Array.from(housesMap.values());
    
    // Принудительно исправляем координаты, если они перепутаны
    result.forEach(house => {
      // Широта Мурманской области: 66-71, долгота: 28-42
      // Если значения перепутаны - меняем
      if (house.lat >= 28 && house.lat <= 42 && house.lon >= 66 && house.lon <= 71) {
        console.log(`🔧 Исправление перепутанных координат для ${house.address}`);
        const temp = house.lat;
        house.lat = house.lon;
        house.lon = temp;
      }
    });
    
    // Фильтруем только дома с корректными координатами
    result = result.filter(house => {
      const isValid = house.lat >= 66 && house.lat <= 71 && 
                      house.lon >= 28 && house.lon <= 42;
      if (!isValid) {
        console.warn(`Координаты вне Мурманской области: ${house.address}, lat=${house.lat}, lon=${house.lon}`);
      }
      return isValid;
    });
    
    // Сортируем по количеству ЛС
    result.sort((a, b) => b.lsCount - a.lsCount);
    
    console.log(`=== РЕЗУЛЬТАТ ===`);
    console.log(`Найдено домов: ${result.length}`);
    result.slice(0, 5).forEach((h, i) => {
      console.log(`${i+1}. ${h.address}: lat=${h.lat}, lon=${h.lon}, ЛС=${h.lsCount}, сумма=${h.totalSum.toLocaleString('ru-RU')} руб.`);
    });
    
    return result;
  }
}