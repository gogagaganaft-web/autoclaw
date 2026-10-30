var i = l(require("./49983.js"));
var o = l(require("./21168.js"));
var a = require("./3603.js");
var r = require("./77707.js");
var s = require("./19157.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
require("./4815.js");
require("./83469.js");
var u = i.default.prototype;
var d = o.default.prototype;
u._eventsMap.onHoverChanged = {
  name: "hoverChanged"
};
(0, a.expand)(u._handlers, "calculateAdditionalStates", function (e, t) {
  e[1] = t.hoverStyle ? (0, r.buildRectAppearance)(t.hoverStyle) : {};
});
i.default.addChange({
  code: "HOVER_ENABLED",
  handler: function () {
    var e = (0, s.parseScalar)(this._getOption("hoverEnabled", true), true);
    if (!e) {
      this.clearHover();
    }
    this._hoverEnabled = e;
  },
  isThemeDependent: true,
  isOptionChange: true,
  option: "hoverEnabled"
});
d.statesMap[1] = 1;
d.additionalStates.push(1);
(0, a.expand)(u, "_extendProxyType", function (e) {
  var t = this;
  e.setHover = function () {
    t._hoverNode(this._id);
  };
  e.isHovered = function () {
    return t._hoverIndex === this._id;
  };
});
(0, a.expand)(u, "_onNodesCreated", function () {
  this._hoverIndex = -1;
});
(0, a.expand)(u, "_changeGroupSettings", function () {
  this._groupHoverEnabled = (0, s.parseScalar)(this._getOption("group").hoverEnabled, true);
  if (!this._groupHoverEnabled) {
    this.clearHover();
  }
});
u._applyHoverState = function (e, t) {
  (function e(t, n, i) {
    var o;
    var a = t.isNode() && t.nodes;
    var r = a && a.length;
    t.setState(n, i);
    o = 0;
    for (; o < r; ++o) {
      e(a[o], n, i);
    }
  })(this._nodes[e], 1, t);
  this._eventTrigger("hoverChanged", {
    node: this._nodes[e].proxy
  });
};
u._hoverNode = function (e) {
  var t = this._hoverIndex;
  if (this._hoverEnabled && t !== e) {
    if (!this._groupHoverEnabled && e >= 0 && this._nodes[e].isNode()) {
      this.clearHover();
      return;
    }
    this._context.suspend();
    this._hoverIndex = -1;
    if (t >= 0) {
      this._applyHoverState(t, false);
    }
    this._hoverIndex = e;
    if (e >= 0) {
      this._applyHoverState(e, true);
    }
    this._context.resume();
  }
};
u.clearHover = function () {
  this._hoverNode(-1);
};