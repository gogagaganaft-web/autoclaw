exports.default = undefined;
var i = g(require("./68374.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./62754.js");
var s = g(require("./55994.js"));
var l = require("./39611.js");
var u = require("./49166.js");
var d = require("./75084.js");
var c = g(require("./28109.js"));
var h = g(require("./99338.js"));
var f = g(require("./43785.js"));
var p = require("./57289.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var _ = function (e) {
  var t;
  var n;
  function f() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = f).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var g = f.prototype;
  g._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this.$element().addClass("dx-filemanager-thumbnails");
    var t = (0, l.addNamespace)(u.name, "dxFileManager_thumbnails");
    s.default.on(this.$element(), t, this._onContextMenu.bind(this));
    this._createItemList();
  };
  g._createItemList = function () {
    var e = this._isMultipleSelectionMode() ? "multiple" : "single";
    var t = (0, i.default)("<div>").appendTo(this.$element());
    this._itemList = this._createComponent(t, h.default, {
      dataSource: this._createDataSource(),
      selectionMode: e,
      selectedItemKeys: this.option("selectedItemKeys"),
      focusedItemKey: this.option("focusedItemKey"),
      activeStateEnabled: true,
      hoverStateEnabled: true,
      loopItemFocus: false,
      focusStateEnabled: true,
      onItemEnterKeyPressed: this._tryOpen.bind(this),
      itemThumbnailTemplate: this._getItemThumbnailContainer.bind(this),
      getTooltipText: this._getTooltipText.bind(this),
      onSelectionChanged: this._onItemListSelectionChanged.bind(this),
      onFocusedItemChanged: this._onItemListFocusedItemChanged.bind(this),
      onContentReady: this._onContentReady.bind(this)
    });
  };
  g._onContextMenu = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (this._isDesktop()) {
      var t = null;
      var n = (0, i.default)(e.target).closest(this._getItemSelector());
      var o = null;
      if (n.length > 0) {
        o = this._itemList.getItemByItemElement(n);
        this._itemList.selectItem(o);
        t = this._getFileItemsForContextMenu(o);
      }
      var a = {
        itemData: o,
        itemElement: n.length ? n : undefined
      };
      this._showContextMenu(t, e.target, e, a);
    }
  };
  g._getItemThumbnailCssClass = function () {
    return "dx-filemanager-thumbnails-item-thumbnail";
  };
  g._getItemSelector = function () {
    return `.dx-filemanager-thumbnails-item`;
  };
  g._getTooltipText = function (e) {
    var t = e.fileItem;
    if (t.tooltipText) {
      return t.tooltipText;
    }
    var n = `${t.name}\r
`;
    if (!t.isDirectory) {
      n += `${c.default.format("dxFileManager-listThumbnailsTooltipTextSize")}: ${(0, d.getDisplayFileSize)(t.size)}\r
`;
    }
    return n += `${c.default.format("dxFileManager-listThumbnailsTooltipTextDateModified")}: ${t.dateModified}`;
  };
  g._onItemDblClick = function (e) {
    var t = (0, i.default)(e.currentTarget);
    var n = this._itemList.getItemByItemElement(t);
    this._tryOpen(n);
  };
  g._tryOpen = function (e) {
    if (e) {
      this._raiseSelectedItemOpened(e);
    }
  };
  g._getItemsInternal = function () {
    return e.prototype._getItemsInternal.call(this).then(function (e) {
      var t = new r.Deferred();
      setTimeout(function () {
        return t.resolve(e);
      });
      return t.promise();
    });
  };
  g._disableDragging = function () {
    return false;
  };
  g._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      focusStateEnabled: true
    });
  };
  g._onItemListSelectionChanged = function (e) {
    var t = e.addedItemKeys;
    var n = e.removedItemKeys;
    var i = this.getSelectedItems();
    var o = i.map(function (e) {
      return e.fileItem;
    });
    var a = o.map(function (e) {
      return e.key;
    });
    this._tryRaiseSelectionChanged({
      selectedItemInfos: i,
      selectedItems: o,
      selectedItemKeys: a,
      currentSelectedItemKeys: t,
      currentDeselectedItemKeys: n
    });
  };
  g._onItemListFocusedItemChanged = function (e) {
    var t = e.item;
    var n = e.itemElement;
    if (!this._isMultipleSelectionMode()) {
      this._selectItemSingleSelection(t);
    }
    var i = (t == null ? undefined : t.fileItem) || null;
    this._onFocusedItemChanged({
      item: i,
      itemKey: i == null ? undefined : i.key,
      itemElement: n || undefined
    });
  };
  g._getScrollable = function () {
    return this._itemList.getScrollable();
  };
  g._setSelectedItemKeys = function (e) {
    this._itemList.option("selectedItemKeys", e);
  };
  g._setFocusedItemKey = function (e) {
    this._itemList.option("focusedItemKey", e);
  };
  g.refresh = function (e, t) {
    var n = {
      dataSource: this._createDataSource()
    };
    if (e && Object.prototype.hasOwnProperty.call(e, "focusedItemKey")) {
      n.focusedItemKey = e.focusedItemKey;
    }
    if (e && Object.prototype.hasOwnProperty.call(e, "selectedItemKeys")) {
      n.selectedItemKeys = e.selectedItemKeys;
    }
    if (!(0, a.isDefined)(n.focusedItemKey) && t === p.OPERATIONS.NAVIGATION) {
      this._needResetScrollPosition = true;
    }
    this._itemList.option(n);
    this._refreshDeferred = new r.Deferred();
    return this._refreshDeferred.promise();
  };
  g._deselectItem = function (e) {
    var t = this._itemList.getItemElementByItem(e);
    this._itemList.unselectItem(t);
  };
  g._selectItemSingleSelection = function (e) {
    if (e) {
      this._itemList.selectItem(e);
    } else {
      this._itemList.clearSelection();
    }
  };
  g.clearSelection = function () {
    this._itemList.clearSelection();
  };
  g.getSelectedItems = function () {
    return this._itemList.getSelectedItems();
  };
  return f;
}(f.default);
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;