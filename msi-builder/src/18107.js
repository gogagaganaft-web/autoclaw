Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptivityModule = undefined;
var i = b(require("./73176.js"));
var o = b(require("./68374.js"));
var a = require("./20576.js");
var r = require("./62754.js");
var s = require("./3532.js");
var l = require("./13306.js");
var u = require("./95479.js");
var d = require("./58664.js");
var c = require("./35922.js");
var h = require("./95429.js");
var f = b(require("./55994.js"));
var p = require("./39611.js");
var g = b(require("./28109.js"));
var m = b(require("./17737.js"));
var _ = require("./75811.js");
var v = b(require("./15943.js"));
var y = b(require("./60082.js"));
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function x(e, t) {
  return (x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var w = ["columnHeadersView", "rowsView", "footerView"];
function C(e, t) {
  return e._columnsController.getColumnId(t);
}
function S(e, t) {
  var n;
  var i = (0, o.default)(e);
  var a = t.component.getController("adaptiveColumns");
  if (t.rowType === "data") {
    n = (0, o.default)("<span>").addClass(a.addWidgetPrefix("adaptive-more"));
    f.default.on(n, (0, p.addNamespace)(h.name, "dxDataGridAdaptivity"), a.createAction(function () {
      a.toggleExpandAdaptiveDetailRow(t.key);
    }));
    n.appendTo(i);
  } else {
    y.default.setEmptyText(i);
  }
}
function k(e) {
  var n = e.data?.$nextCell;
  f.default.off(n, "focus", k);
  f.default.trigger(n, "dxclick");
}
var D = {
  _isRowEditMode: function () {
    return this._getEditMode() === "row";
  },
  _isItemModified: function (e, t) {
    var n = this._columnsController.getVisibleIndex(e.column.index);
    var i = this._dataController.getRowIndexByKey(t.key);
    var o = this._dataController.items()[i + 1];
    return o && o.modifiedValues && (0, c.isDefined)(o.modifiedValues[n]);
  },
  _renderFormViewTemplate: function (e, t, n) {
    var i = this;
    var o = e.column;
    var a = i.createAction(function () {
      if (i._editingController.isEditing()) {
        f.default.trigger(n, h.name);
      }
    });
    var r = t.row.data;
    var u = o.calculateCellValue(r);
    var d = y.default.getDisplayValue(o, u, r, t.rowType);
    var p = y.default.formatValue(d, o);
    var g = this._editingController.isCellOrBatchEditMode();
    var m = i._rowsView;
    if (o.allowEditing && i.getController("keyboardNavigation").isKeyboardEnabled()) {
      n.attr("tabIndex", i.option("tabIndex"));
      if (g) {
        f.default.off(n, "focus", a);
        f.default.on(n, "focus", a);
      }
    }
    if (o.cellTemplate) {
      var _ = (0, l.extend)({}, t, {
        value: u,
        displayValue: d,
        text: p,
        column: o
      });
      m.renderTemplate(n, o.cellTemplate, _, (0, s.isElementInDom)(n)).done(function () {
        m._cellPrepared(n, t);
      });
    } else {
      var v = n.get(0);
      if (o.encodeHtml) {
        v.textContent = p;
      } else {
        v.innerHTML = p;
      }
      n.addClass("dx-adaptive-item-text");
      if (!(0, c.isDefined)(p) || p === "") {
        n.html("&nbsp;");
      }
      if (!i._isRowEditMode()) {
        if (i._isItemModified(e, t)) {
          n.addClass("dx-item-modified");
        }
      }
      m._cellPrepared(n, t);
    }
  },
  _getTemplate: function (e, t) {
    var n = this;
    var i = e.column;
    var a = this.getController("editing");
    return function (r, s) {
      var u = (0, o.default)(s);
      var d = n._columnsController.getVisibleIndex(i.index);
      var c = (0, l.extend)({}, t);
      function h() {
        var o = n._isItemEdited(e);
        c.value = t.row.values[d];
        if (o || i.showEditorAlways) {
          a.renderFormEditorTemplate(c, e, r, u, !o);
        } else {
          c.column = i;
          c.columnIndex = d;
          n._renderFormViewTemplate(e, c, u);
        }
      }
      h();
      if (c.watch) {
        c.watch(function () {
          return {
            isItemEdited: n._isItemEdited(e),
            value: t.row.values[d]
          };
        }, function () {
          u.contents().remove();
          u.removeClass("dx-adaptive-item-text");
          h();
        });
      }
    };
  },
  _isVisibleColumnsValid: function (e) {
    return !(e < 2) && !(e.length - function () {
      var t = 0;
      for (var n = 0; n < e.length; n++) {
        if (e[n].command) {
          t++;
        }
      }
      return t;
    }() <= 1);
  },
  _calculatePercentWidths: function (e, t) {
    var n = this;
    var i = 0;
    t.forEach(function (t, o) {
      if (e[o] !== "adaptiveHidden") {
        i += n._getItemPercentWidth(t);
      }
    });
    return i;
  },
  _isPercentWidth: function (e) {
    return (0, c.isString)(e) && e.endsWith("%");
  },
  _isColumnHidden: function (e) {
    return this._hiddenColumns.filter(function (t) {
      return t.index === e.index;
    }).length > 0;
  },
  _getAverageColumnsWidth: function (e, t, n) {
    var i = this;
    var o = 0;
    var a = 0;
    t.forEach(function (r) {
      if (!i._isColumnHidden(r)) {
        var s = r.width;
        if ((0, c.isDefined)(s) && !isNaN(parseFloat(s))) {
          o += i._isPercentWidth(s) ? i._calculatePercentWidth({
            visibleIndex: r.visibleIndex,
            columnsCount: t.length,
            columnsCanFit: n,
            bestFitWidth: r.bestFitWidth,
            columnWidth: s,
            containerWidth: e
          }) : parseFloat(s);
        } else {
          a++;
        }
      }
    });
    return (e - o) / a;
  },
  _calculateColumnWidth: function (e, t, n, i) {
    var o;
    var a = C(this, e);
    var r = this._columnsController.columnOption(a, "width");
    var s = this._columnsController.columnOption(a, "bestFitWidth");
    var l = n.length;
    if (r && r !== "auto") {
      if (!this._isPercentWidth(r)) {
        return parseFloat(r);
      }
      o = this._calculatePercentWidth({
        visibleIndex: e.visibleIndex,
        columnsCount: l,
        columnsCanFit: i,
        bestFitWidth: s,
        columnWidth: r,
        containerWidth: t
      });
    } else {
      o = this.option("columnAutoWidth") || e.command ? s : this._getAverageColumnsWidth(t, n, i);
    }
    return o;
  },
  _calculatePercentWidth: function (e) {
    var t = e.visibleIndex < e.columnsCount - 1 && e.columnsCanFit;
    var n = e.containerWidth * parseFloat(e.columnWidth) / 100;
    var i = e.columnsCanFit && n < e.bestFitWidth ? e.bestFitWidth : n;
    if (t) {
      return e.containerWidth * parseFloat(e.columnWidth) / 100;
    } else {
      return i;
    }
  },
  _getNotTruncatedColumnWidth: function (e, t, n, i) {
    var o = C(this, e);
    var a = this._columnsController.columnOption(o, "width");
    var r = this._columnsController.columnOption(o, "bestFitWidth");
    if (a && a !== "auto" && !this._isPercentWidth(a)) {
      return parseFloat(a);
    }
    var s = this._calculateColumnWidth(e, t, n, i);
    if (s < r) {
      return null;
    } else {
      return s;
    }
  },
  _getItemPercentWidth: function (e) {
    var t = 0;
    if (e.width && this._isPercentWidth(e.width)) {
      t = parseFloat(e.width);
    }
    return t;
  },
  _getCommandColumnsWidth: function () {
    var e = this;
    var t = e._columnsController.getVisibleColumns();
    var n = 0;
    (0, u.each)(t, function (t, i) {
      if (i.index < 0 || i.command) {
        n += e._columnsController.columnOption(C(e, i), "bestFitWidth") || 0;
      }
    });
    return n;
  },
  _isItemEdited: function (e) {
    if (this.isFormOrPopupEditMode()) {
      return false;
    }
    if (!this._isRowEditMode()) {
      var t = this._dataController.getRowIndexByKey(this._dataController.adaptiveExpandedKey()) + 1;
      var n = this._columnsController.getVisibleIndex(e.column.index);
      return this._editingController.isEditCell(t, n);
    }
    var i = this.option("editing.editRowKey");
    return !!(0, a.equalByValue)(i, this._dataController.adaptiveExpandedKey()) || undefined;
  },
  _getFormItemsByHiddenColumns: function (e) {
    var t = [];
    (0, u.each)(e, function (e, n) {
      t.push({
        column: n,
        name: n.name,
        dataField: n.dataField,
        visibleIndex: n.visibleIndex
      });
    });
    return t;
  },
  _getAdaptiveColumnVisibleIndex: function (e) {
    for (var t = 0; t < e.length; t++) {
      if (e[t].command === "adaptive") {
        return t;
      }
    }
  },
  _hideAdaptiveColumn: function (e, t) {
    var n = this._getAdaptiveColumnVisibleIndex(t);
    if ((0, c.isDefined)(n)) {
      e[n] = "adaptiveHidden";
      this._hideVisibleColumn({
        isCommandColumn: true,
        visibleIndex: n
      });
    }
  },
  _showHiddenCellsInView: function (e) {
    var t = e.$cells;
    var n = e.isCommandColumn;
    var i = this.addWidgetPrefix("hidden-column");
    if (n) {
      i = "dx-command-adaptive-hidden";
      t.attr({
        tabIndex: 0,
        "aria-hidden": null
      }).removeClass(i);
    } else {
      t.removeClass(i);
    }
  },
  _showHiddenColumns: function () {
    for (var e = 0; e < w.length; e++) {
      var t = this.getView(w[e]);
      if (t && t.isVisible() && t.element()) {
        var n = t.name;
        var i = t.element().find(`.dx-command-adaptive-hidden`);
        this._showHiddenCellsInView({
          viewName: n,
          $cells: i,
          isCommandColumn: true
        });
        var o = t.element().find(`.${this.addWidgetPrefix("hidden-column")}`);
        this._showHiddenCellsInView({
          viewName: n,
          $cells: o
        });
      }
    }
  },
  _isCellValid: function (e) {
    return e && e.length && !e.hasClass("dx-master-detail-cell") && !e.hasClass("dx-group-cell");
  },
  _hideVisibleColumn: function (e) {
    var t = e.isCommandColumn;
    var n = e.visibleIndex;
    var i = this;
    w.forEach(function (e) {
      var o = i.getView(e);
      if (o) {
        i._hideVisibleColumnInView({
          view: o,
          isCommandColumn: t,
          visibleIndex: n
        });
      }
    });
  },
  _hideVisibleColumnInView: function (e) {
    var t;
    var n = e.view;
    var i = e.isCommandColumn;
    var o = e.visibleIndex;
    var a = n.name;
    var r = this._columnsController.getVisibleColumns()[o];
    var s = this._editingController && this._editingController.getEditFormRowIndex();
    if (n && n.isVisible() && r) {
      for (var l = n.getRowsCount(), u = n._getRowElements(), d = 0; d < l; d++) {
        if (d !== s || a !== "rowsView" || this.option("editing.mode") === "popup") {
          var c = a === "columnHeadersView" ? this._columnsController.getVisibleIndex(r.index, d) : o;
          if (c >= 0) {
            var h = u.eq(d);
            t = this._findCellElementInRow(h, c);
            if (this._isCellValid(t)) {
              this._hideVisibleCellInView({
                viewName: a,
                isCommandColumn: i,
                $cell: t
              });
            }
          }
        }
      }
    }
  },
  _findCellElementInRow: function (e, t) {
    var n = e.children();
    var i = t;
    var o = false;
    if (e.hasClass("dx-group-row")) {
      var a = e.find(`.dx-group-cell`);
      var r = a.attr("colspan");
      if (a.length && (0, c.isDefined)(r)) {
        var s = parseInt(r);
        if (t > a.index() + s - 1) {
          i = t - s + 1;
        } else {
          o = true;
        }
      }
    }
    if (o) {
      return undefined;
    } else {
      return n.eq(i);
    }
  },
  _hideVisibleCellInView: function (e) {
    var t = e.$cell;
    var n = e.isCommandColumn ? "dx-command-adaptive-hidden" : this.addWidgetPrefix("hidden-column");
    t.attr({
      tabIndex: -1,
      "aria-hidden": true
    }).addClass(n);
  },
  _getEditMode: function () {
    return this._editingController.getEditMode();
  },
  isFormOrPopupEditMode: function () {
    var e = this._getEditMode();
    return e === "form" || e === "popup";
  },
  hideRedundantColumns: function (e, t, n) {
    this._hiddenColumns = [];
    if (this._isVisibleColumnsValid(t) && n.length) {
      var i;
      var o;
      var a;
      var r = 0;
      var s = this.component.$element();
      var l = (0, d.getWidth)(s) - this._getCommandColumnsWidth();
      var u = function () {
        var e = this;
        return t.filter(function (t) {
          return !t.command && e._hiddenColumns.filter(function (e) {
            return e.index === t.index;
          }).length === 0;
        });
      }.bind(this);
      var c = u();
      var h = c.length;
      do {
        a = false;
        r = 0;
        var f = this._calculatePercentWidths(e, t);
        var p = f < 100 && f !== 0;
        for (i = 0; i < t.length; i++) {
          var g = t[i];
          var m = this._getNotTruncatedColumnWidth(g, l, c, p);
          var _ = C(this, g);
          var v = this._columnsController.columnOption(_, "width");
          var y = this._columnsController.columnOption(_, "minWidth");
          var b = this._columnsController.columnOption(_, "bestFitWidth");
          if (e[i] !== "adaptiveHidden") {
            if (!m && !g.command && !g.fixed) {
              a = true;
              break;
            }
            if (!v || v === "auto") {
              m = Math.max(b || 0, y || 0);
            }
            if (g.command !== "adaptive" || o) {
              r += m;
            }
          } else {
            o = true;
          }
        }
        if (a = a || r > (0, d.getWidth)(s)) {
          var x = n.pop();
          var w = this._columnsController.getVisibleIndex(x.index);
          l += this._calculateColumnWidth(x, l, c, p);
          this._hideVisibleColumn({
            visibleIndex: w
          });
          e[w] = "adaptiveHidden";
          this._hiddenColumns.push(x);
          c = u();
        }
      } while (a && c.length > 1 && n.length);
      if (h === c.length) {
        this._hideAdaptiveColumn(e, t);
      }
    } else {
      this._hideAdaptiveColumn(e, t);
    }
  },
  getAdaptiveDetailItems: function () {
    return this._$itemContents;
  },
  getItemContentByColumnIndex: function (e) {
    var t;
    for (var n = 0; n < this._$itemContents.length; n++) {
      var i = (t = this._$itemContents.eq(n)).data("dx-form-item");
      if (i && i.column && this._columnsController.getVisibleIndex(i.column.index) === e) {
        return t;
      }
    }
  },
  toggleExpandAdaptiveDetailRow: function (e, t) {
    if (!this.isFormOrPopupEditMode() || !this._editingController.isEditing()) {
      this.getController("data").toggleExpandAdaptiveDetailRow(e, t);
    }
  },
  createFormByHiddenColumns: function (e, t) {
    var n = this;
    var a = (0, o.default)(e);
    var r = {
      items: n._getFormItemsByHiddenColumns(n._hiddenColumns),
      formID: `dx-${new i.default()}`
    };
    var s = (0, _.isMaterial)() ? {
      colCount: 2
    } : {};
    this.executeAction("onAdaptiveDetailRowPreparing", {
      formOptions: r
    });
    n._$itemContents = null;
    n._form = n._createComponent((0, o.default)("<div>").appendTo(a), m.default, (0, l.extend)(s, r, {
      customizeItem: function (e) {
        var i = e.column || n._columnsController.columnOption(e.name || e.dataField);
        if (i) {
          e.label = e.label || {};
          e.label.text = e.label.text || i.caption;
          e.column = i;
          e.template = n._getTemplate(e, t, n.updateForm.bind(n));
        }
        if (r.customizeItem) {
          r.customizeItem.call(this, e);
        }
      },
      onContentReady: function (e) {
        if (r.onContentReady) {
          r.onContentReady.call(this, e);
        }
        n._$itemContents = a.find(`.dx-field-item-content`);
      }
    }));
  },
  hasAdaptiveDetailRowExpanded: function () {
    return (0, c.isDefined)(this._dataController.adaptiveExpandedKey());
  },
  updateForm: function (e) {
    if (this.hasAdaptiveDetailRowExpanded() && this._form && (0, c.isDefined)(this._form._contentReadyAction)) {
      if (e && e.length) {
        this._form.option("items", this._getFormItemsByHiddenColumns(e));
      } else {
        this._form.repaint();
      }
    }
  },
  updateHidingQueue: function (e) {
    var t;
    var n;
    var i = e.filter(function (e) {
      return e.visible && !e.type && !e.fixed && (!(0, c.isDefined)(e.groupIndex) || !(e.groupIndex >= 0));
    });
    this._hidingColumnsQueue = [];
    if (this.option("allowColumnResizing") && this.option("columnResizingMode") === "widget") {
      return this._hidingColumnsQueue;
    }
    for (n = 0; n < i.length; n++) {
      if ((0, c.isDefined)(i[n].hidingPriority) && i[n].hidingPriority >= 0) {
        t = true;
        this._hidingColumnsQueue[i[n].hidingPriority] = i[n];
      }
    }
    if (t) {
      this._hidingColumnsQueue.reverse();
    } else if (this.option("columnHidingEnabled")) {
      for (n = 0; n < i.length; n++) {
        var o = this._columnsController.getVisibleIndex(i[n].index);
        this._hidingColumnsQueue[o] = i[n];
      }
    }
    this._hidingColumnsQueue = this._hidingColumnsQueue.filter(Object);
    return this._hidingColumnsQueue;
  },
  getHiddenColumns: function () {
    return this._hiddenColumns;
  },
  hasHiddenColumns: function () {
    return this._hiddenColumns.length > 0;
  },
  getHidingColumnsQueue: function () {
    return this._hidingColumnsQueue;
  },
  init: function () {
    var e = this;
    e._columnsController = e.getController("columns");
    e._dataController = e.getController("data");
    e._rowsView = e.getView("rowsView");
    e._columnsController.addCommandColumn({
      type: "adaptive",
      command: "adaptive",
      visible: true,
      adaptiveHidden: true,
      cssClass: "dx-command-adaptive",
      alignment: "center",
      width: "auto",
      cellTemplate: S,
      fixedPosition: "right"
    });
    e._columnsController.columnsChanged.add(function () {
      var t = !!e.updateHidingQueue(e._columnsController.getColumns()).length;
      e._columnsController.columnOption("command:adaptive", "adaptiveHidden", !t, true);
    });
    e._editingController = e.getController("editing");
    e._hidingColumnsQueue = [];
    e._hiddenColumns = [];
    e.createAction("onAdaptiveDetailRowPreparing");
    e.callBase();
  },
  optionChanged: function (e) {
    if (e.name === "columnHidingEnabled") {
      this._columnsController.columnOption("command:adaptive", "adaptiveHidden", !e.value);
    }
    this.callBase(e);
  },
  publicMethods: function () {
    return ["isAdaptiveDetailRowExpanded", "expandAdaptiveDetailRow", "collapseAdaptiveDetailRow"];
  },
  isAdaptiveDetailRowExpanded: function (e) {
    var t = this._dataController;
    return t.adaptiveExpandedKey() && (0, a.equalByValue)(t.adaptiveExpandedKey(), e);
  },
  expandAdaptiveDetailRow: function (e) {
    if (!this.hasAdaptiveDetailRowExpanded()) {
      this.toggleExpandAdaptiveDetailRow(e);
    }
  },
  collapseAdaptiveDetailRow: function () {
    if (this.hasAdaptiveDetailRowExpanded()) {
      this.toggleExpandAdaptiveDetailRow();
    }
  },
  updateCommandAdaptiveAriaLabel: function (e, t) {
    var n = this._dataController.getRowIndexByKey(e);
    if (n !== -1) {
      var i = (0, o.default)(this.component.getRowElement(n));
      this.setCommandAdaptiveAriaLabel(i, t);
    }
  },
  setCommandAdaptiveAriaLabel: function (e, t) {
    e.find(".dx-command-adaptive").attr("aria-label", g.default.format(t));
  }
};
var I = {
  defaultOptions: function () {
    return {
      columnHidingEnabled: false,
      onAdaptiveDetailRowPreparing: null
    };
  },
  controllers: {
    adaptiveColumns: v.default.ViewController.inherit(D)
  },
  extenders: {
    views: {
      rowsView: {
        _getCellTemplate: function (e) {
          var t = this;
          var n = e.column;
          if (e.rowType === "detailAdaptive" && n.command === "detail") {
            return function (e, n) {
              t._adaptiveColumnsController.createFormByHiddenColumns((0, o.default)(e), n);
            };
          } else {
            return t.callBase(e);
          }
        },
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e && e.rowType === "detailAdaptive" && e.key === this._dataController.adaptiveExpandedKey()) {
            t.addClass("dx-adaptive-detail-row");
          }
          return t;
        },
        _renderCells: function (e, t) {
          this.callBase(e, t);
          var n = this._adaptiveColumnsController;
          var i = n.getHidingColumnsQueue().length;
          var o = n.getHiddenColumns().length;
          if (i && !o) {
            (function (e) {
              return e.find("td:not(.dx-datagrid-hidden-column):not([class*='dx-command-'])");
            })(e).last().addClass("dx-last-data-cell");
          }
          if (t.row.rowType === "data") {
            n.setCommandAdaptiveAriaLabel(e, "dxDataGrid-ariaAdaptiveExpand");
          }
        },
        _getColumnIndexByElementCore: function (e) {
          var t = e.closest(`.dx-field-item-content`);
          if (t.length && t.closest(this.component.$element()).length) {
            var n = t.length ? t.first().data("dx-form-item") : null;
            return n && n.column && this._columnsController.getVisibleIndex(n.column.index);
          }
          return this.callBase(e);
        },
        _cellPrepared: function (e, t) {
          this.callBase.apply(this, arguments);
          if (t.row.rowType !== "detailAdaptive" && t.column.visibleWidth === "adaptiveHidden") {
            e.addClass(this.addWidgetPrefix("hidden-column"));
          }
        },
        getCell: function (e, t) {
          var n = this._dataController.items()[e == null ? undefined : e.rowIndex];
          if ((n == null ? undefined : n.rowType) === "detailAdaptive") {
            var i = this._adaptiveColumnsController.getAdaptiveDetailItems();
            return this.callBase(e, t, i);
          }
          return this.callBase.apply(this, arguments);
        },
        _getCellElement: function (e, t) {
          var n = this._dataController.items()[e];
          if (n && n.rowType === "detailAdaptive") {
            return this._adaptiveColumnsController.getItemContentByColumnIndex(t);
          } else {
            return this.callBase.apply(this, arguments);
          }
        },
        getContextMenuItems: function (e) {
          if (e.row && e.row.rowType === "detailAdaptive") {
            var t = this.component.getView("columnHeadersView");
            var n = (0, o.default)(e.targetElement).closest(".dx-field-item-label").next().data("dx-form-item");
            e.column = n ? n.column : e.column;
            return t.getContextMenuItems && t.getContextMenuItems(e);
          }
          return this.callBase && this.callBase(e);
        },
        isClickableElement: function (e) {
          return !!this.callBase && this.callBase(e) || !!e.closest(`.dx-command-adaptive`).length;
        },
        init: function () {
          this.callBase();
          this._adaptiveColumnsController = this.getController("adaptiveColumns");
        }
      }
    },
    controllers: {
      export: {
        _updateColumnWidth: function (e, t) {
          this.callBase(e, e.visibleWidth === "adaptiveHidden" ? e.bestFitWidth : t);
        }
      },
      columnsResizer: {
        _pointCreated: function (e, t, n) {
          var i = this.callBase(e, t, n);
          var o = n[e.columnIndex] || {};
          var a = this._getNextColumnIndex(e.columnIndex);
          var r = n[a] || {};
          var s = a !== e.columnIndex + 1 && r.command;
          var l = o.visibleWidth === "adaptiveHidden" || s;
          return i || l;
        },
        _getNextColumnIndex: function (e) {
          for (var t = this._columnsController.getVisibleColumns(), n = this.callBase(e); t[n] && t[n].visibleWidth === "adaptiveHidden";) {
            n++;
          }
          return n;
        }
      },
      draggingHeader: {
        _pointCreated: function (e, t, n, i) {
          var o = this.callBase(e, t, n, i);
          var a = (t[e.columnIndex - 1] || {}).visibleWidth === "adaptiveHidden";
          return o || a;
        }
      },
      editing: {
        _isRowEditMode: function () {
          return this.getEditMode() === "row";
        },
        _getFormEditItemTemplate: function (e, t) {
          if (this.getEditMode() !== "row" && e.rowType === "detailAdaptive") {
            e.columnIndex = this._columnsController.getVisibleIndex(t.index);
            return this.getColumnTemplate(e);
          } else {
            return this.callBase(e, t);
          }
        },
        _closeEditItem: function (e) {
          var t = e.closest(`.dx-field-item-content`);
          var n = this._dataController.getRowIndexByKey(this._dataController.adaptiveExpandedKey()) + 1;
          var i = t.length ? t.first().data("dx-form-item") : null;
          var o = i && i.column && this._columnsController.getVisibleIndex(i.column.index);
          if (!this.isEditCell(n, o)) {
            this.callBase(e);
          }
        },
        _beforeUpdateItems: function (e, t) {
          if (!this._adaptiveController.isFormOrPopupEditMode() && this._adaptiveController.hasHiddenColumns()) {
            var n = this._dataController.items();
            var i = n[t];
            var o = y.default.getIndexByKey(this._dataController.adaptiveExpandedKey(), n);
            this._isForceRowAdaptiveExpand = !this._adaptiveController.hasAdaptiveDetailRowExpanded();
            if (o >= 0) {
              e.push(o + 1);
            }
            e.push(t + 1);
            this._dataController.adaptiveExpandedKey(i.key);
          }
        },
        _afterInsertRow: function (e) {
          this.callBase.apply(this, arguments);
          if (this._adaptiveController.hasHiddenColumns()) {
            this._adaptiveController.toggleExpandAdaptiveDetailRow(e, this.isRowEditMode());
            this._isForceRowAdaptiveExpand = true;
          }
        },
        _collapseAdaptiveDetailRow: function () {
          if (this._isRowEditMode() && this._isForceRowAdaptiveExpand) {
            this._adaptiveController.collapseAdaptiveDetailRow();
            this._isForceRowAdaptiveExpand = false;
          }
        },
        _cancelEditAdaptiveDetailRow: function () {
          if (this._adaptiveController.hasHiddenColumns()) {
            this._collapseAdaptiveDetailRow();
          }
        },
        _afterSaveEditData: function () {
          var e = this;
          this.callBase.apply(this, arguments);
          var t = new r.Deferred();
          if (this._isRowEditMode() && this._adaptiveController.hasHiddenColumns()) {
            (0, r.when)(this.getController("validating").validate(true)).done(function (n) {
              if (n) {
                e._cancelEditAdaptiveDetailRow();
              }
              t.resolve();
            });
          } else {
            t.resolve();
          }
          return t.promise();
        },
        _beforeCancelEditData: function () {
          this.callBase();
          this._cancelEditAdaptiveDetailRow();
        },
        _getRowIndicesForCascadeUpdating: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (this._adaptiveController.isAdaptiveDetailRowExpanded(e.key)) {
            t.push(e.rowType === "detailAdaptive" ? e.rowIndex - 1 : e.rowIndex + 1);
          }
          return t;
        },
        _beforeCloseEditCellInBatchMode: function (e) {
          var t = this._dataController._adaptiveExpandedKey;
          if (t) {
            var n = y.default.getIndexByKey(t, this._dataController.items());
            if (n > -1) {
              e.unshift(n);
            }
          }
        },
        editRow: function (e) {
          if (this._adaptiveController.isFormOrPopupEditMode()) {
            this._adaptiveController.collapseAdaptiveDetailRow();
          }
          this.callBase(e);
        },
        deleteRow: function (e) {
          var t = this._dataController.getKeyByRowIndex(e);
          if (this.getEditMode() === "batch" && this._adaptiveController.isAdaptiveDetailRowExpanded(t)) {
            this._adaptiveController.collapseAdaptiveDetailRow();
          }
          this.callBase(e);
        },
        init: function () {
          this.callBase();
          this._adaptiveController = this.getController("adaptiveColumns");
        }
      },
      resizing: {
        _needBestFit: function () {
          return this.callBase() || !!this._adaptiveColumnsController.getHidingColumnsQueue().length;
        },
        _correctColumnWidths: function (e, t) {
          var n = this._adaptiveColumnsController;
          var i = n.getHiddenColumns();
          var o = n.updateHidingQueue(this._columnsController.getColumns());
          n.hideRedundantColumns(e, t, o);
          var a = n.getHiddenColumns();
          if (n.hasAdaptiveDetailRowExpanded() && i.length !== a.length) {
            n.updateForm(a);
          }
          if (!a.length) {
            n.collapseAdaptiveDetailRow();
          }
          return this.callBase.apply(this, arguments);
        },
        _toggleBestFitMode: function (e) {
          if (e) {
            this._adaptiveColumnsController._showHiddenColumns();
          }
          this.callBase(e);
        },
        _needStretch: function () {
          var e = this._adaptiveColumnsController;
          return this.callBase.apply(this, arguments) || e.getHidingColumnsQueue().length || e.hasHiddenColumns();
        },
        init: function () {
          this._adaptiveColumnsController = this.getController("adaptiveColumns");
          this.callBase();
        },
        dispose: function () {
          this.callBase.apply(this, arguments);
          clearTimeout(this._updateScrollableTimeoutID);
        }
      },
      data: {
        _processItems: function (e, t) {
          var n = t.changeType;
          e = this.callBase.apply(this, arguments);
          if (n === "loadingAll" || !(0, c.isDefined)(this._adaptiveExpandedKey)) {
            return e;
          }
          var i = y.default.getIndexByKey(this._adaptiveExpandedKey, e);
          var o = this.option("scrolling.legacyMode") === false;
          if (i >= 0) {
            var a = e[i];
            e.splice(i + 1, 0, {
              visible: true,
              rowType: "detailAdaptive",
              key: a.key,
              data: a.data,
              node: a.node,
              modifiedValues: a.modifiedValues,
              isNewRow: a.isNewRow,
              values: a.values
            });
          } else if (n === "refresh" && (!o || !t.repaintChangesOnly)) {
            this._adaptiveExpandedKey = undefined;
          }
          return e;
        },
        _getRowIndicesForExpand: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (this.getController("adaptiveColumns").isAdaptiveDetailRowExpanded(e)) {
            var n = t[t.length - 1];
            t.push(n + 1);
          }
          return t;
        },
        adaptiveExpandedKey: function (e) {
          if (!(0, c.isDefined)(e)) {
            return this._adaptiveExpandedKey;
          }
          this._adaptiveExpandedKey = e;
        },
        toggleExpandAdaptiveDetailRow: function (e, t) {
          var n = y.default.getIndexByKey(this._adaptiveExpandedKey, this._items);
          var i = y.default.getIndexByKey(e, this._items);
          if (n >= 0 && n === i && !t) {
            e = undefined;
            i = -1;
          }
          var o = this._adaptiveExpandedKey;
          this._adaptiveExpandedKey = e;
          if (n >= 0) {
            n++;
          }
          if (i >= 0) {
            i++;
          }
          var a = this.getRowIndexDelta();
          this.updateItems({
            allowInvisibleRowIndices: true,
            changeType: "update",
            rowIndices: [n - a, i - a]
          });
          var r = this.getController("adaptiveColumns");
          r.updateCommandAdaptiveAriaLabel(e, "dxDataGrid-ariaAdaptiveCollapse");
          r.updateCommandAdaptiveAriaLabel(o, "dxDataGrid-ariaAdaptiveExpand");
        },
        init: function () {
          this.callBase();
          this._adaptiveExpandedKey = undefined;
        }
      },
      editorFactory: {
        _needHideBorder: function (e) {
          return this.callBase(e) || (e == null ? undefined : e.hasClass("dx-field-item-content")) && (e == null ? undefined : e.find(".dx-checkbox").length);
        },
        _getFocusCellSelector: function () {
          return `${this.callBase()}, .dx-adaptive-detail-row .dx-field-item > .dx-field-item-content`;
        },
        _getRevertTooltipsSelector: function () {
          return `${this.callBase()}, .dx-field-item-content .${this.addWidgetPrefix("revert-tooltip")}`;
        }
      },
      columns: {
        _isColumnVisible: function (e) {
          return this.callBase(e) && !e.adaptiveHidden;
        }
      },
      keyboardNavigation: function (e) {
        return function (e) {
          var t;
          var n;
          function i() {
            return e.apply(this, arguments) || this;
          }
          n = e;
          (t = i).prototype = Object.create(n.prototype);
          t.prototype.constructor = t;
          x(t, n);
          var o = i.prototype;
          o._isCellValid = function (t, n) {
            return e.prototype._isCellValid.call(this, t, n) && !t.hasClass(this.addWidgetPrefix("hidden-column")) && !t.hasClass("dx-command-adaptive-hidden");
          };
          o._processNextCellInMasterDetail = function (t, n) {
            e.prototype._processNextCellInMasterDetail.call(this, t, n);
            var i = this._editingController.isCellOrBatchEditMode();
            if (this._editingController.isEditing() && t && i && !this._isInsideEditForm(t)) {
              f.default.off(t, "focus", k);
              f.default.on(t, "focus", {
                $nextCell: t
              }, k);
              f.default.trigger(n, "focus");
            }
          };
          o._isCellElement = function (t) {
            return e.prototype._isCellElement.call(this, t) || t.hasClass("dx-adaptive-item-text");
          };
          o.init = function () {
            e.prototype.init.call(this);
            this._adaptiveController = this.getController("adaptiveColumns");
          };
          return i;
        }(e);
      }
    }
  }
};
exports.adaptivityModule = I;