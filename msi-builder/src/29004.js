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
var o = require("./20576.js");
var a = g(require("./99393.js"));
var r = g(require("./22955.js"));
var s = g(require("./91198.js"));
var l = require("./37518.js");
var u = require("./9259.js");
var d = require("./58201.js");
var c = g(require("./48136.js"));
var h = require("./19097.js");
var f = require("./45985.js");
var p = require("./27728.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function m() {
  return (m = Object.assign ? Object.assign.bind() : function (e) {
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
function _(e, t) {
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
function v(e, t) {
  return (v = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var y = s.default.dateToMilliseconds;
var b = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  v(t, n);
  var a;
  var r;
  var g;
  var b = i.prototype;
  b._getElementClass = function () {
    return "dx-scheduler-work-space-month";
  };
  b._getFormat = function () {
    return f.formatWeekday;
  };
  b._getIntervalBetween = function (e) {
    var t = this.getStartViewDate();
    var n = s.default.getTimezonesDifference(t, e);
    return e.getTime() - (t.getTime() - this.option("startDayHour") * 3600000) - n;
  };
  b._getDateGenerationOptions = function () {
    return m({}, e.prototype._getDateGenerationOptions.call(this), {
      cellCountInDay: 1
    });
  };
  b.getCellWidth = function () {
    var e = this;
    return this.cache.get("cellWidth", function () {
      var t = 0;
      var n = e._getCells().slice(0, 7);
      n.each(function (e, n) {
        t += (0, d.hasWindow)() ? (0, l.getBoundingRect)(n).width : 0;
      });
      if (n.length === 0) {
        return undefined;
      } else {
        return t / 7;
      }
    });
  };
  b._insertAllDayRowsIntoDateTable = function () {
    return false;
  };
  b._getCellCoordinatesByIndex = function (e) {
    var t = Math.floor(e / this._getCellCount());
    return {
      rowIndex: t,
      columnIndex: e - this._getCellCount() * t
    };
  };
  b._needCreateCrossScrolling = function () {
    return this.option("crossScrollingEnabled") || this._isVerticalGroupedWorkSpace();
  };
  b._getViewStartByOptions = function () {
    return (0, h.getViewStartByOptions)(this.option("startDate"), this.option("currentDate"), this.option("intervalCount"), s.default.getFirstMonthDate(this.option("startDate")));
  };
  b._updateIndex = function (e) {
    return e;
  };
  b.isIndicationAvailable = function () {
    return false;
  };
  b.getIntervalDuration = function () {
    return y("day");
  };
  b.getTimePanelWidth = function () {
    return 0;
  };
  b.supportAllDayRow = function () {
    return false;
  };
  b.keepOriginalHours = function () {
    return true;
  };
  b.getWorkSpaceLeftOffset = function () {
    return 0;
  };
  b.needApplyCollectorOffset = function () {
    return true;
  };
  b._getHeaderDate = function () {
    return this._getViewStartByOptions();
  };
  b.scrollToTime = function () {
    return (0, o.noop)();
  };
  b.renderRAllDayPanel = function () {};
  b.renderRTimeTable = function () {};
  b.renderRDateTable = function () {
    u.utils.renovation.renderComponent(this, this._$dateTable, c.default, "renovatedDateTable", this._getRDateTableProps());
  };
  b._createWorkSpaceElements = function () {
    if (this._isVerticalGroupedWorkSpace()) {
      this._createWorkSpaceScrollableElements();
    } else {
      e.prototype._createWorkSpaceElements.call(this);
    }
  };
  b._toggleAllDayVisibility = function () {
    return (0, o.noop)();
  };
  b._changeAllDayVisibility = function () {
    return (0, o.noop)();
  };
  b._renderTimePanel = function () {
    return (0, o.noop)();
  };
  b._renderAllDayPanel = function () {
    return (0, o.noop)();
  };
  b._setMonthClassesToCell = function (e, t) {
    e.toggleClass("dx-scheduler-date-table-current-date", t.isCurrentDate).toggleClass("dx-scheduler-date-table-first-of-month", t.firstDayOfMonth).toggleClass("dx-scheduler-date-table-other-month", t.otherMonth);
  };
  b._createAllDayPanelElements = function () {};
  b._renderTableBody = function (t) {
    var n = this;
    t.getCellText = function (e, t) {
      var i = n.viewDataProvider.completeViewDataMap[e][t].startDate;
      return (0, h.getCellText)(i, n.option("intervalCount"));
    };
    t.getCellTextClass = "dx-scheduler-date-table-cell-text";
    t.setAdditionalClasses = this._setMonthClassesToCell.bind(this);
    e.prototype._renderTableBody.call(this, t);
  };
  a = i;
  if (r = [{
    key: "type",
    get: function () {
      return p.VIEWS.MONTH;
    }
  }]) {
    _(a.prototype, r);
  }
  if (g) {
    _(a, g);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(r.default);
(0, a.default)("dxSchedulerWorkSpaceMonth", b);
var x = b;
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;