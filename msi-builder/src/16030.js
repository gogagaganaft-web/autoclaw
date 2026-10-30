exports.twocolorneedle = exports.triangleneedle = exports.trianglemarker = exports.textcloud = exports.rectangleneedle = exports.rangebar = exports._default = undefined;
var i = require("./3446.js");
var o = require("./19157.js");
var a = Number;
var r = o.getCosAndSin;
var s = o.convertAngleToRendererSpace;
function l(e, t) {
  if (e && e.radius - t <= 0) {
    e.radius = t + 1;
  }
  return e;
}
var u = i.BaseIndicator.inherit({
  _move: function () {
    var e = this._options;
    var t = s(this._actualPosition);
    this._rootElement.rotate(t, e.x, e.y);
    if (this._trackerElement) {
      this._trackerElement.rotate(t, e.x, e.y);
    }
  },
  _isEnabled: function () {
    return this._options.width > 0;
  },
  _isVisible: function (e) {
    return e.radius - a(this._options.indentFromCenter) > 0;
  },
  _getTrackerSettings: function () {
    var e = this._options;
    var t = this._getRadius();
    var n = this._getIndentFromCenter();
    var i = e.x;
    var o = e.y - (t + n) / 2;
    var a = e.width / 2;
    var r = (t - n) / 2;
    if (!(a > 10)) {
      a = 10;
    }
    if (!(r > 10)) {
      r = 10;
    }
    return {
      points: [i - a, o - r, i - a, o + r, i + a, o + r, i + a, o - r]
    };
  },
  _render: function () {
    this._renderPointer();
  },
  _clearPointer: function () {
    delete this._element;
  },
  _clear: function () {
    this._clearPointer();
  },
  _getIndentFromCenter: function (e) {
    return Number(this._options.indentFromCenter) || 0;
  },
  _getRadius: function () {
    return 0;
  },
  measure: function (e) {
    var t = {
      max: e.radius
    };
    if (this._options.indentFromCenter < 0) {
      t.inverseHorizontalOffset = t.inverseVerticalOffset = -a(this._options.indentFromCenter);
    }
    return t;
  },
  getTooltipParameters: function () {
    var e = this._options;
    var t = r(this._actualPosition);
    var n = (this._getRadius() + this._getIndentFromCenter()) / 2;
    return {
      x: e.x + t.cos * n,
      y: e.y - t.sin * n,
      value: this._currentValue,
      color: e.color,
      offset: e.width / 2
    };
  }
});
var d = u.inherit({
  _isVisible: function (e) {
    var t = this._adjustOffset(Number(this._options.indentFromCenter), e.radius);
    var n = this._adjustOffset(Number(this._options.offset), e.radius);
    return e.radius - t - n > 0;
  },
  getOffset: function () {
    return 0;
  },
  _adjustOffset: function (e, t) {
    var n = t / Number(this._options.beginAdaptingAtRadius);
    if (n < 1) {
      e = Math.floor(e * n);
    }
    return e || 0;
  },
  _getIndentFromCenter: function (e) {
    return this._adjustOffset(Number(this._options.indentFromCenter), this._options.radius);
  },
  _getRadius: function () {
    var e = this._options;
    return e.radius - this._adjustOffset(Number(e.offset), e.radius);
  },
  _renderSpindle: function () {
    var e = this._options;
    var t = e.radius;
    var n = this._adjustOffset(a(e.spindleSize) / 2, t) * 2;
    var i = this._adjustOffset(a(e.spindleGapSize) / 2, t) * 2 || 0;
    if (i > 0) {
      i = i <= n ? i : n;
    }
    if (n > 0) {
      this._spindleOuter = this._spindleOuter || this._renderer.circle().append(this._rootElement);
      this._spindleInner = this._spindleInner || this._renderer.circle().append(this._rootElement);
      this._spindleOuter.attr({
        class: "dxg-spindle-border",
        cx: e.x,
        cy: e.y,
        r: n / 2
      });
      this._spindleInner.attr({
        class: "dxg-spindle-hole",
        cx: e.x,
        cy: e.y,
        r: i / 2,
        fill: e.containerBackgroundColor
      });
    }
  },
  _render: function () {
    this.callBase();
    this._renderSpindle();
  },
  _clear: function () {
    this.callBase();
    delete this._spindleOuter;
    delete this._spindleInner;
  }
});
var c = d.inherit({
  _renderPointer: function () {
    var e = this._options;
    var t = e.y - this._getRadius();
    var n = e.y - this._getIndentFromCenter();
    var i = e.x - e.width / 2;
    var o = i + a(e.width);
    this._element = this._element || this._renderer.path([], "area").append(this._rootElement);
    this._element.attr({
      points: [i, n, i, t, o, t, o, n]
    });
  }
});
exports.rectangleneedle = exports._default = c;
var h = d.inherit({
  _renderPointer: function () {
    var e = this._options;
    var t = e.y - this._getRadius();
    var n = e.y - this._getIndentFromCenter();
    var i = e.x - e.width / 2;
    var o = e.x + e.width / 2;
    this._element = this._element || this._renderer.path([], "area").append(this._rootElement);
    this._element.attr({
      points: [i, n, e.x, t, o, n]
    });
  }
});
exports.triangleneedle = h;
var f = d.inherit({
  _renderPointer: function () {
    var e;
    var t;
    var n = this._options;
    var i = n.x - n.width / 2;
    var o = n.x + n.width / 2;
    var r = n.y - this._getRadius();
    var s = n.y - this._getIndentFromCenter();
    var l = a(n.secondFraction) || 0;
    e = l >= 1 ? t = s : l <= 0 ? t = r : (t = r + (s - r) * l) + a(n.space);
    this._firstElement = this._firstElement || this._renderer.path([], "area").append(this._rootElement);
    this._spaceElement = this._spaceElement || this._renderer.path([], "area").append(this._rootElement);
    this._secondElement = this._secondElement || this._renderer.path([], "area").append(this._rootElement);
    this._firstElement.attr({
      points: [i, s, i, e, o, e, o, s]
    });
    this._spaceElement.attr({
      points: [i, e, i, t, o, t, o, e],
      class: "dxg-hole",
      fill: n.containerBackgroundColor
    });
    this._secondElement.attr({
      points: [i, t, i, r, o, r, o, t],
      class: "dxg-part",
      fill: n.secondColor
    });
  },
  _clearPointer: function () {
    delete this._firstElement;
    delete this._secondElement;
    delete this._spaceElement;
  }
});
exports.twocolorneedle = f;
var p = u.inherit({
  _isEnabled: function () {
    return this._options.length > 0 && this._options.width > 0;
  },
  _isVisible: function (e) {
    return true;
  },
  resize: function (e) {
    return this.callBase(l(e, 0));
  },
  _render: function () {
    var e = this._options;
    var t = e.x;
    var n = e.y - e.radius;
    var i = e.width / 2 || 0;
    var o = n - a(e.length);
    this._element = this._element || this._renderer.path([], "area").append(this._rootElement);
    var r = {
      points: [t, n, t - i, o, t + i, o],
      stroke: "none",
      "stroke-width": 0,
      "stroke-linecap": "square"
    };
    if (e.space > 0) {
      r["stroke-width"] = Math.min(e.space, e.width / 4) || 0;
      r.stroke = r["stroke-width"] > 0 && e.containerBackgroundColor || "none";
    }
    this._element.attr(r).sharp();
  },
  _clear: function () {
    delete this._element;
  },
  _getTrackerSettings: function () {
    var e = this._options;
    var t = e.x;
    var n = e.y - e.radius - e.length / 2;
    var i = e.width / 2;
    var o = e.length / 2;
    if (!(i > 10)) {
      i = 10;
    }
    if (!(o > 10)) {
      o = 10;
    }
    return {
      points: [t - i, n - o, t - i, n + o, t + i, n + o, t + i, n - o]
    };
  },
  measure: function (e) {
    return {
      min: e.radius,
      max: e.radius + a(this._options.length)
    };
  },
  getTooltipParameters: function () {
    var e = this._options;
    var t = r(this._actualPosition);
    var n = e.radius + e.length / 2;
    var i = this.callBase();
    i.x = e.x + t.cos * n;
    i.y = e.y - t.sin * n;
    i.offset = e.length / 2;
    return i;
  }
});
exports.trianglemarker = p;
var g = i.BaseTextCloudMarker.inherit({
  _isEnabled: function () {
    return true;
  },
  _isVisible: function (e) {
    return true;
  },
  resize: function (e) {
    return this.callBase(l(e, 0));
  },
  _getTextCloudOptions: function () {
    var e = r(this._actualPosition);
    var t = (0, o.normalizeAngle)(this._actualPosition);
    return {
      x: this._options.x + e.cos * this._options.radius,
      y: this._options.y - e.sin * this._options.radius,
      type: t > 270 ? "left-top" : t > 180 ? "top-right" : t > 90 ? "right-bottom" : "bottom-left"
    };
  },
  measure: function (e) {
    var t = a(this._options.arrowLength) || 0;
    this._measureText();
    var n = this._textFullHeight + t;
    var i = this._textFullWidth + t;
    return {
      min: e.radius,
      max: e.radius,
      horizontalOffset: i,
      verticalOffset: n,
      inverseHorizontalOffset: i,
      inverseVerticalOffset: n
    };
  }
});
exports.textcloud = g;
var m = i.BaseRangeBar.inherit({
  _isEnabled: function () {
    return this._options.size > 0;
  },
  _isVisible: function (e) {
    return true;
  },
  resize: function (e) {
    return this.callBase(l(e, a(this._options.size)));
  },
  _createBarItem: function () {
    return this._renderer.arc().attr({
      "stroke-linejoin": "round"
    }).append(this._rootElement);
  },
  _createTracker: function () {
    return this._renderer.arc().attr({
      "stroke-linejoin": "round"
    });
  },
  _setBarSides: function () {
    this._maxSide = this._options.radius;
    this._minSide = this._maxSide - a(this._options.size);
  },
  _getSpace: function () {
    var e = this._options;
    if (e.space > 0) {
      return e.space * 180 / e.radius / Math.PI;
    } else {
      return 0;
    }
  },
  _isTextVisible: function () {
    return (this._options.text || {}).indent > 0;
  },
  _setTextItemsSides: function () {
    var e = this._options;
    var t = a(e.text.indent);
    this._lineFrom = e.y - e.radius;
    this._lineTo = this._lineFrom - t;
    this._textRadius = e.radius + t;
  },
  _getPositions: function () {
    var e;
    var t;
    var n = this._basePosition;
    var i = this._actualPosition;
    if (n >= i) {
      e = n;
      t = i;
    } else {
      e = i;
      t = n;
    }
    return {
      start: this._startPosition,
      end: this._endPosition,
      main1: e,
      main2: t,
      back1: Math.min(e + this._space, this._startPosition),
      back2: Math.max(t - this._space, this._endPosition)
    };
  },
  _buildItemSettings: function (e, t) {
    return {
      x: this._options.x,
      y: this._options.y,
      innerRadius: this._minSide,
      outerRadius: this._maxSide,
      startAngle: t,
      endAngle: e
    };
  },
  _updateTextPosition: function () {
    var e = r(this._actualPosition);
    var t = this._options.x + this._textRadius * e.cos;
    var n = this._options.y - this._textRadius * e.sin;
    t += e.cos * this._textWidth * 0.6;
    n -= e.sin * this._textHeight * 0.6;
    this._text.attr({
      x: t,
      y: n + this._textVerticalOffset
    });
  },
  _updateLinePosition: function () {
    var e;
    var t;
    var n = this._options.x;
    if (this._basePosition > this._actualPosition) {
      e = n - 2;
      t = n;
    } else if (this._basePosition < this._actualPosition) {
      e = n;
      t = n + 2;
    } else {
      e = n - 1;
      t = n + 1;
    }
    this._line.attr({
      points: [e, this._lineFrom, e, this._lineTo, t, this._lineTo, t, this._lineFrom]
    }).rotate(s(this._actualPosition), n, this._options.y).sharp();
  },
  _getTooltipPosition: function () {
    var e = r((this._basePosition + this._actualPosition) / 2);
    var t = (this._minSide + this._maxSide) / 2;
    return {
      x: this._options.x + e.cos * t,
      y: this._options.y - e.sin * t
    };
  },
  measure: function (e) {
    var t = {
      min: e.radius - a(this._options.size),
      max: e.radius
    };
    this._measureText();
    if (this._hasText) {
      t.max += a(this._options.text.indent);
      t.horizontalOffset = this._textWidth;
      t.verticalOffset = this._textHeight;
    }
    return t;
  }
});
exports.rangebar = m;