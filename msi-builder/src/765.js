exports.name = undefined;
var i = s(require("./68374.js"));
var o = s(require("./55994.js"));
var a = s(require("./85788.js"));
var r = require("./39611.js");
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.name = "dxmousewheel";
var l = {
  setup: function (e) {
    var t = (0, i.default)(e);
    o.default.on(t, (0, r.addNamespace)("wheel", "dxWheel"), l._wheelHandler.bind(l));
  },
  teardown: function (e) {
    o.default.off(e, `.dxWheel`);
  },
  _wheelHandler: function (e) {
    var t = e.originalEvent;
    var n = t.deltaMode;
    var i = t.deltaY;
    var o = t.deltaX;
    var a = t.deltaZ;
    (0, r.fireEvent)({
      type: "dxmousewheel",
      originalEvent: e,
      delta: this._normalizeDelta(i, n),
      deltaX: o,
      deltaY: i,
      deltaZ: a,
      deltaMode: n,
      pointerType: "mouse"
    });
    e.stopPropagation();
  },
  _normalizeDelta: function (e, t = 0) {
    if (t === 0) {
      return -e;
    } else {
      return e * -30;
    }
  }
};
(0, a.default)("dxmousewheel", l);