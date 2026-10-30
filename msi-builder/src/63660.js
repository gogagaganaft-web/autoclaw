exports.TimeZoneCalculator = undefined;
var i;
var o = require("./35922.js");
var a = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./75296.js");
var s = function () {
  function e(e) {
    this.options = e;
  }
  var t = e.prototype;
  t.createDate = function (e, t) {
    var n = new Date(e);
    switch (t.path) {
      case r.PathTimeZoneConversion.fromSourceToAppointment:
        return this.getConvertedDate(n, t.appointmentTimeZone, true, false);
      case r.PathTimeZoneConversion.fromAppointmentToSource:
        return this.getConvertedDate(n, t.appointmentTimeZone, true, true);
      case r.PathTimeZoneConversion.fromSourceToGrid:
        return this.getConvertedDate(n, t.appointmentTimeZone, false, false);
      case r.PathTimeZoneConversion.fromGridToSource:
        return this.getConvertedDate(n, t.appointmentTimeZone, false, true);
      default:
        throw new Error("not specified pathTimeZoneConversion");
    }
  };
  t.getOffsets = function (e, t) {
    var n = -this.getClientOffset(e) / a.default.dateToMilliseconds("hour");
    var i = this.getCommonOffset(e);
    var r = this.getAppointmentOffset(e, t);
    return {
      client: n,
      common: (0, o.isDefined)(i) ? i : n,
      appointment: typeof r != "number" ? n : r
    };
  };
  t.getConvertedDateByOffsets = function (e, t, n, i) {
    var o = i ? -1 : 1;
    var a = new Date(e);
    a.setMinutes(a.getMinutes() - o * (t * 60));
    a.setMinutes(a.getMinutes() + o * (n * 60));
    return new Date(a);
  };
  t.getOriginStartDateOffsetInMs = function (e, t, n) {
    return this.getOffsetInHours(e, t, n) * 3600000;
  };
  t.getOffsetInHours = function (e, t, n) {
    var i = this.getOffsets(e, t);
    var o = i.appointment;
    var a = i.client;
    var r = i.common;
    if (t && n) {
      return o - a;
    } else if (t && !n) {
      return o - r;
    } else if (!t && n) {
      return r - a;
    } else {
      return 0;
    }
  };
  t.getClientOffset = function (e) {
    return this.options.getClientOffset(e);
  };
  t.getCommonOffset = function (e) {
    return this.options.tryGetCommonOffset(e);
  };
  t.getAppointmentOffset = function (e, t) {
    return this.options.tryGetAppointmentOffset(e, t);
  };
  t.getConvertedDate = function (e, t, n, i) {
    var o = new Date(e.getTime());
    var a = this.getOffsets(o, t);
    if (n && t) {
      return this.getConvertedDateByOffsets(e, a.client, a.appointment, i);
    } else {
      return this.getConvertedDateByOffsets(e, a.client, a.common, i);
    }
  };
  return e;
}();
exports.TimeZoneCalculator = s;