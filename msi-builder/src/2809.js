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
var a = x(require("./68374.js"));
var r = x(require("./73349.js"));
var s = require("./20576.js");
var l = require("./95479.js");
var u = require("./6415.js");
var d = x(require("./99393.js"));
var c = x(require("./44845.js"));
var h = require("./13306.js");
var f = x(require("./91500.js"));
var p = x(require("./37428.js"));
var g = require("./62060.js");
var m = require("./98140.js");
var _ = require("./89206.js");
var v = require("./45985.js");
var y = require("./27728.js");
var b = x(require("./91198.js"));
function x(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function w(e, t) {
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
function C(e, t) {
  return (C = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var S = p.default.tableCreator;
var k = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  C(t, n);
  var d;
  var c;
  var p;
  var x = i.prototype;
  x.getStartViewDate = function () {
    return this._startViewDate;
  };
  x._init = function () {
    e.prototype._init.call(this);
    this._activeStateUnit = undefined;
  };
  x._getDefaultOptions = function () {
    return (0, h.extend)(e.prototype._getDefaultOptions.call(this), {
      agendaDuration: 7,
      rowHeight: 60,
      noDataText: ""
    });
  };
  x._optionChanged = function (t) {
    var n = t.name;
    var i = t.value;
    switch (n) {
      case "agendaDuration":
        break;
      case "noDataText":
      case "rowHeight":
        this._recalculateAgenda(this._rows);
        break;
      case "groups":
        if (i && i.length) {
          if (!this._$groupTable) {
            this._initGroupTable();
            this._dateTableScrollable.$content().prepend(this._$groupTable);
          }
        } else if (this._$groupTable) {
          this._$groupTable.remove();
          this._$groupTable = null;
          this._detachGroupCountClass();
        }
        e.prototype._optionChanged.call(this, t);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  x._renderFocusState = function () {
    return (0, s.noop)();
  };
  x._renderFocusTarget = function () {
    return (0, s.noop)();
  };
  x._cleanFocusState = function () {
    return (0, s.noop)();
  };
  x.supportAllDayRow = function () {
    return false;
  };
  x._isVerticalGroupedWorkSpace = function () {
    return false;
  };
  x._getElementClass = function () {
    return "dx-scheduler-agenda";
  };
  x._calculateStartViewDate = function () {
    return (0, _.calculateStartViewDate)(this.option("currentDate"), this.option("startDayHour"));
  };
  x._getRowCount = function () {
    return this.option("agendaDuration");
  };
  x._getCellCount = function () {
    return 1;
  };
  x._getTimePanelRowCount = function () {
    return this.option("agendaDuration");
  };
  x._renderAllDayPanel = function () {
    return (0, s.noop)();
  };
  x._toggleAllDayVisibility = function () {
    return (0, s.noop)();
  };
  x._initWorkSpaceUnits = function () {
    this._initGroupTable();
    this._$timePanel = (0, a.default)("<table>").addClass(g.TIME_PANEL_CLASS);
    this._$dateTable = (0, a.default)("<table>").addClass(g.DATE_TABLE_CLASS);
    this._$dateTableScrollableContent = (0, a.default)("<div>").addClass("dx-scheduler-date-table-scrollable-content");
    this._$dateTableContainer = (0, a.default)("<div>").addClass("dx-scheduler-date-table-container");
  };
  x._initGroupTable = function () {
    var e = this.option("groups");
    if (e && e.length) {
      this._$groupTable = (0, a.default)("<table>").addClass("dx-scheduler-group-table");
    }
  };
  x._renderView = function () {
    this._startViewDate = this._calculateStartViewDate();
    this._rows = [];
    this._initPositionHelper();
  };
  x._recalculateAgenda = function (e) {
    var t = [];
    this._cleanView();
    if (this._rowsIsEmpty(e)) {
      this._renderNoData();
    } else {
      this._rows = e;
      if (this._$groupTable) {
        t = this._renderGroupHeader();
        this._setGroupHeaderCellsHeight();
      }
      this._renderTimePanel();
      this._renderDateTable();
      this.invoke("onAgendaReady", e);
      this._applyCellTemplates(t);
      this._dateTableScrollable.update();
    }
  };
  x._renderNoData = function () {
    this._$noDataContainer = (0, a.default)("<div>").addClass("dx-scheduler-agenda-nodata").html(this.option("noDataText"));
    this._dateTableScrollable.$content().append(this._$noDataContainer);
  };
  x._setTableSizes = function () {
    return (0, s.noop)();
  };
  x._toggleHorizontalScrollClass = function () {
    return (0, s.noop)();
  };
  x._createCrossScrollingConfig = function () {
    return (0, s.noop)();
  };
  x._setGroupHeaderCellsHeight = function () {
    var e = this._getGroupHeaderCells().filter(function (e, t) {
      return !t.getAttribute("rowSpan");
    });
    var t = this._removeEmptyRows(this._rows);
    if (t.length) {
      for (var n = 0; n < e.length; n++) {
        var i = e.eq(n).find(".dx-scheduler-group-header-content");
        (0, o.setOuterHeight)(i, this._getGroupRowHeight(t[n]));
      }
    }
  };
  x._rowsIsEmpty = function (e) {
    var t = true;
    for (var n = 0; n < e.length; n++) {
      for (var i = e[n], o = 0; o < i.length; o++) {
        if (i[o]) {
          t = false;
          break;
        }
      }
    }
    return t;
  };
  x._attachGroupCountClass = function () {
    var e = (0, v.getVerticalGroupCountClass)(this.option("groups"));
    this.$element().addClass(e);
  };
  x._removeEmptyRows = function (e) {
    var t = [];
    for (var n = 0; n < e.length; n++) {
      if (e[n].length && e[n].some(function (e) {
        return e > 0;
      })) {
        t.push(e[n]);
      }
    }
    return t;
  };
  x._getGroupHeaderContainer = function () {
    return this._$groupTable;
  };
  x._makeGroupRows = function () {
    var e = this;
    var t = (0, m.createReducedResourcesTree)(this.option("loadedResources"), function (t, n) {
      return (0, m.getDataAccessors)(e.option("getResourceDataAccessors")(), t, n);
    }, this.option("getFilteredItems")());
    var n = this.option("resourceCellTemplate");
    var i = g.GROUP_HEADER_CONTENT_CLASS;
    var o = [];
    var s = S.makeGroupedTableFromJSON(S.VERTICAL, t, {
      cellTag: "th",
      groupTableClass: "dx-scheduler-group-table",
      groupRowClass: g.GROUP_ROW_CLASS,
      groupCellClass: this._getGroupHeaderClass(),
      groupCellCustomContent: function (e, t, s, l) {
        var d = r.default.createElement("div");
        var c = r.default.createElement("div");
        d.className = i;
        c.appendChild(t);
        d.appendChild(c);
        d.className = i;
        if (n && n.render) {
          o.push(n.render.bind(n, {
            model: {
              data: l.data,
              id: l.value,
              color: l.color,
              text: t.textContent
            },
            container: (0, u.getPublicElement)((0, a.default)(d)),
            index: s
          }));
        } else {
          c.appendChild(t);
          d.appendChild(c);
        }
        e.appendChild(d);
      },
      cellTemplate: n
    });
    return {
      elements: (0, a.default)(s).find(`.${g.GROUP_ROW_CLASS}`),
      cellTemplates: o
    };
  };
  x._cleanView = function () {
    this._$dateTable.empty();
    this._$timePanel.empty();
    if (this._$groupTable) {
      this._$groupTable.empty();
    }
    if (this._$noDataContainer) {
      this._$noDataContainer.empty();
      this._$noDataContainer.remove();
      delete this._$noDataContainer;
    }
  };
  x._createWorkSpaceElements = function () {
    this._createWorkSpaceStaticElements();
  };
  x._createWorkSpaceStaticElements = function () {
    this._$dateTableContainer.append(this._$dateTable);
    this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
    if (this._$groupTable) {
      this._$dateTableScrollableContent.prepend(this._$groupTable);
    }
    this._$dateTableScrollableContent.append(this._$timePanel, this._$dateTableContainer);
    this.$element().append(this._dateTableScrollable.$element());
  };
  x._renderDateTable = function () {
    this._renderTableBody({
      container: (0, u.getPublicElement)(this._$dateTable),
      rowClass: g.DATE_TABLE_ROW_CLASS,
      cellClass: this._getDateTableCellClass()
    });
  };
  x._attachTablesEvents = function () {
    return (0, s.noop)();
  };
  x._attachEvents = function () {
    return (0, s.noop)();
  };
  x._cleanCellDataCache = function () {
    return (0, s.noop)();
  };
  x.isIndicationAvailable = function () {
    return false;
  };
  x._prepareCellTemplateOptions = function (e, t, n, i) {
    var o = this.option("groups");
    var a = {};
    var r = !!o.length;
    (r && (0, m.getPathToLeaf)(n, o) || []).forEach(function (e, t) {
      var n = o[t].name;
      a[n] = e;
    });
    var s = r ? this._getGroupIndexByResourceId(a) : undefined;
    return {
      model: {
        text: e,
        date: t,
        groups: a,
        groupIndex: s
      },
      container: (0, u.getPublicElement)(i),
      index: n
    };
  };
  x._renderTableBody = function (e) {
    var t;
    var n = [];
    var i = e.cellTemplate;
    this._$rows = [];
    var r = function (r, s) {
      if (s) {
        var l;
        var u;
        var d;
        var c = (0, a.default)("<tr>");
        var h = (0, a.default)("<td>");
        (0, o.setHeight)(h, this._getRowHeight(s));
        if (e.getStartDate) {
          l = e.getStartDate && e.getStartDate(r);
          u = f.default.format(l, "d");
          d = f.default.format(l, v.formatWeekday);
        }
        if (i && i.render) {
          var p = this._prepareCellTemplateOptions(u + " " + d, l, t, h);
          n.push(i.render.bind(i, p));
        } else if (u && d) {
          h.addClass("dx-scheduler-agenda-date").text(u + " " + d);
        }
        if (e.rowClass) {
          c.addClass(e.rowClass);
        }
        if (e.cellClass) {
          h.addClass(e.cellClass);
        }
        c.append(h);
        this._$rows.push(c);
      }
    }.bind(this);
    for (t = 0; t < this._rows.length; t++) {
      (0, l.each)(this._rows[t], r);
      this._setLastRowClass();
    }
    (0, a.default)(e.container).append((0, a.default)("<tbody>").append(this._$rows));
    this._applyCellTemplates(n);
  };
  x._setLastRowClass = function () {
    if (this._rows.length > 1 && this._$rows.length) {
      this._$rows[this._$rows.length - 1].addClass("dx-scheduler-date-table-last-row");
    }
  };
  x._renderTimePanel = function () {
    this._renderTableBody({
      container: (0, u.getPublicElement)(this._$timePanel),
      rowCount: this._getTimePanelRowCount(),
      cellCount: 1,
      rowClass: "dx-scheduler-time-panel-row",
      cellClass: "dx-scheduler-time-panel-cell",
      cellTemplate: this.option("dateCellTemplate"),
      getStartDate: this._getTimePanelStartDate.bind(this)
    });
  };
  x._getTimePanelStartDate = function (e) {
    var t = new Date(this.option("currentDate"));
    return new Date(t.setDate(t.getDate() + e));
  };
  x._getRowHeight = function (e) {
    var t = this.option("rowHeight");
    if (e) {
      return t * e + (e - 1) * 5 + 20;
    } else {
      return 0;
    }
  };
  x._getGroupRowHeight = function (e) {
    if (e) {
      var t = 0;
      for (var n = 0; n < e.length; n++) {
        t += this._getRowHeight(e[n]);
      }
      return t;
    }
  };
  x._calculateRows = function (e) {
    return this.renderingStrategy.calculateRows(e, this.option("agendaDuration"), this.option("currentDate"));
  };
  x.onDataSourceChanged = function (t) {
    e.prototype.onDataSourceChanged.call(this);
    this._renderView();
    var n = this._calculateRows(t);
    this._recalculateAgenda(n);
  };
  x.getAgendaVerticalStepHeight = function () {
    return this.option("rowHeight");
  };
  x.getEndViewDate = function () {
    var e = new Date(this.option("currentDate"));
    var t = this.option("agendaDuration");
    e.setHours(this.option("endDayHour"));
    var n = e.setDate(e.getDate() + t - 1) - 60000;
    return new Date(n);
  };
  x.getEndViewDateByEndDayHour = function () {
    return this.getEndViewDate();
  };
  x.getCellDataByCoordinates = function () {
    return {
      startDate: null,
      endDate: null
    };
  };
  x.updateScrollPosition = function (e) {
    var t = this.timeZoneCalculator.createDate(e, {
      path: "toGrid"
    });
    var n = this.getVisibleBounds();
    var i = t.getHours();
    var o = t.getMinutes();
    if (this.needUpdateScrollPosition(i, o, n, t)) {
      this.scrollToTime(i, o, t);
    }
  };
  x.needUpdateScrollPosition = function (e, t, n) {
    var i = false;
    if (e < n.top.hours || e > n.bottom.hours) {
      i = true;
    }
    if (e === n.top.hours && t < n.top.minutes) {
      i = true;
    }
    if (e === n.bottom.hours && t > n.top.minutes) {
      i = true;
    }
    return i;
  };
  x.renovatedRenderSupported = function () {
    return false;
  };
  x._setSelectedCellsByCellData = function () {};
  x._getIntervalDuration = function () {
    return b.default.dateToMilliseconds("day") * this.option("intervalCount");
  };
  x.getDOMElementsMetaData = function () {
    return {
      dateTableCellsMeta: [[{}]],
      allDayPanelCellsMeta: [{}]
    };
  };
  d = i;
  if (c = [{
    key: "type",
    get: function () {
      return y.VIEWS.AGENDA;
    }
  }, {
    key: "renderingStrategy",
    get: function () {
      return this.invoke("getLayoutManager").getRenderingStrategyInstance();
    }
  }, {
    key: "appointmentDataProvider",
    get: function () {
      return this.option("getAppointmentDataProvider")();
    }
  }]) {
    w(d.prototype, c);
  }
  if (p) {
    w(d, p);
  }
  Object.defineProperty(d, "prototype", {
    writable: false
  });
  return i;
}(c.default);
(0, d.default)("dxSchedulerAgenda", k);
var D = k;
exports.default = D;
module.exports = exports.default;
module.exports.default = exports.default;