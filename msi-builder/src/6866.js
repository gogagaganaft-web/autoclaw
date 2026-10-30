exports.default = undefined;
var i;
var o = require("./20576.js");
var a = (i = require("./38377.js")) && i.__esModule ? i : {
  default: i
};
var r = require("./90057.js");
var s = a.default.abstract;
var l = a.default.inherit({
  ctor: function () {
    this._finished = true;
    this._stopped = false;
    this._proxiedStepCore = this._stepCore.bind(this);
  },
  start: function () {
    this._stopped = false;
    this._finished = false;
    this._stepCore();
  },
  stop: function () {
    this._stopped = true;
    (0, r.cancelAnimationFrame)(this._stepAnimationFrame);
  },
  _stepCore: function () {
    if (this._isStopped()) {
      this._stop();
    } else {
      if (this._isFinished()) {
        this._finished = true;
        this._complete();
        return;
      }
      this._step();
      this._stepAnimationFrame = (0, r.requestAnimationFrame)(this._proxiedStepCore);
    }
  },
  _step: s,
  _isFinished: o.noop,
  _stop: o.noop,
  _complete: o.noop,
  _isStopped: function () {
    return this._stopped;
  },
  inProgress: function () {
    return !this._stopped && !this._finished;
  }
});
exports.default = l;
module.exports = exports.default;
module.exports.default = exports.default;