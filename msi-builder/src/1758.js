exports.AppointmentFilterVirtualStrategy = exports.AppointmentFilterBaseStrategy = undefined;
var i = m(require("./91198.js"));
var o = require("./88609.js");
var a = require("./89386.js");
var r = require("./95479.js");
var s = require("./35922.js");
var l = m(require("./96687.js"));
var u = require("./5480.js");
var d = require("./31486.js");
var c = require("./45985.js");
var h = require("./98140.js");
var f = require("./11305.js");
var p = m(require("./97601.js"));
var g = require("./96801.js");
function m(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function _(e) {
  return (_ = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function y() {
  return (y = Object.assign ? Object.assign.bind() : function (e) {
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
function b(e, t) {
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return x(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return x(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function x(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function w(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (_(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (_(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), _(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
function C(e, t, n) {
  if (t) {
    w(e.prototype, t);
  }
  if (n) {
    w(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
var S = i.default.dateToMilliseconds;
var k = "virtual";
var D = "standard";
var I = function () {
  function e(e) {
    this.options = e;
    this.dataAccessors = this.options.dataAccessors;
    this._init();
  }
  var t = e.prototype;
  t._resolveOption = function (e) {
    var t = this.options[e];
    if (typeof t == "function") {
      return t();
    } else {
      return t;
    }
  };
  t._init = function () {
    this.setDataAccessors(this.dataAccessors);
  };
  t.filter = function (e) {
    var t;
    var n = this.dateRange;
    if (!this.showAllDayPanel && this.supportAllDayRow) {
      t = false;
    }
    return this.filterLoadedAppointments({
      startDayHour: this.viewStartDayHour,
      endDayHour: this.viewEndDayHour,
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour,
      min: n[0],
      max: n[1],
      resources: this.loadedResources,
      allDay: t,
      supportMultiDayAppointments: (0, c.isTimelineView)(this.viewType),
      firstDayOfWeek: this.firstDayOfWeek
    }, e);
  };
  t.hasAllDayAppointments = function (e, t) {
    var n = this;
    var i = e.map(function (e) {
      return (0, u.createAppointmentAdapter)(e, n.dataAccessors, n.timeZoneCalculator);
    });
    var o = false;
    (0, r.each)(i, function (e, t) {
      if ((0, g.getAppointmentTakesAllDay)(t, n.viewStartDayHour, n.viewEndDayHour, n.allDayPanelMode)) {
        o = true;
        return false;
      }
    });
    return o;
  };
  t.setDataAccessors = function (e) {
    this.dataAccessors = e;
  };
  t._createAllDayAppointmentFilter = function (e) {
    var t = this;
    var n = e.viewStartDayHour;
    var i = e.viewEndDayHour;
    return [[function (e) {
      return (0, g.getAppointmentTakesAllDay)(e, n, i, t.allDayPanelMode);
    }]];
  };
  t._createCombinedFilter = function (e) {
    var t = this;
    var n = new Date(e.min);
    var o = new Date(e.max);
    var a = e.startDayHour;
    var r = e.endDayHour;
    var l = e.viewStartDayHour;
    var u = e.viewEndDayHour;
    var d = e.resources;
    var c = e.firstDayOfWeek;
    var h = e.checkIntersectViewport;
    var m = e.supportMultiDayAppointments;
    var _ = b((0, p.default)(n, o), 2);
    var v = _[0];
    var x = _[1];
    var w = (0, s.isDefined)(this.dataAccessors.getter.recurrenceRule);
    return [[function (p) {
      var _;
      if ((_ = p.visible) !== null && _ !== undefined && !_) {
        return false;
      }
      var b = p.startDate;
      var C = p.endDate;
      var S = p.hasRecurrenceRule;
      if (!S && (!(C >= v) || !(b < x)) && (!i.default.sameDate(C, v) || !i.default.sameDate(b, v))) {
        return false;
      }
      var k = (0, g.getAppointmentTakesAllDay)(p, l, u, t.allDayPanelMode);
      var D = (0, f.getAppointmentTakesSeveralDays)(p);
      var I = p.allDay;
      var T = D || k;
      if (d != null && d.length && !t._filterAppointmentByResources(p.rawAppointment, d)) {
        return false;
      }
      if (k && e.allDay === false) {
        return false;
      }
      if (S) {
        var E = (0, f.getRecurrenceException)(p, t.timeZoneCalculator, t.timezone);
        if (!t._filterAppointmentByRRule(y({}, p, {
          recurrenceException: E,
          allDay: k
        }), n, o, a, r, c)) {
          return false;
        }
      }
      return (!!I || !m || !T || !(C < n) || !!w && (!w || !!S)) && (!(0, s.isDefined)(a) || !!w && !!e.isVirtualScrolling || !!(0, f.compareDateWithStartDayHour)(b, C, a, k, D)) && (!(0, s.isDefined)(r) || !!(0, f.compareDateWithEndDayHour)({
        startDate: b,
        endDate: C,
        startDayHour: a,
        endDayHour: r,
        viewStartDayHour: l,
        viewEndDayHour: u,
        allDay: k,
        severalDays: D,
        min: n,
        max: o,
        checkIntersectViewport: h
      })) && (!!I || !!T && !m || !(C < n) || !w || !!S);
    }]];
  };
  t._createAppointmentFilter = function (e) {
    return this._createCombinedFilter(e);
  };
  t._filterAppointmentByResources = function (e, t) {
    var n = this;
    var i = function (i, o) {
      var l;
      var u = n.dataAccessors.resources.getter[i];
      if ((0, s.isFunction)(u)) {
        l = u(e);
      }
      for (var c = (0, a.wrapToArray)(l), h = (0, r.map)(t[o].items, function (e) {
          return e.id;
        }), f = 0; f < c.length; f++) {
        if ((0, d.hasResourceValue)(h, c[f])) {
          return true;
        }
      }
      return false;
    };
    var o = false;
    for (var l = 0; l < t.length; l++) {
      if (!(o = i(t[l].name, l))) {
        return false;
      }
    }
    return o;
  };
  t._filterAppointmentByRRule = function (e, t, n, i, a, r) {
    var s = e.recurrenceRule;
    var l = e.recurrenceException;
    var u = e.allDay;
    var d = true;
    var c = e.startDate;
    var h = e.endDate;
    var g = (0, o.getRecurrenceProcessor)();
    if (u || (0, f._appointmentPartInInterval)(c, h, i, a)) {
      var m = b((0, p.default)(t, n), 2);
      var _ = m[0];
      var v = m[1];
      t = _;
      n = new Date(v.getTime() - S("minute"));
    }
    if (s && !g.isValidRecurrenceRule(s)) {
      d = h > t && c <= n;
    }
    if (d && g.isValidRecurrenceRule(s)) {
      d = g.hasRecurrence({
        rule: s,
        exception: l,
        start: c,
        end: h,
        min: t,
        max: n,
        firstDayOfWeek: r,
        appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(c, e.startDateTimeZone, false)
      });
    }
    return d;
  };
  t.filterLoadedAppointments = function (e, t) {
    return this.filterPreparedItems(e, t).map(function (e) {
      return e.rawAppointment;
    });
  };
  t.filterPreparedItems = function (e, t) {
    var n = this._createAppointmentFilter(e);
    return (0, l.default)(t).filter(n).toArray();
  };
  t.filterAllDayAppointments = function (e, t) {
    var n = this._createAllDayAppointmentFilter(e);
    return (0, l.default)(t).filter(n).toArray().map(function (e) {
      return e.rawAppointment;
    });
  };
  C(e, [{
    key: "strategyName",
    get: function () {
      return D;
    }
  }, {
    key: "timeZoneCalculator",
    get: function () {
      return this.options.timeZoneCalculator;
    }
  }, {
    key: "viewStartDayHour",
    get: function () {
      return this.options.startDayHour;
    }
  }, {
    key: "viewEndDayHour",
    get: function () {
      return this.options.endDayHour;
    }
  }, {
    key: "timezone",
    get: function () {
      return this.options.timezone;
    }
  }, {
    key: "firstDayOfWeek",
    get: function () {
      return this.options.firstDayOfWeek;
    }
  }, {
    key: "showAllDayPanel",
    get: function () {
      return this.options.showAllDayPanel;
    }
  }, {
    key: "loadedResources",
    get: function () {
      return this._resolveOption("loadedResources");
    }
  }, {
    key: "supportAllDayRow",
    get: function () {
      return this._resolveOption("supportAllDayRow");
    }
  }, {
    key: "viewType",
    get: function () {
      return this._resolveOption("viewType");
    }
  }, {
    key: "viewDirection",
    get: function () {
      return this._resolveOption("viewDirection");
    }
  }, {
    key: "dateRange",
    get: function () {
      return this._resolveOption("dateRange");
    }
  }, {
    key: "groupCount",
    get: function () {
      return this._resolveOption("groupCount");
    }
  }, {
    key: "viewDataProvider",
    get: function () {
      return this._resolveOption("viewDataProvider");
    }
  }, {
    key: "allDayPanelMode",
    get: function () {
      return this._resolveOption("allDayPanelMode");
    }
  }]);
  return e;
}();
exports.AppointmentFilterBaseStrategy = I;
var T = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  v(t, n);
  var o = i.prototype;
  o.filter = function (e) {
    var t = this;
    var n = S("hour");
    var i = (0, c.isDateAndTimeView)(this.viewType);
    var o = i && this.viewDirection === "horizontal";
    var a = !this.supportAllDayRow;
    var r = this.showAllDayPanel || a;
    var s = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
    var l = [];
    this.viewDataProvider.getCompletedGroupsInfo().forEach(function (e) {
      var u = e.groupIndex;
      var d = e.startDate;
      var h = new Date(Math.min(e.endDate, s));
      var f = i ? d.getHours() : t.viewStartDayHour;
      var p = i ? f + d.getMinutes() / 60 + (h - d) / n : t.viewEndDayHour;
      var g = t._getPrerenderFilterResources(u);
      var m = t.viewDataProvider.hasGroupAllDayPanel(u);
      var _ = a || !!r && m;
      l.push({
        isVirtualScrolling: true,
        startDayHour: f,
        endDayHour: p,
        viewStartDayHour: t.viewStartDayHour,
        viewEndDayHour: t.viewEndDayHour,
        min: d,
        max: h,
        supportMultiDayAppointments: (0, c.isTimelineView)(t.viewType),
        allDay: _,
        resources: g,
        firstDayOfWeek: t.firstDayOfWeek,
        checkIntersectViewport: o
      });
    });
    return this.filterLoadedAppointments({
      filterOptions: l,
      groupCount: this.groupCount
    }, e);
  };
  o.filterPreparedItems = function (e, t) {
    var n = this;
    var i = e.filterOptions;
    var o = e.groupCount;
    var a = [];
    var r = t;
    if (o > 0) {
      r = r.filter(function (e) {
        var t = e.rawAppointment;
        for (var o = 0; o < i.length; ++o) {
          var a = i[o].resources;
          if (n._filterAppointmentByResources(t, a)) {
            return true;
          }
        }
      });
    }
    i.forEach(function (e) {
      if (a.length) {
        a.push("or");
      }
      var t = n._createAppointmentFilter(e);
      a.push(t);
    });
    return (0, l.default)(r).filter(a).toArray();
  };
  o.hasAllDayAppointments = function (e, t) {
    return this.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }, t).length > 0;
  };
  o._getPrerenderFilterResources = function (e) {
    var t = this.viewDataProvider.getCellsGroup(e);
    return (0, h.getResourcesDataByGroups)(this.loadedResources, this.resources, [t]);
  };
  C(i, [{
    key: "strategyName",
    get: function () {
      return k;
    }
  }, {
    key: "resources",
    get: function () {
      return this.options.resources;
    }
  }]);
  return i;
}(I);
exports.AppointmentFilterVirtualStrategy = T;