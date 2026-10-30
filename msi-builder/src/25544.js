exports.default = undefined;
var i = require("./95479.js");
var o = r(require("./24311.js"));
var a = r(require("./73349.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t) {
  o.default.add(function () {
    e.split(" ").forEach(function (e) {
      a.default.listen(a.default.getDocument(), e, t, true);
    });
  });
}
function l(e, t, n) {
  n = n || function () {};
  var o = [];
  function a(e) {
    var n = -1;
    (0, i.each)(o, function (i, o) {
      return !t(e, o) || (n = i, false);
    });
    return n;
  }
  function r(e) {
    var t = a(e);
    if (t > -1) {
      o.splice(t, 1);
    }
  }
  s(e.dxpointerdown, function (e) {
    if (a(e) === -1) {
      n(e);
      o.push(e);
    }
  });
  s(e.dxpointermove, function (e) {
    o[a(e)] = e;
  });
  s(e.dxpointerup, r);
  s(e.dxpointercancel, r);
  this.pointers = function () {
    return o;
  };
  this.reset = function () {
    o = [];
  };
}
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;