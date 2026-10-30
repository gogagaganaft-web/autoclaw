var i = u(require("./68374.js"));
var o = u(require("./55994.js"));
var a = u(require("./76130.js"));
var r = require("./35922.js");
var s = u(require("./94553.js"));
var l = require("./39611.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (a.default) {
  s.default.add(function (e) {
    var t = (0, l.addNamespace)(e, e + "Binding");
    a.default.bindingHandlers[e] = {
      update: function (e, n, s, l) {
        var u = (0, i.default)(e);
        var d = a.default.utils.unwrapObservable(n());
        var c = d.execute ? d.execute : d;
        o.default.off(u, t);
        o.default.on(u, t, (0, r.isPlainObject)(d) ? d : {}, function (e) {
          c.call(l, l, e);
        });
      }
    };
  });
}