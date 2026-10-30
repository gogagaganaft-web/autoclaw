exports.default = undefined;
var i = require("./58664.js");
var o = D(require("./68374.js"));
var a = D(require("./55994.js"));
var r = D(require("./20530.js"));
var s = D(require("./99393.js"));
var l = D(require("./63008.js"));
var u = require("./72672.js");
var d = require("./39611.js");
var c = require("./13306.js");
var h = require("./35922.js");
var f = D(require("./93786.js"));
var p = require("./95479.js");
var g = D(require("./25411.js"));
var m = require("./98897.js");
var _ = require("./75811.js");
var v = D(require("./11699.js"));
var y = D(require("./41183.js"));
var b = D(require("./69010.js"));
var x = require("./44899.js");
var w = require("./93280.js");
var C = require("./62754.js");
var S = require("./70602.js");
var k = require("./92721.js");
function D(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var I = b.default.inherit({
  _activeStateUnit: ".dx-tab",
  _getDefaultOptions: function () {
    return (0, c.extend)(this.callBase(), {
      hoverStateEnabled: true,
      showNavButtons: true,
      scrollByContent: true,
      scrollingEnabled: true,
      selectionMode: "single",
      activeStateEnabled: true,
      selectionRequired: false,
      selectOnFocus: true,
      loopItemFocus: false,
      useInkRipple: false,
      badgeExpr: function (e) {
        if (e) {
          return e.badge;
        } else {
          return undefined;
        }
      },
      _itemAttributes: {
        role: "tab"
      }
    });
  },
  _defaultOptionsRules: function () {
    var e = (0, _.current)();
    return this.callBase().concat([{
      device: function () {
        return r.default.real().deviceType !== "desktop";
      },
      options: {
        showNavButtons: false
      }
    }, {
      device: {
        deviceType: "desktop"
      },
      options: {
        scrollByContent: false
      }
    }, {
      device: function () {
        return r.default.real().deviceType === "desktop" && !r.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return (0, _.isMaterial)(e);
      },
      options: {
        useInkRipple: true,
        selectOnFocus: false
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this.setAria("role", "tablist");
    this.$element().addClass("dx-tabs");
    this._renderWrapper();
    this._renderMultiple();
    this._feedbackHideTimeout = 100;
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      item: new w.BindableTemplate(function (e, t) {
        if ((0, h.isPlainObject)(t)) {
          this._prepareDefaultItemTemplate(t, e);
        } else {
          e.text(String(t));
        }
        var n = (0, x.getImageContainer)(t.icon);
        if (n) {
          n.prependTo(e);
        }
        e.wrapInner((0, o.default)("<span>").addClass("dx-tab-text"));
      }.bind(this), ["text", "html", "icon"], this.option("integrationOptions.watchMethod"))
    });
  },
  _createItemByTemplate: function (e, t) {
    var n = this;
    var i = t.itemData;
    var o = t.container;
    var a = t.index;
    this._deferredTemplates[a] = new C.Deferred();
    return e.render({
      model: i,
      container: o,
      index: a,
      onRendered: function () {
        return n._deferredTemplates[a].resolve();
      }
    });
  },
  _itemClass: function () {
    return "dx-tab";
  },
  _selectedItemClass: function () {
    return "dx-tab-selected";
  },
  _itemDataKey: function () {
    return "dxTabData";
  },
  _initMarkup: function () {
    this._deferredTemplates = [];
    this.callBase();
    if (this.option("useInkRipple")) {
      this._renderInkRipple();
    }
    this.$element().addClass("dx-overflow-hidden");
  },
  _render: function () {
    this.callBase();
    this._deferRenderScrolling();
  },
  _deferRenderScrolling: function () {
    var e = this;
    C.when.apply(this, this._deferredTemplates).done(function () {
      return e._renderScrolling();
    });
  },
  _renderScrolling: function () {
    var e = ["dx-tabs-stretched", m.TABS_EXPANDED_CLASS, "dx-overflow-hidden"];
    this.$element().removeClass(e.join(" "));
    if (this.option("scrollingEnabled") && this._isItemsWidthExceeded()) {
      if (!this._scrollable) {
        this._renderScrollable();
        this._renderNavButtons();
      }
      var t = this.getScrollable();
      t.update();
      if (this.option("rtlEnabled")) {
        var n = (0, k.getScrollLeftMax)((0, o.default)(this.getScrollable().container()).get(0));
        t.scrollTo({
          left: n
        });
      }
      this._updateNavButtonsVisibility();
      this._scrollToItem(this.option("selectedItem"));
    }
    if (!this.option("scrollingEnabled") || !this._isItemsWidthExceeded()) {
      this._cleanScrolling();
      if (this._needStretchItems() && !this._isItemsWidthExceeded()) {
        this.$element().addClass("dx-tabs-stretched");
      }
      this.$element().removeClass("dx-tabs-nav-buttons").addClass(m.TABS_EXPANDED_CLASS);
    }
  },
  _isItemsWidthExceeded: function () {
    return this._getSummaryItemsWidth(this._getVisibleItems(), true) - 1 > (0, i.getWidth)(this.$element());
  },
  _needStretchItems: function () {
    var e = this._getVisibleItems();
    var t = (0, i.getWidth)(this.$element());
    var n = [];
    (0, p.each)(e, function (e, t) {
      n.push((0, i.getOuterWidth)(t, true));
    });
    return Math.max.apply(null, n) >= t / e.length;
  },
  _cleanNavButtons: function () {
    if (this._leftButton && this._rightButton) {
      this._leftButton.$element().remove();
      this._rightButton.$element().remove();
      this._leftButton = null;
      this._rightButton = null;
    }
  },
  _cleanScrolling: function () {
    if (this._scrollable) {
      this._$wrapper.appendTo(this.$element());
      this._scrollable.$element().remove();
      this._scrollable = null;
      this._cleanNavButtons();
    }
  },
  _renderInkRipple: function () {
    this._inkRipple = (0, u.render)();
  },
  _getPointerEvent: function () {
    return f.default.up;
  },
  _toggleActiveState: function (e, t, n) {
    this.callBase.apply(this, arguments);
    if (this._inkRipple) {
      var i = {
        element: e,
        event: n
      };
      if (t) {
        this._inkRipple.showWave(i);
      } else {
        this._inkRipple.hideWave(i);
      }
    }
  },
  _renderMultiple: function () {
    if (this.option("selectionMode") === "multiple") {
      this.option("selectOnFocus", false);
    }
  },
  _renderWrapper: function () {
    this._$wrapper = (0, o.default)("<div>").addClass("dx-tabs-wrapper");
    this.$element().append(this._$wrapper);
  },
  _itemContainer: function () {
    return this._$wrapper;
  },
  _renderScrollable: function () {
    var e = this;
    var t = this.$element().wrapInner((0, o.default)("<div>").addClass("dx-tabs-scrollable")).children();
    this._scrollable = this._createComponent(t, y.default, {
      direction: "horizontal",
      showScrollbar: "never",
      useKeyboard: false,
      useNative: false,
      scrollByContent: this.option("scrollByContent"),
      onScroll: function () {
        e._updateNavButtonsVisibility();
      }
    });
    this.$element().append(this._scrollable.$element());
  },
  _scrollToItem: function (e) {
    if (this._scrollable) {
      var t = this._editStrategy.getItemElement(e);
      this._scrollable.scrollToElement(t);
    }
  },
  _renderNavButtons: function () {
    this.$element().toggleClass("dx-tabs-nav-buttons", this.option("showNavButtons"));
    if (this.option("showNavButtons")) {
      var e = this.option("rtlEnabled");
      this._leftButton = this._createNavButton(-30, e ? "chevronnext" : "chevronprev");
      var t = this._leftButton.$element();
      t.addClass("dx-tabs-nav-button-left");
      this.$element().prepend(t);
      this._rightButton = this._createNavButton(30, e ? "chevronprev" : "chevronnext");
      var n = this._rightButton.$element();
      n.addClass("dx-tabs-nav-button-right");
      this.$element().append(n);
    }
  },
  _updateNavButtonsVisibility: function () {
    var e = this.getScrollable();
    if (this._leftButton) {
      this._leftButton.option("disabled", (0, S.isReachedLeft)(e.scrollLeft(), 1));
    }
    if (this._rightButton) {
      this._rightButton.option("disabled", (0, S.isReachedRight)((0, o.default)(e.container()).get(0), e.scrollLeft(), 1));
    }
  },
  _updateScrollPosition: function (e, t) {
    this._scrollable.update();
    this._scrollable.scrollBy(e / t);
  },
  _createNavButton: function (e, t) {
    var n = this;
    var i = n._createAction(function () {
      n._holdInterval = setInterval(function () {
        n._updateScrollPosition(e, 5);
      }, 5);
    });
    var r = (0, d.addNamespace)(v.default.name, "dxNavButton");
    var s = (0, d.addNamespace)(f.default.up, "dxNavButton");
    var u = (0, d.addNamespace)(f.default.out, "dxNavButton");
    var c = this._createComponent((0, o.default)("<div>").addClass("dx-tabs-nav-button"), l.default, {
      focusStateEnabled: false,
      icon: t,
      onClick: function () {
        n._updateScrollPosition(e, 1);
      },
      integrationOptions: {}
    });
    var h = c.$element();
    a.default.on(h, r, {
      timeout: 300
    }, function (e) {
      i({
        event: e
      });
    }.bind(this));
    a.default.on(h, s, function () {
      n._clearInterval();
    });
    a.default.on(h, u, function () {
      n._clearInterval();
    });
    return c;
  },
  _clearInterval: function () {
    if (this._holdInterval) {
      clearInterval(this._holdInterval);
    }
  },
  _updateSelection: function (e) {
    if (this._scrollable) {
      this._scrollable.scrollToElement(this.itemElements().eq(e[0]), {
        left: 1,
        right: 1
      });
    }
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._dimensionChanged();
    }
  },
  _dimensionChanged: function () {
    this._renderScrolling();
  },
  _itemSelectHandler: function (e) {
    if (this.option("selectionMode") !== "single" || !this.isItemSelected(e.currentTarget)) {
      this.callBase(e);
    }
  },
  _clean: function () {
    this._deferredTemplates = [];
    this._cleanScrolling();
    this.callBase();
  },
  _toggleFocusedNextClass: function (e, t) {
    this._itemElements().eq(e).toggleClass("dx-focused-next-tab", t);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "useInkRipple":
      case "scrollingEnabled":
      case "showNavButtons":
        this._invalidate();
        break;
      case "scrollByContent":
        if (this._scrollable) {
          this._scrollable.option(e.name, e.value);
        }
        break;
      case "width":
        this.callBase(e);
        this._dimensionChanged();
        break;
      case "selectionMode":
        this._renderMultiple();
        this.callBase(e);
        break;
      case "badgeExpr":
        this._invalidate();
        break;
      case "focusedElement":
        var t = this.option().selectedIndex;
        var n = (0, o.default)(e.value).index();
        if (n !== t) {
          this._toggleFocusedNextClass(t, n === t + 1);
        }
        this.callBase(e);
        this._scrollToItem(e.value);
        break;
      default:
        this.callBase(e);
    }
  },
  _afterItemElementInserted: function () {
    this.callBase();
    this._deferRenderScrolling();
  },
  _afterItemElementDeleted: function (e, t) {
    this.callBase(e, t);
    this._renderScrolling();
  },
  getScrollable: function () {
    return this._scrollable;
  }
});
I.ItemClass = g.default;
(0, s.default)("dxTabs", I);
var T = I;
exports.default = T;
module.exports = exports.default;
module.exports.default = exports.default;