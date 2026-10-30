var i = l(require("./96073.js"));
var o = l(require("./55994.js"));
var a = l(require("./72722.js"));
var r = l(require("./94553.js"));
var s = l(require("./73349.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if ((0, a.default)()) {
  r.default.add(function (e, t) {
    i.default.event.special[e] = t;
  });
  if (o.default.passiveEventHandlersSupported()) {
    o.default.forcePassiveFalseEventNames.forEach(function (e) {
      i.default.event.special[e] = {
        setup: function (t, n, i) {
          s.default.listen(this, e, i, {
            passive: false
          });
        }
      };
    });
  }
  o.default.set({
    on: function (e) {
      (0, i.default)(e).on.apply((0, i.default)(e), Array.prototype.slice.call(arguments, 1));
    },
    one: function (e) {
      (0, i.default)(e).one.apply((0, i.default)(e), Array.prototype.slice.call(arguments, 1));
    },
    off: function (e) {
      (0, i.default)(e).off.apply((0, i.default)(e), Array.prototype.slice.call(arguments, 1));
    },
    trigger: function (e) {
      (0, i.default)(e).trigger.apply((0, i.default)(e), Array.prototype.slice.call(arguments, 1));
    },
    triggerHandler: function (e) {
      (0, i.default)(e).triggerHandler.apply((0, i.default)(e), Array.prototype.slice.call(arguments, 1));
    },
    Event: i.default.Event
  });
}