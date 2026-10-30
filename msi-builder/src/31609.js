exports.default = undefined;
var i = require("./58664.js");
var o = v(require("./68374.js"));
var a = v(require("./55994.js"));
var r = v(require("./20530.js"));
var s = require("./13306.js");
var l = v(require("./99393.js"));
var u = v(require("./96452.js"));
var d = require("./39611.js");
var c = require("./91633.js");
var h = require("./37518.js");
var f = v(require("./87209.js"));
var p = v(require("./28109.js"));
var g = require("./95429.js");
var m = v(require("./66894.js"));
var _ = require("./62754.js");
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var y = u.default.inherit({
  _supportedKeys: function () {
    var e = this.option("rtlEnabled");
    function t(e) {
      e.preventDefault();
      this._clickAction({
        event: e
      });
    }
    function n(e, t) {
      t.preventDefault();
      t.stopPropagation();
      this._saveValueChangeEvent(t);
      this._animateValue(e);
    }
    return (0, s.extend)(this.callBase(), {
      space: t,
      enter: t,
      leftArrow: n.bind(this, !!e),
      rightArrow: n.bind(this, !e)
    });
  },
  _useTemplates: function () {
    return false;
  },
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      switchedOnText: p.default.format("dxSwitch-switchedOnText"),
      switchedOffText: p.default.format("dxSwitch-switchedOffText"),
      value: false
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return r.default.real().deviceType === "desktop" && !r.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _feedbackHideTimeout: 0,
  _animating: false,
  _initMarkup: function () {
    this._renderContainers();
    this.$element().addClass("dx-switch").append(this._$switchWrapper);
    this._renderSubmitElement();
    this._renderClick();
    this.setAria("role", "button");
    this._renderSwipeable();
    this.callBase();
    this._renderSwitchInner();
    this._renderLabels();
    this._renderValue();
  },
  _getInnerOffset: function (e, t) {
    return (t - this._offsetDirection() * Number(!e)) / 2 * 100 + "%";
  },
  _getHandleOffset: function (e, t) {
    if (this.option("rtlEnabled")) {
      e = !e;
    }
    if (e) {
      return -t * 100 - 100 + "%";
    } else {
      return -t * 100 + "%";
    }
  },
  _renderSwitchInner: function () {
    this._$switchInner = (0, o.default)("<div>").addClass("dx-switch-inner").appendTo(this._$switchContainer);
    this._$handle = (0, o.default)("<div>").addClass("dx-switch-handle").appendTo(this._$switchInner);
  },
  _renderLabels: function () {
    this._$labelOn = (0, o.default)("<div>").addClass("dx-switch-on").prependTo(this._$switchInner);
    this._$labelOff = (0, o.default)("<div>").addClass("dx-switch-off").appendTo(this._$switchInner);
    this._setLabelsText();
  },
  _renderContainers: function () {
    this._$switchContainer = (0, o.default)("<div>").addClass("dx-switch-container");
    this._$switchWrapper = (0, o.default)("<div>").addClass("dx-switch-wrapper").append(this._$switchContainer);
  },
  _renderSwipeable: function () {
    this._createComponent(this.$element(), m.default, {
      elastic: false,
      immediate: true,
      onStart: this._swipeStartHandler.bind(this),
      onUpdated: this._swipeUpdateHandler.bind(this),
      onEnd: this._swipeEndHandler.bind(this),
      itemSizeFunc: this._getItemSizeFunc.bind(this)
    });
  },
  _getItemSizeFunc: function () {
    return (0, i.getOuterWidth)(this._$switchContainer, true) - (0, h.getBoundingRect)(this._$handle.get(0)).width;
  },
  _renderSubmitElement: function () {
    this._$submitElement = (0, o.default)("<input>").attr("type", "hidden").appendTo(this.$element());
  },
  _getSubmitElement: function () {
    return this._$submitElement;
  },
  _offsetDirection: function () {
    if (this.option("rtlEnabled")) {
      return -1;
    } else {
      return 1;
    }
  },
  _renderPosition: function (e, t) {
    var n = this._getInnerOffset(e, t);
    var i = this._getHandleOffset(e, t);
    this._$switchInner.css("transform", " translateX(" + n + ")");
    this._$handle.css("transform", " translateX(" + i + ")");
  },
  _validateValue: function () {
    var e = this.option("value");
    if (typeof e != "boolean") {
      this._options.silent("value", !!e);
    }
  },
  _renderClick: function () {
    var e = (0, d.addNamespace)(g.name, this.NAME);
    var t = this.$element();
    this._clickAction = this._createAction(this._clickHandler.bind(this));
    a.default.off(t, e);
    a.default.on(t, e, function (e) {
      this._clickAction({
        event: e
      });
    }.bind(this));
  },
  _clickHandler: function (e) {
    var t = e.event;
    this._saveValueChangeEvent(t);
    if (!this._animating && !this._swiping) {
      this._animateValue(!this.option("value"));
    }
  },
  _animateValue: function (e) {
    var t = this.option("value");
    var n = e;
    if (t !== n) {
      this._animating = true;
      var i = this._getInnerOffset(t, 0);
      var o = this._getInnerOffset(n, 0);
      var a = this._getHandleOffset(t, 0);
      var r = this._getHandleOffset(n, 0);
      var s = this;
      var l = {};
      var u = {};
      var d = {};
      var c = {};
      l.transform = " translateX(" + i + ")";
      u.transform = " translateX(" + o + ")";
      d.transform = " translateX(" + a + ")";
      c.transform = " translateX(" + r + ")";
      this.$element().toggleClass("dx-switch-on-value", n);
      f.default.animate(this._$handle, {
        from: d,
        to: c,
        duration: 100
      });
      f.default.animate(this._$switchInner, {
        from: l,
        to: u,
        duration: 100,
        complete: function () {
          s._animating = false;
          s.option("value", n);
        }
      });
    }
  },
  _swipeStartHandler: function (e) {
    var t = this.option("value");
    var n = this.option("rtlEnabled");
    var i = n ? 0 : 1;
    var o = n ? 1 : 0;
    e.event.maxLeftOffset = t ? i : o;
    e.event.maxRightOffset = t ? o : i;
    this._swiping = true;
    this._feedbackDeferred = new _.Deferred();
    (0, c.lock)(this._feedbackDeferred);
    this._toggleActiveState(this.$element(), this.option("activeStateEnabled"));
  },
  _swipeUpdateHandler: function (e) {
    this._renderPosition(this.option("value"), e.event.offset);
  },
  _swipeEndHandler: function (e) {
    var t = this;
    var n = this._offsetDirection();
    var i = {};
    var o = {};
    var a = this._getInnerOffset(t.option("value"), e.event.targetOffset);
    var r = this._getHandleOffset(t.option("value"), e.event.targetOffset);
    i.transform = " translateX(" + a + ")";
    o.transform = " translateX(" + r + ")";
    f.default.animate(this._$handle, {
      to: o,
      duration: 100
    });
    f.default.animate(this._$switchInner, {
      to: i,
      duration: 100,
      complete: function () {
        t._swiping = false;
        var i = t.option("value") + n * e.event.targetOffset;
        t._saveValueChangeEvent(e.event);
        t.option("value", Boolean(i));
        t._feedbackDeferred.resolve();
        t._toggleActiveState(t.$element(), false);
      }
    });
  },
  _renderValue: function () {
    this._validateValue();
    var e = this.option("value");
    this._renderPosition(e, 0);
    this.$element().toggleClass("dx-switch-on-value", e);
    this._getSubmitElement().val(e);
    this.setAria({
      pressed: e,
      label: e ? this.option("switchedOnText") : this.option("switchedOffText")
    });
  },
  _setLabelsText: function () {
    if (this._$labelOn) {
      this._$labelOn.text(this.option("switchedOnText"));
    }
    if (this._$labelOff) {
      this._$labelOff.text(this.option("switchedOffText"));
    }
  },
  _visibilityChanged: function (e) {
    if (e) {
      this.repaint();
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "width":
        delete this._marginBound;
        this._refresh();
        break;
      case "switchedOnText":
      case "switchedOffText":
        this._setLabelsText();
        break;
      case "value":
        this._renderValue();
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, l.default)("dxSwitch", y);
var b = y;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;