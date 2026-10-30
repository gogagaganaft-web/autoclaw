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
  s = function (e) {
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
      var i = (t == null ? undefined : t.href) ?? t;
      var o = e.create.call(this, i);
      if ((0, a.isObject)(t)) {
        if (t.text) {
          o.innerText = t.text;
        }
        if (!t.target) {
          o.removeAttribute("target");
        }
      }
      return o;
    };
    i.formats = function (e) {
      return {
        href: e.getAttribute("href"),
        target: e.getAttribute("target")
      };
    };
    var o = i.prototype;
    o.formats = function () {
      var t = e.prototype.formats.call(this);
      var n = i.formats(this.domNode);
      var o = n.href;
      var a = n.target;
      t.link = o;
      t.target = a;
      return t;
    };
    o.format = function (t, n) {
      if (t === "link" && (0, a.isObject)(n)) {
        if (n.text) {
          this.domNode.innerText = n.text;
        }
        if (n.target) {
          this.domNode.setAttribute("target", "_blank");
        } else {
          this.domNode.removeAttribute("target");
        }
        this.domNode.setAttribute("href", n.href);
      } else {
        e.prototype.format.call(this, t, n);
      }
    };
    i.value = function (e) {
      return {
        href: e.getAttribute("href"),
        text: e.innerText,
        target: !!e.getAttribute("target")
      };
    };
    return i;
  }(o.default.import("formats/link"));
}
var l = s;
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;