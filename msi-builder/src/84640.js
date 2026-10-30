exports.default = undefined;
require("./71042.js");
var i = r(require("./51495.js"));
var o = r(require("./99393.js"));
var a = require("./13306.js");
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var o = i.prototype;
  o._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      preventScrollEvents: false
    });
  };
  o._getToolbarName = function () {
    return "dxToolbar";
  };
  return i;
}(i.default);
exports.default = l;
l.defaultOptions = function (e) {
  i.default.defaultOptions(e);
};
(0, o.default)("dxPopup", l);
module.exports = exports.default;
module.exports.default = exports.default;