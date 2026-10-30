exports.getAppointmentDateRange = undefined;
var i = require("./74920.js");
function o() {
  return (o = Object.assign ? Object.assign.bind() : function (e) {
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
function a(e) {
  var t = e.cellHeight;
  var n = e.cellWidth;
  var i = e.viewDataProvider;
  var o = e.relativeAppointmentRect;
  var a = e.appointmentSettings;
  var r = e.rtlEnabled;
  var s = Math.floor(o.top / t);
  var l = Math.round(o.left / n);
  return i.getCellData(s, l, a.allDay, r);
}
exports.getAppointmentDateRange = function (e) {
  var t;
  var n;
  var r;
  var s;
  var l;
  var u;
  var d = e.appointmentSettings;
  t = e.appointmentRect;
  n = e.parentAppointmentRect;
  r = t.left - n.left;
  s = t.top - n.top;
  l = r < 0 ? t.width + r : t.width;
  u = s < 0 ? t.height + s : t.height;
  var c = {
    left: Math.max(0, r),
    top: Math.max(0, s),
    width: l,
    height: u
  };
  var h = o({}, e, function (e) {
    var t = e.appointmentSettings;
    var n = e.isVerticalGroupedWorkSpace;
    var i = e.DOMMetaData;
    var o = t.allDay && !n ? [i.allDayPanelCellsMeta] : i.dateTableCellsMeta;
    var a = t.positionByMap;
    var r = o[a.rowIndex][a.columnIndex];
    var s = r.height;
    return {
      cellWidth: r.width,
      cellHeight: s,
      cellCountInRow: o[a.rowIndex].length
    };
  }(e), {
    considerTime: !e.isDateAndTimeView || d.allDay,
    relativeAppointmentRect: c
  });
  if (e.rtlEnabled) {
    return function (e) {
      var t = e.viewDataProvider;
      var n = e.cellCountInRow;
      var o = e.appointmentSettings;
      var r = e.handles;
      var s = e.cellWidth;
      var l = e.relativeAppointmentRect;
      var u = a(e);
      var d = o.info;
      var c = d.allDay;
      var h = d.sourceAppointment;
      if (r.right) {
        var f = u.index;
        var p = f - Math.round(l.width / s) + 1;
        var g = Math.floor(f / n);
        var m = t.getCellData(g, p, c, true);
        return {
          startDate: (0, i.normalizeStartDate)(e, m.startDate, h.endDate),
          endDate: h.endDate
        };
      }
      var _ = e.considerTime ? u.startDate : u.endDate;
      _ = (0, i.normalizeEndDate)(e, _, h.endDate);
      return {
        startDate: h.startDate,
        endDate: _
      };
    }(h);
  } else {
    return function (e) {
      var t = e.cellWidth;
      var n = e.cellCountInRow;
      var o = e.relativeAppointmentRect;
      var r = e.viewDataProvider;
      var s = e.appointmentSettings;
      var l = e.handles;
      var u = a(e);
      var d = Math.round(o.width / t);
      var c = u.index + (d - 1);
      var h = s.info;
      var f = h.allDay;
      var p = h.sourceAppointment;
      if (l.left) {
        return {
          startDate: (0, i.normalizeStartDate)(e, u.startDate, p.startDate),
          endDate: p.endDate
        };
      }
      var g = Math.floor(c / n);
      var m = c % n;
      var _ = r.getCellData(g, m, f);
      var v = e.considerTime ? _.startDate : _.endDate;
      v = (0, i.normalizeEndDate)(e, v, p.endDate);
      return {
        startDate: p.startDate,
        endDate: v
      };
    }(h);
  }
};