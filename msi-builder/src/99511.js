exports.default = undefined;
var i = require("./58664.js");
var o = require("./20576.js");
var a = require("./13306.js");
var r = require("./58201.js");
var s = require("./95479.js");
var l = S(require("./99393.js"));
var u = require("./34434.js");
var d = require("./19157.js");
var c = require("./35922.js");
var h = require("./60810.js");
var f = require("./33224.js");
var p = S(require("./42597.js"));
var g = require("./42602.js");
var m = require("./97882.js");
var _ = require("./97574.js");
var v = S(require("./63407.js"));
var y = require("./21495.js");
var b = require("./21177.js");
var x = S(require("./70714.js"));
var w = S(require("./59345.js"));
var C = require("./77129.js");
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var k = [{
  name: "default",
  border: {}
}];
var D = Array.isArray;
function I(e, t, n) {
  var i = e.getOptions().grid;
  var o = e.getOptions().minorGrid;
  i.visible = t;
  if (o) {
    o.visible = n;
  }
}
function T(e, t) {
  return e.priority - t.priority;
}
function E(e, t) {
  var n = false;
  (0, s.each)(e, function (e, i) {
    if (i.name === t) {
      n = true;
      return false;
    }
  });
  return n;
}
function O(e, t, n, i) {
  var o = t[e] || 0;
  var a = n[e] || 0;
  return o + a + (o && a ? i : 0);
}
function A(e, t, n) {
  return P(t[e], n[e]);
}
function P(e, t) {
  return Math.max(e || 0, t || 0);
}
function M(e) {
  return e.getMargins();
}
function R(e, t) {
  return e.reduce(function (e, n) {
    var i;
    var o = t(n);
    var a = e.panes[n.pane] = e.panes[n.pane] || {};
    var r = n.getMultipleAxesSpacing();
    a.top = O("top", a, o, r);
    a.bottom = O("bottom", a, o, r);
    a.left = A("left", a, o);
    a.right = A("right", a, o);
    e.top = A("top", a, e);
    e.bottom = A("bottom", a, e);
    e.left = A("left", a, e);
    e.right = A("right", a, e);
    var s = (i = n.getOrthogonalAxis) === null || i === undefined ? undefined : i.call(n);
    if (!!s && !!s.customPositionIsAvailable() && (!n.customPositionIsBoundaryOrthogonalAxis() || !s.customPositionEqualsToPredefined())) {
      e[s.getResolvedBoundaryPosition()] = 0;
    }
    return e;
  }, {
    panes: {}
  });
}
function B(e) {
  return e.reduce(function (e, t) {
    var n = t.getMargins();
    var i = e.panes[t.pane] = e.panes[t.pane] || {};
    var o = t.getMultipleAxesSpacing();
    i.top = A("top", i, n);
    i.bottom = A("bottom", i, n);
    i.left = O("left", i, n, o);
    i.right = O("right", i, n, o);
    e.top = A("top", i, e);
    e.bottom = A("bottom", i, e);
    e.left = A("left", i, e);
    e.right = A("right", i, e);
    return e;
  }, {
    panes: {}
  });
}
function L(e, t, n, i, o) {
  e.forEach(function (e) {
    e[t](n && n[e.pane], i && i[e.pane] || i, o);
  });
}
function V(e, t, n, i, o) {
  function a(t, n, i) {
    return ((e ? ["left", "right"] : ["top", "bottom"]).indexOf(t) === -1 ? n : n.panes[i] || {})[t];
  }
  function r(e, t, n, i) {
    return P(a(e, t, i), a(e, n, i));
  }
  function s(e) {
    return `original${e[0].toUpperCase()}${e.slice(1)}`;
  }
  function l(e, t, a, l, u, c) {
    (t = t.sort(function (t, n) {
      return e[n][l] - e[t][l];
    })).forEach(function (t) {
      var n = e[t];
      c.forEach(function (e) {
        n[e] = n[s(e)] + r(e, i, o, t);
      });
    });
    var h = e[t[0]];
    var f = t.reduce(function (e, t) {
      return e -= r(l, i, o, t) + r(u, i, o, t);
    }, h[a] - h[s(u)] - e[t[t.length - 1]][s(l)]) - d.PANE_PADDING * (t.length - 1);
    f -= Object.keys(n).reduce(function (e, t) {
      return e + ((0, d.isRelativeHeightPane)(n[t]) ? 0 : n[t].height);
    }, 0);
    t.reduce(function (t, s) {
      var c = e[s];
      var p = n[s];
      t -= r(u, i, o, s);
      c[u] = h[a] - t;
      t -= (0, d.isRelativeHeightPane)(p) ? Math.floor(f * p.height) : p.height;
      c[l] = t;
      return t -= r(l, i, o, s) + d.PANE_PADDING;
    }, h[a] - h[s(u)] - (f < 0 ? f : 0));
  }
  var u = Object.keys(t);
  if (e) {
    l(t, u, "width", "left", "right", ["top", "bottom"]);
  } else {
    l(t, u, "height", "top", "bottom", ["left", "right"]);
  }
  return t;
}
function F(e, t, n, i) {
  if (t) {
    L(e, "createTicks", n);
    p.default.synchronize(e);
  }
  L(e, "draw", !t && n, i);
}
function H(e, t) {
  var n = {};
  return function (i) {
    if (!i.customPositionIsAvailable() || i.customPositionEqualsToPredefined()) {
      var o = n[i.pane] = n[i.pane] || {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      };
      var a = i.getMultipleAxesSpacing();
      var r = i.getMargins();
      i.shift(o);
      o[e] = O(e, o, r, a);
      o[t] = O(t, o, r, a);
    } else {
      i.shift({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      });
    }
  };
}
function N(e, t) {
  var n;
  var i;
  var o = 0;
  for (n in t.panes) {
    i = t.panes[n];
    o += e === "height" ? i.top + i.bottom : i.left + i.right;
  }
  return o;
}
function z(e, t, n, i) {
  var o = 0;
  if (e[t] > 0) {
    o = N(t, i(n, M));
    L(n, "hideTitle");
    e[t] -= o - N(t, i(n, M));
  }
  if (e[t] > 0) {
    L(n, "hideOuterElements");
  }
}
function j(e, t, n) {
  var i = t.x - n <= e.x;
  var o = t.x + n >= e.x;
  var a = t.y - n <= e.y;
  var r = t.y + n >= e.y;
  return i && o && a && r;
}
function W(e, t, n) {
  var i = e.getOptions().size / 2;
  for (var o = 0; o < t.length; o++) {
    if (!n) {
      var a = t[o].x === e.x;
      var r = t[o].y === e.y;
      if (a && r) {
        continue;
      }
    }
    if (j(e, t[o], i)) {
      return true;
    }
  }
  return false;
}
var G = g.AdvancedChart.inherit({
  _themeSection: "chart",
  _fontFields: ["crosshair.label.font"],
  _initCore: function () {
    this.paneAxis = {};
    this.callBase();
  },
  _init: function () {
    this._containerInitialHeight = (0, r.hasWindow)() ? (0, i.getHeight)(this._$element) : 0;
    this.callBase();
  },
  _correctAxes: function () {
    this._correctValueAxes(true);
  },
  _setDeprecatedOptions: function () {
    this.callBase();
    (0, a.extend)(this._deprecatedOptions, {
      "argumentAxis.aggregateByCategory": {
        since: "23.1",
        message: "Use the aggregation.enabled property"
      }
    });
  },
  _getExtraOptions: o.noop,
  _createPanes: function () {
    var e;
    var t = this.option("panes");
    var n = 0;
    if (!t || D(t) && !t.length) {
      t = k;
    }
    this.callBase();
    e = this.option("defaultPane");
    t = (0, a.extend)(true, [], D(t) ? t : [t]);
    (0, s.each)(t, function (e, t) {
      t.name = (0, c.isDefined)(t.name) ? t.name : "default" + n++;
    });
    if ((0, c.isDefined)(e)) {
      if (!E(t, e)) {
        this._incidentOccurred("W2101", [e]);
        e = t[t.length - 1].name;
      }
    } else {
      e = t[t.length - 1].name;
    }
    this.defaultPane = e;
    return t = this._isRotated() ? t.reverse() : t;
  },
  _getAxisRenderingOptions: function () {
    return {
      axisType: "xyAxes",
      drawingType: "linear"
    };
  },
  _prepareAxisOptions: function (e, t, n) {
    return {
      isHorizontal: e === "argumentAxis" !== n,
      containerColor: this._themeManager.getOptions("containerBackgroundColor")
    };
  },
  _checkPaneName: function (e) {
    var t = (0, d.map)(this.panes, function (e) {
      return e.name;
    });
    e.pane = e.pane || this.defaultPane;
    return t.includes(e.pane);
  },
  _initCustomPositioningAxes: function () {
    var e = this;
    var t = e.getArgumentAxis();
    var n = t.getOptions().customPositionAxis;
    var i = e._valueAxes.filter(function (e) {
      return e.pane === t.pane && (!n || n === e.name);
    })[0];
    e._valueAxes.forEach(function (e) {
      if (t !== e.getOrthogonalAxis()) {
        e.getOrthogonalAxis = function () {
          return t;
        };
        e.customPositionIsBoundaryOrthogonalAxis = function () {
          return t.customPositionIsBoundary();
        };
      }
    });
    if ((0, c.isDefined)(i) && i !== t.getOrthogonalAxis()) {
      t.getOrthogonalAxis = function () {
        return i;
      };
      t.customPositionIsBoundaryOrthogonalAxis = function () {
        return e._valueAxes.some(function (e) {
          return e.customPositionIsBoundary();
        });
      };
    } else if ((0, c.isDefined)(t.getOrthogonalAxis()) && !(0, c.isDefined)(i)) {
      t.getOrthogonalAxis = o.noop;
    }
  },
  _getAllAxes: function () {
    return this._argumentAxes.concat(this._valueAxes);
  },
  _resetAxesAnimation: function (e, t) {
    ((0, c.isDefined)(t) ? t ^ this._isRotated() ? this._argumentAxes : this._valueAxes : this._getAllAxes()).forEach(function (t) {
      t.resetApplyingAnimation(e);
    });
  },
  _axesBoundaryPositioning: function () {
    var e = this._getAllAxes();
    var t = false;
    e.forEach(function (e) {
      if (!e.customPositionIsAvailable()) {
        return false;
      }
      var n = e.customPositionIsBoundary();
      e._customBoundaryPosition = e.getCustomBoundaryPosition();
      t |= n !== e.customPositionIsBoundary();
    });
    return t;
  },
  _getCrosshairMargins: function () {
    var e = this._getCrosshairOptions() || {};
    var t = e.enabled;
    var n = (0, _.getMargins)();
    var i = (0, a.extend)(true, {}, e.label, e.horizontalLine.label);
    var o = (0, a.extend)(true, {}, e.label, e.verticalLine.label);
    return {
      x: t && e.horizontalLine.visible && i.visible ? n.x : 0,
      y: t && e.verticalLine.visible && o.visible ? n.y : 0
    };
  },
  _getValueAxis: function (e, t) {
    var n;
    var i;
    var o = this._valueAxes;
    var a = this.option("valueAxis") || {};
    var r = D(a) ? a : [a];
    var s = this._isRotated();
    var l = this._getCrosshairMargins();
    if (!(i = function e(t, n, i) {
      var o;
      var a;
      for (a = 0; a < i.length; a++) {
        if ((o = i[a]).name === n && o.pane === t) {
          return o;
        }
      }
      if (t) {
        return e(undefined, n, i);
      }
    }(e, t = t || function (e, t, n) {
      var i;
      for (var o = 0; o < e.length; o++) {
        if (e[o].pane === t || e[o].pane === undefined && t === n) {
          i = e[o].name;
          break;
        }
      }
      i ||= e[0].name;
      return i;
    }(o, e, this.defaultPane), o))) {
      if (!(n = function (e, t, n) {
        var i;
        var o;
        for (o = 0; o < t.length; o++) {
          if (t[o].name === n) {
            (i = t[o]).priority = o;
            break;
          }
        }
        if (!i) {
          for (o = 0; o < e.length; o++) {
            if (e[o].name === n) {
              (i = e[o].getOptions()).priority = e[o].priority;
              break;
            }
          }
        }
        return i;
      }(o, r, t))) {
        this._incidentOccurred("W2102", [t]);
        n = {
          name: t,
          priority: o.length
        };
      }
      (i = this._createAxis(false, this._populateAxesOptions("valueAxis", n, {
        pane: e,
        name: t,
        optionPath: D(a) ? `valueAxis[${n.priority}]` : "valueAxis",
        crosshairMargin: s ? l.y : l.x
      }, s))).applyVisualRangeSetter(this._getVisualRangeSetter());
      o.push(i);
    }
    i.setPane(e);
    return i;
  },
  _correctValueAxes: function (e) {
    var t = this;
    var n = t._themeManager.getOptions("synchronizeMultiAxes");
    var i = t._valueAxes;
    var o = {};
    t.series.forEach(function (e) {
      var t = e.getValueAxis();
      o[t.pane] = true;
    });
    t.panes.forEach(function (a) {
      var r;
      var s;
      var l;
      var u;
      var d;
      var c = a.name;
      if (!o[c]) {
        t._getValueAxis(c);
      }
      if (e && n) {
        r = i.filter(function (e) {
          return e.pane === c;
        });
        s = false;
        l = [];
        u = r.some(function (e) {
          var t = e.getOptions().minorGrid;
          return t && t.visible;
        });
        d = r.some(function (e) {
          var t = e.getOptions().grid;
          return t && t.visible;
        });
        if (r.length > 1) {
          r.forEach(function (e) {
            var t = e.getOptions().grid;
            if (s) {
              I(e, false, false);
            } else if (t && t.visible) {
              if (e.getTranslator().getBusinessRange().isEmpty()) {
                I(e, false, false);
                l.push(e);
              } else {
                s = true;
                I(e, d, u);
              }
            }
          });
          if (!s && l.length) {
            I(l[0], d, u);
          }
        }
      }
    });
    t._valueAxes = i.filter(function (e) {
      if (!e.pane) {
        e.setPane(t.defaultPane);
      }
      var n = E(t.panes, e.pane);
      if (!n) {
        e.dispose();
        e = null;
      }
      return n;
    }).sort(T);
    var a = this.getValueAxis();
    t._valueAxes.forEach(function (e) {
      var n = e.getOptions().optionPath;
      if (n) {
        var i = t._valueAxes.filter(function (e) {
          return e.getOptions().optionPath === n;
        });
        if (i.length > 1) {
          if (i.some(function (e) {
            return e === a;
          })) {
            i.forEach(function (e) {
              if (e !== a) {
                e.getOptions().optionPath = null;
              }
            });
          } else {
            i.forEach(function (e, t) {
              if (t !== 0) {
                e.getOptions().optionPath = null;
              }
            });
          }
        }
      }
    });
  },
  _getSeriesForPane: function (e) {
    var t = [];
    (0, s.each)(this.series, function (n, i) {
      if (i.pane === e) {
        t.push(i);
      }
    });
    return t;
  },
  _createPanesBorderOptions: function () {
    var e = this._themeManager.getOptions("commonPaneSettings").border;
    var t = {};
    this.panes.forEach(function (n) {
      return t[n.name] = (0, a.extend)(true, {}, e, n.border);
    });
    return t;
  },
  _createScrollBar: function () {
    var e = this._themeManager.getOptions("scrollBar") || {};
    var t = this._scrollBarGroup;
    if (e.visible) {
      e.rotated = this._isRotated();
      this._scrollBar = (this._scrollBar || new m.ScrollBar(this._renderer, t)).update(e);
    } else {
      t.linkRemove();
      if (this._scrollBar) {
        this._scrollBar.dispose();
      }
      this._scrollBar = null;
    }
  },
  _executeAppendAfterSeries: function (e) {
    e();
  },
  _prepareToRender: function (e) {
    var t = this._createPanesBorderOptions();
    this._createPanesBackground();
    this._appendAxesGroups();
    this._adjustViewport();
    return t;
  },
  _adjustViewport: function () {
    if (this._themeManager.getOptions("adjustOnZoom")) {
      this._valueAxes.forEach(function (e) {
        return e.adjust();
      });
    }
  },
  _recreateSizeDependentObjects: function (e) {
    var t = this;
    var n = t._getVisibleSeries();
    var i = n.some(function (e) {
      return e.useAggregation();
    });
    var o = t._isZooming();
    if (i) {
      t._argumentAxes.forEach(function (e) {
        e.updateCanvas(t._canvas, true);
      });
      n.forEach(function (t) {
        if (t.useAggregation() && (e || o || !t._useAllAggregatedPoints)) {
          t.createPoints();
        }
      });
      t._processSeriesFamilies();
    }
  },
  _isZooming: function () {
    var e = this.getArgumentAxis();
    if (!e || !e.getTranslator()) {
      return false;
    }
    var t = e.getTranslator().getBusinessRange();
    var n = e.getViewport();
    var i = n ? n.min : 0;
    var o = n ? n.max : 0;
    if (t.axisType === "logarithmic") {
      i = (0, d.getLog)(i, t.base);
      o = (0, d.getLog)(o, t.base);
    }
    var a = t.axisType === "discrete" ? (0, d.getCategoriesInfo)(t.categories, i, o).categories.length : Math.abs(o - i);
    var r = (0, h.getPrecision)(a);
    r = r > 1 ? Math.pow(10, r - 2) : 1;
    var s = Math.round((this._zoomLength - a) * r) / r != 0;
    this._zoomLength = a;
    return s;
  },
  _handleSeriesDataUpdated: function () {
    var e = this;
    var t = new b.Range();
    e.series.forEach(function (e) {
      t.addRange(e.getArgumentRange());
    });
    e._argumentAxes.forEach(function (n) {
      n.updateCanvas(e._canvas, true);
      n.setBusinessRange(t, e._axesReinitialized);
    });
    e.callBase();
  },
  _isLegendInside: function () {
    return this._legend && this._legend.getPosition() === "inside";
  },
  _isRotated: function () {
    return this._themeManager.getOptions("rotated");
  },
  _getLayoutTargets: function () {
    return this.panes;
  },
  _applyClipRects: function (e) {
    this._drawPanesBorders(e);
    this._createClipRectsForPanes();
    this._applyClipRectsForAxes();
    this._fillPanesBackground();
  },
  _updateLegendPosition: function (e, t) {
    if (e.drawLegend && this._legend && t) {
      var n = this.panes;
      var i = (0, a.extend)({}, n[0].canvas);
      var o = new y.LayoutManager();
      i.right = n[n.length - 1].canvas.right;
      i.bottom = n[n.length - 1].canvas.bottom;
      o.layoutInsideLegend(this._legend, i);
    }
  },
  _allowLegendInsidePosition: function () {
    return true;
  },
  _applyExtraSettings: function (e) {
    var t = this._getPaneIndex(e.pane);
    var n = this._panesClipRects;
    var i = n.wide[t];
    e.setClippingParams(n.base[t].id, i && i.id, this._getPaneBorderVisibility(t));
  },
  _updatePanesCanvases: function (e) {
    if (e.recreateCanvas) {
      (0, d.updatePanesCanvases)(this.panes, this._canvas, this._isRotated());
    }
  },
  _normalizePanesHeight: function () {
    (0, d.normalizePanesHeight)(this.panes);
  },
  _renderScaleBreaks: function () {
    this._valueAxes.concat(this._argumentAxes).forEach(function (e) {
      e.drawScaleBreaks();
    });
  },
  _getArgFilter: function () {
    return v.default.getViewPortFilter(this.getArgumentAxis().visualRange() || {});
  },
  _hidePointsForSingleSeriesIfNeeded: function (e) {
    for (var t = e.getPoints(), n = 0, i = 0; i < t.length; i++) {
      var o = t[i];
      var a = t.slice(i + 1);
      if ((n += W(o, a)) > t.length / 2) {
        e.autoHidePointMarkers = true;
        break;
      }
    }
  },
  _applyAutoHidePointMarkers: function (e) {
    var t = [];
    for (var n = e.length - 1; n >= 0; n--) {
      var i = e[n];
      if (i.autoHidePointMarkersEnabled() && (i.autoHidePointMarkers = false, this._hidePointsForSingleSeriesIfNeeded(i), !i.autoHidePointMarkers)) {
        var o = i.getPoints();
        if (o.reduce(function (e, n) {
          return e + W(n, t, true);
        }, 0) < o.length) {
          t = t.concat(o);
        } else {
          i.autoHidePointMarkers = true;
        }
      }
    }
  },
  _applyPointMarkersAutoHiding: function () {
    var e = this;
    var t = e.series;
    if (e._themeManager.getOptions("autoHidePointMarkers")) {
      e.panes.forEach(function (n) {
        var i = n.borderCoords;
        var o = n.name;
        var r = t.filter(function (e) {
          return e.pane === o && e.usePointsToDefineAutoHiding();
        });
        r.forEach(function (e) {
          e.prepareCoordinatesForPoints();
        });
        var s = e.getArgumentAxis();
        var l = function (e, t, n) {
          var i = [];
          var o = {};
          var r = n.visualRange();
          var s = n.getTranslator();
          var l = v.default.getViewPortFilter(r || {});
          t.forEach(function (n) {
            var r = n.getValueAxis();
            var u = r.getCanvasRange();
            var d = r.getTranslator();
            var c = e.indexOf(n);
            var h = v.default.getViewPortFilter(u || {});
            o[c] = {};
            t.forEach(function (t) {
              return o[c][e.indexOf(t)] = 0;
            });
            var f = [];
            n.getPoints().filter(function (e) {
              return e.getOptions().visible && l(e.argument) && (h(e.getMinValue(true)) || h(e.getMaxValue(true)));
            }).forEach(function (e) {
              var t = {
                seriesIndex: c,
                argument: e.argument,
                value: e.getMaxValue(true),
                size: e.bubbleSize || e.getOptions().size
              };
              if (e.getMinValue(true) !== e.getMaxValue(true)) {
                var n = (0, a.extend)({}, t);
                n.value = e.getMinValue(true);
                n.x = s.to(n.argument, 1);
                n.y = d.to(n.value, 1);
                f.push(n);
              }
              t.x = s.to(t.argument, 1);
              t.y = d.to(t.value, 1);
              f.push(t);
            });
            o[c].pointsCount = f.length;
            o[c].total = 0;
            o[c].continuousSeries = 0;
            i.push({
              name: n.name,
              index: c,
              points: f
            });
          });
          return {
            series: i,
            overloadedSeries: o
          };
        }(t, r, s);
        (function (e, t, n) {
          var i = e.width * e.height;
          var o = t.series;
          var a = function (e) {
            var a = n.filter(function (t) {
              return t.name === o[e].name;
            })[0];
            var r = o[e].points;
            var s = r.length ? r[0].size : 0;
            var l = s * s * r.length;
            if (a.autoHidePointMarkersEnabled() && l >= i / o.length) {
              var u = o[e].index;
              a.autoHidePointMarkers = true;
              o.splice(e, 1);
              n.splice(n.indexOf(a), 1);
              delete t.overloadedSeries[u];
            }
          };
          for (var r = o.length - 1; r >= 0; r--) {
            a(r);
          }
        })(i, l, r);
        if (l.series.length) {
          var u = s.visualRange();
          var d = s.getOptions().type === "discrete" ? function (e, t) {
            return u.categories.indexOf(e.argument) - u.categories.indexOf(t.argument);
          } : function (e, t) {
            return e.argument - t.argument;
          };
          var h = [];
          l.series.forEach(function (e) {
            return h = h.concat(e.points);
          });
          h.sort(d);
          (function (e, t) {
            var n = false;
            for (var i = 0; i < e.length - 1; i++) {
              var o = e[i];
              var a = o.size;
              if ((0, c.isDefined)(o.x) && (0, c.isDefined)(o.y)) {
                for (var r = i + 1; r < e.length; r++) {
                  var s = e[r];
                  var l = s == null ? undefined : s.x;
                  var u = s == null ? undefined : s.y;
                  if (!(0, c.isDefined)(l) || Math.abs(o.x - l) >= a) {
                    n &= r !== i + 1;
                    break;
                  }
                  var d = (0, c.isDefined)(l) && (0, c.isDefined)(u) && Math.sqrt(Math.pow(o.x - l, 2) + Math.pow(o.y - u, 2));
                  if (d && d < a) {
                    t[o.seriesIndex][s.seriesIndex]++;
                    t[o.seriesIndex].total++;
                    if (!n) {
                      t[o.seriesIndex].continuousSeries++;
                      n = true;
                    }
                  }
                }
              }
            }
          })(h, l.overloadedSeries);
          e._applyAutoHidePointMarkers(r);
        }
      });
    } else {
      t.forEach(function (e) {
        return e.autoHidePointMarkers = false;
      });
    }
  },
  _renderAxes: function (e, t) {
    function n(e) {
      return e.map(function (e) {
        if (!e.getTitle) {
          return 0;
        }
        var t = e.getTitle();
        if (t) {
          return t.bBox.width;
        } else {
          return 0;
        }
      });
    }
    var i = this;
    var o = i._isRotated();
    var r = i._themeManager.getOptions("synchronizeMultiAxes");
    var s = i._scrollBar ? [i._scrollBar] : [];
    var l = i._isArgumentAxisBeforeScrollBar() ? i._argumentAxes.concat(s) : s.concat(i._argumentAxes);
    var u = o ? i._argumentAxes : i._valueAxes;
    var d = o ? l : i._valueAxes;
    var c = o ? i._valueAxes : i._argumentAxes;
    var h = o ? i._valueAxes : l;
    var f = u.concat(c);
    var p = f.concat(s);
    var g = u.some(function (e) {
      return e.isFirstDrawing();
    });
    i._normalizePanesHeight();
    i._updatePanesCanvases(e);
    var m = i.panes.reduce(function (e, t) {
      e[t.name] = (0, a.extend)({}, t.canvas);
      return e;
    }, {});
    var _ = i.panes.reduce(function (e, t) {
      e[t.name] = {
        height: t.height,
        unit: t.unit
      };
      return e;
    }, {});
    var v = (0, a.extend)(true, {}, m);
    i._initCustomPositioningAxes();
    var y = i._axesBoundaryPositioning();
    if (!e.adjustAxes && !y) {
      F(u, !o && r, m, t);
      F(c, o && r, m, t);
      L(f, "prepareAnimation");
      i._renderScaleBreaks();
      c.forEach(function (e) {
        return e.resolveOverlappingForCustomPositioning(u);
      });
      u.forEach(function (e) {
        return e.resolveOverlappingForCustomPositioning(c);
      });
      return false;
    }
    if (y) {
      f.forEach(function (e) {
        return e.customPositionIsAvailable() && e.shift({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        });
      });
    }
    if (i._scrollBar) {
      i._scrollBar.setPane(i.panes);
    }
    var b = {
      panes: {}
    };
    var x = R(h, function (e) {
      return e.estimateMargins(m[e.pane]);
    });
    m = V(o, m, _, b, x);
    function w(e) {
      F(e ? c : u, (e ? o : !o) && r, m, t);
      if (e) {
        x = R(h, M);
      } else {
        b = B(d);
      }
      m = V(o, m, _, b, x);
    }
    w(false);
    w(true);
    if (!i._changesApplying && i._estimateTickIntervals(u, m)) {
      w(false);
    }
    var C = n(u);
    var S = i._getVisibleSeries();
    var k = function (e, t) {
      var n = t.reduce(function (e, t) {
        return e + t;
      }, 0) / t.length;
      return e.animate && n <= e.animationPointsLimit;
    }(e, i._getPointsToAnimation(S));
    L(p, "updateSize", m, k);
    h.forEach(H("top", "bottom"));
    d.forEach(H("left", "right"));
    i._renderScaleBreaks();
    i.panes.forEach(function (e) {
      (0, a.extend)(e.canvas, m[e.name]);
    });
    i._valueAxes.forEach(function (e) {
      e.setInitRange();
    });
    u.forEach(function (e, t) {
      var a;
      if ((a = e.hasWrap) !== null && a !== undefined && a.call(e)) {
        var r = e.getTitle();
        var s = (r ? r.bBox.width : 0) - C[t];
        if (e.getOptions().position === "right") {
          b.right += s;
        } else {
          b.left += s;
          i.panes.forEach(function (e) {
            var t = e.name;
            return b.panes[t].left += s;
          });
        }
        m = V(o, m, _, b, x);
        L(p, "updateSize", m, false, false);
        C = n(u);
      }
    });
    if (u.some(function (e) {
      return e.customPositionIsAvailable() && e.getCustomPosition() !== e._axisPosition;
    })) {
      if (k) {
        i._resetAxesAnimation(g, false);
      }
      L(u, "updateSize", m, k);
    }
    c.forEach(function (e) {
      return e.resolveOverlappingForCustomPositioning(u);
    });
    u.forEach(function (e) {
      return e.resolveOverlappingForCustomPositioning(c);
    });
    return v;
  },
  _getExtraTemplatesItems: function () {
    var e = (this._argumentAxes || []).concat(this._valueAxes || []);
    var t = this._collectTemplatesFromItems(e);
    return {
      items: t.items,
      groups: t.groups,
      launchRequest: function () {
        e.forEach(function (e) {
          e.setRenderedState(true);
        });
      },
      doneRequest: function () {
        e.forEach(function (e) {
          e.setRenderedState(false);
        });
      }
    };
  },
  _estimateTickIntervals: function (e, t) {
    return e.some(function (e) {
      return e.estimateTickInterval(t[e.pane]);
    });
  },
  checkForMoreSpaceForPanesCanvas: function () {
    var e = this._isRotated();
    var t = false;
    if (this.panes.filter(function (e) {
      return e.unit;
    }).length === this.panes.length) {
      var n = 0;
      var i = 0;
      if (e) {
        var o = this.getArgumentAxis().getMargins().right;
        var a = Math.min.apply(Math, this.panes.map(function (e) {
          return e.canvas.right;
        }));
        n = this._canvas.right + o - a;
      } else {
        var r = this.getArgumentAxis().getMargins().bottom;
        var s = Math.min.apply(Math, this.panes.map(function (e) {
          return e.canvas.bottom;
        }));
        i = this._canvas.bottom + r - s;
      }
      t = (n > 0 || i > 0) && {
        width: n,
        height: i
      };
      if (i !== 0) {
        var l = this.getSize();
        var u = this.option("size");
        var d = this._$element[0];
        var c = !!parseInt(d.style.height) || this._containerInitialHeight !== 0;
        if (!e && (!u || !u.height) && !c) {
          this._forceResize(l.width, l.height + i);
          t = false;
        }
      }
    } else {
      t = this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), e, function (t) {
        return {
          width: e && !!t.unit,
          height: !e && !!t.unit
        };
      });
    }
    return t;
  },
  _forceResize: function (e, t) {
    this._renderer.resize(e, t);
    this._updateSize();
    this._setContentSize();
    this._preserveOriginalCanvas();
    this._updateCanvasClipRect(this._canvas);
  },
  _shrinkAxes: function (e, t) {
    if (e && t) {
      this._renderer.stopAllAnimations(true);
      var n = this._isRotated();
      var i = this._scrollBar ? [this._scrollBar] : [];
      var o = this._isArgumentAxisBeforeScrollBar() ? this._argumentAxes.concat(i) : i.concat(this._argumentAxes);
      var r = n ? o : this._valueAxes;
      var s = n ? this._valueAxes : o;
      var l = r.concat(s);
      if (e.width || e.height) {
        z(e, "height", s, R);
        z(e, "width", r, B);
        L(l, "updateSize", t);
        var u = this.panes.reduce(function (e, t) {
          e[t.name] = {
            height: t.height,
            unit: t.unit
          };
          return e;
        }, {});
        L(l, "updateSize", t = V(n, t, u, B(r), R(s, M)));
        s.forEach(H("top", "bottom"));
        r.forEach(H("left", "right"));
        this.panes.forEach(function (e) {
          return (0, a.extend)(e.canvas, t[e.name]);
        });
      }
    }
  },
  _isArgumentAxisBeforeScrollBar: function () {
    var e = this.getArgumentAxis();
    if (this._scrollBar) {
      var n = e.getResolvedBoundaryPosition();
      var i = e.getOptions().label?.position;
      var o = this._scrollBar.getOptions().position;
      return e.hasNonBoundaryPosition() || o === n && i !== o;
    }
    return false;
  },
  _getPanesParameters: function () {
    var e;
    var t = this.panes;
    var n = [];
    for (e = 0; e < t.length; e++) {
      if (this._getPaneBorderVisibility(e)) {
        n.push({
          coords: t[e].borderCoords,
          clipRect: this._panesClipRects.fixed[e]
        });
      }
    }
    return n;
  },
  _createCrosshairCursor: function () {
    var e = this._themeManager.getOptions("crosshair") || {};
    var t = this.getArgumentAxis();
    var n = this._isRotated() ? [this._valueAxes, [t]] : [[t], this._valueAxes];
    var i = {
      canvas: this._getCommonCanvas(),
      panes: this._getPanesParameters(),
      axes: n
    };
    if (e && e.enabled) {
      if (this._crosshair) {
        this._crosshair.update(e, i);
      } else {
        this._crosshair = new _.Crosshair(this._renderer, e, i, this._crosshairCursorGroup);
      }
      this._crosshair.render();
    }
  },
  _getCommonCanvas: function () {
    var e;
    var t;
    var n;
    var i = this.panes;
    for (e = 0; e < i.length; e++) {
      t = i[e].canvas;
      if (n) {
        n.right = t.right;
        n.bottom = t.bottom;
      } else {
        n = (0, a.extend)({}, t);
      }
    }
    return n;
  },
  _createPanesBackground: function () {
    var e;
    var t;
    var n;
    var i = this._themeManager.getOptions("commonPaneSettings").backgroundColor;
    var o = this._renderer;
    var a = [];
    this._panesBackgroundGroup.clear();
    n = 0;
    for (; n < this.panes.length; n++) {
      if ((e = this.panes[n].backgroundColor || i) && e !== "none") {
        t = o.rect(0, 0, 0, 0).attr({
          fill: (0, d.extractColor)(e),
          "stroke-width": 0
        }).append(this._panesBackgroundGroup);
        a.push(t);
      } else {
        a.push(null);
      }
    }
    this.panesBackground = a;
  },
  _fillPanesBackground: function () {
    var e;
    var t = this;
    (0, s.each)(t.panes, function (n, i) {
      e = i.borderCoords;
      if (t.panesBackground[n] !== null) {
        t.panesBackground[n].attr({
          x: e.left,
          y: e.top,
          width: e.width,
          height: e.height
        });
      }
    });
  },
  _calcPaneBorderCoords: function (e) {
    var t = e.canvas;
    var n = e.borderCoords = e.borderCoords || {};
    n.left = t.left;
    n.top = t.top;
    n.right = t.width - t.right;
    n.bottom = t.height - t.bottom;
    n.width = Math.max(n.right - n.left, 0);
    n.height = Math.max(n.bottom - n.top, 0);
  },
  _drawPanesBorders: function (e) {
    var t = this;
    var n = t._isRotated();
    t._panesBorderGroup.linkRemove().clear();
    (0, s.each)(t.panes, function (i, o) {
      var a = e[o.name];
      var r = {
        fill: "none",
        stroke: a.color,
        "stroke-opacity": a.opacity,
        "stroke-width": a.width,
        dashStyle: a.dashStyle,
        "stroke-linecap": "square"
      };
      t._calcPaneBorderCoords(o, n);
      if (a.visible) {
        var s = o.borderCoords;
        var l = (0, u.prepareSegmentRectPoints)(s.left, s.top, s.width, s.height, a);
        t._renderer.path(l.points, l.pathType).attr(r).append(t._panesBorderGroup);
      }
    });
    t._panesBorderGroup.linkAppend();
  },
  _createClipRect: function (e, t, n, i, o, a) {
    var r = e[t];
    if (r) {
      r.attr({
        x: n,
        y: i,
        width: o,
        height: a
      });
    } else {
      r = this._renderer.clipRect(n, i, o, a);
      e[t] = r;
    }
  },
  _createClipRectsForPanes: function () {
    var e = this;
    var t = e._canvas;
    (0, s.each)(e.panes, function (n, i) {
      var o = false;
      var a = i.borderCoords;
      var r = a.left;
      var l = a.top;
      var u = a.width;
      var d = a.height;
      var c = e._panesClipRects;
      e._createClipRect(c.fixed, n, r, l, u, d);
      e._createClipRect(c.base, n, r, l, u, d);
      (0, s.each)(e.series, function (e, t) {
        if (t.pane === i.name && (t.isFinancialSeries() || t.areErrorBarsVisible())) {
          o = true;
        }
      });
      if (o) {
        if (e._isRotated()) {
          l = 0;
          d = t.height;
        } else {
          r = 0;
          u = t.width;
        }
        e._createClipRect(c.wide, n, r, l, u, d);
      } else {
        c.wide[n] = null;
      }
    });
  },
  _applyClipRectsForAxes: function () {
    for (var e = this._getAllAxes(), t = this._getCanvasClipRectID(), n = 0; n < e.length; n++) {
      var i = this._getElementsClipRectID(e[n].pane);
      e[n].applyClipRects(i, t);
    }
  },
  _getPaneBorderVisibility: function (e) {
    var t = this._themeManager.getOptions("commonPaneSettings").border.visible;
    var n = (this.panes[e] || {}).border || {};
    if ("visible" in n) {
      return n.visible;
    } else {
      return t;
    }
  },
  _getCanvasForPane: function (e) {
    var t;
    var n = this.panes;
    var i = n.length;
    for (t = 0; t < i; t++) {
      if (n[t].name === e) {
        return n[t].canvas;
      }
    }
  },
  _getTrackerSettings: function () {
    var e = this._themeManager;
    return (0, a.extend)(this.callBase(), {
      chart: this,
      rotated: this._isRotated(),
      crosshair: this._getCrosshairOptions().enabled ? this._crosshair : null,
      stickyHovering: e.getOptions("stickyHovering")
    });
  },
  _resolveLabelOverlappingStack: function () {
    var e = this;
    var t = e._isRotated();
    var n = t ? function (e, t) {
      return {
        x: e.x - t,
        y: e.y
      };
    } : function (e, t) {
      return {
        x: e.x,
        y: e.y - t
      };
    };
    (0, s.each)(e._getStackPoints(), function (i, o) {
      (0, s.each)(o, function (i, o) {
        var a = o[0].series.getValueAxis().getOptions().inverted;
        f.overlapping.resolveLabelOverlappingInOneDirection(o, e._getCommonCanvas(), t, a, n, function (e, n) {
          var i = t ? 1 : 0;
          if (e.labels[0].getFigureCenter()[i] - n.labels[0].getFigureCenter()[i] == 0) {
            return (e.value() - n.value()) * (e.labels[0].getPoint().series.getValueAxis().getTranslator().isInverted() ? -1 : 1);
          } else {
            return 0;
          }
        });
      });
    });
  },
  _getStackPoints: function () {
    var e = {};
    var t = this._getVisibleSeries();
    (0, s.each)(t, function (t, n) {
      var i = n.getPoints();
      var o = n.getStackName() || null;
      (0, s.each)(i, function (t, n) {
        var i = n.argument;
        e[i] ||= {};
        e[i][o] ||= [];
        e[i][o].push(n);
      });
    });
    return e;
  },
  _getCrosshairOptions: function () {
    return this._getOption("crosshair");
  },
  zoomArgument: function (e, t) {
    if (this._initialized && ((0, c.isDefined)(e) || (0, c.isDefined)(t))) {
      this.getArgumentAxis().visualRange([e, t]);
    }
  },
  resetVisualRange: function () {
    var e = this;
    var t = e._argumentAxes;
    var n = e.getArgumentAxis();
    t.forEach(function (t) {
      t.resetVisualRange(n !== t);
      e._applyCustomVisualRangeOption(t);
    });
    e.callBase();
  },
  getVisibleArgumentBounds: function () {
    var e = this._argumentAxes[0].getTranslator().getBusinessRange();
    var t = e.axisType === "discrete";
    var n = e.categories;
    return {
      minVisible: t ? e.minVisible || n[0] : e.minVisible,
      maxVisible: t ? e.maxVisible || n[n.length - 1] : e.maxVisible
    };
  },
  _change_FULL_RENDER: function () {
    this.callBase();
    if (this._changes.has("VISUAL_RANGE")) {
      this._raiseZoomEndHandlers();
    }
  },
  _getAxesForScaling: function () {
    return [this.getArgumentAxis()].concat(this._valueAxes);
  },
  _applyVisualRangeByVirtualAxes: function (e, t) {
    if (e.isArgumentAxis) {
      if (e !== this.getArgumentAxis()) {
        return true;
      }
      this._argumentAxes.filter(function (t) {
        return t !== e;
      }).forEach(function (e) {
        return e.visualRange(t, {
          start: true,
          end: true
        });
      });
    }
    return false;
  },
  _raiseZoomEndHandlers: function () {
    this._argumentAxes.forEach(function (e) {
      return e.handleZoomEnd();
    });
    this.callBase();
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, a.extend)(this._optionsByReference, {
      "argumentAxis.visualRange": true
    });
  },
  option: function () {
    var e = this.callBase.apply(this, arguments);
    var t = this._options.silent("valueAxis");
    if ((0, c.type)(t) === "array") {
      for (var n = 0; n < t.length; n++) {
        var i = `valueAxis[${n}].visualRange`;
        this._optionsByReference[i] = true;
      }
    }
    return e;
  },
  _notifyVisualRange: function () {
    var e = this._argumentAxes[0];
    var t = (0, d.convertVisualRangeObject)(e.visualRange(), !D(this.option("argumentAxis.visualRange")));
    if (e.skipEventRising && (0, d.rangesAreEqual)(t, this.option("argumentAxis.visualRange"))) {
      e.skipEventRising = null;
    } else {
      this.option("argumentAxis.visualRange", t);
    }
    this.callBase();
  }
});
G.addPlugin(x.default);
G.addPlugin(w.default);
G.addPlugin(C.plugins.core);
G.addPlugin(C.plugins.chart);
(0, l.default)("dxChart", G);
var q = G;
exports.default = q;
module.exports = exports.default;
module.exports.default = exports.default;