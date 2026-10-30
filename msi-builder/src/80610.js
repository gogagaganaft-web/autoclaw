exports.pie = exports.doughnut = exports.donut = undefined;
var i = require("./20576.js");
var o = require("./95479.js");
var a = require("./21667.js");
var r = require("./19157.js");
var s = require("./13306.js");
var l = require("./58821.js");
var u = a.chart;
var d = l.chart.bar;
var c = s.extend;
var h = o.each;
var f = i.noop;
var p = r.map;
var g = isFinite;
var m = Math.max;
var _ = c({}, d, {
  _setGroupsSettings: function () {
    u._setGroupsSettings.apply(this, arguments);
    this._labelsGroup.attr({
      "pointer-events": null
    });
  },
  _createErrorBarGroup: f,
  _drawPoint: function (e) {
    var t = e.point;
    var n = this._legendCallback;
    u._drawPoint.call(this, e);
    if (!t.isVisible()) {
      t.setInvisibility();
    }
    if (t.isSelected()) {
      n();
    }
  },
  _getOldPoint: function (e, t, n) {
    var i = (this._points || [])[n];
    if (i) {
      t[i.argument.valueOf()] = t[i.argument.valueOf()].filter(function (e) {
        return e !== i;
      });
    }
    return i;
  },
  adjustLabels: function (e) {
    return (this._points || []).reduce(function (t, n) {
      if (n._label.isVisible()) {
        n.setLabelTrackerData();
        t = n.applyWordWrap(e) || t;
        n.updateLabelCoord(e);
        return t;
      }
    }, false);
  },
  _applyElementsClipRect: f,
  getColor: f,
  areErrorBarsVisible: f,
  drawLabelsWOPoints: function () {
    return this._options.label.position !== "inside" && (this._labelsGroup.append(this._extGroups.labelsGroup), (this._points || []).forEach(function (e) {
      e.drawLabel();
    }), true);
  },
  getPointsCount: function () {
    var e = this;
    return this._data.filter(function (t) {
      return e._checkData(t);
    }).length;
  },
  setMaxPointsCount: function (e) {
    this._pointsCount = e;
  },
  _getCreatingPointOptions: function (e, t) {
    return this._getPointOptions(e, t);
  },
  _updateOptions: function (e) {
    this.labelSpace = 0;
    this.innerRadius = this.type === "pie" ? 0 : e.innerRadius;
  },
  _checkData: function (e, t) {
    var n = d._checkData.call(this, e, t, {
      value: this.getValueFields()[0]
    });
    if (this._options.paintNullPoints) {
      return n;
    } else {
      return n && e.value !== null;
    }
  },
  _createGroups: u._createGroups,
  _setMarkerGroupSettings: function () {
    this._markersGroup.attr({
      class: "dxc-markers"
    });
  },
  _getMainColor: function (e, t) {
    var n = this.getPointsByArg(e.argument);
    var i = t ? n.indexOf(t) : n.length;
    return this._options.mainSeriesColor(e.argument, i, this._pointsCount);
  },
  _getPointOptions: function (e) {
    return this._parsePointOptions(this._preparePointOptions(), this._options.label, e);
  },
  _getRangeData: function () {
    return this._rangeData;
  },
  _createPointStyles: function (e, t, n) {
    var o = (0, r.extractColor)(e.color, true) || this._getMainColor(t, n);
    var a = e.color?.fillId;
    var s = e.hoverStyle || {};
    var l = e.selectionStyle || {};
    if (a) {
      this._turnOffHatching(s, l);
    }
    return {
      labelColor: o,
      normal: this._parsePointStyle(e, o, o),
      hover: this._parsePointStyle(s, a || o, o),
      selection: this._parsePointStyle(l, a || o, o),
      legendStyles: {
        normal: this._createLegendState(e, o),
        hover: this._createLegendState(s, a || o),
        selection: this._createLegendState(l, a || o)
      }
    };
  },
  _getArrangeMinShownValue: function (e, t) {
    var n = this._options.minSegmentSize;
    var i = 0;
    var o = 0;
    t = t || e.length;
    h(e, function (e, a) {
      if (a.isVisible()) {
        if (a.normalInitialValue < n * t / 360) {
          i += n;
        } else {
          o += a.normalInitialValue;
        }
      }
    });
    if (i < 360) {
      return n * o / (360 - i);
    } else {
      return 0;
    }
  },
  _applyArrangeCorrection: function (e, t, n) {
    var i;
    var o = this._options;
    var a = o.segmentsDirection !== "anticlockwise";
    var s = g(o.startAngle) ? (0, r.normalizeAngle)(o.startAngle) : 0;
    var l = o.minSegmentSize;
    var u = 0;
    var d = 0;
    if (n === 0) {
      n = e.filter(function (e) {
        return e.isVisible();
      }).length;
      d = 1;
    }
    h(a ? e : e.concat([]).reverse(), function (e, o) {
      var a;
      var r = o.isVisible() ? d || o.normalInitialValue : 0;
      if (l && o.isVisible() && r < t) {
        a = t;
      }
      i = r / n;
      o.correctValue(u, i, d + (a || 0));
      o.shiftedAngle = s;
      u += a || r;
    });
    this._rangeData = {
      val: {
        min: 0,
        max: u
      }
    };
  },
  _removePoint: function (e) {
    var t = this.getPointsByArg(e.argument);
    t.splice(t.indexOf(e), 1);
    e.dispose();
  },
  arrangePoints: function () {
    var e;
    var t = this;
    var n = t._points || [];
    var i = t._options.minSegmentSize;
    for (var o = true, a = 0, r = n.length; a < r && o;) {
      o = n[a].value <= 0;
      a++;
    }
    var s = t._points = p(n, function (e) {
      if (e.value === null || !o && e.value < 0) {
        t._removePoint(e);
        return null;
      } else {
        return e;
      }
    });
    var l = s.reduce(function (e, t) {
      return m(e, Math.abs(t.initialValue));
    }, 0);
    s.forEach(function (e) {
      e.normalInitialValue = e.initialValue / (l !== 0 ? l : 1);
    });
    var u = s.reduce(function (e, t) {
      return e + (t.isVisible() ? t.normalInitialValue : 0);
    }, 0);
    if (i) {
      e = this._getArrangeMinShownValue(s, u);
    }
    t._applyArrangeCorrection(s, e, u);
  },
  correctPosition: function (e, t) {
    h(this._points, function (t, n) {
      n.correctPosition(e);
    });
    this.setVisibleArea(t);
  },
  correctRadius: function (e) {
    this._points.forEach(function (t) {
      t.correctRadius(e);
    });
  },
  correctLabelRadius: function (e) {
    this._points.forEach(function (t) {
      t.correctLabelRadius(e);
    });
  },
  setVisibleArea: function (e) {
    this._visibleArea = {
      minX: e.left,
      maxX: e.width - e.right,
      minY: e.top,
      maxY: e.height - e.bottom
    };
  },
  _applyVisibleArea: f,
  _animate: function (e) {
    var t;
    var n = this;
    var i = n._points;
    var o = i && i.length;
    function a() {
      n._animateComplete();
    }
    t = e ? function (e, t) {
      e.animate(t === o - 1 ? a : undefined, 0.7, t * 0.30000000000000004 / (o - 1));
    } : function (e, t) {
      e.animate(t === o - 1 ? a : undefined);
    };
    i.forEach(t);
  },
  getVisiblePoints: function () {
    return p(this._points, function (e) {
      if (e.isVisible()) {
        return e;
      } else {
        return null;
      }
    });
  },
  getPointsByKeys: function (e, t) {
    var n = this.getPointsByArg(e);
    return n[t] && [n[t]] || [];
  }
});
exports.pie = _;
var v = _;
exports.doughnut = v;
var y = _;
exports.donut = y;