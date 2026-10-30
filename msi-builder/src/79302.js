exports.SeriesDataSource = undefined;
var i = require("./54932.js");
var o = require("./1939.js");
var a = require("./35922.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./19157.js");
var u = require("./21177.js");
var d = require("./45865.js");
var c = require("./99327.js");
function h(e) {
  var t;
  var n = this._themeManager = (t = e.chart, new c.ThemeManager({
    options: t,
    themeSection: "rangeSelector.chart",
    fontFields: ["commonSeriesSettings.label.font"]
  }));
  n.setTheme(e.chart.theme);
  var i = n.getOptions("topIndent");
  var o = n.getOptions("bottomIndent");
  this._indent = {
    top: i >= 0 && i < 1 ? i : 0,
    bottom: o >= 0 && o < 1 ? o : 0
  };
  this._valueAxis = n.getOptions("valueAxisRangeSelector") || {};
  this._hideChart = false;
  this._series = this._calculateSeries(e);
  this._seriesFamilies = [];
}
exports.SeriesDataSource = h;
h.prototype = {
  constructor: h,
  _calculateSeries: function (e) {
    var t;
    var n;
    var o;
    var a;
    var s;
    var u;
    var c;
    var h = [];
    var f = e.dataSource || [];
    var p = this._themeManager;
    var g = p.getOptions("seriesTemplate");
    var m = g ? (0, l.processSeriesTemplate)(g, f) : e.chart.series;
    var _ = this._valueAxis;
    if (e.dataSource && !m) {
      m = {
        argumentField: a = e.dataSourceField || "arg",
        valueField: a
      };
      this._hideChart = true;
    }
    m = Array.isArray(m) ? m : m ? [m] : [];
    s = 0;
    for (; s < m.length; s++) {
      (t = (0, r.extend)(true, {}, m[s])).rotated = false;
      (n = p.getOptions("series", t, m.length)).argumentField = n.argumentField || e.dataSourceField;
      n.name ||= "Series " + (s + 1).toString();
      if (f && f.length > 0) {
        u = new i.Series({
          renderer: e.renderer,
          argumentAxis: e.argumentAxis,
          valueAxis: e.valueAxis,
          incidentOccurred: e.incidentOccurred
        }, n);
        h.push(u);
      }
    }
    if (h.length) {
      c = {
        groups: [{
          series: h,
          valueAxis: e.valueAxis,
          valueOptions: {
            type: _.type,
            valueType: a ? e.valueType : _.valueType
          }
        }],
        argumentOptions: {
          categories: e.categories,
          argumentType: e.valueType,
          type: e.axisType
        }
      };
      o = (0, d.validateData)(f, c, e.incidentOccurred, p.getOptions("dataPrepareSettings"));
      this.argCategories = c.categories;
      s = 0;
      for (; s < h.length; s++) {
        h[s].updateData(o[h[s].getArgumentField()]);
      }
    }
    return h;
  },
  createPoints: function () {
    if (this._series.length !== 0) {
      var e = this._series;
      var t = new u.Range();
      var n = e[0].getArgumentAxis();
      var i = this._themeManager;
      var r = i.getOptions("negativesAsZeroes");
      var l = i.getOptions("negativesAsZeros");
      e.forEach(function (e) {
        t.addRange(e.getArgumentRange());
      });
      n.getTranslator().updateBusinessRange(t);
      e.forEach(function (e) {
        e.createPoints();
      });
      this._seriesFamilies = function (e, t, n, i, a) {
        var r = [];
        var l = [];
        (0, s.each)(e, function (e, t) {
          if (!l.includes(t.type)) {
            l.push(t.type);
          }
        });
        (0, s.each)(l, function (s, l) {
          var u = new o.SeriesFamily({
            type: l,
            minBubbleSize: t,
            maxBubbleSize: n,
            barGroupPadding: i.barGroupPadding,
            barGroupWidth: i.barGroupWidth,
            negativesAsZeroes: a
          });
          u.add(e);
          u.adjustSeriesValues();
          r.push(u);
        });
        return r;
      }(e, i.getOptions("minBubbleSize"), i.getOptions("maxBubbleSize"), {
        barGroupPadding: i.getOptions("barGroupPadding"),
        barGroupWidth: i.getOptions("barGroupWidth")
      }, (0, a.isDefined)(r) ? r : l);
    }
  },
  adjustSeriesDimensions: function () {
    (0, s.each)(this._seriesFamilies, function (e, t) {
      t.adjustSeriesDimensions();
    });
  },
  getBoundRange: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var r = this._valueAxis;
    var l = new u.Range({
      min: r.min,
      minVisible: r.min,
      max: r.max,
      maxVisible: r.max,
      axisType: r.type,
      base: r.logarithmBase
    });
    var d = new u.Range({});
    (0, s.each)(this._series, function (t, n) {
      e = n.getRangeData();
      l.addRange(e.val);
      d.addRange(e.arg);
    });
    if (!l.isEmpty() && !d.isEmpty()) {
      i = r.inverted ? this._indent.top : this._indent.bottom;
      o = r.inverted ? this._indent.bottom : this._indent.top;
      t = l.max - l.min;
      n = ((0, a.isNumeric)(l.maxVisible) ? l.maxVisible : l.max) - ((0, a.isNumeric)(l.minVisible) ? l.minVisible : l.min);
      if ((0, a.isDate)(l.min)) {
        l.min = new Date(l.min.valueOf() - t * i);
      } else {
        l.min -= t * i;
      }
      if ((0, a.isDate)(l.max)) {
        l.max = new Date(l.max.valueOf() + t * o);
      } else {
        l.max += t * o;
      }
      if ((0, a.isNumeric)(n)) {
        l.maxVisible = l.maxVisible ? l.maxVisible + n * o : undefined;
        l.minVisible = l.minVisible ? l.minVisible - n * i : undefined;
      }
      l.invert = r.inverted;
    }
    return {
      arg: d,
      val: l
    };
  },
  getMarginOptions: function (e) {
    var t = Math.min(e.width, e.height) * this._themeManager.getOptions("maxBubbleSize");
    return this._series.reduce(function (e, n) {
      var i = n.getMarginOptions();
      if (i.processBubbleSize === true) {
        i.size = t;
      }
      return (0, l.mergeMarginOptions)(e, i);
    }, {});
  },
  getSeries: function () {
    return this._series;
  },
  isEmpty: function () {
    return this.getSeries().length === 0;
  },
  isShowChart: function () {
    return !this._hideChart;
  },
  getCalculatedValueType: function () {
    var e = this._series[0];
    if (e == null) {
      return undefined;
    } else {
      return e.argumentType;
    }
  },
  getThemeManager: function () {
    return this._themeManager;
  }
};