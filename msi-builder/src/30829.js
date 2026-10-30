var i = a(require("./96073.js"));
var o = a(require("./37208.js"));
function a(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if ((0, a(require("./72722.js")).default)()) {
  o.default.inject({
    sendRequest: function (e) {
      if (e.responseType || e.upload) {
        return this.callBase.apply(this, [e]);
      } else {
        return i.default.ajax(e);
      }
    }
  });
}