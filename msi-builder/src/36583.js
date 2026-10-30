exports.updatePropsImmutable = function (e, t, n, a) {
  var r = t[n];
  var s = e[n];
  var u = e;
  if ((0, i.isPlainObject)(r) || n !== a && Array.isArray(r)) {
    u[n] = function e(t, n, o) {
      var a = o.length > 0 && n && t !== n ? l(n) : l(t);
      var r = o[0];
      if (o.length > 1) {
        a[r] = e(t[r], n == null ? undefined : n[r], o.slice(1));
      } else if (r) {
        if ((0, i.isPlainObject)(t[r])) {
          a[r] = l(t[r]);
        } else {
          a[r] = t[r];
        }
      }
      return a;
    }(r, s, (0, o.getPathParts)(a).slice(1));
  } else {
    u[n] = r;
  }
};
var i = require("./35922.js");
var o = require("./47617.js");
function a() {
  return (a = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function r(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return s(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return s(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return s(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function s(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function l(e) {
  if (Array.isArray(e)) {
    return r(e);
  } else {
    return a({}, e);
  }
}