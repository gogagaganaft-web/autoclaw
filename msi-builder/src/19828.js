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
exports.subscribeToDxInactiveEvent = exports.subscribeToDxHoverStartEvent = exports.subscribeToDxHoverEndEvent = exports.subscribeToDxFocusOutEvent = exports.subscribeToDxFocusInEvent = exports.subscribeToDxActiveEvent = exports.subscribeToDXScrollStopEvent = exports.subscribeToDXScrollStartEvent = exports.subscribeToDXScrollMoveEvent = exports.subscribeToDXScrollEndEvent = exports.subscribeToDXScrollCancelEvent = exports.subscribeToDXPointerUpEvent = exports.subscribeToDXPointerMoveEvent = exports.subscribeToDXPointerDownEvent = exports.subscribeToClickEvent = undefined;
exports.subscribeToEvent = c;
exports.subscribeToScrollInitEvent = exports.subscribeToScrollEvent = exports.subscribeToMouseLeaveEvent = exports.subscribeToMouseEnterEvent = exports.subscribeToKeyDownEvent = undefined;
var o = d(require("./55994.js"));
var a = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = u(t);
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
}(require("./95429.js"));
var r = require("./39611.js");
var s = d(require("./37334.js"));
var l = d(require("./93786.js"));
function u(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (u = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e) {
  return function (t, n, i, a) {
    var s = a ? (0, r.addNamespace)(e, a) : e;
    if (n) {
      o.default.on(t, s, i, n);
      return function () {
        o.default.off(t, s, n);
      };
    }
  };
}
var h = c(a.name);
exports.subscribeToClickEvent = h;
var f = c(s.default.scroll);
exports.subscribeToScrollEvent = f;
var p = c(s.default.init);
exports.subscribeToScrollInitEvent = p;
var g = c(s.default.start);
exports.subscribeToDXScrollStartEvent = g;
var m = c(s.default.move);
exports.subscribeToDXScrollMoveEvent = m;
var _ = c(s.default.end);
exports.subscribeToDXScrollEndEvent = _;
var v = c(s.default.stop);
exports.subscribeToDXScrollStopEvent = v;
var y = c(s.default.cancel);
exports.subscribeToDXScrollCancelEvent = y;
var b = c(l.default.down);
exports.subscribeToDXPointerDownEvent = b;
var x = c(l.default.up);
exports.subscribeToDXPointerUpEvent = x;
var w = c(l.default.move);
exports.subscribeToDXPointerMoveEvent = w;
var C = c("mouseenter");
exports.subscribeToMouseEnterEvent = C;
var S = c("mouseleave");
exports.subscribeToMouseLeaveEvent = S;
var k = c("keydown");
exports.subscribeToKeyDownEvent = k;
var D = c("dxactive");
exports.subscribeToDxActiveEvent = D;
var I = c("dxinactive");
exports.subscribeToDxInactiveEvent = I;
var T = c("dxhoverstart");
exports.subscribeToDxHoverStartEvent = T;
var E = c("dxhoverend");
exports.subscribeToDxHoverEndEvent = E;
var O = c("focusin");
exports.subscribeToDxFocusInEvent = O;
var A = c("focusout");
exports.subscribeToDxFocusOutEvent = A;