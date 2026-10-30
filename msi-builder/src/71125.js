exports.hide = function () {
  if (!l) {
    return new r.Deferred().resolve();
  }
  return l.hide().done(u).promise();
};
exports.show = function (e) {
  u();
  return (l = function (e) {
    return new a.default((0, i.default)("<div>").appendTo(e && e.container || (0, o.value)()), e);
  }(e)).show();
};
var i = s(require("./68374.js"));
var o = require("./77695.js");
var a = s(require("./97218.js"));
var r = require("./62754.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = null;
function u() {
  if (l) {
    l.$element().remove();
    l = null;
  }
}