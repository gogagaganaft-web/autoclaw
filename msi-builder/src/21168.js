exports.default = undefined;
var i = require("./13306.js");
function o() {}
var a = [function (e, t) {
  e.smartAttr(t);
}, function (e, t) {
  e.outer.attr({
    stroke: t.stroke,
    "stroke-width": t["stroke-width"],
    "stroke-opacity": t["stroke-opacity"]
  });
  e.inner.smartAttr({
    fill: t.fill,
    opacity: t.opacity,
    hatching: t.hatching
  });
}];
(0, i.extend)(o.prototype, {
  value: 0,
  isNode: function () {
    return !!this.nodes && !!(this.level < this.ctx.maxLevel);
  },
  isActive: function () {
    var e = this.ctx;
    return this.level >= e.minLevel && this.level <= e.maxLevel;
  },
  updateStyles: function () {
    var e = Number(this.isNode());
    this.state = this._buildState(this.ctx.settings[e].state, !e && this.color && {
      fill: this.color
    });
  },
  _buildState: function (e, t) {
    var n = (0, i.extend)({}, e);
    if (t) {
      return (0, i.extend)(n, t);
    } else {
      return n;
    }
  },
  updateLabelStyle: function () {
    var e = this.ctx.settings[Number(this.isNode())];
    this.labelState = e.labelState;
    this.labelParams = e.labelParams;
  },
  _getState: function () {
    return this.state;
  },
  applyState: function () {
    a[Number(this.isNode())](this.tile, this._getState());
  }
});
var r = o;
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;