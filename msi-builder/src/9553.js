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
exports.viewFunction = exports.MonthDateTableCell = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./86237.js");
var s = require("./51430.js");
var l = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isFocused", "isLastGroupCell", "isSelected", "otherMonth", "startDate", "text", "today"];
function u(e, t) {
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
function d(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, c(i.key), i);
  }
}
function c(e) {
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
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function f() {
  return (f = Object.assign ? Object.assign.bind() : function (e) {
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
function p(e) {
  var t = e.classes;
  var n = e.contentTemplateProps;
  var i = e.props;
  var a = i.dataCellTemplate;
  var r = i.endDate;
  var l = i.groupIndex;
  var u = i.groups;
  var d = i.index;
  var c = i.isFirstGroupCell;
  var h = i.isFocused;
  var f = i.isLastGroupCell;
  var p = i.isSelected;
  var g = i.startDate;
  var m = i.text;
  return (0, o.createComponentVNode)(2, s.DateTableCellBase, {
    className: t,
    dataCellTemplate: a,
    startDate: g,
    endDate: r,
    text: m,
    groups: u,
    groupIndex: l,
    index: d,
    isFirstGroupCell: c,
    isLastGroupCell: f,
    isSelected: p,
    isFocused: h,
    contentTemplateProps: n,
    children: (0, o.createVNode)(1, "div", "dx-scheduler-date-table-cell-text", m, 0)
  });
}
exports.viewFunction = p;
var g = function (e) {
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
  h(t, n);
  var a;
  var s;
  var g;
  var m = i.prototype;
  m.componentWillUpdate = function (e, t, n) {
    if (this.props.index !== e.index || this.props.text !== e.text) {
      this.__getterCache.contentTemplateProps = undefined;
    }
  };
  m.render = function () {
    var e;
    var t = this.props;
    return p({
      props: f({}, t, {
        dataCellTemplate: (e = t.dataCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, f({}, t)));
        } : e))
      }),
      classes: this.classes,
      contentTemplateProps: this.contentTemplateProps,
      restAttributes: this.restAttributes
    });
  };
  a = i;
  if (s = [{
    key: "classes",
    get: function () {
      var e;
      var t;
      var n;
      var i = this.props;
      var o = i.className;
      var a = i.firstDayOfMonth;
      var s = i.otherMonth;
      var l = i.today;
      return (0, r.combineClasses)((e = {
        "dx-scheduler-date-table-other-month": !!s,
        "dx-scheduler-date-table-current-date": !!l,
        "dx-scheduler-date-table-first-of-month": !!a
      }, n = !!o, (t = c(t = o)) in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[t] = n, e));
    }
  }, {
    key: "contentTemplateProps",
    get: function () {
      var e;
      var t;
      var n = this;
      if (this.__getterCache.contentTemplateProps !== undefined) {
        return this.__getterCache.contentTemplateProps;
      } else {
        return this.__getterCache.contentTemplateProps = (e = n.props, t = e.index, {
          data: {
            text: e.text
          },
          index: t
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
      e.dataCellTemplate;
      e.endDate;
      e.firstDayOfMonth;
      e.groupIndex;
      e.groups;
      e.index;
      e.isFirstGroupCell;
      e.isFocused;
      e.isLastGroupCell;
      e.isSelected;
      e.otherMonth;
      e.startDate;
      e.text;
      e.today;
      return u(e, l);
    }
  }]) {
    d(a.prototype, s);
  }
  if (g) {
    d(a, g);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.MonthDateTableCell = g;
g.defaultProps = s.DateTableCellBaseProps;