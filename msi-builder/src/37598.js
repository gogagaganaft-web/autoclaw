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
exports.viewFunction = exports.VerticalGroupPanelLayoutProps = exports.GroupPanelVerticalLayout = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./36415.js");
var s = require("./97205.js");
var l = require("./46833.js");
var u = ["className", "elementRef", "groupByDate", "groupPanelData", "height", "resourceCellTemplate", "styles"];
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
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function f() {
  return (f = Object.assign ? Object.assign.bind() : function (e) {
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
function p(e) {
  var t = e.props;
  var n = t.className;
  var i = t.elementRef;
  var s = t.groupPanelData;
  var l = t.resourceCellTemplate;
  var u = e.style;
  return (0, o.createVNode)(1, "div", n, (0, o.createVNode)(1, "div", "dx-scheduler-group-flex-container", s.groupPanelItems.map(function (e) {
    return (0, o.createComponentVNode)(2, r.Row, {
      groupItems: e,
      cellTemplate: l
    }, e[0].key);
  }), 0), 2, {
    style: (0, a.normalizeStyles)(u)
  }, null, i);
}
exports.viewFunction = p;
var g = l.GroupPanelLayoutProps;
exports.VerticalGroupPanelLayoutProps = g;
var m = function (e) {
  var t;
  var n;
  var i;
  var a;
  var r;
  function l(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = l).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  l.prototype.render = function () {
    var e;
    var t = this.props;
    return p({
      props: f({}, t, {
        resourceCellTemplate: (e = t.resourceCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, f({}, t)));
        } : e))
      }),
      style: this.style,
      restAttributes: this.restAttributes
    });
  };
  i = l;
  if (a = [{
    key: "style",
    get: function () {
      var e = this.props;
      var t = e.height;
      var n = e.styles;
      return (0, s.addHeightToStyle)(t, n);
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
      return d(e, u);
    }
  }]) {
    c(i.prototype, a);
  }
  if (r) {
    c(i, r);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return l;
}(a.BaseInfernoComponent);
exports.GroupPanelVerticalLayout = m;
m.defaultProps = g;