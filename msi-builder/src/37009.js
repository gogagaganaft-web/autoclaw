exports.default = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
function a(e, t, n) {
  var i = o.default.dateToMilliseconds("hour");
  var a = o.default.trimTime(e).getTime();
  for (var r = o.default.setToDayEnd(new Date(t.getTime() - 1)).getTime(), s = i * 24, l = 0, u = a; u < r; u += s) {
    var d = new Date(u);
    if (n.isSkippedDate(d)) {
      l += 24;
    }
  }
  return l;
}
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;