exports.PieTracker = exports.ChartTracker = undefined;
var i = g(require("./73349.js"));
var o = g(require("./55994.js"));
var a = require("./95429.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = g(require("./32410.js"));
var u = require("./19157.js");
var d = g(require("./93786.js"));
var c = require("./39611.js");
var h = require("./35922.js");
var f = require("./20576.js");
var p = g(require("./17381.js"));
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = Math.floor;
var _ = l.default.events;
var v = l.default.states;
var y = v.hoverMark;
var b = v.normalMark;
var x = "dxChartTracker";
var w = (0, c.addNamespace)([d.default.down, d.default.move], x);
var C = ["includepoints", "excludepoints", "none"];
function S(e, t, n) {
  var i = e.target;
  if (i.tagName === "tspan") {
    return i.parentNode[t];
  }
  var o = i[t];
  if (n && !(0, h.isDefined)(o)) {
    return function e(n) {
      if (n.parentNode) {
        if ((0, h.isDefined)(n.parentNode[t])) {
          return n.parentNode[t];
        } else {
          return e(n.parentNode);
        }
      }
    }(i);
  }
  return o;
}
function k(e, t, n) {
  var i = e.event;
  var o = e.cancel;
  var a = i.cancel;
  var r = o || a;
  if (a) {
    p.default.log("W0003", `${n}Click handler argument`, "event.cancel", "22.1", "Use the 'cancel' field instead");
  }
  return r || !t.getOptions();
}
function D(e) {
  var t = e.getOptions().hoverMode;
  if (t === "none") {
    return t;
  } else {
    return "allargumentpoints";
  }
}
var I = {
  ctor: function (e) {
    var t = this;
    var n = {
      tracker: t
    };
    t._renderer = e.renderer;
    t._legend = e.legend;
    t._tooltip = e.tooltip;
    t._eventTrigger = e.eventTrigger;
    t._seriesGroup = e.seriesGroup;
    e.seriesGroup.off(".dxChartTracker").on((0, c.addNamespace)(_.showPointTooltip, x), n, t._showPointTooltip).on((0, c.addNamespace)(_.hidePointTooltip, x), n, t._hidePointTooltip);
    t._renderer.root.off(".dxChartTracker").on(w, n, t._pointerHandler).on((0, c.addNamespace)(d.default.up, x), function () {
      return clearTimeout(t._holdTimer);
    }).on((0, c.addNamespace)(a.name, x), n, t._clickHandler);
  },
  update: function (e) {
    this._chart = e.chart;
  },
  updateSeries: function (e, t) {
    var n = this;
    var i = (e == null || !e.some(function (e) {
      return e === n.hoveredSeries;
    })) && (!n._hoveredPoint || !n._hoveredPoint.series);
    if (n._storedSeries !== e) {
      n._storedSeries = e || [];
    }
    if (i) {
      n._clean();
      n._renderer.initDefsElements();
    }
    if (t) {
      n.clearSelection();
      if (!i) {
        n._hideTooltip(n.pointAtShownTooltip);
        n.clearHover();
      }
    }
  },
  setCanvases: function (e, t) {
    this._mainCanvas = e;
    this._canvases = t;
  },
  repairTooltip: function () {
    var e = this.pointAtShownTooltip;
    if (e && e.series && e.isVisible()) {
      this._showTooltip(e);
    } else {
      this._hideTooltip(e, true);
    }
  },
  _setHoveredPoint: function (e) {
    if (e !== this._hoveredPoint) {
      this._releaseHoveredPoint();
      e.hover();
      this._hoveredPoint = e;
    }
  },
  _releaseHoveredPoint: function (e) {
    if (this._hoveredPoint && this._hoveredPoint.getOptions()) {
      this._hoveredPoint.clearHover();
      this._hoveredPoint = null;
      if (this._tooltip.isEnabled()) {
        this._hideTooltip(this._hoveredPoint, false, e);
      }
    }
  },
  _setHoveredSeries: function (e, t) {
    this._releaseHoveredSeries();
    this._releaseHoveredPoint();
    e.hover(t);
    this.hoveredSeries = e;
  },
  _releaseHoveredSeries: function () {
    if (this.hoveredSeries) {
      this.hoveredSeries.clearHover();
      this.hoveredSeries = null;
    }
  },
  clearSelection: function () {
    this._storedSeries.forEach(function (e) {
      if (e) {
        e.clearSelection();
        e.getPoints().forEach(function (e) {
          return e.clearSelection();
        });
      }
    });
  },
  _clean: function () {
    this.hoveredPoint = this.hoveredSeries = this._hoveredArgumentPoints = null;
    this._hideTooltip(this.pointAtShownTooltip);
  },
  clearHover: function (e) {
    this._resetHoveredArgument();
    this._releaseHoveredSeries();
    this._releaseHoveredPoint(e);
  },
  _hideTooltip: function (e, t, n) {
    if (!!this._tooltip && (!e || this.pointAtShownTooltip === e)) {
      if (!t && this.pointAtShownTooltip) {
        this.pointAtShownTooltip = null;
      }
      this._tooltip.hide(!!n);
    }
  },
  _showTooltip: function (e) {
    var t;
    var n = this;
    var i = {
      target: e
    };
    if (e != null && e.getOptions()) {
      t = e.getTooltipFormatObject(n._tooltip, n._tooltip.isShared() && n._chart.getStackedPoints(e));
      if (!(0, h.isDefined)(t.valueText) && !t.points || !e.isVisible()) {
        return;
      }
      var o = e.getTooltipParams(n._tooltip.getLocation());
      var a = n._renderer.getRootOffset();
      o.x += a.left;
      o.y += a.top;
      function r(t) {
        if (t) {
          n.pointAtShownTooltip = e;
        }
      }
      r(n._tooltip.show(t, o, i, undefined, r));
    }
  },
  _showPointTooltip: function (e, t) {
    var n = e.data.tracker;
    var i = n.pointAtShownTooltip;
    if (i && i !== t) {
      n._hideTooltip(i);
    }
    n._showTooltip(t);
  },
  _hidePointTooltip: function (e, t) {
    e.data.tracker._hideTooltip(t, false, true);
  },
  _enableOutHandler: function () {
    if (!this._outHandler) {
      var e = this;
      function t(t) {
        var n = e._renderer.getRootOffset();
        var i = m(t.pageX - n.left);
        var o = m(t.pageY - n.top);
        if (!(0, u.pointInCanvas)(e._mainCanvas, i, o) && !e._isCursorOnTooltip(t)) {
          e._pointerOut();
          e._disableOutHandler();
        }
      }
      o.default.on(i.default.getDocument(), w, t);
      this._outHandler = t;
    }
  },
  _isCursorOnTooltip: function (e) {
    return this._tooltip.isEnabled() && this._tooltip.isCursorOnTooltip(e.pageX, e.pageY);
  },
  _disableOutHandler: function () {
    if (this._outHandler) {
      o.default.off(i.default.getDocument(), w, this._outHandler);
    }
    this._outHandler = null;
  },
  stopCurrentHandling: function () {
    this._pointerOut(true);
  },
  _pointerOut: function (e) {
    this.clearHover(true);
    if (e || this._tooltip.isEnabled()) {
      this._hideTooltip(this.pointAtShownTooltip, false, true);
    }
  },
  _triggerLegendClick: function (e, t) {
    var n = this._eventTrigger;
    n("legendClick", e, function () {
      if (!k(e, e.target, "legend")) {
        n(t, e);
      }
    });
  },
  _hoverLegendItem: function (e, t) {
    var n;
    var i;
    var o = this._legend.getItemByCoord(e, t);
    i = this._legend.getOptions().hoverMode;
    var a = C.indexOf(i) > -1 ? i : "includepoints";
    if (o) {
      if (!(n = this._storedSeries[o.id]).isHovered() || n.lastHoverMode !== a) {
        this._setHoveredSeries(n, a);
      }
      if (this._tooltip.isEnabled()) {
        this._hideTooltip(this.pointAtShownTooltip);
      }
    } else {
      this.clearHover();
    }
  },
  _hoverArgument: function (e, t) {
    var n = this._getArgumentHoverMode();
    if ((0, h.isDefined)(e)) {
      this._releaseHoveredPoint();
      this._hoveredArgument = e;
      this._argumentIndex = t;
      this._notifySeries({
        action: "pointHover",
        notifyLegend: this._notifyLegendOnHoverArgument,
        target: {
          argument: e,
          fullState: y,
          argumentIndex: t,
          getOptions: function () {
            return {
              hoverMode: n
            };
          }
        }
      });
    }
  },
  _resetHoveredArgument: function () {
    var e;
    if ((0, h.isDefined)(this._hoveredArgument)) {
      e = this._getArgumentHoverMode();
      this._notifySeries({
        action: "clearPointHover",
        notifyLegend: this._notifyLegendOnHoverArgument,
        target: {
          fullState: b,
          argumentIndex: this._argumentIndex,
          argument: this._hoveredArgument,
          getOptions: function () {
            return {
              hoverMode: e
            };
          }
        }
      });
      this._hoveredArgument = null;
    }
  },
  _notifySeries: function (e) {
    this._storedSeries.forEach(function (t) {
      t.notify(e);
    });
  },
  _pointerHandler: function (e) {
    var t;
    var n = e.data.tracker;
    var i = n._renderer.getRootOffset();
    var o = m(e.pageX - i.left);
    var a = m(e.pageY - i.top);
    var r = n._getCanvas(o, a);
    var s = S(e, "chart-data-series");
    var l = S(e, "chart-data-point") || ((t = s) === null || t === undefined ? undefined : t.getPointByCoord(o, a));
    n._isHolding = false;
    clearTimeout(n._holdTimer);
    if (e.type === d.default.down) {
      n._holdTimer = setTimeout(function () {
        return n._isHolding = true;
      }, 300);
    }
    if (l && !l.getMarkerVisibility()) {
      l = undefined;
    }
    n._enableOutHandler();
    if (n._legend.coordsIn(o, a)) {
      n._hoverLegendItem(o, a);
    } else {
      if (n.hoveredSeries && n.hoveredSeries !== n._stuckSeries) {
        n._releaseHoveredSeries();
      }
      if (!n._hoverArgumentAxis(o, a, e) && (n._isPointerOut(r, l) && n._pointerOut(), r || l)) {
        if (s && !l) {
          l = s.getNeighborPoint(o, a);
          if (!n._stickyHovering && !!l && !l.coordsIn(o, a)) {
            l = null;
          }
          if (s !== n.hoveredSeries) {
            n._setTimeout(function () {
              n._setHoveredSeries(s);
              n._setStuckSeries(e, s, o, a);
              n._pointerComplete(l, o, a);
            }, s);
            return;
          }
        } else {
          if (l) {
            if (e.type !== d.default.move && e.pointerType !== "touch") {
              return;
            }
            if (n.hoveredSeries) {
              n._setTimeout(function () {
                return n._pointerOnPoint(l, o, a, e);
              }, l);
            } else {
              n._pointerOnPoint(l, o, a, e);
            }
            return;
          }
          var u;
          if (n._setStuckSeries(e, undefined, o, a) && n._stickyHovering) {
            s = n._stuckSeries;
            l = s.getNeighborPoint(o, a);
            n._releaseHoveredSeries();
            if ((u = l) === null || u === undefined ? undefined : u.getMarkerVisibility()) {
              n._setHoveredPoint(l);
            }
          } else if (!n._stickyHovering) {
            n._pointerOut();
          }
        }
        n._pointerComplete(l, o, a);
      }
    }
  },
  _pointerOnPoint: function (e, t, n) {
    this._resetHoveredArgument();
    this._setHoveredPoint(e);
    this._pointerComplete(e, t, n);
  },
  _pointerComplete: function (e) {
    if (this.pointAtShownTooltip !== e && this._tooltip.isEnabled()) {
      this._showTooltip(e);
    }
  },
  _clickHandler: function (e) {
    var n = e.data.tracker;
    if (!n._isHolding) {
      var i = n._renderer.getRootOffset();
      var o = m(e.pageX - i.left);
      var a = m(e.pageY - i.top);
      var r = S(e, "chart-data-point");
      var s = n._stuckSeries || S(e, "chart-data-series") || r?.series;
      var l = n._argumentAxis;
      if (n._legend.coordsIn(o, a)) {
        var u = n._legend.getItemByCoord(o, a);
        if (u) {
          n._legendClick(u, e);
        }
      } else if (l != null && l.coordsIn(o, a)) {
        var d = S(e, "chart-data-argument", true);
        if ((0, h.isDefined)(d)) {
          n._eventTrigger("argumentAxisClick", {
            argument: d,
            event: e
          });
        }
      } else if (s) {
        var c;
        if ((c = r = r || s.getPointByCoord(o, a)) !== null && c !== undefined && c.getMarkerVisibility()) {
          n._pointClick(r, e);
        } else if (S(e, "chart-data-series")) {
          n._eventTrigger("seriesClick", {
            target: s,
            event: e
          });
        }
      }
    }
  },
  dispose: function () {
    this._disableOutHandler();
    this._renderer.root.off(".dxChartTracker");
    this._seriesGroup.off(".dxChartTracker");
  }
};
function T(e) {
  this.ctor(e);
}
exports.ChartTracker = T;
(0, r.extend)(T.prototype, I, {
  _pointClick: function (e, t) {
    var n = this._eventTrigger;
    var i = e.series;
    var o = {
      target: e,
      event: t
    };
    n("pointClick", o, function () {
      if (!k(o, i, "point")) {
        n("seriesClick", {
          target: i,
          event: t
        });
      }
    });
  },
  update: function (e) {
    I.update.call(this, e);
    this._argumentAxis = e.argumentAxis || {};
    this._axisHoverEnabled = this._argumentAxis && (0, u.normalizeEnum)(this._argumentAxis.getOptions().hoverMode) === "allargumentpoints";
    this._rotated = e.rotated;
    this._crosshair = e.crosshair;
    this._stickyHovering = e.stickyHovering;
  },
  _getCanvas: function (e, t) {
    for (var n = this._canvases || [], i = 0; i < n.length; i++) {
      var o = n[i];
      if ((0, u.pointInCanvas)(o, e, t)) {
        return o;
      }
    }
    return null;
  },
  _isPointerOut: function (e) {
    return !e && this._stuckSeries;
  },
  _hideCrosshair: function () {
    var e;
    if ((e = this._crosshair) !== null && e !== undefined) {
      e.hide();
    }
  },
  _moveCrosshair: function (e, t, n) {
    if (this._crosshair && e != null && e.isVisible()) {
      this._crosshair.show({
        point: e,
        x: t,
        y: n
      });
    }
  },
  _clean: function () {
    I._clean.call(this);
    this._resetTimer();
    this._stuckSeries = null;
  },
  _getSeriesForShared: function (e, t) {
    var i = [];
    var o = null;
    var a = Infinity;
    if (this._tooltip.isShared() && !this.hoveredSeries) {
      (0, s.each)(this._storedSeries, function (n, o) {
        var a = o.getNeighborPoint(e, t);
        if (a) {
          i.push(a);
        }
      });
      (0, s.each)(i, function (n, i) {
        var r = i.getCrosshairData(e, t);
        var s = (0, u.getDistance)(e, t, r.x, r.y);
        if (s < a) {
          o = i;
          a = s;
        }
      });
    }
    return o?.series;
  },
  _setTimeout: function (e, t) {
    var n = this;
    if (n._timeoutKeeper !== t) {
      n._resetTimer();
      n._hoverTimeout = setTimeout(function () {
        e();
        n._timeoutKeeper = null;
      }, 100);
      n._timeoutKeeper = t;
    }
  },
  _resetTimer: function () {
    clearTimeout(this._hoverTimeout);
    this._timeoutKeeper = this._hoverTimeout = null;
  },
  _stopEvent: function (e) {
    if (!(0, h.isDefined)(e.cancelable) || !!e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
  },
  _setStuckSeries: function (e, t, n, i) {
    if (e.pointerType !== "mouse") {
      this._stuckSeries = null;
    } else {
      this._stuckSeries = t || this._stuckSeries || this._getSeriesForShared(n, i);
    }
    return !!this._stuckSeries;
  },
  _pointerOut: function () {
    var e = this;
    e._stuckSeries = null;
    e._hideCrosshair();
    e._resetTimer();
    I._pointerOut.apply(e, arguments);
  },
  _hoverArgumentAxis: function (e, t, n) {
    this._resetHoveredArgument();
    if (this._axisHoverEnabled && this._argumentAxis.coordsIn(e, t)) {
      this._hoverArgument(S(n, "chart-data-argument", true));
      return true;
    }
  },
  _pointerComplete: function (e, t, n) {
    if (this.hoveredSeries) {
      this.hoveredSeries.updateHover(t, n);
    }
    this._resetTimer();
    this._moveCrosshair(e, t, n);
    I._pointerComplete.call(this, e);
  },
  _legendClick: function (e, t) {
    var n = this._storedSeries[e.id];
    this._triggerLegendClick({
      target: n,
      event: t
    }, "seriesClick");
  },
  _hoverLegendItem: function (e, t) {
    this._stuckSeries = null;
    this._hideCrosshair();
    I._hoverLegendItem.call(this, e, t);
  },
  _pointerOnPoint: function (e, t, n, i) {
    this._setStuckSeries(i, e.series, t, n);
    this._releaseHoveredSeries();
    I._pointerOnPoint.call(this, e, t, n, i);
  },
  _notifyLegendOnHoverArgument: false,
  _getArgumentHoverMode: function () {
    return D(this._argumentAxis);
  },
  dispose: function () {
    this._resetTimer();
    I.dispose.call(this);
  }
});
function E(e) {
  this.ctor(e);
}
exports.PieTracker = E;
(0, r.extend)(E.prototype, I, {
  _isPointerOut: function (e, t) {
    return !t;
  },
  _legendClick: function (e, t) {
    var n = [];
    this._storedSeries.forEach(function (t) {
      return n.push.apply(n, t.getPointsByKeys(e.argument, e.argumentIndex));
    });
    this._eventTrigger("legendClick", {
      target: e.argument,
      points: n,
      event: t
    });
  },
  _pointClick: function (e, t) {
    this._eventTrigger("pointClick", {
      target: e,
      event: t
    });
  },
  _hoverLegendItem: function (e, t) {
    var n = this._legend.getItemByCoord(e, t);
    if (n && this._hoveredArgument !== n.argument) {
      this._resetHoveredArgument();
      this._hoverArgument(n.argument, n.argumentIndex);
    } else if (!n) {
      this.clearHover();
    }
  },
  _getArgumentHoverMode: function () {
    return D(this._legend);
  },
  _hoverArgumentAxis: f.noop,
  _setStuckSeries: f.noop,
  _getCanvas: f.noop,
  _notifyLegendOnHoverArgument: true
});