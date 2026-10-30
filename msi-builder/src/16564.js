Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LocalStore = undefined;
var i = m(require("./38377.js"));
var o = require("./20576.js");
var a = require("./47617.js");
var r = m(require("./69434.js"));
var s = require("./62754.js");
var l = require("./95479.js");
var u = require("./35922.js");
var d = m(require("./26562.js"));
var c = m(require("./88036.js"));
var h = require("./85273.js");
var f = m(require("./96687.js"));
var p = require("./16454.js");
var g = require("./28580.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _ = i.default.inherit(function () {
  var e = {
    year: function (e) {
      return e && e.getFullYear();
    },
    quarter: function (e) {
      return e && Math.floor(e.getMonth() / 3) + 1;
    },
    month: function (e) {
      return e && e.getMonth() + 1;
    },
    day: function (e) {
      return e && e.getDate();
    },
    dayOfWeek: function (e) {
      return e && e.getDay();
    }
  };
  function t(e) {
    if (e.indexOf(".") !== -1) {
      return (0, a.compileGetter)(e);
    } else {
      return function (t) {
        return t[e];
      };
    }
  }
  function n(e) {
    return function (t) {
      var n = e(t);
      if (!!n && !(n instanceof Date)) {
        n = r.default.deserializeDate(n);
      }
      return n;
    };
  }
  function i(o) {
    (0, l.each)(o || [], function (o, a) {
      var r;
      var s;
      var l;
      var d;
      var c = a.dataField;
      var h = a.levels;
      if (!a.selector) {
        d = c ? t(c) : function (e) {
          return e;
        };
        if (h) {
          i(h);
        }
        if (a.dataType === "date") {
          s = e[a.groupInterval];
          var f = n(d);
          r = function (e) {
            var t = f(e);
            if (s) {
              return s(t);
            } else {
              return t;
            }
          };
        } else if (a.dataType === "number") {
          l = (0, u.isNumeric)(a.groupInterval) && a.groupInterval > 0 && a.groupInterval;
          r = function (e) {
            var t = d(e);
            if ((0, u.isString)(t)) {
              t = Number(t);
            }
            if (l) {
              return Math.floor(t / l) * l;
            } else {
              return t;
            }
          };
        } else {
          r = d;
        }
        (0, g.setDefaultFieldValueFormatting)(a);
        (0, g.setFieldProperty)(a, "selector", r);
      }
    });
  }
  function m(e, t, n, i) {
    var o = [0];
    var a = t.headerName === i ? t.path.length : 0;
    var r = i === "rows" ? t.rowExpandedPaths : t.columnExpandedPaths;
    (function e(t, n, i, o, a) {
      var r;
      var s;
      var l = n.dimensions[o];
      var u = n.expandedPathsHash;
      if (l) {
        s = function (e, t, n, i) {
          var o = i[n];
          if (!o) {
            o = {
              value: e,
              index: i.length++
            };
            i[n] = o;
            t.push(o);
          }
          return o;
        }(r = l.selector(n.data), i, a = a !== undefined ? a + "/./" + r : `${r}`, n.childrenHash);
        t.push(s.index);
        if (u && u[a] || l.expanded) {
          s.children ||= [];
          e(t, n, s.children, o + 1, a);
        }
      }
    })(o, {
      data: e,
      childrenHash: n[`${i}Hash`],
      dimensions: t[i],
      expandedPathsHash: t.headerName !== i && r && r.hash
    }, n[i], a);
    return o;
  }
  function _(e, t, n, i) {
    var o;
    var a;
    var r;
    var s;
    var l = [];
    var u = m(e, i, n, "rows");
    var d = m(e, i, n, "columns");
    for (a = 0; a < u.length; a += 1) {
      t[r = u[a]] = t[r] || [];
      o = 0;
      for (; o < d.length; o += 1) {
        s = d[o];
        l.push(t[r][s] = t[r][s] || []);
      }
    }
    return l;
  }
  function v(e) {
    if (e) {
      var t = e.hash = {};
      e.forEach(function (e) {
        var n = e.map(function (e) {
          return `${e}`;
        }).join("/./");
        t[n] = true;
      });
    }
  }
  function y(e) {
    e.rows = e.rows || [];
    e.columns = e.columns || [];
    e.filters = e.filters || [];
    v(e.columnExpandedPaths);
    v(e.rowExpandedPaths);
    i(e.columns);
    i(e.rows);
    i(e.values);
    i(e.filters);
  }
  function b(e) {
    if (e.summaryType === "custom") {
      e.calculateCustomSummary = e.calculateCustomSummary || o.noop;
      return {
        seed: function () {
          var t = {
            summaryProcess: "start",
            totalValue: undefined
          };
          e.calculateCustomSummary(t);
          return t;
        },
        step: function (t, n) {
          t.summaryProcess = "calculate";
          t.value = n;
          e.calculateCustomSummary(t);
          return t;
        },
        finalize: function (t) {
          t.summaryProcess = "finalize";
          delete t.value;
          e.calculateCustomSummary(t);
          return t.totalValue;
        }
      };
    } else {
      return p.aggregators[e.summaryType] || p.aggregators.count;
    }
  }
  function x(e, t, n) {
    for (var i = 0; i < e.length; i += 1) {
      var o = e[i];
      var a = o.selector(n);
      var r = b(o);
      var s = typeof r.seed == "function";
      for (var l = 0; l < t.length; l += 1) {
        var d = t[l];
        if (d.length <= i) {
          d[i] = s ? r.seed() : r.seed;
        }
        if (d[i] === undefined) {
          d[i] = a;
        } else if ((0, u.isDefined)(a)) {
          d[i] = r.step(d[i], a);
        }
      }
    }
  }
  function w(e, t) {
    var n = e && e.valueOf();
    var i = t && t.valueOf();
    if (Array.isArray(e)) {
      t = t || [];
      for (var o = 0; o < e.length; o += 1) {
        if ((n = e[o] && e[o].valueOf()) !== (i = t[o] && t[o].valueOf())) {
          return false;
        }
      }
      return true;
    }
    return n === i;
  }
  function C(e) {
    var t = [];
    (0, l.each)(e, function (e, n) {
      var i = n.filterValues || [];
      if (!n.groupName || !(0, u.isNumeric)(n.groupIndex)) {
        if (i.length) {
          t.push(function (e) {
            var t = n.levels ? function (e, t) {
              var n = [];
              (0, l.each)(e, function (e, i) {
                n.push(i.selector(t));
              });
              return n;
            }(n.levels, e) : n.selector(e);
            var o = false;
            for (var a = 0; a < i.length; a += 1) {
              if (w(i[a], t)) {
                o = true;
                break;
              }
            }
            if (n.filterType === "exclude") {
              return !o;
            } else {
              return o;
            }
          });
        }
      }
    });
    return t;
  }
  function S(e) {
    var t = C(e.rows).concat(C(e.columns)).concat(C(e.filters));
    var n = e[e.headerName];
    var i = e.path;
    if (n) {
      t.push(function (e) {
        var t;
        for (var o = 0; o < i.length; o += 1) {
          t = n[o].selector(e);
          if ((0, a.toComparable)(t, true) !== (0, a.toComparable)(i[o], true)) {
            return false;
          }
        }
        return true;
      });
    }
    return function (e) {
      for (var n = 0; n < t.length; n += 1) {
        if (!t[n](e)) {
          return false;
        }
      }
      return true;
    };
  }
  function k(e, t, n) {
    var i;
    var o;
    var a = {
      columns: [],
      rows: [],
      columnsHash: {
        length: 1
      },
      rowsHash: {
        length: 1
      }
    };
    var r = [];
    var u = new s.Deferred();
    var d = 0;
    var c = S(t);
    (function s() {
      var h;
      var f;
      var p = new Date();
      var g = d;
      for (; d < e.length; d += 1) {
        if (d > g && d % 10000 == 0 && new Date() - p >= 300) {
          n(d / e.length);
          setTimeout(s, 0);
          return;
        }
        o = e[d];
        if (c(o)) {
          i = _(o, r, a, t);
          x(t.values, i, o);
        }
      }
      h = t.values;
      f = r;
      (0, l.each)(h, function (e, t) {
        var n = b(t);
        if (n.finalize) {
          (0, l.each)(f, function (t, i) {
            (0, l.each)(i, function (t, i) {
              if (i && i[e] !== undefined) {
                i[e] = n.finalize(i[e]);
              }
            });
          });
        }
      });
      n(1);
      u.resolve({
        rows: a.rows,
        columns: a.columns,
        values: r,
        grandTotalRowIndex: 0,
        grandTotalColumnIndex: 0
      });
    })();
    return u;
  }
  function D(e, t) {
    var n = e.filter();
    if (e.store() instanceof c.default && n) {
      n = O(n, t);
      return (0, f.default)(e.items()).filter(n).toArray();
    } else {
      return e.items();
    }
  }
  function I(e, t, n) {
    var i = new s.Deferred();
    function o(n) {
      if (e.store() instanceof d.default) {
        n.storeLoadOptions.filter = O(n.storeLoadOptions.filter, t);
      }
    }
    e.on("customizeStoreLoadOptions", o);
    if (!e.isLoaded() || n) {
      var a = n ? e.load() : e.reload();
      (0, s.when)(a).done(function () {
        I(e, t).done(function () {
          i.resolve(D(e, t));
        }).fail(i.reject);
      }).fail(i.reject);
    } else {
      i.resolve(D(e, t));
    }
    return i.always(function () {
      e.off("customizeStoreLoadOptions", o);
    });
  }
  function T(e, i) {
    i.forEach(function (i) {
      if (i.dataField && i.dataType === "date") {
        var o = n(t(i.dataField));
        e[i.dataField] = function (e) {
          return o(e);
        };
      }
    });
  }
  function E(e) {
    var t = {};
    if (Array.isArray(e)) {
      T(t, e);
    } else if (e) {
      ["rows", "columns", "filters"].forEach(function (n) {
        if (e[n]) {
          T(t, e[n]);
        }
      });
    }
    return t;
  }
  function O(e, t) {
    if (!Array.isArray(e)) {
      return e;
    }
    e = e.slice(0);
    if ((0, u.isString)(e[0]) && (e[1] instanceof Date || e[2] instanceof Date)) {
      e[0] = t[e[0]];
    }
    for (var n = 0; n < e.length; n += 1) {
      e[n] = O(e[n], t);
    }
    return e;
  }
  return {
    ctor: function (e) {
      this._progressChanged = e.onProgressChanged || o.noop;
      this._dataSource = new h.DataSource(e);
      this._dataSource.paginate(false);
    },
    getFields: function (e) {
      var t = this._dataSource;
      var n = new s.Deferred();
      I(t, E(e)).done(function (t) {
        n.resolve((0, g.discoverObjectFields)(t, e));
      }).fail(n.reject);
      return n;
    },
    key: function () {
      return this._dataSource.key();
    },
    load: function (e) {
      var t = this;
      var n = t._dataSource;
      var i = new s.Deferred();
      y(e);
      I(n, E(e), e.reload).done(function (n) {
        (0, s.when)(k(n, e, t._progressChanged)).done(i.resolve);
      }).fail(i.reject);
      return i;
    },
    filter: function () {
      var e = this._dataSource;
      return e.filter.apply(e, arguments);
    },
    supportPaging: function () {
      return false;
    },
    getDrillDownItems: function (e, t) {
      t = t || {};
      y(e = e || {});
      var n;
      var i = [];
      for (var o = this._dataSource.items(), a = t.maxRowCount, r = t.customColumns, s = S(e), l = S({
          rows: (0, g.getFiltersByPath)(e.rows, t.rowPath),
          columns: (0, g.getFiltersByPath)(e.columns, t.columnPath),
          filters: []
        }), u = 0; u < o.length; u += 1) {
        if (l(o[u]) && s(o[u])) {
          if (r) {
            n = {};
            for (var d = 0; d < r.length; d += 1) {
              n[r[d]] = o[u][r[d]];
            }
          } else {
            n = o[u];
          }
          i.push(n);
        }
        if (a > 0 && i.length === a) {
          break;
        }
      }
      return i;
    }
  };
}()).include(g.storeDrillDownMixin);
exports.LocalStore = _;
var v = {
  LocalStore: _
};
exports.default = v;