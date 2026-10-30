exports.default = undefined;
var i = require("./13306.js");
var o = l(require("./24894.js"));
var a = require("./19157.js");
var r = require("./35922.js");
var s = l(require("./32410.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = i.extend;
var d = Math.round;
var c = Math.sqrt;
var h = Math.acos;
var f = 180 / Math.PI;
var p = Math.abs;
var g = s.default.radialLabelIndent;
var m = u({}, o.default, {
  _updateData: function (e, t) {
    o.default._updateData.call(this, e);
    if (!!t || !(0, r.isDefined)(this._visible)) {
      this._visible = true;
    }
    this.minValue = this.initialMinValue = this.originalMinValue = (0, r.isDefined)(e.minValue) ? e.minValue : 0;
  },
  animate: function (e, t, n) {
    this.graphic.animate({
      x: this.centerX,
      y: this.centerY,
      outerRadius: this.radiusOuter,
      innerRadius: this.radiusInner,
      startAngle: this.toAngle,
      endAngle: this.fromAngle
    }, {
      delay: n,
      partitionDuration: t
    }, e);
  },
  correctPosition: function (e) {
    this.correctRadius(e);
    this.correctLabelRadius(e.radiusOuter + g);
    this.centerX = e.centerX;
    this.centerY = e.centerY;
  },
  correctRadius: function (e) {
    this.radiusInner = e.radiusInner;
    this.radiusOuter = e.radiusOuter;
  },
  correctLabelRadius: function (e) {
    this.radiusLabels = e;
  },
  correctValue: function (e, t, n) {
    this.value = (n || this.normalInitialValue) + e;
    this.minValue = e;
    this.percent = t;
    this._label.setDataField("percent", t);
  },
  _updateLabelData: function () {
    this._label.setData(this._getLabelFormatObject());
  },
  _getShiftLabelCoords: function () {
    var e = this._label.getBoundingRect();
    var t = this._getLabelCoords(this._label);
    var n = this._getVisibleArea();
    if (this._isLabelDrawingWithoutPoints) {
      return this._checkLabelPosition(t, e, n);
    } else {
      return this._getLabelExtraCoord(t, this._checkVerticalLabelPosition(t, e, n), e);
    }
  },
  _getLabelPosition: function (e) {
    return e.position;
  },
  getAnnotationCoords: function (e) {
    return this._getElementCoords(e !== "edge" ? "inside" : "outside", this.radiusOuter, 0);
  },
  _getElementCoords: function (e, t, n) {
    var i;
    var o;
    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    var s = this;
    var l = (0, a.getCosAndSin)(s.middleAngle);
    var u = s.radiusInner;
    var c = s.radiusOuter;
    var h = e === "columns";
    if (e === "inside") {
      i = u + (c - u) / 2 + n;
      o = s.centerX + i * l.cos - r.width / 2;
    } else {
      i = t + n;
      o = l.cos > 0.1 || h && l.cos >= 0 ? s.centerX + i * l.cos : l.cos < -0.1 || h && l.cos < 0 ? s.centerX + i * l.cos - r.width : s.centerX + i * l.cos - r.width / 2;
    }
    return {
      x: o,
      y: d(s.centerY - i * l.sin - r.height / 2)
    };
  },
  _getLabelCoords: function (e) {
    var t = e.getBoundingRect();
    var n = e.getLayoutOptions();
    var i = this._getLabelPosition(n);
    return this._getElementCoords(i, this.radiusLabels, n.radialOffset, t);
  },
  _correctLabelCoord: function (e, t) {
    var n = this._label;
    var i = n.getBoundingRect().width;
    var o = n.getLayoutOptions();
    var r = this._getVisibleArea();
    var s = r.maxX - i;
    var l = r.minX;
    var u = (0, a.normalizeAngle)(this.middleAngle);
    var d = this.centerX;
    var c = o.connectorOffset;
    var h = e.x;
    if (o.position === "columns") {
      h = u <= 90 || u >= 270 ? s : l;
      e.x = h;
    } else if (o.position !== "inside" && t) {
      if (u <= 90 || u >= 270) {
        if (h - c < d) {
          h = d + c;
        }
      } else if (h + i + c > d) {
        h = d - i - c;
      }
      e.x = h;
    }
    return e;
  },
  drawLabel: function () {
    this.translate();
    this._isLabelDrawingWithoutPoints = true;
    this._drawLabel();
    this._isLabelDrawingWithoutPoints = false;
  },
  updateLabelCoord: function (e) {
    var t = this._label.getBoundingRect();
    var n = this._correctLabelCoord(t, e);
    n = this._checkHorizontalLabelPosition(n, t, this._getVisibleArea());
    this._label.shift(d(n.x), d(t.y));
  },
  _checkVerticalLabelPosition: function (e, t, n) {
    var i = e.x;
    var o = e.y;
    if (e.y + t.height > n.maxY) {
      o = n.maxY - t.height;
    } else if (e.y < n.minY) {
      o = n.minY;
    }
    return {
      x: i,
      y: o
    };
  },
  _getLabelExtraCoord: function (e, t, n) {
    if (e.y !== t.y) {
      return (0, a.getVerticallyShiftedAngularCoords)({
        x: e.x,
        y: e.y,
        width: n.width,
        height: n.height
      }, t.y - e.y, {
        x: this.centerX,
        y: this.centerY
      });
    } else {
      return e;
    }
  },
  _checkHorizontalLabelPosition: function (e, t, n) {
    var i = e.x;
    var o = e.y;
    if (e.x + t.width > n.maxX) {
      i = n.maxX - t.width;
    } else if (e.x < n.minX) {
      i = n.minX;
    }
    return {
      x: i,
      y: o
    };
  },
  applyWordWrap: function (e) {
    var t = this._label;
    var n = t.getBoundingRect();
    var i = this._getVisibleArea();
    var o = t.getLayoutOptions().position;
    var a = n.width;
    var r = false;
    if (o === "columns" && this.series.index > 0) {
      a = i.maxX - this.centerX - this.radiusLabels;
    } else if (o === "inside") {
      if (a > i.maxX - i.minX) {
        a = i.maxX - i.minX;
      }
    } else if (e && n.x < this.centerX && n.width + n.x > this.centerX) {
      a = Math.floor((i.maxX - i.minX) / 2);
    } else if (n.x + a > i.maxX) {
      a = i.maxX - n.x;
    } else if (n.x < i.minX) {
      a = n.x + a - i.minX;
    }
    if (a < n.width) {
      r = t.fit(a);
    }
    return r;
  },
  setLabelTrackerData: function () {
    this._label.setTrackerData(this);
  },
  _checkLabelPosition: function (e, t, n) {
    e = this._checkHorizontalLabelPosition(e, t, n);
    return this._checkVerticalLabelPosition(e, t, n);
  },
  _getLabelConnector: function () {
    var e = this.radiusOuter;
    var t = this._options.styles.normal;
    var n = t["stroke-width"] / 2;
    var i = this.series.getOptions().containerBackgroundColor === t.stroke ? d(n) : d(-n);
    var o = (0, a.getCosAndSin)(d(this.middleAngle));
    return {
      x: d(this.centerX + (e - i) * o.cos),
      y: d(this.centerY - (e - i) * o.sin),
      angle: this.middleAngle
    };
  },
  _drawMarker: function (e, t, n, i) {
    var o = this.radiusOuter;
    var a = this.radiusInner;
    var r = this.fromAngle;
    var s = this.toAngle;
    if (n) {
      a = o = 0;
      if (!i) {
        r = s = this.shiftedAngle;
      }
    }
    this.graphic = e.arc(this.centerX, this.centerY, a, o, s, r).attr({
      "stroke-linejoin": "round"
    }).smartAttr(this._getStyle()).data({
      "chart-data-point": this
    }).sharp().append(t);
  },
  getTooltipParams: function () {
    var e = (0, a.getCosAndSin)(this.middleAngle);
    var t = this.radiusInner;
    var n = this.radiusOuter;
    return {
      x: this.centerX + (t + (n - t) / 2) * e.cos,
      y: this.centerY - (t + (n - t) / 2) * e.sin,
      offset: 0
    };
  },
  _translate: function () {
    var e = this.shiftedAngle || 0;
    var t = this.value;
    var n = this.minValue;
    var i = this._getValTranslator();
    this.fromAngle = i.translate(n) + e;
    this.toAngle = i.translate(t) + e;
    this.middleAngle = i.translate((t - n) / 2 + n) + e;
    if (!this.isVisible()) {
      this.middleAngle = this.toAngle = this.fromAngle = this.fromAngle || e;
    }
  },
  getMarkerVisibility: function () {
    return true;
  },
  _updateMarker: function (e, t, n, i) {
    if (!e) {
      t = u({
        x: this.centerX,
        y: this.centerY,
        outerRadius: this.radiusOuter,
        innerRadius: this.radiusInner,
        startAngle: this.toAngle,
        endAngle: this.fromAngle
      }, t);
    }
    this.graphic.smartAttr(t).sharp();
    if (i) {
      i();
    }
  },
  getLegendStyles: function () {
    return this._styles.legendStyles;
  },
  isInVisibleArea: function () {
    return true;
  },
  hide: function () {
    if (this._visible) {
      this._visible = false;
      this.hideTooltip();
      this._options.visibilityChanged();
    }
  },
  show: function () {
    if (!this._visible) {
      this._visible = true;
      this._options.visibilityChanged();
    }
  },
  setInvisibility: function () {
    this._label.draw(false);
  },
  isVisible: function () {
    return this._visible;
  },
  _getFormatObject: function (e) {
    var t = o.default._getFormatObject.call(this, e);
    var n = this.percent;
    t.percent = n;
    t.percentText = e.formatValue(n, "percent");
    return t;
  },
  getColor: function () {
    return this._styles.normal.fill;
  },
  coordsIn: function (e, t) {
    var n;
    var i = e - this.centerX;
    var o = t - this.centerY;
    var a = c(i * i + o * o);
    var r = this.fromAngle % 360;
    var s = this.toAngle % 360;
    return !(a < this.radiusInner) && !(a > this.radiusOuter) && a !== 0 && ((n = h(i / a) * f * (o > 0 ? -1 : 1)) < 0 && (n += 360), r === s && p(this.toAngle - this.fromAngle) > 0.0001 || (r >= s ? n <= r && n >= s : !(n >= r) || !(n <= s)));
  }
});
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;