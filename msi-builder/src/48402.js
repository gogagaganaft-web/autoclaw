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
exports.viewFunction = exports.PageProps = exports.Page = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./93961.js");
var l = require("./39853.js");
var u = require("./86237.js");
var d = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var c = require("./68752.js");
var h = ["className", "index", "onClick", "selected"];
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
function p(e, t, n) {
  if ((t = _(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
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
function m(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, _(i.key), i);
  }
}
function _(e) {
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
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function y(e) {
  var t = e.className;
  var n = e.label;
  var i = e.props;
  var o = i.onClick;
  var r = i.selected;
  var l = e.value;
  return (0, a.createComponentVNode)(2, s.LightButton, {
    className: t,
    label: n,
    onClick: o,
    selected: r,
    children: l
  });
}
exports.viewFunction = y;
var b = {
  index: 0,
  selected: false,
  className: l.PAGER_PAGE_CLASS
};
exports.PageProps = b;
var x = function (e) {
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
  v(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return y({
      props: g({}, e),
      label: this.label,
      value: this.value,
      className: this.className,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "label",
    get: function () {
      return (0, c.format)(d.default.getFormatter("dxPager-page"), this.value);
    }
  }, {
    key: "value",
    get: function () {
      return this.props.index + 1;
    }
  }, {
    key: "className",
    get: function () {
      var e;
      var t = this.props.selected;
      return (0, u.combineClasses)((p(e = {}, `${this.props.className}`, !!this.props.className), p(e, l.PAGER_SELECTION_CLASS, !!t), e));
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.className;
      e.index;
      e.onClick;
      e.selected;
      return f(e, h);
    }
  }]) {
    m(i.prototype, o);
  }
  if (a) {
    m(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(r.BaseInfernoComponent);
exports.Page = x;
x.defaultProps = b;