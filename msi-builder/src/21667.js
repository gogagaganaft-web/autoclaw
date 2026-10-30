exports.polar = exports.chart = undefined;
var i;
var o = require("./13306.js");
var a = require("./95479.js");
var r = (i = require("./63407.js")) && i.__esModule ? i : {
  default: i
};
var s = require("./35922.js");
var l = require("./19157.js");
var u = require("./20576.js");
function d(e) {
  return (d = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function c(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (d(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (d(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (d(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var h = Math;
var f = h.abs;
var p = h.sqrt;
var g = h.max;
var m = "variance";
var _ = "stddeviation";
var v = "stderror";
var y = "percent";
var b = "fixed";
var x = {};
exports.chart = x;
var w = {};
function C(e) {
  var t = 0;
  (0, a.each)(e, function (e, n) {
    t += n;
  });
  return t;
}
function S(e, t) {
  return C((0, l.map)(e, function (e) {
    return (e - t) * (e - t);
  })) / e.length;
}
function k(e) {
  return function (t, n) {
    var i = t.intervalStart;
    var a = t.intervalEnd;
    var r = t.data;
    var s = n.getValueFields()[0];
    var l = r[0];
    l = r.reduce(function (t, n) {
      var i = n[s];
      if (t[s] === null) {
        t = n;
      }
      if (i !== null && e(i, t[s])) {
        return n;
      } else {
        return t;
      }
    }, l);
    return (0, o.extend)({}, l, c({}, n.getArgumentField(), n._getIntervalCenter(i, a)));
  };
}
exports.polar = w;
var D = {
  _defaultDuration: 400,
  _defaultTrackerWidth: 12,
  _applyStyle: u.noop,
  _updateOptions: u.noop,
  _parseStyle: u.noop,
  _prepareSegment: u.noop,
  _drawSegment: u.noop,
  _appendInGroup: function () {
    this._group.append(this._extGroups.seriesGroup);
  },
  _createLegendState: function (e, t) {
    return {
      fill: (0, l.extractColor)(e.color, true) || t,
      hatching: e.hatching ? (0, o.extend)({}, e.hatching, {
        direction: "right"
      }) : undefined
    };
  },
  _getColorId: u.noop,
  _applyElementsClipRect: function (e) {
    e["clip-path"] = this._paneClipRectID;
  },
  _applyMarkerClipRect: function (e) {
    e["clip-path"] = this._forceClipping ? this._paneClipRectID : null;
  },
  _createGroup: function (e, t, n, i) {
    var o = t[e] = t[e] || this._renderer.g();
    if (n) {
      o.append(n);
    }
    if (i) {
      o.attr(i);
    }
  },
  _applyClearingSettings: function (e) {
    e.opacity = null;
    e.scale = null;
    if (this._options.rotated) {
      e.translateX = null;
    } else {
      e.translateY = null;
    }
  },
  _createGroups: function () {
    this._createGroup("_markersGroup", this, this._group);
    this._createGroup("_labelsGroup", this);
  },
  _setMarkerGroupSettings: function () {
    var e = this._createPointStyles(this._getMarkerGroupOptions()).normal;
    e.class = "dxc-markers";
    e.opacity = 1;
    this._applyMarkerClipRect(e);
    this._markersGroup.attr(e);
  },
  getVisibleArea: function () {
    return this._visibleArea;
  },
  areErrorBarsVisible: function () {
    var e;
    var t = this._options.valueErrorBar;
    return t && this._errorBarsEnabled() && t.displayMode !== "none" && (e = (0, l.normalizeEnum)(t.type), [b, y, m, _, v].includes(e) || (0, s.isDefined)(t.lowValueField) || (0, s.isDefined)(t.highValueField));
  },
  groupPointsByCoords: function (e) {
    var t = [];
    (0, a.each)(this.getVisiblePoints(), function (n, i) {
      var o = parseInt(e ? i.vy : i.vx);
      if (t[o]) {
        if (Array.isArray(t[o])) {
          t[o].push(i);
        } else {
          t[o] = [t[o], i];
        }
      } else {
        t[o] = i;
      }
    });
    return t;
  },
  _createErrorBarGroup: function (e) {
    var t;
    var n = this._options.valueErrorBar;
    if (this.areErrorBarsVisible()) {
      t = {
        class: "dxc-error-bars",
        stroke: n.color,
        "stroke-width": n.lineWidth,
        opacity: e ? 0.001 : n.opacity || 1,
        "stroke-linecap": "square",
        sharp: true,
        "clip-path": this._forceClipping ? this._paneClipRectID : this._widePaneClipRectID
      };
      this._createGroup("_errorBarGroup", this, this._group, t);
    }
  },
  _setGroupsSettings: function (e) {
    this._setMarkerGroupSettings();
    this._setLabelGroupSettings(e);
    this._createErrorBarGroup(e);
  },
  _getCreatingPointOptions: function () {
    var e;
    var t;
    var n = this._predefinedPointOptions;
    if (!n) {
      e = this._getPointOptions();
      this._predefinedPointOptions = n = (0, o.extend)(true, {
        styles: {}
      }, e);
      t = e.styles && e.styles.normal || {};
      n.styles = n.styles || {};
      n.styles.normal = {
        "stroke-width": t["stroke-width"],
        r: t.r,
        opacity: t.opacity
      };
    }
    return n;
  },
  _getPointOptions: function () {
    return this._parsePointOptions(this._preparePointOptions(), this._options.label);
  },
  _getOptionsForPoint: function () {
    return this._options.point;
  },
  _parsePointStyle: function (e, t, n, i) {
    var o = e.border || {};
    var a = e.size !== undefined ? e.size : i;
    return {
      fill: (0, l.extractColor)(e.color, true) || t,
      stroke: o.color || n,
      "stroke-width": o.visible ? o.width : 0,
      r: a / 2 + (o.visible && a !== 0 && ~~(o.width / 2) || 0)
    };
  },
  _createPointStyles: function (e) {
    var t = (0, l.extractColor)(e.color, true) || this._options.mainSeriesColor;
    var n = this._options.containerBackgroundColor;
    var i = this._parsePointStyle(e, t, t);
    i.visibility = e.visible ? "visible" : "hidden";
    return {
      labelColor: t,
      normal: i,
      hover: this._parsePointStyle(e.hoverStyle, n, t, e.size),
      selection: this._parsePointStyle(e.selectionStyle, n, t, e.size)
    };
  },
  _checkData: function (e, t, n) {
    (n = n || {
      value: this.getValueFields()[0]
    }).argument = this.getArgumentField();
    return function (e, t, n) {
      var i = true;
      for (var o in t) {
        var a = o === "argument";
        if (a || o === "size" ? !(0, s.isDefined)(e[o]) : e[o] === undefined) {
          var r = t[o];
          if (!a) {
            n[r] = (n[r] || 0) + 1;
          }
          i = false;
        }
      }
      return i;
    }(e, n, t || {}) && e.value == e.value;
  },
  getArgumentRangeInitialValue: function () {
    var n = this.getPoints();
    if (this.useAggregation() && n.length) {
      return {
        min: n[0].aggregationInfo?.intervalStart,
        max: n[n.length - 1].aggregationInfo?.intervalEnd
      };
    }
  },
  getValueRangeInitialValue: function () {},
  _getRangeData: function () {
    return r.default.getRangeData(this);
  },
  _getPointDataSelector: function () {
    var e;
    var t;
    var n = this;
    var i = this.getValueFields()[0];
    var o = this.getArgumentField();
    var a = this.getTagField();
    var r = this.areErrorBarsVisible();
    if (r) {
      var s = this._options.valueErrorBar;
      e = s.lowValueField || "lowError";
      t = s.highValueField || "highError";
    }
    return function (s) {
      var l = {
        value: n._processEmptyValue(s[i]),
        argument: s[o],
        tag: s[a],
        data: s
      };
      if (r) {
        l.lowError = s[e];
        l.highError = s[t];
      }
      return l;
    };
  },
  _errorBarsEnabled: function () {
    return this.valueAxisType !== "discrete" && this.valueAxisType !== "logarithmic" && this.valueType !== "datetime";
  },
  _drawPoint: function (e) {
    var t = e.point;
    if (t.isInVisibleArea()) {
      t.clearVisibility();
      t.draw(this._renderer, e.groups, e.hasAnimation, e.firstDrawing);
      this._drawnPoints.push(t);
    } else {
      t.setInvisibility();
    }
  },
  _animateComplete: function () {
    var e = {
      duration: this._defaultDuration
    };
    if (this._labelsGroup) {
      this._labelsGroup.animate({
        opacity: 1
      }, e);
    }
    if (this._errorBarGroup) {
      this._errorBarGroup.animate({
        opacity: this._options.valueErrorBar.opacity || 1
      }, e);
    }
  },
  _animate: function () {
    var e = this;
    var t = e._drawnPoints.length - 1;
    (0, a.each)(e._drawnPoints || [], function (n, i) {
      i.animate(n === t ? function () {
        e._animateComplete();
      } : undefined, {
        translateX: i.x,
        translateY: i.y
      });
    });
  },
  _getIntervalCenter: function (e, t) {
    var n = this.getArgumentAxis();
    var i = n.getOptions();
    if (n.aggregatedPointBetweenTicks()) {
      return e;
    } else if (i.type !== "discrete") {
      return n.getVisualRangeCenter({
        minVisible: e,
        maxVisible: t
      }, true);
    } else {
      return e;
    }
  },
  _defaultAggregator: "avg",
  _aggregators: {
    avg: function (e, t) {
      var n;
      var i = e.data;
      var o = e.intervalStart;
      var a = e.intervalEnd;
      if (i.length) {
        var r = t.getValueFields()[0];
        var l = i.reduce(function (e, t) {
          var n = t[r];
          if ((0, s.isDefined)(n)) {
            e[0] += n;
            e[1]++;
          } else if (n === null) {
            e[2]++;
          }
          return e;
        }, [0, 0, 0]);
        return function (e, t, n) {
          var i = n.getOptions().valueErrorBar;
          var o = n.getValueFields()[0];
          var a = i.lowValueField || "lowError";
          var r = i.highValueField || "highError";
          if (n.areErrorBarsVisible() && i.type === undefined) {
            var l = t.reduce(function (e, t) {
              if ((0, s.isDefined)(t[a])) {
                e[0] += t[o] - t[a];
                e[1]++;
              }
              if ((0, s.isDefined)(t[r])) {
                e[2] += t[r] - t[o];
                e[3]++;
              }
              return e;
            }, [0, 0, 0, 0]);
            if (l[1]) {
              e[a] = e[o] - l[0] / l[1];
            }
            if (l[2]) {
              e[r] = e[o] + l[2] / l[3];
            }
          }
          return e;
        }((c(n = {}, r, l[2] === i.length ? null : l[0] / l[1]), c(n, t.getArgumentField(), t._getIntervalCenter(o, a)), n), i, t);
      }
    },
    sum: function (e, t) {
      var n;
      var i = e.intervalStart;
      var o = e.intervalEnd;
      var a = e.data;
      if (a.length) {
        var r = t.getValueFields()[0];
        var s = a.reduce(function (e, t) {
          var n = t[r];
          if (n !== undefined) {
            e[0] += n;
          }
          if (n === null) {
            e[1]++;
          } else if (n === undefined) {
            e[2]++;
          }
          return e;
        }, [0, 0, 0]);
        var l = s[0];
        if (s[1] === a.length) {
          l = null;
        }
        if (s[2] !== a.length) {
          return function (e, t, n) {
            var i = n.getOptions().valueErrorBar;
            var o = i.lowValueField || "lowError";
            var a = i.highValueField || "highError";
            if (n.areErrorBarsVisible() && i.type === undefined) {
              e[o] = 0;
              e[a] = 0;
              e = t.reduce(function (e, t) {
                e[o] += t[o];
                e[a] += t[a];
                return e;
              }, e);
            }
            return e;
          }((c(n = {}, r, l), c(n, t.getArgumentField(), t._getIntervalCenter(i, o)), n), a, t);
        }
      }
    },
    count: function (e, t) {
      var n;
      var i = e.data;
      var o = e.intervalStart;
      var a = e.intervalEnd;
      var r = t.getValueFields()[0];
      c(n = {}, t.getArgumentField(), t._getIntervalCenter(o, a));
      c(n, r, i.filter(function (e) {
        return e[r] !== undefined;
      }).length);
      return n;
    },
    min: k(function (e, t) {
      return e < t;
    }),
    max: k(function (e, t) {
      return e > t;
    })
  },
  _endUpdateData: function () {
    delete this._predefinedPointOptions;
  },
  getArgumentField: function () {
    return this._options.argumentField || "arg";
  },
  getValueFields: function () {
    var e;
    var t;
    var n = this._options;
    var i = n.valueErrorBar;
    var o = [n.valueField || "val"];
    if (i) {
      e = i.lowValueField;
      t = i.highValueField;
      if ((0, s.isString)(e)) {
        o.push(e);
      }
      if ((0, s.isString)(t)) {
        o.push(t);
      }
    }
    return o;
  },
  _calculateErrorBars: function (e) {
    if (this.areErrorBarsVisible()) {
      var t;
      var n;
      var i;
      var o;
      var r;
      var u = this._options.valueErrorBar;
      var d = (0, l.normalizeEnum)(u.type);
      var c = parseFloat(u.value);
      var h = this.getValueFields()[0];
      var f = u.lowValueField || "lowError";
      var g = u.highValueField || "highError";
      function x(e, n) {
        t = n.value;
        n.lowError = t - c;
        n.highError = t + c;
      }
      switch (d) {
        case b:
          r = x;
          break;
        case y:
          r = function (e, n) {
            var i = (t = n.value) * c / 100;
            n.lowError = t - i;
            n.highError = t + i;
          };
          break;
        case "undefined":
          r = function (e, t) {
            t.lowError = t.data[f];
            t.highError = t.data[g];
          };
          break;
        default:
          i = (n = (0, l.map)(e, function (e) {
            if ((0, s.isDefined)(e.data[h])) {
              return e.data[h];
            } else {
              return null;
            }
          })).length;
          c = c || 1;
          switch (d) {
            case m:
              c = S(n, C(n) / i) * c;
              r = x;
              break;
            case _:
              o = C(n) / i;
              c = p(S(n, o)) * c;
              r = function (e, t) {
                t.lowError = o - c;
                t.highError = o + c;
              };
              break;
            case v:
              c = p(S(n, C(n) / i) / i) * c;
              r = x;
          }
      }
      if (r) {
        (0, a.each)(e, r);
      }
    }
  },
  _patchMarginOptions: function (e) {
    var t = this._getCreatingPointOptions();
    var n = t.styles;
    var i = [n.normal, n.hover, n.selection].reduce(function (e, t) {
      return g(e, t.r * 2 + t["stroke-width"]);
    }, 0);
    e.size = t.visible ? i : 0;
    e.sizePointNormalState = t.visible ? n.normal.r * 2 + n.normal["stroke-width"] : 2;
    return e;
  },
  usePointsToDefineAutoHiding: function () {
    return true;
  }
};
exports.chart = x = (0, o.extend)({}, D, {
  drawTrackers: function () {
    var e;
    var t;
    var n = this;
    var i = n._segments || [];
    var o = n._options.rotated;
    if (n.isVisible()) {
      if (i.length) {
        e = n._trackers = n._trackers || [];
        t = n._trackersGroup = (n._trackersGroup || n._renderer.g().attr({
          fill: "gray",
          opacity: 0.001,
          stroke: "gray",
          class: "dxc-trackers"
        })).attr({
          "clip-path": this._paneClipRectID || null
        }).append(n._group);
        (0, a.each)(i, function (i, o) {
          if (e[i]) {
            n._updateTrackerElement(o, e[i]);
          } else {
            e[i] = n._drawTrackerElement(o).data({
              "chart-data-series": n
            }).append(t);
          }
        });
      }
      n._trackersTranslator = n.groupPointsByCoords(o);
    }
  },
  _checkAxisVisibleAreaCoord: function (e, t) {
    var n = (e ? this.getArgumentAxis() : this.getValueAxis()).getVisibleArea();
    return (0, s.isDefined)(t) && n[0] <= t && n[1] >= t;
  },
  checkSeriesViewportCoord: function (e, t) {
    return this.getPoints().length && this.isVisible();
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    var i = !t && !this._options.rotated || t && this._options.rotated;
    var o = i ? "vy" : "vx";
    var a = i ? "vx" : "vy";
    for (var r = this.getVisiblePoints(), s = 0; s < r.length; s++) {
      var l = r[s];
      var u = l[o] === e ? l[a] : undefined;
      if (this._checkAxisVisibleAreaCoord(!t, u)) {
        n = u;
        break;
      }
    }
    return n;
  },
  _getNearestPoints: function (e, t) {
    return [e, t];
  },
  _getBezierPoints: function () {
    return [];
  },
  _getNearestPointsByCoord: function (e, t) {
    var n = this;
    var i = n.getOptions().rotated;
    var o = !t && !i || t && i ? "vy" : "vx";
    var a = n.getPoints();
    var r = n._getBezierPoints();
    var s = [];
    if (a.length > 1) {
      a.forEach(function (t, i) {
        var l = a[i + 1];
        if (l && (t[o] <= e && l[o] >= e || t[o] >= e && l[o] <= e)) {
          s.push(n._getNearestPoints(t, l, r));
        }
      });
    } else {
      s.push([a[0], a[0]]);
    }
    return s;
  },
  getNeighborPoint: function (e, t) {
    var n;
    var i = this._options.rotated ? t : e;
    var o = i;
    var r = this._trackersTranslator;
    var s = null;
    var l = this._options.rotated ? e : t;
    var u = this._options.rotated ? "vx" : "vy";
    if (this.isVisible() && r) {
      s = r[i];
      do {
        s = r[o] || r[i];
        i--;
        o++;
      } while ((i >= 0 || o < r.length) && !s);
      if (Array.isArray(s)) {
        n = f(s[0][u] - l);
        (0, a.each)(s, function (e, t) {
          var i = f(t[u] - l);
          if (n >= i) {
            n = i;
            s = t;
          }
        });
      }
    }
    return s;
  },
  _applyVisibleArea: function () {
    var e = this._options.rotated;
    var t = (e ? this.getValueAxis() : this.getArgumentAxis()).getVisibleArea();
    var n = (e ? this.getArgumentAxis() : this.getValueAxis()).getVisibleArea();
    this._visibleArea = {
      minX: t[0],
      maxX: t[1],
      minY: n[0],
      maxY: n[1]
    };
  },
  getPointCenterByArg: function (e) {
    var t = this.getPointsByArg(e)[0];
    if (t) {
      return t.getCenterCoord();
    } else {
      return undefined;
    }
  }
});
exports.polar = w = (0, o.extend)({}, D, {
  drawTrackers: function () {
    x.drawTrackers.call(this);
    var e;
    var t = this._trackersTranslator;
    if (this.isVisible()) {
      (0, a.each)(t, function (t, n) {
        if (n) {
          e = t;
          return false;
        }
      });
      t[e + 360] = t[e];
    }
  },
  getNeighborPoint: function (e, t) {
    var n = (0, l.convertXYToPolar)(this.getValueAxis().getCenter(), e, t);
    return x.getNeighborPoint.call(this, n.phi, n.r);
  },
  _applyVisibleArea: function () {
    var e = this.getValueAxis().getCanvas();
    this._visibleArea = {
      minX: e.left,
      maxX: e.width - e.right,
      minY: e.top,
      maxY: e.height - e.bottom
    };
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    var i = t ? "argument" : "radius";
    for (var o = this.getVisiblePoints(), a = 0; a < o.length; a++) {
      var r = o[a];
      var l = (0, s.isDefined)(r[i]) && (0, s.isDefined)(e[i]) && r[i].valueOf() === e[i].valueOf() ? {
        x: r.x,
        y: r.y
      } : undefined;
      if ((0, s.isDefined)(l)) {
        n = l;
        break;
      }
    }
    return n;
  }
});