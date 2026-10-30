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
exports.viewFunction = exports.DateHeaderCellProps = exports.DateHeaderCell = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./35064.js");
var s = require("./86237.js");
var l = require("./97205.js");
var u = require("./85122.js");
var d = ["allDay", "ariaLabel", "children", "className", "colSpan", "contentTemplateProps", "dateCellTemplate", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "isTimeCellTemplate", "isWeekDayCell", "splitText", "startDate", "text", "timeCellTemplate", "today"];
function c(e, t) {
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
function h(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, f(i.key), i);
  }
}
function f(e) {
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
  var i = n.colSpan;
  var a = n.dateCellTemplate;
  var r = n.groupIndex;
  var s = n.groups;
  var l = n.index;
  var d = n.isTimeCellTemplate;
  var c = n.splitText;
  var h = n.startDate;
  var f = n.text;
  var p = n.timeCellTemplate;
  var g = e.useTemplate;
  return (0, o.createVNode)(1, "th", t, g ? (0, o.createFragment)([d && p && p({
    data: {
      date: h,
      text: f,
      groups: s,
      groupIndex: r
    },
    index: l
  }), !d && a && a({
    data: {
      date: h,
      text: f,
      groups: s,
      groupIndex: r
    },
    index: l
  })], 0) : (0, o.createComponentVNode)(2, u.DateHeaderText, {
    splitText: c,
    text: f
  }), 0, {
    colSpan: i,
    title: f
  });
}
exports.viewFunction = m;
var _ = Object.create(Object.prototype, g(Object.getOwnPropertyDescriptors(r.CellBaseProps), Object.getOwnPropertyDescriptors({
  today: false,
  colSpan: 1,
  isWeekDayCell: false,
  splitText: false,
  isTimeCellTemplate: false
})));
exports.DateHeaderCellProps = _;
function v(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, g({}, t)));
  } : e);
}
var y = function (e) {
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
    return m({
      props: g({}, e, {
        timeCellTemplate: v(e.timeCellTemplate),
        dateCellTemplate: v(e.dateCellTemplate)
      }),
      classes: this.classes,
      useTemplate: this.useTemplate,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "classes",
    get: function () {
      var e;
      var t;
      var n;
      var i = this.props;
      var o = i.className;
      var a = i.isFirstGroupCell;
      var r = i.isLastGroupCell;
      var u = i.isWeekDayCell;
      var d = i.today;
      var c = (0, s.combineClasses)((e = {
        "dx-scheduler-header-panel-cell": true,
        "dx-scheduler-cell-sizes-horizontal": true,
        "dx-scheduler-header-panel-current-time-cell": d,
        "dx-scheduler-header-panel-week-cell": u
      }, n = !!o, (t = f(t = o)) in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[t] = n, e));
      return (0, l.getGroupCellClasses)(a, r, c);
    }
  }, {
    key: "useTemplate",
    get: function () {
      var e = this.props;
      var t = e.dateCellTemplate;
      var n = e.isTimeCellTemplate;
      var i = e.timeCellTemplate;
      return !n && !!t || n && !!i;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.allDay;
      e.ariaLabel;
      e.children;
      e.className;
      e.colSpan;
      e.contentTemplateProps;
      e.dateCellTemplate;
      e.endDate;
      e.groupIndex;
      e.groups;
      e.index;
      e.isFirstGroupCell;
      e.isLastGroupCell;
      e.isTimeCellTemplate;
      e.isWeekDayCell;
      e.splitText;
      e.startDate;
      e.text;
      e.timeCellTemplate;
      e.today;
      return c(e, d);
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
  return r;
}(a.BaseInfernoComponent);
exports.DateHeaderCell = y;
y.defaultProps = _;