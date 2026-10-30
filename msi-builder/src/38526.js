exports.ExportFormat = undefined;
var i = require("./68752.js");
var o = d(require("./18016.js"));
var a = d(require("./91500.js"));
var r = require("./35922.js");
var s = require("./59937.js");
var l = require("./9821.js");
var u = require("./13306.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./89740.js");
var c = {
  thousands: "#,##0{0},&quot;K&quot;",
  millions: "#,##0{0},,&quot;M&quot;",
  billions: "#,##0{0},,,&quot;B&quot;",
  trillions: "#,##0{0},,,,&quot;T&quot;",
  percent: "0{0}%",
  decimal: "#{0}",
  fixedpoint: "#,##0{0}",
  exponential: "0{0}E+00",
  currency: " "
};
var h = /a+/g;
var f = /E/g;
var p = /dE+/g;
var g = /L/g;
var m = /h/g;
var _ = /./g;
function v(e) {
  var t = (a.default.format(new Date(2009, 8, 8, 6, 5, 4), e) || "").toString();
  var n = (0, s.getFormat)(function (t) {
    return a.default.format(t, e);
  });
  if (n) {
    n = function (e) {
      return e.split("/").join("\\/").split("'").map(function (e, t) {
        if (t % 2 == 0) {
          return e.replace(h, "AM/PM").replace(p, "d").replace(f, "d").replace(g, "M").replace(m, "H").split("[").join("\\[").split("]").join("\\]");
        } else if (e) {
          return e.replace(_, "\\$&");
        } else {
          return "'";
        }
      }).join("");
    }(n);
    n = function (e) {
      var t = (0, l.getLanguageId)();
      var n = t ? t.toString(16) : "";
      var i = "";
      if (function (e) {
        var t;
        for (var n = 0; n < e.length; n++) {
          if ((t = e.charCodeAt(n)) >= 1632 && t < 1642) {
            return true;
          }
        }
        return false;
      }(e)) {
        while (n.length < 3) {
          n = "0" + n;
        }
        i = "[$-2010" + n + "]";
      } else if (n) {
        i = "[$-" + n + "]";
      }
      return i;
    }(t) + n;
  }
  return n;
}
function y(e) {
  return !!e && (!!/^[@=\t\r]/.test(e) || !!/^[+-]/.test(e) && !(0, r.isNumeric)(e));
}
var b = {
  formatObjectConverter: function (e, t) {
    var n = {
      format: e,
      precision: e && e.precision,
      dataType: t
    };
    if ((0, r.isObject)(e)) {
      return (0, u.extend)(n, e, {
        format: e.formatter || e.type,
        currency: e.currency
      });
    } else {
      return n;
    }
  },
  convertFormat: function (e, t, n, a) {
    if ((0, r.isDefined)(e)) {
      if (n === "date") {
        return v(e);
      }
      if ((0, r.isString)(e) && c[e.toLowerCase()]) {
        return function (e, t, n) {
          var a;
          var r;
          if (r = e === "currency" ? o.default.getOpenXmlCurrencyFormat(n) : c[e.toLowerCase()]) {
            a = (0, i.format)(r, function (e, t) {
              var n;
              var i;
              if (t > 0) {
                n = e !== "decimal" ? "." : "";
                i = 0;
                for (; i < t; i++) {
                  n += "0";
                }
                return n;
              }
              return "";
            }(e, t));
          }
          return a;
        }(e, t, a);
      }
    }
  },
  encode: function (e) {
    var t = false;
    if (!function (e) {
      return !!e && !(e.length < 2) && y(e);
    }(e)) {
      if (function (e, t) {
        return !!e && !(e.length < 4) && e[0] === t && y(e.substring(1, e.length - 1));
      }(e, "\"")) {
        e = e.substring(1, e.length - 1);
        t = true;
      }
    } else {
      t = true;
    }
    if (t) {
      var n = `""`;
      return "\"'" + e.replaceAll("\"", n) + "\"";
    }
    return e;
  }
};
exports.ExportFormat = b;