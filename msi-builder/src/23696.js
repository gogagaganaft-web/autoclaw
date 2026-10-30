exports.createPalette = w;
exports.currentPalette = m;
exports.generateColors = function (e, t, n = {
  keepLastColorInEnd: false
}) {
  n.type = n.baseColorSet;
  n.extensionMode = n.paletteExtensionMode;
  return w(e, n).generateColors(t);
};
exports.getAccentColor = function (e, t) {
  return (e = _(e, {
    themeDefault: t
  })).accentColor || e[0];
};
exports.getDiscretePalette = function (e, t, n) {
  var i = t > 0 ? function (e, t) {
    var n;
    var i = t - 1;
    var o = e.length - 1;
    var a = [];
    var r = [];
    function l(e) {
      var t = o * e;
      var n = h(t);
      var i = f(t);
      r.push(a[n].blend(a[i], t - n).toHex());
    }
    for (n = 0; n <= o; ++n) {
      a.push(new s.default(e[n]));
    }
    if (i > 0) {
      for (n = 0; n <= i; ++n) {
        l(n / i);
      }
    } else {
      l(0.5);
    }
    return r;
  }(_(e, {
    type: "gradientSet",
    themeDefault: n
  }), t) : [];
  return {
    getColor: function (e) {
      return i[e] || null;
    }
  };
};
exports.getGradientPalette = function (e, t) {
  var n = _(e, {
    type: "gradientSet",
    themeDefault: t
  });
  var i = new s.default(n[0]);
  var o = new s.default(n[1]);
  return {
    getColor: function (e) {
      if (e >= 0 && e <= 1) {
        return i.blend(o, e).toHex();
      } else {
        return null;
      }
    }
  };
};
exports.getPalette = _;
exports.registerPalette = function (e, t) {
  var n;
  var i = {};
  if (p(t)) {
    i.simpleSet = t.slice(0);
  } else if (t) {
    i.simpleSet = p(t.simpleSet) ? t.simpleSet.slice(0) : undefined;
    i.indicatingSet = p(t.indicatingSet) ? t.indicatingSet.slice(0) : undefined;
    i.gradientSet = p(t.gradientSet) ? t.gradientSet.slice(0) : undefined;
    i.accentColor = t.accentColor;
  }
  i.accentColor ||= i.simpleSet && i.simpleSet[0];
  if (i.simpleSet || i.indicatingSet || i.gradientSet) {
    n = (0, a.normalizeEnum)(e);
    (0, r.extend)(g[n] = g[n] || {}, i);
  }
};
var i;
var o;
var a = require("./19157.js");
var r = require("./13306.js");
var s = (i = require("./52752.js")) && i.__esModule ? i : {
  default: i
};
var l = require("./35922.js");
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
function d(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (u(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (u(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (u(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var c;
var h = Math.floor;
var f = Math.ceil;
var p = Array.isArray;
d(o = {}, "material", {
  simpleSet: ["#1db2f5", "#f5564a", "#97c95c", "#ffc720", "#eb3573", "#a63db8"],
  indicatingSet: ["#97c95c", "#ffc720", "#f5564a"],
  gradientSet: ["#1db2f5", "#97c95c"],
  accentColor: "#1db2f5"
});
d(o, "office", {
  simpleSet: ["#5f8b95", "#ba4d51", "#af8a53", "#955f71", "#859666", "#7e688c"],
  indicatingSet: ["#a3b97c", "#e1b676", "#ec7f83"],
  gradientSet: ["#5f8b95", "#ba4d51"],
  accentColor: "#ba4d51"
});
d(o, "harmony light", {
  simpleSet: ["#fcb65e", "#679ec5", "#ad79ce", "#7abd5c", "#e18e92", "#b6d623", "#b7abea", "#85dbd5"],
  indicatingSet: ["#b6d623", "#fcb65e", "#e18e92"],
  gradientSet: ["#7abd5c", "#fcb65e"],
  accentColor: "#679ec5"
});
d(o, "soft pastel", {
  simpleSet: ["#60a69f", "#78b6d9", "#6682bb", "#a37182", "#eeba69", "#90ba58", "#456c68", "#7565a4"],
  indicatingSet: ["#90ba58", "#eeba69", "#a37182"],
  gradientSet: ["#78b6d9", "#eeba69"],
  accentColor: "#60a69f"
});
d(o, "pastel", {
  simpleSet: ["#bb7862", "#70b3a1", "#bb626a", "#057d85", "#ab394b", "#dac599", "#153459", "#b1d2c6"],
  indicatingSet: ["#70b3a1", "#dac599", "#bb626a"],
  gradientSet: ["#bb7862", "#70b3a1"],
  accentColor: "#bb7862"
});
d(o, "bright", {
  simpleSet: ["#70c92f", "#f8ca00", "#bd1550", "#e97f02", "#9d419c", "#7e4452", "#9ab57e", "#36a3a6"],
  indicatingSet: ["#70c92f", "#f8ca00", "#bd1550"],
  gradientSet: ["#e97f02", "#f8ca00"],
  accentColor: "#e97f02"
});
d(o, "soft", {
  simpleSet: ["#cbc87b", "#9ab57e", "#e55253", "#7e4452", "#e8c267", "#565077", "#6babac", "#ad6082"],
  indicatingSet: ["#9ab57e", "#e8c267", "#e55253"],
  gradientSet: ["#9ab57e", "#e8c267"],
  accentColor: "#565077"
});
d(o, "ocean", {
  simpleSet: ["#75c099", "#acc371", "#378a8a", "#5fa26a", "#064970", "#38c5d2", "#00a7c6", "#6f84bb"],
  indicatingSet: ["#c8e394", "#7bc59d", "#397c8b"],
  gradientSet: ["#acc371", "#38c5d2"],
  accentColor: "#378a8a"
});
d(o, "vintage", {
  simpleSet: ["#dea484", "#efc59c", "#cb715e", "#eb9692", "#a85c4c", "#f2c0b5", "#c96374", "#dd956c"],
  indicatingSet: ["#ffe5c6", "#f4bb9d", "#e57660"],
  gradientSet: ["#efc59c", "#cb715e"],
  accentColor: "#cb715e"
});
d(o, "violet", {
  simpleSet: ["#d1a1d1", "#eeacc5", "#7b5685", "#7e7cad", "#a13d73", "#5b41ab", "#e287e2", "#689cc1"],
  indicatingSet: ["#d8e2f6", "#d0b2da", "#d56a8a"],
  gradientSet: ["#eeacc5", "#7b5685"],
  accentColor: "#7b5685"
});
d(o, "carmine", {
  simpleSet: ["#fb7764", "#73d47f", "#fed85e", "#d47683", "#dde392", "#757ab2"],
  indicatingSet: ["#5cb85c", "#f0ad4e", "#d9534f"],
  gradientSet: ["#fb7764", "#73d47f"],
  accentColor: "#f05b41"
});
d(o, "dark moon", {
  simpleSet: ["#4ddac1", "#f4c99a", "#80dd9b", "#f998b3", "#4aaaa0", "#a5aef1"],
  indicatingSet: ["#59d8a4", "#f0ad4e", "#f9517e"],
  gradientSet: ["#4ddac1", "#f4c99a"],
  accentColor: "#3debd3"
});
d(o, "soft blue", {
  simpleSet: ["#7ab8eb", "#97da97", "#facb86", "#e78683", "#839bda", "#4db7be"],
  indicatingSet: ["#5cb85c", "#f0ad4e", "#d9534f"],
  gradientSet: ["#7ab8eb", "#97da97"],
  accentColor: "#7ab8eb"
});
d(o, "dark violet", {
  simpleSet: ["#9c63ff", "#64c064", "#eead51", "#d2504b", "#4b6bbf", "#2da7b0"],
  indicatingSet: ["#5cb85c", "#f0ad4e", "#d9534f"],
  gradientSet: ["#9c63ff", "#64c064"],
  accentColor: "#9c63ff"
});
d(o, "green mist", {
  simpleSet: ["#3cbab2", "#8ed962", "#5b9d95", "#efcc7c", "#f1929f", "#4d8dab"],
  indicatingSet: ["#72d63c", "#ffc852", "#f74a5e"],
  gradientSet: ["#3cbab2", "#8ed962"],
  accentColor: "#3cbab2"
});
var g = o;
function m(e) {
  if (e === undefined) {
    return c || "material";
  }
  e = (0, a.normalizeEnum)(e);
  c = e in g ? e : undefined;
}
function _(e, t) {
  var n;
  t = t || {};
  e = e || (c === undefined ? t.themeDefault : m());
  var i = t.type;
  if (p(e)) {
    return e.slice(0);
  } else {
    if ((0, l.isString)(e)) {
      n = g[(0, a.normalizeEnum)(e)];
    }
    n ||= g[m()];
    if (i) {
      return n[i].slice(0);
    } else {
      return n;
    }
  }
}
function v(e) {
  var t = 0;
  this.next = function () {
    var n = e[t++];
    if (t === e.length) {
      this.reset();
    }
    return n;
  };
  this.reset = function () {
    t = 0;
  };
}
function y(e, t) {
  var n = t.useHighlight ? 50 : 0;
  var i = new v([0, n, -n]);
  var o = [];
  function a() {
    var t = i.next();
    o = t ? function (e, t) {
      var n;
      var i = [];
      var o = e.length;
      for (n = 0; n < o; ++n) {
        i.push(C(e[n], t));
      }
      return i;
    }(e, t) : e.slice(0);
  }
  return {
    getColor: function (t) {
      var n = o[t % e.length];
      if (t % e.length == e.length - 1) {
        a();
      }
      return n;
    },
    generateColors: function (e) {
      var n = [];
      e = e || t.count;
      for (var i = 0; i < e; i++) {
        n.push(this.getColor(i));
      }
      return n;
    },
    reset: function () {
      i.reset();
      a();
    }
  };
}
function b(e, t) {
  return {
    getColor: function (t, n) {
      var i = e.length;
      var o = h((n - 1) / i + 1);
      var a = e[t % i];
      if (o > 1) {
        return function (e, t, n) {
          var i = new s.default(e).hsl;
          var o = i.l / 100;
          var a = n - 1 / n;
          var r = o - a * 0.5;
          var l = o + a * 0.5;
          var u = (n - 1) / 2;
          var d = t - u;
          if (r < Math.min(0.5, o * 0.9)) {
            r = Math.min(0.5, o * 0.9);
          }
          if (l > Math.max(0.8, o + (1 - o) * 0.15)) {
            l = Math.max(0.8, o + (1 - o) * 0.15);
          }
          if (d < 0) {
            o -= (r - o) * d / u;
          } else {
            o += d / u * (l - o);
          }
          i.l = o * 100;
          return s.default.prototype.fromHSL(i).toHex();
        }(a, h(t / i), o);
      } else {
        return a;
      }
    },
    generateColors: function (e) {
      var n = [];
      e = e || t.count;
      for (var i = 0; i < e; i++) {
        n.push(this.getColor(i, e));
      }
      return n;
    },
    reset: function () {}
  };
}
function x(e, t) {
  var n = e.length;
  var i = [];
  function o(e, t, n, i) {
    var o;
    for (var a, r = Math.floor(e / t), s = e - t * r, l = n; l < n + e;) {
      a = r;
      if (s > 0) {
        a += 1;
        s--;
      }
      o = a > 2 ? Math.floor(a / 2) : 0;
      i.push(l + o);
      l += a;
    }
    return i.sort(function (e, t) {
      return e - t;
    });
  }
  function a(e, t, n) {
    var i = 0;
    for (var o = t = (n + t) % n; o < n * 2; o += 1) {
      var a = (n + o) % n;
      if (e[a]) {
        return [e[a], i];
      }
      i++;
    }
  }
  function r(i) {
    if (i <= n) {
      return e;
    }
    var r = [];
    var l = n - 2;
    var u = 0;
    var d = [];
    d = t.keepLastColorInEnd ? o(i - 2, l, 1, [0, i - 1]) : o(i - 1, n - 1, 1, [0]);
    for (var c = 0; c < i; c++) {
      if (d.indexOf(c) > -1) {
        r[c] = e[u++];
      }
    }
    return r = function (e, t) {
      for (var n = 0; n < t; n++) {
        if (!e[n]) {
          var i = e[n - 1];
          if (!i) {
            continue;
          }
          var o = a(e, n, t);
          var r = new s.default(o[0]);
          i = new s.default(i);
          for (var l = 0; l < o[1]; l++, n++) {
            e[n] = i.blend(r, (l + 1) / (o[1] + 1)).toHex();
          }
        }
      }
      return e;
    }(r, i);
  }
  return {
    getColor: function (e, o) {
      o = o || t.count || n;
      if (i.length !== o) {
        i = r(o);
      }
      return i[e % o];
    },
    generateColors: function (e, i) {
      e = e || t.count || n;
      if (i && e > n) {
        var o = r(n);
        for (var a = 0; a < e - n; a++) {
          o.push(o[a]);
        }
        return o;
      }
      if (n > 0) {
        return r(e).slice(0, e);
      } else {
        return [];
      }
    },
    reset: function () {}
  };
}
function w(e, t, n) {
  var i = {
    dispose: function () {
      this._extensionStrategy = null;
    },
    getNextColor: function (e) {
      return this._extensionStrategy.getColor(this._currentColor++, e);
    },
    generateColors: function (e, t) {
      return this._extensionStrategy.generateColors(e, (t || {}).repeat);
    },
    reset: function () {
      this._currentColor = 0;
      this._extensionStrategy.reset();
      return this;
    }
  };
  var o = ((t = t || {}).extensionMode || "").toLowerCase();
  var a = _(e, {
    type: t.type || "simpleSet",
    themeDefault: n
  });
  i._extensionStrategy = o === "alternate" ? y(a, t) : o === "extrapolate" ? b(a, t) : x(a, t);
  i.reset();
  return i;
}
function C(e, t) {
  var n;
  var i = new s.default(e).alter(t);
  var o = (n = i).r * 0.3 + n.g * 0.59 + n.b * 0.11;
  if (o > 200 || o < 55) {
    i = new s.default(e).alter(-t / 2);
  }
  return i.toHex();
}