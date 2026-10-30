exports.GroupedDataMapProvider = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./45985.js");
var r = function () {
  function e(e, t, n, i) {
    this.groupedDataMap = e.generateGroupedDataMap(t);
    this.completeViewDataMap = n;
    this._viewOptions = i;
  }
  var t = e.prototype;
  t.getGroupStartDate = function (e) {
    var t = this.getFirstGroupRow(e);
    if (t) {
      return t[0].cellData.startDate;
    }
  };
  t.getGroupEndDate = function (e) {
    var t = this.getLastGroupRow(e);
    if (t) {
      return t[t.length - 1].cellData.endDate;
    }
  };
  t.findGroupCellStartDate = function (e, t, n, i) {
    var a = this.getGroupFromDateTableGroupMap(e);
    function r(e, r) {
      var s = a[e][r].cellData;
      var l = s.startDate;
      var u = s.endDate;
      if (i) {
        l = o.default.trimTime(l);
        u = o.default.setToDayEnd(l);
      }
      if (o.default.intervalsOverlap({
        firstMin: t,
        firstMax: n,
        secondMin: l,
        secondMax: u
      })) {
        return l;
      }
    }
    var s = function () {
      for (var e = a[0].length, t = 0; t < e; ++t) {
        for (var n = 0; n < a.length; ++n) {
          var i = r(n, t);
          if (i) {
            return i;
          }
        }
      }
    }();
    var l = function () {
      for (var e = 0; e < a.length; ++e) {
        for (var t = a[e], n = 0; n < t.length; ++n) {
          var i = r(e, n);
          if (i) {
            return i;
          }
        }
      }
    }();
    if (s > l) {
      return l;
    } else {
      return s;
    }
  };
  t.findAllDayGroupCellStartDate = function (e, t) {
    var n = this.getGroupStartDate(e);
    if (n > t) {
      return n;
    } else {
      return t;
    }
  };
  t.findCellPositionInMap = function (e) {
    var t = this;
    var n = e.groupIndex;
    var i = e.startDate;
    var r = e.isAllDay;
    var s = e.index;
    var l = r ? o.default.trimTime(i).getTime() : i.getTime();
    var u = function (e) {
      if (!(0, a.isDateAndTimeView)(t._viewOptions.viewType)) {
        return o.default.sameDate(i, e.startDate);
      }
      var n = e.startDate.getTime();
      var s = e.endDate.getTime();
      if (r) {
        return e.allDay && l >= n && l <= s;
      } else {
        return l >= n && l < s;
      }
    };
    var d = this.groupedDataMap;
    var c = d.allDayPanelGroupedMap;
    var h = d.dateTableGroupedMap;
    for (var f = r && !this._viewOptions.isVerticalGrouping ? c[n] ? [c[n]] : [] : h[n] || [], p = 0; p < f.length; ++p) {
      for (var g = f[p], m = 0; m < g.length; ++m) {
        var _ = g[m];
        var v = _.cellData;
        if (this._isSameGroupIndexAndIndex(v, n, s) && u(v)) {
          return _.position;
        }
      }
    }
  };
  t._isSameGroupIndexAndIndex = function (e, t, n) {
    return e.groupIndex === t && (n === undefined || e.index === n);
  };
  t.getCellsGroup = function (e) {
    var t = this.groupedDataMap.dateTableGroupedMap[e];
    if (t) {
      return t[0][0].cellData.groups;
    }
  };
  t.getCompletedGroupsInfo = function () {
    var e = this;
    return this.groupedDataMap.dateTableGroupedMap.map(function (t) {
      var n = t[0][0].cellData;
      var i = n.allDay;
      var o = n.groupIndex;
      return {
        allDay: i,
        groupIndex: o,
        startDate: e.getGroupStartDate(o),
        endDate: e.getGroupEndDate(o)
      };
    }).filter(function (e) {
      return !!e.startDate;
    });
  };
  t.getGroupIndices = function () {
    return this.getCompletedGroupsInfo().map(function (e) {
      return e.groupIndex;
    });
  };
  t.getGroupFromDateTableGroupMap = function (e) {
    return this.groupedDataMap.dateTableGroupedMap[e];
  };
  t.getFirstGroupRow = function (e) {
    var t = this.getGroupFromDateTableGroupMap(e);
    if (t) {
      if (t[0][0].cellData.allDay) {
        return t[1];
      } else {
        return t[0];
      }
    }
  };
  t.getLastGroupRow = function (e) {
    var t = this.groupedDataMap.dateTableGroupedMap[e];
    if (t) {
      return t[t.length - 1];
    }
  };
  t.getLastGroupCellPosition = function (e) {
    var t = this.getLastGroupRow(e);
    if (t == null) {
      return undefined;
    } else {
      return t[(t == null ? undefined : t.length) - 1].position;
    }
  };
  t.getRowCountInGroup = function (e) {
    var t = this.getLastGroupRow(e);
    return (t[t.length - 1].cellData.index + 1) / t.length;
  };
  return e;
}();
exports.GroupedDataMapProvider = r;