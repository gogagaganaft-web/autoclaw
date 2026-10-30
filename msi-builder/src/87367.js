exports.GanttTreeList = undefined;
var i = require("./58664.js");
var o = f(require("./68374.js"));
var a = f(require("./82655.js"));
var r = require("./37518.js");
var s = require("./35922.js");
var l = require("./30631.js");
var u = require("./85273.js");
var d = f(require("./26562.js"));
var c = require("./47617.js");
var h = require("./11012.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p = function () {
  function e(e) {
    this._gantt = e;
    this._$treeList = this._gantt._$treeList;
  }
  var t = e.prototype;
  t.getTreeList = function () {
    var e = this;
    var t = this._gantt.option("tasks");
    var n = t.keyExpr;
    var i = t.parentIdExpr;
    this._treeList = this._gantt._createComponent(this._$treeList, a.default, {
      dataSource: this.createDataSource(this._gantt._tasksRaw, n),
      keyExpr: n,
      filterSyncEnabled: true,
      parentIdExpr: i,
      columns: this.getColumns(),
      columnResizingMode: "nextColumn",
      height: this._getHeight(),
      width: this._gantt.option("taskListWidth"),
      selection: {
        mode: l.GanttHelper.getSelectionMode(this._gantt.option("allowSelection"))
      },
      selectedRowKeys: l.GanttHelper.getArrayFromOneElement(this._gantt.option("selectedRowKey")),
      sorting: this._gantt.option("sorting"),
      filterRow: this._gantt.option("filterRow"),
      headerFilter: this._gantt.option("headerFilter"),
      scrolling: {
        showScrollbar: "onHover",
        mode: "virtual"
      },
      allowColumnResizing: true,
      autoExpandAll: true,
      showRowLines: this._gantt.option("showRowLines"),
      rootValue: this._gantt.option("rootValue"),
      onContentReady: function (t) {
        e._onContentReady(t);
      },
      onSelectionChanged: function (t) {
        e._onSelectionChanged(t);
      },
      onRowCollapsed: function (t) {
        e._onRowCollapsed(t);
      },
      onRowExpanded: function (t) {
        e._onRowExpanded(t);
      },
      onRowPrepared: function (t) {
        e._onRowPrepared(t);
      },
      onContextMenuPreparing: function (t) {
        e._onContextMenuPreparing(t);
      },
      onRowClick: function (t) {
        e.onRowClick(t);
      },
      onRowDblClick: function (t) {
        e.onRowDblClick(t);
      },
      onNodesInitialized: function (t) {
        e._onNodesInitialized(t);
      },
      _disableDeprecationWarnings: true
    });
    return this._treeList;
  };
  t.onAfterTreeListCreate = function () {
    if (this._postponedGanttInitRequired) {
      this._initGanttOnContentReady({
        component: this._treeList
      });
      delete this._postponedGanttInitRequired;
    }
  };
  t._onContentReady = function (e) {
    if (this._treeList) {
      this._initGanttOnContentReady(e);
    } else {
      this._postponedGanttInitRequired = true;
    }
    this._gantt._onTreeListContentReady(e);
  };
  t._initGanttOnContentReady = function (e) {
    if (e.component.getDataSource()) {
      this._gantt._initGanttView();
      this._initScrollSync(e.component);
    }
    this._gantt._sortAndFilter();
    this._gantt._sizeHelper.updateGanttRowHeights();
  };
  t._onSelectionChanged = function (e) {
    var t = e.currentSelectedRowKeys[0];
    this._gantt._setGanttViewOption("selectedRowKey", t);
    this._gantt._setOptionWithoutOptionChange("selectedRowKey", t);
    this._gantt._actionsManager.raiseSelectionChangedAction(t);
  };
  t._onRowCollapsed = function (e) {
    this._gantt._onTreeListRowExpandChanged(e, false);
  };
  t._onRowExpanded = function (e) {
    this._gantt._onTreeListRowExpandChanged(e, true);
  };
  t._onRowPrepared = function (e) {
    if (e.rowType === "data" && e.node.children.length > 0) {
      (0, o.default)(e.rowElement).addClass("dx-gantt-collapsable-row");
    }
  };
  t._onContextMenuPreparing = function (e) {
    if (e.target !== "header") {
      if (e.row?.rowType === "data") {
        this.setOption("selectedRowKeys", [e.row.data[this._gantt.option("tasks.keyExpr")]]);
      }
      e.items = [];
      var i = {
        cancel: false,
        event: e.event,
        type: "task",
        key: e.row?.key,
        position: {
          x: e.event.pageX,
          y: e.event.pageY
        }
      };
      this._gantt._showPopupMenu(i);
    }
  };
  t._getHeight = function () {
    if ((0, i.getHeight)(this._$treeList)) {
      return (0, i.getHeight)(this._$treeList);
    } else {
      this._gantt._hasHeight = (0, s.isDefined)(this._gantt.option("height")) && this._gantt.option("height") !== "";
      if (this._gantt._hasHeight) {
        return "100%";
      } else {
        return "";
      }
    }
  };
  t._initScrollSync = function (e) {
    var t = this;
    var n = e.getScrollable();
    if (n) {
      n.off("scroll");
      n.on("scroll", function (e) {
        t._onScroll(e);
      });
    }
  };
  t._onScroll = function (e) {
    var t = this._gantt._ganttView.getTaskAreaContainer();
    if (t.scrollTop !== e.component.scrollTop()) {
      t.scrollTop = e.component.scrollTop();
    }
  };
  t._correctRowsViewRowHeight = function (e) {
    var t = this._treeList._views && this._treeList._views.rowsView;
    if ((t == null ? undefined : t._rowHeight) !== e) {
      t._rowHeight = e;
    }
  };
  t._skipUpdateTreeListDataSource = function () {
    return this._gantt.option("validation.autoUpdateParentTasks");
  };
  t.selectRows = function (e) {
    this.setOption("selectedRowKeys", e);
  };
  t.scrollBy = function (e) {
    var t = this._treeList.getScrollable();
    if (t) {
      var n = e - t.scrollTop();
      if (n !== 0) {
        t.scrollBy({
          left: 0,
          top: n
        });
      }
    }
  };
  t.updateDataSource = function (e, t = false, n = false) {
    if (!this._skipUpdateTreeListDataSource() || t) {
      this.setDataSource(e);
    } else if (n) {
      var i = this._treeList.option("dataSource");
      this._gantt._onParentTasksRecalculated(i);
    }
  };
  t.setDataSource = function (e) {
    this.setOption("dataSource", this.createDataSource(e));
  };
  t.createDataSource = function (e, t) {
    return e && new u.DataSource({
      store: new d.default({
        data: e,
        key: t || this.getOption("keyExpr")
      })
    });
  };
  t.onRowClick = function (e) {
    this._gantt._actionsManager.raiseTaskClickAction(e.key, e.event);
  };
  t.onRowDblClick = function (e) {
    if (this._gantt._actionsManager.raiseTaskDblClickAction(e.key, e.event)) {
      this._gantt._ganttView._ganttViewCore.showTaskEditDialog();
    }
  };
  t.saveExpandedKeys = function () {
    var e = this._treeList;
    var t = e == null ? undefined : e.getVisibleRows().length;
    if (t > 0) {
      var n = this.getAllNodes();
      var i = this.getOption("expandedRowKeys");
      if (i && n.length !== t) {
        var o = this.getNodesState();
        o.applyNodes(n, this.getOption("rootValue"));
        o.saveExpandedState(i);
      }
    }
  };
  t._onNodesInitialized = function (e) {
    var t = this.getNodesState();
    var n = t.getExpandedKeys();
    var i = this.getAllNodes();
    t.applyNodes(i, this.getOption("rootValue"));
    var o = t.getExpandedKeys();
    if (o) {
      this.setOption("expandedRowKeys", o);
    }
    if (this.isExpandedStateChanged(n, o)) {
      var a = i.reduce(function (e, t) {
        e[t.key] = !o || o.includes(t.key);
        return e;
      }, {});
      this._gantt._ganttView.applyTasksExpandedState(a);
    }
    t.clear();
  };
  t.getNodesState = function () {
    this._nodeState ||= new h.GanttTreeListNodesState();
    return this._nodeState;
  };
  t.getAllNodes = function () {
    var e = this._treeList;
    var t = e == null ? undefined : e.getDataSource().store();
    var n = (0, c.compileGetter)(t == null ? undefined : t.key());
    if (t) {
      return t._array.map(function (t) {
        return e.getNodeByKey(n(t));
      });
    } else {
      return [];
    }
  };
  t.isExpandedStateChanged = function (e, t) {
    return (e !== null || t !== null) && ((e == null ? undefined : e.length) !== (t == null ? undefined : t.length) || e.some(function (e, n) {
      return e !== t[n];
    }));
  };
  t.getOffsetHeight = function () {
    return this._gantt._treeList._$element.get(0).offsetHeight;
  };
  t.getRowHeight = function () {
    var e = this._treeList._$element.find(".dx-data-row");
    var t = e.length ? (0, r.getBoundingRect)(e.last().get(0)).height : 34;
    t ||= 34;
    this._correctRowsViewRowHeight(t);
    return t;
  };
  t.getHeaderHeight = function () {
    return (0, r.getBoundingRect)(this._treeList._$element.find(".dx-treelist-headers").get(0)).height;
  };
  t.getColumns = function () {
    var e = this._gantt.option("columns");
    if (e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t];
        if ((n.dataField === this._gantt.option(`tasks.keyExpr`) || n.dataField === this._gantt.option(`tasks.parentIdExpr`)) && !n.dataType) {
          n.dataType = "object";
        }
      }
    }
    return e;
  };
  t.getSievedItems = function () {
    var e = this._treeList.getRootNode();
    if (e) {
      var t = [];
      l.GanttHelper.convertTreeToList(e, t);
      var n = l.GanttHelper.compileGettersByOption(this._gantt.option("tasks"));
      return this._gantt._validateSourceData("tasks", t).map(l.GanttHelper.prepareMapHandler(n));
    }
  };
  t.setOption = function (e, t) {
    if (this._treeList) {
      this._treeList.option(e, t);
    }
  };
  t.getOption = function (e) {
    var t;
    if ((t = this._treeList) === null || t === undefined) {
      return undefined;
    } else {
      return t.option(e);
    }
  };
  t.onTaskInserted = function (e, t) {
    if ((0, s.isDefined)(t)) {
      var n = this.getOption("expandedRowKeys");
      if (n.indexOf(t) === -1) {
        n.push(t);
        this.setOption("expandedRowKeys", n);
      }
    }
    this.selectRows(l.GanttHelper.getArrayFromOneElement(e));
    this.setOption("focusedRowKey", e);
  };
  t.getDataSource = function () {
    var e;
    if ((e = this._treeList) === null || e === undefined) {
      return undefined;
    } else {
      return e.getDataSource();
    }
  };
  return e;
}();
exports.GanttTreeList = p;