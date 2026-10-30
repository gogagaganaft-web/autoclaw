Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnHeadersModule = undefined;
var i = f(require("./73349.js"));
var o = f(require("./68374.js"));
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./58664.js");
var l = require("./35922.js");
var u = f(require("./55994.js"));
var d = f(require("./28109.js"));
var c = require("./9130.js");
var h = require("./57318.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return g(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return g(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function g(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var m = {
  defaultOptions: function () {
    return {
      showColumnHeaders: true,
      cellHintEnabled: true
    };
  },
  views: {
    columnHeadersView: h.ColumnsView.inherit(function () {
      function e(e, n, i) {
        var a = (0, o.default)("<div>").addClass(e.addWidgetPrefix("text-content"));
        e.setAria("role", "presentation", a);
        t(e, n, i.column, a);
        var r = e.option("showColumnLines");
        var s = e.getController("columns").getHeaderContentAlignment(i.column.alignment);
        return a[r || s === "right" ? "appendTo" : "prependTo"](n);
      }
      function t(e, t, n, i) {
        var o = e._getIndicatorElements(t, true);
        var a = e._getIndicatorElements(t);
        var r = o && o.length;
        var s = e._getColumnAlignment(n.alignment);
        var l = `.${e._getIndicatorClassName("sort")}`;
        var u = `.${e._getIndicatorClassName("sortIndex")}`;
        var d = a.filter(l);
        var c = a.children().filter(u);
        (i = i || t.children(`.${e.addWidgetPrefix("text-content")}`)).toggleClass("dx-text-content-alignment-" + s, r > 0).toggleClass("dx-text-content-alignment-" + (s === "left" ? "right" : "left"), r > 0 && n.alignment === "center").toggleClass("dx-sort-indicator", !!d.length).toggleClass("dx-sort-index-indicator", !!c.length).toggleClass("dx-header-filter-indicator", !!a.filter(`.${e._getIndicatorClassName("headerFilter")}`).length);
      }
      return {
        _createTable: function () {
          var e = this.callBase.apply(this, arguments);
          u.default.on(e, "mousedown selectstart", this.createAction(function (e) {
            var t = e.event;
            if (t.shiftKey) {
              t.preventDefault();
            }
          }));
          return e;
        },
        _isLegacyKeyboardNavigation: function () {
          return this.option("useLegacyKeyboardNavigation");
        },
        _getDefaultTemplate: function (t) {
          var n = this;
          return function (i, o) {
            var a = t.caption;
            var r = !t.command || a && t.command !== "expand";
            if (t.command === "empty") {
              n._renderEmptyMessage(i, o);
            } else if (r) {
              e(n, i, o).text(a);
            } else if (t.command) {
              i.html("&nbsp;");
            }
          };
        },
        _renderEmptyMessage: function (t, n) {
          var a = this._getEmptyHeaderText();
          if (a) {
            var r = e(this, t, n);
            if (a.includes("{0}")) {
              var s = p(a.split("{0}"), 2);
              var l = s[0];
              var c = s[1];
              var h = d.default.format("dxDataGrid-emptyHeaderColumnChooserText");
              var f = this.component.getView("columnChooserView");
              var g = (0, o.default)("<a>").text(h).addClass("dx-link");
              u.default.on(g, "click", this.createAction(function () {
                return f.showColumnChooser();
              }));
              r.append(i.default.createTextNode(l)).append(g).append(i.default.createTextNode(c));
            } else {
              r.text(a);
            }
          } else {
            t.html("&nbsp;");
          }
        },
        _getEmptyHeaderText: function () {
          var e = !!this.component.getView("columnChooserView").hasHiddenColumns();
          var t = !!this.component.getView("headerPanel").hasGroupedColumns();
          switch (true) {
            case e && t:
              return d.default.format("dxDataGrid-emptyHeaderWithColumnChooserAndGroupPanelText");
            case t:
              return d.default.format("dxDataGrid-emptyHeaderWithGroupPanelText");
            case e:
              return d.default.format("dxDataGrid-emptyHeaderWithColumnChooserText");
            default:
              return "";
          }
        },
        _getHeaderTemplate: function (e) {
          return e.headerCellTemplate || {
            allowRenderToDetachedContainer: true,
            render: this._getDefaultTemplate(e)
          };
        },
        _processTemplate: function (t, n) {
          var i = this;
          var o = n.column;
          var r = i.callBase(t);
          if (n.rowType === "header" && r && o.headerCellTemplate && !o.command) {
            return {
              render: function (t) {
                var n = e(i, t.container, t.model);
                r.render((0, a.extend)({}, t, {
                  container: n
                }));
              }
            };
          } else {
            return r;
          }
        },
        _handleDataChanged: function (e) {
          if (e.changeType === "refresh" && (this._isGroupingChanged || this._requireReady)) {
            this._isGroupingChanged = false;
            this.render();
          }
        },
        _renderCell: function (e, t) {
          var n = this.callBase(e, t);
          if (t.row.rowType === "header") {
            n.addClass("dx-cell-focus-disabled");
            if (!this._isLegacyKeyboardNavigation()) {
              if (t.column && !t.column.type) {
                n.attr("tabindex", this.option("tabindex") || 0);
              }
            }
          }
          return n;
        },
        _setCellAriaAttributes: function (e, t) {
          this.callBase(e, t);
          if (t.rowType === "header") {
            this.setAria("role", "columnheader", e);
            if (!!t.column && !t.column.command && !t.column.isBand) {
              e.attr("id", t.column.headerId);
              this.setAria("label", `${d.default.format("dxDataGrid-ariaColumn")} ${t.column.caption}`, e);
            }
          }
        },
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          t.toggleClass("dx-column-lines", this.option("showColumnLines"));
          if (e.rowType === "header") {
            t.addClass("dx-header-row");
            if (!this._isLegacyKeyboardNavigation()) {
              (0, c.registerKeyboardAction)("columnHeaders", this, t, "td", this._handleActionKeyDown.bind(this));
            }
          }
          return t;
        },
        _handleActionKeyDown: function (e) {
          var t = e.event;
          var n = (0, o.default)(t.target);
          this._lastActionElement = t.target;
          if (n.is(".dx-header-filter")) {
            var i = this.getController("headerFilter");
            var a = n.closest("td");
            var r = this.getColumnIndexByElement(a);
            if (r >= 0) {
              i.showHeaderFilterMenu(r, false);
            }
          } else {
            var s = n.closest(".dx-row");
            this._processHeaderAction(t, s);
          }
          t.preventDefault();
        },
        _renderCore: function () {
          var e = this;
          var t = e.element();
          var n = {};
          if (!e._tableElement || e._dataController.isLoaded() || e._hasRowElements) {
            t.addClass(e.addWidgetPrefix("headers")).toggleClass(e.addWidgetPrefix("nowrap"), !e.option("wordWrapEnabled")).empty();
            e.setAria("role", "presentation", t);
            var i = e._updateContent(e._renderTable({
              change: n
            }), n);
            if (e.getRowCount() > 1) {
              t.addClass("dx-header-multi-row");
            }
            e.callBase.apply(e, arguments);
            return i;
          }
        },
        _renderRows: function () {
          var e = this;
          if (e._dataController.isLoaded() || e._hasRowElements) {
            e.callBase.apply(e, arguments);
            e._hasRowElements = true;
          }
        },
        _renderRow: function (e, t) {
          var n = this.getRowCount() === 1 ? null : t.row.rowIndex;
          t.columns = this.getColumns(n);
          this.callBase(e, t);
        },
        _createCell: function (e) {
          var t = e.column;
          var n = this.callBase.apply(this, arguments);
          if (t.rowspan > 1 && e.rowType === "header") {
            n.attr("rowSpan", t.rowspan);
          }
          return n;
        },
        _getRows: function () {
          var e = [];
          var t = this.getRowCount();
          if (this.option("showColumnHeaders")) {
            for (var n = 0; n < t; n++) {
              e.push({
                rowType: "header",
                rowIndex: n
              });
            }
          }
          return e;
        },
        _getCellTemplate: function (e) {
          if (e.rowType === "header") {
            return this._getHeaderTemplate(e.column);
          }
        },
        _columnOptionChanged: function (e) {
          var t = e.changeTypes;
          var n = e.optionNames;
          if (t.grouping || t.groupExpanding) {
            if (t.grouping) {
              this._isGroupingChanged = true;
            }
          } else {
            this.callBase(e);
            if (n.width || n.visible) {
              this.resizeCompleted.fire();
            }
          }
        },
        _isElementVisible: function (e) {
          return e && e.visible;
        },
        _alignCaptionByCenter: function (e) {
          var t = this._getIndicatorContainer(e, true);
          if (t && t.length) {
            t.filter(`.dx-visibility-hidden`).remove();
            (t = this._getIndicatorContainer(e)).clone().addClass("dx-visibility-hidden").css("float", "").insertBefore(e.children(`.${this.addWidgetPrefix("text-content")}`));
          }
        },
        _updateCell: function (e, t) {
          if (t.rowType === "header" && t.column.alignment === "center") {
            this._alignCaptionByCenter(e);
          }
          this.callBase.apply(this, arguments);
        },
        _updateIndicator: function (e, n, i) {
          var o = this.callBase.apply(this, arguments);
          if (n.alignment === "center") {
            this._alignCaptionByCenter(e);
          }
          t(this, e, n);
          return o;
        },
        _getIndicatorContainer: function (e, t) {
          var n = this.callBase(e);
          if (t) {
            return n;
          } else {
            return n.filter(`:not(.dx-visibility-hidden)`);
          }
        },
        _isSortableElement: function () {
          return true;
        },
        getHeadersRowHeight: function () {
          var e = this.getTableElement();
          var t = e && e.find(`.dx-header-row`);
          return t && t.toArray().reduce(function (e, t) {
            return e + (0, s.getHeight)(t);
          }, 0) || 0;
        },
        getHeaderElement: function (e) {
          var t = this.getColumnElements();
          return t && t.eq(e);
        },
        getColumnElements: function (e, t) {
          var n;
          var i = this;
          var a = i._columnsController;
          var s = i.getRowCount();
          if (i.option("showColumnHeaders")) {
            if (s > 1 && (!(0, l.isDefined)(e) || (0, l.isDefined)(t))) {
              var u = [];
              var d = (0, l.isDefined)(t) ? a.getChildrenByBandColumn(t, true) : a.getVisibleColumns();
              (0, r.each)(d, function (t, o) {
                var r = (0, l.isDefined)(e) ? e : a.getRowIndex(o.index);
                if (n = i._getCellElement(r, a.getVisibleIndex(o.index, r))) {
                  u.push(n.get(0));
                }
              });
              return (0, o.default)(u);
            }
            if (!e || e < s) {
              return i.getCellElements(e || 0);
            }
          }
        },
        getColumnIndexByElement: function (e) {
          var t = this.getCellIndex(e);
          var n = e.closest(".dx-row")[0].rowIndex;
          var i = this.getColumns(n)[t];
          if (i) {
            return i.index;
          } else {
            return -1;
          }
        },
        getVisibleColumnIndex: function (e, t) {
          var n = this.getColumns()[e];
          if (n) {
            return this._columnsController.getVisibleIndex(n.index, t);
          } else {
            return -1;
          }
        },
        getColumnWidths: function () {
          var e = this.getColumnElements();
          if (e && e.length) {
            return this._getWidths(e);
          } else {
            return this.callBase.apply(this, arguments);
          }
        },
        allowDragging: function (e) {
          var t = e && this._columnsController.getRowIndex(e.index);
          var n = this.getColumns(t);
          return (this.option("allowColumnReordering") || this._columnsController.isColumnOptionUsed("allowReordering")) && e.allowReordering && n.length > 1;
        },
        getBoundingRect: function () {
          var e = this.getColumnElements();
          if (e && e.length) {
            return {
              top: this.getTableElement().offset().top
            };
          } else {
            return null;
          }
        },
        getName: function () {
          return "headers";
        },
        getColumnCount: function () {
          var e = this.getColumnElements();
          if (e) {
            return e.length;
          } else {
            return 0;
          }
        },
        isVisible: function () {
          return this.option("showColumnHeaders");
        },
        optionChanged: function (e) {
          switch (e.name) {
            case "showColumnHeaders":
            case "wordWrapEnabled":
            case "showColumnLines":
              this._invalidate(true, true);
              e.handled = true;
              break;
            default:
              this.callBase(e);
          }
        },
        getHeight: function () {
          return this.getElementHeight();
        },
        getContextMenuItems: function (e) {
          var t = this;
          var n = e.column;
          if (e.row && (e.row.rowType === "header" || e.row.rowType === "detailAdaptive")) {
            var i = t.option("sorting");
            if (i && i.mode !== "none" && n && n.allowSorting) {
              function o(e) {
                setTimeout(function () {
                  t._columnsController.changeSortOrder(n.index, e.itemData.value);
                });
              }
              return [{
                text: i.ascendingText,
                value: "asc",
                disabled: n.sortOrder === "asc",
                icon: "context-menu-sort-asc",
                onItemClick: o
              }, {
                text: i.descendingText,
                value: "desc",
                disabled: n.sortOrder === "desc",
                icon: "context-menu-sort-desc",
                onItemClick: o
              }, {
                text: i.clearText,
                value: "none",
                disabled: !n.sortOrder,
                icon: "context-menu-sort-none",
                onItemClick: o
              }];
            }
          }
        },
        getRowCount: function () {
          return this._columnsController && this._columnsController.getRowCount();
        },
        setRowsOpacity: function (e, t, n) {
          var i;
          var o;
          var a = this;
          var r = this.getRowCount();
          var s = this._columnsController.getColumns();
          var u = s && s[e];
          var d = u && u.isBand && u.index;
          function c(e, n) {
            if (e.ownerBand === d) {
              o.eq(n).css({
                opacity: t
              });
              if (e.isBand) {
                a.setRowsOpacity(e.index, t, i + 1);
              }
            }
          }
          if ((0, l.isDefined)(d)) {
            for (i = n = n || 0; i < r; i++) {
              if (o = this.getCellElements(i)) {
                this.getColumns(i).forEach(c);
              }
            }
          }
        }
      };
    }())
  }
};
exports.columnHeadersModule = m;