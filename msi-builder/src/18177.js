exports.ViewDataGenerator = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./27728.js");
var r = require("./98140.js");
var s = require("./45985.js");
var l = require("./97205.js");
function u(e) {
  return (u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function d() {
  return (d = Object.assign ? Object.assign.bind() : function (e) {
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
function c(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return h(e);
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
      return h(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return h(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function h(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function f(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (u(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (u(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), u(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var p = o.default.dateToMilliseconds("hour");
var g = o.default.dateToMilliseconds("day");
var m = function () {
  function e() {}
  var t;
  var n;
  var i;
  var u = e.prototype;
  u.isSkippedDate = function () {
    return false;
  };
  u.getStartViewDate = function (e) {
    return this._calculateStartViewDate(e);
  };
  u.getCompleteViewDataMap = function (e) {
    var t;
    var n = e.groups;
    var i = e.isGroupedByDate;
    var o = e.isHorizontalGrouping;
    var a = e.isVerticalGrouping;
    var s = e.intervalCount;
    var l = e.currentDate;
    var u = e.viewType;
    var d = e.startDayHour;
    var h = e.endDayHour;
    var f = e.hoursInterval;
    this._setVisibilityDates(e);
    this.setHiddenInterval(d, h, f);
    var p = (0, r.getAllGroups)(n);
    var g = this.getCellCount({
      intervalCount: s,
      currentDate: l,
      viewType: u,
      startDayHour: d,
      endDayHour: h,
      hoursInterval: f
    });
    var m = this.getRowCount({
      intervalCount: s,
      currentDate: l,
      viewType: u,
      hoursInterval: f,
      startDayHour: d,
      endDayHour: h
    });
    var _ = [];
    var v = this._generateAllDayPanelData(e, m, g);
    var y = this._generateViewCellsData(e, m, g);
    if (v) {
      _.push(v);
    }
    (t = _).push.apply(t, c(y));
    if (o && !i) {
      _ = this._transformViewDataMapForHorizontalGrouping(_, p);
    }
    if (a) {
      _ = this._transformViewDataMapForVerticalGrouping(_, p);
    }
    if (i) {
      _ = this._transformViewDataMapForGroupingByDate(_, p);
    }
    return this._addKeysToCells(_);
  };
  u._transformViewDataMapForHorizontalGrouping = function (e, t) {
    var n = e.map(function (e) {
      return e.slice();
    });
    t.slice(1).forEach(function (t, i) {
      var o = i + 1;
      e.forEach(function (e, i) {
        var a;
        var r = e.map(function (e) {
          return d({}, e, {
            groups: t,
            groupIndex: o
          });
        });
        (a = n[i]).push.apply(a, c(r));
      });
    });
    return n;
  };
  u._transformViewDataMapForVerticalGrouping = function (e, t) {
    var n = e.map(function (e) {
      return e.slice();
    });
    t.slice(1).forEach(function (t, i) {
      var o = i + 1;
      var a = e.map(function (e) {
        return e.map(function (e) {
          return d({}, e, {
            groupIndex: o,
            groups: t
          });
        });
      });
      n.push.apply(n, c(a));
    });
    return n;
  };
  u._transformViewDataMapForGroupingByDate = function (e, t) {
    var n = t.slice(1);
    var i = n.length;
    return e.map(function (e) {
      return e.reduce(function (e, t) {
        return [].concat(c(e), [d({}, t, {
          isFirstGroupCell: true,
          isLastGroupCell: i === 0
        })], c(n.map(function (e, n) {
          return d({}, t, {
            groups: e,
            groupIndex: n + 1,
            isFirstGroupCell: false,
            isLastGroupCell: n === i - 1
          });
        })));
      }, []);
    });
  };
  u._addKeysToCells = function (e) {
    var t = e[0].length;
    return e.reduce(function (e, n, i) {
      var o = e.allDayPanelsCount;
      var a = e.currentViewDataMap;
      var r = n[0].allDay;
      var s = (i - o) * t;
      var l = r ? o + 1 : o;
      a[i].forEach(function (e, t) {
        e.key = s + t;
      });
      return {
        allDayPanelsCount: l,
        currentViewDataMap: a
      };
    }, {
      allDayPanelsCount: 0,
      currentViewDataMap: e
    }).currentViewDataMap;
  };
  u.generateViewDataMap = function (e, t) {
    var n = t.rowCount;
    var i = t.startCellIndex;
    var o = t.startRowIndex;
    var a = t.cellCount;
    var r = t.isVerticalGrouping;
    var l = t.isAllDayPanelVisible;
    function u(e, t, n, i) {
      var o = i !== undefined ? n + i : undefined;
      return e.slice(n, o).map(function (e, n) {
        return {
          cellData: e,
          position: {
            rowIndex: t,
            columnIndex: n
          }
        };
      });
    }
    var d = o;
    var c = [];
    if (this._isStandaloneAllDayPanel(r, l)) {
      d++;
      c = u(e[0], 0, i, a);
    }
    var h = (0, s.getDisplayedRowCount)(n, e);
    return {
      allDayPanelMap: c,
      dateTableMap: e.slice(d, d + h).map(function (e, t) {
        return u(e, t, i, a);
      })
    };
  };
  u._isStandaloneAllDayPanel = function (e, t) {
    return !e && t;
  };
  u.getViewDataFromMap = function (e, t, n) {
    var i = n.topVirtualRowHeight;
    var o = n.bottomVirtualRowHeight;
    var a = n.leftVirtualCellWidth;
    var r = n.rightVirtualCellWidth;
    var u = n.cellCount;
    var d = n.rowCount;
    var c = n.startRowIndex;
    var h = n.startCellIndex;
    var f = n.isProvideVirtualCellsWidth;
    var p = n.isGroupedAllDayPanel;
    var g = n.isVerticalGrouping;
    var m = n.isAllDayPanelVisible;
    var _ = t.allDayPanelMap;
    var v = t.dateTableMap.reduce(function (e, t) {
      var n = e.previousGroupIndex;
      var i = e.groupedData;
      var o = t.map(function (e) {
        return e.cellData;
      });
      var a = o[0];
      var r = a.allDay;
      var s = a.groupIndex;
      if (s !== n) {
        i.push({
          dateTable: [],
          isGroupedAllDayPanel: (0, l.getIsGroupedAllDayPanel)(!!r, g),
          groupIndex: s,
          key: (0, l.getKeyByGroup)(s, g)
        });
      }
      if (r) {
        i[i.length - 1].allDayPanel = o;
      } else {
        i[i.length - 1].dateTable.push({
          cells: o,
          key: o[0].key - h
        });
      }
      return {
        groupedData: i,
        previousGroupIndex: s
      };
    }, {
      previousGroupIndex: -1,
      groupedData: []
    }).groupedData;
    if (this._isStandaloneAllDayPanel(g, m)) {
      v[0].allDayPanel = _.map(function (e) {
        return e.cellData;
      });
    }
    var y = (0, s.getTotalCellCountByCompleteData)(e);
    var b = (0, s.getTotalRowCountByCompleteData)(e);
    var x = (0, s.getDisplayedCellCount)(u, e);
    var w = (0, s.getDisplayedRowCount)(d, e);
    return {
      groupedData: v,
      topVirtualRowHeight: i,
      bottomVirtualRowHeight: o,
      leftVirtualCellWidth: f ? a : undefined,
      rightVirtualCellWidth: f ? r : undefined,
      isGroupedAllDayPanel: p,
      leftVirtualCellCount: h,
      rightVirtualCellCount: u === undefined ? 0 : y - h - x,
      topVirtualRowCount: c,
      bottomVirtualRowCount: b - c - w
    };
  };
  u._generateViewCellsData = function (e, t, n) {
    var i = [];
    for (var o = 0; o < t; o += 1) {
      i.push(this._generateCellsRow(e, false, o, t, n));
    }
    return i;
  };
  u._generateAllDayPanelData = function (e, t, n) {
    if (e.isAllDayPanelVisible) {
      return this._generateCellsRow(e, true, 0, t, n);
    } else {
      return null;
    }
  };
  u._generateCellsRow = function (e, t, n, i, o) {
    var a = [];
    for (var r = 0; r < o; ++r) {
      var s = this.getCellData(n, r, e, t);
      s.index = n * o + r;
      s.isFirstGroupCell = this._isFirstGroupCell(n, r, e, i, o);
      s.isLastGroupCell = this._isLastGroupCell(n, r, e, i, o);
      a.push(s);
    }
    return a;
  };
  u.getCellData = function (e, t, n, i) {
    if (i) {
      return this.prepareAllDayCellData(n, e, t);
    } else {
      return this.prepareCellData(n, e, t);
    }
  };
  u.prepareCellData = function (e, t, n) {
    var i = e.groups;
    var o = e.startDayHour;
    var a = e.endDayHour;
    var s = e.interval;
    var l = e.hoursInterval;
    var u = (0, r.getAllGroups)(i);
    var d = this.getDateByCellIndices(e, t, n, this.getCellCountInDay(o, a, l));
    var c = {
      startDate: d,
      endDate: this.calculateEndDate(d, s, a),
      allDay: this.tableAllDay,
      groupIndex: 0
    };
    if (u.length > 0) {
      c.groups = u[0];
    }
    return c;
  };
  u.prepareAllDayCellData = function (e, t, n) {
    var i = this.prepareCellData(e, t, n);
    var a = o.default.trimTime(i.startDate);
    return d({}, i, {
      startDate: a,
      endDate: a,
      allDay: true
    });
  };
  u.getDateByCellIndices = function (e, t, n, i) {
    var a = e.startViewDate;
    var r = e.startDayHour;
    var l = e.interval;
    var u = e.firstDayOfWeek;
    var d = e.intervalCount;
    var c = a.getHours() !== Math.floor(r);
    if (c) {
      var h = (0, s.getStartViewDateWithoutDST)(a, r);
      a = new Date(h - o.default.dateToMilliseconds("day"));
    }
    var f = this.getCellCount(e);
    var p = this.getRowCount(e);
    var g = this._calculateCellIndex(t, n, p, f);
    var m = this.getMillisecondsOffset(g, l, i);
    var _ = this.isWorkView ? this.getTimeOffsetByColumnIndex(n, this.getFirstDayOfWeek(u), f, d) : 0;
    var v = a.getTime();
    var y = new Date(v + m + _);
    var b = c ? 0 : o.default.getTimezonesDifference(a, y);
    y.setTime(y.getTime() + b);
    return y;
  };
  u.getMillisecondsOffset = function (e, t, n) {
    return t * e + Math.floor(e / n) * this.hiddenInterval;
  };
  u.getTimeOffsetByColumnIndex = function (e, t, n, i) {
    var o = Math.max(0, t - 1);
    var a = n / i;
    var r = Math.floor((e + o) / a);
    return g * r * 2;
  };
  u.calculateEndDate = function (e, t, n) {
    var i = new Date(e);
    i.setMilliseconds(i.getMilliseconds() + Math.round(t));
    return i;
  };
  u._calculateCellIndex = function (e, t, n, i) {
    return (0, s.calculateCellIndex)(e, t, n);
  };
  u.generateGroupedDataMap = function (e) {
    var t = e.allDayPanelMap;
    var n = e.dateTableMap.reduce(function (e, t) {
      var n = e.previousGroupedDataMap;
      var i = e.previousRowIndex;
      var o = e.previousGroupIndex;
      var a = t[0].cellData.groupIndex;
      var r = a === o ? i + 1 : 0;
      t.forEach(function (e) {
        var t = e.cellData.groupIndex;
        n[t] ||= [];
        n[t][r] ||= [];
        n[t][r].push(e);
      });
      return {
        previousGroupedDataMap: n,
        previousRowIndex: r,
        previousGroupIndex: a
      };
    }, {
      previousGroupedDataMap: [],
      previousRowIndex: -1,
      previousGroupIndex: -1
    }).previousGroupedDataMap;
    var i = [];
    if (t != null) {
      t.forEach(function (e) {
        var t = e.cellData.groupIndex;
        i[t] ||= [];
        i[t].push(e);
      });
    }
    return {
      allDayPanelGroupedMap: i,
      dateTableGroupedMap: n
    };
  };
  u._isFirstGroupCell = function (e, t, n, i, o) {
    var s = n.groupOrientation;
    var l = n.groups;
    var u = n.isGroupedByDate;
    var d = (0, r.getGroupCount)(l);
    if (u) {
      return t % d == 0;
    } else if (s === a.HORIZONTAL_GROUP_ORIENTATION) {
      return t % o == 0;
    } else {
      return e % i == 0;
    }
  };
  u._isLastGroupCell = function (e, t, n, i, o) {
    var s = n.groupOrientation;
    var l = n.groups;
    var u = n.isGroupedByDate;
    var d = (0, r.getGroupCount)(l);
    if (u) {
      return (t + 1) % d == 0;
    } else if (s === a.HORIZONTAL_GROUP_ORIENTATION) {
      return (t + 1) % o == 0;
    } else {
      return (e + 1) % i == 0;
    }
  };
  u.markSelectedAndFocusedCells = function (e, t) {
    var n = this;
    var i = t.selectedCells;
    var o = t.focusedCell;
    if (!i && !o) {
      return e;
    }
    var a = e.allDayPanelMap;
    var r = e.dateTableMap.map(function (e) {
      return n._markSelectedAndFocusedCellsInRow(e, i, o);
    });
    return {
      allDayPanelMap: this._markSelectedAndFocusedCellsInRow(a, i, o),
      dateTableMap: r
    };
  };
  u._markSelectedAndFocusedCellsInRow = function (e, t, n) {
    return e.map(function (e) {
      var i = e.cellData;
      var o = i.index;
      var a = i.groupIndex;
      var r = i.allDay;
      var s = i.startDate;
      var l = t.findIndex(function (e) {
        var t = e.index;
        var n = e.groupIndex;
        var i = e.allDay;
        var l = e.startDate;
        return a === n && (o === t || t === undefined && s.getTime() === l.getTime()) && !!r == !!i;
      });
      var u = !!n && o === n.cellData.index && a === n.cellData.groupIndex && r === n.cellData.allDay;
      if (u || l !== -1) {
        return d({}, e, {
          cellData: d({}, e.cellData, {
            isSelected: l > -1,
            isFocused: u
          })
        });
      } else {
        return e;
      }
    });
  };
  u.getInterval = function (e) {
    return e * p;
  };
  u._getIntervalDuration = function (e) {
    return o.default.dateToMilliseconds("day") * e;
  };
  u._setVisibilityDates = function () {};
  u.getCellCountInDay = function (e, t, n) {
    var i = (0, s.calculateDayDuration)(e, t) / n;
    return Math.ceil(i);
  };
  u.getCellCount = function (e) {
    var t = e.intervalCount;
    var n = e.viewType;
    var i = e.startDayHour;
    var o = e.endDayHour;
    var a = e.hoursInterval;
    var r = this.getCellCountInDay(i, o, a);
    var l = (0, s.isHorizontalView)(n) ? r : 1;
    return this.daysInInterval * t * l;
  };
  u.getRowCount = function (e) {
    var t = e.viewType;
    var n = e.startDayHour;
    var i = e.endDayHour;
    var o = e.hoursInterval;
    var a = this.getCellCountInDay(n, i, o);
    if ((0, s.isHorizontalView)(t)) {
      return 1;
    } else {
      return a;
    }
  };
  u.setHiddenInterval = function (e, t, n) {
    this.hiddenInterval = g - this.getVisibleDayDuration(e, t, n);
  };
  u.getVisibleDayDuration = function (e, t, n) {
    return n * this.getCellCountInDay(e, t, n) * p;
  };
  u.getFirstDayOfWeek = function (e) {
    return e;
  };
  t = e;
  if (n = [{
    key: "daysInInterval",
    get: function () {
      return 1;
    }
  }, {
    key: "isWorkView",
    get: function () {
      return false;
    }
  }, {
    key: "tableAllDay",
    get: function () {
      return false;
    }
  }]) {
    f(t.prototype, n);
  }
  if (i) {
    f(t, i);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.ViewDataGenerator = m;