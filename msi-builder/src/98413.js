Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEachGroup = exports.default = undefined;
var n = function e(t, n, i) {
  t = t || [];
  i = i || 0;
  for (var o = 0; o < t.length; o += 1) {
    var a = t[o];
    n(a, i);
    if (a && a.items && a.items.length) {
      e(a.items, n, i + 1);
    }
  }
};
exports.forEachGroup = n;
var i = {
  forEachGroup: n
};
exports.default = i;