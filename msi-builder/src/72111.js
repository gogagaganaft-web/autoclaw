exports.default = undefined;
var i = g(require("./32410.js"));
var o = require("./19157.js");
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./95479.js");
var l = require("./21177.js");
var u = g(require("./99393.js"));
var d = require("./33224.js");
var c = require("./20576.js");
var h = require("./17953.js");
var f = require("./77129.js");
var p = require("./56672.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = i.default.states;
var _ = i.default.pieSeriesSpacing;
var v = m.normalMark;
var y = m.hoverMark;
var b = m.selectedMark;
var x = [m.resetItem, m.applyHover, m.applySelected, m.applySelected];
function w(e) {
  if ((0, r.isNumeric)(e)) {
    if (e > 1) {
      e = 1;
    } else if (e < 0) {
      e = 0;
    }
  } else {
    e = undefined;
  }
  return e;
}
var C = function () {
  function e(e, t) {
    return e.filter(function (e) {
      return e !== t;
    });
  }
  var t = [];
  var n = {};
  return {
    queue: function (i) {
      var o;
      var a = i.getSizeGroup();
      t = e(t, o = i).concat(o);
      clearTimeout(n[a]);
      n[a] = setTimeout(function () {
        (function (e, t) {
          var n = t.filter(function (t) {
            return t._isVisible() && t.getSizeGroup() === e;
          });
          var i = Math.min.apply(null, n.map(function (e) {
            return e.getSizeGroupLayout().radius;
          }));
          var o = n.filter(function (e) {
            return e.getSizeGroupLayout().radius === i;
          });
          n.forEach(function (e) {
            return e.render({
              force: true,
              sizeGroupLayout: o.length ? o[0].getSizeGroupLayout() : {}
            });
          });
        })(a, t);
      });
    },
    remove: function (i) {
      if (!(t = e(t, i)).length) {
        n = {};
      }
    }
  };
}();
var S = d.BaseChart.inherit({
  _themeSection: "pie",
  _layoutManagerOptions: function () {
    return (0, a.extend)(true, {}, this.callBase(), {
      piePercentage: w(this._themeManager.getOptions("diameter")),
      minPiePercentage: w(this._themeManager.getOptions("minDiameter"))
    });
  },
  _optionChangesMap: {
    diameter: "REINIT",
    minDiameter: "REINIT",
    sizeGroup: "REINIT"
  },
  _disposeCore: function () {
    C.remove(this);
    this.callBase();
  },
  _groupSeries: function () {
    var e = this.series;
    this._groupsData = {
      groups: [{
        series: e,
        valueOptions: {
          valueType: "numeric"
        }
      }],
      argumentOptions: e[0] && e[0].getOptions()
    };
  },
  getArgumentAxis: function () {
    return null;
  },
  _getValueAxis: function () {
    var e = new h.Translator1D().setCodomain(360, 0);
    return {
      getTranslator: function () {
        return e;
      },
      setBusinessRange: function (t) {
        e.setDomain(t.min, t.max);
      }
    };
  },
  _populateBusinessRange: function () {
    this.series.map(function (e) {
      var t = new l.Range();
      t.addRange(e.getRangeData().val);
      e.getValueAxis().setBusinessRange(t);
      return t;
    });
  },
  _specialProcessSeries: function () {
    (0, s.each)(this.series, function (e, t) {
      t.arrangePoints();
    });
  },
  _checkPaneName: function () {
    return true;
  },
  _processSingleSeries: function (e) {
    this.callBase(e);
    e.arrangePoints();
  },
  _handleSeriesDataUpdated: function () {
    var e = 0;
    this.series.forEach(function (t) {
      e = Math.max(t.getPointsCount(), e);
    });
    this.series.forEach(function (t) {
      t.setMaxPointsCount(e);
    });
    this.callBase();
  },
  _getLegendOptions: function (e) {
    var t = this.callBase(e);
    var n = t.legendData;
    n.argument = e.argument;
    n.argumentIndex = e.argumentIndex;
    n.points = [e];
    return t;
  },
  _getLegendTargets: function () {
    var e = this;
    var t = {};
    (e.series || []).forEach(function (e) {
      e.getPoints().forEach(function (n) {
        var i = n.argument.valueOf();
        var o = e.getPointsByArg(i).indexOf(n);
        var a = i.valueOf().toString() + o;
        t[a] = t[a] || [];
        var r = t[a].push(n);
        n.index = t[a][r - 2] ? t[a][r - 2].index : Object.keys(t).length - 1;
        n.argumentIndex = o;
      });
    });
    var n = [];
    (0, s.each)(t, function (t, i) {
      i.forEach(function (t, i) {
        if (i !== 0) {
          var o = n[n.length - 1];
          o.legendData.points.push(t);
          o.visible ||= t.isVisible();
        } else {
          n.push(e._getLegendOptions(t));
        }
      });
    });
    return n;
  },
  _getLayoutTargets: function () {
    return [{
      canvas: this._canvas
    }];
  },
  _getLayoutSeries: function (e, t) {
    var n;
    var i = this._canvas;
    var o = false;
    n = this.layoutManager.applyPieChartSeriesLayout(i, e, true);
    e.forEach(function (e) {
      e.correctPosition(n, i);
      o = e.drawLabelsWOPoints() || o;
    });
    if (o) {
      n = this.layoutManager.applyPieChartSeriesLayout(i, e, t.hideLayoutLabels);
    }
    e.forEach(function (e) {
      e.hideLabels();
    });
    this._sizeGroupLayout = {
      x: n.centerX,
      y: n.centerY,
      radius: n.radiusOuter,
      drawOptions: t
    };
    return n;
  },
  _getLayoutSeriesForEqualPies: function (e, t) {
    var n = this._canvas;
    var i = this.layoutManager.applyEqualPieChartLayout(e, t);
    e.forEach(function (e) {
      e.correctPosition(i, n);
      e.drawLabelsWOPoints();
    });
    this.layoutManager.correctPieLabelRadius(e, i, n);
    return i;
  },
  _updateSeriesDimensions: function (e) {
    var t;
    var n;
    var i;
    var o = this._getVisibleSeries();
    var a = o.length;
    var r = e.sizeGroupLayout;
    if (a) {
      i = r ? this._getLayoutSeriesForEqualPies(o, r) : this._getLayoutSeries(o, e);
      n = (i.radiusOuter - i.radiusInner - _ * (a - 1)) / a;
      t = i.radiusInner;
      this._setGeometry(i);
      o.forEach(function (e) {
        e.correctRadius({
          radiusInner: t,
          radiusOuter: t + n
        });
        t += n + _;
      });
    }
  },
  _renderSeries: function (e, t, n) {
    this._calculateSeriesLayout(e, t);
    if (!e.sizeGroupLayout && this.getSizeGroup()) {
      C.queue(this);
      this._clearCanvas();
      return;
    }
    this._renderSeriesElements(e, n);
  },
  _getCenter: function () {
    return this._center;
  },
  getInnerRadius: function () {
    return this._innerRadius;
  },
  _getLegendCallBack: function () {
    var e = this;
    var t = this._legend;
    var n = this._getLegendTargets().map(function (e) {
      return e.legendData;
    });
    return function (i) {
      n.forEach(function (n) {
        var o = [];
        var a = t.getActionCallback({
          index: n.id
        });
        e.series.forEach(function (e) {
          var t = e.getPointsByKeys(n.argument, n.argumentIndex);
          o.push.apply(o, t);
        });
        if (i && i.argument === n.argument && i.argumentIndex === n.argumentIndex) {
          o.push(i);
        }
        a(function (e) {
          var t = v;
          e.forEach(function (e) {
            var n;
            var i = (n = e.series) === null || n === undefined ? undefined : n.getOptions();
            var o = e.fullState;
            if ((i == null ? undefined : i.hoverMode) === "none") {
              o &= ~y;
            }
            if ((i == null ? undefined : i.selectionMode) === "none") {
              o &= ~b;
            }
            t |= o;
          });
          return x[t];
        }(o));
      });
    };
  },
  _locateLabels: function (e) {
    var t;
    var n;
    var i = 0;
    do {
      n = this._adjustSeriesLabels(e === "shift");
      t = this._resolveLabelOverlapping(e);
    } while ((t || n) && ++i < 5);
  },
  _adjustSeriesLabels: function (e) {
    return this.series.reduce(function (t, n) {
      return n.adjustLabels(e) || t;
    }, false);
  },
  _applyExtraSettings: c.noop,
  _resolveLabelOverlappingShift: function () {
    var e = this;
    var t = e.option("segmentsDirection") === "anticlockwise";
    var n = e.series.reduce(function (e, t) {
      (e[t.getOptions().label.position] || e.outside).push(t);
      return e;
    }, {
      inside: [],
      columns: [],
      outside: []
    });
    var i = false;
    if (n.inside.length > 0) {
      i = r(n.inside.reduce(function (e, t) {
        return t.getVisiblePoints().reduce(function (e, t) {
          e.left.push(t);
          return e;
        }, e);
      }, {
        left: [],
        right: []
      }), s) || i;
    }
    i = n.columns.reduce(function (e, t) {
      return r(a(t), s) || e;
    }, i);
    if (n.outside.length > 0) {
      i = r(n.outside.reduce(function (e, t) {
        return a(t, e);
      }, null), function (t, n) {
        return (0, o.getVerticallyShiftedAngularCoords)(t, -n, e._center);
      }) || i;
    }
    return i;
    function a(e, t) {
      return e.getVisiblePoints().reduce(function (e, t) {
        var n = (0, o.normalizeAngle)(t.middleAngle);
        (n <= 90 || n >= 270 ? e.right : e.left).push(t);
        return e;
      }, t || {
        left: [],
        right: []
      });
    }
    function r(n, i) {
      var o;
      if (t) {
        n.left.reverse();
        n.right.reverse();
      }
      o = d.overlapping.resolveLabelOverlappingInOneDirection(n.left, e._canvas, false, false, i);
      return d.overlapping.resolveLabelOverlappingInOneDirection(n.right, e._canvas, false, false, i) || o;
    }
    function s(e, t) {
      return {
        x: e.x,
        y: e.y - t
      };
    }
  },
  _setGeometry: function (e) {
    var t = e.centerX;
    var n = e.centerY;
    var i = e.radiusInner;
    this._center = {
      x: t,
      y: n
    };
    this._innerRadius = i;
  },
  _disposeSeries: function (e) {
    this.callBase.apply(this, arguments);
    this._abstractSeries = null;
  },
  _legendDataField: "point",
  _legendItemTextField: "argument",
  _applyPointMarkersAutoHiding: c.noop,
  _renderTrackers: c.noop,
  _trackerType: "PieTracker",
  _createScrollBar: c.noop,
  _updateAxesLayout: c.noop,
  _applyClipRects: c.noop,
  _appendAdditionalSeriesGroups: c.noop,
  _prepareToRender: c.noop,
  _isLegendInside: c.noop,
  _renderAxes: c.noop,
  _shrinkAxes: c.noop,
  _isRotated: c.noop,
  _seriesPopulatedHandlerCore: c.noop,
  _reinitAxes: c.noop,
  _correctAxes: c.noop,
  _getExtraOptions: function () {
    return {
      startAngle: this.option("startAngle"),
      innerRadius: this.option("innerRadius"),
      segmentsDirection: this.option("segmentsDirection"),
      type: this.option("type")
    };
  },
  getSizeGroup: function () {
    return this._themeManager.getOptions("sizeGroup");
  },
  getSizeGroupLayout: function () {
    return this._sizeGroupLayout || {};
  }
});
(0, s.each)(["startAngle", "innerRadius", "segmentsDirection", "type"], function (e, t) {
  S.prototype._optionChangesMap[t] = "REFRESH_SERIES_DATA_INIT";
});
S.addPlugin(p.plugins.pieChart);
S.addPlugin(f.plugins.core);
S.addPlugin(f.plugins.pieChart);
(0, u.default)("dxPieChart", S);
var k = S;
exports.default = k;
module.exports = exports.default;
module.exports.default = exports.default;