exports.ThemeManager = undefined;
var i;
var o;
var a;
var r;
var s = require("./20576.js");
var l = require("./35922.js");
var u = require("./13306.js");
var d = require("./43637.js");
var c = require("./19157.js");
var h = d.BaseThemeManager.inherit((i = function (e) {
  if (e) {
    (e = (0, u.extend)(true, {}, e)).title = (t = e.title, (0, l.isString)(t) ? {
      text: t
    } : t);
    if (e.type === "logarithmic" && e.logarithmBase <= 0 || e.logarithmBase && !(0, l.isNumeric)(e.logarithmBase)) {
      e.logarithmBase = undefined;
      e.logarithmBaseError = true;
    }
    if (e.label && e.label.alignment) {
      e.label.userAlignment = true;
    }
    return e;
  } else {
    return {};
  }
  var t;
}, o = function (e, t, n) {
  var o = this._theme;
  var a = n ^ e === "valueAxis" ? "verticalAxis" : "horizontalAxis";
  var r = i(t);
  var s = i(this._userOptions.commonAxisSettings);
  var d = (0, u.extend)(true, {}, o.commonAxisSettings, o[a], o[e], s, r);
  d.workWeek = r.workWeek || o[e].workWeek;
  d.forceUserTickInterval |= (0, l.isDefined)(r.tickInterval) && !(0, l.isDefined)(r.axisDivisionFactor);
  return d;
}, r = {
  base: a = function (e, t) {
    t = t || this._userOptions[e];
    var n = this._theme[e];
    var i = this._mergedSettings[e];
    return i || (i = (0, l.isPlainObject)(n) && (0, l.isPlainObject)(t) ? (0, u.extend)(true, {}, n, t) : (0, l.isDefined)(t) ? t : n, this._mergedSettings[e] = i, i);
  },
  argumentAxis: o,
  valueAxisRangeSelector: function () {
    return a.call(this, "valueAxis");
  },
  valueAxis: o,
  series: function (e, t, n) {
    var i;
    var o;
    var a = this;
    var s = a._theme;
    var l = a._userOptions.commonSeriesSettings || {};
    var d = s.commonSeriesSettings;
    var h = a._themeSection.split(".").slice(-1)[0];
    var f = (0, c.normalizeEnum)(t.type || l.type || d.type || h === "pie" && s.type);
    var p = a.palette;
    var g = ~f.indexOf("bar");
    var m = ~f.indexOf("line");
    var _ = ~f.indexOf("area");
    var v = f === "bubble";
    var y = a.getOptions("resolveLabelsOverlapping");
    var b = a.getOptions("containerBackgroundColor");
    var x = r.seriesTemplate.call(this);
    if (g || v) {
      o = (t = (0, u.extend)(true, {}, l, l[f], t)).visible;
      l = {
        type: {}
      };
      (0, u.extend)(true, t, t.point);
      t.visible = o;
    }
    var w = (0, u.extend)(true, {
      aggregation: {}
    }, d, d[f], l, l[f], t);
    w.aggregation.enabled = h === "chart" && !!w.aggregation.enabled;
    w.type = f;
    w.widgetType = h;
    w.containerBackgroundColor = b;
    i = h !== "pie" ? (0, c.extractColor)(w.color, true) || p.getNextColor(n) : function (e, t, n) {
      var i = `${e}-${t}`;
      a._multiPieColors[i] ||= p.getNextColor(n);
      return a._multiPieColors[i];
    };
    w.mainSeriesColor = i;
    w.resolveLabelsOverlapping = y;
    if (w.label && (m || _ && f !== "rangearea" || f === "scatter")) {
      w.label.position = "outside";
    }
    if (x) {
      w.nameField = x.nameField;
    }
    return w;
  },
  animation: function (e) {
    var t = this._userOptions[e];
    t = (0, l.isPlainObject)(t) ? t : (0, l.isDefined)(t) ? {
      enabled: !!t
    } : {};
    return a.call(this, e, t);
  },
  seriesTemplate: function () {
    var e = a.call(this, "seriesTemplate");
    if (e) {
      e.nameField = e.nameField || "series";
    }
    return e;
  },
  zoomAndPan: function () {
    function e(e) {
      var t = (e = (0, c.normalizeEnum)(e)) === "pan" || e === "both";
      var n = e === "zoom" || e === "both";
      return {
        pan: t,
        zoom: n,
        none: !t && !n
      };
    }
    var t = a.call(this, "zoomAndPan");
    return {
      valueAxis: e(t.valueAxis),
      argumentAxis: e(t.argumentAxis),
      dragToZoom: !!t.dragToZoom,
      dragBoxStyle: {
        class: "dxc-shutter",
        fill: t.dragBoxStyle.color,
        opacity: t.dragBoxStyle.opacity
      },
      panKey: t.panKey,
      allowMouseWheel: !!t.allowMouseWheel,
      allowTouchGestures: !!t.allowTouchGestures
    };
  }
}, {
  _themeSection: "chart",
  ctor: function (e) {
    var t = this;
    t.callBase.apply(t, arguments);
    var n = e.options || {};
    t._userOptions = n;
    t._mergeAxisTitleOptions = [];
    t._multiPieColors = {};
    t._callback = s.noop;
  },
  dispose: function () {
    var e = this;
    if (e.palette) {
      e.palette.dispose();
    }
    e.palette = e._userOptions = e._mergedSettings = e._multiPieColors = null;
    return e.callBase.apply(e, arguments);
  },
  resetPalette: function () {
    this.palette.reset();
    this._multiPieColors = {};
  },
  getOptions: function (e) {
    return (r[e] || r.base).apply(this, arguments);
  },
  refresh: function () {
    this._mergedSettings = {};
    return this.callBase.apply(this, arguments);
  },
  _initializeTheme: function () {
    var e = this;
    e.callBase.apply(e, arguments);
    e.updatePalette();
  },
  resetOptions: function (e) {
    this._mergedSettings[e] = null;
  },
  update: function (e) {
    this._userOptions = e;
  },
  updatePalette: function () {
    this.palette = this.createPalette(this.getOptions("palette"), {
      useHighlight: true,
      extensionMode: this.getOptions("paletteExtensionMode")
    });
  }
}));
exports.ThemeManager = h;