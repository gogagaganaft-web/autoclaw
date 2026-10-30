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
exports.viewFunction = exports.DateHeaderTextProps = exports.DateHeaderText = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = ["splitText", "text"];
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
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function c(e) {
  var t = e.props;
  var n = t.splitText;
  var i = t.text;
  var a = e.textParts;
  return (0, o.createFragment)(n ? a.map(function (e) {
    return (0, o.createVNode)(1, "span", "dx-scheduler-header-panel-cell-date", e, 0);
  }) : i, 0);
}
exports.viewFunction = c;
var h = {
  text: "",
  splitText: false
};
exports.DateHeaderTextProps = h;
var f = function (e) {
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
  d(t, n);
  var o;
  var a;
  var h;
  var f = i.prototype;
  f.componentWillUpdate = function (e, t, n) {
    if (this.props.text !== e.text) {
      this.__getterCache.textParts = undefined;
    }
  };
  f.render = function () {
    var e = this.props;
    return c({
      props: l({}, e),
      textParts: this.textParts,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "textParts",
    get: function () {
      var e;
      var t = this;
      if (this.__getterCache.textParts !== undefined) {
        return this.__getterCache.textParts;
      } else {
        return this.__getterCache.textParts = (e = t.props.text) ? e.split(" ") : [""];
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.splitText;
      e.text;
      return s(e, r);
    }
  }]) {
    u(o.prototype, a);
  }
  if (h) {
    u(o, h);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.DateHeaderText = f;
f.defaultProps = h;