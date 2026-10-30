exports.validateViews = exports.nextWeek = exports.isOneView = exports.getViewType = exports.getViewText = exports.getViewName = exports.getStep = exports.getNextIntervalDate = exports.getCaption = exports.formatViews = undefined;
var i = d(require("./91198.js"));
var o = d(require("./91500.js"));
var a = d(require("./28109.js"));
var r = require("./78008.js");
var s = require("./35922.js");
var l = d(require("./17381.js"));
var u = require("./27728.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = i.default.correctDateWithUnitBeginning;
var h = i.default.getFirstWeekDate;
var f = i.default.getLastMonthDay;
var p = i.default.addDateInterval;
var g = o.default.format;
var m = {
  milliseconds: 1
};
var _ = {
  days: 1
};
var v = {
  days: 7
};
function y(e) {
  return p(e, _, 1);
}
function b(e) {
  return p(e, v, 1);
}
exports.nextWeek = b;
function x(e) {
  return e.getDay() === 6 || e.getDay() === 0;
}
function w(e) {
  var t = e.date;
  var n = e.step;
  var i = e.firstDayOfWeek;
  switch (n) {
    case "day":
    case "week":
    case "month":
      return c(t, n, false, i);
    case "workWeek":
      return function (e) {
        for (var t = new Date(e); x(t);) {
          t = y(t);
        }
        return t;
      }(h(t, i));
    case "agenda":
      return new Date(t);
  }
}
function C(e, t) {
  var n;
  for (var i = t.intervalCount, o = t.step, a = t.agendaDuration, r = new Date(e), s = 0; s < i; s++) {
    n = S(r, o, a);
    r = k(n, o);
  }
  return n;
}
function S(e, t, n) {
  var i;
  switch (t) {
    case "day":
      i = y(e);
      break;
    case "week":
      i = b(e);
      break;
    case "month":
      i = function (e) {
        var t = f(e);
        return p(e, {
          days: t
        }, 1);
      }(e);
      break;
    case "workWeek":
      i = function (e) {
        var t = new Date(e);
        for (var n = 0; n < 5;) {
          if (!x(t)) {
            n++;
          }
          t = y(t);
        }
        return t;
      }(e);
      break;
    case "agenda":
      i = function (e, t) {
        return p(e, {
          days: t
        }, 1);
      }(e, n);
  }
  return function (e) {
    return p(e, m, -1);
  }(i);
}
function k(e, t) {
  var n = function (e) {
    return p(e, m, 1);
  }(e);
  if (t === "workWeek") {
    while (x(n)) {
      n = y(n);
    }
  }
  return n;
}
exports.getNextIntervalDate = function (e, t) {
  var n;
  var i = e.date;
  var o = e.step;
  var a = e.intervalCount;
  var r = e.agendaDuration;
  switch (o) {
    case "day":
      n = a * 1;
      break;
    case "week":
    case "workWeek":
      n = a * 7;
      break;
    case "agenda":
      n = r;
      break;
    case "month":
      return D(i, a, t);
  }
  return p(i, {
    days: n
  }, t);
};
function D(e, t, n) {
  var i = e.getDate();
  var o = new Date(new Date(e.getTime()).setDate(1));
  var a = new Date(o.setMonth(o.getMonth() + t * n));
  var r = f(a);
  var s = i < r ? i : r;
  var l = new Date(new Date(e.getTime()).setDate(s));
  return new Date(l.setMonth(l.getMonth() + t * n));
}
function I(e) {
  var t = e ? "abbreviated" : "wide";
  var n = o.default.getMonthNames(t);
  return function (e) {
    var t = g(e, "day");
    var i = n[e.getMonth()];
    return `${t} ${i}`;
  };
}
function T(e) {
  var t = o.default.getMonthNames("abbreviated")[e.getMonth()];
  var n = g(e, "year");
  return `${t} ${n}`;
}
function E(e) {
  return function (t) {
    var n = I(e)(t);
    var i = g(t, "year");
    return `${n} ${i}`;
  };
}
function O(e, t, n) {
  if (e.getFullYear() !== t.getFullYear()) {
    return function (e, t) {
      var n = g(e, E(true));
      var i = g(t, E(true));
      return `${n}-${i}`;
    }(e, t);
  } else {
    return function (e, t, n) {
      var i = e.getMonth() !== t.getMonth();
      var o = i || n;
      var a = i ? I(o) : "d";
      var r = g(e, a);
      var s = g(t, E(o));
      return `${r}-${s}`;
    }(e, t, n);
  }
}
function A(e, t, n, a) {
  if (i.default.sameDate(e, t)) {
    return function (e, t, n) {
      var i = I(t === "agenda" && n)(e);
      var o = g(e, "year");
      return `${i} ${o}`;
    }(e, a, n);
  } else if (a === "month") {
    return function (e, t) {
      if (i.default.sameMonth(e, t)) {
        return g(e, "monthandyear");
      }
      var n = i.default.sameYear(e, t) ? o.default.getMonthNames("abbreviated")[e.getMonth()] : T(e);
      var a = T(t);
      return `${n}-${a}`;
    }(e, t);
  } else {
    return O(e, t, n);
  }
}
exports.getCaption = function (e, t, n) {
  var i = function (e) {
    var t = w(e);
    return {
      startDate: t,
      endDate: C(t, e)
    };
  }(e);
  var o = i.startDate;
  var a = i.endDate;
  var r = A(o, a, t, e.step);
  if ((0, s.isFunction)(n)) {
    r = n({
      startDate: o,
      endDate: a,
      text: r
    });
  }
  return {
    startDate: o,
    endDate: a,
    text: r
  };
};
var P = {
  day: "day",
  week: "week",
  workWeek: "workWeek",
  month: "month",
  timelineDay: "day",
  timelineWeek: "week",
  timelineWorkWeek: "workWeek",
  timelineMonth: "month",
  agenda: "agenda"
};
exports.getStep = function (e) {
  return P[M(e)];
};
function M(e) {
  if ((0, s.isObject)(e) && e.type) {
    return e.type;
  } else {
    return e;
  }
}
exports.getViewType = M;
function R(e) {
  if ((0, s.isObject)(e)) {
    if (e.name) {
      return e.name;
    } else {
      return e.type;
    }
  } else {
    return e;
  }
}
exports.getViewName = R;
function B(e) {
  if (e.name) {
    return e.name;
  }
  var t = (0, r.camelize)(e.type || e, true);
  return a.default.format("dxScheduler-switcher" + t);
}
exports.getViewText = B;
function L(e) {
  e.forEach(function (e) {
    var t = M(e);
    if (!function (e) {
      return Object.values(u.VIEWS).includes(e);
    }(t)) {
      l.default.log("W0008", t);
    }
  });
}
exports.validateViews = L;
exports.formatViews = function (e) {
  L(e);
  return e.map(function (e) {
    var t = B(e);
    var n = M(e);
    var i = R(e);
    return {
      text: t,
      name: i,
      view: {
        text: t,
        type: n,
        name: i
      }
    };
  });
};
exports.isOneView = function (e, t) {
  return e.length === 1 && e[0].name === t;
};