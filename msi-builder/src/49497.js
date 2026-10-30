exports.Tracker = x;
var i = d(require("./55994.js"));
var o = require("./58201.js");
var a = d(require("./73349.js"));
var r = require("./63832.js");
var s = require("./39611.js");
var l = require("./765.js");
var u = require("./19157.js");
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
var p = (0, o.getNavigator)();
var g = Math;
var m = g.abs;
var _ = g.sqrt;
var v = g.round;
var y = s.addNamespace;
var b = "dxVectorMap";
function x(e) {
  var t = this;
  t._root = e.root;
  t._createEventHandlers(e.dataKey);
  t._createProjectionHandlers(e.projection);
  t._initEvents();
  t._focus = new h(function (e, n) {
    t._fire(e, n);
  });
  t._attachHandlers();
}
function w(e, t, n, i) {
  return _((e - n) * (e - n) + (t - i) * (t - i));
}
function C(e) {
  var t = e.originalEvent.type;
  var n = e.originalEvent.pointerType;
  return /^touch/.test(t) || /^MSPointer/.test(t) && n !== 4 || /^pointer/.test(t) && n !== "mouse";
}
function S(e, t) {
  var n;
  for (var i = 0, o = e.length; i < o; ++i) {
    if (e[i]) {
      n = t[i];
      break;
    }
  }
  return y(n || t[i], b);
}
function k(e) {
  var t = e.originalEvent;
  var n = t.touches && t.touches[0] || {};
  return {
    x: n.pageX || t.pageX || e.pageX,
    y: n.pageY || t.pageY || e.pageY
  };
}
function D(e) {
  return e.originalEvent.pointerId;
}
function I(e, t) {
  var n = e.originalEvent;
  if (n = n.pointerId !== undefined ? n.pointerId === t ? n : null : n.touches[t]) {
    return {
      x: n.pageX || e.pageX,
      y: n.pageY || e.pageY
    };
  } else {
    return null;
  }
}
f = [p.pointerEnabled, p.msPointerEnabled, (0, o.hasProperty)("ontouchstart")];
c = {
  start: S(f, ["pointerdown", "MSPointerDown", "touchstart mousedown", "mousedown"]),
  move: S(f, ["pointermove", "MSPointerMove", "touchmove mousemove", "mousemove"]),
  end: S(f, ["pointerup", "MSPointerUp", "touchend mouseup", "mouseup"]),
  wheel: y(l.name, b)
};
x.prototype = {
  constructor: x,
  dispose: function () {
    this._detachHandlers();
    this._disposeEvents();
    this._focus.dispose();
    this._root = this._focus = this._docHandlers = this._rootHandlers = null;
  },
  _eventNames: ["start", "move", "end", "zoom", "click", "hover-on", "hover-off", "focus-on", "focus-off", "focus-move"],
  _startClick: function (e, t) {
    if (t) {
      var n = k(e);
      this._clickState = {
        x: n.x,
        y: n.y,
        threshold: C(e) ? 20 : 5,
        time: Date.now()
      };
    }
  },
  _endClick: function (e, t) {
    var n;
    var i;
    var o = this._clickState;
    if (o) {
      if (t && Date.now() - o.time <= 500) {
        n = o.threshold;
        i = k(e);
        if (m(i.x - o.x) <= n && m(i.y - o.y) <= n) {
          this._fire("click", {
            data: t,
            x: i.x,
            y: i.y,
            $event: e
          });
        }
      }
      this._clickState = null;
    }
  },
  _startDrag: function (e, t) {
    if (t) {
      var n = k(e);
      var i = this._dragState = {
        x: n.x,
        y: n.y,
        data: t
      };
      this._fire("start", {
        x: i.x,
        y: i.y,
        data: i.data
      });
    }
  },
  _moveDrag: function (e, t) {
    var n = this._dragState;
    if (n) {
      var i = k(e);
      var o = C(e) ? 10 : 5;
      if (n.active || m(i.x - n.x) > o || m(i.y - n.y) > o) {
        n.x = i.x;
        n.y = i.y;
        n.active = true;
        n.data = t || {};
        this._fire("move", {
          x: n.x,
          y: n.y,
          data: n.data
        });
      }
    }
  },
  _endDrag: function () {
    var e = this._dragState;
    if (e) {
      this._dragState = null;
      this._fire("end", {
        x: e.x,
        y: e.y,
        data: e.data
      });
    }
  },
  _wheelZoom: function (e, t) {
    if (t) {
      var n = this._wheelLock;
      var i = Date.now();
      if (!(i - n.time <= 50)) {
        if (i - n.dirTime > 300) {
          n.dir = 0;
        }
        var o = function (e, t) {
          if (e === 0) {
            return 0;
          }
          var n = m(e);
          var i = v(e / n);
          if (t.dir && i !== t.dir) {
            return 0;
          }
          t.dir = i;
          n = n < 0.1 ? 0 : n < 1 ? 1 : n > 4 ? 4 : v(n);
          return i * n;
        }(e.delta / 120 || 0, n);
        if (o !== 0) {
          var a = k(e);
          this._fire("zoom", {
            delta: o,
            x: a.x,
            y: a.y
          });
          n.time = n.dirTime = i;
        }
      }
    }
  },
  _startZoom: function (e, t) {
    if (C(e) && t) {
      var n;
      var i;
      var o = this._zoomState = this._zoomState || {};
      if (!o.pointer1 || !o.pointer2) {
        if (o.pointer1 === undefined) {
          o.pointer1 = D(e) || 0;
          n = I(e, o.pointer1);
          o.x1 = o.x1_0 = n.x;
          o.y1 = o.y1_0 = n.y;
        }
        if (o.pointer2 === undefined && (i = D(e) || 1) !== o.pointer1 && (n = I(e, i))) {
          o.x2 = o.x2_0 = n.x;
          o.y2 = o.y2_0 = n.y;
          o.pointer2 = i;
          o.ready = true;
          this._endDrag();
        }
      }
    }
  },
  _moveZoom: function (e) {
    var t;
    var n = this._zoomState;
    if (n && C(e)) {
      if (n.pointer1 !== undefined && (t = I(e, n.pointer1))) {
        n.x1 = t.x;
        n.y1 = t.y;
      }
      if (n.pointer2 !== undefined && (t = I(e, n.pointer2))) {
        n.x2 = t.x;
        n.y2 = t.y;
      }
    }
  },
  _endZoom: function (e) {
    var t;
    var n;
    var i = this._zoomState;
    if (i && C(e)) {
      if (i.ready) {
        t = w(i.x1_0, i.y1_0, i.x2_0, i.y2_0);
        n = w(i.x1, i.y1, i.x2, i.y2);
        this._fire("zoom", {
          ratio: n / t,
          x: (i.x1_0 + i.x2_0) / 2,
          y: (i.y1_0 + i.y2_0) / 2
        });
      }
      this._zoomState = null;
    }
  },
  _startHover: function (e, t) {
    this._doHover(e, t, true);
  },
  _moveHover: function (e, t) {
    this._doHover(e, t, false);
  },
  _doHover: function (e, t, n) {
    if (this._dragState && this._dragState.active || this._zoomState && this._zoomState.ready) {
      this._cancelHover();
    } else if (C(e) === n && this._hoverTarget !== e.target && (!this._hoverState || this._hoverState.data !== t)) {
      this._cancelHover();
      if (t) {
        this._hoverState = {
          data: t
        };
        this._fire("hover-on", {
          data: t
        });
      }
      this._hoverTarget = e.target;
    }
  },
  _cancelHover: function () {
    var e = this._hoverState;
    this._hoverState = this._hoverTarget = null;
    if (e) {
      this._fire("hover-off", {
        data: e.data
      });
    }
  },
  _startFocus: function (e, t) {
    this._doFocus(e, t, true);
  },
  _moveFocus: function (e, t) {
    this._doFocus(e, t, false);
  },
  _doFocus: function (e, t, n) {
    if (this._dragState && this._dragState.active || this._zoomState && this._zoomState.ready) {
      this._cancelFocus();
    } else if (C(e) === n) {
      this._focus.turnOff();
      if (t) {
        this._focus.turnOn(t, k(e));
      }
    }
  },
  _cancelFocus: function () {
    this._focus.cancel();
  },
  _createEventHandlers: function (e) {
    var t = this;
    function n(t) {
      var n = t.target;
      return (n.tagName === "tspan" ? n.parentNode : n)[e];
    }
    t._docHandlers = {};
    t._rootHandlers = {};
    t._docHandlers[c.start] = function (e) {
      var i = C(e);
      var o = n(e);
      if (!i || !!t._isTouchEnabled) {
        if (o) {
          e.preventDefault();
        }
        t._startClick(e, o);
        t._startDrag(e, o);
        t._startZoom(e, o);
        t._startHover(e, o);
        t._startFocus(e, o);
      }
    };
    t._docHandlers[c.move] = function (e) {
      var i = C(e);
      var o = n(e);
      if (!i || !!t._isTouchEnabled) {
        t._moveDrag(e, o);
        t._moveZoom(e, o);
        t._moveHover(e, o);
        t._moveFocus(e, o);
      }
    };
    t._docHandlers[c.end] = function (e) {
      var i = C(e);
      var o = n(e);
      if (!i || !!t._isTouchEnabled) {
        t._endClick(e, o);
        t._endDrag(e, o);
        t._endZoom(e, o);
      }
    };
    t._rootHandlers[c.wheel] = function (e) {
      t._cancelFocus();
      if (t._isWheelEnabled) {
        var i = n(e);
        if (i) {
          e.preventDefault();
          e.stopPropagation();
          t._wheelZoom(e, i);
        }
      }
    };
    t._wheelLock = {
      dir: 0
    };
  },
  _createProjectionHandlers: function (e) {
    var t = this;
    function n() {
      t._cancelFocus();
    }
    e.on({
      center: n,
      zoom: n
    });
  },
  reset: function () {
    this._clickState = null;
    this._endDrag();
    this._cancelHover();
    this._cancelFocus();
  },
  setOptions: function (e) {
    this.reset();
    this._detachHandlers();
    this._isTouchEnabled = !!(0, u.parseScalar)(e.touchEnabled, true);
    this._isWheelEnabled = !!(0, u.parseScalar)(e.wheelEnabled, true);
    this._attachHandlers();
  },
  _detachHandlers: function () {
    if (this._isTouchEnabled) {
      this._root.css({
        "touch-action": "",
        "-webkit-user-select": ""
      }).off(y("MSHoldVisual", b)).off(y("contextmenu", b));
    }
    i.default.off(a.default.getDocument(), this._docHandlers);
    this._root.off(this._rootHandlers);
  },
  _attachHandlers: function () {
    if (this._isTouchEnabled) {
      this._root.css({
        "touch-action": "none",
        "-webkit-user-select": "none"
      }).on(y("MSHoldVisual", b), function (e) {
        e.preventDefault();
      }).on(y("contextmenu", b), function (e) {
        if (C(e)) {
          e.preventDefault();
        }
      });
    }
    i.default.on(a.default.getDocument(), this._docHandlers);
    this._root.on(this._rootHandlers);
  }
};
h = function (e) {
  var t;
  var n;
  var i = this;
  var o = null;
  var a = null;
  var r = false;
  var s = null;
  i.dispose = function () {
    clearTimeout(s);
    i.turnOn = i.turnOff = i.cancel = i.dispose = i = e = o = a = s = null;
  };
  i.turnOn = function (i, l) {
    function u(e) {
      r = !e;
      if (e) {
        o = a;
        clearTimeout(s);
        s = null;
      }
    }
    if (i !== a || !r) {
      r = false;
      a = i;
      if (o) {
        t = l.x;
        n = l.y;
        if (a === o) {
          e("focus-move", {
            data: a,
            x: t,
            y: n
          });
          u(true);
        } else {
          e("focus-on", {
            data: a,
            x: t,
            y: n,
            done: u
          });
        }
      } else {
        t = l.x;
        n = l.y;
        e("focus-on", {
          data: a,
          x: t,
          y: n,
          done: u
        });
      }
    }
  };
  i.turnOff = function () {
    a = null;
    if (o && !r) {
      s = s || setTimeout(function () {
        s = null;
        e("focus-off", {
          data: o
        });
        o = null;
      }, 100);
    }
  };
  i.cancel = function () {
    clearTimeout(s);
    if (o) {
      e("focus-off", {
        data: o
      });
    }
    o = a = s = null;
  };
};
(0, r.makeEventEmitter)(x);