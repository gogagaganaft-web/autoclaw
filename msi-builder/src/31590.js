exports.default = undefined;
var i;
var o = (i = require("./54778.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./20576.js");
function r(e, t) {
  return (r = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var s = function (e) {
  var t;
  var n;
  function i() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  r(t, n);
  i.prototype._renderWatchers = function () {
    this._startWatcher("badge", a.noop);
    return e.prototype._renderWatchers.call(this);
  };
  return i;
}(o.default);
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;