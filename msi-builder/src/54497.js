exports.Point = E;
var i = _(require("./32410.js"));
var o = _(require("./24894.js"));
var a = _(require("./27428.js"));
var r = _(require("./37440.js"));
var s = _(require("./85912.js"));
var l = _(require("./97319.js"));
var u = _(require("./73206.js"));
var d = _(require("./69297.js"));
var c = _(require("./71678.js"));
var h = require("./38234.js");
var f = require("./19157.js");
var p = require("./13306.js");
var g = require("./35922.js");
var m = require("./20576.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = {};
var y = p.extend;
var b = i.default.states;
var x = b.selectedMark;
var w = b.hoverMark;
var C = b.normalMark;
var S = b.hover;
var k = b.normal;
var D = b.selection;
var I = {
  chart: {
    scatter: "symbolPoint",
    line: "symbolPoint",
    spline: "symbolPoint",
    stepline: "symbolPoint",
    stackedline: "symbolPoint",
    fullstackedline: "symbolPoint",
    stackedspline: "symbolPoint",
    fullstackedspline: "symbolPoint",
    stackedsplinearea: "symbolPoint",
    fullstackedsplinearea: "symbolPoint",
    area: "symbolPoint",
    splinearea: "symbolPoint",
    steparea: "symbolPoint",
    stackedarea: "symbolPoint",
    fullstackedarea: "symbolPoint",
    rangearea: "rangeSymbolPoint",
    bar: "barPoint",
    stackedbar: "barPoint",
    fullstackedbar: "barPoint",
    rangebar: "rangeBarPoint",
    bubble: "bubblePoint",
    stock: "stockPoint",
    candlestick: "candlestickPoint"
  },
  pie: {
    pie: "piePoint",
    doughnut: "piePoint",
    donut: "piePoint"
  },
  polar: {
    scatter: "polarSymbolPoint",
    line: "polarSymbolPoint",
    area: "polarSymbolPoint",
    bar: "polarBarPoint",
    stackedbar: "polarBarPoint"
  }
};
function T(e) {
  return (0, f.normalizeEnum)(e) === "none";
}
function E(e, t, n) {
  this.fullState = C;
  this.series = e;
  this.update(t, n);
  this._viewCounters = {
    hover: 0,
    selection: 0
  };
  this._emptySettings = {
    fill: null,
    stroke: null,
    dashStyle: null,
    filter: null
  };
}
v.symbolPoint = o.default;
v.barPoint = a.default;
v.bubblePoint = r.default;
v.piePoint = s.default;
v.rangeSymbolPoint = l.default;
v.rangeBarPoint = u.default;
v.candlestickPoint = d.default;
v.stockPoint = c.default;
v.polarSymbolPoint = h.polarSymbolPoint;
v.polarBarPoint = h.polarBarPoint;
E.prototype = {
  constructor: E,
  getColor: function () {
    if (!this.hasValue() && !this._styles.usePointCustomOptions) {
      this.series.customizePoint(this, this._dataItem);
    }
    return this._styles.normal.fill || this.series.getColor();
  },
  _getStyle: function () {
    return this._styles[this._currentStyle || "normal"];
  },
  update: function (e, t) {
    this.updateOptions(t);
    this.updateData(e);
  },
  updateData: function (e) {
    var t = this.argument !== e.argument;
    this.argument = this.initialArgument = this.originalArgument = e.argument;
    this.tag = e.tag;
    this.index = e.index;
    this._dataItem = e;
    this.data = e.data;
    this.lowError = e.lowError;
    this.highError = e.highError;
    this.aggregationInfo = e.aggregationInfo;
    this._updateData(e, t);
    if (!this.hasValue()) {
      this.setInvisibility();
    }
    this._fillStyle();
    this._updateLabelData();
  },
  deleteMarker: function () {
    if (this.graphic) {
      this.graphic.dispose();
    }
    this.graphic = null;
  },
  draw: function (e, t, n, i) {
    if (this._needDeletingOnDraw || this.series.autoHidePointMarkers && !this.isSelected()) {
      this.deleteMarker();
      this._needDeletingOnDraw = false;
    }
    if (this._needClearingOnDraw) {
      this.clearMarker();
      this._needClearingOnDraw = false;
    }
    if (this._hasGraphic()) {
      this._updateMarker(n, this._getStyle(), t.markers);
    } else if (this.getMarkerVisibility() && !this.series.autoHidePointMarkers) {
      this._drawMarker(e, t.markers, n, i);
    }
    this._drawLabel();
    this._drawErrorBar(e, t.errorBars, n);
    return this;
  },
  _getViewStyle: function () {
    var e = C;
    var t = this.fullState;
    var n = [k, S, D, D];
    if (this._viewCounters.hover) {
      e |= w;
    }
    if (this._viewCounters.selection) {
      e |= x;
    }
    if (T(this.getOptions().selectionMode)) {
      t &= ~x;
    }
    if (T(this.getOptions().hoverMode)) {
      t &= ~w;
    }
    return n[e |= t];
  },
  applyView: function (e) {
    var t = this._getViewStyle();
    this._currentStyle = t;
    if (!this.graphic && !!this.getMarkerVisibility() && !!this.series.autoHidePointMarkers && (t === D || t === S)) {
      this._drawMarker(this.series.getRenderer(), this.series.getMarkersGroup());
    }
    if (this.graphic) {
      if (this.series.autoHidePointMarkers && t !== D && t !== S) {
        this.deleteMarker();
      } else {
        if (t === "normal") {
          this.clearMarker();
        } else {
          this.graphic.toForeground();
        }
        this._updateMarker(true, this._styles[t], undefined, e);
      }
    }
  },
  setView: function (e) {
    this._viewCounters[e]++;
    this.applyView();
  },
  resetView: function (e) {
    var t = this._viewCounters;
    --t[e];
    if (t[e] < 0) {
      t[e] = 0;
    }
    this.applyView();
  },
  releaseHoverState: function () {
    if (this.graphic && !this.isSelected()) {
      this.graphic.toBackground();
    }
  },
  select: function () {
    this.series.selectPoint(this);
  },
  clearSelection: function () {
    this.series.deselectPoint(this);
  },
  hover: function () {
    this.series.hoverPoint(this);
  },
  clearHover: function () {
    this.series.clearPointHover();
  },
  showTooltip: function () {
    this.series.showPointTooltip(this);
  },
  hideTooltip: function () {
    this.series.hidePointTooltip(this);
  },
  _checkLabelsChanging: function (e, t) {
    var n = ~t.indexOf("range");
    var i = ~e.indexOf("range");
    return i && !n || !i && n;
  },
  updateOptions: function (e) {
    if (e) {
      var t = this._options;
      var n = e.widgetType;
      var i = t && t.type;
      var o = e.type;
      var a = I[n][o];
      if (i !== o) {
        this._needDeletingOnDraw = true;
        this._needClearingOnDraw = false;
        if (i) {
          if (this._checkLabelsChanging(i, o)) {
            this.deleteLabel();
          }
          this._resetType(v[I[i]]);
        }
        this._setType(v[a]);
      } else {
        this._needDeletingOnDraw = this._checkSymbol(t, e);
        this._needClearingOnDraw = this._checkCustomize(t, e);
      }
      this._options = e;
      this._fillStyle();
      this._updateLabelOptions(a);
    }
  },
  translate: function () {
    if (this.hasValue()) {
      this._translate();
      this.translated = true;
    }
  },
  _checkCustomize: function (e, t) {
    return e.styles.usePointCustomOptions && !t.styles.usePointCustomOptions;
  },
  _getCustomLabelVisibility: function () {
    if (this._styles.useLabelCustomOptions) {
      return !!this._options.label.visible;
    } else {
      return null;
    }
  },
  getBoundingRect: function () {
    return this._getGraphicBBox();
  },
  _resetType: function (e) {
    for (var t in e) {
      delete this[t];
    }
  },
  _setType: function (e) {
    for (var t in e) {
      this[t] = e[t];
    }
  },
  isInVisibleArea: function () {
    return this.inVisibleArea;
  },
  isSelected: function () {
    return !!(this.fullState & x);
  },
  isHovered: function () {
    return !!(this.fullState & w);
  },
  getOptions: function () {
    return this._options;
  },
  animate: function (e, t, n) {
    if (this.graphic) {
      this.graphic.animate(t, {
        partitionDuration: n
      }, e);
    } else if (e) {
      e();
    }
  },
  getCoords: function (e) {
    if (e) {
      if (this._options.rotated) {
        return {
          x: this.minX - (this.x - this.minX ? 0 : 1),
          y: this.y
        };
      } else {
        return {
          x: this.x,
          y: this.minY + (this.y - this.minY ? 0 : 1)
        };
      }
    } else {
      return {
        x: this.x,
        y: this.y
      };
    }
  },
  getDefaultCoords: function () {
    if (this._options.rotated) {
      return {
        x: this.defaultX,
        y: this.y
      };
    } else {
      return {
        x: this.x,
        y: this.defaultY
      };
    }
  },
  setDefaultCoords: function () {
    var e = this.getDefaultCoords();
    this.x = e.x;
    this.y = e.y;
  },
  _getVisibleArea: function () {
    return this.series.getVisibleArea();
  },
  _getArgTranslator: function () {
    return this.series.getArgumentAxis().getTranslator();
  },
  _getValTranslator: function () {
    return this.series.getValueAxis().getTranslator();
  },
  isArgumentCorrect: function () {
    return this.series._argumentChecker(this.argument);
  },
  isValueCorrect: function () {
    var e = this.series._valueChecker;
    return e(this.getMinValue()) && e(this.getMaxValue());
  },
  hasValue: function () {
    return this.value !== null && this.minValue !== null && this.isArgumentCorrect() && this.isValueCorrect();
  },
  hasCoords: m.noop,
  correctPosition: m.noop,
  correctRadius: m.noop,
  correctLabelRadius: m.noop,
  getCrosshairData: m.noop,
  getPointRadius: m.noop,
  _populatePointShape: m.noop,
  _checkSymbol: m.noop,
  getMarkerCoords: m.noop,
  hide: m.noop,
  show: m.noop,
  hideMarker: m.noop,
  setInvisibility: m.noop,
  clearVisibility: m.noop,
  isVisible: m.noop,
  resetCorrection: m.noop,
  correctValue: m.noop,
  resetValue: m.noop,
  setPercentValue: m.noop,
  correctCoordinates: m.noop,
  coordsIn: m.noop,
  getTooltipParams: m.noop,
  applyWordWrap: m.noop,
  setLabelTrackerData: m.noop,
  updateLabelCoord: m.noop,
  drawLabel: m.noop,
  correctLabelPosition: m.noop,
  getMinValue: m.noop,
  getMaxValue: m.noop,
  _drawErrorBar: m.noop,
  getMarkerVisibility: m.noop,
  dispose: function () {
    this.deleteMarker();
    this.deleteLabel();
    if (this._errorBar) {
      this._errorBar.dispose();
    }
    this._options = this._styles = this.series = this._errorBar = null;
  },
  getTooltipFormatObject: function (e, t) {
    var n = this._getFormatObject(e);
    var i = [];
    var o = [];
    if (t) {
      t.forEach(function (t) {
        if (t.isVisible()) {
          var n = t._getFormatObject(e);
          o.push(n);
          i.push(n.seriesName + ": " + n.valueText);
        }
      });
      y(n, {
        points: o,
        valueText: i.join("\n"),
        stackName: this.series.getStackName() || null
      });
    }
    var a = this.aggregationInfo;
    if (a) {
      var r = this.series.getArgumentAxis().formatRange(a.intervalStart, a.intervalEnd, a.aggregationInterval, e.getOptions().argumentFormat);
      if (r) {
        n.valueText += `
${r}`;
      }
    }
    return n;
  },
  setHole: function (e, t) {
    var n = isFinite(this.minValue) ? this.minValue : 0;
    if ((0, g.isDefined)(e)) {
      if (t === "left") {
        this.leftHole = this.value - e;
        this.minLeftHole = n - e;
      } else {
        this.rightHole = this.value - e;
        this.minRightHole = n - e;
      }
    }
  },
  resetHoles: function () {
    this.leftHole = null;
    this.minLeftHole = null;
    this.rightHole = null;
    this.minRightHole = null;
  },
  getLabel: function () {
    return this._label;
  },
  getLabels: function () {
    return [this._label];
  },
  getCenterCoord: function () {
    return {
      x: this.x,
      y: this.y
    };
  }
};