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
var a = Z(require("./68374.js"));
var r = Z(require("./73349.js"));
var s = Z(require("./55994.js"));
var l = Z(require("./91198.js"));
var u = require("./58201.js");
var d = require("./6415.js");
var c = require("./13306.js");
var h = require("./37518.js");
var f = Z(require("./28109.js"));
var p = require("./20576.js");
var g = require("./35922.js");
var m = require("./39611.js");
var _ = Z(require("./93786.js"));
var v = Z(require("./96688.js"));
var y = require("./95429.js");
var b = require("./49166.js");
var x = require("./23174.js");
var w = Z(require("./41183.js"));
var C = Z(require("./6654.js"));
var S = Z(require("./96311.js"));
var k = Z(require("./37428.js"));
var D = Z(require("./58037.js"));
var I = Z(require("./56504.js"));
var T = require("./27728.js");
var E = require("./62060.js");
var O = Z(require("./99068.js"));
var A = require("./31648.js");
var P = require("./12675.js");
var M = Z(require("./60611.js"));
var R = Z(require("./40181.js"));
var B = Z(require("./38201.js"));
var L = Z(require("./2931.js"));
var V = Z(require("./89687.js"));
var F = Z(require("./11141.js"));
var H = Z(require("./32972.js"));
var N = Z(require("./10800.js"));
var z = require("./56012.js");
var j = require("./96893.js");
var W = require("./45985.js");
var G = require("./98140.js");
var q = require("./69576.js");
var $ = require("./9259.js");
var U = require("./47617.js");
var K = require("./41672.js");
function Z(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function Y(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return X(e);
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
      return X(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return X(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function X(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function Q() {
  return (Q = Object.assign ? Object.assign.bind() : function (e) {
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
function J(e, t) {
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
function ee(e, t) {
  return (ee = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var te = k.default.tableCreator;
var ne = O.default.abstract;
var ie = l.default.dateToMilliseconds;
var oe = "dx-scheduler-all-day-table-cell";
var ae = "dx-scheduler-date-table-cell";
var re = (0, m.addNamespace)(_.default.down, "dxSchedulerWorkSpace");
var se = {
  ENTER: (0, m.addNamespace)(x.enter, "dxSchedulerDateTable"),
  DROP: (0, m.addNamespace)(x.drop, "dxSchedulerDateTable"),
  LEAVE: (0, m.addNamespace)(x.leave, "dxSchedulerDateTable")
};
var le = (0, m.addNamespace)(y.name, "dxSchedulerDateTable");
var ue = (0, m.addNamespace)(_.default.down, "dxSchedulerDateTable");
var de = (0, m.addNamespace)(_.default.up, "dxSchedulerDateTable");
var ce = (0, m.addNamespace)(_.default.move, "dxSchedulerDateTable");
var he = ie("day");
var fe = ie("hour");
var pe = `.${E.DATE_TABLE_CLASS} td, .dx-scheduler-all-day-table td`;
var ge = `.${ae}, .${oe}`;
var me = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  ee(t, n);
  var _;
  var y;
  var x;
  var k = i.prototype;
  k._supportedKeys = function () {
    var t = this;
    function n(e) {
      var t = this;
      e.preventDefault();
      e.stopPropagation();
      var n = this.cellsSelectionState.getSelectedCells();
      if (n != null && n.length) {
        var i = n.map(function (e) {
          return t._getCellByData(e);
        }).filter(function (e) {
          return !!e;
        });
        e.target = i;
        this._showPopup = true;
        this._cellClickAction({
          event: e,
          cellElement: (0, a.default)(i),
          cellData: n[0]
        });
      }
    }
    function i(e, n) {
      e.preventDefault();
      e.stopPropagation();
      var o = t.cellsSelectionState.focusedCell?.cellData;
      if (o) {
        var a = o.allDay && !t._isVerticalGroupedWorkSpace();
        var r = e.shiftKey;
        var s = t.option("allowMultipleCellSelection");
        var l = t._isRTL();
        var u = t._getGroupCount();
        var d = t.isGroupedByDate();
        var c = t._isHorizontalGroupedWorkSpace();
        var h = t.viewDataProvider.findCellPositionInMap(Q({}, o, {
          isAllDay: o.allDay
        }));
        var f = c && r && !d ? t.viewDataProvider.getGroupEdgeIndices(o.groupIndex, a) : t.viewDataProvider.getViewEdgeIndices(a);
        var p = t.cellsSelectionController.handleArrowClick({
          focusedCellPosition: h,
          edgeIndices: f,
          isRTL: l,
          isGroupedByDate: d,
          groupCount: u,
          isMultiSelection: r,
          isMultiSelectionAllowed: s,
          viewType: t.type,
          key: n,
          getCellDataByPosition: t.viewDataProvider.getCellData.bind(t.viewDataProvider),
          isAllDayPanelCell: a,
          focusedCellData: o
        });
        t._processNextSelectedCell(p, o, r && s);
      }
    }
    return (0, c.extend)(e.prototype._supportedKeys.call(this), {
      enter: n,
      space: n,
      downArrow: function (e) {
        i(e, "down");
      },
      upArrow: function (e) {
        i(e, "up");
      },
      rightArrow: function (e) {
        i(e, "right");
      },
      leftArrow: function (e) {
        i(e, "left");
      }
    });
  };
  k._isRTL = function () {
    return this.option("rtlEnabled");
  };
  k._moveToCell = function (e, t) {
    if ((0, g.isDefined)(e) && e.length) {
      var n = this.option("allowMultipleCellSelection");
      var i = this._getFullCellData(e);
      var o = this.cellsSelectionState.focusedCell.cellData;
      var a = this.cellsSelectionController.moveToCell({
        isMultiSelection: t,
        isMultiSelectionAllowed: n,
        currentCellData: i,
        focusedCellData: o,
        isVirtualCell: e.hasClass(E.VIRTUAL_CELL_CLASS)
      });
      this._processNextSelectedCell(a, o, n && t);
    }
  };
  k._processNextSelectedCell = function (e, t, n) {
    var i = this.viewDataProvider.findCellPositionInMap({
      startDate: e.startDate,
      groupIndex: e.groupIndex,
      isAllDay: e.allDay,
      index: e.index
    });
    if (!this.viewDataProvider.isSameCell(t, e)) {
      var o = e.allDay && !this._isVerticalGroupedWorkSpace() ? this._dom_getAllDayPanelCell(i.columnIndex) : this._dom_getDateCell(i);
      var a = e.allDay;
      this._setSelectedCellsStateAndUpdateSelection(a, i, n, o);
      this._dateTableScrollable.scrollToElement(o);
    }
  };
  k._setSelectedCellsStateAndUpdateSelection = function (e, t, n, i) {
    var o = {
      rowIndex: t.rowIndex,
      columnIndex: t.columnIndex,
      allDay: e
    };
    this.cellsSelectionState.setFocusedCell(o.rowIndex, o.columnIndex, e);
    if (n) {
      this.cellsSelectionState.setSelectedCells(o);
    } else {
      this.cellsSelectionState.setSelectedCells(o, o);
    }
    this.updateCellsSelection();
    this._updateSelectedCellDataOption(this.cellsSelectionState.getSelectedCells(), i);
  };
  k._hasAllDayClass = function (e) {
    return e.hasClass(oe);
  };
  k._focusInHandler = function (t) {
    if ((0, a.default)(t.target).is(this._focusTarget()) && this._isCellClick !== false) {
      delete this._isCellClick;
      delete this._contextMenuHandled;
      e.prototype._focusInHandler.apply(this, arguments);
      this.cellsSelectionState.restoreSelectedAndFocusedCells();
      if (!this.cellsSelectionState.focusedCell) {
        var n = {
          columnIndex: 0,
          rowIndex: 0,
          allDay: this._isVerticalGroupedWorkSpace() && this.isAllDayPanelVisible
        };
        this.cellsSelectionState.setFocusedCell(n.rowIndex, n.columnIndex, n.allDay);
        this.cellsSelectionState.setSelectedCells(n, n);
      }
      this.updateCellsSelection();
      this._updateSelectedCellDataOption(this.cellsSelectionState.getSelectedCells());
    }
  };
  k._focusOutHandler = function () {
    e.prototype._focusOutHandler.apply(this, arguments);
    if (!this._contextMenuHandled && !this._disposed) {
      this.cellsSelectionState.releaseSelectedAndFocusedCells();
      this.viewDataProvider.updateViewData(this.generateRenderOptions());
      this.updateCellsSelection();
    }
  };
  k._focusTarget = function () {
    return this.$element();
  };
  k._isVerticalGroupedWorkSpace = function () {
    return !!this.option("groups").length && this.option("groupOrientation") === "vertical";
  };
  k._isHorizontalGroupedWorkSpace = function () {
    return !!this.option("groups").length && this.option("groupOrientation") === "horizontal";
  };
  k._isWorkSpaceWithCount = function () {
    return this.option("intervalCount") > 1;
  };
  k._isWorkspaceWithOddCells = function () {
    return this.option("hoursInterval") === 0.5 && !this.isVirtualScrolling();
  };
  k._getRealGroupOrientation = function () {
    if (this._isVerticalGroupedWorkSpace()) {
      return "vertical";
    } else {
      return "horizontal";
    }
  };
  k.createRAllDayPanelElements = function () {
    this._$allDayPanel = (0, a.default)("<div>").addClass("dx-scheduler-all-day-panel");
    this._$allDayTitle = (0, a.default)("<div>").appendTo(this._$headerPanelEmptyCell);
  };
  k._dateTableScrollableConfig = function () {
    var e = this;
    var t = {
      useKeyboard: false,
      bounceEnabled: false,
      updateManually: true,
      onScroll: function () {
        var t;
        if ((t = e._groupedStrategy.cache) !== null && t !== undefined) {
          t.clear();
        }
      }
    };
    if (this._needCreateCrossScrolling()) {
      t = (0, c.extend)(t, this._createCrossScrollingConfig(t));
    }
    if (this.isVirtualScrolling() && (this.virtualScrollingDispatcher.horizontalScrollingAllowed || this.virtualScrollingDispatcher.height)) {
      var n = t.onScroll;
      t = Q({}, t, {
        onScroll: function (t) {
          if (n != null) {
            n(t);
          }
          e.virtualScrollingDispatcher.handleOnScrollEvent(t == null ? undefined : t.scrollOffset);
        }
      });
    }
    return t;
  };
  k._createCrossScrollingConfig = function (e) {
    var t = this;
    var n = e.onScroll;
    return {
      direction: "both",
      onScroll: function (e) {
        if (n != null) {
          n();
        }
        t._scrollSync.sidebar({
          top: e.scrollOffset.top
        });
        t._scrollSync.header({
          left: e.scrollOffset.left
        });
      },
      onEnd: function () {
        t.option("onScrollEnd")();
      }
    };
  };
  k._headerScrollableConfig = function () {
    var e = this;
    return {
      useKeyboard: false,
      showScrollbar: "never",
      direction: "horizontal",
      useNative: false,
      updateManually: true,
      bounceEnabled: false,
      onScroll: function (t) {
        e._scrollSync.dateTable({
          left: t.scrollOffset.left
        });
      }
    };
  };
  k._visibilityChanged = function (e) {
    this.cache.clear();
    if (e) {
      this._updateGroupTableHeight();
    }
    if (e && this._needCreateCrossScrolling()) {
      this._setTableSizes();
    }
  };
  k._setTableSizes = function () {
    this.cache.clear();
    this._attachTableClasses();
    var e = this.getCellWidth();
    if (e < this.getCellMinWidth()) {
      e = this.getCellMinWidth();
    }
    var t = this.getWorkSpaceMinWidth();
    var n = this._getGroupCount();
    var i = e * this._getTotalCellCount(n);
    if (i < t) {
      i = t;
    }
    (0, o.setWidth)(this._$headerPanel, i);
    (0, o.setWidth)(this._$dateTable, i);
    if (this._$allDayTable) {
      (0, o.setWidth)(this._$allDayTable, i);
    }
    this._attachHeaderTableClasses();
    this._updateGroupTableHeight();
    this._updateScrollable();
  };
  k.getWorkSpaceMinWidth = function () {
    return this._groupedStrategy.getWorkSpaceMinWidth();
  };
  k._dimensionChanged = function () {
    if (this._isVisible()) {
      if (this.option("crossScrollingEnabled")) {
        this._setTableSizes();
      }
      this.updateHeaderEmptyCellWidth();
      this._updateScrollable();
      this.cache.clear();
    }
  };
  k._needCreateCrossScrolling = function () {
    return this.option("crossScrollingEnabled");
  };
  k._getElementClass = function () {
    return (0, p.noop)();
  };
  k._getRowCount = function () {
    return this.viewDataProvider.getRowCount({
      intervalCount: this.option("intervalCount"),
      currentDate: this.option("currentDate"),
      viewType: this.type,
      hoursInterval: this.option("hoursInterval"),
      startDayHour: this.option("startDayHour"),
      endDayHour: this.option("endDayHour")
    });
  };
  k._getCellCount = function () {
    return this.viewDataProvider.getCellCount({
      intervalCount: this.option("intervalCount"),
      currentDate: this.option("currentDate"),
      viewType: this.type,
      hoursInterval: this.option("hoursInterval"),
      startDayHour: this.option("startDayHour"),
      endDayHour: this.option("endDayHour")
    });
  };
  k.isRenovatedRender = function () {
    return this.renovatedRenderSupported() && this.option("renovateRender");
  };
  k._isVirtualModeOn = function () {
    return this.option("scrolling.mode") === "virtual";
  };
  k.isVirtualScrolling = function () {
    return this.isRenovatedRender() && this._isVirtualModeOn();
  };
  k._initVirtualScrolling = function () {
    if (this.virtualScrollingDispatcher) {
      this.virtualScrollingDispatcher.dispose();
      this.virtualScrollingDispatcher = null;
    }
    this.virtualScrollingDispatcher = new P.VirtualScrollingDispatcher(this._getVirtualScrollingDispatcherOptions());
    this.virtualScrollingDispatcher.attachScrollableEvents();
    this.renderer = new P.VirtualScrollingRenderer(this);
  };
  k.onDataSourceChanged = function () {};
  k.isGroupedAllDayPanel = function () {
    return (0, W.calculateIsGroupedAllDayPanel)(this.option("groups"), this.option("groupOrientation"), this.isAllDayPanelVisible);
  };
  k.generateRenderOptions = function (e) {
    var t;
    var n = this._getGroupCount() > 0 ? this.option("groupOrientation") : this._getDefaultGroupStrategy();
    return Q({
      groupByDate: this.option("groupByDate"),
      startRowIndex: 0,
      startCellIndex: 0,
      groupOrientation: n,
      today: (t = this._getToday) === null || t === undefined ? undefined : t.call(this),
      groups: this.option("groups"),
      isProvideVirtualCellsWidth: e,
      isAllDayPanelVisible: this.isAllDayPanelVisible,
      selectedCells: this.cellsSelectionState.getSelectedCells(),
      focusedCell: this.cellsSelectionState.focusedCell,
      headerCellTextFormat: this._getFormat(),
      getDateForHeaderText: function (e, t) {
        return t;
      },
      startDayHour: this.option("startDayHour"),
      endDayHour: this.option("endDayHour"),
      cellDuration: this.getCellDuration(),
      viewType: this.type,
      intervalCount: this.option("intervalCount"),
      hoursInterval: this.option("hoursInterval"),
      currentDate: this.option("currentDate"),
      startDate: this.option("startDate"),
      firstDayOfWeek: this.option("firstDayOfWeek")
    }, this.virtualScrollingDispatcher.getRenderState());
  };
  k.renovatedRenderSupported = function () {
    return true;
  };
  k._updateGroupTableHeight = function () {
    if (this._isVerticalGroupedWorkSpace() && (0, u.hasWindow)()) {
      this._setHorizontalGroupHeaderCellsHeight();
    }
  };
  k.updateHeaderEmptyCellWidth = function () {
    if ((0, u.hasWindow)() && this._isRenderHeaderPanelEmptyCell()) {
      var e = this.getTimePanelWidth();
      var t = this.getGroupTableWidth();
      this._$headerPanelEmptyCell.css("width", e + t);
    }
  };
  k._isGroupsSpecified = function (e) {
    return this.option("groups").length && e;
  };
  k._getGroupIndexByResourceId = function (e) {
    var t = this.option("groups");
    var n = (0, G.createResourcesTree)(t);
    if (n.length) {
      return this._getGroupIndexRecursively(n, e);
    } else {
      return 0;
    }
  };
  k._getGroupIndexRecursively = function (e, t) {
    var n = this;
    var i = e[0].name;
    var o = t[i];
    return e.reduce(function (e, i) {
      var a = i.leafIndex;
      var r = i.value;
      var s = i.children;
      var l = o === r;
      if (l && a !== undefined) {
        return a;
      } else if (l) {
        return n._getGroupIndexRecursively(s, t);
      } else {
        return e;
      }
    }, 0);
  };
  k._getViewStartByOptions = function () {
    return (0, W.getViewStartByOptions)(this.option("startDate"), this.option("currentDate"), this._getIntervalDuration(), this.option("startDate") ? this._calculateViewStartDate() : undefined);
  };
  k._getIntervalDuration = function () {
    return this.viewDataProvider.getIntervalDuration(this.option("intervalCount"));
  };
  k._getHeaderDate = function () {
    return this.getStartViewDate();
  };
  k._calculateViewStartDate = function () {
    return (0, W.calculateViewStartDate)(this.option("startDate"));
  };
  k._firstDayOfWeek = function () {
    return this.viewDataProvider.getFirstDayOfWeek(this.option("firstDayOfWeek"));
  };
  k._attachEvents = function () {
    this._createSelectionChangedAction();
    this._attachClickEvent();
    this._attachContextMenuEvent();
  };
  k._attachClickEvent = function () {
    var e = this;
    var t = this._createAction(function (t) {
      e._pointerDownHandler(t.event);
    });
    this._createCellClickAction();
    var n = this.$element();
    s.default.off(n, re);
    s.default.off(n, le);
    s.default.on(n, re, function (e) {
      if ((0, m.isMouseEvent)(e) && e.which > 1) {
        e.preventDefault();
      } else {
        t({
          event: e
        });
      }
    });
    s.default.on(n, le, ".dx-scheduler-date-table-cell,.dx-scheduler-all-day-table-cell", function (t) {
      var n = (0, a.default)(t.target);
      e._cellClickAction({
        event: t,
        cellElement: (0, d.getPublicElement)(n),
        cellData: e.getCellData(n)
      });
    });
  };
  k._createCellClickAction = function () {
    var e = this;
    this._cellClickAction = this._createActionByOption("onCellClick", {
      afterExecute: function (t) {
        return e._cellClickHandler(t.args[0].event);
      }
    });
  };
  k._createSelectionChangedAction = function () {
    this._selectionChangedAction = this._createActionByOption("onSelectionChanged");
  };
  k._cellClickHandler = function () {
    if (this._showPopup) {
      delete this._showPopup;
      this._handleSelectedCellsClick();
    }
  };
  k._pointerDownHandler = function (e) {
    var t = (0, a.default)(e.target);
    if (t.hasClass(ae) || t.hasClass(oe)) {
      this._isCellClick = true;
      if (t.hasClass("dx-scheduler-focused-cell")) {
        this._showPopup = true;
      } else {
        var n = this._getCoordinatesByCell(t);
        var i = this._hasAllDayClass(t);
        this._setSelectedCellsStateAndUpdateSelection(i, n, false, t);
      }
    } else {
      this._isCellClick = false;
    }
  };
  k._handleSelectedCellsClick = function () {
    var e = this.cellsSelectionState.getSelectedCells();
    var t = e[0];
    var n = e[e.length - 1];
    var i = {
      startDate: t.startDate,
      endDate: n.endDate
    };
    if (n.allDay !== undefined) {
      i.allDay = n.allDay;
    }
    this.option("onSelectedCellsClick")(i, n.groups);
  };
  k._attachContextMenuEvent = function () {
    this._createContextMenuAction();
    var e = "." + ae + ",." + oe;
    var t = this.$element();
    var n = (0, m.addNamespace)(b.name, this.NAME);
    s.default.off(t, n, e);
    s.default.on(t, n, e, this._contextMenuHandler.bind(this));
  };
  k._contextMenuHandler = function (e) {
    var t = (0, a.default)(e.target);
    this._contextMenuAction({
      event: e,
      cellElement: (0, d.getPublicElement)(t),
      cellData: this.getCellData(t)
    });
    this._contextMenuHandled = true;
  };
  k._createContextMenuAction = function () {
    this._contextMenuAction = this._createActionByOption("onCellContextMenu");
  };
  k._getGroupHeaderContainer = function () {
    if (this._isVerticalGroupedWorkSpace()) {
      return this._$groupTable;
    } else {
      return this._$thead;
    }
  };
  k._getDateHeaderContainer = function () {
    return this._$thead;
  };
  k._getCalculateHeaderCellRepeatCount = function () {
    return this._groupedStrategy.calculateHeaderCellRepeatCount();
  };
  k._updateScrollable = function () {
    var e;
    var t;
    this._dateTableScrollable.update();
    if ((e = this._headerScrollable) !== null && e !== undefined) {
      e.update();
    }
    if ((t = this._sidebarScrollable) !== null && t !== undefined) {
      t.update();
    }
  };
  k._getTimePanelRowCount = function () {
    return this._getCellCountInDay();
  };
  k._getCellCountInDay = function () {
    var e = this.option("hoursInterval");
    var t = this.option("startDayHour");
    var n = this.option("endDayHour");
    return this.viewDataProvider.getCellCountInDay(t, n, e);
  };
  k._getTotalCellCount = function (e) {
    return this._groupedStrategy.getTotalCellCount(e);
  };
  k._getTotalRowCount = function (e, t) {
    var n = this._groupedStrategy.getTotalRowCount(e);
    if (t && this.isAllDayPanelVisible) {
      n += e;
    }
    return n;
  };
  k._getGroupIndex = function (e, t) {
    return this._groupedStrategy.getGroupIndex(e, t);
  };
  k.calculateEndDate = function (e) {
    var t = this.viewDataProvider.viewDataGenerator;
    return t.calculateEndDate(e, t.getInterval(this.option("hoursInterval")), this.option("endDayHour"));
  };
  k._getGroupCount = function () {
    return (0, G.getGroupCount)(this.option("groups"));
  };
  k._attachTablesEvents = function () {
    var e = this.$element();
    this._attachDragEvents(e);
    this._attachPointerEvents(e);
  };
  k._detachDragEvents = function (e) {
    s.default.off(e, se.ENTER);
    s.default.off(e, se.LEAVE);
    s.default.off(e, se.DROP);
  };
  k._attachDragEvents = function (e) {
    var t = this;
    this._detachDragEvents(e);
    s.default.on(e, se.ENTER, pe, {
      checkDropTarget: function (e, n) {
        return !t._isOutsideScrollable(e, n);
      }
    }, function (e) {
      if (!t.preventDefaultDragging) {
        t.removeDroppableCellClass();
        (0, a.default)(e.target).addClass("dx-scheduler-date-table-droppable-cell");
      }
    });
    s.default.on(e, se.LEAVE, function () {
      if (!t.preventDefaultDragging) {
        t.removeDroppableCellClass();
      }
    });
    s.default.on(e, se.DROP, pe, function () {
      var e;
      var n;
      if (t.dragBehavior) {
        if ((e = t.dragBehavior) !== null && e !== undefined && e.dragBetweenComponentsPromise) {
          if ((n = t.dragBehavior.dragBetweenComponentsPromise) !== null && n !== undefined) {
            n.then(function () {
              t.dragBehavior.removeDroppableClasses();
            });
          }
        } else {
          t.dragBehavior.removeDroppableClasses();
        }
      }
    });
  };
  k._attachPointerEvents = function (e) {
    var t = this;
    var n = false;
    s.default.off(e, ce);
    s.default.off(e, ue);
    s.default.on(e, ue, pe, function (e) {
      if ((0, m.isMouseEvent)(e) && e.which === 1) {
        n = true;
        t.$element().addClass("dx-scheduler-work-space-mouse-selection");
        s.default.off(r.default.getDocument(), de);
        s.default.on(r.default.getDocument(), de, function () {
          n = false;
          t.$element().removeClass("dx-scheduler-work-space-mouse-selection");
        });
      }
    });
    s.default.on(e, ce, pe, function (e) {
      if (n && t._dateTableScrollable && !t._dateTableScrollable.option("scrollByContent")) {
        e.preventDefault();
        e.stopPropagation();
        t._moveToCell((0, a.default)(e.target), true);
      }
    });
  };
  k._getFormat = function () {
    return ne();
  };
  k.getWorkArea = function () {
    return this._$dateTableContainer;
  };
  k.getScrollable = function () {
    return this._dateTableScrollable;
  };
  k.getScrollableScrollTop = function () {
    return this._dateTableScrollable.scrollTop();
  };
  k.getGroupedScrollableScrollTop = function (e) {
    return this._groupedStrategy.getScrollableScrollTop(e);
  };
  k.getScrollableScrollLeft = function () {
    return this._dateTableScrollable.scrollLeft();
  };
  k.getScrollableOuterWidth = function () {
    return this._dateTableScrollable.scrollWidth();
  };
  k.getScrollableContainer = function () {
    return (0, a.default)(this._dateTableScrollable.container());
  };
  k.getHeaderPanelHeight = function () {
    return this._$headerPanel && (0, o.getOuterHeight)(this._$headerPanel, true);
  };
  k.getTimePanelWidth = function () {
    return this._$timePanel && (0, h.getBoundingRect)(this._$timePanel.get(0)).width;
  };
  k.getGroupTableWidth = function () {
    if (this._$groupTable) {
      return (0, o.getOuterWidth)(this._$groupTable);
    } else {
      return 0;
    }
  };
  k.getWorkSpaceLeftOffset = function () {
    return this._groupedStrategy.getLeftOffset();
  };
  k._getCellCoordinatesByIndex = function (e) {
    var t = Math.floor(e / this._getRowCount());
    return {
      columnIndex: t,
      rowIndex: e - this._getRowCount() * t
    };
  };
  k._getDateGenerationOptions = function () {
    var e;
    return {
      startDayHour: this.option("startDayHour"),
      endDayHour: this.option("endDayHour"),
      isWorkView: this.viewDataProvider.viewDataGenerator.isWorkView,
      interval: (e = this.viewDataProvider.viewDataGenerator) === null || e === undefined ? undefined : e.getInterval(this.option("hoursInterval")),
      startViewDate: this.getStartViewDate(),
      firstDayOfWeek: this._firstDayOfWeek()
    };
  };
  k._getIntervalBetween = function (e, t) {
    var n = this.getStartViewDate();
    var i = this.option("startDayHour") * fe;
    var o = l.default.getTimezonesDifference(n, e);
    var a = e.getTime() - n.getTime() - o;
    var r = this._getDaysOfInterval(a, i);
    var s = this._getWeekendsCount(r);
    var u = (r - s) * he;
    if (!t) {
      u = a - r * this.viewDataProvider.hiddenInterval - s * this.getVisibleDayDuration();
    }
    return u;
  };
  k._getWeekendsCount = function () {
    return 0;
  };
  k._getDaysOfInterval = function (e, t) {
    return Math.floor((e + t) / he);
  };
  k._updateIndex = function (e) {
    return e * this._getRowCount();
  };
  k._getDroppableCell = function () {
    return this._getDateTables().find(".dx-scheduler-date-table-droppable-cell");
  };
  k._getWorkSpaceWidth = function () {
    var e = this;
    return this.cache.get("workspaceWidth", function () {
      if (e._needCreateCrossScrolling()) {
        return (0, h.getBoundingRect)(e._$dateTable.get(0)).width;
      } else {
        return (0, h.getBoundingRect)(e.$element().get(0)).width - e.getTimePanelWidth() - e.getGroupTableWidth();
      }
    });
  };
  k._getCellByCoordinates = function (e, t, n) {
    var i = this._groupedStrategy.prepareCellIndexes(e, t, n);
    return this._dom_getDateCell(i);
  };
  k._dom_getDateCell = function (e) {
    return this._$dateTable.find(`tr:not(.dx-scheduler-virtual-row)`).eq(e.rowIndex).find(`td:not(.${E.VIRTUAL_CELL_CLASS})`).eq(e.columnIndex);
  };
  k._dom_getAllDayPanelCell = function (e) {
    return this._$allDayPanel.find("tr").eq(0).find("td").eq(e);
  };
  k._getCells = function (e, t) {
    var n = e ? oe : ae;
    if (t === "vertical") {
      var i = [];
      for (var o = 1;; o++) {
        var r = this.$element().find(`tr .${n}:nth-child(${o})`);
        if (!r.length) {
          break;
        }
        i = i.concat(r.toArray());
      }
      return (0, a.default)(i);
    }
    return this.$element().find("." + n);
  };
  k._getFirstAndLastDataTableCell = function () {
    var e = this.isVirtualScrolling() ? `.${ae}, .${E.VIRTUAL_CELL_CLASS}` : `.${ae}`;
    var t = this.$element().find(e);
    return [t[0], t[t.length - 1]];
  };
  k._getAllCells = function (e) {
    if (this._isVerticalGroupedWorkSpace()) {
      return this._$dateTable.find(`td:not(.${E.VIRTUAL_CELL_CLASS})`);
    }
    var t = e && this.supportAllDayRow() ? oe : ae;
    return this.$element().find(`.${t}`);
  };
  k._setHorizontalGroupHeaderCellsHeight = function () {
    var e = (0, h.getBoundingRect)(this._$dateTable.get(0)).height;
    (0, o.setOuterHeight)(this._$groupTable, e);
  };
  k._getGroupHeaderCells = function () {
    return this.$element().find(".dx-scheduler-group-header");
  };
  k._getScrollCoordinates = function (e, t, n, i, o) {
    var a = n || new Date(this.option("currentDate"));
    var r = this.option("startDayHour");
    var s = this.option("endDayHour");
    if (e < r) {
      e = r;
    }
    if (e >= s) {
      e = s - 1;
    }
    a.setHours(e, t, 0, 0);
    var l = this.viewDataProvider.findGlobalCellPosition(a, i, o);
    var u = l.position;
    var d = l.cellData;
    return this.virtualScrollingDispatcher.calculateCoordinatesByDataAndPosition(d, u, a, (0, W.isDateAndTimeView)(this.type), this.viewDirection === "vertical");
  };
  k._isOutsideScrollable = function (e, t) {
    var n = this._dateTableScrollable.$element();
    var i = (0, h.getBoundingRect)(n.get(0));
    var o = (0, u.getWindow)();
    var r = !(0, a.default)(e).closest(n).length;
    var s = t.pageX < i.left || t.pageX > i.left + i.width + (o.scrollX || 0);
    var l = t.pageY < i.top || t.pageY > i.top + i.height + (o.scrollY || 0);
    return (!r || !!s) && (l || s);
  };
  k.setCellDataCache = function (e, t, n) {
    var i = JSON.stringify({
      rowIndex: e.rowIndex,
      columnIndex: e.columnIndex,
      groupIndex: t
    });
    this.cache.set(i, this.getCellData(n));
  };
  k.setCellDataCacheAlias = function (e, t) {
    var n = JSON.stringify({
      rowIndex: e.rowIndex,
      columnIndex: e.columnIndex,
      groupIndex: e.groupIndex
    });
    var i = JSON.stringify({
      top: t.top,
      left: t.left
    });
    this.cache.set(i, this.cache.get(n));
  };
  k.supportAllDayRow = function () {
    return true;
  };
  k.keepOriginalHours = function () {
    return false;
  };
  k._filterCellDataFields = function (e) {
    return (0, c.extend)(true, {}, {
      startDate: e.startDate,
      endDate: e.endDate,
      groups: e.groups,
      groupIndex: e.groupIndex,
      allDay: e.allDay
    });
  };
  k.getCellData = function (e) {
    var t = this._getFullCellData(e) || {};
    return this._filterCellDataFields(t);
  };
  k._getFullCellData = function (e) {
    if (e[0]) {
      return this._getDataByCell(e);
    }
  };
  k._getVirtualRowOffset = function () {
    return this.virtualScrollingDispatcher.virtualRowOffset;
  };
  k._getVirtualCellOffset = function () {
    return this.virtualScrollingDispatcher.virtualCellOffset;
  };
  k._getDataByCell = function (e) {
    var t = e.parent().index() - this.virtualScrollingDispatcher.topVirtualRowsCount;
    var n = e.index() - this.virtualScrollingDispatcher.leftVirtualCellsCount;
    var i = this.viewDataProvider;
    var o = this._hasAllDayClass(e);
    var a = i.getCellData(t, n, o);
    return a || undefined;
  };
  k.isGroupedByDate = function () {
    return this.option("groupByDate") && this._isHorizontalGroupedWorkSpace() && this._getGroupCount() > 0;
  };
  k.getCellIndexByDate = function (e, t) {
    var n = this.viewDataProvider.viewDataGenerator;
    var i = t ? 86400000 : n.getInterval(this.option("hoursInterval"));
    var o = (0, W.getStartViewDateTimeOffset)(this.getStartViewDate(), this.option("startDayHour"));
    var a = this._getIntervalBetween(e, t) + o;
    var r = Math.floor(a / i);
    if (t) {
      r = this._updateIndex(r);
    }
    if (r < 0) {
      r = 0;
    }
    return r;
  };
  k.getDroppableCellIndex = function () {
    var e = this._getDroppableCell();
    var t = e.parent();
    return t.index() * t.find("td").length + e.index();
  };
  k.getDataByDroppableCell = function () {
    var e = this.getCellData((0, a.default)(this._getDroppableCell()));
    var t = e.allDay;
    return {
      startDate: e.startDate,
      endDate: e.endDate,
      allDay: t,
      groups: e.groups
    };
  };
  k.getDateRange = function () {
    return [this.getStartViewDate(), this.getEndViewDateByEndDayHour()];
  };
  k.getCellMinWidth = function () {
    return 75;
  };
  k.getRoundedCellWidth = function (e, t, n) {
    if (e < 0 || !(0, u.hasWindow)()) {
      return 0;
    }
    var i = 0;
    var o = this.$element().find(`.${E.DATE_TABLE_ROW_CLASS}`).eq(0).find("." + ae);
    var r = this._getCellCount() * e;
    n = n || this._getCellCount();
    if (!(0, g.isDefined)(t)) {
      t = r;
    }
    for (var s = t; s < r + n; s++) {
      var l = (0, a.default)(o).eq(s).get(0);
      i += l ? (0, h.getBoundingRect)(l).width : 0;
    }
    return i / (r + n - t);
  };
  k.getCellWidth = function () {
    return (0, q.getCellWidth)(this.getDOMElementsMetaData());
  };
  k.getCellHeight = function () {
    return (0, q.getCellHeight)(this.getDOMElementsMetaData());
  };
  k.getAllDayHeight = function () {
    return (0, q.getAllDayHeight)(this.option("showAllDayPanel"), this._isVerticalGroupedWorkSpace(), this.getDOMElementsMetaData());
  };
  k.getMaxAllowedPosition = function (e) {
    return (0, q.getMaxAllowedPosition)(e, this.viewDataProvider, this.option("rtlEnabled"), this.getDOMElementsMetaData());
  };
  k.getAllDayOffset = function () {
    return this._groupedStrategy.getAllDayOffset();
  };
  k.getCellIndexByCoordinates = function (e, t) {
    var n = this._getTotalCellCount(this._getGroupCount());
    var i = this.getCellWidth();
    var o = t ? this.getAllDayHeight() : this.getCellHeight();
    var a = Math.floor(Math.floor(e.top) / Math.floor(o));
    var r = e.left / i;
    r = Math.floor(r + 0.05);
    if (this._isRTL()) {
      r = n - r - 1;
    }
    return n * a + r;
  };
  k.getStartViewDate = function () {
    return this.viewDataProvider.getStartViewDate();
  };
  k.getEndViewDate = function () {
    return this.viewDataProvider.getLastCellEndDate();
  };
  k.getEndViewDateByEndDayHour = function () {
    return this.viewDataProvider.getLastViewDateByEndDayHour(this.option("endDayHour"));
  };
  k.getCellDuration = function () {
    return (0, W.getCellDuration)(this.type, this.option("startDayHour"), this.option("endDayHour"), this.option("hoursInterval"));
  };
  k.getIntervalDuration = function (e) {
    if (e) {
      return ie("day");
    } else {
      return this.getCellDuration();
    }
  };
  k.getVisibleDayDuration = function () {
    var e = this.option("startDayHour");
    var t = this.option("endDayHour");
    var n = this.option("hoursInterval");
    return this.viewDataProvider.getVisibleDayDuration(e, t, n);
  };
  k.getGroupBounds = function (e) {
    var t = this._groupedStrategy instanceof S.default ? this.getGroupBoundsVertical(e.groupIndex) : this.getGroupBoundsHorizontal(e);
    if (this._isRTL()) {
      return this.getGroupBoundsRtlCorrection(t);
    } else {
      return t;
    }
  };
  k.getGroupBoundsVertical = function (e) {
    var t = this._getFirstAndLastDataTableCell();
    return this._groupedStrategy.getGroupBoundsOffset(e, t);
  };
  k.getGroupBoundsHorizontal = function (e) {
    var t = this._getCellCount();
    var n = this._getCells();
    var i = this.getCellWidth();
    var o = this.viewDataProvider.groupedDataMap;
    return this._groupedStrategy.getGroupBoundsOffset(t, n, i, e, o);
  };
  k.getGroupBoundsRtlCorrection = function (e) {
    var t = this.getCellWidth();
    return Q({}, e, {
      left: e.right - t * 2,
      right: e.left + t * 2
    });
  };
  k.needRecalculateResizableArea = function () {
    return this._isVerticalGroupedWorkSpace() && this.getScrollable().scrollTop() !== 0;
  };
  k.getCellDataByCoordinates = function (e, t) {
    var n = this;
    var i = JSON.stringify({
      top: e.top,
      left: e.left
    });
    return this.cache.get(i, function () {
      var i = n._getCells(t);
      var o = n.getCellIndexByCoordinates(e, t);
      var a = i.eq(o);
      return n.getCellData(a);
    });
  };
  k.getVisibleBounds = function () {
    var e = {};
    var t = this.getScrollable().$element();
    var n = this.getCellHeight();
    var i = this.getScrollableScrollTop() / n;
    var a = i + (0, o.getHeight)(t) / n;
    e.top = {
      hours: Math.floor(i * this.option("hoursInterval")) + this.option("startDayHour"),
      minutes: i % 2 ? 30 : 0
    };
    e.bottom = {
      hours: Math.floor(a * this.option("hoursInterval")) + this.option("startDayHour"),
      minutes: Math.floor(a) % 2 ? 30 : 0
    };
    return e;
  };
  k.updateScrollPosition = function (e, t, n = false) {
    var i = this.timeZoneCalculator.createDate(e, {
      path: "toGrid"
    });
    var o = n && this.isAllDayPanelVisible;
    if (this.needUpdateScrollPosition(i, t, o)) {
      this.scrollTo(i, t, o, false);
    }
  };
  k.needUpdateScrollPosition = function (e, t, n) {
    var i = this;
    var o = this._getCellsInViewport(n);
    var a = this._isGroupsSpecified(t) ? this._getGroupIndexByResourceId(t) : 0;
    var r = e.getTime();
    var s = l.default.trimTime(e).getTime();
    return o.reduce(function (e, t) {
      var o = i.getCellData(t);
      var l = o.startDate;
      var u = o.endDate;
      var d = o.groupIndex;
      var c = l.getTime();
      var h = u.getTime();
      return ((!!n || !(c <= r) || !(r < h)) && (!n || s !== c) || a !== d) && e;
    }, true);
  };
  k._getCellsInViewport = function (e) {
    var t = this.getScrollable().$element();
    var n = this.getCellHeight();
    var i = this.getCellWidth();
    var r = this._getTotalCellCount(this._getGroupCount());
    var s = this.getScrollableScrollTop();
    var l = this.getScrollableScrollLeft();
    var u = s / n - this.virtualScrollingDispatcher.topVirtualRowsCount;
    var d = Math.floor(u);
    if (s % n != 0) {
      d += 1;
    }
    var c = l / i;
    var h = Math.floor(c);
    if (l % i != 0) {
      h += 1;
    }
    var f = Math.floor(u + (0, o.getHeight)(t) / n);
    var p = Math.floor(c + (0, o.getWidth)(t) / i);
    var g = this._getAllCells(e);
    var m = [];
    g.each(function (e) {
      var t = (0, a.default)(this);
      var n = e % r;
      var i = e / r;
      if (h <= n && n < p && d <= i && i < f) {
        m.push(t);
      }
    });
    return m;
  };
  k.scrollToTime = function (e, t, n) {
    if (this._isValidScrollDate(n)) {
      var i = this._getScrollCoordinates(e, t, n);
      var o = this.getScrollable();
      o.scrollBy({
        top: i.top - o.scrollTop(),
        left: 0
      });
    }
  };
  k.scrollTo = function (e, t, n = false) {
    var i = !(arguments.length > 3) || arguments[3] === undefined || arguments[3];
    if (this._isValidScrollDate(e, i)) {
      var a = this._getGroupCount() && t ? this._getGroupIndexByResourceId(t) : 0;
      var r = n && this.isAllDayPanelVisible;
      var s = this._getScrollCoordinates(e.getHours(), e.getMinutes(), e, a, r);
      var l = this.getScrollable();
      var u = l.$element();
      var d = this.getCellWidth();
      var c = this.option("rtlEnabled") ? d : 0;
      var h = (0, o.getHeight)(u);
      var f = (0, o.getWidth)(u);
      var p = this.getCellHeight();
      var g = (f - d) / 2;
      var m = (h - p) / 2;
      var _ = s.left - l.scrollLeft() - g - c;
      var v = s.top - l.scrollTop() - m;
      if (r && !this._isVerticalGroupedWorkSpace()) {
        v = 0;
      }
      if (this.option("templatesRenderAsynchronously")) {
        setTimeout(function () {
          l.scrollBy({
            left: _,
            top: v
          });
        });
      } else {
        l.scrollBy({
          left: _,
          top: v
        });
      }
    }
  };
  k._isValidScrollDate = function (e) {
    var t = !(arguments.length > 1) || arguments[1] === undefined || arguments[1];
    var n = this.getStartViewDate();
    var i = this.getEndViewDate();
    return !(e < n) && !(e > i) || (t && v.default.log("W1008", e), false);
  };
  k.needApplyCollectorOffset = function () {
    return false;
  };
  k.removeDroppableCellClass = function (e) {
    var t = e || this._getDroppableCell();
    if (t != null) {
      t.removeClass("dx-scheduler-date-table-droppable-cell");
    }
  };
  k._getCoordinatesByCell = function (e) {
    var t = e.index() - this.virtualScrollingDispatcher.leftVirtualCellsCount;
    var n = e.parent().index();
    var i = this._hasAllDayClass(e);
    var o = this._isVerticalGroupedWorkSpace();
    if (!i || !!o) {
      n -= this.virtualScrollingDispatcher.topVirtualRowsCount;
    }
    return {
      rowIndex: n,
      columnIndex: t
    };
  };
  k._isShowAllDayPanel = function () {
    return this.option("showAllDayPanel");
  };
  k._getTimePanelCells = function () {
    return this.$element().find(`.dx-scheduler-time-panel-cell`);
  };
  k._getRDateTableProps = function () {
    return {
      viewData: this.viewDataProvider.viewData,
      dataCellTemplate: this.option("dataCellTemplate"),
      addDateTableClass: !this.option("crossScrollingEnabled") || this.isVirtualScrolling(),
      groupOrientation: this.option("groupOrientation"),
      addVerticalSizesClassToRows: false
    };
  };
  k._updateSelectedCellDataOption = function (e) {
    var t = e.map(function (e) {
      return {
        startDate: e.startDate,
        endDate: e.endDate,
        allDay: e.allDay,
        groupIndex: e.groupIndex,
        groups: e.groups
      };
    });
    this.option("selectedCellData", t);
    this._selectionChangedAction({
      selectedCellData: t
    });
  };
  k._getCellByData = function (e) {
    var t = e.startDate;
    var n = e.groupIndex;
    var i = e.allDay;
    var o = e.index;
    var a = this.viewDataProvider.findCellPositionInMap({
      startDate: t,
      groupIndex: n,
      isAllDay: i,
      index: o
    });
    if (a) {
      if (i && !this._isVerticalGroupedWorkSpace()) {
        return this._dom_getAllDayPanelCell(a.columnIndex);
      } else {
        return this._dom_getDateCell(a);
      }
    }
  };
  k.getDOMElementsMetaData = function () {
    var e = this;
    return this.cache.get("cellElementsMeta", function () {
      return {
        dateTableCellsMeta: e._getDateTableDOMElementsInfo(),
        allDayPanelCellsMeta: e._getAllDayPanelDOMElementsInfo()
      };
    });
  };
  k._getDateTableDOMElementsInfo = function () {
    var e = this;
    var t = this._getAllCells(false);
    if (!t.length || !(0, u.hasWindow)()) {
      return [[{}]];
    }
    var n = this._getDateTable();
    var i = (0, h.getBoundingRect)(n.get(0));
    var o = this.viewDataProvider.getColumnsCount();
    var a = [];
    t.each(function (t, n) {
      var r = Math.floor(t / o);
      if (a.length === r) {
        a.push([]);
      }
      e._addCellMetaData(a[r], n, i);
    });
    return a;
  };
  k._getAllDayPanelDOMElementsInfo = function () {
    var e = this;
    var t = [];
    if (this.isAllDayPanelVisible && !this._isVerticalGroupedWorkSpace() && (0, u.hasWindow)()) {
      var n = this._getAllCells(true);
      if (!n.length) {
        return [{}];
      }
      var i = this._$allDayPanel;
      var o = (0, h.getBoundingRect)(i.get(0));
      n.each(function (n, i) {
        e._addCellMetaData(t, i, o);
      });
    }
    return t;
  };
  k._addCellMetaData = function (e, t, n) {
    var i = (0, h.getBoundingRect)(t);
    e.push({
      left: i.left - n.left,
      top: i.top - n.top,
      width: i.width,
      height: i.height
    });
  };
  k._oldRender_getAllDayCellData = function (e) {
    var t = this;
    return function (n, i, o) {
      var a = o % t._getCellCount();
      var r = t._getDateGenerationOptions(true);
      var s = t.viewDataProvider.viewDataGenerator.getDateByCellIndices(r, i, a, t._getCellCountInDay());
      s = l.default.trimTime(s);
      var u = e || 0;
      if (t.isGroupedByDate()) {
        u = Math.floor(o % t._getGroupCount());
      } else if (t._isHorizontalGroupedWorkSpace()) {
        u = Math.floor(o / t._getCellCount());
      }
      var d = {
        startDate: s,
        endDate: s,
        allDay: true,
        groupIndex: u
      };
      var c = (0, G.getCellGroups)(u, t.option("groups"));
      if (c.length) {
        d.groups = (0, G.getGroupsObjectFromGroupsArray)(c);
      }
      return {
        key: "dxCellData",
        value: d
      };
    };
  };
  k.renderRWorkSpace = function (e) {
    var t = e ?? {
      header: true,
      timePanel: true,
      dateTable: true,
      allDayPanel: true
    };
    if (t.header) {
      this.renderRHeaderPanel();
    }
    if (t.timePanel) {
      this.renderRTimeTable();
    }
    if (t.dateTable) {
      this.renderRDateTable();
    }
    if (t.allDayPanel) {
      this.renderRAllDayPanel();
    }
  };
  k.renderRDateTable = function () {
    $.utils.renovation.renderComponent(this, this._$dateTable, R.default, "renovatedDateTable", this._getRDateTableProps());
  };
  k.renderRGroupPanel = function () {
    var e = {
      groups: this.option("groups"),
      groupOrientation: this.option("groupOrientation"),
      groupByDate: this.isGroupedByDate(),
      resourceCellTemplate: this.option("resourceCellTemplate"),
      className: this.verticalGroupTableClass,
      groupPanelData: this.viewDataProvider.getGroupPanelData(this.generateRenderOptions())
    };
    if (this.option("groups").length) {
      this._attachGroupCountClass();
      $.utils.renovation.renderComponent(this, this._getGroupHeaderContainer(), F.default, "renovatedGroupPanel", e);
    } else {
      this._detachGroupCountClass();
    }
  };
  k.renderRAllDayPanel = function () {
    if (this.isAllDayPanelVisible && !this.isGroupedAllDayPanel()) {
      var e;
      this._toggleAllDayVisibility(false);
      var t = Q({
        viewData: this.viewDataProvider.viewData,
        dataCellTemplate: this.option("dataCellTemplate"),
        startCellIndex: 0
      }, ((e = this.virtualScrollingDispatcher.horizontalVirtualScrolling) === null || e === undefined ? undefined : e.getRenderState()) || {});
      $.utils.renovation.renderComponent(this, this._$allDayTable, B.default, "renovatedAllDayPanel", t);
      $.utils.renovation.renderComponent(this, this._$allDayTitle, L.default, "renovatedAllDayPanelTitle", {});
    }
    this._toggleAllDayVisibility(true);
  };
  k.renderRTimeTable = function () {
    $.utils.renovation.renderComponent(this, this._$timePanel, V.default, "renovatedTimePanel", {
      timePanelData: this.viewDataProvider.timePanelData,
      timeCellTemplate: this.option("timeCellTemplate"),
      groupOrientation: this.option("groupOrientation")
    });
  };
  k.renderRHeaderPanel = function () {
    var e = !(arguments.length > 0) || arguments[0] === undefined || arguments[0];
    if (this.option("groups").length) {
      this._attachGroupCountClass();
    } else {
      this._detachGroupCountClass();
    }
    $.utils.renovation.renderComponent(this, this._$thead, this.renovatedHeaderPanelComponent, "renovatedHeaderPanel", {
      dateHeaderData: this.viewDataProvider.dateHeaderData,
      groupPanelData: this.viewDataProvider.getGroupPanelData(this.generateRenderOptions()),
      dateCellTemplate: this.option("dateCellTemplate"),
      timeCellTemplate: this.option("timeCellTemplate"),
      groups: this.option("groups"),
      groupByDate: this.isGroupedByDate(),
      groupOrientation: this.option("groupOrientation"),
      resourceCellTemplate: this.option("resourceCellTemplate"),
      isRenderDateHeader: e
    });
  };
  k.initDragBehavior = function (e) {
    if (!this.dragBehavior && e) {
      this.dragBehavior = new I.default(e);
      var t = (0, a.default)(e.element());
      this._createDragBehavior(this.getWorkArea(), t);
      this._createDragBehavior(this.getAllDayContainer(), t);
    }
  };
  k._createDragBehavior = function (e, t) {
    var n = {
      getItemData: function (e, t) {
        return t._getItemData(e);
      },
      getItemSettings: function (e) {
        return e.data(T.APPOINTMENT_SETTINGS_KEY);
      }
    };
    this._createDragBehaviorBase(e, t, n);
  };
  k._createDragBehaviorBase = function (e, t, n) {
    var i = this;
    var o = this.$element().find(`.${E.FIXED_CONTAINER_CLASS}`);
    this.dragBehavior.addTo(e, _e(o, t, this.isDefaultDraggingMode, this.dragBehavior, function () {
      if (!i.isDefaultDraggingMode) {
        i.preventDefaultDragging = false;
      }
    }, function () {
      if (!i.isDefaultDraggingMode) {
        i.preventDefaultDragging = true;
      }
    }, function () {
      return i._getDroppableCell();
    }, function () {
      return i._getDateTables();
    }, function () {
      return i.removeDroppableCellClass();
    }, function () {
      return i.getCellWidth();
    }, n));
  };
  k._isRenderHeaderPanelEmptyCell = function () {
    return this._isVerticalGroupedWorkSpace();
  };
  k._dispose = function () {
    e.prototype._dispose.call(this);
    this.virtualScrollingDispatcher.dispose();
  };
  k._getDefaultOptions = function () {
    return (0, c.extend)(e.prototype._getDefaultOptions.call(this), {
      currentDate: new Date(),
      intervalCount: 1,
      startDate: null,
      firstDayOfWeek: undefined,
      startDayHour: 0,
      endDayHour: 24,
      hoursInterval: 0.5,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      groups: [],
      showAllDayPanel: true,
      allDayExpanded: false,
      onCellClick: null,
      crossScrollingEnabled: false,
      dataCellTemplate: null,
      timeCellTemplate: null,
      resourceCellTemplate: null,
      dateCellTemplate: null,
      allowMultipleCellSelection: true,
      indicatorTime: new Date(),
      indicatorUpdateInterval: ie("minute") * 5,
      shadeUntilCurrentTime: true,
      groupOrientation: "horizontal",
      selectedCellData: [],
      groupByDate: false,
      scrolling: {
        mode: "standard"
      },
      allDayPanelMode: "all",
      renovateRender: true,
      height: undefined,
      draggingMode: "outlook",
      onScrollEnd: function () {},
      getHeaderHeight: undefined,
      onRenderAppointments: function () {},
      onShowAllDayPanel: function () {},
      onSelectedCellsClick: function () {},
      timeZoneCalculator: undefined,
      schedulerHeight: undefined,
      schedulerWidth: undefined
    });
  };
  k._optionChanged = function (t) {
    switch (t.name) {
      case "startDayHour":
        (0, W.validateDayHours)(t.value, this.option("endDayHour"));
        this._cleanWorkSpace();
        break;
      case "endDayHour":
        (0, W.validateDayHours)(this.option("startDayHour"), t.value);
        this._cleanWorkSpace();
        break;
      case "dateCellTemplate":
      case "resourceCellTemplate":
      case "dataCellTemplate":
      case "timeCellTemplate":
      case "hoursInterval":
      case "firstDayOfWeek":
      case "currentDate":
      case "startDate":
        this._cleanWorkSpace();
        break;
      case "groups":
        this._cleanView();
        this._removeAllDayElements();
        this._initGrouping();
        this.repaint();
        break;
      case "groupOrientation":
        this._initGroupedStrategy();
        this._createAllDayPanelElements();
        this._removeAllDayElements();
        this._cleanWorkSpace();
        this._toggleGroupByDateClass();
        break;
      case "showAllDayPanel":
        if (this._isVerticalGroupedWorkSpace()) {
          this._cleanView();
          this._removeAllDayElements();
          this._initGrouping();
          this.repaint();
        } else if (this.isRenovatedRender()) {
          this.renderWorkSpace();
        } else {
          this._toggleAllDayVisibility(true);
        }
        break;
      case "allDayExpanded":
        this._changeAllDayVisibility();
        this._attachTablesEvents();
        this._updateScrollable();
        break;
      case "onSelectionChanged":
        this._createSelectionChangedAction();
        break;
      case "onCellClick":
        this._createCellClickAction();
        break;
      case "onCellContextMenu":
        this._attachContextMenuEvent();
        break;
      case "intervalCount":
        this._cleanWorkSpace();
        this._toggleWorkSpaceCountClass();
        break;
      case "groupByDate":
        this._cleanWorkSpace();
        this._toggleGroupByDateClass();
        break;
      case "crossScrollingEnabled":
        this._toggleHorizontalScrollClass();
        this._dateTableScrollable.option(this._dateTableScrollableConfig());
        break;
      case "allDayPanelMode":
        this.updateShowAllDayPanel();
        this.updateAppointments();
        break;
      case "width":
        e.prototype._optionChanged.call(this, t);
        this._dimensionChanged();
        break;
      case "timeZoneCalculator":
      case "allowMultipleCellSelection":
      case "selectedCellData":
        break;
      case "renovateRender":
      case "scrolling":
        this.repaint();
        break;
      case "schedulerHeight":
      case "schedulerWidth":
        this.virtualScrollingDispatcher.updateDimensions(true);
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  k.updateShowAllDayPanel = function () {
    var e = this.option("allDayPanelMode") === "hidden";
    this.option("onShowAllDayPanel")(!e);
  };
  k._getVirtualScrollingDispatcherOptions = function () {
    var e = this;
    return {
      getCellHeight: this.getCellHeight.bind(this),
      getCellWidth: this.getCellWidth.bind(this),
      getCellMinWidth: this.getCellMinWidth.bind(this),
      isRTL: this._isRTL.bind(this),
      getSchedulerHeight: function () {
        return e.option("schedulerHeight");
      },
      getSchedulerWidth: function () {
        return e.option("schedulerWidth");
      },
      getViewHeight: function () {
        if (e.$element().height) {
          return e.$element().height();
        } else {
          return (0, o.getHeight)(e.$element());
        }
      },
      getViewWidth: function () {
        if (e.$element().width) {
          return e.$element().width();
        } else {
          return (0, o.getWidth)(e.$element());
        }
      },
      getWindowHeight: function () {
        return (0, u.getWindow)().innerHeight;
      },
      getWindowWidth: function () {
        return (0, u.getWindow)().innerWidth;
      },
      getScrolling: function () {
        return e.option("scrolling");
      },
      getScrollableOuterWidth: this.getScrollableOuterWidth.bind(this),
      getScrollable: this.getScrollable.bind(this),
      createAction: this._createAction.bind(this),
      updateRender: this.updateRender.bind(this),
      updateGrid: this.updateGrid.bind(this),
      getGroupCount: this._getGroupCount.bind(this),
      isVerticalGrouping: this._isVerticalGroupedWorkSpace.bind(this),
      getTotalRowCount: this._getTotalRowCount.bind(this),
      getTotalCellCount: this._getTotalCellCount.bind(this)
    };
  };
  k._cleanWorkSpace = function () {
    this._cleanView();
    this._toggleGroupedClass();
    this._toggleWorkSpaceWithOddCells();
    this.virtualScrollingDispatcher.updateDimensions(true);
    this._renderView();
    if (this.option("crossScrollingEnabled")) {
      this._setTableSizes();
    }
    this.cache.clear();
  };
  k._init = function () {
    this._scrollSync = {};
    this._viewDataProvider = null;
    this._cellsSelectionState = null;
    this._activeStateUnit = ge;
    e.prototype._init.call(this);
    this._initGrouping();
    this._toggleHorizontalScrollClass();
    this._toggleWorkSpaceCountClass();
    this._toggleGroupByDateClass();
    this._toggleWorkSpaceWithOddCells();
    this.$element().addClass("dx-scheduler-work-space").addClass(this._getElementClass());
  };
  k._initPositionHelper = function () {
    this.positionHelper = new q.PositionHelper({
      key: this.option("key"),
      viewDataProvider: this.viewDataProvider,
      viewStartDayHour: this.option("startDayHour"),
      viewEndDayHour: this.option("endDayHour"),
      cellDuration: this.getCellDuration(),
      groupedStrategy: this._groupedStrategy,
      isGroupedByDate: this.isGroupedByDate(),
      rtlEnabled: this.option("rtlEnabled"),
      startViewDate: this.getStartViewDate(),
      isVerticalGrouping: this._isVerticalGroupedWorkSpace(),
      groupCount: this._getGroupCount(),
      isVirtualScrolling: this.isVirtualScrolling(),
      getDOMMetaDataCallback: this.getDOMElementsMetaData.bind(this)
    });
  };
  k._initGrouping = function () {
    this._initGroupedStrategy();
    this._toggleGroupingDirectionClass();
    this._toggleGroupByDateClass();
  };
  k.isVerticalOrientation = function () {
    return (this.option("groups").length ? this.option("groupOrientation") : this._getDefaultGroupStrategy()) === "vertical";
  };
  k._initGroupedStrategy = function () {
    var e = this.isVerticalOrientation() ? S.default : C.default;
    this._groupedStrategy = new e(this);
  };
  k._getDefaultGroupStrategy = function () {
    return "horizontal";
  };
  k._toggleHorizontalScrollClass = function () {
    this.$element().toggleClass("dx-scheduler-work-space-both-scrollbar", this.option("crossScrollingEnabled"));
  };
  k._toggleGroupByDateClass = function () {
    this.$element().toggleClass("dx-scheduler-work-space-group-by-date", this.isGroupedByDate());
  };
  k._toggleWorkSpaceCountClass = function () {
    this.$element().toggleClass("dx-scheduler-work-space-count", this._isWorkSpaceWithCount());
  };
  k._toggleWorkSpaceWithOddCells = function () {
    this.$element().toggleClass("dx-scheduler-work-space-odd-cells", this._isWorkspaceWithOddCells());
  };
  k._toggleGroupingDirectionClass = function () {
    this.$element().toggleClass("dx-scheduler-work-space-vertical-grouped", this._isVerticalGroupedWorkSpace());
  };
  k._getDateTableCellClass = function (e, t) {
    return this._groupedStrategy.addAdditionalGroupCellClasses("dx-scheduler-date-table-cell dx-scheduler-cell-sizes-horizontal dx-scheduler-cell-sizes-vertical", t + 1, e, t);
  };
  k._getGroupHeaderClass = function (e) {
    return this._groupedStrategy.addAdditionalGroupCellClasses("dx-scheduler-group-header", e + 1);
  };
  k._initWorkSpaceUnits = function () {
    this._$headerPanelContainer = (0, a.default)("<div>").addClass("dx-scheduler-header-panel-container");
    this._$headerTablesContainer = (0, a.default)("<div>").addClass("dx-scheduler-header-tables-container");
    this._$headerPanel = (0, a.default)("<table>");
    this._$thead = (0, a.default)("<thead>").appendTo(this._$headerPanel);
    this._$headerPanelEmptyCell = (0, a.default)("<div>").addClass("dx-scheduler-header-panel-empty-cell");
    this._$allDayTable = (0, a.default)("<table>");
    this._$fixedContainer = (0, a.default)("<div>").addClass(E.FIXED_CONTAINER_CLASS);
    this._$allDayContainer = (0, a.default)("<div>").addClass("dx-scheduler-all-day-appointments");
    this._$dateTableScrollableContent = (0, a.default)("<div>").addClass("dx-scheduler-date-table-scrollable-content");
    this._$sidebarScrollableContent = (0, a.default)("<div>").addClass("dx-scheduler-side-bar-scrollable-content");
    this._initAllDayPanelElements();
    if (this.isRenovatedRender()) {
      this.createRAllDayPanelElements();
    } else {
      this._createAllDayPanelElements();
    }
    this._$timePanel = (0, a.default)("<table>").addClass(E.TIME_PANEL_CLASS);
    this._$dateTable = (0, a.default)("<table>");
    this._$dateTableContainer = (0, a.default)("<div>").addClass("dx-scheduler-date-table-container");
    this._$groupTable = (0, a.default)("<div>").addClass("dx-scheduler-work-space-vertical-group-table");
  };
  k._initAllDayPanelElements = function () {
    this._allDayTitles = [];
    this._allDayTables = [];
    this._allDayPanels = [];
  };
  k._initDateTableScrollable = function () {
    var e = this;
    var t = (0, a.default)("<div>").addClass("dx-scheduler-date-table-scrollable");
    this._dateTableScrollable = this._createComponent(t, w.default, this._dateTableScrollableConfig());
    this._scrollSync.dateTable = (0, K.getMemoizeScrollTo)(function () {
      return e._dateTableScrollable;
    });
  };
  k._createWorkSpaceElements = function () {
    if (this.option("crossScrollingEnabled")) {
      this._createWorkSpaceScrollableElements();
    } else {
      this._createWorkSpaceStaticElements();
    }
  };
  k._createWorkSpaceStaticElements = function () {
    var e;
    this._$dateTableContainer.append(this._$dateTable);
    if (this._isVerticalGroupedWorkSpace()) {
      this._$dateTableContainer.append(this._$allDayContainer);
      this._$dateTableScrollableContent.append(this._$groupTable, this._$timePanel, this._$dateTableContainer);
      this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
      this._$headerTablesContainer.append(this._$headerPanel);
    } else {
      this._$dateTableScrollableContent.append(this._$timePanel, this._$dateTableContainer);
      this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
      this._$headerTablesContainer.append(this._$headerPanel, this._$allDayPanel);
      if ((e = this._$allDayPanel) !== null && e !== undefined) {
        e.append(this._$allDayContainer, this._$allDayTable);
      }
    }
    this._appendHeaderPanelEmptyCellIfNecessary();
    this._$headerPanelContainer.append(this._$headerTablesContainer);
    this.$element().append(this._$fixedContainer, this._$headerPanelContainer, this._dateTableScrollable.$element());
  };
  k._createWorkSpaceScrollableElements = function () {
    var e;
    this.$element().append(this._$fixedContainer);
    this._$flexContainer = (0, a.default)("<div>").addClass("dx-scheduler-work-space-flex-container");
    this._createHeaderScrollable();
    this._headerScrollable.$content().append(this._$headerPanel);
    this._appendHeaderPanelEmptyCellIfNecessary();
    this._$headerPanelContainer.append(this._$headerTablesContainer);
    this.$element().append(this._$headerPanelContainer);
    this.$element().append(this._$flexContainer);
    this._createSidebarScrollable();
    this._$flexContainer.append(this._dateTableScrollable.$element());
    this._$dateTableContainer.append(this._$dateTable);
    this._$dateTableScrollableContent.append(this._$dateTableContainer);
    this._dateTableScrollable.$content().append(this._$dateTableScrollableContent);
    if (this._isVerticalGroupedWorkSpace()) {
      this._$dateTableContainer.append(this._$allDayContainer);
      this._$sidebarScrollableContent.append(this._$groupTable, this._$timePanel);
    } else {
      this._headerScrollable.$content().append(this._$allDayPanel);
      if ((e = this._$allDayPanel) !== null && e !== undefined) {
        e.append(this._$allDayContainer, this._$allDayTable);
      }
      this._$sidebarScrollableContent.append(this._$timePanel);
    }
    this._sidebarScrollable.$content().append(this._$sidebarScrollableContent);
  };
  k._appendHeaderPanelEmptyCellIfNecessary = function () {
    if (this._isRenderHeaderPanelEmptyCell()) {
      this._$headerPanelContainer.append(this._$headerPanelEmptyCell);
    }
  };
  k._createHeaderScrollable = function () {
    var e = this;
    var t = (0, a.default)("<div>").addClass("dx-scheduler-header-scrollable").appendTo(this._$headerTablesContainer);
    this._headerScrollable = this._createComponent(t, w.default, this._headerScrollableConfig());
    this._scrollSync.header = (0, K.getMemoizeScrollTo)(function () {
      return e._headerScrollable;
    });
  };
  k._createSidebarScrollable = function () {
    var e = this;
    var t = (0, a.default)("<div>").addClass("dx-scheduler-sidebar-scrollable").appendTo(this._$flexContainer);
    this._sidebarScrollable = this._createComponent(t, w.default, {
      useKeyboard: false,
      showScrollbar: "never",
      direction: "vertical",
      useNative: false,
      updateManually: true,
      bounceEnabled: false,
      onScroll: function (t) {
        e._scrollSync.dateTable({
          top: t.scrollOffset.top
        });
      }
    });
    this._scrollSync.sidebar = (0, K.getMemoizeScrollTo)(function () {
      return e._sidebarScrollable;
    });
  };
  k._attachTableClasses = function () {
    this._addTableClass(this._$dateTable, E.DATE_TABLE_CLASS);
    if (this._isVerticalGroupedWorkSpace()) {
      for (var e = this._getGroupCount(), t = 0; t < e; t++) {
        this._addTableClass(this._allDayTables[t], "dx-scheduler-all-day-table");
      }
    } else if (!this.isRenovatedRender()) {
      this._addTableClass(this._$allDayTable, "dx-scheduler-all-day-table");
    }
  };
  k._attachHeaderTableClasses = function () {
    this._addTableClass(this._$headerPanel, "dx-scheduler-header-panel");
  };
  k._addTableClass = function (e, t) {
    if (e && !e.hasClass(t)) {
      e.addClass(t);
    }
  };
  k._initMarkup = function () {
    this.cache.clear();
    this._initWorkSpaceUnits();
    this._initVirtualScrolling();
    this._initDateTableScrollable();
    this._createWorkSpaceElements();
    e.prototype._initMarkup.call(this);
    if (!this.option("crossScrollingEnabled")) {
      this._attachTableClasses();
      this._attachHeaderTableClasses();
    }
    this._toggleGroupedClass();
    this._renderView();
    this._attachEvents();
  };
  k._render = function () {
    e.prototype._render.call(this);
    this._renderDateTimeIndication();
    this._setIndicationUpdateInterval();
  };
  k._toggleGroupedClass = function () {
    this.$element().toggleClass("dx-scheduler-work-space-grouped", this._getGroupCount() > 0);
  };
  k._renderView = function () {
    if (this.isRenovatedRender()) {
      if (this._isVerticalGroupedWorkSpace()) {
        this.renderRGroupPanel();
      }
    } else {
      this._applyCellTemplates(this._renderGroupHeader());
    }
    this.renderWorkSpace();
    if (this.isRenovatedRender()) {
      this.virtualScrollingDispatcher.updateDimensions();
    }
    this._updateGroupTableHeight();
    this.updateHeaderEmptyCellWidth();
    this._shader = new D.default(this);
  };
  k.updateCellsSelection = function () {
    var e = this.generateRenderOptions();
    this.viewDataProvider.updateViewData(e);
    this.renderRWorkSpace({
      timePanel: true,
      dateTable: true,
      allDayPanel: true
    });
  };
  k._renderDateTimeIndication = function () {
    return (0, p.noop)();
  };
  k._setIndicationUpdateInterval = function () {
    return (0, p.noop)();
  };
  k._refreshDateTimeIndication = function () {
    return (0, p.noop)();
  };
  k._detachGroupCountClass = function () {
    var e = this;
    Y(E.VERTICAL_GROUP_COUNT_CLASSES).forEach(function (t) {
      e.$element().removeClass(t);
    });
  };
  k._attachGroupCountClass = function () {
    var e = this._groupedStrategy.getGroupCountClass(this.option("groups"));
    this.$element().addClass(e);
  };
  k._getDateHeaderTemplate = function () {
    return this.option("dateCellTemplate");
  };
  k._toggleAllDayVisibility = function (e) {
    var t = this._isShowAllDayPanel();
    this.$element().toggleClass("dx-scheduler-work-space-all-day", t);
    this._changeAllDayVisibility();
    if (e) {
      this._updateScrollable();
    }
  };
  k._changeAllDayVisibility = function () {
    this.cache.clear();
    this.$element().toggleClass("dx-scheduler-work-space-all-day-collapsed", !this.option("allDayExpanded") && this._isShowAllDayPanel());
  };
  k._getDateTables = function () {
    return this._$dateTable.add(this._$allDayTable);
  };
  k._getDateTable = function () {
    return this._$dateTable;
  };
  k._removeAllDayElements = function () {
    if (this._$allDayTable) {
      this._$allDayTable.remove();
    }
    if (this._$allDayTitle) {
      this._$allDayTitle.remove();
    }
  };
  k._cleanView = function () {
    var e;
    var t;
    var n;
    if (!(this.cache.clear(), this._cleanTableWidths(), this.cellsSelectionState.clearSelectedAndFocusedCells(), this.isRenovatedRender())) {
      this._$thead.empty();
      this._$dateTable.empty();
      this._$timePanel.empty();
      this._$groupTable.empty();
      if ((t = this._$allDayTable) !== null && t !== undefined) {
        t.empty();
      }
      if ((n = this._$sidebarTable) !== null && n !== undefined) {
        n.empty();
      }
    }
    if ((e = this._shader) !== null && e !== undefined) {
      e.clean();
    }
    delete this._interval;
  };
  k._clean = function () {
    s.default.off(r.default.getDocument(), de);
    this._disposeRenovatedComponents();
    e.prototype._clean.call(this);
  };
  k._cleanTableWidths = function () {
    this._$headerPanel.css("width", "");
    this._$dateTable.css("width", "");
    if (this._$allDayTable) {
      this._$allDayTable.css("width", "");
    }
  };
  k._disposeRenovatedComponents = function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    if ((e = this.renovatedAllDayPanel) !== null && e !== undefined) {
      e.dispose();
    }
    this.renovatedAllDayPanel = undefined;
    if ((t = this.renovatedDateTable) !== null && t !== undefined) {
      t.dispose();
    }
    this.renovatedDateTable = undefined;
    if ((n = this.renovatedTimePanel) !== null && n !== undefined) {
      n.dispose();
    }
    this.renovatedTimePanel = undefined;
    if ((i = this.renovatedGroupPanel) !== null && i !== undefined) {
      i.dispose();
    }
    this.renovatedGroupPanel = undefined;
    if ((o = this.renovatedHeaderPanel) !== null && o !== undefined) {
      o.dispose();
    }
    this.renovatedHeaderPanel = undefined;
  };
  k.getGroupedStrategy = function () {
    return this._groupedStrategy;
  };
  k.getFixedContainer = function () {
    return this._$fixedContainer;
  };
  k.getAllDayContainer = function () {
    return this._$allDayContainer;
  };
  k.updateRender = function () {
    this.renderer.updateRender();
  };
  k.updateGrid = function () {
    this.renderer._renderGrid();
  };
  k.updateAppointments = function () {
    var e;
    this.option("onRenderAppointments")();
    if ((e = this.dragBehavior) !== null && e !== undefined) {
      e.updateDragSource();
    }
  };
  k._createAllDayPanelElements = function () {
    var e = this._getGroupCount();
    if (this._isVerticalGroupedWorkSpace() && e !== 0) {
      for (var t = 0; t < e; t++) {
        var n = (0, a.default)("<div>").addClass("dx-scheduler-all-day-title").text(f.default.format("dxScheduler-allDay"));
        this._allDayTitles.push(n);
        this._$allDayTable = (0, a.default)("<table>");
        this._allDayTables.push(this._$allDayTable);
        this._$allDayPanel = (0, a.default)("<div>").addClass("dx-scheduler-all-day-panel").append(this._$allDayTable);
        this._allDayPanels.push(this._$allDayPanel);
      }
    } else {
      this._$allDayTitle = (0, a.default)("<div>").addClass("dx-scheduler-all-day-title").text(f.default.format("dxScheduler-allDay")).appendTo(this.$element());
      this._$allDayTable = (0, a.default)("<table>");
      this._$allDayPanel = (0, a.default)("<div>").addClass("dx-scheduler-all-day-panel").append(this._$allDayTable);
    }
  };
  k.renderWorkSpace = function () {
    var e = !(arguments.length > 0) || arguments[0] === undefined || arguments[0];
    this.cache.clear();
    this.viewDataProvider.update(this.generateRenderOptions(), e);
    if (this.isRenovatedRender()) {
      this.renderRWorkSpace();
    } else {
      this._renderDateHeader();
      this._renderTimePanel();
      this._renderGroupAllDayPanel();
      this._renderDateTable();
      this._renderAllDayPanel();
    }
    this._initPositionHelper();
  };
  k._renderGroupHeader = function () {
    var e = this._getGroupHeaderContainer();
    var t = [];
    if (this._getGroupCount()) {
      var n = this._makeGroupRows(this.option("groups"), this.option("groupByDate"));
      this._attachGroupCountClass();
      e.append(n.elements);
      t = n.cellTemplates;
    } else {
      this._detachGroupCountClass();
    }
    return t;
  };
  k._applyCellTemplates = function (e) {
    if (e != null) {
      e.forEach(function (e) {
        e();
      });
    }
  };
  k._makeGroupRows = function (e, t) {
    var n = this._isVerticalGroupedWorkSpace() ? te.VERTICAL : te.HORIZONTAL;
    return te.makeGroupedTable(n, e, {
      groupHeaderRowClass: E.GROUP_ROW_CLASS,
      groupRowClass: E.GROUP_ROW_CLASS,
      groupHeaderClass: this._getGroupHeaderClass.bind(this),
      groupHeaderContentClass: E.GROUP_HEADER_CONTENT_CLASS
    }, this._getCellCount() || 1, this.option("resourceCellTemplate"), this._getGroupCount(), t);
  };
  k._renderDateHeader = function () {
    var e = this._getDateHeaderContainer();
    var t = (0, a.default)("<tr>").addClass("dx-scheduler-header-row");
    var n = this._getCellCount();
    var i = this._getDateHeaderTemplate();
    var o = this._getCalculateHeaderCellRepeatCount();
    var r = [];
    var s = this.isGroupedByDate();
    if (s) {
      var l = s ? this._getGroupCount() : 1;
      for (var u = 0; u < n; u++) {
        var d = u * o;
        this._renderDateHeaderTemplate(t, u, d, i, r).attr("colSpan", l);
      }
      e.prepend(t);
    } else {
      for (var c = 0; c < o; c++) {
        for (var h = 0; h < n; h++) {
          var f = c * n + h;
          this._renderDateHeaderTemplate(t, h, f, i, r);
        }
      }
      e.append(t);
    }
    this._applyCellTemplates(r);
    return t;
  };
  k._renderDateHeaderTemplate = function (e, t, n, i, o) {
    var r = this.isGroupedByDate() ? Math.floor(n / this._getGroupCount()) : n;
    var s = this.viewDataProvider.completeDateHeaderMap;
    var l = s[s.length - 1][r];
    var u = l.text;
    var c = l.startDate;
    var h = (0, a.default)("<th>").addClass(this._getHeaderPanelCellClass(t)).attr("title", u);
    if (i != null && i.render) {
      o.push(i.render.bind(i, {
        model: Q({
          text: u,
          date: c
        }, this._getGroupsForDateHeaderTemplate(n)),
        index: n,
        container: (0, d.getPublicElement)(h)
      }));
    } else {
      h.text(u);
    }
    e.append(h);
    return h;
  };
  k._getGroupsForDateHeaderTemplate = function (e) {
    var t;
    var n;
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate()) {
      t = this._getGroupIndex(0, e * i);
      var o = (0, G.getCellGroups)(t, this.option("groups"));
      n = (0, G.getGroupsObjectFromGroupsArray)(o);
    }
    return {
      groups: n,
      groupIndex: t
    };
  };
  k._getHeaderPanelCellClass = function (e) {
    return this._groupedStrategy.addAdditionalGroupCellClasses("dx-scheduler-header-panel-cell dx-scheduler-cell-sizes-horizontal", e + 1, undefined, undefined, this.isGroupedByDate());
  };
  k._renderAllDayPanel = function (e) {
    var t = this._getCellCount();
    if (!this._isVerticalGroupedWorkSpace()) {
      t *= this._getGroupCount() || 1;
    }
    var n = this._renderTableBody({
      container: this._allDayPanels.length ? (0, d.getPublicElement)(this._allDayTables[e]) : (0, d.getPublicElement)(this._$allDayTable),
      rowCount: 1,
      cellCount: t,
      cellClass: this._getAllDayPanelCellClass.bind(this),
      rowClass: "dx-scheduler-all-day-table-row",
      cellTemplate: this.option("dataCellTemplate"),
      getCellData: this._oldRender_getAllDayCellData(e),
      groupIndex: e
    }, true);
    this._toggleAllDayVisibility(true);
    this._applyCellTemplates(n);
  };
  k._renderGroupAllDayPanel = function () {
    if (this._isVerticalGroupedWorkSpace()) {
      for (var e = this._getGroupCount(), t = 0; t < e; t++) {
        this._renderAllDayPanel(t);
      }
    }
  };
  k._getAllDayPanelCellClass = function (e, t) {
    return this._groupedStrategy.addAdditionalGroupCellClasses("dx-scheduler-all-day-table-cell dx-scheduler-cell-sizes-horizontal", t + 1);
  };
  k._renderTimePanel = function () {
    var e = this;
    var t = this._groupedStrategy.calculateTimeCellRepeatCount();
    function n(t, n) {
      var i = 0;
      if (e.isAllDayPanelVisible) {
        i = 1;
      }
      if (e.isGroupedAllDayPanel()) {
        i = Math.ceil((t + 1) / e._getRowCount());
      }
      var o = t + i;
      return e.viewDataProvider.completeTimePanelMap[o][n];
    }
    this._renderTableBody({
      container: (0, d.getPublicElement)(this._$timePanel),
      rowCount: this._getTimePanelRowCount() * t,
      cellCount: 1,
      cellClass: this._getTimeCellClass.bind(this),
      rowClass: "dx-scheduler-time-panel-row",
      cellTemplate: this.option("timeCellTemplate"),
      getCellText: function (e) {
        return n(e, "text");
      },
      getCellDate: function (e) {
        return n(e, "startDate");
      },
      groupCount: this._getGroupCount(),
      allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayTitles : undefined,
      getTemplateData: function (t) {
        if (!e._isVerticalGroupedWorkSpace()) {
          return {};
        }
        var n = e._getGroupIndex(t, 0);
        var i = (0, G.getCellGroups)(n, e.option("groups"));
        return {
          groupIndex: n,
          groups: (0, G.getGroupsObjectFromGroupsArray)(i)
        };
      }.bind(this)
    });
  };
  k._getTimeCellClass = function (e) {
    var t = "dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical";
    if (this._isVerticalGroupedWorkSpace()) {
      return this._groupedStrategy.addAdditionalGroupCellClasses(t, e, e);
    } else {
      return t;
    }
  };
  k._renderDateTable = function () {
    var e = this;
    var t = this._getGroupCount();
    this._renderTableBody({
      container: (0, d.getPublicElement)(this._$dateTable),
      rowCount: this._getTotalRowCount(t),
      cellCount: this._getTotalCellCount(t),
      cellClass: this._getDateTableCellClass.bind(this),
      rowClass: E.DATE_TABLE_ROW_CLASS,
      cellTemplate: this.option("dataCellTemplate"),
      getCellData: function (t, n, i) {
        var o = n;
        if (e.isGroupedAllDayPanel()) {
          var a = e._getRowCount();
          o += Math.ceil(n / a);
        }
        var r = e.viewDataProvider.viewDataMap.dateTableMap[o][i].cellData;
        return {
          value: e._filterCellDataFields(r),
          fullValue: r,
          key: "dxCellData"
        };
      },
      allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayPanels : undefined,
      groupCount: t,
      groupByDate: this.option("groupByDate")
    });
  };
  k._insertAllDayRowsIntoDateTable = function () {
    return this._groupedStrategy.insertAllDayRowsIntoDateTable();
  };
  k._renderTableBody = function (e, t) {
    var n = [];
    if (t) {
      n = te.makeTable(e);
    } else {
      this._applyCellTemplates(te.makeTable(e));
    }
    return n;
  };
  _ = i;
  if (y = [{
    key: "viewDataProvider",
    get: function () {
      this._viewDataProvider ||= new M.default(this.type);
      return this._viewDataProvider;
    }
  }, {
    key: "cache",
    get: function () {
      this._cache ||= new z.Cache();
      return this._cache;
    }
  }, {
    key: "cellsSelectionState",
    get: function () {
      var e = this;
      if (!this._cellsSelectionState) {
        this._cellsSelectionState = new N.default(this.viewDataProvider);
        var t = this.option("selectedCellData");
        if ((t == null ? undefined : t.length) > 0) {
          var n = t.map(function (t) {
            var n = t.groups;
            if (n && e._getGroupCount() !== 0) {
              return Q({}, t, {
                groupIndex: e._getGroupIndexByResourceId(n)
              });
            } else {
              return Q({}, t, {
                groupIndex: 0
              });
            }
          });
          this._cellsSelectionState.setSelectedCellsByData(n);
        }
      }
      return this._cellsSelectionState;
    }
  }, {
    key: "cellsSelectionController",
    get: function () {
      this._cellsSelectionController ||= new j.CellsSelectionController();
      return this._cellsSelectionController;
    }
  }, {
    key: "isAllDayPanelVisible",
    get: function () {
      return this._isShowAllDayPanel() && this.supportAllDayRow();
    }
  }, {
    key: "verticalGroupTableClass",
    get: function () {
      return "dx-scheduler-work-space-vertical-group-table";
    }
  }, {
    key: "viewDirection",
    get: function () {
      return "vertical";
    }
  }, {
    key: "renovatedHeaderPanelComponent",
    get: function () {
      return H.default;
    }
  }, {
    key: "timeZoneCalculator",
    get: function () {
      return this.option("timeZoneCalculator");
    }
  }, {
    key: "isDefaultDraggingMode",
    get: function () {
      return this.option("draggingMode") === "default";
    }
  }]) {
    J(_.prototype, y);
  }
  if (x) {
    J(_, x);
  }
  Object.defineProperty(_, "prototype", {
    writable: false
  });
  return i;
}(O.default);
function _e(e, t, n, i, s, l, u, d, c, f, p) {
  var g = {
    dragElement: undefined,
    itemData: undefined
  };
  function m() {
    var e = g.itemData;
    return !e || (0, U.compileGetter)("disabled")(e);
  }
  return {
    container: e,
    dragTemplate: function () {
      return g.dragElement;
    },
    onDragStart: function (e) {
      if (!n) {
        l();
      }
      var t = e.cancel;
      var o = e.event;
      var r = (0, a.default)(e.itemElement);
      var s = e.component._appointments;
      g.itemData = p.getItemData(e.itemElement, s);
      var u = p.getItemSettings(r, e);
      var d = p.initialPosition;
      if (!m()) {
        o.data = o.data || {};
        if (!t) {
          if (!u.isCompact) {
            i.updateDragSource(g.itemData, u);
          }
          g.dragElement = function (e, t, n) {
            var i = n.option("items").length;
            t.isCompact = false;
            t.virtual = false;
            return n._renderItem(i, {
              itemData: e,
              settings: [t]
            })[0];
          }(g.itemData, u, s);
          o.data.itemElement = g.dragElement;
          o.data.initialPosition = d ?? (0, A.locate)((0, a.default)(g.dragElement));
          o.data.itemData = g.itemData;
          o.data.itemSettings = u;
          i.onDragStart(o.data);
          (0, A.resetPosition)((0, a.default)(g.dragElement));
        }
      }
    },
    onDragMove: function () {
      if (!n) {
        var e;
        var i;
        var s;
        var l;
        var p;
        var m;
        var _;
        e = (0, o.getWidth)(g.dragElement);
        i = e > f();
        s = e <= 10;
        l = (0, a.default)(g.dragElement).parent();
        p = (0, h.getBoundingRect)(l.get(0));
        m = p.left;
        _ = p.top;
        var v = i ? r.default.elementsFromPoint(m + 10, _ + 10) : s ? r.default.elementsFromPoint(m, _) : r.default.elementsFromPoint(m + e / 2, _ + 10);
        var y = !!v.find(function (e) {
          return e === t.get(0);
        });
        var b = d();
        var x = v.find(function (e) {
          var t = e.classList;
          return b.find(e).length === 1 && (t.contains(ae) || t.contains(oe));
        });
        if (x) {
          if (!u().is(x)) {
            c();
          }
          (0, a.default)(x).addClass("dx-scheduler-date-table-droppable-cell");
        } else if (!y) {
          c();
        }
      }
    },
    onDragEnd: function (e) {
      var t;
      if (!n) {
        s();
      }
      if (!m()) {
        i.onDragEnd(e);
      }
      if ((t = g.dragElement) !== null && t !== undefined) {
        t.remove();
      }
      c();
    },
    cursorOffset: p.isSetCursorOffset ? function () {
      var e = (0, a.default)(g.dragElement);
      return {
        x: (0, o.getWidth)(e) / 2,
        y: (0, o.getHeight)(e) / 2
      };
    } : undefined,
    filter: p.filter
  };
}
var ve = me;
exports.default = ve;
module.exports = exports.default;
module.exports.default = exports.default;