exports.default = exports.createAppointmentAdapter = undefined;
var i;
var o = require("./13306.js");
var a = (i = require("./96688.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./48013.js");
var s = require("./88609.js");
var l = require("./86474.js");
function u(e) {
  return (u = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function d(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (u(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (u(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), u(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var c = "startDate";
var h = "endDate";
var f = "allDay";
var p = "text";
var g = "description";
var m = "startDateTimeZone";
var _ = "endDateTimeZone";
var v = "recurrenceRule";
var y = "recurrenceException";
var b = "disabled";
var x = function () {
  function e(e, t, n, i) {
    this.rawAppointment = e;
    this.dataAccessors = t;
    this.timeZoneCalculator = n;
    this.options = i;
  }
  var t;
  var n;
  var i;
  var u = e.prototype;
  u.getField = function (e) {
    return l.ExpressionUtils.getField(this.dataAccessors, e, this.rawAppointment);
  };
  u.setField = function (e, t) {
    return l.ExpressionUtils.setField(this.dataAccessors, e, this.rawAppointment, t);
  };
  u.calculateStartDate = function (e) {
    if (!this.startDate || isNaN(this.startDate.getTime())) {
      throw a.default.Error("E1032", this.text);
    }
    return this.calculateDate(this.startDate, this.startDateTimeZone, e);
  };
  u.calculateEndDate = function (e) {
    return this.calculateDate(this.endDate, this.endDateTimeZone, e);
  };
  u.calculateDate = function (e, t, n) {
    if (e) {
      return this.timeZoneCalculator.createDate(e, {
        appointmentTimeZone: t,
        path: n
      });
    }
  };
  u.clone = function (t = undefined) {
    var n = new e((0, r.deepExtendArraySafe)({}, this.rawAppointment), this.dataAccessors, this.timeZoneCalculator, t);
    if (t != null && t.pathTimeZone) {
      n.startDate = n.calculateStartDate(t.pathTimeZone);
      n.endDate = n.calculateEndDate(t.pathTimeZone);
    }
    return n;
  };
  u.source = function (e = false) {
    if (e) {
      var t = this.clone();
      t.startDate = this.startDate;
      t.endDate = this.endDate;
      return t.source();
    }
    return (0, o.extend)({}, this.rawAppointment);
  };
  t = e;
  if (n = [{
    key: "duration",
    get: function () {
      if (this.endDate) {
        return this.endDate - this.startDate;
      } else {
        return 0;
      }
    }
  }, {
    key: "startDate",
    get: function () {
      var e = this.getField(c);
      if (e === undefined) {
        return e;
      } else {
        return new Date(e);
      }
    },
    set: function (e) {
      this.setField(c, e);
    }
  }, {
    key: "endDate",
    get: function () {
      var e = this.getField(h);
      if (e === undefined) {
        return e;
      } else {
        return new Date(e);
      }
    },
    set: function (e) {
      this.setField(h, e);
    }
  }, {
    key: "allDay",
    get: function () {
      return this.getField(f);
    },
    set: function (e) {
      this.setField(f, e);
    }
  }, {
    key: "text",
    get: function () {
      return this.getField(p);
    },
    set: function (e) {
      this.setField(p, e);
    }
  }, {
    key: "description",
    get: function () {
      return this.getField(g);
    },
    set: function (e) {
      this.setField(g, e);
    }
  }, {
    key: "startDateTimeZone",
    get: function () {
      return this.getField(m);
    }
  }, {
    key: "endDateTimeZone",
    get: function () {
      return this.getField(_);
    }
  }, {
    key: "recurrenceRule",
    get: function () {
      return this.getField(v);
    },
    set: function (e) {
      this.setField(v, e);
    }
  }, {
    key: "recurrenceException",
    get: function () {
      return this.getField(y);
    },
    set: function (e) {
      this.setField(y, e);
    }
  }, {
    key: "disabled",
    get: function () {
      return !!this.getField(b);
    }
  }, {
    key: "isRecurrent",
    get: function () {
      return (0, s.getRecurrenceProcessor)().isValidRecurrenceRule(this.recurrenceRule);
    }
  }]) {
    d(t.prototype, n);
  }
  if (i) {
    d(t, i);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
var w = x;
exports.default = w;
exports.createAppointmentAdapter = function (e, t, n, i) {
  return new x(e, t, n, i);
};