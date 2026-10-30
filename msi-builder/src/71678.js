exports.default = undefined;
var i;
var o = require("./13306.js");
var a = require("./35922.js");
var r = (i = require("./69297.js")) && i.__esModule ? i : {
  default: i
};
var s = o.extend;
var l = a.isNumeric;
var u = s({}, r.default, {
  _getPoints: function () {
    var e = this._options.rotated ? function (e, t) {
      return [t, e];
    } : function (e, t) {
      return [e, t];
    };
    var t = l(this.openY);
    var n = l(this.closeY);
    var i = this.x;
    var o = this.width;
    var a = [].concat(e(i, this.highY));
    if (t) {
      a = a.concat(e(i, this.openY));
    }
    if (t) {
      a = a.concat(e(i - o / 2, this.openY));
    }
    if (t) {
      a = a.concat(e(i, this.openY));
    }
    if (n) {
      a = a.concat(e(i, this.closeY));
    }
    if (n) {
      a = a.concat(e(i + o / 2, this.closeY));
    }
    if (n) {
      a = a.concat(e(i, this.closeY));
    }
    return a = a.concat(e(i, this.lowY));
  },
  _drawMarkerInGroup: function (e, t, n) {
    this.graphic = n.path(this._getPoints(), "line").attr({
      "stroke-linecap": "square"
    }).attr(t).data({
      "chart-data-point": this
    }).sharp().append(e);
  },
  _getMinTrackerWidth: function () {
    var e = 2 + this._styles.normal["stroke-width"];
    return e + e % 2;
  }
});
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;