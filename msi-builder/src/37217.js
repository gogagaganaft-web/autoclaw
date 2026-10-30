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
exports.viewFunction = exports.TimePanelCellProps = exports.TimePanelCell = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./35064.js");
var s = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text", "timeCellTemplate"];
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
function u(e, t) {
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
function d(e, t) {
  return (d = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function c() {
  return (c = Object.assign ? Object.assign.bind() : function (e) {
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
function h(e) {
  var t = e.props;
  var n = t.className;
  var i = t.isFirstGroupCell;
  var a = t.isLastGroupCell;
  var s = t.text;
  var l = t.timeCellTemplate;
  var u = e.timeCellTemplateProps;
  return (0, o.createComponentVNode)(2, r.CellBase, {
    isFirstGroupCell: i,
    isLastGroupCell: a,
    className: `dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical ${n}`,
    children: [!l && (0, o.createVNode)(1, "div", null, s, 0), !!l && l({
      index: u.index,
      data: u.data
    })]
  });
}
exports.viewFunction = h;
var f = r.CellBaseProps;
exports.TimePanelCellProps = f;
var p = function (e) {
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
  d(t, n);
  var a;
  var r;
  var f;
  var p = i.prototype;
  p.componentWillUpdate = function (e, t, n) {
    if (this.props.groupIndex !== e.groupIndex || this.props.groups !== e.groups || this.props.index !== e.index || this.props.startDate !== e.startDate || this.props.text !== e.text) {
      this.__getterCache.timeCellTemplateProps = undefined;
    }
  };
  p.render = function () {
    var e;
    var t = this.props;
    return h({
      props: c({}, t, {
        timeCellTemplate: (e = t.timeCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, c({}, t)));
        } : e))
      }),
      timeCellTemplateProps: this.timeCellTemplateProps,
      restAttributes: this.restAttributes
    });
  };
  a = i;
  if (r = [{
    key: "timeCellTemplateProps",
    get: function () {
      var e;
      var t;
      var n;
      var i;
      var o = this;
      if (this.__getterCache.timeCellTemplateProps !== undefined) {
        return this.__getterCache.timeCellTemplateProps;
      } else {
        return this.__getterCache.timeCellTemplateProps = (e = o.props, t = e.groupIndex, n = e.groups, i = e.index, {
          data: {
            date: e.startDate,
            groups: n,
            groupIndex: t,
            text: e.text
          },
          index: i
        });
      }
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
      e.timeCellTemplate;
      return l(e, s);
    }
  }]) {
    u(a.prototype, r);
  }
  if (f) {
    u(a, f);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.TimePanelCell = p;
p.defaultProps = f;