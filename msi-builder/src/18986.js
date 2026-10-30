exports.CellPositionCalculator = undefined;
var i;
var o = require("./35922.js");
var a = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
function s(e) {
  return (s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function l() {
  return (l = Object.assign ? Object.assign.bind() : function (e) {
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
function u(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (s(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (s(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), s(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
function d(e, t, n) {
  if (t) {
    u(e.prototype, t);
  }
  if (n) {
    u(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
var c = function () {
  function e(e) {
    this.options = e;
  }
  var t = e.prototype;
  t.calculateCellPositions = function (e, t, n) {
    var i = this;
    var o = [];
    this.appointments.forEach(function (a, r) {
      i.getCoordinateInfos({
        appointment: a,
        groupIndices: e,
        isAllDayRowAppointment: t,
        isRecurrentAppointment: n
      }).forEach(function (e) {
        if (e) {
          o.push(i._prepareObject(e, r));
        }
      });
    });
    return o;
  };
  t.getCoordinateInfos = function (e) {
    var t = e.appointment;
    var n = e.isAllDayRowAppointment;
    var i = e.groupIndices;
    var o = e.recurrent;
    var a = t.startDate;
    var r = o ? undefined : t.source.groupIndex;
    return this.getCoordinatesByDateInGroup(a, i, n, r);
  };
  t._prepareObject = function (e, t) {
    e.dateSettingIndex = t;
    return {
      coordinates: e,
      dateSettingIndex: t
    };
  };
  t.getCoordinatesByDate = function (e, t, n) {
    var i = t || 0;
    var o = {
      groupIndex: i,
      startDate: e,
      isAllDay: n
    };
    var a = this.viewDataProvider.findCellPositionInMap(o);
    if (a) {
      var r = this.getCellPosition(a, n && !this.isVerticalGrouping);
      var s = n ? 0 : this.getTimeShift(e);
      var l = this.getPositionShift(s, n);
      var u = this.positionHelper.getHorizontalMax(i, e);
      var d = this.positionHelper.getVerticalMax({
        groupIndex: i,
        isVirtualScrolling: this.isVirtualScrolling,
        showAllDayPanel: this.showAllDayPanel,
        supportAllDayRow: this.supportAllDayRow,
        isGroupedAllDayPanel: this.isGroupedAllDayPanel,
        isVerticalGrouping: this.isVerticalGrouping
      });
      return {
        positionByMap: a,
        cellPosition: r.left + l.cellPosition,
        top: r.top + l.top,
        left: r.left + l.left,
        rowIndex: r.rowIndex,
        columnIndex: r.columnIndex,
        hMax: u,
        vMax: d,
        groupIndex: i
      };
    }
  };
  t.getCoordinatesByDateInGroup = function (e, t, n, i) {
    var a = this;
    var r = [];
    if (this.viewDataProvider.isSkippedDate(e)) {
      return r;
    }
    var s = [i];
    if (!(0, o.isDefined)(i)) {
      s = this.groupCount ? t : [0];
    }
    s.forEach(function (t) {
      var i = a.getCoordinatesByDate(e, t, n);
      if (i) {
        r.push(i);
      }
    });
    return r;
  };
  t.getCellPosition = function (e, t) {
    var n = this.DOMMetaData;
    var i = n.dateTableCellsMeta;
    var o = n.allDayPanelCellsMeta;
    var a = e.columnIndex;
    var r = e.rowIndex;
    var s = t ? o[a] : i[r][a];
    var u = l({}, s);
    if (this.rtlEnabled) {
      u.left += s.width;
    }
    if (u) {
      u.rowIndex = e.rowIndex;
      u.columnIndex = e.columnIndex;
    }
    return u;
  };
  t.getTimeShift = function (e) {
    var t = new Date(e);
    var n = new Date(new Date(e).setHours(this.viewEndDayHour, 0, 0));
    if (e.getTime() <= n.getTime()) {
      t.setHours(this.viewStartDayHour, 0, 0, 0);
    }
    var i = a.default.getTimezonesDifference(e, t);
    var o = e.getTime();
    var r = t.getTime();
    if (o > this.startViewDate.getTime()) {
      return (o - r + i) % this.cellDuration / this.cellDuration;
    } else {
      return 0;
    }
  };
  d(e, [{
    key: "DOMMetaData",
    get: function () {
      return this.options.DOMMetaData;
    }
  }, {
    key: "appointments",
    get: function () {
      return this.options.dateSettings;
    }
  }, {
    key: "viewDataProvider",
    get: function () {
      return this.options.viewDataProvider;
    }
  }, {
    key: "positionHelper",
    get: function () {
      return this.options.positionHelper;
    }
  }, {
    key: "startViewDate",
    get: function () {
      return this.options.startViewDate;
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
    key: "getPositionShift",
    get: function () {
      return this.options.getPositionShiftCallback;
    }
  }, {
    key: "groupCount",
    get: function () {
      return this.options.groupCount;
    }
  }, {
    key: "rtlEnabled",
    get: function () {
      return this.options.rtlEnabled;
    }
  }, {
    key: "isVerticalGrouping",
    get: function () {
      return this.options.isVerticalGroupOrientation;
    }
  }, {
    key: "showAllDayPanel",
    get: function () {
      return this.options.showAllDayPanel;
    }
  }, {
    key: "supportAllDayRow",
    get: function () {
      return this.options.supportAllDayRow;
    }
  }, {
    key: "isGroupedAllDayPanel",
    get: function () {
      return this.options.isGroupedAllDayPanel;
    }
  }, {
    key: "isVirtualScrolling",
    get: function () {
      return false;
    }
  }]);
  return e;
}();
var h = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  r(t, n);
  var o = i.prototype;
  o.calculateCellPositions = function (t, n, i) {
    var o = this;
    var a = n ? this.appointments : this.appointments.filter(function (e) {
      var t = e.source;
      var n = e.startDate;
      var i = e.endDate;
      return o.viewDataProvider.isGroupIntersectDateInterval(t.groupIndex, n, i);
    });
    if (i) {
      return this.createRecurrentAppointmentInfos(a, n);
    } else {
      return e.prototype.calculateCellPositions.call(this, t, n, i);
    }
  };
  o.createRecurrentAppointmentInfos = function (e, t) {
    var n = this;
    var i = [];
    e.forEach(function (e, o) {
      var a = e.source;
      var r = e.startDate;
      var s = n.getCoordinatesByDate(r, a.groupIndex, t);
      if (s) {
        i.push(n._prepareObject(s, o));
      }
    });
    return i;
  };
  d(i, [{
    key: "isVirtualScrolling",
    get: function () {
      return true;
    }
  }]);
  return i;
}(c);
var f = function () {
  function e(e) {
    this.options = e;
  }
  e.prototype.calculateCellPositions = function (e, t, n) {
    return (this.options.isVirtualScrolling ? new h(this.options) : new c(this.options)).calculateCellPositions(e, t, n);
  };
  return e;
}();
exports.CellPositionCalculator = f;