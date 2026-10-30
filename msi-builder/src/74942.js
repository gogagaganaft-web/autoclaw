var i = a(require("./76130.js"));
var o = a(require("./26974.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (i.default) {
  o.default.inject({
    isWrapped: i.default.isObservable,
    isWritableWrapped: i.default.isWritableObservable,
    wrap: i.default.observable,
    unwrap: function (e) {
      if (i.default.isObservable(e)) {
        return i.default.utils.unwrapObservable(e);
      } else {
        return this.callBase(e);
      }
    },
    assign: function (e, t) {
      if (i.default.isObservable(e)) {
        e(t);
      } else {
        this.callBase(e, t);
      }
    }
  });
}