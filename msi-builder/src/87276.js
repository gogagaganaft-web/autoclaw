exports.Translator2D = undefined;
var i = require("./13306.js");
var o = require("./95479.js");
var a = require("./21177.js");
var r = p(require("./46163.js"));
var s = p(require("./93175.js"));
var l = p(require("./75480.js"));
var u = p(require("./1804.js"));
var d = require("./19157.js");
var c = require("./35922.js");
var h = require("./60810.js");
var f = p(require("./91198.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = Math.abs;
var m = ["width", "height", "left", "top", "bottom", "right"];
var _ = {
  to: function (e) {
    var t = this._canvasOptions.startPoint + (this._options.conversionValue ? e : Math.round(e));
    if (t > this._canvasOptions.endPoint) {
      return this._canvasOptions.endPoint;
    } else {
      return t;
    }
  },
  from: function (e) {
    return e - this._canvasOptions.startPoint;
  }
};
function v(e) {
  (0, o.each)(m, function (t, n) {
    e[n] = parseInt(e[n]) || 0;
  });
  return e;
}
function y(e) {
  return {
    isStartSide: e ? function (e, t, n, i) {
      return e <= t[t.length - 1][i];
    } : function (e, t, n, i) {
      return e < t[0][n];
    },
    isEndSide: e ? function (e, t, n, i) {
      return e > t[0][n];
    } : function (e, t, n, i) {
      return e >= t[t.length - 1][i];
    },
    isInBreak: e ? function (e, t, n, i) {
      return e > t[i] && e <= t[n];
    } : function (e, t, n, i) {
      return e >= t[n] && e < t[i];
    },
    isBetweenBreaks: e ? function (e, t, n, i, o) {
      return e >= t[o] && e < n[i];
    } : function (e, t, n, i, o) {
      return e < t[i] && e >= n[o];
    },
    getLength: e ? function (e, t) {
      return t.length - e.length;
    } : function (e) {
      return e.length;
    },
    getBreaksSize: e ? function (e, t) {
      return t.cumulativeWidth - e.cumulativeWidth;
    } : function (e) {
      return e.cumulativeWidth;
    }
  };
}
function b(e, t, n) {
  this.update(e, t, n);
}
exports.Translator2D = b;
b.prototype = {
  constructor: b,
  reinit: function () {
    var e = this;
    var t = e._options;
    var n = e._businessRange;
    var o = n.categories || [];
    var a = {};
    var c = e._prepareCanvasOptions();
    var h = (0, d.getCategoriesInfo)(o, n.minVisible, n.maxVisible).categories;
    var p = h.length;
    if (n.isEmpty()) {
      a = _;
    } else {
      switch (n.axisType) {
        case "logarithmic":
          a = u.default;
          break;
        case "semidiscrete":
          a = s.default;
          c.ratioOfCanvasRange = c.canvasLength / (f.default.addInterval(c.rangeMaxVisible, t.interval) - c.rangeMinVisible);
          break;
        case "discrete":
          a = r.default;
          e._categories = o;
          c.interval = e._getDiscreteInterval(t.addSpiderCategory ? p + 1 : p, c);
          e._categoriesToPoints = function (e) {
            var t = {};
            e.forEach(function (e, n) {
              t[e.valueOf()] = n;
            });
            return t;
          }(o);
          if (p) {
            c.startPointIndex = e._categoriesToPoints[h[0].valueOf()];
            e.visibleCategories = h;
          }
          break;
        default:
          if (n.dataType === "datetime") {
            a = l.default;
          }
      }
    }
    (e._oldMethods || []).forEach(function (t) {
      delete e[t];
    });
    e._oldMethods = Object.keys(a);
    (0, i.extend)(e, a);
    e._conversionValue = t.conversionValue ? function (e) {
      return e;
    } : function (e) {
      return Math.round(e);
    };
    e.sc = {};
    e._checkingMethodsAboutBreaks = [y(false), y(e.isInverted())];
    e._translateBreaks();
    e._calculateSpecialValues();
  },
  _translateBreaks: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this._breaks;
    var a = this._options.breaksSize;
    if (o !== undefined) {
      e = 0;
      i = o.length;
      for (; e < i; e++) {
        t = o[e];
        n = this.translate(t.to);
        t.end = n;
        t.start = t.gapSize ? n : this.isInverted() ? n + a : n - a;
      }
    }
  },
  _checkValueAboutBreaks: function (e, t, n, i, o) {
    var a;
    var r;
    var s;
    var l;
    var u = {
      length: 0,
      breaksSize: undefined,
      inBreak: false
    };
    var d = e[e.length - 1];
    if (o.isStartSide(t, e, n, i)) {
      return u;
    }
    if (o.isEndSide(t, e, n, i)) {
      return {
        length: d.length,
        breaksSize: d.cumulativeWidth,
        inBreak: false
      };
    }
    a = 0;
    r = e.length;
    for (; a < r; a++) {
      s = e[a];
      l = e[a - 1];
      if (o.isInBreak(t, s, n, i)) {
        u.inBreak = true;
        u.break = s;
        break;
      }
      if (l && o.isBetweenBreaks(t, s, l, n, i)) {
        u = {
          length: o.getLength(l, d),
          breaksSize: o.getBreaksSize(l, d),
          inBreak: false
        };
        break;
      }
    }
    return u;
  },
  isInverted: function () {
    return !(this._options.isHorizontal ^ this._businessRange.invert);
  },
  _getDiscreteInterval: function (e, t) {
    var n = e - (this._options.stick ? 1 : 0);
    if (n > 0) {
      return t.canvasLength / n;
    } else {
      return t.canvasLength;
    }
  },
  _prepareCanvasOptions: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    var r = this._businessRange;
    var s = this._canvasOptions = (t = (e = r).min, n = e.max, i = e.minVisible, o = e.maxVisible, e.axisType === "logarithmic" && (o = (0, d.getLogExt)(o, e.base, e.allowNegatives, e.linearThreshold), i = (0, d.getLogExt)(i, e.base, e.allowNegatives, e.linearThreshold), t = (0, d.getLogExt)(t, e.base, e.allowNegatives, e.linearThreshold), n = (0, d.getLogExt)(n, e.base, e.allowNegatives, e.linearThreshold)), {
      base: e.base,
      rangeMin: t,
      rangeMax: n,
      rangeMinVisible: i,
      rangeMaxVisible: o
    });
    var l = this._canvas;
    var u = this._breaks;
    s.startPadding = l.startPadding || 0;
    s.endPadding = l.endPadding || 0;
    if (this._options.isHorizontal) {
      s.startPoint = l.left + s.startPadding;
      a = l.width;
      s.endPoint = l.width - l.right - s.endPadding;
      s.invert = r.invert;
    } else {
      s.startPoint = l.top + s.startPadding;
      a = l.height;
      s.endPoint = l.height - l.bottom - s.endPadding;
      s.invert = !r.invert;
    }
    this.canvasLength = s.canvasLength = s.endPoint - s.startPoint;
    s.rangeDoubleError = Math.pow(10, (0, d.getPower)(s.rangeMax - s.rangeMin) - (0, d.getPower)(a) - 2);
    s.ratioOfCanvasRange = s.canvasLength / (s.rangeMaxVisible - s.rangeMinVisible);
    if (u !== undefined) {
      s.ratioOfCanvasRange = (s.canvasLength - u[u.length - 1].cumulativeWidth) / (s.rangeMaxVisible - s.rangeMinVisible - u[u.length - 1].length);
    }
    return s;
  },
  updateCanvas: function (e) {
    this._canvas = v(e);
    this.reinit();
  },
  updateBusinessRange: function (e) {
    var t = e.breaks || [];
    this._userBreaks = e.userBreaks || [];
    this._businessRange = function (e) {
      function t(t, n) {
        if (!(0, c.isDefined)(e[t]) && (0, c.isDefined)(e[n])) {
          e[t] = e[n];
        }
      }
      if (!(e instanceof a.Range)) {
        e = new a.Range(e);
      }
      t("minVisible", "min");
      t("maxVisible", "max");
      return e;
    }(e);
    this._breaks = t.length ? function (e, t) {
      var n;
      var i;
      var o;
      var a;
      var r = t.axisType === "logarithmic" ? function (e) {
        return (0, d.getLogExt)(e, t.base);
      } : function (e) {
        return e;
      };
      var s = [];
      var l = e.length;
      var u = 0;
      for (a = 0; a < l; a++) {
        i = r((n = e[a]).from);
        u += (o = r(n.to)) - i;
        s.push({
          trFrom: i,
          trTo: o,
          from: n.from,
          to: n.to,
          length: u,
          cumulativeWidth: n.cumulativeWidth
        });
      }
      return s;
    }(t, this._businessRange) : undefined;
    this.reinit();
  },
  update: function (e, t, n) {
    this._options = (0, i.extend)(this._options || {}, n);
    this._canvas = v(t);
    this.updateBusinessRange(e);
  },
  getBusinessRange: function () {
    return this._businessRange;
  },
  getEventScale: function (e) {
    return e.deltaScale || 1;
  },
  getCanvasVisibleArea: function () {
    return {
      min: this._canvasOptions.startPoint,
      max: this._canvasOptions.endPoint
    };
  },
  _calculateSpecialValues: function () {
    var e;
    var t = this._canvasOptions;
    var n = t.startPoint - t.startPadding;
    var i = t.endPoint + t.endPadding;
    var o = this._businessRange;
    var a = o.minVisible;
    var r = o.maxVisible;
    var s = n + t.canvasLength / 2;
    if (a < 0 && r > 0 && a !== r) {
      e = this.translate(0, 1);
    }
    if (!(0, c.isDefined)(e)) {
      var l = o.invert ^ (a < 0 && r <= 0);
      e = this._options.isHorizontal ? l ? i : n : l ? n : i;
    }
    this.sc = {
      canvas_position_default: e,
      canvas_position_left: n,
      canvas_position_top: n,
      canvas_position_center: s,
      canvas_position_middle: s,
      canvas_position_right: i,
      canvas_position_bottom: i,
      canvas_position_start: t.invert ? i : n,
      canvas_position_end: t.invert ? n : i
    };
  },
  translateSpecialCase: function (e) {
    return this.sc[e];
  },
  _calculateProjection: function (e) {
    var t = this._canvasOptions;
    if (t.invert) {
      return t.endPoint - e;
    } else {
      return t.startPoint + e;
    }
  },
  _calculateUnProjection: function (e) {
    var t = this._canvasOptions;
    if (this._businessRange.dataType === "datetime") {
      e = Math.round(e);
    }
    if (t.invert) {
      return t.rangeMaxVisible.valueOf() - e;
    } else {
      return t.rangeMinVisible.valueOf() + e;
    }
  },
  getMinBarSize: function (e) {
    var t = this.getCanvasVisibleArea();
    var n = this.from(t.min + e);
    return g(this.from(t.min) - ((0, c.isDefined)(n) ? n : this.from(t.max)));
  },
  checkMinBarSize: function (e, t) {
    if (g(e) < t) {
      if (e >= 0) {
        return t;
      } else {
        return -t;
      }
    } else {
      return e;
    }
  },
  translate: function (e, t) {
    var n = this.translateSpecialCase(e);
    if ((0, c.isDefined)(n)) {
      return Math.round(n);
    } else if (isNaN(e)) {
      return null;
    } else {
      return this.to(e, t);
    }
  },
  getInterval: function (e) {
    var n = this._canvasOptions;
    if (e = e ?? this._businessRange.interval) {
      return Math.round(n.ratioOfCanvasRange * e);
    } else {
      return Math.round(n.endPoint - n.startPoint);
    }
  },
  zoom: function (e, t, n) {
    var i = this._canvasOptions;
    if (i.rangeMinVisible.valueOf() === i.rangeMaxVisible.valueOf() && e !== 0) {
      return this.zoomZeroLengthRange(e, t);
    }
    var o = i.startPoint;
    var a = i.endPoint;
    var r = this.isInverted();
    var s = (o + e) / t;
    var l = (a + e) / t;
    n = n || {};
    var u;
    var d;
    var f = this.to(r ? n.endValue : n.startValue);
    var p = this.to(r ? n.startValue : n.endValue);
    if (f > s) {
      l -= s - f;
      s = f;
      u = r ? n.endValue : n.startValue;
    }
    if (p < l) {
      s -= l - p;
      l = p;
      d = r ? n.startValue : n.endValue;
    }
    if (p - f < l - s) {
      s = f;
      l = p;
    }
    t = (o + (e = (a - o) * s / (l - s) - o)) / s || 1;
    u = (0, c.isDefined)(u) ? u : (0, h.adjust)(this.from(s, 1));
    d = (0, c.isDefined)(d) ? d : (0, h.adjust)(this.from(l, -1));
    if (t <= 1) {
      u = this._correctValueAboutBreaks(u, t === 1 ? e : -1);
      d = this._correctValueAboutBreaks(d, t === 1 ? e : 1);
    }
    if (u > d) {
      u = u > n.endValue ? n.endValue : u;
      d = d < n.startValue ? n.startValue : d;
    } else {
      u = u < n.startValue ? n.startValue : u;
      d = d > n.endValue ? n.endValue : d;
    }
    return {
      min: u,
      max: d,
      translate: (0, h.adjust)(e),
      scale: (0, h.adjust)(t)
    };
  },
  _correctValueAboutBreaks: function (e, t) {
    var n = this._userBreaks.filter(function (t) {
      return e >= t.from && e <= t.to;
    });
    if (n.length) {
      if (t > 0) {
        return n[0].to;
      } else {
        return n[0].from;
      }
    } else {
      return e;
    }
  },
  zoomZeroLengthRange: function (e, t) {
    var n = this._canvasOptions;
    var i = n.rangeMin;
    var o = n.rangeMax;
    var a = (o.valueOf() !== i.valueOf() ? o.valueOf() - i.valueOf() : g(n.rangeMinVisible.valueOf() - i.valueOf())) / n.canvasLength;
    var r = (0, c.isDate)(o) || (0, c.isDate)(i);
    var s = this._businessRange.axisType === "logarithmic";
    var l = n.rangeMinVisible.valueOf() - a;
    var u = n.rangeMaxVisible.valueOf() + a;
    return {
      min: l = s ? (0, h.adjust)((0, d.raiseToExt)(l, n.base)) : r ? new Date(l) : l,
      max: u = s ? (0, h.adjust)((0, d.raiseToExt)(u, n.base)) : r ? new Date(u) : u,
      translate: e,
      scale: t
    };
  },
  getMinScale: function (e) {
    var t = this._businessRange;
    var n = t.dataType;
    var i = t.interval;
    if (n === "datetime" && i === 1) {
      return this.getDateTimeMinScale(e);
    } else if (e) {
      return 1.1;
    } else {
      return 0.9;
    }
  },
  getDateTimeMinScale: function (e) {
    var t = this._canvasOptions;
    var n = t.canvasLength / t.ratioOfCanvasRange;
    n += (parseInt(n * 0.1) || 1) * (e ? -2 : 2);
    return t.canvasLength / (Math.max(n, 1) * t.ratioOfCanvasRange);
  },
  getScale: function (e, t) {
    var n = this._canvasOptions;
    if (n.rangeMax === n.rangeMin) {
      return 1;
    } else {
      e = (0, c.isDefined)(e) ? this.fromValue(e) : n.rangeMin;
      t = (0, c.isDefined)(t) ? this.fromValue(t) : n.rangeMax;
      return (n.rangeMax - n.rangeMin) / Math.abs(e - t);
    }
  },
  isValid: function (e) {
    var t = this._canvasOptions;
    return (e = this.fromValue(e)) !== null && !isNaN(e) && e.valueOf() + t.rangeDoubleError >= t.rangeMin && e.valueOf() - t.rangeDoubleError <= t.rangeMax;
  },
  getCorrectValue: function (e, t) {
    var n;
    var i = this._breaks;
    e = this.fromValue(e);
    if (this._breaks && (n = this._checkValueAboutBreaks(i, e, "trFrom", "trTo", this._checkingMethodsAboutBreaks[0])).inBreak === true) {
      return this.toValue(t > 0 ? n.break.trTo : n.break.trFrom);
    } else {
      return this.toValue(e);
    }
  },
  to: function (e, t) {
    var n = this.getBusinessRange();
    if ((0, c.isDefined)(n.maxVisible) && (0, c.isDefined)(n.minVisible) && n.maxVisible.valueOf() === n.minVisible.valueOf()) {
      if ((0, c.isDefined)(e) && n.maxVisible.valueOf() === e.valueOf()) {
        return this.translateSpecialCase(e === 0 && this._options.shiftZeroValue ? "canvas_position_default" : "canvas_position_middle");
      } else {
        return null;
      }
    }
    e = this.fromValue(e);
    var i = this._canvasOptions;
    var o = this._breaks;
    var a = {
      length: 0
    };
    var r = 0;
    if (o !== undefined) {
      a = this._checkValueAboutBreaks(o, e, "trFrom", "trTo", this._checkingMethodsAboutBreaks[0]);
      r = (0, c.isDefined)(a.breaksSize) ? a.breaksSize : 0;
    }
    if (a.inBreak === true) {
      if (t > 0) {
        return a.break.start;
      } else if (t < 0) {
        return a.break.end;
      } else {
        return null;
      }
    } else {
      return this._conversionValue(this._calculateProjection((e - i.rangeMinVisible - a.length) * i.ratioOfCanvasRange + r));
    }
  },
  from: function (e, t) {
    var n = this._breaks;
    var i = {
      length: 0
    };
    var o = this._canvasOptions;
    var a = o.startPoint;
    var r = 0;
    if (n !== undefined) {
      i = this._checkValueAboutBreaks(n, e, "start", "end", this._checkingMethodsAboutBreaks[1]);
      r = (0, c.isDefined)(i.breaksSize) ? i.breaksSize : 0;
    }
    if (i.inBreak === true) {
      if (t > 0) {
        return this.toValue(i.break.trTo);
      } else if (t < 0) {
        return this.toValue(i.break.trFrom);
      } else {
        return null;
      }
    } else {
      return this.toValue(this._calculateUnProjection((e - a - r) / o.ratioOfCanvasRange + i.length));
    }
  },
  isValueProlonged: false,
  getRange: function () {
    return [this.toValue(this._canvasOptions.rangeMin), this.toValue(this._canvasOptions.rangeMax)];
  },
  getScreenRange: function () {
    return [this._canvasOptions.startPoint, this._canvasOptions.endPoint];
  },
  add: function (e, t, n) {
    return this._add(e, t, (this._businessRange.invert ? -1 : 1) * n);
  },
  _add: function (e, t, n) {
    return this.toValue(this.fromValue(e) + t * n);
  },
  fromValue: function (e) {
    if (e !== null) {
      return Number(e);
    } else {
      return null;
    }
  },
  toValue: function (e) {
    if (e !== null) {
      return Number(e);
    } else {
      return null;
    }
  },
  ratioOfCanvasRange: function () {
    return this._canvasOptions.ratioOfCanvasRange;
  },
  convert: function (e) {
    return e;
  },
  getRangeByMinZoomValue: function (e, t) {
    if (t.minVisible + e <= this._businessRange.max) {
      return [t.minVisible, t.minVisible + e];
    } else {
      return [t.maxVisible - e, t.maxVisible];
    }
  }
};