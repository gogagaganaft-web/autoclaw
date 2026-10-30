exports.default = undefined;
var i;
var o;
var a = (i = require("./9549.js")) && i.__esModule ? i : {
  default: i
};
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
if (a.default) {
  o = function (e) {
    var t;
    var n;
    function i(t, n) {
      var i;
      (i = e.call(this, t, n) || this).quill.root.classList.add("dx-htmleditor-content");
      i.quill.root.setAttribute("role", "textbox");
      i.quill.root.setAttribute("aria-label", "Editor content");
      return i;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    r(t, n);
    return i;
  }(a.default.import("core/theme"));
} else {
  o = {};
}
var s = o;
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;