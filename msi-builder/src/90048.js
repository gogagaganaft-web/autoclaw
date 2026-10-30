exports.polar = exports.chart = undefined;
var i = require("./48013.js");
var o = require("./13306.js");
var a = require("./21667.js");
var r = require("./7222.js");
var s = require("./19157.js");
var l = r.chart.line;
var u = r.polar.line;
var d = o.extend;
var c = r.chart.spline._calculateBezierPoints;
var h = {};
exports.chart = h;
var f = {};
exports.polar = f;
var p = {
  _createBorderElement: l._createMainElement,
  _createLegendState: function (e, t) {
    return {
      fill: (0, s.extractColor)(e.color) || t,
      opacity: e.opacity,
      hatching: e.hatching,
      filter: e.highlight
    };
  },
  _getColorId: function (e) {
    return e.color?.fillId;
  },
  getValueRangeInitialValue: function () {
    if (this.valueAxisType !== "logarithmic" && this.valueType !== "datetime" && this.showZero !== false) {
      return 0;
    } else {
      return a.chart.getValueRangeInitialValue.call(this);
    }
  },
  _getDefaultSegment: function (e) {
    var t = l._getDefaultSegment(e);
    t.area = t.line.concat(t.line.slice().reverse());
    return t;
  },
  _updateElement: function (e, t, n, i) {
    var o = {
      points: t.line
    };
    var a = {
      points: t.area
    };
    var r = e.line;
    if (n) {
      if (r) {
        r.animate(o);
      }
      e.area.animate(a, {}, i);
    } else {
      if (r) {
        r.attr(o);
      }
      e.area.attr(a);
    }
  },
  _removeElement: function (e) {
    if (e.line) {
      e.line.remove();
    }
    e.area.remove();
  },
  _drawElement: function (e) {
    return {
      line: this._bordersGroup && this._createBorderElement(e.line, {
        "stroke-width": this._styles.normal.border["stroke-width"]
      }).append(this._bordersGroup),
      area: this._createMainElement(e.area).append(this._elementsGroup)
    };
  },
  _applyStyle: function (e) {
    if (this._elementsGroup) {
      this._elementsGroup.smartAttr(e.elements);
    }
    if (this._bordersGroup) {
      this._bordersGroup.attr(e.border);
    }
    (this._graphics || []).forEach(function (t) {
      if (t.line) {
        t.line.attr({
          "stroke-width": e.border["stroke-width"]
        }).sharp();
      }
    });
  },
  _parseStyle: function (e, t, n) {
    var o = e.border || {};
    var a = l._parseLineOptions(o, n);
    a.stroke = o.visible && a["stroke-width"] ? a.stroke : "none";
    a["stroke-width"] = a["stroke-width"] || 1;
    return {
      border: a,
      elements: {
        stroke: "none",
        fill: (0, s.extractColor)(e.color) || t,
        hatching: e.hatching,
        opacity: e.opacity,
        filter: e.highlight ?? null
      }
    };
  },
  _areBordersVisible: function () {
    var e = this._options;
    return e.border.visible || e.hoverStyle.border.visible || e.selectionStyle.border.visible;
  },
  _createMainElement: function (e, t) {
    return this._renderer.path(e, "area").attr(t);
  },
  _getTrackerSettings: function (e) {
    return {
      "stroke-width": e.singlePointSegment ? this._defaultTrackerWidth : 0
    };
  },
  _getMainPointsFromSegment: function (e) {
    return e.area;
  }
};
var g = h.area = d({}, l, p, {
  _prepareSegment: function (e, t) {
    var n = this._processSinglePointsAreaSegment(e, t);
    var i = function (e) {
      return (0, s.map)(e, function (e) {
        return e.getCoords();
      }).concat((0, s.map)(e.slice().reverse(), function (e) {
        return e.getCoords(true);
      }));
    }(n);
    var o = this.getArgumentAxis();
    if (o.getAxisPosition) {
      var a = o.getAxisPosition();
      var r = o.getOptions();
      var l = (t ? 1 : -1) * Math.round(r.width / 2);
      if (r.visible) {
        i.forEach(function (n, r) {
          if (n) {
            var s = e.length === 1 ? 0 : r < e.length ? r : i.length - 1 - r;
            if (t && n.x === e[s].defaultX && n.x === a - o.getAxisShift()) {
              n.x += l;
            }
            if (!t && n.y === e[s].defaultY && n.y === a - o.getAxisShift()) {
              n.y += l;
            }
          }
        });
      }
    }
    return {
      line: n,
      area: i,
      singlePointSegment: n !== e
    };
  },
  _processSinglePointsAreaSegment: function (e, t) {
    if (e && e.length === 1) {
      var n = e[0];
      var o = (0, i.clone)(n);
      o[t ? "y" : "x"] += 1;
      o.argument = null;
      return [n, o];
    }
    return e;
  }
});
f.area = d({}, u, p, {
  _prepareSegment: function (e, t, n) {
    if (n) {
      u._closeSegment.call(this, e);
    }
    return g._prepareSegment.call(this, e);
  },
  _processSinglePointsAreaSegment: function (e) {
    return r.polar.line._prepareSegment.call(this, e).line;
  }
});
h.steparea = d({}, g, {
  _prepareSegment: function (e, t) {
    var n = r.chart.stepline;
    e = g._processSinglePointsAreaSegment(e, t);
    return g._prepareSegment.call(this, n._calculateStepLinePoints.call(this, e), t);
  },
  getSeriesPairCoord: r.chart.stepline.getSeriesPairCoord
});
h.splinearea = d({}, g, {
  _areaPointsToSplineAreaPoints: function (e) {
    var t = e[e.length / 2 - 1];
    var n = e[e.length / 2];
    e.splice(e.length / 2, 0, {
      x: t.x,
      y: t.y
    }, {
      x: n.x,
      y: n.y
    });
  },
  _prepareSegment: function (e, t) {
    var n = g._processSinglePointsAreaSegment(e, t);
    var i = g._prepareSegment.call(this, c(n, t));
    this._areaPointsToSplineAreaPoints(i.area);
    i.singlePointSegment = n !== e;
    return i;
  },
  _getDefaultSegment: function (e) {
    var t = g._getDefaultSegment(e);
    this._areaPointsToSplineAreaPoints(t.area);
    return t;
  },
  _createMainElement: function (e, t) {
    return this._renderer.path(e, "bezierarea").attr(t);
  },
  _createBorderElement: r.chart.spline._createMainElement,
  getSeriesPairCoord: r.chart.spline.getSeriesPairCoord,
  _getNearestPoints: r.chart.spline._getNearestPoints,
  _getBezierPoints: r.chart.spline._getBezierPoints,
  obtainCubicBezierTCoef: r.chart.spline.obtainCubicBezierTCoef
});