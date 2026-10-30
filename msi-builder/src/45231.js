exports.default = undefined;
var i = C(require("./68374.js"));
var o = C(require("./14390.js"));
var a = require("./68494.js");
var r = C(require("./99393.js"));
var s = C(require("./28236.js"));
var l = C(require("./51495.js"));
var u = C(require("./56757.js"));
var d = require("./47617.js");
var c = require("./6415.js");
var h = require("./44899.js");
var f = C(require("./53305.js"));
var p = require("./85273.js");
var g = C(require("./26562.js"));
var m = require("./62754.js");
var _ = require("./13306.js");
var v = require("./35922.js");
var y = require("./20576.js");
var b = C(require("./73176.js"));
var x = require("./61902.js");
var w = C(require("./28109.js"));
function C(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function S() {
  return (S = Object.assign ? Object.assign.bind() : function (e) {
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
var k = o.default.inherit({
  _getDefaultOptions: function () {
    return (0, _.extend)(this.callBase(), {
      itemTemplate: "item",
      keyExpr: "this",
      displayExpr: undefined,
      selectedItem: null,
      selectedItemKey: null,
      stylingMode: "outlined",
      deferRendering: true,
      noDataText: w.default.format("dxCollectionWidget-noDataText"),
      useSelectMode: false,
      splitButton: false,
      showArrowIcon: true,
      text: "",
      icon: undefined,
      onButtonClick: null,
      onSelectionChanged: null,
      onItemClick: null,
      opened: false,
      items: null,
      dataSource: null,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      dropDownOptions: {},
      dropDownContentTemplate: "content",
      wrapItemText: false,
      useItemTextAsTitle: true,
      grouped: false,
      groupTemplate: "group",
      buttonGroupOptions: {}
    });
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, _.extend)(this._optionsByReference, {
      selectedItem: true
    });
  },
  _init: function () {
    this.callBase();
    this._createItemClickAction();
    this._createActionClickAction();
    this._createSelectionChangedAction();
    this._initDataSource();
    this._compileKeyGetter();
    this._compileDisplayGetter();
    this._itemsToDataSource(this.option("items"));
    this._options.cache("buttonGroupOptions", this.option("buttonGroupOptions"));
    this._options.cache("dropDownOptions", this.option("dropDownOptions"));
  },
  _initTemplates: function () {
    var e = this;
    this._templateManager.addDefaultTemplates({
      content: new a.FunctionTemplate(function (t) {
        var n = (0, i.default)(t.container);
        var o = (0, i.default)("<div>").appendTo(n);
        e._list = e._createComponent(o, u.default, e._listOptions());
        e._list.registerKeyHandler("escape", e._escHandler.bind(e));
        e._list.registerKeyHandler("tab", e._escHandler.bind(e));
        e._list.registerKeyHandler("leftArrow", e._escHandler.bind(e));
        e._list.registerKeyHandler("rightArrow", e._escHandler.bind(e));
      })
    });
    this.callBase();
  },
  _itemsToDataSource: function (e) {
    this._dataSource ||= new p.DataSource({
      store: new g.default({
        key: this._getKey(),
        data: e
      }),
      pageSize: 0
    });
  },
  _getKey: function () {
    var e;
    var t = this.option("keyExpr");
    var n = (e = this._dataSource) === null || e === undefined ? undefined : e.key();
    if (!(0, v.isDefined)(n) || (0, v.isDefined)(t) && t !== "this") {
      return t;
    } else {
      return n;
    }
  },
  _compileKeyGetter: function () {
    this._keyGetter = (0, d.compileGetter)(this._getKey());
  },
  _compileDisplayGetter: function () {
    this._displayGetter = (0, d.compileGetter)(this.option("displayExpr"));
  },
  _initMarkup: function () {
    this.callBase();
    this.$element().addClass("dx-dropdownbutton");
    this._renderButtonGroup();
    this._updateArrowClass();
    if ((0, v.isDefined)(this.option("selectedItemKey"))) {
      this._loadSelectedItem().done(this._updateActionButton.bind(this));
    }
  },
  _renderFocusTarget: y.noop,
  _render: function () {
    if (!this.option("deferRendering") || !!this.option("opened")) {
      this._renderPopup();
    }
    this.callBase();
  },
  _renderContentImpl: function () {
    if (this._popup) {
      this._renderPopupContent();
    }
    return this.callBase();
  },
  _loadSelectedItem: function () {
    var e;
    if ((e = this._loadSingleDeferred) !== null && e !== undefined) {
      e.reject();
    }
    var t = new m.Deferred();
    if (this._list && this._lastSelectedItemData !== undefined) {
      var n = this.option("useSelectMode") ? this._list.option("selectedItem") : this._lastSelectedItemData;
      return t.resolve(n);
    }
    this._lastSelectedItemData = undefined;
    var i = this.option("selectedItemKey");
    this._loadSingle(this._getKey(), i).done(t.resolve).fail(function () {
      t.resolve(null);
    });
    this._loadSingleDeferred = t;
    return t.promise();
  },
  _createActionClickAction: function () {
    this._actionClickAction = this._createActionByOption("onButtonClick");
  },
  _createSelectionChangedAction: function () {
    this._selectionChangedAction = this._createActionByOption("onSelectionChanged");
  },
  _createItemClickAction: function () {
    this._itemClickAction = this._createActionByOption("onItemClick");
  },
  _fireSelectionChangedAction: function (e) {
    var t = e.previousValue;
    var n = e.value;
    this._selectionChangedAction({
      item: n,
      previousItem: t
    });
  },
  _fireItemClickAction: function (e) {
    var t = e.event;
    var n = e.itemElement;
    var i = e.itemData;
    return this._itemClickAction({
      event: t,
      itemElement: n,
      itemData: this._actionItem || i
    });
  },
  _actionButtonConfig: function () {
    return {
      text: this.option("text"),
      icon: this.option("icon"),
      elementAttr: {
        class: "dx-dropdownbutton-action"
      }
    };
  },
  _getButtonGroupItems: function () {
    var e = [];
    e.push(this._actionButtonConfig());
    if (this.option("splitButton")) {
      e.push({
        icon: "spindown",
        elementAttr: {
          class: "dx-dropdownbutton-toggle"
        }
      });
    }
    return e;
  },
  _buttonGroupItemClick: function (e) {
    var t = e.event;
    var n = e.itemData;
    var i = n.elementAttr.class === "dx-dropdownbutton-action";
    if (n.elementAttr.class === "dx-dropdownbutton-toggle") {
      this.toggle();
    } else if (i) {
      this._actionClickAction({
        event: t,
        selectedItem: this.option("selectedItem")
      });
      if (!this.option("splitButton")) {
        this.toggle();
      }
    }
  },
  _buttonGroupOptions: function () {
    var e = this;
    var t = this.option();
    var n = t.splitButton;
    var o = t.showArrowIcon;
    var a = t.focusStateEnabled;
    var r = t.hoverStateEnabled;
    var s = t.stylingMode;
    var l = t.accessKey;
    var u = t.tabIndex;
    var d = n || !o ? "content" : function (e, t) {
      var n = e.text;
      var o = e.icon;
      var a = (0, h.getImageContainer)(o);
      var r = n ? (0, i.default)("<span>").text(n).addClass("dx-button-text") : undefined;
      var s = (0, h.getImageContainer)("spindown").addClass("dx-icon-right");
      (0, i.default)(t).append(a, r, s);
    };
    return (0, _.extend)({
      items: this._getButtonGroupItems(),
      onItemClick: this._buttonGroupItemClick.bind(this),
      width: "100%",
      height: "100%",
      selectionMode: "none",
      onKeyboardHandled: function (t) {
        return e._keyboardHandler(t);
      },
      buttonTemplate: d,
      focusStateEnabled: a,
      hoverStateEnabled: r,
      stylingMode: s,
      accessKey: l,
      tabIndex: u
    }, this._options.cache("buttonGroupOptions"));
  },
  _renderPopupContent: function () {
    var e = this._popup.$content();
    var t = this._getTemplateByOption("dropDownContentTemplate");
    e.empty();
    this._popupContentId = "dx-" + new b.default();
    this.setAria("id", this._popupContentId, e);
    return t.render({
      container: (0, c.getPublicElement)(e),
      model: this.option("items") || this._dataSource
    });
  },
  _popupOptions: function () {
    var e = this;
    var t = this.option("rtlEnabled") ? "right" : "left";
    return (0, _.extend)({
      dragEnabled: false,
      focusStateEnabled: false,
      deferRendering: this.option("deferRendering"),
      hideOnOutsideClick: function (t) {
        var n = e.$element();
        return !(0, i.default)(t.target).closest(`.dx-dropdownbutton`).is(n);
      },
      showTitle: false,
      animation: {
        show: {
          type: "fade",
          duration: 0,
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          duration: 400,
          from: 1,
          to: 0
        }
      },
      _ignoreFunctionValueDeprecation: true,
      width: function () {
        return (0, x.getElementWidth)(e.$element());
      },
      height: "auto",
      shading: false,
      position: {
        of: this.$element(),
        collision: "flipfit",
        my: t + " top",
        at: t + " bottom"
      },
      _wrapperClassExternal: "dx-dropdowneditor-overlay"
    }, this._options.cache("dropDownOptions"), {
      visible: this.option("opened")
    });
  },
  _listOptions: function () {
    var e = this;
    var t = this.option("selectedItemKey");
    var n = this.option("useSelectMode");
    return {
      selectionMode: n ? "single" : "none",
      wrapItemText: this.option("wrapItemText"),
      focusStateEnabled: this.option("focusStateEnabled"),
      hoverStateEnabled: this.option("hoverStateEnabled"),
      useItemTextAsTitle: this.option("useItemTextAsTitle"),
      onContentReady: function () {
        return e._fireContentReadyAction();
      },
      selectedItemKeys: (0, v.isDefined)(t) && n ? [t] : [],
      grouped: this.option("grouped"),
      groupTemplate: this.option("groupTemplate"),
      keyExpr: this._getKey(),
      noDataText: this.option("noDataText"),
      displayExpr: this.option("displayExpr"),
      itemTemplate: this.option("itemTemplate"),
      items: this.option("items"),
      dataSource: this._dataSource,
      onItemClick: function (t) {
        if (!e.option("useSelectMode")) {
          e._lastSelectedItemData = t.itemData;
        }
        e.option("selectedItemKey", e._keyGetter(t.itemData));
        if (e._fireItemClickAction(t) !== false) {
          e.toggle(false);
          e._buttonGroup.focus();
        }
      }
    };
  },
  _upDownKeyHandler: function () {
    if (this._popup && this._popup.option("visible") && this._list) {
      this._list.focus();
    } else {
      this.open();
    }
    return true;
  },
  _escHandler: function () {
    this.close();
    this._buttonGroup.focus();
    return true;
  },
  _tabHandler: function () {
    this.close();
    return true;
  },
  _renderPopup: function () {
    var e = (0, i.default)("<div>");
    this.$element().append(e);
    this._popup = this._createComponent(e, l.default, this._popupOptions());
    this._popup.$content().addClass("dx-dropdownbutton-content");
    this._popup.$wrapper().addClass("dx-dropdownbutton-popup-wrapper");
    this._popup.on("hiding", this._popupHidingHandler.bind(this));
    this._popup.on("showing", this._popupShowingHandler.bind(this));
    this._bindInnerWidgetOptions(this._popup, "dropDownOptions");
  },
  _popupHidingHandler: function () {
    this.option("opened", false);
    this._updateAriaAttributes(false);
  },
  _popupOptionChanged: function (e) {
    var t = o.default.getOptionsFromContainer(e);
    this._setPopupOption(t);
    var n = Object.keys(t);
    if (n.indexOf("width") !== -1 || n.indexOf("height") !== -1) {
      this._dimensionChanged();
    }
  },
  _dimensionChanged: function () {
    var e = this;
    if ((0, x.getSizeValue)(this.option("dropDownOptions.width")) === undefined) {
      this._setPopupOption("width", function () {
        return (0, x.getElementWidth)(e.$element());
      });
    }
  },
  _setPopupOption: function (e, t) {
    this._setWidgetOption("_popup", arguments);
  },
  _popupShowingHandler: function () {
    this.option("opened", true);
    this._updateAriaAttributes(true);
  },
  _setElementAria: function (e) {
    var t = {
      owns: e ? this._popupContentId : undefined
    };
    this.setAria(t, this.$element());
  },
  _setButtonsAria: function (e) {
    var t = this;
    var n = {
      expanded: e,
      haspopup: "listbox"
    };
    var o = {};
    if (!this.option("text")) {
      o.label = "dropdownbutton";
    }
    this._getButtons().each(function (e, a) {
      if (e === 0) {
        t.setAria(S({}, o, n), (0, i.default)(a));
      } else {
        t.setAria(n, (0, i.default)(a));
      }
    });
  },
  _updateAriaAttributes: function (e) {
    this._setElementAria(e);
    this._setButtonsAria(e);
  },
  _getButtons: function () {
    return this._buttonGroup.$element().find(`.dx-button`);
  },
  _renderButtonGroup: function () {
    var e = this._buttonGroup && this._buttonGroup.$element() || (0, i.default)("<div>");
    if (!this._buttonGroup) {
      this.$element().append(e);
    }
    this._buttonGroup = this._createComponent(e, s.default, this._buttonGroupOptions());
    this._buttonGroup.registerKeyHandler("downArrow", this._upDownKeyHandler.bind(this));
    this._buttonGroup.registerKeyHandler("tab", this._tabHandler.bind(this));
    this._buttonGroup.registerKeyHandler("upArrow", this._upDownKeyHandler.bind(this));
    this._buttonGroup.registerKeyHandler("escape", this._escHandler.bind(this));
    this._bindInnerWidgetOptions(this._buttonGroup, "buttonGroupOptions");
    this._updateAriaAttributes(this.option("opened"));
  },
  _updateArrowClass: function () {
    var e = this.option("splitButton") || this.option("showArrowIcon");
    this.$element().toggleClass("dx-dropdownbutton-has-arrow", e);
  },
  toggle: function (e) {
    if (!this._popup) {
      this._renderPopup();
      this._renderContent();
    }
    return this._popup.toggle(e);
  },
  open: function () {
    return this.toggle(true);
  },
  close: function () {
    return this.toggle(false);
  },
  _setListOption: function (e, t) {
    if (this._list) {
      this._list.option(e, t);
    }
  },
  _getDisplayValue: function (e) {
    var t = !(0, v.isPlainObject)(e) ? e : this._displayGetter(e);
    if ((0, v.isPlainObject)(t)) {
      return "";
    } else {
      return String((0, y.ensureDefined)(t, ""));
    }
  },
  _updateActionButton: function (e) {
    if (this.option("useSelectMode")) {
      this.option({
        text: this._getDisplayValue(e),
        icon: (0, v.isPlainObject)(e) ? e.icon : undefined
      });
    }
    this._setOptionWithoutOptionChange("selectedItem", e);
    this._setOptionWithoutOptionChange("selectedItemKey", this._keyGetter(e));
  },
  _clean: function () {
    if (this._list) {
      this._list.$element().remove();
    }
    if (this._popup) {
      this._popup.$element().remove();
    }
  },
  _selectedItemKeyChanged: function (e) {
    var t = this;
    this._setListOption("selectedItemKeys", this.option("useSelectMode") && (0, v.isDefined)(e) ? [e] : []);
    var n = this.option("selectedItem");
    this._loadSelectedItem().done(function (e) {
      t._updateActionButton(e);
      if (t._displayGetter(n) !== t._displayGetter(e)) {
        t._fireSelectionChangedAction({
          previousValue: n,
          value: e
        });
      }
    });
  },
  _updateButtonGroup: function (e, t) {
    this._buttonGroup.option(e, t);
    this._updateAriaAttributes(this.option("opened"));
  },
  _actionButtonOptionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    var i = {
      [t]: n
    };
    this._updateButtonGroup("items[0]", (0, _.extend)({}, this._actionButtonConfig(), i));
    if (this._popup) {
      this._popup.repaint();
    }
  },
  _selectModeChanged: function (e) {
    if (e) {
      this._setListOption("selectionMode", "single");
      var t = this.option("selectedItemKey");
      this._setListOption("selectedItemKeys", (0, v.isDefined)(t) ? [t] : []);
      this._selectedItemKeyChanged(this.option("selectedItemKey"));
    } else {
      this._setListOption("selectionMode", "none");
      this.option({
        selectedItemKey: undefined,
        selectedItem: undefined
      });
      this._actionButtonOptionChanged({
        text: this.option("text")
      });
    }
  },
  _updateItemCollection: function (e) {
    var t = this;
    var n = this.option("selectedItemKey");
    this._setListOption("selectedItem", null);
    this._setWidgetOption("_list", [e]);
    if ((0, v.isDefined)(n)) {
      this._loadSelectedItem().done(function (e) {
        t._setListOption("selectedItemKeys", [n]);
        t._setListOption("selectedItem", e);
      }).fail(function (e) {
        t._setListOption("selectedItemKeys", []);
      }).always(this._updateActionButton.bind(this));
    }
  },
  _updateDataSource: function (e = this._dataSource.items()) {
    this._dataSource = undefined;
    this._itemsToDataSource(e);
    this._updateKeyExpr();
  },
  _updateKeyExpr: function () {
    this._compileKeyGetter();
    this._setListOption("keyExpr", this._getKey());
  },
  focus: function () {
    this._buttonGroup.focus();
  },
  _optionChanged: function (e) {
    var t;
    var n = e.name;
    var i = e.value;
    switch (n) {
      case "useSelectMode":
        this._selectModeChanged(i);
        break;
      case "splitButton":
        this._updateArrowClass();
        this._renderButtonGroup();
        break;
      case "displayExpr":
        this._compileDisplayGetter();
        this._setListOption(n, i);
        this._updateActionButton(this.option("selectedItem"));
        break;
      case "keyExpr":
        this._updateDataSource();
        break;
      case "buttonGroupOptions":
        this._innerWidgetOptionChanged(this._buttonGroup, e);
        break;
      case "dropDownOptions":
        if (e.fullName === "dropDownOptions.visible") {
          break;
        }
        if (e.value.visible !== undefined) {
          delete e.value.visible;
        }
        this._popupOptionChanged(e);
        this._innerWidgetOptionChanged(this._popup, e);
        break;
      case "opened":
        this.toggle(i);
        break;
      case "focusStateEnabled":
      case "hoverStateEnabled":
        this._setListOption(n, i);
        this._updateButtonGroup(n, i);
        this.callBase(e);
        break;
      case "items":
        this._updateDataSource(this.option("items"));
        this._updateItemCollection(n);
        break;
      case "dataSource":
        if (Array.isArray(i)) {
          this._updateDataSource(this.option("dataSource"));
        } else {
          this._initDataSource();
          this._updateKeyExpr();
        }
        this._updateItemCollection(n);
        break;
      case "icon":
      case "text":
        this._actionButtonOptionChanged(e);
        break;
      case "showArrowIcon":
        this._updateArrowClass();
        this._renderButtonGroup();
        if (this._popup) {
          this._popup.repaint();
        }
        break;
      case "width":
      case "height":
        this.callBase(e);
        if ((t = this._popup) !== null && t !== undefined) {
          t.repaint();
        }
        break;
      case "stylingMode":
        this._updateButtonGroup(n, i);
        break;
      case "itemTemplate":
      case "grouped":
      case "noDataText":
      case "groupTemplate":
      case "wrapItemText":
      case "useItemTextAsTitle":
        this._setListOption(n, i);
        break;
      case "dropDownContentTemplate":
        this._renderContent();
        break;
      case "selectedItemKey":
        this._selectedItemKeyChanged(i);
        break;
      case "selectedItem":
        break;
      case "onItemClick":
        this._createItemClickAction();
        break;
      case "onButtonClick":
        this._createActionClickAction();
        break;
      case "onSelectionChanged":
        this._createSelectionChangedAction();
        break;
      case "deferRendering":
        this.toggle(this.option("opened"));
        break;
      case "tabIndex":
        this._updateButtonGroup(n, i);
        break;
      default:
        this.callBase(e);
    }
  }
}).include(f.default);
(0, r.default)("dxDropDownButton", k);
var D = k;
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;