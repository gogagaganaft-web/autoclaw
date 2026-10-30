exports.TransitionExecutor = undefined;
var i = h(require("./68374.js"));
var o = h(require("./38377.js"));
var a = require("./13306.js");
var r = require("./20576.js");
var s = require("./35922.js");
var l = require("./95479.js");
var u = h(require("./87209.js"));
var d = require("./42814.js");
var c = require("./62754.js");
function h(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var f = {
  forward: " dx-forward",
  backward: " dx-backward",
  none: " dx-no-direction",
  undefined: " dx-no-direction"
};
var p = o.default.inherit({
  ctor: function () {
    this._accumulatedDelays = {
      enter: 0,
      leave: 0
    };
    this._animations = [];
    this.reset();
  },
  _createAnimations: function (e, t, n, o) {
    e = (0, i.default)(e);
    var a = this;
    var r = [];
    n = n || {};
    var s = this._prepareElementAnimationConfig(t, n, o);
    if (s) {
      e.each(function () {
        var e = a._createAnimation((0, i.default)(this), s, n);
        if (e) {
          e.element.addClass("dx-animating");
          e.setup();
          r.push(e);
        }
      });
    }
    return r;
  },
  _prepareElementAnimationConfig: function (e, t, n) {
    var i;
    if (typeof e == "string") {
      var o = e;
      e = d.presets.getPreset(o);
    }
    if (e) {
      if ((0, s.isFunction)(e[n])) {
        i = e[n];
      } else {
        if (!(i = (0, a.extend)({
          skipElementInitialStyles: true,
          cleanupWhen: this._completePromise
        }, e, t)).type || i.type === "css") {
          var r = "dx-" + n;
          var l = (i.extraCssClasses ? " " + i.extraCssClasses : "") + f[i.direction];
          i.type = "css";
          i.from = (i.from || r) + l;
          i.to = i.to || r + "-active";
        }
        i.staggerDelay = i.staggerDelay || 0;
        i.delay = i.delay || 0;
        if (i.staggerDelay) {
          i.delay += this._accumulatedDelays[n];
          this._accumulatedDelays[n] += i.staggerDelay;
        }
      }
    } else {
      i = undefined;
    }
    return i;
  },
  _createAnimation: function (e, t, n) {
    var i;
    if ((0, s.isPlainObject)(t)) {
      i = u.default.createAnimation(e, t);
    } else if ((0, s.isFunction)(t)) {
      i = t(e, n);
    }
    return i;
  },
  _startAnimations: function () {
    for (var e = this._animations, t = 0; t < e.length; t++) {
      e[t].start();
    }
  },
  _stopAnimations: function (e) {
    for (var t = this._animations, n = 0; n < t.length; n++) {
      t[n].stop(e);
    }
  },
  _clearAnimations: function () {
    for (var e = this._animations, t = 0; t < e.length; t++) {
      e[t].element.removeClass("dx-animating");
    }
    this._animations.length = 0;
  },
  reset: function () {
    this._accumulatedDelays.enter = 0;
    this._accumulatedDelays.leave = 0;
    this._clearAnimations();
    this._completeDeferred = new c.Deferred();
    this._completePromise = this._completeDeferred.promise();
  },
  enter: function (e, t, n) {
    var i = this._createAnimations(e, t, n, "enter");
    this._animations.push.apply(this._animations, i);
  },
  leave: function (e, t, n) {
    var i = this._createAnimations(e, t, n, "leave");
    this._animations.push.apply(this._animations, i);
  },
  start: function () {
    var e;
    var t = this;
    if (this._animations.length) {
      var n = (0, l.map)(this._animations, function (e) {
        var t = new c.Deferred();
        e.deferred.always(function () {
          t.resolve();
        });
        return t.promise();
      });
      e = c.when.apply(i.default, n).always(function () {
        t._completeDeferred.resolve();
        t.reset();
      });
      (0, r.executeAsync)(function () {
        t._startAnimations();
      });
    } else {
      t.reset();
      e = new c.Deferred().resolve().promise();
    }
    return e;
  },
  stop: function (e) {
    this._stopAnimations(e);
  }
});
exports.TransitionExecutor = p;