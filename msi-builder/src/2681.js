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
exports.default = undefined;
var o = c(require("./68374.js"));
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./20576.js");
var l = c(require("./14390.js"));
var u = c(require("./5631.js"));
var d = require("./75084.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e, t) {
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
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var p = {
  create: {},
  upload: {},
  download: {},
  rename: {},
  move: {},
  copy: {},
  delete: {},
  refresh: {
    beginGroup: true
  }
};
var g = ["beginGroup", "closeMenuOnClick", "disabled", "icon", "selectable", "selected", "text", "visible"];
var m = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var l;
  var c;
  var m;
  var _ = i.prototype;
  _._initMarkup = function () {
    var t = this;
    this._initActions();
    this._isVisible = false;
    var n = (0, o.default)("<div>").appendTo(this.$element());
    this._contextMenu = this._createComponent(n, u.default, {
      cssClass: "dx-filemanager-context-menu",
      showEvent: "",
      onItemClick: function (e) {
        return t._onContextMenuItemClick(e.itemData.name, e);
      },
      onShowing: function (e) {
        return t._onContextMenuShowing(e);
      },
      onShown: function () {
        return t._onContextMenuShown();
      },
      onHidden: function () {
        return t._onContextMenuHidden();
      }
    });
    e.prototype._initMarkup.call(this);
  };
  _.showAt = function (e, t, n, i) {
    var o = i.itemData;
    var a = i.itemElement;
    var r = i.isActionButton;
    var s = r !== undefined && r;
    if (this._isVisible) {
      this._onContextMenuHidden();
    }
    this._menuShowingContext = {
      targetElement: a,
      itemData: o,
      fileItems: e,
      event: n,
      isActionButton: s
    };
    var l = {
      of: t,
      at: "top left",
      my: "top left",
      offset: ""
    };
    if (n) {
      l.offset = n.offsetX + " " + n.offsetY;
    } else {
      l.my = "left top";
      l.at = "left bottom";
      l.boundaryOffset = "1";
    }
    this._contextMenu.option({
      target: t,
      position: l
    });
    this._contextMenu.show();
  };
  _.createContextMenuItems = function (e, t, n) {
    var i = this;
    this._targetFileItems = e;
    this._targetFileItem = (0, r.isDefined)(n) ? n : e == null ? undefined : e[0];
    var o = [];
    (t || this.option("items")).forEach(function (t) {
      var n = (0, r.isString)(t) ? t : t.name;
      var a = i._configureItemByCommandName(n, t, e, i._targetFileItem);
      if (i._isContextMenuItemAvailable(a, e)) {
        o.push(a);
      }
    });
    return o;
  };
  _._isContextMenuItemAvailable = function (e, t) {
    if (this._isDefaultItem(e.name) && e._autoHide) {
      return (!this._isIsolatedCreationItemCommand(e.name) || !t || !t.length) && this._commandManager.isCommandAvailable(e.name, t);
    } else {
      return (0, s.ensureDefined)(e.visible, true);
    }
  };
  _._isIsolatedCreationItemCommand = function (e) {
    return (e === "create" || e === "upload") && this.option("isolateCreationItemCommands");
  };
  _._isDefaultItem = function (e) {
    return !!p[e];
  };
  _._configureItemByCommandName = function (e, t, n, i) {
    if (!this._isDefaultItem(e)) {
      var o = (0, a.extend)(true, {}, t);
      o.originalItemData = t;
      this._addItemClickHandler(e, o);
      if (Array.isArray(t.items)) {
        o.items = this.createContextMenuItems(n, t.items, i);
      }
      return o;
    }
    var s = this._createMenuItemByCommandName(e);
    var l = p[e];
    (0, a.extend)(s, l);
    s.originalItemData = t;
    (0, d.extendAttributes)(s, t, g);
    if (!(0, r.isDefined)(s.visible)) {
      s._autoHide = true;
    }
    if (e && !s.name) {
      (0, a.extend)(s, {
        name: e
      });
    }
    return s;
  };
  _._createMenuItemByCommandName = function (e) {
    var t = this._commandManager.getCommandByName(e);
    var n = {
      name: e,
      text: t.text,
      icon: t.icon
    };
    this._addItemClickHandler(e, n);
    return n;
  };
  _._addItemClickHandler = function (e, t) {
    var n = this;
    t.onItemClick = function (t) {
      return n._onContextMenuItemClick(e, t);
    };
  };
  _._onContextMenuItemClick = function (e, t) {
    var i = (0, a.extend)(true, {}, t);
    i.itemData = t.itemData.originalItemData;
    i.fileSystemItem = this._targetFileItem?.fileItem;
    i.viewArea = this.option("viewArea");
    this._actions.onItemClick(i);
    if (this._isDefaultItem(e)) {
      var o = this._isIsolatedCreationItemCommand(e) ? null : this._targetFileItems;
      this._commandManager.executeCommand(e, o);
    }
  };
  _._initActions = function () {
    this._actions = {
      onContextMenuHidden: this._createActionByOption("onContextMenuHidden"),
      onContextMenuShowing: this._createActionByOption("onContextMenuShowing"),
      onItemClick: this._createActionByOption("onItemClick")
    };
  };
  _._onContextMenuShowing = function (e) {
    if (this._isVisible) {
      this._onContextMenuHidden(true);
    }
    e = (0, a.extend)(e, this._menuShowingContext, {
      options: this.option(),
      cancel: false
    });
    this._actions.onContextMenuShowing(e);
    if (!e.cancel) {
      var t = this.createContextMenuItems(this._menuShowingContext.fileItems, null, this._menuShowingContext.fileSystemItem);
      this._contextMenu.option("dataSource", t);
    }
  };
  _.tryUpdateVisibleContextMenu = function () {
    if (this._isVisible) {
      var e = this.createContextMenuItems(this._targetFileItems);
      this._contextMenu.option("dataSource", e);
    }
  };
  _._onContextMenuShown = function () {
    this._isVisible = true;
  };
  _._onContextMenuHidden = function (e) {
    this._isVisible = false;
    if (!e) {
      this._menuShowingContext = {};
    }
    this._contextMenu.option("visible", false);
    this._raiseContextMenuHidden();
  };
  _._raiseContextMenuHidden = function () {
    this._actions.onContextMenuHidden();
  };
  _._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      commandManager: null,
      onContextMenuHidden: null,
      onItemClick: null
    });
  };
  _._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "commandManager":
        this.repaint();
        break;
      case "items":
        this.tryUpdateVisibleContextMenu();
        break;
      case "onItemClick":
      case "onContextMenuShowing":
      case "onContextMenuHidden":
        this._actions[n] = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  l = i;
  if (c = [{
    key: "_commandManager",
    get: function () {
      return this.option("commandManager");
    }
  }]) {
    h(l.prototype, c);
  }
  if (m) {
    h(l, m);
  }
  Object.defineProperty(l, "prototype", {
    writable: false
  });
  return i;
}(l.default);
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;