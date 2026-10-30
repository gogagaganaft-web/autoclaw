exports.FunctionTemplate = undefined;
var i = require("./81033.js");
var o = require("./3532.js");
function a(e, t) {
  return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var r = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this) || this)._render = t;
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  a(t, n);
  i.prototype._renderCore = function (e) {
    return (0, o.normalizeTemplateElement)(this._render(e));
  };
  return i;
}(i.TemplateBase);
exports.FunctionTemplate = r;