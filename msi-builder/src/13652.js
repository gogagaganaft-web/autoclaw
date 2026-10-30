exports.default = undefined;
var i = require("./19910.js");
var o = Math.min;
var a = Math.max;
function r(e) {
  return [Number(e[0]) || 0, e[1] - e[0] || 1];
}
function s(e, t) {
  var n = {};
  return function (i) {
    var s = i.parent;
    return e(i, n[s._id] ||= function (e, t) {
      var n;
      var i;
      var s = e.length;
      var l = [];
      for (n = 0; n < s; ++n) {
        i = t(e[n]);
        if (isFinite(i)) {
          l.push(i);
        }
      }
      return r([o.apply(null, l), a.apply(null, l)]);
    }(s.nodes, t));
  };
}
function l(e, t) {
  var n = t.createGradientPalette(e.palette);
  var o = (0, i.createColorCodeGetter)(e);
  if ("range" in e) {
    return function (e, t) {
      return function (n) {
        return e(n, t);
      };
    }(a, r(e.range || []));
  } else {
    return s(a, o);
  }
  function a(e, t) {
    return n.getColor((o(e) - t[0]) / t[1]);
  }
}
(0, i.addColorizer)("gradient", l);
var u = l;
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;