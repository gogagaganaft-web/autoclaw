exports.Crosshair = h;
exports.getMargins = function () {
  return {
    x: 8,
    y: 4
  };
};
var i = require("./19157.js");
var o = require("./13306.js");
var a = Math;
var r = a.abs;
var s = a.min;
var l = a.max;
var u = a.floor;
function d(e) {
  return {
    x: e.x - 8,
    y: e.y - 4,
    width: e.width + 16,
    height: e.height + 8
  };
}
function c(e, t, n, i) {
  var o = n ? ["x", "width", "y", "height", t, 0] : ["y", "height", "x", "width", e, 1];
  return function (e, t, a) {
    var r = {
      x: a.x,
      y: a.y
    };
    var s = d(e);
    var l = n ? a.y - e.y - e.height / 2 : a.y - e.y;
    r.y = n || !n && t === "bottom" ? a.y + l : a.y;
    if (s[o[0]] < 0) {
      r[o[0]] -= s[o[0]];
    } else if (s[o[0]] + s[o[1]] + l * o[5] > i[o[1]]) {
      r[o[0]] -= s[o[0]] + s[o[1]] + l * o[5] - i[o[1]];
    }
    if (o[4] - s[o[3]] / 2 < 0) {
      r[o[2]] -= o[4] - s[o[3]] / 2;
    } else if (o[4] + s[o[3]] / 2 > i[o[3]]) {
      r[o[2]] -= o[4] + s[o[3]] / 2 - i[o[3]];
    }
    return r;
  };
}
function h(e, t, n, i) {
  this._renderer = e;
  this._crosshairGroup = i;
  this._options = {};
  this.update(t, n);
}
h.prototype = {
  constructor: h,
  update: function (e, t) {
    var n = t.canvas;
    this._canvas = {
      top: n.top,
      bottom: n.height - n.bottom,
      left: n.left,
      right: n.width - n.right,
      width: n.width,
      height: n.height
    };
    this._axes = t.axes;
    this._panes = t.panes;
    this._prepareOptions(e, "horizontal");
    this._prepareOptions(e, "vertical");
  },
  dispose: function () {
    this._renderer = this._crosshairGroup = this._options = this._axes = this._canvas = this._horizontalGroup = this._verticalGroup = this._horizontal = this._vertical = this._circle = this._panes = null;
  },
  _prepareOptions: function (e, t) {
    var n = e[t + "Line"];
    this._options[t] = {
      visible: n.visible,
      line: {
        stroke: n.color || e.color,
        "stroke-width": n.width || e.width,
        dashStyle: n.dashStyle || e.dashStyle,
        opacity: n.opacity || e.opacity,
        "stroke-linecap": "butt"
      },
      label: (0, o.extend)(true, {}, e.label, n.label)
    };
  },
  _createLines: function (e, t, n) {
    var i = [];
    var o = this._canvas;
    var a = [o.left, o.top, o.left, o.top];
    for (var r = 0; r < 2; r++) {
      i.push(this._renderer.path(a, "line").attr(e).sharp(t).append(n));
    }
    return i;
  },
  render: function () {
    var e = this._renderer;
    var t = this._options;
    var n = t.vertical;
    var i = t.horizontal;
    var o = i.visible ? i.line : n.line;
    var a = {
      stroke: o.stroke,
      "stroke-width": o["stroke-width"],
      dashStyle: o.dashStyle,
      opacity: o.opacity
    };
    var r = this._canvas;
    this._horizontal = {};
    this._vertical = {};
    this._circle = e.circle(r.left, r.top, 0).attr(a).append(this._crosshairGroup);
    this._horizontalGroup = e.g().append(this._crosshairGroup);
    this._verticalGroup = e.g().append(this._crosshairGroup);
    if (n.visible) {
      this._vertical.lines = this._createLines(n.line, "h", this._verticalGroup);
      this._vertical.labels = this._createLabels(this._axes[0], n, false, this._verticalGroup);
    }
    if (i.visible) {
      this._horizontal.lines = this._createLines(i.line, "v", this._horizontalGroup);
      this._horizontal.labels = this._createLabels(this._axes[1], i, true, this._horizontalGroup);
    }
    this.hide();
  },
  _createLabels: function (e, t, n, o) {
    var a;
    var r;
    var s;
    var l;
    var u;
    var d = this._canvas;
    var c = this._renderer;
    var h = [];
    var f = t.label;
    if (f.visible) {
      e.forEach(function (e) {
        var p = e.getOptions().position;
        if (!e.getTranslator().getBusinessRange().isEmpty()) {
          u = e.getLabelsPosition();
          if (n) {
            r = d.top;
            a = u;
          } else {
            a = d.left;
            r = u;
          }
          var g = p === "top" || p === "bottom" ? "center" : p === "right" ? "left" : "right";
          l = c.rect(0, 0, 0, 0).attr({
            fill: f.backgroundColor || t.line.stroke
          }).append(o);
          s = c.text("0", 0, 0).css((0, i.patchFontOptions)(t.label.font)).attr({
            align: g,
            class: f.cssClass
          }).append(o);
          h.push({
            text: s,
            background: l,
            axis: e,
            options: f,
            pos: {
              coord: u,
              side: p
            },
            startXY: {
              x: a,
              y: r
            }
          });
        }
      });
    }
    return h;
  },
  _updateText: function (e, t, n, i, o) {
    var a = this;
    n.forEach(function (n) {
      var r = n.axis;
      var s = n.startXY;
      var l = n.text;
      var u = n.background;
      var c = "";
      if (!r.name || r.name === t) {
        c = r.getFormattedValue(e, n.options, i);
      }
      if (c) {
        l.attr({
          text: c,
          x: s.x,
          y: s.y
        });
        l.attr(o(l.getBBox(), n.pos.side, s));
        a._updateLinesCanvas(n);
        u.attr(d(l.getBBox()));
      } else {
        l.attr({
          text: ""
        });
        u.attr({
          x: 0,
          y: 0,
          width: 0,
          height: 0
        });
      }
    });
  },
  hide: function () {
    this._crosshairGroup.attr({
      visibility: "hidden"
    });
  },
  _updateLinesCanvas: function (e) {
    var t = e.pos.side;
    var n = e.pos.coord;
    var i = this._linesCanvas;
    var o = this._canvas;
    i[t] = i[t] !== o[t] && r(i[t] - o[t]) < r(n - o[t]) ? i[t] : n;
  },
  _updateLines: function (e, t, n, i, o) {
    var a = this._linesCanvas;
    var r = this._canvas;
    var u = o ? [[s(t - i, a.left), r.top, t - i, r.top], [t + i, r.top, l(a.right, t + i), r.top]] : [[r.left, s(a.top, n - i), r.left, n - i], [r.left, n + i, r.left, l(a.bottom, n + i)]];
    for (var d = 0; d < 2; d++) {
      e[d].attr({
        points: u[d]
      }).sharp(o ? "v" : "h", o ? n === r.bottom ? -1 : 1 : t === r.right ? -1 : 1);
    }
  },
  _resetLinesCanvas: function () {
    var e = this._canvas;
    this._linesCanvas = {
      left: e.left,
      right: e.right,
      top: e.top,
      bottom: e.bottom
    };
  },
  _getClipRectForPane: function (e, t) {
    var n;
    var i;
    var o = this._panes;
    for (n = 0; n < o.length; n++) {
      if ((i = o[n].coords).left <= e && i.right >= e && i.top <= t && i.bottom >= t) {
        return o[n].clipRect;
      }
    }
    return {
      id: null
    };
  },
  show: function (e) {
    var t = e.point;
    var n = t.getCrosshairData(e.x, e.y);
    var i = t.getPointRadius();
    var o = this._horizontal;
    var a = this._vertical;
    var r = i ? i + 3 : 0;
    var s = this._canvas;
    var l = u(n.x);
    var d = u(n.y);
    if (l >= s.left && l <= s.right && d >= s.top && d <= s.bottom) {
      this._crosshairGroup.attr({
        visibility: "visible"
      });
      this._resetLinesCanvas();
      this._circle.attr({
        cx: l,
        cy: d,
        r: r,
        "clip-path": this._getClipRectForPane(l, d).id
      });
      if (o.lines) {
        this._updateText(n.yValue, n.axis, o.labels, t, c(l, d, true, s));
        this._updateLines(o.lines, l, d, r, true);
        this._horizontalGroup.attr({
          translateY: d - s.top
        });
      }
      if (a.lines) {
        this._updateText(n.xValue, n.axis, a.labels, t, c(l, d, false, s));
        this._updateLines(a.lines, l, d, r, false);
        this._verticalGroup.attr({
          translateX: l - s.left
        });
      }
    } else {
      this.hide();
    }
  }
};