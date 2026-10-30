exports.addAlgorithm = function (e, t, n) {
  a[e] = t;
  if (n) {
    i = a[e];
  }
};
exports.getAlgorithm = function (e) {
  return a[(0, o.normalizeEnum)(e)] || i;
};
var i;
var o = require("./19157.js");
var a = {};