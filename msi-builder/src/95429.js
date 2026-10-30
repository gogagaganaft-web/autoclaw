exports.name = undefined;
var i = p(require("./68374.js"));
var o = p(require("./55994.js"));
var a = p(require("./20530.js"));
var r = p(require("./73349.js"));
var s = require("./3532.js");
var l = require("./90057.js");
var u = require("./39611.js");
var d = require("./27575.js");
var c = p(require("./93786.js"));
var h = p(require("./31391.js"));
var f = p(require("./82495.js"));
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.name = "dxclick";
l.requestAnimationFrame;
l.cancelAnimationFrame;
var g = null;
var m = null;
function _() {
  m = null;
}
function v(e) {
  var t = e.originalEvent;
  var n = m === t || t && t.DXCLICK_FIRED;
  if ((!e.which || e.which === 1) && !g && !n) {
    if (t) {
      t.DXCLICK_FIRED = true;
    }
    (0, d.unsubscribeNodesDisposing)(m, _);
    m = t;
    (0, d.subscribeNodesDisposing)(m, _);
    (0, u.fireEvent)({
      type: "dxclick",
      originalEvent: e
    });
  }
}
var y = h.default.inherit({
  ctor: function (e) {
    this.callBase(e);
    o.default.on(this.getElement(), "click", v);
  },
  start: function (e) {
    g = null;
  },
  cancel: function () {
    g = true;
  },
  dispose: function () {
    o.default.off(this.getElement(), "click", v);
  }
});
(function () {
  if (!a.default.real().generic) {
    var e = null;
    var t = false;
    var n = r.default.getDocument();
    o.default.subscribeGlobal(n, (0, u.addNamespace)(c.default.down, "NATIVE_CLICK_FIXER"), function (n) {
      e = n.target;
      t = n.isDefaultPrevented();
    });
    o.default.subscribeGlobal(n, (0, u.addNamespace)("click", "NATIVE_CLICK_FIXER"), function (n) {
      var o;
      var a = (0, i.default)(n.target);
      if (!t && !!e && !a.is(e) && !(0, i.default)(e).is("label") && !(o = a, !(0, i.default)(o).is("input, textarea, select, button ,:focus, :focus *"))) {
        (0, s.resetActiveElement)();
      }
      e = null;
      t = false;
    });
  }
})();
(0, f.default)({
  emitter: y,
  bubble: true,
  events: ["dxclick"]
});