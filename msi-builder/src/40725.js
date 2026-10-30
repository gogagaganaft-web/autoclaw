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
exports.viewFunction = exports.GroupPanelHorizontalCellProps = exports.GroupPanelHorizontalCell = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./86237.js");
var s = require("./85869.js");
var l = ["cellTemplate", "className", "colSpan", "color", "data", "id", "index", "isFirstGroupCell", "isLastGroupCell", "text"];
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
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, c(i.key), i);
  }
}
function c(e) {
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
  var t = e.classes;
  var n = e.props;
  var i = n.cellTemplate;
  var a = n.colSpan;
  var r = n.color;
  var s = n.data;
  var l = n.id;
  var u = n.index;
  var d = n.text;
  return (0, o.createVNode)(1, "th", t, (0, o.createVNode)(1, "div", "dx-scheduler-group-header-content", [!!i && i({
    data: {
      data: s,
      id: l,
      color: r,
      text: d
    },
    index: u
  }), !i && (0, o.createVNode)(1, "div", null, d, 0)], 0), 2, {
    colSpan: a
  });
}
exports.viewFunction = p;
var g = Object.create(Object.prototype, f(Object.getOwnPropertyDescriptors(s.GroupPanelCellProps), Object.getOwnPropertyDescriptors({
  isFirstGroupCell: false,
  isLastGroupCell: false,
  colSpan: 1
})));
exports.GroupPanelHorizontalCellProps = g;
var m = function (e) {
  var t;
  var n;
  var i;
  var a;
  var s;
  function g(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = g).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  g.prototype.render = function () {
    var e;
    var t = this.props;
    return p({
      props: f({}, t, {
        cellTemplate: (e = t.cellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, f({}, t)));
        } : e))
      }),
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };
  i = g;
  if (a = [{
    key: "classes",
    get: function () {
      var e;
      var t;
      var n;
      var i = this.props;
      var o = i.className;
      var a = i.isFirstGroupCell;
      var s = i.isLastGroupCell;
      return (0, r.combineClasses)((e = {
        "dx-scheduler-group-header": true,
        "dx-scheduler-first-group-cell": a,
        "dx-scheduler-last-group-cell": s
      }, n = !!o, (t = c(t = o)) in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[t] = n, e));
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.cellTemplate;
      e.className;
      e.colSpan;
      e.color;
      e.data;
      e.id;
      e.index;
      e.isFirstGroupCell;
      e.isLastGroupCell;
      e.text;
      return u(e, l);
    }
  }]) {
    d(i.prototype, a);
  }
  if (s) {
    d(i, s);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return g;
}(a.BaseInfernoComponent);
exports.GroupPanelHorizontalCell = m;
m.defaultProps = g;