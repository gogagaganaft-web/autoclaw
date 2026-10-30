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
exports.default = exports.RemoteStore = undefined;
var o = g(require("./38377.js"));
var a = g(require("./69434.js"));
var r = require("./62754.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./35922.js");
var d = require("./85273.js");
var c = require("./9234.js");
var h = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = p(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
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
var f = require("./98413.js");
function p(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (p = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return _(e);
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
      return _(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return _(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function v(e, t) {
  var n = [];
  (0, l.each)(e, function (i, o) {
    n.push({
      selector: o.dataField,
      groupInterval: o.groupInterval,
      desc: t && o.sortOrder === "desc",
      isExpanded: i < e.length - 1
    });
  });
  return n;
}
function y(e, t, n, i) {
  return [[e, i ? "<" : ">=", n], i ? "or" : "and", [e, i ? ">=" : "<", n + t]];
}
function b(e, t) {
  var n = function (e) {
    var t = e.dataField;
    var n = e.groupInterval;
    if (e.dataType === "date" && typeof n == "string") {
      if (n.toLowerCase() === "quarter") {
        n = "Month";
      }
      t = `${t}.${(0, h.capitalizeFirstLetter)(n)}`;
    }
    return t;
  }(e);
  var i = e.filterType === "exclude";
  var o = [n, i ? "<>" : "=", t];
  if ((0, u.isDefined)(e.groupInterval)) {
    if (typeof e.groupInterval == "string" && e.groupInterval.toLowerCase() === "quarter") {
      o = y(n, 3, (t - 1) * 3 + 1, i);
    } else if (typeof e.groupInterval == "number" && e.dataType !== "date") {
      o = y(n, e.groupInterval, t, i);
    }
  }
  return o;
}
function x(e) {
  var t = [];
  (0, l.each)(e, function (e, n) {
    var i = function e(t, n) {
      var i = [];
      if (t.searchValue) {
        return [t.dataField, "contains", t.searchValue];
      } else {
        n = t.filterType === "exclude" ? n || "and" : n || "or";
        (0, l.each)(t.filterValues, function (o, a) {
          var r = [];
          if (Array.isArray(a)) {
            if (t.levels && t.levels.length) {
              r = e({
                filterValues: a,
                filterType: t.filterType,
                levels: t.levels
              }, "and");
            }
          } else {
            r = b(t.levels ? t.levels[o] : t, a);
          }
          if (r.length) {
            if (i.length) {
              i.push(n);
            }
            i.push(r);
          }
        });
        return i;
      }
    }(n);
    if (!i.length) {
      return [];
    }
    if (t.length) {
      t.push("and");
    }
    t.push(i);
  });
  if (t.length === 1) {
    t = t[0];
  }
  return t;
}
function w(e, t) {
  function n(e) {
    return e && e.length;
  }
  if (n(e) && n(t)) {
    return [e, "and", t];
  } else if (n(e)) {
    return e;
  } else {
    return t;
  }
}
function C(e, t, n, i, o) {
  e[n] = e[n] || [];
  e[n][i] = e[n][i] || [];
  if (!(0, u.isDefined)(e[n][i][o])) {
    e[n][i][o] = t;
  }
}
function S(e, t) {
  if (t && t.dataType === "number" && (0, u.isString)(e)) {
    return Number(e);
  } else if (!t || t.dataType !== "date" || t.groupInterval || e instanceof Date) {
    return e;
  } else {
    return a.default.deserializeDate(e);
  }
}
function k(e, t, n, i) {
  var o = [];
  var a = [];
  var r = i.rowHash;
  var s = i.columnHash;
  if (t && t.summary) {
    (0, l.each)(t.summary, function (e, t) {
      C(i.values, t, i.grandTotalRowIndex, i.grandTotalColumnIndex, e);
    });
  }
  if (t && t.groupCount >= 0) {
    var u = n.rows.length ? n.rowSkip : n.columnSkip;
    (e = m(Array(u)).concat(e)).length = t.groupCount;
  }
  function d(e, t, n, o, a) {
    var r;
    var s;
    var l;
    var u = i[`${t}Hash`];
    var d = n.slice(0, o + 1).join("/");
    if (u[d] !== undefined) {
      s = u[d];
    } else {
      s = {
        value: S(e.key, a),
        index: i[`${t}Index`]++,
        displayText: e.displayText
      };
      l = n.slice(0, o).join("/");
      (o > 0 && u[l] !== undefined ? (r = u[l]).children = r.children || [] : i[`${t}s`]).push(s);
      u[d] = s;
    }
    return s;
  }
  (0, f.forEachGroup)(e, function (e, t) {
    var u;
    var c;
    var h = t >= n.rows.length ? n.rows.length : t;
    var f = t >= n.rows.length ? t - n.rows.length : 0;
    if (!(t >= n.rows.length) || !(f >= n.columns.length)) {
      if (t < n.rows.length) {
        a = [];
      }
      if (t >= n.rows.length) {
        if (e) {
          a[f] = `${e.key}`;
          u = d(e, "column", a, f, n.columns[f]);
          c = r[o.slice(0, h + 1).join("/")];
        } else {
          i.columns.push({});
        }
      } else if (e) {
        o[h] = `${e.key}`;
        c = d(e, "row", o, h, n.rows[h]);
        u = s[a.slice(0, f + 1).join("/")];
      } else {
        i.rows.push({});
      }
      var p = c && c.index || i.grandTotalRowIndex;
      var g = u && u.index || i.grandTotalColumnIndex;
      (0, l.each)(e && e.summary || [], function (e, t) {
        C(i.values, t, p, g, e);
      });
    }
  });
  return i;
}
function D(e) {
  return (e || []).filter(function (e) {
    return e.filterValues && e.filterValues.length || e.searchValue;
  });
}
function I(e, t) {
  if (e.headerName) {
    if (t === e.headerName) {
      return e.path.length;
    }
    if (e.oppositePath) {
      return e.oppositePath.length;
    }
  }
  return 0;
}
function T(e, t, n, i) {
  var o = [];
  var a = n > i ? 0 : i;
  var r = e.headerName !== t ? e[t].slice(a, n) : [];
  var u = t === "rows" ? e.rowExpandedPaths : e.columnExpandedPaths;
  (0, l.each)(r, function (e, t) {
    var i = [];
    (0, l.each)(u, function (t, o) {
      o = o.slice(a, n);
      if (e < o.length) {
        var r = o[e];
        if (!i.includes(r)) {
          i.push(r);
        }
      }
    });
    if (i.length) {
      o.push((0, s.extend)({}, t, {
        filterType: "include",
        filterValues: i
      }));
    }
  });
  return o;
}
function E(e, t, n, i, o, a) {
  var r;
  var l = (t === "columns" ? e.columnExpandedPaths : e.rowExpandedPaths) || [];
  var u = t === "columns" ? "rows" : "columns";
  var d = e[t];
  var c = [];
  if (l.length) {
    for (var h = n; h < i + 1; h += 1) {
      (r = {
        filters: o.concat(T(e, t, h, a))
      })[t] = d.slice(n, h + 1);
      r[u] = [];
      c.push((0, s.extend)({}, e, r));
    }
  } else {
    (r = {
      filters: o
    })[t] = d.slice(n, i + 1);
    r[u] = [];
    c.push((0, s.extend)({}, e, r));
  }
  c[0].includeTotalSummary = true;
  return c;
}
function O(e) {
  var t = 0;
  (0, l.each)(e, function (e, n) {
    if (!n.expanded) {
      t = e;
      return false;
    }
  });
  return t;
}
function A(e) {
  var t = (0, h.getExpandedLevel)(e, "rows");
  var n = (0, h.getExpandedLevel)(e, "columns");
  var i = e.filters || [];
  var o = I(e, "columns");
  var a = O(e.columns);
  var r = O(e.rows);
  var l = I(e, "rows");
  var u = [];
  var d = E(e, "columns", o, n, i = i.concat(D(e.rows)).concat(D(e.columns)).concat(function (e) {
    return (0, h.getFiltersByPath)(e[e.headerName], e.path).concat((0, h.getFiltersByPath)(e[e.headerName === "rows" ? "columns" : "rows"], e.oppositePath || []));
  }(e)), a);
  if (e.rows.length && e.columns.length) {
    if (e.headerName !== "rows") {
      u = u.concat(d);
    }
    for (var c = l; c < t + 1; c += 1) {
      var f = e.rows.slice(l, c + 1);
      var p = T(e, "rows", c, r);
      for (var g = o; g < n + 1; g += 1) {
        var m = (0, s.extend)({}, e, {
          columns: e.columns.slice(o, g + 1),
          rows: f,
          filters: i.concat(T(e, "columns", g, a)).concat(p)
        });
        u.push(m);
      }
    }
  } else {
    u = e.columns.length ? d : E(e, "rows", l, t, i, r);
  }
  return u;
}
function P(e) {
  (0, l.each)(e || [], function (e, t) {
    var n = t.levels;
    if (n) {
      P(n);
    }
    (0, h.setDefaultFieldValueFormatting)(t);
  });
}
var M = o.default.inherit({
  ctor: function (e) {
    this._dataSource = new d.DataSource(e);
    this._store = this._dataSource.store();
  },
  getFields: function (e) {
    var t = new r.Deferred();
    this._store.load({
      skip: 0,
      take: 20
    }).done(function (n) {
      var i = (0, c.normalizeLoadResult)(n);
      t.resolve(h.default.discoverObjectFields(i.data, e));
    }).fail(t.reject);
    return t;
  },
  key: function () {
    return this._store.key();
  },
  load: function (e) {
    var t = this;
    var n = new r.Deferred();
    var i = {
      rows: [],
      columns: [],
      values: [],
      grandTotalRowIndex: 0,
      grandTotalColumnIndex: 0,
      rowHash: {},
      columnHash: {},
      rowIndex: 1,
      columnIndex: 1
    };
    var o = A(e);
    var a = [];
    P(e.rows);
    P(e.columns);
    P(e.filters);
    (0, l.each)(o, function (n, i) {
      a.push(t._store.load(function (e, t, n) {
        var i = x(e.filters);
        var o = v(e.rows, e.rowTake).concat(v(e.columns, e.columnTake));
        var a = {
          groupSummary: [],
          totalSummary: [],
          group: o.length ? o : undefined,
          take: o.length ? undefined : 1
        };
        if (e.rows.length && e.rowTake) {
          a.skip = e.rowSkip;
          a.take = e.rowTake;
          a.requireGroupCount = true;
        } else if (e.columns.length && e.columnTake && !n) {
          a.skip = e.columnSkip;
          a.take = e.columnTake;
          a.requireGroupCount = true;
        }
        if (t) {
          i = w(i, t);
        }
        if (i.length) {
          a.filter = i;
        }
        (0, l.each)(e.values, function (t, n) {
          var i = {
            selector: n.dataField,
            summaryType: n.summaryType || "count"
          };
          a.groupSummary.push(i);
          if (e.includeTotalSummary) {
            a.totalSummary.push(i);
          }
        });
        return a;
      }(i, t.filter(), e.rows.length)));
    });
    r.when.apply(null, a).done(function () {
      var e = a.length > 1 ? arguments : [arguments];
      (0, l.each)(e, function (e, t) {
        var n = (0, c.normalizeLoadResult)(t[0], t[1]);
        k(n.data, n.extra, o[e], i);
      });
      n.resolve({
        rows: i.rows,
        columns: i.columns,
        values: i.values,
        grandTotalRowIndex: i.grandTotalRowIndex,
        grandTotalColumnIndex: i.grandTotalColumnIndex
      });
    }).fail(n.reject);
    return n;
  },
  filter: function () {
    return this._dataSource.filter.apply(this._dataSource, arguments);
  },
  supportPaging: function () {
    return false;
  },
  createDrillDownDataSource: function (e, t) {
    e = e || {};
    t = t || {};
    var n = this._store;
    var i = x((0, h.getFiltersByPath)(e.rows, t.rowPath).concat((0, h.getFiltersByPath)(e.columns, t.columnPath)).concat(D(e.rows)).concat(e.filters || []).concat(D(e.columns)));
    return new d.DataSource({
      load: function (e) {
        return n.load((0, s.extend)({}, e, {
          filter: w(i, e.filter),
          select: t.customColumns
        }));
      }
    });
  }
});
exports.RemoteStore = M;
var R = {
  RemoteStore: M
};
exports.default = R;