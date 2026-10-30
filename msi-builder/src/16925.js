exports.TimePanelDataGenerator = undefined;
var i = require("./97205.js");
var o = require("./45985.js");
var a = require("./34279.js");
var r = ["allDay", "startDate", "endDate", "groups", "groupIndex", "isFirstGroupCell", "isLastGroupCell", "index"];
function s() {
  return (s = Object.assign ? Object.assign.bind() : function (e) {
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
var u = function () {
  function e(e) {
    this._viewDataGenerator = e;
  }
  var t = e.prototype;
  t.getCompleteTimePanelMap = function (e, t) {
    var n = e.startViewDate;
    var i = e.cellDuration;
    var o = e.startDayHour;
    var u = e.isVerticalGrouping;
    var d = e.intervalCount;
    var c = e.currentDate;
    var h = e.viewType;
    var f = e.hoursInterval;
    var p = e.endDayHour;
    var g = this._viewDataGenerator.getRowCount({
      intervalCount: d,
      currentDate: c,
      viewType: h,
      hoursInterval: f,
      startDayHour: o,
      endDayHour: p
    });
    var m = this._viewDataGenerator.getCellCount({
      intervalCount: d,
      currentDate: c,
      viewType: h,
      hoursInterval: f,
      startDayHour: o,
      endDayHour: p
    });
    var _ = 0;
    return t.map(function (e, t) {
      var d = e[0];
      var c = d.allDay;
      var h = d.startDate;
      d.endDate;
      var f = d.groups;
      var p = d.groupIndex;
      var v = d.isFirstGroupCell;
      var y = d.isLastGroupCell;
      var b = d.index;
      var x = l(d, r);
      if (c) {
        _ += 1;
      }
      var w = (t - _) % g;
      return s({}, x, {
        startDate: h,
        allDay: c,
        text: (0, a.getTimePanelCellText)(w, h, n, i, o),
        groups: u ? f : undefined,
        groupIndex: u ? p : undefined,
        isFirstGroupCell: u && v,
        isLastGroupCell: u && y,
        index: Math.floor(b / m)
      });
    });
  };
  t.generateTimePanelData = function (e, t) {
    var n = t.startRowIndex;
    var i = t.rowCount;
    var a = t.topVirtualRowHeight;
    var r = t.bottomVirtualRowHeight;
    var s = t.isGroupedAllDayPanel;
    var l = t.isVerticalGrouping;
    var u = t.isAllDayPanelVisible;
    var d = n + (l || !u ? 0 : 1);
    var c = (0, o.getDisplayedRowCount)(i, e);
    var h = e.slice(d, d + c);
    var f = {
      topVirtualRowHeight: a,
      bottomVirtualRowHeight: r,
      isGroupedAllDayPanel: s
    };
    var p = this._generateTimePanelDataFromMap(h, l).previousGroupedData;
    f.groupedData = p;
    return f;
  };
  t._generateTimePanelDataFromMap = function (e, t) {
    return e.reduce(function (e, n) {
      var o = e.previousGroupIndex;
      var a = e.previousGroupedData;
      var r = n.groupIndex;
      if (r !== o) {
        a.push({
          dateTable: [],
          isGroupedAllDayPanel: (0, i.getIsGroupedAllDayPanel)(!!n.allDay, t),
          groupIndex: r,
          key: (0, i.getKeyByGroup)(r, t)
        });
      }
      if (n.allDay) {
        a[a.length - 1].allDayPanel = n;
      } else {
        a[a.length - 1].dateTable.push(n);
      }
      return {
        previousGroupIndex: r,
        previousGroupedData: a
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });
  };
  return e;
}();
exports.TimePanelDataGenerator = u;