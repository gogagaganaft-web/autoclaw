exports.getValidStartDate = exports.getTimePanelCellText = exports.getIntervalDuration = exports.calculateViewStartDate = exports.calculateStartViewDate = undefined;
var i = s(require("./91198.js"));
var o = s(require("./91500.js"));
var a = require("./45985.js");
var r = s(require("./32511.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.getIntervalDuration = function (e) {
  return i.default.dateToMilliseconds("day") * 7 * e;
};
function l(e, t) {
  if (e) {
    return i.default.getFirstWeekDate(e, t);
  } else {
    return undefined;
  }
}
exports.getValidStartDate = l;
exports.calculateStartViewDate = function (e, t, n, o, r) {
  var s = (0, a.getCalculatedFirstDayOfWeek)(r);
  var u = (0, a.getViewStartByOptions)(n, e, o, l(n, s));
  var d = i.default.getFirstWeekDate(u, s);
  return (0, a.setOptionHour)(d, t);
};
exports.calculateViewStartDate = function (e, t) {
  var n = t ?? o.default.firstDayOfWeekIndex();
  return i.default.getFirstWeekDate(e, n);
};
exports.getTimePanelCellText = function (e, t, n, i, s) {
  if (e % 2 == 0) {
    var l = function (e, t, n, i, o) {
      if (!r.default.isTimezoneChangeInDate(t)) {
        return t;
      }
      var s = r.default.getDateWithoutTimezoneChange(n);
      var l = new Date(s);
      var u = Math.round(i);
      var d = (0, a.getStartViewDateTimeOffset)(n, o);
      l.setMilliseconds(l.getMilliseconds() + u * e - d);
      return l;
    }(e, t, n, i, s);
    return o.default.format(l, "shorttime");
  }
  return "";
};