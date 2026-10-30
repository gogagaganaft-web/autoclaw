exports.default = undefined;
var n = {
  getFigures: function (e) {
    var t = 1 / e.length;
    return e.map(function (e, n, i) {
      var o = i[n + 1] ? i[n + 1] : i[n];
      return [0.5 - e / 2, t * n, 0.5 + e / 2, t * n, 0.5 + o / 2, t * (n + 1), 0.5 - o / 2, t * (n + 1)];
    });
  },
  normalizeValues: function (e) {
    var t = e.reduce(function (e, t) {
      return Math.max(t.value, e);
    }, e[0] && e[0].value || 0);
    return e.map(function (e) {
      return e.value / t;
    });
  }
};
exports.default = n;
module.exports = exports.default;
module.exports.default = exports.default;