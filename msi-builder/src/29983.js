exports.default = undefined;
var i = g(require("./55994.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = g(require("./20530.js"));
var s = require("./60810.js");
var l = g(require("./18016.js"));
var u = require("./58048.js");
var d = require("./70629.js");
var c = g(require("./35567.js"));
var h = require("./39611.js");
var f = require("./20576.js");
var p = require("./7206.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = c.default.inherit({
  _getDefaultOptions: function () {
    return (0, o.extend)(this.callBase(), {
      useMaskBehavior: true,
      format: null
    });
  },
  _isDeleteKey: function (e) {
    return e === "del";
  },
  _supportedKeys: function () {
    if (!this._useMaskBehavior()) {
      return this.callBase();
    }
    return (0, o.extend)(this.callBase(), {
      minus: this._revertSign.bind(this),
      del: this._removeHandler.bind(this),
      backspace: this._removeHandler.bind(this),
      leftArrow: this._arrowHandler.bind(this, -1),
      rightArrow: this._arrowHandler.bind(this, 1),
      home: this._moveCaretToBoundaryEventHandler.bind(this, 1),
      enter: this._updateFormattedValue.bind(this),
      end: this._moveCaretToBoundaryEventHandler.bind(this, -1)
    });
  },
  _getTextSeparatorIndex: function (e) {
    var t = l.default.getDecimalSeparator();
    var n = (0, p.getRealSeparatorIndex)(this.option("format")).occurrence;
    return (0, p.getNthOccurrence)(e, t, n);
  },
  _focusInHandler: function (e) {
    if (!this._preventNestedFocusEvent(e)) {
      this.clearCaretTimeout();
      this._caretTimeout = setTimeout(function () {
        this._caretTimeout = undefined;
        var t = this._caret();
        if (t.start === t.end && this._useMaskBehavior()) {
          var n = this._getInputVal();
          var i = this._getTextSeparatorIndex(n);
          if (i >= 0) {
            this._caret({
              start: i,
              end: i
            });
          } else {
            this._moveCaretToBoundaryEventHandler(-1, e);
          }
        }
      }.bind(this), 0);
    }
    this.callBase(e);
  },
  _focusOutHandler: function (e) {
    var t = !this._preventNestedFocusEvent(e);
    if (t) {
      this._focusOutOccurs = true;
      if (this._useMaskBehavior()) {
        this._updateFormattedValue();
      }
    }
    this.callBase(e);
    if (t) {
      this._focusOutOccurs = false;
    }
  },
  _hasValueBeenChanged: function (e) {
    var t = this._getFormatPattern();
    var n = this.option("value");
    return (this._format(n, t) || "") !== e;
  },
  _updateFormattedValue: function () {
    var e = this._getInputVal();
    if (this._hasValueBeenChanged(e)) {
      this._updateParsedValue();
      this._adjustParsedValue();
      this._setTextByParsedValue();
      if (this._parsedValue !== this.option("value")) {
        i.default.trigger(this._input(), "change");
      }
    }
  },
  _arrowHandler: function (e, t) {
    if (this._useMaskBehavior()) {
      var n = this._getInputVal();
      var i = this._getFormatPattern();
      var o = (0, u.getCaretWithOffset)(this._caret(), e);
      if (!(0, u.isCaretInBoundaries)(o, n, i)) {
        o = e === 1 ? o.end : o.start;
        t.preventDefault();
        this._caret((0, u.getCaretInBoundaries)(o, n, i));
      }
    }
  },
  _moveCaretToBoundary: function (e) {
    var t = (0, u.getCaretBoundaries)(this._getInputVal(), this._getFormatPattern());
    var n = (0, u.getCaretWithOffset)(e === 1 ? t.start : t.end, 0);
    this._caret(n);
  },
  _moveCaretToBoundaryEventHandler: function (e, t) {
    if (!!this._useMaskBehavior() && (!t || !t.shiftKey)) {
      this._moveCaretToBoundary(e);
      if (t) {
        t.preventDefault();
      }
    }
  },
  _shouldMoveCaret: function (e, t) {
    var n = l.default.getDecimalSeparator();
    var i = e.charAt(t.end) === n;
    return (this._lastKey === n || this._lastKey === "." || this._lastKey === ",") && i;
  },
  _getInputVal: function () {
    return l.default.convertDigits(this._input().val(), true);
  },
  _keyboardHandler: function (e) {
    this.clearCaretTimeout();
    this._lastKey = l.default.convertDigits((0, h.getChar)(e), true);
    this._lastKeyName = (0, h.normalizeKeyName)(e);
    if (!this._shouldHandleKey(e.originalEvent)) {
      return this.callBase(e);
    }
    var t = this._getInputVal();
    var n = this._caret();
    var i = this._lastKeyName === "minus" ? "" : this._lastKey;
    var o = this._tryParse(t, n, i);
    if (this._shouldMoveCaret(t, n)) {
      this._moveCaret(1);
      e.originalEvent.preventDefault();
    }
    if (o === undefined) {
      if (this._lastKeyName !== "minus") {
        e.originalEvent.preventDefault();
      }
    } else {
      this._parsedValue = o;
    }
    return this.callBase(e);
  },
  _keyPressHandler: function (e) {
    if (!this._useMaskBehavior()) {
      this.callBase(e);
    }
  },
  _removeHandler: function (e) {
    var t = this._caret();
    var n = this._getInputVal();
    var o = t.start;
    var a = t.end;
    this._lastKey = (0, h.getChar)(e);
    this._lastKeyName = (0, h.normalizeKeyName)(e);
    var r = this._isDeleteKey(this._lastKeyName);
    var s = !r;
    if (o === a) {
      if ((!s || !(o > 0)) && (!r || !(o < n.length))) {
        e.preventDefault();
        return;
      }
      if (r) {
        a++;
      }
      if (s) {
        o--;
      }
    }
    var u = n.slice(o, a);
    if (this._isStub(u)) {
      this._moveCaret(r ? 1 : -1);
      if (this._parsedValue < 0 || 1 / this._parsedValue == -Infinity) {
        this._revertSign(e);
        this._setTextByParsedValue();
        if (this.option("valueChangeEvent").split(" ").includes("input")) {
          i.default.trigger(this._input(), "input");
        }
      }
      e.preventDefault();
    } else {
      var d = l.default.getDecimalSeparator();
      if (u !== d) {
        if (a - o < n.length) {
          if (this._replaceSelectedText(n, {
            start: o,
            end: a
          }, "").search(/[0-9]/) < 0 && this._isValueInRange(0)) {
            this._parsedValue = this._parsedValue < 0 || 1 / this._parsedValue == -Infinity ? -0 : 0;
            return;
          }
        }
        var c = this._tryParse(n, {
          start: o,
          end: a
        }, "");
        if (c === undefined) {
          e.preventDefault();
        } else {
          this._parsedValue = c;
        }
      } else {
        var f = n.indexOf(d);
        if (this._isNonStubAfter(f + 1)) {
          this._moveCaret(r ? 1 : -1);
          e.preventDefault();
        }
      }
    }
  },
  _isPercentFormat: function () {
    return this._getFormatPattern().replace(/'[^']+'/g, "").indexOf("%") !== -1;
  },
  _parse: function (e, t) {
    var n = this.option("format");
    var i = (0, a.isFunction)(n.parser);
    var o = i ? n.parser : l.default.parse;
    var r = 0;
    if (!i) {
      var s = (0, p.getRealSeparatorIndex)(t).index;
      var u = this._getTextSeparatorIndex(e);
      var d = s !== -1 ? s : t.length;
      var c = u !== -1 ? u : e.length;
      if (c > d && t.indexOf("#") === -1) {
        r = c - d;
      }
    }
    return o(e = e.substr(r), t);
  },
  _format: function (e, t) {
    var n = this.option("format");
    var i = (n == null ? undefined : n.formatter) || n;
    var o = (0, a.isFunction)(i) ? i : l.default.format;
    if (e === null) {
      return "";
    } else {
      return o(e, t);
    }
  },
  _getFormatPattern: function () {
    if (!this._currentFormat) {
      this._updateFormat();
    }
    return this._currentFormat;
  },
  _updateFormat: function () {
    var e = this;
    var t = this.option("format");
    var n = (0, a.isFunction)(t == null ? undefined : t.parser);
    var i = (0, a.isString)(t) && (t.indexOf("0") >= 0 || t.indexOf("#") >= 0);
    var o = t === "exponential" || (t == null ? undefined : t.type) === "exponential";
    var r = n || i || o;
    this._currentFormat = r ? t : (0, d.getFormat)(function (n) {
      var i = e._format(n, t);
      return l.default.convertDigits(i, true);
    });
  },
  _getFormatForSign: function (e) {
    var t = this._getFormatPattern();
    if ((0, a.isString)(t)) {
      var n = t.split(";");
      var i = l.default.getSign(e, t);
      n[1] = n[1] || "-" + n[0];
      if (i < 0) {
        return n[1];
      } else {
        return n[0];
      }
    }
    if (l.default.getSign(e) < 0) {
      return "-";
    } else {
      return "";
    }
  },
  _removeStubs: function (e, t) {
    var n = this._getFormatForSign(e);
    var i = l.default.getThousandsSeparator();
    var o = this._getStubs(n);
    var a = e;
    if (o.length) {
      var r = o[0];
      var s = new RegExp("(" + (0, f.escapeRegExp)(o[1] || "") + ")$", "g");
      var u = new RegExp("[-" + (0, f.escapeRegExp)(t ? "" : i) + "]", "g");
      a = a.replace(r, "").replace(s, "").replace(u, "");
    }
    return a;
  },
  _getStubs: function (e) {
    var t = /[^']([#0.,]+)/g.exec(e);
    var n = t && t[0].trim();
    return e.split(n).map(function (e) {
      return e.replace(/'/g, "");
    });
  },
  _truncateToPrecision: function (e, t) {
    if ((0, a.isDefined)(e)) {
      var n = e.toString();
      var i = n.indexOf(".");
      if (n && i > -1) {
        var o = parseFloat(n.substr(0, i + t + 1));
        if (isNaN(o)) {
          return e;
        } else {
          return o;
        }
      }
    }
    return e;
  },
  _tryParse: function (e, t, n) {
    var i = this._replaceSelectedText(e, t, n);
    var o = this._getFormatPattern();
    var a = t.start !== t.end;
    var r = this._getParsedValue(i, o);
    var s = !o.parser && this._getPrecisionLimits(i).max;
    var u = r !== this._parsedValue;
    var d = n === l.default.getDecimalSeparator() && s === 0;
    var c = !a && !u && n !== "-" && !this._isValueIncomplete(i) && this._isStub(n);
    if (!d && !c && (this._removeStubs(i) === "" && (r = Math.abs(this._parsedValue * 0)), !isNaN(r))) {
      var h = r === null ? this._parsedValue : r;
      r = s ? this._truncateToPrecision(h, s) : r;
      if (!o.parser && this._isPercentFormat()) {
        return (0, p.adjustPercentValue)(r, s);
      } else {
        return r;
      }
    }
  },
  _getParsedValue: function (e, t) {
    var n = l.default.getSign(e, (t == null ? undefined : t.formatter) || t);
    var i = this._removeStubs(e, true);
    var o = this._parse(i, t);
    var r = o < 0 ? -1 : 1;
    if ((0, a.isNumeric)(o) && n !== r) {
      return n * o;
    } else {
      return o;
    }
  },
  _isValueIncomplete: function (e) {
    if (!this._useMaskBehavior()) {
      return this.callBase(e);
    }
    var t = this._caret();
    var n = l.default.getDecimalSeparator();
    var i = this._getTextSeparatorIndex(e);
    var o = i >= 0 && i < t.start;
    var a = this._removeStubs(e, true).split(n);
    if (!o || a.length !== 2) {
      return false;
    }
    var r = a[1].length;
    var u = !!this._getFormatPattern().parser;
    var d = !u && this._getPrecisionLimits(this._getFormatPattern(), e);
    var c = !!u || (0, s.inRange)(r, d.min, d.max);
    var h = a[1].charAt(r - 1) === "0";
    return c && (h || !r);
  },
  _isValueInRange: function (e) {
    var t = (0, f.ensureDefined)(this.option("min"), -Infinity);
    var n = (0, f.ensureDefined)(this.option("max"), Infinity);
    return (0, s.inRange)(e, t, n);
  },
  _setInputText: function (e) {
    var t = l.default.convertDigits(e, true);
    var n = (0, u.getCaretAfterFormat)(this._getInputVal(), t, this._caret(), this._getFormatPattern());
    this._input().val(e);
    this._toggleEmptinessEventHandler();
    this._formattedValue = e;
    if (!this._focusOutOccurs) {
      this._caret(n);
    }
  },
  _useMaskBehavior: function () {
    return !!this.option("format") && this.option("useMaskBehavior");
  },
  _renderInputType: function () {
    var e = this.option("mode") === "number";
    var t = r.default.real().deviceType === "desktop";
    if (this._useMaskBehavior() && e) {
      this._setInputType(t || this._isSupportInputMode() ? "text" : "tel");
    } else {
      this.callBase();
    }
  },
  _isChar: function (e) {
    return (0, a.isString)(e) && e.length === 1;
  },
  _moveCaret: function (e) {
    if (e) {
      var t = (0, u.getCaretWithOffset)(this._caret(), e);
      var n = (0, u.getCaretInBoundaries)(t, this._getInputVal(), this._getFormatPattern());
      this._caret(n);
    }
  },
  _shouldHandleKey: function (e) {
    var t = (0, h.normalizeKeyName)(e);
    var n = (0, h.isCommandKeyPressed)(e) || e.altKey || e.shiftKey || !this._isChar(t);
    var i = t === "minus";
    return this._useMaskBehavior() && !n && !i;
  },
  _renderInput: function () {
    this.callBase();
    this._renderFormatter();
  },
  _renderFormatter: function () {
    this._clearCache();
    this._detachFormatterEvents();
    if (this._useMaskBehavior()) {
      this._attachFormatterEvents();
    }
  },
  _detachFormatterEvents: function () {
    i.default.off(this._input(), ".dxNumberFormatter");
  },
  _isInputFromPaste: function (e) {
    var t = e.originalEvent && e.originalEvent.inputType;
    if ((0, a.isDefined)(t)) {
      return t === "insertFromPaste";
    } else {
      return this._isValuePasted;
    }
  },
  _attachFormatterEvents: function () {
    var e = this._input();
    i.default.on(e, (0, h.addNamespace)("input", "dxNumberFormatter"), function (e) {
      this._formatValue(e);
      this._isValuePasted = false;
    }.bind(this));
    i.default.on(e, (0, h.addNamespace)("dxclick", "dxNumberFormatter"), function () {
      this._caretTimeout ||= setTimeout(function () {
        this._caretTimeout = undefined;
        this._caret((0, u.getCaretInBoundaries)(this._caret(), this._getInputVal(), this._getFormatPattern()));
      }.bind(this), 0);
    }.bind(this));
    i.default.on(e, "dxdblclick", function () {
      this.clearCaretTimeout();
    }.bind(this));
  },
  clearCaretTimeout: function () {
    clearTimeout(this._caretTimeout);
    this._caretTimeout = undefined;
  },
  _forceRefreshInputValue: function () {
    if (!this._useMaskBehavior()) {
      return this.callBase();
    }
  },
  _isNonStubAfter: function (e) {
    var t = this._getInputVal().slice(e);
    return t && !this._isStub(t, true);
  },
  _isStub: function (e, t) {
    var n = (0, f.escapeRegExp)(l.default.getDecimalSeparator());
    return new RegExp("^[^0-9" + n + "]+$", "g").test(e) && (t || this._isChar(e));
  },
  _parseValue: function (e) {
    if (this._useMaskBehavior()) {
      return this._parsedValue;
    } else {
      return this.callBase(e);
    }
  },
  _getPrecisionLimits: function (e) {
    var t = this._getFormatForSign(e);
    var n = (0, p.getRealSeparatorIndex)(t).index;
    var i = ((0, p.splitByIndex)(t, n)[1] || "").replace(/[^#0]/g, "");
    return {
      min: i.replace(/^(0*)#*/, "$1").length,
      max: i.length
    };
  },
  _revertSign: function (e) {
    if (this._useMaskBehavior()) {
      var t = this._caret();
      if (t.start !== t.end) {
        if ((0, h.normalizeKeyName)(e) === "minus") {
          this._applyRevertedSign(e, t, true);
          return;
        }
        this._caret((0, u.getCaretInBoundaries)(0, this._getInputVal(), this._getFormatPattern()));
      }
      this._applyRevertedSign(e, t);
    }
  },
  _applyRevertedSign: function (e, t, n) {
    var i = (0, f.ensureDefined)(this._parsedValue, null) * -1;
    if ((this._isValueInRange(i) || i === 0) && (this._parsedValue = i, n)) {
      var o = this._getFormatPattern();
      var a = this._getInputVal();
      this._setTextByParsedValue();
      e.preventDefault();
      var r = this._getInputVal();
      var s = (0, u.getCaretOffset)(a, r, o);
      t = (0, u.getCaretWithOffset)(t, s);
      var l = (0, u.getCaretInBoundaries)(t, r, o);
      this._caret(l);
    }
  },
  _removeMinusFromText: function (e, t) {
    if (this._lastKeyName === "minus" && e.charAt(t.start - 1) === "-") {
      return this._replaceSelectedText(e, {
        start: t.start - 1,
        end: t.start
      }, "");
    } else {
      return e;
    }
  },
  _setTextByParsedValue: function () {
    var e = this._getFormatPattern();
    var t = this._parseValue();
    var n = this._format(t, e) || "";
    this._setInputText(n);
  },
  _formatValue: function (e) {
    var t = this._getInputVal();
    var n = this._caret();
    var i = this._removeMinusFromText(t, n);
    var o = i !== t;
    t = i;
    if (!this._isInputFromPaste(e) && this._isValueIncomplete(i)) {
      this._formattedValue = t;
      if (o) {
        this._setTextByParsedValue();
      }
      return;
    }
    if (l.default.convertDigits(this._formattedValue, true) !== t) {
      var r = this._tryParse(t, n, "");
      if ((0, a.isDefined)(r)) {
        this._parsedValue = r;
      }
    }
    this._setTextByParsedValue();
  },
  _renderDisplayText: function () {
    if (this._useMaskBehavior()) {
      this._toggleEmptinessEventHandler();
    } else {
      this.callBase.apply(this, arguments);
    }
  },
  _renderValue: function () {
    if (this._useMaskBehavior()) {
      this._parsedValue = this.option("value");
      this._setTextByParsedValue();
    }
    return this.callBase();
  },
  _updateParsedValue: function () {
    var e = this._getInputVal();
    this._parsedValue = this._tryParse(e, this._caret());
  },
  _adjustParsedValue: function () {
    if (this._useMaskBehavior()) {
      var e = this._removeStubs(this._getInputVal()) ? this._parseValue() : null;
      if ((0, a.isNumeric)(e)) {
        this._parsedValue = (0, s.fitIntoRange)(e, this.option("min"), this.option("max"));
      } else {
        this._parsedValue = e;
      }
    }
  },
  _valueChangeEventHandler: function (e) {
    if (!this._useMaskBehavior()) {
      return this.callBase(e);
    }
    var t = this._caret();
    this._saveValueChangeEvent(e);
    this._lastKey = null;
    this._lastKeyName = null;
    this._updateParsedValue();
    this._adjustParsedValue();
    this.option("value", this._parsedValue);
    if (t) {
      this._caret(t);
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "format":
      case "useMaskBehavior":
        this._renderInputType();
        this._updateFormat();
        this._renderFormatter();
        this._renderValue();
        this._refreshValueChangeEvent();
        this._refreshEvents();
        break;
      case "min":
      case "max":
        this._adjustParsedValue();
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  },
  _clearCache: function () {
    delete this._formattedValue;
    delete this._lastKey;
    delete this._lastKeyName;
    delete this._parsedValue;
    delete this._focusOutOccurs;
    clearTimeout(this._caretTimeout);
    delete this._caretTimeout;
  },
  _clean: function () {
    this._clearCache();
    this.callBase();
  }
});
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;