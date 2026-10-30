function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = require("./95479.js");
var a = p(require("./99393.js"));
var r = require("./13306.js");
var s = require("./48013.js");
var l = require("./18029.js");
var u = require("./88917.js");
var d = require("./19157.js");
var c = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = f(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./79615.js"));
var h = p(require("./74425.js"));
function f(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (f = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = Math.max;
var m = Math.min;
var _ = Math.round;
var v = u.dxGauge.inherit({
  _rootClass: "dxg-linear-gauge",
  _factoryMethods: {
    rangeContainer: "createLinearRangeContainer",
    indicator: "createLinearIndicator"
  },
  _gridSpacingFactor: 25,
  _scaleTypes: {
    type: "xyAxes",
    drawingType: "linear"
  },
  _getTicksOrientation: function (e) {
    if (e.isHorizontal) {
      return e.verticalOrientation;
    } else {
      return e.horizontalOrientation;
    }
  },
  _getThemeManagerOptions: function () {
    var e = this.callBase.apply(this, arguments);
    e.subTheme = "_linear";
    return e;
  },
  _getInvertedState: function () {
    return !this._area.vertical && this.option("rtlEnabled");
  },
  _prepareScaleSettings: function () {
    var e = this.callBase();
    e.inverted = this._getInvertedState();
    return e;
  },
  _updateScaleTickIndent: function (e) {
    var t;
    var n;
    var i = e.label.indentFromTick;
    var o = e.tick.length;
    var a = this._scale.measureLabels((0, r.extend)({}, this._canvas));
    var s = e.isHorizontal ? a.height + a.y : 0;
    var l = i > 0;
    if (e.isHorizontal) {
      n = o * (l ? {
        center: 0.5,
        top: 0,
        bottom: 1
      } : {
        center: 0.5,
        top: 1,
        bottom: 0
      })[e.verticalOrientation];
      t = a.y;
    } else {
      n = o * (l ? {
        center: 0.5,
        left: 0,
        right: 1
      } : {
        center: 0.5,
        left: 1,
        right: 0
      })[e.horizontalOrientation];
      t = -a.width;
    }
    e.label.indentFromAxis = -i + (l ? -n + t : n - s);
    this._scale.updateOptions(e);
  },
  _shiftScale: function (e, t) {
    var n = (0, r.extend)({}, this._canvas);
    var i = t.isHorizontal;
    var o = this._scale;
    n[i ? "left" : "top"] = this._area[i ? "startCoord" : "endCoord"];
    n[i ? "right" : "bottom"] = n[i ? "width" : "height"] - this._area[i ? "endCoord" : "startCoord"];
    o.draw(n);
    o.shift({
      left: -e.x,
      top: -e.y
    });
  },
  _setupCodomain: function () {
    var e = this.option("geometry") || {};
    var t = (0, d.normalizeEnum)(e.orientation) === "vertical";
    this._area = {
      vertical: t,
      x: 0,
      y: 0,
      startCoord: -100,
      endCoord: 100
    };
    this._rangeContainer.vertical = t;
    this._translator.setInverted(this._getInvertedState());
    this._translator.setCodomain(-100, 100);
  },
  _getScaleLayoutValue: function () {
    return this._area[this._area.vertical ? "x" : "y"];
  },
  _getTicksCoefficients: function (e) {
    var t = {
      inner: 0,
      outer: 1
    };
    if (this._area.vertical) {
      if (e.horizontalOrientation === "left") {
        t.inner = 1;
        t.outer = 0;
      } else if (e.horizontalOrientation === "center") {
        t.inner = t.outer = 0.5;
      }
    } else if (e.verticalOrientation === "top") {
      t.inner = 1;
      t.outer = 0;
    } else if (e.verticalOrientation === "center") {
      t.inner = t.outer = 0.5;
    }
    return t;
  },
  _correctScaleIndents: function (e, t, n) {
    var i = this._area.vertical;
    if (t >= 0) {
      e.max += t + n[i ? "width" : "height"];
    } else {
      e.min -= -t + n[i ? "width" : "height"];
    }
    e.indent = n[i ? "height" : "width"] / 2;
  },
  _measureMainElements: function (e, t) {
    var n = this._area.x;
    var i = this._area.y;
    var a = 1000;
    var r = 0;
    var s = 0;
    var l = this._scale;
    (0, o.each)(e.concat(l), function (e, o) {
      var l = o.measure ? o.measure({
        x: n + o.getOffset(),
        y: i + o.getOffset()
      }) : t;
      if (l.max !== undefined) {
        r = g(r, l.max);
      }
      if (l.min !== undefined) {
        a = m(a, l.min);
      }
      if (l.indent > 0) {
        s = g(s, l.indent);
      }
    });
    return {
      minBound: a,
      maxBound: r,
      indent: s
    };
  },
  _applyMainLayout: function (e, t) {
    var n;
    var i;
    var o = this._measureMainElements(e, t);
    var a = this._area;
    if (a.vertical) {
      i = ((n = y(this._innerRect, {
        width: o.maxBound - o.minBound
      })).left + n.right) / 2 - (o.minBound + o.maxBound) / 2;
      a.startCoord = n.bottom - o.indent;
      a.endCoord = n.top + o.indent;
      a.x = _(a.x + i);
    } else {
      i = ((n = y(this._innerRect, {
        height: o.maxBound - o.minBound
      })).top + n.bottom) / 2 - (o.minBound + o.maxBound) / 2;
      a.startCoord = n.left + o.indent;
      a.endCoord = n.right - o.indent;
      a.y = _(a.y + i);
    }
    this._translator.setCodomain(a.startCoord, a.endCoord);
    this._innerRect = n;
  },
  _getElementLayout: function (e) {
    return {
      x: _(this._area.x + e),
      y: _(this._area.y + e)
    };
  },
  _getApproximateScreenRange: function () {
    var e = this._area;
    var t = e.vertical ? this._canvas.height : this._canvas.width;
    if (t > e.totalSize) {
      t = e.totalSize;
    }
    return t *= 0.8;
  },
  _getDefaultSize: function () {
    if ((this.option("geometry") || {}).orientation === "vertical") {
      return {
        width: 100,
        height: 300
      };
    } else {
      return {
        width: 300,
        height: 100
      };
    }
  },
  _factory: (0, s.clone)(l.BaseGauge.prototype._factory)
});
function y(e, t, n) {
  var i;
  var o = (0, r.extend)({}, e);
  n = n || {};
  if (t) {
    o.left += n.left || 0;
    o.right -= n.right || 0;
    o.top += n.top || 0;
    o.bottom -= n.bottom || 0;
    if (t.width > 0 && (i = (o.right - o.left - t.width) / 2) > 0) {
      o.left += i;
      o.right -= i;
    }
    if (t.height > 0 && (i = (o.bottom - o.top - t.height) / 2) > 0) {
      o.top += i;
      o.bottom -= i;
    }
  }
  return o;
}
var b = v.prototype._factory.indicators = {};
v.prototype._factory.createIndicator = (0, u.createIndicatorCreator)(b);
b._default = c._default;
b.rectangle = c.rectangle;
b.rhombus = c.rhombus;
b.circle = c.circle;
b.trianglemarker = c.trianglemarker;
b.textcloud = c.textcloud;
b.rangebar = c.rangebar;
v.prototype._factory.RangeContainer = h.default;
(0, a.default)("dxLinearGauge", v);
var x = v;
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;