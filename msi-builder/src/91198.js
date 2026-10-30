exports.default = undefined;
var i = require("./35922.js");
var o = require("./60810.js");
var a = require("./95479.js");
var r = require("./78008.js");
var s = require("./25050.js");
function l(e, t, n) {
  return (l = u() ? Reflect.construct.bind() : function (e, t, n) {
    var i = [null];
    i.push.apply(i, t);
    var o = new (Function.bind.apply(e, i))();
    if (n) {
      d(o, n.prototype);
    }
    return o;
  }).apply(null, arguments);
}
function u() {
  if (typeof Reflect == "undefined" || !Reflect.construct) {
    return false;
  }
  if (Reflect.construct.sham) {
    return false;
  }
  if (typeof Proxy == "function") {
    return true;
  }
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = ["millisecond", "second", "minute", "hour", "day", "week", "month", "quarter", "year"];
function h(e) {
  var t;
  var n;
  var i;
  var o = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
  var a = {};
  for (t = o.length - 1; t >= 0; t--) {
    i = o[t];
    if ((n = Math.floor(e / (0, s.toMilliseconds)(i))) > 0) {
      a[i + "s"] = n;
      e -= f(i, n);
    }
  }
  return a;
}
function f(e, t) {
  return (0, s.toMilliseconds)(e) * t;
}
function p(e) {
  var t;
  var n = -1;
  if ((0, i.isString)(e)) {
    return e;
  } else if ((0, i.isObject)(e)) {
    (0, a.each)(e, function (e, i) {
      for (t = 0; t < c.length; t++) {
        if (i && (e === c[t] + "s" || e === c[t]) && n < t) {
          n = t;
        }
      }
    });
    return c[n];
  } else {
    return "";
  }
}
var g = {
  millisecond: "millisecond",
  second: "longtime",
  minute: "shorttime",
  hour: "shorttime",
  day: "day",
  week: "day",
  month: "month",
  quarter: "quarter",
  year: "year"
};
function m(e) {
  return Math.floor(e / 3);
}
function _(e) {
  return m(e) * 3;
}
function v(e, t, n, i) {
  e = new Date(e.getTime());
  var o;
  var a;
  var r = new Date(e.getTime());
  var s = p(t);
  switch (s) {
    case "second":
      e = new Date(Math.floor(r.getTime() / 1000) * 1000);
      break;
    case "minute":
      e = new Date(Math.floor(r.getTime() / 60000) * 60000);
      break;
    case "hour":
      e = new Date(Math.floor(r.getTime() / 3600000) * 3600000);
      break;
    case "year":
      e.setMonth(0);
    case "month":
      e.setDate(1);
    case "day":
      e.setHours(0, 0, 0, 0);
      break;
    case "week":
      (e = T(e, i || 0)).setHours(0, 0, 0, 0);
      break;
    case "quarter":
      o = _(e.getMonth());
      a = e.getMonth();
      e.setDate(1);
      e.setHours(0, 0, 0, 0);
      if (a !== o) {
        e.setMonth(o);
      }
  }
  if (n && s !== "hour" && s !== "minute" && s !== "second") {
    R(r, e);
  }
  return e;
}
function y(e) {
  return v(e, "day");
}
function b(e, t, n) {
  var o = new Date(e.getTime());
  var a = (0, i.isString)(t) ? C(t.toLowerCase()) : (0, i.isNumeric)(t) ? h(t) : t;
  if (a.years) {
    o.setFullYear(o.getFullYear() + a.years * n);
  }
  if (a.quarters) {
    o.setMonth(o.getMonth() + a.quarters * 3 * n);
  }
  if (a.months) {
    o.setMonth(o.getMonth() + a.months * n);
  }
  if (a.weeks) {
    o.setDate(o.getDate() + a.weeks * 7 * n);
  }
  if (a.days) {
    o.setDate(o.getDate() + a.days * n);
  }
  if (a.hours) {
    o.setTime(o.getTime() + a.hours * 3600000 * n);
  }
  if (a.minutes) {
    o.setTime(o.getTime() + a.minutes * 60000 * n);
  }
  if (a.seconds) {
    o.setTime(o.getTime() + a.seconds * 1000 * n);
  }
  if (a.milliseconds) {
    o.setTime(o.getTime() + a.milliseconds * n);
  }
  return o;
}
function x(e, t, n) {
  var a = n ? -1 : 1;
  if ((0, i.isDate)(e)) {
    return b(e, t, a);
  } else {
    return (0, o.adjust)(e + t * a, t);
  }
}
function w(e) {
  return L(e.getFullYear(), e.getMonth() + 1, 0).getDate();
}
function C(e) {
  var t = {};
  switch (e) {
    case "year":
      t.years = 1;
      break;
    case "month":
      t.months = 1;
      break;
    case "quarter":
      t.months = 3;
      break;
    case "week":
      t.weeks = 1;
      break;
    case "day":
      t.days = 1;
      break;
    case "hour":
      t.hours = 1;
      break;
    case "minute":
      t.minutes = 1;
      break;
    case "second":
      t.seconds = 1;
      break;
    case "millisecond":
      t.milliseconds = 1;
  }
  return t;
}
function S(e, t) {
  return k(e, t) && e.getMonth() === t.getMonth();
}
function k(e, t) {
  return e && t && e.getFullYear() === t.getFullYear();
}
function D(e) {
  return e && e.getFullYear() - e.getFullYear() % 100;
}
function I(e) {
  return e && e.getFullYear() - e.getFullYear() % 10;
}
function T(e, t) {
  var n = (e.getDay() - t + 7) % 7;
  var i = new Date(e);
  i.setDate(e.getDate() - n);
  return i;
}
function E(e) {
  return Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
}
function O(e) {
  return new Date(e, 0, 1);
}
function A(e) {
  return new Date(e, 11, 31);
}
function P(e, t) {
  var n = e.getDay() - t + 1;
  if (n <= 0) {
    n += 7;
  }
  return n;
}
function M(e, t, n) {
  var o = e;
  if ((0, i.isDefined)(e)) {
    if ((0, i.isDefined)(t) && e < t) {
      o = t;
    }
    if ((0, i.isDefined)(n) && e > n) {
      o = n;
    }
    return o;
  } else {
    return e;
  }
}
function R(e, t) {
  if ((0, i.isDefined)(e)) {
    var n = t.getHours() - e.getHours();
    if (n !== 0) {
      var o = n === 1 || n === -23 ? -1 : 1;
      var a = new Date(t.getTime() + o * 3600000);
      if (o > 0 || a.getDate() === t.getDate()) {
        t.setTime(a.getTime());
      }
    }
  }
}
function B(e, t) {
  return (t.getTimezoneOffset() - e.getTimezoneOffset()) * 60 * 1000;
}
function L(e) {
  var t = l(Date, Array.prototype.slice.call(arguments));
  t.setFullYear(e);
  return t;
}
var V = {
  dateUnitIntervals: c,
  convertMillisecondsToDateUnits: h,
  dateToMilliseconds: function (e) {
    var t = 0;
    if ((0, i.isObject)(e)) {
      (0, a.each)(e, function (e, n) {
        t += f(e.substr(0, e.length - 1), n);
      });
    }
    if ((0, i.isString)(e)) {
      t = f(e, 1);
    }
    return t;
  },
  getNextDateUnit: function (e, t) {
    switch (p(e)) {
      case "millisecond":
        return "second";
      case "second":
        return "minute";
      case "minute":
        return "hour";
      case "hour":
        return "day";
      case "day":
        if (t) {
          return "week";
        } else {
          return "month";
        }
      case "week":
        return "month";
      case "month":
        return "quarter";
      case "quarter":
      case "year":
        return "year";
      default:
        return 0;
    }
  },
  convertDateUnitToMilliseconds: f,
  getDateUnitInterval: p,
  getDateFormatByTickInterval: function (e) {
    return g[p(e)] || "";
  },
  getDatesDifferences: function (e, t) {
    var n = 0;
    var i = {
      year: e.getFullYear() !== t.getFullYear(),
      month: e.getMonth() !== t.getMonth(),
      day: e.getDate() !== t.getDate(),
      hour: e.getHours() !== t.getHours(),
      minute: e.getMinutes() !== t.getMinutes(),
      second: e.getSeconds() !== t.getSeconds(),
      millisecond: e.getMilliseconds() !== t.getMilliseconds()
    };
    (0, a.each)(i, function (e, t) {
      if (t) {
        n++;
      }
    });
    if (n === 0 && B(e, t) !== 0) {
      i.hour = true;
      n++;
    }
    i.count = n;
    return i;
  },
  correctDateWithUnitBeginning: v,
  trimTime: y,
  setToDayEnd: function (e) {
    var t = y(e);
    t.setDate(t.getDate() + 1);
    return new Date(t.getTime() - 1);
  },
  roundDateByStartDayHour: function (e, t) {
    var n = this.dateTimeFromDecimal(t);
    var i = new Date(e);
    if (e.getHours() === n.hours && e.getMinutes() < n.minutes || e.getHours() < n.hours) {
      i.setHours(n.hours, n.minutes, 0, 0);
    }
    return i;
  },
  dateTimeFromDecimal: function (e) {
    return {
      hours: Math.floor(e),
      minutes: e % 1 * 60
    };
  },
  addDateInterval: b,
  addInterval: x,
  getSequenceByInterval: function (e, t, n) {
    var o;
    var a = [];
    a.push((0, i.isDate)(e) ? new Date(e.getTime()) : e);
    o = e;
    while (o < t) {
      o = x(o, n);
      a.push(o);
    }
    return a;
  },
  getDateIntervalByString: C,
  sameHoursAndMinutes: function (e, t) {
    return e && t && e.getHours() === t.getHours() && e.getMinutes() === t.getMinutes();
  },
  sameDate: function (e, t) {
    return S(e, t) && e.getDate() === t.getDate();
  },
  sameMonthAndYear: S,
  sameMonth: S,
  sameYear: k,
  sameDecade: function (e, t) {
    if ((0, i.isDefined)(e) && (0, i.isDefined)(t)) {
      var n = e.getFullYear() - e.getFullYear() % 10;
      var o = t.getFullYear() - t.getFullYear() % 10;
      return e && t && n === o;
    }
  },
  sameCentury: function (e, t) {
    if ((0, i.isDefined)(e) && (0, i.isDefined)(t)) {
      var n = e.getFullYear() - e.getFullYear() % 100;
      var o = t.getFullYear() - t.getFullYear() % 100;
      return e && t && n === o;
    }
  },
  getDifferenceInMonth: function (e) {
    var t = 1;
    if (e === "year") {
      t = 12;
    }
    if (e === "decade") {
      t = 120;
    }
    if (e === "century") {
      t = 1200;
    }
    return t;
  },
  getDifferenceInMonthForCells: function (e) {
    var t = 1;
    if (e === "decade") {
      t = 12;
    }
    if (e === "century") {
      t = 120;
    }
    return t;
  },
  getFirstYearInDecade: I,
  getFirstDecadeInCentury: D,
  getShortDateFormat: function () {
    return "yyyy/MM/dd";
  },
  getViewFirstCellDate: function (e, t) {
    if (e === "month") {
      return L(t.getFullYear(), t.getMonth(), 1);
    } else if (e === "year") {
      return L(t.getFullYear(), 0, t.getDate());
    } else if (e === "decade") {
      return L(I(t), t.getMonth(), t.getDate());
    } else if (e === "century") {
      return L(D(t), t.getMonth(), t.getDate());
    } else {
      return undefined;
    }
  },
  getViewLastCellDate: function (e, t) {
    if (e === "month") {
      return L(t.getFullYear(), t.getMonth(), w(t));
    } else if (e === "year") {
      return L(t.getFullYear(), 11, t.getDate());
    } else if (e === "decade") {
      return L(I(t) + 9, t.getMonth(), t.getDate());
    } else if (e === "century") {
      return L(D(t) + 90, t.getMonth(), t.getDate());
    } else {
      return undefined;
    }
  },
  getViewDown: function (e) {
    switch (e) {
      case "century":
        return "decade";
      case "decade":
        return "year";
      case "year":
        return "month";
    }
  },
  getViewUp: function (e) {
    switch (e) {
      case "month":
        return "year";
      case "year":
        return "decade";
      case "decade":
        return "century";
    }
  },
  getLastMonthDay: w,
  getLastMonthDate: function (e) {
    if ((0, i.isDefined)(e)) {
      return L(e.getFullYear(), e.getMonth() + 1, 0);
    }
  },
  getFirstMonthDate: function (e) {
    if ((0, i.isDefined)(e)) {
      return L(e.getFullYear(), e.getMonth(), 1);
    }
  },
  getFirstWeekDate: T,
  getWeekNumber: function e(t, n, i) {
    var o = P(O(t.getFullYear()), n);
    var a = P(A(t.getFullYear()), n);
    var r = 7 - o + 1;
    var l = Math.ceil((function (e) {
      var t = E(e) - E(O(e.getFullYear()));
      return 1 + Math.floor(t / (0, s.toMilliseconds)("day"));
    }(t) - r) / 7);
    switch (i) {
      case "fullWeek":
        if (r === 7) {
          l++;
        }
        if (l === 0) {
          return e(A(t.getFullYear() - 1), n, i);
        } else {
          return l;
        }
      case "firstDay":
        if (r > 0) {
          l++;
        }
        if (l > 52 && o !== 7 && a !== 7 || l === 54) {
          l = 1;
        }
        return l;
      case "firstFourDays":
        if (r > 3) {
          l++;
        }
        if (l > 52 && o !== 4 && a !== 4) {
          l = 1;
        }
        if (l === 0) {
          return e(A(t.getFullYear() - 1), n, i);
        } else {
          return l;
        }
    }
  },
  normalizeDateByWeek: function (e, t) {
    var n = V.getDatesInterval(e, t, "day");
    var i = new Date(e);
    if (n >= 6) {
      i = new Date(i.setDate(i.getDate() + 7));
    }
    return i;
  },
  getQuarter: m,
  getFirstQuarterMonth: _,
  dateInRange: function (e, t, n, i) {
    if (i === "date") {
      t = t && V.correctDateWithUnitBeginning(t, "day");
      n = n && V.correctDateWithUnitBeginning(n, "day");
      e = e && V.correctDateWithUnitBeginning(e, "day");
    }
    return M(e, t, n) === e;
  },
  intervalsOverlap: function (e) {
    var t = e.firstMin;
    var n = e.firstMax;
    var i = e.secondMin;
    var o = e.secondMax;
    return t <= i && i <= n || t > i && t < o || t < o && n > o;
  },
  roundToHour: function (e) {
    var t = new Date(e.getTime());
    t.setHours(t.getHours() + 1);
    t.setMinutes(0);
    return t;
  },
  normalizeDate: M,
  getViewMinBoundaryDate: function (e, t) {
    var n = L(t.getFullYear(), t.getMonth(), 1);
    if (e === "month") {
      return n;
    } else {
      n.setMonth(0);
      if (e !== "year") {
        if (e === "decade") {
          n.setFullYear(I(t));
        }
        if (e === "century") {
          n.setFullYear(D(t));
        }
      }
      return n;
    }
  },
  getViewMaxBoundaryDate: function (e, t) {
    var n = new Date(t);
    n.setDate(w(t));
    if (e === "month") {
      return n;
    } else {
      n.setMonth(11);
      n.setDate(w(n));
      if (e !== "year") {
        if (e === "decade") {
          n.setFullYear(I(t) + 9);
        }
        if (e === "century") {
          n.setFullYear(D(t) + 99);
        }
      }
      return n;
    }
  },
  fixTimezoneGap: R,
  getTimezonesDifference: B,
  makeDate: function (e) {
    return new Date(e);
  },
  getDatesInterval: function (e, t, n) {
    var i = t.getTime() - e.getTime();
    var o = (0, s.toMilliseconds)(n) || 1;
    return Math.floor(i / o);
  },
  getDatesOfInterval: function (e, t, n) {
    var i = [];
    for (var o = new Date(e.getTime()); o < t;) {
      i.push(new Date(o.getTime()));
      o = this.addInterval(o, n);
    }
    return i;
  },
  createDateWithFullYear: L,
  sameView: function (e, t, n) {
    return V[(0, r.camelize)("same " + e)](t, n);
  }
};
var F = V;
exports.default = F;
module.exports = exports.default;
module.exports.default = exports.default;