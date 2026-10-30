exports.default = function (e, t, n) {
  var o;
  var a = e.items;
  var l = a.length;
  var u = {
    sum: e.sum,
    rect: e.rect,
    directions: e.directions,
    accumulate: t
  };
  if (n) {
    u.staticSideIndex = (0, i.getStaticSideIndex)(u.rect);
  }
  a.sort(r);
  o = 0;
  while (o < l) {
    o = s(a, o, u);
  }
};
var i = require("./60642.js");
var o = Math.max;
var a = Math.round;
function r(e, t) {
  return t.value - e.value;
}
function s(e, t, n) {
  var r;
  var s = (0, i.buildSidesData)(n.rect, n.directions, n.staticSideIndex);
  var l = ((r = n.rect)[2] - r[0]) * (r[3] - r[1]);
  var u = l > 0 ? function (e, t, n) {
    var i;
    var r;
    var s;
    var l;
    var u;
    var d;
    var c = Infinity;
    var h = 0;
    var f = e.length;
    var p = n.areaToValue / n.staticSide;
    for (s = t; s < f;) {
      r = h + e[s].value;
      u = n.staticSide / p / r;
      i = 0;
      l = t;
      for (; l <= s; ++l) {
        i = n.accumulate(i, (d = u * e[l].value / r, o(d, 1 / d)), l - t + 1);
      }
      if (!(i < c)) {
        break;
      }
      c = i;
      h = r;
      ++s;
    }
    return {
      sum: h,
      count: s - t,
      side: a(p * h)
    };
  }(e, t, {
    areaToValue: l / n.sum,
    accumulate: n.accumulate,
    staticSide: s.staticSide
  }) : {
    sum: 1,
    side: s.variedSide,
    count: e.length - t
  };
  (0, i.calculateRectangles)(e, t, n.rect, s, u);
  n.sum -= u.sum;
  return t + u.count;
}
module.exports = exports.default;
module.exports.default = exports.default;