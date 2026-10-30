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
    this.vertical = this._options.vertical;
    this._inner = this._outer = 0;
    if (this.vertical) {
      switch ((0, a.normalizeEnum)(this._options.horizontalOrientation)) {
        case "left":
          this._inner = 1;
          break;
        case "center":
          this._inner = this._outer = 0.5;
          break;
        default:
          this._outer = 1;
      }
    } else {
      switch ((0, a.normalizeEnum)(this._options.verticalOrientation)) {
        case "top":
          this._inner = 1;
          break;
        case "center":
          this._inner = this._outer = 0.5;
          break;
        default:
          this._outer = 1;
      }
    }
  },
  _isVisible: function () {
    return true;
  },
  _createRange: function (e, t) {
    var n;
    var i = this._inner;
    var o = this._outer;
    var a = this._translator.translate(e.start);
    var r = this._translator.translate(e.end);
    var s = t.x;
    var l = t.y;
    var u = e.startWidth;
    var d = e.endWidth;
    n = this.vertical ? [s - u * i, a, s - d * i, r, s + d * o, r, s + u * o, a] : [a, l + u * o, a, l - u * i, r, l - d * i, r, l + d * o];
    return this._renderer.path(n, "area");
  },
  measure: function (e) {
    var t;
    var n = {};
    n.min = n.max = e[this.vertical ? "x" : "y"];
    t = this._options.width;
    t = r(t) || s(r(t.start), r(t.end));
    n.min -= this._inner * t;
    n.max += this._outer * t;
    return n;
  }
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;