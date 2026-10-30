exports.tick = function (e, t, n, s, l, u, d) {
  var c = d || e._tickOffset;
  var h = e._axisLineGroup;
  var f = e._axisElementsGroup;
  var p = r(n);
  var g = r(s);
  var m = /^\s+$/;
  var _ = e.getOptions().label;
  var v = e._textOptions;
  function y(t) {
    var n = e._textFontStyles;
    var i = _.customizeColor;
    if (i && i.call) {
      n = (0, o.extend)({}, e._textFontStyles, {
        fill: i.call(t, t)
      });
    }
    return n;
  }
  function b(t, n) {
    var o = e.formatHint(t.value, _, n);
    if ((0, i.isDefined)(o) && o !== "") {
      t.getContentContainer().setTitle(o);
    }
  }
  return function (o) {
    var r = {
      value: o,
      updateValue: function (e) {
        this.value = o = e;
      },
      initCoords: function () {
        this.coords = e._getTranslatedValue(o, c);
        this.labelCoords = e._getTranslatedValue(o);
      },
      saveCoords: function () {
        this._lastStoredCoordinates = {
          coords: this._storedCoords,
          labelCoords: this._storedLabelsCoords
        };
        this._storedCoords = this.coords;
        this._storedLabelsCoords = this.templateContainer ? this._getTemplateCoords() : this.labelCoords;
      },
      resetCoordinates: function () {
        if (this._lastStoredCoordinates) {
          this._storedCoords = this._lastStoredCoordinates.coords;
          this._storedLabelsCoords = this._lastStoredCoordinates.labelCoords;
        }
      },
      drawMark: function (t) {
        if (n.visible && l !== o) {
          if (!e.areCoordsOutsideAxis(this.coords)) {
            if (this.mark) {
              this.mark.append(h);
              e.sharp(this.mark, e.getSharpDirectionByCoords(this.coords));
              this.updateTickPosition(t);
            } else {
              this.mark = e._createPathElement([], p, e.getSharpDirectionByCoords(this.coords)).append(h);
              this.updateTickPosition(t);
            }
          }
        }
      },
      setSkippedCategory: function (e) {
        l = e;
      },
      _updateLine: function (t, n, i, o, a) {
        if (t) {
          if (n.points !== null && n.r !== null) {
            if (o && i && i.points !== null) {
              n.opacity = 1;
              t.attr(i);
              t.animate(n);
            } else {
              n.opacity = o ? 0 : 1;
              t.attr(n);
              if (o) {
                t.animate({
                  opacity: 1
                }, {
                  delay: 0.5,
                  partitionDuration: 0.5
                });
              }
            }
            if (this.coords.angle) {
              e._rotateTick(t, this.coords, a);
            }
          } else {
            t.remove();
          }
        }
      },
      updateTickPosition: function (t, i) {
        this._updateLine(this.mark, {
          points: e._getTickMarkPoints(r.coords, n.length, t)
        }, this._storedCoords && {
          points: e._getTickMarkPoints(r._storedCoords, n.length, t)
        }, i, false);
      },
      drawLabel: function (n, r) {
        var s = this;
        if (this.templateContainer && e.isRendered()) {
          this.updateLabelPosition();
        } else if (_.visible && !u && !e.getTranslator().getBusinessRange().isEmpty() && !e.areCoordsOutsideAxis(this.labelCoords)) {
          var l = _.template;
          var d = e.formatLabel(o, _, n);
          if (this.label) {
            this.label.attr({
              text: d,
              rotate: 0
            }).append(f);
            b(this, n);
            this.updateLabelPosition();
            return;
          }
          if (l) {
            this.templateContainer = t.g().append(f);
            if (this._templateDef) {
              this._templateDef.reject();
            }
            this._templateDef = new a.Deferred();
            r.render({
              model: {
                valueText: d,
                value: this.value,
                labelFontStyle: y(this),
                labelStyle: v
              },
              container: this.templateContainer.element,
              onRendered: function () {
                s.updateLabelPosition();
                if (s._templateDef) {
                  s._templateDef.resolve();
                }
              }
            });
          } else if ((0, i.isDefined)(d) && d !== "" && !m.test(d)) {
            this.label = t.text(d).css(y(this)).attr(v).append(f);
            this.updateLabelPosition();
            b(this, n);
          }
          var c = this.getContentContainer();
          if (c) {
            c.data("chart-data-argument", this.value);
          }
          if (this.templateContainer) {
            b(this, n);
          }
        } else if (this.label) {
          this.removeLabel();
        }
      },
      getTemplateDeferred: function () {
        return this._templateDef;
      },
      getContentContainer: function () {
        return this.templateContainer || this.label;
      },
      fadeOutElements: function () {
        var t = {
          opacity: 1
        };
        var n = {
          opacity: 0
        };
        var i = {
          partitionDuration: 0.5
        };
        if (this.getContentContainer()) {
          this._fadeOutLabel();
        }
        if (this.grid) {
          this.grid.append(e._axisGridGroup).attr(t).animate(n, i);
        }
        if (this.mark) {
          this.mark.append(e._axisLineGroup).attr(t).animate(n, i);
        }
      },
      _fadeInLabel: function () {
        var t = e._renderer.g().attr({
          opacity: 0
        }).append(e._axisElementsGroup).animate({
          opacity: 1
        }, {
          delay: 0.5,
          partitionDuration: 0.5
        });
        this.getContentContainer().append(t);
      },
      _fadeOutLabel: function () {
        var t = e._renderer.g().attr({
          opacity: 1
        }).animate({
          opacity: 0
        }, {
          partitionDuration: 0.5
        }).append(e._axisElementsGroup).toBackground();
        this.getContentContainer().append(t);
      },
      _getTemplateCoords: function () {
        return e._getLabelAdjustedCoord(this, (e._constantLabelOffset || 0) + (r.labelOffset || 0));
      },
      updateLabelPosition: function (e) {
        var t = this.templateContainer;
        if (this.getContentContainer()) {
          if (e && this._storedLabelsCoords) {
            if (t) {
              t.attr(this._storedLabelsCoords);
              var n = this._getTemplateCoords();
              t.animate(n);
            } else {
              this.label.attr({
                x: this._storedLabelsCoords.x,
                y: this._storedLabelsCoords.y
              });
              this.label.animate({
                x: this.labelCoords.x,
                y: this.labelCoords.y
              });
            }
          } else {
            if (t) {
              var i = this._getTemplateCoords();
              t.attr(i);
            } else {
              this.label.attr({
                x: this.labelCoords.x,
                y: this.labelCoords.y
              });
            }
            if (e) {
              this._fadeInLabel();
            }
          }
        }
      },
      updateMultilineTextAlignment: function () {
        if (!_.template && this.label) {
          this.label.attr({
            textsAlignment: this.labelAlignment || e.getOptions().label.alignment
          });
        }
      },
      drawGrid: function (t) {
        if (s.visible && l !== this.value) {
          if (this.grid) {
            this.grid.append(e._axisGridGroup);
            e.sharp(this.grid, e.getSharpDirectionByCoords(this.coords));
            this.updateGridPosition();
          } else {
            this.grid = t(this, g);
            if (this.grid) {
              this.grid.append(e._axisGridGroup);
            }
          }
        }
      },
      updateGridPosition: function (t) {
        this._updateLine(this.grid, e._getGridPoints(r.coords), this._storedCoords && e._getGridPoints(this._storedCoords), t, true);
      },
      removeLabel: function () {
        var e = this.getContentContainer();
        if (e) {
          e.remove();
        }
        if (this._templateDef) {
          this._templateDef.reject();
        }
        this._templateDef = this.templateContainer = this.label = null;
      }
    };
    return r;
  };
};
var i = require("./35922.js");
var o = require("./13306.js");
var a = require("./62754.js");
function r(e) {
  return {
    stroke: e.color,
    "stroke-width": e.width,
    "stroke-opacity": e.opacity,
    opacity: 1
  };
}