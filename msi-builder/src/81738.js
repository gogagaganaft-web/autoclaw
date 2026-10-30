exports.default = undefined;
var i = c(require("./68374.js"));
var o = c(require("./55994.js"));
var a = c(require("./52752.js"));
var r = c(require("./89838.js"));
var s = require("./13306.js");
var l = c(require("./99393.js"));
var u = c(require("./44687.js"));
var d = c(require("./73176.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = r.default.prototype;
var f = {
  makeTransparentBackground: h._makeTransparentBackground.bind(h),
  makeRgba: h._makeRgba.bind(h)
};
var p = u.default.inherit({
  _supportedKeys: function () {
    function e(e) {
      e.stopPropagation();
      if (this.option("opened")) {
        e.preventDefault();
        return true;
      }
    }
    return (0, s.extend)(this.callBase(), {
      tab: function (e) {
        if (this.option("opened")) {
          var t = e.shiftKey ? this._getLastPopupElement() : this._getFirstPopupElement();
          if (t) {
            o.default.trigger(t, "focus");
            t.select();
          }
          e.preventDefault();
        }
      },
      enter: this._enterKeyHandler,
      leftArrow: e,
      rightArrow: e,
      upArrow: function (e) {
        if (this.option("opened")) {
          return !e.altKey || (this.close(), false);
        } else {
          e.preventDefault();
          return false;
        }
      },
      downArrow: function (e) {
        if (this.option("opened") || e.altKey) {
          return !!this.option("opened") || !e.altKey || (this._validatedOpening(), false);
        } else {
          e.preventDefault();
          return false;
        }
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      editAlphaChannel: false,
      applyValueMode: "useButtons",
      keyStep: 1,
      fieldTemplate: null,
      buttonsLocation: "bottom after"
    });
  },
  _popupHidingHandler: function () {
    this.callBase();
    if (this.option("applyValueMode") === "useButtons") {
      this._updateColorViewValue(this.option("value"));
    }
  },
  _popupConfig: function () {
    return (0, s.extend)(this.callBase(), {
      width: ""
    });
  },
  _contentReadyHandler: function () {
    this._createColorView();
    this._addPopupBottomClasses();
  },
  _addPopupBottomClasses: function () {
    var e = this._popup.bottomToolbar();
    if (e) {
      e.addClass("dx-colorview-container-cell").addClass("dx-colorview-button-cell").find(".dx-toolbar-items-container").addClass("dx-colorview-buttons-container");
      e.find(".dx-popup-done").addClass("dx-colorview-apply-button");
      e.find(".dx-popup-cancel").addClass("dx-colorview-cancel-button");
    }
  },
  _createColorView: function () {
    this._popup.$overlayContent().addClass("dx-colorbox-overlay");
    var e = (0, i.default)("<div>").appendTo(this._popup.$content());
    this._colorView = this._createComponent(e, r.default, this._colorViewConfig());
    this._colorView.registerKeyHandler("escape", this._escapeHandler.bind(this));
    o.default.on(e, "focus", function () {
      this.focus();
    }.bind(this));
  },
  _escapeHandler: function () {
    this.close();
    this.focus();
  },
  _getFirstPopupElement: function () {
    return (0, i.default)(this._colorView._rgbInputs[0].element()).find("input");
  },
  _applyNewColor: function (e) {
    this.option("value", e);
    if (e) {
      f.makeTransparentBackground(this._$colorResultPreview, e);
    }
    if (this._colorViewEnterKeyPressed) {
      this.close();
      this._colorViewEnterKeyPressed = false;
    }
  },
  _colorViewConfig: function () {
    var e = this;
    return {
      value: e.option("value"),
      matchValue: e.option("value"),
      editAlphaChannel: e.option("editAlphaChannel"),
      applyValueMode: e.option("applyValueMode"),
      focusStateEnabled: e.option("focusStateEnabled"),
      stylingMode: this.option("stylingMode"),
      ariaId: this._ariaId,
      onEnterKeyPressed: function (t) {
        var n = t.event;
        e._colorViewEnterKeyPressed = true;
        if (e._colorView.option("value") !== e.option("value")) {
          e._saveValueChangeEvent(n);
          e._applyNewColor(e._colorView.option("value"));
          e.close();
        }
      },
      onValueChanged: function (t) {
        var n = t.event;
        var i = t.value;
        var o = t.previousValue;
        var a = e.option("applyValueMode") === "instantly";
        var r = f.makeRgba(i) === o;
        var s = a || e._colorViewEnterKeyPressed;
        var l = e._shouldSaveEmptyValue;
        if (!r && !!s && !l) {
          if (n) {
            e._saveValueChangeEvent(n);
          }
          e._applyNewColor(i);
        }
      }
    };
  },
  _enterKeyHandler: function (e) {
    var t = this._input().val();
    var n = this.option();
    var i = n.value;
    var o = n.editAlphaChannel;
    var r = i && o ? f.makeRgba(i) : i;
    if (!t) {
      return false;
    }
    if (!new a.default(t).colorIsInvalid) {
      if (t !== r) {
        this._applyColorFromInput(t);
        this._saveValueChangeEvent(e);
        this.option("value", this.option("editAlphaChannel") ? f.makeRgba(t) : t);
      }
      if (this._colorView) {
        var s = this._colorView.option("value");
        if (i !== s) {
          this._saveValueChangeEvent(e);
          this.option("value", s);
        }
      }
      this.close();
      return false;
    }
    this._input().val(r);
  },
  _applyButtonHandler: function (e) {
    this._saveValueChangeEvent(e.event);
    this._applyNewColor(this._colorView.option("value"));
    this.callBase();
  },
  _cancelButtonHandler: function () {
    this._resetInputValue();
    this.callBase();
  },
  _getKeyboardListeners: function () {
    return this.callBase().concat([this._colorView]);
  },
  _init: function () {
    this.callBase();
  },
  _initMarkup: function () {
    this.$element().addClass("dx-colorbox");
    this.callBase();
  },
  _renderInput: function () {
    this.callBase();
    this._ariaId = `dx-${new d.default()}`;
    this.setAria("activedescendant", this._ariaId);
    this._input().addClass("dx-colorbox-input");
    this._renderColorPreview();
  },
  _renderColorPreview: function () {
    this.$element().wrapInner((0, i.default)("<div>").addClass("dx-colorbox-input-container"));
    this._$colorBoxInputContainer = this.$element().children().eq(0);
    this._$colorResultPreview = (0, i.default)("<div>").addClass("dx-colorbox-color-result-preview").appendTo(this._$textEditorInputContainer);
    if (this.option("value")) {
      f.makeTransparentBackground(this._$colorResultPreview, this.option("value"));
    } else {
      this._$colorBoxInputContainer.addClass("dx-colorbox-color-is-not-defined");
    }
  },
  _renderValue: function () {
    var e = this.option();
    var t = e.value;
    var n = e.editAlphaChannel;
    var i = t && n ? f.makeRgba(t) : t;
    this.option("text", i);
    return this.callBase();
  },
  _resetInputValue: function () {
    var e = this._input();
    var t = this.option("value");
    e.val(t);
    this._updateColorViewValue(t);
  },
  _updateColorViewValue: function (e) {
    if (this._colorView) {
      this._colorView.option({
        value: e,
        matchValue: e
      });
    }
  },
  _valueChangeEventHandler: function (e) {
    var t = this._input().val();
    if (t) {
      t = this._applyColorFromInput(t);
      this._updateColorViewValue(t);
    }
    this.callBase(e, t);
  },
  _applyColorFromInput: function (e) {
    if (new a.default(e).colorIsInvalid) {
      this._resetInputValue();
      e = this.option("value");
    }
    return e;
  },
  _clean: function () {
    this.callBase();
    delete this._shouldSaveEmptyValue;
  },
  _optionChanged: function (e) {
    var t = e.value;
    var n = e.name;
    switch (n) {
      case "value":
        this._$colorBoxInputContainer.toggleClass("dx-colorbox-color-is-not-defined", !t);
        if (t) {
          f.makeTransparentBackground(this._$colorResultPreview, t);
        } else {
          this._$colorResultPreview.removeAttr("style");
        }
        if (t === null) {
          this._shouldSaveEmptyValue = true;
        }
        this._updateColorViewValue(t);
        this._shouldSaveEmptyValue = false;
        this.callBase(e);
        break;
      case "applyButtonText":
      case "cancelButtonText":
        this.callBase(e);
        if (this._popup) {
          this._addPopupBottomClasses();
        }
        break;
      case "editAlphaChannel":
      case "keyStep":
        if (this._colorView) {
          this._colorView.option(n, t);
        }
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, l.default)("dxColorBox", p);
var g = p;
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;