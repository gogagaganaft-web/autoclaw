exports.default = undefined;
var i;
var o = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
var a = function e(t, n) {
  if (!n) {
    throw o.default.Error("E0017");
  }
  if (Array.isArray(t)) {
    return t.map(function (t) {
      return e(t, n);
    }).join(" ");
  } else if (t.indexOf(" ") !== -1) {
    return e(t.split(/\s+/g), n);
  } else {
    return `${t}.${n}`;
  }
};
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;