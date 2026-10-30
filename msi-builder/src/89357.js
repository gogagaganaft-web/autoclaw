exports.default = function (e) {
  var t;
  var n = (0, i.getWindow)();
  if (e) {
    if ((t = n.getComputedStyle) === null || t === undefined) {
      return undefined;
    } else {
      return t.call(n, e);
    }
  } else {
    return null;
  }
};
var i = require("./58201.js");
module.exports = exports.default;
module.exports.default = exports.default;