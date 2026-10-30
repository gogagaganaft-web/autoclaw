exports.Template = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./81033.js");
var r = require("./3532.js");
var s = require("./72987.js");
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
(0, s.registerTemplateEngine)("default", {
  compile: function (e) {
    return (0, r.normalizeTemplateElement)(e);
  },
  render: function (e, t, n) {
    return e.clone();
  }
});
(0, s.setTemplateEngine)("default");
var u = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this) || this)._element = t;
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var a = i.prototype;
  a._renderCore = function (e) {
    var t = e.transclude;
    if (!t && !this._compiledTemplate) {
      this._compiledTemplate = (0, s.getCurrentTemplateEngine)().compile(this._element);
    }
    return (0, o.default)("<div>").append(t ? this._element : (0, s.getCurrentTemplateEngine)().render(this._compiledTemplate, e.model, e.index)).contents();
  };
  a.source = function () {
    return (0, o.default)(this._element).clone();
  };
  return i;
}(a.TemplateBase);
exports.Template = u;