Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareItems = function (e, t) {
  function n(e) {
    return e || 1;
  }
  var o = [];
  var a = (e[0] || []).reduce(function (e, t) {
    return e + n(t.colspan);
  }, 0);
  var r = function (e) {
    var t = 0;
    var i = 0;
    return function () {
      var o = e[t] || [];
      var a = o[i++];
      if (i >= o.length) {
        t++;
        i = 0;
      }
      if (a) {
        a.colspan = n(a.colspan);
        a.rowspan = n(a.rowspan);
      }
      return a;
    };
  }(e);
  var s = function e(n, a, r) {
    (o[n] = o[n] || [])[a] = r;
    if (r.colspan > 1 || r.rowspan > 1) {
      var s = function (e) {
        return (0, i.extend)({}, e, t);
      }(r);
      for (var l = 1; l < r.colspan; l++) {
        e(n, a + l, s);
      }
      for (var u = 1; u < r.rowspan; u++) {
        for (var d = 0; d < r.colspan; d++) {
          e(n + u, a + d, s);
        }
      }
    }
  };
  var l = r();
  var u = 0;
  while (l) {
    for (var d = 0; d < a && l; d++) {
      if (!o[u] || !o[u][d]) {
        s(u, d, l);
        d += l.colspan - 1;
        l = r();
      }
    }
    u++;
  }
  return o;
};
var i = require("./13306.js");