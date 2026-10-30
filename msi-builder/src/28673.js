exports.alignToFirstDayOfWeek = h;
exports.alignToLastDayOfWeek = f;
exports.calculateAlignedWeeksBetweenDates = function (e, t, n) {
  var i = h(e, n);
  var o = f(t, n);
  var a = p(i, o) / 7;
  return Math.max(a, 6);
};
exports.calculateDaysBetweenDates = p;
exports.getViewDataGeneratorByViewType = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./27728.js");
var r = require("./18177.js");
var s = require("./1482.js");
var l = require("./96444.js");
var u = require("./54951.js");
var d = require("./9794.js");
var c = require("./27536.js");
function h(e, t) {
  var n = new Date(e);
  var i = n.getDay() - t;
  if (i < 0) {
    i += 7;
  }
  n.setDate(n.getDate() - i);
  return n;
}
function f(e, t) {
  var n = h(e, t);
  n.setDate(n.getDate() + 7 - 1);
  return n;
}
function p(e, t) {
  var n = o.default.trimTime(t).getTime() - o.default.trimTime(e).getTime();
  return Math.round(n / 86400000) + 1;
}
exports.getViewDataGeneratorByViewType = function (e) {
  switch (e) {
    case a.VIEWS.MONTH:
      return new l.ViewDataGeneratorMonth();
    case a.VIEWS.TIMELINE_MONTH:
      return new u.ViewDataGeneratorTimelineMonth();
    case a.VIEWS.DAY:
    case a.VIEWS.TIMELINE_DAY:
      return new s.ViewDataGeneratorDay();
    case a.VIEWS.WEEK:
    case a.VIEWS.TIMELINE_WEEK:
      return new d.ViewDataGeneratorWeek();
    case a.VIEWS.WORK_WEEK:
    case a.VIEWS.TIMELINE_WORK_WEEK:
      return new c.ViewDataGeneratorWorkWeek();
    default:
      return new r.ViewDataGenerator();
  }
};