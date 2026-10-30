Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportController = exports.DataProvider = undefined;
require("./63008.js");
require("./45231.js");
var i = f(require("./68374.js"));
var o = require("./62754.js");
var a = require("./13306.js");
var r = require("./37518.js");
var s = require("./68752.js");
var l = require("./35922.js");
var u = f(require("./28109.js"));
var d = f(require("./56757.js"));
var c = require("./1229.js");
var h = f(require("./74938.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
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
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function m(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return _(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return _(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return _(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var v = function () {
  function e(e, t, n) {
    this._exportController = e;
    this._initialColumnWidthsByColumnIndex = t;
    this._selectedRowsOnly = n;
  }
  var t = e.prototype;
  t._getGroupValue = function (e) {
    var t = e.key;
    var n = e.data;
    var i = e.rowType;
    var o = e.groupIndex;
    var a = e.summaryCells;
    var r = this._options.groupColumns[o];
    var s = h.default.getDisplayValue(r, r.deserializeValue ? r.deserializeValue(t[o]) : t[o], n, i);
    var l = `${r.caption}: ${h.default.formatValue(s, r)}`;
    if (a && a[0] && a[0].length) {
      l += ` ${h.default.getGroupRowSummaryText(a[0], this._options.summaryTexts)}`;
    }
    return l;
  };
  t._correctCellIndex = function (e) {
    return e;
  };
  t._initOptions = function () {
    var e = this._exportController;
    var t = e._columnsController.getGroupColumns();
    this._options = {
      columns: e._getColumns(this._initialColumnWidthsByColumnIndex),
      groupColumns: t,
      items: this._selectedRowsOnly || e._selectionOnly ? e._getSelectedItems() : e._getAllItems(),
      isHeadersVisible: e.option("showColumnHeaders"),
      summaryTexts: e.option("summary.texts"),
      rtlEnabled: e.option("rtlEnabled")
    };
  };
  t.getHeaderStyles = function () {
    return [{
      bold: true,
      alignment: "center"
    }, {
      bold: true,
      alignment: "left"
    }, {
      bold: true,
      alignment: "right"
    }];
  };
  t.getGroupRowStyle = function () {
    return {
      bold: true,
      alignment: (0, r.getDefaultAlignment)(this._options.rtlEnabled)
    };
  };
  t.getColumnStyles = function () {
    var e = [];
    this.getColumns().forEach(function (t) {
      e.push({
        alignment: t.alignment || "left",
        format: t.format,
        dataType: t.dataType
      });
    });
    return e;
  };
  t.getStyles = function () {
    return [].concat(m(this.getHeaderStyles()), m(this.getColumnStyles()), [this.getGroupRowStyle()]);
  };
  t._getTotalCellStyleId = function (e) {
    var n = this.getColumns()[e]?.alignment || "right";
    return this.getHeaderStyles().map(function (e) {
      return e.alignment;
    }).indexOf(n);
  };
  t.getStyleId = function (e, t) {
    if (e < this.getHeaderRowCount()) {
      return 0;
    } else if (this.isTotalCell(e - this.getHeaderRowCount(), t)) {
      return this._getTotalCellStyleId(t);
    } else if (this.isGroupRow(e - this.getHeaderRowCount())) {
      return this.getHeaderStyles().length + this.getColumns().length;
    } else {
      return t + this.getHeaderStyles().length;
    }
  };
  t.getColumns = function (e) {
    var t = this._options.columns;
    if (e) {
      return t;
    } else {
      return t[t.length - 1];
    }
  };
  t.getColumnsWidths = function () {
    var e = this.getColumns();
    if ((0, l.isDefined)(e)) {
      return e.map(function (e) {
        return e.width;
      });
    } else {
      return undefined;
    }
  };
  t.getRowsCount = function () {
    return this._options.items.length + this.getHeaderRowCount();
  };
  t.getHeaderRowCount = function () {
    if (this.isHeadersVisible()) {
      return this._options.columns.length - 1;
    } else {
      return 0;
    }
  };
  t.isGroupRow = function (e) {
    return e < this._options.items.length && this._options.items[e].rowType === "group";
  };
  t.getGroupLevel = function (e) {
    var t = this._options.items[e - this.getHeaderRowCount()];
    var n = t && t.groupIndex;
    if (t && t.rowType === "totalFooter") {
      return 0;
    } else if ((0, l.isDefined)(n)) {
      return n;
    } else {
      return this._options.groupColumns.length;
    }
  };
  t.getCellType = function (e, t) {
    var n = this.getColumns();
    if (e < this.getHeaderRowCount()) {
      return "string";
    }
    e -= this.getHeaderRowCount();
    if (t < n.length) {
      var i = this._options.items.length && this._options.items[e];
      var o = n[t];
      if (i && i.rowType === "data" && isFinite(i.values[this._correctCellIndex(t)]) && !(0, l.isDefined)(o.customizeText)) {
        if ((0, l.isDefined)(o.lookup)) {
          return o.lookup.dataType;
        } else {
          return o.dataType;
        }
      } else {
        return "string";
      }
    }
  };
  t.ready = function () {
    this._initOptions();
    var e = this._options;
    return (0, o.when)(e.items).done(function (t) {
      e.items = t;
    }).fail(function () {
      e.items = [];
    });
  };
  t._convertFromGridGroupSummaryItems = function (e) {
    if ((0, l.isDefined)(e) && e.length > 0) {
      return e.map(function (e) {
        return {
          value: e.value,
          name: e.name
        };
      });
    }
  };
  t.getCellData = function (e, t, n) {
    var i;
    var o;
    var a = {
      cellSourceData: {},
      value: i
    };
    var r = this.getColumns();
    var s = this._correctCellIndex(t);
    if (e < this.getHeaderRowCount()) {
      o = this.getColumns(true)[e][t];
      a.cellSourceData.rowType = "header";
      a.cellSourceData.column = o && o.gridColumn;
      a.value = o && o.caption;
    } else {
      e -= this.getHeaderRowCount();
      var u = this._options.items.length && this._options.items[e];
      if (u) {
        var d = u.values;
        a.cellSourceData.rowType = u.rowType;
        a.cellSourceData.column = r[t] && r[t].gridColumn;
        switch (u.rowType) {
          case "groupFooter":
          case "totalFooter":
            if (s < d.length) {
              i = d[s];
              if ((0, l.isDefined)(i)) {
                a.cellSourceData.value = i.value;
                a.cellSourceData.totalSummaryItemName = i.name;
                a.value = h.default.getSummaryText(i, this._options.summaryTexts);
              } else {
                a.cellSourceData.value = undefined;
              }
            }
            break;
          case "group":
            a.cellSourceData.groupIndex = u.groupIndex;
            if (t < 1) {
              a.cellSourceData.column = this._options.groupColumns[u.groupIndex];
              a.cellSourceData.value = u.key[u.groupIndex];
              a.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(u.summaryCells[0]);
              a.value = this._getGroupValue(u);
            } else {
              var c = u.values[s];
              if (Array.isArray(c)) {
                a.cellSourceData.groupSummaryItems = this._convertFromGridGroupSummaryItems(c);
                i = "";
                for (var f = 0; f < c.length; f++) {
                  i += (f > 0 ? n ? "\n" : " \n " : "") + h.default.getSummaryText(c[f], this._options.summaryTexts);
                }
                a.value = i;
              } else {
                a.cellSourceData.value = undefined;
              }
            }
            break;
          default:
            if (o = r[t]) {
              var p = d[s];
              var g = h.default.getDisplayValue(o, p, u.data, u.rowType);
              if (!isFinite(g) || (0, l.isDefined)(o.customizeText)) {
                if (n && (0, l.isDefined)(o.customizeText) && o.customizeText === this._exportController._columnsController.getCustomizeTextByDataType("boolean")) {
                  a.value = g;
                } else {
                  a.value = h.default.formatValue(g, o);
                }
              } else {
                a.value = g;
              }
              a.cellSourceData.value = p;
            }
            a.cellSourceData.data = u.data;
        }
      }
    }
    return a;
  };
  t.isHeadersVisible = function () {
    return this._options.isHeadersVisible;
  };
  t.isTotalCell = function (e, t) {
    var n = this._options.items[e];
    var i = this._correctCellIndex(t);
    var o = n.summaryCells && n.summaryCells[i] && n.summaryCells[i].length > 0 && n.summaryCells[i][0].alignByColumn;
    return n && n.rowType === "groupFooter" || n.rowType === "totalFooter" || o;
  };
  t.getCellMerging = function (e, t) {
    var n = this._options.columns;
    var i = n[e] && n[e][t];
    if (i) {
      return {
        colspan: (i.exportColspan || 1) - 1,
        rowspan: (i.rowspan || 1) - 1
      };
    } else {
      return {
        colspan: 0,
        rowspan: 0
      };
    }
  };
  t.getFrozenArea = function () {
    return {
      x: 0,
      y: this.getHeaderRowCount()
    };
  };
  return e;
}();
exports.DataProvider = v;
var y = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var r = i.prototype;
  r._getEmptyCell = function () {
    return {
      caption: "",
      colspan: 1,
      rowspan: 1
    };
  };
  r._updateColumnWidth = function (e, t) {
    e.width = t;
  };
  r._getColumns = function (e) {
    var t;
    var n;
    var i = [];
    var o = this._columnsController;
    var r = o.getRowCount();
    for (t = 0; t <= r; t++) {
      var s = [];
      n = o.getVisibleColumns(t, true);
      var u = undefined;
      if (t === r) {
        if (this._updateLockCount) {
          u = e;
        } else {
          var d = this._getColumnWidths(this._headersView, this._rowsView);
          if (d && d.length) {
            u = {};
            for (var h = 0; h < n.length; h++) {
              u[n[h].index] = d[h];
            }
          }
        }
      }
      for (var f = 0; f < n.length; f++) {
        var p = (0, a.extend)({}, n[f], {
          dataType: n[f].dataType === "datetime" ? "date" : n[f].dataType,
          gridColumn: n[f]
        });
        if (this._needColumnExporting(p)) {
          var g = this._calculateExportColspan(p);
          if ((0, l.isDefined)(g)) {
            p.exportColspan = g;
          }
          if (u) {
            this._updateColumnWidth(p, u[p.index]);
          }
          s.push(p);
        }
      }
      i.push(s);
    }
    n = i[r];
    (i = (0, c.prepareItems)(i.slice(0, -1), this._getEmptyCell())).push(n);
    return i;
  };
  r._calculateExportColspan = function (e) {
    var t = this;
    if (e.isBand) {
      var n = this._columnsController.getChildrenByBandColumn(e.index, true);
      if ((0, l.isDefined)(n)) {
        return n.reduce(function (e, n) {
          if (t._needColumnExporting(n)) {
            return e + (t._calculateExportColspan(n) || 1);
          } else {
            return e;
          }
        }, 0);
      }
    }
  };
  r._needColumnExporting = function (e) {
    return !e.command && (e.allowExporting || e.allowExporting === undefined);
  };
  r._getFooterSummaryItems = function (e, t) {
    var n = [];
    var i = 1;
    var o = 0;
    do {
      var a = [];
      for (var r = 0; r < e.length; r++) {
        var s = e[r];
        var l = s.length;
        if (i < l) {
          i = l;
        }
        a.push(s[o]);
      }
      n.push({
        values: a,
        rowType: t ? "totalFooter" : "groupFooter"
      });
    } while (o++ < i - 1);
    return n;
  };
  r._hasSummaryGroupFooters = function () {
    var e = this.option("summary.groupItems");
    if ((0, l.isDefined)(e)) {
      for (var t = 0; t < e.length; t++) {
        if (e[t].showInGroupFooter) {
          return true;
        }
      }
    }
    return false;
  };
  r._getItemsWithSummaryGroupFooters = function (e) {
    var t = [];
    var n = [];
    var i = [];
    for (var o = 0; o < e.length; o++) {
      var a = e[o];
      if (a.rowType === "groupFooter") {
        i = this._getFooterSummaryItems(a.summaryCells);
        t = t.concat(n, i);
        n = [];
      } else {
        n.push(a);
      }
    }
    if (t.length) {
      return t;
    } else {
      return n;
    }
  };
  r._updateGroupValuesWithSummaryByColumn = function (e) {
    var t = [];
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      var o = i.summaryCells;
      if (i.rowType === "group" && o && o.length > 1) {
        var a;
        var r = i.values.length;
        for (var s = 1; s < o.length; s++) {
          for (var l = 0; l < o[s].length; l++) {
            var u = o[s][l];
            if (u && u.alignByColumn) {
              if (!Array.isArray(t[s - r])) {
                t[s - r] = [];
              }
              t[s - r].push(u);
            }
          }
        }
        if (t.length > 0) {
          (a = i.values).push.apply(a, m(t));
          t = [];
        }
      }
    }
  };
  r._processUnExportedItems = function (e) {
    var t;
    var n;
    var i = this._columnsController.getVisibleColumns(null, true);
    var o = this._columnsController.getGroupColumns();
    for (var a = 0; a < e.length; a++) {
      var r = e[a];
      var s = false;
      t = [];
      n = [];
      for (var l = 0; l < i.length; l++) {
        var u = i[l];
        s ||= ["detailExpand", "buttons"].includes(u.type);
        if (this._needColumnExporting(u) && (r.values && (r.rowType !== "group" || t.length ? t.push(r.values[l]) : t.push(r.key[r.groupIndex])), r.summaryCells)) {
          if (r.rowType !== "group" || n.length) {
            n.push(r.summaryCells[l]);
          } else {
            var d = l - o.length + r.groupIndex;
            n.push(r.summaryCells[s ? d : d + 1]);
          }
        }
      }
      if (t.length) {
        r.values = t;
      }
      if (n.length) {
        r.summaryCells = n;
      }
    }
  };
  r._getAllItems = function (e) {
    var t;
    var n = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
    var i = this;
    var a = new o.Deferred();
    var r = this.getController("data");
    var s = r.footerItems();
    var u = s.length && s[0];
    var d = i.option("summary.totalItems");
    (0, o.when)(e).done(function (e) {
      r.loadAll(e, n).done(function (e, n) {
        i._updateGroupValuesWithSummaryByColumn(e);
        if (i._hasSummaryGroupFooters()) {
          e = i._getItemsWithSummaryGroupFooters(e);
        }
        t = u && u.summaryCells;
        if ((0, l.isDefined)(n) && d) {
          t = i._getSummaryCells(d, n);
        }
        var o = u && i._getFooterSummaryItems(t, true);
        if (o) {
          e = e.concat(o);
        }
        i._processUnExportedItems(e);
        a.resolve(e);
      }).fail(a.reject);
    }).fail(a.reject);
    return a;
  };
  r._getSummaryCells = function (e, t) {
    var n = this.getController("data");
    var i = n._columnsController;
    return n._calculateSummaryCells(e, t, i.getVisibleColumns(null, true), function (e, t) {
      if (n._isDataColumn(t)) {
        return t.index;
      } else {
        return -1;
      }
    });
  };
  r._getSelectedItems = function () {
    var e = this.getController("selection");
    if (this.needLoadItemsOnExportingSelectedItems()) {
      return this._getAllItems(e.loadSelectedItemsWithFilter(), true);
    } else {
      return this._getAllItems(e.getSelectedRowsData());
    }
  };
  r._getColumnWidths = function (e, t) {
    if (e && e.isVisible()) {
      return e.getColumnWidths();
    } else {
      return t.getColumnWidths();
    }
  };
  r.init = function () {
    this._columnsController = this.getController("columns");
    this._rowsView = this.getView("rowsView");
    this._headersView = this.getView("columnHeadersView");
    this.createAction("onExporting", {
      excludeValidators: ["disabled", "readOnly"]
    });
  };
  r.callbackNames = function () {
    return ["selectionOnlyChanged"];
  };
  r.getDataProvider = function (e) {
    var t;
    var n = this._getColumnWidths(this._headersView, this._rowsView);
    if (n && n.length) {
      t = {};
      for (var i = this._columnsController.getVisibleColumns(this._columnsController.getRowCount(), true), o = 0; o < i.length; o++) {
        t[i[o].index] = n[o];
      }
    }
    return new v(this, t, e);
  };
  r.exportTo = function (e, t) {
    this._selectionOnly = e;
    var n = this.getAction("onExporting");
    var i = {
      rtlEnabled: this.option("rtlEnabled"),
      selectedRowsOnly: !!e,
      format: t,
      fileName: "DataGrid",
      cancel: false
    };
    if ((0, l.isFunction)(n)) {
      n(i);
    }
  };
  r.publicMethods = function () {
    return ["getDataProvider"];
  };
  r.selectionOnly = function (e) {
    if (!(0, l.isDefined)(e)) {
      return this._isSelectedRows;
    }
    this._isSelectedRows = e;
    this.selectionOnlyChanged.fire();
  };
  r.needLoadItemsOnExportingSelectedItems = function () {
    return this.option("loadItemsOnExportingSelectedItems") ?? this.getController("data")._dataSource.remoteOperations().filtering;
  };
  return i;
}(h.default.ViewController);
exports.ExportController = y;
h.default.registerModule("export", {
  defaultOptions: function () {
    return {
      export: {
        enabled: false,
        fileName: "DataGrid",
        formats: ["xlsx"],
        allowExportSelectedData: false,
        texts: {
          exportTo: u.default.format("dxDataGrid-exportTo"),
          exportAll: u.default.format("dxDataGrid-exportAll"),
          exportSelectedRows: u.default.format("dxDataGrid-exportSelectedRows")
        }
      }
    };
  },
  controllers: {
    export: y
  },
  extenders: {
    controllers: {
      editing: {
        callbackNames: function () {
          var e = this.callBase();
          if ((0, l.isDefined)(e)) {
            return e.push("editingButtonsUpdated");
          } else {
            return ["editingButtonsUpdated"];
          }
        },
        _updateEditButtons: function () {
          this.callBase();
          this.editingButtonsUpdated.fire();
        }
      }
    },
    views: {
      headerPanel: {
        _getToolbarItems: function () {
          var e = this.callBase();
          var t = this._getExportToolbarButton();
          if (t) {
            e.push(t);
            this._correctItemsPosition(e);
          }
          return e;
        },
        _getExportToolbarButton: function () {
          var e = this;
          var t = this._getExportToolbarItems();
          if (t.length === 0) {
            return null;
          }
          var n = this._needDisableExportButton();
          var o = {
            name: "exportButton",
            location: "after",
            locateInMenu: "auto",
            sortIndex: 30,
            options: {
              items: t
            },
            disabled: n
          };
          if (t.length === 1) {
            var a = p(p({}, t[0]), {
              hint: t[0].text,
              elementAttr: {
                class: "dx-datagrid-export-button"
              }
            });
            o.widget = "dxButton";
            o.showText = "inMenu";
            o.options = a;
          } else {
            var r = {
              icon: "export",
              displayExpr: "text",
              items: t,
              hint: this.option("export.texts.exportTo"),
              elementAttr: {
                class: "dx-datagrid-export-button"
              },
              dropDownOptions: {
                width: "auto",
                _wrapperClassExternal: "dx-datagrid-export-menu"
              }
            };
            o.options = r;
            o.widget = "dxDropDownButton";
            o.menuItemTemplate = function (n, o, a) {
              e._createComponent((0, i.default)(a), d.default, {
                items: t
              });
            };
          }
          return o;
        },
        _getExportToolbarItems: function () {
          var t = this;
          var n = this.option("export");
          var i = this.option("export.texts");
          var o = this.option("export.formats") ?? [];
          if (!n.enabled) {
            return [];
          }
          var a = [];
          o.forEach(function (e) {
            var o = e.toUpperCase();
            var r = "export";
            if (e === "xlsx") {
              o = "Excel";
              r = "xlsxfile";
            }
            if (e === "pdf") {
              r = "pdffile";
            }
            a.push({
              text: (0, s.format)(i.exportAll, o),
              icon: r,
              onClick: function () {
                t._exportController.exportTo(false, e);
              }
            });
            if (n.allowExportSelectedData) {
              a.push({
                text: (0, s.format)(i.exportSelectedRows, o),
                icon: "exportselected",
                onClick: function () {
                  t._exportController.exportTo(true, e);
                }
              });
            }
          });
          return a;
        },
        _correctItemsPosition: function (e) {
          e.sort(function (e, t) {
            return e.sortIndex - t.sortIndex;
          });
        },
        _isExportButtonVisible: function () {
          return this.option("export.enabled");
        },
        optionChanged: function (e) {
          this.callBase(e);
          if (e.name === "export") {
            e.handled = true;
            this._invalidate();
          }
        },
        _needDisableExportButton: function () {
          var e = !this._columnsController.hasVisibleDataColumns();
          var t = this._editingController.hasChanges();
          return e || t;
        },
        _columnOptionChanged: function (e) {
          this.callBase(e);
          if (h.default.checkChanges(e.optionNames, ["groupIndex", "visible", "all"])) {
            var t = this._needDisableExportButton();
            this.setToolbarItemDisabled("exportButton", t);
          }
        },
        init: function () {
          var e = this;
          this.callBase();
          this._exportController = this.getController("export");
          this._editingController = this.getController("editing");
          this._editingController.editingButtonsUpdated.add(function () {
            var t = e._needDisableExportButton();
            e.setToolbarItemDisabled("exportButton", t);
          });
        },
        isVisible: function () {
          return this.callBase() || this._isExportButtonVisible();
        }
      }
    }
  }
});