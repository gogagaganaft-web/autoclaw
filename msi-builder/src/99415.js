exports.default = undefined;
var i = require("./21177.js");
var o = h(require("./30343.js"));
var a = h(require("./91198.js"));
var r = require("./13306.js");
var s = require("./89530.js");
var l = require("./20576.js");
var u = require("./19157.js");
var d = require("./35922.js");
var c = h(require("./53805.js"));
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = a.default.getNextDateUnit;
var p = a.default.correctDateWithUnitBeginning;
var g = Math;
var m = g.max;
var _ = c.default.top;
var v = c.default.bottom;
var y = c.default.left;
var b = c.default.right;
var x = c.default.center;
var w = {
  left: -1,
  top: -1,
  right: 0,
  bottom: 0,
  center: -0.5
};
function C(e) {
  return e.sort(function (e, t) {
    return e.from - t.from;
  });
}
function S(e, t, n, i) {
  var r = i;
  var s = t && a.default.getDatesDifferences(t, e);
  if (t && n !== "year") {
    (function (e, t) {
      var n;
      var i;
      if (t === "week") {
        t = "day";
      }
      if (t === "quarter") {
        t = "month";
      }
      if (e[t]) {
        for (i = 0; i < a.default.dateUnitIntervals.length && (e[n = a.default.dateUnitIntervals[i]] && (e[n] = false, e.count--), n !== t); i++);
      }
    })(s, n);
    r = o.default.getDateFormatByDifferences(s);
  }
  return r;
}
function k(e, t) {
  return t.reduce(function (t, n) {
    return m(t, e(n));
  }, 0);
}
function D(e, t, n) {
  return e.some(function (e) {
    return e.label.verticalAlignment === t;
  }) && n || 0;
}
function I(e) {
  return g.abs(e.x) || 0;
}
function T(e) {
  return g.abs(e.width - g.abs(e.x)) || 0;
}
var E = {
  linear: {
    _getStep: function (e, t) {
      var n = this._options.label.minSpacing;
      var i = k(this._isHorizontal ? function (e) {
        return e.width + n;
      } : function (e) {
        return e.height;
      }, e);
      if (t) {
        i = function (e, t) {
          var n = (t = (t = g.abs(t)) % 180 >= 90 ? 90 - t % 90 : t % 90) * (g.PI / 180);
          if (n >= g.atan(e.height / e.width)) {
            return e.height / g.abs(g.sin(n));
          } else {
            return e.width;
          }
        }({
          width: i,
          height: this._getMaxLabelHeight(e, 0)
        }, t);
      }
      return c.default.getTicksCountInRange(this._majorTicks, this._isHorizontal ? "x" : "y", i);
    },
    _getMaxLabelHeight: function (e, t) {
      return k(function (e) {
        return e.height;
      }, e) + t;
    },
    _validateOverlappingMode: function (e, t) {
      if (this._isHorizontal && (t === "rotate" || t === "stagger") || !this._isHorizontal) {
        return c.default.validateOverlappingMode(e);
      } else {
        return e;
      }
    },
    _validateDisplayMode: function (e) {
      if (this._isHorizontal) {
        return e;
      } else {
        return "standard";
      }
    },
    getMarkerTrackers: function () {
      return this._markerTrackers;
    },
    _getSharpParam: function (e) {
      if (this._isHorizontal ^ e) {
        return "h";
      } else {
        return "v";
      }
    },
    _createAxisElement: function () {
      return this._renderer.path([], "line");
    },
    _updateAxisElementPosition: function () {
      var e = this._axisPosition;
      var t = this._getCanvasStartEnd();
      this._axisElement.attr({
        points: this._isHorizontal ? [t.start, e, t.end, e] : [e, t.start, e, t.end]
      });
    },
    _getTranslatedCoord: function (e, t) {
      return this._translator.translate(e, t);
    },
    _initAxisPositions: function () {
      if (this.customPositionIsAvailable()) {
        this._customBoundaryPosition = this.getCustomBoundaryPosition();
      }
      if (!this.customPositionIsAvailable() || this.customPositionIsBoundary()) {
        this._axisPosition = this.getPredefinedPosition(this.getResolvedBoundaryPosition());
      } else {
        this._axisPosition = this.getCustomPosition();
      }
    },
    _getTickMarkPoints: function (e, t, n) {
      var i;
      var o = this._isHorizontal;
      var a = this._options.tickOrientation;
      var r = this._options.label.position;
      if ((0, d.isDefined)(a)) {
        i = w[a] * t;
      } else {
        var s = n.shift || 0;
        if (!o && r === y || o && r !== v) {
          s = -s;
        }
        i = s + this.getTickStartPositionShift(t);
      }
      return [e.x + (o ? 0 : i), e.y + (o ? i : 0), e.x + (o ? 0 : i + t), e.y + (o ? i + t : 0)];
    },
    getTickStartPositionShift: function (e) {
      var t = this._options.width;
      var n = this.getResolvedBoundaryPosition();
      if (e % 2 == 1) {
        if ((t % 2 != 0 || n !== y && n !== _) && (t % 2 != 1 || n !== b && n !== v || this.hasNonBoundaryPosition())) {
          return -Math.floor(e / 2);
        } else {
          return Math.floor(-e / 2);
        }
      } else {
        return -e / 2 + (t % 2 == 0 ? 0 : n === v || n === b ? -1 : 1);
      }
    },
    _getTitleCoords: function () {
      var e = this._isHorizontal;
      var t = this._axisPosition;
      var n = this._axisPosition;
      var i = this._options.title.alignment;
      var o = this._getCanvasStartEnd();
      var a = e || this._options.position === y;
      var r = a ? o.start : o.end;
      var s = a ? o.end : o.start;
      var l = i === y ? r : i === b ? s : o.start + (o.end - o.start) / 2;
      if (e) {
        t = l;
      } else {
        n = l;
      }
      return {
        x: t,
        y: n
      };
    },
    _drawTitleText: function (e, t) {
      var n = this._options;
      var i = n.title;
      var o = {
        opacity: i.opacity,
        align: i.alignment,
        class: i.cssClass
      };
      if (i.text && e) {
        t = t || this._getTitleCoords();
        if (!this._isHorizontal) {
          o.rotate = n.position === y ? 270 : 90;
        }
        var a = this._renderer.text(i.text, t.x, t.y).css((0, u.patchFontOptions)(i.font)).attr(o).append(e);
        this._checkTitleOverflow(a);
        return a;
      }
    },
    _updateTitleCoords: function () {
      if (this._title) {
        this._title.element.attr(this._getTitleCoords());
      }
    },
    _drawTitle: function () {
      var e = this._drawTitleText(this._axisTitleGroup);
      if (e) {
        this._title = {
          element: e
        };
      }
    },
    _measureTitle: function () {
      if (this._title) {
        if (this._title.bBox && !this._title.originalSize) {
          this._title.originalSize = this._title.bBox;
        }
        this._title.bBox = this._title.element.getBBox();
      }
    },
    _drawDateMarker: function (e, t, n) {
      var i;
      var o = this._options.marker;
      var a = this._translator.getBusinessRange().invert;
      var r = o.width + o.textLeftIndent;
      if (t.x !== null) {
        if (!t.withoutStick) {
          i = this._renderer.path([t.x, t.y, t.x, t.y + o.separatorHeight], "line").attr({
            "stroke-width": o.width,
            stroke: o.color,
            "stroke-opacity": o.opacity,
            sharp: "h"
          }).append(this._axisElementsGroup);
        }
        var s = String(this.formatLabel(e, t.labelOptions, n));
        return {
          date: e,
          x: t.x,
          y: t.y,
          cropped: t.withoutStick,
          label: this._renderer.text(s, t.x, t.y).css((0, u.patchFontOptions)(o.label.font)).append(this._axisElementsGroup),
          line: i,
          getContentContainer: function () {
            return this.label;
          },
          getEnd: function () {
            return this.x + (a ? -1 : 1) * (r + this.labelBBox.width);
          },
          setTitle: function () {
            this.title = s;
          },
          hideLabel: function () {
            this.label.dispose();
            this.label = null;
            this.title = s;
          },
          hide: function () {
            if (i) {
              i.dispose();
              i = null;
            }
            this.label.dispose();
            this.label = null;
            this.hidden = true;
          }
        };
      }
    },
    _drawDateMarkers: function () {
      var e;
      var t = this;
      var n = t._options;
      var i = t._translator;
      var o = t._getViewportRange();
      var r = o.minVisible;
      var s = [];
      function l(e, n, a) {
        return t._drawDateMarker(e, {
          x: i.translate(e),
          y: u,
          labelOptions: t._getLabelFormatOptions(n),
          withoutStick: a
        }, o);
      }
      if (o.isEmpty() || !n.marker.visible || n.argumentType !== "datetime" || n.type === "discrete" || t._majorTicks.length <= 1) {
        return [];
      }
      var u = t._axisPosition + n.marker.topIndent;
      var d = a.default.getDateUnitInterval(this._tickInterval);
      var c = function (e) {
        var t = f(e);
        if (t === "quarter") {
          t = f(t);
        }
        return t;
      }(d);
      var h = function (e, t, n) {
        var i;
        var o = e;
        e = p(e, n);
        t = p(t, n);
        if ((i = a.default.getSequenceByInterval(e, t, n)).length && o > i[0]) {
          i = i.slice(1);
        }
        return i;
      }(r, o.maxVisible, c);
      if (h.length > 1 || h.length === 1 && r < h[0]) {
        s = h.reduce(function (e, t, n, i) {
          var o = l(t, S(t, i[n - 1] || r < t && r, d, c));
          if (o) {
            e.push(o);
          }
          return e;
        }, []);
        if (r < h[0] && (e = l(r, S(r, h[0], d, c), true))) {
          s.unshift(e);
        }
      }
      return s;
    },
    _adjustDateMarkers: function (e) {
      e = e || 0;
      var t;
      var n = this;
      var i = this._options.marker;
      var o = i.width + i.textLeftIndent;
      var a = this._translator.getBusinessRange().invert;
      var r = n._getCanvasStartEnd();
      var s = this._dateMarkers;
      if (s.length) {
        if (s[0].cropped) {
          if (!this._checkMarkersPosition(a, s[1], s[0])) {
            s[0].hideLabel();
          }
        }
        s.forEach(function (e, i, o) {
          if (!e.cropped) {
            if (a ? e.getEnd() < r.end : e.getEnd() > r.end) {
              e.hideLabel();
            } else if (n._checkMarkersPosition(a, e, t)) {
              t = e;
            } else {
              e.hide();
            }
          }
        });
        this._dateMarkers.forEach(function (t) {
          if (t.label) {
            var n = t.labelBBox;
            var r = t.y + i.textTopIndent - n.y;
            t.label.attr({
              translateX: a ? t.x - o - n.x - n.width : t.x + o - n.x,
              translateY: r + e
            });
          }
          if (t.line) {
            t.line.attr({
              translateY: e
            });
          }
        });
        n._initializeMarkersTrackers(e);
        return e + i.topIndent + i.separatorHeight;
      } else {
        return e;
      }
    },
    _checkMarkersPosition: function (e, t, n) {
      return n === undefined || (e ? t.x < n.getEnd() : t.x > n.getEnd());
    },
    _initializeMarkersTrackers: function (e) {
      var t = this._options.marker.separatorHeight;
      var n = this._renderer;
      var i = this._translator.getBusinessRange();
      var o = this._getCanvasStartEnd();
      var a = this._axisElementsGroup;
      this._markerTrackers = this._dateMarkers.filter(function (e) {
        return !e.hidden;
      }).map(function (r, s, l) {
        var u = l[s + 1] || {
          x: o.end,
          date: i.max
        };
        var d = r.x;
        var c = r.y + e;
        var h = n.path([d, c, d, c + t, u.x, c + t, u.x, c, d, c], "area").attr({
          "stroke-width": 1,
          stroke: "grey",
          fill: "grey",
          opacity: 0.0001
        }).append(a);
        h.data("range", {
          startValue: r.date,
          endValue: u.date
        });
        if (r.title) {
          h.setTitle(r.title);
        }
        return h;
      });
    },
    _getLabelFormatOptions: function (e) {
      var t = this._markerLabelOptions;
      if (!t) {
        this._markerLabelOptions = t = (0, r.extend)(true, {}, this._options.marker.label);
      }
      if (!(0, d.isDefined)(this._options.marker.label.format)) {
        t.format = e;
      }
      return t;
    },
    _adjustConstantLineLabels: function (e) {
      var t = this;
      var n = t._options.position;
      var i = t.getCanvas();
      var o = i.left;
      var a = i.width - i.right;
      var r = i.top;
      var s = i.height - i.bottom;
      var l = r + (s - r) / 2;
      var u = o + (a - o) / 2;
      var d = 0;
      e.forEach(function (e) {
        var i;
        var c;
        var h = t._isHorizontal;
        var f = e.options;
        var p = f.paddingTopBottom;
        var g = f.paddingLeftRight;
        var _ = f.label;
        var w = _.verticalAlignment;
        var C = _.horizontalAlignment;
        var S = _.position === "inside";
        var k = e.label;
        var D = e.labelBBox;
        if (k !== null && !D.isEmpty) {
          if (h) {
            if (S) {
              i = C === y ? e.coord - g - D.x - D.width : e.coord + g - D.x;
              switch (w) {
                case x:
                  c = l - D.y - D.height / 2;
                  break;
                case v:
                  c = s - p - D.y - D.height;
                  break;
                default:
                  c = r + p - D.y;
              }
            } else {
              if (n === w) {
                d = m(d, D.height + p);
              }
              i = e.coord - D.x - D.width / 2;
              c = w === v ? s + p - D.y : r - p - D.y - D.height;
            }
          } else if (S) {
            c = w === v ? e.coord + p - D.y : e.coord - p - D.y - D.height;
            switch (C) {
              case x:
                i = u - D.x - D.width / 2;
                break;
              case b:
                i = a - g - D.x - D.width;
                break;
              default:
                i = o + g - D.x;
            }
          } else {
            if (n === C) {
              d = m(d, D.width + g);
            }
            c = e.coord - D.y - D.height / 2;
            i = C === b ? a + g - D.x : o - g - D.x - D.width;
          }
          k.attr({
            translateX: i,
            translateY: c
          });
        }
      });
      return d;
    },
    _drawConstantLinesForEstimating: function (e) {
      var t = this;
      var n = this._renderer;
      var i = n.g();
      e.forEach(function (e) {
        t._drawConstantLineLabelText(e.label.text, 0, 0, e.label, i).attr({
          align: "center"
        });
      });
      return i.append(n.root);
    },
    _estimateLabelHeight: function (e, t) {
      var n = e.height;
      var i = t.drawingType;
      if (this._validateDisplayMode(i) === "stagger" || this._validateOverlappingMode(t.overlappingBehavior, i) === "stagger") {
        n = n * 2 + t.staggeringSpacing;
      }
      if (this._validateDisplayMode(i) === "rotate" || this._validateOverlappingMode(t.overlappingBehavior, i) === "rotate") {
        var o = (0, u.getCosAndSin)(t.rotationAngle);
        n = n * o.cos + e.width * o.sin;
      }
      return n && (n + t.indentFromAxis || 0) || 0;
    },
    estimateMargins: function (e) {
      this.updateCanvas(e);
      var t = this._getViewportRange();
      var n = this._createTicksAndLabelFormat(t);
      var i = n.ticks;
      var o = n.tickInterval;
      var a = this._options;
      var r = this._outsideConstantLines.filter(function (e) {
        return e.labelOptions.visible;
      }).map(function (e) {
        return e.options;
      });
      var s = this._renderer.root;
      var l = a.label.visible && !t.isEmpty() && i.length;
      var u = l && this.formatLabel(i[i.length - 1], a.label, undefined, undefined, o, i);
      var d = l && this._renderer.text(u, 0, 0).css(this._textFontStyles).attr(this._textOptions).append(s);
      var c = this._drawTitleText(s, {
        x: 0,
        y: 0
      });
      var h = this._drawConstantLinesForEstimating(r);
      var f = !a.label.template && d && d.getBBox() || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      var p = c && c.getBBox() || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      var g = h.getBBox();
      var _ = p.height ? p.height + a.title.margin : 0;
      var v = this._estimateLabelHeight(f, a.label);
      var y = g.height ? g.height + r.reduce(function (e, t) {
        return m(e, t.paddingTopBottom);
      }, 0) : 0;
      var b = v + _;
      var x = {
        left: m(I(f), I(g)),
        right: m(T(f), T(g)),
        top: (a.position === "top" ? b : 0) + D(r, "top", y),
        bottom: (a.position !== "top" ? b : 0) + D(r, "bottom", y)
      };
      if (d) {
        d.remove();
      }
      if (c) {
        c.remove();
      }
      if (h) {
        h.remove();
      }
      return x;
    },
    _checkAlignmentConstantLineLabels: function (e) {
      var t = e.position;
      var n = (e.verticalAlignment || "").toLowerCase();
      var i = (e.horizontalAlignment || "").toLowerCase();
      if (this._isHorizontal) {
        if (t === "outside") {
          n = n === v ? v : _;
          i = x;
        } else {
          n = n === x ? x : n === v ? v : _;
          i = i === y ? y : b;
        }
      } else if (t === "outside") {
        n = x;
        i = i === y ? y : b;
      } else {
        n = n === v ? v : _;
        i = i === b ? b : i === x ? x : y;
      }
      e.verticalAlignment = n;
      e.horizontalAlignment = i;
    },
    _getConstantLineLabelsCoords: function (e, t) {
      var n = e;
      var i = e;
      if (this._isHorizontal) {
        i = this._orthogonalPositions[t.verticalAlignment === "top" ? "start" : "end"];
      } else {
        n = this._orthogonalPositions[t.horizontalAlignment === "right" ? "end" : "start"];
      }
      return {
        x: n,
        y: i
      };
    },
    _getAdjustedStripLabelCoords: function (e) {
      var t = e.options;
      var n = t.paddingTopBottom;
      var i = t.paddingLeftRight;
      var o = t.label.horizontalAlignment;
      var a = t.label.verticalAlignment;
      var r = e.labelBBox;
      var s = r.height;
      var l = r.width;
      var u = e.labelCoords;
      var d = u.y - r.y;
      var c = u.x - r.x;
      if (a === _) {
        d += n;
      } else if (a === x) {
        d -= s / 2;
      } else if (a === v) {
        d -= n + s;
      }
      if (o === y) {
        c += i;
      } else if (o === x) {
        c -= l / 2;
      } else if (o === b) {
        c -= i + l;
      }
      return {
        translateX: c,
        translateY: d
      };
    },
    _adjustTitle: function (e) {
      e = e || 0;
      if (this._title) {
        var t = this._options;
        var n = t.position;
        var i = t.title.margin;
        var o = this._title;
        var a = o.bBox;
        var r = a.x;
        var s = a.y;
        var l = a.width;
        var u = a.height;
        var d = this._axisPosition;
        var c = d - i - e;
        var h = d + i + e;
        var f = {};
        if (this._isHorizontal) {
          f.translateY = n === _ ? c - (s + u) : h - s;
        } else {
          f.translateX = n === y ? c - (r + l) : h - r;
        }
        o.element.attr(f);
      }
    },
    _checkTitleOverflow: function (e) {
      if (this._title || e) {
        var t = this._getScreenDelta();
        var n = e ? {
          bBox: e.getBBox(),
          element: e
        } : this._title;
        var i = this._options.title;
        var o = n.bBox;
        if ((this._isHorizontal ? o.width : o.height) > t) {
          n.element.setMaxSize(t, undefined, {
            wordWrap: i.wordWrap || "none",
            textOverflow: i.textOverflow || "ellipsis"
          });
          this._wrapped = i.wordWrap && i.wordWrap !== "none";
        } else {
          var a = n.originalSize && t > (this._isHorizontal ? n.originalSize.width : n.originalSize.height);
          if (!this._wrapped && a) {
            n.element.restoreText();
          }
        }
      }
    },
    coordsIn: function (e, t) {
      var n = this.getCanvas();
      var i = this._options.isHorizontal;
      var o = this._options.position;
      var a = i ? t : e;
      return (!i || !(e < n.left) && !(e > n.width - n.right)) && (!!i || !(t < n.top) && !(t > n.height - n.bottom)) && (i && o === c.default.top || !i && o === c.default.left ? a < n[o] : a > n[i ? "height" : "width"] - n[o]);
    },
    _boundaryTicksVisibility: {
      min: true,
      max: true
    },
    adjust: function () {
      var e = this._seriesData;
      var t = this._series.filter(function (e) {
        return e.isVisible();
      }).reduce(function (e, t) {
        var n = t.getViewport();
        e.min = (0, d.isDefined)(n.min) ? e.min < n.min ? e.min : n.min : e.min;
        e.max = (0, d.isDefined)(n.max) ? e.max > n.max ? e.max : n.max : e.max;
        if (t.showZero) {
          (e = new i.Range(e)).correctValueZeroLevel();
        }
        return e;
      }, {});
      if ((0, d.isDefined)(t.min) && (0, d.isDefined)(t.max)) {
        e.minVisible = t.min;
        e.maxVisible = t.max;
      }
      e.userBreaks = this._getScaleBreaks(this._options, {
        minVisible: e.minVisible,
        maxVisible: e.maxVisible
      }, this._series, this.isArgumentAxis);
      this._translator.updateBusinessRange(this._getViewportRange());
    },
    hasWrap: function () {
      return this._wrapped;
    },
    getAxisPosition: function () {
      return this._axisPosition;
    },
    _getStick: function () {
      return !this._options.valueMarginsEnabled;
    },
    _getStripLabelCoords: function (e, t, n) {
      var i;
      var o;
      var a;
      var r;
      var s = this._orthogonalPositions;
      var l = this._isHorizontal;
      var u = n.horizontalAlignment;
      var d = n.verticalAlignment;
      if (l) {
        if (u === x) {
          i = e + (t - e) / 2;
        } else if (u === y) {
          i = e;
        } else if (u === b) {
          i = t;
        }
        o = s[a = d, r = "start", a === "center" && (r = "center"), a === "bottom" && (r = "end"), r];
      } else {
        i = s[function (e) {
          var t = "start";
          if (e === "center") {
            t = "center";
          }
          if (e === "right") {
            t = "end";
          }
          return t;
        }(u)];
        if (d === _) {
          o = e;
        } else if (d === x) {
          o = t + (e - t) / 2;
        } else if (d === v) {
          o = t;
        }
      }
      return {
        x: i,
        y: o
      };
    },
    _getTranslatedValue: function (e, t) {
      var n = this._translator.translate(e, t, this._options.type === "semidiscrete" && this._options.tickInterval);
      var i = this._axisPosition;
      var o = this._isHorizontal;
      return {
        x: o ? n : i,
        y: o ? i : n
      };
    },
    areCoordsOutsideAxis: function (e) {
      var t = this._isHorizontal ? e.x : e.y;
      var n = this.getVisibleArea();
      return t < n[0] || t > n[1];
    },
    _getSkippedCategory: function (e) {
      var t;
      if (this._options.type === c.default.discrete && this._tickOffset && e.length !== 0) {
        t = e[e.length - 1];
      }
      return t;
    },
    _filterBreaks: function (e, t, n) {
      var i = t.minVisible;
      var o = t.maxVisible;
      var r = n ? n.width : 0;
      return e.reduce(function (e, t) {
        var n;
        var s = t.from;
        var l = t.to;
        var u = e[e.length - 1];
        if (!(0, d.isDefined)(s) || !(0, d.isDefined)(l)) {
          return e;
        }
        if (s > l) {
          l = [s, s = l][0];
        }
        if (e.length && s < u.to) {
          if (l > u.to) {
            u.to = l > o ? o : l;
            if (u.gapSize) {
              u.gapSize = undefined;
              u.cumulativeWidth += r;
            }
          }
        } else if ((s >= i && s < o || l <= o && l > i) && (l = l <= o ? l : o) - (s = s >= i ? s : i) < o - i) {
          n = {
            from: s,
            to: l,
            cumulativeWidth: ((u == null ? undefined : u.cumulativeWidth) ?? 0) + r
          };
          if (t.gapSize) {
            n.gapSize = a.default.convertMillisecondsToDateUnits(l - s);
            n.cumulativeWidth = (u == null ? undefined : u.cumulativeWidth) ?? 0;
          }
          e.push(n);
        }
        return e;
      }, []);
    },
    _getScaleBreaks: function (e, t, n, i) {
      var o = this;
      var a = (e.breaks || []).map(function (e) {
        return {
          from: o.parser(e.startValue),
          to: o.parser(e.endValue)
        };
      });
      if (e.type !== "discrete" && e.dataType === "datetime" && e.workdaysOnly) {
        a = a.concat((0, s.generateDateBreaks)(t.minVisible, t.maxVisible, e.workWeek, e.singleWorkdays, e.holidays));
      }
      if (!i && e.type !== "discrete" && e.dataType !== "datetime" && e.autoBreaksEnabled && e.maxAutoBreakCount !== 0) {
        a = a.concat(function (e, t, n) {
          var i = e.logarithmBase;
          var o = e.type;
          var a = e.maxAutoBreakCount;
          var r = [];
          var s = o === "logarithmic" ? function (e, t) {
            return (0, u.getLog)(t / e, i);
          } : function (e, t) {
            return t - e;
          };
          for (var l = s(n.minVisible, n.maxVisible), c = t.reduce(function (e, t) {
              var n = t.getPointsInViewPort();
              e[0] = e[0].concat(n[0]);
              e[1] = e[1].concat(n[1]);
              return e;
            }, [[], []]), h = l * 0.3, f = function (e, t, n) {
              var i;
              var o;
              var a;
              var r;
              var s;
              var l = null;
              var u = [];
              i = 1;
              o = e.length;
              for (; i < o; i++) {
                s = n(a = e[i], r = e[i - 1]);
                if (t.indexOf(a) >= 0) {
                  if (!l || s > l.length) {
                    l = {
                      start: a,
                      end: r,
                      length: s
                    };
                  }
                } else {
                  if (l && s < l.length) {
                    u.push(l);
                  } else {
                    u.push({
                      start: a,
                      end: r,
                      length: s
                    });
                  }
                  l = null;
                }
              }
              if (l) {
                u.push(l);
              }
              return u;
            }(c[0].concat(c[1]).sort(function (e, t) {
              return t - e;
            }), c[1].filter(function (e) {
              return c[0].indexOf(e) < 0;
            }), s).sort(function (e, t) {
              return t.length - e.length;
            }), p = g.min.apply(null, f.map(function (e) {
              return e.length;
            })) / 1000, m = (0, d.isDefined)(a) ? g.min(a, f.length) : f.length, _ = 0; _ < m && f[_].length >= h && !(l <= f[_].length); _++) {
            if ((l -= f[_].length) > p || l < -p) {
              r.push({
                from: f[_].start,
                to: f[_].end
              });
              h = l * 0.3;
            }
          }
          C(r);
          return r;
        }(e, n, t));
      }
      return C(a);
    },
    _drawBreak: function (e, t, n, i, o, a) {
      var r = e - (this._translator.isInverted() ? 0 : i + 1);
      var s = {
        "stroke-width": 1,
        stroke: o.borderColor,
        sharp: o.isWaved ? undefined : o.isHorizontal ? "h" : "v"
      };
      var l = {
        stroke: o.color,
        "stroke-width": i
      };
      var u = this._isHorizontal ? A : function (e) {
        return e;
      };
      var d = O(this._renderer, a, u, t, r, n, o.isWaved);
      d(i / 2, l);
      d(0, s);
      d(i, s);
    },
    _createBreakClipRect: function (e, t) {
      var n;
      var i = this._canvas;
      var o = t - e;
      n = this._isHorizontal ? this._renderer.clipRect(i.left, e, i.width, o) : this._renderer.clipRect(e, i.top, o, i.height);
      this._breaksElements = this._breaksElements || [];
      this._breaksElements.push(n);
      return n.id;
    },
    _createBreaksGroup: function (e, t) {
      var n = this._renderer.g().attr({
        class: this._axisCssPrefix + "breaks",
        "clip-path": this._createBreakClipRect(e, t)
      }).append(this._scaleBreaksGroup);
      this._breaksElements = this._breaksElements || [];
      this._breaksElements.push(n);
      return n;
    },
    _disposeBreaksGroup: function () {
      (this._breaksElements || []).forEach(function (e) {
        e.dispose();
      });
      this._breaksElements = null;
    },
    drawScaleBreaks: function (e) {
      var t;
      var n;
      var i;
      var o;
      var a;
      var r = this;
      var s = r._options;
      var l = s.breakStyle;
      var u = s.position;
      var d = r._translator.getBusinessRange().breaks || [];
      r._disposeBreaksGroup();
      if (d && d.length) {
        var c = {
          color: r._options.containerColor,
          borderColor: l.color,
          isHorizontal: r._isHorizontal,
          isWaved: l.line.toLowerCase() !== "straight"
        };
        if (e) {
          t = e.start;
          n = e.end;
        } else {
          t = r._orthogonalPositions.start - (!s.visible || r._axisShift || u !== y && u !== _ ? 0 : 3);
          n = r._orthogonalPositions.end + (!s.visible || u !== b && u !== v ? 0 : 3);
        }
        var h = r._createBreaksGroup(t, n);
        if (r._axisShift && s.visible) {
          o = r._axisPosition - r._axisShift - 3;
          a = o + 6;
          i = r._createBreaksGroup(o, a);
        }
        d.forEach(function (e) {
          if (!e.gapSize) {
            var u = r._getTranslatedCoord(e.to);
            r._drawBreak(u, t, n, l.width, c, h);
            if (r._axisShift && s.visible) {
              r._drawBreak(u, o, a, l.width, c, i);
            }
          }
        });
      }
    },
    _getSpiderCategoryOption: l.noop,
    shift: function (e) {
      var t = this._options;
      var n = t.isHorizontal;
      var i = this.getMultipleAxesSpacing();
      var o = this._axisConstantLineGroups;
      function a(t, o) {
        var a = {
          translateX: 0,
          translateY: 0
        };
        var r = e[t] ? e[t] + i : 0;
        a[n ? "translateY" : "translateX"] = (t === y || t === _ ? -1 : 1) * r;
        (o[t] || o).attr(a);
        return r;
      }
      this._axisShift = a(t.position, this._axisGroup);
      a(t.position, this._axisElementsGroup);
      (n ? [_, v] : [y, b]).forEach(function (e) {
        a(e, o.above);
        a(e, o.under);
      });
    },
    getCustomPosition: function (e) {
      var t;
      var n = this.getOrthogonalAxis();
      var i = e ?? this.getResolvedPositionOption();
      var o = this.getOptions().offset;
      var a = n.getTranslator();
      var r = n.getOptions().type;
      var s = n.validateUnit(i);
      if (r === "discrete" && (!a._categories || a._categories.indexOf(s) < 0)) {
        s = undefined;
      }
      t = this.positionIsBoundary(i) ? this.getPredefinedPosition(i) : (0, d.isDefined)(s) ? a.to(s, -1) : this.getPredefinedPosition(this.getOptions().position);
      if (isFinite(t) && isFinite(o)) {
        t += o;
      }
      return t;
    },
    getCustomBoundaryPosition: function (e) {
      var t = this.getOptions();
      var n = t.customPosition;
      var i = t.offset;
      var o = e ?? this.getResolvedPositionOption();
      var a = this.getOrthogonalAxis();
      var r = a.getTranslator();
      var s = r.getCanvasVisibleArea();
      if ((0, d.isDefined)(a._orthogonalPositions) && r.canvasLength !== 0) {
        var l = this.getCustomPosition(o);
        if (!(0, d.isDefined)(l)) {
          return this.getResolvedBoundaryPosition();
        }
        if ((0, d.isDefined)(n)) {
          if (l <= s.min) {
            if (this._isHorizontal) {
              return _;
            } else {
              return y;
            }
          }
          if (l >= s.max) {
            if (this._isHorizontal) {
              return v;
            } else {
              return b;
            }
          }
        } else if ((0, d.isDefined)(i)) {
          if (l <= this._orthogonalPositions.start) {
            if (this._isHorizontal) {
              return _;
            } else {
              return y;
            }
          }
          if (l >= this._orthogonalPositions.end) {
            if (this._isHorizontal) {
              return v;
            } else {
              return b;
            }
          }
        }
        return l;
      }
    },
    getResolvedPositionOption: function () {
      var t = this.getOptions();
      return t.customPosition ?? t.position;
    },
    customPositionIsAvailable: function () {
      var e = this.getOptions();
      return (0, d.isDefined)(this.getOrthogonalAxis()) && ((0, d.isDefined)(e.customPosition) || isFinite(e.offset));
    },
    hasNonBoundaryPosition: function () {
      return this.customPositionIsAvailable() && !this.customPositionIsBoundary();
    },
    getResolvedBoundaryPosition: function () {
      if (this.customPositionIsBoundary()) {
        return this._customBoundaryPosition;
      } else {
        return this.getOptions().position;
      }
    },
    customPositionEqualsToPredefined: function () {
      return this.customPositionIsBoundary() && this._customBoundaryPosition === this.getOptions().position;
    },
    customPositionIsBoundary: function () {
      return this.positionIsBoundary(this._customBoundaryPosition);
    },
    positionIsBoundary: function (e) {
      return [_, y, v, b].indexOf(e) >= 0;
    },
    getPredefinedPosition: function (e) {
      return this._orthogonalPositions?.[e === _ || e === y ? "start" : "end"];
    },
    resolveOverlappingForCustomPositioning: function (e) {
      var t = this;
      if (t.hasNonBoundaryPosition() || t.customPositionIsBoundary() || e.some(function (e) {
        return e.hasNonBoundaryPosition();
      })) {
        var n = {
          axes: [],
          ticks: []
        };
        e.filter(function (e) {
          return e.pane === t.pane;
        }).forEach(function (e) {
          for (var i = 0; i < t._majorTicks.length; i++) {
            var o = t._majorTicks[i];
            var a = o.label;
            if (a) {
              if (n.axes.indexOf(e) < 0 && t._detectElementsOverlapping(a, e._axisElement)) {
                n.axes.push(e);
                t._shiftThroughOrthogonalAxisOverlappedTick(a, e);
              }
              for (var r = 0; r < e._majorTicks.length; r++) {
                var s = e._majorTicks[r].label;
                if (s && t._detectElementsOverlapping(a, s)) {
                  n.ticks.push(o);
                  t._shiftThroughAxisOverlappedTick(o);
                  i = t._majorTicks.length;
                  break;
                }
              }
            }
            if (o.mark && n.ticks.indexOf(o) < 0) {
              if (t._isHorizontal && o.mark.attr("translateY")) {
                o.mark.attr({
                  translateY: 0
                });
              } else if (!t._isHorizontal && o.mark.attr("translateX")) {
                o.mark.attr({
                  translateX: 0
                });
              }
            }
          }
        });
      }
    },
    _shiftThroughOrthogonalAxisOverlappedTick: function (e, t) {
      var n = e.getBBox();
      var i = t.getAxisPosition();
      var o = t.getOptions().label;
      var a = o.position;
      var r = o.indentFromAxis / 2;
      var s = this._isHorizontal ? "translateX" : "translateY";
      var l = this._isHorizontal ? y : _;
      var u = e.attr(s);
      var d = (this._isHorizontal ? n.x : n.y) + u;
      var c = i - d;
      var h = d + (this._isHorizontal ? n.width : n.height) - i;
      var f = {
        [s]: u
      };
      if (c > 0 && h > 0) {
        if (h - c > 1) {
          f[s] += c + r;
        } else if (c - h > 1) {
          f[s] -= h + r;
        } else {
          f[s] += a === l ? c + r : -(h + r);
        }
        e.attr(f);
      }
    },
    _shiftThroughAxisOverlappedTick: function (e) {
      var t;
      var n = e.label;
      if (n) {
        var i = n.getBBox();
        var o = (t = e.mark) === null || t === undefined ? undefined : t.getBBox();
        var a = this.getAxisPosition();
        var r = this.getOptions().label;
        var s = r.indentFromAxis;
        var l = r.position;
        var u = this._isHorizontal ? _ : y;
        var d = this._isHorizontal ? "translateY" : "translateX";
        var c = n.attr(d);
        var h = (this._isHorizontal ? i.y : i.x) + c;
        var f = this._isHorizontal ? i.height : i.width;
        var p = {
          [d]: c + (l === u ? a - h + s : -(h - a + f + s))
        };
        n.attr(p);
        if (e.mark) {
          var g = this._isHorizontal ? o.height : o.width;
          var m = l === u ? 1 : -1;
          p[d] = m * (g - 1);
          e.mark.attr(p);
        }
      }
    },
    _detectElementsOverlapping: function (e, t) {
      if (!e || !t) {
        return false;
      }
      var n = e.getBBox();
      var i = n.x + e.attr("translateX");
      var o = n.y + e.attr("translateY");
      var a = t.getBBox();
      var r = a.x + t.attr("translateX");
      var s = a.y + t.attr("translateY");
      return (r >= i && r <= i + n.width || i >= r && i <= r + a.width) && (s >= o && s <= o + n.height || o >= s && o <= s + a.height);
    }
  }
};
function O(e, t, n, i, o, a, r) {
  var s = r ? "bezier" : "line";
  var l = e.g().append(t);
  return function (t, u) {
    e.path(n(function (e, t, n, i, o) {
      if (!o) {
        return [e, t + i, n, t + i];
      }
      var a;
      var r = (t += i) + 0;
      var s = t + 2;
      var l = t + 4;
      var u = [[e, s]];
      for (a = e; a < n + 24; a += 24) {
        u.push([a + 6, r, a + 6, r, a + 12, s, a + 18, l, a + 18, l, a + 24, s]);
      }
      return [].concat.apply([], u);
    }(i, o, a, t, r)), s).attr(u).append(l);
  };
}
function A(e) {
  var t;
  var n = [];
  for (t = 0; t < e.length; t += 2) {
    n.push(e[t + 1]);
    n.push(e[t]);
  }
  return n;
}
exports.default = E;
module.exports = exports.default;
module.exports.default = exports.default;