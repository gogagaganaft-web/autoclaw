exports.compare = function (e, t, n) {
  function i(e) {
    if (typeof e == "string") {
      return e.split(".");
    } else if (typeof e == "number") {
      return [e];
    } else {
      return e;
    }
  }
  e = i(e);
  t = i(t);
  var o = Math.max(e.length, t.length);
  if (isFinite(n)) {
    o = Math.min(o, n);
  }
  for (var a = 0; a < o; a++) {
    var r = parseInt(e[a] || 0, 10);
    var s = parseInt(t[a] || 0, 10);
    if (r < s) {
      return -1;
    }
    if (r > s) {
      return 1;
    }
  }
  return 0;
};