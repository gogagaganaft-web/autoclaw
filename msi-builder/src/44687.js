exports.default = undefined;
var i = T(require("./68374.js"));
var o = T(require("./55994.js"));
var a = T(require("./73176.js"));
var r = T(require("./99393.js"));
var s = require("./20576.js");
var l = require("./31421.js");
var u = require("./95479.js");
var d = require("./35922.js");
var c = require("./13306.js");
var h = require("./6415.js");
var f = T(require("./96688.js"));
var p = T(require("./49387.js"));
var g = require("./37518.js");
var m = T(require("./29783.js"));
var _ = T(require("./14390.js"));
var v = T(require("./28109.js"));
var y = require("./39611.js");
var b = T(require("./29837.js"));
var x = require("./95429.js");
var w = T(require("./20530.js"));
var C = require("./68494.js");
var S = T(require("./51495.js"));
var k = require("./58201.js");
var D = require("./61902.js");
var I = require("./31648.js");
function T(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var E = w.default.current().platform === "ios";
var O = b.default.inherit({
  _supportedKeys: function () {
    return (0, c.extend)({}, this.callBase(), {
      tab: function (e) {
        if (this.option("opened")) {
          if (this.option("applyValueMode") !== "instantly") {
            var t = e.shiftKey ? this._getLastPopupElement() : this._getFirstPopupElement();
            if (t) {
              o.default.trigger(t, "focus");
              t.select();
            }
            e.preventDefault();
          } else {
            this.close();
          }
        }
      },
      escape: function (e) {
        if (this.option("opened")) {
          e.preventDefault();
        }
        this.close();
        return true;
      },
      upArrow: function (e) {
        return !!(0, y.isCommandKeyPressed)(e) || !(e.preventDefault(), e.stopPropagation(), e.altKey) || (this.close(), false);
      },
      downArrow: function (e) {
        return !!(0, y.isCommandKeyPressed)(e) || !(e.preventDefault(), e.stopPropagation(), e.altKey) || (this._validatedOpening(), false);
      },
      enter: function (e) {
        if (this.option("opened")) {
          e.preventDefault();
          this._valueChangeEventHandler(e);
        }
        return true;
      }
    });
  },
  _getDefaultButtons: function () {
    return this.callBase().concat([{
      name: "dropDown",
      Ctor: m.default
    }]);
  },
  _getDefaultOptions: function () {
    return (0, c.extend)(this.callBase(), {
      value: null,
      onOpened: null,
      onClosed: null,
      opened: false,
      acceptCustomValue: true,
      applyValueMode: "instantly",
      deferRendering: true,
      activeStateEnabled: true,
      dropDownButtonTemplate: "dropDownButton",
      fieldTemplate: null,
      openOnFieldClick: false,
      showDropDownButton: true,
      buttons: undefined,
      dropDownOptions: {
        showTitle: false
      },
      popupPosition: this._getDefaultPopupPosition(),
      onPopupInitialized: null,
      applyButtonText: v.default.format("OK"),
      cancelButtonText: v.default.format("Cancel"),
      buttonsLocation: "default",
      useHiddenSubmitElement: false,
      validationMessagePosition: "auto"
    });
  },
  _useTemplates: function () {
    return true;
  },
  _getDefaultPopupPosition: function (e) {
    var t = (0, g.getDefaultAlignment)(e);
    return {
      offset: {
        h: 0,
        v: -1
      },
      my: t + " top",
      at: t + " bottom",
      collision: "flip flip"
    };
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function (e) {
        return e.platform === "generic";
      },
      options: {
        popupPosition: {
          offset: {
            v: 0
          }
        }
      }
    }]);
  },
  _inputWrapper: function () {
    return this.$element().find(".dx-dropdowneditor-input-wrapper").first();
  },
  _init: function () {
    this.callBase();
    this._initVisibilityActions();
    this._initPopupInitializedAction();
    this._updatePopupPosition(this.option("rtlEnabled"));
    this._options.cache("dropDownOptions", this.option("dropDownOptions"));
  },
  _updatePopupPosition: function (e) {
    var t = this._getDefaultPopupPosition(e);
    var n = t.my;
    var i = t.at;
    var o = this.option("popupPosition");
    this.option("popupPosition", (0, c.extend)({}, o, {
      my: n,
      at: i
    }));
  },
  _initVisibilityActions: function () {
    this._openAction = this._createActionByOption("onOpened", {
      excludeValidators: ["disabled", "readOnly"]
    });
    this._closeAction = this._createActionByOption("onClosed", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _initPopupInitializedAction: function () {
    this._popupInitializedAction = this._createActionByOption("onPopupInitialized", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _initMarkup: function () {
    this._renderSubmitElement();
    this.callBase();
    this.$element().addClass("dx-dropdowneditor");
    this.setAria("role", "combobox");
  },
  _render: function () {
    this.callBase();
    this._renderOpenHandler();
    this._attachFocusOutHandler();
    this._renderOpenedState();
  },
  _renderContentImpl: function () {
    if (!this.option("deferRendering")) {
      this._createPopup();
    }
  },
  _renderInput: function () {
    this.callBase();
    this._wrapInput();
    this._setDefaultAria();
  },
  _wrapInput: function () {
    this._$container = this.$element().wrapInner((0, i.default)("<div>").addClass("dx-dropdowneditor-input-wrapper")).children().eq(0);
  },
  _setDefaultAria: function () {
    this.setAria({
      haspopup: "true",
      autocomplete: "list"
    });
  },
  _readOnlyPropValue: function () {
    return !this._isEditable() || this.callBase();
  },
  _cleanFocusState: function () {
    this.callBase();
    if (this.option("fieldTemplate")) {
      this._detachFocusEvents();
    }
  },
  _getFieldTemplate: function () {
    return this.option("fieldTemplate") && this._getTemplateByOption("fieldTemplate");
  },
  _renderMask: function () {
    if (!this.option("fieldTemplate")) {
      this.callBase();
    }
  },
  _renderField: function () {
    var e = this._getFieldTemplate();
    if (e) {
      this._renderTemplatedField(e, this._fieldRenderData());
    }
  },
  _renderPlaceholder: function () {
    if (!this._getFieldTemplate()) {
      this.callBase();
    }
  },
  _renderValue: function () {
    if (this.option("useHiddenSubmitElement")) {
      this._setSubmitValue();
    }
    this.callBase().always(this._renderField.bind(this));
  },
  _renderTemplatedField: function (e, t) {
    var a = this;
    this._fieldRenderQueueLength = (this._fieldRenderQueueLength ?? 0) + 1;
    var r = (0, l.focused)(this._input());
    var s = this._$container;
    this._detachKeyboardEvents();
    this._refreshButtonsContainer();
    this._detachWrapperContent();
    this._detachFocusEvents();
    s.empty();
    var u = (0, i.default)("<div>").addClass("dx-dropdowneditor-field-template-wrapper").appendTo(s);
    e.render({
      model: t,
      container: (0, h.getPublicElement)(u),
      onRendered: function () {
        a._fieldRenderQueueLength--;
        if (a._fieldRenderQueueLength === 0) {
          var e = a._input();
          if (!e.length) {
            throw f.default.Error("E1010");
          }
          a._integrateInput();
          if (r) {
            o.default.trigger(e, "focus");
          }
        }
      }
    });
    this._attachWrapperContent(s);
  },
  _detachWrapperContent: function () {
    var e;
    var t;
    var n;
    if (this.option("useHiddenSubmitElement")) {
      if ((e = this._$submitElement) !== null && e !== undefined) {
        e.detach();
      }
    }
    var i = (t = this._$beforeButtonsContainer) === null || t === undefined ? undefined : t[0].parentNode;
    var o = (n = this._$afterButtonsContainer) === null || n === undefined ? undefined : n[0].parentNode;
    if (i != null) {
      i.removeChild(this._$beforeButtonsContainer[0]);
    }
    if (o != null) {
      o.removeChild(this._$afterButtonsContainer[0]);
    }
  },
  _attachWrapperContent: function (e) {
    var t;
    var n = this.option("useHiddenSubmitElement");
    e.prepend(this._$beforeButtonsContainer);
    if (n) {
      if ((t = this._$submitElement) !== null && t !== undefined) {
        t.appendTo(e);
      }
    }
    e.append(this._$afterButtonsContainer);
  },
  _refreshButtonsContainer: function () {
    this._$buttonsContainer = this.$element().children().eq(0);
  },
  _integrateInput: function () {
    this._renderFocusState();
    this._refreshValueChangeEvent();
    this._refreshEvents();
    this._refreshEmptinessEvent();
  },
  _refreshEmptinessEvent: function () {
    o.default.off(this._input(), "input blur", this._toggleEmptinessEventHandler);
    this._renderEmptinessEvent();
  },
  _fieldRenderData: function () {
    return this.option("value");
  },
  _initTemplates: function () {
    this._templateManager.addDefaultTemplates({
      dropDownButton: new C.FunctionTemplate(function (e) {
        var t = (0, i.default)("<div>").addClass("dx-dropdowneditor-icon");
        (0, i.default)(e.container).append(t);
      })
    });
    this.callBase();
  },
  _renderOpenHandler: function () {
    var e = this._inputWrapper();
    var t = (0, y.addNamespace)(x.name, this.NAME);
    var n = this.option("openOnFieldClick");
    o.default.off(e, t);
    o.default.on(e, t, this._getInputClickHandler(n));
    this.$element().toggleClass("dx-dropdowneditor-field-clickable", n);
    if (n) {
      this._openOnFieldClickAction = this._createAction(this._openHandler.bind(this));
    }
  },
  _attachFocusOutHandler: function () {
    var e = this;
    if (E) {
      this._detachFocusOutEvents();
      o.default.on(this._inputWrapper(), (0, y.addNamespace)("focusout", this.NAME), function (t) {
        var n = t.relatedTarget;
        if (n && e.option("opened")) {
          if (e._isTargetOutOfComponent(n)) {
            e.close();
          }
        }
      });
    }
  },
  _isTargetOutOfComponent: function (e) {
    var t = this.content ? (0, i.default)(this.content()).closest(`.dx-dropdowneditor-overlay`) : this._$popup;
    return (0, i.default)(e).closest(`.dx-dropdowneditor-overlay`, t).length === 0;
  },
  _detachFocusOutEvents: function () {
    if (E) {
      o.default.off(this._inputWrapper(), (0, y.addNamespace)("focusout", this.NAME));
    }
  },
  _getInputClickHandler: function (e) {
    var t = this;
    if (e) {
      return function (e) {
        t._executeOpenAction(e);
      };
    } else {
      return function (e) {
        t._focusInput();
      };
    }
  },
  _openHandler: function () {
    this._toggleOpenState();
  },
  _executeOpenAction: function (e) {
    this._openOnFieldClickAction({
      event: e
    });
  },
  _keyboardEventBindingTarget: function () {
    return this._input();
  },
  _focusInput: function () {
    return !this.option("disabled") && (this.option("focusStateEnabled") && !(0, l.focused)(this._input()) && (this._resetCaretPosition(), o.default.trigger(this._input(), "focus")), true);
  },
  _resetCaretPosition: function (e = false) {
    var t = this._input().get(0);
    if (t) {
      var n = t.value;
      var i = (0, d.isDefined)(n) && (e || this._isEditable()) ? n.length : 0;
      this._caret({
        start: i,
        end: i
      }, true);
    }
  },
  _isEditable: function () {
    return this.option("acceptCustomValue");
  },
  _toggleOpenState: function (e) {
    if (this._focusInput()) {
      if (!this.option("readOnly")) {
        e = arguments.length ? e : !this.option("opened");
        this.option("opened", e);
      }
    }
  },
  _getControlsAria: function () {
    return this._popup && this._popupContentId;
  },
  _renderOpenedState: function () {
    var e = this.option("opened");
    if (e) {
      this._createPopup();
    }
    this.$element().toggleClass("dx-dropdowneditor-active", e);
    this._setPopupOption("visible", e);
    var t = {
      expanded: e,
      controls: this._getControlsAria()
    };
    this.setAria(t);
    this.setAria("owns", e ? this._popupContentId : undefined, this.$element());
  },
  _createPopup: function () {
    if (!this._$popup) {
      this._$popup = (0, i.default)("<div>").addClass("dx-dropdowneditor-overlay").appendTo(this.$element());
      this._renderPopup();
      this._renderPopupContent();
    }
  },
  _renderPopupContent: s.noop,
  _renderPopup: function () {
    var e = (0, c.extend)(this._popupConfig(), this._options.cache("dropDownOptions"));
    delete e.closeOnOutsideClick;
    if (e.elementAttr && !Object.keys(e.elementAttr).length) {
      delete e.elementAttr;
    }
    this._popup = this._createComponent(this._$popup, S.default, e);
    this._popup.on({
      showing: this._popupShowingHandler.bind(this),
      shown: this._popupShownHandler.bind(this),
      hiding: this._popupHidingHandler.bind(this),
      hidden: this._popupHiddenHandler.bind(this),
      contentReady: this._contentReadyHandler.bind(this)
    });
    this._contentReadyHandler();
    this._setPopupContentId(this._popup.$content());
    this._bindInnerWidgetOptions(this._popup, "dropDownOptions");
  },
  _setPopupContentId: function (e) {
    this._popupContentId = "dx-" + new a.default();
    this.setAria("id", this._popupContentId, e);
  },
  _contentReadyHandler: s.noop,
  _popupConfig: function () {
    var e = this;
    return {
      onInitialized: this._popupInitializedHandler(),
      position: (0, c.extend)(this.option("popupPosition"), {
        of: this.$element()
      }),
      showTitle: this.option("dropDownOptions.showTitle"),
      _ignoreFunctionValueDeprecation: true,
      width: function () {
        return (0, D.getElementWidth)(e.$element());
      },
      height: "auto",
      shading: false,
      hideOnParentScroll: true,
      hideOnOutsideClick: function (t) {
        return e._closeOutsideDropDownHandler(t);
      },
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
      deferRendering: false,
      focusStateEnabled: false,
      showCloseButton: false,
      dragEnabled: false,
      toolbarItems: this._getPopupToolbarItems(),
      onPositioned: this._popupPositionedHandler.bind(this),
      fullScreen: false,
      contentTemplate: null,
      _wrapperClassExternal: "dx-dropdowneditor-overlay",
      _ignorePreventScrollEventsDeprecation: true
    };
  },
  _popupInitializedHandler: function () {
    var e = this;
    if (this.option("onPopupInitialized")) {
      return function (t) {
        e._popupInitializedAction({
          popup: t.component
        });
      };
    } else {
      return null;
    }
  },
  _dimensionChanged: function () {
    if (!(0, k.hasWindow)() || this.$element().is(":visible")) {
      this._updatePopupWidth();
    } else {
      this.close();
    }
  },
  _updatePopupWidth: function () {
    var e = this;
    if ((0, D.getSizeValue)(this.option("dropDownOptions.width")) === undefined) {
      this._setPopupOption("width", function () {
        return (0, D.getElementWidth)(e.$element());
      });
    }
  },
  _popupPositionedHandler: function (e) {
    var t;
    var n;
    var i = this.option();
    var o = i.labelMode;
    var a = i.stylingMode;
    if (this._popup) {
      var r = this._popup.$overlayContent();
      var s = (t = e.position) === null || t === undefined || (n = t.v) === null || n === undefined ? undefined : n.flip;
      var l = o !== "hidden" && a === "outlined";
      if (e.position) {
        r.toggleClass("dx-dropdowneditor-overlay-flipped", s);
      }
      if (s && l && this._label.isVisible()) {
        var u = this._label.$element();
        (0, I.move)(r, {
          top: (0, I.locate)(r).top - parseInt(u.css("fontSize"))
        });
      }
    }
  },
  _popupShowingHandler: s.noop,
  _popupHidingHandler: function () {
    this.option("opened", false);
  },
  _popupShownHandler: function () {
    var e;
    this._openAction();
    if ((e = this._validationMessage) !== null && e !== undefined) {
      e.option("positionSide", this._getValidationMessagePositionSide());
    }
  },
  _popupHiddenHandler: function () {
    var e;
    this._closeAction();
    if ((e = this._validationMessage) !== null && e !== undefined) {
      e.option("positionSide", this._getValidationMessagePositionSide());
    }
  },
  _getValidationMessagePositionSide: function () {
    var e = this.option("validationMessagePosition");
    if (e !== "auto") {
      return e;
    }
    var t = "bottom";
    if (this._popup && this._popup.option("visible")) {
      var n = p.default.setup(this.$element()).top;
      var i = p.default.setup(this._popup.$content()).top;
      t = n + this.option("popupPosition").offset.v > i ? "bottom" : "top";
    }
    return t;
  },
  _closeOutsideDropDownHandler: function (e) {
    var t = e.target;
    var n = (0, i.default)(t);
    var o = this.getButton("dropDown");
    var a = o && o.$element();
    var r = !!n.closest(this.$element()).length;
    var s = !!n.closest(a).length;
    return !r && !s;
  },
  _clean: function () {
    delete this._openOnFieldClickAction;
    if (this._$popup) {
      this._$popup.remove();
      delete this._$popup;
      delete this._popup;
    }
    this.callBase();
  },
  _setPopupOption: function (e, t) {
    this._setWidgetOption("_popup", arguments);
  },
  _validatedOpening: function () {
    if (!this.option("readOnly")) {
      this._toggleOpenState(true);
    }
  },
  _getPopupToolbarItems: function () {
    if (this.option("applyValueMode") === "useButtons") {
      return this._popupToolbarItemsConfig();
    } else {
      return [];
    }
  },
  _getFirstPopupElement: function () {
    return this._popup.$wrapper().find(".dx-popup-done.dx-button");
  },
  _getLastPopupElement: function () {
    return this._popup.$wrapper().find(".dx-popup-cancel.dx-button");
  },
  _popupElementTabHandler: function (e) {
    var t = (0, i.default)(e.currentTarget);
    if (e.shiftKey && t.is(this._getFirstPopupElement()) || !e.shiftKey && t.is(this._getLastPopupElement())) {
      o.default.trigger(this._input(), "focus");
      e.preventDefault();
    }
  },
  _popupElementEscHandler: function () {
    o.default.trigger(this._input(), "focus");
    this.close();
  },
  _popupButtonInitializedHandler: function (e) {
    e.component.registerKeyHandler("tab", this._popupElementTabHandler.bind(this));
    e.component.registerKeyHandler("escape", this._popupElementEscHandler.bind(this));
  },
  _popupToolbarItemsConfig: function () {
    var e = [{
      shortcut: "done",
      options: {
        onClick: this._applyButtonHandler.bind(this),
        text: this.option("applyButtonText"),
        onInitialized: this._popupButtonInitializedHandler.bind(this)
      }
    }, {
      shortcut: "cancel",
      options: {
        onClick: this._cancelButtonHandler.bind(this),
        text: this.option("cancelButtonText"),
        onInitialized: this._popupButtonInitializedHandler.bind(this)
      }
    }];
    return this._applyButtonsLocation(e);
  },
  _applyButtonsLocation: function (e) {
    var t = this.option("buttonsLocation");
    var n = e;
    if (t !== "default") {
      var i = (0, s.splitPair)(t);
      (0, u.each)(n, function (e, t) {
        (0, c.extend)(t, {
          toolbar: i[0],
          location: i[1]
        });
      });
    }
    return n;
  },
  _applyButtonHandler: function () {
    this.close();
    if (this.option("focusStateEnabled")) {
      this.focus();
    }
  },
  _cancelButtonHandler: function () {
    this.close();
    if (this.option("focusStateEnabled")) {
      this.focus();
    }
  },
  _popupOptionChanged: function (e) {
    var t = _.default.getOptionsFromContainer(e);
    this._setPopupOption(t);
    var n = Object.keys(t);
    if (n.indexOf("width") !== -1 || n.indexOf("height") !== -1) {
      this._dimensionChanged();
    }
  },
  _renderSubmitElement: function () {
    if (this.option("useHiddenSubmitElement")) {
      this._$submitElement = (0, i.default)("<input>").attr("type", "hidden").appendTo(this.$element());
    }
  },
  _setSubmitValue: function () {
    this._getSubmitElement().val(this.option("value"));
  },
  _getSubmitElement: function () {
    if (this.option("useHiddenSubmitElement")) {
      return this._$submitElement;
    } else {
      return this.callBase();
    }
  },
  _dispose: function () {
    this._detachFocusOutEvents();
    this.callBase();
  },
  _optionChanged: function (e) {
    var t;
    switch (e.name) {
      case "width":
      case "height":
        this.callBase(e);
        if ((t = this._popup) !== null && t !== undefined) {
          t.repaint();
        }
        break;
      case "opened":
        this._renderOpenedState();
        break;
      case "onOpened":
      case "onClosed":
        this._initVisibilityActions();
        break;
      case "onPopupInitialized":
        this._initPopupInitializedAction();
        break;
      case "fieldTemplate":
        if ((0, d.isDefined)(e.value)) {
          this._renderField();
        } else {
          this._invalidate();
        }
        break;
      case "acceptCustomValue":
      case "openOnFieldClick":
        this._invalidate();
        break;
      case "dropDownButtonTemplate":
      case "showDropDownButton":
        this._updateButtons(["dropDown"]);
        break;
      case "dropDownOptions":
        this._popupOptionChanged(e);
        this._options.cache("dropDownOptions", this.option("dropDownOptions"));
        break;
      case "popupPosition":
        break;
      case "deferRendering":
        if ((0, k.hasWindow)()) {
          this._createPopup();
        }
        break;
      case "applyValueMode":
      case "applyButtonText":
      case "cancelButtonText":
      case "buttonsLocation":
        this._setPopupOption("toolbarItems", this._getPopupToolbarItems());
        break;
      case "useHiddenSubmitElement":
        if (this._$submitElement) {
          this._$submitElement.remove();
          this._$submitElement = undefined;
        }
        this._renderSubmitElement();
        break;
      case "rtlEnabled":
        this._updatePopupPosition(e.value);
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  },
  open: function () {
    this.option("opened", true);
  },
  close: function () {
    this.option("opened", false);
  },
  field: function () {
    return (0, h.getPublicElement)(this._input());
  },
  content: function () {
    if (this._popup) {
      return this._popup.content();
    } else {
      return null;
    }
  }
});
(0, r.default)("dxDropDownEditor", O);
var A = O;
exports.default = A;
module.exports = exports.default;
module.exports.default = exports.default;