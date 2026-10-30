exports.default = undefined;
var i = require("./13306.js");
var o = r(require("./24894.js"));
var a = r(require("./27428.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s = Math;
var l = s.abs;
var u = s.min;
var d = s.max;
var c = s.round;
var h = (0, i.extend)({}, a.default, {
  _calculateVisibility: o.default._calculateVisibility,
  _getContinuousPoints: function (e, t) {
    var n = this.x;
    var i = this._options.rotated ? function (e, t) {
      return [t, e];
    } : function (e, t) {
      return [e, t];
    };
    var o = this.width;
    var a = this.highY;
    var r = l(a - e) < l(a - t) ? e : t;
    var s = r === t ? e : t;
    if (s === r) {
      return [].concat(i(n, this.highY)).concat(i(n, this.lowY)).concat(i(n, this.closeY)).concat(i(n - o / 2, this.closeY)).concat(i(n + o / 2, this.closeY)).concat(i(n, this.closeY));
    } else {
      return [].concat(i(n, this.highY)).concat(i(n, r)).concat(i(n + o / 2, r)).concat(i(n + o / 2, s)).concat(i(n, s)).concat(i(n, this.lowY)).concat(i(n, s)).concat(i(n - o / 2, s)).concat(i(n - o / 2, r)).concat(i(n, r));
    }
  },
  _getCrockPoints: function (e) {
    var t = this.x;
    var n = this._options.rotated ? function (e, t) {
      return [t, e];
    } : function (e, t) {
      return [e, t];
    };
    return [].concat(n(t, this.highY)).concat(n(t, this.lowY)).concat(n(t, e)).concat(n(t - this.width / 2, e)).concat(n(t + this.width / 2, e)).concat(n(t, e));
  },
  _getPoints: function () {
    var e = this.closeY;
    var t = this.openY;
    if (e !== null && t !== null) {
      return this._getContinuousPoints(t, e);
    } else if (t === e) {
      return [this.x, this.highY, this.x, this.lowY];
    } else {
      return this._getCrockPoints(t !== null ? t : e);
    }
  },
  getColor: function () {
    if (this._isReduction) {
      return this._options.reduction.color;
    } else {
      return this._styles.normal.stroke || this.series.getColor();
    }
  },
  _drawMarkerInGroup: function (e, t, n) {
    this.graphic = n.path(this._getPoints(), "area").attr({
      "stroke-linecap": "square"
    }).attr(t).data({
      "chart-data-point": this
    }).sharp().append(e);
  },
  _fillStyle: function () {
    var e = this._options.styles;
    if (this._isReduction && this._isPositive) {
      this._styles = e.reductionPositive;
    } else if (this._isReduction) {
      this._styles = e.reduction;
    } else if (this._isPositive) {
      this._styles = e.positive;
    } else {
      this._styles = e;
    }
  },
  _getMinTrackerWidth: function () {
    return 2 + this._styles.normal["stroke-width"] * 2;
  },
  correctCoordinates: function (e) {
    var t = this._getMinTrackerWidth();
    var n = e.width;
    n = n < t ? t : n > 10 ? 10 : n;
    this.width = n + n % 2;
    this.xCorrection = e.offset;
  },
  _getMarkerGroup: function (e) {
    if (this._isReduction && this._isPositive) {
      return e.reductionPositiveMarkersGroup;
    } else if (this._isReduction) {
      return e.reductionMarkersGroup;
    } else if (this._isPositive) {
      return e.defaultPositiveMarkersGroup;
    } else {
      return e.defaultMarkersGroup;
    }
  },
  _drawMarker: function (e, t) {
    this._drawMarkerInGroup(this._getMarkerGroup(t), this._getStyle(), e);
  },
  _getSettingsForTracker: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this.highY;
    var a = this.lowY;
    var r = this._options.rotated;
    if (o === a) {
      o = r ? o + 2 : o - 2;
      a = r ? a - 2 : a + 2;
    }
    if (r) {
      e = u(a, o);
      t = this.x - this.width / 2;
      n = l(a - o);
      i = this.width;
    } else {
      e = this.x - this.width / 2;
      t = u(a, o);
      n = this.width;
      i = l(a - o);
    }
    return {
      x: e,
      y: t,
      width: n,
      height: i
    };
  },
  _getGraphicBBox: function (e) {
    var t = this._options.rotated;
    var n = this.x;
    var i = this.width;
    var o = this.lowY;
    var a = this.highY;
    if (e) {
      var r = this.series.getValueAxis().getVisibleArea();
      a = this._truncateCoord(a, r);
      o = this._truncateCoord(o, r);
    }
    var s = {
      x: t ? o : n - c(i / 2),
      y: t ? n - c(i / 2) : a,
      width: t ? a - o : i,
      height: t ? i : o - a
    };
    if (e) {
      var l = e === "top";
      if (this._options.rotated) {
        s.x = l ? s.x + s.width : s.x;
        s.width = 0;
      } else {
        s.y = l ? s.y : s.y + s.height;
        s.height = 0;
      }
    }
    return s;
  },
  getTooltipParams: function (e) {
    if (this.graphic) {
      var t = u(this.lowY, this.highY);
      var n = d(this.lowY, this.highY);
      var i = this._getVisibleArea();
      var o = this._options.rotated;
      var a = o ? i.minX : i.minY;
      var r = o ? i.maxX : i.maxY;
      var s = d(a, t);
      var l = u(r, n);
      var c = this.getCenterCoord();
      if (e === "edge") {
        c[o ? "x" : "y"] = o ? l : s;
      }
      c.offset = 0;
      return c;
    }
  },
  getCenterCoord: function () {
    if (this.graphic) {
      var e;
      var t;
      var n = u(this.lowY, this.highY);
      var i = d(this.lowY, this.highY);
      var o = this._getVisibleArea();
      var a = this._options.rotated;
      var r = a ? o.minX : o.minY;
      var s = a ? o.maxX : o.maxY;
      var l = d(r, n);
      var c = l + (u(s, i) - l) / 2;
      if (a) {
        t = this.x;
        e = c;
      } else {
        e = this.x;
        t = c;
      }
      return {
        x: e,
        y: t
      };
    }
  },
  hasValue: function () {
    return this.highValue !== null && this.lowValue !== null;
  },
  hasCoords: function () {
    return this.x !== null && this.lowY !== null && this.highY !== null;
  },
  _translate: function () {
    var e = this._options.rotated;
    var t = this._getValTranslator();
    var n = this._getArgTranslator().translate(this.argument);
    this.vx = this.vy = this.x = n === null ? n : n + (this.xCorrection || 0);
    this.openY = this.openValue !== null ? t.translate(this.openValue) : null;
    this.highY = t.translate(this.highValue);
    this.lowY = t.translate(this.lowValue);
    this.closeY = this.closeValue !== null ? t.translate(this.closeValue) : null;
    var i = u(this.lowY, this.highY) + l(this.lowY - this.highY) / 2;
    this._calculateVisibility(e ? i : this.x, e ? this.x : i);
  },
  getCrosshairData: function (e, t) {
    var n;
    var i;
    var o = this._options.rotated;
    var a = o ? e : t;
    var r = this.argument;
    var s = "low";
    if (l(this.lowY - a) < l(this.closeY - a)) {
      n = this.lowY;
    } else {
      n = this.closeY;
      s = "close";
    }
    if (l(n - a) >= l(this.openY - a)) {
      n = this.openY;
      s = "open";
    }
    if (l(n - a) >= l(this.highY - a)) {
      n = this.highY;
      s = "high";
    }
    (i = o ? {
      y: this.vy,
      x: n,
      xValue: this[s + "Value"],
      yValue: r
    } : {
      x: this.vx,
      y: n,
      xValue: r,
      yValue: this[s + "Value"]
    }).axis = this.series.axis;
    return i;
  },
  _updateData: function (e) {
    var t = this._label;
    var n = this._options.reduction.color;
    this.value = this.initialValue = e.reductionValue;
    this.originalValue = e.value;
    this.lowValue = this.originalLowValue = e.lowValue;
    this.highValue = this.originalHighValue = e.highValue;
    this.openValue = this.originalOpenValue = e.openValue;
    this.closeValue = this.originalCloseValue = e.closeValue;
    this._isPositive = e.openValue < e.closeValue;
    this._isReduction = e.isReduction;
    if (this._isReduction) {
      t.setColor(n);
    }
  },
  _updateMarker: function (e, t, n) {
    var i = this.graphic;
    i.attr({
      points: this._getPoints()
    }).smartAttr(t).sharp();
    if (n) {
      i.append(this._getMarkerGroup(n));
    }
  },
  _getLabelFormatObject: function () {
    return {
      openValue: this.openValue,
      highValue: this.highValue,
      lowValue: this.lowValue,
      closeValue: this.closeValue,
      reductionValue: this.initialValue,
      argument: this.initialArgument,
      value: this.initialValue,
      seriesName: this.series.name,
      originalOpenValue: this.originalOpenValue,
      originalCloseValue: this.originalCloseValue,
      originalLowValue: this.originalLowValue,
      originalHighValue: this.originalHighValue,
      originalArgument: this.originalArgument,
      point: this
    };
  },
  _getFormatObject: function (e) {
    var t = e.formatValue(this.highValue);
    var n = e.formatValue(this.openValue);
    var a = e.formatValue(this.closeValue);
    var r = e.formatValue(this.lowValue);
    var s = o.default._getFormatObject.call(this, e);
    return (0, i.extend)({}, s, {
      valueText: "h: " + t + (n !== "" ? " o: " + n : "") + (a !== "" ? " c: " + a : "") + " l: " + r,
      highValueText: t,
      openValueText: n,
      closeValueText: a,
      lowValueText: r
    });
  },
  getMaxValue: function () {
    return this.highValue;
  },
  getMinValue: function () {
    return this.lowValue;
  }
});
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;