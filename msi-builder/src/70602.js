exports.getBoundaryProps = function (e, t, n, i = 0) {
  var o = t.left;
  var d = t.top;
  var c = {};
  var h = new a.ScrollDirection(e);
  var f = h.isHorizontal;
  var p = h.isVertical;
  if (f) {
    c.reachedLeft = r(o, 0);
    c.reachedRight = s(n, o, 0);
  }
  if (p) {
    c.reachedTop = l(d, 0);
    c.reachedBottom = u(n, d, i, 0);
  }
  return c;
};
exports.isReachedBottom = u;
exports.isReachedLeft = r;
exports.isReachedRight = s;
exports.isReachedTop = l;
var i = require("./92721.js");
var o = require("./71296.js");
var a = require("./60440.js");
function r(e, t) {
  return Math.round(e) <= t;
}
function s(e, t, n) {
  return Math.round((0, i.getScrollLeftMax)(e) - t) <= n;
}
function l(e, t) {
  return Math.round(e) <= t;
}
function u(e, t, n, i) {
  return Math.round((0, o.getScrollTopMax)(e) - t - n) <= i;
}