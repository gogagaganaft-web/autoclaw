exports.applyBordersConfig = function (e) {
  for (var t = 0; t < e.length; t++) {
    for (var n = e[t].cells, o = 0; o < n.length; o++) {
      var a = n[o].pdfCell;
      var r = o >= 1 ? n[o - 1].pdfCell : null;
      var s = t >= 1 ? e[t - 1].cells[o].pdfCell : null;
      if (a.drawLeftBorder !== false || (0, i.isDefined)(n[o].colSpan)) {
        if (!(0, i.isDefined)(a.drawLeftBorder)) {
          if ((0, i.isDefined)(r) && r.drawRightBorder === false) {
            a.drawLeftBorder = false;
          }
        }
      } else if ((0, i.isDefined)(r)) {
        r.drawRightBorder = false;
      }
      if (a.drawTopBorder === false) {
        if ((0, i.isDefined)(s)) {
          s.drawBottomBorder = false;
        }
      } else if (!(0, i.isDefined)(a.drawTopBorder)) {
        if ((0, i.isDefined)(s) && s.drawBottomBorder === false) {
          a.drawTopBorder = false;
        }
      }
    }
  }
};
exports.applyColSpans = function (e) {
  for (var t = 0; t < e.length; t++) {
    for (var n = e[t], o = 0; o < n.cells.length; o++) {
      var a = n.cells[o];
      if ((0, i.isDefined)(a.colSpan) && !(0, i.isDefined)(a.pdfCell.isMerged)) {
        for (var r = 1; r <= a.colSpan; r++) {
          var s = e[t].cells[o + r];
          a.pdfCell._rect.w += s.pdfCell._rect.w;
          s.pdfCell._rect.w = 0;
          s.pdfCell.isMerged = true;
        }
      }
    }
  }
};
exports.applyRowSpans = function (e) {
  for (var t = 0; t < e.length; t++) {
    for (var n = e[t], o = 0; o < n.cells.length; o++) {
      var a = n.cells[o];
      if ((0, i.isDefined)(a.rowSpan) && !(0, i.isDefined)(a.pdfCell.isMerged)) {
        for (var r = 1; r <= a.rowSpan; r++) {
          var s = e[t + r].cells[o];
          a.pdfCell._rect.h += s.pdfCell._rect.h;
          s.pdfCell._rect.h = 0;
          s.pdfCell.isMerged = true;
        }
      }
    }
  }
};
exports.calculateCoordinates = function (e, t, n) {
  var o = n == null ? undefined : n.topLeft;
  var a = n == null ? undefined : n.margin;
  var r = ((o == null ? undefined : o.y) ?? 0) + a.top;
  t.forEach(function (e) {
    var i = ((o == null ? undefined : o.x) ?? 0) + a.left;
    var s = e.indentLevel * n.indent;
    e.cells.forEach(function (e) {
      e.pdfCell._rect.x = i + s;
      e.pdfCell._rect.y = r;
      i += e.pdfCell._rect.w;
    });
    r += e.height;
  });
};
exports.calculateHeights = function (e, t, n) {
  t.forEach(function (t) {
    var a;
    var r = t.cells.map(function (e) {
      return e.pdfCell;
    });
    if (n.onRowExporting) {
      var s = {
        rowCells: r
      };
      n.onRowExporting(s);
      if ((0, i.isDefined)(s.rowHeight)) {
        a = s.rowHeight;
      }
    }
    t.height = (0, i.isDefined)(a) ? a : (0, o.calculateRowHeight)(e, t.cells, r.map(function (e) {
      return e._rect.w;
    }));
    r.forEach(function (e) {
      e._rect.h = t.height;
    });
  });
};
exports.calculateTableSize = function (e, t, n) {
  var r;
  var u;
  var d;
  var c;
  var h;
  var f;
  t.forEach(function (e) {
    if (!(0, i.isDefined)(d) || d > e._rect.x) {
      d = e._rect.x;
    }
    if (!(0, i.isDefined)(c) || c > e._rect.y) {
      c = e._rect.y;
    }
    if (!(0, i.isDefined)(h) || h < e._rect.x + e._rect.w) {
      h = e._rect.x + e._rect.w;
    }
    if (!(0, i.isDefined)(f) || f < e._rect.y + e._rect.h) {
      f = e._rect.y + e._rect.h;
    }
  });
  var p = d ?? (n == null || (r = n.topLeft) === null || r === undefined ? undefined : r.x) ?? 0;
  var g = c ?? (n == null || (u = n.topLeft) === null || u === undefined ? undefined : u.y) ?? 0;
  var m = (0, i.isDefined)(h) ? h - p : 0;
  var _ = (0, i.isDefined)(f) ? f - g : 0;
  return {
    x: p,
    y: g,
    w: m,
    h: _
  };
};
exports.initializeCellsWidth = function (e, t, n, r) {
  var s = function (e, t, n, r, s) {
    var l = t.getColumnsWidths().map(function (t) {
      return (0, o.toPdfUnit)(e, t ?? 150);
    });
    var u = l.filter(function (e, t) {
      return !(0, i.isDefined)(s[t]);
    }).reduce(a, 0);
    var d = s.filter(function (e) {
      return (0, i.isNumeric)(e);
    }).reduce(a, 0);
    var c = function (e, t, n) {
      return (0, o.getPageWidth)(e) - t - n.left - n.right;
    }(e, n, r);
    var h = d < c ? (c - d) / u : 1;
    return l.map(function (e, t) {
      return s[t] ?? e * h;
    });
  }(e, t, r.topLeft.x, r.margin, r.columnWidths);
  n.forEach(function (e) {
    e.cells.forEach(function (e, t) {
      e.gridCell;
      e.pdfCell._rect.w = s[t];
    });
  });
};
exports.resizeFirstColumnByIndentLevel = function (e, t) {
  e.forEach(function (e) {
    e.cells[0].pdfCell._rect.w -= e.indentLevel * t.indent;
  });
};
var i = require("./35922.js");
var o = require("./79262.js");
function a(e, t) {
  return e + t;
}