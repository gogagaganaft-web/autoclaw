exports.getCurrentTemplateEngine = function () {
  return r;
};
exports.registerTemplateEngine = function (e, t) {
  s[e] = t;
};
exports.setTemplateEngine = function (e) {
  if ((0, o.isString)(e)) {
    if (!(r = s[e])) {
      throw a.default.Error("E0020", e);
    }
  } else {
    r = e;
  }
};
var i;
var o = require("./35922.js");
var a = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
var r;
var s = {};