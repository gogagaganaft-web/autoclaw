exports.default = function (e, t) {
  var n;
  var o;
  var a;
  var r = t.label || {};
  var s = r.position || "inside";
  var l = false;
  e._checkAlignmentConstantLineLabels(r);
  return {
    options: t,
    labelOptions: r,
    labelPosition: s,
    label: null,
    line: null,
    getParsedValue: function () {
      if (!l) {
        n = e.validateUnit(t.value, "E2105", "constantLine");
        l = true;
      }
      return n;
    },
    draw: function () {
      if (!(0, i.isDefined)(t.value) || e._translator.getBusinessRange().isEmpty()) {
        return this;
      }
      var n = e._getCanvasStartEnd();
      var o = this.getParsedValue();
      this.coord = e._getConstantLinePos(o, n.start, n.end);
      var a = t.displayBehindSeries ? e._axisConstantLineGroups.under : e._axisConstantLineGroups.above;
      var l = a[s];
      l ||= a[e._isHorizontal ? r.verticalAlignment : r.horizontalAlignment];
      if (!(0, i.isDefined)(this.coord)) {
        return this;
      }
      var u = e._createConstantLine(this.coord, {
        stroke: t.color,
        "stroke-width": t.width,
        dashStyle: t.dashStyle
      });
      this.line = u.append(a.inside);
      this.label = r.visible ? e._drawConstantLineLabels(o, r, this.coord, l) : null;
      this.updatePosition();
      return this;
    },
    getContentContainer: function () {
      return this.label;
    },
    removeLabel: function () {
      if (this.label) {
        this.label.remove();
      }
    },
    updatePosition: function (t) {
      var n = e._getCanvasStartEnd();
      var o = e._getConstantLinePos(this.getParsedValue(), n.start, n.end);
      if ((0, i.isDefined)(o)) {
        this.coord = o;
        if (t && a) {
          if (this.label) {
            this.label.attr(e._getConstantLineLabelsCoords(a, this.labelOptions));
          }
          if (this.line) {
            this.line.attr(e._getConstantLineGraphicAttributes(a));
          }
          if (this.label) {
            this.label.animate(e._getConstantLineLabelsCoords(this.coord, this.labelOptions));
          }
          if (this.line) {
            this.line.animate(e._getConstantLineGraphicAttributes(this.coord));
          }
        } else {
          if (this.label) {
            this.label.attr(e._getConstantLineLabelsCoords(this.coord, this.labelOptions));
          }
          if (this.line) {
            this.line.attr(e._getConstantLineGraphicAttributes(this.coord));
          }
          e._rotateConstantLine(this.line, this.coord);
        }
      }
    },
    saveCoords: function () {
      o = a;
      a = this.coord;
    },
    resetCoordinates: function () {
      a = o;
    }
  };
};
var i = require("./35922.js");
module.exports = exports.default;
module.exports.default = exports.default;