exports.default = undefined;
var i = _(require("./68374.js"));
var o = _(require("./73349.js"));
var a = _(require("./55994.js"));
var r = require("./97906.js");
var s = require("./6415.js");
var l = _(require("./14390.js"));
var u = _(require("./91198.js"));
var d = require("./13306.js");
var c = require("./20576.js");
var h = _(require("./69434.js"));
var f = _(require("./28109.js"));
var p = require("./39611.js");
var g = require("./95429.js");
var m = require("./24028.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var v = l.default.abstract;
var y = `td:not(.dx-calendar-week-number-cell)`;
var b = (0, p.addNamespace)(g.name, "dxCalendar");
var x = (0, p.addNamespace)(m.start, "dxCalendar");
var w = l.default.inherit({
  _getViewName: function () {
    return "base";
  },
  _getDefaultOptions: function () {
    return (0, d.extend)(this.callBase(), {
      date: new Date(),
      focusStateEnabled: false,
      cellTemplate: null,
      disabledDates: null,
      onCellClick: null,
      onCellHover: null,
      rowCount: 3,
      colCount: 4,
      allowValueSelection: true,
      _todayDate: function () {
        return new Date();
      }
    });
  },
  _initMarkup: function () {
    this.callBase();
    this._renderImpl();
  },
  _renderImpl: function () {
    this.$element().append(this._createTable());
    this._createDisabledDatesHandler();
    this._renderBody();
    this._renderContouredDate();
    this._renderValue();
    this._renderRange();
    this._renderEvents();
  },
  _createTable: function () {
    this._$table = (0, i.default)("<table>");
    var e = f.default.format("dxCalendar-ariaWidgetName");
    var t = f.default.format("dxCalendar-ariaHotKeysInfo");
    this.setAria({
      label: `${e}. ${t}`,
      role: "grid"
    }, this._$table);
    return this._$table;
  },
  _renderBody: function () {
    this.$body = (0, i.default)("<tbody>").appendTo(this._$table);
    var e = {
      cellDate: this._getFirstCellData(),
      prevCellDate: null
    };
    for (var t = 0, n = this.option("rowCount"); t < n; t++) {
      e.row = this._createRow();
      for (var o = 0, a = this.option("colCount"); o < a; o++) {
        this._renderCell(e, o);
      }
      this._renderWeekNumberCell(e);
    }
  },
  _createRow: function () {
    var e = o.default.createElement("tr");
    this.setAria("role", "row", (0, i.default)(e));
    this.$body.get(0).appendChild(e);
    return e;
  },
  _createCell: function (e, t) {
    var n = o.default.createElement("td");
    var a = (0, i.default)(n);
    n.className = this._getClassNameByDate(e, t);
    n.setAttribute("data-value", h.default.serializeDate(e, u.default.getShortDateFormat()));
    (0, r.data)(n, "dxDateValueKey", e);
    this.setAria({
      role: "gridcell",
      label: this.getCellAriaLabel(e)
    }, a);
    return {
      cell: n,
      $cell: a
    };
  },
  _renderCell: function (e, t) {
    var n = e.cellDate;
    var o = e.prevCellDate;
    var a = e.row;
    if (o) {
      u.default.fixTimezoneGap(o, n);
    }
    e.prevCellDate = n;
    var r = this._createCell(n, t);
    var s = r.cell;
    var l = r.$cell;
    var d = this.option("cellTemplate");
    (0, i.default)(a).append(s);
    if (d) {
      d.render(this._prepareCellTemplateData(n, t, l));
    } else {
      s.innerHTML = this._getCellText(n);
    }
    e.cellDate = this._getNextCellData(n);
  },
  _getClassNameByDate: function (e, t) {
    var n = "dx-calendar-cell";
    if (this._isTodayCell(e)) {
      n += ` dx-calendar-today`;
    }
    if (this._isDateOutOfRange(e) || this.isDateDisabled(e)) {
      n += ` dx-calendar-empty-cell`;
    }
    if (this._isOtherView(e)) {
      n += ` dx-calendar-other-view`;
    }
    if (this.option("selectionMode") === "range") {
      if (t === 0) {
        n += ` dx-calendar-cell-start-in-row`;
      }
      if (t === this.option("colCount") - 1) {
        n += ` dx-calendar-cell-end-in-row`;
      }
      if (this._isStartDayOfMonth(e)) {
        n += ` dx-calendar-cell-start`;
      }
      if (this._isEndDayOfMonth(e)) {
        n += ` dx-calendar-cell-end`;
      }
    }
    return n;
  },
  _prepareCellTemplateData: function (e, t, n) {
    var i = e instanceof Date;
    return {
      model: {
        text: i ? this._getCellText(e) : e,
        date: i ? e : undefined,
        view: this._getViewName()
      },
      container: (0, s.getPublicElement)(n),
      index: t
    };
  },
  _renderEvents: function () {
    var e = this;
    this._createCellClickAction();
    a.default.off(this._$table, b);
    a.default.on(this._$table, b, y, function (t) {
      if (!(0, i.default)(t.currentTarget).hasClass("dx-calendar-empty-cell")) {
        e._cellClickAction({
          event: t,
          value: (0, i.default)(t.currentTarget).data("dxDateValueKey")
        });
      }
    });
    a.default.off(this._$table, x);
    if (this.option("selectionMode") === "range") {
      this._createCellHoverAction();
      a.default.on(this._$table, x, y, function (t) {
        if (!(0, i.default)(t.currentTarget).hasClass("dx-calendar-empty-cell")) {
          e._cellHoverAction({
            event: t,
            value: (0, i.default)(t.currentTarget).data("dxDateValueKey")
          });
        }
      });
    }
  },
  _createCellClickAction: function () {
    this._cellClickAction = this._createActionByOption("onCellClick");
  },
  _createCellHoverAction: function () {
    this._cellHoverAction = this._createActionByOption("onCellHover");
  },
  _createDisabledDatesHandler: function () {
    var e = this.option("disabledDates");
    this._disabledDatesHandler = Array.isArray(e) ? this._getDefaultDisabledDatesHandler(e) : e || c.noop;
  },
  _getDefaultDisabledDatesHandler: function (e) {
    return c.noop;
  },
  _isTodayCell: v,
  _isDateOutOfRange: v,
  isDateDisabled: function (e) {
    var t = {
      date: e,
      view: this._getViewName()
    };
    return this._disabledDatesHandler(t);
  },
  _isOtherView: v,
  _isStartDayOfMonth: v,
  _isEndDayOfMonth: v,
  _getCellText: v,
  _getFirstCellData: v,
  _getNextCellData: v,
  _renderContouredDate: function (e) {
    if (this.option("focusStateEnabled")) {
      e = e || this.option("contouredDate");
      var t = this._getContouredCell();
      var n = this._getCellByDate(e);
      t.removeClass("dx-calendar-contoured-date");
      if (e) {
        n.addClass("dx-calendar-contoured-date");
      }
    }
  },
  _getContouredCell: function () {
    return this._$table.find(`.dx-calendar-contoured-date`);
  },
  _renderValue: function () {
    if (this.option("allowValueSelection")) {
      var e = this.option("value");
      if (!Array.isArray(e)) {
        e = [e];
      }
      this._updateSelectedClass(e);
    }
  },
  _updateSelectedClass: function (e) {
    var t;
    var n = this;
    if ((t = this._$selectedCells) !== null && t !== undefined) {
      t.forEach(function (e) {
        e.removeClass("dx-calendar-selected-date");
      });
    }
    this._$selectedCells = e.map(function (e) {
      return n._getCellByDate(e);
    });
    this._$selectedCells.forEach(function (e) {
      e.addClass("dx-calendar-selected-date");
    });
  },
  _renderRange: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a;
    var r;
    var s;
    var l = this;
    var u = this.option();
    var d = u.allowValueSelection;
    var c = u.selectionMode;
    var h = u.value;
    var f = u.range;
    if (d && c === "range") {
      if ((e = this._$rangeCells) !== null && e !== undefined) {
        e.forEach(function (e) {
          e.removeClass("dx-calendar-cell-in-range");
        });
      }
      if ((t = this._$hoveredRangeCells) !== null && t !== undefined) {
        t.forEach(function (e) {
          e.removeClass("dx-calendar-cell-range-hover");
        });
      }
      if ((n = this._$rangeStartHoverCell) !== null && n !== undefined) {
        n.removeClass("dx-calendar-cell-range-hover-start");
      }
      if ((i = this._$rangeEndHoverCell) !== null && i !== undefined) {
        i.removeClass("dx-calendar-cell-range-hover-end");
      }
      if ((o = this._$rangeStartDateCell) !== null && o !== undefined) {
        o.removeClass("dx-calendar-range-start-date");
      }
      if ((a = this._$rangeEndDateCell) !== null && a !== undefined) {
        a.removeClass("dx-calendar-range-end-date");
      }
      this._$rangeCells = f.map(function (e) {
        return l._getCellByDate(e);
      });
      this._$rangeStartDateCell = this._getCellByDate(h[0]);
      this._$rangeEndDateCell = this._getCellByDate(h[1]);
      this._$rangeCells.forEach(function (e) {
        e.addClass("dx-calendar-cell-in-range");
      });
      if ((r = this._$rangeStartDateCell) !== null && r !== undefined) {
        r.addClass("dx-calendar-range-start-date");
      }
      if ((s = this._$rangeEndDateCell) !== null && s !== undefined) {
        s.addClass("dx-calendar-range-end-date");
      }
    }
  },
  _renderHoveredRange: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var a = this;
    var r = this.option();
    var s = r.allowValueSelection;
    var l = r.selectionMode;
    var u = r.hoveredRange;
    if (s && l === "range") {
      if ((e = this._$hoveredRangeCells) !== null && e !== undefined) {
        e.forEach(function (e) {
          e.removeClass("dx-calendar-cell-range-hover");
        });
      }
      if ((t = this._$rangeStartHoverCell) !== null && t !== undefined) {
        t.removeClass("dx-calendar-cell-range-hover-start");
      }
      if ((n = this._$rangeEndHoverCell) !== null && n !== undefined) {
        n.removeClass("dx-calendar-cell-range-hover-end");
      }
      this._$hoveredRangeCells = u.map(function (e) {
        return a._getCellByDate(e);
      });
      this._$rangeStartHoverCell = this._getCellByDate(u[0]);
      this._$rangeEndHoverCell = this._getCellByDate(u[u.length - 1]);
      this._$hoveredRangeCells.forEach(function (e) {
        e.addClass("dx-calendar-cell-range-hover");
      });
      if ((i = this._$rangeStartHoverCell) !== null && i !== undefined) {
        i.addClass("dx-calendar-cell-range-hover-start");
      }
      if ((o = this._$rangeEndHoverCell) !== null && o !== undefined) {
        o.addClass("dx-calendar-cell-range-hover-end");
      }
    }
  },
  getCellAriaLabel: function (e) {
    return this._getCellText(e);
  },
  _getFirstAvailableDate: function () {
    var e = this.option("date");
    var t = this.option("min");
    e = u.default.getViewFirstCellDate(this._getViewName(), e);
    return new Date(t && e < t ? t : e);
  },
  _getCellByDate: v,
  isBoundary: v,
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    switch (t) {
      case "value":
        this._renderValue();
        break;
      case "range":
        this._renderRange();
        break;
      case "hoveredRange":
        this._renderHoveredRange();
        break;
      case "contouredDate":
        this._renderContouredDate(n);
        break;
      case "onCellClick":
        this._createCellClickAction();
        break;
      case "onCellHover":
        this._createCellHoverAction();
        break;
      case "min":
      case "max":
      case "disabledDates":
      case "cellTemplate":
      case "selectionMode":
        this._invalidate();
        break;
      case "_todayDate":
        this._renderBody();
        break;
      default:
        this.callBase(e);
    }
  }
});
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;