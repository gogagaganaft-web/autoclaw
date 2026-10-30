exports.default = undefined;
var i = u(require("./68374.js"));
var o = require("./77695.js");
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./58201.js");
var l = u(require("./37748.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = (0, s.getWindow)();
var c = null;
var h = {};
function f(e) {
  if ((0, r.isString)(e) && e.includes("top")) {
    return "down-push";
  } else {
    return "up-push";
  }
}
function p(e) {
  var t = h[e];
  return t || function (e) {
    var t = (0, i.default)("<div>").appendTo((0, o.value)());
    h[e] = t;
    return t;
  }(e);
}
function g(e, t) {
  var n = `dx-toast-stack dx-toast-stack-${t}-direction`;
  e.removeAttr("class").addClass(n);
}
function m(e, t, n) {
  var i = e.children().first().get(0);
  var o = {
    toastWidth: i.offsetWidth,
    toastHeight: i.offsetHeight,
    windowHeight: d.innerHeight,
    windowWidth: d.innerWidth
  };
  var a = (0, r.isString)(n) ? _(n, o) : n;
  var s = v(t, a, o);
  e.css(s);
}
function _(e, t) {
  var n = t.toastWidth;
  var i = t.toastHeight;
  var o = t.windowHeight;
  var a = t.windowWidth;
  switch (e) {
    case "top left":
      return {
        top: 10,
        left: 10
      };
    case "top right":
      return {
        top: 10,
        right: 10
      };
    case "bottom left":
      return {
        bottom: 10,
        left: 10
      };
    case "bottom right":
      return {
        bottom: 10,
        right: 10
      };
    case "top center":
      return {
        top: 10,
        left: Math.round(a / 2 - n / 2)
      };
    case "left center":
      return {
        top: Math.round(o / 2 - i / 2),
        left: 10
      };
    case "right center":
      return {
        top: Math.round(o / 2 - i / 2),
        right: 10
      };
    case "center":
      return {
        top: Math.round(o / 2 - i / 2),
        left: Math.round(a / 2 - n / 2)
      };
    case "bottom center":
    default:
      return {
        bottom: 10,
        left: Math.round(a / 2 - n / 2)
      };
  }
}
function v(e, t, n) {
  var g = n.toastWidth;
  var m = n.toastHeight;
  var _ = n.windowHeight;
  var v = n.windowWidth;
  switch (e.replace(/-push|-stack/g, "")) {
    case "up":
      return {
        bottom: t.bottom ?? _ - m - t.top,
        top: "",
        left: t.left ?? "",
        right: t.right ?? ""
      };
    case "down":
      return {
        top: t.top ?? _ - m - t.bottom,
        bottom: "",
        left: t.left ?? "",
        right: t.right ?? ""
      };
    case "left":
      return {
        right: t.right ?? v - g - t.left,
        left: "",
        top: t.top ?? "",
        bottom: t.bottom ?? ""
      };
    case "right":
      return {
        left: t.left ?? v - g - t.right,
        right: "",
        top: t.top ?? "",
        bottom: t.bottom ?? ""
      };
  }
}
function y(e, t, n) {
  var s = (0, r.isPlainObject)(e) ? e : {
    message: e
  };
  var u = (0, r.isPlainObject)(t) ? t : undefined;
  var d = (0, r.isPlainObject)(t) ? undefined : t;
  var h = s.onHidden;
  if (u != null && u.position) {
    var _ = u.position;
    var v = u.direction || f(_);
    var y = (0, r.isString)(_) ? _ : `${_.top}-${_.left}-${_.bottom}-${_.right}`;
    var b = s.onShowing;
    var x = p(y);
    g(x, v);
    (0, a.extend)(s, {
      container: x,
      onShowing: function (e) {
        m(x, v, _);
        if (b != null) {
          b(e);
        }
      }
    });
  }
  (0, a.extend)(s, {
    type: d,
    displayTime: n,
    onHidden: function (e) {
      (0, i.default)(e.element).remove();
      if (h != null) {
        h(e);
      }
    }
  });
  c = (0, i.default)("<div>").appendTo((0, o.value)());
  new l.default(c, s).show();
}
exports.default = y;
module.exports = exports.default;
module.exports.default = exports.default;