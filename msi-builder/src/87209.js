exports.default = undefined;
var i = b(require("./68374.js"));
var o = require("./58201.js");
var a = b(require("./55994.js"));
var r = b(require("./17381.js"));
var s = require("./6415.js");
var l = require("./13306.js");
var u = require("./35922.js");
var d = require("./95479.js");
var c = require("./31648.js");
var h = require("./23908.js");
var f = require("./90057.js");
var p = require("./60137.js");
var g = b(require("./49387.js"));
var m = require("./29007.js");
var _ = require("./39611.js");
var v = require("./62754.js");
var y = require("./20576.js");
function b(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function x(e) {
  return (x = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
var w = (0, o.getWindow)();
var C = (0, _.addNamespace)(m.removeEvent, "dxFX");
var S = /^([+-])=(.*)/i;
var k = {
  initAnimation: function (e, t) {
    e.css({
      transitionProperty: "none"
    });
    if (typeof t.from == "string") {
      e.addClass(t.from);
    } else {
      $(e, t.from);
    }
    var n = this;
    var i = new v.Deferred();
    var o = t.cleanupWhen;
    t.transitionAnimation = {
      deferred: i,
      finish: function () {
        n._finishTransition(e);
        if (o) {
          (0, v.when)(i, o).always(function () {
            n._cleanup(e, t);
          });
        } else {
          n._cleanup(e, t);
        }
        i.resolveWith(e, [t, e]);
      }
    };
    this._completeAnimationCallback(e, t).done(function () {
      t.transitionAnimation.finish();
    }).fail(function () {
      i.rejectWith(e, [t, e]);
    });
    if (!t.duration) {
      t.transitionAnimation.finish();
    }
    e.css("transform");
  },
  animate: function (e, t) {
    this._startAnimation(e, t);
    return t.transitionAnimation.deferred.promise();
  },
  _completeAnimationCallback: function (e, t) {
    var n;
    var i = this;
    var o = Date.now() + t.delay;
    var r = new v.Deferred();
    var s = new v.Deferred();
    var l = new v.Deferred();
    var u = (0, p.transitionEndEventName)() + ".dxFX";
    t.transitionAnimation.cleanup = function () {
      clearTimeout(n);
      clearTimeout(d);
      a.default.off(e, u);
      a.default.off(e, C);
    };
    a.default.one(e, u, function () {
      if (Date.now() - o >= t.duration) {
        s.reject();
      }
    });
    a.default.off(e, C);
    a.default.on(e, C, function () {
      i.stop(e, t);
      r.reject();
    });
    var d = setTimeout(function () {
      n = setTimeout(function () {
        l.reject();
      }, t.duration + t.delay + U._simulatedTransitionEndDelay);
      (0, v.when)(s, l).fail(function () {
        r.resolve();
      }.bind(this));
    });
    return r.promise();
  },
  _startAnimation: function (e, t) {
    e.css({
      transitionProperty: "all",
      transitionDelay: t.delay + "ms",
      transitionDuration: t.duration + "ms",
      transitionTimingFunction: t.easing
    });
    if (typeof t.to == "string") {
      e[0].className += " " + t.to;
    } else if (t.to) {
      $(e, t.to);
    }
  },
  _finishTransition: function (e) {
    e.css("transition", "none");
  },
  _cleanup: function (e, t) {
    t.transitionAnimation.cleanup();
    if (typeof t.from == "string") {
      e.removeClass(t.from);
      e.removeClass(t.to);
    }
  },
  stop: function (e, t, n) {
    if (t) {
      if (n) {
        t.transitionAnimation.finish();
      } else {
        if ((0, u.isPlainObject)(t.to)) {
          (0, d.each)(t.to, function (t) {
            e.css(t, e.css(t));
          });
        }
        this._finishTransition(e);
        this._cleanup(e, t);
      }
    }
  }
};
var D = {
  initAnimation: function (e, t) {
    $(e, t.from);
  },
  animate: function (e, t) {
    var n = new v.Deferred();
    var i = this;
    if (t) {
      (0, d.each)(t.to, function (n) {
        if (t.from[n] === undefined) {
          t.from[n] = i._normalizeValue(e.css(n));
        }
      });
      if (t.to.transform) {
        t.from.transform = i._parseTransform(t.from.transform);
        t.to.transform = i._parseTransform(t.to.transform);
      }
      t.frameAnimation = {
        to: t.to,
        from: t.from,
        currentValue: t.from,
        easing: (0, h.convertTransitionTimingFuncToEasing)(t.easing),
        duration: t.duration,
        startTime: new Date().valueOf(),
        finish: function () {
          this.currentValue = this.to;
          this.draw();
          (0, f.cancelAnimationFrame)(t.frameAnimation.animationFrameId);
          n.resolve();
        },
        draw: function () {
          if (t.draw) {
            t.draw(this.currentValue);
          } else {
            var n = (0, l.extend)({}, this.currentValue);
            n.transform &&= (0, d.map)(n.transform, function (e, t) {
              if (t === "translate") {
                return (0, c.getTranslateCss)(e);
              } else if (t === "scale") {
                return "scale(" + e + ")";
              } else if (t.substr(0, t.length - 1) === "rotate") {
                return t + "(" + e + "deg)";
              } else {
                return undefined;
              }
            }).join(" ");
            e.css(n);
          }
        }
      };
      if (t.delay) {
        t.frameAnimation.startTime += t.delay;
        t.frameAnimation.delayTimeout = setTimeout(function () {
          i._startAnimation(e, t);
        }, t.delay);
      } else {
        i._startAnimation(e, t);
      }
      return n.promise();
    } else {
      return n.reject().promise();
    }
  },
  _startAnimation: function (e, t) {
    a.default.off(e, C);
    a.default.on(e, C, function () {
      if (t.frameAnimation) {
        (0, f.cancelAnimationFrame)(t.frameAnimation.animationFrameId);
      }
    });
    this._animationStep(e, t);
  },
  _parseTransform: function (e) {
    var t = {};
    (0, d.each)(e.match(/\w+\d*\w*\([^)]*\)\s*/g), function (e, n) {
      var i = (0, c.parseTranslate)(n);
      var o = n.match(/scale\((.+?)\)/);
      var a = n.match(/(rotate.)\((.+)deg\)/);
      if (i) {
        t.translate = i;
      }
      if (o && o[1]) {
        t.scale = parseFloat(o[1]);
      }
      if (a && a[1]) {
        t[a[1]] = parseFloat(a[2]);
      }
    });
    return t;
  },
  stop: function (e, t, n) {
    var i = t && t.frameAnimation;
    if (i) {
      (0, f.cancelAnimationFrame)(i.animationFrameId);
      clearTimeout(i.delayTimeout);
      if (n) {
        i.finish();
      }
      delete t.frameAnimation;
    }
  },
  _animationStep: function (e, t) {
    var n = t && t.frameAnimation;
    if (n) {
      var i = new Date().valueOf();
      if (i >= n.startTime + n.duration) {
        n.finish();
      } else {
        n.currentValue = this._calcStepValue(n, i - n.startTime);
        n.draw();
        var o = this;
        n.animationFrameId = (0, f.requestAnimationFrame)(function () {
          o._animationStep(e, t);
        });
      }
    }
  },
  _calcStepValue: function (e, t) {
    return function n(i, o) {
      var a = Array.isArray(o) ? [] : {};
      (0, d.each)(o, function (r, s) {
        if (typeof s == "string" && parseFloat(s) === false) {
          return true;
        }
        a[r] = x(s) === "object" ? n(i[r], s) : function (n) {
          var a = t / e.duration;
          var r = t;
          var s = i[n] * 1;
          var l = o[n] - i[n];
          var u = e.duration;
          return (0, h.getEasing)(e.easing)(a, r, s, l, u);
        }(r);
      });
      return a;
    }(e.from, e.to);
  },
  _normalizeValue: function (e) {
    var t = parseFloat(e);
    if (t === false) {
      return e;
    } else {
      return t;
    }
  }
};
var I = {
  initAnimation: function () {},
  animate: function () {
    return new v.Deferred().resolve().promise();
  },
  stop: y.noop,
  isSynchronous: true
};
function T(e, t, n, i) {
  (0, d.each)(["from", "to"], function () {
    if (!n(e[this])) {
      throw r.default.Error("E0010", t, this, i);
    }
  });
}
function E(e, t) {
  return T(e, t, function (e) {
    return (0, u.isPlainObject)(e);
  }, "a plain object");
}
var O = {
  top: {
    my: "bottom center",
    at: "top center"
  },
  bottom: {
    my: "top center",
    at: "bottom center"
  },
  right: {
    my: "left center",
    at: "right center"
  },
  left: {
    my: "right center",
    at: "left center"
  }
};
var A = {
  validateConfig: function (e) {
    E(e, "slide");
  },
  setup: function (e, t) {
    var n = (0, c.locate)(e);
    if (t.type !== "slide") {
      var i = t.type === "slideIn" ? t.from : t.to;
      i.position = (0, l.extend)({
        of: w
      }, O[t.direction]);
      q(e, i);
    }
    this._setUpConfig(n, t.from);
    this._setUpConfig(n, t.to);
    (0, c.clearCache)(e);
  },
  _setUpConfig: function (e, t) {
    t.left = "left" in t ? t.left : "+=0";
    t.top = "top" in t ? t.top : "+=0";
    this._initNewPosition(e, t);
  },
  _initNewPosition: function (e, t) {
    var n = {
      left: t.left,
      top: t.top
    };
    delete t.left;
    delete t.top;
    var i = this._getRelativeValue(n.left);
    if (i !== undefined) {
      n.left = i + e.left;
    } else {
      t.left = 0;
    }
    if ((i = this._getRelativeValue(n.top)) !== undefined) {
      n.top = i + e.top;
    } else {
      t.top = 0;
    }
    t.transform = (0, c.getTranslateCss)({
      x: n.left,
      y: n.top
    });
  },
  _getRelativeValue: function (e) {
    var t;
    if (typeof e == "string" && (t = S.exec(e))) {
      return parseInt(t[1] + "1") * t[2];
    }
  }
};
var P = {
  setup: function (e, t) {
    var o = t.from;
    var a = t.to;
    var r = t.type === "fadeOut" ? 1 : 0;
    var s = t.type === "fadeOut" ? 0 : 1;
    var l = (0, u.isPlainObject)(o) ? String(o.opacity ?? r) : String(o);
    var d = (0, u.isPlainObject)(a) ? String(a.opacity ?? s) : String(a);
    if (!t.skipElementInitialStyles) {
      l = e.css("opacity");
    }
    switch (t.type) {
      case "fadeIn":
        d = 1;
        break;
      case "fadeOut":
        d = 0;
    }
    t.from = {
      visibility: "visible",
      opacity: l
    };
    t.to = {
      opacity: d
    };
  }
};
var M = {
  custom: {
    setup: function () {}
  },
  slide: A,
  slideIn: A,
  slideOut: A,
  fade: P,
  fadeIn: P,
  fadeOut: P,
  pop: {
    validateConfig: function (e) {
      E(e, "pop");
    },
    setup: function (e, t) {
      var n = t.from;
      var i = t.to;
      var o = "opacity" in n ? n.opacity : e.css("opacity");
      var a = "opacity" in i ? i.opacity : 1;
      var r = "scale" in n ? n.scale : 0;
      var s = "scale" in i ? i.scale : 1;
      t.from = {
        opacity: o
      };
      var l = (0, c.getTranslate)(e);
      t.from.transform = this._getCssTransform(l, r);
      t.to = {
        opacity: a
      };
      t.to.transform = this._getCssTransform(l, s);
    },
    _getCssTransform: function (e, t) {
      return (0, c.getTranslateCss)(e) + "scale(" + t + ")";
    }
  },
  css: {
    validateConfig: function (e) {
      (function (e, t) {
        T(e, t, function (e) {
          return typeof e == "string";
        }, "a string");
      })(e, "css");
    },
    setup: function () {}
  }
};
var R = {
  type: "custom",
  from: {},
  to: {},
  duration: 400,
  start: y.noop,
  complete: y.noop,
  easing: "ease",
  delay: 0
};
var B = {
  duration: 400,
  easing: "ease",
  delay: 0
};
function L() {
  var e = this.element;
  var t = this.config;
  q(e, t.from);
  q(e, t.to);
  this.configurator.setup(e, t);
  e.data("dxAnimData", this);
  if (U.off) {
    t.duration = 0;
    t.delay = 0;
  }
  this.strategy.initAnimation(e, t);
  if (t.start) {
    var n = (0, s.getPublicElement)(e);
    t.start.apply(this, [n, t]);
  }
}
function V() {
  var e = this;
  var t = e.element;
  var n = e.config;
  e.isStarted = true;
  return e.strategy.animate(t, n).done(function () {
    (function (e) {
      var t = e.element;
      var n = e.config;
      t.removeData("dxAnimData");
      if (n.complete) {
        var i = (0, s.getPublicElement)(t);
        n.complete.apply(this, [i, n]);
      }
      e.deferred.resolveWith(this, [t, n]);
    })(e);
  }).fail(function () {
    e.deferred.rejectWith(this, [t, n]);
  });
}
function F(e) {
  var t = this.element;
  var n = this.config;
  clearTimeout(this.startTimeout);
  if (!this.isStarted) {
    this.start();
  }
  this.strategy.stop(t, n, e);
}
var H = (0, _.addNamespace)(m.removeEvent, "dxFXStartAnimation");
function N(e, t) {
  var n = t.type === "css" ? B : R;
  var o = (0, l.extend)(true, {}, n, t);
  var s = function (e) {
    var t = M[e.type];
    if (!t) {
      throw r.default.Error("E0011", e.type);
    }
    return t;
  }(o);
  var d = function (e) {
    e = e || {};
    var t = {
      transition: (0, p.transition)() ? k : D,
      frame: D,
      noAnimation: I
    };
    var n = e.strategy || "transition";
    if (e.type === "css" && !(0, p.transition)()) {
      n = "noAnimation";
    }
    return t[n];
  }(o);
  var c = {
    element: (0, i.default)(e),
    config: o,
    configurator: s,
    strategy: d,
    isSynchronous: d.isSynchronous,
    setup: L,
    start: V,
    stop: F,
    deferred: new v.Deferred()
  };
  if ((0, u.isFunction)(s.validateConfig)) {
    s.validateConfig(o);
  }
  (function (e) {
    a.default.off(e.element, H);
    a.default.on(e.element, H, function () {
      U.stop(e.element);
    });
    e.deferred.always(function () {
      a.default.off(e.element, H);
    });
  })(c);
  return c;
}
function z(e) {
  return e.data("dxAnimQueue") || [];
}
function j(e) {
  e.removeData("dxAnimQueue");
}
function W(e) {
  return !!e.data("dxAnimData");
}
function G(e, t) {
  if ((t = z(e)).length) {
    var n = t.shift();
    if (t.length === 0) {
      j(e);
    }
    (function (e) {
      e.setup();
      if (U.off || e.isSynchronous) {
        e.start();
      } else {
        e.startTimeout = setTimeout(function () {
          e.start();
        });
      }
      return e.deferred.promise();
    })(n).done(function () {
      if (!W(e)) {
        G(e);
      }
    });
  }
}
function q(e, t) {
  if (t && t.position) {
    var n = (0, i.default)(w);
    var o = 0;
    var a = 0;
    var r = g.default.calculate(e, t.position);
    var s = e.offset();
    var u = e.position();
    if (u.top > s.top) {
      a = n.scrollTop();
    }
    if (u.left > s.left) {
      o = n.scrollLeft();
    }
    (0, l.extend)(t, {
      left: r.h.location - s.left + u.left - o,
      top: r.v.location - s.top + u.top - a
    });
    delete t.position;
  }
}
function $(e, t) {
  (0, d.each)(t, function (t, n) {
    try {
      e.css(t, (0, u.isFunction)(n) ? n() : n);
    } catch (e) {}
  });
}
var U = {
  off: false,
  animationTypes: M,
  animate: function (e, t) {
    var n = (0, i.default)(e);
    if (!n.length) {
      return new v.Deferred().resolve().promise();
    }
    var o = N(n, t);
    (function (e, t) {
      var n = z(e);
      (function (e, t) {
        e.data("dxAnimQueue", t);
      })(e, n);
      n.push(t);
      if (!W(e)) {
        G(e, n);
      }
    })(n, o);
    return o.deferred.promise();
  },
  createAnimation: N,
  isAnimating: W,
  stop: function (e, t) {
    var n = (0, i.default)(e);
    var o = z(n);
    (0, d.each)(o, function (e, t) {
      t.config.delay = 0;
      t.config.duration = 0;
      t.isSynchronous = true;
    });
    if (!W(n)) {
      G(n, o);
    }
    var a = n.data("dxAnimData");
    if (a) {
      a.stop(t);
    }
    n.removeData("dxAnimData");
    j(n);
  },
  _simulatedTransitionEndDelay: 100
};
var K = U;
exports.default = K;
module.exports = exports.default;
module.exports.default = exports.default;