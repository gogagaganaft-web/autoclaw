exports.default = undefined;
var i = require("./37518.js");
var o = require("./62060.js");
var a = function () {
  function e(e) {
    this._workSpace = e;
  }
  var t = e.prototype;
  t.prepareCellIndexes = function (e, t, n) {
    if (this._workSpace.isGroupedByDate()) {
      return {
        rowIndex: e.rowIndex,
        columnIndex: e.columnIndex * this._workSpace._getGroupCount() + t
      };
    } else {
      return {
        rowIndex: e.rowIndex,
        columnIndex: e.columnIndex + t * this._workSpace._getCellCount()
      };
    }
  };
  t.getGroupIndex = function (e, t) {
    var n = this._workSpace.isGroupedByDate();
    var i = this._workSpace._getGroupCount();
    if (n) {
      return t % i;
    } else {
      return Math.floor(t / this._workSpace._getCellCount());
    }
  };
  t.calculateHeaderCellRepeatCount = function () {
    return this._workSpace._getGroupCount() || 1;
  };
  t.insertAllDayRowsIntoDateTable = function () {
    return false;
  };
  t.getTotalCellCount = function (e) {
    e = e || 1;
    return this._workSpace._getCellCount() * e;
  };
  t.getTotalRowCount = function () {
    return this._workSpace._getRowCount();
  };
  t.calculateTimeCellRepeatCount = function () {
    return 1;
  };
  t.getWorkSpaceMinWidth = function () {
    return (0, i.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth();
  };
  t.getAllDayOffset = function () {
    return this._workSpace.getAllDayHeight();
  };
  t.getGroupCountClass = function (e) {};
  t.getLeftOffset = function () {
    return this._workSpace.getTimePanelWidth();
  };
  t._createGroupBoundOffset = function (e, t, n) {
    var i = n / 2;
    return {
      left: e ? e.offset().left - i : 0,
      right: t ? t.offset().left + n + i : 0,
      top: 0,
      bottom: 0
    };
  };
  t._getGroupedByDateBoundOffset = function (e, t) {
    var n = e.length - 1;
    var i = e.eq(0);
    var o = e.eq(n);
    return this._createGroupBoundOffset(i, o, t);
  };
  t.getGroupBoundsOffset = function (e, t, n, i, o) {
    if (this._workSpace.isGroupedByDate()) {
      return this._getGroupedByDateBoundOffset(t, n);
    }
    var a;
    var r;
    var s = this._workSpace.getCellIndexByCoordinates(i);
    var l = i.groupIndex || Math.floor(s / e);
    var u = o.dateTableGroupedMap[l];
    if (u) {
      var d = u[0].length;
      var c = u[0][0].position;
      var h = u[0][d - 1].position;
      a = t.eq(c.columnIndex);
      r = t.eq(h.columnIndex);
    }
    return this._createGroupBoundOffset(a, r, n);
  };
  t.shiftIndicator = function (e, t, n, i) {
    var o = this._getIndicatorOffset(i);
    var a = n ? n - o : o;
    e.css("left", a);
    e.css("top", t);
  };
  t._getIndicatorOffset = function (e) {
    if (this._workSpace.isGroupedByDate()) {
      return this._calculateGroupByDateOffset(e);
    } else {
      return this._calculateOffset(e);
    }
  };
  t._calculateOffset = function (e) {
    return this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(e - 1, 0) * e + this._workSpace.getIndicatorOffset(e) + e;
  };
  t._calculateGroupByDateOffset = function (e) {
    return this._workSpace.getIndicatorOffset(0) * this._workSpace._getGroupCount() + this._workSpace.getRoundedCellWidth(e - 1, 0) * e;
  };
  t.getShaderOffset = function (e, t) {
    var n = this._workSpace._getCellCount() * this._workSpace.getRoundedCellWidth(e - 1) * e;
    if (this._workSpace.option("rtlEnabled")) {
      return (0, i.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).width - n - this._workSpace.getTimePanelWidth() - t;
    } else {
      return n;
    }
  };
  t.getShaderTopOffset = function (e) {
    return -this.getShaderMaxHeight() * (e > 0 ? 1 : 0);
  };
  t.getShaderHeight = function () {
    return this._workSpace.getIndicationHeight();
  };
  t.getShaderMaxHeight = function () {
    return (0, i.getBoundingRect)(this._workSpace._dateTableScrollable.$content().get(0)).height;
  };
  t.getShaderWidth = function (e) {
    return this._workSpace.getIndicationWidth(e);
  };
  t.getScrollableScrollTop = function (e) {
    if (e) {
      return 0;
    } else {
      return this._workSpace.getScrollable().scrollTop();
    }
  };
  t.addAdditionalGroupCellClasses = function (e, t, n, i, o = false) {
    e = this._addLastGroupCellClass(e, t, o);
    return this._addFirstGroupCellClass(e, t, o);
  };
  t._addLastGroupCellClass = function (e, t, n) {
    if (n) {
      return `${e} ${o.LAST_GROUP_CELL_CLASS}`;
    }
    if (this._workSpace.isGroupedByDate()) {
      if (t % this._workSpace._getGroupCount() == 0) {
        return `${e} ${o.LAST_GROUP_CELL_CLASS}`;
      }
    } else if (t % this._workSpace._getCellCount() == 0) {
      return `${e} ${o.LAST_GROUP_CELL_CLASS}`;
    }
    return e;
  };
  t._addFirstGroupCellClass = function (e, t, n) {
    if (n) {
      return `${e} ${o.FIRST_GROUP_CELL_CLASS}`;
    }
    if (this._workSpace.isGroupedByDate()) {
      if ((t - 1) % this._workSpace._getGroupCount() == 0) {
        return `${e} ${o.FIRST_GROUP_CELL_CLASS}`;
      }
    } else if ((t - 1) % this._workSpace._getCellCount() == 0) {
      return `${e} ${o.FIRST_GROUP_CELL_CLASS}`;
    }
    return e;
  };
  return e;
}();
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;