exports.chart = undefined;
var i = require("./13306.js");
var o = require("./35922.js");
var a = require("./19157.js");
var r = require("./20576.js");
var s = require("./21667.js");
var l = require("./58821.js");
var u = require("./90048.js");
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
var h = i.extend;
var f = l.chart.bar;
var p = u.chart.area;
var g = {};
exports.chart = g;
var m = {
  areErrorBarsVisible: r.noop,
  _createErrorBarGroup: r.noop,
  _checkData: function (e, t) {
    var n = this.getValueFields();
    return s.chart._checkData.call(this, e, t, {
      minValue: n[0],
      value: n[1]
    }) && e.minValue == e.minValue;
  },
  getValueRangeInitialValue: s.chart.getValueRangeInitialValue,
  _getPointDataSelector: function (e) {
    var t = this;
    var n = this.getValueFields();
    var i = n[0];
    var o = n[1];
    var a = this.getTagField();
    var r = this.getArgumentField();
    return function (e) {
      return {
        tag: e[a],
        minValue: t._processEmptyValue(e[i]),
        value: t._processEmptyValue(e[o]),
        argument: e[r],
        data: e
      };
    };
  },
  _defaultAggregator: "range",
  _aggregators: {
    range: function (e, t) {
      var n;
      var i = e.intervalStart;
      var a = e.intervalEnd;
      var r = e.data;
      if (r.length) {
        var s = t.getValueFields();
        var l = s[0];
        var u = s[1];
        var d = r.reduce(function (e, t) {
          var n = t[l];
          var i = t[u];
          if ((0, o.isDefined)(n) && (0, o.isDefined)(i)) {
            e[l] = Math.min(e[l], Math.min(n, i));
            e[u] = Math.max(e[u], Math.max(n, i));
            return e;
          } else {
            return e;
          }
        }, (c(n = {}, l, Infinity), c(n, u, -Infinity), c(n, t.getArgumentField(), t._getIntervalCenter(i, a)), n));
        if (!isFinite(d[l]) || !isFinite(d[u])) {
          if (r.filter(function (e) {
            return e[l] === null && e[u] === null;
          }).length !== r.length) {
            return;
          }
          d[l] = d[u] = null;
        }
        return d;
      }
    }
  },
  getValueFields: function () {
    return [this._options.rangeValue1Field || "val1", this._options.rangeValue2Field || "val2"];
  },
  getSeriesPairCoord: function (e, t) {
    var n = null;
    var i = this._options.rotated;
    var o = !t && !i || t && i;
    var a = o ? "vy" : "vx";
    var r = i ? "minX" : "minY";
    var s = o ? "vx" : "vy";
    for (var l = this.getPoints(), u = 0; u < l.length; u++) {
      var d = l[u];
      var c = undefined;
      if (t) {
        c = d.getCenterCoord()[a[1]] === e ? d[s] : undefined;
      } else {
        var h = [Math.min(d[a], d[r]), Math.max(d[a], d[r])];
        c = e >= h[0] && e <= h[1] ? d[s] : undefined;
      }
      if (this._checkAxisVisibleAreaCoord(!t, c)) {
        n = c;
        break;
      }
    }
    return n;
  }
};
g.rangebar = h({}, f, m);
g.rangearea = h({}, p, {
  _drawPoint: function (e) {
    var t = e.point;
    if (t.isInVisibleArea()) {
      t.clearVisibility();
      t.draw(this._renderer, e.groups);
      this._drawnPoints.push(t);
      if (!t.visibleTopMarker) {
        t.hideMarker("top");
      }
      if (!t.visibleBottomMarker) {
        t.hideMarker("bottom");
      }
    } else {
      t.setInvisibility();
    }
  },
  _prepareSegment: function (e, t) {
    var n = this._processSinglePointsAreaSegment(e, t);
    var i = (0, a.map)(n, function (e) {
      return e.getCoords(true);
    });
    return {
      line: n,
      bottomLine: i,
      area: (0, a.map)(n, function (e) {
        return e.getCoords();
      }).concat(i.slice().reverse()),
      singlePointSegment: n !== e
    };
  },
  _getDefaultSegment: function (e) {
    var t = p._getDefaultSegment.call(this, e);
    t.bottomLine = t.line;
    return t;
  },
  _removeElement: function (e) {
    p._removeElement.call(this, e);
    if (e.bottomLine) {
      e.bottomLine.remove();
    }
  },
  _drawElement: function (e, t) {
    var n = p._drawElement.call(this, e, t);
    n.bottomLine = this._bordersGroup && this._createBorderElement(e.bottomLine, {
      "stroke-width": this._styles.normal.border["stroke-width"]
    }).append(this._bordersGroup);
    return n;
  },
  _applyStyle: function (e) {
    var t = this._elementsGroup;
    var n = this._bordersGroup;
    if (t) {
      t.smartAttr(e.elements);
    }
    if (n) {
      n.attr(e.border);
    }
    (this._graphics || []).forEach(function (t) {
      if (t.line) {
        t.line.attr({
          "stroke-width": e.border["stroke-width"]
        });
      }
      if (t.bottomLine) {
        t.bottomLine.attr({
          "stroke-width": e.border["stroke-width"]
        });
      }
    });
  },
  _updateElement: function (e, t, n, i) {
    var o = {
      points: t.bottomLine
    };
    var a = e.bottomLine;
    p._updateElement.apply(this, arguments);
    if (a) {
      if (n) {
        a.animate(o);
      } else {
        a.attr(o);
      }
    }
  }
}, m);