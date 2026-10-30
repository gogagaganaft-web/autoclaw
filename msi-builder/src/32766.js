Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = require("./55285.js");
var o = require("./37221.js");
exports.createReRenderEffect = function () {
  return new o.InfernoEffect(function () {
    i.rerender();
  }, []);
};