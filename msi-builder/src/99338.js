exports.default = undefined;
var i = require("./58664.js");
var o = g(require("./68374.js"));
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./62754.js");
var l = g(require("./11699.js"));
var u = require("./39611.js");
var d = g(require("./55994.js"));
var c = require("./93280.js");
var h = g(require("./4741.js"));
var f = g(require("./11050.js"));
var p = g(require("./68198.js"));
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
var _ = (0, u.addNamespace)(l.default.name, "dxFileManagerThumbnailsListBox");
var v = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var l = i.prototype;
  l._initMarkup = function () {
    this._initActions();
    this._lockFocusedItemProcessing = false;
    this.$element().addClass("dx-filemanager-thumbnails-view-port");
    this._renderScrollView();
    this._renderItemsContainer();
    this._createScrollViewControl();
    e.prototype._initMarkup.call(this);
    this.onFocusedItemChanged = this._onFocusedItemChanged.bind(this);
    this._layoutUtils = new y(this._scrollView, this.$element(), this._$itemContainer, this.itemElements().first());
    this._syncFocusedItemKey();
  };
  l._initActions = function () {
    this._actions = {
      onItemEnterKeyPressed: this._createActionByOption("onItemEnterKeyPressed"),
      onFocusedItemChanged: this._createActionByOption("onFocusedItemChanged")
    };
  };
  l._initTemplates = function () {
    e.prototype._initTemplates.call(this);
    this._itemThumbnailTemplate = this.option("itemThumbnailTemplate");
    this._getTooltipText = this.option("getTooltipText");
    this._templateManager.addDefaultTemplates({
      item: new c.BindableTemplate(function (e, t, n) {
        var i = this._getDefaultItemTemplate(n, e);
        e.append(i);
      }.bind(this), ["fileItem"], this.option("integrationOptions.watchMethod"))
    });
  };
  l._createScrollViewControl = function () {
    this._scrollView ||= this._createComponent(this._$scrollView, h.default, {
      scrollByContent: true,
      scrollByThumb: true,
      useKeyboard: false,
      showScrollbar: "onHover"
    });
  };
  l._renderScrollView = function () {
    this._$scrollView ||= (0, o.default)("<div>").appendTo(this.$element());
  };
  l.getScrollable = function () {
    return this._scrollView;
  };
  l._renderItemsContainer = function () {
    this._$itemContainer ||= (0, o.default)("<div>").addClass("dx-filemanager-thumbnails-container").appendTo(this._$scrollView);
  };
  l._render = function () {
    e.prototype._render.call(this);
    this._detachEventHandlers();
    this._attachEventHandlers();
  };
  l._clean = function () {
    this._detachEventHandlers();
    e.prototype._clean.call(this);
  };
  l._supportedKeys = function () {
    return (0, a.extend)(e.prototype._supportedKeys.call(this), {
      upArrow: function (e) {
        this._beforeKeyProcessing(e);
        this._processArrowKeys(-1, false, e);
      },
      downArrow: function (e) {
        this._beforeKeyProcessing(e);
        this._processArrowKeys(1, false, e);
      },
      home: function (e) {
        this._beforeKeyProcessing(e);
        this._processHomeEndKeys(0, true, e);
      },
      end: function (e) {
        this._beforeKeyProcessing(e);
        this._processHomeEndKeys(this._getItemsLength() - 1, true, e);
      },
      pageUp: function (e) {
        this._beforeKeyProcessing(e);
        this._processPageChange(true, e);
      },
      pageDown: function (e) {
        this._beforeKeyProcessing(e);
        this._processPageChange(false, e);
      },
      enter: function (e) {
        this._beforeKeyProcessing(e);
        this._actions.onItemEnterKeyPressed(this._getFocusedItem());
      },
      A: function (e) {
        this._beforeKeyProcessing(e);
        if ((0, u.isCommandKeyPressed)(e)) {
          this.selectAll();
        }
      }
    });
  };
  l._beforeKeyProcessing = function (e) {
    e.preventDefault();
    this._layoutUtils.reset();
  };
  l._processArrowKeys = function (e, t, n) {
    var i = this._getFocusedItem();
    if (i) {
      if (!t) {
        var o = this._layoutUtils.getLayoutModel();
        if (!o) {
          return;
        }
        e *= o.itemPerRowCount;
      }
      var a = this._getIndexByItem(i) + e;
      this._focusItemByIndex(a, true, n);
    }
  };
  l._processHomeEndKeys = function (e, t, n) {
    this._focusItemByIndex(e, t, n);
  };
  l._processPageChange = function (e, t) {
    var n = this._getFocusedItem();
    if (n) {
      var i = this._layoutUtils.getLayoutModel();
      if (i) {
        var o = this._layoutUtils.createItemLayoutModel(this._getIndexByItem(n));
        var a = e ? i.rowPerPageRate : -i.rowPerPageRate;
        var r = o.itemRowIndex - a;
        var s = (e ? Math.ceil : Math.floor)(r) * i.itemPerRowCount + o.itemColumnIndex;
        if (s < 0) {
          s = 0;
        } else if (s >= this._getItemsLength()) {
          s = this._getItemsLength() - 1;
        }
        this._focusItemByIndex(s, true, t);
      }
    }
  };
  l._processLongTap = function (e) {
    var t = this._closestItemElement((0, o.default)(e.target));
    var n = this._getIndexByItemElement(t);
    this._selection.changeItemSelection(n, {
      control: true
    });
  };
  l._attachEventHandlers = function () {
    var e = this;
    if (this.option("selectionMode") === "multiple") {
      d.default.on(this._itemContainer(), _, `.${this._itemContentClass()}`, function (t) {
        e._processLongTap(t);
        t.stopPropagation();
      });
    }
    d.default.on(this._itemContainer(), "mousedown selectstart", function (e) {
      if (e.shiftKey) {
        e.preventDefault();
      }
    });
  };
  l._detachEventHandlers = function () {
    d.default.off(this._itemContainer(), _);
    d.default.off(this._itemContainer(), "mousedown selectstart");
  };
  l._itemContainer = function () {
    return this._$itemContainer;
  };
  l._itemClass = function () {
    return "dx-filemanager-thumbnails-item";
  };
  l._itemDataKey = function () {
    return "dxFileManagerItemData";
  };
  l._getDefaultItemTemplate = function (e, t) {
    t.attr("title", this._getTooltipText(e));
    var n = this._itemThumbnailTemplate(e);
    var i = (0, o.default)("<div>").addClass("dx-filemanager-thumbnails-item-spacer");
    var a = (0, o.default)("<div>").addClass("dx-filemanager-thumbnails-item-name").text(e.fileItem.name);
    t.append(n, i, a);
  };
  l._itemSelectHandler = function (e) {
    var t = {};
    if (this.option("selectionMode") === "multiple") {
      this._isPreserveSelectionMode ||= (0, u.isCommandKeyPressed)(e) || e.shiftKey;
      t = {
        control: this._isPreserveSelectionMode,
        shift: e.shiftKey
      };
    }
    var n = this._getIndexByItemElement(e.currentTarget);
    this._selection.changeItemSelection(n, t);
  };
  l._initSelectionModule = function () {
    var t = this;
    e.prototype._initSelectionModule.call(this);
    var n = (0, a.extend)(this._selection.options, {
      selectedKeys: this.option("selectedItemKeys"),
      onSelectionChanged: function (e) {
        t.option("selectedItems", t._getItemsByKeys(e.selectedItemKeys, e.selectedItems));
        t._updateSelectedItems(e);
      }
    });
    this._selection = new p.default(n);
  };
  l._updateSelectedItems = function (e) {
    var t = this;
    var n = e.addedItemKeys;
    var i = e.removedItemKeys;
    if (this._rendered && (n.length || i.length)) {
      var o = this._selectionChangePromise;
      if (!this._rendering) {
        var a;
        var r = [];
        var l = [];
        this._editStrategy.beginCache();
        for (var u = 0; u < i.length; u++) {
          a = this._getIndexByKey(i[u]);
          l.push(a);
          this._removeSelection(a);
        }
        for (var d = 0; d < n.length; d++) {
          a = this._getIndexByKey(n[d]);
          r.push(a);
          this._addSelection(a);
        }
        this._editStrategy.endCache();
        this._updateSelection(r, l);
      }
      (0, s.when)(o).done(function () {
        return t._fireSelectionChangeEvent(e);
      });
    }
  };
  l._fireSelectionChangeEvent = function (e) {
    this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    })(e);
  };
  l._updateSelection = function (e, t) {
    if (this.getSelectedItems().length === 0) {
      this._isPreserveSelectionMode = false;
    }
  };
  l._normalizeSelectedItems = function () {
    var e = this._getKeysByItems(this.option("selectedItems"));
    var t = this._selection.getSelectedItemKeys();
    if (!this._compareKeys(t, e)) {
      this._selection.setSelection(e);
    }
    return new s.Deferred().resolve().promise();
  };
  l._focusOutHandler = function () {};
  l._getItems = function () {
    return this.option("items") || [];
  };
  l._getItemsLength = function () {
    return this._getItems().length;
  };
  l._getIndexByItemElement = function (e) {
    return this._editStrategy.getNormalizedIndex(e);
  };
  l._getItemByIndex = function (e) {
    return this._getItems()[e];
  };
  l._getFocusedItem = function () {
    return this.getItemByItemElement(this.option("focusedElement"));
  };
  l._focusItem = function (e, t) {
    this.option("focusedElement", this.getItemElementByItem(e));
    if (t) {
      this._layoutUtils.scrollToItem(this._getIndexByItem(e));
    }
  };
  l._focusItemByIndex = function (e, t, n) {
    if (e >= 0 && e < this._getItemsLength()) {
      var i = this._getItemByIndex(e);
      this._focusItem(i, t, n);
    }
  };
  l._syncFocusedItemKey = function () {
    var e = this;
    this._syncFocusedItemKeyDeferred ||= new s.Deferred();
    var t = this._syncFocusedItemKeyDeferred;
    if (this._dataSource && this._dataSource.isLoading()) {
      return t.promise();
    }
    var n = this.option("focusedItemKey");
    if ((0, r.isDefined)(n)) {
      var i = this.option("items").find(function (t) {
        return e.keyOf(t) === n;
      });
      if (i) {
        this._focusItem(i, true);
        t.resolve();
      } else {
        this.option("focusedItemKey", undefined);
        t.reject();
      }
    } else {
      t.resolve();
    }
    this._syncFocusedItemKeyDeferred = null;
    return t.promise();
  };
  l._onFocusedItemChanged = function () {
    var e = this._getFocusedItem();
    var t = this.keyOf(e);
    if (t !== this.option("focusedItemKey")) {
      this._lockFocusedItemProcessing = true;
      this.option("focusedItemKey", t);
      this._lockFocusedItemProcessing = false;
      this._raiseFocusedItemChanged(e);
    }
  };
  l._raiseFocusedItemChanged = function (e) {
    var t = {
      item: e,
      itemElement: this.option("focusedElement")
    };
    this._actions.onFocusedItemChanged(t);
  };
  l._changeItemSelection = function (e, t) {
    if (this.isItemSelected(e) !== t) {
      var n = this.getItemElementByItem(e);
      var i = this._getIndexByItemElement(n);
      this._selection.changeItemSelection(i, {
        control: this._isPreserveSelectionMode
      });
    }
  };
  l._chooseSelectOption = function () {
    return "selectedItemKeys";
  };
  l.getSelectedItems = function () {
    return this._selection.getSelectedItems();
  };
  l.getItemElementByItem = function (e) {
    return this._editStrategy.getItemElement(e);
  };
  l.getItemByItemElement = function (e) {
    return this._getItemByIndex(this._getIndexByItemElement(e));
  };
  l.selectAll = function () {
    if (this.option("selectionMode") === "multiple") {
      this._selection.selectAll();
      this._isPreserveSelectionMode = true;
    }
  };
  l.selectItem = function (e) {
    this._changeItemSelection(e, true);
  };
  l.deselectItem = function (e) {
    this._changeItemSelection(e, false);
  };
  l.clearSelection = function () {
    this._selection.deselectAll();
  };
  l._optionChanged = function (t) {
    var n = this;
    switch (t.name) {
      case "items":
        if (this._layoutUtils) {
          this._layoutUtils.updateItems(this.itemElements().first());
        }
        e.prototype._optionChanged.call(this, t);
        break;
      case "focusedItemKey":
        if (this._lockFocusedItemProcessing) {
          break;
        }
        if ((0, r.isDefined)(t.value)) {
          this._syncFocusedItemKey().done(function () {
            var e = n._getFocusedItem();
            n._raiseFocusedItemChanged(e);
          });
        } else {
          this.option("focusedElement", null);
          this._raiseFocusedItemChanged(null);
        }
        break;
      case "onItemEnterKeyPressed":
      case "onFocusedItemChanged":
        this._actions[t.name] = this._createActionByOption(t.name);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return i;
}(f.default);
var y = function () {
  function e(e, t, n, i) {
    this._layoutModel = null;
    this._scrollView = e;
    this._$viewPort = t;
    this._$itemContainer = n;
    this._$item = i;
  }
  var t = e.prototype;
  t.updateItems = function (e) {
    this._$item = e;
  };
  t.reset = function () {
    this._layoutModel = null;
  };
  t.getLayoutModel = function () {
    this._layoutModel ||= this._createLayoutModel();
    return this._layoutModel;
  };
  t._createLayoutModel = function () {
    if (!this._$item) {
      return null;
    }
    var e = (0, i.getOuterWidth)(this._$item, true);
    if (e === 0) {
      return null;
    }
    var t = (0, i.getOuterHeight)(this._$item, true);
    var n = (0, i.getInnerWidth)(this._$itemContainer);
    var o = (0, i.getInnerHeight)(this._$viewPort);
    var a = this._scrollView.scrollTop();
    return {
      itemWidth: e,
      itemHeight: t,
      viewPortWidth: n,
      viewPortHeight: o,
      viewPortScrollTop: a,
      viewPortScrollBottom: a + o,
      itemPerRowCount: Math.floor(n / e),
      rowPerPageRate: o / t
    };
  };
  t.createItemLayoutModel = function (e) {
    var t = this.getLayoutModel();
    if (!t) {
      return null;
    }
    var n = Math.floor(e / t.itemPerRowCount);
    var i = e % t.itemPerRowCount;
    var o = n * t.itemHeight;
    return {
      itemRowIndex: n,
      itemColumnIndex: i,
      itemTop: o,
      itemBottom: o + t.itemHeight
    };
  };
  t.scrollToItem = function (e) {
    var t = this.getLayoutModel();
    if (t) {
      var n = Math.floor(e / t.itemPerRowCount) * t.itemHeight;
      var i = n + t.itemHeight;
      var o = t.viewPortScrollTop;
      if (n < t.viewPortScrollTop) {
        o = n;
      } else if (i > t.viewPortScrollBottom) {
        o = i - t.viewPortHeight;
      }
      this._scrollView.scrollTo(o);
    }
  };
  return e;
}();
var b = v;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;