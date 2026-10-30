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
var o = s(require("./34794.js"));
var a = require("./69576.js");
var r = s(require("./91198.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
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
  return function (e) {
    if (Array.isArray(e)) {
      return e;
    }
  }(e) || function (e, t) {
    var n = e == null ? null : typeof Symbol != "undefined" && e[Symbol.iterator] || e["@@iterator"];
    if (n != null) {
      var i;
      var o;
      var a;
      var r;
      var s = [];
      var l = true;
      var u = false;
      try {
        a = (n = n.call(e)).next;
        if (t === 0) {
          if (Object(n) !== n) {
            return;
          }
          l = false;
        } else {
          for (; !(l = (i = a.call(n)).done) && (s.push(i.value), s.length !== t); l = true);
        }
      } catch (e) {
        u = true;
        o = e;
      } finally {
        try {
          if (!l && n.return != null && (r = n.return(), Object(r) !== r)) {
            return;
          }
        } finally {
          if (u) {
            throw o;
          }
        }
      }
      return s;
    }
  }(e, t) || function (e, t) {
    if (!e) {
      return;
    }
    if (typeof e == "string") {
      return d(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return d(e, t);
    }
  }(e, t) || function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function d(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
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
var f = r.default.dateToMilliseconds;
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
  var o;
  var r;
  var s;
  var d = i.prototype;
  d._getLeftPosition = function (e) {
    var t = this.getGroupWidth(e.groupIndex);
    return this._calculateMultiWeekAppointmentLeftOffset(e.hMax, t);
  };
  d._getChunkCount = function (e, t, n, i) {
    var o = i.groupIndex;
    var a = i.info.appointment.startDate;
    var r = e - t + n;
    var s = Math.ceil(r / n);
    var l = this._tryGetRowIndexInView(a);
    if (l !== undefined) {
      var u = this.viewDataProvider.getRowCountInGroup(o) - l;
      if (s <= u) {
        return s;
      } else {
        return u;
      }
    }
    return s;
  };
  d._tryGetRowIndexInView = function (e) {
    var n = this.viewDataProvider.getColumnsCount();
    if (!(this.options.dataRange?.length < 1) && n) {
      var i = u(this.options.dateRange, 1)[0];
      var o = f("day");
      var a = e.getTime() - i.getTime();
      return Math.floor(a / o / n);
    }
  };
  d._getChunkWidths = function (e) {
    var t = e.reducedWidth;
    var n = Math.floor(e.sourceAppointmentWidth);
    return [t, n, n - t];
  };
  d._getTailChunkSettings = function (e, t, n) {
    var i = e % t || t;
    var o = n + (t - i);
    return [i, this.rtlEnabled ? o : n];
  };
  d._getAppointmentParts = function (e, t) {
    var n = [];
    var i = Math.round(this.getGroupWidth(t.groupIndex));
    var o = u(this._getChunkWidths(e, t, i), 3);
    var a = o[0];
    var r = o[1];
    var s = o[2];
    var d = this._getLeftPosition(t);
    var c = this.endViewDate > t.info.appointment.endDate;
    for (var h = this._getChunkCount(r, a, i, t), f = u(this._getTailChunkSettings(s, i, d), 2), p = f[0], g = f[1], m = 1; m < h; m++) {
      var _ = t.top + this.cellHeight * m;
      var v = c && m === h - 1;
      n.push(l({}, t, {
        top: _,
        left: v ? g : d,
        height: e.height,
        width: v ? p : i,
        appointmentReduced: v ? "tail" : "body",
        rowIndex: ++t.rowIndex,
        columnIndex: 0
      }));
    }
    return n;
  };
  d._calculateMultiWeekAppointmentLeftOffset = function (e, t) {
    if (this.rtlEnabled) {
      return e;
    } else {
      return e - t;
    }
  };
  d.getGroupWidth = function (e) {
    return (0, a.getGroupWidth)(e, this.viewDataProvider, {
      intervalCount: this.options.intervalCount,
      currentDate: this.options.currentDate,
      viewType: this.options.viewType,
      hoursInterval: this.options.hoursInterval,
      startDayHour: this.options.startDayHour,
      endDayHour: this.options.endDayHour,
      isVirtualScrolling: this.isVirtualScrolling,
      rtlEnabled: this.rtlEnabled,
      DOMMetaData: this.DOMMetaData
    });
  };
  d._getAppointmentDefaultHeight = function () {
    return this._getAppointmentHeightByTheme();
  };
  d._getAppointmentMinHeight = function () {
    return this._getAppointmentDefaultHeight();
  };
  d._columnCondition = function (e, t) {
    var n = this._getConditions(e, t);
    return n.rowCondition || n.columnCondition || n.cellPositionCondition;
  };
  d.createTaskPositionMap = function (t) {
    return e.prototype.createTaskPositionMap.call(this, t, true);
  };
  d._getSortedPositions = function (t) {
    return e.prototype._getSortedPositions.call(this, t, true);
  };
  d._getDefaultRatio = function () {
    return 0.6;
  };
  d._getOffsets = function () {
    return {
      unlimited: 26,
      auto: 30
    };
  };
  d.getDropDownAppointmentWidth = function (e) {
    if (this.adaptivityEnabled) {
      return this.getDropDownButtonAdaptiveSize();
    }
    var t = e > 1 ? 60 : 36;
    return this.cellWidth - t;
  };
  d.needCorrectAppointmentDates = function () {
    return false;
  };
  d._needVerticalGroupBounds = function () {
    return false;
  };
  d._needHorizontalGroupBounds = function () {
    return true;
  };
  d.getPositionShift = function (e) {
    return {
      cellPosition: e * this.cellWidth,
      top: 0,
      left: 0
    };
  };
  o = i;
  if (r = [{
    key: "endViewDate",
    get: function () {
      return this.options.endViewDate;
    }
  }, {
    key: "adaptivityEnabled",
    get: function () {
      return this.options.adaptivityEnabled;
    }
  }, {
    key: "DOMMetaData",
    get: function () {
      return this.options.DOMMetaData;
    }
  }]) {
    c(o.prototype, r);
  }
  if (s) {
    c(o, s);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(o.default);
exports.default = p;
module.exports = exports.default;
module.exports.default = exports.default;