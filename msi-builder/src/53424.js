Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.columnFixingModule = undefined;
var i = require("./31648.js");
var o = m(require("./68374.js"));
var a = m(require("./47810.js"));
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./37518.js");
var u = require("./58664.js");
var d = require("./35922.js");
var c = m(require("./55994.js"));
var h = require("./765.js");
var f = m(require("./28109.js"));
var p = m(require("./41183.js"));
var g = m(require("./60082.js"));
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function _(e) {
  var t = -1;
  (0, s.each)(e, function (e, n) {
    if (n.command === "transparent") {
      t = e;
      return false;
    }
  });
  return t;
}
function v(e, t, n) {
  var i = 0;
  if (e && t && n) {
    for (var o = 0; o < e.length; o++) {
      if (e[o].command === "transparent") {
        i += e[o].colspan;
      } else {
        if (t[i] < n[o]) {
          t[i] = n[o];
        }
        i++;
      }
    }
  }
  return t;
}
var y = {
  init: function () {
    this.callBase();
    this._isFixedTableRendering = false;
    this._isFixedColumns = false;
  },
  _createCol: function (e) {
    return this.callBase(e).toggleClass("dx-col-fixed", !!this._isFixedTableRendering && (!!e.fixed || !!e.command && e.command !== "transparent"));
  },
  _correctColumnIndicesForFixedColumns: function (e, t) {
    var n = _(e);
    var i = e[n].colspan;
    var o = t && t.columnIndices;
    if (o) {
      t.columnIndices = o.map(function (e) {
        if (e) {
          return e.map(function (e) {
            if (e < n) {
              return e;
            } else if (e >= n + i) {
              return e - i + 1;
            } else {
              return -1;
            }
          }).filter(function (e) {
            return e >= 0;
          });
        }
      });
    }
  },
  _partialUpdateFixedTable: function (e) {
    var t = this._fixedTableElement;
    var n = this._getRowElementsCore(t);
    t.children("colgroup").replaceWith(this._createColGroup(e));
    for (var i = 0; i < n.length; i++) {
      this._partialUpdateFixedRow((0, o.default)(n[i]), e);
    }
  },
  _partialUpdateFixedRow: function (e, t) {
    var i;
    var o = e.get(0).childNodes;
    var a = _(t);
    var r = t[a];
    var s = this._columnsController.getColumnIndexOffset() + 1;
    var l = r.colspan;
    if (e.hasClass("dx-master-detail-row")) {
      o[0].setAttribute("colspan", this._columnsController.getVisibleColumns()?.length);
    } else {
      if (e.hasClass("dx-group-row")) {
        l = (i = this._getGroupCellOptions({
          row: e.data("options"),
          columns: this._columnsController.getVisibleColumns()
        })).colspan - Math.max(0, o.length - (i.columnIndex + 2));
      }
      for (var u = 0; u < o.length; u++) {
        var d = i ? u === i.columnIndex + 1 : u === a;
        o[u].setAttribute("aria-colindex", s);
        if (d) {
          o[u].setAttribute("colspan", l);
          s += l;
        } else {
          s++;
        }
      }
    }
  },
  _renderTable: function (e) {
    var t;
    var n = this.getFixedColumns();
    this._isFixedColumns = !!n.length;
    var i = this.callBase(e);
    if (this._isFixedColumns) {
      var o = e == null ? undefined : e.change;
      this._isFixedTableRendering = true;
      if ((o == null ? undefined : o.virtualColumnsScrolling) && this.option("scrolling.legacyMode") !== true) {
        this._partialUpdateFixedTable(n);
        this._isFixedTableRendering = false;
      } else {
        var a = o == null ? undefined : o.columnIndices;
        this._correctColumnIndicesForFixedColumns(n, o);
        t = this._createTable(n);
        this._renderRows(t, (0, r.extend)({}, e, {
          columns: n
        }));
        this._updateContent(t, o, true);
        if (a) {
          o.columnIndices = a;
        }
        this._isFixedTableRendering = false;
      }
    } else {
      if (this._fixedTableElement) {
        this._fixedTableElement.parent().remove();
      }
      this._fixedTableElement = null;
    }
    return i;
  },
  _renderRow: function (e, t) {
    var n;
    var i = t.row.cells;
    this.callBase.apply(this, arguments);
    if (this._isFixedTableRendering && i && i.length) {
      n = 0;
      var o = t.row.cells || [];
      i = i.slice();
      t.row.cells = i;
      for (var a = 0; a < o.length; a++) {
        if (o[a].column && o[a].column.command === "transparent") {
          n = (o[a].column.colspan || 1) - 1;
        } else {
          i[a + n] = o[a];
        }
      }
    }
  },
  _createCell: function (e) {
    var t;
    var n;
    var i;
    var o = this;
    var r = e.column;
    var s = r && r.command;
    var l = e.rowType;
    var u = o.callBase.apply(o, arguments);
    if (o._isFixedTableRendering || l === "filter") {
      n = (t = o.getFixedColumns())[(i = _(t)) - 1];
    }
    if (o._isFixedTableRendering) {
      if (s === "transparent") {
        u.addClass("dx-pointer-events-none").toggleClass("dx-first-cell", i === 0 || n && n.command === "expand").toggleClass("dx-last-cell", t.length && i === t.length - 1);
        if (l !== "freeSpace") {
          g.default.setEmptyText(u);
        }
      }
    } else if (l === "filter") {
      u.toggleClass("dx-first-cell", e.columnIndex === i);
    }
    var d = o.option("rowAlternationEnabled") && e.isAltRow;
    var c = o.option("selection.mode") === "multiple" && e.columnIndex === 0 && e.rowType === "header";
    if (a.default.mozilla && e.column.fixed && e.rowType !== "group" && !d && !c) {
      u.addClass("dx-col-fixed");
    }
    return u;
  },
  _getContent: function (e) {
    var t;
    if (e) {
      if ((t = this._fixedTableElement) === null || t === undefined) {
        return undefined;
      } else {
        return t.parent();
      }
    } else {
      return this.callBase.apply(this, arguments);
    }
  },
  _wrapTableInScrollContainer: function (e, t) {
    var n = this.callBase.apply(this, arguments);
    if (this._isFixedTableRendering || t) {
      n.addClass(this.addWidgetPrefix("content-fixed"));
    }
    return n;
  },
  _renderCellContent: function (e, t) {
    var n;
    var i = t.column;
    var o = this._isFixedTableRendering;
    var a = t.rowType === "group" && (0, d.isDefined)(i.groupIndex);
    if (o && a && !i.command && !i.groupCellTemplate) {
      e.css("pointerEvents", "none");
    }
    if (!o && this._isFixedColumns) {
      n = i.fixed || i.command && i.fixed !== false;
      if (a && (n = false, t.row.summaryCells && t.row.summaryCells.length)) {
        var r = this._columnsController.getVisibleColumns();
        var s = this._getAlignByColumnCellCount ? this._getAlignByColumnCellCount(i.colspan, {
          columns: r,
          row: t.row,
          isFixed: true
        }) : 0;
        if (s > 0) {
          var l = _(this._columnsController.getFixedColumns());
          n = r.length - s < l;
        }
      }
      if (n) {
        if (i.command && i.type !== "buttons" || t.rowType === "group") {
          e.html("&nbsp;").addClass(i.cssClass);
          return;
        }
        e.addClass("dx-hidden-cell");
      }
    }
    if (i.command !== "transparent") {
      this.callBase.apply(this, arguments);
    }
  },
  _getCellElementsCore: function (e) {
    var t = this;
    var n = this.callBase.apply(this, arguments);
    var i = n == null ? undefined : n.parent().hasClass("dx-group-row");
    var o = this.name === "columnHeadersView" ? e : undefined;
    if (this._fixedTableElement && n) {
      var a = this.getFixedColumns(o);
      var r = this._getRowElements(this._fixedTableElement).eq(e).children("td");
      (0, s.each)(r, function (e, s) {
        if (i) {
          if (n[e] && s.style.visibility !== "hidden") {
            n[e] = s;
          }
        } else {
          var l = a[e];
          if (l) {
            if (l.command === "transparent") {
              if (r.eq(e).hasClass("dx-master-detail-cell")) {
                n[e] = s || n[e];
              }
            } else {
              var u = t._columnsController.getVisibleIndexByColumn(l, o);
              n[u] = s || n[u];
            }
          }
        }
      });
    }
    return n;
  },
  getColumnWidths: function () {
    var e = this.callBase();
    var t = this.getFixedColumns();
    var n = this._fixedTableElement && e.length ? this.callBase(this._fixedTableElement) : undefined;
    return v(t, e, n);
  },
  getTableElement: function (e) {
    if (e = this._isFixedTableRendering || e) {
      return this._fixedTableElement;
    } else {
      return this.callBase();
    }
  },
  setTableElement: function (e, t) {
    if (this._isFixedTableRendering || t) {
      this._fixedTableElement = e.addClass("dx-pointer-events-none");
    } else {
      this.callBase(e);
    }
  },
  getColumns: function (e, t) {
    t = t || this.getTableElement();
    if (this._isFixedTableRendering || t && t.closest("table").parent(`.${this.addWidgetPrefix("content-fixed")}`).length) {
      return this.getFixedColumns(e);
    } else {
      return this.callBase(e, t);
    }
  },
  getRowIndex: function (e) {
    var t = this._fixedTableElement;
    if (t && t.find(e).length) {
      return this._getRowElements(t).index(e);
    } else {
      return this.callBase(e);
    }
  },
  getTableElements: function () {
    var e = this.callBase.apply(this, arguments);
    if (this._fixedTableElement) {
      e = (0, o.default)([e.get(0), this._fixedTableElement.get(0)]);
    }
    return e;
  },
  getFixedColumns: function (e) {
    return this._columnsController.getFixedColumns(e);
  },
  getFixedColumnsOffset: function () {
    var e;
    var t = {
      left: 0,
      right: 0
    };
    if (this._fixedTableElement) {
      var n = (e = this.getTransparentColumnElement()).position();
      t = {
        left: n.left,
        right: (0, u.getOuterWidth)(this.element(), true) - ((0, u.getOuterWidth)(e, true) + n.left)
      };
    }
    return t;
  },
  getTransparentColumnElement: function () {
    return this._fixedTableElement && this._fixedTableElement.find(`.dx-pointer-events-none`).first();
  },
  getFixedTableElement: function () {
    return this._fixedTableElement;
  },
  isFixedColumns: function () {
    return this._isFixedColumns;
  },
  _resizeCore: function () {
    this.callBase();
    this.synchronizeRows();
  },
  setColumnWidths: function (e) {
    var t;
    var n = this._columnsController.getVisibleColumns();
    var i = e.widths;
    var o = i && i.length && (0, d.isDefined)(n[0].visibleWidth);
    var a = e.optionNames;
    var s = a && a.width;
    this.callBase.apply(this, arguments);
    if (this._fixedTableElement) {
      var l = i && i.some(function (e) {
        return e === "auto";
      });
      if (l && (!o || !this.isScrollbarVisible(true))) {
        t = n;
      }
      this.callBase((0, r.extend)({}, e, {
        $tableElement: this._fixedTableElement,
        columns: t,
        fixed: true
      }));
    }
    if (o || s && this.option("wordWrapEnabled")) {
      this.synchronizeRows();
    }
  },
  _createColGroup: function (e) {
    if (this._isFixedTableRendering && !this.option("columnAutoWidth")) {
      var t = this._columnsController.getVisibleColumns();
      if (t.filter(function (e) {
        return !e.width;
      }).length) {
        e = t;
      }
    }
    return this.callBase(e);
  },
  _getClientHeight: function (e) {
    var t = e.getBoundingClientRect && (0, l.getBoundingRect)(e);
    if (t && t.height) {
      return t.height;
    } else {
      return e.clientHeight;
    }
  },
  synchronizeRows: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this;
    var a = [];
    var r = [];
    this.waitAsyncTemplates(true).done(function () {
      if (o._isFixedColumns && o._tableElement && o._fixedTableElement) {
        var s = o._getClientHeight(o._tableElement.get(0));
        var l = o._getClientHeight(o._fixedTableElement.get(0));
        t = o._getRowElements(o._tableElement);
        n = o._getRowElements(o._fixedTableElement);
        i = o._findContentElement();
        if (s !== l) {
          if (i) {
            i.css("height", s);
          }
          t.css("height", "");
          n.css("height", "");
          e = 0;
          for (; e < t.length; e++) {
            a.push(o._getClientHeight(t.get(e)));
            r.push(o._getClientHeight(n.get(e)));
          }
          for (e = 0; e < t.length; e++) {
            var u = a[e];
            var d = r[e];
            if (u > d) {
              n.eq(e).css("height", u);
            } else if (u < d) {
              t.eq(e).css("height", d);
            }
          }
          if (i) {
            i.css("height", "");
          }
        }
      }
    });
  },
  setScrollerSpacing: function (e) {
    var t = this.option("rtlEnabled");
    this.callBase(e);
    this.element().children(`.${this.addWidgetPrefix("content-fixed")}`).css({
      paddingLeft: t ? e : "",
      paddingRight: t ? "" : e
    });
  }
};
var b = {
  defaultOptions: function () {
    return {
      columnFixing: {
        enabled: false,
        texts: {
          fix: f.default.format("dxDataGrid-columnFixingFix"),
          unfix: f.default.format("dxDataGrid-columnFixingUnfix"),
          leftPosition: f.default.format("dxDataGrid-columnFixingLeftPosition"),
          rightPosition: f.default.format("dxDataGrid-columnFixingRightPosition")
        }
      }
    };
  },
  extenders: {
    views: {
      columnHeadersView: (0, r.extend)({}, y, {
        _getRowVisibleColumns: function (e) {
          if (this._isFixedTableRendering) {
            return this.getFixedColumns(e);
          } else {
            return this.callBase(e);
          }
        },
        getContextMenuItems: function (e) {
          var t = this;
          var n = e.column;
          var i = this.option("columnFixing");
          var o = this.callBase(e);
          if (e.row && e.row.rowType === "header" && i.enabled === true && n && n.allowFixing) {
            function a(e) {
              switch (e.itemData.value) {
                case "none":
                  t._columnsController.columnOption(n.index, "fixed", false);
                  break;
                case "left":
                  t._columnsController.columnOption(n.index, {
                    fixed: true,
                    fixedPosition: "left"
                  });
                  break;
                case "right":
                  t._columnsController.columnOption(n.index, {
                    fixed: true,
                    fixedPosition: "right"
                  });
              }
            }
            (o = o || []).push({
              text: i.texts.fix,
              beginGroup: true,
              items: [{
                text: i.texts.leftPosition,
                value: "left",
                disabled: n.fixed && (!n.fixedPosition || n.fixedPosition === "left"),
                onItemClick: a
              }, {
                text: i.texts.rightPosition,
                value: "right",
                disabled: n.fixed && n.fixedPosition === "right",
                onItemClick: a
              }]
            }, {
              text: i.texts.unfix,
              value: "none",
              disabled: !n.fixed,
              onItemClick: a
            });
          }
          return o;
        },
        getFixedColumnElements: function (e) {
          if ((0, d.isDefined)(e)) {
            return this._fixedTableElement && this._getRowElements(this._fixedTableElement).eq(e).children();
          }
          var t = this.getColumnElements();
          var n = this.getTransparentColumnElement();
          if (t && n && n.length) {
            var i = _(this.getFixedColumns());
            t.splice(i, n.get(0).colSpan, n.get(0));
          }
          return t;
        },
        getColumnWidths: function () {
          var e;
          var t = this.callBase();
          var n = this.getFixedColumnElements();
          var i = this.getFixedColumns();
          if (this._fixedTableElement) {
            e = n && n.length ? this._getWidths(n) : this.callBase(this._fixedTableElement);
          }
          return v(i, t, e);
        }
      }),
      rowsView: (0, r.extend)({}, y, {
        _detachHoverEvents: function () {
          if (this._fixedTableElement) {
            c.default.off(this._fixedTableElement, "mouseover mouseout", ".dx-data-row");
          }
          if (this._tableElement) {
            c.default.off(this._tableElement, "mouseover mouseout", ".dx-data-row");
          }
        },
        _attachHoverEvents: function () {
          var e = this;
          function t(t) {
            c.default.on(t, "mouseover mouseout", ".dx-data-row", e.createAction(function (t) {
              var n = t.event;
              var i = e.getRowIndex((0, o.default)(n.target).closest(".dx-row"));
              var a = n.type === "mouseover";
              if (i >= 0) {
                if (e._tableElement) {
                  e._getRowElements(e._tableElement).eq(i).toggleClass("dx-state-hover", a);
                }
                if (e._fixedTableElement) {
                  e._getRowElements(e._fixedTableElement).eq(i).toggleClass("dx-state-hover", a);
                }
              }
            }));
          }
          if (e._fixedTableElement && e._tableElement) {
            t(e._fixedTableElement);
            t(e._tableElement);
          }
        },
        _getScrollDelay: function () {
          var e;
          if ((e = this.getController("resizing")) === null || e === undefined ? undefined : e.hasResizeTimeout()) {
            return this.option("scrolling.updateTimeout");
          } else if (a.default.mozilla) {
            return 60;
          } else {
            return 0;
          }
        },
        _findContentElement: function (e) {
          var t;
          var n;
          var i = this;
          var a = this.addWidgetPrefix("content");
          var r = this.element();
          e = this._isFixedTableRendering || e;
          if (r && e) {
            t = r.children(`.${a}`);
            var s = this.getScrollable();
            if (!t.length && s) {
              t = (0, o.default)("<div>").addClass(a);
              c.default.on(t, "scroll", function (e) {
                var t = e.target;
                var a = i._getScrollDelay();
                clearTimeout(i._fixedScrollTimeout);
                i._fixedScrollTimeout = setTimeout(function () {
                  n = (0, o.default)(t).scrollTop();
                  s.scrollTo({
                    y: n
                  });
                }, a);
              });
              c.default.on(t, h.name, function (e) {
                var t = (0, o.default)(e.target).closest(".dx-scrollable");
                var a = false;
                if (s && s.$element().is(t)) {
                  a = true;
                } else {
                  var r = t.length && p.default.getInstance(t.get(0));
                  var l = r && r.scrollHeight() - r.clientHeight() > 0;
                  a = r && !l;
                }
                if (a) {
                  n = s.scrollTop();
                  s.scrollTo({
                    y: n - e.delta
                  });
                  var u = s.scrollTop() + s.clientHeight();
                  var d = s.scrollHeight() + i.getScrollbarWidth();
                  if (s.scrollTop() > 0 && u < d) {
                    return false;
                  }
                }
              });
              t.appendTo(r);
            }
            return t;
          }
          return this.callBase();
        },
        _updateScrollable: function () {
          this.callBase();
          var e = this.getScrollable();
          if (!(e == null ? undefined : e._disposed)) {
            var t = e && e.scrollOffset().top;
            this._updateFixedTablePosition(t);
          }
        },
        _renderContent: function (e, t, n) {
          if (this._isFixedTableRendering || n) {
            return e.empty().addClass(`${this.addWidgetPrefix("content")} ${this.addWidgetPrefix("content-fixed")}`).append(t);
          } else {
            return this.callBase(e, t);
          }
        },
        _getGroupCellOptions: function (e) {
          if (this._isFixedTableRendering) {
            return this.callBase((0, r.extend)({}, e, {
              columns: this._columnsController.getVisibleColumns()
            }));
          } else {
            return this.callBase(e);
          }
        },
        _renderGroupedCells: function (e, t) {
          return this.callBase(e, (0, r.extend)({}, t, {
            columns: this._columnsController.getVisibleColumns()
          }));
        },
        _renderGroupSummaryCells: function (e, t) {
          if (this._isFixedTableRendering) {
            this.callBase(e, (0, r.extend)({}, t, {
              columns: this._columnsController.getVisibleColumns()
            }));
          } else {
            this.callBase(e, t);
          }
        },
        _hasAlignByColumnSummaryItems: function (e, t) {
          var n = this.callBase.apply(this, arguments);
          var i = t.columns[e];
          if (t.isFixed) {
            return i.fixed && (n || i.fixedPosition === "right");
          } else {
            return n && (!this._isFixedColumns || !i.fixed);
          }
        },
        _renderGroupSummaryCellsCore: function (e, t, n, i) {
          var o;
          if (this._isFixedTableRendering) {
            t.isFixed = true;
            o = this._getAlignByColumnCellCount(n, t);
            t.isFixed = false;
            var a = t.columns.length - o;
            t = (0, r.extend)({}, t, {
              columns: this.getFixedColumns()
            });
            var s = _(t.columns);
            if (a < s) {
              o -= t.columns[s].colspan - 1 || 0;
              n -= t.columns[s].colspan - 1 || 0;
            } else if (i > 0) {
              e.css("visibility", "hidden");
            }
            i = o;
          }
          this.callBase(e, t, n, i);
        },
        _getSummaryCellIndex: function (e, t) {
          if (this._isFixedTableRendering) {
            var n = _(t);
            if (e > n) {
              e += t[n].colspan - 1;
            }
            return e;
          }
          return this.callBase.apply(this, arguments);
        },
        _renderCore: function (e) {
          var t = this;
          this._detachHoverEvents();
          var n = this.callBase(e);
          var i = this._isFixedColumns;
          this.element().toggleClass("dx-fixed-columns", i);
          if (this.option("hoverStateEnabled") && i) {
            n.done(function () {
              t._attachHoverEvents();
            });
          }
          return n;
        },
        setRowsOpacity: function (e, t) {
          this.callBase(e, t);
          var n = this._getRowElements(this._fixedTableElement);
          this._setRowsOpacityCore(n, this.getFixedColumns(), e, t);
        },
        optionChanged: function (e) {
          this.callBase(e);
          if (e.name === "hoverStateEnabled" && this._isFixedColumns) {
            if (e.value) {
              this._attachHoverEvents();
            } else {
              this._detachHoverEvents();
            }
          }
        },
        getCellIndex: function (e) {
          var t = this._fixedTableElement;
          var n = 0;
          if (t && e.is("td") && e.closest(t).length) {
            var i = this.getFixedColumns();
            (0, s.each)(i, function (t, i) {
              if (t === e[0].cellIndex) {
                return false;
              }
              if (i.colspan) {
                n += i.colspan;
              } else {
                n++;
              }
            });
            return n;
          }
          return this.callBase.apply(this, arguments);
        },
        _updateFixedTablePosition: function (e, t) {
          if (this._fixedTableElement && this._tableElement) {
            var n;
            var i = this.getController("editorFactory");
            this._fixedTableElement.parent().scrollTop(e);
            if (t && i && (n = i.focus())) {
              i.focus(n);
            }
          }
        },
        setScrollerSpacing: function (e, t) {
          var n = {
            marginBottom: 0
          };
          var i = this.element().children(`.${this.addWidgetPrefix("content-fixed")}`);
          if (i.length && this._fixedTableElement) {
            i.css(n);
            this._fixedTableElement.css(n);
            n[this.option("rtlEnabled") ? "marginLeft" : "marginRight"] = e;
            n.marginBottom = t;
            (this._scrollable && this._scrollable.option("useNative") ? i : this._fixedTableElement).css(n);
          }
        },
        _getElasticScrollTop: function (e) {
          var t = 0;
          if (e.scrollOffset.top < 0) {
            t = -e.scrollOffset.top;
          } else if (e.reachedBottom) {
            var n = (0, o.default)(e.component.content());
            var i = (0, o.default)(e.component.container());
            var a = Math.max(n.get(0).clientHeight - i.get(0).clientHeight, 0);
            t = Math.min(a - e.scrollOffset.top, 0);
          }
          return Math.floor(t);
        },
        _applyElasticScrolling: function (e) {
          if (this._fixedTableElement) {
            var t = this._getElasticScrollTop(e);
            if (Math.ceil(t) !== 0) {
              (0, i.move)(this._fixedTableElement, {
                top: t
              });
            } else {
              this._fixedTableElement.css("transform", "");
            }
          }
        },
        _handleScroll: function (e) {
          this._updateFixedTablePosition(e.scrollOffset.top, true);
          this._applyElasticScrolling(e);
          this.callBase(e);
        },
        _updateContentPosition: function (e) {
          this.callBase.apply(this, arguments);
          if (!e) {
            this._updateFixedTablePosition(this._scrollTop);
          }
        },
        _afterRowPrepared: function (e) {
          if (!this._isFixedTableRendering) {
            this.callBase(e);
          }
        },
        _scrollToElement: function (e) {
          this.callBase(e, this.getFixedColumnsOffset());
        },
        dispose: function () {
          this.callBase.apply(this, arguments);
          clearTimeout(this._fixedScrollTimeout);
        }
      }),
      footerView: y
    },
    controllers: {
      draggingHeader: {
        _generatePointsByColumns: function (e) {
          var t = e.columns;
          var n = e.targetDraggingPanel;
          if (n && n.getName() === "headers" && n.isFixedColumns() && e.sourceColumn.fixed) {
            if (!e.rowIndex) {
              e.columnElements = n.getFixedColumnElements(0);
            }
            e.columns = n.getFixedColumns(e.rowIndex);
            var i = this.callBase(e);
            (function (e, t, n) {
              var i = _(t);
              var o = e.length - t.length;
              (0, s.each)(n, function (e, t) {
                if (t.index > i) {
                  t.columnIndex += o;
                  t.index += o;
                }
              });
            })(t, e.columns, i);
            return i;
          }
          return this.callBase(e);
        },
        _pointCreated: function (e, t, n, i) {
          var o = this.callBase.apply(this, arguments);
          var a = t[e.columnIndex];
          var r = this._columnHeadersView.getTransparentColumnElement();
          if (!o && n === "headers" && r && r.length) {
            var s = (0, l.getBoundingRect)(r.get(0));
            if (i && i.fixed) {
              if (i.fixedPosition === "right") {
                return e.x < s.right;
              } else {
                return e.x > s.left;
              }
            } else {
              return !!a && !!a.fixed && a.fixedPosition !== "right" || e.x < s.left || e.x > s.right;
            }
          }
          return o;
        }
      },
      columnsResizer: {
        _generatePointsByColumns: function () {
          var e = this;
          var t = e._columnsController;
          var n = t && e._columnsController.getVisibleColumns();
          var i = t && e._columnsController.getFixedColumns();
          var o = _(i);
          var a = n.length - i.length;
          var r = e._columnHeadersView.getFixedColumnElements();
          e.callBase();
          if (r && r.length > 0) {
            e._pointsByFixedColumns = g.default.getPointsByColumns(r, function (t) {
              if (t.index > o) {
                t.columnIndex += a;
                t.index += a;
              }
              return e._pointCreated(t, n.length, n);
            });
          }
        },
        _getTargetPoint: function (e, t, n) {
          var i = this._columnHeadersView.getTransparentColumnElement();
          if (i && i.length) {
            var o = (0, l.getBoundingRect)(i.get(0));
            if (t <= o.left || t >= o.right) {
              return this.callBase(this._pointsByFixedColumns, t, n);
            }
          }
          return this.callBase(e, t, n);
        }
      }
    }
  }
};
exports.columnFixingModule = b;