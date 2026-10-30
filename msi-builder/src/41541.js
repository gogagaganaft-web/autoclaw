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
exports.viewFunction = exports.TimePanelTableLayout = exports.TimePanelLayoutProps = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./14364.js");
var s = require("./37217.js");
var l = require("./35064.js");
var u = require("./48868.js");
var d = require("./7149.js");
var c = ["groupOrientation", "tableRef", "timeCellTemplate", "timePanelData"];
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
function m(e) {
  var t = e.bottomVirtualRowHeight;
  var n = e.props;
  var i = n.tableRef;
  var a = n.timeCellTemplate;
  var c = n.timePanelData;
  var h = e.restAttributes;
  var f = e.topVirtualRowHeight;
  return (0, o.normalizeProps)((0, o.createComponentVNode)(2, u.Table, g({}, h, {
    topVirtualRowHeight: f,
    bottomVirtualRowHeight: t,
    virtualCellsCount: 1,
    className: "dx-scheduler-time-panel",
    tableRef: i,
    children: c.groupedData.map(function (e) {
      var t = e.dateTable;
      var n = e.groupIndex;
      var i = e.isGroupedAllDayPanel;
      var u = e.key;
      return (0, o.createFragment)([i && (0, o.createComponentVNode)(2, r.Row, {
        children: (0, o.createComponentVNode)(2, l.CellBase, {
          className: "dx-scheduler-time-panel-title-cell",
          children: (0, o.createComponentVNode)(2, d.AllDayPanelTitle)
        })
      }), t.map(function (e) {
        var t = e.groups;
        var i = e.index;
        var l = e.isFirstGroupCell;
        var u = e.isLastGroupCell;
        var d = e.key;
        var c = e.startDate;
        var h = e.text;
        return (0, o.createComponentVNode)(2, r.Row, {
          className: "dx-scheduler-time-panel-row",
          children: (0, o.createComponentVNode)(2, s.TimePanelCell, {
            startDate: c,
            text: h,
            groups: t,
            groupIndex: n,
            isFirstGroupCell: l,
            isLastGroupCell: u,
            index: i,
            timeCellTemplate: a
          })
        }, d);
      })], 0, u);
    })
  })));
}
exports.viewFunction = m;
var _ = {
  timePanelData: Object.freeze({
    groupedData: [],
    leftVirtualCellCount: 0,
    rightVirtualCellCount: 0,
    topVirtualRowCount: 0,
    bottomVirtualRowCount: 0
  })
};
exports.TimePanelLayoutProps = _;
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
  p(t, n);
  var r;
  var s;
  var l;
  var u = i.prototype;
  u.createEffects = function () {
    return [(0, a.createReRenderEffect)()];
  };
  u.render = function () {
    var e;
    var t = this.props;
    return m({
      props: g({}, t, {
        timeCellTemplate: (e = t.timeCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, g({}, t)));
        } : e))
      }),
      topVirtualRowHeight: this.topVirtualRowHeight,
      bottomVirtualRowHeight: this.bottomVirtualRowHeight,
      restAttributes: this.restAttributes
    });
  };
  r = i;
  if (s = [{
    key: "topVirtualRowHeight",
    get: function () {
      return this.props.timePanelData.topVirtualRowHeight ?? 0;
    }
  }, {
    key: "bottomVirtualRowHeight",
    get: function () {
      return this.props.timePanelData.bottomVirtualRowHeight ?? 0;
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.groupOrientation;
      e.tableRef;
      e.timeCellTemplate;
      e.timePanelData;
      return h(e, c);
    }
  }]) {
    f(r.prototype, s);
  }
  if (l) {
    f(r, l);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.TimePanelTableLayout = v;
v.defaultProps = _;