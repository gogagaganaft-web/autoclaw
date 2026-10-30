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
exports.viewFunction = exports.GroupPanelVerticalCell = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./85869.js");
var s = ["cellTemplate", "className", "color", "data", "id", "index", "text"];
function l(e, t) {
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
function c() {
  return (c = Object.assign ? Object.assign.bind() : function (e) {
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
function h(e) {
  var t = e.props.cellTemplate;
  return (0, o.createVNode)(1, "div", `dx-scheduler-group-header ${e.props.className}`, [!!e.props.cellTemplate && t({
    data: {
      data: e.props.data,
      id: e.props.id,
      color: e.props.color,
      text: e.props.text
    },
    index: e.props.index
  }), !e.props.cellTemplate && (0, o.createVNode)(1, "div", "dx-scheduler-group-header-content", e.props.text, 0)], 0);
}
exports.viewFunction = h;
var f = function (e) {
  var t;
  var n;
  var i;
  var a;
  var r;
  function f(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = f).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  d(t, n);
  f.prototype.render = function () {
    var e;
    var t = this.props;
    return h({
      props: c({}, t, {
        cellTemplate: (e = t.cellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, c({}, t)));
        } : e))
      }),
      restAttributes: this.restAttributes
    });
  };
  i = f;
  if (a = [{
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.cellTemplate;
      e.className;
      e.color;
      e.data;
      e.id;
      e.index;
      e.text;
      return l(e, s);
    }
  }]) {
    u(i.prototype, a);
  }
  if (r) {
    u(i, r);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return f;
}(a.BaseInfernoComponent);
exports.GroupPanelVerticalCell = f;
f.defaultProps = r.GroupPanelCellProps;