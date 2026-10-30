exports.Export = undefined;
var i = require("./35922.js");
var o = require("./13306.js");
var a = d(require("./91500.js"));
var r = d(require("./18016.js"));
var s = d(require("./28109.js"));
var l = require("./5332.js");
var u = require("./58201.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = {
  getFullOptions: function (e) {
    var t = (0, o.extend)({}, e);
    if (!(0, i.isDefined)(t.jsPDFDocument) || !(0, i.isObject)(t.jsPDFDocument)) {
      throw Error("The \"jsPDFDocument\" field must contain a jsPDF instance.");
    }
    if (!(0, i.isDefined)(t.jsPDFDocument.autoTable) || !(0, i.isFunction)(t.jsPDFDocument.autoTable)) {
      throw Error("The \"exportDataGrid\" method requires a autoTable plugin for jsPDF object.");
    }
    if (!(0, i.isDefined)(t.keepColumnWidths)) {
      t.keepColumnWidths = true;
    }
    if ((0, i.isDefined)(t.autoTableOptions)) {
      if (!(0, i.isObject)(t.autoTableOptions)) {
        throw Error("The \"autoTableOptions\" option must be of object type.");
      }
      t.autoTableOptions = (0, o.extend)(true, {}, this._getDefaultAutoTableOptions(), t.autoTableOptions);
    } else {
      t.autoTableOptions = this._getDefaultAutoTableOptions();
    }
    if (!(0, i.isDefined)(t.loadPanel)) {
      t.loadPanel = {};
    }
    if (!(0, i.isDefined)(t.loadPanel.enabled)) {
      t.loadPanel.enabled = true;
    }
    if (!(0, i.isDefined)(t.loadPanel.text)) {
      t.loadPanel.text = s.default.format("dxDataGrid-exporting");
    }
    return t;
  },
  _getDefaultAutoTableOptions: function () {
    return {
      theme: "plain",
      tableLineColor: 149,
      tableLineWidth: 0.1,
      styles: {
        textColor: 51,
        lineColor: 149,
        lineWidth: 0
      },
      columnStyles: {},
      headStyles: {
        fontStyle: "normal",
        textColor: 149,
        lineWidth: 0.1
      },
      bodyStyles: {
        lineWidth: 0.1
      },
      head: [],
      body: []
    };
  },
  export: function (e) {
    var t;
    var n;
    var o = this;
    var a = e.jsPDFDocument;
    var r = e.autoTableOptions;
    var s = e.component;
    var d = e.customizeCell;
    var c = e.keepColumnWidths;
    var h = e.selectedRowsOnly;
    var f = e.loadPanel;
    var p = ((t = s._getInternalInstance) === null || t === undefined ? undefined : t.call(s)) || s;
    var g = p.option("loadPanel") && p.option("loadPanel").enabled;
    if (g) {
      s.option("loadPanel.enabled", false);
    }
    if (f.enabled && (0, u.hasWindow)()) {
      var m = s.getView("rowsView");
      (n = new l.ExportLoadPanel(s, m.element(), m.element().parent(), f)).show();
    }
    var _ = s.getDataProvider(h);
    var v = !!s.option("wordWrapEnabled");
    return new Promise(function (e) {
      _.ready().done(function () {
        var t = _.getColumns();
        var n = _.getStyles();
        var s = _.getRowsCount();
        var l = _.getHeaderRowCount();
        var u = [];
        if (c) {
          var h = o._tryGetPdfColumnWidths(r.tableWidth, _.getColumnsWidths());
          if ((0, i.isDefined)(h) && (0, i.isDefined)(r.columnStyles)) {
            o._setColumnWidths(r.columnStyles, h);
          }
        }
        for (var f = 0; f < s; f++) {
          var p = [];
          for (var g = 0; g < t.length; g++) {
            var m = _.getCellData(f, g, true);
            var y = m.value;
            var b = m.cellSourceData;
            var x = n[_.getStyleId(f, g)];
            var w = {
              content: o._getFormattedValue(y, x.format),
              styles: o._getPDFCellStyles(b.rowType, t[g].alignment, x, v)
            };
            if (b.rowType === "header") {
              var C = o._tryGetMergeRange(f, g, u, _);
              if (C && C.rowSpan > 0) {
                w.rowSpan = C.rowSpan + 1;
              }
              if (C && C.colSpan > 0) {
                w.colSpan = C.colSpan + 1;
              }
              if (!u[f] || !u[f][g] || w.rowSpan > 1 || w.colSpan > 1) {
                if ((0, i.isFunction)(d)) {
                  d({
                    gridCell: b,
                    pdfCell: w
                  });
                }
                p.push(w);
              }
            } else if (b.rowType !== "group" || (0, i.isDefined)(w.content) || p.length !== 1) {
              w.content = w.content ?? "";
              if ((0, i.isFunction)(d)) {
                d({
                  gridCell: b,
                  pdfCell: w
                });
              }
              p.push(w);
            } else {
              p[0].colSpan = p[0].colSpan ?? 1;
              p[0].colSpan++;
            }
          }
          if (f < l) {
            r.head.push(p);
          } else {
            r.body.push(p);
          }
        }
        a.autoTable(r);
        e();
      }).always(function () {
        if (g) {
          s.option("loadPanel.enabled", g);
        }
        if (f.enabled && (0, u.hasWindow)()) {
          n.dispose();
        }
      });
    });
  },
  _getFormattedValue: function (e, t) {
    if ((0, i.isDefined)(t)) {
      if ((0, i.isDate)(e)) {
        return a.default.format(e, t);
      }
      if ((0, i.isNumeric)(e)) {
        return r.default.format(e, t);
      }
    }
    return e;
  },
  _getPDFCellStyles: function (e, t, n, i) {
    var o = n.alignment;
    var a = n.bold;
    var r = e === "header" ? t : o;
    var s = {};
    if (r) {
      s.halign = r;
    }
    if (a && e !== "header") {
      s.fontStyle = "bold";
    }
    if (i) {
      s.cellWidth = "wrap";
    }
    return s;
  },
  _tryGetMergeRange: function (e, t, n, i) {
    if (!n[e] || !n[e][t]) {
      var o = i.getCellMerging(e, t);
      var a = o.colspan;
      var r = o.rowspan;
      if (a || r) {
        for (var s = e; s <= e + r; s++) {
          for (var l = t; l <= t + a; l++) {
            n[s] ||= [];
            n[s][l] = true;
          }
        }
        return {
          rowSpan: r,
          colSpan: a
        };
      }
    }
  },
  _tryGetPdfColumnWidths: function (e, t) {
    if ((0, i.isNumeric)(e) && (0, i.isDefined)(t)) {
      var n = t.reduce(function (e, t) {
        return e + t;
      }, 0);
      return t.map(function (t) {
        return e * t / n;
      });
    }
  },
  _setColumnWidths: function (e, t) {
    t.forEach(function (t, n) {
      e[n] = e[n] || {};
      e[n].cellWidth = t;
    });
  }
};
exports.Export = c;