exports.deviceDependentOptions = undefined;
var i;
var o = (i = require("./20530.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./60137.js");
exports.deviceDependentOptions = function () {
  return [{
    device: function () {
      return !a.nativeScrolling;
    },
    options: {
      useNative: false
    }
  }, {
    device: function (e) {
      return !o.default.isSimulator() && o.default.real().deviceType === "desktop" && e.platform === "generic";
    },
    options: {
      bounceEnabled: false,
      scrollByThumb: true,
      scrollByContent: a.touch,
      showScrollbar: "onHover"
    }
  }];
};