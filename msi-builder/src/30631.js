exports.GanttHelper = undefined;
var i;
var o = require("./47617.js");
var a = require("./35922.js");
var r = (i = require("./28109.js")) && i.__esModule ? i : {
  default: i
};
var s = {
  prepareMapHandler: function (e) {
    return function (t) {
      return Object.keys(e).reduce(function (n, i) {
        n[i === "key" ? "id" : i] = e[i](t);
        return n;
      }, {});
    };
  },
  prepareSetterMapHandler: function (e) {
    return function (t) {
      return Object.keys(e).reduce(function (n, i) {
        var o = i === "key" ? "id" : i;
        e[i](n, t[o]);
        return n;
      }, {});
    };
  },
  compileGettersByOption: function (e) {
    var t = {};
    for (var n in e) {
      var i = n.match(/(\w*)Expr/);
      if (i) {
        t[i[1]] = (0, o.compileGetter)(e[i[0]]);
      }
    }
    return t;
  },
  compileSettersByOption: function (e) {
    var t = {};
    for (var n in e) {
      var i = n.match(/(\w*)Expr/);
      if (i && !(0, a.isFunction)(e[i[0]])) {
        t[i[1]] = (0, o.compileSetter)(e[i[0]]);
      }
    }
    return t;
  },
  compileFuncSettersByOption: function (e) {
    var t = {};
    for (var n in e) {
      var i = n.match(/(\w*)Expr/);
      if (i && (0, a.isFunction)(e[i[0]])) {
        t[i[1]] = e[i[0]];
      }
    }
    return t;
  },
  getStoreObject: function (e, t) {
    var n = s.compileSettersByOption(e);
    return Object.keys(n).reduce(function (e, i) {
      if (i !== "key") {
        n[i](e, t[i]);
      }
      return e;
    }, {});
  },
  getInvertedData: function (e, t) {
    var n = {};
    if (e) {
      for (var i = 0; i < e.length; i++) {
        var o = e[i];
        n[t(o)] = o;
      }
    }
    return n;
  },
  getArrayFromOneElement: function (e) {
    if (e == null) {
      return [];
    } else {
      return [e];
    }
  },
  getSelectionMode: function (e) {
    if (e) {
      return "single";
    } else {
      return "none";
    }
  },
  convertTreeToList: function (e, t) {
    if (e != null && e.data && e != null && e.visible) {
      t.push(e.data);
    }
    for (var n = 0; n < e.children?.length; n++) {
      var o = e.children[n];
      s.convertTreeToList(o, t);
    }
  },
  getAllParentNodesKeys: function (e, t) {
    var n;
    if (e != null && e.data) {
      t.push(e.key);
    }
    if (e != null && (n = e.parent) !== null && n !== undefined && n.data) {
      s.getAllParentNodesKeys(e.parent, t);
    }
  },
  getDefaultOptions: function () {
    return {
      tasks: {
        dataSource: null,
        keyExpr: "id",
        parentIdExpr: "parentId",
        startExpr: "start",
        endExpr: "end",
        progressExpr: "progress",
        titleExpr: "title",
        colorExpr: "color"
      },
      dependencies: {
        dataSource: null,
        keyExpr: "id",
        predecessorIdExpr: "predecessorId",
        successorIdExpr: "successorId",
        typeExpr: "type"
      },
      resources: {
        dataSource: null,
        keyExpr: "id",
        textExpr: "text",
        colorExpr: "color"
      },
      resourceAssignments: {
        dataSource: null,
        keyExpr: "id",
        taskIdExpr: "taskId",
        resourceIdExpr: "resourceId"
      },
      columns: undefined,
      taskListWidth: 300,
      showResources: true,
      showDependencies: true,
      taskTitlePosition: "inside",
      firstDayOfWeek: undefined,
      selectedRowKey: undefined,
      onSelectionChanged: null,
      onTaskClick: null,
      onTaskDblClick: null,
      onTaskInserting: null,
      onTaskInserted: null,
      onTaskDeleting: null,
      onTaskDeleted: null,
      onTaskUpdating: null,
      onTaskUpdated: null,
      onTaskMoving: null,
      onTaskEditDialogShowing: null,
      onDependencyInserting: null,
      onDependencyInserted: null,
      onDependencyDeleting: null,
      onDependencyDeleted: null,
      onResourceInserting: null,
      onResourceInserted: null,
      onResourceDeleting: null,
      onResourceDeleted: null,
      onResourceAssigning: null,
      onResourceAssigned: null,
      onResourceUnassigning: null,
      onResourceUnassigned: null,
      onCustomCommand: null,
      onContextMenuPreparing: null,
      allowSelection: true,
      showRowLines: true,
      stripLines: undefined,
      scaleType: "auto",
      scaleTypeRange: {
        min: "minutes",
        max: "years"
      },
      editing: {
        enabled: false,
        allowTaskAdding: true,
        allowTaskDeleting: true,
        allowTaskUpdating: true,
        allowDependencyAdding: true,
        allowDependencyDeleting: true,
        allowResourceAdding: true,
        allowResourceDeleting: true,
        allowResourceUpdating: true,
        allowTaskResourceUpdating: true
      },
      validation: {
        validateDependencies: false,
        autoUpdateParentTasks: false,
        enablePredecessorGap: false
      },
      toolbar: null,
      contextMenu: {
        enabled: true,
        items: undefined
      },
      taskTooltipContentTemplate: null,
      taskProgressTooltipContentTemplate: null,
      taskTimeTooltipContentTemplate: null,
      taskContentTemplate: null,
      rootValue: 0,
      sorting: {
        ascendingText: r.default.format("dxGantt-sortingAscendingText"),
        descendingText: r.default.format("dxGantt-sortingDescendingText"),
        clearText: r.default.format("dxGantt-sortingClearText"),
        mode: "single",
        showSortIndexes: false
      },
      filterRow: undefined,
      headerFilter: undefined,
      rtlEnabled: false
    };
  }
};
exports.GanttHelper = s;