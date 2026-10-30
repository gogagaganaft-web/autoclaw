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
exports.viewFunction = exports.DateTableBodyProps = exports.DateTableBody = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./14364.js");
var s = require("./48713.js");
var l = require("./71604.js");
var u = require("./51430.js");
var d = require("./86237.js");
var c = require("./8936.js");
var h = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "cellTemplate", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData", "width"];
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
function p(e, t, n) {
  if ((t = m(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
function g(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, m(i.key), i);
  }
}
function m(e) {
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
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function v() {
  return (v = Object.assign ? Object.assign.bind() : function (e) {
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
function y(e) {
  var t = e.props;
  var n = t.cellTemplate;
  var i = t.dataCellTemplate;
  var a = t.viewData;
  var l = e.rowClasses;
  return (0, o.createFragment)(a.groupedData.map(function (e) {
    var t = e.allDayPanel;
    var u = e.dateTable;
    var d = e.isGroupedAllDayPanel;
    var c = e.key;
    return (0, o.createFragment)([d && (0, o.createComponentVNode)(2, s.AllDayPanelTableBody, {
      viewData: t,
      dataCellTemplate: i,
      isVerticalGroupOrientation: true,
      leftVirtualCellWidth: a.leftVirtualCellWidth,
      rightVirtualCellWidth: a.rightVirtualCellWidth,
      leftVirtualCellCount: a.leftVirtualCellCount,
      rightVirtualCellCount: a.rightVirtualCellCount
    }), u.map(function (e) {
      var t = e.cells;
      var s = e.key;
      return (0, o.createComponentVNode)(2, r.Row, {
        className: l,
        leftVirtualCellWidth: a.leftVirtualCellWidth,
        rightVirtualCellWidth: a.rightVirtualCellWidth,
        leftVirtualCellCount: a.leftVirtualCellCount,
        rightVirtualCellCount: a.rightVirtualCellCount,
        children: t.map(function (e) {
          var t = e.endDate;
          var o = e.firstDayOfMonth;
          var a = e.groupIndex;
          var r = e.groups;
          var s = e.index;
          var l = e.isFirstGroupCell;
          var u = e.isFocused;
          var d = e.isLastGroupCell;
          var c = e.isSelected;
          var h = e.key;
          var f = e.otherMonth;
          var p = e.startDate;
          var g = e.text;
          var m = e.today;
          return n({
            isFirstGroupCell: l,
            isLastGroupCell: d,
            startDate: p,
            endDate: t,
            groups: r,
            groupIndex: a,
            index: s,
            dataCellTemplate: i,
            key: h,
            text: g,
            today: m,
            otherMonth: f,
            firstDayOfMonth: o,
            isSelected: c,
            isFocused: u
          });
        })
      }, s);
    })], 0, c);
  }), 0);
}
exports.viewFunction = y;
var b = Object.create(Object.prototype, v(Object.getOwnPropertyDescriptors(l.LayoutProps), Object.getOwnPropertyDescriptors({
  cellTemplate: u.DateTableCellBase
})));
exports.DateTableBodyProps = b;
function x(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, v({}, t)));
  } : e);
}
var w = function (e) {
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
  _(t, n);
  r.prototype.render = function () {
    var e = this.props;
    return y({
      props: v({}, e, {
        cellTemplate: x(e.cellTemplate),
        dataCellTemplate: x(e.dataCellTemplate)
      }),
      rowClasses: this.rowClasses,
      restAttributes: this.restAttributes
    });
  };
  i = r;
  if (o = [{
    key: "rowClasses",
    get: function () {
      var e;
      var t = this.props.addVerticalSizesClassToRows;
      return (0, d.combineClasses)((p(e = {}, c.DATE_TABLE_ROW_CLASS, true), p(e, "dx-scheduler-cell-sizes-vertical", t), e));
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.addDateTableClass;
      e.addVerticalSizesClassToRows;
      e.bottomVirtualRowHeight;
      e.cellTemplate;
      e.dataCellTemplate;
      e.groupOrientation;
      e.leftVirtualCellWidth;
      e.rightVirtualCellWidth;
      e.topVirtualRowHeight;
      e.viewData;
      e.width;
      return f(e, h);
    }
  }]) {
    g(i.prototype, o);
  }
  if (a) {
    g(i, a);
  }
  Object.defineProperty(i, "prototype", {
    writable: false
  });
  return r;
}(a.BaseInfernoComponent);
exports.DateTableBody = w;
w.defaultProps = b;