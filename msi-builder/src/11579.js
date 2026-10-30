var i = a(require("./44504.js"));
var o = a(require("./69155.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (a(require("./62387.js")).default) {
  o.default.service("dxDigestCallbacks", ["$rootScope", function (e) {
    var t = (0, i.default)();
    var n = (0, i.default)();
    var o = (0, i.default)();
    var a = false;
    e.$watch(function () {
      if (!a) {
        a = true;
        t.fire();
        e.$$postDigest(function () {
          a = false;
          n.fire();
          o.fire();
        });
      }
    });
    return {
      begin: {
        add: function (e) {
          if (a) {
            e();
          }
          t.add(e);
        },
        remove: t.remove.bind(t)
      },
      end: {
        add: o.add.bind(o),
        addPrioritized: n.add.bind(n),
        remove: o.remove.bind(o)
      }
    };
  }]);
}