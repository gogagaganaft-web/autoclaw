Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowDraggingModule = undefined;
var i = c(require("./68374.js"));
var o = require("./13306.js");
var a = require("./20576.js");
var r = require("./58664.js");
var s = c(require("./66843.js"));
var l = c(require("./60082.js"));
var u = require("./92794.js");
var d = require("./5172.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = {
  defaultOptions: function () {
    return {
      rowDragging: {
        showDragIcons: true,
        dropFeedbackMode: "indicate",
        allowReordering: false,
        allowDropInsideItem: false
      }
    };
  },
  extenders: {
    views: {
      rowsView: {
        init: function () {
          this.callBase.apply(this, arguments);
          this._updateHandleColumn();
        },
        _allowReordering: function () {
          var e = this.option("rowDragging");
          return !!e && (!!e.allowReordering || !!e.allowDropInsideItem || !!e.group);
        },
        _updateHandleColumn: function () {
          var e = this.option("rowDragging");
          var t = this._allowReordering();
          var n = this._columnsController;
          var i = t && e.showDragIcons;
          if (n) {
            n.addCommandColumn({
              type: "drag",
              command: "drag",
              visibleIndex: -2,
              alignment: "center",
              cssClass: u.CLASSES.commandDrag,
              width: "auto",
              cellTemplate: this._getHandleTemplate(),
              visible: i
            });
          }
          n.columnOption("type:drag", "visible", i);
        },
        _renderContent: function () {
          var e = this;
          var t = this.option("rowDragging");
          var n = this._allowReordering();
          var a = this.callBase.apply(this, arguments);
          var r = this._isFixedTableRendering;
          var l = "_sortable";
          var d = "_sortableFixed";
          var c = r ? d : l;
          var h = r ? l : d;
          function f(t) {
            var n;
            if ((n = e[d]) !== null && n !== undefined) {
              n.$element().css("pointerEvents", t ? "auto" : "");
            }
          }
          var p = ".dx-row:not(.dx-freespace-row):not(.dx-virtual-row):not(.dx-header-row):not(.dx-footer-row)";
          var g = this.option("dataRowTemplate") ? `> table > tbody${p}` : `> table > tbody > ${p}`;
          if ((n || this[c]) && a.length) {
            this[c] = this._createComponent(a, s.default, (0, o.extend)({
              component: this.component,
              contentTemplate: null,
              filter: g,
              cursorOffset: function (t) {
                var n = t.event;
                var o = (0, i.default)(e.element()).offset();
                return {
                  x: n.pageX - o.left
                };
              },
              onDraggableElementShown: function (n) {
                if (!t.dragTemplate) {
                  var o = (0, i.default)(n.dragElement).children(".dx-widget").data(e.component.NAME);
                  e._synchronizeScrollLeftPosition(o);
                }
              },
              dragTemplate: this._getDraggableRowTemplate(),
              handle: t.showDragIcons && `.${u.CLASSES.commandDrag}`,
              dropFeedbackMode: "indicate"
            }, t, {
              onDragStart: function (i) {
                var o;
                var a;
                if ((o = e.getController("keyboardNavigation")) !== null && o !== undefined) {
                  o._resetFocusedCell();
                }
                var r = i.component.getVisibleRows()[i.fromIndex];
                i.itemData = r && r.data;
                var s = r && r.rowType === "data";
                i.cancel = !n || !s;
                if ((a = t.onDragStart) !== null && a !== undefined) {
                  a.call(t, i);
                }
              },
              onDragEnter: function () {
                f(true);
              },
              onDragLeave: function () {
                f(false);
              },
              onDragEnd: function (e) {
                var n;
                f(false);
                if ((n = t.onDragEnd) !== null && n !== undefined) {
                  n.call(t, e);
                }
              },
              onAdd: function (e) {
                var n;
                f(false);
                if ((n = t.onAdd) !== null && n !== undefined) {
                  n.call(t, e);
                }
              },
              dropFeedbackMode: t.dropFeedbackMode,
              onOptionChanged: function (t) {
                if (e[d]) {
                  if (t.name === "fromIndex" || t.name === "toIndex") {
                    e[h].option(t.name, t.value);
                  }
                }
              }
            }));
            a.toggleClass("dx-scrollable-container", r);
            a.toggleClass(u.CLASSES.sortableWithoutHandle, n && !t.showDragIcons);
          }
          return a;
        },
        _renderCore: function (e) {
          var t = this;
          this.callBase.apply(this, arguments);
          if (e && e.changeType === "update" && e.repaintChangesOnly && l.default.isVirtualRowRendering(this)) {
            (0, a.deferUpdate)(function () {
              t._updateSortable();
            });
          }
        },
        _updateSortable: function () {
          var e = this._dataController.getRowIndexOffset();
          [this._sortable, this._sortableFixed].forEach(function (t) {
            if (t != null) {
              t.option("offset", e);
            }
            if (t != null) {
              t.update();
            }
          });
        },
        _resizeCore: function () {
          this.callBase.apply(this, arguments);
          this._updateSortable();
        },
        _getDraggableGridOptions: function (e) {
          var t = this.option();
          var n = this.getColumns();
          var o = (0, i.default)(this.getRowElement(e.rowIndex));
          return {
            dataSource: [{
              id: 1,
              parentId: 0
            }],
            showBorders: true,
            showColumnHeaders: false,
            scrolling: {
              useNative: false,
              showScrollbar: "never"
            },
            pager: {
              visible: false
            },
            loadingTimeout: null,
            columnFixing: t.columnFixing,
            columnAutoWidth: t.columnAutoWidth,
            showColumnLines: t.showColumnLines,
            columns: n.map(function (e) {
              return {
                width: e.width || e.visibleWidth,
                fixed: e.fixed,
                fixedPosition: e.fixedPosition
              };
            }),
            onRowPrepared: function (e) {
              var t = e.component.getView("rowsView");
              (0, i.default)(e.rowElement).replaceWith(o.eq(t._isFixedTableRendering ? 1 : 0).clone());
            }
          };
        },
        _synchronizeScrollLeftPosition: function (e) {
          var t = e == null ? undefined : e.getScrollable();
          if (t != null) {
            t.scrollTo({
              x: this._scrollLeft
            });
          }
        },
        _getDraggableRowTemplate: function () {
          var e = this;
          return function (t) {
            var n = e.component.$element();
            var o = (0, i.default)("<div>");
            (0, r.setWidth)(o, (0, r.getWidth)(n));
            var a = e._dataController.items();
            var s = a && a[t.fromIndex];
            var l = e._getDraggableGridOptions(s);
            e._createComponent(o, e.component.NAME, l);
            o.find(".dx-gridbase-container").children(`:not(.${e.addWidgetPrefix(u.CLASSES.rowsView)})`).hide();
            return o;
          };
        },
        _getHandleTemplate: function () {
          var e = this;
          return d.GridCoreRowDraggingDom.createHandleTemplateFunc(function (t) {
            return e.addWidgetPrefix(t);
          });
        },
        optionChanged: function (e) {
          if (e.name === "rowDragging") {
            this._updateHandleColumn();
            this._invalidate(true, true);
            e.handled = true;
          }
          this.callBase.apply(this, arguments);
        }
      }
    }
  }
};
exports.rowDraggingModule = h;