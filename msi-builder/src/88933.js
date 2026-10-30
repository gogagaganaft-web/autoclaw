exports.default = undefined;
var i;
var o = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
function a() {
  var e = {};
  function t(t) {
    return e[t] || 0;
  }
  return {
    obtain: function (n) {
      e[n] = t(n) + 1;
    },
    release: function (n) {
      var i = t(n);
      if (i < 1) {
        throw o.default.Error("E0014");
      }
      if (i === 1) {
        delete e[n];
      } else {
        e[n] = i - 1;
      }
    },
    locked: function (e) {
      return t(e) > 0;
    }
  };
}
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;