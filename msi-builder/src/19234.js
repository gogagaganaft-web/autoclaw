exports.getAreaFromObject = exports.getAreaFromElement = exports.filterOffsets = exports.borderWidthStyles = undefined;
exports.getDragOffsets = function (e, t, n) {
  var o = (0, a.getOuterWidth)(t);
  var r = (0, a.getOuterHeight)(t);
  var s = (0, a.getOffset)(t);
  var l = e.offset;
  var u = (0, i.isWindow)(n);
  var d = {
    scrollX: u ? n.pageXOffset : 0,
    scrollY: u ? n.pageYOffset : 0
  };
  return {
    maxLeftOffset: s.left - l.left - d.scrollX,
    maxRightOffset: l.left + e.width - s.left - o + d.scrollX,
    maxTopOffset: s.top - l.top - d.scrollY,
    maxBottomOffset: l.top + e.height - s.top - r + d.scrollY
  };
};
exports.getMovingSides = undefined;
var i = require("./35922.js");
var o = require("./13306.js");
var a = require("./58664.js");
var r = {
  left: "borderLeftWidth",
  top: "borderTopWidth",
  right: "borderRightWidth",
  bottom: "borderBottomWidth"
};
function s(e, t) {
  if (!(0, i.isWindow)(e)) {
    var n = e.style[r[t]];
    return parseInt(n, 10) || 0;
  }
  return 0;
}
exports.borderWidthStyles = r;
function l(e, t, n = undefined) {
  var i = e.height;
  var o = e.offset;
  var r = e.width;
  var l = o.left;
  var u = o.top;
  var d = n ? s(n, "left") : 0;
  var c = n ? s(n, "top") : 0;
  return {
    width: r - (0, a.getOuterWidth)(t) - (0, a.getInnerWidth)(t),
    height: i - (0, a.getOuterHeight)(t) - (0, a.getInnerHeight)(t),
    offset: {
      left: l + d + s(t, "left"),
      top: u + c + s(t, "top")
    }
  };
}
exports.getAreaFromElement = function (e, t) {
  return l({
    width: (0, a.getInnerWidth)(e),
    height: (0, a.getInnerHeight)(e),
    offset: (0, o.extend)({
      top: 0,
      left: 0
    }, (0, i.isWindow)(e) ? {} : (0, a.getOffset)(e))
  }, t, e);
};
exports.getAreaFromObject = function (e, t) {
  var n = e.bottom;
  var i = e.left;
  var o = e.right;
  var a = e.top;
  return l({
    width: o - i,
    height: n - a,
    offset: {
      left: i,
      top: a
    }
  }, t);
};
function u(e) {
  var t = e.className;
  var n = t.includes("dx-resizable-handle-corner-top-left");
  var i = t.includes("dx-resizable-handle-corner-top-right");
  var o = t.includes("dx-resizable-handle-corner-bottom-left");
  var a = t.includes("dx-resizable-handle-corner-bottom-right");
  return {
    top: t.includes("dx-resizable-handle-top") || n || i,
    left: t.includes("dx-resizable-handle-left") || n || o,
    bottom: t.includes("dx-resizable-handle-bottom") || o || a,
    right: t.includes("dx-resizable-handle-right") || i || a
  };
}
exports.getMovingSides = u;
exports.filterOffsets = function (e, t) {
  var n = u(t);
  return {
    x: n.left || n.right ? e.x : 0,
    y: n.top || n.bottom ? e.y : 0
  };
};