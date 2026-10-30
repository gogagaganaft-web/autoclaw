exports.default = undefined;
var i = m(require("./68374.js"));
var o = require("./97906.js");
var a = m(require("./44504.js"));
var r = require("./58201.js");
var s = require("./39611.js");
var l = require("./13306.js");
var u = m(require("./14390.js"));
var d = m(require("./90964.js"));
var c = m(require("./55994.js"));
var h = m(require("./8336.js"));
var f = m(require("./73176.js"));
var p = require("./20576.js");
var g = require("./3532.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var _ = ["outlined", "filled", "underlined"];
var v = {
  validationMessageMode: "mode",
  validationMessagePosition: "positionSide",
  validationMessageOffset: "offset",
  validationBoundary: "boundary"
};
var y = u.default.inherit({
  ctor: function () {
    this.showValidationMessageTimeout = null;
    this.validationRequest = (0, a.default)();
    this.callBase.apply(this, arguments);
  },
  _createElement: function (e) {
    this.callBase(e);
    var t = this.$element();
    if (t) {
      (0, o.data)(t[0], "dx-validation-target", this);
    }
  },
  _initOptions: function (e) {
    this.callBase.apply(this, arguments);
    this.option(d.default.initValidationOptions(e));
  },
  _init: function () {
    this.callBase();
    this._options.cache("validationTooltipOptions", this.option("validationTooltipOptions"));
    this.$element().addClass("dx-show-invalid-badge");
  },
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      value: null,
      name: "",
      onValueChanged: null,
      readOnly: false,
      isValid: true,
      validationError: null,
      validationErrors: null,
      validationStatus: "valid",
      validationMessageMode: "auto",
      validationMessagePosition: "bottom",
      validationBoundary: undefined,
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      validationTooltipOptions: {},
      _showValidationMessage: true
    });
  },
  _attachKeyboardEvents: function () {
    if (!this.option("readOnly")) {
      this.callBase();
    }
  },
  _setOptionsByReference: function () {
    this.callBase();
    (0, l.extend)(this._optionsByReference, {
      validationError: true
    });
  },
  _createValueChangeAction: function () {
    this._valueChangeAction = this._createActionByOption("onValueChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  },
  _suppressValueChangeAction: function () {
    this._valueChangeActionSuppressed = true;
  },
  _resumeValueChangeAction: function () {
    this._valueChangeActionSuppressed = false;
  },
  _initMarkup: function () {
    var e;
    this._toggleReadOnlyState();
    this._setSubmitElementName(this.option("name"));
    this.callBase();
    this._renderValidationState();
    if ((e = this.option("_onMarkupRendered")) !== null && e !== undefined) {
      e();
    }
  },
  _raiseValueChangeAction: function (e, t) {
    if (!this._valueChangeAction) {
      this._createValueChangeAction();
    }
    this._valueChangeAction(this._valueChangeArgs(e, t));
  },
  _valueChangeArgs: function (e, t) {
    return {
      value: e,
      previousValue: t,
      event: this._valueChangeEventInstance
    };
  },
  _saveValueChangeEvent: function (e) {
    this._valueChangeEventInstance = e;
  },
  _focusInHandler: function (e) {
    var t = this.option("validationMessageMode") === "auto";
    if (this._canValueBeChangedByClick() && t) {
      var n;
      var i = (n = this._validationMessage) === null || n === undefined ? undefined : n.$wrapper();
      if (i != null) {
        i.removeClass("dx-invalid-message-auto");
      }
      clearTimeout(this.showValidationMessageTimeout);
      this.showValidationMessageTimeout = setTimeout(function () {
        if (i == null) {
          return undefined;
        } else {
          return i.addClass("dx-invalid-message-auto");
        }
      }, 150);
    }
    return this.callBase(e);
  },
  _canValueBeChangedByClick: function () {
    return false;
  },
  _getStylingModePrefix: function () {
    return "dx-editor-";
  },
  _renderStylingMode: function () {
    var e = this;
    var t = this.option("stylingMode");
    var n = this._getStylingModePrefix();
    var i = _.map(function (e) {
      return n + e;
    });
    i.forEach(function (t) {
      return e.$element().removeClass(t);
    });
    var o = n + t;
    if (i.indexOf(o) === -1) {
      var a = this._getDefaultOptions().stylingMode;
      var r = this._convertRulesToOptions(this._defaultOptionsRules()).stylingMode;
      o = n + (r || a);
    }
    this.$element().addClass(o);
  },
  _getValidationErrors: function () {
    var e = this.option("validationErrors");
    if (!e && this.option("validationError")) {
      e = [this.option("validationError")];
    }
    return e;
  },
  _disposeValidationMessage: function () {
    if (this._$validationMessage) {
      this._$validationMessage.remove();
      this.setAria("describedby", null);
      this._$validationMessage = undefined;
      this._validationMessage = undefined;
    }
  },
  _toggleValidationClasses: function (e) {
    this.$element().toggleClass("dx-invalid", e);
    this.setAria("invalid", e || undefined);
  },
  _renderValidationState: function () {
    var e = this.option("isValid") && this.option("validationStatus") !== "invalid";
    var t = this._getValidationErrors();
    var n = this.$element();
    this._toggleValidationClasses(!e);
    if ((0, r.hasWindow)() && this.option("_showValidationMessage") !== false && (this._disposeValidationMessage(), !e && t)) {
      var o = this.option();
      var a = o.validationMessageMode;
      var s = o.validationMessageOffset;
      var u = o.validationBoundary;
      var d = o.rtlEnabled;
      this._$validationMessage = (0, i.default)("<div>").appendTo(n);
      var c = `dx-${new f.default()}`;
      this.setAria("describedby", c);
      this._validationMessage = new h.default(this._$validationMessage, (0, l.extend)({
        validationErrors: t,
        rtlEnabled: d,
        target: this._getValidationMessageTarget(),
        visualContainer: n,
        mode: a,
        positionSide: this._getValidationMessagePosition(),
        offset: s,
        boundary: u,
        contentId: c
      }, this._options.cache("validationTooltipOptions")));
      this._bindInnerWidgetOptions(this._validationMessage, "validationTooltipOptions");
    }
  },
  _getValidationMessagePosition: function () {
    return this.option("validationMessagePosition");
  },
  _getValidationMessageTarget: function () {
    return this.$element();
  },
  _toggleReadOnlyState: function () {
    var e = this.option("readOnly");
    this._toggleBackspaceHandler(e);
    this.$element().toggleClass("dx-state-readonly", !!e);
    this.setAria("readonly", e || undefined);
  },
  _toggleBackspaceHandler: function (e) {
    var t = this._keyboardEventBindingTarget();
    var n = (0, s.addNamespace)("keydown", "editorReadOnly");
    c.default.off(t, n);
    if (e) {
      c.default.on(t, n, function (e) {
        if ((0, s.normalizeKeyName)(e) === "backspace") {
          e.preventDefault();
        }
      });
    }
  },
  _dispose: function () {
    var e = this.$element()[0];
    (0, o.data)(e, "dx-validation-target", null);
    clearTimeout(this.showValidationMessageTimeout);
    this._disposeValidationMessage();
    this.callBase();
  },
  _setSubmitElementName: function (e) {
    var t = this._getSubmitElement();
    if (t) {
      if (e.length > 0) {
        t.attr("name", e);
      } else {
        t.removeAttr("name");
      }
    }
  },
  _getSubmitElement: function () {
    return null;
  },
  _setValidationMessageOption: function (e) {
    var t;
    var n = e.name;
    var i = e.value;
    var o = v[n] ? v[n] : n;
    if ((t = this._validationMessage) !== null && t !== undefined) {
      t.option(o, i);
    }
  },
  _hasActiveElement: p.noop,
  _optionChanged: function (e) {
    var t;
    switch (e.name) {
      case "onValueChanged":
        this._createValueChangeAction();
        break;
      case "readOnly":
        this._toggleReadOnlyState();
        this._refreshFocusState();
        break;
      case "value":
        if (e.value != e.previousValue) {
          this.validationRequest.fire({
            value: e.value,
            editor: this
          });
        }
        if (!this._valueChangeActionSuppressed) {
          this._raiseValueChangeAction(e.value, e.previousValue);
          this._saveValueChangeEvent(undefined);
        }
        break;
      case "width":
        this.callBase(e);
        if ((t = this._validationMessage) !== null && t !== undefined) {
          t.updateMaxWidth();
        }
        break;
      case "name":
        this._setSubmitElementName(e.value);
        break;
      case "isValid":
      case "validationError":
      case "validationErrors":
      case "validationStatus":
        this.option(d.default.synchronizeValidationOptions(e, this.option()));
        this._renderValidationState();
        break;
      case "validationBoundary":
      case "validationMessageMode":
      case "validationMessagePosition":
      case "validationMessageOffset":
        this._setValidationMessageOption(e);
        break;
      case "rtlEnabled":
        this._setValidationMessageOption(e);
        this.callBase(e);
        break;
      case "validationTooltipOptions":
        this._innerWidgetOptionChanged(this._validationMessage, e);
        break;
      case "_showValidationMessage":
        break;
      default:
        this.callBase(e);
    }
  },
  blur: function () {
    if (this._hasActiveElement()) {
      (0, g.resetActiveElement)();
    }
  },
  reset: function () {
    var e = this._getDefaultOptions();
    this.option("value", e.value);
  }
});
y.isEditor = function (e) {
  return e instanceof y;
};
var b = y;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;