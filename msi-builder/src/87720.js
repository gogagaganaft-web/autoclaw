exports.default = undefined;
var i = require("./13306.js");
var o = l(require("./88136.js"));
var a = l(require("./66509.js"));
var r = l(require("./69120.js"));
var s = require("./39611.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = false;
function d() {
  if (!u) {
    a.default.activate();
    u = true;
  }
}
var c = o.default.inherit({
  EVENT_LOCK_TIMEOUT: 100,
  ctor: function () {
    this.callBase.apply(this, arguments);
    d();
  },
  _handler: function (e) {
    var t = (0, s.isMouseEvent)(e);
    if (!t) {
      this._skipNextEvents = true;
    }
    if (!t || !this._mouseLocked) {
      if (!t || !this._skipNextEvents) {
        return this.callBase(e);
      }
      this._skipNextEvents = false;
      this._mouseLocked = true;
      clearTimeout(this._unlockMouseTimer);
      var n = this;
      this._unlockMouseTimer = setTimeout(function () {
        n._mouseLocked = false;
      }, this.EVENT_LOCK_TIMEOUT);
    }
  },
  _fireEvent: function (e) {
    var t = (0, s.isMouseEvent)(e.originalEvent) ? a.default.normalize : r.default.normalize;
    return this.callBase((0, i.extend)(t(e.originalEvent), e));
  },
  dispose: function () {
    this.callBase();
    this._skipNextEvents = false;
    this._mouseLocked = false;
    clearTimeout(this._unlockMouseTimer);
  }
});
c.map = {
  dxpointerdown: "touchstart mousedown",
  dxpointermove: "touchmove mousemove",
  dxpointerup: "touchend mouseup",
  dxpointercancel: "touchcancel",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
c.resetObserver = a.default.resetObserver;
var h = c;
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;