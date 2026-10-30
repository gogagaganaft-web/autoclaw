exports.convertTransitionTimingFuncToEasing = undefined;
exports.getEasing = function (e) {
  return s[e];
};
exports.setEasing = function (e) {
  s = e;
};
var i = require("./35922.js");
var o = /cubic-bezier\((\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\)/;
var a = {
  linear: "cubic-bezier(0, 0, 1, 1)",
  swing: "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
  "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)"
};
function r(e, t, n, i) {
  var o = e * 3;
  var a = (n - e) * 3 - o;
  var r = 1 - o - a;
  var s = t * 3;
  var l = (i - t) * 3 - s;
  var u = 1 - s - l;
  function d(e) {
    return e * (o + e * (a + e * r));
  }
  function c(e) {
    return o + e * (a * 2 + e * 3 * r);
  }
  return function (e) {
    return function (e) {
      return e * (s + e * (l + e * u));
    }(function (e) {
      for (var t, n = e, i = 0; i < 14 && (t = d(n) - e, !(Math.abs(t) < 0.001));) {
        n -= t / c(n);
        i++;
      }
      return n;
    }(e));
  };
}
var s = {};
exports.convertTransitionTimingFuncToEasing = function (e) {
  var t;
  var n = (e = a[e] || e).match(o);
  n ||= a[t = "linear"].match(o);
  n = n.slice(1, 5);
  for (var l = 0; l < n.length; l++) {
    n[l] = parseFloat(n[l]);
  }
  var u = t || "cubicbezier_" + n.join("_").replace(/\./g, "p");
  if (!(0, i.isFunction)(s[u])) {
    s[u] = function (e, t, i, o, a) {
      return o * r(n[0], n[1], n[2], n[3])(t / a) + i;
    };
  }
  return u;
};