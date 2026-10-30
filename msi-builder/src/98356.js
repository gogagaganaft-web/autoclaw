exports.default = undefined;
var i = d(require("./68374.js"));
var o = require("./58201.js");
var a = require("./13306.js");
var r = d(require("./99393.js"));
var s = d(require("./63513.js"));
var l = require("./39611.js");
var u = require("./58664.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = (0, o.getWindow)();
var h = ["backspace", "tab", "enter", "pageUp", "pageDown", "end", "home", "leftArrow", "rightArrow", "downArrow", "upArrow", "del"];
var f = s.default.inherit({
  ctor: function (e, t) {
    if (t) {
      this._showClearButton = t.showClearButton;
    }
    this.callBase.apply(this, arguments);
  },
  _getDefaultOptions: function () {
    return (0, a.extend)(this.callBase(), {
      value: "",
      mode: "text",
      maxLength: null
    });
  },
  _initMarkup: function () {
    this.$element().addClass("dx-textbox");
    this.callBase();
    this.setAria("role", "textbox");
  },
  _renderInputType: function () {
    this.callBase();
    this._renderSearchMode();
  },
  _useTemplates: function () {
    return false;
  },
  _renderProps: function () {
    this.callBase();
    this._toggleMaxLengthProp();
  },
  _toggleMaxLengthProp: function () {
    var e = this._getMaxLength();
    if (e && e > 0) {
      this._input().attr("maxLength", e);
    } else {
      this._input().removeAttr("maxLength");
    }
  },
  _renderSearchMode: function () {
    var e = this._$element;
    if (this.option("mode") === "search") {
      e.addClass("dx-searchbox");
      this._renderSearchIcon();
      if (this._showClearButton === undefined) {
        this._showClearButton = this.option("showClearButton");
        this.option("showClearButton", true);
      }
    } else {
      e.removeClass("dx-searchbox");
      if (this._$searchIcon) {
        this._$searchIcon.remove();
      }
      this.option("showClearButton", this._showClearButton === undefined ? this.option("showClearButton") : this._showClearButton);
      delete this._showClearButton;
    }
  },
  _renderSearchIcon: function () {
    var e = (0, i.default)("<div>").addClass("dx-icon").addClass("dx-icon-search");
    e.prependTo(this._input().parent());
    this._$searchIcon = e;
  },
  _getLabelContainerWidth: function () {
    if (this._$searchIcon) {
      var e = this._input().parent();
      return (0, u.getWidth)(e) - this._getLabelBeforeWidth();
    }
    return this.callBase();
  },
  _getLabelBeforeWidth: function () {
    var e = this.callBase();
    if (this._$searchIcon) {
      e += (0, u.getOuterWidth)(this._$searchIcon);
    }
    return e;
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "maxLength":
        this._toggleMaxLengthProp();
        break;
      case "mode":
        this.callBase(e);
        this._updateLabelWidth();
        break;
      case "mask":
        this.callBase(e);
        this._toggleMaxLengthProp();
        break;
      default:
        this.callBase(e);
    }
  },
  _onKeyDownCutOffHandler: function (e) {
    var t = this._getMaxLength();
    if (!t || e.ctrlKey || this._hasSelection()) {
      return true;
    }
    var n = (0, i.default)(e.target);
    var o = (0, l.normalizeKeyName)(e);
    this._cutOffExtraChar(n);
    return n.val().length < t || h.includes(o) || c.getSelection().toString() !== "";
  },
  _onChangeCutOffHandler: function (e) {
    var t = (0, i.default)(e.target);
    if (this.option("maxLength")) {
      this._cutOffExtraChar(t);
    }
  },
  _cutOffExtraChar: function (e) {
    var t = this._getMaxLength();
    var n = e.val();
    if (t && n.length > t) {
      e.val(n.substr(0, t));
    }
  },
  _getMaxLength: function () {
    if (this.option("mask")) {
      return null;
    } else {
      return this.option("maxLength");
    }
  }
});
(0, r.default)("dxTextBox", f);
var p = f;
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;