exports.default = undefined;
var i = require("./68890.js");
var o = s(require("./39725.js"));
var a = s(require("./68374.js"));
var r = require("./31648.js");
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
    var o = this._getPanelSize(true);
    var s = this._getPanelSize(n.option("opened")) * n._getPositionCorrection();
    (0, a.default)(n.content()).css(n.isHorizontalDirection() ? "width" : "height", o);
    if (n.getMinSize()) {
      var l = "padding";
      switch (n.calcTargetPosition()) {
        case "left":
          l += "Right";
          break;
        case "right":
          l += "Left";
          break;
        case "top":
          l += "Bottom";
          break;
        case "bottom":
          l += "Top";
      }
      (0, a.default)(n.viewContent()).css(l, n.getMinSize());
    }
    if (e) {
      i.animation.moveTo({
        $element: (0, a.default)(n.viewContent()),
        position: s,
        direction: n.calcTargetPosition(),
        duration: n.option("animationDuration"),
        complete: function () {
          t.resolve();
        }
      });
    } else if (n.isHorizontalDirection()) {
      (0, r.move)((0, a.default)(n.viewContent()), {
        left: s
      });
    } else {
      (0, r.move)((0, a.default)(n.viewContent()), {
        top: s
      });
    }
  };
  s.onPanelContentRendered = function () {
    (0, a.default)(this.getDrawerInstance().viewContent()).addClass("dx-theme-background-color");
  };
  return o;
}(o.default);
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;