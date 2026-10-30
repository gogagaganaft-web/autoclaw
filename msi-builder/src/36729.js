exports.defaultOptionRules = exports.ButtonProps = exports.Button = undefined;
exports.defaultOptions = function (e) {
  R.push(e);
  M.defaultProps = Object.create(Object.prototype, k(Object.getOwnPropertyDescriptors(M.defaultProps), Object.getOwnPropertyDescriptors((0, a.convertRulesToOptions)(A)), Object.getOwnPropertyDescriptors((0, a.convertRulesToOptions)(R))));
};
exports.viewFunction = undefined;
var i = require("./55285.js");
var o = require("./44105.js");
var a = require("./45434.js");
var r = y(require("./20530.js"));
var s = require("./75811.js");
var l = require("./72918.js");
var u = require("./86237.js");
var d = require("./44899.js");
var c = require("./78008.js");
var h = require("./92272.js");
var f = y(require("./17381.js"));
var p = require("./84507.js");
var g = require("./73687.js");
var m = require("./31651.js");
var _ = y(require("./28109.js"));
var v = ["accessKey", "activeStateEnabled", "children", "className", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "icon", "iconPosition", "iconTemplate", "onClick", "onKeyDown", "onSubmit", "pressed", "rtlEnabled", "stylingMode", "tabIndex", "template", "templateData", "text", "type", "useInkRipple", "useSubmitBehavior", "visible", "width"];
function y(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function b(e) {
  return (b = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
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
    Object.defineProperty(e, I(i.key), i);
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
function k() {
  return (k = Object.assign ? Object.assign.bind() : function (e) {
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
function D(e, t, n) {
  if ((t = I(t)) in e) {
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
function I(e) {
  var t = function (e, t) {
    if (b(e) !== "object" || e === null) {
      return e;
    }
    var n = e[Symbol.toPrimitive];
    if (n !== undefined) {
      var i = n.call(e, t || "default");
      if (b(i) !== "object") {
        return i;
      }
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }(e, "string");
  if (b(t) === "symbol") {
    return t;
  } else {
    return String(t);
  }
}
var T = ["outlined", "text", "contained"];
function E(e) {
  var t = e.props;
  var n = t.children;
  var o = t.iconPosition;
  var a = t.iconTemplate;
  var r = t.template;
  var s = t.text;
  var l = !e.props.template && !n && s !== "";
  var u = o === "left";
  var d = !e.props.template && !n && (e.iconSource || e.props.iconTemplate) && (0, i.createComponentVNode)(2, h.Icon, {
    source: e.iconSource,
    position: o,
    iconTemplate: a
  });
  return (0, i.normalizeProps)((0, i.createComponentVNode)(2, g.Widget, k({
    accessKey: e.props.accessKey,
    activeStateEnabled: e.props.activeStateEnabled,
    aria: e.aria,
    className: e.props.className,
    classes: e.cssClasses,
    disabled: e.props.disabled,
    focusStateEnabled: e.props.focusStateEnabled,
    height: e.props.height,
    hint: e.props.hint,
    hoverStateEnabled: e.props.hoverStateEnabled,
    onActive: e.onActive,
    onClick: e.onWidgetClick,
    onInactive: e.onInactive,
    onKeyDown: e.keyDown,
    rtlEnabled: e.props.rtlEnabled,
    tabIndex: e.props.tabIndex,
    visible: e.props.visible,
    width: e.props.width
  }, e.restAttributes, {
    children: (0, i.createVNode)(1, "div", "dx-button-content", [e.props.template && r({
      data: e.buttonTemplateData
    }), !e.props.template && n, u && d, l && (0, i.createVNode)(1, "span", "dx-button-text", s, 0), !u && d, e.props.useSubmitBehavior && (0, i.createVNode)(64, "input", "dx-button-submit-input", null, 1, {
      type: "submit",
      tabIndex: -1
    }, null, e.submitInputRef), e.props.useInkRipple && (0, i.createComponentVNode)(2, p.InkRipple, {
      config: e.inkRippleConfig
    }, null, e.inkRippleRef)], 0, null, null, e.contentRef)
  }), null, e.widgetRef));
}
exports.viewFunction = E;
var O = Object.create(Object.prototype, k(Object.getOwnPropertyDescriptors(m.BaseWidgetProps), Object.getOwnPropertyDescriptors({
  activeStateEnabled: true,
  hoverStateEnabled: true,
  icon: "",
  iconPosition: "left",
  stylingMode: "contained",
  text: "",
  type: "normal",
  useInkRipple: false,
  useSubmitBehavior: false,
  templateData: Object.freeze({})
})));
exports.ButtonProps = O;
var A = (0, a.createDefaultOptionRules)([{
  device: function () {
    return r.default.real().deviceType === "desktop" && !r.default.isSimulator();
  },
  options: {
    focusStateEnabled: true
  }
}, {
  device: function () {
    return (0, s.isMaterial)((0, s.current)());
  },
  options: {
    useInkRipple: true
  }
}]);
exports.defaultOptionRules = A;
function P(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, i.normalizeProps)((0, i.createComponentVNode)(2, e, k({}, t)));
  } : e);
}
var M = function (e) {
  var t;
  var n;
  function a(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.contentRef = (0, i.createRef)();
    n.inkRippleRef = (0, i.createRef)();
    n.submitInputRef = (0, i.createRef)();
    n.widgetRef = (0, i.createRef)();
    n.__getterCache = {};
    n.focus = n.focus.bind(C(n));
    n.activate = n.activate.bind(C(n));
    n.deactivate = n.deactivate.bind(C(n));
    n.submitEffect = n.submitEffect.bind(C(n));
    n.checkDeprecation = n.checkDeprecation.bind(C(n));
    n.onActive = n.onActive.bind(C(n));
    n.onInactive = n.onInactive.bind(C(n));
    n.onWidgetClick = n.onWidgetClick.bind(C(n));
    n.keyDown = n.keyDown.bind(C(n));
    return n;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  S(t, n);
  var r;
  var s;
  var h;
  var p = a.prototype;
  p.createEffects = function () {
    return [new o.InfernoEffect(this.submitEffect, [this.props.onSubmit, this.props.useSubmitBehavior]), new o.InfernoEffect(this.checkDeprecation, [this.props.type]), (0, o.createReRenderEffect)()];
  };
  p.updateEffects = function () {
    var e;
    var t;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.props.onSubmit, this.props.useSubmitBehavior]);
    }
    if ((t = this._effects[1]) !== null && t !== undefined) {
      t.update([this.props.type]);
    }
  };
  p.submitEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.onSubmit;
    if (t.useSubmitBehavior && n) {
      l.click.on(this.submitInputRef.current, function (t) {
        return n({
          event: t,
          submitInput: e.submitInputRef.current
        });
      }, {
        namespace: "UIFeedback"
      });
      return function () {
        return l.click.off(e.submitInputRef.current, {
          namespace: "UIFeedback"
        });
      };
    }
  };
  p.checkDeprecation = function () {
    if (this.props.type === "back") {
      f.default.log("W0016", "type", "back", "22.2", "Use the 'back' icon instead");
    }
  };
  p.onActive = function (e) {
    if (this.props.useInkRipple) {
      this.inkRippleRef.current.showWave({
        element: this.contentRef.current,
        event: e
      });
    }
  };
  p.onInactive = function (e) {
    if (this.props.useInkRipple) {
      this.inkRippleRef.current.hideWave({
        element: this.contentRef.current,
        event: e
      });
    }
  };
  p.onWidgetClick = function (e) {
    var t = this.props;
    var n = t.onClick;
    var i = t.useSubmitBehavior;
    if (n != null) {
      n({
        event: e
      });
    }
    if (i) {
      this.submitInputRef.current.click();
    }
  };
  p.keyDown = function (e) {
    var t = this.props.onKeyDown;
    var n = e.keyName;
    var i = e.originalEvent;
    var o = e.which;
    var a = t == null ? undefined : t(e);
    if (a != null && a.cancel) {
      return a;
    }
    if (n === "space" || o === "space" || n === "enter" || o === "enter") {
      i.preventDefault();
      this.onWidgetClick(i);
    }
  };
  p.focus = function () {
    this.widgetRef.current.focus();
  };
  p.activate = function () {
    this.widgetRef.current.activate();
  };
  p.deactivate = function () {
    this.widgetRef.current.deactivate();
  };
  p.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props.icon !== t.icon || this.props.text !== t.text || this.props.type !== t.type) {
      this.__getterCache.inkRippleConfig = undefined;
    }
  };
  p.render = function () {
    var e = this.props;
    return E({
      props: k({}, e, {
        template: P(e.template),
        iconTemplate: P(e.iconTemplate)
      }),
      contentRef: this.contentRef,
      submitInputRef: this.submitInputRef,
      inkRippleRef: this.inkRippleRef,
      widgetRef: this.widgetRef,
      onActive: this.onActive,
      onInactive: this.onInactive,
      onWidgetClick: this.onWidgetClick,
      keyDown: this.keyDown,
      aria: this.aria,
      cssClasses: this.cssClasses,
      iconSource: this.iconSource,
      inkRippleConfig: this.inkRippleConfig,
      buttonTemplateData: this.buttonTemplateData,
      restAttributes: this.restAttributes
    });
  };
  r = a;
  if (s = [{
    key: "aria",
    get: function () {
      var e = this.props;
      var t = e.icon;
      var n = e.text;
      var i = n ?? "";
      if (!n && t) {
        switch ((0, d.getImageSourceType)(t)) {
          case "image":
            i = !t.includes("base64") && /^(?!(?:https?:\/\/)|(?:ftp:\/\/)|(?:www\.))[^\s]+$/.test(t) ? t.replace(/.+\/([^.]+)\..+$/, "$1") : "";
            break;
          case "dxIcon":
            i = _.default.format((0, c.camelize)(t, true)) || t;
            break;
          case "fontIcon":
            i = t;
            break;
          case "svg":
            i = /<title>(.*?)<\/title>/.exec(t)?.[1] ?? "";
        }
      }
      return k({
        role: "button"
      }, i ? {
        label: i
      } : {});
    }
  }, {
    key: "cssClasses",
    get: function () {
      e = this.props;
      n = e.icon;
      i = e.iconPosition;
      o = e.stylingMode;
      a = e.text;
      r = e.type;
      s = o && T.includes(o);
      D(t = {
        "dx-button": true
      }, `dx-button-mode-${s ? o : "contained"}`, true);
      D(t, `dx-button-${r ?? "normal"}`, true);
      D(t, "dx-button-has-text", !!a);
      D(t, "dx-button-has-icon", !!n);
      D(t, "dx-button-icon-right", i !== "left");
      l = t;
      return (0, u.combineClasses)(l);
      var e;
      var t;
      var n;
      var i;
      var o;
      var a;
      var r;
      var s;
      var l;
    }
  }, {
    key: "iconSource",
    get: function () {
      var e = this.props;
      var t = e.icon;
      var n = e.type;
      if (t || n === "back") {
        return (t ?? "") || "back";
      } else {
        return "";
      }
    }
  }, {
    key: "inkRippleConfig",
    get: function () {
      var e;
      var t;
      var n;
      var i;
      var o = this;
      if (this.__getterCache.inkRippleConfig !== undefined) {
        return this.__getterCache.inkRippleConfig;
      } else {
        return this.__getterCache.inkRippleConfig = (e = o.props, t = e.icon, n = e.text, i = e.type, !n && t || i === "back" ? {
          isCentered: true,
          useHoldAnimation: false,
          waveSizeCoefficient: 1
        } : {});
      }
    }
  }, {
    key: "buttonTemplateData",
    get: function () {
      var e = this.props;
      var t = e.icon;
      var n = e.templateData;
      return k({
        icon: t,
        text: e.text
      }, n);
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.accessKey;
      e.activeStateEnabled;
      e.children;
      e.className;
      e.disabled;
      e.focusStateEnabled;
      e.height;
      e.hint;
      e.hoverStateEnabled;
      e.icon;
      e.iconPosition;
      e.iconTemplate;
      e.onClick;
      e.onKeyDown;
      e.onSubmit;
      e.pressed;
      e.rtlEnabled;
      e.stylingMode;
      e.tabIndex;
      e.template;
      e.templateData;
      e.text;
      e.type;
      e.useInkRipple;
      e.useSubmitBehavior;
      e.visible;
      e.width;
      return x(e, v);
    }
  }]) {
    w(r.prototype, s);
  }
  if (h) {
    w(r, h);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return a;
}(o.InfernoWrapperComponent);
exports.Button = M;
M.defaultProps = Object.create(Object.prototype, k(Object.getOwnPropertyDescriptors(O), Object.getOwnPropertyDescriptors(k({}, (0, a.convertRulesToOptions)(A)))));
var R = [];