exports.default = undefined;
var i = f(require("./68374.js"));
var o = require("./20576.js");
var a = require("./35922.js");
var r = require("./95479.js");
var s = require("./13306.js");
var l = require("./72672.js");
var u = f(require("./65810.js"));
var d = f(require("./69639.js"));
var c = f(require("./20530.js"));
var h = f(require("./54778.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = "dx-menu-item";
var _ = {
  show: 50,
  hide: 300
};
var v = `dx-menu-item-text-with-url`;
var y = function (e) {
  var t;
  var n;
  function u() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = u).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var h = u.prototype;
  h._getDefaultOptions = function () {
    return (0, s.extend)(e.prototype._getDefaultOptions.call(this), {
      items: [],
      cssClass: "",
      activeStateEnabled: true,
      showSubmenuMode: {
        name: "onHover",
        delay: {
          show: 50,
          hide: 300
        }
      },
      animation: {
        show: {
          type: "fade",
          from: 0,
          to: 1,
          duration: 100
        },
        hide: {
          type: "fade",
          from: 1,
          to: 0,
          duration: 100
        }
      },
      selectByClick: false,
      focusOnSelectedItem: false,
      keyExpr: null,
      _itemAttributes: {
        role: "menuitem"
      },
      useInkRipple: false
    });
  };
  h._itemDataKey = function () {
    return "dxMenuItemDataKey";
  };
  h._itemClass = function () {
    return m;
  };
  h._setAriaSelectionAttribute = function () {};
  h._selectedItemClass = function () {
    return "dx-menu-item-selected";
  };
  h._widgetClass = function () {
    return "dx-menu-base";
  };
  h._focusTarget = function () {
    return this._itemContainer();
  };
  h._clean = function () {
    this.option("focusedElement", null);
    e.prototype._clean.call(this);
  };
  h._supportedKeys = function () {
    var t = this;
    return (0, s.extend)(e.prototype._supportedKeys.call(this), {
      space: function () {
        var e = (0, i.default)(t.option("focusedElement"));
        if (e.length && t._isSelectionEnabled()) {
          t.selectItem(e[0]);
        }
      },
      pageUp: o.noop,
      pageDown: o.noop
    });
  };
  h._isSelectionEnabled = function () {
    return this.option("selectionMode") === "single";
  };
  h._init = function () {
    this._activeStateUnit = `.${m}`;
    e.prototype._init.call(this);
    this._renderSelectedItem();
    this._initActions();
  };
  h._getLinkContainer = function (e, t, n) {
    var o = n.linkAttr;
    var r = n.url;
    if (e != null) {
      e.addClass("dx-icon-with-url");
    }
    if (t != null) {
      t.addClass(v);
    }
    var s = (0, a.isObject)(o) ? o : {};
    return (0, i.default)("<a>").addClass("dx-item-url").attr(p({}, s, {
      href: r
    })).append(e).append(t);
  };
  h._addContent = function (e, t) {
    var n = t.html;
    var i = t.url;
    var o = this._getIconContainer(t);
    var a = this._getTextContainer(t);
    e.html(n);
    if (i) {
      var r = this._getLinkContainer(o, a, t);
      e.append(r);
    } else {
      e.append(o).append(a);
    }
    e.append(this._getPopoutContainer(t));
    this._addContentClasses(t, e.parent());
  };
  h._getTextContainer = function (e) {
    var t = e.text;
    var n = (0, i.default)("<span>").addClass("dx-menu-item-text");
    var o = (0, a.isPlainObject)(e) ? t : String(e);
    return t && n.text(o);
  };
  h._getItemExtraPropNames = function () {
    return ["url", "linkAttr"];
  };
  h._getPopoutContainer = function (e) {
    var t;
    var n = e.items;
    if (n && n.length) {
      var o = (0, i.default)("<div>").addClass("dx-menu-item-popout");
      t = (0, i.default)("<span>").addClass("dx-menu-item-popout-container").append(o);
    }
    return t;
  };
  h._getDataAdapterOptions = function () {
    return {
      rootValue: 0,
      multipleSelection: false,
      recursiveSelection: false,
      recursiveExpansion: false,
      searchValue: ""
    };
  };
  h._selectByItem = function (e) {
    if (e) {
      var t = this._dataAdapter.getNodeByItem(e);
      this._dataAdapter.toggleSelection(t.internalFields.key, true);
    }
  };
  h._renderSelectedItem = function () {
    var e = this._dataAdapter.getSelectedNodesKeys();
    var t = e.length && e[0];
    var n = this.option("selectedItem");
    if (t) {
      var i = this._dataAdapter.getNodeByKey(t);
      if (i.selectable !== false) {
        if (n) {
          if (n !== i.internalFields.item) {
            this._dataAdapter.toggleSelection(t, false);
            this._selectByItem(n);
          }
        } else {
          this.option("selectedItem", i.internalFields.item);
        }
      }
    } else {
      this._selectByItem(n);
    }
  };
  h._initActions = function () {};
  h._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    if (this.option("useInkRipple")) {
      this._renderInkRipple();
    }
  };
  h._renderInkRipple = function () {
    this._inkRipple = (0, l.render)();
  };
  h._toggleActiveState = function (t, n, i) {
    e.prototype._toggleActiveState.apply(this, arguments);
    if (this._inkRipple) {
      var o = {
        element: t,
        event: i
      };
      if (n) {
        this._inkRipple.showWave(o);
      } else {
        this._inkRipple.hideWave(o);
      }
    }
  };
  h._getShowSubmenuMode = function () {
    var e = this.option("showSubmenuMode");
    e = (0, a.isObject)(e) ? e.name : e;
    if (this._isDesktopDevice()) {
      return e;
    } else {
      return "onClick";
    }
  };
  h._initSelectedItems = function () {};
  h._isDesktopDevice = function () {
    return c.default.real().deviceType === "desktop";
  };
  h._initEditStrategy = function () {
    var e = d.default;
    this._editStrategy = new e(this);
  };
  h._addCustomCssClass = function (e) {
    e.addClass(this.option("cssClass"));
  };
  h._itemWrapperSelector = function () {
    return `.dx-menu-item-wrapper`;
  };
  h._hoverStartHandler = function (e) {
    var t = this._getItemElementByEventArgs(e);
    if (t && !this._isItemDisabled(t)) {
      e.stopPropagation();
      if (this._getShowSubmenuMode() === "onHover") {
        clearTimeout(this._showSubmenusTimeout);
        this._showSubmenusTimeout = setTimeout(this._showSubmenu.bind(this, t), this._getSubmenuDelay("show"));
      }
    }
  };
  h._getAvailableItems = function (t) {
    return e.prototype._getAvailableItems.call(this, t).filter(function () {
      return (0, i.default)(this).css("visibility") !== "hidden";
    });
  };
  h._isItemDisabled = function (e) {
    return this._disabledGetter(e.data(this._itemDataKey()));
  };
  h._showSubmenu = function (e) {
    this._addExpandedClass(e);
  };
  h._addExpandedClass = function (e) {
    (0, i.default)(e).addClass("dx-menu-item-expanded");
  };
  h._getSubmenuDelay = function (e) {
    var t = this.option("showSubmenuMode").delay;
    if ((0, a.isDefined)(t)) {
      if ((0, a.isObject)(t)) {
        return t[e];
      } else {
        return t;
      }
    } else {
      return _[e];
    }
  };
  h._getItemElementByEventArgs = function (e) {
    var t = (0, i.default)(e.target);
    if (t.hasClass(this._itemClass()) || t.get(0) === e.currentTarget) {
      return t;
    }
    while (!t.hasClass(this._itemClass())) {
      if ((t = t.parent()).hasClass("dx-submenu")) {
        return null;
      }
    }
    return t;
  };
  h._hoverEndHandler = function () {
    clearTimeout(this._showSubmenusTimeout);
  };
  h._hasSubmenu = function (e) {
    return e && e.internalFields.childrenKeys.length;
  };
  h._renderContentImpl = function () {
    this._renderItems(this._dataAdapter.getRootNodes());
  };
  h._renderItems = function (e, t) {
    var n = this;
    if (e.length) {
      this.hasIcons = false;
      var i = this._renderContainer(this.$element(), t);
      var o = -1;
      var a = -1;
      (0, r.each)(e, function (e, t) {
        var r = t.visible !== false;
        if (r && o < 0) {
          o = e;
        }
        if (o < e && (t.beginGroup || e === a)) {
          a = r ? e : e + 1;
        }
        if (e === a && o < e) {
          n._renderSeparator(i);
        }
        n._renderItem(e, t, i);
      });
      if (!this.hasIcons) {
        i.addClass("dx-menu-no-icons");
      }
    }
  };
  h._renderContainer = function (e) {
    var t = (0, i.default)("<ul>");
    this.setAria("role", "none", t);
    return t.appendTo(e).addClass("dx-menu-items-container");
  };
  h._createDOMElement = function (e) {
    var t = (0, i.default)("<li>");
    this.setAria("role", "none", t);
    return t.appendTo(e).addClass("dx-menu-item-wrapper");
  };
  h._renderItem = function (t, n, i, o) {
    var a = this.option("items");
    var r = o || this._createDOMElement(i);
    if (a[t + 1] && a[t + 1].beginGroup) {
      r.addClass("dx-menu-last-group-item");
    }
    var s = e.prototype._renderItem.call(this, t, n.internalFields.item, r);
    if (n.internalFields.item === this.option("selectedItem")) {
      s.addClass("dx-menu-item-selected");
    }
    s.attr("tabIndex", -1);
    if (this._hasSubmenu(n)) {
      this.setAria("haspopup", "true", s);
    }
  };
  h._renderItemFrame = function (t, n, i) {
    var o = i.children(`.${m}`);
    if (o.length) {
      return o;
    } else {
      return e.prototype._renderItemFrame.apply(this, arguments);
    }
  };
  h._refreshItem = function (e, t) {
    var n = this._dataAdapter.getNodeByItem(t);
    var i = e.data(this._itemIndexKey());
    var o = e.closest("ul");
    var a = e.closest("li");
    this._renderItem(i, n, o, a);
  };
  h._addContentClasses = function (e, t) {
    var n = !!e.text && !!e.text.length;
    var i = !!e.icon;
    var o = !!e.items && !!e.items.length;
    t.toggleClass("dx-menu-item-has-text", n);
    t.toggleClass("dx-menu-item-has-icon", i);
    this.hasIcons ||= i;
    t.toggleClass("dx-menu-item-has-submenu", o);
  };
  h._getItemContent = function (t) {
    var n = e.prototype._getItemContent.call(this, t);
    if (!n.length) {
      n = t.children(`.dx-menu-item-content`);
    }
    return n;
  };
  h._postprocessRenderItem = function (e) {
    var t = (0, i.default)(e.itemElement);
    var n = this._dataAdapter.getSelectedNodesKeys();
    if (n.length && this._selectedGetter(e.itemData) && this._isItemSelectable(e.itemData)) {
      if (this._dataAdapter.getNodeByItem(e.itemData).internalFields.key === n[0]) {
        t.addClass(this._selectedItemClass());
        this._setAriaSelectionAttribute(t, "true");
      } else {
        this._setAriaSelectionAttribute(t, "false");
      }
    } else {
      this._setAriaSelectionAttribute(t, "false");
    }
  };
  h._isItemSelectable = function (e) {
    return e.selectable !== false;
  };
  h._renderSeparator = function (e) {
    (0, i.default)("<li>").appendTo(e).addClass("dx-menu-separator");
  };
  h._itemClickHandler = function (e) {
    if (!e._skipHandling) {
      var t = this._createAction(this._updateSubmenuVisibilityOnClick.bind(this));
      this._itemDXEventHandler(e, "onItemClick", {}, {
        beforeExecute: this._itemClick,
        afterExecute: t.bind(this)
      });
      e._skipHandling = true;
    }
  };
  h._itemClick = function (e) {
    var t = e.args[0];
    var n = t.event.target.getElementsByClassName("dx-item-url")[0];
    if (t.itemData.url && n) {
      n.click();
    }
  };
  h._updateSubmenuVisibilityOnClick = function (e) {
    this._updateSelectedItemOnClick(e);
    if (this._getShowSubmenuMode() === "onClick") {
      this._addExpandedClass(e.args[0].itemElement);
    }
  };
  h._updateSelectedItemOnClick = function (e) {
    var t = e.args ? e.args[0] : e;
    if (this._isItemSelectAllowed(t.itemData)) {
      var n = this._dataAdapter.getSelectedNodesKeys();
      var i = n.length && this._dataAdapter.getNodeByKey(n[0]);
      if (i) {
        this._toggleItemSelection(i, false);
      }
      if (i && i.internalFields.item === t.itemData) {
        this._fireSelectionChangeEvent(null, this.option("selectedItem"));
        this._setOptionWithoutOptionChange("selectedItem", null);
      } else {
        this.selectItem(t.itemData);
      }
    }
  };
  h._isItemSelectAllowed = function (e) {
    var t = this._isSelectionEnabled() && this.option("selectByClick");
    return !this._isContainerEmpty() && t && this._isItemSelectable(e) && !this._itemsGetter(e);
  };
  h._isContainerEmpty = function () {
    return this._itemContainer().is(":empty");
  };
  h._syncSelectionOptions = function () {
    return (0, o.asyncNoop)();
  };
  h._optionChanged = function (t) {
    switch (t.name) {
      case "showSubmenuMode":
        break;
      case "selectedItem":
        var n = this._dataAdapter.getNodeByItem(t.value);
        var i = this._dataAdapter.getSelectedNodesKeys()[0];
        if (n && n.internalFields.key !== i) {
          if (n.selectable === false) {
            break;
          }
          if (i) {
            this._toggleItemSelection(this._dataAdapter.getNodeByKey(i), false);
          }
          this._toggleItemSelection(n, true);
          this._updateSelectedItems();
        }
        break;
      case "cssClass":
      case "position":
      case "selectByClick":
      case "animation":
      case "useInkRipple":
        this._invalidate();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  h._toggleItemSelection = function (e, t) {
    var n = this._getElementByItem(e.internalFields.item);
    if (n) {
      (0, i.default)(n).toggleClass("dx-menu-item-selected");
    }
    this._dataAdapter.toggleSelection(e.internalFields.key, t);
  };
  h._getElementByItem = function (e) {
    var t;
    var n = this;
    (0, r.each)(this._itemElements(), function (o, a) {
      return (0, i.default)(a).data(n._itemDataKey()) !== e || (t = a, false);
    });
    return t;
  };
  h._updateSelectedItems = function (e, t) {
    if (e || t) {
      this._fireSelectionChangeEvent(t, e);
    }
  };
  h._fireSelectionChangeEvent = function (e, t) {
    this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    })({
      addedItems: [e],
      removedItems: [t]
    });
  };
  h.selectItem = function (e) {
    var t = e.nodeType ? this._getItemData(e) : e;
    var n = this._dataAdapter.getSelectedNodesKeys()[0];
    var i = this.option("selectedItem");
    var o = this._dataAdapter.getNodeByItem(t);
    if (o.internalFields.key !== n) {
      if (n) {
        this._toggleItemSelection(this._dataAdapter.getNodeByKey(n), false);
      }
      this._toggleItemSelection(o, true);
      this._updateSelectedItems(i, t);
      this._setOptionWithoutOptionChange("selectedItem", t);
    }
  };
  h.unselectItem = function (e) {
    var t = e.nodeType ? this._getItemData(e) : e;
    var n = this._dataAdapter.getNodeByItem(t);
    var i = this.option("selectedItem");
    if (n.internalFields.selected) {
      this._toggleItemSelection(n, false);
      this._updateSelectedItems(i, null);
      this._setOptionWithoutOptionChange("selectedItem", null);
    }
  };
  return u;
}(u.default);
y.ItemClass = h.default;
var b = y;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;