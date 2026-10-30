exports.default = undefined;
var i = require("./35922.js");
var o = require("./19157.js");
var a = ["normal", "hover"];
function r(e, t, n) {
  var o = t.border;
  var a = n.border;
  var r = (0, i.isDefined)(o.visible) ? o.visible : a.visible;
  var s = (0, i.isDefined)(o.width) ? o.width : a.width;
  var l = (0, i.isDefined)(o.opacity) ? o.opacity : (0, i.isDefined)(a.opacity) ? a.opacity : 1;
  var u = (0, i.isDefined)(t.opacity) ? t.opacity : (0, i.isDefined)(n.opacity) ? n.opacity : 1;
  return {
    fill: t.color || e,
    "stroke-width": r ? s : 0,
    stroke: t.border.color || n.border.color,
    "stroke-opacity": l,
    opacity: u,
    hatching: t.hatching
  };
}
function s(e, t) {
  var n = e._renderer.getRootOffset();
  this.code = 0;
  this.widget = e;
  this.color = t.color;
  this.options = t.options;
  this.rect = t.rect;
  this.label = this.title = t.rect._name;
  this.coords = {
    x: t.rect.x + t.rect.width / 2 + n.left,
    y: t.rect.y + t.rect.height / 2 + n.top
  };
  this.id = t.id;
  this.linksIn = t.linksIn;
  this.linksOut = t.linksOut;
  this.states = {
    normal: r(this.color, this.options, this.options),
    hover: r(this.color, this.options.hoverStyle, this.options)
  };
}
s.prototype = {
  compileAttrs: function () {
    return r(this.color, this.options);
  },
  getState: function () {
    return a[this.code];
  },
  isHovered: function () {
    return !!(this.code & 1);
  },
  setState: function (e, t) {
    var n = this;
    if (t) {
      this.code |= e;
    } else {
      this.code &= ~e;
    }
    if (t) {
      this.linksIn.concat(this.linksOut).forEach(function (e) {
        n.widget._links[e.index].setAdjacentNodeHover(true);
      });
    } else {
      this.widget._links.forEach(function (e) {
        if (e.isAdjacentNodeHovered()) {
          e.adjacentNodeHover(false);
        }
      });
      this.hideTooltip();
    }
    this.widget._applyNodesAppearance();
    this.widget._applyLinksAppearance();
  },
  hover: function (e) {
    if (this.widget._getOption("hoverEnabled", true) && e !== this.isHovered()) {
      this.widget._suspend();
      if (e) {
        this.widget.clearHover();
      }
      this.setState(1, e);
      this.widget._eventTrigger("nodeHoverChanged", {
        target: this
      });
      this.widget._resume();
    }
  },
  setHover: function () {
    this.hover(true);
  },
  showTooltip: function (e) {
    if (this.widget._getOption("hoverEnabled", true) && this.widget._tooltip) {
      this.widget._tooltip.show({
        type: "node",
        info: {
          label: this.label,
          title: this.label,
          weightIn: this.linksIn.reduce(function (e, t) {
            return e + t.weight;
          }, 0),
          weightOut: this.linksOut.reduce(function (e, t) {
            return e + t.weight;
          }, 0)
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
  },
  getLabelAttributes: function (e, t) {
    return function (e, t, n) {
      var a = o.patchFontOptions;
      if (e.useNodeColors) {
        e.font.color = n.color;
      }
      var r = !!(0, i.isDefined)(e.border.visible) && e.border.visible;
      var s = (0, i.isDefined)(e.border.width) ? e.border.width : 0;
      var l = (0, i.isDefined)(e.border.color) ? e.border.color : e.font.color;
      var u = (0, i.isDefined)(e.border.opacity) ? e.border.opacity : 1;
      var d = {
        filter: t
      };
      if (r && s) {
        d.stroke = l;
        d["stroke-width"] = r ? s : 0;
        d["stroke-opacity"] = u;
      }
      return {
        attr: d,
        css: a(e.font)
      };
    }(e, t, this);
  }
};
var l = s;
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;