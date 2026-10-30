exports.EditorLabelProps = undefined;
var i = require("./75811.js");
var o = Object.defineProperties({
  label: ""
}, {
  labelMode: {
    get: function () {
      if ((0, i.isMaterial)((0, i.current)())) {
        return "floating";
      } else {
        return "static";
      }
    },
    configurable: true,
    enumerable: true
  }
});
exports.EditorLabelProps = o;