function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
require("./74872.js");
require("./908.js");
require("./71272.js");
var o = u(require("./71272.js"));
var a = u(require("./91500.js"));
var r = require("./35922.js");
var s = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = l(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./95479.js"));
function l(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (l = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = ["skeleton", "date", "time", "datetime", "raw"];
var c = /[\u200E\u200F]/g;
if (o.default && o.default.formatDate) {
  if (o.default.locale().locale === "en") {
    o.default.locale("en");
  }
  var h = {};
  var f = {
    shortdate: {
      path: "dateTimeFormats/availableFormats/yMd"
    },
    shorttime: {
      path: "timeFormats/short"
    },
    longdate: {
      path: "dateFormats/full"
    },
    longtime: {
      path: "timeFormats/medium"
    },
    monthandday: {
      path: "dateTimeFormats/availableFormats/MMMMd"
    },
    monthandyear: {
      path: "dateTimeFormats/availableFormats/yMMMM"
    },
    quarterandyear: {
      path: "dateTimeFormats/availableFormats/yQQQ"
    },
    day: {
      path: "dateTimeFormats/availableFormats/d"
    },
    year: {
      path: "dateTimeFormats/availableFormats/y"
    },
    shortdateshorttime: {
      path: "dateTimeFormats/short",
      parts: ["shorttime", "shortdate"]
    },
    longdatelongtime: {
      path: "dateTimeFormats/medium",
      parts: ["longtime", "longdate"]
    },
    month: {
      pattern: "LLLL"
    },
    shortyear: {
      pattern: "yy"
    },
    dayofweek: {
      pattern: "EEEE"
    },
    quarter: {
      pattern: "QQQ"
    },
    millisecond: {
      pattern: "SSS"
    },
    hour: {
      pattern: "HH"
    },
    minute: {
      pattern: "mm"
    },
    second: {
      pattern: "ss"
    }
  };
  var p = {
    engine: function () {
      return "globalize";
    },
    _getPatternByFormat: function (e) {
      var t = this;
      var n = e.toLowerCase();
      var i = f[n];
      if (n === "datetime-local") {
        return "yyyy-MM-ddTHH':'mm':'ss";
      }
      if (i) {
        var o = i.path && t._getFormatStringByPath(i.path) || i.pattern;
        if (i.parts) {
          s.each(i.parts, function (e, n) {
            o = o.replace("{" + e + "}", t._getPatternByFormat(n));
          });
        }
        return o;
      }
    },
    _getFormatStringByPath: function (e) {
      return o.default.locale().main("dates/calendars/gregorian/" + e);
    },
    getPeriodNames: function (e, t) {
      e = e || "wide";
      t = t === "format" ? t : "stand-alone";
      var n = o.default.locale().main(`dates/calendars/gregorian/dayPeriods/${t}/${e}`);
      return [n.am, n.pm];
    },
    getMonthNames: function (e, t) {
      var n = o.default.locale().main("dates/calendars/gregorian/months/" + (t === "format" ? t : "stand-alone") + "/" + (e || "wide"));
      return s.map(n, function (e) {
        return e;
      });
    },
    getDayNames: function (e) {
      var t = o.default.locale().main("dates/calendars/gregorian/days/stand-alone/" + (e || "wide"));
      return s.map(t, function (e) {
        return e;
      });
    },
    getTimeSeparator: function () {
      return o.default.locale().main("numbers/symbols-numberSystem-latn/timeSeparator");
    },
    removeRtlMarks: function (e) {
      return e.replace(c, "");
    },
    format: function (e, t) {
      if (e) {
        if (!t) {
          return e;
        }
        var n;
        var i;
        if (typeof t == "function") {
          return t(e);
        }
        if (t.formatter) {
          return t.formatter(e);
        }
        if (typeof (t = t.type || t) == "string") {
          i = o.default.locale().locale + ":" + t;
          if (!(n = h[i])) {
            t = {
              raw: this._getPatternByFormat(t) || t
            };
            n = h[i] = o.default.dateFormatter(t);
          }
        } else {
          if (!this._isAcceptableFormat(t)) {
            return;
          }
          n = o.default.dateFormatter(t);
        }
        return this.removeRtlMarks(n(e));
      }
    },
    parse: function (e, t) {
      if (e) {
        if (!t || typeof t == "function" || (0, r.isObject)(t) && !this._isAcceptableFormat(t)) {
          if (t) {
            var n = this.callBase(e, t);
            if (n) {
              return n;
            }
          }
          return o.default.parseDate(e);
        }
        if (t.parser) {
          return t.parser(e);
        }
        if (typeof t == "string") {
          t = {
            raw: this._getPatternByFormat(t) || t
          };
        }
        var i = o.default.parseDate(e, t);
        return i || this.callBase(e, t);
      }
    },
    _isAcceptableFormat: function (e) {
      if (e.parser) {
        return true;
      }
      for (var t = 0; t < d.length; t++) {
        if (Object.prototype.hasOwnProperty.call(e, d[t])) {
          return true;
        }
      }
    },
    firstDayOfWeekIndex: function () {
      var e = o.default.locale().supplemental.weekData.firstDay();
      return this._getDayKeys().indexOf(e);
    },
    _getDayKeys: function () {
      var e = o.default.locale().main("dates/calendars/gregorian/days/format/short");
      return s.map(e, function (e, t) {
        return t;
      });
    }
  };
  a.default.resetInjection();
  a.default.inject(p);
}