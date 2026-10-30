var i = r(require("./94553.js"));
var o = r(require("./55994.js"));
var a = r(require("./69155.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (r(require("./62387.js")).default) {
  i.default.add(function (e) {
    var t = e.slice(0, 2) + e.charAt(2).toUpperCase() + e.slice(3);
    a.default.directive(t, ["$parse", function (n) {
      return function (i, a, r) {
        var s;
        var l = r[t].trim();
        var u = {};
        if (l.charAt(0) === "{") {
          u = i.$eval(l);
          s = n(u.execute);
        } else {
          s = n(r[t]);
        }
        o.default.on(a, e, u, function (e) {
          i.$apply(function () {
            s(i, {
              $event: e
            });
          });
        });
      };
    }]);
  });
}