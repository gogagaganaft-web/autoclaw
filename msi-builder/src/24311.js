exports.default = undefined;
var i = s(require("./73349.js"));
var o = s(require("./20476.js"));
var a = require("./58201.js");
var r = s(require("./39618.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = [];
var u = (0, r.default)(function () {
  var e = i.default.listen(i.default.getDocument(), "DOMContentLoaded", function () {
    d.fire();
    e();
  });
});
var d = {
  add: function (e) {
    var t = (0, a.hasWindow)();
    if (t && i.default.getReadyState() !== "loading") {
      e();
    } else {
      l.push(e);
      if (t) {
        u();
      }
    }
  },
  fire: function () {
    l.forEach(function (e) {
      return e();
    });
    l = [];
  }
};
var c = (0, o.default)(d);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;