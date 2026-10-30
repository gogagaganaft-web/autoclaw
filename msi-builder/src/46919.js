exports.default = undefined;
var i = d(require("./26559.js"));
var o = d(require("./38129.js"));
var a = d(require("./91198.js"));
var r = require("./20576.js");
var s = require("./35922.js");
var l = require("./13306.js");
var u = d(require("./28109.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return h(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return h(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return h(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function h(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var f = o.default.inherit({
  NAME: "Calendar",
  getDefaultOptions: function () {
    return (0, l.extend)(this.callBase(), {
      todayButtonText: u.default.format("dxCalendar-todayButtonText")
    });
  },
  supportedKeys: function () {
    function e(e) {
      return !!this.option("opened") && (e.preventDefault(), true);
    }
    return {
      rightArrow: function () {
        if (this.option("opened")) {
          return true;
        }
      },
      leftArrow: function () {
        if (this.option("opened")) {
          return true;
        }
      },
      enter: function (e) {
        if (this.dateBox.option("opened")) {
          e.preventDefault();
          if (this._widget.option("zoomLevel") === this._widget.option("maxZoomLevel")) {
            var t = this._getContouredValue();
            var n = this._lastActionElement;
            var i = this._closeDropDownByEnter();
            if (i && t && n === "calendar") {
              this.dateBoxValue(t, e);
            }
            if (i) {
              this.dateBox.close();
            }
            this.dateBox._valueChangeEventHandler(e);
            return !i;
          }
          return true;
        }
        this.dateBox._valueChangeEventHandler(e);
      }.bind(this),
      home: e,
      end: e
    };
  },
  getDisplayFormat: function (e) {
    return e || "shortdate";
  },
  _closeDropDownByEnter: function () {
    return true;
  },
  _getWidgetName: function () {
    return i.default;
  },
  _getContouredValue: function () {
    return this._widget._view.option("contouredDate");
  },
  getKeyboardListener: function () {
    return this._widget;
  },
  _getWidgetOptions: function () {
    var e = this.dateBox.option("disabledDates");
    return (0, l.extend)(this.dateBox.option("calendarOptions"), {
      value: this.dateBoxValue() || null,
      dateSerializationFormat: null,
      min: this.dateBox.dateOption("min"),
      max: this.dateBox.dateOption("max"),
      onValueChanged: this._valueChangedHandler.bind(this),
      onCellClick: this._cellClickHandler.bind(this),
      tabIndex: null,
      disabledDates: (0, s.isFunction)(e) ? this._injectComponent(e.bind(this.dateBox)) : e,
      onContouredChanged: this._refreshActiveDescendant.bind(this),
      skipFocusCheck: true
    });
  },
  _injectComponent: function (e) {
    var t = this;
    return function (n) {
      (0, l.extend)(n, {
        component: t.dateBox
      });
      return e(n);
    };
  },
  _refreshActiveDescendant: function (e) {
    this._lastActionElement = "calendar";
    this.dateBox.setAria("activedescendant", e.actionValue);
  },
  _getTodayButtonConfig: function () {
    var e = this;
    var t = this.dateBox.option("buttonsLocation");
    var n = t === "default" ? ["bottom", "center"] : (0, r.splitPair)(t);
    return {
      widget: "dxButton",
      toolbar: n[0],
      location: n[1] === "after" ? "before" : n[1],
      options: {
        onInitialized: function (e) {
          e.component.registerKeyHandler("escape", this._escapeHandler.bind(this));
        }.bind(this),
        onClick: function (t) {
          e._widget._toTodayView(t);
        },
        text: this.dateBox.option("todayButtonText"),
        type: "today"
      }
    };
  },
  _isCalendarVisible: function () {
    var e = this.dateBox.option().calendarOptions;
    return (0, s.isEmptyObject)(e) || e.visible !== false;
  },
  _getPopupToolbarItems: function (e) {
    if (this.dateBox.option("applyValueMode") === "useButtons" && this._isCalendarVisible()) {
      return [this._getTodayButtonConfig()].concat(c(e));
    } else {
      return e;
    }
  },
  popupConfig: function (e) {
    return (0, l.extend)(true, e, {
      position: {
        collision: "flipfit flip"
      },
      width: "auto"
    });
  },
  _escapeHandler: function () {
    this.dateBox.close();
    this.dateBox.focus();
  },
  _valueChangedHandler: function (e) {
    var t = e.value;
    var n = e.previousValue;
    if (!a.default.sameDate(t, n) || !a.default.sameHoursAndMinutes(t, n)) {
      if (this.dateBox.option("applyValueMode") === "instantly") {
        this.dateBoxValue(this.getValue(), e.event);
      }
    }
  },
  _updateValue: function () {
    if (this._widget) {
      this._widget.option("value", this.dateBoxValue());
    }
  },
  textChangedHandler: function () {
    this._lastActionElement = "input";
    if (this.dateBox.option("opened") && this._widget) {
      this._updateValue(true);
    }
  },
  _cellClickHandler: function (e) {
    var t = this.dateBox;
    if (t.option("applyValueMode") === "instantly") {
      t.option("opened", false);
      this.dateBoxValue(this.getValue(), e.event);
    }
  }
});
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;