exports.odata = undefined;
var i = require("./35922.js");
var o = require("./95479.js");
var a = c(require("./80209.js"));
var r = require("./13306.js");
var s = c(require("./16135.js"));
var l = require("./77869.js");
var u = require("./18438.js");
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
var h;
var f;
var p;
var g;
var m;
var _;
var v;
var y;
var b;
var x;
var w;
var C;
var S = ["contains", "notcontains", "startswith", "endswith"];
m = function (e, t) {
  return function (n, i) {
    var o = [e, "("];
    if (f) {
      n = n.indexOf("tolower(") === -1 ? `tolower(${n})` : n;
      i = i.toLowerCase();
    }
    if (t) {
      o.push(i, ",", n);
    } else {
      o.push(n, ",", i);
    }
    o.push(")");
    return o.join("");
  };
};
_ = {
  "=": (g = function (e) {
    return function (t, n) {
      return `${t} ${e} ${n}`;
    };
  })("eq"),
  "<>": g("ne"),
  ">": g("gt"),
  ">=": g("ge"),
  "<": g("lt"),
  "<=": g("le"),
  startswith: m("startswith"),
  endswith: m("endswith")
};
v = (0, r.extend)({}, _, {
  contains: m("substringof", true),
  notcontains: m("not substringof", true)
});
y = (0, r.extend)({}, _, {
  contains: m("contains"),
  notcontains: m("not contains")
});
b = function (e) {
  var t;
  var n;
  var i = (e = (0, d.normalizeBinaryCriterion)(e))[1];
  var o = e[0];
  var a = p && p[o];
  if (a && (n = i, S.some(function (e) {
    return e === n;
  })) && a !== "String") {
    throw new u.errors.Error("E4024", i, o, a);
  }
  var r = (h === 4 ? y : v)[i.toLowerCase()];
  if (!r) {
    throw u.errors.Error("E4003", i);
  }
  var s = e[2];
  if ((t = p) !== null && t !== undefined && t[o]) {
    s = (0, l.convertPrimitiveValue)(p[o], s);
  }
  return r((0, l.serializePropName)(o), (0, l.serializeValue)(s, h));
};
x = function (e) {
  var t = e[0];
  var n = C(e[1]);
  if (t === "!") {
    return `not (${n})`;
  }
  throw u.errors.Error("E4003", t);
};
w = function (e) {
  var t;
  var n;
  var i = [];
  (0, o.each)(e, function (e, o) {
    if (Array.isArray(o)) {
      if (i.length > 1 && t !== n) {
        throw new u.errors.Error("E4019");
      }
      i.push(`(${C(o)})`);
      t = n;
      n = "and";
    } else {
      n = (0, d.isConjunctiveOperator)(this) ? "and" : "or";
    }
  });
  return i.join(` ${t} `);
};
C = function (e) {
  if (Array.isArray(e[0])) {
    return w(e);
  } else if ((0, d.isUnaryOperation)(e)) {
    return x(e);
  } else {
    return b(e);
  }
};
function k(e, t, n, i) {
  p = n;
  f = i ?? (0, a.default)().oDataFilterToLower;
  h = t;
  return C(e);
}
function D(e) {
  var t;
  var n;
  var o;
  var a;
  var s = [];
  var u = [];
  var d = e.expand;
  var c = e.version || 2;
  function h() {
    return n || o !== undefined;
  }
  var f = function e(t) {
    for (var n = 0; n < t.length; n++) {
      if ((0, i.isFunction)(t[n])) {
        return true;
      }
      if (Array.isArray(t[n]) && e(t[n])) {
        return true;
      }
    }
    return false;
  };
  function p() {
    var i = {};
    if (!a) {
      if (s.length) {
        i.$orderby = s.join(",");
      }
      if (n) {
        i.$skip = n;
      }
      if (o !== undefined) {
        i.$top = o;
      }
      i.$select = (0, l.generateSelect)(c, t) || undefined;
      i.$expand = (0, l.generateExpand)(c, d, t) || undefined;
    }
    if (u.length) {
      var r = u.length < 2 ? u[0] : u;
      var h = e == null ? undefined : e.fieldTypes;
      var f = e == null ? undefined : e.filterToLower;
      i.$filter = k(r, c, h, f);
    }
    if (a) {
      i.$top = 0;
    }
    if (e.requireTotalCount || a) {
      if (c !== 4) {
        i.$inlinecount = "allpages";
      } else {
        i.$count = "true";
      }
    }
    return i;
  }
  return {
    optimize: function (e) {
      var t = -1;
      for (var n = 0; n < e.length; n++) {
        if (e[n].name === "select") {
          t = n;
          break;
        }
      }
      if (!(t < 0) && (0, i.isFunction)(e[t].args[0])) {
        var o = e[1 + t];
        if (o && o.name === "slice") {
          e[1 + t] = e[t];
          e[t] = o;
        }
      }
    },
    exec: function (t) {
      return (0, l.sendRequest)(c, {
        url: t,
        params: (0, r.extend)(p(), e == null ? undefined : e.params)
      }, {
        beforeSend: e.beforeSend,
        jsonp: e.jsonp,
        withCredentials: e.withCredentials,
        countOnly: a,
        deserializeDates: e.deserializeDates,
        fieldTypes: e.fieldTypes,
        isPaged: isFinite(o)
      });
    },
    multiSort: function (e) {
      var t;
      if (h()) {
        return false;
      }
      for (var n = 0; n < e.length; n++) {
        var i = e[n][0];
        var o = !!e[n][1];
        var a = undefined;
        if (typeof i != "string") {
          return false;
        }
        a = (0, l.serializePropName)(i);
        if (o) {
          a += " desc";
        }
        (t = t || []).push(a);
      }
      s = t;
    },
    slice: function (e, t) {
      if (h()) {
        return false;
      }
      n = e;
      o = t;
    },
    filter: function (e) {
      return !h() && (Array.isArray(e) || (e = [].slice.call(arguments)), !f(e) && (u.length && u.push("and"), void u.push(e)));
    },
    select: function (e) {
      if (t || (0, i.isFunction)(e)) {
        return false;
      }
      if (!Array.isArray(e)) {
        e = [].slice.call(arguments);
      }
      t = e;
    },
    count: function () {
      return a = true;
    }
  };
}
s.default.odata = D;
var I = D;
exports.odata = I;