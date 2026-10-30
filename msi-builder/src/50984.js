exports.default = undefined;
var i = require("./348.js");
var o = function () {
  function e(e) {
    var t = (0, i.getDiagram)().EventDispatcher;
    this.onChanged = new t();
    this._owner = e;
  }
  var t = e.prototype;
  t.raiseBarCommandExecuted = function (e, t) {
    this.onChanged.raise("notifyBarCommandExecuted", parseInt(e), t);
  };
  t.getCommandKeys = function () {
    throw "Not Implemented";
  };
  t.setItemValue = function (e, t) {};
  t.setItemEnabled = function (e, t) {};
  t.setItemVisible = function (e, t) {};
  t.setEnabled = function (e) {};
  t.setItemSubItems = function (e, t) {};
  t.isVisible = function () {
    return true;
  };
  t._getKeys = function (e) {
    var t = this;
    return e.reduce(function (e, n) {
      if (n.command !== undefined) {
        e.push(n.command);
      }
      if (n.items) {
        e = e.concat(t._getKeys(n.items));
      }
      return e;
    }, []);
  };
  return e;
}();
exports.default = o;
module.exports = exports.default;
module.exports.default = exports.default;