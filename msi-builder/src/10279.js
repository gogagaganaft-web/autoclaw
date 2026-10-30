Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnsControllerModule = exports.ColumnsController = undefined;
var i = k(require("./80209.js"));
var o = k(require("./68374.js"));
var a = k(require("./44504.js"));
var r = require("./47617.js");
var s = require("./62754.js");
var l = require("./13306.js");
var u = require("./78008.js");
var d = require("./95479.js");
var c = require("./48013.js");
var h = require("./35922.js");
var f = k(require("./26974.js"));
var p = k(require("./67403.js"));
var g = require("./85273.js");
var m = require("./9234.js");
var _ = k(require("./91500.js"));
var v = k(require("./28109.js"));
var y = k(require("./18740.js"));
var b = k(require("./96688.js"));
var x = k(require("./15943.js"));
var w = k(require("./60082.js"));
var C = require("./54057.js");
var S = require("./22732.js");
function k(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function D() {
  return (D = Object.assign ? Object.assign.bind() : function (e) {
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
function I(e, t) {
  return (I = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var T = function (e) {
  var t;
  var n;
  function v() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = v).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  I(t, n);
  var x = v.prototype;
  x._getExpandColumnOptions = function () {
    return {
      type: "expand",
      command: "expand",
      width: "auto",
      cssClass: C.COMMAND_EXPAND_CLASS,
      allowEditing: false,
      allowGrouping: false,
      allowSorting: false,
      allowResizing: false,
      allowReordering: false,
      allowHiding: false
    };
  };
  x._getFirstItems = function (e) {
    var t;
    var n = [];
    if (e && e.items().length > 0) {
      t = w.default.normalizeSortingInfo(e.group()).length;
      n = function e(t, n) {
        if (!t || !n) {
          return t;
        }
        for (var i = 0; i < t.length; i++) {
          var o = e(t[i].items || t[i].collapsedItems, n - 1);
          if (o && o.length) {
            return o;
          }
        }
      }(e.items(), t) || [];
    }
    return n;
  };
  x._endUpdateCore = function () {
    if (!this._skipProcessingColumnsChange) {
      (0, S.fireColumnsChanged)(this);
    }
  };
  x.init = function (e) {
    var t = this.option("columns");
    this._commandColumns = this._commandColumns || [];
    this._columns = this._columns || [];
    this._isColumnsFromOptions = !!t;
    if (this._isColumnsFromOptions) {
      (0, S.assignColumns)(this, t ? (0, S.createColumnsFromOptions)(this, t) : []);
      (0, S.applyUserState)(this);
    } else {
      (0, S.assignColumns)(this, this._columnsUserState ? (0, S.createColumnsFromOptions)(this, this._columnsUserState) : this._columns);
    }
    (0, S.addExpandColumn)(this);
    if (this._dataSourceApplied) {
      this.applyDataSource(this._dataSource, true, e);
    } else {
      (0, S.updateIndexes)(this);
    }
    this._checkColumns();
  };
  x.callbackNames = function () {
    return ["columnsChanged"];
  };
  x.getColumnByPath = function (e, t) {
    var n;
    var i = [];
    e.replace(C.COLUMN_OPTION_REGEXP, function (e, t) {
      i.push(parseInt(t));
      return "";
    });
    if (i.length) {
      n = t ? i.reduce(function (e, t) {
        return e && e.columns && e.columns[t];
      }, {
        columns: t
      }) : (0, S.getColumnByIndexes)(this, i);
    }
    return n;
  };
  x.optionChanged = function (t) {
    var n;
    switch (t.name) {
      case "adaptColumnWidthByRatio":
        t.handled = true;
        break;
      case "dataSource":
        if (t.value !== t.previousValue && !this.option("columns") && (!Array.isArray(t.value) || !Array.isArray(t.previousValue))) {
          this._columns = [];
        }
        break;
      case "columns":
        n = this._skipProcessingColumnsChange;
        t.handled = true;
        if (!this._skipProcessingColumnsChange) {
          if (t.name === t.fullName) {
            this._columnsUserState = null;
            this._ignoreColumnOptionNames = null;
            this.init();
          } else {
            this._columnOptionChanged(t);
            n = true;
          }
        }
        if (n) {
          this._updateRequireResize(t);
        }
        break;
      case "commonColumnSettings":
      case "columnAutoWidth":
      case "allowColumnResizing":
      case "allowColumnReordering":
      case "columnFixing":
      case "grouping":
      case "groupPanel":
      case "regenerateColumnsByVisibleItems":
      case "customizeColumns":
      case "columnHidingEnabled":
      case "dateSerializationFormat":
      case "columnResizingMode":
      case "columnMinWidth":
      case "columnWidth":
        t.handled = true;
        var i = t.fullName === "columnWidth" && ["width"];
        this.reinit(i);
        break;
      case "rtlEnabled":
        this.reinit();
        break;
      default:
        e.prototype.optionChanged.call(this, t);
    }
  };
  x._columnOptionChanged = function (e) {
    var t = {};
    var n = this.getColumnByPath(e.fullName);
    var i = e.fullName.replace(C.COLUMN_OPTION_REGEXP, "");
    if (n) {
      if (i) {
        t[i] = e.value;
      } else {
        t = e.value;
      }
      this._skipProcessingColumnsChange = e.fullName;
      this.columnOption(n.index, t);
      this._skipProcessingColumnsChange = false;
    }
  };
  x._updateRequireResize = function (e) {
    var t = this.component;
    if (e.fullName.replace(C.COLUMN_OPTION_REGEXP, "") === "width" && t._updateLockCount) {
      t._requireResize = true;
    }
  };
  x.publicMethods = function () {
    return ["addColumn", "deleteColumn", "columnOption", "columnCount", "clearSorting", "clearGrouping", "getVisibleColumns", "getVisibleColumnIndex"];
  };
  x.applyDataSource = function (e, t, n) {
    var i = e && e.isLoaded();
    this._dataSource = e;
    if (!this._dataSourceApplied || this._dataSourceColumnsCount === 0 || t || this.option("regenerateColumnsByVisibleItems")) {
      if (i) {
        if (!this._isColumnsFromOptions) {
          var o = (0, S.createColumnsFromDataSource)(this, e);
          if (o.length) {
            (0, S.assignColumns)(this, o);
            this._dataSourceColumnsCount = this._columns.length;
            (0, S.applyUserState)(this);
          }
        }
        return this.updateColumns(e, t, n);
      }
      this._dataSourceApplied = false;
      (0, S.updateIndexes)(this);
    } else if (i && !this.isAllDataTypesDefined(true) && this.updateColumnDataTypes(e)) {
      (0, S.updateColumnChanges)(this, "columns");
      (0, S.fireColumnsChanged)(this);
      return new s.Deferred().reject().promise();
    }
  };
  x.reset = function () {
    this._dataSource = null;
    this._dataSourceApplied = false;
    this._dataSourceColumnsCount = undefined;
    this.reinit();
  };
  x.resetColumnsCache = function () {
    this._visibleColumns = undefined;
    this._fixedColumns = undefined;
    this._rowCount = undefined;
    (0, S.resetBandColumnsCache)(this);
  };
  x.reinit = function (e) {
    this._columnsUserState = this.getUserState();
    this._ignoreColumnOptionNames = e || null;
    this.init();
    if (e) {
      this._ignoreColumnOptionNames = null;
    }
  };
  x.isInitialized = function () {
    return !!this._columns.length || !!this.option("columns");
  };
  x.isDataSourceApplied = function () {
    return this._dataSourceApplied;
  };
  x.getCommonSettings = function (e) {
    var i = (!e || !e.type) && this.option("commonColumnSettings") || {};
    var o = this.option("grouping") ?? {};
    var a = this.option("groupPanel") ?? {};
    return (0, l.extend)({
      allowFixing: this.option("columnFixing.enabled"),
      allowResizing: this.option("allowColumnResizing") || undefined,
      allowReordering: this.option("allowColumnReordering"),
      minWidth: this.option("columnMinWidth"),
      width: this.option("columnWidth"),
      autoExpandGroup: o.autoExpandAll,
      allowCollapsing: o.allowCollapsing,
      allowGrouping: a.allowColumnDragging && a.visible || o.contextMenuEnabled
    }, i);
  };
  x.isColumnOptionUsed = function (e) {
    for (var t = 0; t < this._columns.length; t++) {
      if (this._columns[t][e]) {
        return true;
      }
    }
  };
  x.isAllDataTypesDefined = function (e) {
    var t = this._columns;
    if (!t.length) {
      return false;
    }
    for (var n = 0; n < t.length; n++) {
      if ((t[n].dataField || t[n].calculateCellValue !== t[n].defaultCalculateCellValue) && (!t[n].dataType || e && t[n].deserializeValue && t[n].serializationFormat === undefined)) {
        return false;
      }
    }
    return true;
  };
  x.getColumns = function () {
    return this._columns;
  };
  x.isBandColumnsUsed = function () {
    return this.getColumns().some(function (e) {
      return e.isBand;
    });
  };
  x.getGroupColumns = function () {
    var e = [];
    (0, d.each)(this._columns, function () {
      if ((0, h.isDefined)(this.groupIndex)) {
        e[this.groupIndex] = this;
      }
    });
    return e;
  };
  x._shouldReturnVisibleColumns = function () {
    return true;
  };
  x._compileVisibleColumns = function (e) {
    this._visibleColumns = this._visibleColumns || this._compileVisibleColumnsCore();
    e = (0, h.isDefined)(e) ? e : this._visibleColumns.length - 1;
    return this._visibleColumns[e] || [];
  };
  x.getVisibleColumns = function (e, t) {
    if (this._shouldReturnVisibleColumns()) {
      return this._compileVisibleColumns.apply(this, arguments);
    } else {
      return [];
    }
  };
  x.getFixedColumns = function (e) {
    this._fixedColumns = this._fixedColumns || this._getFixedColumnsCore();
    e = (0, h.isDefined)(e) ? e : this._fixedColumns.length - 1;
    return this._fixedColumns[e] || [];
  };
  x.getFilteringColumns = function () {
    return this.getColumns().filter(function (e) {
      return (e.dataField || e.name) && (e.allowFiltering || e.allowHeaderFiltering);
    }).map(function (e) {
      var t = (0, l.extend)(true, {}, e);
      if (!(0, h.isDefined)(t.dataField)) {
        t.dataField = t.name;
      }
      t.filterOperations = e.filterOperations !== e.defaultFilterOperations ? t.filterOperations : null;
      return t;
    });
  };
  x.getColumnIndexOffset = function () {
    return 0;
  };
  x._getFixedColumnsCore = function () {
    var e;
    var t;
    var n;
    var i = [];
    var o = this.getRowCount();
    var a = {
      command: "transparent"
    };
    var r = 0;
    if (this._isColumnFixing()) {
      for (var s = 0; s <= o; s++) {
        e = 0;
        n = null;
        t = null;
        for (var l = this.getVisibleColumns(s, true), u = 0; u < l.length; u++) {
          var d = l[u - 1];
          var c = l[u];
          if (c.fixed) {
            if (d && d.fixed && (0, S.getFixedPosition)(this, d) !== (0, S.getFixedPosition)(this, c)) {
              if (!(0, h.isDefined)(t)) {
                t = u;
              }
            } else {
              n = c.fixedPosition;
            }
          } else {
            if (s === 0) {
              if (c.isBand && c.colspan) {
                r += c.colspan;
              } else {
                r++;
              }
            }
            e++;
            if (!(0, h.isDefined)(t)) {
              t = u;
            }
          }
        }
        if (s === 0 && (e === 0 || e >= l.length)) {
          return [];
        }
        if (!(0, h.isDefined)(t)) {
          t = n === "right" ? 0 : l.length;
        }
        i[s] = l.slice(0);
        a.colspan ||= r;
        i[s].splice(t, e, a);
      }
    }
    return i.map(function (e) {
      return e.map(function (e) {
        var t = D({}, e);
        if (t.headerId) {
          t.headerId += "-fixed";
        }
        return t;
      });
    });
  };
  x._isColumnFixing = function () {
    var e = this.option("columnFixing.enabled");
    if (!e) {
      (0, d.each)(this._columns, function (t, n) {
        if (n.fixed) {
          e = true;
          return false;
        }
      });
    }
    return e;
  };
  x._getExpandColumnsCore = function () {
    return this.getGroupColumns();
  };
  x.getExpandColumns = function () {
    var e;
    var t = this._getExpandColumnsCore();
    var n = t.filter(function (e) {
      return e.groupIndex === 0;
    })[0];
    var i = n && n.fixed;
    var o = this._isColumnFixing();
    var a = this.option("rtlEnabled");
    if (t.length) {
      e = this.columnOption("command:expand");
    }
    return t = (0, d.map)(t, function (t) {
      return (0, l.extend)({}, t, {
        visibleWidth: null,
        minWidth: null,
        cellTemplate: (0, h.isDefined)(t.groupIndex) ? null : t.cellTemplate,
        headerCellTemplate: null,
        fixed: !!(0, h.isDefined)(t.groupIndex) && !!i || o,
        fixedPosition: a ? "right" : "left"
      }, e, {
        index: t.index,
        type: t.type || C.GROUP_COMMAND_COLUMN_NAME
      });
    });
  };
  x.getBandColumnsCache = function () {
    if (!this._bandColumnsCache) {
      var e = this._columns;
      var t = {};
      var n = {};
      var i = true;
      e.forEach(function (o) {
        var a = o.ownerBand;
        var r = (0, h.isObject)(a) ? a.index : a;
        var s = e[r];
        if (o.hasColumns) {
          i = false;
        }
        o.colspan &&= undefined;
        o.rowspan &&= undefined;
        if (s) {
          n[o.index] = s;
        } else {
          r = -1;
        }
        t[r] = t[r] || [];
        t[r].push(o);
      });
      this._bandColumnsCache = {
        isPlain: i,
        columnChildrenByIndex: t,
        columnParentByIndex: n
      };
    }
    return this._bandColumnsCache;
  };
  x._isColumnVisible = function (e) {
    return e.visible && this.isParentColumnVisible(e.index);
  };
  x._isColumnInGroupPanel = function (e) {
    return (0, h.isDefined)(e.groupIndex) && !e.showWhenGrouped;
  };
  x.hasVisibleDataColumns = function () {
    var e = this;
    return this._columns.some(function (t) {
      var n = e._isColumnVisible(t);
      var i = e._isColumnInGroupPanel(t);
      var o = !!t.command;
      return n && !i && !o;
    });
  };
  x._compileVisibleColumnsCore = function () {
    var e = this.getBandColumnsCache();
    var t = (0, S.mergeColumns)(this, this._columns, this._commandColumns, true);
    (0, S.processBandColumns)(this, t, e);
    var n = this._getIndexedColumns(t);
    var i = this._getVisibleColumnsFromIndexed(n);
    if (!this.hasVisibleDataColumns() && this._columns.length) {
      i[i.length - 1].push({
        command: "empty"
      });
    }
    return i;
  };
  x._getIndexedColumns = function (e) {
    var t = this;
    var n = this.option("rtlEnabled");
    for (var i = this.getRowCount(), o = (0, S.digitsCount)(e.length), a = this.getBandColumnsCache(), r = [], s = [], l = 0; l < i; l += 1) {
      s[l] = [{}];
      r[l] = [{}, {}, {}];
    }
    e.forEach(function (e) {
      var c;
      var h = e.visibleIndex;
      var f = (0, S.getParentBandColumns)(e.index, a.columnParentByIndex);
      var p = t._isColumnVisible(e);
      var g = t._isColumnInGroupPanel(e);
      if (p && !g) {
        var m = f.length;
        if (h < 0) {
          h = -h;
          c = s[m];
        } else {
          e.fixed = f[0]?.fixed ?? e.fixed;
          e.fixedPosition = f[0]?.fixedPosition ?? e.fixedPosition;
          if (e.fixed) {
            var _ = !!e.command && !(0, S.isCustomCommandColumn)(t, e);
            var v = e.fixedPosition === "right";
            if (n && !_) {
              v = !v;
            }
            c = v ? r[m][2] : r[m][0];
          } else {
            c = r[m][1];
          }
        }
        if (f.length) {
          h = (0, S.numberToString)(h, o);
          for (var y = f.length - 1; y >= 0; y -= 1) {
            h = (0, S.numberToString)(f[y].visibleIndex, o) + h;
          }
        }
        c[h] = c[h] || [];
        c[h].push(e);
      }
    });
    return {
      positiveIndexedColumns: r,
      negativeIndexedColumns: s
    };
  };
  x._getVisibleColumnsFromIndexed = function (e) {
    var t = this;
    var n = e.positiveIndexedColumns;
    var i = e.negativeIndexedColumns;
    var o = [];
    for (var a = this.getRowCount(), r = (0, S.mergeColumns)(this, this.getExpandColumns(), this._columns), s = 0, l = 0, u = function (e) {
        o.push([]);
        (0, c.orderEach)(i[e], function (t, n) {
          o[e].unshift.apply(o[e], n);
        });
        var a = o[e].length;
        n[e].forEach(function (t) {
          (0, c.orderEach)(t, function (t, n) {
            o[e].push.apply(o[e], n);
          });
        });
        if (l <= e) {
          l += S.processExpandColumns.call(t, o[e], r, C.DETAIL_COMMAND_COLUMN_NAME, a);
        }
        if (s <= e) {
          s += S.processExpandColumns.call(t, o[e], r, C.GROUP_COMMAND_COLUMN_NAME, a);
        }
      }, d = 0; d < a; d += 1) {
      u(d);
    }
    o.push((0, S.getDataColumns)(o));
    return o;
  };
  x.getInvisibleColumns = function (e, t) {
    var n;
    var i = this;
    var o = [];
    e = e || i._columns;
    (0, d.each)(e, function (e, a) {
      if (a.ownerBand === t) {
        if (a.isBand) {
          if ((n = a.visible ? i.getInvisibleColumns(i.getChildrenByBandColumn(a.index), a.index) : i.getChildrenByBandColumn(a.index)).length) {
            o.push(a);
            o = o.concat(n);
          }
        } else if (!a.visible) {
          o.push(a);
        }
      }
    });
    return o;
  };
  x.getChooserColumns = function (e) {
    var t = (e ? this.getColumns() : this.getInvisibleColumns()).filter(function (e) {
      return e.showInColumnChooser;
    });
    var n = this.option("columnChooser.sortOrder");
    return (0, S.sortColumns)(t, n);
  };
  x.allowMoveColumn = function (e, t, n, i) {
    var o = (0, S.getColumnIndexByVisibleIndex)(this, e, n);
    var a = this._columns[o];
    return !!a && (!!a.allowReordering || !!a.allowGrouping || !!a.allowHiding) && (n === i ? n !== C.COLUMN_CHOOSER_LOCATION && (e = (0, h.isObject)(e) ? e.columnIndex : e) !== (t = (0, h.isObject)(t) ? t.columnIndex : t) && e + 1 !== t : n === C.GROUP_LOCATION && i !== C.COLUMN_CHOOSER_LOCATION || i === C.GROUP_LOCATION ? a && a.allowGrouping : n !== C.COLUMN_CHOOSER_LOCATION && i !== C.COLUMN_CHOOSER_LOCATION || a && a.allowHiding);
  };
  x.moveColumn = function (e, t, n, i) {
    var o;
    var a;
    var r = {};
    var s = (0, S.getColumnIndexByVisibleIndex)(this, e, n);
    var l = (0, S.getColumnIndexByVisibleIndex)(this, t, i);
    if (s >= 0) {
      var u = this._columns[s];
      t = (0, h.isObject)(t) ? t.columnIndex : t;
      a = l >= 0 ? this._columns[l].groupIndex : -1;
      if ((0, h.isDefined)(u.groupIndex) && n === C.GROUP_LOCATION) {
        if (a > u.groupIndex) {
          a--;
        }
        if (i !== C.GROUP_LOCATION) {
          r.groupIndex = undefined;
        } else {
          o = u.groupIndex;
          delete u.groupIndex;
          (0, S.updateColumnGroupIndexes)(this);
        }
      }
      if (i === C.GROUP_LOCATION) {
        r.groupIndex = (0, S.moveColumnToGroup)(this, u, a);
        u.groupIndex = o;
      } else if (t >= 0) {
        var d = this._columns[l];
        if (d && u.ownerBand === d.ownerBand) {
          if ((0, S.isColumnFixed)(this, u) ^ (0, S.isColumnFixed)(this, d)) {
            r.visibleIndex = C.MAX_SAFE_INTEGER;
          } else {
            r.visibleIndex = d.visibleIndex;
          }
        } else {
          r.visibleIndex = C.MAX_SAFE_INTEGER;
        }
      }
      var c = i !== C.COLUMN_CHOOSER_LOCATION;
      if (u.visible !== c) {
        r.visible = c;
      }
      this.columnOption(u.index, r);
    }
  };
  x.changeSortOrder = function (e, t) {
    var n = {};
    var i = this.option("sorting");
    var o = i && i.mode;
    var a = o === "single" || !t;
    var r = o === "single" || o === "multiple";
    var s = this._columns[e];
    if (r && s && s.allowSorting) {
      if (a && !(0, h.isDefined)(s.groupIndex)) {
        (0, d.each)(this._columns, function (t) {
          if (t !== e && this.sortOrder) {
            if (!(0, h.isDefined)(this.groupIndex)) {
              delete this.sortOrder;
            }
            delete this.sortIndex;
          }
        });
      }
      if ((0, S.isSortOrderValid)(t)) {
        if (s.sortOrder !== t) {
          n.sortOrder = t;
        }
      } else if (t === "none") {
        if (s.sortOrder) {
          n.sortIndex = undefined;
          n.sortOrder = undefined;
        }
      } else {
        (function (e) {
          if (t === "ctrl") {
            if (!("sortOrder" in e) || !("sortIndex" in e)) {
              return false;
            }
            n.sortOrder = undefined;
            n.sortIndex = undefined;
          } else if ((0, h.isDefined)(e.groupIndex) || (0, h.isDefined)(e.sortIndex)) {
            n.sortOrder = e.sortOrder === "desc" ? "asc" : "desc";
          } else {
            n.sortOrder = "asc";
          }
        })(s);
      }
    }
    this.columnOption(s.index, n);
  };
  x.getSortDataSourceParameters = function (e) {
    var t = [];
    var n = [];
    (0, d.each)(this._columns, function () {
      if ((this.dataField || this.selector || this.calculateCellValue) && (0, h.isDefined)(this.sortIndex) && !(0, h.isDefined)(this.groupIndex)) {
        t[this.sortIndex] = this;
      }
    });
    (0, d.each)(t, function () {
      var t = this && this.sortOrder;
      if ((0, S.isSortOrderValid)(t)) {
        var i = {
          selector: this.calculateSortValue || this.displayField || this.calculateDisplayValue || e && this.selector || this.dataField || this.calculateCellValue,
          desc: this.sortOrder === "desc"
        };
        if (this.sortingMethod) {
          i.compare = this.sortingMethod.bind(this);
        }
        n.push(i);
      }
    });
    if (n.length > 0) {
      return n;
    } else {
      return null;
    }
  };
  x.getGroupDataSourceParameters = function (e) {
    var t = [];
    (0, d.each)(this.getGroupColumns(), function () {
      var n = this.calculateGroupValue || this.displayField || this.calculateDisplayValue || e && this.selector || this.dataField || this.calculateCellValue;
      if (n) {
        var i = {
          selector: n,
          desc: this.sortOrder === "desc",
          isExpanded: !!this.autoExpandGroup
        };
        if (this.sortingMethod) {
          i.compare = this.sortingMethod.bind(this);
        }
        t.push(i);
      }
    });
    if (t.length > 0) {
      return t;
    } else {
      return null;
    }
  };
  x.refresh = function (e) {
    var t = [];
    (0, d.each)(this._columns, function () {
      var n = this.lookup;
      if (n && !this.calculateDisplayValue) {
        if (e && n.valueMap) {
          return;
        }
        if (n.update) {
          t.push(n.update());
        }
      }
    });
    return s.when.apply(o.default, t).done(S.resetColumnsCache.bind(null, this));
  };
  x._updateColumnOptions = function (e, t) {
    e.selector = e.selector || function (t) {
      return e.calculateCellValue(t);
    };
    if (this._reinitAfterLookupChanges && this._previousColumns) {
      e.selector.columnIndex = t;
      e.selector.originalCallback = this._previousColumns[t].selector.originalCallback;
    } else {
      e.selector.columnIndex = t;
      e.selector.originalCallback = e.selector;
    }
    (0, d.each)(["calculateSortValue", "calculateGroupValue", "calculateDisplayValue"], function (n, i) {
      var o = e[i];
      if ((0, h.isFunction)(o)) {
        if (o.originalCallback) {
          e[i].context.column = e;
        } else {
          var a = {
            column: e
          };
          e[i] = function (e) {
            return o.call(a.column, e);
          };
          e[i].originalCallback = o;
          e[i].columnIndex = t;
          e[i].context = a;
        }
      }
    });
    if ((0, h.isString)(e.calculateDisplayValue)) {
      e.displayField = e.calculateDisplayValue;
      e.calculateDisplayValue = (0, r.compileGetter)(e.displayField);
    }
    if (e.calculateDisplayValue) {
      e.displayValueMap = e.displayValueMap || {};
    }
    (0, S.updateSerializers)(e, e.dataType);
    var n = e.lookup;
    if (n) {
      (0, S.updateSerializers)(n, n.dataType);
    }
    var i = n ? n.dataType : e.dataType;
    if (i) {
      e.alignment = e.alignment || (0, S.getAlignmentByDataType)(i, this.option("rtlEnabled"));
      e.format = e.format || w.default.getFormatByDataType(i);
      e.customizeText = e.customizeText || (0, S.getCustomizeTextByDataType)(i);
      e.defaultFilterOperations = e.defaultFilterOperations || !n && C.DATATYPE_OPERATIONS[i] || [];
      if (!(0, h.isDefined)(e.filterOperations)) {
        (0, S.setFilterOperationsAsDefaultValues)(e);
      }
      e.defaultFilterOperation = e.filterOperations && e.filterOperations[0] || "=";
      e.showEditorAlways = (0, h.isDefined)(e.showEditorAlways) ? e.showEditorAlways : i === "boolean" && !e.cellTemplate && !e.lookup;
    }
  };
  x.updateColumnDataTypes = function (e) {
    var t = this;
    var n = t.option("dateSerializationFormat");
    var i = t._getFirstItems(e);
    var o = false;
    (0, d.each)(t._columns, function (e, a) {
      var r;
      var s;
      var l;
      var u;
      var d;
      var c = a.lookup;
      if (w.default.isDateType(a.dataType) && a.serializationFormat === undefined) {
        a.serializationFormat = n;
      }
      if (c && w.default.isDateType(c.dataType) && a.serializationFormat === undefined) {
        c.serializationFormat = n;
      }
      if (a.calculateCellValue && i.length) {
        if (!a.dataType || c && !c.dataType) {
          for (r = 0; r < i.length; r++) {
            s = a.calculateCellValue(i[r]);
            if (!a.dataType) {
              d = (0, S.getValueDataType)(s);
              if ((l = l || d) && d && l !== d) {
                l = "string";
              }
            }
            if (c && !c.dataType) {
              d = (0, S.getValueDataType)(w.default.getDisplayValue(a, s, i[r]));
              if ((u = u || d) && d && u !== d) {
                u = "string";
              }
            }
          }
          if (l || u) {
            if (l) {
              a.dataType = l;
            }
            if (c && u) {
              c.dataType = u;
            }
            o = true;
          }
        }
        if (a.serializationFormat === undefined || c && c.serializationFormat === undefined) {
          for (r = 0; r < i.length; r++) {
            s = a.calculateCellValue(i[r], true);
            if (a.serializationFormat === undefined) {
              a.serializationFormat = (0, S.getSerializationFormat)(a.dataType, s);
            }
            if (c && c.serializationFormat === undefined) {
              c.serializationFormat = (0, S.getSerializationFormat)(c.dataType, c.calculateCellValue(s, true));
            }
          }
        }
      }
      t._updateColumnOptions(a, e);
    });
    return o;
  };
  x._customizeColumns = function (e) {
    var t = this.option("customizeColumns");
    if (t) {
      if (e.some(function (e) {
        return (0, h.isObject)(e.ownerBand);
      })) {
        (0, S.updateIndexes)(this);
      }
      t(e);
      (0, S.assignColumns)(this, (0, S.createColumnsFromOptions)(this, e));
    }
  };
  x.updateColumns = function (e, t, n) {
    var i = this;
    if (!t) {
      this.updateSortingGrouping(e);
    }
    if (!e || e.isLoaded()) {
      var o = e ? e.sort() || [] : this.getSortDataSourceParameters();
      var a = e ? e.group() || [] : this.getGroupDataSourceParameters();
      var r = e == null ? undefined : e.lastLoadOptions().filter;
      if (!n) {
        this._customizeColumns(this._columns);
      }
      (0, S.updateIndexes)(this);
      var l = this._columns;
      return (0, s.when)(this.refresh(true)).always(function () {
        if (i._columns === l) {
          i._updateChanges(e, {
            sorting: o,
            grouping: a,
            filtering: r
          });
          (0, S.fireColumnsChanged)(i);
        }
      });
    }
  };
  x._updateChanges = function (e, t) {
    if (e) {
      this.updateColumnDataTypes(e);
      this._dataSourceApplied = true;
    }
    if (!w.default.equalSortParameters(t.sorting, this.getSortDataSourceParameters())) {
      (0, S.updateColumnChanges)(this, "sorting");
    }
    if (!w.default.equalSortParameters(t.grouping, this.getGroupDataSourceParameters())) {
      (0, S.updateColumnChanges)(this, "grouping");
    }
    var n = this.getController("data");
    if (n && !w.default.equalFilterParameters(t.filtering, n.getCombinedFilter())) {
      (0, S.updateColumnChanges)(this, "filtering");
    }
    (0, S.updateColumnChanges)(this, "columns");
  };
  x.updateSortingGrouping = function (e, t) {
    var n;
    var i;
    var o = this;
    function a(e, n, i) {
      (0, d.each)(e, function (e, o) {
        delete o[i];
        if (n) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a].selector;
            var s = n[a].isExpanded;
            if (r === o.dataField || r === o.name || r === o.selector || r === o.calculateCellValue || r === o.calculateGroupValue || r === o.calculateDisplayValue) {
              o.sortOrder = t ? "sortOrder" in o ? o.sortOrder : n[a].desc ? "desc" : "asc" : o.sortOrder || (n[a].desc ? "desc" : "asc");
              if (s !== undefined) {
                o.autoExpandGroup = s;
              }
              o[i] = a;
              break;
            }
          }
        }
      });
    }
    if (e) {
      n = w.default.normalizeSortingInfo(e.sort());
      var r = w.default.normalizeSortingInfo(e.group());
      var s = o.getGroupDataSourceParameters();
      var l = o.getSortDataSourceParameters();
      var u = !w.default.equalSortParameters(r, s, true);
      var c = !u && !w.default.equalSortParameters(r, s);
      if (!o._columns.length) {
        (0, d.each)(r, function (e, t) {
          o._columns.push(t.selector);
        });
        (0, d.each)(n, function (e, t) {
          if (!(0, h.isFunction)(t.selector)) {
            o._columns.push(t.selector);
          }
        });
        (0, S.assignColumns)(o, (0, S.createColumnsFromOptions)(o, o._columns));
      }
      if ((!!t || !s && !o._hasUserState) && (!!u || !!c)) {
        a(o._columns, r, "groupIndex");
        if (t) {
          if (u) {
            (0, S.updateColumnChanges)(o, "grouping");
          }
          if (c) {
            (0, S.updateColumnChanges)(o, "groupExpanding");
          }
          i = true;
        }
      }
      if ((!!t || !l && !o._hasUserState) && !w.default.equalSortParameters(n, l)) {
        a(o._columns, n, "sortIndex");
        if (t) {
          (0, S.updateColumnChanges)(o, "sorting");
          i = true;
        }
      }
      if (i) {
        (0, S.fireColumnsChanged)(o);
      }
    }
  };
  x.updateFilter = function (e, t, n, o) {
    if (!Array.isArray(e)) {
      return e;
    }
    n = (e = (0, l.extend)([], e)).columnIndex !== undefined ? e.columnIndex : n;
    o = e.filterValue !== undefined ? e.filterValue : o;
    if ((0, h.isString)(e[0]) && e[0] !== "!") {
      var a = this.columnOption(e[0]);
      if (t) {
        if ((0, i.default)().forceIsoDateParsing && a && a.serializeValue && e.length > 1) {
          e[e.length - 1] = a.serializeValue(e[e.length - 1], "filter");
        }
      } else if (a && a.selector) {
        e[0] = a.selector;
        e[0].columnIndex = a.index;
      }
    } else if ((0, h.isFunction)(e[0])) {
      e[0].columnIndex = n;
      e[0].filterValue = o;
      e[0].selectedFilterOperation = e.selectedFilterOperation;
    }
    for (var r = 0; r < e.length; r++) {
      e[r] = this.updateFilter(e[r], t, n, o);
    }
    return e;
  };
  x.columnCount = function () {
    if (this._columns) {
      return this._columns.length;
    } else {
      return 0;
    }
  };
  x.columnOption = function (e, t, n, i) {
    var o = this;
    var a = o._columns.concat(o._commandColumns);
    var r = (0, S.findColumn)(a, e);
    if (r) {
      if (arguments.length === 1) {
        return (0, l.extend)({}, r);
      }
      if ((0, h.isString)(t)) {
        if (arguments.length === 2) {
          return (0, S.columnOptionCore)(o, r, t);
        }
        (0, S.columnOptionCore)(o, r, t, n, i);
      } else if ((0, h.isObject)(t)) {
        (0, d.each)(t, function (e, t) {
          (0, S.columnOptionCore)(o, r, e, t, i);
        });
      }
      (0, S.fireColumnsChanged)(o);
    }
  };
  x.clearSorting = function () {
    var e = this.columnCount();
    this.beginUpdate();
    for (var t = 0; t < e; t++) {
      this.columnOption(t, "sortOrder", undefined);
      delete (0, S.findColumn)(this._columns, t).sortOrder;
    }
    this.endUpdate();
  };
  x.clearGrouping = function () {
    var e = this.columnCount();
    this.beginUpdate();
    for (var t = 0; t < e; t++) {
      this.columnOption(t, "groupIndex", undefined);
    }
    this.endUpdate();
  };
  x.getVisibleIndex = function (e, t) {
    var n = this.getVisibleColumns(t);
    for (var i = n.length - 1; i >= 0; i--) {
      if (n[i].index === e) {
        return i;
      }
    }
    return -1;
  };
  x.getVisibleIndexByColumn = function (e, t) {
    var n = this.getVisibleColumns(t);
    var i = n.filter(function (t) {
      return t.index === e.index && t.command === e.command;
    })[0];
    return n.indexOf(i);
  };
  x.getVisibleColumnIndex = function (e, t) {
    var n = this.columnOption(e, "index");
    return this.getVisibleIndex(n, t);
  };
  x.addColumn = function (e) {
    var t = (0, S.createColumn)(this, e);
    var n = this._columns.length;
    this._columns.push(t);
    if (t.isBand) {
      this._columns = (0, S.createColumnsFromOptions)(this, this._columns);
      t = this._columns[n];
    }
    t.added = e;
    (0, S.updateIndexes)(this, t);
    this.updateColumns(this._dataSource);
    this._checkColumns();
  };
  x.deleteColumn = function (e) {
    var t = this.columnOption(e);
    if (t && t.index >= 0) {
      (0, S.convertOwnerBandToColumnReference)(this._columns);
      this._columns.splice(t.index, 1);
      if (t.isBand) {
        var n = this.getChildrenByBandColumn(t.index).map(function (e) {
          return e.index;
        });
        this._columns = this._columns.filter(function (e) {
          return n.indexOf(e.index) < 0;
        });
      }
      (0, S.updateIndexes)(this);
      this.updateColumns(this._dataSource);
    }
  };
  x.addCommandColumn = function (e) {
    var t = this._commandColumns.filter(function (t) {
      return t.command === e.command;
    })[0];
    if (!t) {
      t = e;
      this._commandColumns.push(t);
    }
  };
  x.getUserState = function () {
    var e;
    var t = this._columns;
    var n = [];
    function i(i, o) {
      if (t[e][o] !== undefined) {
        n[e][o] = t[e][o];
      }
    }
    for (e = 0; e < t.length; e++) {
      n[e] = {};
      (0, d.each)(C.USER_STATE_FIELD_NAMES, i);
    }
    return n;
  };
  x.setName = function (e) {
    e.name = e.name || e.dataField || e.type;
  };
  x.setUserState = function (e) {
    var t = this._dataSource;
    var n = this.option("stateStoring.ignoreColumnOptionNames");
    if (e != null) {
      e.forEach(this.setName);
    }
    if (!n) {
      n = [];
      var i = this.getCommonSettings();
      if (!this.option("columnChooser.enabled")) {
        n.push("visible");
      }
      if (this.option("sorting.mode") === "none") {
        n.push("sortIndex", "sortOrder");
      }
      if (!i.allowGrouping) {
        n.push("groupIndex");
      }
      if (!i.allowFixing) {
        n.push("fixed", "fixedPosition");
      }
      if (!i.allowResizing) {
        n.push("width", "visibleWidth");
      }
      var o = !this.option("filterPanel.visible");
      if (!this.option("filterRow.visible") && o) {
        n.push("filterValue", "selectedFilterOperation");
      }
      if (!this.option("headerFilter.visible") && o) {
        n.push("filterValues", "filterType");
      }
    }
    this._columnsUserState = e;
    this._ignoreColumnOptionNames = n;
    this._hasUserState = !!e;
    (0, S.updateColumnChanges)(this, "filtering");
    this.init(true);
    if (t) {
      t.sort(this.getSortDataSourceParameters());
      t.group(this.getGroupDataSourceParameters());
    }
  };
  x._checkColumns = function () {
    var e = {};
    var t = false;
    var n = [];
    this._columns.forEach(function (i) {
      var a = i.name;
      var r = i.columns?.length;
      var s = i.allowEditing && (i.dataField || i.setCellValue) && !r;
      if (a) {
        if (e[a]) {
          n.push(`"${a}"`);
        }
        e[a] = true;
      } else if (s) {
        t = true;
      }
    });
    if (n.length) {
      b.default.log("E1059", n.join(", "));
    }
    if (t) {
      b.default.log("E1060");
    }
  };
  x._createCalculatedColumnOptions = function (e, t) {
    var n = {};
    var i = e.dataField;
    if (Array.isArray(e.columns) && e.columns.length || e.isBand) {
      n.isBand = true;
      i = null;
    }
    if (i) {
      if ((0, h.isString)(i)) {
        var o = (0, r.compileGetter)(i);
        n = {
          caption: (0, u.captionize)(i),
          calculateCellValue: function (e, t) {
            var n = o(e);
            if (this.deserializeValue && !t) {
              return this.deserializeValue(n);
            } else {
              return n;
            }
          },
          setCellValue: S.defaultSetCellValue,
          parseValue: function (e) {
            var t;
            var n;
            if (this.dataType === "number") {
              if ((0, h.isString)(e) && this.format) {
                t = (0, S.strictParseNumber)(e.trim(), this.format);
              } else if ((0, h.isDefined)(e) && (0, h.isNumeric)(e)) {
                t = Number(e);
              }
            } else if (this.dataType === "boolean") {
              if (e === this.trueText) {
                t = true;
              } else if (e === this.falseText) {
                t = false;
              }
            } else if (w.default.isDateType(this.dataType)) {
              if (n = _.default.parse(e, this.format)) {
                t = n;
              }
            } else {
              t = e;
            }
            return t;
          }
        };
      }
      n.allowFiltering = true;
    } else {
      n.allowFiltering = !!e.calculateFilterExpression;
    }
    n.calculateFilterExpression = function () {
      return y.default.defaultCalculateFilterExpression.apply(this, arguments);
    };
    n.defaultFilterOperation = "=";
    n.createFilterExpression = function (e, t) {
      var n;
      if (this.calculateFilterExpression) {
        n = this.calculateFilterExpression.apply(this, arguments);
      }
      if ((0, h.isFunction)(n)) {
        n = [n, "=", true];
      }
      if (n) {
        n.columnIndex = this.index;
        n.filterValue = e;
        n.selectedFilterOperation = t;
      }
      return n;
    };
    if (!i || !(0, h.isString)(i)) {
      (0, l.extend)(true, n, {
        allowSorting: false,
        allowGrouping: false,
        calculateCellValue: function () {
          return null;
        }
      });
    }
    if (t) {
      n.allowFixing = false;
    }
    if (e.dataType) {
      n.userDataType = e.dataType;
    }
    if (e.selectedFilterOperation && !("defaultSelectedFilterOperation" in n)) {
      n.defaultSelectedFilterOperation = e.selectedFilterOperation;
    }
    if (e.lookup) {
      n.lookup = {
        calculateCellValue: function (e, t) {
          if (this.valueExpr) {
            e = this.valueMap && this.valueMap[e];
          }
          if (this.deserializeValue && !t) {
            return this.deserializeValue(e);
          } else {
            return e;
          }
        },
        updateValueMap: function () {
          this.valueMap = {};
          if (this.items) {
            var e = (0, r.compileGetter)(this.valueExpr);
            var t = (0, r.compileGetter)(this.displayExpr);
            for (var n = 0; n < this.items.length; n++) {
              var i = this.items[n];
              var o = t(i);
              this.valueMap[e(i)] = o;
              this.dataType = this.dataType || (0, S.getValueDataType)(o);
            }
          }
        },
        update: function () {
          var e = this;
          var t = e.dataSource;
          if (t) {
            if ((0, h.isFunction)(t) && !f.default.isWrapped(t)) {
              t = t({});
            }
            if ((0, h.isPlainObject)(t) || t instanceof p.default || Array.isArray(t)) {
              if (e.valueExpr) {
                var n = (0, m.normalizeDataSourceOptions)(t);
                n.paginate = false;
                return (t = new g.DataSource(n)).load().done(function (t) {
                  e.items = t;
                  if (e.updateValueMap) {
                    e.updateValueMap();
                  }
                });
              }
            } else {
              b.default.log("E1016");
            }
          } else if (e.updateValueMap) {
            e.updateValueMap();
          }
        }
      };
    }
    n.resizedCallbacks = (0, a.default)();
    if (e.resized) {
      n.resizedCallbacks.add(e.resized.bind(e));
    }
    (0, d.each)(n, function (e) {
      if ((0, h.isFunction)(n[e]) && e.indexOf("default") !== 0) {
        var t = `default${e.charAt(0).toUpperCase()}${e.substr(1)}`;
        n[t] = n[e];
      }
    });
    return n;
  };
  x.getRowCount = function () {
    this._rowCount = this._rowCount || (0, S.getRowCount)(this);
    return this._rowCount;
  };
  x.getRowIndex = function (e, t) {
    var n = this._columns[e];
    var i = this.getBandColumnsCache();
    if (n && (t || n.visible && !n.command && !(0, h.isDefined)(n.groupIndex))) {
      return (0, S.getParentBandColumns)(e, i.columnParentByIndex).length;
    } else {
      return 0;
    }
  };
  x.getChildrenByBandColumn = function (e, t) {
    var n = this.getBandColumnsCache();
    var i = (0, S.getChildrenByBandColumn)(e, n.columnChildrenByIndex, !t);
    if (t) {
      return i.filter(function (e) {
        return e.visible && !e.command;
      }).sort(function (e, t) {
        return e.visibleIndex - t.visibleIndex;
      });
    } else {
      return i;
    }
  };
  x.isParentBandColumn = function (e, t) {
    var n = false;
    var i = this._columns[e];
    var o = this.getBandColumnsCache();
    var a = i && (0, S.getParentBandColumns)(e, o.columnParentByIndex);
    if (a) {
      (0, d.each)(a, function (e, i) {
        if (i.index === t) {
          n = true;
          return false;
        }
      });
    }
    return n;
  };
  x.isParentColumnVisible = function (e) {
    var t = true;
    var n = this.getBandColumnsCache();
    var i = e >= 0 && (0, S.getParentBandColumns)(e, n.columnParentByIndex);
    if (i) {
      (0, d.each)(i, function (e, n) {
        return t = t && n.visible;
      });
    }
    return t;
  };
  x.getColumnId = function (e) {
    if (e.command && e.type === C.GROUP_COMMAND_COLUMN_NAME) {
      if ((0, S.isCustomCommandColumn)(this, e)) {
        return `type:${e.type}`;
      } else {
        return `command:${e.command}`;
      }
    } else {
      return e.index;
    }
  };
  x.getCustomizeTextByDataType = function (e) {
    return (0, S.getCustomizeTextByDataType)(e);
  };
  x.getHeaderContentAlignment = function (e) {
    if (this.option("rtlEnabled")) {
      if (e === "left") {
        return "right";
      } else {
        return "left";
      }
    } else {
      return e;
    }
  };
  return v;
}(x.default.Controller);
exports.ColumnsController = T;
var E = {
  defaultOptions: function () {
    return {
      commonColumnSettings: {
        allowFiltering: true,
        allowHiding: true,
        allowSorting: true,
        allowEditing: true,
        encodeHtml: true,
        trueText: v.default.format("dxDataGrid-trueText"),
        falseText: v.default.format("dxDataGrid-falseText")
      },
      allowColumnReordering: false,
      allowColumnResizing: false,
      columnResizingMode: "nextColumn",
      columnMinWidth: undefined,
      columnWidth: undefined,
      adaptColumnWidthByRatio: true,
      columns: undefined,
      regenerateColumnsByVisibleItems: false,
      customizeColumns: null,
      dateSerializationFormat: undefined
    };
  },
  controllers: {
    columns: T
  }
};
exports.columnsControllerModule = E;