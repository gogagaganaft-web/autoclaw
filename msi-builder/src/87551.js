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
exports.viewFunction = exports.VirtualCellProps = exports.VirtualCell = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./97205.js");
var s = require("./11379.js");
var l = require("./72923.js");
var u = ["colSpan", "isHeaderCell", "width"];
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
function p(e) {
  var t = e.props;
  var n = t.colSpan;
  var i = t.isHeaderCell;
  var a = e.style;
  var r = i ? s.HeaderCell : l.OrdinaryCell;
  return (0, o.createComponentVNode)(2, r, {
    className: "dx-scheduler-virtual-cell",
    styles: a,
    colSpan: n
  });
}
exports.viewFunction = p;
var g = {
  width: 0,
  isHeaderCell: false
};
exports.VirtualCellProps = g;
var m = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  function s(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = s).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  s.prototype.render = function () {
    var e = this.props;
    return p({
      props: c({}, e),
      style: this.style,
      restAttributes: this.restAttributes
    });
  };
  i = s;
  if (o = [{
    key: "style",
    get: function () {
      var e = this.props.width;
      var t = this.restAttributes.style;
      return (0, r.addWidthToStyle)(e, t);
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.colSpan;
      e.isHeaderCell;
      e.width;
      return d(e, u);
    }
  }]) {
    h(i.prototype, o);
  }
  if (a) {
    h(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return s;
}(a.BaseInfernoComponent);
exports.VirtualCell = m;
m.defaultProps = g;