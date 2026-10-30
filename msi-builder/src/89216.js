Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = require("./55285.js");
exports.Portal = function (e) {
  var t = e.container;
  var n = e.children;
  if (t) {
    return i.createPortal(n, t);
  } else {
    return null;
  }
};