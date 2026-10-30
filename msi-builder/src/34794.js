exports.default = undefined;
var i = s(require("./52359.js"));
var o = s(require("./91198.js"));
var a = s(require("./96687.js"));
var r = require("./11305.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var s = i.prototype;
  s.calculateAppointmentWidth = function (e, t) {
    var n = o.default.trimTime(t.info.appointment.startDate);
    var i = t.info.appointment.normalizedEndDate;
    var a = this.cellWidth || this.getAppointmentMinSize();
    var r = Math.ceil(this._getDurationInDays(n, i));
    var s = this.cropAppointmentWidth(r * a, a);
    if (this.isVirtualScrolling) {
      s -= this.viewDataProvider.getSkippedDaysCount(t.groupIndex, n, i, r) * a;
    }
    return s;
  };
  s._getDurationInDays = function (e, t) {
    return this._adjustDurationByDaylightDiff(t.getTime() - e.getTime(), e, t) / o.default.dateToMilliseconds("day") || 1;
  };
  s.getDeltaTime = function (e, t) {
    return this._getDeltaWidth(e, t) * 86400000;
  };
  s.isAllDay = function () {
    return false;
  };
  s.createTaskPositionMap = function (t, n) {
    if (!n) {
      (0, r.sortAppointmentsByStartDate)(t, this.dataAccessors);
    }
    return e.prototype.createTaskPositionMap.call(this, t);
  };
  s._getSortedPositions = function (t, n) {
    var i = e.prototype._getSortedPositions.call(this, t);
    if (!n) {
      i = (0, a.default)(i).sortBy("top").thenBy("left").thenBy("cellPosition").thenBy("i").toArray();
    }
    return i;
  };
  s.needCorrectAppointmentDates = function () {
    return false;
  };
  s.getPositionShift = function () {
    return {
      top: 0,
      left: 0,
      cellPosition: 0
    };
  };
  return i;
}(i.default);
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;