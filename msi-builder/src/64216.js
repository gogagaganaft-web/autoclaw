exports.chart = undefined;
var i = require("./7222.js");
var o = require("./21667.js");
var a = require("./90048.js");
var r = require("./58821.js");
var s = require("./13306.js");
var l = require("./95479.js");
var u = require("./20576.js");
function d(e) {
  return (d = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function c(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (d(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (d(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (d(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var h = i.chart.line;
var f = a.chart.area;
var p = r.chart.bar;
var g = r.polar.bar;
var m = s.extend;
var _ = l.each;
var v = u.noop;
var y = {};
exports.chart = y;
y.bubble = m({}, o.chart, {
  _calculateErrorBars: v,
  _getMainColor: p._getMainColor,
  _createPointStyles: p._createPointStyles,
  _updatePointsVisibility: p._updatePointsVisibility,
  _getOptionsForPoint: p._getOptionsForPoint,
  _applyMarkerClipRect: h._applyElementsClipRect,
  _parsePointStyle: g._parsePointStyle,
  _createLegendState: f._createLegendState,
  _getColorId: f._getColorId,
  _setMarkerGroupSettings: g._setMarkerGroupSettings,
  areErrorBarsVisible: v,
  _createErrorBarGroup: v,
  _checkData: function (e, t) {
    return o.chart._checkData.call(this, e, t, {
      value: this.getValueFields()[0],
      size: this.getSizeField()
    });
  },
  _getPointDataSelector: function (e, t) {
    var n = this.getSizeField();
    var i = o.chart._getPointDataSelector.call(this);
    return function (e) {
      var t = i(e);
      t.size = e[n];
      return t;
    };
  },
  _aggregators: {
    avg: function (e, t) {
      var n;
      var i = e.data;
      var o = e.intervalStart;
      var a = e.intervalEnd;
      if (i.length) {
        var r = t.getValueFields()[0];
        var s = t.getSizeField();
        var l = i.reduce(function (e, t) {
          e[0] += t[r];
          e[1] += t[s];
          e[2]++;
          return e;
        }, [0, 0, 0]);
        c(n = {}, r, l[0] / l[2]);
        c(n, s, l[1] / l[2]);
        c(n, t.getArgumentField(), t._getIntervalCenter(o, a));
        return n;
      }
    }
  },
  getValueFields: function () {
    return [this._options.valueField || "val"];
  },
  getSizeField: function () {
    return this._options.sizeField || "size";
  },
  _animate: function () {
    var e = this;
    var t = e._drawnPoints.length - 1;
    var n = e._labelsGroup;
    function i() {
      if (n) {
        n.animate({
          opacity: 1
        }, {
          duration: e._defaultDuration
        });
      }
    }
    _(e._drawnPoints || [], function (e, n) {
      n.animate(e === t ? i : undefined, {
        r: n.bubbleSize,
        translateX: n.x,
        translateY: n.y
      });
    });
  },
  _patchMarginOptions: function (e) {
    e.processBubbleSize = true;
    return e;
  }
});