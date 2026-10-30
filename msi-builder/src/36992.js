exports.default = undefined;
var i = require("./58664.js");
var o = f(require("./68374.js"));
var a = f(require("./55994.js"));
var r = f(require("./97834.js"));
var s = f(require("./6320.js"));
var l = f(require("./99393.js"));
var u = require("./13306.js");
var d = require("./20576.js");
var c = require("./39611.js");
var h = f(require("./28109.js"));
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e, t) {
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
      return g(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return g(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function g(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
var m = r.default.inherit({
  _supportedKeys: function () {
    var e = this.option("rtlEnabled");
    var t = this;
    function n(e, n) {
      if (t.option("start") === t.option("end")) {
        t._capturedHandle = n;
        e.target = t._capturedHandle;
        a.default.trigger(t._capturedHandle, "focus");
      }
    }
    function i(n, i, a) {
      var r = (0, o.default)(n.target).hasClass("dx-rangeslider-start-handle") ? "start" : "end";
      var s = t.option(r);
      i = t._valueStep(i);
      s += a * (e ? -i : i);
      t.option(r, s);
    }
    function r(o, a) {
      n(o, e ? t._$handleStart : t._$handleEnd);
      i(o, a, 1);
    }
    function s(o, a) {
      n(o, e ? t._$handleEnd : t._$handleStart);
      i(o, a, -1);
    }
    return (0, u.extend)(this.callBase(), {
      leftArrow: function (e) {
        this._processKeyboardEvent(e);
        s(e, this.option("step"));
      },
      rightArrow: function (e) {
        this._processKeyboardEvent(e);
        r(e, this.option("step"));
      },
      pageUp: function (e) {
        this._processKeyboardEvent(e);
        r(e, this.option("step") * this.option("keyStep"));
      },
      pageDown: function (e) {
        this._processKeyboardEvent(e);
        s(e, this.option("step") * this.option("keyStep"));
      },
      home: function (e) {
        this._processKeyboardEvent(e);
        var t = (0, o.default)(e.target).hasClass("dx-rangeslider-start-handle");
        var n = t ? "start" : "end";
        var i = t ? "min" : "start";
        var a = this.option(i);
        this.option(n, a);
      },
      end: function (e) {
        this._processKeyboardEvent(e);
        var t = (0, o.default)(e.target).hasClass("dx-rangeslider-start-handle");
        var n = t ? "start" : "end";
        var i = t ? "end" : "max";
        var a = this.option(i);
        this.option(n, a);
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      start: 40,
      end: 60,
      value: [40, 60],
      startName: "",
      endName: ""
    });
  },
  _renderSubmitElement: function () {
    var e = this.$element();
    this._$submitStartElement = (0, o.default)("<input>").attr("type", "hidden").attr("name", this.option("startName")).appendTo(e);
    this._$submitEndElement = (0, o.default)("<input>").attr("type", "hidden").attr("name", this.option("endName")).appendTo(e);
  },
  _initOptions: function (e) {
    this.callBase(e);
    var t = this.initialOption("value");
    var n = this.option("value");
    if (n[0] === t[0] && n[1] === t[1]) {
      this.option("value", [this.option("start"), this.option("end")]);
    } else {
      this.option({
        start: n[0],
        end: n[1]
      });
    }
  },
  _initMarkup: function () {
    this.$element().addClass("dx-rangeslider");
    this.callBase();
  },
  _renderContentImpl: function () {
    this._callHandlerMethod("repaint");
    this.callBase();
  },
  _renderHandle: function () {
    this._$handleStart = this._renderHandleImpl(this.option("start"), this._$handleStart).addClass("dx-rangeslider-start-handle");
    this._$handleEnd = this._renderHandleImpl(this.option("end"), this._$handleEnd).addClass("dx-rangeslider-end-handle");
    this._updateHandleAriaLabels();
  },
  _startHandler: function (e) {
    var t = e.event;
    var n = this._$range;
    var o = (0, i.getWidth)(n);
    var a = (0, c.eventData)(t).x - this._$bar.offset().left;
    var r = n.position().left;
    var s = n.position().left + o;
    var l = (this.option("rtlEnabled") ? -1 : 1) * ((r + s) / 2 - a) > 0;
    this._capturedHandle = l ? this._$handleStart : this._$handleEnd;
    this.callBase(e);
  },
  _updateHandleAriaLabels: function () {
    this.setAria("label", h.default.getFormatter("dxRangeSlider-ariaFrom")(this.option("dxRangeSlider-ariaFrom")), this._$handleStart);
    this.setAria("label", h.default.getFormatter("dxRangeSlider-ariaTill")(this.option("dxRangeSlider-ariaTill")), this._$handleEnd);
  },
  _activeHandle: function () {
    return this._capturedHandle;
  },
  _updateHandlePosition: function (e) {
    var t = this.option("rtlEnabled") ? -1 : 1;
    var n = this.option("max");
    var i = this.option("min");
    var o = this._startOffset + t * e.event.offset / this._swipePixelRatio();
    var r = (o = o.toPrecision(12)) * (n - i) + i;
    this._updateSelectedRangePosition(o, o);
    s.default.getInstance(this._activeHandle()).fitTooltipPosition;
    this._changeValueOnSwipe(o);
    var l;
    var u = p(this._getActualValue(), 2);
    var d = u[0];
    var c = u[1];
    if (d === c) {
      l = r < d ? this._$handleStart : this._$handleEnd;
      a.default.trigger(l, "focus");
      if (l && l !== this._capturedHandle) {
        this._updateSelectedRangePosition((d - i) / (n - i), (c - i) / (n - i));
        this._toggleActiveState(this._activeHandle(), false);
        this._toggleActiveState(l, true);
        this._capturedHandle = l;
      }
      this._updateSelectedRangePosition(o, o);
      this._changeValueOnSwipe(o);
    }
  },
  _updateSelectedRangePosition: function (e, t) {
    var n = this.option("rtlEnabled");
    var i = this._capturedHandle === this._$handleStart && n || this._capturedHandle === this._$handleEnd && !n;
    var o = i ? "right" : "left";
    if (n ^ i) {
      this._$range.css(o, 100 - t * 100 + "%");
    } else {
      this._$range.css(o, e * 100 + "%");
    }
  },
  _setValueOnSwipe: function (e) {
    var t = this._capturedHandle === this._$handleStart ? "start" : "end";
    var n = p(this._getActualValue(), 2);
    var i = n[0];
    var o = n[1];
    var a = this.option("max");
    var r = this.option("min");
    i = Math.min(Math.max(i, r), a);
    o = Math.min(Math.max(o, r), a);
    if (t === "start") {
      i = e > o ? o : e;
    } else {
      o = e < i ? i : e;
    }
    if (this.option("valueChangeMode") === "onHandleMove") {
      this.option("value", [i, o]);
    } else {
      this._actualValue = [i, o];
      this._renderValue();
    }
  },
  _renderValue: function () {
    var e = p(this._getActualValue(), 2);
    var t = e[0];
    var n = e[1];
    var i = this.option("min");
    var o = this.option("max");
    var a = this.option("rtlEnabled");
    t = Math.max(i, Math.min(t, o));
    n = Math.max(t, Math.min(n, o));
    if (this.option("valueChangeMode") === "onHandleMove") {
      this._setOptionWithoutOptionChange("start", t);
      this._setOptionWithoutOptionChange("end", n);
      this._setOptionWithoutOptionChange("value", [t, n]);
    }
    this._$submitStartElement.val((0, d.applyServerDecimalSeparator)(t));
    this._$submitEndElement.val((0, d.applyServerDecimalSeparator)(n));
    var r = o === i ? 0 : (n - i) / (o - i);
    var l = parseFloat(((o === i ? 0 : (t - i) / (o - i)) * 100).toPrecision(12)) + "%";
    var u = parseFloat(((1 - r) * 100).toPrecision(12)) + "%";
    if (!this._needPreventAnimation) {
      this._setRangeStyles({
        right: a ? l : u,
        left: a ? u : l
      });
    }
    s.default.getInstance(this._$handleStart).option("value", t);
    s.default.getInstance(this._$handleEnd).option("value", n);
  },
  _callHandlerMethod: function (e, t) {
    s.default.getInstance(this._$handleStart)[e](t);
    s.default.getInstance(this._$handleEnd)[e](t);
  },
  _setValueOption: function () {
    var e = this.option("start");
    var t = this.option("end");
    this.option("value", [e, t]);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "value":
        if (e.value[0] === e.previousValue[0] && e.value[1] === e.previousValue[1]) {
          break;
        }
        this._setOptionWithoutOptionChange("start", e.value[0]);
        this._setOptionWithoutOptionChange("end", e.value[1]);
        this._renderValue();
        var t = this.option("start");
        var n = this.option("end");
        this._createActionByOption("onValueChanged", {
          excludeValidators: ["disabled", "readOnly"]
        })({
          start: t,
          end: n,
          value: [t, n],
          event: this._valueChangeEventInstance,
          previousValue: e.previousValue
        });
        this.validationRequest.fire({
          value: [t, n],
          editor: this
        });
        this._saveValueChangeEvent(undefined);
        break;
      case "start":
      case "end":
        this._setValueOption();
        break;
      case "startName":
        this._$submitStartElement.attr("name", e.value);
        break;
      case "endName":
        this._$submitEndElement.attr("name", e.value);
        break;
      case "name":
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, l.default)("dxRangeSlider", m);
var _ = m;
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;