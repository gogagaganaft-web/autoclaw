exports.resetPosition = exports.parseTranslate = exports.move = exports.locate = exports.getTranslateCss = exports.getTranslate = exports.clearCache = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./97906.js");
var r = require("./35922.js");
var s = /matrix(3d)?\((.+?)\)/;
var l = /translate(?:3d)?\((.+?)\)/;
function u(e) {
  return (0, r.type)(e) === "string" && e[e.length - 1] === "%";
}
function d(e, t) {
  if (e.length) {
    (0, a.data)(e.get(0), "dxTranslator", t);
  }
}
exports.locate = function (e) {
  e = (0, o.default)(e);
  var t = f(e);
  return {
    left: t.x,
    top: t.y
  };
};
function c(e) {
  if (e.length) {
    (0, a.removeData)(e.get(0), "dxTranslator");
  }
}
exports.clearCache = c;
function h(e) {
  e.x = e.x || 0;
  e.y = e.y || 0;
  return "translate(" + (u(e.x) ? e.x : e.x + "px") + ", " + (u(e.y) ? e.y : e.y + "px") + ")";
}
exports.getTranslateCss = h;
function f(e) {
  var t = e.length ? (0, a.data)(e.get(0), "dxTranslator") : null;
  if (!t) {
    var n = (e.css("transform") || h({
      x: 0,
      y: 0
    })).match(s);
    var i = n && n[1];
    if (n) {
      n = n[2].split(",");
      if (i === "3d") {
        n = n.slice(12, 15);
      } else {
        n.push(0);
        n = n.slice(4, 7);
      }
    } else {
      n = [0, 0, 0];
    }
    d(e, t = {
      x: parseFloat(n[0]),
      y: parseFloat(n[1]),
      z: parseFloat(n[2])
    });
  }
  return t;
}
exports.getTranslate = f;
exports.move = function (e, t) {
  e = (0, o.default)(e);
  var n;
  var i = t.left;
  var a = t.top;
  if (i === undefined) {
    (n = f(e)).y = a || 0;
  } else if (a === undefined) {
    (n = f(e)).x = i || 0;
  } else {
    d(e, n = {
      x: i || 0,
      y: a || 0,
      z: 0
    });
  }
  e.css({
    transform: h(n)
  });
  if (u(i) || u(a)) {
    c(e);
  }
};
exports.resetPosition = function (e, t) {
  var n;
  e = (0, o.default)(e);
  var i = {
    left: 0,
    top: 0,
    transform: "none"
  };
  if (t) {
    n = e.css("transition");
    i.transition = "none";
  }
  e.css(i);
  c(e);
  if (t) {
    e.get(0).offsetHeight;
    e.css("transition", n);
  }
};
exports.parseTranslate = function (e) {
  var t = e.match(l);
  if (t && t[1]) {
    t = t[1].split(",");
    return t = {
      x: parseFloat(t[0]),
      y: parseFloat(t[1]),
      z: parseFloat(t[2])
    };
  }
};