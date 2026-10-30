exports.default = undefined;
var i = l(require("./46919.js"));
var o = l(require("./55994.js"));
var a = require("./13306.js");
var r = require("./86974.js");
var s = require("./35922.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u() {
  return (u = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var c = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this) || this).dateBox = t;
    n.dateRangeBox = t.option("_dateRangeBoxInstance");
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  var l = i.prototype;
  l.popupConfig = function (t) {
    return (0, a.extend)(true, e.prototype.popupConfig.call(this, t), {
      position: {
        of: this.dateRangeBox.$element()
      }
    });
  };
  l.popupShowingHandler = function () {
    var e;
    if ((e = this._widget) !== null && e !== undefined) {
      e._restoreViewsMinMaxOptions();
    }
    this._dateSelectedCounter = 0;
  };
  l._getPopup = function () {
    return e.prototype._getPopup.call(this) || this.dateRangeBox.getStartDateBox()._popup;
  };
  l.getFirstPopupElement = function () {
    var e = this._getPopup().$wrapper();
    var t = e.find(`.dx-button-today`);
    if (t.length) {
      return t;
    } else {
      return e.find(".dx-popup-done.dx-button");
    }
  };
  l.getLastPopupElement = function () {
    return this._getPopup().$wrapper().find(".dx-popup-cancel.dx-button");
  };
  l.supportedKeys = function () {
    var t = this;
    return u({}, e.prototype.supportedKeys.call(this), {
      rightArrow: function () {
        if (t.dateRangeBox.option("opened")) {
          return true;
        }
      },
      leftArrow: function () {
        if (t.dateRangeBox.option("opened")) {
          return true;
        }
      },
      enter: function (e) {
        if (t.dateRangeBox.option("opened")) {
          var n = t.dateBox.dateOption("value");
          t.dateBox._valueChangeEventHandler(e);
          var i = t.dateBox.dateOption("value");
          if (!(0, r.isSameDates)(n, i)) {
            t.dateRangeBox.getStartDateBox()._strategy._widget.option("values", t.dateRangeBox.option("value"));
          } else {
            t.dateRangeBox.getStartDateBox()._strategy._widget._enterKeyHandler(e);
          }
          return false;
        }
      },
      tab: function (e) {
        if (t.getDateRangeBox().option("opened")) {
          if (t._isInstantlyMode()) {
            if (!e.shiftKey && t.getDateRangeBox()._isEndDateActiveElement() || e.shiftKey && t.getDateRangeBox()._isStartDateActiveElement()) {
              t.dateRangeBox.close();
            }
          } else if ((!!e.shiftKey || !t.getDateRangeBox()._isStartDateActiveElement()) && (!e.shiftKey || !t.getDateRangeBox()._isEndDateActiveElement())) {
            var n = e.shiftKey ? t.getLastPopupElement() : t.getFirstPopupElement();
            if (n) {
              o.default.trigger(n, "focus");
              n.select();
            }
            e.preventDefault();
          }
        }
      }
    });
  };
  l._getTodayButtonConfig = function () {
    var t = this;
    var n = e.prototype._getTodayButtonConfig.call(this);
    n.options.onInitialized = function (e) {
      t.dateBox._popupButtonInitializedHandler(e);
    };
    return n;
  };
  l._getWidgetOptions = function () {
    var t = this.dateRangeBox.option();
    var n = t.disabledDates;
    var i = t.value;
    var o = t.multiView;
    var r = (0, s.isFunction)(n) ? this._injectComponent(n) : r;
    return (0, a.extend)(e.prototype._getWidgetOptions.call(this), {
      disabledDates: r,
      values: i,
      selectionMode: "range",
      viewsCount: o ? 2 : 1,
      _allowChangeSelectionOrder: true,
      _currentSelection: this.getCurrentSelection()
    });
  };
  l._refreshActiveDescendant = function (e) {
    this.dateRangeBox.setAria("activedescendant", e.actionValue);
  };
  l._injectComponent = function (e) {
    var t = this;
    return function (n) {
      return e((0, a.extend)(n, {
        component: t.dateRangeBox
      }));
    };
  };
  l.getKeyboardListener = function () {
    if (this.dateRangeBox.getStartDateBox()) {
      return this.dateRangeBox.getStartDateBox()._strategy._widget;
    } else {
      return this._widget;
    }
  };
  l.getValue = function () {
    return this._widget.option("values");
  };
  l._updateValue = function () {
    var e = this.dateRangeBox.option().value;
    if (this._widget) {
      this._shouldPreventFocusChange = true;
      this._widget.option("values", e);
    }
  };
  l._isInstantlyMode = function () {
    return this.dateRangeBox.option("applyValueMode") === "instantly";
  };
  l._valueChangedHandler = function (e) {
    var t = e.value;
    var n = e.previousValue;
    var i = e.event;
    if (!(0, r.isSameDateArrays)(t, n) || this._widget._valueSelected) {
      this._widget._valueSelected = false;
      if (this._isInstantlyMode()) {
        if (!this.dateRangeBox.option("disableOutOfRangeSelection")) {
          if (this._getCalendarCurrentSelection() === "startDate") {
            this._dateSelectedCounter = 0;
          } else {
            this._dateSelectedCounter = 1;
            if (t[0]) {
              if ((0, r.getDeserializedDate)(t[0]) > (0, r.getDeserializedDate)(t[1])) {
                this.dateRangeBox.updateValue([t[0], null], i);
                return;
              }
            } else {
              this._dateSelectedCounter = -1;
            }
          }
        }
        this.dateRangeBox.updateValue(t, i);
        this._dateSelectedCounter += 1;
        if (this._dateSelectedCounter === 2) {
          this.getDateRangeBox().close();
          return;
        }
      } else if (this._getCalendarCurrentSelection() === "endDate" && t[0] && (0, r.getDeserializedDate)(t[0]) > (0, r.getDeserializedDate)(t[1])) {
        return;
      }
      if (!this._shouldPreventFocusChange) {
        this._moveFocusToNextInput();
      }
      this._shouldPreventFocusChange = false;
    } else {
      this._shouldPreventFocusChange = false;
    }
  };
  l._moveFocusToNextInput = function () {
    var e = this._getCalendarCurrentSelection() === "startDate" ? this.getDateRangeBox().getEndDateBox() : this.getDateRangeBox().getStartDateBox();
    e.focus();
    o.default.trigger(e.field(), "dxclick");
  };
  l.getCurrentSelection = function () {
    return this.dateRangeBox.option("_currentSelection");
  };
  l._getCalendarCurrentSelection = function () {
    return this._widget.option("_currentSelection");
  };
  l._closeDropDownByEnter = function () {
    return this._getCalendarCurrentSelection() !== "startDate";
  };
  l.dateBoxValue = function () {
    if (arguments.length) {
      return this.dateBox.dateValue.apply(this.dateBox, arguments);
    } else {
      return this.dateBox.dateOption.apply(this.dateBox, ["value"]);
    }
  };
  l._cellClickHandler = function () {};
  l.setActiveStartDateBox = function () {
    this.dateBox = this.dateRangeBox.getStartDateBox();
  };
  l.setActiveEndDateBox = function () {
    this.dateBox = this.dateRangeBox.getEndDateBox();
  };
  l.getDateRangeBox = function () {
    return this.dateRangeBox;
  };
  return i;
}(i.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;