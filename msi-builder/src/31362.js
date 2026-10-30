exports.default = undefined;
var i = require("./58664.js");
var o = E(require("./68374.js"));
var a = E(require("./20530.js"));
var r = require("./97906.js");
var s = E(require("./55994.js"));
var l = E(require("./99393.js"));
var u = require("./20576.js");
var d = require("./49601.js");
var c = require("./62754.js");
var h = require("./3532.js");
var f = require("./6415.js");
var p = require("./35922.js");
var g = require("./58201.js");
var m = require("./13306.js");
var _ = require("./95479.js");
var v = require("./89386.js");
var y = E(require("./28109.js"));
var b = require("./39611.js");
var x = require("./95429.js");
var w = E(require("./21516.js"));
var C = require("./9234.js");
var S = E(require("./73176.js"));
var k = E(require("./78665.js"));
var D = require("./93280.js");
var I = require("./51203.js");
var T = E(require("./96688.js"));
function E(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function O(e) {
  return (O = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var A = k.default.inherit({
  _supportedKeys: function () {
    var e = this;
    var t = this.callBase();
    function n(t) {
      return e._list._keyboardHandler(t);
    }
    var i = this.option("rtlEnabled");
    return (0, m.extend)({}, t, {
      backspace: function (e) {
        if (this._isCaretAtTheStart()) {
          this._processKeyboardEvent(e);
          this._isTagRemoved = true;
          var t = this._$focusedTag || this._tagElements().last();
          if (this._$focusedTag) {
            this._moveTagFocus("prev", true);
          }
          if (t.length !== 0) {
            this._preserveFocusedTag = true;
            this._removeTagElement(t);
            delete this._preserveFocusedTag;
          }
        }
      },
      upArrow: function (i, o) {
        if (i.altKey || !e._list) {
          return t.upArrow.call(e, i);
        } else {
          return n(o);
        }
      },
      downArrow: function (i, o) {
        if (i.altKey || !e._list) {
          return t.downArrow.call(e, i);
        } else {
          return n(o);
        }
      },
      del: function (e) {
        if (this._$focusedTag && this._isCaretAtTheStart()) {
          this._processKeyboardEvent(e);
          this._isTagRemoved = true;
          var t = this._$focusedTag;
          this._moveTagFocus("next", true);
          this._preserveFocusedTag = true;
          this._removeTagElement(t);
          delete this._preserveFocusedTag;
        }
      },
      enter: function (e, t) {
        var i = this._list && this._list.option("focusedElement") !== null;
        if (this.option("acceptCustomValue") && !i) {
          e.preventDefault();
          if (this._searchValue() !== "") {
            this._customItemAddedHandler(e);
          }
          return;
        }
        if (this.option("opened")) {
          this._saveValueChangeEvent(e);
          n(t);
          e.preventDefault();
        }
      },
      space: function (e, t) {
        var i = this.option("opened");
        var o = this._shouldRenderSearchEvent();
        if (i && !o) {
          this._saveValueChangeEvent(e);
          n(t);
          e.preventDefault();
        }
      },
      leftArrow: function (e) {
        if (!!this._isCaretAtTheStart() && !this._isEmpty() && (!this._isEditable() || !i || !!this._$focusedTag)) {
          e.preventDefault();
          var t = i ? "next" : "prev";
          this._moveTagFocus(t);
          if (!this.option("multiline")) {
            this._scrollContainer(t);
          }
        }
      },
      rightArrow: function (e) {
        if (this._isCaretAtTheStart() && !this._isEmpty() && (!this._isEditable() || i || this._$focusedTag)) {
          e.preventDefault();
          var t = i ? "prev" : "next";
          this._moveTagFocus(t);
          if (!this.option("multiline")) {
            this._scrollContainer(t);
          }
        }
      }
    });
  },
  _processKeyboardEvent: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
  },
  _isEmpty: function () {
    return this._getValue().length === 0;
  },
  _updateTagsContainer: function (e) {
    this._$tagsContainer = e.addClass("dx-tag-container");
  },
  _allowSelectItemByTab: function () {
    return false;
  },
  _isCaretAtTheStart: function () {
    var e = (0, w.default)(this._input());
    return e.start === 0 && e.end === 0;
  },
  _updateInputAriaActiveDescendant: function (e) {
    this.setAria("activedescendant", e, this._input());
  },
  _moveTagFocus: function (e, t) {
    if (!this._$focusedTag) {
      var n = this._tagElements();
      this._$focusedTag = e === "next" ? n.first() : n.last();
      this._toggleFocusClass(true, this._$focusedTag);
      this._updateInputAriaActiveDescendant(this._$focusedTag.attr("id"));
      return;
    }
    var i = this._$focusedTag[e](`.dx-tag`);
    if (i.length > 0) {
      this._replaceFocusedTag(i);
      this._updateInputAriaActiveDescendant(i.attr("id"));
    } else if (t || e === "next" && this._isEditable()) {
      this._clearTagFocus();
      this._updateInputAriaActiveDescendant();
    }
  },
  _replaceFocusedTag: function (e) {
    this._toggleFocusClass(false, this._$focusedTag);
    this._$focusedTag = e;
    this._toggleFocusClass(true, this._$focusedTag);
  },
  _clearTagFocus: function () {
    if (this._$focusedTag) {
      this._toggleFocusClass(false, this._$focusedTag);
      this._updateInputAriaActiveDescendant();
      delete this._$focusedTag;
    }
  },
  _focusClassTarget: function (e) {
    if (e && e.length && e[0] !== this._focusTarget()[0]) {
      return e;
    } else {
      return this.callBase();
    }
  },
  _getLabelContainer: function () {
    return this._$tagsContainer;
  },
  _getFieldElement: function () {
    return this._input();
  },
  _scrollContainer: function (e) {
    if (!this.option("multiline") && (0, g.hasWindow)() && this._$tagsContainer) {
      var t = this._getScrollPosition(e);
      this._$tagsContainer.scrollLeft(t);
    }
  },
  _getScrollPosition: function (e) {
    if (e === "start" || e === "end") {
      return this._getBorderPosition(e);
    } else if (this._$focusedTag) {
      return this._getFocusedTagPosition(e);
    } else {
      return this._getBorderPosition("end");
    }
  },
  _getBorderPosition: function (e) {
    var t = this.option("rtlEnabled");
    if (e === "end" ^ t ^ !t) {
      return 0;
    } else {
      return (t ? -1 : 1) * (this._$tagsContainer.get(0).scrollWidth - (0, i.getOuterWidth)(this._$tagsContainer));
    }
  },
  _getFocusedTagPosition: function (e) {
    var t = e === "next" ^ this.option("rtlEnabled");
    var n = this._$focusedTag.position().left;
    var o = this._$tagsContainer.scrollLeft();
    if (t) {
      n += (0, i.getOuterWidth)(this._$focusedTag, true) - (0, i.getOuterWidth)(this._$tagsContainer);
    }
    if (t ^ n < 0) {
      o += n;
    }
    return o;
  },
  _setNextValue: u.noop,
  _getDefaultOptions: function () {
    return (0, m.extend)(this.callBase(), {
      value: [],
      showDropDownButton: false,
      maxFilterQueryLength: 1500,
      tagTemplate: "tag",
      selectAllText: y.default.format("dxList-selectAll"),
      hideSelectedItems: false,
      selectedItems: [],
      selectAllMode: "page",
      onSelectAllValueChanged: null,
      maxDisplayedTags: undefined,
      showMultiTagOnly: true,
      onMultiTagPreparing: null,
      multiline: true,
      useSubmitBehavior: true
    });
  },
  _init: function () {
    this.callBase();
    this._selectedItems = [];
    this._initSelectAllValueChangedAction();
  },
  _initActions: function () {
    this.callBase();
    this._initMultiTagPreparingAction();
  },
  _initMultiTagPreparingAction: function () {
    this._multiTagPreparingAction = this._createActionByOption("onMultiTagPreparing", {
      beforeExecute: function (e) {
        this._multiTagPreparingHandler(e.args[0]);
      }.bind(this),
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _multiTagPreparingHandler: function (e) {
    var t = this._getValue().length;
    if (this.option("showMultiTagOnly")) {
      e.text = y.default.getFormatter("dxTagBox-selected")(t);
    } else {
      e.text = y.default.getFormatter("dxTagBox-moreSelected")(t - this.option("maxDisplayedTags") + 1);
    }
  },
  _initDynamicTemplates: function () {
    this.callBase();
    this._templateManager.addDefaultTemplates({
      tag: new D.BindableTemplate(function (e, t) {
        var i = (0, o.default)("<div>").addClass("dx-tag-content");
        (0, o.default)("<span>").text(t.text ?? t).appendTo(i);
        (0, o.default)("<div>").addClass("dx-tag-remove-button").appendTo(i);
        e.append(i);
      }, ["text"], this.option("integrationOptions.watchMethod"), {
        text: this._displayGetter
      })
    });
  },
  _toggleSubmitElement: function (e) {
    if (e) {
      this._renderSubmitElement();
      this._setSubmitValue();
    } else {
      if (this._$submitElement) {
        this._$submitElement.remove();
      }
      delete this._$submitElement;
    }
  },
  _renderSubmitElement: function () {
    if (this.option("useSubmitBehavior")) {
      this._$submitElement = (0, o.default)("<select>").attr({
        multiple: "multiple",
        "aria-label": "Selected items"
      }).css("display", "none").appendTo(this.$element());
    }
  },
  _setSubmitValue: function () {
    if (this.option("useSubmitBehavior")) {
      var e = this._getValue();
      var t = [];
      for (var n = 0, i = e.length; n < i; n++) {
        var a = this._shouldUseDisplayValue(e[n]);
        t.push((0, o.default)("<option>").val(a ? this._displayGetter(e[n]) : e[n]).attr("selected", "selected"));
      }
      this._getSubmitElement().empty().append(t);
    }
  },
  _initMarkup: function () {
    this._tagElementsCache = (0, o.default)();
    var e = !this.option("multiline");
    this.$element().addClass("dx-tagbox").toggleClass("dx-tagbox-only-select", !this.option("searchEnabled") && !this.option("acceptCustomValue")).toggleClass("dx-tagbox-single-line", e);
    this.setAria({
      role: "group",
      roledescription: "tagbox"
    }, this.$element());
    this._initTagTemplate();
    this.callBase();
  },
  _getNewLabelId: function (e, t, n) {
    if (!e) {
      return t;
    }
    if (n) {
      if (e === t) {
        return;
      }
      return e.split(" ").filter(function (e) {
        return e !== t;
      }).join(" ");
    }
    return `${e} ${t}`;
  },
  _updateElementAria: function (e, t) {
    if (!e) {
      this.setAria("labelledby", undefined, this.$element());
    } else {
      var n = this.$element().attr("aria-labelledby");
      var i = this._getNewLabelId(n, e, t);
      this.setAria("labelledby", i, this.$element());
    }
  },
  _render: function () {
    this.callBase();
    this._renderTagRemoveAction();
    this._renderSingleLineScroll();
    this._scrollContainer("start");
  },
  _initTagTemplate: function () {
    this._tagTemplate = this._getTemplateByOption("tagTemplate");
  },
  _renderField: function () {
    var e = !(0, p.isDefined)(this.option("fieldTemplate"));
    this.$element().toggleClass("dx-tagbox-default-template", e).toggleClass("dx-tagbox-custom-template", !e);
    this.callBase();
  },
  _renderTagRemoveAction: function () {
    var e = this._createAction(this._removeTagHandler.bind(this));
    var t = (0, b.addNamespace)(x.name, "dxTagBoxTagRemove");
    s.default.off(this._$tagsContainer, t);
    s.default.on(this._$tagsContainer, t, `.dx-tag-remove-button`, function (t) {
      e({
        event: t
      });
    });
  },
  _renderSingleLineScroll: function () {
    var e = (0, b.addNamespace)("dxmousewheel", this.NAME);
    var t = this.$element();
    var n = this.option("multiline");
    s.default.off(t, e);
    if (a.default.real().deviceType === "desktop") {
      if (!n) {
        s.default.on(t, e, this._tagContainerMouseWheelHandler.bind(this));
      }
    } else if (this._$tagsContainer) {
      this._$tagsContainer.css("overflowX", n ? "" : "auto");
    }
  },
  _tagContainerMouseWheelHandler: function (e) {
    var t = this._$tagsContainer.scrollLeft();
    var n = e.delta * -0.3;
    if (!(0, b.isCommandKeyPressed)(e) && (0, I.allowScroll)(this._$tagsContainer, n, true)) {
      this._$tagsContainer.scrollLeft(t + n);
      return false;
    }
  },
  _renderEvents: function () {
    var e = this;
    this.callBase();
    var t = this._input();
    var n = (0, b.addNamespace)("keydown", this.NAME);
    s.default.on(t, n, function (t) {
      var n = (0, b.normalizeKeyName)(t);
      if (!e._isControlKey(n) && e._isEditable()) {
        e._clearTagFocus();
      }
    });
  },
  _popupWrapperClass: function () {
    return this.callBase() + " dx-tagbox-popup-wrapper";
  },
  _renderInput: function () {
    this.callBase();
    this._renderPreventBlurOnInputClick();
  },
  _renderPreventBlurOnInputClick: function () {
    var e = this;
    var t = (0, b.addNamespace)("mousedown", "dxTagBox");
    s.default.off(this._inputWrapper(), t);
    s.default.on(this._inputWrapper(), t, function (t) {
      if (t.target !== e._input()[0] && e._isFocused()) {
        t.preventDefault();
      }
    });
  },
  _renderInputValueImpl: function () {
    return this._renderMultiSelect();
  },
  _loadInputValue: function () {
    return (0, c.when)();
  },
  _clearTextValue: function () {
    this._input().val("");
    this._toggleEmptinessEventHandler();
    this.option("text", "");
  },
  _focusInHandler: function (e) {
    if (!this._preventNestedFocusEvent(e)) {
      this._scrollContainer("end");
    }
    this.callBase(e);
  },
  _renderInputValue: function () {
    this.option("displayValue", this._searchValue());
    return this.callBase();
  },
  _restoreInputText: function (e) {
    if (!e) {
      this._clearTextValue();
    }
  },
  _focusOutHandler: function (e) {
    if (!this._preventNestedFocusEvent(e)) {
      this._clearTagFocus();
      this._scrollContainer("start");
    }
    this.callBase(e);
  },
  _getFirstPopupElement: function () {
    if (this.option("showSelectionControls")) {
      return this._list._focusTarget();
    } else {
      return this.callBase();
    }
  },
  _initSelectAllValueChangedAction: function () {
    this._selectAllValueChangeAction = this._createActionByOption("onSelectAllValueChanged");
  },
  _renderList: function () {
    var e = this;
    this.callBase();
    this._setListDataSourceFilter();
    if (this.option("showSelectionControls")) {
      this._list.registerKeyHandler("tab", function (t) {
        return e._popupElementTabHandler(t);
      });
      this._list.registerKeyHandler("escape", function (t) {
        return e._popupElementEscHandler(t);
      });
    }
  },
  _canListHaveFocus: function () {
    return this.option("applyValueMode") === "useButtons";
  },
  _listConfig: function () {
    var e = this;
    var t = this.option("showSelectionControls") ? "all" : "multiple";
    return (0, m.extend)(this.callBase(), {
      selectionMode: t,
      selectAllText: this.option("selectAllText"),
      onSelectAllValueChanged: function (t) {
        var n = t.value;
        e._selectAllValueChangeAction({
          value: n
        });
      },
      selectAllMode: this.option("selectAllMode"),
      selectedItems: this._selectedItems,
      onFocusedItemChanged: null
    });
  },
  _renderMultiSelect: function () {
    var e = this;
    var t = new c.Deferred();
    this._updateTagsContainer(this._$textEditorInputContainer);
    this._renderInputSize();
    this._renderTags().done(function () {
      if (e._popup) {
        e._popup.refreshPosition();
      }
      t.resolve();
    }).fail(t.reject);
    return t.promise();
  },
  _listItemClickHandler: function (e) {
    if (!this.option("showSelectionControls")) {
      this._clearTextValue();
    }
    if (this.option("applyValueMode") !== "useButtons") {
      this.callBase(e);
      this._saveValueChangeEvent(undefined);
    }
  },
  _shouldClearFilter: function () {
    var e = this.callBase();
    return !this.option("showSelectionControls") && e;
  },
  _renderInputSize: function () {
    var e = this._input();
    var t = e.val();
    var n = (0, p.isString)(t) && t;
    var o = "";
    var a = "";
    var r = this.option("searchEnabled") || this.option("acceptCustomValue");
    if (n && r) {
      var s = (0, h.createTextElementHiddenCopy)(e, t, {
        includePaddings: true
      });
      s.insertAfter(e);
      o = (0, i.getOuterWidth)(s) + 5;
      s.remove();
    } else if (!t) {
      a = 1;
    }
    e.css("width", o);
    e.attr("size", a);
  },
  _renderInputSubstitution: function () {
    this.callBase();
    this._updateWidgetHeight();
  },
  _getValue: function () {
    return this.option("value") || [];
  },
  _multiTagRequired: function () {
    var e = this._getValue();
    var t = this.option("maxDisplayedTags");
    return (0, p.isDefined)(t) && e.length > t;
  },
  _renderMultiTag: function (e) {
    var t = (0, o.default)("<div>").addClass("dx-tag").addClass("dx-tagbox-multi-tag");
    var n = {
      multiTagElement: (0, f.getPublicElement)(t),
      selectedItems: this.option("selectedItems")
    };
    this._multiTagPreparingAction(n);
    return !n.cancel && (t.data("dxTagData", n.text), t.insertBefore(e), this._tagTemplate.render({
      model: n.text,
      container: (0, f.getPublicElement)(t)
    }), t);
  },
  _getFilter: function (e) {
    var t = this._dataController.filter();
    var n = e.getCombinedFilter(this.option("valueExpr"), t);
    var i = encodeURI(JSON.stringify(n)).length;
    var o = this.option("maxFilterQueryLength");
    if (i <= o) {
      return n;
    }
    T.default.log("W1019", o);
  },
  _getFilteredItems: function (e) {
    var t;
    var n;
    var i = this;
    if ((t = this._loadFilteredItemsPromise) !== null && t !== undefined) {
      t.reject();
    }
    var o = new d.SelectionFilterCreator(e);
    var a = (n = this._list) === null || n === undefined ? undefined : n.option("selectedItems");
    var r = !!a && this._list._dataController.isLoaded();
    var s = a || this.option("selectedItems");
    var l = o.getLocalFilter(this._valueGetter);
    var u = s.filter(l);
    var h = u.length === e.length;
    var f = new c.Deferred();
    var p = this._dataController;
    if (this._isDataSourceChanged && !r || !h) {
      var g = p.loadOptions();
      var m = g.customQueryParams;
      var _ = g.expand;
      var v = g.select;
      var y = this._getFilter(o);
      p.loadFromStore({
        filter: y,
        customQueryParams: m,
        expand: _,
        select: v
      }).done(function (e, t) {
        i._isDataSourceChanged = false;
        if (i._disposed) {
          f.reject();
        } else {
          var n = (0, C.normalizeLoadResult)(e, t).data;
          var o = p.applyMapFunction(n);
          f.resolve(o.filter(l));
        }
      }).fail(f.reject);
      this._loadFilteredItemsPromise = f;
      return f.promise();
    }
    return f.resolve(u).promise();
  },
  _createTagsData: function (e, t) {
    var n = this;
    var i = [];
    var o = {};
    var a = this._valueGetterExpr() === "this";
    var r = {};
    t.forEach(function (e) {
      var t = a ? JSON.stringify(e) : n._valueGetter(e);
      r[t] = e;
    });
    var s = [];
    e.forEach(function (e, t) {
      var l = r[a ? JSON.stringify(e) : e];
      if (a && !(0, p.isDefined)(l)) {
        s.push(n._loadItem(e, o).always(function (o) {
          var a = n._createTagData(i, o, e, t);
          i.splice(t, 0, a);
        }));
      } else {
        var u = n._createTagData(i, l, e, t);
        i.splice(t, 0, u);
      }
    });
    var l = new c.Deferred();
    c.when.apply(this, s).always(function () {
      l.resolve(i);
    });
    return l.promise();
  },
  _createTagData: function (e, t, n, i) {
    if ((0, p.isDefined)(t)) {
      this._selectedItems.push(t);
      return t;
    }
    var o = this.option("selectedItem");
    if (this._valueGetter(o) === n) {
      return o;
    } else {
      return n;
    }
  },
  _isGroupedData: function () {
    return this.option("grouped") && !this._dataController.group();
  },
  _getItemsByValues: function (e) {
    var t = [];
    e.forEach(function (e) {
      var n = this._getItemFromPlain(e);
      if ((0, p.isDefined)(n)) {
        t.push(n);
      }
    }.bind(this));
    return t;
  },
  _getFilteredGroupedItems: function (e) {
    var t = this;
    var n = new c.Deferred();
    if (this._filteredGroupedItemsLoadPromise) {
      this._dataController.cancel(this._filteredGroupedItemsLoadPromise.operationId);
    }
    if (this._dataController.items().length) {
      n.resolve(this._getItemsByValues(e));
    } else {
      this._filteredGroupedItemsLoadPromise = this._dataController.load().done(function () {
        n.resolve(t._getItemsByValues(e));
      }).fail(function () {
        n.resolve([]);
      }).always(function () {
        t._filteredGroupedItemsLoadPromise = undefined;
      });
    }
    return n.promise();
  },
  _loadTagsData: function () {
    var e = this;
    var t = this._getValue();
    var n = new c.Deferred();
    this._selectedItems = [];
    (this._isGroupedData() ? this._getFilteredGroupedItems(t) : this._getFilteredItems(t)).done(function (i) {
      e._createTagsData(t, i).always(function (e) {
        n.resolve(e);
      });
    }).fail(n.reject.bind(this));
    return n.promise();
  },
  _renderTags: function () {
    var e = this;
    var t = new c.Deferred();
    var n = false;
    if (this._shouldGetItemsFromPlain(this._valuesToUpdate)) {
      this._selectedItems = this._getItemsFromPlain(this._valuesToUpdate);
      if (this._selectedItems.length === this._valuesToUpdate.length) {
        this._renderTagsImpl(this._selectedItems);
        n = true;
        t.resolve();
      }
    }
    if (!n) {
      this._loadTagsData().done(function (n) {
        if (e._disposed) {
          t.reject();
        } else {
          e._renderTagsImpl(n);
          t.resolve();
        }
      }).fail(t.reject);
    }
    return t.promise();
  },
  _renderTagsImpl: function (e) {
    this._renderTagsCore(e);
    this._renderEmptyState();
    if (!this._preserveFocusedTag) {
      this._clearTagFocus();
    }
  },
  _shouldGetItemsFromPlain: function (e) {
    return e && this._dataController.isLoaded() && e.length <= this._getPlainItems().length;
  },
  _getItemsFromPlain: function (e) {
    var t = this._getSelectedItemsFromList(e);
    if (t.length === 0 && e.length > 0 || t.length < e.length) {
      var n = this._getPlainItems();
      t = this._filterSelectedItems(n, e);
    }
    return t;
  },
  _getSelectedItemsFromList: function (e) {
    var t;
    var n = (t = this._list) === null || t === undefined ? undefined : t.option("selectedItems");
    var i = [];
    if (e.length === (n == null ? undefined : n.length)) {
      i = this._filterSelectedItems(n, e);
    }
    return i;
  },
  _filterSelectedItems: function (e, t) {
    var n = this;
    return e.filter(function (e) {
      var i;
      for (var o = 0; o < t.length; o++) {
        i = t[o];
        if ((0, p.isObject)(i)) {
          if (n._isValueEquals(e, i)) {
            return true;
          }
        } else if (n._isValueEquals(n._valueGetter(e), i)) {
          return true;
        }
      }
      return false;
    }, this);
  },
  _integrateInput: function () {
    this._isInputReady.resolve();
    this.callBase();
    var e = this.$element().find(`.dx-texteditor-input-container`);
    this._updateTagsContainer(e);
    this._renderTagRemoveAction();
  },
  _renderTagsCore: function (e) {
    var t;
    var n = this;
    if ((t = this._isInputReady) !== null && t !== undefined) {
      t.reject();
    }
    this._isInputReady = new c.Deferred();
    this._renderField();
    this.option("selectedItems", this._selectedItems.slice());
    this._cleanTags();
    if (this._input().length > 0) {
      this._isInputReady.resolve();
    }
    (0, c.when)(this._isInputReady).done(function () {
      n._renderTagsElements(e);
    });
  },
  _renderTagsElements: function (e) {
    var t = this;
    var n = this._multiTagRequired() && this._renderMultiTag(this._input());
    var i = this.option("showMultiTagOnly");
    var o = this.option("maxDisplayedTags");
    e.forEach(function (e, a) {
      if (n && i || n && !i && a - o >= -1) {
        return false;
      }
      t._renderTag(e, n || t._input());
    });
    if (this._isFocused()) {
      this._scrollContainer("end");
    }
    this._refreshTagElements();
  },
  _cleanTags: function () {
    if (this._multiTagRequired()) {
      this._tagElements().remove();
    } else {
      var e = this._tagElements();
      var t = this._getValue();
      (0, _.each)(e, function (e, n) {
        var i = (0, o.default)(n);
        var a = i.data("dxTagData");
        if (t == null || !t.includes(a)) {
          i.remove();
        }
      });
    }
    this._updateElementAria();
  },
  _renderEmptyState: function () {
    var e = !this._getValue().length && !this._selectedItems.length && !this._searchValue();
    this._toggleEmptiness(e);
    this._renderDisplayText();
  },
  _renderDisplayText: function () {
    this._renderInputSize();
  },
  _refreshTagElements: function () {
    this._tagElementsCache = this.$element().find(`.dx-tag`);
  },
  _tagElements: function () {
    return this._tagElementsCache;
  },
  _applyTagTemplate: function (e, t) {
    this._tagTemplate.render({
      model: e,
      container: (0, f.getPublicElement)(t)
    });
  },
  _renderTag: function (e, t) {
    var n = this._valueGetter(e);
    if ((0, p.isDefined)(n)) {
      var i = this._getTag(n);
      var o = this._displayGetter(e);
      var a = this._getItemModel(e, o);
      if (i) {
        if ((0, p.isDefined)(o)) {
          i.empty();
          this._applyTagTemplate(a, i);
        }
        i.removeClass("dx-tag-custom");
        this._updateElementAria(i.attr("id"));
      } else {
        var r = `dx-${new S.default()}`;
        i = this._createTag(n, t, r);
        if ((0, p.isDefined)(e)) {
          this._applyTagTemplate(a, i);
        } else {
          i.addClass("dx-tag-custom");
          this._applyTagTemplate(n, i);
        }
        this._updateElementAria(r);
      }
    }
  },
  _getItemModel: function (e, t) {
    if ((0, p.isObject)(e) && (0, p.isDefined)(t)) {
      return e;
    } else {
      return (0, u.ensureDefined)(t, "");
    }
  },
  _getTag: function (e) {
    var t = this._tagElements();
    for (var n = t.length, i = false, a = 0; a < n; a++) {
      var s = t[a];
      var l = (0, r.data)(s, "dxTagData");
      if (e === l || (0, u.equalByValue)(e, l)) {
        i = (0, o.default)(s);
        break;
      }
    }
    return i;
  },
  _createTag: function (e, t, n) {
    return (0, o.default)("<div>").attr("id", n).addClass("dx-tag").data("dxTagData", e).insertBefore(t);
  },
  _toggleEmptinessEventHandler: function () {
    this._toggleEmptiness(!this._getValue().length && !this._searchValue().length);
  },
  _customItemAddedHandler: function (e) {
    this.callBase(e);
    this._clearTextValue();
  },
  _removeTagHandler: function (e) {
    var t = e.event;
    t.stopPropagation();
    this._saveValueChangeEvent(t);
    var n = (0, o.default)(t.target).closest(`.dx-tag`);
    this._removeTagElement(n);
  },
  _removeTagElement: function (e) {
    if (e.hasClass("dx-tagbox-multi-tag")) {
      if (this.option("showMultiTagOnly")) {
        this.reset();
      } else {
        this.option("value", this._getValue().slice(0, this.option("maxDisplayedTags")));
      }
    } else {
      var t = e.data("dxTagData");
      var n = e.attr("id");
      this._removeTagWithUpdate(t);
      this._updateElementAria(n, true);
      this._refreshTagElements();
    }
  },
  _updateField: u.noop,
  _removeTagWithUpdate: function (e) {
    var t = this._getValue().slice();
    this._removeTag(t, e);
    this.option("value", t);
    if (t.length === 0) {
      this._clearTagFocus();
    }
  },
  _getCurrentValue: function () {
    return this._lastValue();
  },
  _selectionChangeHandler: function (e) {
    var t = this;
    if (this.option("applyValueMode") !== "useButtons") {
      var n = this._getValue().slice();
      (0, _.each)(e.removedItems || [], function (e, i) {
        t._removeTag(n, t._valueGetter(i));
      });
      (0, _.each)(e.addedItems || [], function (e, i) {
        t._addTag(n, t._valueGetter(i));
      });
      this._updateWidgetHeight();
      if (!(0, u.equalByValue)(this._list.option("selectedItemKeys"), this.option("value"))) {
        var i = this._list._getSelectionChangeEvent();
        if (i) {
          this._saveValueChangeEvent(i);
        }
        this.option("value", n);
      }
      this._list._saveSelectionChangeEvent(undefined);
    }
  },
  _removeTag: function (e, t) {
    var n = this._valueIndex(t, e);
    if (n >= 0) {
      e.splice(n, 1);
    }
  },
  _addTag: function (e, t) {
    if (this._valueIndex(t) < 0) {
      e.push(t);
    }
  },
  _fieldRenderData: function () {
    return this._selectedItems.slice();
  },
  _completeSelection: function (e) {
    if (!this.option("showSelectionControls")) {
      this._setValue(e);
    }
  },
  _setValue: function (e) {
    if (e !== null) {
      var t = this.option("applyValueMode") === "useButtons";
      var n = this._valueIndex(e);
      var i = (t ? this._list.option("selectedItemKeys") : this._getValue()).slice();
      if (n >= 0) {
        i.splice(n, 1);
      } else {
        i.push(e);
      }
      if (this.option("applyValueMode") === "useButtons") {
        this._list.option("selectedItemKeys", i);
      } else {
        this.option("value", i);
      }
    }
  },
  _isSelectedValue: function (e, t) {
    return this._valueIndex(e, null, t) > -1;
  },
  _valueIndex: function (e, t, n) {
    var i = this;
    var o = -1;
    if (n && O(e) !== "object" && (n.indexByValues || (n.indexByValues = {}, (t = t || this._getValue()).forEach(function (e, t) {
      n.indexByValues[e] = t;
    })), e in n.indexByValues)) {
      return n.indexByValues[e];
    } else {
      t = t || this._getValue();
      (0, _.each)(t, function (t, n) {
        if (i._isValueEquals(e, n)) {
          o = t;
          return false;
        }
      });
      return o;
    }
  },
  _lastValue: function () {
    var e = this._getValue();
    var t = e[e.length - 1];
    return t ?? null;
  },
  _shouldRenderSearchEvent: function () {
    return this.option("searchEnabled") || this.option("acceptCustomValue");
  },
  _searchHandler: function (e) {
    if (this.option("searchEnabled") && e && !this._isTagRemoved) {
      this.callBase(arguments);
      this._setListDataSourceFilter();
    }
    this._updateWidgetHeight();
    delete this._isTagRemoved;
  },
  _updateWidgetHeight: function () {
    var e = this.$element();
    var t = (0, i.getHeight)(e);
    this._renderInputSize();
    var n = (0, i.getHeight)(e);
    if (this._popup && this.option("opened") && this._isEditable() && n !== t) {
      this._popup.repaint();
    }
  },
  _refreshSelected: function () {
    var e;
    if ((e = this._list) === null || e === undefined ? undefined : e.getDataSource()) {
      this._list.option("selectedItems", this._selectedItems);
    }
  },
  _resetListDataSourceFilter: function () {
    var e = this._dataController;
    delete this._userFilter;
    e.filter(null);
    e.reload();
  },
  _setListDataSourceFilter: function () {
    if (this.option("hideSelectedItems") && this._list) {
      var e = this._dataController;
      var t = this._valueGetterExpr();
      if ((0, p.isString)(t) && t !== "this") {
        var n = this._dataSourceFilterExpr();
        if (this._userFilter === undefined) {
          this._userFilter = e.filter() || null;
        }
        if (this._userFilter) {
          n.push(this._userFilter);
        }
        if (n.length) {
          e.filter(n);
        } else {
          e.filter(null);
        }
      } else {
        e.filter(this._dataSourceFilterFunction.bind(this));
      }
      e.load();
    }
  },
  _dataSourceFilterExpr: function () {
    var e = this;
    var t = [];
    this._getValue().forEach(function (n) {
      return t.push(["!", [e._valueGetterExpr(), n]]);
    });
    return t;
  },
  _dataSourceFilterFunction: function (e) {
    var t = this;
    var n = this._valueGetter(e);
    var i = true;
    (0, _.each)(this._getValue(), function (e, o) {
      if (t._isValueEquals(o, n)) {
        i = false;
        return false;
      }
    });
    return i;
  },
  _dataSourceChangedHandler: function () {
    this._isDataSourceChanged = true;
    this.callBase.apply(this, arguments);
  },
  _applyButtonHandler: function (e) {
    this._saveValueChangeEvent(e.event);
    this.option("value", this._getSortedListValues());
    this._clearTextValue();
    this.callBase();
    this._cancelSearchIfNeed();
  },
  _getSortedListValues: function () {
    var e = this._getListValues();
    var t = this.option("value") || [];
    var n = e.length ? (0, v.getIntersection)(t, e) : [];
    var i = n.length ? (0, v.removeDuplicates)(e, t) : e;
    return n.concat(i);
  },
  _getListValues: function () {
    var e = this;
    if (this._list) {
      return this._getPlainItems(this._list.option("selectedItems")).map(function (t) {
        return e._valueGetter(t);
      });
    } else {
      return [];
    }
  },
  _setListDataSource: function () {
    var e = this._getValue();
    this.callBase();
    if (e !== this.option("value")) {
      this.option("value", e);
    }
    this._refreshSelected();
  },
  _renderOpenedState: function () {
    this.callBase();
    if (this.option("applyValueMode") === "useButtons" && !this.option("opened")) {
      this._refreshSelected();
    }
  },
  reset: function () {
    this._restoreInputText();
    var e = this._getDefaultOptions().value;
    var t = this.option("value");
    if (!e || e.length !== 0 || !t || e.length !== t.length) {
      this.callBase();
    }
  },
  _clean: function () {
    this.callBase();
    delete this._defaultTagTemplate;
    delete this._valuesToUpdate;
    delete this._tagTemplate;
  },
  _getSelectedItemsDifference: function (e, t) {
    var n = this;
    if (!e.length) {
      return {
        addedItems: [],
        removedItems: t.slice()
      };
    }
    if (!t.length) {
      return {
        addedItems: e.slice(),
        removedItems: []
      };
    }
    var i = t.reduce(function (e, t) {
      e[n._valueGetter(t)] = t;
      return e;
    }, {});
    var o = [];
    e.forEach(function (e) {
      var t = n._valueGetter(e);
      if (!i[t]) {
        o.push(e);
      }
      delete i[t];
    });
    return {
      addedItems: o,
      removedItems: Object.values(i)
    };
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    var i = e.previousValue;
    switch (t) {
      case "onSelectAllValueChanged":
        this._initSelectAllValueChangedAction();
        break;
      case "onMultiTagPreparing":
        this._initMultiTagPreparingAction();
        this._renderTags();
        break;
      case "hideSelectedItems":
        if (n) {
          this._setListDataSourceFilter();
        } else {
          this._resetListDataSourceFilter();
        }
        break;
      case "useSubmitBehavior":
        this._toggleSubmitElement(n);
        break;
      case "displayExpr":
        this.callBase(e);
        this._initTemplates();
        this._invalidate();
        break;
      case "tagTemplate":
        this._initTagTemplate();
        this._invalidate();
        break;
      case "selectAllText":
        this._setListOption("selectAllText", this.option("selectAllText"));
        break;
      case "readOnly":
      case "disabled":
        this.callBase(e);
        if (!n) {
          this._refreshEvents();
        }
        break;
      case "value":
        this._valuesToUpdate = n;
        this.callBase(e);
        this._valuesToUpdate = undefined;
        this._setListDataSourceFilter();
        break;
      case "maxDisplayedTags":
      case "showMultiTagOnly":
        this._renderTags();
        break;
      case "selectAllMode":
        this._setListOption(t, n);
        break;
      case "selectedItem":
        break;
      case "selectedItems":
        this._selectionChangedAction(this._getSelectedItemsDifference(n, i));
        break;
      case "multiline":
        this.$element().toggleClass("dx-tagbox-single-line", !n);
        this._renderSingleLineScroll();
        break;
      case "maxFilterQueryLength":
        break;
      default:
        this.callBase(e);
    }
  },
  _getActualSearchValue: function () {
    return this.callBase() || this._searchValue();
  },
  _popupHidingHandler: function () {
    this.callBase();
    this._clearFilter();
  }
});
(0, l.default)("dxTagBox", A);
var P = A;
exports.default = P;
module.exports = exports.default;
module.exports.default = exports.default;