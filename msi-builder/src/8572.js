exports.exportDataGrid = function (e) {
  return o.Export.export(function (e) {
    if (!(0, i.isDefined)(e) || !(0, i.isObject)(e)) {
      throw Error("The \"exportDataGrid\" method requires a configuration object.");
    }
    if (!(0, i.isDefined)(e.component) || !(0, i.isObject)(e.component) || e.component.NAME !== "dxDataGrid") {
      throw Error("The \"component\" field must contain a DataGrid instance.");
    }
    if (!(0, i.isDefined)(e.selectedRowsOnly)) {
      e.selectedRowsOnly = false;
    }
    if (!(0, i.isDefined)(e.autoFilterEnabled)) {
      e.autoFilterEnabled = false;
    }
    return o.Export.getFullOptions(e);
  }(e), r, s, l);
};
var i = require("./35922.js");
var o = require("./11385.js");
var a = require("./31980.js");
var r = function () {
  function e(e, t, n, i) {
    this.component = e;
    this.dataProvider = t;
    this.worksheet = n;
    this.mergedRangesManager = new a.MergedRangesManager(t, n);
    this.topLeftCell = i.topLeftCell;
    this.customizeCell = i.customizeCell;
    this.autoFilterEnabled = i.autoFilterEnabled;
  }
  var t = e.prototype;
  t._getFirstColumnIndex = function () {
    return this.topLeftCell.column;
  };
  t._getFieldHeaderRowsCount = function () {
    return 0;
  };
  t._trySetAutoFilter = function (e) {
    if (this.autoFilterEnabled && !(0, i.isDefined)(this.worksheet.autoFilter) && this.dataProvider.getRowsCount() > 0) {
      var t = {
        from: {
          row: e.from.row + this.dataProvider.getHeaderRowCount() - 1,
          column: e.from.column
        },
        to: e.to
      };
      this.worksheet.autoFilter = t;
    }
  };
  t._trySetFont = function (e, t) {
    if ((0, i.isDefined)(t)) {
      e.font = e.font || {};
      e.font.bold = t;
    }
  };
  t._getWorksheetFrozenState = function (e) {
    return {
      state: "frozen",
      ySplit: e.from.row + this.dataProvider.getFrozenArea().y - 1
    };
  };
  t._trySetOutlineLevel = function (e, t) {
    if (t >= this.dataProvider.getHeaderRowCount()) {
      e.outlineLevel = this.dataProvider.getGroupLevel(t);
    }
  };
  t._isFrozenZone = function (e) {
    return e.getHeaderRowCount() > 0;
  };
  t._isHeaderCell = function (e) {
    return e < this.dataProvider.getHeaderRowCount();
  };
  t._isInfoCell = function () {
    return false;
  };
  t._allowToMergeRange = function () {
    return true;
  };
  t._getAllFieldHeaders = function () {
    return [];
  };
  t._customizeCell = function (e, t) {
    if ((0, i.isFunction)(this.customizeCell)) {
      this.customizeCell({
        excelCell: e,
        gridCell: t
      });
    }
  };
  t._exportFieldHeaders = function () {};
  t._exportAllFieldHeaders = function () {};
  t._isRowFieldHeadersRow = function () {};
  return e;
}();
function s(e) {
  return e.getView("rowsView").element();
}
function l(e) {
  return e.getView("rowsView").element().parent();
}