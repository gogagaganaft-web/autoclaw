exports.default = undefined;
var i;
var o = (i = require("./56957.js")) && i.__esModule ? i : {
  default: i
};
var a = function () {
  function e() {}
  var t = e.prototype;
  t.setQuillInstance = function (e) {
    this.quillInstance = e;
  };
  t.toHtml = function () {
    if (this.quillInstance) {
      if (this._isQuillEmpty()) {
        return "";
      } else {
        return this.quillInstance.getSemanticHTML(0, this.quillInstance.getLength() + 1);
      }
    }
  };
  t._isQuillEmpty = function () {
    var e = this.quillInstance.getContents();
    return e.length() === 1 && this._isDeltaEmpty(e);
  };
  t._isDeltaEmpty = function (e) {
    return e.reduce(function (e, t) {
      return t.insert.indexOf("\n") !== -1;
    });
  };
  return e;
}();
o.default.addConverter("delta", a);
var r = a;
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;