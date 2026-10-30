exports.default = undefined;
var i = u(require("./83014.js"));
var o = u(require("./78600.js"));
var a = require("./13306.js");
var r = require("./20576.js");
var s = require("./35922.js");
var l = require("./62754.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = function () {
  function e(e) {
    this.options = (0, a.extend)(this._getDefaultOptions(), e, {
      selectedItemKeys: e.selectedKeys || []
    });
    this._selectionStrategy = this.options.deferred ? new i.default(this.options) : new o.default(this.options);
    this._focusedItemIndex = -1;
    if (!this.options.equalByReference) {
      this._selectionStrategy.updateSelectedItemKeyHash(this.options.selectedItemKeys);
    }
  }
  var t = e.prototype;
  t._getDefaultOptions = function () {
    return {
      allowNullValue: false,
      deferred: false,
      equalByReference: false,
      mode: "multiple",
      selectedItems: [],
      selectionFilter: [],
      maxFilterLengthInRequest: 0,
      onSelectionChanged: r.noop,
      key: r.noop,
      keyOf: function (e) {
        return e;
      },
      load: function () {
        return new l.Deferred().resolve([]);
      },
      totalCount: function () {
        return -1;
      },
      isSelectableItem: function () {
        return true;
      },
      isItemSelected: function () {
        return false;
      },
      getItemData: function (e) {
        return e;
      },
      dataFields: r.noop,
      filter: r.noop
    };
  };
  t.validate = function () {
    this._selectionStrategy.validate();
  };
  t.getSelectedItemKeys = function () {
    return this._selectionStrategy.getSelectedItemKeys();
  };
  t.getSelectedItems = function () {
    return this._selectionStrategy.getSelectedItems();
  };
  t.selectionFilter = function (e) {
    if (e === undefined) {
      return this.options.selectionFilter;
    }
    var t = this.options.selectionFilter !== e && JSON.stringify(this.options.selectionFilter) !== JSON.stringify(e);
    this.options.selectionFilter = e;
    if (t) {
      this.onSelectionChanged();
    }
  };
  t.setSelection = function (e, t) {
    return this.selectedItemKeys(e, false, false, false, t);
  };
  t.select = function (e) {
    return this.selectedItemKeys(e, true);
  };
  t.deselect = function (e) {
    return this.selectedItemKeys(e, true, true);
  };
  t.selectedItemKeys = function (e, t, n, i, o) {
    e = e ?? [];
    e = Array.isArray(e) ? e : [e];
    this.validate();
    return this._selectionStrategy.selectedItemKeys(e, t, n, i, o);
  };
  t.clearSelection = function () {
    return this.selectedItemKeys([]);
  };
  t._addSelectedItem = function (e, t) {
    this._selectionStrategy.addSelectedItem(t, e);
  };
  t._removeSelectedItem = function (e) {
    this._selectionStrategy.removeSelectedItem(e);
  };
  t._setSelectedItems = function (e, t) {
    this._selectionStrategy.setSelectedItems(e, t);
  };
  t.onSelectionChanged = function () {
    this._selectionStrategy.onSelectionChanged();
  };
  t.changeItemSelection = function (e, t, n) {
    var i;
    var o;
    var a;
    var r;
    var u;
    var d = this;
    var c = this.options.plainItems();
    var h = c[e];
    var f = false;
    var p = false;
    function g(e) {
      return e >= 0 && !c.filter(function (t) {
        return t.loadIndex === e;
      }).length;
    }
    if (((i = (o = this.options).allowLoadByRange) === null || i === undefined ? undefined : i.call(o)) && (0, s.isDefined)(h)) {
      u = h.loadIndex - e;
      e = h.loadIndex;
      f = g(this._focusedItemIndex);
      if ((0, s.isDefined)(this._shiftFocusedItemIndex)) {
        p = g(this._shiftFocusedItemIndex);
      }
    }
    if (!this.isSelectable() || !this.isDataItem(h)) {
      return false;
    }
    var m = this.options.getItemData(h);
    var _ = this.options.keyOf(m);
    if ((t = t || {}).shift && this.options.mode === "multiple" && this._focusedItemIndex >= 0) {
      if (f || p) {
        if (a = e !== this._shiftFocusedItemIndex || this._focusedItemIndex !== this._shiftFocusedItemIndex) {
          r = this.changeItemSelectionWhenShiftKeyInVirtualPaging(e);
        }
      } else {
        a = this.changeItemSelectionWhenShiftKeyPressed(e, c, u);
      }
    } else if (t.control) {
      this._resetItemSelectionWhenShiftKeyPressed();
      if (!n) {
        var v = this._selectionStrategy.isItemDataSelected(m);
        if (this.options.mode === "single") {
          this.clearSelectedItems();
        }
        if (v) {
          this._removeSelectedItem(_);
        } else {
          this._addSelectedItem(m, _);
        }
      }
      a = true;
    } else {
      this._resetItemSelectionWhenShiftKeyPressed();
      var y = this._selectionStrategy.equalKeys(this.options.selectedItemKeys[0], _);
      if (this.options.selectedItemKeys.length !== 1 || !y) {
        this._setSelectedItems([_], [m]);
        a = true;
      }
    }
    if (a) {
      (0, l.when)(r).done(function () {
        d._focusedItemIndex = e;
        if (!n) {
          d.onSelectionChanged();
        }
      });
      return true;
    } else {
      return undefined;
    }
  };
  t.isDataItem = function (e) {
    return this.options.isSelectableItem(e);
  };
  t.isSelectable = function () {
    return this.options.mode === "single" || this.options.mode === "multiple";
  };
  t.isItemDataSelected = function (e) {
    return this._selectionStrategy.isItemDataSelected(e, {
      checkPending: true
    });
  };
  t.isItemSelected = function (e, t) {
    return this._selectionStrategy.isItemKeySelected(e, t);
  };
  t._resetItemSelectionWhenShiftKeyPressed = function () {
    delete this._shiftFocusedItemIndex;
  };
  t._resetFocusedItemIndex = function () {
    this._focusedItemIndex = -1;
  };
  t.changeItemSelectionWhenShiftKeyInVirtualPaging = function (e) {
    var t = this;
    var n = this.options.getLoadOptions(e, this._focusedItemIndex, this._shiftFocusedItemIndex);
    var i = new l.Deferred();
    var o = n.skip;
    this.options.load(n).done(function (n) {
      t.changeItemSelectionWhenShiftKeyPressed(e, n, o);
      i.resolve();
    });
    return i.promise();
  };
  t.changeItemSelectionWhenShiftKeyPressed = function (e, t, n) {
    var i;
    var o;
    var a;
    var r;
    var l;
    var u = false;
    var d = (0, s.isDefined)(n);
    var c = d ? this._focusedItemIndex - n : this._focusedItemIndex;
    var h = this.options.keyOf;
    var f = t[c];
    var p = this.options.getItemData(f);
    var g = h(p);
    var m = f && this.isItemDataSelected(p);
    if (!(0, s.isDefined)(this._shiftFocusedItemIndex)) {
      this._shiftFocusedItemIndex = this._focusedItemIndex;
    }
    if (this._shiftFocusedItemIndex !== this._focusedItemIndex) {
      i = this._focusedItemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      r = d ? this._focusedItemIndex - n : this._focusedItemIndex;
      l = d ? this._shiftFocusedItemIndex - n : this._shiftFocusedItemIndex;
      c = r;
      for (; c !== l; c += i) {
        if (d || this.isDataItem(t[c])) {
          a = h(this.options.getItemData(t[c]));
          this._removeSelectedItem(a);
          u = true;
        }
      }
    }
    if (e !== this._shiftFocusedItemIndex) {
      i = e < this._shiftFocusedItemIndex ? 1 : -1;
      r = d ? e - n : e;
      l = d ? this._shiftFocusedItemIndex - n : this._shiftFocusedItemIndex;
      c = r;
      for (; c !== l; c += i) {
        if (d || this.isDataItem(t[c])) {
          a = h(o = this.options.getItemData(t[c]));
          this._addSelectedItem(o, a);
          u = true;
        }
      }
    }
    if ((!!d || !!this.isDataItem(f)) && !m) {
      this._addSelectedItem(p, g);
      u = true;
    }
    return u;
  };
  t.clearSelectedItems = function () {
    this._setSelectedItems([], []);
  };
  t.selectAll = function (e) {
    this._resetFocusedItemIndex();
    if (e) {
      return this._onePageSelectAll(false);
    } else {
      return this.selectedItemKeys([], true, false, true);
    }
  };
  t.deselectAll = function (e) {
    this._resetFocusedItemIndex();
    if (e) {
      return this._onePageSelectAll(true);
    } else {
      return this.selectedItemKeys([], true, true, true);
    }
  };
  t._onePageSelectAll = function (e) {
    for (var t = this._selectionStrategy.getSelectableItems(this.options.plainItems()), n = 0; n < t.length; n++) {
      var i = t[n];
      if (this.isDataItem(i)) {
        var o = this.options.getItemData(i);
        var a = this.options.keyOf(o);
        var r = this.isItemSelected(a);
        if (!r && !e) {
          this._addSelectedItem(o, a);
        }
        if (r && e) {
          this._removeSelectedItem(a);
        }
      }
    }
    this.onSelectionChanged();
    return new l.Deferred().resolve();
  };
  t.getSelectAllState = function (e) {
    return this._selectionStrategy.getSelectAllState(e);
  };
  t.loadSelectedItemsWithFilter = function () {
    return this._selectionStrategy.loadSelectedItemsWithFilter();
  };
  return e;
}();
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;