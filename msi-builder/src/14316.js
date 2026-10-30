exports.projection = exports.Projection = undefined;
var i = require("./13306.js");
var o = require("./63832.js");
function a(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return r(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return r(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var s = Number;
var l = Math.min;
var u = Math.max;
var d = Math.abs;
var c = Math.round;
var h = Math.log;
var f = Math.pow;
var p = 2 / Math.LN2;
var g = [NaN, NaN];
function m(e, t) {
  return d(e - t) < 1e-8;
}
function _(e, t) {
  return m(e[0], t[0]) && m(e[1], t[1]);
}
function v(e, t, n, i) {
  var o = s(e);
  if (isFinite(o)) {
    return l(u(o, t), n);
  } else {
    return i;
  }
}
function y(e, t, n, i) {
  return [v(e[0], t[0], n[0], i[0]), v(e[1], t[1], n[1], i[1])];
}
function b(e) {
  return e instanceof k && e || O.get(e) || O(e) || O.get("mercator");
}
function x(e) {
  this._initEvents();
  this._params = e;
  this._engine = b();
  this._center = this._engine.center();
  this._adjustCenter();
}
function w(e, t, n, i) {
  var o = (n + i) / 2;
  if (d(e - o) > d(t - o)) {
    return e;
  } else {
    return t;
  }
}
function C(e, t, n, i) {
  var o = (n + i) / 2;
  if (d(e - o) < d(t - o)) {
    return e;
  } else {
    return t;
  }
}
function S(e, t, n) {
  var i = E(t, n);
  var o = i.min;
  var a = i.max;
  e.min = T(o);
  e.max = T(a);
}
exports.Projection = x;
x.prototype = {
  constructor: x,
  _minZoom: 1,
  _maxZoom: 256,
  _zoom: 1,
  _center: g,
  _canvas: {},
  _scale: [],
  dispose: function () {
    this._disposeEvents();
  },
  setEngine: function (e) {
    var t = b(e);
    if (this._engine !== t) {
      this._engine = t;
      this._fire("engine");
      if (this._changeCenter(t.center())) {
        this._triggerCenterChanged();
      }
      if (this._changeZoom(this._minZoom)) {
        this._triggerZoomChanged();
      }
      this._adjustCenter();
      this._setupScreen();
    }
  },
  setBounds: function (e) {
    if (e !== undefined) {
      this.setEngine(this._engine.original().bounds(e));
    }
  },
  _setupScreen: function () {
    var e = this._canvas;
    var t = e.width;
    var n = e.height;
    var i = this._engine;
    var o = i.ar();
    this._x0 = e.left + t / 2;
    this._y0 = e.top + n / 2;
    var a;
    var r = [this.project([i.min()[0], 0])[0], this.project([0, i.min()[1]])[1]];
    var s = [this.project([i.max()[0], 0])[0], this.project([0, i.max()[1]])[1]];
    var c = t / n;
    var h = d(s[0] - r[0]) / d(s[1] - r[1]);
    a = isNaN(h) || h === 0 || l(c, o) <= o * h && o * h <= u(c, o) ? 1 : h > 1 ? h : 1 / h;
    if (o * h >= c) {
      this._xRadius = t / 2 / a;
      this._yRadius = t / 2 / (o * a);
    } else {
      this._xRadius = n / 2 * (o / a);
      this._yRadius = n / 2 / a;
    }
    this._fire("screen");
  },
  setSize: function (e) {
    this._canvas = e;
    this._setupScreen();
  },
  getCanvas: function () {
    return this._canvas;
  },
  _toScreen: function (e) {
    return [this._x0 + this._xRadius * e[0], this._y0 + this._yRadius * e[1]];
  },
  _fromScreen: function (e) {
    return [(e[0] - this._x0) / this._xRadius, (e[1] - this._y0) / this._yRadius];
  },
  _toTransformed: function (e) {
    return [e[0] * this._zoom + this._xCenter, e[1] * this._zoom + this._yCenter];
  },
  _toTransformedFast: function (e) {
    return [e[0] * this._zoom, e[1] * this._zoom];
  },
  _fromTransformed: function (e) {
    return [(e[0] - this._xCenter) / this._zoom, (e[1] - this._yCenter) / this._zoom];
  },
  _adjustCenter: function () {
    var e = this._engine.project(this._center);
    this._xCenter = -e[0] * this._zoom || 0;
    this._yCenter = -e[1] * this._zoom || 0;
  },
  project: function (e) {
    return this._engine.project(e);
  },
  transform: function (e) {
    return this._toScreen(this._toTransformedFast(e));
  },
  isInvertible: function () {
    return this._engine.isInvertible();
  },
  getSquareSize: function (e) {
    return [e[0] * this._zoom * this._xRadius, e[1] * this._zoom * this._yRadius];
  },
  getZoom: function () {
    return this._zoom;
  },
  _changeZoom: function (e) {
    var t = !m(this._zoom, this._zoom = v(e, this._minZoom, this._maxZoom, this._minZoom));
    if (t) {
      this._adjustCenter();
      this._fire("zoom");
    }
    return t;
  },
  setZoom: function (e) {
    if (this._engine.isInvertible() && this._changeZoom(e)) {
      this._triggerZoomChanged();
    }
  },
  getScaledZoom: function () {
    return c((this._scale.length - 1) * h(this._zoom) / h(this._maxZoom));
  },
  setScaledZoom: function (e) {
    this.setZoom(this._scale[c(e)]);
  },
  changeScaledZoom: function (e) {
    this.setZoom(this._scale[u(l(c(this.getScaledZoom() + e), this._scale.length - 1), 0)]);
  },
  getZoomScalePartition: function () {
    return this._scale.length - 1;
  },
  _setupScaling: function () {
    var e = u(c(p * h(this._maxZoom)), 4);
    var t = f(this._maxZoom, 1 / e);
    var n = this._minZoom;
    this._scale = [n];
    for (var i = 1; i <= e; ++i) {
      this._scale.push(n *= t);
    }
  },
  setMaxZoom: function (e) {
    this._minZoom = 1;
    this._maxZoom = v(e, this._minZoom, s.MAX_VALUE, 256);
    this._setupScaling();
    if (this._zoom > this._maxZoom) {
      this.setZoom(this._maxZoom);
    }
    this._fire("max-zoom");
  },
  getCenter: function () {
    return this._center.slice();
  },
  setCenter: function (e) {
    if (this._engine.isInvertible() && this._changeCenter(e || [])) {
      this._triggerCenterChanged();
    }
  },
  _changeCenter: function (e) {
    var t = this._engine;
    var n = !_(this._center, this._center = y(e, t.min(), t.max(), t.center()));
    if (n) {
      this._adjustCenter();
      this._fire("center");
    }
    return n;
  },
  _triggerCenterChanged: function () {
    this._params.centerChanged(this.getCenter());
  },
  _triggerZoomChanged: function () {
    this._params.zoomChanged(this.getZoom());
  },
  setCenterByPoint: function (e, t) {
    var n = this._engine.project(e);
    var i = this._fromScreen(t);
    this.setCenter(this._engine.unproject([-i[0] / this._zoom + n[0], -i[1] / this._zoom + n[1]]));
  },
  beginMoveCenter: function () {
    if (this._engine.isInvertible()) {
      this._moveCenter = this._center;
    }
  },
  endMoveCenter: function () {
    if (this._moveCenter) {
      if (!_(this._moveCenter, this._center)) {
        this._triggerCenterChanged();
      }
      this._moveCenter = null;
    }
  },
  moveCenter: function (e) {
    if (this._moveCenter) {
      var t = this.toScreenPoint(this._center);
      this._changeCenter(this.fromScreenPoint([t[0] + e[0], t[1] + e[1]]));
    }
  },
  getViewport: function () {
    var e = this._engine.unproject;
    var t = e(this._fromTransformed([-1, -1]));
    var n = e(this._fromTransformed([-1, 1]));
    var i = e(this._fromTransformed([1, -1]));
    var o = e(this._fromTransformed([1, 1]));
    var a = E([w(t[0], n[0], i[0], o[0]), w(t[1], i[1], n[1], o[1])], [w(i[0], o[0], t[0], n[0]), w(n[1], o[1], t[1], i[1])]);
    return [].concat(a.min, a.max);
  },
  setViewport: function (e) {
    var t = this._engine;
    var n = e ? function (e, t, n) {
      var i = e([n[0], n[3]]);
      var o = e([n[0], n[1]]);
      var a = e([n[2], n[3]]);
      var r = e([n[2], n[1]]);
      var s = C(i[0], o[0], a[0], r[0]);
      var l = C(a[0], r[0], i[0], o[0]);
      var c = C(i[1], a[1], o[1], r[1]);
      var h = C(o[1], r[1], i[1], a[1]);
      return [2 / u(d(s - l), d(c - h)), t([(s + l) / 2, (c + h) / 2])];
    }(t.project, t.unproject, e) : [this._minZoom, t.center()];
    this.setZoom(n[0]);
    this.setCenter(n[1]);
  },
  getTransform: function () {
    return {
      translateX: this._xCenter * this._xRadius,
      translateY: this._yCenter * this._yRadius
    };
  },
  fromScreenPoint: function (e) {
    return this._engine.unproject(this._fromTransformed(this._fromScreen(e)));
  },
  toScreenPoint: function (e) {
    return this._toScreen(this._toTransformed(this._engine.project(e)));
  },
  _eventNames: ["engine", "screen", "center", "zoom", "max-zoom"]
};
(0, o.makeEventEmitter)(x);
var k = function () {
  function e(e) {
    var t;
    t = e.to;
    function n(e) {
      return D(t(e));
    }
    var o = e.from ? function (e) {
      return function (t) {
        return e(D(t));
      };
    }(e.from) : I(g);
    this.project = n;
    this.unproject = o;
    this.original = I(this);
    this.source = function () {
      return (0, i.extend)({}, e);
    };
    this.isInvertible = I(!!e.from);
    this.ar = I(e.aspectRatio > 0 ? s(e.aspectRatio) : 1);
    this.center = T(o([0, 0]));
    S(this, [o([-1, 0])[0], o([0, 1])[1]], [o([1, 0])[0], o([0, -1])[1]]);
  }
  var t = e.prototype;
  t.aspectRatio = function (t) {
    var n = new e((0, i.extend)(this.source(), {
      aspectRatio: t
    }));
    n.original = this.original;
    n.min = this.min;
    n.max = this.max;
    return n;
  };
  t.bounds = function (t) {
    t = t || [];
    var n = this.source();
    var o = this.min();
    var r = this.max();
    var s = y([t[0], t[1]], o, r, o);
    var u = y([t[2], t[3]], o, r, r);
    var c = n.to(s);
    var h = n.to(u);
    var f = l(d(h[0] - c[0]) > 1 / 3600 / 180 / 10 ? d(h[0] - c[0]) : 2, d(h[1] - c[1]) > 1 / 3600 / 180 / 10 ? d(h[1] - c[1]) : 2);
    if (f < 2) {
      (0, i.extend)(n, function (e, t, n, i, o) {
        var r = (n[0] + i[0]) / 2 - o / 2;
        var s = (n[1] + i[1]) / 2 - o / 2;
        var l = 2 / o;
        return {
          to: function (t) {
            var n = a(e(t), 2);
            var i = n[0];
            var o = n[1];
            return [(i - r) * l - 1, (o - s) * l - 1];
          },
          from: function (e) {
            return t([r + (e[0] + 1) / l, s + (e[1] + 1) / l]);
          }
        };
      }(n.to, n.from, c, h, f));
    }
    var p = new e(n);
    p.original = this.original;
    S(p, s, u);
    return p;
  };
  return e;
}();
function D(e) {
  return [e[0], -e[1]];
}
function I(e) {
  return function () {
    return e;
  };
}
function T(e) {
  return function () {
    return e.slice();
  };
}
function E(e, t) {
  return {
    min: [l(e[0], t[0]), l(e[1], t[1])],
    max: [u(e[0], t[0]), u(e[1], t[1])]
  };
}
function O(e) {
  if (e && e.to) {
    return new k(e);
  } else {
    return null;
  }
}
exports.projection = O;
var A = {};
O.get = function (e) {
  return A[e] || null;
};
O.add = function (e, t) {
  t = t instanceof k && t || O(t);
  if (!A[e] && t) {
    A[e] = t;
  }
  return O;
};