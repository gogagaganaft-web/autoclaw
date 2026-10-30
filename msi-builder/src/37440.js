exports.default = undefined;
var i;
var o = require("./13306.js");
var a = (i = require("./24894.js")) && i.__esModule ? i : {
  default: i
};
var r = o.extend;
var s = r({}, a.default, {
  correctCoordinates: function (e) {
    this.bubbleSize = e / 2;
  },
  _drawMarker: function (e, t, n) {
    var i = r({
      translateX: this.x,
      translateY: this.y
    }, this._getStyle());
    this.graphic = e.circle(0, 0, n ? 0 : this.bubbleSize).smartAttr(i).data({
      "chart-data-point": this
    }).append(t);
  },
  getTooltipParams: function (e) {
    var t = this.graphic;
    if (t) {
      var n = t.getBBox().height;
      return {
        x: this.x,
        y: this.y,
        offset: n < 20 || e === "edge" ? n / 2 : 0
      };
    }
  },
  _getLabelFormatObject: function () {
    var e = a.default._getLabelFormatObject.call(this);
    e.size = this.initialSize;
    return e;
  },
  _updateData: function (e) {
    a.default._updateData.call(this, e);
    this.size = this.initialSize = e.size;
  },
  _getGraphicBBox: function () {
    return this._getSymbolBBox(this.x, this.y, this.bubbleSize);
  },
  _updateMarker: function (e, t) {
    if (!e) {
      t = r({
        r: this.bubbleSize,
        translateX: this.x,
        translateY: this.y
      }, t);
    }
    this.graphic.smartAttr(t);
  },
  _getFormatObject: function (e) {
    var t = a.default._getFormatObject.call(this, e);
    t.sizeText = e.formatValue(this.initialSize);
    return t;
  },
  _storeTrackerR: function () {
    return this.bubbleSize;
  },
  _getLabelCoords: function (e) {
    if (e.getLayoutOptions().position === "inside") {
      return this._getLabelCoordOfPosition(e, "inside");
    } else {
      return a.default._getLabelCoords.call(this, e);
    }
  }
});
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;