var i;
function o(e, t) {
  return (o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.default = undefined;
var a = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  o(t, n);
  i.prototype.isApplyCompactAppointmentOffset = function () {
    return (!this.isAdaptive || this._getMaxAppointmentCountPerCellByType() !== 0) && this.supportCompactDropDownAppointments();
  };
  return i;
}(((i = require("./27845.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;