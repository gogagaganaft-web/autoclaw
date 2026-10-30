exports.resolveDataItems = exports.getPreparedDataItems = undefined;
var i = require("./11305.js");
var o = require("./5480.js");
var a = require("./35922.js");
exports.getPreparedDataItems = function (e, t, n, r) {
  var s = [];
  if (e != null) {
    e.forEach(function (e) {
      var l;
      var u = new Date(t.getter.startDate(e));
      var d = new Date(t.getter.endDate(e));
      (0, i.replaceWrongEndDate)(e, u, d, n, t);
      var c = (0, o.createAppointmentAdapter)(e, t, r);
      var h = c.startDate && c.calculateStartDate("toGrid");
      var f = c.endDate && c.calculateEndDate("toGrid");
      var p = new RegExp("freq", "gi");
      var g = c.recurrenceRule;
      var m = g != null && (l = g.match(p)) !== null && l !== undefined && !!l.length;
      var _ = !(0, a.isDefined)(e.visible) || !!e.visible;
      if (h && f) {
        s.push({
          allDay: !!c.allDay,
          startDate: h,
          startDateTimeZone: e.startDateTimeZone,
          endDate: f,
          endDateTimeZone: e.endDateTimeZone,
          recurrenceRule: c.recurrenceRule,
          recurrenceException: c.recurrenceException,
          hasRecurrenceRule: m,
          visible: _,
          rawAppointment: e
        });
      }
    });
  }
  return s;
};
exports.resolveDataItems = function (e) {
  if (Array.isArray(e)) {
    return e;
  } else {
    return e.data;
  }
};