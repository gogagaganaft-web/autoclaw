exports.default = undefined;
var i = d(require("./68374.js"));
var o = require("./39611.js");
var a = require("./13306.js");
var r = d(require("./24232.js"));
var s = d(require("./28109.js"));
var l = d(require("./85057.js"));
var u = require("./31583.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = u.ListBase.inherit({
  _supportedKeys: function () {
    var e = this;
    var t = this;
    var n = this.callBase();
    function i(i, o) {
      var a = e._editStrategy;
      var r = e.option("focusedElement");
      var s = a.getNormalizedIndex(r);
      if (s !== e._getLastItemIndex() || !e._dataController.isLoading()) {
        if (i.shiftKey && t.option("itemDragging.allowReordering")) {
          var l = s + (o ? -1 : 1);
          var u = a.getItemElement(l);
          e.reorderItem(r, u);
          e.scrollToItem(r);
          i.preventDefault();
        } else if (!e._editProvider.handleKeyboardEvents(s, o)) {
          if (o) {
            n.upArrow(i);
          } else {
            n.downArrow(i);
          }
        }
      }
    }
    return (0, a.extend)({}, n, {
      del: function (e) {
        if (t.option("allowItemDeleting")) {
          e.preventDefault();
          t.deleteItem(t.option("focusedElement"));
        }
      },
      upArrow: function (e) {
        return i(e, true);
      },
      downArrow: function (e) {
        return i(e);
      },
      enter: function (e) {
        if (!this._editProvider.handleEnterPressing(e)) {
          n.enter.apply(this, arguments);
        }
      },
      space: function (e) {
        if (!this._editProvider.handleEnterPressing(e)) {
          n.space.apply(this, arguments);
        }
      }
    });
  },
  _updateSelection: function () {
    this._editProvider.afterItemsRendered();
    this.callBase();
  },
  _getLastItemIndex: function () {
    return this._itemElements().length - 1;
  },
  _refreshItemElements: function () {
    this.callBase();
    var e = this._editProvider.getExcludedItemSelectors();
    if (e.length) {
      this._itemElementsCache = this._itemElementsCache.not(e);
    }
  },
  _isItemStrictEquals: function (e, t) {
    var n = e && e.__dx_key__;
    return (!n || !!this.key() || !this._selection.isItemSelected(n)) && this.callBase(e, t);
  },
  _getDefaultOptions: function () {
    return (0, a.extend)(this.callBase(), {
      showSelectionControls: false,
      selectionMode: "none",
      selectAllMode: "page",
      onSelectAllValueChanged: null,
      selectAllText: s.default.format("dxList-selectAll"),
      menuItems: [],
      menuMode: "context",
      allowItemDeleting: false,
      itemDeleteMode: "static",
      itemDragging: {}
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function (e) {
        return e.platform === "ios";
      },
      options: {
        menuMode: "slide",
        itemDeleteMode: "slideItem"
      }
    }, {
      device: {
        platform: "android"
      },
      options: {
        itemDeleteMode: "swipe"
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this._initEditProvider();
  },
  _initDataSource: function () {
    this.callBase();
    if (!this._isPageSelectAll()) {
      if (this._dataSource) {
        this._dataSource.requireTotalCount(true);
      }
    }
  },
  _isPageSelectAll: function () {
    return this.option("selectAllMode") === "page";
  },
  _initEditProvider: function () {
    this._editProvider = new l.default(this);
  },
  _disposeEditProvider: function () {
    if (this._editProvider) {
      this._editProvider.dispose();
    }
  },
  _refreshEditProvider: function () {
    this._disposeEditProvider();
    this._initEditProvider();
  },
  _initEditStrategy: function () {
    if (this.option("grouped")) {
      this._editStrategy = new r.default(this);
    } else {
      this.callBase();
    }
  },
  _initMarkup: function () {
    this._refreshEditProvider();
    this.callBase();
  },
  _renderItems: function () {
    this.callBase.apply(this, arguments);
    this._editProvider.afterItemsRendered();
  },
  _selectedItemClass: function () {
    return "dx-list-item-selected";
  },
  _itemResponseWaitClass: function () {
    return "dx-list-item-response-wait";
  },
  _itemClickHandler: function (e) {
    var t = (0, i.default)(e.currentTarget);
    if (!t.is(".dx-state-disabled, .dx-state-disabled *")) {
      var n = this._editProvider.handleClick(t, e);
      if (!n) {
        this._saveSelectionChangeEvent(e);
        this.callBase.apply(this, arguments);
      }
    }
  },
  _shouldFireContextMenuEvent: function () {
    return this.callBase.apply(this, arguments) || this._editProvider.contextMenuHandlerExists();
  },
  _itemHoldHandler: function (e) {
    var t = (0, i.default)(e.currentTarget);
    if (!t.is(".dx-state-disabled, .dx-state-disabled *")) {
      var n = (0, o.isTouchEvent)(e) && this._editProvider.handleContextMenu(t, e);
      if (n) {
        e.handledByEditProvider = true;
      } else {
        this.callBase.apply(this, arguments);
      }
    }
  },
  _getItemContainer: function (e) {
    if (this.option("grouped")) {
      var n = this._editStrategy.getIndexByItemData(e)?.group;
      return this._getGroupContainerByIndex(n);
    }
    return this.callBase(e);
  },
  _itemContextMenuHandler: function (e) {
    var t = (0, i.default)(e.currentTarget);
    if (!t.is(".dx-state-disabled, .dx-state-disabled *")) {
      var n = !e.handledByEditProvider && this._editProvider.handleContextMenu(t, e);
      if (n) {
        e.preventDefault();
      } else {
        this.callBase.apply(this, arguments);
      }
    }
  },
  _postprocessRenderItem: function (e) {
    this.callBase.apply(this, arguments);
    this._editProvider.modifyItemElement(e);
  },
  _clean: function () {
    this._disposeEditProvider();
    this.callBase();
  },
  focusListItem: function (e) {
    var t = this._editStrategy.getItemElement(e);
    this.option("focusedElement", t);
    this.focus();
    this.scrollToItem(this.option("focusedElement"));
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "selectAllMode":
        this._initDataSource();
        this._dataController.pageIndex(0);
        this._dataController.load();
        break;
      case "grouped":
        this._clearSelectedItems();
        delete this._renderingGroupIndex;
        this._initEditStrategy();
        this.callBase(e);
        break;
      case "showSelectionControls":
      case "menuItems":
      case "menuMode":
      case "allowItemDeleting":
      case "itemDeleteMode":
      case "itemDragging":
      case "selectAllText":
        this._invalidate();
        break;
      case "onSelectAllValueChanged":
        break;
      default:
        this.callBase(e);
    }
  },
  selectAll: function () {
    return this._selection.selectAll(this._isPageSelectAll());
  },
  unselectAll: function () {
    return this._selection.deselectAll(this._isPageSelectAll());
  },
  isSelectAll: function () {
    return this._selection.getSelectAllState(this._isPageSelectAll());
  },
  getFlatIndexByItemElement: function (e) {
    return this._itemElements().index(e);
  },
  getItemElementByFlatIndex: function (e) {
    var t = this._itemElements();
    if (e < 0 || e >= t.length) {
      return (0, i.default)();
    } else {
      return t.eq(e);
    }
  },
  getItemByIndex: function (e) {
    return this._editStrategy.getItemDataByIndex(e);
  }
});
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;