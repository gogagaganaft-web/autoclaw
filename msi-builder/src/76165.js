exports.NgTemplate = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./81033.js");
var r = require("./35922.js");
var s = require("./3532.js");
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = function (e) {
  var t;
  var n;
  function i(t, n) {
    var i;
    (i = e.call(this) || this)._element = t;
    i._compiledTemplate = n((0, s.normalizeTemplateElement)(i._element));
    return i;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var a = i.prototype;
  a._renderCore = function (e) {
    var t = this._compiledTemplate;
    if ((0, r.isFunction)(t)) {
      return t(e);
    } else {
      return t;
    }
  };
  a.source = function () {
    return (0, o.default)(this._element).clone();
  };
  return i;
}(a.TemplateBase);
exports.NgTemplate = u;