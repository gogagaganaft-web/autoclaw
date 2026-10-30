exports.DateHeaderDataGenerator = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./98140.js");
var r = require("./45985.js");
var s = ["startDate", "endDate", "isFirstGroupCell", "isLastGroupCell"];
function l(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
function u() {
  return (u = Object.assign ? Object.assign.bind() : function (e) {
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
var d = function () {
  function e(e) {
    this._viewDataGenerator = e;
  }
  var t = e.prototype;
  t.getCompleteDateHeaderMap = function (e, t) {
    var n = [];
    if (e.isGenerateWeekDaysHeaderData) {
      var i = this._generateWeekDaysHeaderRowMap(e, t);
      n.push(i);
    }
    var o = this._generateHeaderDateRow(e, t);
    n.push(o);
    return n;
  };
  t._generateWeekDaysHeaderRowMap = function (e, t) {
    var n = e.isGroupedByDate;
    var i = e.groups;
    var o = e.groupOrientation;
    var s = e.startDayHour;
    var l = e.endDayHour;
    var d = e.hoursInterval;
    var c = e.isHorizontalGrouping;
    var h = e.intervalCount;
    var f = this._viewDataGenerator.getCellCountInDay(s, l, d);
    var p = (0, r.getHorizontalGroupCount)(i, o);
    var g = t[0][0].allDay ? 1 : 0;
    var m = n ? p * f : f;
    var _ = (0, a.getGroupCount)(i);
    var v = c && !n ? _ : 1;
    for (var y = this._viewDataGenerator.daysInInterval * h * v, b = [], x = 0; x < y; x += 1) {
      var w = t[g][x * m];
      b.push(u({}, w, {
        colSpan: m,
        text: (0, r.formatWeekdayAndDay)(w.startDate),
        isFirstGroupCell: false,
        isLastGroupCell: false
      }));
    }
    return b;
  };
  t._generateHeaderDateRow = function (e, t) {
    var n = e.today;
    var i = e.isGroupedByDate;
    var a = e.groupOrientation;
    var d = e.groups;
    var c = e.headerCellTextFormat;
    var h = e.getDateForHeaderText;
    var f = e.interval;
    var p = e.startViewDate;
    var g = e.startDayHour;
    var m = e.endDayHour;
    var _ = e.hoursInterval;
    var v = e.intervalCount;
    var y = e.currentDate;
    var b = e.viewType;
    var x = (0, r.getHorizontalGroupCount)(d, a);
    var w = t[0][0].allDay ? 1 : 0;
    var C = i ? x : 1;
    var S = a === "vertical";
    var k = this._viewDataGenerator.getCellCount({
      intervalCount: v,
      currentDate: y,
      viewType: b,
      hoursInterval: _,
      startDayHour: g,
      endDayHour: m
    });
    var D = this._viewDataGenerator.getCellCountInDay(g, m, _);
    return (i ? t[w].filter(function (e, t) {
      return t % x == 0;
    }) : t[w]).map(function (e, t) {
      var a = e.startDate;
      e.endDate;
      var d = e.isFirstGroupCell;
      var m = e.isLastGroupCell;
      return u({}, l(e, s), {
        startDate: a,
        text: (0, r.getHeaderCellText)(t % k, a, c, h, {
          interval: f,
          startViewDate: p,
          startDayHour: g,
          cellCountInDay: D
        }),
        today: o.default.sameDate(a, n),
        colSpan: C,
        isFirstGroupCell: i || d && !S,
        isLastGroupCell: i || m && !S
      });
    });
  };
  t.generateDateHeaderData = function (e, t, n) {
    var i = n.isGenerateWeekDaysHeaderData;
    var o = n.cellWidth;
    var a = n.isProvideVirtualCellsWidth;
    var r = n.startDayHour;
    var s = n.endDayHour;
    var l = n.hoursInterval;
    var u = n.isMonthDateHeader;
    var d = [];
    var c = {};
    var h = o || 0;
    if (i) {
      c = this._generateDateHeaderDataRow(n, e, t, this._viewDataGenerator.getCellCountInDay(r, s, l), 0, h);
      d.push(c.dateRow);
    }
    var f = this._generateDateHeaderDataRow(n, e, t, 1, i ? 1 : 0, h);
    d.push(f.dateRow);
    return {
      dataMap: d,
      leftVirtualCellWidth: a ? f.leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: a ? f.rightVirtualCellWidth : undefined,
      leftVirtualCellCount: f.leftVirtualCellCount,
      rightVirtualCellCount: f.rightVirtualCellCount,
      weekDayLeftVirtualCellWidth: c.leftVirtualCellWidth,
      weekDayRightVirtualCellWidth: c.rightVirtualCellWidth,
      weekDayLeftVirtualCellCount: c.leftVirtualCellCount,
      weekDayRightVirtualCellCount: c.rightVirtualCellCount,
      isMonthDateHeader: u
    };
  };
  t._generateDateHeaderDataRow = function (e, t, n, i, o, a) {
    var s = e.startCellIndex;
    var l = e.cellCount;
    var u = e.isProvideVirtualCellsWidth;
    var d = e.groups;
    var c = e.groupOrientation;
    var h = e.isGroupedByDate;
    var f = (0, r.getHorizontalGroupCount)(d, c);
    var p = h ? f * i : i;
    var g = Math.floor(s / p);
    var m = (0, r.getDisplayedCellCount)(l, n);
    var _ = Math.ceil((s + m) / p);
    var v = g * p;
    var y = (0, r.getTotalCellCountByCompleteData)(n) - _ * p;
    return {
      dateRow: t[o].slice(g, _),
      leftVirtualCellCount: v,
      leftVirtualCellWidth: u ? v * a : undefined,
      rightVirtualCellCount: y,
      rightVirtualCellWidth: u ? y * a : undefined
    };
  };
  return e;
}();
exports.DateHeaderDataGenerator = d;