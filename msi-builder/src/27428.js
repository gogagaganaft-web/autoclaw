exports.default = undefined;
var i;
var o = require("./13306.js");
var a = (i = require("./24894.js")) && i.__esModule ? i : {
  default: i
};
var r = o.extend;
var s = Math;
var l = s.floor;
var u = s.abs;
function d(e) {
  var t = e.initialValue;
  var n = e._getValTranslator().getBusinessRange().invert;
  var i = e.series.valueAxisType === "discrete";
  var o = e.series.isFullStackedSeries();
  if (!i && (t >= 0 && !n || t < 0 && n) || i && !n || o) {
    return "top";
  } else {
    return "bottom";
  }
}
var c = r({}, a.default, {
  correctCoordinates: function (e) {
    var t = l(e.offset - e.width / 2);
    if (this._options.rotated) {
      this.height = e.width;
      this.yCorrection = t;
      this.xCorrection = null;
    } else {
      this.width = e.width;
      this.xCorrection = t;
      this.yCorrection = null;
    }
  },
  _calculateVisibility: function (e, t, n, i) {
    var o = this._getVisibleArea();
    var a = o.minX;
    var r = o.maxX;
    var s = o.minY;
    var l = o.maxY;
    this.inVisibleArea = a < e + n && r > e && s < t + i && l > t;
  },
  _getGraphicBBox: function (e) {
    var t = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
    if (e) {
      var n = e === "top";
      if (this._options.rotated) {
        t.x = n ? t.x + t.width : t.x;
        t.width = 0;
      } else {
        t.y = n ? t.y : t.y + t.height;
        t.height = 0;
      }
    }
    return t;
  },
  _getLabelConnector: function (e) {
    return this._getGraphicBBox(e);
  },
  _getLabelPosition: function () {
    var e = d(this);
    if (this._options.rotated) {
      e = e === "top" ? "right" : "left";
    }
    return e;
  },
  _getLabelCoords: function (e) {
    if (this.initialValue === 0 && this.series.isFullStackedSeries()) {
      if (this._options.rotated) {
        return this._getLabelCoordOfPosition(e, "right");
      } else {
        return this._getLabelCoordOfPosition(e, "top");
      }
    } else if (e.getLayoutOptions().position === "inside") {
      return this._getLabelCoordOfPosition(e, "inside");
    } else {
      return a.default._getLabelCoords.call(this, e);
    }
  },
  _drawLabel: function () {
    this._label.pointPosition = this._label.getLayoutOptions().position !== "inside" && d(this);
    a.default._drawLabel.call(this);
  },
  hideInsideLabel: function (e, t) {
    var n = this._getGraphicBBox();
    var i = e.getBoundingRect();
    return !!this._options.resolveLabelsOverlapping && (!!(t.y <= n.y) && !!(t.y + i.height >= n.y + n.height) || !!(t.x <= n.x) && !!(t.x + i.width >= n.x + n.width)) && !(t.y > n.y + n.height) && !(t.y + i.height < n.y) && !(t.x > n.x + n.width) && !(t.x + i.width < n.x) && (e.draw(false), true);
  },
  _showForZeroValues: function () {
    return this._options.label.showForZeroValues || this.initialValue;
  },
  _drawMarker: function (e, t, n) {
    var i = this._getStyle();
    var o = this._options.cornerRadius;
    var a = this._options.rotated;
    var r = this.getMarkerCoords();
    var s = r.x;
    var l = r.y;
    var u = r.width;
    var d = r.height;
    if (n) {
      if (a) {
        u = 0;
        s = this.defaultX;
      } else {
        d = 0;
        l = this.defaultY;
      }
    }
    this.graphic = e.rect(s, l, u, d).attr({
      rx: o,
      ry: o
    }).smartAttr(i).data({
      "chart-data-point": this
    }).append(t);
  },
  _getSettingsForTracker: function () {
    var e = this.y;
    var t = this.height;
    var n = this.x;
    var i = this.width;
    if (this._options.rotated) {
      if (i === 1) {
        i = 9;
        n -= 4;
      }
    } else if (t === 1) {
      t = 9;
      e -= 4;
    }
    return {
      x: n,
      y: e,
      width: i,
      height: t
    };
  },
  getGraphicSettings: function () {
    var e = this.graphic;
    return {
      x: e.attr("x"),
      y: e.attr("y"),
      height: e.attr("height"),
      width: e.attr("width")
    };
  },
  _getEdgeTooltipParams: function () {
    var e;
    var t;
    var n = this.value >= 0;
    var i = this._getValTranslator().getBusinessRange().invert;
    var o = this.x;
    var a = this.y;
    var r = this.width;
    var s = this.height;
    if (this._options.rotated) {
      t = a + s / 2;
      e = i ? n ? o : o + r : n ? o + r : o;
    } else {
      e = o + r / 2;
      t = i ? n ? a + s : a : n ? a : a + s;
    }
    return {
      x: e,
      y: t,
      offset: 0
    };
  },
  getTooltipParams: function (e) {
    if (e === "edge") {
      return this._getEdgeTooltipParams();
    }
    var t = this.getCenterCoord();
    t.offset = 0;
    return t;
  },
  getCenterCoord: function () {
    var e = this.width;
    var t = this.height;
    return {
      x: this.x + e / 2,
      y: this.y + t / 2
    };
  },
  _truncateCoord: function (e, t) {
    if (e === null) {
      return e;
    } else if (e < t[0]) {
      return t[0];
    } else if (e > t[1]) {
      return t[1];
    } else {
      return e;
    }
  },
  _getErrorBarBaseEdgeLength: function () {
    if (this._options.rotated) {
      return this.height;
    } else {
      return this.width;
    }
  },
  _translateErrorBars: function (e) {
    a.default._translateErrorBars.call(this);
    if (this._errorBarPos < e[0] || this._errorBarPos > e[1]) {
      this._errorBarPos = undefined;
    }
  },
  _translate: function () {
    var e = this._options.rotated;
    var t = e ? "x" : "y";
    var n = e ? "y" : "x";
    var i = e ? "width" : "height";
    var o = e ? "height" : "width";
    var a = this._getArgTranslator();
    var r = this._getValTranslator();
    var s = this.series.getArgumentAxis().getVisibleArea();
    var l = this.series.getValueAxis().getVisibleArea();
    var d = a.translate(this.argument);
    var c = r.translate(this.value, 1);
    var h = r.translate(this.minValue, -1);
    this[n] = d = d === null ? d : d + (this[n + "Correction"] || 0);
    this["v" + t] = c;
    this["v" + n] = d + this[o] / 2;
    c = this._truncateCoord(c, l);
    h = this._truncateCoord(h, l);
    this[i] = u(c - h);
    c = c < h ? c : h;
    this._calculateVisibility(e ? c : d, e ? d : c, this.width, this.height);
    this[t] = c === null ? c : c + (this[t + "Correction"] || 0);
    this["min" + t.toUpperCase()] = h === null ? h : h + (this[t + "Correction"] || 0);
    this["default" + t.toUpperCase()] = r.translate("canvas_position_default");
    this._translateErrorBars(s);
    if (this.inVisibleArea && this[n] !== null) {
      if (this[n] < s[0]) {
        this[o] = this[o] - (s[0] - this[n]);
        this[n] = s[0];
      }
      if (this[n] + this[o] > s[1]) {
        this[o] = s[1] - this[n];
      }
    }
  },
  _updateMarker: function (e, t) {
    this.graphic.smartAttr(r({}, t, e ? {} : this.getMarkerCoords()));
  },
  getMarkerCoords: function () {
    var e = this.x;
    var t = this.y;
    var n = this.width;
    var i = this.height;
    var o = this.series.getArgumentAxis();
    var a = this._options.rotated;
    if (o.getAxisPosition) {
      var r = o.getOptions();
      var s = Math.round(r.width / 2);
      var l = o.getAxisPosition();
      if (r.visible) {
        if (a) {
          var u = this.minX === this.defaultX && this.minX === l - o.getAxisShift();
          e += u ? s : 0;
          if ((n -= u ? s : 0) < 0) {
            n = 0;
          }
        } else if ((i -= this.minY === this.defaultY && this.minY === l - o.getAxisShift() ? s : 0) < 0) {
          i = 0;
        }
      }
    }
    return {
      x: e,
      y: t,
      width: n,
      height: i
    };
  },
  coordsIn: function (e, t) {
    return e >= this.x && e <= this.x + this.width && t >= this.y && t <= this.y + this.height;
  }
});
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;