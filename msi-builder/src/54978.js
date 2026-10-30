exports.default = function (e, t) {
  var n;
  var r;
  var s = t.label || {};
  return {
    options: t,
    label: null,
    rect: null,
    _getCoord: function () {
      var n = e._getCanvasStartEnd();
      var i = e._translator.getBusinessRange();
      return e._getStripPos(t.startValue, t.endValue, n.start, n.end, i);
    },
    _drawLabel: function (t) {
      return e._renderer.text(s.text, t.x, t.y).css((0, o.patchFontOptions)((0, a.extend)({}, e.getOptions().label.font, s.font))).attr({
        align: "center",
        class: s.cssClass
      }).append(e._axisStripLabelGroup);
    },
    draw: function () {
      if (!e._translator.getBusinessRange().isEmpty() && ((0, i.isDefined)(t.startValue) || (0, i.isDefined)(t.endValue)) && (0, i.isDefined)(t.color)) {
        var n = this._getCoord();
        this.labelCoords = s.text ? e._getStripLabelCoords(n.from, n.to, s) : null;
        if (n.outOfCanvas || !(0, i.isDefined)(n.to) || !(0, i.isDefined)(n.from)) {
          return;
        }
        this.rect = e._createStrip(e._getStripGraphicAttributes(n.from, n.to)).attr({
          fill: t.color
        }).append(e._axisStripGroup);
        this.label = s.text ? this._drawLabel(this.labelCoords) : null;
      }
    },
    getContentContainer: function () {
      return this.label;
    },
    removeLabel: function () {},
    updatePosition: function (i) {
      var o = this._getCoord();
      if (i && n) {
        if (this.label) {
          this.label.attr(e._getStripLabelCoords(n.from, n.to, t.label));
        }
        if (this.rect) {
          this.rect.attr(e._getStripGraphicAttributes(n.from, n.to));
        }
        if (this.label) {
          this.label.animate(e._getStripLabelCoords(o.from, o.to, t.label));
        }
        if (this.rect) {
          this.rect.animate(e._getStripGraphicAttributes(o.from, o.to));
        }
      } else {
        if (this.label) {
          this.label.attr(e._getStripLabelCoords(o.from, o.to, t.label));
        }
        if (this.rect) {
          this.rect.attr(e._getStripGraphicAttributes(o.from, o.to));
        }
      }
    },
    saveCoords: function () {
      r = n;
      n = this._getCoord();
    },
    resetCoordinates: function () {
      n = r;
    }
  };
};
var i = require("./35922.js");
var o = require("./19157.js");
var a = require("./13306.js");
module.exports = exports.default;
module.exports.default = exports.default;