exports.default = undefined;
var i = u(require("./68374.js"));
var o = u(require("./99393.js"));
var a = u(require("./13046.js"));
var r = u(require("./97289.js"));
var s = u(require("./90964.js"));
var l = u(require("./39562.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var a = o.prototype;
  a._getDefaultOptions = function () {
    return e.prototype._getDefaultOptions.call(this);
  };
  a._init = function () {
    e.prototype._init.call(this);
    s.default.addGroup(this);
  };
  a._initMarkup = function () {
    var t = this.$element();
    t.addClass("dx-validationgroup");
    t.find(`.dx-validator`).each(function (e, t) {
      l.default.getInstance((0, i.default)(t))._initGroupRegistration();
    });
    t.find(`.dx-validationsummary`).each(function (e, t) {
      r.default.getInstance((0, i.default)(t)).refreshValidationGroup();
    });
    e.prototype._initMarkup.call(this);
  };
  a.validate = function () {
    return s.default.validateGroup(this);
  };
  a.reset = function () {
    return s.default.resetGroup(this);
  };
  a._dispose = function () {
    s.default.removeGroup(this);
    this.$element().removeClass("dx-validationgroup");
    e.prototype._dispose.call(this);
  };
  a._useTemplates = function () {
    return false;
  };
  return o;
}(a.default);
(0, o.default)("dxValidationGroup", c);
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;