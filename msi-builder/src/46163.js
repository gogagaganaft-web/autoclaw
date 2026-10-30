exports.default = undefined;
var i = require("./35922.js");
var o = require("./60810.js");
var a = Math.round;
function r(e) {
  return e;
}
var s = {
  translate: function (e, t) {
    var n = this._canvasOptions;
    var o = this._categoriesToPoints[e == null ? undefined : e.valueOf()];
    var r = this.translateSpecialCase(e);
    var s = n.startPointIndex || 0;
    var l = this._options.stick ? 0 : 0.5;
    if ((0, i.isDefined)(r)) {
      return a(r);
    }
    if (!o && o !== 0) {
      return null;
    }
    var u = o + l - s + (t = t || 0) * 0.5;
    return a(this._calculateProjection(n.interval * u));
  },
  getInterval: function () {
    return this._canvasOptions.interval;
  },
  getEventScale: function (e) {
    return 1 - (1 - (e.deltaScale || 1)) / (0.75 + this.visibleCategories.length / this._categories.length);
  },
  zoom: function (e, t) {
    var n;
    var i = this._categories;
    var a = this._canvasOptions;
    var r = this._options.stick;
    var s = a.invert;
    var l = a.interval * t;
    var u = e / l;
    var d = (this.visibleCategories || []).length;
    var c = parseInt((a.startPointIndex || 0) + u + 0.5);
    var h = parseInt((0, o.adjust)(a.canvasLength / l) + (r ? 1 : 0)) || 1;
    if (s) {
      c = parseInt((a.startPointIndex || 0) + d - u + 0.5) - h;
    }
    if (c < 0) {
      c = 0;
    }
    if ((n = c + h) > i.length && (c = (n = i.length) - h) < 0) {
      c = 0;
    }
    var f = i.slice(parseInt(c), parseInt(n));
    var p = this._getDiscreteInterval(f.length, a);
    t = p / a.interval;
    e = this.translate(s ? f[f.length - 1] : f[0]) * t - (a.startPoint + (r ? 0 : p / 2));
    return {
      min: f[0],
      max: f[f.length - 1],
      translate: e,
      scale: t
    };
  },
  getMinScale: function (e) {
    var t = this._canvasOptions;
    var n = (this.visibleCategories || this._categories).length;
    n += (parseInt(n * 0.1) || 1) * (e ? -2 : 2);
    return t.canvasLength / (Math.max(n, 1) * t.interval);
  },
  getScale: function (e, t) {
    var n = this._canvasOptions;
    var o = this.getCanvasVisibleArea();
    var a = !this._options.stick && 1;
    var r = (0, i.isDefined)(e) ? this.translate(e, -a) : null;
    var s = (0, i.isDefined)(t) ? this.translate(t, +a) : null;
    if (r === null) {
      r = n.invert ? o.max : o.min;
    }
    if (s === null) {
      s = n.invert ? o.min : o.max;
    }
    return this.canvasLength / Math.abs(s - r);
  },
  isValid: function (e) {
    return !!(0, i.isDefined)(e) && this._categoriesToPoints[e.valueOf()] >= 0;
  },
  getCorrectValue: r,
  to: function (e, t) {
    var n = this._canvasOptions;
    var i = this._categoriesToPoints[e == null ? undefined : e.valueOf()];
    var o = n.startPointIndex || 0;
    var r = i + (this._options.stick ? 0 : 0.5) - o + (this._businessRange.invert ? -1 : 1) * t * 0.5;
    return a(this._calculateProjection(n.interval * r));
  },
  from: function (e, t = 0) {
    var n = this._canvasOptions;
    var i = n.startPoint;
    var o = this.visibleCategories || this._categories;
    var r = o.length;
    var s = this._options.stick ? 0.5 : 0;
    var l = a((e - i) / n.interval + s - 0.5 - t * 0.5);
    if (l >= r) {
      l = r - 1;
    }
    if (l < 0) {
      l = 0;
    }
    if (n.invert) {
      l = r - l - 1;
    }
    return o[l];
  },
  _add: function () {
    return NaN;
  },
  toValue: r,
  isValueProlonged: true,
  getRangeByMinZoomValue: function (e, t) {
    var n = this._categories;
    var i = n.indexOf(t.minVisible) + e - 1;
    var o = n.indexOf(t.maxVisible) - e + 1;
    if (n[i]) {
      return [t.minVisible, n[i]];
    } else {
      return [n[o], t.maxVisible];
    }
  }
};
exports.default = s;
module.exports = exports.default;
module.exports.default = exports.default;