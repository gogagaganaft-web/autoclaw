exports.addNewPage = function (e) {
  e.addPage();
  (function (e) {
    if (!(0, i.isDefined)(e.getLineWidth)) {
      e.__borderWidth = null;
    }
  })(e);
};
exports.drawCellsContent = function (e, t, n, a) {
  n.forEach(function (n) {
    var s = n._rect;
    var u = n.gridCell;
    var h = function (e, t) {
      if (e == null) {
        return {};
      }
      var n;
      var i;
      var o = function (e, t) {
        if (e == null) {
          return {};
        }
        var n;
        var i;
        var o = {};
        var a = Object.keys(e);
        for (i = 0; i < a.length; i++) {
          n = a[i];
          if (!(t.indexOf(n) >= 0)) {
            o[n] = e[n];
          }
        }
        return o;
      }(e, t);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        for (i = 0; i < a.length; i++) {
          n = a[i];
          if (!(t.indexOf(n) >= 0)) {
            if (Object.prototype.propertyIsEnumerable.call(e, n)) {
              o[n] = e[n];
            }
          }
        }
      }
      return o;
    }(n, r);
    var f = s.x;
    var g = s.y;
    var m = s.w;
    var _ = s.h;
    var v = {
      doc: e,
      rect: {
        x: f,
        y: g,
        w: m,
        h: _
      },
      pdfCell: h,
      gridCell: u,
      cancel: false
    };
    if (t != null) {
      t(v);
    }
    if (!v.cancel) {
      (function (e, t) {
        if ((0, i.isDefined)(t.backgroundColor)) {
          p(e, "fill", t.backgroundColor);
          d(e, t._rect.x, t._rect.y, t._rect.w, t._rect.h, "F");
        }
      })(e, n);
      (function (e, t, n) {
        if ((0, i.isDefined)(t.text) && t.text !== "") {
          var a = t.textColor;
          var r = t.font;
          var s = t._rect;
          var u = t.padding;
          (function (e, t, n) {
            var a = t.textColor;
            var r = t.font;
            p(e, "text", (0, i.isDefined)(a) ? a : n.textColor);
            var s = (0, i.isDefined)(r) ? (0, o.extend)({}, n.font, r) : n.font;
            var l = e.getFont();
            if (s.name !== l.fontName || s.style !== l.fontStyle || (0, i.isDefined)(s.weight)) {
              e.setFont(s.name, s.style, s.weight);
            }
            if (s.size !== e.getFontSize()) {
              e.setFontSize(s.size);
            }
          })(e, {
            textColor: a,
            font: r
          }, n);
          var f = {
            x: s.x + u.left,
            y: s.y + u.top,
            w: s.w - (u.left + u.right),
            h: s.h - (u.top + u.bottom)
          };
          if ((0, i.isDefined)(t._textLeftOffset) || (0, i.isDefined)(t._textTopOffset)) {
            f.x = f.x + (t._textLeftOffset ?? 0);
            f.y = f.y + (t._textTopOffset ?? 0);
            e.saveGraphicsState();
            (function (e, t, n, i, o) {
              e.moveTo(l(t), l(n));
              e.lineTo(l(t + i), l(n));
              e.lineTo(l(t + i), l(n + o));
              e.lineTo(l(t), l(n + o));
              e.clip();
              e.discardPath();
            })(e, t._rect.x, t._rect.y, t._rect.w, t._rect.h);
          }
          c(e, t.text, f, t.verticalAlign, t.horizontalAlign, t._internalTextOptions);
          if ((0, i.isDefined)(t._textLeftOffset) || (0, i.isDefined)(t._textTopOffset)) {
            e.restoreGraphicsState();
          }
        }
      })(e, n, a);
    }
  });
};
exports.drawCellsLines = function (e, t, n) {
  t.filter(function (e) {
    return !(0, i.isDefined)(e.borderColor);
  }).forEach(function (t) {
    h(e, t._rect, t, n);
  });
  t.filter(function (e) {
    return (0, i.isDefined)(e.borderColor);
  }).forEach(function (t) {
    h(e, t._rect, t, n);
  });
};
exports.drawGridLines = function (e, t, n, i) {
  h(e, t, n, i);
};
exports.drawLine = u;
exports.drawRect = d;
exports.drawTextInRect = c;
exports.getDocumentStyles = function (e) {
  var t = e.getFont();
  return {
    borderWidth: g(e),
    borderColor: e.getDrawColor(),
    font: {
      name: t.fontName,
      style: t.fontStyle,
      size: e.getFontSize()
    },
    textColor: e.getTextColor()
  };
};
exports.roundToThreeDecimals = l;
exports.setDocumentStyles = function (e, t) {
  var n = t.borderWidth;
  var i = t.borderColor;
  var o = t.font;
  var a = t.textColor;
  var r = e.getFont();
  if (r.fontName !== o.name || r.fontStyle !== o.style) {
    e.setFont(o.name, o.style, undefined);
  }
  if (e.getFontSize() !== o.size) {
    e.setFontSize(o.size);
  }
  if (g(e) !== n) {
    m(e, n);
  }
  if (e.getDrawColor() !== i) {
    e.setDrawColor(i);
  }
  if (e.getTextColor() !== a) {
    e.setTextColor(a);
  }
};
var i = require("./35922.js");
var o = require("./13306.js");
var a = require("./79262.js");
var r = ["_rect", "gridCell"];
function s(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function l(e) {
  return Math.round(e * 1000) / 1000;
}
function u(e, t, n, i, o) {
  e.line(l(t), l(n), l(i), l(o));
}
function d(e, t, n, o, a, r) {
  if ((0, i.isDefined)(r)) {
    e.rect(l(t), l(n), l(o), l(a), r);
  } else {
    e.rect(l(t), l(n), l(o), l(a));
  }
}
function c(e, t, n, i, r, s) {
  var u = t.split("\n");
  var d = u.length;
  var c = (0, a.calculateTextHeight)(e, u[0], e.getFont(), {
    wordWrapEnabled: false,
    targetRectWidth: 1000000000
  });
  var h = i ?? "middle";
  var f = r ?? "left";
  var p = {
    top: 0,
    middle: 0.5,
    bottom: 1
  };
  var g = n.y + n.h * p[h] - c * (d - 1) * p[h] + function (e) {
    return (e.getLineHeightFactor() - 1.15) * e.getFontSize();
  }(e);
  var m = n.x + n.w * {
    left: 0,
    center: 0.5,
    right: 1
  }[f];
  var _ = (0, o.extend)({
    baseline: h,
    align: f
  }, s);
  e.text(u.join("\n"), l(m), l(g), _);
}
function h(e, t, n, o) {
  var a = n.borderWidth;
  var r = n.borderColor;
  var s = n.drawLeftBorder;
  var l = s === undefined || s;
  var c = n.drawRightBorder;
  var h = c === undefined || c;
  var p = n.drawTopBorder;
  var g = p === undefined || p;
  var m = n.drawBottomBorder;
  var _ = m === undefined || m;
  if (!(0, i.isDefined)(t)) {
    throw "rect is required";
  }
  if (l || h || g || _) {
    if (l && h && g && _) {
      f(e, {
        borderWidth: a,
        borderColor: r
      }, o);
      d(e, t.x, t.y, t.w, t.h);
    } else {
      f(e, {
        borderWidth: a,
        borderColor: r
      }, o);
      if (g) {
        u(e, t.x, t.y, t.x + t.w, t.y);
      }
      if (l) {
        u(e, t.x, t.y, t.x, t.y + t.h);
      }
      if (h) {
        u(e, t.x + t.w, t.y, t.x + t.w, t.y + t.h);
      }
      if (_) {
        u(e, t.x, t.y + t.h, t.x + t.w, t.y + t.h);
      }
    }
  }
}
function f(e, t, n) {
  var o = t.borderWidth;
  var r = t.borderColor;
  var s = (0, i.isDefined)(o) ? o : n.borderWidth;
  if (s !== g(e)) {
    m(e, (0, a.toPdfUnit)(e, s));
  }
  p(e, "draw", (0, i.isDefined)(r) ? r : n.borderColor);
}
function p(e, t, n) {
  var i = `get${s(t)}Color`;
  var o = `set${s(t)}Color`;
  var a = n.ch1;
  var r = a === undefined ? n : a;
  var l = n.ch2;
  var u = n.ch3;
  var d = n.ch4;
  if (e.__private__.decodeColorString(e.__private__.encodeColorString({
    ch1: r,
    ch2: l,
    ch3: u,
    ch4: d,
    precision: t === "text" ? 3 : 2
  })) !== e[i]() || t === "fill") {
    e[o].apply(e, [r, l, u, d].filter(function (e) {
      return e !== undefined;
    }));
  }
}
function g(e) {
  if ((0, i.isDefined)(e.getLineWidth)) {
    return e.getLineWidth();
  } else {
    return e.__borderWidth ?? 0.200025;
  }
}
function m(e, t) {
  e.setLineWidth(t);
  if (!(0, i.isDefined)(e.getLineWidth)) {
    e.__borderWidth = t;
  }
}