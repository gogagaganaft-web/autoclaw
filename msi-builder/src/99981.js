exports.default = undefined;
var i = require("./20576.js");
var o = require("./1307.js");
var a = require("./98140.js");
var r = require("./69576.js");
var s = require("./45985.js");
var l = require("./17169.js");
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
function d() {
  return (d = Object.assign ? Object.assign.bind() : function (e) {
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
function c(e, t) {
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
var h = function () {
  function e(e) {
    this.instance = e;
    this.appointmentViewModel = new o.AppointmentViewModelGenerator();
  }
  var t;
  var n;
  var u;
  var h = e.prototype;
  h.getCellDimensions = function (e) {
    if (this.instance._workSpace) {
      return {
        width: this.instance._workSpace.getCellWidth(),
        height: this.instance._workSpace.getCellHeight(),
        allDayHeight: this.instance._workSpace.getAllDayHeight()
      };
    }
  };
  h._getRenderingStrategyOptions = function () {
    var e = this.instance.getWorkSpace();
    var t = this.instance.getWorkSpace().virtualScrollingDispatcher;
    var n = t.cellCountInsideLeftVirtualCell;
    var i = t.cellCountInsideTopVirtualRow;
    var o = (0, a.getGroupCount)(this.instance.option("loadedResources"));
    var l = e.getDOMElementsMetaData();
    var u = (0, r.getAllDayHeight)(e.option("showAllDayPanel"), e._isVerticalGroupedWorkSpace(), l);
    var d = e._getRowCount();
    var c = e.positionHelper;
    var h = e.viewDataProvider.getVisibleDayDuration(e.option("startDayHour"), e.option("endDayHour"), e.option("hoursInterval"));
    var f = (0, s.getCellDuration)(e.type, e.option("startDayHour"), e.option("endDayHour"), e.option("hoursInterval"));
    return {
      resources: this.instance.option("resources"),
      loadedResources: this.instance.option("loadedResources"),
      getAppointmentColor: this.instance.createGetAppointmentColor(),
      dataAccessors: this.instance._dataAccessors,
      isRenovatedAppointments: this.instance.option("isRenovatedAppointments"),
      appointmentRenderingStrategyName: this.appointmentRenderingStrategyName,
      adaptivityEnabled: this.instance.option("adaptivityEnabled"),
      rtlEnabled: this.instance.option("rtlEnabled"),
      startDayHour: this.instance._getCurrentViewOption("startDayHour"),
      endDayHour: this.instance._getCurrentViewOption("endDayHour"),
      maxAppointmentsPerCell: this.instance._getCurrentViewOption("maxAppointmentsPerCell"),
      currentDate: this.instance.option("currentDate"),
      isVirtualScrolling: this.instance.isVirtualScrolling(),
      leftVirtualCellCount: n,
      topVirtualCellCount: i,
      intervalCount: e.option("intervalCount"),
      hoursInterval: e.option("hoursInterval"),
      showAllDayPanel: e.option("showAllDayPanel"),
      isGroupedAllDayPanel: e.isGroupedAllDayPanel(),
      groups: this.instance._getCurrentViewOption("groups"),
      groupCount: o,
      rowCount: d,
      appointmentCountPerCell: this.instance.option("_appointmentCountPerCell"),
      appointmentOffset: this.instance.option("_appointmentOffset"),
      allowResizing: this.instance._allowResizing(),
      allowAllDayResizing: this.instance._allowAllDayResizing(),
      startViewDate: e.getStartViewDate(),
      groupOrientation: e._getRealGroupOrientation(),
      cellWidth: (0, r.getCellWidth)(l),
      cellHeight: (0, r.getCellHeight)(l),
      allDayHeight: u,
      resizableStep: c.getResizableStep(),
      visibleDayDuration: h,
      allDayPanelMode: this.instance._getCurrentViewOption("allDayPanelMode"),
      timeZoneCalculator: this.instance.timeZoneCalculator,
      timeZone: this.instance.option("timeZone"),
      firstDayOfWeek: this.instance.getFirstDayOfWeek(),
      viewStartDayHour: this.instance._getCurrentViewOption("startDayHour"),
      viewEndDayHour: this.instance._getCurrentViewOption("endDayHour"),
      viewType: e.type,
      endViewDate: e.getEndViewDate(),
      positionHelper: c,
      isGroupedByDate: e.isGroupedByDate(),
      cellDuration: f,
      cellDurationInMinutes: e.option("cellDuration"),
      viewDataProvider: e.viewDataProvider,
      supportAllDayRow: e.supportAllDayRow(),
      dateRange: e.getDateRange(),
      intervalDuration: e.getIntervalDuration(),
      allDayIntervalDuration: e.getIntervalDuration(true),
      isVerticalGroupOrientation: e.isVerticalOrientation(),
      DOMMetaData: l,
      instance: this.instance,
      agendaDuration: e.option("agendaDuration")
    };
  };
  h.createAppointmentsMap = function (e) {
    var t = this._getRenderingStrategyOptions();
    var n = this.appointmentViewModel.generate(e, t);
    var i = n.viewModel;
    var o = n.positionMap;
    this._positionMap = o;
    return i;
  };
  h._isDataChanged = function (e) {
    var t = this.instance.appointmentDataProvider;
    return t.getUpdatedAppointment() === e || t.getUpdatedAppointmentKeys().some(function (t) {
      return e[t.key] === t.value;
    });
  };
  h._isAppointmentShouldAppear = function (e, t) {
    return e.needRepaint && t.needRemove;
  };
  h._isSettingChanged = function (e, t) {
    if (e.length !== t.length) {
      return true;
    }
    var n = function (e, t) {
      var n = e[t];
      var i = n.leftVirtualCellCount || 0;
      var o = n.topVirtualCellCount || 0;
      return d({}, n, {
        columnIndex: n.columnIndex + i,
        rowIndex: n.rowIndex + o,
        positionByMap: undefined,
        topVirtualCellCount: undefined,
        leftVirtualCellCount: undefined,
        leftVirtualWidth: undefined,
        topVirtualHeight: undefined,
        hMax: n.reduced ? n.hMax : undefined,
        vMax: n.reduced ? n.vMax : undefined,
        info: {}
      });
    };
    for (var o = 0; o < e.length; o++) {
      var a = n(e, o);
      var r = n(t, o);
      if (r) {
        r.sortedIndex = a.sortedIndex;
      }
      if (!(0, i.equalByValue)(a, r)) {
        return true;
      }
    }
    return false;
  };
  h._getAssociatedSourceAppointment = function (e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      if (i.itemData === e.itemData) {
        return i;
      }
    }
    return null;
  };
  h._getDeletedAppointments = function (e, t) {
    var n = [];
    for (var i = 0; i < t.length; i++) {
      var o = t[i];
      if (!this._getAssociatedSourceAppointment(o, e)) {
        o.needRemove = true;
        n.push(o);
      }
    }
    return n;
  };
  h.getRepaintedAppointments = function (e, t) {
    var n = this;
    if (t.length === 0 || this.appointmentRenderingStrategyName === "agenda") {
      return e;
    } else {
      e.forEach(function (e) {
        var i = n._getAssociatedSourceAppointment(e, t);
        if (i) {
          var o = n._isDataChanged(e.itemData);
          var a = n._isSettingChanged(e.settings, i.settings);
          var r = n._isAppointmentShouldAppear(e, i);
          e.needRepaint = o || a || r;
        }
      });
      return e.concat(this._getDeletedAppointments(e, t));
    }
  };
  h.getRenderingStrategyInstance = function () {
    if (!this.appointmentViewModel.getRenderingStrategy()) {
      var e = this._getRenderingStrategyOptions();
      this.appointmentViewModel.initRenderingStrategy(e);
    }
    return this.appointmentViewModel.getRenderingStrategy();
  };
  t = e;
  if (n = [{
    key: "appointmentRenderingStrategyName",
    get: function () {
      return (0, l.getAppointmentRenderingStrategyName)(this.instance.currentViewType);
    }
  }]) {
    c(t.prototype, n);
  }
  if (u) {
    c(t, u);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;