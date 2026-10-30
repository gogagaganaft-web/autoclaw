exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./69434.js"));
var a = require("./35922.js");
var r = require("./95479.js");
var s = l(require("./91500.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e) {
  return (u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var d;
var c = ["year", "day", "month", "day"];
var h = ["hours", "minutes", "seconds", "milliseconds"];
var f = {
  SUPPORTED_FORMATS: ["date", "time", "datetime"],
  ONE_MINUTE: 60000,
  ONE_DAY: 86400000,
  ONE_YEAR: 31536000000,
  MIN_DATEVIEW_DEFAULT_DATE: new Date(1900, 0, 1),
  MAX_DATEVIEW_DEFAULT_DATE: (d = new Date(), new Date(d.getFullYear() + 50, d.getMonth(), d.getDate(), 23, 59, 59)),
  FORMATS_INFO: {
    date: {
      getStandardPattern: function () {
        return "yyyy-MM-dd";
      },
      components: c
    },
    time: {
      getStandardPattern: function () {
        return "HH:mm";
      },
      components: h
    },
    datetime: {
      getStandardPattern: function () {
        var e;
        var t;
        (t = (0, i.default)("<input>").attr("type", "datetime")).val("2000-01-01T01:01Z");
        if (t.val()) {
          e = "yyyy-MM-ddTHH:mmZ";
        }
        e ||= "yyyy-MM-ddTHH:mm:ssZ";
        f.FORMATS_INFO.datetime.getStandardPattern = function () {
          return e;
        };
        return e;
      },
      components: [].concat(c, h)
    },
    "datetime-local": {
      getStandardPattern: function () {
        return "yyyy-MM-ddTHH:mm:ss";
      },
      components: [].concat(c, ["hours", "minutes", "seconds"])
    }
  },
  FORMATS_MAP: {
    date: "shortdate",
    time: "shorttime",
    datetime: "shortdateshorttime"
  },
  SUBMIT_FORMATS_MAP: {
    date: "date",
    time: "time",
    datetime: "datetime-local"
  },
  toStandardDateFormat: function (e, t) {
    var n = f.FORMATS_INFO[t].getStandardPattern();
    return o.default.serializeDate(e, n);
  },
  fromStandardDateFormat: function (e) {
    var t = o.default.dateParser(e);
    if ((0, a.isDate)(t)) {
      return t;
    } else {
      return undefined;
    }
  },
  getMaxMonthDay: function (e, t) {
    return new Date(e, t + 1, 0).getDate();
  },
  mergeDates: function (e, t, n) {
    if (!t) {
      return t || null;
    }
    if (!e || isNaN(e.getTime())) {
      var i = new Date(null);
      e = new Date(i.getFullYear(), i.getMonth(), i.getDate());
    }
    var o = new Date(e.valueOf());
    var a = f.FORMATS_INFO[n];
    (0, r.each)(a.components, function () {
      var e = f.DATE_COMPONENTS_INFO[this];
      o[e.setter](t[e.getter]());
    });
    return o;
  },
  getLongestCaptionIndex: function (e) {
    var t;
    var n = 0;
    var i = 0;
    for (t = 0; t < e.length; ++t) {
      if (e[t].length > i) {
        n = t;
        i = e[t].length;
      }
    }
    return n;
  },
  formatUsesMonthName: function (e) {
    return s.default.formatUsesMonthName(e);
  },
  formatUsesDayName: function (e) {
    return s.default.formatUsesDayName(e);
  },
  getLongestDate: function (e, t, n) {
    var i = function (e) {
      var t = u(e);
      if (t === "string") {
        return "format";
      } else if (t === "object" && e.type !== undefined) {
        return e.type;
      } else {
        return null;
      }
    }(e);
    var o = 9;
    if (!i || !!f.formatUsesMonthName(i)) {
      o = f.getLongestCaptionIndex(t);
    }
    var a = new Date(1888, o, 21, 23, 59, 59, 999);
    if (!i || f.formatUsesDayName(i)) {
      var r = a.getDate() - a.getDay() + f.getLongestCaptionIndex(n);
      a.setDate(r);
    }
    return a;
  },
  normalizeTime: function (e) {
    e.setSeconds(0);
    e.setMilliseconds(0);
  }
};
f.DATE_COMPONENTS_INFO = {
  year: {
    getter: "getFullYear",
    setter: "setFullYear",
    formatter: function (e, t) {
      var n = new Date(t.getTime());
      n.setFullYear(e);
      return s.default.format(n, "yyyy");
    },
    startValue: undefined,
    endValue: undefined
  },
  day: {
    getter: "getDate",
    setter: "setDate",
    formatter: function (e, t) {
      var n = new Date(t.getTime());
      n.setDate(e);
      return s.default.format(n, "d");
    },
    startValue: 1,
    endValue: undefined
  },
  month: {
    getter: "getMonth",
    setter: "setMonth",
    formatter: function (e) {
      return s.default.getMonthNames()[e];
    },
    startValue: 0,
    endValue: 11
  },
  hours: {
    getter: "getHours",
    setter: "setHours",
    formatter: function (e) {
      return s.default.format(new Date(0, 0, 0, e), "hour");
    },
    startValue: 0,
    endValue: 23
  },
  minutes: {
    getter: "getMinutes",
    setter: "setMinutes",
    formatter: function (e) {
      return s.default.format(new Date(0, 0, 0, 0, e), "minute");
    },
    startValue: 0,
    endValue: 59
  },
  seconds: {
    getter: "getSeconds",
    setter: "setSeconds",
    formatter: function (e) {
      return s.default.format(new Date(0, 0, 0, 0, 0, e), "second");
    },
    startValue: 0,
    endValue: 59
  },
  milliseconds: {
    getter: "getMilliseconds",
    setter: "setMilliseconds",
    formatter: function (e) {
      return s.default.format(new Date(0, 0, 0, 0, 0, 0, e), "millisecond");
    },
    startValue: 0,
    endValue: 999
  }
};
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;