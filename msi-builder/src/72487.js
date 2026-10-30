Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupingHeaderPanelExtender = undefined;
var i = m(require("./20530.js"));
var o = m(require("./68374.js"));
var a = require("./62754.js");
var r = require("./95479.js");
var s = require("./58664.js");
var l = require("./35922.js");
var u = m(require("./28109.js"));
var d = require("./56756.js");
var c = require("./9130.js");
var h = m(require("./74938.js"));
var f = m(require("./49975.js"));
var p = require("./2772.js");
var g = require("./4789.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _ = {
  init: function () {
    this.callBase.apply(this, arguments);
    this._initGroupingHelper();
  },
  _initGroupingHelper: function (e) {
    var t = this._grouping;
    var n = this.option("grouping.autoExpandAll");
    var i = this.option("focusedRowEnabled");
    var o = e ? e.remoteOperations : this.remoteOperations();
    if (!o.filtering || !o.sorting || !o.paging || o.grouping || !n && i) {
      if (!t || t instanceof g.GroupingHelper) {
        this._grouping = new p.GroupingHelper(this);
      }
    } else if (!t || t instanceof p.GroupingHelper) {
      this._grouping = new g.GroupingHelper(this);
    }
  },
  totalItemsCount: function () {
    var e = this.callBase();
    if (e > 0 && this._dataSource.group() && this._dataSource.requireTotalCount()) {
      return e + this._grouping.totalCountCorrection();
    } else {
      return e;
    }
  },
  itemsCount: function () {
    if (this._dataSource.group()) {
      return this._grouping.itemsCount() || 0;
    } else {
      return this.callBase.apply(this, arguments);
    }
  },
  allowCollapseAll: function () {
    return this._grouping.allowCollapseAll();
  },
  isGroupItemCountable: function (e) {
    return this._grouping.isGroupItemCountable(e);
  },
  isRowExpanded: function (e) {
    var t = this._grouping.findGroupInfo(e);
    if (t) {
      return t.isExpanded;
    } else {
      return !this._grouping.allowCollapseAll();
    }
  },
  collapseAll: function (e) {
    return this._collapseExpandAll(e, false);
  },
  expandAll: function (e) {
    return this._collapseExpandAll(e, true);
  },
  _collapseExpandAll: function (e, t) {
    var n = this._dataSource;
    var i = n.group();
    var o = h.default.normalizeSortingInfo(i || []);
    if (o.length) {
      for (var a = 0; a < o.length; a++) {
        if (e === undefined || e === a) {
          o[a].isExpanded = t;
        } else if (i && i[a]) {
          o[a].isExpanded = i[a].isExpanded;
        }
      }
      n.group(o);
      this._grouping.foreachGroups(function (n, i) {
        if (e === undefined || e === i.length - 1) {
          n.isExpanded = t;
        }
      }, false, true);
      this.resetPagesCache();
    }
    return true;
  },
  refresh: function () {
    this.callBase.apply(this, arguments);
    return this._grouping.refresh.apply(this._grouping, arguments);
  },
  changeRowExpand: function (e) {
    var t = this._dataSource;
    if (t.group()) {
      t.beginLoading();
      if (this._lastLoadOptions) {
        this._lastLoadOptions.groupExpand = true;
      }
      return this._changeRowExpandCore(e).always(function () {
        t.endLoading();
      });
    }
  },
  _changeRowExpandCore: function (e) {
    return this._grouping.changeRowExpand(e);
  },
  _hasGroupLevelsExpandState: function (e, t) {
    if (e && Array.isArray(e)) {
      for (var n = 0; n < e.length; n++) {
        if (e[n].isExpanded === t) {
          return true;
        }
      }
    }
  },
  _customizeRemoteOperations: function (e, t) {
    var n = e.remoteOperations;
    if (e.storeLoadOptions.group) {
      if (n.grouping && !e.isCustomLoading) {
        if (!n.groupPaging || !!this._hasGroupLevelsExpandState(e.storeLoadOptions.group, true)) {
          n.paging = false;
        }
      }
      if (!n.grouping && (!n.sorting || !n.filtering || !!e.isCustomLoading || !!this._hasGroupLevelsExpandState(e.storeLoadOptions.group, false))) {
        n.paging = false;
      }
    } else if (!e.isCustomLoading && n.paging && t.grouping) {
      this.resetCache();
    }
    this.callBase.apply(this, arguments);
  },
  _handleDataLoading: function (e) {
    this.callBase(e);
    this._initGroupingHelper(e);
    return this._grouping.handleDataLoading(e);
  },
  _handleDataLoaded: function (e) {
    return this._grouping.handleDataLoaded(e, this.callBase.bind(this));
  },
  _handleDataLoadedCore: function (e) {
    return this._grouping.handleDataLoadedCore(e, this.callBase.bind(this));
  }
};
f.default.extend(_);
var v = {
  init: function () {
    this.callBase();
    this.createAction("onRowExpanding");
    this.createAction("onRowExpanded");
    this.createAction("onRowCollapsing");
    this.createAction("onRowCollapsed");
  },
  _beforeProcessItems: function (e) {
    var t = this._columnsController.getGroupColumns();
    if ((e = this.callBase(e)).length && t.length) {
      e = this._processGroupItems(e, t.length);
    }
    return e;
  },
  _processItem: function (e, t) {
    if ((0, l.isDefined)(e.groupIndex) && (0, l.isString)(e.rowType) && e.rowType.indexOf("group") === 0) {
      e = this._processGroupItem(e, t);
      t.dataIndex = 0;
    } else {
      e = this.callBase.apply(this, arguments);
    }
    return e;
  },
  _processGroupItem: function (e) {
    return e;
  },
  _processGroupItems: function (e, t, n) {
    var i = this._columnsController.getGroupColumns();
    var o = i[i.length - t];
    if (!n) {
      var a = this.option("scrolling.mode");
      n = {
        collectContinuationItems: a !== "virtual" && a !== "infinite",
        resultItems: [],
        path: [],
        values: []
      };
    }
    var r = n.resultItems;
    if (n.data) {
      if (!!n.collectContinuationItems || !n.data.isContinuation) {
        r.push({
          rowType: "group",
          data: n.data,
          groupIndex: n.path.length - 1,
          isExpanded: !!n.data.items,
          key: n.path.slice(0),
          values: n.values.slice(0)
        });
      }
    }
    if (e) {
      if (t === 0) {
        r.push.apply(r, e);
      } else {
        for (var s = 0; s < e.length; s++) {
          var l = e[s];
          if (l && "items" in l) {
            n.data = l;
            n.path.push(l.key);
            n.values.push(o && o.deserializeValue && !o.calculateDisplayValue ? o.deserializeValue(l.key) : l.key);
            this._processGroupItems(l.items, t - 1, n);
            n.data = undefined;
            n.path.pop();
            n.values.pop();
          } else {
            r.push(l);
          }
        }
      }
    }
    return r;
  },
  publicMethods: function () {
    return this.callBase().concat(["collapseAll", "expandAll", "isRowExpanded", "expandRow", "collapseRow"]);
  },
  collapseAll: function (e) {
    var t = this._dataSource;
    if (t && t.collapseAll(e)) {
      t.pageIndex(0);
      t.reload();
    }
  },
  expandAll: function (e) {
    var t = this._dataSource;
    if (t && t.expandAll(e)) {
      t.pageIndex(0);
      t.reload();
    }
  },
  changeRowExpand: function (e) {
    var t = this;
    var n = t.isRowExpanded(e);
    var i = {
      key: e,
      expanded: n
    };
    t.executeAction(n ? "onRowCollapsing" : "onRowExpanding", i);
    if (i.cancel) {
      return new a.Deferred().resolve();
    } else {
      return (0, a.when)(t._changeRowExpandCore(e)).done(function () {
        i.expanded = !n;
        t.executeAction(n ? "onRowCollapsed" : "onRowExpanded", i);
      });
    }
  },
  _changeRowExpandCore: function (e) {
    var t = this;
    var n = this._dataSource;
    var i = new a.Deferred();
    if (n) {
      (0, a.when)(n.changeRowExpand(e)).done(function () {
        t.load().done(i.resolve).fail(i.reject);
      }).fail(i.reject);
    } else {
      i.resolve();
    }
    return i;
  },
  isRowExpanded: function (e) {
    var t = this._dataSource;
    return t && t.isRowExpanded(e);
  },
  expandRow: function (e) {
    if (this.isRowExpanded(e)) {
      return new a.Deferred().resolve();
    } else {
      return this.changeRowExpand(e);
    }
  },
  collapseRow: function (e) {
    if (this.isRowExpanded(e)) {
      return this.changeRowExpand(e);
    } else {
      return new a.Deferred().resolve();
    }
  },
  optionChanged: function (e) {
    if (e.name === "grouping") {
      e.name = "dataSource";
    }
    this.callBase(e);
  }
};
function y(e, t) {
  var n = this._columnsController;
  switch (t.itemData.value) {
    case "group":
      var i = n._dataSource.group() || [];
      n.columnOption(e.dataField, "groupIndex", i.length);
      break;
    case "ungroup":
      n.columnOption(e.dataField, "groupIndex", -1);
      break;
    case "ungroupAll":
      this.component.clearGrouping();
  }
}
function b(e) {
  var t = e == null ? undefined : e.visible;
  if (t === "auto") {
    return i.default.current().deviceType === "desktop";
  } else {
    return !!t;
  }
}
function x(e, t) {
  var n = b(e);
  var i = (e == null ? undefined : e.allowColumnDragging) && t.allowGrouping;
  return n && !!i;
}
var w = {
  _getToolbarItems: function () {
    var e = this.callBase();
    return this._appendGroupingItem(e);
  },
  _appendGroupingItem: function (e) {
    var t = this;
    if (this._isGroupPanelVisible()) {
      var n = false;
      var i = {
        template: function () {
          var e = (0, o.default)("<div>").addClass("dx-datagrid-group-panel");
          t._updateGroupPanelContent(e);
          (0, c.registerKeyboardAction)("groupPanel", t, e, undefined, t._handleActionKeyDown.bind(t));
          return e;
        },
        name: "groupPanel",
        onItemRendered: function () {
          if (n) {
            t.renderCompleted.fire();
          }
          n = true;
        },
        location: "before",
        locateInMenu: "never",
        sortIndex: 1
      };
      e.push(i);
      this.updateToolbarDimensions();
    }
    return e;
  },
  _handleActionKeyDown: function (e) {
    var t = e.event;
    var n = (0, o.default)(t.target);
    var i = n.closest(`.dx-group-panel-item`).index();
    var a = this._columnsController.getGroupColumns()[i];
    var r = a && a.index;
    if (n.is(".dx-header-filter")) {
      this.getController("headerFilter").showHeaderFilterMenu(r, true);
    } else {
      this._processGroupItemAction(r);
    }
    t.preventDefault();
  },
  _isGroupPanelVisible: function () {
    return b(this.option("groupPanel"));
  },
  _renderGroupPanelItems: function (e, t) {
    var n = this;
    e.empty();
    (0, r.each)(t, function (t, i) {
      n._createGroupPanelItem(e, i);
    });
    (0, d.restoreFocus)(this);
  },
  _createGroupPanelItem: function (e, t) {
    var n = (0, o.default)("<div>").addClass(t.cssClass).addClass("dx-group-panel-item").data("columnData", t).appendTo(e).text(t.caption);
    (0, d.setTabIndex)(this, n);
    return n;
  },
  _columnOptionChanged: function (e) {
    if (!this._requireReady && !h.default.checkChanges(e.optionNames, ["width", "visibleWidth"])) {
      var t = this.element();
      var n = t && t.find(`.dx-datagrid-group-panel`);
      if (n && n.length) {
        this._updateGroupPanelContent(n);
        this.updateToolbarDimensions();
        this.renderCompleted.fire();
      }
    }
    this.callBase();
  },
  _updateGroupPanelContent: function (e) {
    var t = this.getController("columns").getGroupColumns();
    var n = this.option("groupPanel");
    this._renderGroupPanelItems(e, t);
    if (n.allowColumnDragging && !t.length) {
      (0, o.default)("<div>").addClass("dx-group-panel-message").text(n.emptyPanelText).appendTo(e);
      e.closest(`.dx-toolbar-item`).addClass("dx-toolbar-label");
      e.closest(`.dx-toolbar-label`).css("maxWidth", "none");
    }
  },
  allowDragging: function (e) {
    var t = this.option("groupPanel");
    return x(t, e);
  },
  getColumnElements: function () {
    var e = this.element();
    return e && e.find(`.dx-group-panel-item`);
  },
  getColumns: function () {
    return this.getController("columns").getGroupColumns();
  },
  getBoundingRect: function () {
    var e = this.element();
    if (e && e.find(`.dx-datagrid-group-panel`).length) {
      var t = e.offset();
      return {
        top: t.top,
        bottom: t.top + (0, s.getHeight)(e)
      };
    }
    return null;
  },
  getName: function () {
    return "group";
  },
  getContextMenuItems: function (e) {
    var t;
    var n = this.option("grouping.contextMenuEnabled");
    var i = (0, o.default)(e.targetElement).closest(`.dx-group-panel-item`);
    if (i.length) {
      e.column = i.data("columnData");
    }
    if (n && e.column) {
      var a = e.column;
      if (!(0, l.isDefined)(a.allowGrouping) || a.allowGrouping) {
        var r = (0, l.isDefined)(a.groupIndex) && a.groupIndex > -1;
        var s = this.option("grouping.texts");
        var u = y.bind(this, a);
        t = [{
          text: s.ungroup,
          value: "ungroup",
          disabled: !r,
          onItemClick: u
        }, {
          text: s.ungroupAll,
          value: "ungroupAll",
          onItemClick: u
        }];
      }
    }
    return t;
  },
  isVisible: function () {
    return this.callBase() || this._isGroupPanelVisible();
  },
  hasGroupedColumns: function () {
    return this._isGroupPanelVisible() && !!this.getColumns().length;
  },
  optionChanged: function (e) {
    if (e.name === "groupPanel") {
      this._invalidate();
      e.handled = true;
    } else {
      this.callBase(e);
    }
  }
};
exports.GroupingHeaderPanelExtender = w;
var C = {
  getContextMenuItems: function (e) {
    var t;
    if (this.option("grouping.contextMenuEnabled") && e.row && e.row.rowType === "group") {
      var n = this._columnsController.columnOption(`groupIndex:${e.row.groupIndex}`);
      if (n && n.allowGrouping) {
        var i = this.option("grouping.texts");
        var o = y.bind(this, n);
        (t = []).push({
          text: i.ungroup,
          value: "ungroup",
          onItemClick: o
        }, {
          text: i.ungroupAll,
          value: "ungroupAll",
          onItemClick: o
        });
      }
    }
    return t;
  },
  _rowClick: function (e) {
    var t = this.option("grouping.expandMode");
    var n = this.option("scrolling.mode") !== "infinite" && t === "rowClick" && (0, o.default)(e.event.target).closest(`.dx-group-row`).length;
    var i = (0, o.default)(e.event.target).closest(`.dx-datagrid-expand`).length;
    if (n || i) {
      this._changeGroupRowState(e);
    }
    this.callBase(e);
  },
  _changeGroupRowState: function (e) {
    var t = this.getController("data");
    var n = t.items()[e.rowIndex];
    var i = this._columnsController.columnOption(`groupIndex:${n.groupIndex}`, "allowCollapsing");
    if (n.rowType === "data" || n.rowType === "group" && i !== false) {
      t.changeRowExpand(n.key, true);
      e.event.preventDefault();
      e.handled = true;
    }
  }
};
var S = {
  getContextMenuItems: function (e) {
    var t = this.option("grouping.contextMenuEnabled");
    var n = this.callBase(e);
    if (t && e.row && (e.row.rowType === "header" || e.row.rowType === "detailAdaptive")) {
      var i = e.column;
      if (!i.command && (!(0, l.isDefined)(i.allowGrouping) || i.allowGrouping)) {
        var o = this.option("grouping.texts");
        var a = (0, l.isDefined)(i.groupIndex) && i.groupIndex > -1;
        var r = y.bind(this, i);
        (n = n || []).push({
          text: o.groupByThisColumn,
          value: "group",
          beginGroup: true,
          disabled: a,
          onItemClick: r
        });
        if (i.showWhenGrouped) {
          n.push({
            text: o.ungroup,
            value: "ungroup",
            disabled: !a,
            onItemClick: r
          });
        }
        n.push({
          text: o.ungroupAll,
          value: "ungroupAll",
          onItemClick: r
        });
      }
    }
    return n;
  },
  allowDragging: function (e) {
    var t = this.option("groupPanel");
    return x(t, e) || this.callBase(e);
  }
};
h.default.registerModule("grouping", {
  defaultOptions: function () {
    return {
      grouping: {
        autoExpandAll: true,
        allowCollapsing: true,
        contextMenuEnabled: false,
        expandMode: "buttonClick",
        texts: {
          groupContinuesMessage: u.default.format("dxDataGrid-groupContinuesMessage"),
          groupContinuedMessage: u.default.format("dxDataGrid-groupContinuedMessage"),
          groupByThisColumn: u.default.format("dxDataGrid-groupHeaderText"),
          ungroup: u.default.format("dxDataGrid-ungroupHeaderText"),
          ungroupAll: u.default.format("dxDataGrid-ungroupAllText")
        }
      },
      groupPanel: {
        visible: false,
        emptyPanelText: u.default.format("dxDataGrid-groupPanelEmptyText"),
        allowColumnDragging: true
      }
    };
  },
  extenders: {
    controllers: {
      data: v,
      columns: {
        _getExpandColumnOptions: function () {
          var e = this.callBase.apply(this, arguments);
          e.cellTemplate = h.default.getExpandCellTemplate();
          return e;
        }
      },
      editing: {
        _isProcessedItem: function (e) {
          return (0, l.isDefined)(e.groupIndex) && (0, l.isString)(e.rowType) && e.rowType.indexOf("group") === 0;
        }
      }
    },
    views: {
      headerPanel: w,
      rowsView: C,
      columnHeadersView: S
    }
  }
});