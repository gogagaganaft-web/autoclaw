exports.getDateForHeaderText = undefined;
var i;
var o = (i = require("./32511.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./45985.js");
exports.getDateForHeaderText = function (e, t, n) {
  if (!o.default.isTimezoneChangeInDate(t)) {
    return t;
  }
  var i = n.cellCountInDay;
  var r = n.interval;
  var s = n.startDayHour;
  var l = n.startViewDate;
  var u = (0, a.getStartViewDateWithoutDST)(l, s);
  var d = e % i;
  u.setTime(u.getTime() + d * r);
  return u;
};