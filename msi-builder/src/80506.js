exports.triggerShownEvent = exports.triggerResizeEvent = exports.triggerHidingEvent = undefined;
var i = a(require("./68374.js"));
var o = a(require("./55994.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function r(e) {
  return function (t) {
    var n = (0, i.default)(t || "body");
    for (var a = n.filter(".dx-visibility-change-handler").add(n.find(".dx-visibility-change-handler")), r = 0; r < a.length; r++) {
      o.default.triggerHandler(a[r], e);
    }
  };
}
var s = r("dxshown");
exports.triggerShownEvent = s;
var l = r("dxhiding");
exports.triggerHidingEvent = l;
var u = r("dxresize");
exports.triggerResizeEvent = u;