exports.disposeAction = function (e) {
  if (!g) {
    return;
  }
  var t = g.option("actions");
  var n = t.length;
  t = t.filter(function (t) {
    return t._options.silent("id") !== e;
  });
  if (n === t.length) {
    return;
  }
  if (t.length) {
    if (t.length === 1) {
      g.option((0, r.extend)({}, m(t[0]), {
        actions: t
      }));
    } else {
      g.option({
        actions: t
      });
    }
  } else {
    g.dispose();
    g.$element().remove();
    g = null;
  }
};
exports.initAction = function (e) {
  e._options.silent("onInitializing", null);
  var t = false;
  if (g) {
    var n = g.option("actions");
    n.forEach(function (n) {
      if (n._options.silent("id") === e._options.silent("id")) {
        t = true;
        return e;
      }
    });
    delete g._options.position;
    if (t) {
      if (n.length === 1) {
        g.option((0, r.extend)({}, m(n[0]), {
          actions: n,
          position: g._getPosition()
        }));
      } else {
        g.option((0, r.extend)(g._getCurrentOptions(n), {
          actions: n
        }));
      }
    } else {
      if (g._getVisibleActions(n).length >= g.option("maxSpeedDialActionCount")) {
        e.dispose();
        l.default.log("W1014");
        return;
      }
      n.push(e);
      g.option((0, r.extend)(g._getCurrentOptions(n), {
        actions: n
      }));
    }
  } else {
    var i = (0, o.default)("<div>").appendTo(p(e.$element()));
    g = e._createComponent(i, _, (0, r.extend)({}, m(e), {
      actions: [e]
    }));
  }
};
exports.repaint = function () {
  if (!g) {
    return;
  }
  var e = g._getVisibleActions();
  var t = e.length === 1 ? e[0].option("icon") : g._getDefaultOptions().icon;
  var n = e.length === 1 ? e[0].option("label") : g._getDefaultOptions().label;
  g.option({
    actions: g.option("actions"),
    icon: t,
    closeIcon: g._getDefaultOptions().closeIcon,
    position: g._getPosition(),
    label: n,
    maxSpeedDialActionCount: g._getDefaultOptions().maxSpeedDialActionCount,
    direction: g._getDefaultOptions().direction
  });
};
var i = require("./58664.js");
var o = h(require("./68374.js"));
var a = h(require("./80209.js"));
var r = require("./13306.js");
var s = h(require("./55994.js"));
var l = h(require("./96688.js"));
var u = h(require("./92591.js"));
var d = h(require("./37668.js"));
var c = require("./75811.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var p = u.default.getSwatchContainer;
var g = null;
function m(e) {
  var t = e.option();
  var n = t.animation;
  var i = t.actionComponent;
  var o = t.actionVisible;
  var a = t.actions;
  var s = t.activeStateEnabled;
  var l = t.direction;
  var u = t.elementAttr;
  var d = t.hint;
  var c = t.hoverStateEnabled;
  var h = t.icon;
  var f = t.id;
  var p = t.index;
  var g = t.label;
  var m = t.onClick;
  var _ = t.onContentReady;
  var v = t.parentPosition;
  var y = t.position;
  var b = t.visible;
  var x = t.zIndex;
  return (0, r.extend)({}, {
    animation: n,
    actionComponent: i,
    actionVisible: o,
    actions: a,
    activeStateEnabled: s,
    direction: l,
    elementAttr: u,
    hint: d,
    hoverStateEnabled: c,
    icon: h,
    id: f,
    index: p,
    label: g,
    onClick: m,
    onContentReady: _,
    parentPosition: v,
    position: y,
    visible: b,
    zIndex: x,
    _ignoreElementAttrDeprecation: true
  }, {
    onInitialized: null,
    onDisposing: null
  });
}
var _ = function (e) {
  var t;
  var n;
  function l() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = l).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var u = l.prototype;
  u._getDefaultOptions = function () {
    var t = {
      icon: "add",
      closeIcon: "close",
      position: {
        at: "right bottom",
        my: "right bottom",
        offset: {
          x: -16,
          y: -16
        }
      },
      maxSpeedDialActionCount: 5,
      hint: "",
      label: "",
      direction: "auto",
      actions: [],
      activeStateEnabled: true,
      hoverStateEnabled: true,
      indent: (0, c.isCompact)() ? 49 : 55,
      childIndent: 40,
      childOffset: (0, c.isCompact)() ? 2 : 9,
      callOverlayRenderShading: true,
      hideOnOutsideClick: true
    };
    return (0, r.extend)(e.prototype._getDefaultOptions.call(this), (0, r.extend)(t, (0, a.default)().floatingActionButtonConfig, {
      shading: false
    }));
  };
  u._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return (0, c.isMaterial)() && !(0, c.isCompact)();
      },
      options: {
        indent: 72,
        childIndent: 56,
        childOffset: 8
      }
    }, {
      device: function () {
        return (0, c.isMaterial)() && (0, c.isCompact)();
      },
      options: {
        indent: 58,
        childIndent: 48,
        childOffset: 1
      }
    }]);
  };
  u._render = function () {
    this.$element().addClass("dx-fa-button-main");
    e.prototype._render.call(this);
    this._moveToContainer();
    this._renderCloseIcon();
    this._renderClick();
  };
  u._renderLabel = function () {
    e.prototype._renderLabel.call(this);
    this.$element().toggleClass("dx-fa-button-with-label", !!this._$label);
  };
  u._renderIcon = function () {
    e.prototype._renderIcon.call(this);
    this.$element().toggleClass("dx-fa-button-without-icon", !this.option("icon"));
  };
  u._renderCloseIcon = function () {
    this._$closeIcon = this._renderButtonIcon(this._$closeIcon, this._options.silent("closeIcon"), "dx-fa-button-icon-close");
    this._$closeIcon.addClass("dx-state-invisible");
  };
  u._renderClick = function () {
    this._clickAction = this._getVisibleActions().length === 1 ? this._getActionComponent()._createActionByOption("onClick") : this._createAction(this._clickHandler.bind(this));
    this._setClickAction();
  };
  u._getVisibleActions = function (e) {
    return (e || this.option("actions")).filter(function (e) {
      return e.option("visible");
    });
  };
  u._getCurrentOptions = function (e) {
    var t = g._getVisibleActions(e);
    var n = this._getDefaultOptions();
    delete n.elementAttr;
    delete n.closeOnOutsideClick;
    if (t.length === 1) {
      return (0, r.extend)(m(t[0]), {
        position: this._getPosition()
      });
    } else {
      return (0, r.extend)(n, {
        visible: t.length !== 0
      });
    }
  };
  u._clickHandler = function () {
    var e = this._actionItems.filter(function (e) {
      return e.option("actionVisible");
    }).sort(function (e, t) {
      return e.option("index") - t.option("index");
    });
    if (e.length !== 1) {
      var t = e.length - 1;
      for (var n = 0; n < e.length; n++) {
        e[n].option("animation", this._getActionAnimation(e[n], n, t));
        e[n].option("position", this._getActionPosition(e, n));
        e[n]._$wrapper.css("position", this._$wrapper.css("position"));
        e[n].toggle();
      }
      if ((0, a.default)().floatingActionButtonConfig.shading) {
        this._isShadingShown = !this.option("shading");
        this.option("shading", this._isShadingShown);
      }
      this._$icon.toggleClass("dx-state-invisible");
      this._$closeIcon.toggleClass("dx-state-invisible");
    }
  };
  u._updateZIndexStackPosition = function () {
    e.prototype._updateZIndexStackPosition.call(this);
    this._overlayStack().push(this);
  };
  u._renderActions = function () {
    var e = this;
    var t = this.option("actions");
    if (this._actionItems && this._actionItems.length) {
      this._actionItems.forEach(function (e) {
        e.dispose();
        e.$element().remove();
      });
      this._actionItems = [];
    }
    this._actionItems = [];
    if (t.length !== 1) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        var a = (0, o.default)("<div>").appendTo(p(i.$element()));
        s.default.off(a, "click");
        s.default.on(a, "click", function () {
          e._clickHandler();
        });
        i._options.silent("actionComponent", i);
        i._options.silent("parentPosition", this._getPosition());
        i._options.silent("actionVisible", i._options.silent("visible"));
        this._actionItems.push(this._createComponent(a, d.default, (0, r.extend)({}, m(i), {
          visible: false
        })));
      }
    }
  };
  u._getActionAnimation = function (e, t, n) {
    e._options.silent("animation.show.delay", t * 30);
    e._options.silent("animation.hide.delay", (n - t) * 30);
    return e._options.silent("animation");
  };
  u._getDirectionIndex = function (e, t) {
    if (t === "auto") {
      var n = (0, i.getHeight)(this.$content());
      var o = this.initialOption("indent") + this.initialOption("childIndent") * e.length - n;
      var a = this.$content().offset().top;
      if (o < a || a >= (0, i.getHeight)(this._positionController._$wrapperCoveredElement) - n - a) {
        return -1;
      } else {
        return 1;
      }
    }
    if (t !== "down") {
      return -1;
    } else {
      return 1;
    }
  };
  u._getActionPosition = function (e, t) {
    var n = e[t];
    var i = this.initialOption("childOffset");
    var o = n._options.silent("label") && !this._$label ? this._isPositionLeft(this._getPosition()) ? i : -i : 0;
    var a = this.initialOption("indent") + this.initialOption("childIndent") * t;
    var r = this._getDirectionIndex(e, this.option("direction")) * a;
    var s = n._options.silent("label") ? this._isPositionLeft(this._getPosition()) ? "left" : "right" : "center";
    return {
      of: this.$content(),
      at: s,
      my: s,
      offset: {
        x: o,
        y: r
      }
    };
  };
  u._outsideClickHandler = function (e) {
    if (this._isShadingShown) {
      if ((0, o.default)(e.target)[0] === this._$wrapper[0]) {
        e.preventDefault();
        this._clickHandler();
      }
    }
  };
  u._setPosition = function () {
    if (this.option("visible")) {
      this._hide();
      this._show();
    }
  };
  u._getPosition = function () {
    return this._getDefaultOptions().position;
  };
  u._getInkRippleContainer = function () {
    return this.$content();
  };
  u._optionChanged = function (t) {
    switch (t.name) {
      case "actions":
        if (this._isVisible()) {
          this._renderIcon();
          this._renderLabel();
        }
        this._renderCloseIcon();
        this._renderClick();
        this._renderActions();
        break;
      case "maxSpeedDialActionCount":
        this._renderActions();
        break;
      case "closeIcon":
        this._renderCloseIcon();
        break;
      case "position":
        e.prototype._optionChanged.call(this, t);
        this._setPosition();
        break;
      case "label":
        if (this._isVisible()) {
          this._renderLabel();
        }
        this._setPosition();
        break;
      case "icon":
        if (this._isVisible()) {
          this._renderIcon();
        }
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return l;
}(d.default);