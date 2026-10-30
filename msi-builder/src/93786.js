function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = h(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./60137.js"));
var a = require("./95479.js");
var r = c(require("./20530.js"));
var s = c(require("./85788.js"));
var l = c(require("./69120.js"));
var u = c(require("./66509.js"));
var d = c(require("./87720.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (h = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
var f = function (e, t) {
  var n = t.tablet;
  var i = t.phone;
  if (!e.touch || n || i) {
    if (e.touch) {
      return l.default;
    } else {
      return u.default;
    }
  } else {
    return d.default;
  }
}(o, r.default.real());
(0, a.each)(f.map, function (e, t) {
  (0, s.default)(e, new f(e, t));
});
var p = {
  down: "dxpointerdown",
  up: "dxpointerup",
  move: "dxpointermove",
  cancel: "dxpointercancel",
  enter: "dxpointerenter",
  leave: "dxpointerleave",
  over: "dxpointerover",
  out: "dxpointerout"
};
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;