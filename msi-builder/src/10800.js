exports.default = undefined;
var i = require("./57530.js");
function o(e) {
  return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function a(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (a = i.key, r = undefined, r = function (e, t) {
      if (o(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (o(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), o(r) === "symbol" ? r : String(r)), i);
  }
  var a;
  var r;
}
var r = function () {
  function e(e) {
    this._viewDataProvider = e;
    this._focusedCell = null;
    this._selectedCells = null;
    this._firstSelectedCell = null;
    this._prevFocusedCell = null;
    this._prevSelectedCells = null;
  }
  var t;
  var n;
  var o;
  var r = e.prototype;
  r.setFocusedCell = function (e, t, n) {
    if (e >= 0) {
      var i = this._viewDataProvider.getCellData(e, t, n);
      this._focusedCell = i;
    }
  };
  r.setSelectedCells = function (e, t = undefined) {
    var n = this._viewDataProvider;
    var o = e.rowIndex;
    var a = e.columnIndex;
    var r = e.allDay;
    if (!(o < 0)) {
      var s = t ? n.getCellData(t.rowIndex, t.columnIndex, t.allDay) : this._firstSelectedCell;
      var l = n.getCellData(o, a, r);
      this._firstSelectedCell = s;
      this._selectedCells = (0, i.getSelectedCells)(this._viewDataProvider, s, l, r);
    }
  };
  r.setSelectedCellsByData = function (e) {
    this._selectedCells = e;
  };
  r.getSelectedCells = function () {
    return this._selectedCells;
  };
  r.releaseSelectedAndFocusedCells = function () {
    this.releaseSelectedCells();
    this.releaseFocusedCell();
  };
  r.releaseSelectedCells = function () {
    this._prevSelectedCells = this._selectedCells;
    this._prevFirstSelectedCell = this._firstSelectedCell;
    this._selectedCells = null;
    this._firstSelectedCell = null;
  };
  r.releaseFocusedCell = function () {
    this._prevFocusedCell = this._focusedCell;
    this._focusedCell = null;
  };
  r.restoreSelectedAndFocusedCells = function () {
    this._selectedCells = this._selectedCells || this._prevSelectedCells;
    this._focusedCell = this._focusedCell || this._prevFocusedCell;
    this._firstSelectedCell = this._firstSelectedCell || this._prevFirstSelectedCell;
    this._prevSelectedCells = null;
    this._prevFirstSelectedCell = null;
    this._prevFocusedCell = null;
  };
  r.clearSelectedAndFocusedCells = function () {
    this._prevSelectedCells = null;
    this._selectedCells = null;
    this._prevFocusedCell = null;
    this._focusedCell = null;
  };
  t = e;
  if (n = [{
    key: "viewDataProvider",
    get: function () {
      return this._viewDataProvider;
    }
  }, {
    key: "focusedCell",
    get: function () {
      var e = this._focusedCell;
      if (e) {
        var t = {
          groupIndex: e.groupIndex,
          startDate: e.startDate,
          isAllDay: e.allDay,
          index: e.index
        };
        return {
          coordinates: this.viewDataProvider.findCellPositionInMap(t),
          cellData: e
        };
      }
    }
  }]) {
    a(t.prototype, n);
  }
  if (o) {
    a(t, o);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;