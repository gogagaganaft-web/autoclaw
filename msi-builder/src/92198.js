exports.createTimeZoneCalculator = undefined;
var i;
var o = require("./63660.js");
var a = (i = require("./32511.js")) && i.__esModule ? i : {
  default: i
};
exports.createTimeZoneCalculator = function (e) {
  return new o.TimeZoneCalculator({
    getClientOffset: function (e) {
      return a.default.getClientTimezoneOffset(e);
    },
    tryGetCommonOffset: function (t) {
      return a.default.calculateTimezoneByValue(e, t);
    },
    tryGetAppointmentOffset: function (e, t) {
      return a.default.calculateTimezoneByValue(t, e);
    }
  });
};