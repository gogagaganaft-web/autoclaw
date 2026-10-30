exports.default = undefined;
var i = require("./20576.js");
var o = require("./35922.js");
var a = require("./89386.js");
var r = require("./34671.js");
var s = c(require("./96687.js"));
var l = require("./62754.js");
var u = require("./49601.js");
var d = c(require("./96688.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = function (e) {
  var t;
  var n;
  function c(t) {
    var n;
    (n = e.call(this, t) || this)._initSelectedItemKeyHash();
    return n;
  }
  n = e;
  (t = c).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var f = c.prototype;
  f._initSelectedItemKeyHash = function () {
    this._setOption("keyHashIndices", this.options.equalByReference ? null : {});
  };
  f.getSelectedItemKeys = function () {
    return this.options.selectedItemKeys.slice(0);
  };
  f.getSelectedItems = function () {
    return this.options.selectedItems.slice(0);
  };
  f._preserveSelectionUpdate = function (e, t) {
    var n;
    var i;
    var o;
    var a = this.options.keyOf;
    if (a) {
      var r = t && e.length > 1 && !this.options.equalByReference;
      if (r) {
        n = {};
      }
      o = 0;
      for (; o < e.length; o++) {
        var s = e[o];
        var l = a(s);
        if (t) {
          i = this.removeSelectedItem(l, n, s == null ? undefined : s.disabled);
          if (n && i >= 0) {
            n[i] = true;
          }
        } else {
          this.addSelectedItem(l, s);
        }
      }
      if (r) {
        this._batchRemoveSelectedItems(n);
      }
    }
  };
  f._batchRemoveSelectedItems = function (e) {
    var t = this.options.selectedItemKeys.slice(0);
    var n = this.options.selectedItems.slice(0);
    this.options.selectedItemKeys.length = 0;
    this.options.selectedItems.length = 0;
    for (var i = 0; i < t.length; i++) {
      if (!e[i]) {
        this.options.selectedItemKeys.push(t[i]);
        this.options.selectedItems.push(n[i]);
      }
    }
    this._initSelectedItemKeyHash();
    this.updateSelectedItemKeyHash(this.options.selectedItemKeys);
  };
  f._loadSelectedItemsCore = function (e, t, n, i, o = false) {
    var a = new l.Deferred();
    var r = this.options.key();
    if (!e.length && !n) {
      a.resolve([]);
      return a;
    }
    if (n && t && !i) {
      a.resolve(this.getSelectedItems());
      return a;
    }
    var d = new u.SelectionFilterCreator(e, n);
    var c = d.getCombinedFilter(r, i, o);
    var h = [];
    if (t) {
      var f = this.options.selectedItems;
      h = c && e.length !== f.length ? (0, s.default)(f).filter(c).toArray() : f.slice(0);
    }
    var p = h.length ? h : this.options.plainItems(true).filter(this.options.isSelectableItem).map(this.options.getItemData);
    var g = d.getLocalFilter(this.options.keyOf, this.equalKeys.bind(this), this.options.equalByReference, r);
    p = p.filter(g);
    if (h.length || !n && p.length === e.length) {
      a.resolve(p);
    } else {
      a = this._loadFilteredData(c, g, null, n);
    }
    return a;
  };
  f._replaceSelectionUpdate = function (e) {
    var t = [];
    var n = this.options.keyOf;
    if (n) {
      for (var i = 0; i < e.length; i++) {
        var o = n(e[i]);
        t.push(o);
      }
      this.setSelectedItems(t, e);
    }
  };
  f._warnOnIncorrectKeys = function (e) {
    var t = this.options.allowNullValue;
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      if ((!t || i !== null) && !this.isItemKeySelected(i)) {
        d.default.log("W1002", i);
      }
    }
  };
  f._isMultiSelectEnabled = function () {
    var e = this.options.mode;
    return e === "all" || e === "multiple";
  };
  f._requestInProgress = function () {
    var e;
    return ((e = this._lastLoadDeferred) === null || e === undefined ? undefined : e.state()) === "pending";
  };
  f._concatRequestsItems = function (e, t, n, i) {
    var o;
    var r = t ? e : [];
    o = i || (0, a.removeDuplicates)(e, this.options.selectedItemKeys);
    return {
      addedItems: n.added.concat(o),
      removedItems: n.removed.concat(r),
      keys: e
    };
  };
  f._collectLastRequestData = function (e, t, n, i) {
    var o = t && n;
    var a = {
      added: [],
      removed: []
    };
    var s = this._isMultiSelectEnabled();
    var l = s ? this._lastRequestData : {};
    if (s) {
      if (this._shouldMergeWithLastRequest) {
        if (o) {
          this._lastLoadDeferred.reject();
          l = {};
        } else if (!(0, r.isKeysEqual)(e, this.options.selectedItemKeys)) {
          a.added = l.addedItems;
          a.removed = l.removedItems;
          if (!t) {
            this._lastLoadDeferred.reject();
          }
        }
      }
      l = this._concatRequestsItems(e, t, a, this._shouldMergeWithLastRequest ? undefined : i);
    }
    return l;
  };
  f._updateKeysByLastRequestData = function (e, t, n) {
    var r = e;
    if (this._isMultiSelectEnabled() && this._shouldMergeWithLastRequest && !t && !n) {
      r = (0, a.removeDuplicates)(e.concat(this._lastRequestData?.addedItems), this._lastRequestData?.removedItems);
      r = (0, a.getUniqueValues)(r);
    }
    return r;
  };
  f._loadSelectedItems = function (e, t, n, i, o = false) {
    var a = this;
    var r = new l.Deferred();
    var s = a.options.filter();
    this._shouldMergeWithLastRequest = this._requestInProgress();
    this._lastRequestData = this._collectLastRequestData(e, t, n, i);
    (0, l.when)(a._lastLoadDeferred).always(function () {
      var i = a._updateKeysByLastRequestData(e, t, n);
      a._shouldMergeWithLastRequest = false;
      a._loadSelectedItemsCore(i, t, n, s, o).done(r.resolve).fail(r.reject);
    });
    a._lastLoadDeferred = r;
    return r;
  };
  f.selectedItemKeys = function (e, t, n, i, o, a = false) {
    var r = this;
    var s = r._loadSelectedItems(e, n, i, o, a);
    s.done(function (e) {
      if (t) {
        r._preserveSelectionUpdate(e, n);
      } else {
        r._replaceSelectionUpdate(e);
      }
      r.onSelectionChanged();
    });
    return s;
  };
  f.addSelectedItem = function (e, t) {
    if ((0, o.isDefined)(t) && !this.options.ignoreDisabledItems && t.disabled) {
      if (this.options.disabledItemKeys.indexOf(e) === -1) {
        this.options.disabledItemKeys.push(e);
      }
    } else {
      var n = this._getKeyHash(e);
      if (this._indexOfSelectedItemKey(n) === -1) {
        if (!(0, o.isObject)(n) && this.options.keyHashIndices) {
          this.options.keyHashIndices[n] = [this.options.selectedItemKeys.length];
        }
        this.options.selectedItemKeys.push(e);
        this.options.addedItemKeys.push(e);
        this.options.addedItems.push(t);
        this.options.selectedItems.push(t);
      }
    }
  };
  f._getSelectedIndexByKey = function (e, t) {
    for (var n = this.options.selectedItemKeys, i = 0; i < n.length; i++) {
      if ((!t || !t[i]) && this.equalKeys(n[i], e)) {
        return i;
      }
    }
    return -1;
  };
  f._getSelectedIndexByHash = function (e, t) {
    var n = this.options.keyHashIndices[e];
    if (n && n.length > 1 && t) {
      n = n.filter(function (e) {
        return !t[e];
      });
    }
    if (n && n[0] >= 0) {
      return n[0];
    } else {
      return -1;
    }
  };
  f._indexOfSelectedItemKey = function (e, t) {
    if (this.options.equalByReference) {
      return this.options.selectedItemKeys.indexOf(e);
    } else if ((0, o.isObject)(e)) {
      return this._getSelectedIndexByKey(e, t);
    } else {
      return this._getSelectedIndexByHash(e, t);
    }
  };
  f._shiftSelectedKeyIndices = function (e) {
    for (var t = e; t < this.options.selectedItemKeys.length; t++) {
      var n = this.options.selectedItemKeys[t];
      var o = (0, i.getKeyHash)(n);
      var a = this.options.keyHashIndices[o];
      if (a) {
        for (var r = 0; r < a.length; r++) {
          if (a[r] > e) {
            a[r]--;
          }
        }
      }
    }
  };
  f.removeSelectedItem = function (e, t, n) {
    if (this.options.ignoreDisabledItems || !n) {
      var i = this._getKeyHash(e);
      var a = !!t;
      var r = this._indexOfSelectedItemKey(i, t);
      if (r < 0) {
        return r;
      }
      this.options.removedItemKeys.push(e);
      this.options.removedItems.push(this.options.selectedItems[r]);
      if (a) {
        return r;
      }
      this.options.selectedItemKeys.splice(r, 1);
      this.options.selectedItems.splice(r, 1);
      if ((0, o.isObject)(i) || !this.options.keyHashIndices) {
        return r;
      }
      var s = this.options.keyHashIndices[i];
      if (s) {
        s.shift();
        if (!s.length) {
          delete this.options.keyHashIndices[i];
        }
        this._shiftSelectedKeyIndices(r);
        return r;
      } else {
        return r;
      }
    }
  };
  f._updateAddedItemKeys = function (e, t) {
    for (var n = 0; n < e.length; n++) {
      if (!this.isItemKeySelected(e[n])) {
        this.options.addedItemKeys.push(e[n]);
        this.options.addedItems.push(t[n]);
      }
    }
  };
  f._updateRemovedItemKeys = function (e, t, n) {
    for (var i = 0; i < t.length; i++) {
      if (!this.isItemKeySelected(t[i])) {
        this.options.removedItemKeys.push(t[i]);
        this.options.removedItems.push(n[i]);
      }
    }
  };
  f._isItemSelectionInProgress = function (e, t) {
    return !!t && !!this._lastRequestData && !!this._requestInProgress() && (this._lastRequestData.addedItems ?? []).includes(e);
  };
  f._getKeyHash = function (e) {
    if (this.options.equalByReference) {
      return e;
    } else {
      return (0, i.getKeyHash)(e);
    }
  };
  f.setSelectedItems = function (e, t) {
    this._updateAddedItemKeys(e, t);
    var n = this.options.selectedItemKeys;
    var i = this.options.selectedItems;
    if (!this.options.equalByReference) {
      this._initSelectedItemKeyHash();
      this.updateSelectedItemKeyHash(e);
    }
    this._setOption("selectedItemKeys", e);
    this._setOption("selectedItems", t);
    this._updateRemovedItemKeys(e, n, i);
  };
  f.isItemDataSelected = function (e, t = {}) {
    var n = this.options.keyOf(e);
    return this.isItemKeySelected(n, t);
  };
  f.isItemKeySelected = function (e, t = {}) {
    var n = this._isItemSelectionInProgress(e, t.checkPending);
    if (!n) {
      var i = this._getKeyHash(e);
      var o = this._indexOfSelectedItemKey(i);
      n = o !== -1;
    }
    return n;
  };
  f.getSelectAllState = function (e) {
    if (e) {
      return this._getVisibleSelectAllState();
    } else {
      return this._getFullSelectAllState();
    }
  };
  f.loadSelectedItemsWithFilter = function () {
    var e = this.options.key();
    var t = this.getSelectedItemKeys();
    var n = this.options.filter();
    if (!t.length) {
      return (0, l.Deferred)().resolve([]);
    }
    var i = new u.SelectionFilterCreator(t).getCombinedFilter(e, n, true);
    return this._loadFilteredData(i);
  };
  return c;
}(c(require("./34344.js")).default);
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;