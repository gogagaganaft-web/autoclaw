var i = r(require("./96073.js"));
var o = require("./89729.js");
var a = r(require("./24311.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
if (i.default && !o.themeReadyCallback.fired()) {
  var s = i.default.holdReady || i.default.fn.holdReady;
  s(true);
  o.themeReadyCallback.add(function () {
    a.default.add(function () {
      s(false);
    });
  });
}