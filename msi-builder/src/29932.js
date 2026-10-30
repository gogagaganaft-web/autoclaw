exports.registerPattern = exports.registerGradient = exports.getGraphicObjects = undefined;
var i = require("./19157.js");
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
var a = {};
exports.registerPattern = function (e) {
  var t = (0, i.getNextDefsSvgId)();
  a[t] = o({
    type: "pattern"
  }, e);
  return t;
};
exports.registerGradient = function (e, t) {
  var n = (0, i.getNextDefsSvgId)();
  a[n] = o({
    type: e
  }, t);
  return n;
};
exports.getGraphicObjects = function () {
  return a;
};