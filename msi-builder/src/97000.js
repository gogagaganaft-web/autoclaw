exports.default = undefined;
var i = require("./58664.js");
var o = f(require("./68374.js"));
var a = require("./58201.js");
var r = f(require("./46919.js"));
var s = f(require("./7124.js"));
var l = f(require("./91500.js"));
var u = require("./13306.js");
var d = f(require("./91198.js"));
var c = f(require("./55551.js"));
var h = f(require("./72309.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p = (0, a.getWindow)();
var g = r.default.inherit({
  NAME: "CalendarWithTime",
  getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      applyValueMode: "useButtons",
      buttonsLocation: "bottom after",
      "dropDownOptions.showTitle": false
    });
  },
  _closeDropDownByEnter: function () {
    return d.default.sameDate(this._getContouredValue(), this.widgetOption("value"));
  },
  getDisplayFormat: function (e) {
    return e || "shortdateshorttime";
  },
  _is24HourFormat: function () {
    return l.default.is24HourFormat(this.getDisplayFormat(this.dateBox.option("displayFormat")));
  },
  _getContouredValue: function () {
    var e = this.callBase();
    return this._updateDateTime(e);
  },
  _renderWidget: function () {
    this.callBase();
    this._timeView = this.dateBox._createComponent((0, o.default)("<div>"), s.default, {
      value: this.dateBoxValue(),
      _showClock: !this._isShrinkView(),
      use24HourFormat: this._is24HourFormat(),
      onValueChanged: this._valueChangedHandler.bind(this),
      stylingMode: this.dateBox.option("stylingMode")
    });
    this._timeView.registerKeyHandler("escape", this._escapeHandler.bind(this));
  },
  renderOpenedState: function () {
    this.callBase();
    var e = this._getPopup();
    if (e) {
      e.$wrapper().toggleClass("dx-datebox-adaptivity-mode", this._isSmallScreen());
    }
    clearTimeout(this._repaintTimer);
    this._repaintTimer = setTimeout(function () {
      if (this._getPopup()) {
        this._getPopup().repaint();
      }
    }.bind(this), 0);
  },
  isAdaptivityChanged: function () {
    var e = this._isShrinkView();
    var t = this._currentAdaptiveMode;
    if (e !== t) {
      this._currentAdaptiveMode = e;
      return t !== undefined;
    } else {
      return this.callBase();
    }
  },
  _updateValue: function (e) {
    var t = this.dateBoxValue();
    if (!t && !e) {
      t = new Date();
      h.default.normalizeTime(t);
    }
    this.callBase();
    if (this._timeView) {
      if (t) {
        this._timeView.option("value", t);
      }
      this._timeView.option("use24HourFormat", this._is24HourFormat());
    }
  },
  _isSmallScreen: function () {
    return (0, i.getWidth)(p) <= 573;
  },
  _isShrinkView: function () {
    return !this.dateBox.option("showAnalogClock") || this.dateBox.option("adaptivityEnabled") && this._isSmallScreen();
  },
  _getBoxItems: function () {
    var e = [{
      ratio: 0,
      shrink: 0,
      baseSize: "auto",
      name: "calendar"
    }];
    if (!this._isShrinkView()) {
      e.push({
        ratio: 0,
        shrink: 0,
        baseSize: "auto",
        name: "time"
      });
    }
    return e;
  },
  renderPopupContent: function () {
    this.callBase();
    this._currentAdaptiveMode = this._isShrinkView();
    var e = this._getPopup().$content();
    this._box = this.dateBox._createComponent((0, o.default)("<div>").appendTo(e), c.default, {
      direction: "row",
      crossAlign: "stretch",
      items: this._getBoxItems(),
      itemTemplate: function (e, t, n) {
        var i = (0, o.default)("<div>");
        switch (e.name) {
          case "calendar":
            i.append(this._widget.$element());
            if (this._isShrinkView()) {
              this._timeView.$element().addClass("dx-datebox-datetime-time-side");
              i.append(this._timeView.$element());
            }
            break;
          case "time":
            i.append(this._timeView.$element());
            (0, o.default)(n).addClass("dx-datebox-datetime-time-side");
        }
        return i;
      }.bind(this)
    });
    this._attachTabHandler();
  },
  popupConfig: function (e) {
    var t = this.callBase(e);
    return (0, u.extend)(t, {
      width: "auto"
    });
  },
  getFirstPopupElement: function () {
    return this._timeView._hourBox.$element().find("input");
  },
  _attachTabHandler: function () {
    var e = this.dateBox;
    this._timeView._hourBox.registerKeyHandler("tab", function (t) {
      if (t.shiftKey) {
        t.preventDefault();
        e.focus();
      }
    });
  },
  _preventFocusOnPopup: function (e) {
    if (!(0, o.default)(e.target).hasClass("dx-texteditor-input")) {
      this.callBase.apply(this, arguments);
      if (!this.dateBox._hasFocusClass()) {
        this.dateBox.focus();
      }
    }
  },
  _updateDateTime: function (e) {
    var t = this._timeView.option("value");
    e.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
    return e;
  },
  getValue: function () {
    var t = this._widget.option("value") ?? this._widget.getContouredDate();
    t = t ? new Date(t) : new Date();
    return this._updateDateTime(t);
  },
  dispose: function () {
    clearTimeout(this._removeMinWidthTimer);
    clearTimeout(this._repaintTimer);
    this.callBase();
  }
});
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;