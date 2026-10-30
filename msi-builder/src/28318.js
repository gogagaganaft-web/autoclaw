exports.Label = C;
var i;
var o = (i = require("./30343.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./19157.js");
var r = require("./95479.js");
var s = require("./13306.js");
var l = require("./10656.js");
var u = o.default.format;
var d = Math;
var c = d.round;
var h = d.floor;
var f = d.abs;
function p(e, t) {
  var n;
  var i = Infinity;
  (0, r.each)(t, function (t, o) {
    var a = e[0] - o[0];
    var r = e[1] - o[1];
    var s = a * a + r * r;
    if (s < i) {
      i = s;
      n = o;
    }
  });
  return [h(n[0]), h(n[1])];
}
function g(e, t, n) {
  return (t - e[0 + n]) / (e[2 + n] - e[0 + n]) * (e[3 - n] - e[1 - n]) + e[1 - n];
}
var m = {
  isLabelInside: function (e, t) {
    var n = e.x + e.width / 2;
    var i = e.y + e.height / 2;
    return t.x <= n && n <= t.x + t.width && t.y <= i && i <= t.y + t.height;
  },
  prepareLabelPoints: function (e, t, n, i, o) {
    var a = t.x;
    var r = a + t.width / 2;
    var s = a + t.width - 1;
    var l = t.y;
    var u = l + t.height / 2;
    var d = l + t.height - 1;
    var c = f(i) % 90 == 0;
    if (o[0] > a && o[0] < s) {
      if (c) {
        return [[o[0], f(o[1] - l) < f(o[1] - d) ? l : d]];
      } else {
        return [[o[0], g([a, l, s, d], o[0], 0)]];
      }
    } else if (o[1] > l && o[1] < d) {
      if (c) {
        return [[f(o[0] - a) < f(o[0] - s) ? a : s, o[1]]];
      } else {
        return [[g([a, l, s, d], o[1], 1), o[1]]];
      }
    } else if (c) {
      return [[a, l], [n ? a : r, n ? u : l], [s, l], [a, d], [n ? s : r, n ? u : d], [s, d]];
    } else {
      return [[r, u]];
    }
  },
  isHorizontal: function (e, t) {
    return e.x > t.x + t.width || e.x + e.width < t.x;
  },
  getFigureCenter: function (e) {
    return [h(e.x + e.width / 2), h(e.y + e.height / 2)];
  },
  findFigurePoint: function (e, t) {
    var n = m.getFigureCenter(e);
    return p(t, [[e.x, n[1]], [n[0], e.y + e.height], [e.x + e.width, n[1]], [n[0], e.y]]);
  },
  adjustPoints: function (e) {
    var t = f(e[1] - e[3]) <= 1;
    if (f(e[0] - e[2]) <= 1) {
      e[0] = e[2];
    }
    if (t) {
      e[1] = e[3];
    }
    return e;
  }
};
var _ = {
  isLabelInside: function () {
    return false;
  },
  prepareLabelPoints: m.prepareLabelPoints,
  isHorizontal: function (e, t) {
    return e.x > t.x + t.r || e.x + e.width < t.x - t.r;
  },
  getFigureCenter: function (e) {
    return [e.x, e.y];
  },
  findFigurePoint: function (e, t) {
    var n = Math.atan2(e.y - t[1], t[0] - e.x);
    return [c(e.x + e.r * Math.cos(n)), c(e.y - e.r * Math.sin(n))];
  },
  adjustPoints: m.adjustPoints
};
var v = {
  isLabelInside: function (e, t, n) {
    return !n;
  },
  prepareLabelPoints: function (e, t, n, i) {
    var o = e.x;
    var r = o + e.width;
    var s = o + c(e.width / 2);
    var l = e.y;
    var u = l + e.height;
    var d = l + c(e.height / 2);
    var h = [[[o, l], [r, l]], [[r, l], [r, u]], [[r, u], [o, u]], [[o, u], [o, l]]];
    var f = (0, a.getCosAndSin)(i);
    return h = i === 0 ? n ? [[o, d], [r, d]] : [[s, l], [s, u]] : h.map(function (e) {
      return e.map(function (e) {
        return [c((e[0] - s) * f.cos + (e[1] - d) * f.sin + s), c(-(e[0] - s) * f.sin + (e[1] - d) * f.cos + d)];
      });
    }).reduce(function (e, t) {
      var i = t[0][0];
      var o = t[0][1];
      var a = t[1][0];
      var r = t[1][1];
      if (n) {
        if (o >= d && d >= r || o <= d && d <= r) {
          e.push([(d - o) * (a - i) / (r - o) + i, d]);
        }
      } else if (i >= s && s >= a || i <= s && s <= a) {
        e.push([s, (s - i) * (r - o) / (a - i) + o]);
      }
      return e;
    }, []);
  },
  isHorizontal: function (e, t) {
    return e.x > t.x || t.x > e.x + e.width;
  },
  getFigureCenter: _.getFigureCenter,
  findFigurePoint: function (e, t, n) {
    if (!n) {
      return [e.x, e.y];
    }
    var i = t[0];
    var o = c(e.x + (e.y - t[1]) / Math.tan((0, a.degreesToRadians)(e.angle)));
    var r = [e.x, e.y, o, t[1]];
    if ((!(e.x <= o) || !(o <= i)) && (!(i <= o) || !(o <= e.x))) {
      if (f(e.x - i) < 12) {
        r = [e.x, e.y];
      } else if (e.x <= i) {
        r[2] = e.x + 12;
      } else {
        r[2] = e.x - 12;
      }
    }
    return r;
  },
  adjustPoints: function (e) {
    return e;
  }
};
function y(e) {
  return e.angle !== undefined && v || e.r !== undefined && _ || m;
}
function b(e, t) {
  if (e[t]) {
    e[t].dispose();
  }
  e[t] = null;
}
function x(e) {
  return e && (e.fill && e.fill !== "none" || e["stroke-width"] > 0 && e.stroke && e.stroke !== "none");
}
function w(e) {
  return e && e["stroke-width"] > 0 && e.stroke && e.stroke !== "none";
}
function C(e) {
  this._renderer = e.renderer;
  this._container = e.labelsGroup;
  this._point = e.point;
  this._strategy = e.strategy;
  this._rowCount = 1;
}
C.prototype = {
  constructor: C,
  setColor: function (e) {
    this._color = e;
  },
  setOptions: function (e) {
    this._options = e;
  },
  setData: function (e) {
    this._data = e;
  },
  setDataField: function (e, t) {
    this._data = this._data || {};
    this._data[e] = t;
  },
  getData: function () {
    return this._data;
  },
  setFigureToDrawConnector: function (e) {
    this._figure = e;
  },
  dispose: function () {
    b(this, "_group");
    this._data = this._options = this._textContent = this._visible = this._insideGroup = this._text = this._background = this._connector = this._figure = null;
  },
  _setVisibility: function (e, t) {
    if (this._group) {
      this._group.attr({
        visibility: e
      });
    }
    this._visible = t;
  },
  isVisible: function () {
    return this._visible;
  },
  hide: function (e) {
    this._holdVisibility = !!e;
    this._hide();
  },
  _hide: function () {
    this._setVisibility("hidden", false);
  },
  show: function (e) {
    var t = !this._drawn;
    if (this._point.hasValue()) {
      this._holdVisibility = !!e;
      this._show();
      if (t) {
        this._point.correctLabelPosition(this);
      }
    }
  },
  _show: function () {
    var e = this._renderer;
    var t = this._container;
    var n = this._options || {};
    var i = this._textContent = function (e, t) {
      var n = t.format;
      e.valueText = u(e.value, n);
      e.argumentText = u(e.argument, t.argumentFormat);
      if (e.percent !== undefined) {
        e.percentText = u(e.percent, {
          type: "percent",
          precision: n && n.percentPrecision
        });
      }
      if (e.total !== undefined) {
        e.totalText = u(e.total, n);
      }
      if (e.openValue !== undefined) {
        e.openValueText = u(e.openValue, n);
      }
      if (e.closeValue !== undefined) {
        e.closeValueText = u(e.closeValue, n);
      }
      if (e.lowValue !== undefined) {
        e.lowValueText = u(e.lowValue, n);
      }
      if (e.highValue !== undefined) {
        e.highValueText = u(e.highValue, n);
      }
      if (e.reductionValue !== undefined) {
        e.reductionValueText = u(e.reductionValue, n);
      }
      if (t.customizeText) {
        return t.customizeText.call(e, e);
      } else if (t.displayFormat) {
        return (0, l.processDisplayFormat)(t.displayFormat, e);
      } else {
        return e.valueText;
      }
    }(this._data, n) || null;
    if (i) {
      if (!this._group) {
        this._group = e.g().append(t);
        this._insideGroup = e.g().append(this._group);
        this._text = e.text("", 0, 0).append(this._insideGroup);
      }
      this._text.css(n.attributes ? (0, a.patchFontOptions)(n.attributes.font) : {});
      if (x(n.background)) {
        this._background = this._background || e.rect().append(this._insideGroup).toBackground();
        this._background.attr(n.background);
        if (this._color) {
          this._background.attr({
            fill: this._color
          });
        }
      } else {
        b(this, "_background");
      }
      if (w(n.connector)) {
        this._connector = this._connector || e.path([], "line").sharp().append(this._group).toBackground();
        this._connector.attr(n.connector);
        if (this._color) {
          this._connector.attr({
            stroke: this._color
          });
        }
      } else {
        b(this, "_connector");
      }
      this._text.attr({
        text: i,
        align: n.textAlignment,
        class: n.cssClass
      });
      this._updateBackground(this._text.getBBox());
      this._setVisibility("visible", true);
      this._drawn = true;
    } else {
      this._hide();
    }
  },
  _getLabelVisibility: function (e) {
    if (this._holdVisibility) {
      return this.isVisible();
    } else {
      return e;
    }
  },
  draw: function (e) {
    if (this._getLabelVisibility(e)) {
      this._show();
      if (this._point) {
        this._point.correctLabelPosition(this);
      }
    } else {
      this._drawn = false;
      this._hide();
    }
    return this;
  },
  _updateBackground: function (e) {
    if (this._background) {
      e.x -= 8;
      e.y -= 4;
      e.width += 16;
      e.height += 8;
      this._background.attr(e);
    }
    this._bBoxWithoutRotation = (0, s.extend)({}, e);
    var t = this._options.rotationAngle || 0;
    this._insideGroup.rotate(t, e.x + e.width / 2, e.y + e.height / 2);
    e = (0, a.rotateBBox)(e, [e.x + e.width / 2, e.y + e.height / 2], -t);
    this._bBox = e;
  },
  getFigureCenter: function () {
    var e = this._figure;
    return (this._strategy || y(e)).getFigureCenter(e);
  },
  _getConnectorPoints: function () {
    var e;
    var t;
    var n = this._figure;
    var i = this._options;
    var o = this._strategy || y(n);
    var a = this._shiftBBox(this._bBoxWithoutRotation);
    var r = this.getBoundingRect();
    var s = [];
    if (!o.isLabelInside(a, n, i.position !== "inside")) {
      t = o.isHorizontal(a, n);
      var l = this.getFigureCenter();
      e = p(l, s = o.prepareLabelPoints(a, r, t, -i.rotationAngle || 0, l));
      s = (s = o.findFigurePoint(n, e, t)).concat(e);
    }
    return o.adjustPoints(s);
  },
  fit: function (e) {
    var t = this._background ? 16 : 0;
    var n = false;
    if (this._text) {
      var i = this._text.setMaxSize(e - t, undefined, this._options);
      var o = i.rowCount;
      if (o === 0) {
        o = 1;
      }
      if (o !== this._rowCount) {
        n = true;
        this._rowCount = o;
      }
      if (i.textIsEmpty) {
        b(this, "_background");
      }
    }
    this._updateBackground(this._text.getBBox());
    return n;
  },
  resetEllipsis: function () {
    if (this._text) {
      this._text.restoreText();
    }
    this._updateBackground(this._text.getBBox());
  },
  setTrackerData: function (e) {
    this._text.data({
      "chart-data-point": e
    });
    if (this._background) {
      this._background.data({
        "chart-data-point": e
      });
    }
  },
  hideInsideLabel: function (e) {
    return this._point.hideInsideLabel(this, e);
  },
  getPoint: function () {
    return this._point;
  },
  shift: function (e, t) {
    if (this._textContent) {
      this._insideGroup.attr({
        translateX: this._x = c(e - this._bBox.x),
        translateY: this._y = c(t - this._bBox.y)
      });
      if (this._connector) {
        this._connector.attr({
          points: this._getConnectorPoints()
        });
      }
    }
    return this;
  },
  getBoundingRect: function () {
    return this._shiftBBox(this._bBox);
  },
  _shiftBBox: function (e) {
    if (this._textContent) {
      return {
        x: e.x + this._x,
        y: e.y + this._y,
        width: e.width,
        height: e.height
      };
    } else {
      return {};
    }
  },
  getLayoutOptions: function () {
    var e = this._options;
    return {
      alignment: e.alignment,
      background: x(e.background),
      horizontalOffset: e.horizontalOffset,
      verticalOffset: e.verticalOffset,
      radialOffset: e.radialOffset,
      position: e.position,
      connectorOffset: (w(e.connector) ? 12 : 0) + (x(e.background) ? 8 : 0)
    };
  }
};