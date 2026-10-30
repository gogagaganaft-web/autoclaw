exports.default = undefined;
var i = f(require("./97250.js"));
var o = f(require("./20912.js"));
var a = require("./13306.js");
var r = f(require("./91198.js"));
var s = require("./35922.js");
var l = require("./75811.js");
var u = require("./4236.js");
var d = f(require("./32511.js"));
var c = require("./5480.js");
var h = require("./96801.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function p(e) {
  return (p = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function g() {
  return (g = Object.assign ? Object.assign.bind() : function (e) {
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
function m(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (p(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (p(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), p(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var _ = r.default.dateToMilliseconds;
var v = function () {
  function e(e) {
    this.options = e;
    this._initPositioningStrategy();
  }
  var t;
  var n;
  var f;
  var p = e.prototype;
  p._correctCollectorCoordinatesInAdaptive = function (e, t) {
    e.top = e.top + this.getCollectorTopOffset(t);
    e.left = e.left + this.getCollectorLeftOffset();
  };
  p._initPositioningStrategy = function () {
    this._positioningStrategy = this.isAdaptive ? new o.default(this) : new i.default(this);
  };
  p.getPositioningStrategy = function () {
    return this._positioningStrategy;
  };
  p.getAppointmentMinSize = function () {
    return 2;
  };
  p.keepAppointmentSettings = function () {
    return false;
  };
  p.getDeltaTime = function () {};
  p.getAppointmentGeometry = function (e) {
    return e;
  };
  p.needCorrectAppointmentDates = function () {
    return true;
  };
  p.getDirection = function () {
    return "horizontal";
  };
  p.createTaskPositionMap = function (e) {
    var t = this;
    delete this._maxAppointmentCountPerCell;
    var n = e == null ? undefined : e.length;
    if (n) {
      var i = [];
      for (var o = 0; o < n; o++) {
        var a = this._getItemPosition(e[o]);
        if (a.length && this.rtlEnabled) {
          a = this._correctRtlCoordinates(a);
        }
        a.forEach(function (e) {
          e.leftVirtualCellCount = t.leftVirtualCellCount;
          e.topVirtualCellCount = t.topVirtualCellCount;
          e.leftVirtualWidth = t.leftVirtualCellCount * t.cellWidth;
          e.topVirtualHeight = t.topVirtualCellCount * t.cellHeight;
        });
        i.push(a);
      }
      var r = this._getSortedPositions(i);
      var s = this._getResultPositions(r);
      return this._getExtendedPositionMap(i, s);
    }
  };
  p._getDeltaWidth = function (e, t) {
    var n = this.resizableStep || this.getAppointmentMinSize();
    var i = t.width;
    return Math.round((e.width - i) / n);
  };
  p._correctRtlCoordinates = function (e) {
    var t = e[0].width || this._getAppointmentMaxWidth();
    e.forEach(function (e) {
      if (!e.appointmentReduced) {
        e.left -= t;
      }
    });
    return e;
  };
  p._getAppointmentMaxWidth = function () {
    return this.cellWidth;
  };
  p._getItemPosition = function (e) {
    for (var t = this.generateAppointmentSettings(e), n = this.isAllDay(e), i = [], o = 0; o < t.length; o++) {
      var r = this.calculateAppointmentHeight(e, t[o]);
      var s = this.calculateAppointmentWidth(e, t[o]);
      var l = s;
      var u = null;
      var d = [];
      var c = t[o].rowIndex;
      var h = t[o].columnIndex;
      if (this._needVerifyItemSize() || n) {
        var f = t[o].hMax;
        if (this.isAppointmentGreaterThan(f, {
          left: t[o].left,
          width: s
        })) {
          u = "head";
          c = t[o].rowIndex;
          h = t[o].columnIndex;
          l = this._reduceMultiWeekAppointment(s, {
            left: t[o].left,
            right: f
          });
          d = this._getAppointmentParts({
            sourceAppointmentWidth: s,
            reducedWidth: l,
            height: r
          }, t[o]);
          if (this.rtlEnabled) {
            t[o].left = f;
          }
        }
      }
      (0, a.extend)(t[o], {
        height: r,
        width: l,
        allDay: n,
        rowIndex: c,
        columnIndex: h,
        appointmentReduced: u
      });
      i = this._getAppointmentPartsPosition(d, t[o], i);
    }
    return i;
  };
  p._getAppointmentPartsPosition = function (e, t, n) {
    if (e.length) {
      e.unshift(t);
      n = n.concat(e);
    } else {
      n.push(t);
    }
    return n;
  };
  p.getAppointmentSettingsGenerator = function (e) {
    return new u.AppointmentSettingsGenerator(g({
      rawAppointment: e,
      appointmentTakesAllDay: this.isAppointmentTakesAllDay(e),
      getPositionShiftCallback: this.getPositionShift.bind(this)
    }, this.options));
  };
  p.generateAppointmentSettings = function (e) {
    return this.getAppointmentSettingsGenerator(e).create();
  };
  p.isAppointmentTakesAllDay = function (e) {
    var t = (0, c.createAppointmentAdapter)(e, this.dataAccessors, this.timeZoneCalculator);
    return (0, h.getAppointmentTakesAllDay)(t, this.viewStartDayHour, this.viewEndDayHour, this.allDayPanelMode);
  };
  p._getAppointmentParts = function () {
    return [];
  };
  p._getCompactAppointmentParts = function (e) {
    var t = this.cellWidth || this.getAppointmentMinSize();
    return Math.round(e / t);
  };
  p._reduceMultiWeekAppointment = function (e, t) {
    if (this.rtlEnabled) {
      return Math.floor(t.left - t.right);
    } else {
      return t.right - Math.floor(t.left);
    }
  };
  p.calculateAppointmentHeight = function () {
    return 0;
  };
  p.calculateAppointmentWidth = function () {
    return 0;
  };
  p.isAppointmentGreaterThan = function (e, t) {
    var n = t.left + t.width - e;
    if (this.rtlEnabled) {
      n = e + t.width - t.left;
    }
    return n > this.cellWidth / 2;
  };
  p.isAllDay = function () {
    return false;
  };
  p.cropAppointmentWidth = function (e, t) {
    if (this.isGroupedByDate) {
      return t;
    } else {
      return e;
    }
  };
  p._getSortedPositions = function (e) {
    var t = this;
    var n = [];
    var i = function (e) {
      return Math.round(e * 100) / 100;
    };
    var o = function (e, t, n, o, a, r, s, l) {
      return {
        i: e,
        j: t,
        top: i(n),
        left: i(o),
        bottom: i(a),
        right: i(r),
        cellPosition: s,
        allDay: l
      };
    };
    for (var a = 0, r = e.length; a < r; a++) {
      for (var s = 0, l = e[a].length; s < l; s++) {
        var u = e[a][s];
        var d = u.top;
        var c = u.left;
        var h = u.height;
        var f = u.width;
        var p = u.cellPosition;
        var g = u.allDay;
        n.push(o(a, s, d, c, d + h, c + f, p, g));
      }
    }
    return n.sort(function (e, n) {
      return t._sortCondition(e, n);
    });
  };
  p._sortCondition = function () {};
  p._getConditions = function (e, t) {
    var n = this._isSomeEdge(e, t);
    return {
      columnCondition: n || this._normalizeCondition(e.left, t.left),
      rowCondition: n || this._normalizeCondition(e.top, t.top),
      cellPositionCondition: n || this._normalizeCondition(e.cellPosition, t.cellPosition)
    };
  };
  p._rowCondition = function (e, t) {
    var n = this._getConditions(e, t);
    return n.columnCondition || n.rowCondition;
  };
  p._columnCondition = function (e, t) {
    var n = this._getConditions(e, t);
    return n.rowCondition || n.columnCondition;
  };
  p._isSomeEdge = function (e, t) {
    return e.i === t.i && e.j === t.j;
  };
  p._normalizeCondition = function (e, t) {
    var n = e - t;
    if (Math.abs(n) > 1) {
      return n;
    } else {
      return 0;
    }
  };
  p._isItemsCross = function (e, t) {
    var n = !!e.allDay == !!t.allDay;
    var i = e.allDay && t.allDay;
    if (n) {
      var o = this._getOrientation(i);
      return this._checkItemsCrossing(e, t, o);
    }
    return false;
  };
  p._checkItemsCrossing = function (e, t, n) {
    var i = Math.floor(e[n[0]]);
    var o = Math.floor(e[n[1]]);
    var a = Math.ceil(t[n[0]]);
    var r = Math.ceil(t[n[1]]);
    return Math.abs(e[n[2]] - t[n[2]]) <= 1 && (i <= a && o > a || i < r && o >= r || i === a && o === r);
  };
  p._getOrientation = function (e) {
    if (e) {
      return ["left", "right", "top"];
    } else {
      return ["top", "bottom", "left"];
    }
  };
  p._getResultPositions = function (e) {
    var t;
    var n;
    var i;
    var o;
    var a = this;
    var r = [];
    var s = 0;
    var l = 0;
    var u = {};
    var d = function e(t, n) {
      if (t.some(function (e) {
        return e === n;
      })) {
        return e(t, ++n);
      } else {
        return n;
      }
    };
    function c(e, t) {
      var n = t || 0;
      return {
        index: n,
        i: e.i,
        j: e.j,
        left: e.left,
        right: e.right,
        top: e.top,
        bottom: e.bottom,
        allDay: e.allDay,
        sortedIndex: a._skipSortedIndex(n) ? null : s++
      };
    }
    function h(e) {
      u.items = [c(e)];
      u.left = e.left;
      u.right = e.right;
      u.top = e.top;
      u.bottom = e.bottom;
      u.allDay = e.allDay;
    }
    function f(e) {
      e.forEach(function (e) {
        r.push({
          index: e.index,
          count: l + 1,
          i: e.i,
          j: e.j,
          sortedIndex: e.sortedIndex
        });
      });
    }
    for (t = 0; t < e.length; t++) {
      n = e[t];
      i = [];
      if (u.items) {
        if (this._isItemsCross(u, n)) {
          u.items.forEach(function (e, t) {
            if (a._isItemsCross(e, n)) {
              i.push(e.index);
            }
          });
          o = i.length ? d(i, 0) : 0;
          u.items.push(c(n, o));
          l = Math.max(o, l);
          u.left = Math.min(u.left, n.left);
          u.right = Math.max(u.right, n.right);
          u.top = Math.min(u.top, n.top);
          u.bottom = Math.max(u.bottom, n.bottom);
          u.allDay = n.allDay;
        } else {
          f(u.items);
          u = {};
          h(n);
          l = 0;
        }
      } else {
        h(n);
      }
    }
    if (u.items) {
      f(u.items);
    }
    return r.sort(function (e, t) {
      var n = e.j - t.j;
      var i = e.i - t.i;
      return i || n;
    });
  };
  p._skipSortedIndex = function (e) {
    return e > this._getMaxAppointmentCountPerCell() - 1;
  };
  p._findIndexByKey = function (e, t, n, i, o) {
    var a = 0;
    for (var r = 0, s = e.length; r < s; r++) {
      if (e[r][t] === i && e[r][n] === o) {
        a = r;
        break;
      }
    }
    return a;
  };
  p._getExtendedPositionMap = function (e, t) {
    var n = 0;
    var i = [];
    for (var o = 0, a = e.length; o < a; o++) {
      var r = [];
      for (var s = 0, l = e[o].length; s < l; s++) {
        e[o][s].index = t[n].index;
        e[o][s].sortedIndex = t[n].sortedIndex;
        e[o][s].count = t[n++].count;
        r.push(e[o][s]);
        this._checkLongCompactAppointment(e[o][s], r);
      }
      i.push(r);
    }
    return i;
  };
  p._checkLongCompactAppointment = function (e, t) {
    this._splitLongCompactAppointment(e, t);
    return t;
  };
  p._splitLongCompactAppointment = function (e, t) {
    var n = this._getMaxAppointmentCountPerCellByType(e.allDay);
    var i = 0;
    if (n !== undefined && e.index > n - 1) {
      e.isCompact = true;
      i = this._getCompactAppointmentParts(e.width);
      for (var o = 1; o < i; o++) {
        var r = (0, a.extend)(true, {}, e);
        r.left = this._getCompactLeftCoordinate(e.left, o);
        r.columnIndex = r.columnIndex + o;
        r.sortedIndex = null;
        t.push(r);
      }
    }
    return t;
  };
  p._adjustDurationByDaylightDiff = function (e, t, n) {
    var i = d.default.getDaylightOffset(t, n);
    if (this._needAdjustDuration(i)) {
      return this._calculateDurationByDaylightDiff(e, i);
    } else {
      return e;
    }
  };
  p._needAdjustDuration = function (e) {
    return e !== 0;
  };
  p._calculateDurationByDaylightDiff = function (e, t) {
    return e + t * _("minute");
  };
  p._getCollectorLeftOffset = function (e) {
    if (e || !this.isApplyCompactAppointmentOffset()) {
      return 0;
    }
    var t = this.getDropDownAppointmentWidth(this.intervalCount, e);
    var n = this._isCompactTheme() ? 1 : 5;
    return this.cellWidth - t - n;
  };
  p._markAppointmentAsVirtual = function (e, t = false) {
    var n = this._getMaxAppointmentCountPerCellByType(t);
    if (e.count - n > 0) {
      var i = e.top;
      var o = e.left;
      var a = this.isAdaptive || !t && this.supportCompactDropDownAppointments();
      e.virtual = {
        left: o + this._getCollectorLeftOffset(t),
        top: i,
        width: this.getDropDownAppointmentWidth(this.intervalCount, t),
        height: this.getDropDownAppointmentHeight(),
        index: this._generateAppointmentCollectorIndex(e, t),
        isAllDay: t,
        groupIndex: e.groupIndex,
        isCompact: a
      };
    }
  };
  p.isApplyCompactAppointmentOffset = function () {
    return this.supportCompactDropDownAppointments();
  };
  p.supportCompactDropDownAppointments = function () {
    return true;
  };
  p._generateAppointmentCollectorIndex = function (e, t) {
    var n = e.groupIndex;
    var i = e.rowIndex;
    var o = e.columnIndex;
    return `${n}-${i}-${o}-${t}`;
  };
  p._getMaxAppointmentCountPerCellByType = function (e) {
    var t = this._getMaxAppointmentCountPerCell();
    if ((0, s.isObject)(t)) {
      if (e) {
        return t.allDay;
      } else {
        return t.simple;
      }
    } else {
      return t;
    }
  };
  p.getDropDownAppointmentWidth = function (e, t) {
    return this.getPositioningStrategy().getDropDownAppointmentWidth(e, t);
  };
  p.getDropDownAppointmentHeight = function () {
    return this.getPositioningStrategy().getDropDownAppointmentHeight();
  };
  p.getDropDownButtonAdaptiveSize = function () {
    return 28;
  };
  p.getCollectorTopOffset = function (e) {
    return this.getPositioningStrategy().getCollectorTopOffset(e);
  };
  p.getCollectorLeftOffset = function () {
    return this.getPositioningStrategy().getCollectorLeftOffset();
  };
  p.getAppointmentDataCalculator = function () {};
  p.getVerticalAppointmentHeight = function (e, t, n) {
    var i = n;
    if ((0, s.isNumeric)(this.maxAppointmentsPerCell)) {
      var o = this._getDynamicAppointmentCountPerCell();
      var a = o.allDay || o;
      var r = Math.max(t, a);
      i = Math.min(r, n);
    }
    return e / i;
  };
  p._customizeCoordinates = function (e, t, n, i, o) {
    var a = e.index;
    var r = e.count;
    var s = this.getVerticalAppointmentHeight(t, r, n);
    var l = e.top + a * s + i;
    var u = e.width;
    var d = e.left;
    if (e.isCompact) {
      if (this.isAdaptive) {
        this._correctCollectorCoordinatesInAdaptive(e, o);
      }
      this._markAppointmentAsVirtual(e, o);
    }
    return {
      height: s,
      width: u,
      top: l,
      left: d,
      empty: this._isAppointmentEmpty(t, u)
    };
  };
  p._isAppointmentEmpty = function (e, t) {
    return e < this._getAppointmentMinHeight() || t < this._getAppointmentMinWidth();
  };
  p._calculateGeometryConfig = function (e) {
    var t = this.maxAppointmentsPerCell;
    var n = this._getOffsets();
    var i = this._getAppointmentDefaultOffset();
    var o = this._getAppointmentCount(t, e);
    var a = this._getDefaultRatio(e, o);
    var r = this._getMaxHeight();
    if (!(0, s.isNumeric)(o)) {
      o = e.count;
      a = (r - n.unlimited) / r;
    }
    var l = (1 - a) * r;
    if (t === "auto" || (0, s.isNumeric)(t)) {
      a = 1;
      r -= i;
      l = i;
    }
    return {
      height: a * r,
      appointmentCountPerCell: o,
      offset: l
    };
  };
  p._getAppointmentCount = function () {};
  p._getDefaultRatio = function () {};
  p._getOffsets = function () {};
  p._getMaxHeight = function () {};
  p._needVerifyItemSize = function () {
    return false;
  };
  p._getMaxAppointmentCountPerCell = function () {
    if (!this._maxAppointmentCountPerCell) {
      var e;
      var t = this.maxAppointmentsPerCell;
      if ((0, s.isNumeric)(t)) {
        e = t;
      }
      if (t === "auto") {
        e = this._getDynamicAppointmentCountPerCell();
      }
      if (t === "unlimited") {
        e = undefined;
      }
      this._maxAppointmentCountPerCell = e;
    }
    return this._maxAppointmentCountPerCell;
  };
  p._getDynamicAppointmentCountPerCell = function () {
    return this.getPositioningStrategy().getDynamicAppointmentCountPerCell();
  };
  p.allDaySupported = function () {
    return false;
  };
  p._isCompactTheme = function () {
    return ((0, l.current)() || "").split(".").pop() === "compact";
  };
  p._getAppointmentDefaultOffset = function () {
    return this.getPositioningStrategy().getAppointmentDefaultOffset();
  };
  p._getAppointmentDefaultHeight = function () {
    return this._getAppointmentHeightByTheme();
  };
  p._getAppointmentMinHeight = function () {
    return this._getAppointmentDefaultHeight();
  };
  p._getAppointmentHeightByTheme = function () {
    if (this._isCompactTheme()) {
      return 18;
    } else {
      return 20;
    }
  };
  p._getAppointmentDefaultWidth = function () {
    return this.getPositioningStrategy()._getAppointmentDefaultWidth();
  };
  p._getAppointmentMinWidth = function () {
    return this._getAppointmentDefaultWidth();
  };
  p._needVerticalGroupBounds = function () {
    return false;
  };
  p._needHorizontalGroupBounds = function () {
    return false;
  };
  p.getAppointmentDurationInMs = function (e, t, n) {
    if (n) {
      var i = t.getTime() - e.getTime();
      return Math.ceil(i / _("day")) * this.visibleDayDuration;
    }
    var o = _("hour");
    var a = r.default.trimTime(e);
    var s = r.default.trimTime(t);
    var l = (s - a) / _("day") + 1;
    var u = this.endDayHour - this.startDayHour;
    var d = u * l;
    var c = (e - a) / o;
    var h = Math.max(0, c - this.startDayHour);
    var f = Math.max(0, (t - s) / o - this.startDayHour);
    return (d - (h + Math.max(0, u - f))) * o;
  };
  p.getPositionShift = function (e, t) {
    return {
      top: e * this.cellHeight,
      left: 0,
      cellPosition: 0
    };
  };
  t = e;
  if (n = [{
    key: "isAdaptive",
    get: function () {
      return this.options.adaptivityEnabled;
    }
  }, {
    key: "rtlEnabled",
    get: function () {
      return this.options.rtlEnabled;
    }
  }, {
    key: "startDayHour",
    get: function () {
      return this.options.startDayHour;
    }
  }, {
    key: "endDayHour",
    get: function () {
      return this.options.endDayHour;
    }
  }, {
    key: "maxAppointmentsPerCell",
    get: function () {
      return this.options.maxAppointmentsPerCell;
    }
  }, {
    key: "cellWidth",
    get: function () {
      return this.options.cellWidth;
    }
  }, {
    key: "cellHeight",
    get: function () {
      return this.options.cellHeight;
    }
  }, {
    key: "allDayHeight",
    get: function () {
      return this.options.allDayHeight;
    }
  }, {
    key: "resizableStep",
    get: function () {
      return this.options.resizableStep;
    }
  }, {
    key: "isGroupedByDate",
    get: function () {
      return this.options.isGroupedByDate;
    }
  }, {
    key: "visibleDayDuration",
    get: function () {
      return this.options.visibleDayDuration;
    }
  }, {
    key: "viewStartDayHour",
    get: function () {
      return this.options.viewStartDayHour;
    }
  }, {
    key: "viewEndDayHour",
    get: function () {
      return this.options.viewEndDayHour;
    }
  }, {
    key: "cellDuration",
    get: function () {
      return this.options.cellDuration;
    }
  }, {
    key: "cellDurationInMinutes",
    get: function () {
      return this.options.cellDurationInMinutes;
    }
  }, {
    key: "leftVirtualCellCount",
    get: function () {
      return this.options.leftVirtualCellCount;
    }
  }, {
    key: "topVirtualCellCount",
    get: function () {
      return this.options.topVirtualCellCount;
    }
  }, {
    key: "positionHelper",
    get: function () {
      return this.options.positionHelper;
    }
  }, {
    key: "showAllDayPanel",
    get: function () {
      return this.options.showAllDayPanel;
    }
  }, {
    key: "isGroupedAllDayPanel",
    get: function () {
      return this.options.isGroupedAllDayPanel;
    }
  }, {
    key: "groupOrientation",
    get: function () {
      return this.options.groupOrientation;
    }
  }, {
    key: "rowCount",
    get: function () {
      return this.options.rowCount;
    }
  }, {
    key: "groupCount",
    get: function () {
      return this.options.groupCount;
    }
  }, {
    key: "currentDate",
    get: function () {
      return this.options.currentDate;
    }
  }, {
    key: "appointmentCountPerCell",
    get: function () {
      return this.options.appointmentCountPerCell;
    }
  }, {
    key: "appointmentOffset",
    get: function () {
      return this.options.appointmentOffset;
    }
  }, {
    key: "allowResizing",
    get: function () {
      return this.options.allowResizing;
    }
  }, {
    key: "allowAllDayResizing",
    get: function () {
      return this.options.allowAllDayResizing;
    }
  }, {
    key: "viewDataProvider",
    get: function () {
      return this.options.viewDataProvider;
    }
  }, {
    key: "dataAccessors",
    get: function () {
      return this.options.dataAccessors;
    }
  }, {
    key: "timeZoneCalculator",
    get: function () {
      return this.options.timeZoneCalculator;
    }
  }, {
    key: "intervalCount",
    get: function () {
      return this.options.intervalCount;
    }
  }, {
    key: "allDayPanelMode",
    get: function () {
      return this.options.allDayPanelMode;
    }
  }, {
    key: "isVirtualScrolling",
    get: function () {
      return this.options.isVirtualScrolling;
    }
  }]) {
    m(t.prototype, n);
  }
  if (f) {
    m(t, f);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.default = v;
module.exports = exports.default;
module.exports.default = exports.default;