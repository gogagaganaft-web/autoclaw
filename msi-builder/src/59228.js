var i = c(require("./96073.js"));
var o = c(require("./72722.js"));
var a = require("./58020.js");
var r = require("./95479.js");
var s = require("./35922.js");
var l = require("./39611.js");
var u = c(require("./85788.js"));
var d = c(require("./2418.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if ((0, o.default)()) {
  if ((0, a.compare)(i.default.fn.jquery, [3]) < 0) {
    var h = {
      2: "touch",
      3: "pen",
      4: "mouse"
    };
    (0, r.each)(["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerCancel", "MSPointerOver", "MSPointerOut", "mouseenter", "mouseleave", "pointerdown", "pointermove", "pointerup", "pointercancel", "pointerover", "pointerout", "pointerenter", "pointerleave"], function () {
      i.default.event.fixHooks[this] = {
        filter: function (e, t) {
          var n = t.pointerType;
          if ((0, s.isNumeric)(n)) {
            e.pointerType = h[n];
          }
          return e;
        },
        props: i.default.event.mouseHooks.props.concat(["pointerId", "pointerType", "originalTarget", "width", "height", "pressure", "result", "tiltX", "charCode", "tiltY", "detail", "isPrimary", "prevValue"])
      };
    });
    (0, r.each)(["touchstart", "touchmove", "touchend", "touchcancel"], function () {
      i.default.event.fixHooks[this] = {
        filter: function (e, t) {
          (0, d.default)(function (n, i) {
            e[n] = i(t);
          });
          return e;
        },
        props: i.default.event.mouseHooks.props.concat(["touches", "changedTouches", "targetTouches", "detail", "result", "originalTarget", "charCode", "prevValue"])
      };
    });
    i.default.event.fixHooks.wheel = i.default.event.mouseHooks;
    var f = {
      props: i.default.event.mouseHooks.props.concat(["pointerType", "pointerId", "pointers"])
    };
    u.default.callbacks.add(function (e) {
      i.default.event.fixHooks[e] = f;
    });
    (0, l.setEventFixMethod)(function (e, t) {
      var n = i.default.event.fixHooks[t.type] || i.default.event.mouseHooks;
      var o = n.props ? i.default.event.props.concat(n.props) : i.default.event.props;
      for (var a = o.length; a--;) {
        var r = o[a];
        e[r] = t[r];
      }
      if (n.filter) {
        return n.filter(e, t);
      } else {
        return e;
      }
    });
  } else {
    (0, d.default)(function (e, t) {
      i.default.event.addProp(e, t);
    });
  }
}