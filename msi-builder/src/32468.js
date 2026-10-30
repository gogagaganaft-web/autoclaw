exports.default = undefined;
var i = require("./58664.js");
var o = S(require("./68374.js"));
var a = require("./58201.js");
var r = S(require("./55994.js"));
var s = S(require("./73176.js"));
var l = S(require("./99393.js"));
var u = require("./20576.js");
var d = require("./35922.js");
var c = require("./13306.js");
var h = S(require("./44687.js"));
var f = S(require("./56757.js"));
var p = S(require("./96688.js"));
var g = require("./39611.js");
var m = S(require("./20530.js"));
var _ = S(require("./96687.js"));
var v = require("./95479.js");
var y = S(require("./88718.js"));
var b = S(require("./28109.js"));
var x = require("./91627.js");
var w = require("./62754.js");
var C = S(require("./37178.js"));
function S(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function k(e) {
  return (k = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var D = (0, a.getWindow)();
var I = ["startswith", "contains", "endwith", "notcontains"];
var T = m.default.real().platform !== "android";
var E = h.default.inherit({
  _supportedKeys: function () {
    var e = this.callBase();
    return (0, c.extend)({}, e, {
      tab: function (t) {
        if (this._allowSelectItemByTab()) {
          this._saveValueChangeEvent(t);
          var n = (0, o.default)(this._list.option("focusedElement"));
          if (n.length) {
            this._setSelectedElement(n);
          }
        }
        e.tab.apply(this, arguments);
      },
      space: u.noop,
      home: u.noop,
      end: u.noop
    });
  },
  _allowSelectItemByTab: function () {
    return this.option("opened") && this.option("applyValueMode") === "instantly";
  },
  _setSelectedElement: function (e) {
    var t = this._valueGetter(this._list._getItemData(e));
    this._setValue(t);
  },
  _setValue: function (e) {
    this.option("value", e);
  },
  _getDefaultOptions: function () {
    return (0, c.extend)(this.callBase(), (0, c.extend)(y.default._dataExpressionDefaultOptions(), {
      displayValue: undefined,
      searchEnabled: false,
      searchMode: "contains",
      searchTimeout: 500,
      minSearchLength: 0,
      searchExpr: null,
      valueChangeEvent: "input change keyup",
      selectedItem: null,
      noDataText: b.default.format("dxCollectionWidget-noDataText"),
      encodeNoDataText: false,
      onSelectionChanged: null,
      onItemClick: u.noop,
      showDataBeforeSearch: false,
      grouped: false,
      groupTemplate: "group",
      popupPosition: {
        my: "left top",
        at: "left bottom",
        offset: {
          h: 0,
          v: 0
        },
        collision: "flip"
      },
      wrapItemText: false,
      useItemTextAsTitle: false
    }));
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: {
        platform: "ios"
      },
      options: {
        popupPosition: {
          offset: {
            v: -1
          }
        }
      }
    }, {
      device: {
        platform: "generic"
      },
      options: {
        buttonsLocation: "bottom center"
      }
    }]);
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, c.extend)(this._optionsByReference, {
      value: true,
      selectedItem: true,
      displayValue: true
    });
  },
  _init: function () {
    this.callBase();
    this._initDataExpressions();
    this._initActions();
    this._setListDataSource();
    this._validateSearchMode();
    this._clearSelectedItem();
    this._initItems();
  },
  _setListFocusedElementOptionChange: function () {
    this._list._updateParentActiveDescendant = this._updateActiveDescendant.bind(this);
  },
  _initItems: function () {
    var e = this.option().items;
    if (e && !e.length && this._dataSource) {
      this.option().items = this._dataSource.items();
    }
  },
  _initActions: function () {
    this._initContentReadyAction();
    this._initSelectionChangedAction();
    this._initItemClickAction();
  },
  _initContentReadyAction: function () {
    this._contentReadyAction = this._createActionByOption("onContentReady", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _initSelectionChangedAction: function () {
    this._selectionChangedAction = this._createActionByOption("onSelectionChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _initItemClickAction: function () {
    this._itemClickAction = this._createActionByOption("onItemClick");
  },
  _initTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      item: new x.ChildDefaultTemplate("item")
    });
  },
  _isEditable: function () {
    return this.callBase() || this.option("searchEnabled");
  },
  _saveFocusOnWidget: function (e) {
    if (this._list && this._list.initialOption("focusStateEnabled")) {
      this._focusInput();
    }
  },
  _fitIntoRange: function (e, t, n) {
    if (e > n) {
      return t;
    } else if (e < t) {
      return n;
    } else {
      return e;
    }
  },
  _items: function () {
    var e = this._getPlainItems(!this._list && this._dataSource.items());
    return new _.default(e).filter("disabled", "<>", true).toArray();
  },
  _calcNextItem: function (e) {
    var t = this._items();
    return t[this._fitIntoRange(this._getSelectedIndex() + e, 0, t.length - 1)];
  },
  _getSelectedIndex: function () {
    var e = this._items();
    var t = this.option("selectedItem");
    var n = -1;
    (0, v.each)(e, function (e, i) {
      if (this._isValueEquals(i, t)) {
        n = e;
        return false;
      }
    }.bind(this));
    return n;
  },
  _createPopup: function () {
    this.callBase();
    this._updateCustomBoundaryContainer();
    this._popup.$wrapper().addClass(this._popupWrapperClass());
    var e = this._popup.$content();
    r.default.off(e, "mouseup");
    r.default.on(e, "mouseup", this._saveFocusOnWidget.bind(this));
  },
  _updateCustomBoundaryContainer: function () {
    var e = this.option("dropDownOptions.container");
    var t = e && (0, o.default)(e);
    if (t && t.length && !(0, d.isWindow)(t.get(0))) {
      var n = [].slice.call(t.parents());
      n.unshift(t.get(0));
      (0, v.each)(n, function (e, t) {
        return t !== (0, o.default)("body").get(0) && (D.getComputedStyle(t).overflowY === "hidden" ? (this._$customBoundaryContainer = (0, o.default)(t), false) : undefined);
      }.bind(this));
    }
  },
  _popupWrapperClass: function () {
    return "dx-dropdownlist-popup-wrapper";
  },
  _renderInputValue: function () {
    var e = this._getCurrentValue();
    this._rejectValueLoading();
    return this._loadInputValue(e, this._setSelectedItem.bind(this)).always(this.callBase.bind(this, e));
  },
  _loadInputValue: function (e, t) {
    return this._loadItem(e).always(t);
  },
  _getItemFromPlain: function (e, t) {
    var n;
    var i;
    if (t && k(e) !== "object") {
      if (!t.itemByValue) {
        t.itemByValue = {};
        (n = this._getPlainItems()).forEach(function (e) {
          t.itemByValue[this._valueGetter(e)] = e;
        }, this);
      }
      i = t.itemByValue[e];
    }
    if (!i) {
      n = this._getPlainItems();
      i = (0, u.grep)(n, function (t) {
        return this._isValueEquals(this._valueGetter(t), e);
      }.bind(this))[0];
    }
    return i;
  },
  _loadItem: function (e, t) {
    var n = this._getItemFromPlain(e, t);
    if (n !== undefined) {
      return new w.Deferred().resolve(n).promise();
    } else {
      return this._loadValue(e);
    }
  },
  _getPlainItems: function (e) {
    var t = [];
    e = e || this.option("items") || this._dataSource.items() || [];
    for (var n = 0; n < e.length; n++) {
      if (e[n] && e[n].items) {
        t = t.concat(e[n].items);
      } else {
        t.push(e[n]);
      }
    }
    return t;
  },
  _updateActiveDescendant: function () {
    var e;
    var t = this.option("opened");
    var n = (e = this._list) === null || e === undefined ? undefined : e.getFocusedItemId();
    var i = (0, o.default)(`#${n}`).length > 0;
    var a = t && i && n;
    this.setAria({
      activedescendant: a || null
    });
  },
  _setSelectedItem: function (e) {
    var t = this._displayValue(e);
    this.option("selectedItem", (0, u.ensureDefined)(e, null));
    this.option("displayValue", t);
  },
  _displayValue: function (e) {
    return this._displayGetter(e);
  },
  _refreshSelected: function () {
    var e = {};
    this._listItemElements().each(function (t, n) {
      var i = (0, o.default)(n);
      var a = this._valueGetter(i.data("dxListItemData"));
      if (this._isSelectedValue(a, e)) {
        this._list.selectItem(i);
      } else {
        this._list.unselectItem(i);
      }
    }.bind(this));
  },
  _popupShownHandler: function () {
    this.callBase();
    this._setFocusPolicy();
  },
  _setFocusPolicy: function () {
    if (this.option("focusStateEnabled") && this._list) {
      this._list.option("focusedElement", null);
    }
  },
  _isSelectedValue: function (e) {
    return this._isValueEquals(e, this.option("value"));
  },
  _validateSearchMode: function () {
    var e = this.option("searchMode");
    var t = e.toLowerCase();
    if (!I.includes(t)) {
      throw p.default.Error("E1019", e);
    }
  },
  _clearSelectedItem: function () {
    this.option("selectedItem", null);
  },
  _processDataSourceChanging: function () {
    this._initDataController();
    this._setListOption("_dataController", this._dataController);
    this._setListDataSource();
    this._renderInputValue().fail(function () {
      if (!this._isCustomValueAllowed()) {
        this._clearSelectedItem();
      }
    }.bind(this));
  },
  _isCustomValueAllowed: function () {
    return this.option("displayCustomValue");
  },
  reset: function () {
    this.callBase();
    this._clearFilter();
    this._clearSelectedItem();
  },
  _listItemElements: function () {
    if (this._$list) {
      return this._$list.find(".dx-list-item");
    } else {
      return (0, o.default)();
    }
  },
  _popupConfig: function () {
    return (0, c.extend)(this.callBase(), {
      templatesRenderAsynchronously: false,
      autoResizeEnabled: false,
      maxHeight: this._getMaxHeight.bind(this)
    });
  },
  _renderPopupContent: function () {
    this.callBase();
    this._renderList();
  },
  _getKeyboardListeners: function () {
    var e = this._canListHaveFocus();
    return this.callBase().concat([!e && this._list]);
  },
  _renderList: function () {
    this._listId = "dx-" + new s.default()._value;
    var e = (0, o.default)("<div>").attr("id", this._listId).appendTo(this._popup.$content());
    this._$list = e;
    this._list = this._createComponent(e, f.default, this._listConfig());
    this._refreshList();
    this._renderPreventBlurOnListClick();
    this._setListFocusedElementOptionChange();
  },
  _renderPreventBlurOnListClick: function () {
    var e = (0, g.addNamespace)("mousedown", "dxDropDownList");
    r.default.off(this._$list, e);
    r.default.on(this._$list, e, function (e) {
      return e.preventDefault();
    });
  },
  _getControlsAria: function () {
    return this._list && this._listId;
  },
  _renderOpenedState: function () {
    this.callBase();
    if (this._list) {
      this._updateActiveDescendant();
    }
    this.setAria("owns", this._popup && this._popupContentId);
  },
  _setDefaultAria: function () {
    this.setAria({
      haspopup: "listbox",
      autocomplete: "list"
    });
  },
  _refreshList: function () {
    if (this._list && this._shouldRefreshDataSource()) {
      this._setListDataSource();
    }
  },
  _shouldRefreshDataSource: function () {
    return !!this._list.option("dataSource") !== this._needPassDataSourceToList();
  },
  _isDesktopDevice: function () {
    return m.default.real().deviceType === "desktop";
  },
  _listConfig: function () {
    var e = {
      selectionMode: "single",
      _templates: this.option("_templates"),
      templateProvider: this.option("templateProvider"),
      noDataText: this.option("noDataText"),
      encodeNoDataText: this.option("encodeNoDataText"),
      grouped: this.option("grouped"),
      wrapItemText: this.option("wrapItemText"),
      useItemTextAsTitle: this.option("useItemTextAsTitle"),
      onContentReady: this._listContentReadyHandler.bind(this),
      itemTemplate: this.option("itemTemplate"),
      indicateLoading: false,
      keyExpr: this._getCollectionKeyExpr(),
      displayExpr: this._displayGetterExpr(),
      groupTemplate: this.option("groupTemplate"),
      onItemClick: this._listItemClickAction.bind(this),
      dataSource: this._getDataSource(),
      _dataController: this._dataController,
      hoverStateEnabled: !!this._isDesktopDevice() && this.option("hoverStateEnabled"),
      focusStateEnabled: !!this._isDesktopDevice() && this.option("focusStateEnabled")
    };
    if (!this._canListHaveFocus()) {
      e.tabIndex = null;
    }
    return e;
  },
  _canListHaveFocus: function () {
    return false;
  },
  _getDataSource: function () {
    if (this._needPassDataSourceToList()) {
      return this._dataSource;
    } else {
      return null;
    }
  },
  _dataSourceOptions: function () {
    return {
      paginate: false
    };
  },
  _getGroupedOption: function () {
    return this.option("grouped");
  },
  _dataSourceFromUrlLoadMode: function () {
    return "raw";
  },
  _listContentReadyHandler: function () {
    this._list = this._list || this._$list.dxList("instance");
    if (!this.option("deferRendering")) {
      this._refreshSelected();
    }
    this._updatePopupWidth();
    this._updateListDimensions();
    this._contentReadyAction();
  },
  _setListOption: function (e, t) {
    this._setWidgetOption("_list", arguments);
  },
  _listItemClickAction: function (e) {
    this._listItemClickHandler(e);
    this._itemClickAction(e);
  },
  _listItemClickHandler: u.noop,
  _setListDataSource: function () {
    if (this._list) {
      this._setListOption("dataSource", this._getDataSource());
      if (!this._needPassDataSourceToList()) {
        this._setListOption("items", []);
      }
    }
  },
  _needPassDataSourceToList: function () {
    return this.option("showDataBeforeSearch") || this._isMinSearchLengthExceeded();
  },
  _isMinSearchLengthExceeded: function () {
    return this._searchValue().toString().length >= this.option("minSearchLength");
  },
  _needClearFilter: function () {
    return !this._canKeepDataSource() && this._needPassDataSourceToList();
  },
  _canKeepDataSource: function () {
    var e = this._isMinSearchLengthExceeded();
    return this._dataController.isLoaded() && this.option("showDataBeforeSearch") && this.option("minSearchLength") && !e && !this._isLastMinSearchLengthExceeded;
  },
  _searchValue: function () {
    return this._input().val() || "";
  },
  _getSearchEvent: function () {
    return (0, g.addNamespace)("input", this.NAME + "Search");
  },
  _getCompositionStartEvent: function () {
    return (0, g.addNamespace)("compositionstart", this.NAME + "CompositionStart");
  },
  _getCompositionEndEvent: function () {
    return (0, g.addNamespace)("compositionend", this.NAME + "CompositionEnd");
  },
  _getSetFocusPolicyEvent: function () {
    return (0, g.addNamespace)("input", this.NAME + "FocusPolicy");
  },
  _renderEvents: function () {
    var e = this;
    this.callBase();
    r.default.on(this._input(), this._getSetFocusPolicyEvent(), function () {
      e._setFocusPolicy();
    });
    if (this._shouldRenderSearchEvent()) {
      r.default.on(this._input(), this._getSearchEvent(), function (t) {
        e._searchHandler(t);
      });
      if (T) {
        r.default.on(this._input(), this._getCompositionStartEvent(), function () {
          e._isTextCompositionInProgress(true);
        });
        r.default.on(this._input(), this._getCompositionEndEvent(), function (t) {
          e._isTextCompositionInProgress(undefined);
          e._searchHandler(t, e._searchValue());
        });
      }
    }
  },
  _shouldRenderSearchEvent: function () {
    return this.option("searchEnabled");
  },
  _refreshEvents: function () {
    r.default.off(this._input(), this._getSearchEvent());
    r.default.off(this._input(), this._getSetFocusPolicyEvent());
    if (T) {
      r.default.off(this._input(), this._getCompositionStartEvent());
      r.default.off(this._input(), this._getCompositionEndEvent());
    }
    this.callBase();
  },
  _isTextCompositionInProgress: function (e) {
    if (!arguments.length) {
      return this._isTextComposition;
    }
    this._isTextComposition = e;
  },
  _searchHandler: function (e, t) {
    var n = this;
    if (!this._isTextCompositionInProgress()) {
      if (this._isMinSearchLengthExceeded()) {
        var i = this.option("searchTimeout");
        if (i) {
          this._clearSearchTimer();
          this._searchTimer = setTimeout(function () {
            n._searchDataSource(t);
          }, i);
        } else {
          this._searchDataSource(t);
        }
      } else {
        this._searchCanceled();
      }
    }
  },
  _searchCanceled: function () {
    this._clearSearchTimer();
    if (this._needClearFilter()) {
      this._filterDataSource(null);
    }
    this._refreshList();
  },
  _searchDataSource: function (e = this._searchValue()) {
    this._filterDataSource(e);
  },
  _filterDataSource: function (e) {
    this._clearSearchTimer();
    var t = this._dataController;
    t.searchExpr(this.option("searchExpr") || this._displayGetterExpr());
    t.searchOperation(this.option("searchMode"));
    t.searchValue(e);
    t.load().done(this._dataSourceFiltered.bind(this, e));
  },
  _clearFilter: function () {
    var e = this._dataController;
    if (e.searchValue()) {
      e.searchValue(null);
    }
  },
  _dataSourceFiltered: function () {
    this._isLastMinSearchLengthExceeded = this._isMinSearchLengthExceeded();
    this._refreshList();
    this._refreshPopupVisibility();
  },
  _shouldOpenPopup: function () {
    return this._hasItemsToShow();
  },
  _refreshPopupVisibility: function () {
    if (!this.option("readOnly") && this._searchValue()) {
      var e = this._shouldOpenPopup();
      if (!e || !!this._isFocused()) {
        this.option("opened", e);
        if (e) {
          this._updatePopupWidth();
          this._updateListDimensions();
        }
      }
    }
  },
  _dataSourceChangedHandler: function (e) {
    if (this._dataController.pageIndex() === 0) {
      this.option().items = e;
    } else {
      this.option().items = this.option().items.concat(e);
    }
  },
  _hasItemsToShow: function () {
    var e = (this._dataController.items() || []).length;
    return !!this._needPassDataSourceToList() && !!e;
  },
  _clearSearchTimer: function () {
    clearTimeout(this._searchTimer);
    delete this._searchTimer;
  },
  _popupShowingHandler: function () {
    this._updatePopupWidth();
    this._updateListDimensions();
  },
  _dimensionChanged: function () {
    this.callBase();
    this._updateListDimensions();
  },
  _needPopupRepaint: function () {
    var e = this._dataController;
    var t = e.pageIndex();
    var n = (0, d.isDefined)(this._pageIndex) && t <= this._pageIndex || e.isLastPage() && !this._list._scrollViewIsFull();
    this._pageIndex = t;
    return n;
  },
  _updateListDimensions: function () {
    if (this._popup) {
      if (this._needPopupRepaint()) {
        this._popup.repaint();
      }
      if (this._list) {
        this._list.updateDimensions();
      }
    }
  },
  _getMaxHeight: function () {
    var e = this.$element();
    var t = this._$customBoundaryContainer;
    var n = e.offset().top - (t ? t.offset().top : 0);
    var o = (0, i.getOuterHeight)(D);
    var a = t ? Math.min((0, i.getOuterHeight)(t), o) : o;
    var r = Math.max(n, a - n - (0, i.getOuterHeight)(e));
    return Math.min(a * 0.5, r);
  },
  _clean: function () {
    if (this._list) {
      delete this._list;
    }
    delete this._isLastMinSearchLengthExceeded;
    this.callBase();
  },
  _dispose: function () {
    this._clearSearchTimer();
    this.callBase();
  },
  _setCollectionWidgetOption: function () {
    this._setListOption.apply(this, arguments);
  },
  _setSubmitValue: function () {
    var e = this.option("value");
    var t = this._shouldUseDisplayValue(e) ? this._displayGetter(e) : e;
    this._getSubmitElement().val(t);
  },
  _shouldUseDisplayValue: function (e) {
    return this.option("valueExpr") === "this" && (0, d.isObject)(e);
  },
  _optionChanged: function (e) {
    this._dataExpressionOptionChanged(e);
    switch (e.name) {
      case "hoverStateEnabled":
      case "focusStateEnabled":
        if (this._isDesktopDevice()) {
          this._setListOption(e.name, e.value);
        }
        this.callBase(e);
        break;
      case "items":
        if (!this.option("dataSource")) {
          this._processDataSourceChanging();
        }
        break;
      case "dataSource":
        this._processDataSourceChanging();
        break;
      case "valueExpr":
        this._renderValue();
        this._setListOption("keyExpr", this._getCollectionKeyExpr());
        break;
      case "displayExpr":
        this._renderValue();
        this._setListOption("displayExpr", this._displayGetterExpr());
        break;
      case "searchMode":
        this._validateSearchMode();
        break;
      case "minSearchLength":
        this._refreshList();
        break;
      case "searchEnabled":
      case "showDataBeforeSearch":
      case "searchExpr":
        this._invalidate();
        break;
      case "onContentReady":
        this._initContentReadyAction();
        break;
      case "onSelectionChanged":
        this._initSelectionChangedAction();
        break;
      case "onItemClick":
        this._initItemClickAction();
        break;
      case "grouped":
      case "groupTemplate":
      case "wrapItemText":
      case "noDataText":
      case "encodeNoDataText":
      case "useItemTextAsTitle":
        this._setListOption(e.name);
        break;
      case "displayValue":
        this.option("text", e.value);
        break;
      case "itemTemplate":
      case "searchTimeout":
        break;
      case "selectedItem":
        if (e.previousValue !== e.value) {
          this._selectionChangedAction({
            selectedItem: e.value
          });
        }
        break;
      default:
        this.callBase(e);
    }
  }
}).include(y.default, C.default);
(0, l.default)("dxDropDownList", E);
var O = E;
exports.default = O;
module.exports = exports.default;
module.exports.default = exports.default;