exports.BaseTextCloudMarker = exports.BaseRangeBar = exports.BaseIndicator = exports.BaseElement = undefined;
var i;
var o = require("./20576.js");
var a = require("./95479.js");
var r = require("./18029.js");
var s = require("./19157.js");
var l = require("./13306.js");
var u = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var d = isFinite;
var c = Number;
var h = Math.round;
var f = r.formatValue;
var p = r.getSampleText;
var g = u.default.inherit({
  ctor: function (e) {
    var t = this;
    (0, a.each)(e, function (e, n) {
      t["_" + e] = n;
    });
    t._init();
  },
  dispose: function () {
    var e = this;
    e._dispose();
    (0, a.each)(e, function (t) {
      e[t] = null;
    });
    return e;
  },
  getOffset: function () {
    return c(this._options.offset) || 0;
  }
});
exports.BaseElement = g;
var m = g.inherit({
  _init: function () {
    this._rootElement = this._createRoot().linkOn(this._owner, {
      name: "value-indicator",
      after: "core"
    });
    this._trackerElement = this._createTracker();
  },
  _dispose: function () {
    this._rootElement.linkOff();
  },
  _setupAnimation: function () {
    var e = this;
    if (e._options.animation) {
      e._animation = {
        step: function (t) {
          e._actualValue = e._animation.start + e._animation.delta * t;
          e._actualPosition = e._translator.translate(e._actualValue);
          e._move();
        },
        duration: e._options.animation.duration > 0 ? c(e._options.animation.duration) : 0,
        easing: e._options.animation.easing
      };
    }
  },
  _runAnimation: function (e) {
    var t = this._animation;
    t.start = this._actualValue;
    t.delta = e - this._actualValue;
    this._rootElement.animate({
      _: 0
    }, {
      step: t.step,
      duration: t.duration,
      easing: t.easing
    });
  },
  _createRoot: function () {
    return this._renderer.g().attr({
      class: this._className
    });
  },
  _createTracker: function () {
    return this._renderer.path([], "area");
  },
  _getTrackerSettings: o.noop,
  clean: function () {
    if (this._animation) {
      this._rootElement.stopAnimation();
    }
    this._rootElement.linkRemove().clear();
    this._clear();
    this._tracker.detach(this._trackerElement);
    this._options = this.enabled = this._animation = null;
    return this;
  },
  render: function (e) {
    this.type = e.type;
    this._options = e;
    this._actualValue = this._currentValue = this._translator.adjust(this._options.currentValue);
    this.enabled = this._isEnabled();
    if (this.enabled) {
      this._setupAnimation();
      this._rootElement.attr({
        fill: (0, s.extractColor)(this._options.color)
      }).linkAppend();
      this._tracker.attach(this._trackerElement, this, this._trackerInfo);
    }
    return this;
  },
  resize: function (e) {
    this._rootElement.clear();
    this._clear();
    this.visible = this._isVisible(e);
    if (this.visible) {
      (0, l.extend)(this._options, e);
      this._actualPosition = this._translator.translate(this._actualValue);
      this._render();
      this._trackerElement.attr(this._getTrackerSettings());
      this._move();
    }
    return this;
  },
  value: function (e, t) {
    var n;
    var i = this._rootElement;
    var o = null;
    if (e === undefined) {
      return this._currentValue;
    } else {
      if (e === null) {
        o = "hidden";
        this._currentValue = e;
      } else {
        n = this._translator.adjust(e);
        if (this._currentValue !== n && d(n)) {
          this._currentValue = n;
          if (this.visible) {
            if (this._animation && !t) {
              this._runAnimation(n);
            } else {
              this._actualValue = n;
              this._actualPosition = this._translator.translate(n);
              this._move();
            }
          }
        }
      }
      i.attr({
        visibility: o
      });
      return this;
    }
  },
  _isEnabled: null,
  _isVisible: null,
  _render: null,
  _clear: null,
  _move: null
});
exports.BaseIndicator = m;
var _ = {};
_["right-bottom"] = _.rb = [0, -1, -1, 0, 0, 1, 1, 0];
_["bottom-right"] = _.br = [-1, 0, 0, -1, 1, 0, 0, 1];
_["left-bottom"] = _.lb = [0, -1, 1, 0, 0, 1, -1, 0];
_["bottom-left"] = _.bl = [1, 0, 0, -1, -1, 0, 0, 1];
_["left-top"] = _.lt = [0, 1, 1, 0, 0, -1, -1, 0];
_["top-left"] = _.tl = [1, 0, 0, 1, -1, 0, 0, -1];
_["right-top"] = _.rt = [0, 1, -1, 0, 0, -1, 1, 0];
_["top-right"] = _.tr = [-1, 0, 0, 1, 1, 0, 0, -1];
var v = m.inherit({
  _move: function () {
    var e = this._options;
    var t = this._getTextCloudOptions();
    var n = f(this._actualValue, e.text);
    this._text.attr({
      text: n
    });
    var i = this._text.getBBox();
    var o = t.x;
    var a = t.y;
    var r = (i.width || n.length * this._textUnitWidth) + e.horizontalOffset * 2;
    var s = (i.height || this._textHeight) + e.verticalOffset * 2;
    var l = function (e) {
      var t;
      var n;
      var i = e.x;
      var o = e.y;
      var a = _[e.type];
      var r = e.cloudWidth;
      var s = e.cloudHeight;
      var l = i;
      var u = o;
      t = n = e.tailLength;
      if (a[0] & 1) {
        n = Math.min(n, s / 3);
      } else {
        t = Math.min(t, r / 3);
      }
      return {
        cx: h(l + a[0] * t + (a[0] + a[2]) * r / 2),
        cy: h(u + a[1] * n + (a[1] + a[3]) * s / 2),
        points: [h(i), h(o), h(i += a[0] * (r + t)), h(o += a[1] * (s + n)), h(i += a[2] * r), h(o += a[3] * s), h(i += a[4] * r), h(o += a[5] * s), h(i += a[6] * (r - t)), h(o += a[7] * (s - n))]
      };
    }({
      x: o,
      y: a,
      cloudWidth: r,
      cloudHeight: s,
      tailLength: e.arrowLength,
      type: this._correctCloudType(t.type, {
        x: o,
        y: a
      }, {
        width: r,
        height: s
      })
    });
    this._text.attr({
      x: l.cx,
      y: l.cy + this._textVerticalOffset
    });
    this._cloud.attr({
      points: l.points
    });
    if (this._trackerElement) {
      this._trackerElement.attr({
        points: l.points
      });
    }
  },
  _measureText: function () {
    var e;
    var t;
    var n;
    if (!this._textVerticalOffset) {
      e = this._createRoot().append(this._owner);
      n = p(this._translator, this._options.text);
      t = this._renderer.text(n, 0, 0).attr({
        align: "center"
      }).css((0, s.patchFontOptions)(this._options.text.font)).append(e).getBBox();
      e.remove();
      this._textVerticalOffset = -t.y - t.height / 2;
      this._textWidth = t.width;
      this._textHeight = t.height;
      this._textUnitWidth = this._textWidth / n.length;
      this._textFullWidth = this._textWidth + this._options.horizontalOffset * 2;
      this._textFullHeight = this._textHeight + this._options.verticalOffset * 2;
    }
  },
  _render: function () {
    this._measureText();
    this._cloud = this._cloud || this._renderer.path([], "area").append(this._rootElement);
    this._text = this._text || this._renderer.text().append(this._rootElement);
    this._text.attr({
      align: "center"
    }).css((0, s.patchFontOptions)(this._options.text.font));
  },
  _clear: function () {
    delete this._cloud;
    delete this._text;
  },
  getTooltipParameters: function () {
    var e = this._getTextCloudOptions();
    return {
      x: e.x,
      y: e.y,
      value: this._currentValue,
      color: this._options.color
    };
  },
  _correctCloudType: function (e) {
    return e;
  }
});
exports.BaseTextCloudMarker = v;
var y = m.inherit({
  _measureText: function () {
    var e;
    var t;
    this._hasText = this._isTextVisible();
    if (this._hasText && !this._textVerticalOffset) {
      e = this._createRoot().append(this._owner);
      t = this._renderer.text(p(this._translator, this._options.text), 0, 0).attr({
        class: "dxg-text",
        align: "center"
      }).css((0, s.patchFontOptions)(this._options.text.font)).append(e).getBBox();
      e.remove();
      this._textVerticalOffset = -t.y - t.height / 2;
      this._textWidth = t.width;
      this._textHeight = t.height;
    }
  },
  _move: function () {
    this._updateBarItemsPositions();
    if (this._hasText) {
      this._text.attr({
        text: f(this._actualValue, this._options.text)
      });
      this._updateTextPosition();
      this._updateLinePosition();
    }
  },
  _updateBarItems: function () {
    var e;
    var t = this._options;
    var n = this._translator;
    this._setBarSides();
    this._startPosition = n.translate(n.getDomainStart());
    this._endPosition = n.translate(n.getDomainEnd());
    this._basePosition = n.translate(t.baseValue);
    this._space = this._getSpace();
    var i = t.backgroundColor || "none";
    if (i !== "none" && this._space > 0) {
      e = t.containerBackgroundColor || "none";
    } else {
      this._space = 0;
      e = "none";
    }
    this._backItem1.attr({
      fill: i
    });
    this._backItem2.attr({
      fill: i
    });
    this._spaceItem1.attr({
      fill: e
    });
    this._spaceItem2.attr({
      fill: e
    });
  },
  _getSpace: function () {
    return 0;
  },
  _updateTextItems: function () {
    if (this._hasText) {
      this._line = this._line || this._renderer.path([], "line").attr({
        class: "dxg-main-bar",
        "stroke-linecap": "square"
      }).append(this._rootElement);
      this._text = this._text || this._renderer.text("", 0, 0).attr({
        class: "dxg-text"
      }).append(this._rootElement);
      this._text.attr({
        align: this._getTextAlign()
      }).css(this._getFontOptions());
      this._setTextItemsSides();
    } else {
      if (this._line) {
        this._line.remove();
        delete this._line;
      }
      if (this._text) {
        this._text.remove();
        delete this._text;
      }
    }
  },
  _isTextVisible: function () {
    return false;
  },
  _getTextAlign: function () {
    return "center";
  },
  _getFontOptions: function () {
    var e = this._options;
    var t = e.text.font;
    if (!t || !t.color) {
      t = (0, l.extend)({}, t, {
        color: e.color
      });
    }
    return (0, s.patchFontOptions)(t);
  },
  _updateBarItemsPositions: function () {
    var e = this._getPositions();
    this._backItem1.attr(this._buildItemSettings(e.start, e.back1));
    this._backItem2.attr(this._buildItemSettings(e.back2, e.end));
    this._spaceItem1.attr(this._buildItemSettings(e.back1, e.main1));
    this._spaceItem2.attr(this._buildItemSettings(e.main2, e.back2));
    this._mainItem.attr(this._buildItemSettings(e.main1, e.main2));
    if (this._trackerElement) {
      this._trackerElement.attr(this._buildItemSettings(e.main1, e.main2));
    }
  },
  _render: function () {
    this._measureText();
    if (!this._backItem1) {
      this._backItem1 = this._createBarItem();
      this._backItem1.attr({
        class: "dxg-back-bar"
      });
    }
    if (!this._backItem2) {
      this._backItem2 = this._createBarItem();
      this._backItem2.attr({
        class: "dxg-back-bar"
      });
    }
    if (!this._spaceItem1) {
      this._spaceItem1 = this._createBarItem();
      this._spaceItem1.attr({
        class: "dxg-space-bar"
      });
    }
    if (!this._spaceItem2) {
      this._spaceItem2 = this._createBarItem();
      this._spaceItem2.attr({
        class: "dxg-space-bar"
      });
    }
    if (!this._mainItem) {
      this._mainItem = this._createBarItem();
      this._mainItem.attr({
        class: "dxg-main-bar"
      });
    }
    this._updateBarItems();
    this._updateTextItems();
  },
  _clear: function () {
    delete this._backItem1;
    delete this._backItem2;
    delete this._spaceItem1;
    delete this._spaceItem2;
    delete this._mainItem;
    delete this._hasText;
    delete this._line;
    delete this._text;
  },
  getTooltipParameters: function () {
    var e = this._getTooltipPosition();
    return {
      x: e.x,
      y: e.y,
      value: this._currentValue,
      color: this._options.color,
      offset: 0
    };
  }
});
exports.BaseRangeBar = y;