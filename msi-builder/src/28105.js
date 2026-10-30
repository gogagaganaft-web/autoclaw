exports.default = undefined;
var i = require("./39611.js");
var o = require("./35922.js");
var a = require("./3532.js");
var r = require("./13306.js");
var s = require("./60810.js");
var l = _(require("./55994.js"));
var u = require("./28298.js");
var d = _(require("./91500.js"));
var c = require("./2892.js");
var h = require("./59937.js");
var f = _(require("./69248.js"));
var p = _(require("./18016.js"));
var g = _(require("./20530.js"));
var m = _(require("./47810.js"));
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = f.default.inherit({
  _supportedKeys: function (e) {
    var t = this;
    var n = this.callBase(e);
    function o(e) {
      var o = n[(0, i.normalizeKeyName)(e)];
      return o && o.apply(t, [e]);
    }
    function a(e, n) {
      if (t._shouldUseOriginalHandler(e)) {
        return o.apply(t, [e]);
      } else {
        return n.apply(t, [e]);
      }
    }
    return (0, r.extend)({}, n, {
      del: function (e) {
        return a(e, function (e) {
          t._revertPart(1);
          if (!t._isAllSelected()) {
            e.preventDefault();
          }
        });
      },
      backspace: function (e) {
        return a(e, function (e) {
          t._revertPart(-1);
          if (!t._isAllSelected()) {
            e.preventDefault();
          }
        });
      },
      home: function (e) {
        return a(e, function (e) {
          t._selectFirstPart();
          e.preventDefault();
        });
      },
      end: function (e) {
        return a(e, function (e) {
          t._selectLastPart();
          e.preventDefault();
        });
      },
      escape: function (e) {
        return a(e, function (e) {
          t._revertChanges(e);
        });
      },
      enter: function (e) {
        return a(e, function () {
          t._enterHandler();
        });
      },
      leftArrow: function (e) {
        return a(e, function (e) {
          t._selectNextPart(-1);
          e.preventDefault();
        });
      },
      rightArrow: function (e) {
        return a(e, function (e) {
          t._selectNextPart(1);
          e.preventDefault();
        });
      },
      upArrow: function (e) {
        return a(e, function (e) {
          t._upDownArrowHandler(1);
          e.preventDefault();
        });
      },
      downArrow: function (e) {
        return a(e, function (e) {
          t._upDownArrowHandler(-1);
          e.preventDefault();
        });
      }
    });
  },
  _shouldUseOriginalHandler: function (e) {
    var t = this.option("opened") && e && ["backspace", "del"].indexOf((0, i.normalizeKeyName)(e)) === -1;
    return !this._useMaskBehavior() || t || e && e.altKey;
  },
  _upDownArrowHandler: function (e) {
    this._setNewDateIfEmpty();
    var t = this._getActivePartValue(this._initialMaskValue);
    var n = this._getActivePartValue() - t;
    this._loadMaskValue(this._initialMaskValue);
    this._partIncrease(n + e, true);
  },
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      useMaskBehavior: false,
      emptyDateValue: new Date(2000, 0, 1, 0, 0, 0)
    });
  },
  _isSingleCharKey: function (e) {
    var t = e.originalEvent;
    var n = e.alt;
    var o = t.data || t.key;
    return typeof o == "string" && o.length === 1 && !n && !(0, i.isCommandKeyPressed)(t);
  },
  _isSingleDigitKey: function (e) {
    var n = e.originalEvent?.data;
    return (n == null ? undefined : n.length) === 1 && parseInt(n, 10);
  },
  _useBeforeInputEvent: function () {
    return g.default.real().android;
  },
  _keyInputHandler: function (e, t) {
    var n = this._input().val();
    this._processInputKey(t);
    e.preventDefault();
    if (n !== this._input().val()) {
      l.default.trigger(this._input(), "input");
    }
  },
  _keyboardHandler: function (e) {
    var t = this;
    var n = e.originalEvent.key;
    var i = this.callBase(e);
    if (!!this._useMaskBehavior() && !this._useBeforeInputEvent()) {
      if (m.default.chrome && e.key === "Process" && e.code.indexOf("Digit") === 0) {
        n = e.code.replace("Digit", "");
        this._processInputKey(n);
        this._maskInputHandler = function () {
          t._renderSelectedPart();
        };
      } else if (this._isSingleCharKey(e)) {
        this._keyInputHandler(e.originalEvent, n);
      }
    }
    return i;
  },
  _maskBeforeInputHandler: function (e) {
    var t = this;
    this._maskInputHandler = null;
    var n = e.originalEvent.inputType;
    if (n === "insertCompositionText") {
      this._maskInputHandler = function () {
        t._renderSelectedPart();
      };
    }
    var i = n === "deleteContentBackward";
    if (i || n === "deleteContentForward") {
      var o = i ? -1 : 1;
      this._maskInputHandler = function () {
        t._revertPart();
        t._selectNextPart(o);
      };
    }
    if (this._useMaskBehavior() && this._isSingleCharKey(e)) {
      var a = e.originalEvent.data;
      this._keyInputHandler(e, a);
      return true;
    }
  },
  _keyPressHandler: function (e) {
    var t = e.originalEvent;
    if ((t == null ? undefined : t.inputType) === "insertCompositionText" && this._isSingleDigitKey(e)) {
      this._processInputKey(t.data);
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._selectNextPart();
    }
    this.callBase(e);
    if (this._maskInputHandler) {
      this._maskInputHandler();
      this._maskInputHandler = null;
    }
  },
  _processInputKey: function (e) {
    if (this._isAllSelected()) {
      this._activePartIndex = 0;
    }
    this._setNewDateIfEmpty();
    if (isNaN(parseInt(e))) {
      this._searchString(e);
    } else {
      this._searchNumber(e);
    }
  },
  _isAllSelected: function () {
    var e = this._caret();
    return e.end - e.start === this.option("text").length;
  },
  _getFormatPattern: function () {
    if (this._formatPattern) {
      return this._formatPattern;
    }
    var e = this._strategy.getDisplayFormat(this.option("displayFormat"));
    var t = (0, o.isString)(e) && !d.default._getPatternByFormat(e);
    this._formatPattern = t ? e : (0, h.getFormat)(function (t) {
      return d.default.format(t, e);
    });
    return this._formatPattern;
  },
  _setNewDateIfEmpty: function () {
    if (!this._maskValue) {
      var e = this.option("type") === "time" ? new Date(null) : new Date();
      this._maskValue = e;
      this._initialMaskValue = e;
      this._renderDateParts();
    }
  },
  _partLimitsReached: function (e) {
    var t = String(e).length;
    var n = this._getActivePartProp("pattern").length;
    var i = n === 1 ? t : Math.min(n, t);
    var o = this._searchValue.length === i;
    var a = parseInt(this._searchValue + "0") > e;
    return o || a;
  },
  _searchNumber: function (e) {
    var t = this._getActivePartLimits().max;
    var n = String(t).length;
    this._searchValue = (this._searchValue + e).substr(-n);
    if (isNaN(this._searchValue)) {
      this._searchValue = e;
    }
    this._setActivePartValue(this._searchValue);
    if (this._partLimitsReached(t)) {
      this._selectNextPart(1);
    }
  },
  _searchString: function (e) {
    if (isNaN(parseInt(this._getActivePartProp("text")))) {
      var t = this._getActivePartProp("limits")(this._maskValue);
      var n = this._searchValue + e.toLowerCase();
      for (var i = t.max - t.min, o = 0; o <= i; o++) {
        this._loadMaskValue(this._initialMaskValue);
        this._partIncrease(o + 1);
        if (this._getActivePartProp("text").toLowerCase().indexOf(n) === 0) {
          this._searchValue = n;
          return;
        }
      }
      this._setNewDateIfEmpty();
      if (this._searchValue) {
        this._clearSearchValue();
        this._searchString(e);
      }
    }
  },
  _clearSearchValue: function () {
    this._searchValue = "";
  },
  _revertPart: function (e) {
    if (!this._isAllSelected()) {
      var t = this._getActivePartValue(this.option("emptyDateValue"));
      this._setActivePartValue(t);
      this._selectNextPart(e);
    }
    this._clearSearchValue();
  },
  _useMaskBehavior: function () {
    return this.option("useMaskBehavior") && this.option("mode") === "text";
  },
  _prepareRegExpInfo: function () {
    this._regExpInfo = (0, c.getRegExpInfo)(this._getFormatPattern(), d.default);
    var e = this._regExpInfo.regexp;
    var t = e.source;
    var n = e.flags;
    var i = new RegExp(/(\{[0-9]+,?[0-9]*\})/);
    var o = t.split(i).map(function (e) {
      if (i.test(e)) {
        return e;
      } else {
        return p.default.convertDigits(e, false);
      }
    }).join("");
    this._regExpInfo.regexp = new RegExp(o, n);
  },
  _initMaskState: function () {
    this._activePartIndex = 0;
    this._formatPattern = null;
    this._prepareRegExpInfo();
    this._loadMaskValue();
  },
  _renderMask: function () {
    this.callBase();
    this._detachMaskEvents();
    this._clearMaskState();
    if (this._useMaskBehavior()) {
      this._attachMaskEvents();
      this._initMaskState();
      this._renderDateParts();
    }
  },
  _renderDateParts: function () {
    if (this._useMaskBehavior()) {
      var e = this.option("text") || this._getDisplayedText(this._maskValue);
      if (e) {
        this._dateParts = (0, u.renderDateParts)(e, this._regExpInfo);
        if (!this._input().is(":hidden")) {
          this._selectNextPart();
        }
      }
    }
  },
  _detachMaskEvents: function () {
    l.default.off(this._input(), ".dateBoxMask");
  },
  _attachMaskEvents: function () {
    var e = this;
    l.default.on(this._input(), (0, i.addNamespace)("dxclick", "dateBoxMask"), this._maskClickHandler.bind(this));
    l.default.on(this._input(), (0, i.addNamespace)("paste", "dateBoxMask"), this._maskPasteHandler.bind(this));
    l.default.on(this._input(), (0, i.addNamespace)("drop", "dateBoxMask"), function () {
      e._renderSelectedPart();
    });
    l.default.on(this._input(), (0, i.addNamespace)("compositionend", "dateBoxMask"), this._maskCompositionEndHandler.bind(this));
    if (this._useBeforeInputEvent()) {
      l.default.on(this._input(), (0, i.addNamespace)("beforeinput", "dateBoxMask"), this._maskBeforeInputHandler.bind(this));
    }
  },
  _renderSelectedPart: function () {
    this._renderDisplayText(this._getDisplayedText(this._maskValue));
    this._selectNextPart();
  },
  _selectLastPart: function () {
    if (this.option("text")) {
      this._activePartIndex = this._dateParts.length;
      this._selectNextPart(-1);
    }
  },
  _selectFirstPart: function () {
    if (this.option("text")) {
      this._activePartIndex = -1;
      this._selectNextPart(1);
    }
  },
  _onMouseWheel: function (e) {
    if (this._useMaskBehavior()) {
      this._partIncrease(e.delta > 0 ? 1 : -1, e);
    }
  },
  _selectNextPart: function (e = 0) {
    if (this.option("text") && !this._disposed) {
      if (e) {
        this._initialMaskValue = new Date(this._maskValue);
      }
      var t = (0, s.fitIntoRange)(this._activePartIndex + e, 0, this._dateParts.length - 1);
      if (this._dateParts[t].isStub) {
        var n = t === 0 && e < 0 || t === this._dateParts.length - 1 && e > 0;
        if (!n) {
          this._selectNextPart(e >= 0 ? e + 1 : e - 1);
          return;
        }
        t = this._activePartIndex;
      }
      if (this._activePartIndex !== t) {
        this._clearSearchValue();
      }
      this._activePartIndex = t;
      this._caret(this._getActivePartProp("caret"));
    }
  },
  _getRealLimitsPattern: function () {
    if (this._getActivePartProp("pattern")[0] === "d") {
      return "dM";
    }
  },
  _getActivePartLimits: function (e) {
    return this._getActivePartProp("limits")(this._maskValue, e && this._getRealLimitsPattern());
  },
  _getActivePartValue: function (e) {
    e = e || this._maskValue;
    var t = this._getActivePartProp("getter");
    if ((0, o.isFunction)(t)) {
      return t(e);
    } else {
      return e[t]();
    }
  },
  _addLeadingZeroes: function (e) {
    var t = this._searchValue.match(/^0+/);
    var n = this._getActivePartLimits();
    var i = String(n.max).length;
    return ((t && t[0] || "") + String(e)).substr(-i);
  },
  _setActivePartValue: function (e, t) {
    t = t || this._maskValue;
    var n = this._getActivePartProp("setter");
    var i = this._getActivePartLimits();
    e = (0, s.inRange)(e, i.min, i.max) ? e : e % 10;
    e = this._addLeadingZeroes((0, s.fitIntoRange)(e, i.min, i.max));
    if ((0, o.isFunction)(n)) {
      n(t, e);
    } else {
      t[n](e);
    }
    this._renderDisplayText(this._getDisplayedText(t));
    this._renderDateParts();
  },
  _getActivePartProp: function (e) {
    if (this._dateParts && this._dateParts[this._activePartIndex]) {
      return this._dateParts[this._activePartIndex][e];
    }
  },
  _loadMaskValue: function (e = this.dateOption("value")) {
    this._maskValue = e && new Date(e);
    this._initialMaskValue = e && new Date(e);
  },
  _saveMaskValue: function () {
    var e = this._maskValue && new Date(this._maskValue);
    if (e && this.option("type") === "date") {
      e.setHours(0, 0, 0, 0);
    }
    this._initialMaskValue = new Date(e);
    this.dateOption("value", e);
  },
  _revertChanges: function () {
    this._loadMaskValue();
    this._renderDisplayText(this._getDisplayedText(this._maskValue));
    this._renderDateParts();
  },
  _renderDisplayText: function (e) {
    this.callBase(e);
    if (this._useMaskBehavior()) {
      this.option("text", e);
    }
  },
  _partIncrease: function (e, t) {
    this._setNewDateIfEmpty();
    var n = this._getActivePartLimits(t);
    var i = n.max;
    var o = n.min;
    var a = i - o;
    if (a === 1) {
      a++;
    }
    var r = e + this._getActivePartValue();
    if (r > i) {
      r = this._applyLimits(r, {
        limitBase: o,
        limitClosest: i,
        limitDelta: a
      });
    } else if (r < o) {
      r = this._applyLimits(r, {
        limitBase: i,
        limitClosest: o,
        limitDelta: a
      });
    }
    this._setActivePartValue(r);
  },
  _applyLimits: function (e, t) {
    var n = t.limitBase;
    var i = t.limitClosest;
    var o = (e - i) % t.limitDelta;
    if (o) {
      return n + o - (0, s.sign)(o) * 1;
    } else {
      return i;
    }
  },
  _maskClickHandler: function () {
    this._loadMaskValue(this._maskValue);
    if (this.option("text")) {
      this._activePartIndex = (0, u.getDatePartIndexByPosition)(this._dateParts, this._caret().start);
      if (!this._isAllSelected()) {
        if ((0, o.isDefined)(this._activePartIndex)) {
          this._caret(this._getActivePartProp("caret"));
        } else {
          this._selectLastPart();
        }
      }
    }
  },
  _maskCompositionEndHandler: function (e) {
    var t = this;
    this._input().val(this._getDisplayedText(this._maskValue));
    this._selectNextPart();
    this._maskInputHandler = function () {
      t._renderSelectedPart();
    };
  },
  _maskPasteHandler: function (e) {
    var t = this._replaceSelectedText(this.option("text"), this._caret(), (0, a.clipboardText)(e));
    var n = d.default.parse(t, this._getFormatPattern());
    if (n && this._isDateValid(n)) {
      this._maskValue = n;
      this._renderDisplayText(this._getDisplayedText(this._maskValue));
      this._renderDateParts();
      this._selectNextPart();
    }
    e.preventDefault();
  },
  _isDateValid: function (e) {
    return (0, o.isDate)(e) && !isNaN(e);
  },
  _isValueDirty: function () {
    var e = this.dateOption("value");
    return (this._maskValue && this._maskValue.getTime()) !== (e && e.getTime());
  },
  _fireChangeEvent: function () {
    this._clearSearchValue();
    if (this._isValueDirty()) {
      l.default.trigger(this._input(), "change");
    }
  },
  _enterHandler: function () {
    this._fireChangeEvent();
    this._selectNextPart(1);
  },
  _focusOutHandler: function (e) {
    if (this._useMaskBehavior() && !e.isDefaultPrevented()) {
      this._fireChangeEvent();
      this.callBase(e);
      this._selectFirstPart(e);
    } else {
      this.callBase(e);
    }
  },
  _valueChangeEventHandler: function (e) {
    var t = this.option("text");
    if (this._useMaskBehavior()) {
      this._saveValueChangeEvent(e);
      if (t) {
        if (this._maskValue === null) {
          this._loadMaskValue(t);
        }
      } else {
        this._maskValue = null;
      }
      this._saveMaskValue();
    } else {
      this.callBase(e);
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "useMaskBehavior":
        this._renderMask();
        break;
      case "displayFormat":
      case "mode":
        this.callBase(e);
        this._renderMask();
        break;
      case "value":
        this._loadMaskValue();
        this.callBase(e);
        this._renderDateParts();
        break;
      case "emptyDateValue":
        break;
      default:
        this.callBase(e);
    }
  },
  _clearMaskState: function () {
    this._clearSearchValue();
    delete this._dateParts;
    delete this._activePartIndex;
    delete this._maskValue;
  },
  reset: function () {
    this._clearMaskState();
    this._activePartIndex = 0;
    this.callBase();
  },
  _clean: function () {
    this.callBase();
    this._detachMaskEvents();
    this._clearMaskState();
  }
});
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;