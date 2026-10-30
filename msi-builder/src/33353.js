exports.default = undefined;
var i = d(require("./68374.js"));
var o = d(require("./14390.js"));
var a = d(require("./10042.js"));
var r = d(require("./72321.js"));
var s = d(require("./20261.js"));
var l = d(require("./50984.js"));
var u = require("./348.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  h(e, t);
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  c(t, e);
  var n = t.prototype;
  n._init = function () {
    e.prototype._init.call(this);
    this._createOnVisibilityChangingAction();
    this._createOnInternalCommand();
    this._createOnCustomCommand();
    this._createOnItemClickAction();
    this._tempState = undefined;
    this._commands = [];
    this._commandToIndexMap = {};
    this.bar = new g(this);
  };
  n._initMarkup = function () {
    var t = this;
    e.prototype._initMarkup.call(this);
    this._commands = this._getCommands();
    this._commandToIndexMap = {};
    this._fillCommandToIndexMap(this._commands, []);
    this._$contextMenuTargetElement = (0, i.default)("<div>").addClass("dx-diagram-touchbar-target").appendTo(this.$element());
    var n = (0, i.default)("<div>").appendTo(this.$element());
    this._contextMenuInstance = this._createComponent(n, p, {
      isTouchBarMode: this._isTouchBarMode(),
      cssClass: this._isTouchBarMode() ? "dx-diagram-touchbar" : s.default.getContextMenuCssClass(),
      hideOnOutsideClick: false,
      showEvent: "",
      focusStateEnabled: false,
      items: this._commands,
      position: this._isTouchBarMode() ? {
        my: {
          x: "center",
          y: "bottom"
        },
        at: {
          x: "center",
          y: "top"
        },
        of: this._$contextMenuTargetElement
      } : {},
      itemTemplate: function (e, t, n) {
        s.default.getContextMenuItemTemplate(this, e, t, n);
      },
      onItemClick: function (e) {
        var n = e.itemData;
        return t._onItemClick(n);
      },
      onShowing: function (e) {
        if (t._inOnShowing !== true) {
          t._inOnShowing = true;
          t._onVisibilityChangingAction({
            visible: true,
            component: t
          });
          e.component.option("items", e.component.option("items"));
          delete t._inOnShowing;
        }
      }
    });
  };
  n._show = function (e, t, n) {
    this._contextMenuInstance.hide();
    if (this._isTouchBarMode()) {
      this._$contextMenuTargetElement.show();
      n ||= {
        x: e,
        y: t,
        width: 0,
        height: 0
      };
      var i = n.width > 800 ? 0 : (800 - n.width) / 2;
      this._$contextMenuTargetElement.css({
        left: n.x - i,
        top: n.y - 32,
        width: n.width + i * 2,
        height: n.height + 64
      });
      this._contextMenuInstance.show();
    } else {
      this._contextMenuInstance.option("position", {
        offset: e + " " + t
      });
      this._contextMenuInstance.show();
    }
  };
  n._hide = function () {
    this._$contextMenuTargetElement.hide();
    this._contextMenuInstance.hide();
  };
  n._isTouchBarMode = function () {
    return (0, u.getDiagram)().Browser.TouchUI;
  };
  n._onItemClick = function (e) {
    var t = false;
    if (this._onItemClickAction) {
      t = this._onItemClickAction(e);
    }
    if (!t) {
      s.default.onContextMenuItemClick(this, e, this._executeCommand.bind(this));
      this._contextMenuInstance.hide();
    }
  };
  n._executeCommand = function (e, t, n) {
    if (typeof e == "number") {
      this.bar.raiseBarCommandExecuted(e, n);
    } else if (typeof e == "string") {
      this._onInternalCommandAction({
        command: e
      });
    }
    if (t !== undefined) {
      this._onCustomCommandAction({
        name: t
      });
    }
  };
  n._createOnInternalCommand = function () {
    this._onInternalCommandAction = this._createActionByOption("onInternalCommand");
  };
  n._createOnCustomCommand = function () {
    this._onCustomCommandAction = this._createActionByOption("onCustomCommand");
  };
  n._getCommands = function () {
    return r.default.getContextMenuCommands(this.option("commands"));
  };
  n._fillCommandToIndexMap = function (e, t) {
    var n = this;
    e.forEach(function (e, i) {
      var o = t.concat([i]);
      if (e.command !== undefined) {
        n._commandToIndexMap[e.command] = o;
      }
      if (Array.isArray(e.items)) {
        n._fillCommandToIndexMap(e.items, o);
      }
    });
  };
  n._setItemEnabled = function (e, t) {
    this._setItemVisible(e, t);
  };
  n._setItemVisible = function (e, t) {
    var n = s.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[e]);
    s.default.updateContextMenuItemVisible(this._contextMenuInstance, n, t);
  };
  n._setItemValue = function (e, t) {
    var n = s.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[e]);
    s.default.updateContextMenuItemValue(this._contextMenuInstance, n, e, t);
  };
  n._setItemSubItems = function (e, t) {
    var n = s.default.getItemOptionText(this._contextMenuInstance, this._commandToIndexMap[e]);
    s.default.updateContextMenuItems(this._contextMenuInstance, n, e, t);
  };
  n._setEnabled = function (e) {
    this._contextMenuInstance.option("disabled", !e);
  };
  n.isVisible = function () {
    return this._inOnShowing;
  };
  n._createOnVisibilityChangingAction = function () {
    this._onVisibilityChangingAction = this._createActionByOption("onVisibilityChanging");
  };
  n._createOnItemClickAction = function () {
    this._onItemClickAction = this._createActionByOption("onItemClick");
  };
  n._optionChanged = function (t) {
    switch (t.name) {
      case "onVisibilityChanging":
        this._createOnVisibilityChangingAction();
        break;
      case "onInternalCommand":
        this._createOnInternalCommand();
        break;
      case "onCustomCommand":
        this._createOnCustomCommand();
        break;
      case "onItemClick":
        this._createOnItemClickAction();
        break;
      case "commands":
        this._invalidate();
        break;
      case "export":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return t;
}(o.default);
var p = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  c(t, e);
  t.prototype._renderContextMenuOverlay = function () {
    var t = this;
    e.prototype._renderContextMenuOverlay.call(this);
    if (this._overlay && this.option("isTouchBarMode") && this._overlay) {
      this._overlay.option("onShown", function () {
        (0, i.default)(t._overlay.$content()).parent().addClass("dx-diagram-touchbar-overlay");
      });
    }
  };
  return t;
}(a.default);
var g = function (e) {
  function t(t) {
    return e.call(this, t) || this;
  }
  c(t, e);
  var n = t.prototype;
  n.getCommandKeys = function () {
    return this._getKeys(this._owner._commands);
  };
  n.setItemValue = function (e, t) {
    this._owner._setItemValue(e, t);
  };
  n.setItemEnabled = function (e, t) {
    this._owner._setItemEnabled(e, t);
  };
  n.setItemVisible = function (e, t) {
    this._owner._setItemVisible(e, t);
  };
  n.setItemSubItems = function (e, t) {
    this._owner._setItemSubItems(e, t);
  };
  n.setEnabled = function (e) {
    this._owner._setEnabled(e);
  };
  n.isVisible = function () {
    return this._owner.isVisible();
  };
  return t;
}(l.default);
var m = {
  DiagramContextMenuWrapper: f,
  DiagramContextMenu: p
};
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;