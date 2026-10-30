exports.default = undefined;
var i = f(require("./91198.js"));
var o = require("./34854.js");
var a = require("./97205.js");
var r = require("./45985.js");
var s = require("./31986.js");
var l = require("./9427.js");
var u = require("./16925.js");
var d = require("./28673.js");
var c = f(require("./32511.js"));
var h = ["groups", "groupOrientation", "groupByDate", "isAllDayPanelVisible"];
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  return (p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
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
function m(e, t) {
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
function _(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (p(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (p(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), p(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var v = function () {
  function e(e) {
    this.viewDataGenerator = (0, d.getViewDataGeneratorByViewType)(e);
    this.viewData = {};
    this.completeViewDataMap = [];
    this.completeDateHeaderMap = [];
    this.viewDataMap = {};
    this._groupedDataMapProvider = null;
  }
  var t;
  var n;
  var f;
  var p = e.prototype;
  p.isSkippedDate = function (e) {
    return this.viewDataGenerator.isSkippedDate(e);
  };
  p.update = function (e, t) {
    this.viewDataGenerator = (0, d.getViewDataGeneratorByViewType)(e.viewType);
    var n = this.viewDataGenerator;
    var i = new s.DateHeaderDataGenerator(n);
    var o = new u.TimePanelDataGenerator(n);
    var a = this._transformRenderOptions(e);
    a.interval = this.viewDataGenerator.getInterval(a.hoursInterval);
    this._options = a;
    if (t) {
      this.completeViewDataMap = n.getCompleteViewDataMap(a);
      this.completeDateHeaderMap = i.getCompleteDateHeaderMap(a, this.completeViewDataMap);
      if (a.isGenerateTimePanelData) {
        this.completeTimePanelMap = o.getCompleteTimePanelMap(a, this.completeViewDataMap);
      }
    }
    this.viewDataMap = n.generateViewDataMap(this.completeViewDataMap, a);
    this.updateViewData(a);
    this._groupedDataMapProvider = new l.GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
      isVerticalGrouping: a.isVerticalGrouping,
      viewType: a.viewType
    });
    this.dateHeaderData = i.generateDateHeaderData(this.completeDateHeaderMap, this.completeViewDataMap, a);
    if (a.isGenerateTimePanelData) {
      this.timePanelData = o.generateTimePanelData(this.completeTimePanelMap, a);
    }
  };
  p.createGroupedDataMapProvider = function () {
    this._groupedDataMapProvider = new l.GroupedDataMapProvider(this.viewDataGenerator, this.viewDataMap, this.completeViewDataMap, {
      isVerticalGrouping: this._options.isVerticalGrouping,
      viewType: this._options.viewType
    });
  };
  p.updateViewData = function (e) {
    var t = this._transformRenderOptions(e);
    this.viewDataMapWithSelection = this.viewDataGenerator.markSelectedAndFocusedCells(this.viewDataMap, t);
    this.viewData = this.viewDataGenerator.getViewDataFromMap(this.completeViewDataMap, this.viewDataMapWithSelection, t);
  };
  p._transformRenderOptions = function (e) {
    var t = e.groups;
    var n = e.groupOrientation;
    var i = e.groupByDate;
    var o = e.isAllDayPanelVisible;
    return g({}, m(e, h), {
      startViewDate: this.viewDataGenerator._calculateStartViewDate(e),
      isVerticalGrouping: (0, a.isVerticalGroupingApplied)(t, n),
      isHorizontalGrouping: (0, a.isHorizontalGroupingApplied)(t, n),
      isGroupedByDate: (0, a.isGroupingByDate)(t, n, i),
      isGroupedAllDayPanel: (0, r.calculateIsGroupedAllDayPanel)(t, n, o),
      groups: t,
      groupOrientation: n,
      isAllDayPanelVisible: o
    });
  };
  p.getGroupPanelData = function (e) {
    var t = this._transformRenderOptions(e);
    if (t.groups.length > 0) {
      var n = this.getCellCount(t);
      return (0, o.getGroupPanelData)(t.groups, n, t.isGroupedByDate, t.isGroupedByDate ? 1 : n);
    }
  };
  p.getGroupStartDate = function (e) {
    return this._groupedDataMapProvider.getGroupStartDate(e);
  };
  p.getGroupEndDate = function (e) {
    return this._groupedDataMapProvider.getGroupEndDate(e);
  };
  p.findGroupCellStartDate = function (e, t, n, i = false) {
    return this._groupedDataMapProvider.findGroupCellStartDate(e, t, n, i);
  };
  p.findAllDayGroupCellStartDate = function (e, t) {
    return this._groupedDataMapProvider.findAllDayGroupCellStartDate(e, t);
  };
  p.findCellPositionInMap = function (e) {
    return this._groupedDataMapProvider.findCellPositionInMap(e);
  };
  p.hasAllDayPanel = function () {
    var e = this.viewDataMap.viewData;
    var t = e.groupedData[0].allDayPanel;
    return !e.isGroupedAllDayPanel && (t == null ? undefined : t.length) > 0;
  };
  p.getCellsGroup = function (e) {
    return this._groupedDataMapProvider.getCellsGroup(e);
  };
  p.getCompletedGroupsInfo = function () {
    return this._groupedDataMapProvider.getCompletedGroupsInfo();
  };
  p.getGroupIndices = function () {
    return this._groupedDataMapProvider.getGroupIndices();
  };
  p.getLastGroupCellPosition = function (e) {
    return this._groupedDataMapProvider.getLastGroupCellPosition(e);
  };
  p.getRowCountInGroup = function (e) {
    return this._groupedDataMapProvider.getRowCountInGroup(e);
  };
  p.getCellData = function (e, t, n, i) {
    var o = n && !this._options.isVerticalGrouping ? this.viewDataMap.allDayPanelMap : this.viewDataMap.dateTableMap[e];
    return o[i ? o.length - 1 - t : t].cellData;
  };
  p.getCellsByGroupIndexAndAllDay = function (e, t) {
    var n = this._getRowCountWithAllDayRows();
    var i = this._options.isAllDayPanelVisible;
    var o = this._options.isVerticalGrouping ? e * n : 0;
    var a = this._options.isVerticalGrouping ? (e + 1) * n - 1 : n;
    var r = i && !t ? o + 1 : o;
    var s = t ? r : a;
    return this.completeViewDataMap.slice(r, s + 1).map(function (t) {
      return t.filter(function (t) {
        var n = t.groupIndex;
        return e === n;
      });
    });
  };
  p.getCellCountWithGroup = function (e, t = 0) {
    var n = this.groupedDataMap.dateTableGroupedMap;
    return n.filter(function (t, n) {
      return n <= e;
    }).reduce(function (e, n) {
      return e + n[t].length;
    }, 0);
  };
  p.hasGroupAllDayPanel = function (e) {
    var n;
    if (this._options.isVerticalGrouping) {
      return (n = this.groupedDataMap.dateTableGroupedMap[e]) !== null && n !== undefined && !!n[0][0].cellData.allDay;
    } else {
      return this.groupedDataMap.allDayPanelGroupedMap[e]?.length > 0;
    }
  };
  p.isGroupIntersectDateInterval = function (e, t, n) {
    var i = this.getGroupStartDate(e);
    return t < this.getGroupEndDate(e) && n > i;
  };
  p.findGlobalCellPosition = function (e, t = 0, n = false) {
    for (var i = this.completeViewDataMap, o = this._options.isAllDayPanelVisible, a = 0; a < i.length; a += 1) {
      for (var r = i[a], s = 0; s < r.length; s += 1) {
        var l = r[s];
        var u = l.startDate;
        var d = l.endDate;
        var c = l.groupIndex;
        var h = l.allDay;
        if (t === c && n === !!h && this._compareDatesAndAllDay(e, u, d, n)) {
          return {
            position: {
              columnIndex: s,
              rowIndex: o && !this._options.isVerticalGrouping ? a - 1 : a
            },
            cellData: l
          };
        }
      }
    }
  };
  p._compareDatesAndAllDay = function (e, t, n, o) {
    var a = e.getTime();
    var r = i.default.trimTime(e).getTime();
    var s = t.getTime();
    var l = n.getTime();
    return !o && a >= s && a < l || o && r === s;
  };
  p.getSkippedDaysCount = function (e, t, n, o) {
    for (var a = this._groupedDataMapProvider.groupedDataMap.dateTableGroupedMap[e], r = 0, s = 0; s < a.length; s += 1) {
      for (var l = 0; l < a[s].length; l += 1) {
        var u = a[s][l].cellData;
        if (t.getTime() < u.endDate.getTime() && n.getTime() > u.startDate.getTime()) {
          r += 1;
        }
      }
    }
    var d = a[a.length - 1][a[0].length - 1].cellData;
    var c = i.default.trimTime(d.startDate);
    var h = Math.floor((n.getTime() - c.getTime()) / i.default.dateToMilliseconds("day"));
    return o - r - (h > 0 ? h : 0);
  };
  p.getColumnsCount = function () {
    var e = this.viewDataMap.dateTableMap;
    if (e) {
      return e[0].length;
    } else {
      return 0;
    }
  };
  p.getViewEdgeIndices = function (e) {
    if (e) {
      return {
        firstColumnIndex: 0,
        lastColumnIndex: this.viewDataMap.allDayPanelMap.length - 1,
        firstRowIndex: 0,
        lastRowIndex: 0
      };
    } else {
      return {
        firstColumnIndex: 0,
        lastColumnIndex: this.viewDataMap.dateTableMap[0].length - 1,
        firstRowIndex: 0,
        lastRowIndex: this.viewDataMap.dateTableMap.length - 1
      };
    }
  };
  p.getGroupEdgeIndices = function (e, t) {
    var n = this.groupedDataMap.dateTableGroupedMap[e];
    var i = n[0].length;
    var o = n.length;
    var a = n[0][0].position.columnIndex;
    var r = n[0][i - 1].position.columnIndex;
    if (t) {
      return {
        firstColumnIndex: a,
        lastColumnIndex: r,
        firstRowIndex: 0,
        lastRowIndex: 0
      };
    } else {
      return {
        firstColumnIndex: a,
        lastColumnIndex: r,
        firstRowIndex: n[0][0].position.rowIndex,
        lastRowIndex: n[o - 1][0].position.rowIndex
      };
    }
  };
  p.isSameCell = function (e, t) {
    var n = e.startDate;
    var i = e.groupIndex;
    var o = e.allDay;
    var a = e.index;
    var r = t.startDate;
    var s = t.groupIndex;
    var l = t.allDay;
    var u = t.index;
    return n.getTime() === r.getTime() && i === s && o === l && a === u;
  };
  p.getLastViewDate = function () {
    var e = this.completeViewDataMap;
    var t = e.length - 1;
    return e[t][e[t].length - 1].endDate;
  };
  p.getStartViewDate = function () {
    return this._options.startViewDate;
  };
  p.getIntervalDuration = function (e) {
    return this.viewDataGenerator._getIntervalDuration(e);
  };
  p.getLastCellEndDate = function () {
    return new Date(this.getLastViewDate().getTime() - i.default.dateToMilliseconds("minute"));
  };
  p.getLastViewDateByEndDayHour = function (e) {
    var t = this.getLastCellEndDate();
    var n = i.default.dateTimeFromDecimal(e);
    var o = new Date(t.setHours(n.hours, n.minutes));
    return this._adjustEndDateByDaylightDiff(t, o);
  };
  p._adjustEndDateByDaylightDiff = function (e, t) {
    var n = c.default.getDaylightOffsetInMs(e, t);
    var o = new Date(t.getTime() - n);
    return new Date(o.getTime() - i.default.dateToMilliseconds("minute"));
  };
  p.getCellCountInDay = function (e, t, n) {
    return this.viewDataGenerator.getCellCountInDay(e, t, n);
  };
  p.getCellCount = function (e) {
    return this.viewDataGenerator.getCellCount(e);
  };
  p.getRowCount = function (e) {
    return this.viewDataGenerator.getRowCount(e);
  };
  p.getVisibleDayDuration = function (e, t, n) {
    return this.viewDataGenerator.getVisibleDayDuration(e, t, n);
  };
  p._getRowCountWithAllDayRows = function () {
    var e = this._options.isAllDayPanelVisible ? 1 : 0;
    return this.getRowCount(this._options) + e;
  };
  p.getFirstDayOfWeek = function (e) {
    return this.viewDataGenerator.getFirstDayOfWeek(e);
  };
  p.setViewOptions = function (e) {
    this._options = this._transformRenderOptions(e);
  };
  p.getViewOptions = function () {
    return this._options;
  };
  p.getViewPortGroupCount = function () {
    var e = this.groupedDataMap.dateTableGroupedMap;
    return (e == null ? undefined : e.length) || 0;
  };
  t = e;
  if (n = [{
    key: "groupedDataMap",
    get: function () {
      return this._groupedDataMapProvider.groupedDataMap;
    }
  }, {
    key: "hiddenInterval",
    get: function () {
      return this.viewDataGenerator.hiddenInterval;
    }
  }]) {
    _(t.prototype, n);
  }
  if (f) {
    _(t, f);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;