// 3D Reports Module - использует глобальные библиотеки из CDN

class Reports3D {
    constructor(containerId) {
        this.containerId = containerId;
        this.container = null;
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.controls = null;
        this.objects = [];
        this.targets = { helix: [], grid: [] };
        this.zoomedIndex = null;
        this.isZoomed = false;
        this.currentMode = 'helix';
        this.animationFrameId = null;
        this.savedCameraPos = null;
        this.savedTarget = null;
        this.initialized = false;
        
        // Список отчетов
        this.reportsList = [
            ['КТР_Свод', 'КТР сводный отчет за период', 'БД, ПериодМесяцы', 1, 1, 'КТР'],
            ['КТР_ЛС', 'КТР по ЛС за период', 'БД, ПериодМесяцы', 2, 1, 'КТР'],
            ['КТР_2025', 'КТР за год 2025 (ЛС)', 'БД', 3, 1, 'КТР'],
            ['КТР_Объем', 'КТР 2025 Объемы', 'БД', 4, 1, 'КТР'],
            ['ФЛ_Оплаты', 'ФЛ Оплаты подробно', 'БД, Период', 5, 1, 'КТР'],
            ['ОСВ', 'ОСВ', 'БД, РасчетныйМесяц, УК', 1, 2, 'ОРН'],
            ['ОСВ_Мурманск', 'ОСВ (ГОУП "Мурманскводоканал")', 'БД, РасчетныйМесяц', 2, 2, 'ОРН'],
            ['Анализ_ЭЭ', 'Анализ ЭЭ ОИ', 'БД, РасчетныйМесяц', 3, 2, 'ОРН'],
            ['ОСВ_ЮЛ', 'ОСВ (Договор ЮЛ)', 'БД, РасчетныйМесяц, УК', 4, 2, 'ОРН'],
            ['Платежи', 'Платежи с Адресами', 'БД, РасчетныйМесяц, УКП, ПериодДни', 5, 2, 'ОРН'],
            ['ОСВ_Новый', 'ОСВ (Новый)', 'БД_ЮЛ, РасчетныйМесяц', 1, 3, 'ЮЛ'],
            ['997_Оплата', '997 Оплата промежуточных счетов', 'БД_ЮЛ, РасчетныйМесяц', 2, 3, 'ЮЛ'],
            ['Аналитика', 'Сводная аналитика', 'Все фильтры', 3, 3, 'Доп'],
            ['KPIs', 'Ключевые показатели', 'Дашборд', 4, 3, 'Доп'],
            ['Прогноз', 'Прогнозные показатели', 'ML модель', 5, 3, 'Доп'],
            ['Риски', 'Анализ рисков', 'Оценка', 1, 4, 'Доп'],
            ['Бюджет', 'Бюджетирование', 'План/факт', 2, 4, 'Доп'],
            ['Инвентаризация', 'Складской учет', 'Остатки', 3, 4, 'Доп']
        ];
        
        this.modeSettings = {
            helix: {
                pos: null,
                target: null,
                targets: null,
                maxPolarAngle: Math.PI / 2.3,
                minPolarAngle: 0.1,
                maxAzimuthAngle: Infinity,
                minAzimuthAngle: -Infinity
            },
            grid: {
                pos: null,
                target: null,
                targets: null,
                maxPolarAngle: Math.PI / 2.2,
                minPolarAngle: 0,
                maxAzimuthAngle: Math.PI / 2,
                minAzimuthAngle: -Math.PI / 2
            }
        };
        
        this.categoryColors = {
            'КТР': 'rgba(255,107,107,', 'ОРН': 'rgba(78,205,196,',
            'ЮЛ': 'rgba(150,206,180,', 'Доп': 'rgba(200,150,255,'
        };
        
        // Привязываем методы
        this.init = this.init.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.zoomToReportCenter = this.zoomToReportCenter.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.animate = this.animate.bind(this);
    }
    
    saveCurrentMode(mode) {
        localStorage.setItem('reportsMode', mode);
    }
    
    getSavedMode() {
        const saved = localStorage.getItem('reportsMode');
        return (saved === 'helix' || saved === 'grid') ? saved : 'helix';
    }
    
    clearSavedMode() {
        localStorage.removeItem('reportsMode');
    }
    
    createReportCard(report, index) {
        const element = document.createElement('div');
        element.className = 'element';
        const bgColor = this.categoryColors[report[5]] || 'rgba(0,127,127,';
        element.style.backgroundColor = bgColor + (Math.random() * 0.5 + 0.25) + ')';
        
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = index + 1;
        element.appendChild(number);
        
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.textContent = report[5];
        element.appendChild(categoryDiv);
        
        const symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = report[0];
        element.appendChild(symbol);
        
        const details = document.createElement('div');
        details.className = 'details';
        let displayText = report[1];
        if (displayText.length > 32) displayText = displayText.substring(0, 29) + '...';
        details.innerHTML = displayText + '<br><span style="font-size:8px; opacity:0.7;">' + report[2] + '</span>';
        element.appendChild(details);
        
        return element;
    }
    
    init() {
        if (this.initialized) return;
        
        // Проверяем наличие глобальных библиотек
        if (typeof THREE === 'undefined') {
            console.error('THREE not loaded, waiting...');
            setTimeout(() => this.init(), 200);
            return;
        }
        if (typeof TWEEN === 'undefined') {
            console.error('TWEEN not loaded, waiting...');
            setTimeout(() => this.init(), 200);
            return;
        }
        if (typeof CSS3DRenderer === 'undefined') {
            console.error('CSS3DRenderer not loaded, waiting...');
            setTimeout(() => this.init(), 200);
            return;
        }
        
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error('Container not found:', this.containerId);
            return;
        }
        
        // Очищаем контейнер
        this.container.innerHTML = '';
        this.container.style.position = 'relative';
        this.container.style.width = '100%';
        this.container.style.height = '450px';
        this.container.style.background = 'linear-gradient(135deg, #0a0a2a 0%, #1a1a4a 100%)';
        this.container.style.borderRadius = '16px';
        this.container.style.overflow = 'hidden';
        this.container.style.marginBottom = '20px';
        this.container.style.border = '1px solid rgba(0,255,255,0.3)';
        
        // Добавляем информационные панели
        this.addInfoPanels();
        
        // Инициализируем 3D сцену
        this.init3D();
        
        // Запускаем анимацию
        this.animate();
        this.initialized = true;
        console.log('3D Reports initialized successfully');
    }
    
    addInfoPanels() {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'three-d-info';
        infoDiv.innerHTML = '📊 3D Система отчетов | КТР / ОРН / ЮЛ';
        infoDiv.style.cssText = `
            position: absolute;
            top: 12px;
            left: 16px;
            z-index: 15;
            color: #0ff;
            background: rgba(0,0,0,0.6);
            padding: 6px 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            pointer-events: none;
            backdrop-filter: blur(5px);
            border-left: 2px solid #0ff;
        `;
        this.container.appendChild(infoDiv);
        
        const helpDiv = document.createElement('div');
        helpDiv.className = 'three-d-help';
        helpDiv.innerHTML = '🖱️ ЛКМ - выбрать отчет | 🖱️ СРЕДНЯЯ КНОПКА - смена режима | 🖱️ ПКМ - панорама';
        helpDiv.style.cssText = `
            position: absolute;
            bottom: 12px;
            right: 16px;
            z-index: 15;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(8px);
            padding: 5px 12px;
            border-radius: 20px;
            font-family: monospace;
            font-size: 10px;
            color: #8ff;
            pointer-events: none;
        `;
        this.container.appendChild(helpDiv);
        
        this.statusDiv = document.createElement('div');
        this.statusDiv.className = 'three-d-status';
        this.statusDiv.style.cssText = `
            position: absolute;
            bottom: 50px;
            right: 16px;
            z-index: 15;
            background: rgba(0,0,0,0.7);
            backdrop-filter: blur(8px);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 10px;
            color: #ffaa44;
            font-family: monospace;
            pointer-events: none;
            border: 1px solid #ffaa44;
            display: none;
        `;
        this.container.appendChild(this.statusDiv);
    }
    
    init3D() {
        const savedMode = this.getSavedMode();
        this.currentMode = savedMode;
        this.clearSavedMode();
        
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        // Создаем камеру
        this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
        this.scene = new THREE.Scene();
        
        // Настройки позиций
        this.modeSettings.helix.pos = new THREE.Vector3(0, 100, 1200);
        this.modeSettings.helix.target = new THREE.Vector3(0, 50, 0);
        this.modeSettings.grid.pos = new THREE.Vector3(0, 200, 1400);
        this.modeSettings.grid.target = new THREE.Vector3(0, 0, 0);
        
        // Создаем карточки
        for (let i = 0; i < this.reportsList.length; i++) {
            const report = this.reportsList[i];
            const element = this.createReportCard(report, i);
            
            const cssObj = new CSS3DObject(element);
            cssObj.position.set(Math.random() * 2000 - 1000, Math.random() * 1000 - 500, Math.random() * 1500 - 750);
            
            const self = this;
            const idx = i;
            element.addEventListener('click', function(e) {
                e.stopPropagation();
                if (self.isZoomed && self.zoomedIndex === idx) {
                    location.reload();
                } else if (!self.isZoomed) {
                    self.zoomToReportCenter(idx);
                }
            });
            
            this.scene.add(cssObj);
            this.objects.push(cssObj);
        }
        
        // Настройка позиций для режимов
        this.setupTargets();
        
        // Создание рендерера
        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(width, height);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0px';
        this.renderer.domElement.style.left = '0px';
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        this.container.appendChild(this.renderer.domElement);
        
        // Контролы
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = true;
        this.controls.zoomSpeed = 0.8;
        this.controls.rotateSpeed = 0.8;
        this.controls.enablePan = true;
        this.controls.panSpeed = 0.6;
        this.controls.maxDistance = 2000;
        this.controls.minDistance = 200;
        
        // Обработчик средней кнопки
        this.renderer.domElement.addEventListener('auxclick', (e) => {
            e.preventDefault();
            this.switchMode();
        });
        
        // Запуск режима
        const settings = this.modeSettings[this.currentMode];
        this.controls.maxPolarAngle = settings.maxPolarAngle;
        this.controls.minPolarAngle = settings.minPolarAngle;
        this.controls.maxAzimuthAngle = settings.maxAzimuthAngle;
        this.controls.minAzimuthAngle = settings.minAzimuthAngle;
        this.camera.position.copy(settings.pos);
        this.controls.target.copy(settings.target);
        this.controls.update();
        
        this.transform(settings.targets, 1000);
        
        window.addEventListener('resize', this.onWindowResize);
    }
    
    setupTargets() {
        // Спираль
        for (let i = 0, l = this.objects.length; i < l; i++) {
            const t = i / (l - 1);
            const angle = t * Math.PI * 2 * 2.2;
            const radius = 550;
            const y = -50 + t * 300;
            const obj = new THREE.Object3D();
            obj.position.set(radius * Math.cos(angle), y, radius * Math.sin(angle));
            const lookVec = new THREE.Vector3(obj.position.x * 2, obj.position.y, obj.position.z * 2);
            obj.lookAt(lookVec);
            this.targets.helix.push(obj);
        }
        
        // Сетка
        const cols = 4, rows = Math.ceil(this.objects.length / cols);
        const spacingX = 200, spacingZ = 200;
        const startX = -(cols - 1) * spacingX / 2;
        const startZ = -(rows - 1) * spacingZ / 2;
        for (let i = 0; i < this.objects.length; i++) {
            const row = Math.floor(i / cols), col = i % cols;
            const obj = new THREE.Object3D();
            obj.position.set(startX + col * spacingX, 0, startZ + row * spacingZ);
            this.targets.grid.push(obj);
        }
        
        this.modeSettings.helix.targets = this.targets.helix;
        this.modeSettings.grid.targets = this.targets.grid;
    }
    
    switchMode() {
        if (this.isZoomed) {
            location.reload();
            return;
        }
        const newMode = this.currentMode === 'helix' ? 'grid' : 'helix';
        this.currentMode = newMode;
        const settings = this.modeSettings[this.currentMode];
        
        this.controls.maxPolarAngle = settings.maxPolarAngle;
        this.controls.minPolarAngle = settings.minPolarAngle;
        this.controls.maxAzimuthAngle = settings.maxAzimuthAngle;
        this.controls.minAzimuthAngle = settings.minAzimuthAngle;
        
        this.camera.position.copy(settings.pos);
        this.controls.target.copy(settings.target);
        this.controls.update();
        this.controls.enabled = true;
        
        this.transform(settings.targets, 1000);
    }
    
    transform(targetArray, duration) {
        TWEEN.removeAll();
        for (let i = 0; i < this.objects.length; i++) {
            const obj = this.objects[i], target = targetArray[i];
            new TWEEN.Tween(obj.position)
                .to({ x: target.position.x, y: target.position.y, z: target.position.z }, duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            new TWEEN.Tween(obj.rotation)
                .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
        }
    }
    
    zoomToReportCenter(index) {
        if (this.isZoomed) return;
        
        this.zoomedIndex = index;
        const targetObj = this.objects[index];
        const report = this.reportsList[index];
        
        this.savedCameraPos = this.camera.position.clone();
        this.savedTarget = this.controls.target.clone();
        
        const worldPos = targetObj.position.clone();
        const newTarget = worldPos.clone();
        const newCamPos = new THREE.Vector3(worldPos.x, worldPos.y, worldPos.z + 350);
        
        new TWEEN.Tween(this.camera.position)
            .to({ x: newCamPos.x, y: newCamPos.y, z: newCamPos.z }, 500)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
        
        new TWEEN.Tween(this.controls.target)
            .to({ x: newTarget.x, y: newTarget.y, z: newTarget.z }, 500)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
        
        let targetRotY = 0;
        if (this.currentMode === 'grid') {
            targetRotY = Math.PI;
        }
        
        new TWEEN.Tween(targetObj.rotation)
            .to({ x: 0, y: targetRotY, z: 0 }, 500)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start();
        
        // Изменение содержимого карточки
        this.expandCard(targetObj.element, index, report);
        
        for (let i = 0; i < this.objects.length; i++) {
            const otherCard = this.objects[i].element;
            if (i === index) {
                otherCard.style.border = '3px solid #0ff';
                otherCard.style.boxShadow = '0 0 60px rgba(0,255,255,0.9)';
            } else {
                otherCard.style.opacity = '0.15';
                otherCard.style.pointerEvents = 'none';
                otherCard.style.filter = 'blur(3px)';
            }
        }
        
        this.isZoomed = true;
        if (this.statusDiv) {
            this.statusDiv.style.display = 'block';
            this.statusDiv.innerHTML = `🔍 Просмотр: ${report[1].substring(0, 30)} | кликните по карточке для возврата`;
        }
    }
    
    expandCard(card, index, reportData) {
        card.innerHTML = '';
        card.style.width = '260px';
        card.style.height = '340px';
        card.style.background = `linear-gradient(135deg, ${this.categoryColors[reportData[5]] || 'rgba(0,127,127,'}dd, rgba(15,25,45,0.98))`;
        card.style.borderRadius = '20px';
        card.style.padding = '18px';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';
        
        const headerDiv = document.createElement('div');
        headerDiv.style.display = 'flex';
        headerDiv.style.justifyContent = 'space-between';
        headerDiv.style.marginBottom = '12px';
        headerDiv.style.fontSize = '11px';
        headerDiv.innerHTML = `
            <span style="background: rgba(0,0,0,0.5); padding: 4px 10px; border-radius: 20px;">${reportData[5]} / №${index + 1}</span>
            <span style="background: rgba(0,0,0,0.5); padding: 4px 8px; border-radius: 20px;">📊</span>
        `;
        card.appendChild(headerDiv);
        
        const titleDiv = document.createElement('div');
        titleDiv.style.fontSize = '17px';
        titleDiv.style.fontWeight = 'bold';
        titleDiv.style.marginBottom = '12px';
        titleDiv.style.textAlign = 'center';
        titleDiv.textContent = reportData[1];
        card.appendChild(titleDiv);
        
        const filtersDiv = document.createElement('div');
        filtersDiv.style.background = 'rgba(0,0,0,0.4)';
        filtersDiv.style.borderRadius = '12px';
        filtersDiv.style.padding = '10px';
        filtersDiv.style.marginBottom = '12px';
        filtersDiv.style.fontSize = '10px';
        filtersDiv.innerHTML = `
            <div style="margin-bottom: 5px;"><strong>📋 Фильтры:</strong></div>
            <div>${reportData[2]}</div>
        `;
        card.appendChild(filtersDiv);
        
        const btnDiv = document.createElement('div');
        btnDiv.style.textAlign = 'center';
        const submitBtn = document.createElement('button');
        submitBtn.textContent = '📊 СФОРМИРОВАТЬ';
        submitBtn.style.background = 'linear-gradient(135deg, #0ff, #0a8)';
        submitBtn.style.border = 'none';
        submitBtn.style.color = '#000';
        submitBtn.style.fontWeight = 'bold';
        submitBtn.style.fontSize = '13px';
        submitBtn.style.padding = '8px 16px';
        submitBtn.style.borderRadius = '30px';
        submitBtn.style.cursor = 'pointer';
        submitBtn.style.width = '100%';
        submitBtn.onclick = (e) => {
            e.stopPropagation();
            alert(`Формирование отчета: ${reportData[1]}\nФильтры: ${reportData[2]}`);
        };
        btnDiv.appendChild(submitBtn);
        card.appendChild(btnDiv);
    }
    
    onWindowResize() {
        if (!this.container) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        if (this.camera) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
        }
        if (this.renderer) {
            this.renderer.setSize(width, height);
        }
    }
    
    animate() {
        this.animationFrameId = requestAnimationFrame(this.animate);
        if (typeof TWEEN !== 'undefined') {
            TWEEN.update();
        }
        if (this.controls) {
            this.controls.update();
        }
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Делаем класс глобальным
window.Reports3D = Reports3D;