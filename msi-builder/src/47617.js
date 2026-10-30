exports.toComparable = exports.getPathParts = exports.compileSetter = exports.compileGetter = undefined;
var i = u(require("./17381.js"));
var o = u(require("./38377.js"));
var a = require("./48013.js");
var r = require("./35922.js");
var s = require("./95479.js");
var l = u(require("./26974.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = l.default.unwrap;
var c = l.default.isWrapped;
var h = l.default.assign;
function f(e) {
  return (t = e, t.replace(/\[/g, ".").replace(/\]/g, "")).split(".");
  var t;
}
exports.getPathParts = f;
function p(e, t, n, o) {
  if (t === "this") {
    throw new i.default.Error("E4016");
  }
  var a = e[t];
  if (o.unwrapObservables && c(a)) {
    h(a, n);
  } else {
    e[t] = n;
  }
}
function g(e) {
  (e = e || {}).unwrapObservables = e.unwrapObservables === undefined || e.unwrapObservables;
  return e;
}
function m(e, t) {
  if (t.unwrapObservables) {
    return d(e);
  } else {
    return e;
  }
}
function _(e) {
  if (arguments.length > 1) {
    e = [].slice.call(arguments);
  }
  if (!e || e === "this") {
    return function (e) {
      return e;
    };
  }
  if (typeof e == "string") {
    var t = f(e);
    return function (e, n) {
      var i = (n = g(n)).functionsAsIs;
      var o = "defaultValue" in n;
      var a = m(e, n);
      for (var s = 0; s < t.length; s++) {
        if (!a) {
          if (a == null && o) {
            return n.defaultValue;
          }
          break;
        }
        var l = t[s];
        if (o && (0, r.isObject)(a) && !(l in a)) {
          return n.defaultValue;
        }
        var u = m(a[l], n);
        if (!i && (0, r.isFunction)(u)) {
          u = u.call(a);
        }
        a = u;
      }
      return a;
    };
  }
  if (Array.isArray(e)) {
    return v(e);
  } else if ((0, r.isFunction)(e)) {
    return e;
  } else {
    return undefined;
  }
}
function v(e) {
  var t = {};
  for (var n = 0, i = e.length; n < i; n++) {
    var o = e[n];
    t[o] = _(o);
  }
  return function (e, n) {
    var i;
    (0, s.each)(t, function (t) {
      var o = this(e, n);
      if (o !== undefined) {
        var a = i ||= {};
        var r = t.split(".");
        for (var s = r.length - 1, l = 0; l < s; l++) {
          var u = r[l];
          if (!(u in a)) {
            a[u] = {};
          }
          a = a[u];
        }
        a[r[s]] = o;
      }
    });
    return i;
  };
}
exports.compileGetter = _;
function y(e, t, n, i) {
  if ((0, r.isDefined)(n)) {
    return n;
  }
  var o = {};
  p(e, t, o, i);
  return o;
}
exports.compileSetter = function (e) {
  var t = (e = f(e || "this")).length - 1;
  return function (n, i, o) {
    var s = m(n, o = g(o));
    e.forEach(function (e, n) {
      var l = function (e, t, n) {
        n = n || {};
        return m(t === "this" ? e : e[t], n);
      }(s, e, o);
      var u = !o.functionsAsIs && (0, r.isFunction)(l) && !c(l);
      if (n === t) {
        if (o.merge && (0, r.isPlainObject)(i) && (!(0, r.isDefined)(l) || (0, r.isPlainObject)(l))) {
          l = y(s, e, l, o);
          (0, a.deepExtendArraySafe)(l, i, false, true);
        } else if (u) {
          s[e](i);
        } else {
          p(s, e, i, o);
        }
      } else {
        l = y(s, e, l, o);
        if (u) {
          l = l.call(s);
        }
        s = l;
      }
    });
  };
};
exports.toComparable = function (e, t, n = {}) {
  if (e instanceof Date) {
    return e.getTime();
  }
  if (e && e instanceof o.default && e.valueOf) {
    return e.valueOf();
  }
  if (!t && typeof e == "string") {
    var i;
    if ((n == null || (i = n.collatorOptions) === null || i === undefined ? undefined : i.sensitivity) === "base") {
      var a = /[\u0300-\u036f]/g;
      e = e.normalize("NFD").replace(a, "");
    }
    if (n != null && n.locale) {
      return e.toLocaleLowerCase(n.locale);
    } else {
      return e.toLowerCase();
    }
  }
  return e;
};