exports.orderEach = exports.deepExtendArraySafe = exports.clone = undefined;
var i;
var o = require("./35922.js");
var a = (i = require("./26974.js")) && i.__esModule ? i : {
  default: i
};
var r = function () {
  function e() {}
  return function (t) {
    e.prototype = t;
    return new e();
  };
}();
exports.clone = r;
exports.orderEach = function (e, t) {
  var n;
  var i;
  var a = [];
  for (n in e) {
    if (Object.prototype.hasOwnProperty.call(e, n)) {
      a.push(n);
    }
  }
  a.sort(function (e, t) {
    var n = (0, o.isNumeric)(e);
    var i = (0, o.isNumeric)(t);
    if (n && i) {
      return e - t;
    } else if (n && !i) {
      return -1;
    } else if (!n && i) {
      return 1;
    } else if (e < t) {
      return -1;
    } else if (e > t) {
      return 1;
    } else {
      return 0;
    }
  });
  i = 0;
  for (; i < a.length; i++) {
    t(n = a[i], e[n]);
  }
};
function s(e, t, n, i) {
  if (!i && a.default.isWrapped(e[t])) {
    a.default.assign(e[t], n);
  } else {
    e[t] = n;
  }
}
exports.deepExtendArraySafe = function e(t, n, i, a) {
  var r;
  var l;
  for (var u in n) {
    r = t[u];
    l = n[u];
    if (u !== "__proto__" && u !== "constructor" && t !== l) {
      if ((0, o.isPlainObject)(l)) {
        l = e((i ? (0, o.isObject)(r) : (0, o.isPlainObject)(r)) ? r : {}, l, i, a);
      }
      if (l !== undefined && r !== l) {
        s(t, u, l, a);
      }
    }
  }
  return t;
};