exports.default = undefined;
var i = u(require("./68374.js"));
var o = u(require("./73176.js"));
var a = u(require("./99393.js"));
var r = require("./13306.js");
var s = u(require("./17287.js"));
var l = require("./35922.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = s.default.inherit({
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      toolbarItems: [],
      showCloseButton: false,
      enableBodyScroll: true,
      showTitle: false,
      title: null,
      titleTemplate: null,
      onTitleRendered: null,
      bottomTemplate: null,
      preventScrollEvents: false,
      propagateOutsideClick: true
    });
  },
  _render: function () {
    this.$element().addClass("dx-tooltip");
    this.$wrapper().addClass("dx-tooltip-wrapper");
    this.callBase();
  },
  _renderContent: function () {
    this.callBase();
    this._contentId = "dx-" + new o.default();
    this.$overlayContent().attr({
      id: this._contentId
    });
    this._toggleAriaDescription(true);
  },
  _toggleAriaDescription: function (e) {
    var t = (0, i.default)(this.option("target"));
    var n = e ? this._contentId : undefined;
    if (!(0, l.isWindow)(t.get(0))) {
      this.setAria("describedby", n, t);
    }
  }
});
(0, a.default)("dxTooltip", d);
var c = d;
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;