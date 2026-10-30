function n(e, t) {
  while (e.length < t) {
    e = "0" + e;
  }
  return e;
}
exports.getFormatter = undefined;
var i = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var o = {
  y: function (e, t, i) {
    var o = e[i ? "getUTCFullYear" : "getFullYear"]();
    if (t === 2) {
      o %= 100;
    }
    return n(o.toString(), t);
  },
  M: function (e, t, o, a) {
    var r = e[o ? "getUTCMonth" : "getMonth"]();
    var s = i[t];
    if (s) {
      return a.getMonthNames(s, "format")[r];
    } else {
      return n((r + 1).toString(), Math.min(t, 2));
    }
  },
  L: function (e, t, o, a) {
    var r = e[o ? "getUTCMonth" : "getMonth"]();
    var s = i[t];
    if (s) {
      return a.getMonthNames(s, "standalone")[r];
    } else {
      return n((r + 1).toString(), Math.min(t, 2));
    }
  },
  Q: function (e, t, o, a) {
    var r = e[o ? "getUTCMonth" : "getMonth"]();
    var s = Math.floor(r / 3);
    var l = i[t];
    if (l) {
      return a.getQuarterNames(l)[s];
    } else {
      return n((s + 1).toString(), Math.min(t, 2));
    }
  },
  E: function (e, t, n, o) {
    var a = e[n ? "getUTCDay" : "getDay"]();
    var r = i[t < 3 ? 3 : t];
    return o.getDayNames(r)[a];
  },
  a: function (e, t, n, o) {
    var a = e[n ? "getUTCHours" : "getHours"]() < 12 ? 0 : 1;
    var r = i[t];
    return o.getPeriodNames(r)[a];
  },
  d: function (e, t, i) {
    return n(e[i ? "getUTCDate" : "getDate"]().toString(), Math.min(t, 2));
  },
  H: function (e, t, i) {
    return n(e[i ? "getUTCHours" : "getHours"]().toString(), Math.min(t, 2));
  },
  h: function (e, t, i) {
    return n((e[i ? "getUTCHours" : "getHours"]() % 12 || 12).toString(), Math.min(t, 2));
  },
  m: function (e, t, i) {
    return n(e[i ? "getUTCMinutes" : "getMinutes"]().toString(), Math.min(t, 2));
  },
  s: function (e, t, i) {
    return n(e[i ? "getUTCSeconds" : "getSeconds"]().toString(), Math.min(t, 2));
  },
  S: function (e, t, i) {
    return n(e[i ? "getUTCMilliseconds" : "getMilliseconds"]().toString(), 3).substr(0, t);
  },
  x: function (e, t, i) {
    var o = i ? 0 : e.getTimezoneOffset();
    var a = o > 0 ? "-" : "+";
    var r = Math.abs(o);
    var s = r % 60;
    var l = n(Math.floor(r / 60).toString(), 2);
    var u = n(s.toString(), 2);
    return a + l + (t >= 3 ? ":" : "") + (t > 1 || s ? u : "");
  },
  X: function (e, t, n) {
    if (n || !e.getTimezoneOffset()) {
      return "Z";
    } else {
      return o.x(e, t, n);
    }
  },
  Z: function (e, t, n) {
    return o.X(e, t >= 5 ? 3 : 2, n);
  }
};
exports.getFormatter = function (e, t) {
  return function (n) {
    var i;
    var a;
    var r;
    var s;
    var l = 0;
    var u = false;
    var d = "";
    if (!n) {
      return null;
    }
    if (!e) {
      return n;
    }
    var c = e[e.length - 1] === "Z" || e.slice(-3) === "'Z'";
    for (i = 0; i < e.length; i++) {
      r = e[i];
      a = o[r];
      l++;
      if (!(s = r === e[i + 1])) {
        if (a && !u) {
          d += a(n, l, c, t);
        }
        l = 0;
      }
      if (r !== "'" || s) {
        if (!!u || !a) {
          d += r;
        }
      } else {
        u = !u;
      }
      if (r === "'" && s) {
        i++;
      }
    }
    return d;
  };
};