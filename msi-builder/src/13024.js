exports.default = undefined;
var i;
var o = require("./13306.js");
var a = (i = require("./91331.js")) && i.__esModule ? i : {
  default: i
};
function r(e) {
  return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var s = /[\u200E\u200F]/g;
var l = /[\u202F]/g;
function u(e) {
  return function (t) {
    if (!e.timeZoneName) {
      var n = t.getFullYear();
      var i = String(n).length < 3;
      var a = i ? n + 400 : n;
      var r = new Date(Date.UTC(a, t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
      if (i) {
        r.setFullYear(n);
      }
      return c(r, (0, o.extend)({
        timeZone: "UTC"
      }, e));
    }
    return c(t, e);
  };
}
var d = {};
function c(e, t) {
  return function (e) {
    var t = a.default.locale() + "/" + JSON.stringify(e);
    d[t] ||= new Intl.DateTimeFormat(a.default.locale(), e).format;
    return d[t];
  }(t)(e).replace(s, "").replace(l, " ");
}
var h;
function f(e) {
  return new Intl.NumberFormat(a.default.locale()).format(e);
}
h = {};
function p(e) {
  if (!(e in h)) {
    if (f(0) === "0") {
      h[e] = false;
      return false;
    }
    h[e] = {};
    for (var t = 0; t < 10; ++t) {
      h[e][f(t)] = t;
    }
  }
  return h[e];
}
function g(e) {
  var t = p(a.default.locale());
  if (t) {
    return e.split("").map(function (e) {
      if (e in t) {
        return String(t[e]);
      } else {
        return e;
      }
    }).join("");
  } else {
    return e;
  }
}
function m(e) {
  return e.replace(/(\D)0+(\d)/g, "$1$2");
}
function _(e) {
  return e.replace("d’", "de ");
}
var v = {
  day: {
    day: "numeric"
  },
  dayofweek: {
    weekday: "long"
  },
  longdate: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  },
  longdatelongtime: {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  longtime: {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  },
  month: {
    month: "long"
  },
  monthandday: {
    month: "long",
    day: "numeric"
  },
  monthandyear: {
    year: "numeric",
    month: "long"
  },
  shortdate: {},
  shorttime: {
    hour: "numeric",
    minute: "numeric"
  },
  shortyear: {
    year: "2-digit"
  },
  year: {
    year: "numeric"
  }
};
Object.defineProperty(v, "shortdateshorttime", {
  get: function () {
    var e = Intl.DateTimeFormat(a.default.locale()).resolvedOptions();
    return {
      year: e.year,
      month: e.month,
      day: e.day,
      hour: "numeric",
      minute: "numeric"
    };
  }
});
function y(e) {
  return typeof e == "string" && v[e.toLowerCase()];
}
var b = {
  standalone: function (e, t) {
    var n = new Date(1999, e, 13, 1);
    return u({
      month: t
    })(n);
  },
  format: function (e, t) {
    var n = new Date(0, e, 13, 1);
    var i = _(u({
      day: "numeric",
      month: t
    })(n)).split(" ").filter(function (e) {
      return e.indexOf("13") < 0;
    });
    if (i.length === 1) {
      return i[0];
    } else if (i.length === 2) {
      if (i[0].length > i[1].length) {
        return i[0];
      } else {
        return i[1];
      }
    } else {
      return b.standalone(e, t);
    }
  }
};
var x = {
  engine: function () {
    return "intl";
  },
  getMonthNames: function (e, t) {
    var n = {
      wide: "long",
      abbreviated: "short",
      narrow: "narrow"
    }[e || "wide"];
    t = t === "format" ? t : "standalone";
    return Array.apply(null, new Array(12)).map(function (e, i) {
      return b[t](i, n);
    });
  },
  getDayNames: function (e) {
    return function (e) {
      return Array.apply(null, new Array(7)).map(function (t, n) {
        return u({
          weekday: e
        })(new Date(0, 0, n));
      });
    }({
      wide: "long",
      abbreviated: "short",
      short: "narrow",
      narrow: "narrow"
    }[e || "wide"]);
  },
  getPeriodNames: function () {
    var e = u({
      hour: "numeric",
      hour12: true
    });
    return [1, 13].map(function (t) {
      var n = f(1);
      var i = e(new Date(0, 0, 1, t)).split(n);
      if (i.length !== 2) {
        return "";
      } else {
        return (i[0].length > i[1].length ? i[0] : i[1]).trim();
      }
    });
  },
  format: function (e, t) {
    if (e) {
      if (!t) {
        return e;
      }
      if (typeof t != "function" && !t.formatter) {
        t = t.type || t;
      }
      var n = y(t);
      if (n) {
        return u(n)(e);
      }
      var i = r(t);
      if (t.formatter || i === "function" || i === "string") {
        return this.callBase.apply(this, arguments);
      } else {
        return u(t)(e);
      }
    }
  },
  parse: function (e, t) {
    var n;
    var i = this;
    if (t && !t.parser && typeof e == "string") {
      e = _(e);
      n = function (e) {
        return _(i.format(e, t));
      };
    }
    return this.callBase(e, n || t);
  },
  _parseDateBySimpleFormat: function (e, t) {
    var n = this;
    e = g(e);
    var i = this.getFormatParts(t);
    var o = e.split(/\D+/).filter(function (e) {
      return e.length > 0;
    });
    if (i.length === o.length) {
      var a = this._generateDateArgs(i, o);
      function r(i) {
        var o;
        var r;
        var s = function (e, t) {
          var n = t ? 12 : 0;
          return new Date(e.year, e.month, e.day, (e.hours + n) % 24, e.minutes, e.seconds);
        }(a, i);
        o = g(n.format(s, t));
        r = e;
        if (m(o) === m(r)) {
          return s;
        }
      }
      return r(false) || r(true);
    }
  },
  _generateDateArgs: function (e, t) {
    var n = new Date();
    var i = {
      year: n.getFullYear(),
      month: n.getMonth(),
      day: n.getDate(),
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    e.forEach(function (e, n) {
      var o = t[n];
      var a = parseInt(o, 10);
      if (e === "month") {
        a -= 1;
      }
      i[e] = a;
    });
    return i;
  },
  formatUsesMonthName: function (e) {
    if (r(e) !== "object" || e.type || e.format) {
      return this.callBase.apply(this, arguments);
    } else {
      return e.month === "long";
    }
  },
  formatUsesDayName: function (e) {
    if (r(e) !== "object" || e.type || e.format) {
      return this.callBase.apply(this, arguments);
    } else {
      return e.weekday === "long";
    }
  },
  getTimeSeparator: function () {
    return g(c(new Date(2001, 1, 1, 11, 11), {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    })).replace(/\d/g, "");
  },
  getFormatParts: function (e) {
    if (typeof e == "string") {
      return this.callBase(e);
    }
    var t = (0, o.extend)({}, v[e.toLowerCase()]);
    var n = new Date(2001, 2, 4, 5, 6, 7);
    var i = u(t)(n);
    i = g(i);
    return [{
      name: "year",
      value: 1
    }, {
      name: "month",
      value: 3
    }, {
      name: "day",
      value: 4
    }, {
      name: "hours",
      value: 5
    }, {
      name: "minutes",
      value: 6
    }, {
      name: "seconds",
      value: 7
    }].map(function (e) {
      return {
        name: e.name,
        index: i.indexOf(e.value)
      };
    }).filter(function (e) {
      return e.index > -1;
    }).sort(function (e, t) {
      return e.index - t.index;
    }).map(function (e) {
      return e.name;
    });
  }
};
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;