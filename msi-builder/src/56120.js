exports.default = undefined;
var i = u(require("./68374.js"));
var o = u(require("./28105.js"));
var a = u(require("./45020.js"));
var r = require("./39611.js");
var s = u(require("./55994.js"));
var l = require("./86974.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return c(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return c(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function c(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var u = o.prototype;
  u._initStrategy = function () {
    this._strategy = new a.default(this);
  };
  u._initMarkup = function () {
    e.prototype._initMarkup.call(this);
    this._renderInputClickEvent();
  };
  u._renderInputClickEvent = function () {
    var e = this;
    var t = (0, r.addNamespace)("dxclick", this.NAME);
    s.default.off(this._input(), t);
    s.default.on(this._input(), t, function (t) {
      e._processValueChange(t);
    });
  };
  u._applyButtonHandler = function (e) {
    var t = e.event;
    var n = this._strategy.getValue();
    this._strategy.dateRangeBox.updateValue(n, t);
    this.close();
    if (this.option("focusStateEnabled")) {
      this.focus();
    }
  };
  u._openHandler = function (t) {
    if (!this._strategy.dateRangeBox.option("opened")) {
      e.prototype._openHandler.call(this, t);
    }
  };
  u._renderOpenedState = function () {
    var e = this.option().opened;
    this._getDateRangeBox().option("opened", e);
    if (this._isStartDateBox()) {
      if (e) {
        this._createPopup();
      }
      this._getDateRangeBox()._popupContentIdentifier(this._getControlsAria());
      this._setPopupOption("visible", e);
      this._getDateRangeBox()._setAriaAttributes();
    }
  };
  u._getDateRangeBox = function () {
    return this._strategy.dateRangeBox;
  };
  u._isStartDateBox = function () {
    return this.$element().hasClass("dx-start-datebox");
  };
  u._renderPopup = function () {
    e.prototype._renderPopup.call(this);
    if (this._isStartDateBox()) {
      this._strategy.dateRangeBox._bindInnerWidgetOptions(this._popup, "dropDownOptions");
    }
  };
  u._popupShownHandler = function () {
    var t;
    e.prototype._popupShownHandler.call(this);
    if ((t = this._strategy.dateRangeBox._validationMessage) !== null && t !== undefined) {
      t.option("positionSide", this._getValidationMessagePositionSide());
    }
  };
  u._popupHiddenHandler = function () {
    var t;
    e.prototype._popupHiddenHandler.call(this);
    if ((t = this._strategy.dateRangeBox._validationMessage) !== null && t !== undefined) {
      t.option("positionSide", this._getValidationMessagePositionSide());
    }
  };
  u._focusInHandler = function (t) {
    e.prototype._focusInHandler.call(this, t);
    this._processValueChange(t);
  };
  u._popupElementTabHandler = function (e) {
    var t = (0, i.default)(e.currentTarget);
    if (e.shiftKey && t.is(this._getFirstPopupElement())) {
      this._strategy.dateRangeBox.getEndDateBox().focus();
      e.preventDefault();
    }
    if (!e.shiftKey && t.is(this._getLastPopupElement())) {
      this._strategy.dateRangeBox.getStartDateBox().focus();
      e.preventDefault();
    }
  };
  u._processValueChange = function (e) {
    var t = e.target;
    var n = d(this._strategy.dateRangeBox.field(), 2);
    var o = n[0];
    var a = n[1];
    if ((0, i.default)(t).is(o)) {
      this._strategy.dateRangeBox.option("_currentSelection", "startDate");
    }
    if ((0, i.default)(t).is(a)) {
      this._strategy.dateRangeBox.option("_currentSelection", "endDate");
    }
    if (this._strategy.dateRangeBox.getStartDateBox()._strategy._widget) {
      var r = this._strategy.dateRangeBox.getStartDateBox()._strategy._widget;
      var s = r.option("values");
      var u = (0, l.getDeserializedDate)(s[0]);
      var c = (0, l.getDeserializedDate)(s[1]);
      if ((0, i.default)(t).is(o)) {
        if (u) {
          r._skipNavigate = true;
          r.option("currentDate", u);
        }
        this._strategy.setActiveStartDateBox();
        r.option("_currentSelection", "startDate");
        if (this._strategy.dateRangeBox.option("disableOutOfRangeSelection")) {
          r._setViewsMaxOption(c);
        }
      }
      if ((0, i.default)(t).is(a)) {
        if (c) {
          if (u && (0, l.monthDifference)(u, c) > 1) {
            r.option("currentDate", r._getDateByOffset(null, c));
            r.option("currentDate", r._getDateByOffset(-1, c));
          }
          r._skipNavigate = true;
          r.option("currentDate", c);
        }
        this._strategy.dateRangeBox.getStartDateBox()._strategy.setActiveEndDateBox();
        r.option("_currentSelection", "endDate");
        if (this._strategy.dateRangeBox.option("disableOutOfRangeSelection")) {
          r._setViewsMinOption(u);
        }
      }
    }
  };
  u._invalidate = function () {
    e.prototype._invalidate.call(this);
    this._refreshStrategy();
  };
  u._updateInternalValidationState = function (e, t) {
    this.option({
      isValid: e,
      validationError: e ? null : {
        message: t
      }
    });
  };
  u._recallInternalValidation = function (e) {
    this._applyInternalValidation(e);
  };
  u._isTargetOutOfComponent = function (t) {
    var n = this._strategy.dateRangeBox.$element();
    var o = (0, i.default)(t).closest(n).length === 0;
    return e.prototype._isTargetOutOfComponent.call(this, t) && o;
  };
  u._optionChanged = function (t) {
    switch (t.name) {
      case "isValid":
        var n = this._strategy.dateRangeBox.option("isValid");
        if (this._skipIsValidOptionChange || n === t.value) {
          e.prototype._optionChanged.call(this, t);
          return;
        }
        this._skipIsValidOptionChange = true;
        this.option({
          isValid: n
        });
        this._skipIsValidOptionChange = false;
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  u.close = function () {
    this._strategy.getDateRangeBox().getStartDateBox().option("opened", false);
  };
  return o;
}(o.default);
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;