var i = r(require("./96073.js"));
var o = require("./62754.js");
var a = require("./58020.js");
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if ((0, r(require("./72722.js")).default)()) {
  var s = i.default.Deferred;
  var l = {
    Deferred: s
  };
  l.when = (0, a.compare)(i.default.fn.jquery, [3]) < 0 ? i.default.when : function (e) {
    if (arguments.length === 0) {
      return new s().resolve();
    } else if (arguments.length === 1) {
      if (e && e.then) {
        return e;
      } else {
        return new s().resolve(e);
      }
    } else {
      return i.default.when.apply(i.default, arguments);
    }
  };
  (0, o.setStrategy)(l);
}