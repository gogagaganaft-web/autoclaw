exports.default = undefined;
var i = d(require("./55994.js"));
var o = d(require("./38377.js"));
var a = d(require("./73349.js"));
var r = require("./765.js");
var s = d(require("./24311.js"));
var l = require("./39611.js");
var u = d(require("./93786.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c = "gauge-tooltip";
var h = s.default.add;
var f = o.default.inherit({
  ctor: function (e) {
    var t = this;
    t._element = e.renderer.g().attr({
      class: "dxg-tracker",
      stroke: "none",
      "stroke-width": 0,
      fill: "#000000",
      opacity: 0.0001
    }).linkOn(e.container, {
      name: "tracker",
      after: "peripheral"
    });
    t._showTooltipCallback = function () {
      var e = t._tooltipEvent.target;
      var n = e["gauge-data-target"];
      var i = e["gauge-data-info"];
      t._targetEvent = null;
      if (t._tooltipTarget !== e) {
        function o(n) {
          if (n) {
            t._tooltipTarget = e;
          }
        }
        o(t._callbacks["tooltip-show"](n, i, o));
      }
    };
    t._hideTooltipCallback = function () {
      t._hideTooltipTimeout = null;
      t._targetEvent = null;
      if (t._tooltipTarget) {
        t._callbacks["tooltip-hide"]();
        t._tooltipTarget = null;
      }
    };
    t._dispose = function () {
      clearTimeout(t._hideTooltipTimeout);
      t._showTooltipCallback = t._hideTooltipCallback = t._dispose = null;
    };
  },
  dispose: function () {
    this._dispose();
    this.deactivate();
    this._element.off("." + c);
    this._element.linkOff();
    this._element = this._context = this._callbacks = null;
    return this;
  },
  activate: function () {
    this._element.linkAppend();
    return this;
  },
  deactivate: function () {
    this._element.linkRemove().clear();
    return this;
  },
  attach: function (e, t, n) {
    e.data({
      "gauge-data-target": t,
      "gauge-data-info": n
    }).append(this._element);
    return this;
  },
  detach: function (e) {
    e.remove();
    return this;
  },
  setTooltipState: function (e) {
    this._element.off("." + c);
    if (e) {
      var t = {
        tracker: this
      };
      this._element.on((0, l.addNamespace)([u.default.move], c), t, g).on((0, l.addNamespace)([u.default.out], c), t, m).on((0, l.addNamespace)([u.default.down], c), t, v).on((0, l.addNamespace)([u.default.up], c), t, y).on((0, l.addNamespace)([r.name], c), t, _);
    }
    return this;
  },
  setCallbacks: function (e) {
    this._callbacks = e;
    return this;
  },
  _showTooltip: function (e) {
    clearTimeout(this._hideTooltipTimeout);
    this._hideTooltipTimeout = null;
    if (this._tooltipTarget !== e.target) {
      this._tooltipEvent = e;
      this._showTooltipCallback();
    }
  },
  _hideTooltip: function (e) {
    clearTimeout(this._hideTooltipTimeout);
    if (e) {
      this._hideTooltipTimeout = setTimeout(this._hideTooltipCallback, e);
    } else {
      this._hideTooltipCallback();
    }
  }
});
var p = null;
function g(e) {
  var t = e.data.tracker;
  t._x = e.pageX;
  t._y = e.pageY;
  t._showTooltip(e);
}
function m(e) {
  e.data.tracker._hideTooltip(100);
}
function _(e) {
  e.data.tracker._hideTooltip();
}
function v(e) {
  (p = e.data.tracker)._touch = true;
  g(e);
}
function y() {
  p._touch = false;
}
function b(e) {
  var t = p;
  if (t && !t._touch) {
    t._hideTooltip(100);
    p = null;
  }
}
h(function () {
  i.default.subscribeGlobal(a.default.getDocument(), (0, l.addNamespace)([u.default.down], c), b);
});
var x = f;
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;