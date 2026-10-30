exports.getSizeValue = exports.getElementWidth = undefined;
var i = require("./58664.js");
var o = require("./58201.js");
exports.getElementWidth = function (e) {
  if ((0, o.hasWindow)()) {
    return (0, i.getOuterWidth)(e);
  }
};
exports.getSizeValue = function (e) {
  if (e === null) {
    e = undefined;
  }
  if (typeof e == "function") {
    e = e();
  }
  return e;
};