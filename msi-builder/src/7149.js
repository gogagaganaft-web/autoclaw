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
exports.viewFunction = exports.AllDayPanelTitleProps = exports.AllDayPanelTitle = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
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
  return (0, a.createVNode)(1, "div", "dx-scheduler-all-day-title", e.text, 0);
}
exports.viewFunction = c;
var h = {};
exports.AllDayPanelTitleProps = h;
var f = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
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
  f.createEffects = function () {
    return [(0, r.createReRenderEffect)()];
  };
  f.render = function () {
    var e = this.props;
    return c({
      props: l({}, e),
      text: this.text,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "text",
    get: function () {
      return s.default.format("dxScheduler-allDay");
    }
  }, {
    key: "restAttributes",
    get: function () {
      return l({}, (function (e) {
        if (e == null) {
          throw new TypeError("Cannot destructure " + e);
        }
      }(this.props), this.props));
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
}(r.InfernoWrapperComponent);
exports.AllDayPanelTitle = f;
f.defaultProps = h;