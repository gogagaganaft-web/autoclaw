exports.default = undefined;
var i = require("./19910.js");
function o(e, t) {
  var n = e.range || [];
  var o = t.createDiscretePalette(e.palette, n.length - 1);
  var a = (0, i.createColorCodeGetter)(e);
  return function (e) {
    return o.getColor(function (e, t) {
      var n;
      var i = 0;
      var o = t.length - 1;
      var a = -1;
      if (t[i] <= e && e <= t[o]) {
        if (e === t[o]) {
          a = o - 1;
        } else {
          while (o - i > 1) {
            if (e < t[n = i + o >> 1]) {
              o = n;
            } else {
              i = n;
            }
          }
          a = i;
        }
      }
      return a;
    }(a(e), n));
  };
}
(0, i.addColorizer)("range", o);
var a = o;
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;