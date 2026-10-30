Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateStoringModule = undefined;
var i;
var o = require("./20576.js");
var a = require("./62754.js");
var r = require("./13306.js");
var s = require("./35922.js");
var l = (i = require("./84651.js")) && i.__esModule ? i : {
  default: i
};
function u(e) {
  var t = e.getController("columns");
  var n = e.getController("selection");
  var i = e.getController("export");
  var o = e.getController("data");
  if (t) {
    t.columnsChanged.add(function () {
      e.updateState({
        columns: t.getUserState()
      });
    });
  }
  if (n) {
    n.selectionChanged.add(function (t) {
      e.updateState({
        selectedRowKeys: t.selectedRowKeys,
        selectionFilter: t.selectionFilter
      });
    });
  }
  if (o) {
    e._initialPageSize = e.option("paging.pageSize");
    e._initialFilterValue = e.option("filterValue");
    o.changed.add(function () {
      var t = function (e) {
        var t = e.getView("pagerView");
        var n = e.getController("data");
        var i = {
          allowedPageSizes: t ? t.getPageSizes() : undefined,
          filterPanel: {
            filterEnabled: e.option("filterPanel.filterEnabled")
          },
          filterValue: e.option("filterValue"),
          focusedRowKey: e.option("focusedRowEnabled") ? e.option("focusedRowKey") : undefined
        };
        return (0, r.extend)(i, n.getUserState());
      }(e);
      e.updateState(t);
    });
  }
  if (i) {
    i.selectionOnlyChanged.add(function () {
      e.updateState({
        exportSelectionOnly: i.selectionOnly()
      });
    });
  }
}
var d = {
  defaultOptions: function () {
    return {
      stateStoring: {
        enabled: false,
        storageKey: null,
        type: "localStorage",
        customLoad: null,
        customSave: null,
        savingTimeout: 2000
      }
    };
  },
  controllers: {
    stateStoring: l.default.StateStoringController
  },
  extenders: {
    views: {
      rowsView: {
        init: function () {
          var e = this;
          var t = e.getController("data");
          e.callBase();
          t.stateLoaded.add(function () {
            if (t.isLoaded() && !t.getDataSource()) {
              e.setLoading(false);
              e.renderNoDataText();
              var n = e.component.getView("columnHeadersView");
              if (n) {
                n.render();
              }
              e.component._fireContentReadyAction();
            }
          });
        }
      }
    },
    controllers: {
      stateStoring: {
        init: function () {
          this.callBase.apply(this, arguments);
          u(this);
        },
        isLoading: function () {
          return this.callBase() || this.getController("data").isStateLoading();
        },
        state: function (e) {
          var t = this.callBase.apply(this, arguments);
          if (e !== undefined) {
            this.applyState((0, r.extend)(true, {}, e));
          }
          return t;
        },
        updateState: function (e) {
          if (this.isEnabled()) {
            var t = this.state();
            var n = (0, r.extend)({}, t, e);
            var i = (0, o.getKeyHash)(t);
            var a = (0, o.getKeyHash)(n);
            if (!(0, o.equalByValue)(i, a)) {
              e = (0, r.extend)(true, {}, e);
              (0, r.extend)(this._state, e);
              this.save();
            }
          } else {
            (0, r.extend)(this._state, e);
          }
        },
        applyState: function (e) {
          var t;
          var n = e.allowedPageSizes;
          var i = e.searchText;
          var o = e.selectedRowKeys;
          var a = e.selectionFilter;
          var r = this.getController("export");
          var l = this.getController("columns");
          var u = this.getController("data");
          var d = this.option("scrolling.mode");
          var c = d === "virtual" || d === "infinite";
          var h = this.option("pager.visible") === true && this.option("pager.showPageSizeSelector");
          var f = (t = this.getView("rowsView")) === null || t === undefined ? undefined : t.hasHeight();
          this.component.beginUpdate();
          if (l) {
            l.setUserState(e.columns);
          }
          if (r) {
            r.selectionOnly(e.exportSelectionOnly);
          }
          if (!this.option("selection.deferred")) {
            this.option("selectedRowKeys", o || []);
          }
          this.option("selectionFilter", a);
          if (n && this.option("pager.allowedPageSizes") === "auto") {
            this.option("pager").allowedPageSizes = n;
          }
          if (this.option("focusedRowEnabled")) {
            this.option("focusedRowIndex", -1);
            this.option("focusedRowKey", e.focusedRowKey || null);
          }
          this.component.endUpdate();
          this.option("searchPanel.text", i || "");
          this.option("filterValue", function (e, t) {
            var n = e.getController("filterSync");
            var i = e.getController("columns");
            var o = t.columns || t.filterValue !== undefined;
            if (n) {
              if (o) {
                return t.filterValue || n.getFilterValueFromColumns(t.columns);
              } else {
                return e._initialFilterValue || n.getFilterValueFromColumns(i.getColumns());
              }
            } else {
              return null;
            }
          }(this, e));
          this.option("filterPanel.filterEnabled", !e.filterPanel || e.filterPanel.filterEnabled);
          this.option("paging.pageIndex", (!c || f) && e.pageIndex || 0);
          this.option("paging.pageSize", c && !h || !(0, s.isDefined)(e.pageSize) ? this._initialPageSize : e.pageSize);
          if (u) {
            u.reset();
          }
        }
      },
      columns: {
        _shouldReturnVisibleColumns: function () {
          var e = this.callBase.apply(this, arguments);
          var t = this.getController("stateStoring");
          return e && (!t.isEnabled() || t.isLoaded());
        }
      },
      data: {
        callbackNames: function () {
          return this.callBase().concat(["stateLoaded"]);
        },
        _refreshDataSource: function () {
          var e = this;
          var t = this.callBase;
          var n = this.getController("stateStoring");
          if (n.isEnabled() && !n.isLoaded()) {
            clearTimeout(this._restoreStateTimeoutID);
            var i = new a.Deferred();
            this._restoreStateTimeoutID = setTimeout(function () {
              n.load().always(function () {
                e._restoreStateTimeoutID = null;
              }).done(function () {
                t.call(e);
                e.stateLoaded.fire();
                i.resolve();
              }).fail(function (t) {
                e.stateLoaded.fire();
                e._handleLoadError(t || "Unknown error");
                i.reject();
              });
            });
            return i.promise();
          }
          if (!this.isStateLoading()) {
            t.call(this);
          }
        },
        isLoading: function () {
          var e = this.getController("stateStoring");
          return this.callBase() || e.isLoading();
        },
        isStateLoading: function () {
          return (0, s.isDefined)(this._restoreStateTimeoutID);
        },
        isLoaded: function () {
          return this.callBase() && !this.isStateLoading();
        },
        dispose: function () {
          clearTimeout(this._restoreStateTimeoutID);
          this.callBase();
        }
      },
      selection: {
        _fireSelectionChanged: function (e) {
          var t = this.getController("stateStoring");
          var n = this.option("selection.deferred");
          if (!t.isLoading() || !n) {
            this.callBase.apply(this, arguments);
          }
        }
      }
    }
  }
};
exports.stateStoringModule = d;