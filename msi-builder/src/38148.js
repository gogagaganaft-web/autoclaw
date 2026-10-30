exports.default = undefined;
var i = require("./58664.js");
var o = f(require("./68374.js"));
var a = f(require("./71042.js"));
var r = f(require("./10042.js"));
var s = f(require("./50984.js"));
var l = require("./13306.js");
var u = require("./58201.js");
var d = f(require("./47596.js"));
var c = f(require("./20261.js"));
var h = require("./348.js");
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
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  g(e, t);
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
require("./78665.js");
require("./4278.js");
require("./18859.js");
var m = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  p(t, e);
  var n = t.prototype;
  n._init = function () {
    this._commands = [];
    this._itemHelpers = {};
    this._commandContextMenus = {};
    this._contextMenuList = [];
    this._valueConverters = {};
    this.bar = new _(this);
    this._createOnInternalCommand();
    this._createOnCustomCommand();
    this._createOnSubMenuVisibilityChangingAction();
    e.prototype._init.call(this);
  };
  n._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    var t = !(0, u.hasWindow)();
    if (!this.option("skipAdjustSize") && !t) {
      (0, i.setWidth)(this.$element(), "");
    }
    this._commands = this._getCommands();
    this._itemHelpers = {};
    this._commandContextMenus = {};
    this._contextMenuList = [];
    var n = this._createMainElement();
    this._renderToolbar(n);
    if (!this.option("skipAdjustSize") && !t) {
      var o = this.$element().find(".dx-toolbar-before");
      (0, i.setWidth)(this.$element(), (0, i.getWidth)(o));
    }
  };
  n._createMainElement = function () {
    return (0, o.default)("<div>").addClass("dx-diagram-toolbar").appendTo(this._$element);
  };
  n._getCommands = function () {
    return this.option("commands") || [];
  };
  n._renderToolbar = function (e) {
    var t = this._commands.filter(function (e) {
      return ["after", "center"].indexOf(e.location) === -1;
    });
    var n = this._commands.filter(function (e) {
      return e.location === "center";
    });
    var i = this._commands.filter(function (e) {
      return e.location === "after";
    });
    var o = [].concat(this._prepareToolbarItems(t, "before", this._executeCommand)).concat(this._prepareToolbarItems(n, "center", this._executeCommand)).concat(this._prepareToolbarItems(i, "after", this._executeCommand));
    this._toolbarInstance = this._createComponent(e, a.default, {
      dataSource: o
    });
  };
  n._prepareToolbarItems = function (e, t, n) {
    var i = this;
    return e.map(function (e) {
      return (0, l.extend)(true, {
        location: t,
        locateInMenu: i.option("locateInMenu")
      }, i._createItem(e, t, n), i._createItemOptions(e), i._createItemActionOptions(e, n));
    });
  };
  n._createItem = function (e, t, n) {
    var i = this;
    if (e.getCommandValue || e.getEditorValue || e.getEditorDisplayValue) {
      this._valueConverters[e.command] = {
        getCommandValue: e.getCommandValue,
        getEditorValue: e.getEditorValue,
        getEditorDisplayValue: e.getEditorDisplayValue
      };
    }
    if (e.widget === "separator") {
      return {
        template: function (e, t, n) {
          (0, o.default)(n).addClass("dx-diagram-toolbar-separator");
        },
        menuItemTemplate: function (e, t, n) {
          (0, o.default)(n).addClass("dx-diagram-toolbar-menu-separator");
        }
      };
    } else {
      return {
        widget: e.widget || "dxButton",
        cssClass: e.cssClass,
        options: {
          stylingMode: this.option("buttonStylingMode"),
          type: this.option("buttonType"),
          text: e.text,
          hint: e.hint,
          icon: e.icon || e.iconUnchecked || e.iconChecked,
          iconChecked: e.iconChecked,
          iconUnchecked: e.iconUnchecked,
          onInitialized: function (t) {
            return i._onItemInitialized(t.component, e);
          },
          onContentReady: function (t) {
            return i._onItemContentReady(t.component, e, n);
          }
        }
      };
    }
  };
  n._createItemOptions = function (e) {
    var t = e.widget;
    var n = e.command;
    var i = e.items;
    var o = e.valueExpr;
    var a = e.displayExpr;
    var r = e.showText;
    var s = e.hint;
    var l = e.icon;
    if (t === "dxSelectBox") {
      return this._createSelectBoxItemOptions(n, s, i, o, a);
    } else if (t === "dxTextBox") {
      return this._createTextBoxItemOptions(n, s);
    } else if (t === "dxColorBox") {
      return this._createColorBoxItemOptions(n, s, l);
    } else if (t && t !== "dxButton") {
      return undefined;
    } else {
      return {
        showText: r || "inMenu"
      };
    }
  };
  n._createSelectBoxItemOptions = function (e, t, n, i, a) {
    var r = this._createTextEditorItemOptions(t);
    r = (0, l.extend)(true, r, {
      options: {
        dataSource: n,
        displayExpr: a || "text",
        valueExpr: i || "value"
      }
    });
    var s = n && n.every(function (e) {
      return e.icon !== undefined;
    });
    if (s) {
      r = (0, l.extend)(true, r, {
        options: {
          fieldTemplate: function (e, t) {
            (0, o.default)("<i>").addClass(e && e.icon || "dx-diagram-i-selectbox-null-icon dx-diagram-i").appendTo(t);
            (0, o.default)("<div>").dxTextBox({
              readOnly: true,
              stylingMode: "outlined"
            }).appendTo(t);
          },
          itemTemplate: function (e, t, n) {
            (0, o.default)(n).attr("title", e.hint);
            return `<i class="${e.icon}"></i>`;
          }
        }
      });
    }
    return r;
  };
  n._createTextBoxItemOptions = function (e, t) {
    var n = this;
    var i = this._createTextEditorItemOptions(t);
    return i = (0, l.extend)(true, i, {
      options: {
        readOnly: true,
        focusStateEnabled: false,
        hoverStateEnabled: false,
        buttons: [{
          name: "dropDown",
          location: "after",
          options: {
            icon: "spindown",
            disabled: false,
            stylingMode: "text",
            onClick: function (t) {
              var i = n._commandContextMenus[e];
              if (i) {
                n._toggleContextMenu(i);
              }
            }
          }
        }]
      }
    });
  };
  n._createColorBoxItemOptions = function (e, t, n) {
    var i = this;
    var a = this._createTextEditorItemOptions(t);
    if (n) {
      a = (0, l.extend)(true, a, {
        options: {
          openOnFieldClick: true,
          fieldTemplate: function (e, t) {
            (0, o.default)("<i>").addClass(n).css("borderBottomColor", e).appendTo(t);
            (0, o.default)("<div>").dxTextBox({
              readOnly: true,
              stylingMode: "outlined"
            }).appendTo(t);
          }
        }
      });
    }
    return a = (0, l.extend)(true, a, {
      options: {
        onOpened: function () {
          if (i.option("isMobileView")) {
            (0, o.default)("body").addClass("dx-diagram-mobile-toolbar-color-box-opened");
          }
        },
        onClosed: function () {
          (0, o.default)("body").removeClass("dx-diagram-mobile-toolbar-color-box-opened");
        }
      }
    });
  };
  n._createTextEditorItemOptions = function (e) {
    return {
      options: {
        stylingMode: this.option("editorStylingMode"),
        hint: e
      }
    };
  };
  n._createItemActionOptions = function (e, t) {
    var n = this;
    switch (e.widget) {
      case "dxSelectBox":
      case "dxColorBox":
      case "dxCheckBox":
        return {
          options: {
            onValueChanged: function (i) {
              var o = c.default.getItemCommandParameter(n, e, i.component.option("value"));
              t.call(n, e.command, e.name, o);
            }
          }
        };
      case "dxTextBox":
        return {};
      default:
        return {
          options: {
            onClick: function (i) {
              if (e.items) {
                var o = i.component._contextMenu;
                if (o) {
                  n._toggleContextMenu(o);
                }
              } else {
                var a = c.default.getItemCommandParameter(n, e);
                t.call(n, e.command, e.name, a);
              }
            }
          }
        };
    }
  };
  n._toggleContextMenu = function (e) {
    this._contextMenuList.forEach(function (t) {
      if (e !== t) {
        t.hide();
      }
    });
    e.toggle();
  };
  n._onItemInitialized = function (e, t) {
    this._addItemHelper(t.command, new v(e));
  };
  n._onItemContentReady = function (e, t, n) {
    var i = this;
    if ((e.NAME === "dxButton" || e.NAME === "dxTextBox") && t.items) {
      var a = this._isTouchMode();
      var s = (0, o.default)("<div>").appendTo(this.$element());
      e._contextMenu = this._createComponent(s, r.default, {
        items: t.items,
        target: e.$element(),
        cssClass: c.default.getContextMenuCssClass(),
        showEvent: "",
        hideOnOutsideClick: function (t) {
          return !a && (0, o.default)(t.target).closest(e._contextMenu._dropDownButtonElement).length === 0;
        },
        focusStateEnabled: false,
        position: {
          at: "left bottom"
        },
        itemTemplate: function (e, t, n) {
          c.default.getContextMenuItemTemplate(this, e, t, n);
        },
        onItemClick: function (e) {
          var t = e.component;
          var o = e.itemData;
          c.default.onContextMenuItemClick(i, o, n.bind(i));
          if (!o.items || !o.items.length) {
            t.hide();
          }
        },
        onShowing: function (e) {
          if (!i._showingSubMenu) {
            i._showingSubMenu = e.component;
            i._onSubMenuVisibilityChangingAction({
              visible: true,
              component: i
            });
            e.component.option("items", e.component.option("items"));
            delete i._showingSubMenu;
          }
        },
        onInitialized: function (n) {
          var o = n.component;
          return i._onContextMenuInitialized(o, t, e);
        },
        onDisposing: function (e) {
          var n = e.component;
          return i._onContextMenuDisposing(n, t);
        }
      });
      if (!a) {
        e._contextMenu._dropDownButtonElement = e.$element();
        if (e.NAME === "dxTextBox") {
          e._contextMenu._dropDownButtonElement = e.getButton("dropDown").element();
        }
      }
    }
  };
  n._isTouchMode = function () {
    return (0, h.getDiagram)().Browser.TouchUI;
  };
  n._onContextMenuInitialized = function (e, t, n) {
    this._contextMenuList.push(e);
    if (t.command) {
      this._commandContextMenus[t.command] = e;
    }
    this._addContextMenuHelper(t, e, [], n);
  };
  n._addItemHelper = function (e, t) {
    if (e !== undefined) {
      if (this._itemHelpers[e]) {
        throw new Error("Toolbar cannot contain duplicated commands.");
      }
      this._itemHelpers[e] = t;
    }
  };
  n._addContextMenuHelper = function (e, t, n, i) {
    var o = this;
    if (e.items) {
      e.items.forEach(function (e, a) {
        var r = n.concat(a);
        o._addItemHelper(e.command, new y(t, r, e.command, i));
        o._addContextMenuHelper(e, t, r, i);
      });
    }
  };
  n._onContextMenuDisposing = function (e, t) {
    this._contextMenuList.splice(this._contextMenuList.indexOf(e), 1);
    delete this._commandContextMenus[t.command];
  };
  n._executeCommand = function (e, t, n) {
    if (!this._updateLocked) {
      if (typeof e == "number") {
        var i = this._valueConverters[e];
        if (i && i.getCommandValue) {
          n = i.getCommandValue(n);
        }
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
    }
  };
  n._createOnInternalCommand = function () {
    this._onInternalCommandAction = this._createActionByOption("onInternalCommand");
  };
  n._createOnCustomCommand = function () {
    this._onCustomCommandAction = this._createActionByOption("onCustomCommand");
  };
  n._setItemEnabled = function (e, t) {
    if (e in this._itemHelpers) {
      var n = this._itemHelpers[e];
      if (n.canUpdate(this._showingSubMenu)) {
        n.setEnabled(t);
      }
    }
  };
  n._setEnabled = function (e) {
    this._toolbarInstance.option("disabled", !e);
    this._contextMenuList.forEach(function (t) {
      t.option("disabled", !e);
    });
  };
  n._setItemValue = function (e, t) {
    try {
      this._updateLocked = true;
      if (e in this._itemHelpers) {
        var n = this._itemHelpers[e];
        if (n.canUpdate(this._showingSubMenu)) {
          var i;
          var o = this._valueConverters[e];
          if (o && o.getEditorValue) {
            t = o.getEditorValue(t);
          }
          if (o && o.getEditorDisplayValue) {
            i = o.getEditorDisplayValue(t);
          }
          var a = this._commandContextMenus[e];
          n.setValue(t, i, a, a && e);
        }
      }
    } finally {
      this._updateLocked = false;
    }
  };
  n._setItemSubItems = function (e, t) {
    this._updateLocked = true;
    if (e in this._itemHelpers) {
      var n = this._itemHelpers[e];
      if (n.canUpdate(this._showingSubMenu)) {
        var i = this._commandContextMenus[e];
        n.setItems(t, i, i && e);
      }
    }
    this._updateLocked = false;
  };
  n._createOnSubMenuVisibilityChangingAction = function () {
    this._onSubMenuVisibilityChangingAction = this._createActionByOption("onSubMenuVisibilityChanging");
  };
  n._optionChanged = function (t) {
    switch (t.name) {
      case "isMobileView":
        (0, o.default)("body").removeClass("dx-diagram-mobile-toolbar-color-box-opened");
        this._invalidate();
        break;
      case "onSubMenuVisibilityChanging":
        this._createOnSubMenuVisibilityChangingAction();
        break;
      case "onInternalCommand":
        this._createOnInternalCommand();
        break;
      case "onCustomCommand":
        this._createOnCustomCommand();
        break;
      case "container":
      case "commands":
        this._invalidate();
        break;
      case "export":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  n._getDefaultOptions = function () {
    return (0, l.extend)(e.prototype._getDefaultOptions.call(this), {
      isMobileView: false,
      export: {
        fileName: "Diagram"
      },
      locateInMenu: "auto",
      buttonStylingMode: "text",
      buttonType: "normal",
      editorStylingMode: "filled",
      skipAdjustSize: false
    });
  };
  n.setCommandChecked = function (e, t) {
    this._setItemValue(e, t);
  };
  n.setCommandEnabled = function (e, t) {
    this._setItemEnabled(e, t);
  };
  return t;
}(d.default);
var _ = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  p(t, e);
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
  n.setEnabled = function (e) {
    this._owner._setEnabled(e);
  };
  n.setItemSubItems = function (e, t) {
    this._owner._setItemSubItems(e, t);
  };
  return t;
}(s.default);
var v = function () {
  function e(e) {
    this._widget = e;
  }
  var t = e.prototype;
  t.canUpdate = function (e) {
    return e === undefined;
  };
  t.setEnabled = function (e) {
    this._widget.option("disabled", !e);
  };
  t.setValue = function (e, t, n, i) {
    if ("value" in this._widget.option()) {
      this._updateEditorValue(e, t);
    } else if (e !== undefined) {
      this._updateButtonValue(e);
    }
    if (n) {
      this._updateContextMenuItemValue(n, "", i, e);
    }
  };
  t.setItems = function (e, t, n) {
    if (t) {
      this._updateContextMenuItems(t, "", n, e);
    } else {
      this._updateEditorItems(e);
    }
  };
  t._updateContextMenuItems = function (e, t, n, i) {
    c.default.updateContextMenuItems(e, t, n, i);
  };
  t._updateEditorItems = function (e) {
    if ("items" in this._widget.option()) {
      this._widget.option("items", e.map(function (e) {
        return {
          value: c.default.getItemValue(e),
          text: e.text
        };
      }));
    }
  };
  t._updateEditorValue = function (e, t) {
    this._widget.option("value", e);
    if (!this._widget.option("selectedItem") && t) {
      this._widget.option("value", t);
    }
  };
  t._updateButtonValue = function (e) {
    if (this._widget.option("iconChecked") && this._widget.option("iconUnchecked")) {
      this._widget.option("icon", e ? this._widget.option("iconChecked") : this._widget.option("iconUnchecked"));
    } else {
      this._widget.$element().toggleClass("dx-format-active", e);
    }
  };
  t._updateContextMenuItemValue = function (e, t, n, i) {
    c.default.updateContextMenuItemValue(e, t, n, i);
  };
  return e;
}();
var y = function (e) {
  function t(t, n, i, o) {
    var a;
    (a = e.call(this, t) || this)._indexPath = n;
    a._rootCommandKey = i;
    a._rootWidget = o;
    return a;
  }
  p(t, e);
  var n = t.prototype;
  n.canUpdate = function (t) {
    return e.prototype.canUpdate.call(this, t) || t === this._widget;
  };
  n.setEnabled = function (e) {
    this._widget.option(this._getItemOptionText() + "disabled", !e);
    var t = this._hasEnabledCommandItems(this._widget.option("items"));
    this._rootWidget.option("disabled", !t);
  };
  n._hasEnabledCommandItems = function (e) {
    var t = this;
    return !!e && e.some(function (e) {
      return e.command !== undefined && !e.disabled || t._hasEnabledCommandItems(e.items);
    });
  };
  n.setValue = function (e) {
    this._updateContextMenuItemValue(this._widget, this._getItemOptionText(), this._rootCommandKey, e);
  };
  n.setItems = function (e) {
    this._updateContextMenuItems(this._widget, this._getItemOptionText(), this._rootCommandKey, e);
  };
  n._getItemOptionText = function () {
    return c.default.getItemOptionText(this._widget, this._indexPath);
  };
  return t;
}(v);
var b = m;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;