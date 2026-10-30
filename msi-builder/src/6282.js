exports.default = undefined;
var i = c(require("./68374.js"));
var o = c(require("./55994.js"));
var a = c(require("./20530.js"));
var r = require("./13306.js");
var s = c(require("./99393.js"));
var l = c(require("./96452.js"));
var u = require("./39611.js");
var d = require("./95429.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = l.default.inherit({
  _supportedKeys: function () {
    return (0, r.extend)(this.callBase(), {
      space: function (e) {
        e.preventDefault();
        this._clickAction({
          event: e
        });
      }
    });
  },
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      value: false
    });
  },
  _canValueBeChangedByClick: function () {
    return true;
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function () {
        return a.default.real().deviceType === "desktop" && !a.default.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _init: function () {
    this.callBase();
    this.$element().addClass("dx-radiobutton");
  },
  _initMarkup: function () {
    this.callBase();
    this._renderIcon();
    this._renderCheckedState(this.option("value"));
    this._renderClick();
    this.setAria("role", "radio");
  },
  _renderIcon: function () {
    this._$icon = (0, i.default)("<div>").addClass("dx-radiobutton-icon");
    (0, i.default)("<div>").addClass("dx-radiobutton-icon-dot").appendTo(this._$icon);
    this.$element().append(this._$icon);
  },
  _renderCheckedState: function (e) {
    this.$element().toggleClass("dx-radiobutton-checked", e).find(".dx-radiobutton-icon").toggleClass("dx-radiobutton-icon-checked", e);
    this.setAria("checked", e);
  },
  _renderClick: function () {
    var e = (0, u.addNamespace)(d.name, this.NAME);
    this._clickAction = this._createAction(function (e) {
      this._clickHandler(e.event);
    }.bind(this));
    o.default.off(this.$element(), e);
    o.default.on(this.$element(), e, function (e) {
      this._clickAction({
        event: e
      });
    }.bind(this));
  },
  _clickHandler: function (e) {
    this._saveValueChangeEvent(e);
    this.option("value", true);
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "value":
        this._renderCheckedState(e.value);
        this.callBase(e);
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, s.default)("dxRadioButton", h);
var f = h;
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;