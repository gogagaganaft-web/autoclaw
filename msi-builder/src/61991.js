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
exports.viewFunction = exports.Row = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./40725.js");
var s = require("./5930.js");
var l = ["cellTemplate", "className", "groupItems"];
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
  var n = t.cellTemplate;
  var i = t.className;
  var a = t.groupItems;
  return (0, o.createVNode)(1, "tr", `dx-scheduler-group-row ${i}`, a.map(function (e, t) {
    var i = e.colSpan;
    var a = e.color;
    var s = e.data;
    var l = e.id;
    var u = e.isFirstGroupCell;
    var d = e.isLastGroupCell;
    var c = e.key;
    var h = e.text;
    return (0, o.createComponentVNode)(2, r.GroupPanelHorizontalCell, {
      text: h,
      id: l,
      data: s,
      index: t,
      color: a,
      colSpan: i,
      isFirstGroupCell: !!u,
      isLastGroupCell: !!d,
      cellTemplate: n
    }, c);
  }), 0);
}
exports.viewFunction = f;
var p = function (e) {
  var t;
  var n;
  var i;
  var a;
  var r;
  function s(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  s.prototype.render = function () {
    var e;
    var t = this.props;
    return f({
      props: h({}, t, {
        cellTemplate: (e = t.cellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, h({}, t)));
        } : e))
      }),
      restAttributes: this.restAttributes
    });
  };
  i = s;
  if (a = [{
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.cellTemplate;
      e.className;
      e.groupItems;
      return u(e, l);
    }
  }]) {
    d(i.prototype, a);
  }
  if (r) {
    d(i, r);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return s;
}(a.BaseInfernoComponent);
exports.Row = p;
p.defaultProps = s.GroupPanelRowProps;