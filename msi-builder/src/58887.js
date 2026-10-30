exports.default = undefined;
var i;
var o = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var a = function () {
  function e(e) {
    this._options = e;
    this._itemsRunTimeInfo = this._options.itemsRunTimeInfo;
  }
  var t = e.prototype;
  t.findInstance = function () {
    return this._itemsRunTimeInfo.findWidgetInstanceByItem(this._options.item);
  };
  t.findItemContainer = function () {
    return this._itemsRunTimeInfo.findItemContainerByItem(this._options.item);
  };
  t.findPreparedItem = function () {
    return this._itemsRunTimeInfo.findPreparedItemByItem(this._options.item);
  };
  t.tryExecute = function () {
    o.default.abstract();
  };
  return e;
}();
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;