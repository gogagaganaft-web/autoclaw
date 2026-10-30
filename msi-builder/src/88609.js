exports.getRecurrenceProcessor = _;
var i = l(require("./17381.js"));
var o = require("./95479.js");
var a = require("./46464.js");
var r = l(require("./91198.js"));
var s = l(require("./32511.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
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
var c = r.default.dateToMilliseconds;
var h = ["freq", "interval", "byday", "byweekno", "byyearday", "bymonth", "bymonthday", "count", "until", "byhour", "byminute", "bysecond", "bysetpos", "wkst"];
var f = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "SECONDLY", "MINUTELY", "HOURLY"];
var p = {
  SU: 0,
  MO: 1,
  TU: 2,
  WE: 3,
  TH: 4,
  FR: 5,
  SA: 6
};
var g = [];
var m = null;
function _() {
  m ||= new v();
  return m;
}
var v = function () {
  function e() {
    this.rRule = null;
    this.rRuleSet = null;
    this.validator = new y();
  }
  var t = e.prototype;
  t.generateDates = function (e) {
    var t = this;
    var n = this.evalRecurrenceRule(e.rule);
    var i = n.rule;
    if (!n.isValid || !i.freq) {
      return [];
    }
    var o = this._createRruleIntervalParams(e);
    this._initializeRRule(e, o.startIntervalDate, i.until);
    return this.rRuleSet.between(o.minViewDate, o.maxViewDate, true).filter(function (e) {
      return e.getTime() + o.appointmentDuration >= o.minViewTime;
    }).map(function (n) {
      return t._convertRruleResult(o, e, n);
    });
  };
  t._createRruleIntervalParams = function (e) {
    var t = e.start;
    var n = e.min;
    var i = e.max;
    var o = e.appointmentTimezoneOffset;
    var a = s.default.getClientTimezoneOffset(t);
    var r = s.default.getClientTimezoneOffset(n);
    var l = s.default.getClientTimezoneOffset(i);
    var u = e.end ? e.end.getTime() - e.start.getTime() : 0;
    var d = s.default.setOffsetsToDate(e.start, [-a, o]);
    var c = e.min.getTime() - r + o;
    var h = new Date(c - u);
    var f = s.default.setOffsetsToDate(e.max, [-l, o]);
    var p = s.default.getDiffBetweenClientTimezoneOffsets(e.start, d);
    return {
      startIntervalDate: d,
      minViewTime: c,
      minViewDate: h,
      maxViewDate: f,
      startIntervalDateDSTShift: p < 0 ? 0 : p,
      appointmentDuration: u
    };
  };
  t._convertRruleResult = function (e, t, n) {
    var i = s.default.getClientTimezoneOffset(n);
    var o = i / 3600000 <= -13 ? -86400000 : 0;
    var a = s.default.setOffsetsToDate(n, [i, o, -t.appointmentTimezoneOffset, e.startIntervalDateDSTShift]);
    var r = s.default.getDiffBetweenClientTimezoneOffsets(a, n);
    var l = r < 0;
    var u = s.default.setOffsetsToDate(a, [r]);
    var d = s.default.getDiffBetweenClientTimezoneOffsets(u, a);
    if (d && l) {
      return new Date(u.getTime() + d);
    } else {
      return u;
    }
  };
  t.hasRecurrence = function (e) {
    return !!this.generateDates(e).length;
  };
  t.evalRecurrenceRule = function (e) {
    var t = {
      rule: {},
      isValid: false
    };
    if (e) {
      t.rule = this._parseRecurrenceRule(e);
      t.isValid = this.validator.validateRRule(t.rule, e);
    }
    return t;
  };
  t.isValidRecurrenceRule = function (e) {
    return this.evalRecurrenceRule(e).isValid;
  };
  t.daysFromByDayRule = function (e) {
    var t = [];
    if (e.byday) {
      t = Array.isArray(e.byday) ? e.byday : e.byday.split(",");
    }
    return t.map(function (e) {
      var t = e.match(/[A-Za-z]+/);
      return !!t && t[0];
    }).filter(function (e) {
      return !!e;
    });
  };
  t.getAsciiStringByDate = function (e) {
    var t = e.getTimezoneOffset() * c("minute");
    var n = new Date(e.getTime() + t);
    return n.getFullYear() + ("0" + (n.getMonth() + 1)).slice(-2) + ("0" + n.getDate()).slice(-2) + "T" + ("0" + n.getHours()).slice(-2) + ("0" + n.getMinutes()).slice(-2) + ("0" + n.getSeconds()).slice(-2) + "Z";
  };
  t.getRecurrenceString = function (e) {
    if (e && e.freq) {
      var t = "";
      for (var n in e) {
        var i = e[n];
        if (n !== "interval" || !(i < 2)) {
          if (n === "until") {
            i = this.getAsciiStringByDate(i);
          }
          t += n + "=" + i + ";";
        }
      }
      return (t = t.substring(0, t.length - 1)).toUpperCase();
    }
  };
  t._parseExceptionToRawArray = function (e) {
    return e.match(/(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/);
  };
  t.getDateByAsciiString = function (e) {
    if (typeof e != "string") {
      return e;
    }
    var t = this._parseExceptionToRawArray(e);
    if (!t) {
      return null;
    }
    var n = u(this._createDateTuple(t), 7);
    var i = n[0];
    var o = n[1];
    var a = n[2];
    var r = n[3];
    var s = n[4];
    var l = n[5];
    if (n[6]) {
      return new Date(Date.UTC(i, o, a, r, s, l));
    } else {
      return new Date(i, o, a, r, s, l);
    }
  };
  t._dispose = function () {
    if (this.rRuleSet) {
      delete this.rRuleSet;
      this.rRuleSet = null;
    }
    if (this.rRule) {
      delete this.rRule;
      this.rRule = null;
    }
  };
  t._getTimeZoneOffset = function () {
    return new Date().getTimezoneOffset();
  };
  t._initializeRRule = function (e, t, n) {
    var i = this;
    var o = a.RRule.parseString(e.rule);
    var r = e.firstDayOfWeek;
    o.dtstart = t;
    if (!o.wkst && r) {
      o.wkst = [6, 0, 1, 2, 3, 4, 5][r];
    }
    if (n) {
      o.until = s.default.setOffsetsToDate(n, [-s.default.getClientTimezoneOffset(n), e.appointmentTimezoneOffset]);
    }
    this._createRRule(o);
    if (e.exception) {
      e.exception.split(",").map(function (e) {
        return i.getDateByAsciiString(e);
      }).forEach(function (t) {
        if (e.getPostProcessedException) {
          t = e.getPostProcessedException(t);
        }
        var n = s.default.setOffsetsToDate(t, [-s.default.getClientTimezoneOffset(t), e.appointmentTimezoneOffset]);
        i.rRuleSet.exdate(n);
      });
    }
  };
  t._createRRule = function (e) {
    this._dispose();
    this.rRuleSet = new a.RRuleSet();
    this.rRule = new a.RRule(e);
    this.rRuleSet.rrule(this.rRule);
  };
  t._parseRecurrenceRule = function (e) {
    var t = {};
    var n = e.split(";");
    for (var i = 0, o = n.length; i < o; i++) {
      var a = n[i].split("=");
      var r = a[0].toLowerCase();
      var s = a[1];
      t[r] = s;
    }
    var l = parseInt(t.count);
    if (!isNaN(l)) {
      t.count = l;
    }
    if (t.interval) {
      var u = parseInt(t.interval);
      if (!isNaN(u)) {
        t.interval = u;
      }
    } else {
      t.interval = 1;
    }
    if (t.freq && t.until) {
      t.until = this.getDateByAsciiString(t.until);
    }
    return t;
  };
  t._createDateTuple = function (e) {
    var t = e[8] !== undefined;
    e.shift();
    if (e[3] === undefined) {
      e.splice(3);
    } else {
      e.splice(3, 1);
      e.splice(6);
    }
    e[1]--;
    e.unshift(null);
    return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3]), parseInt(e[4]) || 0, parseInt(e[5]) || 0, parseInt(e[6]) || 0, t];
  };
  return e;
}();
var y = function () {
  function e() {}
  var t = e.prototype;
  t.validateRRule = function (e, t) {
    return !this._brokenRuleNameExists(e) && !!f.includes(e.freq) && !this._wrongCountRule(e) && !this._wrongIntervalRule(e) && !this._wrongDayOfWeek(e) && !this._wrongByMonthDayRule(e) && !this._wrongByMonth(e) && !this._wrongUntilRule(e) || (this._logBrokenRule(t), false);
  };
  t._wrongUntilRule = function (e) {
    var t = false;
    var n = e.until;
    if (n !== undefined && !(n instanceof Date)) {
      t = true;
    }
    return t;
  };
  t._wrongCountRule = function (e) {
    var t = false;
    var n = e.count;
    if (n && typeof n == "string") {
      t = true;
    }
    return t;
  };
  t._wrongByMonthDayRule = function (e) {
    var t = false;
    var n = e.bymonthday;
    if (n && isNaN(parseInt(n))) {
      t = true;
    }
    return t;
  };
  t._wrongByMonth = function (e) {
    var t = false;
    var n = e.bymonth;
    if (n && isNaN(parseInt(n))) {
      t = true;
    }
    return t;
  };
  t._wrongIntervalRule = function (e) {
    var t = false;
    var n = e.interval;
    if (n && typeof n == "string") {
      t = true;
    }
    return t;
  };
  t._wrongDayOfWeek = function (e) {
    var t = e.byday;
    var n = _().daysFromByDayRule(e);
    var i = false;
    if (t === "") {
      i = true;
    }
    (0, o.each)(n, function (e, t) {
      if (!Object.prototype.hasOwnProperty.call(p, t)) {
        i = true;
        return false;
      }
    });
    return i;
  };
  t._brokenRuleNameExists = function (e) {
    var t = false;
    (0, o.each)(e, function (e) {
      if (!h.includes(e)) {
        t = true;
        return false;
      }
    });
    return t;
  };
  t._logBrokenRule = function (e) {
    if (!g.includes(e)) {
      i.default.log("W0006", e);
      g.push(e);
    }
  };
  return e;
}();