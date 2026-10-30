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
exports.viewFunction = exports.VirtualRowProps = exports.VirtualRow = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./97205.js");
var s = require("./14364.js");
var l = require("./87551.js");
var u = ["cellsCount", "children", "className", "height", "isHeaderRow", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "styles"];
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
function c(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return h(e);
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
      return h(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return h(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function h(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function f(e, t) {
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
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
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
function m(e) {
  var t = e.classes;
  var n = e.props;
  var i = n.leftVirtualCellCount;
  var a = n.leftVirtualCellWidth;
  var r = n.rightVirtualCellCount;
  var u = n.rightVirtualCellWidth;
  var d = e.style;
  var c = e.virtualCells;
  return (0, o.createComponentVNode)(2, s.Row, {
    styles: d,
    className: t,
    leftVirtualCellWidth: a,
    rightVirtualCellWidth: u,
    leftVirtualCellCount: i,
    rightVirtualCellCount: r,
    children: c.map(function (e, t) {
      return (0, o.createComponentVNode)(2, l.VirtualCell, null, t.toString());
    })
  });
}
exports.viewFunction = m;
var _ = Object.create(Object.prototype, g(Object.getOwnPropertyDescriptors(s.RowProps), Object.getOwnPropertyDescriptors({
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0,
  cellsCount: 1
})));
exports.VirtualRowProps = _;
var v = function (e) {
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
  p(t, n);
  var o;
  var a;
  var s;
  var l = i.prototype;
  l.componentWillUpdate = function (e, t, n) {
    if (this.props.cellsCount !== e.cellsCount) {
      this.__getterCache.virtualCells = undefined;
    }
  };
  l.render = function () {
    var e = this.props;
    return m({
      props: g({}, e),
      style: this.style,
      classes: this.classes,
      virtualCells: this.virtualCells,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (a = [{
    key: "style",
    get: function () {
      var e = this.props.height;
      var t = this.restAttributes.style;
      return (0, r.addHeightToStyle)(e, t);
    }
  }, {
    key: "classes",
    get: function () {
      var e = this.props.className;
      return `dx-scheduler-virtual-row ${e}`;
    }
  }, {
    key: "virtualCells",
    get: function () {
      var e;
      var t = this;
      if (this.__getterCache.virtualCells !== undefined) {
        return this.__getterCache.virtualCells;
      } else {
        return this.__getterCache.virtualCells = (e = t.props.cellsCount, c(Array(e)));
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.cellsCount;
      e.children;
      e.className;
      e.height;
      e.isHeaderRow;
      e.leftVirtualCellCount;
      e.leftVirtualCellWidth;
      e.rightVirtualCellCount;
      e.rightVirtualCellWidth;
      e.styles;
      return d(e, u);
    }
  }]) {
    f(o.prototype, a);
  }
  if (s) {
    f(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.VirtualRow = v;
v.defaultProps = _;