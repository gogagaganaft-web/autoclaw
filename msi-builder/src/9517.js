Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DataController__internals = exports.DataController = undefined;
var i = m(require("./38377.js"));
var o = m(require("./44504.js"));
var a = require("./20576.js");
var r = require("./62754.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./68752.js");
var d = require("./35922.js");
var c = m(require("./84651.js"));
var h = require("./44980.js");
var f = m(require("./86770.js"));
var p = require("./16710.js");
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
function _(e) {
  return (_ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function v(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (_(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (_(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (_(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var y = Math;
function b(e, t, n) {
  e[t] ||= function () {
    var e = this._dataSource;
    if (e) {
      return e[t].apply(e, arguments);
    } else {
      return n;
    }
  };
}
var x = i.default.inherit(function () {
  function e(e, t, n) {
    if (e === "#N/A") {
      return n;
    } else {
      return (0, g.formatValue)(e, t);
    }
  }
  var t = function () {
    function e(e, t) {
      var n = t.lastIndex - t.index || 1;
      (function (e, t, n, i, o) {
        for (var a = o ? i : n; !e[a];) {
          e.push([]);
        }
        if (o) {
          e[a].push(t);
        } else {
          e[a].unshift(t);
        }
      })(e, function (e, t, n, i) {
        var o = {
          type: e.type,
          text: e.text
        };
        if (e.path) {
          o.path = e.path;
        }
        if (e.width) {
          o.width = e.width;
        }
        if ((0, d.isDefined)(e.wordWrapEnabled)) {
          o.wordWrapEnabled = e.wordWrapEnabled;
        }
        if (e.isLast) {
          o.isLast = true;
        }
        if (e.sorted) {
          o.sorted = true;
        }
        if (e.isMetric) {
          o.dataIndex = e.dataIndex;
        }
        if ((0, d.isDefined)(e.expanded)) {
          o.expanded = e.expanded;
        }
        if (t > 1) {
          o[n ? "colspan" : "rowspan"] = t;
        }
        if (e.depthSize && e.depthSize > 1) {
          o[n ? "rowspan" : "colspan"] = e.depthSize;
        }
        if (e.index >= 0) {
          o.dataSourceIndex = e.index;
        }
        if (i && e.children && e.children.length && !e.children[0].isMetric) {
          o.width = null;
          o.isWhiteSpace = true;
        }
        return o;
      }(t.headerItem, n, t.isHorizontal, t.isTree), t.index, t.depth, t.isHorizontal);
      if (t.headerItem.children && t.headerItem.children.length !== 0) {
        return t.lastIndex;
      } else {
        return t.lastIndex + 1;
      }
    }
    function t(e, t, i, o, a) {
      var c = i.length;
      var h = function (e, t) {
        var i;
        var o = t && t.length || 0;
        var a = [];
        var s = new r.Deferred();
        (0, r.when)((0, g.foreachTreeAsync)(e, function (e, t) {
          var r = e[0];
          var s = (0, g.createPath)(e);
          (i = n(a, s.length, t)).type = "D";
          i.value = r.value;
          i.path = s;
          i.text = r.text;
          i.index = r.index;
          i.displayText = r.displayText;
          i.key = r.key;
          i.isEmpty = r.isEmpty;
          if (s.length < o && (!r.children || r.children.length !== 0)) {
            i.expanded = !!r.children;
          }
        })).done(function () {
          s.resolve(n(a, 0, 0).children || []);
        });
        return s;
      }(e, t);
      var f = a.dataFields;
      var p = new r.Deferred();
      (0, r.when)(h).done(function (e) {
        a.notifyProgress(0.5);
        if (a.showGrandTotals) {
          e[a.showTotalsPrior ? "unshift" : "push"]({
            type: "GT",
            isEmpty: a.isEmptyGrandTotal
          });
        }
        var n = a.showTotals === false || f.length > 0 && f.length === a.hiddenTotals.length;
        var h = f.length > 0 && a.hiddenValues.length === f.length;
        if (h && n) {
          o = 1;
        }
        if (!n || a.layout === "tree") {
          (function (e, t, n, i) {
            n = n || i;
            (0, g.foreachTree)(e, function (o, a) {
              var r = o[0];
              var l = (o[1] ? o[1].children : e) || [];
              var u = t[o.length - 1];
              if (r.type === "D" && r.expanded && (u.showTotals !== false || i)) {
                if (a !== -1) {
                  l.splice(n ? a : a + 1, 0, (0, s.extend)({}, r, {
                    children: null,
                    type: "T",
                    expanded: !!n || null,
                    isAdditionalTotal: true
                  }));
                }
                if (n) {
                  r.expanded = null;
                }
              }
            });
          })(e, t, a.showTotalsPrior, a.layout === "tree");
        }
        (0, r.when)((0, g.foreachTreeAsync)(e, function (e) {
          var t = e[0];
          if (!t.children || t.children.length === 0) {
            t.depthSize = o - e.length + 1;
          }
        })).done(function () {
          if (c > 1) {
            (function (e, t, n) {
              (0, g.foreachTree)(e, function (e) {
                var i;
                var o = e[0];
                if (!o.children || o.children.length === 0) {
                  o.children = [];
                  i = 0;
                  for (; i < t.length; i += 1) {
                    var a = o.type === "GT";
                    var r = o.type === "T";
                    var s = o.type === "D";
                    if (t[i].visible !== false && (!a || !n.hiddenGrandTotals.includes(i)) && (!r || !n.hiddenTotals.includes(i)) && (!s || !n.hiddenValues.includes(i))) {
                      o.children.push({
                        caption: t[i].caption,
                        path: o.path,
                        type: o.type,
                        value: i,
                        index: o.index,
                        dataIndex: i,
                        isMetric: true,
                        isEmpty: o.isEmpty && o.isEmpty[i]
                      });
                    }
                  }
                }
              });
            })(e, i, a);
          }
          if (!a.showEmpty) {
            (function (e) {
              (0, g.foreachTree)([{
                children: e
              }], function (t, n) {
                var i = t[0];
                var o = (t[1] ? t[1].children : e) || [];
                var a = i.isEmpty;
                if (a && a.length) {
                  a = i.isEmpty.filter(function (e) {
                    return e;
                  }).length === a.length;
                }
                if (i && !i.children && a) {
                  o.splice(n, 1);
                  (function e(t, n) {
                    var i = t[n + 1];
                    if (!t[n].children.length && i && i.children) {
                      i.children.splice(i.children.indexOf(t[n]), 1);
                      e(t, n + 1);
                    }
                  })(t, 1);
                }
              });
            })(e);
          }
          a.notifyProgress(0.75);
          (0, r.when)((0, g.foreachTreeAsync)(e, function (n) {
            var o = n[0];
            var r = o.isMetric;
            var s = t[n.length - 1] || {};
            if (o.type === "D" && !r) {
              o.width = s.width;
            }
            if (h && o.type === "D") {
              var c = (n[1] ? n[1].children : e) || [];
              c.splice(c.indexOf(o), 1);
            } else {
              o.wordWrapEnabled = r ? i[o.dataIndex].wordWrapEnabled : s.wordWrapEnabled;
              o.isLast = !o.children || !o.children.length;
              if (o.isLast) {
                (0, l.each)(a.sortBySummaryPaths, function (e, t) {
                  if (!(0, d.isDefined)(o.dataIndex)) {
                    (t = t.slice(0)).pop();
                  }
                  if (function (e, t) {
                    var n;
                    var i = e[0];
                    var o = (0, d.isString)(t[0]);
                    var a = i.dataIndex >= 0 ? e[1] : i;
                    n = o && t[0].indexOf("&[") !== -1 && a.key || !a.key ? (0, g.createPath)(e) : (0, l.map)(e, function (e) {
                      if (e.dataIndex >= 0) {
                        return e.value;
                      } else {
                        return e.text;
                      }
                    }).reverse();
                    if (i.type === "GT") {
                      n = n.slice(1);
                    }
                    return n.join("/") === t.join("/");
                  }(n, t)) {
                    o.sorted = true;
                    return false;
                  }
                });
              }
              o.text = function (e, t, n) {
                var i = e.text;
                if ((0, d.isDefined)(e.displayText)) {
                  i = e.displayText;
                } else if ((0, d.isDefined)(e.caption)) {
                  i = e.caption;
                } else if (e.type === "GT") {
                  i = n.texts.grandTotal;
                }
                if (e.isAdditionalTotal) {
                  i = (0, u.format)(n.texts.total || "", i);
                }
                return i;
              }(o, 0, a);
            }
          })).done(function () {
            if (!e.length) {
              e.push({});
            }
            a.notifyProgress(1);
            p.resolve(e);
          });
        });
      });
      return p;
    }
    function n(e, t, n) {
      var i = (e[t] = e[t] || [])[n] = {};
      if (e[t + 1]) {
        i.children = e[t + 1];
        for (var o = t + 1; o < e.length; o += 1) {
          e[o] = undefined;
        }
        e.length = t + 1;
      }
      return i;
    }
    return function (n, i, o, a, s) {
      var l = [];
      var u = function (e) {
        var t = 0;
        (0, g.foreachTree)(e, function (e) {
          t = y.max(t, e.length);
        });
        return t;
      }(n) || 1;
      var d = new r.Deferred();
      t(n, i, o, u, s).done(function (t) {
        (function (t, n, i, o, a) {
          var r;
          var s;
          var l = 0;
          var u = [0];
          (0, g.foreachTree)(n, function (n) {
            var d = n[0];
            for (s = d.isMetric ? i : n.length - 1; u.length - 1 < s;) {
              u.push(u[u.length - 1]);
            }
            r = u[s] || 0;
            l = e(t, {
              headerItem: d,
              index: r,
              lastIndex: l,
              depth: s,
              isHorizontal: o,
              isTree: a
            });
            u.length = s;
            u.push(l);
          });
        })(l, t, u, a, s.layout === "tree");
        s.notifyProgress(1);
        d.resolve(l);
      });
      return d;
    };
  }();
  function n(e, t) {
    var n = [];
    (0, l.each)(e, function (e, i) {
      var o = (0, g.findField)(t, i.sortBySummaryField);
      if (o >= 0) {
        n.push((i.sortBySummaryPath || []).concat([o]));
      }
    });
    return n;
  }
  function i(e, t) {
    var n = 0;
    var i = [];
    for (var o = 0; o < e.length; o += 1) {
      for (var a = 0; a < e[o].length; a += 1) {
        var r = o + ((e[o][a].rowspan || 1) - 1);
        if (i[o]) {
          n -= i[o];
          i[o] = 0;
        }
        if (t(e[o][a], r, o, a, n) === false) {
          break;
        }
        i[o + (e[o][a].rowspan || 1)] = (i[o + (e[o][a].rowspan || 1)] || 0) + 1;
        n += 1;
      }
    }
  }
  function m(e, t) {
    var n = 0;
    var i = [];
    (0, g.foreachTree)(e, function (e) {
      var o = e[0];
      var a = (0, g.createPath)(e);
      if (!o.children || t.showTotals !== false) {
        var r = (0, s.extend)(true, {}, o, {
          visibleIndex: n += 1,
          path: a
        });
        if ((0, d.isDefined)(r.index)) {
          i[r.index] = r;
        } else {
          i.push(r);
        }
      }
    });
    return i;
  }
  function _(e, t, n) {
    return new f.default.VirtualScrollController(t, (0, s.extend)({
      hasKnownLastPage: function () {
        return true;
      },
      pageCount: function () {
        return y.ceil(this.totalItemsCount() / this.pageSize());
      },
      updateLoading: function () {},
      itemsCount: function () {
        if (this.pageIndex() < this.pageCount() - 1) {
          return this.pageSize();
        } else {
          return this.totalItemsCount() % this.pageSize();
        }
      },
      items: function () {
        return [];
      },
      viewportItems: function () {
        return [];
      },
      onChanged: function () {},
      isLoading: function () {
        return e.isLoading();
      },
      changingDuration: function () {
        if (e._dataSource.paginate()) {
          return 300;
        } else {
          return e._changingDuration || 0;
        }
      }
    }, n));
  }
  var x = {
    ctor: function (e) {
      var t = this;
      var n = t._fireChanged.bind(t);
      e = t._options = e || {};
      t.dataSourceChanged = (0, o.default)();
      t._dataSource = t._createDataSource(e);
      if (e.component && e.component.option("scrolling.mode") === "virtual") {
        t._rowsScrollController = _(t, e.component, {
          totalItemsCount: function () {
            return t.totalRowCount();
          },
          pageIndex: function (e) {
            return t.rowPageIndex(e);
          },
          pageSize: function () {
            return t.rowPageSize();
          },
          load: function () {
            if (t._rowsScrollController.pageIndex() >= this.pageCount()) {
              t._rowsScrollController.pageIndex(this.pageCount() - 1);
            }
            return t._rowsScrollController.handleDataChanged(function () {
              if (t._dataSource.paginate()) {
                t._dataSource.load();
              } else {
                n.apply(this, arguments);
              }
            });
          }
        });
        t._columnsScrollController = _(t, e.component, {
          totalItemsCount: function () {
            return t.totalColumnCount();
          },
          pageIndex: function (e) {
            return t.columnPageIndex(e);
          },
          pageSize: function () {
            return t.columnPageSize();
          },
          load: function () {
            if (t._columnsScrollController.pageIndex() >= this.pageCount()) {
              t._columnsScrollController.pageIndex(this.pageCount() - 1);
            }
            return t._columnsScrollController.handleDataChanged(function () {
              if (t._dataSource.paginate()) {
                t._dataSource.load();
              } else {
                n.apply(this, arguments);
              }
            });
          }
        });
      }
      t._stateStoringController = new c.default.StateStoringController(e.component).init();
      t._columnsInfo = [];
      t._rowsInfo = [];
      t._cellsInfo = [];
      t.expandValueChanging = (0, o.default)();
      t.loadingChanged = (0, o.default)();
      t.progressChanged = (0, o.default)();
      t.scrollChanged = (0, o.default)();
      t.load();
      t._update();
      t.changed = (0, o.default)();
    },
    _fireChanged: function () {
      var e = new Date();
      if (this.changed && !this._lockChanged) {
        this.changed.fire();
      }
      this._changingDuration = new Date() - e;
    },
    _correctSkipsTakes: function (e, t, n, i, o, a) {
      var r = n ? e + n - 1 : e;
      o[i.length] = o[i.length] || 0;
      a[i.length] = a[i.length] || 0;
      if (r < t) {
        o[i.length] += 1;
      } else {
        a[i.length] += 1;
      }
    },
    _calculatePagingForRowExpandedPaths: function (e, t, n, i, o) {
      var a;
      var r;
      var s;
      var l = this._rowsInfo;
      var u = Math.min(e.rowSkip + e.rowTake, l.length);
      var d = e.rowExpandedPaths;
      var c = [];
      var h = {};
      d.forEach(function (e, t) {
        h[e] = t;
      });
      a = 0;
      for (; a < u; a += 1) {
        n.length = t.length = c.length + 1;
        r = 0;
        for (; r < l[a].length; r += 1) {
          var f = l[a][r];
          if (f.type === "D") {
            this._correctSkipsTakes(a, e.rowSkip, f.rowspan, c, t, n);
            var p = (s = f.path || s) && s.length > 1 ? h[s.slice(0, -1)] : -1;
            if (p >= 0) {
              i[p] = t[c.length] || 0;
              o[p] = n[c.length] || 0;
            }
            if (f.rowspan) {
              c.push(f.rowspan);
            }
          }
        }
        c = c.map(function (e) {
          return e - 1;
        }).filter(function (e) {
          return e > 0;
        });
      }
    },
    _calculatePagingForColumnExpandedPaths: function (e, t, n, i, o) {
      var a = {};
      var r = {};
      (0, h.foreachColumnInfo)(this._columnsInfo, function (t, n) {
        if (t.type === "D" && t.path && t.dataIndex === undefined) {
          var i = t.colspan || 1;
          var o = t.path.slice(0, -1).toString();
          a[o] = a[o] || 0;
          r[o] = r[o] || 0;
          if (n + i <= e.columnSkip) {
            a[o] += 1;
          } else if (n < e.columnSkip + e.columnTake) {
            r[o] += 1;
          }
        }
      });
      t[0] = a[""];
      n[0] = r[""];
      e.columnExpandedPaths.forEach(function (e, t) {
        var n = a[e];
        var s = r[e];
        if (n !== undefined) {
          i[t] = n;
        }
        if (s !== undefined) {
          o[t] = s;
        }
      });
    },
    _processPagingForExpandedPaths: function (e, t, n, i) {
      var o = e[`${t}ExpandedPaths`];
      var a = o.map(function () {
        return 0;
      });
      var r = o.map(function () {
        if (i) {
          return e.pageSize;
        } else {
          return 0;
        }
      });
      var s = [];
      var l = [];
      if (!i) {
        if (t === "row") {
          this._calculatePagingForRowExpandedPaths(e, s, l, a, r);
        } else {
          this._calculatePagingForColumnExpandedPaths(e, s, l, a, r);
        }
      }
      this._savePagingForExpandedPaths(e, t, n, s[0], l[0], a, r);
    },
    _savePagingForExpandedPaths: function (e, t, n, i, o, a, r) {
      var l = e[`${t}ExpandedPaths`];
      e[`${t}ExpandedPaths`] = [];
      e[`${t}Skip`] = i !== undefined ? i : e[`${t}Skip`];
      e[`${t}Take`] = o !== undefined ? o : e[`${t}Take`];
      for (var u = 0; u < l.length; u += 1) {
        if (r[u]) {
          var d;
          var c = e.area && e.area !== t;
          n.push((0, s.extend)({
            area: t,
            headerName: `${t}s`
          }, e, (v(d = {}, `${t}Skip`, a[u]), v(d, `${t}Take`, r[u]), v(d, c ? "oppositePath" : "path", l[u]), d)));
        }
      }
    },
    _handleCustomizeStoreLoadOptions: function (e, t) {
      var n = this;
      var i = e[0];
      var o = this._rowsScrollController;
      if (this._dataSource.paginate() && o) {
        var a = o.pageSize();
        if (i.headerName === "rows") {
          i.rowSkip = 0;
          i.rowTake = a;
          i.rowExpandedPaths = [];
        } else {
          i.rowSkip = o.beginPageIndex() * a;
          i.rowTake = (o.endPageIndex() - o.beginPageIndex() + 1) * a;
          this._processPagingForExpandedPaths(i, "row", e, t);
        }
      }
      var r = this._columnsScrollController;
      if (this._dataSource.paginate() && r) {
        var s = r.pageSize();
        e.forEach(function (i) {
          if (i.headerName === "columns") {
            i.columnSkip = 0;
            i.columnTake = s;
            i.columnExpandedPaths = [];
          } else {
            i.columnSkip = r.beginPageIndex() * s;
            i.columnTake = (r.endPageIndex() - r.beginPageIndex() + 1) * s;
            n._processPagingForExpandedPaths(i, "column", e, t);
          }
        });
      }
    },
    load: function () {
      var e = this;
      var t = this._stateStoringController;
      if (t.isEnabled() && !t.isLoaded()) {
        t.load().always(function (t) {
          if (t) {
            e._dataSource.state(t);
          } else {
            e._dataSource.load();
          }
        });
      } else {
        e._dataSource.load();
      }
    },
    calculateVirtualContentParams: function (e) {
      var t = this._rowsScrollController;
      var n = this._columnsScrollController;
      if (t && n) {
        t.viewportItemSize(e.virtualRowHeight);
        t.viewportSize(e.viewportHeight / t.viewportItemSize());
        t.setContentItemSizes(e.itemHeights);
        n.viewportItemSize(e.virtualColumnWidth);
        n.viewportSize(e.viewportWidth / n.viewportItemSize());
        n.setContentItemSizes(e.itemWidths);
        (0, a.deferUpdate)(function () {
          n.loadIfNeed();
          t.loadIfNeed();
        });
        this.scrollChanged.fire({
          left: n.getViewportPosition(),
          top: t.getViewportPosition()
        });
        return {
          contentTop: t.getContentOffset(),
          contentLeft: n.getContentOffset(),
          width: n.getVirtualContentSize(),
          height: t.getVirtualContentSize()
        };
      }
    },
    setViewportPosition: function (e, t) {
      this._rowsScrollController.setViewportPosition(t || 0);
      this._columnsScrollController.setViewportPosition(e || 0);
    },
    subscribeToWindowScrollEvents: function (e) {
      var t;
      if ((t = this._rowsScrollController) !== null && t !== undefined) {
        t.subscribeToWindowScrollEvents(e);
      }
    },
    updateWindowScrollPosition: function (e) {
      var t;
      if ((t = this._rowsScrollController) !== null && t !== undefined) {
        t.scrollTo(e);
      }
    },
    updateViewOptions: function (e) {
      (0, s.extend)(this._options, e);
      this._update();
    },
    _handleExpandValueChanging: function (e) {
      this.expandValueChanging.fire(e);
    },
    _handleLoadingChanged: function (e) {
      this.loadingChanged.fire(e);
    },
    _handleProgressChanged: function (e) {
      this.progressChanged.fire(e);
    },
    _handleFieldsPrepared: function (e) {
      if (this._options.onFieldsPrepared) {
        this._options.onFieldsPrepared(e);
      }
    },
    _createDataSource: function (e) {
      var t;
      var n = this;
      var i = e.dataSource;
      n._isSharedDataSource = i instanceof p.PivotGridDataSource;
      t = n._isSharedDataSource ? i : new p.PivotGridDataSource(i);
      n._expandValueChangingHandler = n._handleExpandValueChanging.bind(n);
      n._loadingChangedHandler = n._handleLoadingChanged.bind(n);
      n._fieldsPreparedHandler = n._handleFieldsPrepared.bind(n);
      n._customizeStoreLoadOptionsHandler = n._handleCustomizeStoreLoadOptions.bind(n);
      n._changedHandler = function () {
        n._update();
        n.dataSourceChanged.fire();
      };
      n._progressChangedHandler = function (e) {
        n._handleProgressChanged(e * 0.8);
      };
      t.on("changed", n._changedHandler);
      t.on("expandValueChanging", n._expandValueChangingHandler);
      t.on("loadingChanged", n._loadingChangedHandler);
      t.on("progressChanged", n._progressChangedHandler);
      t.on("fieldsPrepared", n._fieldsPreparedHandler);
      t.on("customizeStoreLoadOptions", n._customizeStoreLoadOptionsHandler);
      return t;
    },
    getDataSource: function () {
      return this._dataSource;
    },
    isLoading: function () {
      return this._dataSource.isLoading();
    },
    beginLoading: function () {
      this._dataSource.beginLoading();
    },
    endLoading: function () {
      this._dataSource.endLoading();
    },
    _update: function () {
      var e = this;
      var i = e._dataSource;
      var o = e._options;
      var a = i.getAreaFields("column");
      var s = i.getAreaFields("row");
      var u = i.getAreaFields("data");
      var c = o.dataFieldArea === "row" ? u : [];
      var h = o.dataFieldArea !== "row" ? u : [];
      var f = i.getData();
      var p = function (e) {
        var t = [];
        (0, l.each)(e, function (e, n) {
          if (n.showTotals === false) {
            t.push(e);
          }
        });
        return t;
      }(u);
      var g = function (e) {
        var t = [];
        e.forEach(function (e, n) {
          if (e.showValues === undefined && e.showTotals === false || e.showValues === false) {
            t.push(n);
          }
        });
        return t;
      }(u);
      var _ = function (e, t) {
        var n = [];
        (0, l.each)(e, function (e, t) {
          if (t.showGrandTotals === false) {
            n.push(e);
          }
        });
        if (t.length === 0 && n.length === e.length) {
          n = [];
        }
        return n;
      }(u, a);
      var v = !(u.length > 0) || _.length !== u.length;
      var y = {
        isEmptyGrandTotal: f.isEmptyGrandTotalRow,
        texts: o.texts || {},
        hiddenTotals: p,
        hiddenValues: g,
        hiddenGrandTotals: [],
        showTotals: o.showRowTotals,
        showGrandTotals: o.showRowGrandTotals !== false && v,
        sortBySummaryPaths: n(a, u),
        showTotalsPrior: o.showTotalsPrior === "rows" || o.showTotalsPrior === "both",
        showEmpty: !o.hideEmptySummaryCells,
        layout: o.rowHeaderLayout,
        fields: s,
        dataFields: u,
        progress: 0
      };
      var b = {
        isEmptyGrandTotal: f.isEmptyGrandTotalColumn,
        texts: o.texts || {},
        hiddenTotals: p,
        hiddenValues: g,
        hiddenGrandTotals: _,
        showTotals: o.showColumnTotals,
        showTotalsPrior: o.showTotalsPrior === "columns" || o.showTotalsPrior === "both",
        showGrandTotals: o.showColumnGrandTotals !== false && v,
        sortBySummaryPaths: n(s, u),
        showEmpty: !o.hideEmptySummaryCells,
        fields: a,
        dataFields: u,
        progress: 0
      };
      function x(t) {
        this.progress = t;
        e._handleProgressChanged(0.8 + y.progress * 0.1 + b.progress * 0.1);
      }
      y.notifyProgress = x;
      b.notifyProgress = x;
      if (!(0, d.isDefined)(f.grandTotalRowIndex)) {
        f.grandTotalRowIndex = m(f.rows, y).length;
      }
      if (!(0, d.isDefined)(f.grandTotalColumnIndex)) {
        f.grandTotalColumnIndex = m(f.columns, b).length;
      }
      i._changeLoadingCount(1);
      (0, r.when)(t(f.columns, a, h, true, b), t(f.rows, s, c, false, y)).always(function () {
        i._changeLoadingCount(-1);
      }).done(function (t, n) {
        e._columnsInfo = t;
        e._rowsInfo = n;
        if (e._rowsScrollController && e._columnsScrollController && e.changed && !e._dataSource.paginate()) {
          e._rowsScrollController.reset(true);
          e._columnsScrollController.reset(true);
          e._lockChanged = true;
          e._rowsScrollController.load();
          e._columnsScrollController.load();
          e._lockChanged = false;
        }
      }).done(function () {
        e._fireChanged();
        if (e._stateStoringController.isEnabled() && !e._dataSource.isLoading()) {
          e._stateStoringController.state(e._dataSource.state());
          e._stateStoringController.save();
        }
      });
    },
    getRowsInfo: function (e) {
      var t;
      var n = this._rowsInfo;
      var o = this._rowsScrollController;
      if (o && !e) {
        var a = o.beginPageIndex() * this.rowPageSize();
        var r = o.endPageIndex() * this.rowPageSize() + this.rowPageSize();
        var l = [];
        var u = 1;
        i(n, function (e, n, i, o, d) {
          var c = i < a ? 0 : i - a;
          var h = e;
          if (!(n >= a) || !(i < r)) {
            return false;
          }
          l[c] = l[c] || [];
          t = i < a ? e.rowspan - (a - i) || 1 : e.rowspan;
          if (a + c + t > r) {
            t = r - (c + a) || 1;
          }
          if (t !== e.rowspan) {
            h = (0, s.extend)({}, h, {
              rowspan: t
            });
          }
          l[c].push(h);
          u = y.max(u, d + 1);
        });
        i(l, function (e, t, n, i, o) {
          if (o + (e.colspan || 1) > u) {
            l[n][i] = (0, s.extend)({}, e, {
              colspan: u - o || 1
            });
          }
        });
        return l;
      }
      return n;
    },
    getColumnsInfo: function (e) {
      var t = this._columnsInfo;
      var n = this._columnsScrollController;
      if (n && !e) {
        var i = n.beginPageIndex() * this.columnPageSize();
        var o = n.endPageIndex() * this.columnPageSize() + this.columnPageSize();
        t = (0, h.createColumnsInfo)(t, i, o);
      }
      return t;
    },
    totalRowCount: function () {
      return this._rowsInfo.length;
    },
    rowPageIndex: function (e) {
      if (e !== undefined) {
        this._rowPageIndex = e;
      }
      return this._rowPageIndex || 0;
    },
    totalColumnCount: function () {
      var e = 0;
      if (this._columnsInfo && this._columnsInfo.length) {
        for (var t = 0; t < this._columnsInfo[0].length; t += 1) {
          e += this._columnsInfo[0][t].colspan || 1;
        }
      }
      return e;
    },
    rowPageSize: function (e) {
      if (e !== undefined) {
        this._rowPageSize = e;
      }
      return this._rowPageSize || 20;
    },
    columnPageSize: function (e) {
      if (e !== undefined) {
        this._columnPageSize = e;
      }
      return this._columnPageSize || 20;
    },
    columnPageIndex: function (e) {
      if (e !== undefined) {
        this._columnPageIndex = e;
      }
      return this._columnPageIndex || 0;
    },
    getCellsInfo: function (t) {
      var n = this.getRowsInfo(t);
      var o = this.getColumnsInfo(t);
      var a = this._dataSource.getData();
      var r = this._options.texts || {};
      return function (t, n, o, a, r, s) {
        var l = [];
        var u = r === "row";
        var d = o.values;
        if (d.length) {
          i(t, function (t, i) {
            var r = l[i] = [];
            var c = d[t.dataSourceIndex >= 0 ? t.dataSourceIndex : o.grandTotalRowIndex] || [];
            if (t.isLast) {
              (0, h.foreachColumnInfo)(n, function (n, i) {
                var l = (u ? t.dataIndex : n.dataIndex) || 0;
                var d = a[l];
                if (n.isLast && d && d.visible !== false) {
                  var h = c[n.dataSourceIndex >= 0 ? n.dataSourceIndex : o.grandTotalColumnIndex];
                  if (!Array.isArray(h)) {
                    h = [h];
                  }
                  var f = h[l];
                  r[i] = {
                    text: e(f, d, s),
                    value: f,
                    format: d.format,
                    dataType: d.dataType,
                    columnType: n.type,
                    rowType: t.type,
                    rowPath: t.path || [],
                    columnPath: n.path || [],
                    dataIndex: l
                  };
                  if (d.width) {
                    r[i].width = d.width;
                  }
                }
              });
            }
          });
        }
        return l;
      }(n, o, a, this._dataSource.getAreaFields("data"), this._options.dataFieldArea, r.dataNotAvailable);
    },
    dispose: function () {
      if (this._isSharedDataSource) {
        this._dataSource.off("changed", this._changedHandler);
        this._dataSource.off("expandValueChanging", this._expandValueChangingHandler);
        this._dataSource.off("loadingChanged", this._loadingChangedHandler);
        this._dataSource.off("progressChanged", this._progressChangedHandler);
        this._dataSource.off("fieldsPrepared", this._fieldsPreparedHandler);
        this._dataSource.off("customizeStoreLoadOptions", this._customizeStoreLoadOptionsHandler);
      } else {
        this._dataSource.dispose();
      }
      if (this._columnsScrollController) {
        this._columnsScrollController.dispose();
      }
      if (this._rowsScrollController) {
        this._rowsScrollController.dispose();
      }
      this._stateStoringController.dispose();
      this.expandValueChanging.empty();
      this.changed.empty();
      this.loadingChanged.empty();
      this.progressChanged.empty();
      this.scrollChanged.empty();
      this.dataSourceChanged.empty();
    }
  };
  b(x, "applyPartialDataSource");
  b(x, "collapseHeaderItem");
  b(x, "expandHeaderItem");
  b(x, "getData");
  b(x, "isEmpty");
  return x;
}());
exports.DataController = x;
var w = {
  NO_DATA_AVAILABLE_TEXT: "#N/A"
};
exports.DataController__internals = w;
var C = {
  DataController: x,
  DataController__internals: w
};
exports.default = C;