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
exports.viewFunction = exports.DomComponentWrapperProps = exports.DomComponentWrapper = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./49697.js");
var s = require("./28240.js");
var l = ["valueChange"];
var u = ["componentProps", "componentType", "templateNames"];
function d(e, t) {
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
  return Object.keys(e).reduce(function (t, n) {
    if (e[n] !== undefined) {
      t[n] = e[n];
    }
    return t;
  }, {});
}
function m(e) {
  var t = e.props.componentProps.className;
  var n = e.restAttributes;
  var i = e.widgetRef;
  return g((0, o.createVNode)(1, "div", t, null, 1, p({}, n), null, i));
}
exports.viewFunction = m;
var _ = {};
exports.DomComponentWrapperProps = _;
var v = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.widgetRef = (0, o.createRef)();
    n.getInstance = n.getInstance.bind(h(n));
    n.setupWidget = n.setupWidget.bind(h(n));
    n.updateWidget = n.updateWidget.bind(h(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var _;
  var v;
  var y;
  var b = i.prototype;
  b.createEffects = function () {
    return [new a.InfernoEffect(this.setupWidget, []), new a.InfernoEffect(this.updateWidget, [this.props.componentProps, this.config, this.props.templateNames])];
  };
  b.updateEffects = function () {
    var e;
    if ((e = this._effects[1]) !== null && e !== undefined) {
      e.update([this.props.componentProps, this.config, this.props.templateNames]);
    }
  };
  b.setupWidget = function () {
    var e = this;
    var t = new this.props.componentType(this.widgetRef.current, this.properties);
    this.instance = t;
    return function () {
      t.dispose();
      e.instance = null;
    };
  };
  b.updateWidget = function () {
    var e = this.getInstance();
    if (e) {
      var t = (0, s.getUpdatedOptions)(this.prevProps || {}, this.properties);
      if (t.length) {
        e.beginUpdate();
        t.forEach(function (t) {
          var n = t.path;
          var i = t.value;
          e.option(n, i);
        });
        e.endUpdate();
      }
      this.prevProps = this.properties;
    }
  };
  b.getInstance = function () {
    return this.instance;
  };
  b.render = function () {
    var e = this.props;
    return m({
      props: p({}, e),
      widgetRef: this.widgetRef,
      config: this.config,
      properties: this.properties,
      restAttributes: this.restAttributes
    });
  };
  _ = i;
  if (v = [{
    key: "config",
    get: function () {
      if (this.context[r.ConfigContext.id]) {
        return this.context[r.ConfigContext.id];
      } else {
        return r.ConfigContext.defaultValue;
      }
    }
  }, {
    key: "properties",
    get: function () {
      var e;
      var t = this;
      var n = g(this.props.componentProps);
      var i = n.valueChange;
      var o = d(n, l);
      var r = p({
        rtlEnabled: (e = this.config) !== null && e !== undefined && !!e.rtlEnabled,
        isRenovated: true
      }, o);
      if (i) {
        r.onValueChanged = function (e) {
          var t = e.value;
          return i(t);
        };
      }
      this.props.templateNames.forEach(function (e) {
        if ((0, a.hasTemplate)(e, r, t)) {
          r[e] = function (n, i, o) {
            (0, a.renderTemplate)(t.props.componentProps[e], {
              item: n,
              index: i,
              container: o
            }, t);
          };
        }
      });
      return r;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.componentProps;
      e.componentType;
      e.templateNames;
      return d(e, u);
    }
  }]) {
    c(_.prototype, v);
  }
  if (y) {
    c(_, y);
  }
  Object.defineProperty(_, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoComponent);
exports.DomComponentWrapper = v;
v.defaultProps = _;