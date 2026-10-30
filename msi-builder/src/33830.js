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
exports.viewFunction = exports.AppointmentContentProps = exports.AppointmentContent = undefined;
var o = require("./55285.js");
var a = require("./44105.js");
var r = require("./26011.js");
var s = require("./69190.js");
var l = ["appointmentTemplate", "data", "dateText", "hideReducedIconTooltip", "index", "isRecurrent", "isReduced", "showReducedIconTooltip", "text"];
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
function c(e) {
  if (e === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return e;
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
  var t = e.props;
  var n = t.appointmentTemplate;
  var i = t.data;
  var a = t.dateText;
  var l = t.index;
  var u = t.isRecurrent;
  var d = t.isReduced;
  var c = t.text;
  var h = e.refReducedIcon;
  var f = n;
  return (0, o.createVNode)(1, "div", "dx-scheduler-appointment-content", n ? f({
    data: i,
    index: l
  }) : (0, o.createFragment)([(0, o.createComponentVNode)(2, s.AppointmentTitle, {
    text: c
  }), (0, o.createComponentVNode)(2, r.AppointmentDetails, {
    dateText: a
  }), u && (0, o.createVNode)(1, "div", "dx-scheduler-appointment-recurrence-icon dx-icon-repeat"), d && (0, o.createVNode)(1, "div", "dx-scheduler-appointment-reduced-icon", null, 1, null, null, h)], 0), 0);
}
exports.viewFunction = p;
var g = {
  text: "",
  dateText: "",
  isRecurrent: false,
  isReduced: false,
  index: 0
};
exports.AppointmentContentProps = g;
var m = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {};
    n.refReducedIcon = (0, o.createRef)();
    n.bindHoverEffect = n.bindHoverEffect.bind(c(n));
    n.onReducedIconMouseEnter = n.onReducedIconMouseEnter.bind(c(n));
    n.onReducedIconMouseLeave = n.onReducedIconMouseLeave.bind(c(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var r;
  var s;
  var g;
  var m = i.prototype;
  m.createEffects = function () {
    return [new a.InfernoEffect(this.bindHoverEffect, [this.props.showReducedIconTooltip, this.props.data, this.props.hideReducedIconTooltip])];
  };
  m.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.props.showReducedIconTooltip, this.props.data, this.props.hideReducedIconTooltip]);
    }
  };
  m.bindHoverEffect = function () {
    var e;
    var t;
    var n = this;
    function i() {
      return n.onReducedIconMouseEnter();
    }
    function o() {
      return n.onReducedIconMouseLeave();
    }
    if ((e = this.refReducedIcon.current) !== null && e !== undefined) {
      e.addEventListener("mouseenter", i);
    }
    if ((t = this.refReducedIcon.current) !== null && t !== undefined) {
      t.addEventListener("mouseleave", o);
    }
    return function () {
      var e;
      var t;
      if ((e = n.refReducedIcon.current) !== null && e !== undefined) {
        e.removeEventListener("mouseenter", i);
      }
      if ((t = n.refReducedIcon.current) !== null && t !== undefined) {
        t.removeEventListener("mouseleave", o);
      }
    };
  };
  m.onReducedIconMouseEnter = function () {
    this.props.showReducedIconTooltip({
      target: this.refReducedIcon.current,
      endDate: this.props.data.appointmentData.endDate
    });
  };
  m.onReducedIconMouseLeave = function () {
    this.props.hideReducedIconTooltip();
  };
  m.render = function () {
    var e;
    var t = this.props;
    return p({
      props: f({}, t, {
        appointmentTemplate: (e = t.appointmentTemplate, e && (e.defaultProps ? function (t) {
          return (0, o.normalizeProps)((0, o.createComponentVNode)(2, e, f({}, t)));
        } : e))
      }),
      refReducedIcon: this.refReducedIcon,
      onReducedIconMouseEnter: this.onReducedIconMouseEnter,
      onReducedIconMouseLeave: this.onReducedIconMouseLeave,
      restAttributes: this.restAttributes
    });
  };
  r = i;
  if (s = [{
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.appointmentTemplate;
      e.data;
      e.dateText;
      e.hideReducedIconTooltip;
      e.index;
      e.isRecurrent;
      e.isReduced;
      e.showReducedIconTooltip;
      e.text;
      return u(e, l);
    }
  }]) {
    d(r.prototype, s);
  }
  if (g) {
    d(r, g);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return i;
}(a.InfernoComponent);
exports.AppointmentContent = m;
m.defaultProps = g;