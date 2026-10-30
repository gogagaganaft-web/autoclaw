exports.encodeHtml = undefined;
exports.format = function (e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) {
    n[o - 1] = arguments[o];
  }
  if ((0, i.isFunction)(e)) {
    return e.apply(undefined, n);
  }
  n.forEach(function (t, n) {
    if ((0, i.isString)(t)) {
      t = t.replace(/\$/g, "$$$$");
    }
    var o = new RegExp("\\{" + n + "\\}", "gm");
    e = e.replace(o, t);
  });
  return e;
};
exports.replaceAll = exports.quadToObject = exports.isEmpty = undefined;
var i = require("./35922.js");
function o(e) {
  return (o = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var a;
a = [new RegExp("&", "g"), new RegExp("\"", "g"), new RegExp("'", "g"), new RegExp("<", "g"), new RegExp(">", "g")];
function r(e) {
  return String(e).replace(a[0], "&amp;").replace(a[1], "&quot;").replace(a[2], "&#39;").replace(a[3], "&lt;").replace(a[4], "&gt;");
}
exports.encodeHtml = r;
exports.quadToObject = function (e) {
  var t = function (e) {
    switch (o(e)) {
      case "string":
        return e.split(/\s+/, 4);
      case "object":
        return [e.x || e.h || e.left, e.y || e.v || e.top, e.x || e.h || e.right, e.y || e.v || e.bottom];
      case "number":
        return [e];
      default:
        return e;
    }
  }(e);
  var n = parseInt(t && t[0], 10);
  var i = parseInt(t && t[1], 10);
  var a = parseInt(t && t[2], 10);
  var r = parseInt(t && t[3], 10);
  if (!isFinite(n)) {
    n = 0;
  }
  if (!isFinite(i)) {
    i = n;
  }
  if (!isFinite(a)) {
    a = n;
  }
  if (!isFinite(r)) {
    r = i;
  }
  return {
    top: i,
    right: a,
    bottom: r,
    left: n
  };
};
function s(e, t, n) {
  return e.replace(new RegExp("(" + (t + "").replace(/([+*?.[^\]$(){}><|=!:])/g, "\\$1") + ")", "gi"), n);
}
exports.replaceAll = s;
var l;
l = /\s/g;
function u(e) {
  return !e || !e.replace(l, "");
}
exports.isEmpty = u;