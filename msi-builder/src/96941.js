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
exports.viewFunction = exports.DateTableLayoutProps = exports.DateTableLayoutBase = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./48868.js");
var s = require("./13552.js");
var l = require("./71604.js");
var u = require("./51430.js");
var d = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "cellTemplate", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "viewData", "width"];
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
  var t = e.bottomVirtualRowHeight;
  var n = e.classes;
  var i = e.leftVirtualCellWidth;
  var a = e.props;
  var l = a.addVerticalSizesClassToRows;
  var u = a.cellTemplate;
  var d = a.dataCellTemplate;
  var c = a.groupOrientation;
  var h = a.tableRef;
  var f = a.viewData;
  var g = a.width;
  var m = e.restAttributes;
  var _ = e.rightVirtualCellWidth;
  var v = e.topVirtualRowHeight;
  var y = e.virtualCellsCount;
  return (0, o.normalizeProps)((0, o.createComponentVNode)(2, r.Table, p({}, m, {
    tableRef: h,
    topVirtualRowHeight: v,
    bottomVirtualRowHeight: t,
    leftVirtualCellWidth: i,
    rightVirtualCellWidth: _,
    leftVirtualCellCount: f.leftVirtualCellCount,
    rightVirtualCellCount: f.rightVirtualCellCount,
    virtualCellsCount: y,
    className: n,
    width: g,
    children: (0, o.createComponentVNode)(2, s.DateTableBody, {
      cellTemplate: u,
      viewData: f,
      dataCellTemplate: d,
      leftVirtualCellWidth: i,
      rightVirtualCellWidth: _,
      groupOrientation: c,
      addVerticalSizesClassToRows: l
    })
  })));
}
exports.viewFunction = g;
var m = Object.create(Object.prototype, p(Object.getOwnPropertyDescriptors(l.LayoutProps), Object.getOwnPropertyDescriptors({
  cellTemplate: u.DateTableCellBase
})));
exports.DateTableLayoutProps = m;
function _(e) {
  return e && (e.defaultProps ? function (t) {
    return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, p({}, t)));
  } : e);
}
var v = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  f(t, n);
  var o;
  var r;
  var s;
  var l = i.prototype;
  l.createEffects = function () {
    return [(0, a.createReRenderEffect)()];
  };
  l.render = function () {
    var e = this.props;
    return g({
      props: p({}, e, {
        cellTemplate: _(e.cellTemplate),
        dataCellTemplate: _(e.dataCellTemplate)
      }),
      classes: this.classes,
      topVirtualRowHeight: this.topVirtualRowHeight,
      bottomVirtualRowHeight: this.bottomVirtualRowHeight,
      leftVirtualCellWidth: this.leftVirtualCellWidth,
      rightVirtualCellWidth: this.rightVirtualCellWidth,
      virtualCellsCount: this.virtualCellsCount,
      restAttributes: this.restAttributes
    });
  };
  o = i;
  if (r = [{
    key: "classes",
    get: function () {
      if (this.props.addDateTableClass) {
        return "dx-scheduler-date-table";
      } else {
        return undefined;
      }
    }
  }, {
    key: "topVirtualRowHeight",
    get: function () {
      return this.props.viewData.topVirtualRowHeight ?? 0;
    }
  }, {
    key: "bottomVirtualRowHeight",
    get: function () {
      return this.props.viewData.bottomVirtualRowHeight ?? 0;
    }
  }, {
    key: "leftVirtualCellWidth",
    get: function () {
      return this.props.viewData.leftVirtualCellWidth ?? 0;
    }
  }, {
    key: "rightVirtualCellWidth",
    get: function () {
      return this.props.viewData.rightVirtualCellWidth ?? 0;
    }
  }, {
    key: "virtualCellsCount",
    get: function () {
      return this.props.viewData.groupedData[0].dateTable[0].cells.length;
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
      e.tableRef;
      e.topVirtualRowHeight;
      e.viewData;
      e.width;
      return c(e, d);
    }
  }]) {
    h(o.prototype, r);
  }
  if (s) {
    h(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.DateTableLayoutBase = v;
v.defaultProps = m;