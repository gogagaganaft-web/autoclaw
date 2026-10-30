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
exports.SchedulerHeader = undefined;
var o = _(require("./68374.js"));
var a = require("./13306.js");
var r = _(require("./99393.js"));
var s = _(require("./17381.js"));
var l = _(require("./20530.js"));
var u = _(require("./14390.js"));
var d = _(require("./71042.js"));
var c = _(require("./9896.js"));
var h = _(require("./91198.js"));
var f = require("./65850.js");
var p = require("./85890.js");
require("./28236.js");
require("./45231.js");
var g = require("./74842.js");
var m = require("./47718.js");
function _(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function v() {
  return (v = Object.assign ? Object.assign.bind() : function (e) {
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
function y(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return b(e);
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
      return b(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return b(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function b(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function x(e, t) {
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
function w(e, t) {
  return (w = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var C = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  w(t, n);
  var r;
  var u;
  var _;
  var b = i.prototype;
  b._getDefaultOptions = function () {
    return (0, a.extend)(e.prototype._getDefaultOptions.call(this), {
      _useShortDateFormat: !l.default.real().generic || l.default.isSimulator()
    });
  };
  b._createEventMap = function () {
    var e = this;
    this.eventMap = new Map([["currentView", [function (t) {
      e.currentView = (0, m.getCurrentView)((0, g.getViewName)(t), e.option("views"));
    }]], ["items", [this.repaint.bind(this)]], ["views", [g.validateViews]], ["currentDate", [this._getCalendarOptionUpdater("date")]], ["min", [this._getCalendarOptionUpdater("min")]], ["max", [this._getCalendarOptionUpdater("max")]], ["tabIndex", [this.repaint.bind(this)]], ["focusStateEnabled", [this.repaint.bind(this)]], ["useDropDownViewSwitcher", [this.repaint.bind(this)]]]);
  };
  b._addEvent = function (e, t) {
    if (!this.eventMap.has(e)) {
      this.eventMap.set(e, []);
    }
    var n = this.eventMap.get(e);
    this.eventMap.set(e, [].concat(y(n), [t]));
  };
  b._optionChanged = function (e) {
    var t = e.name;
    var n = e.value;
    if (this.eventMap.has(t)) {
      this.eventMap.get(t).forEach(function (e) {
        e(n);
      });
    }
  };
  b._init = function () {
    e.prototype._init.call(this);
    this._createEventMap();
    this.$element().addClass("dx-scheduler-header");
    this.currentView = (0, m.getCurrentView)((0, g.getViewName)(this.option("currentView")), this.option("views"));
  };
  b._render = function () {
    e.prototype._render.call(this);
    this._createEventMap();
    this._renderToolbar();
  };
  b._renderToolbar = function () {
    var e = this._createToolbarConfig();
    var t = (0, o.default)("<div>");
    t.appendTo(this.$element());
    this._toolbar = this._createComponent(t, d.default, e);
  };
  b._createToolbarConfig = function () {
    var e = this;
    return {
      items: this.option("items").map(function (t) {
        return e._parseItem(t);
      })
    };
  };
  b._parseItem = function (e) {
    if (this._isDefaultItem(e)) {
      var t = e.defaultElement;
      switch (t) {
        case "viewSwitcher":
          if (this.option("useDropDownViewSwitcher")) {
            return (0, f.getDropDownViewSwitcher)(this, e);
          } else {
            return (0, f.getViewSwitcher)(this, e);
          }
        case "dateNavigator":
          this._renderCalendar();
          return (0, p.getDateNavigator)(this, e);
        default:
          s.default.log(`Unknown default element type: ${t}`);
      }
    }
    return e;
  };
  b._callEvent = function (e, t) {
    if (this.eventMap.has(e)) {
      this.eventMap.get(e).forEach(function (e) {
        return e(t);
      });
    }
  };
  b._updateCurrentView = function (e) {
    this.option("onCurrentViewChange")(e.name);
    this._callEvent("currentView", e);
  };
  b._updateCalendarValueAndCurrentDate = function (e) {
    this._updateCurrentDate(e);
    this._calendar.option("value", e);
  };
  b._updateCurrentDate = function (e) {
    this.option("onCurrentDateChange")(e);
    this._callEvent("currentDate", e);
  };
  b._renderCalendar = function () {
    var e = this;
    this._calendar = this._createComponent("<div>", c.default, {
      value: this.option("currentDate"),
      min: this.option("min"),
      max: this.option("max"),
      firstDayOfWeek: this.option("firstDayOfWeek"),
      focusStateEnabled: this.option("focusStateEnabled"),
      tabIndex: this.option("tabIndex"),
      onValueChanged: function (t) {
        e._updateCurrentDate(t.value);
        e._calendar.hide();
      }
    });
    this._calendar.$element().appendTo(this.$element());
  };
  b._getCalendarOptionUpdater = function (e) {
    var t = this;
    return function (n) {
      if (t._calendar) {
        t._calendar.option(e, n);
      }
    };
  };
  b._getNextDate = function (e, t = null) {
    var n = t || this.option("currentDate");
    var i = v({}, this.intervalOptions, {
      date: n
    });
    return (0, g.getNextIntervalDate)(i, e);
  };
  b._isMonth = function () {
    var e = this.currentView;
    return (0, g.getViewType)(e) === "month";
  };
  b._getDisplayedDate = function () {
    var e = this.option("startViewDate");
    if (this._isMonth()) {
      return (0, g.nextWeek)(e);
    } else {
      return new Date(e);
    }
  };
  b._getCaption = function () {
    var e = this.option("currentDate");
    if (this.option("startViewDate")) {
      e = this._getDisplayedDate();
    }
    e = h.default.trimTime(e);
    var t = v({}, this.intervalOptions, {
      date: e
    });
    var n = this.option("customizeDateNavigatorText");
    var i = this.option("_useShortDateFormat");
    return (0, g.getCaption)(t, i, n);
  };
  b._updateDateByDirection = function (e) {
    var t = this._getNextDate(e);
    this._updateCalendarValueAndCurrentDate(t);
  };
  b._showCalendar = function (e) {
    this._calendar.show(e.element);
  };
  b._hideCalendar = function () {
    this._calendar.hide();
  };
  b._isDefaultItem = function (e) {
    return Object.prototype.hasOwnProperty.call(e, "defaultElement");
  };
  r = i;
  if (u = [{
    key: "views",
    get: function () {
      return this.option("views");
    }
  }, {
    key: "captionText",
    get: function () {
      return this._getCaption().text;
    }
  }, {
    key: "intervalOptions",
    get: function () {
      return {
        step: (0, g.getStep)(this.currentView),
        intervalCount: this.option("intervalCount"),
        firstDayOfWeek: this.option("firstDayOfWeek"),
        agendaDuration: this.option("agendaDuration")
      };
    }
  }]) {
    x(r.prototype, u);
  }
  if (_) {
    x(r, _);
  }
  Object.defineProperty(r, "prototype", {
    writable: false
  });
  return i;
}(u.default);
exports.SchedulerHeader = C;
(0, r.default)("dxSchedulerHeader", C);