exports.CompactAppointmentsHelper = undefined;
var i = g(require("./68374.js"));
var o = g(require("./63008.js"));
var a = require("./31648.js");
var r = g(require("./28109.js"));
var s = require("./68494.js");
var l = require("./62754.js");
var u = require("./13306.js");
var d = require("./37518.js");
var c = require("./6678.js");
var h = require("./27728.js");
var f = require("./5480.js");
var p = require("./86553.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = function () {
  function e(e) {
    this.instance = e;
    this.elements = [];
  }
  var t = e.prototype;
  t.render = function (e) {
    var t = e.isCompact;
    var n = e.items;
    var i = e.buttonColor;
    var o = this._createTemplate(n.data.length, t);
    var a = this._createCompactButton(o, e).$element();
    this._makeBackgroundColor(a, n.colors, i);
    this._makeBackgroundDarker(a);
    this.elements.push(a);
    a.data("items", this._createTooltipInfos(n));
    return a;
  };
  t.clear = function () {
    this.elements.forEach(function (e) {
      e.detach();
      e.remove();
    });
    this.elements = [];
  };
  t._createTooltipInfos = function (e) {
    var t = this;
    return e.data.map(function (n, i) {
      var a = (0, f.createAppointmentAdapter)(n, t.instance._dataAccessors, t.instance.timeZoneCalculator).clone();
      if (e.settings?.length > 0) {
        var r = e.settings[i].info;
        a.startDate = r.sourceAppointment.startDate;
        a.endDate = r.sourceAppointment.endDate;
      }
      return new c.AppointmentTooltipInfo(n, a.source(), e.colors[i], e.settings[i]);
    });
  };
  t._onButtonClick = function (e, t) {
    var n = (0, i.default)(e.element);
    this.instance.showAppointmentTooltipCore(n, n.data("items"), this._getExtraOptionsForTooltip(t, n));
  };
  t._getExtraOptionsForTooltip = function (e, t) {
    return {
      clickEvent: this._clickEvent(e.onAppointmentClick).bind(this),
      dragBehavior: e.allowDrag && this._createTooltipDragBehavior(t).bind(this),
      dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
      isButtonClick: true
    };
  };
  t._clickEvent = function (e) {
    var t = this;
    return function (n) {
      var i = {
        itemData: n.itemData.appointment,
        itemElement: n.itemElement,
        targetedAppointment: n.itemData.targetedAppointment
      };
      var o = (0, u.extendFromObject)(t.instance.fire("mapAppointmentFields", i), n, false);
      delete o.itemData;
      delete o.itemIndex;
      delete o.itemElement;
      e(o);
    };
  };
  t._createTooltipDragBehavior = function (e) {
    var t = this;
    return function (n) {
      var o = (0, i.default)(n.element);
      var r = (0, i.default)(t.instance.element());
      var s = t.instance.getWorkSpace();
      var l = (0, a.locate)(e);
      var u = {
        filter: `.${h.LIST_ITEM_CLASS}`,
        isSetCursorOffset: true,
        initialPosition: l,
        getItemData: function (e) {
          return (0, i.default)(e).data(h.LIST_ITEM_DATA_KEY)?.appointment;
        },
        getItemSettings: function (e, t) {
          return t.itemSettings;
        }
      };
      s._createDragBehaviorBase(o, r, u);
    };
  };
  t._getCollectorOffset = function (e, t) {
    return t - e - this._getCollectorRightOffset();
  };
  t._getCollectorRightOffset = function () {
    if (this.instance.getRenderingStrategyInstance()._isCompactTheme()) {
      return 1;
    } else {
      return 5;
    }
  };
  t._makeBackgroundDarker = function (e) {
    e.css("boxShadow", `inset ${(0, d.getBoundingRect)(e.get(0)).width}px 0 0 0 rgba(0, 0, 0, 0.3)`);
  };
  t._makeBackgroundColor = function (e, t, n) {
    l.when.apply(null, t).done(function () {
      this._makeBackgroundColorCore(e, n, Array.prototype.slice.call(arguments));
    }.bind(this));
  };
  t._makeBackgroundColorCore = function (e, t, n) {
    if (t) {
      t.done(function (t) {
        var i = (0, p.getOverflowIndicatorColor)(t, n);
        if (i) {
          e.css("backgroundColor", i);
        }
      });
    }
  };
  t._setPosition = function (e, t) {
    (0, a.move)(e, {
      top: t.top,
      left: t.left
    });
  };
  t._createCompactButton = function (e, t) {
    var n = this;
    var i = this._createCompactButtonElement(t);
    return this.instance._createComponent(i, o.default, {
      type: "default",
      width: t.width,
      height: t.height,
      onClick: function (e) {
        return n._onButtonClick(e, t);
      },
      template: this._renderTemplate(e, t.items, t.isCompact)
    });
  };
  t._createCompactButtonElement = function (e) {
    var t = e.isCompact;
    var n = e.$container;
    var o = e.coordinates;
    var a = (0, i.default)("<div>").addClass("dx-scheduler-appointment-collector").toggleClass("dx-scheduler-appointment-collector-compact", t).appendTo(n);
    this._setPosition(a, o);
    return a;
  };
  t._renderTemplate = function (e, t, n) {
    return new s.FunctionTemplate(function (i) {
      return e.render({
        model: {
          appointmentCount: t.data.length,
          isCompact: n
        },
        container: i.container
      });
    });
  };
  t._createTemplate = function (e, t) {
    this._initButtonTemplate(e, t);
    return this.instance._getAppointmentTemplate("appointmentCollectorTemplate");
  };
  t._initButtonTemplate = function (e, t) {
    var n = this;
    this.instance._templateManager.addDefaultTemplates({
      appointmentCollector: new s.FunctionTemplate(function (o) {
        return n._createButtonTemplate(e, (0, i.default)(o.container), t);
      })
    });
  };
  t._createButtonTemplate = function (e, t, n) {
    var o = n ? e : r.default.getFormatter("dxScheduler-moreAppointments")(e);
    return t.append((0, i.default)("<span>").text(o)).addClass("dx-scheduler-appointment-collector-content");
  };
  return e;
}();
exports.CompactAppointmentsHelper = m;