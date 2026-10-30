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
exports.viewFunction = exports.DateHeaderLayoutProps = exports.DateHeaderLayout = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./14364.js");
var l = require("./97205.js");
var u = require("./92366.js");
var d = (o = require("./32586.js")) && o.__esModule ? o : {
  default: o
};
var c = ["dateCellTemplate", "dateHeaderData", "groupByDate", "groupOrientation", "groups", "timeCellTemplate"];
function h(e, t) {
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
var m = (0, d.default)().isMaterial;
function _(e) {
  var t = e.isHorizontalGrouping;
  var n = e.props;
  var i = n.dateCellTemplate;
  var o = n.dateHeaderData;
  var r = o.dataMap;
  var l = o.leftVirtualCellCount;
  var d = o.leftVirtualCellWidth;
  var c = o.rightVirtualCellCount;
  var h = o.rightVirtualCellWidth;
  return (0, a.createFragment)(r.map(function (e, n) {
    return (0, a.createComponentVNode)(2, s.Row, {
      className: "dx-scheduler-header-row",
      leftVirtualCellWidth: d,
      leftVirtualCellCount: l,
      rightVirtualCellWidth: h,
      rightVirtualCellCount: c,
      isHeaderRow: true,
      children: e.map(function (e) {
        var n = e.colSpan;
        var o = e.endDate;
        var r = e.groupIndex;
        var s = e.groups;
        var l = e.index;
        var d = e.isFirstGroupCell;
        var c = e.isLastGroupCell;
        var h = e.key;
        var f = e.startDate;
        var p = e.text;
        var g = e.today;
        return (0, a.createComponentVNode)(2, u.DateHeaderCell, {
          startDate: f,
          endDate: o,
          groups: t ? s : undefined,
          groupIndex: t ? r : undefined,
          today: g,
          index: l,
          text: p,
          isFirstGroupCell: d,
          isLastGroupCell: c,
          dateCellTemplate: i,
          colSpan: n,
          splitText: m
        }, h);
      })
    }, n.toString());
  }), 0);
}
exports.viewFunction = _;
var v = {
  groupOrientation: "horizontal",
  groupByDate: false,
  groups: Object.freeze([])
};
exports.DateHeaderLayoutProps = v;
function y(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, a.normalizeProps)((0, a.createComponentVNode)(2, e, g({}, t)));
  } : e);
}
var b = function (e) {
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
  p(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return _({
      props: g({}, e, {
        dateCellTemplate: y(e.dateCellTemplate),
        timeCellTemplate: y(e.timeCellTemplate)
      }),
      isHorizontalGrouping: this.isHorizontalGrouping,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "isHorizontalGrouping",
    get: function () {
      var e = this.props;
      var t = e.groupByDate;
      var n = e.groupOrientation;
      var i = e.groups;
      return (0, l.isHorizontalGroupingApplied)(i, n) && !t;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.dateCellTemplate;
      e.dateHeaderData;
      e.groupByDate;
      e.groupOrientation;
      e.groups;
      e.timeCellTemplate;
      return h(e, c);
    }
  }]) {
    f(i.prototype, o);
  }
  if (a) {
    f(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(r.BaseInfernoComponent);
exports.DateHeaderLayout = b;
b.defaultProps = v;