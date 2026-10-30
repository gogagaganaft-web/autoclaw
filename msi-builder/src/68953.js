exports.default = undefined;
var i = require("./35922.js");
var o = function () {
  function e() {
    this._storage = {};
  }
  var t = e.prototype;
  t.set = function (e, t) {
    var n;
    var i;
    var o = e.editorKey;
    var a = e.marker;
    if ((i = (n = this._storage)[o]) === null || i === undefined) {
      n[o] = {};
    }
    this._storage[o][a] = t;
  };
  t.get = function (e) {
    var o = e.editorKey;
    var a = e.marker;
    if (!(0, i.isDefined)(o)) {
      return Object.values(this._storage).at(-1)?.[a];
    } else {
      return this._storage[o]?.[a];
    }
  };
  t.delete = function (e) {
    var t = e.editorKey;
    var n = e.marker;
    if (this._storage[t]) {
      delete this._storage[t][n];
      if ((0, i.isEmptyObject)(this._storage[t])) {
        delete this._storage[t];
      }
    }
  };
  return e;
}();
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;