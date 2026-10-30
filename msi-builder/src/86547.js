exports.default = undefined;
var i;
var o = (i = require("./65538.js")) && i.__esModule ? i : {
  default: i
};
var a = {
  validate: function (e, t) {
    var n = null;
    if (this._hasCycle(e)) {
      n = "E2006";
      t("E2006");
    }
    return n;
  },
  _hasCycle: function (e) {
    return o.default.struct.hasCycle(e);
  }
};
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;