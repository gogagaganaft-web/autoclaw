exports.default = undefined;
var i = r(require("./20476.js"));
var o = r(require("./73806.js"));
var a = r(require("./49198.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s;
var l = (0, i.default)({
  locale: (s = "en", function (e) {
    if (!e) {
      return s;
    }
    s = e;
  }),
  getValueByClosestLocale: function (e) {
    for (var t, n = this.locale(), i = e(n); !i && !t;) {
      if (n = (0, a.default)(o.default, n)) {
        i = e(n);
      } else {
        t = true;
      }
    }
    if (i === undefined && n !== "en") {
      return e("en");
    } else {
      return i;
    }
  }
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;