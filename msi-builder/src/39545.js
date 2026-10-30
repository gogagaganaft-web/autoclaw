exports.DesktopTooltipStrategy = undefined;
var i;
var o = require("./25359.js");
var a = (i = require("./94920.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./60137.js");
function s(e, t) {
  return (s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var l = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  s(t, n);
  var o = i.prototype;
  o._prepareBeforeVisibleChanged = function (e) {
    this._tooltip.option("position", {
      my: "bottom",
      at: "top",
      boundary: this._getBoundary(e),
      offset: this._extraOptions.offset,
      collision: "fit flipfit"
    });
  };
  o._getBoundary = function (e) {
    if (this._options.isAppointmentInAllDayPanel(e[0].appointment)) {
      return this._options.container;
    } else {
      return this._options.getScrollableContainer();
    }
  };
  o._onShown = function () {
    e.prototype._onShown.call(this);
    if (this._extraOptions.isButtonClick) {
      this._list.focus();
      this._list.option("focusedElement", null);
    }
  };
  o._createListOption = function (t, n) {
    var i = e.prototype._createListOption.call(this, t, n);
    i.showScrollbar = r.touch ? "always" : "onHover";
    return i;
  };
  o._createTooltip = function (e, t) {
    var n = this._createTooltipElement("dx-scheduler-appointment-tooltip-wrapper");
    return this._options.createComponent(n, a.default, {
      target: e,
      maxHeight: 200,
      rtlEnabled: this._extraOptions.rtlEnabled,
      onShown: this._onShown.bind(this),
      contentTemplate: this._getContentTemplate(t),
      wrapperAttr: {
        class: "dx-scheduler-appointment-tooltip-wrapper"
      }
    });
  };
  o._onListRender = function (e) {
    return this._extraOptions.dragBehavior && this._extraOptions.dragBehavior(e);
  };
  return i;
}(o.TooltipStrategyBase);
exports.DesktopTooltipStrategy = l;