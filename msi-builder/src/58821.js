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
exports.polar = exports.chart = undefined;
var o = require("./13306.js");
var a = require("./95479.js");
var r = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = d(t);
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
}(require("./21667.js"));
var s = require("./90048.js");
var l = require("./19157.js");
var u = require("./35922.js");
function d(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (d = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
var c = s.chart.area;
var h = r.chart;
var f = r.polar;
var p = o.extend;
var g = a.each;
var m = {};
exports.chart = m;
var _ = {};
exports.polar = _;
var v = {
  _createLegendState: function (e, t) {
    return {
      fill: (0, l.extractColor)(e.color) || t,
      hatching: e.hatching,
      filter: e.highlight
    };
  },
  _getColorId: c._getColorId,
  _parsePointStyle: function (e, t, n) {
    var i = (0, l.extractColor)(e.color) || t;
    var o = h._parsePointStyle.call(this, e, i, n);
    o.fill = i;
    o.hatching = e.hatching;
    o.filter = e.highlight;
    o.dashStyle = e.border && e.border.dashStyle || "solid";
    delete o.r;
    return o;
  },
  _applyMarkerClipRect: function (e) {
    e["clip-path"] = null;
  },
  _setGroupsSettings: function (e, t) {
    var n = this;
    var i = {};
    h._setGroupsSettings.apply(n, arguments);
    if (e && t) {
      i = this._getAffineCoordOptions();
    } else if (!e) {
      i = {
        scaleX: 1,
        scaleY: 1,
        translateX: 0,
        translateY: 0
      };
    }
    n._markersGroup.attr(i);
  },
  _drawPoint: function (e) {
    e.hasAnimation = e.hasAnimation && !e.firstDrawing;
    e.firstDrawing = false;
    h._drawPoint.call(this, e);
  },
  _getMainColor: function () {
    return this._options.mainSeriesColor;
  },
  _createPointStyles: function (e) {
    var n = (0, l.extractColor)(e.color, true) || this._getMainColor();
    var i = e.color?.fillId;
    var o = e.hoverStyle || {};
    var a = e.selectionStyle || {};
    if (i) {
      this._turnOffHatching(o, a);
    }
    return {
      labelColor: n,
      normal: this._parsePointStyle(e, n, n),
      hover: this._parsePointStyle(o, i || n, n),
      selection: this._parsePointStyle(a, i || n, n)
    };
  },
  _updatePointsVisibility: function () {
    var e = this._options.visible;
    (0, a.each)(this._points, function (t, n) {
      n._options.visible = e;
    });
  },
  _getOptionsForPoint: function () {
    return this._options;
  },
  _animate: function (e) {
    var t = this;
    t._animatePoints(e, function () {
      t._animateComplete();
    }, function (e, t) {
      var n = e.length - 1;
      g(e || [], function (e, i) {
        i.animate(e === n ? t : undefined, i.getMarkerCoords());
      });
    });
  },
  getValueRangeInitialValue: c.getValueRangeInitialValue,
  _patchMarginOptions: function (e) {
    var t;
    e.checkInterval = !this.useAggregation() || ((t = this.getArgumentAxis()) === null || t === undefined ? undefined : t.aggregatedPointBetweenTicks());
    return e;
  },
  _defaultAggregator: "sum",
  _defineDrawingState: function () {},
  usePointsToDefineAutoHiding: function () {
    return false;
  }
};
m.bar = p({}, h, v, {
  _getAffineCoordOptions: function () {
    var e = this._options.rotated;
    var t = {
      scaleX: e ? 0.001 : 1,
      scaleY: e ? 1 : 0.001
    };
    t["translate" + (e ? "X" : "Y")] = this.getValueAxis().getTranslator().translate("canvas_position_default");
    return t;
  },
  _animatePoints: function (e, t, n) {
    this._markersGroup.animate({
      scaleX: 1,
      scaleY: 1,
      translateY: 0,
      translateX: 0
    }, undefined, t);
    if (!e) {
      n(this._drawnPoints, t);
    }
  },
  checkSeriesViewportCoord: function (e, t) {
    if (!h.checkSeriesViewportCoord.call(this)) {
      return false;
    }
    if (e.isArgumentAxis) {
      return true;
    }
    var n = e.getTranslator();
    var i = this.getViewport();
    var o = n.translate(i.categories ? i.categories[0] : i.min);
    var a = n.translate(i.categories ? i.categories[i.categories.length - 1] : i.max);
    var r = this.getOptions().rotated;
    var s = e.getOptions().inverted;
    if (r && !s || !r && s) {
      return t >= o && t <= a;
    } else {
      return t >= a && t <= o;
    }
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    var i = this._options.rotated;
    var o = !t && !i || t && i;
    var a = o ? "vy" : "vx";
    var r = o ? "vx" : "vy";
    for (var s = this.getPoints(), l = 0; l < s.length; l++) {
      var u = s[l];
      var d = undefined;
      d = t ? u.getCenterCoord()[a[1]] === e ? u[r] : undefined : u[a] === e ? u[r] : undefined;
      if (this._checkAxisVisibleAreaCoord(!t, d)) {
        n = d;
        break;
      }
    }
    return n;
  }
});
_.bar = p({}, f, v, {
  _animatePoints: function (e, t, n) {
    n(this._drawnPoints, t);
  },
  _setGroupsSettings: h._setGroupsSettings,
  _drawPoint: function (e, t, n) {
    h._drawPoint.call(this, e, t, n);
  },
  _parsePointStyle: function (e) {
    var t = v._parsePointStyle.apply(this, arguments);
    t.opacity = e.opacity;
    return t;
  },
  _createGroups: h._createGroups,
  _setMarkerGroupSettings: function () {
    var e = this._createPointStyles(this._getMarkerGroupOptions()).normal;
    e.class = "dxc-markers";
    this._applyMarkerClipRect(e);
    var t = p({}, e);
    delete t.opacity;
    this._markersGroup.attr(t);
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    var i = t ? "argument" : "radius";
    for (var o = this.getVisiblePoints(), a = this.getArgumentAxis(), r = a.getAngles()[0], s = 0; s < o.length; s++) {
      var d = o[s];
      var c = (0, u.isDefined)(d[i]) && (0, u.isDefined)(e[i]) && d[i].valueOf() === e[i].valueOf() ? (0, l.convertPolarToXY)(a.getCenter(), r, -a.getTranslatedAngle(d.angle), d.radius) : undefined;
      if ((0, u.isDefined)(c)) {
        n = c;
        break;
      }
    }
    return n;
  },
  _createLegendState: c._createLegendState
});