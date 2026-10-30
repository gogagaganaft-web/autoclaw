exports.EditorPropsType = exports.EditorProps = exports.Editor = undefined;
exports.defaultOptions = function (e) {
  I.push(e);
  D.defaultProps = Object.create(Object.prototype, b(Object.getOwnPropertyDescriptors(D.defaultProps), Object.getOwnPropertyDescriptors((t = (0, c.convertRulesToOptions)(I), n = ["value"], Object.keys(t).reduce(function (e, i) {
    var o = t[i];
    e[n.some(function (e) {
      return e === i;
    }) ? "default" + i.charAt(0).toUpperCase() + i.slice(1) : i] = o;
    return e;
  }, {})))));
  var t;
  var n;
};
exports.viewFunction = undefined;
var i;
var o = require("./55285.js");
var a = require("./44105.js");
var r = (i = require("./73176.js")) && i.__esModule ? i : {
  default: i
};
var s = require("./73687.js");
var l = require("./31651.js");
var u = require("./86237.js");
var d = require("./85500.js");
var c = require("./45434.js");
var h = ["accessKey", "activeStateEnabled", "aria", "children", "className", "classes", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
function f(e) {
  return (f = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function p(e, t) {
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
function g(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return m(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return m(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return m(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function m(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function _(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, x(i.key), i);
  }
}
function v(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function y(e, t) {
  return (y = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function b() {
  return (b = Object.assign ? Object.assign.bind() : function (e) {
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
function x(e) {
  var t = function (e, t) {
    if (f(e) !== "object" || e === null) {
      return e;
    }
    var n = e[Symbol.toPrimitive];
    if (n !== undefined) {
      var i = n.call(e, t || "default");
      if (f(i) !== "object") {
        return i;
      }
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }(e, "string");
  if (f(t) === "symbol") {
    return t;
  } else {
    return String(t);
  }
}
function w(e) {
  var t = e.classes;
  var n = e.isValid;
  var i = function (e, t, n) {
    if ((t = x(t)) in e) {
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
  }({
    "dx-state-readonly": !!e.readOnly,
    "dx-invalid": !n
  }, `${t}`, !!t);
  return (0, u.combineClasses)(i);
}
function C(e) {
  var t = e.aria;
  var n = e.cssClasses;
  var i = e.isValidationMessageVisible;
  var a = e.onFocusIn;
  var r = e.props;
  var l = r.accessKey;
  var u = r.activeStateEnabled;
  var c = r.children;
  var h = r.className;
  var f = r.disabled;
  var p = r.focusStateEnabled;
  var g = r.height;
  var m = r.hint;
  var _ = r.hoverStateEnabled;
  var v = r.onClick;
  var y = r.onKeyDown;
  var x = r.rtlEnabled;
  var w = r.tabIndex;
  var C = r.validationMessageMode;
  var S = r.validationMessagePosition;
  var k = r.visible;
  var D = r.width;
  var I = e.restAttributes;
  var T = e.rootElementRef;
  var E = e.validationErrors;
  var O = e.validationMessageGuid;
  var A = e.validationMessageTarget;
  var P = e.widgetRef;
  return (0, o.normalizeProps)((0, o.createComponentVNode)(2, s.Widget, b({
    rootElementRef: T,
    aria: t,
    classes: n,
    activeStateEnabled: u,
    focusStateEnabled: p,
    hoverStateEnabled: _,
    accessKey: l,
    className: h,
    rtlEnabled: x,
    hint: m,
    disabled: f,
    height: g,
    width: D,
    onFocusIn: a,
    onClick: v,
    onKeyDown: y,
    tabIndex: w,
    visible: k
  }, I, {
    children: (0, o.createFragment)([c, i && (0, o.createComponentVNode)(2, d.ValidationMessage, {
      validationErrors: E,
      mode: C,
      positionSide: S,
      rtlEnabled: x,
      target: A,
      boundary: A,
      visualContainer: A,
      contentId: O
    })], 0)
  }), null, P));
}
exports.viewFunction = C;
var S = Object.create(Object.prototype, b(Object.getOwnPropertyDescriptors(l.BaseWidgetProps), Object.getOwnPropertyDescriptors({
  readOnly: false,
  name: "",
  validationError: null,
  validationErrors: null,
  validationMessageMode: "auto",
  validationMessagePosition: "bottom",
  validationStatus: "valid",
  isValid: true,
  inputAttr: Object.freeze({}),
  defaultValue: null,
  valueChange: function () {}
})));
exports.EditorProps = S;
var k = Object.defineProperties({}, {
  readOnly: {
    get: function () {
      return S.readOnly;
    },
    configurable: true,
    enumerable: true
  },
  name: {
    get: function () {
      return S.name;
    },
    configurable: true,
    enumerable: true
  },
  validationError: {
    get: function () {
      return S.validationError;
    },
    configurable: true,
    enumerable: true
  },
  validationErrors: {
    get: function () {
      return S.validationErrors;
    },
    configurable: true,
    enumerable: true
  },
  validationMessageMode: {
    get: function () {
      return S.validationMessageMode;
    },
    configurable: true,
    enumerable: true
  },
  validationMessagePosition: {
    get: function () {
      return S.validationMessagePosition;
    },
    configurable: true,
    enumerable: true
  },
  validationStatus: {
    get: function () {
      return S.validationStatus;
    },
    configurable: true,
    enumerable: true
  },
  isValid: {
    get: function () {
      return S.isValid;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function () {
      return S.inputAttr;
    },
    configurable: true,
    enumerable: true
  },
  defaultValue: {
    get: function () {
      return S.defaultValue;
    },
    configurable: true,
    enumerable: true
  },
  valueChange: {
    get: function () {
      return S.valueChange;
    },
    configurable: true,
    enumerable: true
  },
  className: {
    get: function () {
      return S.className;
    },
    configurable: true,
    enumerable: true
  },
  activeStateEnabled: {
    get: function () {
      return S.activeStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  disabled: {
    get: function () {
      return S.disabled;
    },
    configurable: true,
    enumerable: true
  },
  focusStateEnabled: {
    get: function () {
      return S.focusStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  hoverStateEnabled: {
    get: function () {
      return S.hoverStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  tabIndex: {
    get: function () {
      return S.tabIndex;
    },
    configurable: true,
    enumerable: true
  },
  visible: {
    get: function () {
      return S.visible;
    },
    configurable: true,
    enumerable: true
  },
  aria: {
    get: function () {
      return s.WidgetProps.aria;
    },
    configurable: true,
    enumerable: true
  },
  classes: {
    get: function () {
      return s.WidgetProps.classes;
    },
    configurable: true,
    enumerable: true
  }
});
exports.EditorPropsType = k;
var D = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).widgetRef = (0, o.createRef)();
    n.rootElementRef = (0, o.createRef)();
    n.__getterCache = {};
    n.state = {
      validationMessageGuid: `dx-${new r.default()}`,
      isValidationMessageVisible: false,
      value: n.props.value !== undefined ? n.props.value : n.props.defaultValue
    };
    n.updateValidationMessageVisibility = n.updateValidationMessageVisibility.bind(v(n));
    n.focus = n.focus.bind(v(n));
    n.blur = n.blur.bind(v(n));
    n.onFocusIn = n.onFocusIn.bind(v(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  y(t, n);
  var s;
  var l;
  var u;
  var d = i.prototype;
  d.createEffects = function () {
    return [new a.InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), (0, a.createReRenderEffect)()];
  };
  d.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]);
    }
  };
  d.updateValidationMessageVisibility = function () {
    var e = this;
    this.setState(function (t) {
      return {
        isValidationMessageVisible: e.shouldShowValidationMessage
      };
    });
  };
  d.onFocusIn = function (e) {
    var t = this.props.onFocusIn;
    if (t != null) {
      t(e);
    }
  };
  d.focus = function () {
    this.widgetRef.current.focus();
  };
  d.blur = function () {
    this.widgetRef.current.blur();
  };
  d.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props.validationError !== t.validationError || this.props.validationErrors !== t.validationErrors) {
      this.__getterCache.validationErrors = undefined;
    }
  };
  d.render = function () {
    var e = this.props;
    return C({
      props: b({}, e, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      validationMessageGuid: this.state.validationMessageGuid,
      isValidationMessageVisible: this.state.isValidationMessageVisible,
      rootElementRef: this.rootElementRef,
      widgetRef: this.widgetRef,
      onFocusIn: this.onFocusIn,
      cssClasses: this.cssClasses,
      shouldShowValidationMessage: this.shouldShowValidationMessage,
      aria: this.aria,
      validationErrors: this.validationErrors,
      validationMessageTarget: this.validationMessageTarget,
      restAttributes: this.restAttributes
    });
  };
  s = i;
  if (l = [{
    key: "cssClasses",
    get: function () {
      return `${w(b({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }))}`;
    }
  }, {
    key: "shouldShowValidationMessage",
    get: function () {
      var t = this.props;
      var n = t.isValid;
      var i = t.validationStatus;
      var o = this.validationErrors ?? [];
      return (!n || i === "invalid") && o.length > 0;
    }
  }, {
    key: "aria",
    get: function () {
      var e = this.props;
      var t = e.isValid;
      var n = {
        readonly: e.readOnly ? "true" : "false",
        invalid: t ? "false" : "true"
      };
      if (this.shouldShowValidationMessage) {
        n.describedBy = this.state.validationMessageGuid;
      }
      return b({}, n, this.props.aria);
    }
  }, {
    key: "validationErrors",
    get: function () {
      var e;
      var t;
      var n;
      var i;
      var o = this;
      if (this.__getterCache.validationErrors !== undefined) {
        return this.__getterCache.validationErrors;
      } else {
        return this.__getterCache.validationErrors = (e = o.props, t = e.validationError, n = e.validationErrors, !(i = n && g(n)) && t && (i = [b({}, t)]), i);
      }
    }
  }, {
    key: "validationMessageTarget",
    get: function () {
      return this.rootElementRef?.current;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = b({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      });
      e.accessKey;
      e.activeStateEnabled;
      e.aria;
      e.children;
      e.className;
      e.classes;
      e.defaultValue;
      e.disabled;
      e.focusStateEnabled;
      e.height;
      e.hint;
      e.hoverStateEnabled;
      e.inputAttr;
      e.isValid;
      e.name;
      e.onClick;
      e.onFocusIn;
      e.onKeyDown;
      e.readOnly;
      e.rtlEnabled;
      e.tabIndex;
      e.validationError;
      e.validationErrors;
      e.validationMessageMode;
      e.validationMessagePosition;
      e.validationStatus;
      e.value;
      e.valueChange;
      e.visible;
      e.width;
      return p(e, h);
    }
  }]) {
    _(s.prototype, l);
  }
  if (u) {
    _(s, u);
  }
  Object.defineProperty(s, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.Editor = D;
D.defaultProps = k;
var I = [];