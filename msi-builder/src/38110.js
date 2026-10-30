exports.default = undefined;
var i = require("./95479.js");
var o = function () {
  function e() {
    this._collection = [];
  }
  var t = e.prototype;
  t.clear = function () {
    this._collection = [];
  };
  t.add = function (e, t) {
    this._collection.push({
      name: e,
      instance: t
    });
  };
  t.remove = function (e) {
    this._collection = this._collection.filter(function (t) {
      return t.name !== e;
    });
  };
  t.getByName = function (e) {
    var t = null;
    (0, i.each)(this._collection, function (n, i) {
      var o = i.name;
      var a = i.instance;
      if (o === e) {
        t = a;
        return false;
      }
    });
    return t;
  };
  t.each = function (e) {
    this._collection.forEach(function (t) {
      var n = t.name;
      var i = t.instance;
      return i && e(n, i);
    });
  };
  return e;
}();
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;