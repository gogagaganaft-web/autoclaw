exports.default = undefined;
var i = g(require("./68374.js"));
var o = g(require("./55994.js"));
var a = g(require("./20530.js"));
var r = require("./80968.js");
var s = g(require("./39618.js"));
var l = require("./3532.js");
var u = g(require("./24311.js"));
var d = require("./60810.js");
var c = require("./20576.js");
var h = require("./35922.js");
var f = require("./39611.js");
var p = g(require("./31391.js"));
function g(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var m = u.default.add;
var _ = Math.abs;
var v = 10;
var y = (0, s.default)(function () {
  var e = a.default.real().deviceType === "desktop";
  if (!(0, r.styleProp)("pointer-events") || !e) {
    return c.noop;
  }
  var t = (0, i.default)("<div>").addClass("dx-gesture-cover").css("pointerEvents", "none");
  o.default.subscribeGlobal(t, "dxmousewheel", function (e) {
    e.preventDefault();
  });
  m(function () {
    t.appendTo("body");
  });
  return function (e, n) {
    t.css("pointerEvents", e ? "all" : "none");
    if (e) {
      t.css("cursor", n);
    }
  };
});
var b = p.default.inherit({
  gesture: true,
  configure: function (e) {
    this.getElement().css("msTouchAction", e.immediate ? "pinch-zoom" : "");
    this.callBase(e);
  },
  allowInterruptionByMouseWheel: function () {
    return this._stage !== 2;
  },
  getDirection: function () {
    return this.direction;
  },
  _cancel: function () {
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
    this._stage = 0;
  },
  start: function (e) {
    if (e._needSkipEvent || (0, f.needSkipEvent)(e)) {
      this._cancel(e);
    } else {
      this._startEvent = (0, f.createEvent)(e);
      this._startEventData = (0, f.eventData)(e);
      this._stage = 1;
      this._init(e);
      this._setupImmediateTimer();
    }
  },
  _setupImmediateTimer: function () {
    clearTimeout(this._immediateTimer);
    this._immediateAccepted = false;
    if (this.immediate) {
      if (this.immediateTimeout !== 0) {
        this._immediateTimer = setTimeout(function () {
          this._immediateAccepted = true;
        }.bind(this), this.immediateTimeout ?? 180);
      } else {
        this._immediateAccepted = true;
      }
    }
  },
  move: function (e) {
    if (this._stage === 1 && this._directionConfirmed(e)) {
      this._stage = 2;
      this._resetActiveElement();
      this._toggleGestureCover(true);
      this._clearSelection(e);
      this._adjustStartEvent(e);
      this._start(this._startEvent);
      if (this._stage === 0) {
        return;
      }
      this._requestAccept(e);
      this._move(e);
      this._forgetAccept();
    } else if (this._stage === 2) {
      this._clearSelection(e);
      this._move(e);
    }
  },
  _directionConfirmed: function (e) {
    var t = this._getTouchBoundary(e);
    var n = (0, f.eventDelta)(this._startEventData, (0, f.eventData)(e));
    var i = _(n.x);
    var o = _(n.y);
    var a = this._validateMove(t, i, o);
    var r = this._validateMove(t, o, i);
    var s = this.getDirection(e);
    return s === "both" && (a || r) || s === "horizontal" && a || s === "vertical" && r || this._immediateAccepted;
  },
  _validateMove: function (e, t, n) {
    return t && t >= e && (!this.immediate || t >= n);
  },
  _getTouchBoundary: function (e) {
    if (this.immediate || (0, f.isDxMouseWheelEvent)(e)) {
      return 0;
    } else {
      return v;
    }
  },
  _adjustStartEvent: function (e) {
    var t = this._getTouchBoundary(e);
    var n = (0, f.eventDelta)(this._startEventData, (0, f.eventData)(e));
    this._startEvent.pageX += (0, d.sign)(n.x) * t;
    this._startEvent.pageY += (0, d.sign)(n.y) * t;
  },
  _resetActiveElement: function () {
    if (a.default.real().platform === "ios" && this.getElement().find(":focus").length) {
      (0, l.resetActiveElement)();
    }
  },
  _toggleGestureCover: function (e) {
    this._toggleGestureCoverImpl(e);
  },
  _toggleGestureCoverImpl: function (e) {
    if (this._stage === 2) {
      (function (e, t) {
        y()(e, t);
      })(e, this.getElement().css("cursor"));
    }
  },
  _clearSelection: function (e) {
    if (!(0, f.isDxMouseWheelEvent)(e) && !(0, f.isTouchEvent)(e)) {
      (0, l.clearSelection)();
    }
  },
  end: function (e) {
    this._toggleGestureCover(false);
    if (this._stage === 2) {
      this._end(e);
    } else if (this._stage === 1) {
      this._stop(e);
    }
    this._stage = 0;
  },
  dispose: function () {
    clearTimeout(this._immediateTimer);
    this.callBase.apply(this, arguments);
    this._toggleGestureCover(false);
  },
  _init: c.noop,
  _start: c.noop,
  _move: c.noop,
  _stop: c.noop,
  _end: c.noop
});
b.initialTouchBoundary = v;
b.touchBoundary = function (e) {
  if (!(0, h.isDefined)(e)) {
    return v;
  }
  v = e;
};
var x = b;
exports.default = x;
module.exports = exports.default;
module.exports.default = exports.default;