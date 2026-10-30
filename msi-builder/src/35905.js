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
exports.viewFunction = exports.AppointmentProps = exports.Appointment = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./84154.js");
var s = require("./33830.js");
var l = require("./73687.js");
var u = require("./86237.js");
var d = require("./43450.js");
var c = require("./32125.js");
var h = ["appointmentTemplate", "groups", "hideReducedIconTooltip", "index", "onItemClick", "onItemDoubleClick", "showReducedIconTooltip", "viewModel"];
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
function _() {
  return (_ = Object.assign ? Object.assign.bind() : function (e) {
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
function v(e) {
  var t = e.classes;
  var n = e.data;
  var i = e.dateText;
  var r = e.isReduced;
  var u = e.onItemClick;
  var d = e.props;
  var c = d.appointmentTemplate;
  var h = d.hideReducedIconTooltip;
  var f = d.index;
  var p = d.showReducedIconTooltip;
  var g = d.viewModel.info.isRecurrent;
  var m = e.ref;
  var v = e.styles;
  var y = e.text;
  return (0, o.normalizeProps)((0, o.createComponentVNode)(2, l.Widget, _({
    focusStateEnabled: true,
    onClick: u,
    rootElementRef: m,
    style: (0, a.normalizeStyles)(v),
    classes: t,
    hint: y
  }, {
    role: "button",
    "data-index": f
  }, {
    children: (0, o.createComponentVNode)(2, s.AppointmentContent, {
      text: y,
      isReduced: r,
      dateText: i,
      isRecurrent: g,
      index: f,
      data: n,
      showReducedIconTooltip: p,
      hideReducedIconTooltip: h,
      appointmentTemplate: c
    })
  })));
}
exports.viewFunction = v;
var y = {
  index: 0
};
exports.AppointmentProps = y;
var b = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).ref = (0, o.createRef)();
    n.state = {
      color: undefined
    };
    n.updateStylesEffect = n.updateStylesEffect.bind(g(n));
    n.bindDoubleClickEffect = n.bindDoubleClickEffect.bind(g(n));
    n.onItemClick = n.onItemClick.bind(g(n));
    n.onItemDoubleClick = n.onItemDoubleClick.bind(g(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var s;
  var l;
  var y;
  var b = i.prototype;
  b.createEffects = function () {
    return [new a.InfernoEffect(this.updateStylesEffect, [this.props.viewModel, this.appointmentsContextValue, this.props.groups]), new a.InfernoEffect(this.bindDoubleClickEffect, [])];
  };
  b.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.props.viewModel, this.appointmentsContextValue, this.props.groups]);
    }
  };
  b.updateStylesEffect = function () {
    var t = this;
    var n = this.props.viewModel;
    var i = n.info.groupIndex ?? 0;
    var o = n.appointment;
    (0, d.getAppointmentColor)({
      resources: this.appointmentsContextValue.resources,
      resourceLoaderMap: this.appointmentsContextValue.resourceLoaderMap,
      resourcesDataAccessors: this.appointmentsContextValue.dataAccessors.resources,
      loadedResources: this.appointmentsContextValue.loadedResources
    }, {
      itemData: o,
      groupIndex: i,
      groups: this.props.groups
    }).then(function (e) {
      t.setState(function (t) {
        return {
          color: e
        };
      });
    }).catch(function () {
      return "";
    });
  };
  b.bindDoubleClickEffect = function () {
    var e;
    var t = this;
    function n() {
      return t.onItemDoubleClick();
    }
    if ((e = this.ref.current) !== null && e !== undefined) {
      e.addEventListener("dblclick", n);
    }
    return function () {
      var e;
      if ((e = t.ref.current) !== null && e !== undefined) {
        e.removeEventListener("dblclick", n);
      }
    };
  };
  b.onItemClick = function () {
    var e = {
      data: [this.props.viewModel],
      target: this.ref.current,
      index: this.props.index
    };
    this.props.onItemClick(e);
  };
  b.onItemDoubleClick = function () {
    var e = {
      data: [this.props.viewModel],
      target: this.ref.current,
      index: this.props.index
    };
    this.props.onItemDoubleClick(e);
  };
  b.render = function () {
    var e;
    var t = this.props;
    return v({
      props: _({}, t, {
        appointmentTemplate: (e = t.appointmentTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, _({}, t)));
        } : e))
      }),
      color: this.state.color,
      ref: this.ref,
      appointmentsContextValue: this.appointmentsContextValue,
      appointmentStyles: this.appointmentStyles,
      styles: this.styles,
      text: this.text,
      isReduced: this.isReduced,
      classes: this.classes,
      dateText: this.dateText,
      data: this.data,
      onItemClick: this.onItemClick,
      onItemDoubleClick: this.onItemDoubleClick,
      restAttributes: this.restAttributes
    });
  };
  s = i;
  if (l = [{
    key: "appointmentsContextValue",
    get: function () {
      if (this.context[c.AppointmentsContext.id]) {
        return this.context[c.AppointmentsContext.id];
      } else {
        return c.AppointmentsContext.defaultValue;
      }
    }
  }, {
    key: "appointmentStyles",
    get: function () {
      return (0, r.getAppointmentStyles)(this.props.viewModel);
    }
  }, {
    key: "styles",
    get: function () {
      return (0, r.mergeStylesWithColor)(this.state.color, this.appointmentStyles);
    }
  }, {
    key: "text",
    get: function () {
      return this.props.viewModel.appointment.text;
    }
  }, {
    key: "isReduced",
    get: function () {
      return !!this.props.viewModel.info.appointmentReduced;
    }
  }, {
    key: "classes",
    get: function () {
      var e = this.props.viewModel;
      var t = e.focused;
      var n = e.info;
      var i = n.allDay;
      var o = n.appointmentReduced;
      var a = n.direction;
      var r = n.isRecurrent;
      var s = a === "vertical";
      return (0, u.combineClasses)({
        "dx-state-focused": !!t,
        "dx-scheduler-appointment": true,
        "dx-scheduler-appointment-horizontal": !s,
        "dx-scheduler-appointment-vertical": s,
        "dx-scheduler-appointment-recurrence": r,
        "dx-scheduler-all-day-appointment": i,
        "dx-scheduler-appointment-reduced": this.isReduced,
        "dx-scheduler-appointment-head": o === "head",
        "dx-scheduler-appointment-body": o === "body",
        "dx-scheduler-appointment-tail": o === "tail"
      });
    }
  }, {
    key: "dateText",
    get: function () {
      return this.props.viewModel.info.dateText;
    }
  }, {
    key: "data",
    get: function () {
      return {
        appointmentData: this.props.viewModel.info.appointment,
        targetedAppointmentData: this.props.viewModel.appointment
      };
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.appointmentTemplate;
      e.groups;
      e.hideReducedIconTooltip;
      e.index;
      e.onItemClick;
      e.onItemDoubleClick;
      e.showReducedIconTooltip;
      e.viewModel;
      return f(e, h);
    }
  }]) {
    p(s.prototype, l);
  }
  if (y) {
    p(s, y);
  }
  Object.defineProperty(s, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoComponent);
exports.Appointment = b;
b.defaultProps = y;