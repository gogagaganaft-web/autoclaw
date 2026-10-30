exports.prepareScrollData = exports.allowScroll = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./39611.js");
function r(e, t, n) {
  var i = (0, o.default)(e);
  var a = n ? i.scrollLeft() : i.scrollTop();
  var r = n ? "Width" : "Height";
  var s = i.prop(`scroll${r}`) - i.prop(`client${r}`) - a | 0;
  return (a !== 0 || s !== 0) && (a === 0 && !!(t >= 0) || s === 0 && !!(t <= 0) || !!(a > 0) && !!(s > 0) || undefined);
}
exports.allowScroll = r;
exports.prepareScrollData = function (e, t) {
  var n = (0, o.default)(e);
  return {
    validate: function (i) {
      if ((0, a.isDxMouseWheelEvent)(i) && (s = i.target, !t || (0, o.default)(s).is(e))) {
        return !!r(n, -i.delta, i.shiftKey) && (i._needSkipEvent = true, true);
      }
      var s;
    }
  };
};