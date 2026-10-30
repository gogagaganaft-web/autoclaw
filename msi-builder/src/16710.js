Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PivotGridDataSource = undefined;
var i = b(require("./38377.js"));
var o = require("./80566.js");
var a = require("./89386.js");
var r = require("./20576.js");
var s = require("./62754.js");
var l = require("./13306.js");
var u = require("./78008.js");
var d = require("./95479.js");
var c = require("./35922.js");
var h = b(require("./67403.js"));
var f = require("./9234.js");
var p = require("./16564.js");
var g = require("./28580.js");
var m = require("./2166.js");
var _ = b(require("./42717.js"));
var v = b(require("./79755.js"));
var y = require("./91629.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var x = {
  row: "rows",
  column: "columns",
  data: "values",
  filter: "filters"
};
var w = ["area", "areaIndex", "sortOrder", "filterType", "filterValues", "sortBy", "sortBySummaryField", "sortBySummaryPath", "expanded", "summaryType", "summaryDisplayMode"];
var C = ["format", "selector", "customizeText", "caption"];
var S = C.concat(["allowSorting", "allowSortingBySummary", "allowFiltering", "allowExpandAll"]);
function k(e, t) {
  var n = e._initProperties || {};
  (0, d.each)(t, function (t, i) {
    if (Object.prototype.hasOwnProperty.call(n, i)) {
      e[i] = n[i];
    }
  });
}
function D(e, t) {
  k(e, t);
  if (!(0, c.isDefined)(e.caption)) {
    (0, g.setFieldProperty)(e, "caption", function (e) {
      var t = e.dataField || e.groupName || "";
      var n = (e.summaryType || "").toLowerCase();
      if ((0, c.isString)(e.groupInterval)) {
        t += `_${e.groupInterval}`;
      }
      if (n && n !== "custom") {
        n = n.replace(/^./, n[0].toUpperCase());
        if (t.length) {
          n = ` (${n})`;
        }
      } else {
        n = "";
      }
      return (0, u.titleize)(t) + n;
    }(e));
  }
}
function I(e) {
  return e.rows.length || e.columns.length || e.values.length;
}
var T = i.default.inherit(function () {
  function e(e, t) {
    if (e._cacheByPath) {
      return e._cacheByPath[t.join(".")] || null;
    }
  }
  var t = function e(t, n) {
    var i;
    var o;
    var a = -1;
    if (t) {
      for (i = 0; i < t.length; i += 1) {
        if ((o = t[i]).index !== undefined) {
          a = Math.max(a, o.index);
        }
        if (o.children) {
          a = Math.max(a, e(o.children));
        } else if (o.collapsedChildren) {
          a = Math.max(a, e(o.collapsedChildren));
        }
      }
    }
    if ((0, c.isDefined)(n)) {
      a = Math.max(a, n);
    }
    return a;
  };
  function n(e, n, i, o) {
    var a;
    var r = t(i) + 1;
    var l = t(e, o) + 1;
    var u = [];
    var d = false;
    var c = new s.Deferred();
    if (n.children && n.children.length === i.length) {
      for (var h = 0; h < i.length; h += 1) {
        var f = i[h];
        if (f.index !== undefined) {
          if (n.children[h].index === undefined) {
            f.index = u[f.index] = l++;
            n.children[h] = f;
          } else {
            u[f.index] = n.children[h].index;
          }
        }
      }
    } else {
      d = true;
      a = 0;
      for (; a < r; a += 1) {
        u[a] = l++;
      }
      n.children = i;
    }
    (0, s.when)((0, g.foreachTreeAsync)(n.children, function (e) {
      if (d) {
        e[0].index = u[e[0].index];
      }
    })).done(function () {
      c.resolve(u);
    });
    return c;
  }
  function u(n, i, o) {
    var a = new s.Deferred();
    var r = o >= 0 && t(n, o) + 1;
    var l = [];
    (0, s.when)((0, g.foreachTreeAsync)(n, function (e) {
      delete e[0].collapsedChildren;
    })).done(function () {
      (0, s.when)((0, g.foreachTreeAsync)(i, function (t, i) {
        var o = t[0];
        if (o.index >= 0) {
          var a = e(n, (0, g.createPath)(t));
          if (a && a.index >= 0) {
            l[o.index] = a.index;
          } else if (r) {
            var s = (0, g.createPath)(t.slice(1));
            a = e(n, s);
            var u = s.length ? a && a.children : n;
            if (u) {
              u[i] = o;
              o.index = l[o.index] = r++;
            }
          }
        }
      })).done(function () {
        a.resolve(l);
      });
    });
    return a;
  }
  function b(e, t, n, i) {
    var o;
    var a;
    var r;
    var s;
    var l;
    var u;
    var d = e.values;
    if (t) {
      for (o = 0; o < t.length; o += 1) {
        r = t[o];
        l = n[o];
        if (!(0, c.isDefined)(l)) {
          l = e.grandTotalRowIndex;
        }
        if (r && (0, c.isDefined)(l)) {
          d[l] ||= [];
          a = 0;
          for (; a < r.length; a += 1) {
            s = r[a];
            u = i[a];
            if (!(0, c.isDefined)(u)) {
              u = e.grandTotalColumnIndex;
            }
            if ((0, c.isDefined)(s) && (0, c.isDefined)(u)) {
              d[l][u] = s;
            }
          }
        }
      }
    }
  }
  function T(e, t) {
    return new (e.remoteOperations || e.paginate ? m.RemoteStore : p.LocalStore)((0, l.extend)((0, f.normalizeDataSourceOptions)(e), {
      onChanged: null,
      onLoadingChanged: null,
      onProgressChanged: t
    }));
  }
  function E(e, t, n, i) {
    var o = [];
    var a = t && t[n] || [];
    var r = i && i[n] || [];
    (0, g.foreachTree)(e[n], function (e) {
      var t = e[0];
      var n = (0, g.createPath)(e);
      if (t.children && a[n.length - 1] && !a[n.length - 1].expanded && n.length < a.length && (!i || function (e, t, n) {
        for (var i = 0; i < n; i += 1) {
          if (!e[i] || !t[i] || e[i].index !== t[i].index) {
            return false;
          }
        }
        return true;
      }(a, r, n.length))) {
        o.push(n.slice());
      }
    }, true);
    return o;
  }
  function O(e, t, n, i) {
    if (t) {
      (0, d.each)(i, function (i, o) {
        if (n) {
          e[o] = t[o];
        } else {
          if ((o === "summaryType" || o === "summaryDisplayMode") && t[o] === undefined) {
            return;
          }
          (0, g.setFieldProperty)(e, o, t[o]);
        }
      });
    } else {
      k(e, i);
    }
    return e;
  }
  function A(e, t) {
    var n = [];
    (0, d.each)(e, function (e, i) {
      n.push(O({
        dataField: i.dataField,
        name: i.name
      }, i, true, t));
    });
    return n;
  }
  function P(e) {
    if (e.name) {
      return e.name;
    } else {
      return `${e.dataField}`;
    }
  }
  function M(e, t) {
    var n = [];
    (0, d.each)(e || [], function (e, i) {
      if (P(i) === t) {
        n.push(i);
      }
    });
    return n;
  }
  function R(e, t) {
    e = e || [];
    var n;
    var i = {};
    (0, d.each)(t, function (e, o) {
      n = P(o);
      i[n] ||= M(t, P(o));
    });
    (0, d.each)(i, function (t, n) {
      (function (e, t) {
        e = e || [];
        (0, d.each)(t, function (t, n) {
          O(n, e[t], false, w);
          D(n, C);
        });
      })(M(e, t), n);
    });
    return t;
  }
  function B(e) {
    e.sort(function (e, t) {
      return e.areaIndex - t.areaIndex || e.groupIndex - t.groupIndex;
    });
  }
  function L(e, t) {
    var n = e.groupName || "";
    return (e.dataField || n) + (e.groupInterval ? n + e.groupInterval : "NOGROUP") + (t ? "" : n);
  }
  function V(e, t, n) {
    var i = [];
    var o = {};
    var a = {};
    var r = (0, g.getFieldsDataType)(e);
    if (t) {
      (0, d.each)(t, function (e, t) {
        o[L(t, n)] = t;
      });
      (0, d.each)(e, function (e, t) {
        var s;
        var u = L(t, n);
        var d = o[u] || a[u];
        if (d) {
          if (d._initProperties) {
            k(d, S);
          }
          s = (0, l.extend)({}, d, t, {
            _initProperties: null
          });
        } else {
          o[u] = s = t;
        }
        if (!s.dataType && r[t.dataField]) {
          s.dataType = r[t.dataField];
        }
        delete o[u];
        a[u] = d;
        i.push(s);
      });
      if (n) {
        (0, d.each)(o, function (e, t) {
          i.push(t);
        });
      }
    } else {
      i = e;
    }
    i.push.apply(i, []);
    (function (e) {
      e.forEach(function (t) {
        if (t.groupName && t.groupInterval && t.groupIndex === undefined) {
          var n = e.filter(function (e) {
            return e.groupName === t.groupName && (0, c.isNumeric)(e.groupIndex);
          }).map(function (e) {
            return e.groupIndex;
          }).reduce(function (e, t) {
            return Math.max(e, t);
          }, -1);
          t.groupIndex = n + 1;
        }
      });
    })(i);
    return i;
  }
  function F(e) {
    var t;
    var n = new s.Deferred();
    var i = e._store;
    var o = i && i.getFields(e._fields);
    (0, s.when)(o).done(function (i) {
      e._storeFields = i;
      t = V(e._fields, i, e._retrieveFields);
      n.resolve(t);
    }).fail(n.reject);
    return n;
  }
  function H(e, t, n) {
    return (0, g.foreachTreeAsync)(e[n], function (e) {
      var i = e[0];
      i.text = i.text || (0, g.formatValue)(i.value, t[n][(0, g.createPath)(e).length - 1]);
    });
  }
  function N(e, t) {
    return (0, s.when)(H(t, e, "columns"), H(t, e, "rows"));
  }
  function z(e) {
    var t = new s.Deferred();
    var n = {};
    (0, s.when)((0, g.foreachTreeAsync)(e, function (e) {
      var t = (0, g.createPath)(e).join(".");
      n[t] = e[0];
    })).done(t.resolve);
    e._cacheByPath = n;
    return t;
  }
  function j(e, t) {
    var n = [];
    (0, d.each)(e, function () {
      if (function (e, t) {
        var n = t === "data" || e.visible !== false;
        return e.area === t && !(0, c.isDefined)(e.groupIndex) && n;
      }(this, t)) {
        n.push(this);
      }
    });
    return n;
  }
  return {
    ctor: function (e) {
      var t = this;
      e = e || {};
      this._eventsStrategy = new o.EventsStrategy(this);
      var n = this;
      var a = function (e, t) {
        var n;
        var o;
        if ((0, c.isPlainObject)(e) && e.load) {
          n = T(e, t);
        } else {
          if (e && !e.store) {
            e = {
              store: e
            };
          }
          if ((o = e.store).type === "xmla") {
            n = new v.default.XmlaStore(o);
          } else if ((0, c.isPlainObject)(o) && o.type || o instanceof h.default || Array.isArray(o)) {
            n = T(e, t);
          } else if (o instanceof i.default) {
            n = o;
          }
        }
        return n;
      }(e, function (e) {
        n._eventsStrategy.fireEvent("progressChanged", [e]);
      });
      n._store = a;
      n._paginate = !!e.paginate;
      n._pageSize = e.pageSize || 40;
      n._data = {
        rows: [],
        columns: [],
        values: []
      };
      n._loadingCount = 0;
      n._isFieldsModified = false;
      (0, d.each)(["changed", "loadError", "loadingChanged", "progressChanged", "fieldsPrepared", "expandValueChanging"], function (n, i) {
        var o = `on${i[0].toUpperCase()}${i.slice(1)}`;
        if (Object.prototype.hasOwnProperty.call(e, o)) {
          t.on(i, e[o]);
        }
      });
      n._retrieveFields = !(0, c.isDefined)(e.retrieveFields) || e.retrieveFields;
      n._fields = e.fields || [];
      n._descriptions = e.descriptions ? (0, l.extend)(n._createDescriptions(), e.descriptions) : undefined;
      if (!a) {
        (0, l.extend)(true, n._data, e.store || e);
      }
    },
    getData: function () {
      return this._data;
    },
    getAreaFields: function (e, t) {
      var n = [];
      if (t || e === "data") {
        B(n = j(this._fields, e));
      } else {
        n = (this._descriptions || {})[x[e]] || [];
      }
      return n;
    },
    fields: function (e) {
      if (e) {
        this._fields = V(e, this._storeFields, this._retrieveFields);
        this._fieldsPrepared(this._fields);
      }
      return this._fields;
    },
    field: function (e, t) {
      var n;
      var i = this._fields;
      var o = i && i[(0, c.isNumeric)(e) ? e : (0, g.findField)(i, e)];
      if (o && t) {
        (0, d.each)(t, function (e, t) {
          var i = !w.includes(e);
          (0, g.setFieldProperty)(o, e, t, i);
          if (e === "sortOrder") {
            n = o.levels || [];
            for (var a = 0; a < n.length; a += 1) {
              n[a][e] = t;
            }
          }
        });
        D(o, C);
        this._descriptions = this._createDescriptions(o);
        this._isFieldsModified = true;
        this._eventsStrategy.fireEvent("fieldChanged", [o]);
      }
      return o;
    },
    getFieldValues: function (e, t, n) {
      var i;
      var o = this;
      var a = this._fields && this._fields[e];
      var r = this.store();
      var u = [];
      var c = {
        columns: u,
        rows: [],
        values: this.getAreaFields("data"),
        filters: t ? this._fields.filter(function (e) {
          return e !== a && e.area && e.filterValues && e.filterValues.length;
        }) : [],
        skipValues: true
      };
      var h = new s.Deferred();
      if (n) {
        i = n.searchValue;
        c.columnSkip = n.skip;
        c.columnTake = n.take;
      }
      if (a && r) {
        (0, d.each)(a.levels || [a], function () {
          u.push((0, l.extend)({}, this, {
            expanded: true,
            filterValues: null,
            sortOrder: "asc",
            sortBySummaryField: null,
            searchValue: i
          }));
        });
        r.load(c).done(function (e) {
          if (c.columnSkip) {
            e.columns = e.columns.slice(c.columnSkip);
          }
          if (c.columnTake) {
            e.columns = e.columns.slice(0, c.columnTake);
          }
          N(c, e);
          if (!c.columnTake) {
            o._sort(c, e);
          }
          h.resolve(e.columns);
        }).fail(h);
      } else {
        h.reject();
      }
      return h;
    },
    reload: function () {
      return this.load({
        reload: true
      });
    },
    filter: function () {
      var e = this._store;
      return e.filter.apply(e, arguments);
    },
    load: function (e) {
      var t = this;
      var n = new s.Deferred();
      function i() {
        t._delayedLoadTask = undefined;
        if (t._descriptions) {
          t._loadCore(e, n);
        } else {
          (0, s.when)(F(t)).done(function (i) {
            t._fieldsPrepared(i);
            t._loadCore(e, n);
          }).fail(n.reject).fail(t._loadErrorHandler);
        }
      }
      e = e || {};
      t.beginLoading();
      n.fail(function (e) {
        t._eventsStrategy.fireEvent("loadError", [e]);
      }).always(function () {
        t.endLoading();
      });
      if (t.store()) {
        t._delayedLoadTask = (0, r.executeAsync)(i);
      } else {
        i();
      }
      return n;
    },
    createDrillDownDataSource: function (e) {
      return this._store.createDrillDownDataSource(this._descriptions, e);
    },
    _createDescriptions: function (e) {
      var t = this.fields();
      var n = {
        rows: [],
        columns: [],
        values: [],
        filters: []
      };
      (0, d.each)(["row", "column", "data", "filter"], function (n, i) {
        (0, a.normalizeIndexes)(j(t, i), "areaIndex", e);
      });
      (0, d.each)(t || [], function (e, i) {
        var o = x[i.area];
        var a = n[o];
        var r = i.groupName;
        if (r && !(0, c.isNumeric)(i.groupIndex)) {
          i.levels = function (e, t) {
            return e.filter(function (e) {
              return e.groupName === t.groupName && (0, c.isNumeric)(e.groupIndex) && e.visible !== false;
            }).map(function (e) {
              return (0, l.extend)(e, {
                areaIndex: t.areaIndex,
                area: t.area,
                expanded: (0, c.isDefined)(e.expanded) ? e.expanded : t.expanded,
                dataField: e.dataField || t.dataField,
                dataType: e.dataType || t.dataType,
                sortBy: e.sortBy || t.sortBy,
                sortOrder: e.sortOrder || t.sortOrder,
                sortBySummaryField: e.sortBySummaryField || t.sortBySummaryField,
                sortBySummaryPath: e.sortBySummaryPath || t.sortBySummaryPath,
                visible: e.visible || t.visible,
                showTotals: (0, c.isDefined)(e.showTotals) ? e.showTotals : t.showTotals,
                showGrandTotals: (0, c.isDefined)(e.showGrandTotals) ? e.showGrandTotals : t.showGrandTotals
              });
            }).sort(function (e, t) {
              return e.groupIndex - t.groupIndex;
            });
          }(t, i);
        }
        if (!!a && (!r || !(0, c.isNumeric)(i.groupIndex)) && (i.visible !== false || i.area === "data" || i.area === "filter")) {
          if (i.levels && a !== n.filters && a !== n.values) {
            a.push.apply(a, i.levels);
            if (i.filterValues && i.filterValues.length) {
              n.filters.push(i);
            }
          } else {
            a.push(i);
          }
        }
      });
      (0, d.each)(n, function (e, t) {
        B(t);
      });
      var i = {};
      (0, d.each)(n.values, function (e, o) {
        var a = o.calculateSummaryValue;
        if ((0, c.isFunction)(a)) {
          a(_.default.createMockSummaryCell(n, t, i));
        }
      });
      return n;
    },
    _fieldsPrepared: function (e) {
      this._fields = e;
      (0, d.each)(e, function (e, t) {
        t.index = e;
        D(t, S);
      });
      var t = A(e, ["caption"]);
      this._eventsStrategy.fireEvent("fieldsPrepared", [e]);
      for (var n = 0; n < e.length; n += 1) {
        if (e[n].caption !== t[n].caption) {
          (0, g.setFieldProperty)(e[n], "caption", e[n].caption, true);
        }
      }
      this._descriptions = this._createDescriptions();
    },
    isLoading: function () {
      return this._loadingCount > 0;
    },
    state: function (e, t) {
      var n = this;
      if (arguments.length) {
        e = (0, l.extend)({
          rowExpandedPaths: [],
          columnExpandedPaths: []
        }, e);
        if (n._descriptions) {
          n._fields = R(e.fields, n._fields);
          n._descriptions = n._createDescriptions();
          if (!t) {
            n.load(e);
          }
        } else {
          n.beginLoading();
          (0, s.when)(F(n)).done(function (i) {
            n._fields = R(e.fields, i);
            n._fieldsPrepared(i);
            if (!t) {
              n.load(e);
            }
          }).always(function () {
            n.endLoading();
          });
        }
        return;
      } else {
        return {
          fields: A(n._fields, w),
          columnExpandedPaths: E(n._data, n._descriptions, "columns", n._lastLoadOptions),
          rowExpandedPaths: E(n._data, n._descriptions, "rows", n._lastLoadOptions)
        };
      }
    },
    beginLoading: function () {
      this._changeLoadingCount(1);
    },
    endLoading: function () {
      this._changeLoadingCount(-1);
    },
    _changeLoadingCount: function (e) {
      var t = this.isLoading();
      this._loadingCount += e;
      var n = this.isLoading();
      if (t ^ n) {
        this._eventsStrategy.fireEvent("loadingChanged", [n]);
      }
    },
    _hasPagingValues: function (t, n, i) {
      var o = `${n}Take`;
      var a = `${n}Skip`;
      var r = this._data.values;
      var s = this._data[`${n}s`];
      var l = n === "row" ? "column" : "row";
      var u = [];
      if (t.path && t.area === n) {
        var d = e(s, t.path);
        if (!(s = d && d.children)) {
          return false;
        }
      }
      if (t.oppositePath && t.area === l) {
        var c = e(s, t.oppositePath);
        if (!(s = c && c.children)) {
          return false;
        }
      }
      for (var h = t[a]; h < t[a] + t[o]; h += 1) {
        if (s[h]) {
          u.push(s[h].index);
        }
      }
      return u.every(function (e) {
        if (e !== undefined) {
          if (n === "row") {
            return (r[e] || [])[i];
          } else {
            return (r[i] || [])[e];
          }
        }
      });
    },
    _processPagingCacheByArea: function (t, n, i) {
      var o;
      var a = `${i}Take`;
      var r = `${i}Skip`;
      var s = this._data[`${i}s`];
      var l = i === "row" ? "column" : "row";
      if (t[a]) {
        if (t.path && t.area === i) {
          var u = e(s, t.path);
          s = u && u.children || [];
        }
        if (t.oppositePath && t.area === l) {
          var d = e(s, t.oppositePath);
          s = d && d.children || [];
        }
        do {
          if ((o = s[t[r]]) && o.index !== undefined) {
            if (!this._hasPagingValues(t, l, o.index)) {
              break;
            }
            t[r]++;
            t[a]--;
          }
        } while (o && o.index !== undefined && t[a]);
        if (t[a]) {
          var c = Math.floor(t[r] / n) * n;
          var h = Math.ceil((t[r] + t[a]) / n) * n;
          t[r] = c;
          t[a] = h - c;
        }
      }
    },
    _processPagingCache: function (e) {
      var t = this._pageSize;
      if (!(t < 0)) {
        for (var n = 0; n < e.length; n += 1) {
          this._processPagingCacheByArea(e[n], t, "row");
          this._processPagingCacheByArea(e[n], t, "column");
        }
      }
    },
    _loadCore: function (e, t) {
      var n = this;
      var i = this._store;
      var o = this._descriptions;
      var a = e.reload || this.paginate() && n._isFieldsModified;
      var r = this.paginate();
      var u = x[e.area];
      e = e || {};
      if (i) {
        (0, l.extend)(e, o);
        e.columnExpandedPaths = e.columnExpandedPaths || E(this._data, e, "columns", n._lastLoadOptions);
        e.rowExpandedPaths = e.rowExpandedPaths || E(this._data, e, "rows", n._lastLoadOptions);
        if (r) {
          e.pageSize = this._pageSize;
        }
        if (u) {
          e.headerName = u;
        }
        n.beginLoading();
        t.always(function () {
          n.endLoading();
        });
        var d = [e];
        n._eventsStrategy.fireEvent("customizeStoreLoadOptions", [d, a]);
        if (!a) {
          n._processPagingCache(d);
        }
        if (!(d = d.filter(function (e) {
          return (!e.rows.length || e.rowTake !== 0) && (!e.columns.length || e.columnTake !== 0);
        })).length) {
          n._update(t);
          return;
        }
        var c = d.map(function (e) {
          return i.load(e);
        });
        s.when.apply(null, c).done(function () {
          for (var e = arguments, i = 0; i < e.length; i += 1) {
            var o = d[i];
            var s = e[i];
            var u = i === e.length - 1;
            if (o.path) {
              n.applyPartialDataSource(o.area, o.path, s, !!u && t, o.oppositePath);
            } else if (r && !a && I(n._data)) {
              n.mergePartialDataSource(s, !!u && t);
            } else {
              (0, l.extend)(n._data, s);
              n._lastLoadOptions = o;
              n._update(!!u && t);
            }
          }
        }).fail(t.reject);
      } else {
        n._update(t);
      }
    },
    _sort: function (e, t, n) {
      if (this._store && !this._paginate) {
        (0, y.sort)(e, t, n);
      }
    },
    sortLocal: function () {
      this._sort(this._descriptions, this._data);
      this._eventsStrategy.fireEvent("changed");
    },
    paginate: function () {
      return this._paginate && this._store && this._store.supportPaging();
    },
    isEmpty: function () {
      var e = this.getAreaFields("data").filter(function (e) {
        return e.visible !== false;
      });
      var t = this.getData();
      return !e.length || !t.values.length;
    },
    _update: function (e) {
      var t = this;
      var n = t._descriptions;
      var i = t._data;
      var o = n.values;
      var a = function (e) {
        return e.some(function (e) {
          return e.summaryDisplayMode || e.calculateSummaryValue;
        });
      }(o);
      (0, s.when)(N(n, i), z(i.rows), z(i.columns)).done(function () {
        if (a) {
          t._sort(n, i, a);
          if (!t.isEmpty()) {
            _.default.applyDisplaySummaryMode(n, i);
          }
        }
        t._sort(n, i);
        if (!t.isEmpty() && function (e) {
          return e.some(function (e) {
            return !!e.runningTotal;
          });
        }(o)) {
          _.default.applyRunningTotal(n, i);
        }
        t._data = i;
        if (e !== false) {
          (0, s.when)(e).done(function () {
            t._isFieldsModified = false;
            t._eventsStrategy.fireEvent("changed");
            if ((0, c.isDefined)(t._data.grandTotalRowIndex)) {
              i.grandTotalRowIndex = t._data.grandTotalRowIndex;
            }
            if ((0, c.isDefined)(t._data.grandTotalColumnIndex)) {
              i.grandTotalColumnIndex = t._data.grandTotalColumnIndex;
            }
          });
        }
        if (e) {
          e.resolve(t._data);
        }
      });
      return e;
    },
    store: function () {
      return this._store;
    },
    collapseHeaderItem: function (t, n) {
      var i = t === "column" ? this._data.columns : this._data.rows;
      var o = e(i, n);
      var a = this.getAreaFields(t)[n.length - 1];
      return !!o && !!o.children && (this._eventsStrategy.fireEvent("expandValueChanging", [{
        area: t,
        path: n,
        expanded: false
      }]), a && (a.expanded = false), o.collapsedChildren = o.children, delete o.children, this._update(), this.paginate() && this.load(), true);
    },
    collapseAll: function (e) {
      var t = this;
      var n = false;
      var i = this.field(e) || {};
      var o = [this.getAreaFields(i.area).indexOf(i)];
      i.expanded = false;
      if (i && i.levels) {
        o = [];
        i.levels.forEach(function (e) {
          o.push(t.getAreaFields(i.area).indexOf(e));
          e.expanded = false;
        });
      }
      (0, g.foreachTree)(this._data[`${i.area}s`], function (e) {
        var t = e[0];
        var i = (0, g.createPath)(e);
        if (t && t.children && o.includes(i.length - 1)) {
          t.collapsedChildren = t.children;
          delete t.children;
          n = true;
        }
      }, true);
      if (n) {
        this._update();
      }
    },
    expandAll: function (e) {
      var t = this.field(e);
      if (t && t.area) {
        t.expanded = true;
        if (t && t.levels) {
          t.levels.forEach(function (e) {
            e.expanded = true;
          });
        }
        this.load();
      }
    },
    expandHeaderItem: function (t, n) {
      var i = t === "column" ? this._data.columns : this._data.rows;
      var o = e(i, n);
      if (o && !o.children) {
        var a = !!o.collapsedChildren;
        var r = {
          area: t,
          path: n,
          expanded: true,
          needExpandData: !a
        };
        this._eventsStrategy.fireEvent("expandValueChanging", [r]);
        if (a) {
          o.children = o.collapsedChildren;
          delete o.collapsedChildren;
          this._update();
        } else if (this.store()) {
          this.load(r);
        }
        return a;
      }
      return false;
    },
    mergePartialDataSource: function (e, t) {
      var n;
      var i;
      var o = this;
      var a = o._data;
      if (e && e.values) {
        e.rows = e.rows || [];
        e.columns = e.columns || [];
        n = u(a.rows, e.rows, a.grandTotalColumnIndex);
        i = u(a.columns, e.columns, a.grandTotalColumnIndex);
        (0, s.when)(n, i).done(function (n, i) {
          if (n.length || i.length) {
            b(a, e.values, n, i);
          }
          o._update(t);
        });
      }
    },
    applyPartialDataSource: function (t, i, o, a, r) {
      var l;
      var d;
      var c;
      var h;
      var f = this;
      var p = f._data;
      var g = t === "column" ? p.columns : p.rows;
      var m = t === "column" ? p.rows : p.columns;
      if (o && o.values) {
        o.rows = o.rows || [];
        o.columns = o.columns || [];
        l = e(g, i);
        d = r && e(m, r);
        if (l) {
          if (t === "column") {
            h = n(g, l, o.columns, p.grandTotalColumnIndex);
            c = d ? n(m, d, o.rows, p.grandTotalRowIndex) : u(p.rows, o.rows, p.grandTotalRowIndex);
          } else {
            c = n(g, l, o.rows, p.grandTotalRowIndex);
            h = d ? n(m, d, o.columns, p.grandTotalColumnIndex) : u(p.columns, o.columns, p.grandTotalColumnIndex);
          }
          (0, s.when)(c, h).done(function (e, n) {
            if (t === "row" && e.length || t === "column" && n.length) {
              b(p, o.values, e, n);
            }
            f._update(a);
          });
        }
      }
    },
    on: function (e, t) {
      this._eventsStrategy.on(e, t);
      return this;
    },
    off: function (e, t) {
      this._eventsStrategy.off(e, t);
      return this;
    },
    dispose: function () {
      var e = this._delayedLoadTask;
      this._eventsStrategy.dispose();
      if (e) {
        e.abort();
      }
      this._isDisposed = true;
    },
    isDisposed: function () {
      return !!this._isDisposed;
    }
  };
}());
exports.PivotGridDataSource = T;
var E = {
  PivotGridDataSource: T
};
exports.default = E;