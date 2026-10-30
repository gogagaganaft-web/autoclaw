Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.masterDetailModule = undefined;
var i = d(require("./68374.js"));
var o = require("./20576.js");
var a = require("./62754.js");
var r = require("./95479.js");
var s = require("./58664.js");
var l = require("./35922.js");
var u = d(require("./60082.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c;
var h = {
  defaultOptions: function () {
    return {
      masterDetail: {
        enabled: false,
        autoExpandAll: false,
        template: null
      }
    };
  },
  extenders: {
    controllers: {
      columns: {
        _getExpandColumnsCore: function () {
          var e = this.callBase();
          if (this.option("masterDetail.enabled")) {
            e.push({
              type: "detailExpand",
              cellTemplate: u.default.getExpandCellTemplate()
            });
          }
          return e;
        }
      },
      data: (c = function (e) {
        e._expandedItems = [];
        e._isExpandAll = e.option("masterDetail.autoExpandAll");
      }, {
        init: function () {
          c(this);
          this.callBase();
        },
        expandAll: function (e) {
          var t = this;
          if (e < 0) {
            t._isExpandAll = true;
            t._expandedItems = [];
            t.updateItems();
          } else {
            t.callBase.apply(t, arguments);
          }
        },
        collapseAll: function (e) {
          var t = this;
          if (e < 0) {
            t._isExpandAll = false;
            t._expandedItems = [];
            t.updateItems();
          } else {
            t.callBase.apply(t, arguments);
          }
        },
        isRowExpanded: function (e) {
          var t = this;
          var n = u.default.getIndexByKey(e, t._expandedItems);
          if (Array.isArray(e)) {
            return t.callBase.apply(t, arguments);
          } else {
            return !!(t._isExpandAll ^ (n >= 0 && t._expandedItems[n].visible));
          }
        },
        _getRowIndicesForExpand: function (e) {
          var t = this.getRowIndexByKey(e);
          return [t, t + 1];
        },
        _changeRowExpandCore: function (e) {
          var t;
          var n = this;
          if (Array.isArray(e)) {
            t = n.callBase.apply(n, arguments);
          } else {
            var i = u.default.getIndexByKey(e, n._expandedItems);
            if (i >= 0) {
              var o = n._expandedItems[i].visible;
              n._expandedItems[i].visible = !o;
            } else {
              n._expandedItems.push({
                key: e,
                visible: true
              });
            }
            n.updateItems({
              changeType: "update",
              rowIndices: n._getRowIndicesForExpand(e)
            });
            t = new a.Deferred().resolve();
          }
          return t;
        },
        _processDataItem: function (e, t) {
          var n = this;
          var i = n.callBase.apply(n, arguments);
          i.isExpanded = n.isRowExpanded(i.key);
          if (t.detailColumnIndex === undefined) {
            t.detailColumnIndex = -1;
            (0, r.each)(t.visibleColumns, function (e, n) {
              if (n.command === "expand" && !(0, l.isDefined)(n.groupIndex)) {
                t.detailColumnIndex = e;
                return false;
              }
            });
          }
          if (t.detailColumnIndex >= 0) {
            i.values[t.detailColumnIndex] = i.isExpanded;
          }
          return i;
        },
        _processItems: function (e, t) {
          var n = this;
          var i = t.changeType;
          var a = [];
          e = n.callBase.apply(n, arguments);
          if (i === "loadingAll") {
            return e;
          } else {
            if (i === "refresh") {
              n._expandedItems = (0, o.grep)(n._expandedItems, function (e) {
                return e.visible;
              });
            }
            (0, r.each)(e, function (e, t) {
              a.push(t);
              var i = u.default.getIndexByKey(t.key, n._expandedItems);
              if (t.rowType === "data" && (t.isExpanded || i >= 0) && !t.isNewRow) {
                a.push({
                  visible: t.isExpanded,
                  rowType: "detail",
                  key: t.key,
                  data: t.data,
                  values: []
                });
              }
            });
            return a;
          }
        },
        optionChanged: function (e) {
          var t;
          var n;
          if (e.name === "masterDetail") {
            e.name = "dataSource";
            switch (e.fullName) {
              case "masterDetail":
                var i = e.value || {};
                var o = e.previousValue || {};
                t = i.enabled !== o.enabled;
                n = i.autoExpandAll !== o.autoExpandAll;
                break;
              case "masterDetail.template":
                c(this);
                break;
              case "masterDetail.enabled":
                t = true;
                break;
              case "masterDetail.autoExpandAll":
                n = true;
            }
            if (t || n) {
              c(this);
            }
          }
          this.callBase(e);
        }
      }),
      resizing: {
        fireContentReadyAction: function () {
          this.callBase.apply(this, arguments);
          this._updateParentDataGrids(this.component.$element());
        },
        _updateParentDataGrids: function (e) {
          var t = this;
          var n = e.closest(`.dx-master-detail-row`);
          if (n.length) {
            (0, a.when)(this._updateMasterDataGrid(n, e)).done(function () {
              t._updateParentDataGrids(n.parent());
            });
          }
        },
        _updateMasterDataGrid: function (e, t) {
          var n = (0, i.default)(e).data("options");
          var o = (0, i.default)(e).closest(`.${this.getWidgetContainerClass()}`).parent().data("dxDataGrid");
          if (n && o) {
            return this._updateMasterDataGridCore(o, n);
          }
        },
        _updateMasterDataGridCore: function (e, t) {
          var n = (0, a.Deferred)();
          if (e.getView("rowsView").isFixedColumns()) {
            this._updateFixedMasterDetailGrids(e, t.rowIndex, (0, i.default)(t.rowElement)).done(n.resolve);
          } else {
            if (e.option("scrolling.useNative") === true) {
              e.updateDimensions().done(function () {
                return n.resolve(true);
              });
              return;
            }
            var o = e.getScrollable();
            if (o) {
              if (o != null) {
                o.update().done(function () {
                  return n.resolve();
                });
              }
            } else {
              n.resolve();
            }
          }
          return n.promise();
        },
        _updateFixedMasterDetailGrids: function (e, t, n) {
          var o = this;
          var r = (0, a.Deferred)();
          var l = (0, i.default)(e.getRowElement(t));
          var u = (0, i.default)(e.getView("rowsView").getTableElements());
          var d = (l == null ? undefined : l.length) === 2 && (0, s.getHeight)(l.eq(0)) !== (0, s.getHeight)(l.eq(1));
          var c = (u == null ? undefined : u.length) === 2 && (0, s.getHeight)(u.eq(0)) !== (0, s.getHeight)(u.eq(1));
          if (d || c) {
            var h = (0, s.getWidth)(n);
            e.updateDimensions().done(function () {
              var t = o.option("columnAutoWidth") && e.option("scrolling.useNative") === true;
              var i = t && h !== (0, s.getWidth)(n);
              if (t && i) {
                o.updateDimensions().done(function () {
                  return r.resolve(true);
                });
              } else {
                r.resolve(true);
              }
            });
            return r.promise();
          }
          return (0, a.Deferred)().resolve();
        },
        _toggleBestFitMode: function (e) {
          this.callBase.apply(this, arguments);
          if (this.option("masterDetail.template")) {
            var t = this._rowsView.getTableElement();
            if (t) {
              t.find(".dx-master-detail-cell").css("maxWidth", e ? 0 : "");
            }
          }
        }
      }
    },
    views: {
      rowsView: {
        _getCellTemplate: function (e) {
          var t = this;
          var n = e.column;
          var i = t.getController("editing");
          var o = i && i.isEditRow(e.rowIndex);
          if (n.command !== "detail" || o) {
            return t.callBase.apply(t, arguments);
          } else {
            return t.option("masterDetail.template") || {
              allowRenderToDetachedContainer: false,
              render: t._getDefaultTemplate(n)
            };
          }
        },
        _isDetailRow: function (e) {
          return e && e.rowType && e.rowType.indexOf("detail") === 0;
        },
        _createRow: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e && this._isDetailRow(e)) {
            if (this.option("showRowLines")) {
              t.addClass("dx-row-lines");
            }
            t.addClass("dx-master-detail-row");
            if ((0, l.isDefined)(e.visible)) {
              t.toggle(e.visible);
            }
          }
          return t;
        },
        _renderCells: function (e, t) {
          var n = t.row;
          var i = this._columnsController.getVisibleColumns();
          if (n.rowType && this._isDetailRow(n)) {
            if (this._needRenderCell(0, t.columnIndices)) {
              this._renderCell(e, {
                value: null,
                row: n,
                rowIndex: n.rowIndex,
                column: {
                  command: "detail"
                },
                columnIndex: 0,
                change: t.change
              }).addClass("dx-cell-focus-disabled").addClass("dx-master-detail-cell").attr("colSpan", i.length);
            }
          } else {
            this.callBase.apply(this, arguments);
          }
        }
      }
    }
  }
};
exports.masterDetailModule = h;