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
exports.viewFunction = exports.AllDayTableProps = exports.AllDayTable = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./48868.js");
var s = require("./48713.js");
var l = require("./71604.js");
var u = require("./8936.js");
var d = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "tableRef", "topVirtualRowHeight", "viewData", "width"];
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
  var t = e.allDayPanelData;
  var n = e.emptyTableHeight;
  var i = e.props;
  var a = i.dataCellTemplate;
  var l = i.tableRef;
  var u = i.viewData;
  var d = i.width;
  return (0, o.createComponentVNode)(2, r.Table, {
    className: "dx-scheduler-all-day-table",
    height: n,
    width: d,
    tableRef: l,
    children: (0, o.createComponentVNode)(2, s.AllDayPanelTableBody, {
      viewData: t,
      leftVirtualCellWidth: u.leftVirtualCellWidth,
      rightVirtualCellWidth: u.rightVirtualCellWidth,
      leftVirtualCellCount: u.leftVirtualCellCount,
      rightVirtualCellCount: u.rightVirtualCellCount,
      dataCellTemplate: a
    })
  });
}
exports.viewFunction = g;
var m = l.LayoutProps;
exports.AllDayTableProps = m;
var _ = function (e) {
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
  f(t, n);
  var r;
  var s;
  var l;
  var m = i.prototype;
  m.createEffects = function () {
    return [(0, a.createReRenderEffect)()];
  };
  m.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props.viewData !== t.viewData) {
      this.__getterCache.allDayPanelData = undefined;
    }
  };
  m.render = function () {
    var e;
    var t = this.props;
    return g({
      props: p({}, t, {
        dataCellTemplate: (e = t.dataCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, p({}, t)));
        } : e))
      }),
      allDayPanelData: this.allDayPanelData,
      emptyTableHeight: this.emptyTableHeight,
      restAttributes: this.restAttributes
    });
  };
  r = i;
  if (s = [{
    key: "allDayPanelData",
    get: function () {
      var e = this;
      if (this.__getterCache.allDayPanelData !== undefined) {
        return this.__getterCache.allDayPanelData;
      } else {
        return this.__getterCache.allDayPanelData = e.props.viewData.groupedData[0].allDayPanel;
      }
    }
  }, {
    key: "emptyTableHeight",
    get: function () {
      if (this.allDayPanelData) {
        return undefined;
      } else {
        return u.DefaultSizes.allDayPanelHeight;
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.addDateTableClass;
      e.addVerticalSizesClassToRows;
      e.bottomVirtualRowHeight;
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
    h(r.prototype, s);
  }
  if (l) {
    h(r, l);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.AllDayTable = _;
_.defaultProps = m;