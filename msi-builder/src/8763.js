exports.createAppointmentLayout = exports.createAgendaAppointmentLayout = undefined;
var i = s(require("./68374.js"));
var o = s(require("./73349.js"));
var a = s(require("./28109.js"));
var r = require("./62060.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = " " + a.default.format("dxScheduler-allDay") + ": ";
exports.createAppointmentLayout = function (e, t) {
  var n = (0, i.default)(o.default.createDocumentFragment());
  (0, i.default)("<div>").text(e.text).addClass(r.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_TITLE).appendTo(n);
  if (t.html) {
    n.html(t.html);
  }
  var a = (0, i.default)("<div>").addClass(r.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS).appendTo(n);
  (0, i.default)("<div>").addClass(r.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_DATE).text(e.formatDate).appendTo(a);
  if (t.isRecurrence) {
    (0, i.default)("<span>").addClass(r.APPOINTMENT_CONTENT_CLASSES.RECURRING_ICON + " dx-icon-repeat").appendTo(n);
  }
  if (t.isAllDay) {
    (0, i.default)("<div>").text(l).addClass(r.APPOINTMENT_CONTENT_CLASSES.ALL_DAY_CONTENT).prependTo(a);
  }
  return n;
};
exports.createAgendaAppointmentLayout = function (e, t) {
  var n = (0, i.default)(o.default.createDocumentFragment());
  var a = (0, i.default)("<div>").addClass("dx-scheduler-agenda-appointment-left-layout").appendTo(n);
  var s = (0, i.default)("<div>").addClass("dx-scheduler-agenda-appointment-right-layout").appendTo(n);
  var u = (0, i.default)("<div>").addClass(r.APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER).appendTo(a);
  if (t.isRecurrence) {
    (0, i.default)("<span>").addClass(r.APPOINTMENT_CONTENT_CLASSES.RECURRING_ICON + " dx-icon-repeat").appendTo(u);
  }
  (0, i.default)("<div>").addClass(r.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_TITLE).text(e.text).appendTo(s);
  var d = (0, i.default)("<div>").addClass(r.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS).appendTo(s);
  (0, i.default)("<div>").addClass(r.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_DATE).text(e.formatDate).appendTo(d);
  if (t.isAllDay) {
    (0, i.default)("<div>").text(l).addClass(r.APPOINTMENT_CONTENT_CLASSES.ALL_DAY_CONTENT).prependTo(d);
  }
  return n;
};