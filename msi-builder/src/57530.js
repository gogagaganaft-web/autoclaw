exports.isCellAllDay = exports.getTotalRowCount = exports.getTotalCellCount = exports.getSelectedCells = exports.getRowCountWithAllDayRow = exports.getHiddenInterval = exports.getDateTableWidth = exports.getDateForHeaderText = exports.getCellIndices = exports.createVirtualScrollingOptions = exports.createCellElementMetaData = exports.compareCellsByDateAndIndex = exports.DATE_TABLE_MIN_CELL_WIDTH = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./98140.js");
var r = require("./97205.js");
var s = require("./8936.js");
function l(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return u(e);
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
      return u(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return u(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function u(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var d = o.default.dateToMilliseconds("day");
var c = o.default.dateToMilliseconds("hour");
exports.DATE_TABLE_MIN_CELL_WIDTH = 75;
exports.getTotalRowCount = function (e, t, n, i) {
  var o = (0, r.isVerticalGroupingApplied)(n, t);
  var s = (0, a.getGroupCount)(n);
  var l = o ? e * s : e;
  if (i) {
    return l + s;
  } else {
    return l;
  }
};
function h(e, t, n) {
  var i = (0, r.isHorizontalGroupingApplied)(n, t);
  var o = (0, a.getGroupCount)(n);
  if (i) {
    return e * o;
  } else {
    return e;
  }
}
exports.getTotalCellCount = h;
exports.getRowCountWithAllDayRow = function (e, t) {
  if (t) {
    return e + 1;
  } else {
    return e;
  }
};
exports.getHiddenInterval = function (e, t) {
  return d - e * t * c;
};
exports.createCellElementMetaData = function (e, t) {
  var n = t.bottom;
  var i = t.height;
  var o = t.left;
  var a = t.right;
  var r = t.top;
  var s = t.width;
  var l = t.x;
  var u = t.y;
  return {
    right: a,
    bottom: n,
    left: o - e.left,
    top: r - e.top,
    width: s,
    height: i,
    x: l,
    y: u
  };
};
exports.getDateForHeaderText = function (e, t) {
  return t;
};
exports.getDateTableWidth = function (e, t, n, i) {
  var o = t.querySelector("td:not(.dx-scheduler-virtual-cell)").getBoundingClientRect().width;
  if (o < 75) {
    o = 75;
  }
  var a = n.getCellCount(i);
  var r = h(a, i.groupOrientation, i.groups) * o;
  if (e < r) {
    return r;
  } else {
    return e;
  }
};
exports.createVirtualScrollingOptions = function (e) {
  return {
    getCellHeight: function () {
      return e.cellHeight;
    },
    getCellWidth: function () {
      return e.cellWidth;
    },
    getCellMinWidth: function () {
      return 75;
    },
    isRTL: function () {
      return e.rtlEnabled;
    },
    getSchedulerHeight: function () {
      return e.schedulerHeight;
    },
    getSchedulerWidth: function () {
      return e.schedulerWidth;
    },
    getViewHeight: function () {
      return e.viewHeight;
    },
    getViewWidth: function () {
      return e.viewWidth;
    },
    getScrolling: function () {
      return e.scrolling;
    },
    getScrollableOuterWidth: function () {
      return e.scrollableWidth;
    },
    getGroupCount: function () {
      return (0, a.getGroupCount)(e.groups);
    },
    isVerticalGrouping: function () {
      return e.isVerticalGrouping;
    },
    getTotalRowCount: function () {
      return e.completeRowCount;
    },
    getTotalCellCount: function () {
      return e.completeColumnCount;
    },
    getWindowHeight: function () {
      return e.windowHeight;
    },
    getWindowWidth: function () {
      return e.windowWidth;
    }
  };
};
exports.getCellIndices = function (e) {
  var t = e.closest(`.${s.DATE_TABLE_ROW_CLASS}, .${s.ALL_DAY_ROW_CLASS}`);
  var n = t.parentNode;
  var i = e.parentNode;
  return {
    columnIndex: l(Array.from(i.children)).filter(function (e) {
      return e.className.includes(s.DATE_TABLE_CELL_CLASS) || e.className.includes(s.ALL_DAY_PANEL_CELL_CLASS);
    }).indexOf(e),
    rowIndex: l(Array.from(n.children)).filter(function (e) {
      return e.className.includes(s.DATE_TABLE_ROW_CLASS);
    }).indexOf(t)
  };
};
function f(e) {
  var t = e.date;
  var n = e.firstDate;
  var i = e.firstIndex;
  var o = e.index;
  var a = e.lastDate;
  var r = e.lastIndex;
  if (n === a) {
    var s = i;
    var l = r;
    if (s > l) {
      var u = [l, s];
      s = u[0];
      l = u[1];
    }
    return n === t && o >= s && o <= l;
  }
  return t === n && o >= i || t === a && o <= r || n < t && t < a;
}
exports.compareCellsByDateAndIndex = f;
exports.getSelectedCells = function (e, t, n, i) {
  var a = t;
  var r = n;
  if (a.startDate.getTime() > r.startDate.getTime()) {
    var s = [r, a];
    a = s[0];
    r = s[1];
  }
  var u = a;
  var d = u.groupIndex;
  var c = u.index;
  var h = u.startDate;
  var p = r;
  var g = p.index;
  var m = p.startDate;
  return e.getCellsByGroupIndexAndAllDay(d ?? 0, i).reduce(function (e, t) {
    var n = function (e, t) {
      var n = t.firstDate;
      var i = t.firstIndex;
      var a = t.lastDate;
      var r = t.lastIndex;
      var s = o.default.trimTime(n).getTime();
      var l = o.default.trimTime(a).getTime();
      return e.filter(function (e) {
        var t = e.index;
        var n = e.startDate;
        var a = o.default.trimTime(n).getTime();
        return f({
          date: a,
          index: t,
          firstDate: s,
          firstIndex: i,
          lastDate: l,
          lastIndex: r
        });
      });
    }(t, {
      firstDate: h,
      lastDate: m,
      firstIndex: c,
      lastIndex: g
    });
    e.push.apply(e, l(n));
    return e;
  }, []).sort(function (e, t) {
    return e.startDate.getTime() - t.startDate.getTime();
  });
};
exports.isCellAllDay = function (e) {
  return e.className.includes(s.ALL_DAY_PANEL_CELL_CLASS);
};