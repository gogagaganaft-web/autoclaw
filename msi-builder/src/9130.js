function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerKeyboardAction = undefined;
var o = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = a(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var r = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var s in e) {
    if (s !== "default" && Object.prototype.hasOwnProperty.call(e, s)) {
      var l = r ? Object.getOwnPropertyDescriptor(e, s) : null;
      if (l && (l.get || l.set)) {
        Object.defineProperty(o, s, l);
      } else {
        o[s] = e[s];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./56756.js"));
function a(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (a = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
exports.registerKeyboardAction = function (e, t, n, i, a) {
  var r = t.getController("keyboardNavigation");
  if (!t.option("useLegacyKeyboardNavigation") && (!r || !!r.isKeyboardEnabled())) {
    t.createAction("onKeyDown");
    o.registerKeyboardAction(e, t, n, i, a, function (e) {
      t.executeAction("onKeyDown", e);
    });
  }
};