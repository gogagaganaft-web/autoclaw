exports.default = undefined;
var i = require("./58664.js");
var o = T(require("./68374.js"));
var a = T(require("./73349.js"));
var r = T(require("./55994.js"));
var s = T(require("./28109.js"));
var l = require("./95429.js");
var u = require("./20576.js");
var d = require("./58201.js");
var c = require("./35922.js");
var h = require("./13306.js");
var f = require("./95479.js");
var p = require("./6415.js");
var g = T(require("./18859.js"));
var m = T(require("./65810.js"));
var _ = require("./39611.js");
var v = T(require("./93786.js"));
var y = require("./85272.js");
var b = T(require("./87209.js"));
var x = T(require("./41183.js"));
var w = T(require("./2492.js"));
var C = require("./62754.js");
var S = require("./60137.js");
var k = require("./1515.js");
var D = require("./23842.js");
var I = require("./44899.js");
function T(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var E = `dx-treeview-node`;
var O = `${E}-container`;
var A = `${E}-loadindicator`;
var P = `${E}-container-opened`;
var M = `${E}-is-leaf`;
var R = `dx-treeview-item`;
var B = `${R}-with-checkbox`;
var L = `${R}-with-custom-expander-icon`;
var V = `dx-treeview-custom-expander-icon-item-container`;
var F = `${R}-without-checkbox`;
var H = `${R}-data`;
var N = `dx-treeview-toggle-item-visibility`;
var z = `dx-treeview-custom-collapse-icon`;
var j = `dx-treeview-custom-expand-icon`;
var W = `dx-treeview-loadindicator`;
var G = `dx-treeview-loadindicator-wrapper`;
var q = `dx-treeview-toggle-item-visibility-opened`;
var $ = `dx-treeview-select-all-item`;
var U = m.default.inherit({
  _supportedKeys: function (e) {
    var t = this;
    function n(e) {
      var n = (0, o.default)(t.option("focusedElement"));
      if (n.length) {
        e.target = n;
        e.currentTarget = n;
        t._itemClickHandler(e, n.children("." + R));
        if (t._getEventNameByOption(t.option("expandEvent")) === (0, _.addNamespace)(l.name, "dxTreeView_expand")) {
          t._expandEventHandler(e);
        }
      }
    }
    function i(e) {
      e.preventDefault();
      var n = (0, o.default)(t.option("focusedElement"));
      var i = t._getCheckBoxInstance(n);
      if (!i.option("disabled")) {
        var a = i.option("value");
        t._updateItemSelection(!a, n.find("." + R).get(0), true);
      }
    }
    function a(e, t) {
      if (this.option("expandAllEnabled")) {
        t.preventDefault();
        var n = (0, o.default)(this.option("focusedElement"));
        if (n.length) {
          var i = this._getItemData(n.find(`.${R}`));
          this._toggleExpandedNestedItems([i], e);
        }
      }
    }
    return (0, h.extend)(this.callBase(), {
      enter: this._showCheckboxes() ? i : n,
      space: this._showCheckboxes() ? i : n,
      asterisk: a.bind(this, true),
      minus: a.bind(this, false)
    });
  },
  _toggleExpandedNestedItems: function (e, t) {
    if (e) {
      for (var n = 0, i = e.length; n < i; n++) {
        var o = e[n];
        var a = this._dataAdapter.getNodeByItem(o);
        this._toggleExpandedState(a, t);
        this._toggleExpandedNestedItems(o.items, t);
      }
    }
  },
  _getNodeElement: function (e, t) {
    var n = this._encodeString(e.internalFields.key);
    if (t) {
      if (!t.$nodeByKey) {
        t.$nodeByKey = {};
        this.$element().find(`.${E}`).each(function () {
          var e = (0, o.default)(this);
          var n = e.attr("data-item-id");
          t.$nodeByKey[n] = e;
        });
      }
      return t.$nodeByKey[n] || (0, o.default)();
    }
    var i = this.$element().get(0).querySelector(`[data-item-id="${n}"]`);
    return (0, o.default)(i);
  },
  _activeStateUnit: "." + R,
  _widgetClass: function () {
    return "dx-treeview";
  },
  _getDefaultOptions: function () {
    var e = (0, h.extend)(this.callBase(), {
      animationEnabled: true,
      dataStructure: "tree",
      deferRendering: true,
      expandAllEnabled: false,
      hasItemsExpr: "hasItems",
      selectNodesRecursive: true,
      expandNodesRecursive: true,
      showCheckBoxesMode: "none",
      expandIcon: null,
      collapseIcon: null,
      selectAllText: s.default.format("dxList-selectAll"),
      onItemSelectionChanged: null,
      onItemExpanded: null,
      onItemCollapsed: null,
      scrollDirection: "vertical",
      useNativeScrolling: true,
      virtualModeEnabled: false,
      rootValue: 0,
      focusStateEnabled: false,
      selectionMode: "multiple",
      expandEvent: "dblclick",
      selectByClick: false,
      createChildren: null,
      onSelectAllValueChanged: null
    });
    return (0, h.extend)(true, e, {
      integrationOptions: {
        useDeferUpdateForTemplates: false
      }
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return !S.nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }]);
  },
  _initSelectedItems: u.noop,
  _syncSelectionOptions: u.asyncNoop,
  _fireSelectionChanged: function () {
    var e = this._selectionChangePromise;
    (0, C.when)(e).done(function () {
      this._createActionByOption("onSelectionChanged", {
        excludeValidators: ["disabled", "readOnly"]
      })();
    }.bind(this));
  },
  _createSelectAllValueChangedAction: function () {
    this._selectAllValueChangedAction = this._createActionByOption("onSelectAllValueChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _fireSelectAllValueChanged: function (e) {
    this._selectAllValueChangedAction({
      value: e
    });
  },
  _checkBoxModeChange: function (e, t) {
    if (t !== "none" && e !== "none") {
      var n = this._$selectAllItem && this._$selectAllItem.length;
      switch (e) {
        case "selectAll":
          if (!n) {
            this._createSelectAllValueChangedAction();
            this._renderSelectAllItem();
          }
          break;
        case "normal":
          if (n) {
            this._$selectAllItem.remove();
            delete this._$selectAllItem;
          }
      }
    }
  },
  _removeSelection: function () {
    var e = this;
    (0, f.each)(this._dataAdapter.getFullData(), function (t, n) {
      if (e._hasChildren(n)) {
        e._dataAdapter.toggleSelection(n.internalFields.key, false, true);
      }
    });
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    var i = e.previousValue;
    switch (t) {
      case "selectAllText":
        if (this._$selectAllItem) {
          this._$selectAllItem.dxCheckBox("instance").option("text", n);
        }
        break;
      case "showCheckBoxesMode":
        this._checkBoxModeChange(n, i);
        this._invalidate();
        break;
      case "scrollDirection":
        this.getScrollable().option("direction", n);
        break;
      case "useNativeScrolling":
        this.getScrollable().option("useNative", n);
        break;
      case "items":
        delete this._$selectAllItem;
        this.callBase(e);
        break;
      case "dataSource":
        this.callBase(e);
        this._initDataAdapter();
        this._filter = {};
        break;
      case "hasItemsExpr":
        this._initAccessors();
        this.repaint();
        break;
      case "expandEvent":
        this._initExpandEvent();
        break;
      case "deferRendering":
      case "dataStructure":
      case "rootValue":
      case "createChildren":
      case "expandNodesRecursive":
      case "onItemSelectionChanged":
      case "onItemExpanded":
      case "onItemCollapsed":
      case "expandAllEnabled":
      case "animationEnabled":
      case "virtualModeEnabled":
      case "selectByClick":
        break;
      case "selectionMode":
        this._initDataAdapter();
        this.callBase(e);
        break;
      case "onSelectAllValueChanged":
        this._createSelectAllValueChangedAction();
        break;
      case "selectNodesRecursive":
        this._dataAdapter.setOption("recursiveSelection", e.value);
        this.repaint();
        break;
      case "expandIcon":
      case "collapseIcon":
        this.repaint();
        break;
      default:
        this.callBase(e);
    }
  },
  _initDataSource: function () {
    if (this._useCustomChildrenLoader()) {
      this._loadChildrenByCustomLoader(null).done(function (e) {
        if (e && e.length) {
          this.option("items", e);
        }
      }.bind(this));
    } else {
      this.callBase();
      if (this._isVirtualMode()) {
        this._initVirtualMode();
      }
    }
  },
  _initVirtualMode: function () {
    var e = this._filter;
    e.custom ||= this._dataSource.filter();
    e.internal ||= [this.option("parentIdExpr"), this.option("rootValue")];
  },
  _useCustomChildrenLoader: function () {
    return (0, c.isFunction)(this.option("createChildren")) && this._isDataStructurePlain();
  },
  _loadChildrenByCustomLoader: function (e) {
    var t = this.option("createChildren").call(this, e);
    if (Array.isArray(t)) {
      return new C.Deferred().resolve(t).promise();
    } else if (t && (0, c.isFunction)(t.then)) {
      return (0, C.fromPromise)(t);
    } else {
      return new C.Deferred().resolve([]).promise();
    }
  },
  _combineFilter: function () {
    if (this._filter.custom && this._filter.custom.length) {
      return [this._filter.custom, this._filter.internal];
    } else {
      return this._filter.internal;
    }
  },
  _dataSourceLoadErrorHandler: function () {
    this._renderEmptyMessage();
  },
  _init: function () {
    this._filter = {};
    this.callBase();
    this._initStoreChangeHandlers();
  },
  _dataSourceChangedHandler: function (e) {
    var t = this.option("items");
    if (!this._initialized || !this._isVirtualMode() || !t.length) {
      this.option("items", e);
    }
  },
  _removeTreeViewLoadIndicator: function () {
    if (this._treeViewLoadIndicator) {
      this._treeViewLoadIndicator.remove();
      this._treeViewLoadIndicator = null;
    }
  },
  _createTreeViewLoadIndicator: function () {
    this._treeViewLoadIndicator = (0, o.default)("<div>").addClass(W);
    this._createComponent(this._treeViewLoadIndicator, w.default, {});
    return this._treeViewLoadIndicator;
  },
  _dataSourceLoadingChangedHandler: function (e) {
    var t;
    if (this._isVirtualMode()) {
      t = this._combineFilter();
      this._dataSource.filter(t);
    }
    if (e && !this._dataSource.isLoaded()) {
      this.option("items", []);
      var n = (0, o.default)("<div>").addClass(G);
      this._createTreeViewLoadIndicator().appendTo(n);
      this.itemsContainer().append(n);
      if (this._isVirtualMode() && this._dataSource.filter() !== t) {
        this._dataSource.filter([]);
      }
    } else {
      this._removeTreeViewLoadIndicator();
    }
  },
  _initStoreChangeHandlers: function () {
    var e = this;
    if (this.option("dataStructure") === "plain" && this._dataSource) {
      this._dataSource.store().on("inserted", function (t) {
        e.option().items = e.option("items").concat(t);
        e._dataAdapter.addItem(t);
        if (e._dataAdapter.isFiltered(t)) {
          e._updateLevel(e._parentIdGetter(t));
        }
      }).on("removed", function (t) {
        var n = e._dataAdapter.getNodeByKey(t);
        if ((0, c.isDefined)(n)) {
          e.option("items")[e._dataAdapter.getIndexByKey(n.internalFields.key)] = 0;
          e._markChildrenItemsToRemove(n);
          e._removeItems();
          e._dataAdapter.removeItem(t);
          e._updateLevel(e._parentIdGetter(n));
        }
      });
    }
  },
  _markChildrenItemsToRemove: function (e) {
    var t = this;
    var n = e.internalFields.childrenKeys;
    (0, f.each)(n, function (e, n) {
      t.option("items")[t._dataAdapter.getIndexByKey(n)] = 0;
      t._markChildrenItemsToRemove(t._dataAdapter.getNodeByKey(n));
    });
  },
  _removeItems: function () {
    var e = this;
    var t = (0, h.extend)(true, [], this.option("items"));
    var n = 0;
    (0, f.each)(t, function (t, i) {
      if (!i) {
        e.option("items").splice(t - n, 1);
        n++;
      }
    });
  },
  _updateLevel: function (e) {
    var t = this._getContainerByParentKey(e);
    this._renderItems(t, this._dataAdapter.getChildrenNodes(e));
  },
  _getOldContainer: function (e) {
    if (e.length) {
      return e.children(`.${O}`);
    }
    var t = this.getScrollable();
    if (t) {
      return (0, o.default)(t.content()).children();
    } else {
      return (0, o.default)();
    }
  },
  _getContainerByParentKey: function (e) {
    var t = this._dataAdapter.getNodeByKey(e);
    var n = t ? this._getNodeElement(t) : [];
    this._getOldContainer(n).remove();
    var i = this._renderNodeContainer(n);
    if (this._isRootLevel(e)) {
      var a = this.getScrollable();
      if (!a) {
        this._renderScrollableContainer();
      }
      (0, o.default)(a.content()).append(i);
    }
    return i;
  },
  _isRootLevel: function (e) {
    return e === this.option("rootValue");
  },
  _getAccessors: function () {
    var e = this.callBase();
    e.push("hasItems");
    return e;
  },
  _getDataAdapterOptions: function () {
    var e;
    var t;
    var n;
    return {
      rootValue: this.option("rootValue"),
      multipleSelection: !this._isSingleSelection(),
      recursiveSelection: this._isRecursiveSelection(),
      recursiveExpansion: this.option("expandNodesRecursive"),
      selectionRequired: this.option("selectionRequired"),
      dataType: this.option("dataStructure"),
      sort: this._dataSource && this._dataSource.sort(),
      langParams: (e = this._dataSource) === null || e === undefined || (t = e.loadOptions) === null || t === undefined || (n = t.call(e)) === null || n === undefined ? undefined : n.langParams
    };
  },
  _initMarkup: function () {
    this._renderScrollableContainer();
    this._renderEmptyMessage(this._dataAdapter.getRootNodes());
    this.callBase();
    this.setAria("role", "tree");
  },
  _renderContentImpl: function () {
    var e = this._renderNodeContainer();
    (0, o.default)(this.getScrollable().content()).append(e);
    if (this.option("items") && this.option("items").length) {
      this._renderItems(e, this._dataAdapter.getRootNodes());
      this._initExpandEvent();
      if (this._selectAllEnabled()) {
        this._createSelectAllValueChangedAction();
        this._renderSelectAllItem(e);
      }
    }
  },
  _isVirtualMode: function () {
    return this.option("virtualModeEnabled") && this._isDataStructurePlain() && !!this.option("dataSource");
  },
  _isDataStructurePlain: function () {
    return this.option("dataStructure") === "plain";
  },
  _fireContentReadyAction: function () {
    var e = this.getDataSource();
    var t = e && !e.isLoaded() || this._skipContentReadyAndItemExpanded;
    var n = this.getScrollable();
    if (n && (0, d.hasWindow)()) {
      n.update();
    }
    if (!t) {
      this.callBase();
    }
    if (n && (0, d.hasWindow)()) {
      n.update();
    }
  },
  _renderScrollableContainer: function () {
    this._scrollable = this._createComponent((0, o.default)("<div>").appendTo(this.$element()), x.default, {
      useNative: this.option("useNativeScrolling"),
      direction: this.option("scrollDirection"),
      useKeyboard: false
    });
  },
  _renderNodeContainer: function (e) {
    var t = (0, o.default)("<ul>").addClass(O);
    this.setAria("role", "group", t);
    if (e && e.length) {
      var n = this._getItemData(e.children("." + R));
      if (this._expandedGetter(n)) {
        t.addClass(P);
      }
      t.appendTo(e);
    }
    return t;
  },
  _createDOMElement: function (e, t) {
    var n;
    var i;
    var a = (0, o.default)("<li>").addClass(E).attr("data-item-id", this._encodeString(t.internalFields.key)).prependTo(e);
    var r = {
      role: "treeitem",
      label: this._displayGetter(t.internalFields.item) || "",
      level: this._getLevel(e)
    };
    if (t != null && (n = t.internalFields) !== null && n !== undefined && (i = n.childrenKeys) !== null && i !== undefined && !!i.length) {
      r.expanded = t.internalFields.expanded || false;
    }
    this.setAria(r, a);
    return a;
  },
  _getLevel: function (e) {
    var t = e.parent();
    if (t.hasClass("dx-scrollable-content")) {
      return 1;
    } else {
      return parseInt(t.attr("aria-level")) + 1;
    }
  },
  _showCheckboxes: function () {
    return this.option("showCheckBoxesMode") !== "none";
  },
  _hasCustomExpanderIcons: function () {
    return this.option("expandIcon") || this.option("collapseIcon");
  },
  _selectAllEnabled: function () {
    return this.option("showCheckBoxesMode") === "selectAll" && !this._isSingleSelection();
  },
  _renderItems: function (e, t) {
    for (var n = t.length - 1; n >= 0; n--) {
      this._renderItem(n, t[n], e);
    }
    this._renderedItemsCount += t.length;
  },
  _renderItem: function (e, t, n) {
    var i = this._createDOMElement(n, t);
    var o = t.internalFields;
    var a = this._showCheckboxes();
    i.addClass(a ? B : F);
    i.toggleClass("dx-state-invisible", o.item.visible === false);
    if (this._hasCustomExpanderIcons()) {
      i.addClass(L);
      n.addClass(V);
    }
    if (a) {
      this._renderCheckBox(i, t);
    }
    this.setAria("selected", o.selected, i);
    this._toggleSelectedClass(i, o.selected);
    if (o.disabled) {
      this.setAria("disabled", o.disabled, i);
    }
    this.callBase(this._renderedItemsCount + e, o.item, i);
    if (o.item.visible !== false) {
      this._renderChildren(i, t);
    }
  },
  _setAriaSelectionAttribute: u.noop,
  _renderChildren: function (e, t) {
    var n = this;
    if (this._hasChildren(t)) {
      if (this._hasCustomExpanderIcons()) {
        this._renderCustomExpanderIcons(e, t);
      } else {
        this._renderDefaultExpanderIcons(e, t);
      }
      if (!this.option("deferRendering") || !!t.internalFields.expanded) {
        this._loadSublevel(t).done(function (i) {
          n._renderSublevel(e, n._getActualNode(t), i);
        });
      }
    } else {
      this._addLeafClass(e);
    }
  },
  _getActualNode: function (e) {
    return this._dataAdapter.getNodeByKey(e.internalFields.key);
  },
  _hasChildren: function (e) {
    if (this._isVirtualMode() || this._useCustomChildrenLoader()) {
      return this._hasItemsGetter(e.internalFields.item) !== false;
    } else {
      return this.callBase(e);
    }
  },
  _loadSublevel: function (e) {
    var t = this;
    var n = new C.Deferred();
    var i = this._getChildNodes(e);
    if (i.length) {
      n.resolve(i);
    } else {
      this._loadNestedItems(e).done(function (e) {
        n.resolve(t._dataAdapter.getNodesByItems(e));
      });
    }
    return n.promise();
  },
  _renderSublevel: function (e, t, n) {
    var i = this._renderNodeContainer(e, t);
    var o = n.filter(function (e) {
      return t.internalFields.childrenKeys.indexOf(e.internalFields.key) !== -1;
    });
    this._renderItems(i, o);
    if (o.length && !t.internalFields.selected) {
      var a = o[0];
      this._updateParentsState(a, this._getNodeElement(a));
    }
    this._normalizeIconState(e, o.length);
    if (t.internalFields.expanded) {
      i.addClass(P);
    }
  },
  _executeItemRenderAction: function (e, t, n) {
    var i = this._getNode(n);
    this._getItemRenderAction()({
      itemElement: n,
      itemIndex: e,
      itemData: t,
      node: this._dataAdapter.getPublicNode(i)
    });
  },
  _addLeafClass: function (e) {
    e.addClass(M);
  },
  _expandEventHandler: function (e) {
    if (!(0, o.default)(e.currentTarget.parentNode).hasClass(M)) {
      this._toggleExpandedState(e.currentTarget, undefined, e);
    }
  },
  _initExpandEvent: function () {
    var e = this._getEventNameByOption(this.option("expandEvent"));
    var t = this._itemContainer();
    var n = this._itemSelector();
    r.default.off(t, ".dxTreeView_expand", n);
    r.default.on(t, e, n, this._expandEventHandler.bind(this));
  },
  _getEventNameByOption: function (e) {
    var t = e === "click" ? l.name : y.name;
    return (0, _.addNamespace)(t, "dxTreeView_expand");
  },
  _getNode: function (e) {
    if (!(0, c.isDefined)(e)) {
      return null;
    }
    if (e.internalFields) {
      return e;
    }
    if ((0, c.isPrimitive)(e)) {
      return this._dataAdapter.getNodeByKey(e);
    }
    var t = (0, o.default)(e).get(0);
    if (t) {
      if (a.default.isElementNode(t)) {
        return this._getNodeByElement(t);
      } else {
        return this._dataAdapter.getNodeByItem(t);
      }
    } else {
      return null;
    }
  },
  _getNodeByElement: function (e) {
    var t = (0, o.default)(e).closest("." + E);
    var n = this._decodeString(t.attr("data-item-id"));
    return this._dataAdapter.getNodeByKey(n);
  },
  _toggleExpandedState: function (e, t, n) {
    var i = this._getNode(e);
    if (!i) {
      return new C.Deferred().reject().promise();
    }
    if (i.internalFields.disabled) {
      return new C.Deferred().reject().promise();
    }
    var o = i.internalFields.expanded;
    if (o === t) {
      return new C.Deferred().resolve().promise();
    }
    if (this._hasChildren(i)) {
      var a = this._getNodeElement(i);
      if (a.find(`.${A}:not(.dx-state-invisible)`).length) {
        return new C.Deferred().reject().promise();
      }
      if (!o && !this._nodeHasRenderedChildren(a)) {
        this._createLoadIndicator(a);
      }
    }
    if (!(0, c.isDefined)(t)) {
      t = !o;
    }
    this._dataAdapter.toggleExpansion(i.internalFields.key, t);
    return this._updateExpandedItemsUI(i, t, n);
  },
  _nodeHasRenderedChildren: function (e) {
    return e.children(`.${O}`).not(":empty").length;
  },
  _createLoadIndicator: function (e) {
    this._createComponent((0, o.default)("<div>").addClass(A), w.default, {}).$element().appendTo(e);
    e.children(`.${N},.${j}`).hide();
  },
  _renderExpanderIcon: function (e, t, n, i) {
    n.appendTo(e);
    n.addClass(i);
    if (t.internalFields.disabled) {
      n.addClass("dx-state-disabled");
    }
    this._renderToggleItemVisibilityIconClick(n, t);
  },
  _renderDefaultExpanderIcons: function (e, t) {
    var n = (0, o.default)("<div>").addClass(N).appendTo(e);
    if (t.internalFields.expanded) {
      n.addClass(q);
      e.parent().addClass(P);
    }
    if (t.internalFields.disabled) {
      n.addClass("dx-state-disabled");
    }
    this._renderToggleItemVisibilityIconClick(n, t);
  },
  _renderCustomExpanderIcons: function (e, t) {
    var n = this.option();
    var i = n.expandIcon;
    var o = n.collapseIcon;
    var a = (0, I.getImageContainer)(i ?? o);
    var r = (0, I.getImageContainer)(o ?? i);
    this._renderExpanderIcon(e, t, a, j);
    this._renderExpanderIcon(e, t, r, z);
    var s = t.internalFields.expanded;
    if (s) {
      e.parent().addClass(P);
    }
    this._toggleCustomExpanderIcons(a, r, s);
  },
  _renderToggleItemVisibilityIconClick: function (e, t) {
    var n = this;
    var i = (0, _.addNamespace)(l.name, this.NAME);
    r.default.off(e, i);
    r.default.on(e, i, function (e) {
      n._toggleExpandedState(t.internalFields.key, undefined, e);
    });
  },
  _toggleCustomExpanderIcons: function (e, t, n) {
    t.toggle(n);
    e.toggle(!n);
  },
  _updateExpandedItemsUI: function (e, t, n) {
    var i = this._getNodeElement(e);
    var o = !i.length || t && i.is(":hidden");
    if (this.option("expandNodesRecursive") && o) {
      var a = this._getNode(e.internalFields.parentKey);
      if (a) {
        this._updateExpandedItemsUI(a, t, n);
      }
    }
    if (this._hasCustomExpanderIcons()) {
      if (this._nodeHasRenderedChildren(i)) {
        var r = i.children(`.${j}`);
        var s = i.children(`.${z}`);
        this._toggleCustomExpanderIcons(r, s, t);
      }
    } else {
      i.children(`.${N}`).toggleClass(q, t);
    }
    var l = i.children(`.${O}`);
    var u = l.length > 0;
    var d = new C.Deferred();
    if (!t || u && !l.is(":empty")) {
      this._animateNodeContainer(e, t, n, d);
      return d.promise();
    } else if (e.internalFields.childrenKeys.length === 0 && (this._isVirtualMode() || this._useCustomChildrenLoader())) {
      this._loadNestedItemsWithUpdate(e, t, n, d);
      return d.promise();
    } else {
      this._renderSublevel(i, e, this._getChildNodes(e));
      this._fireContentReadyAction();
      this._animateNodeContainer(e, t, n, d);
      return d.promise();
    }
  },
  _loadNestedItemsWithUpdate: function (e, t, n, i) {
    var o = this;
    var a = this._getNodeElement(e);
    this._loadNestedItems(e).done(function (r) {
      var s = o._getActualNode(e);
      o._renderSublevel(a, s, o._dataAdapter.getNodesByItems(r));
      if (r && r.length) {
        o._fireContentReadyAction();
        o._animateNodeContainer(s, t, n, i);
      } else {
        i.resolve();
      }
    });
  },
  _loadNestedItems: function (e) {
    var t = this;
    if (this._useCustomChildrenLoader()) {
      var n = this._dataAdapter.getPublicNode(e);
      return this._loadChildrenByCustomLoader(n).done(function (e) {
        if (!t._areNodesExists(e)) {
          t._appendItems(e);
        }
      });
    }
    if (this._isVirtualMode()) {
      this._filter.internal = [this.option("parentIdExpr"), e.internalFields.key];
      this._dataSource.filter(this._combineFilter());
      return this._dataSource.load().done(function (e) {
        if (!t._areNodesExists(e)) {
          t._appendItems(e);
        }
      });
    } else {
      return new C.Deferred().resolve([]).promise();
    }
  },
  _areNodesExists: function (e, t) {
    var n = this.keyOf(e[0]);
    var i = this._dataAdapter.getFullData();
    return !!this._dataAdapter.getNodeByKey(n, i);
  },
  _appendItems: function (e) {
    this.option().items = this.option("items").concat(e);
    this._initDataAdapter();
  },
  _animateNodeContainer: function (e, t, n, o) {
    var a = this._getNodeElement(e);
    var r = a.children(`.${O}`);
    if (e && o && r.length === 0) {
      o.resolve();
    }
    r.addClass(P);
    var s = (0, i.getHeight)(r);
    b.default.stop(r, true);
    b.default.animate(r, {
      type: "custom",
      duration: this.option("animationEnabled") ? 400 : 0,
      from: {
        maxHeight: t ? 0 : s
      },
      to: {
        maxHeight: t ? s : 0
      },
      complete: function () {
        r.css("maxHeight", "none");
        r.toggleClass(P, t);
        this.setAria("expanded", t, a);
        this.getScrollable().update();
        this._fireExpandedStateUpdatedEvent(t, e, n);
        if (o) {
          o.resolve();
        }
      }.bind(this)
    });
  },
  _fireExpandedStateUpdatedEvent: function (e, t, n) {
    if (this._hasChildren(t) && !this._skipContentReadyAndItemExpanded) {
      var i = e ? "onItemExpanded" : "onItemCollapsed";
      if ((0, c.isDefined)(n)) {
        this._itemDXEventHandler(n, i, {
          node: this._dataAdapter.getPublicNode(t)
        });
      } else {
        var o = this._getNodeElement(t);
        this._itemEventHandler(o, i, {
          event: n,
          node: this._dataAdapter.getPublicNode(t)
        });
      }
    }
  },
  _normalizeIconState: function (e, t) {
    var n;
    var i = e.find(`.${A}`);
    if (i.length) {
      if ((n = w.default.getInstance(i)) !== null && n !== undefined) {
        n.option("visible", false);
      }
    }
    var o = e.children(`.${z},.${N}`);
    if (t) {
      o.show();
    } else {
      o.removeClass(N);
      e.addClass(M);
    }
  },
  _emptyMessageContainer: function () {
    var e = this.getScrollable();
    if (e) {
      return (0, o.default)(e.content());
    } else {
      return this.callBase();
    }
  },
  _renderContent: function () {
    var e = this.option("items");
    if (e && e.length) {
      this._contentAlreadyRendered = true;
    }
    this.callBase();
  },
  _renderSelectAllItem: function (e) {
    e = e || this.$element().find(`.${O}`).first();
    this._$selectAllItem = (0, o.default)("<div>").addClass($);
    var t = this._dataAdapter.isAllSelected();
    this._createComponent(this._$selectAllItem, g.default, {
      value: t,
      elementAttr: {
        "aria-label": "Select All"
      },
      text: this.option("selectAllText"),
      onValueChanged: this._onSelectAllCheckboxValueChanged.bind(this)
    });
    this._toggleSelectedClass(this._$selectAllItem, t);
    e.before(this._$selectAllItem);
  },
  _onSelectAllCheckboxValueChanged: function (e) {
    this._toggleSelectAll(e);
    this._fireSelectAllValueChanged(e.value);
  },
  _toggleSelectAll: function (e) {
    this._dataAdapter.toggleSelectAll(e.value);
    this._updateItemsUI();
    this._fireSelectionChanged();
  },
  _renderCheckBox: function (e, t) {
    var n = (0, o.default)("<div>").appendTo(e);
    this._createComponent(n, g.default, {
      value: t.internalFields.selected,
      onValueChanged: this._changeCheckboxValue.bind(this),
      focusStateEnabled: false,
      elementAttr: {
        "aria-label": "Check State"
      },
      disabled: this._disabledGetter(t)
    });
  },
  _toggleSelectedClass: function (e, t) {
    e.toggleClass("dx-state-selected", !!t);
  },
  _toggleNodeDisabledState: function (e, t) {
    var n = this._getNodeElement(e);
    var i = n.find("." + R).eq(0);
    this._dataAdapter.toggleNodeDisabledState(e.internalFields.key, t);
    i.toggleClass("dx-state-disabled", !!t);
    if (this._showCheckboxes()) {
      this._getCheckBoxInstance(n).option("disabled", !!t);
    }
  },
  _itemOptionChanged: function (e, t, n) {
    var i = this._dataAdapter.getNodeByItem(e);
    if (t === this.option("disabledExpr")) {
      this._toggleNodeDisabledState(i, n);
    }
  },
  _changeCheckboxValue: function (e) {
    var t = (0, o.default)(e.element).parent("." + E).children("." + R);
    var n = this._getItemData(t);
    var i = this._getNodeByElement(t);
    var a = e.value;
    if (!i || i.internalFields.selected !== a) {
      this._updateItemSelection(a, n, e.event);
    }
  },
  _isSingleSelection: function () {
    return this.option("selectionMode") === "single";
  },
  _isRecursiveSelection: function () {
    return this.option("selectNodesRecursive") && this.option("selectionMode") !== "single";
  },
  _isLastSelectedBranch: function (e, t, n) {
    var i = t.indexOf(e.key);
    if (i >= 0) {
      t.splice(i, 1);
    }
    if (n) {
      (0, f.each)(e.children, function (e, n) {
        this._isLastSelectedBranch(n, t, true);
      }.bind(this));
    }
    if (e.parent) {
      this._isLastSelectedBranch(e.parent, t);
    }
    return t.length === 0;
  },
  _isLastRequired: function (e) {
    var t = this.option("selectionRequired");
    var n = this._isSingleSelection();
    var i = this.getSelectedNodeKeys();
    if (t) {
      if (n) {
        return i.length === 1;
      } else {
        return this._isLastSelectedBranch(e.internalFields.publicNode, i.slice(), true);
      }
    }
  },
  _updateItemSelection: function (e, t, n) {
    var i = this;
    var o = this._getNode(t);
    if (!o || o.visible === false) {
      return false;
    }
    if (o.internalFields.selected === e) {
      return true;
    }
    if (!e && this._isLastRequired(o)) {
      if (this._showCheckboxes()) {
        var a = this._getNodeElement(o);
        this._getCheckBoxInstance(a).option("value", true);
      }
      return false;
    }
    if (e && this._isSingleSelection()) {
      var r = this.getSelectedNodeKeys();
      (0, f.each)(r, function (e, t) {
        i._dataAdapter.toggleSelection(t, false);
        i._updateItemsUI();
        i._fireItemSelectionChanged(i._getNode(t));
      });
    }
    this._dataAdapter.toggleSelection(o.internalFields.key, e);
    var s = this._dataAdapter.isAllSelected();
    var l = this._selectAllEnabled() && this._$selectAllItem.dxCheckBox("instance").option("value") !== s;
    this._updateItemsUI();
    this._fireItemSelectionChanged(o, n);
    this._fireSelectionChanged();
    if (l) {
      this._fireSelectAllValueChanged(s);
    }
    return true;
  },
  _fireItemSelectionChanged: function (e, t) {
    var n = t || this._findItemElementByItem(e.internalFields.item);
    (t ? this._itemDXEventHandler : this._itemEventHandler).call(this, n, "onItemSelectionChanged", {
      node: this._dataAdapter.getPublicNode(e),
      itemData: e.internalFields.item
    });
  },
  _getCheckBoxInstance: function (e) {
    return e.children(".dx-checkbox").dxCheckBox("instance");
  },
  _updateItemsUI: function () {
    var e = this;
    var t = {};
    (0, f.each)(this._dataAdapter.getData(), function (n, i) {
      var o = e._getNodeElement(i, t);
      var a = i.internalFields.selected;
      if (o.length) {
        e._toggleSelectedClass(o, a);
        e.setAria("selected", a, o);
        if (e._showCheckboxes()) {
          e._getCheckBoxInstance(o).option("value", a);
        }
      }
    });
    if (this._selectAllEnabled()) {
      var n = this._$selectAllItem.dxCheckBox("instance");
      n.option("onValueChanged", undefined);
      n.option("value", this._dataAdapter.isAllSelected());
      n.option("onValueChanged", this._onSelectAllCheckboxValueChanged.bind(this));
    }
  },
  _updateParentsState: function (e, t) {
    if (t) {
      var n = this._dataAdapter.getNodeByKey(e.internalFields.parentKey);
      var i = (0, o.default)(t.parents("." + E)[0]);
      if (this._showCheckboxes()) {
        var a = n.internalFields.selected;
        this._getCheckBoxInstance(i).option("value", a);
        this._toggleSelectedClass(i, a);
      }
      if (n.internalFields.parentKey !== this.option("rootValue")) {
        this._updateParentsState(n, i);
      }
    }
  },
  _itemEventHandlerImpl: function (e, t, n) {
    var i = (0, o.default)(e).closest("." + E).children("." + R);
    return t((0, h.extend)(this._extendActionArgs(i), n));
  },
  _itemContextMenuHandler: function (e) {
    this._createEventHandler("onItemContextMenu", e);
  },
  _itemHoldHandler: function (e) {
    this._createEventHandler("onItemHold", e);
  },
  _createEventHandler: function (e, t) {
    var n = this._getNodeByElement(t.currentTarget);
    this._itemDXEventHandler(t, e, {
      node: this._dataAdapter.getPublicNode(n)
    });
  },
  _itemClass: function () {
    return R;
  },
  _itemDataKey: function () {
    return H;
  },
  _attachClickEvent: function () {
    var e = "." + this._itemClass();
    var t = "." + E + ", ." + $;
    var n = (0, _.addNamespace)(l.name, this.NAME);
    var i = (0, _.addNamespace)(v.default.down, this.NAME);
    var a = this._itemContainer();
    var s = this;
    r.default.off(a, n, e);
    r.default.off(a, i, t);
    r.default.on(a, n, e, function (e) {
      s._itemClickHandler(e, (0, o.default)(this));
    });
    r.default.on(a, i, t, function (e) {
      s._itemPointerDownHandler(e);
    });
  },
  _itemClickHandler: function (e, t) {
    var n = this._getItemData(t);
    var i = this._getNodeByElement(t);
    this._itemDXEventHandler(e, "onItemClick", {
      node: this._dataAdapter.getPublicNode(i)
    });
    if (this.option("selectByClick") && !e.isDefaultPrevented()) {
      this._updateItemSelection(!i.internalFields.selected, n, e);
    }
  },
  _updateSelectionToFirstItem: function (e, t) {
    for (var n = t; n >= 0;) {
      var i = (0, o.default)(e[n]);
      this._updateItemSelection(true, i.find("." + R).get(0));
      n--;
    }
  },
  _updateSelectionToLastItem: function (e, t) {
    for (var n = e.length, i = t; i < n;) {
      var a = (0, o.default)(e[i]);
      this._updateItemSelection(true, a.find("." + R).get(0));
      i++;
    }
  },
  focus: function () {
    if (this._selectAllEnabled()) {
      r.default.trigger(this._$selectAllItem, "focus");
    } else {
      this.callBase();
    }
  },
  _focusInHandler: function (e) {
    var t = this;
    this._updateFocusState(e, true);
    var n = (0, o.default)(e.target).hasClass($);
    if (n || this.option("focusedElement")) {
      clearTimeout(this._setFocusedItemTimeout);
      var i = n ? (0, p.getPublicElement)(this._$selectAllItem) : (0, o.default)(this.option("focusedElement"));
      this._setFocusedItemTimeout = setTimeout(function () {
        t._setFocusedItem(i);
      });
    } else {
      var a = this._getActiveItem();
      this.option("focusedElement", (0, p.getPublicElement)(a.closest("." + E)));
    }
  },
  _itemPointerDownHandler: function (e) {
    if (this.option("focusStateEnabled")) {
      var t = (0, o.default)(e.target).closest("." + E + ", ." + $);
      if (t.length) {
        var n = t.hasClass("dx-state-disabled") ? null : t;
        this.option("focusedElement", (0, p.getPublicElement)(n));
      }
    }
  },
  _findNonDisabledNodes: function (e) {
    return e.not(function () {
      return (0, o.default)(this).children("." + R).hasClass("dx-state-disabled");
    });
  },
  _moveFocus: function (e, t) {
    var n = "up";
    var i = "down";
    var o = "first";
    var a = "last";
    var r = this.option("rtlEnabled") ? "right" : "left";
    var s = this.option("rtlEnabled") ? "left" : "right";
    this.$element().find(`.${O}`).each(function () {
      b.default.stop(this, true);
    });
    var l = this._nodeElements();
    if (l && l.length) {
      switch (e) {
        case n:
          var u = this._prevItem(l);
          this.option("focusedElement", (0, p.getPublicElement)(u));
          var d = this._getNodeItemElement(u);
          this.getScrollable().scrollToElement(d);
          if (t.shiftKey && this._showCheckboxes()) {
            this._updateItemSelection(true, d);
          }
          break;
        case i:
          var c = this._nextItem(l);
          this.option("focusedElement", (0, p.getPublicElement)(c));
          var h = this._getNodeItemElement(c);
          this.getScrollable().scrollToElement(h);
          if (t.shiftKey && this._showCheckboxes()) {
            this._updateItemSelection(true, h);
          }
          break;
        case o:
          var f = l.first();
          if (t.shiftKey && this._showCheckboxes()) {
            this._updateSelectionToFirstItem(l, l.index(this._prevItem(l)));
          }
          this.option("focusedElement", (0, p.getPublicElement)(f));
          this.getScrollable().scrollToElement(this._getNodeItemElement(f));
          break;
        case a:
          var g = l.last();
          if (t.shiftKey && this._showCheckboxes()) {
            this._updateSelectionToLastItem(l, l.index(this._nextItem(l)));
          }
          this.option("focusedElement", (0, p.getPublicElement)(g));
          this.getScrollable().scrollToElement(this._getNodeItemElement(g));
          break;
        case s:
          this._expandFocusedContainer();
          break;
        case r:
          this._collapseFocusedContainer();
          break;
        default:
          this.callBase.apply(this, arguments);
          return;
      }
    }
  },
  _getNodeItemElement: function (e) {
    return e.find("." + R).get(0);
  },
  _nodeElements: function () {
    return this.$element().find("." + E).not(":hidden");
  },
  _expandFocusedContainer: function () {
    var e = (0, o.default)(this.option("focusedElement"));
    if (e.length && !e.hasClass(M)) {
      if (e.find(`.${O}`).eq(0).hasClass(P)) {
        var t = this._nextItem(this._findNonDisabledNodes(this._nodeElements()));
        this.option("focusedElement", (0, p.getPublicElement)(t));
        this.getScrollable().scrollToElement(this._getNodeItemElement(t));
        return;
      }
      var n = this._getNodeByElement(e.children("." + R));
      this._toggleExpandedState(n, true);
    }
  },
  _getClosestNonDisabledNode: function (e) {
    do {
      e = e.parent().closest("." + E);
    } while (e.children(".dx-treeview-item.dx-state-disabled").length);
    return e;
  },
  _collapseFocusedContainer: function () {
    var e = (0, o.default)(this.option("focusedElement"));
    if (e.length) {
      var t = e.find(`.${O}`).eq(0);
      if (!e.hasClass(M) && t.hasClass(P)) {
        var n = this._getNodeByElement(e.children("." + R));
        this._toggleExpandedState(n, false);
      } else {
        var i = this._getClosestNonDisabledNode(e);
        if (i.length) {
          this.option("focusedElement", (0, p.getPublicElement)(i));
        }
        this.getScrollable().scrollToElement(this._getNodeItemElement(i));
      }
    }
  },
  _encodeString: function (e) {
    if ((0, c.isString)(e)) {
      return encodeURI(e);
    } else {
      return e;
    }
  },
  _decodeString: function (e) {
    if ((0, c.isString)(e)) {
      return decodeURI(e);
    } else {
      return e;
    }
  },
  getScrollable: function () {
    return this._scrollable;
  },
  updateDimensions: function () {
    var e = this;
    var t = new C.Deferred();
    var n = this.getScrollable();
    if (n) {
      n.update().done(function () {
        t.resolveWith(e);
      });
    } else {
      t.resolveWith(this);
    }
    return t.promise();
  },
  selectItem: function (e) {
    return this._updateItemSelection(true, e);
  },
  unselectItem: function (e) {
    return this._updateItemSelection(false, e);
  },
  expandItem: function (e) {
    return this._toggleExpandedState(e, true);
  },
  collapseItem: function (e) {
    return this._toggleExpandedState(e, false);
  },
  getNodes: function () {
    return this._dataAdapter.getTreeNodes();
  },
  getSelectedNodes: function () {
    var e = this;
    return this.getSelectedNodeKeys().map(function (t) {
      var n = e._dataAdapter.getNodeByKey(t);
      return e._dataAdapter.getPublicNode(n);
    });
  },
  getSelectedNodeKeys: function () {
    return this._dataAdapter.getSelectedNodesKeys();
  },
  selectAll: function () {
    if (this._selectAllEnabled()) {
      this._$selectAllItem.dxCheckBox("instance").option("value", true);
    } else {
      this._toggleSelectAll({
        value: true
      });
    }
  },
  unselectAll: function () {
    if (this._selectAllEnabled()) {
      this._$selectAllItem.dxCheckBox("instance").option("value", false);
    } else {
      this._toggleSelectAll({
        value: false
      });
    }
  },
  _allItemsExpandedHandler: function () {
    this._skipContentReadyAndItemExpanded = false;
    this._fireContentReadyAction();
  },
  expandAll: function () {
    var e = this;
    var t = this._dataAdapter.getData();
    var n = [];
    this._skipContentReadyAndItemExpanded = true;
    t.forEach(function (t) {
      return n.push(e._toggleExpandedState(t.internalFields.key, true));
    });
    Promise.allSettled(n).then(function () {
      var t;
      if ((t = e._allItemsExpanded) === null || t === undefined) {
        return undefined;
      } else {
        return t.call(e);
      }
    });
  },
  collapseAll: function () {
    (0, f.each)(this._dataAdapter.getExpandedNodesKeys(), function (e, t) {
      this._toggleExpandedState(t, false);
    }.bind(this));
  },
  scrollToItem: function (e) {
    var t = this;
    var n = this._getNode(e);
    if (!n) {
      return new C.Deferred().reject().promise();
    }
    var i = [];
    for (var o = n.internalFields.publicNode.parent; o != null;) {
      if (!o.expanded) {
        i.push(o.key);
      }
      o = o.parent;
    }
    var a = new C.Deferred();
    this._expandNodes(i.reverse()).always(function () {
      var e = t._getNodeElement(n);
      if (e && e.length) {
        t.scrollToElementTopLeft(e.get(0));
        a.resolve();
      } else {
        a.reject();
      }
    });
    return a.promise();
  },
  scrollToElementTopLeft: function (e) {
    var t = this.getScrollable();
    var n = this.option();
    var i = n.scrollDirection;
    var a = n.rtlEnabled;
    var r = {
      top: 0,
      left: 0
    };
    var s = (0, k.getRelativeOffset)(D.SCROLLABLE_CONTENT_CLASS, e);
    if (i !== D.DIRECTION_VERTICAL) {
      var l = (0, o.default)(t.container()).get(0);
      r.left = a ? s.left + e.offsetWidth - l.clientWidth : s.left;
    }
    if (i !== D.DIRECTION_HORIZONTAL) {
      r.top = s.top;
    }
    t.scrollTo(r);
  },
  _expandNodes: function (e) {
    var t = this;
    if (!e || e.length === 0) {
      return new C.Deferred().resolve().promise();
    }
    var n = new C.Deferred();
    var i = e.map(function (e) {
      return t.expandItem(e);
    });
    C.when.apply(o.default, i).done(function () {
      return n.resolve();
    }).fail(function () {
      return n.reject();
    });
    return n.promise();
  },
  _dispose: function () {
    this.callBase();
    clearTimeout(this._setFocusedItemTimeout);
    this._allItemsExpandedHandler = null;
  }
});
exports.default = U;
module.exports = exports.default;
module.exports.default = exports.default;