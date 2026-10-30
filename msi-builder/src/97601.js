exports.default = undefined;
var i;
var o = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
function a(e, t) {
  var n = o.default.trimTime(e);
  var i = o.default.trimTime(t);
  i.setDate(i.getDate() + 1);
  return [n, i];
}
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;