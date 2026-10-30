exports.isKeysEqual = exports.findChanges = undefined;
var i = require("./35922.js");
function o(e, t) {
  var n = t(e);
  if ((0, i.isObject)(n)) {
    try {
      return JSON.stringify(n);
    } catch (e) {
      return n;
    }
  }
  return n;
}
function a(e, t, n, i) {
  return t[n[o(e, i)]];
}
exports.isKeysEqual = function (e, t) {
  if (e.length !== t.length) {
    return false;
  }
  for (var n = 0; n < t.length; n++) {
    if (e[n] !== t[n]) {
      return false;
    }
  }
  return true;
};
exports.findChanges = function (e, t, n, i) {
  var r = {};
  var s = {};
  var l = 0;
  var u = 0;
  var d = [];
  e.forEach(function (e, t) {
    var i = o(e, n);
    r[i] = t;
  });
  t.forEach(function (e, t) {
    var i = o(e, n);
    s[i] = t;
  });
  for (var c = Math.max(e.length, t.length), h = 0; h < c + l; h++) {
    var f = t[h];
    var p = h - l + u;
    var g = e[p];
    if (!f || g && !a(g, t, s, n)) {
      if (g) {
        d.push({
          type: "remove",
          key: n(g),
          index: h,
          oldItem: g
        });
        u++;
        h--;
      }
    } else {
      var m = o(f, n);
      var _ = r[m];
      var v = e[_];
      if (v) {
        if (_ !== p) {
          return;
        }
        if (!i(v, f)) {
          d.push({
            type: "update",
            data: f,
            key: n(f),
            index: h,
            oldItem: v
          });
        }
      } else {
        l++;
        d.push({
          type: "insert",
          data: f,
          index: h
        });
      }
    }
  }
  return d;
};