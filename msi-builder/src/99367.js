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
exports.viewFunction = exports.OverflowIndicatorProps = exports.OverflowIndicator = undefined;
var o;
var a = require("./55285.js");
var r = require("./44105.js");
var s = require("./86237.js");
var l = require("./36729.js");
var u = require("./86553.js");
var d = (o = require("./28109.js")) && o.__esModule ? o : {
  default: o
};
var c = require("./32125.js");
var h = require("./84154.js");
var f = ["groups", "overflowIndicatorTemplate", "viewModel"];
function p(e, t) {
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
function g(e, t) {
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
  var i = e.props.overflowIndicatorTemplate;
  var o = e.styles;
  var s = e.text;
  return (0, a.createComponentVNode)(2, l.Button, {
    style: (0, r.normalizeStyles)(o),
    className: t,
    type: "default",
    stylingMode: "contained",
    children: i ? i({
      data: n
    }) : (0, a.createVNode)(1, "span", null, s, 0)
  });
}
exports.viewFunction = v;
var y = {};
exports.OverflowIndicatorProps = y;
var b = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    (n = e.call(this, t) || this).state = {
      color: undefined
    };
    n.updateStylesEffect = n.updateStylesEffect.bind(function (e) {
      if (e === undefined) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return e;
    }(n));
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  m(t, n);
  var o;
  var l;
  var y;
  var b = i.prototype;
  b.createEffects = function () {
    return [new r.InfernoEffect(this.updateStylesEffect, [this.props.groups, this.props.viewModel, this.appointmentsContextValue])];
  };
  b.updateEffects = function () {
    var e;
    if ((e = this._effects[0]) !== null && e !== undefined) {
      e.update([this.props.groups, this.props.viewModel, this.appointmentsContextValue]);
    }
  };
  b.updateStylesEffect = function () {
    var e = this;
    var t = this.props;
    var n = t.groups;
    var i = t.viewModel;
    (0, u.getIndicatorColor)(this.appointmentsContextValue, i, n).then(function (t) {
      e.setState(function (e) {
        return {
          color: t
        };
      });
    });
  };
  b.render = function () {
    var e;
    var t = this.props;
    return v({
      props: _({}, t, {
        overflowIndicatorTemplate: (e = t.overflowIndicatorTemplate, e && (e.defaultProps ? function (t) {
          return (0, a.normalizeProps)((0, a.createComponentVNode)(2, e, _({}, t)));
        } : e))
      }),
      color: this.state.color,
      appointmentsContextValue: this.appointmentsContextValue,
      data: this.data,
      text: this.text,
      appointmentStyles: this.appointmentStyles,
      styles: this.styles,
      classes: this.classes,
      restAttributes: this.restAttributes
    });
  };
  o = i;
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
    key: "data",
    get: function () {
      return {
        appointmentCount: this.props.viewModel.items.settings.length,
        isCompact: this.props.viewModel.isCompact
      };
    }
  }, {
    key: "text",
    get: function () {
      var e = this.props.viewModel.isCompact;
      var t = this.data.appointmentCount;
      if (e) {
        return `${t}`;
      } else {
        return d.default.getFormatter("dxScheduler-moreAppointments")(t);
      }
    }
  }, {
    key: "appointmentStyles",
    get: function () {
      return (0, u.getOverflowIndicatorStyles)(this.props.viewModel);
    }
  }, {
    key: "styles",
    get: function () {
      return (0, h.mergeStylesWithColor)(this.state.color, this.appointmentStyles);
    }
  }, {
    key: "classes",
    get: function () {
      return (0, s.combineClasses)({
        "dx-scheduler-appointment-collector": true,
        "dx-scheduler-appointment-collector-compact": this.data.isCompact
      });
    }
  }, {
    key: "restAttributes",
    get: function () {
      var e = this.props;
      e.groups;
      e.overflowIndicatorTemplate;
      e.viewModel;
      return p(e, f);
    }
  }]) {
    g(o.prototype, l);
  }
  if (y) {
    g(o, y);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(r.InfernoComponent);
exports.OverflowIndicator = b;
b.defaultProps = y;