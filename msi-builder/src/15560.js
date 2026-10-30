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
exports.viewFunction = exports.NumberBoxPropsType = exports.NumberBoxProps = exports.NumberBox = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = (o = require("./34171.js")) && o.__esModule ? o : {
  default: o
};
var l = require("./96886.js");
var u = require("./77848.js");
var d = require("./48214.js");
var c = require("./96496.js");
var h = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "invalidValueMessage", "isValid", "label", "labelMode", "max", "min", "mode", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "showSpinButtons", "step", "tabIndex", "useLargeSpinButtons", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
function f(e, t) {
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
function p(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    o.enumerable = o.enumerable || false;
    o.configurable = true;
    if ("value" in o) {
      o.writable = true;
    }
    Object.defineProperty(e, (a = o.key, r = undefined, r = function (e, t) {
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
    }(a, "string"), i(r) === "symbol" ? r : String(r)), o);
  }
  var a;
  var r;
}
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function m() {
  return (m = Object.assign ? Object.assign.bind() : function (e) {
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
function _(e) {
  var t = e.componentProps;
  var n = e.restAttributes;
  return (0, a.normalizeProps)((0, a.createComponentVNode)(2, l.DomComponentWrapper, m({
    componentType: s.default,
    componentProps: t,
    templateNames: []
  }, n)));
}
exports.viewFunction = _;
var v = Object.create(Object.prototype, m(Object.getOwnPropertyDescriptors(u.EditorProps), Object.getOwnPropertyDescriptors({
  defaultValue: 0,
  isReactComponentWrapper: true
})));
exports.NumberBoxProps = v;
var y = Object.defineProperties({
  isReactComponentWrapper: true
}, {
  defaultValue: {
    get: function () {
      return v.defaultValue;
    },
    configurable: true,
    enumerable: true
  },
  readOnly: {
    get: function () {
      return v.readOnly;
    },
    configurable: true,
    enumerable: true
  },
  name: {
    get: function () {
      return v.name;
    },
    configurable: true,
    enumerable: true
  },
  validationError: {
    get: function () {
      return v.validationError;
    },
    configurable: true,
    enumerable: true
  },
  validationErrors: {
    get: function () {
      return v.validationErrors;
    },
    configurable: true,
    enumerable: true
  },
  validationMessageMode: {
    get: function () {
      return v.validationMessageMode;
    },
    configurable: true,
    enumerable: true
  },
  validationMessagePosition: {
    get: function () {
      return v.validationMessagePosition;
    },
    configurable: true,
    enumerable: true
  },
  validationStatus: {
    get: function () {
      return v.validationStatus;
    },
    configurable: true,
    enumerable: true
  },
  isValid: {
    get: function () {
      return v.isValid;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function () {
      return v.inputAttr;
    },
    configurable: true,
    enumerable: true
  },
  className: {
    get: function () {
      return v.className;
    },
    configurable: true,
    enumerable: true
  },
  activeStateEnabled: {
    get: function () {
      return d.EditorStateProps.activeStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  disabled: {
    get: function () {
      return v.disabled;
    },
    configurable: true,
    enumerable: true
  },
  focusStateEnabled: {
    get: function () {
      return d.EditorStateProps.focusStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  hoverStateEnabled: {
    get: function () {
      return d.EditorStateProps.hoverStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  tabIndex: {
    get: function () {
      return v.tabIndex;
    },
    configurable: true,
    enumerable: true
  },
  visible: {
    get: function () {
      return v.visible;
    },
    configurable: true,
    enumerable: true
  },
  label: {
    get: function () {
      return c.EditorLabelProps.label;
    },
    configurable: true,
    enumerable: true
  },
  labelMode: {
    get: function () {
      return c.EditorLabelProps.labelMode;
    },
    configurable: true,
    enumerable: true
  }
});
exports.NumberBoxPropsType = y;
var b = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  function r(t) {
    var n;
    (n = e.call(this, t) || this).state = {
      value: n.props.value !== undefined ? n.props.value : n.props.defaultValue
    };
    return n;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return _({
      props: m({}, e, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "componentProps",
    get: function () {
      return m({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      });
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = m({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      });
      e.accessKey;
      e.activeStateEnabled;
      e.className;
      e.defaultValue;
      e.disabled;
      e.focusStateEnabled;
      e.height;
      e.hint;
      e.hoverStateEnabled;
      e.inputAttr;
      e.invalidValueMessage;
      e.isValid;
      e.label;
      e.labelMode;
      e.max;
      e.min;
      e.mode;
      e.name;
      e.onClick;
      e.onFocusIn;
      e.onKeyDown;
      e.readOnly;
      e.rtlEnabled;
      e.showSpinButtons;
      e.step;
      e.tabIndex;
      e.useLargeSpinButtons;
      e.validationError;
      e.validationErrors;
      e.validationMessageMode;
      e.validationMessagePosition;
      e.validationStatus;
      e.value;
      e.valueChange;
      e.visible;
      e.width;
      return f(e, h);
    }
  }]) {
    p(i.prototype, o);
  }
  if (a) {
    p(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(r.BaseInfernoComponent);
exports.NumberBox = b;
b.defaultProps = y;