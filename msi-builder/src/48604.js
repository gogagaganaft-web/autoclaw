exports.ModelChangesListener = undefined;
var n = {
  create: function (e) {
    return {
      NotifyTaskCreated: function (t, n, i) {
        e._onRecordInserted("tasks", t, n);
      },
      NotifyTaskRemoved: function (t, n, i) {
        e._onRecordRemoved("tasks", t, i);
      },
      NotifyTaskUpdated: function (t, n, i) {
        e._onRecordUpdated("tasks", t, n);
      },
      NotifyParentTaskUpdated: function (t, n) {
        e._onParentTaskUpdated(t);
      },
      NotifyDependencyInserted: function (t, n, i) {
        e._onRecordInserted("dependencies", t, n);
      },
      NotifyDependencyRemoved: function (t, n, i) {
        e._onRecordRemoved("dependencies", t, i);
      },
      NotifyResourceCreated: function (t, n, i) {
        e._onRecordInserted("resources", t, n);
      },
      NotifyResourceRemoved: function (t, n, i) {
        e._onRecordRemoved("resources", t, i);
      },
      NotifyResourceAssigned: function (t, n, i) {
        e._onRecordInserted("resourceAssignments", t, n);
      },
      NotifyResourceUnassigned: function (t, n, i) {
        e._onRecordRemoved("resourceAssignments", t, i);
      },
      NotifyParentDataRecalculated: function (t) {
        e._onParentTasksRecalculated(t);
      },
      NotifyTaskCreating: function (t) {
        e._actionsManager.raiseInsertingAction("tasks", t);
      },
      NotifyTaskRemoving: function (t) {
        e._actionsManager.raiseDeletingAction("tasks", t);
      },
      NotifyTaskUpdating: function (t) {
        e._actionsManager.raiseUpdatingAction("tasks", t);
      },
      NotifyTaskMoving: function (t) {
        e._actionsManager.raiseUpdatingAction("tasks", t, e._actionsManager.getTaskMovingAction());
      },
      NotifyTaskEditDialogShowing: function (t) {
        e._actionsManager.raiseTaskEditDialogShowingAction(t);
      },
      NotifyResourceManagerDialogShowing: function (t) {
        e._actionsManager.raiseResourceManagerDialogShowingAction(t);
      },
      NotifyDependencyInserting: function (t) {
        e._actionsManager.raiseInsertingAction("dependencies", t);
      },
      NotifyDependencyRemoving: function (t) {
        e._actionsManager.raiseDeletingAction("dependencies", t);
      },
      NotifyResourceCreating: function (t) {
        e._actionsManager.raiseInsertingAction("resources", t);
      },
      NotifyResourceRemoving: function (t) {
        e._actionsManager.raiseDeletingAction("resources", t);
      },
      NotifyResourceAssigning: function (t) {
        e._actionsManager.raiseInsertingAction("resourceAssignments", t);
      },
      NotifyResourceUnassigning: function (t) {
        e._actionsManager.raiseDeletingAction("resourceAssignments", t);
      },
      NotifyScaleCellPrepared: function (t) {
        e._actionsManager.raiseScaleCellPreparedAction(t);
      },
      NotifyGanttViewUpdated: function () {
        e._onGanttViewCoreUpdated();
      }
    };
  }
};
exports.ModelChangesListener = n;