exports.remove = exports.isLastZIndexInStack = exports.create = exports.clearStack = exports.base = undefined;
var i = require("./20576.js");
var o = 1500;
var a = [];
exports.base = function (e) {
  return o = (0, i.ensureDefined)(e, o);
};
exports.create = function (e = o) {
  var t = a.length;
  var n = (t ? a[t - 1] : e) + 1;
  a.push(n);
  return n;
};
exports.remove = function (e) {
  var t = a.indexOf(e);
  if (t >= 0) {
    a.splice(t, 1);
  }
};
exports.isLastZIndexInStack = function (e) {
  return a.length && a[a.length - 1] === e;
};
exports.clearStack = function () {
  a = [];
};