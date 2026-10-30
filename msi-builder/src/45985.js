exports.validateDayHours = exports.setOptionHour = exports.isTimelineView = exports.isHorizontalView = exports.isDateInRange = exports.isDateAndTimeView = exports.getViewStartByOptions = exports.getVerticalGroupCountClass = exports.getTotalRowCountByCompleteData = exports.getTotalCellCountByCompleteData = exports.getToday = exports.getStartViewDateWithoutDST = exports.getStartViewDateTimeOffset = exports.getHorizontalGroupCount = exports.getHeaderCellText = exports.getDisplayedRowCount = exports.getDisplayedCellCount = exports.getCellDuration = exports.getCalculatedFirstDayOfWeek = exports.formatWeekdayAndDay = exports.formatWeekday = exports.calculateViewStartDate = exports.calculateIsGroupedAllDayPanel = exports.calculateDayDuration = exports.calculateCellIndex = undefined;
var i = f(require("./96688.js"));
var o = f(require("./91198.js"));
var a = require("./35922.js");
var r = f(require("./91500.js"));
var s = f(require("./32511.js"));
var l = require("./62060.js");
var u = require("./27728.js");
var d = require("./98140.js");
var c = require("./97205.js");
var h = require("./67786.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t, n, i) {
  if (i > 0) {
    return o.default.dateInRange(e, t, new Date(n.getTime() - 1));
  } else {
    return o.default.dateInRange(e, n, t, "date");
  }
}
exports.isDateInRange = p;
exports.setOptionHour = function (e, t) {
  var n = new Date(e);
  if ((0, a.isDefined)(t)) {
    n.setHours(t, t % 1 * 60, 0, 0);
    return n;
  } else {
    return n;
  }
};
exports.getViewStartByOptions = function (e, t, n, i) {
  if (!e) {
    return new Date(t);
  }
  for (var a = o.default.trimTime(i), r = a.getTime() <= t.getTime() ? 1 : -1, s = new Date(a.getTime() + n * r); !p(t, a, s, r);) {
    a = s;
    s = new Date(a.getTime() + n * r);
  }
  if (r > 0) {
    return a;
  } else {
    return s;
  }
};
exports.getCalculatedFirstDayOfWeek = function (e) {
  if ((0, a.isDefined)(e)) {
    return e;
  } else {
    return r.default.firstDayOfWeekIndex();
  }
};
exports.calculateViewStartDate = function (e) {
  return e;
};
exports.calculateCellIndex = function (e, t, n) {
  return t * n + e;
};
exports.getStartViewDateWithoutDST = function (e, t) {
  var n = s.default.getDateWithoutTimezoneChange(e);
  n.setHours(t);
  return n;
};
exports.getHeaderCellText = function (e, t, n, i, o) {
  var a = i(e, t, o);
  return r.default.format(a, n);
};
exports.validateDayHours = function (e, t) {
  if (e >= t) {
    throw i.default.Error("E1058");
  }
};
exports.getStartViewDateTimeOffset = function (e, t) {
  var n = Math.floor(t);
  if (s.default.isTimezoneChangeInDate(e) && n !== e.getHours()) {
    return o.default.dateToMilliseconds("hour");
  } else {
    return 0;
  }
};
function g(e) {
  return r.default.getDayNames("abbreviated")[e.getDay()];
}
exports.formatWeekday = g;
exports.formatWeekdayAndDay = function (e) {
  return `${g(e)} ${r.default.format(e, "day")}`;
};
exports.getToday = function (e, t) {
  var n = e ?? new Date();
  return (t == null ? undefined : t.createDate(n, {
    path: "toGrid"
  })) || n;
};
exports.getVerticalGroupCountClass = function (e) {
  switch (e == null ? undefined : e.length) {
    case 1:
      return l.VERTICAL_GROUP_COUNT_CLASSES[0];
    case 2:
      return l.VERTICAL_GROUP_COUNT_CLASSES[1];
    case 3:
      return l.VERTICAL_GROUP_COUNT_CLASSES[2];
    default:
      return;
  }
};
exports.isDateAndTimeView = function (e) {
  return e !== u.VIEWS.TIMELINE_MONTH && e !== u.VIEWS.MONTH;
};
exports.isTimelineView = function (e) {
  return !!h.TIMELINE_VIEWS[e];
};
exports.getHorizontalGroupCount = function (e, t) {
  var n = (0, d.getGroupCount)(e) || 1;
  if ((0, c.isVerticalGroupingApplied)(e, t)) {
    return 1;
  } else {
    return n;
  }
};
exports.calculateIsGroupedAllDayPanel = function (e, t, n) {
  return (0, c.isVerticalGroupingApplied)(e, t) && n;
};
function m(e, t) {
  return t - e;
}
exports.calculateDayDuration = m;
exports.isHorizontalView = function (e) {
  switch (e) {
    case u.VIEWS.TIMELINE_DAY:
    case u.VIEWS.TIMELINE_WEEK:
    case u.VIEWS.TIMELINE_WORK_WEEK:
    case u.VIEWS.TIMELINE_MONTH:
    case u.VIEWS.MONTH:
      return true;
    default:
      return false;
  }
};
function _(e) {
  return e[e.length - 1].length;
}
exports.getTotalCellCountByCompleteData = _;
function v(e) {
  return e.length;
}
exports.getTotalRowCountByCompleteData = v;
exports.getDisplayedCellCount = function (e, t) {
  return e ?? _(t);
};
exports.getDisplayedRowCount = function (e, t) {
  return e ?? v(t);
};
exports.getCellDuration = function (e, t, n, i) {
  switch (e) {
    case "month":
      return m(t, n) * 3600000;
    case "timelineMonth":
      return o.default.dateToMilliseconds("day");
    default:
      return i * 3600000;
  }
};