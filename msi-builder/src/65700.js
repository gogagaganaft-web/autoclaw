exports.default = undefined;
var i = require("./35922.js");
var o = ["normal", "hover", "selection", "selection"];
function a(e, t, n) {
  var o = t.border;
  var a = n.border;
  var r = (0, i.isDefined)(o.visible) ? o.visible : a.visible;
  var s = (0, i.isDefined)(o.width) ? o.width : a.width;
  return {
    fill: e,
    hatching: t.hatching,
    stroke: o.color || a.color,
    "stroke-width": r ? s : 0
  };
}
function r(e, t) {
  var n = t.data;
  this.code = 0;
  this.widget = e;
  this.figure = t.figure;
  this.argument = n.argument;
  this.value = n.value;
  this.data = n.dataItem;
  this.percent = t.percent;
  this.id = t.id;
  this.color = t.color;
  this.states = {
    normal: a(t.color, t.itemOptions, t.itemOptions),
    hover: a(t.color, t.itemOptions.hoverStyle, t.itemOptions),
    selection: a(t.color, t.itemOptions.selectionStyle, t.itemOptions)
  };
}
r.prototype = {
  getState: function () {
    return o[this.code];
  },
  getNormalStyle: function () {
    return this.states.normal;
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
      this.setState(1, e);
      this.widget._eventTrigger("hoverChanged", {
        item: this
      });
      this.widget._resume();
    }
  },
  setState: function (e, t) {
    if (t) {
      this.code |= e;
    } else {
      this.code &= ~e;
    }
    this.widget._applyTilesAppearance();
  },
  select: function (e) {
    var t = this.widget._getOption("selectionMode", true);
    if (t !== "none" && e !== this.isSelected()) {
      this.widget._suspend();
      if (e && t !== "multiple") {
        this.widget.clearSelection();
      }
      this.setState(2, e);
      this.widget._eventTrigger("selectionChanged", {
        item: this
      });
      this.widget._resume();
    }
  },
  showTooltip: function (e) {
    this.widget._showTooltip(this.id, e);
  },
  getColor: function () {
    return this.color;
  },
  isHovered: function () {
    return !!(this.code & 1);
  },
  isSelected: function () {
    return !!(this.code & 2);
  }
};
var s = r;
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;