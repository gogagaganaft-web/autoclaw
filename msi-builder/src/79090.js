exports.default = undefined;
var i = require("./19157.js");
var o = require("./11378.js").consts.pointerSize;
function a(e, t, n) {
  this._isLeftPointer = n;
  this._isOverlapped = false;
  this._group = e.g().attr({
    class: "slider-marker"
  }).append(t);
  this._area = e.path(null, "area").append(this._group);
  this._label = e.text().attr({
    align: "left"
  }).append(this._group);
  this._tracker = e.rect().attr({
    class: "slider-marker-tracker",
    fill: "#000000",
    opacity: 0.0001
  }).css({
    cursor: "pointer"
  }).append(this._group);
  this._border = e.rect(0, 0, 1, 0);
}
a.prototype = {
  constructor: a,
  _getRectSize: function (e) {
    return {
      width: Math.round(this._paddingLeftRight * 2 + e.width),
      height: Math.round(this._paddingTopBottom * 2 + e.height)
    };
  },
  _getTextSize: function () {
    var e = this._label.getBBox();
    if (!this._textHeight && isFinite(e.height)) {
      this._textHeight = e.height;
    }
    return {
      width: e.width,
      height: this._textHeight,
      y: e.y
    };
  },
  _getAreaPointsInfo: function (e) {
    var t = this._getRectSize(e);
    var n = t.width;
    var i = t.height;
    var a = -n;
    var r = 0;
    var s = o;
    var l = 0;
    var u = -o;
    var d = this._position;
    var c = this._isLeftPointer;
    function h() {
      a++;
      r++;
      s++;
      l++;
      u++;
    }
    function f() {
      if (s > r) {
        s = r;
      } else if (u < a) {
        u = a;
      }
      if (c) {
        h();
      }
    }
    var p = d;
    if (c) {
      if (d > this._range[1] - n) {
        r = -d + this._range[1];
        a = r - n;
        f();
        p += a;
      } else {
        a = u = 0;
        r = n;
      }
    } else if (d - this._range[0] < n) {
      a = -(d - this._range[0]);
      r = a + n;
      f();
      p += r;
    } else {
      s = 0;
      h();
    }
    this._borderPosition = p;
    return {
      offset: a,
      isCut: (!c || l !== u) && (c || l !== s),
      points: [a, 0, r, 0, r, i, s, i, l, i + o, u, i, a, i]
    };
  },
  _update: function () {
    var e;
    var t = this;
    clearTimeout(t._timeout);
    t._label.attr({
      text: t._text || ""
    });
    var n = t._getTextSize();
    var i = t._getRectSize(n);
    function a(e, n) {
      n = n || t._getRectSize(e);
      t._group.attr({
        translateY: -(n.height + o)
      });
      var i = t._getAreaPointsInfo(e);
      var a = i.points;
      var r = i.offset;
      t._area.attr({
        points: a
      });
      t._border.attr({
        x: t._isLeftPointer ? a[0] - 1 : a[2],
        height: i.isCut ? n.height : n.height + o
      });
      t._tracker.attr({
        translateX: r,
        width: n.width,
        height: n.height + o
      });
      t._label.attr({
        translateX: t._paddingLeftRight + r,
        translateY: n.height / 2 - (e.y + e.height / 2)
      });
    }
    e = t._textSize || n;
    e = t._textSize = n.width > e.width || n.height > e.height ? n : e;
    t._timeout = setTimeout(function () {
      a(n, i);
      t._textSize = n;
    }, 75);
    a(e);
  },
  setText: function (e) {
    this._text = e;
  },
  setPosition: function (e) {
    this._position = e;
    this._update();
  },
  applyOptions: function (e, t) {
    this._range = t;
    this._paddingLeftRight = e.paddingLeftRight;
    this._paddingTopBottom = e.paddingTopBottom;
    this._textHeight = null;
    this._colors = [e.invalidRangeColor, e.color];
    this._area.attr({
      fill: e.color
    });
    this._border.attr({
      fill: e.borderColor
    });
    this._label.css((0, i.patchFontOptions)(e.font));
    this._update();
  },
  getTracker: function () {
    return this._tracker;
  },
  setValid: function (e) {
    this._area.attr({
      fill: this._colors[Number(e)]
    });
  },
  setColor: function (e) {
    this._area.attr({
      fill: e
    });
  },
  dispose: function () {
    clearTimeout(this._timeout);
  },
  setOverlapped: function (e) {
    if (this._isOverlapped !== e) {
      if (e) {
        this._border.append(this._group);
      } else if (this._isOverlapped) {
        this._border.remove();
      }
      this._isOverlapped = e;
    }
  },
  getBorderPosition: function () {
    return this._borderPosition;
  }
};
var r = a;
exports.default = r;
module.exports = exports.default;
module.exports.default = exports.default;