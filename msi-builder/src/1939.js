exports.SeriesFamily = P;
var i;
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./60810.js");
var l = require("./20576.js");
var u = require("./19157.js");
var d = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var c = Math.round;
var h = Math.abs;
var f = Math.pow;
var p = Math.sqrt;
var g = Math.min;
function m(e, t, n, i, a, s, l) {
  e.forEach(function (e) {
    var u;
    var d = l(t.indexOf(i), t.length);
    var c = e.getPointsByArg(n, true);
    var h = function (e) {
      if (e < 0 || e > 1) {
        return undefined;
      } else {
        return e;
      }
    }(e.getOptions().barPadding);
    var f = e.getOptions().barWidth;
    var p = b(d, a);
    var g = a.width;
    if (d !== -1) {
      if ((0, o.isDefined)(h) || (0, o.isDefined)(f)) {
        g = (u = y(s, t.length, 1 - h, f)).width;
        if (!e.getBarOverlapGroup()) {
          p = b(d, u);
        }
      }
      (function (e, t, n) {
        (0, r.each)(e, function (e, i) {
          i.correctCoordinates({
            width: t,
            offset: n
          });
        });
      })(c, g, p);
    }
  });
}
function _(e) {
  return e.getStackName() || e.getBarOverlapGroup();
}
function v(e, t, n) {
  var i;
  var o;
  var a;
  var r = [];
  var s = [];
  var l = {};
  var u = t.barGroupWidth;
  var c = (i = e[0]) === null || i === undefined ? undefined : i.getArgumentAxis();
  if ((o = e[0]) !== null && o !== undefined && o.useAggregation()) {
    var f = e[0]?.argumentType === "datetime";
    var p = c.getTickInterval();
    var g = c.getAggregationInterval();
    p = f ? d.default.dateToMilliseconds(p) : p;
    a = (g = f ? d.default.dateToMilliseconds(g) : g) < p ? g : p;
  }
  a = c == null ? undefined : c.getTranslator().getInterval(a);
  var v;
  var b = u ? a > u ? u : a : a * (1 - ((v = t.barGroupPadding) < 0 || v > 1 ? 0.3 : v));
  e.forEach(function (e, t) {
    var n;
    var i = _(e) || t.toString();
    for (n in e.pointsByArgument) {
      if (s.indexOf(n.valueOf()) === -1) {
        s.push(n.valueOf());
      }
    }
    if (r.indexOf(i) === -1) {
      r.push(i);
      l[i] = [];
    }
    l[i].push(e);
  });
  s.forEach(function (e) {
    var t = r.reduce(function (t, n) {
      if (function (e, t) {
        return e.some(function (e) {
          return !e.getOptions().ignoreEmptyPoints || e.getPointsByArg(t, true).some(function (e) {
            return e.hasValue();
          });
        });
      }(l[n], e)) {
        t.push(n);
      }
      return t;
    }, []);
    var i = y(b, t.length);
    r.forEach(function (o) {
      m(l[o], t, e, o, i, b, n);
    });
  });
}
function y(e, t, n, i) {
  var a;
  var r;
  if (i) {
    r = g(i, e / t);
    a = t > 1 ? c((e - c(r) * t) / (t - 1)) : 0;
  } else if ((0, o.isDefined)(n)) {
    r = e * n / t;
    a = t > 1 ? c((e - e * n) / (t - 1)) : 0;
  } else {
    r = (e - (a = c(e / t * 0.2)) * (t - 1)) / t;
  }
  return {
    width: r > 1 ? c(r) : 1,
    spacing: a,
    middleIndex: t / 2,
    rawWidth: r
  };
}
function b(e, t) {
  var n = t.rawWidth < 1 ? t.rawWidth : t.width;
  return (e - t.middleIndex + 0.5) * n - (t.middleIndex - e - 0.5) * t.spacing;
}
function x(e) {
  return e.series.filter(function (e) {
    return e.isVisible();
  });
}
function w(e, t, n) {
  return ((e.positive[t] || {})[n] || 0) + (-(e.negative[t] || {})[n] || 0);
}
function C(e) {
  if (e) {
    return function (e, t) {
      return t - e - 1;
    };
  } else {
    return function (e) {
      return e;
    };
  }
}
function S(e) {
  return e[0] && e[0].getArgumentAxis().getTranslator().isInverted();
}
function k() {
  var e = x(this);
  v(e, this._options, C(S(e)));
}
function D() {
  var e = this._options.negativesAsZeroes;
  var t = x(this);
  var n = {
    positive: {},
    negative: {}
  };
  var i = {
    left: {},
    right: {}
  };
  var o = {};
  var r = {};
  t.forEach(function (t) {
    var l = _(t);
    var u = false;
    var d = function (e) {
      var t;
      for (var n = e.getPoints(), i = 0; i < n.length; i++) {
        var o = n[i];
        t = o.initialValue && o.initialValue.valueOf();
        if (h(t) > 0) {
          break;
        }
      }
      return (0, s.sign)(t);
    }(t) < 0 ? r : o;
    t._prevSeries = d[l];
    d[l] = t;
    t.holes = (0, a.extend)(true, {}, i);
    t.getPoints().forEach(function (o, a, r) {
      var s = o.initialValue && o.initialValue.valueOf();
      var d = o.argument.valueOf();
      var c = s >= 0 ? n.positive : n.negative;
      var h = t.type !== "bar";
      if (e && s < 0) {
        c = n.positive;
        s = 0;
        o.resetValue();
      }
      c[l] = c[l] || {};
      var f = c[l];
      if (f[d]) {
        if (h) {
          o.correctValue(f[d]);
        }
        f[d] += s;
      } else {
        f[d] = s;
        if (h) {
          o.resetCorrection();
        }
      }
      if (o.hasValue()) {
        if (u) {
          u = false;
          i.left[d] = (i.left[d] || 0) + (o.value.valueOf() - (isFinite(o.minValue) ? o.minValue.valueOf() : 0));
          o._skipSetLeftHole = true;
        }
      } else {
        var p = r[a - 1];
        if (!u && p && p.hasValue()) {
          d = p.argument.valueOf();
          p._skipSetRightHole = true;
          i.right[d] = (i.right[d] || 0) + (p.value.valueOf() - (isFinite(p.minValue) ? p.minValue.valueOf() : 0));
        }
        u = true;
      }
    });
  });
  t.forEach(function (e) {
    var t = e.holes;
    e.getPoints().forEach(function (e) {
      var n = e.argument.valueOf();
      e.resetHoles();
      if (!e._skipSetLeftHole) {
        e.setHole(t.left[n] || i.left[n] && 0, "left");
      }
      if (!e._skipSetRightHole) {
        e.setHole(t.right[n] || i.right[n] && 0, "right");
      }
      e._skipSetLeftHole = null;
      e._skipSetRightHole = null;
    });
  });
  this._stackKeepers = n;
  t.forEach(function (e) {
    e.getPoints().forEach(function (t) {
      var o = t.argument.valueOf();
      var a = _(e);
      var r = w(n, a, o);
      var s = function (e, t, n) {
        return ((e.positive[t] || {})[n] || 0) + ((e.negative[t] || {})[n] || 0);
      }(n, a, o);
      t.setPercentValue(r, s, i.left[o], i.right[o]);
    });
  });
}
function I() {
  var e = this;
  var t = x(e);
  var n = e._stackKeepers;
  var i = {
    positive: {},
    negative: {}
  };
  (0, r.each)(t, function (t, o) {
    var a = o.getOptions().minBarSize;
    var s = o.getValueAxis().getTranslator();
    var l = a && s.getMinBarSize(a);
    var u = o.getStackName();
    (0, r.each)(o.getPoints(), function (t, o) {
      if (o.hasValue()) {
        var a = o.initialValue && o.initialValue.valueOf();
        var r = o.argument.valueOf();
        if (e.fullStacked) {
          a = a / w(n, u, r) || 0;
        }
        var d = s.checkMinBarSize(a, l, o.value);
        var c = function (e) {
          if (e >= 0) {
            return "positive";
          } else {
            return "negative";
          }
        }(d);
        var h = i[c][u] = i[c][u] || {};
        if (h[r]) {
          o.minValue = h[r];
          h[r] += d;
        } else {
          h[r] = d;
        }
        o.value = h[r];
      }
    });
  });
  if (e.fullStacked) {
    (function (e, t) {
      (0, r.each)(e, function (e, n) {
        var i = n.getStackName ? n.getStackName() : "default";
        (0, r.each)(n.getPoints(), function (e, n) {
          var a = w(t, i, n.argument.valueOf());
          if (a !== 0) {
            n.value = n.value / a;
            if ((0, o.isNumeric)(n.minValue)) {
              n.minValue = n.minValue / a;
            }
          }
        });
      });
    })(t, i);
  }
}
function T() {
  var e = x(this);
  (0, r.each)(e, function (e, t) {
    var n = t.getOptions().minBarSize;
    var i = t.getValueAxis().getTranslator();
    var o = n && i.getMinBarSize(n);
    if (o) {
      (0, r.each)(t.getPoints(), function (e, t) {
        if (t.hasValue() && t.value.valueOf() - t.minValue.valueOf() < o) {
          t.value = t.value.valueOf() + o / 2;
          t.minValue = t.minValue.valueOf() - o / 2;
        }
      });
    }
  });
}
function E() {
  (0, r.each)(this.series, function (e, t) {
    var n = t.getOptions().minBarSize;
    var i = t.getValueAxis().getTranslator();
    var o = n && i.getMinBarSize(n);
    if (o) {
      (0, r.each)(t.getPoints(), function (e, t) {
        if (t.hasValue()) {
          t.value = i.checkMinBarSize(t.initialValue, o);
        }
      });
    }
  });
}
function O() {
  var e = x(this);
  v(e, {
    barGroupPadding: 0.3
  }, C(S(e)));
}
function A() {
  var e = x(this);
  if (e.length) {
    var t;
    var n;
    var i = this._options;
    var o = e[0].getArgumentAxis().getVisibleArea();
    var a = e[0].getValueAxis().getVisibleArea();
    var s = g(o[1] - o[0], a[1] - a[0]);
    var l = f(i.minBubbleSize, 2);
    var u = f(s * i.maxBubbleSize, 2);
    var d = (s * i.maxBubbleSize + i.minBubbleSize) / 2;
    var m = Infinity;
    var _ = -Infinity;
    (0, r.each)(e, function (e, t) {
      (0, r.each)(t.getPoints(), function (e, t) {
        _ = _ > t.size ? _ : t.size;
        m = m < t.size ? m : t.size;
      });
    });
    var v = _ - m;
    var y = h(u - l);
    (0, r.each)(e, function (e, i) {
      (0, r.each)(i.getPoints(), function (e, i) {
        if (_ === m) {
          t = c(d);
        } else {
          n = h(i.size - m) / v;
          t = c(p(y * n + l));
        }
        i.correctCoordinates(t);
      });
    });
  }
}
function P(e) {
  this.type = (0, u.normalizeEnum)(e.type);
  this.pane = e.pane;
  this.series = [];
  this.updateOptions(e);
  switch (this.type) {
    case "bar":
      this.adjustSeriesDimensions = k;
      this.updateSeriesValues = E;
      this.adjustSeriesValues = D;
      break;
    case "rangebar":
      this.adjustSeriesDimensions = k;
      this.updateSeriesValues = T;
      break;
    case "fullstackedbar":
      this.fullStacked = true;
      this.adjustSeriesDimensions = k;
      this.adjustSeriesValues = D;
      this.updateSeriesValues = I;
      break;
    case "stackedbar":
      this.adjustSeriesDimensions = k;
      this.adjustSeriesValues = D;
      this.updateSeriesValues = I;
      break;
    case "fullstackedarea":
    case "fullstackedline":
    case "fullstackedspline":
    case "fullstackedsplinearea":
      this.fullStacked = true;
      this.adjustSeriesValues = D;
      break;
    case "stackedarea":
    case "stackedsplinearea":
    case "stackedline":
    case "stackedspline":
      this.adjustSeriesValues = D;
      break;
    case "candlestick":
    case "stock":
      this.adjustSeriesDimensions = O;
      break;
    case "bubble":
      this.adjustSeriesDimensions = A;
  }
}
P.prototype = {
  constructor: P,
  adjustSeriesDimensions: l.noop,
  adjustSeriesValues: l.noop,
  updateSeriesValues: l.noop,
  updateOptions: function (e) {
    this._options = e;
  },
  dispose: function () {
    this.series = null;
  },
  add: function (e) {
    var t = this.type;
    this.series = (0, u.map)(e, function (e) {
      if (e.type === t) {
        return e;
      } else {
        return null;
      }
    });
  }
};