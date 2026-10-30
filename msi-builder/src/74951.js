exports.excludeFromRecurrence = undefined;
var i;
var o = require("./5480.js");
var a = (i = require("./69434.js")) && i.__esModule ? i : {
  default: i
};
function r() {
  return (r = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var s = `yyyyMMddTHHmmssZ`;
function l(e, t) {
  var n;
  var i;
  var o = [];
  if (e.recurrenceException) {
    o.push(e.recurrenceException);
  }
  o.push((n = t, i = e.startDate, e.allDay && n.setHours(i.getHours(), i.getMinutes(), i.getSeconds(), i.getMilliseconds()), a.default.serializeDate(n, s)));
  return o.join();
}
exports.excludeFromRecurrence = function (e, t, n, i) {
  var a = (0, o.createAppointmentAdapter)(r({}, e), n, i);
  a.recurrenceException = l(a, t);
  return a;
};