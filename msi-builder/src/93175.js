exports.default = undefined;
var i;
var o = require("./35922.js");
var a = (i = require("./91198.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./60810.js");
var s = Math.floor;
var l = {
  _intervalize: function (e, t) {
    if ((0, o.isDefined)(e)) {
      if (this._businessRange.dataType === "datetime") {
        e = (0, o.isNumeric)(e) ? new Date(e) : new Date(e.getTime());
        e = a.default.correctDateWithUnitBeginning(e, t, null, this._options.firstDayOfWeek);
      } else {
        e = (0, r.adjust)(s((0, r.adjust)(e / t)) * t, t);
      }
      return e;
    }
  },
  translate: function (e, t, n) {
    var i = this.translateSpecialCase(e);
    if ((0, o.isDefined)(i)) {
      return Math.round(i);
    } else {
      n = n || this._options.interval;
      if (this.isValid(e, n)) {
        return this.to(e, t, n);
      } else {
        return null;
      }
    }
  },
  getInterval: function () {
    return Math.round(this._canvasOptions.ratioOfCanvasRange * (this._businessRange.interval || Math.abs(this._canvasOptions.rangeMax - this._canvasOptions.rangeMin)));
  },
  zoom: function () {},
  getMinScale: function () {},
  getScale: function () {},
  _parse: function (e) {
    if (this._businessRange.dataType === "datetime") {
      return new Date(e);
    } else {
      return Number(e);
    }
  },
  fromValue: function (e) {
    return this._parse(e);
  },
  toValue: function (e) {
    return this._parse(e);
  },
  isValid: function (e, t) {
    var n = this._canvasOptions;
    var i = n.rangeMin;
    var r = n.rangeMax;
    t = t || this._options.interval;
    return e !== null && !isNaN(e) && (e = this._businessRange.dataType === "datetime" && (0, o.isNumeric)(e) ? new Date(e) : e, t !== this._options.interval && (i = this._intervalize(i, t), r = this._intervalize(r, t)), !(e.valueOf() < i) && !(e.valueOf() >= a.default.addInterval(r, t)));
  },
  to: function (e, t, n) {
    n = n || this._options.interval;
    var i = this._intervalize(e, n);
    var o = a.default.addInterval(i, n);
    var r = this._to(i);
    var l = this._to(o);
    if (t) {
      if (t > 0) {
        r = l;
      }
    } else {
      r = s((r + l) / 2);
    }
    return r;
  },
  _to: function (e) {
    var t = this._canvasOptions;
    var n = t.rangeMinVisible;
    var i = t.rangeMaxVisible;
    var o = e - n;
    if (e < n) {
      o = 0;
    } else if (e > i) {
      o = a.default.addInterval(i, this._options.interval) - n;
    }
    return this._conversionValue(this._calculateProjection(o * this._canvasOptions.ratioOfCanvasRange));
  },
  from: function (e, t) {
    var n;
    var i = this._options.interval;
    var o = i;
    var r = this._canvasOptions;
    var s = r.rangeMinVisible;
    var l = r.rangeMaxVisible;
    if (this._businessRange.dataType === "datetime") {
      o = a.default.dateToMilliseconds(i);
    }
    n = this._calculateUnProjection((e - this._canvasOptions.startPoint) / this._canvasOptions.ratioOfCanvasRange);
    if ((n = this._intervalize(a.default.addInterval(n, o / 2, t > 0), i)) < s) {
      n = s;
    } else if (n > l) {
      n = l;
    }
    return n;
  },
  _add: function () {
    return NaN;
  },
  isValueProlonged: true
};
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;