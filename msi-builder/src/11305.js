exports.sortAppointmentsByStartDate = exports.replaceWrongEndDate = exports.getRecurrenceException = exports.getAppointmentTakesSeveralDays = exports.compareDateWithStartDayHour = exports.compareDateWithEndDayHour = exports._isEndDateWrong = exports._convertRecurrenceException = exports._appointmentPartInInterval = undefined;
var i = s(require("./91198.js"));
var o = s(require("./32511.js"));
var a = s(require("./69434.js"));
var r = require("./86474.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = i.default.dateToMilliseconds;
exports.compareDateWithStartDayHour = function (e, t, n, o, a) {
  var r = i.default.dateTimeFromDecimal(n);
  return e.getHours() >= r.hours && e.getMinutes() >= r.minutes || t.getHours() === r.hours && t.getMinutes() > r.minutes || t.getHours() > r.hours || a || o;
};
exports.compareDateWithEndDayHour = function (e) {
  var t;
  var n = e.startDate;
  var o = e.endDate;
  var a = e.startDayHour;
  var r = e.endDayHour;
  var s = e.viewStartDayHour;
  var u = e.viewEndDayHour;
  var d = e.allDay;
  var c = e.severalDays;
  var h = e.min;
  var f = e.max;
  var p = e.checkIntersectViewport;
  var g = (24 - u + s) * l("hour");
  var m = o.getTime() - n.getTime();
  var _ = (g - m) / l("hour");
  var v = n.getHours();
  var y = n.getMinutes();
  var b = i.default.dateTimeFromDecimal(r);
  var x = i.default.dateTimeFromDecimal(a);
  var w = n < f && o > h;
  t = p && w || v < b.hours || v === b.hours && y < b.minutes || d && n <= f || c && w && (v < b.hours || o.getHours() * 60 + o.getMinutes() > x.hours * 60);
  if (m < g && v > b.hours && y > b.minutes && _ <= v - r) {
    t = false;
  }
  return t;
};
exports.getAppointmentTakesSeveralDays = function (e) {
  return !i.default.sameDate(e.startDate, e.endDate);
};
function u(e, t) {
  return !t || isNaN(t.getTime()) || e.getTime() > t.getTime();
}
exports._isEndDateWrong = u;
exports._appointmentPartInInterval = function (e, t, n, i) {
  var o = e.getHours();
  var a = t.getHours();
  return o <= n && a <= i && a >= n || a >= i && o <= i && o >= n;
};
exports.getRecurrenceException = function (e, t, n) {
  var i = e.recurrenceException;
  if (i) {
    for (var o = i.split(","), a = 0; a < o.length; a++) {
      o[a] = d(o[a], e.startDate, t, n);
    }
    return o.join();
  }
  return i;
};
function d(e, t, n, i) {
  e = e.replace(/\s/g, "");
  function r(e) {
    return n.createDate(e, {
      path: "toGrid"
    });
  }
  var s = a.default.deserializeDate(e);
  var l = r(t);
  var u = r(s);
  u = o.default.correctRecurrenceExceptionByTimezone(u, l, i);
  return e = a.default.serializeDate(u, "yyyyMMddTHHmmss");
}
exports._convertRecurrenceException = d;
exports.replaceWrongEndDate = function (e, t, n, o, a) {
  if (u(t, n)) {
    var s = function (e, t) {
      if (e) {
        return i.default.setToDayEnd(new Date(t));
      } else {
        return new Date(t.getTime() + o * l("minute"));
      }
    }(r.ExpressionUtils.getField(a, "allDay", e), t);
    a.setter.endDate(e, s);
  }
};
exports.sortAppointmentsByStartDate = function (e, t) {
  e.sort(function (e, n) {
    var i = new Date(r.ExpressionUtils.getField(t, "startDate", e.settings || e));
    var o = new Date(r.ExpressionUtils.getField(t, "startDate", n.settings || n));
    return Math.sign(i.getTime() - o.getTime());
  });
};