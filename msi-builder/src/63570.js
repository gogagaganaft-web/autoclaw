exports.default = undefined;
var i = require("./58664.js");
var o = w(require("./99393.js"));
var a = w(require("./20530.js"));
var r = w(require("./68374.js"));
var s = require("./20576.js");
var l = require("./62754.js");
var u = require("./13306.js");
var d = require("./95429.js");
var c = require("./91633.js");
var h = w(require("./55994.js"));
var f = w(require("./66894.js"));
var p = w(require("./93786.js"));
var g = require("./39611.js");
var m = w(require("./18016.js"));
var _ = require("./75811.js");
var v = w(require("./39661.js"));
var y = require("./72672.js");
var b = w(require("./6320.js"));
var x = require("./60810.js");
function w(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var C = v.default.inherit({
  _activeStateUnit: ".dx-slider-handle",
  _supportedKeys: function () {
    var e = this;
    var t = this.option("rtlEnabled");
    function n(t, n) {
      t = e._valueStep(t);
      var i = e.option("step");
      var o = e.option("value");
      var a = o - e.option("min");
      var r = (0, x.getRemainderByDivision)(a, i, e._getValueExponentLength());
      var s = n ? o - t + (r ? i - r : 0) : o + t - r;
      var l = e.option("min");
      var u = e.option("max");
      if (s < l) {
        s = l;
      } else if (s > u) {
        s = u;
      }
      return e._roundToExponentLength(s);
    }
    function i(i) {
      e.option("value", n(i, t));
    }
    function o(i) {
      e.option("value", n(i, !t));
    }
    return (0, u.extend)(this.callBase(), {
      leftArrow: function (e) {
        this._processKeyboardEvent(e);
        o(this.option("step"));
      },
      rightArrow: function (e) {
        this._processKeyboardEvent(e);
        i(this.option("step"));
      },
      pageUp: function (e) {
        this._processKeyboardEvent(e);
        i(this.option("step") * this.option("keyStep"));
      },
      pageDown: function (e) {
        this._processKeyboardEvent(e);
        o(this.option("step") * this.option("keyStep"));
      },
      home: function (e) {
        this._processKeyboardEvent(e);
        var t = this.option("min");
        this.option("value", t);
      },
      end: function (e) {
        this._processKeyboardEvent(e);
        var t = this.option("max");
        this.option("value", t);
      }
    });
  },
  _processKeyboardEvent: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
  },
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      value: 50,
      hoverStateEnabled: true,
      activeStateEnabled: true,
      step: 1,
      showRange: true,
      tooltip: {
        enabled: false,
        format: function (e) {
          return e;
        },
        position: "top",
        showMode: "onHover"
      },
      label: {
        visible: false,
        position: "bottom",
        format: function (e) {
          return e;
        }
      },
      keyStep: 1,
      useInkRipple: false,
      validationMessageOffset: (0, _.isMaterial)() ? {
        h: 18,
        v: 0
      } : {
        h: 7,
        v: 4
      },
      focusStateEnabled: true,
      valueChangeMode: "onHandleMove"
    });
  },
  _toggleValidationMessage: function (e) {
    if (!this.option("isValid")) {
      this.$element().toggleClass("dx-invalid-message-visible", e);
    }
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return a.default.real().deviceType === "desktop" && !a.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        var e = (0, _.current)();
        return (0, _.isMaterial)(e);
      },
      options: {
        useInkRipple: true
      }
    }]);
  },
  _initMarkup: function () {
    this.$element().addClass("dx-slider");
    this._renderSubmitElement();
    if (this.option("useInkRipple")) {
      this._renderInkRipple();
    }
    this.callBase();
    this._renderLabels();
    this._renderStartHandler();
    this._renderAriaMinAndMax();
  },
  _attachFocusEvents: function () {
    this.callBase();
    var e = this.NAME + "Validation";
    var t = (0, g.addNamespace)("focusin", e);
    var n = (0, g.addNamespace)("focusout", e);
    var i = this._focusTarget();
    h.default.on(i, t, this._toggleValidationMessage.bind(this, true));
    h.default.on(i, n, this._toggleValidationMessage.bind(this, false));
  },
  _detachFocusEvents: function () {
    this.callBase();
    var e = this._focusTarget();
    this._toggleValidationMessage(false);
    h.default.off(e, this.NAME + "Validation");
  },
  _render: function () {
    this.callBase();
    this._repaintHandle();
  },
  _renderSubmitElement: function () {
    this._$submitElement = (0, r.default)("<input>").attr("type", "hidden").appendTo(this.$element());
  },
  _getSubmitElement: function () {
    return this._$submitElement;
  },
  _renderInkRipple: function () {
    this._inkRipple = (0, y.render)({
      waveSizeCoefficient: 0.7,
      isCentered: true,
      wavesNumber: 2,
      useHoldAnimation: false
    });
  },
  _renderInkWave: function (e, t, n, i) {
    if (this._inkRipple) {
      var o = {
        element: e,
        event: t,
        wave: i
      };
      if (n) {
        this._inkRipple.showWave(o);
      } else {
        this._inkRipple.hideWave(o);
      }
    }
  },
  _visibilityChanged: function () {
    this.repaint();
  },
  _renderWrapper: function () {
    this.callBase();
    this._$wrapper.addClass("dx-slider-wrapper");
    this._createComponent(this._$wrapper, f.default, {
      elastic: false,
      immediate: true,
      immediateTimeout: 0,
      onStart: this._swipeStartHandler.bind(this),
      onUpdated: this._swipeUpdateHandler.bind(this),
      onEnd: this._swipeEndHandler.bind(this),
      itemSizeFunc: this._itemWidthFunc.bind(this)
    });
  },
  _renderContainer: function () {
    this.callBase();
    this._$bar.addClass("dx-slider-bar");
  },
  _renderRange: function () {
    this.callBase();
    this._$range.addClass("dx-slider-range");
    this._renderHandle();
    this._renderRangeVisibility();
  },
  _renderRangeVisibility: function () {
    this._$range.toggleClass("dx-slider-range-visible", Boolean(this.option("showRange")));
  },
  _renderHandle: function () {
    this._$handle = this._renderHandleImpl(this.option("value"), this._$handle);
  },
  _renderHandleImpl: function (e, t) {
    var n = t || (0, r.default)("<div>").appendTo(this._$range);
    var i = this.option("tooltip");
    this.$element().toggleClass("dx-slider-tooltip-position-bottom", i.enabled && i.position === "bottom").toggleClass("dx-slider-tooltip-position-top", i.enabled && i.position === "top");
    this._createComponent(n, b.default, {
      value: e,
      tooltip: i
    });
    return n;
  },
  _renderAriaMinAndMax: function () {
    this.setAria({
      valuemin: this.option("min"),
      valuemax: this.option("max")
    }, this._$handle);
  },
  _toggleActiveState: function (e, t) {
    this.callBase(e, t);
    this._renderInkWave(e, null, !!t, 1);
  },
  _toggleFocusClass: function (e, t) {
    this.callBase(e, t);
    if (!this._disposed) {
      var n = (0, r.default)(t || this._focusTarget());
      this._renderInkWave(n, null, e, 0);
    }
  },
  _renderLabels: function () {
    this.$element().removeClass("dx-slider-label-position-bottom").removeClass("dx-slider-label-position-top");
    if (this.option("label.visible")) {
      var e = this.option("min");
      var t = this.option("max");
      var n = this.option("label.position");
      var i = this.option("label.format");
      this._$minLabel ||= (0, r.default)("<div>").addClass("dx-slider-label").appendTo(this._$wrapper);
      this._$minLabel.text(m.default.format(e, i));
      this._$maxLabel ||= (0, r.default)("<div>").addClass("dx-slider-label").appendTo(this._$wrapper);
      this._$maxLabel.text(m.default.format(t, i));
      this.$element().addClass("dx-slider-label-position-" + n);
    } else {
      if (this._$minLabel) {
        this._$minLabel.remove();
        delete this._$minLabel;
      }
      if (this._$maxLabel) {
        this._$maxLabel.remove();
        delete this._$maxLabel;
      }
    }
  },
  _renderStartHandler: function () {
    var e = this;
    var t = (0, g.addNamespace)(p.default.down, this.NAME);
    var n = (0, g.addNamespace)(d.name, this.NAME);
    var i = this._createAction(this._startHandler.bind(this));
    var o = this.$element();
    h.default.off(o, t);
    h.default.on(o, t, function (e) {
      if ((0, g.isMouseEvent)(e)) {
        i({
          event: e
        });
      }
    });
    h.default.off(o, n);
    h.default.on(o, n, function (t) {
      var n = e._activeHandle();
      if (n) {
        h.default.trigger(n, "focusin");
        h.default.trigger(n, "focus");
      }
      i({
        event: t
      });
      if (e.option("valueChangeMode") === "onHandleRelease") {
        e.option("value", e._getActualValue());
        e._actualValue = undefined;
      }
    });
  },
  _itemWidthFunc: function () {
    return this._itemWidthRatio;
  },
  _swipeStartHandler: function (e) {
    var t = this.option("rtlEnabled");
    if ((0, g.isTouchEvent)(e.event)) {
      this._createAction(this._startHandler.bind(this))({
        event: e.event
      });
    }
    this._feedbackDeferred = new l.Deferred();
    (0, c.lock)(this._feedbackDeferred);
    this._toggleActiveState(this._activeHandle(), this.option("activeStateEnabled"));
    this._startOffset = this._currentRatio;
    var n = this._startOffset * this._swipePixelRatio();
    var o = (1 - this._startOffset) * this._swipePixelRatio();
    e.event.maxLeftOffset = t ? o : n;
    e.event.maxRightOffset = t ? n : o;
    this._itemWidthRatio = (0, i.getWidth)(this.$element()) / this._swipePixelRatio();
    this._needPreventAnimation = true;
  },
  _swipeEndHandler: function (e) {
    if (!this._isSingleValuePossible()) {
      this._feedbackDeferred.resolve();
      this._toggleActiveState(this._activeHandle(), false);
      var t = this.option("rtlEnabled") ? -1 : 1;
      var n = this._startOffset + t * e.event.targetOffset / this._swipePixelRatio();
      delete this._needPreventAnimation;
      this._saveValueChangeEvent(e.event);
      this._changeValueOnSwipe(n);
      if (this.option("valueChangeMode") === "onHandleRelease") {
        this.option("value", this._getActualValue());
      }
      this._actualValue = undefined;
      delete this._startOffset;
      this._renderValue();
    }
  },
  _activeHandle: function () {
    return this._$handle;
  },
  _swipeUpdateHandler: function (e) {
    if (!this._isSingleValuePossible()) {
      this._saveValueChangeEvent(e.event);
      this._updateHandlePosition(e);
    }
  },
  _updateHandlePosition: function (e) {
    var t = this.option("rtlEnabled") ? -1 : 1;
    var n = Math.min(this._startOffset + t * e.event.offset / this._swipePixelRatio(), 1);
    (0, i.setWidth)(this._$range, n * 100 + "%");
    b.default.getInstance(this._activeHandle()).fitTooltipPosition;
    this._changeValueOnSwipe(n);
  },
  _swipePixelRatio: function () {
    var e = this.option("min");
    return (this.option("max") - e) / this._valueStep(this.option("step"));
  },
  _valueStep: function (e) {
    if (!e || !!isNaN(e)) {
      e = 1;
    }
    return e;
  },
  _getValueExponentLength: function () {
    var e = this.option();
    var t = e.step;
    var n = e.min;
    return Math.max((0, x.getExponentLength)(t), (0, x.getExponentLength)(n));
  },
  _roundToExponentLength: function (e) {
    var t = this._getValueExponentLength();
    return (0, x.roundFloatPart)(e, t);
  },
  _changeValueOnSwipe: function (e) {
    var t = this.option("min");
    var n = this.option("max");
    var i = this._valueStep(this.option("step"));
    var o = t + e * (n - t);
    if (!(i < 0)) {
      if (o === n || o === t) {
        this._setValueOnSwipe(o);
      } else {
        var a = Math.round((o - t) / i);
        o = this._roundToExponentLength(a * i + t);
        this._setValueOnSwipe(Math.max(Math.min(o, n), t));
      }
    }
  },
  _setValueOnSwipe: function (e) {
    this._actualValue = e;
    if (this.option("valueChangeMode") === "onHandleRelease") {
      b.default.getInstance(this._activeHandle()).option("value", e);
    } else {
      this.option("value", e);
      this._saveValueChangeEvent(undefined);
    }
  },
  _getActualValue: function () {
    return this._actualValue ?? this.option("value");
  },
  _isSingleValuePossible: function () {
    var e = this.option();
    return e.min === e.max;
  },
  _startHandler: function (e) {
    if (!this._isSingleValuePossible()) {
      var t = e.event;
      this._currentRatio = ((0, g.eventData)(t).x - this._$bar.offset().left) / (0, i.getWidth)(this._$bar);
      if (this.option("rtlEnabled")) {
        this._currentRatio = 1 - this._currentRatio;
      }
      this._saveValueChangeEvent(t);
      this._changeValueOnSwipe(this._currentRatio);
    }
  },
  _renderValue: function () {
    this.callBase();
    var e = this._getActualValue();
    this._getSubmitElement().val((0, s.applyServerDecimalSeparator)(e));
    b.default.getInstance(this._activeHandle()).option("value", e);
  },
  _setRangeStyles: function (e) {
    if (e) {
      this._$range.css(e);
    }
  },
  _callHandlerMethod: function (e, t) {
    b.default.getInstance(this._$handle)[e](t);
  },
  _repaintHandle: function () {
    this._callHandlerMethod("repaint");
  },
  _fitTooltip: function () {
    this._callHandlerMethod("updateTooltipPosition");
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "visible":
        this.callBase(e);
        this._renderHandle();
        this._repaintHandle();
        break;
      case "min":
      case "max":
        this._renderValue();
        this.callBase(e);
        this._renderLabels();
        this._renderAriaMinAndMax();
        this._fitTooltip();
        break;
      case "step":
        this._renderValue();
        break;
      case "keyStep":
        break;
      case "showRange":
        this._renderRangeVisibility();
        break;
      case "tooltip":
        this._renderHandle();
        break;
      case "label":
        this._renderLabels();
        break;
      case "useInkRipple":
        this._invalidate();
        break;
      case "valueChangeMode":
        break;
      default:
        this.callBase(e);
    }
  },
  _refresh: function () {
    this._toggleRTLDirection(this.option("rtlEnabled"));
    this._renderDimensions();
    this._renderValue();
    this._renderHandle();
    this._repaintHandle();
  },
  _clean: function () {
    delete this._inkRipple;
    delete this._actualValue;
    this.callBase();
  }
});
(0, o.default)("dxSlider", C);
var S = C;
exports.default = S;
module.exports = exports.default;
module.exports.default = exports.default;