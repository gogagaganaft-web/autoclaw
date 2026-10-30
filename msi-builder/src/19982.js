exports.default = undefined;
var i = require("./58664.js");
var o = T(require("./68374.js"));
var a = T(require("./55994.js"));
var r = require("./20576.js");
var s = require("./69697.js");
var l = require("./6415.js");
var u = T(require("./73349.js"));
var d = require("./35922.js");
var c = require("./62754.js");
var h = require("./13306.js");
var f = require("./95479.js");
var p = T(require("./62414.js"));
var g = T(require("./73176.js"));
var m = T(require("./14390.js"));
var _ = require("./39611.js");
var v = T(require("./93786.js"));
var y = T(require("./53305.js"));
var b = T(require("./54778.js"));
var x = require("./31421.js");
var w = T(require("./28109.js"));
var C = T(require("./11699.js"));
var S = require("./47617.js");
var k = require("./95429.js");
var D = require("./49166.js");
var I = require("./93280.js");
function T(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var E = "dx-item";
var O = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
var A = m.default.inherit({
  _activeStateUnit: "." + E,
  _supportedKeys: function () {
    function e(e, t) {
      if (!(0, _.isCommandKeyPressed)(t)) {
        t.preventDefault();
        t.stopPropagation();
        this._moveFocus(e, t);
      }
    }
    return (0, h.extend)(this.callBase(), {
      space: function (e) {
        e.preventDefault();
        this._enterKeyHandler(e);
      },
      enter: this._enterKeyHandler,
      leftArrow: e.bind(this, "left"),
      rightArrow: e.bind(this, "right"),
      upArrow: e.bind(this, "up"),
      downArrow: e.bind(this, "down"),
      pageUp: e.bind(this, "up"),
      pageDown: e.bind(this, "down"),
      home: e.bind(this, "first"),
      end: e.bind(this, "last")
    });
  },
  _enterKeyHandler: function (e) {
    var t = (0, o.default)(this.option("focusedElement"));
    if (t.length) {
      var n = this._getItemData(t);
      if (n != null && n.onClick) {
        this._itemEventHandlerByHandler(t, n.onClick, {
          event: e
        });
      }
      this._itemClickHandler((0, h.extend)({}, e, {
        target: t.get(0),
        currentTarget: t.get(0)
      }));
    }
  },
  _getDefaultOptions: function () {
    return (0, h.extend)(this.callBase(), {
      selectOnFocus: false,
      loopItemFocus: true,
      items: [],
      itemTemplate: "item",
      onItemRendered: null,
      onItemClick: null,
      onItemHold: null,
      itemHoldTimeout: 750,
      onItemContextMenu: null,
      onFocusedItemChanged: null,
      noDataText: w.default.format("dxCollectionWidget-noDataText"),
      encodeNoDataText: false,
      dataSource: null,
      _dataController: null,
      _itemAttributes: {},
      itemTemplateProperty: "template",
      focusOnSelectedItem: true,
      focusedElement: null,
      displayExpr: undefined,
      disabledExpr: function (e) {
        if (e) {
          return e.disabled;
        } else {
          return undefined;
        }
      },
      visibleExpr: function (e) {
        if (e) {
          return e.visible;
        } else {
          return undefined;
        }
      }
    });
  },
  _init: function () {
    this._compileDisplayGetter();
    this._initDataController();
    this.callBase();
    this._cleanRenderedItems();
    this._refreshDataSource();
  },
  _compileDisplayGetter: function () {
    var e = this.option("displayExpr");
    this._displayGetter = e ? (0, S.compileGetter)(this.option("displayExpr")) : undefined;
  },
  _initTemplates: function () {
    this._initItemsFromMarkup();
    this._initDefaultItemTemplate();
    this.callBase();
  },
  _getAnonymousTemplateName: function () {
    return "item";
  },
  _initDefaultItemTemplate: function () {
    var e = this._getFieldsMap();
    this._templateManager.addDefaultTemplates({
      item: new I.BindableTemplate(function (t, n) {
        if ((0, d.isPlainObject)(n)) {
          this._prepareDefaultItemTemplate(n, t);
        } else {
          if (e && (0, d.isFunction)(e.text)) {
            n = e.text(n);
          }
          t.text(String((0, r.ensureDefined)(n, "")));
        }
      }.bind(this), this._getBindableFields(), this.option("integrationOptions.watchMethod"), e)
    });
  },
  _getBindableFields: function () {
    return ["text", "html"];
  },
  _getFieldsMap: function () {
    if (this._displayGetter) {
      return {
        text: this._displayGetter
      };
    }
  },
  _prepareDefaultItemTemplate: function (e, t) {
    if ((0, d.isDefined)(e.text)) {
      t.text(e.text);
    }
    if ((0, d.isDefined)(e.html)) {
      t.html(e.html);
    }
  },
  _initItemsFromMarkup: function () {
    var e = this;
    var t = (0, s.findTemplates)(this.$element(), "dxItem");
    if (t.length && !this.option("items").length) {
      var n = t.map(function (t) {
        var n = t.element;
        var i = t.options;
        if (/\S/.test(n.innerHTML) && !i.template) {
          i.template = e._prepareItemTemplate(n);
        } else {
          (0, o.default)(n).remove();
        }
        return i;
      });
      this.option("items", n);
    }
  },
  _prepareItemTemplate: function (e) {
    var t = "tmpl-" + new g.default();
    var n = (0, o.default)(e).detach().clone().removeAttr("data-options").addClass("dx-template-wrapper");
    this._saveTemplate(t, n);
    return t;
  },
  _dataSourceOptions: function () {
    return {
      paginate: false
    };
  },
  _cleanRenderedItems: function () {
    this._renderedItemsCount = 0;
  },
  _focusTarget: function () {
    return this.$element();
  },
  _focusInHandler: function (e) {
    this.callBase.apply(this, arguments);
    if (this._isFocusTarget(e.target)) {
      var t = (0, o.default)(this.option("focusedElement"));
      if (t.length) {
        this._setFocusedItem(t);
      } else {
        var n = this._getActiveItem();
        if (n.length) {
          this.option("focusedElement", (0, l.getPublicElement)(n));
        }
      }
    }
  },
  _focusOutHandler: function () {
    this.callBase.apply(this, arguments);
    var e = (0, o.default)(this.option("focusedElement"));
    this._updateFocusedItemState(e, false);
  },
  _findActiveTarget: function (e) {
    return e.find(this._activeStateUnit);
  },
  _getActiveItem: function (e) {
    var t = (0, o.default)(this.option("focusedElement"));
    if (t.length) {
      return t;
    }
    var n = this.option("focusOnSelectedItem") ? this.option("selectedIndex") : 0;
    var i = this._getActiveElement();
    var a = i.length - 1;
    if (n < 0) {
      n = e ? a : 0;
    }
    return i.eq(n);
  },
  _moveFocus: function (e) {
    var t;
    var n = this._getAvailableItems();
    switch (e) {
      case "pageup":
      case "up":
        t = this._prevItem(n);
        break;
      case "pagedown":
      case "down":
        t = this._nextItem(n);
        break;
      case "right":
        t = this.option("rtlEnabled") ? this._prevItem(n) : this._nextItem(n);
        break;
      case "left":
        t = this.option("rtlEnabled") ? this._nextItem(n) : this._prevItem(n);
        break;
      case "first":
        t = n.first();
        break;
      case "last":
        t = n.last();
        break;
      default:
        return false;
    }
    if (t.length !== 0) {
      this.option("focusedElement", (0, l.getPublicElement)(t));
    }
  },
  _getVisibleItems: function (e) {
    return (e = e || this._itemElements()).filter(":visible");
  },
  _getAvailableItems: function (e) {
    return this._getVisibleItems(e);
  },
  _prevItem: function (e) {
    var t = this._getActiveItem();
    var n = e.index(t);
    var i = e.last();
    var a = (0, o.default)(e[n - 1]);
    var r = this.option("loopItemFocus");
    if (a.length === 0 && r) {
      a = i;
    }
    return a;
  },
  _nextItem: function (e) {
    var t = this._getActiveItem(true);
    var n = e.index(t);
    var i = e.first();
    var a = (0, o.default)(e[n + 1]);
    var r = this.option("loopItemFocus");
    if (a.length === 0 && r) {
      a = i;
    }
    return a;
  },
  _selectFocusedItem: function (e) {
    this.selectItem(e);
  },
  _updateFocusedItemState: function (e, t, n) {
    var i = (0, o.default)(e);
    if (i.length) {
      this._refreshActiveDescendant();
      this._refreshItemId(i, n);
      this._toggleFocusClass(t, i);
    }
    this._updateParentActiveDescendant();
  },
  _refreshActiveDescendant: function (e) {
    this.setAria("activedescendant", (0, d.isDefined)(this.option("focusedElement")) ? this.getFocusedItemId() : null, e);
  },
  _refreshItemId: function (e, t) {
    if (!t && this.option("focusedElement")) {
      this.setAria("id", this.getFocusedItemId(), e);
    } else {
      this.setAria("id", null, e);
    }
  },
  _isDisabled: function (e) {
    return e && (0, o.default)(e).attr("aria-disabled") === "true";
  },
  _setFocusedItem: function (e) {
    if (e && e.length) {
      this._updateFocusedItemState(e, true);
      this.onFocusedItemChanged(this.getFocusedItemId());
      var t = this.option().selectOnFocus;
      var n = this._isDisabled(e);
      if (t && !n) {
        this._selectFocusedItem(e);
      }
    }
  },
  _findItemElementByItem: function (e) {
    var t = (0, o.default)();
    var n = this;
    this.itemElements().each(function () {
      var i = (0, o.default)(this);
      if (i.data(n._itemDataKey()) === e) {
        t = i;
        return false;
      }
    });
    return t;
  },
  _getIndexByItem: function (e) {
    return this.option("items").indexOf(e);
  },
  _itemOptionChanged: function (e, t, n, i) {
    var o = this._findItemElementByItem(e);
    if (o.length) {
      if (!this.constructor.ItemClass.getInstance(o).setDataField(t, n)) {
        this._refreshItem(o, e);
      }
      if (t === "disabled" && n) {
        this._resetItemFocus(o);
      }
    }
  },
  _resetItemFocus: function (e) {
    if (e.is(this.option("focusedElement"))) {
      this.option("focusedElement", null);
    }
  },
  _refreshItem: function (e) {
    var t = this._getItemData(e);
    var n = e.data(this._itemIndexKey());
    this._renderItem(this._renderedItemsCount + n, t, null, e);
  },
  _updateParentActiveDescendant: r.noop,
  _optionChanged: function (e) {
    if (e.name === "items") {
      var t = e.fullName.match(O);
      if (t && t.length) {
        var n = t[t.length - 1];
        var i = e.fullName.replace("." + n, "");
        var a = this.option(i);
        this._itemOptionChanged(a, n, e.value, e.previousValue);
        return;
      }
    }
    switch (e.name) {
      case "items":
      case "_itemAttributes":
      case "itemTemplateProperty":
      case "useItemTextAsTitle":
        this._cleanRenderedItems();
        this._invalidate();
        break;
      case "dataSource":
        this._refreshDataSource();
        this._renderEmptyMessage();
        break;
      case "noDataText":
      case "encodeNoDataText":
        this._renderEmptyMessage();
        break;
      case "itemTemplate":
        this._invalidate();
        break;
      case "onItemRendered":
        this._createItemRenderAction();
        break;
      case "onItemClick":
        break;
      case "onItemHold":
      case "itemHoldTimeout":
        this._attachHoldEvent();
        break;
      case "onItemContextMenu":
        this._attachContextMenuEvent();
        break;
      case "onFocusedItemChanged":
        this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
        break;
      case "selectOnFocus":
      case "loopItemFocus":
      case "focusOnSelectedItem":
        break;
      case "focusedElement":
        this._updateFocusedItemState(e.previousValue, false, true);
        this._setFocusedItem((0, o.default)(e.value));
        break;
      case "displayExpr":
        this._compileDisplayGetter();
        this._initDefaultItemTemplate();
        this._invalidate();
        break;
      case "visibleExpr":
      case "disabledExpr":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  },
  _invalidate: function () {
    this.option("focusedElement", null);
    return this.callBase.apply(this, arguments);
  },
  _loadNextPage: function () {
    this._expectNextPageLoading();
    return this._dataController.loadNextPage();
  },
  _expectNextPageLoading: function () {
    this._startIndexForAppendedItems = 0;
  },
  _expectLastItemLoading: function () {
    this._startIndexForAppendedItems = -1;
  },
  _forgetNextPageLoading: function () {
    this._startIndexForAppendedItems = null;
  },
  _dataSourceChangedHandler: function (e) {
    var t = this.option("items");
    if (this._initialized && t && this._shouldAppendItems()) {
      this._renderedItemsCount = t.length;
      if (!this._isLastPage() || this._startIndexForAppendedItems !== -1) {
        this.option().items = t.concat(e.slice(this._startIndexForAppendedItems));
      }
      this._forgetNextPageLoading();
      this._refreshContent();
    } else {
      this.option("items", e.slice());
    }
  },
  _refreshContent: function () {
    this._prepareContent();
    this._renderContent();
  },
  _dataSourceLoadErrorHandler: function () {
    this._forgetNextPageLoading();
    this.option("items", this.option("items"));
  },
  _shouldAppendItems: function () {
    return this._startIndexForAppendedItems != null && this._allowDynamicItemsAppend();
  },
  _allowDynamicItemsAppend: function () {
    return false;
  },
  _clean: function () {
    this._cleanFocusState();
    this._cleanItemContainer();
    if (this._inkRipple) {
      delete this._inkRipple;
    }
    this._resetActiveState();
  },
  _cleanItemContainer: function () {
    (0, o.default)(this._itemContainer()).empty();
  },
  _dispose: function () {
    this.callBase();
    clearTimeout(this._itemFocusTimeout);
  },
  _refresh: function () {
    this._cleanRenderedItems();
    this.callBase.apply(this, arguments);
  },
  _itemContainer: function () {
    return this.$element();
  },
  _itemClass: function () {
    return E;
  },
  _itemContentClass: function () {
    return this._itemClass() + "-content";
  },
  _selectedItemClass: function () {
    return "dx-item-selected";
  },
  _itemResponseWaitClass: function () {
    return "dx-item-response-wait";
  },
  _itemSelector: function () {
    return "." + this._itemClass();
  },
  _itemDataKey: function () {
    return "dxItemData";
  },
  _itemIndexKey: function () {
    return "dxItemIndex";
  },
  _itemElements: function () {
    return this._itemContainer().find(this._itemSelector());
  },
  _initMarkup: function () {
    this.callBase();
    this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
    this.$element().addClass("dx-collection");
    this._prepareContent();
  },
  _prepareContent: (0, r.deferRenderer)(function () {
    this._renderContentImpl();
  }),
  _renderContent: function () {
    this._fireContentReadyAction();
  },
  _render: function () {
    this.callBase();
    this._attachClickEvent();
    this._attachHoldEvent();
    this._attachContextMenuEvent();
  },
  _getPointerEvent: function () {
    return v.default.down;
  },
  _attachClickEvent: function () {
    var e = this;
    var t = this._itemSelector();
    var n = this._getPointerEvent();
    var i = (0, _.addNamespace)(k.name, this.NAME);
    var r = (0, _.addNamespace)(n, this.NAME);
    var s = new p.default(function (t) {
      var n = t.event;
      e._itemPointerDownHandler(n);
    });
    a.default.off(this._itemContainer(), i, t);
    a.default.off(this._itemContainer(), r, t);
    a.default.on(this._itemContainer(), i, t, function (t) {
      return e._itemClickHandler(t);
    });
    a.default.on(this._itemContainer(), r, t, function (e) {
      s.execute({
        element: (0, o.default)(e.target),
        event: e
      });
    });
  },
  _itemClickHandler: function (e, t, n) {
    this._itemDXEventHandler(e, "onItemClick", t, n);
  },
  _itemPointerDownHandler: function (e) {
    if (this.option("focusStateEnabled")) {
      this._itemFocusHandler = function () {
        clearTimeout(this._itemFocusTimeout);
        this._itemFocusHandler = null;
        if (!e.isDefaultPrevented()) {
          var t = (0, o.default)(e.target);
          var n = t.closest(this._itemElements());
          var i = this._closestFocusable(t);
          if (n.length && this._isFocusTarget(i == null ? undefined : i.get(0))) {
            this.option("focusedElement", (0, l.getPublicElement)(n));
          }
        }
      }.bind(this);
      this._itemFocusTimeout = setTimeout(this._forcePointerDownFocus.bind(this));
    }
  },
  _closestFocusable: function (e) {
    if (e.is(x.focusable)) {
      return e;
    }
    for (e = e.parent(); e.length && !u.default.isDocument(e.get(0)) && !u.default.isDocumentFragment(e.get(0));) {
      if (e.is(x.focusable)) {
        return e;
      }
      e = e.parent();
    }
  },
  _forcePointerDownFocus: function () {
    if (this._itemFocusHandler) {
      this._itemFocusHandler();
    }
  },
  _updateFocusState: function () {
    this.callBase.apply(this, arguments);
    this._forcePointerDownFocus();
  },
  _attachHoldEvent: function () {
    var e = this._itemContainer();
    var t = this._itemSelector();
    var n = (0, _.addNamespace)(C.default.name, this.NAME);
    a.default.off(e, n, t);
    a.default.on(e, n, t, {
      timeout: this._getHoldTimeout()
    }, this._itemHoldHandler.bind(this));
  },
  _getHoldTimeout: function () {
    return this.option("itemHoldTimeout");
  },
  _shouldFireHoldEvent: function () {
    return this.hasActionSubscription("onItemHold");
  },
  _itemHoldHandler: function (e) {
    if (this._shouldFireHoldEvent()) {
      this._itemDXEventHandler(e, "onItemHold");
    } else {
      e.cancel = true;
    }
  },
  _attachContextMenuEvent: function () {
    var e = this._itemContainer();
    var t = this._itemSelector();
    var n = (0, _.addNamespace)(D.name, this.NAME);
    a.default.off(e, n, t);
    a.default.on(e, n, t, this._itemContextMenuHandler.bind(this));
  },
  _shouldFireContextMenuEvent: function () {
    return this.hasActionSubscription("onItemContextMenu");
  },
  _itemContextMenuHandler: function (e) {
    if (this._shouldFireContextMenuEvent()) {
      this._itemDXEventHandler(e, "onItemContextMenu");
    } else {
      e.cancel = true;
    }
  },
  _renderContentImpl: function () {
    var e = this.option("items") || [];
    if (this._renderedItemsCount) {
      this._renderItems(e.slice(this._renderedItemsCount));
    } else {
      this._renderItems(e);
    }
  },
  _renderItems: function (e) {
    if (e.length) {
      (0, f.each)(e, function (e, t) {
        this._renderItem(this._renderedItemsCount + e, t);
      }.bind(this));
    }
    this._renderEmptyMessage();
  },
  _renderItem: function (e, t, n, i) {
    var a = (e == null ? undefined : e.item) ?? e;
    n = n || this._itemContainer();
    var r = this._renderItemFrame(a, t, n, i);
    this._setElementData(r, t, a);
    r.attr(this.option("_itemAttributes"));
    this._attachItemClickEvent(t, r);
    var s = this._getItemContent(r);
    var u = this._renderItemContent({
      index: a,
      itemData: t,
      container: (0, l.getPublicElement)(s),
      contentClass: this._itemContentClass(),
      defaultTemplateName: this.option("itemTemplate")
    });
    var d = this;
    (0, c.when)(u).done(function (n) {
      d._postprocessRenderItem({
        itemElement: r,
        itemContent: n,
        itemData: t,
        itemIndex: a
      });
      d._executeItemRenderAction(e, t, (0, l.getPublicElement)(r));
    });
    return r;
  },
  _getItemContent: function (e) {
    var t = e.find(".dx-item-content-placeholder");
    t.removeClass("dx-item-content-placeholder");
    return t;
  },
  _attachItemClickEvent: function (e, t) {
    if (e && e.onClick) {
      a.default.on(t, k.name, function (n) {
        this._itemEventHandlerByHandler(t, e.onClick, {
          event: n
        });
      }.bind(this));
    }
  },
  _renderItemContent: function (e) {
    var t = this._getItemTemplateName(e);
    var n = this._getTemplate(t);
    this._addItemContentClasses(e);
    var i = (0, o.default)(this._createItemByTemplate(n, e));
    if (i.hasClass("dx-template-wrapper")) {
      return this._renderItemContentByNode(e, i);
    } else {
      return e.container;
    }
  },
  _renderItemContentByNode: function (e, t) {
    (0, o.default)(e.container).replaceWith(t);
    e.container = (0, l.getPublicElement)(t);
    this._addItemContentClasses(e);
    return t;
  },
  _addItemContentClasses: function (e) {
    var t = [E + "-content", e.contentClass];
    (0, o.default)(e.container).addClass(t.join(" "));
  },
  _appendItemToContainer: function (e, t, n) {
    t.appendTo(e);
  },
  _renderItemFrame: function (e, t, n, i) {
    var a = (0, o.default)("<div>");
    new this.constructor.ItemClass(a, this._itemOptions(), t || {});
    if (i && i.length) {
      i.replaceWith(a);
    } else {
      this._appendItemToContainer.call(this, n, a, e);
    }
    if (this.option("useItemTextAsTitle")) {
      var r = this._displayGetter ? this._displayGetter(t) : t;
      a.attr("title", r);
    }
    return a;
  },
  _itemOptions: function () {
    var e = this;
    return {
      watchMethod: function () {
        return e.option("integrationOptions.watchMethod");
      },
      owner: e,
      fieldGetter: function (t) {
        var n = e.option(t + "Expr");
        return (0, S.compileGetter)(n);
      }
    };
  },
  _postprocessRenderItem: r.noop,
  _executeItemRenderAction: function (e, t, n) {
    this._getItemRenderAction()({
      itemElement: n,
      itemIndex: e,
      itemData: t
    });
  },
  _setElementData: function (e, t, n) {
    e.addClass([E, this._itemClass()].join(" ")).data(this._itemDataKey(), t).data(this._itemIndexKey(), n);
  },
  _createItemRenderAction: function () {
    return this._itemRenderAction = this._createActionByOption("onItemRendered", {
      element: this.element(),
      excludeValidators: ["disabled", "readOnly"],
      category: "rendering"
    });
  },
  _getItemRenderAction: function () {
    return this._itemRenderAction || this._createItemRenderAction();
  },
  _getItemTemplateName: function (e) {
    var t = e.itemData;
    var n = e.templateProperty || this.option("itemTemplateProperty");
    return t && t[n] || e.defaultTemplateName;
  },
  _createItemByTemplate: function (e, t) {
    return e.render({
      model: t.itemData,
      container: t.container,
      index: t.index,
      onRendered: this._onItemTemplateRendered(e, t)
    });
  },
  _onItemTemplateRendered: function () {
    return r.noop;
  },
  _emptyMessageContainer: function () {
    return this._itemContainer();
  },
  _renderEmptyMessage: function (e) {
    e = e || this.option("items");
    var t = this.option("noDataText");
    var n = !t || e && e.length || this._dataController.isLoading();
    if (n && this._$noData) {
      this._$noData.remove();
      this._$noData = null;
      this.setAria("label", undefined);
    }
    if (!n) {
      this._$noData = this._$noData || (0, o.default)("<div>").addClass("dx-empty-message");
      this._$noData.appendTo(this._emptyMessageContainer());
      if (this.option("encodeNoDataText")) {
        this._$noData.text(t);
      } else {
        this._$noData.html(t);
      }
    }
    this.$element().toggleClass("dx-empty-collection", !n);
  },
  _itemDXEventHandler: function (e, t, n, i) {
    this._itemEventHandler(e.target, t, (0, h.extend)(n, {
      event: e
    }), i);
  },
  _itemEventHandler: function (e, t, n, i) {
    var o = this._createActionByOption(t, (0, h.extend)({
      validatingTargetName: "itemElement"
    }, i));
    return this._itemEventHandlerImpl(e, o, n);
  },
  _itemEventHandlerByHandler: function (e, t, n, i) {
    var o = this._createAction(t, (0, h.extend)({
      validatingTargetName: "itemElement"
    }, i));
    return this._itemEventHandlerImpl(e, o, n);
  },
  _itemEventHandlerImpl: function (e, t, n) {
    var i = this._closestItemElement((0, o.default)(e));
    var a = (0, h.extend)({}, n);
    return t((0, h.extend)(n, this._extendActionArgs(i), a));
  },
  _extendActionArgs: function (e) {
    return {
      itemElement: (0, l.getPublicElement)(e),
      itemIndex: this._itemElements().index(e),
      itemData: this._getItemData(e)
    };
  },
  _closestItemElement: function (e) {
    return (0, o.default)(e).closest(this._itemSelector());
  },
  _getItemData: function (e) {
    return (0, o.default)(e).data(this._itemDataKey());
  },
  _getSummaryItemsWidth: function (e, t) {
    var n = 0;
    if (e) {
      (0, f.each)(e, function (e, o) {
        n += (0, i.getOuterWidth)(o, t || false);
      });
    }
    return n;
  },
  getFocusedItemId: function () {
    this._focusedItemId ||= "dx-" + new g.default();
    return this._focusedItemId;
  },
  itemElements: function () {
    return this._itemElements();
  },
  itemsContainer: function () {
    return this._itemContainer();
  }
}).include(y.default);
A.ItemClass = b.default;
var P = A;
exports.default = P;
module.exports = exports.default;
module.exports.default = exports.default;