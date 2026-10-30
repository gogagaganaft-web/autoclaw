exports.default = undefined;
var i = require("./20576.js");
var o = require("./13306.js");
var a = s(require("./27428.js"));
var r = s(require("./97319.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = (0, o.extend)({}, a.default, {
  deleteLabel: r.default.deleteLabel,
  _getFormatObject: r.default._getFormatObject,
  clearVisibility: function () {
    var e = this.graphic;
    if (e && e.attr("visibility")) {
      e.attr({
        visibility: null
      });
    }
  },
  setInvisibility: function () {
    var e = this.graphic;
    if (e && e.attr("visibility") !== "hidden") {
      e.attr({
        visibility: "hidden"
      });
    }
    this._topLabel.draw(false);
    this._bottomLabel.draw(false);
  },
  getTooltipParams: function (e) {
    var t;
    var n;
    var i = e === "edge";
    if (this._options.rotated) {
      t = i ? this.x + this.width : this.x + this.width / 2;
      n = this.y + this.height / 2;
    } else {
      t = this.x + this.width / 2;
      n = i ? this.y : this.y + this.height / 2;
    }
    return {
      x: t,
      y: n,
      offset: 0
    };
  },
  _translate: function () {
    a.default._translate.call(this);
    if (this._options.rotated) {
      this.width = this.width || 1;
    } else {
      this.height = this.height || 1;
    }
  },
  hasCoords: r.default.hasCoords,
  _updateData: r.default._updateData,
  _getLabelPosition: r.default._getLabelPosition,
  _getLabelMinFormatObject: r.default._getLabelMinFormatObject,
  _updateLabelData: r.default._updateLabelData,
  _updateLabelOptions: r.default._updateLabelOptions,
  getCrosshairData: r.default.getCrosshairData,
  _createLabel: r.default._createLabel,
  _checkOverlay: r.default._checkOverlay,
  _checkLabelsOverlay: r.default._checkLabelsOverlay,
  _getOverlayCorrections: r.default._getOverlayCorrections,
  _drawLabel: r.default._drawLabel,
  _getLabelCoords: r.default._getLabelCoords,
  getLabel: r.default.getLabel,
  getLabels: r.default.getLabels,
  getBoundingRect: i.noop,
  getMinValue: r.default.getMinValue,
  getMaxValue: r.default.getMaxValue
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;