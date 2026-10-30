exports.applyBatch = y;
exports.applyChanges = function (e, t, n = {}) {
  var i = n.keyExpr;
  var o = i === undefined ? "id" : i;
  var a = n.immutable;
  var r = a === undefined || a;
  var s = (0, u.compileGetter)(o);
  var l = {
    key: function () {
      return o;
    },
    keyOf: function (e) {
      return s(e);
    }
  };
  return y({
    keyInfo: l,
    data: e,
    changes: t,
    immutable: r,
    disableCache: true,
    logError: true
  });
};
exports.createObjectWithChanges = v;
exports.indexByKey = S;
exports.insert = w;
exports.remove = C;
exports.update = x;
var i = require("./35922.js");
var o = c(require("./80209.js"));
var a = c(require("./73176.js"));
var r = require("./13306.js");
var s = require("./18438.js");
var l = require("./48013.js");
var u = require("./47617.js");
var d = require("./16454.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e) {
  return (h = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function f(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return p(e);
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
      return p(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return p(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function p(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
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
function m(e, t, n, i) {
  if (i) {
    return function e(t, n, i, o) {
      var a;
      if (o) {
        for (var r = 0; r < n.length; r++) {
          if (a = e(t, n[r].items || n[r].collapsedItems || [] || [], i, o - 1)) {
            return a;
          }
        }
      } else if (S(t, n, i) >= 0) {
        return n;
      }
    }(e, t, n, i) || [];
  } else {
    return t;
  }
}
function _(e, t, n) {
  if (e._dataByKeyMap) {
    e._dataByKeyMap[JSON.stringify(t)] = n;
    e._dataByKeyMapLength += n ? 1 : -1;
  }
}
function v(e, t) {
  var n = function e(t, n, o) {
    o = o || new WeakMap();
    var a = t ? Object.create(Object.getPrototypeOf(t)) : {};
    if (t) {
      o.set(t, a);
    }
    var r = g({}, t);
    (0, l.deepExtendArraySafe)(a, r, true, true);
    for (var s in r) {
      var u = r[s];
      var d = n == null ? undefined : n[s];
      if ((0, i.isObject)(u) && !(0, i.isPlainObject)(u) && (0, i.isObject)(d) && !o.has(u)) {
        a[s] = e(u, d, o);
      }
    }
    for (var c in a) {
      var h = a[c];
      if ((0, i.isObject)(h) && o.has(h)) {
        a[c] = o.get(h);
      }
    }
    return a;
  }(e, t);
  return (0, l.deepExtendArraySafe)(n, t, true, true);
}
function y(e) {
  var t = e.keyInfo;
  var n = e.data;
  var o = e.changes;
  var a = e.groupCount;
  var r = e.useInsertIndex;
  var s = e.immutable;
  var l = e.disableCache;
  var u = e.logError;
  var d = e.skipCopying;
  var c = s === true ? f(n) : n;
  o.forEach(function (e) {
    var n = e.type === "insert" ? c : m(t, c, e.key, a);
    if (!l) {
      (function (e, t) {
        if (e.key() && (!t._dataByKeyMap || t._dataByKeyMapLength !== t.length)) {
          var n = {};
          for (var i = t.length, o = 0; o < i; o++) {
            n[JSON.stringify(e.keyOf(t[o]))] = t[o];
          }
          t._dataByKeyMap = n;
          t._dataByKeyMapLength = i;
        }
      })(t, n);
    }
    switch (e.type) {
      case "update":
        x(t, n, e.key, e.data, true, s, u);
        break;
      case "insert":
        w(t, n, e.data, r && (0, i.isDefined)(e.index) ? e.index : -1, true, u, d);
        break;
      case "remove":
        C(t, n, e.key, true, u);
    }
  });
  return c;
}
function b(e, t, n) {
  if (e) {
    return t && s.errors.log(n);
  } else {
    return (0, d.rejectedPromise)(s.errors.Error(n));
  }
}
function x(e, t, n, a, r, s, u) {
  var c;
  var h = e.key();
  if (h) {
    if (function (e, t) {
      for (var n = typeof t == "string" ? t.split() : t.slice(); n.length;) {
        if (n.shift() in e) {
          return true;
        }
      }
      return false;
    }(a, h) && !(0, d.keysEqual)(h, n, e.keyOf(a))) {
      return b(r, u, "E4017");
    }
    if (!(c = function (e, t) {
      if (e._dataByKeyMap) {
        return e._dataByKeyMap[JSON.stringify(t)];
      }
    }(t, n))) {
      var f = S(e, t, n);
      if (f < 0) {
        return b(r, u, "E4009");
      }
      c = t[f];
      if (s === true && (0, i.isDefined)(c)) {
        var p = v(c, a);
        t[f] = p;
        return !r && (0, d.trivialPromise)(p, n);
      }
    }
  } else {
    c = n;
  }
  (0, l.deepExtendArraySafe)(c, a, true);
  if (!r) {
    if ((0, o.default)().useLegacyStoreResult) {
      return (0, d.trivialPromise)(n, a);
    } else {
      return (0, d.trivialPromise)(c, n);
    }
  }
}
function w(e, t, n, l, u, c, f) {
  var p;
  var g = e.key();
  var m = (0, i.isPlainObject)(n) && !f ? (0, r.extend)({}, n) : n;
  if (g) {
    if ((p = e.keyOf(m)) === undefined || h(p) === "object" && (0, i.isEmptyObject)(p)) {
      if (Array.isArray(g)) {
        throw s.errors.Error("E4007");
      }
      p = m[g] = String(new a.default());
    } else if (t[S(e, t, p)] !== undefined) {
      return b(u, c, "E4008");
    }
  } else {
    p = m;
  }
  if (l >= 0) {
    t.splice(l, 0, m);
  } else {
    t.push(m);
  }
  _(t, p, m);
  if (!u) {
    return (0, d.trivialPromise)((0, o.default)().useLegacyStoreResult ? n : m, p);
  }
}
function C(e, t, n, i, o) {
  var a = S(e, t, n);
  if (a > -1) {
    t.splice(a, 1);
    _(t, n, null);
  }
  if (i) {
    if (a < 0) {
      return b(i, o, "E4009");
    } else {
      return undefined;
    }
  } else {
    return (0, d.trivialPromise)(n);
  }
}
function S(e, t, n) {
  var i = e.key();
  if (!function (e, t) {
    return !e._dataByKeyMap || e._dataByKeyMap[JSON.stringify(t)];
  }(t, n)) {
    return -1;
  }
  for (var o = 0, a = t.length; o < a; o++) {
    if ((0, d.keysEqual)(i, e.keyOf(t[o]), n)) {
      return o;
    }
  }
  return -1;
}