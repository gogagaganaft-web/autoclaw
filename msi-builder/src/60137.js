exports.pointerEvents = exports.nativeScrolling = exports.inputType = exports.animation = undefined;
Object.defineProperty(exports, "styleProp", {
  enumerable: true,
  get: function () {
    return s.styleProp;
  }
});
Object.defineProperty(exports, "stylePropPrefix", {
  enumerable: true,
  get: function () {
    return s.stylePropPrefix;
  }
});
exports.transitionEndEventName = exports.transition = exports.touchEvents = exports.touch = exports.supportProp = undefined;
var i = l(require("./73349.js"));
var o = l(require("./39618.js"));
var a = require("./58201.js");
var r = l(require("./20530.js"));
var s = require("./80968.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = (0, a.getNavigator)().maxTouchPoints;
var d = {
  webkitTransition: "webkitTransitionEnd",
  MozTransition: "transitionend",
  OTransition: "oTransitionEnd",
  transition: "transitionend"
};
function c(e) {
  return !!(0, s.styleProp)(e);
}
exports.supportProp = c;
exports.inputType = function (e) {
  if (e === "text") {
    return true;
  }
  var t = i.default.createElement("input");
  try {
    t.setAttribute("type", e);
    t.value = "wrongValue";
    return !t.value;
  } catch (e) {
    return false;
  }
};
var h = function (e, t) {
  return (e("ontouchstart") || !!t) && !e("callPhantom");
}(a.hasProperty, u);
exports.touchEvents = h;
var f = (0, a.hasProperty)("PointerEvent");
exports.pointerEvents = f;
var p = h || f && !!u;
exports.touch = p;
var g = (0, o.default)(function () {
  return c("transition");
});
exports.transition = g;
var m = (0, o.default)(function () {
  return d[(0, s.styleProp)("transition")];
});
exports.transitionEndEventName = m;
var _ = (0, o.default)(function () {
  return c("animation");
});
exports.animation = _;
var v;
var y;
var b;
v = r.default.real();
y = v.platform;
b = v.mac;
var x = y === "ios" || y === "android" || b;
exports.nativeScrolling = x;