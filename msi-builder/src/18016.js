exports.default = undefined;
var i = f(require("./20476.js"));
var o = require("./20576.js");
var a = require("./95479.js");
var r = require("./35922.js");
var s = require("./70629.js");
var l = f(require("./80209.js"));
var u = f(require("./17381.js"));
var d = require("./97360.js");
var c = f(require("./89740.js"));
var h = f(require("./38702.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t) {
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
      return g(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return g(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function g(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var m = typeof Intl != "undefined";
var _ = ["currency", "fixedpoint", "exponential", "percent", "decimal"];
var v = {
  1: "K",
  2: "M",
  3: "B",
  4: "T"
};
var y = {
  largenumber: "auto",
  thousands: 1,
  millions: 2,
  billions: 3,
  trillions: 4
};
var b = (0, i.default)({
  engine: function () {
    return "base";
  },
  numericFormats: _,
  defaultLargeNumberFormatPostfixes: v,
  _parseNumberFormatString: function (e) {
    var t = {};
    if (e && typeof e == "string") {
      var n = e.toLowerCase().split(" ");
      (0, a.each)(n, function (e, n) {
        if (_.includes(n)) {
          t.formatType = n;
        } else if (n in y) {
          t.power = y[n];
        }
      });
      if (t.power && !t.formatType) {
        t.formatType = "fixedpoint";
      }
      if (t.formatType) {
        return t;
      } else {
        return undefined;
      }
    }
  },
  _calculateNumberPower: function (e, t, n, i) {
    var o = Math.abs(e);
    var a = 0;
    if (o > 1) {
      while (o && o >= t && (i === undefined || a < i)) {
        a++;
        o /= t;
      }
    } else if (o > 0 && o < 1) {
      while (o < 1 && (n === undefined || a > n)) {
        a--;
        o *= t;
      }
    }
    return a;
  },
  _getNumberByPower: function (e, t, n) {
    var i = e;
    while (t > 0) {
      i /= n;
      t--;
    }
    while (t < 0) {
      i *= n;
      t++;
    }
    return i;
  },
  _formatNumber: function (e, t, n) {
    if (t.power === "auto") {
      t.power = this._calculateNumberPower(e, 1000, 0, 4);
    }
    if (t.power) {
      e = this._getNumberByPower(e, t.power, 1000);
    }
    var i = this.defaultLargeNumberFormatPostfixes[t.power] || "";
    var o = this._formatNumberCore(e, t.formatType, n);
    return o = o.replace(/(\d|.$)(\D*)$/, "$1" + i + "$2");
  },
  _formatNumberExponential: function (e, t) {
    var n = this._calculateNumberPower(e, 10);
    var i = this._getNumberByPower(e, n, 10);
    if (t.precision === undefined) {
      t.precision = 1;
    }
    if (i.toFixed(t.precision || 0) >= 10) {
      n++;
      i /= 10;
    }
    var o = (n >= 0 ? "+" : "") + n.toString();
    return this._formatNumberCore(i, "fixedpoint", t) + "E" + o;
  },
  _addZeroes: function (e, t) {
    var n = Math.pow(10, t);
    var i = e < 0 ? "-" : "";
    for (var o = (e = (Math.abs(e) * n >>> 0) / n).toString(); o.length < t;) {
      o = "0" + o;
    }
    return i + o;
  },
  _addGroupSeparators: function (e) {
    var t = e.toString().split(".");
    return t[0].replace(/\B(?=(\d{3})+(?!\d))/g, (0, l.default)().thousandsSeparator) + (t[1] ? (0, l.default)().decimalSeparator + t[1] : "");
  },
  _formatNumberCore: function (e, t, n) {
    if (t === "exponential") {
      return this._formatNumberExponential(e, n);
    } else {
      if (t !== "decimal" && n.precision !== null) {
        n.precision = n.precision || 0;
      }
      if (t === "percent") {
        e *= 100;
      }
      if (n.precision !== undefined) {
        e = t === "decimal" ? this._addZeroes(e, n.precision) : n.precision === null ? e.toPrecision() : (0, d.toFixed)(e, n.precision);
      }
      e = t !== "decimal" ? this._addGroupSeparators(e) : e.toString().replace(".", (0, l.default)().decimalSeparator);
      if (t === "percent") {
        e += "%";
      }
      return e;
    }
  },
  _normalizeFormat: function (e) {
    if (e) {
      if (typeof e != "function" && !(0, r.isPlainObject)(e)) {
        e = {
          type: e
        };
      }
      return e;
    } else {
      return {};
    }
  },
  _getSeparators: function () {
    return {
      decimalSeparator: this.getDecimalSeparator(),
      thousandsSeparator: this.getThousandsSeparator()
    };
  },
  getThousandsSeparator: function () {
    return this.format(10000, "fixedPoint")[2];
  },
  getDecimalSeparator: function () {
    return this.format(1.2, {
      type: "fixedPoint",
      precision: 1
    })[1];
  },
  convertDigits: function (e, t) {
    var n = this.format(90, "decimal");
    if (typeof e != "string" || n[1] === "0") {
      return e;
    }
    var i = t ? n[1] : "0";
    var o = t ? "0" : n[1];
    var a = t ? n[0] : "9";
    var r = new RegExp("[" + i + "-" + a + "]", "g");
    return e.replace(r, function (e) {
      return String.fromCharCode(e.charCodeAt(0) + (o.charCodeAt(0) - i.charCodeAt(0)));
    });
  },
  getNegativeEtalonRegExp: function (e) {
    var t = this._getSeparators();
    var n = new RegExp("[0-9" + (0, o.escapeRegExp)(t.decimalSeparator + t.thousandsSeparator) + "]+", "g");
    var i = this.format(-1, e).replace(n, "1");
    ["\\", "(", ")", "[", "]", "*", "+", "$", "^", "?", "|", "{", "}"].forEach(function (e) {
      i = i.replace(new RegExp(`\\${e}`, "g"), `\\${e}`);
    });
    i = (i = i.replace(/ /g, "\\s")).replace(/1/g, ".*");
    return new RegExp(i, "g");
  },
  getSign: function (e, t) {
    if (!t) {
      if (e.replace(/[^0-9-]/g, "").charAt(0) === "-") {
        return -1;
      } else {
        return 1;
      }
    }
    var n = this.getNegativeEtalonRegExp(t);
    if (e.match(n)) {
      return -1;
    } else {
      return 1;
    }
  },
  format: function (e, t) {
    if (typeof e != "number") {
      return e;
    }
    if (typeof t == "number") {
      return e;
    }
    if (typeof (t = t && t.formatter || t) == "function") {
      return t(e);
    }
    if (!(t = this._normalizeFormat(t)).type) {
      t.type = "decimal";
    }
    var n = this._parseNumberFormatString(t.type);
    if (!n) {
      var i = this._getSeparators();
      i.unlimitedIntegerDigits = t.unlimitedIntegerDigits;
      return this.convertDigits((0, s.getFormatter)(t.type, i)(e));
    }
    return this._formatNumber(e, n, t);
  },
  parse: function (e, t) {
    if (e) {
      if (t && t.parser) {
        return t.parser(e);
      }
      e = this.convertDigits(e, true);
      if (t && typeof t != "string") {
        u.default.log("W0011");
      }
      var n = this.getDecimalSeparator();
      var i = new RegExp("[^0-9" + (0, o.escapeRegExp)(n) + "]", "g");
      var a = e.replace(i, "").replace(n, ".").replace(/\.$/g, "");
      if (a === "." || a === "") {
        return null;
      }
      if (this._calcSignificantDigits(a) > 15) {
        return NaN;
      }
      var r = +a * this.getSign(e, t);
      t = this._normalizeFormat(t);
      var s = this._parseNumberFormatString(t.type);
      var l = s == null ? undefined : s.power;
      if (l) {
        if (l === "auto") {
          var d = e.match(/\d(K|M|B|T)/);
          if (d) {
            l = Object.keys(v).find(function (e) {
              return v[e] === d[1];
            });
          }
        }
        r *= Math.pow(10, l * 3);
      }
      if ((s == null ? undefined : s.formatType) === "percent") {
        r /= 100;
      }
      return r;
    }
  },
  _calcSignificantDigits: function (e) {
    var t = p(e.split("."), 2);
    var n = t[0];
    var i = t[1];
    function o(e) {
      var t = -1;
      for (var n = 0; n < e.length; n++) {
        if (e[n] !== "0") {
          t = n;
          break;
        }
      }
      if (t > -1) {
        return e.length - t;
      } else {
        return 0;
      }
    }
    var a = 0;
    if (n) {
      a += o(n.split(""));
    }
    if (i) {
      a += o(i.split("").reverse());
    }
    return a;
  }
});
b.inject(c.default);
if (m) {
  b.inject(h.default);
}
var x = b;
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;