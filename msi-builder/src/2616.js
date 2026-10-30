exports.default = undefined;
var i = require("./58664.js");
var o = x(require("./68374.js"));
var a = x(require("./55994.js"));
var r = x(require("./99393.js"));
var s = require("./20576.js");
var l = require("./6415.js");
var u = require("./95479.js");
var d = require("./35922.js");
var c = require("./13306.js");
var h = require("./13660.js");
var f = require("./39611.js");
var p = x(require("./93786.js"));
var g = require("./24028.js");
var m = x(require("./46377.js"));
var _ = x(require("./89799.js"));
var v = x(require("./59987.js"));
var y = x(require("./63008.js"));
var b = x(require("./30254.js"));
function x(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function w(e, t) {
  return (w = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var C = {
  show: 50,
  hide: 300
};
var S = ["onSubmenuShowing", "onSubmenuShown", "onSubmenuHiding", "onSubmenuHidden", "onItemContextMenu", "onItemClick", "onSelectionChanged", "onItemRendered"];
var k = function (e) {
  var t;
  var n;
  function r() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  w(t, n);
  var m = r.prototype;
  m._getDefaultOptions = function () {
    return (0, c.extend)(e.prototype._getDefaultOptions.call(this), {
      orientation: "horizontal",
      submenuDirection: "auto",
      showFirstSubmenuMode: {
        name: "onClick",
        delay: {
          show: 50,
          hide: 300
        }
      },
      hideSubmenuOnMouseLeave: false,
      onSubmenuShowing: null,
      onSubmenuShown: null,
      onSubmenuHiding: null,
      onSubmenuHidden: null,
      adaptivityEnabled: false
    });
  };
  m._setOptionsByReference = function () {
    e.prototype._setOptionsByReference.call(this);
    (0, c.extend)(this._optionsByReference, {
      animation: true,
      selectedItem: true
    });
  };
  m._itemElements = function () {
    var t = e.prototype._itemElements.call(this);
    var n = this._submenuItemElements();
    return t.add(n);
  };
  m._submenuItemElements = function () {
    var e = [];
    var t = `.dx-menu-item`;
    var n = this._submenus.length && this._submenus[0];
    if (n && n.itemsContainer()) {
      e = n.itemsContainer().find(t);
    }
    return e;
  };
  m._focusTarget = function () {
    return this.$element();
  };
  m._isMenuHorizontal = function () {
    return this.option("orientation") === "horizontal";
  };
  m._moveFocus = function (t) {
    var n;
    var i;
    var o;
    var a = this._getAvailableItems();
    var r = this._isMenuHorizontal();
    var s = this._getActiveItem(true);
    switch (t) {
      case "up":
        i = r ? "showSubmenu" : this._getItemsNavigationOperation("prevItem");
        n = r ? s : a;
        o = this._getKeyboardNavigationAction(i, n)();
        break;
      case "down":
        i = r ? "showSubmenu" : this._getItemsNavigationOperation("nextItem");
        n = r ? s : a;
        o = this._getKeyboardNavigationAction(i, n)();
        break;
      case "right":
        i = r ? this._getItemsNavigationOperation("nextItem") : "showSubmenu";
        n = r ? a : s;
        o = this._getKeyboardNavigationAction(i, n)();
        break;
      case "left":
        i = r ? this._getItemsNavigationOperation("prevItem") : "showSubmenu";
        n = r ? a : s;
        o = this._getKeyboardNavigationAction(i, n)();
        break;
      default:
        return e.prototype._moveFocus.call(this, t);
    }
    if (o && o.length !== 0) {
      this.option("focusedElement", (0, l.getPublicElement)(o));
    }
  };
  m._getItemsNavigationOperation = function (e) {
    var t = e;
    if (this.option("rtlEnabled")) {
      t = e === "prevItem" ? "nextItem" : "prevItem";
    }
    return t;
  };
  m._getKeyboardNavigationAction = function (e, t) {
    var n = s.noop;
    switch (e) {
      case "showSubmenu":
        if (!t.hasClass("dx-state-disabled")) {
          n = this._showSubmenu.bind(this, t);
        }
        break;
      case "nextItem":
        n = this._nextItem.bind(this, t);
        break;
      case "prevItem":
        n = this._prevItem.bind(this, t);
    }
    return n;
  };
  m._clean = function () {
    e.prototype._clean.call(this);
    if (this.option("templatesRenderAsynchronously")) {
      clearTimeout(this._resizeEventTimer);
    }
  };
  m._visibilityChanged = function (e) {
    if (e) {
      if (!this._menuItemsWidth) {
        this._updateItemsWidthCache();
      }
      this._dimensionChanged();
    }
  };
  m._isAdaptivityEnabled = function () {
    return this.option("adaptivityEnabled") && this.option("orientation") === "horizontal";
  };
  m._updateItemsWidthCache = function () {
    var e = this.$element().find("ul").first().children("li").children(`.dx-menu-item`);
    this._menuItemsWidth = this._getSummaryItemsWidth(e, true);
  };
  m._dimensionChanged = function () {
    if (this._isAdaptivityEnabled()) {
      var e = (0, i.getOuterWidth)(this.$element());
      this._toggleAdaptiveMode(this._menuItemsWidth > e);
    }
  };
  m._init = function () {
    e.prototype._init.call(this);
    this._submenus = [];
  };
  m._initActions = function () {
    var e = this;
    this._actions = {};
    (0, u.each)(S, function (t, n) {
      e._actions[n] = e._createActionByOption(n);
    });
  };
  m._initMarkup = function () {
    this._visibleSubmenu = null;
    this.$element().addClass("dx-menu");
    e.prototype._initMarkup.call(this);
    this._addCustomCssClass(this.$element());
    this.setAria("role", "menubar");
  };
  m._render = function () {
    e.prototype._render.call(this);
    this._initAdaptivity();
  };
  m._renderHamburgerButton = function () {
    this._hamburger = new y.default((0, o.default)("<div>").addClass("dx-menu-hamburger-button"), {
      icon: "menu",
      activeStateEnabled: false,
      onClick: this._toggleTreeView.bind(this)
    });
    return this._hamburger.$element();
  };
  m._toggleTreeView = function (e) {
    if ((0, d.isPlainObject)(e)) {
      e = !this._overlay.option("visible");
    }
    this._overlay.option("visible", e);
    this._toggleHamburgerActiveState(e);
  };
  m._toggleHamburgerActiveState = function (e) {
    if (this._hamburger) {
      this._hamburger.$element().toggleClass("dx-state-active", e);
    }
  };
  m._toggleAdaptiveMode = function (e) {
    var t = this.$element().find(`.dx-menu-horizontal`);
    var n = this.$element().find(`.dx-menu-adaptive-mode`);
    if (e) {
      this._hideVisibleSubmenu();
    } else {
      if (this._treeView) {
        this._treeView.collapseAll();
      }
      if (this._overlay) {
        this._toggleTreeView(e);
      }
    }
    t.toggle(!e);
    n.toggle(e);
  };
  m._removeAdaptivity = function () {
    if (this._$adaptiveContainer) {
      this._toggleAdaptiveMode(false);
      this._$adaptiveContainer.remove();
      this._$adaptiveContainer = null;
      this._treeView = null;
      this._hamburger = null;
      this._overlay = null;
    }
  };
  m._treeviewItemClickHandler = function (e) {
    this._actions.onItemClick(e);
    if (!e.node.children.length) {
      this._toggleTreeView(false);
    }
  };
  m._getAdaptiveOverlayOptions = function () {
    var e = this;
    var t = this.option("rtlEnabled") ? "right" : "left";
    return {
      _ignoreFunctionValueDeprecation: true,
      maxHeight: function () {
        return (0, h.getElementMaxHeightByWindow)(e.$element());
      },
      deferRendering: false,
      shading: false,
      animation: false,
      hideOnParentScroll: true,
      onHidden: function () {
        e._toggleHamburgerActiveState(false);
      },
      height: "auto",
      hideOnOutsideClick: function (e) {
        return !(0, o.default)(e.target).closest(`.dx-menu-hamburger-button`).length;
      },
      position: {
        collision: "flipfit",
        at: "bottom " + t,
        my: "top " + t,
        of: this._hamburger.$element()
      }
    };
  };
  m._getTreeViewOptions = function () {
    var e = this;
    var t = {};
    (0, u.each)(["rtlEnabled", "width", "accessKey", "activeStateEnabled", "animation", "dataSource", "disabled", "displayExpr", "displayExpr", "focusStateEnabled", "hint", "hoverStateEnabled", "itemsExpr", "items", "itemTemplate", "selectedExpr", "selectionMode", "tabIndex", "visible"], function (n, i) {
      t[i] = e.option(i);
    });
    (0, u.each)(["onItemContextMenu", "onSelectionChanged", "onItemRendered"], function (n, i) {
      t[i] = function (t) {
        e._actions[i](t);
      };
    });
    return (0, c.extend)(t, {
      dataSource: this.getDataSource(),
      animationEnabled: !!this.option("animation"),
      onItemClick: this._treeviewItemClickHandler.bind(this),
      onItemExpanded: function (t) {
        e._overlay.repaint();
        e._actions.onSubmenuShown(t);
      },
      onItemCollapsed: function (t) {
        e._overlay.repaint();
        e._actions.onSubmenuHidden(t);
      },
      selectNodesRecursive: false,
      selectByClick: this.option("selectByClick"),
      expandEvent: "click"
    });
  };
  m._initAdaptivity = function () {
    if (this._isAdaptivityEnabled()) {
      this._$adaptiveContainer = (0, o.default)("<div>").addClass("dx-menu-adaptive-mode");
      var e = this._renderHamburgerButton();
      this._treeView = this._createComponent((0, o.default)("<div>"), b.default, this._getTreeViewOptions());
      this._overlay = this._createComponent((0, o.default)("<div>"), _.default, this._getAdaptiveOverlayOptions());
      this._overlay.$content().append(this._treeView.$element()).addClass("dx-menu-adaptive-mode").addClass(this.option("cssClass"));
      this._overlay.$wrapper().addClass("dx-menu-adaptive-mode-overlay-wrapper");
      this._$adaptiveContainer.append(e);
      this._$adaptiveContainer.append(this._overlay.$element());
      this.$element().append(this._$adaptiveContainer);
      this._updateItemsWidthCache();
      this._dimensionChanged();
    }
  };
  m._getDelay = function (e) {
    var t = this.option("showFirstSubmenuMode").delay;
    if ((0, d.isDefined)(t)) {
      if ((0, d.isObject)(t)) {
        return t[e];
      } else {
        return t;
      }
    } else {
      return C[e];
    }
  };
  m._keyboardHandler = function (t) {
    return e.prototype._keyboardHandler.call(this, t, !!this._visibleSubmenu);
  };
  m._renderContainer = function () {
    var t = (0, o.default)("<div>");
    t.appendTo(this.$element()).addClass(this._isMenuHorizontal() ? "dx-menu-horizontal" : "dx-menu-vertical");
    return e.prototype._renderContainer.call(this, t);
  };
  m._renderSubmenuItems = function (e, t) {
    var n = this._createSubmenu(e, t);
    this._submenus.push(n);
    this._renderBorderElement(t);
    return n;
  };
  m._getKeyboardListeners = function () {
    return e.prototype._getKeyboardListeners.call(this).concat(this._visibleSubmenu);
  };
  m._createSubmenu = function (e, t) {
    var n = (0, o.default)("<div>").addClass("dx-context-menu").appendTo(t);
    var i = this._getChildNodes(e);
    var a = this._createComponent(n, v.default, (0, c.extend)(this._getSubmenuOptions(), {
      _dataAdapter: this._dataAdapter,
      _parentKey: e.internalFields.key,
      items: i,
      onHoverStart: this._clearTimeouts.bind(this),
      position: this.getSubmenuPosition(t)
    }));
    this._attachSubmenuHandlers(t, a);
    return a;
  };
  m._getSubmenuOptions = function () {
    var e = this;
    var t = (0, o.default)("<div>");
    var n = this._isMenuHorizontal();
    return {
      itemTemplate: this.option("itemTemplate"),
      target: t,
      orientation: this.option("orientation"),
      selectionMode: this.option("selectionMode"),
      cssClass: this.option("cssClass"),
      selectByClick: this.option("selectByClick"),
      hoverStateEnabled: this.option("hoverStateEnabled"),
      activeStateEnabled: this.option("activeStateEnabled"),
      focusStateEnabled: this.option("focusStateEnabled"),
      animation: this.option("animation"),
      showSubmenuMode: this.option("showSubmenuMode"),
      displayExpr: this.option("displayExpr"),
      disabledExpr: this.option("disabledExpr"),
      selectedExpr: this.option("selectedExpr"),
      itemsExpr: this.option("itemsExpr"),
      onFocusedItemChanged: function (t) {
        if (t.component.option("visible")) {
          e.option("focusedElement", t.component.option("focusedElement"));
        }
      },
      onSelectionChanged: this._nestedItemOnSelectionChangedHandler.bind(this),
      onItemClick: this._nestedItemOnItemClickHandler.bind(this),
      onItemRendered: this._nestedItemOnItemRenderedHandler.bind(this),
      onLeftFirstItem: n ? null : this._moveMainMenuFocus.bind(this, "prevItem"),
      onLeftLastItem: n ? null : this._moveMainMenuFocus.bind(this, "nextItem"),
      onCloseRootSubmenu: this._moveMainMenuFocus.bind(this, n ? "prevItem" : null),
      onExpandLastSubmenu: n ? this._moveMainMenuFocus.bind(this, "nextItem") : null
    };
  };
  m._getShowFirstSubmenuMode = function () {
    if (!this._isDesktopDevice()) {
      return "onClick";
    }
    var e = this.option("showFirstSubmenuMode");
    if ((0, d.isObject)(e)) {
      return e.name;
    } else {
      return e;
    }
  };
  m._moveMainMenuFocus = function (e) {
    var t = this._getAvailableItems();
    var n = t.length;
    var i = t.filter(`.dx-menu-item-expanded`).eq(0);
    var o = t.index(i);
    this._hideSubmenu(this._visibleSubmenu);
    if ((o += e === "prevItem" ? -1 : 1) >= n) {
      o = 0;
    } else if (o < 0) {
      o = n - 1;
    }
    var a = t.eq(o);
    this.option("focusedElement", (0, l.getPublicElement)(a));
  };
  m._nestedItemOnSelectionChangedHandler = function (e) {
    var t = e.addedItems.length && e.addedItems[0];
    var n = v.default.getInstance(e.element);
    (0, this._actions.onSelectionChanged)(e);
    if (t) {
      this._clearSelectionInSubmenus(t[0], n);
    }
    this._clearRootSelection();
    this._setOptionWithoutOptionChange("selectedItem", t);
  };
  m._clearSelectionInSubmenus = function (e, t) {
    var n = this;
    var i = !arguments.length;
    (0, u.each)(this._submenus, function (e, o) {
      var a = o._itemContainer();
      var r = !a.is(t && t._itemContainer());
      var s = a.find(`.${n._selectedItemClass()}`);
      if (r && s.length || i) {
        s.removeClass(n._selectedItemClass());
        var l = n._getItemData(s);
        if (l) {
          l.selected = false;
        }
        o._clearSelectedItems();
      }
    });
  };
  m._clearRootSelection = function () {
    var e = this.$element().find(`.dx-menu-items-container`).first().children().children().filter(`.${this._selectedItemClass()}`);
    if (e.length) {
      this._getItemData(e).selected = false;
      e.removeClass(this._selectedItemClass());
    }
  };
  m._nestedItemOnItemClickHandler = function (e) {
    this._actions.onItemClick(e);
  };
  m._nestedItemOnItemRenderedHandler = function (e) {
    this._actions.onItemRendered(e);
  };
  m._attachSubmenuHandlers = function (e, t) {
    var n = this;
    var i = t.getOverlayContent().find(`.dx-submenu`);
    var o = (0, f.addNamespace)(g.end, this.NAME + "_submenu");
    t.option({
      onShowing: this._submenuOnShowingHandler.bind(this, e, t),
      onShown: this._submenuOnShownHandler.bind(this, e, t),
      onHiding: this._submenuOnHidingHandler.bind(this, e, t),
      onHidden: this._submenuOnHiddenHandler.bind(this, e, t)
    });
    (0, u.each)(i, function (t, i) {
      a.default.off(i, o);
      a.default.on(i, o, null, n._submenuMouseLeaveHandler.bind(n, e));
    });
  };
  m._submenuOnShowingHandler = function (e, t) {
    var n = e.children(`.dx-context-menu-container-border`);
    this._actions.onSubmenuShowing({
      rootItem: (0, l.getPublicElement)(e),
      submenu: t
    });
    n.show();
    e.addClass("dx-menu-item-expanded");
  };
  m._submenuOnShownHandler = function (e, t) {
    this._actions.onSubmenuShown({
      rootItem: (0, l.getPublicElement)(e),
      submenu: t
    });
  };
  m._submenuOnHidingHandler = function (e, t, n) {
    var i = e.children(`.dx-context-menu-container-border`);
    var o = n;
    o.rootItem = (0, l.getPublicElement)(e);
    o.submenu = t;
    this._actions.onSubmenuHiding(o);
    if (!(n = o).cancel) {
      if (this._visibleSubmenu === t) {
        this._visibleSubmenu = null;
      }
      i.hide();
      e.removeClass("dx-menu-item-expanded");
    }
  };
  m._submenuOnHiddenHandler = function (e, t) {
    this._actions.onSubmenuHidden({
      rootItem: (0, l.getPublicElement)(e),
      submenu: t
    });
  };
  m._submenuMouseLeaveHandler = function (e, t) {
    var n = (0, o.default)(t.relatedTarget).parents(`.dx-context-menu`)[0];
    var i = this._getSubmenuByRootElement(e).getOverlayContent()[0];
    if (this.option("hideSubmenuOnMouseLeave") && n !== i) {
      this._clearTimeouts();
      setTimeout(this._hideSubmenuAfterTimeout.bind(this), this._getDelay("hide"));
    }
  };
  m._hideSubmenuAfterTimeout = function () {
    if (this._visibleSubmenu) {
      var e = (0, o.default)(this._visibleSubmenu.$element().context).hasClass("dx-state-hover");
      var t = this._visibleSubmenu.getOverlayContent().find(`.dx-state-hover`).length;
      if (!this._visibleSubmenu.getOverlayContent().get(0).querySelector(":hover") && !t && !e) {
        this._visibleSubmenu.hide();
      }
    }
  };
  m._getSubmenuByRootElement = function (e) {
    if (!e) {
      return false;
    }
    var t = e.children(`.dx-context-menu`);
    return t.length && v.default.getInstance(t);
  };
  m.getSubmenuPosition = function (e) {
    var t = this._isMenuHorizontal();
    var n = this.option("submenuDirection").toLowerCase();
    var i = this.option("rtlEnabled");
    var o = {
      collision: "flip",
      of: e
    };
    switch (n) {
      case "leftortop":
        o.at = "left top";
        o.my = t ? "left bottom" : "right top";
        break;
      case "rightorbottom":
        o.at = t ? "left bottom" : "right top";
        o.my = "left top";
        break;
      default:
        if (t) {
          o.at = i ? "right bottom" : "left bottom";
          o.my = i ? "right top" : "left top";
        } else {
          o.at = i ? "left top" : "right top";
          o.my = i ? "right top" : "left top";
        }
    }
    return o;
  };
  m._renderBorderElement = function (e) {
    (0, o.default)("<div>").appendTo(e).addClass("dx-context-menu-container-border").hide();
  };
  m._itemPointerDownHandler = function (t) {
    if ((0, o.default)(t.target).closest(this._itemElements()).hasClass("dx-menu-item-has-submenu")) {
      this.option("focusedElement", null);
    } else {
      e.prototype._itemPointerDownHandler.call(this, t);
    }
  };
  m._hoverStartHandler = function (e) {
    var t = (0, f.addNamespace)(p.default.move, this.NAME);
    var n = this._getItemElementByEventArgs(e);
    var i = this._dataAdapter.getNodeByItem(this._getItemData(n));
    var o = (0, d.isDefined)(e.buttons) && e.buttons === 1 || !(0, d.isDefined)(e.buttons) && e.which === 1;
    if (!this._isItemDisabled(n)) {
      a.default.off(n, t);
      if (this._hasChildren(i)) {
        if (this._getShowFirstSubmenuMode() === "onHover" && !o) {
          var r = this._getSubmenuByElement(n);
          this._clearTimeouts();
          if (!r.isOverlayVisible()) {
            a.default.on(n, t, this._itemMouseMoveHandler.bind(this));
            this._showSubmenuTimer = this._getDelay("hide");
          }
        }
      } else {
        this._showSubmenuTimer = setTimeout(this._hideSubmenuAfterTimeout.bind(this), this._getDelay("hide"));
      }
    }
  };
  m._hoverEndHandler = function (t) {
    var n = this;
    var i = this._getItemElementByEventArgs(t);
    var a = (0, o.default)(t.relatedTarget);
    e.prototype._hoverEndHandler.call(this, t);
    this._clearTimeouts();
    if (!this._isItemDisabled(i) && !a.hasClass("dx-context-menu-content-delimiter")) {
      if (this.option("hideSubmenuOnMouseLeave") && !a.hasClass("dx-menu-items-container")) {
        this._hideSubmenuTimer = setTimeout(function () {
          n._hideSubmenuAfterTimeout();
        }, this._getDelay("hide"));
      }
    }
  };
  m._hideVisibleSubmenu = function () {
    return !!this._visibleSubmenu && (this._hideSubmenu(this._visibleSubmenu), true);
  };
  m._showSubmenu = function (e) {
    var t = this._getSubmenuByElement(e);
    if (this._visibleSubmenu !== t) {
      this._hideVisibleSubmenu();
    }
    if (t) {
      this._clearTimeouts();
      this.focus();
      t.show();
      this.option("focusedElement", t.option("focusedElement"));
    }
    this._visibleSubmenu = t;
    this._hoveredRootItem = e;
  };
  m._hideSubmenu = function (e) {
    if (e) {
      e.hide();
    }
    if (this._visibleSubmenu === e) {
      this._visibleSubmenu = null;
    }
    this._hoveredRootItem = null;
  };
  m._itemMouseMoveHandler = function (e) {
    var t = this;
    if (!e.pointers || !e.pointers.length) {
      var n = (0, o.default)(e.currentTarget);
      if ((0, d.isDefined)(this._showSubmenuTimer)) {
        this._clearTimeouts();
        this._showSubmenuTimer = setTimeout(function () {
          var e = t._getSubmenuByElement(n);
          if (e && !e.isOverlayVisible()) {
            t._showSubmenu(n);
          }
        }, this._getDelay("show"));
      }
    }
  };
  m._clearTimeouts = function () {
    clearTimeout(this._hideSubmenuTimer);
    clearTimeout(this._showSubmenuTimer);
  };
  m._getSubmenuByElement = function (e, t) {
    var n = this._getSubmenuByRootElement(e);
    if (n) {
      return n;
    }
    t = t || this._getItemData(e);
    var i = this._dataAdapter.getNodeByItem(t);
    return this._hasChildren(i) && this._renderSubmenuItems(i, e);
  };
  m._updateSubmenuVisibilityOnClick = function (e) {
    var t = e.args.length && e.args[0];
    if (t && !this._disabledGetter(t.itemData)) {
      var n = (0, o.default)(t.itemElement);
      var i = this._getSubmenuByElement(n, t.itemData);
      this._updateSelectedItemOnClick(e);
      if (this._visibleSubmenu) {
        if (this._visibleSubmenu === i) {
          if (this.option("showFirstSubmenuMode") === "onClick") {
            this._hideSubmenu(this._visibleSubmenu);
          }
          return;
        }
        this._hideSubmenu(this._visibleSubmenu);
      }
      if (i) {
        if (!i.isOverlayVisible()) {
          this._showSubmenu(n);
        }
      }
    }
  };
  m._optionChanged = function (t) {
    if (S.indexOf(t.name) >= 0) {
      this._initActions();
    } else {
      switch (t.name) {
        case "orientation":
        case "submenuDirection":
          this._invalidate();
          break;
        case "showFirstSubmenuMode":
        case "hideSubmenuOnMouseLeave":
          break;
        case "showSubmenuMode":
          this._changeSubmenusOption(t.name, t.value);
          break;
        case "adaptivityEnabled":
          if (t.value) {
            this._initAdaptivity();
          } else {
            this._removeAdaptivity();
          }
          break;
        case "width":
          if (this._isAdaptivityEnabled()) {
            this._treeView.option(t.name, t.value);
            this._overlay.option(t.name, t.value);
          }
          e.prototype._optionChanged.call(this, t);
          this._dimensionChanged();
          break;
        case "animation":
          if (this._isAdaptivityEnabled()) {
            this._treeView.option("animationEnabled", !!t.value);
          }
          e.prototype._optionChanged.call(this, t);
          break;
        default:
          if (!!this._isAdaptivityEnabled() && (t.name === t.fullName || t.name === "items")) {
            this._treeView.option(t.fullName, t.value);
          }
          e.prototype._optionChanged.call(this, t);
      }
    }
  };
  m._changeSubmenusOption = function (e, t) {
    (0, u.each)(this._submenus, function (n, i) {
      i.option(e, t);
    });
  };
  m.selectItem = function (t) {
    this._hideSubmenu(this._visibleSubmenu);
    e.prototype.selectItem.call(this, t);
  };
  m.unselectItem = function (t) {
    this._hideSubmenu(this._visibleSubmenu);
    e.prototype.selectItem.call(this, t);
  };
  return r;
}(m.default);
(0, r.default)("dxMenu", k);
var D = k;
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;