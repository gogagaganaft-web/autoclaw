exports.default = undefined;
var i = require("./35922.js");
var o = function () {
  function e(e) {
    this._renderingStrategy = e;
  }
  var t = e.prototype;
  t.getDropDownAppointmentWidth = function (e, t) {
    if (t || !(0, i.isDefined)(t)) {
      return this._renderingStrategy.cellWidth * 75 / 100;
    } else {
      return 24;
    }
  };
  t.getCollectorTopOffset = function () {
    return 3;
  };
  t.getCollectorLeftOffset = function () {
    return 3;
  };
  t.getAppointmentDefaultOffset = function () {
    if (this._renderingStrategy._isCompactTheme()) {
      return 22;
    } else {
      return this._renderingStrategy.appointmentOffset;
    }
  };
  t.getDynamicAppointmentCountPerCell = function () {
    var e = this._renderingStrategy;
    var t = e.cellHeight;
    var n = Math.floor((t - e._getAppointmentDefaultOffset()) / e._getAppointmentDefaultHeight()) || this._getAppointmentMinCount();
    if (e.allDaySupported()) {
      return {
        allDay: e.groupOrientation === "vertical" ? n : this._renderingStrategy.appointmentCountPerCell,
        simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
      };
    } else {
      return n;
    }
  };
  t.getDropDownAppointmentHeight = function () {};
  t._getAppointmentMinCount = function () {
    return 1;
  };
  t._calculateDynamicAppointmentCountPerCell = function () {
    return Math.floor(this._renderingStrategy._getAppointmentMaxWidth() / 50);
  };
  t._getAppointmentDefaultWidth = function () {
    return 40;
  };
  return e;
}();
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;