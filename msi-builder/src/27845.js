exports.default = undefined;
var i = f(require("./72097.js"));
var o = require("./13306.js");
var a = require("./35922.js");
var r = f(require("./91198.js"));
var s = f(require("./32511.js"));
var l = require("./86474.js");
var u = require("./5480.js");
var d = f(require("./37009.js"));
var c = require("./96801.js");
var h = require("./60810.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p() {
  return (p = Object.assign ? Object.assign.bind() : function (e) {
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
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = r.default.dateToMilliseconds;
var _ = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var f = i.prototype;
  f.getDeltaTime = function (e, t, n) {
    var i = 0;
    if (this.isAllDay(n)) {
      i = this._getDeltaWidth(e, t) * m("day");
    } else {
      var o = e.height - t.height;
      i = m("minute") * Math.round(o / this.cellHeight * this.cellDurationInMinutes);
    }
    return i;
  };
  f._correctCollectorCoordinatesInAdaptive = function (t, n) {
    if (n) {
      e.prototype._correctCollectorCoordinatesInAdaptive.call(this, t, n);
    } else if (this._getMaxAppointmentCountPerCellByType() === 0) {
      var i = this.cellHeight;
      var o = this.cellWidth;
      t.top += (i - this.getDropDownButtonAdaptiveSize()) / 2;
      t.left += (o - this.getDropDownButtonAdaptiveSize()) / 2;
    }
  };
  f.getAppointmentGeometry = function (t) {
    var n = null;
    n = t.allDay ? this._getAllDayAppointmentGeometry(t) : this.isAdaptive && t.isCompact ? this._getAdaptiveGeometry(t) : this._getVerticalAppointmentGeometry(t);
    return e.prototype.getAppointmentGeometry.call(this, n);
  };
  f._getAdaptiveGeometry = function (e) {
    var t = this._calculateGeometryConfig(e);
    return this._customizeCoordinates(e, t.height, t.appointmentCountPerCell, t.offset);
  };
  f._getItemPosition = function (t) {
    var n = this.isAllDay(t);
    if (n) {
      return e.prototype._getItemPosition.call(this, t);
    }
    var i = (0, u.createAppointmentAdapter)(t, this.dataAccessors, this.timeZoneCalculator);
    var a = !!i.recurrenceRule;
    var l = i.calculateStartDate("toGrid");
    var d = i.calculateEndDate("toGrid");
    var c = d - l;
    var h = this.options.startViewDate < l;
    var f = !s.default.isSameAppointmentDates(l, d);
    for (var p = this.generateAppointmentSettings(t), g = [], m = 0; m < p.length; m++) {
      var _ = p[m];
      var v = this.calculateAppointmentHeight(t, _);
      var y = this.calculateAppointmentWidth(t, _);
      var b = v;
      var x = null;
      var w = [];
      var C = _.vMax;
      if (this._isMultiViewAppointment(_, v) || f && !a) {
        if (r.default.trimTime(l) <= r.default.trimTime(_.info.appointment.startDate) || a) {
          b = this._reduceMultiDayAppointment(v, {
            top: _.top,
            bottom: C
          });
          w = this._getAppointmentParts({
            sourceAppointmentHeight: v,
            reducedHeight: b,
            width: y
          }, _);
        }
        var S = _.info.appointment;
        var k = S.startDate;
        x = S.normalizedEndDate - k < c ? h ? "head" : "body" : h ? "head" : "tail";
      }
      (0, o.extend)(_, {
        height: b,
        width: y,
        allDay: n,
        appointmentReduced: x
      });
      g = this._getAppointmentPartsPosition(w, _, g);
    }
    return g;
  };
  f._isMultiViewAppointment = function (e, t) {
    var n = e.vMax;
    var i = e.top;
    return (0, h.roundFloatPart)(t, 2) > (0, h.roundFloatPart)(n - i, 2);
  };
  f._reduceMultiDayAppointment = function (e, t) {
    return Math.min(e, t.bottom - Math.floor(t.top));
  };
  f._getGroupHeight = function () {
    return this.cellHeight * this.rowCount;
  };
  f._getGroupTopOffset = function (e) {
    var t = e.groupIndex;
    var n = Math.max(0, this.positionHelper.getGroupTop({
      groupIndex: t,
      showAllDayPanel: this.showAllDayPanel,
      isGroupedAllDayPanel: this.isGroupedAllDayPanel
    }));
    var i = this.positionHelper.getOffsetByAllDayPanel({
      groupIndex: t,
      supportAllDayRow: this.allDaySupported(),
      showAllDayPanel: this.showAllDayPanel
    });
    return e.top - n - i;
  };
  f._getTailHeight = function (e, t) {
    if (this.isVirtualScrolling) {
      return this._getGroupTopOffset(t) + e.sourceAppointmentHeight - this._getGroupHeight();
    } else {
      return e.sourceAppointmentHeight - e.reducedHeight;
    }
  };
  f._getAppointmentParts = function (e, t) {
    var n = e.width;
    var i = [];
    var o = Math.max(0, this.positionHelper.getGroupTop({
      groupIndex: t.groupIndex,
      showAllDayPanel: this.showAllDayPanel,
      isGroupedAllDayPanel: this.isGroupedAllDayPanel
    }));
    var a = this.isGroupedByDate ? this.groupCount : 1;
    var r = this.cellWidth * a;
    o += this.positionHelper.getOffsetByAllDayPanel({
      groupIndex: t.groupIndex,
      supportAllDayRow: this.allDaySupported(),
      showAllDayPanel: this.showAllDayPanel
    });
    var s = this.getAppointmentMinSize();
    var l = t.vMax;
    for (var u = t.hMax, d = this.options.endViewDate > t.info.appointment.endDate, c = Math.round(t.left + r), h = this._getTailHeight(e, t); h > 0 && c < u;) {
      h = Math.max(s, h);
      var f = t.columnIndex + a;
      var g = Math.min(h, l);
      i.push(p({}, t, {
        top: o,
        left: c,
        height: g,
        width: n,
        appointmentReduced: "body",
        rowIndex: 0,
        columnIndex: f
      }));
      c += r;
      h -= l;
    }
    if (d && i.length > 0) {
      i[i.length - 1].appointmentReduced = "tail";
    }
    return i;
  };
  f._getMinuteHeight = function () {
    return this.cellHeight / this.cellDurationInMinutes;
  };
  f._getCompactLeftCoordinate = function (e, t) {
    return e + (1 + (this.cellWidth || this.getAppointmentMinSize())) * t;
  };
  f._getVerticalAppointmentGeometry = function (e) {
    var t = this._calculateVerticalGeometryConfig(e);
    return this._customizeVerticalCoordinates(e, t.width, t.appointmentCountPerCell, t.offset);
  };
  f._customizeVerticalCoordinates = function (e, t, n, i, o) {
    var a = Math.max(t / n, t / e.count);
    var r = e.height;
    var s = e.left + e.index * a;
    var l = e.top;
    if (e.isCompact) {
      this._markAppointmentAsVirtual(e, o);
    }
    return {
      height: r,
      width: a,
      top: l,
      left: s,
      empty: this._isAppointmentEmpty(r, t)
    };
  };
  f._calculateVerticalGeometryConfig = function (e) {
    var t = this.maxAppointmentsPerCell;
    var n = this._getOffsets();
    var i = this._getAppointmentDefaultOffset();
    var o = this._getAppointmentCount(t, e);
    var r = this._getDefaultRatio(e, o);
    var s = this._getMaxWidth();
    if (!o) {
      o = e.count;
      r = (s - n.unlimited) / s;
    }
    var l = (1 - r) * s;
    if (t === "auto" || (0, a.isNumeric)(t)) {
      r = 1;
      s -= i;
      l = 0;
    }
    return {
      width: r * s,
      appointmentCountPerCell: o,
      offset: l
    };
  };
  f._getMaxWidth = function () {
    return this.cellWidth;
  };
  f.isAllDay = function (e) {
    return (0, c.getAppointmentTakesAllDay)((0, u.createAppointmentAdapter)(e, this.dataAccessors, this.timeZoneCalculator), this.startDayHour, this.endDayHour, this.allDayPanelMode);
  };
  f._getAppointmentMaxWidth = function () {
    return this.cellWidth - this._getAppointmentDefaultOffset();
  };
  f.calculateAppointmentWidth = function (e, t) {
    if (!this.isAllDay(e)) {
      return 0;
    }
    var n = r.default.trimTime(t.info.appointment.startDate);
    var i = t.info.appointment.normalizedEndDate;
    var o = this.cellWidth || this.getAppointmentMinSize();
    var a = (i.getTime() - n.getTime()) / m("hour");
    var s = (0, d.default)(t.info.appointment.startDate, t.info.appointment.endDate, this.viewDataProvider);
    var l = Math.ceil((a - s) / 24) * o;
    return l = this.cropAppointmentWidth(l, o);
  };
  f.calculateAppointmentHeight = function (e, t) {
    if (this.isAllDay(e)) {
      return 0;
    }
    var n = t.info.appointment.startDate;
    var i = t.info.appointment.normalizedEndDate;
    var o = l.ExpressionUtils.getField(this.dataAccessors, "allDay", e);
    var a = this.getAppointmentDurationInMs(n, i, o);
    return this._adjustDurationByDaylightDiff(a, n, i) / m("minute") * this._getMinuteHeight();
  };
  f.getDirection = function () {
    return "vertical";
  };
  f._sortCondition = function (e, t) {
    var n = e.allDay - t.allDay;
    var i = e.allDay && t.allDay;
    var o = this.groupOrientation === "vertical" && i ? this._columnCondition(e, t) : this._rowCondition(e, t);
    return n || o;
  };
  f.allDaySupported = function () {
    return true;
  };
  f._getAllDayAppointmentGeometry = function (e) {
    var t = this._calculateGeometryConfig(e);
    return this._customizeCoordinates(e, t.height, t.appointmentCountPerCell, t.offset, true);
  };
  f._calculateGeometryConfig = function (t) {
    if (!this.allowResizing || !this.allowAllDayResizing) {
      t.skipResizing = true;
    }
    var n = e.prototype._calculateGeometryConfig.call(this, t);
    var i = Math.min(n.appointmentCountPerCell, this._getDynamicAppointmentCountPerCell().allDay);
    if (t.allDay && t.count <= i) {
      n.offset = 0;
    }
    return n;
  };
  f._getAppointmentCount = function (e, t) {
    if (e === "auto" || t.count !== 1 || (0, a.isNumeric)(e)) {
      return this._getMaxAppointmentCountPerCellByType(t.allDay);
    } else {
      return t.count;
    }
  };
  f._getDefaultRatio = function (e, t) {
    if (e.count > this.appointmentCountPerCell) {
      return 0.65;
    } else {
      return 1;
    }
  };
  f._getOffsets = function () {
    return {
      unlimited: 5,
      auto: 20
    };
  };
  f._getMaxHeight = function () {
    return this.allDayHeight || this.getAppointmentMinSize();
  };
  f._needVerticalGroupBounds = function (e) {
    return !e;
  };
  f._needHorizontalGroupBounds = function () {
    return false;
  };
  f.getPositionShift = function (t, n) {
    if (!n && this.isAdaptive && this._getMaxAppointmentCountPerCellByType(n) === 0) {
      return {
        top: 0,
        left: 0,
        cellPosition: 0
      };
    } else {
      return e.prototype.getPositionShift.call(this, t, n);
    }
  };
  return i;
}(i.default);
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;