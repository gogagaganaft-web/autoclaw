exports.TooltipStrategyBase = undefined;
var i = s(require("./63008.js"));
var o = require("./68494.js");
var a = s(require("./68374.js"));
var r = s(require("./77834.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e) {
  return (l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function u(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (l(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (l(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (l(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var d = function () {
  function e(e) {
    this._tooltip = null;
    this._options = e;
    this._extraOptions = null;
  }
  var t = e.prototype;
  t.show = function (e, t, n) {
    if (this._canShowTooltip(t)) {
      this.hide();
      this._extraOptions = n;
      this._showCore(e, t);
    }
  };
  t._showCore = function (e, t) {
    if (this._tooltip) {
      if (this._shouldUseTarget()) {
        this._tooltip.option("target", e);
      }
      this._list.option("dataSource", t);
    } else {
      this._tooltip = this._createTooltip(e, t);
    }
    this._prepareBeforeVisibleChanged(t);
    this._tooltip.option("visible", true);
  };
  t._prepareBeforeVisibleChanged = function (e) {};
  t._getContentTemplate = function (e) {
    var t = this;
    return function (n) {
      var i = (0, a.default)("<div>");
      (0, a.default)(n).append(i);
      t._list = t._createList(i, e);
    };
  };
  t.isAlreadyShown = function (e) {
    if (this._tooltip && this._tooltip.option("visible")) {
      return this._tooltip.option("target")[0] === e[0];
    }
  };
  t._onShown = function () {
    this._list.option("focusStateEnabled", this._extraOptions.focusStateEnabled);
  };
  t.dispose = function () {};
  t.hide = function () {
    if (this._tooltip) {
      this._tooltip.option("visible", false);
    }
  };
  t._shouldUseTarget = function () {
    return true;
  };
  t._createTooltip = function () {};
  t._canShowTooltip = function (e) {
    return !!e.length;
  };
  t._createListOption = function (e) {
    var t = this;
    return {
      dataSource: e,
      onContentReady: this._onListRender.bind(this),
      onItemClick: function (e) {
        return t._onListItemClick(e);
      },
      itemTemplate: function (e, n) {
        return t._renderTemplate(e.appointment, e.targetedAppointment, n, e.color);
      },
      _swipeEnabled: false,
      pageLoadMode: "scrollBottom"
    };
  };
  t._onListRender = function () {};
  t._createTooltipElement = function (e) {
    return (0, a.default)("<div>").appendTo(this._options.container).addClass(e);
  };
  t._createList = function (e, t) {
    return this._options.createComponent(e, r.default, this._createListOption(t));
  };
  t._renderTemplate = function (e, t, n, i) {
    var r = this._createItemListContent(e, t, i);
    this._options.addDefaultTemplates(u({}, this._getItemListTemplateName(), new o.FunctionTemplate(function (e) {
      var t = (0, a.default)(e.container);
      t.append(r);
      return t;
    })));
    var s = this._options.getAppointmentTemplate(this._getItemListTemplateName() + "Template");
    return this._createFunctionTemplate(s, e, t, n);
  };
  t._createFunctionTemplate = function (e, t, n, i) {
    var a = !!this._extraOptions.isButtonClick;
    var r = this._isEmptyDropDownAppointmentTemplate();
    return new o.FunctionTemplate(function (o) {
      return e.render({
        model: r ? {
          appointmentData: t,
          targetedAppointmentData: n,
          isButtonClicked: a
        } : t,
        container: o.container,
        index: i
      });
    });
  };
  t._getItemListTemplateName = function () {
    if (this._isEmptyDropDownAppointmentTemplate()) {
      return "appointmentTooltip";
    } else {
      return "dropDownAppointment";
    }
  };
  t._isEmptyDropDownAppointmentTemplate = function () {
    return !this._extraOptions.dropDownAppointmentTemplate || this._extraOptions.dropDownAppointmentTemplate === "dropDownAppointment";
  };
  t._onListItemClick = function (e) {
    this.hide();
    if (this._extraOptions.clickEvent) {
      this._extraOptions.clickEvent(e);
    }
    this._options.showAppointmentPopup(e.itemData.appointment, false, e.itemData.targetedAppointment);
  };
  t._createItemListContent = function (e, t, n) {
    var i = this._extraOptions.editing;
    var o = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item");
    o.append(this._createItemListMarker(n));
    o.append(this._createItemListInfo(this._options.createFormattedDateText(e, t)));
    if (!this._options.getAppointmentDisabled(e) && (i && i.allowDeleting === true || i === true)) {
      o.append(this._createDeleteButton(e, t));
    }
    return o;
  };
  t._createItemListMarker = function (e) {
    var t = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item-marker");
    var n = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item-marker-body");
    t.append(n);
    if (e) {
      e.done(function (e) {
        return n.css("background", e);
      });
    }
    return t;
  };
  t._createItemListInfo = function (e) {
    var t = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item-content");
    var n = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item-content-subject").text(e.text);
    var i = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item-content-date").text(e.formatDate);
    return t.append(n).append(i);
  };
  t._createDeleteButton = function (e, t) {
    var n = this;
    var o = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item-delete-button-container");
    var r = (0, a.default)("<div>").addClass("dx-tooltip-appointment-item-delete-button");
    o.append(r);
    this._options.createComponent(r, i.default, {
      icon: "trash",
      stylingMode: "text",
      onClick: function (i) {
        n.hide();
        i.event.stopPropagation();
        n._options.checkAndDeleteAppointment(e, t);
      }
    });
    return o;
  };
  return e;
}();
exports.TooltipStrategyBase = d;