exports.DataSource = undefined;
var i = _(require("./38377.js"));
var o = require("./13306.js");
var a = require("./20576.js");
var r = require("./95479.js");
var s = require("./35922.js");
var l = require("./16454.js");
var u = require("./60637.js");
var d = _(require("./88036.js"));
var c = require("./80566.js");
var h = require("./18438.js");
var f = require("./59504.js");
var p = require("./62754.js");
var g = _(require("./88665.js"));
var m = require("./9234.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v() {
  return (v = Object.assign ? Object.assign.bind() : function (e) {
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
function y(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return b(e);
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
      return b(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return b(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function b(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var x = i.default.inherit({
  ctor: function (e) {
    var t;
    var n = this;
    e = (0, m.normalizeDataSourceOptions)(e);
    this._eventsStrategy = new c.EventsStrategy(this, {
      syncStrategy: true
    });
    this._store = e.store;
    this._changedTime = 0;
    if (e.pushAggregationTimeout !== 0) {
      var i;
      var o;
      var a = e.pushAggregationTimeout === undefined ? function () {
        return n._changedTime * 5;
      } : e.pushAggregationTimeout;
      var s = (0, l.throttleChanges)(function (e) {
        i.resolve();
        p.when.apply(undefined, y(o)).done(function () {
          return n._onPush(e);
        });
        o = undefined;
        i = undefined;
      }, a);
      this._onPushHandler = function (e) {
        n._aggregationTimeoutId = s(e.changes);
        i ||= new p.Deferred();
        o = e.waitFor;
        e.waitFor.push(i.promise());
      };
      this._store.on("beforePush", this._onPushHandler);
    } else {
      this._onPushHandler = function (e) {
        return n._onPush(e);
      };
      this._store.on("push", this._onPushHandler);
    }
    this._storeLoadOptions = this._extractLoadOptions(e);
    this._mapFunc = e.map;
    this._postProcessFunc = e.postProcess;
    this._pageIndex = e.pageIndex !== undefined ? e.pageIndex : 0;
    this._pageSize = e.pageSize !== undefined ? e.pageSize : 20;
    this._loadingCount = 0;
    this._loadQueue = this._createLoadQueue();
    this._searchValue = "searchValue" in e ? e.searchValue : null;
    this._searchOperation = e.searchOperation || "contains";
    this._searchExpr = e.searchExpr;
    this._paginate = e.paginate;
    this._reshapeOnPush = (t = e.reshapeOnPush) !== null && t !== undefined && t;
    (0, r.each)(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], function (t, i) {
      if (i in e) {
        n.on(i.substr(2, 1).toLowerCase() + i.substr(3), e[i]);
      }
    });
    this._operationManager = new g.default();
    this._init();
  },
  _init: function () {
    this._items = [];
    this._userData = {};
    this._totalCount = -1;
    this._isLoaded = false;
    if (!(0, s.isDefined)(this._paginate)) {
      this._paginate = !this.group();
    }
    this._isLastPage = !this._paginate;
  },
  dispose: function () {
    var e;
    this._store.off("beforePush", this._onPushHandler);
    this._store.off("push", this._onPushHandler);
    this._eventsStrategy.dispose();
    clearTimeout(this._aggregationTimeoutId);
    if ((e = this._delayedLoadTask) !== null && e !== undefined) {
      e.abort();
    }
    this._operationManager.cancelAll();
    delete this._store;
    delete this._items;
    delete this._delayedLoadTask;
    this._disposed = true;
  },
  _extractLoadOptions: function (e) {
    var t = {};
    var n = ["sort", "filter", "langParams", "select", "group", "requireTotalCount"];
    var i = this._store._customLoadOptions();
    if (i) {
      n = n.concat(i);
    }
    (0, r.each)(n, function () {
      t[this] = e[this];
    });
    return t;
  },
  loadOptions: function () {
    return this._storeLoadOptions;
  },
  items: function () {
    return this._items;
  },
  pageIndex: function (e) {
    if (!(0, s.isNumeric)(e)) {
      return this._pageIndex;
    }
    this._pageIndex = e;
    this._isLastPage = !this._paginate;
  },
  paginate: function (e) {
    if (!(0, s.isBoolean)(e)) {
      return this._paginate;
    }
    if (this._paginate !== e) {
      this._paginate = e;
      this.pageIndex(0);
    }
  },
  pageSize: function (e) {
    if (!(0, s.isNumeric)(e)) {
      return this._pageSize;
    }
    this._pageSize = e;
  },
  isLastPage: function () {
    return this._isLastPage;
  },
  generateStoreLoadOptionAccessor: function (e) {
    var t = this;
    return function (n) {
      var i = (0, m.normalizeStoreLoadOptionAccessorArguments)(n);
      if (i === undefined) {
        return t._storeLoadOptions[e];
      }
      t._storeLoadOptions[e] = i;
    };
  },
  sort: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return this.generateStoreLoadOptionAccessor("sort")(t);
  },
  filter: function () {
    var e = (0, m.normalizeStoreLoadOptionAccessorArguments)(arguments);
    if (e === undefined) {
      return this._storeLoadOptions.filter;
    }
    this._storeLoadOptions.filter = e;
    this.pageIndex(0);
  },
  group: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return this.generateStoreLoadOptionAccessor("group")(t);
  },
  select: function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    return this.generateStoreLoadOptionAccessor("select")(t);
  },
  requireTotalCount: function (e) {
    if (!(0, s.isBoolean)(e)) {
      return this._storeLoadOptions.requireTotalCount;
    }
    this._storeLoadOptions.requireTotalCount = e;
  },
  searchValue: function (e) {
    if (arguments.length < 1) {
      return this._searchValue;
    }
    this._searchValue = e;
    this.pageIndex(0);
  },
  searchOperation: function (e) {
    if (!(0, s.isString)(e)) {
      return this._searchOperation;
    }
    this._searchOperation = e;
    this.pageIndex(0);
  },
  searchExpr: function (e) {
    var t = arguments.length;
    if (t === 0) {
      return this._searchExpr;
    }
    if (t > 1) {
      e = [].slice.call(arguments);
    }
    this._searchExpr = e;
    this.pageIndex(0);
  },
  store: function () {
    return this._store;
  },
  key: function () {
    var e;
    if ((e = this._store) === null || e === undefined) {
      return undefined;
    } else {
      return e.key();
    }
  },
  totalCount: function () {
    return this._totalCount;
  },
  isLoaded: function () {
    return this._isLoaded;
  },
  isLoading: function () {
    return this._loadingCount > 0;
  },
  beginLoading: function () {
    this._changeLoadingCount(1);
  },
  endLoading: function () {
    this._changeLoadingCount(-1);
  },
  _createLoadQueue: function () {
    return (0, f.create)();
  },
  _changeLoadingCount: function (e) {
    var t = this.isLoading();
    this._loadingCount += e;
    var n = this.isLoading();
    if (t ^ n) {
      this._eventsStrategy.fireEvent("loadingChanged", [n]);
    }
  },
  _scheduleLoadCallbacks: function (e) {
    var t = this;
    this.beginLoading();
    e.always(function () {
      t.endLoading();
    });
  },
  _scheduleFailCallbacks: function (e) {
    var t = this;
    e.fail(function () {
      for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++) {
        n[i] = arguments[i];
      }
      if (n[0] !== m.CANCELED_TOKEN) {
        t._eventsStrategy.fireEvent("loadError", n);
      }
    });
  },
  _fireChanged: function (e) {
    var t = new Date();
    this._eventsStrategy.fireEvent("changed", e);
    this._changedTime = new Date() - t;
  },
  _scheduleChangedCallbacks: function (e) {
    var t = this;
    e.done(function () {
      return t._fireChanged();
    });
  },
  loadSingle: function (e, t) {
    var n = this;
    var i = new p.Deferred();
    var o = this.key();
    var a = this._store;
    var r = this._createStoreLoadOptions();
    function l(e) {
      var t = Array.isArray(e) && !e.length;
      if (!(0, s.isDefined)(e) || t) {
        i.reject(new h.errors.Error("E4009"));
      } else {
        if (!Array.isArray(e)) {
          e = [e];
        }
        i.resolve(n._applyMapFunction(e)[0]);
      }
    }
    this._scheduleFailCallbacks(i);
    if (arguments.length < 2) {
      t = e;
      e = o;
    }
    delete r.skip;
    delete r.group;
    delete r.refresh;
    delete r.pageIndex;
    delete r.searchString;
    function u() {
      return a instanceof d.default && !a._byKeyViaLoad();
    }
    (e === o || u() ? a.byKey(t, r) : (r.take = 1, r.filter = r.filter ? [r.filter, [e, t]] : [e, t], a.load(r))).fail(i.reject).done(l);
    return i.promise();
  },
  load: function () {
    var e = this;
    var t = new p.Deferred();
    function n() {
      if (!e._disposed && (0, m.isPending)(t)) {
        return e._loadFromStore(i, t);
      }
    }
    this._scheduleLoadCallbacks(t);
    this._scheduleFailCallbacks(t);
    this._scheduleChangedCallbacks(t);
    var i = this._createLoadOperation(t);
    this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [i]);
    this._loadQueue.add(function () {
      if (typeof i.delay == "number") {
        e._delayedLoadTask = (0, a.executeAsync)(n, i.delay);
      } else {
        n();
      }
      return t.promise();
    });
    return t.promise({
      operationId: i.operationId
    });
  },
  _onPush: function (e) {
    var t = this;
    if (this._reshapeOnPush) {
      this.load();
    } else {
      var n = {
        changes: e
      };
      this._eventsStrategy.fireEvent("changing", [n]);
      var i = this.group();
      var o = this.items();
      var a = 0;
      var r = this.paginate() || i ? e.filter(function (e) {
        return e.type === "update";
      }) : e;
      if (i) {
        a = Array.isArray(i) ? i.length : 1;
      }
      if (this._mapFunc) {
        r.forEach(function (e) {
          if (e.type === "insert") {
            e.data = t._mapFunc(e.data);
          }
        });
      }
      if (n.postProcessChanges) {
        r = n.postProcessChanges(r);
      }
      (0, u.applyBatch)({
        keyInfo: this.store(),
        data: o,
        changes: r,
        groupCount: a,
        useInsertIndex: true
      });
      this._fireChanged([{
        changes: e
      }]);
    }
  },
  _createLoadOperation: function (e) {
    var t = this;
    var n = this._operationManager.add(e);
    var i = this._createStoreLoadOptions();
    if (this._store && !(0, s.isEmptyObject)(i == null ? undefined : i.langParams)) {
      this._store._langParams = v({}, this._store._langParams, i.langParams);
    }
    e.always(function () {
      return t._operationManager.remove(n);
    });
    return {
      operationId: n,
      storeLoadOptions: i
    };
  },
  reload: function () {
    this.store()._clearCache();
    this._init();
    return this.load();
  },
  cancel: function (e) {
    return this._operationManager.cancel(e);
  },
  cancelAll: function () {
    return this._operationManager.cancelAll();
  },
  _addSearchOptions: function (e) {
    if (!this._disposed) {
      if (this.store()._useDefaultSearch) {
        this._addSearchFilter(e);
      } else {
        e.searchOperation = this._searchOperation;
        e.searchValue = this._searchValue;
        e.searchExpr = this._searchExpr;
      }
    }
  },
  _createStoreLoadOptions: function () {
    var e = (0, o.extend)({}, this._storeLoadOptions);
    this._addSearchOptions(e);
    if (this._paginate && this._pageSize) {
      e.skip = this._pageIndex * this._pageSize;
      e.take = this._pageSize;
    }
    e.userData = this._userData;
    return e;
  },
  _addSearchFilter: function (e) {
    var t = this._searchValue;
    var n = this._searchOperation;
    var i = this._searchExpr;
    var o = [];
    if (t) {
      i ||= "this";
      if (!Array.isArray(i)) {
        i = [i];
      }
      (0, r.each)(i, function (e, i) {
        if (o.length) {
          o.push("or");
        }
        o.push([i, n, t]);
      });
      if (e.filter) {
        e.filter = [o, e.filter];
      } else {
        e.filter = o;
      }
    }
  },
  _loadFromStore: function (e, t) {
    var n = this;
    function i(i, a) {
      if (!n._disposed && (0, m.isPending)(t)) {
        var r = (0, o.extend)((0, m.normalizeLoadResult)(i, a), e);
        n._eventsStrategy.fireEvent("customizeLoadResult", [r]);
        (0, p.when)(r.data).done(function (e) {
          r.data = e;
          n._processStoreLoadResult(r, t);
        }).fail(t.reject);
      }
    }
    if (e.data) {
      return new p.Deferred().resolve(e.data).done(i);
    } else {
      return this.store().load(e.storeLoadOptions).done(i).fail(t.reject);
    }
  },
  _processStoreLoadResult: function (e, t) {
    var n = this;
    var i = e.data;
    var o = e.extra;
    var a = e.storeLoadOptions;
    function r() {
      n._isLoaded = true;
      n._totalCount = isFinite(o.totalCount) ? o.totalCount : -1;
      return t.resolve(i, o);
    }
    if (!this._disposed) {
      i = this._applyPostProcessFunction(this._applyMapFunction(i));
      if (!(0, s.isObject)(o)) {
        o = {};
      }
      this._items = i;
      if (!i.length || !this._paginate || this._pageSize && i.length < this._pageSize) {
        this._isLastPage = true;
      }
      if (a.requireTotalCount && !isFinite(o.totalCount)) {
        n.store().totalCount(a).done(function (e) {
          o.totalCount = e;
          r();
        }).fail(t.reject);
      } else {
        r();
      }
    }
  },
  _applyMapFunction: function (e) {
    if (this._mapFunc) {
      return (0, m.mapDataRespectingGrouping)(e, this._mapFunc, this.group());
    } else {
      return e;
    }
  },
  _applyPostProcessFunction: function (e) {
    if (this._postProcessFunc) {
      return this._postProcessFunc(e);
    } else {
      return e;
    }
  },
  on: function (e, t) {
    this._eventsStrategy.on(e, t);
    return this;
  },
  off: function (e, t) {
    this._eventsStrategy.off(e, t);
    return this;
  }
});
exports.DataSource = x;