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
exports.viewFunction = exports.AllDayPanelTableBodyProps = exports.AllDayPanelTableBody = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./14364.js");
var s = require("./50307.js");
var l = require("./86237.js");
var u = ["className", "dataCellTemplate", "isVerticalGroupOrientation", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "viewData"];
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
function c(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, h(i.key), i);
  }
}
function h(e) {
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
function f(e, t) {
  return (f = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
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
function g(e) {
  return (0, o.createComponentVNode)(2, r.Row, {
    leftVirtualCellWidth: e.props.leftVirtualCellWidth,
    rightVirtualCellWidth: e.props.rightVirtualCellWidth,
    leftVirtualCellCount: e.props.leftVirtualCellCount,
    rightVirtualCellCount: e.props.rightVirtualCellCount,
    className: e.classes,
    children: e.props.viewData.map(function (t) {
      var n = t.endDate;
      var i = t.groupIndex;
      var a = t.groups;
      var r = t.index;
      var l = t.isFirstGroupCell;
      var u = t.isFocused;
      var d = t.isLastGroupCell;
      var c = t.isSelected;
      var h = t.key;
      var f = t.startDate;
      return (0, o.createComponentVNode)(2, s.AllDayPanelCell, {
        isFirstGroupCell: !e.props.isVerticalGroupOrientation && l,
        isLastGroupCell: !e.props.isVerticalGroupOrientation && d,
        startDate: f,
        endDate: n,
        groups: a,
        groupIndex: i,
        index: r,
        dataCellTemplate: e.props.dataCellTemplate,
        isSelected: c,
        isFocused: u
      }, h);
    })
  });
}
exports.viewFunction = g;
var m = {
  viewData: Object.freeze([]),
  isVerticalGroupOrientation: false,
  className: "",
  leftVirtualCellWidth: 0,
  rightVirtualCellWidth: 0
};
exports.AllDayPanelTableBodyProps = m;
var _ = function (e) {
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
  f(t, n);
  s.prototype.render = function () {
    var e;
    var t = this.props;
    return g({
      props: p({}, t, {
        dataCellTemplate: (e = t.dataCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, p({}, t)));
        } : e))
      }),
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };
  i = s;
  if (a = [{
    key: "classes",
    get: function () {
      var e;
      var t;
      var n;
      var i = this.props.className;
      return (0, l.combineClasses)((e = {
        "dx-scheduler-all-day-table-row": true
      }, n = !!i, (t = h(t = i)) in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[t] = n, e));
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.className;
      e.dataCellTemplate;
      e.isVerticalGroupOrientation;
      e.leftVirtualCellCount;
      e.leftVirtualCellWidth;
      e.rightVirtualCellCount;
      e.rightVirtualCellWidth;
      e.viewData;
      return d(e, u);
    }
  }]) {
    c(i.prototype, a);
  }
  if (r) {
    c(i, r);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return s;
}(a.BaseInfernoComponent);
exports.AllDayPanelTableBody = _;
_.defaultProps = m;