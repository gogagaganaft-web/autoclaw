exports.default = undefined;
var i = s(require("./72097.js"));
var o = s(require("./91198.js"));
var a = require("./86474.js");
var r = s(require("./37009.js"));
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
var u = o.default.dateToMilliseconds;
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
  o._needVerifyItemSize = function () {
    return true;
  };
  o.calculateAppointmentWidth = function (e, t) {
    var n = this.cellWidth || this.getAppointmentMinSize();
    var i = a.ExpressionUtils.getField(this.dataAccessors, "allDay", e);
    var o = t.info.appointment.startDate;
    var s = t.info.appointment.endDate;
    var l = t.info.appointment.normalizedEndDate;
    var d = this.getAppointmentDurationInMs(o, l, i);
    d = this._adjustDurationByDaylightDiff(d, o, l);
    var c = this.cellDurationInMinutes * u("minute");
    var h = (d - (0, r.default)(o, s, this.viewDataProvider) * u("hour")) / c;
    return this.cropAppointmentWidth(h * n, n);
  };
  o._needAdjustDuration = function (e) {
    return e < 0;
  };
  o.getAppointmentGeometry = function (t) {
    var n = this._customizeAppointmentGeometry(t);
    return e.prototype.getAppointmentGeometry.call(this, n);
  };
  o._customizeAppointmentGeometry = function (e) {
    var t = this._calculateGeometryConfig(e);
    return this._customizeCoordinates(e, t.height, t.appointmentCountPerCell, t.offset);
  };
  o._getOffsets = function () {
    return {
      unlimited: 0,
      auto: 0
    };
  };
  o._getCompactLeftCoordinate = function (e, t) {
    return e + (this.cellWidth || this.getAppointmentMinSize()) * t;
  };
  o._getMaxHeight = function () {
    return this.cellHeight || this.getAppointmentMinSize();
  };
  o._getAppointmentCount = function (e, t) {
    return this._getMaxAppointmentCountPerCellByType(false);
  };
  o._getAppointmentDefaultHeight = function () {
    return 60;
  };
  o._getAppointmentMinHeight = function () {
    return 35;
  };
  o._sortCondition = function (e, t) {
    return this._columnCondition(e, t);
  };
  o._getOrientation = function () {
    return ["left", "right", "top"];
  };
  o.getDropDownAppointmentWidth = function () {
    return this.cellWidth - 4;
  };
  o.getDeltaTime = function (e, t) {
    var n = e.width - t.width;
    return u("minute") * Math.round(n / this.cellWidth * this.cellDurationInMinutes);
  };
  o.isAllDay = function (e) {
    return a.ExpressionUtils.getField(this.dataAccessors, "allDay", e);
  };
  o._isItemsCross = function (e, t) {
    var n = this._getOrientation();
    return this._checkItemsCrossing(e, t, n);
  };
  o.getPositionShift = function (t) {
    var n = e.prototype.getPositionShift.call(this, t);
    var i = this.cellWidth * t;
    if (this.rtlEnabled) {
      i *= -1;
    }
    return {
      top: 0,
      left: i += n.left,
      cellPosition: i
    };
  };
  o.supportCompactDropDownAppointments = function () {
    return false;
  };
  return i;
}(i.default);
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;