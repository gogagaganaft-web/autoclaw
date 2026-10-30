exports.default = undefined;
var i = d(require("./55628.js"));
var o = require("./45865.js");
var a = require("./54932.js");
var r = require("./19157.js");
var s = require("./35922.js");
var l = d(require("./99393.js"));
var u = require("./1539.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = {
  line: true,
  spline: true,
  stepline: true,
  area: true,
  steparea: true,
  splinearea: true,
  bar: true,
  winloss: true
};
var h = Math;
var f = h.abs;
var p = h.round;
var g = h.max;
var m = h.min;
var _ = isFinite;
var v = Number;
var y = String;
function b(e, t, n, i) {
  if (n === i.first || n === i.last) {
    e = t.firstLastColor;
  }
  if ((i.min || []).indexOf(n) >= 0) {
    e = t.minColor;
  }
  if ((i.max || []).indexOf(n) >= 0) {
    e = t.maxColor;
  }
  return e;
}
var x = i.default.inherit({
  _rootClassPrefix: "dxsl",
  _rootClass: "dxsl-sparkline",
  _themeSection: "sparkline",
  _defaultSize: {
    width: 250,
    height: 30
  },
  _initCore: function () {
    this.callBase();
    this._createSeries();
  },
  _initialChanges: ["DATA_SOURCE"],
  _dataSourceChangedHandler: function () {
    this._requestChange(["UPDATE"]);
  },
  _updateWidgetElements: function () {
    this._updateSeries();
    this.callBase();
  },
  _disposeWidgetElements: function () {
    if (this._series) {
      this._series.dispose();
    }
    this._series = this._seriesGroup = this._seriesLabelGroup = null;
  },
  _cleanWidgetElements: function () {
    this._seriesGroup.remove();
    this._seriesLabelGroup.remove();
    this._seriesGroup.clear();
    this._seriesLabelGroup.clear();
    this._series.removeGraphicElements();
    this._series.removePointElements();
    this._series.removeBordersGroup();
  },
  _drawWidgetElements: function () {
    if (this._dataIsLoaded()) {
      this._drawSeries();
      this._drawn();
    }
  },
  _getCorrectCanvas: function () {
    var e = this._allOptions;
    var t = this._canvas;
    var n = e.pointSize && Math.ceil(e.pointSize / 2) + 2;
    var i = e.type;
    if (i !== "bar" && i !== "winloss" && (e.showFirstLast || e.showMinMax)) {
      return {
        width: t.width,
        height: t.height,
        left: t.left + n,
        right: t.right + n,
        top: t.top + n,
        bottom: t.bottom + n
      };
    } else {
      return t;
    }
  },
  _prepareOptions: function () {
    this._allOptions = this.callBase();
    this._allOptions.type = (0, r.normalizeEnum)(this._allOptions.type);
    if (!c[this._allOptions.type]) {
      this._allOptions.type = "line";
    }
  },
  _createHtmlElements: function () {
    this._seriesGroup = this._renderer.g().attr({
      class: "dxsl-series"
    });
    this._seriesLabelGroup = this._renderer.g().attr({
      class: "dxsl-series-labels"
    });
  },
  _createSeries: function () {
    this._series = new a.Series({
      renderer: this._renderer,
      seriesGroup: this._seriesGroup,
      labelsGroup: this._seriesLabelGroup,
      argumentAxis: this._argumentAxis,
      valueAxis: this._valueAxis,
      incidentOccurred: this._incidentOccurred
    }, {
      widgetType: "chart",
      type: "line"
    });
  },
  _updateSeries: function () {
    var e = this._series;
    this._prepareDataSource();
    var t = this._prepareSeriesOptions();
    e.updateOptions(t);
    var n = {
      groups: [{
        series: [e]
      }]
    };
    n.argumentOptions = {
      type: t.type === "bar" ? "discrete" : undefined
    };
    this._simpleDataSource = (0, o.validateData)(this._simpleDataSource, n, this._incidentOccurred, {
      checkTypeForAllData: false,
      convertToAxisDataType: true,
      sortingMethod: true
    })[e.getArgumentField()];
    t.customizePoint = this._getCustomizeFunction();
    e.updateData(this._simpleDataSource);
    e.createPoints();
    this._groupsDataCategories = n.categories;
  },
  _optionChangesMap: {
    dataSource: "DATA_SOURCE"
  },
  _optionChangesOrder: ["DATA_SOURCE"],
  _change_DATA_SOURCE: function () {
    this._updateDataSource();
  },
  _prepareDataSource: function () {
    var e = this._allOptions;
    var t = e.argumentField;
    var n = e.valueField;
    var i = function (e, t, n, i) {
      return (0, r.map)(e, function (e, o) {
        var a;
        var r;
        var s = null;
        if (e !== undefined) {
          s = {};
          a = _(e);
          s[t] = a ? y(o) : e[t];
          r = a ? e : e[n];
          s[n] = r === null ? i ? undefined : r : v(r);
          s = s[t] !== undefined && s[n] !== undefined ? s : null;
        }
        return s;
      });
    }(this._dataSourceItems() || [], t, n, this.option("ignoreEmptyPoints"));
    if (e.type === "winloss") {
      this._winlossDataSource = i;
      this._simpleDataSource = function (e, t, n, i) {
        return (0, r.map)(e, function (e) {
          var o = {
            [t]: e[t]
          };
          if (f(e[n] - i) < 0.0001) {
            o[n] = 0;
          } else if (e[n] > i) {
            o[n] = 1;
          } else {
            o[n] = -1;
          }
          return o;
        });
      }(i, t, n, e.winlossThreshold);
    } else {
      this._simpleDataSource = i;
    }
  },
  _prepareSeriesOptions: function () {
    var e = this._allOptions;
    var t = e.type === "winloss" ? "bar" : e.type;
    return {
      visible: true,
      argumentField: e.argumentField,
      valueField: e.valueField,
      color: e.lineColor,
      width: e.lineWidth,
      widgetType: "chart",
      name: "",
      type: t,
      opacity: t.indexOf("area") !== -1 ? this._allOptions.areaOpacity : undefined,
      point: {
        size: e.pointSize,
        symbol: e.pointSymbol,
        border: {
          visible: true,
          width: 2
        },
        color: e.pointColor,
        visible: false,
        hoverStyle: {
          border: {}
        },
        selectionStyle: {
          border: {}
        }
      },
      border: {
        color: e.lineColor,
        width: e.lineWidth,
        visible: t !== "bar"
      }
    };
  },
  _getCustomizeFunction: function () {
    var e = this._allOptions;
    var t = this._winlossDataSource || this._simpleDataSource;
    var n = this._getExtremumPointsIndexes(t);
    if (e.type === "winloss" || e.type === "bar") {
      return function (e, t, n) {
        return function () {
          var i = this.index;
          var o = t.type === "winloss";
          var a = o ? t.winlossThreshold : 0;
          var r = o ? n[i][t.valueField] : this.value;
          var s = o ? t.winColor : t.barPositiveColor;
          var l = o ? t.lossColor : t.barNegativeColor;
          return {
            color: b(r >= a ? s : l, t, i, e)
          };
        };
      }(n, e, this._winlossDataSource);
    } else {
      return function (e, t) {
        return function () {
          var n = b(undefined, t, this.index, e);
          if (n) {
            return {
              visible: true,
              border: {
                color: n
              }
            };
          } else {
            return {};
          }
        };
      }(n, e);
    }
  },
  _getExtremumPointsIndexes: function (e) {
    var t = this._allOptions;
    var n = e.length - 1;
    var i = {};
    this._minMaxIndexes = function (e, t) {
      var n;
      var i;
      var o = (e[0] || {})[t] || 0;
      var a = o;
      var r = o;
      var s = [0];
      var l = [0];
      var u = e.length;
      for (i = 1; i < u; i++) {
        if ((n = e[i][t]) < a) {
          a = n;
          s = [i];
        } else if (n === a) {
          s.push(i);
        }
        if (n > r) {
          r = n;
          l = [i];
        } else if (n === r) {
          l.push(i);
        }
      }
      if (r === a) {
        s = l = [];
      }
      return {
        minIndexes: s,
        maxIndexes: l
      };
    }(e, t.valueField);
    if (t.showFirstLast) {
      i.first = 0;
      i.last = n;
    }
    if (t.showMinMax) {
      i.min = this._minMaxIndexes.minIndexes;
      i.max = this._minMaxIndexes.maxIndexes;
    }
    return i;
  },
  _getStick: function () {
    return {
      stick: this._series.type !== "bar"
    };
  },
  _updateRange: function () {
    var e;
    var t = this._series;
    var n = t.type;
    var i = n === "bar";
    var o = n === "winloss";
    var a = t.getRangeData();
    var r = this._allOptions.minValue;
    var l = (0, s.isDefined)(r) && _(r);
    var u = this._allOptions.maxValue;
    var d = (0, s.isDefined)(u) && _(u);
    var c = (a.val.max - a.val.min) * 0.15;
    if (i || o || n === "area") {
      if (a.val.min !== 0) {
        a.val.min -= c;
      }
      if (a.val.max !== 0) {
        a.val.max += c;
      }
    } else {
      a.val.min -= c;
      a.val.max += c;
    }
    if (l || d) {
      if (l && d) {
        a.val.minVisible = m(r, u);
        a.val.maxVisible = g(r, u);
      } else {
        a.val.minVisible = l ? v(r) : undefined;
        a.val.maxVisible = d ? v(u) : undefined;
      }
      if (o) {
        a.val.minVisible = l ? g(a.val.minVisible, -1) : undefined;
        a.val.maxVisible = d ? m(a.val.maxVisible, 1) : undefined;
      }
    }
    if (t.getPoints().length > 1 && i) {
      e = (a.arg.max - a.arg.min) * 0.1;
      a.arg.min = a.arg.min - e;
      a.arg.max = a.arg.max + e;
    }
    a.arg.categories = this._groupsDataCategories;
    this._ranges = a;
  },
  _getBarWidth: function (e) {
    var t = this._canvas;
    var n = e * 4;
    var i = t.width - t.left - t.right - n;
    var o = p(i / e);
    if (o < 1) {
      o = 1;
    }
    if (o > 50) {
      o = 50;
    }
    return o;
  },
  _correctPoints: function () {
    var e;
    var t;
    var n = this._allOptions.type;
    var i = this._series.getPoints();
    var o = i.length;
    if (n === "bar" || n === "winloss") {
      e = this._getBarWidth(o);
      t = 0;
      for (; t < o; t++) {
        i[t].correctCoordinates({
          width: e,
          offset: 0
        });
      }
    }
  },
  _drawSeries: function () {
    if (this._simpleDataSource.length > 0) {
      this._correctPoints();
      this._series.draw();
      this._seriesGroup.append(this._renderer.root);
    }
  },
  _isTooltipEnabled: function () {
    return !!this._simpleDataSource.length;
  },
  _getTooltipData: function () {
    var e = this._allOptions;
    var t = this._winlossDataSource || this._simpleDataSource;
    var n = this._tooltip;
    if (t.length === 0) {
      return {};
    }
    var i = this._minMaxIndexes;
    var o = e.valueField;
    var a = t[0][o];
    var r = t[t.length - 1][o];
    var l = (0, s.isDefined)(i.minIndexes[0]) ? t[i.minIndexes[0]][o] : a;
    var u = (0, s.isDefined)(i.maxIndexes[0]) ? t[i.maxIndexes[0]][o] : a;
    var d = n.formatValue(a);
    var c = n.formatValue(r);
    var h = n.formatValue(l);
    var f = n.formatValue(u);
    var p = {
      firstValue: d,
      lastValue: c,
      minValue: h,
      maxValue: f,
      originalFirstValue: a,
      originalLastValue: r,
      originalMinValue: l,
      originalMaxValue: u,
      valueText: ["Start:", d, "End:", c, "Min:", h, "Max:", f]
    };
    if (e.type === "winloss") {
      p.originalThresholdValue = e.winlossThreshold;
      p.thresholdValue = n.formatValue(e.winlossThreshold);
    }
    return p;
  }
});
(0, r.map)(["lineColor", "lineWidth", "areaOpacity", "minColor", "maxColor", "barPositiveColor", "barNegativeColor", "winColor", "lessColor", "firstLastColor", "pointSymbol", "pointColor", "pointSize", "type", "argumentField", "valueField", "winlossThreshold", "showFirstLast", "showMinMax", "ignoreEmptyPoints", "minValue", "maxValue"], function (e) {
  x.prototype._optionChangesMap[e] = "OPTIONS";
});
(0, l.default)("dxSparkline", x);
var w = x;
exports.default = w;
x.addPlugin(u.plugin);
module.exports = exports.default;
module.exports.default = exports.default;