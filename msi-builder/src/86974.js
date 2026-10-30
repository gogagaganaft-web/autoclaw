exports.sortDatesArray = exports.monthDifference = exports.isSameDates = exports.isSameDateArrays = exports.getDeserializedDate = undefined;
var i = a(require("./91198.js"));
var o = a(require("./69434.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function r(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
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
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
  return o.default.deserializeDate(e);
}
exports.getDeserializedDate = l;
function u(e, t) {
  return !e && !t || i.default.sameDate(l(e), l(t));
}
exports.isSameDates = u;
exports.isSameDateArrays = function (e, t) {
  var n = r(e, 2);
  var i = n[0];
  var o = n[1];
  var a = r(t, 2);
  var s = a[0];
  var l = a[1];
  return u(i, s) && u(o, l);
};
exports.sortDatesArray = function (e) {
  var t = r(e, 2);
  var n = t[0];
  var i = t[1];
  if (n && i && l(n) > l(i)) {
    return [i, n];
  } else {
    return e;
  }
};
exports.monthDifference = function (e, t) {
  return (t.getFullYear() - e.getFullYear()) * 12 - e.getMonth() + t.getMonth();
};