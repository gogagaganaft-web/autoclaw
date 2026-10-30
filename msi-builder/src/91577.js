exports.AnimationController = c;
exports.easingFunctions = exports.animationSvgStep = undefined;
var i = require("./90057.js");
function o() {}
var a = {
  easeOutCubic: function (e, t, n) {
    if (e === 1) {
      return n;
    } else {
      return (1 - Math.pow(1 - e, 3)) * (n - t) + +t;
    }
  },
  linear: function (e, t, n) {
    if (e === 1) {
      return n;
    } else {
      return e * (n - t) + +t;
    }
  }
};
exports.easingFunctions = a;
var r = {
  segments: function (e, t, n, i, o) {
    var a;
    var r;
    var s;
    var l;
    var u = t.from;
    var d = t.to;
    var c = [];
    for (s = 0; s < u.length; s++) {
      r = [(a = u[s])[0]];
      if (a.length > 1) {
        for (l = 1; l < a.length; l++) {
          r.push(i(n, a[l], d[s][l]));
        }
      }
      c.push(r);
    }
    o.segments = t.end && n === 1 ? t.end : c;
    e.attr({
      segments: c
    });
  },
  arc: function (e, t, n, i) {
    var o = t.from;
    var a = t.to;
    var r = {};
    for (var s in o) {
      r[s] = i(n, o[s], a[s]);
    }
    e.attr(r);
  },
  transform: function (e, t, n, i, o) {
    var a = t.from;
    var r = t.to;
    var s = {};
    for (var l in a) {
      s[l] = o[l] = i(n, a[l], r[l]);
    }
    e.attr(s);
  },
  base: function (e, t, n, i, o, a) {
    var r = {};
    r[a] = o[a] = i(n, t.from, t.to);
    e.attr(r);
  },
  _: o,
  complete: function (e, t) {
    e.attr(t);
  }
};
function s(e) {
  var t;
  var n = this._animateStep;
  this._progress = this._calcProgress(e);
  for (t in this.params) {
    (n[t] || n.base)(this.element, this.params[t], this._progress, this._easing, this._currentParams, t);
  }
  if (this.options.step) {
    this.options.step(this._easing(this._progress, 0, 1), this._progress);
  }
  return this._progress !== 1 || this.stop();
}
function l(e) {
  if (e - this._startTime >= this.delay) {
    this.tick = s;
  }
  return true;
}
function u(e) {
  this._startTime = e;
  this.tick = this.delay ? l : s;
  return true;
}
function d(e, t, n) {
  this._progress = 0;
  this.element = e;
  this.params = t;
  this.options = n;
  this.duration = n.partitionDuration ? n.duration * n.partitionDuration : n.duration;
  this.delay = n.delay && n.duration * n.delay || 0;
  this._animateStep = n.animateStep || r;
  this._easing = a[n.easing] || a.easeOutCubic;
  this._currentParams = {};
  this.tick = u;
}
function c(e) {
  this._animationCount = 0;
  this._timerId = null;
  this._animations = {};
  this.element = e;
}
exports.animationSvgStep = r;
d.prototype = {
  _calcProgress: function (e) {
    return Math.min(1, (e - this.delay - this._startTime) / this.duration);
  },
  stop: function (e) {
    var t = this.options;
    var n = this._animateStep;
    this.stop = this.tick = o;
    if (n.complete) {
      n.complete(this.element, this._currentParams);
    }
    if (t.complete && !e) {
      t.complete();
    }
  }
};
c.prototype = {
  _loop: function () {
    var e;
    var t = this;
    var n = t._animations;
    var o = 0;
    var a = new Date().getTime();
    var r = t._endAnimation;
    for (e in n) {
      if (!n[e].tick(a)) {
        delete n[e];
      }
      o++;
    }
    if (o === 0) {
      t.stop();
      t._endAnimationTimer = r && setTimeout(function () {
        if (t._animationCount === 0) {
          r();
          t._endAnimation = null;
        }
      });
      return;
    }
    t._timerId = i.requestAnimationFrame.call(null, function () {
      t._loop();
    }, t.element);
  },
  addAnimation: function (e) {
    var t = this;
    t._animations[t._animationCount++] = e;
    clearTimeout(t._endAnimationTimer);
    if (!t._timerId) {
      clearTimeout(t._startDelay);
      t._startDelay = setTimeout(function () {
        t._timerId = 1;
        t._loop();
      }, 0);
    }
  },
  animateElement: function (e, t, n) {
    if (e && t && n) {
      if (e.animation) {
        e.animation.stop();
      }
      this.addAnimation(e.animation = new d(e, t, n));
    }
  },
  onEndAnimation: function (e) {
    if (this._animationCount) {
      this._endAnimation = e;
    } else {
      e();
    }
  },
  dispose: function () {
    this.stop();
    this.element = null;
  },
  stop: function () {
    this._animations = {};
    this._animationCount = 0;
    (0, i.cancelAnimationFrame)(this._timerId);
    clearTimeout(this._startDelay);
    clearTimeout(this._endAnimationTimer);
    this._timerId = null;
  },
  lock: function () {
    var e;
    var t;
    var n;
    var i = this._animations;
    for (e in i) {
      t = i[e].options.unstoppable;
      n = n || t;
      if (!t) {
        i[e].stop(true);
        delete i[e];
      }
    }
    if (!n) {
      this.stop();
    }
  }
};