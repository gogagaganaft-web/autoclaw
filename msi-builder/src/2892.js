exports.isPossibleForParsingFormat = exports.getRegExpInfo = exports.getPatternSetters = exports.getParser = undefined;
var i = require("./20576.js");
var o = require("./30869.js");
var a = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
function r(e, t) {
  if (e > 2) {
    return Object.keys(a).map(function (e) {
      return ["format", "standalone"].map(function (n) {
        return t.getMonthNames(a[e], n).join("|");
      }).join("|");
    }).join("|");
  } else if (e === 2) {
    return "1[012]|0?[1-9]";
  } else {
    return "0??[1-9]|1[012]";
  }
}
var s = {
  ":": function (e, t) {
    var n = e > 1 ? `{${e}}` : "";
    var o = (0, i.escapeRegExp)(t.getTimeSeparator());
    if (o !== ":") {
      o = `${o}|:`;
    }
    return `${o}${n}`;
  },
  y: function (e) {
    if (e === 2) {
      return `[0-9]{${e}}`;
    } else {
      return "[0-9]+?";
    }
  },
  M: r,
  L: r,
  Q: function (e, t) {
    if (e > 2) {
      return t.getQuarterNames(a[e], "format").join("|");
    } else {
      return "0?[1-4]";
    }
  },
  E: function (e, t) {
    return "\\D*";
  },
  a: function (e, t) {
    return t.getPeriodNames(a[e < 3 ? 3 : e], "format").join("|");
  },
  d: function (e) {
    if (e === 2) {
      return "3[01]|[12][0-9]|0?[1-9]";
    } else {
      return "0??[1-9]|[12][0-9]|3[01]";
    }
  },
  H: function (e) {
    if (e === 2) {
      return "2[0-3]|1[0-9]|0?[0-9]";
    } else {
      return "0??[0-9]|1[0-9]|2[0-3]";
    }
  },
  h: function (e) {
    if (e === 2) {
      return "1[012]|0?[1-9]";
    } else {
      return "0??[1-9]|1[012]";
    }
  },
  m: function (e) {
    if (e === 2) {
      return "[1-5][0-9]|0?[0-9]";
    } else {
      return "0??[0-9]|[1-5][0-9]";
    }
  },
  s: function (e) {
    if (e === 2) {
      return "[1-5][0-9]|0?[0-9]";
    } else {
      return "0??[0-9]|[1-5][0-9]";
    }
  },
  S: function (e) {
    return `[0-9]{1,${e}}`;
  },
  w: function (e) {
    if (e === 2) {
      return "[1-5][0-9]|0?[0-9]";
    } else {
      return "0??[0-9]|[1-5][0-9]";
    }
  }
};
var l = Number;
function u(e, t) {
  return e.map(function (e) {
    return e.toLowerCase();
  }).indexOf(t.toLowerCase());
}
function d(e, t, n) {
  if (t > 2) {
    return ["format", "standalone"].map(function (t) {
      return Object.keys(a).map(function (i) {
        var o = n.getMonthNames(a[i], t);
        return u(o, e);
      });
    }).reduce(function (e, t) {
      return e.concat(t);
    }).filter(function (e) {
      return e >= 0;
    })[0];
  } else {
    return l(e) - 1;
  }
}
var c = {
  y: function (e, t) {
    var n = l(e);
    if (t === 2) {
      if (n < 30) {
        return 2000 + n;
      } else {
        return 1900 + n;
      }
    } else {
      return n;
    }
  },
  M: d,
  L: d,
  Q: function (e, t, n) {
    if (t > 2) {
      return n.getQuarterNames(a[t], "format").indexOf(e);
    } else {
      return l(e) - 1;
    }
  },
  E: function (e, t, n) {
    var i = n.getDayNames(a[t < 3 ? 3 : t], "format");
    return u(i, e);
  },
  a: function (e, t, n) {
    var i = n.getPeriodNames(a[t < 3 ? 3 : t], "format");
    return u(i, e);
  },
  d: l,
  H: l,
  h: l,
  m: l,
  s: l,
  S: function (e, t) {
    t = Math.max(t, 3);
    e = e.slice(0, 3);
    while (t < 3) {
      e += "0";
      t++;
    }
    return l(e);
  }
};
var h = ["y", "M", "d", "h", "m", "s", "S"];
var f = {
  y: "setFullYear",
  M: "setMonth",
  L: "setMonth",
  a: function (e, t, n) {
    var i = e.getHours();
    var o = n.h;
    if (o !== undefined && o !== i) {
      i--;
    }
    if (t || i !== 12) {
      if (t && i !== 12) {
        i += 12;
      }
    } else {
      i = 0;
    }
    e.setHours(i);
  },
  d: "setDate",
  H: "setHours",
  h: "setHours",
  m: "setMinutes",
  s: "setSeconds",
  S: "setMilliseconds"
};
function p(e, t) {
  var n = e[t];
  if (!n) {
    return 0;
  }
  var i = 0;
  do {
    t++;
    i++;
  } while (e[t] === n);
  return i;
}
function g(e, t) {
  var n = "";
  for (var i = 0; i < t; i++) {
    n += e;
  }
  return n;
}
function m(e, t) {
  var n;
  var a = "";
  var r = "";
  var l = [];
  var u = function () {
    if (r) {
      l.push(`'${r}'`);
      a += `${(0, i.escapeRegExp)(r)})`;
      r = "";
    }
  };
  for (var d = 0; d < e.length; d++) {
    var c = e[d];
    var h = s[c];
    if (c !== "'" || (n = !n, e[d - 1] === "'")) {
      if (h && !n) {
        var f = p(e, d);
        var m = g(c, f);
        u();
        l.push(m);
        a += `(${h(f, t)})`;
        d += f - 1;
      } else {
        if (!r) {
          a += "(";
        }
        r += c;
      }
    }
  }
  u();
  if (!v(l)) {
    o.logger.warn(`The following format may be parsed incorrectly: ${e}.`);
  }
  return {
    patterns: l,
    regexp: new RegExp(`^${a}\$`, "i")
  };
}
exports.getRegExpInfo = m;
var _ = ["d", "H", "h", "m", "s", "w", "M", "L", "Q"];
function v(e) {
  function t(e) {
    if (!e) {
      return false;
    }
    var t = e[0];
    return ["y", "S"].includes(t) || _.includes(t) && e.length < 3;
  }
  var n = true;
  var i = 0;
  return e.every(function (e, o, a) {
    if (t(e)) {
      if (function (e) {
        return e[0] !== "S" && e.length !== 2;
      }(e)) {
        n = ++i < 2;
      }
      if (!t(a[o + 1])) {
        i = 0;
      }
    }
    return n;
  });
}
exports.isPossibleForParsingFormat = v;
exports.getPatternSetters = function () {
  return f;
};
exports.getParser = function (e, t) {
  var n = m(e, t);
  return function (e) {
    var i;
    var o = n.regexp.exec(e);
    if (o) {
      var a = new Date();
      var r = new Date(a.getFullYear(), 0, 1);
      var s = n.patterns.map(function (e) {
        if (e[0] === "'") {
          return "";
        } else if (e[0] === "H") {
          return "h";
        } else {
          return e[0];
        }
      });
      i = s.map(function (e) {
        return h.indexOf(e);
      });
      var l = Math.max.apply(Math, i);
      var u = function (e) {
        var t = e.filter(function (e) {
          return h.indexOf(e) < 0;
        });
        return h.concat(t);
      }(s);
      var d = {};
      u.forEach(function (e, i) {
        if (e && (!(i < h.length) || !(i > l))) {
          var u = s.indexOf(e);
          if (u >= 0) {
            var p = n.patterns[u];
            var g = o[u + 1];
            (function (e, t, n, i, o) {
              var a = t[0];
              var r = f[a];
              var s = c[a];
              if (r && s) {
                var l = s(n, t.length, i);
                o[t] = l;
                if (e[r]) {
                  e[r](l);
                } else {
                  r(e, l, o);
                }
              }
            })(r, p, g, t, d);
          } else {
            (function (e, t, n) {
              var i = f[t];
              var o = n["g" + i.substr(1)]();
              e[i](o);
            })(r, e, a);
          }
        }
      });
      return r;
    }
    return null;
  };
};