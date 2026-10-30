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
exports.viewFunction = exports.HorizontalGroupPanelLayoutProps = exports.GroupPanelHorizontalLayout = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./61991.js");
var s = require("./46833.js");
var l = ["className", "elementRef", "groupByDate", "groupPanelData", "height", "resourceCellTemplate", "styles"];
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
function d(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return c(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return c(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return c(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function c(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function h(e, t) {
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
  var t = e.groupPanelItems;
  var n = e.props.resourceCellTemplate;
  return (0, o.createFragment)(t.map(function (e) {
    return (0, o.createComponentVNode)(2, r.Row, {
      groupItems: e,
      cellTemplate: n
    }, e[0].key);
  }), 0);
}
exports.viewFunction = g;
var m = s.GroupPanelLayoutProps;
exports.HorizontalGroupPanelLayoutProps = m;
var _ = function (e) {
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
  f(t, n);
  var a;
  var r;
  var s;
  var c = i.prototype;
  c.componentWillUpdate = function (e, t, n) {
    if (this.props.groupPanelData !== e.groupPanelData) {
      this.__getterCache.groupPanelItems = undefined;
    }
  };
  c.render = function () {
    var e;
    var t = this.props;
    return g({
      props: p({}, t, {
        resourceCellTemplate: (e = t.resourceCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, p({}, t)));
        } : e))
      }),
      groupPanelItems: this.groupPanelItems,
      restAttributes: this.restAttributes
    });
  };
  a = i;
  if (r = [{
    key: "groupPanelItems",
    get: function () {
      var e;
      var t;
      var n;
      var i;
      var o = this;
      if (this.__getterCache.groupPanelItems !== undefined) {
        return this.__getterCache.groupPanelItems;
      } else {
        return this.__getterCache.groupPanelItems = (e = o.props.groupPanelData, t = e.baseColSpan, n = e.groupPanelItems, i = n.reduceRight(function (e, i, o) {
          var a = e;
          var r = i.length;
          var s = o === n.length - 1 ? t : e[o + 1];
          var l = (o === n.length - 1 ? r : n[o + 1].length) / r;
          a[o] = l * s;
          return a;
        }, d(new Array(n.length))), n.map(function (e, t) {
          var n = i[t];
          return e.map(function (e) {
            return p({}, e, {
              colSpan: n
            });
          });
        }));
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.className;
      e.elementRef;
      e.groupByDate;
      e.groupPanelData;
      e.height;
      e.resourceCellTemplate;
      e.styles;
      return u(e, l);
    }
  }]) {
    h(a.prototype, r);
  }
  if (s) {
    h(a, s);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.GroupPanelHorizontalLayout = _;
_.defaultProps = m;