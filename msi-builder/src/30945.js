Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i = f(require("./44504.js"));
var o = require("./20576.js");
var a = require("./62754.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./35922.js");
var u = f(require("./26562.js"));
var d = require("./60637.js");
var c = f(require("./15943.js"));
var h = f(require("./60082.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var g = c.default.Controller.inherit(function () {
  function e(t, n) {
    if (t && (t = t.slice(0), n)) {
      for (var i = 0; i < t.length; i++) {
        t[i] = (0, r.extend)({
          key: t[i].key
        }, t[i]);
        t[i].items = e(t[i].items, n - 1);
      }
    }
    return t;
  }
  function t(e, t, n) {
    var i = {
      reload: true,
      fullReload: true
    };
    if (t) {
      (i = {
        sorting: !h.default.equalSortParameters(e.sort, t.sort),
        grouping: !h.default.equalSortParameters(e.group, t.group, true),
        groupExpanding: !h.default.equalSortParameters(e.group, t.group) || t.groupExpand,
        filtering: !h.default.equalFilterParameters(e.filter, t.filter),
        pageIndex: e.pageIndex !== t.pageIndex,
        skip: e.skip !== t.skip,
        take: e.take !== t.take,
        pageSize: e.pageSize !== t.pageSize,
        fullReload: n,
        reload: false,
        paging: false
      }).reload = n || i.sorting || i.grouping || i.filtering;
      i.paging = i.pageIndex || i.pageSize || i.take;
    }
    return i;
  }
  function n(e, t) {
    var n = h.default.normalizeSortingInfo(e.group || e.storeLoadOptions.group || e.loadOptions.group).length;
    var i = [];
    if (c(i, e, n)) {
      return i;
    }
    if (t) {
      (function (e, t, n) {
        var a = e.length;
        var r = t.storeLoadOptions;
        if (r.skip !== undefined && r.take && !n) {
          var s = [];
          c(s, t, n, true);
          var l = s.length;
          if (a || l) {
            t.skip = t.skip ?? r.skip;
            t.take = t.take ?? r.take;
          }
          if (a) {
            r.skip += a;
            r.take -= a;
            t.cachedDataPartBegin = e;
          }
          if (l) {
            r.take -= l;
            t.cachedDataPartEnd = s.reverse();
          }
        }
      })(i, e, n);
    }
  }
  function c(e, t, n, i) {
    var u = t.storeLoadOptions;
    var d = t.take ?? u.take ?? 0;
    var c = t.cachedData?.items;
    if (d && c) {
      var h = t.skip ?? u.skip ?? 0;
      for (var p = 0; p < d; p++) {
        var g = i ? d - 1 - p : p;
        var m = g + h;
        var _ = c[m];
        if (_ === undefined && m in c) {
          return true;
        }
        var v = f(t, _, n, g, d);
        if (!v) {
          return false;
        }
        e.push(v);
      }
      return true;
    }
    return false;
  }
  function f(e, t, n, i, o) {
    if (n && t) {
      return function e(t, n, i, o) {
        if (n && t) {
          var a = p({}, t);
          var r = i[0] || 0;
          var s = o[0];
          var l = t.items;
          if (l) {
            if (s === undefined && !l[r]) {
              return;
            }
            a.items = [];
            if (i.length) {
              a.isContinuation = true;
            }
            if (s) {
              a.isContinuationOnNextPage = t.count > s;
            }
            for (var u = 0; s === undefined ? l[u + r] : u < s; u++) {
              var d = l[u + r];
              var c = u + 1 === s;
              var h = e(d, n - 1, u === 0 ? i.slice(1) : [], c ? o.slice(1) : []);
              if (h === undefined) {
                return;
              }
              a.items.push(h);
            }
          }
          return a;
        }
        return t;
      }(t, n, i === 0 && e.skips || [], i === o - 1 && e.takes || []);
    } else {
      return t;
    }
  }
  function g(e, t, n, i) {
    if (n && t) {
      var o = p({}, t);
      delete o.isContinuation;
      delete o.isContinuationOnNextPage;
      var a = i[0] || 0;
      if (t.items) {
        o.items = (e == null ? undefined : e.items) || {};
        t.items.forEach(function (e, t) {
          var r = t + a;
          var s = t === 0 ? i.slice(1) : [];
          o.items[r] = g(o.items[r], e, n - 1, s);
        });
      }
      return o;
    }
    return t;
  }
  return {
    init: function (e, t) {
      var n = this;
      n._dataSource = e;
      n._remoteOperations = t || {};
      n._isLastPage = !e.isLastPage();
      n._hasLastPage = false;
      n._currentTotalCount = 0;
      n._cachedData = {
        items: {}
      };
      n._lastOperationTypes = {};
      n._eventsStrategy = e._eventsStrategy;
      n._totalCountCorrection = 0;
      n._isLoadingAll = false;
      n.changed = (0, i.default)();
      n.loadingChanged = (0, i.default)();
      n.loadError = (0, i.default)();
      n.customizeStoreLoadOptions = (0, i.default)();
      n.changing = (0, i.default)();
      n.pushed = (0, i.default)();
      n._dataChangedHandler = n._handleDataChanged.bind(n);
      n._customizeStoreLoadOptionsHandler = n._handleCustomizeStoreLoadOptions.bind(n);
      n._dataLoadedHandler = n._handleDataLoaded.bind(n);
      n._loadingChangedHandler = n._handleLoadingChanged.bind(n);
      n._loadErrorHandler = n._handleLoadError.bind(n);
      n._pushHandler = n._handlePush.bind(n);
      n._changingHandler = n._handleChanging.bind(n);
      e.on("changed", n._dataChangedHandler);
      e.on("customizeStoreLoadOptions", n._customizeStoreLoadOptionsHandler);
      e.on("customizeLoadResult", n._dataLoadedHandler);
      e.on("loadingChanged", n._loadingChangedHandler);
      e.on("loadError", n._loadErrorHandler);
      e.on("changing", n._changingHandler);
      e.store().on("beforePush", n._pushHandler);
      (0, s.each)(e, function (e, t) {
        if (!n[e] && (0, l.isFunction)(t)) {
          n[e] = function () {
            return this._dataSource[e].apply(this._dataSource, arguments);
          };
        }
      });
    },
    remoteOperations: function () {
      return this._remoteOperations;
    },
    dispose: function (e) {
      var t = this._dataSource;
      var n = t.store();
      t.off("changed", this._dataChangedHandler);
      t.off("customizeStoreLoadOptions", this._customizeStoreLoadOptionsHandler);
      t.off("customizeLoadResult", this._dataLoadedHandler);
      t.off("loadingChanged", this._loadingChangedHandler);
      t.off("loadError", this._loadErrorHandler);
      t.off("changing", this._changingHandler);
      if (n) {
        n.off("beforePush", this._pushHandler);
      }
      if (!e) {
        t.dispose();
      }
    },
    refresh: function (e, t) {
      var n = this._dataSource;
      if (t.reload) {
        this.resetCurrentTotalCount();
        this._isLastPage = !n.paginate();
        this._hasLastPage = this._isLastPage;
      }
    },
    resetCurrentTotalCount: function () {
      this._currentTotalCount = 0;
      this._totalCountCorrection = 0;
    },
    resetCache: function () {
      this._cachedStoreData = undefined;
      this._cachedPagingData = undefined;
    },
    resetPagesCache: function () {
      this._cachedData = {
        items: {}
      };
    },
    _needClearStoreDataCache: function () {
      var e = this.remoteOperations();
      var n = t(this._lastLoadOptions || {}, {});
      return !Object.keys(e).every(function (t) {
        return !n[t] || !e[t];
      });
    },
    push: function (e, t) {
      var n = this.store();
      if (this._needClearStoreDataCache()) {
        this._cachedStoreData = undefined;
      }
      this._cachedPagingData = undefined;
      this.resetPagesCache(true);
      if (this._cachedStoreData) {
        (0, d.applyBatch)({
          keyInfo: n,
          data: this._cachedStoreData,
          changes: e
        });
      }
      if (!t) {
        this._applyBatch(e);
      }
      this.pushed.fire(e);
    },
    getDataIndexGetter: function () {
      var e = this;
      if (!this._dataIndexGetter) {
        var t;
        var n;
        var i = this.store();
        this._dataIndexGetter = function (a) {
          var r = n && n !== e._cachedStoreData;
          if (!t || r) {
            n = e._cachedStoreData || [];
            t = {};
            for (var s = 0; s < n.length; s++) {
              t[(0, o.getKeyHash)(i.keyOf(n[s]))] = s;
            }
          }
          return t[(0, o.getKeyHash)(i.keyOf(a))];
        };
      }
      return this._dataIndexGetter;
    },
    _getKeyInfo: function () {
      return this.store();
    },
    _needToCopyDataObject: function () {
      return true;
    },
    _applyBatch: function (e, t) {
      var n = this;
      var i = this._getKeyInfo();
      var o = this._dataSource;
      var a = h.default.normalizeSortingInfo(this.group()).length;
      var r = this.option("editing.refreshMode") === "reshape";
      var s = this.option("scrolling.mode") === "virtual";
      e = e.filter(function (e) {
        return !o.paginate() || e.type !== "insert" || e.index !== undefined;
      });
      function l() {
        if (a) {
          return n.itemsCount();
        } else {
          return n.items().length;
        }
      }
      var u = l();
      (0, d.applyBatch)({
        keyInfo: i,
        data: this._items,
        changes: e,
        groupCount: a,
        useInsertIndex: true,
        skipCopying: !this._needToCopyDataObject()
      });
      (0, d.applyBatch)({
        keyInfo: i,
        data: o.items(),
        changes: e,
        groupCount: a,
        useInsertIndex: true,
        skipCopying: !this._needToCopyDataObject()
      });
      if (this._currentTotalCount > 0 || (t || !r) && s) {
        this._totalCountCorrection += l() - u;
      }
      e.splice(0, e.length);
    },
    _handlePush: function (e) {
      var t = e.changes;
      this.push(t, true);
    },
    _handleChanging: function (e) {
      this.changing.fire(e);
      this._applyBatch(e.changes, true);
    },
    _needCleanCacheByOperation: function (e, t) {
      var n = ["filtering", "sorting", "paging"];
      var i = n.indexOf(e);
      return (i >= 0 ? n.slice(i) : [e]).some(function (e) {
        return t[e];
      });
    },
    _customizeRemoteOperations: function (e, t) {
      var n = this;
      var i = this._cachedStoreData;
      var o = this._cachedPagingData;
      var a = this._cachedData;
      if (e.storeLoadOptions.filter && !e.remoteOperations.filtering || e.storeLoadOptions.sort && !e.remoteOperations.sorting) {
        e.remoteOperations = {
          filtering: e.remoteOperations.filtering,
          summary: e.remoteOperations.summary
        };
      }
      if (t.fullReload) {
        i = undefined;
        o = undefined;
        a = {
          items: {}
        };
      } else {
        if (t.reload) {
          o = undefined;
          a = {
            items: {}
          };
        } else if (t.groupExpanding) {
          a = {
            items: {}
          };
        }
        (0, s.each)(t, function (t, a) {
          if (a && n._needCleanCacheByOperation(t, e.remoteOperations)) {
            i = undefined;
            o = undefined;
          }
        });
      }
      if (o) {
        e.remoteOperations.paging = false;
      }
      e.cachedStoreData = i;
      e.cachedPagingData = o;
      e.cachedData = a;
      if (!e.isCustomLoading) {
        this._cachedStoreData = i;
        this._cachedPagingData = o;
        this._cachedData = a;
      }
    },
    _handleCustomizeStoreLoadOptions: function (e) {
      this._handleDataLoading(e);
      if (e.data?.length !== 0) {
        e.data = n(e, true) || e.cachedStoreData;
      }
    },
    _handleDataLoading: function (e) {
      var n = this;
      var i = this._dataSource;
      var o = this._lastLoadOptions;
      this.customizeStoreLoadOptions.fire(e);
      e.delay = this.option("loadingTimeout");
      e.originalStoreLoadOptions = e.storeLoadOptions;
      e.remoteOperations = (0, r.extend)({}, this.remoteOperations());
      var s = !this.isLoaded() && !this._isRefreshing;
      if (this.option("integrationOptions.renderedOnServer") && !this.isLoaded()) {
        e.delay = undefined;
      }
      var l = (0, r.extend)({
        pageIndex: this.pageIndex(),
        pageSize: this.pageSize()
      }, e.storeLoadOptions);
      var u = t(l, o, s);
      this._customizeRemoteOperations(e, u);
      if (!e.isCustomLoading) {
        var d = this._isRefreshing;
        e.pageIndex = i.pageIndex();
        e.lastLoadOptions = l;
        e.operationTypes = u;
        this._loadingOperationTypes = u;
        this._isRefreshing = true;
        (0, a.when)(d || this._isRefreshed || this.refresh(e, u)).done(function () {
          if (n._lastOperationId === e.operationId) {
            n._isRefreshed = true;
            n.load().always(function () {
              n._isRefreshed = false;
            });
          }
        }).fail(function () {
          i.cancel(e.operationId);
        }).always(function () {
          n._isRefreshing = false;
        });
        i.cancel(this._lastOperationId);
        this._lastOperationId = e.operationId;
        if (this._isRefreshing) {
          i.cancel(this._lastOperationId);
        }
      }
      this._handleDataLoadingCore(e);
    },
    _handleDataLoadingCore: function (e) {
      var t = e.remoteOperations;
      e.loadOptions = {};
      var n = e.cachedData.extra;
      var i = {
        filter: !t.filtering,
        sort: !t.sorting,
        group: !t.grouping,
        summary: !t.summary,
        skip: !t.paging,
        take: !t.paging,
        requireTotalCount: n && "totalCount" in n || !t.paging,
        langParams: !t.filtering || !t.sorting
      };
      (0, s.each)(e.storeLoadOptions, function (t, n) {
        if (i[t]) {
          e.loadOptions[t] = n;
          delete e.storeLoadOptions[t];
        }
      });
      if (n) {
        e.extra = n;
      }
    },
    _handleDataLoaded: function (t) {
      var s = this;
      var d = t.loadOptions;
      var c = t.remoteOperations && !t.remoteOperations.paging;
      var f = t.cachedData;
      var p = t.storeLoadOptions;
      var m = this.option("cacheEnabled") !== false && p;
      var _ = m && !t.isCustomLoading && f && (!c || p.group);
      var v = m && c;
      var y = v && !t.isCustomLoading;
      if (d) {
        if (c) {
          t.skip = d.skip;
          t.take = d.take;
          delete d.skip;
          delete d.take;
        }
        d.group &&= t.group || d.group;
        var b = h.default.normalizeSortingInfo(t.group || p.group || d.group).length;
        if (t.cachedDataPartBegin) {
          t.data = t.cachedDataPartBegin.concat(t.data);
        }
        if (t.cachedDataPartEnd) {
          t.data = t.data.concat(t.cachedDataPartEnd);
        }
        if (!_ || !n(t)) {
          if (v && t.cachedPagingData) {
            t.data = e(t.cachedPagingData, b);
          } else {
            if (y) {
              if (this._cachedStoreData) {
                if (t.mergeStoreLoadData) {
                  t.data = this._cachedStoreData = this._cachedStoreData.concat(t.data);
                }
              } else {
                this._cachedStoreData = e(t.data, h.default.normalizeSortingInfo(p.group).length);
              }
            }
            new u.default(t.data).load(d).done(function (n) {
              t.data = n;
              if (y) {
                s._cachedPagingData = e(t.data, b);
              }
            }).fail(function (e) {
              t.data = new a.Deferred().reject(e);
            });
          }
          if (d.requireTotalCount && c) {
            t.extra = (0, l.isPlainObject)(t.extra) ? t.extra : {};
            t.extra.totalCount = t.data.length;
          }
          if (t.extra && t.extra.totalCount >= 0 && (p.requireTotalCount === false || d.requireTotalCount === false)) {
            t.extra.totalCount = -1;
          }
          if (!d.data && (p.requireTotalCount || (t.extra?.totalCount ?? -1) >= 0)) {
            this._totalCountCorrection = 0;
          }
          this._handleDataLoadedCore(t);
          if (_) {
            f.extra = f.extra || (0, r.extend)({}, t.extra);
            (0, a.when)(t.data).done(function (e) {
              (function (e, t, n) {
                var s = e.storeLoadOptions;
                var l = e.skip ?? s.skip ?? 0;
                for (var u = e.take ?? s.take ?? 0, d = 0; d < u; d++) {
                  var c = d + l;
                  var h = e.cachedData.items;
                  var f = d === 0 && e.skips || [];
                  h[c] = g(h[c], t[d], n, f);
                }
              })(t, e, b);
            });
          }
        }
        (0, a.when)(t.data).done(function () {
          if (t.lastLoadOptions) {
            s._lastLoadOptions = t.lastLoadOptions;
            Object.keys(t.operationTypes).forEach(function (e) {
              s._lastOperationTypes[e] = s._lastOperationTypes[e] || t.operationTypes[e];
            });
          }
        });
        t.storeLoadOptions = t.originalStoreLoadOptions;
      } else {
        this._dataSource.cancel(t.operationId);
      }
    },
    _handleDataLoadedCore: function (e) {
      if (e.remoteOperations && !e.remoteOperations.paging && Array.isArray(e.data)) {
        if (e.skip !== undefined) {
          e.data = e.data.slice(e.skip);
        }
        if (e.take !== undefined) {
          e.data = e.data.slice(0, e.take);
        }
      }
    },
    _handleLoadingChanged: function (e) {
      this.loadingChanged.fire(e);
    },
    _handleLoadError: function (e) {
      this.loadError.fire(e);
      this.changed.fire({
        changeType: "loadError",
        error: e
      });
    },
    _loadPageSize: function () {
      return this.pageSize();
    },
    _handleDataChanged: function (e) {
      var t;
      var n = this._dataSource;
      var i = false;
      var o = !e || (0, l.isDefined)(e.changeType);
      var a = this.itemsCount();
      if (o) {
        this._isLastPage = !a || !this._loadPageSize() || a < this._loadPageSize();
        if (this._isLastPage) {
          this._hasLastPage = true;
        }
      }
      if (n.totalCount() >= 0) {
        if (n.pageIndex() >= this.pageCount()) {
          n.pageIndex(this.pageCount() - 1);
          this.pageIndex(n.pageIndex());
          this.resetPagesCache();
          n.load();
          i = true;
        }
      } else if (o) {
        if ((t = n.pageIndex() * this.pageSize() + a) > this._currentTotalCount) {
          this._currentTotalCount = t;
          if (n.pageIndex() === 0 || !this.option("scrolling.legacyMode")) {
            this._totalCountCorrection = 0;
          }
        }
        if (a === 0 && n.pageIndex() >= this.pageCount()) {
          n.pageIndex(this.pageCount() - 1);
          if (this.option("scrolling.mode") !== "infinite") {
            n.load();
            i = true;
          }
        }
      }
      if (!i) {
        this._operationTypes = this._lastOperationTypes;
        this._lastOperationTypes = {};
        this.component._optionCache = {};
        this.changed.fire(e);
        this.component._optionCache = undefined;
      }
    },
    _scheduleCustomLoadCallbacks: function (e) {
      var t = this;
      t._isCustomLoading = true;
      e.always(function () {
        t._isCustomLoading = false;
      });
    },
    loadingOperationTypes: function () {
      return this._loadingOperationTypes;
    },
    operationTypes: function () {
      return this._operationTypes;
    },
    lastLoadOptions: function () {
      return this._lastLoadOptions || {};
    },
    isLastPage: function () {
      return this._isLastPage;
    },
    _dataSourceTotalCount: function () {
      return this._dataSource.totalCount();
    },
    totalCount: function () {
      return parseInt((this._currentTotalCount || this._dataSourceTotalCount()) + this._totalCountCorrection);
    },
    totalCountCorrection: function () {
      return this._totalCountCorrection;
    },
    itemsCount: function () {
      return this._dataSource.items().length;
    },
    totalItemsCount: function () {
      return this.totalCount();
    },
    pageSize: function () {
      var e = this._dataSource;
      if (arguments.length || e.paginate()) {
        return e.pageSize.apply(e, arguments);
      } else {
        return 0;
      }
    },
    pageCount: function () {
      var e = this.totalItemsCount() - this._totalCountCorrection;
      var t = this.pageSize();
      if (t && e > 0) {
        return Math.max(1, Math.ceil(e / t));
      } else {
        return 1;
      }
    },
    hasKnownLastPage: function () {
      return this._hasLastPage || this._dataSource.totalCount() >= 0;
    },
    loadFromStore: function (e, t) {
      var n = this._dataSource;
      var i = new a.Deferred();
      if (n) {
        (t = t || n.store()).load(e).done(function (e, t) {
          if (e && !Array.isArray(e) && Array.isArray(e.data)) {
            t = e;
            e = e.data;
          }
          i.resolve(e, t);
        }).fail(i.reject);
        return i;
      }
    },
    isCustomLoading: function () {
      return !!this._isCustomLoading;
    },
    load: function (e) {
      var t;
      var n;
      var i = this;
      var u = this;
      var d = u._dataSource;
      var c = new a.Deferred();
      if (e) {
        var h = d.store();
        var f = d.loadOptions();
        var p = {
          storeLoadOptions: (0, r.extend)({}, e, {
            langParams: f == null ? undefined : f.langParams
          }),
          isCustomLoading: true
        };
        (0, s.each)(h._customLoadOptions() || [], function (e, t) {
          if (!(t in p.storeLoadOptions)) {
            p.storeLoadOptions[t] = f[t];
          }
        });
        this._isLoadingAll = e.isLoadingAll;
        u._scheduleCustomLoadCallbacks(c);
        d._scheduleLoadCallbacks(c);
        u._handleCustomizeStoreLoadOptions(p);
        t = function () {
          if (!d.store()) {
            return c.reject("canceled");
          }
          (0, a.when)(p.data || u.loadFromStore(p.storeLoadOptions)).done(function (t, n) {
            p.data = t;
            p.extra = n || {};
            u._handleDataLoaded(p);
            if (e.requireTotalCount && p.extra.totalCount === undefined) {
              p.extra.totalCount = h.totalCount(p.storeLoadOptions);
            }
            (0, a.when)(p.data, p.extra.totalCount).done(function (e, t) {
              p.extra.totalCount = t;
              c.resolve(e, p.extra);
            }).fail(c.reject);
          }).fail(c.reject);
        };
        n = u.option("loadingTimeout");
        if ((0, l.isDefined)(n)) {
          (0, o.executeAsync)(t, n);
        } else {
          t();
        }
        return c.fail(function () {
          u._eventsStrategy.fireEvent("loadError", arguments);
        }).always(function () {
          i._isLoadingAll = false;
        }).promise();
      }
      return d.load();
    },
    reload: function (e) {
      if (e) {
        return this._dataSource.reload();
      } else {
        return this._dataSource.load();
      }
    },
    getCachedStoreData: function () {
      return this._cachedStoreData;
    }
  };
}());
exports.default = g;