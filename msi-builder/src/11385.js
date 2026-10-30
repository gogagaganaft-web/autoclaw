exports.Export = undefined;
var i = require("./35922.js");
var o = require("./38526.js");
var a = require("./13306.js");
var r = require("./5332.js");
var s = require("./58201.js");
var l = {
  getFullOptions: function (e) {
    var t = (0, a.extend)({}, e);
    if (!(0, i.isDefined)(t.worksheet) || !(0, i.isObject)(t.worksheet)) {
      throw Error("The \"worksheet\" field must contain an object.");
    }
    if ((0, i.isDefined)(t.topLeftCell)) {
      if ((0, i.isString)(t.topLeftCell)) {
        var n = t.worksheet.getCell(t.topLeftCell);
        var o = n.row;
        var r = n.col;
        t.topLeftCell = {
          row: o,
          column: r
        };
      }
    } else {
      t.topLeftCell = {
        row: 1,
        column: 1
      };
    }
    if (!(0, i.isDefined)(t.keepColumnWidths)) {
      t.keepColumnWidths = true;
    }
    if (!(0, i.isDefined)(t.loadPanel)) {
      t.loadPanel = {};
    }
    if (!(0, i.isDefined)(t.loadPanel.enabled)) {
      t.loadPanel.enabled = true;
    }
    if (!(0, i.isDefined)(t.encodeExecutableContent)) {
      t.encodeExecutableContent = false;
    }
    return t;
  },
  convertDateForExcelJS: function (e) {
    return new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
  },
  setNumberFormat: function (e, t) {
    e.numFmt = t;
  },
  getCellStyles: function (e) {
    var t = this;
    var n = e.getStyles();
    n.forEach(function (e) {
      var n = t.tryConvertToExcelNumberFormat(e.format, e.dataType);
      if ((0, i.isDefined)(n)) {
        n = n.replace(/&quot;/g, "\"");
      }
      e.numberFormat = n;
    });
    return n;
  },
  tryConvertToExcelNumberFormat: function (e, t) {
    var n = o.ExportFormat.formatObjectConverter(e, t);
    var i = n.currency;
    e = n.format;
    t = n.dataType;
    return o.ExportFormat.convertFormat(e, n.precision, t, i);
  },
  setAlignment: function (e, t, n) {
    e.alignment = e.alignment ?? {};
    if ((0, i.isDefined)(t)) {
      e.alignment.wrapText = t;
    }
    if ((0, i.isDefined)(n)) {
      e.alignment.horizontal = n;
    }
    e.alignment.vertical = "top";
  },
  setColumnsWidth: function (e, t, n) {
    if ((0, i.isDefined)(t)) {
      for (var o = 0; o < t.length; o++) {
        var a = t[o];
        if (typeof a == "number" && isFinite(a)) {
          e.getColumn(n + o).width = Math.min(255, Math.floor(a / 7 * 100) / 100);
        }
      }
    }
  },
  export: function (e, t, n, i) {
    var o;
    var l;
    var u = this;
    var d = e.component;
    var c = e.worksheet;
    var h = e.topLeftCell;
    var f = e.keepColumnWidths;
    var p = e.selectedRowsOnly;
    var g = e.loadPanel;
    var m = e.encodeExecutableContent;
    var _ = d.getDataProvider(p);
    var v = ((o = d._getInternalInstance) === null || o === undefined ? undefined : o.call(d)) || d;
    var y = v.option("loadPanel") && v.option("loadPanel").enabled;
    if (y) {
      d.option("loadPanel.enabled", false);
    }
    if (g.enabled && (0, s.hasWindow)()) {
      var b = n(d);
      var x = i(d);
      (l = new r.ExportLoadPanel(d, b, x, g)).show();
    }
    var w = !!d.option("wordWrapEnabled");
    c.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false
    };
    var C = {
      from: {
        row: h.row,
        column: h.column
      },
      to: {
        row: h.row,
        column: h.column
      }
    };
    return new Promise(function (n) {
      _.ready().done(function () {
        var i = _.getColumns();
        var o = _.getRowsCount();
        var r = new t(d, _, c, e);
        if (f) {
          u.setColumnsWidth(c, _.getColumnsWidths(), C.from.column);
        }
        r._exportAllFieldHeaders(i, u.setAlignment);
        var s = r._getFieldHeaderRowsCount();
        C.to.row = C.from.row + s;
        var l = u.getCellStyles(_);
        for (var h = 0; h < o; h++) {
          var p = C.from.row + s + h;
          var g = c.getRow(p);
          var v = 0;
          if (r._isRowFieldHeadersRow(h)) {
            v = _.getRowAreaColCount();
            r._exportFieldHeaders("row", p, 0, v, u.setAlignment);
          }
          r._trySetOutlineLevel(g, h);
          u.exportRow(_, r, g, h, v, i.length, w, l, m);
          C.to.row = p;
        }
        r.mergedRangesManager.applyMergedRages();
        C.to.column += i.length > 0 ? i.length - 1 : 0;
        var y = c.views[0] || {};
        if (d.option("rtlEnabled")) {
          y.rightToLeft = true;
        }
        if (r._isFrozenZone(_)) {
          if (Object.keys(y).indexOf("state") === -1) {
            (0, a.extend)(y, r._getWorksheetFrozenState(C));
          }
          r._trySetAutoFilter(C);
        }
        if (Object.keys(y).length > 0) {
          c.views = [y];
        }
        n(C);
      }).always(function () {
        if (y) {
          d.option("loadPanel.enabled", y);
        }
        if (g.enabled && (0, s.hasWindow)()) {
          l.dispose();
        }
      });
    });
  },
  exportRow: function (e, t, n, a, r, s, l, u, d) {
    for (var c = r; c < s; c++) {
      var h = e.getCellData(a, c, true);
      var f = n.getCell(t._getFirstColumnIndex() + c);
      t.mergedRangesManager.updateMergedRanges(f, a, c, t);
      var p = t.mergedRangesManager.findMergedCellInfo(a, c, t._isHeaderCell(a, c));
      if ((0, i.isDefined)(p) && f !== p.masterCell) {
        f.style = p.masterCell.style;
        f.value = p.masterCell.value;
      } else {
        if ((0, i.isDate)(h.value)) {
          f.value = this.convertDateForExcelJS(h.value);
        } else {
          f.value = h.value;
        }
        if ((0, i.isDefined)(f.value)) {
          var g = u[e.getStyleId(a, c)];
          var m = g.bold;
          var _ = g.alignment;
          var v = g.numberFormat;
          if ((0, i.isDefined)(v)) {
            this.setNumberFormat(f, v);
          } else if ((0, i.isString)(f.value) && /^[@=+-]/.test(f.value)) {
            this.setNumberFormat(f, "@");
          }
          t._trySetFont(f, m);
          this.setAlignment(f, l, _);
        }
      }
      t._customizeCell(f, h.cellSourceData);
      if (d) {
        f.value = o.ExportFormat.encode(f.value);
      }
    }
  }
};
exports.Export = l;