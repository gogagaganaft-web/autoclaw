Object.defineProperty(exports, "projection", {
  enumerable: true,
  get: function () {
    return i.projection;
  }
});
var i = require("./14316.js");
var o = Math.min;
var a = Math.max;
var r = Math.sin;
var s = Math.asin;
var l = Math.tan;
var u = Math.atan;
var d = Math.exp;
var c = Math.log;
var h = Math.PI;
var f = h / 4;
var p = h / 180;
var g = (u(d(h)) * 2 - h / 2) / p;
var m = (u(d(h * 0.8)) * 2.5 - h * 0.625) / p;
function _(e, t) {
  return a(o(e, +t), -t);
}
i.projection.add("mercator", (0, i.projection)({
  aspectRatio: 1,
  to: function (e) {
    return [e[0] / 180, c(l(f + _(e[1], g) * p / 2)) / h];
  },
  from: function (e) {
    return [e[0] * 180, (u(d(e[1] * h)) * 2 - h / 2) / p];
  }
}));
i.projection.add("equirectangular", (0, i.projection)({
  aspectRatio: 2,
  to: function (e) {
    return [e[0] / 180, e[1] / 90];
  },
  from: function (e) {
    return [e[0] * 180, e[1] * 90];
  }
}));
i.projection.add("lambert", (0, i.projection)({
  aspectRatio: 2,
  to: function (e) {
    return [e[0] / 180, r(_(e[1], 90) * p)];
  },
  from: function (e) {
    return [e[0] * 180, s(_(e[1], 1)) / p];
  }
}));
i.projection.add("miller", (0, i.projection)({
  aspectRatio: 1,
  to: function (e) {
    return [e[0] / 180, c(l(f + _(e[1], m) * p * 0.4)) * 1.25 / h];
  },
  from: function (e) {
    return [e[0] * 180, (u(d(e[1] * 0.8 * h)) * 2.5 - h * 0.625) / p];
  }
}));