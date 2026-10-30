exports.default = undefined;
var i = v(require("./99393.js"));
var o = v(require("./73176.js"));
var a = v(require("./68374.js"));
var r = v(require("./91198.js"));
var s = require("./13306.js");
var l = require("./35922.js");
var u = v(require("./91500.js"));
var d = v(require("./28109.js"));
var c = v(require("./17737.js"));
var h = v(require("./28236.js"));
var f = v(require("./29589.js"));
var p = v(require("./96452.js"));
var g = v(require("./34171.js"));
var m = require("./88609.js");
require("./14305.js");
var _ = require("./75296.js");
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
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
  return (x = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var w = "dx-recurrence-repeat-end";
var C = "dx-recurrence-numberbox-interval";
var S = [{
  recurrence: "dxScheduler-recurrenceHourly",
  value: "hourly"
}, {
  recurrence: "dxScheduler-recurrenceDaily",
  value: "daily"
}, {
  recurrence: "dxScheduler-recurrenceWeekly",
  value: "weekly"
}, {
  recurrence: "dxScheduler-recurrenceMonthly",
  value: "monthly"
}, {
  recurrence: "dxScheduler-recurrenceYearly",
  value: "yearly"
}];
var k = S.map(function (e) {
  return {
    text: function () {
      return d.default.format(e.recurrence);
    },
    value: e.value
  };
});
var D = [{
  type: "never"
}, {
  type: "until"
}, {
  type: "count"
}];
var I = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
var T = function () {
  function e(e) {
    this._recurrenceProcessor = (0, m.getRecurrenceProcessor)();
    this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(e).rule;
  }
  var t = e.prototype;
  t.makeRules = function (e) {
    this._recurrenceRule = this._recurrenceProcessor.evalRecurrenceRule(e).rule;
  };
  t.makeRule = function (e, t) {
    if (!t || Array.isArray(t) && !t.length) {
      delete this._recurrenceRule[e];
    } else if ((0, l.isDefined)(e)) {
      if (e === "until") {
        delete this._recurrenceRule.count;
      }
      if (e === "count") {
        delete this._recurrenceRule.until;
      }
      this._recurrenceRule[e] = t;
    }
  };
  t.getRepeatEndRule = function () {
    var e = this._recurrenceRule;
    if ("count" in e) {
      return "count";
    } else if ("until" in e) {
      return "until";
    } else {
      return "never";
    }
  };
  t.getRecurrenceString = function () {
    return this._recurrenceProcessor.getRecurrenceString(this._recurrenceRule);
  };
  t.getRules = function () {
    return this._recurrenceRule;
  };
  t.getDaysFromByDayRule = function () {
    return this._recurrenceProcessor.daysFromByDayRule(this._recurrenceRule);
  };
  return e;
}();
var E = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  x(t, n);
  var p = i.prototype;
  p._getDefaultOptions = function () {
    var t = e.prototype._getDefaultOptions.call(this);
    return (0, s.extend)(t, {
      value: null,
      startDate: new Date(),
      firstDayOfWeek: undefined
    });
  };
  p._getFirstDayOfWeek = function () {
    var e = this.option("firstDayOfWeek");
    if ((0, l.isDefined)(e)) {
      return e;
    } else {
      return u.default.firstDayOfWeekIndex();
    }
  };
  p._createComponent = function (t, n, i = {}) {
    this._extendConfig(i, {
      readOnly: this.option("readOnly")
    });
    return e.prototype._createComponent.call(this, t, n, i);
  };
  p._init = function () {
    e.prototype._init.call(this);
    this._recurrenceRule = new T(this.option("value"));
  };
  p._render = function () {
    e.prototype._render.call(this);
    this.$element().addClass("dx-recurrence-editor");
    this._$container = (0, a.default)("<div>").addClass("dx-recurrence-editor-container").appendTo(this.$element());
    this._prepareEditors();
    this._renderEditors(this._$container);
  };
  p.getEditorByField = function (e) {
    var t = this.getRecurrenceForm().getEditor(e);
    if (!(0, l.isDefined)(t)) {
      switch (e) {
        case "byday":
          t = this._weekEditor;
          break;
        case "count":
          t = this._repeatCountEditor;
          break;
        case "until":
          t = this._repeatUntilDate;
      }
    }
    return t;
  };
  p._prepareEditors = function () {
    var e = (this._recurrenceRule.getRules().freq || S[1].value).toLowerCase();
    this._editors = [this._createFreqEditor(e), this._createIntervalEditor(e), this._createRepeatOnLabel(e), {
      itemType: "group",
      cssClass: "dx-recurrence-repeat-on",
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: this._createRepeatOnEditor(e)
    }, {
      itemType: "group",
      items: this._createRepeatEndEditor()
    }];
    return this._editors;
  };
  p._createFreqEditor = function (e) {
    var t = this;
    return {
      dataField: "freq",
      name: "FREQ",
      editorType: "dxSelectBox",
      cssClass: "dx-recurrence-selectbox-freq",
      editorOptions: {
        items: k,
        value: e,
        field: "freq",
        valueExpr: "value",
        displayExpr: "text",
        layout: "horizontal",
        elementAttr: {
          class: "dx-recurrence-selectbox-freq"
        },
        onValueChanged: function (e) {
          return t._valueChangedHandler(e);
        }
      },
      label: {
        text: d.default.format("dxScheduler-editorLabelRecurrence")
      }
    };
  };
  p._createIntervalEditor = function (e) {
    var t = this;
    var n = this._recurrenceRule.getRules().interval || 1;
    return {
      itemType: "group",
      colCount: 2,
      cssClass: `${C}-wrapper`,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        dataField: "interval",
        editorType: "dxNumberBox",
        editorOptions: {
          format: "#",
          width: 70,
          min: 1,
          field: "interval",
          value: n,
          showSpinButtons: true,
          useLargeSpinButtons: false,
          elementAttr: {
            class: C
          },
          onValueChanged: function (e) {
            return t._valueChangedHandler(e);
          }
        },
        label: {
          text: d.default.format("dxScheduler-recurrenceRepeatEvery")
        }
      }, {
        name: "intervalLabel",
        cssClass: `${C}-label`,
        template: function () {
          return d.default.format(`dxScheduler-recurrenceRepeat${e.charAt(0).toUpperCase()}${e.substr(1).toLowerCase()}`);
        }
      }]
    };
  };
  p._createRepeatOnLabel = function (e) {
    return {
      itemType: "group",
      cssClass: `dx-recurrence-repeat-on-label`,
      items: [{
        name: "repeatOnLabel",
        colSpan: 2,
        template: function () {
          return d.default.format("dxScheduler-recurrenceRepeatOn");
        },
        visible: e && e !== "daily" && e !== "hourly"
      }]
    };
  };
  p._createRepeatOnEditor = function (e) {
    return [this._createByDayEditor(e), this._createByMonthEditor(e), this._createByMonthDayEditor(e)];
  };
  p._createByDayEditor = function (e) {
    var t = this;
    return {
      dataField: "byday",
      colSpan: 2,
      template: function (e, n) {
        var i = t._getFirstDayOfWeek();
        var o = t._daysOfWeekByRules();
        var r = u.default.getDayNames("abbreviated");
        var s = I.slice(i).concat(I.slice(0, i));
        var l = r.slice(i).concat(r.slice(0, i)).map(function (e, t) {
          return {
            text: e,
            key: s[t]
          };
        });
        t._$repeatOnWeek = (0, a.default)("<div>").addClass("dx-recurrence-button-group").appendTo(n);
        t._weekEditor = t._createComponent(t._$repeatOnWeek, h.default, {
          items: l,
          field: "byday",
          selectionMode: "multiple",
          selectedItemKeys: o,
          keyExpr: "key",
          onSelectionChanged: function (e) {
            var n = e.component.option("selectedItemKeys");
            var i = n != null && n.length ? n : t._getDefaultByDayValue();
            t._recurrenceRule.makeRule("byday", i);
            t._changeEditorValue();
          }
        });
      },
      visible: e === "weekly",
      label: {
        visible: false
      }
    };
  };
  p._createByMonthEditor = function (e) {
    var t = this;
    var n = u.default.getMonthNames("wide");
    return {
      dataField: "bymonth",
      editorType: "dxSelectBox",
      editorOptions: {
        field: "bymonth",
        items: y(Array(12)).map(function (e, t) {
          return {
            value: `${t + 1}`,
            text: n[t]
          };
        }),
        value: this._monthOfYearByRules(),
        width: 120,
        displayExpr: "text",
        valueExpr: "value",
        elementAttr: {
          class: "dx-recurrence-selectbox-month-of-year"
        },
        onValueChanged: function (e) {
          return t._valueChangedHandler(e);
        }
      },
      visible: e === "yearly",
      label: {
        visible: false
      }
    };
  };
  p._createByMonthDayEditor = function (e) {
    var t = this;
    return {
      dataField: "bymonthday",
      editorType: "dxNumberBox",
      editorOptions: {
        min: 1,
        max: 31,
        format: "#",
        width: 70,
        field: "bymonthday",
        showSpinButtons: true,
        useLargeSpinButtons: false,
        value: this._dayOfMonthByRules(),
        elementAttr: {
          class: "dx-recurrence-numberbox-day-of-month"
        },
        onValueChanged: function (e) {
          return t._valueChangedHandler(e);
        }
      },
      visible: e === "monthly" || e === "yearly",
      label: {
        visible: false
      }
    };
  };
  p._createRepeatEndEditor = function () {
    var e = this;
    var t = this._recurrenceRule.getRepeatEndRule();
    return [{
      dataField: "repeatEnd",
      editorType: "dxRadioGroup",
      editorOptions: {
        items: D,
        value: t,
        valueExpr: "type",
        field: "repeatEnd",
        itemTemplate: function (t) {
          if (t.type === "count") {
            return e._renderRepeatCountEditor();
          } else if (t.type === "until") {
            return e._renderRepeatUntilEditor();
          } else {
            return e._renderDefaultRepeatEnd();
          }
        },
        layout: "vertical",
        elementAttr: {
          class: "dx-recurrence-radiogroup-repeat-type"
        },
        onValueChanged: function (t) {
          return e._repeatEndValueChangedHandler(t);
        }
      },
      label: {
        text: d.default.format("dxScheduler-recurrenceEnd")
      }
    }];
  };
  p._renderEditors = function (e) {
    this._recurrenceForm = this._createComponent(e, c.default, {
      items: this._editors,
      showValidationSummary: false,
      scrollingEnabled: true,
      showColonAfterLabel: false,
      labelLocation: "top"
    });
    this._disableRepeatEndParts();
  };
  p._setAriaDescribedBy = function (e, t) {
    var n = `label-${new o.default()}`;
    e.setAria("describedby", n);
    e.setAria("id", n, t);
  };
  p.getRecurrenceForm = function () {
    return this._recurrenceForm;
  };
  p.changeValueByVisibility = function (e) {
    if (e) {
      if (!this.option("value")) {
        this._handleDefaults();
      }
    } else {
      this._recurrenceRule.makeRules("");
      this.option("value", "");
    }
  };
  p._handleDefaults = function () {
    this._recurrenceRule.makeRule("freq", S[1].value);
    this._changeEditorValue();
  };
  p._changeEditorValue = function () {
    this.option("value", this._recurrenceRule.getRecurrenceString() || "");
  };
  p._daysOfWeekByRules = function () {
    var e = this._recurrenceRule.getDaysFromByDayRule();
    if (!e.length) {
      e = this._getDefaultByDayValue();
    }
    return e;
  };
  p._getDefaultByDayValue = function () {
    var e = this.option("startDate").getDay();
    return [I[e]];
  };
  p._dayOfMonthByRules = function () {
    var e = this._recurrenceRule.getRules().bymonthday;
    e ||= this.option("startDate").getDate();
    return e;
  };
  p._monthOfYearByRules = function () {
    var e = this._recurrenceRule.getRules().bymonth;
    e ||= this.option("startDate").getMonth() + 1;
    return String(e);
  };
  p._renderDefaultRepeatEnd = function () {
    var e = (0, a.default)("<div>").addClass(w + "-wrapper");
    (0, a.default)("<div>").text(d.default.format("dxScheduler-recurrenceNever")).addClass(w + "-label").appendTo(e);
    return e;
  };
  p._repeatEndValueChangedHandler = function (e) {
    var t = e.value;
    this._disableRepeatEndParts(t);
    if (t === "until") {
      this._recurrenceRule.makeRule(t, this._getUntilValue());
    }
    if (t === "count") {
      this._recurrenceRule.makeRule(t, this._repeatCountEditor.option("value"));
    }
    if (t === "never") {
      this._recurrenceRule.makeRule("count", "");
      this._recurrenceRule.makeRule("until", "");
    }
    this._changeEditorValue();
  };
  p._disableRepeatEndParts = function (e = this._recurrenceRule.getRepeatEndRule()) {
    if (e === "until") {
      this._repeatCountEditor.option("disabled", true);
      this._repeatUntilDate.option("disabled", false);
    }
    if (e === "count") {
      this._repeatCountEditor.option("disabled", false);
      this._repeatUntilDate.option("disabled", true);
    }
    if (e === "never") {
      this._repeatCountEditor.option("disabled", true);
      this._repeatUntilDate.option("disabled", true);
    }
  };
  p._renderRepeatCountEditor = function () {
    var e = this._recurrenceRule.getRules().count || 1;
    var t = (0, a.default)("<div>").addClass(w + "-wrapper");
    (0, a.default)("<div>").text(d.default.format("dxScheduler-recurrenceAfter")).addClass(w + "-label").appendTo(t);
    this._$repeatCountEditor = (0, a.default)("<div>").addClass("dx-recurrence-numberbox-repeat-count").appendTo(t);
    (0, a.default)("<div>").text(d.default.format("dxScheduler-recurrenceRepeatCount")).addClass(w + "-label").appendTo(t);
    this._repeatCountEditor = this._createComponent(this._$repeatCountEditor, g.default, {
      field: "count",
      format: "#",
      width: 70,
      min: 1,
      showSpinButtons: true,
      useLargeSpinButtons: false,
      value: e,
      onValueChanged: this._repeatCountValueChangeHandler.bind(this)
    });
    return t;
  };
  p._repeatCountValueChangeHandler = function (e) {
    if (this._recurrenceRule.getRepeatEndRule() === "count") {
      var t = e.value;
      this._recurrenceRule.makeRule("count", t);
      this._changeEditorValue();
    }
  };
  p._formatUntilDate = function (e) {
    if (this._recurrenceRule.getRules().until && r.default.sameDate(this._recurrenceRule.getRules().until, e)) {
      return e;
    } else {
      return r.default.setToDayEnd(e);
    }
  };
  p._renderRepeatUntilEditor = function () {
    var e = this._getUntilValue();
    var t = (0, a.default)("<div>").addClass(w + "-wrapper");
    (0, a.default)("<div>").text(d.default.format("dxScheduler-recurrenceOn")).addClass(w + "-label").appendTo(t);
    this._$repeatDateEditor = (0, a.default)("<div>").addClass("dx-recurrence-datebox-until-date").appendTo(t);
    this._repeatUntilDate = this._createComponent(this._$repeatDateEditor, f.default, {
      field: "until",
      value: e,
      type: "date",
      onValueChanged: this._repeatUntilValueChangeHandler.bind(this),
      calendarOptions: {
        firstDayOfWeek: this._getFirstDayOfWeek()
      },
      useMaskBehavior: true
    });
    return t;
  };
  p._repeatUntilValueChangeHandler = function (e) {
    if (this._recurrenceRule.getRepeatEndRule() === "until") {
      var t = this._formatUntilDate(new Date(e.value));
      var n = this.option("getStartDateTimeZone")();
      var i = n ? _.PathTimeZoneConversion.fromAppointmentToSource : _.PathTimeZoneConversion.fromGridToSource;
      var o = this.option("timeZoneCalculator").createDate(t, {
        path: i,
        appointmentTimeZone: n
      });
      this._recurrenceRule.makeRule("until", o);
      this._changeEditorValue();
    }
  };
  p._valueChangedHandler = function (e) {
    var t = e.value;
    var n = e.previousValue;
    var i = e.component.option("field");
    if (this.option("visible")) {
      this._recurrenceRule.makeRule(i, t);
      if (i === "freq") {
        this._makeRepeatOnRule(t);
        this._changeRepeatOnVisibility(t, n);
      }
      this._changeEditorValue();
    } else {
      this.option("value", "");
    }
  };
  p._makeRepeatOnRule = function (e) {
    if (e === "daily" || e === "hourly") {
      this._recurrenceRule.makeRule("byday", "");
      this._recurrenceRule.makeRule("bymonth", "");
      this._recurrenceRule.makeRule("bymonthday", "");
    }
    if (e === "weekly") {
      this._recurrenceRule.makeRule("byday", this._daysOfWeekByRules());
      this._recurrenceRule.makeRule("bymonth", "");
      this._recurrenceRule.makeRule("bymonthday", "");
    }
    if (e === "monthly") {
      this._recurrenceRule.makeRule("bymonthday", this._dayOfMonthByRules());
      this._recurrenceRule.makeRule("bymonth", "");
      this._recurrenceRule.makeRule("byday", "");
    }
    if (e === "yearly") {
      this._recurrenceRule.makeRule("bymonthday", this._dayOfMonthByRules());
      this._recurrenceRule.makeRule("bymonth", this._monthOfYearByRules());
      this._recurrenceRule.makeRule("byday", "");
    }
  };
  p._optionChanged = function (t) {
    var n;
    var i;
    var o;
    var a;
    switch (t.name) {
      case "readOnly":
        if ((n = this._recurrenceForm) !== null && n !== undefined) {
          n.option("readOnly", t.value);
        }
        if ((i = this._repeatCountEditor) !== null && i !== undefined) {
          i.option("readOnly", t.value);
        }
        if ((o = this._weekEditor) !== null && o !== undefined) {
          o.option("readOnly", t.value);
        }
        if ((a = this._repeatUntilDate) !== null && a !== undefined) {
          a.option("readOnly", t.value);
        }
        e.prototype._optionChanged.call(this, t);
        break;
      case "value":
        this._recurrenceRule.makeRules(t.value);
        this._changeRepeatIntervalLabel();
        this._disableRepeatEndParts();
        this._changeEditorsValue(this._recurrenceRule.getRules());
        e.prototype._optionChanged.call(this, t);
        break;
      case "startDate":
        this._makeRepeatOnRule(this._recurrenceRule.getRules().freq);
        if ((0, l.isDefined)(this._recurrenceRule.getRecurrenceString())) {
          this._changeEditorValue();
        }
        break;
      case "firstDayOfWeek":
        if (this._weekEditor) {
          var r = u.default.getDayNames("abbreviated");
          var s = I.slice(t.value).concat(I.slice(0, t.value));
          var d = r.slice(t.value).concat(r.slice(0, t.value)).map(function (e, t) {
            return {
              text: e,
              key: s[t]
            };
          });
          this._weekEditor.option("items", d);
        }
        if (this._$repeatDateEditor) {
          this._repeatUntilDate.option("calendarOptions.firstDayOfWeek", this._getFirstDayOfWeek());
        }
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  p._changeRepeatOnVisibility = function (e, t) {
    if (e !== t) {
      this._recurrenceForm.itemOption("byday", "visible", false);
      this._recurrenceForm.itemOption("bymonthday", "visible", false);
      this._recurrenceForm.itemOption("bymonth", "visible", false);
      this._recurrenceForm.itemOption("repeatOnLabel", "visible", e && e !== "daily" && e !== "hourly");
      if (e === "weekly") {
        this._recurrenceForm.itemOption("byday", "visible", true);
      }
      if (e === "monthly") {
        this._recurrenceForm.itemOption("bymonthday", "visible", true);
      }
      if (e === "yearly") {
        this._recurrenceForm.itemOption("bymonthday", "visible", true);
        this._recurrenceForm.itemOption("bymonth", "visible", true);
      }
    }
  };
  p._changeRepeatIntervalLabel = function () {
    var e = this._recurrenceRule.getRules().freq;
    if (e) {
      this._recurrenceForm.itemOption("intervalLabel", "template", d.default.format(`dxScheduler-recurrenceRepeat${e.charAt(0).toUpperCase()}${e.substr(1).toLowerCase()}`));
    }
  };
  p._changeEditorsValue = function (e) {
    this._recurrenceForm.getEditor("freq").option("value", (e.freq || S[1].value).toLowerCase());
    this._changeDayOfWeekValue();
    this._changeDayOfMonthValue();
    this._changeMonthOfYearValue();
    this._changeIntervalValue(e.interval);
    this._changeRepeatCountValue();
    this._changeRepeatEndValue();
    this._changeRepeatUntilValue();
  };
  p._changeIntervalValue = function (e) {
    this._recurrenceForm.getEditor("interval").option("value", e || 1);
  };
  p._changeRepeatEndValue = function () {
    var e = this._recurrenceRule.getRepeatEndRule();
    this._recurrenceForm.getEditor("repeatEnd").option("value", e);
  };
  p._changeDayOfWeekValue = function () {
    if (this._recurrenceForm.itemOption("byday").visible) {
      var e = this._daysOfWeekByRules();
      this.getEditorByField("byday").option("selectedItemKeys", e);
    }
  };
  p._changeDayOfMonthValue = function () {
    if (this._recurrenceForm.itemOption("bymonthday").visible) {
      var e = this._dayOfMonthByRules();
      this._recurrenceForm.getEditor("bymonthday").option("value", e);
    }
  };
  p._changeMonthOfYearValue = function () {
    if (this._recurrenceForm.itemOption("bymonth").visible) {
      var e = this._monthOfYearByRules();
      this._recurrenceForm.getEditor("bymonth").option("value", e);
    }
  };
  p._changeRepeatCountValue = function () {
    var e = this._recurrenceRule.getRules().count || 1;
    this._repeatCountEditor.option("value", e);
  };
  p._changeRepeatUntilValue = function () {
    this._repeatUntilDate.option("value", this._getUntilValue());
  };
  p._getUntilValue = function () {
    var e = this._recurrenceRule.getRules().until;
    if (!e) {
      return this._formatUntilDate(new Date());
    }
    var t = this.option("getStartDateTimeZone")();
    var n = t ? _.PathTimeZoneConversion.fromSourceToAppointment : _.PathTimeZoneConversion.fromSourceToGrid;
    return this.option("timeZoneCalculator").createDate(e, {
      path: n,
      appointmentTimeZone: t
    });
  };
  p.toggle = function () {
    this._freqEditor.focus();
  };
  p.setAria = function () {
    if (this._switchEditor) {
      this._switchEditor.setAria(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
    }
  };
  return i;
}(p.default);
(0, i.default)("dxRecurrenceEditor", E);
var O = E;
exports.default = O;
module.exports = exports.default;
module.exports.default = exports.default;