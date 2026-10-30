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
var o = c(require("./91198.js"));
var a = require("./95479.js");
var r = c(require("./72097.js"));
var s = require("./86474.js");
var l = require("./98140.js");
var u = require("./5480.js");
var d = require("./11305.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function h(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return f(e);
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
      return f(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return f(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function f(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function p(e, t) {
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
function g(e, t) {
  return (g = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var m = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  g(t, n);
  var r;
  var c;
  var f;
  var m = i.prototype;
  m.getAppointmentMinSize = function () {};
  m.getDeltaTime = function () {};
  m.keepAppointmentSettings = function () {
    return true;
  };
  m.getAppointmentGeometry = function (e) {
    return e;
  };
  m.groupAppointmentByResources = function (e) {
    var t = this.instance._getCurrentViewOption("groups");
    var n = {
      loadedResources: this.options.loadedResources,
      resources: this.options.resources,
      dataAccessors: this.dataAccessors.resources
    };
    return (0, l.groupAppointmentsByResources)(n, e, t);
  };
  m.createTaskPositionMap = function (e) {
    var t;
    var n;
    this.calculateRows(e, this.agendaDuration, this.currentDate);
    if (e.length) {
      t = this.instance.fire("getAgendaVerticalStepHeight");
      n = this.groupAppointmentByResources(e);
      var i = [];
      (0, a.each)(n, function (e, t) {
        var n = [];
        var o = [];
        (0, a.each)(t, function (e, t) {
          var i = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(t, e);
          var a = null;
          if (!i.indexes.length) {
            a = this.instance.getAppointmentsInstance()._processLongAppointment(t);
            n = n.concat(a.parts);
          }
          n = n.concat(i.parts);
          o = o.concat(i.indexes);
        }.bind(this));
        this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(o, t);
        this.instance.getAppointmentsInstance()._combineAppointments(t, n);
        i = i.concat(t);
      }.bind(this));
      Array.prototype.splice.apply(e, [0, e.length].concat(i));
    }
    var o = [];
    var r = 0;
    e.forEach(function (e, i) {
      o.push([{
        height: t,
        width: "100%",
        sortedIndex: r++,
        groupIndex: this._calculateGroupIndex(i, n),
        agendaSettings: e.settings
      }]);
      delete e.settings;
    }.bind(this));
    return o;
  };
  m._calculateGroupIndex = function (e, t) {
    var n;
    var i = 0;
    for (var o in t) {
      var a = t[o].length;
      if (e >= i && e < i + a) {
        n = Number(o);
        break;
      }
      i += a;
    }
    return n;
  };
  m._getDeltaWidth = function () {};
  m._getAppointmentMaxWidth = function () {
    return this.cellWidth;
  };
  m._needVerifyItemSize = function () {
    return false;
  };
  m._getAppointmentParts = function () {};
  m._reduceMultiWeekAppointment = function () {};
  m.calculateAppointmentHeight = function () {
    return 0;
  };
  m.calculateAppointmentWidth = function () {
    return 0;
  };
  m.isAppointmentGreaterThan = function () {};
  m.isAllDay = function () {
    return false;
  };
  m._sortCondition = function () {};
  m._rowCondition = function () {};
  m._columnCondition = function () {};
  m._findIndexByKey = function () {};
  m._markAppointmentAsVirtual = function () {};
  m.getDropDownAppointmentWidth = function () {};
  m.getCollectorLeftOffset = function () {};
  m.getCollectorTopOffset = function () {};
  m.replaceWrongAppointmentEndDate = function (e, t, n) {
    var i = (0, u.createAppointmentAdapter)(e, this.dataAccessors, this.timeZoneCalculator);
    (0, d.replaceWrongEndDate)(i, t, n, this.cellDuration, this.dataAccessors);
  };
  m.calculateRows = function (e, t, n, i) {
    this._rows = [];
    n = o.default.trimTime(new Date(n));
    var r = this.groupAppointmentByResources(e);
    (0, a.each)(r, function (e, o) {
      var r = [];
      var l = {
        indexes: [],
        parts: []
      };
      if (!o.length) {
        this._rows.push([]);
        return true;
      }
      (0, a.each)(o, function (e, t) {
        var n = s.ExpressionUtils.getField(this.dataAccessors, "startDate", t);
        var o = s.ExpressionUtils.getField(this.dataAccessors, "endDate", t);
        this.replaceWrongAppointmentEndDate(t, n, o);
        if (i) {
          delete t.settings;
        }
        var a = this.instance.getAppointmentsInstance()._processRecurrenceAppointment(t, e, false);
        l.parts = l.parts.concat(a.parts);
        l.indexes = l.indexes.concat(a.indexes);
      }.bind(this));
      this.instance.getAppointmentsInstance()._reduceRecurrenceAppointments(l.indexes, o);
      o.push.apply(o, h(l.parts));
      var c = o.length;
      for (var f = 0; f < t; f++) {
        var p = new Date(n);
        p.setMilliseconds(p.getMilliseconds() + f * 86400000);
        if (r[f] === undefined) {
          r[f] = 0;
        }
        for (var g = 0; g < c; g++) {
          var m = o[g].settings || o[g];
          var _ = (0, u.createAppointmentAdapter)(o[g], this.dataAccessors, this.timeZoneCalculator);
          var v = (0, d.getAppointmentTakesSeveralDays)(_);
          var y = s.ExpressionUtils.getField(this.dataAccessors, "recurrenceRule", o[g]);
          if (this.instance.fire("dayHasAppointment", p, m, true) || !y && v && this.instance.fire("dayHasAppointment", p, o[g], true)) {
            r[f] += 1;
          }
        }
      }
      this._rows.push(r);
    }.bind(this));
    return this._rows;
  };
  m._iterateRow = function (e, t, n) {
    for (var i = 0; i < e.length; i++) {
      t.counter = t.counter + e[i];
      if (t.counter >= n) {
        t.indexInRow = i;
        break;
      }
    }
  };
  m.getDateByIndex = function (e, t, n) {
    var i = {
      counter: 0,
      indexInRow: 0
    };
    e++;
    for (var o = 0; o < t.length && (this._iterateRow(t[o], i, e), !i.indexInRow); o++);
    return new Date(new Date(n).setDate(n.getDate() + i.indexInRow));
  };
  m.getAppointmentDataCalculator = function () {
    return function (e, t) {
      var n = e.index();
      var i = this.instance.getStartViewDate();
      var o = this.getDateByIndex(n, this._rows, i);
      var a = new Date(t);
      return {
        startDate: new Date(o.setHours(a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds()))
      };
    }.bind(this);
  };
  r = i;
  if (c = [{
    key: "instance",
    get: function () {
      return this.options.instance;
    }
  }, {
    key: "agendaDuration",
    get: function () {
      return this.options.agendaDuration;
    }
  }]) {
    p(r.prototype, c);
  }
  if (f) {
    p(r, f);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return i;
}(r.default);
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;