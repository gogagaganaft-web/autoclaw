exports.plugin = undefined;
var i = require("./20576.js");
var o = require("./14371.js");
function a(e, t, n) {
  var i = n.getRootOffset();
  return e || t && [(t[0] + t[2]) / 2 + i.left, (t[1] + t[5]) / 2 + i.top] || [-1000, -1000];
}
var r = {
  name: "funnel-tooltip",
  init: i.noop,
  dispose: i.noop,
  extenders: {
    _buildNodes: function () {
      this.hideTooltip();
    },
    _change_TILING: function () {
      if (this._tooltipIndex >= 0) {
        this._moveTooltip(this._items[this._tooltipIndex]);
      }
    }
  },
  members: {
    hideTooltip: function () {
      if (this._tooltipIndex >= 0) {
        this._tooltipIndex = -1;
        this._tooltip.hide();
      }
    },
    _moveTooltip: function (e, t) {
      var n = a(t, e.coords, this._renderer);
      this._tooltip.move(n[0], n[1], 0);
    },
    _showTooltip: function (e, t) {
      var n = this;
      var i = n._tooltip;
      var o = n._items[e];
      if (n._tooltipIndex !== e) {
        function r(t) {
          if (t !== undefined) {
            if (!t) {
              i.hide();
            }
            n._tooltipIndex = t ? e : -1;
          }
        }
        var s = a(t, o.coords, this._renderer);
        r(i.show({
          value: o.value,
          valueText: i.formatValue(o.value),
          percentText: i.formatValue(o.percent, "percent"),
          percent: o.percent,
          item: o
        }, {
          x: s[0],
          y: s[1],
          offset: 0
        }, {
          item: o
        }, undefined, r));
      } else {
        n._moveTooltip(o, t);
      }
    }
  },
  customize: function (e) {
    e.addPlugin(o.plugin);
  }
};
exports.plugin = r;