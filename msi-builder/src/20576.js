exports.splitPair = exports.pairToObject = exports.normalizeKey = exports.noop = exports.grep = exports.getKeyHash = exports.findBestMatches = exports.executeAsync = exports.escapeRegExp = exports.equalByValue = exports.ensureDefined = exports.denormalizeKey = exports.deferUpdater = exports.deferUpdate = exports.deferRenderer = exports.deferRender = exports.asyncNoop = exports.applyServerDecimalSeparator = undefined;
var i = u(require("./80209.js"));
var o = u(require("./73176.js"));
var a = require("./62754.js");
var r = require("./47617.js");
var s = require("./95479.js");
var l = require("./35922.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d() {
  return (d = Object.assign ? Object.assign.bind() : function (e) {
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
exports.ensureDefined = function (e, t) {
  if ((0, l.isDefined)(e)) {
    return e;
  } else {
    return t;
  }
};
exports.executeAsync = function (e, t) {
  var n = new a.Deferred();
  var i = t || this;
  var o = {
    promise: n.promise(),
    abort: function () {
      clearTimeout(s);
      n.rejectWith(i);
    }
  };
  function r() {
    var t = e.call(i);
    if (t && t.done && (0, l.isFunction)(t.done)) {
      t.done(function () {
        n.resolveWith(i);
      });
    } else {
      n.resolveWith(i);
    }
  }
  var s = (arguments[2] || setTimeout)(r, typeof t == "number" ? t : 0);
  return o;
};
var c;
var h = [];
var f = [];
var p = [];
function g(e, t, n) {
  if (c && c !== e) {
    h.push(t);
    f.push(e);
    n = n || new a.Deferred();
    p.push(n);
    return n;
  }
  var i = c;
  var o = p.length;
  c = e;
  var r = t();
  if (!r) {
    if (p.length > o) {
      r = a.when.apply(this, p.slice(o));
    } else if (n) {
      n.resolve();
    }
  }
  c = i;
  if (n && r && r.done) {
    r.done(n.resolve).fail(n.reject);
  }
  if (!c && h.length) {
    (f.shift() === "render" ? m : _)(h.shift(), p.shift());
  }
  return r || (0, a.when)();
}
function m(e, t) {
  return g("render", e, t);
}
exports.deferRender = m;
function _(e, t) {
  return g("update", e, t);
}
exports.deferUpdate = _;
exports.deferRenderer = function (e) {
  return function () {
    var t = this;
    return g("render", function () {
      return e.call(t);
    });
  };
};
exports.deferUpdater = function (e) {
  return function () {
    var t = this;
    return g("update", function () {
      return e.call(t);
    });
  };
};
exports.findBestMatches = function (e, t, n) {
  var i = [];
  var o = 0;
  (0, s.each)(t, function (t, a) {
    var r = 0;
    var l = n ? n(a) : a;
    (0, s.each)(e, function (e, t) {
      var n = l[e];
      if (n !== undefined) {
        if (!v(n, t)) {
          r = -1;
          return false;
        }
        r++;
      }
    });
    if (!(r < o)) {
      if (r > o) {
        i.length = 0;
        o = r;
      }
      i.push(a);
    }
  });
  return i;
};
function v(e, t) {
  if (Array.isArray(e) && Array.isArray(t)) {
    var n = false;
    (0, s.each)(e, function (e, i) {
      if (i !== t[e]) {
        n = true;
        return false;
      }
    });
    return !n;
  }
  return e === t;
}
function y(e) {
  switch ((0, l.type)(e)) {
    case "string":
      return e.split(/\s+/, 2);
    case "object":
      return [e.x ?? e.h, e.y ?? e.v];
    case "number":
      return [e];
    case "array":
      return e;
    default:
      return null;
  }
}
exports.splitPair = y;
exports.normalizeKey = function (e) {
  var t = (0, l.isString)(e) ? e : e.toString();
  var n = t.match(/[^a-zA-Z0-9_]/g);
  if (n) {
    (0, s.each)(n, function (e, n) {
      t = t.replace(n, "__" + n.charCodeAt() + "__");
    });
  }
  return t;
};
exports.denormalizeKey = function (e) {
  var t = e.match(/__\d+__/g);
  if (t) {
    t.forEach(function (t) {
      var n = parseInt(t.replace("__", ""));
      e = e.replace(t, String.fromCharCode(n));
    });
  }
  return e;
};
exports.pairToObject = function (e, t) {
  var n = y(e);
  var i = t ? parseFloat(n && n[0]) : parseInt(n && n[0], 10);
  var o = t ? parseFloat(n && n[1]) : parseInt(n && n[1], 10);
  if (!isFinite(i)) {
    i = 0;
  }
  if (!isFinite(o)) {
    o = i;
  }
  return {
    h: i,
    v: o
  };
};
exports.getKeyHash = function (e) {
  if (e instanceof o.default) {
    return e.toString();
  }
  if ((0, l.isObject)(e) || Array.isArray(e)) {
    try {
      var t = JSON.stringify(e);
      if (t === "{}") {
        return e;
      } else {
        return t;
      }
    } catch (t) {
      return e;
    }
  }
  return e;
};
exports.escapeRegExp = function (e) {
  return e.replace(/[[\]{}\-()*+?.\\^$|\s]/g, "\\$&");
};
exports.applyServerDecimalSeparator = function (e) {
  var t = (0, i.default)().serverDecimalSeparator;
  if ((0, l.isDefined)(e)) {
    e = e.toString().replace(".", t);
  }
  return e;
};
exports.noop = function () {};
exports.asyncNoop = function () {
  return new a.Deferred().resolve().promise();
};
exports.grep = function (e, t, n) {
  var i = [];
  var o = !n;
  for (var a = 0; a < e.length; a++) {
    if (!!t(e[a], a) === o) {
      i.push(e[a]);
    }
  }
  return i;
};
function b(e, t, n, i) {
  return e.length === t.length && !e.some(function (e, o) {
    return !C(e, t[o], n + 1, d({}, i, {
      strict: true
    }));
  });
}
function x(e, t, n, i) {
  var o = Object.keys(e);
  var a = Object.keys(t);
  if (o.length !== a.length) {
    return false;
  }
  var r = new Set(a);
  return !o.some(function (o) {
    return !r.has(o) || !C(e[o], t[o], n + 1, i);
  });
}
var w = {
  maxDepth: 3,
  strict: true
};
function C(e, t, n, i) {
  var o = i.strict;
  var a = i.maxDepth;
  var s = (0, r.toComparable)(e, true);
  var u = (0, r.toComparable)(t, true);
  switch (true) {
    case o ? s === u : s == u:
    case n >= a:
      return true;
    case (0, l.isObject)(s) && (0, l.isObject)(u):
      return x(s, u, n, i);
    case Array.isArray(s) && Array.isArray(u):
      return b(s, u, n, i);
    default:
      return false;
  }
}
exports.equalByValue = function (e, t, n = w) {
  var i = d({}, w, n);
  return C(e, t, 0, i);
};