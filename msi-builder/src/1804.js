exports.default = undefined;
var i = require("./19157.js");
var o = require("./35922.js");
var a = {
  fromValue: function (e) {
    if (e !== null) {
      return (0, i.getLogExt)(e, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold);
    } else {
      return e;
    }
  },
  toValue: function (e) {
    if (e !== null) {
      return (0, i.raiseToExt)(e, this._canvasOptions.base, this._businessRange.allowNegatives, this._businessRange.linearThreshold);
    } else {
      return e;
    }
  },
  getMinBarSize: function (e) {
    var t = this.getCanvasVisibleArea();
    var n = this.from(t.min + e);
    var i = this._canvasOptions;
    var o = this.fromValue(this.from(t.min));
    var a = this.fromValue(n ?? this.from(t.max));
    var r = Math.abs(o - a);
    return Math.pow(i.base, r);
  },
  checkMinBarSize: function (e, t, n) {
    var i;
    var a;
    var r = this._canvasOptions;
    var s = n ? n - e : 0;
    var l = this.constructor.prototype.checkMinBarSize;
    if ((0, o.isDefined)(t) && s > 0) {
      i = l(this.fromValue(n / s), this.fromValue(t) - r.rangeMinVisible);
      a = Math.pow(r.base, this.fromValue(s) + i) - s;
    } else {
      a = l(e, t);
    }
    return a;
  }
};
exports.default = a;
module.exports = exports.default;
module.exports.default = exports.default;