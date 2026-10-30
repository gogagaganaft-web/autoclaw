exports.default = undefined;
var i = require("./74878.js");
var o = require("./35922.js");
var a = ["normal", "adjacentNodeHover", "hover"];
function r(e, t, n, a) {
  var r = t.border;
  var s = n.border;
  var l = (0, o.isDefined)(r.visible) ? r.visible : s.visible;
  var u = (0, o.isDefined)(r.width) ? r.width : s.width;
  var d = (0, o.isDefined)(r.opacity) ? r.opacity : (0, o.isDefined)(s.opacity) ? s.opacity : 1;
  var c = (0, o.isDefined)(t.opacity) ? t.opacity : (0, o.isDefined)(n.opacity) ? n.opacity : 1;
  var h = t.color || e;
  if (n.colorMode === i.COLOR_MODE_TARGET || n.colorMode === i.COLOR_MODE_SOURCE) {
    h = e;
  } else if (n.colorMode === i.COLOR_MODE_GRADIENT && a && (0, o.isDefined)(a.id)) {
    h = a.id;
  }
  return {
    fill: h,
    "stroke-width": l ? u : 0,
    stroke: t.border.color || n.border.color,
    "stroke-opacity": d,
    opacity: c,
    hatching: t.hatching
  };
}
function s(e, t) {
  var n = e._renderer.getRootOffset();
  this.code = 0;
  this.widget = e;
  this.color = t.color;
  this.connection = t.connection;
  this.d = t.d;
  this.options = t.options;
  this.boundingRect = t.boundingRect;
  this.coords = {
    x: t.boundingRect.x + t.boundingRect.width / 2 + n.left,
    y: t.boundingRect.y + t.boundingRect.height / 2 + n.top
  };
  this.states = {
    normal: r(this.color, this.options, this.options, t.gradient),
    adjacentNodeHover: r(this.color, {
      opacity: 0,
      border: {}
    }, this.options, t.gradient),
    hover: r(this.color, {
      opacity: 0,
      border: {}
    }, this.options, t.gradient)
  };
  this.overlayStates = {
    normal: r(this.color, {
      opacity: 0,
      border: {}
    }, this.options),
    adjacentNodeHover: r(this.color, this.options.hoverStyle, this.options),
    hover: r(this.color, this.options.hoverStyle, this.options)
  };
}
s.prototype = {
  getState: function () {
    return a[this.code];
  },
  isHovered: function () {
    return this.code === 2;
  },
  isAdjacentNodeHovered: function () {
    return this.code === 1;
  },
  setState: function (e, t) {
    if (t) {
      this.code = e;
    } else {
      this.code = 0;
      this.hideTooltip();
    }
    this.widget._applyLinksAppearance();
  },
  setHover: function () {
    this.hover(true);
  },
  hover: function (e) {
    if (this.widget._getOption("hoverEnabled", true) && e !== this.isHovered()) {
      this.widget._suspend();
      if (e) {
        this.widget.clearHover();
      }
      this.setState(2, e);
      this.widget._eventTrigger("linkHoverChanged", {
        target: this
      });
      this.widget._resume();
    }
  },
  adjacentNodeHover: function (e) {
    if (this.widget._getOption("hoverEnabled", true) && e !== this.isAdjacentNodeHovered()) {
      this.widget._suspend();
      this.setState(1, e);
      this.widget._resume();
    }
  },
  setAdjacentNodeHover: function () {
    this.adjacentNodeHover(true);
  },
  showTooltip: function (e) {
    if (this.widget._getOption("hoverEnabled", true) && this.widget._tooltip) {
      this.widget._tooltip.show({
        type: "link",
        info: {
          source: this.connection.source,
          target: this.connection.target,
          weight: this.connection.weight
        }
      }, e !== undefined ? {
        x: e[0],
        y: e[1]
      } : this.coords);
    }
  },
  hideTooltip: function () {
    if (this.widget._tooltip) {
      this.widget._tooltip.hide();
    }
  }
};
var l = s;
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;