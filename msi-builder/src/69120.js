exports.default = undefined;
var i = s(require("./20530.js"));
var o = require("./13306.js");
var a = require("./95479.js");
var r = s(require("./88136.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function l(e) {
  var t = [];
  (0, a.each)(e.touches, function (e, n) {
    t.push((0, o.extend)({
      pointerId: n.identifier
    }, n));
  });
  return {
    pointers: t,
    pointerId: e.changedTouches[0].identifier
  };
}
function u(e) {
  return i.default.real().platform === "ios" && (e === "dxpointerdown" || e === "dxpointerup");
}
var d = r.default.inherit({
  ctor: function () {
    this.callBase.apply(this, arguments);
    this._pointerId = 0;
  },
  _handler: function (e) {
    if (u(this._eventName)) {
      var t = e.changedTouches[0];
      if (this._pointerId === t.identifier && this._pointerId !== 0) {
        return;
      }
      this._pointerId = t.identifier;
    }
    return this.callBase.apply(this, arguments);
  },
  _fireEvent: function (e) {
    return this.callBase((0, o.extend)(l(e.originalEvent), e));
  }
});
d.map = {
  dxpointerdown: "touchstart",
  dxpointermove: "touchmove",
  dxpointerup: "touchend",
  dxpointercancel: "touchcancel",
  dxpointerover: "",
  dxpointerout: "",
  dxpointerenter: "",
  dxpointerleave: ""
};
d.normalize = l;
var c = d;
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;