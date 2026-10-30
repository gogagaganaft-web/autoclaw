exports.getElementContentWidth = function (e) {
  var t = r("paddingLeft", e) + r("paddingRight", e);
  return r("width", e) - t;
};
exports.getElementMinWidth = function (e) {
  return r("minWidth", e);
};
exports.getElementStyle = r;
exports.getElementWidth = function (e) {
  var t = r("marginLeft", e) + r("marginRight", e);
  var n = r("width", e);
  return t + n;
};
var i;
var o = (i = require("./89357.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./78461.js");
function r(e, t) {
  var i = (0, o.default)(t) ?? {};
  return (0, a.toNumber)(i[e]);
}