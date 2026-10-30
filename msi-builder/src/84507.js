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
exports.viewFunction = exports.InkRippleProps = exports.InkRipple = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./72672.js");
var s = ["config"];
function l(e, t) {
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
function u(e, t) {
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
function d(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function h() {
  return (h = Object.assign ? Object.assign.bind() : function (e) {
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
function f(e) {
  return (0, o.normalizeProps)((0, o.createVNode)(1, "div", "dx-inkripple", null, 1, h({}, e.restAttributes)));
}
exports.viewFunction = f;
var p = {
  config: Object.freeze({})
};
exports.InkRippleProps = p;
var g = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.__getterCache = {};
    n.hideWave = n.hideWave.bind(d(n));
    n.showWave = n.showWave.bind(d(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  var o;
  var a;
  var p;
  var g = i.prototype;
  g.hideWave = function (e) {
    (0, r.hideWave)(this.getConfig, e);
  };
  g.showWave = function (e) {
    (0, r.showWave)(this.getConfig, e);
  };
  g.componentWillUpdate = function (e, t, n) {
    if (this.props.config !== e.config) {
      this.__getterCache.getConfig = undefined;
    }
  };
  g.render = function () {
    var e = this.props;
    return f({
      props: h({}, e),
      getConfig: this.getConfig,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "getConfig",
    get: function () {
      var e;
      var t = this;
      if (this.__getterCache.getConfig !== undefined) {
        return this.__getterCache.getConfig;
      } else {
        return this.__getterCache.getConfig = (e = t.props.config, (0, r.initConfig)(e));
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.config;
      return l(e, s);
    }
  }]) {
    u(o.prototype, a);
  }
  if (p) {
    u(o, p);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.InkRipple = g;
g.defaultProps = p;