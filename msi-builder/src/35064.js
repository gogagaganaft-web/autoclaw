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
exports.viewFunction = exports.CellBaseProps = exports.CellBase = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./97205.js");
var s = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text"];
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
  return (0, o.createVNode)(1, "td", e.classes, e.props.children, 0, {
    "aria-label": e.props.ariaLabel
  });
}
exports.viewFunction = h;
var f = {
  className: "",
  isFirstGroupCell: false,
  isLastGroupCell: false,
  startDate: Object.freeze(new Date()),
  endDate: Object.freeze(new Date()),
  allDay: false,
  text: "",
  index: 0,
  contentTemplateProps: Object.freeze({
    data: {},
    index: 0
  })
};
exports.CellBaseProps = f;
var p = function (e) {
  var t;
  var n;
  var i;
  var o;
  var a;
  function f(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = f).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  c(t, n);
  f.prototype.render = function () {
    var e = this.props;
    return h({
      props: u({}, e),
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };
  i = f;
  if (o = [{
    key: "classes",
    get: function () {
      var e = this.props;
      var t = e.className;
      var n = e.isFirstGroupCell;
      var i = e.isLastGroupCell;
      return (0, r.getGroupCellClasses)(n, i, t);
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.allDay;
      e.ariaLabel;
      e.children;
      e.className;
      e.contentTemplateProps;
      e.endDate;
      e.groupIndex;
      e.groups;
      e.index;
      e.isFirstGroupCell;
      e.isLastGroupCell;
      e.startDate;
      e.text;
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
  return f;
}(a.BaseInfernoComponent);
exports.CellBase = p;
p.defaultProps = f;