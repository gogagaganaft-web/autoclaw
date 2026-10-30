exports.utils = undefined;
var i = require("./58664.js");
var o = d(require("./68374.js"));
var a = require("./95479.js");
var r = require("./27728.js");
var s = require("./6415.js");
var l = require("./47617.js");
var u = d(require("./69434.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
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
var h = {
  dataAccessors: {
    getAppointmentSettings: function (e) {
      return (0, o.default)(e).data(r.APPOINTMENT_SETTINGS_KEY);
    },
    getAppointmentInfo: function (e) {
      var t = h.dataAccessors.getAppointmentSettings(e);
      if (t == null) {
        return undefined;
      } else {
        return t.info;
      }
    },
    create: function (e, t, n, i) {
      var o = t ? c({}, t) : {
        getter: {},
        setter: {},
        expr: {}
      };
      (0, a.each)(e, function (e, t) {
        if (t) {
          var a;
          var r;
          var s;
          var d = (0, l.compileGetter)(t);
          var c = (0, l.compileSetter)(t);
          if ((h = e) === "startDate" || h === "endDate") {
            a = function (e) {
              var t = d(e);
              if (n) {
                t = u.default.deserializeDate(t);
              }
              return t;
            };
            r = function (e, t) {
              if (i) {
                s = i;
              } else if (n && !s) {
                var o = d(e);
                s = u.default.getDateSerializationFormat(o);
              }
              var a = u.default.serializeDate(t, s);
              c(e, a);
            };
          }
          o.getter[e] = a || d;
          o.setter[e] = r || c;
          o.expr[`${e}Expr`] = t;
        } else {
          delete o.getter[e];
          delete o.setter[e];
          delete o.expr[`${e}Expr`];
        }
        var h;
      });
      return o;
    }
  },
  DOM: {
    getHeaderHeight: function (e) {
      if (e) {
        return e._$element && parseInt((0, i.getOuterHeight)(e._$element), 10);
      } else {
        return 0;
      }
    }
  },
  renovation: {
    renderComponent: function (e, t, n, o, a) {
      var r = e[o];
      if (r) {
        var l = r.$element();
        var u = l.get(0).style;
        var d = u.height;
        var c = u.width;
        r.option(a);
        if (d) {
          (0, i.setHeight)(l, d);
        }
        if (c) {
          (0, i.setWidth)(l, c);
        }
      } else {
        var h = (0, s.getPublicElement)(t);
        r = e._createComponent(h, n, a);
        e[o] = r;
      }
    }
  }
};
exports.utils = h;