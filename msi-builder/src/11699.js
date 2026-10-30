exports.default = undefined;
var i = require("./39611.js");
var o = r(require("./31391.js"));
var a = r(require("./82495.js"));
function r(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var s = Math.abs;
var l = o.default.inherit({
  start: function (e) {
    this._startEventData = (0, i.eventData)(e);
    this._startTimer(e);
  },
  _startTimer: function (e) {
    var t = "timeout" in this ? this.timeout : 750;
    this._holdTimer = setTimeout(function () {
      this._requestAccept(e);
      this._fireEvent("dxhold", e, {
        target: e.target
      });
      this._forgetAccept();
    }.bind(this), t);
  },
  move: function (e) {
    if (this._touchWasMoved(e)) {
      this._cancel(e);
    }
  },
  _touchWasMoved: function (e) {
    var t = (0, i.eventDelta)(this._startEventData, (0, i.eventData)(e));
    return s(t.x) > 5 || s(t.y) > 5;
  },
  end: function () {
    this._stopTimer();
  },
  _stopTimer: function () {
    clearTimeout(this._holdTimer);
  },
  cancel: function () {
    this._stopTimer();
  },
  dispose: function () {
    this._stopTimer();
  }
});
(0, a.default)({
  emitter: l,
  bubble: true,
  events: ["dxhold"]
});
var u = {
  name: "dxhold"
};
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;