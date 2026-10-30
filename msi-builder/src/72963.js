exports.default = undefined;
var i;
var o = (i = require("./68374.js")) && i.__esModule ? i : {
  default: i
};
var a = function () {
  function e(e) {
    this._workSpace = e;
    this._$container = this._workSpace._dateTableScrollable.$content();
  }
  var t = e.prototype;
  t.render = function () {
    var e = this;
    this.initShaderElements();
    this.renderShader();
    this._shader.forEach(function (t, n) {
      e._$container.append(t);
    });
  };
  t.initShaderElements = function () {
    this._$shader = this.createShader();
    this._shader = [];
    this._shader.push(this._$shader);
  };
  t.renderShader = function () {};
  t.createShader = function () {
    return (0, o.default)("<div>").addClass("dx-scheduler-date-time-shader");
  };
  t.clean = function () {
    if (this._$container) {
      this._$container.find(".dx-scheduler-date-time-shader").remove();
    }
  };
  return e;
}();
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;