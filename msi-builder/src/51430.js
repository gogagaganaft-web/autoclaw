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
exports.viewFunction = exports.DateTableCellBaseProps = exports.DateTableCellBase = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./35064.js");
var s = require("./86237.js");
var l = require("./8936.js");
var u = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isFocused", "isLastGroupCell", "isSelected", "otherMonth", "startDate", "text", "today"];
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
function c(e, t, n) {
  if ((t = f(t)) in e) {
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
  var t = e.ariaLabel;
  var n = e.classes;
  var i = e.dataCellTemplateProps;
  var a = e.props;
  var s = a.children;
  var l = a.dataCellTemplate;
  var u = a.isFirstGroupCell;
  var d = a.isLastGroupCell;
  return (0, o.createComponentVNode)(2, r.CellBase, {
    isFirstGroupCell: u,
    isLastGroupCell: d,
    className: n,
    ariaLabel: t,
    children: [!l && s, !!l && l({
      index: i.index,
      data: i.data
    })]
  });
}
exports.viewFunction = m;
var _ = Object.create(Object.prototype, g(Object.getOwnPropertyDescriptors(r.CellBaseProps), Object.getOwnPropertyDescriptors({
  otherMonth: false,
  today: false,
  firstDayOfMonth: false,
  isSelected: false,
  isFocused: false
})));
exports.DateTableCellBaseProps = _;
var v = function (e) {
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
  p(t, n);
  var a;
  var r;
  var f;
  var _ = i.prototype;
  _.componentWillUpdate = function (e, t, n) {
    if (this.props.allDay !== e.allDay || this.props.contentTemplateProps !== e.contentTemplateProps || this.props.endDate !== e.endDate || this.props.groupIndex !== e.groupIndex || this.props.groups !== e.groups || this.props.index !== e.index || this.props.startDate !== e.startDate) {
      this.__getterCache.dataCellTemplateProps = undefined;
    }
  };
  _.render = function () {
    var e;
    var t = this.props;
    return m({
      props: g({}, t, {
        dataCellTemplate: (e = t.dataCellTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, g({}, t)));
        } : e))
      }),
      classes: this.classes,
      dataCellTemplateProps: this.dataCellTemplateProps,
      ariaLabel: this.ariaLabel,
      restAttributes: this.restAttributes
    });
  };
  a = i;
  if (r = [{
    key: "classes",
    get: function () {
      var e;
      var t = this.props;
      var n = t.allDay;
      var i = t.className;
      var o = t.isFocused;
      var a = t.isSelected;
      return (0, s.combineClasses)((c(e = {
        "dx-scheduler-cell-sizes-horizontal": true,
        "dx-scheduler-cell-sizes-vertical": !n
      }, l.DATE_TABLE_CELL_CLASS, !n), c(e, "dx-state-focused", a), c(e, "dx-scheduler-focused-cell", o), c(e, i, true), e));
    }
  }, {
    key: "dataCellTemplateProps",
    get: function () {
      var e;
      var t;
      var n;
      var i;
      var o;
      var a;
      var r;
      var s = this;
      if (this.__getterCache.dataCellTemplateProps !== undefined) {
        return this.__getterCache.dataCellTemplateProps;
      } else {
        return this.__getterCache.dataCellTemplateProps = (e = s.props, t = e.allDay, n = e.contentTemplateProps, i = e.endDate, o = e.groupIndex, a = e.groups, r = e.index, {
          data: g({
            startDate: e.startDate,
            endDate: i,
            groups: a,
            groupIndex: a ? o : undefined,
            text: "",
            allDay: !!t || undefined
          }, n.data),
          index: r
        });
      }
    }
  }, {
    key: "ariaLabel",
    get: function () {
      if (this.props.isSelected) {
        return "Add appointment";
      } else {
        return undefined;
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
      return d(e, u);
    }
  }]) {
    h(a.prototype, r);
  }
  if (f) {
    h(a, f);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(a.BaseInfernoComponent);
exports.DateTableCellBase = v;
v.defaultProps = _;