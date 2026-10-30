exports.default = undefined;
var i = c(require("./68374.js"));
var o = c(require("./15360.js"));
var a = c(require("./73349.js"));
var r = require("./20576.js");
var s = c(require("./91198.js"));
var l = require("./13306.js");
var u = c(require("./91500.js"));
var d = c(require("./69434.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = {
  month: o.default.inherit({
    _getViewName: function () {
      return "month";
    },
    _getDefaultOptions: function () {
      return (0, l.extend)(this.callBase(), {
        firstDayOfWeek: 0,
        rowCount: 6,
        colCount: 7
      });
    },
    _renderImpl: function () {
      this.callBase();
      this._renderHeader();
    },
    _renderBody: function () {
      this.callBase();
      this._$table.find(`.dx-calendar-other-view`).addClass("dx-calendar-other-month");
    },
    _renderFocusTarget: r.noop,
    getCellAriaLabel: function (e) {
      return u.default.format(e, "longdate");
    },
    _renderHeader: function () {
      var e = (0, i.default)("<tr>");
      var t = (0, i.default)("<thead>").append(e);
      this._$table.prepend(t);
      for (var n = 0, o = this.option("colCount"); n < o; n++) {
        this._renderHeaderCell(n, e);
      }
      if (this.option("showWeekNumbers")) {
        this._renderWeekHeaderCell(e);
      }
    },
    _renderHeaderCell: function (e, t) {
      var n = this.option().firstDayOfWeek;
      var o = this._getDayCaption(n + e);
      var a = o.full;
      var r = o.abbreviated;
      var s = (0, i.default)("<th>").attr({
        scope: "col",
        abbr: a
      }).text(r);
      t.append(s);
    },
    _renderWeekHeaderCell: function (e) {
      var t = (0, i.default)("<th>").attr({
        scope: "col",
        abbr: "WeekNumber",
        class: "dx-week-number-header"
      });
      e.prepend(t);
    },
    _renderWeekNumberCell: function (e) {
      var t = this.option();
      var n = t.showWeekNumbers;
      var o = t.cellTemplate;
      if (n) {
        var r = this._getWeekNumber(e.prevCellDate);
        var s = a.default.createElement("td");
        var l = (0, i.default)(s);
        s.className = "dx-calendar-week-number-cell";
        if (o) {
          o.render(this._prepareCellTemplateData(r, -1, l));
        } else {
          s.innerHTML = r;
        }
        e.row.prepend(s);
        this.setAria({
          role: "gridcell",
          label: `Week ${r}`
        }, l);
      }
    },
    _getWeekNumber: function (e) {
      var t = this.option();
      var n = t.weekNumberRule;
      var i = t.firstDayOfWeek;
      if (n === "auto") {
        return s.default.getWeekNumber(e, i, i === 1 ? "firstFourDays" : "firstDay");
      } else {
        return s.default.getWeekNumber(e, i, n);
      }
    },
    getNavigatorCaption: function () {
      return u.default.format(this.option("date"), "monthandyear");
    },
    _isTodayCell: function (e) {
      var t = this.option("_todayDate")();
      return s.default.sameDate(e, t);
    },
    _isDateOutOfRange: function (e) {
      var t = this.option("min");
      var n = this.option("max");
      return !s.default.dateInRange(e, t, n, "date");
    },
    _isOtherView: function (e) {
      return e.getMonth() !== this.option("date").getMonth();
    },
    _isStartDayOfMonth: function (e) {
      return s.default.sameDate(e, s.default.getFirstMonthDate(this.option("date")));
    },
    _isEndDayOfMonth: function (e) {
      return s.default.sameDate(e, s.default.getLastMonthDate(this.option("date")));
    },
    _getCellText: function (e) {
      return u.default.format(e, "d");
    },
    _getDayCaption: function (e) {
      var t = e % this.option("colCount");
      return {
        full: u.default.getDayNames()[t],
        abbreviated: u.default.getDayNames("abbreviated")[t]
      };
    },
    _getFirstCellData: function () {
      var e = this.option().firstDayOfWeek;
      var t = s.default.getFirstMonthDate(this.option("date"));
      var n = e - t.getDay();
      var i = this.option("colCount");
      if (n >= 0) {
        n -= i;
      }
      t.setDate(t.getDate() + n);
      return t;
    },
    _getNextCellData: function (e) {
      (e = new Date(e)).setDate(e.getDate() + 1);
      return e;
    },
    _getCellByDate: function (e) {
      return this._$table.find(`td[data-value='${d.default.serializeDate(e, s.default.getShortDateFormat())}']`);
    },
    isBoundary: function (e) {
      return s.default.sameMonthAndYear(e, this.option("min")) || s.default.sameMonthAndYear(e, this.option("max"));
    },
    _getDefaultDisabledDatesHandler: function (e) {
      return function (t) {
        if (e.some(function (e) {
          return s.default.sameDate(e, t.date);
        })) {
          return true;
        }
      };
    }
  }),
  year: o.default.inherit({
    _getViewName: function () {
      return "year";
    },
    _isTodayCell: function (e) {
      var t = this.option("_todayDate")();
      return s.default.sameMonthAndYear(e, t);
    },
    _isDateOutOfRange: function (e) {
      return !s.default.dateInRange(e, s.default.getFirstMonthDate(this.option("min")), s.default.getLastMonthDate(this.option("max")));
    },
    _isOtherView: function () {
      return false;
    },
    _isStartDayOfMonth: function () {
      return false;
    },
    _isEndDayOfMonth: function () {
      return false;
    },
    _getCellText: function (e) {
      return u.default.getMonthNames("abbreviated")[e.getMonth()];
    },
    _getFirstCellData: function () {
      var e = this.option("date");
      var t = new Date(e);
      t.setDate(1);
      t.setMonth(0);
      return t;
    },
    _getNextCellData: function (e) {
      (e = new Date(e)).setMonth(e.getMonth() + 1);
      return e;
    },
    _getCellByDate: function (e) {
      var t = new Date(e);
      t.setDate(1);
      return this._$table.find(`td[data-value='${d.default.serializeDate(t, s.default.getShortDateFormat())}']`);
    },
    getCellAriaLabel: function (e) {
      return u.default.format(e, "monthandyear");
    },
    getNavigatorCaption: function () {
      return u.default.format(this.option("date"), "yyyy");
    },
    isBoundary: function (e) {
      return s.default.sameYear(e, this.option("min")) || s.default.sameYear(e, this.option("max"));
    },
    _renderWeekNumberCell: r.noop
  }),
  decade: o.default.inherit({
    _getViewName: function () {
      return "decade";
    },
    _isTodayCell: function (e) {
      var t = this.option("_todayDate")();
      return s.default.sameYear(e, t);
    },
    _isDateOutOfRange: function (e) {
      var t = this.option("min");
      var n = this.option("max");
      return !s.default.dateInRange(e.getFullYear(), t && t.getFullYear(), n && n.getFullYear());
    },
    _isOtherView: function (e) {
      var t = new Date(e);
      t.setMonth(1);
      return !s.default.sameDecade(t, this.option("date"));
    },
    _isStartDayOfMonth: function () {
      return false;
    },
    _isEndDayOfMonth: function () {
      return false;
    },
    _getCellText: function (e) {
      return u.default.format(e, "yyyy");
    },
    _getFirstCellData: function () {
      var e = s.default.getFirstYearInDecade(this.option("date")) - 1;
      return s.default.createDateWithFullYear(e, 0, 1);
    },
    _getNextCellData: function (e) {
      (e = new Date(e)).setFullYear(e.getFullYear() + 1);
      return e;
    },
    getNavigatorCaption: function () {
      var e = this.option("date");
      var t = s.default.getFirstYearInDecade(e);
      var n = new Date(e);
      var i = new Date(e);
      n.setFullYear(t);
      i.setFullYear(t + 9);
      return u.default.format(n, "yyyy") + "-" + u.default.format(i, "yyyy");
    },
    _isValueOnCurrentView: function (e, t) {
      return s.default.sameDecade(e, t);
    },
    _getCellByDate: function (e) {
      var t = new Date(e);
      t.setDate(1);
      t.setMonth(0);
      return this._$table.find(`td[data-value='${d.default.serializeDate(t, s.default.getShortDateFormat())}']`);
    },
    isBoundary: function (e) {
      return s.default.sameDecade(e, this.option("min")) || s.default.sameDecade(e, this.option("max"));
    },
    _renderWeekNumberCell: r.noop
  }),
  century: o.default.inherit({
    _getViewName: function () {
      return "century";
    },
    _isTodayCell: function (e) {
      var t = this.option("_todayDate")();
      return s.default.sameDecade(e, t);
    },
    _isDateOutOfRange: function (e) {
      var t = s.default.getFirstYearInDecade(e);
      var n = s.default.getFirstYearInDecade(this.option("min"));
      var i = s.default.getFirstYearInDecade(this.option("max"));
      return !s.default.dateInRange(t, n, i);
    },
    _isOtherView: function (e) {
      var t = new Date(e);
      t.setMonth(1);
      return !s.default.sameCentury(t, this.option("date"));
    },
    _isStartDayOfMonth: function () {
      return false;
    },
    _isEndDayOfMonth: function () {
      return false;
    },
    _getCellText: function (e) {
      var t = u.default.format(e, "yyyy");
      var n = new Date(e);
      n.setFullYear(n.getFullYear() + 9);
      return t + " - " + u.default.format(n, "yyyy");
    },
    _getFirstCellData: function () {
      var e = s.default.getFirstDecadeInCentury(this.option("date")) - 10;
      return s.default.createDateWithFullYear(e, 0, 1);
    },
    _getNextCellData: function (e) {
      (e = new Date(e)).setFullYear(e.getFullYear() + 10);
      return e;
    },
    _getCellByDate: function (e) {
      var t = new Date(e);
      t.setDate(1);
      t.setMonth(0);
      t.setFullYear(s.default.getFirstYearInDecade(t));
      return this._$table.find(`td[data-value='${d.default.serializeDate(t, s.default.getShortDateFormat())}']`);
    },
    getNavigatorCaption: function () {
      var e = this.option("date");
      var t = s.default.getFirstDecadeInCentury(e);
      var n = new Date(e);
      var i = new Date(e);
      n.setFullYear(t);
      i.setFullYear(t + 99);
      return u.default.format(n, "yyyy") + "-" + u.default.format(i, "yyyy");
    },
    isBoundary: function (e) {
      return s.default.sameCentury(e, this.option("min")) || s.default.sameCentury(e, this.option("max"));
    },
    _renderWeekNumberCell: r.noop
  })
};
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;