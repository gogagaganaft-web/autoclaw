exports.default = undefined;
var i;
var o = require("./11378.js");
var a = (i = require("./79090.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./60137.js");
var s = o.utils.animationSettings;
function l(e, t) {
  this._translator = e.translator;
  this._sliderGroup = e.renderer.g().attr({
    class: "slider"
  }).append(e.root);
  this._line = e.renderer.path(null, "line").append(this._sliderGroup);
  this._marker = new a.default(e.renderer, this._sliderGroup, t === 1);
  this._tracker = e.renderer.rect().attr({
    class: "slider-tracker",
    fill: "#000000",
    opacity: 0.0001
  }).css({
    cursor: "w-resize"
  }).append(e.trackersGroup);
}
l.prototype = {
  constructor: l,
  cancelAnimation: function () {
    this._sliderGroup.stopAnimation();
    this._tracker.stopAnimation();
  },
  applyPosition: function (e) {
    var t = this._sliderGroup;
    var n = this._tracker;
    var i = {
      translateX: this._position
    };
    this._marker.setPosition(this._position);
    if (e) {
      t.animate(i, s);
      n.animate(i, s);
    } else {
      t.attr(i);
      n.attr(i);
    }
  },
  _setValid: function (e) {
    this._marker.setValid(e);
    this._line.attr({
      stroke: this._colors[Number(e)]
    });
  },
  _setText: function (e) {
    this._marker.setText(e);
  },
  update: function (e, t, n) {
    this._formatOptions = {
      format: n.format,
      customizeText: n.customizeText
    };
    this._marker.applyOptions(n, this._translator.getScreenRange());
    this._colors = [n.invalidRangeColor, t.color];
    this._sliderGroup.attr({
      translateY: e[0]
    });
    this._line.attr({
      "stroke-width": t.width,
      stroke: t.color,
      "stroke-opacity": t.opacity,
      sharp: "h",
      points: [0, 0, 0, e[1] - e[0]]
    });
    var i;
    i = t.width;
    var o = r.touchEvents || r.pointerEvents ? 20 : i > 8 ? i : 8;
    this._tracker.attr({
      x: -o / 2,
      y: 0,
      width: o,
      height: e[1] - e[0],
      translateY: e[0]
    });
  },
  toForeground: function () {
    this._sliderGroup.toForeground();
  },
  getSliderTracker: function () {
    return this._tracker;
  },
  getPosition: function () {
    return this._position;
  },
  setDisplayValue: function (e) {
    this._value = e;
    this._setText((0, o.formatValue)(e, this._formatOptions));
  },
  setOverlapped: function (e) {
    this._marker.setOverlapped(e);
  },
  getValue: function () {
    return this._value;
  },
  on: function (e, t) {
    this._tracker.on(e, t);
    this._marker.getTracker().on(e, t);
  },
  getCloudBorder: function () {
    return this._marker.getBorderPosition();
  },
  dispose: function () {
    this._marker.dispose();
  }
};
var u = l;
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;