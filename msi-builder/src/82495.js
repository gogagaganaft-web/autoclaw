exports.default = undefined;
var i = g(require("./68374.js"));
var o = g(require("./24311.js"));
var a = g(require("./73349.js"));
var r = g(require("./55994.js"));
var s = require("./97906.js");
var l = g(require("./38377.js"));
var u = require("./13306.js");
var d = require("./95479.js");
var c = g(require("./85788.js"));
var h = require("./39611.js");
var f = g(require("./93786.js"));
var p = require("./765.js");
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = new (l.default.inherit({
  ctor: function () {
    this._attachHandlers();
    this.reset();
    this._proxiedCancelHandler = this._cancelHandler.bind(this);
    this._proxiedAcceptHandler = this._acceptHandler.bind(this);
  },
  _attachHandlers: function () {
    o.default.add(function () {
      var e = a.default.getDocument();
      r.default.subscribeGlobal(e, (0, h.addNamespace)(f.default.down, "dxEventManager"), this._pointerDownHandler.bind(this));
      r.default.subscribeGlobal(e, (0, h.addNamespace)(f.default.move, "dxEventManager"), this._pointerMoveHandler.bind(this));
      r.default.subscribeGlobal(e, (0, h.addNamespace)([f.default.up, f.default.cancel].join(" "), "dxEventManager"), this._pointerUpHandler.bind(this));
      r.default.subscribeGlobal(e, (0, h.addNamespace)(p.name, "dxEventManager"), this._mouseWheelHandler.bind(this));
    }.bind(this));
  },
  _eachEmitter: function (e) {
    for (var t = this._activeEmitters || [], n = 0; t.length > n;) {
      var i = t[n];
      if (e(i) === false) {
        break;
      }
      if (t[n] === i) {
        n++;
      }
    }
  },
  _applyToEmitters: function (e, t) {
    this._eachEmitter(function (n) {
      n[e].call(n, t);
    });
  },
  reset: function () {
    this._eachEmitter(this._proxiedCancelHandler);
    this._activeEmitters = [];
  },
  resetEmitter: function (e) {
    this._proxiedCancelHandler(e);
  },
  _pointerDownHandler: function (e) {
    if (!(0, h.isMouseEvent)(e) || !(e.which > 1)) {
      this._updateEmitters(e);
    }
  },
  _updateEmitters: function (e) {
    if (this._isSetChanged(e)) {
      this._cleanEmitters(e);
      this._fetchEmitters(e);
    }
  },
  _isSetChanged: function (e) {
    var t = this._closestEmitter(e);
    var n = this._emittersSet || [];
    var i = t.length !== n.length;
    (0, d.each)(t, function (e, t) {
      return !(i = i || n[e] !== t);
    });
    this._emittersSet = t;
    return i;
  },
  _closestEmitter: function (e) {
    var t = this;
    var n = [];
    var o = (0, i.default)(e.target);
    function a(i, o) {
      if (o && o.validatePointers(e) && o.validate(e)) {
        o.addCancelCallback(t._proxiedCancelHandler);
        o.addAcceptCallback(t._proxiedAcceptHandler);
        n.push(o);
      }
    }
    while (o.length) {
      var r = (0, s.data)(o.get(0), "dxEmitter") || [];
      (0, d.each)(r, a);
      o = o.parent();
    }
    return n;
  },
  _acceptHandler: function (e, t) {
    var n = this;
    this._eachEmitter(function (i) {
      if (i !== e) {
        n._cancelEmitter(i, t);
      }
    });
  },
  _cancelHandler: function (e, t) {
    this._cancelEmitter(e, t);
  },
  _cancelEmitter: function (e, t) {
    var n = this._activeEmitters;
    if (t) {
      e.cancel(t);
    } else {
      e.reset();
    }
    e.removeCancelCallback();
    e.removeAcceptCallback();
    var i = n.indexOf(e);
    if (i > -1) {
      n.splice(i, 1);
    }
  },
  _cleanEmitters: function (e) {
    this._applyToEmitters("end", e);
    this.reset(e);
  },
  _fetchEmitters: function (e) {
    this._activeEmitters = this._emittersSet.slice();
    this._applyToEmitters("start", e);
  },
  _pointerMoveHandler: function (e) {
    this._applyToEmitters("move", e);
  },
  _pointerUpHandler: function (e) {
    this._updateEmitters(e);
  },
  _mouseWheelHandler: function (e) {
    if (this._allowInterruptionByMouseWheel()) {
      e.pointers = [null];
      this._pointerDownHandler(e);
      this._adjustWheelEvent(e);
      this._pointerMoveHandler(e);
      e.pointers = [];
      this._pointerUpHandler(e);
    }
  },
  _allowInterruptionByMouseWheel: function () {
    var e = true;
    this._eachEmitter(function (t) {
      return e = t.allowInterruptionByMouseWheel() && e;
    });
    return e;
  },
  _adjustWheelEvent: function (e) {
    var t = null;
    this._eachEmitter(function (n) {
      if (n.gesture) {
        var i = n.getDirection(e);
        if (i !== "horizontal" && !e.shiftKey || i !== "vertical" && e.shiftKey) {
          t = n;
          return false;
        } else {
          return undefined;
        }
      }
    });
    if (t) {
      var n = t.getDirection(e);
      var i = n === "both" && !e.shiftKey || n === "vertical";
      e[i ? "pageY" : "pageX"] += e.delta;
    }
  },
  isActive: function (e) {
    var t = false;
    this._eachEmitter(function (n) {
      t = t || n.getElement().is(e);
    });
    return t;
  }
}))();
function _(e) {
  var t = e.emitter;
  var n = e.events[0];
  var i = e.events;
  (0, d.each)(i, function (o, a) {
    (0, c.default)(a, {
      noBubble: !e.bubble,
      setup: function (e) {
        var i = (0, s.data)(e, "dxEmitterSubscription") || {};
        var o = (0, s.data)(e, "dxEmitter") || {};
        var r = o[n] || new t(e);
        i[a] = true;
        o[n] = r;
        (0, s.data)(e, "dxEmitter", o);
        (0, s.data)(e, "dxEmitterSubscription", i);
      },
      add: function (e, t) {
        (0, s.data)(e, "dxEmitter")[n].configure((0, u.extend)({
          delegateSelector: t.selector
        }, t.data), t.type);
      },
      teardown: function (e) {
        var t = (0, s.data)(e, "dxEmitterSubscription");
        var o = (0, s.data)(e, "dxEmitter");
        var r = o[n];
        delete t[a];
        var l = true;
        (0, d.each)(i, function (e, n) {
          return l = l && !t[n];
        });
        if (l) {
          if (m.isActive(e)) {
            m.resetEmitter(r);
          }
          if (r) {
            r.dispose();
          }
          delete o[n];
        }
      }
    });
  });
}
exports.default = _;
module.exports = exports.default;
module.exports.default = exports.default;