exports.default = undefined;
var i = require("./20576.js");
var o = require("./58201.js");
var a = (0, o.getWindow)();
var r = {
  observe: i.noop,
  unobserve: i.noop,
  disconnect: i.noop
};
var s = new (function () {
  function e() {
    var e = this;
    if (!(0, o.hasWindow)() || !a.ResizeObserver) {
      return r;
    }
    this._callbacksMap = new Map();
    this._observer = new a.ResizeObserver(function (t) {
      t.forEach(function (t) {
        var n;
        if ((n = e._callbacksMap.get(t.target)) !== null && n !== undefined) {
          n(t);
        }
      });
    });
  }
  var t = e.prototype;
  t.observe = function (e, t) {
    this._callbacksMap.set(e, t);
    this._observer.observe(e);
  };
  t.unobserve = function (e) {
    this._callbacksMap.delete(e);
    this._observer.unobserve(e);
  };
  t.disconnect = function () {
    this._callbacksMap.clear();
    this._observer.disconnect();
  };
  return e;
}())();
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;