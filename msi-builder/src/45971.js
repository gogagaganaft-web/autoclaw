exports.tickGenerator = undefined;
var i;
var o = require("./19157.js");
var a = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./35922.js");
var s = require("./60810.js");
var l = require("./13306.js");
function u(e, t) {
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
      return d(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return d(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function d(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var c = a.default.convertDateUnitToMilliseconds;
var h = a.default.dateToMilliseconds;
var f = Math;
var p = f.abs;
var g = f.floor;
var m = f.ceil;
var _ = f.pow;
var v = [1, 2, 2.5, 5];
var y = [1, 2, 3, 5];
var b = {
  millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
  second: [1, 2, 3, 5, 10, 15, 20, 30],
  minute: [1, 2, 3, 5, 10, 15, 20, 30],
  hour: [1, 2, 3, 4, 6, 8, 12],
  day: [1, 2],
  week: [1, 2],
  month: [1, 2, 3, 6]
};
var x = (0, l.extend)({}, b, {
  day: [1]
});
var w = {
  millisecond: [1, 2, 5, 10, 25, 50, 100, 250, 500],
  second: [1, 2, 3, 5, 10, 15, 20, 30],
  minute: [1, 2, 3, 5, 10, 15, 20, 30],
  hour: [1, 2, 3, 4, 6, 8, 12],
  day: [1, 2, 3, 7, 14],
  month: [1, 2, 3, 6]
};
var C = [2, 4, 5, 8, 10];
function S(e) {
  return e;
}
function k(e, t, n) {
  return function (i) {
    return (0, o.getLogExt)(i, e, t, n);
  };
}
function D(e, t, n) {
  return function (i, o) {
    return (0, s.adjust)(e(t((0, s.adjust)(n(i) / o)) * o));
  };
}
function I(e, t, n, i) {
  if ((0, r.isDefined)(i)) {
    if (i) {
      return e;
    } else {
      return t;
    }
  } else {
    return function (i, o, a, s) {
      var l = e(i, o);
      if (i - l == 0 || !(0, r.isDefined)(a) || n(i, l, o, a) || s) {
        return l;
      } else {
        return t(i, o);
      }
    };
  }
}
function T(e, t, n, i) {
  var a = n - p(t - e);
  var r = f.max(m(i.businessDelta / n), 2);
  var s = i.screenDelta / (r * n);
  var l = f.round(s * a);
  var u = (0, o.getLogExt)(s * n / i.axisDivisionFactor, 2) + 1;
  var d = (i.isSpacedMargin ? 2 : 1) * u;
  var c = f.round(d * 3);
  return i.businessDelta > i.interval && l >= c;
}
function E(e) {
  return function (t, n, i, a) {
    return T((0, o.getLogExt)(t, e), (0, o.getLogExt)(n, e), i, a);
  };
}
function O(e, t, n, i) {
  return T(e.valueOf(), t.valueOf(), h(n), i);
}
function A(e, t) {
  var n = 0;
  if (t) {
    n = t.reduce(function (e, t) {
      return e + (t.to - t.from);
    }, 0);
  }
  return p(e.max - e.min - n);
}
function P(e, t, n, i) {
  var o = t / n - (i || 0);
  return e / (o = o < 1 ? 1 : o);
}
function M(e, t) {
  return _(10, g((0, o.getLogExt)(e, 10)) + (t || 0));
}
function R(e, t, n, i, o, a, r, s, l, u) {
  var d = P(e, t, o, s);
  var c = 1;
  var h = r === false;
  if (!i || !n) {
    if (d >= 1 || !h && d > 0) {
      c = B(d, a, h);
    }
    if (!n || !i && n < c) {
      n = c;
    }
  }
  if (!i && u && (u = B(u, a, h)) > n) {
    n = u;
  }
  return n;
}
function B(e, t, n) {
  var i = M(e, -1);
  var o = 1;
  t = t || v;
  if (e > 0) {
    e /= i;
    o = t.concat(t[0] * 10).map(function (e) {
      return e * 10;
    }).reduce(function (t, o) {
      if (i === 0.1 && n && o === 25) {
        return t;
      } else if (t < e) {
        return o;
      } else {
        return t;
      }
    }, 0);
    o = (0, s.adjust)(o * i, i);
  }
  return o;
}
function L(e, t, n, i) {
  var o = P(e, t, i);
  return n || C.reduce(function (t, n) {
    var i = e / n;
    if (i >= o) {
      return i;
    } else {
      return t;
    }
  }, 0);
}
function V(e) {
  return function (t, n) {
    var i = M(t);
    if (!e && i < 1) {
      i = 1;
    }
    return (n = n || y).concat(n[0] * 10).reduce(function (e, n) {
      if (e < t) {
        return n * i;
      } else {
        return e;
      }
    }, 0);
  };
}
function F(e, t) {
  return function (n, i) {
    if (!n && e <= c(t, i)) {
      (n = {})[t + "s"] = i;
    }
    return n;
  };
}
function H(e, t) {
  return function (n, i) {
    var o = t * i;
    if (!n && e <= c("year", o) && o !== 2.5) {
      n = {
        years: o
      };
    }
    return n;
  };
}
function N(e, t, n, i, o, a, r, s, l, u) {
  if (!i || !n) {
    var d = z(P(e, t, o), a, null, l);
    if (!n || !i && h(n) <= h(d)) {
      n = d;
    }
  }
  if (!i && u) {
    u = z(u, a, null, l);
    if (h(u) > h(n)) {
      n = u;
    }
  }
  return n;
}
function z(e, t, n, i) {
  var o;
  for (var a in t = t || function (e) {
    if (e && e > 2) {
      return x;
    } else {
      return b;
    }
  }(i)) {
    if (o = t[a].reduce(F(e, a), o)) {
      break;
    }
  }
  if (!o) {
    for (var r = 1; !(o = v.reduce(H(e, r), o)); r *= 10);
  }
  return o;
}
function j(e, t, n, i) {
  return N(e, t, n, true, i, w);
}
function W(e, t) {
  return function (n) {
    return n && t(p((0, s.adjust)(e(n[1]) - e(n[0])))) || undefined;
  };
}
function G(e, t, n) {
  return a.default.addInterval(e, t, n);
}
function q(e, t, n) {
  return G(e, t, n);
}
function $(e, t, n) {
  t = t.filter(function (e) {
    return !e.gapSize;
  });
  return function (i, o, a) {
    var r;
    i = e(i, o, a);
    if (!t.every(function (t) {
      if (i >= e(t.from, o) && e(i, o) < t.to) {
        r = t.to - t.from - (e(t.from, o) - t.from) * 2;
      }
      return !r;
    })) {
      i = n(e(i, r), o);
    }
    return i;
  };
}
function U(e, t, n, i) {
  return function (o, a, s, l, u, d, c, h, f) {
    var p;
    var g = function (e, t) {
      return function (n) {
        var i;
        if (!t.every(function (e) {
          if (n >= e.from && n < e.to) {
            i = e.gapSize;
          }
          return !i;
        })) {
          n = e(n, i);
        }
        return n;
      };
    }(e, l);
    var m = o.min;
    var _ = o.max;
    var v = {
      screenDelta: c,
      businessDelta: d,
      axisDivisionFactor: h,
      isSpacedMargin: o.isSpacedMargin,
      interval: a
    };
    var y = t(m, a, v);
    var b = [];
    if (u != null && u.length) {
      e = $(e, u, t);
    }
    if (y > _ && (y = t(m, n(d / 2), v)) > _) {
      y = t(m, a, v, s = true);
    }
    y = g(y);
    while (y < _ && y !== p || f && y <= _) {
      b.push(y);
      p = y;
      y = g(e(y, a));
    }
    if (s || y - _ == 0 || !(0, r.isDefined)(s) && i(_, y, a, v)) {
      b.push(y);
    }
    return b;
  };
}
function K(e, t, n, i, o) {
  return function (a, r, s, l, u, d, c) {
    var h = u / l;
    var f = s[s.length - 1];
    var p = s[0];
    var g = c - 1;
    if (d != null && d.length) {
      t = $(t, d, n);
    }
    if ((l = e(l, p, p, h)) === 0) {
      return [];
    }
    var m = i(n(a, u, a), l);
    l = e(l, p, m, h);
    var _ = [];
    while (m < p && (!g || g > 0)) {
      if (m >= a) {
        _.push(m);
      }
      g--;
      m = t(m, l);
    }
    var v = s.reduce(function (n, o) {
      g = c - 1;
      if (n.prevTick === null) {
        n.prevTick = o;
        return n;
      }
      l = e(l, o, n.prevTick, h);
      for (var a = i(n.prevTick, l); a < o && (!g || g > 0);) {
        if (a !== n.prevTick) {
          n.minors.push(a);
        }
        g--;
        a = t(a, l);
      }
      n.prevTick = o;
      return n;
    }, {
      prevTick: null,
      minors: []
    });
    _ = _.concat(v.minors);
    var y;
    var b = o(r, u, a);
    l = e(l, b, b, h);
    m = i(f, l);
    while (m < r && m !== y) {
      _.push(m);
      y = m;
      m = t(m, l);
    }
    if (f - r != 0 && m - r == 0) {
      _.push(m);
    }
    return _;
  };
}
function Z(e, t) {
  if (t.length) {
    var n = t.reduce(function (t, n) {
      var i;
      var o = [];
      for (i = t[1]; i < e.length; i++) {
        var a = e[i];
        if (a < n.from) {
          o.push(a);
        }
        if (a >= n.to) {
          break;
        }
      }
      return [t[0].concat(o), i];
    }, [[], 0]);
    return n[0].concat(e.slice(n[1]));
  }
  return e;
}
function Y(e, t, n, i, o, a, r, s, l, u) {
  function d(t, n, i) {
    if (t && n / r(t) >= i + 1) {
      e.incidentOccurred("W2003");
      t = undefined;
    }
    return t;
  }
  return function (c, h, f, p, g, m, _, v) {
    g = g || {};
    var y = t(c, v);
    var b = function (e) {
      return {
        tickInterval: o(e.majors),
        ticks: e.majors || [],
        minorTickInterval: a(e.minors),
        minorTicks: e.minors || []
      };
    }(g);
    if (!isNaN(y)) {
      if (y !== 0 || g.majors) {
        b = function (t, i, o, a, r, l, c, h) {
          if (c.majors) {
            t.breaks = h;
            return t;
          }
          var f;
          var p = h.filter(function (e) {
            return e.gapSize;
          });
          r = e.skipCalculationLimits ? r : d(r, o, a);
          r = n(o, a, r, l, e.axisDivisionFactor, e.numberMultipliers, e.allowDecimals, h.length, p[0] && p[0].gapSize.days, e.minTickInterval);
          if (!e.skipTickGeneration) {
            f = Z(f = s(i, r, e.endOnTick, p, h, o, a, e.axisDivisionFactor, e.generateExtraTick), h = u(h, f, r));
            t.breaks = h;
            t.ticks = t.ticks.concat(f);
          }
          t.tickInterval = r;
          return t;
        }(b, c, y, h, f, p, g, v || []);
        if (!e.skipTickGeneration && y > 0) {
          b = function (t, n, o, s, u, c, h) {
            if (!e.calculateMinors) {
              return t;
            }
            if (h.minors) {
              return t;
            }
            var f = r(t.tickInterval);
            var p = s * f / o;
            var g = t.breaks;
            if (!u && c) {
              u = a([f / (c + 1), f / (c + 1) * 2]);
            } else {
              c = undefined;
            }
            u = d(u, f, p);
            u = i(f, p, u, e.minorAxisDivisionFactor);
            t.minorTicks = Z(t.minorTicks.concat(l(n.min, n.max, t.ticks, u, t.tickInterval, g, c)), g);
            t.minorTickInterval = u;
            return t;
          }(b, c, y, h, m, _, g);
        }
      } else {
        b.ticks = [c.min];
      }
    }
    return b;
  };
}
function X(e, t, n, i) {
  var o = u(t, 2);
  var a = o[0];
  var s = o[1];
  if (!(0, r.isDefined)(a) || p(i(e) - i(a)) / n > 0.25) {
    if ((0, r.isDefined)(s) && p(i(s) - i(a)) / n < 2) {
      a = s;
    } else if (!(0, r.isDefined)(a)) {
      a = e;
    }
  }
  return a;
}
function Q(e, t, n) {
  return function (i, o, a) {
    var r = e(a);
    var s = r * 0.5;
    return i.reduce(function (e, i) {
      var a = o.filter(function (e) {
        return e <= i.from;
      });
      var l = n(X(i.from, [].concat(a[a.length - 1], o[a.length]), r, t), s);
      a = o.filter(function (e) {
        return e >= i.to;
      });
      var u = n(X(i.to, [].concat(a[0], o[o.length - a.length - 1]), r, t), -s);
      if (t(u) - t(l) < r && !i.gapSize) {
        return e;
      } else if (i.gapSize) {
        return e.concat([i]);
      } else {
        return e.concat([{
          from: l,
          to: u,
          cumulativeWidth: i.cumulativeWidth
        }]);
      }
    }, []);
  };
}
function J(e, t, n) {
  return function (i, o) {
    return (0, s.sign)(i) * (0, s.adjust)(e(t(i)((0, s.adjust)(n(i) / o)) * o));
  };
}
function ee(e) {
  var t;
  var n = e.logBase;
  var i = function (e, t, n) {
    return function (i) {
      return (0, o.raiseToExt)(i, e, t, n);
    };
  }(n, e.allowNegatives, e.linearThreshold);
  var a = k(n, e.allowNegatives, e.linearThreshold);
  var r = function (e) {
    return function (t) {
      if (t === 0) {
        return 0;
      } else {
        return (0, o.getLog)(p(t), e);
      }
    };
  }(n);
  var s = function (e) {
    return function (t) {
      return (0, o.raiseTo)(t, e);
    };
  }(n);
  var l = J(s, function (e) {
    if (e < 0) {
      return m;
    } else {
      return g;
    }
  }, r);
  var u = J(s, function (e) {
    if (e < 0) {
      return g;
    } else {
      return m;
    }
  }, r);
  var d = D(S, m, S);
  return Y(e, function (e, t, n) {
    var i = k(e, t, n);
    return function (e, t) {
      var n = 0;
      if (t) {
        n = t.reduce(function (e, t) {
          return e + p(i(t.to / t.from));
        }, 0);
      }
      return m(p(i(e.max) - i(e.min)) - n);
    };
  }(n, e.allowNegatives, e.linearThreshold), (t = e.skipCalculationLimits, function (e, n, i, o, a, r, s, l, u, d) {
    var c = P(e, n, a);
    var h = 0;
    var f = V(t);
    if (!o || !i) {
      if (c > 0) {
        h = f(c, r);
      }
      if (!i || !o && i < h) {
        i = h;
      }
    }
    if (!o && d && (d = f(d, r)) > i) {
      i = d;
    }
    return i;
  }), L, W(a, S), W(S, S), S, U(function (e, t) {
    return function (n, i, o) {
      return t(G(e(n), i, o));
    };
  }(a, i), I(l, u, E(n), e.endOnTick), V(e.skipCalculationLimits), E(n)), K(function (e, t, n, i) {
    return Math.max(Math.abs(t), Math.abs(n)) / i;
  }, G, l, d, u), Q(S, a, function (e, t) {
    return i(a(e) + t);
  }));
}
exports.tickGenerator = function (e) {
  if (e.rangeIsEmpty) {
    return function (e) {
      return function (t, n, i, o) {
        var a = g(n / e.axisDivisionFactor);
        var r = n / (a = a < 1 ? 1 : a);
        return {
          ticks: r > 0 ? Array.apply(null, new Array(a + 1)).map(function (e, t) {
            return r * t;
          }) : [],
          tickInterval: r
        };
      };
    }(e);
  } else if (e.axisType === "discrete") {
    return function (e) {
      return function (t, n, i, a) {
        var r = (0, o.getCategoriesInfo)(t.categories, t.min, t.max).categories;
        return {
          ticks: r,
          tickInterval: m(r.length * e.axisDivisionFactor / n)
        };
      };
    }(e);
  } else if (e.axisType === "logarithmic") {
    return ee(e);
  } else if (e.dataType === "datetime") {
    return function (e) {
      function t(t, n) {
        var i = D(S, g, S);
        var o = (0, r.isString)(n) ? a.default.getDateIntervalByString(n.toLowerCase()) : n;
        var s = h(n);
        if (o.days % 7 == 0 || n.quarters) {
          o = z(s);
        }
        function l(t) {
          return a.default.correctDateWithUnitBeginning(t, o, null, e.firstDayOfWeek);
        }
        function u(e) {
          return new Date(g((e.getTime() - e.getTimezoneOffset() * 60000) / s) * s + e.getTimezoneOffset() * 60000);
        }
        t = l(t);
        if ("years" in o) {
          t.setFullYear(i(t.getFullYear(), o.years));
        } else if ("quarters" in o) {
          t = l(u(t));
        } else if ("months" in o) {
          t.setMonth(i(t.getMonth(), o.months));
        } else if ("weeks" in o || "days" in o) {
          t = l(u(t));
        } else if ("hours" in o) {
          t.setHours(i(t.getHours(), o.hours));
        } else if ("minutes" in o) {
          t.setMinutes(i(t.getMinutes(), o.minutes));
        } else if ("seconds" in o) {
          t.setSeconds(i(t.getSeconds(), o.seconds));
        } else if ("milliseconds" in o) {
          t = u(t);
        }
        return t;
      }
      var n = W(S, a.default.convertMillisecondsToDateUnits);
      return Y(e, A, N, j, n, n, h, U(q, I(t, function (e, n) {
        for (var i = t(e, n); e - i > 0;) {
          i = q(i, n);
        }
        return i;
      }, O, e.endOnTick), z, O), K(S, q, t, q, S), Q(h, S, function (e, t) {
        return new Date(e.getTime() + t);
      }));
    }(e);
  } else {
    return function (e) {
      var t = D(S, g, S);
      var n = D(S, m, S);
      var i = W(S, S);
      return Y(e, A, R, L, i, i, S, U(G, I(t, n, T, e.endOnTick), B, T), K(S, G, t, G, S), Q(S, S, function (e, t) {
        return e + t;
      }));
    }(e);
  }
};