exports.DateGeneratorVirtualStrategy = exports.DateGeneratorBaseStrategy = exports.AppointmentSettingsGenerator = undefined;
var i = p(require("./91198.js"));
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./88609.js");
var s = p(require("./32511.js"));
var l = require("./98140.js");
var u = require("./5480.js");
var d = require("./18986.js");
var c = require("./86474.js");
var h = require("./45985.js");
var f = require("./36816.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e) {
  return (g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function m(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return b(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || y(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function v(e, t) {
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
  }(e, t) || y(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function y(e, t) {
  if (e) {
    if (typeof e == "string") {
      return b(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    } else if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return b(e, t);
    } else {
      return undefined;
    }
  }
}
function b(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function x() {
  return (x = Object.assign ? Object.assign.bind() : function (e) {
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
function w(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (g(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (g(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), g(a) === "symbol" ? a : String(a)), i);
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
var k = function () {
  function e(e) {
    this.options = e;
  }
  var t = e.prototype;
  t.getIntervalDuration = function () {
    if (this.appointmentTakesAllDay) {
      return this.options.allDayIntervalDuration;
    } else {
      return this.options.intervalDuration;
    }
  };
  t.generate = function (e) {
    var t = this._getGroupIndices(this.rawAppointment);
    var n = this._createAppointments(e, t);
    n = this._getProcessedByAppointmentTimeZone(n, e);
    if (this._canProcessNotNativeTimezoneDates(e)) {
      n = this._getProcessedNotNativeTimezoneDates(n, e);
    }
    var i = this._createGridAppointmentList(n, e);
    var o = this._getAppointmentsFirstViewDate(i);
    this._fillNormalizedStartDate(i, o);
    i = this._cropAppointmentsByStartDayHour(i, o, this.rawAppointment);
    i = this._fillNormalizedEndDate(i, this.rawAppointment);
    if (this._needSeparateLongParts()) {
      i = this._separateLongParts(i, e);
    }
    return {
      dateSettings: i,
      itemGroupIndices: t,
      isRecurrent: e.isRecurrent
    };
  };
  t._getProcessedByAppointmentTimeZone = function (e, t) {
    var n = this;
    if (!(0, o.isEmptyObject)(t.startDateTimeZone) || !(0, o.isEmptyObject)(t.endDateTimeZone)) {
      var i = {
        startDate: this.timeZoneCalculator.getOffsets(t.startDate, t.startDateTimeZone),
        endDate: this.timeZoneCalculator.getOffsets(t.endDate, t.endDateTimeZone)
      };
      e.forEach(function (e) {
        var o = n.timeZoneCalculator.getOffsets(e.startDate, t.startDateTimeZone);
        var a = n.timeZoneCalculator.getOffsets(e.endDate, t.endDateTimeZone);
        var r = i.startDate.appointment - o.appointment;
        var s = i.endDate.appointment - a.appointment;
        if (o.appointment !== o.common) {
          e.startDate = new Date(e.startDate.getTime() + r * S("hour"));
        }
        if (a.appointment !== a.common) {
          e.endDate = new Date(e.endDate.getTime() + s * S("hour"));
        }
      });
    }
    return e;
  };
  t._createAppointments = function (e, t) {
    var n = this._createRecurrenceAppointments(e, t);
    if (!e.isRecurrent && n.length === 0) {
      n.push({
        startDate: e.startDate,
        endDate: e.endDate
      });
    }
    return n = n.map(function (e) {
      var t;
      var n = (t = e.endDate) === null || t === undefined ? undefined : t.getTime();
      if (e.startDate.getTime() === n) {
        e.endDate.setTime(n + S("minute"));
      }
      return x({}, e, {
        exceptionDate: new Date(e.startDate)
      });
    });
  };
  t._canProcessNotNativeTimezoneDates = function (e) {
    return !(0, o.isEmptyObject)(this.timeZone) && !!e.isRecurrent && !s.default.isEqualLocalTimeZone(this.timeZone, e.startDate);
  };
  t._getProcessedNotNativeDateIfCrossDST = function (e, t) {
    if (t < 0) {
      var n = new Date(e);
      var i = new Date(n);
      i.setHours(i.getHours() - 1);
      if (this.timeZoneCalculator.getOffsets(n).common !== this.timeZoneCalculator.getOffsets(i).common) {
        return 0;
      }
    }
    return t;
  };
  t._getCommonOffset = function (e) {
    return this.timeZoneCalculator.getOffsets(e).common;
  };
  t._getProcessedNotNativeTimezoneDates = function (e, t) {
    var n = this;
    return e.map(function (e) {
      var i = n._getCommonOffset(t.startDate) - n._getCommonOffset(e.startDate);
      var o = n._getCommonOffset(t.endDate) - n._getCommonOffset(e.endDate);
      if (i === 0 && o === 0) {
        return e;
      }
      i = n._getProcessedNotNativeDateIfCrossDST(e.startDate, i);
      o = n._getProcessedNotNativeDateIfCrossDST(e.endDate, o);
      var a = new Date(e.startDate.getTime() + i * S("hour"));
      var r = new Date(e.endDate.getTime() + o * S("hour"));
      var s = n.timeZoneCalculator.createDate(a, {
        path: "toGrid"
      });
      var l = n.timeZoneCalculator.createDate(r, {
        path: "toGrid"
      });
      if (t.duration > l.getTime() - s.getTime()) {
        r = new Date(a.getTime() + t.duration);
      }
      return x({}, e, {
        startDate: a,
        endDate: r,
        exceptionDate: new Date(a)
      });
    });
  };
  t._needSeparateLongParts = function () {
    if (this.isVerticalOrientation) {
      return this.isGroupedByDate;
    } else {
      return this.isGroupedByDate && this.appointmentTakesAllDay;
    }
  };
  t.normalizeEndDateByViewEnd = function (e, t) {
    var n = new Date(t.getTime());
    if (!(0, h.isDateAndTimeView)(this.viewType) || !this.appointmentTakesAllDay) {
      var o = i.default.roundToHour(this.endViewDate);
      if (n > o) {
        n = o;
      }
    }
    var a = this.viewEndDayHour;
    var r = c.ExpressionUtils.getField(this.dataAccessors, "allDay", e);
    var s = new Date(new Date(t.getTime()).setHours(a, 0, 0, 0));
    if (n.getTime() > s.getTime() || r && n.getHours() < a) {
      n = s;
    }
    return n;
  };
  t._fillNormalizedEndDate = function (e, t) {
    var n = this;
    return e.map(function (e) {
      var i = e.endDate;
      return x({}, e, {
        normalizedEndDate: n.normalizeEndDateByViewEnd(t, i)
      });
    });
  };
  t._separateLongParts = function (e, t) {
    var n = this;
    var o = [];
    e.forEach(function (e) {
      var a = new Date(n.dateRange[1]);
      var r = e.normalizedEndDate;
      var s = i.default.getDatesOfInterval(e.startDate, r, {
        milliseconds: n.getIntervalDuration(n.appointmentTakesAllDay)
      }).filter(function (e) {
        return new Date(e) < a;
      }).map(function (i) {
        var o = new Date(new Date(i).setMilliseconds(t.duration));
        return {
          startDate: i,
          endDate: o,
          normalizedEndDate: n.normalizeEndDateByViewEnd(n.rawAppointment, o),
          source: e.source
        };
      });
      o = o.concat(s);
    });
    return o;
  };
  t._createGridAppointmentList = function (e, t) {
    var n = this;
    return e.map(function (e) {
      var i = t.startDate.getTimezoneOffset() - e.startDate.getTimezoneOffset();
      if (i !== 0 && n._canProcessNotNativeTimezoneDates(t)) {
        e.startDate = new Date(e.startDate.getTime() + i * S("minute"));
        e.endDate = new Date(e.endDate.getTime() + i * S("minute"));
        e.exceptionDate = new Date(e.startDate);
      }
      return {
        startDate: n.timeZoneCalculator.createDate(e.startDate, {
          path: "toGrid"
        }),
        endDate: n.timeZoneCalculator.createDate(e.endDate, {
          path: "toGrid"
        }),
        allDay: t.allDay || false,
        source: e
      };
    });
  };
  t._createExtremeRecurrenceDates = function () {
    var e = this.appointmentTakesAllDay ? i.default.trimTime(this.dateRange[0]) : this.dateRange[0];
    var t = this.dateRange[1];
    if (this.timeZone) {
      e = this.timeZoneCalculator.createDate(e, {
        path: "fromGrid"
      });
      t = this.timeZoneCalculator.createDate(t, {
        path: "fromGrid"
      });
      var n = s.default.getDaylightOffsetInMs(e, t);
      if (n) {
        t = new Date(t.getTime() + n);
      }
    }
    return [e, t];
  };
  t._createRecurrenceOptions = function (e, t) {
    var n = this;
    var a = v(this._createExtremeRecurrenceDates(t), 2);
    var r = a[0];
    var l = a[1];
    return {
      rule: e.recurrenceRule,
      exception: e.recurrenceException,
      min: r,
      max: l,
      firstDayOfWeek: this.firstDayOfWeek,
      start: e.startDate,
      end: e.endDate,
      appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(e.startDate, e.rawAppointment.startDateTimeZone, true),
      getPostProcessedException: function (t) {
        if ((0, o.isEmptyObject)(n.timeZone) || s.default.isEqualLocalTimeZone(n.timeZone, t)) {
          return t;
        }
        var a = n.timeZoneCalculator.getOffsets(e.startDate).common - n.timeZoneCalculator.getOffsets(t).common;
        a = n._getProcessedNotNativeDateIfCrossDST(t, a);
        return new Date(t.getTime() - a * i.default.dateToMilliseconds("hour"));
      }
    };
  };
  t._createRecurrenceAppointments = function (e, t) {
    var n = e.duration;
    var i = this._createRecurrenceOptions(e);
    return (0, r.getRecurrenceProcessor)().generateDates(i).map(function (e) {
      var t = s.default.createUTCDateWithLocalOffset(e);
      t.setTime(t.getTime() + n);
      var i = s.default.createDateFromUTCWithLocalOffset(t);
      return {
        startDate: new Date(e),
        endDate: i
      };
    });
  };
  t._getAppointmentsFirstViewDate = function (e) {
    var t = this;
    return e.map(function (e) {
      return t._getAppointmentFirstViewDate(e);
    });
  };
  t._fillNormalizedStartDate = function (e, t, n) {
    var i = this;
    e.forEach(function (e, o) {
      e.startDate = i._getAppointmentResultDate({
        appointment: e,
        rawAppointment: n,
        startDate: new Date(e.startDate),
        startDayHour: i.viewStartDayHour,
        firstViewDate: t[o]
      });
    });
  };
  t._cropAppointmentsByStartDayHour = function (e, t) {
    var n = this;
    return e.filter(function (e, i) {
      return !!t[i] && (!!n.appointmentTakesAllDay || e.endDate > e.startDate);
    });
  };
  t._getAppointmentResultDate = function (e) {
    var t;
    var n = e.appointment;
    var o = e.startDayHour;
    var a = e.firstViewDate;
    var r = e.startDate;
    if (this.appointmentTakesAllDay) {
      t = i.default.normalizeDate(r, a);
    } else {
      if (r < a) {
        r = a;
      }
      t = i.default.normalizeDate(n.startDate, r);
    }
    if (this.isDateAppointment) {
      return t;
    } else {
      return i.default.roundDateByStartDayHour(t, o);
    }
  };
  t._getAppointmentFirstViewDate = function (e) {
    var t = e.source.groupIndex || 0;
    var n = e.startDate;
    var i = e.endDate;
    if (this.isAllDayRowAppointment || e.allDay) {
      return this.viewDataProvider.findAllDayGroupCellStartDate(t, n);
    } else {
      return this.viewDataProvider.findGroupCellStartDate(t, n, i, this.isDateAppointment);
    }
  };
  t._getGroupIndices = function (e) {
    var t = this;
    var n = [];
    if (e && this.loadedResources.length) {
      var i = (0, l.createResourcesTree)(this.loadedResources);
      n = (0, l.getResourceTreeLeaves)(function (e, n) {
        return (0, l.getDataAccessors)(t.options.dataAccessors.resources, e, n);
      }, i, e);
    }
    return n;
  };
  C(e, [{
    key: "rawAppointment",
    get: function () {
      return this.options.rawAppointment;
    }
  }, {
    key: "timeZoneCalculator",
    get: function () {
      return this.options.timeZoneCalculator;
    }
  }, {
    key: "viewDataProvider",
    get: function () {
      return this.options.viewDataProvider;
    }
  }, {
    key: "appointmentTakesAllDay",
    get: function () {
      return this.options.appointmentTakesAllDay;
    }
  }, {
    key: "supportAllDayRow",
    get: function () {
      return this.options.supportAllDayRow;
    }
  }, {
    key: "isAllDayRowAppointment",
    get: function () {
      return this.options.isAllDayRowAppointment;
    }
  }, {
    key: "timeZone",
    get: function () {
      return this.options.timeZone;
    }
  }, {
    key: "dateRange",
    get: function () {
      return this.options.dateRange;
    }
  }, {
    key: "firstDayOfWeek",
    get: function () {
      return this.options.firstDayOfWeek;
    }
  }, {
    key: "viewStartDayHour",
    get: function () {
      return this.options.viewStartDayHour;
    }
  }, {
    key: "viewEndDayHour",
    get: function () {
      return this.options.viewEndDayHour;
    }
  }, {
    key: "endViewDate",
    get: function () {
      return this.options.endViewDate;
    }
  }, {
    key: "viewType",
    get: function () {
      return this.options.viewType;
    }
  }, {
    key: "isGroupedByDate",
    get: function () {
      return this.options.isGroupedByDate;
    }
  }, {
    key: "isVerticalOrientation",
    get: function () {
      return this.options.isVerticalGroupOrientation;
    }
  }, {
    key: "dataAccessors",
    get: function () {
      return this.options.dataAccessors;
    }
  }, {
    key: "loadedResources",
    get: function () {
      return this.options.loadedResources;
    }
  }, {
    key: "isDateAppointment",
    get: function () {
      return !(0, h.isDateAndTimeView)(this.viewType) && this.appointmentTakesAllDay;
    }
  }]);
  return e;
}();
exports.DateGeneratorBaseStrategy = k;
var D = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  _(t, n);
  var o = i.prototype;
  o._createRecurrenceAppointments = function (e, t) {
    var n = this;
    var i = e.duration;
    var o = [];
    (this.groupCount ? t : [0]).forEach(function (t) {
      var a = n._createRecurrenceOptions(e, t);
      var l = (0, r.getRecurrenceProcessor)().generateDates(a).map(function (e) {
        var n = new Date(e);
        var o = s.default.createUTCDateWithLocalOffset(e);
        o.setTime(o.getTime() + i);
        return {
          startDate: n,
          endDate: s.default.createDateFromUTCWithLocalOffset(o),
          groupIndex: t
        };
      });
      o.push.apply(o, m(l));
    });
    return o;
  };
  o._updateGroupIndices = function (e, t) {
    var n = this;
    var i = [];
    t.forEach(function (t) {
      if (n.viewDataProvider.getGroupStartDate(t)) {
        e.forEach(function (e) {
          var n = (0, a.extend)({}, e);
          n.groupIndex = t;
          i.push(n);
        });
      }
    });
    return i;
  };
  o._getGroupIndices = function (t) {
    var n;
    var i = e.prototype._getGroupIndices.call(this, t);
    var o = this.viewDataProvider.getGroupIndices();
    if ((n = i) === null || n === undefined || !n.length) {
      i = [0];
    }
    return i.filter(function (e) {
      return o.indexOf(e) !== -1;
    });
  };
  o._createAppointments = function (t, n) {
    var i = e.prototype._createAppointments.call(this, t, n);
    if (t.isRecurrent) {
      return i;
    } else {
      return this._updateGroupIndices(i, n);
    }
  };
  C(i, [{
    key: "groupCount",
    get: function () {
      return (0, l.getGroupCount)(this.loadedResources);
    }
  }]);
  return i;
}(k);
exports.DateGeneratorVirtualStrategy = D;
var I = function () {
  function e(e) {
    this.options = e;
    this.appointmentAdapter = (0, u.createAppointmentAdapter)(this.rawAppointment, this.dataAccessors, this.timeZoneCalculator);
  }
  var t = e.prototype;
  t.create = function () {
    var e = this._generateDateSettings();
    var t = e.dateSettings;
    var n = e.itemGroupIndices;
    var i = e.isRecurrent;
    var o = this._calculateCellPositions(t, n);
    return this._prepareAppointmentInfos(t, o, i);
  };
  t._generateDateSettings = function () {
    return this.dateSettingsStrategy.generate(this.appointmentAdapter);
  };
  t._calculateCellPositions = function (e, t) {
    return new d.CellPositionCalculator(x({}, this.options, {
      dateSettings: e
    })).calculateCellPositions(t, this.isAllDayRowAppointment, this.appointmentAdapter.isRecurrent);
  };
  t._prepareAppointmentInfos = function (e, t, n) {
    var i = this;
    var o = [];
    t.forEach(function (t) {
      var a = t.coordinates;
      var r = t.dateSettingIndex;
      var s = e[r];
      var l = i._getAppointmentDateText(s);
      var u = {
        appointment: s,
        sourceAppointment: s.source,
        dateText: l,
        isRecurrent: n
      };
      o.push(x({}, a, {
        info: u
      }));
    });
    return o;
  };
  t._getAppointmentDateText = function (e) {
    var t = e.startDate;
    var n = e.endDate;
    var i = e.allDay;
    return (0, f.createFormattedDateText)({
      startDate: t,
      endDate: n,
      allDay: i,
      format: "TIME"
    });
  };
  C(e, [{
    key: "rawAppointment",
    get: function () {
      return this.options.rawAppointment;
    }
  }, {
    key: "dataAccessors",
    get: function () {
      return this.options.dataAccessors;
    }
  }, {
    key: "timeZoneCalculator",
    get: function () {
      return this.options.timeZoneCalculator;
    }
  }, {
    key: "isAllDayRowAppointment",
    get: function () {
      return this.options.appointmentTakesAllDay && this.options.supportAllDayRow;
    }
  }, {
    key: "groups",
    get: function () {
      return this.options.groups;
    }
  }, {
    key: "dateSettingsStrategy",
    get: function () {
      var e = x({}, this.options, {
        isAllDayRowAppointment: this.isAllDayRowAppointment
      });
      if (this.options.isVirtualScrolling) {
        return new D(e);
      } else {
        return new k(e);
      }
    }
  }]);
  return e;
}();
exports.AppointmentSettingsGenerator = I;