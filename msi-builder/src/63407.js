exports.default = undefined;
var i = require("./19157.js");
var o = require("./35922.js");
var a = require("./20576.js");
var r = Math.abs;
var s = Math.floor;
var l = Math.ceil;
var u = Math.min;
function d(e, t, n) {
  e.min = e.min < t ? e.min : t;
  e.max = e.max > n ? e.max : n;
}
function c(e, t) {
  if (e !== "logarithmic") {
    return null;
  }
  var n = t.getOptions().logarithmBase;
  return function (e) {
    var t = (0, i.getLog)(r(e), n);
    return (t < 0 ? s : l)(t);
  };
}
function h(e, t, n) {
  var i = d;
  if (e === "discrete") {
    i = function (e, t, n) {
      if (t !== n) {
        e.categories.push(n);
      }
      e.categories.push(t);
    };
  } else if (t) {
    i = function (e, n) {
      var i = t.calculateInterval(n, e.prevValue);
      var o = e.interval;
      e.interval = (o < i ? o : i) || o;
      e.prevValue = n;
      d(e, n, n);
    };
  }
  if (n) {
    return function (e, t, o) {
      var a = [];
      i(e, t, o);
      if (t !== 0) {
        a.push(n(t));
      }
      if (o !== 0) {
        a.push(n(o));
      }
      var r = u.apply(null, a);
      e.linearThreshold = e.linearThreshold < r ? e.linearThreshold : r;
    };
  } else {
    return i;
  }
}
function f(e, t, n) {
  var i = {
    axisType: e,
    dataType: t
  };
  if (e === "discrete") {
    i.categories = [];
  } else {
    i.min = (0, o.isObject)(n) ? n.min : n;
    i.max = (0, o.isObject)(n) ? n.max : n;
  }
  return i;
}
function p(e) {
  e.categories &&= (0, i.unique)(e.categories);
  return e;
}
function g(e, t, n, i, a) {
  var r = function (e, t, n, i) {
    if (t && (0, o.isDefined)(t.value)) {
      var a = e.value;
      var r = t.value;
      var s = e.argument;
      var l = (n - s) * (r - a) / (t.argument - s) + a.valueOf();
      if (i.dataType === "datetime") {
        return new Date(l);
      } else {
        return l;
      }
    }
    return e.value;
  }(n, i, a, t);
  e(t, r, r);
}
function m(e) {
  return e.type.toLowerCase().indexOf("line") >= 0 || e.type.toLowerCase().indexOf("area") >= 0;
}
function _(e) {
  var t = h(e.valueAxisType);
  var n = e.getArgumentAxis();
  var r = n && e.getArgumentAxis().visualRange() || {};
  var s = m(e) ? g : a.noop;
  if (n && n.getMarginOptions().checkInterval) {
    var l = e.getArgumentAxis().getTranslator().getBusinessRange();
    var u = (0, i.getAddFunction)(l, false);
    var d = l.interval;
    if (isFinite(d) && (0, o.isDefined)(r.startValue) && (0, o.isDefined)(r.endValue)) {
      r.startValue = u(r.startValue, d, -1);
      r.endValue = u(r.endValue, d);
    }
  }
  var c = v(r);
  return function (e, n, i, a) {
    var l = n.argument;
    if (n.hasValue()) {
      if (c(l)) {
        if (!e.startCalc) {
          e.startCalc = true;
          s(t, e, n, a[i - 1], r.startValue);
        }
        t(e, n.getMinValue(), n.getMaxValue());
      } else if (!r.categories && (0, o.isDefined)(r.startValue) && l > r.startValue) {
        if (!e.startCalc) {
          s(t, e, n, a[i - 1], r.startValue);
        }
        e.endCalc = true;
        s(t, e, n, a[i - 1], r.endValue);
      }
      return e;
    } else {
      return e;
    }
  };
}
function v(e) {
  if (e.categories) {
    var t = e.categories.reduce(function (e, t) {
      e[t.valueOf()] = true;
      return e;
    }, {});
    return function (e) {
      return (0, o.isDefined)(e) && t[e.valueOf()];
    };
  }
  if ((0, o.isDefined)(e.startValue) || (0, o.isDefined)(e.endValue)) {
    if ((0, o.isDefined)(e.endValue)) {
      if ((0, o.isDefined)(e.startValue)) {
        return function (t) {
          return t >= e.startValue && t <= e.endValue;
        };
      } else {
        return function (t) {
          return t <= e.endValue;
        };
      }
    } else {
      return function (t) {
        return t >= e.startValue;
      };
    }
  } else {
    return function () {
      return true;
    };
  }
}
var y = {
  getViewPortFilter: v,
  getArgumentRange: function (e) {
    var t = e._data || [];
    var n = {};
    if (t.length) {
      if (e.argumentAxisType === "discrete") {
        n = {
          categories: t.map(function (e) {
            return e.argument;
          })
        };
      } else {
        var i;
        if (t.length > 1) {
          var o = e.getArgumentAxis().calculateInterval(t[0].argument, t[1].argument);
          var a = e.getArgumentAxis().calculateInterval(t[t.length - 1].argument, t[t.length - 2].argument);
          i = u(o, a);
        }
        n = {
          min: t[0].argument,
          max: t[t.length - 1].argument,
          interval: i
        };
      }
    }
    return p(n);
  },
  getRangeData: function (e) {
    var t = e.getPoints();
    var n = e.useAggregation();
    var i = e.getArgumentAxis();
    var a = h(e.argumentAxisType, t.length > 1 && i, c(e.argumentAxisType, i));
    var r = h(e.valueAxisType, null, c(e.valueAxisType, e.getValueAxis()));
    var s = _(e);
    var l = t.reduce(function (e, t, n, i) {
      var o = t.argument;
      if (t.isArgumentCorrect()) {
        a(e.arg, o, o);
        if (t.hasValue()) {
          r(e.val, t.getMinValue(), t.getMaxValue());
          s(e.viewport, t, n, i);
        }
        return e;
      } else {
        return e;
      }
    }, {
      arg: f(e.argumentAxisType, e.argumentType, i != null && i.aggregatedPointBetweenTicks() ? undefined : e.getArgumentRangeInitialValue()),
      val: f(e.valueAxisType, e.valueType, t.length ? e.getValueRangeInitialValue() : undefined),
      viewport: f(e.valueAxisType, e.valueType, t.length ? e.getValueRangeInitialValue() : undefined)
    });
    if (n) {
      var u = this.getArgumentRange(e);
      if (e.argumentAxisType === "discrete") {
        l.arg = u;
      } else {
        var d = i.getViewport();
        if ((0, o.isDefined)(d.startValue) || (0, o.isDefined)(d.length)) {
          a(l.arg, u.min, u.min);
        }
        if ((0, o.isDefined)(d.endValue) || (0, o.isDefined)(d.length) && (0, o.isDefined)(d.startValue)) {
          a(l.arg, u.max, u.max);
        }
      }
    }
    p(l.arg);
    p(l.val);
    return l;
  },
  getViewport: function (e) {
    var t;
    var n = e.getPoints();
    var i = _(e);
    t = f(e.valueAxisType, e.valueType, n.length ? e.getValueRangeInitialValue() : undefined);
    n.some(function (e, o) {
      i(t, e, o, n);
      return t.endCalc;
    });
    return t;
  },
  getPointsInViewPort: function (e) {
    var t = v(e.getArgumentAxis().visualRange() || {});
    var n = e.getValueAxis().visualRange() || {};
    var i = v(n);
    var o = e.getPoints();
    function r(e, t, o) {
      var a = t.getMinValue();
      var r = t.getMaxValue();
      var s = i(a);
      var l = i(r);
      if (s) {
        e.push(a);
      }
      if (r !== a && l) {
        e.push(r);
      }
      if (!!o && !s && !l) {
        if (e.length) {
          e.push(n.endValue);
        } else {
          e.push(n.startValue);
        }
      }
    }
    var s = m(e) ? function (e, n, i) {
      var o = n[i];
      var a = n[i - 1];
      var s = n[i + 1];
      if (s && t(s.argument)) {
        r(e[1], o, true);
      }
      if (a && t(a.argument)) {
        r(e[1], o, true);
      }
    } : a.noop;
    return o.reduce(function (e, n, i) {
      if (t(n.argument)) {
        r(e[0], n);
      } else {
        s(e, o, i);
      }
      return e;
    }, [[], []]);
  }
};
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;