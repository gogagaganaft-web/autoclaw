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
var o = require("./58664.js");
var a = f(require("./68374.js"));
var r = require("./13306.js");
var s = require("./35922.js");
var l = require("./20576.js");
var u = f(require("./28109.js"));
var d = require("./75084.js");
var c = f(require("./14390.js"));
var h = f(require("./71042.js"));
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
require("./45231.js");
var m = {
  showNavPane: {
    location: "before"
  },
  create: {
    location: "before",
    compactMode: {
      showText: "inMenu",
      locateInMenu: "auto"
    }
  },
  upload: {
    location: "before",
    compactMode: {
      showText: "inMenu",
      locateInMenu: "auto"
    }
  },
  refresh: {
    location: "after",
    showText: "inMenu",
    cssClass: "dx-filemanager-toolbar-has-large-icon",
    compactMode: {
      showText: "inMenu",
      locateInMenu: "auto"
    }
  },
  switchView: {
    location: "after"
  },
  download: {
    location: "before",
    compactMode: {
      showText: "inMenu",
      locateInMenu: "auto"
    }
  },
  move: {
    location: "before",
    compactMode: {
      showText: "inMenu",
      locateInMenu: "auto"
    }
  },
  copy: {
    location: "before",
    compactMode: {
      showText: "inMenu",
      locateInMenu: "auto"
    }
  },
  rename: {
    location: "before",
    compactMode: {
      showText: "inMenu",
      locateInMenu: "auto"
    }
  },
  delete: {
    location: "before",
    compactMode: {
      showText: "inMenu"
    }
  },
  clearSelection: {
    location: "after",
    locateInMenu: "never",
    compactMode: {
      showText: "inMenu"
    }
  },
  separator: {
    location: "before"
  }
};
var _ = ["visible", "location", "locateInMenu", "disabled", "showText"];
var v = ["accessKey", "elementAttr", "height", "hint", "icon", "stylingMode", "tabIndex", "text", "width"];
var y = ["separator", "switchView"];
var b = {
  default: "dx-filemanager-i dx-filemanager-i-refresh",
  progress: "dx-filemanager-i dx-filemanager-i-progress",
  success: "dx-filemanager-i dx-filemanager-i-done",
  error: "dx-filemanager-i dx-filemanager-i-danger"
};
var x = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var c;
  var f;
  var x;
  var w = i.prototype;
  w._init = function () {
    e.prototype._init.call(this);
    this._generalToolbarVisible = true;
    this._refreshItemState = {
      message: "",
      status: "default"
    };
  };
  w._initMarkup = function () {
    this._createItemClickedAction();
    this._$viewSwitcherPopup = (0, a.default)("<div>").addClass("dx-filemanager-view-switcher-popup");
    this._generalToolbar = this._createToolbar(this.option("generalItems"), !this._generalToolbarVisible);
    this._fileToolbar = this._createToolbar(this.option("fileItems"), this._generalToolbarVisible);
    this._$viewSwitcherPopup.appendTo(this.$element());
    this.$element().addClass("dx-filemanager-toolbar dx-filemanager-general-toolbar");
  };
  w._render = function () {
    e.prototype._render.call(this);
    var t = this._getVisibleToolbar();
    this._checkCompactMode(t);
  };
  w._clean = function () {
    delete this._commandManager;
    delete this._itemClickedAction;
    delete this._$viewSwitcherPopup;
    delete this._generalToolbar;
    delete this._fileToolbar;
    e.prototype._clean.call(this);
  };
  w._dimensionChanged = function (e) {
    if (!e || e !== "height") {
      var t = this._getVisibleToolbar();
      this._checkCompactMode(t);
    }
  };
  w._getVisibleToolbar = function () {
    if (this._generalToolbarVisible) {
      return this._generalToolbar;
    } else {
      return this._fileToolbar;
    }
  };
  w._createToolbar = function (e, t) {
    var n = this;
    var i = this._getPreparedItems(e);
    var o = (0, a.default)("<div>").appendTo(this.$element());
    var r = this._createComponent(o, h.default, {
      items: i,
      visible: !t,
      onItemClick: function (e) {
        return n._raiseItemClicked(e);
      }
    });
    r.compactMode = false;
    return r;
  };
  w._getPreparedItems = function (e) {
    var t = this;
    e = e.map(function (e) {
      var n = e;
      if ((0, s.isString)(e)) {
        n = {
          name: e
        };
      }
      var i = n.name;
      var o = t._configureItemByCommandName(i, n);
      o.originalItemData = e;
      if (i !== "separator") {
        t._setItemVisibleAvailable(o);
      }
      return o;
    });
    this._updateSeparatorsVisibility(e);
    return e;
  };
  w._updateSeparatorsVisibility = function (e, t) {
    var n = this;
    var i = false;
    var o = this._getMenuItems(t);
    var a = {
      before: false,
      center: false,
      after: false
    };
    var r = {
      before: this._getItemsInGroup(e, o, "before"),
      center: this._getItemsInGroup(e, o, "center"),
      after: this._getItemsInGroup(e, o, "after")
    };
    e.forEach(function (e, t) {
      var s = e.location;
      if (e.name === "separator") {
        var l = a[s] && n._groupHasItemsAfter(r[s]);
        if (e.visible !== l) {
          i = true;
          e.visible = l;
        }
        a[s] = false;
      } else {
        if (!n._isItemInMenu(o, e)) {
          a[s] = a[s] || e.visible;
        }
        r[s].shift();
      }
    });
    if (t && i) {
      t.repaint();
    }
    return i;
  };
  w._getMenuItems = function (e) {
    return (e ? e._getMenuItems() : []).map(function (e) {
      return e.originalItemData;
    });
  };
  w._isItemInMenu = function (e, t) {
    return !!e.length && (0, l.ensureDefined)(t.locateInMenu, "never") !== "never" && e.indexOf(t.originalItemData) !== -1;
  };
  w._getItemsInGroup = function (e, t, n) {
    var i = this;
    return e.filter(function (e) {
      return e.location === n && !i._isItemInMenu(t, e);
    });
  };
  w._groupHasItemsAfter = function (e) {
    for (var t = 0; t < e.length; t++) {
      if (e[t].name !== "separator" && e[t].visible) {
        return true;
      }
    }
    return false;
  };
  w._configureItemByCommandName = function (e, t) {
    var i = {};
    var o = this._commandManager.getCommandByName(e);
    if (o) {
      i = this._createCommandItem(o);
    }
    switch (e) {
      case "separator":
        i = this._createSeparatorItem();
        break;
      case "switchView":
        i = this._createViewModeItem();
    }
    if (this._isDefaultItem(e)) {
      var a = m[e];
      (0, r.extend)(true, i, a);
      var u = i.cssClass || "";
      (0, d.extendAttributes)(i, t, _);
      if ((0, s.isDefined)(t.options)) {
        (0, d.extendAttributes)(i.options, t.options, v);
      }
      (0, d.extendAttributes)(i.options, t, ["text", "icon"]);
      if (t.cssClass) {
        u = `${u} ${t.cssClass}`;
      }
      if (u) {
        i.cssClass = u;
      }
      if (!(0, s.isDefined)(t.visible)) {
        i._autoHide = true;
      }
      if (i.widget === "dxButton") {
        if (i.showText === "inMenu" && !(0, s.isDefined)(i.options.hint)) {
          i.options.hint = i.options.text;
        }
        if (i.compactMode && !(0, s.isDefined)(i.options.hint)) {
          this._configureHintForCompactMode(i);
        }
      }
    } else {
      (0, r.extend)(true, i, t);
      i.widget ||= "dxButton";
      if (i.widget === "dxButton" && !i.compactMode && !i.showText && i.options && i.options.icon && i.options.text) {
        i.compactMode = {
          showText: "inMenu"
        };
      }
    }
    if (e && !i.name) {
      (0, r.extend)(i, {
        name: e
      });
    }
    i.location = (0, l.ensureDefined)(i.location, "before");
    if (!(0, s.isDefined)(i.options?.stylingMode)) {
      if (i.widget === "dxButton") {
        (0, r.extend)(true, i, {
          options: {
            stylingMode: "text"
          }
        });
      }
      if (i.widget === "dxSelectBox") {
        (0, r.extend)(true, i, {
          options: {
            stylingMode: "filled"
          }
        });
      }
    }
    return i;
  };
  w._isDefaultItem = function (e) {
    return !!m[e];
  };
  w._createCommandItem = function (e) {
    var t = this;
    return {
      widget: "dxButton",
      options: {
        text: e.text,
        hint: e.hint,
        commandText: e.text,
        icon: e.icon,
        stylingMode: "text",
        onClick: function (n) {
          return t._executeCommand(e);
        }
      }
    };
  };
  w._createSeparatorItem = function () {
    return {
      template: function (e, t, n) {
        (0, a.default)(n).addClass("dx-filemanager-toolbar-separator-item");
      }
    };
  };
  w._createViewModeItem = function () {
    var e = this;
    var t = ["details", "thumbnails"].map(function (t) {
      var n = e._commandManager.getCommandByName(t);
      return {
        name: t,
        text: n.text,
        icon: n.icon
      };
    });
    var n = this.option("itemViewMode") === "thumbnails" ? 1 : 0;
    return {
      cssClass: "dx-filemanager-toolbar-viewmode-item",
      widget: "dxDropDownButton",
      options: {
        items: t,
        keyExpr: "name",
        selectedItemKey: this.option("itemViewMode"),
        displayExpr: " ",
        hint: t[n].text,
        stylingMode: "text",
        showArrowIcon: false,
        useSelectMode: true,
        dropDownOptions: {
          container: this._$viewSwitcherPopup
        },
        onItemClick: function (t) {
          return e._executeCommand(t.itemData.name);
        }
      }
    };
  };
  w._configureHintForCompactMode = function (e) {
    e.options.hint = "";
    e.compactMode.options = e.compactMode.options || {};
    e.compactMode.options.hint = e.options.text;
  };
  w._checkCompactMode = function (e) {
    if (e.compactMode) {
      this._toggleCompactMode(e, false);
    }
    var t = this._toolbarHasItemsOverflow(e);
    if (e.compactMode !== t) {
      if (!e.compactMode) {
        this._toggleCompactMode(e, t);
      }
      e.compactMode = t;
    } else if (e.compactMode) {
      this._toggleCompactMode(e, true);
    }
  };
  w._toolbarHasItemsOverflow = function (e) {
    return (0, o.getWidth)(e.$element()) < e._getItemsWidth();
  };
  w._toggleCompactMode = function (e, t) {
    var n = this;
    var i = false;
    var o = e.option("items");
    o.forEach(function (e) {
      if (e.compactMode) {
        var o = null;
        if (t) {
          e.saved = n._getCompactModeOptions(e, e._available);
          o = e.compactMode;
        } else {
          o = e.saved;
        }
        var a = n._getCompactModeOptions(o, e._available);
        (0, r.extend)(true, e, a);
        i = true;
      }
    });
    if (i = this._updateSeparatorsVisibility(o) || i) {
      e.repaint();
    }
    this._updateSeparatorsVisibility(o, e);
  };
  w._getCompactModeOptions = function (e, t) {
    var n = e.showText;
    var i = e.locateInMenu;
    var o = e.options;
    return {
      visible: t,
      showText: (0, l.ensureDefined)(n, "always"),
      locateInMenu: (0, l.ensureDefined)(i, "never"),
      options: {
        hint: o == null ? undefined : o.hint
      }
    };
  };
  w._ensureAvailableCommandsVisible = function (e) {
    var t = this;
    var n = false;
    var i = e.option("items");
    i.forEach(function (e) {
      if (e.name !== "separator") {
        var i = e._available;
        t._setItemVisibleAvailable(e);
        if (e._available !== i) {
          n = true;
        }
      }
    });
    if (n = this._updateSeparatorsVisibility(i) || n) {
      e.repaint();
    }
    this._updateSeparatorsVisibility(i, e);
  };
  w._setItemVisibleAvailable = function (e) {
    var n = e.originalItemData?.visible;
    e._available = this._isToolbarItemAvailable(e);
    e.visible = (0, s.isDefined)(n) ? n : e._available;
  };
  w._fileToolbarHasEffectiveItems = function () {
    var e = this;
    return this._fileToolbar.option("items").some(function (t) {
      return e._isFileToolbarItemAvailable(t);
    });
  };
  w._executeCommand = function (e) {
    this._commandManager.executeCommand(e);
  };
  w._isToolbarItemAvailable = function (e) {
    if (this._isDefaultItem(e.name) && e._autoHide) {
      if (e.name === "refresh") {
        return this._generalToolbarVisible || !!this._isRefreshVisibleInFileToolbar;
      } else {
        return y.indexOf(e.name) > -1 || this._isCommandAvailable(e.name);
      }
    } else {
      return (0, l.ensureDefined)(e.visible, true);
    }
  };
  w._isFileToolbarItemAvailable = function (e) {
    var t = e.name;
    var n = e.visible;
    return !this._isDefaultItem(t) && (0, l.ensureDefined)(n, true) || t !== "clearSelection" && t !== "refresh" && this._isCommandAvailable(t);
  };
  w._isCommandAvailable = function (e) {
    return this._commandManager.isCommandAvailable(e, this.option("contextItems"));
  };
  w._updateItemInToolbar = function (e, t, n) {
    e.beginUpdate();
    for (var i = e.option("items"), o = 0; o < i.length; o++) {
      if (i[o].name === t) {
        e.option(`items[${o}]`, n);
        break;
      }
    }
    e.endUpdate();
  };
  w._raiseItemClicked = function (e) {
    var t = (0, r.extend)(true, {}, e);
    t.itemData = e.itemData.originalItemData;
    this._itemClickedAction(t);
  };
  w._createItemClickedAction = function () {
    this._itemClickedAction = this._createActionByOption("onItemClick");
  };
  w._getDefaultOptions = function () {
    return (0, r.extend)(e.prototype._getDefaultOptions.call(this), {
      commandManager: null,
      generalItems: [],
      fileItems: [],
      contextItems: [],
      itemViewMode: "details",
      onItemClick: null
    });
  };
  w._optionChanged = function (t) {
    var n = t.name;
    switch (n) {
      case "commandManager":
      case "itemViewMode":
      case "generalItems":
      case "fileItems":
        this.repaint();
        break;
      case "contextItems":
        this._update();
        break;
      case "onItemClick":
        this._itemClickedAction = this._createActionByOption(n);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  w.updateItemPermissions = function () {
    this.repaint();
    this._restoreRefreshItemState();
  };
  w._restoreRefreshItemState = function () {
    this.updateRefreshItem(this._refreshItemState.message, this._refreshItemState.status);
  };
  w.updateRefreshItem = function (e, t) {
    var n = null;
    var i = u.default.format("dxFileManager-commandRefresh");
    var o = "inMenu";
    this._isRefreshVisibleInFileToolbar = false;
    this._refreshItemState = {
      message: e,
      status: t
    };
    if (t === "default") {
      n = {
        options: {
          icon: b.default
        }
      };
    } else {
      n = {
        options: {
          icon: b[t]
        }
      };
      this._isRefreshVisibleInFileToolbar = true;
      i = e;
      o = "always";
    }
    var a = (0, r.extend)({}, n, {
      visible: this._isRefreshVisibleInFileToolbar
    });
    this._applyRefreshItemOptions(n, a);
    this._refreshItemTextTimeout = this._updateRefreshItemText(t === "progress", i, o);
  };
  w._updateRefreshItemText = function (e, t, n) {
    var i = this;
    var o = {
      showText: n,
      options: {
        text: t
      }
    };
    if (e) {
      return setTimeout(function () {
        i._applyRefreshItemOptions(o);
        i._refreshItemTextTimeout = undefined;
      }, 500);
    } else {
      if (this._refreshItemTextTimeout) {
        clearTimeout(this._refreshItemTextTimeout);
      }
      this._applyRefreshItemOptions(o);
      return;
    }
  };
  w._applyRefreshItemOptions = function (e, t) {
    t ||= (0, r.extend)({}, e);
    this._updateItemInToolbar(this._generalToolbar, "refresh", e);
    this._updateItemInToolbar(this._fileToolbar, "refresh", t);
  };
  w._update = function () {
    var e = this.option("contextItems").length === 0 || !this._fileToolbarHasEffectiveItems();
    if (this._generalToolbarVisible !== e) {
      this._generalToolbar.option("visible", e);
      this._fileToolbar.option("visible", !e);
      this._generalToolbarVisible = e;
      this.$element().toggleClass("dx-filemanager-general-toolbar", e);
      this.$element().toggleClass("dx-filemanager-file-toolbar", !e);
    }
    var t = this._getVisibleToolbar();
    this._ensureAvailableCommandsVisible(t);
    this._checkCompactMode(t);
  };
  c = i;
  if (f = [{
    key: "_commandManager",
    get: function () {
      return this.option("commandManager");
    }
  }]) {
    p(c.prototype, f);
  }
  if (x) {
    p(c, x);
  }
  Object.defineProperty(c, "prototype", {
    writable: false
  });
  return i;
}(c.default);
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;