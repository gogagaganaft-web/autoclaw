exports.default = undefined;
var i = h(require("./68374.js"));
var o = require("./35922.js");
var a = h(require("./91198.js"));
var r = require("./95479.js");
var s = require("./13306.js");
var l = require("./62060.js");
var u = require("./9259.js");
var d = require("./5480.js");
var c = require("./36816.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = a.default.dateToMilliseconds;
var p = {
  isCurrentViewAgenda: function () {
    return this.currentViewType === "agenda";
  },
  currentViewUpdated: function (e) {
    this.option("currentView", e);
  },
  currentDateUpdated: function (e) {
    this.option("currentDate", e);
  },
  getOption: function (e) {
    return this.option(e);
  },
  getWorkspaceOption: function (e) {
    return this.getWorkSpace().option(e);
  },
  isVirtualScrolling: function () {
    return this.isVirtualScrolling();
  },
  setCellDataCacheAlias: function (e, t) {
    this._workSpace.setCellDataCacheAlias(e, t);
  },
  isGroupedByDate: function () {
    return this.getWorkSpace().isGroupedByDate();
  },
  showAppointmentTooltip: function (e) {
    var t = this.getTargetedAppointment(e.data, e.target);
    this.showAppointmentTooltip(e.data, e.target, t);
  },
  hideAppointmentTooltip: function () {
    this.hideAppointmentTooltip();
  },
  showEditAppointmentPopup: function (e) {
    var t = this.getTargetedAppointment(e.data, e.target);
    this.showAppointmentPopup(e.data, false, t);
  },
  updateAppointmentAfterResize: function (e) {
    var t = u.utils.dataAccessors.getAppointmentInfo(e.$appointment).sourceAppointment.exceptionDate;
    this._checkRecurringAppointment(e.target, e.data, t, function () {
      this._updateAppointment(e.target, e.data, function () {
        this._appointments.moveAppointmentBack();
      });
    }.bind(this));
  },
  getUpdatedData: function (e) {
    return this._getUpdatedData(e);
  },
  updateAppointmentAfterDrag: function (e) {
    var t = this;
    var n = e.event;
    var i = e.element;
    var o = e.rawAppointment;
    var a = e.newCellIndex;
    var r = e.oldCellIndex;
    var l = u.utils.dataAccessors.getAppointmentInfo(i);
    var c = (0, d.createAppointmentAdapter)(o, this._dataAccessors, this.timeZoneCalculator);
    var h = (0, d.createAppointmentAdapter)((0, s.extend)({}, o, this._getUpdatedData(o)), this._dataAccessors, this.timeZoneCalculator);
    var f = h.source();
    var p = h.allDay;
    var g = c.allDay;
    var m = this._workSpace.supportAllDayRow() && (g && !p || !g && p);
    var _ = n.fromComponent !== n.toComponent;
    if (a !== -1) {
      if (a !== r || _ || m) {
        this._checkRecurringAppointment(o, f, l.sourceAppointment.exceptionDate, function () {
          t._updateAppointment(o, f, function () {
            this._appointments.moveAppointmentBack(n);
          }, n);
        }, undefined, undefined, n);
      } else {
        this._appointments.moveAppointmentBack(n);
      }
    } else if (!_) {
      this._appointments.moveAppointmentBack(n);
    }
  },
  onDeleteButtonPress: function (e) {
    var t = this.getTargetedAppointment(e.data, (0, i.default)(e.target));
    this.checkAndDeleteAppointment(e.data, t);
    this.hideAppointmentTooltip();
  },
  getTextAndFormatDate: function (e, t, n) {
    var i = (0, d.createAppointmentAdapter)(e, this._dataAccessors, this.timeZoneCalculator);
    var o = (0, d.createAppointmentAdapter)(t || e, this._dataAccessors, this.timeZoneCalculator);
    var a = this.timeZoneCalculator.createDate(o.startDate, {
      path: "toGrid"
    });
    var r = this.timeZoneCalculator.createDate(o.endDate, {
      path: "toGrid"
    });
    var s = n || (0, c.getFormatType)(a, r, o.allDay, this.currentViewType !== "month");
    return {
      text: o.text || i.text,
      formatDate: (0, c.formatDates)(a, r, s)
    };
  },
  _createAppointmentTitle: function (e) {
    if ((0, o.isPlainObject)(e)) {
      return e.text;
    } else {
      return String(e);
    }
  },
  getResizableAppointmentArea: function (e) {
    var t = e.allDay;
    var n = this._getCurrentViewOption("groups");
    if (n && n.length) {
      if (t || this.getLayoutManager().getRenderingStrategyInstance()._needHorizontalGroupBounds()) {
        var i = this._workSpace.getGroupBounds(e.coordinates);
        return {
          left: i.left,
          right: i.right,
          top: 0,
          bottom: 0
        };
      }
      if (this.getLayoutManager().getRenderingStrategyInstance()._needVerticalGroupBounds(t) && this._workSpace._isVerticalGroupedWorkSpace()) {
        var o = this._workSpace.getGroupBounds(e.coordinates);
        return {
          left: 0,
          right: 0,
          top: o.top,
          bottom: o.bottom
        };
      }
    }
  },
  needRecalculateResizableArea: function () {
    return this.getWorkSpace().needRecalculateResizableArea();
  },
  getAppointmentGeometry: function (e) {
    return this.getLayoutManager().getRenderingStrategyInstance().getAppointmentGeometry(e);
  },
  isAllDay: function (e) {
    return this.getLayoutManager().getRenderingStrategyInstance().isAllDay(e);
  },
  getDeltaTime: function (e, t, n) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDeltaTime(e, t, n);
  },
  getDropDownAppointmentWidth: function (e) {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentWidth(this._getViewCountConfig().intervalCount, e);
  },
  getDropDownAppointmentHeight: function () {
    return this.getLayoutManager().getRenderingStrategyInstance().getDropDownAppointmentHeight();
  },
  getCellWidth: function () {
    return this.getWorkSpace().getCellWidth();
  },
  getCellHeight: function () {
    return this.getWorkSpace().getCellHeight();
  },
  getMaxAppointmentCountPerCellByType: function (e) {
    return this.getRenderingStrategyInstance()._getMaxAppointmentCountPerCellByType(e);
  },
  needCorrectAppointmentDates: function () {
    return this.getRenderingStrategyInstance().needCorrectAppointmentDates();
  },
  getRenderingStrategyDirection: function () {
    return this.getRenderingStrategyInstance().getDirection();
  },
  updateAppointmentEndDate: function (e) {
    var t = e.endDate;
    var n = this._getCurrentViewOption("endDayHour");
    var i = this._getCurrentViewOption("startDayHour");
    var o = t;
    if (t.getHours() >= n) {
      o.setHours(n, 0, 0, 0);
    } else if (!e.isSameDate && i > 0 && t.getHours() * 60 + t.getMinutes() < i * 60) {
      (o = new Date(o.getTime() - f("day"))).setHours(n, 0, 0, 0);
    }
    return o;
  },
  renderCompactAppointments: function (e) {
    this._compactAppointmentsHelper.render(e);
  },
  clearCompactAppointments: function () {
    this._compactAppointmentsHelper.clear();
  },
  supportCompactDropDownAppointments: function () {
    return this.getLayoutManager().getRenderingStrategyInstance().supportCompactDropDownAppointments();
  },
  getGroupCount: function () {
    return this._workSpace._getGroupCount();
  },
  mapAppointmentFields: function (e) {
    var t = e.itemData;
    var n = e.itemElement;
    var i = e.targetedAppointment || this.getTargetedAppointment(t, n);
    return {
      appointmentData: e.itemData,
      appointmentElement: e.itemElement,
      targetedAppointmentData: i
    };
  },
  dayHasAppointment: function (e, t, n) {
    return this.dayHasAppointment(e, t, n);
  },
  getLayoutManager: function () {
    return this._layoutManager;
  },
  getAgendaVerticalStepHeight: function () {
    return this.getWorkSpace().getAgendaVerticalStepHeight();
  },
  getAgendaDuration: function () {
    return this._getCurrentViewOption("agendaDuration");
  },
  getStartViewDate: function () {
    return this.getStartViewDate();
  },
  getEndViewDate: function () {
    return this.getEndViewDate();
  },
  forceMaxAppointmentPerCell: function () {
    return this.forceMaxAppointmentPerCell();
  },
  onAgendaReady: function (e) {
    var t = this.getAppointmentsInstance()._itemElements();
    var n = 0;
    var i = function (e, i) {
      var o = i + n - 1;
      t.eq(o).addClass(l.AGENDA_LAST_IN_DATE_APPOINTMENT_CLASS);
      n += i;
    };
    for (var o = 0; o < e.length; o++) {
      (0, r.each)(e[o], i);
    }
  },
  getTimezone: function () {
    return this._getTimezoneOffsetByOption();
  },
  getTargetedAppointmentData: function (e, t) {
    return this.getTargetedAppointment(e, t);
  },
  getEndDayHour: function () {
    return this._workSpace.option("endDayHour") || this.option("endDayHour");
  },
  getStartDayHour: function () {
    return this._workSpace.option("startDayHour") || this.option("startDayHour");
  },
  isAdaptive: function () {
    return this.option("adaptivityEnabled");
  },
  removeDroppableCellClass: function () {
    this._workSpace.removeDroppableCellClass();
  }
};
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;