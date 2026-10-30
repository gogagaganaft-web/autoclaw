function i(e, t) {
  return (i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
exports.ChildDefaultTemplate = undefined;
var o = function (e) {
  var t;
  var n;
  function o(t) {
    var n;
    (n = e.call(this) || this).name = t;
    return n;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  i(t, n);
  return o;
}(require("./81033.js").TemplateBase);
exports.ChildDefaultTemplate = o;