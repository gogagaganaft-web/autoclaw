exports.default = undefined;
var i;
var o = (i = require("./84165.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./19157.js");
var r = Number;
var s = Math.max;
var l = o.default.inherit({
  _processOptions: function () {
    this._inner = this._outer = 0;
    switch ((0, a.normalizeEnum)(this._options.orientation)) {
      case "inside":
        this._inner = 1;
        break;
      case "center":
        this._inner = this._outer = 0.5;
        break;
      default:
        this._outer = 1;
    }
  },
  _isVisible: function (e) {
    var t = this._options.width;
    t = r(t) || s(r(t.start), r(t.end));
    return e.radius - this._inner * t > 0;
  },
  _createRange: function (e, t) {
    var n = (e.startWidth + e.endWidth) / 2;
    return this._renderer.arc(t.x, t.y, t.radius - this._inner * n, t.radius + this._outer * n, this._translator.translate(e.end), this._translator.translate(e.start)).attr({
      "stroke-linejoin": "round"
    });
  },
  measure: function (e) {
    var t = this._options.width;
    t = r(t) || s(r(t.start), r(t.end));
    return {
      min: e.radius - this._inner * t,
      max: e.radius + this._outer * t
    };
  }
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;