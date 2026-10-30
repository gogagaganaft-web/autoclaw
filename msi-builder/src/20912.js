exports.default = undefined;
var i;
var o = (i = require("./97250.js")) && i.__esModule ? i : {
  default: i
};
function a(e, t) {
  return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var r = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  a(t, n);
  var o = i.prototype;
  o.getDropDownAppointmentWidth = function (e, t) {
    return this.getDropDownButtonAdaptiveSize();
  };
  o.getDropDownButtonAdaptiveSize = function () {
    return 28;
  };
  o.getCollectorTopOffset = function (e) {
    var t = this._renderingStrategy;
    if (t.allDaySupported() && e) {
      return (t.allDayHeight - t.getDropDownButtonAdaptiveSize()) / 2;
    } else {
      return this._renderingStrategy.cellHeight - 40;
    }
  };
  o.getCollectorLeftOffset = function () {
    var e = this._renderingStrategy.getDropDownAppointmentWidth();
    return (this._renderingStrategy.cellWidth - e) / 2;
  };
  o.getAppointmentDefaultOffset = function () {
    return 35;
  };
  o.getDynamicAppointmentCountPerCell = function () {
    if (this._renderingStrategy.allDaySupported()) {
      return {
        allDay: 0,
        simple: this._calculateDynamicAppointmentCountPerCell() || this._getAppointmentMinCount()
      };
    } else {
      return 0;
    }
  };
  o.getDropDownAppointmentHeight = function () {
    return 28;
  };
  o._getAppointmentMinCount = function () {
    return 0;
  };
  o._getAppointmentDefaultWidth = function () {
    if (this._renderingStrategy.allDaySupported()) {
      return 30;
    } else {
      return e.prototype._getAppointmentDefaultWidth.call(this);
    }
  };
  o._calculateDynamicAppointmentCountPerCell = function () {
    return Math.floor(this._renderingStrategy._getAppointmentMaxWidth() / this._renderingStrategy._getAppointmentDefaultWidth());
  };
  return i;
}(o.default);
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;