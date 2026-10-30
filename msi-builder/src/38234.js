exports.polarSymbolPoint = exports.polarBarPoint = undefined;
var i = require("./13306.js");
var o = d(require("./24894.js"));
var a = d(require("./27428.js"));
var r = d(require("./85912.js"));
var s = require("./35922.js");
var l = require("./19157.js");
var u = d(require("./32410.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = i.extend;
var h = Math;
var f = h.max;
var p = u.default.radialLabelIndent;
var g = c({}, o.default, {
  _getLabelCoords: r.default._getLabelCoords,
  _getElementCoords: r.default._getElementCoords,
  _moveLabelOnCanvas: function (e, t, n) {
    var i = e.x;
    var o = e.y;
    if (t.minX > i) {
      i = t.minX;
    }
    if (t.maxX < i + n.width) {
      i = t.maxX - n.width;
    }
    if (t.minY > o) {
      o = t.minY;
    }
    if (t.maxY < o + n.height) {
      o = t.maxY - n.height;
    }
    return {
      x: i,
      y: o
    };
  },
  _getLabelPosition: function () {
    return "outside";
  },
  _getCoords: function (e, t) {
    var n = this.series.getValueAxis();
    var i = n.getAngles()[0];
    var o = this._getArgTranslator().translate(e);
    var a = this._getValTranslator().translate(t);
    var r = (0, l.convertPolarToXY)(n.getCenter(), n.getAngles()[0], o, a);
    r.angle = o + i - 90;
    r.radius = a;
    return r;
  },
  _translate: function () {
    var e = this.series.getValueAxis().getCenter();
    var t = this._getCoords(this.argument, this.value);
    var n = this._getValTranslator();
    var i = n.isInverted() ? n.translate("canvas_position_start") : n.translate("canvas_position_end");
    var o = (0, s.isDefined)(t.radius) && t.radius >= 0 ? t.radius : null;
    this.vx = (0, l.normalizeAngle)(t.angle);
    this.vy = this.radiusOuter = this.radiusLabels = o;
    this.radiusLabels += p;
    this.radius = o;
    this.middleAngle = -t.angle;
    this.angle = -t.angle;
    this.x = t.x;
    this.y = t.y;
    this.defaultX = this.centerX = e.x;
    this.defaultY = this.centerY = e.y;
    this._translateErrorBars();
    this.inVisibleArea = this._checkRadiusForVisibleArea(o, i);
  },
  _checkRadiusForVisibleArea: function (e, t) {
    return (0, s.isDefined)(e) && e <= t;
  },
  _translateErrorBars: function () {
    var e = this._options.errorBars;
    var t = this._getValTranslator();
    if (e) {
      if ((0, s.isDefined)(this.lowError)) {
        this._lowErrorCoord = this.centerY - t.translate(this.lowError);
      }
      if ((0, s.isDefined)(this.highError)) {
        this._highErrorCoord = this.centerY - t.translate(this.highError);
      }
      this._errorBarPos = this.centerX;
      this._baseErrorBarPos = e.type === "stdDeviation" ? this._lowErrorCoord + (this._highErrorCoord - this._lowErrorCoord) / 2 : this.centerY - this.radius;
    }
  },
  _getTranslates: function (e) {
    if (e) {
      return this.getDefaultCoords();
    } else {
      return {
        x: this.x,
        y: this.y
      };
    }
  },
  getDefaultCoords: function () {
    var e = (0, l.getCosAndSin)(-this.angle);
    var t = this._getValTranslator().translate("canvas_position_default");
    return {
      x: this.defaultX + t * e.cos,
      y: this.defaultY + t * e.sin
    };
  },
  _addLabelAlignmentAndOffset: function (e, t) {
    return t;
  },
  _checkLabelPosition: function (e, t) {
    var n = this._getVisibleArea();
    var i = this._getGraphicBBox();
    if (this._isPointInVisibleArea(n, i)) {
      t = this._moveLabelOnCanvas(t, n, e.getBoundingRect());
    }
    return t;
  },
  _getErrorBarSettings: function (e, t) {
    var n = o.default._getErrorBarSettings.call(this, e, t);
    n.rotate = 90 - this.angle;
    n.rotateX = this.centerX;
    n.rotateY = this.centerY;
    return n;
  },
  getCoords: function (e) {
    if (e) {
      return this.getDefaultCoords();
    } else {
      return {
        x: this.x,
        y: this.y
      };
    }
  }
});
exports.polarSymbolPoint = g;
var m = c({}, a.default, {
  _translateErrorBars: g._translateErrorBars,
  _getErrorBarSettings: g._getErrorBarSettings,
  _moveLabelOnCanvas: g._moveLabelOnCanvas,
  _getLabelCoords: r.default._getLabelCoords,
  _getElementCoords: r.default._getElementCoords,
  _getLabelConnector: r.default._getLabelConnector,
  getTooltipParams: r.default.getTooltipParams,
  _getLabelPosition: r.default._getLabelPosition,
  _getCoords: g._getCoords,
  _translate: function () {
    var e = this._getValTranslator();
    var t = e.getBusinessRange();
    var n = e.isInverted() ? e.translate("canvas_position_start") : e.translate("canvas_position_end");
    this.radiusInner = e.translate(this.minValue);
    g._translate.call(this);
    if (this.radiusInner === null) {
      this.radiusInner = this.radius = n;
    } else if (this.radius === null) {
      this.radius = this.value >= t.minVisible ? n : 0;
    } else if (this.radius > n) {
      this.radius = n;
    }
    this.radiusOuter = this.radiusLabels = f(this.radiusInner, this.radius);
    this.radiusLabels += p;
    this.radiusInner = this.defaultRadius = h.min(this.radiusInner, this.radius);
    this.middleAngle = this.angle = -(0, l.normalizeAngle)(this.middleAngleCorrection - this.angle);
  },
  _checkRadiusForVisibleArea: function (e) {
    return (0, s.isDefined)(e) || this._getValTranslator().translate(this.minValue) > 0;
  },
  _getErrorBarBaseEdgeLength: function () {
    var e = this.getMarkerCoords();
    return h.PI * e.outerRadius * h.abs(e.startAngle - e.endAngle) / 180;
  },
  getMarkerCoords: function () {
    return {
      x: this.centerX,
      y: this.centerY,
      outerRadius: this.radiusOuter,
      innerRadius: this.defaultRadius,
      startAngle: this.middleAngle - this.interval / 2,
      endAngle: this.middleAngle + this.interval / 2
    };
  },
  _drawMarker: function (e, t, n) {
    var i = this._getStyle();
    var o = this.getMarkerCoords();
    var a = o.innerRadius;
    var r = o.outerRadius;
    var s = this._getCoords(this.argument, "canvas_position_default");
    var l = o.x;
    var u = o.y;
    if (n) {
      a = 0;
      r = 0;
      l = s.x;
      u = s.y;
    }
    this.graphic = e.arc(l, u, a, r, o.startAngle, o.endAngle).attr(i).data({
      "chart-data-point": this
    }).append(t);
  },
  _checkLabelPosition: function (e, t) {
    var n = this._getVisibleArea();
    var i = (0, l.getCosAndSin)(this.middleAngle);
    var o = this.centerX + this.defaultRadius * i.cos;
    var a = this.centerY - this.defaultRadius * i.sin;
    if (o > n.minX && o < n.maxX && a > n.minY && a < n.maxY) {
      t = this._moveLabelOnCanvas(t, n, e.getBoundingRect());
    }
    return t;
  },
  _addLabelAlignmentAndOffset: function (e, t) {
    return t;
  },
  correctCoordinates: function (e) {
    this.middleAngleCorrection = e.offset;
    this.interval = e.width;
  },
  coordsIn: function (e, t) {
    var n = (0, l.convertXYToPolar)(this.series.getValueAxis().getCenter(), e, t);
    var i = this.getMarkerCoords();
    var o = i.startAngle < i.endAngle ? -n.phi >= i.startAngle && -n.phi <= i.endAngle : -n.phi <= i.startAngle && -n.phi >= i.endAngle;
    return n.r >= i.innerRadius && n.r <= i.outerRadius && o;
  }
});
exports.polarBarPoint = m;