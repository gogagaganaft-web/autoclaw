Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataControllerModule = exports.DataController = undefined;
var i = m(require("./68374.js"));
var o = require("./34671.js");
var a = require("./20576.js");
var r = require("./62754.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./35922.js");
var d = m(require("./26562.js"));
var c = m(require("./88036.js"));
var h = m(require("./53305.js"));
var f = m(require("./96688.js"));
var p = m(require("./15943.js"));
var g = m(require("./60082.js"));
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function v(e, t, n) {
  var i = e._dataSource;
  if (i) {
    if (n !== undefined) {
      if (e._getPagingOptionValue(t) !== n) {
        if (t === "pageSize") {
          i.pageIndex(0);
        }
        i[t](n);
        e._skipProcessingPagingChange = true;
        e.option(`paging.${t}`, n);
        e._skipProcessingPagingChange = false;
        var o = i.pageIndex();
        e._isPaging = t === "pageIndex";
        return i[t === "pageIndex" ? "load" : "reload"]().done(function () {
          e._isPaging = false;
          e.pageChanged.fire(o);
        });
      }
      return (0, r.Deferred)().resolve().promise();
    }
    return i[t]();
  }
  return 0;
}
var y = function (e) {
  var t;
  var n;
  function h() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = h).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  _(t, n);
  var p = h.prototype;
  p.init = function () {
    var e = this;
    var t = this;
    t._items = [];
    t._cachedProcessedItems = null;
    t._columnsController = this.getController("columns");
    t._isPaging = false;
    t._currentOperationTypes = null;
    t._dataChangedHandler = function (n) {
      t._currentOperationTypes = e._dataSource.operationTypes();
      t._handleDataChanged(n);
      t._currentOperationTypes = null;
    };
    t._columnsChangedHandler = t._handleColumnsChanged.bind(t);
    t._loadingChangedHandler = t._handleLoadingChanged.bind(t);
    t._loadErrorHandler = t._handleLoadError.bind(t);
    t._customizeStoreLoadOptionsHandler = t._handleCustomizeStoreLoadOptions.bind(t);
    t._changingHandler = t._handleChanging.bind(t);
    t._dataPushedHandler = t._handleDataPushed.bind(t);
    t._columnsController.columnsChanged.add(t._columnsChangedHandler);
    t._isLoading = false;
    t._isCustomLoading = false;
    t._repaintChangesOnly = undefined;
    t._changes = [];
    t.createAction("onDataErrorOccurred");
    t.dataErrorOccurred.add(function (e) {
      return t.executeAction("onDataErrorOccurred", {
        error: e
      });
    });
    t._refreshDataSource();
  };
  p._getPagingOptionValue = function (e) {
    return this._dataSource[e]();
  };
  p.callbackNames = function () {
    return ["changed", "loadingChanged", "dataErrorOccurred", "pageChanged", "dataSourceChanged", "pushed"];
  };
  p.callbackFlags = function (e) {
    if (e === "dataErrorOccurred") {
      return {
        stopOnFalse: true
      };
    }
  };
  p.publicMethods = function () {
    return ["beginCustomLoading", "endCustomLoading", "refresh", "filter", "clearFilter", "getCombinedFilter", "keyOf", "byKey", "getDataByKeys", "pageIndex", "pageSize", "pageCount", "totalCount", "_disposeDataSource", "getKeyByRowIndex", "getRowIndexByKey", "getDataSource", "getVisibleRows", "repaintRows"];
  };
  p.reset = function () {
    this._columnsController.reset();
    this._items = [];
    this._refreshDataSource();
  };
  p._handleDataSourceChange = function (e) {
    if (e.value === e.previousValue || this.option("columns") && Array.isArray(e.value) && Array.isArray(e.previousValue)) {
      if (e.value !== e.previousValue) {
        var t = this.store();
        if (t) {
          t._array = e.value;
        }
      }
      if (this.needToRefreshOnDataSourceChange(e)) {
        this.refresh(this.option("repaintChangesOnly"));
      }
      return true;
    }
    return false;
  };
  p.needToRefreshOnDataSourceChange = function (e) {
    return true;
  };
  p.optionChanged = function (t) {
    var n;
    var i;
    var o = this;
    var a = this;
    function r() {
      t.handled = true;
    }
    if (t.name === "dataSource" && t.name === t.fullName && this._handleDataSourceChange(t)) {
      r();
    } else {
      switch (t.name) {
        case "cacheEnabled":
        case "repaintChangesOnly":
        case "highlightChanges":
        case "loadingTimeout":
          r();
          break;
        case "remoteOperations":
        case "keyExpr":
        case "dataSource":
        case "scrolling":
          r();
          a.reset();
          break;
        case "paging":
          if ((n = a.dataSource()) && (i = a._setPagingOptions(n))) {
            var s = n.pageIndex();
            this._isPaging = i.isPageIndexChanged;
            n.load().done(function () {
              o._isPaging = false;
              a.pageChanged.fire(s);
            });
          }
          r();
          break;
        case "rtlEnabled":
          a.reset();
          break;
        case "columns":
          if ((n = a.dataSource()) && n.isLoading() && t.name === t.fullName) {
            this._useSortingGroupingFromColumns = true;
            n.load();
          }
          break;
        default:
          e.prototype.optionChanged.call(this, t);
      }
    }
  };
  p.isReady = function () {
    return !this._isLoading;
  };
  p.getDataSource = function () {
    return this._dataSource && this._dataSource._dataSource;
  };
  p.getCombinedFilter = function (e) {
    return this.combinedFilter(undefined, e);
  };
  p.combinedFilter = function (e, t) {
    if (!this._dataSource) {
      return e;
    }
    var n = e ?? this._dataSource.filter();
    if (this._columnsController.isDataSourceApplied() || this._columnsController.isAllDataTypesDefined()) {
      var i = this._calculateAdditionalFilter();
      n = i ? g.default.combineFilters([i, n]) : n;
    }
    var o = this._dataSource.remoteOperations().filtering || t;
    n = this._columnsController.updateFilter(n, o);
    return n;
  };
  p.waitReady = function () {
    if (this._updateLockCount) {
      this._readyDeferred = new r.Deferred();
      return this._readyDeferred;
    } else {
      return (0, r.when)();
    }
  };
  p._endUpdateCore = function () {
    var e = this._changes;
    if (e.length) {
      this._changes = [];
      var t = e.every(function (e) {
        return e.repaintChangesOnly;
      });
      this.updateItems(e.length === 1 ? e[0] : {
        repaintChangesOnly: t
      });
    }
    if (this._readyDeferred) {
      this._readyDeferred.resolve();
      this._readyDeferred = null;
    }
  };
  p._handleCustomizeStoreLoadOptions = function (e) {
    var n = this._columnsController;
    var i = this._dataSource;
    var o = e.storeLoadOptions;
    if (!e.isCustomLoading || !!o.isLoadingAll) {
      o.filter = this.combinedFilter(o.filter);
      if (o.filter?.length === 1 && o.filter[0] === "!") {
        e.data = [];
        e.extra = e.extra || {};
        e.extra.totalCount = 0;
      }
      if (!n.isDataSourceApplied()) {
        n.updateColumnDataTypes(i);
      }
      this._columnsUpdating = true;
      n.updateSortingGrouping(i, !this._useSortingGroupingFromColumns);
      this._columnsUpdating = false;
      o.sort = n.getSortDataSourceParameters();
      o.group = n.getGroupDataSourceParameters();
      i.sort(o.sort);
      i.group(o.group);
      o.sort = n.getSortDataSourceParameters(!i.remoteOperations().sorting);
      e.group = n.getGroupDataSourceParameters(!i.remoteOperations().grouping);
    }
  };
  p._handleColumnsChanged = function (e) {
    var t;
    var n;
    var i;
    var o = this;
    var a = e.changeTypes;
    var r = e.optionNames;
    if (a.sorting || a.grouping) {
      if (o._dataSource && !o._columnsUpdating) {
        o._dataSource.group(o._columnsController.getGroupDataSourceParameters());
        o._dataSource.sort(o._columnsController.getSortDataSourceParameters());
        o.reload();
      }
    } else if (a.columns && (n = o._columnsController.columnOption(e.columnIndex, "filterValues"), (r.filterValues || r.filterType && Array.isArray(n) || r.filterValue || r.selectedFilterOperation || r.allowFiltering) && (t = o._columnsController.columnOption(e.columnIndex, "filterValue"), (Array.isArray(n) || e.columnIndex === undefined || (0, u.isDefined)(t) || !r.selectedFilterOperation || r.filterValue) && (o._applyFilter(), i = true)), o._needApplyFilter || g.default.checkChanges(r, ["width", "visibleWidth", "filterValue", "bufferedFilterValue", "selectedFilterOperation", "filterValues", "filterType"]) || o._columnsController.columnsChanged.add(function e(t) {
      o._columnsController.columnsChanged.remove(e);
      o.updateItems({
        repaintChangesOnly: false,
        virtualColumnsScrolling: (t == null ? undefined : t.changeTypes)?.virtualColumnsScrolling
      });
    }), (0, u.isDefined)(r.visible))) {
      var s = o._columnsController.columnOption(e.columnIndex);
      if (s && ((0, u.isDefined)(s.filterValue) || (0, u.isDefined)(s.filterValues))) {
        o._applyFilter();
        i = true;
      }
    }
    if (!i && a.filtering) {
      o.reload();
    }
  };
  p._handleDataChanged = function (e) {
    var t = this;
    var n = t._dataSource;
    var i = t._columnsController;
    var o = false;
    this._useSortingGroupingFromColumns = false;
    if (n && !t._isDataSourceApplying) {
      t._isDataSourceApplying = true;
      (0, r.when)(t._columnsController.applyDataSource(n)).done(function () {
        if (t._isLoading) {
          t._handleLoadingChanged(false);
        }
        if (o && e && e.isDelayed) {
          e.isDelayed = false;
        }
        t._isDataSourceApplying = false;
        var n;
        var i = t._needApplyFilter;
        t._needApplyFilter = false;
        if (i && !t._isAllDataTypesDefined && (n = t._calculateAdditionalFilter()) && n.length) {
          f.default.log("W1005", t.component.NAME);
          t._applyFilter();
        } else {
          t.updateItems(e, true);
        }
      }).fail(function () {
        t._isDataSourceApplying = false;
      });
      if (t._isDataSourceApplying) {
        o = true;
        t._handleLoadingChanged(true);
      }
      t._needApplyFilter = !t._columnsController.isDataSourceApplied();
      t._isAllDataTypesDefined = i.isAllDataTypesDefined();
    }
  };
  p._handleLoadingChanged = function (e) {
    this._isLoading = e;
    this._fireLoadingChanged();
  };
  p._handleLoadError = function (e) {
    this.dataErrorOccurred.fire(e);
  };
  p._handleDataPushed = function (e) {
    this.pushed.fire(e);
  };
  p.fireError = function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    this.dataErrorOccurred.fire(f.default.Error.apply(f.default, t));
  };
  p._setPagingOptions = function (e) {
    var t = this.option("paging.pageIndex");
    var n = this.option("paging.pageSize");
    var i = this.option("paging.enabled");
    var o = this.option("scrolling.mode");
    var a = o === "infinite";
    var r = i || o === "virtual" || a;
    var s = false;
    var l = false;
    var u = false;
    e.requireTotalCount(!a);
    if (i !== undefined && e.paginate() !== r) {
      e.paginate(r);
      s = true;
    }
    if (n !== undefined && e.pageSize() !== n) {
      e.pageSize(n);
      l = true;
    }
    if (t !== undefined && e.pageIndex() !== t) {
      e.pageIndex(t);
      u = true;
    }
    return (!!s || !!l || !!u) && {
      isPaginateChanged: s,
      isPageSizeChanged: l,
      isPageIndexChanged: u
    };
  };
  p._getSpecificDataSourceOption = function () {
    var e = this.option("dataSource");
    if (Array.isArray(e)) {
      return {
        store: {
          type: "array",
          data: e,
          key: this.option("keyExpr")
        }
      };
    } else {
      return e;
    }
  };
  p._initDataSource = function () {
    var t = this._dataSource;
    e.prototype._initDataSource.call(this);
    var n = this._dataSource;
    this._useSortingGroupingFromColumns = true;
    this._cachedProcessedItems = null;
    if (n) {
      var i = this._setPagingOptions(n);
      this._isPaging = i == null ? undefined : i.isPageIndexChanged;
      this.setDataSource(n);
    } else if (t) {
      this.updateItems();
    }
  };
  p._loadDataSource = function () {
    var e = this;
    var t = e._dataSource;
    var n = new r.Deferred();
    (0, r.when)(this._columnsController.refresh(true)).always(function () {
      if (t) {
        t.load().done(function () {
          e._isPaging = false;
          n.resolve.apply(n, arguments);
        }).fail(n.reject);
      } else {
        n.resolve();
      }
    });
    return n.promise();
  };
  p._beforeProcessItems = function (e) {
    return e.slice(0);
  };
  p.getRowIndexDelta = function () {
    return 0;
  };
  p.getDataIndex = function (e) {
    var t = this._items;
    var n = e.changeType === "append" && t.length > 0 ? t[t.length - 1] : null;
    if ((0, u.isDefined)(n == null ? undefined : n.dataIndex)) {
      return n.dataIndex + 1;
    } else {
      return 0;
    }
  };
  p._processItems = function (e, t) {
    var n = this;
    var i = n.getRowIndexDelta();
    var o = t.changeType;
    var a = {
      visibleColumns: n._columnsController.getVisibleColumns(null, o === "loadingAll"),
      dataIndex: this.getDataIndex(t)
    };
    var r = [];
    (0, l.each)(e, function (e, t) {
      if ((0, u.isDefined)(t)) {
        a.rowIndex = e - i;
        t = n._processItem(t, a);
        r.push(t);
      }
    });
    return r;
  };
  p._processItem = function (e, t) {
    e = this._generateDataItem(e, t);
    (e = this._processDataItem(e, t)).dataIndex = t.dataIndex++;
    return e;
  };
  p._generateDataItem = function (e, t) {
    return {
      rowType: "data",
      data: e,
      key: this.keyOf(e)
    };
  };
  p._processDataItem = function (e, t) {
    e.values = this.generateDataValues(e.data, t.visibleColumns);
    return e;
  };
  p.generateDataValues = function (e, t, n) {
    var i;
    var o = [];
    for (var a = 0; a < t.length; a++) {
      var r = t[a];
      i = n ? undefined : null;
      if (!r.command) {
        if (r.calculateCellValue) {
          i = r.calculateCellValue(e);
        } else if (r.dataField) {
          i = e[r.dataField];
        }
      }
      o.push(i);
    }
    return o;
  };
  p._applyChange = function (e) {
    if (e.changeType === "update") {
      this._applyChangeUpdate(e);
    } else if (this.items().length && e.repaintChangesOnly && e.changeType === "refresh") {
      this._applyChangesOnly(e);
    } else if (e.changeType === "refresh") {
      this._applyChangeFull(e);
    }
  };
  p._applyChangeFull = function (e) {
    this._items = e.items.slice(0);
  };
  p._getRowIndices = function (e) {
    var t = e.rowIndices.slice(0);
    var n = this.getRowIndexDelta();
    t.sort(function (e, t) {
      return e - t;
    });
    for (var i = 0; i < t.length; i++) {
      var o = t[i];
      if (e.allowInvisibleRowIndices) {
        o += n;
      }
      if (o < 0) {
        t.splice(i, 1);
        i--;
      }
    }
    return t;
  };
  p._applyChangeUpdate = function (e) {
    var t;
    var n = this;
    var i = e.items;
    var o = n._getRowIndices(e);
    var r = n.getRowIndexDelta();
    var s = n.option("repaintChangesOnly");
    var u = -1;
    var d = 0;
    e.items = [];
    e.rowIndices = [];
    e.columnIndices = [];
    e.changeTypes = [];
    function c(e, t, n) {
      var i = e && t && (0, a.equalByValue)(e.key, t.key);
      if (i && n) {
        i = e.rowType === t.rowType && (t.rowType !== "detail" || e.isEditing === t.isEditing);
      }
      return i;
    }
    (0, l.each)(o, function (o, a) {
      var l;
      if (u !== (a += d + r)) {
        u = a;
        var h = n._items[a];
        var f = n._items[a + 1];
        var p = i[a];
        var g = i[a + 1];
        var m = c(h, f) || c(p, g);
        if (p) {
          p.rowIndex = a;
          e.items.push(p);
        }
        if (h && p && c(h, p, m)) {
          t = "update";
          n._items[a] = p;
          if (h.visible !== p.visible) {
            e.items.splice(-1, 1, {
              visible: p.visible
            });
          } else if (s && !e.isFullUpdate) {
            l = n._partialUpdateRow(h, p, a - r);
          }
        } else if (p && !h || g && c(h, g, m)) {
          t = "insert";
          n._items.splice(a, 0, p);
          d++;
        } else if (h && !p || f && c(p, f, m)) {
          t = "remove";
          n._items.splice(a, 1);
          d--;
          u = -1;
        } else {
          if (!p) {
            return;
          }
          t = "update";
          n._items[a] = p;
        }
        e.rowIndices.push(a - r);
        e.changeTypes.push(t);
        e.columnIndices.push(l);
      }
    });
  };
  p._isCellChanged = function (e, t, n, i, o) {
    if (JSON.stringify(e.values[i]) !== JSON.stringify(t.values[i])) {
      return true;
    }
    function a(e, t) {
      return !!e.modifiedValues && e.modifiedValues[t] !== undefined;
    }
    return a(e, i) !== a(t, i);
  };
  p._getChangedColumnIndices = function (e, t, n, i) {
    var o;
    if (e.rowType === t.rowType) {
      if (t.rowType !== "group" && t.rowType !== "groupFooter" && (o = [], t.rowType !== "detail")) {
        for (var a = 0; a < e.values.length; a++) {
          if (this._isCellChanged(e, t, n, a, i)) {
            o.push(a);
          }
        }
      }
      if (t.rowType === "group" && t.isExpanded === e.isExpanded && e.cells) {
        o = e.cells.map(function (e, t) {
          if (e.column?.type !== "groupExpand") {
            return t;
          } else {
            return -1;
          }
        }).filter(function (e) {
          return e >= 0;
        });
      }
    }
    return o;
  };
  p._partialUpdateRow = function (e, t, n, i) {
    var o = this._getChangedColumnIndices(e, t, n, i);
    if ((o == null ? undefined : o.length) && this.option("dataRowTemplate")) {
      o = undefined;
    }
    if (o) {
      if (e.cells) {
        e.cells.forEach(function (e, n) {
          if (!(o.indexOf(n) >= 0) && e && e.update) {
            e.update(t);
          }
        });
      }
      t.update = e.update;
      t.watch = e.watch;
      t.cells = e.cells;
      if (i) {
        t.oldValues = e.values;
      }
      if (e.update) {
        e.update(t);
      }
    }
    return o;
  };
  p._isItemEquals = function (e, t) {
    if (JSON.stringify(e.values) !== JSON.stringify(t.values)) {
      return false;
    }
    if (["modified", "isNewRow", "removed", "isEditing"].some(function (n) {
      return e[n] !== t[n];
    })) {
      return false;
    }
    if (e.rowType === "group" || e.rowType === "groupFooter") {
      var r = e.isExpanded === t.isExpanded;
      var s = JSON.stringify(e.summaryCells) === JSON.stringify(t.summaryCells);
      var l = e.data?.isContinuation === t.data?.isContinuation && e.data?.isContinuationOnNextPage === t.data?.isContinuationOnNextPage;
      if (!r || !s || !l) {
        return false;
      }
    }
    return true;
  };
  p._applyChangesOnly = function (e) {
    var t;
    var n = this;
    var i = [];
    var a = [];
    var r = [];
    var s = [];
    var l = {};
    var u = (t = e == null ? undefined : e.isLiveUpdate) === null || t === undefined || t;
    function d(e) {
      if (e) {
        return `${e.rowType},${JSON.stringify(e.key)}`;
      }
    }
    var c = this._items;
    var h = c.slice();
    e.items.forEach(function (e, t) {
      var n = d(e);
      l[n] = t;
      e.rowIndex = t;
    });
    var f = (0, o.findChanges)(h, e.items, d, function (e, t) {
      return !!n._isItemEquals(e, t) && (e.cells && (e.update && e.update(t), e.cells.forEach(function (e) {
        if (e && e.update) {
          e.update(t, true);
        }
      })), true);
    });
    if (f) {
      f.forEach(function (e) {
        switch (e.type) {
          case "update":
            var t = e.index;
            var o = e.data;
            var l = e.oldItem;
            var d = n._partialUpdateRow(l, o, t, u);
            i.push(t);
            r.push("update");
            s.push(o);
            c[t] = o;
            a.push(d);
            break;
          case "insert":
            i.push(e.index);
            r.push("insert");
            s.push(e.data);
            a.push(undefined);
            c.splice(e.index, 0, e.data);
            break;
          case "remove":
            i.push(e.index);
            r.push("remove");
            c.splice(e.index, 1);
            s.push(e.oldItem);
            a.push(undefined);
        }
      });
      e.repaintChangesOnly = true;
      e.changeType = "update";
      e.rowIndices = i;
      e.columnIndices = a;
      e.changeTypes = r;
      e.items = s;
      if (h.length) {
        e.isLiveUpdate = true;
      }
      this._correctRowIndices(function (e) {
        var t = n._rowIndexOffset || 0;
        var i = n.getRowIndexOffset();
        var o = d(h[e - t]);
        var a = l[o];
        if (a >= 0) {
          return a + i - e;
        } else {
          return 0;
        }
      });
    } else {
      this._applyChangeFull(e);
    }
  };
  p._correctRowIndices = function (e) {};
  p._afterProcessItems = function (e, t) {
    return e;
  };
  p._updateItemsCore = function (e) {
    var t;
    var n = this._dataSource;
    var i = e.changeType || "refresh";
    e.changeType = i;
    if (n) {
      var o = this._cachedProcessedItems;
      if (e.useProcessedItemsCache && o) {
        t = o;
      } else {
        t = e.items || n.items();
        t = this._beforeProcessItems(t);
        t = this._processItems(t, e);
        this._cachedProcessedItems = t;
      }
      t = this._afterProcessItems(t, e);
      e.items = t;
      var a = this._items.length === t.length && this._items;
      this._applyChange(e);
      var r = this.getRowIndexDelta();
      (0, l.each)(this._items, function (e, n) {
        n.rowIndex = e - r;
        if (a) {
          n.cells = a[e].cells ?? [];
        }
        var o = t[e];
        if (o) {
          n.loadIndex = o.loadIndex;
        }
      });
      this._rowIndexOffset = this.getRowIndexOffset();
    } else {
      this._items = [];
    }
  };
  p._handleChanging = function (e) {
    var t = this.getVisibleRows();
    if (this.dataSource()) {
      e.changes.forEach(function (e) {
        if (e.type === "insert" && e.index >= 0) {
          var n = 0;
          for (var i = 0; i < e.index; i++) {
            var o = t[i];
            if (!!o && (o.rowType === "data" || o.rowType === "group")) {
              n++;
            }
          }
          e.index = n;
        }
      });
    }
  };
  p.updateItems = function (e, t) {
    e = e || {};
    if (this._repaintChangesOnly !== undefined) {
      e.repaintChangesOnly = e.repaintChangesOnly ?? this._repaintChangesOnly;
      e.needUpdateDimensions = e.needUpdateDimensions || this._needUpdateDimensions;
    } else if (e.changes) {
      e.repaintChangesOnly = this.option("repaintChangesOnly");
    } else if (t) {
      var i = this.dataSource().operationTypes();
      e.repaintChangesOnly = i && !i.grouping && !i.filtering && this.option("repaintChangesOnly");
      e.isDataChanged = true;
      if (i && (i.reload || i.paging || i.groupExpanding)) {
        e.needUpdateDimensions = true;
      }
    }
    if (!this._updateLockCount || e.cancel) {
      this._updateItemsCore(e);
      if (!e.cancel) {
        this._fireChanged(e);
      }
    } else {
      this._changes.push(e);
    }
  };
  p.loadingOperationTypes = function () {
    var e = this.dataSource();
    return e && e.loadingOperationTypes() || {};
  };
  p._fireChanged = function (e) {
    var t = this;
    if (this._currentOperationTypes) {
      e.operationTypes = this._currentOperationTypes;
      this._currentOperationTypes = null;
    }
    (0, a.deferRender)(function () {
      t.changed.fire(e);
    });
  };
  p.isLoading = function () {
    return this._isLoading || this._isCustomLoading;
  };
  p._fireLoadingChanged = function () {
    this.loadingChanged.fire(this.isLoading(), this._loadingText);
  };
  p._calculateAdditionalFilter = function () {
    return null;
  };
  p._applyFilter = function () {
    var e = this;
    var t = this._dataSource;
    if (t) {
      t.pageIndex(0);
      this._isFilterApplying = true;
      return this.reload().done(function () {
        if (e._isFilterApplying) {
          e.pageChanged.fire();
        }
      });
    }
  };
  p.resetFilterApplying = function () {
    this._isFilterApplying = false;
  };
  p.filter = function (e) {
    var t = this._dataSource;
    var n = t && t.filter();
    if (arguments.length === 0) {
      return n;
    }
    e = arguments.length > 1 ? Array.prototype.slice.call(arguments, 0) : e;
    if (!g.default.equalFilterParameters(n, e)) {
      if (t) {
        t.filter(e);
      }
      this._applyFilter();
    }
  };
  p.clearFilter = function (e) {
    var t = this;
    var n = t._columnsController;
    function i(e) {
      for (var t = n.columnCount(), i = 0; i < t; i++) {
        n.columnOption(i, e, undefined);
      }
    }
    t.component.beginUpdate();
    if (arguments.length > 0) {
      switch (e) {
        case "dataSource":
          t.filter(null);
          break;
        case "search":
          t.searchByText("");
          break;
        case "header":
          i("filterValues");
          break;
        case "row":
          i("filterValue");
      }
    } else {
      t.filter(null);
      t.searchByText("");
      i("filterValue");
      i("bufferedFilterValue");
      i("filterValues");
    }
    t.component.endUpdate();
  };
  p._fireDataSourceChanged = function () {
    var e = this;
    e.changed.add(function t() {
      e.changed.remove(t);
      e.dataSourceChanged.fire();
    });
  };
  p._getDataSourceAdapter = function () {};
  p._createDataSourceAdapterCore = function (e, t) {
    var n = this._getDataSourceAdapter().create(this.component);
    n.init(e, t);
    return n;
  };
  p.isLocalStore = function (e = this.store()) {
    return e instanceof d.default;
  };
  p.isCustomStore = function (e) {
    return (e = e || this.store()) instanceof c.default;
  };
  p._createDataSourceAdapter = function (e) {
    var t = this.option("remoteOperations");
    var n = e.store();
    var i = {
      filtering: true,
      sorting: true,
      paging: true,
      grouping: true,
      summary: true
    };
    if ((0, u.isObject)(t) && t.groupPaging) {
      t = (0, s.extend)({}, i, t);
    }
    if (t === "auto") {
      t = this.isLocalStore(n) || this.isCustomStore(n) ? {} : {
        filtering: true,
        sorting: true,
        paging: true
      };
    }
    if (t === true) {
      t = i;
    }
    return this._createDataSourceAdapterCore(e, t);
  };
  p.setDataSource = function (e) {
    var t = this._dataSource;
    if (!e && t) {
      t.cancelAll();
      t.changed.remove(this._dataChangedHandler);
      t.loadingChanged.remove(this._loadingChangedHandler);
      t.loadError.remove(this._loadErrorHandler);
      t.customizeStoreLoadOptions.remove(this._customizeStoreLoadOptionsHandler);
      t.changing.remove(this._changingHandler);
      t.pushed.remove(this._dataPushedHandler);
      t.dispose(this._isSharedDataSource);
    }
    e &&= this._createDataSourceAdapter(e);
    this._dataSource = e;
    if (e) {
      this._fireDataSourceChanged();
      this._isLoading = !e.isLoaded();
      this._needApplyFilter = true;
      this._isAllDataTypesDefined = this._columnsController.isAllDataTypesDefined();
      e.changed.add(this._dataChangedHandler);
      e.loadingChanged.add(this._loadingChangedHandler);
      e.loadError.add(this._loadErrorHandler);
      e.customizeStoreLoadOptions.add(this._customizeStoreLoadOptionsHandler);
      e.changing.add(this._changingHandler);
      e.pushed.add(this._dataPushedHandler);
    }
  };
  p.items = function (e) {
    return this._items;
  };
  p.isEmpty = function () {
    return !this.items().length;
  };
  p.pageCount = function () {
    if (this._dataSource) {
      return this._dataSource.pageCount();
    } else {
      return 1;
    }
  };
  p.dataSource = function () {
    return this._dataSource;
  };
  p.store = function () {
    var e = this._dataSource;
    return e && e.store();
  };
  p.loadAll = function (e, t = false) {
    var n = this;
    var i = new r.Deferred();
    var o = n._dataSource;
    if (o) {
      if (e) {
        var a = {
          data: e,
          isCustomLoading: true,
          storeLoadOptions: {
            isLoadingAll: true
          },
          loadOptions: {
            filter: t ? null : n.getCombinedFilter(),
            group: o.group(),
            sort: o.sort()
          }
        };
        o._handleDataLoaded(a);
        (0, r.when)(a.data).done(function (e) {
          e = n._beforeProcessItems(e);
          i.resolve(n._processItems(e, {
            changeType: "loadingAll"
          }), a.extra?.summary);
        }).fail(i.reject);
      } else if (o.isLoading()) {
        i.reject();
      } else {
        var l = (0, s.extend)({}, o.loadOptions(), {
          isLoadingAll: true,
          requireTotalCount: false
        });
        o.load(l).done(function (e, t) {
          e = n._beforeProcessItems(e);
          e = n._processItems(e, {
            changeType: "loadingAll"
          });
          i.resolve(e, t && t.summary);
        }).fail(i.reject);
      }
    } else {
      i.resolve([]);
    }
    return i;
  };
  p.getKeyByRowIndex = function (e, t) {
    var n = this.items(t)[e];
    if (n) {
      return n.key;
    }
  };
  p.getRowIndexByKey = function (e, t) {
    return g.default.getIndexByKey(e, this.items(t));
  };
  p.keyOf = function (e) {
    var t = this.store();
    if (t) {
      return t.keyOf(e);
    }
  };
  p.byKey = function (e) {
    var t;
    var n = this.store();
    var i = this.getRowIndexByKey(e);
    if (n) {
      if (i >= 0) {
        t = new r.Deferred().resolve(this.items()[i].data);
      }
      return t || n.byKey(e);
    }
  };
  p.key = function () {
    var e = this.store();
    if (e) {
      return e.key();
    }
  };
  p.getRowIndexOffset = function (e) {
    return 0;
  };
  p.getDataByKeys = function (e) {
    var t = this;
    var n = new r.Deferred();
    var o = [];
    var a = [];
    (0, l.each)(e, function (e, n) {
      o.push(t.byKey(n).done(function (t) {
        a[e] = t;
      }));
    });
    r.when.apply(i.default, o).always(function () {
      n.resolve(a);
    });
    return n;
  };
  p.pageIndex = function (e) {
    return v(this, "pageIndex", e);
  };
  p.pageSize = function (e) {
    return v(this, "pageSize", e);
  };
  p.beginCustomLoading = function (e) {
    this._isCustomLoading = true;
    this._loadingText = e || "";
    this._fireLoadingChanged();
  };
  p.endCustomLoading = function () {
    this._isCustomLoading = false;
    this._loadingText = undefined;
    this._fireLoadingChanged();
  };
  p.refresh = function (e) {
    if (e === true) {
      e = {
        reload: true,
        changesOnly: true
      };
    } else {
      e ||= {
        lookup: true,
        selection: true,
        reload: true
      };
    }
    var t = this;
    var n = t.getDataSource();
    var i = e.changesOnly;
    var o = new r.Deferred();
    function a() {
      t._repaintChangesOnly = !!i;
    }
    (0, r.when)(!e.lookup || t._columnsController.refresh()).always(function () {
      if (e.load || e.reload) {
        if (n) {
          n.on("customizeLoadResult", a);
        }
        (0, r.when)(t.reload(e.reload, i)).always(function () {
          if (n) {
            n.off("customizeLoadResult", a);
          }
          t._repaintChangesOnly = undefined;
        }).done(o.resolve).fail(o.reject);
      } else {
        t.updateItems({
          repaintChangesOnly: e.changesOnly
        });
        o.resolve();
      }
    });
    return o.promise();
  };
  p.getVisibleRows = function () {
    return this.items();
  };
  p._disposeDataSource = function () {
    this.setDataSource(null);
  };
  p.dispose = function () {
    this._disposeDataSource();
    e.prototype.dispose.call(this);
  };
  p.repaintRows = function (e, t) {
    if ((e = Array.isArray(e) ? e : [e]).length > 1 || (0, u.isDefined)(e[0])) {
      this.updateItems({
        changeType: "update",
        rowIndices: e,
        isFullUpdate: !t
      });
    }
  };
  p.skipProcessingPagingChange = function (e) {
    return this._skipProcessingPagingChange && (e === "paging.pageIndex" || e === "paging.pageSize");
  };
  p.getUserState = function () {
    return {
      searchText: this.option("searchPanel.text"),
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize()
    };
  };
  p.getCachedStoreData = function () {
    return this._dataSource && this._dataSource.getCachedStoreData();
  };
  p.isLastPageLoaded = function () {
    return this.pageIndex() === this.pageCount() - 1;
  };
  p.load = function () {
    var e;
    if ((e = this._dataSource) === null || e === undefined) {
      return undefined;
    } else {
      return e.load();
    }
  };
  p.reload = function (e, t) {
    var n;
    if ((n = this._dataSource) === null || n === undefined) {
      return undefined;
    } else {
      return n.reload(e, t);
    }
  };
  p.push = function () {
    var e;
    var t;
    if ((t = this._dataSource) === null || t === undefined) {
      return undefined;
    } else {
      return (e = t).push.apply(e, arguments);
    }
  };
  p.itemsCount = function () {
    var e;
    if (this._dataSource) {
      if ((e = this._dataSource) === null || e === undefined) {
        return undefined;
      } else {
        return e.itemsCount();
      }
    } else {
      return 0;
    }
  };
  p.totalItemsCount = function () {
    var e;
    if (this._dataSource) {
      if ((e = this._dataSource) === null || e === undefined) {
        return undefined;
      } else {
        return e.totalItemsCount();
      }
    } else {
      return 0;
    }
  };
  p.hasKnownLastPage = function () {
    var e;
    return !this._dataSource || ((e = this._dataSource) === null || e === undefined ? undefined : e.hasKnownLastPage());
  };
  p.isLoaded = function () {
    var e;
    return !this._dataSource || ((e = this._dataSource) === null || e === undefined ? undefined : e.isLoaded());
  };
  p.totalCount = function () {
    var e;
    if (this._dataSource) {
      if ((e = this._dataSource) === null || e === undefined) {
        return undefined;
      } else {
        return e.totalCount();
      }
    } else {
      return 0;
    }
  };
  return h;
}(p.default.Controller.inherit(h.default));
exports.DataController = y;
var b = {
  defaultOptions: function () {
    return {
      loadingTimeout: 0,
      dataSource: null,
      cacheEnabled: true,
      repaintChangesOnly: false,
      highlightChanges: false,
      onDataErrorOccurred: null,
      remoteOperations: "auto",
      paging: {
        enabled: true,
        pageSize: undefined,
        pageIndex: undefined
      }
    };
  },
  controllers: {
    data: y
  }
};
exports.dataControllerModule = b;