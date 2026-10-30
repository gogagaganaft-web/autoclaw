require.d(exports, {
  Frequency: function () {
    return j;
  },
  RRule: function () {
    return We;
  },
  RRuleSet: function () {
    return Ye;
  },
  Weekday: function () {
    return o;
  },
  datetime: function () {
    return _;
  },
  rrulestr: function () {
    return $e;
  }
});
var i = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
var o = function () {
  function e(e, t) {
    if (t === 0) {
      throw new Error("Can't create weekday with n == 0");
    }
    this.weekday = e;
    this.n = t;
  }
  e.fromStr = function (t) {
    return new e(i.indexOf(t));
  };
  e.prototype.nth = function (t) {
    if (this.n === t) {
      return this;
    } else {
      return new e(this.weekday, t);
    }
  };
  e.prototype.equals = function (e) {
    return this.weekday === e.weekday && this.n === e.n;
  };
  e.prototype.toString = function () {
    var e = i[this.weekday];
    if (this.n) {
      e = (this.n > 0 ? "+" : "") + String(this.n) + e;
    }
    return e;
  };
  e.prototype.getJsWeekday = function () {
    if (this.weekday === 6) {
      return 0;
    } else {
      return this.weekday + 1;
    }
  };
  return e;
}();
function a(e) {
  return e != null;
}
function r(e) {
  return typeof e == "number";
}
function s(e) {
  return typeof e == "string" && i.includes(e);
}
var l = Array.isArray;
function u(e, t = e) {
  if (arguments.length === 1) {
    t = e;
    e = 0;
  }
  var n = [];
  for (var i = e; i < t; i++) {
    n.push(i);
  }
  return n;
}
function d(e, t) {
  var n = 0;
  var i = [];
  if (l(e)) {
    for (; n < t; n++) {
      i[n] = [].concat(e);
    }
  } else {
    for (; n < t; n++) {
      i[n] = e;
    }
  }
  return i;
}
function c(e, t, n = " ") {
  var i = String(e);
  t >>= 0;
  if (i.length > t) {
    return String(i);
  } else {
    if ((t -= i.length) > n.length) {
      n += d(n, t / n.length);
    }
    return n.slice(0, t) + String(i);
  }
}
function h(e, t) {
  var n = e % t;
  if (n * t < 0) {
    return n + t;
  } else {
    return n;
  }
}
function f(e, t) {
  return {
    div: Math.floor(e / t),
    mod: h(e, t)
  };
}
function p(e) {
  return !a(e) || e.length === 0;
}
function g(e) {
  return !p(e);
}
function m(e, t) {
  return g(e) && e.indexOf(t) !== -1;
}
function _(e, t, n, i = 0, o = 0, a = 0) {
  return new Date(Date.UTC(e, t - 1, n, i, o, a));
}
var v = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var y = _(1970, 1, 1);
var b = [6, 0, 1, 2, 3, 4, 5];
function x(e) {
  return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
}
function w(e) {
  return e instanceof Date;
}
function C(e) {
  return w(e) && !isNaN(e.getTime());
}
function S(e) {
  return e.getTimezoneOffset() * 60 * 1000;
}
function k(e) {
  n = y;
  i = (t = e).getTime() - S(t) - (n.getTime() - S(n));
  return Math.round(i / 86400000);
  var t;
  var n;
  var i;
}
function D(e) {
  return new Date(y.getTime() + e * 86400000);
}
function I(e) {
  var t = e.getUTCMonth();
  if (t === 1 && x(e.getUTCFullYear())) {
    return 29;
  } else {
    return v[t];
  }
}
function T(e) {
  return b[e.getUTCDay()];
}
function E(e, t) {
  var n = _(e, t + 1, 1);
  return [T(n), I(n)];
}
function O(e, t) {
  t = t || e;
  return new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
}
function A(e) {
  return new Date(e.getTime());
}
function P(e) {
  var t = [];
  for (var n = 0; n < e.length; n++) {
    t.push(A(e[n]));
  }
  return t;
}
function M(e) {
  e.sort(function (e, t) {
    return e.getTime() - t.getTime();
  });
}
function R(e, t = true) {
  var n = new Date(e);
  return [c(n.getUTCFullYear().toString(), 4, "0"), c(n.getUTCMonth() + 1, 2, "0"), c(n.getUTCDate(), 2, "0"), "T", c(n.getUTCHours(), 2, "0"), c(n.getUTCMinutes(), 2, "0"), c(n.getUTCSeconds(), 2, "0"), t ? "Z" : ""].join("");
}
function B(e) {
  var t = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z?)?$/.exec(e);
  if (!t) {
    throw new Error(`Invalid UNTIL value: ${e}`);
  }
  return new Date(Date.UTC(parseInt(t[1], 10), parseInt(t[2], 10) - 1, parseInt(t[3], 10), parseInt(t[5], 10) || 0, parseInt(t[6], 10) || 0, parseInt(t[7], 10) || 0));
}
function L(e, t) {
  return e.toLocaleString("sv-SE", {
    timeZone: t
  }).replace(" ", "T") + "Z";
}
var V = function () {
  function e(e, t) {
    this.minDate = null;
    this.maxDate = null;
    this._result = [];
    this.total = 0;
    this.method = e;
    this.args = t;
    if (e === "between") {
      this.maxDate = t.inc ? t.before : new Date(t.before.getTime() - 1);
      this.minDate = t.inc ? t.after : new Date(t.after.getTime() + 1);
    } else if (e === "before") {
      this.maxDate = t.inc ? t.dt : new Date(t.dt.getTime() - 1);
    } else if (e === "after") {
      this.minDate = t.inc ? t.dt : new Date(t.dt.getTime() + 1);
    }
  }
  e.prototype.accept = function (e) {
    ++this.total;
    var t = this.minDate && e < this.minDate;
    var n = this.maxDate && e > this.maxDate;
    if (this.method === "between") {
      if (t) {
        return true;
      }
      if (n) {
        return false;
      }
    } else if (this.method === "before") {
      if (n) {
        return false;
      }
    } else if (this.method === "after") {
      return !!t || (this.add(e), false);
    }
    return this.add(e);
  };
  e.prototype.add = function (e) {
    this._result.push(e);
    return true;
  };
  e.prototype.getValue = function () {
    var e = this._result;
    switch (this.method) {
      case "all":
      case "between":
        return e;
      case "before":
      case "after":
      default:
        if (e.length) {
          return e[e.length - 1];
        } else {
          return null;
        }
    }
  };
  e.prototype.clone = function () {
    return new e(this.method, this.args);
  };
  return e;
}();
function F(e, t) {
  return (F = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) {
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        e[n] = t[n];
      }
    }
  })(e, t);
}
function H(e, t) {
  if (typeof t != "function" && t !== null) {
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  }
  function n() {
    this.constructor = e;
  }
  F(e, t);
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function N() {
  return (N = Object.assign || function (e) {
    var t;
    for (var n = 1, i = arguments.length; n < i; n++) {
      for (var o in t = arguments[n]) {
        if (Object.prototype.hasOwnProperty.call(t, o)) {
          e[o] = t[o];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
Object.create;
function z(e, t, n) {
  if (n || arguments.length === 2) {
    var i;
    for (var o = 0, a = t.length; o < a; o++) {
      if (!!i || !(o in t)) {
        i ||= Array.prototype.slice.call(t, 0, o);
        i[o] = t[o];
      }
    }
  }
  return e.concat(i || Array.prototype.slice.call(t));
}
Object.create;
var j;
var W = function (e) {
  function t(t, n, i) {
    var o = e.call(this, t, n) || this;
    o.iterator = i;
    return o;
  }
  H(t, e);
  t.prototype.add = function (e) {
    return !!this.iterator(e, this._result.length) && (this._result.push(e), true);
  };
  return t;
}(V);
var G = {
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  tokens: {
    SKIP: /^[ \r\n\t]+|^\.$/,
    number: /^[1-9][0-9]*/,
    numberAsText: /^(one|two|three)/i,
    every: /^every/i,
    "day(s)": /^days?/i,
    "weekday(s)": /^weekdays?/i,
    "week(s)": /^weeks?/i,
    "hour(s)": /^hours?/i,
    "minute(s)": /^minutes?/i,
    "month(s)": /^months?/i,
    "year(s)": /^years?/i,
    on: /^(on|in)/i,
    at: /^(at)/i,
    the: /^the/i,
    first: /^first/i,
    second: /^second/i,
    third: /^third/i,
    nth: /^([1-9][0-9]*)(\.|th|nd|rd|st)/i,
    last: /^last/i,
    for: /^for/i,
    "time(s)": /^times?/i,
    until: /^(un)?til/i,
    monday: /^mo(n(day)?)?/i,
    tuesday: /^tu(e(s(day)?)?)?/i,
    wednesday: /^we(d(n(esday)?)?)?/i,
    thursday: /^th(u(r(sday)?)?)?/i,
    friday: /^fr(i(day)?)?/i,
    saturday: /^sa(t(urday)?)?/i,
    sunday: /^su(n(day)?)?/i,
    january: /^jan(uary)?/i,
    february: /^feb(ruary)?/i,
    march: /^mar(ch)?/i,
    april: /^apr(il)?/i,
    may: /^may/i,
    june: /^june?/i,
    july: /^july?/i,
    august: /^aug(ust)?/i,
    september: /^sep(t(ember)?)?/i,
    october: /^oct(ober)?/i,
    november: /^nov(ember)?/i,
    december: /^dec(ember)?/i,
    comma: /^(,\s*|(and|or)\s*)+/i
  }
};
function q(e, t) {
  return e.indexOf(t) !== -1;
}
function $(e) {
  return e.toString();
}
function U(e, t, n) {
  return `${t} ${n}, ${e}`;
}
var K = function () {
  function e(e, t = $, n = G, i = U) {
    this.text = [];
    this.language = n || G;
    this.gettext = t;
    this.dateFormatter = i;
    this.rrule = e;
    this.options = e.options;
    this.origOptions = e.origOptions;
    if (this.origOptions.bymonthday) {
      var o = [].concat(this.options.bymonthday);
      var r = [].concat(this.options.bynmonthday);
      o.sort(function (e, t) {
        return e - t;
      });
      r.sort(function (e, t) {
        return t - e;
      });
      this.bymonthday = o.concat(r);
      if (!this.bymonthday.length) {
        this.bymonthday = null;
      }
    }
    if (a(this.origOptions.byweekday)) {
      var s = l(this.origOptions.byweekday) ? this.origOptions.byweekday : [this.origOptions.byweekday];
      var u = String(s);
      this.byweekday = {
        allWeeks: s.filter(function (e) {
          return !e.n;
        }),
        someWeeks: s.filter(function (e) {
          return Boolean(e.n);
        }),
        isWeekdays: u.indexOf("MO") !== -1 && u.indexOf("TU") !== -1 && u.indexOf("WE") !== -1 && u.indexOf("TH") !== -1 && u.indexOf("FR") !== -1 && u.indexOf("SA") === -1 && u.indexOf("SU") === -1,
        isEveryDay: u.indexOf("MO") !== -1 && u.indexOf("TU") !== -1 && u.indexOf("WE") !== -1 && u.indexOf("TH") !== -1 && u.indexOf("FR") !== -1 && u.indexOf("SA") !== -1 && u.indexOf("SU") !== -1
      };
      function d(e, t) {
        return e.weekday - t.weekday;
      }
      this.byweekday.allWeeks.sort(d);
      this.byweekday.someWeeks.sort(d);
      if (!this.byweekday.allWeeks.length) {
        this.byweekday.allWeeks = null;
      }
      if (!this.byweekday.someWeeks.length) {
        this.byweekday.someWeeks = null;
      }
    } else {
      this.byweekday = null;
    }
  }
  e.isFullyConvertible = function (t) {
    if (!(t.options.freq in e.IMPLEMENTED)) {
      return false;
    }
    if (t.origOptions.until && t.origOptions.count) {
      return false;
    }
    for (var n in t.origOptions) {
      if (q(["dtstart", "wkst", "freq"], n)) {
        return true;
      }
      if (!q(e.IMPLEMENTED[t.options.freq], n)) {
        return false;
      }
    }
    return true;
  };
  e.prototype.isFullyConvertible = function () {
    return e.isFullyConvertible(this.rrule);
  };
  e.prototype.toString = function () {
    var t = this.gettext;
    if (!(this.options.freq in e.IMPLEMENTED)) {
      return t("RRule error: Unable to fully convert this rrule to text");
    }
    this.text = [t("every")];
    this[We.FREQUENCIES[this.options.freq]]();
    if (this.options.until) {
      this.add(t("until"));
      var n = this.options.until;
      this.add(this.dateFormatter(n.getUTCFullYear(), this.language.monthNames[n.getUTCMonth()], n.getUTCDate()));
    } else if (this.options.count) {
      this.add(t("for")).add(this.options.count.toString()).add(this.plural(this.options.count) ? t("times") : t("time"));
    }
    if (!this.isFullyConvertible()) {
      this.add(t("(~ approximate)"));
    }
    return this.text.join("");
  };
  e.prototype.HOURLY = function () {
    var e = this.gettext;
    if (this.options.interval !== 1) {
      this.add(this.options.interval.toString());
    }
    this.add(this.plural(this.options.interval) ? e("hours") : e("hour"));
  };
  e.prototype.MINUTELY = function () {
    var e = this.gettext;
    if (this.options.interval !== 1) {
      this.add(this.options.interval.toString());
    }
    this.add(this.plural(this.options.interval) ? e("minutes") : e("minute"));
  };
  e.prototype.DAILY = function () {
    var e = this.gettext;
    if (this.options.interval !== 1) {
      this.add(this.options.interval.toString());
    }
    if (this.byweekday && this.byweekday.isWeekdays) {
      this.add(this.plural(this.options.interval) ? e("weekdays") : e("weekday"));
    } else {
      this.add(this.plural(this.options.interval) ? e("days") : e("day"));
    }
    if (this.origOptions.bymonth) {
      this.add(e("in"));
      this._bymonth();
    }
    if (this.bymonthday) {
      this._bymonthday();
    } else if (this.byweekday) {
      this._byweekday();
    } else if (this.origOptions.byhour) {
      this._byhour();
    }
  };
  e.prototype.WEEKLY = function () {
    var e = this.gettext;
    if (this.options.interval !== 1) {
      this.add(this.options.interval.toString()).add(this.plural(this.options.interval) ? e("weeks") : e("week"));
    }
    if (this.byweekday && this.byweekday.isWeekdays) {
      if (this.options.interval === 1) {
        this.add(this.plural(this.options.interval) ? e("weekdays") : e("weekday"));
      } else {
        this.add(e("on")).add(e("weekdays"));
      }
    } else if (this.byweekday && this.byweekday.isEveryDay) {
      this.add(this.plural(this.options.interval) ? e("days") : e("day"));
    } else {
      if (this.options.interval === 1) {
        this.add(e("week"));
      }
      if (this.origOptions.bymonth) {
        this.add(e("in"));
        this._bymonth();
      }
      if (this.bymonthday) {
        this._bymonthday();
      } else if (this.byweekday) {
        this._byweekday();
      }
    }
  };
  e.prototype.MONTHLY = function () {
    var e = this.gettext;
    if (this.origOptions.bymonth) {
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString()).add(e("months"));
        if (this.plural(this.options.interval)) {
          this.add(e("in"));
        }
      }
      this._bymonth();
    } else {
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString());
      }
      this.add(this.plural(this.options.interval) ? e("months") : e("month"));
    }
    if (this.bymonthday) {
      this._bymonthday();
    } else if (this.byweekday && this.byweekday.isWeekdays) {
      this.add(e("on")).add(e("weekdays"));
    } else if (this.byweekday) {
      this._byweekday();
    }
  };
  e.prototype.YEARLY = function () {
    var e = this.gettext;
    if (this.origOptions.bymonth) {
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString());
        this.add(e("years"));
      }
      this._bymonth();
    } else {
      if (this.options.interval !== 1) {
        this.add(this.options.interval.toString());
      }
      this.add(this.plural(this.options.interval) ? e("years") : e("year"));
    }
    if (this.bymonthday) {
      this._bymonthday();
    } else if (this.byweekday) {
      this._byweekday();
    }
    if (this.options.byyearday) {
      this.add(e("on the")).add(this.list(this.options.byyearday, this.nth, e("and"))).add(e("day"));
    }
    if (this.options.byweekno) {
      this.add(e("in")).add(this.plural(this.options.byweekno.length) ? e("weeks") : e("week")).add(this.list(this.options.byweekno, undefined, e("and")));
    }
  };
  e.prototype._bymonthday = function () {
    var e = this.gettext;
    if (this.byweekday && this.byweekday.allWeeks) {
      this.add(e("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext, e("or"))).add(e("the")).add(this.list(this.bymonthday, this.nth, e("or")));
    } else {
      this.add(e("on the")).add(this.list(this.bymonthday, this.nth, e("and")));
    }
  };
  e.prototype._byweekday = function () {
    var e = this.gettext;
    if (this.byweekday.allWeeks && !this.byweekday.isWeekdays) {
      this.add(e("on")).add(this.list(this.byweekday.allWeeks, this.weekdaytext));
    }
    if (this.byweekday.someWeeks) {
      if (this.byweekday.allWeeks) {
        this.add(e("and"));
      }
      this.add(e("on the")).add(this.list(this.byweekday.someWeeks, this.weekdaytext, e("and")));
    }
  };
  e.prototype._byhour = function () {
    var e = this.gettext;
    this.add(e("at")).add(this.list(this.origOptions.byhour, undefined, e("and")));
  };
  e.prototype._bymonth = function () {
    this.add(this.list(this.options.bymonth, this.monthtext, this.gettext("and")));
  };
  e.prototype.nth = function (e) {
    var t;
    e = parseInt(e.toString(), 10);
    var n = this.gettext;
    if (e === -1) {
      return n("last");
    }
    var i = Math.abs(e);
    switch (i) {
      case 1:
      case 21:
      case 31:
        t = i + n("st");
        break;
      case 2:
      case 22:
        t = i + n("nd");
        break;
      case 3:
      case 23:
        t = i + n("rd");
        break;
      default:
        t = i + n("th");
    }
    if (e < 0) {
      return t + " " + n("last");
    } else {
      return t;
    }
  };
  e.prototype.monthtext = function (e) {
    return this.language.monthNames[e - 1];
  };
  e.prototype.weekdaytext = function (e) {
    var t = r(e) ? (e + 1) % 7 : e.getJsWeekday();
    return (e.n ? this.nth(e.n) + " " : "") + this.language.dayNames[t];
  };
  e.prototype.plural = function (e) {
    return e % 100 != 1;
  };
  e.prototype.add = function (e) {
    this.text.push(" ");
    this.text.push(e);
    return this;
  };
  e.prototype.list = function (e, t, n, i) {
    var o = this;
    if (i === undefined) {
      i = ",";
    }
    if (!l(e)) {
      e = [e];
    }
    t = t || function (e) {
      return e.toString();
    };
    function a(e) {
      return t && t.call(o, e);
    }
    if (n) {
      return function (e, t, n) {
        var i = "";
        for (var o = 0; o < e.length; o++) {
          if (o !== 0) {
            if (o === e.length - 1) {
              i += " " + n + " ";
            } else {
              i += t + " ";
            }
          }
          i += e[o];
        }
        return i;
      }(e.map(a), i, n);
    } else {
      return e.map(a).join(i + " ");
    }
  };
  return e;
}();
var Z = function () {
  function e(e) {
    this.done = true;
    this.rules = e;
  }
  e.prototype.start = function (e) {
    this.text = e;
    this.done = false;
    return this.nextSymbol();
  };
  e.prototype.isDone = function () {
    return this.done && this.symbol === null;
  };
  e.prototype.nextSymbol = function () {
    var e;
    var t;
    this.symbol = null;
    this.value = null;
    do {
      if (this.done) {
        return false;
      }
      e = null;
      for (var n in this.rules) {
        var i = this.rules[n].exec(this.text);
        if (i && (e === null || i[0].length > e[0].length)) {
          e = i;
          t = n;
        }
      }
      if (e != null) {
        this.text = this.text.substr(e[0].length);
        if (this.text === "") {
          this.done = true;
        }
      }
      if (e == null) {
        this.done = true;
        this.symbol = null;
        this.value = null;
        return;
      }
    } while (t === "SKIP");
    this.symbol = t;
    this.value = e;
    return true;
  };
  e.prototype.accept = function (e) {
    if (this.symbol === e) {
      if (this.value) {
        var t = this.value;
        this.nextSymbol();
        return t;
      }
      this.nextSymbol();
      return true;
    }
    return false;
  };
  e.prototype.acceptNumber = function () {
    return this.accept("number");
  };
  e.prototype.expect = function (e) {
    if (this.accept(e)) {
      return true;
    }
    throw new Error("expected " + e + " but found " + this.symbol);
  };
  return e;
}();
function Y(e, t = G) {
  var n = {};
  var i = new Z(t.tokens);
  if (i.start(e)) {
    (function () {
      i.expect("every");
      var e = i.acceptNumber();
      if (e) {
        n.interval = parseInt(e[0], 10);
      }
      if (i.isDone()) {
        throw new Error("Unexpected end");
      }
      switch (i.symbol) {
        case "day(s)":
          n.freq = We.DAILY;
          if (i.nextSymbol()) {
            (function () {
              if (!i.accept("at")) {
                return;
              }
              do {
                var e = i.acceptNumber();
                if (!e) {
                  throw new Error("Unexpected symbol " + i.symbol + ", expected hour");
                }
                for (n.byhour = [parseInt(e[0], 10)]; i.accept("comma");) {
                  if (!(e = i.acceptNumber())) {
                    throw new Error("Unexpected symbol " + i.symbol + "; expected hour");
                  }
                  n.byhour.push(parseInt(e[0], 10));
                }
              } while (i.accept("comma") || i.accept("at"));
            })();
            l();
          }
          break;
        case "weekday(s)":
          n.freq = We.WEEKLY;
          n.byweekday = [We.MO, We.TU, We.WE, We.TH, We.FR];
          i.nextSymbol();
          l();
          break;
        case "week(s)":
          n.freq = We.WEEKLY;
          if (i.nextSymbol()) {
            o();
            l();
          }
          break;
        case "hour(s)":
          n.freq = We.HOURLY;
          if (i.nextSymbol()) {
            o();
            l();
          }
          break;
        case "minute(s)":
          n.freq = We.MINUTELY;
          if (i.nextSymbol()) {
            o();
            l();
          }
          break;
        case "month(s)":
          n.freq = We.MONTHLY;
          if (i.nextSymbol()) {
            o();
            l();
          }
          break;
        case "year(s)":
          n.freq = We.YEARLY;
          if (i.nextSymbol()) {
            o();
            l();
          }
          break;
        case "monday":
        case "tuesday":
        case "wednesday":
        case "thursday":
        case "friday":
        case "saturday":
        case "sunday":
          n.freq = We.WEEKLY;
          var t = i.symbol.substr(0, 2).toUpperCase();
          n.byweekday = [We[t]];
          if (!i.nextSymbol()) {
            return;
          }
          while (i.accept("comma")) {
            if (i.isDone()) {
              throw new Error("Unexpected end");
            }
            var u = r();
            if (!u) {
              throw new Error("Unexpected symbol " + i.symbol + ", expected weekday");
            }
            n.byweekday.push(We[u]);
            i.nextSymbol();
          }
          (function () {
            i.accept("on");
            i.accept("the");
            var e = s();
            if (!e) {
              return;
            }
            n.bymonthday = [e];
            i.nextSymbol();
            while (i.accept("comma")) {
              if (!(e = s())) {
                throw new Error("Unexpected symbol " + i.symbol + "; expected monthday");
              }
              n.bymonthday.push(e);
              i.nextSymbol();
            }
          })();
          l();
          break;
        case "january":
        case "february":
        case "march":
        case "april":
        case "may":
        case "june":
        case "july":
        case "august":
        case "september":
        case "october":
        case "november":
        case "december":
          n.freq = We.YEARLY;
          n.bymonth = [a()];
          if (!i.nextSymbol()) {
            return;
          }
          while (i.accept("comma")) {
            if (i.isDone()) {
              throw new Error("Unexpected end");
            }
            var d = a();
            if (!d) {
              throw new Error("Unexpected symbol " + i.symbol + ", expected month");
            }
            n.bymonth.push(d);
            i.nextSymbol();
          }
          o();
          l();
          break;
        default:
          throw new Error("Unknown symbol");
      }
    })();
    return n;
  } else {
    return null;
  }
  function o() {
    var e = i.accept("on");
    var t = i.accept("the");
    if (e || t) {
      do {
        var o = s();
        var l = r();
        var u = a();
        if (o) {
          if (l) {
            i.nextSymbol();
            n.byweekday ||= [];
            n.byweekday.push(We[l].nth(o));
          } else {
            n.bymonthday ||= [];
            n.bymonthday.push(o);
            i.accept("day(s)");
          }
        } else if (l) {
          i.nextSymbol();
          n.byweekday ||= [];
          n.byweekday.push(We[l]);
        } else if (i.symbol === "weekday(s)") {
          i.nextSymbol();
          n.byweekday ||= [We.MO, We.TU, We.WE, We.TH, We.FR];
        } else if (i.symbol === "week(s)") {
          i.nextSymbol();
          var d = i.acceptNumber();
          if (!d) {
            throw new Error("Unexpected symbol " + i.symbol + ", expected week number");
          }
          for (n.byweekno = [parseInt(d[0], 10)]; i.accept("comma");) {
            if (!(d = i.acceptNumber())) {
              throw new Error("Unexpected symbol " + i.symbol + "; expected monthday");
            }
            n.byweekno.push(parseInt(d[0], 10));
          }
        } else {
          if (!u) {
            return;
          }
          i.nextSymbol();
          n.bymonth ||= [];
          n.bymonth.push(u);
        }
      } while (i.accept("comma") || i.accept("the") || i.accept("on"));
    }
  }
  function a() {
    switch (i.symbol) {
      case "january":
        return 1;
      case "february":
        return 2;
      case "march":
        return 3;
      case "april":
        return 4;
      case "may":
        return 5;
      case "june":
        return 6;
      case "july":
        return 7;
      case "august":
        return 8;
      case "september":
        return 9;
      case "october":
        return 10;
      case "november":
        return 11;
      case "december":
        return 12;
      default:
        return false;
    }
  }
  function r() {
    switch (i.symbol) {
      case "monday":
      case "tuesday":
      case "wednesday":
      case "thursday":
      case "friday":
      case "saturday":
      case "sunday":
        return i.symbol.substr(0, 2).toUpperCase();
      default:
        return false;
    }
  }
  function s() {
    switch (i.symbol) {
      case "last":
        i.nextSymbol();
        return -1;
      case "first":
        i.nextSymbol();
        return 1;
      case "second":
        i.nextSymbol();
        if (i.accept("last")) {
          return -2;
        } else {
          return 2;
        }
      case "third":
        i.nextSymbol();
        if (i.accept("last")) {
          return -3;
        } else {
          return 3;
        }
      case "nth":
        var e = parseInt(i.value[1], 10);
        if (e < -366 || e > 366) {
          throw new Error("Nth out of range: " + e);
        }
        i.nextSymbol();
        if (i.accept("last")) {
          return -e;
        } else {
          return e;
        }
      default:
        return false;
    }
  }
  function l() {
    if (i.symbol === "until") {
      var e = Date.parse(i.text);
      if (!e) {
        throw new Error("Cannot parse until date:" + i.text);
      }
      n.until = new Date(e);
    } else if (i.accept("for")) {
      n.count = parseInt(i.value[0], 10);
      i.expect("number");
    }
  }
}
function X(e) {
  return e < j.HOURLY;
}
(function (e) {
  e[e.YEARLY = 0] = "YEARLY";
  e[e.MONTHLY = 1] = "MONTHLY";
  e[e.WEEKLY = 2] = "WEEKLY";
  e[e.DAILY = 3] = "DAILY";
  e[e.HOURLY = 4] = "HOURLY";
  e[e.MINUTELY = 5] = "MINUTELY";
  e[e.SECONDLY = 6] = "SECONDLY";
})(j ||= {});
function Q(e, t = G) {
  return new We(Y(e, t) || undefined);
}
var J = ["count", "until", "interval", "byweekday", "bymonthday", "bymonth"];
K.IMPLEMENTED = [];
K.IMPLEMENTED[j.HOURLY] = J;
K.IMPLEMENTED[j.MINUTELY] = J;
K.IMPLEMENTED[j.DAILY] = ["byhour"].concat(J);
K.IMPLEMENTED[j.WEEKLY] = J;
K.IMPLEMENTED[j.MONTHLY] = J;
K.IMPLEMENTED[j.YEARLY] = ["byweekno", "byyearday"].concat(J);
var ee = K.isFullyConvertible;
var te = function () {
  function e(e, t, n, i) {
    this.hour = e;
    this.minute = t;
    this.second = n;
    this.millisecond = i || 0;
  }
  e.prototype.getHours = function () {
    return this.hour;
  };
  e.prototype.getMinutes = function () {
    return this.minute;
  };
  e.prototype.getSeconds = function () {
    return this.second;
  };
  e.prototype.getMilliseconds = function () {
    return this.millisecond;
  };
  e.prototype.getTime = function () {
    return (this.hour * 60 * 60 + this.minute * 60 + this.second) * 1000 + this.millisecond;
  };
  return e;
}();
var ne = function (e) {
  function t(t, n, i, o, a, r, s) {
    var l = e.call(this, o, a, r, s) || this;
    l.year = t;
    l.month = n;
    l.day = i;
    return l;
  }
  H(t, e);
  t.fromDate = function (e) {
    return new this(e.getUTCFullYear(), e.getUTCMonth() + 1, e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.valueOf() % 1000);
  };
  t.prototype.getWeekday = function () {
    return T(new Date(this.getTime()));
  };
  t.prototype.getTime = function () {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)).getTime();
  };
  t.prototype.getDay = function () {
    return this.day;
  };
  t.prototype.getMonth = function () {
    return this.month;
  };
  t.prototype.getYear = function () {
    return this.year;
  };
  t.prototype.addYears = function (e) {
    this.year += e;
  };
  t.prototype.addMonths = function (e) {
    this.month += e;
    if (this.month > 12) {
      var t = Math.floor(this.month / 12);
      var n = h(this.month, 12);
      this.month = n;
      this.year += t;
      if (this.month === 0) {
        this.month = 12;
        --this.year;
      }
    }
  };
  t.prototype.addWeekly = function (e, t) {
    if (t > this.getWeekday()) {
      this.day += -(this.getWeekday() + 1 + (6 - t)) + e * 7;
    } else {
      this.day += -(this.getWeekday() - t) + e * 7;
    }
    this.fixDay();
  };
  t.prototype.addDaily = function (e) {
    this.day += e;
    this.fixDay();
  };
  t.prototype.addHours = function (e, t, n) {
    for (t && (this.hour += Math.floor((23 - this.hour) / e) * e);;) {
      this.hour += e;
      var i = f(this.hour, 24);
      var o = i.div;
      var a = i.mod;
      if (o) {
        this.hour = a;
        this.addDaily(o);
      }
      if (p(n) || m(n, this.hour)) {
        break;
      }
    }
  };
  t.prototype.addMinutes = function (e, t, n, i) {
    for (t && (this.minute += Math.floor((1439 - (this.hour * 60 + this.minute)) / e) * e);;) {
      this.minute += e;
      var o = f(this.minute, 60);
      var a = o.div;
      var r = o.mod;
      if (a) {
        this.minute = r;
        this.addHours(a, false, n);
      }
      if ((p(n) || m(n, this.hour)) && (p(i) || m(i, this.minute))) {
        break;
      }
    }
  };
  t.prototype.addSeconds = function (e, t, n, i, o) {
    for (t && (this.second += Math.floor((86399 - (this.hour * 3600 + this.minute * 60 + this.second)) / e) * e);;) {
      this.second += e;
      var a = f(this.second, 60);
      var r = a.div;
      var s = a.mod;
      if (r) {
        this.second = s;
        this.addMinutes(r, false, n, i);
      }
      if ((p(n) || m(n, this.hour)) && (p(i) || m(i, this.minute)) && (p(o) || m(o, this.second))) {
        break;
      }
    }
  };
  t.prototype.fixDay = function () {
    if (!(this.day <= 28)) {
      var e = E(this.year, this.month - 1)[1];
      if (!(this.day <= e)) {
        while (this.day > e) {
          this.day -= e;
          ++this.month;
          if (this.month === 13 && (this.month = 1, ++this.year, this.year > 9999)) {
            return;
          }
          e = E(this.year, this.month - 1)[1];
        }
      }
    }
  };
  t.prototype.add = function (e, t) {
    var n = e.freq;
    var i = e.interval;
    var o = e.wkst;
    var a = e.byhour;
    var r = e.byminute;
    var s = e.bysecond;
    switch (n) {
      case j.YEARLY:
        return this.addYears(i);
      case j.MONTHLY:
        return this.addMonths(i);
      case j.WEEKLY:
        return this.addWeekly(i, o);
      case j.DAILY:
        return this.addDaily(i);
      case j.HOURLY:
        return this.addHours(i, t, a);
      case j.MINUTELY:
        return this.addMinutes(i, t, a, r);
      case j.SECONDLY:
        return this.addSeconds(i, t, a, r, s);
    }
  };
  return t;
}(te);
function ie(e) {
  var t = [];
  for (var n = 0, i = Object.keys(e); n < i.length; n++) {
    var o = i[n];
    if (!m(je, o)) {
      t.push(o);
    }
    if (w(e[o]) && !C(e[o])) {
      t.push(o);
    }
  }
  if (t.length) {
    throw new Error("Invalid options: " + t.join(", "));
  }
  return N({}, e);
}
function oe(e) {
  var t = N(N({}, ze), ie(e));
  if (a(t.byeaster)) {
    t.freq = We.YEARLY;
  }
  if (!a(t.freq) || !We.FREQUENCIES[t.freq]) {
    throw new Error(`Invalid frequency: ${t.freq} ${e.freq}`);
  }
  t.dtstart ||= new Date(new Date().setMilliseconds(0));
  if (a(t.wkst)) {
    if (!r(t.wkst)) {
      t.wkst = t.wkst.weekday;
    }
  } else {
    t.wkst = We.MO.weekday;
  }
  if (a(t.bysetpos)) {
    if (r(t.bysetpos)) {
      t.bysetpos = [t.bysetpos];
    }
    for (var n = 0; n < t.bysetpos.length; n++) {
      if ((d = t.bysetpos[n]) === 0 || !(d >= -366) || !(d <= 366)) {
        throw new Error("bysetpos must be between 1 and 366, or between -366 and -1");
      }
    }
  }
  if (!Boolean(t.byweekno) && !g(t.byweekno) && !g(t.byyearday) && !Boolean(t.bymonthday) && !g(t.bymonthday) && !a(t.byweekday) && !a(t.byeaster)) {
    switch (t.freq) {
      case We.YEARLY:
        t.bymonth ||= t.dtstart.getUTCMonth() + 1;
        t.bymonthday = t.dtstart.getUTCDate();
        break;
      case We.MONTHLY:
        t.bymonthday = t.dtstart.getUTCDate();
        break;
      case We.WEEKLY:
        t.byweekday = [T(t.dtstart)];
    }
  }
  if (a(t.bymonth) && !l(t.bymonth)) {
    t.bymonth = [t.bymonth];
  }
  if (a(t.byyearday) && !l(t.byyearday) && r(t.byyearday)) {
    t.byyearday = [t.byyearday];
  }
  if (a(t.bymonthday)) {
    if (l(t.bymonthday)) {
      var i = [];
      var u = [];
      for (n = 0; n < t.bymonthday.length; n++) {
        var d;
        if ((d = t.bymonthday[n]) > 0) {
          i.push(d);
        } else if (d < 0) {
          u.push(d);
        }
      }
      t.bymonthday = i;
      t.bynmonthday = u;
    } else if (t.bymonthday < 0) {
      t.bynmonthday = [t.bymonthday];
      t.bymonthday = [];
    } else {
      t.bynmonthday = [];
      t.bymonthday = [t.bymonthday];
    }
  } else {
    t.bymonthday = [];
    t.bynmonthday = [];
  }
  if (a(t.byweekno) && !l(t.byweekno)) {
    t.byweekno = [t.byweekno];
  }
  if (a(t.byweekday)) {
    if (r(t.byweekday)) {
      t.byweekday = [t.byweekday];
      t.bynweekday = null;
    } else if (s(t.byweekday)) {
      t.byweekday = [o.fromStr(t.byweekday).weekday];
      t.bynweekday = null;
    } else if (t.byweekday instanceof o) {
      if (!t.byweekday.n || t.freq > We.MONTHLY) {
        t.byweekday = [t.byweekday.weekday];
        t.bynweekday = null;
      } else {
        t.bynweekday = [[t.byweekday.weekday, t.byweekday.n]];
        t.byweekday = null;
      }
    } else {
      var c = [];
      var h = [];
      for (n = 0; n < t.byweekday.length; n++) {
        var f = t.byweekday[n];
        if (r(f)) {
          c.push(f);
        } else if (s(f)) {
          c.push(o.fromStr(f).weekday);
        } else if (!f.n || t.freq > We.MONTHLY) {
          c.push(f.weekday);
        } else {
          h.push([f.weekday, f.n]);
        }
      }
      t.byweekday = g(c) ? c : null;
      t.bynweekday = g(h) ? h : null;
    }
  } else {
    t.bynweekday = null;
  }
  if (a(t.byhour)) {
    if (r(t.byhour)) {
      t.byhour = [t.byhour];
    }
  } else {
    t.byhour = t.freq < We.HOURLY ? [t.dtstart.getUTCHours()] : null;
  }
  if (a(t.byminute)) {
    if (r(t.byminute)) {
      t.byminute = [t.byminute];
    }
  } else {
    t.byminute = t.freq < We.MINUTELY ? [t.dtstart.getUTCMinutes()] : null;
  }
  if (a(t.bysecond)) {
    if (r(t.bysecond)) {
      t.bysecond = [t.bysecond];
    }
  } else {
    t.bysecond = t.freq < We.SECONDLY ? [t.dtstart.getUTCSeconds()] : null;
  }
  return {
    parsedOptions: t
  };
}
function ae(e) {
  var t = e.split("\n").map(se).filter(function (e) {
    return e !== null;
  });
  return N(N({}, t[0]), t[1]);
}
function re(e) {
  var t = {};
  var n = /DTSTART(?:;TZID=([^:=]+?))?(?::|=)([^;\s]+)/i.exec(e);
  if (!n) {
    return t;
  }
  var i = n[1];
  var o = n[2];
  if (i) {
    t.tzid = i;
  }
  t.dtstart = B(o);
  return t;
}
function se(e) {
  if (!(e = e.replace(/^\s+|\s+$/, "")).length) {
    return null;
  }
  var t = /^([A-Z]+?)[:;]/.exec(e.toUpperCase());
  if (!t) {
    return le(e);
  }
  var n = t[1];
  switch (n.toUpperCase()) {
    case "RRULE":
    case "EXRULE":
      return le(e);
    case "DTSTART":
      return re(e);
    default:
      throw new Error(`Unsupported RFC prop ${n} in ${e}`);
  }
}
function le(e) {
  var t = re(e.replace(/^RRULE:/i, ""));
  e.replace(/^(?:RRULE|EXRULE):/i, "").split(";").forEach(function (n) {
    var i = n.split("=");
    var a = i[0];
    var r = i[1];
    switch (a.toUpperCase()) {
      case "FREQ":
        t.freq = j[r.toUpperCase()];
        break;
      case "WKST":
        t.wkst = Ne[r.toUpperCase()];
        break;
      case "COUNT":
      case "INTERVAL":
      case "BYSETPOS":
      case "BYMONTH":
      case "BYMONTHDAY":
      case "BYYEARDAY":
      case "BYWEEKNO":
      case "BYHOUR":
      case "BYMINUTE":
      case "BYSECOND":
        var s = function (e) {
          if (e.indexOf(",") !== -1) {
            return e.split(",").map(ue);
          }
          return ue(e);
        }(r);
        var l = a.toLowerCase();
        t[l] = s;
        break;
      case "BYWEEKDAY":
      case "BYDAY":
        t.byweekday = function (e) {
          return e.split(",").map(function (e) {
            if (e.length === 2) {
              return Ne[e];
            }
            var t = e.match(/^([+-]?\d{1,2})([A-Z]{2})$/);
            if (!t || t.length < 3) {
              throw new SyntaxError(`Invalid weekday string: ${e}`);
            }
            var n = Number(t[1]);
            var i = t[2];
            var a = Ne[i].weekday;
            return new o(a, n);
          });
        }(r);
        break;
      case "DTSTART":
      case "TZID":
        var u = re(e);
        t.tzid = u.tzid;
        t.dtstart = u.dtstart;
        break;
      case "UNTIL":
        t.until = B(r);
        break;
      case "BYEASTER":
        t.byeaster = Number(r);
        break;
      default:
        throw new Error("Unknown RRULE property '" + a + "'");
    }
  });
  return t;
}
function ue(e) {
  if (/^[+-]?\d+$/.test(e)) {
    return Number(e);
  } else {
    return e;
  }
}
var de = function () {
  function e(e, t) {
    if (isNaN(e.getTime())) {
      throw new RangeError("Invalid date passed to DateWithZone");
    }
    this.date = e;
    this.tzid = t;
  }
  Object.defineProperty(e.prototype, "isUTC", {
    get: function () {
      return !this.tzid || this.tzid.toUpperCase() === "UTC";
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.toString = function () {
    var e = R(this.date.getTime(), this.isUTC);
    if (this.isUTC) {
      return `:${e}`;
    } else {
      return `;TZID=${this.tzid}:${e}`;
    }
  };
  e.prototype.getTime = function () {
    return this.date.getTime();
  };
  e.prototype.rezonedDate = function () {
    if (this.isUTC) {
      return this.date;
    } else {
      return function (e, t) {
        var n = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var i = new Date(L(e, n));
        var o = new Date(L(e, t ?? "UTC")).getTime() - i.getTime();
        return new Date(e.getTime() - o);
      }(this.date, this.tzid);
    }
  };
  return e;
}();
function ce(e) {
  var t;
  var n = [];
  var i = "";
  for (var s = Object.keys(e), u = Object.keys(ze), d = 0; d < s.length; d++) {
    if (s[d] !== "tzid" && m(u, s[d])) {
      var c = s[d].toUpperCase();
      var h = e[s[d]];
      var f = "";
      if (a(h) && (!l(h) || h.length)) {
        switch (c) {
          case "FREQ":
            f = We.FREQUENCIES[e.freq];
            break;
          case "WKST":
            f = r(h) ? new o(h).toString() : h.toString();
            break;
          case "BYWEEKDAY":
            c = "BYDAY";
            f = (t = h, l(t) ? t : [t]).map(function (e) {
              if (e instanceof o) {
                return e;
              } else if (l(e)) {
                return new o(e[0], e[1]);
              } else {
                return new o(e);
              }
            }).toString();
            break;
          case "DTSTART":
            i = he(h, e.tzid);
            break;
          case "UNTIL":
            f = R(h, !e.tzid);
            break;
          default:
            if (l(h)) {
              var p = [];
              for (var g = 0; g < h.length; g++) {
                p[g] = String(h[g]);
              }
              f = p.toString();
            } else {
              f = String(h);
            }
        }
        if (f) {
          n.push([c, f]);
        }
      }
    }
  }
  var _ = n.map(function (e) {
    var t = e[0];
    var n = e[1];
    return `${t}=${n.toString()}`;
  }).join(";");
  var v = "";
  if (_ !== "") {
    v = `RRULE:${_}`;
  }
  return [i, v].filter(function (e) {
    return !!e;
  }).join("\n");
}
function he(e, t) {
  if (e) {
    return "DTSTART" + new de(new Date(e), t).toString();
  } else {
    return "";
  }
}
function fe(e, t) {
  if (Array.isArray(e)) {
    return !!Array.isArray(t) && e.length === t.length && e.every(function (e, n) {
      return e.getTime() === t[n].getTime();
    });
  } else if (e instanceof Date) {
    return t instanceof Date && e.getTime() === t.getTime();
  } else {
    return e === t;
  }
}
var pe = function () {
  function e() {
    this.all = false;
    this.before = [];
    this.after = [];
    this.between = [];
  }
  e.prototype._cacheAdd = function (e, t, n) {
    t &&= t instanceof Date ? A(t) : P(t);
    if (e === "all") {
      this.all = t;
    } else {
      n._value = t;
      this[e].push(n);
    }
  };
  e.prototype._cacheGet = function (e, t) {
    var n = false;
    var i = t ? Object.keys(t) : [];
    function o(e) {
      for (var n = 0; n < i.length; n++) {
        var o = i[n];
        if (!fe(t[o], e[o])) {
          return true;
        }
      }
      return false;
    }
    var a = this[e];
    if (e === "all") {
      n = this.all;
    } else if (l(a)) {
      for (var r = 0; r < a.length; r++) {
        var s = a[r];
        if (!i.length || !o(s)) {
          n = s._value;
          break;
        }
      }
    }
    if (!n && this.all) {
      var u = new V(e, t);
      for (r = 0; r < this.all.length && u.accept(this.all[r]); r++);
      n = u.getValue();
      this._cacheAdd(e, n, t);
    }
    if (l(n)) {
      return P(n);
    } else if (n instanceof Date) {
      return A(n);
    } else {
      return n;
    }
  };
  return e;
}();
var ge = z(z(z(z(z(z(z(z(z(z(z(z(z([], d(1, 31), true), d(2, 28), true), d(3, 31), true), d(4, 30), true), d(5, 31), true), d(6, 30), true), d(7, 31), true), d(8, 31), true), d(9, 30), true), d(10, 31), true), d(11, 30), true), d(12, 31), true), d(1, 7), true);
var me = z(z(z(z(z(z(z(z(z(z(z(z(z([], d(1, 31), true), d(2, 29), true), d(3, 31), true), d(4, 30), true), d(5, 31), true), d(6, 30), true), d(7, 31), true), d(8, 31), true), d(9, 30), true), d(10, 31), true), d(11, 30), true), d(12, 31), true), d(1, 7), true);
var _e = u(1, 29);
var ve = u(1, 30);
var ye = u(1, 31);
var be = u(1, 32);
var xe = z(z(z(z(z(z(z(z(z(z(z(z(z([], be, true), ve, true), be, true), ye, true), be, true), ye, true), be, true), be, true), ye, true), be, true), ye, true), be, true), be.slice(0, 7), true);
var we = z(z(z(z(z(z(z(z(z(z(z(z(z([], be, true), _e, true), be, true), ye, true), be, true), ye, true), be, true), be, true), ye, true), be, true), ye, true), be, true), be.slice(0, 7), true);
var Ce = u(-28, 0);
var Se = u(-29, 0);
var ke = u(-30, 0);
var De = u(-31, 0);
var Ie = z(z(z(z(z(z(z(z(z(z(z(z(z([], De, true), Se, true), De, true), ke, true), De, true), ke, true), De, true), De, true), ke, true), De, true), ke, true), De, true), De.slice(0, 7), true);
var Te = z(z(z(z(z(z(z(z(z(z(z(z(z([], De, true), Ce, true), De, true), ke, true), De, true), ke, true), De, true), De, true), ke, true), De, true), ke, true), De, true), De.slice(0, 7), true);
var Ee = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
var Oe = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
var Ae = function () {
  var e = [];
  for (var t = 0; t < 55; t++) {
    e = e.concat(u(7));
  }
  return e;
}();
function Pe(e, t) {
  var n;
  var i;
  var o = _(e, 1, 1);
  var a = x(e) ? 366 : 365;
  var r = x(e + 1) ? 366 : 365;
  var s = k(o);
  var l = T(o);
  var u = N(N({
    yearlen: a,
    nextyearlen: r,
    yearordinal: s,
    yearweekday: l
  }, function (e) {
    var t = x(e) ? 366 : 365;
    var n = _(e, 1, 1);
    var i = T(n);
    if (t === 365) {
      return {
        mmask: ge,
        mdaymask: we,
        nmdaymask: Te,
        wdaymask: Ae.slice(i),
        mrange: Oe
      };
    }
    return {
      mmask: me,
      mdaymask: xe,
      nmdaymask: Ie,
      wdaymask: Ae.slice(i),
      mrange: Ee
    };
  }(e)), {
    wnomask: null
  });
  if (p(t.byweekno)) {
    return u;
  }
  u.wnomask = d(0, a + 7);
  var c = n = h(7 - l + t.wkst, 7);
  if (c >= 4) {
    c = 0;
    i = u.yearlen + h(l - t.wkst, 7);
  } else {
    i = a - c;
  }
  var f = Math.floor(i / 7);
  var g = h(i, 7);
  var v = Math.floor(f + g / 4);
  for (var y = 0; y < t.byweekno.length; y++) {
    var b = t.byweekno[y];
    if (b < 0) {
      b += v + 1;
    }
    if (b > 0 && b <= v) {
      var w = undefined;
      if (b > 1) {
        w = c + (b - 1) * 7;
        if (c !== n) {
          w -= 7 - n;
        }
      } else {
        w = c;
      }
      for (var C = 0; C < 7 && (u.wnomask[w] = 1, w++, u.wdaymask[w] !== t.wkst); C++);
    }
  }
  if (m(t.byweekno, 1)) {
    w = c + v * 7;
    if (c !== n) {
      w -= 7 - n;
    }
    if (w < a) {
      for (y = 0; y < 7 && (u.wnomask[w] = 1, w += 1, u.wdaymask[w] !== t.wkst); y++);
    }
  }
  if (c) {
    var S = undefined;
    if (m(t.byweekno, -1)) {
      S = -1;
    } else {
      var D = T(_(e - 1, 1, 1));
      var I = h(7 - D.valueOf() + t.wkst, 7);
      var E = x(e - 1) ? 366 : 365;
      var O = undefined;
      if (I >= 4) {
        I = 0;
        O = E + h(D - t.wkst, 7);
      } else {
        O = a - c;
      }
      S = Math.floor(52 + h(O, 7) / 4);
    }
    if (m(t.byweekno, S)) {
      for (w = 0; w < c; w++) {
        u.wnomask[w] = 1;
      }
    }
  }
  return u;
}
var Me = function () {
  function e(e) {
    this.options = e;
  }
  e.prototype.rebuild = function (e, t) {
    var n = this.options;
    if (e !== this.lastyear) {
      this.yearinfo = Pe(e, n);
    }
    if (g(n.bynweekday) && (t !== this.lastmonth || e !== this.lastyear)) {
      var i = this.yearinfo;
      var o = i.yearlen;
      var r = i.mrange;
      var s = i.wdaymask;
      this.monthinfo = function (e, t, n, i, o, a) {
        var r = {
          lastyear: e,
          lastmonth: t,
          nwdaymask: []
        };
        var s = [];
        if (a.freq === We.YEARLY) {
          if (p(a.bymonth)) {
            s = [[0, n]];
          } else {
            for (var l = 0; l < a.bymonth.length; l++) {
              t = a.bymonth[l];
              s.push(i.slice(t - 1, t + 1));
            }
          }
        } else if (a.freq === We.MONTHLY) {
          s = [i.slice(t - 1, t + 1)];
        }
        if (p(s)) {
          return r;
        }
        r.nwdaymask = d(0, n);
        l = 0;
        for (; l < s.length; l++) {
          var u = s[l];
          var c = u[0];
          var f = u[1] - 1;
          for (var g = 0; g < a.bynweekday.length; g++) {
            var m = undefined;
            var _ = a.bynweekday[g];
            var v = _[0];
            var y = _[1];
            if (y < 0) {
              m = f + (y + 1) * 7;
              m -= h(o[m] - v, 7);
            } else {
              m = c + (y - 1) * 7;
              m += h(7 - o[m] + v, 7);
            }
            if (c <= m && m <= f) {
              r.nwdaymask[m] = 1;
            }
          }
        }
        return r;
      }(e, t, o, r, s, n);
    }
    if (a(n.byeaster)) {
      this.eastermask = function (e, t = 0) {
        var n = e % 19;
        var i = Math.floor(e / 100);
        var o = e % 100;
        var a = Math.floor(i / 4);
        var r = i % 4;
        var s = Math.floor((i + 8) / 25);
        var l = Math.floor((i - s + 1) / 3);
        var u = Math.floor(n * 19 + i - a - l + 15) % 30;
        var d = Math.floor(o / 4);
        var c = o % 4;
        var h = Math.floor(32 + r * 2 + d * 2 - u - c) % 7;
        var f = Math.floor((n + u * 11 + h * 22) / 451);
        var p = Math.floor((u + h - f * 7 + 114) / 31);
        var g = (u + h - f * 7 + 114) % 31 + 1;
        var m = Date.UTC(e, p - 1, g + t);
        var _ = Date.UTC(e, 0, 1);
        return [Math.ceil((m - _) / 86400000)];
      }(e, n.byeaster);
    }
  };
  Object.defineProperty(e.prototype, "lastyear", {
    get: function () {
      if (this.monthinfo) {
        return this.monthinfo.lastyear;
      } else {
        return null;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "lastmonth", {
    get: function () {
      if (this.monthinfo) {
        return this.monthinfo.lastmonth;
      } else {
        return null;
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "yearlen", {
    get: function () {
      return this.yearinfo.yearlen;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "yearordinal", {
    get: function () {
      return this.yearinfo.yearordinal;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "mrange", {
    get: function () {
      return this.yearinfo.mrange;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "wdaymask", {
    get: function () {
      return this.yearinfo.wdaymask;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "mmask", {
    get: function () {
      return this.yearinfo.mmask;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "wnomask", {
    get: function () {
      return this.yearinfo.wnomask;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "nwdaymask", {
    get: function () {
      if (this.monthinfo) {
        return this.monthinfo.nwdaymask;
      } else {
        return [];
      }
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "nextyearlen", {
    get: function () {
      return this.yearinfo.nextyearlen;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "mdaymask", {
    get: function () {
      return this.yearinfo.mdaymask;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(e.prototype, "nmdaymask", {
    get: function () {
      return this.yearinfo.nmdaymask;
    },
    enumerable: false,
    configurable: true
  });
  e.prototype.ydayset = function () {
    return [u(this.yearlen), 0, this.yearlen];
  };
  e.prototype.mdayset = function (e, t) {
    var n = this.mrange[t - 1];
    for (var i = this.mrange[t], o = d(null, this.yearlen), a = n; a < i; a++) {
      o[a] = a;
    }
    return [o, n, i];
  };
  e.prototype.wdayset = function (e, t, n) {
    for (var i = d(null, this.yearlen + 7), o = k(_(e, t, n)) - this.yearordinal, a = o, r = 0; r < 7 && (i[o] = o, ++o, this.wdaymask[o] !== this.options.wkst); r++);
    return [i, a, o];
  };
  e.prototype.ddayset = function (e, t, n) {
    var i = d(null, this.yearlen);
    var o = k(_(e, t, n)) - this.yearordinal;
    i[o] = o;
    return [i, o, o + 1];
  };
  e.prototype.htimeset = function (e, t, n, i) {
    var o = this;
    var a = [];
    this.options.byminute.forEach(function (t) {
      a = a.concat(o.mtimeset(e, t, n, i));
    });
    M(a);
    return a;
  };
  e.prototype.mtimeset = function (e, t, n, i) {
    var o = this.options.bysecond.map(function (n) {
      return new te(e, t, n, i);
    });
    M(o);
    return o;
  };
  e.prototype.stimeset = function (e, t, n, i) {
    return [new te(e, t, n, i)];
  };
  e.prototype.getdayset = function (e) {
    switch (e) {
      case j.YEARLY:
        return this.ydayset.bind(this);
      case j.MONTHLY:
        return this.mdayset.bind(this);
      case j.WEEKLY:
        return this.wdayset.bind(this);
      case j.DAILY:
      default:
        return this.ddayset.bind(this);
    }
  };
  e.prototype.gettimeset = function (e) {
    switch (e) {
      case j.HOURLY:
        return this.htimeset.bind(this);
      case j.MINUTELY:
        return this.mtimeset.bind(this);
      case j.SECONDLY:
        return this.stimeset.bind(this);
    }
  };
  return e;
}();
function Re(e, t, n, i, o, r) {
  var s = [];
  for (var l = 0; l < e.length; l++) {
    var u = undefined;
    var d = undefined;
    var c = e[l];
    if (c < 0) {
      u = Math.floor(c / t.length);
      d = h(c, t.length);
    } else {
      u = Math.floor((c - 1) / t.length);
      d = h(c - 1, t.length);
    }
    var f = [];
    for (var p = n; p < i; p++) {
      var g = r[p];
      if (a(g)) {
        f.push(g);
      }
    }
    var _ = undefined;
    _ = u < 0 ? f.slice(u)[0] : f[u];
    var v = t[d];
    var y = D(o.yearordinal + _);
    var b = O(y, v);
    if (!m(s, b)) {
      s.push(b);
    }
  }
  M(s);
  return s;
}
function Be(e, t) {
  var n = t.dtstart;
  var i = t.freq;
  var o = t.interval;
  var r = t.until;
  var s = t.bysetpos;
  var l = t.count;
  if (l === 0 || o === 0) {
    return Fe(e);
  }
  var u = ne.fromDate(n);
  var d = new Me(t);
  d.rebuild(u.year, u.month);
  var c = function (e, t, n) {
    var i = n.freq;
    var o = n.byhour;
    var a = n.byminute;
    var r = n.bysecond;
    if (X(i)) {
      return function (e) {
        var t = e.dtstart.getTime() % 1000;
        if (!X(e.freq)) {
          return [];
        }
        var n = [];
        e.byhour.forEach(function (i) {
          e.byminute.forEach(function (o) {
            e.bysecond.forEach(function (e) {
              n.push(new te(i, o, e, t));
            });
          });
        });
        return n;
      }(n);
    }
    if (i >= We.HOURLY && g(o) && !m(o, t.hour) || i >= We.MINUTELY && g(a) && !m(a, t.minute) || i >= We.SECONDLY && g(r) && !m(r, t.second)) {
      return [];
    }
    return e.gettimeset(i)(t.hour, t.minute, t.second, t.millisecond);
  }(d, u, t);
  while (true) {
    var h = d.getdayset(i)(u.year, u.month, u.day);
    var f = h[0];
    var p = h[1];
    var _ = h[2];
    var v = He(f, p, _, d, t);
    if (g(s)) {
      for (var y = Re(s, c, p, _, d, f), b = 0; b < y.length; b++) {
        var x = y[b];
        if (r && x > r) {
          return Fe(e);
        }
        if (x >= n) {
          var w = Ve(x, t);
          if (!e.accept(w)) {
            return Fe(e);
          }
          if (l && ! --l) {
            return Fe(e);
          }
        }
      }
    } else {
      for (b = p; b < _; b++) {
        var C = f[b];
        if (a(C)) {
          var S = D(d.yearordinal + C);
          for (var k = 0; k < c.length; k++) {
            var I = c[k];
            x = O(S, I);
            if (r && x > r) {
              return Fe(e);
            }
            if (x >= n) {
              w = Ve(x, t);
              if (!e.accept(w)) {
                return Fe(e);
              }
              if (l && ! --l) {
                return Fe(e);
              }
            }
          }
        }
      }
    }
    if (t.interval === 0) {
      return Fe(e);
    }
    u.add(t, v);
    if (u.year > 9999) {
      return Fe(e);
    }
    if (!X(i)) {
      c = d.gettimeset(i)(u.hour, u.minute, u.second, 0);
    }
    d.rebuild(u.year, u.month);
  }
}
function Le(e, t, n) {
  var i = n.bymonth;
  var o = n.byweekno;
  var a = n.byweekday;
  var r = n.byeaster;
  var s = n.bymonthday;
  var l = n.bynmonthday;
  var u = n.byyearday;
  return g(i) && !m(i, e.mmask[t]) || g(o) && !e.wnomask[t] || g(a) && !m(a, e.wdaymask[t]) || g(e.nwdaymask) && !e.nwdaymask[t] || r !== null && !m(e.eastermask, t) || (g(s) || g(l)) && !m(s, e.mdaymask[t]) && !m(l, e.nmdaymask[t]) || g(u) && (t < e.yearlen && !m(u, t + 1) && !m(u, -e.yearlen + t) || t >= e.yearlen && !m(u, t + 1 - e.yearlen) && !m(u, -e.nextyearlen + t - e.yearlen));
}
function Ve(e, t) {
  return new de(e, t.tzid).rezonedDate();
}
function Fe(e) {
  return e.getValue();
}
function He(e, t, n, i, o) {
  var a = false;
  for (var r = t; r < n; r++) {
    var s = e[r];
    if (a = Le(i, s, o)) {
      e[s] = null;
    }
  }
  return a;
}
var Ne = {
  MO: new o(0),
  TU: new o(1),
  WE: new o(2),
  TH: new o(3),
  FR: new o(4),
  SA: new o(5),
  SU: new o(6)
};
var ze = {
  freq: j.YEARLY,
  dtstart: null,
  interval: 1,
  wkst: Ne.MO,
  count: null,
  until: null,
  tzid: null,
  bysetpos: null,
  bymonth: null,
  bymonthday: null,
  bynmonthday: null,
  byyearday: null,
  byweekno: null,
  byweekday: null,
  bynweekday: null,
  byhour: null,
  byminute: null,
  bysecond: null,
  byeaster: null
};
var je = Object.keys(ze);
var We = function () {
  function e(e = {}, t = false) {
    this._cache = t ? null : new pe();
    this.origOptions = ie(e);
    var n = oe(e).parsedOptions;
    this.options = n;
  }
  e.parseText = function (e, t) {
    return Y(e, t);
  };
  e.fromText = function (e, t) {
    return Q(e, t);
  };
  e.fromString = function (t) {
    return new e(e.parseString(t) || undefined);
  };
  e.prototype._iter = function (e) {
    return Be(e, this.options);
  };
  e.prototype._cacheGet = function (e, t) {
    return !!this._cache && this._cache._cacheGet(e, t);
  };
  e.prototype._cacheAdd = function (e, t, n) {
    if (this._cache) {
      return this._cache._cacheAdd(e, t, n);
    }
  };
  e.prototype.all = function (e) {
    if (e) {
      return this._iter(new W("all", {}, e));
    }
    var t = this._cacheGet("all");
    if (t === false) {
      t = this._iter(new V("all", {}));
      this._cacheAdd("all", t);
    }
    return t;
  };
  e.prototype.between = function (e, t, n = false, i) {
    if (!C(e) || !C(t)) {
      throw new Error("Invalid date passed in to RRule.between");
    }
    var o = {
      before: t,
      after: e,
      inc: n
    };
    if (i) {
      return this._iter(new W("between", o, i));
    }
    var a = this._cacheGet("between", o);
    if (a === false) {
      a = this._iter(new V("between", o));
      this._cacheAdd("between", a, o);
    }
    return a;
  };
  e.prototype.before = function (e, t = false) {
    if (!C(e)) {
      throw new Error("Invalid date passed in to RRule.before");
    }
    var n = {
      dt: e,
      inc: t
    };
    var i = this._cacheGet("before", n);
    if (i === false) {
      i = this._iter(new V("before", n));
      this._cacheAdd("before", i, n);
    }
    return i;
  };
  e.prototype.after = function (e, t = false) {
    if (!C(e)) {
      throw new Error("Invalid date passed in to RRule.after");
    }
    var n = {
      dt: e,
      inc: t
    };
    var i = this._cacheGet("after", n);
    if (i === false) {
      i = this._iter(new V("after", n));
      this._cacheAdd("after", i, n);
    }
    return i;
  };
  e.prototype.count = function () {
    return this.all().length;
  };
  e.prototype.toString = function () {
    return ce(this.origOptions);
  };
  e.prototype.toText = function (e, t, n) {
    return function (e, t, n, i) {
      return new K(e, t, n, i).toString();
    }(this, e, t, n);
  };
  e.prototype.isFullyConvertibleToText = function () {
    return ee(this);
  };
  e.prototype.clone = function () {
    return new e(this.origOptions);
  };
  e.FREQUENCIES = ["YEARLY", "MONTHLY", "WEEKLY", "DAILY", "HOURLY", "MINUTELY", "SECONDLY"];
  e.YEARLY = j.YEARLY;
  e.MONTHLY = j.MONTHLY;
  e.WEEKLY = j.WEEKLY;
  e.DAILY = j.DAILY;
  e.HOURLY = j.HOURLY;
  e.MINUTELY = j.MINUTELY;
  e.SECONDLY = j.SECONDLY;
  e.MO = Ne.MO;
  e.TU = Ne.TU;
  e.WE = Ne.WE;
  e.TH = Ne.TH;
  e.FR = Ne.FR;
  e.SA = Ne.SA;
  e.SU = Ne.SU;
  e.parseString = ae;
  e.optionsToString = ce;
  return e;
}();
var Ge = {
  dtstart: null,
  cache: false,
  unfold: false,
  forceset: false,
  compatible: false,
  tzid: null
};
function qe(e, t) {
  var n = [];
  var i = [];
  var o = [];
  var a = [];
  var r = re(e);
  var s = r.dtstart;
  var l = r.tzid;
  (function (e, t = false) {
    if (!(e = e && e.trim())) {
      throw new Error("Invalid empty string");
    }
    if (!t) {
      return e.split(/\s/);
    }
    var n = e.split("\n");
    var i = 0;
    while (i < n.length) {
      var o = n[i] = n[i].replace(/\s+$/g, "");
      if (o) {
        if (i > 0 && o[0] === " ") {
          n[i - 1] += o.slice(1);
          n.splice(i, 1);
        } else {
          i += 1;
        }
      } else {
        n.splice(i, 1);
      }
    }
    return n;
  })(e, t.unfold).forEach(function (e) {
    if (e) {
      var r = function (e) {
        var t = function (e) {
          if (e.indexOf(":") === -1) {
            return {
              name: "RRULE",
              value: e
            };
          }
          o = e;
          a = ":";
          r = 1;
          s = o.split(a);
          var t = r ? s.slice(0, r).concat([s.slice(r).join(a)]) : s;
          var n = t[0];
          var i = t[1];
          var o;
          var a;
          var r;
          var s;
          return {
            name: n,
            value: i
          };
        }(e);
        var n = t.name;
        var i = t.value;
        var o = n.split(";");
        if (!o) {
          throw new Error("empty property name");
        }
        return {
          name: o[0].toUpperCase(),
          parms: o.slice(1),
          value: i
        };
      }(e);
      var s = r.name;
      var u = r.parms;
      var d = r.value;
      switch (s.toUpperCase()) {
        case "RRULE":
          if (u.length) {
            throw new Error(`unsupported RRULE parm: ${u.join(",")}`);
          }
          n.push(ae(e));
          break;
        case "RDATE":
          var c = (/RDATE(?:;TZID=([^:=]+))?/i.exec(e) ?? [])[1];
          if (c && !l) {
            l = c;
          }
          i = i.concat(Ke(d, u));
          break;
        case "EXRULE":
          if (u.length) {
            throw new Error(`unsupported EXRULE parm: ${u.join(",")}`);
          }
          o.push(ae(d));
          break;
        case "EXDATE":
          a = a.concat(Ke(d, u));
          break;
        case "DTSTART":
          break;
        default:
          throw new Error("unsupported property: " + s);
      }
    }
  });
  return {
    dtstart: s,
    tzid: l,
    rrulevals: n,
    rdatevals: i,
    exrulevals: o,
    exdatevals: a
  };
}
function $e(e, t = {}) {
  return function (e, t) {
    var n = qe(e, t);
    var i = n.rrulevals;
    var o = n.rdatevals;
    var a = n.exrulevals;
    var r = n.exdatevals;
    var s = n.dtstart;
    var l = n.tzid;
    var u = t.cache === false;
    if (t.compatible) {
      t.forceset = true;
      t.unfold = true;
    }
    if (t.forceset || i.length > 1 || o.length || a.length || r.length) {
      var d = new Ye(u);
      d.dtstart(s);
      d.tzid(l || undefined);
      i.forEach(function (e) {
        d.rrule(new We(Ue(e, s, l), u));
      });
      o.forEach(function (e) {
        d.rdate(e);
      });
      a.forEach(function (e) {
        d.exrule(new We(Ue(e, s, l), u));
      });
      r.forEach(function (e) {
        d.exdate(e);
      });
      if (t.compatible && t.dtstart) {
        d.rdate(s);
      }
      return d;
    }
    var c = i[0] || {};
    return new We(Ue(c, c.dtstart || t.dtstart || s, c.tzid || t.tzid || l), u);
  }(e, function (e) {
    var t = [];
    var n = Object.keys(e);
    var i = Object.keys(Ge);
    n.forEach(function (e) {
      if (!m(i, e)) {
        t.push(e);
      }
    });
    if (t.length) {
      throw new Error("Invalid options: " + t.join(", "));
    }
    return N(N({}, Ge), e);
  }(t));
}
function Ue(e, t, n) {
  return N(N({}, e), {
    dtstart: t,
    tzid: n
  });
}
function Ke(e, t) {
  (function (e) {
    e.forEach(function (e) {
      if (!/(VALUE=DATE(-TIME)?)|(TZID=)/.test(e)) {
        throw new Error("unsupported RDATE/EXDATE parm: " + e);
      }
    });
  })(t);
  return e.split(",").map(function (e) {
    return B(e);
  });
}
function Ze(e) {
  var t = this;
  return function (n) {
    if (n !== undefined) {
      t[`_${e}`] = n;
    }
    if (t[`_${e}`] !== undefined) {
      return t[`_${e}`];
    }
    for (var i = 0; i < t._rrule.length; i++) {
      var o = t._rrule[i].origOptions[e];
      if (o) {
        return o;
      }
    }
  };
}
var Ye = function (e) {
  function t(t = false) {
    var n = e.call(this, {}, t) || this;
    n.dtstart = Ze.apply(n, ["dtstart"]);
    n.tzid = Ze.apply(n, ["tzid"]);
    n._rrule = [];
    n._rdate = [];
    n._exrule = [];
    n._exdate = [];
    return n;
  }
  H(t, e);
  t.prototype._iter = function (e) {
    return function (e, t, n, i, o, a) {
      var r = {};
      var s = e.accept;
      function l(e, t) {
        n.forEach(function (n) {
          n.between(e, t, true).forEach(function (e) {
            r[Number(e)] = true;
          });
        });
      }
      o.forEach(function (e) {
        var t = new de(e, a).rezonedDate();
        r[Number(t)] = true;
      });
      e.accept = function (e) {
        var t = Number(e);
        if (isNaN(t)) {
          return s.call(this, e);
        } else {
          return !!r[t] || !(l(new Date(t - 1), new Date(t + 1)), !r[t]) || (r[t] = true, s.call(this, e));
        }
      };
      if (e.method === "between") {
        l(e.args.after, e.args.before);
        e.accept = function (e) {
          var t = Number(e);
          return !!r[t] || (r[t] = true, s.call(this, e));
        };
      }
      for (var u = 0; u < i.length; u++) {
        var d = new de(i[u], a).rezonedDate();
        if (!e.accept(new Date(d.getTime()))) {
          break;
        }
      }
      t.forEach(function (t) {
        Be(e, t.options);
      });
      var c = e._result;
      M(c);
      switch (e.method) {
        case "all":
        case "between":
          return c;
        case "before":
          return c.length && c[c.length - 1] || null;
        case "after":
        default:
          return c.length && c[0] || null;
      }
    }(e, this._rrule, this._exrule, this._rdate, this._exdate, this.tzid());
  };
  t.prototype.rrule = function (e) {
    Xe(e, this._rrule);
  };
  t.prototype.exrule = function (e) {
    Xe(e, this._exrule);
  };
  t.prototype.rdate = function (e) {
    Qe(e, this._rdate);
  };
  t.prototype.exdate = function (e) {
    Qe(e, this._exdate);
  };
  t.prototype.rrules = function () {
    return this._rrule.map(function (e) {
      return $e(e.toString());
    });
  };
  t.prototype.exrules = function () {
    return this._exrule.map(function (e) {
      return $e(e.toString());
    });
  };
  t.prototype.rdates = function () {
    return this._rdate.map(function (e) {
      return new Date(e.getTime());
    });
  };
  t.prototype.exdates = function () {
    return this._exdate.map(function (e) {
      return new Date(e.getTime());
    });
  };
  t.prototype.valueOf = function () {
    var e = [];
    if (!this._rrule.length && this._dtstart) {
      e = e.concat(ce({
        dtstart: this._dtstart
      }));
    }
    this._rrule.forEach(function (t) {
      e = e.concat(t.toString().split("\n"));
    });
    this._exrule.forEach(function (t) {
      e = e.concat(t.toString().split("\n").map(function (e) {
        return e.replace(/^RRULE:/, "EXRULE:");
      }).filter(function (e) {
        return !/^DTSTART/.test(e);
      }));
    });
    if (this._rdate.length) {
      e.push(Je("RDATE", this._rdate, this.tzid()));
    }
    if (this._exdate.length) {
      e.push(Je("EXDATE", this._exdate, this.tzid()));
    }
    return e;
  };
  t.prototype.toString = function () {
    return this.valueOf().join("\n");
  };
  t.prototype.clone = function () {
    var e = new t(!!this._cache);
    this._rrule.forEach(function (t) {
      return e.rrule(t.clone());
    });
    this._exrule.forEach(function (t) {
      return e.exrule(t.clone());
    });
    this._rdate.forEach(function (t) {
      return e.rdate(new Date(t.getTime()));
    });
    this._exdate.forEach(function (t) {
      return e.exdate(new Date(t.getTime()));
    });
    return e;
  };
  return t;
}(We);
function Xe(e, t) {
  if (!(e instanceof We)) {
    throw new TypeError(String(e) + " is not RRule instance");
  }
  if (!m(t.map(String), String(e))) {
    t.push(e);
  }
}
function Qe(e, t) {
  if (!(e instanceof Date)) {
    throw new TypeError(String(e) + " is not Date instance");
  }
  if (!m(t.map(Number), Number(e))) {
    t.push(e);
    M(t);
  }
}
function Je(e, t, n) {
  var i = !n || n.toUpperCase() === "UTC";
  var o = i ? `${e}:` : `${e};TZID=${n}:`;
  var a = t.map(function (e) {
    return R(e.valueOf(), i);
  }).join(",");
  return `${o}${a}`;
}