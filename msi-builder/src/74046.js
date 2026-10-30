var i;
function o(e, t) {
  return (o = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.default = undefined;
var a = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  o(t, n);
  var a = i.prototype;
  a._useTemplates = function () {
    return false;
  };
  a._isFocused = function () {
    return this.$element()[0].classList.contains("dx-state-focused");
  };
  a.getSupportedKeyNames = function () {
    return ["space"];
  };
  a.getProps = function () {
    var t = e.prototype.getProps.call(this);
    if (t.value !== null) {
      t.value = Boolean(t.value);
    }
    return t;
  };
  return i;
}(((i = require("./88667.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;