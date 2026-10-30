exports.isFirstCellInMonthWithIntervalCount = exports.getViewStartByOptions = exports.getCellText = exports.calculateStartViewDate = exports.calculateCellIndex = undefined;
var i = r(require("./91198.js"));
var o = r(require("./91500.js"));
var a = require("./45985.js");
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t, n, i) {
  if (!e) {
    return new Date(t);
  }
  for (var o = new Date(i), r = new Date(i), s = o.getTime() <= t.getTime() ? 1 : -1, l = new Date(new Date(r.setMonth(r.getMonth() + s * n))); !(0, a.isDateInRange)(t, o, l, s);) {
    o = new Date(l);
    if (s > 0) {
      o.setDate(1);
    }
    l = new Date(new Date(l.setMonth(l.getMonth() + s * n)));
  }
  if (s > 0) {
    return o;
  } else {
    return l;
  }
}
exports.getViewStartByOptions = s;
exports.calculateStartViewDate = function (e, t, n, o, r) {
  var l = s(n, e, o, i.default.getFirstMonthDate(n));
  var u = i.default.getFirstMonthDate(l);
  var d = (0, a.getCalculatedFirstDayOfWeek)(r);
  var c = i.default.getFirstWeekDate(u, d);
  return (0, a.setOptionHour)(c, t);
};
exports.calculateCellIndex = function (e, t, n, i) {
  return e * i + t;
};
function l(e, t) {
  return e.getDate() === 1 && t > 1;
}
exports.isFirstCellInMonthWithIntervalCount = l;
exports.getCellText = function (e, t) {
  if (l(e, t)) {
    return [o.default.getMonthNames("abbreviated")[e.getMonth()], o.default.format(e, "day")].join(" ");
  } else {
    return o.default.format(e, "dd");
  }
};