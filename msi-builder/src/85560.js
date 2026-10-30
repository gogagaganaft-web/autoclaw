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
exports.CheckBoxPropsType = exports.CheckBoxProps = exports.CheckBox = undefined;
exports.defaultOptions = function (e) {
  C.push(e);
  w.defaultProps = Object.create(Object.prototype, v(Object.getOwnPropertyDescriptors(w.defaultProps), Object.getOwnPropertyDescriptors((t = (0, h.convertRulesToOptions)(C), n = ["value"], Object.keys(t).reduce(function (e, i) {
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
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = (o = require("./20530.js")) && o.__esModule ? o : {
  default: o
};
var l = require("./77848.js");
var u = require("./86237.js");
var d = require("./13241.js");
var c = require("./73687.js");
var h = require("./45434.js");
var f = ["accessKey", "activeStateEnabled", "aria", "className", "defaultValue", "disabled", "enableThreeStateBehavior", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "iconSize", "inputAttr", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];
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
function g(e, t) {
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
function m(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function v() {
  return (v = Object.assign ? Object.assign.bind() : function (e) {
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
function y(e) {
  var t = e.aria;
  var n = e.cssClasses;
  var i = e.editorRef;
  var o = e.keyDown;
  var r = e.onWidgetClick;
  var s = e.props;
  var u = s.accessKey;
  var c = s.activeStateEnabled;
  var h = s.className;
  var f = s.disabled;
  var p = s.focusStateEnabled;
  var g = s.height;
  var m = s.hint;
  var _ = s.hoverStateEnabled;
  var y = s.iconSize;
  var b = s.isValid;
  var x = s.name;
  var w = s.onFocusIn;
  var C = s.readOnly;
  var S = s.rtlEnabled;
  var k = s.tabIndex;
  var D = s.text;
  var I = s.validationError;
  var T = s.validationErrors;
  var E = s.validationMessageMode;
  var O = s.validationMessagePosition;
  var A = s.validationStatus;
  var P = s.value;
  var M = s.visible;
  var R = s.width;
  var B = e.restAttributes;
  return (0, a.normalizeProps)((0, a.createComponentVNode)(2, l.Editor, v({
    aria: t,
    classes: n,
    onClick: r,
    onKeyDown: o,
    accessKey: u,
    activeStateEnabled: c,
    focusStateEnabled: p,
    hoverStateEnabled: _,
    className: h,
    disabled: f,
    readOnly: C,
    hint: m,
    height: g,
    width: R,
    rtlEnabled: S,
    tabIndex: k,
    visible: M,
    validationError: I,
    validationErrors: T,
    validationMessageMode: E,
    validationMessagePosition: O,
    validationStatus: A,
    isValid: b,
    onFocusIn: w
  }, B, {
    children: (0, a.createFragment)([(0, a.normalizeProps)((0, a.createVNode)(64, "input", null, null, 1, v({
      type: "hidden",
      value: `${P}`
    }, x && {
      name: x
    }))), (0, a.createVNode)(1, "div", "dx-checkbox-container", [(0, a.createComponentVNode)(2, d.CheckBoxIcon, {
      size: y,
      isChecked: P === true
    }), D && (0, a.createVNode)(1, "span", "dx-checkbox-text", D, 0)], 0)], 4)
  }), null, i));
}
exports.viewFunction = y;
var b = Object.create(Object.prototype, v(Object.getOwnPropertyDescriptors(l.EditorProps), Object.getOwnPropertyDescriptors(Object.defineProperties({
  text: "",
  enableThreeStateBehavior: false,
  activeStateEnabled: true,
  hoverStateEnabled: true,
  defaultValue: false,
  valueChange: function () {}
}, {
  focusStateEnabled: {
    get: function () {
      return s.default.real().deviceType === "desktop" && !s.default.isSimulator();
    },
    configurable: true,
    enumerable: true
  }
}))));
exports.CheckBoxProps = b;
var x = Object.defineProperties({}, {
  text: {
    get: function () {
      return b.text;
    },
    configurable: true,
    enumerable: true
  },
  enableThreeStateBehavior: {
    get: function () {
      return b.enableThreeStateBehavior;
    },
    configurable: true,
    enumerable: true
  },
  activeStateEnabled: {
    get: function () {
      return b.activeStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  hoverStateEnabled: {
    get: function () {
      return b.hoverStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  focusStateEnabled: {
    get: function () {
      return b.focusStateEnabled;
    },
    configurable: true,
    enumerable: true
  },
  defaultValue: {
    get: function () {
      return b.defaultValue;
    },
    configurable: true,
    enumerable: true
  },
  valueChange: {
    get: function () {
      return b.valueChange;
    },
    configurable: true,
    enumerable: true
  },
  readOnly: {
    get: function () {
      return b.readOnly;
    },
    configurable: true,
    enumerable: true
  },
  name: {
    get: function () {
      return b.name;
    },
    configurable: true,
    enumerable: true
  },
  validationError: {
    get: function () {
      return b.validationError;
    },
    configurable: true,
    enumerable: true
  },
  validationErrors: {
    get: function () {
      return b.validationErrors;
    },
    configurable: true,
    enumerable: true
  },
  validationMessageMode: {
    get: function () {
      return b.validationMessageMode;
    },
    configurable: true,
    enumerable: true
  },
  validationMessagePosition: {
    get: function () {
      return b.validationMessagePosition;
    },
    configurable: true,
    enumerable: true
  },
  validationStatus: {
    get: function () {
      return b.validationStatus;
    },
    configurable: true,
    enumerable: true
  },
  isValid: {
    get: function () {
      return b.isValid;
    },
    configurable: true,
    enumerable: true
  },
  inputAttr: {
    get: function () {
      return b.inputAttr;
    },
    configurable: true,
    enumerable: true
  },
  className: {
    get: function () {
      return b.className;
    },
    configurable: true,
    enumerable: true
  },
  disabled: {
    get: function () {
      return b.disabled;
    },
    configurable: true,
    enumerable: true
  },
  tabIndex: {
    get: function () {
      return b.tabIndex;
    },
    configurable: true,
    enumerable: true
  },
  visible: {
    get: function () {
      return b.visible;
    },
    configurable: true,
    enumerable: true
  },
  aria: {
    get: function () {
      return c.WidgetProps.aria;
    },
    configurable: true,
    enumerable: true
  }
});
exports.CheckBoxPropsType = x;
var w = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).editorRef = (0, a.createRef)();
    n.state = {
      value: n.props.value !== undefined ? n.props.value : n.props.defaultValue
    };
    n.focus = n.focus.bind(m(n));
    n.blur = n.blur.bind(m(n));
    n.onWidgetClick = n.onWidgetClick.bind(m(n));
    n.keyDown = n.keyDown.bind(m(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  _(t, n);
  var o;
  var s;
  var l;
  var d = i.prototype;
  d.createEffects = function () {
    return [(0, r.createReRenderEffect)()];
  };
  d.onWidgetClick = function (e) {
    var t;
    var n;
    var i = this;
    var o = this.props;
    var a = o.enableThreeStateBehavior;
    var r = o.readOnly;
    var s = o.saveValueChangeEvent;
    if (!r) {
      if (s != null) {
        s(e);
      }
      if (a) {
        this.setState(function (e) {
          return {
            value: t = (i.props.value !== undefined ? i.props.value : e.value) === null || !(i.props.value !== undefined ? i.props.value : e.value) && null
          };
        });
        this.props.valueChange(t);
      } else {
        this.setState(function (e) {
          var t;
          return {
            value: n = (t = i.props.value !== undefined ? i.props.value : e.value) === null || t === undefined || !t
          };
        });
        this.props.valueChange(n);
      }
    }
  };
  d.keyDown = function (e) {
    var t = this.props.onKeyDown;
    var n = e.keyName;
    var i = e.originalEvent;
    var o = e.which;
    var a = t == null ? undefined : t(e);
    if (a != null && a.cancel) {
      return a;
    }
    if (n === "space" || o === "space") {
      i.preventDefault();
      this.onWidgetClick(i);
    }
  };
  d.focus = function () {
    this.editorRef.current.focus();
  };
  d.blur = function () {
    this.editorRef.current.blur();
  };
  d.render = function () {
    var e = this.props;
    return y({
      props: v({}, e, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      editorRef: this.editorRef,
      onWidgetClick: this.onWidgetClick,
      keyDown: this.keyDown,
      cssClasses: this.cssClasses,
      aria: this.aria,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (s = [{
    key: "cssClasses",
    get: function () {
      e = v({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      });
      t = e.text;
      n = e.value;
      i = {
        "dx-checkbox": true,
        "dx-checkbox-checked": n === true,
        "dx-checkbox-has-text": !!t,
        "dx-checkbox-indeterminate": n === null
      };
      return (0, u.combineClasses)(i);
      var e;
      var t;
      var n;
      var i;
    }
  }, {
    key: "aria",
    get: function () {
      var e = (this.props.value !== undefined ? this.props.value : this.state.value) === true;
      return v({}, {
        role: "checkbox",
        checked: (this.props.value !== undefined ? this.props.value : this.state.value) === null ? "mixed" : `${e}`
      }, this.props.aria);
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = v({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      });
      e.accessKey;
      e.activeStateEnabled;
      e.aria;
      e.className;
      e.defaultValue;
      e.disabled;
      e.enableThreeStateBehavior;
      e.focusStateEnabled;
      e.height;
      e.hint;
      e.hoverStateEnabled;
      e.iconSize;
      e.inputAttr;
      e.isValid;
      e.name;
      e.onClick;
      e.onFocusIn;
      e.onKeyDown;
      e.readOnly;
      e.rtlEnabled;
      e.saveValueChangeEvent;
      e.tabIndex;
      e.text;
      e.validationError;
      e.validationErrors;
      e.validationMessageMode;
      e.validationMessagePosition;
      e.validationStatus;
      e.value;
      e.valueChange;
      e.visible;
      e.width;
      return p(e, f);
    }
  }]) {
    g(o.prototype, s);
  }
  if (l) {
    g(o, l);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.InfernoWrapperComponent);
exports.CheckBox = w;
w.defaultProps = x;
var C = [];