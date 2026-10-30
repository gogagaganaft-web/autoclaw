exports.extendFromObject = exports.extend = undefined;
var i = require("./35922.js");
exports.extendFromObject = function (e, t, n) {
  e = e || {};
  for (var i in t) {
    if (Object.prototype.hasOwnProperty.call(t, i)) {
      var o = t[i];
      if (!(i in e) || !!n) {
        e[i] = o;
      }
    }
  }
  return e;
};
exports.extend = function e(t) {
  var n = 1;
  var o = false;
  for (typeof (t = t || {}) == "boolean" && (o = t, t = arguments[1] || {}, n++); n < arguments.length; n++) {
    var a = arguments[n];
    if (a != null) {
      for (var r in a) {
        var s = t[r];
        var l = a[r];
        var u = false;
        var d = undefined;
        if (r !== "__proto__" && r !== "constructor" && t !== l) {
          if (o && l && ((0, i.isPlainObject)(l) || (u = Array.isArray(l)))) {
            d = u ? s && Array.isArray(s) ? s : [] : s && (0, i.isPlainObject)(s) ? s : {};
            t[r] = e(o, d, l);
          } else if (l !== undefined) {
            t[r] = l;
          }
        }
      }
    }
  }
  return t;
};