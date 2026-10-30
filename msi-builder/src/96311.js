exports.default = undefined;
var i = require("./37518.js");
var o = require("./56012.js");
var a = require("./62060.js");
var r = require("./45985.js");
function s(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return l(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return l(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function l(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var u = function () {
  function e(e) {
    this._workSpace = e;
    this.cache = new o.Cache();
  }
  var t = e.prototype;
  t.prepareCellIndexes = function (e, t, n) {
    var i = e.rowIndex + t * this._workSpace._getRowCount();
    if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
      i += t;
      if (!n) {
        i += 1;
      }
    }
    return {
      rowIndex: i,
      columnIndex: e.columnIndex
    };
  };
  t.getGroupIndex = function (e) {
    return Math.floor(e / this._workSpace._getRowCount());
  };
  t.calculateHeaderCellRepeatCount = function () {
    return 1;
  };
  t.insertAllDayRowsIntoDateTable = function () {
    return this._workSpace.option("showAllDayPanel");
  };
  t.getTotalCellCount = function () {
    return this._workSpace._getCellCount();
  };
  t.getTotalRowCount = function () {
    return this._workSpace._getRowCount() * this._workSpace._getGroupCount();
  };
  t.calculateTimeCellRepeatCount = function () {
    return this._workSpace._getGroupCount() || 1;
  };
  t.getWorkSpaceMinWidth = function () {
    var e = this._workSpace._getWorkSpaceWidth();
    var t = (0, i.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth() - this._workSpace.getGroupTableWidth() - 2;
    if (e < t) {
      e = t;
    }
    return e;
  };
  t.getAllDayOffset = function () {
    return 0;
  };
  t.getGroupCountClass = function (e) {
    return (0, r.getVerticalGroupCountClass)(e);
  };
  t.getLeftOffset = function () {
    return this._workSpace.getTimePanelWidth() + this._workSpace.getGroupTableWidth();
  };
  t.getGroupBoundsOffset = function (e, t) {
    var n = this;
    var o = s(t, 2);
    var a = o[0];
    var l = o[1];
    return this.cache.get(`groupBoundsOffset${e}`, function () {
      var t = n._workSpace.option("startDayHour");
      var o = n._workSpace.option("endDayHour");
      var s = n._workSpace.option("hoursInterval");
      var u = (0, r.calculateDayDuration)(t, o) / s * n._workSpace.getCellHeight();
      var d = n.getScrollableScrollTop();
      var c = e * u + (0, i.getBoundingRect)(n._workSpace._$thead.get(0)).height + n._workSpace.option("getHeaderHeight")() + 10 - d;
      if (n._workSpace.option("showAllDayPanel") && n._workSpace.supportAllDayRow()) {
        c += n._workSpace.getCellHeight() * (e + 1);
      }
      var h = c + u;
      var f = a.getBoundingClientRect().left;
      var p = l.getBoundingClientRect().right;
      return n._groupBoundsOffset = {
        left: f,
        right: p,
        top: c,
        bottom: h
      };
    });
  };
  t.shiftIndicator = function (e, t, n, i) {
    var o = this._workSpace.getIndicatorOffset(0);
    var a = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
    var r = n ? n - o : o;
    var s = this._workSpace._getRowCount() * this._workSpace.getCellHeight() * i;
    if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
      s += this._workSpace.getAllDayHeight() * (i + 1);
    }
    e.css("left", r + a);
    e.css("top", t + s);
  };
  t.getShaderOffset = function (e, t) {
    var n = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
    if (this._workSpace.option("rtlEnabled")) {
      return (0, i.getBoundingRect)(this._$container.get(0)).width - n - this._workSpace.getWorkSpaceLeftOffset() - t;
    } else {
      return n;
    }
  };
  t.getShaderTopOffset = function (e) {
    return 0;
  };
  t.getShaderHeight = function () {
    var e = this._workSpace.getIndicationHeight();
    if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
      e += this._workSpace.getCellHeight();
    }
    return e;
  };
  t.getShaderMaxHeight = function () {
    var e = this._workSpace._getRowCount() * this._workSpace.getCellHeight();
    if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
      e += this._workSpace.getCellHeight();
    }
    return e;
  };
  t.getShaderWidth = function () {
    return this._workSpace.getIndicationWidth(0);
  };
  t.getScrollableScrollTop = function () {
    return this._workSpace.getScrollable().scrollTop();
  };
  t.addAdditionalGroupCellClasses = function (e, t, n, i) {
    e = this._addLastGroupCellClass(e, n + 1);
    return this._addFirstGroupCellClass(e, n + 1);
  };
  t._addLastGroupCellClass = function (e, t) {
    if (t % this._workSpace._getRowCount() == 0) {
      return `${e} ${a.LAST_GROUP_CELL_CLASS}`;
    } else {
      return e;
    }
  };
  t._addFirstGroupCellClass = function (e, t) {
    if ((t - 1) % this._workSpace._getRowCount() == 0) {
      return `${e} ${a.FIRST_GROUP_CELL_CLASS}`;
    } else {
      return e;
    }
  };
  return e;
}();
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;