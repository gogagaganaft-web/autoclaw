exports.default = undefined;
var i = require("./13306.js");
var o = require("./95479.js");
var a = require("./20576.js");
var r = require("./58201.js");
var s = require("./28318.js");
var l = require("./35922.js");
var u = require("./19157.js");
var d = (0, r.getWindow)();
var c = i.extend;
var h = Math;
var f = h.round;
var p = h.floor;
var g = h.ceil;
var m = {
  deleteLabel: function () {
    this._label.dispose();
    this._label = null;
  },
  _hasGraphic: function () {
    return this.graphic;
  },
  clearVisibility: function () {
    var e = this.graphic;
    if (e && e.attr("visibility")) {
      e.attr({
        visibility: null
      });
    }
  },
  isVisible: function () {
    return this.inVisibleArea && this.series.isVisible();
  },
  setInvisibility: function () {
    var e = this.graphic;
    if (e && e.attr("visibility") !== "hidden") {
      e.attr({
        visibility: "hidden"
      });
    }
    if (this._errorBar) {
      this._errorBar.attr({
        visibility: "hidden"
      });
    }
    this._label.draw(false);
  },
  clearMarker: function () {
    var e = this.graphic;
    if (e) {
      e.attr(this._emptySettings);
    }
  },
  _createLabel: function () {
    this._label = new s.Label({
      renderer: this.series._renderer,
      labelsGroup: this.series._labelsGroup,
      point: this
    });
  },
  _calculateVisibility: function (e, t) {
    var n = this._getVisibleArea();
    var i = n.minX;
    var o = n.maxX;
    var a = n.minY;
    var r = n.maxY;
    this.inVisibleArea = i <= e && o >= e && a <= t && r >= t;
  },
  _updateLabelData: function () {
    this._label.setData(this._getLabelFormatObject());
  },
  _updateLabelOptions: function () {
    if (!this._label) {
      this._createLabel();
    }
    this._label.setOptions(this._options.label);
  },
  _checkImage: function (e) {
    return (0, l.isDefined)(e) && (typeof e == "string" || (0, l.isDefined)(e.url));
  },
  _fillStyle: function () {
    this._styles = this._options.styles;
  },
  _checkSymbol: function (e, t) {
    var n = e.symbol;
    var i = t.symbol;
    var o = n === "circle" && i !== "circle" || n !== "circle" && i === "circle";
    var a = this._checkImage(e.image) !== this._checkImage(t.image);
    return !!o || !!a;
  },
  _populatePointShape: function (e, t) {
    switch (e) {
      case "square":
        return function (e) {
          return [-e, -e, e, -e, e, e, -e, e, -e, -e];
        }(t);
      case "polygon":
        return function (e) {
          var t = g(e);
          return [-t, 0, 0, -t, t, 0, 0, t, -t, 0];
        }(t);
      case "triangle":
      case "triangleDown":
        return function (e) {
          return [-e, -e, e, -e, 0, e, -e, -e];
        }(t);
      case "triangleUp":
        return function (e) {
          return [-e, e, e, e, 0, -e, -e, e];
        }(t);
      case "cross":
        return function (e) {
          var t = g(e);
          var n = p(t / 2);
          var i = g(t / 2);
          return [-t, -n, -n, -t, 0, -i, n, -t, t, -n, i, 0, t, n, n, t, 0, i, -n, t, -t, n, -i, 0];
        }(t);
    }
  },
  hasCoords: function () {
    return this.x !== null && this.y !== null;
  },
  correctValue: function (e) {
    var t = this.series.getValueAxis();
    if (this.hasValue()) {
      this.value = this.properValue = t.validateUnit(this.initialValue.valueOf() + e.valueOf());
      this.minValue = t.validateUnit(e);
    }
  },
  resetCorrection: function () {
    this.value = this.properValue = this.initialValue;
    this.minValue = "canvas_position_default";
  },
  resetValue: function () {
    if (this.hasValue()) {
      this.value = this.properValue = this.initialValue = 0;
      this.minValue = 0;
      this._label.setDataField("value", this.value);
    }
  },
  _getTranslates: function (e) {
    var t = this.x;
    var n = this.y;
    if (e) {
      if (this._options.rotated) {
        t = this.defaultX;
      } else {
        n = this.defaultY;
      }
    }
    return {
      x: t,
      y: n
    };
  },
  _createImageMarker: function (e, t, n) {
    var i = n.width || 20;
    var o = n.height || 20;
    return e.image(-f(i * 0.5), -f(o * 0.5), i, o, n.url ? n.url.toString() : n.toString(), "center").attr({
      translateX: t.translateX,
      translateY: t.translateY,
      visibility: t.visibility
    });
  },
  _createSymbolMarker: function (e, t) {
    var n;
    var i = this._options.symbol;
    if (i === "circle") {
      delete t.points;
      n = e.circle().attr(t);
    } else if (i === "square" || i === "polygon" || i === "triangle" || i === "triangleDown" || i === "triangleUp" || i === "cross") {
      n = e.path([], "area").attr(t).sharp();
    }
    return n;
  },
  _createMarker: function (e, t, n, i) {
    var o = this._checkImage(n) ? this._createImageMarker(e, i, n) : this._createSymbolMarker(e, i);
    if (o) {
      o.data({
        "chart-data-point": this
      }).append(t);
    }
    return o;
  },
  _getSymbolBBox: function (e, t, n) {
    return {
      x: e - n,
      y: t - n,
      width: n * 2,
      height: n * 2
    };
  },
  _getImageBBox: function (e, t) {
    var n = this._options.image;
    var i = n.width || 20;
    var o = n.height || 20;
    return {
      x: e - f(i / 2),
      y: t - f(o / 2),
      width: i,
      height: o
    };
  },
  _getGraphicBBox: function () {
    var e = this._options;
    var t = this.x;
    var n = this.y;
    if (e.visible) {
      if (this._checkImage(e.image)) {
        return this._getImageBBox(t, n);
      } else {
        return this._getSymbolBBox(t, n, e.styles.normal.r);
      }
    } else {
      return {
        x: t,
        y: n,
        width: 0,
        height: 0
      };
    }
  },
  hideInsideLabel: a.noop,
  _getShiftLabelCoords: function (e) {
    var t = this._addLabelAlignmentAndOffset(e, this._getLabelCoords(e));
    return this._checkLabelPosition(e, t);
  },
  _drawLabel: function () {
    var e = this._getCustomLabelVisibility();
    var t = this._label;
    var n = this._showForZeroValues() && this.hasValue() && e !== false && (this.series.getLabelVisibility() || e);
    t.draw(!!n);
  },
  correctLabelPosition: function (e) {
    var t = this._getShiftLabelCoords(e);
    if (!this.hideInsideLabel(e, t)) {
      e.setFigureToDrawConnector(this._getLabelConnector(e.pointPosition));
      e.shift(f(t.x), f(t.y));
    }
  },
  _showForZeroValues: function () {
    return true;
  },
  _getLabelConnector: function (e) {
    var t = this._getGraphicBBox(e);
    var n = t.width / 2;
    var i = t.height / 2;
    return {
      x: t.x + n,
      y: t.y + i,
      r: this._options.visible ? Math.max(n, i) : 0
    };
  },
  _getPositionFromLocation: function () {
    return {
      x: this.x,
      y: this.y
    };
  },
  _isPointInVisibleArea: function (e, t) {
    return e.minX <= t.x + t.width && e.maxX >= t.x && e.minY <= t.y + t.height && e.maxY >= t.y;
  },
  _checkLabelPosition: function (e, t) {
    var n = this._getVisibleArea();
    var i = e.getBoundingRect();
    var o = this._getGraphicBBox(e.pointPosition);
    var a = this._getGraphicBBox();
    var r = e.getLayoutOptions().position === "inside";
    if (this._isPointInVisibleArea(n, a)) {
      if (this._options.rotated) {
        if (n.minX > t.x) {
          t.x = r ? n.minX : o.x + o.width + 10;
        }
        if (n.maxX < t.x + i.width) {
          t.x = r ? n.maxX - i.width : o.x - 10 - i.width;
        }
        if (n.minY > t.y) {
          t.y = n.minY;
        }
        if (n.maxY < t.y + i.height) {
          t.y = n.maxY - i.height;
        }
      } else {
        if (n.minX > t.x) {
          t.x = n.minX;
        }
        if (n.maxX < t.x + i.width) {
          t.x = n.maxX - i.width;
        }
        if (n.minY > t.y) {
          t.y = r ? n.minY : o.y + o.height + 10;
        }
        if (n.maxY < t.y + i.height) {
          t.y = r ? n.maxY - i.height : o.y - i.height - 10;
        }
      }
    }
    return t;
  },
  _addLabelAlignmentAndOffset: function (e, t) {
    var n = e.getBoundingRect();
    var i = e.getLayoutOptions();
    if (!this._options.rotated) {
      if (i.alignment === "left") {
        t.x += n.width / 2;
      } else if (i.alignment === "right") {
        t.x -= n.width / 2;
      }
    }
    t.x += i.horizontalOffset;
    t.y += i.verticalOffset;
    return t;
  },
  _getLabelCoords: function (e) {
    return this._getLabelCoordOfPosition(e, this._getLabelPosition(e.pointPosition));
  },
  _getLabelCoordOfPosition: function (e, t) {
    var n = e.getBoundingRect();
    var i = this._getGraphicBBox(e.pointPosition);
    var o = i.height / 2 - n.height / 2;
    var a = i.width / 2 - n.width / 2;
    var r = i.x;
    var s = i.y;
    switch (t) {
      case "left":
        r -= n.width + 10;
        s += o;
        break;
      case "right":
        r += i.width + 10;
        s += o;
        break;
      case "top":
        r += a;
        s -= n.height + 10;
        break;
      case "bottom":
        r += a;
        s += i.height + 10;
        break;
      case "inside":
        r += a;
        s += o;
    }
    return {
      x: r,
      y: s
    };
  },
  _drawMarker: function (e, t, n) {
    var i = this._options;
    var o = this._getTranslates(n);
    var a = this._getStyle();
    this.graphic = this._createMarker(e, t, i.image, c({
      translateX: o.x,
      translateY: o.y,
      points: this._populatePointShape(i.symbol, a.r)
    }, a));
  },
  _getErrorBarSettings: function () {
    return {
      visibility: "visible"
    };
  },
  _getErrorBarBaseEdgeLength: function () {
    return this.getPointRadius() * 2;
  },
  _drawErrorBar: function (e, t) {
    if (this._options.errorBars) {
      var n;
      var i = this._options;
      var a = i.errorBars;
      var r = [];
      var s = this._errorBarPos;
      var d = this._highErrorCoord;
      var c = this._lowErrorCoord;
      var h = (0, u.normalizeEnum)(a.displayMode);
      var f = h === "high";
      var g = h === "low";
      var m = (f || !(0, l.isDefined)(c)) && (0, l.isDefined)(d) && !g;
      var _ = (g || !(0, l.isDefined)(d)) && (0, l.isDefined)(c) && !f;
      var v = a.edgeLength;
      if (v <= 1 && v > 0) {
        v = this._getErrorBarBaseEdgeLength() * a.edgeLength;
      }
      v = p(parseInt(v) / 2);
      if (m) {
        c = this._baseErrorBarPos;
      }
      if (_) {
        d = this._baseErrorBarPos;
      }
      if (h !== "none" && (0, l.isDefined)(d) && (0, l.isDefined)(c) && (0, l.isDefined)(s)) {
        if (!_) {
          r.push([s - v, d, s + v, d]);
        }
        r.push([s, d, s, c]);
        if (!m) {
          r.push([s + v, c, s - v, c]);
        }
        if (i.rotated) {
          (0, o.each)(r, function (e, t) {
            t.reverse();
          });
        }
        n = this._getErrorBarSettings(a);
        if (this._errorBar) {
          n.points = r;
          this._errorBar.attr(n);
        } else {
          this._errorBar = e.path(r, "line").attr(n).append(t);
        }
      } else if (this._errorBar) {
        this._errorBar.attr({
          visibility: "hidden"
        });
      }
    }
  },
  getTooltipParams: function () {
    var e = this.graphic;
    return {
      x: this.x,
      y: this.y,
      offset: e ? e.getBBox().height / 2 : 0
    };
  },
  setPercentValue: function (e, t, n, i) {
    var o = this.value / e || 0;
    var a = this.minValue / e || 0;
    var r = o - a;
    this._label.setDataField("percent", r);
    this._label.setDataField("total", t);
    if (this.series.isFullStackedSeries() && this.hasValue()) {
      if (this.leftHole) {
        this.leftHole /= e - n;
        this.minLeftHole /= e - n;
      }
      if (this.rightHole) {
        this.rightHole /= e - i;
        this.minRightHole /= e - i;
      }
      this.value = this.properValue = o;
      this.minValue = a || this.minValue;
    }
  },
  _storeTrackerR: function () {
    var e = d.navigator;
    var t = this._options.styles.normal.r;
    var n = (0, r.hasProperty)("ontouchstart") || e.msPointerEnabled && e.msMaxTouchPoints || e.pointerEnabled && e.maxTouchPoints ? 20 : 6;
    this._options.trackerR = t < n ? n : t;
    return this._options.trackerR;
  },
  _translateErrorBars: function () {
    var e = this._options;
    var t = e.rotated;
    var n = e.errorBars;
    var i = this._getValTranslator();
    if (n) {
      if ((0, l.isDefined)(this.lowError)) {
        this._lowErrorCoord = i.translate(this.lowError);
      }
      if ((0, l.isDefined)(this.highError)) {
        this._highErrorCoord = i.translate(this.highError);
      }
      this._errorBarPos = p(t ? this.vy : this.vx);
      this._baseErrorBarPos = n.type === "stdDeviation" ? this._lowErrorCoord + (this._highErrorCoord - this._lowErrorCoord) / 2 : t ? this.vx : this.vy;
    }
  },
  _translate: function () {
    var e = this._getValTranslator();
    var t = this._getArgTranslator();
    if (this._options.rotated) {
      this.vx = this.x = e.translate(this.value);
      this.vy = this.y = t.translate(this.argument);
      this.minX = e.translate(this.minValue);
      this.defaultX = e.translate("canvas_position_default");
    } else {
      this.vy = this.y = e.translate(this.value);
      this.vx = this.x = t.translate(this.argument);
      this.minY = e.translate(this.minValue);
      this.defaultY = e.translate("canvas_position_default");
    }
    this._translateErrorBars();
    this._calculateVisibility(this.x, this.y);
  },
  _updateData: function (e) {
    this.value = this.properValue = this.initialValue = this.originalValue = e.value;
    this.minValue = this.initialMinValue = this.originalMinValue = (0, l.isDefined)(e.minValue) ? e.minValue : "canvas_position_default";
  },
  _getImageSettings: function (e) {
    return {
      href: e.url || e.toString(),
      width: e.width || 20,
      height: e.height || 20
    };
  },
  getCrosshairData: function () {
    var e = this._options.rotated;
    var t = this.properValue;
    var n = this.argument;
    return {
      x: this.vx,
      y: this.vy,
      xValue: e ? t : n,
      yValue: e ? n : t,
      axis: this.series.axis
    };
  },
  getPointRadius: function () {
    var e = this._getStyle();
    var t = this._options;
    var n = e.r;
    var i = t.symbol;
    var o = i === "square";
    var a = i === "triangle" || i === "triangleDown" || i === "triangleUp";
    if (t.visible && !t.image && n) {
      return (o || a ? n * 1.4 : n) + e["stroke-width"] / 2;
    } else {
      return 0;
    }
  },
  _updateMarker: function (e, t) {
    var n;
    var i = this._options;
    var o = i.image;
    var a = this.isVisible() ? {} : {
      visibility: "hidden"
    };
    n = this._checkImage(o) ? c({}, {
      visibility: t.visibility
    }, a, this._getImageSettings(o)) : c({}, t, a, {
      points: this._populatePointShape(i.symbol, t.r)
    });
    if (!e) {
      n.translateX = this.x;
      n.translateY = this.y;
    }
    this.graphic.attr(n).sharp();
  },
  _getLabelFormatObject: function () {
    return {
      argument: this.initialArgument,
      value: this.initialValue,
      originalArgument: this.originalArgument,
      originalValue: this.originalValue,
      seriesName: this.series.name,
      lowErrorValue: this.lowError,
      highErrorValue: this.highError,
      point: this
    };
  },
  _getLabelPosition: function () {
    var e = this._options.rotated;
    if (this.initialValue > 0) {
      if (e) {
        return "right";
      } else {
        return "top";
      }
    } else if (e) {
      return "left";
    } else {
      return "bottom";
    }
  },
  _getFormatObject: function (e) {
    var t = this._label.getData();
    return c({}, t, {
      argumentText: e.formatValue(this.initialArgument, "argument"),
      valueText: e.formatValue(this.initialValue)
    }, (0, l.isDefined)(t.percent) ? {
      percentText: e.formatValue(t.percent, "percent")
    } : {}, (0, l.isDefined)(t.total) ? {
      totalText: e.formatValue(t.total)
    } : {});
  },
  getMarkerVisibility: function () {
    return this._options.visible;
  },
  coordsIn: function (e, t) {
    var n = this._storeTrackerR();
    return e >= this.x - n && e <= this.x + n && t >= this.y - n && t <= this.y + n;
  },
  getMinValue: function (e) {
    var t = this._options.errorBars;
    if (t && !e) {
      var n = t.displayMode;
      var i = n !== "high" && (0, l.isDefined)(this.lowError) ? this.lowError : this.value;
      var o = n !== "low" && (0, l.isDefined)(this.highError) ? this.highError : this.value;
      if (i < o) {
        return i;
      } else {
        return o;
      }
    }
    return this.value;
  },
  getMaxValue: function (e) {
    var t = this._options.errorBars;
    if (t && !e) {
      var n = t.displayMode;
      var i = n !== "high" && (0, l.isDefined)(this.lowError) ? this.lowError : this.value;
      var o = n !== "low" && (0, l.isDefined)(this.highError) ? this.highError : this.value;
      if (i > o) {
        return i;
      } else {
        return o;
      }
    }
    return this.value;
  }
};
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;