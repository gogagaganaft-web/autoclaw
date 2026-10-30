exports.AppointmentPopup = exports.ACTION_TO_APPOINTMENT = undefined;
var i = f(require("./20530.js"));
var o = f(require("./68374.js"));
var a = f(require("./91198.js"));
var r = require("./62754.js");
var s = require("./80506.js");
var l = f(require("./51495.js"));
var u = require("./71125.js");
var d = require("./5480.js");
var c = require("./98140.js");
var h = require("./51113.js");
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
var _ = a.default.dateToMilliseconds;
var v = _("day");
var y = {
  height: "auto",
  maxHeight: "100%",
  showCloseButton: false,
  showTitle: false,
  preventScrollEvents: false,
  enableBodyScroll: false,
  defaultOptionsRules: [{
    device: function () {
      return i.default.current().android;
    },
    options: {
      showTitle: false
    }
  }]
};
var b = {
  CREATE: 0,
  UPDATE: 1,
  EXCLUDE_FROM_SERIES: 2
};
exports.ACTION_TO_APPOINTMENT = b;
var x = function () {
  function e(e, t) {
    this.scheduler = e;
    this.form = t;
    this.popup = null;
    this.state = {
      action: null,
      lastEditData: null,
      saveChangesLocker: false,
      appointment: {
        data: null
      }
    };
  }
  var t;
  var n;
  var i;
  var a = e.prototype;
  a.show = function (e, t) {
    var n = this;
    this.state.appointment.data = e;
    this.state.action = t.action;
    this.state.excludeInfo = t.excludeInfo;
    if (!this.popup) {
      var i = this._createPopupConfig();
      this.popup = this._createPopup(i);
    }
    this.popup.option("toolbarItems", (0, h.getPopupToolbarItems)(t.isToolbarVisible, function (e) {
      return n._doneButtonClickHandler(e);
    }));
    this.popup.show();
  };
  a.hide = function () {
    this.popup.hide();
  };
  a.dispose = function () {
    var e;
    if ((e = this.popup) !== null && e !== undefined) {
      e.$element().remove();
    }
  };
  a._createPopup = function (e) {
    var t = (0, o.default)("<div>").addClass("dx-scheduler-appointment-popup").appendTo(this.scheduler.getElement());
    return this.scheduler.createComponent(t, l.default, e);
  };
  a._createPopupConfig = function () {
    var e = this;
    return g({}, y, {
      onHiding: function () {
        return e.scheduler.focus();
      },
      contentTemplate: function () {
        return e._createPopupContent();
      },
      onShowing: function (t) {
        return e._onShowing(t);
      },
      wrapperAttr: {
        class: "dx-scheduler-appointment-popup"
      }
    });
  };
  a._onShowing = function (e) {
    var t = this;
    this._updateForm();
    var n = {
      form: this.form.dxForm,
      popup: this.popup,
      appointmentData: this.state.appointment.data,
      cancel: false
    };
    this.scheduler.getAppointmentFormOpening()(n);
    this.scheduler.processActionResult(n, function (n) {
      if (n) {
        e.cancel = true;
      } else {
        t.updatePopupFullScreenMode();
      }
    });
  };
  a._createPopupContent = function () {
    this._createForm();
    return this.form.dxForm.$element();
  };
  a._createFormData = function (e) {
    var t = this._createAppointmentAdapter(e);
    var n = this.scheduler.getDataAccessors();
    var i = this.scheduler.getResources();
    return g({}, e, (0, c.getNormalizedResources)(e, n, i), {
      repeat: !!t.recurrenceRule
    });
  };
  a._createForm = function () {
    var e = this.state.appointment.data;
    var t = this._createFormData(e);
    this.form.create(this.triggerResize.bind(this), this.changeSize.bind(this), t);
  };
  a._isReadOnly = function (e) {
    var t = this._createAppointmentAdapter(e);
    return !!e && !!t.disabled || this.state.action !== b.CREATE && !this.scheduler.getEditingConfig().allowUpdating;
  };
  a._createAppointmentAdapter = function (e) {
    return (0, d.createAppointmentAdapter)(e, this.scheduler.getDataAccessors(), this.scheduler.getTimeZoneCalculator());
  };
  a._updateForm = function () {
    var e = this.state.appointment.data;
    var t = this._createAppointmentAdapter(this._createFormData(e));
    t.startDate &&= t.calculateStartDate("toAppointment");
    t.endDate &&= t.calculateEndDate("toAppointment");
    var n = t.source();
    this.form.readOnly = this._isReadOnly(n);
    this.form.updateFormData(n);
  };
  a.triggerResize = function () {
    if (this.popup) {
      (0, s.triggerResizeEvent)(this.popup.$element());
    }
  };
  a.changeSize = function (e) {
    if (this.popup) {
      var t = (0, h.isPopupFullScreenNeeded)();
      var n = t ? "100%" : (0, h.getMaxWidth)(e);
      this.popup.option("fullScreen", t);
      this.popup.option("maxWidth", n);
    }
  };
  a.updatePopupFullScreenMode = function () {
    if (this.form.dxForm) {
      var e = this.form.formData[this.scheduler.getDataAccessors().expr.recurrenceRuleExpr];
      if (this.visible) {
        this.changeSize(e);
      }
    }
  };
  a.saveChangesAsync = function (e) {
    var t = this;
    var n = new r.Deferred();
    var i = this.form.dxForm.validate();
    if (e) {
      this._showLoadPanel();
    }
    (0, r.when)(i && i.complete || i).done(function (e) {
      if (e && !e.isValid) {
        (0, u.hide)();
        n.resolve(false);
        return;
      }
      var i = t._createAppointmentAdapter(t.form.formData);
      var o = i.clone({
        pathTimeZone: "fromAppointment"
      });
      t._addMissingDSTTime(i, o);
      var a = o.source();
      delete a.repeat;
      switch (t.state.action) {
        case b.CREATE:
          t.scheduler.addAppointment(a).done(n.resolve);
          break;
        case b.UPDATE:
          t.scheduler.updateAppointment(t.state.appointment.data, a).done(n.resolve);
          break;
        case b.EXCLUDE_FROM_SERIES:
          t.scheduler.updateAppointment(t.state.excludeInfo.sourceAppointment, t.state.excludeInfo.updatedAppointment);
          t.scheduler.addAppointment(a).done(n.resolve);
      }
      n.done(function () {
        (0, u.hide)();
        t.state.lastEditData = a;
      });
    });
    return n.promise();
  };
  a._doneButtonClickHandler = function (e) {
    e.cancel = true;
    this.saveEditDataAsync();
  };
  a.saveEditDataAsync = function () {
    var e = this;
    var t = new r.Deferred();
    if (this._tryLockSaveChanges()) {
      (0, r.when)(this.saveChangesAsync(true)).done(function () {
        if (e.state.lastEditData) {
          var n = e._createAppointmentAdapter(e.state.lastEditData);
          var i = n.startDate;
          var o = n.endDate;
          var a = n.allDay;
          var r = i.getTime();
          var s = o.getTime();
          var l = a || s - r >= v;
          var u = e.scheduler.getDataAccessors();
          var d = e.scheduler.getResources();
          var h = (0, c.getNormalizedResources)(e.state.lastEditData, u, d);
          e.scheduler.updateScrollPosition(i, h, l);
          e.state.lastEditData = null;
        }
        e._unlockSaveChanges();
        t.resolve();
      });
    }
    return t.promise();
  };
  a._showLoadPanel = function () {
    var e = this.popup.$overlayContent();
    (0, u.show)({
      container: e,
      position: {
        of: e
      }
    });
  };
  a._tryLockSaveChanges = function () {
    return this.state.saveChangesLocker === false && (this.state.saveChangesLocker = true, true);
  };
  a._unlockSaveChanges = function () {
    this.state.saveChangesLocker = false;
  };
  a._addMissingDSTTime = function (e, t) {
    var n = this.scheduler.getTimeZoneCalculator();
    t.startDate = this._addMissingDSTShiftToDate(n, e.startDate, t.startDate);
    t.endDate &&= this._addMissingDSTShiftToDate(n, e.endDate, t.endDate);
  };
  a._addMissingDSTShiftToDate = function (e, t, n) {
    var a = e.getOffsets(t)?.common - e.getOffsets(n)?.common;
    if (a) {
      return new Date(n.getTime() + a * _("hour"));
    } else {
      return n;
    }
  };
  t = e;
  if (n = [{
    key: "visible",
    get: function () {
      return !!this.popup && this.popup.option("visible");
    }
  }]) {
    m(t.prototype, n);
  }
  if (i) {
    m(t, i);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.AppointmentPopup = x;