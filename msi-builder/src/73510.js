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
  i.prototype._getKeyExpr = function () {
    return this._diagramWidget._createOptionGetter("edges.keyExpr");
  };
  return i;
}(((i = require("./4015.js")) && i.__esModule ? i : {
  default: i
}).default);
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;