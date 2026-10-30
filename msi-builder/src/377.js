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
exports.viewFunction = exports.TimelineHeaderPanelLayout = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./84011.js");
var s = require("./34300.js");
var l = ["className", "dateCellTemplate", "dateHeaderData", "dateHeaderTemplate", "elementRef", "groupByDate", "groupOrientation", "groupPanelData", "groups", "height", "isRenderDateHeader", "resourceCellTemplate", "timeCellTemplate"];
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
function d(e, t) {
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
function c(e, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function h() {
  return (h = Object.assign ? Object.assign.bind() : function (e) {
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
function f(e) {
  var t = e.props;
  var n = t.dateCellTemplate;
  var i = t.dateHeaderData;
  var a = t.groupByDate;
  var l = t.groupOrientation;
  var u = t.groupPanelData;
  var d = t.groups;
  var c = t.isRenderDateHeader;
  var h = t.resourceCellTemplate;
  var f = t.timeCellTemplate;
  return (0, o.createComponentVNode)(2, r.HeaderPanelLayout, {
    dateHeaderTemplate: s.TimelineDateHeaderLayout,
    dateHeaderData: i,
    groupPanelData: u,
    groupByDate: a,
    groups: d,
    groupOrientation: l,
    isRenderDateHeader: c,
    resourceCellTemplate: h,
    dateCellTemplate: n,
    timeCellTemplate: f
  });
}
exports.viewFunction = f;
function p(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, h({}, t)));
  } : e);
}
var g = function (e) {
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
  c(t, n);
  var o;
  var r;
  var s;
  var g = i.prototype;
  g.createEffects = function () {
    return [(0, a.createReRenderEffect)()];
  };
  g.render = function () {
    var e = this.props;
    return f({
      props: h({}, e, {
        dateCellTemplate: p(e.dateCellTemplate),
        timeCellTemplate: p(e.timeCellTemplate),
        dateHeaderTemplate: p(e.dateHeaderTemplate),
        resourceCellTemplate: p(e.resourceCellTemplate)
      }),
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (r = [{
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
      return u(e, l);
    }
  }]) {
    d(o.prototype, r);
  }
  if (s) {
    d(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.TimelineHeaderPanelLayout = g;
g.defaultProps = r.HeaderPanelLayoutProps;