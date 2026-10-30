exports.RectSvgElement = exports.PathSvgElement = exports.ArcSvgElement = undefined;
exports.Renderer = ge;
exports.TextSvgElement = exports.SvgElement = undefined;
exports.getFuncIri = k;
exports.processHatchingAttrs = T;
exports.refreshPaths = undefined;
var i = h(require("./68374.js"));
var o = h(require("./73349.js"));
var a = require("./58201.js");
var r = h(require("./39618.js"));
var s = h(require("./55994.js"));
var l = require("./19155.js");
var u = require("./91577.js");
var d = require("./19157.js");
var c = require("./35922.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f(e, t) {
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
      return p(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return p(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function p(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var g = (0, a.getWindow)();
var m = Math.max;
var _ = Math.round;
var v = {
  "column-count": true,
  "fill-opacity": true,
  "flex-grow": true,
  "flex-shrink": true,
  "font-weight": true,
  "line-height": true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  "z-index": true,
  zoom: true
};
var y = "none";
var b = Object.create ? function (e) {
  return Object.create(e);
} : function (e) {
  function t() {}
  t.prototype = e;
  return new t();
};
var x = {
  scaleX: 1,
  scaleY: 1,
  "pointer-events": null
};
var w = (0, r.default)(function () {
  var e = o.default.createElement("div");
  e.style.left = "-9999px";
  e.style.position = "absolute";
  return {
    backupContainer: e,
    backupCounter: 0
  };
});
function C(e) {
  return e && typeof e != "string";
}
function S(e) {
  return o.default.createElementNS("http://www.w3.org/2000/svg", e);
}
function k(e, t) {
  if (e !== null) {
    return "url(" + (t ? g.location.href.split("#")[0] : "") + "#" + e + ")";
  } else {
    return e;
  }
}
function D(e, t) {
  var n;
  for (n in t) {
    e[n] = t[n];
  }
  return e;
}
var I = {
  full: y,
  lefttop: "xMinYMin",
  leftcenter: "xMinYMid",
  leftbottom: "xMinYMax",
  centertop: "xMidYMin",
  center: "xMidYMid",
  centerbottom: "xMidYMax",
  righttop: "xMaxYMin",
  rightcenter: "xMaxYMid",
  rightbottom: "xMaxYMax"
};
function T(e, t) {
  if (t.hatching && (0, d.normalizeEnum)(t.hatching.direction) !== "none") {
    (t = D({}, t)).fill = e._hatching = e.renderer.lockDefsElements({
      color: t.fill,
      hatching: t.hatching
    }, e._hatching, "pattern");
    delete t.filter;
  } else if (e._hatching) {
    e.renderer.releaseDefsElements(e._hatching);
    e._hatching = null;
    delete t.filter;
  } else if (t.filter) {
    (t = D({}, t)).filter = e._filter = e.renderer.lockDefsElements({}, e._filter, "filter");
  } else if (e._filter) {
    e.renderer.releaseDefsElements(e._filter);
    e._filter = null;
  }
  delete t.hatching;
  return t;
}
function E(e, t, n, i, o, a, r, s, l, u) {
  return ["M", (e + i * o).toFixed(5), (t - i * a).toFixed(5), "A", i.toFixed(5), i.toFixed(5), 0, u, 0, (e + i * r).toFixed(5), (t - i * s).toFixed(5), l ? "M" : "L", (e + n * r).toFixed(5), (t - n * s).toFixed(5), "A", n.toFixed(5), n.toFixed(5), 0, u, 1, (e + n * o).toFixed(5), (t - n * a).toFixed(5), "Z"].join(" ");
}
function O(e, t) {
  var n = [["M", 0, 0]];
  switch (t) {
    case "line":
      n = A(e);
      break;
    case "area":
      n = A(e, true);
      break;
    case "bezier":
      n = P(e);
      break;
    case "bezierarea":
      n = P(e, true);
  }
  return n;
}
function A(e, t) {
  return M(e, R, t);
}
function P(e, t) {
  return M(e, B, t);
}
function M(e, t, n) {
  var i;
  var o;
  var a;
  var r = [];
  if ((i = e[0]) !== null && i !== undefined && i.length) {
    o = 0;
    a = e.length;
    for (; o < a; ++o) {
      t(e[o], n, r);
    }
  } else {
    t(e, n, r);
  }
  return r;
}
function R(e, t, n) {
  var i = 0;
  var o = n.length;
  var a = o;
  var r = (e || []).length;
  if (r) {
    if (e[0].x !== undefined) {
      while (i < r) {
        n[a++] = ["L", e[i].x, e[i++].y];
      }
    } else {
      while (i < r) {
        n[a++] = ["L", e[i++], e[i++]];
      }
    }
    n[o][0] = "M";
  } else {
    n[a] = ["M", 0, 0];
  }
  if (t) {
    n.push(["Z"]);
  }
  return n;
}
function B(e, t, n) {
  var i;
  var o = n.length;
  var a = (e || []).length;
  if (a) {
    if (e[0].x !== undefined) {
      n[o++] = ["M", e[0].x, e[0].y];
      i = 1;
      while (i < a) {
        n[o++] = ["C", e[i].x, e[i++].y, e[i].x, e[i++].y, e[i].x, e[i++].y];
      }
    } else {
      n[o++] = ["M", e[0], e[1]];
      i = 2;
      while (i < a) {
        n[o++] = ["C", e[i++], e[i++], e[i++], e[i++], e[i++], e[i++]];
      }
    }
  } else {
    n[o] = ["M", 0, 0];
  }
  if (t) {
    n.push(["Z"]);
  }
  return n;
}
function L(e, t) {
  var n = e[e.length - 2];
  var i = e[e.length - 1];
  switch (t) {
    case "line":
    case "area":
      e[0] = "L";
      break;
    case "bezier":
    case "bezierarea":
      e[0] = "C";
      e[1] = e[3] = e[5] = n;
      e[2] = e[4] = e[6] = i;
  }
}
function V(e, t, n) {
  var i = e[e.length - 1].slice();
  var o = e.length;
  for (L(i, n); o < t.length; o++) {
    e[o] = i.slice(0);
  }
}
function F(e, t, n) {
  var i;
  var o;
  var a;
  var r;
  var s = e.length;
  var l = t.length;
  if ((s - 1) % 2 == 0 && (l - 1) % 2 == 0) {
    i = (s - 1) / 2 - 1;
    a = (o = e.slice(0, i + 1))[o.length - 1].slice(0);
    r = e.slice(i + 1)[0].slice(0);
    L(a, n);
    L(r, n);
    for (var u = i; u < (l - 1) / 2 - 1; u++) {
      e.splice(u + 1, 0, a);
      e.splice(u + 3, 0, r);
    }
  }
}
function H(e, t) {
  var n;
  var i;
  var o = e._styles;
  for (n in t = t || {}) {
    i = t[n];
    if ((0, c.isDefined)(i)) {
      i += typeof i != "number" || v[n] ? "" : "px";
      o[n] = i !== "" ? i : null;
    }
  }
  for (n in o) {
    if (i = o[n]) {
      e.element.style[n] = i;
    } else if (i === null) {
      e.element.style[n] = "";
    }
  }
  return e;
}
function N(e, t) {
  var n = e.element;
  var i = e.attr(t);
  if (i && i.indexOf("MSI") !== -1) {
    n.removeAttribute(t);
    n.setAttribute(t, k(i, e.renderer.pathModified));
  }
}
function z(e, t) {
  t = t || {};
  var n;
  var i;
  var o;
  var a;
  var r;
  var s;
  var l = e._settings;
  var u = {};
  var c = e.element;
  var h = e.renderer;
  var f = h.rtl;
  if (!C(t)) {
    if (t in l) {
      return l[t];
    } else if (t in x) {
      return x[t];
    } else {
      return 0;
    }
  }
  D(u, t);
  for (n in u) {
    if ((i = u[n]) !== undefined) {
      l[n] = i;
      if (n === "align") {
        n = "text-anchor";
        i = {
          left: f ? "end" : "start",
          center: "middle",
          right: f ? "start" : "end"
        }[i] || null;
      } else {
        if (n === "dashStyle") {
          a = true;
          continue;
        }
        if (n === "stroke-width") {
          a = true;
        } else if (!i || n !== "fill" && n !== "clip-path" && n !== "filter" || i.indexOf("MSI") !== 0) {
          if (/^(translate(X|Y)|rotate[XY]?|scale(X|Y)|sharp|sharpDirection)$/i.test(n)) {
            o = true;
            continue;
          }
          if (/^(x|y|d)$/i.test(n)) {
            o = true;
          }
        } else {
          e._addFixIRICallback();
          i = k(i, h.pathModified);
        }
      }
      if (i === null) {
        c.removeAttribute(n);
      } else {
        c.setAttribute(n, i);
      }
    }
  }
  if (a && "dashStyle" in l) {
    i = l.dashStyle;
    r = ("_originalSW" in e ? e._originalSW : l["stroke-width"]) || 1;
    n = "stroke-dasharray";
    if ((i = i === null ? "" : (0, d.normalizeEnum)(i)) === "" || i === "solid" || i === y) {
      e.element.removeAttribute(n);
    } else {
      for (s = (i = i.replace(/longdash/g, "8,3,").replace(/dash/g, "4,3,").replace(/dot/g, "1,3,").replace(/,$/, "").split(",")).length; s--;) {
        i[s] = parseInt(i[s]) * r;
      }
      e.element.setAttribute(n, i.join(","));
    }
  }
  if (o) {
    e._applyTransformation();
  }
  return e;
}
function j(e, t, n) {
  var i;
  var a;
  var r;
  i = 0;
  a = e.length;
  for (; i < a; ++i) {
    (r = e[i])[n] = S("tspan");
    r[n].appendChild(o.default.createTextNode(r.value));
    if (r.style) {
      H({
        element: r[n],
        _styles: {}
      }, r.style);
    }
    if (r.className) {
      r[n].setAttribute("class", r.className);
    }
    t.appendChild(r[n]);
  }
}
function W() {
  if (this._hasEllipsis) {
    this.attr({
      text: this._settings.text
    });
  }
}
function G(e) {
  var t;
  if (e) {
    (t = e.cloneNode()).removeAttribute("y");
    t.removeAttribute("x");
  }
  return t || e;
}
function q(e) {
  for (var t = o.default.querySelectorAll(e, "title"), n = 0; n < t.length; n++) {
    e.removeChild(t[n]);
  }
  return t;
}
function $(e) {
  var t = q(e);
  return function () {
    for (var n = 0; n < t.length; n++) {
      e.appendChild(t[n]);
    }
  };
}
function U(e, t, n, i) {
  var o;
  var a;
  if (n <= t && i > t) {
    o = 1;
    a = e.value.length;
    for (; o <= a; ++o) {
      if (n + e.tspan.getSubStringLength(0, o) > t) {
        return o - 1;
      }
    }
  }
}
function K(e) {
  if (e.value.length) {
    return e.tspan.getSubStringLength(0, e.value.length);
  } else {
    return 0;
  }
}
function Z(e, t) {
  if (t.hideOverflowEllipsis && e === 0) {
    return "";
  } else {
    return "...";
  }
}
function Y(e, t, n) {
  var i = Z(t, n);
  if (e.value.length && e.tspan.parentNode) {
    for (var o = e.value.length - 1; o >= 1; o--) {
      if (e.startBox + e.tspan.getSubStringLength(0, o) < t) {
        J(e, o, i);
        break;
      }
      if (o === 1) {
        J(e, 0, i);
      }
    }
  }
}
function X(e, t, n, i, o) {
  var a = n.textOverflow;
  if (!isFinite(i) || Number(i) === 0 || a === "none") {
    return e;
  }
  var r = e.reduce(function (e, r, s, l) {
    var u = f(e, 2);
    var d = u[0];
    var c = u[1];
    if ((c += function (e, t) {
      return e.parts.reduce(function (e, n) {
        return m(e, ne(n, t));
      }, 0);
    }(r, o)) < i) {
      d.push(r);
    } else {
      r.parts.forEach(function (e) {
        ee(e);
      });
      if (a === "ellipsis") {
        var h = l[s - 1];
        if (h) {
          var p = h.parts[h.parts.length - 1];
          if (!p.hasEllipsis) {
            if (t === 0 || p.endBox < t) {
              J(p, p.value.length, Z(t, n));
            } else {
              Y(p, t, n);
            }
          }
        }
      }
    }
    return [d, c];
  }, [[], 0]);
  if (a === "hide" && r[1] > i) {
    r[0].forEach(function (e) {
      e.parts.forEach(function (e) {
        ee(e);
      });
    });
    return [];
  } else {
    return r[0];
  }
}
function Q(e, t, n, i, o) {
  if (!t) {
    var a = {
      value: e.textContent,
      height: 0,
      line: 0
    };
    e.textContent = "";
    j([a], e, "tspan");
    t = [a];
  }
  return t.reduce(function (e, t) {
    var a = f(e, 5);
    var r = a[0];
    var s = a[1];
    var l = a[2];
    var u = a[3];
    var d = a[4];
    var h = r[r.length - 1];
    if (u) {
      return [r, s, l, u];
    }
    if (h && t.line === d) {
      t.startBox = s;
      if (s > i && o.wordWrap === "none" && o.textOverflow === "ellipsis") {
        ee(t);
        return [r, s, l, u, d];
      }
      h.parts.push(t);
      h.commonLength += t.value.length;
    } else {
      t.startBox = s = 0;
      r.push({
        commonLength: t.value.length,
        parts: [t]
      });
    }
    t.endBox = l = s + K(t);
    s = l;
    if ((0, c.isDefined)(n) && l > n) {
      var p = function e(t, n, i, o, a) {
        var r;
        var s = t.value;
        if (o.wordWrap !== "none") {
          r = o.wordWrap === "normal" ? function (e, t) {
            var n = e.startBox > 0 ? [0] : [];
            for (var i = e.value.split("").reduce(function (e, t, n) {
                if (t === " ") {
                  e.push(n);
                }
                return e;
              }, n), o = 0; i[o + 1] !== undefined && e.startBox + e.tspan.getSubStringLength(0, i[o + 1]) < t;) {
              o++;
            }
            return i[o];
          }(t, n) : function (e, t) {
            for (var n = 0; n < e.value.length - 1; n++) {
              if (e.startBox + e.tspan.getSubStringLength(0, n + 1) > t) {
                return n;
              }
            }
          }(t, n);
        }
        var l;
        var u = [];
        if (isFinite(r) && (a !== 0 || r !== 0)) {
          J(t, r, "");
          var d = s[r] === " " ? 1 : 0;
          var c = s.slice(r + d);
          if (c.length) {
            var h = G(t.tspan);
            h.textContent = c;
            t.tspan.parentNode.appendChild(h);
            if ((l = D(D({}, t), {
              value: c,
              startBox: 0,
              height: 0,
              tspan: h,
              stroke: G(t.stroke),
              endBox: h.getSubStringLength(0, c.length)
            })).stroke) {
              l.stroke.textContent = c;
            }
            if (l.endBox > n && !(u = e(l, n, i, o, r)).length) {
              return [];
            }
          }
        }
        if (t.value.length) {
          if (o.textOverflow === "ellipsis" && t.tspan.getSubStringLength(0, t.value.length) > n) {
            Y(t, i, o);
          }
          if (o.textOverflow === "hide" && t.tspan.getSubStringLength(0, t.value.length) > n) {
            return [];
          }
        } else {
          t.tspan.parentNode.removeChild(t.tspan);
        }
        var f = [];
        if (l) {
          f.push(l);
        }
        return [{
          commonLength: s.length,
          parts: f
        }].concat(u);
      }(t, n, i, o);
      if (p.length) {
        r = r.concat(p.filter(function (e) {
          return e.parts.length > 0;
        }));
      } else {
        r = [];
        u = true;
      }
    }
    return [r, s, l, u, t.line];
  }, [[], 0, 0, false, 0])[0];
}
function J(e, t, n = "...") {
  var i = e.value.substr(0, t) + n;
  e.value = e.tspan.textContent = i;
  if (e.stroke) {
    e.stroke.textContent = i;
  }
  if (n === "...") {
    e.hasEllipsis = true;
  }
}
function ee(e) {
  if (e.tspan.parentNode) {
    e.tspan.parentNode.removeChild(e.tspan);
  }
  if (e.stroke && e.stroke.parentNode) {
    e.stroke.parentNode.removeChild(e.stroke);
  }
}
function te(e, t, n) {
  e.tspan.setAttribute(t, n);
  if (e.stroke) {
    e.stroke.setAttribute(t, n);
  }
}
function ne(e, t) {
  if (e.inherits) {
    return oe(e.height, t);
  } else {
    return e.height || t;
  }
}
function ie(e) {
  if (e._texts) {
    var t;
    var n;
    var i = e._texts;
    var o = e._settings.x;
    var a = e._getLineHeight();
    var r = i[0];
    te(r, "x", o);
    te(r, "y", e._settings.y);
    t = 1;
    n = i.length;
    for (; t < n; ++t) {
      r = i[t];
      if (parseFloat(r.height) >= 0) {
        te(r, "x", o);
        te(r, "dy", ne(r, a));
      }
    }
  }
}
function oe(e, t) {
  var n = parseFloat(e);
  var i = parseFloat(t);
  var o = n || 12;
  var a = i || 12;
  if (o > a) {
    if (isNaN(n)) {
      return o;
    } else {
      return e;
    }
  } else if (isNaN(i)) {
    return a;
  } else {
    return t;
  }
}
function ae(e, t, n, i) {
  var o;
  var a;
  n = n || {};
  var r = e.renderer;
  var s = e._settings;
  var l = {};
  var u = {
    translateX: 0,
    translateY: 0,
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0
  };
  if (i) {
    n.complete = i;
  }
  if (r.animationEnabled()) {
    for (o in t) {
      a = t[o];
      if (/^(translate(X|Y)|rotate[XY]?|scale(X|Y))$/i.test(o)) {
        l.transform = l.transform || {
          from: {},
          to: {}
        };
        l.transform.from[o] = o in s ? Number(s[o].toFixed(3)) : u[o];
        l.transform.to[o] = a;
      } else {
        l[o] = o === "arc" || o === "segments" ? a : {
          from: o in s ? s[o] : parseFloat(e.element.getAttribute(o) || 0),
          to: a
        };
      }
    }
    r.animateElement(e, l, D(D({}, r._animation), n));
  } else {
    if (n.step) {
      n.step.call(e, 1, 1);
    }
    if (n.complete) {
      n.complete.call(e);
    }
    e.attr(t);
  }
  return e;
}
function re(e, t) {
  var n = {
    is: false,
    name: t.name || t,
    after: t.after
  };
  if (e) {
    n.to = e;
  } else {
    n.virtual = true;
  }
  return n;
}
function se(e, t, n) {
  this.renderer = e;
  this.element = S(t);
  this._settings = {};
  this._styles = {};
  if (t === "path") {
    this.type = n || "line";
  }
}
function le(e) {
  _e.remove(e);
}
exports.SvgElement = se;
se.prototype = {
  constructor: se,
  _getJQElement: function () {
    return this._$element ||= (0, i.default)(this.element);
  },
  _addFixIRICallback: function () {
    var e = this;
    function t() {
      N(e, "fill");
      N(e, "clip-path");
      N(e, "filter");
    }
    e.element._fixFuncIri = t;
    t.renderer = e.renderer;
    _e.add(t);
    e._addFixIRICallback = function () {};
  },
  _clearChildrenFuncIri: function () {
    (function e(t) {
      var n;
      for (n = 0; n < t.childNodes.length; n++) {
        le(t.childNodes[n]._fixFuncIri);
        e(t.childNodes[n]);
      }
    })(this.element);
  },
  dispose: function () {
    le(this.element._fixFuncIri);
    this._clearChildrenFuncIri();
    this._getJQElement().remove();
    return this;
  },
  append: function (e) {
    (e || this.renderer.root).element.appendChild(this.element);
    return this;
  },
  remove: function () {
    var e = this.element;
    if (e.parentNode) {
      e.parentNode.removeChild(e);
    }
    return this;
  },
  enableLinks: function () {
    this._links = [];
    return this;
  },
  virtualLink: function (e) {
    pe({
      _link: re(null, e)
    }, this);
    return this;
  },
  linkAfter: function (e) {
    this._linkAfter = e;
    return this;
  },
  linkOn: function (e, t) {
    this._link = re(e, t);
    pe(this, e);
    return this;
  },
  linkOff: function () {
    (function (e) {
      var t;
      var n = e._link.to._links;
      for (t = 0; n[t] !== e; ++t);
      n.splice(t, 1);
      fe(n, t);
    })(this);
    this._link = null;
    return this;
  },
  linkAppend: function () {
    var e;
    var t;
    var n = this._link;
    var i = n.to._links;
    for (e = n.i + 1; (t = i[e]) && !t._link.is; ++e);
    this._insert(n.to, t);
    n.is = true;
    return this;
  },
  _insert: function (e, t) {
    e.element.insertBefore(this.element, t ? t.element : null);
  },
  linkRemove: function () {
    this.remove();
    this._link.is = false;
    return this;
  },
  clear: function () {
    this._clearChildrenFuncIri();
    this._getJQElement().empty();
    return this;
  },
  toBackground: function () {
    var e = this.element;
    var t = e.parentNode;
    if (t) {
      t.insertBefore(e, t.firstChild);
    }
    return this;
  },
  toForeground: function () {
    var e = this.element;
    var t = e.parentNode;
    if (t) {
      t.appendChild(e);
    }
    return this;
  },
  attr: function (e) {
    return z(this, e);
  },
  smartAttr: function (e) {
    return this.attr(T(this, e));
  },
  css: function (e) {
    return H(this, e);
  },
  animate: function (e, t, n) {
    return ae(this, e, t, n);
  },
  sharp: function (e, t) {
    return this.attr({
      sharp: e || true,
      sharpDirection: t
    });
  },
  _applyTransformation: function () {
    var e;
    var t;
    var n = this._settings;
    var i = [];
    var o = n.sharp;
    var a = n.sharpDirection || 1;
    var r = n["stroke-width"] % 2;
    var s = !r || o !== "h" && o !== true ? 0 : a * 0.5;
    var l = !r || o !== "v" && o !== true ? 0 : a * 0.5;
    i.push("translate(" + ((n.translateX || 0) + s) + "," + ((n.translateY || 0) + l) + ")");
    if (n.rotate) {
      e = "rotateX" in n ? n.rotateX : n.x;
      t = "rotateY" in n ? n.rotateY : n.y;
      i.push("rotate(" + n.rotate + "," + (e || 0) + "," + (t || 0) + ")");
    }
    var u = (0, c.isDefined)(n.scaleX);
    var d = (0, c.isDefined)(n.scaleY);
    if (u || d) {
      i.push("scale(" + (u ? n.scaleX : 1) + "," + (d ? n.scaleY : 1) + ")");
    }
    if (i.length) {
      this.element.setAttribute("transform", i.join(" "));
    }
  },
  move: function (e, t, n, i) {
    var o = {};
    if ((0, c.isDefined)(e)) {
      o.translateX = e;
    }
    if ((0, c.isDefined)(t)) {
      o.translateY = t;
    }
    if (n) {
      this.animate(o, i);
    } else {
      this.attr(o);
    }
    return this;
  },
  rotate: function (e, t, n, i, o) {
    var a = {
      rotate: e || 0
    };
    if ((0, c.isDefined)(t)) {
      a.rotateX = t;
    }
    if ((0, c.isDefined)(n)) {
      a.rotateY = n;
    }
    if (i) {
      this.animate(a, o);
    } else {
      this.attr(a);
    }
    return this;
  },
  _getElementBBox: function () {
    var e;
    var t = this.element;
    try {
      e = t.getBBox && t.getBBox();
    } catch (e) {}
    return e || {
      x: 0,
      y: 0,
      width: t.offsetWidth || 0,
      height: t.offsetHeight || 0
    };
  },
  getBBox: function () {
    var e = this._settings;
    var t = this._getElementBBox();
    return t = e.rotate ? (0, d.rotateBBox)(t, [("rotateX" in e ? e.rotateX : e.x) || 0, ("rotateY" in e ? e.rotateY : e.y) || 0], -e.rotate) : (0, d.normalizeBBox)(t);
  },
  markup: function () {
    return (0, l.getSvgMarkup)(this.element);
  },
  getOffset: function () {
    return this._getJQElement().offset();
  },
  stopAnimation: function (e) {
    var t = this.animation;
    if (t) {
      t.stop(e);
    }
    return this;
  },
  setTitle: function (e) {
    var t = S("title");
    t.textContent = e || "";
    this.element.appendChild(t);
  },
  removeTitle: function () {
    q(this.element);
  },
  data: function (e, t) {
    var n;
    var i = this.element;
    if (t !== undefined) {
      i[e] = t;
    } else {
      for (n in e) {
        i[n] = e[n];
      }
    }
    return this;
  },
  on: function () {
    var e = [this._getJQElement()];
    e.push.apply(e, arguments);
    s.default.on.apply(s.default, e);
    return this;
  },
  off: function () {
    var e = [this._getJQElement()];
    e.push.apply(e, arguments);
    s.default.off.apply(s.default, e);
    return this;
  },
  trigger: function () {
    var e = [this._getJQElement()];
    e.push.apply(e, arguments);
    s.default.trigger.apply(s.default, e);
    return this;
  }
};
function ue(e, t) {
  se.call(this, e, "path", t);
}
exports.PathSvgElement = ue;
D(ue.prototype = b(se.prototype), {
  constructor: ue,
  attr: function (e) {
    var t;
    if (C(e)) {
      t = (e = D({}, e)).segments;
      if ("points" in e) {
        t = O(e.points, this.type);
        delete e.points;
      }
      if (t) {
        e.d = function (e) {
          var t;
          var n;
          var i;
          var o;
          var a = [];
          var r = 0;
          var s = e.length;
          for (t = 0; t < s; ++t) {
            i = 0;
            o = (n = e[t]).length;
            for (; i < o; ++i) {
              a[r++] = n[i];
            }
          }
          return a.join(" ");
        }(t);
        this.segments = t;
        delete e.segments;
      }
    }
    return z(this, e);
  },
  animate: function (e, t, n) {
    var i;
    var o;
    var a = this.segments || [];
    if (this.renderer.animationEnabled() && "points" in e) {
      o = function (e, t, n) {
        var i;
        var o;
        var a = e.length;
        var r = t.length;
        var s = n.indexOf("area") !== -1 ? F : V;
        if (a === 0) {
          for (i = 0; i < r; i++) {
            e.push(t[i].slice(0));
          }
        } else if (a < r) {
          s(e, t, n);
        } else if (a > r) {
          o = t.slice(0);
          s(t, e, n);
        }
        return o;
      }(a, i = O(e.points, this.type), this.type);
      e.segments = {
        from: a,
        to: i,
        end: o
      };
      delete e.points;
    }
    return ae(this, e, t, n);
  }
});
function de(e) {
  se.call(this, e, "path", "arc");
}
exports.ArcSvgElement = de;
D(de.prototype = b(se.prototype), {
  constructor: de,
  attr: function (e) {
    var t;
    var n;
    var i;
    var o;
    var a;
    var r;
    var s = this._settings;
    if (C(e) && ("x" in (e = D({}, e)) || "y" in e || "innerRadius" in e || "outerRadius" in e || "startAngle" in e || "endAngle" in e)) {
      s.x = t = "x" in e ? e.x : s.x;
      delete e.x;
      s.y = n = "y" in e ? e.y : s.y;
      delete e.y;
      s.innerRadius = i = "innerRadius" in e ? e.innerRadius : s.innerRadius;
      delete e.innerRadius;
      s.outerRadius = o = "outerRadius" in e ? e.outerRadius : s.outerRadius;
      delete e.outerRadius;
      s.startAngle = a = "startAngle" in e ? e.startAngle : s.startAngle;
      delete e.startAngle;
      s.endAngle = r = "endAngle" in e ? e.endAngle : s.endAngle;
      delete e.endAngle;
      e.d = E.apply(null, (0, d.normalizeArcParams)(t, n, i, o, a, r));
    }
    return z(this, e);
  },
  animate: function (e, t, n) {
    var i = this._settings;
    var o = {
      from: {},
      to: {}
    };
    if (this.renderer.animationEnabled() && ("x" in e || "y" in e || "innerRadius" in e || "outerRadius" in e || "startAngle" in e || "endAngle" in e)) {
      o.from.x = i.x || 0;
      o.from.y = i.y || 0;
      o.from.innerRadius = i.innerRadius || 0;
      o.from.outerRadius = i.outerRadius || 0;
      o.from.startAngle = i.startAngle || 0;
      o.from.endAngle = i.endAngle || 0;
      o.to.x = "x" in e ? e.x : i.x;
      delete e.x;
      o.to.y = "y" in e ? e.y : i.y;
      delete e.y;
      o.to.innerRadius = "innerRadius" in e ? e.innerRadius : i.innerRadius;
      delete e.innerRadius;
      o.to.outerRadius = "outerRadius" in e ? e.outerRadius : i.outerRadius;
      delete e.outerRadius;
      o.to.startAngle = "startAngle" in e ? e.startAngle : i.startAngle;
      delete e.startAngle;
      o.to.endAngle = "endAngle" in e ? e.endAngle : i.endAngle;
      delete e.endAngle;
      e.arc = o;
    }
    return ae(this, e, t, n);
  }
});
function ce(e) {
  se.call(this, e, "rect");
}
exports.RectSvgElement = ce;
D(ce.prototype = b(se.prototype), {
  constructor: ce,
  attr: function (e) {
    var t;
    var n;
    var i;
    var o;
    var a;
    var r;
    var s;
    if (C(e)) {
      if ((e = D({}, e)).x !== undefined || e.y !== undefined || e.width !== undefined || e.height !== undefined || e["stroke-width"] !== undefined) {
        t = e.x !== undefined ? this._originalX = e.x : this._originalX || 0;
        n = e.y !== undefined ? this._originalY = e.y : this._originalY || 0;
        i = e.width !== undefined ? this._originalWidth = e.width : this._originalWidth || 0;
        o = e.height !== undefined ? this._originalHeight = e.height : this._originalHeight || 0;
        s = ((a = e["stroke-width"] !== undefined ? this._originalSW = e["stroke-width"] : this._originalSW) || 0) < (r = ~~((i < o ? i : o) / 2)) ? a || 0 : r;
        e.x = t + s / 2;
        e.y = n + s / 2;
        e.width = i - s;
        e.height = o - s;
        if ((a || 0) !== s || s !== 0 || a !== undefined) {
          e["stroke-width"] = s;
        }
      }
      if ("sharp" in e) {
        delete e.sharp;
      }
    }
    return z(this, e);
  }
});
function he(e) {
  se.call(this, e, "text");
  this.css({
    "white-space": "pre"
  });
}
function fe(e, t) {
  var n;
  var i;
  for (n = t; i = e[n]; ++n) {
    i._link.i = n;
  }
}
function pe(e, t) {
  var n;
  var i;
  var o = t._links;
  var a = e._link.after = e._link.after || t._linkAfter;
  if (a) {
    for (n = 0; (i = o[n]) && i._link.name !== a; ++n);
    if (i) {
      for (++n; (i = o[n]) && i._link.after === a; ++n);
    }
  } else {
    n = o.length;
  }
  o.splice(n, 0, e);
  fe(o, n);
}
function ge(e) {
  this.root = this._createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    fill: y,
    stroke: y,
    "stroke-width": 0
  }).attr({
    class: e.cssClass
  }).css({
    "line-height": "normal",
    "-ms-user-select": y,
    "-moz-user-select": y,
    "-webkit-user-select": y,
    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
    display: "block",
    overflow: "hidden"
  });
  this._init();
  this.pathModified = !!e.pathModified;
  this._$container = (0, i.default)(e.container);
  this.root.append({
    element: e.container
  });
  this._locker = 0;
  this._backed = false;
}
exports.TextSvgElement = he;
D(he.prototype = b(se.prototype), {
  constructor: he,
  attr: function (e) {
    var t;
    if (!C(e)) {
      return z(this, e);
    }
    e = D({}, e);
    var n = this._settings;
    var i = (0, c.isDefined)(n.stroke) && (0, c.isDefined)(n["stroke-width"]);
    if (e.text !== undefined) {
      n.text = e.text;
      delete e.text;
      t = true;
    }
    if (e.stroke !== undefined) {
      n.stroke = e.stroke;
      delete e.stroke;
    }
    if (e["stroke-width"] !== undefined) {
      n["stroke-width"] = e["stroke-width"];
      delete e["stroke-width"];
    }
    if (e["stroke-opacity"] !== undefined) {
      n["stroke-opacity"] = e["stroke-opacity"];
      delete e["stroke-opacity"];
    }
    if (e.textsAlignment !== undefined) {
      (function (e, t) {
        if (!e._texts || t === "center") {
          return;
        }
        for (var n = e._texts, i = t === "left" ? -1 : 1, o = Math.max.apply(Math, n.map(function (e) {
            return K(e);
          })), a = 0; a < n.length; a++) {
          var r = n[a];
          var s = K(r);
          if (o !== 0 && o !== s) {
            te(r, "dx", i * _((o - s) / 2 * 10) / 10);
          }
        }
      })(this, e.textsAlignment);
      delete e.textsAlignment;
    }
    var a = (0, c.isDefined)(n.stroke) && (0, c.isDefined)(n["stroke-width"]);
    z(this, e);
    if (t = t || a !== i && n.text) {
      (function (e, t, n) {
        var i;
        var a;
        e._texts = null;
        e.clear();
        if (t === null) {
          return;
        }
        t = "" + t;
        if (e.renderer.encodeHtml || !/<[a-z][\s\S]*>/i.test(t) && t.indexOf("&") === -1) {
          if (/\n/g.test(t)) {
            i = function (e) {
              for (var t = e.replace(/\r/g, "").split(/\n/g), n = 0, i = []; n < t.length; n++) {
                i.push({
                  value: t[n].trim(),
                  height: 0,
                  line: n
                });
              }
              return i;
            }(t);
          } else if (n) {
            i = [{
              value: t.trim(),
              height: 0
            }];
          }
        } else {
          r = /(style|class)\s*=\s*(["'])(?:(?!\2).)*\2\s?/gi;
          a = t.replace(/(?:(<[a-z0-9]+\s*))([\s\S]*?)(>|\/>)/gi, function (e, t, n, i) {
            return t + (n = (n && n.match(r) || []).map(function (e) {
              return e;
            }).join(" ")) + i;
          });
          i = function (e) {
            var t = [];
            var n = o.default.createElement("div");
            n.innerHTML = e.replace(/\r/g, "").replace(/\n/g, "<br/>").replace(/style=/g, "data-style=");
            n.querySelectorAll("[data-style]").forEach(function (e) {
              e.style = e.getAttribute("data-style");
              e.removeAttribute("data-style");
            });
            (function e(t, n, i, a, r) {
              var s;
              var l;
              var u;
              var d;
              var c;
              if (i.wholeText !== undefined) {
                t.push({
                  value: i.wholeText,
                  style: a,
                  className: r,
                  line: n,
                  height: a["font-size"] || 0
                });
              } else if (i.tagName === "BR") {
                ++n;
              } else if (o.default.isElementNode(i)) {
                D(s = {}, a);
                switch (i.tagName) {
                  case "B":
                  case "STRONG":
                    s["font-weight"] = "bold";
                    break;
                  case "I":
                  case "EM":
                    s["font-style"] = "italic";
                    break;
                  case "U":
                    s["text-decoration"] = "underline";
                }
                if ((l = i.style).color) {
                  s.fill = l.color;
                }
                if (l.fontSize) {
                  s["font-size"] = l.fontSize;
                }
                if (l.fontStyle) {
                  s["font-style"] = l.fontStyle;
                }
                if (l.fontWeight) {
                  s["font-weight"] = l.fontWeight;
                }
                if (l.textDecoration) {
                  s["text-decoration"] = l.textDecoration;
                }
                u = 0;
                c = i.childNodes;
                d = c.length;
                for (; u < d; ++u) {
                  n = e(t, n, c[u], s, i.className || r);
                }
              }
              return n;
            })(t, 0, n, {}, "");
            (function (e) {
              var t;
              var n;
              var i;
              var o = e[0];
              t = 1;
              n = e.length;
              for (; t < n; ++t) {
                if ((i = e[t]).line === o.line) {
                  o.height = oe(o.height, i.height);
                  o.inherits = o.inherits || parseFloat(i.height) === 0;
                  i.height = NaN;
                } else {
                  o = i;
                }
              }
            })(t);
            return t;
          }(a);
        }
        var r;
        if (i) {
          if (i.length) {
            e._texts = i;
            if (n) {
              j(i, e.element, "stroke");
            }
            j(i, e.element, "tspan");
          }
        } else {
          e.element.appendChild(o.default.createTextNode(t));
        }
      })(this, n.text, a);
      this._hasEllipsis = false;
    }
    if (t || e.x !== undefined || e.y !== undefined) {
      ie(this);
    }
    if (a) {
      (function (e) {
        if (!e._texts) {
          return;
        }
        var t;
        var n;
        var i;
        var o = e._texts;
        var a = e._settings.stroke;
        var r = e._settings["stroke-width"];
        var s = e._settings["stroke-opacity"] || 1;
        n = 0;
        i = o.length;
        for (; n < i; ++n) {
          (t = o[n].stroke).setAttribute("stroke", a);
          t.setAttribute("stroke-width", r);
          t.setAttribute("stroke-opacity", s);
          t.setAttribute("stroke-linejoin", "round");
        }
      })(this);
    }
    return this;
  },
  css: function (e) {
    H(this, e = e || {});
    if ("font-size" in e) {
      ie(this);
    }
    return this;
  },
  applyEllipsis: function (e) {
    var t;
    var n;
    var i;
    var o;
    var a;
    var r;
    var s;
    var l = false;
    W.call(this);
    var u = this.renderer.text("...").attr(this._styles).append(this.renderer.root);
    var d = u.getBBox().width;
    if (this._getElementBBox().width > e) {
      if (e - d < 0) {
        e = 0;
      } else {
        e -= d;
      }
      t = function (e, t, n) {
        var i;
        var o;
        var a;
        var r;
        var s;
        var l = [];
        if (t) {
          i = 0;
          o = t.length;
          for (; i < o; ++i) {
            a = t[i];
            if (l[a.line]) {
              a.startBox = r;
              l[a.line].parts.push(a);
              l[a.line].commonLength += a.value.length;
            } else {
              a.startBox = r = 0;
              l.push({
                commonLength: a.value.length,
                parts: [a]
              });
            }
            s = r + a.tspan.getSubStringLength(0, a.value.length);
            a.endIndex = U(a, n, r, s);
            r = s;
          }
        } else {
          (a = {
            value: e.textContent,
            tspan: e
          }).startBox = r = 0;
          s = r + K(a);
          a.endIndex = U(a, n, r, s);
          l = [{
            commonLength: e.textContent.length,
            parts: [a]
          }];
        }
        return l;
      }(this.element, this._texts, e);
      n = 0;
      i = t.length;
      for (; n < i; ++n) {
        o = t[n].parts;
        if (t[n].commonLength !== 1) {
          a = 0;
          r = o.length;
          for (; a < r; ++a) {
            s = o[a];
            if ((0, c.isDefined)(s.endIndex)) {
              J(s, s.endIndex);
              l = true;
            } else if (s.startBox > e) {
              ee(s);
            }
          }
        }
      }
    }
    u.remove();
    this._hasEllipsis = l;
    return l;
  },
  setMaxSize: function (e, t, n = {}) {
    var i = this;
    var o = [];
    var a = false;
    var r = false;
    var s = e;
    W.call(i);
    var l = $(this.element);
    var u = i.renderer.text("...").attr(i._styles).append(i.renderer.root);
    var d = u.getBBox().width;
    var c = i._getElementBBox();
    var h = c.width;
    var f = c.height;
    if ((h || f) && (h > e || t && f > t)) {
      if (e - d < 0) {
        s = 0;
      } else {
        s -= d;
      }
      o = X(o = Q(i.element, i._texts, e, s, n), s, n, t, parseFloat(this._getLineHeight()));
      this._texts = o.reduce(function (e, t) {
        return e.concat(t.parts);
      }, []).filter(function (e) {
        return e.value !== "";
      }).map(function (e) {
        if (e.stroke) {
          e.tspan.parentNode.appendChild(e.stroke);
        }
        return e;
      }).map(function (e) {
        e.tspan.parentNode.appendChild(e.tspan);
        return e;
      });
      if (!this._texts.length) {
        this._texts = null;
      }
      a = true;
      if (this._texts) {
        ie(this);
      } else {
        this.element.textContent = "";
        r = true;
      }
    }
    u.remove();
    i._hasEllipsis = a;
    l();
    return {
      rowCount: o.length,
      textChanged: a,
      textIsEmpty: r
    };
  },
  restoreText: W,
  _getLineHeight: function () {
    if (isNaN(parseFloat(this._styles["font-size"]))) {
      return 12;
    } else {
      return this._styles["font-size"];
    }
  }
});
ge.prototype = {
  constructor: ge,
  _init: function () {
    this._defs = this._createElement("defs").append(this.root);
    this._animationController = new u.AnimationController(this.root.element);
    this._animation = {
      enabled: true,
      duration: 1000,
      easing: "easeOutCubic"
    };
  },
  setOptions: function (e) {
    this.rtl = !!e.rtl;
    this.encodeHtml = !!e.encodeHtml;
    this.updateAnimationOptions(e.animation || {});
    this.root.attr({
      direction: this.rtl ? "rtl" : "ltr"
    });
    return this;
  },
  _createElement: function (e, t, n) {
    var i = new se(this, e, n);
    if (t) {
      i.attr(t);
    }
    return i;
  },
  lock: function () {
    var e;
    if (this._locker === 0) {
      this._backed = !this._$container.is(":visible");
      if (this._backed) {
        e = this.root;
        if (w().backupCounter === 0) {
          o.default.getBody().appendChild(w().backupContainer);
        }
        ++w().backupCounter;
        e.append({
          element: w().backupContainer
        });
      }
    }
    ++this._locker;
    return this;
  },
  unlock: function () {
    var e;
    var t;
    --this._locker;
    if (this._locker === 0) {
      if (this._backed) {
        e = this.root;
        t = this._$container[0];
        e.append({
          element: t
        });
        --w().backupCounter;
        if (w().backupCounter === 0) {
          o.default.getBody().removeChild(w().backupContainer);
        }
      }
      this._backed = false;
    }
    return this;
  },
  resize: function (e, t) {
    if (e >= 0 && t >= 0) {
      this.root.attr({
        width: e,
        height: t
      });
    }
    return this;
  },
  dispose: function () {
    var e;
    this.root.dispose();
    this._defs.dispose();
    this._animationController.dispose();
    _e.removeByRenderer(this);
    for (e in this) {
      this[e] = null;
    }
    return this;
  },
  animationEnabled: function () {
    return !!this._animation.enabled;
  },
  updateAnimationOptions: function (e) {
    D(this._animation, e);
    return this;
  },
  stopAllAnimations: function (e) {
    this._animationController[e ? "lock" : "stop"]();
    return this;
  },
  animateElement: function (e, t, n) {
    this._animationController.animateElement(e, t, n);
    return this;
  },
  svg: function () {
    return this.root.markup();
  },
  getRootOffset: function () {
    return this.root.getOffset();
  },
  onEndAnimation: function (e) {
    this._animationController.onEndAnimation(e);
  },
  rect: function (e, t, n, i) {
    return new ce(this).attr({
      x: e || 0,
      y: t || 0,
      width: n || 0,
      height: i || 0
    });
  },
  simpleRect: function () {
    return this._createElement("rect");
  },
  circle: function (e, t, n) {
    return this._createElement("circle", {
      cx: e || 0,
      cy: t || 0,
      r: n || 0
    });
  },
  g: function () {
    return this._createElement("g");
  },
  image: function (e, t, n, i, o, a) {
    var r = this._createElement("image", {
      x: e || 0,
      y: t || 0,
      width: n || 0,
      height: i || 0,
      preserveAspectRatio: I[(0, d.normalizeEnum)(a)] || y
    });
    r.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", o || "");
    return r;
  },
  path: function (e, t) {
    return new ue(this, t).attr({
      points: e || []
    });
  },
  arc: function (e, t, n, i, o, a) {
    return new de(this).attr({
      x: e || 0,
      y: t || 0,
      innerRadius: n || 0,
      outerRadius: i || 0,
      startAngle: o || 0,
      endAngle: a || 0
    });
  },
  text: function (e, t, n) {
    return new he(this).attr({
      text: e,
      x: t || 0,
      y: n || 0
    });
  },
  linearGradient: function (e, t = (0, d.getNextDefsSvgId)(), n) {
    var i = this._createElement("linearGradient", {
      id: t,
      gradientTransform: `rotate(${n || 0})`
    }).append(this._defs);
    i.id = t;
    this._createGradientStops(e, i);
    return i;
  },
  radialGradient: function (e, t) {
    var n = this._createElement("radialGradient", {
      id: t
    }).append(this._defs);
    this._createGradientStops(e, n);
    return n;
  },
  _createGradientStops: function (e, t) {
    var n = this;
    e.forEach(function (e) {
      n._createElement("stop", {
        offset: e.offset,
        "stop-color": e["stop-color"] ?? e.color,
        "stop-opacity": e.opacity
      }).append(t);
    });
  },
  pattern: function (e, t, n) {
    var i = (t = t || {}).step || 6;
    var o = i / 2;
    var a = i * 1.5;
    var r = n || (0, d.getNextDefsSvgId)();
    var s = (0, d.normalizeEnum)(t.direction) === "right" ? "M " + o + " " + -o + " L " + -o + " " + o + " M 0 " + i + " L " + i + " 0 M " + a + " " + o + " L " + o + " " + a : "M 0 0 L " + i + " " + i + " M " + -o + " " + o + " L " + o + " " + a + " M " + o + " " + -o + " L " + a + " " + o;
    var l = this._createElement("pattern", {
      id: r,
      width: i,
      height: i,
      patternUnits: "userSpaceOnUse"
    }).append(this._defs);
    l.id = r;
    this.rect(0, 0, i, i).attr({
      fill: e,
      opacity: t.opacity
    }).append(l);
    new ue(this).attr({
      d: s,
      "stroke-width": t.width || 1,
      stroke: e
    }).append(l);
    return l;
  },
  customPattern: function (e, t, n, i) {
    var o = {
      id: e,
      width: n,
      height: i,
      patternContentUnits: "userSpaceOnUse",
      patternUnits: this._getPatternUnits(n, i)
    };
    var a = this._createElement("pattern", o).append(this._defs);
    t.render({
      container: a.element
    });
    return a;
  },
  _getPatternUnits: function (e, t) {
    if (Number(e) && Number(t)) {
      return "userSpaceOnUse";
    }
  },
  _getPointsWithYOffset: function (e, t) {
    return e.map(function (e, n) {
      if (n % 2 != 0) {
        return e + t;
      } else {
        return e;
      }
    });
  },
  clipShape: function (e, t) {
    var n = (0, d.getNextDefsSvgId)();
    var i = this._createElement("clipPath", {
      id: n
    }).append(this._defs);
    var o = e.apply(this, t).append(i);
    o.id = n;
    o.remove = function () {
      throw "Not implemented";
    };
    o.dispose = function () {
      i.dispose();
      i = null;
      return this;
    };
    return o;
  },
  clipRect: function (e, t, n, i) {
    return this.clipShape(this.rect, arguments);
  },
  clipCircle: function (e, t, n) {
    return this.clipShape(this.circle, arguments);
  },
  shadowFilter: function (e, t, n, i, o, a, r, s, l) {
    var u = (0, d.getNextDefsSvgId)();
    var c = this._createElement("filter", {
      id: u,
      x: e || 0,
      y: t || 0,
      width: n || 0,
      height: i || 0
    }).append(this._defs);
    var h = this._createElement("feGaussianBlur", {
      in: "SourceGraphic",
      result: "gaussianBlurResult",
      stdDeviation: r || 0
    }).append(c);
    var f = this._createElement("feOffset", {
      in: "gaussianBlurResult",
      result: "offsetResult",
      dx: o || 0,
      dy: a || 0
    }).append(c);
    var p = this._createElement("feFlood", {
      result: "floodResult",
      "flood-color": s || "",
      "flood-opacity": l
    }).append(c);
    var g = this._createElement("feComposite", {
      in: "floodResult",
      in2: "offsetResult",
      operator: "in",
      result: "compositeResult"
    }).append(c);
    var m = this._createElement("feComposite", {
      in: "SourceGraphic",
      in2: "compositeResult",
      operator: "over"
    }).append(c);
    c.id = u;
    c.gaussianBlur = h;
    c.offset = f;
    c.flood = p;
    c.composite = g;
    c.finalComposite = m;
    c.attr = function (e) {
      var t = {};
      var n = {};
      var i = {};
      if ("x" in e) {
        t.x = e.x;
      }
      if ("y" in e) {
        t.y = e.y;
      }
      if ("width" in e) {
        t.width = e.width;
      }
      if ("height" in e) {
        t.height = e.height;
      }
      z(this, t);
      if ("blur" in e) {
        this.gaussianBlur.attr({
          stdDeviation: e.blur
        });
      }
      if ("offsetX" in e) {
        n.dx = e.offsetX;
      }
      if ("offsetY" in e) {
        n.dy = e.offsetY;
      }
      this.offset.attr(n);
      if ("color" in e) {
        i["flood-color"] = e.color;
      }
      if ("opacity" in e) {
        i["flood-opacity"] = e.opacity;
      }
      this.flood.attr(i);
      return this;
    };
    return c;
  },
  brightFilter: function (e, t) {
    var n = (0, d.getNextDefsSvgId)();
    var i = this._createElement("filter", {
      id: n
    }).append(this._defs);
    var o = this._createElement("feComponentTransfer").append(i);
    var a = {
      type: e,
      slope: t
    };
    i.id = n;
    this._createElement("feFuncR", a).append(o);
    this._createElement("feFuncG", a).append(o);
    this._createElement("feFuncB", a).append(o);
    return i;
  },
  getGrayScaleFilter: function () {
    if (this._grayScaleFilter) {
      return this._grayScaleFilter;
    }
    var e = (0, d.getNextDefsSvgId)();
    var t = this._createElement("filter", {
      id: e
    }).append(this._defs);
    this._createElement("feColorMatrix").attr({
      type: "matrix",
      values: "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 0.6 0"
    }).append(t);
    t.id = e;
    this._grayScaleFilter = t;
    return t;
  },
  lightenFilter: function (e) {
    var t = this._createElement("filter", {
      id: e
    }).append(this._defs);
    this._createElement("feColorMatrix", {
      type: "matrix",
      values: `${1.3} 0 0 0 0 0 ${1.3} 0 0 0 0 0 ${1.3} 0 0 0 0 0 1 0`
    }).append(t);
    t.id = e;
    return t;
  },
  initDefsElements: function () {
    var e;
    var t = this._defsElementsStorage = this._defsElementsStorage || {
      byHash: {},
      baseId: (0, d.getNextDefsSvgId)()
    };
    var n = t.byHash;
    for (e in n) {
      n[e].pattern.dispose();
    }
    t.byHash = {};
    t.refToHash = {};
    t.nextId = 0;
  },
  drawPattern: function (e, t, n) {
    var i = e.color;
    var o = e.hatching;
    return this.pattern(i, o, `${t}-hatching-${n++}`);
  },
  drawFilter: function (e, t, n) {
    return this.lightenFilter(`${t}-lightening-${n++}`);
  },
  lockDefsElements: function (e, t, n) {
    var i;
    var o;
    var a;
    var r;
    var s;
    var l = this._defsElementsStorage;
    var u = n === "pattern" ? (a = (o = e).color, r = o.hatching, "@" + a + "::" + r.step + ":" + r.width + ":" + r.opacity + ":" + r.direction) : "@filter::lightening";
    var d = n === "pattern" ? this.drawPattern : this.drawFilter;
    if (l.refToHash[t] !== u) {
      if (t) {
        this.releaseDefsElements(t);
      }
      if (!(i = l.byHash[u])) {
        s = d.call(this, e, l.baseId, l.nextId++);
        i = l.byHash[u] = {
          pattern: s,
          count: 0
        };
        l.refToHash[s.id] = u;
      }
      ++i.count;
      t = i.pattern.id;
    }
    return t;
  },
  releaseDefsElements: function (e) {
    var t = this._defsElementsStorage;
    var n = t.refToHash[e];
    var i = t.byHash[n];
    if (i && --i.count == 0) {
      i.pattern.dispose();
      delete t.byHash[n];
      delete t.refToHash[e];
    }
  }
};
var me;
me = [];
var _e = {
  add: function (e) {
    me.push(e);
  },
  remove: function (e) {
    me = me.filter(function (t) {
      return t !== e;
    });
  },
  removeByRenderer: function (e) {
    me = me.filter(function (t) {
      return t.renderer !== e;
    });
  },
  fire: function () {
    me.forEach(function (e) {
      e();
    });
  }
};
exports.refreshPaths = function () {
  _e.fire();
};