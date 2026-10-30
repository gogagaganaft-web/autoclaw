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
exports.default = undefined;
var o = de(require("./99393.js"));
var a = de(require("./80209.js"));
var r = de(require("./20530.js"));
var s = de(require("./68374.js"));
var l = require("./93280.js");
var u = require("./10688.js");
var d = de(require("./44504.js"));
var c = require("./20576.js");
var h = require("./47617.js");
var f = require("./37518.js");
var p = de(require("./91198.js"));
var g = de(require("./69434.js"));
var m = require("./62754.js");
var _ = require("./13306.js");
var v = require("./95479.js");
var y = require("./35922.js");
var b = require("./58201.js");
var x = de(require("./53305.js"));
var w = require("./80506.js");
var C = de(require("./91500.js"));
var S = de(require("./28109.js"));
var k = require("./15029.js");
var D = require("./75811.js");
var I = de(require("./96688.js"));
var T = de(require("./14390.js"));
var E = require("./39288.js");
var O = require("./25062.js");
var A = require("./12090.js");
var P = require("./39545.js");
var M = require("./82586.js");
var R = require("./71125.js");
var B = de(require("./47918.js"));
var L = de(require("./99981.js"));
var V = require("./85589.js");
var F = de(require("./77152.js"));
var H = require("./88609.js");
var N = de(require("./32511.js"));
var z = de(require("./2809.js"));
var j = de(require("./37833.js"));
var W = de(require("./32374.js"));
var G = de(require("./50007.js"));
var q = de(require("./6763.js"));
var $ = de(require("./81096.js"));
var U = de(require("./29004.js"));
var K = de(require("./4453.js"));
var Z = de(require("./22928.js"));
var Y = require("./5480.js");
var X = require("./6678.js");
var Q = require("./9259.js");
var J = require("./98140.js");
var ee = require("./86474.js");
var te = require("./45985.js");
var ne = require("./17275.js");
var ie = require("./77640.js");
var oe = require("./95121.js");
var ae = require("./96801.js");
var re = require("./46858.js");
var se = require("./47718.js");
var le = require("./92198.js");
var ue = require("./74951.js");
function de(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function ce() {
  return (ce = Object.assign ? Object.assign.bind() : function (e) {
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
function he(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, fe(i.key), i);
  }
}
function fe(e) {
  var t = function (e, t) {
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
  }(e, "string");
  if (i(t) === "symbol") {
    return t;
  } else {
    return String(t);
  }
}
function pe(e, t) {
  return (pe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var ge = `dx-scheduler-small`;
var me = `dx-scheduler-adaptive`;
var _e = `dx-scheduler-readonly`;
var ve = {
  day: {
    workSpace: $.default,
    renderingStrategy: "vertical"
  },
  week: {
    workSpace: K.default,
    renderingStrategy: "vertical"
  },
  workWeek: {
    workSpace: Z.default,
    renderingStrategy: "vertical"
  },
  month: {
    workSpace: U.default,
    renderingStrategy: "horizontalMonth"
  },
  timelineDay: {
    workSpace: j.default,
    renderingStrategy: "horizontal"
  },
  timelineWeek: {
    workSpace: G.default,
    renderingStrategy: "horizontal"
  },
  timelineWorkWeek: {
    workSpace: q.default,
    renderingStrategy: "horizontal"
  },
  timelineMonth: {
    workSpace: W.default,
    renderingStrategy: "horizontalMonthLine"
  },
  agenda: {
    workSpace: z.default,
    renderingStrategy: "agenda"
  }
};
var ye = "onAppointmentAdding";
var be = "onAppointmentAdded";
var xe = "onAppointmentDeleting";
var we = "onAppointmentDeleted";
var Ce = "onAppointmentUpdating";
var Se = "onAppointmentUpdated";
var ke = "editSeries";
var De = "editOccurence";
var Ie = "cancel";
var Te = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  pe(t, n);
  var o;
  var x;
  var T;
  var z = i.prototype;
  z._getDefaultOptions = function () {
    var t = (0, _.extend)(e.prototype._getDefaultOptions.call(this), {
      views: ["day", "week"],
      currentView: "day",
      currentDate: p.default.trimTime(new Date()),
      min: undefined,
      max: undefined,
      dateSerializationFormat: undefined,
      firstDayOfWeek: undefined,
      groups: [],
      resources: [],
      loadedResources: [],
      resourceLoaderMap: new Map(),
      dataSource: null,
      customizeDateNavigatorText: undefined,
      appointmentTemplate: "item",
      dropDownAppointmentTemplate: "dropDownAppointment",
      appointmentCollectorTemplate: "appointmentCollector",
      dataCellTemplate: null,
      timeCellTemplate: null,
      resourceCellTemplate: null,
      dateCellTemplate: null,
      startDayHour: 0,
      endDayHour: 24,
      editing: {
        allowAdding: true,
        allowDeleting: true,
        allowDragging: true,
        allowResizing: true,
        allowUpdating: true,
        allowTimeZoneEditing: false
      },
      showAllDayPanel: true,
      showCurrentTimeIndicator: true,
      shadeUntilCurrentTime: false,
      indicatorUpdateInterval: 300000,
      indicatorTime: undefined,
      recurrenceEditMode: "dialog",
      cellDuration: 30,
      maxAppointmentsPerCell: "auto",
      selectedCellData: [],
      groupByDate: false,
      onAppointmentRendered: null,
      onAppointmentClick: null,
      onAppointmentDblClick: null,
      onAppointmentContextMenu: null,
      onCellClick: null,
      onCellContextMenu: null,
      onAppointmentAdding: null,
      onAppointmentAdded: null,
      onAppointmentUpdating: null,
      onAppointmentUpdated: null,
      onAppointmentDeleting: null,
      onAppointmentDeleted: null,
      onAppointmentFormOpening: null,
      onAppointmentTooltipShowing: null,
      appointmentTooltipTemplate: "appointmentTooltip",
      appointmentPopupTemplate: "appointmentPopup",
      crossScrollingEnabled: false,
      useDropDownViewSwitcher: false,
      startDateExpr: "startDate",
      endDateExpr: "endDate",
      textExpr: "text",
      descriptionExpr: "description",
      allDayExpr: "allDay",
      recurrenceRuleExpr: "recurrenceRule",
      recurrenceExceptionExpr: "recurrenceException",
      disabledExpr: "disabled",
      remoteFiltering: false,
      timeZone: "",
      startDateTimeZoneExpr: "startDateTimeZone",
      endDateTimeZoneExpr: "endDateTimeZone",
      noDataText: S.default.format("dxCollectionWidget-noDataText"),
      adaptivityEnabled: false,
      allowMultipleCellSelection: true,
      scrolling: {
        mode: "standard"
      },
      allDayPanelMode: "all",
      renovateRender: true,
      _draggingMode: "outlook",
      _appointmentTooltipOffset: {
        x: 0,
        y: 0
      },
      _appointmentTooltipButtonsPosition: "bottom",
      _appointmentTooltipOpenButtonText: S.default.format("dxScheduler-openAppointment"),
      _appointmentCountPerCell: 2,
      _collectorOffset: 0,
      _appointmentOffset: 26,
      toolbar: [{
        location: "before",
        defaultElement: "dateNavigator"
      }, {
        location: "after",
        defaultElement: "viewSwitcher"
      }]
    });
    return (0, _.extend)(true, t, {
      integrationOptions: {
        useDeferUpdateForTemplates: false
      }
    });
  };
  z._setDeprecatedOptions = function () {
    e.prototype._setDeprecatedOptions.call(this);
    (0, _.extend)(this._deprecatedOptions, {
      dropDownAppointmentTemplate: {
        since: "19.2",
        message: "appointmentTooltipTemplate"
      }
    });
  };
  z._defaultOptionsRules = function () {
    return e.prototype._defaultOptionsRules.call(this).concat([{
      device: function () {
        return r.default.real().deviceType === "desktop" && !r.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }, {
      device: function () {
        return !r.default.current().generic;
      },
      options: {
        useDropDownViewSwitcher: true,
        editing: {
          allowDragging: false,
          allowResizing: false
        }
      }
    }, {
      device: function () {
        return (0, D.isMaterial)();
      },
      options: {
        useDropDownViewSwitcher: true,
        dateCellTemplate: function (e, t, n) {
          e.text.split(" ").forEach(function (e, t) {
            var i = (0, s.default)("<span>").text(e).addClass("dx-scheduler-header-panel-cell-date");
            (0, s.default)(n).append(i);
            if (!t) {
              (0, s.default)(n).append(" ");
            }
          });
        },
        _appointmentTooltipOffset: {
          x: 0,
          y: 11
        },
        _appointmentTooltipButtonsPosition: "top",
        _appointmentTooltipOpenButtonText: null,
        _appointmentCountPerCell: 1,
        _collectorOffset: 20,
        _appointmentOffset: 30
      }
    }]);
  };
  z._postponeDataSourceLoading = function (e) {
    this.postponedOperations.add("_reloadDataSource", this._reloadDataSource.bind(this), e);
  };
  z._postponeResourceLoading = function () {
    var e = this;
    var t = this.postponedOperations.add("loadResources", function () {
      var t = e._getCurrentViewOption("groups");
      return (0, J.loadResources)(t, e.option("resources"), e.option("resourceLoaderMap"));
    });
    var n = new m.Deferred();
    t.done(function (t) {
      e.option("loadedResources", t);
      n.resolve(t);
    });
    this._postponeDataSourceLoading(t);
    return n.promise();
  };
  z._optionChanged = function (t) {
    var n;
    var i;
    var o;
    var a = this;
    var r = t.value;
    var s = t.name;
    switch (t.name) {
      case "customizeDateNavigatorText":
        this._updateOption("header", s, r);
        break;
      case "firstDayOfWeek":
        this._updateOption("workSpace", s, r);
        this._updateOption("header", s, r);
        break;
      case "currentDate":
        r = this._dateOption(s);
        r = p.default.trimTime(new Date(r));
        this.option("selectedCellData", []);
        this._workSpace.option(s, new Date(r));
        if ((n = this._header) !== null && n !== undefined) {
          n.option(s, new Date(r));
        }
        if ((i = this._header) !== null && i !== undefined) {
          i.option("startViewDate", this.getStartViewDate());
        }
        this._appointments.option("items", []);
        this._filterAppointmentsByDate();
        this._postponeDataSourceLoading();
        break;
      case "dataSource":
        this._initDataSource();
        this.appointmentDataProvider.setDataSource(this._dataSource);
        this._postponeResourceLoading().done(function (e) {
          a._filterAppointmentsByDate();
          a._updateOption("workSpace", "showAllDayPanel", a.option("showAllDayPanel"));
        });
        break;
      case "min":
      case "max":
        r = this._dateOption(s);
        this._updateOption("header", s, new Date(r));
        this._updateOption("workSpace", s, new Date(r));
        break;
      case "views":
        var l;
        if (this._getCurrentViewOptions()) {
          this.repaint();
        } else if ((l = this._header) !== null && l !== undefined) {
          l.option(s, r);
        }
        break;
      case "useDropDownViewSwitcher":
        if ((o = this._header) !== null && o !== undefined) {
          o.option(s, r);
        }
        break;
      case "currentView":
        this._validateDayHours();
        this._validateCellDuration();
        this._appointments.option({
          items: [],
          allowDrag: this._allowDragging(),
          allowResize: this._allowResizing(),
          itemTemplate: this._getAppointmentTemplate("appointmentTemplate")
        });
        this._postponeResourceLoading().done(function (e) {
          var t;
          a._refreshWorkSpace(e);
          if ((t = a._header) !== null && t !== undefined) {
            t.option(a._headerConfig());
          }
          a._filterAppointmentsByDate();
          a._appointments.option("allowAllDayResize", r !== "day");
        });
        this.postponedOperations.callPostponedOperations();
        break;
      case "appointmentTemplate":
        this._appointments.option("itemTemplate", r);
        break;
      case "dateCellTemplate":
      case "resourceCellTemplate":
      case "dataCellTemplate":
      case "timeCellTemplate":
        this.repaint();
        break;
      case "groups":
        this._postponeResourceLoading().done(function (e) {
          a._refreshWorkSpace(e);
          a._filterAppointmentsByDate();
        });
        break;
      case "resources":
        this._dataAccessors.resources = (0, J.createExpressions)(this.option("resources"));
        this.agendaResourceProcessor.initializeState(this.option("resources"));
        this.updateInstances();
        this._postponeResourceLoading().done(function (e) {
          a._appointments.option("items", []);
          a._refreshWorkSpace(e);
          a._filterAppointmentsByDate();
          a._createAppointmentPopupForm();
        });
        break;
      case "startDayHour":
      case "endDayHour":
        this._validateDayHours();
        this.updateInstances();
        this._appointments.option("items", []);
        this._updateOption("workSpace", s, r);
        this._appointments.repaint();
        this._filterAppointmentsByDate();
        this._postponeDataSourceLoading();
        break;
      case ye:
      case be:
      case Ce:
      case Se:
      case xe:
      case we:
      case "onAppointmentFormOpening":
      case "onAppointmentTooltipShowing":
        this._actions[s] = this._createActionByOption(s);
        break;
      case "onAppointmentRendered":
        this._appointments.option("onItemRendered", this._getAppointmentRenderedAction());
        break;
      case "onAppointmentClick":
        this._appointments.option("onItemClick", this._createActionByOption(s));
        break;
      case "onAppointmentDblClick":
        this._appointments.option(s, this._createActionByOption(s));
        break;
      case "onAppointmentContextMenu":
        this._appointments.option("onItemContextMenu", this._createActionByOption(s));
        break;
      case "noDataText":
      case "allowMultipleCellSelection":
      case "selectedCellData":
      case "accessKey":
      case "onCellClick":
      case "onCellContextMenu":
        this._workSpace.option(s, r);
        break;
      case "crossScrollingEnabled":
        this._postponeResourceLoading().done(function (e) {
          a._appointments.option("items", []);
          a._refreshWorkSpace(e);
          if (a._readyToRenderAppointments) {
            a._appointments.option("items", a._getAppointmentsToRepaint());
          }
        });
        break;
      case "cellDuration":
        this._validateCellDuration();
        this._updateOption("workSpace", s, r);
        this._appointments.option("items", []);
        if (this._readyToRenderAppointments) {
          this._updateOption("workSpace", "hoursInterval", r / 60);
          this._appointments.option("items", this._getAppointmentsToRepaint());
        }
        break;
      case "tabIndex":
      case "focusStateEnabled":
        this._updateOption("header", s, r);
        this._updateOption("workSpace", s, r);
        this._appointments.option(s, r);
        e.prototype._optionChanged.call(this, t);
        break;
      case "width":
        this._updateOption("header", s, r);
        if (this.option("crossScrollingEnabled")) {
          this._updateOption("workSpace", "width", r);
        }
        this._updateOption("workSpace", "schedulerWidth", r);
        e.prototype._optionChanged.call(this, t);
        this._dimensionChanged(null, true);
        break;
      case "height":
        e.prototype._optionChanged.call(this, t);
        this._dimensionChanged(null, true);
        this._updateOption("workSpace", "schedulerHeight", r);
        break;
      case "editing":
        this._initEditing();
        var u = this._editing;
        this._bringEditingModeToAppointments(u);
        this.hideAppointmentTooltip();
        this._cleanPopup();
        break;
      case "showAllDayPanel":
        this.updateInstances();
        this.repaint();
        break;
      case "showCurrentTimeIndicator":
      case "indicatorTime":
      case "indicatorUpdateInterval":
      case "shadeUntilCurrentTime":
      case "groupByDate":
        this._updateOption("workSpace", s, r);
        this.repaint();
        break;
      case "appointmentDragging":
      case "appointmentTooltipTemplate":
      case "appointmentPopupTemplate":
      case "recurrenceEditMode":
      case "remoteFiltering":
      case "timeZone":
        this.updateInstances();
        this.repaint();
        break;
      case "dropDownAppointmentTemplate":
      case "appointmentCollectorTemplate":
      case "_appointmentTooltipOffset":
      case "_appointmentTooltipButtonsPosition":
      case "_appointmentTooltipOpenButtonText":
      case "_appointmentCountPerCell":
      case "_collectorOffset":
      case "_appointmentOffset":
        this.repaint();
        break;
      case "dateSerializationFormat":
      case "maxAppointmentsPerCell":
        break;
      case "startDateExpr":
      case "endDateExpr":
      case "startDateTimeZoneExpr":
      case "endDateTimeZoneExpr":
      case "textExpr":
      case "descriptionExpr":
      case "allDayExpr":
      case "recurrenceRuleExpr":
      case "recurrenceExceptionExpr":
      case "disabledExpr":
        this._updateExpression(s, r);
        this.appointmentDataProvider.updateDataAccessors(this._dataAccessors);
        this._initAppointmentTemplate();
        this.repaint();
        break;
      case "adaptivityEnabled":
        this._toggleAdaptiveClass();
        this.repaint();
        break;
      case "scrolling":
        this.option("crossScrollingEnabled", this._isHorizontalVirtualScrolling() || this.option("crossScrollingEnabled"));
        this._updateOption("workSpace", t.fullName, r);
        break;
      case "allDayPanelMode":
        this._updateOption("workSpace", t.fullName, r);
        break;
      case "renovateRender":
        this._updateOption("workSpace", s, r);
        break;
      case "_draggingMode":
        this._workSpace.option("draggingMode", r);
        break;
      case "toolbar":
        if (this._header) {
          this._header.option("items", r);
        } else {
          this.repaint();
        }
        break;
      case "loadedResources":
      case "resourceLoaderMap":
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  z._dateOption = function (e) {
    var t = this._getCurrentViewOption(e);
    return g.default.deserializeDate(t);
  };
  z._getSerializationFormat = function (e) {
    var t = this._getCurrentViewOption(e);
    if (typeof t == "number") {
      return "number";
    } else if ((0, y.isString)(t)) {
      return g.default.getDateSerializationFormat(t);
    } else {
      return undefined;
    }
  };
  z._bringEditingModeToAppointments = function (e) {
    var t = {
      allowDelete: e.allowUpdating && e.allowDeleting
    };
    if (!this._isAgenda()) {
      t.allowDrag = e.allowDragging;
      t.allowResize = e.allowResizing;
      t.allowAllDayResize = e.allowResizing && this._supportAllDayResizing();
    }
    this._appointments.option(t);
    this.repaint();
  };
  z._isAgenda = function () {
    return this.getLayoutManager().appointmentRenderingStrategyName === "agenda";
  };
  z._allowDragging = function () {
    return this._editing.allowDragging && !this._isAgenda();
  };
  z._allowResizing = function () {
    return this._editing.allowResizing && !this._isAgenda();
  };
  z._allowAllDayResizing = function () {
    return this._editing.allowResizing && this._supportAllDayResizing();
  };
  z._supportAllDayResizing = function () {
    return this.currentViewType !== "day" || this.currentView.intervalCount > 1;
  };
  z._isAllDayExpanded = function () {
    return this.option("showAllDayPanel") && this.appointmentDataProvider.hasAllDayAppointments(this.filteredItems, this.preparedItems);
  };
  z._getTimezoneOffsetByOption = function (e) {
    return N.default.calculateTimezoneByValue(this.option("timeZone"), e);
  };
  z._filterAppointmentsByDate = function () {
    var e = this._workSpace.getDateRange();
    var t = this.timeZoneCalculator.createDate(e[0], {
      path: "fromGrid"
    });
    var n = this.timeZoneCalculator.createDate(e[1], {
      path: "fromGrid"
    });
    this.appointmentDataProvider.filterByDate(t, n, this.option("remoteFiltering"), this.option("dateSerializationFormat"));
  };
  z._reloadDataSource = function () {
    var e = new m.Deferred();
    if (this._dataSource) {
      this._dataSource.load().done(function () {
        (0, R.hide)();
        this._fireContentReadyAction(e);
      }.bind(this)).fail(function () {
        (0, R.hide)();
        e.reject();
      });
      if (this._dataSource.isLoading()) {
        (0, R.show)({
          container: this.$element(),
          position: {
            of: this.$element()
          }
        });
      }
    } else {
      this._fireContentReadyAction(e);
    }
    return e.promise();
  };
  z._fireContentReadyAction = function (t) {
    var n;
    var i = e.prototype._fireContentReadyAction.bind(this);
    function o() {
      i();
      if (t != null) {
        t.resolve();
      }
    }
    if (this._workSpaceRecalculation) {
      if ((n = this._workSpaceRecalculation) !== null && n !== undefined) {
        n.done(function () {
          o();
        });
      }
    } else {
      o();
    }
  };
  z._dimensionChanged = function (e, t = false) {
    var n = typeof this.option("height") == "number";
    var i = typeof this.option("width") == "number";
    if (this._isVisible()) {
      this._toggleSmallClass();
      var o = this.getWorkSpace();
      if (!this._isAgenda() && this.filteredItems && o && (t || !n || !i)) {
        o.option("allDayExpanded", this._isAllDayExpanded());
        o._dimensionChanged();
        var a = this.getLayoutManager().createAppointmentsMap(this.filteredItems);
        this._appointments.option("items", a);
      }
      this.hideAppointmentTooltip();
      this._appointmentPopup.triggerResize();
      this._appointmentPopup.updatePopupFullScreenMode();
    }
  };
  z._clean = function () {
    this._cleanPopup();
    e.prototype._clean.call(this);
  };
  z._toggleSmallClass = function () {
    var e = (0, f.getBoundingRect)(this.$element().get(0)).width;
    this.$element().toggleClass(ge, e < 400);
  };
  z._toggleAdaptiveClass = function () {
    this.$element().toggleClass(me, this.option("adaptivityEnabled"));
  };
  z._visibilityChanged = function (e) {
    if (e) {
      this._dimensionChanged(null, true);
    }
  };
  z._dataSourceOptions = function () {
    return {
      paginate: false
    };
  };
  z._initAllDayPanel = function () {
    if (this.option("allDayPanelMode") === "hidden") {
      this.option("showAllDayPanel", false);
    }
  };
  z._init = function () {
    this._initExpressions({
      startDate: this.option("startDateExpr"),
      endDate: this.option("endDateExpr"),
      startDateTimeZone: this.option("startDateTimeZoneExpr"),
      endDateTimeZone: this.option("endDateTimeZoneExpr"),
      allDay: this.option("allDayExpr"),
      text: this.option("textExpr"),
      description: this.option("descriptionExpr"),
      recurrenceRule: this.option("recurrenceRuleExpr"),
      recurrenceException: this.option("recurrenceExceptionExpr"),
      disabled: this.option("disabledExpr")
    });
    e.prototype._init.call(this);
    this._initAllDayPanel();
    this._initDataSource();
    this._customizeDataSourceLoadOptions();
    this.$element().addClass("dx-scheduler");
    this._initEditing();
    this.updateInstances();
    this._initActions();
    this._compactAppointmentsHelper = new A.CompactAppointmentsHelper(this);
    this._asyncTemplatesTimers = [];
    this._dataSourceLoadedCallback = (0, d.default)();
    this._subscribes = F.default;
    this.agendaResourceProcessor = new ie.AgendaResourceProcessor(this.option("resources"));
  };
  z.createAppointmentDataProvider = function () {
    var e;
    var t = this;
    if ((e = this.appointmentDataProvider) !== null && e !== undefined) {
      e.destroy();
    }
    this.appointmentDataProvider = new oe.AppointmentDataProvider({
      dataSource: this._dataSource,
      dataAccessors: this._dataAccessors,
      timeZoneCalculator: this.timeZoneCalculator,
      dateSerializationFormat: this.option("dateSerializationFormat"),
      resources: this.option("resources"),
      startDayHour: this._getCurrentViewOption("startDayHour"),
      endDayHour: this._getCurrentViewOption("endDayHour"),
      appointmentDuration: this._getCurrentViewOption("cellDuration"),
      allDayPanelMode: this._getCurrentViewOption("allDayPanelMode"),
      showAllDayPanel: this.option("showAllDayPanel"),
      getLoadedResources: function () {
        return t.option("loadedResources");
      },
      getIsVirtualScrolling: function () {
        return t.isVirtualScrolling();
      },
      getSupportAllDayRow: function () {
        return t._workSpace.supportAllDayRow();
      },
      getViewType: function () {
        return t._workSpace.type;
      },
      getViewDirection: function () {
        return t._workSpace.viewDirection;
      },
      getDateRange: function () {
        return t._workSpace.getDateRange();
      },
      getGroupCount: function () {
        return t._workSpace._getGroupCount();
      },
      getViewDataProvider: function () {
        return t._workSpace.viewDataProvider;
      }
    });
  };
  z.updateInstances = function () {
    this._timeZoneCalculator = null;
    if (this.getWorkSpace()) {
      this.createAppointmentDataProvider();
    }
  };
  z._customizeDataSourceLoadOptions = function () {
    var e;
    var t = this;
    if ((e = this._dataSource) !== null && e !== undefined) {
      e.on("customizeStoreLoadOptions", function (e) {
        var n = e.storeLoadOptions;
        n.startDate = t.getStartViewDate();
        n.endDate = t.getEndViewDate();
      });
    }
  };
  z._initTemplates = function () {
    this._initAppointmentTemplate();
    this._templateManager.addDefaultTemplates({
      appointmentTooltip: new u.EmptyTemplate(),
      dropDownAppointment: new u.EmptyTemplate()
    });
    e.prototype._initTemplates.call(this);
  };
  z._initAppointmentTemplate = function () {
    var e;
    var t;
    var n;
    var i = this;
    var o = this._dataAccessors.expr;
    function a(e) {
      return (0, h.compileGetter)(`appointmentData.${e}`);
    }
    function r(e) {
      return function (t) {
        var n = e(t);
        if (n instanceof Date) {
          return n.valueOf();
        } else {
          return n;
        }
      };
    }
    this._templateManager.addDefaultTemplates((e = {}, t = "item", n = new l.BindableTemplate(function (e, t, n) {
      return i.getAppointmentsInstance()._renderAppointmentTemplate(e, t, n);
    }, ["html", "text", "startDate", "endDate", "allDay", "description", "recurrenceRule", "recurrenceException", "startDateTimeZone", "endDateTimeZone"], this.option("integrationOptions.watchMethod"), {
      text: a(o.textExpr),
      startDate: r(a(o.startDateExpr)),
      endDate: r(a(o.endDateExpr)),
      startDateTimeZone: a(o.startDateTimeZoneExpr),
      endDateTimeZone: a(o.endDateTimeZoneExpr),
      allDay: a(o.allDayExpr),
      recurrenceRule: a(o.recurrenceRuleExpr)
    }), (t = fe(t)) in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[t] = n, e));
  };
  z._renderContent = function () {
    this._renderContentImpl();
  };
  z._updatePreparedItems = function (e) {
    this.preparedItems = (0, re.getPreparedDataItems)(e, this._dataAccessors, this._getCurrentViewOption("cellDuration"), this.timeZoneCalculator);
  };
  z._dataSourceChangedHandler = function (e) {
    if (this._readyToRenderAppointments) {
      this._workSpaceRecalculation.done(function () {
        this._updatePreparedItems(e);
        this._renderAppointments();
        this.getWorkSpace().onDataSourceChanged(this.filteredItems);
      }.bind(this));
    }
  };
  z.isVirtualScrolling = function () {
    var e;
    var t = this.getWorkSpace();
    if (t) {
      return t.isVirtualScrolling();
    }
    var n = this._getCurrentViewOptions();
    var i = this.option("scrolling");
    return (i == null ? undefined : i.mode) === "virtual" || (n == null || (e = n.scrolling) === null || e === undefined ? undefined : e.mode) === "virtual";
  };
  z._filterAppointments = function () {
    this.filteredItems = this.appointmentDataProvider.filter(this.preparedItems);
  };
  z._renderAppointments = function () {
    var e = this.getWorkSpace();
    this._filterAppointments();
    e.option("allDayExpanded", this._isAllDayExpanded());
    var t = [];
    if (this._isVisible()) {
      t = this._getAppointmentsToRepaint();
    }
    if (this.option("isRenovatedAppointments")) {
      (0, ne.renderAppointments)({
        instance: this,
        $dateTable: this.getWorkSpace()._getDateTable(),
        viewModel: t
      });
    } else {
      this._appointments.option("items", t);
    }
    this.appointmentDataProvider.cleanState();
  };
  z._getAppointmentsToRepaint = function () {
    var e = this.getLayoutManager();
    var t = e.createAppointmentsMap(this.filteredItems);
    if (this.option("isRenovatedAppointments")) {
      return {
        appointments: t,
        appointmentTemplate: this.option("appointmentTemplate") !== "item" ? this.option("appointmentTemplate") : undefined
      };
    } else {
      return e.getRepaintedAppointments(t, this.getAppointmentsInstance().option("items"));
    }
  };
  z._initExpressions = function (e) {
    this._dataAccessors = Q.utils.dataAccessors.create(e, this._dataAccessors, (0, a.default)().forceIsoDateParsing, this.option("dateSerializationFormat"));
    this._dataAccessors.resources = (0, J.createExpressions)(this.option("resources"));
  };
  z._updateExpression = function (e, t) {
    var n = {
      [e.replace("Expr", "")]: t
    };
    this._initExpressions(n);
  };
  z.getResourceDataAccessors = function () {
    return this._dataAccessors.resources;
  };
  z._initEditing = function () {
    var e = this.option("editing");
    this._editing = {
      allowAdding: !!e,
      allowUpdating: !!e,
      allowDeleting: !!e,
      allowResizing: !!e,
      allowDragging: !!e
    };
    if ((0, y.isObject)(e)) {
      this._editing = (0, _.extend)(this._editing, e);
    }
    this._editing.allowDragging = this._editing.allowDragging && this._editing.allowUpdating;
    this._editing.allowResizing = this._editing.allowResizing && this._editing.allowUpdating;
    this.$element().toggleClass(_e, this._isReadOnly());
  };
  z._isReadOnly = function () {
    var e = true;
    var t = this._editing;
    for (var n in t) {
      if (Object.prototype.hasOwnProperty.call(t, n)) {
        e = e && !t[n];
      }
    }
    return e;
  };
  z._dispose = function () {
    var t;
    if (this._appointmentTooltip) {
      this._appointmentTooltip.dispose();
    }
    if ((t = this._recurrenceDialog) !== null && t !== undefined) {
      t.hide(Ie);
    }
    this.hideAppointmentPopup();
    this.hideAppointmentTooltip();
    this._asyncTemplatesTimers.forEach(clearTimeout);
    this._asyncTemplatesTimers = [];
    e.prototype._dispose.call(this);
  };
  z._initActions = function () {
    this._actions = {
      onAppointmentAdding: this._createActionByOption(ye),
      onAppointmentAdded: this._createActionByOption(be),
      onAppointmentUpdating: this._createActionByOption(Ce),
      onAppointmentUpdated: this._createActionByOption(Se),
      onAppointmentDeleting: this._createActionByOption(xe),
      onAppointmentDeleted: this._createActionByOption(we),
      onAppointmentFormOpening: this._createActionByOption("onAppointmentFormOpening"),
      onAppointmentTooltipShowing: this._createActionByOption("onAppointmentTooltipShowing")
    };
  };
  z._getAppointmentRenderedAction = function () {
    return this._createActionByOption("onAppointmentRendered", {
      excludeValidators: ["disabled", "readOnly"]
    });
  };
  z._renderFocusTarget = function () {
    return (0, c.noop)();
  };
  z._initMarkup = function () {
    var t = this;
    e.prototype._initMarkup.call(this);
    this._validateDayHours();
    this._validateCellDuration();
    this._renderMainContainer();
    this._renderHeader();
    this._layoutManager = new L.default(this);
    this._appointments = this._createComponent("<div>", B.default, this._appointmentsConfig());
    this._appointments.option("itemTemplate", this._getAppointmentTemplate("appointmentTemplate"));
    this._appointmentTooltip = new (this.option("adaptivityEnabled") ? M.MobileTooltipStrategy : P.DesktopTooltipStrategy)(this._getAppointmentTooltipOptions());
    this._createAppointmentPopupForm();
    if (this._isDataSourceLoaded() || this._isDataSourceLoading()) {
      this._initMarkupCore(this.option("loadedResources"));
      this._dataSourceChangedHandler(this._dataSource.items());
      this._fireContentReadyAction();
    } else {
      var n = this._getCurrentViewOption("groups");
      (0, J.loadResources)(n, this.option("resources"), this.option("resourceLoaderMap")).done(function (e) {
        t.option("loadedResources", e);
        t._initMarkupCore(e);
        t._reloadDataSource();
      });
    }
  };
  z._createAppointmentPopupForm = function () {
    var e;
    var t;
    if (this._appointmentForm) {
      if ((t = this._appointmentForm.form) !== null && t !== undefined) {
        t.dispose();
      }
    }
    this._appointmentForm = this.createAppointmentForm();
    if ((e = this._appointmentPopup) !== null && e !== undefined) {
      e.dispose();
    }
    this._appointmentPopup = this.createAppointmentPopup(this._appointmentForm);
  };
  z._renderMainContainer = function () {
    this._mainContainer = (0, s.default)("<div>").addClass("dx-scheduler-container");
    this.$element().append(this._mainContainer);
  };
  z.createAppointmentForm = function () {
    var e = this;
    var t = {
      createResourceEditorModel: function () {
        return (0, J.createResourceEditorModel)(e.option("resources"), e.option("loadedResources"));
      },
      getDataAccessors: function () {
        return e._dataAccessors;
      },
      createComponent: function (t, n, i) {
        return e._createComponent(t, n, i);
      },
      getEditingConfig: function () {
        return e._editing;
      },
      getFirstDayOfWeek: function () {
        return e.option("firstDayOfWeek");
      },
      getStartDayHour: function () {
        return e.option("startDayHour");
      },
      getCalculatedEndDate: function (t) {
        return e._workSpace.calculateEndDate(t);
      },
      getTimeZoneCalculator: function () {
        return e.timeZoneCalculator;
      }
    };
    return new O.AppointmentForm(t);
  };
  z.createAppointmentPopup = function (e) {
    var t = this;
    var n = {
      getElement: function () {
        return t.$element();
      },
      createComponent: function (e, n, i) {
        return t._createComponent(e, n, i);
      },
      focus: function () {
        return t.focus();
      },
      getResources: function () {
        return t.option("resources");
      },
      getEditingConfig: function () {
        return t._editing;
      },
      getTimeZoneCalculator: function () {
        return t.timeZoneCalculator;
      },
      getDataAccessors: function () {
        return t._dataAccessors;
      },
      getAppointmentFormOpening: function () {
        return t._actions.onAppointmentFormOpening;
      },
      processActionResult: function (e, n) {
        return t._processActionResult(e, n);
      },
      addAppointment: function (e) {
        return t.addAppointment(e);
      },
      updateAppointment: function (e, n) {
        return t.updateAppointment(e, n);
      },
      updateScrollPosition: function (e, n, i) {
        t._workSpace.updateScrollPosition(e, n, i);
      }
    };
    return new E.AppointmentPopup(n, e);
  };
  z._getAppointmentTooltipOptions = function () {
    var e = this;
    return {
      createComponent: this._createComponent.bind(this),
      container: this.$element(),
      getScrollableContainer: this.getWorkSpaceScrollableContainer.bind(this),
      addDefaultTemplates: this._templateManager.addDefaultTemplates.bind(this._templateManager),
      getAppointmentTemplate: this._getAppointmentTemplate.bind(this),
      showAppointmentPopup: this.showAppointmentPopup.bind(this),
      checkAndDeleteAppointment: this.checkAndDeleteAppointment.bind(this),
      isAppointmentInAllDayPanel: this.isAppointmentInAllDayPanel.bind(this),
      createFormattedDateText: function (t, n, i) {
        return e.fire("getTextAndFormatDate", t, n, i);
      },
      getAppointmentDisabled: function (t) {
        return (0, Y.createAppointmentAdapter)(t, e._dataAccessors, e.timeZoneCalculator).disabled;
      }
    };
  };
  z.checkAndDeleteAppointment = function (e, t) {
    var n = this;
    var i = (0, Y.createAppointmentAdapter)(t, this._dataAccessors, this.timeZoneCalculator);
    var o = this.fireOnAppointmentDeleting(e, i);
    this._checkRecurringAppointment(e, t, i.startDate, function () {
      n.processDeleteAppointment(e, o);
    }, true);
  };
  z._getExtraAppointmentTooltipOptions = function () {
    return {
      rtlEnabled: this.option("rtlEnabled"),
      focusStateEnabled: this.option("focusStateEnabled"),
      editing: this.option("editing"),
      offset: this.option("_appointmentTooltipOffset")
    };
  };
  z.isAppointmentInAllDayPanel = function (e) {
    var t = this._workSpace;
    return this.appointmentTakesAllDay(e) && t.supportAllDayRow() && t.option("showAllDayPanel");
  };
  z._initMarkupCore = function (e) {
    var t = this;
    this._readyToRenderAppointments = (0, b.hasWindow)();
    if (this._workSpace) {
      this._cleanWorkspace();
    }
    this._renderWorkSpace(e);
    this._appointments.option({
      fixedContainer: this._workSpace.getFixedContainer(),
      allDayContainer: this._workSpace.getAllDayContainer()
    });
    this._waitAsyncTemplate(function () {
      var e;
      if ((e = t._workSpaceRecalculation) === null || e === undefined) {
        return undefined;
      } else {
        return e.resolve();
      }
    });
    this.createAppointmentDataProvider();
    this._filterAppointmentsByDate();
    this._validateKeyFieldIfAgendaExist();
  };
  z._isDataSourceLoaded = function () {
    return this._dataSource && this._dataSource.isLoaded();
  };
  z._render = function () {
    var t;
    this._toggleSmallClass();
    this._toggleAdaptiveClass();
    if ((t = this.getWorkSpace()) !== null && t !== undefined) {
      t.updateHeaderEmptyCellWidth();
    }
    e.prototype._render.call(this);
  };
  z._renderHeader = function () {
    if (this.option("toolbar").length !== 0) {
      var e = (0, s.default)("<div>").appendTo(this._mainContainer);
      this._header = this._createComponent(e, V.SchedulerHeader, this._headerConfig());
    }
  };
  z._headerConfig = function () {
    var e = this;
    var t = this._getCurrentViewOptions();
    var n = this._getViewCountConfig();
    var i = (0, _.extend)({
      firstDayOfWeek: this.getFirstDayOfWeek(),
      currentView: this.option("currentView"),
      isAdaptive: this.option("adaptivityEnabled"),
      tabIndex: this.option("tabIndex"),
      focusStateEnabled: this.option("focusStateEnabled"),
      rtlEnabled: this.option("rtlEnabled"),
      useDropDownViewSwitcher: this.option("useDropDownViewSwitcher"),
      customizeDateNavigatorText: this.option("customizeDateNavigatorText"),
      agendaDuration: t.agendaDuration || 7
    }, t);
    i.intervalCount = n.intervalCount;
    i.views = this.option("views");
    i.min = new Date(this._dateOption("min"));
    i.max = new Date(this._dateOption("max"));
    i.currentDate = p.default.trimTime(new Date(this._dateOption("currentDate")));
    i.onCurrentViewChange = function (t) {
      e.option("currentView", t);
    };
    i.onCurrentDateChange = function (t) {
      e.option("currentDate", t);
    };
    i.items = this.option("toolbar");
    i.startViewDate = this.getStartViewDate();
    i.todayDate = function () {
      return e.timeZoneCalculator.createDate(new Date(), {
        path: "toGrid"
      });
    };
    return i;
  };
  z._appointmentsConfig = function () {
    var e = this;
    return {
      getResources: function () {
        return e.option("resources");
      },
      getResourceDataAccessors: this.getResourceDataAccessors.bind(this),
      getAgendaResourceProcessor: function () {
        return e.agendaResourceProcessor;
      },
      getAppointmentColor: this.createGetAppointmentColor(),
      getAppointmentDataProvider: function () {
        return e.appointmentDataProvider;
      },
      dataAccessors: this._dataAccessors,
      observer: this,
      onItemRendered: this._getAppointmentRenderedAction(),
      onItemClick: this._createActionByOption("onAppointmentClick"),
      onItemContextMenu: this._createActionByOption("onAppointmentContextMenu"),
      onAppointmentDblClick: this._createActionByOption("onAppointmentDblClick"),
      tabIndex: this.option("tabIndex"),
      focusStateEnabled: this.option("focusStateEnabled"),
      allowDrag: this._allowDragging(),
      allowDelete: this._editing.allowUpdating && this._editing.allowDeleting,
      allowResize: this._allowResizing(),
      allowAllDayResize: this._allowAllDayResizing(),
      rtlEnabled: this.option("rtlEnabled"),
      currentView: this.currentView,
      groups: this._getCurrentViewOption("groups"),
      isRenovatedAppointments: this.option("isRenovatedAppointments"),
      timeZoneCalculator: this.timeZoneCalculator,
      getResizableStep: function () {
        if (e._workSpace) {
          return e._workSpace.positionHelper.getResizableStep();
        } else {
          return 0;
        }
      },
      getDOMElementsMetaData: function () {
        var t;
        if ((t = e._workSpace) === null || t === undefined) {
          return undefined;
        } else {
          return t.getDOMElementsMetaData();
        }
      },
      getViewDataProvider: function () {
        return e._workSpace?.viewDataProvider;
      },
      isVerticalViewDirection: function () {
        return e.getRenderingStrategyInstance().getDirection() === "vertical";
      },
      isVerticalGroupedWorkSpace: function () {
        return e._workSpace._isVerticalGroupedWorkSpace();
      },
      isDateAndTimeView: function () {
        return (0, te.isDateAndTimeView)(e._workSpace.type);
      },
      onContentReady: function () {
        var t;
        if ((t = e._workSpace) !== null && t !== undefined) {
          t.option("allDayExpanded", e._isAllDayExpanded());
        }
      }
    };
  };
  z.getCollectorOffset = function () {
    if (this._workSpace.needApplyCollectorOffset() && !this.option("adaptivityEnabled")) {
      return this.option("_collectorOffset");
    } else {
      return 0;
    }
  };
  z.getAppointmentDurationInMinutes = function () {
    return this._getCurrentViewOption("cellDuration");
  };
  z._getCurrentViewType = function () {
    return this.currentViewType;
  };
  z._renderWorkSpace = function (e) {
    var t;
    if (this._readyToRenderAppointments) {
      this._toggleSmallClass();
    }
    var n = (0, s.default)("<div>").appendTo(this._mainContainer);
    var i = this._getViewCountConfig();
    var o = ve[this._getCurrentViewType()].workSpace;
    var a = this._workSpaceConfig(e, i);
    this._workSpace = this._createComponent(n, o, a);
    if (this._allowDragging()) {
      this._workSpace.initDragBehavior(this, this._all);
    }
    this._workSpace._attachTablesEvents();
    this._workSpace.getWorkArea().append(this._appointments.$element());
    this._recalculateWorkspace();
    if (i.startDate) {
      if ((t = this._header) !== null && t !== undefined) {
        t.option("currentDate", this._workSpace._getHeaderDate());
      }
    }
    this._appointments.option("_collectorOffset", this.getCollectorOffset());
  };
  z._getViewCountConfig = function () {
    var e = this.option("currentView");
    var t = this._getViewByName(e);
    return {
      intervalCount: t && t.intervalCount || 1,
      startDate: t && t.startDate || null
    };
  };
  z._getViewByName = function (e) {
    for (var t = this.option("views"), n = 0; n < t.length; n++) {
      if (t[n].name === e || t[n].type === e || t[n] === e) {
        return t[n];
      }
    }
  };
  z._recalculateWorkspace = function () {
    var e = this;
    this._workSpaceRecalculation = new m.Deferred();
    this._waitAsyncTemplate(function () {
      (0, w.triggerResizeEvent)(e._workSpace.$element());
      e._workSpace._refreshDateTimeIndication();
    });
  };
  z._workSpaceConfig = function (e, t) {
    var i = this;
    var o = this._getCurrentViewOptions();
    var a = this.option("scrolling");
    var r = a.mode === "virtual" || o.scrolling?.mode === "virtual";
    var s = r && (!(0, y.isDefined)(a.orientation) || ["horizontal", "both"].filter(function (e) {
      return a.orientation === e || o.scrolling?.orientation === e;
    }).length > 0);
    var l = this.option("crossScrollingEnabled") || s || (0, te.isTimelineView)(this.currentViewType);
    var u = (0, _.extend)({
      resources: this.option("resources"),
      loadedResources: this.option("loadedResources"),
      getFilteredItems: function () {
        return i.filteredItems;
      },
      getResourceDataAccessors: this.getResourceDataAccessors.bind(this),
      noDataText: this.option("noDataText"),
      firstDayOfWeek: this.option("firstDayOfWeek"),
      startDayHour: this.option("startDayHour"),
      endDayHour: this.option("endDayHour"),
      tabIndex: this.option("tabIndex"),
      accessKey: this.option("accessKey"),
      focusStateEnabled: this.option("focusStateEnabled"),
      cellDuration: this.option("cellDuration"),
      showAllDayPanel: this.option("showAllDayPanel"),
      showCurrentTimeIndicator: this.option("showCurrentTimeIndicator"),
      indicatorTime: this.option("indicatorTime"),
      indicatorUpdateInterval: this.option("indicatorUpdateInterval"),
      shadeUntilCurrentTime: this.option("shadeUntilCurrentTime"),
      allDayExpanded: this._appointments.option("items"),
      crossScrollingEnabled: l,
      dataCellTemplate: this.option("dataCellTemplate"),
      timeCellTemplate: this.option("timeCellTemplate"),
      resourceCellTemplate: this.option("resourceCellTemplate"),
      dateCellTemplate: this.option("dateCellTemplate"),
      allowMultipleCellSelection: this.option("allowMultipleCellSelection"),
      selectedCellData: this.option("selectedCellData"),
      onSelectionChanged: function (e) {
        i.option("selectedCellData", e.selectedCellData);
      },
      groupByDate: this._getCurrentViewOption("groupByDate"),
      scrolling: a,
      draggingMode: this.option("_draggingMode"),
      timeZoneCalculator: this.timeZoneCalculator,
      schedulerHeight: this.option("height"),
      schedulerWidth: this.option("width"),
      allDayPanelMode: this.option("allDayPanelMode"),
      onSelectedCellsClick: this.showAddAppointmentPopup.bind(this),
      onRenderAppointments: this._renderAppointments.bind(this),
      onShowAllDayPanel: function (e) {
        return i.option("showAllDayPanel", e);
      },
      getHeaderHeight: function () {
        return Q.utils.DOM.getHeaderHeight(i._header);
      },
      onScrollEnd: function () {
        return i._appointments.updateResizableArea();
      },
      renovateRender: this._isRenovatedRender(r),
      isRenovatedAppointments: this.option("isRenovatedAppointments")
    }, o);
    u.observer = this;
    u.intervalCount = t.intervalCount;
    u.startDate = t.startDate;
    u.groups = e;
    u.onCellClick = this._createActionByOption("onCellClick");
    u.onCellContextMenu = this._createActionByOption("onCellContextMenu");
    u.currentDate = p.default.trimTime(new Date(this._dateOption("currentDate")));
    u.hoursInterval = u.cellDuration / 60;
    u.allDayExpanded = false;
    u.dataCellTemplate = u.dataCellTemplate ? this._getTemplate(u.dataCellTemplate) : null;
    u.timeCellTemplate = u.timeCellTemplate ? this._getTemplate(u.timeCellTemplate) : null;
    u.resourceCellTemplate = u.resourceCellTemplate ? this._getTemplate(u.resourceCellTemplate) : null;
    u.dateCellTemplate = u.dateCellTemplate ? this._getTemplate(u.dateCellTemplate) : null;
    u.getAppointmentDataProvider = function () {
      return i.appointmentDataProvider;
    };
    return u;
  };
  z._isRenovatedRender = function (e) {
    return this.option("renovateRender") && (0, b.hasWindow)() || e;
  };
  z._waitAsyncTemplate = function (e) {
    if (this._options.silent("templatesRenderAsynchronously")) {
      var t = setTimeout(function () {
        e();
        clearTimeout(t);
      });
      this._asyncTemplatesTimers.push(t);
    } else {
      e();
    }
  };
  z._getCurrentViewOptions = function () {
    return this.currentView;
  };
  z._getCurrentViewOption = function (e) {
    if (this.currentView && this.currentView[e] !== undefined) {
      return this.currentView[e];
    } else {
      return this.option(e);
    }
  };
  z._getAppointmentTemplate = function (e) {
    var t = this._getCurrentViewOptions();
    if (t && t[e]) {
      return this._getTemplate(t[e]);
    } else {
      return this._getTemplateByOption(e);
    }
  };
  z._updateOption = function (e, t, n) {
    var i = this._getCurrentViewOptions();
    if (!i || !(0, y.isDefined)(i[t])) {
      this["_" + e].option(t, n);
    }
  };
  z._refreshWorkSpace = function (e) {
    var t = this;
    this._cleanWorkspace();
    delete this._workSpace;
    this._renderWorkSpace(e);
    if (this._readyToRenderAppointments) {
      this._appointments.option({
        fixedContainer: this._workSpace.getFixedContainer(),
        allDayContainer: this._workSpace.getAllDayContainer()
      });
      this._waitAsyncTemplate(function () {
        return t._workSpaceRecalculation.resolve();
      });
    }
  };
  z._cleanWorkspace = function () {
    this._appointments.$element().detach();
    this._workSpace._dispose();
    this._workSpace.$element().remove();
    this.option("selectedCellData", []);
  };
  z.getWorkSpaceScrollable = function () {
    return this._workSpace.getScrollable();
  };
  z.getWorkSpaceScrollableContainer = function () {
    return this._workSpace.getScrollableContainer();
  };
  z.getWorkSpace = function () {
    return this._workSpace;
  };
  z.getHeader = function () {
    return this._header;
  };
  z._cleanPopup = function () {
    var e;
    if ((e = this._appointmentPopup) !== null && e !== undefined) {
      e.dispose();
    }
  };
  z._checkRecurringAppointment = function (e, t, n, i, o, a, r, s) {
    var l = this;
    var u = ee.ExpressionUtils.getField(this._dataAccessors, "recurrenceRule", e);
    if ((0, H.getRecurrenceProcessor)().evalRecurrenceRule(u).isValid && this._editing.allowUpdating) {
      switch (s || this.option("recurrenceEditMode")) {
        case "series":
          i();
          break;
        case "occurrence":
          this._excludeAppointmentFromSeries(e, t, n, o, a, r);
          break;
        default:
          if (r) {
            r.cancel = new m.Deferred();
          }
          this._showRecurrenceChangeConfirm(o).done(function (s) {
            if (s === ke) {
              i();
            }
            if (s === De) {
              l._excludeAppointmentFromSeries(e, t, n, o, a, r);
            }
          }).fail(function () {
            return l._appointments.moveAppointmentBack(r);
          });
      }
    } else {
      i();
    }
  };
  z._excludeAppointmentFromSeries = function (e, t, n, i, o, a) {
    var r = this;
    var s = (0, ue.excludeFromRecurrence)(e, n, this._dataAccessors, this._timeZoneCalculator);
    var l = ce({}, t);
    delete l[this._dataAccessors.expr.recurrenceExceptionExpr];
    delete l[this._dataAccessors.expr.recurrenceRuleExpr];
    delete l[this.appointmentDataProvider.keyName];
    if (!i && !o) {
      this.addAppointment(l);
    }
    if (o) {
      this._appointmentPopup.show(l, {
        isToolbarVisible: true,
        action: E.ACTION_TO_APPOINTMENT.EXCLUDE_FROM_SERIES,
        excludeInfo: {
          sourceAppointment: e,
          updatedAppointment: s.source()
        }
      });
      this._editAppointmentData = e;
    } else {
      this._updateAppointment(e, s.source(), function () {
        r._appointments.moveAppointmentBack(a);
      }, a);
    }
  };
  z._createRecurrenceException = function (e, t) {
    var n = [];
    if (e.recurrenceException) {
      n.push(e.recurrenceException);
    }
    n.push(this._getSerializedDate(t, e.startDate, e.allDay));
    return n.join();
  };
  z._getSerializedDate = function (e, t, n) {
    if (n) {
      e.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
    }
    return g.default.serializeDate(e, "yyyyMMddTHHmmssZ");
  };
  z._showRecurrenceChangeConfirm = function (e) {
    var t = S.default.format(e ? "dxScheduler-confirmRecurrenceDeleteMessage" : "dxScheduler-confirmRecurrenceEditMessage");
    var n = S.default.format(e ? "dxScheduler-confirmRecurrenceDeleteSeries" : "dxScheduler-confirmRecurrenceEditSeries");
    var i = S.default.format(e ? "dxScheduler-confirmRecurrenceDeleteOccurrence" : "dxScheduler-confirmRecurrenceEditOccurrence");
    this._recurrenceDialog = (0, k.custom)({
      messageHtml: t,
      showCloseButton: true,
      showTitle: true,
      buttons: [{
        text: n,
        onClick: function () {
          return ke;
        }
      }, {
        text: i,
        onClick: function () {
          return De;
        }
      }],
      popupOptions: {
        wrapperAttr: {
          class: "dx-dialog"
        }
      }
    });
    return this._recurrenceDialog.show();
  };
  z._getUpdatedData = function (e) {
    var t = this;
    function n(e) {
      if (e) {
        return t.timeZoneCalculator.createDate(e, {
          path: "fromGrid"
        });
      } else {
        return undefined;
      }
    }
    function i(e) {
      return !isNaN(new Date(e).getTime());
    }
    var o = this.getTargetCellData();
    var a = (0, Y.createAppointmentAdapter)(e, this._dataAccessors, this.timeZoneCalculator);
    var r = n(o.startDate);
    var s = n(o.endDate);
    var l = new Date(a.startDate);
    var u = new Date(a.endDate);
    var d = r || l;
    if (!i(l)) {
      l = d;
    }
    if (!i(u)) {
      u = s;
    }
    var c = u.getTime() - l.getTime();
    if (this._workSpace.keepOriginalHours() && i(a.startDate) && i(r)) {
      var h = p.default.trimTime;
      var f = this.timeZoneCalculator.createDate(a.startDate, {
        path: "toGrid"
      });
      var g = f.getTime() - h(f).getTime();
      d = new Date(h(o.startDate).getTime() + g);
      d = this.timeZoneCalculator.createDate(d, {
        path: "fromGrid"
      });
    }
    var m = (0, Y.createAppointmentAdapter)({}, this._dataAccessors, this.timeZoneCalculator);
    if (o.allDay !== undefined) {
      m.allDay = o.allDay;
    }
    m.startDate = d;
    var _ = new Date(d.getTime() + c);
    if (this.appointmentTakesAllDay(e) && !m.allDay && this._workSpace.supportAllDayRow()) {
      _ = this._workSpace.calculateEndDate(d);
    }
    if (a.allDay && !this._workSpace.supportAllDayRow() && !this._workSpace.keepOriginalHours()) {
      var v = new Date(d);
      v.setHours(0);
      if ((_ = new Date(v.getTime() + c)).getHours() !== 0) {
        _.setHours(this._getCurrentViewOption("endDayHour"));
      }
    }
    var y = N.default.getTimezoneOffsetChangeInMs(l, u, d, _);
    m.endDate = new Date(_.getTime() - y);
    var b = m.source();
    (0, J.setResourceToAppointment)(this.option("resources"), this.getResourceDataAccessors(), b, o.groups);
    return b;
  };
  z.getTargetedAppointment = function (e, t) {
    var n = Q.utils.dataAccessors.getAppointmentSettings(t);
    var i = Q.utils.dataAccessors.getAppointmentInfo(t);
    var o = (0, s.default)(t).data(this._appointments._itemIndexKey());
    var a = (0, Y.createAppointmentAdapter)(e, this._dataAccessors, this.timeZoneCalculator);
    var r = a.clone();
    if (this._isAgenda() && a.isRecurrent) {
      var l = n.agendaSettings;
      r.startDate = ee.ExpressionUtils.getField(this._dataAccessors, "startDate", l);
      r.endDate = ee.ExpressionUtils.getField(this._dataAccessors, "endDate", l);
    } else if (n) {
      r.startDate = i ? i.sourceAppointment.startDate : a.startDate;
      r.endDate = i ? i.sourceAppointment.endDate : a.endDate;
    }
    var u = r.source();
    if (t) {
      this.setTargetedAppointmentResources(u, t, o);
    }
    if (i) {
      u.displayStartDate = new Date(i.appointment.startDate);
      u.displayEndDate = new Date(i.appointment.endDate);
    }
    return u;
  };
  z.subscribe = function (e, t) {
    this._subscribes[e] = F.default[e] = t;
  };
  z.fire = function (e) {
    var t = this._subscribes[e];
    var n = Array.prototype.slice.call(arguments);
    if (!(0, y.isFunction)(t)) {
      throw I.default.Error("E1031", e);
    }
    return t.apply(this, n.slice(1));
  };
  z.getTargetCellData = function () {
    return this._workSpace.getDataByDroppableCell();
  };
  z._updateAppointment = function (e, t, n, i) {
    var o = {
      newData: t,
      oldData: (0, _.extend)({}, e),
      cancel: false
    };
    var a = function (e) {
      if (n) {
        n.call(this);
      }
      if (e && e.name === "Error") {
        throw e;
      }
    }.bind(this);
    this._actions[Ce](o);
    if (i && !(0, y.isDeferred)(i.cancel)) {
      i.cancel = new m.Deferred();
    }
    return this._processActionResult(o, function (n) {
      var o = this;
      var r = new m.Deferred();
      if (n) {
        a();
        r.resolve();
      } else {
        this._expandAllDayPanel(t);
        try {
          r = this.appointmentDataProvider.update(e, t).done(function () {
            if (i) {
              i.cancel.resolve(false);
            }
          }).always(function (e) {
            return o._onDataPromiseCompleted(Se, e);
          }).fail(function () {
            return a();
          });
        } catch (e) {
          a(e);
          r.resolve();
        }
      }
      return r.promise();
    });
  };
  z._processActionResult = function (e, t) {
    var n = this;
    var i = new m.Deferred();
    function o(e) {
      (0, m.when)((0, m.fromPromise)(e)).always(i.resolve);
    }
    if ((0, y.isPromise)(e.cancel)) {
      (0, m.when)((0, m.fromPromise)(e.cancel)).always(function (i) {
        if (!(0, y.isDefined)(i)) {
          i = e.cancel.state() === "rejected";
        }
        o(t.call(n, i));
      });
    } else {
      o(t.call(this, e.cancel));
    }
    return i.promise();
  };
  z._expandAllDayPanel = function (e) {
    if (!this._isAllDayExpanded() && this.appointmentTakesAllDay(e)) {
      this._workSpace.option("allDayExpanded", true);
    }
  };
  z._onDataPromiseCompleted = function (e, t, n) {
    var i = {
      appointmentData: n || t
    };
    if (t instanceof Error) {
      i.error = t;
    } else if (this._appointmentPopup.visible) {
      this._appointmentPopup.hide();
    }
    this._actions[e](i);
    this._fireContentReadyAction();
  };
  z.getAppointmentsInstance = function () {
    return this._appointments;
  };
  z.getLayoutManager = function () {
    return this._layoutManager;
  };
  z.getRenderingStrategyInstance = function () {
    return this.getLayoutManager().getRenderingStrategyInstance();
  };
  z.getActions = function () {
    return this._actions;
  };
  z.appointmentTakesAllDay = function (e) {
    var t = (0, Y.createAppointmentAdapter)(e, this._dataAccessors, this.timeZoneCalculator);
    return (0, ae.getAppointmentTakesAllDay)(t, this._getCurrentViewOption("startDayHour"), this._getCurrentViewOption("endDayHour"), this._getCurrentViewOption("allDayPanelMode"));
  };
  z.dayHasAppointment = function (e, t, n) {
    var i = this;
    function o(e) {
      return i.timeZoneCalculator.createDate(e, {
        path: "toGrid"
      });
    }
    var a = (0, Y.createAppointmentAdapter)(t, this._dataAccessors, this.timeZoneCalculator);
    var r = new Date(a.startDate);
    var s = new Date(a.endDate);
    r = o(r);
    s = o(s);
    if (e.getTime() === s.getTime()) {
      return r.getTime() === s.getTime();
    }
    if (n) {
      e = p.default.trimTime(e);
      r = p.default.trimTime(r);
      s = p.default.trimTime(s);
    }
    var l = e.getTime();
    var u = r.getTime();
    var d = s.getTime();
    return u <= l && l <= d;
  };
  z.setTargetedAppointmentResources = function (e, t, n) {
    var i = this._getCurrentViewOption("groups");
    if (i != null && i.length) {
      var o;
      var a;
      var r = this.getResourceDataAccessors().setter;
      var s = this._workSpace;
      if (this._isAgenda()) {
        o = function () {
          var e = this.getLayoutManager()._positionMap[n];
          return (0, J.getCellGroups)(e[0].groupIndex, this.getWorkSpace().option("groups"));
        };
        a = function (t, n) {
          r[n.name](e, n.id);
        };
      } else {
        o = function () {
          var e = Q.utils.dataAccessors.getAppointmentSettings(t) || {};
          return s.getCellDataByCoordinates({
            left: e.left,
            top: e.top
          }).groups;
        };
        a = function (t, n) {
          r[t](e, n);
        };
      }
      (0, v.each)(o.call(this), a);
    }
  };
  z.getStartViewDate = function () {
    var e;
    if ((e = this._workSpace) === null || e === undefined) {
      return undefined;
    } else {
      return e.getStartViewDate();
    }
  };
  z.getEndViewDate = function () {
    return this._workSpace.getEndViewDate();
  };
  z.showAddAppointmentPopup = function (e, t) {
    var n = (0, Y.createAppointmentAdapter)({}, this._dataAccessors, this.timeZoneCalculator);
    n.allDay = e.allDay;
    n.startDate = this.timeZoneCalculator.createDate(e.startDate, {
      path: "fromGrid"
    });
    n.endDate = this.timeZoneCalculator.createDate(e.endDate, {
      path: "fromGrid"
    });
    var i = (0, _.extend)(n.source(), t);
    this.showAppointmentPopup(i, true);
  };
  z.showAppointmentPopup = function (e, t, n) {
    var i = this;
    var o = ce({}, n);
    if (o) {
      delete o.displayStartDate;
      delete o.displayEndDate;
    }
    var a = (0, Y.createAppointmentAdapter)(o || e, this._dataAccessors, this.timeZoneCalculator);
    var r = (0, _.extend)({}, e, o);
    var s = t ?? (0, y.isEmptyObject)(e);
    if ((0, y.isEmptyObject)(e)) {
      e = this.createPopupAppointment();
    }
    if (s) {
      delete this._editAppointmentData;
      if (this._editing.allowAdding) {
        this._appointmentPopup.show(e, {
          isToolbarVisible: true,
          action: E.ACTION_TO_APPOINTMENT.CREATE
        });
      }
    } else {
      this._checkRecurringAppointment(e, r, a.startDate, function () {
        i._editAppointmentData = e;
        i._appointmentPopup.show(e, {
          isToolbarVisible: i._editing.allowUpdating,
          action: E.ACTION_TO_APPOINTMENT.UPDATE
        });
      }, false, true);
    }
  };
  z.createPopupAppointment = function () {
    var e = {};
    var t = p.default.dateToMilliseconds;
    var n = new Date(this.option("currentDate"));
    var i = new Date(n.getTime() + this.option("cellDuration") * t("minute"));
    ee.ExpressionUtils.setField(this._dataAccessors, "startDate", e, n);
    ee.ExpressionUtils.setField(this._dataAccessors, "endDate", e, i);
    return e;
  };
  z.hideAppointmentPopup = function (e) {
    var t;
    if ((t = this._appointmentPopup) !== null && t !== undefined && t.visible) {
      if (e) {
        this._appointmentPopup.saveChangesAsync();
      }
      this._appointmentPopup.hide();
    }
  };
  z.showAppointmentTooltip = function (e, t, n) {
    if (e) {
      var i = Q.utils.dataAccessors.getAppointmentSettings(t);
      var o = {
        itemData: n || e,
        groupIndex: i == null ? undefined : i.groupIndex,
        groups: this.option("groups")
      };
      var a = this.createGetAppointmentColor()(o);
      var r = new X.AppointmentTooltipInfo(e, n, a);
      this.showAppointmentTooltipCore(t, [r]);
    }
  };
  z.createGetAppointmentColor = function () {
    var e = this;
    return function (t) {
      var n = {
        resources: e.option("resources"),
        dataAccessors: e.getResourceDataAccessors(),
        loadedResources: e.option("loadedResources"),
        resourceLoaderMap: e.option("resourceLoaderMap")
      };
      return (0, J.getAppointmentColor)(n, t);
    };
  };
  z.showAppointmentTooltipCore = function (e, t, n) {
    var i = this;
    var o = {
      cancel: false,
      appointments: t.map(function (e) {
        var t = {
          appointmentData: e.appointment,
          currentAppointmentData: ce({}, e.targetedAppointment),
          color: e.color
        };
        if (e.settings.info) {
          var n = e.settings.info.appointment;
          var i = n.startDate;
          var o = n.endDate;
          t.currentAppointmentData.displayStartDate = i;
          t.currentAppointmentData.displayEndDate = o;
        }
        return t;
      }),
      targetElement: e
    };
    this._createActionByOption("onAppointmentTooltipShowing")(o);
    if (this._appointmentTooltip.isAlreadyShown(e)) {
      this.hideAppointmentTooltip();
    } else {
      this._processActionResult(o, function (o) {
        if (!o) {
          i._appointmentTooltip.show(e, t, ce({}, i._getExtraAppointmentTooltipOptions(), n));
        }
      });
    }
  };
  z.hideAppointmentTooltip = function () {
    if (this._appointmentTooltip) {
      this._appointmentTooltip.hide();
    }
  };
  z.scrollToTime = function (e, t, n) {
    I.default.log("W0002", "dxScheduler", "scrollToTime", "21.1", "Use the \"scrollTo\" method instead");
    this._workSpace.scrollToTime(e, t, n);
  };
  z.scrollTo = function (e, t, n) {
    this._workSpace.scrollTo(e, t, n);
  };
  z._isHorizontalVirtualScrolling = function () {
    var e = this.option("scrolling");
    var t = e.orientation;
    return e.mode === "virtual" && (t === "horizontal" || t === "both");
  };
  z.addAppointment = function (e) {
    var t = this;
    var n = (0, Y.createAppointmentAdapter)(e, this._dataAccessors, this.timeZoneCalculator);
    n.text = n.text || "";
    var i = n.source(true);
    var o = {
      appointmentData: i,
      cancel: false
    };
    this._actions[ye](o);
    return this._processActionResult(o, function (e) {
      if (e) {
        return new m.Deferred().resolve();
      } else {
        t._expandAllDayPanel(i);
        return t.appointmentDataProvider.add(i).always(function (e) {
          return t._onDataPromiseCompleted(be, e);
        });
      }
    });
  };
  z.updateAppointment = function (e, t) {
    return this._updateAppointment(e, t);
  };
  z.deleteAppointment = function (e) {
    var t = this.fireOnAppointmentDeleting(e);
    this.processDeleteAppointment(e, t);
  };
  z.fireOnAppointmentDeleting = function (e, t) {
    var n = {
      appointmentData: e,
      targetedAppointmentData: t,
      cancel: false
    };
    this._actions[xe](n);
    return n;
  };
  z.processDeleteAppointment = function (e, t) {
    this._processActionResult(t, function (t) {
      var n = this;
      if (!t) {
        this.appointmentDataProvider.remove(e).always(function (t) {
          return n._onDataPromiseCompleted(we, t, e);
        });
      }
    });
  };
  z.deleteRecurrence = function (e, t, n) {
    var i = this;
    this._checkRecurringAppointment(e, {}, t, function () {
      i.processDeleteAppointment(e, {
        cancel: false
      });
    }, true, false, null, n);
  };
  z.focus = function () {
    if (this._editAppointmentData) {
      this._appointments.focus();
    } else {
      this._workSpace.focus();
    }
  };
  z.getFirstDayOfWeek = function () {
    if ((0, y.isDefined)(this.option("firstDayOfWeek"))) {
      return this.option("firstDayOfWeek");
    } else {
      return C.default.firstDayOfWeekIndex();
    }
  };
  z._validateKeyFieldIfAgendaExist = function () {
    if (this.appointmentDataProvider.isDataSourceInit) {
      var e = !!this._getViewByName("agenda");
      var t = !!this.appointmentDataProvider.keyName;
      if (e && !t) {
        I.default.log("W1023");
      }
    }
  };
  z._validateCellDuration = function () {
    if ((this._getCurrentViewOption("endDayHour") - this._getCurrentViewOption("startDayHour")) * 60 % this._getCurrentViewOption("cellDuration") != 0) {
      I.default.log("W1015");
    }
  };
  z._validateDayHours = function () {
    var e = this._getCurrentViewOption("startDayHour");
    var t = this._getCurrentViewOption("endDayHour");
    (0, te.validateDayHours)(e, t);
  };
  z._getDragBehavior = function () {
    return this._workSpace.dragBehavior;
  };
  o = i;
  if (x = [{
    key: "filteredItems",
    get: function () {
      this._filteredItems ||= [];
      return this._filteredItems;
    },
    set: function (e) {
      this._filteredItems = e;
    }
  }, {
    key: "preparedItems",
    get: function () {
      this._preparedItems ||= [];
      return this._preparedItems;
    },
    set: function (e) {
      this._preparedItems = e;
    }
  }, {
    key: "currentView",
    get: function () {
      return (0, se.getCurrentView)(this.option("currentView"), this.option("views"));
    }
  }, {
    key: "currentViewType",
    get: function () {
      if ((0, y.isObject)(this.currentView)) {
        return this.currentView.type;
      } else {
        return this.currentView;
      }
    }
  }, {
    key: "timeZoneCalculator",
    get: function () {
      this._timeZoneCalculator ||= (0, le.createTimeZoneCalculator)(this.option("timeZone"));
      return this._timeZoneCalculator;
    }
  }]) {
    he(o.prototype, x);
  }
  if (T) {
    he(o, T);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(T.default);
Te.include(x.default);
(0, o.default)("dxScheduler", Te);
var Ee = Te;
exports.default = Ee;
module.exports = exports.default;
module.exports.default = exports.default;