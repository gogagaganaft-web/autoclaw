exports.SliderTooltipPositionController = undefined;
var i;
var o = require("./84228.js");
var a = require("./31648.js");
var r = (i = require("./49387.js")) && i.__esModule ? i : {
  default: i
};
var s = require("./13306.js");
var l = require("./35922.js");
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = {
  top: {
    my: "bottom center",
    at: "top center",
    collision: "fit none"
  },
  bottom: {
    my: "top center",
    at: "bottom center",
    collision: "fit none"
  }
};
var c = {
  h: 2,
  v: 1
};
var h = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var o = i.prototype;
  o._normalizePosition = function (e) {
    var t = this._props.target;
    var n = `.dx-slider`;
    var i = t == null ? undefined : t.closest(n);
    var o = {
      of: t,
      boundaryOffset: c,
      boundary: i == null ? undefined : i.get(0)
    };
    var a = (0, s.extend)(true, {}, o, this._positionToObject(e));
    this._positionSide = this._getDisplaySide(a);
    return a;
  };
  o._renderContentInitialPosition = function () {
    e.prototype._renderContentInitialPosition.call(this);
    this._fitIntoSlider();
  };
  o._fitIntoSlider = function () {
    var e = r.default.calculate(this._$content, this._position).h;
    var t = e.collisionSide;
    var n = e.oversize;
    var i = this._visualPosition.left;
    var o = (t === "left" ? 1 : -1) * n;
    (0, a.move)(this._$content, {
      left: i + o
    });
    this._updateVisualPositionValue();
  };
  o._positionToObject = function (e) {
    if ((0, l.isString)(e)) {
      return (0, s.extend)({}, d[e]);
    } else {
      return e;
    }
  };
  return i;
}(o.PopoverPositionController);
exports.SliderTooltipPositionController = h;