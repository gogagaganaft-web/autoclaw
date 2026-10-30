exports.default = undefined;
var i = require("./95479.js");
var o = r(require("./55628.js"));
var a = r(require("./99393.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s = Number;
var l = isFinite;
var u = o.default.inherit({
  _rootClassPrefix: "dxb",
  _rootClass: "dxb-bullet",
  _themeSection: "bullet",
  _defaultSize: {
    width: 300,
    height: 30,
    left: 1,
    right: 1,
    top: 2,
    bottom: 2
  },
  _disposeWidgetElements: function () {
    delete this._zeroLevelPath;
    delete this._targetPath;
    delete this._barValuePath;
  },
  _cleanWidgetElements: function () {
    this._zeroLevelPath.remove();
    this._targetPath.remove();
    this._barValuePath.remove();
  },
  _drawWidgetElements: function () {
    this._drawBullet();
    this._drawn();
  },
  _createHtmlElements: function () {
    var e = this._renderer;
    this._zeroLevelPath = e.path(undefined, "line").attr({
      class: "dxb-zero-level",
      "stroke-linecap": "square"
    });
    this._targetPath = e.path(undefined, "line").attr({
      class: "dxb-target",
      "stroke-linecap": "square"
    });
    this._barValuePath = e.path(undefined, "line").attr({
      class: "dxb-bar-value",
      "stroke-linecap": "square"
    });
  },
  _prepareOptions: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    this._allOptions = e = this.callBase();
    var r = this._allOptions.value === undefined;
    var l = this._allOptions.target === undefined;
    this._tooltipEnabled = !r || !l;
    if (r) {
      this._allOptions.value = 0;
    }
    if (l) {
      this._allOptions.target = 0;
    }
    e.value = o = s(e.value);
    e.target = a = s(e.target);
    if (this._allOptions.startScaleValue === undefined) {
      this._allOptions.startScaleValue = a < o ? a : o;
      this._allOptions.startScaleValue = this._allOptions.startScaleValue < 0 ? this._allOptions.startScaleValue : 0;
    }
    if (this._allOptions.endScaleValue === undefined) {
      this._allOptions.endScaleValue = a > o ? a : o;
    }
    e.startScaleValue = t = s(e.startScaleValue);
    e.endScaleValue = n = s(e.endScaleValue);
    if (n < t) {
      i = n;
      this._allOptions.endScaleValue = t;
      this._allOptions.startScaleValue = i;
      this._allOptions.inverted = true;
    }
  },
  _updateRange: function () {
    var e = this._allOptions;
    this._ranges = {
      arg: {
        invert: e.rtlEnabled ? !e.inverted : e.inverted,
        min: e.startScaleValue,
        max: e.endScaleValue,
        axisType: "continuous",
        dataType: "numeric"
      },
      val: {
        min: 0,
        max: 1,
        axisType: "continuous",
        dataType: "numeric"
      }
    };
  },
  _drawBullet: function () {
    var e = this._allOptions;
    var t = e.startScaleValue !== e.endScaleValue;
    var n = l(e.startScaleValue);
    var i = l(e.endScaleValue);
    var o = l(e.value);
    var a = l(e.target);
    if (t && i && n && a && o) {
      this._drawBarValue();
      this._drawTarget();
      this._drawZeroLevel();
    }
  },
  _getTargetParams: function () {
    var e = this._allOptions;
    var t = this._valueAxis.getTranslator();
    var n = this._argumentAxis.getTranslator().translate(e.target);
    return {
      points: [n, t.translate(0.02), n, t.translate(0.98)],
      stroke: e.targetColor,
      "stroke-width": e.targetWidth
    };
  },
  _getBarValueParams: function () {
    var e;
    var t;
    var n = this._allOptions;
    var i = this._argumentAxis.getTranslator();
    var o = this._valueAxis.getTranslator();
    var a = n.startScaleValue;
    var r = n.endScaleValue;
    var s = n.value;
    var l = o.translate(0.1);
    var u = o.translate(0.9);
    if (s > 0) {
      e = a <= 0 ? 0 : a;
      t = s >= r ? r : s < e ? e : s;
    } else {
      e = r >= 0 ? 0 : r;
      t = s < a ? a : s > e ? e : s;
    }
    return {
      points: [e = i.translate(e), u, t = i.translate(t), u, t, l, e, l],
      fill: n.color
    };
  },
  _getCorrectCanvas: function () {
    return this._canvas;
  },
  _getZeroLevelParams: function () {
    var e = this._valueAxis.getTranslator();
    var t = this._argumentAxis.getTranslator().translate(0);
    return {
      points: [t, e.translate(0.02), t, e.translate(0.98)],
      stroke: this._allOptions.targetColor,
      "stroke-width": 1
    };
  },
  _drawZeroLevel: function () {
    var e = this._allOptions;
    if (!(e.endScaleValue < 0) && !(e.startScaleValue > 0) && !!e.showZeroLevel) {
      this._zeroLevelPath.attr(this._getZeroLevelParams()).sharp().append(this._renderer.root);
    }
  },
  _drawTarget: function () {
    var e = this._allOptions;
    var t = e.target;
    if (!(t > e.endScaleValue) && !(t < e.startScaleValue) && !!e.showTarget) {
      this._targetPath.attr(this._getTargetParams()).sharp().append(this._renderer.root);
    }
  },
  _drawBarValue: function () {
    this._barValuePath.attr(this._getBarValueParams()).append(this._renderer.root);
  },
  _getTooltipCoords: function () {
    var e = this._canvas;
    var t = this._renderer.getRootOffset();
    var n = this._barValuePath.getBBox();
    return {
      x: n.x + n.width / 2 + t.left,
      y: e.height / 2 + t.top
    };
  },
  _getTooltipData: function () {
    var e = this._tooltip;
    var t = this._allOptions;
    var n = t.value;
    var i = t.target;
    var o = e.formatValue(n);
    var a = e.formatValue(i);
    return {
      originalValue: n,
      originalTarget: i,
      value: o,
      target: a,
      valueText: ["Actual Value:", o, "Target Value:", a]
    };
  },
  _isTooltipEnabled: function () {
    return this._tooltipEnabled;
  }
});
(0, i.each)(["color", "targetColor", "targetWidth", "showTarget", "showZeroLevel", "value", "target", "startScaleValue", "endScaleValue"], function (e, t) {
  u.prototype._optionChangesMap[t] = "OPTIONS";
});
(0, a.default)("dxBullet", u);
var d = u;
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;