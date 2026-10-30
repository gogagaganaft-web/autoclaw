exports.dxBarGauge = undefined;
var i = p(require("./99393.js"));
var o = require("./48013.js");
var a = require("./20576.js");
var r = require("./33224.js");
var s = require("./13306.js");
var l = require("./19157.js");
var u = require("./18029.js");
var d = p(require("./31500.js"));
var c = require("./16342.js");
var h = require("./56672.js");
var f = require("./60810.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g;
var m = Math.PI / 180;
var _ = Math.abs;
var v = Math.round;
var y = Math.floor;
var b = Math.min;
var x = Math.max;
var w = u.getSampleText;
var C = u.formatValue;
var S = u.compareArrays;
var k = Array.isArray;
var D = l.convertAngleToRendererSpace;
var I = l.getCosAndSin;
var T = l.patchFontOptions;
var E = Number;
var O = isFinite;
var A = a.noop;
var P = s.extend;
var M = u.BaseGauge.inherit({
  _rootClass: "dxbg-bar-gauge",
  _themeSection: "barGauge",
  _fontFields: ["label.font", "legend.font", "legend.title.font", "legend.title.subtitle.font"],
  _initCore: function () {
    var e = this;
    e.callBase.apply(e, arguments);
    e._barsGroup = e._renderer.g().attr({
      class: "dxbg-bars"
    }).linkOn(e._renderer.root, "bars");
    e._values = [];
    e._context = {
      renderer: e._renderer,
      translator: e._translator,
      tracker: e._tracker,
      group: e._barsGroup
    };
    e._animateStep = function (t) {
      var n;
      var i;
      var o = e._bars;
      n = 0;
      i = o.length;
      for (; n < i; ++n) {
        o[n].animate(t);
      }
    };
    e._animateComplete = function () {
      e._bars.forEach(function (e) {
        return e.endAnimation();
      });
      e._checkOverlap();
    };
  },
  _disposeCore: function () {
    var e = this;
    e._barsGroup.linkOff();
    e._barsGroup = e._values = e._context = e._animateStep = e._animateComplete = null;
    e.callBase.apply(e, arguments);
  },
  _setupDomainCore: function () {
    var e = this.option("startValue");
    var t = this.option("endValue");
    if (!O(e)) {
      e = 0;
    }
    if (!O(t)) {
      t = 100;
    }
    this._translator.setDomain(e, t);
    this._baseValue = this._translator.adjust(this.option("baseValue"));
    if (!O(this._baseValue)) {
      this._baseValue = e < t ? e : t;
    }
  },
  _getDefaultSize: function () {
    return {
      width: 300,
      height: 300
    };
  },
  _setupCodomain: d.default.prototype._setupCodomain,
  _getApproximateScreenRange: function () {
    var e = this._area.sides;
    var t = this._canvas.width / (e.right - e.left);
    var n = this._canvas.height / (e.down - e.up);
    var i = t < n ? t : n;
    return -this._translator.getCodomainRange() * i * m;
  },
  _setupAnimationSettings: function () {
    var e = this;
    e.callBase.apply(e, arguments);
    if (e._animationSettings) {
      e._animationSettings.step = e._animateStep;
      e._animationSettings.complete = e._animateComplete;
    }
  },
  _cleanContent: function () {
    this._barsGroup.linkRemove();
    if (this._animationSettings) {
      this._barsGroup.stopAnimation();
    }
    this._barsGroup.clear();
  },
  _renderContent: function () {
    var e;
    var t;
    var n = this.option("label");
    var i = this._context;
    this._barsGroup.linkAppend();
    i.textEnabled = n === undefined || n && (!("visible" in n) || n.visible);
    if (i.textEnabled) {
      i.textColor = n && n.font && n.font.color || null;
      n = P(true, {}, this._themeManager.theme().label, n);
      i.formatOptions = {
        format: n.format !== undefined ? n.format : this._defaultFormatOptions,
        customizeText: n.customizeText
      };
      i.textOptions = {
        align: "center"
      };
      i.fontStyles = T(P({}, this._themeManager.theme().label.font, n.font, {
        color: null
      }));
      this._textIndent = n.indent > 0 ? E(n.indent) : 0;
      i.lineWidth = n.connectorWidth > 0 ? E(n.connectorWidth) : 0;
      i.lineColor = n.connectorColor || null;
      t = (e = this._renderer.text(w(this._translator, i.formatOptions), 0, 0).attr(i.textOptions).css(i.fontStyles).append(this._barsGroup)).getBBox();
      e.remove();
      i.textY = t.y;
      i.textWidth = t.width;
      i.textHeight = t.height;
    }
    d.default.prototype._applyMainLayout.call(this);
    this._renderBars();
  },
  _measureMainElements: function () {
    var e = {
      maxRadius: this._area.radius
    };
    if (this._context.textEnabled) {
      e.horizontalMargin = this._context.textWidth;
      e.verticalMargin = this._context.textHeight;
      e.inverseHorizontalMargin = this._context.textWidth / 2;
      e.inverseVerticalMargin = this._context.textHeight / 2;
    }
    return e;
  },
  _renderBars: function () {
    var e;
    var t = P({}, this._themeManager.theme(), this.option());
    var n = this._area;
    var i = t.relativeInnerRadius > 0 && t.relativeInnerRadius < 1 ? E(t.relativeInnerRadius) : 0.1;
    e = n.radius;
    if (this._context.textEnabled) {
      this._textIndent = v(b(this._textIndent, e / 2));
      e -= this._textIndent;
    }
    this._outerRadius = y(e);
    this._innerRadius = y(e * i);
    this._barSpacing = t.barSpacing > 0 ? E(t.barSpacing) : 0;
    P(this._context, {
      backgroundColor: t.backgroundColor,
      x: n.x,
      y: n.y,
      startAngle: n.startCoord,
      endAngle: n.endCoord,
      baseAngle: this._translator.translate(this._baseValue)
    });
    this._arrangeBars();
  },
  _arrangeBars: function () {
    var e;
    var t = this._outerRadius - this._innerRadius;
    var n = this._context;
    var i = this._bars.length;
    this._beginValueChanging();
    n.barSize = i > 0 ? x((t - (i - 1) * this._barSpacing) / i, 1) : 0;
    var o = i > 1 ? x(b((t - i * n.barSize) / (i - 1), this._barSpacing), 0) : 0;
    var a = b(y((t + o) / n.barSize), i);
    this._setBarsCount(i);
    t = this._outerRadius;
    n.textRadius = t;
    n.textIndent = this._textIndent;
    this._palette.reset();
    var r = n.barSize + o;
    var s = this._palette.generateColors(a);
    for (e = 0; e < a; ++e, t -= r) {
      this._bars[e].arrange({
        radius: t,
        color: s[e]
      });
    }
    for (var l = a; l < i; l++) {
      this._bars[l].hide();
    }
    if (this._animationSettings && !this._noAnimation) {
      this._animateBars();
    } else {
      this._updateBars();
    }
    this._endValueChanging();
  },
  _setBarsCount: function () {
    if (this._bars.length > 0) {
      if (this._dummyBackground) {
        this._dummyBackground.dispose();
        this._dummyBackground = null;
      }
    } else {
      this._dummyBackground ||= this._renderer.arc().attr({
        "stroke-linejoin": "round"
      });
      this._dummyBackground.attr({
        x: this._context.x,
        y: this._context.y,
        outerRadius: this._outerRadius,
        innerRadius: this._innerRadius,
        startAngle: this._context.endAngle,
        endAngle: this._context.startAngle,
        fill: this._context.backgroundColor
      }).append(this._barsGroup);
    }
  },
  _getCenter: function () {
    return {
      x: this._context.x,
      y: this._context.y
    };
  },
  _updateBars: function () {
    this._bars.forEach(function (e) {
      return e.applyValue();
    });
    this._checkOverlap();
  },
  _checkOverlap: function () {
    var e = this;
    var t = (0, l.normalizeEnum)(e._getOption("resolveLabelOverlapping", true));
    function n(t, n) {
      return (0, l.getVerticallyShiftedAngularCoords)(t, -n, e._context);
    }
    if (t !== "none") {
      if (t === "shift") {
        var i = e._dividePoints();
        r.overlapping.resolveLabelOverlappingInOneDirection(i.left, e._canvas, false, false, n);
        r.overlapping.resolveLabelOverlappingInOneDirection(i.right, e._canvas, false, false, n);
        e._clearLabelsCrossTitle();
        e._drawConnector();
      } else {
        e._clearOverlappingLabels();
      }
    }
  },
  _drawConnector: function () {
    var e = this;
    var t = e._bars;
    var n = e._getOption("label").connectorWidth;
    t.forEach(function (t) {
      if (t._isLabelShifted) {
        var i = t._bar.attr("x");
        var o = t._bar.attr("y");
        var a = t._bar.attr("innerRadius");
        var r = t._bar.attr("outerRadius");
        var s = t._bar.attr("startAngle");
        var u = t._bar.attr("endAngle");
        var d = L.apply(null, (0, l.normalizeArcParams)(i, o, a, r, s, u));
        var c = I(t._angle);
        var h = c.cos;
        var p = c.sin;
        var g = d.x - p * n / 2 - h;
        var m = d.y - h * n / 2 + p;
        var _ = t._text.getBBox();
        var v = t._text._lastCoords;
        var y = e._context.textWidth / 2;
        var b = [g, m, _.x + _.width / 2 + v.x, _.y + v.y];
        if (t._angle > 90) {
          b[2] += y;
        } else {
          b[2] -= y;
        }
        if (t._angle <= 180 && t._angle > 0) {
          b[3] += _.height;
        }
        if (n % 2) {
          var x = -p / 2;
          var w = -h / 2;
          if (t._angle > 180) {
            b[0] -= x;
            b[1] -= w;
          } else if (t._angle > 0 && t._angle <= 90) {
            b[0] += x;
            b[1] += w;
          }
        }
        var C = b.map(function (e) {
          return (0, f.roundFloatPart)(e, 4);
        });
        t._line.attr({
          points: C
        });
        t._line.rotate(0);
        t._isLabelShifted = false;
      }
    });
  },
  _dividePoints: function () {
    return this._bars.reduce(function (e, t) {
      var n = (0, l.normalizeAngle)(t._angle);
      var i = n <= 90 || n >= 270;
      t._text._lastCoords = {
        x: 0,
        y: 0
      };
      (i ? e.right : e.left).push({
        series: {
          isStackedSeries: function () {
            return false;
          },
          isFullStackedSeries: function () {
            return false;
          }
        },
        getLabels: function () {
          return [{
            isVisible: function () {
              return true;
            },
            getBoundingRect: function () {
              var e = t._text.getBBox();
              var n = e.height;
              var i = e.width;
              var o = e.x;
              var a = e.y;
              var r = t._text._lastCoords;
              return {
                x: o + r.x,
                y: a + r.y,
                width: i,
                height: n
              };
            },
            shift: function (e, n) {
              var i = t._text.getBBox();
              t._text._lastCoords = {
                x: e - i.x,
                y: n - i.y
              };
              t._text.attr({
                translateX: e - i.x,
                translateY: n - i.y
              });
              t._isLabelShifted = true;
            },
            draw: function () {
              return t.hideLabel();
            },
            getData: function () {
              return {
                value: t.getValue()
              };
            },
            hideInsideLabel: function () {
              return false;
            }
          }];
        }
      });
      return e;
    }, {
      left: [],
      right: []
    });
  },
  _clearOverlappingLabels: function () {
    for (var e = 0, t = 1, n = this._bars.concat().sort(function (e, t) {
        return e.getValue() - t.getValue();
      }); e < n.length && t < n.length;) {
      var i = n[e];
      var o = n[t];
      if (i.checkIntersect(o)) {
        o.hideLabel();
        t++;
      } else {
        t = (e = t) + 1;
      }
    }
  },
  _clearLabelsCrossTitle: function () {
    var e = this._bars;
    var t = this._title.getLayoutOptions() || {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    };
    var n = t.y + t.height;
    e.forEach(function (e) {
      var t = e._text.getBBox();
      var i = e._text._lastCoords;
      if (n > t.y + i.y) {
        e.hideLabel();
      }
    });
  },
  _animateBars: function () {
    var e;
    var t = this._bars.length;
    if (t > 0) {
      for (e = 0; e < t; ++e) {
        this._bars[e].beginAnimation();
      }
      this._barsGroup.animate({
        _: 0
      }, this._animationSettings);
    }
  },
  _buildNodes: function () {
    var e = this;
    var t = e._options.silent();
    e._palette = e._themeManager.createPalette(t.palette, {
      useHighlight: true,
      extensionMode: t.paletteExtensionMode
    });
    e._palette.reset();
    e._bars = e._bars || [];
    if (e._animationSettings) {
      e._barsGroup.stopAnimation();
    }
    var n = e._values.filter(O);
    var i = n.length;
    if (e._bars.length > i) {
      for (var o = e._bars.length, a = i; a < o; ++a) {
        e._bars[a].dispose();
      }
      e._bars.splice(i, o - i);
    } else if (e._bars.length < i) {
      for (var r = e._bars.length; r < i; ++r) {
        e._bars.push(new g(r, e._context));
      }
    }
    e._bars.forEach(function (t, o) {
      t.update({
        color: e._palette.getNextColor(i),
        value: n[o]
      });
    });
  },
  _updateValues: function (e) {
    var t;
    var n;
    var i = k(e) && e || O(e) && [e] || [];
    var o = i.length;
    this._values.length = o;
    t = 0;
    for (; t < o; ++t) {
      n = i[t];
      this._values[t] = E(O(n) ? n : this._values[t]);
    }
    if (!this._resizing && !S(this._values, this.option("values"))) {
      this.option("values", this._values.slice());
    }
    this._change(["NODES"]);
  },
  values: function (e) {
    if (e !== undefined) {
      this._updateValues(e);
      return this;
    } else {
      return this._values.slice(0);
    }
  },
  _optionChangesMap: {
    backgroundColor: "MOSTLY_TOTAL",
    relativeInnerRadius: "MOSTLY_TOTAL",
    barSpacing: "MOSTLY_TOTAL",
    label: "MOSTLY_TOTAL",
    resolveLabelOverlapping: "MOSTLY_TOTAL",
    palette: "MOSTLY_TOTAL",
    paletteExtensionMode: "MOSTLY_TOTAL",
    values: "VALUES"
  },
  _change_VALUES: function () {
    this._updateValues(this.option("values"));
  },
  _factory: (0, o.clone)(u.BaseGauge.prototype._factory),
  _optionChangesOrder: ["VALUES", "NODES"],
  _initialChanges: ["VALUES"],
  _change_NODES: function () {
    this._buildNodes();
  },
  _change_MOSTLY_TOTAL: function () {
    this._change(["NODES"]);
    this.callBase();
  },
  _proxyData: [],
  _getLegendData: function () {
    var e = {};
    var t = this._options.silent();
    var n = (t.label || {}).format;
    var i = (t.legend || {}).itemTextFormat;
    e.format = i || n || this._defaultFormatOptions;
    return (this._bars || []).map(function (t) {
      return {
        id: t.index,
        item: {
          value: t.getValue(),
          color: t.getColor(),
          index: t.index
        },
        text: C(t.getValue(), e),
        visible: true,
        states: {
          normal: {
            fill: t.getColor()
          }
        }
      };
    });
  }
});
function R(e, t, n) {
  e.startAngle = t < n ? t : n;
  e.endAngle = t < n ? n : t;
}
function B(e, t) {
  return _(e - t) < 0.0001;
}
function L(e, t, n, i, o, a) {
  return {
    x: (e + i * o).toFixed(5),
    y: (t - i * a).toFixed(5)
  };
}
exports.dxBarGauge = M;
P((g = function (e, t) {
  this._context = t;
  this._tracker = t.renderer.arc().attr({
    "stroke-linejoin": "round"
  });
  this.index = e;
}).prototype, {
  dispose: function () {
    this._background.dispose();
    this._bar.dispose();
    if (this._context.textEnabled) {
      this._line.dispose();
      this._text.dispose();
    }
    this._context.tracker.detach(this._tracker);
    this._context = this._settings = this._background = this._bar = this._line = this._text = this._tracker = null;
    return this;
  },
  arrange: function (e) {
    var t = this._context;
    this._visible = true;
    t.tracker.attach(this._tracker, this, {
      index: this.index
    });
    this._background = t.renderer.arc().attr({
      "stroke-linejoin": "round",
      fill: t.backgroundColor
    }).append(t.group);
    this._settings = this._settings || {
      x: t.x,
      y: t.y,
      startAngle: t.baseAngle,
      endAngle: t.baseAngle
    };
    this._bar = t.renderer.arc().attr(P({
      "stroke-linejoin": "round"
    }, this._settings)).append(t.group);
    if (t.textEnabled) {
      this._line = t.renderer.path([], "line").attr({
        "stroke-width": t.lineWidth
      }).append(t.group);
      this._text = t.renderer.text().css(t.fontStyles).attr(t.textOptions).append(t.group);
    }
    this._angle = isFinite(this._angle) ? this._angle : t.baseAngle;
    this._settings.outerRadius = e.radius;
    this._settings.innerRadius = e.radius - t.barSize;
    this._settings.x = t.x;
    this._settings.y = t.y;
    this._background.attr(P({}, this._settings, {
      startAngle: t.endAngle,
      endAngle: t.startAngle,
      fill: this._context.backgroundColor
    }));
    this._bar.attr({
      x: t.x,
      y: t.y,
      outerRadius: this._settings.outerRadius,
      innerRadius: this._settings.innerRadius,
      fill: this._color
    });
    this._tracker.attr(this._settings);
    if (t.textEnabled) {
      this._line.attr({
        points: [t.x, t.y - this._settings.innerRadius, t.x, t.y - t.textRadius - t.textIndent],
        stroke: t.lineColor || this._color
      }).sharp();
      this._text.css({
        fill: t.textColor || this._color
      });
    }
    return this;
  },
  getTooltipParameters: function () {
    var e = I((this._angle + this._context.baseAngle) / 2);
    return {
      x: v(this._context.x + (this._settings.outerRadius + this._settings.innerRadius) / 2 * e.cos),
      y: v(this._context.y - (this._settings.outerRadius + this._settings.innerRadius) / 2 * e.sin),
      offset: 0,
      color: this._color,
      value: this._value
    };
  },
  setAngle: function (e) {
    var t;
    var n = this._context;
    var i = this._settings;
    this._angle = e;
    R(i, n.baseAngle, e);
    this._bar.attr(i);
    this._tracker.attr(i);
    if (n.textEnabled) {
      t = I(e);
      var o = n.textIndent;
      var a = n.textRadius + o;
      var r = n.x + a * t.cos;
      var s = n.y - a * t.sin;
      var l = n.textWidth * 0.5;
      var u = n.textHeight;
      var d = n.textY;
      if (_(r - n.x) > o) {
        r += r < n.x ? -l : l;
      }
      if (_(s - n.y) <= o) {
        s -= d + u * 0.5;
      } else {
        s -= s < n.y ? d + u : d;
      }
      var c = C(this._value, n.formatOptions, {
        index: this.index
      });
      var h = c === "" ? "hidden" : null;
      this._text.attr({
        text: c,
        x: r,
        y: s,
        visibility: h
      });
      this._line.attr({
        visibility: h
      });
      this._line.rotate(D(e), n.x, n.y);
    }
    return this;
  },
  hideLabel: function () {
    this._text.attr({
      visibility: "hidden"
    });
    this._line.attr({
      visibility: "hidden"
    });
  },
  checkIntersect: function (e) {
    var t = this.calculateLabelCoords();
    var n = e.calculateLabelCoords();
    return !!t && !!n && Math.max(0, Math.min(t.bottomRight.x, n.bottomRight.x) - Math.max(t.topLeft.x, n.topLeft.x)) * Math.max(0, Math.min(t.bottomRight.y, n.bottomRight.y) - Math.max(t.topLeft.y, n.topLeft.y)) != 0;
  },
  calculateLabelCoords: function () {
    if (this._text) {
      var e = this._text.getBBox();
      return {
        topLeft: {
          x: e.x,
          y: e.y
        },
        bottomRight: {
          x: e.x + e.width,
          y: e.y + e.height
        }
      };
    }
  },
  _processValue: function (e) {
    return this._context.translator.translate(this._context.translator.adjust(e));
  },
  applyValue: function () {
    if (this._visible) {
      return this.setAngle(this._processValue(this.getValue()));
    } else {
      return this;
    }
  },
  update: function (e) {
    var t = e.color;
    var n = e.value;
    this._color = t;
    this._value = n;
  },
  hide: function () {
    this._visible = false;
  },
  getColor: function () {
    return this._color;
  },
  getValue: function () {
    return this._value;
  },
  beginAnimation: function () {
    if (!this._visible) {
      return this;
    }
    var e = this._processValue(this.getValue());
    if (B(this._angle, e)) {
      this.animate = A;
      this.setAngle(this._angle);
    } else {
      this._start = this._angle;
      this._delta = e - this._angle;
      this._tracker.attr({
        visibility: "hidden"
      });
      if (this._context.textEnabled) {
        this._line.attr({
          visibility: "hidden"
        });
        this._text.attr({
          visibility: "hidden"
        });
      }
    }
  },
  animate: function (e) {
    if (!this._visible) {
      return this;
    }
    this._angle = this._start + this._delta * e;
    R(this._settings, this._context.baseAngle, this._angle);
    this._bar.attr(this._settings);
  },
  endAnimation: function () {
    if (this._delta !== undefined) {
      if (B(this._angle, this._start + this._delta)) {
        this._tracker.attr({
          visibility: null
        });
        this.setAngle(this._angle);
      }
    } else {
      delete this.animate;
    }
    delete this._start;
    delete this._delta;
  }
});
(0, i.default)("dxBarGauge", M);
M.addPlugin(c.plugin);
M.addPlugin(h.plugins.gauge);