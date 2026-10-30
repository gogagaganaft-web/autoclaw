exports.EditorStateProps = undefined;
var i;
var o = (i = require("./20530.js")) && i.__esModule ? i : {
  default: i
};
var a = Object.defineProperties({
  hoverStateEnabled: true,
  activeStateEnabled: true
}, {
  focusStateEnabled: {
    get: function () {
      return o.default.real().deviceType === "desktop" && !o.default.isSimulator();
    },
    configurable: true,
    enumerable: true
  }
});
exports.EditorStateProps = a;