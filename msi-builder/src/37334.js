exports.default = undefined;
var i = d(require("./55994.js"));
var o = d(require("./38377.js"));
var a = require("./39611.js");
var r = d(require("./98621.js"));
var s = d(require("./82495.js"));
var l = require("./90057.js");
var u = d(require("./20530.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var c;
var h;
var f;
var p = o.default.abstract;
var g = u.default.real();
var m = o.default.inherit((c = (0, a.addNamespace)("scroll", "dxScrollEmitter"), {
  ctor: function (e) {
    var t = this;
    this._element = e;
    this._locked = false;
    this._proxiedScroll = function (e) {
      if (!t._disposed) {
        t._scroll(e);
      }
    };
    i.default.on(this._element, c, this._proxiedScroll);
  },
  _scroll: p,
  check: function (e, t) {
    if (this._locked) {
      t();
    }
  },
  dispose: function () {
    this._disposed = true;
    i.default.off(this._element, c, this._proxiedScroll);
  }
}));
var _ = m.inherit({
  ctor: function (e, t) {
    this.callBase(e);
    this._timeout = t;
  },
  _scroll: function () {
    this._prepare();
    this._forget();
  },
  _prepare: function () {
    if (this._timer) {
      this._clearTimer();
    }
    this._locked = true;
  },
  _clearTimer: function () {
    clearTimeout(this._timer);
    this._locked = false;
    this._timer = null;
  },
  _forget: function () {
    var e = this;
    this._timer = setTimeout(function () {
      e._clearTimer();
    }, this._timeout);
  },
  dispose: function () {
    this.callBase();
    this._clearTimer();
  }
});
var v = _.inherit({
  ctor: function (e) {
    this.callBase(e, 400);
    this._lastWheelDirection = null;
  },
  check: function (e, t) {
    this._checkDirectionChanged(e);
    this.callBase(e, t);
  },
  _checkDirectionChanged: function (e) {
    if ((0, a.isDxMouseWheelEvent)(e)) {
      var t = e.shiftKey || false;
      var n = this._lastWheelDirection !== null && t !== this._lastWheelDirection;
      this._lastWheelDirection = t;
      this._locked = this._locked && !n;
    } else {
      this._lastWheelDirection = null;
    }
  }
});
var y = _.inherit({
  ctor: function (e) {
    this.callBase(e, 400);
  }
});
h = g.ios;
f = g.android;
if (h || f) {
  y = m.inherit({
    _scroll: function () {
      this._locked = true;
      var e = this;
      (0, l.cancelAnimationFrame)(this._scrollFrame);
      this._scrollFrame = (0, l.requestAnimationFrame)(function () {
        e._locked = false;
      });
    },
    check: function (e, t) {
      (0, l.cancelAnimationFrame)(this._scrollFrame);
      (0, l.cancelAnimationFrame)(this._checkFrame);
      var n = this;
      var i = this.callBase;
      this._checkFrame = (0, l.requestAnimationFrame)(function () {
        i.call(n, e, t);
        n._locked = false;
      });
    },
    dispose: function () {
      this.callBase();
      (0, l.cancelAnimationFrame)(this._scrollFrame);
      (0, l.cancelAnimationFrame)(this._checkFrame);
    }
  });
}
var b;
var x = r.default.inherit((b = Math.round(1000 / 60), {
  ctor: function (e) {
    this.callBase.apply(this, arguments);
    this.direction = "both";
    this._pointerLocker = new y(e);
    this._wheelLocker = new v(e);
  },
  validate: function () {
    return true;
  },
  configure: function (e) {
    if (e.scrollTarget) {
      this._pointerLocker.dispose();
      this._wheelLocker.dispose();
      this._pointerLocker = new y(e.scrollTarget);
      this._wheelLocker = new v(e.scrollTarget);
    }
    this.callBase(e);
  },
  _init: function (e) {
    this._wheelLocker.check(e, function () {
      if ((0, a.isDxMouseWheelEvent)(e)) {
        this._accept(e);
      }
    }.bind(this));
    this._pointerLocker.check(e, function () {
      var t = this.isNative && (0, a.isMouseEvent)(e);
      if (!(0, a.isDxMouseWheelEvent)(e) && !t) {
        this._accept(e);
      }
    }.bind(this));
    this._fireEvent("dxscrollinit", e);
    this._prevEventData = (0, a.eventData)(e);
  },
  move: function (e) {
    this.callBase.apply(this, arguments);
    e.isScrollingEvent = this.isNative || e.isScrollingEvent;
  },
  _start: function (e) {
    this._savedEventData = (0, a.eventData)(e);
    this._fireEvent("dxscrollstart", e);
    this._prevEventData = (0, a.eventData)(e);
  },
  _move: function (e) {
    var t = (0, a.eventData)(e);
    this._fireEvent("dxscroll", e, {
      delta: (0, a.eventDelta)(this._prevEventData, t)
    });
    if ((0, a.eventDelta)(this._savedEventData, t).time > 200) {
      this._savedEventData = this._prevEventData;
    }
    this._prevEventData = (0, a.eventData)(e);
  },
  _end: function (e) {
    var t = (0, a.eventDelta)(this._prevEventData, (0, a.eventData)(e));
    var n = {
      x: 0,
      y: 0
    };
    if (!(0, a.isDxMouseWheelEvent)(e) && t.time < 100) {
      var i = (0, a.eventDelta)(this._savedEventData, this._prevEventData);
      var o = b / i.time;
      n = {
        x: i.x * o,
        y: i.y * o
      };
    }
    this._fireEvent("dxscrollend", e, {
      velocity: n
    });
  },
  _stop: function (e) {
    this._fireEvent("dxscrollstop", e);
  },
  cancel: function (e) {
    this.callBase.apply(this, arguments);
    this._fireEvent("dxscrollcancel", e);
  },
  dispose: function () {
    this.callBase.apply(this, arguments);
    this._pointerLocker.dispose();
    this._wheelLocker.dispose();
  },
  _clearSelection: function () {
    if (!this.isNative) {
      return this.callBase.apply(this, arguments);
    }
  },
  _toggleGestureCover: function () {
    if (!this.isNative) {
      return this.callBase.apply(this, arguments);
    }
  }
}));
(0, s.default)({
  emitter: x,
  events: ["dxscrollinit", "dxscrollstart", "dxscroll", "dxscrollend", "dxscrollstop", "dxscrollcancel"]
});
var w = {
  init: "dxscrollinit",
  start: "dxscrollstart",
  move: "dxscroll",
  end: "dxscrollend",
  stop: "dxscrollstop",
  cancel: "dxscrollcancel",
  scroll: "scroll"
};
exports.default = w;
module.exports = exports.default;
module.exports.default = exports.default;