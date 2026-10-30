exports.default = undefined;
var i;
var o = (i = require("./17381.js")) && i.__esModule ? i : {
  default: i
};
var a;
var r;
var s = (0, require("./58201.js").getWindow)();
function l(e) {
  var t;
  this.config = e;
  a = s.location.protocol === "ms-appx:";
  t = s.location.hostname;
  r = /^(localhost$|127\.)/i.test(t);
}
l.prototype = {
  urlFor: function (e) {
    var t = this.config[e];
    if (!t) {
      throw o.default.Error("E0006");
    }
    if (t.production && (a && !Debug.debuggerEnabled || !a && !r)) {
      return t.production;
    } else {
      return t.local;
    }
  }
};
var u = l;
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;