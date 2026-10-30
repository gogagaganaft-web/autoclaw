exports.default = undefined;
var i;
var o = (i = require("./9549.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./20576.js");
var r = require("./13306.js");
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = {};
if (o.default) {
  (l = function (e) {
    var t;
    var n;
    function i() {
      return e.apply(this, arguments) || this;
    }
    n = e;
    (t = i).prototype = Object.create(n.prototype);
    t.prototype.constructor = t;
    s(t, n);
    i.create = function (t) {
      var n;
      var i;
      var o = e.create.call(this);
      var r = t.value;
      if (Array.isArray(t.escapeChar)) {
        n = (0, a.ensureDefined)(t.escapeChar[0], "");
        i = (0, a.ensureDefined)(t.escapeChar[1], "");
      } else {
        n = i = t.escapeChar;
      }
      o.innerText = n + r + i;
      o.dataset.varStartEscChar = n;
      o.dataset.varEndEscChar = i;
      o.dataset.varValue = t.value;
      return o;
    };
    i.value = function (e) {
      return (0, r.extend)({}, {
        value: e.dataset.varValue,
        escapeChar: [e.dataset.varStartEscChar || "", e.dataset.varEndEscChar || ""]
      });
    };
    return i;
  }(o.default.import("blots/embed"))).blotName = "variable";
  l.tagName = "span";
  l.className = "dx-variable";
}
var u = l;
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;