exports.trianglemarker = exports.textcloud = exports.rhombus = exports.rectangle = exports.rangebar = exports.circle = exports._default = undefined;
var i = require("./3446.js");
var o = require("./19157.js");
var a = Number;
var r = i.BaseIndicator.inherit({
  _move: function () {
    var e = this._actualPosition - this._zeroPosition;
    this._rootElement.move(this.vertical ? 0 : e, this.vertical ? e : 0);
    if (this._trackerElement) {
      this._trackerElement.move(this.vertical ? 0 : e, this.vertical ? e : 0);
    }
  },
  _isEnabled: function () {
    this.vertical = this._options.vertical;
    return this._options.length > 0 && this._options.width > 0;
  },
  _isVisible: function () {
    return true;
  },
  _getTrackerSettings: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this._options;
    var a = o.width / 2;
    var r = o.length / 2;
    var s = this._zeroPosition;
    if (!(a > 10)) {
      a = 10;
    }
    if (!(r > 10)) {
      r = 10;
    }
    if (this.vertical) {
      e = o.x - r;
      t = o.x + r;
      n = s + a;
      i = s - a;
    } else {
      e = s - a;
      t = s + a;
      n = o.y + r;
      i = o.y - r;
    }
    return {
      points: [e, n, e, i, t, i, t, n]
    };
  },
  _render: function () {
    this._zeroPosition = this._translator.getCodomainStart();
  },
  _clear: function () {
    delete this._element;
  },
  measure: function (e) {
    var t = this.vertical ? e.x : e.y;
    return {
      min: t - this._options.length / 2,
      max: t + this._options.length / 2
    };
  },
  getTooltipParameters: function () {
    var e = this._options;
    var t = this._actualPosition;
    var n = {
      x: t,
      y: t,
      value: this._currentValue,
      color: e.color,
      offset: e.width / 2
    };
    if (this.vertical) {
      n.x = e.x;
    } else {
      n.y = e.y;
    }
    return n;
  }
});
var s = r.inherit({
  _render: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this._options;
    this.callBase();
    var a = this._zeroPosition;
    if (this.vertical) {
      e = o.x - o.length / 2;
      t = o.x + o.length / 2;
      n = a + o.width / 2;
      i = a - o.width / 2;
    } else {
      e = a - o.width / 2;
      t = a + o.width / 2;
      n = o.y + o.length / 2;
      i = o.y - o.length / 2;
    }
    this._element = this._element || this._renderer.path([], "area").append(this._rootElement);
    this._element.attr({
      points: [e, n, e, i, t, i, t, n]
    });
  }
});
exports.rectangle = s;
var l = r.inherit({
  _render: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this._options;
    this.callBase();
    if (this.vertical) {
      e = o.x;
      t = this._zeroPosition;
      n = o.length / 2 || 0;
      i = o.width / 2 || 0;
    } else {
      e = this._zeroPosition;
      t = o.y;
      n = o.width / 2 || 0;
      i = o.length / 2 || 0;
    }
    this._element = this._element || this._renderer.path([], "area").append(this._rootElement);
    this._element.attr({
      points: [e - n, t, e, t - i, e + n, t, e, t + i]
    });
  }
});
exports.rhombus = l;
var u = r.inherit({
  _render: function () {
    var e;
    var t;
    var n = this._options;
    this.callBase();
    if (this.vertical) {
      e = n.x;
      t = this._zeroPosition;
    } else {
      e = this._zeroPosition;
      t = n.y;
    }
    var i = n.length / 2 || 0;
    this._element = this._element || this._renderer.circle().append(this._rootElement);
    this._element.attr({
      cx: e,
      cy: t,
      r: i
    });
  }
});
exports.circle = u;
var d = r.inherit({
  _isEnabled: function () {
    this.vertical = this._options.vertical;
    this._inverted = this.vertical ? (0, o.normalizeEnum)(this._options.horizontalOrientation) === "right" : (0, o.normalizeEnum)(this._options.verticalOrientation) === "bottom";
    return this._options.length > 0 && this._options.width > 0;
  },
  _isVisible: function () {
    return true;
  },
  _render: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this._options;
    var r = {
      stroke: "none",
      "stroke-width": 0,
      "stroke-linecap": "square"
    };
    this.callBase();
    if (this.vertical) {
      e = o.x;
      n = this._zeroPosition;
      t = e + a(this._inverted ? o.length : -o.length);
      r.points = [e, n, t, n - o.width / 2, t, n + o.width / 2];
    } else {
      n = o.y;
      e = this._zeroPosition;
      i = n + a(this._inverted ? o.length : -o.length);
      r.points = [e, n, e - o.width / 2, i, e + o.width / 2, i];
    }
    if (o.space > 0) {
      r["stroke-width"] = Math.min(o.space, o.width / 4) || 0;
      r.stroke = r["stroke-width"] > 0 && o.containerBackgroundColor || "none";
    }
    this._element = this._element || this._renderer.path([], "area").append(this._rootElement);
    this._element.attr(r).sharp();
  },
  _getTrackerSettings: function () {
    var e;
    var t;
    var n;
    var i;
    var o;
    var r = this._options;
    var s = r.width / 2;
    var l = a(r.length);
    if (!(s > 10)) {
      s = 10;
    }
    if (!(l > 20)) {
      l = 20;
    }
    if (this.vertical) {
      t = (e = r.x) + (this._inverted ? l : -l);
      o = [e, n = this._zeroPosition + s, t, n, t, i = this._zeroPosition - s, e, i];
    } else {
      i = (n = r.y) + (this._inverted ? l : -l);
      o = [e = this._zeroPosition - s, n, e, i, t = this._zeroPosition + s, i, t, n];
    }
    return {
      points: o
    };
  },
  measure: function (e) {
    var t;
    var n;
    var i = a(this._options.length);
    if (this.vertical) {
      t = n = e.x;
      if (this._inverted) {
        n = t + i;
      } else {
        t = n - i;
      }
    } else {
      t = n = e.y;
      if (this._inverted) {
        n = t + i;
      } else {
        t = n - i;
      }
    }
    return {
      min: t,
      max: n
    };
  },
  getTooltipParameters: function () {
    var e = this._options;
    var t = (this._inverted ? e.length : -e.length) / 2;
    var n = this.callBase();
    if (this.vertical) {
      n.x += t;
    } else {
      n.y += t;
    }
    n.offset = e.length / 2;
    return n;
  }
});
exports.trianglemarker = d;
var c = i.BaseTextCloudMarker.inherit({
  _isEnabled: function () {
    this.vertical = this._options.vertical;
    this._inverted = this.vertical ? (0, o.normalizeEnum)(this._options.horizontalOrientation) === "right" : (0, o.normalizeEnum)(this._options.verticalOrientation) === "bottom";
    return true;
  },
  _isVisible: function () {
    return true;
  },
  _getTextCloudOptions: function () {
    var e;
    var t = this._actualPosition;
    var n = this._actualPosition;
    if (this.vertical) {
      t = this._options.x;
      e = this._inverted ? "top-left" : "top-right";
    } else {
      n = this._options.y;
      e = this._inverted ? "right-top" : "right-bottom";
    }
    return {
      x: t,
      y: n,
      type: e
    };
  },
  measure: function (e) {
    var t;
    var n;
    var i = a(this._options.arrowLength) || 0;
    this._measureText();
    if (this.vertical) {
      if (this._inverted) {
        t = e.x;
        n = e.x + i + this._textFullWidth;
      } else {
        t = e.x - i - this._textFullWidth;
        n = e.x;
      }
    } else if (this._inverted) {
      t = e.y;
      n = e.y + i + this._textFullHeight;
    } else {
      t = e.y - i - this._textFullHeight;
      n = e.y;
    }
    return {
      min: t,
      max: n,
      indent: 0
    };
  },
  _correctCloudType: function (e, t, n) {
    var i = t.x;
    var o = t.y;
    var a = n.width;
    var r = n.height;
    if (e === "right-top" || e === "right-bottom") {
      if (i - a < this._translator.getCodomainStart()) {
        e = `left-${e.split("-")[1]}`;
      }
    } else if (e === "top-left" || e === "top-right") {
      if (o + r > this._translator.getCodomainStart()) {
        e = `bottom-${e.split("-")[1]}`;
      }
    }
    return e;
  }
});
exports.textcloud = c;
var h = i.BaseRangeBar.inherit({
  _isEnabled: function () {
    this.vertical = this._options.vertical;
    this._inverted = this.vertical ? (0, o.normalizeEnum)(this._options.horizontalOrientation) === "right" : (0, o.normalizeEnum)(this._options.verticalOrientation) === "bottom";
    return this._options.size > 0;
  },
  _isVisible: function () {
    return true;
  },
  _createBarItem: function () {
    return this._renderer.path([], "area").append(this._rootElement);
  },
  _createTracker: function () {
    return this._renderer.path([], "area");
  },
  _setBarSides: function () {
    var e;
    var t;
    var n = this._options;
    var i = a(n.size);
    if (this.vertical) {
      if (this._inverted) {
        e = n.x;
        t = n.x + i;
      } else {
        e = n.x - i;
        t = n.x;
      }
    } else if (this._inverted) {
      e = n.y;
      t = n.y + i;
    } else {
      e = n.y - i;
      t = n.y;
    }
    this._minSide = e;
    this._maxSide = t;
    this._minBound = e;
    this._maxBound = t;
  },
  _getSpace: function () {
    var e = this._options;
    if (e.space > 0) {
      return a(e.space);
    } else {
      return 0;
    }
  },
  _isTextVisible: function () {
    var e = this._options.text || {};
    return e.indent > 0 || e.indent < 0;
  },
  _getTextAlign: function () {
    if (this.vertical) {
      if (this._options.text.indent > 0) {
        return "left";
      } else {
        return "right";
      }
    } else {
      return "center";
    }
  },
  _setTextItemsSides: function () {
    var e = a(this._options.text.indent);
    if (e > 0) {
      this._lineStart = this._maxSide;
      this._lineEnd = this._maxSide + e;
      this._textPosition = this._lineEnd + (this.vertical ? 2 : this._textHeight / 2);
      this._maxBound = this._textPosition + (this.vertical ? this._textWidth : this._textHeight / 2);
    } else if (e < 0) {
      this._lineStart = this._minSide;
      this._lineEnd = this._minSide + e;
      this._textPosition = this._lineEnd - (this.vertical ? 2 : this._textHeight / 2);
      this._minBound = this._textPosition - (this.vertical ? this._textWidth : this._textHeight / 2);
    }
  },
  _getPositions: function () {
    var e;
    var t;
    var n;
    var i;
    var o = this._startPosition;
    var a = this._endPosition;
    var r = this._space;
    var s = this._basePosition;
    var l = this._actualPosition;
    if (o < a) {
      if (s < l) {
        e = s;
        t = l;
      } else {
        e = l;
        t = s;
      }
      n = e - r;
      i = t + r;
    } else {
      if (s > l) {
        e = s;
        t = l;
      } else {
        e = l;
        t = s;
      }
      n = e + r;
      i = t - r;
    }
    return {
      start: o,
      end: a,
      main1: e,
      main2: t,
      back1: n,
      back2: i
    };
  },
  _buildItemSettings: function (e, t) {
    var n = this._minSide;
    var i = this._maxSide;
    return {
      points: this.vertical ? [n, e, n, t, i, t, i, e] : [e, n, e, i, t, i, t, n]
    };
  },
  _updateTextPosition: function () {
    this._text.attr(this.vertical ? {
      x: this._textPosition,
      y: this._actualPosition + this._textVerticalOffset
    } : {
      x: this._actualPosition,
      y: this._textPosition + this._textVerticalOffset
    });
  },
  _updateLinePosition: function () {
    var e;
    var t;
    var n;
    var i = this._actualPosition;
    if (this.vertical) {
      if (this._basePosition >= i) {
        e = i;
        t = i + 2;
      } else {
        e = i - 2;
        t = i;
      }
      n = [this._lineStart, e, this._lineStart, t, this._lineEnd, t, this._lineEnd, e];
    } else {
      if (this._basePosition <= i) {
        e = i - 2;
        t = i;
      } else {
        e = i;
        t = i + 2;
      }
      n = [e, this._lineStart, e, this._lineEnd, t, this._lineEnd, t, this._lineStart];
    }
    this._line.attr({
      points: n
    }).sharp();
  },
  _getTooltipPosition: function () {
    var e = (this._minSide + this._maxSide) / 2;
    var t = (this._basePosition + this._actualPosition) / 2;
    if (this.vertical) {
      return {
        x: e,
        y: t
      };
    } else {
      return {
        x: t,
        y: e
      };
    }
  },
  measure: function (e) {
    var t;
    var n;
    var i;
    var o = a(this._options.size);
    var r = a(this._options.text.indent);
    this._measureText();
    if (this.vertical) {
      t = n = e.x;
      if (this._inverted) {
        n += o;
      } else {
        t -= o;
      }
      if (this._hasText) {
        i = this._textHeight / 2;
        if (r > 0) {
          n += r + this._textWidth;
        }
        if (r < 0) {
          t += r - this._textWidth;
        }
      }
    } else {
      t = n = e.y;
      if (this._inverted) {
        n += o;
      } else {
        t -= o;
      }
      if (this._hasText) {
        i = this._textWidth / 2;
        if (r > 0) {
          n += r + this._textHeight;
        }
        if (r < 0) {
          t += r - this._textHeight;
        }
      }
    }
    return {
      min: t,
      max: n,
      indent: i
    };
  }
});
exports.rangebar = exports._default = h;