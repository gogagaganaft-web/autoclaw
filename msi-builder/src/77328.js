exports.exportPivotGrid = function (e) {
  return o.Export.export(function (e) {
    if (!(0, i.isDefined)(e) || !(0, i.isObject)(e)) {
      throw Error("The \"exportPivotGrid\" method requires a configuration object.");
    }
    if (!(0, i.isDefined)(e.component) || !(0, i.isObject)(e.component) || e.component.NAME !== "dxPivotGrid") {
      throw Error("The \"component\" field must contain a PivotGrid instance.");
    }
    if (!(0, i.isDefined)(e.mergeRowFieldValues)) {
      e.mergeRowFieldValues = true;
    }
    if (!(0, i.isDefined)(e.mergeColumnFieldValues)) {
      e.mergeColumnFieldValues = true;
    }
    if (!(0, i.isDefined)(e.exportDataFieldHeaders)) {
      e.exportDataFieldHeaders = false;
    }
    if (!(0, i.isDefined)(e.exportRowFieldHeaders)) {
      e.exportRowFieldHeaders = false;
    }
    if (!(0, i.isDefined)(e.exportColumnFieldHeaders)) {
      e.exportColumnFieldHeaders = false;
    }
    if (!(0, i.isDefined)(e.exportFilterFieldHeaders)) {
      e.exportFilterFieldHeaders = false;
    }
    return o.Export.getFullOptions(e);
  }(e), u, d, c);
};
var i = require("./35922.js");
var o = require("./11385.js");
var a = require("./37518.js");
var r = require("./78008.js");
var s = require("./31980.js");
function l() {
  return (l = Object.assign ? Object.assign.bind() : function (e) {
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
var u = function () {
  function e(e, t, n, i) {
    this.component = e;
    this.dataProvider = t;
    this.worksheet = n;
    this.mergedRangesManager = new s.MergedRangesManager(t, n);
    this.topLeftCell = i.topLeftCell;
    this.customizeCell = i.customizeCell;
    this.mergeColumnFieldValues = i.mergeColumnFieldValues;
    this.mergeRowFieldValues = i.mergeRowFieldValues;
    this.exportFilterFieldHeaders = i.exportFilterFieldHeaders;
    this.exportDataFieldHeaders = i.exportDataFieldHeaders;
    this.exportColumnFieldHeaders = i.exportColumnFieldHeaders;
    this.exportRowFieldHeaders = i.exportRowFieldHeaders;
    this.rtlEnabled = e.option("rtlEnabled");
    this.rowHeaderLayout = e.option("rowHeaderLayout");
    this.wrapText = !!e.option("wordWrapEnabled");
    this.filterFieldHeaders = this._tryGetFieldHeaders("filter");
    this.dataFieldHeaders = this._tryGetFieldHeaders("data");
    this.columnFieldHeaders = this._tryGetFieldHeaders("column");
    this.rowFieldHeaders = this._tryGetFieldHeaders("row");
  }
  var t = e.prototype;
  t._getFirstColumnIndex = function () {
    return this.topLeftCell.column;
  };
  t._getWorksheetFrozenState = function (e) {
    var t = this.dataProvider.getFrozenArea();
    var n = t.x;
    var i = t.y;
    return {
      state: "frozen",
      xSplit: e.from.column + n - 1,
      ySplit: e.from.row + i + this._getFieldHeaderRowsCount() - 1
    };
  };
  t._getFieldHeaderRowsCount = function () {
    return 0 + this._allowExportFilterFieldHeaders() + (this._allowExportDataFieldHeaders() || this._allowExportColumnFieldHeaders());
  };
  t._isFrozenZone = function () {
    return true;
  };
  t._isHeaderCell = function (e, t) {
    return e < this.dataProvider.getColumnAreaRowCount() || t < this.dataProvider.getRowAreaColCount();
  };
  t._getDefaultFieldHeaderCellsData = function (e) {
    return {
      text: e,
      value: e
    };
  };
  t._isInfoCell = function (e, t) {
    return e < this.dataProvider.getColumnAreaRowCount() && t < this.dataProvider.getRowAreaColCount();
  };
  t._allowToMergeRange = function (e, t, n, i) {
    return (!this.dataProvider.isColumnAreaCell(e, t) || !!this.mergeColumnFieldValues || !i) && (!this.dataProvider.isRowAreaCell(e, t) || !!this.mergeRowFieldValues || !n);
  };
  t._trySetAutoFilter = function () {};
  t._trySetFont = function (e, t) {
    if ((0, i.isDefined)(t)) {
      e.font = e.font || {};
      e.font.bold = t;
    }
  };
  t._getFieldHeaderStyles = function () {
    var e = {
      style: "thin",
      color: {
        argb: "FF7E7E7E"
      }
    };
    return {
      alignment: (0, a.getDefaultAlignment)(this.rtlEnabled),
      bold: true,
      border: {
        bottom: e,
        left: e,
        right: e,
        top: e
      }
    };
  };
  t._trySetOutlineLevel = function () {};
  t._getAllFieldHeaders = function () {
    return this.dataProvider._exportController.getDataSource()._descriptions;
  };
  t._tryGetFieldHeaders = function (e) {
    if (!this[`export${(0, r.camelize)(e, true)}FieldHeaders`]) {
      return [];
    }
    var t = this._getAllFieldHeaders()[e === "data" ? "values" : `${e}s`].filter(function (t) {
      return t.area === e;
    });
    if ((0, a.getDefaultAlignment)(this.rtlEnabled) === "right") {
      t.sort(function (e, t) {
        return t.areaIndex - e.areaIndex;
      });
    }
    return t.map(function (e) {
      return e.caption;
    });
  };
  t._customizeCell = function (e, t, n) {
    if ((0, i.isFunction)(this.customizeCell) && !n) {
      this.customizeCell({
        excelCell: e,
        pivotCell: t
      });
    }
  };
  t._isRowFieldHeadersRow = function (e) {
    var t = this._isInfoCell(e, 0) && this.dataProvider.getCellData(e + 1, 0, true).cellSourceData.area === "row";
    return this._allowExportRowFieldHeaders() && t;
  };
  t._exportAllFieldHeaders = function (e, t) {
    var n = e.length;
    var i = this.dataProvider.getRowAreaColCount();
    var o = this.topLeftCell.row;
    if (this._allowExportFilterFieldHeaders()) {
      this._exportFieldHeaders("filter", o, 0, n, t);
      o++;
    }
    if (this._allowExportDataFieldHeaders()) {
      this._exportFieldHeaders("data", o, 0, i, t);
      if (!this._allowExportColumnFieldHeaders()) {
        this._exportFieldHeaders("column", o, i, n - i, t);
      }
    }
    if (this._allowExportColumnFieldHeaders()) {
      if (!this._allowExportDataFieldHeaders()) {
        this._exportFieldHeaders("data", o, 0, i, t);
      }
      this._exportFieldHeaders("column", o, i, n - i, t);
    }
  };
  t._exportFieldHeaders = function (e, t, n, i, o) {
    var a = this[`${e}FieldHeaders`];
    var r = this.worksheet.getRow(t);
    var s = e !== "row" || e === "row" && this.rowHeaderLayout === "tree";
    if (s) {
      this.mergedRangesManager.addMergedRange(r.getCell(this.topLeftCell.column + n), 0, i - 1);
    }
    for (var u = 0; u < i; u++) {
      var d;
      var c = r.getCell(this.topLeftCell.column + n + u);
      var h = a;
      var f = h.length > i || s ? h.join(", ") : h[u];
      d = l({}, this._getDefaultFieldHeaderCellsData(f), {
        headerType: e
      });
      c.value = f;
      this._applyHeaderStyles(c, o);
      this._customizeCell(c, d);
    }
  };
  t._applyHeaderStyles = function (e, t) {
    var n = this._getFieldHeaderStyles();
    var i = n.bold;
    var o = n.alignment;
    var a = n.border;
    this._trySetFont(e, i);
    t(e, this.wrapText, o);
    e.border = a;
  };
  t._allowExportRowFieldHeaders = function () {
    return this.rowFieldHeaders.length > 0;
  };
  t._allowExportFilterFieldHeaders = function () {
    return this.filterFieldHeaders.length > 0;
  };
  t._allowExportDataFieldHeaders = function () {
    return this.dataFieldHeaders.length > 0;
  };
  t._allowExportColumnFieldHeaders = function () {
    return this.columnFieldHeaders.length > 0;
  };
  return e;
}();
function d(e) {
  return e._dataArea.groupElement();
}
function c(e) {
  return e.$element();
}