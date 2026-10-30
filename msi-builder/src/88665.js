exports.default = undefined;
var i = require("./9234.js");
var o = function () {
  function e() {
    this._counter = -1;
    this._deferreds = {};
  }
  var t = e.prototype;
  t.add = function (e) {
    this._counter++;
    this._deferreds[this._counter] = e;
    return this._counter;
  };
  t.remove = function (e) {
    return delete this._deferreds[e];
  };
  t.cancel = function (e) {
    return e in this._deferreds && (this._deferreds[e].reject(i.CANCELED_TOKEN), true);
  };
  t.cancelAll = function () {
    while (this._counter > -1) {
      this.cancel(this._counter);
      this._counter--;
    }
  };
  return e;
}();
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;