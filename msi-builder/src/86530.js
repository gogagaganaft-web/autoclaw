exports.default = undefined;
var i = k(require("./68374.js"));
var o = k(require("./73349.js"));
var a = k(require("./55994.js"));
var r = require("./31421.js");
var s = require("./35922.js");
var l = require("./13306.js");
var u = require("./95479.js");
var d = require("./75811.js");
var c = k(require("./20530.js"));
var h = k(require("./96452.js"));
var f = require("./39611.js");
var p = k(require("./93786.js"));
var g = k(require("./49714.js"));
var m = k(require("./91202.js"));
var _ = k(require("./80209.js"));
var v = k(require("./96688.js"));
var y = require("./62754.js");
var b = k(require("./2492.js"));
var x = require("./78986.js");
var w = require("./58664.js");
var C = k(require("./91784.js"));
var S = k(require("./73176.js"));
function k(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var D = ["KeyDown", "KeyPress", "KeyUp", "Change", "Cut", "Copy", "Paste", "Input"];
var I = ["tab", "enter", "shift", "control", "alt", "escape", "pageUp", "pageDown", "end", "home", "leftArrow", "upArrow", "rightArrow", "downArrow"];
var T = x.TextEditorLabel;
function E(e) {
  if ((0, s.isDefined)(e) && !Array.isArray(e)) {
    throw v.default.Error("E1053");
  }
}
var O = h.default.inherit({
  ctor: function (e, t) {
    if (t) {
      E(t.buttons);
    }
    this._buttonCollection = new m.default(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    this._labelContainerElement = null;
    this.callBase.apply(this, arguments);
  },
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      buttons: undefined,
      value: "",
      spellcheck: false,
      showClearButton: false,
      valueChangeEvent: "change",
      placeholder: "",
      inputAttr: {},
      onFocusIn: null,
      onFocusOut: null,
      onKeyDown: null,
      onKeyUp: null,
      onChange: null,
      onInput: null,
      onCut: null,
      onCopy: null,
      onPaste: null,
      onEnterKey: null,
      mode: "text",
      hoverStateEnabled: true,
      focusStateEnabled: true,
      text: undefined,
      displayValueFormatter: function (e) {
        if ((0, s.isDefined)(e) && e !== false) {
          return e;
        } else {
          return "";
        }
      },
      stylingMode: (0, _.default)().editorStylingMode || "outlined",
      showValidationMark: true,
      label: "",
      labelMode: "static",
      labelMark: ""
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        var e = (0, d.current)();
        return (0, d.isMaterial)(e);
      },
      options: {
        stylingMode: (0, _.default)().editorStylingMode || "filled",
        labelMode: "floating"
      }
    }]);
  },
  _getDefaultButtons: function () {
    return [{
      name: "clear",
      Ctor: g.default
    }];
  },
  _isClearButtonVisible: function () {
    return this.option("showClearButton") && !this.option("readOnly");
  },
  _input: function () {
    return this.$element().find(".dx-texteditor-input").first();
  },
  _isFocused: function () {
    return (0, r.focused)(this._input()) || this.callBase();
  },
  _inputWrapper: function () {
    return this.$element();
  },
  _buttonsContainer: function () {
    return this._inputWrapper().find(".dx-texteditor-buttons-container").eq(0);
  },
  _isControlKey: function (e) {
    return I.indexOf(e) !== -1;
  },
  _renderStylingMode: function () {
    this.callBase();
    this._updateButtonsStyling(this.option("stylingMode"));
  },
  _initMarkup: function () {
    this.$element().addClass("dx-texteditor");
    this._renderInput();
    this._renderStylingMode();
    this._renderInputType();
    this._renderPlaceholder();
    this._renderProps();
    this.callBase();
    this._renderValue();
    this._renderLabel();
  },
  _render: function () {
    this.callBase();
    this._refreshValueChangeEvent();
    this._renderEvents();
    this._renderEnterKeyAction();
    this._renderEmptinessEvent();
  },
  _renderInput: function () {
    this._$buttonsContainer = this._$textEditorContainer = (0, i.default)("<div>").addClass("dx-texteditor-container").appendTo(this.$element());
    this._$textEditorInputContainer = (0, i.default)("<div>").addClass("dx-texteditor-input-container").appendTo(this._$textEditorContainer);
    this._$textEditorInputContainer.append(this._createInput());
    this._renderButtonContainers();
  },
  _getInputContainer: function () {
    return this._$textEditorInputContainer;
  },
  _renderPendingIndicator: function () {
    this.$element().addClass("dx-validation-pending");
    var e = this._getInputContainer();
    var t = (0, i.default)("<div>").addClass("dx-pending-indicator").appendTo(e);
    this._pendingIndicator = this._createComponent(t, b.default);
  },
  _disposePendingIndicator: function () {
    if (this._pendingIndicator) {
      this._pendingIndicator.dispose();
      this._pendingIndicator.$element().remove();
      this._pendingIndicator = null;
      this.$element().removeClass("dx-validation-pending");
    }
  },
  _renderValidationState: function () {
    this.callBase();
    var e = this.option("validationStatus") === "pending";
    var t = this.$element();
    if (e) {
      if (!this._pendingIndicator) {
        this._renderPendingIndicator();
      }
      this._showValidMark = false;
    } else {
      if (this.option("validationStatus") === "invalid") {
        this._showValidMark = false;
      }
      if (!this._showValidMark && this.option("showValidationMark") === true) {
        this._showValidMark = this.option("validationStatus") === "valid" && !!this._pendingIndicator;
      }
      this._disposePendingIndicator();
    }
    t.toggleClass("dx-valid", !!this._showValidMark);
  },
  _renderButtonContainers: function () {
    var e = this.option("buttons");
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(e, this._$buttonsContainer);
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(e, this._$buttonsContainer);
  },
  _cleanButtonContainers: function () {
    var e;
    var t;
    if ((e = this._$beforeButtonsContainer) !== null && e !== undefined) {
      e.remove();
    }
    if ((t = this._$afterButtonsContainer) !== null && t !== undefined) {
      t.remove();
    }
    this._buttonCollection.clean();
  },
  _clean: function () {
    this._buttonCollection.clean();
    this._disposePendingIndicator();
    this._unobserveLabelContainerResize();
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    this._$textEditorContainer = null;
    this._$buttonsContainer = null;
    this.callBase();
  },
  _createInput: function () {
    var e = (0, i.default)("<input>");
    this._applyInputAttributes(e, this.option("inputAttr"));
    return e;
  },
  _setSubmitElementName: function (e) {
    var t = this.option("inputAttr.name");
    return this.callBase(e || t || "");
  },
  _applyInputAttributes: function (e, t) {
    var n = (0, l.extend)(this._getDefaultAttributes(), t);
    e.attr(n).addClass("dx-texteditor-input").css("minHeight", this.option("height") ? "0" : "");
  },
  _getDefaultAttributes: function () {
    var e = {
      autocomplete: "off"
    };
    var t = c.default.real();
    var n = t.ios;
    var i = t.mac;
    if (n || i) {
      e.placeholder = " ";
    }
    return e;
  },
  _updateButtons: function (e) {
    this._buttonCollection.updateButtons(e);
  },
  _updateButtonsStyling: function (e) {
    var t = this;
    (0, u.each)(this.option("buttons"), function (n, i) {
      var o = i.options;
      var a = i.name;
      if (o && !o.stylingMode && t.option("visible")) {
        var r = t.getButton(a);
        if (r.option) {
          r.option("stylingMode", e === "underlined" ? "text" : "contained");
        }
      }
    });
  },
  _renderValue: function () {
    return this._renderInputValue().promise();
  },
  _renderInputValue: function (e) {
    e = e ?? this.option("value");
    var n = this.option("text");
    var i = this.option("displayValue");
    var o = this.option("displayValueFormatter");
    if (i !== undefined && e !== null) {
      n = o(i);
    } else if (!(0, s.isDefined)(n)) {
      n = o(e);
    }
    this.option("text", n);
    if (this._input().val() !== ((0, s.isDefined)(n) ? n : "")) {
      this._renderDisplayText(n);
    } else {
      this._toggleEmptinessEventHandler();
    }
    return new y.Deferred().resolve();
  },
  _renderDisplayText: function (e) {
    this._input().val(e);
    this._toggleEmptinessEventHandler();
  },
  _isValueValid: function () {
    if (this._input().length) {
      var e = this._input().get(0).validity;
      if (e) {
        return e.valid;
      }
    }
    return true;
  },
  _toggleEmptiness: function (e) {
    this.$element().toggleClass("dx-texteditor-empty", e);
    this._togglePlaceholder(e);
  },
  _togglePlaceholder: function (e) {
    this.$element().find(`.dx-placeholder`).eq(0).toggleClass("dx-state-invisible", !e);
  },
  _renderProps: function () {
    this._toggleReadOnlyState();
    this._toggleSpellcheckState();
    this._toggleTabIndex();
  },
  _toggleDisabledState: function (e) {
    this.callBase.apply(this, arguments);
    var t = this._input();
    t.prop("disabled", e);
  },
  _toggleTabIndex: function () {
    var e = this._input();
    var t = this.option("disabled");
    var n = this.option("focusStateEnabled");
    if (t || !n) {
      e.attr("tabIndex", -1);
    } else {
      e.removeAttr("tabIndex");
    }
  },
  _toggleReadOnlyState: function () {
    this._input().prop("readOnly", this._readOnlyPropValue());
    this.callBase();
  },
  _readOnlyPropValue: function () {
    return this.option("readOnly");
  },
  _toggleSpellcheckState: function () {
    this._input().prop("spellcheck", this.option("spellcheck"));
  },
  _unobserveLabelContainerResize: function () {
    if (this._labelContainerElement) {
      C.default.unobserve(this._labelContainerElement);
      this._labelContainerElement = null;
    }
  },
  _getLabelContainer: function () {
    return this._input();
  },
  _getLabelContainerWidth: function () {
    return (0, w.getWidth)(this._getLabelContainer());
  },
  _getLabelBeforeWidth: function () {
    var e = this._$beforeButtonsContainer && (0, w.getWidth)(this._$beforeButtonsContainer);
    return e ?? 0;
  },
  _updateLabelWidth: function () {
    this._label.updateBeforeWidth(this._getLabelBeforeWidth());
    this._label.updateMaxWidth(this._getLabelContainerWidth());
  },
  _getFieldElement: function () {
    return this._getLabelContainer();
  },
  _setFieldAria: function () {
    var e;
    var t = {
      labelledby: [this._label.getId(), (e = this._$placeholder) === null || e === undefined ? undefined : e.attr("id")].filter(Boolean).join(" ") || undefined
    };
    this.setAria(t, this._getFieldElement());
  },
  _renderLabel: function () {
    this._unobserveLabelContainerResize();
    this._labelContainerElement = (0, i.default)(this._getLabelContainer()).get(0);
    var e = this.option();
    var t = e.label;
    var n = e.labelMode;
    var o = e.labelMark;
    var a = {
      $editor: this.$element(),
      text: t,
      mark: o,
      mode: n,
      containsButtonsBefore: !!this._$beforeButtonsContainer,
      containerWidth: this._getLabelContainerWidth(),
      beforeWidth: this._getLabelBeforeWidth()
    };
    this._label = new T(a);
    this._setFieldAria();
    if (this._labelContainerElement) {
      C.default.observe(this._labelContainerElement, this._updateLabelWidth.bind(this));
    }
  },
  _renderPlaceholder: function () {
    this._renderPlaceholderMarkup();
    this._attachPlaceholderEvents();
  },
  _renderPlaceholderMarkup: function () {
    if (this._$placeholder) {
      this._$placeholder.remove();
      this._$placeholder = null;
    }
    var e = this._input();
    var t = this.option("placeholder");
    var n = {
      id: t ? `dx-${new S.default()}` : undefined,
      "data-dx_placeholder": t
    };
    var o = this._$placeholder = (0, i.default)("<div>").attr(n);
    o.insertAfter(e);
    o.addClass("dx-placeholder");
  },
  _attachPlaceholderEvents: function () {
    var e = this;
    var t = (0, f.addNamespace)(p.default.up, this.NAME);
    a.default.on(this._$placeholder, t, function () {
      a.default.trigger(e._input(), "focus");
    });
    this._toggleEmptinessEventHandler();
  },
  _placeholder: function () {
    return this._$placeholder || (0, i.default)();
  },
  _clearValueHandler: function (e) {
    var t = this._input();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
    this._clearValue();
    if (!this._isFocused()) {
      a.default.trigger(t, "focus");
    }
    a.default.trigger(t, "input");
  },
  _clearValue: function () {
    this.reset();
  },
  _renderEvents: function () {
    var e = this;
    var t = this._input();
    (0, u.each)(D, function (n, i) {
      if (e.hasActionSubscription("on" + i)) {
        var o = e._createActionByOption("on" + i, {
          excludeValidators: ["readOnly"]
        });
        a.default.on(t, (0, f.addNamespace)(i.toLowerCase(), e.NAME), function (t) {
          if (!e._disposed) {
            o({
              event: t
            });
          }
        });
      }
    });
  },
  _refreshEvents: function () {
    var e = this;
    var t = this._input();
    (0, u.each)(D, function (n, i) {
      a.default.off(t, (0, f.addNamespace)(i.toLowerCase(), e.NAME));
    });
    this._renderEvents();
  },
  _keyPressHandler: function () {
    this.option("text", this._input().val());
  },
  _keyDownHandler: function (e) {
    var t = this._input();
    var n = e.ctrlKey && (0, f.normalizeKeyName)(e) === "enter";
    var i = t.val() !== this.option("value");
    if (n && i) {
      a.default.trigger(t, "change");
    }
  },
  _getValueChangeEventOptionName: function () {
    return "valueChangeEvent";
  },
  _renderValueChangeEvent: function () {
    var e = (0, f.addNamespace)(this._renderValueEventName(), `${this.NAME}TextChange`);
    var t = (0, f.addNamespace)(this.option(this._getValueChangeEventOptionName()), `${this.NAME}ValueChange`);
    var n = (0, f.addNamespace)("keydown", `${this.NAME}TextChange`);
    var i = this._input();
    a.default.on(i, e, this._keyPressHandler.bind(this));
    a.default.on(i, t, this._valueChangeEventHandler.bind(this));
    a.default.on(i, n, this._keyDownHandler.bind(this));
  },
  _cleanValueChangeEvent: function () {
    var e = `.${this.NAME}ValueChange`;
    var t = `.${this.NAME}TextChange`;
    a.default.off(this._input(), e);
    a.default.off(this._input(), t);
  },
  _refreshValueChangeEvent: function () {
    this._cleanValueChangeEvent();
    this._renderValueChangeEvent();
  },
  _renderValueEventName: function () {
    return "input change keypress";
  },
  _focusTarget: function () {
    return this._input();
  },
  _focusEventTarget: function () {
    return this.element();
  },
  _isInput: function (e) {
    return e === this._input().get(0);
  },
  _preventNestedFocusEvent: function (e) {
    if (e.isDefaultPrevented()) {
      return true;
    }
    var t = this._isNestedTarget(e.relatedTarget);
    if (e.type === "focusin") {
      t = t && this._isNestedTarget(e.target) && !this._isInput(e.target);
    } else if (!t) {
      this._toggleFocusClass(false, this.$element());
    }
    if (t) {
      e.preventDefault();
    }
    return t;
  },
  _isNestedTarget: function (e) {
    return !!this.$element().find(e).length;
  },
  _focusClassTarget: function () {
    return this.$element();
  },
  _focusInHandler: function (e) {
    this._preventNestedFocusEvent(e);
    this.callBase.apply(this, arguments);
  },
  _focusOutHandler: function (e) {
    this._preventNestedFocusEvent(e);
    this.callBase.apply(this, arguments);
  },
  _toggleFocusClass: function (e, t) {
    this.callBase(e, this._focusClassTarget(t));
  },
  _hasFocusClass: function (e) {
    return this.callBase((0, i.default)(e || this.$element()));
  },
  _renderEmptinessEvent: function () {
    var e = this._input();
    a.default.on(e, "input blur", this._toggleEmptinessEventHandler.bind(this));
  },
  _toggleEmptinessEventHandler: function () {
    var e = this._input().val();
    var t = (e === "" || e === null) && this._isValueValid();
    this._toggleEmptiness(t);
  },
  _valueChangeEventHandler: function (e, t) {
    if (!this.option("readOnly")) {
      this._saveValueChangeEvent(e);
      this.option("value", arguments.length > 1 ? t : this._input().val());
      this._saveValueChangeEvent(undefined);
    }
  },
  _renderEnterKeyAction: function () {
    this._enterKeyAction = this._createActionByOption("onEnterKey", {
      excludeValidators: ["readOnly"]
    });
    a.default.off(this._input(), "keyup.onEnterKey.dxTextEditor");
    a.default.on(this._input(), "keyup.onEnterKey.dxTextEditor", this._enterKeyHandlerUp.bind(this));
  },
  _enterKeyHandlerUp: function (e) {
    if (!this._disposed) {
      if ((0, f.normalizeKeyName)(e) === "enter") {
        this._enterKeyAction({
          event: e
        });
      }
    }
  },
  _updateValue: function () {
    this._options.silent("text", null);
    this._renderValue();
  },
  _dispose: function () {
    this._enterKeyAction = undefined;
    this.callBase();
  },
  _getSubmitElement: function () {
    return this._input();
  },
  _hasActiveElement: function () {
    return this._input().is(o.default.getActiveElement(this._input()[0]));
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.fullName;
    var i = e.value;
    var o = t.replace("on", "");
    if (D.includes(o)) {
      this._refreshEvents();
    } else {
      switch (t) {
        case "valueChangeEvent":
          this._refreshValueChangeEvent();
          this._refreshFocusEvent();
          this._refreshEvents();
          break;
        case "onValueChanged":
          this._createValueChangeAction();
          break;
        case "focusStateEnabled":
          this.callBase(e);
          this._toggleTabIndex();
          break;
        case "spellcheck":
          this._toggleSpellcheckState();
          break;
        case "mode":
          this._renderInputType();
          break;
        case "onEnterKey":
          this._renderEnterKeyAction();
          break;
        case "placeholder":
          this._renderPlaceholder();
          this._setFieldAria();
          break;
        case "label":
          this._label.updateText(i);
          this._setFieldAria();
          break;
        case "labelMark":
          this._label.updateMark(i);
          break;
        case "labelMode":
          this._label.updateMode(i);
          this._setFieldAria();
          break;
        case "width":
          this.callBase(e);
          this._label.updateMaxWidth(this._getLabelContainerWidth());
          break;
        case "readOnly":
        case "disabled":
          this._updateButtons();
          this.callBase(e);
          break;
        case "showClearButton":
          this._updateButtons(["clear"]);
          break;
        case "text":
          break;
        case "value":
          this._updateValue();
          this.callBase(e);
          break;
        case "inputAttr":
          this._applyInputAttributes(this._input(), this.option(t));
          break;
        case "stylingMode":
          this._renderStylingMode();
          this._updateLabelWidth();
          break;
        case "buttons":
          if (n === t) {
            E(i);
          }
          this._cleanButtonContainers();
          this._renderButtonContainers();
          this._updateButtonsStyling(this.option("stylingMode"));
          this._updateLabelWidth();
          this._label.updateContainsButtonsBefore(!!this._$beforeButtonsContainer);
          break;
        case "visible":
          this.callBase(e);
          if (i && this.option("buttons")) {
            this._cleanButtonContainers();
            this._renderButtonContainers();
            this._updateButtonsStyling(this.option("stylingMode"));
          }
          break;
        case "displayValueFormatter":
          this._invalidate();
          break;
        case "showValidationMark":
          break;
        default:
          this.callBase(e);
      }
    }
  },
  _renderInputType: function () {
    this._setInputType(this.option("mode"));
  },
  _setInputType: function (e) {
    var t = this._input();
    if (e === "search") {
      e = "text";
    }
    try {
      t.prop("type", e);
    } catch (e) {
      t.prop("type", "text");
    }
  },
  getButton: function (e) {
    return this._buttonCollection.getButton(e);
  },
  focus: function () {
    a.default.trigger(this._input(), "focus");
  },
  reset: function () {
    if (this._showValidMark) {
      this._showValidMark = false;
      this._renderValidationState();
    }
    var e = this._getDefaultOptions();
    if (this.option("value") === e.value) {
      this._options.silent("text", "");
      this._renderValue();
    } else {
      this.option("value", e.value);
    }
  },
  on: function (e, t) {
    var n = this.callBase(e, t);
    var i = e.charAt(0).toUpperCase() + e.substr(1);
    if (D.indexOf(i) >= 0) {
      this._refreshEvents();
    }
    return n;
  }
});
exports.default = O;
module.exports = exports.default;
module.exports.default = exports.default;