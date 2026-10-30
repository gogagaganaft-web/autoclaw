exports.default = undefined;
var i = p(require("./68374.js"));
var o = p(require("./73349.js"));
var a = p(require("./55994.js"));
var r = p(require("./24311.js"));
var s = require("./31648.js");
var l = p(require("./14390.js"));
var u = require("./39611.js");
var d = require("./20576.js");
var c = require("./35922.js");
var h = require("./13306.js");
var f = p(require("./93786.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var g = `dx-scrollable-scrollbar-active`;
var m = "onScroll";
var _ = "onHover";
var v = "always";
var y = "never";
var b = null;
var x = l.default.inherit({
  _getDefaultOptions: function () {
    return (0, h.extend)(this.callBase(), {
      direction: null,
      visible: false,
      activeStateEnabled: false,
      visibilityMode: m,
      containerSize: 0,
      contentSize: 0,
      expandable: true,
      scaleRatio: 1
    });
  },
  _init: function () {
    this.callBase();
    this._isHovered = false;
  },
  _initMarkup: function () {
    this._renderThumb();
    this.callBase();
  },
  _render: function () {
    this.callBase();
    this._renderDirection();
    this._update();
    this._attachPointerDownHandler();
    this.option("hoverStateEnabled", this._isHoverMode());
    this.$element().toggleClass("dx-scrollbar-hoverable", this.option("hoverStateEnabled"));
  },
  _renderThumb: function () {
    this._$thumb = (0, i.default)("<div>").addClass("dx-scrollable-scroll");
    (0, i.default)("<div>").addClass("dx-scrollable-scroll-content").appendTo(this._$thumb);
    this.$element().addClass("dx-scrollable-scrollbar").append(this._$thumb);
  },
  isThumb: function (e) {
    return !!this.$element().find(e).length;
  },
  _isHoverMode: function () {
    var e = this.option("visibilityMode");
    return (e === _ || e === v) && this.option("expandable");
  },
  _renderDirection: function () {
    var e = this.option("direction");
    this.$element().addClass("dx-scrollbar-" + e);
    this._dimension = e === "horizontal" ? "width" : "height";
    this._prop = e === "horizontal" ? "left" : "top";
  },
  _attachPointerDownHandler: function () {
    a.default.on(this._$thumb, (0, u.addNamespace)(f.default.down, "dxScrollbar"), this.feedbackOn.bind(this));
  },
  feedbackOn: function () {
    this.$element().addClass(g);
    b = this;
  },
  feedbackOff: function () {
    this.$element().removeClass(g);
    b = null;
  },
  cursorEnter: function () {
    this._isHovered = true;
    if (this._needScrollbar()) {
      this.option("visible", true);
    }
  },
  cursorLeave: function () {
    this._isHovered = false;
    this.option("visible", false);
  },
  _renderDimensions: function () {
    this._$thumb.css({
      width: this.option("width"),
      height: this.option("height")
    });
  },
  _toggleVisibility: function (e) {
    if (this.option("visibilityMode") === m) {
      this._$thumb.css("opacity");
    }
    e = this._adjustVisibility(e);
    this.option().visible = e;
    this._$thumb.toggleClass("dx-state-invisible", !e);
  },
  _adjustVisibility: function (e) {
    if (this._baseContainerToContentRatio && !this._needScrollbar()) {
      return false;
    }
    switch (this.option("visibilityMode")) {
      case m:
        break;
      case _:
        e = e || !!this._isHovered;
        break;
      case y:
        e = false;
        break;
      case v:
        e = true;
    }
    return e;
  },
  moveTo: function (e) {
    if (!this._isHidden()) {
      if ((0, c.isPlainObject)(e)) {
        e = e[this._prop] || 0;
      }
      var t = {};
      t[this._prop] = this._calculateScrollBarPosition(e);
      (0, s.move)(this._$thumb, t);
    }
  },
  _calculateScrollBarPosition: function (e) {
    return -e * this._thumbRatio;
  },
  _update: function () {
    var e = Math.round(this.option("containerSize"));
    var t = Math.round(this.option("contentSize"));
    var n = Math.round(this.option("baseContainerSize"));
    var i = Math.round(this.option("baseContentSize"));
    if (isNaN(n)) {
      n = e;
      i = t;
    }
    this._baseContainerToContentRatio = i ? n / i : n;
    this._realContainerToContentRatio = t ? e / t : e;
    var o = Math.round(Math.max(Math.round(e * this._realContainerToContentRatio), 15));
    this._thumbRatio = (e - o) / (this.option("scaleRatio") * (t - e));
    this.option(this._dimension, o / this.option("scaleRatio"));
    this.$element().css("display", this._needScrollbar() ? "" : "none");
  },
  _isHidden: function () {
    return this.option("visibilityMode") === y;
  },
  _needScrollbar: function () {
    return !this._isHidden() && this._baseContainerToContentRatio < 1;
  },
  containerToContentRatio: function () {
    return this._realContainerToContentRatio;
  },
  _normalizeSize: function (e) {
    if ((0, c.isPlainObject)(e)) {
      return e[this._dimension] || 0;
    } else {
      return e;
    }
  },
  _clean: function () {
    this.callBase();
    if (this === b) {
      b = null;
    }
    a.default.off(this._$thumb, ".dxScrollbar");
  },
  _optionChanged: function (e) {
    if (!this._isHidden()) {
      switch (e.name) {
        case "containerSize":
        case "contentSize":
          this.option()[e.name] = this._normalizeSize(e.value);
          this._update();
          break;
        case "baseContentSize":
        case "baseContainerSize":
          this._update();
          break;
        case "visibilityMode":
        case "direction":
          this._invalidate();
          break;
        case "scaleRatio":
          this._update();
          break;
        default:
          this.callBase.apply(this, arguments);
      }
    }
  },
  update: (0, d.deferRenderer)(function () {
    if (this._adjustVisibility()) {
      this.option("visible", true);
    }
  })
});
r.default.add(function () {
  a.default.subscribeGlobal(o.default.getDocument(), (0, u.addNamespace)(f.default.up, "dxScrollbar"), function () {
    if (b) {
      b.feedbackOff();
    }
  });
});
var w = x;
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;