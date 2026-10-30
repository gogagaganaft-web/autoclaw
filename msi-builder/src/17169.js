exports.getAppointmentsModel = exports.getAppointmentsConfig = exports.getAppointmentRenderingStrategyName = undefined;
var i;
var o = require("./69576.js");
var a = require("./98140.js");
var r = require("./97205.js");
var s = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var l = require("./45985.js");
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
function d(e) {
  return {
    day: {
      renderingStrategy: "vertical"
    },
    week: {
      renderingStrategy: "week"
    },
    workWeek: {
      renderingStrategy: "week"
    },
    month: {
      renderingStrategy: "horizontalMonth"
    },
    timelineDay: {
      renderingStrategy: "horizontal"
    },
    timelineWeek: {
      renderingStrategy: "horizontal"
    },
    timelineWorkWeek: {
      renderingStrategy: "horizontal"
    },
    timelineMonth: {
      renderingStrategy: "horizontalMonthLine"
    },
    agenda: {
      renderingStrategy: "agenda"
    }
  }[e].renderingStrategy;
}
exports.getAppointmentRenderingStrategyName = d;
exports.getAppointmentsConfig = function (e, t, n, i, o) {
  var r = (0, a.getGroupCount)(n);
  var s = i.getStartViewDate();
  var l = [s, i.getLastViewDateByEndDayHour(t.endDayHour)];
  return {
    adaptivityEnabled: e.adaptivityEnabled,
    rtlEnabled: e.rtlEnabled,
    resources: e.resources,
    timeZone: e.timeZone,
    groups: e.groups,
    startDayHour: t.startDayHour,
    viewStartDayHour: t.startDayHour,
    endDayHour: t.endDayHour,
    viewEndDayHour: t.endDayHour,
    currentDate: t.currentDate,
    isVirtualScrolling: t.scrolling.mode === "virtual",
    intervalCount: t.intervalCount,
    hoursInterval: t.hoursInterval,
    showAllDayPanel: t.showAllDayPanel,
    allDayPanelMode: t.allDayPanelMode,
    supportAllDayRow: o,
    groupOrientation: i.getViewOptions().groupOrientation,
    firstDayOfWeek: t.firstDayOfWeek,
    viewType: t.type,
    cellDurationInMinutes: t.cellDuration,
    maxAppointmentsPerCell: t.maxAppointmentsPerCell,
    isVerticalGroupOrientation: i.getViewOptions().isVerticalGrouping,
    groupByDate: i.getViewOptions().isGroupedByDate,
    startViewDate: s,
    loadedResources: n,
    appointmentCountPerCell: 2,
    appointmentOffset: 26,
    allowResizing: false,
    allowAllDayResizing: false,
    dateTableOffset: 0,
    groupCount: r,
    dateRange: l
  };
};
exports.getAppointmentsModel = function (e, t, n, i, a) {
  var c;
  var h = (0, r.isGroupingByDate)(e.groups, e.groupOrientation, e.groupByDate);
  var f = e.groupCount;
  var p = e.isVerticalGroupOrientation;
  var g = new o.PositionHelper({
    viewDataProvider: t,
    groupedByDate: h,
    rtlEnabled: e.rtlEnabled,
    groupCount: f,
    isVerticalGrouping: f && p,
    getDOMMetaDataCallback: function () {
      return a;
    }
  });
  var m = (0, l.calculateIsGroupedAllDayPanel)(e.loadedResources, e.groupOrientation, e.showAllDayPanel);
  var _ = t.getRowCount({
    intervalCount: e.intervalCount,
    currentDate: e.currentDate,
    viewType: e.viewType,
    hoursInterval: e.hoursInterval,
    startDayHour: e.startDayHour,
    endDayHour: e.endDayHour
  });
  var v = (0, o.getAllDayHeight)(e.showAllDayPanel, e.isVerticalGroupOrientation, a);
  var y = t.getLastCellEndDate();
  var b = t.getVisibleDayDuration(e.startDayHour, e.endDayHour, e.hoursInterval);
  var x = t.getViewOptions();
  var w = x.startCellIndex;
  var C = x.startRowIndex;
  var S = (0, l.getCellDuration)(e.viewType, e.startDayHour, e.endDayHour, e.hoursInterval);
  return u({}, e, {
    appointmentRenderingStrategyName: d(e.viewType),
    loadedResources: e.loadedResources,
    dataAccessors: i,
    timeZoneCalculator: n,
    viewDataProvider: t,
    positionHelper: g,
    isGroupedAllDayPanel: m,
    rowCount: _,
    cellWidth: (0, o.getCellWidth)(a),
    cellHeight: (0, o.getCellHeight)(a),
    allDayHeight: v,
    isGroupedByDate: h,
    endViewDate: y,
    visibleDayDuration: b,
    intervalDuration: S,
    allDayIntervalDuration: (c = "day", s.default.dateToMilliseconds(c)),
    leftVirtualCellCount: w,
    topVirtualCellCount: C,
    cellDuration: S,
    resizableStep: g.getResizableStep(),
    DOMMetaData: a
  });
};