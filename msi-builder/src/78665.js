exports.default = undefined;
var i = m(require("./68374.js"));
var o = require("./20576.js");
var a = require("./35922.js");
var r = require("./13306.js");
var s = require("./95479.js");
var l = require("./62754.js");
var u = require("./6415.js");
var d = m(require("./17381.js"));
var c = m(require("./73349.js"));
var h = m(require("./28109.js"));
var f = m(require("./99393.js"));
var p = m(require("./32468.js"));
require("./20551.js");
var g = require("./39611.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _ = p.default.inherit({
  _supportedKeys: function () {
    var e = this;
    var t = this.callBase();
    function n(e) {
      if (this._isEditable()) {
        if (this._valueSubstituted()) {
          this._preventFiltering = true;
        }
      } else if (this.option("showClearButton")) {
        e.preventDefault();
        this.reset();
      }
      this._savedTextRemoveEvent = e;
      this._preventSubstitution = true;
    }
    function i() {
      if (e.option("searchEnabled") && e._valueSubstituted()) {
        e._searchHandler();
      }
    }
    return (0, r.extend)({}, t, {
      tab: function () {
        if (this.option("opened") && this.option("applyValueMode") === "instantly") {
          this._resetCaretPosition(true);
        }
        if (t.tab) {
          t.tab.apply(this, arguments);
        }
        this._cancelSearchIfNeed();
      },
      upArrow: function (e) {
        if (t.upArrow.apply(this, arguments)) {
          if (!this.option("opened")) {
            this._setNextValue(e);
          }
          return true;
        }
      },
      downArrow: function (e) {
        if (t.downArrow.apply(this, arguments)) {
          if (!this.option("opened")) {
            this._setNextValue(e);
          }
          return true;
        }
      },
      leftArrow: function () {
        i();
        if (t.leftArrow) {
          t.leftArrow.apply(this, arguments);
        }
      },
      rightArrow: function () {
        i();
        if (t.rightArrow) {
          t.rightArrow.apply(this, arguments);
        }
      },
      home: function () {
        i();
        if (t.home) {
          t.home.apply(this, arguments);
        }
      },
      end: function () {
        i();
        if (t.end) {
          t.end.apply(this, arguments);
        }
      },
      escape: function () {
        var e = t.escape && t.escape.apply(this, arguments);
        this._cancelEditing();
        return e == null || e;
      },
      enter: function (e) {
        var n = this.option("opened");
        var i = this._input().val().trim();
        var o = i && this._list && !this._list.option("focusedElement");
        if (!i && (0, a.isDefined)(this.option("value")) && this.option("allowClearing")) {
          this._saveValueChangeEvent(e);
          this.option({
            selectedItem: null,
            value: null
          });
          this.close();
        } else {
          if (this.option("acceptCustomValue")) {
            e.preventDefault();
            if (o) {
              if (n) {
                this._toggleOpenState();
              }
              this._valueChangeEventHandler(e);
            }
            return n;
          }
          if (t.enter && t.enter.apply(this, arguments)) {
            return n;
          }
        }
      },
      space: function (e) {
        var t = this.option("opened");
        var n = this.option("searchEnabled");
        var i = this.option("acceptCustomValue");
        if (t && !n && !i) {
          e.preventDefault();
          this._valueChangeEventHandler(e);
          return true;
        }
      },
      backspace: n,
      del: n
    });
  },
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      placeholder: h.default.format("Select"),
      fieldTemplate: null,
      customItemCreateEvent: "change",
      valueChangeEvent: "change",
      acceptCustomValue: false,
      onCustomItemCreating: function (e) {
        if (!(0, a.isDefined)(e.customItem)) {
          e.customItem = e.text;
        }
      },
      showSelectionControls: false,
      allowClearing: true,
      tooltipEnabled: false,
      openOnFieldClick: true,
      showDropDownButton: true,
      displayCustomValue: false,
      useHiddenSubmitElement: true
    });
  },
  _init: function () {
    this.callBase();
    this._initCustomItemCreatingAction();
  },
  _initMarkup: function () {
    this.$element().addClass("dx-selectbox");
    this._renderTooltip();
    this.callBase();
    this._$container.addClass("dx-selectbox-container");
  },
  _createPopup: function () {
    this.callBase();
    this._popup.$element().addClass("dx-selectbox-popup");
    this._popup.$overlayContent().attr("tabindex", -1);
  },
  _popupWrapperClass: function () {
    return this.callBase() + " dx-selectbox-popup-wrapper";
  },
  _setDeprecatedOptions: function () {
    this.callBase();
    (0, r.extend)(this._deprecatedOptions, {
      valueChangeEvent: {
        since: "22.2",
        alias: "customItemCreateEvent"
      }
    });
  },
  _cancelEditing: function () {
    if (!this.option("searchEnabled") && this._list) {
      this._focusListElement(null);
      this._updateField(this.option("selectedItem"));
    }
  },
  _renderOpenedState: function () {
    this.callBase();
    if (this.option("opened")) {
      this._scrollToSelectedItem();
      this._focusSelectedElement();
    }
  },
  _focusSelectedElement: function () {
    if (this._searchValue()) {
      var t = this.option();
      var n = t.items;
      var i = t.selectedItem;
      var o = this._list._itemElements();
      var a = (n == null ? undefined : n.indexOf(i)) ?? -1;
      var r = a === -1 || this._isCustomItemSelected() ? null : o.eq(a);
      this._focusListElement(r);
    } else {
      this._focusListElement(null);
    }
  },
  _renderFocusedElement: function () {
    if (this._list) {
      if (this._searchValue() && !this.option("acceptCustomValue")) {
        var e = this._list._itemElements().not(".dx-state-disabled").eq(0);
        this._focusListElement(e);
      } else {
        this._focusListElement(null);
      }
    }
  },
  _focusListElement: function (e) {
    this._preventInputValueRender = true;
    this._list.option("focusedElement", (0, u.getPublicElement)(e));
    delete this._preventInputValueRender;
  },
  _scrollToSelectedItem: function () {
    if (this._list) {
      this._list.scrollToItem(this._list.option("selectedItem"));
    }
  },
  _listContentReadyHandler: function () {
    this.callBase();
    if (!this._dataController.paginate() || !this._needPopupRepaint()) {
      this._scrollToSelectedItem();
    }
  },
  _renderValue: function () {
    this._renderInputValue();
    this._setSubmitValue();
    return new l.Deferred().resolve();
  },
  _renderInputValue: function () {
    return this.callBase().always(function () {
      this._renderInputValueAsync();
    }.bind(this));
  },
  _renderInputValueAsync: function () {
    this._renderTooltip();
    this._renderInputValueImpl().always(function () {
      this._refreshSelected();
    }.bind(this));
  },
  _renderInputValueImpl: function () {
    this._renderField();
    return new l.Deferred().resolve();
  },
  _setNextItem: function (e) {
    var t = this._calcNextItem(e);
    var n = this._valueGetter(t);
    this._setValue(n);
  },
  _setNextValue: function (e) {
    (this._dataController.isLoaded() ? new l.Deferred().resolve() : this._dataController.load()).done(function () {
      var t = this._getSelectedIndex();
      var n = this._dataController.pageSize();
      var i = this._dataController.isLastPage();
      var o = t === this._items().length - 1;
      this._saveValueChangeEvent(e);
      var a = (0, g.normalizeKeyName)(e) === "downArrow" ? 1 : -1;
      if (n && !i && o && a > 0) {
        if (!this._popup) {
          this._createPopup();
        }
        if (!this._dataController.isLoading()) {
          this._list._loadNextPage().done(this._setNextItem.bind(this, a));
        }
      } else {
        this._setNextItem(a);
      }
    }.bind(this));
  },
  _setSelectedItem: function (e) {
    var t = !this._isCustomValueAllowed() && e === undefined;
    this.callBase(t ? null : e);
    if (!t && (!this._isEditable() || !!this._isCustomItemSelected())) {
      this._setListOption("selectedItem", this.option("selectedItem"));
    }
  },
  _isCustomValueAllowed: function () {
    return this.option("acceptCustomValue") || this.callBase();
  },
  _displayValue: function (e) {
    e = !(0, a.isDefined)(e) && this._isCustomValueAllowed() ? this.option("value") : e;
    return this.callBase(e);
  },
  _listConfig: function () {
    var e = (0, r.extend)(this.callBase(), {
      pageLoadMode: "scrollBottom",
      onSelectionChanged: this._getSelectionChangeHandler(),
      selectedItem: this.option("selectedItem"),
      onFocusedItemChanged: this._listFocusedItemChangeHandler.bind(this)
    });
    if (this.option("showSelectionControls")) {
      (0, r.extend)(e, {
        showSelectionControls: true,
        selectByClick: true
      });
    }
    return e;
  },
  _listFocusedItemChangeHandler: function (e) {
    if (!this._preventInputValueRender) {
      var t = e.component;
      var n = (0, i.default)(t.option("focusedElement"));
      var o = t._getItemData(n);
      this._updateField(o);
    }
  },
  _updateField: function (e) {
    if (!this._getTemplateByOption("fieldTemplate") || !this.option("fieldTemplate")) {
      var t = this._displayGetter(e);
      this.option("text", t);
      this._renderDisplayText(t);
      return;
    }
    this._renderField();
  },
  _getSelectionChangeHandler: function () {
    if (this.option("showSelectionControls")) {
      return this._selectionChangeHandler.bind(this);
    } else {
      return o.noop;
    }
  },
  _selectionChangeHandler: function (e) {
    (0, s.each)(e.addedItems || [], function (e, t) {
      this._setValue(this._valueGetter(t));
    }.bind(this));
  },
  _getActualSearchValue: function () {
    return this._dataController.searchValue();
  },
  _toggleOpenState: function (e) {
    if (!this.option("disabled")) {
      if (!(e = arguments.length ? e : !this.option("opened")) && !this._shouldClearFilter()) {
        this._restoreInputText(true);
      }
      if (this._wasSearch() && e) {
        this._wasSearch(false);
        var t = this.option("showDataBeforeSearch") || this._isMinSearchLengthExceeded();
        if (t && this._dataController.getDataSource()) {
          if (this._searchTimer) {
            return;
          }
          var n = this._getActualSearchValue();
          if (n) {
            this._wasSearch(true);
          }
          this._filterDataSource(n || null);
        } else {
          this._setListOption("items", []);
        }
      }
      if (e) {
        this._scrollToSelectedItem();
      }
      this.callBase(e);
    }
  },
  _renderTooltip: function () {
    if (this.option("tooltipEnabled")) {
      this.$element().attr("title", this.option("displayValue"));
    }
  },
  _renderDimensions: function () {
    this.callBase();
    this._updatePopupWidth();
    this._updateListDimensions();
  },
  _isValueEqualInputText: function () {
    var e = this.option("selectedItem");
    if (e === null) {
      return false;
    }
    var t = this._displayGetter(e);
    return (t ? String(t) : "") === this._searchValue();
  },
  _popupHidingHandler: function () {
    if (this._isValueEqualInputText()) {
      this._cancelEditing();
    }
    this.callBase();
  },
  _popupHiddenHandler: function () {
    this.callBase();
    if (this._shouldCancelSearch()) {
      this._wasSearch(false);
      this._searchCanceled();
      this._shouldCancelSearch(false);
    }
  },
  _restoreInputText: function (e) {
    if (!this.option("readOnly")) {
      if (this._loadItemDeferred) {
        this._loadItemDeferred.always(function () {
          var t = this.option();
          var n = t.acceptCustomValue;
          var i = t.text;
          var a = t.selectedItem;
          if (n) {
            if (!e && !this._isValueChanging) {
              this._updateField(a ?? this._createCustomItem(i));
              this._clearFilter();
            }
          } else if (this.option("searchEnabled") && !this._searchValue() && this.option("allowClearing")) {
            this._clearTextValue();
          } else if (!this._isValueEqualInputText()) {
            this._renderInputValue().always(function (e) {
              var t = (0, o.ensureDefined)(e, a);
              this._setSelectedItem(t);
              this._updateField(t);
              this._clearFilter();
            }.bind(this));
          }
        }.bind(this));
      }
    }
  },
  _valueChangeEventIncludesBlur: function () {
    return this.option(this._getValueChangeEventOptionName()).includes("blur");
  },
  _isPreventedFocusOutEvent: function (e) {
    return this._preventNestedFocusEvent(e) || this._valueChangeEventIncludesBlur();
  },
  _focusOutHandler: function (e) {
    if (!this._isPreventedFocusOutEvent(e)) {
      if (!this._isOverlayNestedTarget(e.relatedTarget)) {
        this._restoreInputText();
        this._clearSearchTimer();
      }
      this._cancelSearchIfNeed(e);
    }
    e.target = this._input().get(0);
    this.callBase(e);
  },
  _cancelSearchIfNeed: function (e) {
    var t = this.option().searchEnabled;
    var n = this._isOverlayNestedTarget(e == null ? undefined : e.relatedTarget);
    if (this._wasSearch() && t && !n) {
      var o = this._popup?._hideAnimationProcessing;
      this._clearSearchTimer();
      if (o) {
        this._shouldCancelSearch(true);
      } else {
        this._wasSearch(false);
        this._searchCanceled();
      }
    }
  },
  _shouldCancelSearch: function (e) {
    if (!arguments.length) {
      return this._shouldCancelSearchValue;
    }
    this._shouldCancelSearchValue = e;
  },
  _isOverlayNestedTarget: function (e) {
    return !!(0, i.default)(e).closest(`.dx-selectbox-popup-wrapper`).length;
  },
  _clearTextValue: function () {
    var e = this.option("selectedItem");
    var t = this._displayGetter(e);
    if (e && t !== "") {
      if (this._savedTextRemoveEvent) {
        this._saveValueChangeEvent(this._savedTextRemoveEvent);
      }
      this.option("value", null);
    }
    delete this._savedTextRemoveEvent;
  },
  _shouldOpenPopup: function () {
    return this._needPassDataSourceToList() && this._wasSearch();
  },
  _isFocused: function () {
    var e = c.default.getActiveElement(this.element());
    return this.callBase() && (0, i.default)(e).closest(this._input()).length > 0;
  },
  _getValueChangeEventOptionName: function () {
    return "customItemCreateEvent";
  },
  _renderValueChangeEvent: function () {
    if (this._isEditable()) {
      this.callBase();
    }
  },
  _fieldRenderData: function () {
    var e = this._list && this.option("opened") && (0, i.default)(this._list.option("focusedElement"));
    if (e && e.length) {
      return this._list._getItemData(e);
    } else {
      return this.option("selectedItem");
    }
  },
  _isSelectedValue: function (e) {
    return this._isValueEquals(e, this.option("value"));
  },
  _shouldCloseOnItemClick: function () {
    return !this.option("showSelectionControls") || this.option("selectionMode") === "single";
  },
  _listItemClickHandler: function (e) {
    var t = this._getCurrentValue();
    this._focusListElement((0, i.default)(e.itemElement));
    this._saveValueChangeEvent(e.event);
    this._completeSelection(this._valueGetter(e.itemData));
    if (this._shouldCloseOnItemClick()) {
      this.option("opened", false);
    }
    if (this.option("searchEnabled") && t === this._valueGetter(e.itemData)) {
      this._updateField(e.itemData);
    }
    if (this._shouldClearFilter()) {
      this._cancelSearchIfNeed();
    }
  },
  _shouldClearFilter: function () {
    return this._wasSearch();
  },
  _completeSelection: function (e) {
    this._setValue(e);
  },
  _loadItem: function (e, t) {
    var n = this;
    var i = new l.Deferred();
    this.callBase(e, t).done(function (e) {
      i.resolve(e);
    }.bind(this)).fail(function (t) {
      if (t == null || !t.shouldSkipCallback) {
        var o = n.option("selectedItem");
        if (n.option("acceptCustomValue") && e === n._valueGetter(o)) {
          i.resolve(o);
        } else {
          i.reject();
        }
      }
    }.bind(this));
    return i.promise();
  },
  _loadInputValue: function (e, t) {
    this._loadItemDeferred = this._loadItem(e).always(t);
    return this._loadItemDeferred;
  },
  _isCustomItemSelected: function () {
    var e = this.option("selectedItem");
    var t = this._searchValue();
    var n = this._displayGetter(e);
    return !n || t !== n.toString();
  },
  _valueChangeEventHandler: function (e) {
    if (this.option("acceptCustomValue") && this._isCustomItemSelected() && !this._isValueChanging) {
      this._isValueChanging = true;
      this._customItemAddedHandler(e);
    }
  },
  _initCustomItemCreatingAction: function () {
    this._customItemCreatingAction = this._createActionByOption("onCustomItemCreating");
  },
  _createCustomItem: function (e) {
    var t = {
      text: e
    };
    var n = this._customItemCreatingAction(t);
    var i = (0, o.ensureDefined)(n, t.customItem);
    if ((0, a.isDefined)(n)) {
      d.default.log("W0015", "onCustomItemCreating", "customItem");
    }
    return i;
  },
  _customItemAddedHandler: function (e) {
    var t = this._searchValue();
    var n = this._createCustomItem(t);
    this._saveValueChangeEvent(e);
    if (n === undefined) {
      this._renderValue();
      throw d.default.Error("E0121");
    }
    if ((0, a.isPromise)(n)) {
      (0, l.fromPromise)(n).done(this._setCustomItem.bind(this)).fail(this._setCustomItem.bind(this, null));
    } else {
      this._setCustomItem(n);
    }
  },
  _setCustomItem: function (e) {
    if (!this._disposed) {
      e = e || null;
      this.option("selectedItem", e);
      this._cancelSearchIfNeed();
      this._setValue(this._valueGetter(e));
      this._renderDisplayText(this._displayGetter(e));
      this._isValueChanging = false;
    }
  },
  _clearValueHandler: function (e) {
    this._preventFiltering = true;
    this.callBase(e);
    this._searchCanceled();
    return false;
  },
  _wasSearch: function (e) {
    if (!arguments.length) {
      return !!this._wasSearchValue;
    }
    this._wasSearchValue = e;
  },
  _searchHandler: function () {
    if (this._preventFiltering) {
      delete this._preventFiltering;
    } else {
      if (this._needPassDataSourceToList()) {
        this._wasSearch(true);
      }
      this.callBase(arguments);
    }
  },
  _dataSourceFiltered: function (e) {
    this.callBase();
    if (e !== null) {
      this._renderInputSubstitution();
      this._renderFocusedElement();
    }
  },
  _valueSubstituted: function () {
    var e = this._input().get(0);
    var t = this._searchValue().length;
    var n = e.selectionStart === 0 && e.selectionEnd === t;
    var i = e.selectionStart !== e.selectionEnd;
    var o = t === e.selectionEnd;
    return this._wasSearch() && i && !n && o && this._shouldSubstitutionBeRendered();
  },
  _shouldSubstitutionBeRendered: function () {
    return !this._preventSubstitution && this.option("searchEnabled") && !this.option("acceptCustomValue") && this.option("searchMode") === "startswith";
  },
  _renderInputSubstitution: function () {
    if (this._shouldSubstitutionBeRendered()) {
      var e = this._list && this._getPlainItems(this._list.option("items"))[0];
      if (e) {
        var t = this._input();
        var n = t.val().length;
        if (n !== 0) {
          var i = t.get(0);
          var o = this._displayGetter(e).toString();
          i.value = o;
          this._caret({
            start: n,
            end: o.length
          });
        }
      }
    } else {
      delete this._preventSubstitution;
    }
  },
  _dispose: function () {
    this._renderInputValueAsync = o.noop;
    delete this._loadItemDeferred;
    this.callBase();
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "customItemCreateEvent":
        this._refreshValueChangeEvent();
        this._refreshFocusEvent();
        this._refreshEvents();
        break;
      case "onCustomItemCreating":
        this._initCustomItemCreatingAction();
        break;
      case "tooltipEnabled":
        this._renderTooltip();
        break;
      case "displayCustomValue":
      case "acceptCustomValue":
      case "showSelectionControls":
        this._invalidate();
        break;
      case "allowClearing":
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, f.default)("dxSelectBox", _);
var v = _;
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;