exports.default = undefined;
require("./30869.js");
var i = require("./35922.js");
var o = require("./95479.js");
var a = require("./19157.js");
var r = require("./60810.js");
var s = Math;
var l = s.floor;
var u = s.max;
var d = s.abs;
function c(e, t) {
  if (e.isLogarithmic) {
    var n = e.logarithmicBase;
    var i = e.tickValues;
    e.minValue = t.transform(e.minValue, n);
    e.oldMinValue = t.transform(e.oldMinValue, n);
    e.maxValue = t.transform(e.maxValue, n);
    e.oldMaxValue = t.transform(e.oldMaxValue, n);
    e.tickInterval = s.round(e.tickInterval);
    if (e.tickInterval < 1) {
      e.tickInterval = 1;
    }
    var o = t.getTicks(e.tickInterval, i, n);
    o.tickInterval = e.tickInterval;
    e.tickValues = o;
  }
}
function h(e) {
  return e.reduce(function (e, t) {
    var n;
    var o;
    var s = t.getTicksValues();
    var l = s.majorTicksValues;
    var u = t.getOptions();
    var h = t.getTranslator().getBusinessRange();
    var f = t.getVisibleArea();
    var p = t._tickInterval;
    var g = u.synchronizedValue;
    var m = t.getViewport().action;
    if (l && l.length > 0 && (0, i.isNumeric)(l[0]) && u.type !== "discrete" && !h.isEmpty() && (!h.breaks || !h.breaks.length) && m !== "zoom" && m !== "pan") {
      t.applyMargins();
      var _ = t.getTranslator().from(f[0]);
      var v = t.getTranslator().from(f[1]);
      var y = _ < v ? _ : v;
      var b = _ < v ? v : _;
      if (y === b && (0, i.isDefined)(g)) {
        p = d(l[0] - g) || 1;
        y = l[0] - p;
        b = l[0] + p;
      }
      c(n = {
        axis: t,
        isLogarithmic: u.type === "logarithmic",
        logarithmicBase: h.base,
        tickValues: l,
        minorValues: s.minorTicksValues,
        minorTickInterval: t._minorTickInterval,
        minValue: y,
        oldMinValue: y,
        maxValue: b,
        oldMaxValue: b,
        inverted: h.invert,
        tickInterval: p,
        synchronizedValue: g
      }, (o = t.getTranslator().getBusinessRange(), {
        transform: function (e, t) {
          return (0, r.adjust)((0, a.getLogExt)(e, t, o.allowNegatives, o.linearThreshold));
        },
        getTicks: function (e, t, n) {
          for (var i = [], o = this.transform(t[0], n); i.length < t.length;) {
            i.push(o);
            o = (0, r.adjust)(o + e);
          }
          return i;
        }
      }));
      e.push(n);
    }
    return e;
  }, []);
}
function f(e) {
  return e.maxValue - e.minValue || 1;
}
function p(e) {
  for (var t = 0; t < e.length; t++) {
    if (!e[t].stubData) {
      return e[t];
    }
  }
  return null;
}
var g = {
  synchronize: function (e) {
    (0, o.each)(function (e) {
      var t = {};
      e.forEach(function (e) {
        var n = e.pane;
        t[n] ||= [];
        t[n].push(e);
      });
      return t;
    }(e), function (e, t) {
      var n;
      var o;
      if (t.length > 1) {
        if ((n = h(t)).length < 2 || !p(n)) {
          return;
        }
        (function (e) {
          var t = e.reduce(function (e, t) {
            return u(e, t.tickValues.length);
          }, 0);
          e.forEach(function (e) {
            var n;
            var o;
            var a = 0;
            var s = e.synchronizedValue;
            var u = e.tickValues;
            var d = e.tickInterval;
            if ((0, i.isDefined)(s)) {
              e.baseTickValue = e.invertedBaseTickValue = s;
              e.tickValues = [e.baseTickValue];
            } else {
              if (u.length > 1 && d) {
                o = (n = l((t + 1) / u.length)) > 1 ? l((t + 1) / n) : t;
                a = l((o - u.length) / 2);
                while (a > 0 && u[0] !== 0) {
                  u.unshift((0, r.adjust)(u[0] - d));
                  a--;
                }
                while (u.length < o) {
                  u.push((0, r.adjust)(u[u.length - 1] + d));
                }
                e.tickInterval = d / n;
              }
              e.baseTickValue = u[0];
              e.invertedBaseTickValue = u[u.length - 1];
            }
          });
        })(n);
        (function (e) {
          var t = p(e);
          var n = t.tickInterval;
          e.forEach(function (e) {
            var o;
            var a;
            var r;
            var s;
            if (e !== t) {
              if (n && e.tickInterval) {
                if (e.stubData && (0, i.isDefined)(e.synchronizedValue)) {
                  e.oldMinValue = e.minValue = e.baseTickValue - (t.baseTickValue - t.minValue) / n * e.tickInterval;
                  e.oldMaxValue = e.maxValue = e.baseTickValue - (t.baseTickValue - t.maxValue) / n * e.tickInterval;
                }
                o = n / f(t) / e.tickInterval * f(e);
                e.maxValue = e.minValue + f(e) / o;
              }
              r = t.inverted && !e.inverted || !t.inverted && e.inverted ? t.maxValue - t.invertedBaseTickValue : t.baseTickValue - t.minValue;
              s = f(e);
              a = (r / f(t) - (e.baseTickValue - e.minValue) / s) * s;
              e.minValue -= a;
              e.maxValue -= a;
            }
          });
        })(n);
        o = function (e) {
          var t;
          var n;
          var i = 0;
          var o = 0;
          e.forEach(function (e) {
            var a = e.inverted;
            t = e.minValue > e.oldMinValue ? (e.minValue - e.oldMinValue) / f(e) : 0;
            n = e.maxValue < e.oldMaxValue ? (e.oldMaxValue - e.maxValue) / f(e) : 0;
            i = u(i, a ? n : t);
            o = u(o, a ? t : n);
          });
          return {
            start: i,
            end: o
          };
        }(n);
        o = function (e, t) {
          return e.reduce(function (e, t) {
            var n = t.inverted;
            var o = t.axis.getCorrectedValuesToZero(t.minValue, t.maxValue);
            var a = o.start;
            var r = o.end;
            if ((0, i.isDefined)(a) || (0, i.isDefined)(r)) {
              if (n) {
                return {
                  start: e.start,
                  end: Math.min(e.end, r)
                };
              } else {
                return {
                  start: Math.min(e.start, a),
                  end: e.end
                };
              }
            } else {
              return e;
            }
          }, t);
        }(n, o);
        (function (e, t) {
          e.forEach(function (e) {
            var n = f(e);
            var i = e.inverted;
            e.minValue = (0, r.adjust)(e.minValue - t[i ? "end" : "start"] * n);
            e.maxValue = (0, r.adjust)(e.maxValue + t[i ? "start" : "end"] * n);
          });
        })(n, o);
        (function (e) {
          var t;
          var n = [];
          e.forEach(function (e) {
            if (e.oldMaxValue - e.oldMinValue == 0) {
              n.push(e);
            } else if (!(0, i.isDefined)(t) && !(0, i.isDefined)(e.synchronizedValue)) {
              t = d((e.maxValue - e.minValue) / (e.tickValues[l(e.tickValues.length / 2)] - e.minValue || e.maxValue));
            }
          });
          if ((0, i.isDefined)(t)) {
            n.forEach(function (e) {
              var n = e.tickValues[0];
              var i = n * t;
              if (n > 0) {
                e.maxValue = i;
                e.minValue = 0;
              } else if (n < 0) {
                e.minValue = i;
                e.maxValue = 0;
              }
            });
          }
        })(n);
        (function (e) {
          var t = false;
          e.forEach(function (e) {
            t = t || (0, i.isDefined)(e.synchronizedValue);
          });
          e.forEach(function (e) {
            var n;
            var i = e.tickInterval;
            var o = e.tickValues;
            var a = e.maxValue;
            var s = e.minValue;
            if (t && i) {
              while ((n = (0, r.adjust)(o[0] - i)) >= s) {
                o.unshift(n);
              }
              for (n = o[o.length - 1]; (n = (0, r.adjust)(n + i)) <= a;) {
                o.push(n);
              }
            }
            while (o[0] + i / 10 < s) {
              o.shift();
            }
            while (o[o.length - 1] - i / 10 > a) {
              o.pop();
            }
          });
        })(n);
        (function (e) {
          e.forEach(function (e) {
            if (e.minorTickInterval) {
              var t = [];
              var n = e.minorTickInterval;
              var i = e.tickInterval / n - 1;
              for (var o = 1; o < e.tickValues.length; o++) {
                var a = e.tickValues[o - 1];
                for (var r = 0; r < i; r++) {
                  a += n;
                  t.push(a);
                }
              }
              e.minorValues = t;
            }
          });
        })(n);
        n.forEach(function (e) {
          var t;
          c(e, (t = e.axis.getTranslator().getBusinessRange(), {
            transform: function (e, n) {
              return (0, r.adjust)((0, a.raiseToExt)(e, n, t.allowNegatives, t.linearThreshold));
            },
            getTicks: function (e, t, n) {
              var i;
              var o = [];
              for (var a = 0; a < t.length; a += 1) {
                i = this.transform(t[a], n);
                o.push(i);
              }
              return o;
            }
          }));
        });
        (function (e) {
          e.forEach(function (e) {
            var t = e.axis;
            var n = t.getTranslator().getBusinessRange();
            if (n.min === n.minVisible) {
              n.min = e.minValue;
            }
            if (n.max === n.maxVisible) {
              n.max = e.maxValue;
            }
            n.minVisible = e.minValue;
            n.maxVisible = e.maxValue;
            if (n.min > n.minVisible) {
              n.min = n.minVisible;
            }
            if (n.max < n.maxVisible) {
              n.max = n.maxVisible;
            }
            t.getTranslator().updateBusinessRange(n);
            t.setTicks({
              majorTicks: e.tickValues,
              minorTicks: e.minorValues
            });
          });
        })(n);
      }
    });
  }
};
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;