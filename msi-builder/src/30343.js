exports.default = undefined;
var i = require("./35922.js");
var o = l(require("./91198.js"));
var a = l(require("./18016.js"));
var r = l(require("./91500.js"));
var s = l(require("./20476.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./89740.js");
var u = (0, s.default)({
  format: function (e, t) {
    var n = (0, i.isString)(t) && t !== "" || (0, i.isPlainObject)(t) || (0, i.isFunction)(t);
    var o = (0, i.isNumeric)(e) || (0, i.isDate)(e);
    if (n && o) {
      if ((0, i.isFunction)(t)) {
        return t(e);
      } else {
        if ((0, i.isString)(t)) {
          t = {
            type: t
          };
        }
        if ((0, i.isNumeric)(e)) {
          return a.default.format(e, t);
        } else if ((0, i.isDate)(e)) {
          return r.default.format(e, t);
        } else {
          return undefined;
        }
      }
    } else if ((0, i.isDefined)(e)) {
      return e.toString();
    } else {
      return "";
    }
  },
  getTimeFormat: function (e) {
    if (e) {
      return "longtime";
    } else {
      return "shorttime";
    }
  },
  _normalizeFormat: function (e) {
    if (Array.isArray(e)) {
      if (e.length === 1) {
        return e[0];
      } else {
        return function (t) {
          return e.map(function (e) {
            return r.default.format(t, e);
          }).join(" ");
        };
      }
    } else {
      return e;
    }
  },
  getDateFormatByDifferences: function (e, t) {
    var n = [];
    var i = t && e.millisecond && !e.year && !e.month && !e.day;
    if (i) {
      n.push(function (e) {
        return e.getSeconds() + e.getMilliseconds() / 1000 + "s";
      });
    } else if (e.millisecond) {
      n.push("millisecond");
    }
    if (e.hour || e.minute || !i && e.second) {
      n.unshift(this.getTimeFormat(e.second));
    }
    if (e.year && e.month && e.day) {
      if (t && t === "month") {
        return "monthandyear";
      } else {
        n.unshift("shortdate");
        return this._normalizeFormat(n);
      }
    }
    if (e.year && e.month) {
      return "monthandyear";
    }
    if (e.year && e.quarter) {
      return "quarterandyear";
    }
    if (e.year) {
      return "year";
    }
    if (e.quarter) {
      return "quarter";
    }
    if (e.month && e.day) {
      if (t) {
        n.unshift(function (e) {
          return r.default.getMonthNames("abbreviated")[e.getMonth()] + " " + r.default.format(e, "day");
        });
      } else {
        n.unshift("monthandday");
      }
      return this._normalizeFormat(n);
    }
    if (e.month) {
      return "month";
    }
    if (e.day) {
      if (t) {
        n.unshift("day");
      } else {
        n.unshift(function (e) {
          return r.default.format(e, "dayofweek") + ", " + r.default.format(e, "day");
        });
      }
      return this._normalizeFormat(n);
    }
    return this._normalizeFormat(n);
  },
  getDateFormatByTicks: function (e) {
    var t;
    var n;
    var i;
    if (e.length > 1) {
      t = o.default.getDatesDifferences(e[0], e[1]);
      i = 1;
      for (; i < e.length - 1; i++) {
        n = o.default.getDatesDifferences(e[i], e[i + 1]);
        if (t.count < n.count) {
          t = n;
        }
      }
    } else {
      t = {
        year: true,
        month: true,
        day: true,
        hour: e[0].getHours() > 0,
        minute: e[0].getMinutes() > 0,
        second: e[0].getSeconds() > 0,
        millisecond: e[0].getMilliseconds() > 0
      };
    }
    return this.getDateFormatByDifferences(t);
  },
  getDateFormatByTickInterval: function (e, t, n) {
    var a;
    function r(e, t, n) {
      switch (t) {
        case "year":
        case "quarter":
          e.month = n;
        case "month":
          e.day = n;
        case "week":
        case "day":
          e.hour = n;
        case "hour":
          e.minute = n;
        case "minute":
          e.second = n;
        case "second":
          e.millisecond = n;
      }
    }
    n = (0, i.isString)(n) ? n.toLowerCase() : n;
    var s;
    var l;
    var u;
    var d = o.default.getDatesDifferences(e, t);
    if (e !== t) {
      s = d;
      l = e > t ? t : e;
      if (!(u = e > t ? e : t).getMilliseconds() && u.getSeconds()) {
        if (u.getSeconds() - l.getSeconds() == 1) {
          s.millisecond = true;
          s.second = false;
        }
      } else if (!u.getSeconds() && u.getMinutes()) {
        if (u.getMinutes() - l.getMinutes() == 1) {
          s.second = true;
          s.minute = false;
        }
      } else if (!u.getMinutes() && u.getHours()) {
        if (u.getHours() - l.getHours() == 1) {
          s.minute = true;
          s.hour = false;
        }
      } else if (!u.getHours() && u.getDate() > 1) {
        if (u.getDate() - l.getDate() == 1) {
          s.hour = true;
          s.day = false;
        }
      } else if (u.getDate() === 1 && u.getMonth()) {
        if (u.getMonth() - l.getMonth() == 1) {
          s.day = true;
          s.month = false;
        }
      } else if (!u.getMonth() && u.getFullYear() && u.getFullYear() - l.getFullYear() == 1) {
        s.month = true;
        s.year = false;
      }
    }
    r(d, a = o.default.getDateUnitInterval(d), true);
    r(d, a = o.default.getDateUnitInterval(n || "second"), false);
    d[{
      week: "day"
    }[a] || a] = true;
    return this.getDateFormatByDifferences(d);
  }
});
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;