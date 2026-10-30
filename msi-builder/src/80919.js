exports.default = undefined;
var i;
var o = require("./20576.js");
var a = (i = require("./99393.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./13306.js");
var s = require("./19157.js");
var l = require("./42602.js");
var u = require("./35922.js");
var d = require("./77129.js");
var c = l.AdvancedChart.inherit({
  _themeSection: "polar",
  _createPanes: function () {
    this.callBase();
    return [{
      name: "default"
    }];
  },
  _checkPaneName: function () {
    return true;
  },
  _getAxisRenderingOptions: function (e) {
    var t = e === "argumentAxis" ? "circular" : "linear";
    if (this.option("useSpiderWeb")) {
      t += "Spider";
    }
    return {
      axisType: "polarAxes",
      drawingType: t
    };
  },
  _executeAppendBeforeSeries: function (e) {
    e();
  },
  _prepareAxisOptions: function (e, t) {
    var n = e === "argumentAxis";
    var i = this._themeManager;
    var o = this.option("argumentAxis");
    var a = i.getOptions("argumentAxis", o) || {};
    var r = isFinite(a.startAngle) ? (0, s.normalizeAngle)(a.startAngle) : 0;
    return {
      type: this.option("useSpiderWeb") && n ? "discrete" : t.type,
      isHorizontal: true,
      showCustomBoundaryTicks: n,
      startAngle: r,
      endAngle: r + 360
    };
  },
  _optionChangesMap: {
    useSpiderWeb: "USE_SPIDER_WEB"
  },
  _change_USE_SPIDER_WEB: function () {
    this._disposeAxes();
    this._requestChange(["AXES_AND_PANES"]);
  },
  _getExtraOptions: function () {
    return {
      spiderWidget: this.option("useSpiderWeb")
    };
  },
  _prepareToRender: function () {
    this._appendAxesGroups();
    return {};
  },
  _calcCanvas: function () {
    var e = (0, r.extend)({}, this._canvas);
    var t = this.getArgumentAxis().getMargins();
    Object.keys(t).forEach(function (n) {
      return e[n] = e[`original${n[0].toUpperCase()}${n.slice(1)}`] + t[n];
    });
    return e;
  },
  _renderAxes: function (e) {
    var t = this._getValueAxis();
    var n = this.getArgumentAxis();
    n.draw(this._canvas);
    t.setSpiderTicks(n.getSpiderTicks());
    var i = this._calcCanvas();
    n.updateSize(i);
    t.draw(i);
    return i;
  },
  _getValueAxis: function () {
    return this._valueAxes[0];
  },
  _shrinkAxes: function (e) {
    var t = this._getValueAxis();
    var n = this.getArgumentAxis();
    if (e && (e.width || e.height)) {
      n.hideOuterElements();
      var i = this._calcCanvas();
      n.updateSize(i);
      t.updateSize(i);
    }
  },
  checkForMoreSpaceForPanesCanvas: function () {
    return this.layoutManager.needMoreSpaceForPanesCanvas([{
      canvas: this.getArgumentAxis().getCanvas()
    }], this._isRotated());
  },
  _getLayoutTargets: function () {
    return [{
      canvas: this._canvas
    }];
  },
  _getSeriesForPane: function () {
    return this.series;
  },
  _applyClipRects: function () {
    var e = this._getCanvasClipRectID();
    this._createClipPathForPane();
    this.getArgumentAxis().applyClipRects(this._getElementsClipRectID(), e);
    this._getValueAxis().applyClipRects(this._getElementsClipRectID(), e);
  },
  _createClipPathForPane: function () {
    var e = this._getValueAxis();
    var t = e.getCenter();
    var n = e.getRadius();
    var i = this._panesClipRects;
    t = {
      x: Math.round(t.x),
      y: Math.round(t.y)
    };
    this._createClipCircle(i.fixed, t.x, t.y, n);
    this._createClipCircle(i.base, t.x, t.y, n);
    if (this.series.some(function (e) {
      return e.areErrorBarsVisible();
    })) {
      this._createClipCircle(i.wide, t.x, t.y, n);
    } else {
      i.wide[0] = null;
    }
  },
  _createClipCircle: function (e, t, n, i) {
    var o = e[0];
    if (o) {
      o.attr({
        cx: t,
        cy: n,
        r: i
      });
    } else {
      o = this._renderer.clipCircle(t, n, i);
      e[0] = o;
    }
  },
  _applyExtraSettings: function (e) {
    var t = this._panesClipRects.wide[0];
    e.setClippingParams(this._panesClipRects.base[0].id, t && t.id, false, false);
  },
  getActualAngle: function (e) {
    if (this.getArgumentAxis().getOptions().inverted) {
      return 360 - e;
    } else {
      return e;
    }
  },
  getXYFromPolar: function (e, t, n, i) {
    var o = {
      angle: undefined,
      radius: undefined,
      x: undefined,
      y: undefined
    };
    if (!(0, u.isDefined)(e) && !(0, u.isDefined)(t) && !(0, u.isDefined)(n) && !(0, u.isDefined)(i)) {
      return o;
    }
    var a;
    var l;
    var d = this.getArgumentAxis();
    var c = d.getAngles()[0];
    if ((0, u.isDefined)(n)) {
      a = d.getTranslator().translate(n);
    } else if (isFinite(e)) {
      a = this.getActualAngle(e);
    } else if (!(0, u.isDefined)(e)) {
      a = 0;
    }
    if ((0, u.isDefined)(i)) {
      l = this.getValueAxis().getTranslator().translate(i);
    } else if (isFinite(t)) {
      l = t;
    } else if (!(0, u.isDefined)(t)) {
      l = d.getRadius();
    }
    if ((0, u.isDefined)(a) && (0, u.isDefined)(l)) {
      var h = (0, s.convertPolarToXY)(d.getCenter(), c, a, l);
      (0, r.extend)(o, h, {
        angle: d.getTranslatedAngle(a),
        radius: l
      });
    }
    return o;
  },
  _applyPointMarkersAutoHiding: o.noop,
  _createScrollBar: o.noop,
  _isRotated: o.noop,
  _getCrosshairOptions: o.noop,
  _isLegendInside: o.noop
});
c.addPlugin(d.plugins.core);
c.addPlugin(d.plugins.polarChart);
(0, a.default)("dxPolarChart", c);
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;