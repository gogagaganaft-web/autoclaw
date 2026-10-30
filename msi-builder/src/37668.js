exports.default = undefined;
var i = f(require("./68374.js"));
var o = require("./13306.js");
var a = f(require("./55994.js"));
var r = require("./39611.js");
var s = require("./95429.js");
var l = require("./44899.js");
var u = f(require("./89799.js"));
var d = require("./72672.js");
var c = require("./75811.js");
var h = require("./35922.js");
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
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var g = function (e) {
  var t;
  var n;
  function u() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = u).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  p(t, n);
  var f = u.prototype;
  f._getDefaultOptions = function () {
    return (0, o.extend)(e.prototype._getDefaultOptions.call(this), {
      shading: false,
      useInkRipple: false,
      callOverlayRenderShading: false,
      width: "auto",
      zIndex: 1500,
      _observeContentResize: false
    });
  };
  f._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return (0, c.isMaterial)();
      },
      options: {
        useInkRipple: true
      }
    }]);
  };
  f._moveToContainer = function () {
    this._$wrapper.appendTo(this.$element());
    this._$content.appendTo(this._$wrapper);
  };
  f._render = function () {
    this.$element().addClass("dx-fa-button");
    this._renderIcon();
    this._renderLabel();
    e.prototype._render.call(this);
    if (this.option("useInkRipple")) {
      this._renderInkRipple();
    }
    this._renderClick();
  };
  f._renderLabel = function () {
    if (this._$label) {
      this._$label.remove();
    }
    var e = this.option("label");
    if (e) {
      var t = (0, i.default)("<div>").addClass("dx-fa-button-label");
      var n = (0, i.default)("<div>").addClass("dx-fa-button-label-wrapper");
      this._$label = n.prependTo(this.$content()).append(t.text(e));
      this.$content().toggleClass("dx-fa-button-content-reverse", this._isPositionLeft(this.option("parentPosition")));
    } else {
      this._$label = null;
    }
  };
  f._isPositionLeft = function (e) {
    var t = "";
    if (e) {
      if ((0, h.isPlainObject)(e) && e.at) {
        t = e.at.x ? e.at.x : e.at;
      } else if (typeof e == "string") {
        t = e;
      }
    }
    return t.split(" ")[0] === "left";
  };
  f._renderButtonIcon = function (e, t, n) {
    if (e) {
      e.remove();
    }
    e = (0, i.default)("<div>").addClass(n);
    var o = (0, l.getImageContainer)(t);
    e.append(o).appendTo(this.$content());
    return e;
  };
  f._renderIcon = function () {
    this._$icon = this._renderButtonIcon(this._$icon, this._options.silent("icon"), "dx-fa-button-icon");
  };
  f._renderWrapper = function () {
    if (this._options.silent("callOverlayRenderShading")) {
      e.prototype._renderWrapper.call(this);
    }
  };
  f._getVisibleActions = function (e) {
    return (e || this.option("actions") || []).filter(function (e) {
      return e.option("visible");
    });
  };
  f._getActionComponent = function () {
    if (this._getVisibleActions().length === 1) {
      return this._getVisibleActions()[0];
    } else {
      return this.option("actionComponent") || this.option("actions")[0];
    }
  };
  f._initContentReadyAction = function () {
    this._contentReadyAction = this._getActionComponent()._createActionByOption("onContentReady", {
      excludeValidators: ["disabled", "readOnly"]
    }, true);
  };
  f._fireContentReadyAction = function () {
    this._contentReadyAction({
      actionElement: this.$element()
    });
  };
  f._updateZIndexStackPosition = function () {
    var e = this.option("zIndex");
    this._$wrapper.css("zIndex", e);
    this._$content.css("zIndex", e);
  };
  f._setClickAction = function () {
    var e = this;
    var t = (0, r.addNamespace)(s.name, this.NAME);
    var n = this.$element().find(".dx-overlay-content");
    a.default.off(n, t);
    a.default.on(n, t, function (t) {
      var n = {
        event: t,
        actionElement: e.element(),
        element: e._getActionComponent().$element()
      };
      e._clickAction(n);
    });
  };
  f._defaultActionArgs = function () {
    return {
      component: this._getActionComponent()
    };
  };
  f._renderClick = function () {
    this._clickAction = this._getActionComponent()._createActionByOption("onClick");
    this._setClickAction();
  };
  f._renderInkRipple = function () {
    this._inkRipple = (0, d.render)();
  };
  f._getInkRippleContainer = function () {
    return this._$icon;
  };
  f._toggleActiveState = function (t, n, i) {
    e.prototype._toggleActiveState.apply(this, arguments);
    if (this._inkRipple) {
      var o = {
        element: this._getInkRippleContainer(),
        event: i
      };
      if (n) {
        this._inkRipple.showWave(o);
      } else {
        this._inkRipple.hideWave(o);
      }
    }
  };
  f._optionChanged = function (t) {
    switch (t.name) {
      case "icon":
        this._renderIcon();
        break;
      case "onClick":
        this._renderClick();
        break;
      case "label":
        this._renderLabel();
        break;
      case "visible":
        this._currentVisible = t.previousValue;
        if (t.value) {
          this._show();
        } else {
          this._hide();
        }
        break;
      case "useInkRipple":
        this._render();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return u;
}(u.default);
exports.default = g;
module.exports = exports.default;
module.exports.default = exports.default;