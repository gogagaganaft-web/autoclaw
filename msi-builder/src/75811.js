exports.attachCssClasses = R;
exports.current = M;
exports.default = undefined;
exports.detachCssClasses = B;
exports.init = P;
exports.initialized = $;
exports.isCompact = z;
exports.isDark = N;
exports.isGeneric = H;
exports.isMaterial = F;
exports.isPendingThemeLoaded = O;
exports.isWebFontLoaded = j;
exports.ready = L;
exports.resetTheme = q;
exports.setDefaultTimeout = U;
exports.waitForThemeLoad = E;
exports.waitWebFont = W;
var i = require("./58664.js");
var o = g(require("./20530.js"));
var a = g(require("./73349.js"));
var r = g(require("./68374.js"));
var s = require("./62754.js");
var l = require("./61371.js");
var u = require("./95479.js");
var d = g(require("./24311.js"));
var c = require("./77695.js");
var h = require("./58201.js");
var f = require("./89729.js");
var p = g(require("./96688.js"));
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m;
var _;
var v;
var y;
var b;
var x;
var w = (0, h.getWindow)();
var C = d.default.add;
var S = c.value;
var k = c.changeCallback;
var D = new s.Deferred();
var I = 15000;
function T() {
  if (!(0, h.hasWindow)()) {
    return null;
  }
  var e;
  var t = (0, r.default)("<div>", m).addClass("dx-theme-marker").appendTo(m.documentElement);
  try {
    if (e = w.getComputedStyle(t.get(0)).fontFamily) {
      if ((e = e.replace(/["']/g, "")).substr(0, "dx.".length) !== "dx.") {
        return null;
      } else {
        return e.substr("dx.".length);
      }
    } else {
      return null;
    }
  } finally {
    t.remove();
  }
}
function E(e) {
  var t;
  var n;
  var i = true;
  function o() {
    b = null;
    clearInterval(n);
    i = true;
    f.themeReadyCallback.fire();
    f.themeReadyCallback.empty();
    D.resolve();
  }
  b = e;
  if (O() || !I) {
    o();
  } else {
    if (!i) {
      b &&= e;
      return;
    }
    t = Date.now();
    i = false;
    n = setInterval(function () {
      var e = O();
      var n = !e && Date.now() - t > I;
      if (n) {
        p.default.log("W0004", b);
      }
      if (e || n) {
        o();
      }
    }, 10);
  }
}
function O() {
  if (!b) {
    return true;
  }
  var e = b === "any";
  if (D.state() === "resolved" && e) {
    return true;
  }
  var t = T();
  return !!t && !!e || t === b;
}
function A(e) {
  var t = e ? e.split(".") : [];
  var n = null;
  if (v) {
    if (e in v) {
      return e;
    }
    (0, u.each)(v, function (e, i) {
      var o = e.split(".");
      if ((!t[0] || o[0] === t[0]) && (!t[1] || t[1] === o[1]) && (!t[2] || t[2] === o[2])) {
        if (!n || !!i.isActive) {
          n = e;
        }
        return !i.isActive && undefined;
      }
    });
  }
  return n;
}
function P(e) {
  var t;
  (function (e) {
    try {
      if (e !== m) {
        v = null;
      }
    } catch (e) {
      v = null;
    }
    m = e;
  })((e = e || {}).context || a.default.getDocument());
  if (m) {
    if ((t = (0, r.default)("link[rel=dx-theme]", m)).length) {
      v = {};
      _ = (0, r.default)((0, l.parseHTML)("<link rel=stylesheet>"), m);
      t.each(function () {
        var e = (0, r.default)(this, m);
        var t = e.attr("data-theme");
        var n = e.attr("href");
        var i = e.attr("data-active") === "true";
        v[t] = {
          url: n,
          isActive: i
        };
      });
      t.last().after(_);
      t.remove();
    }
    y = undefined;
    M(e);
  }
}
function M(e) {
  if (!arguments.length) {
    return y = y || T();
  }
  B(S());
  if (typeof (e = e || {}) == "string") {
    e = {
      theme: e
    };
  }
  var t;
  var n = e._autoInit;
  var i = e.loadCallback;
  if (y = A(e.theme || y)) {
    t = v[y];
  }
  if (i) {
    f.themeReadyCallback.add(i);
  }
  if (t) {
    _.attr("href", v[y].url);
    if (f.themeReadyCallback.has() || D.state() !== "resolved" || e._forceTimeout) {
      E(y);
    }
  } else {
    if (!n) {
      throw p.default.Error("E0021", y);
    }
    if ((0, h.hasWindow)()) {
      E("any");
    }
    f.themeReadyCallback.fire();
    f.themeReadyCallback.empty();
  }
  D.done(function () {
    return R((0, c.originalViewPort)(), y);
  });
}
function R(e, t) {
  x = function (e) {
    var t = [];
    var n = (e = e || M()) && e.split(".");
    if (n) {
      t.push("dx-theme-" + n[0], "dx-theme-" + n[0] + "-typography");
      if (n.length > 1) {
        t.push("dx-color-scheme-" + n[1] + (F(e) ? "-" + n[2] : ""));
      }
    }
    return t;
  }(t).join(" ");
  (0, r.default)(e).addClass(x);
  (function () {
    var t = (0, h.hasWindow)() && w.devicePixelRatio;
    if (t && !(t < 2)) {
      var n = (0, r.default)("<div>");
      n.css("border", ".5px solid transparent");
      (0, r.default)("body").append(n);
      if ((0, i.getOuterHeight)(n) === 1) {
        (0, r.default)(e).addClass("dx-hairlines");
        x += " dx-hairlines";
      }
      n.remove();
    }
  })();
}
function B(e) {
  (0, r.default)(e).removeClass(x);
}
function L(e) {
  f.themeReadyCallback.add(e);
}
function V(e, t) {
  t ||= y || T();
  return new RegExp(e).test(t);
}
function F(e) {
  return V("material", e);
}
function H(e) {
  return V("generic", e);
}
function N(e) {
  return V("dark", e);
}
function z(e) {
  return V("compact", e);
}
function j(e, t) {
  var n = a.default.getDocument();
  var i = n.createElement("span");
  i.style.position = "absolute";
  i.style.top = "-9999px";
  i.style.left = "-9999px";
  i.style.visibility = "hidden";
  i.style.fontFamily = "Arial";
  i.style.fontSize = "250px";
  i.style.fontWeight = t;
  i.innerHTML = e;
  n.body.appendChild(i);
  var o = i.offsetWidth;
  i.style.fontFamily = "Roboto, RobotoFallback, Arial";
  var r = i.offsetWidth;
  i.parentNode.removeChild(i);
  return o !== r;
}
function W(e, t) {
  return new Promise(function (n) {
    function i() {
      clearInterval(o);
      clearTimeout(a);
      n();
    }
    var o = setInterval(function () {
      if (j(e, t)) {
        i();
      }
    }, 15);
    var a = setTimeout(i, 2000);
  });
}
function G() {
  P({
    _autoInit: true,
    _forceTimeout: true
  });
  if ((0, r.default)("link[rel=dx-theme]", m).length) {
    throw p.default.Error("E0022");
  }
}
function q() {
  if (_) {
    _.attr("href", "about:blank");
  }
  y = null;
  b = null;
  D = new s.Deferred();
}
function $(e) {
  D.done(e);
}
function U(e) {
  I = e;
}
if ((0, h.hasWindow)()) {
  G();
} else {
  C(G);
}
k.add(function (e, t) {
  D.done(function () {
    B(t);
    R(e);
  });
});
o.default.changed.add(function () {
  P({
    _autoInit: true
  });
});
var K = {
  setDefaultTimeout: U,
  initialized: $,
  resetTheme: q,
  ready: L,
  waitWebFont: W,
  isWebFontLoaded: j,
  isCompact: z,
  isDark: N,
  isGeneric: H,
  isMaterial: F,
  detachCssClasses: B,
  attachCssClasses: R,
  current: M,
  waitForThemeLoad: E,
  isPendingThemeLoaded: O
};
exports.default = K;