function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.Series = V;
exports.mixins = undefined;
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./54497.js");
var l = require("./19157.js");
var u = require("./20576.js");
var d = C(require("./32410.js"));
var c = C(require("./63407.js"));
var h = w(require("./21667.js"));
var f = w(require("./7222.js"));
var p = w(require("./90048.js"));
var g = w(require("./58821.js"));
var m = require("./57402.js");
var _ = require("./64216.js");
var v = w(require("./80610.js"));
var y = w(require("./29788.js"));
var b = w(require("./92057.js"));
function x(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (x = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function w(e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = x(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}
function C(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var S = {};
var k = d.default.states;
var D = k.selectedMark;
var I = k.hoverMark;
var T = k.hover;
var E = k.normal;
var O = k.selection;
var A = k.applySelected;
var P = k.applyHover;
var M = k.resetItem;
function R(e, t, n) {
  if (e) {
    e.trigger(t, n);
  }
}
function B(e) {
  return (e = (0, l.normalizeEnum)(e)) === "includepoints" || e === "allseriespoints";
}
function L(e, t) {
  var n = (0, a.extend)({}, e, t);
  n.border = (0, a.extend)({}, e && e.border, t && t.border);
  return n;
}
function V(e, t) {
  this.fullState = 0;
  this._extGroups = e;
  this._renderer = e.renderer;
  this._group = e.renderer.g().attr({
    class: "dxc-series"
  });
  this._eventTrigger = e.eventTrigger;
  this._eventPipe = e.eventPipe;
  this._incidentOccurred = e.incidentOccurred;
  this._legendCallback = u.noop;
  this.updateOptions(t, e);
}
function F(e) {
  return e.data;
}
function H(e, t) {
  if (t && e === "logarithmic" && t.getOptions().allowNegatives === false) {
    return function (e) {
      return e > 0;
    };
  } else {
    return function () {
      return true;
    };
  }
}
S.mixins = {
  chart: {},
  pie: {},
  polar: {}
};
S.mixins.chart.scatter = h.chart;
S.mixins.polar.scatter = h.polar;
(0, a.extend)(S.mixins.pie, v);
(0, a.extend)(S.mixins.chart, f.chart, p.chart, g.chart, m.chart, _.chart, y, b.chart);
(0, a.extend)(S.mixins.polar, f.polar, p.polar, g.polar, b.polar);
V.prototype = {
  constructor: V,
  _createLegendState: u.noop,
  getLegendStyles: function () {
    return this._styles.legendStyles;
  },
  _createStyles: function (e) {
    var t = e.mainSeriesColor;
    var n = this._getColorId(e);
    var i = e.hoverStyle || {};
    var o = e.selectionStyle || {};
    if (n) {
      this._turnOffHatching(i, o);
    }
    this._styles = {
      labelColor: t,
      normal: this._parseStyle(e, t, t),
      hover: this._parseStyle(i, n || t, t),
      selection: this._parseStyle(o, n || t, t),
      legendStyles: {
        normal: this._createLegendState(e, n || t),
        hover: this._createLegendState(i, n || t),
        selection: this._createLegendState(o, n || t)
      }
    };
  },
  setClippingParams: function (e, t, n) {
    var i = !(arguments.length > 3) || arguments[3] === undefined || arguments[3];
    this._paneClipRectID = e;
    this._widePaneClipRectID = t;
    this._forceClipping = n;
    this._clipLabels = i;
  },
  applyClip: function () {
    this._group.attr({
      "clip-path": this._paneClipRectID
    });
  },
  resetClip: function () {
    this._group.attr({
      "clip-path": null
    });
  },
  getTagField: function () {
    return this._options.tagField || "tag";
  },
  getValueFields: u.noop,
  getSizeField: u.noop,
  getArgumentField: u.noop,
  getPoints: function () {
    return this._points;
  },
  getPointsInViewPort: function () {
    return c.default.getPointsInViewPort(this);
  },
  _createPoint: function (e, t, n) {
    e.index = t;
    var i = this.pointsByArgument;
    var o = this._getCreatingPointOptions(e);
    var a = e.argument.valueOf();
    var r = n;
    if (r) {
      r.update(e, o);
    } else {
      r = new s.Point(this, e, o);
      if (this.isSelected() && B(this.lastSelectionMode)) {
        r.setView(O);
      }
    }
    var l = i[a];
    if (l) {
      l.push(r);
    } else {
      i[a] = [r];
    }
    if (r.hasValue()) {
      this.customizePoint(r, e);
    }
    return r;
  },
  getRangeData: function () {
    if (this._visible) {
      return this._getRangeData();
    } else {
      return {
        arg: {},
        val: {}
      };
    }
  },
  getArgumentRange: function () {
    if (this._visible) {
      return c.default.getArgumentRange(this);
    } else {
      return {
        arg: {},
        val: {}
      };
    }
  },
  getViewport: function () {
    return c.default.getViewport(this);
  },
  _deleteGroup: function (e) {
    var t = this[e];
    if (t) {
      t.dispose();
      this[e] = null;
    }
  },
  updateOptions: function (e, t) {
    var n = e.widgetType;
    var i = this.type;
    var o = e.type;
    this.type = o && (0, l.normalizeEnum)(o.toString());
    if (!this._checkType(n) || this._checkPolarBarType(n, e)) {
      this.dispose();
      this.isUpdated = false;
      return;
    }
    if (i !== this.type) {
      this._firstDrawing = true;
      this._resetType(i, n);
      this._setType(this.type, n);
    } else {
      this._defineDrawingState();
    }
    this._options = e;
    this._pointOptions = null;
    this.name = e.name;
    this.pane = e.pane;
    this.tag = e.tag;
    if (t) {
      this._seriesModes = t.commonSeriesModes || this._seriesModes;
      this._valueAxis = t.valueAxis || this._valueAxis;
      this.axis = this._valueAxis && this._valueAxis.name;
      this._argumentAxis = t.argumentAxis || this._argumentAxis;
    }
    this._createStyles(e);
    this._stackName = null;
    this._updateOptions(e);
    this._visible = e.visible;
    this.isUpdated = true;
    this.stack = e.stack;
    this.barOverlapGroup = e.barOverlapGroup;
    this._createGroups();
    this._processEmptyValue = e.ignoreEmptyPoints ? function (e) {
      if (e === null) {
        return undefined;
      } else {
        return e;
      }
    } : function (e) {
      return e;
    };
  },
  _defineDrawingState: function () {
    this._firstDrawing = true;
  },
  _disposePoints: function (e) {
    (0, r.each)(e || [], function (e, t) {
      t.dispose();
    });
  },
  updateDataType: function (e) {
    this.argumentType = e.argumentType;
    this.valueType = e.valueType;
    this.argumentAxisType = e.argumentAxisType;
    this.valueAxisType = e.valueAxisType;
    this.showZero = e.showZero;
    this._argumentChecker = H(e.argumentAxisType, this.getArgumentAxis());
    this._valueChecker = H(e.valueAxisType, this.getValueAxis());
    return this;
  },
  _argumentChecker: function () {
    return true;
  },
  _valueChecker: function () {
    return true;
  },
  getOptions: function () {
    return this._options;
  },
  _getOldPoint: function (e, t, n) {
    var i = e.argument && e.argument.valueOf();
    var o = (t[i] || [])[0];
    if (o) {
      t[i].splice(0, 1);
    }
    return o;
  },
  updateData: function (e) {
    var t = this._options;
    var n = t.nameField;
    if ((e = e || []).length) {
      this._canRenderCompleteHandle = true;
    }
    var i = this._getPointDataSelector();
    var a = 0;
    this._data = e.reduce(function (e, r, s) {
      var l = i(r);
      if ((0, o.isDefined)(l.argument)) {
        if (!n || r[n] === t.nameFieldValue) {
          l.index = s;
          e.push(l);
        }
      } else {
        a++;
      }
      return e;
    }, []);
    if (a && a === e.length) {
      this._incidentOccurred("W2002", [this.name, this.getArgumentField()]);
    }
    this._endUpdateData();
  },
  _getData: function () {
    var e = this._data || [];
    if (this.useAggregation()) {
      var t = this.argumentAxisType !== "discrete" ? this.getArgumentRange() : {};
      var n = this.getArgumentAxis().getAggregationInfo(this._useAllAggregatedPoints, t);
      e = this._resample(n, e);
    }
    return e;
  },
  useAggregation: function () {
    var e = this.getOptions().aggregation;
    return e && e.enabled;
  },
  autoHidePointMarkersEnabled: u.noop,
  usePointsToDefineAutoHiding: u.noop,
  createPoints: function (e) {
    this._normalizeUsingAllAggregatedPoints(e);
    this._createPoints();
  },
  _normalizeUsingAllAggregatedPoints: function (e) {
    this._useAllAggregatedPoints = this.useAggregation() && (this.argumentAxisType === "discrete" || (this._data || []).length > 1 && !!e);
  },
  _createPoints: function () {
    var e = this;
    var t = e.pointsByArgument || {};
    var n = e._getData();
    e.pointsByArgument = {};
    e._calculateErrorBars(n);
    var i = {};
    var o = n.reduce(function (n, o) {
      if (e._checkData(o, i)) {
        var a = n.length;
        var r = e._getOldPoint(o, t, a);
        var s = e._createPoint(o, a, r);
        n.push(s);
      }
      return n;
    }, []);
    for (var a in i) {
      if (i[a] === n.length) {
        e._incidentOccurred("W2002", [e.name, a]);
      }
    }
    Object.keys(t).forEach(function (n) {
      return e._disposePoints(t[n]);
    });
    e._points = o;
  },
  _removeOldSegments: function () {
    var e = this;
    var t = e._segments.length;
    (0, r.each)(e._graphics.splice(t, e._graphics.length) || [], function (t, n) {
      e._removeElement(n);
    });
    if (e._trackers) {
      (0, r.each)(e._trackers.splice(t, e._trackers.length) || [], function (e, t) {
        t.remove();
      });
    }
  },
  _prepareSegmentsPosition: function () {
    var e = this._points || [];
    var t = e[0] && e[0].hasValue() && this._options.closed;
    var n = e.reduce(function (e, t) {
      var n = e.at(-1);
      if (!t.translated) {
        t.setDefaultCoords();
      }
      if (t.hasValue() && t.hasCoords()) {
        n.push(t);
      } else if (!t.hasValue() && n.length) {
        e.push([]);
      }
      return e;
    }, [[]]);
    this._drawSegments(n, t, false);
  },
  _drawElements: function (e, t) {
    var n = this;
    var i = n._points || [];
    var o = i[0] && i[0].hasValue() && n._options.closed;
    var a = {
      markers: n._markersGroup,
      errorBars: n._errorBarGroup
    };
    n._drawnPoints = [];
    n._graphics = n._graphics || [];
    n._segments = [];
    var r = i.reduce(function (i, o) {
      var r = i.at(-1);
      if (o.hasValue() && o.hasCoords()) {
        n._drawPoint({
          point: o,
          groups: a,
          hasAnimation: e,
          firstDrawing: t
        });
        r.push(o);
      } else if (o.hasValue()) {
        o.setInvisibility();
      } else if (r.length) {
        i.push([]);
      }
      return i;
    }, [[]]);
    n._drawSegments(r, o, e);
    n._firstDrawing = !i.length;
    n._removeOldSegments();
    if (e) {
      n._animate(t);
    }
  },
  _drawSegments: function (e, t, n) {
    var i = this;
    e.forEach(function (o, a) {
      if (o.length) {
        var r = t && a === e.length - 1;
        i._drawSegment(o, n, a, r);
      }
    });
  },
  draw: function (e, t, n) {
    var i = this._firstDrawing;
    this._legendCallback = n || this._legendCallback;
    if (this._visible) {
      this._appendInGroup();
      if (!this._isAllPointsTranslated) {
        this.prepareCoordinatesForPoints();
      }
      this._setGroupsSettings(e, i);
      if (!i && !this._resetApplyingAnimation) {
        this._prepareSegmentsPosition();
      }
      this._drawElements(e, i);
      if (t) {
        this.hideLabels();
      }
      if (this.isSelected()) {
        this._changeStyle(this.lastSelectionMode, undefined, true);
      } else if (this.isHovered()) {
        this._changeStyle(this.lastHoverMode, undefined, true);
      } else {
        this._applyStyle(this._styles.normal);
      }
      this._isAllPointsTranslated = false;
      this._resetApplyingAnimation = false;
    } else {
      this._group.remove();
    }
  },
  _translatePoints: function () {
    (this._points ?? []).forEach(function (e) {
      e.translate();
    });
  },
  prepareCoordinatesForPoints: function () {
    this._applyVisibleArea();
    this._translatePoints();
    this._isAllPointsTranslated = true;
  },
  _setLabelGroupSettings: function (e) {
    var t = {
      class: "dxc-labels",
      "pointer-events": "none"
    };
    if (this._clipLabels) {
      this._applyElementsClipRect(t);
    }
    this._applyClearingSettings(t);
    if (e) {
      t.opacity = 0.001;
    }
    this._labelsGroup.attr(t).append(this._extGroups.labelsGroup);
  },
  _checkType: function (e) {
    return !!S.mixins[e][this.type];
  },
  _checkPolarBarType: function (e, t) {
    return e === "polar" && t.spiderWidget && this.type.indexOf("bar") !== -1;
  },
  _resetType: function (e, t) {
    var n;
    if (e) {
      for (n in S.mixins[t][e]) {
        delete this[n];
      }
    }
  },
  _setType: function (e, t) {
    var n;
    var i = S.mixins[t][e];
    for (n in i) {
      this[n] = i[n];
    }
  },
  _setPointsView: function (e, t) {
    this.getPoints().forEach(function (n) {
      if (t !== n) {
        n.setView(e);
      }
    });
  },
  _resetPointsView: function (e, t) {
    this.getPoints().forEach(function (n) {
      if (t !== n) {
        n.resetView(e);
      }
    });
  },
  _resetNearestPoint: function () {
    if (this._nearestPoint && this._nearestPoint.series !== null) {
      this._nearestPoint.resetView(T);
    }
    this._nearestPoint = null;
  },
  _setSelectedState: function (e) {
    this.lastSelectionMode = (0, l.normalizeEnum)(e || this._options.selectionMode);
    this.fullState = this.fullState | D;
    this._resetNearestPoint();
    this._changeStyle(this.lastSelectionMode);
    if (this.lastSelectionMode !== "none" && this.isHovered() && B(this.lastHoverMode)) {
      this._resetPointsView(T);
    }
  },
  _releaseSelectedState: function () {
    this.fullState = this.fullState & ~D;
    this._changeStyle(this.lastSelectionMode, O);
    if (this.lastSelectionMode !== "none" && this.isHovered() && B(this.lastHoverMode)) {
      this._setPointsView(T);
    }
  },
  isFullStackedSeries: function () {
    return this.type.indexOf("fullstacked") === 0;
  },
  isStackedSeries: function () {
    return this.type.indexOf("stacked") === 0;
  },
  resetApplyingAnimation: function (e) {
    this._resetApplyingAnimation = true;
    if (e) {
      this._firstDrawing = true;
    }
  },
  isFinancialSeries: function () {
    return this.type === "stock" || this.type === "candlestick";
  },
  _canChangeView: function () {
    return !this.isSelected() && (0, l.normalizeEnum)(this._options.hoverMode) !== "none";
  },
  _changeStyle: function (e, t, n) {
    var i = this.fullState;
    var o = [E, T, O, O];
    if (this.lastHoverMode === "none") {
      i &= ~I;
    }
    if (this.lastSelectionMode === "none") {
      i &= ~D;
    }
    if (B(e) && !n) {
      if (t) {
        this._resetPointsView(t);
      } else {
        this._setPointsView(o[i]);
      }
    }
    this._legendCallback([M, P, A, A][i]);
    this._applyStyle(this._styles[o[i]]);
  },
  updateHover: function (e, t) {
    var n = this._nearestPoint;
    var i = this.isHovered() && this.lastHoverMode === "nearestpoint" && this.getNeighborPoint(e, t);
    if (i !== n && (!this.isSelected() || this.lastSelectionMode === "none")) {
      this._resetNearestPoint();
      if (i) {
        i.setView(T);
        this._nearestPoint = i;
      }
    }
  },
  _getMainAxisName: function () {
    if (this._options.rotated) {
      return "X";
    } else {
      return "Y";
    }
  },
  areLabelsVisible: function () {
    return !(0, o.isDefined)(this._options.maxLabelCount) || this._points.length <= this._options.maxLabelCount;
  },
  getLabelVisibility: function () {
    return this.areLabelsVisible() && this._options.label && this._options.label.visible;
  },
  customizePoint: function (e, t) {
    var n;
    var i;
    var r;
    var s;
    var l;
    var u;
    var d = this._options;
    var c = d.customizePoint;
    var h = d.customizeLabel;
    if (h && h.call) {
      (n = (0, a.extend)({
        seriesName: this.name
      }, t)).series = this;
      r = (l = (r = h.call(n, n)) && !(0, o.isEmptyObject)(r)) ? (0, a.extend)(true, {}, d.label, r) : null;
    }
    if (c && c.call) {
      (n = n || (0, a.extend)({
        seriesName: this.name
      }, t)).series = this;
      u = (s = c.call(n, n)) && !(0, o.isEmptyObject)(s);
    }
    if (l || u) {
      (i = this._parsePointOptions(this._preparePointOptions(s), r || d.label, t, e)).styles.useLabelCustomOptions = l;
      i.styles.usePointCustomOptions = u;
      e.updateOptions(i);
    }
  },
  show: function () {
    if (!this._visible) {
      this._changeVisibility(true);
    }
  },
  hide: function () {
    if (this._visible) {
      this._changeVisibility(false);
    }
  },
  _changeVisibility: function (e) {
    this._visible = this._options.visible = e;
    this._updatePointsVisibility();
    this.hidePointTooltip();
    this._options.visibilityChanged(this);
  },
  _updatePointsVisibility: u.noop,
  hideLabels: function () {
    (0, r.each)(this._points, function (e, t) {
      t._label.draw(false);
    });
  },
  _turnOffHatching: function (e, t) {
    if (e.hatching) {
      e.hatching.direction = "none";
    }
    if (t.hatching) {
      t.hatching.direction = "none";
    }
  },
  _parsePointOptions: function (e, t, n, i) {
    var r = this._options;
    var s = this._createPointStyles(e, n, i);
    var u = (0, a.extend)({}, e, {
      type: r.type,
      rotated: r.rotated,
      styles: s,
      widgetType: r.widgetType,
      visibilityChanged: r.visibilityChanged
    });
    u.label = function (e, t) {
      var n = e || {};
      var i = (0, a.extend)({}, n.font) || {};
      var r = n.border || {};
      var s = n.connector || {};
      var u = {
        fill: n.backgroundColor || t,
        "stroke-width": r.visible && r.width || 0,
        stroke: r.visible && r.width ? r.color : "none",
        dashStyle: r.dashStyle
      };
      var d = {
        stroke: s.visible && s.width ? s.color || t : "none",
        "stroke-width": s.visible && s.width || 0
      };
      i.color = n.backgroundColor === "none" && (0, l.normalizeEnum)(i.color) === "#ffffff" && n.position !== "inside" ? t : i.color;
      return {
        alignment: n.alignment,
        format: n.format,
        argumentFormat: n.argumentFormat,
        customizeText: (0, o.isFunction)(n.customizeText) ? n.customizeText : undefined,
        attributes: {
          font: i
        },
        visible: i.size !== 0 && n.visible,
        showForZeroValues: n.showForZeroValues,
        horizontalOffset: n.horizontalOffset,
        verticalOffset: n.verticalOffset,
        radialOffset: n.radialOffset,
        background: u,
        position: n.position,
        connector: d,
        rotationAngle: n.rotationAngle,
        wordWrap: n.wordWrap,
        textOverflow: n.textOverflow,
        cssClass: n.cssClass,
        displayFormat: n.displayFormat
      };
    }(t, s.labelColor);
    if (this.areErrorBarsVisible()) {
      u.errorBars = r.valueErrorBar;
    }
    return u;
  },
  _preparePointOptions: function (e) {
    var t;
    var n;
    var i;
    var o = this._getOptionsForPoint();
    if (e) {
      (i = L(t = o, n = e)).image = (0, a.extend)(true, {}, t.image, n.image);
      i.selectionStyle = L(t.selectionStyle, n.selectionStyle);
      i.hoverStyle = L(t.hoverStyle, n.hoverStyle);
      return i;
    } else {
      return o;
    }
  },
  _getMarkerGroupOptions: function () {
    return (0, a.extend)(false, {}, this._getOptionsForPoint(), {
      hoverStyle: {},
      selectionStyle: {}
    });
  },
  _getAggregationMethod: function (e, t) {
    var n;
    var i = this.getOptions().aggregation;
    var o = (0, l.normalizeEnum)(i.method);
    var a = o === "custom" && i.calculate;
    n = e && !t ? function (e) {
      return e.data[0];
    } : this._aggregators[o] || this._aggregators[this._defaultAggregator];
    return a || n;
  },
  _resample: function (e, t) {
    var n = e.interval;
    var i = e.ticks;
    var o = e.aggregateByCategory;
    var a = this;
    var r = a.argumentAxisType === "discrete" || a.valueAxisType === "discrete";
    var s = 0;
    var l = this._getPointDataSelector();
    var u = a.getOptions();
    function d(e, t, n) {
      if (t) {
        function i(t) {
          var i = t && l(t, u);
          if (i && a._checkData(i)) {
            i.aggregationInfo = n;
            e.push(i);
          }
        }
        if (Array.isArray(t)) {
          t.forEach(i);
        } else {
          i(t);
        }
      }
    }
    var c = this._getAggregationMethod(r, o);
    if (r) {
      if (o) {
        var h = this.getArgumentAxis().getTranslator().getBusinessRange().categories;
        var f = h.reduce(function (e, t) {
          e[t.valueOf()] = [];
          return e;
        }, {});
        t.forEach(function (e) {
          f[e.argument.valueOf()].push(e);
        });
        return h.reduce(function (e, t) {
          d(e, c({
            aggregationInterval: null,
            intervalStart: t,
            intervalEnd: t,
            data: f[t.valueOf()].map(F)
          }, a));
          return e;
        }, []);
      }
      return t.reduce(function (e, t, i, o) {
        e[1].push(t);
        if (i === o.length - 1 || (i + 1) % n == 0) {
          var r = e[1];
          var s = {
            aggregationInterval: n,
            data: r.map(F)
          };
          d(e[0], c(s, a));
          e[1] = [];
        }
        return e;
      }, [[], []])[0];
    }
    var p = [];
    if (i.length === 1) {
      var g = {
        intervalStart: i[0],
        intervalEnd: i[0],
        aggregationInterval: null,
        data: t.map(F)
      };
      d(p, c(g, a), g);
    } else {
      for (var m = 1; m < i.length; m++) {
        for (var _ = i[m], v = i[m - 1], y = []; t[s] && t[s].argument < _;) {
          if (t[s].argument >= v) {
            y.push(t[s]);
          }
          s++;
        }
        var b = {
          intervalStart: v,
          intervalEnd: _,
          aggregationInterval: n,
          data: y.map(F)
        };
        d(p, c(b, a), b);
      }
    }
    a._endUpdateData();
    return p;
  },
  canRenderCompleteHandle: function () {
    var e = this._canRenderCompleteHandle;
    delete this._canRenderCompleteHandle;
    return !!e;
  },
  isHovered: function () {
    return !!(this.fullState & 1);
  },
  isSelected: function () {
    return !!(this.fullState & 2);
  },
  isVisible: function () {
    return this._visible;
  },
  getAllPoints: function () {
    this._createAllAggregatedPoints();
    return (this._points || []).slice();
  },
  getPointByPos: function (e) {
    this._createAllAggregatedPoints();
    return (this._points || [])[e];
  },
  getVisiblePoints: function () {
    return (this._drawnPoints || []).slice();
  },
  selectPoint: function (e) {
    if (!e.isSelected()) {
      (function (e, t) {
        e.fullState |= D;
        e.applyView(t);
      })(e, this._legendCallback);
      this._eventPipe({
        action: "pointSelect",
        target: e
      });
      this._eventTrigger("pointSelectionChanged", {
        target: e
      });
    }
  },
  deselectPoint: function (e) {
    if (e.isSelected()) {
      (function (e, t) {
        e.fullState &= ~D;
        e.applyView(t);
      })(e, this._legendCallback);
      this._eventPipe({
        action: "pointDeselect",
        target: e
      });
      this._eventTrigger("pointSelectionChanged", {
        target: e
      });
    }
  },
  hover: function (e) {
    var t = this._eventTrigger;
    if (!this.isHovered()) {
      this.lastHoverMode = (0, l.normalizeEnum)(e || this._options.hoverMode);
      this.fullState = this.fullState | I;
      this._changeStyle(this.lastHoverMode, undefined, this.isSelected() && this.lastSelectionMode !== "none");
      t("seriesHoverChanged", {
        target: this
      });
    }
  },
  clearHover: function () {
    var e = this._eventTrigger;
    if (this.isHovered()) {
      this._resetNearestPoint();
      this.fullState = this.fullState & ~I;
      this._changeStyle(this.lastHoverMode, T, this.isSelected() && this.lastSelectionMode !== "none");
      e("seriesHoverChanged", {
        target: this
      });
    }
  },
  hoverPoint: function (e) {
    if (!e.isHovered()) {
      e.clearHover();
      (function (e, t) {
        e.fullState |= I;
        e.applyView(t);
      })(e, this._legendCallback);
      if (this._canChangeView()) {
        this._applyStyle(this._styles.hover);
      }
      this._eventPipe({
        action: "pointHover",
        target: e
      });
      this._eventTrigger("pointHoverChanged", {
        target: e
      });
    }
  },
  clearPointHover: function () {
    var e = this;
    e.getPoints().some(function (t) {
      return !!t.isHovered() && (n = t, i = e._legendCallback, n.fullState &= ~I, n.applyView(i), n.releaseHoverState(), e._canChangeView() && e._applyStyle(e._styles.normal), e._eventPipe({
        action: "clearPointHover",
        target: t
      }), e._eventTrigger("pointHoverChanged", {
        target: t
      }), true);
      var n;
      var i;
    });
  },
  showPointTooltip: function (e) {
    R(this._extGroups.seriesGroup, "showpointtooltip", e);
  },
  hidePointTooltip: function (e) {
    R(this._extGroups.seriesGroup, "hidepointtooltip", e);
  },
  select: function () {
    if (!this.isSelected()) {
      this._setSelectedState(this._options.selectionMode);
      this._eventPipe({
        action: "seriesSelect",
        target: this
      });
      this._group.toForeground();
      this._eventTrigger("seriesSelectionChanged", {
        target: this
      });
    }
  },
  clearSelection: function () {
    if (this.isSelected()) {
      this._releaseSelectedState();
      this._eventTrigger("seriesSelectionChanged", {
        target: this
      });
    }
  },
  getPointsByArg: function (e, t) {
    var n = e.valueOf();
    var i = this.pointsByArgument[n];
    if (!i && !t && !!this._createAllAggregatedPoints()) {
      i = this.pointsByArgument[n];
    }
    return i || [];
  },
  _createAllAggregatedPoints: function () {
    return !!this.useAggregation() && !this._useAllAggregatedPoints && (this.createPoints(true), true);
  },
  getPointsByKeys: function (e) {
    return this.getPointsByArg(e);
  },
  notify: function (e) {
    var t = this;
    var n = e.action;
    var i = t._seriesModes;
    var o = e.target;
    var a = o.getOptions();
    var r = (0, l.normalizeEnum)(a.hoverMode);
    var s = (0, l.normalizeEnum)(a.selectionMode);
    if (n === "pointHover") {
      t._hoverPointHandler(o, r, e.notifyLegend);
    } else if (n === "clearPointHover") {
      t._clearPointHoverHandler(o, r, e.notifyLegend);
    } else if (n === "seriesSelect") {
      if (o !== t && i.seriesSelectionMode === "single") {
        t.clearSelection();
      }
    } else if (n === "pointSelect") {
      if (i.pointSelectionMode === "single") {
        t.getPoints().some(function (e) {
          return e !== o && !!e.isSelected() && (t.deselectPoint(e), true);
        });
      }
      t._selectPointHandler(o, s);
    } else if (n === "pointDeselect") {
      t._deselectPointHandler(o, s);
    }
  },
  _selectPointHandler: function (e, t) {
    if (t === "allseriespoints") {
      if (e.series === this) {
        this._setPointsView(O, e);
      }
    } else if (t === "allargumentpoints") {
      this.getPointsByKeys(e.argument, e.argumentIndex).forEach(function (t) {
        if (t !== e) {
          t.setView(O);
        }
      });
    }
  },
  _deselectPointHandler: function (e, t) {
    if (t === "allseriespoints") {
      if (e.series === this) {
        this._resetPointsView(O, e);
      }
    } else if (t === "allargumentpoints") {
      this.getPointsByKeys(e.argument, e.argumentIndex).forEach(function (t) {
        if (t !== e) {
          t.resetView(O);
        }
      });
    }
  },
  _hoverPointHandler: function (e, t, n) {
    if (e.series !== this && t === "allargumentpoints") {
      this.getPointsByKeys(e.argument, e.argumentIndex).forEach(function (e) {
        e.setView(T);
      });
      if (n) {
        this._legendCallback(e);
      }
    } else if (t === "allseriespoints" && e.series === this) {
      this._setPointsView(T, e);
    }
  },
  _clearPointHoverHandler: function (e, t, n) {
    if (t === "allargumentpoints") {
      if (e.series !== this) {
        this.getPointsByKeys(e.argument, e.argumentIndex).forEach(function (e) {
          e.resetView(T);
        });
      }
      if (n) {
        this._legendCallback(e);
      }
    } else if (t === "allseriespoints" && e.series === this) {
      this._resetPointsView(T, e);
    }
  },
  _deletePoints: function () {
    this._disposePoints(this._points);
    this._points = this._drawnPoints = null;
  },
  _deleteTrackers: function () {
    (0, r.each)(this._trackers || [], function (e, t) {
      t.remove();
    });
    if (this._trackersGroup) {
      this._trackersGroup.dispose();
    }
    this._trackers = this._trackersGroup = null;
  },
  dispose: function () {
    this._deletePoints();
    this._group.dispose();
    if (this._labelsGroup) {
      this._labelsGroup.dispose();
    }
    if (this._errorBarGroup) {
      this._errorBarGroup.dispose();
    }
    this._deleteTrackers();
    this._group = this._extGroups = this._markersGroup = this._elementsGroup = this._bordersGroup = this._labelsGroup = this._errorBarGroup = this._graphics = this._rangeData = this._renderer = this._styles = this._options = this._pointOptions = this._drawnPoints = this.pointsByArgument = this._segments = this._prevSeries = null;
  },
  correctPosition: u.noop,
  drawTrackers: u.noop,
  getNeighborPoint: u.noop,
  areErrorBarsVisible: u.noop,
  _getColorId: u.noop,
  getMarginOptions: function () {
    return this._patchMarginOptions({
      percentStick: this.isFullStackedSeries()
    });
  },
  getColor: function () {
    return this.getLegendStyles().normal.fill;
  },
  getOpacity: function () {
    return this._options.opacity;
  },
  getStackName: function () {
    return this._stackName;
  },
  getBarOverlapGroup: function () {
    return this._options.barOverlapGroup;
  },
  getPointByCoord: function (e, t) {
    var n = this.getNeighborPoint(e, t);
    if (n != null && n.coordsIn(e, t)) {
      return n;
    } else {
      return null;
    }
  },
  getValueAxis: function () {
    return this._valueAxis;
  },
  getArgumentAxis: function () {
    return this._argumentAxis;
  },
  getMarkersGroup: function () {
    return this._markersGroup;
  },
  getRenderer: function () {
    return this._renderer;
  },
  removePointElements: function () {
    if (this._markersGroup) {
      (0, r.each)(this._points, function (e, t) {
        return t.deleteMarker();
      });
      this._markersGroup.dispose();
      this._markersGroup = null;
    }
  },
  removeGraphicElements: function () {
    var e = this;
    if (e._elementsGroup) {
      e._elementsGroup.dispose();
      e._elementsGroup = null;
    }
    (0, r.each)(e._graphics || [], function (t, n) {
      e._removeElement(n);
    });
    e._graphics = null;
  },
  removeBordersGroup: function () {
    if (this._bordersGroup) {
      this._bordersGroup.dispose();
      this._bordersGroup = null;
    }
  }
};
var N = S.mixins;
exports.mixins = N;