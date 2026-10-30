exports.default = undefined;
var n = {
  getFigures: function (e, t, n) {
    var i = 0;
    var o = 0;
    var a = 0;
    var r = 0;
    var s = t / 2;
    var l = 0.5 - s;
    var u = 1 - n;
    var d = 0.5 - s;
    var c = 0.5 + s;
    return e.map(function (e) {
      a = r;
      o = i;
      r = l * (i += e) / u;
      if (o <= u && i <= u) {
        return [a, o, 1 - a, o, 1 - r, i, 0 + r, i];
      } else if (o <= u && i > u) {
        return [a, o, 1 - a, o, c, u, c, i, d, i, d, u];
      } else {
        return [d, o, c, o, c, i, d, i];
      }
    });
  },
  normalizeValues: function (e) {
    var t = e.reduce(function (e, t) {
      return e + t.value;
    }, 0);
    return e.map(function (e) {
      return e.value / t;
    });
  }
};
exports.default = n;
module.exports = exports.default;
module.exports.default = exports.default;