exports.default = undefined;
var i;
var o = (i = require("./96687.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./20576.js");
var r = require("./35922.js");
var s = require("./62754.js");
var l = function () {
  function e(e) {
    this.options = e;
    this._setOption("disabledItemKeys", []);
    this._clearItemKeys();
  }
  var t = e.prototype;
  t._clearItemKeys = function () {
    this._setOption("addedItemKeys", []);
    this._setOption("removedItemKeys", []);
    this._setOption("removedItems", []);
    this._setOption("addedItems", []);
  };
  t.validate = function () {};
  t._setOption = function (e, t) {
    this.options[e] = t;
  };
  t.onSelectionChanged = function () {
    var e = this.options.addedItemKeys;
    var t = this.options.removedItemKeys;
    var n = this.options.addedItems;
    var i = this.options.removedItems;
    var o = this.options.selectedItems;
    var r = this.options.selectedItemKeys;
    var s = this.options.onSelectionChanged || a.noop;
    this._clearItemKeys();
    s({
      selectedItems: o,
      selectedItemKeys: r,
      addedItemKeys: e,
      removedItemKeys: t,
      addedItems: n,
      removedItems: i
    });
  };
  t.equalKeys = function (e, t) {
    if (this.options.equalByReference && (0, r.isObject)(e) && (0, r.isObject)(t)) {
      return e === t;
    } else {
      return (0, a.equalByValue)(e, t);
    }
  };
  t.getSelectableItems = function (e) {
    return e.filter(function (e) {
      return e == null || !e.disabled;
    });
  };
  t._clearSelection = function (e, t, n, i) {
    e = e || [];
    e = Array.isArray(e) ? e : [e];
    this.validate();
    return this.selectedItemKeys(e, t, n, i);
  };
  t._removeTemplateProperty = function (e) {
    var t = this;
    if (Array.isArray(e)) {
      return e.map(function (e) {
        return t._removeTemplateProperty(e);
      });
    } else {
      if ((0, r.isObject)(e)) {
        delete e.template;
      }
      return e;
    }
  };
  t._loadFilteredData = function (e, t, n, i) {
    var a = encodeURI(JSON.stringify(this._removeTemplateProperty(e))).length;
    var l = this.options.maxFilterLengthInRequest && a > this.options.maxFilterLengthInRequest;
    var u = new s.Deferred();
    var d = {
      filter: l ? undefined : e,
      select: l ? this.options.dataFields() : n || this.options.dataFields()
    };
    if (e && e.length === 0) {
      u.resolve([]);
    } else {
      this.options.load(d).done(function (n) {
        var a = (0, r.isPlainObject)(n) ? n.data : n;
        if (t && !i) {
          a = a.filter(t);
        } else if (l) {
          a = (0, o.default)(a).filter(e).toArray();
        }
        u.resolve(a);
      }).fail(u.reject.bind(u));
    }
    return u;
  };
  t.updateSelectedItemKeyHash = function (e) {
    for (var t = 0; t < e.length; t++) {
      var n = (0, a.getKeyHash)(e[t]);
      if (!(0, r.isObject)(n)) {
        this.options.keyHashIndices[n] = this.options.keyHashIndices[n] || [];
        this.options.keyHashIndices[n].push(t);
      }
    }
  };
  t._isAnyItemSelected = function (e) {
    for (var t = 0; t < e.length; t++) {
      if (this.options.isItemSelected(e[t])) {
        return;
      }
    }
    return false;
  };
  t._getFullSelectAllState = function () {
    var e = this.options.plainItems();
    var t = this.options.filter();
    var n = this.options.ignoreDisabledItems ? this.options.selectedItems : this.options.selectedItems.filter(function (e) {
      return e == null || !e.disabled;
    });
    if (t) {
      n = (0, o.default)(n).filter(t).toArray();
    }
    var i = n.length;
    var a = e.length - this.getSelectableItems(e).length;
    if (i) {
      return i >= this.options.totalCount() - a || undefined;
    } else {
      return this._isAnyItemSelected(e);
    }
  };
  t._getVisibleSelectAllState = function () {
    for (var e = this.getSelectableItems(this.options.plainItems()), t = false, n = false, i = 0; i < e.length; i++) {
      var o = e[i];
      var a = this.options.getItemData(o);
      var r = this.options.keyOf(a);
      if (this.options.isSelectableItem(o)) {
        if (this.isItemKeySelected(r)) {
          t = true;
        } else {
          n = true;
        }
      }
    }
    return !!t && (!n || undefined);
  };
  return e;
}();
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;