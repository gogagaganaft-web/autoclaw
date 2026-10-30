exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./77695.js");
var r = {
  getSwatchContainer: function (e) {
    var t = (0, o.default)(e).closest(`[class^="dx-swatch-"], [class*=" dx-swatch-"]`);
    var n = (0, a.value)();
    if (!t.length) {
      return n;
    }
    var i = new RegExp(`(\\s|^)(dx-swatch-.*?)(\\s|\$)`);
    var r = t[0].className.match(i)[2];
    var s = n.children("." + r);
    if (!s.length) {
      s = (0, o.default)("<div>").addClass(r).appendTo(n);
    }
    return s;
  }
};
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;