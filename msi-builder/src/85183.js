exports.default = undefined;
var i = require("./58664.js");
var o = T(require("./68374.js"));
var a = require("./47617.js");
var r = require("./13306.js");
var s = require("./58201.js");
var l = require("./35922.js");
var u = require("./48604.js");
var d = T(require("./52609.js"));
var c = T(require("./97218.js"));
var h = T(require("./99393.js"));
var f = T(require("./93288.js"));
var p = T(require("./14390.js"));
var g = require("./87110.js");
var m = require("./74320.js");
var _ = require("./10612.js");
var v = require("./83553.js");
var y = require("./30631.js");
var b = require("./32679.js");
var x = require("./28990.js");
var w = require("./23638.js");
var C = require("./73630.js");
var S = require("./87367.js");
var k = require("./21347.js");
var D = require("./28512.js");
var I = T(require("./13615.js"));
function T(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function E(e, t) {
  return (E = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var O = (0, s.getWindow)();
var A = function (e) {
  var t;
  var n;
  function s() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  E(t, n);
  var h = s.prototype;
  h._init = function () {
    e.prototype._init.call(this);
    I.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    this._initGantt();
    this._isGanttRendered = false;
    this._initHelpers();
  };
  h._initGantt = function () {
    this._refreshDataSources();
  };
  h._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this.$element().addClass("dx-gantt");
    this._$toolbarWrapper = (0, o.default)("<div>").addClass("dx-gantt-toolbar-wrapper").appendTo(this.$element());
    this._$toolbar = (0, o.default)("<div>").appendTo(this._$toolbarWrapper);
    this._$mainWrapper = (0, o.default)("<div>").addClass("dx-gantt-main-wrapper").appendTo(this.$element());
    this._$treeListWrapper = (0, o.default)("<div>").addClass("dx-gantt-treelist-wrapper").appendTo(this._$mainWrapper);
    this._$treeList = (0, o.default)("<div>").appendTo(this._$treeListWrapper);
    this._$splitter = (0, o.default)("<div>").appendTo(this._$mainWrapper);
    this._$ganttView = (0, o.default)("<div>").addClass("dx-gantt-view").appendTo(this._$mainWrapper);
    this._$dialog = (0, o.default)("<div>").appendTo(this.$element());
    this._$loadPanel = (0, o.default)("<div>").appendTo(this.$element());
    this._$contextMenu = (0, o.default)("<div>").appendTo(this.$element());
  };
  h._clean = function () {
    var t;
    if ((t = this._ganttView) !== null && t !== undefined) {
      t._ganttViewCore.cleanMarkup();
    }
    delete this._ganttView;
    delete this._dialogInstance;
    delete this._loadPanel;
    delete this._exportHelper;
    e.prototype._clean.call(this);
  };
  h._refresh = function () {
    this._isGanttRendered = false;
    this._contentReadyRaised = false;
    e.prototype._refresh.call(this);
  };
  h._fireContentReadyAction = function () {
    if (!this._contentReadyRaised) {
      e.prototype._fireContentReadyAction.call(this);
    }
    this._contentReadyRaised = true;
  };
  h._dimensionChanged = function () {
    var e;
    if ((e = this._ganttView) !== null && e !== undefined) {
      e._onDimensionChanged();
    }
  };
  h._visibilityChanged = function (e) {
    if (e) {
      this._refreshGantt();
    }
  };
  h._refreshGantt = function () {
    this._refreshDataSources();
    this._refresh();
  };
  h._refreshDataSources = function () {
    this._refreshDataSource("tasks");
    this._refreshDataSource("dependencies");
    this._refreshDataSource("resources");
    this._refreshDataSource("resourceAssignments");
  };
  h._renderContent = function () {
    this._isMainElementVisible = this.$element().is(":visible");
    if (this._isMainElementVisible && !this._isGanttRendered) {
      this._isGanttRendered = true;
      this._renderBars();
      this._renderTreeList();
      this._renderSplitter();
    }
  };
  h._renderTreeList = function () {
    this._ganttTreeList = new S.GanttTreeList(this);
    this._treeList = this._ganttTreeList.getTreeList();
    this._ganttTreeList.onAfterTreeListCreate();
  };
  h._renderSplitter = function () {
    var e = this;
    this._splitter = this._createComponent(this._$splitter, f.default, {
      container: this.$element(),
      leftElement: this._$treeListWrapper,
      rightElement: this._$ganttView,
      onApplyPanelSize: function (t) {
        e._sizeHelper.onApplyPanelSize(t);
      }
    });
    this._splitter.option("initialLeftPanelWidth", this.option("taskListWidth"));
  };
  h._renderBars = function () {
    this._bars = [];
    this._toolbar = new C.GanttToolbar(this._$toolbar, this);
    this._updateToolbarContent();
    this._bars.push(this._toolbar);
    this._contextMenuBar = new C.GanttContextMenuBar(this._$contextMenu, this);
    this._updateContextMenu();
    this._bars.push(this._contextMenuBar);
  };
  h._initHelpers = function () {
    this._mappingHelper = new b.GanttMappingHelper(this);
    this._customFieldsManager = new m.GanttCustomFieldsManager(this);
    this._actionsManager = new g.GanttActionsManager(this);
    this._ganttTemplatesManager = new w.GanttTemplatesManager(this);
    this._sizeHelper = new x.GanttSizeHelper(this);
    this._dataProcessingHelper = new D.GanttDataChangesProcessingHelper();
  };
  h._initGanttView = function () {
    var e = this;
    this._ganttView ||= this._createComponent(this._$ganttView, k.GanttView, {
      width: "100%",
      height: this._ganttTreeList.getOffsetHeight(),
      rowHeight: this._ganttTreeList.getRowHeight(),
      headerHeight: this._ganttTreeList.getHeaderHeight(),
      tasks: this._tasks,
      dependencies: this._dependencies,
      resources: this._resources,
      resourceAssignments: this._resourceAssignments,
      allowSelection: this.option("allowSelection"),
      selectedRowKey: this.option("selectedRowKey"),
      showResources: this.option("showResources"),
      showDependencies: this.option("showDependencies"),
      startDateRange: this.option("startDateRange"),
      endDateRange: this.option("endDateRange"),
      taskTitlePosition: this.option("taskTitlePosition"),
      firstDayOfWeek: this.option("firstDayOfWeek"),
      showRowLines: this.option("showRowLines"),
      scaleType: this.option("scaleType"),
      scaleTypeRange: this.option("scaleTypeRange"),
      editing: this.option("editing"),
      validation: this.option("validation"),
      stripLines: this.option("stripLines"),
      bars: this._bars,
      mainElement: this.$element(),
      onSelectionChanged: function (t) {
        e._ganttTreeList.selectRows(y.GanttHelper.getArrayFromOneElement(t.id));
      },
      onViewTypeChanged: function (t) {
        e._onViewTypeChanged(t.type);
      },
      onScroll: function (t) {
        e._ganttTreeList.scrollBy(t.scrollTop);
      },
      onDialogShowing: this._showDialog.bind(this),
      onPopupMenuShowing: this._showPopupMenu.bind(this),
      onPopupMenuHiding: this._hidePopupMenu.bind(this),
      onExpandAll: this._expandAll.bind(this),
      onCollapseAll: this._collapseAll.bind(this),
      modelChangesListener: u.ModelChangesListener.create(this),
      exportHelper: this._getExportHelper(),
      taskTooltipContentTemplate: this._ganttTemplatesManager.getTaskTooltipContentTemplateFunc(this.option("taskTooltipContentTemplate")),
      taskProgressTooltipContentTemplate: this._ganttTemplatesManager.getTaskProgressTooltipContentTemplateFunc(this.option("taskProgressTooltipContentTemplate")),
      taskTimeTooltipContentTemplate: this._ganttTemplatesManager.getTaskTimeTooltipContentTemplateFunc(this.option("taskTimeTooltipContentTemplate")),
      taskContentTemplate: this._ganttTemplatesManager.getTaskContentTemplateFunc(this.option("taskContentTemplate")),
      onTaskClick: function (t) {
        e._ganttTreeList.onRowClick(t);
      },
      onTaskDblClick: function (t) {
        e._ganttTreeList.onRowDblClick(t);
      },
      onAdjustControl: function () {
        e._sizeHelper.onAdjustControl();
      },
      onContentReady: this._onGanttViewContentReady.bind(this)
    });
  };
  h._onGanttViewContentReady = function (e) {
    if (!this._isParentAutoUpdateMode()) {
      this._fireContentReadyAction();
    }
  };
  h._isParentAutoUpdateMode = function () {
    return this.option("validation.autoUpdateParentTasks");
  };
  h._onTreeListContentReady = function (e) {
    if (this._isParentAutoUpdateMode() && this._treeListParentRecalculatedDataUpdating) {
      this._fireContentReadyAction();
    }
    delete this._treeListParentRecalculatedDataUpdating;
    this._dataProcessingHelper.onTreeListReady();
  };
  h._onViewTypeChanged = function (e) {
    this.option("scaleType", this._actionsManager._getScaleType(e));
  };
  h._refreshDataSource = function (e) {
    var t = this;
    var n = this[`_${e}Option`];
    if (n) {
      n.dispose();
      delete this[`_${e}Option`];
      delete this[`_${e}`];
    }
    (n = new d.default(e, this._getLoadPanel.bind(this), function (e, n) {
      t._dataSourceChanged(e, n);
    })).option("dataSource", this._getSpecificDataSourceOption(e));
    n._refreshDataSource();
    this[`_${e}Option`] = n;
  };
  h._getSpecificDataSourceOption = function (e) {
    var t = this.option(`${e}.dataSource`);
    if (!t || Array.isArray(t)) {
      return {
        store: {
          type: "array",
          data: t ?? [],
          key: this.option(`${e}.keyExpr`)
        }
      };
    } else {
      return t;
    }
  };
  h._dataSourceChanged = function (e, t) {
    var n = y.GanttHelper.compileGettersByOption(this.option(e));
    var i = this._validateSourceData(e, t);
    var o = i.map(y.GanttHelper.prepareMapHandler(n));
    this[`_${e}`] = o;
    this._setGanttViewOption(e, o);
    if (e === "tasks") {
      var a;
      var r;
      var s;
      this._tasksRaw = i;
      var l = ((a = this._ganttTreeList) === null || a === undefined || !a.getDataSource()) && !this._ganttView;
      if ((r = this._ganttTreeList) !== null && r !== undefined) {
        r.saveExpandedKeys();
      }
      if ((s = this._ganttTreeList) !== null && s !== undefined) {
        s.updateDataSource(i, l);
      }
    }
  };
  h._validateSourceData = function (e, t) {
    if (t && e === "tasks") {
      return this._validateTaskData(t);
    } else {
      return t;
    }
  };
  h._validateTaskData = function (e) {
    var n = (0, a.compileGetter)(this.option(`tasks.keyExpr`));
    var i = (0, a.compileGetter)(this.option(`tasks.parentIdExpr`));
    var o = this.option("rootValue") ?? "dx_dxt_gantt_default_root_value";
    var r = {};
    for (var s = 0; s < e.length; s++) {
      var l = e[s];
      if (l) {
        var d = n(l);
        var c = d === o;
        var h = r[d] ??= {
          key: d,
          children: []
        };
        if (!c) {
          var g = i(l) ?? o;
          var m = r[g] ??= {
            key: g,
            children: []
          };
          m.children.push(h);
          h.parent = m;
        }
      }
    }
    var _ = [o];
    this._appendChildKeys(r[o], _);
    return e.filter(function (e) {
      return _.indexOf(n(e)) > -1;
    });
  };
  h._appendChildKeys = function (e, t) {
    for (var n = e == null ? undefined : e.children, i = 0; i < (n == null ? undefined : n.length); i++) {
      var o = n[i];
      t.push(o.key);
      this._appendChildKeys(o, t);
    }
  };
  h._onRecordInserted = function (e, t, n) {
    var i = this;
    var o = this[`_${e}Option`];
    if (o) {
      var r = y.GanttHelper.getStoreObject(this.option(e), t);
      var s = e === "tasks";
      if (s) {
        this._customFieldsManager.addCustomFieldsDataFromCache("gantt_new_task_key", r);
      }
      o.insert(r, function (l) {
        var u = (0, a.compileGetter)(i.option(`${e}.keyExpr`))(l);
        n(u);
        i._executeFuncSetters(e, t, u);
        i._dataProcessingHelper.addCompletionAction(function () {
          i._actionsManager.raiseInsertedAction(e, r, u);
        }, true, s);
        i._ganttTreeList.saveExpandedKeys();
        o._reloadDataSource().done(function (e) {
          if (s) {
            i._ganttTreeList.onTaskInserted(u, t.parentId);
          }
        });
      });
    }
  };
  h._onRecordUpdated = function (e, t, n) {
    var i = this;
    var o = this[`_${e}Option`];
    var a = e === "tasks";
    if (o) {
      var r = this._mappingHelper.convertCoreToMappedData(e, n);
      if (a && this._customFieldsManager.cache.hasData(t)) {
        this._customFieldsManager.addCustomFieldsDataFromCache(t, r);
      }
      o.update(t, r, function () {
        i._executeFuncSetters(e, n, t);
        i._ganttTreeList.saveExpandedKeys();
        i._dataProcessingHelper.addCompletionAction(function () {
          i._actionsManager.raiseUpdatedAction(e, r, t);
        }, true, a);
        o._reloadDataSource();
      });
    }
  };
  h._onRecordRemoved = function (e, t, n) {
    var i = this;
    var o = this[`_${e}Option`];
    if (o) {
      o.remove(t, function () {
        i._ganttTreeList.saveExpandedKeys();
        i._dataProcessingHelper.addCompletionAction(function () {
          i._actionsManager.raiseDeletedAction(e, t, i._mappingHelper.convertCoreToMappedData(e, n));
        }, true, e === "tasks");
        o._reloadDataSource();
      });
    }
  };
  h._onParentTaskUpdated = function (e) {
    var t = this.getTaskDataByCoreData(e);
    this._actionsManager.raiseUpdatedAction("tasks", t, e.id);
  };
  h._onParentTasksRecalculated = function (e) {
    var t = this;
    if (!this.isSieving) {
      var n = y.GanttHelper.compileSettersByOption(this.option("tasks"));
      var i = this._customFieldsManager.appendCustomFields(e.map(y.GanttHelper.prepareSetterMapHandler(n)));
      setTimeout(function () {
        var e;
        t._treeListParentRecalculatedDataUpdating = true;
        if ((e = t._ganttTreeList) !== null && e !== undefined) {
          e.setDataSource(i);
        }
      });
    }
    this.isSieving = false;
  };
  h._onGanttViewCoreUpdated = function () {
    this._dataProcessingHelper.onGanttViewReady();
  };
  h._executeFuncSetters = function (e, t, n) {
    var i = y.GanttHelper.compileFuncSettersByOption(this.option(e));
    var o = Object.keys(i).filter(function (e) {
      return (0, l.isDefined)(t[e]);
    });
    if (o.length > 0) {
      var a = this._getDataSourceItem(e, n);
      o.forEach(function (e) {
        (0, i[e])(a, t[e]);
      });
    }
  };
  h._sortAndFilter = function () {
    var i = this._treeList;
    var o = i.getVisibleColumns();
    var a = o.filter(function (e) {
      return e.sortIndex > -1;
    });
    var r = a.map(function (e) {
      return {
        sortIndex: e.sortIndex,
        sortOrder: e.sortOrder
      };
    });
    var s = !this._compareSortedState(this._savedSortFilterState?.sort, r);
    var u = i.option("filterValue");
    var d = i.option("expandNodesOnFiltering") && u !== this._savedSortFilterState?.filter;
    var c = a[0] || o.filter(function (e) {
      return (0, l.isDefined)(e.filterValue) || e.filterValues?.length;
    })[0];
    var h = this._savedSortFilterState?.sieveColumn && !c;
    if (c || h) {
      var f = c && {
        sievedItems: this._ganttTreeList.getSievedItems(),
        sieveColumn: c,
        expandTasks: d || u && s
      };
      this.isSieving = !h;
      this._setGanttViewOption("sieve", f);
    }
    this._savedSortFilterState = {
      sort: r,
      filter: u,
      sieveColumn: c
    };
  };
  h._compareSortedState = function (e, t) {
    return !!e && !!t && e.length === t.length && e.every(function (e, n) {
      return e.sortIndex === t[n].sortIndex && e.sortOrder === t[n].sortOrder;
    });
  };
  h._getToolbarItems = function () {
    var e = this.option("toolbar.items");
    return e || [];
  };
  h._updateToolbarContent = function () {
    var e = this._getToolbarItems();
    if (e.length) {
      this._$toolbarWrapper.show();
    } else {
      this._$toolbarWrapper.hide();
    }
    if (this._toolbar) {
      this._toolbar.createItems(e);
    }
    this._updateBarItemsState();
  };
  h._updateContextMenu = function () {
    var e = this.option("contextMenu");
    if (e.enabled && this._contextMenuBar) {
      this._contextMenuBar.createItems(e.items);
      this._updateBarItemsState();
    }
  };
  h._updateBarItemsState = function () {
    if (this._ganttView) {
      this._ganttView.updateBarItemsState();
    }
  };
  h._showDialog = function (e) {
    this._dialogInstance ||= new _.GanttDialog(this, this._$dialog);
    this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option("editing"));
  };
  h._showPopupMenu = function (e) {
    if (this.option("contextMenu.enabled")) {
      this._ganttView.getBarManager().updateContextMenu();
      var t = {
        cancel: false,
        event: e.event,
        targetType: e.type,
        targetKey: e.key,
        items: (0, r.extend)(true, [], this._contextMenuBar._items),
        data: e.type === "task" ? this.getTaskData(e.key) : this.getDependencyData(e.key)
      };
      this._actionsManager.raiseContextMenuPreparing(t);
      if (!t.cancel) {
        this._contextMenuBar.show(e.position, t.items);
      }
    }
  };
  h._hidePopupMenu = function () {
    this._contextMenuBar.hide();
  };
  h._getLoadPanel = function () {
    this._loadPanel ||= this._createComponent(this._$loadPanel, c.default, {
      position: {
        of: this.$element()
      }
    });
    return this._loadPanel;
  };
  h._getTaskKeyGetter = function () {
    return this._getDataSourceItemKeyGetter("tasks");
  };
  h._findTaskByKey = function (e) {
    return this._getDataSourceItem("tasks", e);
  };
  h._getDataSourceItem = function (e, t) {
    var n = this[`_${e}Option`];
    var i = this._getDataSourceItemKeyGetter(e);
    return (n == null ? undefined : n._getItems()).find(function (e) {
      return i(e) === t;
    });
  };
  h._getDataSourceItemKeyGetter = function (e) {
    return (0, a.compileGetter)(this.option(`${e}.keyExpr`));
  };
  h._setGanttViewOption = function (e, t) {
    if (this._ganttView) {
      this._ganttView.option(e, t);
    }
  };
  h._getGanttViewOption = function (e, t) {
    var n;
    if ((n = this._ganttView) === null || n === undefined) {
      return undefined;
    } else {
      return n.option(e);
    }
  };
  h._getExportHelper = function () {
    var e;
    if ((e = this._exportHelper) === null || e === undefined) {
      this._exportHelper = new v.GanttExportHelper(this);
    }
    return this._exportHelper;
  };
  h._executeCoreCommand = function (e) {
    this._ganttView.executeCoreCommand(e);
  };
  h._expandAll = function () {
    this._changeExpandAll(true);
  };
  h._collapseAll = function () {
    this._changeExpandAll(false);
  };
  h._onTreeListRowExpandChanged = function (e, t) {
    if (!this._lockRowExpandEvent) {
      this._ganttView.changeTaskExpanded(e.key, t);
      this._sizeHelper.adjustHeight();
    }
  };
  h._changeExpandAll = function (e, t, n) {
    var i;
    var o;
    var a = this;
    var r = [];
    var s = [];
    this._treeList.forEachNode(function (e) {
      var t;
      if ((t = e.children) !== null && t !== undefined && t.length) {
        r.push(e);
      }
    });
    if (n) {
      var l = this._treeList.getNodeByKey(n);
      y.GanttHelper.getAllParentNodesKeys(l, s);
    }
    this._lockRowExpandEvent = r.length > 0;
    var u = r.reduce(function (i, l, u) {
      if (n) {
        e = s.includes(l.key);
      } else if (t) {
        e = l.level < t;
      }
      i[l.key] = e;
      var d = e ? a._treeList.expandRow : a._treeList.collapseRow;
      if (u === r.length - 1) {
        o = d(l.key);
      } else {
        d(l.key);
      }
      return i;
    }, {});
    if ((i = o) !== null && i !== undefined) {
      i.then(function () {
        a._ganttView.applyTasksExpandedState(u);
        a._sizeHelper.adjustHeight();
        delete a._lockRowExpandEvent;
      });
    }
  };
  h.getTaskResources = function (e) {
    var t = this;
    if ((0, l.isDefined)(e)) {
      return this._ganttView._ganttViewCore.getTaskResources(e).map(function (e) {
        return t._mappingHelper.convertCoreToMappedData("resources", e);
      });
    } else {
      return null;
    }
  };
  h.getVisibleTaskKeys = function () {
    return this._ganttView._ganttViewCore.getVisibleTaskKeys();
  };
  h.getVisibleDependencyKeys = function () {
    return this._ganttView._ganttViewCore.getVisibleDependencyKeys();
  };
  h.getVisibleResourceKeys = function () {
    return this._ganttView._ganttViewCore.getVisibleResourceKeys();
  };
  h.getVisibleResourceAssignmentKeys = function () {
    return this._ganttView._ganttViewCore.getVisibleResourceAssignmentKeys();
  };
  h.getTaskData = function (e) {
    if (!(0, l.isDefined)(e)) {
      return null;
    }
    var t = this._ganttView._ganttViewCore.getTaskData(e);
    return this.getTaskDataByCoreData(t);
  };
  h.getTaskDataByCoreData = function (e) {
    var t = e ? this._mappingHelper.convertCoreToMappedData("tasks", e) : null;
    this._customFieldsManager.addCustomFieldsData(e.id, t);
    return t;
  };
  h.insertTask = function (e) {
    this._customFieldsManager.saveCustomFieldsDataToCache("gantt_new_task_key", e);
    this._ganttView._ganttViewCore.insertTask(this._mappingHelper.convertMappedToCoreData("tasks", e));
  };
  h.deleteTask = function (e) {
    this._ganttView._ganttViewCore.deleteTask(e);
  };
  h.updateTask = function (e, t) {
    var n = this._mappingHelper.convertMappedToCoreData("tasks", t);
    var i = !Object.keys(n).length;
    this._customFieldsManager.saveCustomFieldsDataToCache(e, t, true, i);
    if (i) {
      var o = this._customFieldsManager._getCustomFieldsData(t);
      if (Object.keys(o).length > 0) {
        this._actionsManager.raiseUpdatingAction("tasks", {
          cancel: false,
          key: e,
          newValues: {}
        });
      }
    } else {
      this._ganttView._ganttViewCore.updateTask(e, n);
    }
  };
  h.getDependencyData = function (e) {
    if (!(0, l.isDefined)(e)) {
      return null;
    }
    var t = this._ganttView._ganttViewCore.getDependencyData(e);
    if (t) {
      return this._mappingHelper.convertCoreToMappedData("dependencies", t);
    } else {
      return null;
    }
  };
  h.insertDependency = function (e) {
    this._ganttView._ganttViewCore.insertDependency(this._mappingHelper.convertMappedToCoreData("dependencies", e));
  };
  h.deleteDependency = function (e) {
    this._ganttView._ganttViewCore.deleteDependency(e);
  };
  h.getResourceData = function (e) {
    var t = this._ganttView._ganttViewCore.getResourceData(e);
    if (t) {
      return this._mappingHelper.convertCoreToMappedData("resources", t);
    } else {
      return null;
    }
  };
  h.deleteResource = function (e) {
    this._ganttView._ganttViewCore.deleteResource(e);
  };
  h.insertResource = function (e, t) {
    this._ganttView._ganttViewCore.insertResource(this._mappingHelper.convertMappedToCoreData("resources", e), t);
  };
  h.getResourceAssignmentData = function (e) {
    var t = this._ganttView._ganttViewCore.getResourceAssignmentData(e);
    if (t) {
      return this._mappingHelper.convertCoreToMappedData("resourceAssignments", t);
    } else {
      return null;
    }
  };
  h.assignResourceToTask = function (e, t) {
    this._ganttView._ganttViewCore.assignResourceToTask(e, t);
  };
  h.unassignResourceFromTask = function (e, t) {
    this._ganttView._ganttViewCore.unassignResourceFromTask(e, t);
  };
  h.unassignAllResourcesFromTask = function (e) {
    this._ganttView._ganttViewCore.unassignAllResourcesFromTask(e);
  };
  h.updateDimensions = function () {
    this._sizeHelper.onAdjustControl();
  };
  h.scrollToDate = function (e) {
    this._ganttView._ganttViewCore.scrollToDate(e);
  };
  h.showResourceManagerDialog = function () {
    this._ganttView._ganttViewCore.showResourcesDialog();
  };
  h.showTaskDetailsDialog = function (e) {
    this._ganttView._ganttViewCore.showTaskDetailsDialog(e);
  };
  h.exportToPdf = function (e) {
    return this._exportToPdf(e);
  };
  h._exportToPdf = function (e) {
    var t;
    var n;
    var a;
    var s = this;
    this._exportHelper.reset();
    var l = (0, r.extend)({}, e);
    if (l.createDocumentMethod) {
      l.docCreateMethod = l.createDocumentMethod;
    }
    if ((t = l.pdfDocument) === null || t === undefined) {
      l.pdfDocument = l.jsPDFDocument;
    }
    if ((n = l.docCreateMethod) === null || n === undefined) {
      l.docCreateMethod = O.jspdf?.jsPDF ?? O.jsPDF;
    }
    if ((a = l.format) === null || a === undefined) {
      l.format = "a4";
    }
    return new Promise(function (e) {
      var t;
      e((t = s._ganttView) === null || t === undefined ? undefined : t._ganttViewCore.exportToPdf(l));
    });
  };
  h.refresh = function () {
    var e = this;
    return new Promise(function (t, n) {
      try {
        e._refreshGantt();
        t();
      } catch (e) {
        n(e.message);
      }
    });
  };
  h.expandAll = function () {
    this._expandAll();
  };
  h.collapseAll = function () {
    this._collapseAll();
  };
  h.expandAllToLevel = function (e) {
    this._changeExpandAll(false, e);
  };
  h.expandToTask = function (e) {
    var t;
    var n = this._treeList.getNodeByKey(e);
    this._changeExpandAll(false, 0, n == null || (t = n.parent) === null || t === undefined ? undefined : t.key);
  };
  h.collapseTask = function (e) {
    this._treeList.collapseRow(e);
  };
  h.expandTask = function (e) {
    this._treeList.expandRow(e);
  };
  h.showResources = function (e) {
    this.option("showResources", e);
  };
  h.showDependencies = function (e) {
    this.option("showDependencies", e);
  };
  h.zoomIn = function () {
    this._ganttView._ganttViewCore.zoomIn();
  };
  h.zoomOut = function () {
    this._ganttView._ganttViewCore.zoomOut();
  };
  h._getDefaultOptions = function () {
    return (0, r.extend)(e.prototype._getDefaultOptions.call(this), y.GanttHelper.getDefaultOptions());
  };
  h._optionChanged = function (t) {
    var n;
    var o;
    var a;
    var r;
    var s;
    var l;
    var u;
    var d;
    var c;
    var h;
    var f;
    var p;
    var g;
    var m;
    var _;
    var v;
    var b;
    var x;
    var w;
    var C;
    var S;
    var k;
    var D;
    var I;
    var T;
    var E;
    var O;
    var A;
    var P;
    var M;
    var R;
    var B;
    var L;
    var V;
    var F;
    var H;
    var N;
    var z;
    var j;
    var W;
    var G;
    var q;
    switch (t.name) {
      case "tasks":
        this._refreshDataSource("tasks");
        break;
      case "dependencies":
        this._refreshDataSource("dependencies");
        break;
      case "resources":
        this._refreshDataSource("resources");
        break;
      case "resourceAssignments":
        this._refreshDataSource("resourceAssignments");
        break;
      case "columns":
        if ((n = this._ganttTreeList) !== null && n !== undefined) {
          n.setOption("columns", this._ganttTreeList.getColumns());
        }
        break;
      case "taskListWidth":
        if ((o = this._sizeHelper) !== null && o !== undefined) {
          o.setInnerElementsWidth();
        }
        break;
      case "showResources":
        this._setGanttViewOption("showResources", t.value);
        break;
      case "showDependencies":
        this._setGanttViewOption("showDependencies", t.value);
        break;
      case "taskTitlePosition":
        this._setGanttViewOption("taskTitlePosition", t.value);
        break;
      case "firstDayOfWeek":
        this._setGanttViewOption("firstDayOfWeek", t.value);
        break;
      case "startDateRange":
        this._setGanttViewOption("startDateRange", t.value);
        break;
      case "endDateRange":
        this._setGanttViewOption("endDateRange", t.value);
        break;
      case "selectedRowKey":
        if ((a = this._ganttTreeList) !== null && a !== undefined) {
          a.selectRows(y.GanttHelper.getArrayFromOneElement(t.value));
        }
        break;
      case "onSelectionChanged":
        if ((r = this._actionsManager) !== null && r !== undefined) {
          r.createSelectionChangedAction();
        }
        break;
      case "onTaskClick":
        if ((s = this._actionsManager) !== null && s !== undefined) {
          s.createTaskClickAction();
        }
        break;
      case "onTaskDblClick":
        if ((l = this._actionsManager) !== null && l !== undefined) {
          l.createTaskDblClickAction();
        }
        break;
      case "onTaskInserting":
        if ((u = this._actionsManager) !== null && u !== undefined) {
          u.createTaskInsertingAction();
        }
        break;
      case "onTaskInserted":
        if ((d = this._actionsManager) !== null && d !== undefined) {
          d.createTaskInsertedAction();
        }
        break;
      case "onTaskDeleting":
        if ((c = this._actionsManager) !== null && c !== undefined) {
          c.createTaskDeletingAction();
        }
        break;
      case "onTaskDeleted":
        if ((h = this._actionsManager) !== null && h !== undefined) {
          h.createTaskDeletedAction();
        }
        break;
      case "onTaskUpdating":
        if ((f = this._actionsManager) !== null && f !== undefined) {
          f.createTaskUpdatingAction();
        }
        break;
      case "onTaskUpdated":
        if ((p = this._actionsManager) !== null && p !== undefined) {
          p.createTaskUpdatedAction();
        }
        break;
      case "onTaskMoving":
        if ((g = this._actionsManager) !== null && g !== undefined) {
          g.createTaskMovingAction();
        }
        break;
      case "onTaskEditDialogShowing":
        if ((m = this._actionsManager) !== null && m !== undefined) {
          m.createTaskEditDialogShowingAction();
        }
        break;
      case "onResourceManagerDialogShowing":
        if ((_ = this._actionsManager) !== null && _ !== undefined) {
          _.createResourceManagerDialogShowingAction();
        }
        break;
      case "onDependencyInserting":
        if ((v = this._actionsManager) !== null && v !== undefined) {
          v.createDependencyInsertingAction();
        }
        break;
      case "onDependencyInserted":
        if ((b = this._actionsManager) !== null && b !== undefined) {
          b.createDependencyInsertedAction();
        }
        break;
      case "onDependencyDeleting":
        if ((x = this._actionsManager) !== null && x !== undefined) {
          x.createDependencyDeletingAction();
        }
        break;
      case "onDependencyDeleted":
        if ((w = this._actionsManager) !== null && w !== undefined) {
          w.createDependencyDeletedAction();
        }
        break;
      case "onResourceInserting":
        if ((C = this._actionsManager) !== null && C !== undefined) {
          C.createResourceInsertingAction();
        }
        break;
      case "onResourceInserted":
        if ((S = this._actionsManager) !== null && S !== undefined) {
          S.createResourceInsertedAction();
        }
        break;
      case "onResourceDeleting":
        if ((k = this._actionsManager) !== null && k !== undefined) {
          k.createResourceDeletingAction();
        }
        break;
      case "onResourceDeleted":
        if ((D = this._actionsManager) !== null && D !== undefined) {
          D.createResourceDeletedAction();
        }
        break;
      case "onResourceAssigning":
        if ((I = this._actionsManager) !== null && I !== undefined) {
          I.createResourceAssigningAction();
        }
        break;
      case "onResourceAssigned":
        if ((T = this._actionsManager) !== null && T !== undefined) {
          T.createResourceAssignedAction();
        }
        break;
      case "onResourceUnassigning":
        if ((E = this._actionsManager) !== null && E !== undefined) {
          E.createResourceUnassigningAction();
        }
        break;
      case "onResourceUnassigned":
        if ((O = this._actionsManager) !== null && O !== undefined) {
          O.createResourceUnassignedAction();
        }
        break;
      case "onCustomCommand":
        if ((A = this._actionsManager) !== null && A !== undefined) {
          A.createCustomCommandAction();
        }
        break;
      case "onContextMenuPreparing":
        if ((P = this._actionsManager) !== null && P !== undefined) {
          P.createContextMenuPreparingAction();
        }
        break;
      case "onScaleCellPrepared":
        if ((M = this._actionsManager) !== null && M !== undefined) {
          M.createScaleCellPreparedAction();
        }
        break;
      case "allowSelection":
        if ((R = this._ganttTreeList) !== null && R !== undefined) {
          R.setOption("selection.mode", y.GanttHelper.getSelectionMode(t.value));
        }
        this._setGanttViewOption("allowSelection", t.value);
        break;
      case "showRowLines":
        if ((B = this._ganttTreeList) !== null && B !== undefined) {
          B.setOption("showRowLines", t.value);
        }
        this._setGanttViewOption("showRowLines", t.value);
        break;
      case "stripLines":
        this._setGanttViewOption("stripLines", t.value);
        break;
      case "scaleType":
        this._setGanttViewOption("scaleType", t.value);
        break;
      case "scaleTypeRange":
        this._setGanttViewOption("scaleTypeRange", this.option(t.name));
        break;
      case "editing":
        this._setGanttViewOption("editing", this.option(t.name));
        break;
      case "validation":
        this._setGanttViewOption("validation", this.option(t.name));
        break;
      case "toolbar":
        this._updateToolbarContent();
        break;
      case "contextMenu":
        this._updateContextMenu();
        break;
      case "taskTooltipContentTemplate":
        this._setGanttViewOption("taskTooltipContentTemplate", (L = this._ganttTemplatesManager) === null || L === undefined ? undefined : L.getTaskTooltipContentTemplateFunc(t.value));
        break;
      case "taskProgressTooltipContentTemplate":
        this._setGanttViewOption("taskProgressTooltipContentTemplate", (V = this._ganttTemplatesManager) === null || V === undefined ? undefined : V.getTaskProgressTooltipContentTemplateFunc(t.value));
        break;
      case "taskTimeTooltipContentTemplate":
        this._setGanttViewOption("taskTimeTooltipContentTemplate", (F = this._ganttTemplatesManager) === null || F === undefined ? undefined : F.getTaskTimeTooltipContentTemplateFunc(t.value));
        break;
      case "taskContentTemplate":
        this._setGanttViewOption("taskContentTemplate", (H = this._ganttTemplatesManager) === null || H === undefined ? undefined : H.getTaskContentTemplateFunc(t.value));
        break;
      case "rootValue":
        if ((N = this._ganttTreeList) !== null && N !== undefined) {
          N.setOption("rootValue", t.value);
        }
        break;
      case "width":
        e.prototype._optionChanged.call(this, t);
        if ((z = this._sizeHelper) !== null && z !== undefined) {
          z.updateGanttWidth();
        }
        break;
      case "height":
        e.prototype._optionChanged.call(this, t);
        if ((j = this._sizeHelper) !== null && j !== undefined) {
          j.setGanttHeight((0, i.getHeight)(this._$element));
        }
        break;
      case "sorting":
        if ((W = this._ganttTreeList) !== null && W !== undefined) {
          W.setOption("sorting", this.option(t.name));
        }
        break;
      case "filterRow":
        if ((G = this._ganttTreeList) !== null && G !== undefined) {
          G.setOption("filterRow", this.option(t.name));
        }
        break;
      case "headerFilter":
        if ((q = this._ganttTreeList) !== null && q !== undefined) {
          q.setOption("headerFilter", this.option(t.name));
        }
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return s;
}(p.default);
(0, h.default)("dxGantt", A);
var P = A;
exports.default = P;
module.exports = exports.default;
module.exports.default = exports.default;