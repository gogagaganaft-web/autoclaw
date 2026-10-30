exports.EmptyTemplate = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
function a(e, t) {
  return (a = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var r = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  a(t, n);
  i.prototype._renderCore = function () {
    return (0, o.default)();
  };
  return i;
}(require("./81033.js").TemplateBase);
exports.EmptyTemplate = r;