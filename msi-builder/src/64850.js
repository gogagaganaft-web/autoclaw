exports.default = undefined;
var i = C(require("./68374.js"));
var o = C(require("./99393.js"));
var a = C(require("./73349.js"));
var r = require("./13306.js");
var s = require("./44899.js");
var l = C(require("./80209.js"));
var u = C(require("./20530.js"));
var d = C(require("./28109.js"));
var c = require("./75811.js");
var h = C(require("./96452.js"));
var f = C(require("./56120.js"));
var p = C(require("./91202.js"));
var g = C(require("./29783.js"));
var m = C(require("./49714.js"));
var _ = require("./68494.js");
var v = require("./86974.js");
var y = require("./95479.js");
var b = require("./78008.js");
var x = require("./39611.js");
var w = C(require("./55994.js"));
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
function k(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return T(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || I(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function D(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || I(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function I(e, t) {
  if (e) {
    if (typeof e == "string") {
      return T(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return T(e, t);
    } else {
      return undefined;
    }
  }
}
function T(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function E(e, t) {
  return (E = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var O = ["KeyDown", "KeyUp", "Change", "Cut", "Copy", "Paste", "Input", "EnterKey"];
var A = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  E(t, n);
  var h = o.prototype;
  h._getDefaultOptions = function () {
    return (0, r.extend)(e.prototype._getDefaultOptions.call(this), {
      acceptCustomValue: true,
      activeStateEnabled: true,
      applyButtonText: d.default.format("OK"),
      applyValueMode: "instantly",
      buttons: undefined,
      calendarOptions: {},
      cancelButtonText: d.default.format("Cancel"),
      endDateOutOfRangeMessage: d.default.format("dxDateRangeBox-endDateOutOfRangeMessage"),
      dateSerializationFormat: undefined,
      deferRendering: true,
      disableOutOfRangeSelection: false,
      disabledDates: null,
      displayFormat: null,
      dropDownButtonTemplate: "dropDownButton",
      dropDownOptions: {},
      endDate: null,
      endDateInputAttr: {},
      endDateLabel: d.default.format("dxDateRangeBox-endDateLabel"),
      endDateName: "",
      endDatePlaceholder: "",
      endDateText: undefined,
      focusStateEnabled: true,
      hoverStateEnabled: true,
      invalidStartDateMessage: d.default.format("dxDateRangeBox-invalidStartDateMessage"),
      invalidEndDateMessage: d.default.format("dxDateRangeBox-invalidEndDateMessage"),
      isValid: true,
      labelMode: "static",
      max: undefined,
      min: undefined,
      multiView: true,
      onChange: null,
      onClosed: null,
      onCopy: null,
      onCut: null,
      onEnterKey: null,
      onInput: null,
      onKeyDown: null,
      onKeyUp: null,
      onOpened: null,
      onPaste: null,
      onValueChanged: null,
      openOnFieldClick: true,
      opened: false,
      pickerType: "calendar",
      readOnly: false,
      showClearButton: false,
      showDropDownButton: true,
      spellcheck: false,
      startDate: null,
      startDateInputAttr: {},
      startDateLabel: d.default.format("dxDateRangeBox-startDateLabel"),
      startDateName: "",
      startDateOutOfRangeMessage: d.default.format("dxDateRangeBox-startDateOutOfRangeMessage"),
      startDatePlaceholder: "",
      startDateText: undefined,
      stylingMode: (0, l.default)().editorStylingMode || "outlined",
      todayButtonText: d.default.format("dxCalendar-todayButtonText"),
      useHiddenSubmitElement: false,
      useMaskBehavior: false,
      validationError: null,
      validationErrors: null,
      validationMessageMode: "auto",
      validationMessagePosition: "auto",
      validationStatus: "valid",
      value: [null, null],
      valueChangeEvent: "change",
      _internalValidationErrors: [],
      _currentSelection: "startDate"
    });
  };
  h._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        var e = (0, c.current)();
        return (0, c.isMaterial)(e);
      },
      options: {
        stylingMode: (0, l.default)().editorStylingMode || "filled",
        labelMode: "floating"
      }
    }, {
      device: function () {
        var e = u.default.real().platform;
        return e === "ios" || e === "android";
      },
      options: {
        multiView: false
      }
    }]);
  };
  h._initOptions = function (t) {
    e.prototype._initOptions.call(this, t);
    var n = this.initialOption().value;
    var i = this.option();
    var o = i.value;
    var a = i.startDate;
    var r = i.endDate;
    if (o[0] && o[1] && (0, v.getDeserializedDate)(o[0]) > (0, v.getDeserializedDate)(o[1])) {
      o = [o[1], o[0]];
    }
    if (a && r && (0, v.getDeserializedDate)(a) > (0, v.getDeserializedDate)(r)) {
      var s = [r, a];
      a = s[0];
      r = s[1];
    }
    if ((0, v.isSameDateArrays)(n, o)) {
      o = [a, r];
    } else {
      var l = D(o, 2);
      a = l[0];
      r = l[1];
    }
    this.option({
      startDate: a,
      endDate: r,
      value: o
    });
  };
  h._createOpenAction = function () {
    this._openAction = this._createActionByOption("onOpened", {
      excludeValidators: ["disabled", "readOnly"]
    });
  };
  h._raiseOpenAction = function () {
    if (!this._openAction) {
      this._createOpenAction();
    }
    this._openAction();
  };
  h._createCloseAction = function () {
    this._closeAction = this._createActionByOption("onClosed", {
      excludeValidators: ["disabled", "readOnly"]
    });
  };
  h._raiseCloseAction = function () {
    if (!this._closeAction) {
      this._createCloseAction();
    }
    this._closeAction();
  };
  h._createEventAction = function (e) {
    this[`_${(0, b.camelize)(e)}Action`] = this._createActionByOption(`on${e}`, {
      excludeValidators: ["readOnly"]
    });
  };
  h._raiseAction = function (e, t) {
    if (!this[`_${(0, b.camelize)(e)}Action`]) {
      this._createEventAction(e);
    }
    this[`_${(0, b.camelize)(e)}Action`]({
      event: t
    });
  };
  h._initTemplates = function () {
    this._templateManager.addDefaultTemplates({
      dropDownButton: new _.FunctionTemplate(function (e) {
        var t = (0, i.default)("<div>").addClass("dx-dropdowneditor-icon");
        (0, i.default)(e.container).append(t);
      })
    });
    this.callBase();
  };
  h._getDefaultButtons = function () {
    return [{
      name: "clear",
      Ctor: m.default
    }, {
      name: "dropDown",
      Ctor: g.default
    }];
  };
  h._initMarkup = function () {
    this.$element().addClass("dx-daterangebox").addClass("dx-texteditor").addClass("dx-dropdowneditor");
    this._toggleDropDownEditorActiveClass();
    this._toggleEditorLabelClass();
    this._toggleReadOnlyState();
    this._renderStylingMode();
    this._renderEndDateBox();
    this._renderSeparator();
    this._renderStartDateBox();
    this._toggleEmptinessState();
    this._renderEmptinessEvent();
    this._renderButtonsContainer();
    e.prototype._initMarkup.call(this);
    this.$element().removeClass("dx-show-invalid-badge");
  };
  h._renderEmptinessEvent = function () {
    var e = (0, x.addNamespace)("input blur", this.NAME);
    w.default.off(this._focusTarget(), e);
    w.default.on(this._focusTarget(), e, this._toggleEmptinessState.bind(this));
  };
  h._toggleEmptinessState = function () {
    var e = this.getStartDateBox().$element().hasClass("dx-texteditor-empty") && this.getEndDateBox().$element().hasClass("dx-texteditor-empty");
    this.$element().toggleClass("dx-texteditor-empty", e);
  };
  h._attachKeyboardEvents = function () {
    if (!this.option("readOnly")) {
      e.prototype._attachKeyboardEvents.call(this);
    }
  };
  h._toggleReadOnlyState = function () {
    var e = this.option().readOnly;
    this.$element().toggleClass("dx-state-readonly", !!e);
  };
  h._toggleDropDownEditorActiveClass = function () {
    var e = this.option().opened;
    this.$element().toggleClass("dx-dropdowneditor-active", e);
  };
  h._toggleEditorLabelClass = function () {
    var e = this.option();
    var t = e.startDateLabel;
    var n = e.endDateLabel;
    var i = e.labelMode;
    var o = (!!t || !!n) && i !== "hidden";
    this.$element().removeClass("dx-daterangebox-with-floating-label").removeClass("dx-daterangebox-with-label");
    if (o) {
      this.$element().addClass(i === "floating" ? "dx-daterangebox-with-floating-label" : "dx-daterangebox-with-label");
    }
  };
  h._renderStartDateBox = function () {
    this._$startDateBox = (0, i.default)("<div>").addClass("dx-start-datebox").prependTo(this.$element());
    this._startDateBox = this._createComponent(this._$startDateBox, f.default, this._getStartDateBoxConfig());
    this._startDateBox.NAME = "_StartDateBox";
  };
  h._renderEndDateBox = function () {
    this._$endDateBox = (0, i.default)("<div>").addClass("dx-end-datebox").appendTo(this.$element());
    this._endDateBox = this._createComponent(this._$endDateBox, f.default, this._getEndDateBoxConfig());
    this._endDateBox.NAME = "_EndDateBox";
  };
  h._renderSeparator = function () {
    var e = (0, s.getImageContainer)("to");
    this._$separator = (0, i.default)("<div>").addClass("dx-daterangebox-separator").prependTo(this.$element());
    this._renderPreventBlurOnSeparatorClick();
    e.appendTo(this._$separator);
  };
  h._renderPreventBlurOnSeparatorClick = function () {
    var e = this;
    var t = (0, x.addNamespace)("mousedown", this.NAME);
    w.default.off(this._$separator, t);
    w.default.on(this._$separator, t, function (t) {
      if (!e._hasActiveElement()) {
        e.focus();
      }
      t.preventDefault();
    });
  };
  h._renderButtonsContainer = function () {
    this._buttonCollection = new p.default(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    var e = this.option().buttons;
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(e, this.$element());
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(e, this.$element());
  };
  h._updateButtons = function (e) {
    this._buttonCollection.updateButtons(e);
  };
  h._openHandler = function () {
    this._toggleOpenState();
  };
  h._shouldCallOpenHandler = function () {
    return true;
  };
  h._toggleOpenState = function () {
    if (!this.option().opened) {
      this.getStartDateBox()._focusInput();
    }
    if (!this.option("readOnly")) {
      this.option("opened", !this.option("opened"));
    }
  };
  h._clearValueHandler = function (e) {
    e.stopPropagation();
    this._saveValueChangeEvent(e);
    this.reset();
    if (!this._isStartDateActiveElement()) {
      this.focus();
    }
    w.default.trigger((0, i.default)(this.startDateField()), "input");
  };
  h._isClearButtonVisible = function () {
    return this.option("showClearButton") && !this.option("readOnly");
  };
  h._focusInHandler = function (t) {
    if (!this._shouldSkipFocusEvent(t)) {
      e.prototype._focusInHandler.call(this, t);
    }
  };
  h._focusOutHandler = function (t) {
    if (!this._shouldSkipFocusEvent(t)) {
      e.prototype._focusOutHandler.call(this, t);
    }
  };
  h._shouldSkipFocusEvent = function (e) {
    var t = e.target;
    var n = e.relatedTarget;
    return (0, i.default)(t).is(this.startDateField()) && (0, i.default)(n).is(this.endDateField()) || (0, i.default)(t).is(this.endDateField()) && (0, i.default)(n).is(this.startDateField());
  };
  h._getPickerType = function () {
    var e = this.option().pickerType;
    if (["calendar", "native"].includes(e)) {
      return e;
    } else {
      return "calendar";
    }
  };
  h._getRestErrors = function (e, t) {
    return e.filter(function (e) {
      return !t.some(function (t) {
        return e.message === t.message;
      });
    });
  };
  h._syncValidationErrors = function (e, t, n) {
    t ||= [];
    n ||= [];
    var i = this.option(e) || [];
    var o = this._getRestErrors(i, n);
    this.option(e, [].concat(k(o), k(t)));
  };
  h._getDateBoxConfig = function () {
    var e = this;
    var t = this.option();
    var n = {
      acceptCustomValue: t.acceptCustomValue,
      activeStateEnabled: t.activeStateEnabled,
      applyValueMode: t.applyValueMode,
      dateOutOfRangeMessage: t.dateOutOfRangeMessage,
      dateSerializationFormat: t.dateSerializationFormat,
      deferRendering: t.deferRendering,
      disabled: t.disabled,
      displayFormat: t.displayFormat,
      focusStateEnabled: t.focusStateEnabled,
      isValid: t.isValid,
      tabIndex: t.tabIndex,
      height: t.height,
      hoverStateEnabled: t.hoverStateEnabled,
      labelMode: t.labelMode,
      max: t.max,
      min: t.min,
      openOnFieldClick: t.openOnFieldClick,
      pickerType: this._getPickerType(),
      readOnly: t.readOnly,
      rtlEnabled: t.rtlEnabled,
      spellcheck: t.spellcheck,
      stylingMode: t.stylingMode,
      type: "date",
      useMaskBehavior: t.useMaskBehavior,
      validationMessageMode: t.validationMessageMode,
      validationMessagePosition: t.validationMessagePosition,
      valueChangeEvent: t.valueChangeEvent,
      onKeyDown: t.onKeyDown,
      onKeyUp: t.onKeyUp,
      onChange: t.onChange,
      onInput: t.onInput,
      onCut: t.onCut,
      onCopy: t.onCopy,
      onPaste: t.onPaste,
      onEnterKey: t.onEnterKey,
      _dateRangeBoxInstance: this,
      _showValidationMessage: false
    };
    (0, y.each)(O, function (t, i) {
      var o = `on${i}`;
      if (e.hasActionSubscription(o)) {
        n[o] = function (t) {
          e._raiseAction(i, t.event);
        };
      }
    });
    return n;
  };
  h._hideOnOutsideClickHandler = function (e) {
    var t = e.target;
    var n = (0, i.default)(t);
    var o = this.getButton("dropDown");
    var a = o && o.$element();
    var r = !!n.closest(this.$element()).length;
    var s = !!n.closest(a).length;
    return !r && !s;
  };
  h._getStartDateBoxConfig = function () {
    var t = this;
    var n = this.option();
    return S({}, this._getDateBoxConfig(), {
      applyButtonText: n.applyButtonText,
      calendarOptions: n.calendarOptions,
      cancelButtonText: n.cancelButtonText,
      dateOutOfRangeMessage: n.startDateOutOfRangeMessage,
      deferRendering: n.deferRendering,
      disabledDates: n.dropDownOptions?.disabledDates,
      dropDownOptions: S({
        showTitle: false,
        title: "",
        hideOnOutsideClick: function (e) {
          return t._hideOnOutsideClickHandler(e);
        },
        hideOnParentScroll: false,
        preventScrollEvents: false
      }, n.dropDownOptions),
      invalidDateMessage: n.invalidStartDateMessage,
      onValueChanged: function (e) {
        var n = e.value;
        var i = e.event;
        var o = [n, t.option("value")[1]];
        t.updateValue(o, i);
      },
      opened: n.opened,
      onOpened: function () {
        t._raiseOpenAction();
      },
      onClosed: function () {
        t._raiseCloseAction();
      },
      onOptionChanged: function (e) {
        var n = e.name;
        var i = e.value;
        var o = e.previousValue;
        if (n === "text") {
          t.option("startDateText", i);
        }
        if (n === "validationErrors") {
          t._syncValidationErrors("_internalValidationErrors", i, o);
        }
      },
      todayButtonText: n.todayButtonText,
      showClearButton: false,
      showDropDownButton: false,
      value: this.option("value")[0],
      label: n.startDateLabel,
      placeholder: n.startDatePlaceholder,
      inputAttr: n.startDateInputAttr,
      name: n.startDateName,
      _showValidationIcon: false
    });
  };
  h._getEndDateBoxConfig = function () {
    var e = this;
    var t = this.option();
    return S({}, this._getDateBoxConfig(), {
      invalidDateMessage: t.invalidEndDateMessage,
      dateOutOfRangeMessage: t.endDateOutOfRangeMessage,
      onValueChanged: function (t) {
        var n = t.value;
        var i = t.event;
        var o = [e.option("value")[0], n];
        e.updateValue(o, i);
      },
      onOptionChanged: function (t) {
        var n = t.name;
        var i = t.value;
        var o = t.previousValue;
        if (n === "text") {
          e.option("endDateText", i);
        }
        if (n === "validationErrors") {
          e._syncValidationErrors("_internalValidationErrors", i, o);
        }
      },
      opened: t.opened,
      showClearButton: false,
      showDropDownButton: false,
      value: this.option("value")[1],
      label: t.endDateLabel,
      placeholder: t.endDatePlaceholder,
      deferRendering: true,
      inputAttr: t.endDateInputAttr,
      name: t.endDateName
    });
  };
  h._getValidationMessagePosition = function () {
    var e = this.option().validationMessagePosition;
    if (e === "auto") {
      if (this.option("opened")) {
        return "top";
      } else {
        return "bottom";
      }
    } else {
      return e;
    }
  };
  h.updateValue = function (e, t) {
    if (!(0, v.isSameDateArrays)(e, this.option("value"))) {
      if (t) {
        this._saveValueChangeEvent(t);
      }
      this.option("value", e);
    }
  };
  h._updateDateBoxesValue = function (e) {
    var t = this.getStartDateBox();
    var n = this.getEndDateBox();
    var i = D(e, 2);
    var o = i[0];
    var a = i[1];
    var r = t.option("value");
    var s = n.option("value");
    if (!(0, v.isSameDates)(o, r)) {
      t.option("value", o);
    }
    if (!(0, v.isSameDates)(a, s)) {
      n.option("value", a);
    }
  };
  h._renderAccessKey = function () {
    var e = (0, i.default)(this.field()[0]);
    var t = this.option().accessKey;
    e.attr("accesskey", t);
  };
  h._focusTarget = function () {
    return this.$element().find(`.dx-texteditor-input`);
  };
  h._focusEventTarget = function () {
    return this.element();
  };
  h._focusClassTarget = function () {
    return this.$element();
  };
  h._toggleFocusClass = function (t, n) {
    e.prototype._toggleFocusClass.call(this, t, this._focusClassTarget(n));
  };
  h._hasActiveElement = function () {
    return this._isStartDateActiveElement() || this._isEndDateActiveElement();
  };
  h._isStartDateActiveElement = function () {
    return this._isActiveElement(this.startDateField());
  };
  h._isEndDateActiveElement = function () {
    return this._isActiveElement(this.endDateField());
  };
  h._isActiveElement = function (e) {
    return (0, i.default)(e).is(a.default.getActiveElement(e));
  };
  h._popupContentIdentifier = function (e) {
    if (e) {
      this._popupContentId = e;
    }
    return this._popupContentId;
  };
  h._setAriaAttributes = function () {
    var e = this.option().opened;
    var t = {
      expanded: e,
      controls: this._popupContentIdentifier()
    };
    var n = e ? this._popupContentIdentifier() : undefined;
    this.setAria(t);
    this.setAria("owns", n, this.$element());
  };
  h._cleanButtonContainers = function () {
    var e;
    var t;
    if ((e = this._$beforeButtonsContainer) !== null && e !== undefined) {
      e.remove();
    }
    if ((t = this._$afterButtonsContainer) !== null && t !== undefined) {
      t.remove();
    }
    this._buttonCollection.clean();
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
  };
  h._applyCustomValidation = function (e) {
    this.validationRequest.fire({
      editor: this,
      value: e
    });
  };
  h._clean = function () {
    var t;
    var n;
    var i;
    this._cleanButtonContainers();
    if ((t = this._$startDateBox) !== null && t !== undefined) {
      t.remove();
    }
    if ((n = this._$endDateBox) !== null && n !== undefined) {
      n.remove();
    }
    if ((i = this._$separator) !== null && i !== undefined) {
      i.remove();
    }
    e.prototype._clean.call(this);
  };
  h._optionChanged = function (t) {
    var n = t.name;
    var i = t.fullName;
    var o = t.value;
    var a = t.previousValue;
    switch (n) {
      case "acceptCustomValue":
      case "dateSerializationFormat":
      case "displayFormat":
      case "max":
      case "min":
      case "openOnFieldClick":
      case "spellcheck":
      case "useMaskBehavior":
      case "valueChangeEvent":
        this.getStartDateBox().option(n, o);
        this.getEndDateBox().option(n, o);
        break;
      case "rtlEnabled":
        e.prototype._optionChanged.call(this, t);
        break;
      case "labelMode":
        this._toggleEditorLabelClass();
        this.getStartDateBox().option(n, o);
        this.getEndDateBox().option(n, o);
        break;
      case "applyButtonText":
      case "applyValueMode":
      case "cancelButtonText":
      case "deferRendering":
      case "disabledDates":
      case "todayButtonText":
        this.getStartDateBox().option(n, o);
        break;
      case "opened":
        this._toggleDropDownEditorActiveClass();
        this.getStartDateBox().option(n, o);
        this.getEndDateBox()._setOptionWithoutOptionChange(n, o);
        break;
      case "buttons":
        this._cleanButtonContainers();
        this._renderButtonsContainer();
        break;
      case "calendarOptions":
      case "dropDownOptions":
        this.getStartDateBox().option(i, o);
        break;
      case "pickerType":
        var r = this._getPickerType();
        this.getStartDateBox().option(n, r);
        this.getEndDateBox().option(n, r);
        break;
      case "dateOutOfRangeMessage":
        break;
      case "height":
        this.getStartDateBox().option(n, o);
        this.getEndDateBox().option(n, o);
        e.prototype._optionChanged.call(this, t);
        break;
      case "dropDownButtonTemplate":
      case "showDropDownButton":
        this._updateButtons(["dropDown"]);
        break;
      case "showClearButton":
        this._updateButtons(["clear"]);
        break;
      case "endDate":
        this.updateValue([this.option("value")[0], o]);
        break;
      case "startDateLabel":
        this._toggleEditorLabelClass();
        this.getStartDateBox().option("label", o);
        break;
      case "endDateLabel":
        this._toggleEditorLabelClass();
        this.getEndDateBox().option("label", o);
        break;
      case "startDatePlaceholder":
        this.getStartDateBox().option("placeholder", o);
        break;
      case "endDatePlaceholder":
        this.getEndDateBox().option("placeholder", o);
        break;
      case "startDateInputAttr":
        this.getStartDateBox().option("inputAttr", o);
        break;
      case "startDateName":
        this.getStartDateBox().option("name", o);
        break;
      case "endDateInputAttr":
        this.getEndDateBox().option("inputAttr", o);
        break;
      case "endDateName":
        this.getEndDateBox().option("name", o);
        break;
      case "multiView":
        this.getStartDateBox().option("calendarOptions.viewsCount", o ? 2 : 1);
        break;
      case "tabIndex":
      case "activeStateEnabled":
      case "focusStateEnabled":
      case "hoverStateEnabled":
        e.prototype._optionChanged.call(this, t);
        this.getStartDateBox().option(n, o);
        this.getEndDateBox().option(n, o);
        break;
      case "onValueChanged":
        this._createValueChangeAction();
        break;
      case "onOpened":
        this._createOpenAction();
        break;
      case "onClosed":
        this._createCloseAction();
        break;
      case "onKeyDown":
      case "onKeyUp":
      case "onChange":
      case "onInput":
      case "onCut":
      case "onCopy":
      case "onPaste":
      case "onEnterKey":
        this._createEventAction(n.replace("on", ""));
        break;
      case "readOnly":
      case "disabled":
        this._updateButtons();
        e.prototype._optionChanged.call(this, t);
        this.getStartDateBox().option(n, o);
        this.getEndDateBox().option(n, o);
        break;
      case "disableOutOfRangeSelection":
        break;
      case "startDate":
        this.updateValue([o, this.option("value")[1]]);
        break;
      case "stylingMode":
        this._renderStylingMode();
        this.getStartDateBox().option(n, o);
        this.getEndDateBox().option(n, o);
        break;
      case "startDateText":
      case "endDateText":
      case "useHiddenSubmitElement":
        break;
      case "invalidStartDateMessage":
        this.getStartDateBox().option("invalidDateMessage", o);
        break;
      case "invalidEndDateMessage":
        this.getEndDateBox().option("invalidDateMessage", o);
        break;
      case "startDateOutOfRangeMessage":
        this.getStartDateBox().option("dateOutOfRangeMessage", o);
        break;
      case "endDateOutOfRangeMessage":
        this.getEndDateBox().option("dateOutOfRangeMessage", o);
        break;
      case "validationMessagePosition":
        this.getStartDateBox().option(n, o);
        e.prototype._optionChanged.call(this, t);
        break;
      case "_internalValidationErrors":
        this._syncValidationErrors("validationErrors", o, a);
        var s = this.option("validationErrors");
        this.option("isValid", s == null || !s.length);
        break;
      case "isValid":
        this.getStartDateBox().option(n, o);
        this.getEndDateBox().option(n, o);
        var l = o && !this.option("_internalValidationErrors").length;
        if (this._shouldSkipIsValidChange || l === o) {
          e.prototype._optionChanged.call(this, t);
          return;
        }
        this._shouldSkipIsValidChange = true;
        this.option("isValid", l);
        this._shouldSkipIsValidChange = false;
        break;
      case "validationErrors":
        var u = this.option("_internalValidationErrors") || [];
        var d = o || [];
        var c = this._getRestErrors(d, u);
        var h = [].concat(k(c), k(u));
        var f = h.length ? h : null;
        this._options.silent("validationErrors", f);
        e.prototype._optionChanged.call(this, S({}, t, {
          value: f
        }));
        break;
      case "value":
        var p = (0, v.sortDatesArray)(o);
        if (!(0, v.isSameDateArrays)(p, a)) {
          this._setOptionWithoutOptionChange("value", p);
          this._setOptionWithoutOptionChange("startDate", p[0]);
          this._setOptionWithoutOptionChange("endDate", p[1]);
          this._applyCustomValidation(p);
          this._updateDateBoxesValue(p);
          this.getStartDateBox()._strategy.renderValue();
          this._toggleEmptinessState();
          this._raiseValueChangeAction(p, a);
          this._saveValueChangeEvent(undefined);
        }
        break;
      case "_currentSelection":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  h.getStartDateBox = function () {
    return this._startDateBox;
  };
  h.getEndDateBox = function () {
    return this._endDateBox;
  };
  h.getButton = function (e) {
    return this._buttonCollection.getButton(e);
  };
  h.open = function () {
    this.option("opened", true);
  };
  h.close = function () {
    this.option("opened", false);
  };
  h.content = function () {
    return this.getStartDateBox().content();
  };
  h.field = function () {
    return [this.startDateField(), this.endDateField()];
  };
  h.startDateField = function () {
    return this.getStartDateBox().field();
  };
  h.endDateField = function () {
    return this.getEndDateBox().field();
  };
  h.focus = function () {
    this.getStartDateBox().focus();
  };
  h.reset = function () {
    e.prototype.reset.call(this);
    this.getEndDateBox().reset();
    this.getStartDateBox().reset();
  };
  return o;
}(h.default);
(0, o.default)("dxDateRangeBox", A);
var P = A;
exports.default = P;
module.exports = exports.default;
module.exports.default = exports.default;