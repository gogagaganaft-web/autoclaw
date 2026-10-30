exports.default = undefined;
var n = new (function () {
  function e() {
    this._converters = {};
  }
  var t = e.prototype;
  t.addConverter = function (e, t) {
    this._converters[e] = t;
  };
  t.getConverter = function (e) {
    return this._converters[e];
  };
  return e;
}())();
exports.default = n;
module.exports = exports.default;
module.exports.default = exports.default;