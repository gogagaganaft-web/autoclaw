Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createColumnsInfo = function (e, t, n) {
  var a = [];
  o(e, function (e, o, r) {
    var s;
    var l = e;
    var u = l.colspan || 1;
    var d = o + u - 1 >= t && o < n;
    a[r] = a[r] || [];
    if (d) {
      if (o < t) {
        s = u - (t - o);
        o = t;
      } else {
        s = u;
      }
      if (o + s > n) {
        s = n - o;
      }
      if (s !== u) {
        l = (0, i.extend)({}, l, {
          colspan: s
        });
      }
      a[r].push(l);
    } else if (o > n) {
      return false;
    }
  });
  for (var r = 0; r < a.length; r++) {
    a[r] = a[r] || [];
  }
  return a;
};
exports.foreachColumnInfo = o;
var i = require("./13306.js");
function o(e, t, n, i, a, r) {
  r = r || [];
  (i = i || [])[n = n || 0] = i[n] || 0;
  var s;
  var l = e[n];
  var u = r[n] + 1 || 0;
  var d = 0;
  if (l) {
    for (s = u; s < l.length; s++) {
      var c = l[s];
      var h = s + i[n];
      var f = c.colspan || 1;
      o(e, t, n + (c.rowspan || 1), i, f, r);
      i[n] += f - 1;
      d += f;
      if (c.rowspan) {
        for (var p = n + 1; p < n + c.rowspan; p++) {
          i[p] = i[p] || 0;
          i[p] += c.colspan || 1;
        }
      }
      if (t(c, h, n, s) === false) {
        break;
      }
      if (a !== undefined && d >= a) {
        break;
      }
    }
    r[n] = s;
  }
}