exports.getElementMaxHeightByWindow = undefined;
var i;
var o = require("./58664.js");
var a = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./58201.js");
var s = require("./35922.js");
exports.getElementMaxHeightByWindow = function (e, t) {
  var n;
  var i = (0, a.default)((0, r.getWindow)());
  var l = e.offset().top;
  if ((0, s.isNumeric)(t)) {
    if (t < l) {
      return l - t;
    }
    n = (0, o.getInnerHeight)(i) - t + i.scrollTop();
  } else {
    var u = l - i.scrollTop();
    var d = (0, o.getInnerHeight)(i) - u - (0, o.getOuterHeight)(e);
    n = Math.max(u, d);
  }
  return n * 0.9;
};