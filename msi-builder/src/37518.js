exports.getDefaultAlignment = exports.getBoundingRect = undefined;
var i;
var o = (i = require("./80209.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
exports.getDefaultAlignment = function (e) {
  if (e ?? (0, o.default)().rtlEnabled) {
    return "right";
  } else {
    return "left";
  }
};
exports.getBoundingRect = function (e) {
  if ((0, a.isWindow)(e)) {
    return {
      width: e.outerWidth,
      height: e.outerHeight
    };
  } else {
    return e.getBoundingClientRect();
  }
};