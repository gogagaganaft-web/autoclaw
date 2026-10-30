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
var o = require("./58664.js");
var a = M(require("./68374.js"));
var r = M(require("./73349.js"));
var s = M(require("./55994.js"));
var l = require("./97906.js");
var u = require("./31648.js");
var d = M(require("./91198.js"));
var c = require("./20576.js");
var h = require("./35922.js");
var f = require("./95479.js");
var p = require("./48013.js");
var g = require("./89386.js");
var m = require("./13306.js");
var _ = require("./6415.js");
var v = require("./88609.js");
var y = M(require("./99393.js"));
var b = require("./20990.js");
var x = require("./39611.js");
var w = require("./85272.js");
var C = M(require("./11050.js"));
var S = M(require("./32511.js"));
var k = require("./27728.js");
var D = require("./62060.js");
var I = require("./8763.js");
var T = require("./86474.js");
var E = require("./5480.js");
var O = require("./11305.js");
var A = require("./37518.js");
var P = require("./13658.js");
function M(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function R(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return B(e);
    }
  }(e) || function (e) {
    if (typeof Symbol != "undefined" && e[Symbol.iterator] != null || e["@@iterator"] != null) {
      return Array.from(e);
    }
  }(e) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return B(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return B(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function B(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function L() {
  return (L = Object.assign ? Object.assign.bind() : function (e) {
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
function V(e, t) {
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
function F(e, t) {
  return (F = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var H = (0, x.addNamespace)(w.name, "dxSchedulerAppointment");
var N = d.default.dateToMilliseconds;
var z = function (e) {
  var t;
  var n;
  function i(t, n) {
    var i;
    (i = e.call(this, t, n) || this)._virtualAppointments = {};
    return i;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  F(t, n);
  var y;
  var w;
  var C;
  var M = i.prototype;
  M.notifyObserver = function (e, t) {
    var n = this.option("observer");
    if (n) {
      n.fire(e, t);
    }
  };
  M.invoke = function () {
    var e = this.option("observer");
    if (e) {
      return e.fire.apply(e, arguments);
    }
  };
  M._dispose = function () {
    clearTimeout(this._appointmentClickTimeout);
    e.prototype._dispose.call(this);
  };
  M._supportedKeys = function () {
    var t = e.prototype._supportedKeys.call(this);
    var n = this._$currentAppointment;
    return (0, m.extend)(t, {
      escape: function () {
        var e;
        var t;
        var i;
        if (this.resizeOccur) {
          this.moveAppointmentBack();
          this.resizeOccur = false;
          if ((e = n.dxResizable("instance")) !== null && e !== undefined) {
            e._detachEventHandlers();
          }
          if ((t = n.dxResizable("instance")) !== null && t !== undefined) {
            t._attachEventHandlers();
          }
          if ((i = n.dxResizable("instance")) !== null && i !== undefined) {
            i._toggleResizingClass(false);
          }
        }
      }.bind(this),
      del: function (e) {
        if (this.option("allowDelete")) {
          e.preventDefault();
          var t = this._getItemData(e.target);
          this.notifyObserver("onDeleteButtonPress", {
            data: t,
            target: e.target
          });
        }
      }.bind(this),
      tab: function (e) {
        var t = this._getAccessAppointments();
        var n = t.filter(".dx-state-focused").data(k.APPOINTMENT_SETTINGS_KEY).sortedIndex;
        var i = t.length - 1;
        if (n > 0 && e.shiftKey || n < i && !e.shiftKey) {
          e.preventDefault();
          if (e.shiftKey) {
            n--;
          } else {
            n++;
          }
          var o = this._getAppointmentByIndex(n);
          this._resetTabIndex(o);
          s.default.trigger(o, "focus");
        }
      }
    });
  };
  M._getAppointmentByIndex = function (e) {
    return this._getAccessAppointments().filter(function (t, n) {
      return (0, l.data)(n, k.APPOINTMENT_SETTINGS_KEY).sortedIndex === e;
    }).eq(0);
  };
  M._getAccessAppointments = function () {
    return this._itemElements().filter(":visible").not(".dx-state-disabled");
  };
  M._resetTabIndex = function (e) {
    this._focusTarget().attr("tabIndex", -1);
    e.attr("tabIndex", this.option("tabIndex"));
  };
  M._moveFocus = function () {};
  M._focusTarget = function () {
    return this._itemElements();
  };
  M._renderFocusTarget = function () {
    var e = this._getAppointmentByIndex(0);
    this._resetTabIndex(e);
  };
  M._focusInHandler = function (t) {
    e.prototype._focusInHandler.call(this, t);
    this._$currentAppointment = (0, a.default)(t.target);
    this.option("focusedElement", (0, _.getPublicElement)((0, a.default)(t.target)));
  };
  M._focusOutHandler = function (t) {
    var n = this._getAppointmentByIndex(0);
    this.option("focusedElement", (0, _.getPublicElement)(n));
    e.prototype._focusOutHandler.call(this, t);
  };
  M._eventBindingTarget = function () {
    return this._itemContainer();
  };
  M._getDefaultOptions = function () {
    return (0, m.extend)(e.prototype._getDefaultOptions.call(this), {
      noDataText: null,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      tabIndex: 0,
      fixedContainer: null,
      allDayContainer: null,
      allowDrag: true,
      allowResize: true,
      allowAllDayResize: true,
      onAppointmentDblClick: null,
      _collectorOffset: 0,
      groups: [],
      resources: []
    });
  };
  M._optionChanged = function (t) {
    if (!this.option("isRenovatedAppointments")) {
      switch (t.name) {
        case "items":
          this._cleanFocusState();
          this._clearDropDownItems();
          this._clearDropDownItemsElements();
          this._repaintAppointments(t.value);
          this._renderDropDownAppointments();
          this._attachAppointmentsEvents();
          break;
        case "fixedContainer":
        case "allDayContainer":
        case "onAppointmentDblClick":
          break;
        case "allowDrag":
        case "allowResize":
        case "allowAllDayResize":
          this._invalidate();
          break;
        case "focusedElement":
          this._resetTabIndex((0, a.default)(t.value));
          e.prototype._optionChanged.call(this, t);
          break;
        case "allowDelete":
          break;
        case "focusStateEnabled":
          this._clearDropDownItemsElements();
          this._renderDropDownAppointments();
          e.prototype._optionChanged.call(this, t);
          break;
        default:
          e.prototype._optionChanged.call(this, t);
      }
    }
  };
  M._isAllDayAppointment = function (e) {
    return e.settings.length && e.settings[0].allDay || false;
  };
  M._isRepaintAppointment = function (e) {
    return !(0, h.isDefined)(e.needRepaint) || e.needRepaint === true;
  };
  M._isRepaintAll = function (e) {
    if (this.isAgendaView) {
      return true;
    }
    for (var t = 0; t < e.length; t++) {
      if (!this._isRepaintAppointment(e[t])) {
        return false;
      }
    }
    return true;
  };
  M._applyFragment = function (e, t) {
    if (e.children().length > 0) {
      this._getAppointmentContainer(t).append(e);
    }
  };
  M._onEachAppointment = function (e, t, n, i) {
    var o = this;
    if ((e == null ? undefined : e.needRemove) === true) {
      this._clearItem(e);
    } else if (i || this._isRepaintAppointment(e)) {
      e.needRepaint = false;
      o._clearItem(e);
      o._renderItem(t, e, n);
    }
  };
  M._repaintAppointments = function (e) {
    var t = this;
    this._renderByFragments(function (n, i) {
      var o = t._isRepaintAll(e);
      if (o) {
        t._getAppointmentContainer(true).html("");
        t._getAppointmentContainer(false).html("");
      }
      if (!e.length) {
        t._cleanItemContainer();
      }
      e.forEach(function (e, a) {
        var r = t._isAllDayAppointment(e) ? i : n;
        t._onEachAppointment(e, a, r, o);
      });
    });
  };
  M._renderByFragments = function (e) {
    if (this.isVirtualScrolling) {
      var t = (0, a.default)(r.default.createDocumentFragment());
      var n = (0, a.default)(r.default.createDocumentFragment());
      e(t, n);
      this._applyFragment(t, false);
      this._applyFragment(n, true);
    } else {
      e(this._getAppointmentContainer(false), this._getAppointmentContainer(true));
    }
  };
  M._attachAppointmentsEvents = function () {
    this._attachClickEvent();
    this._attachHoldEvent();
    this._attachContextMenuEvent();
    this._attachAppointmentDblClick();
    this._renderFocusState();
    this._attachFeedbackEvents();
    this._attachHoverEvents();
  };
  M._clearItem = function (e) {
    var t = this._findItemElementByItem(e.itemData);
    if (t.length) {
      (0, f.each)(t, function (e, t) {
        t.detach();
        t.remove();
      });
    }
  };
  M._clearDropDownItems = function () {
    this._virtualAppointments = {};
  };
  M._clearDropDownItemsElements = function () {
    this.invoke("clearCompactAppointments");
  };
  M._findItemElementByItem = function (e) {
    var t = [];
    var n = this;
    this.itemElements().each(function () {
      var i = (0, a.default)(this);
      if (i.data(n._itemDataKey()) === e) {
        t.push(i);
      }
    });
    return t;
  };
  M._itemClass = function () {
    return D.APPOINTMENT_ITEM_CLASS;
  };
  M._itemContainer = function () {
    var t = e.prototype._itemContainer.call(this);
    var n = t;
    var i = this.option("allDayContainer");
    if (i) {
      n = t.add(i);
    }
    return n;
  };
  M._cleanItemContainer = function () {
    e.prototype._cleanItemContainer.call(this);
    var t = this.option("allDayContainer");
    if (t) {
      t.empty();
    }
    this._virtualAppointments = {};
  };
  M._clean = function () {
    e.prototype._clean.call(this);
    delete this._$currentAppointment;
    delete this._initialSize;
    delete this._initialCoordinates;
  };
  M._init = function () {
    e.prototype._init.call(this);
    this.$element().addClass("dx-scheduler-scrollable-appointments");
    this._preventSingleAppointmentClick = false;
  };
  M._renderAppointmentTemplate = function (e, t, n) {
    var i = {
      isAllDay: t.allDay,
      isRecurrence: t.recurrenceRule,
      html: (0, h.isPlainObject)(t) && t.html ? t.html : undefined
    };
    var o = this.invoke("getTextAndFormatDate", n.appointmentData, this._currentAppointmentSettings.agendaSettings || n.targetedAppointmentData, "TIME");
    e.append(this.isAgendaView ? (0, I.createAgendaAppointmentLayout)(o, i) : (0, I.createAppointmentLayout)(o, i));
  };
  M._executeItemRenderAction = function (e, t, n) {
    var i = this._getItemRenderAction();
    if (i) {
      i(this.invoke("mapAppointmentFields", {
        itemData: t,
        itemElement: n
      }));
    }
    delete this._currentAppointmentSettings;
  };
  M._itemClickHandler = function (t) {
    e.prototype._itemClickHandler.call(this, t, {}, {
      afterExecute: function (e) {
        this._processItemClick(e.args[0].event);
      }.bind(this)
    });
  };
  M._processItemClick = function (e) {
    var t = (0, a.default)(e.currentTarget);
    var n = this._getItemData(t);
    if (e.type === "keydown" || (0, x.isFakeClickEvent)(e)) {
      this.notifyObserver("showEditAppointmentPopup", {
        data: n,
        target: t
      });
    } else {
      this._appointmentClickTimeout = setTimeout(function () {
        if (!this._preventSingleAppointmentClick && r.default.getBody().contains(t[0])) {
          this.notifyObserver("showAppointmentTooltip", {
            data: n,
            target: t
          });
        }
        this._preventSingleAppointmentClick = false;
      }.bind(this), 300);
    }
  };
  M._extendActionArgs = function (t) {
    var n = e.prototype._extendActionArgs.call(this, t);
    return this.invoke("mapAppointmentFields", n);
  };
  M._render = function () {
    e.prototype._render.call(this);
    this._attachAppointmentDblClick();
  };
  M._attachAppointmentDblClick = function () {
    var e = this;
    var t = e._itemSelector();
    var n = this._itemContainer();
    s.default.off(n, H, t);
    s.default.on(n, H, t, function (t) {
      e._itemDXEventHandler(t, "onAppointmentDblClick", {}, {
        afterExecute: function (t) {
          e._dblClickHandler(t.args[0].event);
        }
      });
    });
  };
  M._dblClickHandler = function (e) {
    var t = (0, a.default)(e.currentTarget);
    var n = this._getItemData(t);
    clearTimeout(this._appointmentClickTimeout);
    this._preventSingleAppointmentClick = true;
    this.notifyObserver("showEditAppointmentPopup", {
      data: n,
      target: t
    });
  };
  M._renderItem = function (t, n, i) {
    var o = n.itemData;
    var a = [];
    for (var r = 0; r < n.settings.length; r++) {
      var s = n.settings[r];
      this._currentAppointmentSettings = s;
      var l = e.prototype._renderItem.call(this, t, o, i);
      l.data(k.APPOINTMENT_SETTINGS_KEY, s);
      a.push(l);
    }
    return a;
  };
  M._getItemContent = function (t) {
    t.data(k.APPOINTMENT_SETTINGS_KEY, this._currentAppointmentSettings);
    return e.prototype._getItemContent.call(this, t);
  };
  M._createItemByTemplate = function (e, t) {
    var n = t.itemData;
    var i = t.container;
    var o = t.index;
    return e.render({
      model: {
        appointmentData: n,
        targetedAppointmentData: this.invoke("getTargetedAppointmentData", n, (0, a.default)(i).parent())
      },
      container: i,
      index: o
    });
  };
  M._getAppointmentContainer = function (e) {
    var t = this.option("allDayContainer");
    var n = this.itemsContainer().not(t);
    if (e && t) {
      n = t;
    }
    return n;
  };
  M._postprocessRenderItem = function (e) {
    this._renderAppointment(e.itemElement, this._currentAppointmentSettings);
  };
  M._renderAppointment = function (e, t) {
    e.data(k.APPOINTMENT_SETTINGS_KEY, t);
    this._applyResourceDataAttr(e);
    var n = this._getItemData(e);
    var i = this.invoke("getAppointmentGeometry", t);
    var o = this.option("allowResize") && (!(0, h.isDefined)(t.skipResizing) || (0, h.isString)(t.skipResizing));
    var a = this.option("allowDrag");
    var r = t.allDay;
    this.invoke("setCellDataCacheAlias", this._currentAppointmentSettings, i);
    if (t.virtual) {
      var s = {
        itemData: n,
        groupIndex: t.groupIndex,
        groups: this.option("groups")
      };
      var l = this.option("getAppointmentColor")(s);
      this._processVirtualAppointment(t, e, n, l);
    } else {
      var u;
      var d = {
        data: n,
        groupIndex: t.groupIndex,
        observer: this.option("observer"),
        geometry: i,
        direction: t.direction || "vertical",
        allowResize: o,
        allowDrag: a,
        allDay: r,
        reduced: t.appointmentReduced,
        isCompact: t.isCompact,
        startDate: new Date((u = t.info) === null || u === undefined ? undefined : u.appointment.startDate),
        cellWidth: this.invoke("getCellWidth"),
        cellHeight: this.invoke("getCellHeight"),
        resizableConfig: this._resizableConfig(n, t),
        groups: this.option("groups"),
        getAppointmentColor: this.option("getAppointmentColor"),
        getResourceDataAccessors: this.option("getResourceDataAccessors")
      };
      if (this.isAgendaView) {
        var c = this.option("getAgendaResourceProcessor")();
        d.createPlainResourceListAsync = function (e) {
          return c.createListAsync(e);
        };
      }
      this._createComponent(e, this.isAgendaView ? b.AgendaAppointment : b.Appointment, L({}, d, {
        dataAccessors: this.option("dataAccessors"),
        getResizableStep: this.option("getResizableStep")
      }));
    }
  };
  M._applyResourceDataAttr = function (e) {
    var t = this.option("getResourceDataAccessors")();
    var n = this._getItemData(e);
    (0, f.each)(t.getter, function (i) {
      var o = t.getter[i](n);
      if ((0, h.isDefined)(o)) {
        var a = `data-${(0, c.normalizeKey)(i.toLowerCase())}-`;
        (0, g.wrapToArray)(o).forEach(function (t) {
          return e.attr(a + (0, c.normalizeKey)(t), true);
        });
      }
    });
  };
  M._resizableConfig = function (e, t) {
    return {
      area: this._calculateResizableArea(t, e),
      onResizeStart: function (e) {
        this.resizeOccur = true;
        this._$currentAppointment = (0, a.default)(e.element);
        if (this.invoke("needRecalculateResizableArea")) {
          var t = this._calculateResizableArea(this._$currentAppointment.data(k.APPOINTMENT_SETTINGS_KEY), this._$currentAppointment.data("dxItemData"));
          e.component.option("area", t);
          e.component._renderDragOffsets(e.event);
        }
        this._initialSize = {
          width: e.width,
          height: e.height
        };
        this._initialCoordinates = (0, u.locate)(this._$currentAppointment);
      }.bind(this),
      onResizeEnd: function (e) {
        this.resizeOccur = false;
        this._resizeEndHandler(e);
      }.bind(this)
    };
  };
  M._calculateResizableArea = function (e, t) {
    var n = this.$element().closest(".dx-scrollable-content");
    return this.invoke("getResizableAppointmentArea", {
      coordinates: {
        left: e.left,
        top: 0,
        groupIndex: e.groupIndex
      },
      allDay: e.allDay
    }) || n;
  };
  M._resizeEndHandler = function (e) {
    var t = (0, a.default)(e.element);
    var n = t.data("dxAppointmentSettings");
    var i = n.allDay;
    var o = n.info;
    var r = this._getItemData(t);
    var s = {};
    if (i) {
      s = this.resizeAllDay(e);
    } else {
      var l = this._getEndResizeAppointmentStartDate(e, r, o.appointment);
      var u = o.appointment.endDate;
      s = this._getDateRange(e, l, u);
    }
    this.updateResizedAppointment(t, s, this.option("dataAccessors"), this.option("timeZoneCalculator"));
  };
  M.resizeAllDay = function (e) {
    var t = (0, a.default)(e.element);
    var n = this.option("timeZoneCalculator");
    var i = this.option("dataAccessors");
    return (0, P.getAppointmentDateRange)({
      handles: e.handles,
      appointmentSettings: t.data("dxAppointmentSettings"),
      isVerticalViewDirection: this.option("isVerticalViewDirection")(),
      isVerticalGroupedWorkSpace: this.option("isVerticalGroupedWorkSpace")(),
      appointmentRect: (0, A.getBoundingRect)(t[0]),
      parentAppointmentRect: (0, A.getBoundingRect)(t.parent()[0]),
      viewDataProvider: this.option("getViewDataProvider")(),
      isDateAndTimeView: this.option("isDateAndTimeView")(),
      startDayHour: this.invoke("getStartDayHour"),
      endDayHour: this.invoke("getEndDayHour"),
      timeZoneCalculator: n,
      dataAccessors: i,
      rtlEnabled: this.option("rtlEnabled"),
      DOMMetaData: this.option("getDOMElementsMetaData")()
    });
  };
  M.updateResizedAppointment = function (e, t, n, i) {
    var o = this._getItemData(e);
    var a = (0, E.createAppointmentAdapter)(o, n, i).clone();
    a.startDate = new Date(t.startDate);
    a.endDate = new Date(t.endDate);
    this.notifyObserver("updateAppointmentAfterResize", {
      target: o,
      data: a.clone({
        pathTimeZone: "fromGrid"
      }).source(),
      $appointment: e
    });
  };
  M._getEndResizeAppointmentStartDate = function (e, t, n) {
    var i = this.option("timeZoneCalculator");
    var o = (0, E.createAppointmentAdapter)(t, this.option("dataAccessors"), i);
    var a = n.startDate;
    var r = (0, v.getRecurrenceProcessor)();
    var s = o.recurrenceRule;
    var l = o.startDateTimeZone;
    var u = this.invoke("isAllDay", t);
    var d = r.isValidRecurrenceRule(s);
    if (!e.handles.top && !d && !u) {
      a = i.createDate(o.startDate, {
        appointmentTimeZone: l,
        path: "toGrid"
      });
    }
    return a;
  };
  M._getDateRange = function (e, t, n) {
    var i;
    var o;
    var a = this._getItemData(e.element);
    var r = this.invoke("getDeltaTime", e, this._initialSize, a);
    var s = this.invoke("getRenderingStrategyDirection");
    var l = this.invoke("isAllDay", a);
    var u = this.invoke("needCorrectAppointmentDates") && !l;
    if (s !== "vertical" || l ? this.option("rtlEnabled") ? e.handles.right : e.handles.left : e.handles.top) {
      i = u ? this._correctStartDateByDelta(t, r) : t.getTime() - r;
      i += S.default.getTimezoneOffsetChangeInMs(t, n, i, n);
      o = n.getTime();
    } else {
      i = t.getTime();
      o = u ? this._correctEndDateByDelta(n, r) : n.getTime() + r;
      o -= S.default.getTimezoneOffsetChangeInMs(t, n, t, o);
    }
    return {
      startDate: new Date(i),
      endDate: new Date(o)
    };
  };
  M._correctEndDateByDelta = function (e, t) {
    var n = this.invoke("getEndDayHour");
    var i = this.invoke("getStartDayHour");
    var o = e.getTime() + t;
    var a = (n - i) * N("hour");
    var r = t > 0 ? Math.ceil(t / a) : Math.floor(t / a);
    var s = new Date(e);
    var l = new Date(e);
    l.setHours(i, 0, 0, 0);
    s.setHours(n, 0, 0, 0);
    if (o > s.getTime() || o <= l.getTime()) {
      var u = t - (s.getTime() - e.getTime());
      var d = new Date(e).setDate(e.getDate() + r);
      var c = new Date(d);
      c.setHours(i, 0, 0, 0);
      o = c.getTime() + u - a * (r - 1);
    }
    return o;
  };
  M._correctStartDateByDelta = function (e, t) {
    var n = this.invoke("getEndDayHour");
    var i = this.invoke("getStartDayHour");
    var o = e.getTime() - t;
    var a = (n - i) * N("hour");
    var r = t > 0 ? Math.ceil(t / a) : Math.floor(t / a);
    var s = new Date(e);
    var l = new Date(e);
    l.setHours(i, 0, 0, 0);
    s.setHours(n, 0, 0, 0);
    if (o < l.getTime() || o >= s.getTime()) {
      var u = t - (e.getTime() - l.getTime());
      var d = new Date(e.setDate(e.getDate() - r));
      d.setHours(n, 0, 0, 0);
      o = d.getTime() - u + a * (r - 1);
    }
    return o;
  };
  M._processVirtualAppointment = function (e, t, n, i) {
    var o = e.virtual;
    var a = o.index;
    if (!(0, h.isDefined)(this._virtualAppointments[a])) {
      this._virtualAppointments[a] = {
        coordinates: {
          top: o.top,
          left: o.left
        },
        items: {
          data: [],
          colors: [],
          settings: []
        },
        isAllDay: !!o.isAllDay,
        buttonColor: i
      };
    }
    e.targetedAppointmentData = this.invoke("getTargetedAppointmentData", n, t);
    this._virtualAppointments[a].items.settings.push(e);
    this._virtualAppointments[a].items.data.push(n);
    this._virtualAppointments[a].items.colors.push(i);
    t.remove();
  };
  M._renderContentImpl = function () {
    e.prototype._renderContentImpl.call(this);
    this._renderDropDownAppointments();
  };
  M._renderDropDownAppointments = function () {
    var e = this;
    this._renderByFragments(function (t, n) {
      (0, f.each)(e._virtualAppointments, function (e) {
        var i = this._virtualAppointments[e];
        var o = i.items;
        var a = i.coordinates;
        var r = i.isAllDay ? n : t;
        var s = a.left;
        var l = this.invoke("getDropDownAppointmentWidth", i.isAllDay);
        var u = this.invoke("getDropDownAppointmentHeight");
        var d = this.option("rtlEnabled") ? l : 0;
        this.notifyObserver("renderCompactAppointments", {
          $container: r,
          coordinates: {
            top: a.top,
            left: s + d
          },
          items: o,
          buttonColor: i.buttonColor,
          width: l - this.option("_collectorOffset"),
          height: u,
          onAppointmentClick: this.option("onItemClick"),
          allowDrag: this.option("allowDrag"),
          cellWidth: this.invoke("getCellWidth"),
          isCompact: this.invoke("isAdaptive") || this._isGroupCompact(i)
        });
      }.bind(e));
    });
  };
  M._isGroupCompact = function (e) {
    return !e.isAllDay && this.invoke("supportCompactDropDownAppointments");
  };
  M._sortAppointmentsByStartDate = function (e) {
    return (0, O.sortAppointmentsByStartDate)(e, this.option("dataAccessors"));
  };
  M._processRecurrenceAppointment = function (e, t, n) {
    var i = T.ExpressionUtils.getField(this.option("dataAccessors"), "recurrenceRule", e);
    var o = {
      parts: [],
      indexes: []
    };
    if (i) {
      var a = e.settings || e;
      var r = new Date(T.ExpressionUtils.getField(this.option("dataAccessors"), "startDate", a));
      var s = T.ExpressionUtils.getField(this.option("dataAccessors"), "startDateTimeZone", e);
      var l = new Date(T.ExpressionUtils.getField(this.option("dataAccessors"), "endDate", a));
      var u = l.getTime() - r.getTime();
      var d = T.ExpressionUtils.getField(this.option("dataAccessors"), "recurrenceException", e);
      var c = this.invoke("getStartViewDate");
      var h = this.invoke("getEndViewDate");
      var f = this.option("timeZoneCalculator");
      var p = (0, v.getRecurrenceProcessor)().generateDates({
        rule: i,
        exception: d,
        start: r,
        end: l,
        min: c,
        max: h,
        appointmentTimezoneOffset: f.getOriginStartDateOffsetInMs(r, s, false)
      });
      for (var g = e.settings ? 1 : p.length, _ = 0; _ < g; _++) {
        var y = (0, m.extend)({}, e, true);
        if (p[_]) {
          var b = this._applyStartDateToObj(p[_], {});
          this._applyEndDateToObj(new Date(p[_].getTime() + u), b);
          y.settings = b;
        } else {
          y.settings = a;
        }
        o.parts.push(y);
        if (!n) {
          this._processLongAppointment(y, o);
        }
      }
      o.indexes.push(t);
    }
    return o;
  };
  M._processLongAppointment = function (e, t) {
    var n = this.splitAppointmentByDay(e);
    var i = n.length;
    var o = this.invoke("getEndViewDate").getTime();
    var a = this.invoke("getStartViewDate").getTime();
    var r = this.option("timeZoneCalculator");
    t = t || {
      parts: []
    };
    if (i > 1) {
      (0, m.extend)(e, n[0]);
      for (var s = 1; s < i; s++) {
        var l = T.ExpressionUtils.getField(this.option("dataAccessors"), "startDate", n[s].settings).getTime();
        if ((l = r.createDate(l, {
          path: "toGrid"
        })) < o && l > a) {
          t.parts.push(n[s]);
        }
      }
    }
    return t;
  };
  M._reduceRecurrenceAppointments = function (e, t) {
    (0, f.each)(e, function (e, n) {
      t.splice(n - e, 1);
    });
  };
  M._combineAppointments = function (e, t) {
    if (t.length) {
      e.push.apply(e, R(t));
    }
    this._sortAppointmentsByStartDate(e);
  };
  M._applyStartDateToObj = function (e, t) {
    T.ExpressionUtils.setField(this.option("dataAccessors"), "startDate", t, e);
    return t;
  };
  M._applyEndDateToObj = function (e, t) {
    T.ExpressionUtils.setField(this.option("dataAccessors"), "endDate", t, e);
    return t;
  };
  M.moveAppointmentBack = function (e) {
    var t = this._$currentAppointment;
    var n = this._initialSize;
    var i = this._initialCoordinates;
    if (e) {
      this._removeDragSourceClassFromDraggedAppointment();
      if ((0, h.isDeferred)(e.cancel)) {
        e.cancel.resolve(true);
      } else {
        e.cancel = true;
      }
    }
    if (t && !e) {
      if (i) {
        (0, u.move)(t, i);
        delete this._initialSize;
      }
      if (n) {
        (0, o.setOuterWidth)(t, n.width);
        (0, o.setOuterHeight)(t, n.height);
        delete this._initialCoordinates;
      }
    }
  };
  M.focus = function () {
    if (this._$currentAppointment) {
      var e = (0, _.getPublicElement)(this._$currentAppointment);
      this.option("focusedElement", e);
      s.default.trigger(e, "focus");
    }
  };
  M.splitAppointmentByDay = function (e) {
    var t = e.settings || e;
    var n = this.option("dataAccessors");
    var i = new Date(T.ExpressionUtils.getField(n, "startDate", t));
    var o = d.default.makeDate(i);
    var a = d.default.makeDate(T.ExpressionUtils.getField(n, "endDate", t));
    var r = this.invoke("getEndViewDate");
    var s = this.invoke("getStartDayHour");
    var l = this.invoke("getEndDayHour");
    var u = this.option("timeZoneCalculator");
    var c = (0, E.createAppointmentAdapter)(e, n, u);
    var h = (0, O.getAppointmentTakesSeveralDays)(c);
    var f = [];
    o = u.createDate(o, {
      path: "toGrid"
    });
    a = u.createDate(a, {
      path: "toGrid"
    });
    if (o.getHours() <= l && o.getHours() >= s && !h) {
      f.push(this._applyStartDateToObj(new Date(o), {
        appointmentData: e
      }));
      o.setDate(o.getDate() + 1);
    }
    while (h && o.getTime() < a.getTime() && o < r) {
      var g = new Date(o);
      var m = new Date(o);
      this._checkStartDate(g, i, s);
      this._checkEndDate(m, a, l);
      var _ = (0, p.deepExtendArraySafe)({}, e, true);
      var v = {};
      this._applyStartDateToObj(g, v);
      this._applyEndDateToObj(m, v);
      _.settings = v;
      f.push(_);
      (o = d.default.trimTime(o)).setDate(o.getDate() + 1);
      o.setHours(s);
    }
    return f;
  };
  M._checkStartDate = function (e, t, n) {
    if (!d.default.sameDate(e, t) || e.getHours() <= n) {
      e.setHours(n, 0, 0, 0);
    } else {
      e.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
    }
  };
  M._checkEndDate = function (e, t, n) {
    if (!d.default.sameDate(e, t) || e.getHours() > n) {
      e.setHours(n, 0, 0, 0);
    } else {
      e.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
    }
  };
  M._removeDragSourceClassFromDraggedAppointment = function () {
    this._itemElements().filter(`.${D.APPOINTMENT_DRAG_SOURCE_CLASS}`).each(function (e, t) {
      (0, a.default)(t).dxSchedulerAppointment("instance").option("isDragSource", false);
    });
  };
  M._setDragSourceAppointment = function (e, t) {
    var n = this._findItemElementByItem(e);
    var i = t.info.sourceAppointment;
    var o = i.startDate;
    var a = i.endDate;
    var r = t.groupIndex;
    n.forEach(function (e) {
      var t = e.data(k.APPOINTMENT_SETTINGS_KEY);
      var n = t.info;
      var i = t.groupIndex;
      var s = n.sourceAppointment;
      var l = s.startDate;
      var u = s.endDate;
      var d = e.dxSchedulerAppointment("instance");
      var c = o.getTime() === l.getTime() && a.getTime() === u.getTime() && r === i;
      d.option("isDragSource", c);
    });
  };
  M.updateResizableArea = function () {
    var e = this;
    var t = this.$element().find(".dx-scheduler-appointment.dx-resizable");
    var n = (0, c.grep)(t, function (e) {
      var t = (0, a.default)(e).dxResizable("instance").option();
      var n = t.area;
      var i = t.handles;
      return (i === "right left" || i === "left right") && (0, h.isPlainObject)(n);
    });
    (0, f.each)(n, function (t, n) {
      var i = (0, a.default)(n);
      var o = (0, u.locate)(i);
      var r = e._getItemData(i);
      var s = e._calculateResizableArea({
        left: o.left
      }, r);
      i.dxResizable("instance").option("area", s);
    });
  };
  y = i;
  if (w = [{
    key: "isAgendaView",
    get: function () {
      return this.invoke("isCurrentViewAgenda");
    }
  }, {
    key: "isVirtualScrolling",
    get: function () {
      return this.invoke("isVirtualScrolling");
    }
  }, {
    key: "appointmentDataProvider",
    get: function () {
      return this.option("getAppointmentDataProvider")();
    }
  }]) {
    V(y.prototype, w);
  }
  if (C) {
    V(y, C);
  }
  Object.defineProperty(y, "prototype", {
    writable: false
  });
  return i;
}(C.default);
(0, y.default)("dxSchedulerAppointments", z);
var j = z;
exports.default = j;
module.exports = exports.default;
module.exports.default = exports.default;