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
exports.viewFunction = exports.ConfigProviderProps = exports.ConfigProvider = undefined;
var o = require("./44105.js");
var a = require("./49697.js");
var r = ["children", "rtlEnabled"];
function s(e, t) {
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
function l() {
  return (l = Object.assign ? Object.assign.bind() : function (e) {
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
function u(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, d(i.key), i);
  }
}
function d(e) {
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
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function h(e) {
  return e.props.children;
}
exports.viewFunction = h;
var f = {};
exports.ConfigProviderProps = f;
var p = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.__getterCache = {};
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  var o;
  var f;
  var p;
  var g = i.prototype;
  g.getChildContext = function () {
    return l({}, this.context, (e = {}, t = a.ConfigContext.id, n = this.config || a.ConfigContext.defaultValue, (t = d(t)) in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[t] = n, e));
    var e;
    var t;
    var n;
  };
  g.componentWillUpdate = function (e, t, n) {
    if (this.props.rtlEnabled !== e.rtlEnabled) {
      this.__getterCache.config = undefined;
    }
  };
  g.render = function () {
    var e = this.props;
    return h({
      props: l({}, e),
      config: this.config,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (f = [{
    key: "config",
    get: function () {
      var e = this;
      if (this.__getterCache.config !== undefined) {
        return this.__getterCache.config;
      } else {
        return this.__getterCache.config = {
          rtlEnabled: e.props.rtlEnabled
        };
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.children;
      e.rtlEnabled;
      return s(e, r);
    }
  }]) {
    u(o.prototype, f);
  }
  if (p) {
    u(o, p);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(o.BaseInfernoComponent);
exports.ConfigProvider = p;
p.defaultProps = f;