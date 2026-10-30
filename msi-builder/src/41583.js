exports.formatRange = function (e) {
  var t = e.startValue;
  var n = e.endValue;
  var r = e.tickInterval;
  var s = e.argumentFormat;
  var l = e.axisOptions;
  var d = l.dataType;
  var c = l.type;
  var h = l.logarithmBase;
  if (c === "discrete") {
    return "";
  }
  if (d === "datetime") {
    return function (e, t, n) {
      var o = g(e, t);
      var r = a.default.getDateFormatByTickInterval(n);
      var s = b(i.default.getDateFormatByDifferences(o, r));
      var l = [];
      if (n in o) {
        var d = function (e, t) {
          var n = false;
          for (var o in e) {
            if (n) {
              e[o] = false;
            } else if (o === t) {
              n = true;
            } else {
              e[o] = true;
            }
          }
          return b(i.default.getDateFormatByDifferences(e));
        }(g(e, t), n);
        var c = u(e, d);
        if (c) {
          l.push(c);
        }
      } else {
        var h = function (e) {
          var t = false;
          for (var n in e) {
            if (e[n] === true || n === "hour" || t) {
              e[n] = false;
              t = true;
            } else if (e[n] === false) {
              e[n] = true;
            }
          }
          return b(i.default.getDateFormatByDifferences(e));
        }(g(e, t));
        var f = u(e, h);
        if (f) {
          l.push(f);
        }
        l.push(`${u(e, s)} - ${u(t, s)}`);
      }
      return l.join(", ");
    }(t, n, function (e) {
      if ((0, o.isObject)(e)) {
        var t = Object.keys(e);
        if (t.reduce(function (t, n) {
          return e[n] + t;
        }, 0) === 1) {
          var n = t.filter(function (t) {
            return e[t] === 1;
          })[0];
          return n.slice(0, n.length - 1);
        }
      }
      return e;
    }(r));
  }
  var f = {
    ticks: [],
    type: c,
    dataType: d,
    tickInterval: r,
    logarithmBase: h,
    labelOptions: {
      format: s
    }
  };
  return `${w(t, f)} - ${w(n, f)}`;
};
exports.smartFormatter = w;
var i = l(require("./30343.js"));
var o = require("./35922.js");
var a = l(require("./91198.js"));
var r = require("./60810.js");
var s = require("./19157.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = i.default.format;
var d = Math.abs;
var c = Math.floor;
var h = ["fixedPoint", "thousands", "millions", "billions", "trillions", "exponential"];
var f = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
var p = {
  week: "day",
  quarter: "month",
  shorttime: "hour",
  longtime: "second"
};
function g(e, t, n, i) {
  i = p[i] || i;
  var o = f.indexOf(i);
  if (n) {
    var r = a.default.getDatesDifferences(t, n);
    if (r[i]) {
      (function (e, t) {
        for (var n = t; n < f.length - 1; n++) {
          var i = f[n];
          if (n === t) {
            _(e, t + (e.millisecond ? 2 : 1));
            break;
          }
          if (e[i] && e.count > 1) {
            m(e, n);
            break;
          }
        }
      })(r, o);
    }
    return r;
  }
  var s = a.default.getDatesDifferences(e, t);
  if (!function (e, t) {
    var n = false;
    for (var i = f.length - 1; i >= t; i--) {
      if (e[f[i]] && i - t > 1) {
        for (var o = 0; o <= t; o++) {
          m(e, o);
          n = true;
        }
        break;
      }
    }
    return n;
  }(s, o) && s.count === 1) {
    _(s, o);
  }
  return s;
}
function m(e, t) {
  var n = f[t];
  if (e[n]) {
    e[n] = false;
    e.count--;
  }
}
function _(e, t) {
  var n = f[t];
  if (e[n] === false) {
    e[n] = true;
    e.count++;
  }
}
function v(e, t) {
  var n;
  var i;
  var o;
  var a = 0;
  o = d(t - e[0]);
  n = 1;
  for (; n < e.length; n++) {
    if ((i = d(t - e[n])) < o) {
      o = i;
      a = n;
    }
  }
  return a;
}
function y(e) {
  return e.toString().split(".");
}
function b(e) {
  var t;
  if ((0, o.isFunction)(e)) {
    t = e;
    e = null;
  }
  return {
    type: e,
    formatter: t
  };
}
function x(e, t) {
  var n;
  var i = d(e).toString();
  if ((0, o.isExponential)(e)) {
    return Math.max(d((0, r.getExponent)(e) - (0, r.getExponent)(t)), d((0, r.getPrecision)(e) - (0, r.getPrecision)(t)));
  } else {
    return d((n = i.split(".")[1]).length - parseInt(n).toString().length - (0, r.getExponent)(t) + 1);
  }
}
function w(e, t) {
  var n = t.tickInterval;
  var l = d(e).toString();
  var f = t.labelOptions.format;
  var p = t.ticks;
  var m = t.type === "logarithmic";
  if (p.length === 1 && p.indexOf(e) === 0 && !(0, o.isDefined)(n)) {
    n = d(e) >= 1 ? 1 : (0, r.adjust)(1 - d(e), e);
  }
  if (Object.is(e, -0)) {
    e = 0;
  }
  if (!(0, o.isDefined)(f) && t.type !== "discrete" && e && (t.logarithmBase === 10 || !m)) {
    if (t.dataType !== "datetime" && (0, o.isDefined)(n)) {
      if (p.length && p.indexOf(e) === -1) {
        var _ = v(p, e);
        n = (0, r.adjust)(d(e - p[_]), e);
      }
      if (m) {
        return function (e) {
          var t;
          var n = (0, s.getAdjustedLog10)(d(e));
          if (n > 0) {
            t = h[c(n / 3)] || "exponential";
          } else {
            if (!(n < -4)) {
              return u((0, r.adjust)(e));
            }
            t = "exponential";
          }
          return u(e, {
            type: t,
            precision: 0
          });
        }(e);
      }
      var w = y(n);
      if (w < 2) {
        w = y(e);
      }
      f = w.length > 1 && !(0, o.isExponential)(n) ? {
        type: h[0],
        precision: w[1].length
      } : (0, o.isExponential)(n) && (l.indexOf(".") !== -1 || (0, o.isExponential)(e)) ? {
        type: "exponential",
        precision: x(e, n)
      } : function (e, t) {
        var n;
        var i = c((0, s.getAdjustedLog10)(t));
        var o = 0;
        var a = n = c((0, s.getAdjustedLog10)(d(e)));
        if (n - i >= 2) {
          a = i;
        }
        var r = c(a / 3);
        var l = r * 3;
        if (r < 0) {
          r = 0;
        }
        var u = h[r] || h[h.length - 1];
        if (l > 0) {
          var f = y(t / Math.pow(10, l));
          if (f[1]) {
            o = f[1].length;
          }
        }
        return {
          precision: o,
          type: u
        };
      }(e, n);
    } else if (t.dataType === "datetime") {
      f = function (e, t) {
        var n;
        var o;
        var r = t.showTransition;
        var s = t.ticks;
        var l = t.tickInterval;
        var u = a.default.getDateFormatByTickInterval(l);
        if (r && s.length) {
          var d = s.map(Number).indexOf(+e);
          if (s.length === 1 && d === 0) {
            u = i.default.getDateFormatByTicks(s);
          } else {
            if (d === -1) {
              n = v(s, e);
            } else {
              n = d === 0 ? s.length - 1 : d - 1;
              o = d === 0 ? 1 : -1;
            }
            var c = g(s[n], e, s[o], u);
            u = i.default.getDateFormatByDifferences(c, u);
          }
        }
        return b(u);
      }(e, t);
    }
  }
  return u(e, f);
}