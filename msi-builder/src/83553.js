exports.GanttExportHelper = undefined;
var i = require("./58201.js");
var o = l(require("./13615.js"));
var a = require("./35922.js");
var r = l(require("./91500.js"));
var s = l(require("./18016.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = (0, i.getWindow)();
var d = function () {
  function e(e) {
    this._gantt = e;
    this._treeList = e._treeList;
    this._cache = {};
  }
  var t = e.prototype;
  t.reset = function () {
    this._cache = {};
  };
  t.getTreeListTableStyle = function () {
    var e = this._getTreeListTable();
    var t = u.getComputedStyle(e);
    return {
      color: t.color,
      backgroundColor: t.backgroundColor,
      fontSize: t.fontSize,
      fontFamily: t.fontFamily,
      fontWeight: t.fontWeight,
      fontStyle: t.fontStyle,
      textAlign: "left",
      verticalAlign: "middle"
    };
  };
  t.getTreeListColCount = function () {
    return this._getHeaderView().getColumnWidths().filter(function (e) {
      return e > 0;
    }).length;
  };
  t.getTreeListHeaderInfo = function (e) {
    var t = this._getHeaderElement(e);
    if (!t) {
      return null;
    }
    var n = u.getComputedStyle(t);
    var i = {
      color: n.color,
      padding: n.padding,
      paddingLeft: n.paddingLeft,
      paddingTop: n.paddingTop,
      paddingRight: n.paddingRight,
      paddingBottom: n.paddingBottom,
      verticalAlign: n.verticalAlign,
      width: this._getColumnWidth(e)
    };
    return {
      content: t.textContent,
      styles: i
    };
  };
  t.getTreeListCellInfo = function (e, t) {
    var i = this._treeList.getNodeByKey(e);
    var o = this._treeList.getRowIndexByKey(e);
    var a = o > -1 ? this._getDataCell(o, t) : null;
    var r = a ? u.getComputedStyle(a) : this._getColumnCellStyle(t);
    var s = {
      color: r.color,
      padding: r.padding,
      paddingLeft: r.paddingLeft,
      paddingTop: r.paddingTop,
      paddingRight: r.paddingRight,
      paddingBottom: r.paddingBottom,
      width: this._getColumnWidth(t)
    };
    if (t === 0) {
      s.extraLeftPadding = this._getEmptySpaceWidth(i.level);
    }
    return {
      content: (a == null ? undefined : a.textContent) ?? this._getDisplayText(e, t),
      styles: s
    };
  };
  t.getTreeListEmptyDataCellInfo = function () {
    return {
      content: this._treeList.option("noDataText")
    };
  };
  t._ensureColumnWidthCache = function (e) {
    var t;
    var n;
    if ((n = (t = this._cache).columnWidths) === null || n === undefined) {
      t.columnWidths = {};
    }
    if (!this._cache.columnWidths[e]) {
      var o = this._getHeaderElement(e);
      this._cache.columnWidths[e] = (o == null ? undefined : o.clientWidth) ?? 0;
    }
  };
  t._getColumnWidth = function (e) {
    this._ensureColumnWidthCache(e);
    var t = this._cache.columnWidths;
    return t && t[e];
  };
  t._getEmptySpaceWidth = function (e) {
    if (!this._cache.emptyWidth) {
      var t;
      var n;
      var o = this._getTreeListElement("dx-treelist-empty-space");
      if ((n = (t = this._cache).emptyWidth) === null || n === undefined) {
        t.emptyWidth = o.offsetWidth ?? 0;
      }
    }
    return this._cache.emptyWidth * (e + 1);
  };
  t._getColumnCellStyle = function (e) {
    this._ensureColumnCellStyleCache(e);
    return this._cache.columnStyles[e];
  };
  t._ensureColumnCellStyleCache = function (e) {
    var t;
    var n;
    if ((n = (t = this._cache).columnStyles) === null || n === undefined) {
      t.columnStyles = {};
    }
    if (!this._cache.columnStyles[e]) {
      var i = this._getDataCell(0, e);
      this._cache.columnStyles[e] = u.getComputedStyle(i);
    }
  };
  t._getTask = function (e) {
    this._ensureTaskCache(e);
    return this._cache.tasks[e];
  };
  t._ensureTaskCache = function (e) {
    var t;
    var n;
    var i;
    var o;
    if ((n = (t = this._cache).tasks) === null || n === undefined) {
      t.tasks = {};
    }
    if ((o = (i = this._cache.tasks)[e]) === null || o === undefined) {
      i[e] = this._gantt._findTaskByKey(e);
    }
  };
  t._getTreeListTable = function () {
    return this._getTreeListElement("dx-treelist-table");
  };
  t._getTreeListElement = function (e) {
    return this._treeList._$element.find("." + e).get(0);
  };
  t._getDataCell = function (e, t) {
    var n = this._treeList.getCellElement(e, t);
    if (n && n.length) {
      return n[0];
    } else {
      return n;
    }
  };
  t._getHeaderElement = function (e) {
    return this._getHeaderView().getHeaderElement(e).get(0);
  };
  t._getHeaderView = function () {
    return this._treeList._views.columnHeadersView;
  };
  t._getDisplayText = function (e, t) {
    var n = this._getTask(e);
    return n && this._getGridDisplayText(t, n);
  };
  t._getGridDisplayText = function (e, t) {
    var n = this._treeList.getController("columns").getColumns()[e];
    var i = n == null ? undefined : n.dataField;
    var l = n == null ? undefined : n.format;
    var u = o.default.getDisplayValue(n, t[i], t, "data");
    if ((0, a.isDefined)(l)) {
      if ((n == null ? undefined : n.dataType) === "date" || (n == null ? undefined : n.dataType) === "datetime") {
        var d = (0, a.isDate)(u) ? u : new Date(u);
        return r.default.format(d, l);
      }
      if ((0, a.isNumeric)(u)) {
        return s.default.format(u, l);
      }
    }
    if (typeof u == "string") {
      return u;
    } else if (u == null) {
      return undefined;
    } else {
      return u.toString();
    }
  };
  return e;
}();
exports.GanttExportHelper = d;