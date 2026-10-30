exports.getElementLocationInternal = function (e, t, n, s, l) {
  var u = r({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }, l);
  var d = t === a.DIRECTION_VERTICAL;
  var c = d ? "top" : "left";
  var h = d ? "bottom" : "right";
  var f = d ? "height" : "width";
  var p = n[`offset${(0, i.titleize)(f)}`];
  var g = n[`client${(0, i.titleize)(f)}`];
  var m = n.getBoundingClientRect()[f];
  var _ = e.getBoundingClientRect()[f];
  var v = 1;
  if (Math.abs(m - p) > 1) {
    v = m / p;
  }
  var y = (0, o.getRelativeOffset)(a.SCROLLABLE_CONTENT_CLASS, e)[c] / v;
  var b = s[c];
  var x = b - y + u[c];
  var w = b - y - _ / v + g - u[h];
  if (x <= 0 && w >= 0) {
    return b;
  }
  return b - (Math.abs(x) > Math.abs(w) ? w : x);
};
var i = require("./78008.js");
var o = require("./1515.js");
var a = require("./23842.js");
function r() {
  return (r = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}