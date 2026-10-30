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
var a = N(require("./68374.js"));
var r = N(require("./14390.js"));
var s = N(require("./2492.js"));
var l = N(require("./99393.js"));
var u = require("./13306.js");
var d = require("./35922.js");
var c = require("./47617.js");
var h = N(require("./49387.js"));
var f = require("./348.js");
var p = require("./58201.js");
var g = require("./6415.js");
var m = N(require("./55994.js"));
var _ = require("./39611.js");
var v = N(require("./28109.js"));
var y = N(require("./18016.js"));
var b = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = H(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./85421.js"));
var x = N(require("./89799.js"));
var w = N(require("./38148.js"));
var C = N(require("./66156.js"));
var S = N(require("./57257.js"));
var k = N(require("./64225.js"));
var D = N(require("./95463.js"));
var I = N(require("./33353.js"));
var T = N(require("./90978.js"));
var E = N(require("./46920.js"));
var O = N(require("./66737.js"));
var A = N(require("./63564.js"));
var P = N(require("./63842.js"));
var M = N(require("./64863.js"));
var R = N(require("./61982.js"));
var B = N(require("./34690.js"));
var L = N(require("./72321.js"));
var V = N(require("./81308.js"));
var F = N(require("./73510.js"));
function H(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (H = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function N(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function z(e, t) {
  return (z = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var j = (0, _.addNamespace)("fullscreenchange", "dxDiagramEvent");
var W = (0, _.addNamespace)("msfullscreenchange", "dxDiagramEvent");
var G = (0, _.addNamespace)("webkitfullscreenchange", "dxDiagramEvent");
var q = (0, _.addNamespace)("mozfullscreenchange", "dxDiagramEvent");
var $ = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  z(t, n);
  var r = i.prototype;
  r._init = function () {
    this._updateDiagramLockCount = 0;
    this.toggleFullscreenLock = 0;
    this._toolbars = [];
    e.prototype._init.call(this);
    this._initDiagram();
    this._createCustomCommand();
  };
  r._initMarkup = function () {
    var t = this;
    e.prototype._initMarkup.call(this);
    this._toolbars = [];
    delete this._isMobileScreenSize;
    var n = !(0, p.hasWindow)();
    this.$element().addClass("dx-diagram");
    delete this._mainToolbar;
    if (this.option("mainToolbar.visible")) {
      this._renderMainToolbar();
    }
    var i = (0, a.default)("<div>").addClass("dx-diagram-content-wrapper").appendTo(this.$element());
    delete this._historyToolbar;
    delete this._historyToolbarResizeCallback;
    if (this._isHistoryToolbarVisible()) {
      this._renderHistoryToolbar(i);
    }
    delete this._propertiesToolbar;
    delete this._propertiesToolbarResizeCallback;
    if (this._isPropertiesPanelEnabled()) {
      this._renderPropertiesToolbar(i);
    }
    delete this._viewToolbar;
    delete this._viewToolbarResizeCallback;
    if (this.option("viewToolbar.visible")) {
      this._renderViewToolbar(i);
    }
    delete this._toolbox;
    delete this._toolboxResizeCallback;
    if (this._isToolboxEnabled()) {
      this._renderToolbox(i);
    }
    delete this._propertiesPanel;
    delete this._propertiesPanelResizeCallback;
    if (this._isPropertiesPanelEnabled()) {
      this._renderPropertiesPanel(i);
    }
    this._$content = (0, a.default)("<div>").addClass("dx-diagram-content").appendTo(i);
    delete this._contextMenu;
    this._diagramInstance.settings.contextMenuEnabled = this.option("contextMenu.enabled");
    if (this._diagramInstance.settings.contextMenuEnabled) {
      this._renderContextMenu(i);
    }
    delete this._contextToolbox;
    if (this.option("contextToolbox.enabled")) {
      this._renderContextToolbox(i);
    }
    this._renderDialog(i);
    if (!n) {
      var o = (0, a.default)("<div>").addClass("dx-diagram-scroll-view").appendTo(this._$content);
      this._createComponent(o, O.default, {
        useNativeScrolling: this.option("useNativeScrolling"),
        onCreateDiagram: function (e) {
          t._diagramInstance.createDocument(e.$parent[0], e.scrollView, i[0]);
        }
      });
    }
    this._setCustomCommandChecked(L.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, this._isPropertiesPanelVisible());
    this._setCustomCommandChecked(L.default.SHOW_TOOLBOX_COMMAND_NAME, this._isToolboxVisible());
    this._createOptionsUpdateBar();
  };
  r._dimensionChanged = function () {
    this._isMobileScreenSize = undefined;
    this._processDiagramResize();
  };
  r._visibilityChanged = function (e) {
    if (e) {
      this._bindDiagramData();
      this.repaint();
    }
  };
  r._processDiagramResize = function () {
    this._diagramInstance.onDimensionChanged();
    if (this._historyToolbarResizeCallback) {
      this._historyToolbarResizeCallback.call(this);
    }
    if (this._propertiesToolbarResizeCallback) {
      this._propertiesToolbarResizeCallback.call(this);
    }
    if (this._propertiesPanelResizeCallback) {
      this._propertiesPanelResizeCallback.call(this);
    }
    if (this._viewToolbarResizeCallback) {
      this._viewToolbarResizeCallback.call(this);
    }
    if (this._toolboxResizeCallback) {
      this._toolboxResizeCallback.call(this);
    }
  };
  r.isMobileScreenSize = function () {
    if (this._isMobileScreenSize === undefined) {
      this._isMobileScreenSize = (0, p.hasWindow)() && (0, o.getOuterWidth)(this.$element()) < 576;
    }
    return this._isMobileScreenSize;
  };
  r._captureFocus = function () {
    if (this._diagramInstance) {
      this._diagramInstance.captureFocus();
    }
  };
  r._captureFocusOnTimeout = function () {
    var e = this;
    this._captureFocusTimeout = setTimeout(function () {
      e._captureFocus();
      delete e._captureFocusTimeout;
    }, 100);
  };
  r._killCaptureFocusTimeout = function () {
    if (this._captureFocusTimeout) {
      clearTimeout(this._captureFocusTimeout);
      delete this._captureFocusTimeout;
    }
  };
  r.notifyBarCommandExecuted = function () {
    this._captureFocusOnTimeout();
  };
  r._registerToolbar = function (e) {
    this._registerBar(e);
    this._toolbars.push(e);
  };
  r._registerBar = function (e) {
    e.bar.onChanged.add(this);
    this._diagramInstance.registerBar(e.bar);
  };
  r._getExcludeCommands = function () {
    var e = [];
    if (!this._isToolboxEnabled()) {
      e.push(L.default.SHOW_TOOLBOX_COMMAND_NAME);
    }
    if (!this._isPropertiesPanelEnabled()) {
      e.push(L.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME);
    }
    return e;
  };
  r._getToolbarBaseOptions = function () {
    var e = this;
    return {
      onContentReady: function (t) {
        var n = t.component;
        return e._registerToolbar(n);
      },
      onSubMenuVisibilityChanging: function (t) {
        var n = t.component;
        return e._diagramInstance.updateBarItemsState(n.bar);
      },
      onPointerUp: this._onPanelPointerUp.bind(this),
      export: this.option("export"),
      excludeCommands: this._getExcludeCommands(),
      onInternalCommand: this._onInternalCommand.bind(this),
      onCustomCommand: this._onCustomCommand.bind(this),
      isMobileView: this.isMobileScreenSize()
    };
  };
  r._onInternalCommand = function (e) {
    switch (e.command) {
      case L.default.SHOW_TOOLBOX_COMMAND_NAME:
        if (this._toolbox) {
          this._toolbox.toggle();
        }
        break;
      case L.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME:
        if (this._propertiesPanel) {
          this._propertiesPanel.toggle();
        }
    }
  };
  r._onCustomCommand = function (e) {
    this._customCommandAction({
      name: e.name
    });
  };
  r._renderMainToolbar = function () {
    var e = (0, a.default)("<div>").addClass("dx-diagram-toolbar-wrapper").appendTo(this.$element());
    this._mainToolbar = this._createComponent(e, C.default, (0, u.extend)(this._getToolbarBaseOptions(), {
      commands: this.option("mainToolbar.commands"),
      skipAdjustSize: true
    }));
  };
  r._isHistoryToolbarVisible = function () {
    return this.option("historyToolbar.visible") && !this.isReadOnlyMode();
  };
  r._renderHistoryToolbar = function (e) {
    var t = this;
    var n = (0, a.default)("<div>").addClass("dx-diagram-floating-toolbar-container").appendTo(e);
    this._historyToolbar = this._createComponent(n, S.default, (0, u.extend)(this._getToolbarBaseOptions(), {
      commands: this.option("historyToolbar.commands"),
      locateInMenu: "never"
    }));
    this._updateHistoryToolbarPosition();
    this._historyToolbarResizeCallback = function () {
      t._historyToolbar.option("isMobileView", t.isMobileScreenSize());
    };
  };
  r._updateHistoryToolbarPosition = function () {
    if ((0, p.hasWindow)()) {
      h.default.setup(this._historyToolbar.$element(), {
        my: "left top",
        at: "left top",
        of: this._historyToolbar.$element().parent(),
        offset: "12 12"
      });
    }
  };
  r._isToolboxEnabled = function () {
    return this.option("toolbox.visibility") !== "disabled" && !this.isReadOnlyMode();
  };
  r._isToolboxVisible = function () {
    return this.option("toolbox.visibility") === "visible" || this.option("toolbox.visibility") === "auto" && !this.isMobileScreenSize();
  };
  r._renderToolbox = function (e) {
    var t = this;
    var n = !(0, p.hasWindow)();
    var i = (0, a.default)("<div>").appendTo(e);
    var o = this._getToolboxBounds(e, n);
    this._toolbox = this._createComponent(i, P.default, {
      isMobileView: this.isMobileScreenSize(),
      isVisible: this._isToolboxVisible(),
      container: this.$element(),
      height: o.height,
      offsetParent: e,
      offsetX: o.offsetX,
      offsetY: o.offsetY,
      showSearch: this.option("toolbox.showSearch"),
      toolboxGroups: this._getToolboxGroups(),
      toolboxWidth: this.option("toolbox.width"),
      onShapeCategoryRendered: function (e) {
        if (!n) {
          t._diagramInstance.createToolbox(e.$element[0], e.displayMode === "texts", e.shapes || e.category, {
            shapeIconSpacing: 12,
            shapeIconCountInRow: t.option("toolbox.shapeIconsPerRow"),
            shapeIconAttributes: {
              "data-toggle": e.dataToggle
            }
          });
        }
      },
      onFilterChanged: function (e) {
        if (!n) {
          t._diagramInstance.applyToolboxFilter(e.text, e.filteringToolboxes);
        }
      },
      onVisibilityChanging: function (e) {
        if (!n) {
          t._setCustomCommandChecked(L.default.SHOW_TOOLBOX_COMMAND_NAME, e.visible);
          if (t._propertiesPanel && e.visible && t.isMobileScreenSize()) {
            t._propertiesPanel.hide();
          }
          if (t._historyToolbar && e.visible && t.isMobileScreenSize()) {
            t._historyToolbarZIndex = b.create(x.default.baseZIndex());
            t._historyToolbar.$element().css("zIndex", t._historyToolbarZIndex);
            t._historyToolbar.$element().css("boxShadow", "none");
          }
          if (t._viewToolbar) {
            t._viewToolbar.$element().css("opacity", e.visible && t.isMobileScreenSize() ? "0" : "1");
            t._viewToolbar.$element().css("pointerEvents", e.visible && t.isMobileScreenSize() ? "none" : "");
          }
        }
      },
      onVisibilityChanged: function (e) {
        if (!e.visible && !t._textInputStarted) {
          t._captureFocus();
        }
        if (!n) {
          if (t._historyToolbar && !e.visible && t.isMobileScreenSize() && t._historyToolbarZIndex) {
            b.remove(t._historyToolbarZIndex);
            t._historyToolbar.$element().css("zIndex", "");
            t._historyToolbar.$element().css("boxShadow", "");
            t._historyToolbarZIndex = undefined;
          }
        }
      },
      onPointerUp: this._onPanelPointerUp.bind(this)
    });
    this._toolbox._popup.option("propagateOutsideClick", !this.option("fullScreen"));
    this._toolboxResizeCallback = function () {
      var i = t._getToolboxBounds(e, n);
      t._toolbox.option("height", i.height);
      if (t._toolbox.option("isMobileView") !== t.isMobileScreenSize()) {
        t._toolbox.option({
          isMobileView: t.isMobileScreenSize(),
          isVisible: t._isToolboxVisible()
        });
        t._setCustomCommandChecked(L.default.SHOW_TOOLBOX_COMMAND_NAME, t._isToolboxVisible());
      }
      t._toolbox.updateMaxHeight();
    };
  };
  r._getToolboxBounds = function (e, t) {
    var n = {
      offsetX: 12,
      offsetY: 12,
      height: t ? 0 : (0, o.getHeight)(e) - 24
    };
    if (this._historyToolbar && !t) {
      n.offsetY += (0, o.getOuterHeight)(this._historyToolbar.$element()) + 12;
      n.height -= (0, o.getOuterHeight)(this._historyToolbar.$element()) + 12;
    }
    if (this._viewToolbar && !t) {
      n.height -= (0, o.getOuterHeight)(this._viewToolbar.$element()) + this._getViewToolbarYOffset(t);
    }
    return n;
  };
  r._renderViewToolbar = function (e) {
    var t = this;
    var n = !(0, p.hasWindow)();
    var i = (0, a.default)("<div>").addClass("dx-diagram-floating-toolbar-container").appendTo(e);
    this._viewToolbar = this._createComponent(i, k.default, (0, u.extend)(this._getToolbarBaseOptions(), {
      commands: this.option("viewToolbar.commands"),
      locateInMenu: "never"
    }));
    this._updateViewToolbarPosition(i, e, n);
    this._viewToolbarResizeCallback = function () {
      t._updateViewToolbarPosition(i, e, n);
    };
  };
  r._getViewToolbarYOffset = function (e) {
    if (!e) {
      var t = 12;
      if (this._viewToolbar && this._propertiesToolbar) {
        t += ((0, o.getOuterHeight)(this._propertiesToolbar.$element()) - (0, o.getOuterHeight)(this._viewToolbar.$element())) / 2;
      }
      return t;
    }
  };
  r._updateViewToolbarPosition = function (e, t, n) {
    if (!n) {
      h.default.setup(e, {
        my: "left bottom",
        at: "left bottom",
        of: t,
        offset: "12 -" + this._getViewToolbarYOffset(n)
      });
    }
  };
  r._isPropertiesPanelEnabled = function () {
    return this.option("propertiesPanel.visibility") !== "disabled" && !this.isReadOnlyMode();
  };
  r._isPropertiesPanelVisible = function () {
    return this.option("propertiesPanel.visibility") === "visible";
  };
  r._renderPropertiesToolbar = function (e) {
    var t = this;
    var n = !(0, p.hasWindow)();
    var i = (0, a.default)("<div>").addClass("dx-diagram-floating-toolbar-container").addClass("dx-diagram-properties-panel-toolbar-container").appendTo(e);
    this._propertiesToolbar = this._createComponent(i, D.default, (0, u.extend)(this._getToolbarBaseOptions(), {
      buttonStylingMode: "contained",
      buttonType: "default",
      locateInMenu: "never"
    }));
    this._updatePropertiesToolbarPosition(i, e, n);
    this._propertiesToolbarResizeCallback = function () {
      t._updatePropertiesToolbarPosition(i, e, n);
    };
  };
  r._updatePropertiesToolbarPosition = function (e, t, n) {
    if (!n) {
      h.default.setup(e, {
        my: "right bottom",
        at: "right bottom",
        of: t,
        offset: "-12 -12"
      });
    }
  };
  r._renderPropertiesPanel = function (e) {
    var t = this;
    var n = !(0, p.hasWindow)();
    var i = (0, a.default)("<div>").appendTo(e);
    var r = 24 + (n ? 0 : (0, o.getOuterHeight)(this._propertiesToolbar.$element()));
    this._propertiesPanel = this._createComponent(i, M.default, {
      isMobileView: this.isMobileScreenSize(),
      isVisible: this._isPropertiesPanelVisible(),
      container: this.$element(),
      offsetParent: e,
      offsetX: 12,
      offsetY: r,
      propertyTabs: this.option("propertiesPanel.tabs"),
      onCreateToolbar: function (e) {
        e.toolbar = t._createComponent(e.$parent, w.default, (0, u.extend)(t._getToolbarBaseOptions(), {
          commands: e.commands,
          locateInMenu: "never",
          editorStylingMode: "outlined"
        }));
      },
      onVisibilityChanging: function (e) {
        if (!n) {
          t._updatePropertiesPanelGroupBars(e.component);
          t._setCustomCommandChecked(L.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, e.visible);
          if (t._toolbox && e.visible && t.isMobileScreenSize()) {
            t._toolbox.hide();
          }
        }
      },
      onVisibilityChanged: function (e) {
        if (!e.visible && !t._textInputStarted) {
          t._captureFocus();
        }
      },
      onSelectedGroupChanged: function (e) {
        var n = e.component;
        return t._updatePropertiesPanelGroupBars(n);
      },
      onPointerUp: this._onPanelPointerUp.bind(this)
    });
    this._propertiesPanelResizeCallback = function () {
      if (t._propertiesPanel.option("isMobileView") !== t.isMobileScreenSize()) {
        t._propertiesPanel.option({
          isMobileView: t.isMobileScreenSize(),
          isVisible: t._isPropertiesPanelVisible()
        });
        t._setCustomCommandChecked(L.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, t._isPropertiesPanelVisible());
      }
    };
  };
  r._updatePropertiesPanelGroupBars = function (e) {
    var t = this;
    e.getActiveToolbars().forEach(function (e) {
      t._diagramInstance.updateBarItemsState(e.bar);
    });
  };
  r._onPanelPointerUp = function () {
    this._captureFocusOnTimeout();
  };
  r._renderContextMenu = function (e) {
    var t = this;
    var n = (0, a.default)("<div>").appendTo(e);
    this._contextMenu = this._createComponent(n, I.default.DiagramContextMenuWrapper, {
      commands: this.option("contextMenu.commands"),
      onContentReady: function (e) {
        var n = e.component;
        return t._registerBar(n);
      },
      onVisibilityChanging: function (e) {
        var n = e.component;
        return t._diagramInstance.updateBarItemsState(n.bar);
      },
      onItemClick: function (e) {
        return t._onBeforeCommandExecuted(e.command);
      },
      export: this.option("export"),
      excludeCommands: this._getExcludeCommands(),
      onInternalCommand: this._onInternalCommand.bind(this),
      onCustomCommand: this._onCustomCommand.bind(this)
    });
  };
  r._renderContextToolbox = function (e) {
    var t = this;
    var n = !(0, p.hasWindow)();
    var i = this.option("contextToolbox.category");
    var o = this.option("contextToolbox.displayMode");
    var r = this.option("contextToolbox.shapes");
    var s = (0, a.default)("<div>").appendTo(e);
    this._contextToolbox = this._createComponent(s, T.default, {
      toolboxWidth: this.option("contextToolbox.width"),
      onShown: function (e) {
        if (!n) {
          var s = (0, a.default)(e.$element);
          var l = o === "texts";
          if (!r && !i && !l) {
            var u = t._getToolboxGroups().filter(function (t) {
              return t.category === e.category;
            })[0];
            if (u) {
              l = u.displayMode === "texts";
            }
          }
          t._diagramInstance.createContextToolbox(s[0], l, r || i || e.category, {
            shapeIconSpacing: 12,
            shapeIconCountInRow: t.option("contextToolbox.shapeIconsPerRow")
          }, function (n) {
            e.callback(n);
            t._captureFocus();
            e.hide();
          });
        }
      }
    });
  };
  r._setCustomCommandChecked = function (e, t) {
    this._toolbars.forEach(function (n) {
      n.setCommandChecked(e, t);
    });
  };
  r._onBeforeCommandExecuted = function (e) {
    var t = B.default.getDialogParameters(e);
    if (t) {
      this._showDialog(t);
    }
    return !!t;
  };
  r._renderDialog = function (e) {
    var t = (0, a.default)("<div>").appendTo(e);
    this._dialogInstance = this._createComponent(t, E.default, {});
  };
  r._showDialog = function (e) {
    if (this._dialogInstance) {
      this._dialogInstance.option("onGetContent", e.onGetContent);
      this._dialogInstance.option("onHidden", function () {
        this._captureFocus();
      }.bind(this));
      this._dialogInstance.option("command", this._diagramInstance.getCommand(e.command));
      this._dialogInstance.option("title", e.title);
      this._dialogInstance._show();
    }
  };
  r._showLoadingIndicator = function () {
    this._loadingIndicator = (0, a.default)("<div>").addClass("dx-diagram-loading-indicator");
    this._createComponent(this._loadingIndicator, s.default, {});
    (this._$content || this.$element()).append(this._loadingIndicator);
  };
  r._hideLoadingIndicator = function () {
    if (this._loadingIndicator) {
      this._loadingIndicator.remove();
      this._loadingIndicator = null;
    }
  };
  r._initDiagram = function () {
    var e = (0, f.getDiagram)().DiagramControl;
    this._diagramInstance = new e();
    this._diagramInstance.onChanged = this._raiseDataChangeAction.bind(this);
    this._diagramInstance.onEdgeInserted = this._raiseEdgeInsertedAction.bind(this);
    this._diagramInstance.onEdgeUpdated = this._raiseEdgeUpdatedAction.bind(this);
    this._diagramInstance.onEdgeRemoved = this._raiseEdgeRemovedAction.bind(this);
    this._diagramInstance.onNodeInserted = this._raiseNodeInsertedAction.bind(this);
    this._diagramInstance.onNodeUpdated = this._raiseNodeUpdatedAction.bind(this);
    this._diagramInstance.onNodeRemoved = this._raiseNodeRemovedAction.bind(this);
    this._diagramInstance.onToolboxDragStart = this._raiseToolboxDragStart.bind(this);
    this._diagramInstance.onToolboxDragEnd = this._raiseToolboxDragEnd.bind(this);
    this._diagramInstance.onTextInputStart = this._raiseTextInputStart.bind(this);
    this._diagramInstance.onTextInputEnd = this._raiseTextInputEnd.bind(this);
    this._diagramInstance.onToggleFullscreen = this._onToggleFullScreen.bind(this);
    this._diagramInstance.onShowContextMenu = this._onShowContextMenu.bind(this);
    this._diagramInstance.onHideContextMenu = this._onHideContextMenu.bind(this);
    this._diagramInstance.onShowContextToolbox = this._onShowContextToolbox.bind(this);
    this._diagramInstance.onHideContextToolbox = this._onHideContextToolbox.bind(this);
    this._diagramInstance.onNativeAction.add({
      notifyItemClick: this._raiseItemClickAction.bind(this),
      notifyItemDblClick: this._raiseItemDblClickAction.bind(this),
      notifySelectionChanged: this._raiseSelectionChanged.bind(this)
    });
    this._diagramInstance.onRequestOperation = this._raiseRequestEditOperation.bind(this);
    this._updateEventSubscriptionMethods();
    this._updateDefaultItemProperties();
    this._updateEditingSettings();
    this._updateShapeTexts();
    this._updateUnitItems();
    this._updateFormatUnitsMethod();
    if (this.option("units") !== "in") {
      this._updateUnitsState();
    }
    if (this.isReadOnlyMode()) {
      this._updateReadOnlyState();
    }
    if (this.option("pageSize")) {
      if (this.option("pageSize.items")) {
        this._updatePageSizeItemsState();
      }
      if (this.option("pageSize.width") && this.option("pageSize.height")) {
        this._updatePageSizeState();
      }
    }
    if (this.option("pageOrientation") !== "portrait") {
      this._updatePageOrientationState();
    }
    if (this.option("pageColor") !== "#ffffff") {
      this._updatePageColorState();
    }
    if (this.option("viewUnits") !== "in") {
      this._updateViewUnitsState();
    }
    if (!this.option("showGrid")) {
      this._updateShowGridState();
    }
    if (!this.option("snapToGrid")) {
      this._updateSnapToGridState();
    }
    if (this.option("gridSize")) {
      this._updateGridSizeState();
    }
    if (this.option("zoomLevel") !== 1) {
      this._updateZoomLevelState();
    }
    if (this.option("simpleView")) {
      this._updateSimpleViewState();
    }
    if (this.option("autoZoomMode") !== "disabled") {
      this._updateAutoZoomState();
    }
    if (this.option("fullScreen")) {
      var t = (0, p.getWindow)();
      if (t && t.self !== t.top) {
        this.option("fullScreen", false);
      } else {
        this._updateFullscreenState();
      }
    }
    this._createOptionsUpdateBar();
    if ((0, p.hasWindow)()) {
      this._diagramInstance.initMeasurer(this.$element()[0]);
    }
    this._updateCustomShapes(this._getCustomShapes());
    this._refreshDataSources();
  };
  r._createOptionsUpdateBar = function () {
    if (!this.optionsUpdateBar) {
      this.optionsUpdateBar = new R.default(this);
      this._diagramInstance.registerBar(this.optionsUpdateBar);
    }
  };
  r._deleteOptionsUpdateBar = function () {
    delete this.optionsUpdateBar;
  };
  r._clean = function () {
    if (this._diagramInstance) {
      this._diagramInstance.cleanMarkup(function (e) {
        (0, a.default)(e).empty();
      });
      this._deleteOptionsUpdateBar();
    }
    e.prototype._clean.call(this);
  };
  r._dispose = function () {
    this._killCaptureFocusTimeout();
    e.prototype._dispose.call(this);
    if (this._diagramInstance) {
      this._diagramInstance.dispose();
      this._diagramInstance = undefined;
    }
  };
  r._executeDiagramCommand = function (e, t) {
    this._diagramInstance.getCommand(e).execute(t);
  };
  r.getNodeDataSource = function () {
    return this._nodesOption && this._nodesOption.getDataSource();
  };
  r.getEdgeDataSource = function () {
    return this._edgesOption && this._edgesOption.getDataSource();
  };
  r._refreshDataSources = function () {
    this._beginUpdateDiagram();
    this._refreshNodesDataSource();
    this._refreshEdgesDataSource();
    this._endUpdateDiagram();
  };
  r._refreshNodesDataSource = function () {
    if (this._nodesOption) {
      this._nodesOption._disposeDataSource();
      delete this._nodesOption;
    }
    if (this.option("nodes.dataSource")) {
      this._nodesOption = new V.default(this);
      this._nodesOption.option("dataSource", this.option("nodes.dataSource"));
      this._nodesOption._refreshDataSource();
    }
  };
  r._refreshEdgesDataSource = function () {
    if (this._edgesOption) {
      this._edgesOption._disposeDataSource();
      delete this._edgesOption;
    }
    if (this.option("edges.dataSource")) {
      this._edgesOption = new F.default(this);
      this._edgesOption.option("dataSource", this.option("edges.dataSource"));
      this._edgesOption._refreshDataSource();
    }
  };
  r._getDiagramData = function () {
    var e;
    var t = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(t.Export, function (t) {
      e = t;
    });
    return e;
  };
  r._setDiagramData = function (e, t) {
    var n = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(n.Import, {
      data: e,
      keepExistingItems: t
    });
  };
  r.isReadOnlyMode = function () {
    return this.option("readOnly") || this.option("disabled");
  };
  r._onDataSourceChanged = function () {
    this._bindDiagramData();
  };
  r._getChangesKeys = function (e) {
    return e.map(function (e) {
      if ((0, d.isDefined)(e.internalKey)) {
        return e.internalKey;
      } else if ((0, d.isDefined)(e.key)) {
        return e.key;
      } else {
        return null;
      }
    }).filter(function (e) {
      return (0, d.isDefined)(e);
    });
  };
  r._createOptionGetter = function (e) {
    var t = this.option(e);
    return t && (0, c.compileGetter)(t);
  };
  r._onRequestUpdateLayout = function (e) {
    if (!this._requestLayoutUpdateAction) {
      this._createRequestLayoutUpdateAction();
    }
    var t = {
      changes: e,
      allowed: false
    };
    this._requestLayoutUpdateAction(t);
    return t.allowed;
  };
  r._createOptionSetter = function (e) {
    var t = this.option(e);
    if ((0, d.isFunction)(t)) {
      return t;
    } else {
      return t && (0, c.compileSetter)(t);
    }
  };
  r._bindDiagramData = function () {
    if (!this._updateDiagramLockCount && this._isBindingMode()) {
      var e;
      var t;
      var n;
      var i;
      var o;
      var a;
      var r;
      var s;
      var l = (0, f.getDiagram)();
      var u = l.DiagramCommand;
      var d = l.ConnectorLineOption;
      var c = l.ConnectorLineEnding;
      var h = {
        nodeDataSource: this._nodesOption && this._nodesOption.getItems(),
        edgeDataSource: this._edgesOption && this._edgesOption.getItems(),
        nodeDataImporter: {
          getKey: this._createOptionGetter("nodes.keyExpr"),
          setKey: this._createOptionSetter("nodes.keyExpr"),
          getCustomData: this._createOptionGetter("nodes.customDataExpr"),
          setCustomData: this._createOptionSetter("nodes.customDataExpr"),
          getLocked: this._createOptionGetter("nodes.lockedExpr"),
          setLocked: this._createOptionSetter("nodes.lockedExpr"),
          getStyle: this._createOptionGetter("nodes.styleExpr"),
          setStyle: this._createOptionSetter("nodes.styleExpr"),
          getStyleText: this._createOptionGetter("nodes.textStyleExpr"),
          setStyleText: this._createOptionSetter("nodes.textStyleExpr"),
          getZIndex: this._createOptionGetter("nodes.zIndexExpr"),
          setZIndex: this._createOptionSetter("nodes.zIndexExpr"),
          getType: this._createOptionGetter("nodes.typeExpr"),
          setType: this._createOptionSetter("nodes.typeExpr"),
          getText: this._createOptionGetter("nodes.textExpr"),
          setText: this._createOptionSetter("nodes.textExpr"),
          getImage: this._createOptionGetter("nodes.imageUrlExpr"),
          setImage: this._createOptionSetter("nodes.imageUrlExpr"),
          getLeft: this._createOptionGetter("nodes.leftExpr"),
          setLeft: this._createOptionSetter("nodes.leftExpr"),
          getTop: this._createOptionGetter("nodes.topExpr"),
          setTop: this._createOptionSetter("nodes.topExpr"),
          getWidth: this._createOptionGetter("nodes.widthExpr"),
          setWidth: this._createOptionSetter("nodes.widthExpr"),
          getHeight: this._createOptionGetter("nodes.heightExpr"),
          setHeight: this._createOptionSetter("nodes.heightExpr"),
          getParentKey: this._createOptionGetter("nodes.parentKeyExpr"),
          setParentKey: this._createOptionSetter("nodes.parentKeyExpr"),
          getItems: this._createOptionGetter("nodes.itemsExpr"),
          setItems: this._createOptionSetter("nodes.itemsExpr"),
          getChildren: r = this._createOptionGetter("nodes.containerChildrenExpr"),
          setChildren: s = this._createOptionSetter("nodes.containerChildrenExpr"),
          getContainerKey: !r && !s && this._createOptionGetter("nodes.containerKeyExpr"),
          setContainerKey: !r && !s && this._createOptionSetter("nodes.containerKeyExpr")
        },
        edgeDataImporter: {
          getKey: this._createOptionGetter("edges.keyExpr"),
          setKey: this._createOptionSetter("edges.keyExpr"),
          getCustomData: this._createOptionGetter("edges.customDataExpr"),
          setCustomData: this._createOptionSetter("edges.customDataExpr"),
          getLocked: this._createOptionGetter("edges.lockedExpr"),
          setLocked: this._createOptionSetter("edges.lockedExpr"),
          getStyle: this._createOptionGetter("edges.styleExpr"),
          setStyle: this._createOptionSetter("edges.styleExpr"),
          getStyleText: this._createOptionGetter("edges.textStyleExpr"),
          setStyleText: this._createOptionSetter("edges.textStyleExpr"),
          getZIndex: this._createOptionGetter("edges.zIndexExpr"),
          setZIndex: this._createOptionSetter("edges.zIndexExpr"),
          getFrom: this._createOptionGetter("edges.fromExpr"),
          setFrom: this._createOptionSetter("edges.fromExpr"),
          getFromPointIndex: this._createOptionGetter("edges.fromPointIndexExpr"),
          setFromPointIndex: this._createOptionSetter("edges.fromPointIndexExpr"),
          getTo: this._createOptionGetter("edges.toExpr"),
          setTo: this._createOptionSetter("edges.toExpr"),
          getToPointIndex: this._createOptionGetter("edges.toPointIndexExpr"),
          setToPointIndex: this._createOptionSetter("edges.toPointIndexExpr"),
          getPoints: this._createOptionGetter("edges.pointsExpr"),
          setPoints: this._createOptionSetter("edges.pointsExpr"),
          getText: this._createOptionGetter("edges.textExpr"),
          setText: this._createOptionSetter("edges.textExpr"),
          getLineOption: (e = this._createOptionGetter("edges.lineTypeExpr")) && function (t) {
            var n = e(t);
            return this._getConnectorLineOption(n);
          }.bind(this),
          setLineOption: (t = this._createOptionSetter("edges.lineTypeExpr")) && function (e, n) {
            switch (n) {
              case d.Straight:
                n = "straight";
                break;
              case d.Orthogonal:
                n = "orthogonal";
            }
            t(e, n);
          }.bind(this),
          getStartLineEnding: (n = this._createOptionGetter("edges.fromLineEndExpr")) && function (e) {
            var t = n(e);
            return this._getConnectorLineEnding(t);
          }.bind(this),
          setStartLineEnding: (i = this._createOptionSetter("edges.fromLineEndExpr")) && function (e, t) {
            switch (t) {
              case c.Arrow:
                t = "arrow";
                break;
              case c.OutlinedTriangle:
                t = "outlinedTriangle";
                break;
              case c.FilledTriangle:
                t = "filledTriangle";
                break;
              case c.None:
                t = "none";
            }
            i(e, t);
          }.bind(this),
          getEndLineEnding: (o = this._createOptionGetter("edges.toLineEndExpr")) && function (e) {
            var t = o(e);
            return this._getConnectorLineEnding(t);
          }.bind(this),
          setEndLineEnding: (a = this._createOptionSetter("edges.toLineEndExpr")) && function (e, t) {
            switch (t) {
              case c.Arrow:
                t = "arrow";
                break;
              case c.OutlinedTriangle:
                t = "outlinedTriangle";
                break;
              case c.FilledTriangle:
                t = "filledTriangle";
                break;
              case c.None:
                t = "none";
            }
            a(e, t);
          }.bind(this)
        },
        layoutParameters: this._getDataBindingLayoutParameters()
      };
      this._executeDiagramCommand(u.BindDocument, h);
    }
  };
  r._reloadContentByChanges = function (e, t) {
    var n = this._getChangesKeys(e);
    var i = this._onRequestUpdateLayout(e);
    this._reloadContent(n, i, t);
  };
  r._reloadContent = function (e, t, n) {
    var i = this;
    this._diagramInstance.reloadContent(e, function () {
      var e;
      var t;
      if (i._nodesOption && n) {
        e = i._nodesOption.getItems();
      }
      if (i._edgesOption && n) {
        t = i._edgesOption.getItems();
      }
      return {
        nodeDataSource: e,
        edgeDataSource: t
      };
    }, t && this._getDataBindingLayoutParameters(), n);
  };
  r._getConnectorLineOption = function (e) {
    var t = (0, f.getDiagram)().ConnectorLineOption;
    switch (e) {
      case "straight":
        return t.Straight;
      default:
        return t.Orthogonal;
    }
  };
  r._getConnectorLineEnding = function (e) {
    var t = (0, f.getDiagram)().ConnectorLineEnding;
    switch (e) {
      case "arrow":
        return t.Arrow;
      case "outlinedTriangle":
        return t.OutlinedTriangle;
      case "filledTriangle":
        return t.FilledTriangle;
      default:
        return t.None;
    }
  };
  r._getDataBindingLayoutParameters = function () {
    var e = (0, f.getDiagram)();
    var t = e.DataLayoutType;
    var n = e.DataLayoutOrientation;
    var i = this.option("nodes.autoLayout") || "off";
    var o = i.type || i;
    var a = {};
    if (o !== "off" && (o !== "auto" || !this._hasNodePositionExprs())) {
      switch (o) {
        case "tree":
          a.type = t.Tree;
          break;
        default:
          a.type = t.Sugiyama;
      }
      switch (i.orientation) {
        case "vertical":
          a.orientation = n.Vertical;
          break;
        case "horizontal":
          a.orientation = n.Horizontal;
      }
      if (this.option("edges.fromPointIndexExpr") || this.option("edges.toPointIndexExpr")) {
        a.skipPointIndices = true;
      }
    }
    a.autoSizeEnabled = !!this.option("nodes.autoSizeEnabled");
    return a;
  };
  r._hasNodePositionExprs = function () {
    return this.option("nodes.topExpr") && this.option("nodes.leftExpr");
  };
  r._getAutoZoomValue = function (e) {
    var t = (0, f.getDiagram)().AutoZoomMode;
    switch (e) {
      case "fitContent":
        return t.FitContent;
      case "fitWidth":
        return t.FitToWidth;
      default:
        return t.Disabled;
    }
  };
  r._isBindingMode = function () {
    return this._nodesOption && this._nodesOption.hasItems() || this._edgesOption && this._edgesOption.hasItems();
  };
  r._beginUpdateDiagram = function () {
    this._updateDiagramLockCount++;
  };
  r._endUpdateDiagram = function () {
    this._updateDiagramLockCount = Math.max(this._updateDiagramLockCount - 1, 0);
    if (!this._updateDiagramLockCount) {
      this._bindDiagramData();
    }
  };
  r._getCustomShapes = function () {
    return this.option("customShapes") || [];
  };
  r._getToolboxGroups = function () {
    return A.default.getGroups(this.option("toolbox.groups"));
  };
  r._updateAllCustomShapes = function () {
    this._diagramInstance.removeAllCustomShapes();
    this._updateCustomShapes(this._getCustomShapes());
  };
  r._updateCustomShapes = function (e, t) {
    var n = this;
    if (Array.isArray(t)) {
      this._diagramInstance.removeCustomShapes(t.map(function (e) {
        return e.type;
      }));
    }
    if (Array.isArray(e)) {
      this._diagramInstance.addCustomShapes(e.map(function (e) {
        var t = e.template || n.option("customShapeTemplate");
        var i = t && n._getTemplate(t);
        var o = e.toolboxTemplate || n.option("customShapeToolboxTemplate");
        var r = o && n._getTemplate(o);
        return {
          category: e.category,
          type: e.type,
          baseType: e.baseType,
          title: e.title,
          svgUrl: e.backgroundImageUrl,
          svgToolboxUrl: e.backgroundImageToolboxUrl,
          svgLeft: e.backgroundImageLeft,
          svgTop: e.backgroundImageTop,
          svgWidth: e.backgroundImageWidth,
          svgHeight: e.backgroundImageHeight,
          defaultWidth: e.defaultWidth,
          defaultHeight: e.defaultHeight,
          toolboxWidthToHeightRatio: e.toolboxWidthToHeightRatio,
          minWidth: e.minWidth,
          minHeight: e.minHeight,
          maxWidth: e.maxWidth,
          maxHeight: e.maxHeight,
          allowResize: e.allowResize,
          defaultText: e.defaultText,
          allowEditText: e.allowEditText,
          textLeft: e.textLeft,
          textTop: e.textTop,
          textWidth: e.textWidth,
          textHeight: e.textHeight,
          defaultImageUrl: e.defaultImageUrl,
          allowEditImage: e.allowEditImage,
          imageLeft: e.imageLeft,
          imageTop: e.imageTop,
          imageWidth: e.imageWidth,
          imageHeight: e.imageHeight,
          connectionPoints: e.connectionPoints && e.connectionPoints.map(function (e) {
            return {
              x: e.x,
              y: e.y
            };
          }),
          createTemplate: i && function (e, t) {
            i.render({
              model: n._nativeItemToDiagramItem(t),
              container: (0, g.getPublicElement)((0, a.default)(e))
            });
          },
          createToolboxTemplate: r && function (e, t) {
            r.render({
              model: n._nativeItemToDiagramItem(t),
              container: (0, g.getPublicElement)((0, a.default)(e))
            });
          },
          destroyTemplate: i && function (e) {
            (0, a.default)(e).empty();
          },
          templateLeft: e.templateLeft,
          templateTop: e.templateTop,
          templateWidth: e.templateWidth,
          templateHeight: e.templateHeight,
          keepRatioOnAutoSize: e.keepRatioOnAutoSize
        };
      }));
    }
  };
  r._getViewport = function () {
    var e = this.$element().closest(".dx-viewport");
    if (e.length) {
      return e;
    } else {
      return (0, a.default)("body");
    }
  };
  r._onToggleFullScreen = function (e) {
    if (!(this.toggleFullscreenLock > 0)) {
      this._changeNativeFullscreen(e);
      if (e) {
        this._prevParent = this.$element().parent();
        this._prevFullScreenZIndex = this.$element().css("zIndex");
        this._fullScreenZIndex = b.create(x.default.baseZIndex());
        this.$element().css("zIndex", this._fullScreenZIndex);
        this.$element().appendTo(this._getViewport());
      } else {
        this.$element().appendTo(this._prevParent);
        if (this._fullScreenZIndex) {
          b.remove(this._fullScreenZIndex);
          this.$element().css("zIndex", this._prevFullScreenZIndex);
        }
      }
      this.$element().toggleClass("dx-diagram-fullscreen", e);
      this._processDiagramResize();
      if (this._toolbox) {
        this._toolbox.repaint();
        this._toolbox._popup.option("propagateOutsideClick", !e);
      }
      if (this._propertiesPanel) {
        this._propertiesPanel.repaint();
      }
      if (this._historyToolbar) {
        this._updateHistoryToolbarPosition();
      }
    }
  };
  r._changeNativeFullscreen = function (e) {
    var t = (0, p.getWindow)();
    if (t.self !== t.top && e !== this._inNativeFullscreen()) {
      if (e) {
        this._subscribeFullscreenNativeChanged();
      } else {
        this._unsubscribeFullscreenNativeChanged();
      }
      this._setNativeFullscreen(e);
    }
  };
  r._setNativeFullscreen = function (e) {
    var t = (0, p.getWindow)();
    var n = t.self.document;
    var i = t.self.document.body;
    if (e) {
      if (i.requestFullscreen) {
        i.requestFullscreen();
      } else if (i.mozRequestFullscreen) {
        i.mozRequestFullscreen();
      } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen();
      } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen();
      }
    } else if (n.exitFullscreen) {
      n.exitFullscreen();
    } else if (n.mozCancelFullscreen) {
      n.mozCancelFullscreen();
    } else if (n.webkitExitFullscreen) {
      n.webkitExitFullscreen();
    } else if (n.msExitFullscreen) {
      n.msExitFullscreen();
    }
  };
  r._inNativeFullscreen = function () {
    var e = (0, p.getWindow)().document;
    return (e.fullscreenElement || e.msFullscreenElement || e.webkitFullscreenElement) === e.body || !!e.webkitIsFullscreen;
  };
  r._subscribeFullscreenNativeChanged = function () {
    var e = (0, p.getWindow)().document;
    var t = this._onNativeFullscreenChangeHandler.bind(this);
    m.default.on(e, j, t);
    m.default.on(e, W, t);
    m.default.on(e, G, t);
    m.default.on(e, q, t);
  };
  r._unsubscribeFullscreenNativeChanged = function () {
    var e = (0, p.getWindow)().document;
    m.default.off(e, j);
    m.default.off(e, W);
    m.default.off(e, G);
    m.default.off(e, q);
  };
  r._onNativeFullscreenChangeHandler = function () {
    if (!this._inNativeFullscreen()) {
      this._unsubscribeFullscreenNativeChanged();
      this.option("fullScreen", false);
    }
  };
  r._executeDiagramFullscreenCommand = function (e) {
    var t = (0, f.getDiagram)().DiagramCommand;
    this.toggleFullscreenLock++;
    this._executeDiagramCommand(t.Fullscreen, e);
    this.toggleFullscreenLock--;
  };
  r._onShowContextMenu = function (e, t, n) {
    if (this._contextMenu) {
      this._contextMenu._show(e, t, n);
    }
  };
  r._onHideContextMenu = function () {
    if (this._contextMenu) {
      this._contextMenu._hide();
    }
  };
  r._onShowContextToolbox = function (e, t, n, i, o) {
    if (this._contextToolbox) {
      this._contextToolbox._show(e, t, n, i, o);
    }
  };
  r._onHideContextToolbox = function () {
    if (this._contextToolbox) {
      this._contextToolbox._hide();
    }
  };
  r._getDiagramUnitValue = function (e) {
    var t = (0, f.getDiagram)().DiagramUnit;
    switch (e) {
      case "in":
        return t.In;
      case "cm":
        return t.Cm;
      case "px":
        return t.Px;
      default:
        return t.In;
    }
  };
  r._updateReadOnlyState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    var t = this.isReadOnlyMode();
    this._executeDiagramCommand(e.ToggleReadOnly, t);
  };
  r._updateZoomLevelState = function () {
    if (this.option("zoomLevel.items")) {
      this._updateZoomLevelItemsState();
      var e = this.option("zoomLevel.value");
      if (!e) {
        return;
      }
      var t = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(t.ZoomLevel, e);
    } else {
      var n = this.option("zoomLevel.value") || this.option("zoomLevel");
      if (!n) {
        return;
      }
      var i = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(i.ZoomLevel, n);
    }
  };
  r._updateZoomLevelItemsState = function () {
    var e = this.option("zoomLevel.items");
    if (Array.isArray(e)) {
      var t = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(t.ZoomLevelItems, e);
    }
  };
  r._updateAutoZoomState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.SwitchAutoZoom, this._getAutoZoomValue(this.option("autoZoomMode")));
  };
  r._updateSimpleViewState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.ToggleSimpleView, this.option("simpleView"));
  };
  r._updateFullscreenState = function () {
    var e = this.option("fullScreen");
    this._executeDiagramFullscreenCommand(e);
    this._onToggleFullScreen(e);
  };
  r._updateShowGridState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.ShowGrid, this.option("showGrid"));
  };
  r._updateSnapToGridState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.SnapToGrid, this.option("snapToGrid"));
  };
  r._updateGridSizeState = function () {
    if (this.option("gridSize.items")) {
      this._updateGridSizeItemsState();
      var e = this.option("gridSize.value");
      if (!e) {
        return;
      }
      var t = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(t.GridSize, e);
    } else {
      var n = this.option("gridSize.value") || this.option("gridSize");
      if (!n) {
        return;
      }
      var i = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(i.GridSize, n);
    }
  };
  r._updateGridSizeItemsState = function () {
    var e = this.option("gridSize.items");
    if (Array.isArray(e)) {
      var t = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(t.GridSizeItems, e);
    }
  };
  r._updateUnitItems = function () {
    var e = (0, f.getDiagram)().DiagramLocalizationService;
    var t = this._getUnitItems();
    if (this._unitItems !== t) {
      this._unitItems = t;
      e.unitItems = t;
    }
  };
  r._getUnitItems = function () {
    var e = (0, f.getDiagram)().DiagramUnit;
    var t = {};
    t[e.In] = v.default.format("dxDiagram-unitIn");
    t[e.Cm] = v.default.format("dxDiagram-unitCm");
    t[e.Px] = v.default.format("dxDiagram-unitPx");
    return t;
  };
  r._updateFormatUnitsMethod = function () {
    (0, f.getDiagram)().DiagramLocalizationService.formatUnit = function (e) {
      return y.default.format(e);
    };
  };
  r._updateViewUnitsState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.ViewUnits, this._getDiagramUnitValue(this.option("viewUnits")));
  };
  r._updateUnitsState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.Units, this._getDiagramUnitValue(this.option("units")));
  };
  r._updatePageSizeState = function () {
    var e = this.option("pageSize");
    if (e && e.width && e.height) {
      var t = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(t.PageSize, e);
    }
  };
  r._updatePageSizeItemsState = function () {
    var e = this.option("pageSize.items");
    if (Array.isArray(e)) {
      var t = (0, f.getDiagram)().DiagramCommand;
      this._executeDiagramCommand(t.PageSizeItems, e);
    }
  };
  r._updatePageOrientationState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.PageLandscape, this.option("pageOrientation") === "landscape");
  };
  r._updatePageColorState = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.PageColor, this.option("pageColor"));
  };
  r._updateShapeTexts = function () {
    var e = (0, f.getDiagram)().DiagramLocalizationService;
    var t = this._getShapeTexts();
    if (this._shapeTexts !== t) {
      this._shapeTexts = t;
      e.shapeTexts = t;
    }
  };
  r._getShapeTexts = function () {
    var e = (0, f.getDiagram)().ShapeTypes;
    var t = {};
    t[e.Text] = v.default.format("dxDiagram-shapeText");
    t[e.Rectangle] = v.default.format("dxDiagram-shapeRectangle");
    t[e.Ellipse] = v.default.format("dxDiagram-shapeEllipse");
    t[e.Cross] = v.default.format("dxDiagram-shapeCross");
    t[e.Triangle] = v.default.format("dxDiagram-shapeTriangle");
    t[e.Diamond] = v.default.format("dxDiagram-shapeDiamond");
    t[e.Heart] = v.default.format("dxDiagram-shapeHeart");
    t[e.Pentagon] = v.default.format("dxDiagram-shapePentagon");
    t[e.Hexagon] = v.default.format("dxDiagram-shapeHexagon");
    t[e.Octagon] = v.default.format("dxDiagram-shapeOctagon");
    t[e.Star] = v.default.format("dxDiagram-shapeStar");
    t[e.ArrowLeft] = v.default.format("dxDiagram-shapeArrowLeft");
    t[e.ArrowUp] = v.default.format("dxDiagram-shapeArrowUp");
    t[e.ArrowRight] = v.default.format("dxDiagram-shapeArrowRight");
    t[e.ArrowDown] = v.default.format("dxDiagram-shapeArrowDown");
    t[e.ArrowUpDown] = v.default.format("dxDiagram-shapeArrowUpDown");
    t[e.ArrowLeftRight] = v.default.format("dxDiagram-shapeArrowLeftRight");
    t[e.Process] = v.default.format("dxDiagram-shapeProcess");
    t[e.Decision] = v.default.format("dxDiagram-shapeDecision");
    t[e.Terminator] = v.default.format("dxDiagram-shapeTerminator");
    t[e.PredefinedProcess] = v.default.format("dxDiagram-shapePredefinedProcess");
    t[e.Document] = v.default.format("dxDiagram-shapeDocument");
    t[e.MultipleDocuments] = v.default.format("dxDiagram-shapeMultipleDocuments");
    t[e.ManualInput] = v.default.format("dxDiagram-shapeManualInput");
    t[e.Preparation] = v.default.format("dxDiagram-shapePreparation");
    t[e.Data] = v.default.format("dxDiagram-shapeData");
    t[e.Database] = v.default.format("dxDiagram-shapeDatabase");
    t[e.HardDisk] = v.default.format("dxDiagram-shapeHardDisk");
    t[e.InternalStorage] = v.default.format("dxDiagram-shapeInternalStorage");
    t[e.PaperTape] = v.default.format("dxDiagram-shapePaperTape");
    t[e.ManualOperation] = v.default.format("dxDiagram-shapeManualOperation");
    t[e.Delay] = v.default.format("dxDiagram-shapeDelay");
    t[e.StoredData] = v.default.format("dxDiagram-shapeStoredData");
    t[e.Display] = v.default.format("dxDiagram-shapeDisplay");
    t[e.Merge] = v.default.format("dxDiagram-shapeMerge");
    t[e.Connector] = v.default.format("dxDiagram-shapeConnector");
    t[e.Or] = v.default.format("dxDiagram-shapeOr");
    t[e.SummingJunction] = v.default.format("dxDiagram-shapeSummingJunction");
    t[e.Container] = v.default.format("dxDiagram-shapeContainerDefaultText");
    t[e.VerticalContainer] = v.default.format("dxDiagram-shapeVerticalContainer");
    t[e.HorizontalContainer] = v.default.format("dxDiagram-shapeHorizontalContainer");
    t[e.Card] = v.default.format("dxDiagram-shapeCardDefaultText");
    t[e.CardWithImageOnLeft] = v.default.format("dxDiagram-shapeCardWithImageOnLeft");
    t[e.CardWithImageOnTop] = v.default.format("dxDiagram-shapeCardWithImageOnTop");
    t[e.CardWithImageOnRight] = v.default.format("dxDiagram-shapeCardWithImageOnRight");
    return t;
  };
  r._updateEventSubscriptionMethods = function () {
    var e = (0, f.getDiagram)().RenderHelper;
    e.addEventListener = function (e, t, n) {
      m.default.on(e, t, n);
    };
    e.removeEventListener = function (e, t, n) {
      m.default.off(e, t, n);
    };
  };
  r._updateDefaultItemProperties = function () {
    if (this.option("defaultItemProperties.style")) {
      this._diagramInstance.setInitialStyleProperties(this.option("defaultItemProperties.style"));
    }
    if (this.option("defaultItemProperties.textStyle")) {
      this._diagramInstance.setInitialTextStyleProperties(this.option("defaultItemProperties.textStyle"));
    }
    this._diagramInstance.setInitialConnectorProperties({
      lineOption: this._getConnectorLineOption(this.option("defaultItemProperties.connectorLineType")),
      startLineEnding: this._getConnectorLineEnding(this.option("defaultItemProperties.connectorLineStart")),
      endLineEnding: this._getConnectorLineEnding(this.option("defaultItemProperties.connectorLineEnd"))
    });
    this._diagramInstance.applyShapeSizeSettings({
      shapeMinWidth: this.option("defaultItemProperties.shapeMinWidth"),
      shapeMaxWidth: this.option("defaultItemProperties.shapeMaxWidth"),
      shapeMinHeight: this.option("defaultItemProperties.shapeMinHeight"),
      shapeMaxHeight: this.option("defaultItemProperties.shapeMaxHeight")
    });
  };
  r._updateEditingSettings = function () {
    this._diagramInstance.applyOperationSettings({
      addShape: this.option("editing.allowAddShape"),
      addShapeFromToolbox: this.option("editing.allowAddShape"),
      deleteShape: this.option("editing.allowDeleteShape"),
      deleteConnector: this.option("editing.allowDeleteConnector"),
      changeConnection: this.option("editing.allowChangeConnection"),
      changeConnectorPoints: this.option("editing.allowChangeConnectorPoints"),
      changeShapeText: this.option("editing.allowChangeShapeText"),
      changeConnectorText: this.option("editing.allowChangeConnectorText"),
      resizeShape: this.option("editing.allowResizeShape"),
      moveShape: this.option("editing.allowMoveShape")
    });
  };
  r.fitToContent = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.FitToScreen);
  };
  r.fitToWidth = function () {
    var e = (0, f.getDiagram)().DiagramCommand;
    this._executeDiagramCommand(e.FitToWidth);
  };
  r.focus = function () {
    this._captureFocus();
  };
  r.export = function () {
    return this._getDiagramData();
  };
  r.exportTo = function (e, t) {
    var n = this._getDiagramExportToCommand(e);
    this._executeDiagramCommand(n, t);
  };
  r._getDiagramExportToCommand = function (e) {
    var t = (0, f.getDiagram)().DiagramCommand;
    switch (e) {
      case "png":
        return t.ExportPng;
      case "jpg":
        return t.ExportJpg;
      default:
        return t.ExportSvg;
    }
  };
  r.import = function (e, t) {
    this._setDiagramData(e, t);
    this._raiseDataChangeAction();
  };
  r.updateToolbox = function () {
    if (this._diagramInstance) {
      this._diagramInstance.refreshToolbox();
    }
    if (this._toolbox) {
      this._toolbox.updateTooltips();
      this._toolbox.updateFilter();
      this._toolbox.updateMaxHeight();
    }
  };
  r._getDefaultOptions = function () {
    return (0, u.extend)(e.prototype._getDefaultOptions.call(this), {
      readOnly: false,
      zoomLevel: 1,
      simpleView: false,
      autoZoomMode: "disabled",
      fullScreen: false,
      showGrid: true,
      snapToGrid: true,
      units: "in",
      viewUnits: "in",
      pageOrientation: "portrait",
      pageColor: "#ffffff",
      hasChanges: false,
      nodes: {
        dataSource: null,
        keyExpr: "id",
        customDataExpr: undefined,
        lockedExpr: undefined,
        styleExpr: undefined,
        textStyleExpr: undefined,
        zIndexExpr: undefined,
        typeExpr: "type",
        textExpr: "text",
        imageUrlExpr: undefined,
        parentKeyExpr: undefined,
        itemsExpr: undefined,
        leftExpr: undefined,
        topExpr: undefined,
        widthExpr: undefined,
        heightExpr: undefined,
        containerKeyExpr: "containerKey",
        containerChildrenExpr: undefined,
        autoLayout: "auto",
        autoSizeEnabled: true
      },
      edges: {
        dataSource: null,
        keyExpr: "id",
        customDataExpr: undefined,
        lockedExpr: undefined,
        styleExpr: undefined,
        textStyleExpr: undefined,
        zIndexExpr: undefined,
        fromExpr: "from",
        fromPointIndexExpr: undefined,
        toExpr: "to",
        toPointIndexExpr: undefined,
        pointsExpr: undefined,
        textExpr: undefined,
        lineTypeExpr: undefined,
        fromLineEndExpr: undefined,
        toLineEndExpr: undefined
      },
      customShapes: [],
      toolbox: {
        visibility: "auto",
        shapeIconsPerRow: 3,
        showSearch: true
      },
      mainToolbar: {
        visible: false
      },
      historyToolbar: {
        visible: true
      },
      viewToolbar: {
        visible: true
      },
      contextMenu: {
        enabled: true
      },
      contextToolbox: {
        enabled: true,
        shapeIconsPerRow: 4,
        width: 152
      },
      propertiesPanel: {
        visibility: "auto"
      },
      defaultItemProperties: {
        connectorLineType: "orthogonal",
        connectorLineStart: "none",
        connectorLineEnd: "arrow"
      },
      editing: {
        allowAddShape: true,
        allowDeleteShape: true,
        allowDeleteConnector: true,
        allowChangeConnection: true,
        allowChangeConnectorPoints: true,
        allowChangeShapeText: true,
        allowChangeConnectorText: true,
        allowResizeShape: true,
        allowMoveShape: true
      },
      export: {
        fileName: "Diagram"
      },
      onItemClick: null,
      onItemDblClick: null,
      onSelectionChanged: null,
      onRequestEditOperation: null,
      onRequestLayoutUpdate: null
    });
  };
  r._raiseDataChangeAction = function () {
    if (this._initialized) {
      this.option("hasChanges", true);
    }
  };
  r._raiseEdgeInsertedAction = function (e, t, n) {
    if (this._edgesOption) {
      this._edgesOption.insert(e, t, n);
    }
  };
  r._raiseEdgeUpdatedAction = function (e, t, n, i) {
    if (this._edgesOption) {
      this._edgesOption.update(e, t, n, i);
    }
  };
  r._raiseEdgeRemovedAction = function (e, t, n, i) {
    if (this._edgesOption) {
      this._edgesOption.remove(e, t, n, i);
    }
  };
  r._raiseNodeInsertedAction = function (e, t, n) {
    if (this._nodesOption) {
      this._nodesOption.insert(e, t, n);
    }
  };
  r._raiseNodeUpdatedAction = function (e, t, n, i) {
    if (this._nodesOption) {
      this._nodesOption.update(e, t, n, i);
    }
  };
  r._raiseNodeRemovedAction = function (e, t, n, i) {
    if (this._nodesOption) {
      this._nodesOption.remove(e, t, n, i);
    }
  };
  r._raiseToolboxDragStart = function () {
    if (this._toolbox && this.isMobileScreenSize()) {
      this._toolbox.hide();
      this._toolboxDragHidden = true;
    }
  };
  r._raiseToolboxDragEnd = function () {
    if (this._toolbox && this._toolboxDragHidden) {
      this._toolbox.show();
      delete this._toolboxDragHidden;
    }
  };
  r._raiseTextInputStart = function () {
    this._textInputStarted = true;
    if (this._propertiesPanel && this.isMobileScreenSize() && this._propertiesPanel.isVisible()) {
      this._propertiesPanel.hide();
      this._propertiesPanelTextInputHidden = true;
    }
    if (this._toolbox && this.isMobileScreenSize() && this._toolbox.isVisible()) {
      this._toolbox.hide();
      this._toolboxTextInputHidden = true;
    }
  };
  r._raiseTextInputEnd = function () {
    if (this._propertiesPanel && this._propertiesPanelTextInputHidden) {
      this._propertiesPanel.show();
      delete this._propertiesPanelTextInputHidden;
    }
    if (this._toolbox && this._toolboxTextInputHidden) {
      this._toolbox.show();
      delete this._toolboxTextInputHidden;
    }
    this._textInputStarted = false;
  };
  r._createItemClickAction = function () {
    this._itemClickAction = this._createActionByOption("onItemClick");
  };
  r._createItemDblClickAction = function () {
    this._itemDblClickAction = this._createActionByOption("onItemDblClick");
  };
  r._createSelectionChangedAction = function () {
    this._selectionChangedAction = this._createActionByOption("onSelectionChanged");
  };
  r._createRequestEditOperationAction = function () {
    this._requestEditOperationAction = this._createActionByOption("onRequestEditOperation");
  };
  r._createRequestLayoutUpdateAction = function () {
    this._requestLayoutUpdateAction = this._createActionByOption("onRequestLayoutUpdate");
  };
  r._createCustomCommand = function () {
    this._customCommandAction = this._createActionByOption("onCustomCommand");
  };
  r._raiseItemClickAction = function (e) {
    if (!this._itemClickAction) {
      this._createItemClickAction();
    }
    this._itemClickAction({
      item: this._nativeItemToDiagramItem(e)
    });
  };
  r._raiseItemDblClickAction = function (e) {
    if (!this._itemDblClickAction) {
      this._createItemDblClickAction();
    }
    this._itemDblClickAction({
      item: this._nativeItemToDiagramItem(e)
    });
  };
  r._raiseSelectionChanged = function (e) {
    if (!this._selectionChangedAction) {
      this._createSelectionChangedAction();
    }
    this._selectionChangedAction({
      items: e.map(this._nativeItemToDiagramItem.bind(this))
    });
  };
  r._raiseRequestEditOperation = function (e, t) {
    if (!this._requestEditOperationAction) {
      this._createRequestEditOperationAction();
    }
    var n = this._getRequestEditOperationEventArgs(e, t);
    this._requestEditOperationAction(n);
    t.allowed = n.allowed;
  };
  r._getModelOperation = function (e) {
    var t = (0, f.getDiagram)().DiagramModelOperation;
    switch (e) {
      case t.AddShape:
        return "addShape";
      case t.AddShapeFromToolbox:
        return "addShapeFromToolbox";
      case t.DeleteShape:
        return "deleteShape";
      case t.DeleteConnector:
        return "deleteConnector";
      case t.ChangeConnection:
        return "changeConnection";
      case t.ChangeConnectorPoints:
        return "changeConnectorPoints";
      case t.BeforeChangeShapeText:
        return "beforeChangeShapeText";
      case t.ChangeShapeText:
        return "changeShapeText";
      case t.BeforeChangeConnectorText:
        return "beforeChangeConnectorText";
      case t.ChangeConnectorText:
        return "changeConnectorText";
      case t.ResizeShape:
        return "resizeShape";
      case t.MoveShape:
        return "moveShape";
    }
  };
  r._getRequestEditOperationEventArgs = function (e, t) {
    var n = (0, f.getDiagram)();
    var i = n.DiagramModelOperation;
    var o = n.ConnectorPosition;
    var a = {
      operation: this._getModelOperation(e),
      allowed: t.allowed,
      updateUI: t.updateUI,
      reason: t.updateUI ? "checkUIElementAvailability" : "modelModification"
    };
    switch (e) {
      case i.AddShape:
        a.args = {
          shape: t.shape && this._nativeItemToDiagramItem(t.shape),
          position: t.position && {
            x: t.position.x,
            y: t.position.y
          }
        };
        break;
      case i.AddShapeFromToolbox:
        a.args = {
          shapeType: t.shapeType
        };
        break;
      case i.DeleteShape:
        a.args = {
          shape: t.shape && this._nativeItemToDiagramItem(t.shape)
        };
        break;
      case i.DeleteConnector:
        a.args = {
          connector: t.connector && this._nativeItemToDiagramItem(t.connector)
        };
        break;
      case i.ChangeConnection:
        a.args = {
          newShape: t.shape && this._nativeItemToDiagramItem(t.shape),
          oldShape: t.oldShape && this._nativeItemToDiagramItem(t.oldShape),
          connector: t.connector && this._nativeItemToDiagramItem(t.connector),
          connectionPointIndex: t.connectionPointIndex,
          connectorPosition: t.position === o.Begin ? "start" : "end"
        };
        break;
      case i.ChangeConnectorPoints:
        a.args = {
          connector: t.connector && this._nativeItemToDiagramItem(t.connector),
          newPoints: t.points && t.points.map(function (e) {
            return {
              x: e.x,
              y: e.y
            };
          }),
          oldPoints: t.oldPoints && t.oldPoints.map(function (e) {
            return {
              x: e.x,
              y: e.y
            };
          })
        };
        break;
      case i.BeforeChangeShapeText:
        a.args = {
          shape: t.shape && this._nativeItemToDiagramItem(t.shape)
        };
        break;
      case i.ChangeShapeText:
        a.args = {
          shape: t.shape && this._nativeItemToDiagramItem(t.shape),
          text: t.text
        };
        break;
      case i.BeforeChangeConnectorText:
        a.args = {
          connector: t.connector && this._nativeItemToDiagramItem(t.connector),
          index: t.index
        };
        break;
      case i.ChangeConnectorText:
        a.args = {
          connector: t.connector && this._nativeItemToDiagramItem(t.connector),
          index: t.index,
          text: t.text
        };
        break;
      case i.ResizeShape:
        a.args = {
          shape: t.shape && this._nativeItemToDiagramItem(t.shape),
          newSize: t.size && {
            width: t.size.width,
            height: t.size.height
          },
          oldSize: t.oldSize && {
            width: t.oldSize.width,
            height: t.oldSize.height
          }
        };
        break;
      case i.MoveShape:
        a.args = {
          shape: t.shape && this._nativeItemToDiagramItem(t.shape),
          newPosition: t.position && {
            x: t.position.x,
            y: t.position.y
          },
          oldPosition: t.oldPosition && {
            x: t.oldPosition.x,
            y: t.oldPosition.y
          }
        };
    }
    return a;
  };
  r._nativeItemToDiagramItem = function (e) {
    var t = e instanceof (0, f.getDiagram)().NativeShape ? this._nativeShapeToDiagramShape.bind(this) : this._nativeConnectorToDiagramConnector.bind(this);
    return (0, u.extend)({
      id: e.id,
      key: e.key,
      dataItem: undefined
    }, t(e));
  };
  r._nativeShapeToDiagramShape = function (e) {
    return {
      dataItem: this._nodesOption && this._nodesOption.findItem(e.key),
      itemType: "shape",
      text: e.text,
      type: e.type,
      position: {
        x: e.position.x,
        y: e.position.y
      },
      size: {
        width: e.size.width,
        height: e.size.height
      },
      attachedConnectorIds: e.attachedConnectorIds,
      containerId: e.containerId,
      containerChildItemIds: e.containerChildItemIds,
      containerExpanded: e.containerExpanded
    };
  };
  r._nativeConnectorToDiagramConnector = function (e) {
    return {
      dataItem: this._edgesOption && this._edgesOption.findItem(e.key),
      itemType: "connector",
      texts: e.texts,
      fromKey: e.fromKey,
      toKey: e.toKey,
      fromId: e.fromId,
      fromPointIndex: e.fromPointIndex,
      toId: e.toId,
      toPointIndex: e.toPointIndex,
      points: e.points.map(function (e) {
        return {
          x: e.x,
          y: e.y
        };
      })
    };
  };
  r.getItemByKey = function (e) {
    var t = this._diagramInstance && this._diagramInstance.getNativeItemByDataKey(e);
    return t && this._nativeItemToDiagramItem(t);
  };
  r.getItemById = function (e) {
    var t = this._diagramInstance && this._diagramInstance.getNativeItemByKey(e);
    return t && this._nativeItemToDiagramItem(t);
  };
  r.getItems = function () {
    var e = this;
    return this._diagramInstance.getNativeItems().map(function (t) {
      return t && e._nativeItemToDiagramItem(t);
    });
  };
  r.getSelectedItems = function () {
    var e = this;
    return this._diagramInstance.getNativeSelectedItems().map(function (t) {
      return t && e._nativeItemToDiagramItem(t);
    });
  };
  r.setSelectedItems = function (e) {
    return this._diagramInstance.setSelectedItems(e.map(function (e) {
      return e.id;
    }));
  };
  r.scrollToItem = function (e) {
    return this._diagramInstance.scrollToItems([e.id]);
  };
  r._invalidateContextMenuCommands = function () {
    if (this._contextMenu) {
      this._contextMenu.option({
        commands: this.option("contextMenu.commands")
      });
    }
  };
  r._invalidateMainToolbarCommands = function () {
    if (this._mainToolbar) {
      this._mainToolbar.option({
        commands: this.option("mainToolbar.commands")
      });
    }
  };
  r._invalidateHistoryToolbarCommands = function () {
    if (this._historyToolbar) {
      this._historyToolbar.option({
        commands: this.option("historyToolbar.commands")
      });
    }
  };
  r._invalidateViewToolbarCommands = function () {
    if (this._viewToolbar) {
      this._viewToolbar.option({
        commands: this.option("viewToolbar.commands")
      });
    }
  };
  r._invalidateToolboxGroups = function () {
    if (this._toolbox) {
      this._toolbox.option({
        toolboxGroups: this._getToolboxGroups()
      });
    }
  };
  r._optionChanged = function (e) {
    if (this.optionsUpdateBar && !this.optionsUpdateBar.isUpdateLocked()) {
      this.optionsUpdateBar.beginUpdate();
      try {
        this._optionChangedCore(e);
      } finally {
        this.optionsUpdateBar.endUpdate();
      }
    }
  };
  r._optionChangedCore = function (t) {
    var n = this;
    switch (t.name) {
      case "readOnly":
      case "disabled":
        this._updateReadOnlyState();
        this._invalidate();
        break;
      case "zoomLevel":
        if (t.fullName === "zoomLevel" || t.fullName === "zoomLevel.items" || t.fullName === "zoomLevel.value") {
          this._updateZoomLevelState();
        }
        break;
      case "autoZoomMode":
        this._updateAutoZoomState();
        break;
      case "simpleView":
        this._updateSimpleViewState();
        break;
      case "useNativeScrolling":
        this._invalidate();
        break;
      case "fullScreen":
        this._updateFullscreenState();
        break;
      case "showGrid":
        this._updateShowGridState();
        break;
      case "snapToGrid":
        this._updateSnapToGridState();
        break;
      case "gridSize":
        if (t.fullName === "gridSize" || t.fullName === "gridSize.items" || t.fullName === "gridSize.value") {
          this._updateGridSizeState();
        }
        break;
      case "viewUnits":
        this._updateViewUnitsState();
        break;
      case "units":
        this._updateUnitsState();
        break;
      case "pageSize":
        if (t.fullName === "pageSize" || t.fullName === "pageSize.items") {
          this._updatePageSizeItemsState();
        }
        if (t.fullName === "pageSize" || t.fullName === "pageSize.width" || t.fullName === "pageSize.height") {
          this._updatePageSizeState();
        }
        break;
      case "pageOrientation":
        this._updatePageOrientationState();
        break;
      case "pageColor":
        this._updatePageColorState();
        break;
      case "nodes":
        if (t.fullName.indexOf("nodes.autoLayout") === 0) {
          this._refreshDataSources();
        } else {
          this._refreshNodesDataSource();
        }
        break;
      case "edges":
        this._refreshEdgesDataSource();
        break;
      case "customShapes":
        if (t.fullName !== t.name) {
          this._updateAllCustomShapes();
        } else {
          this._updateCustomShapes(t.value, t.previousValue);
        }
        this._invalidate();
        break;
      case "contextMenu":
        if (t.fullName === "contextMenu.commands") {
          this._invalidateContextMenuCommands();
        } else {
          this._invalidate();
        }
        break;
      case "contextToolbox":
      case "propertiesPanel":
        this._invalidate();
        break;
      case "toolbox":
        if (t.fullName === "toolbox.groups") {
          this._invalidateToolboxGroups();
        } else {
          this._invalidate();
        }
        break;
      case "mainToolbar":
        if (t.fullName === "mainToolbar.commands") {
          this._invalidateMainToolbarCommands();
        } else {
          this._invalidate();
        }
        break;
      case "historyToolbar":
        if (t.fullName === "historyToolbar.commands") {
          this._invalidateHistoryToolbarCommands();
        } else {
          this._invalidate();
        }
        break;
      case "viewToolbar":
        if (t.fullName === "viewToolbar.commands") {
          this._invalidateViewToolbarCommands();
        } else {
          this._invalidate();
        }
        break;
      case "onItemClick":
        this._createItemClickAction();
        break;
      case "onItemDblClick":
        this._createItemDblClickAction();
        break;
      case "onSelectionChanged":
        this._createSelectionChangedAction();
        break;
      case "onRequestEditOperation":
        this._createRequestEditOperationAction();
        break;
      case "onRequestLayoutUpdate":
        this._createRequestLayoutUpdateAction();
        break;
      case "onCustomCommand":
        this._createCustomCommand();
        break;
      case "defaultItemProperties":
        this._updateDefaultItemProperties();
        break;
      case "editing":
        this._updateEditingSettings();
        break;
      case "export":
        this._toolbars.forEach(function (e) {
          e.option("export", n.option("export"));
        });
        if (this._contextMenu) {
          this._contextMenu.option("export", this.option("export"));
        }
        break;
      case "hasChanges":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return i;
}(r.default);
(0, l.default)("dxDiagram", $);
var U = $;
exports.default = U;
module.exports = exports.default;
module.exports.default = exports.default;