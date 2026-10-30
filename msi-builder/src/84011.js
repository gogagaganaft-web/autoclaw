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
exports.viewFunction = exports.HeaderPanelLayoutProps = exports.HeaderPanelLayout = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./97205.js");
var s = require("./80954.js");
var l = require("./35878.js");
var u = ["className", "dateCellTemplate", "dateHeaderData", "dateHeaderTemplate", "elementRef", "groupByDate", "groupOrientation", "groupPanelData", "groups", "height", "isRenderDateHeader", "resourceCellTemplate", "timeCellTemplate"];
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
  var t = e.isHorizontalGrouping;
  var n = e.props;
  var i = n.dateCellTemplate;
  var a = n.dateHeaderData;
  var r = n.dateHeaderTemplate;
  var l = n.groupByDate;
  var u = n.groupOrientation;
  var d = n.groupPanelData;
  var c = n.groups;
  var h = n.isRenderDateHeader;
  var f = n.resourceCellTemplate;
  var p = n.timeCellTemplate;
  return (0, o.createVNode)(1, "thead", null, [t && !l && (0, o.createComponentVNode)(2, s.GroupPanel, {
    groupPanelData: d,
    groups: c,
    groupByDate: l,
    groupOrientation: u,
    resourceCellTemplate: f
  }), h && r({
    groupByDate: l,
    dateHeaderData: a,
    groupOrientation: u,
    groups: c,
    dateCellTemplate: i,
    timeCellTemplate: p
  }), l && (0, o.createComponentVNode)(2, s.GroupPanel, {
    groupPanelData: d,
    groups: c,
    groupByDate: l,
    groupOrientation: u,
    resourceCellTemplate: f
  })], 0);
}
exports.viewFunction = p;
var g = Object.create(Object.prototype, f(Object.getOwnPropertyDescriptors(s.GroupPanelProps), Object.getOwnPropertyDescriptors({
  isRenderDateHeader: true,
  dateHeaderTemplate: l.DateHeaderLayout
})));
exports.HeaderPanelLayoutProps = g;
function m(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, f({}, t)));
  } : e);
}
var _ = function (e) {
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
  h(t, n);
  var o;
  var s;
  var l;
  var g = i.prototype;
  g.createEffects = function () {
    return [(0, a.createReRenderEffect)()];
  };
  g.render = function () {
    var e = this.props;
    return p({
      props: f({}, e, {
        dateCellTemplate: m(e.dateCellTemplate),
        timeCellTemplate: m(e.timeCellTemplate),
        dateHeaderTemplate: m(e.dateHeaderTemplate),
        resourceCellTemplate: m(e.resourceCellTemplate)
      }),
      isHorizontalGrouping: this.isHorizontalGrouping,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (s = [{
    key: "isHorizontalGrouping",
    get: function () {
      var e = this.props;
      var t = e.groupOrientation;
      var n = e.groups;
      return (0, r.isHorizontalGroupingApplied)(n, t);
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.className;
      e.dateCellTemplate;
      e.dateHeaderData;
      e.dateHeaderTemplate;
      e.elementRef;
      e.groupByDate;
      e.groupOrientation;
      e.groupPanelData;
      e.groups;
      e.height;
      e.isRenderDateHeader;
      e.resourceCellTemplate;
      e.timeCellTemplate;
      return d(e, u);
    }
  }]) {
    c(o.prototype, s);
  }
  if (l) {
    c(o, l);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.HeaderPanelLayout = _;
_.defaultProps = g;