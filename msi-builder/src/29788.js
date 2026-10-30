exports.stock = exports.candlestick = undefined;
var i = require("./21667.js");
var o = require("./58821.js");
var a = require("./13306.js");
var r = require("./35922.js");
var s = require("./19157.js");
var l = require("./20576.js");
var u = o.chart.bar;
var d = (0, a.extend)({}, i.chart, {
  _animate: l.noop,
  _applyMarkerClipRect: function (e) {
    e["clip-path"] = this._forceClipping ? this._paneClipRectID : this._widePaneClipRectID;
  },
  _updatePointsVisibility: u._updatePointsVisibility,
  _getOptionsForPoint: u._getOptionsForPoint,
  _createErrorBarGroup: l.noop,
  areErrorBarsVisible: l.noop,
  _createGroups: i.chart._createGroups,
  _setMarkerGroupSettings: function () {
    var e = this._markersGroup;
    var t = this._createPointStyles(this._getMarkerGroupOptions());
    var n = (0, a.extend)(t.normal, {
      class: "default-markers"
    });
    var i = (0, a.extend)(t.positive.normal, {
      class: "default-positive-markers"
    });
    var o = (0, a.extend)(t.reduction.normal, {
      class: "reduction-markers"
    });
    var r = (0, a.extend)(t.reductionPositive.normal, {
      class: "reduction-positive-markers"
    });
    var s = {
      class: "dxc-markers"
    };
    this._applyMarkerClipRect(s);
    e.attr(s);
    this._createGroup("defaultMarkersGroup", e, e, n);
    this._createGroup("reductionMarkersGroup", e, e, o);
    this._createGroup("defaultPositiveMarkersGroup", e, e, i);
    this._createGroup("reductionPositiveMarkersGroup", e, e, r);
  },
  _setGroupsSettings: function () {
    i.chart._setGroupsSettings.call(this, false);
  },
  _getCreatingPointOptions: function () {
    var e;
    var t = this._predefinedPointOptions;
    if (!t) {
      e = this._getPointOptions();
      this._predefinedPointOptions = t = (0, a.extend)(true, {
        styles: {}
      }, e);
      t.styles.normal = t.styles.positive.normal = t.styles.reduction.normal = t.styles.reductionPositive.normal = {
        "stroke-width": e.styles && e.styles.normal && e.styles.normal["stroke-width"]
      };
    }
    return t;
  },
  _checkData: function (e, t) {
    var n = this.getValueFields();
    return i.chart._checkData.call(this, e, t, {
      openValue: n[0],
      highValue: n[1],
      lowValue: n[2],
      closeValue: n[3]
    }) && e.highValue == e.highValue && e.lowValue == e.lowValue;
  },
  _getPointDataSelector: function (e, t) {
    var n;
    var i;
    var o = this;
    var a = this;
    var l = a.getValueFields();
    var u = a.getArgumentField();
    var d = l[0];
    var c = l[1];
    var h = l[2];
    var f = l[3];
    a.level = a._options.reduction.level;
    switch ((0, s.normalizeEnum)(a.level)) {
      case "open":
        n = d;
        break;
      case "high":
        n = c;
        break;
      case "low":
        n = h;
        break;
      default:
        n = f;
        a.level = "close";
    }
    return function (e) {
      var t = e[n];
      var s = false;
      if ((0, r.isDefined)(t)) {
        if ((0, r.isDefined)(i)) {
          s = t < i;
        }
        i = t;
      }
      return {
        argument: e[u],
        highValue: o._processEmptyValue(e[c]),
        lowValue: o._processEmptyValue(e[h]),
        closeValue: o._processEmptyValue(e[f]),
        openValue: o._processEmptyValue(e[d]),
        reductionValue: t,
        tag: e[a.getTagField()],
        isReduction: s,
        data: e
      };
    };
  },
  _parsePointStyle: function (e, t, n) {
    var i = (0, s.extractColor)(e.color, true);
    return {
      stroke: i || t,
      "stroke-width": e.width,
      fill: i || n
    };
  },
  _getDefaultStyle: function (e) {
    var t = (0, s.extractColor)(e.color, true) || this._options.mainSeriesColor;
    return {
      normal: this._parsePointStyle(e, t, t),
      hover: this._parsePointStyle(e.hoverStyle, t, t),
      selection: this._parsePointStyle(e.selectionStyle, t, t)
    };
  },
  _getReductionStyle: function (e) {
    var t = e.reduction.color;
    return {
      normal: this._parsePointStyle({
        color: t,
        width: e.width,
        hatching: e.hatching
      }, t, t),
      hover: this._parsePointStyle(e.hoverStyle, t, t),
      selection: this._parsePointStyle(e.selectionStyle, t, t)
    };
  },
  _createPointStyles: function (e) {
    var t = this._options.innerColor;
    var n = this._getDefaultStyle(e);
    var i = (0, a.extend)(true, {}, n);
    var o = this._getReductionStyle(e);
    var r = (0, a.extend)(true, {}, o);
    i.normal.fill = i.hover.fill = i.selection.fill = t;
    r.normal.fill = r.hover.fill = r.selection.fill = t;
    n.positive = i;
    n.reduction = o;
    n.reductionPositive = r;
    n.labelColor = t;
    return n;
  },
  _endUpdateData: function () {
    delete this._predefinedPointOptions;
  },
  _defaultAggregator: "ohlc",
  _aggregators: {
    ohlc: function (e, t) {
      var n = e.intervalStart;
      var i = e.intervalEnd;
      var o = e.data;
      if (o.length) {
        var a = {};
        var r = t.getValueFields();
        var s = r[1];
        var l = r[2];
        a[s] = -Infinity;
        a[l] = Infinity;
        (a = o.reduce(function (e, t) {
          if (t[s] !== null) {
            e[s] = Math.max(e[s], t[s]);
          }
          if (t[l] !== null) {
            e[l] = Math.min(e[l], t[l]);
          }
          return e;
        }, a))[r[0]] = o[0][r[0]];
        a[r[3]] = o[o.length - 1][r[3]];
        if (!isFinite(a[s])) {
          a[s] = null;
        }
        if (!isFinite(a[l])) {
          a[l] = null;
        }
        a[t.getArgumentField()] = t._getIntervalCenter(n, i);
        return a;
      }
    }
  },
  getValueFields: function () {
    var e = this._options;
    return [e.openValueField || "open", e.highValueField || "high", e.lowValueField || "low", e.closeValueField || "close"];
  },
  getArgumentField: function () {
    return this._options.argumentField || "date";
  },
  _patchMarginOptions: function (e) {
    var t = this._getCreatingPointOptions().styles;
    var n = [t.normal, t.hover, t.selection].reduce(function (e, t) {
      return Math.max(e, t["stroke-width"]);
    }, 0);
    e.size = 10 + n;
    e.sizePointNormalState = 10;
    return e;
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    for (var i = this.getVisiblePoints(), o = 0; o < i.length; o++) {
      var a = i[o];
      var r = undefined;
      if (t) {
        r = a.vx === e ? (a.openY + a.closeY) / 2 : undefined;
      } else {
        var s = [Math.min(a.lowY, a.highY), Math.max(a.lowY, a.highY)];
        r = e >= s[0] && e <= s[1] ? a.vx : undefined;
      }
      if (this._checkAxisVisibleAreaCoord(!t, r)) {
        n = r;
        break;
      }
    }
    return n;
  },
  usePointsToDefineAutoHiding: function () {
    return false;
  }
});
exports.stock = d;
var c = (0, a.extend)({}, d, {
  _parsePointStyle: function (e, t, n) {
    var i = (0, s.extractColor)(e.color, true) || n;
    var o = d._parsePointStyle.call(this, e, t, i);
    o.fill = i;
    o.hatching = e.hatching;
    return o;
  }
});
exports.candlestick = c;