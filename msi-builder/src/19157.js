exports.PANE_PADDING = undefined;
exports.adjustVisualRange = function (e, t, n, i) {
  var a = (0, o.isDefined)(t.startValue);
  var r = (0, o.isDefined)(t.endValue);
  var s = e.axisType !== "discrete";
  i = i || n;
  var l = U(e, false);
  var u = a ? t.startValue : i.min;
  var d = r ? t.endValue : i.max;
  var c = t.length;
  var h = i.categories;
  if (s && !(0, o.isDefined)(u) && !(0, o.isDefined)(d)) {
    return {
      startValue: u,
      endValue: d
    };
  }
  if ((0, o.isDefined)(c)) {
    if (s) {
      if (e.dataType === "datetime" && !(0, o.isNumeric)(c)) {
        c = k(c);
      }
      if (r && !a || !r && !a) {
        if ((0, o.isDefined)(n.max)) {
          d = d > n.max ? n.max : d;
        }
        u = l(d, c, -1);
      } else if (a && !r) {
        if ((0, o.isDefined)(n.min)) {
          u = u < n.min ? n.min : u;
        }
        d = l(u, c);
      }
    } else {
      c = parseInt(c);
      if (!isNaN(c) && isFinite(c)) {
        c--;
        if (r || a) {
          if (a && !r) {
            var f = q(h, u, undefined);
            d = f.categories[c];
          } else if (!a && r) {
            var p = q(h, undefined, d);
            u = p.categories[p.categories.length - 1 - c];
          }
        } else {
          d = h[h.length - 1];
          u = h[h.length - 1 - c];
        }
      }
    }
  }
  if (s) {
    if ((0, o.isDefined)(n.max) && d > n.max) {
      d = n.max;
    }
    if ((0, o.isDefined)(n.min) && u < n.min) {
      u = n.min;
    }
  }
  return {
    startValue: u,
    endValue: d
  };
};
exports.convertAngleToRendererSpace = undefined;
exports.convertPolarToXY = function (e, t, n, i) {
  var a = i > 0 ? i : 0;
  n = (0, o.isDefined)(n) ? n + t - 90 : 0;
  var r = R(n);
  return {
    x: S(e.x + a * r.cos),
    y: S(e.y + a * r.sin)
  };
};
exports.convertVisualRangeObject = function (e, t) {
  if (t) {
    return e;
  }
  return [e.startValue, e.endValue];
};
exports.enumParser = exports.degreesToRadians = exports.decreaseGaps = exports.convertXYToPolar = undefined;
exports.extractColor = function (e, t) {
  if ((0, o.isString)(e) || !e) {
    return e;
  } else if (t) {
    return e.base;
  } else {
    return e.fillId || e.base;
  }
};
exports.getAddFunction = U;
exports.getLog = exports.getDistance = exports.getDecimalOrder = exports.getCosAndSin = exports.getCategoriesInfo = exports.getAppropriateFormat = exports.getAdjustedLog10 = undefined;
exports.getLogExt = K;
exports.getVerticallyShiftedAngularCoords = exports.getPower = exports.getNextDefsSvgId = undefined;
exports.getVizRangeObject = function (e) {
  if (Array.isArray(e)) {
    return {
      startValue: e[0],
      endValue: e[1]
    };
  } else {
    return e || {};
  }
};
exports.isRelativeHeightPane = $;
exports.map = F;
exports.mergeMarginOptions = function (e, t) {
  return {
    checkInterval: e.checkInterval || t.checkInterval,
    size: x(e.size || 0, t.size || 0),
    percentStick: e.percentStick || t.percentStick,
    sizePointNormalState: x(e.sizePointNormalState || 0, t.sizePointNormalState || 0)
  };
};
exports.normalizeAngle = undefined;
exports.normalizeArcParams = function (e, t, n, i, o, a) {
  var r;
  var s = true;
  var l = V(a, 3) - V(o, 3);
  if (l) {
    if (f(l) % 360 == 0) {
      o = 0;
      a = 360;
      r = true;
      a -= 0.01;
    }
    if (o > 360) {
      o %= 360;
    }
    if (a > 360) {
      a %= 360;
    }
    if (o > a) {
      o -= 360;
    }
    s = false;
  }
  o *= D;
  a *= D;
  return [e, t, Math.min(i, n), Math.max(i, n), Math.cos(o), Math.sin(o), Math.cos(a), Math.sin(a), r, g(f(a - o) / c) % 2 ? "1" : "0", s];
};
exports.normalizeBBox = G;
exports.normalizeEnum = z;
exports.normalizePanesHeight = function (e) {
  e.forEach(function (e) {
    var t = e.height;
    var n = 0;
    var i = parseFloat(t) || undefined;
    if ((0, o.isString)(t) && t.indexOf("px") > -1 || (0, o.isNumeric)(t) && t > 1) {
      i = S(i);
      n = 1;
    }
    if (!n && i) {
      if ((0, o.isString)(t) && t.indexOf("%") > -1) {
        i /= 100;
        n = 2;
      } else if (i < 0) {
        i = i < -1 ? 1 : f(i);
      }
    }
    e.height = i;
    e.unit = n;
  });
  var t = e.filter($);
  var n = t.reduce(function (e, t) {
    return e + (t.height || 0);
  }, 0);
  var i = t.length;
  var a = t.filter(function (e) {
    return !e.height;
  });
  var r = a.length;
  if (n < 1 && r) {
    a.forEach(function (e) {
      return e.height = (1 - n) / r;
    });
  } else if (n > 1 || n < 1 && !r || n === 1 && r) {
    if (r) {
      var s = n / i;
      var l = r * s;
      t.filter(function (e) {
        return e.height;
      }).forEach(function (e) {
        return e.height *= (n - l) / n;
      });
      a.forEach(function (e) {
        return e.height = s;
      });
    }
    t.forEach(function (e) {
      return e.height *= 1 / n;
    });
  }
};
exports.patchFontOptions = exports.parseScalar = undefined;
exports.pointInCanvas = function (e, t, n) {
  return t >= e.left && t <= e.right && n >= e.top && n <= e.bottom;
};
exports.raiseTo = exports.processSeriesTemplate = undefined;
exports.raiseToExt = Z;
exports.rangesAreEqual = function (e, t) {
  if (Array.isArray(t)) {
    return e.length === t.length && e.every(function (e, n) {
      return Y(e) === Y(t[n]);
    });
  } else {
    return Y(e.startValue) === Y(t.startValue) && Y(e.endValue) === Y(t.endValue);
  }
};
exports.rotateBBox = function (e, t, n) {
  var i = T(w(n * D).toFixed(3));
  var o = T(C(n * D).toFixed(3));
  var a = e.width / 2;
  var r = e.height / 2;
  var s = e.x + a;
  var l = e.y + r;
  var u = f(a * i) + f(r * o);
  var d = f(a * o) + f(r * i);
  var c = t[0] + (s - t[0]) * i + (l - t[1]) * o;
  var h = t[1] - (s - t[0]) * o + (l - t[1]) * i;
  return G({
    x: c - u,
    y: h - d,
    width: u * 2,
    height: d * 2
  });
};
exports.roundValue = undefined;
exports.setCanvasValues = j;
exports.unique = undefined;
exports.updatePanesCanvases = function (e, t, n) {
  var i = 0;
  var o = n ? t.width - t.left - t.right : t.height - t.top - t.bottom;
  var r = e.reduce(function (e, t) {
    return e + ($(t) ? 0 : t.height);
  }, 0);
  var s = o - (e.length - 1) * 10 - r;
  var l = n ? "left" : "top";
  var u = n ? "right" : "bottom";
  e.forEach(function (e) {
    var n = $(e) ? S(e.height * s) : e.height;
    e.canvas = e.canvas || {};
    (0, a.extend)(e.canvas, t);
    e.canvas[l] = t[l] + i;
    e.canvas[u] = t[u] + (o - n - i);
    i = i + n + 10;
    j(e.canvas);
  });
};
exports.valueOf = Y;
var i = require("./20576.js");
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./60810.js");
var l = d(require("./91198.js"));
var u = d(require("./52752.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = Math.PI;
var h = Math.LN10;
var f = Math.abs;
var p = Math.log;
var g = Math.floor;
var m = Math.ceil;
var _ = Math.pow;
var v = Math.sqrt;
var y = Math.atan2;
var b = Math.min;
var x = Math.max;
var w = Math.cos;
var C = Math.sin;
var S = Math.round;
var k = l.default.dateToMilliseconds;
var D = c / 180;
var I = isNaN;
var T = Number;
var E = 1;
exports.PANE_PADDING = 10;
function O(e, t) {
  if (e) {
    return p(e) / p(t);
  } else {
    return NaN;
  }
}
exports.getLog = O;
exports.getAdjustedLog10 = function (e) {
  return (0, s.adjust)(O(e, 10));
};
function A(e, t) {
  return _(t, e);
}
exports.raiseTo = A;
function P(e) {
  return (e % 360 + 360) % 360;
}
exports.normalizeAngle = P;
exports.convertAngleToRendererSpace = function (e) {
  return 90 - e;
};
function M(e) {
  return c * e / 180;
}
exports.degreesToRadians = M;
function R(e) {
  var t = M(e);
  return {
    cos: w(t),
    sin: C(t)
  };
}
exports.getCosAndSin = R;
function B(e, t, n, i) {
  var o = n - e;
  var a = i - t;
  return v(a * a + o * o);
}
exports.getDistance = B;
function L(e) {
  var t;
  var n = f(e);
  if (I(n)) {
    return NaN;
  } else if (n > 0) {
    n = p(n) / h;
    if ((t = m(n)) - n < 1e-14) {
      return t;
    } else {
      return g(n);
    }
  } else {
    return 0;
  }
}
exports.getDecimalOrder = L;
exports.getAppropriateFormat = function (e, t, n) {
  var i;
  var o = x(L(e), L(t));
  var a = -L(f(t - e) / n);
  if (I(o) || I(a)) {
    return null;
  } else {
    if (f(o) <= 4) {
      i = "fixedPoint";
      if (a < 0) {
        a = 0;
      }
      if (a > 4) {
        a = 4;
      }
    } else {
      i = "exponential";
      if ((a += o - 1) > 3) {
        a = 3;
      }
    }
    return {
      type: i,
      precision: a
    };
  }
};
function V(e, t) {
  if (t > 20) {
    t = 20;
  }
  if ((0, o.isNumeric)(e)) {
    if ((0, o.isExponential)(e)) {
      return T(e.toExponential(t));
    } else {
      return T(e.toFixed(t));
    }
  }
}
exports.roundValue = V;
function F(e, t) {
  var n;
  for (var i = 0, o = e.length, a = []; i < o;) {
    if ((n = t(e[i], i)) !== null) {
      a.push(n);
    }
    i++;
  }
  return a;
}
function H(e, t) {
  return F(t, function (t) {
    if (e[t]) {
      return e[t];
    } else {
      return null;
    }
  });
}
function N(e, t, n, i) {
  var o = i;
  (0, r.each)(t, function (t, i) {
    if (e[i]) {
      e[i] -= n;
      o -= n;
    }
  });
  return o;
}
function z(e) {
  return String(e).toLowerCase();
}
function j(e) {
  if (e) {
    e.originalTop = e.top;
    e.originalBottom = e.bottom;
    e.originalLeft = e.left;
    e.originalRight = e.right;
  }
  return e;
}
function W(e) {
  if (e > -10000000000 && e < 10000000000) {
    return e;
  } else {
    return 0;
  }
}
function G(e) {
  var t = W(g(e.x));
  var n = W(g(e.y));
  var i = {
    x: t,
    y: n,
    width: W(m(e.width + e.x)) - t,
    height: W(m(e.height + e.y)) - n
  };
  i.isEmpty = !i.x && !i.y && !i.width && !i.height;
  return i;
}
exports.getPower = function (e) {
  return e.toExponential().split("e")[1];
};
exports.decreaseGaps = function (e, t, n) {
  var i;
  do {
    (i = H(e, t)).push(m(n / i.length));
    n = N(e, t, b.apply(null, i), n);
  } while (n > 0 && i.length > 1);
  return n;
};
exports.parseScalar = function (e, t) {
  if (e !== undefined) {
    return e;
  } else {
    return t;
  }
};
exports.enumParser = function (e) {
  var t;
  var n;
  var i = {};
  t = 0;
  n = e.length;
  for (; t < n; ++t) {
    i[z(e[t])] = 1;
  }
  return function (e, t) {
    var n = z(e);
    if (i[n]) {
      return n;
    } else {
      return t;
    }
  };
};
exports.patchFontOptions = function (e) {
  var t = {};
  (0, r.each)(e || {}, function (n, i) {
    if (/^(cursor)$/i.test(n)) ;else if (n === "opacity") {
      i = null;
    } else if (n === "color") {
      n = "fill";
      if ("opacity" in e) {
        var o = new u.default(i);
        i = `rgba(${o.r},${o.g},${o.b},${e.opacity})`;
      }
    } else {
      n = "font-" + n;
    }
    t[n] = i;
  });
  return t;
};
exports.convertXYToPolar = function (e, t, n) {
  var i = B(e.x, e.y, t, n);
  var o = y(n - e.y, t - e.x);
  return {
    phi: S(P(o * 180 / c)),
    r: S(i)
  };
};
exports.processSeriesTemplate = function (e, t) {
  var n;
  var r;
  var s;
  var l = (0, o.isFunction)(e.customizeSeries) ? e.customizeSeries : i.noop;
  var u = e.nameField;
  var d = {};
  var c = [];
  var h = 0;
  for (r = (t = t || []).length; h < r; h++) {
    if (u in (s = t[h])) {
      if (!(n = d[s[u]])) {
        n = d[s[u]] = {
          name: s[u],
          nameFieldValue: s[u]
        };
        c.push(n.name);
      }
    }
  }
  return F(c, function (e) {
    var t = d[e];
    return (0, a.extend)(t, l.call(null, t.name));
  });
};
function q(e, t, n) {
  if (e.length === 0) {
    return {
      categories: []
    };
  }
  t = (0, o.isDefined)(t) ? t : e[0];
  n = (0, o.isDefined)(n) ? n : e[e.length - 1];
  var i;
  var a = F(e, function (e) {
    if (e == null) {
      return undefined;
    } else {
      return e.valueOf();
    }
  });
  var r = a.indexOf(t.valueOf());
  var s = a.indexOf(n.valueOf());
  var l = false;
  if (r < 0) {
    r = 0;
  }
  if (s < 0) {
    s = e.length - 1;
  }
  if (s < r) {
    i = s;
    s = r;
    r = i;
    l = true;
  }
  var u = e.slice(r, s + 1);
  var d = u.length - 1;
  return {
    categories: u,
    start: u[l ? d : 0],
    end: u[l ? 0 : d],
    inverted: l
  };
}
function $(e) {
  return !(e.unit % 2);
}
exports.getCategoriesInfo = q;
exports.unique = function (e) {
  var t = {};
  return F(e, function (e) {
    var n = t[e] ? null : e;
    t[e] = true;
    return n;
  });
};
function U(e, t) {
  if (e.dataType === "datetime") {
    return function (e, t, n = 1) {
      return new Date(e.getTime() + n * t);
    };
  } else if (e.axisType === "logarithmic") {
    return function (t, n, i = 1) {
      var o = K(t, e.base) + i * n;
      return Z(o, e.base);
    };
  } else {
    return function (e, n, i = 1) {
      var o = e + i * n;
      if (t && o * e <= 0) {
        return 0;
      } else {
        return o;
      }
    };
  }
}
function K(e, t, n = false, i) {
  if (!n) {
    return O(e, t);
  }
  if (e === 0) {
    return 0;
  }
  var o = O(f(e), t) - (i - 1);
  if (o < 0) {
    return 0;
  } else {
    return (0, s.adjust)((0, s.sign)(e) * o, Number(_(t, i - 1).toFixed(f(i))));
  }
}
function Z(e, t, n = false, i) {
  if (!n) {
    return A(e, t);
  }
  if (e === 0) {
    return 0;
  }
  var o = A(f(e) + (i - 1), t);
  if (o < 0) {
    return 0;
  } else {
    return (0, s.adjust)((0, s.sign)(e) * o, Number(_(t, i).toFixed(f(i))));
  }
}
function Y(e) {
  return e && e.valueOf();
}
exports.getVerticallyShiftedAngularCoords = function (e, t, n) {
  var i = e.x + e.width / 2 >= n.x;
  var o = (i ? e.x : e.x + e.width) - n.x;
  var a = e.y - n.y;
  var r = a + t;
  var s = S(v(o * o + a * a - r * r));
  var l = (i ? +s : -s) || o;
  return {
    x: n.x + (i ? l : l - e.width),
    y: e.y + t
  };
};
exports.getNextDefsSvgId = function () {
  return `MSI_${E++}`;
};