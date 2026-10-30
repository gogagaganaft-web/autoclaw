exports.default = undefined;
var i;
var o = require("./95479.js");
var a = (i = require("./44504.js")) && i.__esModule ? i : {
  default: i
};
var r = function () {
  function e() {
    this.memory = [];
    this.callbacks = (0, a.default)();
  }
  var t = e.prototype;
  t.add = function (e) {
    (0, o.each)(this.memory, function (t, n) {
      return e.apply(e, n);
    });
    this.callbacks.add(e);
  };
  t.remove = function (e) {
    this.callbacks.remove(e);
  };
  t.fire = function () {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) {
      t[n] = arguments[n];
    }
    this.memory.push(t);
    this.callbacks.fire.apply(this.callbacks, t);
  };
  return e;
}();
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;