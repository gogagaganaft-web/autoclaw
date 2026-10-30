exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
function a(e) {
  var t = (0, o.default)(`.dx-toast`).toArray();
  if (arguments.length) {
    var n = (0, o.default)(e).get(0);
    t.map(function (e) {
      return (0, o.default)(e).dxToast("instance");
    }).filter(function (e) {
      var t = (0, o.default)(e.option("container")).get(0);
      return n === t && n;
    }).forEach(function (e) {
      e.hide();
    });
  } else {
    t.forEach(function (e) {
      (0, o.default)(e).dxToast("hide");
    });
  }
}
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;