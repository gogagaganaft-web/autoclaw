exports.default = undefined;
var i = require("./58664.js");
var o = b(require("./68374.js"));
var a = require("./58201.js");
var r = require("./6415.js");
var s = b(require("./73349.js"));
var l = b(require("./55994.js"));
var u = b(require("./99393.js"));
var d = require("./13306.js");
var c = require("./31648.js");
var h = b(require("./49387.js"));
var f = require("./35922.js");
var p = require("./60810.js");
var g = require("./39611.js");
var m = b(require("./96688.js"));
var _ = b(require("./51495.js"));
var v = require("./37518.js");
var y = require("./84228.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function x(e) {
  return (x = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var w = {
  left: "right",
  top: "bottom",
  right: "left",
  bottom: "top",
  center: "center"
};
function C(e) {
  if ((0, f.isObject)(e)) {
    return e.name;
  } else {
    return e;
  }
}
function S(e, t) {
  var n = e.option(t);
  return C(n);
}
function k(e, t) {
  var n = e.option();
  var i = n.target;
  var a = n.shading;
  var u = n.disabled;
  var d = n.hideEvent;
  var c = (0, f.isString)(i);
  var h = a && t === "hide";
  var p = h ? null : S(e, `${t}Event`);
  if (h && d) {
    m.default.log("W1020");
  }
  if (p && !u) {
    var _ = (0, g.addNamespace)(p, e.NAME);
    var v = e._createAction(function () {
      var n = function (e, t) {
        var n = e.option(t);
        return (0, f.isObject)(n) && n.delay;
      }(e, t + "Event");
      this._clearEventsTimeouts();
      if (n) {
        this._timeouts[t] = setTimeout(function () {
          e[t]();
        }, n);
      } else {
        e[t]();
      }
    }.bind(e), {
      validatingTargetName: "target"
    });
    function y(e) {
      v({
        event: e,
        target: (0, o.default)(e.currentTarget)
      });
    }
    var b = "_" + t + "EventHandler";
    if (c) {
      e[b] = y;
      l.default.on(s.default.getDocument(), _, i, y);
    } else {
      var x = (0, r.getPublicElement)((0, o.default)(i));
      e[b] = undefined;
      l.default.on(x, _, y);
    }
  }
}
function D(e, t, n, i) {
  var a = i || S(e, n + "Event");
  if (a) {
    a = (0, g.addNamespace)(a, e.NAME);
    var u = "_" + n + "EventHandler";
    if (e[u]) {
      l.default.off(s.default.getDocument(), a, t, e[u]);
    } else {
      l.default.off((0, r.getPublicElement)((0, o.default)(t)), a);
    }
  }
}
var I = _.default.inherit({
  _getDefaultOptions: function () {
    return (0, d.extend)(this.callBase(), {
      target: undefined,
      shading: false,
      position: (0, d.extend)({}, y.POPOVER_POSITION_ALIASES.bottom),
      hideOnOutsideClick: true,
      animation: {
        show: {
          type: "fade",
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          from: 1,
          to: 0
        }
      },
      showTitle: false,
      width: "auto",
      height: "auto",
      dragEnabled: false,
      resizeEnabled: false,
      fullScreen: false,
      hideOnParentScroll: true,
      arrowPosition: "",
      arrowOffset: 0,
      _fixWrapperPosition: true
    });
  },
  _defaultOptionsRules: function () {
    return [{
      device: {
        platform: "ios"
      },
      options: {
        arrowPosition: {
          boundaryOffset: {
            h: 20,
            v: -10
          },
          collision: "fit"
        }
      }
    }, {
      device: function () {
        return !(0, a.hasWindow)();
      },
      options: {
        animation: null
      }
    }];
  },
  _init: function () {
    this.callBase();
    this._renderArrow();
    this._timeouts = {};
    this.$element().addClass("dx-popover");
    this.$wrapper().addClass("dx-popover-wrapper");
    var t = this.option("toolbarItems")?.length;
    this.setAria("role", t ? "dialog" : "tooltip");
  },
  _render: function () {
    this.callBase.apply(this, arguments);
    this._detachEvents(this.option("target"));
    this._attachEvents();
  },
  _detachEvents: function (e) {
    D(this, e, "show");
    D(this, e, "hide");
  },
  _attachEvents: function () {
    k(this, "show");
    k(this, "hide");
  },
  _renderArrow: function () {
    this._$arrow = (0, o.default)("<div>").addClass("dx-popover-arrow").prependTo(this.$overlayContent());
  },
  _documentDownHandler: function (e) {
    return !this._isOutsideClick(e) || this.callBase(e);
  },
  _isOutsideClick: function (e) {
    return !(0, o.default)(e.target).closest(this.option("target")).length;
  },
  _animate: function (e) {
    if (e && e.to && x(e.to) === "object") {
      (0, d.extend)(e.to, {
        position: this._getContainerPosition()
      });
    }
    this.callBase.apply(this, arguments);
  },
  _stopAnimation: function () {
    this.callBase.apply(this, arguments);
  },
  _renderTitle: function () {
    this.$wrapper().toggleClass("dx-popover-without-title", !this.option("showTitle"));
    this.callBase();
  },
  _renderPosition: function () {
    var e = !(arguments.length > 0) || arguments[0] === undefined || arguments[0];
    this.callBase();
    this._renderOverlayPosition(e);
    this._actions.onPositioned();
  },
  _renderOverlayPosition: function (e) {
    this._resetOverlayPosition(e);
    this._updateContentSize(e);
    var t = this._getContainerPosition();
    var n = h.default.setup(this.$overlayContent(), t);
    var i = this._getSideByLocation(n);
    this._togglePositionClass("dx-position-" + i);
    this._toggleFlippedClass(n.h.flip, n.v.flip);
    if (this._isHorizontalSide() || this._isVerticalSide()) {
      this._renderArrowPosition(i);
    }
  },
  _resetOverlayPosition: function (e) {
    this._setContentHeight(e);
    this._togglePositionClass("dx-position-" + this._positionController._positionSide);
    (0, c.move)(this.$overlayContent(), {
      left: 0,
      top: 0
    });
    this._$arrow.css({
      top: "auto",
      right: "auto",
      bottom: "auto",
      left: "auto"
    });
  },
  _updateContentSize: function (e) {
    if (this.$content() && e) {
      var t = h.default.calculate(this.$overlayContent(), this._getContainerPosition());
      if (t.h.oversize > 0 && this._isHorizontalSide() && !t.h.fit) {
        var n = (0, i.getWidth)(this.$overlayContent()) - t.h.oversize;
        (0, i.setWidth)(this.$overlayContent(), n);
      }
      if (t.v.oversize > 0 && this._isVerticalSide() && !t.v.fit) {
        var o = (0, i.getHeight)(this.$overlayContent()) - t.v.oversize;
        var a = (0, i.getHeight)(this.$content()) - t.v.oversize;
        (0, i.setHeight)(this.$overlayContent(), o);
        (0, i.setHeight)(this.$content(), a);
      }
    }
  },
  _getContainerPosition: function () {
    return this._positionController._getContainerPosition();
  },
  _hideOnParentScrollTarget: function () {
    return (0, o.default)(this._positionController._position.of || this.callBase());
  },
  _getSideByLocation: function (e) {
    var t = e.v.flip;
    var n = e.h.flip;
    if (this._isVerticalSide() && t || this._isHorizontalSide() && n || this._isPopoverInside()) {
      return w[this._positionController._positionSide];
    } else {
      return this._positionController._positionSide;
    }
  },
  _togglePositionClass: function (e) {
    this.$wrapper().removeClass("dx-position-left dx-position-right dx-position-top dx-position-bottom").addClass(e);
  },
  _toggleFlippedClass: function (e, t) {
    this.$wrapper().toggleClass("dx-popover-flipped-horizontal", e).toggleClass("dx-popover-flipped-vertical", t);
  },
  _renderArrowPosition: function (e) {
    var t = (0, v.getBoundingRect)(this._$arrow.get(0));
    var n = -(this._isVerticalSide(e) ? t.height : t.width);
    this._$arrow.css(w[e], n);
    var i;
    var a = this._isVerticalSide(e) ? "left" : "top";
    var r = this._isVerticalSide(e) ? "width" : "height";
    var s = (0, o.default)(this._positionController._position.of);
    var l = h.default.offset(s) || {
      top: 0,
      left: 0
    };
    var u = h.default.offset(this.$overlayContent());
    var d = t[r];
    var c = u[a];
    var f = (0, v.getBoundingRect)(this.$overlayContent().get(0))[r];
    var g = l[a];
    var m = s.get(0);
    var _ = m && !m.preventDefault ? (0, v.getBoundingRect)(m)[r] : 0;
    var y = Math.max(c, g);
    var b = Math.min(c + f, g + _);
    i = this.option("arrowPosition") === "start" ? y - c : this.option("arrowPosition") === "end" ? b - c - d : (y + b) / 2 - c - d / 2;
    var x = this._positionController._getContentBorderWidth(e);
    var C = (0, p.fitIntoRange)(i - x + this.option("arrowOffset"), x, f - d - x * 2);
    this._$arrow.css(a, C);
  },
  _isPopoverInside: function () {
    return this._positionController._isPopoverInside();
  },
  _setContentHeight: function (e) {
    if (e) {
      this.callBase();
    }
  },
  _getPositionControllerConfig: function () {
    var e = this.option();
    var t = e.shading;
    var n = e.target;
    return (0, d.extend)({}, this.callBase(), {
      target: n,
      shading: t,
      $arrow: this._$arrow
    });
  },
  _initPositionController: function () {
    this._positionController = new y.PopoverPositionController(this._getPositionControllerConfig());
  },
  _renderWrapperDimensions: function () {
    if (this.option("shading")) {
      this.$wrapper().css({
        width: "100%",
        height: "100%"
      });
    }
  },
  _isVerticalSide: function (e) {
    return this._positionController._isVerticalSide(e);
  },
  _isHorizontalSide: function (e) {
    return this._positionController._isHorizontalSide(e);
  },
  _clearEventTimeout: function (e) {
    clearTimeout(this._timeouts[e]);
  },
  _clearEventsTimeouts: function () {
    this._clearEventTimeout("show");
    this._clearEventTimeout("hide");
  },
  _clean: function () {
    this._detachEvents(this.option("target"));
    this.callBase.apply(this, arguments);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "arrowPosition":
      case "arrowOffset":
        this._renderGeometry();
        break;
      case "fullScreen":
        if (e.value) {
          this.option("fullScreen", false);
        }
        break;
      case "target":
        if (e.previousValue) {
          this._detachEvents(e.previousValue);
        }
        this._positionController.updateTarget(e.value);
        this._invalidate();
        break;
      case "showEvent":
      case "hideEvent":
        var t = e.name.substring(0, 4);
        var n = C(e.previousValue);
        this.hide();
        D(this, this.option("target"), t, n);
        k(this, t);
        break;
      case "visible":
        this._clearEventTimeout(e.value ? "show" : "hide");
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  },
  show: function (e) {
    if (e) {
      this.option("target", e);
    }
    return this.callBase();
  }
});
(0, u.default)("dxPopover", I);
var T = I;
exports.default = T;
module.exports = exports.default;
module.exports.default = exports.default;