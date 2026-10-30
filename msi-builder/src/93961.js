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
exports.viewFunction = exports.LightButtonProps = exports.LightButton = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./19828.js");
var s = require("./44133.js");
var l = ["children", "className", "label", "onClick", "selected", "tabIndex"];
function u(e, t) {
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
function d() {
  return (d = Object.assign ? Object.assign.bind() : function (e) {
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
function c(e, t) {
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
function h(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function p(e) {
  var t = e.props;
  var n = t.children;
  var i = t.className;
  var a = t.label;
  var r = t.selected;
  var s = t.tabIndex;
  var l = e.widgetRef;
  return (0, o.createVNode)(1, "div", i, n, 0, {
    tabIndex: s,
    role: "button",
    "aria-label": a,
    "aria-current": r ? "page" : undefined
  }, null, l);
}
exports.viewFunction = p;
var g = {
  className: "",
  label: "",
  tabIndex: 0,
  selected: false
};
exports.LightButtonProps = g;
var m = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.widgetRef = (0, o.createRef)();
    n.keyboardEffect = n.keyboardEffect.bind(h(n));
    n.subscribeToClick = n.subscribeToClick.bind(h(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var g;
  var m;
  var _;
  var v = i.prototype;
  v.createEffects = function () {
    return [new a.InfernoEffect(this.keyboardEffect, [this.keyboardContext, this.props.onClick]), new a.InfernoEffect(this.subscribeToClick, [this.props.onClick])];
  };
  v.updateEffects = function () {
    var e;
    var t;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.keyboardContext, this.props.onClick]);
    }
    if ((t = this._effects[1]) !== null && t !== undefined) {
      t.update([this.props.onClick]);
    }
  };
  v.keyboardEffect = function () {
    return this.keyboardContext.registerKeyboardAction(this.widgetRef.current, this.props.onClick);
  };
  v.subscribeToClick = function () {
    return (0, r.subscribeToClickEvent)(this.widgetRef.current, this.props.onClick);
  };
  v.render = function () {
    var e = this.props;
    return p({
      props: d({}, e),
      widgetRef: this.widgetRef,
      keyboardContext: this.keyboardContext,
      restAttributes: this.restAttributes
    });
  };
  g = i;
  if (m = [{
    key: "keyboardContext",
    get: function () {
      if (this.context[s.KeyboardActionContext.id]) {
        return this.context[s.KeyboardActionContext.id];
      } else {
        return s.KeyboardActionContext.defaultValue;
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.children;
      e.className;
      e.label;
      e.onClick;
      e.selected;
      e.tabIndex;
      return u(e, l);
    }
  }]) {
    c(g.prototype, m);
  }
  if (_) {
    c(g, _);
  }
  Object.defineProperty(g, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoComponent);
exports.LightButton = m;
m.defaultProps = g;