exports.default = undefined;
var i = D(require("./99393.js"));
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./19157.js");
var l = D(require("./91198.js"));
var u = require("./60810.js");
var d = require("./21177.js");
var c = require("./41278.js");
var h = require("./8587.js");
var f = D(require("./30343.js"));
var p = require("./11378.js");
var g = require("./56481.js");
var m = require("./43695.js");
var _ = require("./25104.js");
var v = require("./79302.js");
var y = require("./45971.js");
var b = D(require("./53805.js"));
var x = D(require("./59063.js"));
var w = require("./82454.js");
var C = require("./17384.js");
var S = require("./64758.js");
var k = require("./1539.js");
function D(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var I = Math.max;
var T = Math.ceil;
var E = Math.floor;
var O = "value";
function A(e, t, n) {
  var i = N(e, t === undefined ? p.consts.emptySliderMarkerText : (0, p.formatValue)(t, n), n.font);
  return T(i.height) + n.paddingTopBottom * 2 + p.consts.pointerSize;
}
function P(e, t, n, i) {
  var o = N(e, (0, p.formatValue)(t, n.label, i, n.valueType, n.type, n.logarithmBase), n.label.font);
  return T(o.width / 2);
}
function M(e, t) {
  var n = (0, o.type)(e);
  var i = (0, o.type)(t);
  function a(e) {
    return n === e || i === e;
  }
  if (a("date")) {
    return "datetime";
  } else if (a("number")) {
    return "numeric";
  } else if (a("string")) {
    return "string";
  } else {
    return "";
  }
}
function R(e) {
  return e.valueType === "datetime" && e.marker.visible;
}
function B(e, t, n) {
  if (e) {
    var i = e.logarithmBase;
    if (e.type === "logarithmic" && i <= 0 || i && !(0, o.isNumeric)(i)) {
      e.logarithmBase = t;
      n("E2104");
    } else if (e.type !== "logarithmic") {
      e.logarithmBase = undefined;
    }
  }
}
function L(e, t, n, i) {
  var o = t.label;
  var a = t.marker;
  var r = t.placeholderHeight;
  var s = t.type === "semidiscrete" ? t.customTicks : i.ticks;
  var l = (0, p.formatValue)(s[0], o);
  return r || (o.visible ? o.topIndent + N(e, l, o.font).height : 0) + (n ? a.topIndent + a.separatorHeight : 0);
}
function V(e, t, n) {
  if (e) {
    if (n) {
      e = l.default.getNextDateUnit(e);
    } else {
      e += t;
    }
  } else {
    e = t;
  }
  return e;
}
function F(e, t, n, i) {
  var a;
  var r;
  var s;
  var u = (0, o.isDefined)(i.minVisible) ? i.minVisible : i.min;
  var d = (0, o.isDefined)(i.maxVisible) ? i.maxVisible : i.max;
  var c = e._categoriesInfo;
  var h = {};
  if (e.type === "semidiscrete") {
    a = function (e, t, n, i) {
      var o;
      var a;
      var r;
      var s = e.minorTickInterval;
      var u = e.tickInterval;
      var d = e.valueType === "datetime";
      var c = e.axisDivisionFactor || {};
      if (!u) {
        do {
          if (u === (o = V(u, s, d))) {
            break;
          }
          u = o;
          if (d) {
            o = l.default.dateToMilliseconds(u);
          }
          a = T((n - t) / o);
          r = E(i / (c[u] || 50)) || 1;
        } while (o && a > r);
      }
      return {
        tickInterval: u,
        minorTickInterval: s,
        bounds: {
          minVisible: t,
          maxVisible: n
        },
        ticks: []
      };
    }(e, u, d, t);
  } else {
    s = (r = (0, y.tickGenerator)({
      axisType: e.type,
      dataType: e.valueType,
      logBase: e.logarithmBase,
      allowNegatives: true,
      linearThreshold: Math.abs(e.linearThreshold || 0),
      axisDivisionFactor: e.axisDivisionFactor,
      minorAxisDivisionFactor: e.minorAxisDivisionFactor,
      calculateMinors: true,
      allowDecimals: e.allowDecimals,
      endOnTick: e.endOnTick,
      incidentOccurred: n,
      rangeIsEmpty: i.isEmpty()
    })({
      min: u,
      max: d,
      categories: (0, o.isDefined)(c) ? c.categories : []
    }, t, e.tickInterval, e.forceUserTickInterval, undefined, e.minorTickInterval, e.minorTickCount)).ticks.length;
    h.minVisible = r.ticks[0] < u ? r.ticks[0] : u;
    h.maxVisible = r.ticks[s - 1] > d ? r.ticks[s - 1] : d;
    a = {
      tickInterval: r.tickInterval,
      minorTickInterval: e.minorTickInterval === 0 ? 0 : r.minorTickInterval,
      bounds: h,
      ticks: r.ticks
    };
  }
  return a;
}
function H(e) {
  return e.workWeek?.[0];
}
function N(e, t, n) {
  var i = e.text(t, -1000, -1000).css((0, s.patchFontOptions)(n)).append(e.root);
  var o = i.getBBox();
  i.remove();
  return o;
}
function z(e, t, n, i, a) {
  var r;
  var s;
  var u;
  var d;
  var c;
  var h = e._categoriesInfo;
  var p = e.valueType === "datetime";
  if (!!t && !t.isEmpty() && !n.isEmpty()) {
    r = i.bounds;
    n.addRange(r);
    e.startValue = n.invert ? r.maxVisible : r.minVisible;
    e.endValue = n.invert ? r.minVisible : r.maxVisible;
  }
  e.marker.visible = a(p && e.type.indexOf("discrete") === -1, e.marker.visible, e.startValue, e.endValue, i.tickInterval);
  if (h) {
    e.startValue = h.start;
    e.endValue = h.end;
  }
  if (e.type.indexOf("discrete") === -1) {
    s = (0, o.isDate)(e.startValue) && (0, o.isDate)(e.endValue) && e.startValue.getTime() === e.endValue.getTime() || e.startValue === e.endValue;
  }
  d = e.startValue;
  c = e.endValue;
  e.isEmpty = !(0, o.isDefined)(d) || !(0, o.isDefined)(c) || s;
  if (e.isEmpty) {
    e.startValue = e.endValue = undefined;
  } else {
    e.minorTickInterval = i.minorTickInterval;
    e.tickInterval = i.tickInterval;
    if (p && (!(0, o.isDefined)(e.label.format) || e.type === "semidiscrete" && e.minorTickInterval !== e.tickInterval)) {
      if (e.type === "discrete") {
        e.label.format = f.default.getDateFormatByTicks(i.ticks);
      } else if (e.marker.visible) {
        e.label.format = l.default.getDateFormatByTickInterval(e.tickInterval);
      } else {
        e.label.format = f.default.getDateFormatByTickInterval(e.startValue, e.endValue, e.tickInterval);
      }
    }
  }
  if (e.type === "semidiscrete") {
    u = function (e) {
      var t = e.startValue;
      var n = e.endValue;
      var i = e.valueType === "datetime";
      var a = H(e);
      var r = e.tickInterval;
      var s = {
        intervals: []
      };
      if (!(0, o.isDefined)(t) || !(0, o.isDefined)(n)) {
        return s;
      }
      s.intervals = l.default.getSequenceByInterval(t, n, e.minorTickInterval);
      if (r !== e.minorTickInterval) {
        s.altIntervals = s.intervals;
        t = j(t, i, r, a);
        n = j(n, i, r, a);
        s.intervals = l.default.getSequenceByInterval(t, n, r);
        s.intervals[0] = s.altIntervals[0];
      }
      return s;
    }(e);
    e.customMinorTicks = u.altIntervals;
    e.customTicks = u.intervals;
    e.customBoundTicks = [e.customTicks[0]];
  }
}
function j(e, t, n, i) {
  if ((0, o.isDefined)(e)) {
    e = t ? l.default.correctDateWithUnitBeginning(new Date(e), n, null, i) : (0, u.adjust)(E((0, u.adjust)(e / n)) * n);
  }
  return e;
}
function W(e, t, n) {
  var i = Math.abs(t - e) / n;
  var o = i - E(i);
  if (o > 0) {
    return T(Math.abs((0, u.adjust)((0, s.getLog)(o, 10))));
  } else {
    return 0;
  }
}
var G = x.default.inherit({
  _toggleParentsScrollSubscription: function () {},
  _eventsMap: {
    onValueChanged: {
      name: "valueChanged"
    }
  },
  _rootClassPrefix: "dxrs",
  _rootClass: "dxrs-range-selector",
  _dataIsReady: function () {
    return this._dataIsLoaded();
  },
  _initialChanges: ["DATA_SOURCE", "VALUE"],
  _themeDependentChanges: ["MOSTLY_TOTAL"],
  _themeSection: "rangeSelector",
  _fontFields: ["scale.label.font", "sliderMarker.font"],
  _setDeprecatedOptions: function () {
    this.callBase();
    (0, a.extend)(this._deprecatedOptions, {
      "behavior.callValueChanged": {
        since: "23.1",
        message: "Use the \"behavior.valueChangeMode\" property instead"
      },
      "scale.aggregateByCategory": {
        since: "23.1",
        message: "Use the aggregation.enabled property"
      }
    });
  },
  _initCore: function () {
    var e = this;
    var t = e._renderer;
    var n = t.root;
    n.css({
      "touch-action": "pan-y"
    });
    e._clipRect = t.clipRect();
    var i = t.g().attr({
      class: "dxrs-view"
    }).append(n);
    var a = t.g().attr({
      class: "dxrs-slidersContainer",
      "clip-path": e._clipRect.id
    }).append(n);
    var r = t.g().attr({
      class: "dxrs-scale",
      "clip-path": e._clipRect.id
    }).append(n);
    var l = t.g().attr({
      class: "dxrs-scale-elements",
      "clip-path": e._clipRect.id
    }).append(n);
    var u = t.g().attr({
      class: "dxrs-scale-breaks"
    }).append(n);
    var d = t.g().attr({
      class: "dxrs-trackers"
    }).append(n);
    e._axis = new K({
      renderer: t,
      root: r,
      scaleBreaksGroup: u,
      labelsAxesGroup: l,
      updateSelectedRange: function (t, n) {
        e.setValue((0, s.convertVisualRangeObject)(t), n);
      },
      incidentOccurred: e._incidentOccurred
    });
    e._rangeView = new _.RangeView({
      renderer: t,
      root: i,
      translator: e._axis.getTranslator()
    });
    e._slidersController = new g.SlidersController({
      renderer: t,
      root: a,
      trackersGroup: d,
      updateSelectedRange: function (t, n, i) {
        if (!e._rangeOption) {
          e.option(O, (0, s.convertVisualRangeObject)(t, (0, o.isPlainObject)(e._options.silent(O))));
        }
        e._eventTrigger("valueChanged", {
          value: (0, s.convertVisualRangeObject)(t),
          previousValue: (0, s.convertVisualRangeObject)(n),
          event: i
        });
      },
      axis: e._axis,
      translator: e._axis.getTranslator()
    });
    e._tracker = new m.Tracker({
      renderer: t,
      controller: e._slidersController
    });
  },
  _getDefaultSize: function () {
    return {
      width: 400,
      height: 160
    };
  },
  _disposeCore: function () {
    this._axis.dispose();
    this._slidersController.dispose();
    this._tracker.dispose();
  },
  _applySize: function (e) {
    this._clientRect = e.slice();
    this._change(["MOSTLY_TOTAL"]);
  },
  _optionChangesMap: {
    scale: "SCALE",
    value: "VALUE",
    dataSource: "DATA_SOURCE"
  },
  _optionChangesOrder: ["SCALE", "DATA_SOURCE"],
  _change_SCALE: function () {
    this._change(["MOSTLY_TOTAL"]);
  },
  _setValueByDataSource: function () {
    var e = this._options.silent();
    var t = this._axis;
    if (e.dataSource) {
      var n = this.option("selectedRangeUpdateMode");
      var i = this.getValue();
      var a = (0, o.isDefined)(i[0]) && (0, o.isDefined)(i[1]);
      if ((0, o.isDefined)(n)) {
        n = (0, s.normalizeEnum)(n);
        this.__skipAnimation = true;
      } else if (a && !this._dataSourceIsAsync) {
        n = "reset";
      }
      if (n === "auto" && a) {
        var r = t.allScaleSelected(i);
        n = r.startValue && r.endValue ? "reset" : r.endValue ? "shift" : "keep";
      }
      if (n === "reset") {
        e[O] = null;
      } else if (n === "shift" && a) {
        var l = this.getValue();
        this.__skipAnimation = true;
        e[O] = {
          length: t.getVisualRangeLength({
            minVisible: l[0],
            maxVisible: l[1]
          })
        };
      } else if (n === "keep") {
        this.__skipAnimation = true;
      }
    }
    this._dataSourceIsAsync = undefined;
  },
  _change_DATA_SOURCE: function () {
    if (this._options.silent("dataSource")) {
      this._updateDataSource();
    }
  },
  _customChangesOrder: ["MOSTLY_TOTAL", "VALUE", "SLIDER_SELECTION"],
  _change_MOSTLY_TOTAL: function () {
    this._applyMostlyTotalChange();
  },
  _change_SLIDER_SELECTION: function () {
    var e = this._options.silent(O);
    this._slidersController.setSelectedRange(e && (0, s.getVizRangeObject)(e));
  },
  _change_VALUE: function () {
    var e = this._rangeOption;
    this._dataSourceIsAsync = !this._dataIsReady();
    if (e) {
      this._options.silent(O, e);
      this.setValue(e);
    }
  },
  _validateRange: function (e, t) {
    var n = this;
    function i(e) {
      return (0, o.isDefined)(e) && !n._axis.getTranslator().isValid(e);
    }
    if (this._dataIsReady() && (i(e) || i(t))) {
      this._incidentOccurred("E2203");
    }
  },
  _applyChanges: function () {
    var e = this;
    var t = e._options.silent(O);
    if (e._changes.has("VALUE") && t) {
      e._rangeOption = t;
    }
    e.callBase.apply(e, arguments);
    e._rangeOption = null;
    e.__isResizing = e.__skipAnimation = false;
  },
  _applyMostlyTotalChange: function () {
    var e;
    var t = this._renderer;
    var n = this._clientRect;
    var i = {
      left: n[0],
      top: n[1],
      width: n[2] - n[0],
      height: n[3] - n[1]
    };
    if (this.__isResizing || this.__skipAnimation) {
      e = t.animationEnabled();
      t.updateAnimationOptions({
        enabled: false
      });
    }
    this._clipRect.attr({
      x: n[0],
      y: n[1],
      width: n[2] - n[0],
      height: n[3] - n[1]
    });
    this._axis.getTranslator().update(new d.Range(), i, {
      isHorizontal: true
    });
    this._updateContent({
      left: n[0],
      top: n[1],
      width: n[2] - n[0],
      height: n[3] - n[1]
    });
    if (this.__isResizing || this.__skipAnimation) {
      t.updateAnimationOptions({
        enabled: e
      });
    }
    this._drawn();
  },
  _dataSourceChangedHandler: function () {
    this._setValueByDataSource();
    this._requestChange(["MOSTLY_TOTAL"]);
  },
  _completeSeriesDataSourceCreation: function (e, t) {
    var n = this._clientRect;
    var i = {
      left: n[0],
      top: n[1],
      width: n[2] - n[0],
      height: n[3] - n[1]
    };
    this._axis.updateOptions((0, a.extend)({}, e, {
      isHorizontal: true,
      label: {}
    }));
    if (t.isShowChart()) {
      this._axis.setMarginOptions(t.getMarginOptions(i));
    }
    this._axis.updateCanvas(i);
    t.createPoints();
  },
  _updateContent: function (e) {
    var t = this.option("chart");
    var n = this._createSeriesDataSource(t);
    var i = (!n || !n.isShowChart()) && !this.option("background.image.url");
    var a = function (e, t, n, i) {
      var a = 0;
      var r = (0, h.correctValueType)((0, s.normalizeEnum)(e.valueType));
      function l(t, i) {
        var r = t === "startValue" ? "start" : "end";
        if ((0, o.isDefined)(e[t])) {
          a = i(e[t]);
          if ((0, o.isDefined)(a)) {
            e[t] = a;
          } else {
            e[t] = undefined;
            n("E2202", [r]);
          }
        }
      }
      if (!(r = t || r)) {
        r = M(e.startValue, e.endValue) || "numeric";
      }
      if (r === "string" || e.categories) {
        e.type = "discrete";
        r = "string";
      }
      e.containerColor = i;
      e.valueType = r;
      e.dataType = r;
      var u = (0, h.getParser)(r);
      l("startValue", u);
      l("endValue", u);
      B(e, 10, n);
      e.type ||= "continuous";
      e.parser = u;
      if (e.type === "semidiscrete") {
        e.minorTick.visible = false;
        e.minorTickInterval = e.minRange;
        e.marker.visible = false;
        e.maxRange = undefined;
      }
      e.forceUserTickInterval |= (0, o.isDefined)(e.tickInterval) && !(0, o.isDefined)(e.axisDivisionFactor);
      e.axisDivisionFactor = (0, o.isDefined)(e.axisDivisionFactor) ? e.axisDivisionFactor : 30;
      e.minorAxisDivisionFactor = (0, o.isDefined)(e.minorAxisDivisionFactor) ? e.minorAxisDivisionFactor : 15;
      return e;
    }(this._getOption("scale"), n && n.getCalculatedValueType(), this._incidentOccurred, this._getOption("containerBackgroundColor", true));
    if (n) {
      this._completeSeriesDataSourceCreation(a, n);
    }
    var r;
    var u = function (e, t) {
      var n;
      var i;
      var a;
      var r;
      var l;
      var u = false;
      var c = t.startValue;
      var h = t.endValue;
      var f = e ? e.getBoundRange().arg : new d.Range();
      var p = t.valueType === "datetime";
      var g = H(t);
      var m = t.minRange;
      if (t.type === "discrete") {
        (l = new d.Range({
          minVisible: c,
          maxVisible: h
        })).addRange(f);
        f = l;
        a = (a = e ? e.argCategories : t.categories || c && h && [c, h]) || [];
        t._categoriesInfo = r = (0, s.getCategoriesInfo)(a, c, h);
      }
      if (t.type === "semidiscrete") {
        c = t.startValue = j(t.startValue, p, m, g);
        h = t.endValue = j(t.endValue, p, m, g);
        f.minVisible = j(f.minVisible, p, m, g);
        f.maxVisible = j(f.maxVisible, p, m, g);
        f.min = j(f.min, p, m, g);
        f.max = j(f.max, p, m, g);
      }
      if ((0, o.isDefined)(c) && (0, o.isDefined)(h)) {
        u = r ? r.inverted : c > h;
        n = r ? r.start : u ? h : c;
        i = r ? r.end : u ? c : h;
      } else if ((0, o.isDefined)(c) || (0, o.isDefined)(h)) {
        n = c;
        i = h;
      } else if (r) {
        n = r.start;
        i = r.end;
      }
      f.addRange({
        invert: u,
        min: n,
        max: i,
        minVisible: n,
        maxVisible: i,
        dataType: t.valueType
      });
      f.addRange({
        categories: e ? undefined : a,
        base: t.logarithmBase,
        axisType: t.type,
        dataType: t.valueType
      });
      if (e) {
        f.sortCategories(a);
      }
      return f;
    }(n, a);
    var c = F(a, e.width, this._incidentOccurred, u);
    var f = n && n.isShowChart() && n.getThemeManager();
    if (f) {
      B(t && t.valueAxis, f.getOptions("valueAxis").logarithmBase, this._incidentOccurred);
    }
    z(a, n, u, c, (r = e.width, function (e, t, n, i, a) {
      if (t && e && (!(0, o.isDefined)(a) || a.years || a.months >= 6 || r / 50 < T((i - n) / l.default.dateToMilliseconds("year")) + 1)) {
        t = false;
      }
      return t;
    }));
    (function (e, t) {
      var n = t.minorTickInterval || t.tickInterval;
      if (t.valueType === "datetime") {
        n = l.default.dateToMilliseconds(n);
      }
      e.addRange({
        interval: n
      });
    })(u, a);
    var g = this._prepareSliderMarkersOptions(a, e.width, c, u);
    var m = function (e, t, n, i, a) {
      var r;
      var s;
      var l;
      var u;
      var d;
      var c;
      var h;
      var f = 0;
      var p = 0;
      var g = t.type === "semidiscrete" ? t.customTicks : a.ticks;
      l = (i = i || {}).left;
      u = i.right;
      d = n.placeholderHeight;
      if (n.visible) {
        r = A(e, t.startValue, n);
        s = A(e, t.endValue, n);
        if (d === undefined) {
          d = I(r, s);
        }
      }
      if (t.label.visible) {
        c = (0, o.isDefined)(t.startValue) ? g[0] : undefined;
        h = (0, o.isDefined)(t.endValue) ? g[g.length - 1] : undefined;
        f = P(e, c, t, a);
        p = P(e, h, t, a);
      }
      return {
        left: l = l !== undefined ? l : f,
        right: u = (u !== undefined ? u : p) || 1,
        top: d || 0,
        bottom: 0
      };
    }(this._renderer, a, g, this.option("indent"), c);
    var _ = {
      left: e.left + m.left,
      top: e.top + m.top,
      width: e.left + m.left + I(e.width - m.left - m.right, 1),
      height: I(i ? p.HEIGHT_COMPACT_MODE : e.height - m.top - m.bottom - L(this._renderer, a, R(a), c), 0),
      right: 0,
      bottom: 0
    };
    this._axis.update(a, i, _, u, n);
    a.minorTickInterval = a.isEmpty ? 0 : a.minorTickInterval;
    this._updateElements(a, g, i, _, n);
    if (f) {
      f.dispose();
    }
  },
  _updateElements: function (e, t, n, i, o) {
    var a = this._getOption("behavior");
    var r = this._getOption("shutter");
    var s = e.type !== "semidiscrete";
    r.color = r.color || this._getOption("containerBackgroundColor", true);
    this._rangeView.update(this.option("background"), this._themeManager.theme("background"), i, n, a.animationEnabled && this._renderer.animationEnabled(), o);
    this._isUpdating = true;
    this._slidersController.update([i.top, i.top + i.height], a, n, this._getOption("sliderHandle"), t, r, {
      minRange: s ? this.option("scale.minRange") : undefined,
      maxRange: s ? this.option("scale.maxRange") : undefined
    }, this._axis.getFullTicks(), this._getOption("selectedRangeColor", true));
    this._requestChange(["SLIDER_SELECTION"]);
    this._isUpdating = false;
    this._tracker.update(!this._axis.getTranslator().getBusinessRange().isEmpty(), a);
  },
  _createSeriesDataSource: function (e) {
    var t;
    var n = this._dataSourceItems();
    var i = this._getOption("scale");
    var o = i.valueType || M(i.startValue, i.endValue);
    var r = new c.Axis({
      renderer: this._renderer,
      axisType: "xyAxes",
      drawingType: "linear"
    });
    r.updateOptions({
      isHorizontal: false,
      label: {},
      categoriesSortingMethod: this._getOption("chart").valueAxis.categoriesSortingMethod
    });
    if (n || e && e.series) {
      e = (0, a.extend)({}, e, {
        theme: this.option("theme")
      });
      t = new v.SeriesDataSource({
        renderer: this._renderer,
        dataSource: n,
        valueType: (0, s.normalizeEnum)(o),
        axisType: i.type,
        chart: e,
        dataSourceField: this.option("dataSourceField"),
        incidentOccurred: this._incidentOccurred,
        categories: i.categories,
        argumentAxis: this._axis,
        valueAxis: r
      });
    }
    return t;
  },
  _prepareSliderMarkersOptions: function (e, t, n, i) {
    var a = n.minorTickInterval;
    var r = n.tickInterval;
    var s = r;
    var u = e.endValue;
    var d = e.startValue;
    var c = this._getOption("sliderMarker");
    var h = !this._getOption("behavior").snapToTicks;
    var p = e.type === "discrete";
    var g = e.valueType === "datetime";
    c.borderColor = this._getOption("containerBackgroundColor", true);
    if (!c.format && !i.isEmpty()) {
      if (h && (0, o.isNumeric)(e.startValue)) {
        c.format = {
          type: "fixedPoint",
          precision: W(d, u, t)
        };
      }
      if (g && !p) {
        if ((0, o.isDefined)(a) && a !== 0) {
          s = function (e, t, n) {
            var i = l.default.getDateUnitInterval(t);
            var o = l.default.getDateUnitInterval(e);
            var a = l.default.dateUnitIntervals.indexOf(i);
            if (n && i === o && a > 0) {
              i = l.default.dateUnitIntervals[a - 1];
            }
            return i;
          }(r, a, h);
        }
        if (e.marker.visible) {
          c.format = l.default.getDateFormatByTickInterval(s);
        } else if ((0, o.isDefined)(d) && (0, o.isDefined)(u)) {
          c.format = f.default.getDateFormatByTickInterval(d, u, s);
        }
      }
      if (g && p && n.ticks.length) {
        c.format = f.default.getDateFormatByTicks(n.ticks);
      }
    }
    return c;
  },
  getValue: function () {
    return (0, s.convertVisualRangeObject)(this._slidersController.getSelectedRange());
  },
  setValue: function (e, t) {
    var n = (0, s.getVizRangeObject)(e);
    if (!this._isUpdating && e) {
      this._validateRange(n.startValue, n.endValue);
      if (!(0, s.rangesAreEqual)(n, this._slidersController.getSelectedRange())) {
        this._slidersController.setSelectedRange(n, t);
      }
    }
  },
  _setContentSize: function () {
    this.__isResizing = this._changes.count() === 2;
    this.callBase.apply(this, arguments);
  }
});
function q() {
  return 1;
}
function $(e) {
  if (e % 2 == 1) {
    return -E(e / 2);
  } else {
    return -e / 2;
  }
}
function U(e, t, n, i) {
  function o(o) {
    if (o.length === 2 && b.default.areLabelsOverlap(t[o[0]], t[o[1]], n, i)) {
      e[o[0]].removeLabel();
    }
  }
  function a(t) {
    for (var n = [], i = t; n.length < 2 && i < e.length; i++) {
      if (e[i].label) {
        n.push(i);
      }
    }
    return n;
  }
  if (!(e.length < 3)) {
    o(a(0));
    o(a(e.length - 2).reverse());
  }
}
function K(e) {
  this._axis = new c.Axis({
    renderer: e.renderer,
    axesContainerGroup: e.root,
    scaleBreaksGroup: e.scaleBreaksGroup,
    labelsAxesGroup: e.labelsAxesGroup,
    incidentOccurred: e.incidentOccurred,
    axisType: "xyAxes",
    drawingType: "linear",
    widgetClass: "dxrs",
    axisClass: "range-selector",
    isArgumentAxis: true,
    getTemplate: function () {}
  });
  this._updateSelectedRangeCallback = e.updateSelectedRange;
  this._axis.getAxisSharpDirection = this._axis.getSharpDirectionByCoords = q;
  this._axis.getTickStartPositionShift = $;
  this._axis._checkShiftedLabels = U;
}
(0, r.each)(["selectedRangeColor", "containerBackgroundColor", "sliderMarker", "sliderHandle", "shutter", "background", "behavior", "chart", "indent"], function (e, t) {
  G.prototype._optionChangesMap[t] = "MOSTLY_TOTAL";
});
K.prototype = {
  constructor: K,
  update: function (e, t, n, i, o) {
    var a = this._axis;
    a.updateOptions(function (e, t, n, i) {
      e.marker.label.font = e.label.font;
      e.color = e.marker.color = e.tick.color;
      e.opacity = e.marker.opacity = e.tick.opacity;
      e.width = e.marker.width = e.tick.width;
      e.placeholderSize = (e.placeholderHeight || 0) + i;
      e.argumentType = e.valueType;
      e.visible = t;
      e.isHorizontal = true;
      e.calculateMinors = true;
      e.semiDiscreteInterval = e.minRange;
      if (!t) {
        e.minorTick.length = e.tick.length = n;
      }
      e.label.indentFromAxis = e.label.topIndent + i;
      return e;
    }(e, t, n.height, n.height / 2 - T(e.width / 2)));
    a.validate();
    a.setBusinessRange(i, true);
    if (o !== undefined && o.isShowChart()) {
      a.setMarginOptions(o.getMarginOptions(n));
    }
    a.draw(n);
    a.shift({
      left: 0,
      bottom: -n.height / 2 + n.top
    });
    if (a.getMarkerTrackers()) {
      (function (e, t, n) {
        function i(t) {
          var i = t.target.range;
          var o = e.minRange ? l.default.addInterval(i.startValue, e.minRange) : undefined;
          var a = e.maxRange ? l.default.addInterval(i.startValue, e.maxRange) : undefined;
          if ((!o || !(o > i.endValue)) && (!a || !(a < i.endValue))) {
            n(i, t);
          }
        }
        (0, r.each)(t, function (e, t) {
          t.on("dxpointerdown", i);
        });
      })(e, a.getMarkerTrackers(), this._updateSelectedRangeCallback);
    }
    a.drawScaleBreaks({
      start: n.top,
      end: n.top + n.height
    });
  },
  visualRange: function () {},
  getViewport: function () {
    return {};
  },
  allScaleSelected: function (e) {
    var t = this._axis.visualRange();
    var n = t.startValue;
    var i = t.endValue;
    return {
      startValue: e[0].valueOf() === n.valueOf(),
      endValue: e[1].valueOf() === i.valueOf()
    };
  },
  getOptions: function () {
    return this._axis.getOptions() || {};
  }
};
(0, r.each)(c.Axis.prototype, function (e) {
  if (e !== "constructor" && e[0] !== "_" && (0, o.isFunction)(c.Axis.prototype[e]) && !(e in K.prototype)) {
    K.prototype[e] = function () {
      var t = this._axis;
      return t[e].apply(t, arguments);
    };
  }
});
(0, i.default)("dxRangeSelector", G);
var Z = G;
exports.default = Z;
G.addPlugin(w.plugin);
G.addPlugin(C.plugin);
G.addPlugin(S.plugin);
G.addPlugin(k.plugin);
module.exports = exports.default;
module.exports.default = exports.default;