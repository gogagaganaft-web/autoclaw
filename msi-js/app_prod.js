// app.js - главный файл приложения
import { ReportEditorPopup } from './module/ReportEditorPopup.js';
import { DynamicToolbarBuilder } from './module/DynamicToolbarBuilder.js';
import { FondTreeList } from './module/FondTreeList.js';
import { FullTreeList } from './module/FullTreeList.js';
import { ReportRenderer } from './module/ReportRenderer.js';
import { MapRenderer } from './module/MapRenderer.js';
import { runDbHealth } from './module/DbHealth.js';
import { initUserViewStore, getUserViewStore } from './module/UserViewStore.js';
// ========== ГЛОБАЛЬНЫЕ НАСТРОЙКИ ==========
const TREE_ROOT_VALUE = 0;
const IS_PRODUCTION = window.location.hostname === 'sp.kaesbt.ru';
let editingMode = localStorage.getItem('report_editor_mode') === '1';
const IS_EDITOR_ALLOWED = (typeof window.isEditorAllowed === 'function')? window.isEditorAllowed():!IS_PRODUCTION;
const API_EXECUTE = 'https://sp.kaesbt.ru:7501';
const API_REPORT  = 'https://sp.kaesbt.ru:7502';
const API_PRELOAD = 'https://sp.kaesbt.ru:7503';
const API_REPORT_MULTI = 'https://sp.kaesbt.ru:7504';
const FETCH_SERVER_EXECUTE = API_EXECUTE + '/api/execute';
const FETCH_SERVER_EXECUTE_MULTI = API_EXECUTE + '/api/execute-multi';
const FETCH_SERVER_SAVE_FILE = API_EXECUTE + '/api/save-file';
const FETCH_SERVER_LOAD_FILE = API_EXECUTE + '/api/load-file';
const FETCH_SERVER_EXEC_SELECT = API_EXECUTE + '/api/exec-select';
const FETCH_SERVER_PRELOAD = API_PRELOAD + '/api/execute';
const REQUEST_TIMEOUT = 3600000;
// ─── Рабочие файлы данных (data-каталог, прод) ───
const FRONTEND_DATA_DIR = '/var/www/html/report/data';
window.FRONTEND_DATA_DIR = FRONTEND_DATA_DIR;
const YANDEX_MAP_API_KEY ='b0301318-06c8-4fc5-a2f8-79a917802405';
const REPORT_BUTTON_TEXT = 'СФОРМИРОВАТЬ ОТЧЕТ';
const DRAWER_DDB_LINK_COEFFICIENT = 0.95;
const LOGOUT_URL = '/auth/?logout=yes';
const USER_LOGIN = window.USER_LOGIN || 'user';
const USER_REPORT_FILE = (IS_PRODUCTION ? USER_LOGIN : 'user') + '_rpt.json';
const USER_VIEWS_LOGIN = IS_PRODUCTION ? USER_LOGIN : 'user';
const USER_REPORTS_GROUP_ID = 3000;
window.USER_REPORTS_GROUP_ID = USER_REPORTS_GROUP_ID;
// ==========================================

// Глобальные переменные
let toolbarInstance;
let fondTree;
let currentSelectedReport = null;
let currentToolbarBuilder = null;
window.currentToolbarBuilder = null;
const treeInstances = new Map();
let drillPopup;
let drawer;
let dropDownInstance = null;
let userReportsTreeView = null;
let editBtnGroupInstance = null;
let editorSwitchInstance = null;
let reportsTree = [];
let flatReports = [];
window.currentAbortController = null;

// Поиск группы по ключу на любом уровне вложенности
function findGroupByKey(key, nodes) {
  nodes = nodes || reports;
  for (const node of nodes) {
    if (node.key === key) return node;
    if (node.items) {
      const found = findGroupByKey(key, node.items);
      if (found) return found;
    }
  }
  return null;
}

// Поиск отчёта по id на любом уровне вложенности
function findReportById(id, nodes) {
  nodes = nodes || reports;
  for (const node of nodes) {
    if (node.items) {
      const found = findReportById(id, node.items);
      if (found) return found;
    } else if (node.id === id) {
      return node;
    }
  }
  return null;
}

// Загрузка оверрайдов из localStorage
function loadOverrides() {
  const rptOverride = localStorage.getItem('reportsData_override');
  if (rptOverride) {
    try {
      const overrides = JSON.parse(rptOverride);
      for (const key in overrides) {
        if (overrides.hasOwnProperty(key)) {
          const group = findGroupByKey(key);
          if (group) {
            const item = group.items.find(r => r.id === overrides[key].id);
            if (item) {
              if (overrides[key].query) item.query = overrides[key].query;
              if (overrides[key].filters) item.filters = overrides[key].filters;
              if (overrides[key].fields) item.fields = overrides[key].fields;
            }
          }
        }
      }
    } catch(e) { console.warn('Error loading report overrides', e); }
  }
  const toolbarOverride = localStorage.getItem('toolbarData_override');
  if (toolbarOverride) {
    try {
      const overrides = JSON.parse(toolbarOverride);
      for (const key in overrides) {
        if (overrides.hasOwnProperty(key)) {
          const idx = toolbar.findIndex(t => t.field === key);
          if (idx >= 0) {
            Object.assign(toolbar[idx], overrides[key]);
          }
        }
      }
    } catch(e) { console.warn('Error loading toolbar overrides', e); }
  }
}

// ─── Пользовательские отчёты (user_rpt.json) ───
function removeUserReportsGroup() {
  const idx = reports.findIndex(function(g) { return g.key === 'Дополнительные Отчеты'; });
  if (idx >= 0) reports.splice(idx, 1);
}

function mergeUserReportsGroup(content) {
  let arr = null;
  if (content) {
    try {
      const parsed = JSON.parse(content);
      arr = Array.isArray(parsed) ? parsed : [parsed];
    } catch(e) {
      console.warn('Ошибка разбора пользовательских отчётов:', e);
      arr = null;
    }
  }
  removeUserReportsGroup();
  if (arr && arr.length > 0) {
    reports.push({
      key: 'Дополнительные Отчеты',
      text: 'Дополнительные Отчеты',
      id: USER_REPORTS_GROUP_ID,
      expanded: true,
      items: arr
    });
  }
}

async function loadUserReports() {
  try {
    const resp = await $.ajax({ url: FETCH_SERVER_LOAD_FILE + '?path=' + encodeURIComponent(FRONTEND_DATA_DIR + '/' + USER_REPORT_FILE), method: 'GET', cache: false });
    mergeUserReportsGroup(resp && resp.content ? resp.content : null);
  } catch(e) {
    removeUserReportsGroup();
    console.warn('Пользовательские отчёты не загружены:', e);
  }
}

window.refreshUserReportTree = async function() {
  try {
    const resp = await $.ajax({ url: FETCH_SERVER_LOAD_FILE + '?path=' + encodeURIComponent(FRONTEND_DATA_DIR + '/' + USER_REPORT_FILE), method: 'GET', cache: false });
    mergeUserReportsGroup(resp && resp.content ? resp.content : null);
  } catch(e) {
    removeUserReportsGroup();
    console.warn('Не удалось обновить пользовательские отчёты:', e);
  }
  reportsTree = buildReportsTree();
  flatReports = flattenReports();
  if (toolbarInstance) {
    var items = toolbarInstance.option('items');
    if (items) {
      for (var i = 0; i < items.length; i++) {
        if (items[i] && items[i].widget === 'dxDropDownBox' && items[i].options) {
          items[i].options.dataSource = flatReports;
        }
      }
    }
  }
  if (dropDownInstance) {
    dropDownInstance.option('dataSource', flatReports);
    var curVal = dropDownInstance.option('value');
    if (curVal !== undefined && curVal !== null) {
      var curItem = null;
      for (var i = 0; i < flatReports.length; i++) {
        if (flatReports[i].id === curVal) { curItem = flatReports[i]; break; }
      }
      if (curItem) {
        dropDownInstance.option('displayValue', curItem.hierarchy || curItem.text);
      }
    }
  }
  var treeView = userReportsTreeView;
  if (!treeView && dropDownInstance) {
    var $liveTree = $(dropDownInstance.element()).find('.dx-treeview').first();
    if ($liveTree.length) treeView = $liveTree.dxTreeView('instance');
  }
  if (treeView) {
    treeView.option('dataSource', reportsTree);
  }
};

// Построение дерева отчетов для TreeView (рекурсивно, любая вложенность)
function buildReportsTree(nodes, parentPath) {
  nodes = nodes || reports;
  parentPath = parentPath || '';
  const tree = [];
  nodes.forEach((node, idx) => {
    if (node.items) {
      const path = parentPath ? parentPath + '-' + idx : '' + idx;
      const groupNode = {
        id: 'group-' + path,
        text: node.key,
        expanded: node.expanded !== false,
        isGroup: true,
        items: buildReportsTree(node.items, path)
      };
      if (groupNode.items.length > 0) {
        tree.push(groupNode);
      }
    } else if (node.id && node.visible !== false) {
      tree.push({
        id: node.id,
        text: node.text,
        icon: node.icon || 'chart',
        description: node.description || ''
      });
    }
  });
  return tree;
}

// Инициализация приложения
$(async () => {
    Globalize.locale("ru");
    DevExpress.config({ defaultCurrency: 'RUB' });

    await loadUserReports();

    initUserViewStore({
        login: USER_VIEWS_LOGIN,
        dataDir: FRONTEND_DATA_DIR,
        saveFileUrl: FETCH_SERVER_SAVE_FILE,
        loadFileUrl: FETCH_SERVER_LOAD_FILE
    });
    try {
        await getUserViewStore().ready();
    } catch(e) {
        console.warn('UserViewStore не инициализирован:', e);
    }

    loadOverrides();

    // Фоновая загрузка для фильтров с preload:true (адресное дерево и т.п.)
    if (typeof toolbar !== 'undefined') {
        FullTreeList.preloadAll(toolbar, FETCH_SERVER_PRELOAD);
    }

    $('#loadPanel').dxLoadPanel({
        showIndicator: true,
        showPane: true,
        shading: true,
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Загрузка...',
        position: { my: 'center', at: 'center', of: window }
    });

    initDrillPopup();
    initToolbar();
    initDrawer();

    runDbHealth(API_EXECUTE);

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && window.currentAbortController) {
            window.currentAbortController.abort();
            $('#loadPanel').dxLoadPanel('hide');
            DevExpress.ui.notify('Запрос прерван', 'warning', 3000, { position: "center", direction: "up-push" });
            if (drawer) drawer.show();
        }
    });

    $(window).on('pagehide', function() {
        closeAllReportSessions();
        try { getUserViewStore().flush(); } catch(e) {}
    });
});

function initDrillPopup() {
    drillPopup = $('#drillpopup').dxPopup({
        width: 1200,
        height: 660,
        showCloseButton: true,
        showBorders: true,
        hideOnOutsideClick: true,
        resizeEnabled: true,
        contentTemplate: (contentElement) => {
            return $('<div />')
                .addClass('drill-down')
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
                    paging: { pageSize: 1000 },
                    width: 1120,
                    height: 510,
                    columnChooser: { enabled: true },
                    headerFilter: { search: { enabled: true }, visible: true },
                    filterPanel: { visible: true },
                });
        },
        onShowing: () => {
            const dataGrid = $('.drill-down').dxDataGrid('instance');
            if (dataGrid) { }
        },
        onShown: () => {
            const dataGrid = $('.drill-down').dxDataGrid('instance');
            if (dataGrid) { dataGrid.updateDimensions(); }
        }
    }).dxPopup('instance');
}

// Рекурсивное уплощение дерева отчётов в список {id, text, hierarchy}
function flattenReports(nodes, path) {
  nodes = nodes || reports;
  path = path || [];
  const result = [];
  for (const node of nodes) {
    if (node.items) {
      result.push(...flattenReports(node.items, path.concat(node.key || node.text || '')));
    } else if (node.id) {
      result.push({ id: node.id, text: node.text, hierarchy: path.concat(node.text).join(' \u00BB ') });
    }
  }
  return result;
}

function initToolbar() {
    reportsTree = buildReportsTree();
    flatReports = flattenReports();
    toolbarInstance = $('#toolbar').dxToolbar({
        items: [{
            widget: 'dxButton',
            location: 'before',
            options: {
                icon: 'menu',
                stylingMode: 'text',
                onClick: () => { try { drawer?.toggle(); } catch(e) { console.error('drawer toggle error:', e); } }
            }
        },
        {
            widget: 'dxDropDownBox',
            location: 'before',
            options: {
                width:'37vw',
                dataSource: flatReports,
                placeholder: 'Выберите отчет...',
                displayExpr: function(item) { return item ? (item.hierarchy || item.text) : ''; },
                valueExpr: 'id',
                showClearButton: false,
                contentTemplate: () => {
                    const $treeView = $('<div>').dxTreeView({
                        dataSource: reportsTree,
                        dataStructure: 'tree',
                        displayExpr: 'text',
                        selectByClick: true,
                        selectionMode: 'single',
                        searchEnabled: true,
                        searchMode: 'contains',
                        searchExpr: 'text',
                        onItemRendered: (e) => {
                        },
                        onItemClick: (e) => {
                            const itemData = e.itemData;
                            if (itemData.items) {
                                const nodes = e.component.getNodes();
                                (function findNode(list) {
                                    for (const n of list) {
                                        if (n.itemData === itemData) {
                                            if (n.expanded) {
                                                e.component.collapseItem(itemData);
                                            } else {
                                                e.component.expandItem(itemData);
                                            }
                                            return;
                                        }
                                        if (n.children) findNode(n.children);
                                    }
                                })(nodes);
                            } else if (itemData.id) {
                                const found = findReportById(itemData.id);
                                if (found) {
                                    onReportSelect(found);
                                    if (dropDownInstance) {
                                        dropDownInstance.option('value', found.id);
                                        dropDownInstance.option('displayValue', found.hierarchy || found.text || '');
                                        dropDownInstance.close();
                                    }
                                }
                            }
                        }
                    });
                    userReportsTreeView = $treeView.dxTreeView('instance');
                    return $treeView;
                },
                onInitialized: (e) => {
                    dropDownInstance = e.component;
                    window.dropDownInstance = e.component;
                }
            }
        },
        ...(IS_EDITOR_ALLOWED ? [{
            widget: 'dxButtonGroup',
            location: 'before',
            visible: editingMode,
            editorMode: true,
            options: {
                items: [
                    { tag: 'create', hint: 'Создать Отчет', icon: 'addtableheader' },
                    { tag: 'edit', hint: 'РЕДАКТИРОВАТЬ', icon: 'edit', disabled: true },
                    { tag: 'cancel', hint: 'ОТМЕНА', icon: 'revert', disabled: true },
                    { tag: 'save', hint: 'Сохранить отчет', icon: 'save', disabled: true },
                    { tag: 'delete', hint: 'Удалить Отчет', icon: 'deletetable', disabled: true }
                ],
                stylingMode: 'text',
                selectionMode: 'none',
                onInitialized: (e) => {
                    editBtnGroupInstance = e.component;
                    window.editBtnGroupInstance = e.component;
                },
                onItemClick: (e) => {
                    const tag = e.itemData.tag;
                    if (tag === 'save') {
                        if (currentToolbarBuilder) currentToolbarBuilder._saveEditedReport();
                    } else if (tag === 'create') {
                        if (!currentToolbarBuilder) {
                            currentToolbarBuilder = createToolbarBuilder({
                                id: 0,
                                key: 'new-report',
                                text: '',
                                icon: 'chart',
                                description: '',
                                filters: {},
                                processing: 'client',
                                views: ['grid'],
                                fields: {},
                                query: ''
                            });
                            currentToolbarBuilder.render(false);
                        }
                        currentToolbarBuilder._startCreateSession();
                    } else if (tag === 'edit') {
                        if (currentToolbarBuilder) currentToolbarBuilder._startEditSession();
                    } else if (tag === 'cancel') {
                        if (currentToolbarBuilder) {
                            if (currentToolbarBuilder._sessionMode === 'create' || currentToolbarBuilder._sessionMode === 'edit') {
                                currentToolbarBuilder._cancelEditSession();
                            } else {
                                DevExpress.ui.notify('Нет активного редактирования', 'info', 1500);
                            }
                        }
                    } else if (tag === 'delete') {
                        if (currentToolbarBuilder) currentToolbarBuilder._deleteReport();
                    }
                }
            }
        }] : []),
        ...(IS_EDITOR_ALLOWED ? [{
            widget: 'dxSwitch',
            location: 'after',
            locateInMenu: 'always',
            editorSwitch: true,
            options: {
                value: editingMode,
                hint: 'Режим редактирования',
                onInitialized: (e) => {
                    editorSwitchInstance = e.component;
                    try {
                        var $sw = $(e.element);
                        var $parent = $sw.parent();
                        if ($parent.length && $parent.find('.editor-switch-label').length === 0) {
                            $('<span>', { class: 'editor-switch-label' })
                                .css({ marginLeft: '8px', color: '#ccc', fontSize: '13px' })
                                .text('Редактировать')
                                .appendTo($parent);
                        }
                    } catch (err) {
                        console.error('editor switch label error:', err);
                    }
                },
                onValueChanged: (e) => { setEditorMode(e.value); }
            }
        }] : []),
        {
            widget: 'dxButton',
            location: 'after',
            locateInMenu: 'always',
            options: {
                text: 'Выход',
                icon: 'close',
                stylingMode: 'text',
                hint: 'Выйти из аккаунта',
                onClick: () => {
                    closeAllReportSessions();
                    window.location.href = LOGOUT_URL;
                }
            }
        }],
        overflowMenu: { enabled: true }
    }).dxToolbar('instance');

    window.setEditButtonEnabled = function(enabled) {
        if (editBtnGroupInstance) {
            editBtnGroupInstance.option('items[1].disabled', !enabled);
        }
    };

    window.setEditorMode = setEditorMode;
}

let _applyingEditorMode = false;
function setEditorMode(mode) {
    if (_applyingEditorMode) return;
    _applyingEditorMode = true;
    try {
        mode = !!mode;
        if (mode === editingMode) return;
        editingMode = mode;
        if (IS_EDITOR_ALLOWED) {
            localStorage.setItem('report_editor_mode', editingMode ? '1' : '0');
        }
        var items = toolbarInstance.option('items');
        for (var i = 0; i < items.length; i++) {
            if (!items[i]) continue;
            if (items[i].editorMode) {
                toolbarInstance.option('items[' + i + '].visible', editingMode);
            } else if (items[i].editorSwitch) {
                toolbarInstance.option('items[' + i + '].options.value', editingMode);
            }
        }
        if (editorSwitchInstance) {
            editorSwitchInstance.option('value', editingMode);
        }
        if (currentToolbarBuilder) {
            currentToolbarBuilder.globalSettings.showEditorButton = editingMode;
            if (editingMode) {
                currentToolbarBuilder._setAuxGroupEditState(false);
            } else if (currentToolbarBuilder._sessionMode === 'create' || currentToolbarBuilder._sessionMode === 'edit') {
                currentToolbarBuilder._cancelEditSession();
            }
        }
    } finally {
        _applyingEditorMode = false;
    }
}

function initDrawer() {
    var pw = Math.round(window.innerWidth * 0.4);
    drawer = $('#drawer').dxDrawer({
        opened: false,
        closeOnOutsideClick: false,
        maxSize: pw,
        minSize: 0,
        position: 'left',
        openedStateMode: 'shrink',
        revealMode: 'slide',
        shading: false,
        template: function() {
            return $('<div id="drawer-panel-inner">').css({ height: '100%', overflow: 'auto' });
        }
    }).dxDrawer('instance');
    $(drawer.element()).find('.dx-drawer-panel-content').css({ width: pw + 'px', minWidth: pw + 'px' });
    window.drawer = drawer;
}

function createToolbarBuilder(report) {
    currentToolbarBuilder = new DynamicToolbarBuilder(
        toolbarInstance,
        report,
        toolbar,
        fondTree,
        drillPopup,
        createHierarchicalList,
        drawer,
        {
            rootValue: TREE_ROOT_VALUE,
            showEditorButton: editingMode,
            serverExecuteUrl: FETCH_SERVER_EXECUTE,
            serverExecuteMultiUrl: FETCH_SERVER_EXECUTE_MULTI,
            serverSaveFileUrl: FETCH_SERVER_SAVE_FILE,
            serverLoadFileUrl: FETCH_SERVER_LOAD_FILE,
            serverExecSelectUrl: FETCH_SERVER_EXEC_SELECT,
            apiBaseLarge: API_REPORT,
            apiBasePreload: API_PRELOAD,
            apiBaseMulti: API_REPORT_MULTI,
            reportButtonText: REPORT_BUTTON_TEXT,
            drawerDdbLinkCoefficient: DRAWER_DDB_LINK_COEFFICIENT,
            userReportFile: FRONTEND_DATA_DIR + '/' + USER_REPORT_FILE,
            logoutUrl: LOGOUT_URL,
            requestTimeout: REQUEST_TIMEOUT
        }
    );
    window.currentToolbarBuilder = currentToolbarBuilder;
    return currentToolbarBuilder;
}

function closeAllReportSessions() {
    if (!window.__reportRenderers) return;
    window.__reportRenderers.forEach(function(renderer) {
        if (renderer && typeof renderer.closeReportSessionKeepAlive === 'function') {
            renderer.closeReportSessionKeepAlive();
        }
    });
}
window.closeAllReportSessions = closeAllReportSessions;

function onReportSelect(report) {
    currentSelectedReport = report;
    treeInstances.clear();

    closeAllReportSessions();

    var base = toolbarInstance.option('items').filter(function(it) {
        return !DynamicToolbarBuilder.isTransientToolbarItem(it, REPORT_BUTTON_TEXT);
    });
    toolbarInstance.option('items', base);
    toolbarInstance.option('overflowMenu', { enabled: true });
    createToolbarBuilder(JSON.parse(JSON.stringify(report)));

    currentToolbarBuilder.render(true);

    if (window.setEditButtonEnabled) window.setEditButtonEnabled(true);
    if (currentToolbarBuilder && typeof currentToolbarBuilder._setAuxGroupEditState === 'function') {
        currentToolbarBuilder._setAuxGroupEditState(false);
    }
}

window.onReportSelect = onReportSelect;

function createHierarchicalList(config) {
    const { field, dbName, placeholder = 'Выбрать...', initialValue = [], onChange } = config;

    const containerId = 'tree-container-' + field + '-' + Date.now();
    const $treeContainer = $('<div>').attr('id', containerId).css({ 
        width: '100%', height: '400px', overflow: 'auto'
    });

    let isUpdating = false;
    let treeInstance = null;

    const dropDownInstance = $('<div>').dxDropDownBox({
        placeholder: placeholder,
        width: 650,
        displayExpr: 'name',
        valueExpr: 'id',
        value: initialValue,
        dataSource: [],
        contentTemplate: (e) => {
            treeInstance = new FondTreeList({
                container: $treeContainer,
                rootValue: TREE_ROOT_VALUE,
                dbName: dbName,
                fetchUrl: FETCH_SERVER_EXECUTE,
                dropDownInstance: e.component
            });
            treeInstances.set(field, treeInstance);
            return $treeContainer;
        },
        onValueChanged: (e) => {
            if (isUpdating) return;
            isUpdating = true;
            try {
                const treeInstance = treeInstances.get(field);
                if (treeInstance && treeInstance.treeListInstance) {
                    const currentValue = e.value || [];
                    treeInstance.treeListInstance.deselectAll();
                    if (currentValue.length > 0) {
                        treeInstance.treeListInstance.selectRows(currentValue, false);
                    }
                    const selectedItems = treeInstance.getSelectedItems();
                    e.component.option('dataSource', selectedItems);
                    e.component.option('text', selectedItems.map(function(i) { return i.name; }).join(', ') || placeholder);
                    if (onChange) {
                        onChange(currentValue, selectedItems);
                    }
                }
            } finally {
                isUpdating = false;
            }
        },
        onOpened: (e) => {
            const treeInstance = treeInstances.get(field);
            if (treeInstance && treeInstance.treeListInstance) {
                const currentValue = e.component.option('value') || [];
                treeInstance.treeListInstance.deselectAll();
                if (currentValue.length > 0) {
                    treeInstance.treeListInstance.selectRows(currentValue, false);
                }
                setTimeout(function() { 
                    if (treeInstance.treeListInstance) {
                        treeInstance.treeListInstance.updateDimensions();
                    }
                }, 100);
            }
        }
    }).dxDropDownBox('instance');

    if (initialValue.length > 0) {
        dropDownInstance.option('value', initialValue);
    }

    return dropDownInstance;
}

window.showEditorPopup = function(report) {
    const editor = new ReportEditorPopup(report, {
        saveFileUrl: FETCH_SERVER_SAVE_FILE,
        loadFileUrl: FETCH_SERVER_LOAD_FILE,
        apiBase: API_EXECUTE
    });
    editor.show();
}

export { createHierarchicalList };

