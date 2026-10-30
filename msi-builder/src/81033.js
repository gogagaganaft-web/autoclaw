exports.renderedCallbacks = exports.TemplateBase = undefined;
var i = u(require("./68374.js"));
var o = u(require("./73349.js"));
var a = u(require("./44504.js"));
var r = require("./3532.js");
var s = require("./80506.js");
var l = u(require("./17381.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = (0, a.default)({
  syncStrategy: true
});
exports.renderedCallbacks = d;
var c = function () {
  function e() {}
  var t = e.prototype;
  t.render = function (e) {
    var t;
    var n = (e = e || {}).onRendered;
    delete e.onRendered;
    t = e.renovated && e.transclude && this._element ? (0, i.default)("<div>").append(this._element).contents() : this._renderCore(e);
    this._ensureResultInContainer(t, e.container);
    d.fire(t, e.container);
    if (n) {
      n();
    }
    return t;
  };
  t._ensureResultInContainer = function (e, t) {
    if (t) {
      var n = (0, i.default)(t);
      var a = (0, r.contains)(n.get(0), e.get(0));
      n.append(e);
      if (!a) {
        if (o.default.getBody().contains(n.get(0))) {
          (0, s.triggerShownEvent)(e);
        }
      }
    }
  };
  t._renderCore = function () {
    throw l.default.Error("E0001");
  };
  return e;
}();
exports.TemplateBase = c;