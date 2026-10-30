exports.ControlBar = g;
var i = require("./19157.js");
var o = require("./77891.js");
var a = Math;
var r = a.min;
var s = a.max;
var l = a.round;
var u = a.floor;
var d = a.sqrt;
var c = (0, i.enumParser)(["left", "center", "right"]);
var h = (0, i.enumParser)(["top", "bottom"]);
var f = {
  bigCircleSize: 58,
  smallCircleSize: 28,
  buttonSize: 10,
  arrowButtonOffset: 20,
  incDecButtonSize: 11,
  incButtonOffset: 66,
  decButtonOffset: 227,
  sliderLineStartOffset: 88.5,
  sliderLineEndOffset: 205.5,
  sliderLength: 20,
  sliderWidth: 8,
  trackerGap: 4
};
var p = {};
function g(e) {
  this._params = e;
  this._createElements(e.renderer, e.container, e.dataKey);
  e.layoutControl.addItem(this);
  this._subscribeToProjection(e.projection);
  this._subscribeToTracker(e.tracker);
  this._createCallbacks(e.projection);
}
function m(e) {
  delete e._owner;
  e.update = function () {};
  e.finish = function () {};
}
function _(e, t) {
  this._owner = e;
  this._command = t;
}
function v(e, t, n) {
  this._command = t;
  var i = null;
  var o = 0;
  var a = 0;
  switch (this._command) {
    case "command-move-up":
      a = -10;
      break;
    case "command-move-right":
      o = 10;
      break;
    case "command-move-down":
      a = 10;
      break;
    case "command-move-left":
      o = -10;
  }
  this._stop = function () {
    clearTimeout(i);
    e._callbacks.endMove();
    this._stop = e = null;
    return this;
  };
  e._callbacks.beginMove();
  (function t() {
    e._callbacks.move([o, a]);
    i = setTimeout(t, 100);
  })();
}
function y(e, t) {
  this._owner = e;
  this._command = t;
  var n = null;
  var i = this._command === "command-zoom-in" ? 1 : -1;
  this._stop = function () {
    clearTimeout(n);
    this._stop = e = null;
    return this;
  };
  (function t() {
    e._adjustZoom(e._zoomFactor + i);
    n = setTimeout(t, 150);
  })();
}
function b(e, t, n) {
  this._owner = e;
  this._zoomFactor = e._zoomFactor;
  this._pos = n.y;
}
p["command-reset"] = _;
p["command-move-up"] = p["command-move-right"] = p["command-move-down"] = p["command-move-left"] = v;
p["command-zoom-in"] = p["command-zoom-out"] = y;
p["command-zoom-drag"] = b;
g.prototype = {
  constructor: g,
  _flags: 0,
  dispose: function () {
    this._params.layoutControl.removeItem(this);
    this._root.linkRemove().linkOff();
    this._offProjection();
    this._offTracker();
    this._params = this._root = this._offProjection = this._offTracker = this._callbacks = null;
  },
  _subscribeToProjection: function (e) {
    var t = this;
    function n() {
      t._adjustZoom(e.getScaledZoom());
    }
    t._offProjection = e.on({
      engine: function () {
        t._update();
      },
      zoom: n,
      "max-zoom": function () {
        t._zoomPartition = e.getZoomScalePartition();
        t._sliderUnitLength = t._sliderLineLength / t._zoomPartition;
        n();
      }
    });
  },
  _subscribeToTracker: function (e) {
    var t = this;
    var n = false;
    t._offTracker = e.on({
      start: function (e) {
        if (n = e.data.name === "control-bar") {
          t._processStart(e.data.index, e);
        }
      },
      move: function (e) {
        if (n) {
          t._processMove(e.data.index, e);
        }
      },
      end: function () {
        if (n) {
          t._processEnd();
          n = false;
        }
      }
    });
  },
  _createCallbacks: function (e) {
    this._callbacks = {
      reset: function (t, n) {
        if (t) {
          e.setCenter(null);
        }
        if (n) {
          e.setZoom(null);
        }
      },
      beginMove: function () {
        e.beginMoveCenter();
      },
      endMove: function () {
        e.endMoveCenter();
      },
      move: function (t) {
        e.moveCenter(t);
      },
      zoom: function (t) {
        e.setScaledZoom(t);
      }
    };
  },
  _createElements: function (e, t, n) {
    this._root = e.g().attr({
      class: "dxm-control-bar"
    }).linkOn(t, "control-bar");
    var i = this._panControl = (0, o.createVisibilityGroup)(e, this._root, "dxm-pan-control");
    var a = this._zoomBar = (0, o.createVisibilityGroup)(e, this._root, "dxm-zoom-bar");
    var r = this._trackersPan = (0, o.createTracker)(e, this._root);
    var s = this._trackersZoom = (0, o.createTracker)(e, this._root);
    this._createTrackersPan(e, n, r);
    this._createTrackersZoom(e, n, s);
    this._createPanControl(e, n, i);
    this._createZoomBar(e, n, a);
  },
  _createPanControl: function (e, t, n) {
    var i = f;
    var o = i.buttonSize / 2;
    var a = i.arrowButtonOffset - o;
    var r = i.arrowButtonOffset;
    var s = {
      "stroke-linecap": "square",
      fill: "none"
    };
    e.circle(0, 0, i.bigCircleSize / 2).append(n);
    e.circle(0, 0, o).attr({
      fill: "none"
    }).append(n);
    e.path([-o, -a, 0, -r, o, -a], "line").attr(s).append(n);
    e.path([a, -o, r, 0, a, o], "line").attr(s).append(n);
    e.path([o, a, 0, r, -o, a], "line").attr(s).append(n);
    e.path([-a, o, -r, 0, -a, -o], "line").attr(s).append(n);
  },
  _createZoomBar: function (e, t, n) {
    var i = f;
    var o = i.incDecButtonSize / 2;
    e.circle(0, i.incButtonOffset, i.smallCircleSize / 2).append(n);
    e.path([[-o, i.incButtonOffset, o, i.incButtonOffset], [0, i.incButtonOffset - o, 0, i.incButtonOffset + o]], "area").append(n);
    e.circle(0, i.decButtonOffset, i.smallCircleSize / 2).append(n);
    e.path([-o, i.decButtonOffset, o, i.decButtonOffset], "area").append(n);
    this._zoomLine = e.path([], "line").append(n);
    this._zoomDrag = e.rect(u(-i.sliderLength / 2), u(i.sliderLineEndOffset - i.sliderWidth / 2), i.sliderLength, i.sliderWidth).append(n);
    this._sliderLineLength = i.sliderLineEndOffset - i.sliderLineStartOffset;
  },
  _createTrackersPan: function (e, t, n) {
    var i = f;
    var o = l((i.arrowButtonOffset - i.trackerGap) / 2);
    var a = i.arrowButtonOffset - o;
    var r = l(d(i.bigCircleSize * i.bigCircleSize / 4 - o * o));
    var s = r - a;
    e.rect(-o, -o, o * 2, o * 2).data(t, {
      index: "command-reset",
      name: "control-bar"
    }).append(n);
    e.rect(-o, -r, o * 2, s).data(t, {
      index: "command-move-up",
      name: "control-bar"
    }).append(n);
    e.rect(a, -o, s, o * 2).data(t, {
      index: "command-move-right",
      name: "control-bar"
    }).append(n);
    e.rect(-o, a, o * 2, s).data(t, {
      index: "command-move-down",
      name: "control-bar"
    }).append(n);
    e.rect(-r, -o, s, o * 2).data(t, {
      index: "command-move-left",
      name: "control-bar"
    }).append(n);
  },
  _createTrackersZoom: function (e, t, n) {
    var i = f;
    e.circle(0, i.incButtonOffset, i.smallCircleSize / 2).data(t, {
      index: "command-zoom-in",
      name: "control-bar"
    }).append(n);
    e.circle(0, i.decButtonOffset, i.smallCircleSize / 2).data(t, {
      index: "command-zoom-out",
      name: "control-bar"
    }).append(n);
    e.rect(-2, i.sliderLineStartOffset - 2, 4, i.sliderLineEndOffset - i.sliderLineStartOffset + 4).css({
      cursor: "default"
    }).data(t, {
      index: "command-zoom-drag-line",
      name: "control-bar"
    }).append(n);
    this._zoomDragTracker = e.rect(-i.sliderLength / 2, i.sliderLineEndOffset - i.sliderWidth / 2, i.sliderLength, i.sliderWidth).data(t, {
      index: "command-zoom-drag",
      name: "control-bar"
    }).append(n);
  },
  resize: function (e) {
    if (this._isActive) {
      this._root.attr({
        visibility: e !== null ? null : "hidden"
      });
    }
  },
  getLayoutOptions: function () {
    if (this._isActive) {
      return this._layoutOptions;
    } else {
      return null;
    }
  },
  locate: function (e, t) {
    this._root.attr({
      translateX: e + this._margin + 30.5,
      translateY: t + this._margin + 30.5
    });
  },
  _update: function () {
    this._isActive = this._isEnabled && this._flags && this._params.projection.isInvertible();
    var e = [this._panControl, this._trackersPan];
    var t = [this._zoomBar, this._trackersZoom];
    if (this._isActive) {
      this._root.linkAppend();
      (0, o.toggleDisplay)(e, this._isPanVisible);
      (0, o.toggleDisplay)(t, this._isZoomVisible);
    } else {
      this._root.linkRemove();
    }
    this._processEnd();
    this.updateLayout();
  },
  setInteraction: function (e) {
    if ((0, i.parseScalar)(e.centeringEnabled, true)) {
      this._flags |= 1;
    } else {
      this._flags &= -2;
    }
    if ((0, i.parseScalar)(e.zoomingEnabled, true)) {
      this._flags |= 2;
    } else {
      this._flags &= -3;
    }
    this._update();
  },
  setOptions: function (e) {
    var t = {
      "stroke-width": e.borderWidth,
      stroke: e.borderColor,
      fill: e.color,
      "fill-opacity": e.opacity
    };
    this._isEnabled = !!(0, i.parseScalar)(e.enabled, true);
    this._margin = e.margin || 0;
    this._layoutOptions = {
      width: this._margin * 2 + 61,
      height: this._margin * 2 + 274,
      horizontalAlignment: c(e.horizontalAlignment, "left"),
      verticalAlignment: h(e.verticalAlignment, "top")
    };
    this._isPanVisible = !!(0, i.parseScalar)(e.panVisible, true);
    this._isZoomVisible = !!(0, i.parseScalar)(e.zoomVisible, true);
    this._panControl.attr(t);
    this._zoomBar.attr(t);
    this._update();
  },
  _adjustZoom: function (e) {
    var t = f.sliderLineStartOffset;
    var n = f.sliderLineEndOffset;
    var i = f.sliderWidth;
    this._zoomFactor = s(r(l(e), this._zoomPartition), 0);
    var o = {
      translateY: -l(this._zoomFactor * this._sliderUnitLength)
    };
    var a = n - i / 2 + o.translateY;
    this._zoomLine.attr({
      points: [[0, t, 0, s(t, a)], [0, r(n, a + i), 0, n]]
    });
    this._zoomDrag.attr(o);
    this._zoomDragTracker.attr(o);
  },
  _applyZoom: function () {
    this._callbacks.zoom(this._zoomFactor);
  },
  _processStart: function (e, t) {
    var n;
    if (this._isActive) {
      n = p[e];
      this._command = n && n.flags & this._flags ? new n(this, e, t) : null;
    }
  },
  _processMove: function (e, t) {
    if (this._command) {
      this._command.update(e, t);
    }
  },
  _processEnd: function () {
    if (this._command) {
      this._command.finish();
    }
    this._command = null;
  }
};
_.flags = 3;
_.prototype.update = function (e) {
  if (e !== this._command) {
    m(this);
  }
};
_.prototype.finish = function () {
  var e = this._owner._flags;
  this._owner._callbacks.reset(!!(e & 1), !!(e & 2));
  m(this);
};
v.flags = 1;
v.prototype.update = function (e) {
  if (this._command !== e) {
    this.finish();
  }
};
v.prototype.finish = function () {
  m(this._stop());
};
y.flags = 2;
y.prototype.update = function (e) {
  if (this._command !== e) {
    this.finish();
  }
};
y.prototype.finish = function () {
  this._owner._applyZoom();
  m(this._stop());
};
b.flags = 2;
b.prototype.update = function (e, t) {
  var n = this._owner;
  n._adjustZoom(this._zoomFactor + n._zoomPartition * (this._pos - t.y) / n._sliderLineLength);
};
b.prototype.finish = function () {
  this._owner._applyZoom();
  m(this);
};