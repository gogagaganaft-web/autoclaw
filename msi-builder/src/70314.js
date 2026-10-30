exports.default = undefined;
var i = u(require("./99393.js"));
var o = require("./13306.js");
var a = u(require("./997.js"));
var r = require("./61939.js");
var s = require("./69762.js");
var l = require("./12086.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var a = i.prototype;
  a._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      menuItemTemplate: "menuItem",
      menuContainer: undefined,
      overflowMenuVisible: false,
      multiline: false
    });
  };
  a._isMultiline = function () {
    return this.option("multiline");
  };
  a._dimensionChanged = function (t) {
    if (t !== "height") {
      e.prototype._dimensionChanged.call(this);
      this._layoutStrategy._dimensionChanged();
    }
  };
  a._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._updateFocusableItemsTabIndex();
    this._layoutStrategy._initMarkup();
  };
  a._renderToolbar = function () {
    e.prototype._renderToolbar.call(this);
    this._renderLayoutStrategy();
  };
  a._itemContainer = function () {
    if (this._isMultiline()) {
      return this._$toolbarItemsContainer;
    } else {
      return e.prototype._itemContainer.call(this);
    }
  };
  a._renderLayoutStrategy = function () {
    this.$element().toggleClass("dx-toolbar-multiline", this._isMultiline());
    this._layoutStrategy = this._isMultiline() ? new s.MultiLineStrategy(this) : new l.SingleLineStrategy(this);
  };
  a._renderSections = function () {
    if (!this._isMultiline()) {
      return e.prototype._renderSections.call(this);
    }
  };
  a._postProcessRenderItems = function () {
    this._layoutStrategy._hideOverflowItems();
    this._layoutStrategy._updateMenuVisibility();
    e.prototype._postProcessRenderItems.call(this);
    this._layoutStrategy._renderMenuItems();
  };
  a._renderItem = function (t, n, i, o) {
    var a = e.prototype._renderItem.call(this, t, n, i, o);
    this._layoutStrategy._renderItem(n, a);
    var r = n.widget;
    var s = n.showText;
    if (r === "dxButton" && s === "inMenu") {
      a.toggleClass("dx-toolbar-text-auto-hide");
    }
    return a;
  };
  a._getItemsWidth = function () {
    return this._layoutStrategy._getItemsWidth();
  };
  a._getMenuItems = function () {
    return this._layoutStrategy._getMenuItems();
  };
  a._getToolbarItems = function () {
    return this._layoutStrategy._getToolbarItems();
  };
  a._arrangeItems = function () {
    if (!this.$element().is(":hidden")) {
      var t = this._layoutStrategy._arrangeItems();
      if (!this._isMultiline()) {
        e.prototype._arrangeItems.call(this, t);
      }
    }
  };
  a._itemOptionChanged = function (t, n, i) {
    this._layoutStrategy._itemOptionChanged(t, n, i);
    if (!this._isMenuItem(t)) {
      e.prototype._itemOptionChanged.call(this, t, n, i);
    }
    if (n === "disabled" || n === "options.disabled") {
      (0, r.toggleItemFocusableElementTabIndex)(this, t);
    }
    if (n === "location") {
      this.repaint();
    }
  };
  a._updateFocusableItemsTabIndex = function () {
    var e = this;
    this._getToolbarItems().forEach(function (t) {
      return (0, r.toggleItemFocusableElementTabIndex)(e, t);
    });
  };
  a._isMenuItem = function (e) {
    return e.location === "menu" || e.locateInMenu === "always";
  };
  a._isToolbarItem = function (e) {
    return e.location === undefined || e.locateInMenu === "never";
  };
  a._optionChanged = function (t) {
    var n = t.name;
    var i = t.value;
    this._layoutStrategy._optionChanged(n, i);
    switch (n) {
      case "menuContainer":
      case "menuItemTemplate":
      case "overflowMenuVisible":
        break;
      case "multiline":
        this._invalidate();
        break;
      case "disabled":
        e.prototype._optionChanged.apply(this, arguments);
        this._updateFocusableItemsTabIndex();
        break;
      default:
        e.prototype._optionChanged.apply(this, arguments);
    }
  };
  a.updateDimensions = function () {
    this._dimensionChanged();
  };
  return i;
}(a.default);
(0, i.default)("dxToolbar", c);
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;