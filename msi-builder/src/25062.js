exports.AppointmentForm = exports.APPOINTMENT_FORM_GROUP_NAMES = undefined;
var i = p(require("./68374.js"));
var o = p(require("./17737.js"));
var a = p(require("./69434.js"));
var r = p(require("./28109.js"));
var s = p(require("./20530.js"));
var l = p(require("./33546.js"));
var u = p(require("./51690.js"));
var d = require("./13306.js");
var c = p(require("./91198.js"));
var h = require("./86303.js");
require("./53555.js");
require("./51237.js");
require("./31362.js");
require("./31609.js");
require("./78665.js");
var f = require("./5480.js");
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function g(e) {
  return (g = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
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
function _(e) {
  return function (e) {
    if (Array.isArray(e)) {
      return v(e);
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
      return v(e, t);
    }
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor) {
      n = e.constructor.name;
    }
    if (n === "Map" || n === "Set") {
      return Array.from(e);
    }
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
      return v(e, t);
    }
  }(e) || function () {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function v(e, t) {
  if (t == null || t > e.length) {
    t = e.length;
  }
  for (var n = 0, i = new Array(t); n < t; n++) {
    i[n] = e[n];
  }
  return i;
}
function y(e, t) {
  for (var n = 0; n < t.length; n++) {
    var i = t[n];
    i.enumerable = i.enumerable || false;
    i.configurable = true;
    if ("value" in i) {
      i.writable = true;
    }
    Object.defineProperty(e, (o = i.key, a = undefined, a = function (e, t) {
      if (g(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (g(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(o, "string"), g(a) === "symbol" ? a : String(a)), i);
  }
  var o;
  var a;
}
var b = {
  Main: "mainGroup",
  Recurrence: "recurrenceGroup"
};
exports.APPOINTMENT_FORM_GROUP_NAMES = b;
function x(e, t, n, i, o) {
  return {
    editorType: "dxDateBox",
    dataField: e,
    colSpan: t,
    label: {
      text: r.default.format(i)
    },
    validationRules: [{
      type: "required"
    }],
    editorOptions: {
      width: "100%",
      calendarOptions: {
        firstDayOfWeek: n
      },
      onValueChanged: o,
      useMaskBehavior: true
    }
  };
}
var w = function () {
  function e(e) {
    this.scheduler = e;
    this.form = null;
    this.semaphore = new h.Semaphore();
  }
  var t;
  var n;
  var p;
  var g = e.prototype;
  g.create = function (e, t, n) {
    var a = this;
    var r = this.scheduler.getEditingConfig().allowTimeZoneEditing;
    var l = this.scheduler.getDataAccessors().expr;
    var u = !!n[l.recurrenceRuleExpr];
    var d = u ? 1 : 2;
    var c = [].concat(_(this._createMainItems(l, e, t, r)), _(this.scheduler.createResourceEditorModel()));
    t(u);
    var h = [{
      itemType: "group",
      name: b.Main,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      colSpan: d,
      items: c
    }, {
      itemType: "group",
      name: b.Recurrence,
      visible: u,
      colSpan: d,
      items: this._createRecurrenceEditor(l)
    }];
    var f = (0, i.default)("<div>");
    this.form = this.scheduler.createComponent(f, o.default, {
      items: h,
      showValidationSummary: true,
      scrollingEnabled: true,
      colCount: "auto",
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      formData: n,
      showColonAfterLabel: false,
      labelLocation: "top",
      customizeItem: function (e) {
        if (a.form && e.itemType === "group") {
          var t = a.scheduler.getDataAccessors().expr;
          var n = new Date(a.formData[t.startDateExpr]);
          var i = new Date(a.formData[t.endDateExpr]);
          var o = e.items.find(function (e) {
            return e.dataField === t.startDateTimeZoneExpr;
          });
          var r = e.items.find(function (e) {
            return e.dataField === t.endDateTimeZoneExpr;
          });
          if (o) {
            o.editorOptions.dataSource = a.createTimeZoneDataSource(n);
          }
          if (r) {
            r.editorOptions.dataSource = a.createTimeZoneDataSource(i);
          }
        }
      },
      screenByWidth: function (e) {
        if (e < 600 || s.default.current().deviceType !== "desktop") {
          return "xs";
        } else {
          return "lg";
        }
      }
    });
  };
  g.createTimeZoneDataSource = function (e) {
    return new l.default({
      store: u.default.getDisplayedTimeZones(e),
      paginate: true,
      pageSize: 10
    });
  };
  g._createAppointmentAdapter = function (e) {
    return (0, f.createAppointmentAdapter)(e, this.scheduler.getDataAccessors());
  };
  g._dateBoxValueChanged = function (e, t, n) {
    (function (e, t, n) {
      if (t !== null && !t && (n === null || !!n)) {
        e.option("value", n);
      }
    })(e.component, e.value, e.previousValue);
    var i = a.default.deserializeDate(e.value);
    var o = a.default.deserializeDate(e.previousValue);
    var r = this.form.getEditor(t);
    var s = a.default.deserializeDate(r.option("value"));
    if (this.semaphore.isFree() && s && i && n(s, i)) {
      var l = o ? s.getTime() - o.getTime() : 0;
      r.option("value", new Date(i.getTime() + l));
    }
  };
  g._createTimezoneEditor = function (e, t, n, i, o) {
    var a = this;
    var s = arguments.length > 5 && arguments[5] !== undefined && arguments[5];
    var l = r.default.format("dxScheduler-noTimezoneTitle");
    return {
      dataField: e,
      editorType: "dxSelectBox",
      visibleIndex: n,
      colSpan: i,
      label: {
        text: " "
      },
      editorOptions: {
        displayExpr: "title",
        valueExpr: "id",
        placeholder: l,
        searchEnabled: true,
        onValueChanged: function (e) {
          var n = a.form.getEditor(t);
          if (o) {
            n.option("value", e.value);
          }
        }
      },
      visible: s
    };
  };
  g._createDateBoxItems = function (e, t) {
    var n = this;
    var i = t ? 2 : 1;
    var o = this.scheduler.getFirstDayOfWeek();
    return [x(e.startDateExpr, i, o, "dxScheduler-editorLabelStartDate", function (t) {
      n._dateBoxValueChanged(t, e.endDateExpr, function (e, t) {
        return e < t;
      });
    }), this._createTimezoneEditor(e.startDateTimeZoneExpr, e.endDateTimeZoneExpr, 1, i, true, t), x(e.endDateExpr, i, o, "dxScheduler-editorLabelEndDate", function (t) {
      n._dateBoxValueChanged(t, e.startDateExpr, function (e, t) {
        return t < e;
      });
    }), this._createTimezoneEditor(e.endDateTimeZoneExpr, e.startDateTimeZoneExpr, 3, i, false, t)];
  };
  g._changeFormItemDateType = function (e, t) {
    var n = m({}, this.form.itemOption(e).editorOptions, {
      type: t ? "date" : "datetime"
    });
    this.form.itemOption(e, "editorOptions", n);
  };
  g._createMainItems = function (e, t, n, i) {
    var o = this;
    return [{
      dataField: e.textExpr,
      editorType: "dxTextBox",
      colSpan: 2,
      label: {
        text: r.default.format("dxScheduler-editorLabelTitle")
      }
    }, {
      itemType: "group",
      colSpan: 2,
      colCountByScreen: {
        lg: 2,
        xs: 1
      },
      items: this._createDateBoxItems(e, i)
    }, {
      itemType: "group",
      colSpan: 2,
      colCountByScreen: {
        lg: 2,
        xs: 2
      },
      items: [{
        dataField: e.allDayExpr,
        cssClass: "dx-appointment-form-switch",
        editorType: "dxSwitch",
        label: {
          text: r.default.format("dxScheduler-allDay"),
          location: "right"
        },
        editorOptions: {
          onValueChanged: function (t) {
            var n = t.value;
            var i = o.form.getEditor(e.startDateExpr);
            var r = o.form.getEditor(e.endDateExpr);
            var s = a.default.deserializeDate(i.option("value"));
            if (o.semaphore.isFree() && s) {
              if (n) {
                var l = c.default.trimTime(s);
                i.option("value", new Date(l));
                r.option("value", new Date(l));
              } else {
                var u = function (e, t) {
                  return new Date(new Date(e).setHours(t));
                }(s, o.scheduler.getStartDayHour());
                var d = o.scheduler.getCalculatedEndDate(u);
                i.option("value", u);
                r.option("value", d);
              }
            }
            var h = `${b.Main}.${e.startDateExpr}`;
            var f = `${b.Main}.${e.endDateExpr}`;
            o._changeFormItemDateType(h, n);
            o._changeFormItemDateType(f, n);
          }
        }
      }, {
        editorType: "dxSwitch",
        dataField: "repeat",
        cssClass: "dx-appointment-form-switch",
        name: "visibilityChanged",
        label: {
          text: r.default.format("dxScheduler-editorLabelRecurrence"),
          location: "right"
        },
        editorOptions: {
          onValueChanged: function (i) {
            var a = o.form;
            var r = i.value ? 1 : 2;
            a.itemOption(b.Main, "colSpan", r);
            a.itemOption(b.Recurrence, "colSpan", r);
            (function (e, t, n) {
              var i;
              n.itemOption(b.Recurrence, "visible", t);
              if (!t) {
                n.updateData(e, "");
              }
              if ((i = n.getEditor(e)) !== null && i !== undefined) {
                i.changeValueByVisibility(t);
              }
            })(e.recurrenceRuleExpr, i.value, a);
            n(i.value);
            t();
          }
        }
      }]
    }, {
      itemType: "empty",
      colSpan: 2
    }, {
      dataField: e.descriptionExpr,
      editorType: "dxTextArea",
      colSpan: 2,
      label: {
        text: r.default.format("dxScheduler-editorLabelDescription")
      }
    }, {
      itemType: "empty",
      colSpan: 2
    }];
  };
  g._createRecurrenceEditor = function (e) {
    var t = this;
    return [{
      dataField: e.recurrenceRuleExpr,
      editorType: "dxRecurrenceEditor",
      editorOptions: {
        firstDayOfWeek: this.scheduler.getFirstDayOfWeek(),
        timeZoneCalculator: this.scheduler.getTimeZoneCalculator(),
        getStartDateTimeZone: function () {
          return t._createAppointmentAdapter(t.formData).startDateTimeZone;
        }
      },
      label: {
        text: " ",
        visible: false
      }
    }];
  };
  g.setEditorsType = function (e) {
    var t = this.scheduler.getDataAccessors().expr;
    var n = t.startDateExpr;
    var i = t.endDateExpr;
    var o = `${b.Main}.${n}`;
    var a = `${b.Main}.${i}`;
    var r = this.form.itemOption(o);
    var s = this.form.itemOption(a);
    if (r && s) {
      var l = r.editorOptions;
      var u = s.editorOptions;
      l.type = u.type = e ? "date" : "datetime";
      this.form.itemOption(o, "editorOptions", l);
      this.form.itemOption(a, "editorOptions", u);
    }
  };
  g.updateRecurrenceEditorStartDate = function (e, t) {
    var n = {
      startDate: e
    };
    this.setEditorOptions(t, "Recurrence", n);
  };
  g.setEditorOptions = function (e, t, n) {
    var i = `${b.groupName}.${e}`;
    var o = this.form.itemOption(i);
    if (o) {
      this.form.itemOption(i, "editorOptions", (0, d.extend)({}, o.editorOptions, n));
    }
  };
  g.setTimeZoneEditorDataSource = function (e, t) {
    var n = this.createTimeZoneDataSource(e);
    this.setEditorOptions(t, "Main", {
      dataSource: n
    });
  };
  g.updateFormData = function (e) {
    this.semaphore.take();
    this.form.option("formData", e);
    var t = this.scheduler.getDataAccessors().expr;
    var n = e[t.allDayExpr];
    var i = new Date(e[t.startDateExpr]);
    var o = new Date(e[t.endDateExpr]);
    this.setTimeZoneEditorDataSource(i, t.startDateTimeZoneExpr);
    this.setTimeZoneEditorDataSource(o, t.endDateTimeZoneExpr);
    this.updateRecurrenceEditorStartDate(i, t.recurrenceRuleExpr);
    this.setEditorsType(n);
    this.semaphore.release();
  };
  t = e;
  if (n = [{
    key: "dxForm",
    get: function () {
      return this.form;
    }
  }, {
    key: "readOnly",
    set: function (e) {
      this.form.option("readOnly", e);
      var t = this.scheduler.getDataAccessors().expr.recurrenceRuleExpr;
      var n = this.form.getEditor(t);
      if (n != null) {
        n.option("readOnly", e);
      }
    }
  }, {
    key: "formData",
    get: function () {
      return this.form.option("formData");
    },
    set: function (e) {
      this.form.option("formData", e);
    }
  }]) {
    y(t.prototype, n);
  }
  if (p) {
    y(t, p);
  }
  Object.defineProperty(t, "prototype", {
    writable: false
  });
  return e;
}();
exports.AppointmentForm = w;