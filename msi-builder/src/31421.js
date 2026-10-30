exports.tabbable = exports.focused = exports.focusable = undefined;
var i = a(require("./68374.js"));
var o = a(require("./73349.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function r(e, t) {
  if (!function (e) {
    var t = (0, i.default)(e);
    return t.is(":visible") && t.css("visibility") !== "hidden" && t.parents().css("visibility") !== "hidden";
  }(e)) {
    return false;
  }
  var n = e.nodeName.toLowerCase();
  var o = !isNaN(t);
  var a = e.disabled;
  var r = /^(input|select|textarea|button|object|iframe)$/.test(n);
  var s = n === "a";
  var l = e.isContentEditable;
  if (r || l) {
    return !a;
  } else {
    return s && e.href || o;
  }
}
exports.focusable = function (e, t) {
  return r(t, (0, i.default)(t).attr("tabIndex"));
};
exports.tabbable = function (e, t) {
  var n = (0, i.default)(t).attr("tabIndex");
  return (isNaN(n) || n >= 0) && r(t, n);
};
exports.focused = function (e) {
  var t = (0, i.default)(e).get(0);
  return o.default.getActiveElement(t) === t;
};