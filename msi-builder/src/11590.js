Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortingModule = undefined;
var i = c(require("./68374.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = require("./95429.js");
var s = c(require("./55994.js"));
var l = require("./39611.js");
var u = c(require("./28109.js"));
var d = c(require("./62930.js"));
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
      sorting: {
        mode: "single",
        ascendingText: u.default.format("dxDataGrid-sortingAscendingText"),
        descendingText: u.default.format("dxDataGrid-sortingDescendingText"),
        clearText: u.default.format("dxDataGrid-sortingClearText"),
        showSortIndexes: true
      }
    };
  },
  extenders: {
    views: {
      columnHeadersView: (0, o.extend)({}, d.default, {
        _createRow: function (e) {
          var t = this;
          var n = this.callBase(e);
          if (e.rowType === "header") {
            s.default.on(n, (0, l.addNamespace)(r.name, "dxDataGridColumnHeadersView"), "td", this.createAction(function (e) {
              t._processHeaderAction(e.event, n);
            }));
          }
          return n;
        },
        _processHeaderAction: function (e, t) {
          if ((0, i.default)(e.currentTarget).parent().get(0) === t.get(0)) {
            var n = this;
            var o = null;
            var r = (0, i.default)(e.currentTarget);
            var s = r.parent().index();
            var u = -1;
            [].slice.call(n.getCellElements(s)).some(function (e, t) {
              if (e === r.get(0)) {
                u = t;
                return true;
              }
            });
            var d = n._columnsController.getVisibleColumns(s)[u];
            var c = n.getController("editing");
            var h = n.option("editing.mode");
            if ((!c || !c.isEditing() || h !== "batch" && h !== "cell") && n._isSortableElement((0, i.default)(e.target))) {
              if (!!d && !(0, a.isDefined)(d.groupIndex) && !d.command) {
                if (e.shiftKey) {
                  o = "shift";
                } else if ((0, l.isCommandKeyPressed)(e)) {
                  o = "ctrl";
                }
                setTimeout(function () {
                  n._columnsController.changeSortOrder(d.index, o);
                });
              }
            }
          }
        },
        _renderCellContent: function (e, t) {
          var n = this;
          var i = t.column;
          if (!i.command && t.rowType === "header") {
            n._applyColumnState({
              name: "sort",
              rootElement: e,
              column: i,
              showColumnLines: n.option("showColumnLines")
            });
          }
          this.callBase.apply(this, arguments);
        },
        _columnOptionChanged: function (e) {
          var t = e.changeTypes;
          if (t.length === 1 && t.sorting) {
            this._updateIndicators("sort");
          } else {
            this.callBase(e);
          }
        },
        optionChanged: function (e) {
          switch (e.name) {
            case "sorting":
              this._invalidate();
              e.handled = true;
              break;
            default:
              this.callBase(e);
          }
        }
      }),
      headerPanel: (0, o.extend)({}, d.default, {
        _createGroupPanelItem: function (e, t) {
          var n = this;
          var i = n.callBase.apply(n, arguments);
          s.default.on(i, (0, l.addNamespace)(r.name, "dxDataGridHeaderPanel"), n.createAction(function () {
            n._processGroupItemAction(t.index);
          }));
          n._applyColumnState({
            name: "sort",
            rootElement: i,
            column: {
              alignment: n.option("rtlEnabled") ? "right" : "left",
              allowSorting: t.allowSorting,
              sortOrder: t.sortOrder === "desc" ? "desc" : "asc"
            },
            showColumnLines: true
          });
          return i;
        },
        _processGroupItemAction: function (e) {
          var t = this;
          setTimeout(function () {
            return t.getController("columns").changeSortOrder(e);
          });
        },
        optionChanged: function (e) {
          switch (e.name) {
            case "sorting":
              this._invalidate();
              e.handled = true;
              break;
            default:
              this.callBase(e);
          }
        }
      })
    }
  }
};
exports.sortingModule = h;