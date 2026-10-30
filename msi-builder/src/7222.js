exports.polar = exports.chart = undefined;
var i = require("./21667.js");
var o = require("./48013.js");
var a = require("./13306.js");
var r = require("./95479.js");
var s = require("./19157.js");
var l = require("./60810.js");
var u = Math.round;
var d = Math.sqrt;
var c = Math.pow;
var h = Math.min;
var f = Math.max;
var p = Math.abs;
var g = {};
exports.chart = g;
var m = {};
function _(e, t, n, i) {
  var a = (0, o.clone)(e);
  a.x = t;
  a.y = n;
  a.angle = i;
  return a;
}
function v(e, t, n, i, o) {
  var a = e.angle + o;
  var r = (0, s.getCosAndSin)(a);
  return _(t, n.x + (e.radius + i * o) * r.cos, n.y - (e.radius + i * o) * r.sin, a);
}
exports.polar = m;
var y = {
  autoHidePointMarkersEnabled: function () {
    return true;
  },
  _applyGroupSettings: function (e, t, n) {
    t = (0, a.extend)(t, e);
    this._applyElementsClipRect(t);
    n.attr(t);
  },
  _setGroupsSettings: function (e) {
    var t = this._styles.normal;
    this._applyGroupSettings(t.elements, {
      class: "dxc-elements"
    }, this._elementsGroup);
    if (this._bordersGroup) {
      this._applyGroupSettings(t.border, {
        class: "dxc-borders"
      }, this._bordersGroup);
    }
    i.chart._setGroupsSettings.call(this, e);
    if (e && this._markersGroup) {
      this._markersGroup.attr({
        opacity: 0.001
      });
    }
  },
  _createGroups: function () {
    this._createGroup("_elementsGroup", this, this._group);
    if (this._areBordersVisible()) {
      this._createGroup("_bordersGroup", this, this._group);
    }
    i.chart._createGroups.call(this);
  },
  _areBordersVisible: function () {
    return false;
  },
  _getDefaultSegment: function (e) {
    return {
      line: (0, s.map)(e.line || [], function (e) {
        return e.getDefaultCoords();
      })
    };
  },
  _prepareSegment: function (e) {
    return {
      line: e
    };
  },
  _parseLineOptions: function (e, t) {
    return {
      stroke: (0, s.extractColor)(e.color, true) || t,
      "stroke-width": e.width,
      dashStyle: e.dashStyle || "solid"
    };
  },
  _parseStyle: function (e, t) {
    return {
      elements: this._parseLineOptions(e, t)
    };
  },
  _applyStyle: function (e) {
    if (this._elementsGroup) {
      this._elementsGroup.attr(e.elements);
    }
    (0, r.each)(this._graphics || [], function (t, n) {
      if (n.line) {
        n.line.attr({
          "stroke-width": e.elements["stroke-width"]
        }).sharp();
      }
    });
  },
  _drawElement: function (e, t) {
    return {
      line: this._createMainElement(e.line, {
        "stroke-width": this._styles.normal.elements["stroke-width"]
      }).append(t)
    };
  },
  _removeElement: function (e) {
    e.line.remove();
  },
  _updateElement: function (e, t, n, i) {
    var o = {
      points: t.line
    };
    var a = e.line;
    if (n) {
      a.animate(o, {}, i);
    } else {
      a.attr(o);
    }
  },
  _animateComplete: function () {
    i.chart._animateComplete.call(this);
    if (this._markersGroup) {
      this._markersGroup.animate({
        opacity: 1
      }, {
        duration: this._defaultDuration
      });
    }
  },
  _animate: function () {
    var e = this;
    var t = e._graphics.length - 1;
    (0, r.each)(e._graphics || [], function (n, i) {
      var o;
      if (n === t) {
        o = function () {
          e._animateComplete();
        };
      }
      e._updateElement(i, e._segments[n], true, o);
    });
  },
  _drawPoint: function (e) {
    i.chart._drawPoint.call(this, {
      point: e.point,
      groups: e.groups
    });
  },
  _createMainElement: function (e, t) {
    return this._renderer.path(e, "line").attr(t);
  },
  _sortPoints: function (e, t) {
    if (t) {
      return e.sort(function (e, t) {
        return t.y - e.y;
      });
    } else {
      return e.sort(function (e, t) {
        return e.x - t.x;
      });
    }
  },
  _drawSegment: function (e, t, n, i) {
    var o = this._options.rotated;
    var a = this._prepareSegment(e, o, i);
    this._segments.push(a);
    if (this._graphics[n]) {
      if (!t) {
        this._updateElement(this._graphics[n], a);
      }
    } else {
      this._graphics[n] = this._drawElement(t ? this._getDefaultSegment(a) : a, this._elementsGroup);
    }
  },
  _getTrackerSettings: function () {
    var e = this._defaultTrackerWidth;
    var t = this._styles.normal.elements["stroke-width"];
    return {
      "stroke-width": t > e ? t : e,
      fill: "none"
    };
  },
  _getMainPointsFromSegment: function (e) {
    return e.line;
  },
  _drawTrackerElement: function (e) {
    return this._createMainElement(this._getMainPointsFromSegment(e), this._getTrackerSettings(e));
  },
  _updateTrackerElement: function (e, t) {
    var n = this._getTrackerSettings(e);
    n.points = this._getMainPointsFromSegment(e);
    t.attr(n);
  },
  checkSeriesViewportCoord: function (e, t) {
    if (!i.chart.checkSeriesViewportCoord.call(this)) {
      return false;
    }
    var n = e.isArgumentAxis ? this.getArgumentRange() : this.getViewport();
    var o = e.getTranslator().translate(n.categories ? n.categories[0] : n.min);
    var a = e.getTranslator().translate(n.categories ? n.categories[n.categories.length - 1] : n.max);
    var r = this.getOptions().rotated;
    var s = e.getOptions().inverted;
    if (e.isArgumentAxis && (!r && !s || r && s) || !e.isArgumentAxis && (r && !s || !r && s)) {
      return t >= o && t <= a;
    } else {
      return t >= a && t <= o;
    }
  }
};
var b = g.line = (0, a.extend)({}, i.chart, y, {
  getPointCenterByArg: function (e) {
    var t = this.getArgumentAxis().getTranslator().translate(e);
    return {
      x: t,
      y: t
    };
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    for (var i = this._getNearestPointsByCoord(e, t), o = t && !this._options.rotated || !t && this._options.rotated, a = 0; a < i.length; a++) {
      var r = i[a];
      var s = (r[1].vy - r[0].vy) / (r[1].vx - r[0].vx);
      var l = r[0].vy - r[0].vx * s;
      var u = undefined;
      u = r[1].vx - r[0].vx == 0 ? o ? r[0].vy : r[0].vx : o ? s * e + l : (e - l) / s;
      if (this._checkAxisVisibleAreaCoord(!t, u)) {
        n = u;
        break;
      }
    }
    return n;
  }
});
g.stepline = (0, a.extend)({}, b, {
  _calculateStepLinePoints: function (e) {
    var t = [];
    var n = this._options.rotated ? "x" : "y";
    (0, r.each)(e, function (e, i) {
      var a;
      if (e) {
        var r = t[t.length - 1][n];
        if (r !== i[n]) {
          (a = (0, o.clone)(i))[n] = r;
          t.push(a);
        }
        t.push(i);
      } else {
        t.push(i);
      }
    });
    return t;
  },
  _prepareSegment: function (e) {
    return b._prepareSegment(this._calculateStepLinePoints(e));
  },
  getSeriesPairCoord: function (e, t) {
    var n;
    var i = this._options.rotated;
    var o = !t && !i || t && i;
    var a = o ? "vy" : "vx";
    var r = o ? "vx" : "vy";
    for (var s = this._getNearestPointsByCoord(e, t), l = 0; l < s.length; l++) {
      var u = s[l];
      var d = undefined;
      d = t ? e !== u[1][a] ? u[0][r] : u[1][r] : e === u[0][a] ? u[0][r] : u[1][r];
      if (this._checkAxisVisibleAreaCoord(!t, d)) {
        n = d;
        break;
      }
    }
    return n;
  }
});
g.spline = (0, a.extend)({}, b, {
  _calculateBezierPoints: function (e, t) {
    var n = [];
    var i = e;
    function o(e, t, n) {
      if (e > t && n > e || e < t && n < e) {
        return e;
      } else {
        return n;
      }
    }
    if (i.length !== 1) {
      i.forEach(function (e, a) {
        var r;
        var s;
        var l;
        var u;
        var d;
        var c;
        var h;
        var f;
        var p;
        var g;
        var m;
        var v;
        var y = i[a - 1];
        var b = i[a + 1];
        if (a && a !== i.length - 1) {
          var x = e.x;
          var w = e.y;
          d = y.x;
          c = b.x;
          h = y.y;
          f = b.y;
          if (!t && (!!(w <= y.y) && !!(w <= b.y) || !!(w >= y.y) && !!(w >= b.y)) || !!t && (!!(x <= y.x) && !!(x <= b.x) || !!(x >= y.x) && !!(x >= b.x))) {
            if (t) {
              l = r = x;
              u = (w + b.y) / 2;
              s = (w + y.y) / 2;
            } else {
              u = s = w;
              l = (x + b.x) / 2;
              r = (x + y.x) / 2;
            }
          } else {
            p = f - h;
            g = d - c;
            m = h * c - d * f;
            if (t) {
              if (!p) {
                n.push(e, e, e);
                return;
              }
              d -= v = (g * w + m) * -1 / p - x;
              c -= v;
            } else {
              if (!g) {
                n.push(e, e, e);
                return;
              }
              h -= v = (p * x + m) * -1 / g - w;
              f -= v;
            }
            l = (x + c * 0.5) / 1.5;
            u = (w + f * 0.5) / 1.5;
            r = (x + d * 0.5) / 1.5;
            s = (w + h * 0.5) / 1.5;
          }
          if (t) {
            r = o(y.x, x, r);
            l = o(b.x, x, l);
          } else {
            s = o(y.y, w, s);
            u = o(b.y, w, u);
          }
          var C = _(e, r, s);
          var S = _(e, l, u);
          n.push(C, e, S);
        } else {
          n.push(e, e);
        }
      });
    } else {
      n.push(i[0]);
    }
    return n;
  },
  _prepareSegment: function (e, t) {
    return b._prepareSegment(this._calculateBezierPoints(e, t));
  },
  _createMainElement: function (e, t) {
    return this._renderer.path(e, "bezier").attr(t);
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    var i = !t && !this._options.rotated || t && this._options.rotated;
    var o = i ? "vy" : "vx";
    var a = i ? "y" : "x";
    var r = i ? "vx" : "vy";
    var s = i ? "x" : "y";
    var u = (t ? this.getValueAxis() : this.getArgumentAxis()).getVisibleArea();
    for (var d = this._getNearestPointsByCoord(e, t), c = function () {
        var t = d[h];
        if (t.length === 1) {
          if (u[0] <= t[0][r] && u[1] >= t[0][r]) {
            n = t[0][r];
          }
        } else {
          (function (e, t, n, i, o) {
            var a = t - e;
            var r = n * 3 - t * 3;
            var s = i * 3 - n * 6 + t * 3;
            var u = o - i * 3 + n * 3 - t;
            return (0, l.solveCubicEquation)(u, s, r, a);
          })(e, t[0][o], t[1][a], t[2][a], t[3][o]).forEach(function (e) {
            if (e >= 0 && e <= 1) {
              var i = Math.pow(1 - e, 3) * t[0][r] + Math.pow(1 - e, 2) * 3 * e * t[1][s] + (1 - e) * 3 * e * e * t[2][s] + e * e * e * t[3][r];
              if (u[0] <= i && u[1] >= i) {
                n = i;
              }
            }
          });
        }
        if (n !== null) {
          return "break";
        }
      }, h = 0; h < d.length; h++) {
      if (c() === "break") {
        break;
      }
    }
    return n;
  },
  _getNearestPoints: function (e, t, n) {
    var i = n.indexOf(e);
    return [e, n[i + 1], n[i + 2], t];
  },
  _getBezierPoints: function () {
    if (this._segments.length > 0) {
      return this._segments.reduce(function (e, t) {
        return e.concat(t.line);
      }, []);
    } else {
      return [];
    }
  }
});
m.line = (0, a.extend)({}, i.polar, y, {
  _sortPoints: function (e) {
    return e;
  },
  _prepareSegment: function (e, t, n) {
    var i;
    var o = [];
    var a = this.getValueAxis().getCenter();
    if (n) {
      this._closeSegment(e);
    }
    if (this.argumentAxisType === "discrete" || this.valueAxisType === "discrete") {
      return b._prepareSegment.call(this, e);
    }
    for (i = 1; i < e.length; i++) {
      o = o.concat(this._getTangentPoints(e[i], e[i - 1], a, i === e.length - 1));
    }
    if (!o.length) {
      o = e;
    }
    return {
      line: o
    };
  },
  _getRemainingAngle: function (e) {
    var t = (0, s.normalizeAngle)(e);
    if (e >= 0) {
      return 360 - t;
    } else {
      return -t;
    }
  },
  _closeSegment: function (e) {
    var t;
    t = this._segments.length ? this._segments[0].line[0] : _(e[0], e[0].x, e[0].y, e[0].angle);
    if (t = this._modifyReflectedPoint(t, e[e.length - 1])) {
      e.push(t);
    }
  },
  _modifyReflectedPoint: function (e, t) {
    if (t.angle !== e.angle) {
      if ((0, s.normalizeAngle)(u(t.angle)) === (0, s.normalizeAngle)(u(e.angle))) {
        e.angle = t.angle;
      } else {
        var n = t.angle - e.angle;
        e.angle = t.angle + this._getRemainingAngle(n);
      }
      return e;
    }
  },
  _getTangentPoints: function (e, t, n, i) {
    var o;
    var a = [];
    var r = Math.round(t.angle - e.angle);
    var s = (t.radius - e.radius) / r;
    if (r === 0) {
      a = [t, e];
    } else if (r > 0) {
      for (o = i ? r : r - 1; o >= 0; o--) {
        a.push(v(e, t, n, s, o));
      }
    } else {
      var l = i ? r : r + 1;
      for (o = 0; o >= l; o--) {
        a.push(v(e, t, n, s, r - o));
      }
    }
    return a;
  },
  getSeriesPairCoord: function (e, t) {
    var n;
    var i = this.getArgumentAxis();
    var o = t ? "angle" : "radius";
    var a = e[o];
    var r = i.getCenter();
    function u(e, t, n) {
      var o;
      var a;
      var s = n.x;
      var l = n.y;
      return d(c((o = {
        x: s,
        y: l
      }).x - (a = r).x, 2) + c(o.y - a.y, 2)) <= i.getRadius() && h(e.x, t.x) <= s && f(e.x, t.x) >= s && h(e.y, t.y) <= l && f(e.y, t.y) >= l;
    }
    var g = this.getNeighborPoints(a, o);
    if (g.length === 1) {
      n = g[0];
    } else if (g.length > 1) {
      var m;
      var _;
      var y = g[0];
      var b = g[1];
      if (this.argumentAxisType !== "discrete" && this.valueAxisType !== "discrete") {
        if (t) {
          m = (y.radius - b.radius) / (y.angle - b.angle);
          _ = a - b.angle;
        } else {
          m = (y.radius - b.radius) / (y.angle - b.angle);
          _ = (a - b.radius) / m;
        }
        n = v(b, y, r, m, _);
      } else if (t) {
        var x = (0, s.getCosAndSin)(-a);
        var w = (b.y - y.y) / (b.x - y.x);
        var C = y.y - y.x * w;
        var S = x.sin / x.cos;
        var k = (r.y - S * r.x - C) / (w - S);
        var D = w * k + C;
        if (u(y, b, {
          x: k,
          y: D
        })) {
          var I = p((0, l.trunc)((360 + a) / 90) % 4);
          if (I === 0 && k >= r.x && D <= r.y || I === 1 && k <= r.x && D <= r.y || I === 2 && k <= r.x && D >= r.y || I === 3 && k >= r.x && D >= r.y) {
            n = {
              x: k,
              y: D
            };
          }
        }
      } else {
        var T = (b.y - y.y) / (b.x - y.x);
        var E = y.y - y.x * T;
        var O = 1 + T * T;
        var A = r.x * -2 + T * 2 * E - T * 2 * r.y;
        var P = A * A - O * 4 * (-c(a, 2) + c(E - r.y, 2) + c(r.x, 2));
        if (P >= 0) {
          var M = (-A - d(P)) / (O * 2);
          var R = (-A + d(P)) / (O * 2);
          var B = T * M + E;
          var L = T * R + E;
          n = u(y, b, {
            x: M,
            y: B
          }) ? {
            x: M,
            y: B
          } : u(y, b, {
            x: R,
            y: L
          }) ? {
            x: R,
            y: L
          } : undefined;
        }
      }
    }
    return n;
  },
  getNeighborPoints: function (e, t) {
    var n = this.getPoints();
    var i = [];
    if (this.getOptions().closed) {
      var o = (n = (0, a.extend)(true, [], n))[n.length - 1];
      var r = _(n[0], n[0].x, n[0].y, n[0].angle);
      var s = _(o, o.x, o.y, o.angle);
      var l = this._modifyReflectedPoint(r, o);
      var u = this._modifyReflectedPoint(s, n[0]);
      if (u) {
        n.unshift(u);
      }
      if (l) {
        n.push(l);
      }
    }
    for (var d = 1; d < n.length && (n[d - 1][t] === e ? i.push(n[d - 1]) : n[d][t] === e ? i.push(n[d]) : (n[d][t] > e && n[d - 1][t] < e || n[d - 1][t] > e && n[d][t] < e) && (i.push(n[d - 1]), i.push(n[d])), !(i.length > 0)); d++);
    return i;
  }
});