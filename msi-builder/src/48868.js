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
exports.viewFunction = exports.TableProps = exports.Table = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./97205.js");
var s = require("./4784.js");
var l = ["bottomVirtualRowHeight", "children", "className", "height", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "virtualCellsCount", "width"];
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
function d() {
  return (d = Object.assign ? Object.assign.bind() : function (e) {
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
function f(e) {
  var t = e.hasBottomVirtualRow;
  var n = e.hasTopVirtualRow;
  var i = e.props;
  var r = i.bottomVirtualRowHeight;
  var l = i.children;
  var u = i.className;
  var d = i.leftVirtualCellCount;
  var c = i.leftVirtualCellWidth;
  var h = i.rightVirtualCellCount;
  var f = i.rightVirtualCellWidth;
  var p = i.tableRef;
  var g = i.topVirtualRowHeight;
  var m = i.virtualCellsCount;
  var _ = e.style;
  return (0, o.createVNode)(1, "table", u, (0, o.createVNode)(1, "tbody", null, [n && (0, o.createComponentVNode)(2, s.VirtualRow, {
    height: g,
    cellsCount: m,
    leftVirtualCellWidth: c,
    rightVirtualCellWidth: f,
    leftVirtualCellCount: d,
    rightVirtualCellCount: h
  }), l, t && (0, o.createComponentVNode)(2, s.VirtualRow, {
    height: r,
    cellsCount: m,
    leftVirtualCellWidth: c,
    rightVirtualCellWidth: f,
    leftVirtualCellCount: d,
    rightVirtualCellCount: h
  })], 0), 2, {
    style: (0, a.normalizeStyles)(_)
  }, null, p);
}
exports.viewFunction = f;
var p = {
  className: "",
  topVirtualRowHeight: 0,
  bottomVirtualRowHeight: 0,
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  virtualCellsCount: 0
};
exports.TableProps = p;
var g = function (e) {
  var t;
  var n;
  var i;
  var a;
  var s;
  function p(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.elementRef = (0, o.createRef)();
    return n;
  }
  n = e;
  (t = p).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  p.prototype.render = function () {
    var e = this.props;
    return f({
      props: d({}, e),
      elementRef: this.elementRef,
      style: this.style,
      hasTopVirtualRow: this.hasTopVirtualRow,
      hasBottomVirtualRow: this.hasBottomVirtualRow,
      restAttributes: this.restAttributes
    });
  };
  i = p;
  if (a = [{
    key: "style",
    get: function () {
      var e = this.props;
      var t = e.height;
      var n = e.width;
      var i = this.restAttributes.style;
      var o = (0, r.addHeightToStyle)(t, i);
      return (0, r.addWidthToStyle)(n, o);
    }
  }, {
    key: "hasTopVirtualRow",
    get: function () {
      return !!this.props.topVirtualRowHeight;
    }
  }, {
    key: "hasBottomVirtualRow",
    get: function () {
      return !!this.props.bottomVirtualRowHeight;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.bottomVirtualRowHeight;
      e.children;
      e.className;
      e.height;
      e.leftVirtualCellCount;
      e.leftVirtualCellWidth;
      e.rightVirtualCellCount;
      e.rightVirtualCellWidth;
      e.tableRef;
      e.topVirtualRowHeight;
      e.virtualCellsCount;
      e.width;
      return u(e, l);
    }
  }]) {
    c(i.prototype, a);
  }
  if (s) {
    c(i, s);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return p;
}(a.BaseInfernoComponent);
exports.Table = g;
g.defaultProps = p;