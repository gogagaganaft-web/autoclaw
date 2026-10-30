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
exports.viewFunction = exports.IconProps = exports.Icon = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./44899.js");
var s = require("./86237.js");
var l = ["iconTemplate", "position", "source"];
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
function d(e, t, n) {
  if ((t = h(t)) in e) {
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
function c(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, h(i.key), i);
  }
}
function h(e) {
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
  var t = e.iconClassName;
  var n = e.props;
  var i = n.iconTemplate;
  var a = n.source;
  var r = e.sourceType;
  return (0, o.createFragment)([r === "dxIcon" && (0, o.createVNode)(1, "i", t), r === "fontIcon" && (0, o.createVNode)(1, "i", t), r === "image" && (0, o.createVNode)(1, "img", t, null, 1, {
    alt: "",
    src: a
  }), i && (0, o.createVNode)(1, "i", t, i({}), 0)], 0);
}
exports.viewFunction = g;
var m = {
  position: "left",
  source: ""
};
exports.IconProps = m;
var _ = function (e) {
  var t;
  var n;
  var i;
  var a;
  var h;
  function m(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = m).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  m.prototype.render = function () {
    var e;
    var t = this.props;
    return g({
      props: p({}, t, {
        iconTemplate: (e = t.iconTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, p({}, t)));
        } : e))
      }),
      sourceType: this.sourceType,
      cssClass: this.cssClass,
      iconClassName: this.iconClassName,
      restAttributes: this.restAttributes
    });
  };
  i = m;
  if (a = [{
    key: "sourceType",
    get: function () {
      return (0, r.getImageSourceType)(this.props.source);
    }
  }, {
    key: "cssClass",
    get: function () {
      if (this.props.position !== "left") {
        return "dx-icon-right";
      } else {
        return "";
      }
    }
  }, {
    key: "iconClassName",
    get: function () {
      var e = d({
        "dx-icon": true
      }, this.cssClass, !!this.cssClass);
      var t = this.props.source;
      if (this.sourceType === "dxIcon") {
        return (0, s.combineClasses)(p({}, e, d({}, `dx-icon-${t}`, true)));
      } else if (this.sourceType === "fontIcon") {
        return (0, s.combineClasses)(p({}, e, d({}, String(t), !!t)));
      } else if (this.sourceType === "image") {
        return (0, s.combineClasses)(e);
      } else if (this.sourceType === "svg") {
        return (0, s.combineClasses)(p({}, e, {
          "dx-svg-icon": true
        }));
      } else {
        return "";
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.iconTemplate;
      e.position;
      e.source;
      return u(e, l);
    }
  }]) {
    c(i.prototype, a);
  }
  if (h) {
    c(i, h);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return m;
}(a.BaseInfernoComponent);
exports.Icon = _;
_.defaultProps = m;