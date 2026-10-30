exports.default = undefined;
var i = require("./58664.js");
var o = C(require("./68374.js"));
var a = C(require("./55994.js"));
var r = C(require("./99393.js"));
var s = require("./20576.js");
var l = require("./35922.js");
var u = require("./58201.js");
var d = require("./13306.js");
var c = require("./6415.js");
var h = C(require("./87209.js"));
var f = require("./95429.js");
var p = require("./31648.js");
var g = C(require("./20530.js"));
var m = C(require("./14390.js"));
var _ = require("./39611.js");
var v = C(require("./11050.js"));
var y = C(require("./66894.js"));
var b = require("./93280.js");
var x = require("./62754.js");
var w = require("./80506.js");
function C(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var S = m.default.inherit({
  _supportedKeys: function () {
    return (0, d.extend)(this.callBase(), {
      pageUp: s.noop,
      pageDown: s.noop
    });
  },
  _getDefaultOptions: function () {
    return (0, d.extend)(this.callBase(), {
      direction: "next",
      onClick: null,
      hoverStateEnabled: true,
      activeStateEnabled: true
    });
  },
  _render: function () {
    this.callBase();
    var e = this;
    var t = this.$element();
    var n = (0, _.addNamespace)(f.name, this.NAME);
    t.addClass("dx-gallery-nav-button-" + this.option("direction"));
    a.default.off(t, n);
    a.default.on(t, n, function (t) {
      e._createActionByOption("onClick")({
        event: t
      });
    });
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "onClick":
      case "direction":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  }
});
var k = v.default.inherit({
  _activeStateUnit: ".dx-gallery-item",
  _wasAnyItemTemplateRendered: false,
  _getDefaultOptions: function () {
    return (0, d.extend)(this.callBase(), {
      activeStateEnabled: false,
      animationDuration: 400,
      animationEnabled: true,
      loop: false,
      swipeEnabled: true,
      indicatorEnabled: true,
      showIndicator: true,
      selectedIndex: 0,
      slideshowDelay: 0,
      showNavButtons: false,
      wrapAround: false,
      initialItemWidth: undefined,
      stretchImages: false,
      _itemAttributes: {
        role: "option"
      },
      loopItemFocus: false,
      selectOnFocus: true,
      selectionMode: "single",
      selectionRequired: true,
      selectByClick: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return g.default.real().deviceType === "desktop" && !g.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this.option("loopItemFocus", this.option("loop"));
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      item: new b.BindableTemplate(function (e, t) {
        var n = (0, o.default)("<img>").addClass("dx-gallery-item-image");
        if ((0, l.isPlainObject)(t)) {
          this._prepareDefaultItemTemplate(t, e);
          n.attr({
            src: t.imageSrc,
            alt: t.imageAlt
          }).appendTo(e);
        } else {
          n.attr("src", String(t)).appendTo(e);
        }
      }.bind(this), ["imageSrc", "imageAlt", "text", "html"], this.option("integrationOptions.watchMethod"))
    });
  },
  _dataSourceOptions: function () {
    return {
      paginate: false
    };
  },
  _itemContainer: function () {
    return this._$container;
  },
  _itemClass: function () {
    return "dx-gallery-item";
  },
  _itemDataKey: function () {
    return "dxGalleryItemData";
  },
  _actualItemWidth: function () {
    var e = this.option("wrapAround");
    if (this.option("stretchImages")) {
      return 1 / (e ? this._itemsPerPage() + 1 : this._itemsPerPage());
    } else if (e) {
      return this._itemPercentWidth() * this._itemsPerPage() / (this._itemsPerPage() + 1);
    } else {
      return this._itemPercentWidth();
    }
  },
  _itemPercentWidth: function () {
    var e = (0, i.getOuterWidth)(this.$element());
    var t = this.option("initialItemWidth");
    if (t && t <= e) {
      return t / e;
    } else {
      return 1;
    }
  },
  _itemsPerPage: function () {
    var e = (0, u.hasWindow)() ? Math.floor(1 / this._itemPercentWidth()) : 1;
    return Math.min(e, this._itemsCount());
  },
  _pagesCount: function () {
    return Math.ceil(this._itemsCount() / this._itemsPerPage());
  },
  _itemsCount: function () {
    return (this.option("items") || []).length;
  },
  _offsetDirection: function () {
    if (this.option("rtlEnabled")) {
      return -1;
    } else {
      return 1;
    }
  },
  _initMarkup: function () {
    this._renderWrapper();
    this._renderItemsContainer();
    this.$element().addClass("dx-gallery");
    this.$element().toggleClass("dx-gallery-loop", this.option("loop"));
    this.callBase();
    this.setAria({
      role: "listbox",
      label: "gallery"
    });
  },
  _render: function () {
    this._renderDragHandler();
    this._renderContainerPosition();
    this._renderItemSizes();
    this._renderItemPositions();
    this._renderNavButtons();
    this._renderIndicator();
    this._renderSelectedItem();
    this._renderItemVisibility();
    this._renderUserInteraction();
    this._setupSlideShow();
    this._reviseDimensions();
    this.callBase();
  },
  _dimensionChanged: function () {
    var e = this.option("selectedIndex") || 0;
    this._stopItemAnimations();
    this._clearCacheWidth();
    this._cloneDuplicateItems();
    this._renderItemSizes();
    this._renderItemPositions();
    this._renderIndicator();
    this._renderContainerPosition(this._calculateIndexOffset(e), true);
    this._renderItemVisibility();
  },
  _renderDragHandler: function () {
    var e = (0, _.addNamespace)("dragstart", this.NAME);
    a.default.off(this.$element(), e);
    a.default.on(this.$element(), e, "img", function () {
      return false;
    });
  },
  _renderWrapper: function () {
    this._$wrapper ||= (0, o.default)("<div>").addClass("dx-gallery-wrapper").appendTo(this.$element());
  },
  _renderItems: function (e) {
    if (!(0, u.hasWindow)()) {
      var t = this.option("selectedIndex");
      e = e.length > t ? e.slice(t, t + 1) : e.slice(0, 1);
    }
    this.callBase(e);
    this._loadNextPageIfNeeded();
  },
  _onItemTemplateRendered: function () {
    var e = this;
    return function () {
      if (!e._wasAnyItemTemplateRendered) {
        e._wasAnyItemTemplateRendered = true;
        (0, w.triggerResizeEvent)(e.$element());
      }
    };
  },
  _renderItemsContainer: function () {
    this._$container ||= (0, o.default)("<div>").addClass("dx-gallery-container").appendTo(this._$wrapper);
  },
  _cloneDuplicateItems: function () {
    if (this.option("loop")) {
      var e;
      var t = (this.option("items") || []).length;
      var n = t - 1;
      if (t) {
        this._getLoopedItems().remove();
        var i = Math.min(this._itemsPerPage(), t);
        var o = this._getRealItems();
        var a = this._itemContainer();
        for (e = 0; e < i; e++) {
          this._cloneItemForDuplicate(o[e], a);
        }
        for (e = 0; e < i; e++) {
          this._cloneItemForDuplicate(o[n - e], a);
        }
      }
    }
  },
  _cloneItemForDuplicate: function (e, t) {
    if (e) {
      var n = (0, o.default)(e).clone(false).addClass("dx-gallery-item-loop").css("margin", 0).appendTo(t);
      this.setAria({
        role: "presentation"
      }, n);
    }
  },
  _getRealItems: function () {
    return this.$element().find(".dx-gallery-item:not(.dx-gallery-item-loop)");
  },
  _getLoopedItems: function () {
    return this.$element().find(".dx-gallery-item-loop");
  },
  _emptyMessageContainer: function () {
    return this._$wrapper;
  },
  _renderItemSizes: function (e) {
    var t = this._itemElements();
    var n = this._actualItemWidth();
    if (e !== undefined) {
      t = t.slice(e);
    }
    t.each(function (e) {
      (0, i.setOuterWidth)((0, o.default)(t[e]), n * 100 + "%");
    });
  },
  _renderItemPositions: function () {
    var e = this._actualItemWidth();
    var t = this._itemsCount();
    var n = this._itemsPerPage();
    var i = this.$element().find(".dx-gallery-item-loop").length;
    var a = t + i - 1;
    var r = this.option("wrapAround") ? 0.5 : 0;
    var s = this._itemFreeSpace();
    var l = !!s;
    var u = this.option("rtlEnabled");
    var d = this.option("selectedIndex");
    var c = u ? "Right" : "Left";
    this._itemElements().each(function (i) {
      var u = i;
      var d = (0, o.default)(this).hasClass("dx-gallery-item-loop");
      if (i > t + n - 1) {
        u = a - u - n;
      }
      if (d || u === 0) {
        var h = e * (u + r) + s * (u + 1 - r);
        var f = d ? c.toLowerCase() : "margin" + c;
        (0, o.default)(this).css(f, h * 100 + "%");
      } else if (l) {
        (0, o.default)(this).css("margin" + c, s * 100 + "%");
      }
    });
    this._relocateItems(d, d, true);
  },
  _itemFreeSpace: function () {
    var e = this._itemsPerPage();
    if (this.option("wrapAround")) {
      e += 1;
    }
    return (1 - this._actualItemWidth() * e) / (e + 1);
  },
  _renderContainerPosition: function (e, t, n) {
    this._releaseInvisibleItems();
    e = e || 0;
    var i;
    var o = this;
    var a = this._actualItemWidth();
    var r = e;
    var s = this._offsetDirection() * r * (a + this._itemFreeSpace());
    if ((0, l.isDefined)(this._animationOverride)) {
      n = this._animationOverride;
      delete this._animationOverride;
    }
    if (n) {
      o._startSwipe();
      i = o._animate(s).done(o._endSwipe.bind(o));
    } else {
      (0, p.move)(this._$container, {
        left: s * this._elementWidth(),
        top: 0
      });
      i = new x.Deferred().resolveWith(o);
    }
    i.done(function () {
      if (this._deferredAnimate) {
        o._deferredAnimate.resolveWith(o);
      }
      if (t) {
        this._renderItemVisibility();
      }
    });
    return i.promise();
  },
  _startSwipe: function () {
    this.$element().addClass("dx-gallery-active");
  },
  _endSwipe: function () {
    this.$element().removeClass("dx-gallery-active");
  },
  _animate: function (e, t) {
    var n = this;
    var i = this._$container;
    var o = new x.Deferred();
    h.default.animate(this._$container, (0, d.extend)({
      type: "slide",
      to: {
        left: e * this._elementWidth()
      },
      duration: n.option("animationDuration"),
      complete: function () {
        if (n._needMoveContainerForward()) {
          (0, p.move)(i, {
            left: 0,
            top: 0
          });
        }
        if (n._needMoveContainerBack()) {
          (0, p.move)(i, {
            left: n._maxContainerOffset() * n._elementWidth(),
            top: 0
          });
        }
        o.resolveWith(n);
      }
    }, t || {}));
    return o;
  },
  _needMoveContainerForward: function () {
    return this._$container.position().left * this._offsetDirection() <= -this._maxItemWidth() * this._elementWidth() * this._itemsCount() + 1;
  },
  _needMoveContainerBack: function () {
    return this._$container.position().left * this._offsetDirection() >= this._actualItemWidth() * this._elementWidth() - 1;
  },
  _maxContainerOffset: function () {
    return -this._maxItemWidth() * (this._itemsCount() - this._itemsPerPage()) * this._offsetDirection();
  },
  _maxItemWidth: function () {
    return this._actualItemWidth() + this._itemFreeSpace();
  },
  _reviseDimensions: function () {
    var e = this._itemElements().first().find(".dx-item-content");
    if (e && !e.is(":hidden")) {
      if (!this.option("height")) {
        this.option("height", (0, i.getOuterHeight)(e));
      }
      if (!this.option("width")) {
        this.option("width", (0, i.getOuterWidth)(e));
      }
      this._dimensionChanged();
    }
  },
  _renderIndicator: function () {
    this._cleanIndicators();
    if (this.option("showIndicator")) {
      var e = this._$indicator = (0, o.default)("<div>").addClass("dx-gallery-indicator").appendTo(this._$wrapper);
      var t = this.option("indicatorEnabled");
      for (var n = 0; n < this._pagesCount(); n++) {
        var i = (0, o.default)("<div>").addClass("dx-gallery-indicator-item").appendTo(e);
        if (t) {
          this._attachIndicatorClickHandler(i, n);
        }
      }
      this._renderSelectedPageIndicator();
    }
  },
  _attachIndicatorClickHandler: function (e, t) {
    a.default.on(e, (0, _.addNamespace)(f.name, this.NAME), function (e) {
      this._indicatorSelectHandler(e, t);
    }.bind(this));
  },
  _detachIndicatorClickHandler: function (e) {
    a.default.off(e, (0, _.addNamespace)(f.name, this.NAME));
  },
  _toggleIndicatorInteraction: function (e) {
    var t;
    var n = ((t = this._$indicator) === null || t === undefined ? undefined : t.find(".dx-gallery-indicator-item")) || [];
    if (n.length) {
      n.each(function (t, n) {
        if (e) {
          this._attachIndicatorClickHandler((0, o.default)(n), t);
        } else {
          this._detachIndicatorClickHandler((0, o.default)(n));
        }
      }.bind(this));
    }
  },
  _cleanIndicators: function () {
    if (this._$indicator) {
      this._$indicator.remove();
    }
  },
  _renderSelectedItem: function () {
    var e = this.option("selectedIndex");
    this._itemElements().removeClass("dx-gallery-item-selected").eq(e).addClass("dx-gallery-item-selected");
  },
  _renderItemVisibility: function () {
    if (this.option("initialItemWidth") || this.option("wrapAround")) {
      this._releaseInvisibleItems();
    } else {
      var e = this.option("selectedIndex");
      this._itemElements().each(function (t, n) {
        if (e !== t) {
          (0, o.default)(n).find(".dx-item-content").addClass("dx-gallery-item-invisible");
        }
      });
    }
  },
  _releaseInvisibleItems: function () {
    this._itemElements().find(".dx-item-content").removeClass("dx-gallery-item-invisible");
  },
  _renderSelectedPageIndicator: function () {
    if (this._$indicator) {
      var e = this.option("selectedIndex");
      var t = this._pagesCount() - 1;
      var n = Math.ceil(e / this._itemsPerPage());
      n = Math.min(t, n);
      this._$indicator.find(".dx-gallery-indicator-item").removeClass("dx-gallery-indicator-item-selected").eq(n).addClass("dx-gallery-indicator-item-selected");
    }
  },
  _renderUserInteraction: function () {
    var e = this.$element();
    var t = this.option("swipeEnabled") && this._itemsCount() > 1;
    this._createComponent(e, y.default, {
      disabled: this.option("disabled") || !t,
      onStart: this._swipeStartHandler.bind(this),
      onUpdated: this._swipeUpdateHandler.bind(this),
      onEnd: this._swipeEndHandler.bind(this),
      itemSizeFunc: this._elementWidth.bind(this)
    });
  },
  _indicatorSelectHandler: function (e, t) {
    if (this.option("indicatorEnabled")) {
      var n = this._fitPaginatedIndex(t * this._itemsPerPage());
      this._needLongMove = true;
      this.option("selectedIndex", n);
      this._loadNextPageIfNeeded(n);
    }
  },
  _renderNavButtons: function () {
    var e = this;
    if (e.option("showNavButtons")) {
      e._prevNavButton = (0, o.default)("<div>").appendTo(this._$wrapper);
      e._createComponent(e._prevNavButton, S, {
        direction: "prev",
        onClick: function () {
          e._prevPage();
        }
      });
      e._nextNavButton = (0, o.default)("<div>").appendTo(this._$wrapper);
      e._createComponent(e._nextNavButton, S, {
        direction: "next",
        onClick: function () {
          e._nextPage();
        }
      });
      this._renderNavButtonsVisibility();
    } else {
      e._cleanNavButtons();
    }
  },
  _prevPage: function () {
    var e = this._itemsPerPage();
    var t = this.option("selectedIndex") - e;
    if (t === -e && e === this._itemsCount()) {
      return this._relocateItems(t, 0);
    } else {
      return this.goToItem(this._fitPaginatedIndex(t));
    }
  },
  _nextPage: function () {
    var e = this._itemsPerPage();
    var t = this.option("selectedIndex") + e;
    if (t === e && e === this._itemsCount()) {
      return this._relocateItems(t, 0);
    } else {
      return this.goToItem(this._fitPaginatedIndex(t)).done(this._loadNextPageIfNeeded);
    }
  },
  _loadNextPageIfNeeded: function (e) {
    e = e === undefined ? this.option("selectedIndex") : e;
    if (this._dataSource && this._dataSource.paginate() && this._shouldLoadNextPage(e) && !this._isDataSourceLoading() && !this._isLastPage()) {
      this._loadNextPage().done(function () {
        this._renderIndicator();
        this._cloneDuplicateItems();
        this._renderItemPositions();
        this._renderNavButtonsVisibility();
        this._renderItemSizes(e);
      }.bind(this));
    }
  },
  _shouldLoadNextPage: function (e) {
    return e + this._itemsPerPage() * 2 > this.option("items").length;
  },
  _allowDynamicItemsAppend: function () {
    return true;
  },
  _fitPaginatedIndex: function (e) {
    var t = this._itemsPerPage();
    var n = e < 0 ? t + e : this._itemsCount() - e;
    if (e > this._itemsCount() - 1) {
      e = 0;
      this._goToGhostItem = true;
    } else if (n < t && n > 0) {
      if (e > 0) {
        e -= t - n;
      } else {
        e += t - n;
      }
    }
    return e;
  },
  _cleanNavButtons: function () {
    if (this._prevNavButton) {
      this._prevNavButton.remove();
      delete this._prevNavButton;
    }
    if (this._nextNavButton) {
      this._nextNavButton.remove();
      delete this._nextNavButton;
    }
  },
  _renderNavButtonsVisibility: function () {
    if (this.option("showNavButtons") && this._prevNavButton && this._nextNavButton) {
      var e = this.option("selectedIndex");
      var t = this.option("loop");
      var n = this._itemsCount();
      this._prevNavButton.show();
      this._nextNavButton.show();
      if (n === 0) {
        this._prevNavButton.hide();
        this._nextNavButton.hide();
      }
      if (!t) {
        var i = e === n - this._itemsPerPage();
        var o = n < 2 || e === 0;
        i = this._dataSource && this._dataSource.paginate() ? i && this._isLastPage() : i || n < 2;
        if (o) {
          this._prevNavButton.hide();
        }
        if (i) {
          this._nextNavButton.hide();
        }
      }
    }
  },
  _setupSlideShow: function () {
    var e = this;
    var t = e.option("slideshowDelay");
    clearTimeout(e._slideshowTimer);
    if (t) {
      e._slideshowTimer = setTimeout(function () {
        if (e._userInteraction) {
          e._setupSlideShow();
        } else {
          e.nextItem(true).done(e._setupSlideShow);
        }
      }, t);
    }
  },
  _elementWidth: function () {
    this._cacheElementWidth ||= (0, i.getWidth)(this.$element());
    return this._cacheElementWidth;
  },
  _clearCacheWidth: function () {
    delete this._cacheElementWidth;
  },
  _swipeStartHandler: function (e) {
    this._releaseInvisibleItems();
    this._clearCacheWidth();
    this._elementWidth();
    var t = this._itemsCount();
    if (t) {
      this._stopItemAnimations();
      this._startSwipe();
      this._userInteraction = true;
      if (!this.option("loop")) {
        var n = this.option("selectedIndex");
        var i = t - n - this._itemsPerPage();
        var o = n;
        var a = this.option("rtlEnabled");
        e.event.maxLeftOffset = a ? o : i;
        e.event.maxRightOffset = a ? i : o;
      }
    } else {
      e.event.cancel = true;
    }
  },
  _stopItemAnimations: function () {
    h.default.stop(this._$container, true);
  },
  _swipeUpdateHandler: function (e) {
    var t = this.option("wrapAround") ? 1 : 0;
    var n = this._offsetDirection() * e.event.offset * (this._itemsPerPage() + t) - this.option("selectedIndex");
    if (n < 0) {
      this._loadNextPageIfNeeded(Math.ceil(Math.abs(n)));
    }
    this._renderContainerPosition(n);
  },
  _swipeEndHandler: function (e) {
    var t = e.event.targetOffset * this._offsetDirection() * this._itemsPerPage();
    var n = this.option("selectedIndex");
    var i = this._fitIndex(n - t);
    var o = this._fitPaginatedIndex(i);
    if (Math.abs(t) < this._itemsPerPage()) {
      this._relocateItems(n);
    } else if (this._itemsPerPage() !== this._itemsCount()) {
      this.option("selectedIndex", o);
    } else if (t > 0) {
      this._relocateItems(-t);
    } else {
      this._relocateItems(0);
    }
  },
  _setFocusOnSelect: function () {
    this._userInteraction = true;
    var e = this.itemElements().filter(".dx-gallery-item-selected");
    this.option("focusedElement", (0, c.getPublicElement)(e));
    this._userInteraction = false;
  },
  _flipIndex: function (e) {
    var t = this._itemsCount();
    if ((e %= t) > (t + 1) / 2) {
      e -= t;
    }
    if (e < -(t - 1) / 2) {
      e += t;
    }
    return e;
  },
  _fitIndex: function (e) {
    if (!this.option("loop")) {
      return e;
    }
    var t = this._itemsCount();
    if (e >= t || e < 0) {
      this._goToGhostItem = true;
    }
    if (e >= t) {
      e = t - e;
    }
    if ((e %= t) < 0) {
      e += t;
    }
    return e;
  },
  _clean: function () {
    this.callBase();
    this._cleanIndicators();
    this._cleanNavButtons();
  },
  _dispose: function () {
    this._wasAnyItemTemplateRendered = null;
    clearTimeout(this._slideshowTimer);
    this.callBase();
  },
  _updateSelection: function (e, t) {
    this._stopItemAnimations();
    this._renderNavButtonsVisibility();
    this._renderSelectedItem();
    this._relocateItems(e[0], t[0]);
    this._renderSelectedPageIndicator();
  },
  _relocateItems: function (e, t = e, n) {
    var i = this._calculateIndexOffset(e, t);
    this._renderContainerPosition(i, true, this.option("animationEnabled") && !n).done(function () {
      this._setFocusOnSelect();
      this._userInteraction = false;
      this._setupSlideShow();
    });
  },
  _focusInHandler: function () {
    if (!h.default.isAnimating(this._$container) && !this._userInteraction) {
      this.callBase.apply(this, arguments);
    }
  },
  _focusOutHandler: function () {
    if (!h.default.isAnimating(this._$container) && !this._userInteraction) {
      this.callBase.apply(this, arguments);
    }
  },
  _selectFocusedItem: s.noop,
  _moveFocus: function () {
    this._stopItemAnimations();
    this.callBase.apply(this, arguments);
    var e = this.itemElements().index((0, o.default)(this.option("focusedElement")));
    this.goToItem(e, this.option("animationEnabled"));
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._reviseDimensions();
    }
  },
  _calculateIndexOffset: function (e, t = e) {
    var n = t - e;
    if (this.option("loop") && !this._needLongMove && this._goToGhostItem) {
      if (this._isItemOnFirstPage(e) && this._isItemOnLastPage(t)) {
        n = -this._itemsPerPage();
      } else if (this._isItemOnLastPage(e) && this._isItemOnFirstPage(t)) {
        n = this._itemsPerPage();
      }
      this._goToGhostItem = false;
    }
    this._needLongMove = false;
    return n -= t;
  },
  _isItemOnLastPage: function (e) {
    return e >= this._itemsCount() - this._itemsPerPage();
  },
  _isItemOnFirstPage: function (e) {
    return e <= this._itemsPerPage();
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "width":
      case "initialItemWidth":
        this.callBase.apply(this, arguments);
        this._dimensionChanged();
        break;
      case "animationDuration":
        this._renderNavButtonsVisibility();
        break;
      case "animationEnabled":
        break;
      case "loop":
        this.$element().toggleClass("dx-gallery-loop", e.value);
        this.option("loopItemFocus", e.value);
        if ((0, u.hasWindow)()) {
          this._cloneDuplicateItems();
          this._renderItemPositions();
          this._renderNavButtonsVisibility();
        }
        break;
      case "showIndicator":
        this._renderIndicator();
        break;
      case "showNavButtons":
        this._renderNavButtons();
        break;
      case "slideshowDelay":
        this._setupSlideShow();
        break;
      case "wrapAround":
      case "stretchImages":
        if ((0, u.hasWindow)()) {
          this._renderItemSizes();
          this._renderItemPositions();
          this._renderItemVisibility();
        }
        break;
      case "swipeEnabled":
        this._renderUserInteraction();
        break;
      case "indicatorEnabled":
        this._toggleIndicatorInteraction(e.value);
        break;
      default:
        this.callBase(e);
    }
  },
  goToItem: function (e, t) {
    var n = this.option("selectedIndex");
    var i = this._itemsCount();
    if (t !== undefined) {
      this._animationOverride = t;
    }
    e = this._fitIndex(e);
    this._deferredAnimate = new x.Deferred();
    if (e > i - 1 || e < 0 || n === e) {
      return this._deferredAnimate.resolveWith(this).promise();
    } else {
      this.option("selectedIndex", e);
      return this._deferredAnimate.promise();
    }
  },
  prevItem: function (e) {
    return this.goToItem(this.option("selectedIndex") - 1, e);
  },
  nextItem: function (e) {
    return this.goToItem(this.option("selectedIndex") + 1, e);
  }
});
(0, r.default)("dxGallery", k);
var D = k;
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;