exports.GanttActionsManager = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./6415.js");
var r = require("./13306.js");
var s = "onContextMenuPreparing";
var l = "onCustomCommand";
var u = "onDependencyDeleted";
var d = "onDependencyDeleting";
var c = "onDependencyInserted";
var h = "onDependencyInserting";
var f = "onResourceAssigned";
var p = "onResourceAssigning";
var g = "onResourceDeleted";
var m = "onResourceDeleting";
var _ = "onResourceInserted";
var v = "onResourceInserting";
var y = "onResourceManagerDialogShowing";
var b = "onResourceUnassigned";
var x = "onResourceUnassigning";
var w = "onSelectionChanged";
var C = "onTaskClick";
var S = "onTaskDblClick";
var k = "onTaskDeleted";
var D = "onTaskDeleting";
var I = "onTaskEditDialogShowing";
var T = "onTaskInserted";
var E = "onTaskInserting";
var O = "onTaskMoving";
var A = "onTaskUpdated";
var P = "onTaskUpdating";
var M = "onScaleCellPrepared";
var R = function () {
  function e(e) {
    this._gantt = e;
    this._mappingHelper = e._mappingHelper;
    this._customFieldsManager = e._customFieldsManager;
  }
  var t = e.prototype;
  t._createActionByOption = function (e) {
    return this._gantt._createActionByOption(e);
  };
  t._getTaskData = function (e) {
    return this._gantt.getTaskData(e);
  };
  t._convertCoreToMappedData = function (e, t) {
    return this._mappingHelper.convertCoreToMappedData(e, t);
  };
  t._convertMappedToCoreData = function (e, t) {
    return this._mappingHelper.convertMappedToCoreData(e, t);
  };
  t._convertMappedToCoreFields = function (e, t) {
    return this._mappingHelper.convertMappedToCoreFields(e, t);
  };
  t._convertCoreToMappedFields = function (e, t) {
    return this._mappingHelper.convertCoreToMappedFields(e, t);
  };
  t._saveCustomFieldsDataToCache = function (e, t, n = false, i = false) {
    this._customFieldsManager.saveCustomFieldsDataToCache(e, t, n, i);
  };
  t.createTaskDblClickAction = function () {
    this._taskDblClickAction = this._createActionByOption(S);
  };
  t.taskDblClickAction = function (e) {
    if (!this._taskDblClickAction) {
      this.createTaskDblClickAction();
    }
    this._taskDblClickAction(e);
  };
  t.raiseTaskDblClickAction = function (e, t) {
    var n = {
      cancel: false,
      data: this._getTaskData(e),
      event: t,
      key: e
    };
    this.taskDblClickAction(n);
    return !n.cancel;
  };
  t.createTaskClickAction = function () {
    this._taskClickAction = this._createActionByOption(C);
  };
  t.taskClickAction = function (e) {
    if (!this._taskClickAction) {
      this.createTaskClickAction();
    }
    this._taskClickAction(e);
  };
  t.raiseTaskClickAction = function (e, t) {
    var n = {
      key: e,
      event: t,
      data: this._getTaskData(e)
    };
    this.taskClickAction(n);
  };
  t.createSelectionChangedAction = function () {
    this._selectionChangedAction = this._createActionByOption(w);
  };
  t.selectionChangedAction = function (e) {
    if (!this._selectionChangedAction) {
      this.createSelectionChangedAction();
    }
    this._selectionChangedAction(e);
  };
  t.raiseSelectionChangedAction = function (e) {
    this.selectionChangedAction({
      selectedRowKey: e
    });
  };
  t.createCustomCommandAction = function () {
    this._customCommandAction = this._createActionByOption(l);
  };
  t.customCommandAction = function (e) {
    if (!this._customCommandAction) {
      this.createCustomCommandAction();
    }
    this._customCommandAction(e);
  };
  t.raiseCustomCommand = function (e) {
    this.customCommandAction({
      name: e
    });
  };
  t.createContextMenuPreparingAction = function () {
    this._contextMenuPreparingAction = this._createActionByOption(s);
  };
  t.contextMenuPreparingAction = function (e) {
    if (!this._contextMenuPreparingAction) {
      this.createContextMenuPreparingAction();
    }
    this._contextMenuPreparingAction(e);
  };
  t.raiseContextMenuPreparing = function (e) {
    this.contextMenuPreparingAction(e);
  };
  t._getInsertingAction = function (e) {
    switch (e) {
      case "tasks":
        return this._getTaskInsertingAction();
      case "dependencies":
        return this._getDependencyInsertingAction();
      case "resources":
        return this._getResourceInsertingAction();
      case "resourceAssignments":
        return this._getResourceAssigningAction();
    }
    return function () {};
  };
  t.raiseInsertingAction = function (e, t) {
    var n = this._getInsertingAction(e);
    if (n) {
      var i = {
        cancel: false,
        values: this._convertCoreToMappedData(e, t.values)
      };
      n(i);
      t.cancel = i.cancel;
      (0, r.extend)(t.values, this._convertMappedToCoreData(e, i.values));
      if (e === "tasks") {
        this._saveCustomFieldsDataToCache("gantt_new_task_key", i.values);
      }
    }
  };
  t.createTaskInsertingAction = function () {
    this._taskInsertingAction = this._createActionByOption(E);
  };
  t.taskInsertingAction = function (e) {
    this._getTaskInsertingAction()(e);
  };
  t._getTaskInsertingAction = function () {
    if (!this._taskInsertingAction) {
      this.createTaskInsertingAction();
    }
    return this._taskInsertingAction;
  };
  t.createDependencyInsertingAction = function () {
    this._dependencyInsertingAction = this._createActionByOption(h);
  };
  t.dependencyInsertingAction = function (e) {
    this._getDependencyInsertingAction()(e);
  };
  t._getDependencyInsertingAction = function () {
    if (!this._dependencyInsertingAction) {
      this.createDependencyInsertingAction();
    }
    return this._dependencyInsertingAction;
  };
  t.createResourceInsertingAction = function () {
    this._resourceInsertingAction = this._createActionByOption(v);
  };
  t.resourceInsertingAction = function (e) {
    this._getResourceInsertingAction()(e);
  };
  t._getResourceInsertingAction = function () {
    if (!this._resourceInsertingAction) {
      this.createResourceInsertingAction();
    }
    return this._resourceInsertingAction;
  };
  t.createResourceAssigningAction = function () {
    this._resourceAssigningAction = this._createActionByOption(p);
  };
  t.resourceAssigningAction = function (e) {
    this._getResourceAssigningAction()(e);
  };
  t._getResourceAssigningAction = function () {
    if (!this._resourceAssigningAction) {
      this.createResourceAssigningAction();
    }
    return this._resourceAssigningAction;
  };
  t._getInsertedAction = function (e) {
    switch (e) {
      case "tasks":
        return this._getTaskInsertedAction();
      case "dependencies":
        return this._getDependencyInsertedAction();
      case "resources":
        return this._getResourceInsertedAction();
      case "resourceAssignments":
        return this._getResourceAssignedAction();
    }
    return function () {};
  };
  t.raiseInsertedAction = function (e, t, n) {
    var i = this._getInsertedAction(e);
    if (i) {
      i({
        values: t,
        key: n
      });
    }
  };
  t.createTaskInsertedAction = function () {
    this._taskInsertedAction = this._createActionByOption(T);
  };
  t.taskInsertedAction = function (e) {
    this._getTaskInsertedAction()(e);
  };
  t._getTaskInsertedAction = function () {
    if (!this._taskInsertedAction) {
      this.createTaskInsertedAction();
    }
    return this._taskInsertedAction;
  };
  t.createDependencyInsertedAction = function () {
    this._dependencyInsertedAction = this._createActionByOption(c);
  };
  t.dependencyInsertedAction = function (e) {
    this._getDependencyInsertedAction()(e);
  };
  t._getDependencyInsertedAction = function () {
    if (!this._dependencyInsertedAction) {
      this.createDependencyInsertedAction();
    }
    return this._dependencyInsertedAction;
  };
  t.createResourceInsertedAction = function () {
    this._resourceInsertedAction = this._createActionByOption(_);
  };
  t.resourceInsertedAction = function (e) {
    this._getResourceInsertedAction()(e);
  };
  t._getResourceInsertedAction = function () {
    if (!this._resourceInsertedAction) {
      this.createResourceInsertedAction();
    }
    return this._resourceInsertedAction;
  };
  t.createResourceAssignedAction = function () {
    this._resourceAssignedAction = this._createActionByOption(f);
  };
  t.resourceAssignedAction = function (e) {
    this._getResourceAssignedAction()(e);
  };
  t._getResourceAssignedAction = function () {
    if (!this._resourceAssignedAction) {
      this.createResourceAssignedAction();
    }
    return this._resourceAssignedAction;
  };
  t._getDeletingAction = function (e) {
    switch (e) {
      case "tasks":
        return this._getTaskDeletingAction();
      case "dependencies":
        return this._getDependencyDeletingAction();
      case "resources":
        return this._getResourceDeletingAction();
      case "resourceAssignments":
        return this._getResourceUnassigningAction();
    }
    return function () {};
  };
  t.raiseDeletingAction = function (e, t) {
    var n = this._getDeletingAction(e);
    if (n) {
      var i = {
        cancel: false,
        key: t.key,
        values: this._convertCoreToMappedData(e, t.values)
      };
      n(i);
      t.cancel = i.cancel;
    }
  };
  t.createTaskDeletingAction = function () {
    this._taskDeletingAction = this._createActionByOption(D);
  };
  t.taskDeletingAction = function (e) {
    this._getTaskDeletingAction()(e);
  };
  t._getTaskDeletingAction = function () {
    if (!this._taskDeletingAction) {
      this.createTaskDeletingAction();
    }
    return this._taskDeletingAction;
  };
  t.createDependencyDeletingAction = function () {
    this._dependencyDeletingAction = this._createActionByOption(d);
  };
  t.dependencyDeletingAction = function (e) {
    this._getDependencyDeletingAction()(e);
  };
  t._getDependencyDeletingAction = function () {
    if (!this._dependencyDeletingAction) {
      this.createDependencyDeletingAction();
    }
    return this._dependencyDeletingAction;
  };
  t.createResourceDeletingAction = function () {
    this._resourceDeletingAction = this._createActionByOption(m);
  };
  t.resourceDeletingAction = function (e) {
    this._getResourceDeletingAction()(e);
  };
  t._getResourceDeletingAction = function () {
    if (!this._resourceDeletingAction) {
      this.createResourceDeletingAction();
    }
    return this._resourceDeletingAction;
  };
  t.createResourceUnassigningAction = function () {
    this._resourceUnassigningAction = this._createActionByOption(x);
  };
  t.resourceUnassigningAction = function (e) {
    this._getResourceUnassigningAction()(e);
  };
  t._getResourceUnassigningAction = function () {
    if (!this._resourceUnassigningAction) {
      this.createResourceUnassigningAction();
    }
    return this._resourceUnassigningAction;
  };
  t._getDeletedAction = function (e) {
    switch (e) {
      case "tasks":
        return this._getTaskDeletedAction();
      case "dependencies":
        return this._getDependencyDeletedAction();
      case "resources":
        return this._getResourceDeletedAction();
      case "resourceAssignments":
        return this._getResourceUnassignedAction();
    }
    return function () {};
  };
  t.raiseDeletedAction = function (e, t, n) {
    var i = this._getDeletedAction(e);
    if (i) {
      i({
        key: t,
        values: n
      });
    }
  };
  t.createTaskDeletedAction = function () {
    this._taskDeletedAction = this._createActionByOption(k);
  };
  t.taskDeletedAction = function (e) {
    this._getTaskDeletedAction()(e);
  };
  t._getTaskDeletedAction = function () {
    if (!this._taskDeletedAction) {
      this.createTaskDeletedAction();
    }
    return this._taskDeletedAction;
  };
  t.createDependencyDeletedAction = function () {
    this._dependencyDeletedAction = this._createActionByOption(u);
  };
  t.dependencyDeletedAction = function (e) {
    this._getDependencyDeletedAction()(e);
  };
  t._getDependencyDeletedAction = function () {
    if (!this._dependencyDeletedAction) {
      this.createDependencyDeletedAction();
    }
    return this._dependencyDeletedAction;
  };
  t.createResourceDeletedAction = function () {
    this._resourceDeletedAction = this._createActionByOption(g);
  };
  t.resourceDeletedAction = function (e) {
    this._getResourceDeletedAction()(e);
  };
  t._getResourceDeletedAction = function () {
    if (!this._resourceDeletedAction) {
      this.createResourceDeletedAction();
    }
    return this._resourceDeletedAction;
  };
  t.createResourceUnassignedAction = function () {
    this._resourceUnassignedAction = this._createActionByOption(b);
  };
  t.resourceUnassignedAction = function (e) {
    this._getResourceUnassignedAction()(e);
  };
  t._getResourceUnassignedAction = function () {
    if (!this._resourceUnassignedAction) {
      this.createResourceUnassignedAction();
    }
    return this._resourceUnassignedAction;
  };
  t._getUpdatingAction = function (e) {
    switch (e) {
      case "tasks":
        return this._getTaskUpdatingAction();
    }
    return function () {};
  };
  t.raiseUpdatingAction = function (e, t, n) {
    if (n = n || this._getUpdatingAction(e)) {
      var i = e === "tasks";
      var o = {
        cancel: false,
        key: t.key,
        newValues: this._convertCoreToMappedData(e, t.newValues),
        values: i ? this._getTaskData(t.key) : this._convertCoreToMappedData(e, t.values)
      };
      if (i && this._customFieldsManager.cache.hasData(o.key)) {
        this._customFieldsManager.addCustomFieldsDataFromCache(o.key, o.newValues);
      }
      n(o);
      t.cancel = o.cancel;
      (0, r.extend)(t.newValues, this._convertMappedToCoreData(e, o.newValues));
      if (i) {
        if (o.cancel) {
          this._customFieldsManager.resetCustomFieldsDataCache(o.key);
        } else {
          var a = !Object.keys(t.newValues).length;
          this._saveCustomFieldsDataToCache(o.key, o.newValues, a);
        }
      }
    }
  };
  t.createTaskUpdatingAction = function () {
    this._taskUpdatingAction = this._createActionByOption(P);
  };
  t.taskUpdatingAction = function (e) {
    this._getTaskUpdatingAction()(e);
  };
  t._getTaskUpdatingAction = function () {
    if (!this._taskUpdatingAction) {
      this.createTaskUpdatingAction();
    }
    return this._taskUpdatingAction;
  };
  t._getUpdatedAction = function (e) {
    switch (e) {
      case "tasks":
        return this._getTaskUpdatedAction();
    }
    return function () {};
  };
  t.raiseUpdatedAction = function (e, t, n) {
    var i = this._getUpdatedAction(e);
    if (i) {
      i({
        values: t,
        key: n
      });
    }
  };
  t.createTaskUpdatedAction = function () {
    this._taskUpdatedAction = this._createActionByOption(A);
  };
  t.taskUpdatedAction = function (e) {
    this._getTaskUpdatedAction()(e);
  };
  t._getTaskUpdatedAction = function () {
    if (!this._taskUpdatedAction) {
      this.createTaskUpdatedAction();
    }
    return this._taskUpdatedAction;
  };
  t.createTaskEditDialogShowingAction = function () {
    this._taskEditDialogShowingAction = this._createActionByOption(I);
  };
  t.taskEditDialogShowingAction = function (e) {
    this._getTaskEditDialogShowingAction()(e);
  };
  t._getTaskEditDialogShowingAction = function () {
    if (!this._taskEditDialogShowingAction) {
      this.createTaskEditDialogShowingAction();
    }
    return this._taskEditDialogShowingAction;
  };
  t.raiseTaskEditDialogShowingAction = function (e) {
    var t = this._getTaskEditDialogShowingAction();
    if (t) {
      var n = {
        cancel: false,
        key: e.key,
        values: this._convertCoreToMappedData("tasks", e.values),
        readOnlyFields: this._convertCoreToMappedFields("tasks", e.readOnlyFields),
        hiddenFields: this._convertCoreToMappedFields("tasks", e.hiddenFields)
      };
      t(n);
      e.cancel = n.cancel;
      (0, r.extend)(e.values, this._convertMappedToCoreData("tasks", n.values));
      e.readOnlyFields = this._convertMappedToCoreFields("tasks", n.readOnlyFields);
      e.hiddenFields = this._convertMappedToCoreFields("tasks", n.hiddenFields);
    }
  };
  t.createResourceManagerDialogShowingAction = function () {
    this._resourceManagerDialogShowingAction = this._createActionByOption(y);
  };
  t.resourceManagerDialogShowingAction = function (e) {
    this._getResourceManagerDialogShowingAction()(e);
  };
  t._getResourceManagerDialogShowingAction = function () {
    if (!this._resourceManagerDialogShowingAction) {
      this.createResourceManagerDialogShowingAction();
    }
    return this._resourceManagerDialogShowingAction;
  };
  t.raiseResourceManagerDialogShowingAction = function (e) {
    var t = this;
    var n = this._getResourceManagerDialogShowingAction();
    if (n) {
      var i = {
        cancel: false,
        values: e.values.resources.items.map(function (e) {
          return t._convertMappedToCoreData("resources", e);
        })
      };
      n(i);
      e.cancel = i.cancel;
    }
  };
  t.createTaskMovingAction = function () {
    this._taskMovingAction = this._createActionByOption(O);
  };
  t.taskMovingAction = function (e) {
    this.getTaskMovingAction()(e);
  };
  t.getTaskMovingAction = function () {
    if (!this._taskMovingAction) {
      this.createTaskMovingAction();
    }
    return this._taskMovingAction;
  };
  t.getScaleCellPreparedAction = function () {
    if (!this._scaleCellPreparedAction) {
      this.createScaleCellPreparedAction();
    }
    return this._scaleCellPreparedAction;
  };
  t.createScaleCellPreparedAction = function () {
    this._scaleCellPreparedAction = this._createActionByOption(M);
  };
  t.raiseScaleCellPreparedAction = function (e) {
    var t = this.getScaleCellPreparedAction();
    if (t) {
      t({
        scaleIndex: e.scaleIndex,
        scaleType: this._getScaleType(e.scaleType),
        scaleElement: (0, a.getPublicElement)((0, o.default)(e.scaleElement)),
        separatorElement: (0, a.getPublicElement)((0, o.default)(e.separatorElement)),
        startDate: new Date(e.start),
        endDate: new Date(e.end)
      });
    }
  };
  t._getScaleType = function (e) {
    switch (e) {
      case 0:
        return "minutes";
      case 1:
        return "hours";
      case 2:
        return "sixHours";
      case 3:
        return "days";
      case 4:
        return "weeks";
      case 5:
        return "months";
      case 6:
        return "quarters";
      case 7:
        return "years";
      case 8:
        return "fiveYears";
      default:
        return;
    }
  };
  return e;
}();
exports.GanttActionsManager = R;