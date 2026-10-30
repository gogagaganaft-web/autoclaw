exports.default = undefined;
var i = u(require("./68374.js"));
var o = u(require("./96452.js"));
var a = u(require("./99393.js"));
var r = require("./13306.js");
var s = require("./58201.js");
var l = u(require("./87209.js"));
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = o.default.inherit({
  _getDefaultOptions: function () {
    return (0, r.extend)(this.callBase(), {
      min: 0,
      max: 100,
      value: 0
    });
  },
  _initMarkup: function () {
    this.$element().addClass("dx-trackbar");
    this._renderWrapper();
    this._renderContainer();
    this._renderRange();
    this._renderValue();
    this._setRangeStyles();
    this.callBase();
  },
  _render: function () {
    this.callBase();
    this._setRangeStyles(this._rangeStylesConfig());
  },
  _renderWrapper: function () {
    this._$wrapper = (0, i.default)("<div>").addClass("dx-trackbar-wrapper").appendTo(this.$element());
  },
  _renderContainer: function () {
    this._$bar = (0, i.default)("<div>").addClass("dx-trackbar-container").appendTo(this._$wrapper);
  },
  _renderRange: function () {
    this._$range = (0, i.default)("<div>").addClass("dx-trackbar-range").appendTo(this._$bar);
  },
  _renderValue: function () {
    var e = this.option("value");
    var t = this.option("min");
    var n = this.option("max");
    if (!(t > n)) {
      if (e < t) {
        this.option("value", t);
        this._currentRatio = 0;
        return;
      }
      if (e > n) {
        this.option("value", n);
        this._currentRatio = 1;
        return;
      }
      var i = t === n ? 0 : (e - t) / (n - t);
      if (!this._needPreventAnimation) {
        this._setRangeStyles({
          width: i * 100 + "%"
        });
      }
      this.setAria({
        valuemin: this.option("min"),
        valuemax: n,
        valuenow: e
      });
      this._currentRatio = i;
    }
  },
  _rangeStylesConfig: function () {
    return {
      width: this._currentRatio * 100 + "%"
    };
  },
  _setRangeStyles: function (e) {
    l.default.stop(this._$range);
    if (e) {
      if (!this._needPreventAnimation && (0, s.hasWindow)()) {
        l.default.animate(this._$range, {
          type: "custom",
          duration: 100,
          to: e
        });
      }
    } else {
      this._$range.css({
        width: 0
      });
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "value":
        this._renderValue();
        this.callBase(e);
        break;
      case "max":
      case "min":
        this._renderValue();
        break;
      default:
        this.callBase(e);
    }
  },
  _dispose: function () {
    l.default.stop(this._$range);
    this.callBase();
  }
});
(0, a.default)("dxTrackBar", d);
var c = d;
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;