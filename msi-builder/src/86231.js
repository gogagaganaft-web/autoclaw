exports.addCacheItem = function (e) {
  var t = ++k;
  e._cache = t;
  D[t] = e;
};
exports.currentTheme = O;
exports.getTheme = I;
exports.refreshTheme = function () {
  C(D, function () {
    this.refresh();
  });
  return this;
};
exports.registerTheme = A;
exports.registerThemeSchemeAlias = function (e, t) {
  x[e] = t;
};
exports.removeCacheItem = function (e) {
  delete D[e._cache];
};
var i = require("./13306.js");
var o = require("./95479.js");
var a = require("./19157.js");
var r = require("./75811.js");
var s = require("./35922.js");
var l = _(require("./8839.js"));
var u = _(require("./39726.js"));
var d = _(require("./17374.js"));
var c = _(require("./14870.js"));
var h = _(require("./83313.js"));
var f = _(require("./25257.js"));
var p = _(require("./84253.js"));
var g = _(require("./60350.js"));
var m = _(require("./11239.js"));
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v;
var y = {};
var b = {};
var x = {};
var w = i.extend;
var C = o.each;
var S = null;
var k = 0;
var D = {};
function I(e) {
  var t = (0, a.normalizeEnum)(e);
  return y[t] || y[b[t] || O()];
}
function T(e, t) {
  return b[e + "." + t] || x[e + "." + t] || b[e];
}
function E(e, t, n) {
  return T(e + t, n) || T(e, n);
}
function O(e, t) {
  if (!arguments.length) {
    return S || T((0, r.current)()) || v;
  }
  var n = (0, a.normalizeEnum)(t);
  S = (e && e.platform ? E((0, a.normalizeEnum)(e.platform), e.version, n) : T((0, a.normalizeEnum)(e), n)) || S;
  return this;
}
function A(e, t) {
  var n = (0, a.normalizeEnum)(e && e.name);
  if (n) {
    if (e.isDefault) {
      v = n;
    }
    (function (e, t) {
      var n = function (e, t) {
        var n = e.indexOf(t);
        if (n > 0) {
          return {
            name: e.substring(0, n),
            scheme: e.substring(n + 1)
          };
        } else {
          return null;
        }
      }(e, ".") || {
        name: e
      };
      var i = n.name;
      var o = n.scheme;
      if (o) {
        b[i] = b[i] || t;
        b[i + "." + o] = t;
      } else {
        b[i] = t;
      }
    })(n, n);
    y[n] = w(true, {}, I(t), function (e) {
      P((e = w(true, {
        loadingIndicator: {
          font: {}
        },
        export: {
          font: {}
        },
        legend: {
          font: {},
          border: {}
        },
        title: {
          font: {}
        },
        tooltip: {
          font: {}
        },
        "chart:common": {},
        "chart:common:axis": {
          grid: {},
          minorGrid: {},
          tick: {},
          minorTick: {},
          title: {
            font: {}
          },
          label: {
            font: {}
          }
        },
        "chart:common:annotation": {
          font: {},
          border: {}
        },
        chart: {
          commonSeriesSettings: {
            candlestick: {}
          }
        },
        pie: {},
        polar: {},
        gauge: {
          scale: {
            tick: {},
            minorTick: {},
            label: {
              font: {}
            }
          }
        },
        barGauge: {},
        funnel: {},
        sankey: {},
        map: {
          background: {}
        },
        treeMap: {
          tile: {
            selectionStyle: {
              border: {}
            }
          },
          group: {
            border: {},
            selectionStyle: {
              border: {}
            },
            label: {
              font: {}
            }
          }
        },
        rangeSelector: {
          scale: {
            tick: {},
            minorTick: {},
            label: {
              font: {}
            }
          },
          chart: {}
        },
        sparkline: {},
        bullet: {}
      }, e)).loadingIndicator, "backgroundColor", e);
      P(e.chart.commonSeriesSettings.candlestick, "innerColor", null, e.backgroundColor);
      P(e.map.background, "color", null, e.backgroundColor);
      P(e.title.font, "color", null, e.primaryTitleColor);
      M(e.title, "subtitle", null, e.title);
      P(e.legend.font, "color", null, e.secondaryTitleColor);
      P(e.legend.border, "color", null, e.gridColor);
      (function (e) {
        var t = e["chart:common:axis"];
        C([t.grid, t.minorGrid], function (t, n) {
          P(n, "color", null, e.gridColor);
        });
        C([t, t.tick, t.minorTick, t.label.font], function (t, n) {
          P(n, "color", null, e.axisColor);
        });
        P(t.title.font, "color", null, e.secondaryTitleColor);
        P(e.gauge.scale.label.font, "color", null, e.axisColor);
        P(e.gauge.scale.tick, "color", null, e.backgroundColor);
        P(e.gauge.scale.minorTick, "color", null, e.backgroundColor);
        P(e.rangeSelector.scale.label.font, "color", null, e.axisColor);
      })(e);
      C(["chart", "pie", "polar", "gauge", "barGauge", "map", "treeMap", "funnel", "rangeSelector", "sparkline", "bullet", "sankey"], function (t, n) {
        P(e[n], "redrawOnResize", e);
        P(e[n], "containerBackgroundColor", null, e.backgroundColor);
        M(e[n], "tooltip", e);
        M(e[n], "export", e);
      });
      C(["chart", "pie", "polar", "gauge", "barGauge", "map", "treeMap", "funnel", "rangeSelector", "sankey"], function (t, n) {
        M(e[n], "loadingIndicator", e);
        M(e[n], "legend", e);
        M(e[n], "title", e);
      });
      C(["chart", "pie", "polar"], function (t, n) {
        M(e, n, null, e["chart:common"]);
      });
      C(["chart", "polar"], function (t, n) {
        e[n] = e[n] || {};
        M(e[n], "commonAxisSettings", null, e["chart:common:axis"]);
      });
      C(["chart", "polar", "map", "pie"], function (t, n) {
        e[n] = e[n] || {};
        M(e[n], "commonAnnotationSettings", null, e["chart:common:annotation"]);
      });
      M(e.rangeSelector.chart, "commonSeriesSettings", e.chart);
      M(e.rangeSelector.chart, "dataPrepareSettings", e.chart);
      P(e.treeMap.group.border, "color", null, e.gridColor);
      P(e.treeMap.tile.selectionStyle.border, "color", null, e.primaryTitleColor);
      P(e.treeMap.group.selectionStyle.border, "color", null, e.primaryTitleColor);
      P(e.map.legend, "backgroundColor", e);
      (function (e) {
        var t = e.map;
        C(["area", "line", "marker"], function (e, n) {
          M(t, "layer:" + n, null, t.layer);
        });
        C(["dot", "bubble", "pie", "image"], function (e, n) {
          M(t, "layer:marker:" + n, null, t["layer:marker"]);
        });
      })(e);
      return e;
    }(e));
  }
}
function P(e, t, n, i) {
  var o = n ? n[t] : i;
  if (o !== undefined && e[t] === undefined) {
    e[t] = o;
  }
}
function M(e, t, n, i) {
  var o = n ? n[t] : i;
  if (o !== undefined) {
    e[t] = w(true, {}, o, e[t]);
  }
}
if ((0, s.isEmptyObject)(y) && (0, s.isEmptyObject)(b) && !v) {
  [].concat(l.default, u.default, d.default, c.default, h.default, f.default, p.default, g.default, m.default).forEach(function (e) {
    A(e.theme, e.baseThemeName);
  });
}