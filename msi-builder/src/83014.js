exports.default = undefined;
var i = require("./35922.js");
var o = l(require("./34344.js"));
var a = l(require("./96688.js"));
var r = l(require("./96687.js"));
var s = require("./62754.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var l = o.prototype;
  l.getSelectedItems = function () {
    return this._loadFilteredData(this.options.selectionFilter);
  };
  l.getSelectedItemKeys = function () {
    var e = new s.Deferred();
    var t = this;
    var n = this.options.key();
    var o = (0, i.isString)(n) ? [n] : n;
    this._loadFilteredData(this.options.selectionFilter, null, o).done(function (n) {
      var i = n.map(function (e) {
        return t.options.keyOf(e);
      });
      e.resolve(i);
    }).fail(e.reject);
    return e.promise();
  };
  l.selectedItemKeys = function (e, t, n, i) {
    if (i) {
      var o = this.options.filter();
      if (!o || JSON.stringify(o) === JSON.stringify(this.options.selectionFilter) && n) {
        this._setOption("selectionFilter", n ? [] : null);
      } else {
        this._addSelectionFilter(n, o, i);
      }
    } else {
      if (!t) {
        this._setOption("selectionFilter", []);
      }
      for (var a = 0; a < e.length; a++) {
        if (n) {
          this.removeSelectedItem(e[a]);
        } else {
          this.addSelectedItem(e[a], i, !t);
        }
      }
    }
    this.onSelectionChanged();
    return new s.Deferred().resolve();
  };
  l.setSelectedItems = function (e) {
    this._setOption("selectionFilter", null);
    for (var t = 0; t < e.length; t++) {
      this.addSelectedItem(e[t]);
    }
  };
  l.isItemDataSelected = function (e) {
    return this.isItemKeySelected(e);
  };
  l.isItemKeySelected = function (e) {
    var t = this.options.selectionFilter;
    return !t || !!(0, r.default)([e]).filter(t).toArray().length;
  };
  l._getKeyExpr = function () {
    var e = this.options.key();
    if (Array.isArray(e) && e.length === 1) {
      return e[0];
    } else {
      return e;
    }
  };
  l._normalizeKey = function (e) {
    var t = this.options.key();
    if (Array.isArray(t) && t.length === 1) {
      return e[t[0]];
    } else {
      return e;
    }
  };
  l._getFilterByKey = function (e) {
    var t = this._getKeyExpr();
    var n = [t, "=", this._normalizeKey(e)];
    if (Array.isArray(t)) {
      n = [];
      for (var i = 0; i < t.length; i++) {
        n.push([t[i], "=", e[t[i]]]);
        if (i !== t.length - 1) {
          n.push("and");
        }
      }
    }
    return n;
  };
  l.addSelectedItem = function (e, t, n) {
    var i = this._getFilterByKey(e);
    this._addSelectionFilter(false, i, t, n);
  };
  l.removeSelectedItem = function (e) {
    var t = this._getFilterByKey(e);
    this._addSelectionFilter(true, t);
  };
  l.validate = function () {
    var e = this.options.key;
    if (e && e() === undefined) {
      throw a.default.Error("E1042", "Deferred selection");
    }
  };
  l._findSubFilter = function (e, t) {
    if (!e) {
      return -1;
    }
    var n = JSON.stringify(t);
    for (var i = 0; i < e.length; i++) {
      var o = e[i];
      if (o && JSON.stringify(o) === n) {
        return i;
      }
    }
    return -1;
  };
  l._isLastSubFilter = function (e, t) {
    return !!e && !!t && (this._findSubFilter(e, t) === e.length - 1 || this._findSubFilter([e], t) === 0);
  };
  l._addFilterOperator = function (e, t) {
    if (e.length > 1 && (0, i.isString)(e[1]) && e[1] !== t) {
      e = [e];
    }
    if (e.length) {
      e.push(t);
    }
    return e;
  };
  l._denormalizeFilter = function (e) {
    if (e && (0, i.isString)(e[0])) {
      e = [e];
    }
    return e;
  };
  l._isOnlyNegativeFiltersLeft = function (e) {
    return e.every(function (e, t) {
      if (t % 2 == 0) {
        return Array.isArray(e) && e[0] === "!";
      } else {
        return e === "and";
      }
    });
  };
  l._addSelectionFilter = function (e, t, n, i) {
    var o;
    var a = e ? ["!", t] : t;
    var r = e ? "and" : "or";
    var s = true;
    var l = this.options.selectionFilter || [];
    if ((o = l = this._denormalizeFilter(l)) !== null && o !== undefined && o.length && !i) {
      var u = this._removeSameFilter(l, t, e, n);
      var d = this._removeSameFilter(l, t, !e);
      if (e && (u !== -1 || d !== -1) && this._isOnlyNegativeFiltersLeft(l)) {
        l = [];
      }
      var c = this._isKeyFilter(t) && this._hasKeyFiltersOnlyStartingFromIndex(l, d);
      s = t.length && !c;
    }
    if (s) {
      (l = this._addFilterOperator(l, r)).push(a);
    }
    l = this._normalizeFilter(l);
    this._setOption("selectionFilter", e || l.length ? l : null);
  };
  l._normalizeFilter = function (e) {
    if (e && e.length === 1) {
      e = e[0];
    }
    return e;
  };
  l._removeFilterByIndex = function (e, t, n) {
    var i = e[1];
    if (t > 0) {
      e.splice(t - 1, 2);
    } else {
      e.splice(t, 2);
    }
    if (n && i === "and") {
      e.splice(0, e.length);
    }
  };
  l._isSimpleKeyFilter = function (e, t) {
    return e.length === 3 && e[0] === t && e[1] === "=";
  };
  l._isKeyFilter = function (e) {
    if (e.length === 2 && e[0] === "!") {
      return this._isKeyFilter(e[1]);
    }
    var t = this._getKeyExpr();
    if (Array.isArray(t)) {
      if (e.length !== t.length * 2 - 1) {
        return false;
      }
      for (var n = 0; n < t.length; n++) {
        if (n > 0 && e[n * 2 - 1] !== "and") {
          return false;
        }
        if (!this._isSimpleKeyFilter(e[n * 2], t[n])) {
          return false;
        }
      }
      return true;
    }
    return this._isSimpleKeyFilter(e, t);
  };
  l._hasKeyFiltersOnlyStartingFromIndex = function (e, t) {
    if (t >= 0) {
      for (var n = t; n < e.length; n++) {
        if (typeof e[n] != "string" && !this._isKeyFilter(e[n])) {
          return false;
        }
      }
      return true;
    }
    return false;
  };
  l._removeSameFilter = function (e, t, n, i) {
    t = n ? ["!", t] : t;
    if (JSON.stringify(t) === JSON.stringify(e)) {
      e.splice(0, e.length);
      return 0;
    }
    var o = this._findSubFilter(e, t);
    if (o >= 0) {
      this._removeFilterByIndex(e, o, i);
      return o;
    }
    for (var a = 0; a < e.length; a++) {
      if (Array.isArray(e[a]) && e[a].length > 2) {
        var r = this._removeSameFilter(e[a], t, false, i);
        if (r >= 0) {
          if (e[a].length) {
            if (e[a].length === 1) {
              e[a] = e[a][0];
            }
          } else {
            this._removeFilterByIndex(e, a, i);
          }
          return r;
        }
      }
    }
    return -1;
  };
  l.getSelectAllState = function () {
    var e = this.options.filter();
    var t = this.options.selectionFilter;
    return !t || !!t.length && (e && e.length ? (t = this._denormalizeFilter(t), !!this._isLastSubFilter(t, e) || !this._isLastSubFilter(t, ["!", e]) && undefined) : undefined);
  };
  l.loadSelectedItemsWithFilter = function () {
    var e = this.options.filter();
    var t = this.options.selectionFilter;
    var n = e ? [e, "and", t] : t;
    return this._loadFilteredData(n);
  };
  return o;
}(o.default);
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;