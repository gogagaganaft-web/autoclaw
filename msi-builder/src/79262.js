exports.applyRtl = function (e, t, n) {
  t.forEach(function (t) {
    t.forEach(function (t) {
      var i = o(e) - (t._rect.x + t._rect.w);
      var a = n.margin.left - n.margin.right;
      t._rect.x = i + a;
    });
  });
};
exports.applyWordWrap = function (e, t) {
  t.forEach(function (t) {
    t.cells.forEach(function (t) {
      var n = t.pdfCell;
      if ((0, i.isDefined)(n.text)) {
        var o = a(e, n.text, n.font, {
          wordWrapEnabled: n.wordWrapEnabled,
          targetRectWidth: r(n._rect.w, n.padding)
        });
        n.text = o.join("\n");
      }
    });
  });
};
exports.calculateRowHeight = function (e, t, n) {
  if (t.length !== n.length) {
    throw "the cells count must be equal to the count of the columns";
  }
  var o = 0;
  for (var a = 0; a < t.length; a++) {
    if (!(0, i.isDefined)(t[a].rowSpan)) {
      var s = t[a].pdfCell.text;
      var u = t[a].pdfCell.padding;
      var d = t[a].pdfCell.font;
      var c = t[a].pdfCell.wordWrapEnabled;
      var h = r(n[a], u);
      if ((0, i.isDefined)(s)) {
        var f = (s !== "" ? l(e, s, d, {
          wordWrapEnabled: c,
          targetRectWidth: h
        }) : 0) + u.top + u.bottom;
        if (o < f) {
          o = f;
        }
      }
    }
  }
  return o;
};
exports.calculateTargetRectWidth = r;
exports.calculateTextHeight = l;
exports.getPageHeight = function (e) {
  return e.internal.pageSize.getHeight();
};
exports.getPageWidth = o;
exports.getTextDimensions = s;
exports.getTextLines = a;
exports.toPdfUnit = function (e, t) {
  var n = 1 / e.internal.scaleFactor;
  return t * n;
};
var i = require("./35922.js");
function o(e) {
  return e.internal.pageSize.getWidth();
}
function a(e, t, n, i) {
  var o = i.wordWrapEnabled;
  var a = i.targetRectWidth;
  if (o) {
    var r = e.getFont(n == null ? undefined : n.name, n == null ? undefined : n.style);
    return e.splitTextToSize(t, a, {
      fontSize: (n == null ? undefined : n.size) || e.getFontSize(),
      fontName: r.fontName,
      fontStyle: r.fontStyle
    });
  }
  var l = t.split("\n").filter(function (e) {
    return e !== "";
  }).join(" ");
  if (s(e, l, n).w <= a) {
    return [l];
  }
  for (var u = s(e, l + "...", n).w; l.length > 0 && u > a;) {
    var d = 0;
    if (u >= a * 2) {
      d = l.length / 2;
    }
    if (d < 1) {
      d = 1;
    }
    u = s(e, (l = l.substring(0, l.length - d)) + "...", n).w;
  }
  return [l + "..."];
}
function r(e, t) {
  var n = e - (t.left + t.right);
  if (n >= 0) {
    return n;
  } else {
    return 0;
  }
}
function s(e, t, n) {
  return e.getTextDimensions(t, {
    font: e.getFont(n == null ? undefined : n.name, n == null ? undefined : n.style),
    fontSize: (n == null ? undefined : n.size) || e.getFontSize()
  });
}
function l(e, t, n, i) {
  var o = i.wordWrapEnabled;
  var r = i.targetRectWidth;
  return s(e, t, n).h * a(e, t, n, {
    wordWrapEnabled: o,
    targetRectWidth: r
  }).length * e.getLineHeightFactor();
}