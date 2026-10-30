exports.getDefaultFontSize = l;
exports.getDefaultIconSize = s;
exports.getFontSizeByIconSize = function (e, t) {
  var n = l(t);
  var i = s();
  var o = n / i;
  return Math.ceil(o * e);
};
var i = require("./75811.js");
var o = [[22, 16], [18, 16]];
var a = [[[12, 8], [20, 18]], [[16, 10], [16, 14]]];
function r() {
  var e = (0, i.current)();
  return {
    isMaterialTheme: (0, i.isMaterial)(e),
    isCompactTheme: (0, i.isCompact)(e)
  };
}
function s() {
  var e = r();
  var t = e.isCompactTheme;
  var n = e.isMaterialTheme;
  return o[+n][+t];
}
function l(e) {
  var t = r();
  var n = t.isCompactTheme;
  var i = t.isMaterialTheme;
  return a[+e][+i][+n];
}