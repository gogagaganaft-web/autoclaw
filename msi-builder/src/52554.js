exports.default = undefined;
var i = s(require("./94920.js"));
var o = require("./13306.js");
var a = require("./73437.js");
var r = s(require("./18016.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var l = i.default.inherit({
  _getDefaultOptions: function () {
    return (0, o.extend)(this.callBase(), {
      visible: false,
      position: "top",
      hideOnOutsideClick: false,
      hideTopOverlayHandler: null,
      hideOnParentScroll: false,
      animation: null,
      arrowPosition: null,
      templatesRenderAsynchronously: false,
      _fixWrapperPosition: false,
      useResizeObserver: false,
      showMode: "onHover",
      format: function (e) {
        return e;
      },
      value: 0
    });
  },
  _initMarkup: function () {
    this.callBase();
    this._attachToMarkup(this.option("visible"));
    this._toggleShowModeClass();
  },
  _renderContent: function () {
    this.callBase();
    this._renderContentText();
  },
  _renderContentText: function () {
    var e = this.option();
    var t = e.value;
    var n = e.format;
    var i = r.default.format(t ?? 0, n);
    this.$content().text(i);
    this._renderPosition();
  },
  _toggleShowModeClass: function () {
    var e = this.option("showMode") === "onHover";
    this.option("target").toggleClass("dx-slider-tooltip-visible-on-hover", e);
  },
  _initPositionController: function () {
    this._positionController = new a.SliderTooltipPositionController(this._getPositionControllerConfig());
  },
  _attachToMarkup: function (e) {
    var t = this.option("target");
    if (e) {
      this.$element().appendTo(t);
    } else {
      this.$element().detach();
    }
  },
  _optionChanged: function (e) {
    var t = e.name;
    var n = e.value;
    switch (t) {
      case "visible":
        this._attachToMarkup(n);
        this.callBase(e);
        break;
      case "showMode":
        this._toggleShowModeClass();
        break;
      case "format":
      case "value":
        this._renderContentText();
        break;
      default:
        this.callBase(e);
    }
  },
  updatePosition: function () {
    this._renderPosition();
  }
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;