var n = this && this.__read || function (e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) {
    return e;
  }
  var i;
  var o;
  var a = n.call(e);
  var r = [];
  try {
    while ((t === undefined || t-- > 0) && !(i = a.next()).done) {
      r.push(i.value);
    }
  } catch (e) {
    o = {
      error: e
    };
  } finally {
    try {
      if (i && !i.done && (n = a.return)) {
        n.call(a);
      }
    } finally {
      if (o) {
        throw o.error;
      }
    }
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = new Set(["animationIterationCount", "borderImageOutset", "borderImageSlice", "border-imageWidth", "boxFlex", "boxFlexGroup", "boxOrdinalGroup", "columnCount", "fillOpacity", "flex", "flexGrow", "flexNegative", "flexOrder", "flexPositive", "flexShrink", "floodOpacity", "fontWeight", "gridColumn", "gridRow", "lineClamp", "lineHeight", "opacity", "order", "orphans", "stopOpacity", "strokeDasharray", "strokeDashoffset", "strokeMiterlimit", "strokeOpacity", "strokeWidth", "tabSize", "widows", "zIndex", "zoom"]);
var o = /[A-Z]/g;
exports.normalizeStyles = function (e) {
  if (e instanceof Object) {
    return Object.entries(e).reduce(function (e, t) {
      var a;
      var r = n(t, 2);
      var s = r[0];
      var l = r[1];
      e[a = s, a.replace(o, "-$&").toLowerCase()] = function (e) {
        return typeof e == "number" || !Number.isNaN(Number(e));
      }(l) ? function (e, t) {
        if (i.has(e)) {
          return t;
        } else {
          return t + "px";
        }
      }(s, l) : l;
      return e;
    }, {});
  }
};