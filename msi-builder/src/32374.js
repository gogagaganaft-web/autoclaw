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
var o = c(require("./99393.js"));
var a = c(require("./10373.js"));
var r = c(require("./91198.js"));
var s = c(require("./32972.js"));
var l = require("./19097.js");
var u = require("./45985.js");
var d = require("./27728.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h() {
  return (h = Object.assign ? Object.assign.bind() : function (e) {
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
function f(e, t) {
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
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var g = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  p(t, n);
  var o;
  var a;
  var c;
  var g = i.prototype;
  g._renderView = function () {
    e.prototype._renderView.call(this);
    this._updateScrollable();
  };
  g._getElementClass = function () {
    return "dx-scheduler-timeline-month";
  };
  g._getDateHeaderTemplate = function () {
    return this.option("dateCellTemplate");
  };
  g._calculateDurationInCells = function (e) {
    return e / this.getCellDuration();
  };
  g.isIndicatorVisible = function () {
    return true;
  };
  g._getFormat = function () {
    return u.formatWeekdayAndDay;
  };
  g._getIntervalBetween = function (e) {
    var t = this.getStartViewDate();
    var n = r.default.getTimezonesDifference(t, e);
    return e.getTime() - (t.getTime() - this.option("startDayHour") * 3600000) - n;
  };
  g._getViewStartByOptions = function () {
    return (0, l.getViewStartByOptions)(this.option("startDate"), this.option("currentDate"), this.option("intervalCount"), r.default.getFirstMonthDate(this.option("startDate")));
  };
  g.generateRenderOptions = function () {
    return h({}, e.prototype.generateRenderOptions.call(this, true), {
      getDateForHeaderText: function (e, t) {
        return t;
      }
    });
  };
  o = i;
  if (a = [{
    key: "type",
    get: function () {
      return d.VIEWS.TIMELINE_MONTH;
    }
  }, {
    key: "viewDirection",
    get: function () {
      return "horizontal";
    }
  }, {
    key: "renovatedHeaderPanelComponent",
    get: function () {
      return s.default;
    }
  }]) {
    f(o.prototype, a);
  }
  if (c) {
    f(o, c);
  }
  Object.defineProperty(o, "prototype", {
    writable: false
  });
  return i;
}(a.default);
(0, o.default)("dxSchedulerTimelineMonth", g);
var m = g;
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;