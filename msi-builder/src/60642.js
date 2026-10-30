exports.addAlgorithm = function (e, t) {
  s[e] = t;
};
exports.buildSidesData = function (e, t, n) {
  var i = n !== undefined ? n : u(e);
  var o = 1 - i;
  var a = t[i];
  var r = t[o];
  var s = l[a];
  var d = l[r];
  return {
    staticSide: e[2 + i] - e[i],
    variedSide: e[2 + o] - e[o],
    static1: i + s[0],
    static2: i + s[1],
    varied1: o + d[0],
    varied2: o + d[1],
    staticDir: a,
    variedDir: r
  };
};
exports.calculateRectangles = function (e, t, n, i, o) {
  var a;
  var s;
  var l;
  var u;
  var d = [0, 0, 0, 0];
  var c = i.static1;
  var h = i.static2;
  var f = n[c];
  var p = i.staticDir;
  var g = i.staticSide;
  var m = o.sum;
  d[i.varied1] = n[i.varied1];
  d[i.varied2] = n[i.varied1] + i.variedDir * o.side;
  a = t;
  s = t + o.count;
  for (; a < s; ++a) {
    (l = d.slice())[c] = f;
    u = r(g * e[a].value / m) || 0;
    m -= e[a].value;
    g -= u;
    f += p * u;
    l[h] = f;
    e[a].rect = l;
  }
  n[i.varied1] = d[i.varied2];
};
exports.getAlgorithm = function (e) {
  return s[(0, a.normalizeEnum)(e)] || (0, o.isFunction)(e) && e || i;
};
exports.getStaticSideIndex = undefined;
exports.setDefaultAlgorithm = function (e) {
  i = s[e];
};
var i;
var o = require("./35922.js");
var a = require("./19157.js");
var r = Math.round;
var s = {};
var l = {
  "-1": [2, 0],
  1: [0, 2]
};
function u(e) {
  if (e[2] - e[0] < e[3] - e[1]) {
    return 0;
  } else {
    return 1;
  }
}
exports.getStaticSideIndex = u;