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
exports.ViewDataGeneratorMonth = undefined;
var o = require("./45985.js");
var a = require("./18177.js");
var r = d(require("./91198.js"));
var s = require("./19097.js");
var l = require("./28673.js");
var u = d(require("./91500.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function c(e, t) {
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
function h(e, t) {
  return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var f = r.default.dateToMilliseconds("day");
var p = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  h(t, n);
  var a;
  var d;
  var p;
  var g = i.prototype;
  g.getCellData = function (t, n, i, o) {
    var a = e.prototype.getCellData.call(this, t, n, i, false);
    var r = a.startDate;
    var l = i.indicatorTime;
    var u = i.timeZoneCalculator;
    var d = i.intervalCount;
    a.today = this.isCurrentDate(r, l, u);
    a.otherMonth = this.isOtherMonth(r, this._minVisibleDate, this._maxVisibleDate);
    a.firstDayOfMonth = (0, s.isFirstCellInMonthWithIntervalCount)(r, d);
    a.text = (0, s.getCellText)(r, d);
    return a;
  };
  g.isCurrentDate = function (e, t, n) {
    return r.default.sameDate(e, (0, o.getToday)(t, n));
  };
  g.isOtherMonth = function (e, t, n) {
    return !r.default.dateInRange(e, t, n, "date");
  };
  g._calculateCellIndex = function (e, t, n, i) {
    return (0, s.calculateCellIndex)(e, t, n, i);
  };
  g.calculateEndDate = function (e, t, n) {
    return (0, o.setOptionHour)(e, n);
  };
  g.getInterval = function () {
    return f;
  };
  g._calculateStartViewDate = function (e) {
    return (0, s.calculateStartViewDate)(e.currentDate, e.startDayHour, e.startDate, e.intervalCount, this.getFirstDayOfWeek(e.firstDayOfWeek));
  };
  g._setVisibilityDates = function (e) {
    var t = e.intervalCount;
    var n = e.startDate;
    var i = e.currentDate;
    var o = r.default.getFirstMonthDate(n);
    var a = (0, s.getViewStartByOptions)(n, i, t, o);
    this._minVisibleDate = new Date(a.setDate(1));
    var l = new Date(a.setMonth(a.getMonth() + t));
    this._maxVisibleDate = new Date(l.setDate(0));
  };
  g.getCellCount = function () {
    return 7;
  };
  g.getRowCount = function (e) {
    var n = new Date(e.currentDate);
    n.setDate(1);
    var i = new Date(n);
    i.setMonth(i.getMonth() + e.intervalCount);
    i.setDate(0);
    return (0, l.calculateAlignedWeeksBetweenDates)(n, i, e.firstDayOfWeek ?? u.default.firstDayOfWeekIndex());
  };
  g.getCellCountInDay = function () {
    return 1;
  };
  g.setHiddenInterval = function () {
    this.hiddenInterval = 0;
  };
  a = i;
  if (d = [{
    key: "tableAllDay",
    get: function () {}
  }]) {
    c(a.prototype, d);
  }
  if (p) {
    c(a, p);
  }
  Object.defineProperty(a, "prototype", {
    writable: false
  });
  return i;
}(a.ViewDataGenerator);
exports.ViewDataGeneratorMonth = p;