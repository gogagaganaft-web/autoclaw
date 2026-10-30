exports.GanttDataChangesProcessingHelper = undefined;
var n = function () {
  function e() {
    this._waitingForGanttViewReady = false;
    this._waitingForTreeListReady = false;
    this._completionActions = [];
  }
  var t = e.prototype;
  t.onGanttViewReady = function () {
    this._stopWaitForGanttViewReady();
    this.executeActionsIfPossible();
  };
  t.onTreeListReady = function () {
    this._stopWaitForTreeListReady();
    this.executeActionsIfPossible();
  };
  t.addCompletionAction = function (e, t, n) {
    if (e) {
      if (t) {
        this._startWaitForGanttViewReady();
      }
      if (n) {
        this._startWaitForTreeListReady();
      }
      this._completionActions.push(e);
    }
  };
  t.executeActionsIfPossible = function () {
    if (this._canExecuteActions()) {
      this._completionActions.forEach(function (e) {
        return e();
      });
      this._completionActions = [];
    }
  };
  t._startWaitForGanttViewReady = function () {
    this._waitingForGanttViewReady = true;
  };
  t._stopWaitForGanttViewReady = function () {
    this._waitingForGanttViewReady = false;
  };
  t._startWaitForTreeListReady = function () {
    this._waitingForTreeListReady = true;
  };
  t._stopWaitForTreeListReady = function () {
    this._waitingForTreeListReady = false;
  };
  t._canExecuteActions = function () {
    return !this._waitingForGanttViewReady && !this._waitingForTreeListReady;
  };
  return e;
}();
exports.GanttDataChangesProcessingHelper = n;