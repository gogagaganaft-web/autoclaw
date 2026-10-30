exports.default = undefined;
var i = a(require("./38148.js"));
var o = a(require("./72321.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var s = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  r(t, n);
  i.prototype._getCommands = function () {
    return o.default.getPropertiesToolbarCommands();
  };
  return i;
}(i.default);
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;