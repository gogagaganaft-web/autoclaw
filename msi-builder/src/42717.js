function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cell = undefined;
exports.applyDisplaySummaryMode = b;
exports.applyRunningTotal = x;
exports.createMockSummaryCell = w;
exports.default = undefined;
exports.getExpression = v;
exports.summaryDictionary = undefined;
var o = require("./13306.js");
var a = require("./35922.js");
var r = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = s(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var l = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (l && (l.get || l.set)) {
        Object.defineProperty(o, r, l);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./28580.js"));
function s(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (s = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
var l = "row";
function u(e, t) {
  var n = e / t;
  if (!(0, a.isDefined)(e) || !!isNaN(n)) {
    n = null;
  }
  return n;
}
function d(e, t) {
  return u(e.value(), e.grandTotal(t).value());
}
function c(e, t) {
  var n = e.parent(t);
  var i = n ? n.value() : e.value();
  return u(e.value(), i);
}
function h(e) {
  return function (t) {
    var n = t.prev("column", e);
    var i = n && n.value();
    if ((0, a.isDefined)(i) && (0, a.isDefined)(t.value())) {
      return t.value() - i;
    } else {
      return null;
    }
  };
}
var f = {
  percentOfColumnTotal: function (e) {
    return c(e, l);
  },
  percentOfRowTotal: function (e) {
    return c(e, "column");
  },
  percentOfColumnGrandTotal: function (e) {
    return d(e, l);
  },
  percentOfRowGrandTotal: function (e) {
    return d(e, "column");
  },
  percentOfGrandTotal: function (e) {
    return d(e);
  }
};
exports.summaryDictionary = f;
function p(e) {
  if (e.runningTotal) {
    var t = e.runningTotal === "column" ? l : "column";
    return function (n) {
      var i = e.allowCrossGroupCalculation ? function e(t, n) {
        if (t && t.parent(n)) {
          var i = t.prev(n);
          i ||= e(t.parent(n), n);
          return i;
        }
      }(n, t) : n.prev(t, false);
      var o = n.value(true);
      var r = i && i.value(true);
      if ((0, a.isDefined)(r) && (0, a.isDefined)(o)) {
        o = r + o;
      } else if ((0, a.isDefined)(r)) {
        o = r;
      }
      return o;
    };
  }
}
function g(e, t, n) {
  var i = {
    index: -1
  };
  if (!(0, a.isObject)(t)) {
    if (n.fields[t]) {
      t = n[t];
    } else {
      var o = e.columns.concat(e.rows).concat(e.values);
      var s = (0, r.findField)(o, t);
      t = n[t] = o[s];
    }
  }
  if (t) {
    var l = t.area || "data";
    i = n.positions[t.index] = n.positions[t.index] || {
      area: l,
      index: e[l === "data" ? "values" : `${l}s`].indexOf(t)
    };
  }
  return i;
}
function m(e) {
  if (e === l) {
    return "_rowPath";
  } else {
    return "_columnPath";
  }
}
function _(e, t, n, i, o, a) {
  this._columnPath = e;
  this._rowPath = t;
  this._fieldIndex = o;
  this._fieldsCache = a || {
    fields: {},
    positions: {}
  };
  this._data = n;
  this._descriptions = i;
  var r = n.values && n.values[t[0].index] && n.values[t[0].index][e[0].index];
  if (r) {
    r.originalCell = r.originalCell || r.slice();
    r.postProcessedFlags = r.postProcessedFlags || [];
    this._cell = r;
  }
}
function v(e) {
  var t;
  var n;
  var i = e.summaryDisplayMode;
  var o = e.allowCrossGroupCalculation;
  var s = null;
  if ((0, a.isFunction)(e.calculateSummaryValue)) {
    s = e.calculateSummaryValue;
  } else if (i) {
    if (i === "absoluteVariation") {
      s = h(o);
    } else if (i === "percentVariation") {
      n = h(t = o);
      s = function (e) {
        var i = n(e);
        var o = e.prev("column", t);
        var a = o && o.value();
        if (i !== null && a) {
          return i / a;
        } else {
          return null;
        }
      };
    } else {
      s = f[i];
    }
    if (s && !e.format && i.indexOf("percent") !== -1) {
      r.default.setFieldProperty(e, "format", "percent");
    }
  }
  return s;
}
function y(e, t, n, i) {
  var o = e.values[t][n] = e.values[t][n] || [];
  var a = o.originalCell;
  if (a) {
    if (!!o.allowResetting || !i) {
      e.values[t][n] = a.slice();
    }
    e.values[t][n].allowResetting = i;
  }
}
function b(e, t) {
  var n = [];
  var i = [{
    index: t.grandTotalColumnIndex,
    children: t.columns
  }];
  var o = [{
    index: t.grandTotalRowIndex,
    children: t.rows
  }];
  var a = e.values;
  var s = {
    fields: {},
    positions: {}
  };
  t.values = t.values || [];
  (0, r.foreachTree)(i, function (e) {
    e[0].isEmpty = [];
  }, false);
  (0, r.foreachTree)(o, function (o) {
    var l = o[0];
    l.isEmpty = [];
    t.values[l.index] = t.values[l.index] || [];
    (0, r.foreachTree)(i, function (i) {
      var r;
      var u = i[0];
      y(t, l.index, u.index, false);
      for (var d = 0; d < a.length; d += 1) {
        var c = a[d];
        var h = n[d] = n[d] === undefined ? v(c) : n[d];
        r = false;
        if (h) {
          var f = new _(i, o, t, e, d, s);
          var p = f.cell();
          var g = p[d] = h(f);
          p.postProcessedFlags[d] = true;
          r = g == null;
        }
        if (u.isEmpty[d] === undefined) {
          u.isEmpty[d] = true;
        }
        if (l.isEmpty[d] === undefined) {
          l.isEmpty[d] = true;
        }
        if (!r) {
          l.isEmpty[d] = u.isEmpty[d] = false;
        }
      }
    }, false);
  }, false);
  t.isEmptyGrandTotalRow = o[0].isEmpty;
  t.isEmptyGrandTotalColumn = i[0].isEmpty;
}
function x(e, t) {
  var n = [];
  var i = [{
    index: t.grandTotalColumnIndex,
    children: t.columns
  }];
  var o = [{
    index: t.grandTotalRowIndex,
    children: t.rows
  }];
  var a = e.values;
  var s = {
    fields: {},
    positions: {}
  };
  t.values = t.values || [];
  (0, r.foreachTree)(o, function (o) {
    var l = o[0];
    t.values[l.index] = t.values[l.index] || [];
    (0, r.foreachTree)(i, function (i) {
      var r = i[0];
      y(t, l.index, r.index, true);
      for (var u = 0; u < a.length; u += 1) {
        var d = a[u];
        var c = n[u] = n[u] === undefined ? p(d) : n[u];
        if (c) {
          var h = new _(i, o, t, e, u, s);
          var f = h.cell();
          f[u] = c(h);
          f.postProcessedFlags[u] = true;
        }
      }
    }, false);
  }, false);
}
function w(e, t, n) {
  var i = new _([], [], {}, e, 0);
  i.value = function (i) {
    if ((0, a.isDefined)(i)) {
      var o = (0, r.findField)(t, i);
      var s = t[o];
      if (!n[o] && !!s && !(0, a.isDefined)(s.area)) {
        e.values.push(s);
        n[o] = true;
      }
    }
  };
  i.grandTotal = function () {
    return this;
  };
  i.children = function () {
    return [];
  };
  return i;
}
exports.Cell = _;
_.prototype = (0, o.extend)(_.prototype, {
  _getPath: function (e) {
    return this[m(e)];
  },
  _getDimension: function (e) {
    e = e === l ? "rows" : "columns";
    return this._descriptions[e];
  },
  _createCell: function (e) {
    return new _(e._columnPath || this._columnPath, e._rowPath || this._rowPath, this._data, this._descriptions, this._fieldIndex);
  },
  parent: function (e) {
    var t = this._getPath(e).slice();
    var n = {};
    t.shift();
    if (t.length) {
      n[m(e)] = t;
      return this._createCell(n);
    } else {
      return null;
    }
  },
  children: function (e) {
    var t = this._getPath(e).slice();
    var n = t[0];
    var i = [];
    var o = {};
    if (n.children) {
      for (var a = 0; a < n.children.length; a += 1) {
        o[m(e)] = [n.children[a]].concat(t.slice());
        i.push(this._createCell(o));
      }
    }
    return i;
  },
  grandTotal: function (e) {
    var t = {};
    var n = this._rowPath;
    var i = this._columnPath;
    var o = this._getPath(e);
    var a = m(e);
    if (e) {
      t[a] = [o[o.length - 1]];
    } else {
      t._rowPath = [n[n.length - 1]];
      t._columnPath = [i[i.length - 1]];
    }
    return this._createCell(t);
  },
  next: function (e, t) {
    var n;
    var i = this._getPath(e);
    var o = i[0];
    var a = this.parent(e);
    if (a) {
      var r = i[1].children.indexOf(o);
      if ((n = a.children(e))[r + 1]) {
        return n[r + 1];
      }
    }
    if (t && a) {
      do {
        n = (a = a.next(e, t)) ? a.children(e) : [];
      } while (a && !n.length);
      return n[0] || null;
    }
    return null;
  },
  prev: function (e, t) {
    var n;
    var i = this._getPath(e);
    var o = i[0];
    var a = this.parent(e);
    if (a) {
      var r = i[1].children.indexOf(o);
      if ((n = a.children(e))[r - 1]) {
        return n[r - 1];
      }
    }
    if (t && a) {
      do {
        n = (a = a.prev(e, t)) ? a.children(e) : [];
      } while (a && !n.length);
      return n[n.length - 1] || null;
    }
    return null;
  },
  cell: function () {
    return this._cell;
  },
  field: function (e) {
    if (e === "data") {
      return this._descriptions.values[this._fieldIndex];
    }
    var t = this._getPath(e);
    var n = this._getDimension(e)[t.length - 2];
    return n || null;
  },
  child: function (e, t) {
    var n;
    for (var i = this.children(e), o = 0; o < i.length; o += 1) {
      n = n || i[o].field(e);
      if (i[o].value(n) === t) {
        return i[o];
      }
    }
    return null;
  },
  slice: function (e, t) {
    var n = {};
    var i = g(this._descriptions, e, this._fieldsCache);
    var o = i.area;
    var a = i.index;
    var r = null;
    if (o === l || o === "column") {
      var s = this._getPath(o).slice();
      var u = a !== -1 && s.length - 2 - a;
      if (s[u]) {
        [][s.length - 1] = s[s.length - 1];
        for (var d = u; d >= 0; d -= 1) {
          if (s[d + 1]) {
            var c = s[d + 1].children || [];
            var h = d === u ? t : s[d].value;
            s[d] = undefined;
            for (var f = 0; f < c.length; f += 1) {
              if (c[f].value === h) {
                s[d] = c[f];
                break;
              }
            }
          }
          if (s[d] === undefined) {
            return r;
          }
        }
        n[m(o)] = s;
        r = this._createCell(n);
      }
    }
    return r;
  },
  value: function (e, t) {
    var n = this._cell;
    var i = this._fieldIndex;
    var o = e === true || e === false;
    var r = o ? null : e;
    var s = o && e || t;
    if ((0, a.isDefined)(r)) {
      var l = g(this._descriptions, r, this._fieldsCache);
      i = l.index;
      if (l.area !== "data") {
        var u = this._getPath(l.area);
        var d = i !== -1 && u.length - 2 - i;
        return u[d] && u[d].value;
      }
    }
    if (n && n.originalCell) {
      if (s) {
        return n[i];
      } else {
        return n.originalCell[i];
      }
    } else {
      return null;
    }
  },
  isPostProcessed: function (e) {
    var t = this._fieldIndex;
    if ((0, a.isDefined)(e)) {
      var n = g(this._descriptions, e, this._fieldsCache);
      t = n.index;
      if (n.area !== "data") {
        return false;
      }
    }
    return !!this._cell && !!this._cell.postProcessedFlags[t];
  }
});
var C = {
  Cell: _,
  summaryDictionary: f,
  getExpression: v,
  applyRunningTotal: x,
  createMockSummaryCell: w,
  applyDisplaySummaryMode: b
};
exports.default = C;