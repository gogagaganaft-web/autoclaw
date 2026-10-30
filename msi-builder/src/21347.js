function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.GanttView = undefined;
var o = f(require("./68374.js"));
var a = f(require("./14390.js"));
var r = require("./70382.js");
var s = require("./77133.js");
var l = f(require("./91500.js"));
var u = require("./35922.js");
var d = f(require("./28109.js"));
var c = require("./68752.js");
var h = f(require("./91331.js"));
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
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
      if (i(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, t || "default");
        if (i(o) !== "object") {
          return o;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(a, "string"), i(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var a;
  var f;
  var m;
  var _ = i.prototype;
  _._init = function () {
    e.prototype._init.call(this);
    this._onSelectionChanged = this._createActionByOption("onSelectionChanged");
    this._onViewTypeChanged = this._createActionByOption("onViewTypeChanged");
    this._onScroll = this._createActionByOption("onScroll");
    this._onDialogShowing = this._createActionByOption("onDialogShowing");
    this._onPopupMenuShowing = this._createActionByOption("onPopupMenuShowing");
    this._onPopupMenuHiding = this._createActionByOption("onPopupMenuHiding");
    this._expandAll = this._createActionByOption("onExpandAll");
    this._collapseAll = this._createActionByOption("onCollapseAll");
    this._taskClick = this._createActionByOption("onTaskClick");
    this._taskDblClick = this._createActionByOption("onTaskDblClick");
    this._onAdjustControl = this._createActionByOption("onAdjustControl");
  };
  _._initMarkup = function () {
    var e = (0, r.getGanttViewCore)();
    this._ganttViewCore = new e(this.$element().get(0), this, {
      showResources: this.option("showResources"),
      showDependencies: this.option("showDependencies"),
      taskTitlePosition: this._getTaskTitlePosition(this.option("taskTitlePosition")),
      firstDayOfWeek: this._getFirstDayOfWeek(this.option("firstDayOfWeek")),
      allowSelectTask: this.option("allowSelection"),
      startDateRange: this.option("startDateRange"),
      endDateRange: this.option("endDateRange"),
      editing: this._parseEditingSettings(this.option("editing")),
      validation: this.option("validation"),
      stripLines: {
        stripLines: this.option("stripLines")
      },
      areHorizontalBordersEnabled: this.option("showRowLines"),
      areAlternateRowsEnabled: false,
      viewType: this._getViewTypeByScaleType(this.option("scaleType")),
      viewTypeRange: this._parseViewTypeRangeSettings(this.option("scaleTypeRange")),
      cultureInfo: this._getCultureInfo(),
      taskTooltipContentTemplate: this.option("taskTooltipContentTemplate"),
      taskProgressTooltipContentTemplate: this.option("taskProgressTooltipContentTemplate"),
      taskTimeTooltipContentTemplate: this.option("taskTimeTooltipContentTemplate"),
      taskContentTemplate: this.option("taskContentTemplate"),
      sieve: this.option("sieve")
    });
    this._selectTask(this.option("selectedRowKey"));
    this.updateBarItemsState();
  };
  _._getFirstDayOfWeek = function (e) {
    if ((0, u.isDefined)(e)) {
      return e;
    } else {
      return l.default.firstDayOfWeekIndex();
    }
  };
  _.getTaskAreaContainer = function () {
    return this._ganttViewCore.getTaskAreaContainer();
  };
  _.getBarManager = function () {
    return this._ganttViewCore.barManager;
  };
  _.executeCoreCommand = function (e) {
    var t = this._ganttViewCore.getCommandByKey(e);
    if (t) {
      t.execute();
    }
  };
  _.changeTaskExpanded = function (e, t) {
    this._ganttViewCore.changeTaskExpanded(e, t);
  };
  _.updateView = function () {
    var e;
    if ((e = this._ganttViewCore) !== null && e !== undefined) {
      e.updateView();
    }
  };
  _.updateBarItemsState = function () {
    this._ganttViewCore.barManager.updateItemsState([]);
  };
  _.setWidth = function (e) {
    this._ganttViewCore.setWidth(e);
  };
  _._onDimensionChanged = function () {
    this._ganttViewCore.onBrowserWindowResize();
  };
  _._selectTask = function (e) {
    this._ganttViewCore.selectTaskById(e);
  };
  _._update = function (e) {
    var t;
    if ((t = this._ganttViewCore) !== null && t !== undefined) {
      t.updateWithDataReload(e);
    }
  };
  _._getCultureInfo = function () {
    return {
      monthNames: l.default.getMonthNames("wide"),
      dayNames: l.default.getDayNames("wide"),
      abbrMonthNames: l.default.getMonthNames("abbreviated"),
      abbrDayNames: l.default.getDayNames("abbreviated"),
      quarterNames: this._getQuarterNames(),
      amText: this._getAmText(),
      pmText: this._getPmText(),
      start: d.default.format("dxGantt-dialogStartTitle"),
      end: d.default.format("dxGantt-dialogEndTitle"),
      progress: d.default.format("dxGantt-dialogProgressTitle")
    };
  };
  _._getAmText = function () {
    if (this._hasAmPM()) {
      return l.default.getPeriodNames()[0];
    } else {
      return "";
    }
  };
  _._getPmText = function () {
    if (this._hasAmPM()) {
      return l.default.getPeriodNames()[1];
    } else {
      return "";
    }
  };
  _._hasAmPM = function () {
    var e = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
    return e.toLocaleTimeString(h.default.locale()).match(/am|pm/i) || e.toString().match(/am|pm/i);
  };
  _._getQuarterNames = function () {
    var e = d.default.format("dxGantt-quarter");
    if (e) {
      return [(0, c.format)(e, 1), (0, c.format)(e, 2), (0, c.format)(e, 3), (0, c.format)(e, 4)];
    } else {
      return l.default.getQuarterNames();
    }
  };
  _._getTaskTitlePosition = function (e) {
    switch (e) {
      case "outside":
        return 1;
      case "none":
        return 2;
      default:
        return 0;
    }
  };
  _._getViewTypeByScaleType = function (e) {
    switch (e) {
      case "minutes":
        return 0;
      case "hours":
        return 1;
      case "sixHours":
        return 2;
      case "days":
        return 3;
      case "weeks":
        return 4;
      case "months":
        return 5;
      case "quarters":
        return 6;
      case "years":
        return 7;
      default:
        return;
    }
  };
  _._parseEditingSettings = function (e) {
    return {
      enabled: e.enabled,
      allowDependencyDelete: e.allowDependencyDeleting,
      allowDependencyInsert: e.allowDependencyAdding,
      allowTaskDelete: e.allowTaskDeleting,
      allowTaskInsert: e.allowTaskAdding,
      allowTaskUpdate: e.allowTaskUpdating,
      allowResourceDelete: e.allowResourceDeleting,
      allowResourceInsert: e.allowResourceAdding,
      allowResourceUpdate: e.allowResourceUpdating,
      allowTaskResourceUpdate: e.allowTaskResourceUpdating
    };
  };
  _._parseViewTypeRangeSettings = function (e) {
    return {
      min: this._getViewTypeByScaleType(e.min),
      max: this._getViewTypeByScaleType(e.max)
    };
  };
  _._optionChanged = function (t) {
    switch (t.name) {
      case "width":
        e.prototype._optionChanged.call(this, t);
        this._ganttViewCore.setWidth(t.value);
        break;
      case "height":
        this._ganttViewCore.setHeight(t.value);
        break;
      case "tasks":
      case "dependencies":
      case "resources":
      case "resourceAssignments":
        this._sieveOptions = undefined;
        this._update(true);
        break;
      case "showResources":
        this._ganttViewCore.setShowResources(t.value);
        break;
      case "showDependencies":
        this._ganttViewCore.setShowDependencies(t.value);
        break;
      case "taskTitlePosition":
        this._ganttViewCore.setTaskTitlePosition(this._getTaskTitlePosition(t.value));
        break;
      case "firstDayOfWeek":
        this._ganttViewCore.setFirstDayOfWeek(this._getFirstDayOfWeek(t.value));
        break;
      case "startDateRange":
        this._ganttViewCore.setStartDateRange(t.value);
        break;
      case "endDateRange":
        this._ganttViewCore.setEndDateRange(t.value);
        break;
      case "allowSelection":
        this._ganttViewCore.setAllowSelection(t.value);
        break;
      case "selectedRowKey":
        this._selectTask(t.value);
        break;
      case "editing":
        this._ganttViewCore.setEditingSettings(this._parseEditingSettings(t.value));
        break;
      case "validation":
        this._ganttViewCore.setValidationSettings(t.value);
        this._update(true);
        break;
      case "showRowLines":
        this._ganttViewCore.setRowLinesVisible(t.value);
        break;
      case "scaleType":
        this._ganttViewCore.setViewType(this._getViewTypeByScaleType(t.value));
        break;
      case "scaleTypeRange":
        this._ganttViewCore.setViewTypeRange(this._getViewTypeByScaleType(t.value.min), this._getViewTypeByScaleType(t.value.max));
        break;
      case "stripLines":
        this._ganttViewCore.setStripLines({
          stripLines: t.value
        });
        break;
      case "taskTooltipContentTemplate":
        this._ganttViewCore.setTaskTooltipContentTemplate(t.value);
        break;
      case "taskProgressTooltipContentTemplate":
        this._ganttViewCore.setTaskProgressTooltipContentTemplate(t.value);
        break;
      case "taskTimeTooltipContentTemplate":
        this._ganttViewCore.setTaskTimeTooltipContentTemplate(t.value);
        break;
      case "taskContentTemplate":
        this._ganttViewCore.setTaskContentTemplate(t.value);
        break;
      case "sieve":
        this._sortAndFilter(t.value);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  _.getRowHeight = function () {
    return this.option("rowHeight");
  };
  _.getHeaderHeight = function () {
    return this.option("headerHeight");
  };
  _.getGanttTasksData = function () {
    var e = this.option("tasks");
    var t = this.getSieveOptions();
    if (t != null && t.sievedItems && t != null && t.sieveColumn) {
      return t.sievedItems;
    } else {
      return e;
    }
  };
  _._sortAndFilter = function (e) {
    this._sieveOptions = e;
    this._update(e == null || !e.expandTasks);
    var t = this.option("selectedRowKey");
    this._selectTask(t);
  };
  _.getSieveOptions = function () {
    return this._sieveOptions;
  };
  _.getGanttDependenciesData = function () {
    return this.option("dependencies");
  };
  _.getGanttResourcesData = function () {
    return this.option("resources");
  };
  _.getGanttResourceAssignmentsData = function () {
    return this.option("resourceAssignments");
  };
  _.getGanttWorkTimeRules = function () {
    return null;
  };
  _.getExternalTaskAreaContainer = function (e) {
    this._taskAreaContainer ||= new s.TaskAreaContainer(e, this);
    return this._taskAreaContainer;
  };
  _.prepareExternalTaskAreaContainer = function (e, t) {
    if (t != null && t.height) {
      this._taskAreaContainer._scrollView.option("height", t.height);
    }
  };
  _.changeGanttTaskSelection = function (e, t) {
    this._onSelectionChanged({
      id: e,
      selected: t
    });
  };
  _.onGanttScroll = function (e) {
    this._onScroll({
      scrollTop: e
    });
  };
  _.showDialog = function (e, t, n, i) {
    this._onDialogShowing({
      name: e,
      parameters: t,
      callback: n,
      afterClosing: i
    });
  };
  _.getModelChangesListener = function () {
    return this.option("modelChangesListener");
  };
  _.getExportInfo = function () {
    return this.option("exportInfo");
  };
  _.showPopupMenu = function (e) {
    this._onPopupMenuShowing(e);
  };
  _.hidePopupMenu = function (e) {
    this._onPopupMenuHiding(e);
  };
  _.getMainElement = function () {
    return this.option("mainElement").get(0);
  };
  _.adjustControl = function () {
    this._onAdjustControl();
  };
  _.getRequireFirstLoadParentAutoCalc = function () {
    return this.option("validation.autoUpdateParentTasks");
  };
  _.collapseAll = function () {
    this._collapseAll();
  };
  _.expandAll = function () {
    this._expandAll();
  };
  _.onTaskClick = function (e, t) {
    this._taskClick({
      key: e,
      event: t
    });
    return true;
  };
  _.onTaskDblClick = function (e, t) {
    return this._taskDblClick({
      key: e,
      event: t
    });
  };
  _.onGanttViewContextMenu = function (e, t, n) {
    return true;
  };
  _.getFormattedDateText = function (e) {
    var t = "";
    if (e) {
      var n = l.default.format(e, "shortDate");
      var i = this._hasAmPM() ? "hh:mm a" : "HH:mm";
      t = n + " " + l.default.format(e, i);
    }
    return t;
  };
  _.destroyTemplate = function (e) {
    (0, o.default)(e).empty();
  };
  _.onTaskAreaSizeChanged = function (e) {
    var t = this._taskAreaContainer._scrollView;
    if ((0, u.isDefined)(e == null ? undefined : e.height)) {
      var n = (e == null ? undefined : e.height) > this._taskAreaContainer.getHeight() ? "both" : "horizontal";
      t.option("direction", n);
    }
  };
  _.updateGanttViewType = function (e) {
    this._onViewTypeChanged({
      type: e
    });
  };
  _.getTreeListTableStyle = function () {
    return this.callExportHelperMethod("getTreeListTableStyle");
  };
  _.getTreeListColCount = function () {
    return this.callExportHelperMethod("getTreeListColCount");
  };
  _.getTreeListHeaderInfo = function (e) {
    return this.callExportHelperMethod("getTreeListHeaderInfo", e);
  };
  _.getTreeListCellInfo = function (e, t, n) {
    return this.callExportHelperMethod("getTreeListCellInfo", n, t);
  };
  _.getTreeListEmptyDataCellInfo = function () {
    return this.callExportHelperMethod("getTreeListEmptyDataCellInfo");
  };
  _.callExportHelperMethod = function (e) {
    var t = this.option("exportHelper");
    for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) {
      i[o - 1] = arguments[o];
    }
    return t[e].apply(t, i);
  };
  _.applyTasksExpandedState = function (e) {
    var t;
    if ((t = this._ganttViewCore) !== null && t !== undefined) {
      t.applyTasksExpandedState(e);
    }
  };
  a = i;
  if (f = [{
    key: "bars",
    get: function () {
      return this.option("bars");
    }
  }]) {
    p(a.prototype, f);
  }
  if (m) {
    p(a, m);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(a.default);
exports.GanttView = m;