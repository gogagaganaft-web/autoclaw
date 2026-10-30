exports.ListBase = undefined;
exports.setScrollView = function (e) {
  R = e;
};
var i = require("./58664.js");
var o = M(require("./68374.js"));
var a = M(require("./55994.js"));
var r = require("./20576.js");
var s = require("./35922.js");
var l = require("./44899.js");
var u = require("./6415.js");
var d = require("./95479.js");
var c = require("./47617.js");
var h = require("./13306.js");
var f = M(require("./87209.js"));
var p = require("./95429.js");
var g = require("./34309.js");
var m = require("./60137.js");
var _ = M(require("./28109.js"));
var v = require("./72672.js");
var y = M(require("./20530.js"));
var b = M(require("./37945.js"));
var x = M(require("./63008.js"));
var w = require("./39611.js");
var C = require("./75811.js");
var S = require("./58201.js");
var k = M(require("./4741.js"));
var D = require("./82205.js");
var I = M(require("./69010.js"));
var T = require("./93280.js");
var E = require("./62754.js");
var O = M(require("./37178.js"));
var A = require("./42136.js");
var P = M(require("./73176.js"));
function M(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var R;
var B = ".dx-list-item";
var L = (0, c.compileGetter)("items");
var V = I.default.inherit({
  _activeStateUnit: [B, ".dx-list-select-all"].join(","),
  _supportedKeys: function () {
    var e = this;
    function t(t) {
      var o = n(t);
      if (o.is(e.option("focusedElement"))) {
        (function (t, n) {
          var o = t.position().top;
          if (n === "prev") {
            o = t.position().top - (0, i.getHeight)(e.$element()) + (0, i.getOuterHeight)(t);
          }
          e.scrollTo(o);
        })(o, t);
        o = n(t);
      }
      e.option("focusedElement", (0, u.getPublicElement)(o));
      e.scrollToItem(o);
    }
    function n(t) {
      var n = e.scrollTop();
      var a = (0, i.getHeight)(e.$element());
      var r = (0, o.default)(e.option("focusedElement"));
      var s = true;
      if (!r.length) {
        return (0, o.default)();
      }
      while (s) {
        var l = r[t]();
        if (!l.length) {
          break;
        }
        var u = l.position().top + (0, i.getOuterHeight)(l) / 2;
        if (s = u < a + n && u > n) {
          r = l;
        }
      }
      return r;
    }
    return (0, h.extend)(this.callBase(), {
      leftArrow: r.noop,
      rightArrow: r.noop,
      pageUp: function () {
        t("prev");
        return false;
      },
      pageDown: function () {
        t("next");
        return false;
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, h.extend)(this.callBase(), {
      hoverStateEnabled: true,
      pullRefreshEnabled: false,
      scrollingEnabled: true,
      selectByClick: true,
      showScrollbar: "onScroll",
      useNativeScrolling: true,
      bounceEnabled: true,
      scrollByContent: true,
      scrollByThumb: false,
      pullingDownText: _.default.format("dxList-pullingDownText"),
      pulledDownText: _.default.format("dxList-pulledDownText"),
      refreshingText: _.default.format("dxList-refreshingText"),
      pageLoadingText: _.default.format("dxList-pageLoadingText"),
      onScroll: null,
      onPullRefresh: null,
      onPageLoading: null,
      pageLoadMode: "scrollBottom",
      nextButtonText: _.default.format("dxList-nextButtonText"),
      onItemSwipe: null,
      grouped: false,
      onGroupRendered: null,
      collapsibleGroups: false,
      groupTemplate: "group",
      indicateLoading: true,
      activeStateEnabled: true,
      _itemAttributes: {
        role: "option"
      },
      useInkRipple: false,
      wrapItemText: false,
      _swipeEnabled: true,
      showChevronExpr: function (e) {
        if (e) {
          return e.showChevron;
        } else {
          return undefined;
        }
      },
      badgeExpr: function (e) {
        if (e) {
          return e.badge;
        } else {
          return undefined;
        }
      }
    });
  },
  _defaultOptionsRules: function () {
    var e = (0, C.current)();
    return this.callBase().concat((0, D.deviceDependentOptions)(), [{
      device: function () {
        return !m.nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }, {
      device: function (e) {
        return !m.nativeScrolling && !y.default.isSimulator() && y.default.real().deviceType === "desktop" && e.platform === "generic";
      },
      options: {
        showScrollbar: "onHover",
        pageLoadMode: "nextButton"
      }
    }, {
      device: function () {
        return y.default.real().deviceType === "desktop" && !y.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return (0, C.isMaterial)(e);
      },
      options: {
        pullingDownText: "",
        pulledDownText: "",
        refreshingText: "",
        pageLoadingText: "",
        useInkRipple: true
      }
    }]);
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._updateLoadingState(true);
    }
  },
  _itemClass: function () {
    return "dx-list-item";
  },
  _itemDataKey: function () {
    return "dxListItemData";
  },
  _itemContainer: function () {
    return this._$container;
  },
  _saveSelectionChangeEvent: function (e) {
    this._selectionChangeEventInstance = e;
  },
  _getSelectionChangeEvent: function () {
    return this._selectionChangeEventInstance;
  },
  _refreshItemElements: function () {
    if (this.option("grouped")) {
      this._itemElementsCache = this._itemContainer().children(".dx-list-group").children(".dx-list-group-body").children(this._itemSelector());
    } else {
      this._itemElementsCache = this._itemContainer().children(this._itemSelector());
    }
  },
  _modifyByChanges: function () {
    this.callBase.apply(this, arguments);
    this._refreshItemElements();
    this._updateLoadingState(true);
  },
  reorderItem: function (e, t) {
    return this.callBase(e, t).done(function () {
      this._refreshItemElements();
    });
  },
  deleteItem: function (e) {
    return this.callBase(e).done(function () {
      this._refreshItemElements();
    });
  },
  _itemElements: function () {
    return this._itemElementsCache;
  },
  _itemSelectHandler: function (e) {
    if (this.option("selectionMode") !== "single" || !this.isItemSelected(e.currentTarget)) {
      return this.callBase(e);
    }
  },
  _allowDynamicItemsAppend: function () {
    return true;
  },
  _init: function () {
    this.callBase();
    this._dataController.resetDataSourcePageIndex();
    this._$container = this.$element();
    this._initScrollView();
    this._feedbackShowTimeout = 70;
    this._createGroupRenderAction();
  },
  _scrollBottomMode: function () {
    return this.option("pageLoadMode") === "scrollBottom";
  },
  _nextButtonMode: function () {
    return this.option("pageLoadMode") === "nextButton";
  },
  _dataSourceOptions: function () {
    var e = this._scrollBottomMode();
    var t = this._nextButtonMode();
    return (0, h.extend)(this.callBase(), {
      paginate: (0, r.ensureDefined)(e || t, true)
    });
  },
  _getGroupedOption: function () {
    return this.option("grouped");
  },
  _getGroupContainerByIndex: function (e) {
    return this._itemContainer().find(`.dx-list-group`).eq(e).find(`.dx-list-group-body`);
  },
  _dataSourceFromUrlLoadMode: function () {
    return "raw";
  },
  _initScrollView: function () {
    var e = this.option("scrollingEnabled");
    var t = e && this.option("pullRefreshEnabled");
    var n = e && this._scrollBottomMode() && !!this._dataController.getDataSource();
    this._scrollView = this._createComponent(this.$element(), R || k.default, {
      height: this.option("height"),
      width: this.option("width"),
      disabled: this.option("disabled") || !e,
      onScroll: this._scrollHandler.bind(this),
      onPullDown: t ? this._pullDownHandler.bind(this) : null,
      onReachBottom: n ? this._scrollBottomHandler.bind(this) : null,
      showScrollbar: this.option("showScrollbar"),
      useNative: this.option("useNativeScrolling"),
      bounceEnabled: this.option("bounceEnabled"),
      scrollByContent: this.option("scrollByContent"),
      scrollByThumb: this.option("scrollByThumb"),
      pullingDownText: this.option("pullingDownText"),
      pulledDownText: this.option("pulledDownText"),
      refreshingText: this.option("refreshingText"),
      reachBottomText: this.option("pageLoadingText"),
      useKeyboard: false
    });
    this._$container = (0, o.default)(this._scrollView.content());
    if (this.option("wrapItemText")) {
      this._$container.addClass("dx-wrap-item-text");
    }
    this._createScrollViewActions();
  },
  _createScrollViewActions: function () {
    this._scrollAction = this._createActionByOption("onScroll");
    this._pullRefreshAction = this._createActionByOption("onPullRefresh");
    this._pageLoadingAction = this._createActionByOption("onPageLoading");
  },
  _scrollHandler: function (e) {
    if (this._scrollAction) {
      this._scrollAction(e);
    }
  },
  _initTemplates: function () {
    this._templateManager.addDefaultTemplates({
      group: new T.BindableTemplate(function (e, t) {
        if ((0, s.isPlainObject)(t)) {
          if (t.key) {
            e.text(t.key);
          }
        } else {
          e.text(String(t));
        }
      }, ["key"], this.option("integrationOptions.watchMethod"))
    });
    this.callBase();
  },
  _prepareDefaultItemTemplate: function (e, t) {
    this.callBase(e, t);
    if (e.icon) {
      var n = (0, l.getImageContainer)(e.icon).addClass("dx-list-item-icon");
      var i = (0, o.default)("<div>").addClass("dx-list-item-icon-container");
      i.append(n);
      t.prepend(i);
    }
  },
  _getBindableFields: function () {
    return ["text", "html", "icon"];
  },
  _updateLoadingState: function (e) {
    var t = this._dataController;
    var n = this._scrollBottomMode() && e && !t.isLoading() && !this._isLastPage();
    if (this._shouldContinueLoading(n)) {
      this._infiniteDataLoading();
    } else {
      this._scrollView.release(!n && !t.isLoading());
      this._toggleNextButton(this._shouldRenderNextButton() && !this._isLastPage());
      this._loadIndicationSuppressed(false);
    }
  },
  _shouldRenderNextButton: function () {
    return this._nextButtonMode() && this._dataController.isLoaded();
  },
  _isDataSourceFirstLoadCompleted: function (e) {
    if ((0, s.isDefined)(e)) {
      this._isFirstLoadCompleted = e;
    }
    return this._isFirstLoadCompleted;
  },
  _dataSourceLoadingChangedHandler: function (e) {
    if (!this._loadIndicationSuppressed()) {
      if (e && this.option("indicateLoading")) {
        this._showLoadingIndicatorTimer = setTimeout(function () {
          var e;
          if (!!this._itemElements().length || !!this._isDataSourceFirstLoadCompleted()) {
            if ((e = this._scrollView) !== null && e !== undefined) {
              e.startLoading();
            }
          }
        }.bind(this));
      } else {
        clearTimeout(this._showLoadingIndicatorTimer);
        if (this._scrollView) {
          this._scrollView.finishLoading();
        }
      }
      if (!e) {
        this._isDataSourceFirstLoadCompleted(false);
      }
    }
  },
  _dataSourceChangedHandler: function () {
    if (!this._shouldAppendItems() && (0, S.hasWindow)() && this._scrollView) {
      this._scrollView.scrollTo(0);
    }
    this.callBase.apply(this, arguments);
    this._isDataSourceFirstLoadCompleted(true);
  },
  _refreshContent: function () {
    this._prepareContent();
    this._fireContentReadyAction();
  },
  _hideLoadingIfLoadIndicationOff: function () {
    if (!this.option("indicateLoading")) {
      this._dataSourceLoadingChangedHandler(false);
    }
  },
  _loadIndicationSuppressed: function (e) {
    if (!arguments.length) {
      return this._isLoadIndicationSuppressed;
    }
    this._isLoadIndicationSuppressed = e;
  },
  _scrollViewIsFull: function () {
    var e = this._scrollView;
    return !e || (0, i.getHeight)(e.content()) > (0, i.getHeight)(e.container());
  },
  _pullDownHandler: function (e) {
    this._pullRefreshAction(e);
    var t = this._dataController;
    if (t.getDataSource() && !t.isLoading()) {
      this._clearSelectedItems();
      t.pageIndex(0);
      t.reload();
    } else {
      this._updateLoadingState();
    }
  },
  _shouldContinueLoading: function (e) {
    var o = (0, i.getHeight)(this._scrollView.content()) - (0, i.getHeight)(this._scrollView.container()) < (this._scrollView.scrollOffset()?.top ?? 0);
    return e && (!this._scrollViewIsFull() || o);
  },
  _infiniteDataLoading: function () {
    var e = this;
    if (this.$element().is(":visible")) {
      clearTimeout(this._loadNextPageTimer);
      this._loadNextPageTimer = setTimeout(function () {
        e._loadNextPage();
      });
    }
  },
  _scrollBottomHandler: function (e) {
    this._pageLoadingAction(e);
    if (this._dataController.isLoading() || this._isLastPage()) {
      this._updateLoadingState();
    } else {
      this._loadNextPage();
    }
  },
  _renderItems: function (e) {
    if (this.option("grouped")) {
      (0, d.each)(e, this._renderGroup.bind(this));
      this._attachGroupCollapseEvent();
      this._renderEmptyMessage();
      if ((0, C.isMaterial)()) {
        this.attachGroupHeaderInkRippleEvents();
      }
    } else {
      this.callBase.apply(this, arguments);
    }
    this._refreshItemElements();
    this._updateLoadingState(true);
  },
  _attachGroupCollapseEvent: function () {
    var e = (0, w.addNamespace)(p.name, this.NAME);
    var t = this.$element();
    var n = this.option("collapsibleGroups");
    t.toggleClass("dx-list-collapsible-groups", n);
    a.default.off(t, e, ".dx-list-group-header");
    if (n) {
      a.default.on(t, e, ".dx-list-group-header", function (e) {
        this._createAction(function (e) {
          var t = (0, o.default)(e.event.currentTarget).parent();
          this._collapseGroupHandler(t);
          if (this.option("focusStateEnabled")) {
            this.option("focusedElement", (0, u.getPublicElement)(t.find(".dx-list-item").eq(0)));
          }
        }.bind(this), {
          validatingTargetName: "element"
        })({
          event: e
        });
      }.bind(this));
    }
  },
  _collapseGroupHandler: function (e, t) {
    var n = new E.Deferred();
    if (e.hasClass("dx-list-group-collapsed") === t) {
      return n.resolve();
    }
    var o = e.children(".dx-list-group-body");
    var a = (0, i.getOuterHeight)(o);
    var r = 0;
    if (a === 0) {
      (0, i.setHeight)(o, "auto");
      r = (0, i.getOuterHeight)(o);
    }
    e.toggleClass("dx-list-group-collapsed", t);
    f.default.animate(o, {
      type: "custom",
      from: {
        height: a
      },
      to: {
        height: r
      },
      duration: 200,
      complete: function () {
        this.updateDimensions();
        this._updateLoadingState(true);
        n.resolve();
      }.bind(this)
    });
    return n.promise();
  },
  _dataSourceLoadErrorHandler: function () {
    this._forgetNextPageLoading();
    if (this._initialized) {
      this._renderEmptyMessage();
      this._updateLoadingState();
    }
  },
  _initMarkup: function () {
    this._itemElementsCache = (0, o.default)();
    this.$element().addClass("dx-list");
    this.callBase();
    if (this.option("useInkRipple")) {
      this._renderInkRipple();
    }
    this.setAria({
      role: "group",
      roledescription: "list"
    }, this.$element());
    this._setListAria();
  },
  _setListAria: function () {
    var e = this.option().items;
    var t = e != null && e.length ? {
      role: "listbox",
      label: "Items"
    } : {
      role: undefined,
      label: undefined
    };
    this.setAria(t);
  },
  _focusTarget: function () {
    return this._itemContainer();
  },
  _renderInkRipple: function () {
    this._inkRipple = (0, v.render)();
  },
  _toggleActiveState: function (e, t, n) {
    this.callBase.apply(this, arguments);
    var i = this;
    if (this._inkRipple) {
      var o = {
        element: e,
        event: n
      };
      if (t) {
        if ((0, C.isMaterial)()) {
          this._inkRippleTimer = setTimeout(function () {
            i._inkRipple.showWave(o);
          }, 35);
        } else {
          i._inkRipple.showWave(o);
        }
      } else {
        clearTimeout(this._inkRippleTimer);
        this._inkRipple.hideWave(o);
      }
    }
  },
  _postprocessRenderItem: function (e) {
    this._refreshItemElements();
    this.callBase.apply(this, arguments);
    if (this.option("_swipeEnabled")) {
      this._attachSwipeEvent((0, o.default)(e.itemElement));
    }
  },
  _attachSwipeEvent: function (e) {
    var t = (0, w.addNamespace)(g.end, this.NAME);
    a.default.on(e, t, this._itemSwipeEndHandler.bind(this));
  },
  _itemSwipeEndHandler: function (e) {
    this._itemDXEventHandler(e, "onItemSwipe", {
      direction: e.offset < 0 ? "left" : "right"
    });
  },
  _nextButtonHandler: function (e) {
    this._pageLoadingAction(e);
    var t = this._dataController;
    if (t.getDataSource() && !t.isLoading()) {
      this._scrollView.toggleLoading(true);
      this._$nextButton.detach();
      this._loadIndicationSuppressed(true);
      this._loadNextPage();
    }
  },
  _renderGroup: function (e, t) {
    var n = (0, o.default)("<div>").addClass("dx-list-group").appendTo(this._itemContainer());
    var i = `dx-${new P.default().toString()}`;
    var a = {
      role: "group",
      labelledby: i
    };
    this.setAria(a, n);
    var r = (0, o.default)("<div>").addClass("dx-list-group-header").attr("id", i).appendTo(n);
    var s = this.option("groupTemplate");
    var l = this._getTemplate(t.template || s, t, e, r);
    var c = {
      index: e,
      itemData: t,
      container: (0, u.getPublicElement)(r)
    };
    this._createItemByTemplate(l, c);
    if ((0, C.isMaterial)()) {
      (0, o.default)("<div>").addClass("dx-list-group-header-indicator").prependTo(r);
    }
    this._renderingGroupIndex = e;
    var h = (0, o.default)("<div>").addClass("dx-list-group-body").appendTo(n);
    (0, d.each)(L(t) || [], function (t, n) {
      this._renderItem({
        group: e,
        item: t
      }, n, h);
    }.bind(this));
    this._groupRenderAction({
      groupElement: (0, u.getPublicElement)(n),
      groupIndex: e,
      groupData: t
    });
  },
  downInkRippleHandler: function (e) {
    this._toggleActiveState((0, o.default)(e.currentTarget), true, e);
  },
  upInkRippleHandler: function (e) {
    this._toggleActiveState((0, o.default)(e.currentTarget), false);
  },
  attachGroupHeaderInkRippleEvents: function () {
    var e = this.$element();
    this._downInkRippleHandler = this._downInkRippleHandler || this.downInkRippleHandler.bind(this);
    this._upInkRippleHandler = this._upInkRippleHandler || this.upInkRippleHandler.bind(this);
    var t = [e, "dxpointerdown", ".dx-list-group-header", this._downInkRippleHandler];
    var n = [e, "dxpointerup dxpointerout", ".dx-list-group-header", this._upInkRippleHandler];
    a.default.off.apply(a.default, t);
    a.default.on.apply(a.default, t);
    a.default.off.apply(a.default, n);
    a.default.on.apply(a.default, n);
  },
  _createGroupRenderAction: function () {
    this._groupRenderAction = this._createActionByOption("onGroupRendered");
  },
  _clean: function () {
    clearTimeout(this._inkRippleTimer);
    if (this._$nextButton) {
      this._$nextButton.remove();
      this._$nextButton = null;
    }
    this.callBase.apply(this, arguments);
  },
  _dispose: function () {
    this._isDataSourceFirstLoadCompleted(false);
    clearTimeout(this._holdTimer);
    clearTimeout(this._loadNextPageTimer);
    clearTimeout(this._showLoadingIndicatorTimer);
    this.callBase();
  },
  _toggleDisabledState: function (e) {
    this.callBase(e);
    this._scrollView.option("disabled", e || !this.option("scrollingEnabled"));
  },
  _toggleNextButton: function (e) {
    var t = this._dataController;
    var n = this._getNextButton();
    this.$element().toggleClass("dx-has-next", e);
    if (e && t.isLoaded()) {
      n.appendTo(this._itemContainer());
    }
    if (!e) {
      n.detach();
    }
  },
  _getNextButton: function () {
    this._$nextButton ||= this._createNextButton();
    return this._$nextButton;
  },
  _createNextButton: function () {
    var e = (0, o.default)("<div>").addClass("dx-list-next-button");
    var t = (0, o.default)("<div>").appendTo(e);
    this._createComponent(t, x.default, {
      text: this.option("nextButtonText"),
      onClick: this._nextButtonHandler.bind(this),
      type: (0, C.isMaterial)() ? "default" : undefined,
      integrationOptions: {}
    });
    return e;
  },
  _moveFocus: function () {
    this.callBase.apply(this, arguments);
    this.scrollToItem(this.option("focusedElement"));
  },
  _refresh: function () {
    if ((0, S.hasWindow)()) {
      var e = this._scrollView.scrollTop();
      this.callBase();
      if (e) {
        this._scrollView.scrollTo(e);
      }
    } else {
      this.callBase();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "pageLoadMode":
        this._toggleNextButton(e.value);
        this._initScrollView();
        break;
      case "dataSource":
        this.callBase(e);
        this._initScrollView();
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case "items":
        this.callBase(e);
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case "pullingDownText":
      case "pulledDownText":
      case "refreshingText":
      case "pageLoadingText":
      case "showScrollbar":
      case "bounceEnabled":
      case "scrollByContent":
      case "scrollByThumb":
      case "useNativeScrolling":
      case "scrollingEnabled":
      case "pullRefreshEnabled":
        this._initScrollView();
        this._updateLoadingState(true);
        break;
      case "nextButtonText":
      case "onItemSwipe":
      case "useInkRipple":
        this._invalidate();
        break;
      case "onScroll":
      case "onPullRefresh":
      case "onPageLoading":
        this._createScrollViewActions();
        break;
      case "grouped":
      case "collapsibleGroups":
      case "groupTemplate":
        this._invalidate();
        break;
      case "wrapItemText":
        this._$container.toggleClass("dx-wrap-item-text", e.value);
        break;
      case "onGroupRendered":
        this._createGroupRenderAction();
        break;
      case "width":
      case "height":
        this.callBase(e);
        this._scrollView.option(e.name, e.value);
        this._scrollView.update();
        break;
      case "indicateLoading":
        this._hideLoadingIfLoadIndicationOff();
        break;
      case "visible":
        this.callBase(e);
        this._scrollView.update();
        break;
      case "rtlEnabled":
        this._initScrollView();
        this.callBase(e);
        break;
      case "showChevronExpr":
      case "badgeExpr":
        this._invalidate();
        break;
      case "_swipeEnabled":
      case "selectByClick":
        break;
      default:
        this.callBase(e);
    }
  },
  _extendActionArgs: function (e) {
    if (!this.option("grouped")) {
      return this.callBase(e);
    }
    var t = e.closest(".dx-list-group");
    var n = t.find(".dx-list-item");
    return (0, h.extend)(this.callBase(e), {
      itemIndex: {
        group: t.index(),
        item: n.index(e)
      }
    });
  },
  expandGroup: function (e) {
    var t = new E.Deferred();
    var n = this._itemContainer().find(".dx-list-group").eq(e);
    this._collapseGroupHandler(n, false).done(function () {
      t.resolveWith(this);
    }.bind(this));
    return t.promise();
  },
  collapseGroup: function (e) {
    var t = new E.Deferred();
    var n = this._itemContainer().find(".dx-list-group").eq(e);
    this._collapseGroupHandler(n, true).done(function () {
      t.resolveWith(this);
    }.bind(this));
    return t;
  },
  updateDimensions: function () {
    var e = this;
    var t = new E.Deferred();
    if (e._scrollView) {
      e._scrollView.update().done(function () {
        if (!e._scrollViewIsFull()) {
          e._updateLoadingState(true);
        }
        t.resolveWith(e);
      });
    } else {
      t.resolveWith(e);
    }
    return t.promise();
  },
  reload: function () {
    this.callBase();
    this.scrollTo(0);
    this._pullDownHandler();
  },
  repaint: function () {
    this.scrollTo(0);
    this.callBase();
  },
  scrollTop: function () {
    return this._scrollView.scrollOffset().top;
  },
  clientHeight: function () {
    return this._scrollView.clientHeight();
  },
  scrollHeight: function () {
    return this._scrollView.scrollHeight();
  },
  scrollBy: function (e) {
    this._scrollView.scrollBy(e);
  },
  scrollTo: function (e) {
    this._scrollView.scrollTo(e);
  },
  scrollToItem: function (e) {
    var t = this._editStrategy.getItemElement(e);
    var n = t == null ? undefined : t.get(0);
    this._scrollView.scrollToElement(n, {
      bottom: (0, A.getElementMargin)(n, "bottom")
    });
  },
  _dimensionChanged: function () {
    this.updateDimensions();
  }
}).include(O.default);
exports.ListBase = V;
V.ItemClass = b.default;