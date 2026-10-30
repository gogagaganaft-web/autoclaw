exports.default = undefined;
var i = require("./58201.js");
var o = require("./35922.js");
var a = require("./3532.js");
var r = require("./95479.js");
var s = require("./13306.js");
var l = require("./60137.js");
var u = w(require("./20530.js"));
var d = w(require("./80209.js"));
var c = w(require("./91198.js"));
var h = w(require("./72309.js"));
var f = w(require("./69434.js"));
var p = w(require("./44687.js"));
var g = w(require("./91500.js"));
var m = w(require("./28109.js"));
var _ = w(require("./46919.js"));
var v = w(require("./67814.js"));
var y = w(require("./84416.js"));
var b = w(require("./97000.js"));
var x = w(require("./57728.js"));
function w(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var C = (0, i.getWindow)();
var S = {
  calendar: "calendar",
  rollers: "rollers",
  list: "list",
  native: "native"
};
var k = {
  date: "date",
  datetime: "datetime",
  time: "time"
};
var D = "Calendar";
var I = "DateView";
var T = "Native";
var E = "CalendarWithTime";
var O = "List";
var A = {
  Calendar: _.default,
  DateView: v.default,
  Native: y.default,
  CalendarWithTime: b.default,
  List: x.default
};
var P = p.default.inherit({
  _supportedKeys: function () {
    return (0, s.extend)(this.callBase(), this._strategy.supportedKeys());
  },
  _renderButtonContainers: function () {
    this.callBase.apply(this, arguments);
    this._strategy.customizeButtons();
  },
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      type: "date",
      showAnalogClock: true,
      value: null,
      dateSerializationFormat: undefined,
      min: undefined,
      max: undefined,
      displayFormat: null,
      interval: 30,
      disabledDates: null,
      pickerType: S.calendar,
      invalidDateMessage: m.default.format("dxDateBox-validation-datetime"),
      dateOutOfRangeMessage: m.default.format("validation-range"),
      applyButtonText: m.default.format("OK"),
      adaptivityEnabled: false,
      calendarOptions: {},
      useHiddenSubmitElement: true,
      _showValidationIcon: true
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: {
        platform: "ios"
      },
      options: {
        "dropDownOptions.showTitle": true
      }
    }, {
      device: {
        platform: "android"
      },
      options: {
        buttonsLocation: "bottom after"
      }
    }, {
      device: function () {
        var e = u.default.real().platform;
        return e === "ios" || e === "android";
      },
      options: {
        pickerType: S.native
      }
    }, {
      device: {
        platform: "generic",
        deviceType: "desktop"
      },
      options: {
        buttonsLocation: "bottom after"
      }
    }]);
  },
  _initOptions: function (e) {
    this._userOptions = (0, s.extend)({}, e);
    this.callBase(e);
    this._updatePickerOptions();
  },
  _updatePickerOptions: function () {
    var e = this.option("pickerType");
    var t = this.option("type");
    if (e === S.list && (t === k.datetime || t === k.date)) {
      e = S.calendar;
    }
    if (t === k.time && e === S.calendar) {
      e = S.list;
    }
    this.option("showDropDownButton", u.default.real().platform !== "generic" || e !== S.native);
    this._pickerType = e;
  },
  _init: function () {
    this._initStrategy();
    this.option((0, s.extend)({}, this._strategy.getDefaultOptions(), this._userOptions));
    delete this._userOptions;
    this.callBase();
  },
  _toLowerCaseFirstLetter: function (e) {
    return e.charAt(0).toLowerCase() + e.substr(1);
  },
  _initStrategy: function () {
    var e = this._getStrategyName(this._getFormatType());
    var t = A[e];
    if (!this._strategy || this._strategy.NAME !== e) {
      this._strategy = new t(this);
    }
  },
  _getFormatType: function () {
    var e = this.option("type");
    var t = /h|m|s/g.test(e);
    var n = "";
    if (/d|M|Y/g.test(e)) {
      n += k.date;
    }
    if (t) {
      n += k.time;
    }
    return n;
  },
  _getStrategyName: function (e) {
    var t = this._pickerType;
    if (t === S.rollers) {
      return I;
    } else if (t === S.native) {
      return T;
    } else if (e === k.date) {
      return D;
    } else if (e === k.datetime) {
      return E;
    } else {
      return O;
    }
  },
  _initMarkup: function () {
    this.$element().addClass("dx-datebox");
    this.callBase();
    this._refreshFormatClass();
    this._refreshPickerTypeClass();
    this._strategy.renderInputMinMax(this._input());
  },
  _render: function () {
    this.callBase();
    this._formatValidationIcon();
  },
  _renderDimensions: function () {
    this.callBase();
    this.$element().toggleClass("dx-auto-width", !this.option("width"));
    this._updatePopupWidth();
    this._updatePopupHeight();
  },
  _dimensionChanged: function () {
    this.callBase();
    this._updatePopupHeight();
  },
  _updatePopupHeight: function () {
    var e;
    var t;
    if (this._popup) {
      if ((e = (t = this._strategy)._updatePopupHeight) !== null && e !== undefined) {
        e.call(t);
      }
    }
  },
  _refreshFormatClass: function () {
    var e = this.$element();
    (0, r.each)(k, function (t, n) {
      e.removeClass("dx-datebox-" + n);
    });
    e.addClass("dx-datebox-" + this.option("type"));
  },
  _refreshPickerTypeClass: function () {
    var e = this.$element();
    (0, r.each)(S, function (t, n) {
      e.removeClass("dx-datebox-" + n);
    });
    e.addClass("dx-datebox-" + this._pickerType);
  },
  _formatValidationIcon: function () {
    if ((0, i.hasWindow)()) {
      var e = this._input().get(0);
      var t = this.option("rtlEnabled");
      var n = this._getClearButtonWidth();
      var o = this._getLongestElementDimensions();
      var a = parseFloat(C.getComputedStyle(e).width) - n;
      var r = o.width > a;
      var s = e.style;
      this.$element().toggleClass("dx-show-invalid-badge", !r && this.option("_showValidationIcon"));
      if (r) {
        if (this._storedPadding === undefined) {
          this._storedPadding = t ? o.leftPadding : o.rightPadding;
        }
        if (t) {
          s.paddingLeft = 0;
        } else {
          s.paddingRight = 0;
        }
      } else if (t) {
        s.paddingLeft = this._storedPadding + "px";
      } else {
        s.paddingRight = this._storedPadding + "px";
      }
    }
  },
  _getClearButtonWidth: function () {
    var e = 0;
    if (this._isClearButtonVisible() && this._input().val() === "") {
      var t = this.$element().find(".dx-clear-button-area").get(0);
      e = parseFloat(C.getComputedStyle(t).width);
    }
    return e;
  },
  _getLongestElementDimensions: function () {
    var e = this._strategy.getDisplayFormat(this.option("displayFormat"));
    var t = g.default.format(h.default.getLongestDate(e, g.default.getMonthNames(), g.default.getDayNames()), e);
    var n = this._input();
    var i = n.get(0);
    var o = (0, a.createTextElementHiddenCopy)(n, t);
    var r = this._storedPadding !== undefined ? this._storedPadding : 0;
    o.appendTo(this.$element());
    var s = parseFloat(C.getComputedStyle(o.get(0)).width);
    var l = parseFloat(C.getComputedStyle(i).paddingRight);
    var u = parseFloat(C.getComputedStyle(i).paddingLeft);
    var d = s + u + l + r;
    o.remove();
    return {
      width: d,
      leftPadding: u,
      rightPadding: l
    };
  },
  _getKeyboardListeners: function () {
    return this.callBase().concat([this._strategy && this._strategy.getKeyboardListener()]);
  },
  _renderPopup: function () {
    this.callBase();
    this._popup.$wrapper().addClass("dx-datebox-wrapper");
    this._renderPopupWrapper();
  },
  _getPopupToolbarItems: function () {
    var t;
    var n;
    var i = this.callBase();
    return ((t = (n = this._strategy)._getPopupToolbarItems) === null || t === undefined ? undefined : t.call(n, i)) ?? i;
  },
  _popupConfig: function () {
    var e = this.callBase();
    return (0, s.extend)(this._strategy.popupConfig(e), {
      title: this._getPopupTitle(),
      dragEnabled: false
    });
  },
  _renderPopupWrapper: function () {
    if (this._popup) {
      var e = this.$element();
      var t = (0, s.extend)({}, k, S);
      (0, r.each)(t, function (t, n) {
        e.removeClass("dx-datebox-wrapper-" + n);
      }.bind(this));
      this._popup.$wrapper().addClass("dx-datebox-wrapper-" + this.option("type")).addClass("dx-datebox-wrapper-" + this._pickerType).addClass("dx-dropdowneditor-overlay");
    }
  },
  _renderPopupContent: function () {
    this.callBase();
    this._strategy.renderPopupContent();
  },
  _getFirstPopupElement: function () {
    return this._strategy.getFirstPopupElement() || this.callBase();
  },
  _getLastPopupElement: function () {
    return this._strategy.getLastPopupElement() || this.callBase();
  },
  _popupShowingHandler: function () {
    this.callBase();
    this._strategy.popupShowingHandler();
  },
  _popupShownHandler: function () {
    this.callBase();
    this._strategy.renderOpenedState();
  },
  _popupHiddenHandler: function () {
    this.callBase();
    this._strategy.renderOpenedState();
    this._strategy.popupHiddenHandler();
  },
  _visibilityChanged: function (e) {
    if (e) {
      this._formatValidationIcon();
    }
  },
  _clearValueHandler: function (e) {
    this.option("text", "");
    this.callBase(e);
  },
  _readOnlyPropValue: function () {
    if (this._pickerType === S.rollers) {
      return true;
    }
    var e = u.default.real().platform;
    if (this._isNativeType() && (e === "ios" || e === "android")) {
      return this.option("readOnly");
    } else {
      return this.callBase();
    }
  },
  _isClearButtonVisible: function () {
    return this.callBase() && !this._isNativeType();
  },
  _renderValue: function () {
    var e = this.dateOption("value");
    this.option("text", this._getDisplayedText(e));
    this._strategy.renderValue();
    return this.callBase();
  },
  _setSubmitValue: function () {
    var e = this.dateOption("value");
    var t = this.option("dateSerializationFormat");
    var n = h.default.SUBMIT_FORMATS_MAP[this.option("type")];
    var i = t ? f.default.serializeDate(e, t) : h.default.toStandardDateFormat(e, n);
    this._getSubmitElement().val(i);
  },
  _getDisplayedText: function (e) {
    var t;
    var n = this.option("mode");
    if (n === "text") {
      var i = this._strategy.getDisplayFormat(this.option("displayFormat"));
      t = g.default.format(e, i);
    } else {
      var o = this._getFormatByMode(n);
      t = o ? g.default.format(e, o) : h.default.toStandardDateFormat(e, n);
    }
    return t;
  },
  _getFormatByMode: function (e) {
    if ((0, l.inputType)(e)) {
      return null;
    } else {
      return h.default.FORMATS_MAP[e];
    }
  },
  _valueChangeEventHandler: function (e) {
    var t = this.option();
    var n = t.text;
    var i = t.type;
    var o = t.validationError;
    var a = this.dateOption("value");
    if (n !== this._getDisplayedText(a)) {
      var r = this._getParsedDate(n);
      var s = a ?? this._getDateByDefault();
      var l = h.default.mergeDates(s, r, i);
      var u = r && i === "time" ? l : r;
      if (this._applyInternalValidation(u).isValid) {
        var d = this._getDisplayedText(l);
        if (s && l && s.getTime() === l.getTime() && d !== n) {
          this._renderValue();
        } else {
          this.dateValue(l, e);
        }
      }
    } else {
      this._recallInternalValidation(a, o);
    }
  },
  _recallInternalValidation: function (e, t) {
    if (!t || !!t.editorSpecific) {
      this._applyInternalValidation(e);
      this._applyCustomValidation(e);
    }
  },
  _getDateByDefault: function () {
    return this._strategy.useCurrentDateByDefault() && this._strategy.getDefaultDate();
  },
  _getParsedDate: function (e) {
    var t = this._strategy.getDisplayFormat(this.option("displayFormat"));
    var n = this._strategy.getParsedText(e, t);
    return n ?? undefined;
  },
  _applyInternalValidation: function (e) {
    var t = !!this.option("text") && e !== null;
    var n = !!e && (0, o.isDate)(e) && !isNaN(e.getTime());
    var i = n && c.default.dateInRange(e, this.dateOption("min"), this.dateOption("max"), this.option("type"));
    var a = !t && !e || i;
    var r = "";
    if (n) {
      if (!i) {
        r = this.option("dateOutOfRangeMessage");
      }
    } else {
      r = this.option("invalidDateMessage");
    }
    this._updateInternalValidationState(a, r);
    return {
      isValid: a,
      isDate: n
    };
  },
  _updateInternalValidationState: function (e, t) {
    this.option({
      isValid: e,
      validationError: e ? null : {
        editorSpecific: true,
        message: t
      }
    });
  },
  _applyCustomValidation: function (e) {
    this.validationRequest.fire({
      editor: this,
      value: this._serializeDate(e)
    });
  },
  _isValueChanged: function (e) {
    var t = this.dateOption("value");
    return (t && t.getTime()) !== (e && e.getTime());
  },
  _isTextChanged: function (e) {
    return this.option("text") !== (e && this._getDisplayedText(e) || "");
  },
  _renderProps: function () {
    this.callBase();
    this._input().attr("autocomplete", "off");
  },
  _renderOpenedState: function () {
    if (!this._isNativeType()) {
      this.callBase();
    }
    if (this._strategy.isAdaptivityChanged()) {
      this._refreshStrategy();
    }
  },
  _getPopupTitle: function () {
    var e = this.option("placeholder");
    if (e) {
      return e;
    }
    var t = this.option("type");
    if (t === k.time) {
      return m.default.format("dxDateBox-simulatedDataPickerTitleTime");
    } else if (t === k.date || t === k.datetime) {
      return m.default.format("dxDateBox-simulatedDataPickerTitleDate");
    } else {
      return "";
    }
  },
  _refreshStrategy: function () {
    this._strategy.dispose();
    this._initStrategy();
    this.option(this._strategy.getDefaultOptions());
    this._refresh();
  },
  _applyButtonHandler: function (e) {
    var t = this._strategy.getValue();
    this.dateValue(t, e.event);
    this.callBase();
  },
  _dispose: function () {
    var e;
    this.callBase();
    if ((e = this._strategy) !== null && e !== undefined) {
      e.dispose();
    }
  },
  _isNativeType: function () {
    return this._pickerType === S.native;
  },
  _updatePopupTitle: function () {
    var e;
    if ((e = this._popup) !== null && e !== undefined) {
      e.option("title", this._getPopupTitle());
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "showClearButton":
      case "buttons":
        this.callBase.apply(this, arguments);
        this._formatValidationIcon();
        break;
      case "pickerType":
        this._updatePickerOptions({
          pickerType: e.value
        });
        this._refreshStrategy();
        this._refreshPickerTypeClass();
        this._invalidate();
        break;
      case "type":
        this._updatePickerOptions({
          format: e.value
        });
        this._refreshStrategy();
        this._refreshFormatClass();
        this._renderPopupWrapper();
        this._formatValidationIcon();
        this._updateValue();
        break;
      case "placeholder":
        this.callBase.apply(this, arguments);
        this._updatePopupTitle();
        break;
      case "min":
      case "max":
        var t = this.option("isValid");
        this._applyInternalValidation(this.dateOption("value"));
        if (!t) {
          this._applyCustomValidation(this.dateOption("value"));
        }
        this._invalidate();
        break;
      case "dateSerializationFormat":
      case "interval":
      case "disabledDates":
      case "calendarOptions":
        this._invalidate();
        break;
      case "displayFormat":
        this.option("text", this._getDisplayedText(this.dateOption("value")));
        this._renderInputValue();
        break;
      case "text":
        this._strategy.textChangedHandler(e.value);
        this.callBase.apply(this, arguments);
        break;
      case "isValid":
        this.callBase.apply(this, arguments);
        this._formatValidationIcon();
        break;
      case "showDropDownButton":
        this._formatValidationIcon();
        this.callBase.apply(this, arguments);
        break;
      case "readOnly":
        this.callBase.apply(this, arguments);
        this._formatValidationIcon();
        break;
      case "todayButtonText":
        this._setPopupOption("toolbarItems", this._getPopupToolbarItems());
        break;
      case "invalidDateMessage":
      case "dateOutOfRangeMessage":
      case "adaptivityEnabled":
      case "showAnalogClock":
      case "_showValidationIcon":
        break;
      default:
        this.callBase.apply(this, arguments);
    }
  },
  _getSerializationFormat: function () {
    var e = this.option("value");
    if (this.option("dateSerializationFormat") && (0, d.default)().forceIsoDateParsing) {
      return this.option("dateSerializationFormat");
    } else if ((0, o.isNumeric)(e)) {
      return "number";
    } else if ((0, o.isString)(e)) {
      return f.default.getDateSerializationFormat(e);
    } else {
      return undefined;
    }
  },
  _updateValue: function (e) {
    this.callBase();
    this._applyInternalValidation(e ?? this.dateOption("value"));
  },
  dateValue: function (e, t) {
    var n = this._isValueChanged(e);
    if (n && t) {
      this._saveValueChangeEvent(t);
    }
    if (!n) {
      if (this._isTextChanged(e)) {
        this._updateValue(e);
      } else if (this.option("text") === "") {
        this._applyCustomValidation(e);
      }
    }
    return this.dateOption("value", e);
  },
  dateOption: function (e, t) {
    if (arguments.length === 1) {
      return f.default.deserializeDate(this.option(e));
    }
    this.option(e, this._serializeDate(t));
  },
  _serializeDate: function (e) {
    var t = this._getSerializationFormat();
    return f.default.serializeDate(e, t);
  },
  _clearValue: function () {
    var e = this.option("value");
    this.callBase();
    if (e === null) {
      this._applyCustomValidation(null);
    }
  },
  reset: function () {
    var e = this.option("value");
    this.callBase();
    if (e === null) {
      this._applyInternalValidation(null);
    }
  }
});
exports.default = P;
module.exports = exports.default;
module.exports.default = exports.default;