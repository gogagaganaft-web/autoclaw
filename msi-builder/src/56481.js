exports.SlidersController = _;
var i;
var o = require("./20576.js");
var a = require("./11378.js");
var r = (i = require("./48942.js")) && i.__esModule ? i : {
  default: i
};
var s = require("./19157.js");
var l = require("./35922.js");
var u = require("./60810.js");
var d = a.utils.animationSettings;
var c = a.consts.emptySliderMarkerText;
function h(e, t, n, i) {
  return [e, t, n, t, n, i, e, i];
}
function f(e, t) {
  return e < t;
}
function p(e, t) {
  return e > t;
}
function g(e, t) {
  var n;
  for (var i = 0, o = t ? t.length - 1 : 0, a = e; o - i > 1;) {
    if ((a = t[n = i + o >> 1]) === e) {
      return e;
    }
    if (e < a) {
      o = n;
    } else {
      i = n;
    }
  }
  if (t) {
    a = t[e - t[i] <= t[o] - e ? i : o];
  }
  return a;
}
function m() {
  this._lastSelectedRange = this.getSelectedRange();
  delete this._processSelectionChanged;
}
function _(e) {
  var t = {
    renderer: e.renderer,
    root: e.root,
    trackersGroup: e.trackersGroup,
    translator: e.translator
  };
  this._params = e;
  this._areaTracker = e.renderer.path(null, "area").attr({
    class: "area-tracker",
    fill: "#000000",
    opacity: 0.0001
  }).append(e.trackersGroup);
  this._selectedAreaTracker = e.renderer.path(null, "area").attr({
    class: "selected-area-tracker",
    fill: "#000000",
    opacity: 0.0001
  }).append(e.trackersGroup);
  this._shutter = e.renderer.path(null, "area").append(e.root);
  this._sliders = [new r.default(t, 0), new r.default(t, 1)];
  this._processSelectionChanged = m;
}
_.prototype = {
  constructor: _,
  dispose: function () {
    this._sliders[0].dispose();
    this._sliders[1].dispose();
  },
  getTrackerTargets: function () {
    return {
      area: this._areaTracker,
      selectedArea: this._selectedAreaTracker,
      sliders: this._sliders
    };
  },
  _processSelectionChanged: function (e) {
    var t = this.getSelectedRange();
    if (!(0, s.rangesAreEqual)(t, this._lastSelectedRange)) {
      this._params.updateSelectedRange(t, this._lastSelectedRange, e);
      this._lastSelectedRange = t;
    }
  },
  update: function (e, t, n, i, o, a, r, l, u) {
    var d = this._params.translator.getScreenRange();
    this._verticalRange = e;
    this._minRange = r.minRange;
    this._maxRange = r.maxRange;
    this._animationEnabled = t.animationEnabled && this._params.renderer.animationEnabled();
    this._allowSlidersSwap = t.allowSlidersSwap;
    this._sliders[0].update(e, i, o);
    this._sliders[1].update(e, i, o);
    this._sliders[0]._position = this._sliders[1]._position = d[0];
    this._values = !this._params.translator.isValueProlonged && t.snapToTicks ? l : null;
    this._areaTracker.attr({
      points: h(d[0], e[0], d[1], e[1])
    });
    this._isCompactMode = n;
    this._shutterOffset = i.width / 2;
    this._updateSelectedView(a, u);
    this._isOnMoving = (0, s.normalizeEnum)(t.valueChangeMode) === "onhandlemove" || (0, s.normalizeEnum)(t.callValueChanged) === "onmoving";
    this._updateSelectedRange();
    this._applyTotalPosition(false);
  },
  _updateSelectedView: function (e, t) {
    var n = {
      fill: null,
      "fill-opacity": null,
      stroke: null,
      "stroke-width": null
    };
    if (this._isCompactMode) {
      n.stroke = t;
      n["stroke-width"] = 3;
      n.sharp = "v";
    } else {
      n.fill = e.color;
      n["fill-opacity"] = e.opacity;
    }
    this._shutter.attr(n);
  },
  _updateSelectedRange: function () {
    var e;
    var t = this._sliders;
    t[0].cancelAnimation();
    t[1].cancelAnimation();
    this._shutter.stopAnimation();
    if (this._params.translator.getBusinessRange().isEmpty()) {
      t[0]._setText(c);
      t[1]._setText(c);
      t[0]._value = t[1]._value = undefined;
      t[0]._position = this._params.translator.getScreenRange()[0];
      t[1]._position = this._params.translator.getScreenRange()[1];
      this._applyTotalPosition(false);
      (e = this).setSelectedRange = o.noop;
      if (e._processSelectionChanged === m) {
        e._processSelectionChanged();
      }
    } else {
      (function (e) {
        delete e.setSelectedRange;
      })(this);
    }
  },
  _applyTotalPosition: function (e) {
    var t = this._sliders;
    e = this._animationEnabled && e;
    t[0].applyPosition(e);
    t[1].applyPosition(e);
    var n = t[0].getCloudBorder() > t[1].getCloudBorder();
    t[0].setOverlapped(n);
    t[1].setOverlapped(n);
    this._applyAreaTrackersPosition();
    this._applySelectedRangePosition(e);
  },
  _applyAreaTrackersPosition: function () {
    var e = this._sliders[0].getPosition();
    var t = this._sliders[1].getPosition();
    this._selectedAreaTracker.attr({
      points: h(e, this._verticalRange[0], t, this._verticalRange[1])
    }).css({
      cursor: Math.abs(this._params.translator.getScreenRange()[1] - this._params.translator.getScreenRange()[0] - t + e) < 0.001 ? "default" : "pointer"
    });
  },
  _applySelectedRangePosition: function (e) {
    var t;
    var n;
    var i = this._verticalRange;
    var o = this._sliders[0].getPosition();
    var a = this._sliders[1].getPosition();
    n = this._isCompactMode ? [o + Math.ceil(this._shutterOffset), (i[0] + i[1]) / 2, a - Math.floor(this._shutterOffset), (i[0] + i[1]) / 2] : [h((t = this._params.axis.getVisibleArea())[0], i[0], Math.max(o - Math.floor(this._shutterOffset), t[0]), i[1]), h(t[1], i[0], Math.min(a + Math.ceil(this._shutterOffset), t[1]), i[1])];
    if (e) {
      this._shutter.animate({
        points: n
      }, d);
    } else {
      this._shutter.attr({
        points: n
      });
    }
  },
  getSelectedRange: function () {
    return {
      startValue: this._sliders[0].getValue(),
      endValue: this._sliders[1].getValue()
    };
  },
  setSelectedRange: function (e, t) {
    e = e || {};
    var n = this._params.translator;
    var i = n.getBusinessRange();
    var o = i.axisType === "discrete" ? function (e, t) {
      return e < t;
    } : function (e, t) {
      return e <= t;
    };
    var a = (0, s.adjustVisualRange)({
      dataType: i.dataType,
      axisType: i.axisType,
      base: i.base
    }, {
      startValue: n.isValid(e.startValue) ? n.getCorrectValue(e.startValue, 1) : undefined,
      endValue: n.isValid(e.endValue) ? n.getCorrectValue(e.endValue, -1) : undefined,
      length: e.length
    }, {
      min: i.minVisible,
      max: i.maxVisible,
      categories: i.categories
    });
    var r = a.startValue;
    var d = a.endValue;
    r = (0, l.isNumeric)(r) ? (0, u.adjust)(r) : r;
    d = (0, l.isNumeric)(d) ? (0, u.adjust)(d) : d;
    var c = o(n.to(r, -1), n.to(d, 1)) ? [r, d] : [d, r];
    this._sliders[0].setDisplayValue(c[0]);
    this._sliders[1].setDisplayValue(c[1]);
    this._sliders[0]._position = n.to(c[0], -1);
    this._sliders[1]._position = n.to(c[1], 1);
    this._applyTotalPosition(true);
    this._processSelectionChanged(t);
  },
  beginSelectedAreaMoving: function (e) {
    var t = this;
    var n = t._sliders;
    var i = (n[0].getPosition() + n[1].getPosition()) / 2 - e;
    var o = e;
    a.complete = function (e) {
      t._dockSelectedArea(e);
    };
    return a;
    function a(e, a) {
      if (e !== o && e > o == e > (n[0].getPosition() + n[1].getPosition()) / 2 - i) {
        t._moveSelectedArea(e + i, false, a);
      }
      o = e;
    }
  },
  _dockSelectedArea: function (e) {
    var t = this._params.translator;
    var n = this._sliders;
    n[0]._position = t.to(n[0].getValue(), -1);
    n[1]._position = t.to(n[1].getValue(), 1);
    this._applyTotalPosition(true);
    this._processSelectionChanged(e);
  },
  moveSelectedArea: function (e, t) {
    this._moveSelectedArea(e, true, t);
    this._dockSelectedArea(t);
  },
  _moveSelectedArea: function (e, t, n) {
    var i = this._params.translator;
    var o = this._sliders;
    var a = o[1].getPosition() - o[0].getPosition();
    var r = e - a / 2;
    var s = e + a / 2;
    if (r < i.getScreenRange()[0]) {
      s = (r = i.getScreenRange()[0]) + a;
    }
    if (s > i.getScreenRange()[1]) {
      r = (s = i.getScreenRange()[1]) - a;
    }
    var l = g(i.from(r, -1), this._values);
    o[0].setDisplayValue(l);
    o[1].setDisplayValue(g(i.from(i.to(l, -1) + a, 1), this._values));
    o[0]._position = r;
    o[1]._position = s;
    this._applyTotalPosition(t);
    if (this._isOnMoving) {
      this._processSelectionChanged(n);
    }
  },
  placeSliderAndBeginMoving: function (e, t, n) {
    var i = this._params.translator;
    var o = this._sliders;
    var a = e < t ? 0 : 1;
    var r = a > 0 ? 1 : -1;
    var s = a > 0 ? p : f;
    var l = a > 0 ? f : p;
    var u = [];
    var d = [];
    d[a] = i.from(e, r);
    d[1 - a] = i.from(t, -r);
    u[1 - a] = t;
    if (i.isValueProlonged) {
      if (s(e, i.to(d[a], r))) {
        d[a] = i.from(e, -r);
      }
      if (s(t, i.to(d[a], -r))) {
        d[1 - a] = d[a];
      }
    }
    if (this._minRange) {
      if (s(t, i.to(i.add(g(d[a], this._values), this._minRange, -r), -r))) {
        d[1 - a] = i.add(d[a], this._minRange, -r);
      }
      if (l(e, i.to(i.add(i.getRange()[1 - a], this._minRange, r), -r))) {
        d[1 - a] = i.getRange()[1 - a];
        d[a] = i.add(d[1 - a], this._minRange, r);
        u[1 - a] = e;
      }
    }
    d[0] = g(d[0], this._values);
    d[1] = g(d[1], this._values);
    u[a] = i.to(d[a], r);
    o[0].setDisplayValue(d[0]);
    o[1].setDisplayValue(d[1]);
    o[0]._position = u[0];
    o[1]._position = u[1];
    this._applyTotalPosition(true);
    if (this._isOnMoving) {
      this._processSelectionChanged(n);
    }
    var c = this.beginSliderMoving(1 - a, t);
    o[1 - a]._sliderGroup.stopAnimation();
    this._shutter.stopAnimation();
    c(t);
    return c;
  },
  beginSliderMoving: function (e, t) {
    var n = this;
    var i = n._params.translator;
    var o = n._sliders;
    var a = i.getScreenRange()[0];
    var r = i.getScreenRange()[1];
    var s = e;
    var u = o[1 - s].getPosition();
    var d = t;
    var c = s > 0 ? 1 : -1;
    var h = s > 0 ? f : p;
    var m = s > 0 ? p : f;
    var _ = o[s].getPosition() - t;
    var v = h(o[s].getPosition(), t) ? -_ : _;
    y.complete = function (e) {
      o[s]._setValid(true);
      n._dockSelectedArea(e);
    };
    return y;
    function y(e, t) {
      var f;
      var p;
      var y;
      var b;
      var x;
      var w;
      if (e !== d) {
        if (h(e + v, u)) {
          if ((f = n._allowSlidersSwap) && !i.isValueProlonged && n._minRange) {
            f = i.isValid(i.add(o[1 - s].getValue(), n._minRange, -c));
          }
          if (f) {
            n._changeMovingSlider(s);
            s = 1 - s;
            p = h;
            h = m;
            m = p;
            _ = -(c = -c) * Math.abs(_);
            v = -_;
          }
        }
        if (m(e + _, u)) {
          b = o[s];
          x = o[1 - s].getValue();
          y = Math.max(Math.min(e + _, r), a);
          if ((f = !i.isValueProlonged || !h(y, i.to(x, c))) && n._minRange) {
            if (!(f = !h(y, i.to(i.add(x, n._minRange, c), c)))) {
              w = i.add(x, n._minRange, c);
            }
          }
          if (f && n._maxRange) {
            if (!(f = !m(y, i.to(i.add(x, n._maxRange, c), c)))) {
              w = i.add(x, n._maxRange, c);
            }
          }
          b._setValid(f);
          b.setDisplayValue(f ? g(i.from(y, c), n._values) : (0, l.isDefined)(w) ? w : b.getValue());
          b._position = y;
          n._applyTotalPosition(false);
          b.toForeground();
          if (n._isOnMoving) {
            n._processSelectionChanged(t);
          }
        }
      }
      d = e;
    }
  },
  _changeMovingSlider: function (e) {
    var t;
    var n = this._params.translator;
    var i = this._sliders;
    var o = i[1 - e].getPosition();
    var a = e > 0 ? 1 : -1;
    i[e].setDisplayValue(g(n.from(o, a), this._values));
    t = n.from(o, -a);
    if (n.isValueProlonged) {
      t = n.from(o, a);
    } else if (this._minRange) {
      t = n.add(t, this._minRange, -a);
    }
    i[1 - e].setDisplayValue(g(t, this._values));
    i[e]._setValid(true);
    i[e]._marker._update();
    i[0]._position = i[1]._position = o;
  },
  foregroundSlider: function (e) {
    this._sliders[e].toForeground();
  }
};