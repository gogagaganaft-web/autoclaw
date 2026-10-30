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
exports.viewFunction = exports.GroupPanelProps = exports.GroupPanel = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./97205.js");
var s = require("./18266.js");
var l = require("./37598.js");
var u = require("./26419.js");
var d = require("./4799.js");
var c = ["className", "elementRef", "groupByDate", "groupOrientation", "groupPanelData", "groups", "height", "resourceCellTemplate"];
function h(e, t) {
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
function f(e, t) {
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
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
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
function m(e) {
  var t = e.isVerticalLayout;
  var n = e.props;
  var i = n.className;
  var a = n.elementRef;
  var r = n.groupPanelData;
  var s = n.height;
  var d = n.resourceCellTemplate;
  var c = e.restAttributes;
  if (t) {
    return (0, o.createComponentVNode)(2, l.GroupPanelVerticalLayout, {
      height: s,
      resourceCellTemplate: d,
      className: i,
      groupPanelData: r,
      elementRef: a,
      styles: c.style
    });
  } else {
    return (0, o.createComponentVNode)(2, u.GroupPanelHorizontalLayout, {
      height: s,
      resourceCellTemplate: d,
      className: i,
      groupPanelData: r,
      elementRef: a,
      styles: c.style
    });
  }
}
exports.viewFunction = m;
var _ = Object.create(Object.prototype, g(Object.getOwnPropertyDescriptors(s.GroupPanelBaseProps), Object.getOwnPropertyDescriptors({
  groups: Object.freeze([]),
  groupOrientation: d.VERTICAL_GROUP_ORIENTATION
})));
exports.GroupPanelProps = _;
var v = function (e) {
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
  p(t, n);
  var s;
  var l;
  var u;
  var d = i.prototype;
  d.createEffects = function () {
    return [(0, a.createReRenderEffect)()];
  };
  d.render = function () {
    var e;
    var t = this.props;
    return m({
      props: g({}, t, {
        resourceCellTemplate: (e = t.resourceCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, g({}, t)));
        } : e))
      }),
      isVerticalLayout: this.isVerticalLayout,
      restAttributes: this.restAttributes
    });
  };
  s = i;
  if (l = [{
    key: "isVerticalLayout",
    get: function () {
      var e = this.props;
      var t = e.groupOrientation;
      var n = e.groups;
      return (0, r.isVerticalGroupingApplied)(n, t);
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.className;
      e.elementRef;
      e.groupByDate;
      e.groupOrientation;
      e.groupPanelData;
      e.groups;
      e.height;
      e.resourceCellTemplate;
      return h(e, c);
    }
  }]) {
    f(s.prototype, l);
  }
  if (u) {
    f(s, u);
  }
  Object.defineProperty(s, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.GroupPanel = v;
v.defaultProps = _;