exports.changeCallback = undefined;
exports.originalViewPort = function () {
  return d;
};
exports.value = undefined;
var i = r(require("./68374.js"));
var o = r(require("./24311.js"));
var a = r(require("./44504.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s = o.default.add;
var l = (0, a.default)();
exports.changeCallback = l;
var u;
var d = (0, i.default)();
function c(e) {
  if (!arguments.length) {
    return u;
  }
  var t = (0, i.default)(e);
  d = t;
  var n = !!t.length;
  var o = c();
  u = n ? t : (0, i.default)("body");
  l.fire(n ? c() : (0, i.default)(), o);
}
exports.value = c;
s(function () {
  c(".dx-viewport");
});