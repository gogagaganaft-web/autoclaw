exports.ViewDataGeneratorDay = undefined;
var i = require("./58824.js");
function o(e, t) {
  return (o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var a = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  o(t, n);
  a.prototype._calculateStartViewDate = function (e) {
    return (0, i.calculateStartViewDate)(e.currentDate, e.startDayHour, e.startDate, this._getIntervalDuration(e.intervalCount));
  };
  return a;
}(require("./18177.js").ViewDataGenerator);
exports.ViewDataGeneratorDay = a;