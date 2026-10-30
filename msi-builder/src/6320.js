exports.default = undefined;
var i = s(require("./68374.js"));
var o = s(require("./14390.js"));
var a = s(require("./52554.js"));
var r = require("./13306.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = o.default.inherit({
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      hoverStateEnabled: false,
      value: 0,
      tooltip: {
        enabled: false,
        format: function (e) {
          return e;
        },
        position: "top",
        showMode: "onHover"
      }
    });
  },
  _initMarkup: function () {
    this.callBase();
    this.$element().addClass("dx-slider-handle");
    this.setAria({
      role: "slider",
      valuenow: this.option("value")
    });
  },
  _render: function () {
    this.callBase();
    this._renderTooltip();
  },
  _renderTooltip: function () {
    var e = this.option();
    var t = e.tooltip;
    var n = e.value;
    var o = t.position;
    var r = t.format;
    var s = t.enabled;
    var l = t.showMode;
    var u = (0, i.default)("<div>");
    this._sliderTooltip = this._createComponent(u, a.default, {
      target: this.$element(),
      container: u,
      position: o,
      visible: s,
      showMode: l,
      format: r,
      value: n
    });
  },
  _clean: function () {
    this.callBase();
    this._sliderTooltip = null;
  },
  _updateTooltipOptions: function (e) {
    var t;
    var n = o.default.getOptionsFromContainer(e);
    this._setWidgetOption("_sliderTooltip", [n]);
    if ((t = this._sliderTooltip) !== null && t !== undefined) {
      t.option("visible", n.enabled);
    }
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    switch (t) {
      case "value":
        var i;
        if ((i = this._sliderTooltip) !== null && i !== undefined) {
          i.option("value", n);
        }
        this.setAria("valuenow", n);
        break;
      case "tooltip":
        this._updateTooltipOptions(e);
        break;
      default:
        this.callBase(e);
    }
  },
  updateTooltipPosition: function () {
    var e;
    if ((e = this._sliderTooltip) !== null && e !== undefined) {
      e.updatePosition();
    }
  },
  repaint: function () {
    var e;
    if ((e = this._sliderTooltip) !== null && e !== undefined) {
      e.repaint();
    }
  }
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;