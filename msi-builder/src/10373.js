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
var a = b(require("./68374.js"));
var r = require("./20576.js");
var s = require("./13306.js");
var l = require("./37518.js");
var u = b(require("./99393.js"));
var d = b(require("./22955.js"));
var c = b(require("./91198.js"));
var h = b(require("./37428.js"));
var f = b(require("./93837.js"));
var p = require("./62060.js");
var g = require("./92956.js");
var m = b(require("./32511.js"));
var _ = b(require("./8262.js"));
var v = require("./45985.js");
var y = require("./58201.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function x(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return w(e);
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
      return w(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return w(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function w(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function C() {
  return (C = Object.assign ? Object.assign.bind() : function (e) {
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
function S(e, t) {
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
function k(e, t) {
  return (k = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var D = h.default.tableCreator;
var I = c.default.dateToMilliseconds;
var T = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  k(t, n);
  var u;
  var d;
  var h;
  var b = i.prototype;
  b.getGroupTableWidth = function () {
    if (this._$sidebarTable) {
      return (0, o.getOuterWidth)(this._$sidebarTable);
    } else {
      return 0;
    }
  };
  b._getTotalRowCount = function (e) {
    if (this._isHorizontalGroupedWorkSpace()) {
      return this._getRowCount();
    } else {
      e = e || 1;
      return this._getRowCount() * e;
    }
  };
  b._getFormat = function () {
    return "shorttime";
  };
  b._getWorkSpaceHeight = function () {
    if (this.option("crossScrollingEnabled") && (0, y.hasWindow)()) {
      return (0, l.getBoundingRect)(this._$dateTable.get(0)).height;
    } else {
      return (0, l.getBoundingRect)(this.$element().get(0)).height;
    }
  };
  b._dateTableScrollableConfig = function () {
    var t = e.prototype._dateTableScrollableConfig.call(this);
    var n = {
      direction: "horizontal"
    };
    if (this.option("crossScrollingEnabled")) {
      return t;
    } else {
      return (0, s.extend)(t, n);
    }
  };
  b._needCreateCrossScrolling = function () {
    return true;
  };
  b._headerScrollableConfig = function () {
    var t = e.prototype._headerScrollableConfig.call(this);
    return (0, s.extend)(t, {
      scrollByContent: true
    });
  };
  b.supportAllDayRow = function () {
    return false;
  };
  b._getGroupHeaderContainer = function () {
    if (this._isHorizontalGroupedWorkSpace()) {
      return this._$thead;
    } else {
      return this._$sidebarTable;
    }
  };
  b._insertAllDayRowsIntoDateTable = function () {
    return false;
  };
  b._needRenderWeekHeader = function () {
    return false;
  };
  b._incrementDate = function (e) {
    e.setDate(e.getDate() + 1);
  };
  b.getIndicationCellCount = function () {
    var e = this._getTimeDiff();
    return this._calculateDurationInCells(e);
  };
  b._getTimeDiff = function () {
    var e = this._getToday();
    var t = this._getIndicationFirstViewDate();
    var n = this.getStartViewDate();
    var i = m.default.getDaylightOffsetInMs(n, e);
    if (i) {
      e = new Date(e.getTime() + i);
    }
    return e.getTime() - t.getTime();
  };
  b._calculateDurationInCells = function (e) {
    var t = this._getToday();
    var n = Math.floor(e / I("day"));
    var i = (e - n * I("day") - this.option("startDayHour") * I("hour")) / this.getCellDuration();
    if (t.getHours() > this.option("endDayHour")) {
      i = this._getCellCountInDay();
    }
    if (i < 0) {
      i = 0;
    }
    return n * this._getCellCountInDay() + i;
  };
  b.getIndicationWidth = function () {
    if (this.isGroupedByDate()) {
      var e = this.getIndicationCellCount();
      var t = Math.floor(e);
      var n = e - t;
      return this.getCellWidth() * (t * this._getGroupCount() + n);
    }
    return this.getIndicationCellCount() * this.getCellWidth();
  };
  b._isVerticalShader = function () {
    return false;
  };
  b._isCurrentTimeHeaderCell = function () {
    return false;
  };
  b._setTableSizes = function () {
    var t = this._getWorkSpaceMinHeight();
    (0, o.setHeight)(this._$sidebarTable, t);
    (0, o.setHeight)(this._$dateTable, t);
    e.prototype._setTableSizes.call(this);
    this.virtualScrollingDispatcher.updateDimensions();
  };
  b._getWorkSpaceMinHeight = function () {
    var e = this._getWorkSpaceHeight();
    var t = (0, o.getOuterHeight)(this.$element(), true) - this.getHeaderPanelHeight() - 2 - 10;
    if (e < t) {
      e = t;
    }
    return e;
  };
  b._getCellCoordinatesByIndex = function (e) {
    return {
      columnIndex: e % this._getCellCount(),
      rowIndex: 0
    };
  };
  b._getCellByCoordinates = function (e, t) {
    var n = this._groupedStrategy.prepareCellIndexes(e, t);
    return this._$dateTable.find("tr").eq(n.rowIndex).find("td").eq(n.columnIndex);
  };
  b._getWorkSpaceWidth = function () {
    return (0, o.getOuterWidth)(this._$dateTable, true);
  };
  b._getIndicationFirstViewDate = function () {
    return c.default.trimTime(new Date(this.getStartViewDate()));
  };
  b._getIntervalBetween = function (e, t) {
    var n = this.option("startDayHour");
    var i = this.option("endDayHour");
    var o = this.getStartViewDate();
    var a = o.getTime();
    var r = (24 - i + n) * I("hour");
    var s = c.default.getTimezonesDifference(o, e);
    var l = e.getTime();
    var u = l - a - s;
    var d = Math.floor(u / I("day"));
    var h = u - d * I("day");
    var f = 0;
    var p = this._getCellCountInDay() * (d - this._getWeekendsCount(d));
    var g = l - c.default.trimTime(new Date(e)).getTime();
    var m = p * this.option("hoursInterval") * I("hour");
    if (!t) {
      if (e.getHours() < n) {
        f = h - r + g;
      } else if (e.getHours() >= n && e.getHours() < i) {
        f = h;
      } else if (e.getHours() >= n && e.getHours() >= i) {
        f = h - (g - i * I("hour"));
      } else if (!d) {
        m = u;
      }
      m += f;
    }
    return m;
  };
  b._getWeekendsCount = function () {
    return 0;
  };
  b.getAllDayContainer = function () {
    return null;
  };
  b.getTimePanelWidth = function () {
    return 0;
  };
  b.getIntervalDuration = function (e) {
    return this.getCellDuration();
  };
  b.getCellMinWidth = function () {
    return 0;
  };
  b.getWorkSpaceLeftOffset = function () {
    return 0;
  };
  b.scrollToTime = function (e, t, n) {
    var i = this._getScrollCoordinates(e, t, n);
    var o = this.getScrollable();
    var a = this.option("rtlEnabled") ? (0, l.getBoundingRect)(this.getScrollableContainer().get(0)).width : 0;
    if (this.option("templatesRenderAsynchronously")) {
      setTimeout(function () {
        o.scrollBy({
          left: i.left - o.scrollLeft() - a,
          top: 0
        });
      });
    } else {
      o.scrollBy({
        left: i.left - o.scrollLeft() - a,
        top: 0
      });
    }
  };
  b.renderRAllDayPanel = function () {};
  b.renderRTimeTable = function () {};
  b._renderGroupAllDayPanel = function () {};
  b.generateRenderOptions = function () {
    return C({}, e.prototype.generateRenderOptions.call(this, true), {
      isGenerateWeekDaysHeaderData: this._needRenderWeekHeader(),
      getDateForHeaderText: g.getDateForHeaderText
    });
  };
  b._init = function () {
    e.prototype._init.call(this);
    this.$element().addClass("dx-scheduler-timeline");
    this._$sidebarTable = (0, a.default)("<div>").addClass("dx-scheduler-group-table");
  };
  b._getDefaultGroupStrategy = function () {
    return "vertical";
  };
  b._toggleGroupingDirectionClass = function () {
    this.$element().toggleClass("dx-scheduler-work-space-horizontal-grouped", this._isHorizontalGroupedWorkSpace());
  };
  b._getDefaultOptions = function () {
    return (0, s.extend)(e.prototype._getDefaultOptions.call(this), {
      groupOrientation: "vertical"
    });
  };
  b._createWorkSpaceElements = function () {
    this._createWorkSpaceScrollableElements();
  };
  b._toggleAllDayVisibility = function () {
    return (0, r.noop)();
  };
  b._changeAllDayVisibility = function () {
    return (0, r.noop)();
  };
  b._getDateHeaderTemplate = function () {
    return this.option("timeCellTemplate");
  };
  b._renderView = function () {
    var e;
    if (!this.isRenovatedRender()) {
      e = this._renderGroupHeader();
    }
    this.renderWorkSpace();
    if (this.isRenovatedRender()) {
      this.virtualScrollingDispatcher.updateDimensions();
    }
    this._shader = new f.default(this);
    this._$sidebarTable.appendTo(this._sidebarScrollable.$content());
    if (this.isRenovatedRender() && this._isVerticalGroupedWorkSpace()) {
      this.renderRGroupPanel();
    }
    this.updateHeaderEmptyCellWidth();
    this._applyCellTemplates(e);
  };
  b._setHorizontalGroupHeaderCellsHeight = function () {
    return (0, r.noop)();
  };
  b._setCurrentTimeCells = function () {
    var e = this._getTimePanelCells();
    this._getCurrentTimePanelCellIndices().forEach(function (t) {
      e.eq(t).addClass(p.HEADER_CURRENT_TIME_CELL_CLASS);
    });
  };
  b._cleanCurrentTimeCells = function () {
    this.$element().find(`.${p.HEADER_CURRENT_TIME_CELL_CLASS}`).removeClass(p.HEADER_CURRENT_TIME_CELL_CLASS);
  };
  b._getTimePanelCells = function () {
    return this.$element().find(`.dx-scheduler-header-panel-cell:not(.dx-scheduler-header-panel-week-cell)`);
  };
  b._getCurrentTimePanelCellIndices = function () {
    var e = this._getCellCount();
    var t = this._getToday();
    var n = this.getCellIndexByDate(t);
    var i = this._getCellCoordinatesByIndex(n).columnIndex;
    if (i === undefined) {
      return [];
    }
    var o = this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate() ? this._getGroupCount() : 1;
    return x(new Array(o)).map(function (t, n) {
      return e * n + i;
    });
  };
  b._renderTimePanel = function () {
    return (0, r.noop)();
  };
  b._renderAllDayPanel = function () {
    return (0, r.noop)();
  };
  b._createAllDayPanelElements = function () {
    return (0, r.noop)();
  };
  b._renderDateHeader = function () {
    var t = e.prototype._renderDateHeader.call(this);
    if (this._needRenderWeekHeader()) {
      var n = new Date(this.getStartViewDate());
      var i = new Date(n);
      var o = [];
      var r = this._getGroupCount();
      var s = this._getCellCountInDay();
      var l = this.isGroupedByDate() ? s * r : s;
      var u = this.option("dateCellTemplate");
      var d = this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate() ? r : 1;
      var c = this.viewDataProvider.viewDataGenerator.daysInInterval * this.option("intervalCount");
      for (var h = c * d, f = 0; f < h; f++) {
        var p = (0, a.default)("<th>");
        var g = (0, v.formatWeekdayAndDay)(i);
        if (u) {
          var m = {
            model: C({
              text: g,
              date: new Date(i)
            }, this._getGroupsForDateHeaderTemplate(f, l)),
            container: p,
            index: f
          };
          u.render(m);
        } else {
          p.text(g);
        }
        p.addClass("dx-scheduler-header-panel-cell").addClass("dx-scheduler-header-panel-week-cell").attr("colSpan", l);
        o.push(p);
        if (f % c == c - 1) {
          i = new Date(n);
        } else {
          this._incrementDate(i);
        }
      }
      var _ = (0, a.default)("<tr>").addClass("dx-scheduler-header-row").append(o);
      t.before(_);
    }
  };
  b._renderIndicator = function (e, t, n, i) {
    var a;
    var r = this.getIndicationWidth();
    if (this.option("groupOrientation") === "vertical") {
      a = this._createIndicator(n);
      (0, o.setHeight)(a, (0, l.getBoundingRect)(n.get(0)).height);
      a.css("left", t ? t - r : r);
    } else {
      for (var s = 0; s < i; s++) {
        var u = this.isGroupedByDate() ? s * this.getCellWidth() : this._getCellCount() * this.getCellWidth() * s;
        a = this._createIndicator(n);
        (0, o.setHeight)(a, (0, l.getBoundingRect)(n.get(0)).height);
        a.css("left", t ? t - r - u : r + u);
      }
    }
  };
  b._makeGroupRows = function (e, t) {
    var n = this.option("groupOrientation") === "vertical" ? D.VERTICAL : D.HORIZONTAL;
    return D.makeGroupedTable(n, e, {
      groupRowClass: p.GROUP_ROW_CLASS,
      groupHeaderRowClass: p.GROUP_ROW_CLASS,
      groupHeaderClass: this._getGroupHeaderClass.bind(this),
      groupHeaderContentClass: p.GROUP_HEADER_CONTENT_CLASS
    }, this._getCellCount() || 1, this.option("resourceCellTemplate"), this._getTotalRowCount(this._getGroupCount()), t);
  };
  u = i;
  if (d = [{
    key: "verticalGroupTableClass",
    get: function () {
      return "dx-scheduler-group-table";
    }
  }, {
    key: "viewDirection",
    get: function () {
      return "horizontal";
    }
  }, {
    key: "renovatedHeaderPanelComponent",
    get: function () {
      return _.default;
    }
  }]) {
    S(u.prototype, d);
  }
  if (h) {
    S(u, h);
  }
  Object.defineProperty(u, "prototype", {
    writable: false
  });
  return i;
}(d.default);
(0, u.default)("dxSchedulerTimeline", T);
var E = T;
exports.default = E;
module.exports = exports.default;
module.exports.default = exports.default;