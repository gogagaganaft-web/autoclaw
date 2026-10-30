exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./39661.js"));
var a = require("./13306.js");
var r = require("./35922.js");
var s = l(require("./99393.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = o.default.inherit({
  _getDefaultOptions: function () {
    return (0, a.extend)(this.callBase(), {
      value: 0,
      statusFormat: function (e) {
        return "Progress: " + Math.round(e * 100) + "%";
      },
      showStatus: true,
      onComplete: null,
      activeStateEnabled: false,
      statusPosition: "bottom left",
      _animatingSegmentCount: 0
    });
  },
  _defaultOptionsRules: function () {
    return this.callBase().concat([{
      device: function (e) {
        return e.platform === "android";
      },
      options: {
        _animatingSegmentCount: 2
      }
    }]);
  },
  _initMarkup: function () {
    this._renderStatus();
    this._createCompleteAction();
    this.callBase();
    this.$element().addClass("dx-progressbar");
    this._$wrapper.addClass("dx-progressbar-wrapper");
    this._$bar.addClass("dx-progressbar-container");
    this.setAria("role", "progressbar");
    (0, i.default)("<div>").addClass("dx-progressbar-range-container").appendTo(this._$wrapper).append(this._$bar);
    this._$range.addClass("dx-progressbar-range");
    this._toggleStatus(this.option("showStatus"));
  },
  _useTemplates: function () {
    return false;
  },
  _createCompleteAction: function () {
    this._completeAction = this._createActionByOption("onComplete");
  },
  _renderStatus: function () {
    this._$status = (0, i.default)("<div>").addClass("dx-progressbar-status");
  },
  _renderIndeterminateState: function () {
    this._$segmentContainer = (0, i.default)("<div>").addClass("dx-progressbar-animating-container");
    for (var e = this.option("_animatingSegmentCount"), t = 0; t < e; t++) {
      (0, i.default)("<div>").addClass("dx-progressbar-animating-segment").addClass("dx-progressbar-animating-segment-" + (t + 1)).appendTo(this._$segmentContainer);
    }
    this._$segmentContainer.appendTo(this._$wrapper);
  },
  _toggleStatus: function (e) {
    var t = this.option("statusPosition").split(" ");
    if (e) {
      if (t[0] === "top" || t[0] === "left") {
        this._$status.prependTo(this._$wrapper);
      } else {
        this._$status.appendTo(this._$wrapper);
      }
    } else {
      this._$status.detach();
    }
    this._togglePositionClass();
  },
  _togglePositionClass: function () {
    var e = this.option("statusPosition").split(" ");
    this._$wrapper.removeClass("dx-position-top-left dx-position-top-right dx-position-bottom-left dx-position-bottom-right dx-position-left dx-position-right");
    var t = "dx-position-" + e[0];
    if (e[1]) {
      t += "-" + e[1];
    }
    this._$wrapper.addClass(t);
  },
  _toggleIndeterminateState: function (e) {
    if (e) {
      this._renderIndeterminateState();
      this._$bar.toggle(false);
    } else {
      this._$bar.toggle(true);
      this._$segmentContainer.remove();
      delete this._$segmentContainer;
    }
  },
  _renderValue: function () {
    var e = this.option("value");
    var t = this.option("max");
    if (e || e === 0) {
      if (this._$segmentContainer) {
        this._toggleIndeterminateState(false);
      }
      if (e === t) {
        this._completeAction();
      }
      this.callBase();
      this._setStatus();
    } else {
      this._toggleIndeterminateState(true);
    }
  },
  _setStatus: function () {
    var e = this.option("statusFormat");
    var t = (e = (0, r.isFunction)(e) ? e.bind(this) : function (e) {
      return e;
    })(this._currentRatio, this.option("value"));
    this._$status.text(t);
  },
  _dispose: function () {
    this._$status.remove();
    this.callBase();
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "statusFormat":
        this._setStatus();
        break;
      case "showStatus":
        this._toggleStatus(e.value);
        break;
      case "statusPosition":
        this._toggleStatus(this.option("showStatus"));
        break;
      case "onComplete":
        this._createCompleteAction();
        break;
      case "_animatingSegmentCount":
        break;
      default:
        this.callBase(e);
    }
  }
});
(0, s.default)("dxProgressBar", u);
var d = u;
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;