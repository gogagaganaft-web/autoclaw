exports.default = undefined;
var i = require("./58201.js");
var o = l(require("./73349.js"));
var a = l(require("./44504.js"));
var r = l(require("./24311.js"));
var s = l(require("./39618.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = function () {
  var e;
  var t = (0, a.default)();
  var n = t.add;
  var l = t.remove;
  if (!(0, i.hasWindow)()) {
    return t;
  }
  var u;
  function d() {
    var e = (0, i.getWindow)();
    return {
      width: e.innerWidth,
      height: e.innerHeight
    };
  }
  function c() {
    var n;
    var i = d();
    if (i.width !== e.width || i.height !== e.height) {
      if (i.width === e.width) {
        n = "height";
      }
      if (i.height === e.height) {
        n = "width";
      }
      e = i;
      t.fire(n);
    }
  }
  var h = (0, s.default)(function () {
    e = d();
  });
  t.add = function () {
    var e = n.apply(t, arguments);
    h();
    r.default.add(function () {
      if (!u && t.has()) {
        u = o.default.listen((0, i.getWindow)(), "resize", c);
      }
    });
    return e;
  };
  t.remove = function () {
    var e = l.apply(t, arguments);
    if (!t.has() && u) {
      u();
      u = undefined;
    }
    return e;
  };
  return t;
}();
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;