exports.createIndicatorCreator = function (e) {
  return function (t, n, i) {
    var o = e[(0, s.normalizeEnum)(n)] || !i && e._default;
    if (o) {
      return new o(t);
    } else {
      return null;
    }
  };
};
exports.dxGauge = undefined;
var i = require("./18029.js");
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./41278.js");
var s = require("./19157.js");
var l = require("./20576.js");
var u = Array.isArray;
var d = isFinite;
var c = Number;
var h = Math.min;
var f = Math.max;
var p = a.extend;
var g = [1, 2, 5];
function m(e, t) {
  if (e === null) {
    return e;
  } else if (d(e)) {
    return c(e);
  } else {
    return t;
  }
}
function _(e) {
  if (u(e)) {
    return e;
  } else if ((0, o.isNumeric)(e)) {
    return [e];
  } else {
    return null;
  }
}
var v = i.BaseGauge.inherit({
  _initCore: function () {
    var e = this;
    var t = e._renderer;
    e._setupValue(e.option("value"));
    e.__subvalues = _(e.option("subvalues"));
    e._setupSubvalues(e.__subvalues);
    x(e);
    e.callBase.apply(e, arguments);
    e._rangeContainer = new e._factory.RangeContainer({
      renderer: t,
      container: t.root,
      translator: e._translator,
      themeManager: e._themeManager
    });
    e._initScale();
    e._subvalueIndicatorContainer = e._renderer.g().attr({
      class: "dxg-subvalue-indicators"
    }).linkOn(e._renderer.root, "valueIndicator").enableLinks();
  },
  _fontFields: ["scale.label.font", "valueIndicators.rangebar.text.font", "valueIndicators.textcloud.text.font", "indicator.text.font"],
  _initScale: function () {
    this._scaleGroup = this._renderer.g().attr({
      class: "dxg-scale"
    }).linkOn(this._renderer.root, "scale");
    this._labelsAxesGroup = this._renderer.g().attr({
      class: "dxg-scale-elements"
    }).linkOn(this._renderer.root, "scale-elements");
    this._scale = new r.Axis({
      incidentOccurred: this._incidentOccurred,
      renderer: this._renderer,
      axesContainerGroup: this._scaleGroup,
      labelsAxesGroup: this._labelsAxesGroup,
      axisType: this._scaleTypes.type,
      drawingType: this._scaleTypes.drawingType,
      widgetClass: "dxg",
      getTemplate: function () {}
    });
  },
  _disposeCore: function () {
    var e = this;
    e.callBase.apply(e, arguments);
    e._scale.dispose();
    e._scaleGroup.linkOff();
    e._labelsAxesGroup.linkOff();
    e._rangeContainer.dispose();
    e._disposeValueIndicators();
    e._subvalueIndicatorContainer.linkOff();
    e._scale = e._scaleGroup = e._labelsAxesGroup = e._rangeContainer = null;
  },
  _disposeValueIndicators: function () {
    if (this._valueIndicator) {
      this._valueIndicator.dispose();
    }
    if (this._subvalueIndicatorsSet) {
      this._subvalueIndicatorsSet.dispose();
    }
    this._valueIndicator = this._subvalueIndicatorsSet = null;
  },
  _setupDomainCore: function () {
    var e = this.option("scale") || {};
    var t = this.option("startValue");
    var n = this.option("endValue");
    t = (0, o.isNumeric)(t) ? c(t) : (0, o.isNumeric)(e.startValue) ? c(e.startValue) : 0;
    n = (0, o.isNumeric)(n) ? c(n) : (0, o.isNumeric)(e.endValue) ? c(e.endValue) : 100;
    this._baseValue = t < n ? t : n;
    this._translator.setDomain(t, n);
  },
  _cleanContent: function () {
    this._rangeContainer.clean();
    this._cleanValueIndicators();
  },
  _measureScale: function (e) {
    var t = e.tick;
    var n = t.visible && t.length > 0 && t.width > 0;
    var i = e.minorTick;
    var o = i.visible && i.length > 0 && i.width > 0;
    var r = e.label;
    var s = Number(r.indentFromTick);
    if (!n && !o && !r.visible) {
      return {};
    }
    var l = this._scale.measureLabels((0, a.extend)({}, this._canvas));
    var u = this._getScaleLayoutValue();
    var d = {
      min: u,
      max: u
    };
    var c = this._getTicksCoefficients(e);
    var p = c.inner;
    var g = c.outer;
    if (n) {
      d.min = h(d.min, u - p * t.length);
      d.max = f(d.max, u + g * t.length);
    }
    if (o) {
      d.min = h(d.min, u - p * i.length);
      d.max = f(d.max, u + g * i.length);
    }
    if (r.visible) {
      this._correctScaleIndents(d, s, l);
    }
    return d;
  },
  _renderContent: function () {
    var e = this;
    var t = e._prepareScaleSettings();
    e._rangeContainer.render(p(e._getOption("rangeContainer"), {
      vertical: e._area.vertical
    }));
    e._renderScale(t);
    e._subvalueIndicatorContainer.linkAppend();
    var n = (0, s.map)([e._rangeContainer].concat(e._prepareValueIndicators()), function (e) {
      if (e && e.enabled) {
        return e;
      } else {
        return null;
      }
    });
    e._applyMainLayout(n, e._measureScale(t));
    n.forEach(function (t) {
      return t.resize(e._getElementLayout(t.getOffset()));
    });
    e._shiftScale(e._getElementLayout(0), t);
    e._beginValueChanging();
    e._updateActiveElements();
    e._endValueChanging();
  },
  _prepareScaleSettings: function () {
    var e = this;
    var t = e.option("scale");
    var n = (0, a.extend)(true, {}, e._themeManager.theme("scale"), t);
    n.label.indentFromAxis = 0;
    n.isHorizontal = !e._area.vertical;
    n.forceUserTickInterval |= (0, o.isDefined)(t) && (0, o.isDefined)(t.tickInterval) && !(0, o.isDefined)(t.scaleDivisionFactor);
    n.axisDivisionFactor = n.scaleDivisionFactor || e._gridSpacingFactor;
    n.minorAxisDivisionFactor = n.minorScaleDivisionFactor || 5;
    n.numberMultipliers = g;
    n.tickOrientation = e._getTicksOrientation(n);
    if (n.label.useRangeColors) {
      n.label.customizeColor = function () {
        return e._rangeContainer.getColorForValue(this.value);
      };
    }
    return n;
  },
  _renderScale: function (e) {
    var t = this._translator.getDomain();
    var n = t[0];
    var i = t[1];
    var o = this._translator.getCodomain();
    var r = !!(n > i ^ e.inverted);
    var s = h(n, i);
    var l = f(n, i);
    e.min = s;
    e.max = l;
    e.startAngle = 90 - o[0];
    e.endAngle = 90 - o[1];
    e.skipViewportExtending = true;
    e.inverted = r;
    this._scale.updateOptions(e);
    this._scale.setBusinessRange({
      axisType: "continuous",
      dataType: "numeric",
      min: s,
      max: l,
      invert: r
    });
    this._updateScaleTickIndent(e);
    this._scaleGroup.linkAppend();
    this._labelsAxesGroup.linkAppend();
    this._scale.draw((0, a.extend)({}, this._canvas));
  },
  _updateIndicatorSettings: function (e) {
    e.currentValue = e.baseValue = d(this._translator.translate(e.baseValue)) ? c(e.baseValue) : this._baseValue;
    e.vertical = this._area.vertical;
    if (e.text && !e.text.format) {
      e.text.format = this._defaultFormatOptions;
    }
  },
  _prepareIndicatorSettings: function (e, t) {
    var n = this._themeManager.theme("valueIndicators");
    var i = (0, s.normalizeEnum)(e.type || this._themeManager.theme(t));
    var o = p(true, {}, n._default, n[i], e);
    o.type = i;
    o.animation = this._animationSettings;
    o.containerBackgroundColor = this._containerBackgroundColor;
    this._updateIndicatorSettings(o);
    return o;
  },
  _cleanValueIndicators: function () {
    if (this._valueIndicator) {
      this._valueIndicator.clean();
    }
    if (this._subvalueIndicatorsSet) {
      this._subvalueIndicatorsSet.clean();
    }
  },
  _prepareValueIndicators: function () {
    this._prepareValueIndicator();
    if (this.__subvalues !== null) {
      this._prepareSubvalueIndicators();
    }
    return [this._valueIndicator, this._subvalueIndicatorsSet];
  },
  _updateActiveElements: function () {
    this._updateValueIndicator();
    this._updateSubvalueIndicators();
  },
  _prepareValueIndicator: function () {
    var e = this._valueIndicator;
    var t = this._prepareIndicatorSettings(this.option("valueIndicator") || {}, "valueIndicatorType");
    if (e && e.type !== t.type) {
      e.dispose();
      e = null;
    }
    e ||= this._valueIndicator = this._createIndicator(t.type, this._renderer.root, "dxg-value-indicator", "value-indicator");
    e.render(t);
  },
  _createSubvalueIndicatorsSet: function () {
    var e = this;
    var t = e._subvalueIndicatorContainer;
    return new I({
      createIndicator: function (n, i) {
        return e._createIndicator(n, t, "dxg-subvalue-indicator", "subvalue-indicator", i);
      },
      createPalette: function (t) {
        return e._themeManager.createPalette(t);
      }
    });
  },
  _prepareSubvalueIndicators: function () {
    var e = this._subvalueIndicatorsSet;
    var t = this._prepareIndicatorSettings(this.option("subvalueIndicator") || {}, "subvalueIndicatorType");
    e ||= this._subvalueIndicatorsSet = this._createSubvalueIndicatorsSet();
    var n = t.type !== e.type;
    e.type = t.type;
    var i = this._createIndicator(t.type, this._renderer.root);
    if (i) {
      i.dispose();
      e.render(t, n);
    }
  },
  _setupValue: function (e) {
    this.__value = m(e, this.__value);
  },
  _setupSubvalues: function (e) {
    var t;
    var n;
    var i;
    var o = e === undefined ? this.__subvalues : _(e);
    if (o !== null) {
      t = 0;
      n = o.length;
      i = [];
      for (; t < n; ++t) {
        i.push(m(o[t], this.__subvalues[t]));
      }
      this.__subvalues = i;
    }
  },
  _updateValueIndicator: function () {
    if (this._valueIndicator) {
      this._valueIndicator.value(this.__value, this._noAnimation);
    }
  },
  _updateSubvalueIndicators: function () {
    if (this._subvalueIndicatorsSet) {
      this._subvalueIndicatorsSet.values(this.__subvalues, this._noAnimation);
    }
  },
  value: function (e) {
    if (e !== undefined) {
      this._changeValue(e);
      return this;
    } else {
      return this.__value;
    }
  },
  subvalues: function (e) {
    if (e !== undefined) {
      this._changeSubvalues(e);
      return this;
    } else if (this.__subvalues !== null) {
      return this.__subvalues.slice();
    } else {
      return undefined;
    }
  },
  _changeValue: function (e) {
    this._setupValue(e);
    this._beginValueChanging();
    this._updateValueIndicator();
    this._updateExtraElements();
    if (this.__value !== this.option("value")) {
      this.option("value", this.__value);
    }
    this._endValueChanging();
  },
  _changeSubvalues: function (e) {
    if (this.__subvalues !== null) {
      this._setupSubvalues(e);
      this._beginValueChanging();
      this._updateSubvalueIndicators();
      this._updateExtraElements();
      this._endValueChanging();
    } else {
      this.__subvalues = _(e);
      this._setContentSize();
      this._renderContent();
    }
    if (!(0, i.compareArrays)(this.__subvalues, this.option("subvalues"))) {
      this.option("subvalues", this.__subvalues);
    }
  },
  _optionChangesMap: {
    scale: "DOMAIN",
    rangeContainer: "MOSTLY_TOTAL",
    valueIndicator: "MOSTLY_TOTAL",
    subvalueIndicator: "MOSTLY_TOTAL",
    containerBackgroundColor: "MOSTLY_TOTAL",
    value: "VALUE",
    subvalues: "SUBVALUES",
    valueIndicators: "MOSTLY_TOTAL"
  },
  _customChangesOrder: ["VALUE", "SUBVALUES"],
  _change_VALUE: function () {
    this._changeValue(this.option("value"));
  },
  _change_SUBVALUES: function () {
    this._changeSubvalues(this.option("subvalues"));
  },
  _applyMainLayout: null,
  _getElementLayout: null,
  _createIndicator: function (e, t, n, i, o, a) {
    var r = this._factory.createIndicator({
      renderer: this._renderer,
      translator: this._translator,
      owner: t,
      tracker: this._tracker,
      className: n
    }, e, a);
    if (r) {
      r.type = e;
      r._trackerInfo = {
        type: i,
        index: o
      };
    }
    return r;
  },
  _getApproximateScreenRange: null
});
function y(e) {
  if (e) {
    return e.value;
  } else {
    return null;
  }
}
function b(e, t, n) {
  var i = e[t];
  var o = u(n) ? (0, s.map)(n, y) : [];
  for (var a = 0, r = o.length, l = []; a < r; ++a) {
    l.push(m(o[a], i[a]));
  }
  e[t] = l;
}
function x(e) {
  var t;
  if (e.option("value") === undefined && e.option("subvalues") === undefined && e.option("valueIndicators") !== undefined) {
    (t = e).value = t.subvalues = l.noop;
    t._setupValue = t._setupSubvalues = t._updateValueIndicator = t._updateSubvalueIndicators = null;
    (function (e) {
      e._indicatorValues = [];
      b(e, "_indicatorValues", e.option("valueIndicators"));
      e._valueIndicators = [];
      var t = e._applyMostlyTotalChange;
      e._applyMostlyTotalChange = function () {
        b(this, "_indicatorValues", this.option("valueIndicators"));
        t.call(this);
      };
      e._updateActiveElements = w;
      e._prepareValueIndicators = C;
      e._disposeValueIndicators = S;
      e._cleanValueIndicators = k;
      e.indicatorValue = D;
    })(e);
  }
}
function w() {
  var e = this;
  e._valueIndicators.forEach(function (t) {
    t.value(e._indicatorValues[t.index], e._noAnimation);
  });
}
function C() {
  var e;
  var t = this;
  var n = t._valueIndicators || [];
  var i = t.option("valueIndicators");
  var o = [];
  var a = 0;
  for (e = u(i) ? i.length : 0; a < e; ++a) {
    o.push(i[a]);
  }
  for (e = n.length; a < e; ++a) {
    o.push(null);
  }
  var r = [];
  o.forEach(function (e, i) {
    var o = n[i];
    if (e) {
      var a = t._prepareIndicatorSettings(e, "valueIndicatorType");
      if (o && o.type !== a.type) {
        o.dispose();
        o = null;
      }
      o ||= t._createIndicator(a.type, t._renderer.root, "dxg-value-indicator", "value-indicator", i, true);
      if (o) {
        o.index = i;
        o.render(a);
        r.push(o);
      }
    } else if (o) {
      o.dispose();
    }
  });
  t._valueIndicators = r;
  return t._valueIndicators;
}
function S() {
  this._valueIndicators.forEach(function (e) {
    return e.dispose();
  });
  this._valueIndicators = null;
}
function k() {
  this._valueIndicators.forEach(function (e) {
    return e.clean();
  });
}
function D(e, t) {
  return function (e, t, n, i, o) {
    if (o !== undefined) {
      if (n[i] !== undefined) {
        n[i] = m(o, n[i]);
        if (t[i]) {
          t[i].value(n[i]);
        }
      }
      return e;
    } else {
      return n[i];
    }
  }(this, this._valueIndicators, this._indicatorValues, e, t);
}
function I(e) {
  this._parameters = e;
  this._indicators = [];
}
exports.dxGauge = v;
I.prototype = {
  constructor: I,
  dispose: function () {
    this._indicators.forEach(function (e) {
      return e.dispose();
    });
    this._parameters = this._options = this._indicators = this._colorPalette = this._palette = null;
    return this;
  },
  clean: function () {
    if (this._sample) {
      this._sample.clean().dispose();
    }
    this._indicators.forEach(function (e) {
      return e.clean();
    });
    this._sample = this._options = this._palette = null;
    return this;
  },
  render: function (e, t) {
    var n = this;
    n._options = e;
    n._sample = n._parameters.createIndicator(n.type);
    n._sample.render(e);
    n.enabled = n._sample.enabled;
    n._palette = (0, o.isDefined)(e.palette) ? n._parameters.createPalette(e.palette) : null;
    if (n.enabled) {
      n._generatePalette(n._indicators.length);
      n._indicators = (0, s.map)(n._indicators, function (e, i) {
        if (t) {
          e.dispose();
          e = n._parameters.createIndicator(n.type, i);
        }
        e.render(n._getIndicatorOptions(i));
        return e;
      });
    }
    return n;
  },
  getOffset: function () {
    return this._sample.getOffset();
  },
  resize: function (e) {
    this._layout = e;
    this._indicators.forEach(function (t) {
      return t.resize(e);
    });
    return this;
  },
  measure: function (e) {
    return this._sample.measure(e);
  },
  _getIndicatorOptions: function (e) {
    var t = this._options;
    if (this._colorPalette) {
      t = p({}, t, {
        color: this._colorPalette[e]
      });
    }
    return t;
  },
  _generatePalette: function (e) {
    var t = null;
    if (this._palette) {
      this._palette.reset();
      t = this._palette.generateColors(e, {
        repeat: true
      });
    }
    this._colorPalette = t;
  },
  _adjustIndicatorsCount: function (e) {
    var t;
    var n;
    var i;
    var o = this._indicators;
    var a = o.length;
    if (a > e) {
      t = e;
      n = a;
      for (; t < n; ++t) {
        o[t].clean().dispose();
      }
      this._indicators = o.slice(0, e);
      this._generatePalette(o.length);
    } else if (a < e) {
      this._generatePalette(e);
      t = a;
      n = e;
      for (; t < n; ++t) {
        (i = this._parameters.createIndicator(this.type, t)).render(this._getIndicatorOptions(t)).resize(this._layout);
        o.push(i);
      }
    }
  },
  values: function (e, t) {
    if (this.enabled) {
      if (e !== undefined) {
        if (!u(e)) {
          e = d(e) ? [Number(e)] : null;
        }
        if (e) {
          this._adjustIndicatorsCount(e.length);
          this._indicators.forEach(function (n, i) {
            return n.value(e[i], t);
          });
        }
        return this;
      } else {
        return (0, s.map)(this._indicators, function (e) {
          return e.value();
        });
      }
    }
  }
};