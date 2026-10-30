exports.default = undefined;
var i = require("./68890.js");
var o = s(require("./39725.js"));
var a = s(require("./68374.js"));
var r = require("./78008.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e, t) {
  return (l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var u = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  l(t, n);
  var s = o.prototype;
  s._internalRenderPosition = function (e, t) {
    var n = this.getDrawerInstance();
    var o = n.calcTargetPosition();
    var s = (0, a.default)(n.content());
    var l = this._getPanelSize(n.option("opened"));
    var u = this._getPanelOffset(n.option("opened"));
    var d = n.option("revealMode");
    if (e) {
      if (d === "slide") {
        i.animation.margin({
          complete: function () {
            t.resolve();
          },
          $element: s,
          duration: n.option("animationDuration"),
          direction: o,
          margin: u
        });
      } else if (d === "expand") {
        i.animation.size({
          complete: function () {
            t.resolve();
          },
          $element: s,
          duration: n.option("animationDuration"),
          direction: o,
          size: l
        });
      }
    } else if (d === "slide") {
      s.css("margin" + (0, r.camelize)(o, true), u);
    } else if (d === "expand") {
      s.css(n.isHorizontalDirection() ? "width" : "height", l);
    }
  };
  s.isViewContentFirst = function (e, t) {
    return (t ? e === "left" : e === "right") || e === "bottom";
  };
  return o;
}(o.default);
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;