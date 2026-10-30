exports.default = undefined;
var i = r(require("./91198.js"));
var o = r(require("./51690.js"));
var a = r(require("./26983.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function s(e, t) {
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
      return l(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return l(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function l(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var u = i.default.dateToMilliseconds;
function d(e) {
  return new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes()));
}
function c(e, t, n, i) {
  return h(n, i) - h(e, t);
}
function h(e, t) {
  return new Date(e).getTimezoneOffset() - new Date(t).getTimezoneOffset();
}
function f(e, t = new Date()) {
  if (typeof e == "string") {
    var n = d(t);
    return o.default.getTimeZoneOffsetById(e, n.getTime());
  }
  return e;
}
function p(e, t, n) {
  return f(n, e) - f(n, t);
}
function g(e) {
  var t = new Date(new Date(e).setHours(0, 0, 0, 0));
  var n = new Date(new Date(e).setHours(23, 59, 59, 0));
  return t.getTimezoneOffset() - n.getTimezoneOffset() != 0;
}
function m(e = new Date()) {
  return e.getTimezoneOffset() * 60000;
}
function _() {
  var e = s(y(), 2);
  var t = e[0];
  var n = e[1];
  return t.getTimezoneOffset() !== n.getTimezoneOffset();
}
function v(e, t) {
  var n = t.getFullYear();
  function i(e) {
    return -e.getTimezoneOffset() / 60;
  }
  function a(e) {
    return new Date(e - 3600000);
  }
  var r = o.default.getTimeZoneDeclarationTuple(e, n);
  var l = s(r, 2);
  var u = l[0];
  var d = l[1];
  if (r.length < 2) {
    return o.default.getTimeZoneOffsetById(e, t) === i(t) && !_();
  }
  var c = i(new Date(u.date));
  var h = i(new Date(d.date));
  return c === u.offset && c !== i(a(u.date)) && h === d.offset && h !== i(a(d.date));
}
function y() {
  var e = new Date(Date.now());
  var t = new Date();
  var n = new Date();
  t.setFullYear(e.getFullYear(), 0, 1);
  n.setFullYear(e.getFullYear(), 6, 1);
  return [t, n];
}
var b = {
  getDaylightOffset: h,
  getDaylightOffsetInMs: function (e, t) {
    return h(e, t) * u("minute");
  },
  getTimezoneOffsetChangeInMinutes: c,
  getTimezoneOffsetChangeInMs: function (e, t, n, i) {
    return c(e, t, n, i) * u("minute");
  },
  calculateTimezoneByValue: f,
  getCorrectedDateByDaylightOffsets: function (e, t, n, i, o) {
    var a = p(e, t, i) - p(e, t, o);
    return new Date(n.getTime() - a * u("hour"));
  },
  isSameAppointmentDates: function (e, t) {
    t = new Date(t.getTime() - 1);
    return i.default.sameDate(e, t);
  },
  correctRecurrenceExceptionByTimezone: function (e, t, n, i, o = false) {
    var a = (e.getTimezoneOffset() - t.getTimezoneOffset()) / 60;
    if (i) {
      a = p(t, e, i);
    } else if (n) {
      a = p(t, e, n);
    }
    return new Date(e.getTime() + (o ? -1 : 1) * a * u("hour"));
  },
  getClientTimezoneOffset: m,
  getDiffBetweenClientTimezoneOffsets: function (e = new Date(), t = new Date()) {
    return m(e) - m(t);
  },
  createUTCDateWithLocalOffset: function (e) {
    if (e) {
      return new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds()));
    } else {
      return null;
    }
  },
  createDateFromUTCWithLocalOffset: function (e) {
    var t = (0, a.default)(e);
    var n = t.getTimezoneOffset();
    t.addTime(t.getTimezoneOffset("minute"));
    t.subtractMinutes(n - t.getTimezoneOffset());
    return t.source;
  },
  createUTCDate: d,
  isTimezoneChangeInDate: g,
  getDateWithoutTimezoneChange: function (e) {
    var t = new Date(e);
    if (g(t)) {
      var n = new Date(t);
      return new Date(n.setDate(n.getDate() + 1));
    }
    return t;
  },
  hasDSTInLocalTimeZone: _,
  isEqualLocalTimeZone: function (e, t = new Date()) {
    if (Intl) {
      var n = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (n === e) {
        return true;
      }
    }
    return v(e, t);
  },
  isEqualLocalTimeZoneByDeclaration: v,
  getTimeZones: function (e = new Date()) {
    var t = d(e);
    return o.default.getDisplayedTimeZones(t.getTime());
  },
  setOffsetsToDate: function (e, t) {
    var n = t.reduce(function (e, t) {
      return e + t;
    }, e.getTime());
    return new Date(n);
  }
};
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;