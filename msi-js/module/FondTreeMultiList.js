/* ---------- фикс-корневые узлы для каждого филиала ---------- */
export class FondTreeMultiList {
  /**
   * @param {Object}  cfg
   * @param {string|HTMLElement|jQuery} cfg.container          – контейнер, куда будет смонтирован dxTreeList
   * @param {string[]}                    cfg.dbNames           – массив БД для группировки
   * @param {string}                      cfg.fetchUrl          – URL POST-запроса
   * @param {string}                      cfg.sql               – SQL-текст
   * @param {Function}    [cfg.onSelectionChanged]              – внеш. колбэк (selectedItems)=>{}
   */
  constructor({ container, dbNames, fetchUrl, sql, onSelectionChanged }) {
    this.container          = container;
    this.dbNames            = dbNames;
    this.fetchUrl           = fetchUrl;
    this.sql                = sql;
    this.onSelectionChanged = onSelectionChanged ?? null;

    this.selectedItems      = [];      // [{ id,name,db }]
    this._loadPanel         = null;    // dxLoadPanel instance
    this.dropDownInstance   = null;    // будет присвоен извне при инициализации dxDropDownBox

    this.init();                       // запускаем асинхронную инициализацию
  }

  /* ---------- служебные методы ---------- */

  _showLoading() {
    if (this._loadPanel) { this._loadPanel.show(); return; }
    this._loadPanel = $('<div>')
      .appendTo(this.container)
      .dxLoadPanel({
        shadingColor : 'rgba(0,0,0,0.4)',
        position     : { of: this.container },
        visible      : true,
        showIndicator: true,
        showPane     : true,
        shading      : true,
        width        : 120,
        height       : 90,
        message      : 'Загрузка...'
      }).dxLoadPanel('instance');
  }
  _hideLoading() { this._loadPanel?.hide(); }

  _replaceChildrenWithItems(arr) {
    arr.forEach(o => {
      if (Array.isArray(o.children)) {
        this._replaceChildrenWithItems(o.children);
        o.items = o.children;           // dxTreeList ждёт items
        delete o.children;
      }
    });
  }

  async fetchTreeData() {
    try {
      const { data } = await axios.post(
        this.fetchUrl,
        { dbNames: this.dbNames, sql: this.sql },
        { timeout: 120000 }
      );
      return data.hierarchy ?? [];
    } catch (err) {
      console.error('Ошибка при fetchTreeData:', err);
      return [];
    }
  }

  /* ---------- основная инициализация ---------- */
  async init() {
    this._showLoading();

    /* 1. получаем данные */
    const raw = await this.fetchTreeData();
    this._replaceChildrenWithItems(raw);

    /* 2. группируем по БД */
    const grouped = {};
    raw.forEach(n => (grouped[n._db] = grouped[n._db] || []).push(n));

    /* 3. оборачиваем в фиктивные корни */
    const wrapped = this.dbNames.map(db => ({
      _uniqueId : `${db}_ROOT`,
      _db       : db,
      NODE      : rootDB[db]?.node || db,
      items     : grouped[db] || []
    }));

    /* 4. рендерим dxTreeList */
    $(this.container).dxTreeList({
      dataSource    : wrapped,
      dataStructure : 'tree',
      keyExpr       : '_uniqueId',
      hasItemsExpr  : 'items',
      showBorders   : true,
      selection     : { mode: 'multiple', recursive: true },
      columns       : [
        { dataField: 'NODE', caption: 'АО «Росатом Энергосбыт»' }
      ],
      onSelectionChanged : (e) => {
        /* сохраняем выбранные */
        this.selectedItems = e.selectedRowsData.map(r => ({
          id  : r._uniqueId,
          name: r.NODE,
          db  : r._db
        }));

        /* пробрасываем наружу */
        if (typeof this.onSelectionChanged === 'function') {
          this.onSelectionChanged(this.selectedItems);
        }

        /* Обновляем value в DropDownBox (если он присоединён) */
        this.dropDownInstance?.option('value', this.selectedItems);
      }
    });

    this._hideLoading();
  }

  /* ---------- публичный API ---------- */

  /**
   * Возвращает массив выбранных элементов
   * @returns {{id,name,db}[]}
   */
  getSelectedItems() { return this.selectedItems; }

  /**
   * Снять выделение.  
   * @param {string[]} [keepIds] – id, которые надо оставить выделенными
   */
  clearSelection(keepIds = []) {
    const tree = $(this.container).dxTreeList('instance');
    if (!tree) return;
    tree.clearSelection();
    if (keepIds.length) {
      tree.selectRows(keepIds);
      /* пересоберём selectedItems */
      this.selectedItems = tree.getSelectedRowsData().map(r => ({
        id  : r._uniqueId,
        name: r.NODE,
        db  : r._db
      }));
      this.dropDownInstance?.option('value', this.selectedItems);
    } else {
      this.selectedItems = [];
      this.dropDownInstance?.option('value', []);
    }
  }

  /** Полностью уничтожить TreeList и очистить контейнер */
  destroy() { $(this.container).dxTreeList('dispose').empty(); }
}
