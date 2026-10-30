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
var o = g(require("./99393.js"));
var a = require("./48013.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./18029.js");
var u = require("./88917.js");
var d = require("./19157.js");
var c = require("./56672.js");
var h = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = p(t);
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
}(require("./16030.js"));
var f = g(require("./27172.js"));
function p(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (p = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = isFinite;
var _ = d.normalizeAngle;
var v = d.getCosAndSin;
var y = Math.abs;
var b = Math.max;
var x = Math.min;
var w = Math.round;
var C = s.each;
var S = Math.PI;
var k = u.dxGauge.inherit({
  _rootClass: "dxg-circular-gauge",
  _factoryMethods: {
    rangeContainer: "createCircularRangeContainer",
    indicator: "createCircularIndicator"
  },
  _gridSpacingFactor: 17,
  _scaleTypes: {
    type: "polarAxes",
    drawingType: "circular"
  },
  _getThemeManagerOptions: function () {
    var e = this.callBase.apply(this, arguments);
    e.subTheme = "_circular";
    return e;
  },
  _updateScaleTickIndent: function (e) {
    var t = e.label.indentFromTick;
    var n = e.tick.visible ? e.tick.length : 0;
    var i = this._scale.measureLabels((0, r.extend)({}, this._canvas));
    var o = e.orientation;
    var a = n;
    var s = t;
    if (t >= 0) {
      if (o === "outside") {
        s += a;
      } else if (o === "center") {
        s += a / 2;
      }
    } else {
      s -= b(i.width, i.height);
      if (o === "inside") {
        s -= a;
      } else if (o === "center") {
        s -= a / 2;
      }
    }
    e.label.indentFromAxis = s;
    this._scale.updateOptions(e);
  },
  _setupCodomain: function () {
    var e;
    var t = this.option("geometry") || {};
    var n = t.startAngle;
    var i = t.endAngle;
    n = m(n) ? _(n) : 225;
    i = m(i) ? _(i) : -45;
    if (y(n - i) < 1) {
      i -= 360;
      e = {
        left: -1,
        up: -1,
        right: 1,
        down: 1
      };
    } else {
      if (n < i) {
        i -= 360;
      }
      e = function (e, t) {
        var n = v(e);
        var i = v(t);
        var o = n.cos;
        var a = n.sin;
        var r = i.cos;
        var s = i.sin;
        return {
          left: a <= 0 && s >= 0 || a <= 0 && s <= 0 && o <= r || a >= 0 && s >= 0 && o >= r ? -1 : x(o, r, 0),
          right: a >= 0 && s <= 0 || a >= 0 && s >= 0 && o >= r || a <= 0 && s <= 0 && o <= r ? 1 : b(o, r, 0),
          up: o <= 0 && r >= 0 || o <= 0 && r <= 0 && a >= s || o >= 0 && r >= 0 && a <= s ? -1 : -b(a, s, 0),
          down: o >= 0 && r <= 0 || o >= 0 && r >= 0 && a <= s || o <= 0 && r <= 0 && a >= s ? 1 : -x(a, s, 0)
        };
      }(n, i);
    }
    this._area = {
      x: 0,
      y: 0,
      radius: 100,
      startCoord: n,
      endCoord: i,
      sides: e
    };
    this._translator.setCodomain(n, i);
  },
  _getCenter: function () {
    return this._getElementLayout();
  },
  _shiftScale: function (e) {
    var t = this._scale;
    var n = t.getCanvas();
    n.width = n.height = e.radius * 2;
    t.draw(n);
    var i = t.getCenter();
    t.shift({
      right: e.x - i.x,
      bottom: e.y - i.y
    });
  },
  _getScaleLayoutValue: function () {
    return this._area.radius;
  },
  _getTicksOrientation: function (e) {
    return e.orientation;
  },
  _getTicksCoefficients: function (e) {
    var t = {
      inner: 0,
      outer: 1
    };
    if (e.orientation === "inside") {
      t.inner = 1;
      t.outer = 0;
    } else if (e.orientation === "center") {
      t.inner = t.outer = 0.5;
    }
    return t;
  },
  _correctScaleIndents: function (e, t, n) {
    if (t >= 0) {
      e.horizontalOffset = t + n.width;
      e.verticalOffset = t + n.height;
    } else {
      e.horizontalOffset = e.verticalOffset = 0;
      e.min -= -t + b(n.width, n.height);
    }
    e.inverseHorizontalOffset = n.width / 2;
    e.inverseVerticalOffset = n.height / 2;
  },
  _measureMainElements: function (e, t) {
    var n = this._area.radius;
    var i = 0;
    var o = Infinity;
    var a = 0;
    var r = 0;
    var s = 0;
    var l = 0;
    var u = this._scale;
    C(e.concat(u), function (e, u) {
      var d = u.measure ? u.measure({
        radius: n - u.getOffset()
      }) : t;
      if (d.min > 0) {
        o = x(o, d.min);
      }
      if (d.max > 0) {
        i = b(i, d.max);
      }
      if (d.horizontalOffset > 0) {
        a = b(a, d.max + d.horizontalOffset);
      }
      if (d.verticalOffset > 0) {
        r = b(r, d.max + d.verticalOffset);
      }
      if (d.inverseHorizontalOffset > 0) {
        s = b(s, d.inverseHorizontalOffset);
      }
      if (d.inverseVerticalOffset > 0) {
        l = b(l, d.inverseVerticalOffset);
      }
    });
    a = b(a - i, 0);
    r = b(r - i, 0);
    return {
      minRadius: o,
      maxRadius: i,
      horizontalMargin: a,
      verticalMargin: r,
      inverseHorizontalMargin: s,
      inverseVerticalMargin: l
    };
  },
  _applyMainLayout: function (e, t) {
    var n = this._measureMainElements(e, t);
    var i = this._area;
    var o = i.sides;
    var a = {
      left: (o.left < -0.1 ? n.horizontalMargin : n.inverseHorizontalMargin) || 0,
      right: (o.right > 0.1 ? n.horizontalMargin : n.inverseHorizontalMargin) || 0,
      top: (o.up < -0.1 ? n.verticalMargin : n.inverseVerticalMargin) || 0,
      bottom: (o.down > 0.1 ? n.verticalMargin : n.inverseVerticalMargin) || 0
    };
    var s = function (e, t, n) {
      var i;
      var o = (0, r.extend)({}, e);
      var a = 0;
      var s = 0;
      n = n || {};
      if (t > 0) {
        o.left += n.left || 0;
        o.right -= n.right || 0;
        o.top += n.top || 0;
        o.bottom -= n.bottom || 0;
        if (D(o) > 0 && I(o) > 0) {
          if ((i = I(o) / D(o)) > 1) {
            if (t < i) {
              a = D(o);
            } else {
              s = I(o);
            }
          } else if (t > i) {
            s = I(o);
          } else {
            a = D(o);
          }
          if (!(a > 0)) {
            a = s / t;
          }
          if (!(s > 0)) {
            s = a * t;
          }
          a = (D(o) - a) / 2;
          s = (I(o) - s) / 2;
          o.left += a;
          o.right -= a;
          o.top += s;
          o.bottom -= s;
        } else {
          o.left = o.right = (o.left + o.right) / 2;
          o.top = o.bottom = (o.top + o.bottom) / 2;
        }
      }
      return o;
    }(this._innerRect, (o.down - o.up) / (o.right - o.left), a);
    var l = x(D(s) / (o.right - o.left), I(s) / (o.down - o.up));
    l = l - n.maxRadius + i.radius;
    var u = s.left - D(s) * o.left / (o.right - o.left);
    var d = s.top - I(s) * o.up / (o.down - o.up);
    i.x = w(u);
    i.y = w(d);
    i.radius = l;
    s.left -= a.left;
    s.right += a.right;
    s.top -= a.top;
    s.bottom += a.bottom;
    this._innerRect = s;
  },
  _getElementLayout: function (e = 0) {
    return {
      x: this._area.x,
      y: this._area.y,
      radius: w(this._area.radius - e)
    };
  },
  _getApproximateScreenRange: function () {
    var e = this._area;
    var t = x(this._canvas.width / (e.sides.right - e.sides.left), this._canvas.height / (e.sides.down - e.sides.up));
    if (t > e.totalRadius) {
      t = e.totalRadius;
    }
    t *= 0.8;
    return -this._translator.getCodomainRange() * t * S / 180;
  },
  _getDefaultSize: function () {
    return {
      width: 300,
      height: 300
    };
  },
  _factory: (0, a.clone)(l.BaseGauge.prototype._factory)
});
function D(e) {
  return e.right - e.left;
}
function I(e) {
  return e.bottom - e.top;
}
var T = k.prototype._factory.indicators = {};
k.prototype._factory.createIndicator = (0, u.createIndicatorCreator)(T);
T._default = h._default;
T.rectangleneedle = h.rectangleneedle;
T.triangleneedle = h.triangleneedle;
T.twocolorneedle = h.twocolorneedle;
T.trianglemarker = h.trianglemarker;
T.textcloud = h.textcloud;
T.rangebar = h.rangebar;
k.prototype._factory.RangeContainer = f.default;
(0, o.default)("dxCircularGauge", k);
k.addPlugin(c.plugins.gauge);
var E = k;
exports.default = E;
module.exports = exports.default;
module.exports.default = exports.default;