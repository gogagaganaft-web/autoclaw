exports.default = undefined;
var i;
var o = require("./95479.js");
var a = require("./13306.js");
var r = require("./20576.js");
var s = require("./28318.js");
var l = (i = require("./24894.js")) && i.__esModule ? i : {
  default: i
};
var u = require("./35922.js");
var d = a.extend;
var c = Math;
var h = c.abs;
var f = c.min;
var p = c.max;
var g = c.round;
var m = d({}, l.default, {
  deleteLabel: function () {
    this._topLabel.dispose();
    this._topLabel = null;
    this._bottomLabel.dispose();
    this._bottomLabel = null;
  },
  hideMarker: function (e) {
    var t = this.graphic;
    var n = t && t[e + "Marker"];
    var i = this["_" + e + "Label"];
    if (n && n.attr("visibility") !== "hidden") {
      n.attr({
        visibility: "hidden"
      });
    }
    i.draw(false);
  },
  setInvisibility: function () {
    this.hideMarker("top");
    this.hideMarker("bottom");
  },
  clearVisibility: function () {
    var e = this.graphic;
    var t = e && e.topMarker;
    var n = e && e.bottomMarker;
    if (t && t.attr("visibility")) {
      t.attr({
        visibility: null
      });
    }
    if (n && n.attr("visibility")) {
      n.attr({
        visibility: null
      });
    }
  },
  clearMarker: function () {
    var e = this.graphic;
    var t = e && e.topMarker;
    var n = e && e.bottomMarker;
    var i = this._emptySettings;
    if (t) {
      t.attr(i);
    }
    if (n) {
      n.attr(i);
    }
  },
  _getLabelPosition: function (e) {
    var t = this._options.label.position === "inside";
    if (this._options.rotated) {
      if (e === "top" ^ t) {
        return "right";
      } else {
        return "left";
      }
    } else if (e === "top" ^ t) {
      return "top";
    } else {
      return "bottom";
    }
  },
  _getLabelMinFormatObject: function () {
    return {
      index: 0,
      argument: this.initialArgument,
      value: this.initialMinValue,
      seriesName: this.series.name,
      originalValue: this.originalMinValue,
      originalArgument: this.originalArgument,
      point: this
    };
  },
  _updateLabelData: function () {
    var e = this._getLabelFormatObject();
    e.index = 1;
    this._topLabel.setData(e);
    this._bottomLabel.setData(this._getLabelMinFormatObject());
  },
  _updateLabelOptions: function () {
    var e = this._options.label;
    if (!this._topLabel || !this._bottomLabel) {
      this._createLabel();
    }
    this._topLabel.setOptions(e);
    this._bottomLabel.setOptions(e);
  },
  _createLabel: function () {
    var e = {
      renderer: this.series._renderer,
      labelsGroup: this.series._labelsGroup,
      point: this
    };
    this._topLabel = new s.Label(e);
    this._bottomLabel = new s.Label(e);
  },
  _getGraphicBBox: function (e) {
    var t = this._options;
    var n = this._getImage(t.image);
    var i = e === "top" ? this._checkImage(n.top) : this._checkImage(n.bottom);
    var o = this._getPositionFromLocation(e);
    if (t.visible) {
      if (i) {
        return this._getImageBBox(o.x, o.y);
      } else {
        return this._getSymbolBBox(o.x, o.y, t.styles.normal.r);
      }
    } else {
      return {
        x: o.x,
        y: o.y,
        width: 0,
        height: 0
      };
    }
  },
  _getPositionFromLocation: function (e) {
    var t;
    var n;
    var i = e === "top";
    if (this._options.rotated) {
      t = i ? p(this.x, this.minX) : f(this.x, this.minX);
      n = this.y;
    } else {
      t = this.x;
      n = i ? f(this.y, this.minY) : p(this.y, this.minY);
    }
    return {
      x: t,
      y: n
    };
  },
  _checkOverlay: function (e, t, n) {
    return e < t + n;
  },
  _getOverlayCorrections: function (e, t) {
    var n = this._options.rotated;
    var i = n ? "x" : "y";
    var o = n ? "width" : "height";
    var a = this.series.getValueAxis().getVisibleArea();
    var r = a[0];
    var s = a[1];
    var l = g((e[i] + e[o] - t[i]) / 2);
    var u = e[i] - l;
    var d = t[i] + l;
    if (u < r) {
      u += l = r - u;
      d += l;
    } else if (d + t[o] > s) {
      u += l = s - d - t[o];
      d += l;
    }
    return {
      coord1: u,
      coord2: d
    };
  },
  _checkLabelsOverlay: function (e) {
    var t = this._topLabel.getBoundingRect();
    var n = this._bottomLabel.getBoundingRect();
    var i = {};
    if (this._options.rotated) {
      if (e === "top") {
        if (this._checkOverlay(t.x, n.x, n.width)) {
          i = this._getOverlayCorrections(n, t);
          this._topLabel.shift(i.coord2, t.y);
          this._bottomLabel.shift(i.coord1, n.y);
        }
      } else if (this._checkOverlay(n.x, t.x, t.width)) {
        i = this._getOverlayCorrections(t, n);
        this._topLabel.shift(i.coord1, t.y);
        this._bottomLabel.shift(i.coord2, n.y);
      }
    } else if (e === "top") {
      if (this._checkOverlay(n.y, t.y, t.height)) {
        i = this._getOverlayCorrections(t, n);
        this._topLabel.shift(t.x, i.coord1);
        this._bottomLabel.shift(n.x, i.coord2);
      }
    } else if (this._checkOverlay(t.y, n.y, n.height)) {
      i = this._getOverlayCorrections(n, t);
      this._topLabel.shift(t.x, i.coord2);
      this._bottomLabel.shift(n.x, i.coord1);
    }
  },
  _drawLabel: function () {
    var e = [];
    var t = this._options.rotated ? this.x >= this.minX : this.y < this.minY;
    var n = this._getCustomLabelVisibility();
    var i = this._topLabel;
    var a = this._bottomLabel;
    i.pointPosition = t ? "top" : "bottom";
    a.pointPosition = t ? "bottom" : "top";
    if ((this.series.getLabelVisibility() || n) && this.hasValue() && n !== false) {
      if (this.visibleTopMarker !== false) {
        e.push(i);
      }
      if (this.visibleBottomMarker !== false) {
        e.push(a);
      }
      (0, o.each)(e, function (e, t) {
        t.draw(true);
      });
      this._checkLabelsOverlay(this._topLabel.pointPosition);
    } else {
      i.draw(false);
      a.draw(false);
    }
  },
  _getImage: function (e) {
    var t = {};
    if ((0, u.isDefined)(e)) {
      if (typeof e == "string") {
        t.top = t.bottom = e;
      } else {
        t.top = {
          url: typeof e.url == "string" ? e.url : e.url && e.url.rangeMaxPoint,
          width: typeof e.width == "number" ? e.width : e.width && e.width.rangeMaxPoint,
          height: typeof e.height == "number" ? e.height : e.height && e.height.rangeMaxPoint
        };
        t.bottom = {
          url: typeof e.url == "string" ? e.url : e.url && e.url.rangeMinPoint,
          width: typeof e.width == "number" ? e.width : e.width && e.width.rangeMinPoint,
          height: typeof e.height == "number" ? e.height : e.height && e.height.rangeMinPoint
        };
      }
    }
    return t;
  },
  _checkSymbol: function (e, t) {
    var n = e.symbol;
    var i = t.symbol;
    var o = n === "circle" && i !== "circle" || n !== "circle" && i === "circle";
    var a = this._getImage(e.image);
    var r = this._getImage(t.image);
    var s = this._checkImage(a.top) !== this._checkImage(r.top);
    var l = this._checkImage(a.bottom) !== this._checkImage(r.bottom);
    return o || s || l;
  },
  _getSettingsForTwoMarkers: function (e) {
    var t = this._options;
    var n = {};
    var i = t.rotated ? f(this.x, this.minX) : this.x;
    var o = t.rotated ? this.y : f(this.y, this.minY);
    var a = e.r;
    var r = this._populatePointShape(t.symbol, a);
    n.top = d({
      translateX: i + this.width,
      translateY: o,
      r: a
    }, e);
    n.bottom = d({
      translateX: i,
      translateY: o + this.height,
      r: a
    }, e);
    if (r) {
      n.top.points = n.bottom.points = r;
    }
    return n;
  },
  _hasGraphic: function () {
    return this.graphic && this.graphic.topMarker && this.graphic.bottomMarker;
  },
  _drawOneMarker: function (e, t, n, i) {
    var o = this.graphic;
    if (o[t]) {
      this._updateOneMarker(t, i);
    } else {
      o[t] = this._createMarker(e, o, n, i);
    }
  },
  _drawMarker: function (e, t, n, i, o) {
    var a = this._getSettingsForTwoMarkers(o || this._getStyle());
    var r = this._getImage(this._options.image);
    if (this._checkImage(r.top)) {
      a.top = this._getImageSettings(a.top, r.top);
    }
    if (this._checkImage(r.bottom)) {
      a.bottom = this._getImageSettings(a.bottom, r.bottom);
    }
    this.graphic = this.graphic || e.g().append(t);
    if (this.visibleTopMarker) {
      this._drawOneMarker(e, "topMarker", r.top, a.top);
    }
    if (this.visibleBottomMarker) {
      this._drawOneMarker(e, "bottomMarker", r.bottom, a.bottom);
    }
  },
  _getSettingsForTracker: function (e) {
    var t = this._options.rotated;
    return {
      translateX: t ? f(this.x, this.minX) - e : this.x - e,
      translateY: t ? this.y - e : f(this.y, this.minY) - e,
      width: this.width + e * 2,
      height: this.height + e * 2
    };
  },
  isInVisibleArea: function () {
    var e;
    var t;
    var n;
    var i = this._options.rotated;
    var o = i ? this.y : this.x;
    var a = i ? p(this.minX, this.x) : p(this.minY, this.y);
    var r = i ? f(this.minX, this.x) : f(this.minY, this.y);
    var s = true;
    var l = this.series.getArgumentAxis().getVisibleArea();
    var u = this.series.getValueAxis().getVisibleArea();
    var d = l[1] < o || l[0] > o;
    var c = u[0] > r && u[0] > a || u[1] < r && u[1] < a;
    if (d || c) {
      t = n = s = false;
    } else {
      t = u[0] <= r && u[1] > r;
      n = u[0] < a && u[1] >= a;
      if (i) {
        e = t;
        t = n;
        n = e;
      }
    }
    this.visibleTopMarker = t;
    this.visibleBottomMarker = n;
    return s;
  },
  getTooltipParams: function () {
    var e;
    var t;
    var n = this._options.rotated;
    var i = n ? f(this.x, this.minX) : f(this.y, this.minY);
    var o = n ? "width" : "height";
    var a = this._getVisibleArea();
    var r = n ? a.minX : a.minY;
    var s = n ? a.maxX : a.maxY;
    var l = p(r, i);
    var u = f(s, i + this[o]);
    if (n) {
      t = this.y;
      e = l + (u - l) / 2;
    } else {
      e = this.x;
      t = l + (u - l) / 2;
    }
    return {
      x: e,
      y: t,
      offset: 0
    };
  },
  _translate: function () {
    var e = this._options.rotated;
    l.default._translate.call(this);
    this.height = e ? 0 : h(this.minY - this.y);
    this.width = e ? h(this.x - this.minX) : 0;
  },
  hasCoords: function () {
    return l.default.hasCoords.call(this) && this.minX !== null && this.minY !== null;
  },
  _updateData: function (e) {
    l.default._updateData.call(this, e);
    this.minValue = this.initialMinValue = this.originalMinValue = e.minValue;
  },
  _getImageSettings: function (e, t) {
    return {
      href: t.url || t.toString(),
      width: t.width || 20,
      height: t.height || 20,
      translateX: e.translateX,
      translateY: e.translateY
    };
  },
  getCrosshairData: function (e, t) {
    var n = this._options.rotated;
    var i = this.minX;
    var o = this.minY;
    var a = this.vx;
    var r = this.vy;
    var s = this.value;
    var l = this.minValue;
    var u = this.argument;
    var d = {
      axis: this.series.axis,
      x: a,
      y: r,
      yValue: s,
      xValue: u
    };
    if (n) {
      d.yValue = u;
      if (h(a - e) < h(i - e)) {
        d.xValue = s;
      } else {
        d.x = i;
        d.xValue = l;
      }
    } else if (h(r - t) >= h(o - t)) {
      d.y = o;
      d.yValue = l;
    }
    return d;
  },
  _updateOneMarker: function (e, t) {
    if (this.graphic && this.graphic[e]) {
      this.graphic[e].attr(t);
    }
  },
  _updateMarker: function (e, t) {
    this._drawMarker(undefined, undefined, false, false, t);
  },
  _getFormatObject: function (e) {
    var t = this.initialMinValue;
    var n = this.initialValue;
    var i = this.initialArgument;
    var o = e.formatValue(t);
    var a = e.formatValue(n);
    return {
      argument: i,
      argumentText: e.formatValue(i, "argument"),
      valueText: o + " - " + a,
      rangeValue1Text: o,
      rangeValue2Text: a,
      rangeValue1: t,
      rangeValue2: n,
      seriesName: this.series.name,
      point: this,
      originalMinValue: this.originalMinValue,
      originalValue: this.originalValue,
      originalArgument: this.originalArgument
    };
  },
  getLabel: function () {
    return [this._topLabel, this._bottomLabel];
  },
  getLabels: function () {
    return [this._topLabel, this._bottomLabel];
  },
  getBoundingRect: r.noop,
  coordsIn: function (e, t) {
    var n = this._storeTrackerR();
    var i = e >= this.x - n && e <= this.x + n;
    var o = t >= this.y - n && t <= this.y + n;
    if (this._options.rotated) {
      return o && (i || e >= this.minX - n && e <= this.minX + n);
    } else {
      return i && (o || t >= this.minY - n && t <= this.minY + n);
    }
  },
  getMaxValue: function () {
    if (this.series.valueAxisType !== "discrete" && this.minValue > this.value) {
      return this.minValue;
    } else {
      return this.value;
    }
  },
  getMinValue: function () {
    if (this.series.valueAxisType !== "discrete") {
      if (this.minValue < this.value) {
        return this.minValue;
      } else {
        return this.value;
      }
    } else {
      return this.minValue;
    }
  }
});
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;