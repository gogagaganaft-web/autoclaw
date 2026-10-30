exports.default = undefined;
var i = _(require("./68374.js"));
var o = _(require("./73349.js"));
var a = _(require("./55994.js"));
var r = require("./20576.js");
var s = require("./35922.js");
var l = require("./60810.js");
var u = require("./13306.js");
var d = _(require("./20530.js"));
var c = _(require("./47810.js"));
var h = _(require("./63513.js"));
var f = require("./39611.js");
var p = _(require("./25353.js"));
var g = _(require("./28109.js"));
var m = require("./62754.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = Math;
var y = ["tab", "del", "backspace", "leftArrow", "rightArrow", "home", "end", "enter"];
var b = h.default.inherit({
  _supportedKeys: function () {
    return (0, u.extend)(this.callBase(), {
      upArrow: function (e) {
        if (!(0, f.isCommandKeyPressed)(e)) {
          e.preventDefault();
          e.stopPropagation();
          this._spinUpChangeHandler(e);
        }
      },
      downArrow: function (e) {
        if (!(0, f.isCommandKeyPressed)(e)) {
          e.preventDefault();
          e.stopPropagation();
          this._spinDownChangeHandler(e);
        }
      },
      enter: function () {}
    });
  },
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      value: 0,
      min: undefined,
      max: undefined,
      step: 1,
      showSpinButtons: false,
      useLargeSpinButtons: true,
      mode: "text",
      invalidValueMessage: g.default.format("dxNumberBox-invalidValueMessage"),
      buttons: undefined
    });
  },
  _useTemplates: function () {
    return false;
  },
  _getDefaultButtons: function () {
    return this.callBase().concat([{
      name: "spins",
      Ctor: p.default
    }]);
  },
  _isSupportInputMode: function () {
    var e = parseFloat(c.default.version);
    return c.default.chrome && e >= 66 || c.default.safari && e >= 12;
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return d.default.real().generic && !d.default.isSimulator();
      },
      options: {
        useLargeSpinButtons: false
      }
    }, {
      device: function () {
        return d.default.real().deviceType !== "desktop" && !this._isSupportInputMode();
      }.bind(this),
      options: {
        mode: "number"
      }
    }]);
  },
  _initMarkup: function () {
    this._renderSubmitElement();
    this.$element().addClass("dx-numberbox");
    this.callBase();
  },
  _getDefaultAttributes: function () {
    var e = this.callBase();
    e.inputmode = "decimal";
    return e;
  },
  _renderContentImpl: function () {
    if (this.option("isValid")) {
      this._validateValue(this.option("value"));
    }
    this.setAria("role", "spinbutton");
  },
  _renderSubmitElement: function () {
    this._$submitElement = (0, i.default)("<input>").attr("type", "hidden").appendTo(this.$element());
    this._setSubmitValue(this.option("value"));
  },
  _setSubmitValue: function (e) {
    this._getSubmitElement().val((0, r.applyServerDecimalSeparator)(e));
  },
  _getSubmitElement: function () {
    return this._$submitElement;
  },
  _keyPressHandler: function (e) {
    this.callBase(e);
    var t = (0, f.getChar)(e);
    if (!/[\d.,eE\-+]/.test(t)) {
      var n = (0, f.normalizeKeyName)(e);
      if ((0, f.isCommandKeyPressed)(e) || n && y.includes(n)) {
        return;
      }
      e.preventDefault();
      return false;
    }
    this._keyPressed = true;
  },
  _onMouseWheel: function (e) {
    if (e.delta > 0) {
      this._spinValueChange(1, e);
    } else {
      this._spinValueChange(-1, e);
    }
  },
  _renderValue: function () {
    var e = this._input().val();
    var t = this.option("value");
    if (!e.length || Number(e) !== t) {
      this._forceValueRender();
      this._toggleEmptinessEventHandler();
    }
    var n = (0, s.isDefined)(t) ? null : g.default.format("dxNumberBox-noDataText");
    this.setAria({
      valuenow: (0, r.ensureDefined)(t, ""),
      valuetext: n
    });
    this.option("text", this._input().val());
    this._updateButtons();
    return new m.Deferred().resolve();
  },
  _forceValueRender: function () {
    var e = this.option("value");
    var t = Number(e);
    var n = isNaN(t) ? "" : this._applyDisplayValueFormatter(e);
    this._renderDisplayText(n);
  },
  _applyDisplayValueFormatter: function (e) {
    return this.option("displayValueFormatter")(e);
  },
  _renderProps: function () {
    this._input().prop({
      min: this.option("min"),
      max: this.option("max"),
      step: this.option("step")
    });
    this.setAria({
      valuemin: (0, r.ensureDefined)(this.option("min"), ""),
      valuemax: (0, r.ensureDefined)(this.option("max"), "")
    });
  },
  _spinButtonsPointerDownHandler: function () {
    var e = this._input();
    if (!this.option("useLargeSpinButtons") && o.default.getActiveElement() !== e[0]) {
      a.default.trigger(e, "focus");
    }
  },
  _spinUpChangeHandler: function (e) {
    if (!this.option("readOnly")) {
      this._spinValueChange(1, e.event || e);
    }
  },
  _spinDownChangeHandler: function (e) {
    if (!this.option("readOnly")) {
      this._spinValueChange(-1, e.event || e);
    }
  },
  _spinValueChange: function (e, t) {
    var n = parseFloat(this.option("step"));
    if (n !== 0) {
      var i = parseFloat(this._normalizeInputValue()) || 0;
      i = this._correctRounding(i, n * e);
      var o = this.option("min");
      var a = this.option("max");
      if ((0, s.isDefined)(o)) {
        i = Math.max(o, i);
      }
      if ((0, s.isDefined)(a)) {
        i = Math.min(a, i);
      }
      this._saveValueChangeEvent(t);
      this.option("value", i);
    }
  },
  _correctRounding: function (e, t) {
    var n = /[,.](.*)/;
    var i = n.test(e);
    var o = n.test(t);
    if (i || o) {
      var a = i ? n.exec(e)[0].length : 0;
      var r = o ? n.exec(t)[0].length : 0;
      var s = v.max(a, r);
      return e = this._round(e + t, s);
    }
    return e + t;
  },
  _round: function (e, t) {
    t = t || 0;
    var n = Math.pow(10, t);
    e *= n;
    return e = Math.round(e) / n;
  },
  _renderValueChangeEvent: function () {
    this.callBase();
    var e = (0, f.addNamespace)("focusout", "NumberBoxForceValueChange");
    a.default.off(this.element(), e);
    a.default.on(this.element(), e, this._forceRefreshInputValue.bind(this));
  },
  _forceRefreshInputValue: function () {
    if (this.option("mode") !== "number") {
      var e = this._input();
      var t = this._applyDisplayValueFormatter(this.option("value"));
      e.val(null);
      e.val(t);
    }
  },
  _valueChangeEventHandler: function (e) {
    var t = this._input();
    var n = this._normalizeText();
    var i = this._parseValue(n);
    var o = n !== "." && n !== "-";
    if (!this._isValueValid() || this._validateValue(i)) {
      if (o) {
        this.callBase(e, isNaN(i) ? null : i);
      }
      this._applyValueBoundaries(n, i);
      this.validationRequest.fire({
        value: i,
        editor: this
      });
    } else {
      t.val(this._applyDisplayValueFormatter(i));
    }
  },
  _applyValueBoundaries: function (e, t) {
    var n = this._isValueIncomplete(e);
    var i = this._isValueInRange(e);
    if (!n && !i && t !== null) {
      if (Number(e) !== t) {
        this._input().val(this._applyDisplayValueFormatter(t));
      }
    }
  },
  _replaceCommaWithPoint: function (e) {
    return e.replace(",", ".");
  },
  _inputIsInvalid: function () {
    var e = this.option("mode") === "number";
    var t = this._input().get(0).validity;
    return e && t && t.badInput;
  },
  _renderDisplayText: function (e) {
    if (!this._inputIsInvalid()) {
      this.callBase(e);
    }
  },
  _isValueIncomplete: function (e) {
    return /(^-$)|(^-?\d*\.$)|(\d+e-?$)/i.test(e);
  },
  _isValueInRange: function (e) {
    return (0, l.inRange)(e, this.option("min"), this.option("max"));
  },
  _isNumber: function (e) {
    return this._parseValue(e) !== null;
  },
  _validateValue: function (e) {
    var t = this._normalizeText();
    var n = this._isValueValid();
    var i = true;
    var o = this._isNumber(t);
    if (isNaN(Number(e))) {
      i = false;
    }
    if (!e && n) {
      i = true;
    } else if (!o && !n) {
      i = false;
    }
    this.option({
      isValid: i,
      validationError: i ? null : {
        editorSpecific: true,
        message: this.option("invalidValueMessage")
      }
    });
    return i;
  },
  _normalizeInputValue: function () {
    return this._parseValue(this._normalizeText());
  },
  _normalizeText: function () {
    var e = this._input().val().trim();
    return this._replaceCommaWithPoint(e);
  },
  _parseValue: function (e) {
    var t = parseFloat(e);
    if (isNaN(t)) {
      return null;
    } else {
      return (0, l.fitIntoRange)(t, this.option("min"), this.option("max"));
    }
  },
  _clearValue: function () {
    if (this._inputIsInvalid()) {
      this._input().val("");
      this._validateValue();
    }
    this.callBase();
  },
  reset: function () {
    if (this.option("value") === null) {
      this.option("text", "");
      if (this._input().length) {
        this._renderValue();
      }
    } else {
      this.option("value", null);
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "value":
        this._validateValue(e.value);
        this._setSubmitValue(e.value);
        this.callBase(e);
        this._resumeValueChangeAction();
        break;
      case "step":
        this._renderProps();
        break;
      case "min":
      case "max":
        this._renderProps();
        this.option("value", this._parseValue(this.option("value")));
        break;
      case "showSpinButtons":
      case "useLargeSpinButtons":
        this._updateButtons(["spins"]);
        break;
      case "invalidValueMessage":
        break;
      default:
        this.callBase(e);
    }
  }
});
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;