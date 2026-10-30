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
exports.viewFunction = exports.TimelineDateHeaderLayout = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./14364.js");
var l = require("./97205.js");
var u = require("./92366.js");
var d = require("./35878.js");
var c = (o = require("./32586.js")) && o.__esModule ? o : {
  default: o
};
var h = ["dateCellTemplate", "dateHeaderData", "groupByDate", "groupOrientation", "groups", "timeCellTemplate"];
function f(e, t) {
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
function p(e, t) {
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
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function m() {
  return (m = Object.assign ? Object.assign.bind() : function (e) {
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
var _ = (0, c.default)().isMaterial;
function v(e) {
  var t = e.isHorizontalGrouping;
  var n = e.props;
  var i = n.dateCellTemplate;
  var o = n.dateHeaderData;
  var r = n.timeCellTemplate;
  var l = o.dataMap;
  var d = o.isMonthDateHeader;
  var c = o.leftVirtualCellCount;
  var h = o.leftVirtualCellWidth;
  var f = o.rightVirtualCellCount;
  var p = o.rightVirtualCellWidth;
  var g = o.weekDayLeftVirtualCellCount;
  var m = o.weekDayLeftVirtualCellWidth;
  var v = o.weekDayRightVirtualCellCount;
  var y = o.weekDayRightVirtualCellWidth;
  return (0, a.createFragment)(l.map(function (e, n) {
    var o = l.length;
    var b = o - 1 === n;
    var x = o > 1 && n === 0;
    var w = _ && (d || x);
    var C = c;
    var S = f;
    var k = p;
    var D = h;
    if (x) {
      C = g;
      S = v;
      k = y;
      D = m;
    }
    return (0, a.createComponentVNode)(2, s.Row, {
      className: "dx-scheduler-header-row",
      leftVirtualCellWidth: D,
      leftVirtualCellCount: C,
      rightVirtualCellWidth: k,
      rightVirtualCellCount: S,
      children: e.map(function (e) {
        var n = e.colSpan;
        var o = e.endDate;
        var s = e.groupIndex;
        var l = e.groups;
        var d = e.index;
        var c = e.isFirstGroupCell;
        var h = e.isLastGroupCell;
        var f = e.key;
        var p = e.startDate;
        var g = e.text;
        var m = e.today;
        return (0, a.createComponentVNode)(2, u.DateHeaderCell, {
          startDate: p,
          endDate: o,
          groups: t ? l : undefined,
          groupIndex: t ? s : undefined,
          today: m,
          index: d,
          text: g,
          isFirstGroupCell: c,
          isLastGroupCell: h,
          isWeekDayCell: x,
          colSpan: n,
          splitText: w,
          dateCellTemplate: i,
          timeCellTemplate: r,
          isTimeCellTemplate: b
        }, f);
      })
    }, n.toString());
  }), 0);
}
exports.viewFunction = v;
function y(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, a.normalizeProps)((0, a.createComponentVNode)(2, e, m({}, t)));
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
  g(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return v({
      props: m({}, e, {
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
      return f(e, h);
    }
  }]) {
    p(i.prototype, o);
  }
  if (a) {
    p(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(r.BaseInfernoComponent);
exports.TimelineDateHeaderLayout = b;
b.defaultProps = d.DateHeaderLayoutProps;