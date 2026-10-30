exports.calcScaledInfo = $;
exports.getData = function (e, t) {
  return q.getData(e, t);
};
exports.imageCreator = undefined;
exports.testFormats = function (e) {
  var t = q._createCanvas(100, 100, 0);
  return e.reduce(function (e, n) {
    var i = ("image/" + n).toLowerCase();
    if (t.toDataURL(i).indexOf(i) !== -1) {
      e.supported.push(n);
    } else {
      e.unsupported.push(n);
    }
    return e;
  }, {
    supported: [],
    unsupported: []
  });
};
var i = p(require("./68374.js"));
var o = p(require("./52752.js"));
var a = require("./35922.js");
var r = require("./19155.js");
var s = require("./95479.js");
var l = require("./13306.js");
var u = p(require("./73349.js"));
var d = require("./3532.js");
var c = require("./58201.js");
var h = require("./78008.js");
var f = require("./62754.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g;
var m = (0, c.getWindow)();
var _ = Math;
var v = _.PI;
var y = _.min;
var b = _.abs;
var x = _.sqrt;
var w = _.pow;
var C = _.atan2;
var S = _.cos;
var k = _.sin;
var D = Number;
function I(e, t, n, i, o, a, r, s) {
  var l = (e + n) / 2;
  var u = (t + i) / 2;
  var d = C(t - i, e - n);
  var c = a ? 1 : -1;
  d += v / 180 * 90 * (r ? 1 : -1);
  var h = x(w(n - e, 2) + w(i - t, 2)) / 2;
  var f = x(b(w(o, 2) - w(h, 2)));
  var p = l + c * (f * S(d));
  var g = u + c * (f * k(d));
  var m = C(t - g, e - p);
  var _ = C(i - g, n - p);
  s.arc(p, g, o, m, _, !r);
}
function T(e, t) {
  var n;
  var i = g(e.attributes || {});
  var o = (0, l.extend)({}, i, {
    text: e.textContent.replace(/\s+/g, " "),
    textAlign: i["text-anchor"] === "middle" ? "center" : i["text-anchor"]
  });
  var r = i.transform;
  if (r) {
    if (n = r.match(/translate\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*)*/)) {
      n = n[0].match(/-*\d+([.]\d+)*/g);
      o.translateX = D(n[0]);
      o.translateY = n[1] ? D(n[1]) : 0;
    }
    if (n = r.match(/rotate\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*,*\s*-*\d+([.]\d+)*)*/)) {
      n = n[0].match(/-*\d+([.]\d+)*/g);
      o.rotationAngle = D(n[0]);
      o.rotationX = n[1] && D(n[1]);
      o.rotationY = n[2] && D(n[2]);
    }
    if (n = r.match(/scale\(-*\d+([.]\d+)*(,*\s*-*\d+([.]\d+)*)*/)) {
      n = n[0].match(/-*\d+([.]\d+)*/g);
      o.scaleX = D(n[0]);
      if (n.length > 1) {
        o.scaleY = D(n[1]);
      } else {
        o.scaleY = o.scaleX;
      }
    }
  }
  (function (e, t, n) {
    var i;
    var o = e.style || {};
    for (i in o) {
      if (o[i] !== "") {
        t[(0, h.camelize)(i)] = o[i];
      }
    }
    if (n && u.default.isElementNode(e)) {
      o = m.getComputedStyle(e);
      ["fill", "stroke", "stroke-width", "font-family", "font-size", "font-style", "font-weight"].forEach(function (e) {
        if (e in o && o[e] !== "") {
          t[(0, h.camelize)(e)] = o[e];
        }
      });
      ["opacity", "fill-opacity", "stroke-opacity"].forEach(function (e) {
        if (e in o && o[e] !== "" && o[e] !== "1") {
          t[e] = D(o[e]);
        }
      });
    }
    t.textDecoration = t.textDecoration || t.textDecorationLine;
    t.globalAlpha = (0, a.isDefined)(t.opacity) ? t.opacity : t.globalAlpha;
  })(e, o, t);
  return o;
}
function E(e) {
  var t = e && e.match(/url\(.*#(.*?)["']?\)/i);
  return t && t[1];
}
function O(e, t) {
  var n = [];
  t.fontSize = t.fontSize || "10px";
  t.fontFamily = t.fontFamily || "sans-serif";
  t.fill = t.fill || "#000";
  if (t.fontStyle) {
    n.push(t.fontStyle);
  }
  if (t.fontWeight) {
    n.push(t.fontWeight);
  }
  n.push(t.fontSize);
  n.push(t.fontFamily);
  e.font = n.join(" ");
  e.textAlign = t.textAlign;
  e.fillStyle = t.fill;
  e.globalAlpha = t.globalAlpha;
}
function A(e, t, n) {
  O(e, t);
  B(e, t, n);
  if (t.text) {
    e.fillText(t.text, t.x || 0, t.y || 0);
  }
  z(e, t, true);
  (function (e, t, n) {
    if (!t.textDecoration || t.textDecoration === "none") {
      return;
    }
    var i = t.x;
    var o = e.measureText(t.text).width;
    var a = parseInt(t.fontSize, 10);
    var r = a * 0.05 < 1 ? 1 : a * 0.05;
    var s = t.y;
    switch (t.textDecoration) {
      case "line-through":
        s -= a / 3 + r / 2;
        break;
      case "overline":
        s -= a - r;
        break;
      case "underline":
        s += r;
    }
    e.rect(i, s, o, r);
    j(e, t, n);
    z(e, t);
  })(e, t, n);
}
function P(e) {
  for (var t = e.childNodes, n = 0; n < t.length; n++) {
    if (t[n].tagName === "tspan") {
      return true;
    }
  }
  return false;
}
function M(e, t, n, i) {
  var o = e.tagName;
  var a = o === "text" || o === "tspan" || o === undefined;
  var s = o === "image";
  var u = e.nodeType === 8;
  var d = (0, l.extend)({}, n, T(e, i.rootAppended));
  if (d.visibility !== "hidden" && !d[r.HIDDEN_FOR_EXPORT] && !u) {
    var c;
    t.save();
    if (!s) {
      L(t, d);
    }
    V(t, d, i);
    (function (e) {
      e.strokeOpacity = e["stroke-opacity"] !== undefined ? e["stroke-opacity"] : 1;
      e.fillOpacity = e["fill-opacity"] !== undefined ? e["fill-opacity"] : 1;
      if (e.opacity !== undefined) {
        e.strokeOpacity *= e.opacity;
        e.fillOpacity *= e.opacity;
      }
    })(d);
    t.beginPath();
    switch (e.tagName) {
      case undefined:
        A(t, d, i);
        break;
      case "text":
      case "tspan":
        (function e(t, n, i, o) {
          var a;
          var r = [];
          var s = 0;
          for (var u = 0; u < t.length; u++) {
            var d = t[u];
            if (d.tagName === undefined) {
              M(d, n, i, o);
            } else if (d.tagName === "tspan" || d.tagName === "text") {
              var c = T(d, o.rootAppended);
              var h = (0, l.extend)({}, i, c);
              if (d.tagName === "tspan" && P(d)) {
                e(d.childNodes, n, h, o);
                continue;
              }
              h.textAlign = "start";
              if (!a || c.x !== undefined) {
                a = {
                  elements: [],
                  options: [],
                  widths: [],
                  offsets: []
                };
                r.push(a);
              }
              if (c.y !== undefined) {
                s = 0;
              }
              if (c.dy !== undefined) {
                s += parseFloat(c.dy);
              }
              a.elements.push(d);
              a.options.push(h);
              a.offsets.push(s);
              O(n, h);
              a.widths.push(n.measureText(h.text).width);
            }
          }
          r.forEach(function (t) {
            var a = t.widths.reduce(function (e, t) {
              return e + t;
            }, 0);
            var r = 0;
            var s = 0;
            if (i.textAlign === "center") {
              r = a / 2;
            }
            if (i.textAlign === "end") {
              r = a;
            }
            t.options.forEach(function (e, n) {
              var i = t.widths[n];
              e.x = e.x - r + s;
              e.y += t.offsets[n];
              s += i;
            });
            t.elements.forEach(function (i, a) {
              e(i.childNodes, n, t.options[a], o);
            });
          });
        })(e.childNodes, t, d, i);
        break;
      case "image":
        c = function (e, t, n) {
          var i = new f.Deferred();
          var o = new m.Image();
          o.onload = function () {
            e.save();
            e.globalAlpha = t.globalAlpha;
            L(e, t);
            V(e, t, n);
            e.drawImage(o, t.x || 0, t.y || 0, t.width, t.height);
            e.restore();
            i.resolve();
          };
          o.onerror = function () {
            i.resolve();
          };
          o.setAttribute("crossOrigin", "anonymous");
          o.src = t.href || t["xlink:href"];
          return i;
        }(t, d, i);
        break;
      case "path":
        (function (e, t) {
          var n;
          var i;
          var o;
          var a = t.replace(/,/g, " ").split(/([A-Z])/i).filter(function (e) {
            return e.trim() !== "";
          });
          var r = 0;
          do {
            n = (a[r + 1] || "").trim().split(" ");
            switch (a[r]) {
              case "M":
                e.moveTo(D(n[0]), D(n[1]));
                r += 2;
                break;
              case "L":
                for (var s = 0; s < n.length / 2; s++) {
                  e.lineTo(D(n[s * 2]), D(n[s * 2 + 1]));
                }
                r += 2;
                break;
              case "C":
                e.bezierCurveTo(D(n[0]), D(n[1]), D(n[2]), D(n[3]), D(n[4]), D(n[5]));
                r += 2;
                break;
              case "a":
                o = (i = a[r - 1].trim().split(" ")).length - 1;
                I(D(i[o - 1]), D(i[o]), D(i[o - 1]) + D(n[5]), D(i[o]) + D(n[6]), D(n[0]), D(n[3]), D(n[4]), e);
                r += 2;
                break;
              case "A":
                o = (i = a[r - 1].trim().split(" ")).length - 1;
                I(D(i[o - 1]), D(i[o]), D(n[5]), D(n[6]), D(n[0]), D(n[3]), D(n[4]), e);
                r += 2;
                break;
              case "Z":
                e.closePath();
                r += 1;
                break;
              default:
                r++;
            }
          } while (r < a.length);
        })(t, d.d);
        break;
      case "rect":
        (function (e, t) {
          var n = t.x;
          var i = t.y;
          var o = t.width;
          var a = t.height;
          var r = t.rx;
          if (r) {
            r = y(r, o / 2, a / 2);
            e.save();
            e.translate(n, i);
            e.moveTo(o / 2, 0);
            e.arcTo(o, 0, o, a, r);
            e.arcTo(o, a, 0, a, r);
            e.arcTo(0, a, 0, 0, r);
            e.arcTo(0, 0, r, 0, r);
            e.lineTo(o / 2, 0);
            e.restore();
          } else {
            e.rect(n, i, o, a);
          }
        })(t, d);
        t.closePath();
        break;
      case "circle":
        t.arc(d.cx, d.cy, d.r, 0, v * 2, 1);
    }
    if (!a) {
      B(t, d, i);
      if (!s) {
        c = j(t, d, i);
      }
      z(t, d);
    }
    R(t, d, i, e, "linear");
    R(t, d, i, e, "radial");
    t.restore();
    return c;
  }
}
function R(e, t, n, i, o) {
  var a = n.linearGradients;
  var r = n.radialGradients;
  var s = o === "linear" ? a : r;
  if (Object.keys(s).length !== 0) {
    var l = E(t.fill);
    if (l && s[l]) {
      var u = i.getBBox();
      var d = u.x + u.width / 2;
      var c = u.y + u.height / 2;
      var h = Math.max(u.height / 2, u.width / 2);
      var f = o === "linear" ? e.createLinearGradient(u.x, 0, u.x + u.width, 0) : e.createRadialGradient(d, c, 0, d, c, h);
      s[l].colors.forEach(function (e) {
        var t = parseInt(e.offset.replace(/%/, ""));
        f.addColorStop(t / 100, e.stopColor);
      });
      if (o === "linear") {
        var g;
        var m = ((g = s[l].transform) === null || g === undefined ? undefined : g.replace(/\D/g, "")) * Math.PI / 180 ?? 0;
        e.translate(d, c);
        e.rotate(m);
        e.translate(-d, -c);
      }
      e.globalAlpha = t.opacity;
      e.fillStyle = f;
      e.fill();
    }
  }
}
function B(e, t, n) {
  var i;
  var o = E(t.filter);
  if (o) {
    if (!(i = n.filters[o])) {
      i = {
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        color: "#000"
      };
    }
    e.shadowOffsetX = i.offsetX;
    e.shadowOffsetY = i.offsetY;
    e.shadowColor = i.color;
    e.shadowBlur = i.blur;
  }
}
function L(e, t) {
  e.translate(t.translateX || 0, t.translateY || 0);
  t.translateX = undefined;
  t.translateY = undefined;
  if (t.rotationAngle) {
    e.translate(t.rotationX || 0, t.rotationY || 0);
    e.rotate(t.rotationAngle * v / 180);
    e.translate(-(t.rotationX || 0), -(t.rotationY || 0));
    t.rotationAngle = undefined;
    t.rotationX = undefined;
    t.rotationY = undefined;
  }
  if (isFinite(t.scaleX)) {
    e.scale(t.scaleX, t.scaleY);
    t.scaleX = undefined;
    t.scaleY = undefined;
  }
}
function V(e, t, n) {
  if (t["clip-path"]) {
    M(n.clipPaths[E(t["clip-path"])], e, {}, n);
    e.clip();
    t["clip-path"] = undefined;
  }
}
function F(e) {
  var n = {
    colors: [],
    transform: e.attributes.gradientTransform?.textContent
  };
  (0, s.each)(e.childNodes, function (e, t) {
    var i = t.attributes;
    n.colors.push({
      offset: i.offset.value,
      stopColor: i["stop-color"].value
    });
  });
  return n;
}
function H(e) {
  var t;
  var n;
  var i = {};
  (0, s.each)(e.childNodes, function (e, a) {
    var r = a.attributes;
    if (r.result) {
      switch (r.result.value) {
        case "gaussianBlurResult":
          i.blur = D(r.stdDeviation.value);
          break;
        case "offsetResult":
          i.offsetX = D(r.dx.value);
          i.offsetY = D(r.dy.value);
          break;
        case "floodResult":
          t = r["flood-color"] ? r["flood-color"].value : "#000";
          n = r["flood-opacity"] ? r["flood-opacity"].value : 1;
          i.color = function (e, t) {
            var n = new o.default(e);
            return "rgba(" + n.r + "," + n.g + "," + n.b + "," + t + ")";
          }(t, n);
      }
    }
  });
  return i;
}
function N(e, t, n, i) {
  return function e(t, n, i = new f.Deferred()) {
    for (var o = 0; o < t.length; o++) {
      var r = n(t[o]);
      if ((0, a.isPromise)(r)) {
        r.then(function () {
          e(Array.prototype.slice.call(t, o + 1), n, i);
        });
        break;
      }
    }
    if (o === t.length) {
      i.resolve();
    }
    return i;
  }(e, function (e) {
    switch (e.tagName && e.tagName.toLowerCase()) {
      case "g":
      case "svg":
        var o = (0, l.extend)({}, n, T(e, i.rootAppended));
        t.save();
        L(t, o);
        V(t, o, i);
        function r() {
          t.restore();
        }
        var s = N(e.childNodes, t, o, i);
        if ((0, a.isPromise)(s)) {
          s.then(r);
        } else {
          r();
        }
        return s;
      case "defs":
        return N(e.childNodes, t, {}, i);
      case "clippath":
        i.clipPaths[e.attributes.id.textContent] = e.childNodes[0];
        break;
      case "pattern":
        i.patterns[e.attributes.id.textContent] = e;
        break;
      case "filter":
        i.filters[e.id] = H(e);
        break;
      case "lineargradient":
        i.linearGradients[e.attributes.id.textContent] = F(e);
        break;
      case "radialgradient":
        i.radialGradients[e.attributes.id.textContent] = F(e);
        break;
      default:
        return M(e, t, n, i);
    }
  });
}
function z(e, t, n) {
  var i = t.stroke;
  if (i && i !== "none" && t["stroke-width"] !== 0) {
    (function (e, t) {
      var n = t["stroke-dasharray"] && t["stroke-dasharray"].match(/(\d+)/g);
      if (n && n.length) {
        n = (0, s.map)(n, function (e) {
          return D(e);
        });
        e.setLineDash(n);
      }
    })(e, t);
    e.lineJoin = t["stroke-linejoin"];
    e.lineWidth = t["stroke-width"];
    e.globalAlpha = t.strokeOpacity;
    e.strokeStyle = i;
    if (n) {
      e.strokeText(t.text, t.x, t.y);
    } else {
      e.stroke();
    }
    e.globalAlpha = 1;
  }
}
function j(e, t, n) {
  var i;
  var o = t.fill;
  if (o && o !== "none") {
    if (o.search(/url/) === -1) {
      e.fillStyle = o;
      e.globalAlpha = t.fillOpacity;
      e.fill();
      e.globalAlpha = 1;
    } else {
      var r = n.patterns[E(o)];
      if (!r) {
        return;
      }
      i = function (e, t, n, i) {
        var o = T(t, n.rootAppended);
        var r = q._createCanvas(o.width, o.height, 0);
        var s = r.getContext("2d");
        var l = N(t.childNodes, s, o, n);
        function u() {
          e.fillStyle = e.createPattern(r, "repeat");
          e.globalAlpha = i.fillOpacity;
          e.fill();
          e.globalAlpha = 1;
        }
        if ((0, a.isPromise)(l)) {
          l.then(u);
        } else {
          u();
        }
        return l;
      }(e, r, n, t);
    }
  }
  return i;
}
function W(e, t, n) {
  return N(e.childNodes, t.getContext("2d"), {}, {
    clipPaths: {},
    patterns: {},
    filters: {},
    linearGradients: {},
    radialGradients: {},
    rootAppended: n
  });
}
function G(e, t) {
  var n = t.width;
  var i = t.height;
  var o = t.backgroundColor;
  var a = t.margin;
  var s = t.svgToCanvas;
  var l = s === undefined ? W : s;
  var c = $(n, i);
  var h = q._createCanvas(c.width, c.height, a);
  var p = h.getContext("2d");
  p.setTransform(c.pixelRatio, 0, 0, c.pixelRatio, 0, 0);
  var g;
  var m = (0, r.getSvgElement)(e);
  var _ = u.default.isElementNode(e);
  p.translate(a, a);
  u.default.getBody().appendChild(h);
  if (!_) {
    (g = function () {
      var e = u.default.createElement("div");
      e.style.left = "-9999px";
      e.style.position = "absolute";
      return e;
    }()).appendChild(m);
    u.default.getBody().appendChild(g);
  }
  if (m.attributes.direction) {
    h.dir = m.attributes.direction.textContent;
  }
  (function (e, t, n, i, o) {
    e.fillStyle = i || "#ffffff";
    e.fillRect(-o, -o, t + o * 2, n + o * 2);
  })(p, n, i, o, a);
  return (0, f.fromPromise)(l(m, h, _ && (0, d.contains)(u.default.getBody(), e))).then(function () {
    return h;
  }).always(function () {
    if (g) {
      u.default.getBody().removeChild(g);
    }
    u.default.getBody().removeChild(h);
  });
}
g = function (e) {
  var t;
  var n = {};
  (0, s.each)(e, function (e, i) {
    t = i.textContent;
    if (isFinite(t)) {
      t = D(t);
    }
    n[i.name.toLowerCase()] = t;
  });
  return n;
};
var q = {
  getImageData: function (e, t) {
    var n = "image/" + t.format;
    if ((0, a.isFunction)(t.__parseAttributesFn)) {
      g = t.__parseAttributesFn;
    }
    return G(e, t).then(function (e) {
      return function (e, t) {
        var n = e.toDataURL(t, 1);
        return m.atob(n.substring(("data:" + t + ";base64,").length));
      }(e, n);
    });
  },
  getData: function (e, t) {
    var n = this;
    return q.getImageData(e, t).then(function (e) {
      var i = "image/" + t.format;
      if ((0, a.isFunction)(m.Blob) && !t.useBase64) {
        return n._getBlob(e, i);
      } else {
        return n._getBase64(e);
      }
    });
  },
  _getBlob: function (e, t) {
    var n;
    var i = new Uint8Array(e.length);
    for (n = 0; n < e.length; n++) {
      i[n] = e.charCodeAt(n);
    }
    return new m.Blob([i.buffer], {
      type: t
    });
  },
  _getBase64: function (e) {
    return m.btoa(e);
  },
  _createCanvas: function (e, t, n) {
    var o = (0, i.default)("<canvas>")[0];
    o.width = e + n * 2;
    o.height = t + n * 2;
    o.hidden = true;
    return o;
  }
};
function $(e, t) {
  var n = m.devicePixelRatio || 1;
  return {
    pixelRatio: n,
    width: e * n,
    height: t * n
  };
}
exports.imageCreator = q;