exports.linearSpider = exports.linear = exports.circularSpider = exports.circular = undefined;
var i = require("./19157.js");
var o = require("./35922.js");
var a = require("./13306.js");
var r = c(require("./53805.js"));
var s = c(require("./99415.js"));
var l = require("./41013.js");
var u = require("./32945.js");
var d = require("./20576.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = Math.PI;
var f = Math.abs;
var p = Math.atan;
var g = Math.round;
var m = Math.min;
var _ = Math.max;
var v = s.default.linear;
function y(e) {
  var t;
  if ((e = (0, i.normalizeAngle)(e)) >= 315 && e <= 360 || e < 45 && e >= 0) {
    t = 1;
  } else if (e >= 45 && e < 135) {
    t = 2;
  } else if (e >= 135 && e < 225) {
    t = 3;
  } else if (e >= 225 && e < 315) {
    t = 4;
  }
  return t;
}
var b = {
  _calculateValueMargins: function (e) {
    var t = this._getViewportRange();
    var n = t.minVisible;
    var i = t.maxVisible;
    if (e && e.length > 1) {
      i = (n = n < e[0].value ? n : e[0].value) > e[e.length - 1].value ? i : e[e.length - 1].value;
    }
    return {
      minValue: n,
      maxValue: i
    };
  },
  applyMargins: function () {
    var e = this._calculateValueMargins(this._majorTicks);
    var t = this._translator.getBusinessRange();
    t.addRange({
      minVisible: e.minValue,
      maxVisible: e.maxValue,
      interval: this._calculateRangeInterval(t.interval)
    });
    this._translator.updateBusinessRange(t);
  },
  _getTranslatorOptions: function () {
    return {
      isHorizontal: true,
      conversionValue: true,
      addSpiderCategory: this._getSpiderCategoryOption(),
      stick: this._getStick()
    };
  },
  getCenter: function () {
    return this._center;
  },
  getRadius: function () {
    return this._radius;
  },
  getAngles: function () {
    var e = this._options;
    return [e.startAngle, e.endAngle];
  },
  _updateRadius: function (e) {
    var t = m(e.width - e.left - e.right, e.height - e.top - e.bottom) / 2;
    this._radius = t < 0 ? 0 : t;
  },
  _updateCenter: function (e) {
    this._center = {
      x: e.left + (e.width - e.right - e.left) / 2,
      y: e.top + (e.height - e.top - e.bottom) / 2
    };
  },
  _processCanvas: function (e) {
    this._updateRadius(e);
    this._updateCenter(e);
    return {
      left: 0,
      right: 0,
      width: this._getScreenDelta()
    };
  },
  _createAxisElement: function () {
    return this._renderer.circle();
  },
  _updateAxisElementPosition: function () {
    var e = this.getCenter();
    this._axisElement.attr({
      cx: e.x,
      cy: e.y,
      r: this.getRadius()
    });
  },
  _boundaryTicksVisibility: {
    min: true
  },
  _getSpiderCategoryOption: function () {
    return this._options.firstPointOnStartAngle;
  },
  _validateOptions: function (e) {
    var t = e.originValue;
    var n = e.wholeRange = {};
    var a = e.period;
    if ((0, o.isDefined)(t)) {
      t = this.validateUnit(t);
    }
    if (a > 0 && e.argumentType === r.default.numeric) {
      t = t || 0;
      n.endValue = t + a;
      this._viewport = (0, i.getVizRangeObject)([t, n.endValue]);
    }
    if ((0, o.isDefined)(t)) {
      n.startValue = t;
    }
  },
  getMargins: function () {
    var e = this._options.tick;
    var t = _(e.visible ? e.length / 2 + e.shift : 0, 0);
    var n = this.getRadius();
    var i = this._center;
    var o = i.x;
    var r = i.y;
    var s = this._majorTicks.map(function (e) {
      return e.label && e.label.getBBox();
    }).filter(function (e) {
      return e;
    });
    var l = (0, a.extend)({}, this._canvas, {
      left: o - n,
      top: r - n,
      right: this._canvas.width - (o + n),
      bottom: this._canvas.height - (r + n)
    });
    var d = (0, u.calculateCanvasMargins)(s, l);
    Object.keys(d).forEach(function (e) {
      return d[e] = d[e] < t ? t : d[e];
    });
    return d;
  },
  _updateLabelsPosition: function () {
    (0, u.measureLabels)(this._majorTicks);
    this._adjustLabelsCoord(0, 0, true);
    this._checkBoundedLabelsOverlapping(this._majorTicks, this._majorTicks.map(function (e) {
      return e.labelBBox;
    }));
  },
  _setVisualRange: d.noop,
  applyVisualRangeSetter: d.noop,
  _getStick: function () {
    return this._options.firstPointOnStartAngle || this._options.type !== r.default.discrete;
  },
  _getTranslatedCoord: function (e, t) {
    return this._translator.translate(e, t) - 90;
  },
  _getCanvasStartEnd: function () {
    return {
      start: -90,
      end: 270
    };
  },
  _getStripGraphicAttributes: function (e, t) {
    var n = this.getCenter();
    var i = this.getAngles()[0];
    var o = this.getRadius();
    return {
      x: n.x,
      y: n.y,
      innerRadius: 0,
      outerRadius: o,
      startAngle: -t - i,
      endAngle: -e - i
    };
  },
  _createStrip: function (e) {
    return this._renderer.arc(e.x, e.y, e.innerRadius, e.outerRadius, e.startAngle, e.endAngle);
  },
  _getStripLabelCoords: function (e, t) {
    var n = this._getStripGraphicAttributes(e, t);
    var o = n.startAngle + (n.endAngle - n.startAngle) / 2;
    var a = (0, i.getCosAndSin)(o);
    var s = this.getRadius() / 2;
    var l = this.getCenter();
    return {
      x: g(l.x + s * a.cos),
      y: g(l.y - s * a.sin),
      align: r.default.center
    };
  },
  _getConstantLineGraphicAttributes: function (e) {
    var t = this.getCenter();
    var n = this.getRadius();
    return {
      points: [t.x, t.y, t.x + n, t.y]
    };
  },
  _createConstantLine: function (e, t) {
    return this._createPathElement(this._getConstantLineGraphicAttributes(e).points, t);
  },
  _rotateConstantLine: function (e, t) {
    var n = this.getCenter();
    var i = n.x;
    var o = n.y;
    e.rotate(t + this.getAngles()[0], i, o);
  },
  _getConstantLineLabelsCoords: function (e) {
    var t = (0, i.getCosAndSin)(-e - this.getAngles()[0]);
    var n = this.getRadius() / 2;
    var o = this.getCenter();
    return {
      x: g(o.x + n * t.cos),
      y: g(o.y - n * t.sin)
    };
  },
  _checkAlignmentConstantLineLabels: d.noop,
  _adjustDivisionFactor: function (e) {
    return e * 180 / (this.getRadius() * h);
  },
  _getScreenDelta: function () {
    var e = this.getAngles();
    return f(e[0] - e[1]);
  },
  _getTickMarkPoints: function (e, t, n) {
    var i = n.shift;
    var o = i === undefined ? 0 : i;
    var a = this.getCenter();
    var r = this.getRadius() + t * {
      inside: -1,
      center: -0.5,
      outside: 0
    }[this._options.tickOrientation || "center"];
    return [a.x + r + o, a.y, a.x + r + t + o, a.y];
  },
  _getLabelAdjustedCoord: function (e, t, n, o) {
    var a = e.labelCoords;
    var r = a.y;
    var s = a.angle;
    var l = (0, i.getCosAndSin)(s);
    var u = l.cos;
    var d = l.sin;
    var c = e.labelBBox;
    var h = c.width / 2;
    var f = c.height / 2;
    var p = this._options.label.indentFromAxis || 0;
    var g = a.x + p * u;
    var m = r + (r - c.y - f) + p * d;
    var _ = 0;
    var v = 0;
    switch (y(s)) {
      case 1:
        _ = h;
        v = f * d;
        break;
      case 2:
        _ = h * u;
        v = f;
        break;
      case 3:
        _ = -h;
        v = f * d;
        break;
      case 4:
        _ = h * u;
        v = -f;
    }
    if (o) {
      var b = this._canvas;
      var x = g - a.x + _;
      var w = m - a.y + v;
      if (c.x + x < b.originalLeft) {
        _ -= c.x + x - b.originalLeft;
      }
      if (c.x + c.width + x > b.width - b.originalRight) {
        _ -= c.x + c.width + x - (b.width - b.originalRight);
      }
      if (c.y + w < b.originalTop) {
        v -= c.y + w - b.originalTop;
      }
      if (c.y + c.height + w > b.height - b.originalBottom) {
        v -= c.y + c.height + w - (b.height - b.originalBottom);
      }
    }
    return {
      x: g + _,
      y: m + v
    };
  },
  _getGridLineDrawer: function () {
    var e = this;
    return function (t, n) {
      var i = e.getCenter();
      return e._createPathElement(e._getGridPoints().points, n).rotate(t.coords.angle, i.x, i.y);
    };
  },
  _getGridPoints: function () {
    var e = this.getRadius();
    var t = this.getCenter();
    return {
      points: [t.x, t.y, t.x + e, t.y]
    };
  },
  _getTranslatedValue: function (e, t) {
    var n = this.getAngles()[0];
    var o = this._translator.translate(e, -t);
    var a = (0, i.convertPolarToXY)(this.getCenter(), n, o, this.getRadius());
    return {
      x: a.x,
      y: a.y,
      angle: this.getTranslatedAngle(o)
    };
  },
  _getAdjustedStripLabelCoords: function (e) {
    var t = e.labelBBox;
    return {
      translateY: e.label.attr("y") - t.y - t.height / 2
    };
  },
  coordsIn: function (e, t) {
    return (0, i.convertXYToPolar)(this.getCenter(), e, t).r > this.getRadius();
  },
  _rotateTick: function (e, t) {
    var n = this.getCenter();
    e.rotate(t.angle, n.x, n.y);
  },
  _validateOverlappingMode: function (e) {
    return r.default.validateOverlappingMode(e);
  },
  _validateDisplayMode: function () {
    return "standard";
  },
  _getStep: function (e) {
    var t = this.getRadius() + (this._options.label.indentFromAxis || 0);
    var n = e.reduce(function (e, t) {
      var n = e;
      if (e.width < t.width) {
        n.width = t.width;
      }
      if (e.height < t.height) {
        n.height = t.height;
      }
      return n;
    }, {
      width: 0,
      height: 0
    });
    var i = f(p(n.height / (t * 2 - n.width)) * 2 * 180 / h);
    var o = f(p(n.width / (t * 2 - n.height)) * 2 * 180 / h);
    return r.default.getTicksCountInRange(this._majorTicks, "angle", _(i, o));
  },
  _checkBoundedLabelsOverlapping: function (e, t, n) {
    var i = this._options.label;
    if ((n = n || this._validateOverlappingMode(i.overlappingBehavior)) === "hide") {
      var o = e.reduce(function (e, t, n) {
        if (t.label) {
          return n;
        } else {
          return e;
        }
      }, null);
      if (o && r.default.areLabelsOverlap(t[0], t[o], i.minSpacing, r.default.center)) {
        if (i.hideFirstOrLast === "first") {
          e[0].removeLabel();
        } else {
          e[o].removeLabel();
        }
      }
    }
  },
  shift: function (e) {
    this._axisGroup.attr({
      translateX: e.right,
      translateY: e.bottom
    });
    this._axisElementsGroup.attr({
      translateX: e.right,
      translateY: e.bottom
    });
  },
  getTranslatedAngle: function (e) {
    return e + this.getAngles()[0] - 90;
  }
};
var x = b;
exports.circular = x;
var w = (0, a.extend)({}, b, {
  _createAxisElement: function () {
    return this._renderer.path([], "area");
  },
  _updateAxisElementPosition: function () {
    this._axisElement.attr({
      points: (0, i.map)(this.getSpiderTicks(), function (e) {
        return {
          x: e.coords.x,
          y: e.coords.y
        };
      })
    });
  },
  _getStick: function () {
    return true;
  },
  _getSpiderCategoryOption: function () {
    return true;
  },
  getSpiderTicks: function () {
    var e = this.getFullTicks();
    this._spiderTicks = e.map((0, l.tick)(this, this.renderer, {}, {}, this._getSkippedCategory(e), true));
    this._spiderTicks.forEach(function (e) {
      e.initCoords();
    });
    return this._spiderTicks;
  },
  _getStripGraphicAttributes: function (e, t) {
    for (var n, i, o, a, r = this.getCenter(), s = this.getSpiderTicks(), l = [], u = 0, d = s.length; u < d;) {
      if ((a = s[u].coords).angle >= e && a.angle <= t) {
        if (!n) {
          n = (s[u - 1] || s[s.length - 1]).coords;
          l.push((a.x + n.x) / 2, (a.y + n.y) / 2);
        }
        l.push(a.x, a.y);
        o = (s[u + 1] || s[0]).coords;
        i = {
          x: (a.x + o.x) / 2,
          y: (a.y + o.y) / 2
        };
      }
      u++;
    }
    l.push(i.x, i.y);
    l.push(r.x, r.y);
    return {
      points: l
    };
  },
  _createStrip: function (e) {
    var t = e.points;
    return this._renderer.path(t, "area");
  },
  _getTranslatedCoord: function (e, t) {
    return this._translator.translate(e, t) - 90;
  },
  _setTickOffset: function () {
    this._tickOffset = false;
  }
});
exports.circularSpider = w;
var C = {
  _resetMargins: function () {
    this._reinitTranslator(this._getViewportRange());
  },
  _getStick: v._getStick,
  _getSpiderCategoryOption: d.noop,
  _getTranslatorOptions: function () {
    return {
      isHorizontal: true,
      stick: this._getStick()
    };
  },
  getRadius: b.getRadius,
  getCenter: b.getCenter,
  getAngles: b.getAngles,
  _updateRadius: b._updateRadius,
  _updateCenter: b._updateCenter,
  _processCanvas: function (e) {
    this._updateRadius(e);
    this._updateCenter(e);
    return {
      left: 0,
      right: 0,
      startPadding: e.startPadding,
      endPadding: e.endPadding,
      width: this.getRadius()
    };
  },
  _createAxisElement: v._createAxisElement,
  _updateAxisElementPosition: function () {
    var e = this.getCenter();
    this._axisElement.attr({
      points: [e.x, e.y, e.x + this.getRadius(), e.y]
    }).rotate(this.getAngles()[0] - 90, e.x, e.y);
  },
  _getScreenDelta: function () {
    return this.getRadius();
  },
  _getTickMarkPoints: function (e, t) {
    return [e.x - t / 2, e.y, e.x + t / 2, e.y];
  },
  _getLabelAdjustedCoord: function (e) {
    var t = e.labelCoords;
    var n = t.y;
    var o = (0, i.getCosAndSin)(t.angle);
    var a = this._options.label.indentFromAxis || 0;
    var r = e.labelBBox;
    return {
      x: t.x - f(a * o.sin) + f(r.width / 2 * o.cos) - r.width / 2,
      y: n + (n - r.y) - f(r.height / 2 * o.sin) + f(a * o.cos)
    };
  },
  _getGridLineDrawer: function () {
    var e = this;
    return function (t, n) {
      var i = e._getGridPoints(t.coords);
      return e._renderer.circle(i.cx, i.cy, i.r).attr(n).sharp();
    };
  },
  _getGridPoints: function (e) {
    var t = this.getCenter();
    var n = (0, i.getDistance)(t.x, t.y, e.x, e.y);
    if (n > this.getRadius()) {
      return {
        cx: null,
        cy: null,
        r: null
      };
    } else {
      return {
        cx: t.x,
        cy: t.y,
        r: n
      };
    }
  },
  _getTranslatedValue: function (e, t) {
    var n = this.getAngles()[0];
    var o = (0, i.convertPolarToXY)(this.getCenter(), n, 0, this._translator.translate(e, t));
    return {
      x: o.x,
      y: o.y,
      angle: n - 90
    };
  },
  _getTranslatedCoord: function (e, t) {
    return this._translator.translate(e, t);
  },
  _getCanvasStartEnd: function () {
    var e = this.getTranslator().getBusinessRange().invert;
    var t = [0, this.getRadius()];
    if (e) {
      t.reverse();
    }
    return {
      start: t[0],
      end: t[1]
    };
  },
  _getStripGraphicAttributes: function (e, t) {
    var n = this.getCenter();
    return {
      x: n.x,
      y: n.y,
      innerRadius: e,
      outerRadius: t
    };
  },
  _createStrip: function (e) {
    return this._renderer.arc(e.x, e.y, e.innerRadius, e.outerRadius, 0, 360);
  },
  _getAdjustedStripLabelCoords: b._getAdjustedStripLabelCoords,
  _getStripLabelCoords: function (e, t) {
    var n = e + (t - e) / 2;
    var i = this.getCenter();
    var o = g(i.y - n);
    return {
      x: i.x,
      y: o,
      align: r.default.center
    };
  },
  _getConstantLineGraphicAttributes: function (e) {
    var t = this.getCenter();
    return {
      cx: t.x,
      cy: t.y,
      r: e
    };
  },
  _createConstantLine: function (e, t) {
    var n = this._getConstantLineGraphicAttributes(e);
    return this._renderer.circle(n.cx, n.cy, n.r).attr(t).sharp();
  },
  _getConstantLineLabelsCoords: function (e) {
    var t = this.getCenter();
    var n = g(t.y - e);
    return {
      x: t.x,
      y: n
    };
  },
  _checkAlignmentConstantLineLabels: d.noop,
  _rotateTick: function (e, t, n) {
    if (!n) {
      e.rotate(t.angle + 90, t.x, t.y);
    }
  },
  _validateOverlappingMode: b._validateOverlappingMode,
  _validateDisplayMode: b._validateDisplayMode,
  _getStep: function (e) {
    var t = y(this.getAngles()[0]);
    var n = this._options.label.minSpacing;
    var i = t === 2 || t === 4 ? function (e) {
      return e.width + n;
    } : function (e) {
      return e.height;
    };
    var o = e.reduce(function (e, t) {
      return _(e, i(t));
    }, 0);
    return r.default.getTicksCountInRange(this._majorTicks, t === 2 || t === 4 ? "x" : "y", o);
  }
};
exports.linear = C;
var S = (0, a.extend)({}, C, {
  _createPathElement: function (e, t) {
    return this._renderer.path(e, "area").attr(t).sharp();
  },
  setSpiderTicks: function (e) {
    this._spiderTicks = e;
  },
  _getGridLineDrawer: function () {
    var e = this;
    return function (t, n) {
      return e._createPathElement(e._getGridPoints(t.coords).points, n);
    };
  },
  _getGridPoints: function (e) {
    var t = this.getCenter();
    var n = (0, i.getDistance)(t.x, t.y, e.x, e.y);
    return this._getGridPointsByRadius(n);
  },
  _getGridPointsByRadius: function (e) {
    var t = this.getCenter();
    if (e > this.getRadius()) {
      return {
        points: null
      };
    } else {
      return {
        points: (0, i.map)(this._spiderTicks, function (n) {
          var o = (0, i.getCosAndSin)(n.coords.angle);
          return {
            x: g(t.x + e * o.cos),
            y: g(t.y + e * o.sin)
          };
        })
      };
    }
  },
  _getStripGraphicAttributes: function (e, t) {
    var n = this._getGridPointsByRadius(t).points;
    return {
      points: [this._getGridPointsByRadius(e).points, n.reverse()]
    };
  },
  _createStrip: w._createStrip,
  _getConstantLineGraphicAttributes: function (e) {
    return this._getGridPointsByRadius(e);
  },
  _createConstantLine: function (e, t) {
    return this._createPathElement(this._getConstantLineGraphicAttributes(e).points, t);
  }
});
exports.linearSpider = S;