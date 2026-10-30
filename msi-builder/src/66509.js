exports.default = undefined;
var i = require("./13306.js");
var o = r(require("./88136.js"));
var a = r(require("./25544.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s;
var l = {
  dxpointerdown: "mousedown",
  dxpointermove: "mousemove",
  dxpointerup: "mouseup",
  dxpointercancel: "",
  dxpointerover: "mouseover",
  dxpointerout: "mouseout",
  dxpointerenter: "mouseenter",
  dxpointerleave: "mouseleave"
};
function u(e) {
  e.pointerId = 1;
  return {
    pointers: s.pointers(),
    pointerId: 1
  };
}
var d = false;
function c() {
  if (!d) {
    s = new a.default(l, function () {
      return true;
    });
    d = true;
  }
}
var h = o.default.inherit({
  ctor: function () {
    this.callBase.apply(this, arguments);
    c();
  },
  _fireEvent: function (e) {
    return this.callBase((0, i.extend)(u(e.originalEvent), e));
  }
});
h.map = l;
h.normalize = u;
h.activate = c;
h.resetObserver = function () {
  s.reset();
};
var f = h;
exports.default = f;
module.exports = exports.default;
module.exports.default = exports.default;