exports.default = undefined;
var i = g(require("./20476.js"));
var o = require("./35922.js");
var a = require("./95479.js");
var r = g(require("./17381.js"));
var s = require("./40594.js");
var l = require("./59937.js");
var u = require("./2892.js");
var d = g(require("./15564.js"));
var c = g(require("./92286.js"));
var h = g(require("./91331.js"));
var f = g(require("./18016.js"));
var p = g(require("./13024.js"));
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = typeof Intl != "undefined";
var _ = {
  shortdate: "M/d/y",
  shorttime: "h:mm a",
  longdate: "EEEE, MMMM d, y",
  longtime: "h:mm:ss a",
  monthandday: "MMMM d",
  monthandyear: "MMMM y",
  quarterandyear: "QQQ y",
  day: "d",
  year: "y",
  shortdateshorttime: "M/d/y, h:mm a",
  longdatelongtime: "EEEE, MMMM d, y, h:mm:ss a",
  month: "LLLL",
  shortyear: "yy",
  dayofweek: "EEEE",
  quarter: "QQQ",
  hour: "HH",
  minute: "mm",
  second: "ss",
  millisecond: "SSS",
  "datetime-local": "yyyy-MM-ddTHH':'mm':'ss"
};
var v = {
  year: ["y", "yy", "yyyy"],
  day: ["d", "dd"],
  month: ["M", "MM", "MMM", "MMMM"],
  hours: ["H", "HH", "h", "hh", "ah"],
  minutes: ["m", "mm"],
  seconds: ["s", "ss"],
  milliseconds: ["S", "SS", "SSS"]
};
var y = (0, i.default)({
  engine: function () {
    return "base";
  },
  _getPatternByFormat: function (e) {
    return _[e.toLowerCase()];
  },
  _expandPattern: function (e) {
    return this._getPatternByFormat(e) || e;
  },
  formatUsesMonthName: function (e) {
    return this._expandPattern(e).indexOf("MMMM") !== -1;
  },
  formatUsesDayName: function (e) {
    return this._expandPattern(e).indexOf("EEEE") !== -1;
  },
  getFormatParts: function (e) {
    var t = this._getPatternByFormat(e) || e;
    var n = [];
    (0, a.each)(t.split(/\W+/), function (e, t) {
      (0, a.each)(v, function (e, i) {
        if (i.includes(t)) {
          n.push(e);
        }
      });
    });
    return n;
  },
  getMonthNames: function (e) {
    return d.default.getMonthNames(e);
  },
  getDayNames: function (e) {
    return d.default.getDayNames(e);
  },
  getQuarterNames: function (e) {
    return d.default.getQuarterNames(e);
  },
  getPeriodNames: function (e) {
    return d.default.getPeriodNames(e);
  },
  getTimeSeparator: function () {
    return ":";
  },
  is24HourFormat: function (e) {
    var t = new Date(2017, 0, 20, 11, 0, 0, 0);
    var n = new Date(2017, 0, 20, 23, 0, 0, 0);
    for (var i = this.format(t, e), o = this.format(n, e), a = 0; a < i.length; a++) {
      if (i[a] !== o[a]) {
        return !isNaN(parseInt(i[a]));
      }
    }
  },
  format: function (e, t) {
    if (e) {
      if (!t) {
        return e;
      }
      var n;
      if (typeof t == "function") {
        n = t;
      } else if (t.formatter) {
        n = t.formatter;
      } else {
        t = t.type || t;
        if ((0, o.isString)(t)) {
          t = _[t.toLowerCase()] || t;
          return f.default.convertDigits((0, s.getFormatter)(t, this)(e));
        }
      }
      if (n) {
        return n(e);
      }
    }
  },
  parse: function (e, t) {
    var n;
    var i;
    var o = this;
    if (e) {
      if (!t) {
        return this.parse(e, "shortdate");
      }
      if (t.parser) {
        return t.parser(e);
      }
      if (typeof t != "string" || _[t.toLowerCase()]) {
        i = function (e) {
          var n = o.format(e, t);
          return f.default.convertDigits(n, true);
        };
        try {
          n = (0, l.getFormat)(i);
        } catch (e) {}
      } else {
        n = t;
      }
      if (n) {
        e = f.default.convertDigits(e, true);
        return (0, u.getParser)(n, this)(e);
      }
      r.default.log("W0012");
      var a = new Date(e);
      if (a && !isNaN(a.getTime())) {
        return a;
      }
    }
  },
  firstDayOfWeekIndex: function () {
    var e = h.default.getValueByClosestLocale(function (e) {
      return c.default[e];
    });
    if (e === undefined) {
      return 0;
    } else {
      return e;
    }
  }
});
if (m) {
  y.inject(p.default);
}
var b = y;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;