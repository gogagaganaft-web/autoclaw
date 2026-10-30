exports.Plaque = undefined;
var i = require("./13306.js");
var o = require("./35922.js");
var a = ["x", "y", "canvas", "offsetX", "offsetY", "offset"];
function r() {
  return (r = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function s(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
var l = Math;
var u = l.round;
var d = l.max;
var c = l.min;
var h = l.sin;
var f = l.cos;
var p = l.asin;
var g = l.PI;
function m() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
    t[n] = arguments[n];
  }
  return t.join("");
}
function _(e, t, n) {
  return `a ${e} ${e} 0 0 1 ${t * e} ${n * e}`;
}
function v(e, t, n) {
  return `A ${e} ${e} 0 0 1 ${t} ${n}`;
}
function y(e, t, n, i, o) {
  return (e - i) * u(f(n)) + (t - o) * u(h(n)) + i;
}
function b(e, t, n, i, o) {
  return -(e - i) * u(h(n)) + (t - o) * u(f(n)) + o;
}
function x(e, t, n, i, o) {
  var a = e.width / 2;
  var r = e.height / 2;
  var s = Math.ceil(t + a);
  var l = Math.floor(t - a);
  var u = Math.floor(n - r);
  var d = Math.ceil(n + r);
  if (i < l && o < u || i >= l && i <= s && o < u) {
    return 270;
  } else if (i > s && o > d || i >= l && i <= s && o > d) {
    return 90;
  } else if (i < l && o > d || i < l && o >= u && o <= d) {
    return 180;
  } else {
    return 0;
  }
}
function w(e, t, n, i, o, a, r) {
  var s;
  var l = e.width;
  var u = e.height;
  var y = a.arrowWidth;
  var b = a.cornerRadius;
  var x = b === undefined ? 0 : b;
  var w = y / 2;
  var C = l / 2;
  var S = u / 2;
  var k = Math.ceil(t + C);
  var D = Math.floor(t - C);
  var I = Math.floor(n - S);
  var T = Math.ceil(n + S);
  var E = [D, I];
  var O = [k, I];
  var A = [k, T];
  var P = [D, T];
  var M = i <= D ? D : k <= i ? k : i;
  var R = o <= I ? I : T <= o ? T : o;
  var B = c(R + w, T);
  var L = d(R - w, I);
  var V = d(M - w, D);
  x = Math.min(l / 2, u / 2, x);
  E[1] += x;
  O[0] -= x;
  A[1] -= x;
  P[0] += x;
  if (!r || D <= i && i <= k && I <= o && o <= T) {
    s = m(E, _(x, 1, -1), "L", O, _(x, 1, 1), "L", A, _(x, -1, 1), "L", P, _(x, -1, -1));
  } else if (i > k && o < I) {
    var F = y / x || 0;
    var H = g / 4 + F / 2;
    var N = g / 4 - F / 2;
    var z = O[0] + f(N) * x;
    var j = O[1] + (1 - h(N)) * x;
    var W = m("L", O, _(x, f(H), 1 - h(H)), "L", [i, o, z, j], v(x, O[0] + x, O[1] + x));
    if (Math.abs(H) > g / 2) {
      W = m("L", [V, I, i, o, k, B]);
    }
    s = m(E, _(x, 1, -1), W, "L", A, _(x, -1, 1), "L", P, _(x, -1, -1));
  } else if (i > k && o >= I && o <= T) {
    var G;
    if (L >= O[1] + x && B <= A[1]) {
      G = m(_(x, 1, 1), "L", [k, L, i, o, k, B], "L", A, _(x, -1, 1));
    } else if (L < O[1] + x && B >= O[1] + x && B <= A[1]) {
      var q = (O[1] + x - L) / x;
      var $ = O[0] + f(q) * x;
      var U = O[1] + (1 - h(q)) * x;
      G = m(_(x, f(q), 1 - h(q)), "L", [$, U, i, o, k, B], "L", A, _(x, -1, 1));
    } else if (L < O[1] + x && B < O[1] + x) {
      var K = (O[1] + x - L) / x;
      var Z = O[0] + f(K) * x;
      var Y = O[1] + (1 - h(K)) * x;
      var X = Math.sin((O[1] + x - B) / x);
      var Q = O[0] + x * f(X);
      var J = O[1] + x * (1 - h(X));
      G = m(_(x, f(K), 1 - h(K)), "L", [Z, Y, i, o, Q, J], v(x, O[0] + x, O[1] + x), "L", A, _(x, -1, 1));
    } else if (L <= O[1] + x && B >= A[1]) {
      var ee = p((O[1] + x - L) / x);
      var te = O[0] + x * f(ee);
      var ne = O[1] + x * (1 - h(ee));
      var ie = p((B - A[1]) / x);
      var oe = A[0] + x * (f(ie) - 1);
      var ae = A[1] + x * h(ie);
      G = m(_(x, f(ee), 1 - h(ee)), "L", [te, ne, i, o, oe, ae], v(x, A[0] - x, A[1] + x));
    } else if (L > O[1] + x && L <= A[1] && B > A[1]) {
      var re = p((B - A[1]) / x);
      var se = A[0] + x * (f(re) - 1);
      var le = A[1] + x * h(re);
      G = m(_(x, 1, 1), "L", [k, L, i, o, se, le], v(x, A[0] - x, A[1] + x));
    } else if (L > O[1] + x && B > A[1]) {
      var ue = p((B - A[1]) / x);
      var de = A[0] + x * (f(ue) - 1);
      var ce = A[1] + x * h(ue);
      var he = p((L - A[1]) / x);
      var fe = A[0] + x * (f(he) - 1);
      var pe = A[1] + x * h(he);
      G = m(_(x, 1, 1), "L", A, _(x, f(he) - 1, h(he)), "L", [fe, pe, i, o, de, ce], v(x, A[0] - x, A[1] + x));
    }
    s = m(E, _(x, 1, -1), "L", O, G, "L", P, _(x, -1, -1));
  }
  return m("M", s, "Z");
}
var C = function () {
  function e(e, t, n, i) {
    var o = !(arguments.length > 4) || arguments[4] === undefined || arguments[4];
    var a = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : function (e, t) {
      return t.getBBox();
    };
    var r = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : function (e, t, n, i) {
      return t.move(n, i);
    };
    this.widget = t;
    this.options = e;
    this.root = n;
    this.contentTemplate = i;
    this.bonded = o;
    this.measureContent = a;
    this.moveContentGroup = r;
  }
  var t = e.prototype;
  t.draw = function (e) {
    var t = this;
    var n = e.x;
    var l = e.y;
    var h = e.canvas;
    var f = h === undefined ? {} : h;
    var p = e.offsetX;
    var g = e.offsetY;
    var m = e.offset;
    var _ = m === undefined ? 0 : m;
    var v = s(e, a);
    var y = this.options;
    var b = y.x;
    var x = y.y;
    var w = f.left;
    var C = f.width - f.right;
    var S = f.width - f.right - f.left;
    var k = f.top;
    var D = f.height - f.bottom;
    var I = f.height - f.bottom - f.top;
    if ((!(0, o.isDefined)(n) || !(0, o.isDefined)(l)) && (!(0, o.isDefined)(b) || !(0, o.isDefined)(x))) {
      return false;
    }
    if ((0, o.isDefined)(n) && (n < w || C < n || l < k || D < l)) {
      return false;
    }
    if (!this._root) {
      this._draw();
    }
    var T = (0, i.extend)({
      x: "-50%",
      y: "-50%",
      width: "200%",
      height: "200%"
    }, y.shadow);
    var E = y.width > 0 ? y.width : null;
    var O = y.height > 0 ? y.height : null;
    function A() {
      var e;
      var i = t._contentBBox = t.measureContent(t.widget, t._contentGroup);
      var a = t._size = {
        width: d(E, i.width) + y.paddingLeftRight * 2,
        height: d(O, i.height) + y.paddingTopBottom * 2,
        offset: _
      };
      var r = T.offsetX;
      var s = T.offsetY;
      var h = T.blur * 2 + 1;
      var f = d(h - r, 0);
      var m = d(h + r, 0);
      var v = d(h - s, 0);
      var A = d(h + s, 0);
      t.margins = {
        lm: f,
        rm: m,
        tm: v,
        bm: A
      };
      if ((0, o.isDefined)(b)) {
        b += p || 0;
        if (!(0, o.isDefined)(n)) {
          n = b;
        }
      } else {
        b = (0, o.isDefined)(p) ? n + p : S < a.width ? u(w + S / 2) : c(d(n, Math.ceil(w + a.width / 2 + f)), Math.floor(C - a.width / 2 - m));
      }
      if ((0, o.isDefined)(x)) {
        x += g || 0;
        if (!(0, o.isDefined)(l)) {
          l = x + a.height / 2;
        }
      } else if ((0, o.isDefined)(g)) {
        x = l + g;
      } else {
        var P = l - y.arrowLength - a.height / 2 - _;
        var M = l + y.arrowLength + a.height / 2 + _;
        if (I < a.height + y.arrowLength) {
          x = u(k + a.height / 2);
        } else if (P - a.height / 2 - v < k) {
          if (M + a.height / 2 + A < D) {
            x = M;
            l += _;
          } else {
            x = u(k + a.height / 2);
          }
        } else {
          x = P;
          l -= _;
        }
      }
      t.anchorX = n;
      t.anchorY = l;
      t.move(b, x);
      if ((e = t._root) !== null && e !== undefined) {
        e.append(t.root);
      }
    }
    if (this.contentTemplate.render) {
      this.contentTemplate.render({
        model: y,
        container: this._contentGroup.element,
        onRendered: A
      });
      return true;
    } else {
      return this.contentTemplate(r({
        group: this._contentGroup,
        onRender: A
      }, v));
    }
  };
  t._draw = function () {
    var e = this.widget._renderer;
    var t = this.options;
    var n = (0, i.extend)({
      x: "-50%",
      y: "-50%",
      width: "200%",
      height: "200%"
    }, t.shadow);
    var o = this._shadow = e.shadowFilter().attr(n);
    var a = {
      opacity: t.opacity,
      "stroke-width": 0,
      fill: t.color
    };
    var r = t.border || {};
    if (r.visible) {
      (0, i.extend)(a, {
        "stroke-width": r.width,
        stroke: r.color,
        "stroke-opacity": r.opacity,
        dashStyle: r.dashStyle
      });
    }
    var s = this._root = e.g().append(this.root);
    if (t.type) {
      s.attr({
        class: `dxc-${t.type}-annotation`
      });
    }
    var l = e.g().attr({
      filter: o.id
    }).append(s);
    this._cloud = e.path([], "area").attr(a).sharp().append(l);
    this._contentGroup = e.g().append(s);
  };
  t.getBBox = function () {
    var e = this._size || {};
    var t = this.margins || {};
    var n = x(e, this.x, this.y, this.anchorX, this.anchorY);
    return {
      x: Math.floor(this.x - e.width / 2 - t.lm),
      y: Math.floor(this.y - e.height / 2 - t.tm - (n === 270 ? this.options.arrowLength : 0)),
      width: e.width + t.lm + t.rm,
      height: e.height + t.tm + t.bm + (n === 90 || n === 270 ? this.options.arrowLength : 0)
    };
  };
  t.clear = function () {
    if (this._root) {
      this._root.remove();
      this._shadow.remove();
      this._root = null;
    }
    return this;
  };
  t.customizeCloud = function (e) {
    if (this._cloud) {
      this._cloud.attr(e);
    }
  };
  t.moveRoot = function (e, t) {
    if (this._root) {
      this._root.move(e, t);
    }
  };
  t.move = function (e, t) {
    e = u(e);
    t = u(t);
    this.x = e;
    this.y = t;
    var n;
    var i;
    var o = x(this._size, e, t, this.anchorX, this.anchorY);
    var a = o * g / 180;
    this._cloud.attr({
      d: w((n = this._size, i = o, i % 90 == 0 && i % 180 != 0 ? {
        width: n.height,
        height: n.width
      } : n), e, t, y(this.anchorX, this.anchorY, a, e, t), b(this.anchorX, this.anchorY, a, e, t), this.options, this.bonded)
    }).rotate(o, e, t);
    this.moveContentGroup(this.widget, this._contentGroup, e - this._contentBBox.x - this._contentBBox.width / 2, t - this._contentBBox.y - this._contentBBox.height / 2);
  };
  t.hitTest = function (e, t) {
    var n = this._size || {};
    var i = n.width;
    var o = n.height;
    return Math.abs(e - this.x) <= i / 2 && Math.abs(t - this.y) <= o / 2;
  };
  return e;
}();
exports.Plaque = C;