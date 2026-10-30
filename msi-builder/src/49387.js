exports.default = undefined;
var i = require("./58664.js");
var o = _(require("./68374.js"));
var a = require("./20576.js");
var r = require("./95479.js");
var s = require("./58201.js");
var l = _(require("./73349.js"));
var u = require("./35922.js");
var d = require("./13306.js");
var c = require("./37518.js");
var h = _(require("./47810.js"));
var f = require("./31648.js");
var p = require("./60137.js");
var g = _(require("./20530.js"));
var m = require("./80968.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v;
var y = (0, s.getWindow)();
var b = /left|right/;
var x = /top|bottom/;
var w = /fit|flip|none/;
var C = /scale\(.+?\)/;
var S = h.default.safari;
function k(e) {
  var t = {
    h: "center",
    v: "center"
  };
  var n = (0, a.splitPair)(e);
  if (n) {
    (0, r.each)(n, function () {
      var e = String(this).toLowerCase();
      if (b.test(e)) {
        t.h = e;
      } else if (x.test(e)) {
        t.v = e;
      }
    });
  }
  return t;
}
function D(e) {
  return (0, a.pairToObject)(e);
}
function I(e) {
  switch (e) {
    case "center":
      return 0.5;
    case "right":
    case "bottom":
      return 1;
    default:
      return 0;
  }
}
function T(e) {
  switch (e) {
    case "left":
      return "right";
    case "right":
      return "left";
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    default:
      return e;
  }
}
function E(e, t) {
  var n = 0;
  if (e.myLocation < t.min) {
    n += t.min - e.myLocation;
  }
  if (e.myLocation > t.max) {
    n += e.myLocation - t.max;
  }
  return n;
}
function O(e, t, n) {
  if (t.myLocation < n.min) {
    if (e === "h") {
      return "left";
    } else {
      return "top";
    }
  } else if (t.myLocation > n.max) {
    if (e === "h") {
      return "right";
    } else {
      return "bottom";
    }
  } else {
    return "none";
  }
}
function A(e) {
  e.myLocation = e.atLocation + I(e.atAlign) * e.atSize - I(e.myAlign) * e.mySize + e.offset;
}
var P = {
  fit: function (e, t) {
    var n = false;
    if (e.myLocation > t.max) {
      e.myLocation = t.max;
      n = true;
    }
    if (e.myLocation < t.min) {
      e.myLocation = t.min;
      n = true;
    }
    e.fit = n;
  },
  flip: function (e, t) {
    e.flip = false;
    if ((e.myAlign !== "center" || e.atAlign !== "center") && (e.myLocation < t.min || e.myLocation > t.max)) {
      var n = (0, d.extend)({}, e, {
        myAlign: T(e.myAlign),
        atAlign: T(e.atAlign),
        offset: -e.offset
      });
      A(n);
      n.oversize = E(n, t);
      if (n.myLocation >= t.min && n.myLocation <= t.max || e.oversize > n.oversize) {
        e.myLocation = n.myLocation;
        e.oversize = n.oversize;
        e.flip = true;
      }
    }
  },
  flipfit: function (e, t) {
    this.flip(e, t);
    this.fit(e, t);
  },
  none: function (e) {
    e.oversize = 0;
  }
};
function M() {
  var e = (0, o.default)("<div>").css({
    width: 100,
    height: 100,
    overflow: "scroll",
    position: "absolute",
    top: -9999
  }).appendTo((0, o.default)("body"));
  var t = e.get(0).offsetWidth - e.get(0).clientWidth;
  e.remove();
  v = t;
}
var R = {
  h: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  },
  v: {
    location: 0,
    flip: false,
    fit: false,
    oversize: 0
  }
};
function B(e, t) {
  var n = (0, o.default)(e);
  var r = n.offset();
  var s = (0, d.extend)(true, {}, R, {
    h: {
      location: r.left
    },
    v: {
      location: r.top
    }
  });
  if (!t) {
    return s;
  }
  var h = k(t.my);
  var f = k(t.at);
  var m = (0, o.default)(t.of).length && t.of || y;
  var _ = D(t.offset);
  var b = function (e) {
    var t = (0, a.splitPair)(e);
    var n = String(t && t[0]).toLowerCase();
    var i = String(t && t[1]).toLowerCase();
    if (!w.test(n)) {
      n = "none";
    }
    if (!w.test(i)) {
      i = n;
    }
    return {
      h: n,
      v: i
    };
  }(t.collision);
  var x = t.boundary;
  var C = D(t.boundaryOffset);
  var I = {
    mySize: (0, i.getOuterWidth)(n),
    myAlign: h.h,
    atAlign: f.h,
    offset: _.h,
    collision: b.h,
    boundaryOffset: C.h
  };
  var T = {
    mySize: (0, i.getOuterHeight)(n),
    myAlign: h.v,
    atAlign: f.v,
    offset: _.v,
    collision: b.v,
    boundaryOffset: C.v
  };
  if (m.preventDefault) {
    I.atLocation = m.pageX;
    T.atLocation = m.pageY;
    I.atSize = 0;
    T.atSize = 0;
  } else {
    m = (0, o.default)(m);
    if ((0, u.isWindow)(m[0])) {
      I.atLocation = m.scrollLeft();
      T.atLocation = m.scrollTop();
      if (g.default.real().deviceType === "phone" && m[0].visualViewport) {
        I.atLocation = Math.max(I.atLocation, m[0].visualViewport.offsetLeft);
        T.atLocation = Math.max(T.atLocation, m[0].visualViewport.offsetTop);
        I.atSize = m[0].visualViewport.width;
        T.atSize = m[0].visualViewport.height;
      } else {
        I.atSize = m[0].innerWidth > m[0].outerWidth ? m[0].innerWidth : (0, i.getWidth)(m);
        T.atSize = m[0].innerHeight > m[0].outerHeight || S ? m[0].innerHeight : (0, i.getHeight)(m);
      }
    } else if (m[0].nodeType === 9) {
      I.atLocation = 0;
      T.atLocation = 0;
      I.atSize = (0, i.getWidth)(m);
      T.atSize = (0, i.getHeight)(m);
    } else {
      var B = (0, c.getBoundingRect)(m.get(0));
      var L = V(m);
      I.atLocation = L.left;
      T.atLocation = L.top;
      I.atSize = Math.max(B.width, (0, i.getOuterWidth)(m));
      T.atSize = Math.max(B.height, (0, i.getOuterHeight)(m));
    }
  }
  A(I);
  A(T);
  var F = function () {
    var e = (0, o.default)(y);
    var t = (0, i.getWidth)(e);
    var n = (0, i.getHeight)(e);
    var a = e.scrollLeft();
    var r = e.scrollTop();
    var s = l.default.getDocumentElement();
    var d = p.touch ? s.clientWidth / t : 1;
    var c = p.touch ? s.clientHeight / n : 1;
    if (v === undefined) {
      M();
    }
    var h = t;
    var f = n;
    if (x && !(0, u.isWindow)(x)) {
      var g = (0, o.default)(x);
      var m = g.offset();
      a = m.left;
      r = m.top;
      h = (0, i.getWidth)(g);
      f = (0, i.getHeight)(g);
    }
    return {
      h: {
        min: a + I.boundaryOffset,
        max: a + h / d - I.mySize - I.boundaryOffset
      },
      v: {
        min: r + T.boundaryOffset,
        max: r + f / c - T.mySize - T.boundaryOffset
      }
    };
  }();
  I.oversize = E(I, F.h);
  T.oversize = E(T, F.v);
  I.collisionSide = O("h", I, F.h);
  T.collisionSide = O("v", T, F.v);
  if (P[I.collision]) {
    P[I.collision](I, F.h);
  }
  if (P[T.collision]) {
    P[T.collision](T, F.v);
  }
  function H(e) {
    if (t.precise) {
      return e;
    } else {
      return Math.round(e);
    }
  }
  (0, d.extend)(true, s, {
    h: {
      location: H(I.myLocation),
      oversize: H(I.oversize),
      fit: I.fit,
      flip: I.flip,
      collisionSide: I.collisionSide
    },
    v: {
      location: H(T.myLocation),
      oversize: H(T.oversize),
      fit: T.fit,
      flip: T.flip,
      collisionSide: T.collisionSide
    },
    precise: t.precise
  });
  return s;
}
function L(e, t, n, i) {
  var o = (0, u.isDefined)(e.style) && !l.default.isNode(e.style);
  var a = i ? n.replace(t, "") : n;
  if (o) {
    (0, m.setStyle)(e, a, false);
  } else {
    var r = l.default.createAttribute("style");
    r.value = a;
    e.setAttributeNode(r);
  }
}
var V = function e(t) {
  var n;
  var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t;
  var a = o.get(0);
  if (!a) {
    return t.offset();
  }
  var r;
  var s = ((n = a.getAttribute) === null || n === undefined ? undefined : n.call(a, "style")) || "";
  var l = s.match(C)?.[0];
  if (l) {
    L(a, l, s, true);
    r = e(t, o.parent());
    L(a, l, s, false);
  } else {
    r = e(t, o.parent());
  }
  return r;
};
function F(e, t) {
  var n = (0, o.default)(e);
  if (!t) {
    return n.offset();
  }
  (0, f.resetPosition)(n, true);
  var i = V(n);
  var a = t.h && t.v ? t : B(n, t);
  function r(e) {
    if (t.precise) {
      return e;
    } else {
      return Math.round(e);
    }
  }
  (0, f.move)(n, {
    left: a.h.location - r(i.left),
    top: a.v.location - r(i.top)
  });
  return a;
}
F.inverseAlign ||= T;
F.normalizeAlign ||= k;
var H = {
  calculateScrollbarWidth: M,
  calculate: B,
  setup: F,
  offset: function (e) {
    e = (0, o.default)(e).get(0);
    if ((0, u.isWindow)(e)) {
      return null;
    } else if (e && "pageY" in e && "pageX" in e) {
      return {
        top: e.pageY,
        left: e.pageX
      };
    } else {
      return (0, o.default)(e).offset();
    }
  }
};
exports.default = H;
module.exports = exports.default;
module.exports.default = exports.default;