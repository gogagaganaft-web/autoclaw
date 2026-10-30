exports.cancelAnimationFrame = function () {
  u();
  l.apply(r, arguments);
};
exports.requestAnimationFrame = function () {
  u();
  return s.apply(r, arguments);
};
var i;
var o = require("./58201.js");
var a = (i = require("./39618.js")) && i.__esModule ? i : {
  default: i
};
var r = (0, o.hasWindow)() ? (0, o.getWindow)() : {};
function s(e) {
  return setTimeout(e, 1000 / 60);
}
function l(e) {
  clearTimeout(e);
}
var u = (0, a.default)(function () {
  var e = r.requestAnimationFrame || r.webkitRequestAnimationFrame || r.mozRequestAnimationFrame || r.oRequestAnimationFrame || r.msRequestAnimationFrame;
  var t = r.cancelAnimationFrame || r.webkitCancelAnimationFrame || r.mozCancelAnimationFrame || r.oCancelAnimationFrame || r.msCancelAnimationFrame;
  if (e && t) {
    s = e;
    l = t;
  }
});