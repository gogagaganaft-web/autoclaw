exports.getAppointmentTakesAllDay = undefined;
var i;
var o = require("./35922.js");
var a = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
function r(e, t) {
  return (t.getTime() - e.getTime()) / a.default.dateToMilliseconds("hour");
}
exports.getAppointmentTakesAllDay = function (e, t, n, i) {
  function a() {
    return e.allDay;
  }
  switch (i) {
    case "hidden":
      return false;
    case "allDay":
      return a();
    case "all":
    default:
      if (a()) {
        return true;
      }
      var s = e.endDate;
      var l = e.startDate;
      if (!(0, o.isDefined)(s)) {
        return false;
      }
      return r(l, s) >= 24 || function (e, t, n, i) {
        var o = r(e, t);
        var a = i - n;
        var s = e.getHours();
        var l = t.getHours();
        return o >= a && s === n && l === i;
      }(l, s, t, n);
  }
};