exports.toFixed = function (e, t) {
  var n = t || 0;
  var i = n > 0 ? o.apply(undefined, arguments) : e;
  return i.toFixed(n);
};
var i = require("./60810.js");
function o(e, t) {
  var n = Math.pow(10, t);
  return function (e) {
    return (0, i.sign)(e) * Math.round(Math.abs(e));
  }((0, i.multiplyInExponentialForm)(e, t)) / n;
}