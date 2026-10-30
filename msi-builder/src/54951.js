exports.ViewDataGeneratorTimelineMonth = undefined;
var i;
var o = require("./18177.js");
var a = require("./19097.js");
var r = require("./75481.js");
var s = require("./45985.js");
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = ((i = require("./91198.js")) && i.__esModule ? i : {
  default: i
}).default.dateToMilliseconds("day");
var d = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var o = i.prototype;
  o._calculateCellIndex = function (e, t, n, i) {
    return (0, a.calculateCellIndex)(e, t, n, i);
  };
  o.calculateEndDate = function (e, t, n) {
    return (0, s.setOptionHour)(e, n);
  };
  o.getInterval = function () {
    return u;
  };
  o._calculateStartViewDate = function (e) {
    return (0, r.calculateStartViewDate)(e.currentDate, e.startDayHour, e.startDate, e.intervalCount);
  };
  o.getCellCount = function (e) {
    for (var t = e.intervalCount, n = e.currentDate, i = 0, o = 1; o <= t; o++) {
      i += new Date(n.getFullYear(), n.getMonth() + o, 0).getDate();
    }
    return i;
  };
  o.setHiddenInterval = function () {
    this.hiddenInterval = 0;
  };
  return i;
}(o.ViewDataGenerator);
exports.ViewDataGeneratorTimelineMonth = d;