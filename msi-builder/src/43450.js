exports.getAppointmentColor = undefined;
var i = require("./98140.js");
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
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
exports.getAppointmentColor = function (e, t) {
  return (0, i.getAppointmentColor)(o({}, e, {
    dataAccessors: e.resourcesDataAccessors
  }), t);
};