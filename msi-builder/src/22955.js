exports.default = undefined;
var i = require("./58664.js");
var o = p(require("./68374.js"));
var a = p(require("./44845.js"));
var r = p(require("./99393.js"));
var s = p(require("./91198.js"));
var l = require("./13306.js");
var u = require("./37518.js");
var d = require("./58201.js");
var c = require("./62060.js");
var h = require("./45985.js");
var f = p(require("./32511.js"));
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
  return function (e) {
    if (Array.isArray(e)) {
      return m(e);
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
      return m(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return m(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function m(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function _(e, t) {
  return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var v = s.default.dateToMilliseconds;
var y = function (e) {
  var t;
  var n;
  function a() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = a).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  _(t, n);
  var r = a.prototype;
  r._getToday = function () {
    return (0, h.getToday)(this.option("indicatorTime"), this.timeZoneCalculator);
  };
  r.isIndicationOnView = function () {
    if (this.option("showCurrentTimeIndicator")) {
      var e = this._getToday();
      var t = s.default.trimTime(this.getEndViewDate());
      return s.default.dateInRange(e, this.getStartViewDate(), new Date(t.getTime() + v("day")));
    }
    return false;
  };
  r.isIndicationAvailable = function () {
    return !!(0, d.hasWindow)() && this._getToday() >= s.default.trimTime(new Date(this.getStartViewDate()));
  };
  r.isIndicatorVisible = function () {
    var e = this._getToday();
    var t = new Date(this.getEndViewDate().getTime() + v("minute") - 1);
    var n = new Date(this.getStartViewDate());
    n.setFullYear(e.getFullYear(), e.getMonth(), e.getDate());
    t.setFullYear(e.getFullYear(), e.getMonth(), e.getDate());
    return s.default.dateInRange(e, n, t);
  };
  r._renderDateTimeIndication = function () {
    if (this.isIndicationAvailable() && (this.option("shadeUntilCurrentTime") && this._shader.render(), this.isIndicationOnView() && this.isIndicatorVisible())) {
      var e = this._getGroupCount() || 1;
      var t = this._dateTableScrollable.$content();
      var n = this.getIndicationHeight();
      var i = this._getRtlOffset(this.getCellWidth());
      this._renderIndicator(n, i, t, e);
      this._setCurrentTimeCells();
    }
  };
  r._renderIndicator = function (e, t, n, o) {
    var a = this.isGroupedByDate();
    for (var r = a ? 1 : o, s = 0; s < r; s++) {
      var l = this._createIndicator(n);
      (0, i.setWidth)(l, a ? this.getCellWidth() * o : this.getCellWidth());
      this._groupedStrategy.shiftIndicator(l, e, t, s);
    }
  };
  r._createIndicator = function (e) {
    var t = (0, o.default)("<div>").addClass("dx-scheduler-date-time-indicator");
    e.append(t);
    return t;
  };
  r._getRtlOffset = function (e) {
    if (this.option("rtlEnabled")) {
      return (0, u.getBoundingRect)(this._dateTableScrollable.$content().get(0)).width - this.getTimePanelWidth() - e;
    } else {
      return 0;
    }
  };
  r._setIndicationUpdateInterval = function () {
    if (this.option("showCurrentTimeIndicator") && this.option("indicatorUpdateInterval") !== 0) {
      this._clearIndicatorUpdateInterval();
      this._indicatorInterval = setInterval(function () {
        this._refreshDateTimeIndication();
      }.bind(this), this.option("indicatorUpdateInterval"));
    }
  };
  r._clearIndicatorUpdateInterval = function () {
    if (this._indicatorInterval) {
      clearInterval(this._indicatorInterval);
      delete this._indicatorInterval;
    }
  };
  r._isVerticalShader = function () {
    return true;
  };
  r.getIndicationWidth = function (e) {
    var t = this.getCellWidth() * this._getCellCount();
    var n = this._getIndicatorDuration();
    if (n > this._getCellCount()) {
      n = this._getCellCount();
    }
    var i = n * this.getRoundedCellWidth(e, e * this._getCellCount(), n);
    if (t < i) {
      return t;
    } else {
      return i;
    }
  };
  r.getIndicatorOffset = function (e) {
    var t = this._getIndicatorDuration() - 1;
    return t * this.getRoundedCellWidth(e, e * this._getCellCount(), t);
  };
  r._getIndicatorDuration = function () {
    var e = this._getToday();
    var t = new Date(this.getStartViewDate());
    var n = e.getTime() - t.getTime();
    if (this.option("type") === "workWeek") {
      n -= this._getWeekendsCount(Math.round(n / v("day"))) * v("day");
    }
    return Math.ceil((n + 1) / v("day"));
  };
  r.getIndicationHeight = function () {
    var e = f.default.getDateWithoutTimezoneChange(this._getToday());
    var t = this.getCellHeight();
    var n = new Date(this.getStartViewDate());
    if (this.isIndicationOnView()) {
      n.setFullYear(e.getFullYear(), e.getMonth(), e.getDate());
    }
    return (e.getTime() - n.getTime()) / this.getCellDuration() * t;
  };
  r._dispose = function () {
    this._clearIndicatorUpdateInterval();
    e.prototype._dispose.apply(this, arguments);
  };
  r._refreshDateTimeIndication = function () {
    var e;
    this._cleanDateTimeIndicator();
    this._cleanCurrentTimeCells();
    if ((e = this._shader) !== null && e !== undefined) {
      e.clean();
    }
    this._renderDateTimeIndication();
  };
  r._setCurrentTimeCells = function () {
    var e = this._getTimePanelCells();
    this._getCurrentTimePanelCellIndices().forEach(function (t) {
      e.eq(t).addClass("dx-scheduler-time-panel-current-time-cell");
    });
  };
  r._isCurrentTimeHeaderCell = function (e) {
    if (this.isIndicationOnView()) {
      var t = this.viewDataProvider.completeDateHeaderMap;
      var n = t[t.length - 1][e].startDate;
      return s.default.sameDate(n, this._getToday());
    }
    return false;
  };
  r._getHeaderPanelCellClass = function (t) {
    var n = e.prototype._getHeaderPanelCellClass.call(this, t);
    if (this._isCurrentTimeHeaderCell(t)) {
      return n + " " + c.HEADER_CURRENT_TIME_CELL_CLASS;
    } else {
      return n;
    }
  };
  r._cleanView = function () {
    e.prototype._cleanView.call(this);
    this._cleanDateTimeIndicator();
  };
  r._dimensionChanged = function () {
    e.prototype._dimensionChanged.call(this);
    this._refreshDateTimeIndication();
  };
  r._cleanDateTimeIndicator = function () {
    this.$element().find(".dx-scheduler-date-time-indicator").remove();
  };
  r._cleanCurrentTimeCells = function () {
    this.$element().find(`.dx-scheduler-time-panel-current-time-cell`).removeClass("dx-scheduler-time-panel-current-time-cell");
  };
  r._cleanWorkSpace = function () {
    e.prototype._cleanWorkSpace.call(this);
    this._renderDateTimeIndication();
    this._setIndicationUpdateInterval();
  };
  r._optionChanged = function (t) {
    switch (t.name) {
      case "showCurrentTimeIndicator":
      case "indicatorTime":
        this._cleanWorkSpace();
        break;
      case "indicatorUpdateInterval":
        this._setIndicationUpdateInterval();
        break;
      case "showAllDayPanel":
      case "allDayExpanded":
      case "crossScrollingEnabled":
        e.prototype._optionChanged.call(this, t);
        this._refreshDateTimeIndication();
        break;
      case "shadeUntilCurrentTime":
        this._refreshDateTimeIndication();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  r._getDefaultOptions = function () {
    return (0, l.extend)(e.prototype._getDefaultOptions.call(this), {
      showCurrentTimeIndicator: true,
      indicatorTime: new Date(),
      indicatorUpdateInterval: v("minute") * 5,
      shadeUntilCurrentTime: true
    });
  };
  r._getCurrentTimePanelCellIndices = function () {
    var e;
    var t = this._getTimePanelRowCount();
    var n = this._getToday();
    var i = this.getCellIndexByDate(n);
    var o = this._getCellCoordinatesByIndex(i).rowIndex;
    if (o === undefined) {
      return [];
    }
    e = o === 0 ? [o] : o % 2 == 0 ? [o - 1, o] : [o, o + 1];
    var a = this._isVerticalGroupedWorkSpace() ? this._getGroupCount() : 1;
    return g(new Array(a)).reduce(function (n, i, o) {
      return [].concat(g(n), g(e.map(function (e) {
        return t * o + e;
      })));
    }, []);
  };
  return a;
}(a.default);
(0, r.default)("dxSchedulerWorkSpace", y);
var b = y;
exports.default = b;
module.exports = exports.default;
module.exports.default = exports.default;