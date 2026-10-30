exports.LayoutManager = v;
var i;
var o = require("./35922.js");
var a = (i = require("./32410.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./73711.js");
var s = Math.floor;
var l = Math.sqrt;
var u = Math.min;
var d = Math.max;
var c = a.default.radialLabelIndent;
function h(e, t, n) {
  if (n < e) {
    return e;
  } else if (t < n) {
    return t;
  } else {
    return n;
  }
}
function f(e) {
  if (e._label.isVisible() && e._label.getLayoutOptions().position !== "inside") {
    return e._label.getBoundingRect();
  }
}
function p(e, t, n, i, o) {
  e.some(function (e) {
    return e.getVisiblePoints().reduce(function (e, a) {
      var r = f(a);
      if (r) {
        var s = h(r.x, r.x + r.width, t);
        var p = h(r.y, r.y + r.height, n);
        i = u(d(function (e, t, n, i) {
          return l((e - n) * (e - n) + (t - i) * (t - i));
        }(s, p, t, n) - c, o), i);
        e = true;
      }
      return e;
    }, false);
  });
  return i;
}
function g(e) {
  return e.reduce(function (e, t) {
    var n = t.getVisiblePoints().reduce(function (e, t) {
      var n = f(t);
      if (n && n.width > e) {
        e = n.width;
      }
      return e;
    }, 0);
    var i = n;
    if (n) {
      e.outerLabelsCount++;
      if (e.outerLabelsCount > 1) {
        n += a.default.pieLabelSpacing;
      }
      i += a.default.pieLabelSpacing;
    }
    e.sizes.push(n);
    e.rSizes.push(i);
    e.common += n;
    return e;
  }, {
    sizes: [],
    rSizes: [],
    common: 0,
    outerLabelsCount: 0
  });
}
function m(e, t, n, i, o, a) {
  var r;
  var l;
  var u = 0;
  var d = e.sizes;
  var c = e.rSizes;
  for (l = 0; l < n.length; l++) {
    if (d[l] !== 0) {
      r = s(r ? r + c[l - 1] : t);
      n[l].correctLabelRadius(r);
      u += o || d[l];
      c[l] = o || c[l];
      n[l].setVisibleArea({
        left: s(a - t - u),
        right: s(i.width - (a + t + u)),
        top: i.top,
        bottom: i.bottom,
        width: i.width,
        height: i.height
      });
    } else if (r) {
      r += c[l - 1];
    }
  }
}
function _(e) {
  var t = e.type;
  var n = e.innerRadius;
  if (t === "pie") {
    return 0;
  } else if ((0, o.isNumeric)(n)) {
    return Number(n);
  } else {
    return 0.5;
  }
}
function v() {}
function y(e, t, n, i) {
  return (e - t - c - n.left) / i.outerLabelsCount;
}
function b(e, t, n, i, o, a) {
  var r;
  var s = g(n);
  var l = function (e, t, n) {
    return e - t.left - (n.outerLabelsCount > 0 ? n.common + c : 0);
  }(o, t, s);
  if (l < i) {
    r = y(o, e = i, t, s);
  } else {
    e = u(p(n, o, a, e, i), l);
  }
  m(s, e + c, n, t, r, o);
  return e;
}
function x(e) {
  return new r.WrapperLayoutElement(null, {
    x: e.left,
    y: e.top,
    width: e.width - e.left - e.right,
    height: e.height - e.top - e.bottom
  });
}
v.prototype = {
  constructor: v,
  setOptions: function (e) {
    this._options = e;
  },
  applyPieChartSeriesLayout: function (e, t, n) {
    var i;
    var a;
    var r = e.height - e.top - e.bottom;
    var l = e.width - e.left - e.right;
    var d = l / 2 + e.left;
    var c = r / 2 + e.top;
    var h = this._options.piePercentage;
    if ((0, o.isNumeric)(h)) {
      i = a = h * u(e.height, e.width) / 2;
    } else {
      i = u(l, r) / 2;
      a = this._options.minPiePercentage * i;
    }
    if (!n) {
      i = b(i, e, t, a, d, c);
    }
    return {
      centerX: s(d),
      centerY: s(c),
      radiusInner: s(i * _(t[0])),
      radiusOuter: s(i)
    };
  },
  applyEqualPieChartLayout: function (e, t) {
    var n = t.radius;
    return {
      centerX: s(t.x),
      centerY: s(t.y),
      radiusInner: s(n * _(e[0])),
      radiusOuter: s(n)
    };
  },
  correctPieLabelRadius: function (e, t, n) {
    var i;
    var o = g(e);
    var a = t.radiusOuter + c;
    var r = t.centerX - n.left - a;
    if (o.common + c > r) {
      i = y(t.centerX, t.radiusOuter, n, o);
    }
    m(o, a, e, n, i, t.centerX);
  },
  needMoreSpaceForPanesCanvas: function (e, t, n) {
    var i = this._options;
    var a = i.width;
    var r = i.height;
    var s = i.piePercentage;
    var l = (0, o.isNumeric)(s);
    var c = 0;
    var h = 0;
    e.forEach(function (e) {
      var i = e.canvas;
      var o = l ? u(i.width, i.height) * s : undefined;
      var f = n ? n(e) : {
        width: false,
        height: false
      };
      var p = f.width ? 0 : (l ? o : a) - (i.width - i.left - i.right);
      var g = f.height ? 0 : (l ? o : r) - (i.height - i.top - i.bottom);
      if (t) {
        c += p > 0 ? p : 0;
        h = d(g > 0 ? g : 0, h);
      } else {
        c = d(p > 0 ? p : 0, c);
        h += g > 0 ? g : 0;
      }
    });
    return (c > 0 || h > 0) && {
      width: c,
      height: h
    };
  },
  layoutInsideLegend: function (e, t) {
    var n = e.getLayoutOptions();
    if (n) {
      var i = n.position;
      var o = n.cutSide;
      var a = {
        horizontal: i.horizontal,
        vertical: i.vertical
      };
      t[n.cutLayoutSide] += n.cutSide === "horizontal" ? n.width : n.height;
      a[o] = {
        left: "right",
        right: "left",
        top: "bottom",
        bottom: "top",
        center: "center"
      }[a[o]];
      e.position({
        of: x(t),
        my: a,
        at: i
      });
    }
  }
};