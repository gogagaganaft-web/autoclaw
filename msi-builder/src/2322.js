var i;
var o = require("./3603.js");
var a = (i = require("./49983.js")) && i.__esModule ? i : {
  default: i
};
require("./4815.js");
var r = require("./14371.js");
var s = a.default.prototype;
function l(e, t, n) {
  var i = n.getRootOffset();
  return e || t && [(t[0] + t[2]) / 2 + i.left, (t[1] + t[3]) / 2 + i.top] || [-1000, -1000];
}
(0, o.expand)(s, "_extendProxyType", function (e) {
  var t = this;
  e.showTooltip = function (e) {
    t._showTooltip(this._id, e);
  };
});
(0, o.expand)(s, "_onNodesCreated", function () {
  if (this._tooltipIndex >= 0) {
    this._tooltip.hide();
  }
  this._tooltipIndex = -1;
});
(0, o.expand)(s, "_onTilingPerformed", function () {
  if (this._tooltipIndex >= 0) {
    this._moveTooltip(this._nodes[this._tooltipIndex]);
  }
});
s._showTooltip = function (e, t) {
  var n = this;
  var i = n._tooltip;
  var o = n._nodes[e];
  if (n._tooltipIndex !== e) {
    function a(t) {
      if (t !== undefined) {
        if (!t) {
          i.hide();
        }
        n._tooltipIndex = t ? e : -1;
      }
    }
    var r = l(t, o.rect, this._renderer);
    a(i.show({
      value: o.value,
      valueText: i.formatValue(o.value),
      node: o.proxy
    }, {
      x: r[0],
      y: r[1],
      offset: 0
    }, {
      node: o.proxy
    }, undefined, a));
  } else {
    n._moveTooltip(o, t);
  }
};
s._moveTooltip = function (e, t) {
  var n = l(t, e.rect, this._renderer);
  this._tooltip.move(n[0], n[1], 0);
};
s.hideTooltip = function () {
  if (this._tooltipIndex >= 0) {
    this._tooltipIndex = -1;
    this._tooltip.hide();
  }
};
a.default.addPlugin(r.plugin);