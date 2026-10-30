exports.GanttToolbar = exports.GanttContextMenuBar = undefined;
var i = l(require("./68374.js"));
var o = l(require("./71042.js"));
var a = l(require("./10042.js"));
var r = l(require("./28109.js"));
var s = require("./13306.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  d(e, t);
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = 0;
var h = 1;
var f = 2;
var p = 3;
var g = 4;
var m = 5;
var _ = 6;
var v = 7;
var y = 8;
var b = 9;
var x = 10;
var w = 11;
var C = 12;
var S = 13;
var k = 14;
var D = 15;
var I = function () {
  function e(e, t) {
    this._element = e;
    this._owner = t;
    this._items = [];
    this._createControl();
  }
  var t = e.prototype;
  t.createItems = function (e) {
    this._cache = null;
    this._items = this._createItemsCore(e);
    this._menu.option("items", this._items);
  };
  t._createItemsCore = function (e) {
    var t = this;
    return e.map(function (e) {
      var n;
      n = typeof e == "string" ? t._createItemByText(e) : e.name ? (0, s.extend)(t._createItemByText(e.name), e) : (0, s.extend)(t._getDefaultItemOptions(), e);
      if (e.items) {
        n.items = t._createItemsCore(e.items);
      }
      return n;
    });
  };
  t._createItemByText = function (e) {
    switch (e.toLowerCase()) {
      case "separator":
        return this._createSeparator();
      case "undo":
        return this._createDefaultItem(_, r.default.format("dxGantt-undo"), this._getIcon("undo"));
      case "redo":
        return this._createDefaultItem(v, r.default.format("dxGantt-redo"), this._getIcon("redo"));
      case "expandall":
        return this._createDefaultItem(C, r.default.format("dxGantt-expandAll"), this._getIcon("expand"));
      case "collapseall":
        return this._createDefaultItem(w, r.default.format("dxGantt-collapseAll"), this._getIcon("collapse"));
      case "addtask":
        return this._createDefaultItem(c, r.default.format("dxGantt-addNewTask"), this._getIcon("add"));
      case "addsubtask":
        return this._createDefaultItem(h, r.default.format("dxGantt-contextMenuNewSubtask"), this._getIcon("add-sub-task"));
      case "deletetask":
        return this._createDefaultItem(f, r.default.format("dxGantt-deleteSelectedTask"), this._getIcon("delete"));
      case "deletedependency":
        return this._createDefaultItem(p, r.default.format("dxGantt-contextMenuDeleteDependency"), this._getIcon("delete-dependency"));
      case "zoomin":
        return this._createDefaultItem(y, r.default.format("dxGantt-zoomIn"), this._getIcon("zoom-in"));
      case "zoomout":
        return this._createDefaultItem(b, r.default.format("dxGantt-zoomOut"), this._getIcon("zoom-out"));
      case "fullscreen":
        return this._createDefaultItem(x, r.default.format("dxGantt-fullScreen"), this._getIcon("full-screen"));
      case "taskdetails":
        return this._createDefaultItem(g, r.default.format("dxGantt-dialogTaskDetailsTitle") + "...", this._getIcon("task-details"));
      case "resourcemanager":
        return this._createDefaultItem(S, r.default.format("dxGantt-dialogResourceManagerTitle"), this._getIcon("resource-manager"));
      case "showresources":
        return this._createDefaultItem(k, r.default.format("dxGantt-showResources"), this._getIcon("toggle-resources"));
      case "showdependencies":
        return this._createDefaultItem(D, r.default.format("dxGantt-showDependencies"), this._getIcon("toggle-dependencies"));
      default:
        return (0, s.extend)(this._getDefaultItemOptions(), {
          options: {
            text: e
          }
        });
    }
  };
  t._getDefaultItemOptions = function () {
    return {};
  };
  t._getItemsCache = function () {
    if (!this._cache) {
      this._cache = {};
      this._fillCache(this._items);
    }
    return this._cache;
  };
  t._fillCache = function (e) {
    var t = this;
    e.forEach(function (e) {
      var n = e.commandId;
      if (n !== undefined) {
        t._cache[n] ||= [];
        t._cache[n].push(e);
      }
      if (e.items) {
        t._fillCache(e.items);
      }
    });
  };
  t._getIcon = function (e) {
    return "dx-gantt-i dx-gantt-i-" + e;
  };
  t.getCommandKeys = function () {
    var e = this._getItemsCache();
    var t = [];
    for (var n in e) {
      t.push(parseInt(n));
    }
    return t;
  };
  t.setItemEnabled = function (e, t) {
    this._getItemsCache()[e].forEach(function (e) {
      e.disabled = !t;
    });
  };
  t.setItemVisible = function (e, t) {
    this._getItemsCache()[e].forEach(function (e) {
      e.visible = t;
    });
  };
  t.setItemValue = function (e, t) {};
  t.setEnabled = function (e) {
    this._menu.option("disabled", !e);
  };
  t.updateItemsList = function () {};
  t.isVisible = function () {
    return true;
  };
  t.isContextMenu = function () {
    return false;
  };
  t.completeUpdate = function () {};
  return e;
}();
var T = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  u(t, e);
  var n = t.prototype;
  n._createControl = function () {
    var e = this;
    this._menu = this._owner._createComponent(this._element, o.default, {
      onItemClick: function (t) {
        if (t.itemData.commandId !== undefined) {
          e._executeCommand(t.itemData.commandId);
        }
      }
    });
  };
  n._executeCommand = function (e) {
    switch (e) {
      case k:
        this._owner.option("showResources", !this._owner.option("showResources"));
        break;
      case D:
        this._owner.option("showDependencies", !this._owner.option("showDependencies"));
        break;
      default:
        this._owner._executeCoreCommand(e);
    }
  };
  n._createDefaultItem = function (e, t, n) {
    return {
      commandId: e,
      disabled: true,
      widget: "dxButton",
      location: "before",
      options: {
        icon: n,
        stylingMode: "text",
        hint: t
      }
    };
  };
  n._createSeparator = function () {
    return {
      location: "before",
      template: function (e, t, n) {
        (0, i.default)(n).addClass("dx-gantt-toolbar-separator");
      }
    };
  };
  n._getDefaultItemOptions = function () {
    return {
      location: "before",
      widget: "dxButton"
    };
  };
  n.completeUpdate = function () {
    this._menu.option("items", this._items);
  };
  return t;
}(I);
exports.GanttToolbar = T;
var E = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  u(t, e);
  var n = t.prototype;
  n._createControl = function () {
    var e = this;
    this._menu = this._owner._createComponent(this._element, a.default, {
      showEvent: undefined,
      onItemClick: function (t) {
        if (t.itemData.commandId !== undefined) {
          e._owner._executeCoreCommand(t.itemData.commandId);
        } else if (t.itemData.name !== undefined) {
          e._owner._actionsManager.raiseCustomCommand(t.itemData.name);
        }
      }
    });
  };
  n.createItems = function (t) {
    if (!t || t.length === 0) {
      t = this._getDefaultItems();
    }
    e.prototype.createItems.call(this, t);
  };
  n._getDefaultItems = function () {
    return [{
      text: r.default.format("dxGantt-dialogButtonAdd"),
      commandId: m,
      icon: this._getIcon("add"),
      items: [{
        text: r.default.format("dxGantt-contextMenuNewTask"),
        commandId: c,
        icon: this._getIcon("add-task")
      }, {
        text: r.default.format("dxGantt-contextMenuNewSubtask"),
        commandId: h,
        icon: this._getIcon("add-sub-task")
      }]
    }, {
      text: r.default.format("dxGantt-dialogTaskDetailsTitle") + "...",
      commandId: g,
      icon: this._getIcon("task-details")
    }, {
      text: r.default.format("dxGantt-contextMenuDeleteTask"),
      commandId: f,
      icon: this._getIcon("delete")
    }, {
      text: r.default.format("dxGantt-contextMenuDeleteDependency"),
      commandId: p,
      icon: this._getIcon("delete-dependency")
    }];
  };
  n._createDefaultItem = function (e, t, n) {
    return {
      commandId: e,
      text: t,
      icon: n
    };
  };
  n.show = function (e, t) {
    this._menu.option("items", t || this._items);
    this._menu.option("position.offset", {
      x: e.x,
      y: e.y
    });
    this._menu.option("position.collision", "fit");
    this._menu.show();
  };
  n.hide = function () {
    this._menu.hide();
  };
  n.isContextMenu = function () {
    return true;
  };
  return t;
}(I);
exports.GanttContextMenuBar = E;