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
exports.Appointment = exports.AgendaAppointment = undefined;
var o = b(require("./68374.js"));
var a = b(require("./55994.js"));
var r = require("./31648.js");
var s = require("./88609.js");
var l = require("./13306.js");
var u = b(require("./99393.js"));
var d = require("./63898.js");
var c = require("./39611.js");
var h = b(require("./93786.js"));
var f = b(require("./13046.js"));
var p = b(require("./46743.js"));
var g = b(require("./28109.js"));
var m = b(require("./91500.js"));
var _ = require("./62060.js");
var v = require("./62754.js");
var y = require("./86474.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
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
function w(e, t, n) {
  if (t) {
    x(e.prototype, t);
  }
  if (n) {
    x(e, n);
  }
  Object.defineProperty(e, "prototype", {
    writable: false
  });
  return e;
}
function C(e, t) {
  e.prototype = Object.create(t.prototype);
  e.prototype.constructor = e;
  S(e, t);
}
function S(e, t) {
  return (S = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var k = (0, c.addNamespace)(h.default.enter, "dxSchedulerAppointment");
var D = (0, c.addNamespace)(h.default.leave, "dxSchedulerAppointment");
var I = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  C(t, e);
  var n = t.prototype;
  n._getDefaultOptions = function () {
    return (0, l.extend)(e.prototype._getDefaultOptions.call(this), {
      data: {},
      groupIndex: -1,
      groups: [],
      geometry: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      allowDrag: true,
      allowResize: true,
      reduced: null,
      isCompact: false,
      direction: "vertical",
      resizableConfig: {
        keepAspectRatio: false
      },
      cellHeight: 0,
      cellWidth: 0,
      isDragSource: false
    });
  };
  n.notifyObserver = function (e, t) {
    var n = this.option("observer");
    if (n) {
      n.fire(e, t);
    }
  };
  n.invoke = function () {
    var e = this.option("observer");
    if (e) {
      return e.fire.apply(e, arguments);
    }
  };
  n._optionChanged = function (t) {
    switch (t.name) {
      case "data":
      case "groupIndex":
      case "geometry":
      case "allowDrag":
      case "allowResize":
      case "reduced":
      case "sortedIndex":
      case "isCompact":
      case "direction":
      case "resizableConfig":
      case "cellHeight":
      case "cellWidth":
        this._invalidate();
        break;
      case "isDragSource":
        this._renderDragSourceClass();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  n._getHorizontalResizingRule = function () {
    var e = {
      head: this.option("rtlEnabled") ? "right" : "left",
      body: "",
      tail: this.option("rtlEnabled") ? "left" : "right"
    };
    var t = this.option("getResizableStep");
    var n = t ? t() : 0;
    return {
      handles: this.option("reduced") ? e[this.option("reduced")] : "left right",
      minHeight: 0,
      minWidth: this.invoke("getCellWidth"),
      step: n,
      roundStepValue: false
    };
  };
  n._getVerticalResizingRule = function () {
    var e = Math.round(this.invoke("getCellHeight"));
    return {
      handles: "top bottom",
      minWidth: 0,
      minHeight: e,
      step: e,
      roundStepValue: true
    };
  };
  n._render = function () {
    e.prototype._render.call(this);
    this._renderAppointmentGeometry();
    this._renderEmptyClass();
    this._renderReducedAppointment();
    this._renderAllDayClass();
    this._renderDragSourceClass();
    this._renderDirection();
    this.$element().data("dxAppointmentStartDate", this.option("startDate"));
    var t = y.ExpressionUtils.getField(this.option("dataAccessors"), "text", this.rawAppointment);
    this.$element().attr("title", t);
    this.$element().attr("role", "button");
    this._renderRecurrenceClass();
    this._renderResizable();
    this._setResourceColor();
  };
  n._setResourceColor = function () {
    var e = this;
    var t = {
      itemData: this.rawAppointment,
      groupIndex: this.option("groupIndex"),
      groups: this.option("groups")
    };
    this.option("getAppointmentColor")(t).done(function (t) {
      return t && e.coloredElement.css("backgroundColor", t);
    });
  };
  n._renderAppointmentGeometry = function () {
    var e = this.option("geometry");
    var t = this.$element();
    (0, r.move)(t, {
      top: e.top,
      left: e.left
    });
    t.css({
      width: e.width < 0 ? 0 : e.width,
      height: e.height < 0 ? 0 : e.height
    });
  };
  n._renderEmptyClass = function () {
    if (this.option("geometry").empty || this.option("isCompact")) {
      this.$element().addClass(_.EMPTY_APPOINTMENT_CLASS);
    }
  };
  n._renderReducedAppointment = function () {
    var e = this.option("reduced");
    if (e) {
      this.$element().toggleClass(_.REDUCED_APPOINTMENT_CLASS, true).toggleClass(_.REDUCED_APPOINTMENT_PARTS_CLASSES[e], true);
      this._renderAppointmentReducedIcon();
    }
  };
  n._renderAppointmentReducedIcon = function () {
    var e = (0, o.default)("<div>").addClass(_.REDUCED_APPOINTMENT_ICON).appendTo(this.$element());
    var t = this._getEndDate();
    var n = [g.default.format("dxScheduler-editorLabelEndDate"), ": ", m.default.format(t, "monthAndDay"), ", ", m.default.format(t, "year")].join("");
    a.default.off(e, k);
    a.default.on(e, k, function () {
      (0, d.show)({
        target: e,
        content: n
      });
    });
    a.default.off(e, D);
    a.default.on(e, D, function () {
      (0, d.hide)();
    });
  };
  n._getEndDate = function () {
    var e = y.ExpressionUtils.getField(this.option("dataAccessors"), "endDate", this.rawAppointment);
    if (e) {
      return new Date(e);
    } else {
      return e;
    }
  };
  n._renderAllDayClass = function () {
    this.$element().toggleClass(_.ALL_DAY_APPOINTMENT_CLASS, !!this.option("allDay"));
  };
  n._renderDragSourceClass = function () {
    this.$element().toggleClass(_.APPOINTMENT_DRAG_SOURCE_CLASS, !!this.option("isDragSource"));
  };
  n._renderRecurrenceClass = function () {
    var e = y.ExpressionUtils.getField(this.option("dataAccessors"), "recurrenceRule", this.rawAppointment);
    if ((0, s.getRecurrenceProcessor)().isValidRecurrenceRule(e)) {
      this.$element().addClass(_.RECURRENCE_APPOINTMENT_CLASS);
    }
  };
  n._renderDirection = function () {
    this.$element().addClass(_.DIRECTION_APPOINTMENT_CLASSES[this.option("direction")]);
  };
  n._createResizingConfig = function () {
    var e = this.option("direction") === "vertical" ? this._getVerticalResizingRule() : this._getHorizontalResizingRule();
    if (!this.invoke("isGroupedByDate")) {
      e.stepPrecision = "strict";
    }
    return e;
  };
  n._renderResizable = function () {
    if (this.option("allowResize")) {
      this._createComponent(this.$element(), p.default, (0, l.extend)(this._createResizingConfig(), this.option("resizableConfig")));
    }
  };
  n._useTemplates = function () {
    return false;
  };
  w(t, [{
    key: "coloredElement",
    get: function () {
      return this.$element();
    }
  }, {
    key: "rawAppointment",
    get: function () {
      return this.option("data");
    }
  }]);
  return t;
}(f.default);
exports.Appointment = I;
(0, u.default)("dxSchedulerAppointment", I);
var T = function (e) {
  function t() {
    return e.apply(this, arguments) || this;
  }
  C(t, e);
  var n = t.prototype;
  n._getDefaultOptions = function () {
    return (0, l.extend)(e.prototype._getDefaultOptions.call(this), {
      createPlainResourceListAsync: new v.Deferred()
    });
  };
  n._renderResourceList = function (e, t) {
    t.forEach(function (t) {
      var n = (0, o.default)("<div>").addClass(_.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM).appendTo(e);
      (0, o.default)("<div>").text(`${t.label}:`).appendTo(n);
      (0, o.default)("<div>").addClass(_.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST_ITEM_VALUE).text(t.values.join(", ")).appendTo(n);
    });
  };
  n._render = function () {
    var t = this;
    e.prototype._render.call(this);
    this.option("createPlainResourceListAsync")(this.rawAppointment).done(function (e) {
      var n = t.$element().find(`.${_.APPOINTMENT_CONTENT_CLASSES.APPOINTMENT_CONTENT_DETAILS}`);
      var i = (0, o.default)("<div>").addClass(_.APPOINTMENT_CONTENT_CLASSES.AGENDA_RESOURCE_LIST).appendTo(n);
      t._renderResourceList(i, e);
    });
  };
  w(t, [{
    key: "coloredElement",
    get: function () {
      return this.$element().find(`.${_.APPOINTMENT_CONTENT_CLASSES.AGENDA_MARKER}`);
    }
  }]);
  return t;
}(I);
exports.AgendaAppointment = T;