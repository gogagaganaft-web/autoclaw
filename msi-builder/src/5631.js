exports.default = undefined;
var i = S(require("./68374.js"));
var o = S(require("./73349.js"));
var a = S(require("./55994.js"));
var r = S(require("./73176.js"));
var s = S(require("./99393.js"));
var l = require("./20576.js");
var u = require("./35922.js");
var d = require("./3532.js");
var c = require("./6415.js");
var h = require("./95479.js");
var f = require("./13306.js");
var p = require("./58201.js");
var g = S(require("./87209.js"));
var m = S(require("./49387.js"));
var _ = S(require("./20530.js"));
var v = require("./39611.js");
var y = S(require("./89799.js"));
var b = S(require("./46377.js"));
var x = require("./62754.js");
var w = require("./49166.js");
var C = S(require("./11699.js"));
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function k(e, t) {
  return (k = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var D = ["onShowing", "onShown", "onSubmenuCreated", "onHiding", "onHidden", "onPositioning", "onLeftFirstItem", "onLeftLastItem", "onCloseRootSubmenu", "onExpandLastSubmenu"];
var I = ["up", "down", "first", "last"];
var T = (0, p.getWindow)();
var E = function (e) {
  var t;
  var n;
  function s() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  k(t, n);
  var b = s.prototype;
  b.getShowEvent = function (e) {
    var t = null;
    if ((0, u.isObject)(e)) {
      if (e.name !== null) {
        t = e.name || "dxcontextmenu";
      }
    } else {
      t = e;
    }
    return t;
  };
  b.getShowDelay = function (e) {
    return (0, u.isObject)(e) && e.delay;
  };
  b._getDefaultOptions = function () {
    return (0, f.extend)(e.prototype._getDefaultOptions.call(this), {
      showEvent: "dxcontextmenu",
      hideOnOutsideClick: true,
      position: {
        at: "top left",
        my: "top left"
      },
      onShowing: null,
      onShown: null,
      onSubmenuCreated: null,
      onHiding: null,
      onHidden: null,
      onPositioning: null,
      submenuDirection: "auto",
      visible: false,
      target: undefined,
      onLeftFirstItem: null,
      onLeftLastItem: null,
      onCloseRootSubmenu: null,
      onExpandLastSubmenu: null
    });
  };
  b._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return !(0, p.hasWindow)();
      },
      options: {
        animation: null
      }
    }]);
  };
  b._setDeprecatedOptions = function () {
    e.prototype._setDeprecatedOptions.call(this);
    (0, f.extend)(this._deprecatedOptions, {
      closeOnOutsideClick: {
        since: "22.2",
        alias: "hideOnOutsideClick"
      }
    });
  };
  b._initActions = function () {
    var e = this;
    this._actions = {};
    (0, h.each)(D, function (t, n) {
      e._actions[n] = e._createActionByOption(n) || l.noop;
    });
  };
  b._setOptionsByReference = function () {
    e.prototype._setOptionsByReference.call(this);
    (0, f.extend)(this._optionsByReference, {
      animation: true,
      selectedItem: true
    });
  };
  b._focusInHandler = function () {};
  b._itemContainer = function () {
    if (this._overlay) {
      return this._overlay.$content();
    } else {
      return (0, i.default)();
    }
  };
  b._eventBindingTarget = function () {
    return this._itemContainer();
  };
  b.itemsContainer = function () {
    if (this._overlay) {
      return this._overlay.$content();
    } else {
      return undefined;
    }
  };
  b._supportedKeys = function () {
    var t = this;
    return (0, f.extend)(e.prototype._supportedKeys.call(this), {
      space: function () {
        var e = (0, i.default)(t.option("focusedElement"));
        t.hide();
        if (e.length && t._isSelectionEnabled()) {
          t.selectItem(e[0]);
        }
      },
      escape: this.hide
    });
  };
  b._getActiveItem = function () {
    var t = this._getAvailableItems();
    var n = t.filter(`.dx-state-focused`);
    var i = t.filter(`.dx-state-hover`);
    if (i.closest(`.dx-menu-items-container`).find(`.dx-menu-item`).index(n) >= 0) {
      return n;
    } else if (i.length) {
      return i;
    } else {
      return e.prototype._getActiveItem.call(this);
    }
  };
  b._moveFocus = function (t) {
    var n;
    var o = this._getItemsByLocation(t);
    var a = this._getActiveItem(true);
    var r = this.itemsContainer().find(`.dx-state-hover`);
    var s = !!(0, i.default)(this.option("focusedElement")).length || !!r.length;
    switch (t) {
      case "up":
        n = s ? this._prevItem(o) : a;
        this._setFocusedElement(n);
        if (a.is(o.first())) {
          this._actions.onLeftFirstItem(a);
        }
        break;
      case "down":
        n = s ? this._nextItem(o) : a;
        this._setFocusedElement(n);
        if (a.is(o.last())) {
          this._actions.onLeftLastItem(a);
        }
        break;
      case "right":
        n = this.option("rtlEnabled") ? this._hideSubmenuHandler() : this._expandSubmenuHandler(o, t);
        this._setFocusedElement(n);
        break;
      case "left":
        n = this.option("rtlEnabled") ? this._expandSubmenuHandler(o, t) : this._hideSubmenuHandler();
        this._setFocusedElement(n);
        break;
      case "first":
        n = o.first();
        this._setFocusedElement(n);
        break;
      case "last":
        n = o.last();
        this._setFocusedElement(n);
        break;
      default:
        return e.prototype._moveFocus.call(this, t);
    }
  };
  b._setFocusedElement = function (e) {
    if (e && e.length !== 0) {
      this.option("focusedElement", (0, c.getPublicElement)(e));
    }
  };
  b._getItemsByLocation = function (e) {
    var t;
    var n = this._getActiveItem(true);
    if (I.includes(e)) {
      t = n.closest(`.dx-menu-items-container`).children().children();
    }
    return t = this._getAvailableItems(t);
  };
  b._getAriaTarget = function () {
    return this.$element();
  };
  b._refreshActiveDescendant = function () {
    if ((0, u.isDefined)(this._overlay)) {
      var t = this._overlay.$content();
      e.prototype._refreshActiveDescendant.call(this, t);
    }
  };
  b._hideSubmenuHandler = function () {
    var e = this._getActiveItem(true);
    var t = e.parents(`.dx-menu-item-expanded`).first();
    if (t.length) {
      this._hideSubmenusOnSameLevel(t);
      this._hideSubmenu(e.closest(`.dx-submenu`));
      return t;
    } else {
      this._actions.onCloseRootSubmenu(e);
      return e;
    }
  };
  b._expandSubmenuHandler = function (e, t) {
    var n = this._getActiveItem(true);
    var i = this._getItemData(n);
    var o = this._dataAdapter.getNodeByItem(i);
    var a = this._hasSubmenu(o);
    var r = n.children(`.dx-submenu`);
    if (a && !n.hasClass("dx-state-disabled")) {
      if (!r.length || r.css("visibility") === "hidden") {
        this._showSubmenu(n);
      }
      return this._nextItem(this._getItemsByLocation(t));
    }
    this._actions.onExpandLastSubmenu(n);
  };
  b._clean = function () {
    if (this._overlay) {
      this._overlay.$element().remove();
      this._overlay = null;
    }
    this._detachShowContextMenuEvents(this._getTarget());
    e.prototype._clean.call(this);
  };
  b._initMarkup = function () {
    this.$element().addClass("dx-has-context-menu");
    e.prototype._initMarkup.call(this);
  };
  b._render = function () {
    e.prototype._render.call(this);
    this._renderVisibility(this.option("visible"));
    this._addWidgetClass();
  };
  b._renderContentImpl = function () {
    this._detachShowContextMenuEvents(this._getTarget());
    this._attachShowContextMenuEvents();
  };
  b._attachKeyboardEvents = function () {
    if (!this._keyboardListenerId && this._focusTarget().length) {
      e.prototype._attachKeyboardEvents.call(this);
    }
  };
  b._renderContextMenuOverlay = function () {
    if (!this._overlay) {
      var e = this._getOverlayOptions();
      this._overlay = this._createComponent((0, i.default)("<div>").appendTo(this._$element), y.default, e);
      var t = this._overlay.$content();
      t.addClass("dx-context-menu");
      this._addCustomCssClass(t);
      this._addPlatformDependentClass(t);
      this._attachContextMenuEvent();
    }
  };
  b.preventShowingDefaultContextMenuAboveOverlay = function () {
    var e = this._itemContainer();
    var t = (0, v.addNamespace)(w.name, this.NAME);
    a.default.off(e, t, `.dx-submenu`);
    a.default.on(e, t, `.dx-submenu`, function (n) {
      n.stopPropagation();
      n.preventDefault();
      a.default.off(e, t, `.dx-submenu`);
    }.bind(this));
  };
  b._itemContextMenuHandler = function (t) {
    e.prototype._itemContextMenuHandler.call(this, t);
    t.stopPropagation();
  };
  b._addPlatformDependentClass = function (e) {
    if (_.default.current().phone) {
      e.addClass("dx-menu-phone-overlay");
    }
  };
  b._detachShowContextMenuEvents = function (e) {
    var t = this.getShowEvent(this.option("showEvent"));
    if (t) {
      var n = (0, v.addNamespace)(t, this.NAME);
      if (this._showContextMenuEventHandler) {
        a.default.off(o.default.getDocument(), n, e, this._showContextMenuEventHandler);
      } else {
        a.default.off((0, i.default)(e), n);
      }
    }
  };
  b._attachShowContextMenuEvents = function () {
    var e = this;
    var t = this._getTarget();
    var n = this.getShowEvent(this.option("showEvent"));
    if (n) {
      var r = (0, v.addNamespace)(n, this.NAME);
      var s = this._createAction(function (t) {
        var n = e.getShowDelay(e.option("showEvent"));
        if (n) {
          setTimeout(function () {
            return e._show(t.event);
          }, n);
        } else {
          e._show(t.event);
        }
      }, {
        validatingTargetName: "target"
      });
      function l(e) {
        return s({
          event: e,
          target: (0, i.default)(e.currentTarget)
        });
      }
      s = this._createAction(s);
      if ((0, u.isRenderer)(t) || t.nodeType || (0, u.isWindow)(t)) {
        this._showContextMenuEventHandler = undefined;
        a.default.on(t, r, l);
      } else {
        this._showContextMenuEventHandler = l;
        a.default.on(o.default.getDocument(), r, t, this._showContextMenuEventHandler);
      }
    }
  };
  b._hoverEndHandler = function (t) {
    e.prototype._hoverEndHandler.call(this, t);
    t.stopPropagation();
  };
  b._renderDimensions = function () {};
  b._renderContainer = function (t, n) {
    var o = n || this._itemContainer();
    (t = (0, i.default)("<div>")).appendTo(o).addClass("dx-submenu").css("visibility", n ? "hidden" : "visible");
    if (!t.parent().hasClass("dx-overlay-content")) {
      this._addCustomCssClass(t);
    }
    var a = e.prototype._renderContainer.call(this, t);
    if (n) {
      return a;
    } else if (this.option("width")) {
      return a.css("minWidth", this.option("width"));
    } else if (this.option("height")) {
      return a.css("minHeight", this.option("height"));
    } else {
      return a;
    }
  };
  b._renderSubmenuItems = function (e, t) {
    this._renderItems(this._getChildNodes(e), t);
    this._actions.onSubmenuCreated({
      itemElement: (0, c.getPublicElement)(t),
      itemData: e.internalFields.item,
      submenuElement: (0, c.getPublicElement)(t.children(`.dx-submenu`))
    });
  };
  b._getOverlayOptions = function () {
    var e = this;
    var t = this.option("position");
    return {
      focusStateEnabled: this.option("focusStateEnabled"),
      animation: this.option("animation"),
      innerOverlay: true,
      hideOnOutsideClick: function (t) {
        return e._hideOnOutsideClickHandler(t);
      },
      propagateOutsideClick: true,
      hideOnParentScroll: true,
      deferRendering: false,
      position: {
        at: t.at,
        my: t.my,
        of: this._getTarget(),
        collision: "flipfit"
      },
      shading: false,
      showTitle: false,
      height: "auto",
      width: "auto",
      onShown: this._overlayShownActionHandler.bind(this),
      onHiding: this._overlayHidingActionHandler.bind(this),
      onHidden: this._overlayHiddenActionHandler.bind(this),
      visualContainer: T
    };
  };
  b._overlayShownActionHandler = function (e) {
    this._actions.onShown(e);
  };
  b._overlayHidingActionHandler = function (e) {
    this._actions.onHiding(e);
    if (!e.cancel) {
      this._hideAllShownSubmenus();
      this._setOptionWithoutOptionChange("visible", false);
    }
  };
  b._overlayHiddenActionHandler = function (e) {
    this._actions.onHidden(e);
  };
  b._shouldHideOnOutsideClick = function (e) {
    var t = this.option();
    var n = t.closeOnOutsideClick;
    var i = t.hideOnOutsideClick;
    if ((0, u.isFunction)(i)) {
      return i(e);
    } else if ((0, u.isFunction)(n)) {
      return n(e);
    } else {
      return i || n;
    }
  };
  b._hideOnOutsideClickHandler = function (e) {
    if (!this._shouldHideOnOutsideClick(e)) {
      return false;
    }
    if (o.default.isDocument(e.target)) {
      return true;
    }
    var t = this._getActiveItemsContainer(e.target);
    var n = this._getItemsContainers();
    var i = this._searchActiveItem(e.target);
    var a = this.$element().parents(`.dx-menu-item`);
    var r = i[0] === a[0] && i.length && a.length;
    return (!this._isIncludeOverlay(t, n) || !i.length) && !r || (this._getShowSubmenuMode() === "onClick" && this._hideAllShownChildSubmenus(i), false);
  };
  b._getActiveItemsContainer = function (e) {
    return (0, i.default)(e).closest(`.dx-menu-items-container`);
  };
  b._getItemsContainers = function () {
    return this._overlay.$content().find(`.dx-menu-items-container`);
  };
  b._searchActiveItem = function (e) {
    return (0, i.default)(e).closest(`.dx-menu-item`).eq(0);
  };
  b._isIncludeOverlay = function (e, t) {
    var n = false;
    (0, h.each)(t, function (t, i) {
      if (e.is(i) && !n) {
        n = true;
      }
    });
    return n;
  };
  b._hideAllShownChildSubmenus = function (e) {
    var t = this;
    var n = e.find(`.dx-submenu`);
    var i = (0, f.extend)([], this._shownSubmenus);
    if (n.length > 0) {
      (0, h.each)(i, function (n, i) {
        var o = t._searchActiveItem(i.context).parent();
        if (o.parent().is(e.parent().parent()) && !o.is(e.parent())) {
          t._hideSubmenu(i);
        }
      });
    }
  };
  b._showSubmenu = function (t) {
    var n = this._dataAdapter.getNodeByItem(this._getItemData(t));
    this._hideSubmenusOnSameLevel(t);
    if (this._hasSubmenu(n)) {
      var i = t.children(`.dx-submenu`);
      var o = i.length;
      e.prototype._showSubmenu.call(this, t);
      if (!o) {
        this._renderSubmenuItems(n, t);
      }
      if (!this._isSubmenuVisible(i)) {
        this._drawSubmenu(t);
      }
    }
  };
  b._hideSubmenusOnSameLevel = function (e) {
    var t = e.parent(`.dx-menu-item-wrapper`).siblings().find(`.dx-menu-item-expanded`);
    if (t.length) {
      t.removeClass("dx-menu-item-expanded");
      this._hideSubmenu(t.find(`.dx-submenu`));
    }
  };
  b._hideSubmenuGroup = function (e) {
    if (this._isSubmenuVisible(e)) {
      this._hideSubmenuCore(e);
    }
  };
  b._isSubmenuVisible = function (e) {
    return e.css("visibility") === "visible";
  };
  b._drawSubmenu = function (e) {
    var t = this.option("animation") ? this.option("animation").show : {};
    var n = e.children(`.dx-submenu`);
    var i = this._getSubmenuPosition(e);
    if (this._overlay && this._overlay.option("visible")) {
      if (!(0, u.isDefined)(this._shownSubmenus)) {
        this._shownSubmenus = [];
      }
      if (!this._shownSubmenus.includes(n)) {
        this._shownSubmenus.push(n);
      }
      if (t) {
        g.default.stop(n);
      }
      m.default.setup(n, i);
      if (t) {
        if ((0, u.isPlainObject)(t.to)) {
          t.to.position = i;
        }
        this._animate(n, t);
      }
      n.css("visibility", "visible");
    }
  };
  b._animate = function (e, t) {
    g.default.animate(e, t);
  };
  b._getSubmenuPosition = function (e) {
    var t = this.option("submenuDirection").toLowerCase();
    var n = {
      collision: "flip",
      of: e.parent(`.dx-menu-item-wrapper`),
      offset: {
        h: 0,
        v: -1
      }
    };
    switch (t) {
      case "left":
        n.at = "left top";
        n.my = "right top";
        break;
      case "right":
        n.at = "right top";
        n.my = "left top";
        break;
      default:
        if (this.option("rtlEnabled")) {
          n.at = "left top";
          n.my = "right top";
        } else {
          n.at = "right top";
          n.my = "left top";
        }
    }
    return n;
  };
  b._updateSubmenuVisibilityOnClick = function (e) {
    if (e.args.length) {
      var t = e.args[0].itemData;
      var n = this._dataAdapter.getNodeByItem(t);
      if (n) {
        var o = (0, i.default)(e.args[0].itemElement);
        var a = o.find(`.dx-submenu`);
        if (this._hasSubmenu(n) && !a.length) {
          this._renderSubmenuItems(n, o);
          a = o.find(`.dx-submenu`);
        }
        if (o.context !== a.context || a.css("visibility") !== "visible") {
          this._updateSelectedItemOnClick(e);
          var r = t && t.closeMenuOnClick === false;
          if (t && !t.disabled && !r) {
            if (a.length === 0) {
              var s = (0, i.default)(o.parents(`.dx-submenu`)[0]);
              this._hideSubmenu(s);
              if (!e.canceled && this._overlay && this._overlay.option("visible")) {
                this.option("visible", false);
              }
            } else {
              if (this._shownSubmenus && this._shownSubmenus.length > 0 && this._shownSubmenus[0].is(a)) {
                this._hideSubmenu(a);
              }
              this._showSubmenu(o);
            }
          }
        }
      }
    }
  };
  b._hideSubmenu = function (e) {
    var t = this;
    var n = (0, f.extend)([], this._shownSubmenus);
    (0, h.each)(n, function (n, i) {
      if (e.is(i) || (0, d.contains)(e[0], i[0])) {
        i.parent().removeClass("dx-menu-item-expanded");
        t._hideSubmenuCore(i);
      }
    });
  };
  b._hideSubmenuCore = function (e) {
    var t = this._shownSubmenus.indexOf(e);
    var n = this.option("animation") ? this.option("animation").hide : null;
    if (t >= 0) {
      this._shownSubmenus.splice(t, 1);
    }
    this._stopAnimate(e);
    if (n) {
      this._animate(e, n);
    }
    e.css("visibility", "hidden");
  };
  b._stopAnimate = function (e) {
    g.default.stop(e, true);
  };
  b._hideAllShownSubmenus = function () {
    var e = this;
    var t = (0, f.extend)([], this._shownSubmenus);
    this._overlay.$content().find(`.dx-menu-item-expanded`).removeClass("dx-menu-item-expanded");
    (0, h.each)(t, function (t, n) {
      e._hideSubmenu(n);
    });
  };
  b._visibilityChanged = function (e) {
    if (e) {
      this._renderContentImpl();
    }
  };
  b._optionChanged = function (t) {
    if (D.includes(t.name)) {
      this._initActions();
    } else {
      switch (t.name) {
        case "visible":
          this._renderVisibility(t.value);
          break;
        case "showEvent":
        case "position":
        case "submenuDirection":
          this._invalidate();
          break;
        case "target":
          if (t.previousValue) {
            this._detachShowContextMenuEvents(t.previousValue);
          }
          this._invalidate();
          break;
        case "closeOnOutsideClick":
        case "hideOnOutsideClick":
          break;
        default:
          e.prototype._optionChanged.call(this, t);
      }
    }
  };
  b._renderVisibility = function (e) {
    if (e) {
      return this._show();
    } else {
      return this._hide();
    }
  };
  b._toggleVisibility = function () {};
  b._show = function (e) {
    var t = {
      jQEvent: e
    };
    var n = new x.Deferred().reject().promise();
    this._actions.onShowing(t);
    if (t.cancel) {
      return n;
    }
    var i;
    var o = this._positionContextMenu(e);
    if (o) {
      if (!this._overlay) {
        this._renderContextMenuOverlay();
        this._overlay.$content().addClass(this._widgetClass());
        this._renderFocusState();
        this._attachHoverEvents();
        this._attachClickEvent();
        this._renderItems(this._dataAdapter.getRootNodes());
      }
      this._setOptionWithoutOptionChange("visible", true);
      this._overlay.option("position", o);
      n = this._overlay.show();
      if (e) {
        e.stopPropagation();
      }
      this._setAriaAttributes();
      if ((e == null || (i = e.originalEvent) === null || i === undefined ? undefined : i.type) === C.default.name) {
        this.preventShowingDefaultContextMenuAboveOverlay();
      }
    }
    return n;
  };
  b._setAriaAttributes = function () {
    this._overlayContentId = `dx-${new r.default()}`;
    this.setAria("owns", this._overlayContentId);
    this.setAria({
      id: this._overlayContentId,
      role: "menu"
    }, this._overlay.$content());
  };
  b._cleanAriaAttributes = function () {
    if (this._overlay) {
      this.setAria("id", null, this._overlay.$content());
    }
    this.setAria("owns", undefined);
  };
  b._getTarget = function () {
    return this.option("target") || this.option("position").of || (0, i.default)(o.default.getDocument());
  };
  b._getContextMenuPosition = function () {
    return (0, f.extend)({}, this.option("position"), {
      of: this._getTarget()
    });
  };
  b._positionContextMenu = function (e) {
    var t = this._getContextMenuPosition();
    var n = this._isInitialOptionValue("position");
    var i = this._createActionByOption("onPositioning");
    if (e && e.preventDefault && n) {
      t.of = e;
    }
    var o = {
      position: t,
      event: e
    };
    i(o);
    if (o.cancel) {
      t = null;
    } else if (o.event) {
      o.event.cancel = true;
      e.preventDefault();
    }
    return t;
  };
  b._refresh = function () {
    if ((0, p.hasWindow)()) {
      if (this._overlay) {
        var t = this._overlay.option("position");
        e.prototype._refresh.call(this);
        if (this._overlay) {
          this._overlay.option("position", t);
        }
      } else {
        e.prototype._refresh.call(this);
      }
    } else {
      e.prototype._refresh.call(this);
    }
  };
  b._hide = function () {
    var e;
    if (this._overlay) {
      e = this._overlay.hide();
      this._setOptionWithoutOptionChange("visible", false);
    }
    this._cleanAriaAttributes();
    this.option("focusedElement", null);
    return e || new x.Deferred().reject().promise();
  };
  b.toggle = function (e) {
    var t = this.option("visible");
    e = e === undefined ? !t : e;
    return this._renderVisibility(e);
  };
  b.show = function () {
    return this.toggle(true);
  };
  b.hide = function () {
    return this.toggle(false);
  };
  return s;
}(b.default);
(0, s.default)("dxContextMenu", E);
var O = E;
exports.default = O;
module.exports = exports.default;
module.exports.default = exports.default;