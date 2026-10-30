exports.hide = function () {
  if (!u) {
    return new r.Deferred().resolve();
  }
  return u.hide().done(c).promise();
};
exports.show = function (e) {
  c();
  (function (e) {
    var t = (e = (0, a.extend)({
      position: "top"
    }, e)).content;
    delete e.content;
    var n = (0, i.default)("<div>").html(t).appendTo((0, s.value)());
    d = function () {
      n.remove();
    };
    u = new o.default(n, e);
  })(e);
  return u.show();
};
var i = l(require("./68374.js"));
var o = l(require("./4731.js"));
var a = require("./13306.js");
var r = require("./62754.js");
var s = require("./77695.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = null;
var d = null;
function c() {
  if (u) {
    d();
    u = null;
  }
}