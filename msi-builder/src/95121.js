exports.AppointmentDataProvider = undefined;
var i = s(require("./80209.js"));
var o = require("./60714.js");
var a = require("./1758.js");
var r = s(require("./17200.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e) {
  return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function u(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (l(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (l(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), l(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var d = "virtual";
var c = "standard";
var h = function () {
  function e(e) {
    this.options = e;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.timeZoneCalculator = this.options.timeZoneCalculator;
    this.appointmentDataSource = new o.AppointmentDataSource(this.dataSource);
    this.initFilterStrategy();
  }
  var t;
  var n;
  var s;
  var l = e.prototype;
  l.getFilterStrategy = function () {
    if (!this.filterStrategy || this.filterStrategy.strategyName !== this.filterStrategyName) {
      this.initFilterStrategy();
    }
    return this.filterStrategy;
  };
  l.initFilterStrategy = function () {
    var e = {
      resources: this.options.resources,
      dataAccessors: this.dataAccessors,
      startDayHour: this.options.startDayHour,
      endDayHour: this.options.endDayHour,
      showAllDayPanel: this.options.showAllDayPanel,
      timeZoneCalculator: this.options.timeZoneCalculator,
      loadedResources: this.options.getLoadedResources,
      supportAllDayRow: this.options.getSupportAllDayRow,
      viewType: this.options.getViewType,
      viewDirection: this.options.getViewDirection,
      dateRange: this.options.getDateRange,
      groupCount: this.options.getGroupCount,
      viewDataProvider: this.options.getViewDataProvider,
      allDayPanelMode: this.options.allDayPanelMode
    };
    this.filterStrategy = this.filterStrategyName === d ? new a.AppointmentFilterVirtualStrategy(e) : new a.AppointmentFilterBaseStrategy(e);
  };
  l.setDataSource = function (e) {
    this.dataSource = e;
    this.initFilterStrategy();
    this.appointmentDataSource.setDataSource(this.dataSource);
  };
  l.updateDataAccessors = function (e) {
    this.dataAccessors = e;
    this.initFilterStrategy();
  };
  l.filter = function (e) {
    return this.getFilterStrategy().filter(e);
  };
  l.filterByDate = function (e, t, n, o) {
    if (this.dataSource && n) {
      var a = this.dataSource.filter();
      var s = (0, r.default)({
        dataSourceFilter: a,
        dataAccessors: this.dataAccessors,
        min: e,
        max: t,
        dateSerializationFormat: o,
        forceIsoDateParsing: (0, i.default)().forceIsoDateParsing
      });
      this.dataSource.filter(s);
    }
  };
  l.hasAllDayAppointments = function (e, t) {
    return this.getFilterStrategy().hasAllDayAppointments(e, t);
  };
  l.filterLoadedAppointments = function (e, t) {
    return this.getFilterStrategy().filterLoadedAppointments(e, t);
  };
  l.calculateAppointmentEndDate = function (e, t) {
    return this.getFilterStrategy().calculateAppointmentEndDate(e, t);
  };
  l.cleanState = function () {
    this.appointmentDataSource.cleanState();
  };
  l.getUpdatedAppointment = function () {
    return this.appointmentDataSource._updatedAppointment;
  };
  l.getUpdatedAppointmentKeys = function () {
    return this.appointmentDataSource._updatedAppointmentKeys;
  };
  l.add = function (e) {
    return this.appointmentDataSource.add(e);
  };
  l.update = function (e, t) {
    return this.appointmentDataSource.update(e, t);
  };
  l.remove = function (e) {
    return this.appointmentDataSource.remove(e);
  };
  l.destroy = function () {
    this.appointmentDataSource.destroy();
  };
  t = e;
  if (n = [{
    key: "keyName",
    get: function () {
      return this.appointmentDataSource.keyName;
    }
  }, {
    key: "isDataSourceInit",
    get: function () {
      return !!this.dataSource;
    }
  }, {
    key: "filterStrategyName",
    get: function () {
      if (this.options.getIsVirtualScrolling()) {
        return d;
      } else {
        return c;
      }
    }
  }]) {
    u(t.prototype, n);
  }
  if (s) {
    u(t, s);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.AppointmentDataProvider = h;