exports.reverseEach = exports.map = exports.each = undefined;
exports.map = function (e, t) {
  if (Array.isArray(e)) {
    return e.map(t);
  }
  var n = [];
  for (var i in e) {
    n.push(t(e[i], i));
  }
  return n;
};
exports.each = function (e, t) {
  if (e) {
    if ("length" in e) {
      for (var n = 0; n < e.length && t.call(e[n], n, e[n]) !== false; n++);
    } else {
      for (var i in e) {
        if (t.call(e[i], i, e[i]) === false) {
          break;
        }
      }
    }
    return e;
  }
};
exports.reverseEach = function (e, t) {
  if (e && "length" in e && e.length !== 0) {
    for (var n = e.length - 1; n >= 0 && t.call(e[n], n, e[n]) !== false; n--);
  }
};