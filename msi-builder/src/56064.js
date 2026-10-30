Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = require("./55285.js");
var o = require("./87456.js");
exports.renderTemplate = function (e, t, n) {
  setTimeout(function () {
    i.render(o.createElement(e, t), function (e) {
      var t;
      var n;
      return ((t = e.container) === null || t === undefined ? undefined : t.get(0)) || ((n = e.item) === null || n === undefined ? undefined : n.get(0));
    }(t));
  }, 0);
};
exports.hasTemplate = function (e, t, n) {
  var i = t[e];
  return !!i && typeof i != "string";
};