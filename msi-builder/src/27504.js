exports.generateRowsInfo = function (e, t, n, i) {
  var o = [];
  for (var a = t.getRowsCount(), r = !!n.option("wordWrapEnabled"), s = !!n.option("rtlEnabled"), l = t.getColumns(), u = t.getStyles(), c = 0; c < a; c++) {
    var h = t.getCellData(c, 0, true).cellSourceData.rowType;
    var f = h !== "header" ? t.getGroupLevel(c) : 0;
    var p = o[c - 1];
    if (h === "groupFooter" && (p == null ? undefined : p.rowType) === "groupFooter") {
      f = p.indentLevel - 1;
    }
    o.push({
      rowType: h,
      indentLevel: f,
      cells: d({
        doc: e,
        dataProvider: t,
        rowIndex: c,
        wordWrapEnabled: r,
        columns: l,
        styles: u,
        rowType: h,
        backgroundColor: h === "header" ? i : undefined,
        rtlEnabled: s
      }),
      rowIndex: c
    });
  }
  return o;
};
exports.getBaseTableStyle = function () {
  return u.base;
};
var i = require("./35922.js");
var o = s(require("./91500.js"));
var a = s(require("./18016.js"));
var r = require("./79262.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l() {
  return (l = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var u = {
  base: {
    font: {
      size: 10
    },
    borderWidth: 0.5,
    borderColor: "#979797"
  },
  header: {
    textColor: "#979797"
  },
  group: {},
  data: {},
  groupFooter: {},
  totalFooter: {}
};
function d(e) {
  var t = e.doc;
  var n = e.dataProvider;
  var o = e.rowIndex;
  var a = e.wordWrapEnabled;
  for (var s = e.columns, u = e.styles, d = e.rowType, f = e.backgroundColor, p = e.rtlEnabled, g = [], m = 0; m < s.length; m++) {
    var v = n.getCellData(o, m, true);
    var y = u[n.getStyleId(o, m)];
    var b = c(s[m], d, y);
    var x = p ? "right" : "left";
    var w = (0, r.toPdfUnit)(t, 5);
    var C = {
      text: h(v.value, y.format),
      verticalAlign: "middle",
      horizontalAlign: b.alignment ?? x,
      wordWrapEnabled: a,
      backgroundColor: f,
      padding: {
        top: w,
        right: w,
        bottom: w,
        left: w
      },
      _rect: {},
      _internalTextOptions: {}
    };
    if (p) {
      C._internalTextOptions.isInputVisual = false;
      C._internalTextOptions.isOutputVisual = true;
      C._internalTextOptions.isInputRtl = true;
      C._internalTextOptions.isOutputRtl = false;
    }
    var S = {
      gridCell: v.cellSourceData,
      pdfCell: l({}, C, b)
    };
    if (d === "header") {
      var k = n.getCellMerging(o, m);
      if (k && k.rowspan > 0) {
        S.rowSpan = k.rowspan;
      }
      if (k && k.colspan > 0) {
        S.colSpan = k.colspan;
      }
    } else if (d === "group") {
      var D = p ? "drawRightBorder" : "drawLeftBorder";
      var I = p ? "drawLeftBorder" : "drawRightBorder";
      S.pdfCell[D] = m === 0;
      S.pdfCell[I] = m === s.length - 1;
      if (m > 0) {
        var T = g.slice(1).reduce(function (e, t) {
          return e && !(0, i.isDefined)(t.pdfCell.text);
        }, true);
        if (!(0, i.isDefined)(S.pdfCell.text) && T) {
          g[0].pdfCell[I] = true;
          for (var E = 0; E < g.length; E++) {
            g[E].colSpan = g.length;
          }
          S.colSpan = g.length;
        }
      }
    }
    g.push(S);
  }
  return g;
}
function c(e, t, n) {
  var i = l({}, u.base, u[t]);
  var o = t === "header" ? e.alignment : n.alignment;
  if (o) {
    i.alignment = o;
  }
  if (n.bold && t !== "header") {
    i.font = l({}, i.font, {
      style: "bold"
    });
  }
  return i;
}
function h(e, t) {
  if ((0, i.isDefined)(t)) {
    if ((0, i.isDate)(e)) {
      return o.default.format(e, t);
    }
    if ((0, i.isNumeric)(e)) {
      return a.default.format(e, t);
    }
  }
  if (e == null) {
    return undefined;
  } else {
    return e.toString();
  }
}