exports.default = undefined;
var i = v(require("./68374.js"));
var o = v(require("./21516.js"));
var a = require("./95479.js");
var r = require("./39611.js");
var s = v(require("./55994.js"));
var l = require("./13306.js");
var u = require("./31421.js");
var d = require("./35922.js");
var c = v(require("./28109.js"));
var h = require("./20576.js");
var f = require("./68752.js");
var p = require("./765.js");
var g = require("./20175.js");
var m = v(require("./86530.js"));
var _ = v(require("./78013.js"));
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function y() {
  return {};
}
var b = o.default;
var x = {
  0: /[0-9]/,
  9: /[0-9\s]/,
  "#": /[-+0-9\s]/,
  L: function (e) {
    return C(e);
  },
  l: function (e) {
    return C(e) || S(e);
  },
  C: /\S/,
  c: /./,
  A: function (e) {
    return C(e) || w(e);
  },
  a: function (e) {
    return C(e) || w(e) || S(e);
  }
};
function w(e) {
  return /[0-9]/.test(e);
}
function C(e) {
  var t = e.charCodeAt();
  return t > 64 && t < 91 || t > 96 && t < 123 || t > 127;
}
function S(e) {
  return e === " ";
}
var k = m.default.inherit({
  _getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      mask: "",
      maskChar: "_",
      maskRules: {},
      maskInvalidMessage: c.default.format("validation-mask"),
      useMaskedValue: false,
      showMaskMode: "always"
    });
  },
  _supportedKeys: function () {
    var e = this;
    var t = {
      del: e._maskStrategy.getHandler("del"),
      enter: e._changeHandler
    };
    var n = e.callBase();
    (0, a.each)(t, function (t, i) {
      var o = n[t];
      n[t] = function (t) {
        if (e.option("mask")) {
          i.call(e, t);
        }
        if (o) {
          o(t);
        }
      };
    });
    return n;
  },
  _getSubmitElement: function () {
    if (this.option("mask")) {
      return this._$hiddenElement;
    } else {
      return this.callBase();
    }
  },
  _init: function () {
    this.callBase();
    this._initMaskStrategy();
  },
  _initMaskStrategy: function () {
    this._maskStrategy = new _.default(this);
  },
  _initMarkup: function () {
    this._renderHiddenElement();
    this.callBase();
  },
  _attachMouseWheelEventHandlers: function () {
    if (this._onMouseWheel !== h.noop) {
      var e = this._input();
      var t = (0, r.addNamespace)(p.name, this.NAME);
      var n = this._createAction(function (t) {
        var n = t.event;
        if ((0, u.focused)(e) && !(0, r.isCommandKeyPressed)(n)) {
          this._onMouseWheel(n);
          n.preventDefault();
          n.stopPropagation();
        }
      }.bind(this));
      s.default.off(e, t);
      s.default.on(e, t, function (e) {
        n({
          event: e
        });
      });
    }
  },
  _onMouseWheel: h.noop,
  _render: function () {
    this._renderMask();
    this.callBase();
    this._attachMouseWheelEventHandlers();
  },
  _renderHiddenElement: function () {
    if (this.option("mask")) {
      this._$hiddenElement = (0, i.default)("<input>").attr("type", "hidden").appendTo(this._inputWrapper());
    }
  },
  _removeHiddenElement: function () {
    if (this._$hiddenElement) {
      this._$hiddenElement.remove();
    }
  },
  _renderMask: function () {
    this.$element().removeClass("dx-texteditor-masked");
    this._maskRulesChain = null;
    this._maskStrategy.detachEvents();
    if (this.option("mask")) {
      this.$element().addClass("dx-texteditor-masked");
      this._maskStrategy.attachEvents();
      this._parseMask();
      this._renderMaskedValue();
    }
  },
  _suppressCaretChanging: function (e, t) {
    b = y;
    try {
      e.apply(this, t);
    } finally {
      b = o.default;
    }
  },
  _changeHandler: function (e) {
    var t = this._input();
    var n = t.val();
    if (n !== this._changedValue) {
      this._changedValue = n;
      var i = (0, r.createEvent)(e, {
        type: "change"
      });
      s.default.trigger(t, i);
    }
  },
  _parseMask: function () {
    this._maskRules = (0, l.extend)({}, x, this.option("maskRules"));
    this._maskRulesChain = this._parseMaskRule(0);
  },
  _parseMaskRule: function (e) {
    var t = this.option("mask");
    if (e >= t.length) {
      return new g.EmptyMaskRule();
    }
    var n = t[e];
    var i = n === "\\";
    var o = i ? new g.StubMaskRule({
      maskChar: t[e + 1]
    }) : this._getMaskRule(n);
    o.next(this._parseMaskRule(e + 1 + i));
    return o;
  },
  _getMaskRule: function (e) {
    var t;
    (0, a.each)(this._maskRules, function (n, i) {
      if (n === e) {
        t = {
          pattern: n,
          allowedChars: i
        };
        return false;
      }
    });
    if ((0, d.isDefined)(t)) {
      return new g.MaskRule((0, l.extend)({
        maskChar: this.option("maskChar")
      }, t));
    } else {
      return new g.StubMaskRule({
        maskChar: e
      });
    }
  },
  _renderMaskedValue: function () {
    if (this._maskRulesChain) {
      var e = this.option("value") || "";
      this._maskRulesChain.clear(this._normalizeChainArguments());
      var t = {
        length: e.length
      };
      t[this._isMaskedValueMode() ? "text" : "value"] = e;
      this._handleChain(t);
      this._displayMask();
    }
  },
  _replaceSelectedText: function (e, t, n) {
    if (n === undefined) {
      return e;
    } else {
      return e.slice(0, t.start) + n + e.slice(t.end);
    }
  },
  _isMaskedValueMode: function () {
    return this.option("useMaskedValue");
  },
  _displayMask: function (e) {
    e = e || this._caret();
    this._renderValue();
    this._caret(e);
  },
  _isValueEmpty: function () {
    return (0, f.isEmpty)(this._value);
  },
  _shouldShowMask: function () {
    return this.option("showMaskMode") !== "onFocus" || (0, u.focused)(this._input()) || !this._isValueEmpty();
  },
  _showMaskPlaceholder: function () {
    if (this._shouldShowMask()) {
      var e = this._maskRulesChain.text();
      this.option("text", e);
      if (this.option("showMaskMode") === "onFocus") {
        this._renderDisplayText(e);
      }
    }
  },
  _renderValue: function () {
    if (this._maskRulesChain && (this._showMaskPlaceholder(), this._$hiddenElement)) {
      var e = this._maskRulesChain.value();
      var t = (0, f.isEmpty)(e) ? "" : this._getPreparedValue();
      this._$hiddenElement.val(t);
    }
    return this.callBase();
  },
  _getPreparedValue: function () {
    return this._convertToValue().replace(/\s+$/, "");
  },
  _valueChangeEventHandler: function (e) {
    if (this._maskRulesChain) {
      this._saveValueChangeEvent(e);
      this.option("value", this._getPreparedValue());
    } else {
      this.callBase.apply(this, arguments);
    }
  },
  _isControlKeyFired: function (e) {
    return this._isControlKey((0, r.normalizeKeyName)(e)) || (0, r.isCommandKeyPressed)(e);
  },
  _handleChain: function (e) {
    var t = this._maskRulesChain.handle(this._normalizeChainArguments(e));
    this._value = this._maskRulesChain.value();
    this._textValue = this._maskRulesChain.text();
    return t;
  },
  _normalizeChainArguments: function (e) {
    (e = e || {}).index = 0;
    e.fullText = this._maskRulesChain.text();
    return e;
  },
  _convertToValue: function (e) {
    return e = this._isMaskedValueMode() ? this._replaceMaskCharWithEmpty(e || this._textValue || "") : e || this._value || "";
  },
  _replaceMaskCharWithEmpty: function (e) {
    return e.replace(new RegExp(this.option("maskChar"), "g"), " ");
  },
  _maskKeyHandler: function (e, t) {
    var n = this;
    if (!this.option("readOnly")) {
      this.setForwardDirection();
      e.preventDefault();
      this._handleSelection();
      var i = this._input().val();
      function o() {
        if (i !== n._input().val()) {
          s.default.trigger(n._input(), "input");
        }
      }
      var a = t();
      if (a) {
        a.then(o);
      } else {
        this.setForwardDirection();
        this._adjustCaret();
        this._displayMask();
        this._maskRulesChain.reset();
        o();
      }
    }
  },
  _handleKey: function (e, t) {
    this._direction(t || "forward");
    this._adjustCaret(e);
    this._handleKeyChain(e);
    this._moveCaret();
  },
  _handleSelection: function () {
    if (this._hasSelection()) {
      var e = this._caret();
      var t = new Array(e.end - e.start + 1).join(" ");
      this._handleKeyChain(t);
    }
  },
  _handleKeyChain: function (e) {
    var t = this._caret();
    var n = this.isForwardDirection() ? t.start : t.start - 1;
    var i = this.isForwardDirection() ? t.end : t.end - 1;
    var o = n === i ? 1 : i - n;
    this._handleChain({
      text: e,
      start: n,
      length: o
    });
  },
  _tryMoveCaretBackward: function () {
    this.setBackwardDirection();
    var e = this._caret().start;
    this._adjustCaret();
    return !e || e !== this._caret().start;
  },
  _adjustCaret: function (e) {
    var t = this._caret().start;
    var n = this.isForwardDirection();
    var i = this._maskRulesChain.adjustedCaret(t, n, e);
    this._caret({
      start: i,
      end: i
    });
  },
  _moveCaret: function () {
    var e = this._caret().start;
    var t = e + (this.isForwardDirection() ? 0 : -1);
    var n = this._maskRulesChain.isAccepted(t) ? e + (this.isForwardDirection() ? 1 : -1) : e;
    this._caret({
      start: n,
      end: n
    });
  },
  _caret: function (e, t) {
    var n = this._input();
    if (n.length) {
      if (arguments.length) {
        b(n, e, t);
        return;
      } else {
        return b(n);
      }
    }
  },
  _hasSelection: function () {
    var e = this._caret();
    return e.start !== e.end;
  },
  _direction: function (e) {
    if (!arguments.length) {
      return this._typingDirection;
    }
    this._typingDirection = e;
  },
  setForwardDirection: function () {
    this._direction("forward");
  },
  setBackwardDirection: function () {
    this._direction("backward");
  },
  isForwardDirection: function () {
    return this._direction() === "forward";
  },
  _clean: function () {
    if (this._maskStrategy) {
      this._maskStrategy.clean();
    }
    this.callBase();
  },
  _validateMask: function () {
    if (this._maskRulesChain) {
      var e = (0, f.isEmpty)(this.option("value")) || this._maskRulesChain.isValid(this._normalizeChainArguments());
      this.option({
        isValid: e,
        validationError: e ? null : {
          editorSpecific: true,
          message: this.option("maskInvalidMessage")
        }
      });
    }
  },
  _updateHiddenElement: function () {
    this._removeHiddenElement();
    if (this.option("mask")) {
      this._input().removeAttr("name");
      this._renderHiddenElement();
    }
    this._setSubmitElementName(this.option("name"));
  },
  _updateMaskOption: function () {
    this._updateHiddenElement();
    this._renderMask();
    this._validateMask();
  },
  _processEmptyMask: function (e) {
    if (!e) {
      var t = this.option("value");
      this.option({
        text: t,
        isValid: true
      });
      this.validationRequest.fire({
        value: t,
        editor: this
      });
      this._renderValue();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "mask":
        this._updateMaskOption();
        this._processEmptyMask(e.value);
        break;
      case "maskChar":
      case "maskRules":
      case "useMaskedValue":
        this._updateMaskOption();
        break;
      case "value":
        this._renderMaskedValue();
        this._validateMask();
        this.callBase(e);
        this._changedValue = this._input().val();
        break;
      case "maskInvalidMessage":
        break;
      case "showMaskMode":
        this.option("text", "");
        this._renderValue();
        break;
      default:
        this.callBase(e);
    }
  }
});
exports.default = k;
module.exports = exports.default;
module.exports.default = exports.default;