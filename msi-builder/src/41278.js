exports.Axis = undefined;
var i = require("./41583.js");
var o = require("./19157.js");
var a = require("./35922.js");
var r = k(require("./53805.js"));
var s = require("./13306.js");
var l = k(require("./30343.js"));
var u = require("./8587.js");
var d = require("./45971.js");
var c = require("./87276.js");
var h = require("./21177.js");
var f = require("./41013.js");
var p = require("./60810.js");
var g = k(require("./17381.js"));
var m = k(require("./91198.js"));
var _ = require("./20576.js");
var v = k(require("./99415.js"));
var y = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || D(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = S(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var i = {};
  var o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var a in e) {
    if (a !== "default" && Object.prototype.hasOwnProperty.call(e, a)) {
      var r = o ? Object.getOwnPropertyDescriptor(e, a) : null;
      if (r && (r.get || r.set)) {
        Object.defineProperty(i, a, r);
      } else {
        i[a] = e[a];
      }
    }
  }
  i.default = e;
  if (n) {
    n.set(e, i);
  }
  return i;
}(require("./4331.js"));
var b = k(require("./87713.js"));
var x = k(require("./54978.js"));
var w = require("./62754.js");
var C = require("./32945.js");
function S(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (S = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function k(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function D(e) {
  return (D = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function I(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (D(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (D(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (D(t) === "symbol") {
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
var T = r.default.convertTicksToValues;
var E = Math;
var O = E.abs;
var A = E.max;
var P = E.min;
var M = Array.isArray;
var R = r.default.top;
var B = r.default.bottom;
var L = r.default.left;
var V = r.default.right;
var F = r.default.center;
var H = "keep";
var N = "shift";
var z = "reset";
var j = 86400000;
var W = 604800000;
function G(e, t, n, i, o, a) {
  var s = a.allowNegatives;
  var l = a.linearThreshold;
  return (0, d.tickGenerator)({
    axisType: e.type,
    dataType: e.dataType,
    logBase: e.logarithmBase,
    allowNegatives: s,
    linearThreshold: l,
    axisDivisionFactor: o(e.axisDivisionFactor || 50),
    minorAxisDivisionFactor: o(e.minorAxisDivisionFactor || 15),
    numberMultipliers: e.numberMultipliers,
    calculateMinors: e.minorTick.visible || e.minorGrid.visible || e.calculateMinors,
    allowDecimals: e.allowDecimals,
    endOnTick: e.endOnTick,
    incidentOccurred: t,
    firstDayOfWeek: e.workWeek?.[0],
    skipTickGeneration: n,
    skipCalculationLimits: e.skipCalculationLimits,
    generateExtraTick: e.generateExtraTick,
    minTickInterval: e.minTickInterval,
    rangeIsEmpty: i
  });
}
function q(e, t, n) {
  var i = e.getOptions();
  return (0, f.tick)(e, t, i.tick, i.grid, n, false);
}
function $(e, t) {
  var n = e.getOptions();
  return (0, f.tick)(e, t, n.minorTick, n.minorGrid);
}
function U(e, t, n) {
  var i = e.getOptions();
  return (0, f.tick)(e, t, (0, s.extend)({}, i.tick, {
    visible: i.showCustomBoundaryTicks
  }), i.grid, undefined, false, n ? -1 : 1);
}
function K(e, t, n, i) {
  (e || []).forEach(function (e) {
    return e[t](n, i);
  });
}
function Z(e) {
  K(e, "initCoords");
}
function Y(e, t) {
  K(e, "drawMark", t);
}
function X(e, t) {
  K(e, "drawGrid", t);
}
function Q(e, t, n) {
  K(e, "updateTickPosition", t, n);
}
function J(e, t) {
  K(e, "updateGridPosition", t);
}
function ee(e) {
  for (var t = e.length - 1; t >= 0 && te(e, t); t--);
  for (t = 0; t < e.length && te(e, t); t++) {
    t--;
  }
}
function te(e, t) {
  return (e[t].coords.x === null || e[t].coords.y === null) && (e.splice(t, 1), true);
}
function ne(e, t) {
  if (E.asin((e[0].height + t.minSpacing) / (e[1].x - e[0].x)) * 180 / E.PI < 45) {
    return -45;
  } else {
    return -90;
  }
}
function ie(e, t, n) {
  e.forEach(function (e, i) {
    if (e.getContentContainer()) {
      if (i % t != 0) {
        e.removeLabel();
      } else if (n) {
        n(e, i);
      }
    }
  });
}
function oe(e, t) {
  if (e === undefined) {
    return t;
  } else if (e === null) {
    return undefined;
  } else {
    return e;
  }
}
function ae(e) {
  this._renderer = e.renderer;
  this._incidentOccurred = e.incidentOccurred;
  this._eventTrigger = e.eventTrigger;
  this._stripsGroup = e.stripsGroup;
  this._stripLabelAxesGroup = e.stripLabelAxesGroup;
  this._labelsAxesGroup = e.labelsAxesGroup;
  this._constantLinesGroup = e.constantLinesGroup;
  this._scaleBreaksGroup = e.scaleBreaksGroup;
  this._axesContainerGroup = e.axesContainerGroup;
  this._gridContainerGroup = e.gridGroup;
  this._axisCssPrefix = e.widgetClass + "-" + (e.axisClass ? e.axisClass + "-" : "");
  this._setType(e.axisType, e.drawingType);
  this._createAxisGroups();
  this._translator = this._createTranslator();
  this.isArgumentAxis = e.isArgumentAxis;
  this._viewport = {};
  this._prevDataInfo = {};
  this._firstDrawing = true;
  this._initRange = {};
  this._getTemplate = e.getTemplate;
}
exports.Axis = ae;
ae.prototype = {
  constructor: ae,
  _drawAxis: function () {
    var e = this._options;
    if (e.visible) {
      this._axisElement = this._createAxisElement();
      this._updateAxisElementPosition();
      this._axisElement.attr({
        "stroke-width": e.width,
        stroke: e.color,
        "stroke-opacity": e.opacity
      }).sharp(this._getSharpParam(true), this.getAxisSharpDirection()).append(this._axisLineGroup);
    }
  },
  _createPathElement: function (e, t, n) {
    return this.sharp(this._renderer.path(e, "line").attr(t), n);
  },
  sharp: function (e, t = 1) {
    return e.sharp(this._getSharpParam(), t);
  },
  customPositionIsAvailable: function () {
    return false;
  },
  getOrthogonalAxis: _.noop,
  getCustomPosition: _.noop,
  getCustomBoundaryPosition: _.noop,
  resolveOverlappingForCustomPositioning: _.noop,
  hasNonBoundaryPosition: function () {
    return false;
  },
  customPositionIsBoundaryOrthogonalAxis: function () {
    return false;
  },
  getResolvedBoundaryPosition: function () {
    return this.getOptions().position;
  },
  getAxisSharpDirection: function () {
    var e = this.getResolvedBoundaryPosition();
    if (this.hasNonBoundaryPosition() || e !== B && e !== V) {
      return 1;
    } else {
      return -1;
    }
  },
  getSharpDirectionByCoords: function (e) {
    var t = this._getCanvasStartEnd();
    var n = Math.max(t.start, t.end);
    if (this.getRadius) {
      return 0;
    } else if (n !== e[this._isHorizontal ? "x" : "y"]) {
      return 1;
    } else {
      return -1;
    }
  },
  _getGridLineDrawer: function () {
    var e = this;
    return function (t, n) {
      var i = e._getGridPoints(t.coords);
      if (i.points) {
        return e._createPathElement(i.points, n, e.getSharpDirectionByCoords(t.coords));
      } else {
        return null;
      }
    };
  },
  _getGridPoints: function (e) {
    var t = this._isHorizontal;
    var n = t ? "x" : "y";
    var i = this._orthogonalPositions;
    var o = i.start;
    var a = i.end;
    var r = this.borderOptions;
    var s = t ? L : R;
    var l = t ? V : B;
    var u = this.getCanvas();
    var d = {
      left: u.left,
      right: u.width - u.right,
      top: u.top,
      bottom: u.height - u.bottom
    };
    var c = 4 + (r.visible && r[s] ? d[s] : undefined);
    var h = (r.visible && r[l] ? d[l] : undefined) - 4;
    if (this.areCoordsOutsideAxis(e) || e[n] === undefined || e[n] < c || e[n] > h) {
      return {
        points: null
      };
    } else {
      return {
        points: t ? e[n] !== null ? [e[n], o, e[n], a] : null : e[n] !== null ? [o, e[n], a, e[n]] : null
      };
    }
  },
  _getConstantLinePos: function (e, t, n) {
    var i = this._getTranslatedCoord(e);
    if (!!(0, a.isDefined)(i) && !(i < P(t, n)) && !(i > A(t, n))) {
      return i;
    }
  },
  _getConstantLineGraphicAttributes: function (e) {
    var t = this._orthogonalPositions.start;
    var n = this._orthogonalPositions.end;
    return {
      points: this._isHorizontal ? [e, t, e, n] : [t, e, n, e]
    };
  },
  _createConstantLine: function (e, t) {
    return this._createPathElement(this._getConstantLineGraphicAttributes(e).points, t, (n = e, i = this._getCanvasStartEnd(), Math.max(i.start, i.end) !== n ? 1 : -1));
    var n;
    var i;
  },
  _drawConstantLineLabelText: function (e, t, n, i, a) {
    var r = i.font;
    var l = i.cssClass;
    return this._renderer.text(e, t, n).css((0, o.patchFontOptions)((0, s.extend)({}, this._options.label.font, r))).attr({
      align: "center",
      class: l
    }).append(a);
  },
  _drawConstantLineLabels: function (e, t, n, i) {
    var a = t.text;
    var r = this._options.label;
    this._checkAlignmentConstantLineLabels(t);
    a = a ?? this.formatLabel(e, r);
    var s = this._getConstantLineLabelsCoords(n, t);
    return this._drawConstantLineLabelText(a, s.x, s.y, t, i);
  },
  _getStripPos: function (e, t, n, i, o) {
    var r;
    var s;
    var l;
    var u;
    var d;
    var c = !!o.minVisible || !!o.maxVisible;
    var h = (o.categories || []).reduce(function (e, t) {
      e.push(t.valueOf());
      return e;
    }, []);
    if (!c && (0, a.isDefined)(e) && (0, a.isDefined)(t)) {
      var g = this.parser(e);
      var m = this.parser(t);
      u = h.indexOf((g == null ? undefined : g.valueOf()) ?? undefined);
      d = h.indexOf((m == null ? undefined : m.valueOf()) ?? undefined);
      if (u === -1 || d === -1) {
        return {
          from: 0,
          to: 0,
          outOfCanvas: true
        };
      }
      if (u > d) {
        l = t;
        t = e;
        e = l;
      }
    }
    if ((0, a.isDefined)(e)) {
      e = this.validateUnit(e, "E2105", "strip");
      r = this._getTranslatedCoord(e, -1);
    } else {
      r = n;
    }
    if ((0, a.isDefined)(t)) {
      t = this.validateUnit(t, "E2105", "strip");
      s = this._getTranslatedCoord(t, 1);
    } else {
      s = i;
    }
    var _ = r < s ? {
      from: r,
      to: s
    } : {
      from: s,
      to: r
    };
    var v = this.getVisibleArea();
    if (_.from <= v[0] && _.to <= v[0] || _.from >= v[1] && _.to >= v[1]) {
      _.outOfCanvas = true;
    }
    return _;
  },
  _getStripGraphicAttributes: function (e, t) {
    var n;
    var i;
    var o;
    var a;
    var r = this._orthogonalPositions;
    var s = r.start;
    var l = r.end;
    if (this._isHorizontal) {
      n = e;
      i = P(s, l);
      o = t - e;
      a = O(s - l);
    } else {
      n = P(s, l);
      i = e;
      o = O(s - l);
      a = O(e - t);
    }
    return {
      x: n,
      y: i,
      width: o,
      height: a
    };
  },
  _createStrip: function (e) {
    return this._renderer.rect(e.x, e.y, e.width, e.height);
  },
  _adjustStripLabels: function () {
    var e = this;
    this._strips.forEach(function (t) {
      if (t.label) {
        t.label.attr(e._getAdjustedStripLabelCoords(t));
      }
    });
  },
  _adjustLabelsCoord: function (e, t, n) {
    var i = this;
    function o(o) {
      return i._getLabelAdjustedCoord(o, e + (o.labelOffset || 0), t, n);
    }
    this._majorTicks.forEach(function (e) {
      if (e.label) {
        e.updateMultilineTextAlignment();
        e.label.attr(o(e));
      } else if (e.templateContainer) {
        e.templateContainer.attr(o(e));
      }
    });
  },
  _adjustLabels: function (e) {
    var t = this.getOptions();
    var n = t.position === t.label.position;
    var i = this._majorTicks.reduce(function (e, t) {
      if (!t.getContentContainer()) {
        return e;
      }
      var n = t.labelRotationAngle ? (0, o.rotateBBox)(t.labelBBox, [t.labelCoords.x, t.labelCoords.y], -t.labelRotationAngle) : t.labelBBox;
      return {
        width: A(e.width || 0, n.width),
        height: A(e.height || 0, n.height),
        offset: A(e.offset || 0, t.labelOffset || 0)
      };
    }, {});
    var a = n ? this._isHorizontal ? i.height : i.width : 0;
    this._adjustLabelsCoord(e, i.width);
    return e + a + (a && this._options.label.indentFromAxis) + (n ? i.offset : 0);
  },
  _getLabelAdjustedCoord: function (e, t, n) {
    t = t || 0;
    var i;
    var a;
    var r = this._options;
    var s = e.templateContainer && e.templateContainer.getBBox() || (0, o.rotateBBox)(e.labelBBox, [e.labelCoords.x, e.labelCoords.y], -e.labelRotationAngle || 0);
    var l = e.labelAlignment || r.label.alignment;
    var u = this._options.type === "discrete";
    var d = e.labelRotationAngle % 90 == 0;
    var c = r.label.indentFromAxis;
    var h = r.label.position;
    var f = this._axisPosition;
    var p = e.labelCoords;
    var g = p.x;
    if (this._isHorizontal) {
      a = h === B ? f + c - s.y + t : f - c - (s.y + s.height) - t;
      i = l === V ? u && d ? e.coords.x - (s.x + s.width) : g - s.x - s.width : l === L ? u && d ? g - s.x - (e.coords.x - g) : g - s.x : g - s.x - s.width / 2;
    } else {
      a = p.y - s.y - s.height / 2;
      if (h === L) {
        i = l === L ? f - c - n - s.x : l === F ? f - c - n / 2 - s.x - s.width / 2 : f - c - s.x - s.width;
        i -= t;
      } else {
        i = l === V ? f + c + n - s.x - s.width : l === F ? f + c + n / 2 - s.x - s.width / 2 : f + c - s.x;
        i += t;
      }
    }
    return {
      translateX: i,
      translateY: a
    };
  },
  _createAxisConstantLineGroups: function () {
    var e = this._renderer;
    var t = this._axisCssPrefix + "constant-lines";
    var n = e.g().attr({
      class: t
    });
    var i = e.g().attr({
      class: t
    });
    var o = e.g().attr({
      class: t
    });
    return {
      inside: n,
      outside1: i,
      left: i,
      top: i,
      outside2: o,
      right: o,
      bottom: o,
      remove: function () {
        this.inside.remove();
        this.outside1.remove();
        this.outside2.remove();
      },
      clear: function () {
        this.inside.clear();
        this.outside1.clear();
        this.outside2.clear();
      }
    };
  },
  _createAxisGroups: function () {
    var e = this._renderer;
    var t = this._axisCssPrefix;
    this._axisGroup = e.g().attr({
      class: t + "axis"
    }).enableLinks();
    this._axisStripGroup = e.g().attr({
      class: t + "strips"
    });
    this._axisGridGroup = e.g().attr({
      class: t + "grid"
    });
    this._axisElementsGroup = e.g().attr({
      class: t + "elements"
    });
    this._axisLineGroup = e.g().attr({
      class: t + "line"
    }).linkOn(this._axisGroup, "axisLine").linkAppend();
    this._axisTitleGroup = e.g().attr({
      class: t + "title"
    }).append(this._axisGroup);
    this._axisConstantLineGroups = {
      above: this._createAxisConstantLineGroups(),
      under: this._createAxisConstantLineGroups()
    };
    this._axisStripLabelGroup = e.g().attr({
      class: t + "axis-labels"
    });
  },
  _clearAxisGroups: function () {
    this._axisGroup.remove();
    this._axisStripGroup.remove();
    this._axisStripLabelGroup.remove();
    this._axisConstantLineGroups.above.remove();
    this._axisConstantLineGroups.under.remove();
    this._axisGridGroup.remove();
    this._axisTitleGroup.clear();
    if (!this._options.label.template || !this.isRendered()) {
      this._axisElementsGroup.remove();
      this._axisElementsGroup.clear();
    }
    if (this._axisLineGroup) {
      this._axisLineGroup.clear();
    }
    if (this._axisStripGroup) {
      this._axisStripGroup.clear();
    }
    if (this._axisGridGroup) {
      this._axisGridGroup.clear();
    }
    this._axisConstantLineGroups.above.clear();
    this._axisConstantLineGroups.under.clear();
    if (this._axisStripLabelGroup) {
      this._axisStripLabelGroup.clear();
    }
  },
  _getLabelFormatObject: function (e, t, n, o, a, r) {
    n = n || this._getViewportRange();
    var s = {
      value: e,
      valueText: (0, i.smartFormatter)(e, {
        labelOptions: t,
        ticks: r || T(this._majorTicks),
        tickInterval: a ?? this._tickInterval,
        dataType: this._options.dataType,
        logarithmBase: this._options.logarithmBase,
        type: this._options.type,
        showTransition: !this._options.marker.visible,
        point: o
      }) || "",
      min: n.minVisible,
      max: n.maxVisible
    };
    if (o) {
      s.point = o;
    }
    return s;
  },
  formatLabel: function (e, t, n, i, o, r) {
    var s = this._getLabelFormatObject(e, t, n, i, o, r);
    if ((0, a.isFunction)(t.customizeText)) {
      return t.customizeText.call(s, s);
    } else {
      return s.valueText;
    }
  },
  formatHint: function (e, t, n) {
    var i = this._getLabelFormatObject(e, t, n);
    if ((0, a.isFunction)(t.customizeHint)) {
      return t.customizeHint.call(i, i);
    } else {
      return undefined;
    }
  },
  formatRange: function (e, t, n, o) {
    return (0, i.formatRange)({
      startValue: e,
      endValue: t,
      tickInterval: n,
      argumentFormat: o,
      axisOptions: this.getOptions()
    });
  },
  _setTickOffset: function () {
    var e = this._options.discreteAxisDivisionMode;
    this._tickOffset = +(e !== "crossLabels" || !e);
  },
  aggregatedPointBetweenTicks: function () {
    return this._options.aggregatedPointsPosition === "crossTicks";
  },
  resetApplyingAnimation: function (e) {
    this._resetApplyingAnimation = true;
    if (e) {
      this._firstDrawing = true;
    }
  },
  isFirstDrawing: function () {
    return this._firstDrawing;
  },
  getMargins: function () {
    var e;
    var t;
    var n = this;
    var i = n._options;
    var o = i.position;
    var r = i.offset;
    var s = i.customPosition;
    var l = i.placeholderSize;
    var u = i.grid;
    var d = i.tick;
    var c = i.crosshairMargin;
    var h = (0, a.isDefined)(s);
    var f = n.getResolvedBoundaryPosition();
    var p = n.getCanvas();
    var g = p.left;
    var m = p.top;
    var _ = p.width - p.right;
    var v = p.height - p.bottom;
    var y = A(u.visible && u.width || 0, d.visible && d.width || 0);
    var b = n._axisConstantLineGroups.above;
    var x = n._axisConstantLineGroups.under;
    var w = [n._axisElementsGroup, b.outside1, b.outside2, x.outside1, x.outside2, n._axisLineGroup].map(function (e) {
      return e && e.getBBox();
    }).concat((e = n._axisTitleGroup, !(t = e && e.getBBox()) || t.isEmpty || (n._isHorizontal ? (t.x = g, t.width = _ - g) : (t.y = m, t.height = v - m)), t));
    var S = (0, C.calculateCanvasMargins)(w, p);
    S[o] += c;
    if (n.hasNonBoundaryPosition() && h) {
      S[f] = 0;
    }
    if (l) {
      S[o] = l;
    }
    if (y) {
      if (n._isHorizontal && p.right < y && S.right < y) {
        S.right = y;
      }
      if (!n._isHorizontal && p.bottom < y && S.bottom < y) {
        S.bottom = y;
      }
    }
    if (!h && (0, a.isDefined)(r)) {
      var k = n.customPositionIsBoundary() && (r > 0 && (f === L || f === R) || r < 0 && (f === V || f === B));
      S[f] -= k ? r : 0;
    }
    return S;
  },
  validateUnit: function (e, t, n) {
    if ((e = this.parser(e)) === undefined && t) {
      this._incidentOccurred(t, [n]);
    }
    return e;
  },
  _setType: function (e, t) {
    var n;
    switch (e) {
      case "xyAxes":
        n = v.default;
        break;
      case "polarAxes":
        n = y;
    }
    (0, s.extend)(this, n[t]);
  },
  _getSharpParam: function () {
    return true;
  },
  _disposeBreaksGroup: _.noop,
  dispose: function () {
    [this._axisElementsGroup, this._axisStripGroup, this._axisGroup].forEach(function (e) {
      e.dispose();
    });
    this._strips = this._title = null;
    this._axisStripGroup = this._axisConstantLineGroups = this._axisStripLabelGroup = this._axisBreaksGroup = null;
    this._axisLineGroup = this._axisElementsGroup = this._axisGridGroup = null;
    this._axisGroup = this._axisTitleGroup = null;
    this._axesContainerGroup = this._stripsGroup = this._constantLinesGroup = this._labelsAxesGroup = null;
    this._renderer = this._options = this._textOptions = this._textFontStyles = null;
    this._translator = null;
    this._majorTicks = this._minorTicks = null;
    this._disposeBreaksGroup();
    if (this._templatesRendered) {
      this._templatesRendered.reject();
    }
  },
  getOptions: function () {
    return this._options;
  },
  setPane: function (e) {
    this.pane = e;
    this._options.pane = e;
  },
  setTypes: function (e, t, n) {
    this._options.type = e || this._options.type;
    this._options[n] = t || this._options[n];
    this._updateTranslator();
  },
  resetTypes: function (e) {
    this._options.type = this._initTypes.type;
    this._options[e] = this._initTypes[e];
  },
  getTranslator: function () {
    return this._translator;
  },
  updateOptions: function (e) {
    var t = this;
    var n = e.label;
    (function (e) {
      var n;
      var i = e.label;
      var o = e.position;
      var a = e.isHorizontal ? B : L;
      var r = e.isHorizontal ? R : V;
      var s = i.position;
      if (o !== a && o !== r) {
        o = a;
      }
      if (s && s !== "outside") {
        if (s === "inside") {
          var l;
          s = (l = {}, I(l, R, B), I(l, B, R), I(l, L, V), I(l, V, L), l)[o];
        }
      } else {
        s = o;
      }
      if (s !== a && s !== r) {
        s = o;
      }
      if (i.alignment !== F && !i.userAlignment) {
        i.alignment = (n = {}, I(n, R, F), I(n, B, F), I(n, L, V), I(n, V, L), n)[s];
      }
      e.position = o;
      i.position = s;
      e.hoverMode = e.hoverMode ? e.hoverMode.toLowerCase() : "none";
      i.minSpacing = i.minSpacing ?? 5;
      e.type &&= e.type.toLowerCase();
      e.argumentType &&= e.argumentType.toLowerCase();
      e.valueType &&= e.valueType.toLowerCase();
    })(e);
    (function (e, t) {
      if (e && t.visualRangeUpdateMode === "shift") {
        g.default.log("W0016", "valueAxis.visualRangeUpdateMode", "shift", "23.1", "Specify another value");
      }
    })(!t.isArgumentAxis, e);
    t._options = e;
    e.tick = e.tick || {};
    e.minorTick = e.minorTick || {};
    e.grid = e.grid || {};
    e.minorGrid = e.minorGrid || {};
    e.title = e.title || {};
    e.marker = e.marker || {};
    t._initTypes = {
      type: e.type,
      argumentType: e.argumentType,
      valueType: e.valueType
    };
    t._setTickOffset();
    t._isHorizontal = e.isHorizontal;
    t.pane = e.pane;
    t.name = e.name;
    t.priority = e.priority;
    t._hasLabelFormat = n.format !== "" && (0, a.isDefined)(n.format);
    t._textOptions = {
      opacity: n.opacity,
      align: "center",
      class: n.cssClass
    };
    t._textFontStyles = (0, o.patchFontOptions)(n.font);
    if (e.type === r.default.logarithmic && e.logarithmBaseError) {
      t._incidentOccurred("E2104");
      delete e.logarithmBaseError;
    }
    t._updateTranslator();
    t._createConstantLines();
    t._strips = (e.strips || []).map(function (e) {
      return (0, x.default)(t, e);
    });
    t._majorTicks = t._minorTicks = null;
    t._firstDrawing = true;
  },
  calculateInterval: function (e, t) {
    var n = this._options;
    if (!n || n.type !== r.default.logarithmic) {
      return O(e - t);
    }
    var i = new h.Range(this.getTranslator().getBusinessRange());
    var a = i.allowNegatives;
    var s = i.linearThreshold;
    return O((0, o.getLogExt)(e, n.logarithmBase, a, s) - (0, o.getLogExt)(t, n.logarithmBase, a, s));
  },
  getCanvasRange: function () {
    var e = this._translator;
    return {
      startValue: e.from(e.translate("canvas_position_start")),
      endValue: e.from(e.translate("canvas_position_end"))
    };
  },
  _processCanvas: function (e) {
    return e;
  },
  updateCanvas: function (e, t) {
    if (t) {
      this._orthogonalPositions = null;
    } else {
      var n = this._orthogonalPositions = {
        start: this._isHorizontal ? e.top : e.left,
        end: this._isHorizontal ? e.height - e.bottom : e.width - e.right
      };
      n.center = n.start + (n.end - n.start) / 2;
    }
    this._canvas = e;
    this._translator.updateCanvas(this._processCanvas(e));
    this._initAxisPositions();
  },
  getCanvas: function () {
    return this._canvas;
  },
  getAxisShift: function () {
    return this._axisShift || 0;
  },
  hideTitle: function () {
    if (this._options.title.text) {
      this._incidentOccurred("W2105", [this._isHorizontal ? "horizontal" : "vertical"]);
      this._axisTitleGroup.clear();
    }
  },
  getTitle: function () {
    return this._title;
  },
  hideOuterElements: function () {
    if ((!!this._options.label.visible || !!this._outsideConstantLines.length) && !this._translator.getBusinessRange().isEmpty()) {
      this._incidentOccurred("W2106", [this._isHorizontal ? "horizontal" : "vertical"]);
      this._axisElementsGroup.clear();
      K(this._outsideConstantLines, "removeLabel");
    }
  },
  _resolveLogarithmicOptionsForRange: function (e) {
    var t = this._options;
    if (t.type === r.default.logarithmic) {
      e.addRange({
        allowNegatives: t.allowNegatives !== undefined ? t.allowNegatives : e.min <= 0
      });
      if (!isNaN(t.linearThreshold)) {
        e.linearThreshold = t.linearThreshold;
      }
    }
  },
  adjustViewport: function (e) {
    var t = this._options;
    var n = t.type === r.default.discrete;
    var i = this._seriesData && this._seriesData.categories || [];
    var s = this.adjustRange((0, o.getVizRangeObject)(t.wholeRange));
    var l = this.getViewport() || {};
    var u = new h.Range(e);
    this._addConstantLinesToRange(u);
    var d = (0, a.isDefined)(l.startValue);
    var c = (0, a.isDefined)(l.endValue);
    if (!n) {
      d = d && (!(0, a.isDefined)(s.endValue) || l.startValue < s.endValue);
      c = c && (!(0, a.isDefined)(s.startValue) || l.endValue > s.startValue);
    }
    var g = d ? l.startValue : u.minVisible;
    var m = c ? l.endValue : u.maxVisible;
    if (n) {
      i = (0, o.getCategoriesInfo)(i, s.startValue, s.endValue).categories;
      u.categories = i;
    } else {
      u.min = s.startValue ?? u.min;
      u.max = s.endValue ?? u.max;
    }
    var _ = (0, o.adjustVisualRange)({
      axisType: t.type,
      dataType: t.dataType,
      base: t.logarithmBase
    }, {
      startValue: d ? l.startValue : undefined,
      endValue: c ? l.endValue : undefined,
      length: l.length
    }, {
      categories: i,
      min: s.startValue,
      max: s.endValue
    }, {
      categories: i,
      min: g,
      max: m
    });
    u.minVisible = _.startValue;
    u.maxVisible = _.endValue;
    if (!(0, a.isDefined)(u.min)) {
      u.min = u.minVisible;
    }
    if (!(0, a.isDefined)(u.max)) {
      u.max = u.maxVisible;
    }
    u.addRange({});
    this._resolveLogarithmicOptionsForRange(u);
    return u;
  },
  adjustRange: function (e) {
    e = e || {};
    var t = this._options.type === r.default.discrete;
    var n = this._options.type === r.default.logarithmic;
    var i = this._options.allowNegatives === false;
    if (n) {
      e.startValue = i && e.startValue <= 0 ? null : e.startValue;
      e.endValue = i && e.endValue <= 0 ? null : e.endValue;
    }
    if (!t && (0, a.isDefined)(e.startValue) && (0, a.isDefined)(e.endValue) && e.startValue > e.endValue) {
      var o = e.endValue;
      e.endValue = e.startValue;
      e.startValue = o;
    }
    return e;
  },
  _getVisualRangeUpdateMode: function (e, t, n) {
    var i = this._options.visualRangeUpdateMode;
    var o = this._translator;
    var s = this._seriesData;
    var l = this._prevDataInfo;
    if (l.isEmpty && !l.containsConstantLine) {
      return H;
    }
    if (!this.isArgumentAxis) {
      var u = this.getViewport();
      if (!(0, a.isDefined)(u.startValue) && !(0, a.isDefined)(u.endValue) && !(0, a.isDefined)(u.length)) {
        return z;
      }
    }
    if (this.isArgumentAxis) {
      if ([N, H, z].indexOf(i) === -1) {
        if (s.axisType === r.default.discrete) {
          var d = s.categories;
          var c = t.categories;
          var h = this.visualRange();
          i = d && c && d.length && c.map(function (e) {
            return e.valueOf();
          }).join(",").indexOf(d.map(function (e) {
            return e.valueOf();
          }).join(",")) !== -1 && (h.startValue.valueOf() !== d[0].valueOf() || h.endValue.valueOf() !== d[d.length - 1].valueOf()) ? H : z;
        } else {
          var f = o.translate(s.min);
          var p = o.translate(e.startValue);
          var g = o.translate(s.max);
          var m = o.translate(e.endValue);
          i = f === p && g === m ? z : f !== p && g === m ? N : H;
        }
        if (i === H && l.isEmpty && l.containsConstantLine) {
          i = z;
        }
      }
    } else if ([H, z].indexOf(i) === -1) {
      i = n === H ? H : z;
    }
    return i;
  },
  _handleBusinessRangeChanged: function (e, t, n) {
    var i = this.visualRange();
    if (!t && !this._translator.getBusinessRange().isEmpty()) {
      var o = this._lastVisualRangeUpdateMode = this._getVisualRangeUpdateMode(i, n, e);
      if (o === H) {
        this._setVisualRange([i.startValue, i.endValue]);
      } else if (o === z) {
        this._setVisualRange([null, null]);
      } else if (o === N) {
        this._setVisualRange({
          length: this.getVisualRangeLength()
        });
      }
    }
  },
  getVisualRangeLength: function (e) {
    var t;
    var n = e || this._translator.getBusinessRange();
    var i = this._options.type;
    if (i === r.default.logarithmic) {
      t = (0, p.adjust)(this.calculateInterval(n.maxVisible, n.minVisible));
    } else if (i === r.default.discrete) {
      t = (0, o.getCategoriesInfo)(n.categories, n.minVisible, n.maxVisible).categories.length;
    } else {
      t = n.maxVisible - n.minVisible;
    }
    return t;
  },
  getVisualRangeCenter: function (e, t) {
    var n;
    var i = this.getTranslator();
    var l = i.getBusinessRange();
    var u = t ? (0, s.extend)(true, {}, l, e || {}) : e || l;
    var d = this._options;
    var c = d.type;
    var h = d.logarithmBase;
    if ((0, a.isDefined)(u.minVisible) && (0, a.isDefined)(u.maxVisible)) {
      if (c === r.default.logarithmic) {
        var f = u.allowNegatives;
        var g = u.linearThreshold;
        var m = u.minVisible;
        var _ = u.maxVisible;
        n = (0, o.raiseToExt)((0, p.adjust)((0, o.getLogExt)(_, h, f, g) + (0, o.getLogExt)(m, h, f, g)) / 2, h, f, g);
      } else if (c === r.default.discrete) {
        var v = (0, o.getCategoriesInfo)(u.categories, u.minVisible, u.maxVisible);
        var y = Math.ceil(v.categories.length / 2) - 1;
        n = l.categories.indexOf(v.categories[y]);
      } else {
        n = i.toValue((u.maxVisible.valueOf() + u.minVisible.valueOf()) / 2);
      }
      return n;
    }
  },
  setBusinessRange: function (e, t, n, i) {
    var l = this._options;
    var u = l.type === r.default.discrete;
    this._handleBusinessRangeChanged(n, t, e);
    this._seriesData = new h.Range(e);
    var d = this._seriesData.isEmpty();
    var c = new h.Range(this._seriesData);
    this._addConstantLinesToRange(c);
    this._prevDataInfo = {
      isEmpty: d,
      containsConstantLine: c.containsConstantLine
    };
    this._seriesData.addRange({
      categories: l.categories,
      dataType: l.dataType,
      axisType: l.type,
      base: l.logarithmBase,
      invert: l.inverted
    });
    this._resolveLogarithmicOptionsForRange(this._seriesData);
    if (!u) {
      if (!(0, a.isDefined)(this._seriesData.min) && !(0, a.isDefined)(this._seriesData.max)) {
        var f = this.getViewport();
        if (f) {
          this._seriesData.addRange({
            min: f.startValue,
            max: f.endValue
          });
        }
      }
      var p = l.synchronizedValue;
      if ((0, a.isDefined)(p)) {
        this._seriesData.addRange({
          min: p,
          max: p
        });
      }
    }
    this._seriesData.minVisible = this._seriesData.minVisible ?? this._seriesData.min;
    this._seriesData.maxVisible = this._seriesData.maxVisible ?? this._seriesData.max;
    if (!this.isArgumentAxis && l.showZero) {
      this._seriesData.correctValueZeroLevel();
    }
    this._seriesData.sortCategories(this.getCategoriesSorter(i));
    this._seriesData.userBreaks = this._seriesData.isEmpty() ? [] : this._getScaleBreaks(l, this._seriesData, this._series, this.isArgumentAxis);
    this._translator.updateBusinessRange(this._getViewportRange());
  },
  _addConstantLinesToRange: function (e) {
    this._outsideConstantLines.concat(this._insideConstantLines || []).forEach(function (t) {
      if (t.options.extendAxis) {
        var n = t.getParsedValue();
        e.addRange({
          containsConstantLine: true,
          minVisible: n,
          maxVisible: n,
          min: (0, a.isDefined)(e.min) ? e.min : n,
          max: (0, a.isDefined)(e.max) ? e.max : n
        });
      }
    });
  },
  setGroupSeries: function (e) {
    this._series = e;
  },
  getLabelsPosition: function () {
    var e = this._options;
    var t = e.position;
    var n = e.label.indentFromAxis + (this._axisShift || 0) + this._constantLabelOffset;
    var i = this._axisPosition;
    if (t === R || t === L) {
      return i - n;
    } else {
      return i + n;
    }
  },
  getFormattedValue: function (e, t, n) {
    var i = this._options.label;
    if ((0, a.isDefined)(e)) {
      return this.formatLabel(e, (0, s.extend)(true, {}, i, t), undefined, n);
    } else {
      return null;
    }
  },
  _getBoundaryTicks: function (e, t) {
    var n = e.length;
    var i = this._options;
    var o = i.customBoundTicks;
    var s = t.minVisible;
    var l = t.maxVisible;
    var u = i.showCustomBoundaryTicks ? this._boundaryTicksVisibility : {};
    var d = [];
    if (i.type === r.default.discrete) {
      if (this._tickOffset && e.length !== 0) {
        d = [e[0], e[e.length - 1]];
      }
    } else if (o) {
      if (u.min && (0, a.isDefined)(o[0])) {
        d.push(o[0]);
      }
      if (u.max && (0, a.isDefined)(o[1])) {
        d.push(o[1]);
      }
    } else {
      if (u.min && (n === 0 || e[0] > s)) {
        d.push(s);
      }
      if (u.max && (n === 0 || e[n - 1] < l)) {
        d.push(l);
      }
    }
    return d;
  },
  setPercentLabelFormat: function () {
    if (!this._hasLabelFormat) {
      this._options.label.format = "percent";
    }
  },
  resetAutoLabelFormat: function () {
    if (!this._hasLabelFormat) {
      delete this._options.label.format;
    }
  },
  getMultipleAxesSpacing: function () {
    return this._options.multipleAxesSpacing || 0;
  },
  getTicksValues: function () {
    return {
      majorTicksValues: T(this._majorTicks),
      minorTicksValues: T(this._minorTicks)
    };
  },
  estimateTickInterval: function (e) {
    this.updateCanvas(e);
    return this._tickInterval !== this._getTicks(this._getViewportRange(), _.noop, true).tickInterval;
  },
  setTicks: function (e) {
    var t = e.majorTicks || [];
    this._majorTicks = t.map(q(this, this._renderer, this._getSkippedCategory(t)));
    this._minorTicks = (e.minorTicks || []).map($(this, this._renderer));
    this._isSynchronized = true;
  },
  _adjustDivisionFactor: function (e) {
    return e;
  },
  _getTicks: function (e, t, n) {
    var i = this._options;
    var o = i.customTicks;
    var a = i.customMinorTicks;
    return G(i, t || this._incidentOccurred, n, this._translator.getBusinessRange().isEmpty(), this._adjustDivisionFactor.bind(this), e)({
      min: e.minVisible,
      max: e.maxVisible,
      categories: e.categories,
      isSpacedMargin: e.isSpacedMargin
    }, this._getScreenDelta(), i.tickInterval, i.label.overlappingBehavior === "ignore" || i.forceUserTickInterval, {
      majors: o,
      minors: a
    }, i.minorTickInterval, i.minorTickCount, this._initialBreaks);
  },
  _createTicksAndLabelFormat: function (e, t) {
    var n = this._options;
    var i = this._getTicks(e, t, false);
    if (!e.isEmpty() && n.type === r.default.discrete && n.dataType === "datetime" && !this._hasLabelFormat && !!i.ticks.length) {
      n.label.format = l.default.getDateFormatByTicks(i.ticks);
    }
    return i;
  },
  getAggregationInfo: function (e, t) {
    var u = this._options;
    var d = this._marginOptions;
    var c = new h.Range(this.getTranslator().getBusinessRange()).addRange(t);
    var f = this.getViewport();
    var p = (f == null ? undefined : f.startValue) ?? c.minVisible;
    var g = (f == null ? undefined : f.endValue) ?? c.maxVisible;
    var v = [];
    if (u.type === r.default.discrete && u.aggregateByCategory) {
      return {
        aggregateByCategory: true
      };
    }
    var y = u.aggregationInterval;
    var b = u.aggregationGroupWidth;
    if (!b && d) {
      if (d.checkInterval) {
        b = u.axisDivisionFactor;
      }
      if (d.sizePointNormalState) {
        b = Math.min(d.sizePointNormalState, u.axisDivisionFactor);
      }
    }
    var x = !u.aggregationGroupWidth && !y && t.interval;
    var w = function (e, t, n, i, o) {
      var r = (0, s.extend)({}, e, {
        endOnTick: true,
        axisDivisionFactor: t,
        skipCalculationLimits: true,
        generateExtraTick: true,
        minTickInterval: o
      });
      return function (e, t, o, s, l) {
        return G(r, _.noop, t, n.isEmpty(), function (e) {
          return e;
        }, n)({
          min: o,
          max: s,
          categories: n.categories,
          isSpacedMargin: n.isSpacedMargin
        }, i, e, (0, a.isDefined)(e), undefined, undefined, undefined, l);
      };
    }(u, b, c, this._getScreenDelta(), x);
    var C = w(y, true, p, g, this._seriesData?.breaks).tickInterval;
    if (u.type !== r.default.discrete) {
      var S = e ? c.min : p;
      var k = e ? c.max : g;
      if ((0, a.isDefined)(S) && (0, a.isDefined)(k)) {
        var D = (0, o.getAddFunction)({
          base: u.logarithmBase,
          axisType: u.type,
          dataType: u.dataType
        }, false);
        var I = S;
        var T = k;
        if (!e && (0, a.isDefined)(C)) {
          var E = Math.max(this.calculateInterval(k, S), u.dataType === "datetime" ? m.default.dateToMilliseconds(C) : C);
          I = D(S, E, -1);
          T = D(k, E);
        }
        I = I < c.min ? c.min : I;
        T = T > c.max ? c.max : T;
        var O = this._getScaleBreaks(u, {
          minVisible: I,
          maxVisible: T
        }, this._series, this.isArgumentAxis);
        v = w(C, false, I, T, this._filterBreaks(O, {
          minVisible: I,
          maxVisible: T
        }, u.breakStyle)).ticks;
      }
    }
    this._aggregationInterval = C;
    return {
      interval: C,
      ticks: v
    };
  },
  getTickInterval: function () {
    return this._tickInterval;
  },
  getAggregationInterval: function () {
    return this._aggregationInterval;
  },
  createTicks: function (e) {
    var t = this;
    var n = t._renderer;
    var i = t._options;
    if (e) {
      t._isSynchronized = false;
      t.updateCanvas(e);
      var r = t._getViewportRange();
      t._initialBreaks = r.breaks = this._seriesData.breaks = t._filterBreaks(this._seriesData.userBreaks, r, i.breakStyle);
      t._estimatedTickInterval = t._getTicks(t.adjustViewport(this._seriesData), _.noop, true).tickInterval;
      var s = this._calculateValueMargins();
      r.addRange({
        minVisible: s.minValue,
        maxVisible: s.maxValue,
        isSpacedMargin: s.isSpacedMargin
      });
      var l = t._createTicksAndLabelFormat(r);
      var u = t._getBoundaryTicks(l.ticks, t._getViewportRange());
      if (i.showCustomBoundaryTicks && u.length) {
        t._boundaryTicks = [u[0]].map(U(t, n, true));
        if (u.length > 1) {
          t._boundaryTicks = t._boundaryTicks.concat([u[1]].map(U(t, n, false)));
        }
      } else {
        t._boundaryTicks = [];
      }
      var d = (l.minorTicks || []).filter(function (e) {
        return !u.some(function (t) {
          return (0, o.valueOf)(t) === (0, o.valueOf)(e);
        });
      });
      t._tickInterval = l.tickInterval;
      t._minorTickInterval = l.minorTickInterval;
      var c = t._majorTicks || [];
      var h = c.reduce(function (e, t) {
        e[t.value.valueOf()] = t;
        return e;
      }, {});
      var f = (0, a.type)(l.ticks[0]) === (0, a.type)(c[0] && c[0].value);
      var p = t._getSkippedCategory(l.ticks);
      var g = l.ticks.map(function (e) {
        var i = h[e.valueOf()];
        if (i && f) {
          delete h[e.valueOf()];
          i.setSkippedCategory(p);
          return i;
        } else {
          return q(t, n, p)(e);
        }
      });
      t._majorTicks = g;
      var m = t._minorTicks || [];
      t._minorTicks = d.map(function (e, i) {
        var o = m[i];
        if (o) {
          o.updateValue(e);
          return o;
        } else {
          return $(t, n)(e);
        }
      });
      t._ticksToRemove = Object.keys(h).map(function (e) {
        return h[e];
      }).concat(m.slice(t._minorTicks.length, m.length));
      t._ticksToRemove.forEach(function (e) {
        var t;
        if ((t = e.label) === null || t === undefined) {
          return undefined;
        } else {
          return t.removeTitle();
        }
      });
      if (l.breaks) {
        t._seriesData.breaks = l.breaks;
      }
      t._reinitTranslator(t._getViewportRange());
    }
  },
  _reinitTranslator: function (e) {
    var t = this._translator;
    if (!this._isSynchronized) {
      t.updateBusinessRange(e);
    }
  },
  _getViewportRange: function () {
    return this.adjustViewport(this._seriesData);
  },
  setMarginOptions: function (e) {
    this._marginOptions = e;
  },
  getMarginOptions: function () {
    return this._marginOptions ?? {};
  },
  _calculateRangeInterval: function (e) {
    var t = this._options.dataType === "datetime";
    var n = [];
    function i(e) {
      if ((0, a.isDefined)(e)) {
        n.push(t ? m.default.dateToMilliseconds(e) : e);
      }
    }
    i(this._tickInterval);
    i(this._estimatedTickInterval);
    if ((0, a.isDefined)(e)) {
      n.push(e);
    }
    i(this._aggregationInterval);
    return this._calculateWorkWeekInterval(P.apply(this, n));
  },
  _calculateWorkWeekInterval: function (e) {
    var t = this._options;
    if (t.dataType === "datetime" && t.workdaysOnly && e) {
      var n = t.workWeek.length * j;
      var i = W - n;
      if (n !== e && i < e) {
        e -= i * Math.ceil(e / W);
      } else if (i >= e && e > j) {
        e = j;
      }
    }
    return e;
  },
  _getConvertIntervalCoefficient: function (e, t) {
    var n = this._translator.ratioOfCanvasRange();
    return n / (n * t / (e + t));
  },
  _calculateValueMargins: function (e) {
    this._resetMargins();
    var t;
    var n;
    var i;
    var s = this.getMarginOptions();
    var l = (s.size || 0) / 2;
    var u = this._options;
    var d = this._getViewportRange();
    var c = this.getViewport();
    var h = this._getScreenDelta();
    var f = (u.type || "").indexOf(r.default.discrete) !== -1;
    var p = u.valueMarginsEnabled && !f && !this.customPositionIsBoundaryOrthogonalAxis();
    var g = this._translator;
    var m = u.minValueMargin;
    var _ = u.maxValueMargin;
    var v = 0;
    var y = 0;
    var b = 0;
    if (d.stubData || !h) {
      return {
        startPadding: 0,
        endPadding: 0
      };
    }
    if (this.isArgumentAxis && s.checkInterval) {
      t = this._calculateRangeInterval(d.interval);
      var x = g.getInterval(t);
      if (isFinite(x)) {
        b = Math.ceil(x / (this._getConvertIntervalCoefficient(x, h) * 2));
      } else {
        t = 0;
      }
    }
    var w = h * 0.8 / 2;
    if (p) {
      if ((0, a.isDefined)(m)) {
        n = isFinite(m) ? m : 0;
      } else if (!this.isArgumentAxis && s.checkInterval && (0, o.valueOf)(d.minVisible) > 0 && (0, o.valueOf)(d.minVisible) === (0, o.valueOf)(d.min)) {
        v = 5;
      } else {
        v = Math.max(l, b);
        v = Math.min(w, v);
      }
      if ((0, a.isDefined)(_)) {
        i = isFinite(_) ? _ : 0;
      } else if (!this.isArgumentAxis && s.checkInterval && (0, o.valueOf)(d.maxVisible) < 0 && (0, o.valueOf)(d.maxVisible) === (0, o.valueOf)(d.max)) {
        y = 5;
      } else {
        y = Math.max(l, b);
        y = Math.min(w, y);
      }
    }
    if (s.percentStick && !this.isArgumentAxis) {
      if (O(d.max) === 1) {
        y = 0;
      }
      if (O(d.min) === 1) {
        v = 0;
      }
    }
    var C;
    var S;
    var E = this._getCanvasStartEnd();
    var P = (h - v - y) / (1 + (n || 0) + (i || 0)) || h;
    if (n !== undefined || i !== undefined) {
      if (n !== undefined) {
        v = P * n;
      }
      if (i !== undefined) {
        y = P * i;
      }
    }
    if (u.type !== r.default.discrete && e && e.length > 1 && !u.skipViewportExtending && !c.action && u.endOnTick !== false) {
      var M = e.length;
      var R = g.translate(e[0].value);
      var B = g.translate(e[M - 1].value);
      var L = R > B ? -1 : 1;
      var V = A(L * (E.start - R), 0);
      var F = A(L * (B - E.end), 0);
      if (V > v || F > y) {
        var H = F + V;
        var N = this._getConvertIntervalCoefficient(H, h);
        if (V >= v) {
          C = e[0].value;
        }
        if (F >= y) {
          S = e[M - 1].value;
        }
        v = A(V, v) / N;
        y = A(F, y) / N;
      }
    }
    if (!(n = n === undefined ? v / P : n, i = i === undefined ? y / P : i, f)) {
      if (this._translator.isInverted()) {
        C = C ?? g.from(E.start + h * n, -1);
        S = S ?? g.from(E.end - h * i, 1);
      } else {
        C = C ?? g.from(E.start - h * n, -1);
        S = S ?? g.from(E.end + h * i, 1);
      }
    }
    var z = this.getCorrectedValuesToZero(C, S);
    var j = z.correctedMin;
    var W = z.correctedMax;
    var G = z.start;
    var q = z.end;
    v = G ?? v;
    y = q ?? y;
    return {
      startPadding: g.isInverted() ? y : v,
      endPadding: g.isInverted() ? v : y,
      minValue: j ?? C,
      maxValue: W ?? S,
      interval: t,
      isSpacedMargin: v === y && v !== 0
    };
  },
  getCorrectedValuesToZero: function (e, t) {
    var n;
    var i;
    var o;
    var a;
    var r = this;
    var s = r._translator;
    var l = r._getCanvasStartEnd();
    var u = r._getViewportRange();
    var d = r._getScreenDelta();
    var c = r._options;
    function h(e, t) {
      var o = O(l.start - e);
      var a = O(l.end - t);
      var s = r._getConvertIntervalCoefficient(o + a, d);
      n = o / s;
      i = a / s;
    }
    if (!r.isArgumentAxis && c.dataType !== "datetime") {
      if (e * u.min <= 0 && e * u.minVisible <= 0) {
        h(s.translate(0), s.translate(t));
        o = 0;
      }
      if (t * u.max <= 0 && t * u.maxVisible <= 0) {
        h(s.translate(e), s.translate(0));
        a = 0;
      }
    }
    return {
      start: isFinite(n) ? n : null,
      end: isFinite(i) ? i : null,
      correctedMin: o,
      correctedMax: a
    };
  },
  applyMargins: function () {
    if (!this._isSynchronized) {
      var e = this._calculateValueMargins(this._majorTicks);
      var t = (0, s.extend)({}, this._canvas, {
        startPadding: e.startPadding,
        endPadding: e.endPadding
      });
      this._translator.updateCanvas(this._processCanvas(t));
      if (isFinite(e.interval)) {
        var n = this._translator.getBusinessRange();
        n.addRange({
          interval: e.interval
        });
        this._translator.updateBusinessRange(n);
      }
    }
  },
  _resetMargins: function () {
    this._reinitTranslator(this._getViewportRange());
    if (this._canvas) {
      this._translator.updateCanvas(this._processCanvas(this._canvas));
    }
  },
  _createConstantLines: function () {
    var e = this;
    var t = (this._options.constantLines || []).map(function (t) {
      return (0, b.default)(e, t);
    });
    this._outsideConstantLines = t.filter(function (e) {
      return e.labelPosition === "outside";
    });
    this._insideConstantLines = t.filter(function (e) {
      return e.labelPosition === "inside";
    });
  },
  draw: function (e, t) {
    var n = this;
    var i = this._options;
    n.borderOptions = t || {
      visible: false
    };
    n._resetMargins();
    n.createTicks(e);
    n.applyMargins();
    n._clearAxisGroups();
    Z(n._majorTicks);
    Z(n._minorTicks);
    Z(n._boundaryTicks);
    n._axisGroup.append(n._axesContainerGroup);
    n._drawAxis();
    n._drawTitle();
    Y(n._majorTicks, i.tick);
    Y(n._minorTicks, i.minorTick);
    Y(n._boundaryTicks, i.tick);
    var o = n._getGridLineDrawer();
    X(n._majorTicks, o);
    X(n._minorTicks, o);
    K(n._majorTicks, "drawLabel", n._getViewportRange(), n._getTemplate(i.label.template));
    if (n._templatesRendered) {
      n._templatesRendered.reject();
    }
    n._templatesRendered = new w.Deferred();
    n._majorTicks.forEach(function (e) {
      e.labelRotationAngle = 0;
      e.labelAlignment = undefined;
      e.labelOffset = 0;
    });
    K(n._outsideConstantLines.concat(n._insideConstantLines), "draw");
    K(n._strips, "draw");
    n._dateMarkers = n._drawDateMarkers() || [];
    if (n._stripLabelAxesGroup) {
      n._axisStripLabelGroup.append(n._stripLabelAxesGroup);
    }
    if (n._gridContainerGroup) {
      n._axisGridGroup.append(n._gridContainerGroup);
    }
    if (n._stripsGroup) {
      n._axisStripGroup.append(n._stripsGroup);
    }
    if (n._labelsAxesGroup) {
      n._axisElementsGroup.append(n._labelsAxesGroup);
    }
    if (n._constantLinesGroup) {
      n._axisConstantLineGroups.above.inside.append(n._constantLinesGroup.above);
      n._axisConstantLineGroups.above.outside1.append(n._constantLinesGroup.above);
      n._axisConstantLineGroups.above.outside2.append(n._constantLinesGroup.above);
      n._axisConstantLineGroups.under.inside.append(n._constantLinesGroup.under);
      n._axisConstantLineGroups.under.outside1.append(n._constantLinesGroup.under);
      n._axisConstantLineGroups.under.outside2.append(n._constantLinesGroup.under);
    }
    n._measureTitle();
    (0, C.measureLabels)(n._majorTicks);
    if (!i.label.template) {
      n._applyWordWrap();
    }
    (0, C.measureLabels)(n._outsideConstantLines);
    (0, C.measureLabels)(n._insideConstantLines);
    (0, C.measureLabels)(n._strips);
    (0, C.measureLabels)(n._dateMarkers);
    n._adjustConstantLineLabels(n._insideConstantLines);
    n._adjustStripLabels();
    var a = n._constantLabelOffset = n._adjustConstantLineLabels(n._outsideConstantLines);
    if (!n._translator.getBusinessRange().isEmpty()) {
      n._setLabelsPlacement();
      a = n._adjustLabels(a);
    }
    w.when.apply(this, n._majorTicks.map(function (e) {
      return e.getTemplateDeferred();
    })).done(function () {
      n._templatesRendered.resolve();
    });
    a = n._adjustDateMarkers(a);
    n._adjustTitle(a);
  },
  getTemplatesDef: function () {
    return this._templatesRendered;
  },
  setRenderedState: function (e) {
    this._drawn = e;
  },
  isRendered: function () {
    return this._drawn;
  },
  _applyWordWrap: function () {
    var e;
    var t;
    var n;
    var i = this._options;
    var o = this._tickInterval;
    if ((0, a.isDefined)(o)) {
      e = this.getTranslator().getInterval(i.dataType === "datetime" ? m.default.dateToMilliseconds(o) : o);
    }
    var r = this._validateDisplayMode(i.label.displayMode);
    var s = this._validateOverlappingMode(i.label.overlappingBehavior, r);
    var l = i.label.wordWrap || "none";
    var u = i.label.textOverflow || "none";
    if ((l !== "none" || u !== "none") && r !== "rotate" && s !== "rotate" && s !== "auto") {
      var d = (0, a.isDefined)(i.placeholderSize) ? i.placeholderSize - i.label.indentFromAxis : undefined;
      if (this._isHorizontal) {
        t = e;
        n = d;
      } else {
        t = d;
        n = e;
      }
      var c = false;
      var h = false;
      if (t && this._majorTicks.some(function (e) {
        return e.labelBBox.width > t;
      })) {
        c = true;
      }
      if (n && this._majorTicks.some(function (e) {
        return e.labelBBox.height > n;
      })) {
        h = true;
      }
      if (c || h) {
        this._majorTicks.forEach(function (e) {
          if (e.label) {
            e.label.setMaxSize(t, n, i.label);
          }
        });
        (0, C.measureLabels)(this._majorTicks);
      }
    }
  },
  _measureTitle: _.noop,
  animate: function () {
    K(this._majorTicks, "animateLabels");
  },
  updateSize: function (e, t) {
    var n = !(arguments.length > 2) || arguments[2] === undefined || arguments[2];
    var i = this;
    i.updateCanvas(e);
    if (n) {
      i._checkTitleOverflow();
      i._measureTitle();
      i._updateTitleCoords();
    }
    i._reinitTranslator(i._getViewportRange());
    i.applyMargins();
    var o = !i._firstDrawing && t;
    var a = i._options;
    Z(i._majorTicks);
    Z(i._minorTicks);
    Z(i._boundaryTicks);
    if (i._resetApplyingAnimation && !i._firstDrawing) {
      i._resetStartCoordinates();
    }
    ee(i._majorTicks);
    ee(i._minorTicks);
    ee(i._boundaryTicks);
    if (i._axisElement) {
      i._updateAxisElementPosition();
    }
    Q(i._majorTicks, a.tick, o);
    Q(i._minorTicks, a.minorTick, o);
    Q(i._boundaryTicks, a.tick);
    K(i._majorTicks, "updateLabelPosition", o);
    i._outsideConstantLines.concat(i._insideConstantLines || []).forEach(function (e) {
      return e.updatePosition(o);
    });
    K(i._strips, "updatePosition", o);
    J(i._majorTicks, o);
    J(i._minorTicks, o);
    if (o) {
      K(i._ticksToRemove || [], "fadeOutElements");
    }
    i.prepareAnimation();
    i._ticksToRemove = null;
    if (!i._translator.getBusinessRange().isEmpty()) {
      i._firstDrawing = false;
    }
    i._resetApplyingAnimation = false;
    i._updateLabelsPosition();
  },
  _updateLabelsPosition: _.noop,
  prepareAnimation: function () {
    var e = "saveCoords";
    K(this._majorTicks, e);
    K(this._minorTicks, e);
    K(this._insideConstantLines, e);
    K(this._outsideConstantLines, e);
    K(this._strips, e);
  },
  _resetStartCoordinates: function () {
    var e = "resetCoordinates";
    K(this._majorTicks, e);
    K(this._minorTicks, e);
    K(this._insideConstantLines, e);
    K(this._outsideConstantLines, e);
    K(this._strips, e);
  },
  applyClipRects: function (e, t) {
    this._axisGroup.attr({
      "clip-path": t
    });
    this._axisStripGroup.attr({
      "clip-path": e
    });
    this._axisElementsGroup.attr({
      "clip-path": t
    });
  },
  _validateVisualRange: function (e) {
    var t = (0, o.getVizRangeObject)(e);
    if (t.startValue !== undefined) {
      t.startValue = this.validateUnit(t.startValue);
    }
    if (t.endValue !== undefined) {
      t.endValue = this.validateUnit(t.endValue);
    }
    return (0, o.convertVisualRangeObject)(t, !M(e));
  },
  _validateOptions: function (e) {
    e.wholeRange = this._validateVisualRange(e.wholeRange);
    e.visualRange = e._customVisualRange = this._validateVisualRange(e._customVisualRange);
    this._setVisualRange(e._customVisualRange);
  },
  validate: function () {
    var e = this._options;
    var t = this.isArgumentAxis ? e.argumentType : e.valueType;
    var n = t ? (0, u.getParser)(t) : function (e) {
      return e;
    };
    this.parser = n;
    e.dataType = t;
    this._validateOptions(e);
  },
  resetVisualRange: function (e) {
    this._seriesData.minVisible = this._seriesData.min;
    this._seriesData.maxVisible = this._seriesData.max;
    this.handleZooming([null, null], {
      start: !!e,
      end: !!e
    });
  },
  _setVisualRange: function (e, t) {
    var n = this.adjustRange((0, o.getVizRangeObject)(e));
    if (t) {
      if ((0, a.isDefined)(n.startValue)) {
        this._viewport.startValue = n.startValue;
      }
      if ((0, a.isDefined)(n.endValue)) {
        this._viewport.endValue = n.endValue;
      }
    } else {
      this._viewport = n;
    }
  },
  _applyZooming: function (e, t) {
    this._resetVisualRangeOption();
    this._setVisualRange(e, t);
    var n = this.getViewport();
    this._seriesData.userBreaks = this._getScaleBreaks(this._options, {
      minVisible: n.startValue,
      maxVisible: n.endValue
    }, this._series, this.isArgumentAxis);
    this._translator.updateBusinessRange(this._getViewportRange());
  },
  getZoomStartEventArg: function (e, t) {
    return {
      axis: this,
      range: this.visualRange(),
      cancel: false,
      event: e,
      actionType: t
    };
  },
  _getZoomEndEventArg: function (e, t, n, i, o) {
    var a = this.visualRange();
    return {
      axis: this,
      previousRange: e,
      range: a,
      cancel: false,
      event: t,
      actionType: n,
      zoomFactor: i,
      shift: o,
      rangeStart: a.startValue,
      rangeEnd: a.endValue
    };
  },
  getZoomBounds: function () {
    var e = (0, o.getVizRangeObject)(this._options.wholeRange);
    var t = this.getTranslator().getBusinessRange();
    var n = {
      startValue: oe(this._initRange.startValue, t.min),
      endValue: oe(this._initRange.endValue, t.max)
    };
    return {
      startValue: oe(e.startValue, n.startValue),
      endValue: oe(e.endValue, n.endValue)
    };
  },
  setInitRange: function () {
    this._initRange = {};
    if (Object.keys(this._options.wholeRange || {}).length === 0) {
      this._initRange = this.getZoomBounds();
    }
  },
  _resetVisualRangeOption: function () {
    this._options._customVisualRange = {};
  },
  getTemplatesGroups: function () {
    if (this._majorTicks) {
      return this._majorTicks.map(function (e) {
        return e.templateContainer;
      }).filter(function (e) {
        return (0, a.isDefined)(e);
      });
    } else {
      return [];
    }
  },
  setCustomVisualRange: function (e) {
    this._options._customVisualRange = e;
  },
  visualRange: function () {
    var e;
    var t = this;
    var n = arguments;
    if (n.length === 0) {
      var u = t._getAdjustedBusinessRange();
      var d = u.minVisible;
      var c = u.maxVisible;
      if (t._options.type === r.default.discrete) {
        return {
          startValue: d = d ?? u.categories[0],
          endValue: c = c ?? u.categories[u.categories.length - 1],
          categories: (0, o.getCategoriesInfo)(u.categories, d, c).categories
        };
      } else {
        return {
          startValue: d,
          endValue: c
        };
      }
    }
    e = M(n[0]) ? n[0] : (0, a.isPlainObject)(n[0]) ? (0, s.extend)({}, n[0]) : [n[0], n[1]];
    var h = t.handleZooming(e, n[1]);
    if (!h.isPrevented) {
      t._visualRange(t, h);
    }
  },
  handleZooming: function (e, t, n, i) {
    t = t || {};
    if ((0, a.isDefined)(e)) {
      (e = this._validateVisualRange(e)).action = i;
    }
    var o = this.getZoomStartEventArg(n, i);
    var r = o.range;
    if (!t.start) {
      this._eventTrigger("zoomStart", o);
    }
    var s = {
      isPrevented: o.cancel,
      skipEventRising: t.skipEventRising,
      range: e || o.range
    };
    if (!o.cancel) {
      if ((0, a.isDefined)(e)) {
        this._applyZooming(e, t.allowPartialUpdate);
      }
      if (!(0, a.isDefined)(this._storedZoomEndParams)) {
        this._storedZoomEndParams = {
          startRange: r,
          type: this.getOptions().type
        };
      }
      this._storedZoomEndParams.event = n;
      this._storedZoomEndParams.action = i;
      this._storedZoomEndParams.prevent = !!t.end;
    }
    return s;
  },
  handleZoomEnd: function () {
    if ((0, a.isDefined)(this._storedZoomEndParams) && !this._storedZoomEndParams.prevent) {
      var e = this._storedZoomEndParams.startRange;
      var t = this._storedZoomEndParams.event;
      var n = this._storedZoomEndParams.action;
      var i = {
        minVisible: e.startValue,
        maxVisible: e.endValue,
        categories: e.categories
      };
      var o = this.getOptions().type === this._storedZoomEndParams.type;
      var r = o ? (0, p.adjust)(this.getVisualRangeCenter() - this.getVisualRangeCenter(i, false)) : NaN;
      var s = o ? +(Math.round(this.getVisualRangeLength(i) / (this.getVisualRangeLength() || 1) + "e+2") + "e-2") : NaN;
      var l = this._getZoomEndEventArg(e, t, n, s, r);
      l.cancel = this.checkZoomingLowerLimitOvercome(s === 1 ? "pan" : "zoom", s).stopInteraction;
      this._eventTrigger("zoomEnd", l);
      if (l.cancel) {
        this._restorePreviousVisualRange(e);
      }
      this._storedZoomEndParams = null;
    }
  },
  _restorePreviousVisualRange: function (e) {
    this._storedZoomEndParams = null;
    this._applyZooming(e);
    this._visualRange(this, e);
  },
  checkZoomingLowerLimitOvercome: function (e, t, n) {
    var i;
    var r = this._options;
    var s = this._translator;
    var l = r.minVisualRangeLength;
    var u = n;
    var d = e === "zoom" && t >= 1;
    var c = s.getBusinessRange();
    if (n) {
      i = {
        minVisible: (i = this.adjustRange((0, o.getVizRangeObject)(n))).startValue,
        maxVisible: i.endValue,
        categories: c.categories
      };
    }
    var h = this.getVisualRangeLength(c);
    var f = this.getVisualRangeLength(i);
    if ((0, a.isDefined)(l) || r.type === "discrete") {
      l = s.convert(l);
      if (i && l < h && l >= f) {
        u = (0, o.getVizRangeObject)(s.getRangeByMinZoomValue(l, i));
        d = false;
      } else {
        d &= l > f;
      }
    } else {
      var p = this._translator.canvasLength;
      var g = {
        minVisible: c.min,
        maxVisible: c.max,
        categories: c.categories
      };
      d &= this.getVisualRangeLength(g) / p >= f;
    }
    return {
      stopInteraction: !!d,
      correctedRange: u
    };
  },
  isExtremePosition: function (e) {
    var t;
    var n;
    if (this._options.type === "discrete") {
      n = this._translator.getBusinessRange();
      t = e ? n.categories[n.categories.length - 1] : n.categories[0];
    } else {
      n = this.getZoomBounds();
      t = e ? n.endValue : n.startValue;
    }
    var i = this.getTranslator();
    var o = i.translate(t);
    var a = this.visualRange();
    var r = e ? i.translate(a.endValue) : i.translate(a.startValue);
    return O(r - o) < 5;
  },
  getViewport: function () {
    return this._viewport;
  },
  getFullTicks: function () {
    var e = this._majorTicks || [];
    if (this._options.type === r.default.discrete) {
      return T(e);
    } else {
      return T(e.concat(this._minorTicks, this._boundaryTicks)).sort(function (e, t) {
        return (0, o.valueOf)(e) - (0, o.valueOf)(t);
      });
    }
  },
  measureLabels: function (e, t) {
    var n;
    var i;
    var o = this;
    var a = o._options;
    var r = a.visible ? a.width : 0;
    var s = t ? a.label.indentFromAxis + a.tick.length * 0.5 : 0;
    var l = o._getViewportRange();
    if (l.isEmpty() || !a.label.visible || !o._axisElementsGroup) {
      return {
        height: r,
        width: r,
        x: 0,
        y: 0
      };
    }
    if (o._majorTicks) {
      n = T(o._majorTicks);
    } else {
      o.updateCanvas(e);
      n = o._createTicksAndLabelFormat(l, _.noop);
      i = n.tickInterval;
      n = n.ticks;
    }
    var u = n.reduce(function (e, t, r) {
      var s = o.formatLabel(t, a.label, l, undefined, i, n);
      if (e.length < s.length) {
        return s;
      } else {
        return e;
      }
    }, o.formatLabel(n[0], a.label, l, undefined, i, n));
    var d = o._renderer.text(u, 0, 0).css(o._textFontStyles).attr(o._textOptions).append(o._renderer.root);
    var c = d.getBBox();
    d.remove();
    return {
      x: c.x,
      y: c.y,
      width: c.width + s,
      height: c.height + s
    };
  },
  _setLabelsPlacement: function () {
    if (this._options.label.visible) {
      var e;
      var t = this._options.label;
      var n = this._validateDisplayMode(t.displayMode);
      var i = this._validateOverlappingMode(t.overlappingBehavior, n);
      var o = i === "none" || i === "ignore";
      var a = {
        rotationAngle: t.rotationAngle,
        staggeringSpacing: t.staggeringSpacing
      };
      var r = this._majorTicks.map(function (e) {
        return e.labelBBox;
      });
      var s = this._getStep(r);
      switch (n) {
        case "rotate":
          if (o) {
            e = true;
            s = 1;
          }
          this._applyLabelMode(n, s, r, t, e);
          break;
        case "stagger":
          if (o) {
            s = 2;
          }
          this._applyLabelMode(n, A(s, 2), r, t);
          break;
        default:
          this._applyLabelOverlapping(r, i, s, a);
      }
    }
  },
  _applyLabelOverlapping: function (e, t, n, i) {
    var o = this._options.label;
    var a = this._majorTicks;
    if (t !== "none" && t !== "ignore") {
      if (n > 1 && e.some(function (e, t, n) {
        return t !== 0 && r.default.areLabelsOverlap(e, n[t - 1], o.minSpacing, o.alignment);
      })) {
        this._applyLabelMode(t, n, e, i);
      }
      this._checkBoundedLabelsOverlapping(a, e, t);
      this._checkShiftedLabels(a, e, o.minSpacing, o.alignment);
    }
  },
  _applyLabelMode: function (e, t, n, i, o) {
    var a;
    var r;
    var s = this._majorTicks;
    var l = this._options.label;
    var u = i.rotationAngle;
    switch (e) {
      case "rotate":
        if (!l.userAlignment) {
          r = u < 0 ? V : L;
          if (u % 90 == 0) {
            r = F;
          }
        }
        ie(s, t = o ? t : this._getStep(n, u), function (e) {
          var t = e.getContentContainer();
          if (t) {
            t.rotate(u);
            e.labelRotationAngle = u;
            if (r) {
              e.labelAlignment = r;
            }
          }
        });
        break;
      case "stagger":
        a = this._getMaxLabelHeight(n, i.staggeringSpacing);
        ie(s, t - 1, function (e, n) {
          if (n / (t - 1) % 2 != 0) {
            e.labelOffset = a;
          }
        });
        break;
      case "auto":
      case "_auto":
        if (t === 2) {
          this._applyLabelMode("stagger", t, n, i);
        } else {
          this._applyLabelMode("rotate", t, n, {
            rotationAngle: ne(n, l)
          });
        }
        break;
      default:
        ie(s, t);
    }
  },
  getMarkerTrackers: _.noop,
  _drawDateMarkers: _.noop,
  _adjustDateMarkers: _.noop,
  coordsIn: _.noop,
  areCoordsOutsideAxis: _.noop,
  _getSkippedCategory: _.noop,
  _initAxisPositions: _.noop,
  _drawTitle: _.noop,
  _updateTitleCoords: _.noop,
  _adjustConstantLineLabels: _.noop,
  _createTranslator: function () {
    return new c.Translator2D({}, {}, {});
  },
  _updateTranslator: function () {
    var e = this._translator;
    e.update(e.getBusinessRange(), this._canvas || {}, this._getTranslatorOptions());
  },
  _getTranslatorOptions: function () {
    var i = this._options;
    return {
      isHorizontal: this._isHorizontal,
      shiftZeroValue: !this.isArgumentAxis,
      interval: i.semiDiscreteInterval,
      firstDayOfWeek: i.workWeek?.[0],
      stick: this._getStick(),
      breaksSize: i.breakStyle?.width ?? 0
    };
  },
  getVisibleArea: function () {
    var e = this._getCanvasStartEnd();
    return [e.start, e.end].sort(function (e, t) {
      return e - t;
    });
  },
  _getCanvasStartEnd: function () {
    var e = this._isHorizontal;
    var t = this._canvas || {};
    var n = this._translator.getBusinessRange().invert;
    var i = e ? [t.left, t.width - t.right] : [t.height - t.bottom, t.top];
    if (n) {
      i.reverse();
    }
    return {
      start: i[0],
      end: i[1]
    };
  },
  _getScreenDelta: function () {
    var e = this._getCanvasStartEnd();
    var t = this._seriesData && this._seriesData.breaks || [];
    var n = t.length;
    return O(e.start - e.end) - (n ? t[n - 1].cumulativeWidth : 0);
  },
  _getScaleBreaks: function () {
    return [];
  },
  _filterBreaks: function () {
    return [];
  },
  _adjustTitle: _.noop,
  _checkTitleOverflow: _.noop,
  getSpiderTicks: _.noop,
  setSpiderTicks: _.noop,
  _checkBoundedLabelsOverlapping: _.noop,
  _checkShiftedLabels: _.noop,
  drawScaleBreaks: _.noop,
  _visualRange: _.noop,
  _rotateConstantLine: _.noop,
  applyVisualRangeSetter: function (e) {
    this._visualRange = e;
  },
  getCategoriesSorter: function (e) {
    var t;
    if (this.isArgumentAxis) {
      t = e;
    } else {
      var n = this._options.categoriesSortingMethod;
      t = n ?? this._options.categories;
    }
    return t;
  },
  _getAdjustedBusinessRange: function () {
    return this.adjustViewport(this._translator.getBusinessRange());
  }
};