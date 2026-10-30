exports.default = undefined;
var n = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  feldspar: "d19275",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslateblue: "8470ff",
  lightslategray: "778899",
  lightslategrey: "778899",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "00ff00",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "ff00ff",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370d8",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "d87093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "ff0000",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  violetred: "d02090",
  wheat: "f5deb3",
  white: "ffffff",
  whitesmoke: "f5f5f5",
  yellow: "ffff00",
  yellowgreen: "9acd32"
};
var i = [{
  re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  process: function (e) {
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)];
  }
}, {
  re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*\.*\d+)\)$/,
  process: function (e) {
    return [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10), parseFloat(e[4])];
  }
}, {
  re: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/,
  process: function (e) {
    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)];
  }
}, {
  re: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/,
  process: function (e) {
    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16), Number((parseInt(e[4], 16) / 255).toFixed(2))];
  }
}, {
  re: /^#([a-f0-9]{1})([a-f0-9]{1})([a-f0-9]{1})([a-f0-9]{1})$/,
  process: function (e) {
    return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16), Number((parseInt(e[4] + e[4], 16) / 255).toFixed(2))];
  }
}, {
  re: /^#([a-f0-9]{1})([a-f0-9]{1})([a-f0-9]{1})$/,
  process: function (e) {
    return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)];
  }
}, {
  re: /^hsv\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  process: function (e) {
    var t = parseInt(e[1], 10);
    var n = parseInt(e[2], 10);
    var i = parseInt(e[3], 10);
    var o = s(t, n, i);
    return [o[0], o[1], o[2], 1, [t, n, i]];
  }
}, {
  re: /^hsl\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  process: function (e) {
    var t = parseInt(e[1], 10);
    var n = parseInt(e[2], 10);
    var i = parseInt(e[3], 10);
    var o = d(t, n, i);
    return [o[0], o[1], o[2], 1, null, [t, n, i]];
  }
}];
var o = Math.round;
function a(e) {
  var t;
  this.baseColor = e;
  if (e) {
    t = String(e).toLowerCase().replace(/ /g, "");
    t = function (e) {
      if (e === "transparent") {
        return [0, 0, 0, 0];
      }
      var t;
      for (var n = 0, o = i.length; n < o; ++n) {
        if (t = i[n].re.exec(e)) {
          return i[n].process(t);
        }
      }
      return null;
    }(t = n[t] ? "#" + n[t] : t);
  }
  if (!t) {
    this.colorIsInvalid = true;
  }
  t = t || {};
  this.r = r(t[0]);
  this.g = r(t[1]);
  this.b = r(t[2]);
  this.a = r(t[3], 1, 1);
  if (t[4]) {
    this.hsv = {
      h: t[4][0],
      s: t[4][1],
      v: t[4][2]
    };
  } else {
    this.hsv = function (e, t, n) {
      var i;
      var o;
      var a = Math.max(e, t, n);
      var r = Math.min(e, t, n);
      var s = a - r;
      var l = a;
      o = a === 0 ? 0 : 1 - r / a;
      if (a === r) {
        i = 0;
      } else {
        switch (a) {
          case e:
            i = (t - n) / s * 60;
            if (t < n) {
              i += 360;
            }
            break;
          case t:
            i = (n - e) / s * 60 + 120;
            break;
          case n:
            i = (e - t) / s * 60 + 240;
        }
      }
      o *= 100;
      l *= 100 / 255;
      return {
        h: Math.round(i),
        s: Math.round(o),
        v: Math.round(l)
      };
    }(this.r, this.g, this.b);
  }
  if (t[5]) {
    this.hsl = {
      h: t[5][0],
      s: t[5][1],
      l: t[5][2]
    };
  } else {
    this.hsl = function (e, t, n) {
      e = c(e, 255);
      t = c(t, 255);
      n = c(n, 255);
      var i;
      var a;
      var r = Math.max(e, t, n);
      var s = Math.min(e, t, n);
      var l = r + s;
      var u = l / 2;
      if (r === s) {
        i = a = 0;
      } else {
        var d = r - s;
        a = u > 0.5 ? d / (2 - l) : d / l;
        i = function (e, t, n, i) {
          switch (Math.max(e, t, n)) {
            case e:
              return (t - n) / i + (t < n ? 6 : 0);
            case t:
              return (n - e) / i + 2;
            case n:
              return (e - t) / i + 4;
          }
        }(e, t, n, d);
        i /= 6;
      }
      return {
        h: o(i * 360),
        s: o(a * 100),
        l: o(u * 100)
      };
    }(this.r, this.g, this.b);
  }
}
function r(e, t, n) {
  t = t || 0;
  n = n || 255;
  if (e < 0 || isNaN(e)) {
    return t;
  } else if (e > n) {
    return n;
  } else {
    return e;
  }
}
function s(e, t, n) {
  var i;
  var o;
  var a;
  var r = (100 - t) * n / 100;
  var s = e % 60 / 60 * (n - r);
  var l = r + s;
  var u = n - s;
  switch (Math.floor(e % 360 / 60)) {
    case 0:
      i = n;
      o = l;
      a = r;
      break;
    case 1:
      i = u;
      o = n;
      a = r;
      break;
    case 2:
      i = r;
      o = n;
      a = l;
      break;
    case 3:
      i = r;
      o = u;
      a = n;
      break;
    case 4:
      i = l;
      o = r;
      a = n;
      break;
    case 5:
      i = n;
      o = r;
      a = u;
  }
  return [Math.round(i * 2.55), Math.round(o * 2.55), Math.round(a * 2.55)];
}
function l(e, t) {
  var n = t;
  if (e === "r") {
    n = t + 1 / 3;
  }
  if (e === "b") {
    n = t - 1 / 3;
  }
  return n;
}
function u(e, t, n) {
  if ((n = function (e) {
    if (e < 0) {
      e += 1;
    }
    if (e > 1) {
      e -= 1;
    }
    return e;
  }(n)) < 1 / 6) {
    return e + (t - e) * 6 * n;
  } else if (n < 0.5) {
    return t;
  } else if (n < 2 / 3) {
    return e + (t - e) * (2 / 3 - n) * 6;
  } else {
    return e;
  }
}
function d(e, t, n) {
  var i;
  var a;
  var r;
  e = c(e, 360);
  t = c(t, 100);
  n = c(n, 100);
  if (t === 0) {
    i = a = r = n;
  } else {
    var s = n < 0.5 ? n * (1 + t) : n + t - n * t;
    var d = n * 2 - s;
    i = u(d, s, l("r", e));
    a = u(d, s, l("g", e));
    r = u(d, s, l("b", e));
  }
  return [o(i * 255), o(a * 255), o(r * 255)];
}
function c(e, t) {
  e = Math.min(t, Math.max(0, parseFloat(e)));
  if (Math.abs(e - t) < 0.000001) {
    return 1;
  } else {
    return e % t / parseFloat(t);
  }
}
function h(e, t, n) {
  t = t || 0;
  n = n || 255;
  return e % 1 == 0 && !(e < t) && !(e > n) && typeof e == "number" && !isNaN(e);
}
a.prototype = {
  constructor: a,
  highlight: function (e) {
    e = e || 10;
    return this.alter(e).toHex();
  },
  darken: function (e) {
    e = e || 10;
    return this.alter(-e).toHex();
  },
  alter: function (e) {
    var t = new a();
    t.r = r(this.r + e);
    t.g = r(this.g + e);
    t.b = r(this.b + e);
    return t;
  },
  blend: function (e, t) {
    var n = e instanceof a ? e : new a(e);
    var i = new a();
    i.r = r(o(this.r * (1 - t) + n.r * t));
    i.g = r(o(this.g * (1 - t) + n.g * t));
    i.b = r(o(this.b * (1 - t) + n.b * t));
    return i;
  },
  toHex: function () {
    e = this.r;
    t = this.g;
    n = this.b;
    return "#" + (e << 16 | 16777216 | t << 8 | n).toString(16).slice(1);
    var e;
    var t;
    var n;
  },
  getPureColor: function () {
    return new a("rgb(" + s(this.hsv.h, 100, 100).join(",") + ")");
  },
  isValidHex: function (e) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
  },
  isValidRGB: function (e, t, n) {
    return !!h(e) && !!h(t) && !!h(n);
  },
  isValidAlpha: function (e) {
    return !isNaN(e) && !(e < 0) && !(e > 1) && typeof e == "number";
  },
  colorIsInvalid: false,
  fromHSL: function (e) {
    var t = new a();
    var n = d(e.h, e.s, e.l);
    t.r = n[0];
    t.g = n[1];
    t.b = n[2];
    return t;
  }
};
var f = a;
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;