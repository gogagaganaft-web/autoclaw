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
exports.viewFunction = exports.AppointmentTitleProps = exports.AppointmentTitle = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = ["text"];
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
  var t = e.props.text;
  return (0, o.createVNode)(1, "div", "dx-scheduler-appointment-title", t, 0);
}
exports.viewFunction = c;
var h = {
  text: ""
};
exports.AppointmentTitleProps = h;
var f = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  function h(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = h).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  h.prototype.render = function () {
    var e = this.props;
    return c({
      props: l({}, e),
      restAttributes: this.restAttributes
    });
  };
  i = h;
  if (o = [{
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.text;
      return s(e, r);
    }
  }]) {
    u(i.prototype, o);
  }
  if (a) {
    u(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return h;
}(a.BaseInfernoComponent);
exports.AppointmentTitle = f;
f.defaultProps = h;