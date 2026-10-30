exports.CellsSelectionController = undefined;
var i = require("./45985.js");
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
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
var a = function () {
  function e() {}
  var t = e.prototype;
  t.handleArrowClick = function (e) {
    var t;
    var n = e.key;
    var i = e.focusedCellPosition;
    var a = e.edgeIndices;
    var r = e.getCellDataByPosition;
    var s = e.isAllDayPanelCell;
    switch (n) {
      case "down":
        t = this.getCellFromNextRowPosition(i, "next", a);
        break;
      case "up":
        t = this.getCellFromNextRowPosition(i, "prev", a);
        break;
      case "left":
        t = this.getCellFromNextColumnPosition(o({}, e, {
          direction: "prev"
        }));
        break;
      case "right":
        t = this.getCellFromNextColumnPosition(o({}, e, {
          direction: "next"
        }));
    }
    var l = r(t.rowIndex, t.columnIndex, s);
    return this.moveToCell(o({}, e, {
      currentCellData: l
    }));
  };
  t.getCellFromNextRowPosition = function (e, t, n) {
    var i = e.columnIndex;
    var o = e.rowIndex;
    var a = o + (t === "next" ? 1 : -1);
    return {
      columnIndex: i,
      rowIndex: a >= 0 && a <= n.lastRowIndex ? a : o
    };
  };
  t.getCellFromNextColumnPosition = function (e) {
    var t = e.focusedCellPosition;
    var n = e.direction;
    var o = e.edgeIndices;
    var a = e.isRTL;
    var r = e.isGroupedByDate;
    var s = e.groupCount;
    var l = e.isMultiSelection;
    var u = e.viewType;
    var d = t.columnIndex;
    var c = t.rowIndex;
    var h = o.firstColumnIndex;
    var f = o.lastColumnIndex;
    var p = o.firstRowIndex;
    var g = o.lastRowIndex;
    var m = r && l ? s : 1;
    var _ = a ? -1 : 1;
    var v = d + (n === "next" ? _ * m : _ * -1 * m);
    if (v >= h && v <= f) {
      return {
        columnIndex: v,
        rowIndex: c
      };
    } else if ((0, i.isDateAndTimeView)(u)) {
      return t;
    } else {
      return this._processEdgeCell({
        nextColumnIndex: v,
        rowIndex: c,
        columnIndex: d,
        firstColumnIndex: h,
        lastColumnIndex: f,
        firstRowIndex: p,
        lastRowIndex: g,
        step: m
      });
    }
  };
  t._processEdgeCell = function (e) {
    var t = e.nextColumnIndex;
    var n = e.rowIndex;
    var i = e.columnIndex;
    var o = e.firstColumnIndex;
    var a = e.lastColumnIndex;
    var r = e.firstRowIndex;
    var s = e.lastRowIndex;
    var l = e.step;
    var u = t;
    var d = n;
    if (t < o) {
      var c = n - 1;
      var h = c >= r;
      d = h ? c : n;
      u = h ? a - (l - i % l - 1) : i;
    }
    if (t > a) {
      var f = n + 1;
      var p = f <= s;
      d = p ? f : n;
      u = p ? o + i % l : i;
    }
    return {
      columnIndex: u,
      rowIndex: d
    };
  };
  t.moveToCell = function (e) {
    var t = e.isMultiSelection;
    var n = e.isMultiSelectionAllowed;
    var i = e.focusedCellData;
    var o = e.currentCellData;
    if (t && n) {
      return this._getNextCellData(o, i);
    } else {
      return o;
    }
  };
  t._getNextCellData = function (e, t, n) {
    if (n) {
      return t;
    } else if (this._isValidNextFocusedCell(e, t)) {
      return e;
    } else {
      return t;
    }
  };
  t._isValidNextFocusedCell = function (e, t) {
    if (!t) {
      return true;
    }
    var n = t.groupIndex;
    var i = t.allDay;
    var o = e.groupIndex;
    var a = e.allDay;
    return n === o && i === a;
  };
  return e;
}();
exports.CellsSelectionController = a;