exports.default = undefined;
var i = s(require("./80209.js"));
var o = require("./40594.js");
var a = s(require("./15564.js"));
var r = require("./35922.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = /^(\d{4,})(-)?(\d{2})(-)?(\d{2})(?:T(\d{2})(:)?(\d{2})?(:)?(\d{2}(?:\.(\d{1,3})\d*)?)?)?(Z|([+-])(\d{2})(:)?(\d{2})?)?$/;
var u = /^(\d{2}):(\d{2})(:(\d{2}))?$/;
var d = ["", "yyyy", "", "MM", "", "dd", "THH", "", "mm", "", "ss", ".SSS"];
var c = /^(\d{4})\/(\d{2})\/(\d{2})$/;
function h(e, t) {
  var n;
  if ((0, r.isString)(e) && !t) {
    n = function (e) {
      var t = e.match(l);
      if (!t) {
        if (t = e.match(u)) {
          return new Date(0, 0, 0, f(t[1]), f(t[2]), f(t[4]));
        } else {
          return undefined;
        }
      }
      var n = f(t[1]);
      var i = --t[3];
      var o = t[5];
      var a = 0;
      var r = 0;
      function s(e) {
        if (n < 100) {
          e.setFullYear(n);
        }
        return e;
      }
      a = f(t[14]);
      r = f(t[16]);
      if (t[13] === "-") {
        a = -a;
        r = -r;
      }
      var d = f(t[6]) - a;
      var c = f(t[8]) - r;
      var h = f(t[10]);
      g = t[11];
      var p = f(g = g || "") * Math.pow(10, 3 - g.length);
      var g;
      if (t[12]) {
        return s(new Date(Date.UTC(n, i, o, d, c, h, p)));
      }
      return s(new Date(n, i, o, d, c, h, p));
    }(e);
  }
  return n || function (e) {
    var t = p(e) === "yyyy/MM/dd";
    var n = !(0, r.isDate)(e) && Date.parse(e);
    if (!n && t) {
      var i = e.match(c);
      if (i) {
        var o = new Date(f(i[1]), f(i[2]), f(i[3]));
        o.setFullYear(f(i[1]));
        o.setMonth(f(i[2]) - 1);
        o.setDate(f(i[3]));
        return o;
      }
    }
    if ((0, r.isNumeric)(n)) {
      return new Date(n);
    } else {
      return e;
    }
  }(e);
}
function f(e) {
  return +e || 0;
}
function p(e) {
  if (typeof e == "number") {
    return "number";
  } else if ((0, r.isString)(e)) {
    if ((0, i.default)().forceIsoDateParsing) {
      t = function (e, t) {
        var n = e.match(l);
        var i = "";
        if (!n) {
          if (n = e.match(u)) {
            if (n[3]) {
              return "HH:mm:ss";
            } else {
              return "HH:mm";
            }
          } else {
            return undefined;
          }
        }
        for (var o = 1; o < d.length; o++) {
          if (n[o]) {
            i += d[o] || n[o];
          }
        }
        if (n[12] === "Z") {
          i += "'Z'";
        }
        if (n[14]) {
          if (n[15]) {
            i += "xxx";
          } else if (n[16]) {
            i += "xx";
          } else {
            i += "x";
          }
        }
        return i;
      }(e);
    }
    return t || (e.indexOf(":") >= 0 ? "yyyy/MM/dd HH:mm:ss" : "yyyy/MM/dd");
  } else if (e) {
    return null;
  } else {
    return undefined;
  }
  var t;
}
var g = {
  dateParser: h,
  deserializeDate: function (e) {
    if (typeof e == "number") {
      return new Date(e);
    } else {
      return h(e, !(0, i.default)().forceIsoDateParsing);
    }
  },
  serializeDate: function (e, t) {
    if (t) {
      if ((0, r.isDate)(e)) {
        if (t === "number") {
          if (e && e.valueOf) {
            return e.valueOf();
          } else {
            return null;
          }
        } else {
          return (0, o.getFormatter)(t, a.default)(e);
        }
      } else {
        return null;
      }
    } else {
      return e;
    }
  },
  getDateSerializationFormat: p
};
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;