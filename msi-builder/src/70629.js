exports.getFormat = function (e) {
  var t = ".";
  var n = e(1).indexOf("100") >= 0;
  t = f(t, e, n, true);
  var i = p(t = f(t, e, n, false), e, n, false);
  var o = p(t, e, n, true);
  if (o === "-" + i) {
    return i;
  } else {
    return i + ";" + o;
  }
};
exports.getFormatter = function (e, t) {
  t = t || a;
  return function (n) {
    if (typeof n != "number" || isNaN(n)) {
      return "";
    }
    var a = n > 0 || 1 / n == Infinity;
    var s = function (e) {
      var t = e.split(";");
      if (t.length === 1) {
        t.push("-" + t[0]);
      }
      return t;
    }(e)[a ? 0 : 1];
    var h = function (e) {
      var t = false;
      for (var n = 0; n < e.length; n++) {
        if (e[n] === "'") {
          t = !t;
        }
        if (e[n] === "." && !t) {
          return n;
        }
      }
      return e.length;
    }(s);
    var f = [s.substr(0, h), s.substr(h + 1)];
    var p = u(f[1]);
    var g = p + l(f[1]);
    if (function (e) {
      return e.indexOf("%") !== -1 && !e.match(/'[^']*%[^']*'/g);
    }(s)) {
      n = (0, i.multiplyInExponentialForm)(n, 2);
    }
    if (!a) {
      n = -n;
    }
    var m;
    var _ = u(f[0]);
    var v = l(f[0]) || t.unlimitedIntegerDigits ? undefined : _;
    var y = Math.floor(n).toString().length;
    var b = (0, i.fitIntoRange)(g, 0, 15 - y);
    var x = (m = f[0], m.split(",").slice(1).map(function (e) {
      var t = 0;
      return e.split("").filter(function (e, n) {
        t += e === "'";
        return (e === "#" || e === "0") && !(t % 2);
      }).length;
    })).reverse();
    var w = (0, o.toFixed)(n, b < 0 ? 0 : b).split(".");
    var C = d(r(w[0]), _, v);
    var S = d(w[1], p, g);
    C = function (e, t, n) {
      if (!t.length) {
        return e;
      }
      var i = [];
      var o = 0;
      while (e) {
        var a = t[o];
        if (!a) {
          break;
        }
        i.push(e.slice(0, a));
        e = e.slice(a);
        if (o < t.length - 1) {
          o++;
        }
      }
      return i.join(n);
    }(C, x, t.thousandsSeparator);
    var k = r(c(r(f[0]), C));
    var D = g ? c(f[1], S) : "";
    return k + (D.match(/\d/) ? t.decimalSeparator : "") + D;
  };
};
var i = require("./60810.js");
var o = require("./97360.js");
var a = {
  thousandsSeparator: ",",
  decimalSeparator: "."
};
function r(e) {
  return e.toString().split("").reverse().join("");
}
function s(e) {
  return e.replace(/'.+'/g, "");
}
function l(e) {
  if (!e) {
    return 0;
  }
  var t = s(e);
  return t.length - t.replace(/[#]/g, "").length;
}
function u(e) {
  if (!e) {
    return 0;
  }
  var t = s(e);
  return t.length - t.replace(/[0]/g, "").length;
}
function d(e, t, n) {
  if (!e) {
    return "";
  }
  for (e.length > n && (e = e.substr(0, n)); e.length > t && e.slice(-1) === "0";) {
    e = e.substr(0, e.length - 1);
  }
  while (e.length < t) {
    e += "0";
  }
  return e;
}
function c(e, t) {
  return e.split("'").map(function (e, n) {
    var i = n % 2;
    if (!e && i) {
      return "'";
    } else if (i) {
      return e;
    } else {
      return e.replace(/[,#0]+/, t);
    }
  }).join("");
}
function h(e, t, n) {
  var i = (t ? 0.01 : 1) * parseFloat(e) || 0;
  if (n) {
    return -i;
  } else {
    return i;
  }
}
function f(e, t, n, i) {
  var o;
  var a;
  var r;
  var s = e;
  do {
    if (r) {
      o = a.length === r.length ? "0" : "1";
      e = i ? o + e : e + o;
    }
    a = r || t(h(s, n));
    r = t(h(s = i ? "1" + s : s + "1", n));
  } while (a !== r && (i ? a.length === r.length : a.length <= r.length));
  if (i && r.length > a.length) {
    var l = t(12345).indexOf("12345") === -1;
    do {
      e = "1" + e;
    } while (l && h(e, n) < 100000);
  }
  return e;
}
function p(e, t, n, i) {
  var o = t(h(e, n, i));
  var a = e.split(".");
  var r = t(h(a[0] + ".3" + a[1].slice(1), n, i)).indexOf("3") - 1;
  o = o.replace(/(\d)\D(\d)/g, "$1,$2");
  if (r >= 0) {
    o = o.slice(0, r) + "." + o.slice(r + 1);
  }
  o = o.replace(/1+/, "1").replace(/1/g, "#");
  if (!n) {
    o = o.replace("%", "'%'");
  }
  return o;
}