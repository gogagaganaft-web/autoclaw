exports.default = undefined;
var i;
var o = require("./30869.js");
var a = (0, ((i = require("./20476.js")) && i.__esModule ? i : {
  default: i
}).default)({
  isWrapped: function () {
    return false;
  },
  isWritableWrapped: function () {
    return false;
  },
  wrap: function (e) {
    return e;
  },
  unwrap: function (e) {
    return e;
  },
  assign: function () {
    o.logger.error("Method 'assign' should not be used for not wrapped variables. Use 'isWrapped' method for ensuring.");
  }
});
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;