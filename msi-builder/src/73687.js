function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.viewFunction = exports.WidgetProps = exports.Widget = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
require("./95429.js");
require("./24028.js");
var r = require("./35922.js");
var s = require("./72918.js");
var l = require("./19828.js");
var u = require("./86237.js");
var d = require("./13306.js");
var c = require("./80968.js");
var h = require("./31651.js");
var f = require("./49697.js");
var p = require("./66042.js");
var g = require("./8374.js");
var m = b(require("./55814.js"));
var _ = b(require("./17381.js"));
var v = b(require("./73349.js"));
var y = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "addWidgetClass", "aria", "children", "className", "classes", "cssText", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onRootElementRendered", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function x(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
function w(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, D(i.key), i);
  }
}
function C(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function S(e, t) {
  return (S = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function k(e, t, n) {
  if ((t = D(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function D(e) {
  var t = function (e, t) {
    if (i(e) !== "object" || e === null) {
      return e;
    }
    var n = e[Symbol.toPrimitive];
    if (n !== undefined) {
      var o = n.call(e, t || "default");
      if (i(o) !== "object") {
        return o;
      }
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }(e, "string");
  if (i(t) === "symbol") {
    return t;
  } else {
    return String(t);
  }
}
function I() {
  return (I = Object.assign ? Object.assign.bind() : function (e) {
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
function T(e) {
  var t = (0, o.normalizeProps)((0, o.createVNode)(1, "div", e.cssClasses, e.props.children, 0, I({}, e.attributes, {
    tabIndex: e.tabIndex,
    title: e.props.hint,
    style: (0, a.normalizeStyles)(e.styles)
  }), null, e.widgetElementRef));
  if (e.shouldRenderConfigProvider) {
    return (0, o.createComponentVNode)(2, p.ConfigProvider, {
      rtlEnabled: e.rtlEnabled,
      children: t
    });
  } else {
    return t;
  }
}
exports.viewFunction = T;
var E = Object.create(Object.prototype, I(Object.getOwnPropertyDescriptors(h.BaseWidgetProps), Object.getOwnPropertyDescriptors({
  _feedbackHideTimeout: 400,
  _feedbackShowTimeout: 30,
  cssText: "",
  aria: Object.freeze({}),
  classes: "",
  name: "",
  addWidgetClass: true
})));
exports.WidgetProps = E;
var O = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).widgetElementRef = (0, o.createRef)();
    n.state = {
      active: false,
      focused: false,
      hovered: false
    };
    n.setRootElementRef = n.setRootElementRef.bind(C(n));
    n.activeEffect = n.activeEffect.bind(C(n));
    n.inactiveEffect = n.inactiveEffect.bind(C(n));
    n.clickEffect = n.clickEffect.bind(C(n));
    n.focus = n.focus.bind(C(n));
    n.blur = n.blur.bind(C(n));
    n.activate = n.activate.bind(C(n));
    n.deactivate = n.deactivate.bind(C(n));
    n.focusInEffect = n.focusInEffect.bind(C(n));
    n.focusOutEffect = n.focusOutEffect.bind(C(n));
    n.hoverStartEffect = n.hoverStartEffect.bind(C(n));
    n.hoverEndEffect = n.hoverEndEffect.bind(C(n));
    n.keyboardEffect = n.keyboardEffect.bind(C(n));
    n.resizeEffect = n.resizeEffect.bind(C(n));
    n.windowResizeEffect = n.windowResizeEffect.bind(C(n));
    n.visibilityEffect = n.visibilityEffect.bind(C(n));
    n.checkDeprecation = n.checkDeprecation.bind(C(n));
    n.applyCssTextEffect = n.applyCssTextEffect.bind(C(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  S(t, n);
  var h;
  var p;
  var b;
  var D = i.prototype;
  D.createEffects = function () {
    return [new a.InfernoEffect(this.setRootElementRef, []), new a.InfernoEffect(this.activeEffect, [this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]), new a.InfernoEffect(this.inactiveEffect, [this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]), new a.InfernoEffect(this.clickEffect, [this.props.disabled, this.props.name, this.props.onClick]), new a.InfernoEffect(this.focusInEffect, [this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]), new a.InfernoEffect(this.focusOutEffect, [this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]), new a.InfernoEffect(this.hoverStartEffect, [this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]), new a.InfernoEffect(this.hoverEndEffect, [this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]), new a.InfernoEffect(this.keyboardEffect, [this.props.focusStateEnabled, this.props.onKeyDown]), new a.InfernoEffect(this.resizeEffect, [this.props.name, this.props.onDimensionChanged]), new a.InfernoEffect(this.windowResizeEffect, [this.props.onDimensionChanged]), new a.InfernoEffect(this.visibilityEffect, [this.props.name, this.props.onVisibilityChange]), new a.InfernoEffect(this.checkDeprecation, [this.props.height, this.props.width]), new a.InfernoEffect(this.applyCssTextEffect, [this.props.cssText]), (0, a.createReRenderEffect)()];
  };
  D.updateEffects = function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    var r;
    var s;
    var l;
    var u;
    var d;
    var c;
    var h;
    if ((e = this._effects[1]) !== null && e !== undefined) {
      e.update([this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive]);
    }
    if ((t = this._effects[2]) !== null && t !== undefined) {
      t.update([this.props._feedbackHideTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.onInactive, this.state.active]);
    }
    if ((n = this._effects[3]) !== null && n !== undefined) {
      n.update([this.props.disabled, this.props.name, this.props.onClick]);
    }
    if ((i = this._effects[4]) !== null && i !== undefined) {
      i.update([this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn]);
    }
    if ((o = this._effects[5]) !== null && o !== undefined) {
      o.update([this.props.focusStateEnabled, this.props.name, this.props.onFocusOut, this.state.focused]);
    }
    if ((a = this._effects[6]) !== null && a !== undefined) {
      a.update([this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverStart, this.state.active]);
    }
    if ((r = this._effects[7]) !== null && r !== undefined) {
      r.update([this.props.activeStateUnit, this.props.hoverStateEnabled, this.props.onHoverEnd, this.state.hovered]);
    }
    if ((s = this._effects[8]) !== null && s !== undefined) {
      s.update([this.props.focusStateEnabled, this.props.onKeyDown]);
    }
    if ((l = this._effects[9]) !== null && l !== undefined) {
      l.update([this.props.name, this.props.onDimensionChanged]);
    }
    if ((u = this._effects[10]) !== null && u !== undefined) {
      u.update([this.props.onDimensionChanged]);
    }
    if ((d = this._effects[11]) !== null && d !== undefined) {
      d.update([this.props.name, this.props.onVisibilityChange]);
    }
    if ((c = this._effects[12]) !== null && c !== undefined) {
      c.update([this.props.height, this.props.width]);
    }
    if ((h = this._effects[13]) !== null && h !== undefined) {
      h.update([this.props.cssText]);
    }
  };
  D.setRootElementRef = function () {
    var e = this.props;
    var t = e.onRootElementRendered;
    var n = e.rootElementRef;
    if (n) {
      n.current = this.widgetElementRef.current;
    }
    if (t != null) {
      t(this.widgetElementRef.current);
    }
  };
  D.activeEffect = function () {
    var e = this;
    var t = this.props;
    var n = t._feedbackShowTimeout;
    var i = t.activeStateEnabled;
    var o = t.activeStateUnit;
    var a = t.disabled;
    var r = t.onActive;
    var s = o;
    if (i && !a) {
      return (0, l.subscribeToDxActiveEvent)(this.widgetElementRef.current, function (t) {
        e.setState(function (e) {
          return {
            active: true
          };
        });
        if (r != null) {
          r(t);
        }
      }, {
        timeout: n,
        selector: s
      }, "UIFeedback");
    }
  };
  D.inactiveEffect = function () {
    var e = this;
    var t = this.props;
    var n = t._feedbackHideTimeout;
    var i = t.activeStateEnabled;
    var o = t.activeStateUnit;
    var a = t.onInactive;
    var r = o;
    if (i) {
      return (0, l.subscribeToDxInactiveEvent)(this.widgetElementRef.current, function (t) {
        if (e.state.active) {
          e.setState(function (e) {
            return {
              active: false
            };
          });
          if (a != null) {
            a(t);
          }
        }
      }, {
        timeout: n,
        selector: r
      }, "UIFeedback");
    }
  };
  D.clickEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.disabled;
    var i = t.name;
    var o = t.onClick;
    var a = i;
    if (o && !n) {
      s.dxClick.on(this.widgetElementRef.current, o, {
        namespace: a
      });
      return function () {
        return s.dxClick.off(e.widgetElementRef.current, {
          namespace: a
        });
      };
    }
  };
  D.focusInEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.disabled;
    var i = t.focusStateEnabled;
    var o = t.name;
    var a = t.onFocusIn;
    var r = `${o}Focus`;
    if (i && !n) {
      return (0, l.subscribeToDxFocusInEvent)(this.widgetElementRef.current, function (t) {
        if (!t.isDefaultPrevented()) {
          e.setState(function (e) {
            return {
              focused: true
            };
          });
          if (a != null) {
            a(t);
          }
        }
      }, null, r);
    }
  };
  D.focusOutEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.focusStateEnabled;
    var i = t.name;
    var o = t.onFocusOut;
    var a = `${i}Focus`;
    if (n) {
      return (0, l.subscribeToDxFocusOutEvent)(this.widgetElementRef.current, function (t) {
        if (!t.isDefaultPrevented() && e.state.focused) {
          e.setState(function (e) {
            return {
              focused: false
            };
          });
          if (o != null) {
            o(t);
          }
        }
      }, null, a);
    }
  };
  D.hoverStartEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.activeStateUnit;
    var i = t.disabled;
    var o = t.hoverStateEnabled;
    var a = t.onHoverStart;
    var r = n;
    if (o && !i) {
      return (0, l.subscribeToDxHoverStartEvent)(this.widgetElementRef.current, function (t) {
        if (!e.state.active) {
          e.setState(function (e) {
            return {
              hovered: true
            };
          });
        }
        if (a != null) {
          a(t);
        }
      }, {
        selector: r
      }, "UIFeedback");
    }
  };
  D.hoverEndEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.activeStateUnit;
    var i = t.hoverStateEnabled;
    var o = t.onHoverEnd;
    var a = n;
    if (i) {
      return (0, l.subscribeToDxHoverEndEvent)(this.widgetElementRef.current, function (t) {
        if (e.state.hovered) {
          e.setState(function (e) {
            return {
              hovered: false
            };
          });
          if (o != null) {
            o(t);
          }
        }
      }, {
        selector: a
      }, "UIFeedback");
    }
  };
  D.keyboardEffect = function () {
    var e = this.props;
    var t = e.focusStateEnabled;
    var n = e.onKeyDown;
    if (t && n) {
      var i = s.keyboard.on(this.widgetElementRef.current, this.widgetElementRef.current, function (e) {
        return n(e);
      });
      return function () {
        return s.keyboard.off(i);
      };
    }
  };
  D.resizeEffect = function () {
    var e = this;
    var t = `${this.props.name}VisibilityChange`;
    var n = this.props.onDimensionChanged;
    if (n) {
      s.resize.on(this.widgetElementRef.current, n, {
        namespace: t
      });
      return function () {
        return s.resize.off(e.widgetElementRef.current, {
          namespace: t
        });
      };
    }
  };
  D.windowResizeEffect = function () {
    var e = this.props.onDimensionChanged;
    if (e) {
      m.default.add(e);
      return function () {
        m.default.remove(e);
      };
    }
  };
  D.visibilityEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.name;
    var i = t.onVisibilityChange;
    var o = `${n}VisibilityChange`;
    if (i) {
      s.visibility.on(this.widgetElementRef.current, function () {
        return i(true);
      }, function () {
        return i(false);
      }, {
        namespace: o
      });
      return function () {
        return s.visibility.off(e.widgetElementRef.current, {
          namespace: o
        });
      };
    }
  };
  D.checkDeprecation = function () {
    var e = this.props;
    var t = e.height;
    var n = e.width;
    if ((0, r.isFunction)(n)) {
      _.default.log("W0017", "width");
    }
    if ((0, r.isFunction)(t)) {
      _.default.log("W0017", "height");
    }
  };
  D.applyCssTextEffect = function () {
    var e = this.props.cssText;
    if (e !== "") {
      this.widgetElementRef.current.style.cssText = e;
    }
  };
  D.focus = function () {
    s.focus.trigger(this.widgetElementRef.current);
  };
  D.blur = function () {
    var e = v.default.getActiveElement(this.widgetElementRef.current);
    if (this.widgetElementRef.current === e) {
      e.blur();
    }
  };
  D.activate = function () {
    this.setState(function (e) {
      return {
        active: true
      };
    });
  };
  D.deactivate = function () {
    this.setState(function (e) {
      return {
        active: false
      };
    });
  };
  D.render = function () {
    var e = this.props;
    return T({
      props: I({}, e),
      active: this.state.active,
      focused: this.state.focused,
      hovered: this.state.hovered,
      widgetElementRef: this.widgetElementRef,
      config: this.config,
      shouldRenderConfigProvider: this.shouldRenderConfigProvider,
      rtlEnabled: this.rtlEnabled,
      attributes: this.attributes,
      styles: this.styles,
      cssClasses: this.cssClasses,
      tabIndex: this.tabIndex,
      restAttributes: this.restAttributes
    });
  };
  h = i;
  if (p = [{
    key: "config",
    get: function () {
      if (this.context[f.ConfigContext.id]) {
        return this.context[f.ConfigContext.id];
      } else {
        return f.ConfigContext.defaultValue;
      }
    }
  }, {
    key: "shouldRenderConfigProvider",
    get: function () {
      var e = this.props.rtlEnabled;
      return (0, g.resolveRtlEnabledDefinition)(e, this.config);
    }
  }, {
    key: "rtlEnabled",
    get: function () {
      var e = this.props.rtlEnabled;
      return (0, g.resolveRtlEnabled)(e, this.config);
    }
  }, {
    key: "attributes",
    get: function () {
      var e;
      var t = this.props;
      var n = t.aria;
      var i = t.disabled;
      var o = t.focusStateEnabled;
      var a = t.visible;
      var r = o && !i && this.props.accessKey;
      return I({}, (0, d.extend)({}, r && {
        accessKey: r
      }), (e = I({}, n, {
        disabled: i,
        hidden: !a
      }), Object.keys(e).reduce(function (t, n) {
        if (e[n]) {
          return I({}, t, k({}, n === "role" || n === "id" ? n : `aria-${n}`, String(e[n])));
        } else {
          return t;
        }
      }, {})), (0, d.extend)({}, this.restAttributes));
    }
  }, {
    key: "styles",
    get: function () {
      var e = this.props;
      var t = e.height;
      var n = e.width;
      var i = this.restAttributes.style || {};
      var o = (0, c.normalizeStyleProp)("width", (0, r.isFunction)(n) ? n() : n);
      var a = (0, c.normalizeStyleProp)("height", (0, r.isFunction)(t) ? t() : t);
      return I({}, i, {
        height: a ?? i.height,
        width: o ?? i.width
      });
    }
  }, {
    key: "cssClasses",
    get: function () {
      var e;
      var t = this.props;
      var n = t.activeStateEnabled;
      var i = t.addWidgetClass;
      var o = t.className;
      var a = t.classes;
      var r = t.disabled;
      var s = t.focusStateEnabled;
      var l = t.hoverStateEnabled;
      var d = t.onVisibilityChange;
      var c = t.visible;
      var h = !!s && !r;
      var f = !!l && !r;
      var p = !!n && !r;
      k(e = {
        "dx-widget": !!i
      }, String(a), !!a);
      k(e, String(o), !!o);
      k(e, "dx-state-disabled", !!r);
      k(e, "dx-state-invisible", !c);
      k(e, "dx-state-focused", !!this.state.focused && h);
      k(e, "dx-state-active", !!this.state.active && p);
      k(e, "dx-state-hover", !!this.state.hovered && f && !this.state.active);
      k(e, "dx-rtl", !!this.rtlEnabled);
      k(e, "dx-visibility-change-handler", !!d);
      var g = e;
      return (0, u.combineClasses)(g);
    }
  }, {
    key: "tabIndex",
    get: function () {
      var e = this.props;
      var t = e.disabled;
      var n = e.focusStateEnabled;
      var i = e.tabIndex;
      if (n && !t) {
        return i;
      } else {
        return undefined;
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e._feedbackHideTimeout;
      e._feedbackShowTimeout;
      e.accessKey;
      e.activeStateEnabled;
      e.activeStateUnit;
      e.addWidgetClass;
      e.aria;
      e.children;
      e.className;
      e.classes;
      e.cssText;
      e.disabled;
      e.focusStateEnabled;
      e.height;
      e.hint;
      e.hoverStateEnabled;
      e.name;
      e.onActive;
      e.onClick;
      e.onDimensionChanged;
      e.onFocusIn;
      e.onFocusOut;
      e.onHoverEnd;
      e.onHoverStart;
      e.onInactive;
      e.onKeyDown;
      e.onRootElementRendered;
      e.onVisibilityChange;
      e.rootElementRef;
      e.rtlEnabled;
      e.tabIndex;
      e.visible;
      e.width;
      return x(e, y);
    }
  }]) {
    w(h.prototype, p);
  }
  if (b) {
    w(h, b);
  }
  Object.defineProperty(h, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.Widget = O;
O.defaultProps = E;