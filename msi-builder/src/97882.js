exports.ScrollBar = undefined;
var i;
var o = (i = require("./55994.js")) && i.__esModule ? i : {
  default: i
};
var a = require("./39611.js");
var r = require("./13306.js");
var s = require("./87276.js");
var l = require("./35922.js");
var u = require("./20576.js");
var d = require("./23174.js");
var c = Math.min;
var h = Math.max;
function f(e, t) {
  this._translator = new s.Translator2D({}, {}, {});
  this._scroll = e.rect().append(t);
  this._addEvents();
}
function p(e, t, n, i) {
  var o = 0;
  if (t === "right") {
    o = e.width - e.right + n;
  } else if (t === "left") {
    o = e.left - n - i;
  }
  return o;
}
function g(e, t, n, i) {
  var o = 0;
  if (t === "top") {
    o = e.top - n;
  } else if (t === "bottom") {
    o = e.height - e.bottom + i + n;
  }
  return o;
}
exports.ScrollBar = f;
f.prototype = {
  _addEvents: function () {
    var e = this;
    var t = this._scroll.element;
    o.default.on(t, d.start, function (e) {
      (0, a.fireEvent)({
        type: "dxc-scroll-start",
        originalEvent: e,
        target: t
      });
    });
    o.default.on(t, d.move, function (n) {
      var i = -n.offset.x * e._scale;
      var o = -n.offset.y * e._scale;
      var r = e._offset - (e._layoutOptions.vertical ? o : i) / e._scale;
      e._applyPosition(r, r + e._translator.canvasLength / e._scale);
      (0, a.fireEvent)({
        type: "dxc-scroll-move",
        originalEvent: n,
        target: t,
        offset: {
          x: i,
          y: o
        }
      });
    });
    o.default.on(t, d.end, function (n) {
      (0, a.fireEvent)({
        type: "dxc-scroll-end",
        originalEvent: n,
        target: t,
        offset: {
          x: -n.offset.x * e._scale,
          y: -n.offset.y * e._scale
        }
      });
    });
  },
  update: function (e) {
    var t = e.position;
    var n = e.rotated;
    var i = n ? "right" : "top";
    if (t !== i && t !== (n ? "left" : "bottom")) {
      t = i;
    }
    this._scroll.attr({
      rotate: e.rotated ? 0 : -90,
      rotateX: 0,
      rotateY: 0,
      fill: e.color,
      width: e.width,
      opacity: e.opacity
    });
    this._layoutOptions = {
      width: e.width,
      offset: e.offset,
      vertical: n,
      position: t
    };
    return this;
  },
  init: function (e, t) {
    var n = e.axisType === "discrete";
    this._translateWithOffset = n && !t ? 1 : 0;
    this._translator.update((0, r.extend)({}, e, {
      minVisible: null,
      maxVisible: null,
      visibleCategories: null
    }, n && {
      min: null,
      max: null
    } || {}), this._canvas, {
      isHorizontal: !this._layoutOptions.vertical,
      stick: t
    });
    return this;
  },
  getOptions: function () {
    return this._layoutOptions;
  },
  setPane: function (e) {
    var t;
    var n = this._layoutOptions.position;
    t = n === "left" || n === "top" ? e[0] : e[e.length - 1];
    this.pane = t.name;
    return this;
  },
  updateSize: function (e) {
    this._canvas = (0, r.extend)({}, e);
    var t = this._layoutOptions;
    var n = t.position;
    var i = t.offset;
    var o = t.width;
    this._scroll.attr({
      translateX: p(e, n, i, o),
      translateY: g(e, n, i, o)
    });
  },
  getMultipleAxesSpacing: function () {
    return 0;
  },
  estimateMargins: function () {
    return this.getMargins();
  },
  getMargins: function () {
    var e = this._layoutOptions;
    var t = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    t[e.position] = e.width + e.offset;
    return t;
  },
  shift: function (e) {
    var i = this._layoutOptions;
    var o = i.position;
    var a = i.vertical;
    var r = {
      translateX: this._scroll.attr("translateX") ?? 0,
      translateY: this._scroll.attr("translateY") ?? 0
    };
    var s = e[o];
    r[a ? "translateX" : "translateY"] += (o === "left" || o === "top" ? -1 : 1) * s;
    this._scroll.attr(r);
  },
  hideTitle: u.noop,
  hideOuterElements: u.noop,
  setPosition: function (e, t) {
    var n = this._translator;
    var i = (0, l.isDefined)(e) ? n.translate(e, -this._translateWithOffset) : n.translate("canvas_position_start");
    var o = (0, l.isDefined)(t) ? n.translate(t, this._translateWithOffset) : n.translate("canvas_position_end");
    this._offset = c(i, o);
    this._scale = n.getScale(e, t);
    this._applyPosition(c(i, o), h(i, o));
  },
  customPositionIsAvailable: function () {
    return false;
  },
  dispose: function () {
    this._scroll.dispose();
    this._scroll = this._translator = null;
  },
  _applyPosition: function (e, t) {
    var n = this._translator.getCanvasVisibleArea();
    e = h(e, n.min);
    e = c(e, n.max);
    t = c(t, n.max);
    t = h(t, n.min);
    var i = Math.abs(t - e);
    this._scroll.attr({
      y: e,
      height: i < 2 ? 2 : i
    });
  }
};