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
exports.viewFunction = exports.RowProps = exports.Row = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./87551.js");
var s = ["children", "className", "isHeaderRow", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "styles"];
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
function u() {
  return (u = Object.assign ? Object.assign.bind() : function (e) {
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
function h(e) {
  var t = e.hasLeftVirtualCell;
  var n = e.hasRightVirtualCell;
  var i = e.props;
  var s = i.children;
  var l = i.className;
  var u = i.isHeaderRow;
  var d = i.leftVirtualCellCount;
  var c = i.leftVirtualCellWidth;
  var h = i.rightVirtualCellCount;
  var f = i.rightVirtualCellWidth;
  var p = i.styles;
  return (0, o.createVNode)(1, "tr", l, [t && (0, o.createComponentVNode)(2, r.VirtualCell, {
    width: c,
    colSpan: d,
    isHeaderCell: u
  }), s, n && (0, o.createComponentVNode)(2, r.VirtualCell, {
    width: f,
    colSpan: h,
    isHeaderCell: u
  })], 0, {
    style: (0, a.normalizeStyles)(p)
  });
}
exports.viewFunction = h;
var f = {
  className: "",
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  isHeaderRow: false
};
exports.RowProps = f;
var p = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  function r(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = r).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return h({
      props: u({}, e),
      hasLeftVirtualCell: this.hasLeftVirtualCell,
      hasRightVirtualCell: this.hasRightVirtualCell,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "hasLeftVirtualCell",
    get: function () {
      return !!this.props.leftVirtualCellCount;
    }
  }, {
    key: "hasRightVirtualCell",
    get: function () {
      return !!this.props.rightVirtualCellCount;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.children;
      e.className;
      e.isHeaderRow;
      e.leftVirtualCellCount;
      e.leftVirtualCellWidth;
      e.rightVirtualCellCount;
      e.rightVirtualCellWidth;
      e.styles;
      return l(e, s);
    }
  }]) {
    d(i.prototype, o);
  }
  if (a) {
    d(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(a.BaseInfernoComponent);
exports.Row = p;
p.defaultProps = f;