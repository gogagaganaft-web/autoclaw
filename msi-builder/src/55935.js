exports.default = undefined;
var i = require("./58664.js");
var o = D(require("./68374.js"));
var a = D(require("./55994.js"));
var r = require("./58201.js");
var s = require("./60137.js");
var l = require("./20576.js");
var u = require("./6415.js");
var d = require("./95479.js");
var c = require("./13306.js");
var h = require("./45434.js");
var f = D(require("./28109.js"));
var p = D(require("./20530.js"));
var g = D(require("./99393.js"));
var m = require("./39611.js");
var _ = D(require("./32468.js"));
var v = require("./75811.js");
var y = require("./95429.js");
var b = D(require("./17287.js"));
var x = D(require("./29837.js"));
var w = require("./91627.js");
var C = require("./31648.js");
var S = require("./35922.js");
var k = require("./61902.js");
function D(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var I = (0, r.getWindow)();
var T = _.default.inherit({
  _supportedKeys: function () {
    return (0, c.extend)(this.callBase(), {
      space: function (e) {
        e.preventDefault();
        this._validatedOpening();
      },
      enter: function () {
        this._validatedOpening();
      }
    });
  },
  _getDefaultOptions: function () {
    function e(e) {
      return (p.default.real().deviceType === "phone" && I.visualViewport ? I.visualViewport[e] : e === "width" ? (0, i.getWidth)(I) : (0, i.getHeight)(I)) * 0.8;
    }
    return (0, c.extend)(this.callBase(), {
      placeholder: f.default.format("Select"),
      searchPlaceholder: f.default.format("Search"),
      searchEnabled: true,
      searchStartEvent: "input change keyup",
      cleanSearchOnOpening: true,
      showCancelButton: true,
      showClearButton: false,
      clearButtonText: f.default.format("Clear"),
      applyButtonText: f.default.format("OK"),
      pullRefreshEnabled: false,
      useNativeScrolling: true,
      pullingDownText: f.default.format("dxList-pullingDownText"),
      pulledDownText: f.default.format("dxList-pulledDownText"),
      refreshingText: f.default.format("dxList-refreshingText"),
      pageLoadingText: f.default.format("dxList-pageLoadingText"),
      onScroll: null,
      onPullRefresh: null,
      onPageLoading: null,
      pageLoadMode: "scrollBottom",
      nextButtonText: f.default.format("dxList-nextButtonText"),
      grouped: false,
      groupTemplate: "group",
      usePopover: false,
      showDropDownButton: false,
      focusStateEnabled: false,
      dropDownOptions: {
        showTitle: true,
        width: function () {
          return e("width");
        },
        height: function () {
          return e("height");
        },
        shading: true,
        hideOnOutsideClick: false,
        position: undefined,
        animation: {},
        title: "",
        titleTemplate: "title",
        onTitleRendered: null,
        fullScreen: false
      },
      dropDownCentered: false,
      _scrollToSelectedItemEnabled: false,
      useHiddenSubmitElement: true
    });
  },
  _setDeprecatedOptions: function () {
    this.callBase();
    (0, c.extend)(this._deprecatedOptions, {
      valueChangeEvent: {
        since: "22.1",
        alias: "searchStartEvent"
      }
    });
  },
  _defaultOptionsRules: function () {
    var e = this;
    var t = (0, v.current)();
    return this.callBase().concat([{
      device: function () {
        return !s.nativeScrolling;
      },
      options: {
        useNativeScrolling: false
      }
    }, {
      device: function (e) {
        return !p.default.isSimulator() && p.default.real().deviceType === "desktop" && e.platform === "generic";
      },
      options: {
        usePopover: true,
        dropDownOptions: {
          height: "auto"
        }
      }
    }, {
      device: {
        platform: "ios",
        phone: true
      },
      options: {
        dropDownOptions: {
          fullScreen: true
        }
      }
    }, {
      device: {
        platform: "ios",
        tablet: true
      },
      options: {
        dropDownOptions: {
          width: function () {
            return Math.min((0, i.getWidth)(I), (0, i.getHeight)(I)) * 0.4;
          },
          height: "auto"
        },
        usePopover: true
      }
    }, {
      device: function () {
        return p.default.real().deviceType === "desktop" && !p.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return (0, v.isMaterial)(t);
      },
      options: {
        usePopover: false,
        searchEnabled: false,
        showCancelButton: false,
        dropDownCentered: true,
        _scrollToSelectedItemEnabled: true,
        dropDownOptions: {
          hideOnOutsideClick: true,
          _ignoreFunctionValueDeprecation: true,
          width: function () {
            return (0, k.getElementWidth)(e.$element());
          },
          height: function () {
            return this._getPopupHeight();
          }.bind(this),
          showTitle: false,
          shading: false
        }
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this._initActions();
  },
  _initActions: function () {
    this.callBase();
    this._initScrollAction();
    this._initPageLoadingAction();
    this._initPullRefreshAction();
  },
  _initPageLoadingAction: function () {
    this._pageLoadingAction = this._createActionByOption("onPageLoading");
  },
  _initPullRefreshAction: function () {
    this._pullRefreshAction = this._createActionByOption("onPullRefresh");
  },
  _initScrollAction: function () {
    this._scrollAction = this._createActionByOption("onScroll");
  },
  _scrollHandler: function (e) {
    this._scrollAction(e);
  },
  _pullRefreshHandler: function (e) {
    this._pullRefreshAction(e);
  },
  _pageLoadingHandler: function (e) {
    this._pageLoadingAction(e);
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      group: new w.ChildDefaultTemplate("group"),
      title: new w.ChildDefaultTemplate("title")
    });
  },
  _initMarkup: function () {
    this.$element().addClass("dx-lookup").toggleClass("dx-lookup-popover-mode", this.option("usePopover"));
    this.callBase();
  },
  _inputWrapper: function () {
    return this.$element().find(".dx-lookup-field-wrapper");
  },
  _dataSourceOptions: function () {
    return (0, c.extend)(this.callBase(), {
      paginate: true
    });
  },
  _fireContentReadyAction: l.noop,
  _popupWrapperClass: function () {
    return "";
  },
  _renderInput: function () {
    var e = this;
    var t = this._createAction(function () {
      e._toggleOpenState();
    });
    this._$field = (0, o.default)("<div>").addClass("dx-lookup-field");
    this._applyInputAttributes(this.option("inputAttr"));
    a.default.on(this._$field, (0, m.addNamespace)(y.name, this.NAME), function (e) {
      t({
        event: e
      });
    });
    var n = (0, o.default)("<div>").addClass("dx-lookup-arrow");
    this._$fieldWrapper = (0, o.default)("<div>").addClass("dx-lookup-field-wrapper").append(this._$field).append(n).appendTo(this.$element());
  },
  _applyInputAttributes: function (e) {
    this._$field.attr(e);
  },
  _getInputContainer: function () {
    return this._$fieldWrapper;
  },
  _renderField: function () {
    var e = this._getTemplateByOption("fieldTemplate");
    if (e && this.option("fieldTemplate")) {
      this._renderFieldTemplate(e);
    } else {
      var t = this.option("displayValue");
      this._updateField(t);
      this.$element().toggleClass("dx-lookup-empty", !this.option("selectedItem"));
    }
  },
  _getLabelContainer: function () {
    return this._$field;
  },
  _renderDisplayText: function (e) {
    if (this._input().length) {
      this.callBase(e);
    } else {
      this._updateField(e);
    }
  },
  _updateField: function (e) {
    e = (0, S.isDefined)(e) && String(e) || this.option("placeholder");
    this._$field.text(e);
  },
  _renderFieldTemplate: function (e) {
    this._$field.empty();
    var t = this._fieldRenderData();
    e.render({
      model: t,
      container: (0, u.getPublicElement)(this._$field)
    });
  },
  _fieldRenderData: function () {
    return this.option("selectedItem");
  },
  _popupShowingHandler: function () {
    this.callBase.apply(this, arguments);
    if (this.option("cleanSearchOnOpening")) {
      if (this.option("searchEnabled") && this._searchBox.option("value")) {
        this._searchBox.option("value", "");
        this._searchCanceled();
      }
      if (this._list) {
        this._list.option("focusedElement", null);
      }
    }
    if (this.option("dropDownOptions.fullScreen") && this.option("_scrollToSelectedItemEnabled")) {
      this._popup.option("position").of = (0, o.default)(I);
    }
  },
  _popupShownHandler: function () {
    var e = this.option("_scrollToSelectedItemEnabled");
    if (!this.option("dropDownOptions.fullScreen") && e) {
      this._setPopupPosition();
    }
    this.callBase();
  },
  _scrollToSelectedItem: function () {
    var e = this._list.option("selectedIndex");
    var t = this._list.option("items");
    var n = t.length;
    if (n !== 0) {
      if (this._list.option("grouped")) {
        this._list.scrollToItem({
          group: n - 1,
          item: t[n - 1].items.length - 1
        });
      } else {
        this._list.scrollToItem(n - 1);
      }
      this._list.scrollToItem(e);
    }
  },
  _getDifferenceOffsets: function (e) {
    return e.offset().top - (0, o.default)(this.element()).offset().top;
  },
  _isCenteringEnabled: function (e, t) {
    return e > 1 && e < t - 2;
  },
  _getPopupOffset: function () {
    var e = this._listItemElements().length;
    if (e !== 0) {
      var t = (0, o.default)(this._list.element()).find(".dx-list-item-selected");
      var n = this._listItemElements().index(t);
      var a = ((0, i.getHeight)(t) - (0, i.getHeight)(this.element())) / 2;
      var r = (0, o.default)(this._list.element()).offset().top;
      var s = this.option("dropDownOptions.height");
      var l = typeof s == "function" ? s() : s;
      var u = (0, i.getHeight)(I);
      var d = 0;
      if (n !== -1) {
        if (this._isCenteringEnabled(n, e)) {
          this._scrollToSelectedItem();
          var c = (l - (0, i.getHeight)(t)) / 2 - this._getDifferenceOffsets(t);
          this._list.scrollTo(this._list.scrollTop() + 4 - c);
          if (r < (d = a + this._getDifferenceOffsets(t)) && n !== e - 3) {
            this._list.scrollTo(this._list.scrollTop() + this._getDifferenceOffsets(t) / 2);
            d = a + this._getDifferenceOffsets(t);
          }
        } else if (n <= 1) {
          this._list.scrollTo(0);
          d = a + this._getDifferenceOffsets(t);
        } else if (n >= e - 2) {
          this._scrollToSelectedItem();
          d = a + this._getDifferenceOffsets(t);
        }
        if (r < d) {
          this._scrollToSelectedItem();
          d = a + 8;
        }
      }
      var h = l - d - (0, i.getHeight)(this.element());
      if (u - r < h) {
        this._list.scrollTo(this._list.scrollTop() + a - h);
        d = l - (0, i.getHeight)(this.element()) - 8;
      }
      return d;
    }
  },
  _setPopupPosition: function () {
    if (this.option("dropDownCentered") && !this._popup.$wrapper().hasClass("dx-popover-flipped-vertical")) {
      var e = (0, o.default)(this._popup.$content()).parent();
      var t = this._getPopupOffset();
      var n = (0, C.locate)(e);
      (0, C.move)(e, {
        top: n.top - t
      });
    }
  },
  _listItemGroupedElements: function () {
    var e = this._list._itemContainer().children();
    var t = [];
    e.each(function (e, n) {
      t.push((0, o.default)(n).find(".dx-list-group-header")[0]);
      (0, o.default)(n).find(".dx-list-item").each(function (e, n) {
        t.push(n);
      });
    });
    return (0, o.default)(t);
  },
  _calculateListHeight: function (e) {
    var t = e ? this._listItemGroupedElements() : this._listItemElements();
    var n = (0, o.default)(".dx-list-item-selected");
    var a = t.index(n);
    var r = 0;
    if (t.length === 0) {
      r += 8;
    } else if (t.length < 5) {
      t.each(function (e, t) {
        r += (0, i.getOuterHeight)(t);
      });
    } else {
      (a <= 1 ? t.slice(0, 5) : this._isCenteringEnabled(a, t.length) ? t.slice(a - 2, a + 3) : t.slice(t.length - 5, t.length)).each(function (e, t) {
        r += (0, i.getOuterHeight)(t);
      });
    }
    return r + (e ? 8 : 16);
  },
  _getPopupHeight: function () {
    var e;
    if ((e = this._list) !== null && e !== undefined && e.itemElements().length) {
      return this._calculateListHeight(this.option("grouped")) + (this._$searchWrapper ? (0, i.getOuterHeight)(this._$searchWrapper) : 0) + (this._popup._$bottom ? (0, i.getOuterHeight)(this._popup._$bottom) : 0) + (this._popup._$title ? (0, i.getOuterHeight)(this._popup._$title) : 0);
    } else {
      return "auto";
    }
  },
  _renderPopup: function () {
    if (this.option("usePopover") && !this.option("dropDownOptions.fullScreen")) {
      if (this.option("_scrollToSelectedItemEnabled")) {
        this.callBase();
      } else {
        this._renderPopover();
      }
    } else {
      this.callBase();
    }
    this._$popup.addClass("dx-lookup-popup");
    this._popup.$wrapper().addClass("dx-lookup-popup-wrapper");
  },
  _renderPopover: function () {
    this._popup = this._createComponent(this._$popup, b.default, (0, c.extend)(this._popupConfig(), this._options.cache("dropDownOptions"), {
      showEvent: null,
      hideEvent: null,
      target: this.$element(),
      fullScreen: false,
      shading: false,
      hideOnParentScroll: true,
      _fixWrapperPosition: false,
      width: this._isInitialOptionValue("dropDownOptions.width") ? function () {
        return (0, i.getOuterWidth)(this.$element());
      }.bind(this) : this._popupConfig().width
    }));
    this._popup.$overlayContent().attr("role", "dialog");
    this._popup.on({
      showing: this._popupShowingHandler.bind(this),
      shown: this._popupShownHandler.bind(this),
      hiding: this._popupHidingHandler.bind(this),
      hidden: this._popupHiddenHandler.bind(this),
      contentReady: this._contentReadyHandler.bind(this)
    });
    if (this.option("_scrollToSelectedItemEnabled")) {
      this._popup._$arrow.remove();
    }
    this._setPopupContentId(this._popup.$content());
    this._contentReadyHandler();
  },
  _popupHidingHandler: function () {
    this.callBase();
    if (this.option("focusStateEnabled")) {
      this.focus();
    }
  },
  _popupHiddenHandler: function () {
    this.callBase();
    if (this.option("_scrollToSelectedItemEnabled")) {
      (0, C.resetPosition)((0, o.default)(this._popup.content()).parent());
    }
  },
  _preventFocusOnPopup: l.noop,
  _popupConfig: function () {
    var e = this;
    var t = (0, c.extend)(this.callBase(), {
      toolbarItems: this._getPopupToolbarItems(),
      hideOnParentScroll: false,
      onPositioned: null,
      maxHeight: "100vh",
      showTitle: this.option("dropDownOptions.showTitle"),
      title: this.option("dropDownOptions.title"),
      titleTemplate: this._getTemplateByOption("dropDownOptions.titleTemplate"),
      onTitleRendered: this.option("dropDownOptions.onTitleRendered"),
      fullScreen: this.option("dropDownOptions.fullScreen"),
      shading: this.option("dropDownOptions.shading"),
      hideOnOutsideClick: this.option("dropDownOptions.hideOnOutsideClick") || this.option("dropDownOptions.closeOnOutsideClick")
    });
    delete t.animation;
    delete t.position;
    if (this.option("_scrollToSelectedItemEnabled")) {
      t.position = this.option("dropDownCentered") ? {
        my: "left top",
        at: "left top",
        of: this.element()
      } : {
        my: "left top",
        at: "left bottom",
        of: this.element()
      };
      t.hideOnParentScroll = true;
    }
    (0, d.each)(["position", "animation", "width", "height"], function (n, i) {
      var o = e.option(`dropDownOptions.${i}`);
      if (o !== undefined) {
        t[i] = o;
      }
    });
    return t;
  },
  _getPopupToolbarItems: function () {
    var e = this.option("applyValueMode") === "useButtons" ? this._popupToolbarItemsConfig() : [];
    var t = this._getCancelButtonConfig();
    if (t) {
      e.push(t);
    }
    var n = this._getClearButtonConfig();
    if (n) {
      e.push(n);
    }
    return this._applyButtonsLocation(e);
  },
  _popupToolbarItemsConfig: function () {
    return [{
      shortcut: "done",
      options: {
        onClick: this._applyButtonHandler.bind(this),
        text: this.option("applyButtonText")
      }
    }];
  },
  _getCancelButtonConfig: function () {
    var e = this;
    if (this.option("showCancelButton")) {
      return {
        shortcut: "cancel",
        onClick: this._cancelButtonHandler.bind(this),
        options: {
          onInitialized: function (t) {
            t.component.registerKeyHandler("escape", e.close.bind(e));
          },
          text: this.option("cancelButtonText")
        }
      };
    } else {
      return null;
    }
  },
  _getClearButtonConfig: function () {
    if (this.option("showClearButton")) {
      return {
        shortcut: "clear",
        onClick: this._resetValue.bind(this),
        options: {
          text: this.option("clearButtonText")
        }
      };
    } else {
      return null;
    }
  },
  _applyButtonHandler: function (e) {
    if (e) {
      this._saveValueChangeEvent(e.event);
    }
    this.option("value", this._valueGetter(this._currentSelectedItem()));
    this.callBase();
  },
  _cancelButtonHandler: function () {
    this._refreshSelected();
    this.callBase();
  },
  _refreshPopupVisibility: function () {
    if (this.option("opened")) {
      this._updateListDimensions();
    }
  },
  _dimensionChanged: function () {
    if (this.option("usePopover") && !this.option("dropDownOptions.width")) {
      this.option("dropDownOptions.width", (0, i.getWidth)(this.$element()));
    }
    this._updateListDimensions();
  },
  _input: function () {
    return this._$searchBox || this.callBase();
  },
  _renderPopupContent: function () {
    this.callBase();
    this._renderSearch();
  },
  _renderValueChangeEvent: l.noop,
  _renderSearch: function () {
    var e = this;
    var t = this.option("searchEnabled");
    this._toggleSearchClass(t);
    if (t) {
      var n = this._$searchWrapper = (0, o.default)("<div>").addClass("dx-lookup-search-wrapper");
      var i = this._$searchBox = (0, o.default)("<div>").addClass("dx-lookup-search").appendTo(n);
      var a = p.default.current().android ? "text" : "search";
      var r = false;
      var s = {
        mode: a,
        showClearButton: true,
        valueChangeEvent: this.option("searchStartEvent"),
        inputAttr: {
          "aria-label": "Search"
        },
        onDisposing: function () {
          return r = false;
        },
        onFocusIn: function () {
          return r = true;
        },
        onFocusOut: function () {
          return r = false;
        },
        onKeyboardHandled: function (t) {
          return r && e._list._keyboardHandler(t);
        },
        onValueChanged: function (t) {
          return e._searchHandler(t);
        }
      };
      this._searchBox = this._createComponent(i, x.default, s);
      this._registerSearchKeyHandlers();
      n.insertBefore(this._$list);
      this._setSearchPlaceholder();
    }
  },
  _removeSearch: function () {
    if (this._$searchWrapper) {
      this._$searchWrapper.remove();
    }
    delete this._$searchWrapper;
    if (this._$searchBox) {
      this._$searchBox.remove();
    }
    delete this._$searchBox;
    delete this._searchBox;
  },
  _selectListItemHandler: function (e) {
    var t = (0, o.default)(this._list.option("focusedElement"));
    if (t.length) {
      e.preventDefault();
      e.target = t.get(0);
      this._saveValueChangeEvent(e);
      this._selectListItem(e.itemData, t);
    }
  },
  _registerSearchKeyHandlers: function () {
    this._searchBox.registerKeyHandler("escape", this.close.bind(this));
    this._searchBox.registerKeyHandler("enter", this._selectListItemHandler.bind(this));
    this._searchBox.registerKeyHandler("space", this._selectListItemHandler.bind(this));
    this._searchBox.registerKeyHandler("end", l.noop);
    this._searchBox.registerKeyHandler("home", l.noop);
  },
  _toggleSearchClass: function (e) {
    if (this._popup) {
      this._popup.$wrapper().toggleClass("dx-lookup-popup-search", e);
    }
  },
  _setSearchPlaceholder: function () {
    if (this._$searchBox) {
      var e = this.option("minSearchLength");
      var t = this.option("searchPlaceholder");
      if (e && t === f.default.format("Search")) {
        t = f.default.getFormatter("dxLookup-searchPlaceholder")(e);
      }
      this._searchBox.option("placeholder", t);
    }
  },
  _setAriaTargetForList: l.noop,
  _renderList: function () {
    var e = this;
    this.callBase();
    this._list.registerKeyHandler("escape", function () {
      e.close();
    });
  },
  _listConfig: function () {
    return (0, c.extend)(this.callBase(), {
      tabIndex: 0,
      grouped: this.option("grouped"),
      groupTemplate: this._getTemplateByOption("groupTemplate"),
      pullRefreshEnabled: this.option("pullRefreshEnabled"),
      useNativeScrolling: this.option("useNativeScrolling"),
      pullingDownText: this.option("pullingDownText"),
      pulledDownText: this.option("pulledDownText"),
      refreshingText: this.option("refreshingText"),
      pageLoadingText: this.option("pageLoadingText"),
      onScroll: this._scrollHandler.bind(this),
      onPullRefresh: this._pullRefreshHandler.bind(this),
      onPageLoading: this._pageLoadingHandler.bind(this),
      pageLoadMode: this.option("pageLoadMode"),
      nextButtonText: this.option("nextButtonText"),
      indicateLoading: this.option("searchEnabled"),
      onSelectionChanged: this._getSelectionChangedHandler()
    });
  },
  _getSelectionChangedHandler: function () {
    if (this.option("showSelectionControls")) {
      return this._selectionChangeHandler.bind(this);
    } else {
      return l.noop;
    }
  },
  _listContentReadyHandler: function () {
    this.callBase.apply(this, arguments);
    this._refreshSelected();
  },
  _runWithoutCloseOnScroll: function (e) {
    var t = this;
    var n = this.option()._scrollToSelectedItemEnabled;
    var i = this._popup.option("hideOnParentScroll");
    if (n) {
      this._popup.option("hideOnParentScroll", false);
      e();
      this._hideOnParentScrollTimer = setTimeout(function () {
        t._popup.option("hideOnParentScroll", i);
      });
    } else {
      e();
    }
  },
  _setFocusPolicy: function () {
    var e = this;
    if (this.option("focusStateEnabled")) {
      this._runWithoutCloseOnScroll(function () {
        if (e.option("searchEnabled")) {
          e._searchBox.focus();
        } else {
          e._list.focus();
        }
      });
    }
  },
  _focusTarget: function () {
    return this._$field;
  },
  _keyboardEventBindingTarget: function () {
    return this._$field;
  },
  _listItemClickHandler: function (e) {
    this._saveValueChangeEvent(e.event);
    this._selectListItem(e.itemData, e.event.currentTarget);
  },
  _selectListItem: function (e, t) {
    this._list.selectItem(t);
    if (this.option("applyValueMode") === "instantly") {
      this._applyButtonHandler();
    }
  },
  _currentSelectedItem: function () {
    if (this.option("grouped")) {
      return this._list.option("selectedItems[0]").items[0];
    } else {
      return this._list.option("selectedItems[0]");
    }
  },
  _resetValue: function (e) {
    this._saveValueChangeEvent(e.event);
    this.option("value", null);
    this.option("opened", false);
  },
  _searchValue: function () {
    if (this.option("searchEnabled") && this._searchBox) {
      return this._searchBox.option("value");
    } else {
      return "";
    }
  },
  _renderInputValue: function () {
    var e = this;
    return this.callBase().always(function () {
      e._refreshSelected();
    });
  },
  _renderPlaceholder: function () {
    if (this.$element().find(".dx-texteditor-input").length !== 0) {
      this.callBase();
    }
  },
  _clean: function () {
    this._$fieldWrapper.remove();
    clearTimeout(this._hideOnParentScrollTimer);
    this._hideOnParentScrollTimer = null;
    this._$searchBox = null;
    this.callBase();
  },
  _optionChanged: function (e) {
    var t;
    var n = e.name;
    var i = e.fullName;
    var o = e.value;
    switch (n) {
      case "dataSource":
        this.callBase.apply(this, arguments);
        this._renderField();
        break;
      case "searchEnabled":
        if (this._popup) {
          this._removeSearch();
          this._renderSearch();
        }
        break;
      case "searchPlaceholder":
        this._setSearchPlaceholder();
        break;
      case "minSearchLength":
        this._setSearchPlaceholder();
        this.callBase.apply(this, arguments);
        break;
      case "inputAttr":
        this._applyInputAttributes(o);
        break;
      case "usePopover":
      case "placeholder":
        this._invalidate();
        break;
      case "clearButtonText":
      case "showClearButton":
      case "showCancelButton":
        this._setPopupOption("toolbarItems", this._getPopupToolbarItems());
        break;
      case "applyValueMode":
        this.callBase.apply(this, arguments);
        break;
      case "onPageLoading":
        this._initPageLoadingAction();
        break;
      case "onPullRefresh":
        this._initPullRefreshAction();
        break;
      case "pullRefreshEnabled":
      case "useNativeScrolling":
      case "pullingDownText":
      case "pulledDownText":
      case "refreshingText":
      case "pageLoadingText":
      case "nextButtonText":
      case "grouped":
      case "groupTemplate":
        this._setListOption(n);
        break;
      case "searchStartEvent":
        if ((t = this._searchBox) !== null && t !== undefined) {
          t.option("valueChangeEvent", o);
        }
        break;
      case "onScroll":
        this._initScrollAction();
        break;
      case "pageLoadMode":
        this._setListOption("pageLoadMode", this.option("pageLoadMode"));
        break;
      case "cleanSearchOnOpening":
      case "_scrollToSelectedItemEnabled":
        break;
      case "dropDownOptions":
        switch (i) {
          case "dropDownOptions.width":
          case "dropDownOptions.height":
            this._popupOptionChanged({
              name: n,
              fullName: i,
              value: o === "auto" ? this.initialOption("dropDownOptions")[(0, h.getFieldName)(i)] : o
            });
            this._options.cache("dropDownOptions", this.option("dropDownOptions"));
            break;
          default:
            this.callBase.apply(this, arguments);
        }
        break;
      case "dropDownCentered":
        if (this.option("_scrollToSelectedItemEnabled")) {
          this.option("dropDownOptions.position", undefined);
          this._renderPopup();
        }
        break;
      default:
        this.callBase.apply(this, arguments);
    }
  },
  focus: function () {
    if (this.option("opened")) {
      this._setFocusPolicy();
    } else {
      a.default.trigger(this._focusTarget(), "focus");
    }
  },
  field: function () {
    return this._$field;
  }
});
(0, g.default)("dxLookup", T);
var E = T;
exports.default = E;
module.exports = exports.default;
module.exports.default = exports.default;