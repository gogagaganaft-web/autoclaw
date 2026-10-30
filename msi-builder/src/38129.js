exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./55994.js"));
var a = require("./20576.js");
var r = l(require("./38377.js"));
var s = l(require("./91500.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = r.default.abstract;
var d = r.default.inherit({
  ctor: function (e) {
    this.dateBox = e;
  },
  widgetOption: function () {
    return this._widget && this._widget.option.apply(this._widget, arguments);
  },
  _renderWidget: function (e) {
    e = e || (0, i.default)("<div>");
    this._widget = this._createWidget(e);
    this._widget.$element().appendTo(this._getWidgetContainer());
  },
  _createWidget: function (e) {
    var t = this._getWidgetName();
    var n = this._getWidgetOptions();
    return this.dateBox._createComponent(e, t, n);
  },
  _getWidgetOptions: u,
  _getWidgetName: u,
  getDefaultOptions: function () {
    return {
      mode: "text"
    };
  },
  getDisplayFormat: u,
  supportedKeys: a.noop,
  getKeyboardListener: a.noop,
  customizeButtons: a.noop,
  getParsedText: function (e, t) {
    var n = s.default.parse(e, t);
    return n || s.default.parse(e);
  },
  renderInputMinMax: a.noop,
  renderOpenedState: function () {
    this._updateValue();
  },
  popupConfig: u,
  _dimensionChanged: function () {
    var e;
    if ((e = this._getPopup()) !== null && e !== undefined) {
      e.repaint();
    }
  },
  renderPopupContent: function () {
    var e = this._getPopup();
    this._renderWidget();
    var t = e.$content().parent();
    o.default.off(t, "mousedown");
    o.default.on(t, "mousedown", this._preventFocusOnPopup.bind(this));
  },
  getFirstPopupElement: a.noop,
  getLastPopupElement: a.noop,
  _preventFocusOnPopup: function (e) {
    e.preventDefault();
  },
  _getWidgetContainer: function () {
    return this._getPopup().$content();
  },
  _getPopup: function () {
    return this.dateBox._popup;
  },
  popupShowingHandler: a.noop,
  popupHiddenHandler: a.noop,
  _updateValue: function () {
    if (this._widget) {
      this._widget.option("value", this.dateBoxValue());
    }
  },
  useCurrentDateByDefault: a.noop,
  getDefaultDate: function () {
    return new Date();
  },
  textChangedHandler: a.noop,
  renderValue: function () {
    if (this.dateBox.option("opened")) {
      this._updateValue();
    }
  },
  getValue: function () {
    return this._widget.option("value");
  },
  isAdaptivityChanged: function () {
    return false;
  },
  dispose: function () {
    var e = this._getPopup();
    if (e) {
      e.$content().empty();
    }
  },
  dateBoxValue: function () {
    if (arguments.length) {
      return this.dateBox.dateValue.apply(this.dateBox, arguments);
    } else {
      return this.dateBox.dateOption.apply(this.dateBox, ["value"]);
    }
  }
});
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;