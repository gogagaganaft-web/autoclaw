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
exports.overlapping = exports.BaseChart = undefined;
var o = require("./20576.js");
var a = S(require("./55994.js"));
var r = require("./35922.js");
var s = require("./95479.js");
var l = require("./13306.js");
var u = require("./39611.js");
var d = S(require("./59063.js"));
var c = require("./16342.js");
var h = require("./45865.js");
var f = require("./54932.js");
var p = require("./99327.js");
var g = require("./21495.js");
var m = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = C(t);
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
}(require("./19957.js"));
var _ = require("./19157.js");
var v = require("./82454.js");
var y = require("./17384.js");
var b = require("./1539.js");
var x = require("./14371.js");
var w = require("./64758.js");
function C(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (C = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var k = Array.isArray;
var D = ["_reinit", "_updateDataSource", "_dataInit", "_forceRender", "_resize"];
function I(e, t) {
  var n = t.end - t.start;
  var i = 0;
  for (e.forEach(function (e) {
    i += e.getBoundingRect().width;
  }); n < i;) {
    i -= T(e);
  }
}
function T(e) {
  var t = e.reduce(function (e, t, n) {
    if (!t) {
      return e;
    }
    var i = t.value();
    if (i < e.value) {
      return {
        value: i,
        rollingStock: t,
        index: n
      };
    } else {
      return e;
    }
  }, {
    rollingStock: undefined,
    value: Infinity,
    index: undefined
  });
  t.rollingStock.getLabels()[0].draw(false);
  var n = t.rollingStock.getBoundingRect().width;
  e[t.index] = null;
  return n;
}
function E(e) {
  var t;
  var n;
  var i;
  var o;
  var a = false;
  t = 0;
  i = e.length - 1;
  for (; t < i; t++) {
    n = t + 1;
    o = e.length;
    for (; n < o; n++) {
      if (t !== n && O(e[t], e[n], true)) {
        a = true;
        break;
      }
    }
    if (a) {
      break;
    }
  }
  return a;
}
function O(e, t, n) {
  if (e && t) {
    var i = e.getBoundingRect();
    var o = t.getBoundingRect();
    var a = !n || i.oppositeStart <= o.oppositeStart && i.oppositeEnd > o.oppositeStart || o.oppositeStart <= i.oppositeStart && o.oppositeEnd > i.oppositeStart;
    return i.end > o.start && a;
  }
}
function A(e) {
  var t = [];
  var n = [];
  e.forEach(function (e) {
    if (e.value() > 0) {
      t.push(e);
    } else {
      n.unshift(e);
    }
  });
  return t.concat(n);
}
function P(e) {
  var t;
  var n;
  var i;
  for (t = 0; t < e.length - 1; t++) {
    if (O(n = i || e[t], e[t + 1])) {
      n.toChain(e[t + 1]);
      e[t + 1] = null;
      i = n;
    } else {
      i = e[t + 1] || n;
    }
  }
}
function M(e, t) {
  var n;
  var i;
  var o;
  var a;
  var r;
  for (n = 0; n < e.length; n++) {
    if (R(o = e[n], t)) {
      r = o.getBoundingRect();
      i = n + 1;
      for (; i < e.length; i++) {
        if ((a = e[i]) && a.getBoundingRect().end > r.start - (r.end - t.end)) {
          a.toChain(o);
          e[n] = o = null;
          break;
        }
      }
    }
    if (o) {
      o.setRollingStockInCanvas(t);
    }
  }
}
function R(e, t) {
  return e && e.getBoundingRect().end > t.end;
}
function B(e, t, n) {
  var i = e.getBoundingRect();
  var o = i.x;
  var a = i.y;
  var r = i.x + i.width;
  var s = i.y + i.height;
  this.labels = [e];
  this.shiftFunction = n;
  this._bBox = {
    start: t ? o : a,
    width: t ? i.width : i.height,
    end: t ? r : s,
    oppositeStart: t ? a : o,
    oppositeEnd: t ? s : r
  };
  this._initialPosition = t ? i.x : i.y;
  return this;
}
B.prototype = {
  toChain: function (e) {
    var t = e.getBoundingRect();
    e.shift(t.start - this._bBox.end);
    this._changeBoxWidth(t.width);
    this.labels = this.labels.concat(e.labels);
  },
  getBoundingRect: function () {
    return this._bBox;
  },
  shift: function (e) {
    var t = this.shiftFunction;
    (0, s.each)(this.labels, function (n, i) {
      var o = i.getBoundingRect();
      var a = t(o, e);
      if (!i.hideInsideLabel(a)) {
        i.shift(a.x, a.y);
      }
    });
    this._bBox.end -= e;
    this._bBox.start -= e;
  },
  setRollingStockInCanvas: function (e) {
    if (this._bBox.end > e.end) {
      this.shift(this._bBox.end - e.end);
    }
  },
  getLabels: function () {
    return this.labels;
  },
  value: function () {
    return this.labels[0].getData().value;
  },
  getInitialPosition: function () {
    return this._initialPosition;
  },
  _changeBoxWidth: function (e) {
    this._bBox.end += e;
    this._bBox.width += e;
  }
};
var L = {
  resolveLabelOverlappingInOneDirection: function (e, t, n, i, o) {
    var a;
    var r = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function () {
      return 0;
    };
    var s = [];
    var l = {
      start: n ? t.left : t.top,
      end: n ? t.width - t.right : t.height - t.bottom
    };
    var u = false;
    e.forEach(function (e) {
      if (e) {
        u = u || e.series.isStackedSeries() || e.series.isFullStackedSeries();
        e.getLabels().forEach(function (e) {
          if (e.isVisible()) {
            s.push(new B(e, n, o));
          }
        });
      }
    });
    if (u) {
      if (!n ^ i) {
        s.reverse();
      }
      a = i ? s : A(s);
    } else {
      var d = s.slice();
      a = s.sort(function (e, t) {
        return r(e, t) || e.getInitialPosition() - t.getInitialPosition() || d.indexOf(e) - d.indexOf(t);
      });
    }
    return !!E(a) && (I(a, l), P(a), a.reverse(), M(a, l), true);
  }
};
exports.overlapping = L;
var V = d.default.inherit({
  _eventsMap: {
    onSeriesClick: {
      name: "seriesClick"
    },
    onPointClick: {
      name: "pointClick"
    },
    onArgumentAxisClick: {
      name: "argumentAxisClick"
    },
    onLegendClick: {
      name: "legendClick"
    },
    onSeriesSelectionChanged: {
      name: "seriesSelectionChanged"
    },
    onPointSelectionChanged: {
      name: "pointSelectionChanged"
    },
    onSeriesHoverChanged: {
      name: "seriesHoverChanged"
    },
    onPointHoverChanged: {
      name: "pointHoverChanged"
    },
    onDone: {
      name: "done",
      actionSettings: {
        excludeValidators: ["disabled"]
      }
    },
    onZoomStart: {
      name: "zoomStart"
    },
    onZoomEnd: {
      name: "zoomEnd"
    }
  },
  _fontFields: ["legend.font", "legend.title.font", "legend.title.subtitle.font", "commonSeriesSettings.label.font"],
  _rootClassPrefix: "dxc",
  _rootClass: "dxc-chart",
  _initialChanges: ["INIT"],
  _themeDependentChanges: ["REFRESH_SERIES_REINIT"],
  _getThemeManagerOptions: function () {
    var e = this.callBase.apply(this, arguments);
    e.options = this.option();
    return e;
  },
  _createThemeManager: function () {
    var e = this.option();
    var t = new p.ThemeManager(this._getThemeManagerOptions());
    t.setTheme(e.theme, e.rtlEnabled);
    return t;
  },
  _initCore: function () {
    this._canvasClipRect = this._renderer.clipRect();
    this._createHtmlStructure();
    this._createLegend();
    this._createTracker();
    this._needHandleRenderComplete = true;
    this.layoutManager = new g.LayoutManager();
    this._createScrollBar();
    a.default.on(this._$element, "contextmenu", function (e) {
      if ((0, u.isTouchEvent)(e) || (0, u.isPointerEvent)(e)) {
        e.preventDefault();
      }
    });
    a.default.on(this._$element, "MSHoldVisual", function (e) {
      e.preventDefault();
    });
  },
  _getLayoutItems: o.noop,
  _layoutManagerOptions: function () {
    return this._themeManager.getOptions("adaptiveLayout");
  },
  _reinit: function () {
    (0, _.setCanvasValues)(this._canvas);
    this._reinitAxes();
    this._requestChange(["DATA_SOURCE", "DATA_INIT", "CORRECT_AXIS", "FULL_RENDER"]);
  },
  _correctAxes: o.noop,
  _createHtmlStructure: function () {
    var e = this;
    var t = e._renderer;
    var n = t.root;
    function i() {
      return t.g().attr({
        class: "dxc-constant-lines-group"
      }).linkOn(n, "constant-lines");
    }
    e._constantLinesGroup = {
      dispose: function () {
        this.under.dispose();
        this.above.dispose();
      },
      linkOff: function () {
        this.under.linkOff();
        this.above.linkOff();
      },
      clear: function () {
        this.under.linkRemove().clear();
        this.above.linkRemove().clear();
      },
      linkAppend: function () {
        this.under.linkAppend();
        this.above.linkAppend();
      }
    };
    e._labelsAxesGroup = t.g().attr({
      class: "dxc-elements-axes-group"
    });
    function o() {
      e._labelsAxesGroup.linkOn(n, "elements");
    }
    e._backgroundRect = t.rect().attr({
      fill: "gray",
      opacity: 0.0001
    }).append(n);
    e._panesBackgroundGroup = t.g().attr({
      class: "dxc-background"
    }).append(n);
    e._stripsGroup = t.g().attr({
      class: "dxc-strips-group"
    }).linkOn(n, "strips");
    e._gridGroup = t.g().attr({
      class: "dxc-grids-group"
    }).linkOn(n, "grids");
    e._panesBorderGroup = t.g().attr({
      class: "dxc-border"
    }).linkOn(n, "border");
    e._axesGroup = t.g().attr({
      class: "dxc-axes-group"
    }).linkOn(n, "axes");
    e._executeAppendBeforeSeries(o);
    e._stripLabelAxesGroup = t.g().attr({
      class: "dxc-strips-labels-group"
    }).linkOn(n, "strips-labels");
    e._constantLinesGroup.under = i();
    e._seriesGroup = t.g().attr({
      class: "dxc-series-group"
    }).linkOn(n, "series");
    e._executeAppendAfterSeries(o);
    e._constantLinesGroup.above = i();
    e._scaleBreaksGroup = t.g().attr({
      class: "dxc-scale-breaks"
    }).linkOn(n, "scale-breaks");
    e._labelsGroup = t.g().attr({
      class: "dxc-labels-group"
    }).linkOn(n, "labels");
    e._crosshairCursorGroup = t.g().attr({
      class: "dxc-crosshair-cursor"
    }).linkOn(n, "crosshair");
    e._legendGroup = t.g().attr({
      class: "dxc-legend",
      "clip-path": e._getCanvasClipRectID()
    }).linkOn(n, "legend").linkAppend(n).enableLinks();
    e._scrollBarGroup = t.g().attr({
      class: "dxc-scroll-bar"
    }).linkOn(n, "scroll-bar");
  },
  _executeAppendBeforeSeries: function () {},
  _executeAppendAfterSeries: function () {},
  _disposeObjectsInArray: function (e, t) {
    (0, s.each)(this[e] || [], function (e, n) {
      if (t && n) {
        (0, s.each)(t, function (e, t) {
          if (n[t]) {
            n[t].dispose();
          }
        });
      } else if (n) {
        n.dispose();
      }
    });
    this[e] = null;
  },
  _disposeCore: function () {
    var e = this;
    function t(t) {
      if (e[t]) {
        e[t].dispose();
        e[t] = null;
      }
    }
    function n(t) {
      e[t].linkOff();
    }
    var i = this._disposeObjectsInArray;
    e._renderer.stopAllAnimations();
    i.call(e, "series");
    t("_tracker");
    t("_crosshair");
    e.layoutManager = e._userOptions = e._canvas = e._groupsData = null;
    n("_stripsGroup");
    n("_gridGroup");
    n("_axesGroup");
    n("_constantLinesGroup");
    n("_stripLabelAxesGroup");
    n("_panesBorderGroup");
    n("_seriesGroup");
    n("_labelsGroup");
    n("_crosshairCursorGroup");
    n("_legendGroup");
    n("_scrollBarGroup");
    n("_scaleBreaksGroup");
    t("_canvasClipRect");
    t("_panesBackgroundGroup");
    t("_backgroundRect");
    t("_stripsGroup");
    t("_gridGroup");
    t("_axesGroup");
    t("_constantLinesGroup");
    t("_stripLabelAxesGroup");
    t("_panesBorderGroup");
    t("_seriesGroup");
    t("_labelsGroup");
    t("_crosshairCursorGroup");
    t("_legendGroup");
    t("_scrollBarGroup");
    t("_scaleBreaksGroup");
  },
  _getAnimationOptions: function () {
    return this._themeManager.getOptions("animation");
  },
  _getDefaultSize: function () {
    return {
      width: 400,
      height: 400
    };
  },
  _getOption: function (e) {
    return this._themeManager.getOptions(e);
  },
  _applySize: function (e) {
    this._rect = e.slice();
    if (!this._changes.has("FULL_RENDER")) {
      this._processRefreshData("_resize");
    }
  },
  _resize: function () {
    this._doRender(this.__renderOptions || {
      animate: false,
      isResize: true
    });
  },
  _trackerType: "ChartTracker",
  _createTracker: function () {
    this._tracker = new m[this._trackerType]({
      seriesGroup: this._seriesGroup,
      renderer: this._renderer,
      tooltip: this._tooltip,
      legend: this._legend,
      eventTrigger: this._eventTrigger
    });
  },
  _getTrackerSettings: function () {
    return (0, l.extend)({
      chart: this
    }, this._getSelectionModes());
  },
  _getSelectionModes: function () {
    var e = this._themeManager;
    return {
      seriesSelectionMode: e.getOptions("seriesSelectionMode"),
      pointSelectionMode: e.getOptions("pointSelectionMode")
    };
  },
  _updateTracker: function (e) {
    this._tracker.update(this._getTrackerSettings());
    this._tracker.setCanvases({
      left: 0,
      right: this._canvas.width,
      top: 0,
      bottom: this._canvas.height
    }, e);
  },
  _createCanvasFromRect: function (e) {
    var t = this._canvas;
    return (0, _.setCanvasValues)({
      left: e[0],
      top: e[1],
      right: t.width - e[2],
      bottom: t.height - e[3],
      width: t.width,
      height: t.height
    });
  },
  _doRender: function (e) {
    if (this._canvas.width !== 0 || this._canvas.height !== 0) {
      this._resetIsReady();
      var t = this._prepareDrawOptions(e);
      var n = t.recreateCanvas;
      this._preserveOriginalCanvas();
      if (n) {
        this.__currentCanvas = this._canvas;
      } else {
        this._canvas = this.__currentCanvas;
      }
      if (n) {
        this._updateCanvasClipRect(this._canvas);
      }
      this._canvas = this._createCanvasFromRect(this._rect);
      this._renderer.stopAllAnimations(true);
      this._cleanGroups();
      var i = new Date();
      this._renderElements(t);
      this._lastRenderingTime = new Date() - i;
    }
  },
  _preserveOriginalCanvas: function () {
    this.__originalCanvas = this._canvas;
    this._canvas = (0, l.extend)({}, this._canvas);
  },
  _layoutAxes: o.noop,
  _renderElements: function (e) {
    var t;
    var n;
    var i;
    var o = this;
    var a = o._prepareToRender(e);
    var r = o._isRotated();
    var s = o._isLegendInside();
    var u = [];
    (0, l.extend)({}, o._canvas);
    o._renderer.lock();
    if (e.drawLegend && o._legend) {
      o._legendGroup.linkAppend();
    }
    o.layoutManager.setOptions(o._layoutManagerOptions());
    var d = o._getLayoutTargets();
    this._layoutAxes(function (t) {
      var n = t ? (0, l.extend)({}, e, {
        animate: false,
        recreateCanvas: true
      }) : e;
      var i = o._renderAxes(n, a);
      o._shrinkAxes(t, i);
    });
    o._applyClipRects(a);
    o._appendSeriesGroups();
    o._createCrosshairCursor();
    d.forEach(function (e) {
      var t = e.canvas;
      u.push({
        left: t.left,
        right: t.width - t.right,
        top: t.top,
        bottom: t.height - t.bottom
      });
    });
    if (o._scrollBar) {
      if ((t = o._argumentAxes[0].getTranslator().getBusinessRange()).axisType === "discrete" && t.categories && t.categories.length <= 1 || t.axisType !== "discrete" && t.min === t.max) {
        n = i = undefined;
      } else {
        n = t.minVisible;
        i = t.maxVisible;
      }
      o._scrollBar.init(t, !o._argumentAxes[0].getOptions().valueMarginsEnabled).setPosition(n, i);
    }
    o._updateTracker(u);
    o._updateLegendPosition(e, s);
    o._applyPointMarkersAutoHiding();
    o._renderSeries(e, r, s);
    o._renderGraphicObjects();
    o._renderer.unlock();
  },
  _updateLegendPosition: o.noop,
  _createCrosshairCursor: o.noop,
  _appendSeriesGroups: function () {
    this._seriesGroup.linkAppend();
    this._labelsGroup.linkAppend();
    this._appendAdditionalSeriesGroups();
  },
  _renderSeries: function (e, t, n) {
    this._calculateSeriesLayout(e, t);
    this._renderSeriesElements(e, n);
  },
  _calculateSeriesLayout: function (e, t) {
    e.hideLayoutLabels = this.layoutManager.needMoreSpaceForPanesCanvas(this._getLayoutTargets(), t) && !this._themeManager.getOptions("adaptiveLayout").keepLabels;
    this._updateSeriesDimensions(e);
  },
  _getArgFilter: function () {
    return function () {
      return true;
    };
  },
  _getValFilter: function (e) {
    return function () {
      return true;
    };
  },
  _getPointsToAnimation: function (e) {
    var t = this;
    var n = this._getArgFilter();
    return e.map(function (e) {
      var i = t._getValFilter(e);
      return e.getPoints().filter(function (e) {
        return e.getOptions().visible && n(e.argument) && (i(e.getMinValue(true)) || i(e.getMaxValue(true)));
      }).length;
    });
  },
  _renderSeriesElements: function (e, t) {
    var n = this;
    var i = n.series;
    var o = n._themeManager.getOptions("resolveLabelOverlapping");
    var a = n._getPointsToAnimation(i);
    i.forEach(function (t, i) {
      n._applyExtraSettings(t, e);
      var o = e.animate && a[i] <= e.animationPointsLimit && n._renderer.animationEnabled();
      t.draw(o, e.hideLayoutLabels, n._getLegendCallBack(t));
    });
    if (o === "none") {
      n._adjustSeriesLabels(false);
    } else {
      n._locateLabels(o);
    }
    n._renderTrackers(t);
    n._tracker.repairTooltip();
    n._renderExtraElements();
    n._clearCanvas();
    n._seriesElementsDrawn = true;
  },
  _changesApplied: function () {
    if (this._seriesElementsDrawn) {
      this._seriesElementsDrawn = false;
      this._drawn();
      this._renderCompleteHandler();
    }
  },
  _locateLabels: function (e) {
    this._resolveLabelOverlapping(e);
  },
  _renderExtraElements: function () {},
  _clearCanvas: function () {
    this._canvas = this.__originalCanvas;
  },
  _resolveLabelOverlapping: function (e) {
    var t;
    switch (e) {
      case "stack":
        t = this._resolveLabelOverlappingStack;
        break;
      case "hide":
        t = this._resolveLabelOverlappingHide;
        break;
      case "shift":
        t = this._resolveLabelOverlappingShift;
    }
    return (0, r.isFunction)(t) && t.call(this);
  },
  _getVisibleSeries: function () {
    return (0, o.grep)(this.getAllSeries(), function (e) {
      return e.isVisible();
    });
  },
  _resolveLabelOverlappingHide: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    var r;
    var s;
    var l;
    var u = [];
    var d = this._getVisibleSeries();
    for (o = 0; o < d.length; o++) {
      r = d[o].getVisiblePoints();
      a = 0;
      for (; a < r.length; a++) {
        u.push.apply(u, r[a].getLabels());
      }
    }
    for (o = 0; o < u.length; o++) {
      if ((e = u[o]).isVisible()) {
        n = e.getBoundingRect();
        a = o + 1;
        for (; a < u.length; a++) {
          i = (t = u[a]).getBoundingRect();
          l = i;
          if (((s = n).x <= l.x && l.x <= s.x + s.width || s.x >= l.x && s.x <= l.x + l.width) && (s.y <= l.y && l.y <= s.y + s.height || s.y >= l.y && s.y <= l.y + l.height)) {
            t.draw(false);
          }
        }
      }
    }
  },
  _cleanGroups: function () {
    this._stripsGroup.linkRemove().clear();
    this._gridGroup.linkRemove().clear();
    this._axesGroup.linkRemove().clear();
    this._constantLinesGroup.clear();
    this._stripLabelAxesGroup.linkRemove().clear();
    this._labelsGroup.linkRemove().clear();
    this._crosshairCursorGroup.linkRemove().clear();
    this._scaleBreaksGroup.linkRemove().clear();
  },
  _allowLegendInsidePosition: function () {
    return false;
  },
  _createLegend: function () {
    var e;
    var t;
    var n;
    e = this._legendDataField;
    var i = {
      getFormatObject: function (e) {
        var t = {
          [n.indexField]: e.id,
          [n.colorField]: e.states.normal.fill,
          [n.nameField]: e.text
        };
        return t;
      },
      textField: (n = {
        nameField: (t = e) + "Name",
        colorField: t + "Color",
        indexField: t + "Index"
      }).nameField
    };
    this._legend = new c.Legend({
      renderer: this._renderer,
      widget: this,
      group: this._legendGroup,
      backgroundClass: "dxc-border",
      itemGroupClass: "dxc-item",
      titleGroupClass: "dxc-title",
      textField: i.textField,
      getFormatObject: i.getFormatObject,
      allowInsidePosition: this._allowLegendInsidePosition()
    });
    this._updateLegend();
    this._layout.add(this._legend);
  },
  _updateLegend: function () {
    var e = this._themeManager;
    var t = e.getOptions("legend");
    var n = this._getLegendData();
    t.containerBackgroundColor = e.getOptions("containerBackgroundColor");
    t._incidentOccurred = this._incidentOccurred;
    this._legend.update(n, t, e.theme("legend").title);
    this._change(["LAYOUT"]);
  },
  _prepareDrawOptions: function (e) {
    var t = this._getAnimationOptions();
    var n = (0, l.extend)({}, {
      force: false,
      adjustAxes: true,
      drawLegend: true,
      drawTitle: true,
      animate: t.enabled,
      animationPointsLimit: t.maxPointCountSupported
    }, e, this.__renderOptions);
    if (!(0, r.isDefined)(n.recreateCanvas)) {
      n.recreateCanvas = n.adjustAxes && n.drawLegend && n.drawTitle;
    }
    return n;
  },
  _processRefreshData: function (e) {
    var t = D.indexOf(this._currentRefreshData);
    var n = D.indexOf(e);
    if (!this._currentRefreshData || t >= 0 && n < t) {
      this._currentRefreshData = e;
    }
    this._requestChange(["REFRESH"]);
  },
  _getLegendData: function () {
    return (0, _.map)(this._getLegendTargets(), function (e) {
      var t = e.legendData;
      var n = e.getLegendStyles;
      var i = n.normal.opacity;
      if (!e.visible) {
        if (!(0, r.isDefined)(i) || i > 0.3) {
          i = 0.3;
        }
        t.textOpacity = 0.3;
      }
      var o = {
        opacity: i
      };
      t.states = {
        hover: (0, l.extend)({}, n.hover, o),
        selection: (0, l.extend)({}, n.selection, o),
        normal: (0, l.extend)({}, n.normal, o)
      };
      return t;
    });
  },
  _getLegendOptions: function (e) {
    return {
      legendData: {
        text: e[this._legendItemTextField],
        id: e.index,
        visible: true
      },
      getLegendStyles: e.getLegendStyles(),
      visible: e.isVisible()
    };
  },
  _disposeSeries: function (e) {
    var t;
    if (this.series) {
      if ((0, r.isDefined)(e)) {
        this.series[e].dispose();
        this.series.splice(e, 1);
      } else {
        (0, s.each)(this.series, function (e, t) {
          return t.dispose();
        });
        this.series.length = 0;
      }
    }
    if ((t = this.series) === null || t === undefined || !t.length) {
      this.series = [];
    }
  },
  _disposeSeriesFamilies: function () {
    (0, s.each)(this.seriesFamilies || [], function (e, t) {
      t.dispose();
    });
    this.seriesFamilies = null;
    this._needHandleRenderComplete = true;
  },
  _optionChanged: function (e) {
    this._themeManager.resetOptions(e.name);
    this.callBase.apply(this, arguments);
  },
  _applyChanges: function () {
    var e = this;
    e._themeManager.update(e._options.silent());
    e.callBase.apply(e, arguments);
  },
  _optionChangesMap: {
    animation: "ANIMATION",
    dataSource: "DATA_SOURCE",
    palette: "PALETTE",
    paletteExtensionMode: "PALETTE",
    legend: "FORCE_DATA_INIT",
    seriesTemplate: "FORCE_DATA_INIT",
    export: "FORCE_RENDER",
    valueAxis: "AXES_AND_PANES",
    argumentAxis: "AXES_AND_PANES",
    commonAxisSettings: "AXES_AND_PANES",
    panes: "AXES_AND_PANES",
    commonPaneSettings: "AXES_AND_PANES",
    defaultPane: "AXES_AND_PANES",
    containerBackgroundColor: "AXES_AND_PANES",
    rotated: "ROTATED",
    autoHidePointMarkers: "REFRESH_SERIES_REINIT",
    customizePoint: "REFRESH_SERIES_REINIT",
    customizeLabel: "REFRESH_SERIES_REINIT",
    scrollBar: "SCROLL_BAR"
  },
  _optionChangesOrder: ["ROTATED", "PALETTE", "REFRESH_SERIES_REINIT", "USE_SPIDER_WEB", "AXES_AND_PANES", "INIT", "REINIT", "DATA_SOURCE", "REFRESH_SERIES_DATA_INIT", "DATA_INIT", "FORCE_DATA_INIT", "REFRESH_AXES", "CORRECT_AXIS"],
  _customChangesOrder: ["ANIMATION", "REFRESH_SERIES_FAMILIES", "FORCE_FIRST_DRAWING", "FORCE_DRAWING", "FORCE_RENDER", "VISUAL_RANGE", "SCROLL_BAR", "REINIT", "REFRESH", "FULL_RENDER"],
  _change_ANIMATION: function () {
    this._renderer.updateAnimationOptions(this._getAnimationOptions());
  },
  _change_DATA_SOURCE: function () {
    this._needHandleRenderComplete = true;
    this._updateDataSource();
  },
  _change_PALETTE: function () {
    this._themeManager.updatePalette();
    this._refreshSeries("DATA_INIT");
  },
  _change_REFRESH_SERIES_DATA_INIT: function () {
    this._refreshSeries("DATA_INIT");
  },
  _change_DATA_INIT: function () {
    if ((!this.series || !!this.needToPopulateSeries) && !this._changes.has("FORCE_DATA_INIT")) {
      this._dataInit();
    }
  },
  _change_FORCE_DATA_INIT: function () {
    this._dataInit();
  },
  _change_REFRESH_SERIES_FAMILIES: function () {
    this._processSeriesFamilies();
    this._populateBusinessRange();
    this._processRefreshData("_forceRender");
  },
  _change_FORCE_RENDER: function () {
    this._processRefreshData("_forceRender");
  },
  _change_AXES_AND_PANES: function () {
    this._refreshSeries("INIT");
  },
  _change_ROTATED: function () {
    this._createScrollBar();
    this._refreshSeries("INIT");
  },
  _change_REFRESH_SERIES_REINIT: function () {
    this._refreshSeries("INIT");
  },
  _change_REFRESH_AXES: function () {
    (0, _.setCanvasValues)(this._canvas);
    this._reinitAxes();
    this._requestChange(["CORRECT_AXIS", "FULL_RENDER"]);
  },
  _change_SCROLL_BAR: function () {
    this._createScrollBar();
    this._processRefreshData("_forceRender");
  },
  _change_REINIT: function () {
    this._processRefreshData("_reinit");
  },
  _change_FORCE_DRAWING: function () {
    this._resetComponentsAnimation();
  },
  _change_FORCE_FIRST_DRAWING: function () {
    this._resetComponentsAnimation(true);
  },
  _resetComponentsAnimation: function (e) {
    this.series.forEach(function (t) {
      t.resetApplyingAnimation(e);
    });
    this._resetAxesAnimation(e);
  },
  _resetAxesAnimation: o.noop,
  _refreshSeries: function (e) {
    this.needToPopulateSeries = true;
    this._requestChange([e]);
  },
  _change_CORRECT_AXIS: function () {
    this._correctAxes();
  },
  _doRefresh: function () {
    var e = this._currentRefreshData;
    if (e) {
      this._currentRefreshData = null;
      this._renderer.stopAllAnimations(true);
      this[e]();
    }
  },
  _updateCanvasClipRect: function (e) {
    var t = Math.max(e.width - e.left - e.right, 0);
    var n = Math.max(e.height - e.top - e.bottom, 0);
    this._canvasClipRect.attr({
      x: e.left,
      y: e.top,
      width: t,
      height: n
    });
    this._backgroundRect.attr({
      x: e.left,
      y: e.top,
      width: t,
      height: n
    });
  },
  _getCanvasClipRectID: function () {
    return this._canvasClipRect.id;
  },
  _dataSourceChangedHandler: function () {
    if (this._changes.has("INIT")) {
      this._requestChange(["DATA_INIT"]);
    } else {
      this._requestChange(["FORCE_DATA_INIT"]);
    }
  },
  _dataInit: function () {
    this._dataSpecificInit(true);
  },
  _processSingleSeries: function (e) {
    e.createPoints(false);
  },
  _handleSeriesDataUpdated: function () {
    var e = this;
    if (this._getVisibleSeries().some(function (e) {
      return e.useAggregation();
    })) {
      this._populateMarginOptions();
    }
    this.series.forEach(function (t) {
      return e._processSingleSeries(t);
    }, this);
  },
  _dataSpecificInit: function (e) {
    if (!this.series || !!this.needToPopulateSeries) {
      this.series = this._populateSeries();
    }
    this._repopulateSeries();
    this._seriesPopulatedHandlerCore();
    this._populateBusinessRange();
    this._tracker.updateSeries(this.series, this._changes.has("INIT"));
    this._updateLegend();
    if (e) {
      this._requestChange(["FULL_RENDER"]);
    }
  },
  _forceRender: function () {
    this._doRender({
      force: true
    });
  },
  _repopulateSeries: function () {
    var e = this._themeManager;
    var t = this._dataSourceItems();
    var n = e.getOptions("dataPrepareSettings");
    if (e.getOptions("seriesTemplate")) {
      this._populateSeries(t);
    }
    this._groupSeries();
    var i = (0, h.validateData)(t, this._groupsData, this._incidentOccurred, n);
    e.resetPalette();
    this.series.forEach(function (e) {
      e.updateData(i[e.getArgumentField()]);
    });
    this._handleSeriesDataUpdated();
  },
  _renderCompleteHandler: function () {
    var e = true;
    if (this._needHandleRenderComplete) {
      (0, s.each)(this.series, function (t, n) {
        e = e && n.canRenderCompleteHandle();
      });
      if (e) {
        this._needHandleRenderComplete = false;
        this._eventTrigger("done", {
          target: this
        });
      }
    }
  },
  _dataIsReady: function () {
    return (0, r.isDefined)(this.option("dataSource")) && this._dataIsLoaded();
  },
  _populateSeriesOptions: function (e) {
    var t;
    var n;
    var i = this;
    var o = i._themeManager;
    var a = o.getOptions("seriesTemplate");
    var s = a ? (0, _.processSeriesTemplate)(a, e || []) : i.option("series");
    for (var u = k(s) ? s : s ? [s] : [], d = i._getExtraOptions(), c = [], h = function (e) {
        i._specialProcessSeries();
        i._populateBusinessRange(e && e.getValueAxis(), true);
        i._renderer.stopAllAnimations(true);
        i._updateLegend();
        i._requestChange(["FULL_RENDER"]);
      }, f = 0; f < u.length; f++) {
      t = (0, l.extend)(true, {}, u[f], d);
      if (!(0, r.isDefined)(t.name) || t.name === "") {
        t.name = "Series " + (f + 1).toString();
      }
      t.rotated = i._isRotated();
      t.customizePoint = o.getOptions("customizePoint");
      t.customizeLabel = o.getOptions("customizeLabel");
      t.visibilityChanged = h;
      t.incidentOccurred = i._incidentOccurred;
      n = o.getOptions("series", t, u.length);
      if (i._checkPaneName(n)) {
        c.push(n);
      }
    }
    return c;
  },
  _populateSeries: function (e) {
    var n;
    var i = this;
    var o = [];
    var a = i._incidentOccurred;
    var r = i._populateSeriesOptions(e);
    var u = false;
    i.needToPopulateSeries = false;
    (0, s.each)(r, function (e, t) {
      var n = i.series && i.series.filter(function (e) {
        return e.name === t.name && o.map(function (e) {
          return e.series;
        }).indexOf(e) === -1;
      })[0];
      if (n && n.type === t.type) {
        o.push({
          series: n,
          options: t
        });
      } else {
        o.push({
          options: t
        });
        u = true;
      }
    });
    if (i.series?.length !== 0) {
      i._tracker.clearHover();
    }
    (0, s.reverseEach)(i.series, function (e, t) {
      if (!o.some(function (e) {
        return t === e.series;
      })) {
        i._disposeSeries(e);
        u = true;
      }
    });
    if (!u) {
      u = o.some(function (e) {
        return e.series.name !== r[e.series.index].name;
      });
    }
    i.series = [];
    if (u) {
      i._disposeSeriesFamilies();
    }
    i._themeManager.resetPalette();
    function d(e) {
      i.series.forEach(function (t) {
        t.notify(e);
      });
    }
    (0, s.each)(o, function (e, t) {
      var r;
      var s = t.options;
      var u = ((r = i._argumentAxes) === null || r === undefined ? undefined : r.filter(function (e) {
        return e.pane === s.pane;
      })[0]) ?? i.getArgumentAxis();
      var c = {
        commonSeriesModes: i._getSelectionModes(),
        argumentAxis: u,
        valueAxis: i._getValueAxis(s.pane, s.axis)
      };
      if (t.series) {
        (n = t.series).updateOptions(s, c);
      } else {
        n = new f.Series((0, l.extend)({
          renderer: i._renderer,
          seriesGroup: i._seriesGroup,
          labelsGroup: i._labelsGroup,
          eventTrigger: i._eventTrigger,
          eventPipe: d,
          incidentOccurred: a
        }, c), s);
      }
      if (n.isUpdated) {
        n.index = i.series.length;
        i.series.push(n);
      } else {
        a("E2101", [s.type]);
      }
    });
    return i.series;
  },
  getStackedPoints: function (e) {
    var t = e.series.getStackName();
    return this._getVisibleSeries().reduce(function (n, i) {
      if (!(0, r.isDefined)(i.getStackName()) || !(0, r.isDefined)(t) || t === i.getStackName()) {
        n = n.concat(i.getPointsByArg(e.argument));
      }
      return n;
    }, []);
  },
  getAllSeries: function () {
    return (this.series || []).slice();
  },
  getSeriesByName: function (e) {
    var t = null;
    (0, s.each)(this.series, function (n, i) {
      if (i.name === e) {
        t = i;
        return false;
      }
    });
    return t;
  },
  getSeriesByPos: function (e) {
    return (this.series || [])[e];
  },
  clearSelection: function () {
    this._tracker.clearSelection();
  },
  hideTooltip: function () {
    this._tracker._hideTooltip();
  },
  clearHover: function () {
    this._tracker.clearHover();
  },
  render: function (e) {
    var t = this;
    t.__renderOptions = e;
    t.__forceRender = e && e.force;
    t.callBase.apply(t, arguments);
    t.__renderOptions = t.__forceRender = null;
    return t;
  },
  refresh: function () {
    this._disposeSeries();
    this._disposeSeriesFamilies();
    this._requestChange(["CONTAINER_SIZE", "REFRESH_SERIES_REINIT"]);
  },
  _getMinSize: function () {
    var e = this._layoutManagerOptions();
    return [e.width, e.height];
  },
  _change_REFRESH: function () {
    if (this._changes.has("INIT")) {
      this._currentRefreshData = null;
    } else {
      this._doRefresh();
    }
  },
  _change_FULL_RENDER: function () {
    this._forceRender();
  },
  _change_INIT: function () {
    this._reinit();
  },
  _stopCurrentHandling: function () {
    this._tracker.stopCurrentHandling();
  }
});
exports.BaseChart = V;
["series", "commonSeriesSettings", "dataPrepareSettings", "seriesSelectionMode", "pointSelectionMode", "synchronizeMultiAxes", "resolveLabelsOverlapping"].forEach(function (e) {
  V.prototype._optionChangesMap[e] = "REFRESH_SERIES_DATA_INIT";
});
["adaptiveLayout", "crosshair", "resolveLabelOverlapping", "adjustOnZoom", "stickyHovering"].forEach(function (e) {
  V.prototype._optionChangesMap[e] = "FORCE_RENDER";
});
["minBubbleSize", "maxBubbleSize", "barGroupPadding", "barGroupWidth", "negativesAsZeroes", "negativesAsZeros"].forEach(function (e) {
  V.prototype._optionChangesMap[e] = "REFRESH_SERIES_FAMILIES";
});
V.addPlugin(v.plugin);
V.addPlugin(y.plugin);
V.addPlugin(b.plugin);
V.addPlugin(x.plugin);
V.addPlugin(w.plugin);
var F = V.prototype._change_TITLE;
V.prototype._change_TITLE = function () {
  F.apply(this, arguments);
  this._change(["FORCE_RENDER"]);
};