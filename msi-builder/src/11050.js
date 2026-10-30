exports.default = undefined;
var i = _(require("./68374.js"));
var o = _(require("./55994.js"));
var a = _(require("./19982.js"));
var r = _(require("./96688.js"));
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./20576.js");
var d = require("./35922.js");
var c = _(require("./14174.js"));
var h = require("./47617.js");
var f = require("./85273.js");
var p = require("./9234.js");
var g = _(require("./68198.js"));
var m = require("./62754.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return y(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return y(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return y(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function y(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function b(e) {
  return e !== -1;
}
var x = a.default.inherit({
  _setOptionsByReference: function () {
    this.callBase();
    (0, s.extend)(this._optionsByReference, {
      selectedItem: true
    });
  },
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      selectionMode: "none",
      selectionRequired: false,
      selectByClick: true,
      selectedItems: [],
      selectedItemKeys: [],
      maxFilterLengthInRequest: 1500,
      keyExpr: null,
      selectedIndex: -1,
      selectedItem: null,
      onSelectionChanged: null,
      onItemReordered: null,
      onItemDeleting: null,
      onItemDeleted: null
    });
  },
  ctor: function (e, t) {
    this._userOptions = t || {};
    this.callBase(e, t);
  },
  _init: function () {
    this._initEditStrategy();
    this.callBase();
    this._initKeyGetter();
    this._initSelectionModule();
  },
  _initKeyGetter: function () {
    this._keyGetter = (0, h.compileGetter)(this.option("keyExpr"));
  },
  _getKeysByItems: function (e) {
    return this._editStrategy.getKeysByItems(e);
  },
  _getItemsByKeys: function (e, t) {
    return this._editStrategy.getItemsByKeys(e, t);
  },
  _getKeyByIndex: function (e) {
    return this._editStrategy.getKeyByIndex(e);
  },
  _getIndexByKey: function (e) {
    return this._editStrategy.getIndexByKey(e);
  },
  _getIndexByItemData: function (e) {
    return this._editStrategy.getIndexByItemData(e);
  },
  _isKeySpecified: function () {
    return !!this._dataController.key();
  },
  _getCombinedFilter: function () {
    return this._dataController.filter();
  },
  key: function () {
    if (this.option("keyExpr")) {
      return this.option("keyExpr");
    } else {
      return this._dataController.key();
    }
  },
  keyOf: function (e) {
    var t = e;
    if (this.option("keyExpr")) {
      t = this._keyGetter(e);
    } else if (this._dataController.store()) {
      t = this._dataController.keyOf(e);
    }
    return t;
  },
  _nullValueSelectionSupported: function () {
    return false;
  },
  _initSelectionModule: function () {
    var e = this;
    var t = e._editStrategy.itemsGetter;
    this._selection = new g.default({
      allowNullValue: this._nullValueSelectionSupported(),
      mode: this.option("selectionMode"),
      maxFilterLengthInRequest: this.option("maxFilterLengthInRequest"),
      equalByReference: !this._isKeySpecified(),
      onSelectionChanged: function (t) {
        if (t.addedItemKeys.length || t.removedItemKeys.length) {
          e.option("selectedItems", e._getItemsByKeys(t.selectedItemKeys, t.selectedItems));
          e._updateSelectedItems(t);
        }
      },
      filter: e._getCombinedFilter.bind(e),
      totalCount: function () {
        var t = e.option("items");
        var n = e._dataController.totalCount();
        if (n >= 0) {
          return n;
        } else {
          return e._getItemsCount(t);
        }
      },
      key: e.key.bind(e),
      keyOf: e.keyOf.bind(e),
      load: function (t) {
        var i = e._dataController;
        t.customQueryParams = i.loadOptions()?.customQueryParams;
        t.userData = i.userData();
        if (i.store()) {
          return i.loadFromStore(t).done(function (t) {
            if (!e._disposed) {
              var n = (0, p.normalizeLoadResult)(t).data;
              i.applyMapFunction(n);
            }
          });
        } else {
          return new m.Deferred().resolve(this.plainItems());
        }
      },
      dataFields: function () {
        return e._dataController.select();
      },
      plainItems: t.bind(e._editStrategy)
    });
  },
  _getItemsCount: function (e) {
    var t = this;
    return e.reduce(function (e, n) {
      return e + (n.items ? t._getItemsCount(n.items) : 1);
    }, 0);
  },
  _initEditStrategy: function () {
    var e = c.default;
    this._editStrategy = new e(this);
  },
  _getSelectedItemIndices: function (e) {
    var t = this;
    var n = [];
    e = e || this._selection.getSelectedItemKeys();
    t._editStrategy.beginCache();
    (0, l.each)(e, function (e, i) {
      var o = t._getIndexByKey(i);
      if (b(o)) {
        n.push(o);
      }
    });
    t._editStrategy.endCache();
    return n;
  },
  _initMarkup: function () {
    var e = this;
    this._rendering = true;
    if (!this._dataController.isLoading()) {
      this._syncSelectionOptions().done(function () {
        return e._normalizeSelectedItems();
      });
    }
    this.callBase();
  },
  _render: function () {
    this.callBase();
    this._rendering = false;
  },
  _fireContentReadyAction: function () {
    this._rendering = false;
    this._rendered = true;
    this.callBase.apply(this, arguments);
  },
  _syncSelectionOptions: function (e) {
    var t;
    var n;
    var i;
    var o;
    switch (e = e || this._chooseSelectOption()) {
      case "selectedIndex":
        t = this._editStrategy.getItemDataByIndex(this.option("selectedIndex"));
        if ((0, d.isDefined)(t)) {
          this._setOptionWithoutOptionChange("selectedItems", [t]);
          this._setOptionWithoutOptionChange("selectedItem", t);
          this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([t]));
        } else {
          this._setOptionWithoutOptionChange("selectedItems", []);
          this._setOptionWithoutOptionChange("selectedItemKeys", []);
          this._setOptionWithoutOptionChange("selectedItem", null);
        }
        break;
      case "selectedItems":
        n = (o = this.option("selectedItems") || []).length ? this._editStrategy.getIndexByItemData(o[0]) : -1;
        if (this.option("selectionRequired") && !b(n)) {
          return this._syncSelectionOptions("selectedIndex");
        }
        this._setOptionWithoutOptionChange("selectedItem", o[0]);
        this._setOptionWithoutOptionChange("selectedIndex", n);
        this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems(o));
        break;
      case "selectedItem":
        t = this.option("selectedItem");
        n = this._editStrategy.getIndexByItemData(t);
        if (this.option("selectionRequired") && !b(n)) {
          return this._syncSelectionOptions("selectedIndex");
        }
        if ((0, d.isDefined)(t)) {
          this._setOptionWithoutOptionChange("selectedItems", [t]);
          this._setOptionWithoutOptionChange("selectedIndex", n);
          this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([t]));
        } else {
          this._setOptionWithoutOptionChange("selectedItems", []);
          this._setOptionWithoutOptionChange("selectedItemKeys", []);
          this._setOptionWithoutOptionChange("selectedIndex", -1);
        }
        break;
      case "selectedItemKeys":
        i = this.option("selectedItemKeys");
        if (this.option("selectionRequired")) {
          var a = this._getIndexByKey(i[0]);
          if (!b(a)) {
            return this._syncSelectionOptions("selectedIndex");
          }
        }
        return this._selection.setSelection(i);
    }
    return new m.Deferred().resolve().promise();
  },
  _chooseSelectOption: function () {
    var e = "selectedIndex";
    var t = function (e) {
      var t = this.option(e);
      return (0, d.isDefined)(t) && t.length || e in this._userOptions;
    }.bind(this);
    if (t("selectedItems")) {
      e = "selectedItems";
    } else if (t("selectedItem")) {
      e = "selectedItem";
    } else if (t("selectedItemKeys")) {
      e = "selectedItemKeys";
    }
    return e;
  },
  _compareKeys: function (e, t) {
    if (e.length !== t.length) {
      return false;
    }
    for (var n = 0; n < t.length; n++) {
      if (e[n] !== t[n]) {
        return false;
      }
    }
    return true;
  },
  _normalizeSelectedItems: function () {
    if (this.option("selectionMode") === "none") {
      this._setOptionWithoutOptionChange("selectedItems", []);
      this._syncSelectionOptions("selectedItems");
    } else if (this.option("selectionMode") === "single") {
      var e = this.option("selectedItems");
      if (e.length > 1 || !e.length && this.option("selectionRequired") && this.option("items") && this.option("items").length) {
        var t = this._selection.getSelectedItems();
        var n = e[0] === undefined ? t[0] : e[0];
        if (n === undefined) {
          n = this._editStrategy.itemsGetter()[0];
        }
        if (this.option("grouped") && n && n.items) {
          n.items = [n.items[0]];
        }
        this._selection.setSelection(this._getKeysByItems([n]));
        this._setOptionWithoutOptionChange("selectedItems", [n]);
        return this._syncSelectionOptions("selectedItems");
      }
      this._selection.setSelection(this._getKeysByItems(e));
    } else {
      var i = this._getKeysByItems(this.option("selectedItems"));
      var o = this._selection.getSelectedItemKeys();
      if (!this._compareKeys(o, i)) {
        this._selection.setSelection(i);
      }
    }
    return new m.Deferred().resolve().promise();
  },
  _itemClickHandler: function (e) {
    var t = arguments;
    var n = this;
    var o = new m.Deferred().resolve();
    var a = this.callBase;
    this._createAction(function (e) {
      o = this._itemSelectHandler(e.event) ?? o;
    }.bind(this), {
      validatingTargetName: "itemElement"
    })({
      itemElement: (0, i.default)(e.currentTarget),
      event: e
    });
    o.always(function () {
      a.apply(n, t);
    });
  },
  _itemSelectHandler: function (e) {
    var t;
    var n;
    if (this.option("selectByClick")) {
      var i = e.currentTarget;
      if (this.isItemSelected(i)) {
        this.unselectItem(e.currentTarget);
      } else {
        n = this.selectItem(e.currentTarget);
      }
      if ((t = n) === null || t === undefined) {
        return undefined;
      } else {
        return t.promise();
      }
    }
  },
  _selectedItemElement: function (e) {
    return this._itemElements().eq(e);
  },
  _postprocessRenderItem: function (e) {
    if (this.option("selectionMode") !== "none") {
      var t = (0, i.default)(e.itemElement);
      var n = this._editStrategy.getNormalizedIndex(t);
      var o = this._isItemSelected(n);
      this._processSelectableItem(t, o);
    }
  },
  _processSelectableItem: function (e, t) {
    e.toggleClass(this._selectedItemClass(), t);
    this._setAriaSelectionAttribute(e, String(t));
  },
  _updateSelectedItems: function (e) {
    var t = this;
    var n = e.addedItemKeys;
    var i = e.removedItemKeys;
    if (t._rendered && (n.length || i.length)) {
      var o = t._selectionChangePromise;
      if (!t._rendering) {
        var a;
        var r = [];
        var s = [];
        t._editStrategy.beginCache();
        for (var l = 0; l < n.length; l++) {
          a = t._getIndexByKey(n[l]);
          r.push(a);
          t._addSelection(a);
        }
        for (var u = 0; u < i.length; u++) {
          a = t._getIndexByKey(i[u]);
          s.push(a);
          t._removeSelection(a);
        }
        t._editStrategy.endCache();
        t._updateSelection(r, s);
      }
      (0, m.when)(o).done(function () {
        t._fireSelectionChangeEvent(e.addedItems, e.removedItems);
      });
    }
  },
  _fireSelectionChangeEvent: function (e, t) {
    this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    })({
      addedItems: e,
      removedItems: t
    });
  },
  _updateSelection: u.noop,
  _setAriaSelectionAttribute: function (e, t) {
    this.setAria("selected", t, e);
  },
  _removeSelection: function (e) {
    var t = this._editStrategy.getItemElement(e);
    if (b(e)) {
      this._processSelectableItem(t, false);
      o.default.triggerHandler(t, "stateChanged", false);
    }
  },
  _addSelection: function (e) {
    var t = this._editStrategy.getItemElement(e);
    if (b(e)) {
      this._processSelectableItem(t, true);
      o.default.triggerHandler(t, "stateChanged", true);
    }
  },
  _isItemSelected: function (e) {
    var t = this._getKeyByIndex(e);
    return this._selection.isItemSelected(t, {
      checkPending: true
    });
  },
  _optionChanged: function (e) {
    var t = this;
    switch (e.name) {
      case "selectionMode":
        this._invalidate();
        break;
      case "dataSource":
        if (!e.value || Array.isArray(e.value) && !e.value.length) {
          this.option("selectedItemKeys", []);
        }
        this.callBase(e);
        break;
      case "selectedIndex":
      case "selectedItem":
      case "selectedItems":
      case "selectedItemKeys":
        this._syncSelectionOptions(e.name).done(function () {
          return t._normalizeSelectedItems();
        });
        break;
      case "keyExpr":
        this._initKeyGetter();
        break;
      case "selectionRequired":
        this._normalizeSelectedItems();
        break;
      case "selectByClick":
      case "onSelectionChanged":
      case "onItemDeleting":
      case "onItemDeleted":
      case "onItemReordered":
      case "maxFilterLengthInRequest":
        break;
      default:
        this.callBase(e);
    }
  },
  _clearSelectedItems: function () {
    this._setOptionWithoutOptionChange("selectedItems", []);
    this._syncSelectionOptions("selectedItems");
  },
  _waitDeletingPrepare: function (e) {
    if (e.data("dxItemDeleting")) {
      return new m.Deferred().resolve().promise();
    }
    e.data("dxItemDeleting", true);
    var t = new m.Deferred();
    var n = {
      cancel: false
    };
    var i = this._itemEventHandler(e, "onItemDeleting", n, {
      excludeValidators: ["disabled", "readOnly"]
    });
    (0, m.when)(i).always(function (o) {
      var a = !i;
      var r = !a && i.state() === "resolved";
      var s = !!arguments.length;
      var l = a || r && !s || r && o;
      (0, m.when)((0, m.fromPromise)(n.cancel)).always(function () {
        e.data("dxItemDeleting", false);
      }).done(function (e) {
        if (l && !e) {
          t.resolve();
        } else {
          t.reject();
        }
      }).fail(t.reject);
    }.bind(this));
    return t.promise();
  },
  _deleteItemFromDS: function (e) {
    var t = this._dataController;
    var n = new m.Deferred();
    var i = this.option("disabled");
    var o = t.store();
    if (!o) {
      return new m.Deferred().resolve().promise();
    }
    if (!o.remove) {
      throw r.default.Error("E1011");
    }
    this.option("disabled", true);
    o.remove(t.keyOf(this._getItemData(e))).done(function (e) {
      if (e !== undefined) {
        n.resolve();
      } else {
        n.reject();
      }
    }).fail(function () {
      n.reject();
    });
    n.always(function () {
      this.option("disabled", i);
    }.bind(this));
    return n;
  },
  _tryRefreshLastPage: function () {
    var e = new m.Deferred();
    if (this._isLastPage() || this.option("grouped")) {
      e.resolve();
    } else {
      this._refreshLastPage().done(function () {
        e.resolve();
      });
    }
    return e.promise();
  },
  _refreshLastPage: function () {
    this._expectLastItemLoading();
    return this._dataController.load();
  },
  _updateSelectionAfterDelete: function (e) {
    var t = this._getKeyByIndex(e);
    this._selection.deselect([t]);
  },
  _updateIndicesAfterIndex: function (e) {
    for (var t = this._itemElements(), n = e + 1; n < t.length; n++) {
      (0, i.default)(t[n]).data(this._itemIndexKey(), n - 1);
    }
  },
  _simulateOptionChange: function (e) {
    var t = this.option(e);
    if (!(t instanceof f.DataSource)) {
      this._optionChangedAction({
        name: e,
        fullName: e,
        value: t
      });
    }
  },
  isItemSelected: function (e) {
    return this._isItemSelected(this._editStrategy.getNormalizedIndex(e));
  },
  selectItem: function (e) {
    if (this.option("selectionMode") !== "none") {
      var t = this._editStrategy.getNormalizedIndex(e);
      if (b(t)) {
        var n = this._getKeyByIndex(t);
        if (!this._selection.isItemSelected(n)) {
          if (this.option("selectionMode") === "single") {
            return this._selection.setSelection([n]);
          }
          var i = this.option("selectedItemKeys") || [];
          return this._selection.setSelection([].concat(v(i), [n]), [n]);
        }
      }
    }
  },
  unselectItem: function (e) {
    var t = this._editStrategy.getNormalizedIndex(e);
    if (b(t)) {
      var n = this._selection.getSelectedItemKeys();
      if (!this.option("selectionRequired") || !(n.length <= 1)) {
        var i = this._getKeyByIndex(t);
        if (this._selection.isItemSelected(i, {
          checkPending: true
        })) {
          this._selection.deselect([i]);
        }
      }
    }
  },
  _deleteItemElementByIndex: function (e) {
    this._updateSelectionAfterDelete(e);
    this._updateIndicesAfterIndex(e);
    this._editStrategy.deleteItemAtIndex(e);
  },
  _afterItemElementDeleted: function (e, t) {
    var n = this._dataController.getDataSource() ? "dataSource" : "items";
    this._simulateOptionChange(n);
    this._itemEventHandler(e, "onItemDeleted", t, {
      beforeExecute: function () {
        e.remove();
      },
      excludeValidators: ["disabled", "readOnly"]
    });
    this._renderEmptyMessage();
  },
  deleteItem: function (e) {
    var t = this;
    var n = new m.Deferred();
    var i = this._editStrategy.getItemElement(e);
    var o = this._editStrategy.getNormalizedIndex(e);
    var a = this._itemResponseWaitClass();
    if (b(o)) {
      this._waitDeletingPrepare(i).done(function () {
        i.addClass(a);
        var e = t._extendActionArgs(i);
        t._deleteItemFromDS(i).done(function () {
          t._deleteItemElementByIndex(o);
          t._afterItemElementDeleted(i, e);
          t._tryRefreshLastPage().done(function () {
            n.resolveWith(t);
          });
        }).fail(function () {
          i.removeClass(a);
          n.rejectWith(t);
        });
      }).fail(function () {
        n.rejectWith(t);
      });
    } else {
      n.rejectWith(t);
    }
    return n.promise();
  },
  reorderItem: function (e, t) {
    var n = new m.Deferred();
    var i = this;
    var o = this._editStrategy;
    var a = o.getItemElement(e);
    var r = o.getItemElement(t);
    var s = o.getNormalizedIndex(e);
    var l = o.getNormalizedIndex(t);
    var u = this._dataController.getDataSource() ? "dataSource" : "items";
    if (b(s) && b(l) && s !== l) {
      n.resolveWith(this);
    } else {
      n.rejectWith(this);
    }
    return n.promise().done(function () {
      r[o.itemPlacementFunc(s, l)](a);
      o.moveItemAtIndexToIndex(s, l);
      this._updateIndicesAfterIndex(s);
      i.option("selectedItems", i._getItemsByKeys(i._selection.getSelectedItemKeys(), i._selection.getSelectedItems()));
      if (u === "items") {
        i._simulateOptionChange(u);
      }
      i._itemEventHandler(a, "onItemReordered", {
        fromIndex: o.getIndex(s),
        toIndex: o.getIndex(l)
      }, {
        excludeValidators: ["disabled", "readOnly"]
      });
    });
  }
});
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;