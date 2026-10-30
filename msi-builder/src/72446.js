exports.default = undefined;
var i;
var o = (i = require("./9549.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./35922.js");
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var s = {};
if (o.default) {
  (s = function (e) {
    var t;
    var n;
    function i() {
      return e.apply(this, arguments) || this;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    r(t, n);
    i.create = function (t) {
      var n = t && t.src || t;
      var i = e.create.call(this, n);
      if ((0, a.isObject)(t)) {
        function o(e, n) {
          if (t[e]) {
            i.setAttribute(e, n);
          }
        }
        o("alt", t.alt);
        o("width", t.width);
        o("height", t.height);
      }
      return i;
    };
    i.formats = function (t) {
      var n = e.formats.call(this, t);
      n.imageSrc = t.getAttribute("src");
      return n;
    };
    var o = i.prototype;
    o.formats = function () {
      var t = e.prototype.formats.call(this);
      var n = this.domNode.style.float;
      if (n) {
        t.float = n;
      }
      return t;
    };
    o.format = function (t, n) {
      if (t === "float") {
        this.domNode.style[t] = n;
      } else {
        e.prototype.format.call(this, t, n);
      }
    };
    i.value = function (e) {
      return {
        src: e.getAttribute("src"),
        width: e.getAttribute("width"),
        height: e.getAttribute("height"),
        alt: e.getAttribute("alt")
      };
    };
    return i;
  }(o.default.import("formats/image"))).blotName = "extendedImage";
}
var l = s;
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;