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
exports.viewFunction = exports.ValidationMessageProps = exports.ValidationMessage = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = (o = require("./8336.js")) && o.__esModule ? o : {
  default: o
};
var l = require("./96886.js");
var u = require("./31651.js");
var d = ["accessKey", "activeStateEnabled", "boundary", "className", "contentId", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "mode", "offset", "onClick", "onKeyDown", "positionSide", "rtlEnabled", "tabIndex", "target", "validationErrors", "visible", "visualContainer", "width"];
function c(e, t) {
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
function h(e, t) {
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
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
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
function g(e) {
  var t = e.componentProps;
  var n = e.restAttributes;
  return (0, a.normalizeProps)((0, a.createComponentVNode)(2, l.DomComponentWrapper, p({
    componentType: s.default,
    componentProps: t,
    templateNames: []
  }, n)));
}
exports.viewFunction = g;
var m = Object.create(Object.prototype, p(Object.getOwnPropertyDescriptors(u.BaseWidgetProps), Object.getOwnPropertyDescriptors({
  mode: "auto",
  positionSide: "top",
  offset: Object.freeze({
    h: 0,
    v: 0
  }),
  isReactComponentWrapper: true
})));
exports.ValidationMessageProps = m;
var _ = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  function r(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return g({
      props: p({}, e),
      componentProps: this.componentProps,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "componentProps",
    get: function () {
      return this.props;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.accessKey;
      e.activeStateEnabled;
      e.boundary;
      e.className;
      e.contentId;
      e.disabled;
      e.focusStateEnabled;
      e.height;
      e.hint;
      e.hoverStateEnabled;
      e.mode;
      e.offset;
      e.onClick;
      e.onKeyDown;
      e.positionSide;
      e.rtlEnabled;
      e.tabIndex;
      e.target;
      e.validationErrors;
      e.visible;
      e.visualContainer;
      e.width;
      return c(e, d);
    }
  }]) {
    h(i.prototype, o);
  }
  if (a) {
    h(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(r.BaseInfernoComponent);
exports.ValidationMessage = _;
_.defaultProps = m;