Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowsModule = undefined;
var i = x(require("./68374.js"));
var o = x(require("./47810.js"));
var a = require("./20576.js");
var r = require("./47617.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./37518.js");
var d = require("./58664.js");
var c = require("./68752.js");
var h = require("./80968.js");
var f = require("./35922.js");
var p = require("./58201.js");
var g = x(require("./55994.js"));
var m = require("./29007.js");
var _ = x(require("./28109.js"));
var v = x(require("./41183.js"));
var y = x(require("./60082.js"));
var b = require("./57318.js");
function x(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function w() {
  return (w = Object.assign ? Object.assign.bind() : function (e) {
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
function C(e, t) {
  return (C = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function S(e) {
  if (e) {
    return Math.round(e.scrollWidth() - e.clientWidth());
  } else {
    return 0;
  }
}
function k(e) {
  var t = e.rowType;
  var n = e.column;
  return t === "group" && (0, f.isDefined)(n.groupIndex) && !n.showWhenGrouped && !n.command;
}
function D(e, t) {
  var n = (0, c.isEmpty)(t.text) && t.rowType === "data";
  var i = t.text;
  var o = e.get(0);
  if (n) {
    y.default.setEmptyText(e);
  } else if (t.column.encodeHtml) {
    o.textContent = i;
  } else {
    o.innerHTML = i;
  }
}
var I = {
  defaultOptions: function () {
    return {
      hoverStateEnabled: false,
      scrolling: {
        useNative: "auto"
      },
      loadPanel: {
        enabled: "auto",
        text: _.default.format("Loading"),
        width: 200,
        height: 90,
        showIndicator: true,
        indicatorSrc: "",
        showPane: true
      },
      dataRowTemplate: null,
      columnAutoWidth: false,
      noDataText: _.default.format("dxDataGrid-noDataText"),
      wordWrapEnabled: false,
      showColumnLines: true,
      showRowLines: false,
      rowAlternationEnabled: false,
      activeStateEnabled: false,
      twoWayBindingEnabled: true
    };
  },
  views: {
    rowsView: function (e) {
      var t;
      var n;
      function c() {
        return e.apply(this, arguments) || this;
      }
      n = e;
      (t = c).prototype = Object.create(n.prototype);
      t.prototype.constructor = t;
      C(t, n);
      var _ = c.prototype;
      _._getDefaultTemplate = function (e) {
        switch (e.command) {
          case "empty":
            return function (e) {
              e.html("&nbsp;");
            };
          default:
            return D;
        }
      };
      _._getDefaultGroupTemplate = function (e) {
        var t = this.option("summary.texts");
        return function (n, i) {
          var o = i.data;
          var a = `${i.column.caption}: ${i.text}`;
          var r = n.get(0);
          if (i.summaryItems && i.summaryItems.length) {
            a += ` ${y.default.getGroupRowSummaryText(i.summaryItems, t)}`;
          }
          if (o) {
            if (i.groupContinuedMessage && i.groupContinuesMessage) {
              a += ` (${i.groupContinuedMessage}. ${i.groupContinuesMessage})`;
            } else if (i.groupContinuesMessage) {
              a += ` (${i.groupContinuesMessage})`;
            } else if (i.groupContinuedMessage) {
              a += ` (${i.groupContinuedMessage})`;
            }
          }
          if (e.encodeHtml) {
            r.textContent = a;
          } else {
            r.innerHTML = a;
          }
        };
      };
      _._update = function (e) {};
      _._updateCell = function (t, n) {
        if (k(n)) {
          t.addClass("dx-group-cell");
        }
        e.prototype._updateCell.apply(this, arguments);
      };
      _._getCellTemplate = function (e) {
        var t = e.column;
        if (k(e)) {
          return t.groupCellTemplate || {
            allowRenderToDetachedContainer: true,
            render: this._getDefaultGroupTemplate(t)
          };
        } else if ((e.rowType === "data" || t.command) && t.cellTemplate) {
          return t.cellTemplate;
        } else {
          return {
            allowRenderToDetachedContainer: true,
            render: this._getDefaultTemplate(t)
          };
        }
      };
      _._createRow = function (t, n) {
        var i = e.prototype._createRow.apply(this, arguments);
        if (t) {
          var o = t.rowType === "group";
          var a = t.rowType === "data";
          if (a) {
            i.addClass("dx-data-row");
          }
          if (a && this.option("showRowLines")) {
            i.addClass("dx-row-lines");
          }
          if (this.option("showColumnLines")) {
            i.addClass("dx-column-lines");
          }
          if (t.visible === false) {
            i.hide();
          }
          if (o) {
            i.addClass("dx-group-row");
            var r = t.isExpanded;
            this.setAria("role", "row", i);
            this.setAria("expanded", (0, f.isDefined)(r) && r.toString(), i);
          }
        }
        return i;
      };
      _._rowPrepared = function (t, n, i) {
        var o = this;
        if (n.rowType === "data") {
          if (this.option("rowAlternationEnabled")) {
            if (this._isAltRow(i)) {
              t.addClass("dx-row-alt");
            }
            if (n.watch) {
              n.watch(function () {
                return o._isAltRow(i);
              }, function (e) {
                t.toggleClass("dx-row-alt", e);
              });
            }
          }
          this._setAriaRowIndex(n, t);
          if (n.watch) {
            n.watch(function () {
              return n.rowIndex;
            }, function () {
              return o._setAriaRowIndex(n, t);
            });
          }
        }
        e.prototype._rowPrepared.apply(this, arguments);
      };
      _._setAriaRowIndex = function (e, t) {
        var n = this.component;
        var i = n.option("scrolling.mode") === "standard" && !y.default.isVirtualRowRendering(n);
        var o = e.rowIndex + 1;
        if (i) {
          o = n.pageIndex() * n.pageSize() + o;
        } else {
          o += this._dataController.getRowIndexOffset();
        }
        this.setAria("rowindex", o, t);
      };
      _._afterRowPrepared = function (e) {
        var t = this;
        var n = e.args[0];
        var i = this._dataController;
        var o = i.getVisibleRows()[n.rowIndex];
        var a = this.option("integrationOptions.watchMethod");
        if (n.data && n.rowType === "data" && !n.isNewRow && this.option("twoWayBindingEnabled") && a && o) {
          var r = a(function () {
            return i.generateDataValues(n.data, n.columns);
          }, function () {
            i.repaintRows([o.rowIndex], t.option("repaintChangesOnly"));
          }, {
            deep: true,
            skipImmediate: true
          });
          g.default.on(n.rowElement, m.removeEvent, r);
        }
      };
      _._renderScrollable = function (e) {
        var t = this.element();
        if (!t.children().length) {
          t.append("<div>");
        }
        if (!!e || !this._loadPanel) {
          this._renderLoadPanel(t, t.parent(), this._dataController.isLocalStore());
        }
        if ((e || !this.getScrollable()) && this._dataController.isLoaded()) {
          for (var n = this.getColumns(), i = true, o = 0; o < n.length; o++) {
            if (!n[o].width && !n[o].minWidth) {
              i = false;
              break;
            }
          }
          if (this.option("columnAutoWidth") || this._hasHeight || i || this._columnsController._isColumnFixing()) {
            this._renderScrollableCore(t);
          }
        }
      };
      _._handleScroll = function (e) {
        var t = this.option("rtlEnabled");
        var n = e.component.option("useNative");
        this._scrollTop = e.scrollOffset.top;
        this._scrollLeft = e.scrollOffset.left;
        var i = e.scrollOffset.left;
        if (t) {
          this._scrollRight = S(e.component) - this._scrollLeft;
          if (n) {
            i = -this._scrollRight;
          }
          if (!this.isScrollbarVisible(true)) {
            this._scrollLeft = -1;
          }
        }
        this.scrollChanged.fire(w(w({}, e.scrollOffset), {
          left: i
        }), this.name);
      };
      _._renderScrollableCore = function (e) {
        var t = this._createScrollableOptions();
        var n = this._handleScroll.bind(this);
        t.onScroll = n;
        this._scrollable = this._createComponent(e, v.default, t);
        this._scrollableContainer = this._scrollable && (0, i.default)(this._scrollable.container());
      };
      _._renderLoadPanel = function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
          t[n] = arguments[n];
        }
        return y.default.renderLoadPanel.apply(this, arguments);
      };
      _._renderContent = function (e, t, n) {
        e.empty().append(t);
        return this._findContentElement();
      };
      _._updateContent = function (e, t, n) {
        var i = this;
        this._contentChanges.push({
          newTableElement: e,
          change: t,
          isFixedTableRendering: n
        });
        return this.waitAsyncTemplates().done(function () {
          var e = i._contentChanges;
          i._contentChanges = [];
          e.forEach(function (e) {
            var t = e.newTableElement;
            var n = e.change;
            var o = e.isFixedTableRendering;
            var a = i.getTableElement(o);
            var r = i._findContentElement(o);
            var s = n == null ? undefined : n.changeType;
            var u = [];
            var d = i.option("highlightChanges");
            var c = i.addWidgetPrefix("row-inserted-animation");
            switch (s) {
              case "update":
                (0, l.each)(n.rowIndices, function (e, o) {
                  var s = i._getRowElements(t).eq(e);
                  var l = n.changeTypes?.[e];
                  var h = n.items && n.items[e];
                  u.push(function () {
                    var r = i._getRowElements(a);
                    var u = r.eq(o);
                    switch (l) {
                      case "update":
                        if (h) {
                          var p = n.columnIndices?.[e];
                          if ((0, f.isDefined)(h.visible) && h.visible !== u.is(":visible")) {
                            u.toggle(h.visible);
                          } else if (p) {
                            i._updateCells(u, s, p);
                          } else {
                            u.replaceWith(s);
                          }
                        }
                        break;
                      case "insert":
                        if (r.length) {
                          if (u.length) {
                            s.insertBefore(u);
                          } else {
                            s.insertAfter(r.last());
                          }
                        } else if (a) {
                          var g = s.is("tbody") ? a : a.children("tbody");
                          s.prependTo(g);
                        }
                        if (d && n.isLiveUpdate) {
                          s.addClass(c);
                        }
                        break;
                      case "remove":
                        u.remove();
                    }
                  });
                });
                (0, l.each)(u, function () {
                  this();
                });
                t.remove();
                break;
              default:
                i.setTableElement(t, o);
                r.addClass(i.addWidgetPrefix("content"));
                i._renderContent(r, t, o);
            }
          });
        }).fail(function () {
          i._contentChanges = [];
        });
      };
      _._createEmptyRow = function (e, t, n) {
        var i;
        var o = this._createRow();
        var a = t ? this.getFixedColumns() : this.getColumns();
        o.addClass(e).toggleClass("dx-column-lines", this.option("showColumnLines"));
        for (var r = 0; r < a.length; r++) {
          i = this._createCell({
            column: a[r],
            rowType: "freeSpace",
            columnIndex: r,
            columns: a
          });
          if ((0, f.isNumeric)(n)) {
            i.css("height", n);
          }
          o.append(i);
        }
        this.setAria("role", "presentation", o);
        return o;
      };
      _.getFixedColumns = function () {
        throw new Error("Method not implemented.");
      };
      _._appendEmptyRow = function (e, t, n) {
        var i = this._getBodies(e);
        var o = !i.length || t.is("tbody");
        var a = o ? e : i;
        if (n === "top") {
          a.first().prepend(t);
          if (o) {
            var r = a.children("colgroup");
            a.prepend(r);
          }
        } else {
          a.last().append(t);
        }
      };
      _._renderFreeSpaceRow = function (e, t) {
        var n = this._createEmptyRow("dx-freespace-row");
        n = this._wrapRowIfNeed(e, n, (t == null ? undefined : t.changeType) === "refresh");
        this._appendEmptyRow(e, n);
      };
      _._checkRowKeys = function (e) {
        var t = this;
        var n = t._getRows(e);
        var i = t._dataController.store() && t._dataController.store().key();
        if (i) {
          n.some(function (e) {
            if (e.rowType === "data" && e.key === undefined) {
              t._dataController.fireError("E1046", i);
              return true;
            }
          });
        }
      };
      _._needUpdateRowHeight = function (e) {
        return e > 0 && !this._rowHeight;
      };
      _._getRowsHeight = function (e) {
        return (e = e || this._tableElement).children("tbody").children().not(".dx-virtual-row").not(`.dx-freespace-row`).toArray().reduce(function (e, t) {
          return e + (0, u.getBoundingRect)(t).height;
        }, 0);
      };
      _._updateRowHeight = function () {
        var e = this.getTableElement();
        var t = this._dataController.items().length;
        if (e && this._needUpdateRowHeight(t)) {
          var n = this._getRowsHeight(e);
          this._rowHeight = n / t;
        }
      };
      _._findContentElement = function (e) {
        var t = this.element();
        var n = this.getScrollable();
        if (t) {
          if (n) {
            t = (0, i.default)(n.content());
          }
          return t.children().first();
        }
      };
      _._getRowElements = function (t) {
        var n = e.prototype._getRowElements.call(this, t);
        return n && n.not(`.dx-freespace-row`);
      };
      _._getFreeSpaceRowElements = function (e) {
        var t = e || this.getTableElements();
        return t && t.children("tbody").children(`.dx-freespace-row`);
      };
      _._getNoDataText = function () {
        return this.option("noDataText");
      };
      _._rowClick = function (e) {
        var t = this._dataController.items()[e.rowIndex] || {};
        this.executeAction("onRowClick", (0, s.extend)({
          evaluate: function (e) {
            return (0, r.compileGetter)(e)(t.data);
          }
        }, e, t));
      };
      _._rowDblClick = function (e) {
        var t = this._dataController.items()[e.rowIndex] || {};
        this.executeAction("onRowDblClick", (0, s.extend)({}, e, t));
      };
      _._getColumnsCountBeforeGroups = function (e) {
        for (var t = 0; t < e.length; t++) {
          if (e[t].type === "groupExpand") {
            return t;
          }
        }
        return 0;
      };
      _._getGroupCellOptions = function (e) {
        var t = this._getColumnsCountBeforeGroups(e.columns);
        var n = (e.row.groupIndex || 0) + t;
        return {
          columnIndex: n,
          colspan: e.columns.length - n - 1
        };
      };
      _._needWrapRow = function () {
        return e.prototype._needWrapRow.apply(this, arguments) || !!this.option("dataRowTemplate");
      };
      _._renderCells = function (t, n) {
        if (n.row.rowType === "group") {
          this._renderGroupedCells(t, n);
        } else if (n.row.values) {
          e.prototype._renderCells.call(this, t, n);
        }
      };
      _._renderGroupedCells = function (e, t) {
        var n;
        var i;
        var o = t.row;
        var a = t.columns;
        var r = o.rowIndex;
        for (var l = this._getGroupCellOptions(t), d = 0; d <= l.columnIndex; d++) {
          if (d === l.columnIndex && a[d].allowCollapsing && t.scrollingMode !== "infinite") {
            i = !!o.isExpanded;
            n = a[d];
          } else {
            i = null;
            n = {
              command: "expand",
              cssClass: a[d].cssClass
            };
          }
          if (this._needRenderCell(d, t.columnIndices)) {
            this._renderCell(e, {
              value: i,
              row: o,
              rowIndex: r,
              column: n,
              columnIndex: d,
              columnIndices: t.columnIndices,
              change: t.change
            });
          }
        }
        var c = (0, u.getDefaultAlignment)(this.option("rtlEnabled"));
        var h = (0, s.extend)({}, a[l.columnIndex], {
          command: null,
          type: null,
          cssClass: null,
          width: null,
          showWhenGrouped: false,
          alignment: c
        });
        if (l.colspan > 1) {
          h.colspan = l.colspan;
        }
        if (this._needRenderCell(l.columnIndex + 1, t.columnIndices)) {
          this._renderCell(e, {
            value: o.values[o.groupIndex],
            row: o,
            rowIndex: r,
            column: h,
            columnIndex: l.columnIndex + 1,
            columnIndices: t.columnIndices,
            change: t.change
          });
        }
      };
      _._renderRows = function (t, n) {
        var i = this.option("scrolling.mode");
        e.prototype._renderRows.call(this, t, (0, s.extend)({
          scrollingMode: i
        }, n));
        this._checkRowKeys(n.change);
        this._renderFreeSpaceRow(t, n.change);
        if (!this._hasHeight) {
          this.updateFreeSpaceRowHeight(t);
        }
      };
      _._renderDataRowByTemplate = function (e, t, n) {
        var i = t.row;
        var o = (0, s.extend)({
          columns: t.columns
        }, i);
        var a = this._createRow(i, "tbody");
        a.appendTo(e);
        this.renderTemplate(a, n, o, true, t.change);
        this._rowPrepared(a, o, t.row);
      };
      _._renderRow = function (t, n) {
        var i = n.row;
        var o = this.option().rowTemplate;
        var a = this.option("dataRowTemplate");
        if (i.rowType === "data" && a) {
          this._renderDataRowByTemplate(t, n, a);
        } else if (i.rowType !== "data" && i.rowType !== "group" || (0, f.isDefined)(i.groupIndex) || !o) {
          e.prototype._renderRow.call(this, t, n);
        } else {
          this.renderTemplate(t, o, (0, s.extend)({
            columns: n.columns
          }, i), true);
        }
      };
      _._renderTable = function (t) {
        var n = this;
        var i = e.prototype._renderTable.call(this, t);
        if ((0, f.isDefined)(n.getTableElement())) {
          n._renderScrollable();
        } else {
          n.setTableElement(i);
          n._renderScrollable(true);
          n.resizeCompleted.add(function e() {
            var t = n.getScrollable();
            if (t && n.element().closest((0, p.getWindow)().document).length) {
              n.resizeCompleted.remove(e);
              t._visibilityChanged(true);
            }
          });
        }
        return i;
      };
      _._createTable = function () {
        var t = e.prototype._createTable.apply(this, arguments);
        if (this.option().rowTemplate || this.option().dataRowTemplate) {
          t.appendTo(this.component.$element());
        }
        return t;
      };
      _._renderCore = function (t) {
        var n = this.element();
        n.addClass(this.addWidgetPrefix("rowsview")).toggleClass(this.addWidgetPrefix("nowrap"), !this.option("wordWrapEnabled"));
        n.toggleClass("dx-empty", this._dataController.isEmpty());
        this.setAria("role", "presentation", n);
        var i = this._renderTable({
          change: t
        });
        var o = this._updateContent(i, t);
        e.prototype._renderCore.call(this, t);
        this._lastColumnWidths = null;
        return o;
      };
      _._getRows = function (e) {
        return e && e.items || this._dataController.items();
      };
      _._getCellOptions = function (t) {
        var n = t.column;
        var i = t.row;
        var o = i.data;
        var a = i && i.summaryCells;
        var r = t.value;
        var s = y.default.getDisplayValue(n, r, o, i.rowType);
        var l = e.prototype._getCellOptions.call(this, t);
        l.value = r;
        l.oldValue = t.oldValue;
        l.displayValue = s;
        l.row = i;
        l.key = i.key;
        l.data = o;
        l.rowType = i.rowType;
        l.values = i.values;
        l.text = n.command ? "" : y.default.formatValue(s, n);
        l.rowIndex = i.rowIndex;
        l.summaryItems = a && a[t.columnIndex];
        l.resized = n.resizedCallbacks;
        if ((0, f.isDefined)(n.groupIndex) && !n.command) {
          var u = this.option("grouping.texts");
          var d = this.option("scrolling.mode");
          if (d !== "virtual" && d !== "infinite") {
            l.groupContinuesMessage = o && o.isContinuationOnNextPage && u && u.groupContinuesMessage;
            l.groupContinuedMessage = o && o.isContinuation && u && u.groupContinuedMessage;
          }
        }
        return l;
      };
      _._setRowsOpacityCore = function (e, t, n, o) {
        var a = this._columnsController;
        var r = a.getColumns();
        var s = r && r[n];
        var u = s && s.isBand && s.index;
        (0, l.each)(e, function (r, s) {
          if (!(0, i.default)(s).hasClass("dx-group-row")) {
            for (var l = 0; l < t.length && ((!(0, f.isNumeric)(u) || !a.isParentBandColumn(t[l].index, u)) && t[l].index !== n || (e.eq(r).children().eq(l).css({
              opacity: o
            }), (0, f.isNumeric)(u))); l++);
          }
        });
      };
      _._getDevicePixelRatio = function () {
        return (0, p.getWindow)().devicePixelRatio;
      };
      _.renderNoDataText = function () {
        return y.default.renderNoDataText.apply(this, arguments);
      };
      _.getCellOptions = function (e, t) {
        var n;
        var i;
        var o = this._dataController.items()[e];
        if (o && (i = (0, f.isString)(t) ? this._columnsController.columnOption(t) : this._columnsController.getVisibleColumns()[t])) {
          n = this._getCellOptions({
            value: i.calculateCellValue(o.data),
            rowIndex: o.rowIndex,
            row: o,
            column: i
          });
        }
        return n;
      };
      _.getRow = function (e) {
        if (e >= 0) {
          var t = this._getRowElements();
          if (t.length > e) {
            return (0, i.default)(t[e]);
          }
        }
      };
      _.updateFreeSpaceRowHeight = function (e) {
        var t = this;
        var n = this._dataController;
        var i = n.items(true).length;
        var o = this._findContentElement();
        var r = this._getFreeSpaceRowElements(e);
        if (r && o && n.totalCount() >= 0) {
          var s = false;
          if (i > 0) {
            if (this._hasHeight) {
              r.hide();
              (0, a.deferUpdate)(function () {
                var n = t.getScrollbarWidth(true);
                var i = (0, d.getHeight)(t.element()) - n;
                var l = i - (0, d.getOuterHeight)(o) > 0;
                var u = t._getRowsHeight(o.children().first());
                var c = e || t.getTableElements();
                var h = i - u - Math.ceil(parseFloat(c.css("borderTopWidth"))) - t._getHeightCorrection();
                if (l) {
                  (0, a.deferRender)(function () {
                    r.css("height", h);
                    s = true;
                    r.show();
                  });
                }
                (0, a.deferRender)(function () {
                  return t._updateLastRowBorder(s);
                });
              });
            } else {
              var l = n.pageSize() - i;
              var u = this.option("scrolling.mode");
              if (l > 0 && n.pageCount() > 1 && u !== "virtual" && u !== "infinite") {
                (0, h.setHeight)(r, l * this._rowHeight);
                s = true;
              }
              if (!s && e) {
                (0, h.setHeight)(r, 0);
              } else {
                r.toggle(s);
              }
              this._updateLastRowBorder(s);
            }
          } else {
            r.css("height", 0);
            r.show();
            this._updateLastRowBorder(true);
          }
        }
      };
      _._getHeightCorrection = function () {
        var e = o.default.webkit && this._getDevicePixelRatio() >= 2;
        var t = o.default.chrome && o.default.version >= 91;
        var n = o.default.mozilla && o.default.version >= 70 && !this.option("showRowLines");
        if (e || n || t) {
          return 1;
        } else {
          return 0;
        }
      };
      _._columnOptionChanged = function (t) {
        var n = t.optionNames;
        if (!t.changeTypes.grouping) {
          if (n.width || n.visibleWidth) {
            e.prototype._columnOptionChanged.call(this, t);
            this._fireColumnResizedCallbacks();
          }
        }
      };
      _.getScrollable = function () {
        return this._scrollable;
      };
      _.init = function () {
        var t = this;
        var n = this;
        var i = n.getController("data");
        e.prototype.init.call(this);
        n._editorFactoryController = n.getController("editorFactory");
        n._rowHeight = 0;
        n._scrollTop = 0;
        n._scrollLeft = -1;
        n._scrollRight = 0;
        n._hasHeight = false;
        n._contentChanges = [];
        i.loadingChanged.add(function (e, t) {
          n.setLoading(e, t);
        });
        i.dataSourceChanged.add(function () {
          if (t._scrollLeft >= 0 && !t._dataController.isLoading()) {
            t._handleScroll({
              component: t.getScrollable(),
              forceUpdateScrollPosition: true,
              scrollOffset: {
                top: t._scrollTop,
                left: t._scrollLeft
              }
            });
          }
        });
      };
      _._handleDataChanged = function (e) {
        switch (e.changeType) {
          case "refresh":
          case "prepend":
          case "append":
          case "update":
            this.render(null, e);
            break;
          default:
            this._update(e);
        }
      };
      _.publicMethods = function () {
        return ["isScrollbarVisible", "getTopVisibleRowData", "getScrollbarWidth", "getCellElement", "getRowElement", "getScrollable"];
      };
      _.contentWidth = function () {
        return (0, d.getWidth)(this.element()) - this.getScrollbarWidth();
      };
      _.getScrollbarWidth = function (e) {
        var t;
        var n = this._scrollableContainer && this._scrollableContainer.get(0);
        var o = 0;
        if (n) {
          if (e) {
            o = n.clientHeight ? n.offsetHeight - n.clientHeight : 0;
            o += (t = this.getScrollable()) ? Math.ceil(parseFloat((0, i.default)(t.content()).css("paddingBottom"))) : 0;
          } else {
            o = n.clientWidth ? n.offsetWidth - n.clientWidth : 0;
          }
        }
        if (o > 0) {
          return o;
        } else {
          return 0;
        }
      };
      _._fireColumnResizedCallbacks = function () {
        var e = this._lastColumnWidths || [];
        var t = [];
        for (var n = this.getColumns(), i = 0; i < n.length; i++) {
          t[i] = n[i].visibleWidth;
          if (n[i].resizedCallbacks && !(0, f.isDefined)(n[i].groupIndex) && e[i] !== t[i]) {
            n[i].resizedCallbacks.fire(t[i]);
          }
        }
        this._lastColumnWidths = t;
      };
      _._updateLastRowBorder = function (e) {
        if (this.option("showBorders") && this.option("showRowLines") && !e) {
          this.element().addClass("dx-last-row-border");
        } else {
          this.element().removeClass("dx-last-row-border");
        }
      };
      _._updateScrollable = function () {
        var e = v.default.getInstance(this.element());
        if (e) {
          e.update();
          if (!!e.option("useNative") || !(e == null ? undefined : e.isRenovated())) {
            this._updateHorizontalScrollPosition();
          }
        }
      };
      _._updateHorizontalScrollPosition = function () {
        var e = this.getScrollable();
        var t = e && e.scrollOffset().left;
        if (this.option("rtlEnabled")) {
          var n = S(e);
          if (n - t !== this._scrollRight) {
            this._scrollLeft = n - this._scrollRight;
          }
        }
        if (this._scrollLeft >= 0 && t !== this._scrollLeft) {
          e.scrollTo({
            x: this._scrollLeft
          });
        }
      };
      _._resizeCore = function () {
        var e = this;
        e._fireColumnResizedCallbacks();
        e._updateRowHeight();
        (0, a.deferRender)(function () {
          e._renderScrollable();
          e.renderNoDataText();
          e.updateFreeSpaceRowHeight();
          (0, a.deferUpdate)(function () {
            e._updateScrollable();
          });
        });
      };
      _.scrollTo = function (e) {
        var t = this.element();
        var n = t && v.default.getInstance(t);
        if (n) {
          n.scrollTo(e);
        }
      };
      _.height = function (e) {
        var t = this;
        var n = this.element();
        if (arguments.length === 0) {
          if (n) {
            return (0, d.getOuterHeight)(n, true);
          } else {
            return 0;
          }
        }
        if ((0, f.isDefined)(e) && n) {
          t.hasHeight(e !== "auto");
          (0, h.setHeight)(n, e);
        }
      };
      _.hasHeight = function (e) {
        if (arguments.length === 0) {
          return !!this._hasHeight;
        }
        this._hasHeight = e;
      };
      _.setLoading = function (e, t) {
        var n = this._loadPanel;
        var i = this._dataController;
        var o = this.option("loadPanel") || {};
        var a = i.isLoaded() ? o.animation : null;
        var r = this.element();
        if ((0, p.hasWindow)() && (!n && t !== undefined && i.isLocalStore() && o.enabled === "auto" && r && (this._renderLoadPanel(r, r.parent()), n = this._loadPanel), n)) {
          var s = {
            message: t || o.text,
            animation: a,
            visible: e
          };
          if (e) {
            s.position = y.default.calculateLoadPanelPosition(r);
          }
          clearTimeout(this._hideLoadingTimeoutID);
          if (n.option("visible") && !e) {
            this._hideLoadingTimeoutID = setTimeout(function () {
              n.option(s);
            }, 200);
          } else {
            n.option(s);
          }
        }
      };
      _.setRowsOpacity = function (e, t) {
        var n = this._getRowElements().not(`.dx-group-row`) || [];
        this._setRowsOpacityCore(n, this.getColumns(), e, t);
      };
      _._getCellElementsCore = function (t) {
        var n = e.prototype._getCellElementsCore.apply(this, arguments);
        if (n) {
          var i = n.filter(`.dx-group-cell`).index();
          if (i >= 0 && n.length > i + 1) {
            return n.slice(0, i + 1);
          }
        }
        return n;
      };
      _._getBoundaryVisibleItemIndex = function (e, t) {
        var n = 0;
        var o = 0;
        var a = 0;
        var r = this._scrollTop;
        var s = this._findContentElement();
        var l = s && s.offset().top;
        var u = this.getController("data").items();
        var c = this.getTableElement();
        if (u.length && c) {
          var h = this._getRowElements(c).filter(":visible");
          if (!e) {
            r += (0, d.getOuterHeight)(this._hasHeight ? this.element() : (0, p.getWindow)());
          }
          for (n = 0; n < u.length; n++) {
            o = a;
            var f = (0, i.default)(h).eq(n);
            if (f.length && (a = f.offset(), (a = (e ? a.top : a.top + (0, d.getOuterHeight)(f)) - l) > r)) {
              if (n && (t || r * 2 < Math.round(a + o))) {
                n--;
              }
              break;
            }
          }
          if (n && n === u.length) {
            n--;
          }
        }
        return n;
      };
      _.getTopVisibleItemIndex = function (e) {
        return this._getBoundaryVisibleItemIndex(true, e);
      };
      _.getBottomVisibleItemIndex = function (e) {
        return this._getBoundaryVisibleItemIndex(false, e);
      };
      _.getTopVisibleRowData = function () {
        var e = this.getTopVisibleItemIndex();
        var t = this._dataController.items();
        if (t[e]) {
          return t[e].data;
        }
      };
      _._scrollToElement = function (e, t) {
        var n = this.getScrollable();
        if (n) {
          n.scrollToElement(e, t);
        }
      };
      _.optionChanged = function (t) {
        e.prototype.optionChanged.call(this, t);
        switch (t.name) {
          case "wordWrapEnabled":
          case "showColumnLines":
          case "showRowLines":
          case "rowAlternationEnabled":
          case "rowTemplate":
          case "dataRowTemplate":
          case "twoWayBindingEnabled":
            this._invalidate(true, true);
            t.handled = true;
            break;
          case "scrolling":
            this._rowHeight = null;
            this._tableElement = null;
            t.handled = true;
            break;
          case "rtlEnabled":
            this._rowHeight = null;
            this._tableElement = null;
            break;
          case "loadPanel":
            this._tableElement = null;
            this._invalidate(true, t.fullName !== "loadPanel.enabled");
            t.handled = true;
            break;
          case "noDataText":
            this.renderNoDataText();
            t.handled = true;
        }
      };
      _.dispose = function () {
        e.prototype.dispose.call(this);
        clearTimeout(this._hideLoadingTimeoutID);
        if (this._scrollable) {
          this._scrollable.dispose();
        }
      };
      _.setScrollerSpacing = function () {};
      _._restoreErrorRow = function () {};
      return c;
    }(b.ColumnsView)
  }
};
exports.rowsModule = I;