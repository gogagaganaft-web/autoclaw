exports.default = undefined;
var i;
var o = require("./95479.js");
var a = (i = require("./94553.js")) && i.__esModule ? i : {
  default: i
};
function r(e, t) {
  var n = {};
  if ("noBubble" in t) {
    n.noBubble = t.noBubble;
  }
  if ("bindType" in t) {
    n.bindType = t.bindType;
  }
  if ("delegateType" in t) {
    n.delegateType = t.delegateType;
  }
  (0, o.each)(["setup", "teardown", "add", "remove", "trigger", "handle", "_default", "dispose"], function (e, i) {
    if (t[i]) {
      n[i] = function () {
        var e = [].slice.call(arguments);
        e.unshift(this);
        return t[i].apply(t, e);
      };
    }
  });
  a.default.fire(e, n);
}
r.callbacks = a.default;
var s = r;
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;