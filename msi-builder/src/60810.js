exports.adjust = function (e, t) {
  var n;
  var r = a(t || 0) + 2;
  var s = e.toString().split(".");
  var l = e;
  var u = Math.abs(e);
  var d = (0, i.isExponential)(e);
  var c = u > 1 ? 10 : 0;
  if (s.length === 1) {
    return e;
  }
  if (!d) {
    if ((0, i.isExponential)(t)) {
      r = s[0].length + o(t);
    }
    e = (e = u) - Math.floor(e) + c;
  }
  r = function () {
    return 0.0003.toPrecision(3) !== "0.000300";
  }() && o(e) > 6 || r > 7 ? 15 : 7;
  if (!d && (n = parseFloat(e.toPrecision(r)).toString().split("."))[0] === c.toString()) {
    return parseFloat(s[0] + "." + n[1]);
  }
  return parseFloat(l.toPrecision(r));
};
exports.fitIntoRange = undefined;
exports.getExponent = o;
exports.getExponentLength = function (e) {
  var n = e.toString();
  return n.split(".")[1]?.length || parseInt(n.split("e-")[1]) || 0;
};
exports.getPrecision = a;
exports.getRemainderByDivision = function (e, t, n) {
  if (t === parseInt(t)) {
    return e % t;
  }
  var i = s(e / t, n);
  return (i - parseInt(i)) * t;
};
exports.getRoot = r;
exports.inRange = undefined;
exports.multiplyInExponentialForm = function (e, t) {
  var n = function (e) {
    var t = e.toExponential().split("e");
    var n = parseFloat(t[0]);
    return {
      exponent: parseInt(t[1]),
      mantissa: n
    };
  }(e);
  return parseFloat(`${n.mantissa}e${n.exponent + t}`);
};
exports.roundFloatPart = s;
exports.sign = undefined;
exports.solveCubicEquation = function (e, t, n, i) {
  if (Math.abs(e) < 1e-8) {
    e = t;
    t = n;
    n = i;
    if (Math.abs(e) < 1e-8) {
      e = t;
      t = n;
      if (Math.abs(e) < 1e-8) {
        return [];
      } else {
        return [-t / e];
      }
    }
    var o = t * t - e * 4 * n;
    if (Math.abs(o) < 1e-8) {
      return [-t / (e * 2)];
    } else if (o > 0) {
      return [(-t + Math.sqrt(o)) / (e * 2), (-t - Math.sqrt(o)) / (e * 2)];
    } else {
      return [];
    }
  }
  var a;
  var s;
  var l = (e * 3 * n - t * t) / (e * 3 * e);
  var u = (t * 2 * t * t - e * 9 * t * n + e * 27 * e * i) / (e * 27 * e * e);
  if (Math.abs(l) < 1e-8) {
    a = [r(-u, 3)];
  } else if (Math.abs(u) < 1e-8) {
    a = [0].concat(l < 0 ? [Math.sqrt(-l), -Math.sqrt(-l)] : []);
  } else {
    var d = u * u / 4 + l * l * l / 27;
    if (Math.abs(d) < 1e-8) {
      a = [u * -1.5 / l, u * 3 / l];
    } else if (d > 0) {
      s = r(-u / 2 - Math.sqrt(d), 3);
      a = [s - l / (s * 3)];
    } else {
      s = Math.sqrt(-l / 3) * 2;
      var c = Math.acos(u * 3 / l / s) / 3;
      var h = Math.PI * 2 / 3;
      a = [s * Math.cos(c), s * Math.cos(c - h), s * Math.cos(c - h * 2)];
    }
  }
  for (var f = 0; f < a.length; f++) {
    a[f] -= t / (e * 3);
  }
  return a;
};
exports.trunc = function (e) {
  if (Math.trunc) {
    return Math.trunc(e);
  } else if (e > 0) {
    return Math.floor(e);
  } else {
    return Math.ceil(e);
  }
};
var i = require("./35922.js");
exports.sign = function (e) {
  if (e === 0) {
    return 0;
  } else {
    return e / Math.abs(e);
  }
};
exports.fitIntoRange = function (e, t, n) {
  var i = !t && t !== 0;
  var o = !n && n !== 0;
  if (i) {
    t = o ? e : Math.min(e, n);
  }
  if (o) {
    n = i ? e : Math.max(e, t);
  }
  return Math.min(Math.max(e, t), n);
};
function o(e) {
  return Math.abs(parseInt(e.toExponential().split("e")[1]));
}
function a(e) {
  var t = e.toString();
  if (t.indexOf(".") < 0) {
    return 0;
  }
  var n = t.split(".");
  var i = n[1].indexOf("e");
  if (i >= 0) {
    return i;
  } else {
    return n[1].length;
  }
}
function r(e, t) {
  if (e < 0 && t % 2 != 1) {
    return NaN;
  }
  var n = Math.pow(Math.abs(e), 1 / t);
  if (t % 2 == 1 && e < 0) {
    return -n;
  } else {
    return n;
  }
}
function s(e, t = 0) {
  return parseFloat(e.toFixed(t));
}
exports.inRange = function (e, t, n) {
  return e >= t && e <= n;
};