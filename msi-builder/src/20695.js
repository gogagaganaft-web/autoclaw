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
exports.viewFunction = exports.AppointmentLayoutProps = exports.AppointmentLayout = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./35905.js");
var s = require("./99367.js");
var l = require("./86237.js");
var u = require("./32125.js");
var d = require("./19828.js");
var c = ["isAllDay"];
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
function g(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
}
function m(e, t) {
  return (m = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var _ = ".dx-scheduler-appointment";
var v = "dx-scheduler-all-day-appointment";
var y = "dx-scheduler-appointment-collector";
function b(e) {
  var t = e.appointments;
  var n = e.appointmentsContextValue;
  var i = n.appointmentTemplate;
  var a = n.groups;
  var l = n.hideReducedIconTooltip;
  var u = n.onAppointmentClick;
  var d = n.onAppointmentDoubleClick;
  var c = n.overflowIndicatorTemplate;
  var h = n.showReducedIconTooltip;
  var f = e.classes;
  var p = e.layoutRef;
  var g = e.overflowIndicators;
  return (0, o.createVNode)(1, "div", f, [t.map(function (e, t) {
    return (0, o.createComponentVNode)(2, r.Appointment, {
      viewModel: e,
      appointmentTemplate: i,
      index: t,
      groups: a,
      onItemClick: u,
      onItemDoubleClick: d,
      showReducedIconTooltip: h,
      hideReducedIconTooltip: l
    }, e.key);
  }), g.map(function (e, t) {
    return (0, o.createComponentVNode)(2, s.OverflowIndicator, {
      viewModel: e,
      groups: a,
      overflowIndicatorTemplate: c,
      "data-index": t
    }, e.key);
  })], 0, null, null, p);
}
exports.viewFunction = b;
var x = {
  isAllDay: false
};
exports.AppointmentLayoutProps = x;
var w = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.layoutRef = (0, o.createRef)();
    n.__getterCache = {};
    n.pointerEventsEffect = n.pointerEventsEffect.bind(g(n));
    n.onAppointmentPointerDown = n.onAppointmentPointerDown.bind(g(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var r;
  var s;
  var x;
  var w = i.prototype;
  w.createEffects = function () {
    return [new a.InfernoEffect(this.pointerEventsEffect, [this.appointmentsContextValue]), (0, a.createReRenderEffect)()];
  };
  w.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.appointmentsContextValue]);
    }
  };
  w.pointerEventsEffect = function () {
    var e = this;
    var t = (0, d.subscribeToDXPointerDownEvent)(this.layoutRef.current, function (t) {
      return e.onAppointmentPointerDown(t);
    });
    return function () {
      t();
    };
  };
  w.onAppointmentPointerDown = function (e) {
    var t = e.target.closest(_);
    if (t) {
      var n = t.dataset.index;
      var i = n ? parseInt(n, 10) : -1;
      var o = t.classList.contains(v);
      var a = t.classList.contains(y);
      var r = {
        allDayCompact: o && a,
        allDay: o && !a,
        regularCompact: !o && a,
        regular: !o && !a
      };
      var s = Object.entries(r).filter(function (e) {
        return e[1];
      })[0][0];
      this.appointmentsContextValue.updateFocusedAppointment(s, i);
    }
  };
  w.componentWillUpdate = function (t, n, i) {
    e.prototype.componentWillUpdate.call(this);
    if (this.props.isAllDay !== t.isAllDay || this.context[u.AppointmentsContext.id] !== i[u.AppointmentsContext.id]) {
      this.__getterCache.appointments = undefined;
    }
    if (this.props.isAllDay !== t.isAllDay || this.context[u.AppointmentsContext.id] !== i[u.AppointmentsContext.id]) {
      this.__getterCache.overflowIndicators = undefined;
    }
  };
  w.render = function () {
    var e = this.props;
    return b({
      props: f({}, e),
      layoutRef: this.layoutRef,
      appointmentsContextValue: this.appointmentsContextValue,
      classes: this.classes,
      appointments: this.appointments,
      overflowIndicators: this.overflowIndicators,
      onAppointmentPointerDown: this.onAppointmentPointerDown,
      restAttributes: this.restAttributes
    });
  };
  r = i;
  if (s = [{
    key: "appointmentsContextValue",
    get: function () {
      if (this.context[u.AppointmentsContext.id]) {
        return this.context[u.AppointmentsContext.id];
      } else {
        return u.AppointmentsContext.defaultValue;
      }
    }
  }, {
    key: "classes",
    get: function () {
      var e = this.props.isAllDay;
      return (0, l.combineClasses)({
        "dx-scheduler-scrollable-appointments": !e,
        "dx-scheduler-all-day-appointments": e
      });
    }
  }, {
    key: "appointments",
    get: function () {
      var e = this;
      if (this.__getterCache.appointments !== undefined) {
        return this.__getterCache.appointments;
      } else {
        return this.__getterCache.appointments = e.props.isAllDay ? e.appointmentsContextValue.viewModel.allDay : e.appointmentsContextValue.viewModel.regular;
      }
    }
  }, {
    key: "overflowIndicators",
    get: function () {
      var e = this;
      if (this.__getterCache.overflowIndicators !== undefined) {
        return this.__getterCache.overflowIndicators;
      } else {
        return this.__getterCache.overflowIndicators = e.props.isAllDay ? e.appointmentsContextValue.viewModel.allDayCompact : e.appointmentsContextValue.viewModel.regularCompact;
      }
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.isAllDay;
      return h(e, c);
    }
  }]) {
    p(r.prototype, s);
  }
  if (x) {
    p(r, x);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoWrapperComponent);
exports.AppointmentLayout = w;
w.defaultProps = x;