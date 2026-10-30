Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var i;
var o = require("./13306.js");
var a = (i = require("./15943.js")) && i.__esModule ? i : {
  default: i
};
var r = (0, o.extend)({}, a.default, {
  modules: [],
  foreachNodes: function (e, t, n) {
    for (var i = 0; i < e.length; i++) {
      if (t(e[i]) !== false && (n || e[i].hasChildren) && e[i].children.length) {
        this.foreachNodes(e[i].children, t, n);
      }
    }
  }
});
exports.default = r;