exports.Tracker = w;
var i = u(require("./55994.js"));
var o = u(require("./93786.js"));
var a = require("./58201.js");
var r = u(require("./73349.js"));
var s = require("./95479.js");
var l = require("./60137.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function d(e) {
  return (d = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
function c(e, t, n) {
  if ((t = function (e) {
    var t = function (e, t) {
      if (d(e) !== "object" || e === null) {
        return e;
      }
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var i = n.call(e, t || "default");
        if (d(i) !== "object") {
          return i;
        }
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (t === "string" ? String : Number)(e);
    }(e, "string");
    if (d(t) === "symbol") {
      return t;
    } else {
      return String(t);
    }
  }(t)) in e) {
    Object.defineProperty(e, t, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    e[t] = n;
  }
  return e;
}
var h = (0, a.getWindow)();
function f(e) {
  var t = e || h.event;
  var n = t.originalEvent;
  var i = t.touches;
  var o = !!n && n.pointerType;
  var a = !!n && n.touches;
  var r = n && o !== undefined && (o === (n.MSPOINTER_TYPE_TOUCH || "touch") || o === (n.MSPOINTER_TYPE_MOUSE || "mouse") && n.buttons === 1);
  var s = i && i.length > 0 || a && a.length > 0;
  return t.which === 1 || r || s;
}
function p(e) {
  var t = e.originalEvent;
  var n = e.touches;
  var i = t && t.touches;
  return n && n.length > 1 || i && i.length > 1 || null;
}
function g(e) {
  if (!p(e)) {
    e.preventDefault();
  }
}
function m(e) {
  if (!p(e)) {
    e.stopPropagation();
    e.preventDefault();
  }
}
function _(e) {
  return e && e.type && e.type.indexOf("touch") === 0;
}
function v(e) {
  var t = e.originalEvent;
  var n = 0;
  if (e.pageX) {
    n = e.pageX;
  } else if (t && t.pageX) {
    n = t.pageX;
  }
  if (t && t.touches) {
    if (t.touches.length > 0) {
      n = t.touches[0].pageX;
    } else if (t.changedTouches.length > 0) {
      n = t.changedTouches[0].pageX;
    }
  }
  return n;
}
function y(e, t, n, i) {
  var a;
  var r;
  var s;
  var l = false;
  var u = null;
  c(a = {}, o.default.move, function (t) {
    var o;
    var a;
    if (r === _(t)) {
      if (!f(t)) {
        h(t);
      }
      if (l) {
        o = v(t);
        a = i();
        if (u) {
          u(o - a, t);
        } else if (n.manualRangeSelectionEnabled && Math.abs(s - o) >= 10) {
          u = e.placeSliderAndBeginMoving(s - a, o - a, t);
        }
      }
    }
  });
  c(a, o.default.up, function (t) {
    var o;
    if (l) {
      o = v(t);
      if (!u && n.moveSelectedRangeByClick && Math.abs(s - o) < 10) {
        e.moveSelectedArea(o - i(), t);
      }
      h(t);
    }
  });
  var d = a;
  function h(e) {
    if (l) {
      l = false;
      if (u) {
        u.complete(e);
        u = null;
      }
    }
  }
  t.on(o.default.down, function (e) {
    if (n.enabled && f(e) && !l) {
      l = true;
      r = _(e);
      s = v(e);
    }
  });
  return d;
}
function b(e, t, n, i) {
  var a;
  var r;
  var s = false;
  var l = null;
  c(a = {}, o.default.move, function (e) {
    if (r === _(e)) {
      if (!f(e)) {
        d(e);
      }
      if (s) {
        g(e);
        l(v(e) - i(), e);
      }
    }
  });
  c(a, o.default.up, d);
  var u = a;
  function d(e) {
    if (s) {
      s = false;
      l.complete(e);
      l = null;
    }
  }
  t.on(o.default.down, function (t) {
    if (n.enabled && f(t) && !s) {
      s = true;
      r = _(t);
      l = e.beginSelectedAreaMoving(v(t) - i());
      m(t);
    }
  });
  return u;
}
function x(e, t, n, i) {
  var a;
  var r;
  var l = false;
  var u = null;
  c(a = {}, o.default.move, function (e) {
    if (r === _(e)) {
      if (!f(e)) {
        h(e);
      }
      if (l) {
        g(e);
        u(v(e) - i(), e);
      }
    }
  });
  c(a, o.default.up, h);
  var d = a;
  function h(e) {
    if (l) {
      l = false;
      u.complete(e);
      u = null;
    }
  }
  (0, s.each)(t, function (t, a) {
    var s;
    a.on((c(s = {}, o.default.down, function (o) {
      if (n.enabled && f(o) && !l) {
        l = true;
        r = _(o);
        u = e.beginSliderMoving(t, v(o) - i());
        m(o);
      }
    }), c(s, o.default.move, function () {
      if (!u) {
        e.foregroundSlider(t);
      }
    }), s));
  });
  return d;
}
function w(e) {
  var t = this._state = {};
  var n = e.controller.getTrackerTargets();
  function o() {
    return e.renderer.getRootOffset().left;
  }
  if (l.pointerEvents) {
    e.renderer.root.css({
      msTouchAction: "pinch-zoom"
    });
  }
  this._docEvents = [b(e.controller, n.selectedArea, t, o), y(e.controller, n.area, t, o), x(e.controller, n.sliders, t, o)];
  (0, s.each)(this._docEvents, function (e, t) {
    i.default.on(r.default.getDocument(), t);
  });
}
w.prototype = {
  constructor: w,
  dispose: function () {
    (0, s.each)(this._docEvents, function (e, t) {
      i.default.off(r.default.getDocument(), t);
    });
  },
  update: function (e, t) {
    var n = this._state;
    n.enabled = e;
    n.moveSelectedRangeByClick = t.moveSelectedRangeByClick;
    n.manualRangeSelectionEnabled = t.manualRangeSelectionEnabled;
  }
};