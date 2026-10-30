function i(e) {
  return (i = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (e) {
    return typeof e;
  } : function (e) {
    if (e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype) {
      return "symbol";
    } else {
      return typeof e;
    }
  })(e);
}
exports.default = undefined;
var o = require("./35922.js");
var a = require("./13306.js");
var r = require("./19157.js");
var s = require("./765.js");
var l = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = d(t);
  if (n && n.has(e)) {
    return n.get(e);
  }
  var o = {};
  var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var r in e) {
    if (r !== "default" && Object.prototype.hasOwnProperty.call(e, r)) {
      var s = a ? Object.getOwnPropertyDescriptor(e, r) : null;
      if (s && (s.get || s.set)) {
        Object.defineProperty(o, r, s);
      } else {
        o[r] = e[r];
      }
    }
  }
  o.default = e;
  if (n) {
    n.set(e, o);
  }
  return o;
}(require("./91093.js"));
var u = require("./23174.js");
function d(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (d = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function c() {
  return (c = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) {
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          e[i] = n[i];
        }
      }
    }
    return e;
  }).apply(this, arguments);
}
var h = ".zoomAndPanNS";
var f = u.start + h;
var p = u.move + h;
var g = u.end + h;
var m = l.pinchstart + h;
var _ = l.pinch + h;
var v = l.pinchend + h;
var y = Math.min;
var b = Math.max;
var x = Math.abs;
function w(e) {
  return {
    x: e.left,
    y: e.top,
    width: e.width - e.left - e.right,
    height: e.height - e.top - e.bottom
  };
}
function C(e, t) {
  var n = t.x;
  var i = t.y;
  return n >= e.x && n <= e.width + e.x && i >= e.y && i <= e.height + e.y;
}
function S(e) {
  return e.filter(function (e) {
    return !e.getTranslator().getBusinessRange().isEmpty();
  });
}
function k(e) {
  return e.some(function (e) {
    return !e.isExtremePosition(false) || !e.isExtremePosition(true);
  });
}
function D(e, t, n, i, o, a, r) {
  var s = t && e !== t;
  var l = n(e);
  var u = e.checkZoomingLowerLimitOvercome(o, a, l);
  var d = u.stopInteraction;
  var c = u.correctedRange;
  var h = e.handleZooming(d ? null : c, i(s), r, o);
  if (d) {
    e.handleZoomEnd();
  }
  return {
    stopInteraction: d,
    result: h
  };
}
function I(e, t, n, i, o, a) {
  t = function (e, t) {
    if (t) {
      e = e.sort(function (e, n) {
        if (e === t) {
          return -1;
        } else if (n === t) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return e;
  }(t, a);
  var r = false;
  function s(e) {
    return {
      start: !!e,
      end: !!e
    };
  }
  S(t).some(function (t) {
    var l = t.getTranslator();
    var u = l.getMinScale(i);
    var d = D(t, a, n(c({
      scale: u,
      translator: l,
      axis: t
    }, o)), s, "zoom", u, e);
    var h = d.stopInteraction;
    var f = d.result;
    r = !h;
    return a && f.isPrevented;
  });
  return r;
}
function T(e) {
  if (e.originalEvent) {
    T(e.originalEvent);
  }
  if (e.cancelable !== false) {
    e.cancel = true;
  }
}
var E = {
  name: "zoom_and_pan",
  init: function () {
    var e = this;
    var t = this._renderer;
    function n(t, n) {
      var i = [];
      var o = t.options;
      var a = t.actionData;
      if (o.argumentAxis[n]) {
        i.push(e.getArgumentAxis());
      }
      if (o.valueAxis[n]) {
        i = i.concat(a.valueAxes);
      }
      return i;
    }
    function i(e, t, i) {
      if (S(n(e, t)).some(function (e) {
        return e.handleZooming(null, {
          end: true
        }, i, t).isPrevented;
      })) {
        T(i);
      }
    }
    function l(t, n, i, s, l) {
      function u(e, t, i, l, u) {
        var d = {
          zoomed: false
        };
        if (t) {
          S(e).forEach(function (e) {
            var t = e.getOptions();
            var c = e.visualRange();
            var h = e.getTranslator().getEventScale(l);
            var f = -s(l, u, i, h);
            d = (0, a.extend)(true, d, e.getTranslator().zoom(f, h, e.getZoomBounds()));
            var p = e.adjustRange((0, r.getVizRangeObject)([d.min, d.max]));
            var g = e.checkZoomingLowerLimitOvercome(n, h, p);
            var m = g.stopInteraction;
            var _ = g.correctedRange;
            if ((0, o.isDefined)(c) && c.startValue.valueOf() === _.startValue.valueOf() && c.endValue.valueOf() === _.endValue.valueOf()) {
              if (l.pointerType === "touch" && t.type === "discrete") {
                var v = e.isExtremePosition(false);
                var y = e.isExtremePosition(true);
                var b = h > 1 && !m;
                var x = h < 1 && (!v || !y);
                var w = h === 1 && (!v || (!(f < 0) || !!t.inverted) && (!(f > 0) || !t.inverted)) && (!y || (!(f > 0) || !!t.inverted) && (!(f < 0) || !t.inverted));
                d.enabled = b || x || w;
              }
            } else {
              e.handleZooming(m ? null : _, {
                start: true,
                end: true
              }, l, n);
              if (!m) {
                d.zoomed = true;
                d.deltaTranslate = f - d.translate;
              }
            }
          });
        }
        return d;
      }
      function d(e, t, n, i) {
        if (n.zoomed) {
          t.offset[i] = (e.offset ? e.offset[i] : t.offset[i]) + n.deltaTranslate;
        }
      }
      function c(e, t, n, i) {
        if (n.zoomed) {
          t.center[i] = e[i] + n.deltaTranslate;
        }
      }
      var h = e.option("rotated");
      var f = t.actionData;
      var p = t.options;
      var g = {};
      var m = {};
      if (!f.fallback) {
        g = u(e._argumentAxes, p.argumentAxis[n], h ? "y" : "x", i, f);
        m = u(f.valueAxes, p.valueAxis[n], h ? "x" : "y", i, f);
        e._requestChange(["VISUAL_RANGE"]);
        d(i, f, g, h ? "y" : "x");
        d(i, f, m, h ? "x" : "y");
      }
      var _ = l(i);
      c(_, f, g, h ? "y" : "x");
      c(_, f, m, h ? "x" : "y");
      if (!g.zoomed && !m.zoomed) {
        f.center = _;
      }
      return g.zoomed || m.zoomed || f.fallback || g.enabled || m.enabled;
    }
    function u(t, i, o, a) {
      function r(e, t, n, r) {
        var s = false;
        var l = o.scale || 1;
        function u(e) {
          var i = e.getTranslator().zoom(-a(o, n, t, l), l, e.getZoomBounds());
          return {
            startValue: i.min,
            endValue: i.max
          };
        }
        function d(e) {
          return {
            start: true,
            end: e
          };
        }
        S(e).forEach(function (e) {
          s = !D(e, r, u, d, i, l, o).stopInteraction;
        });
        return s;
      }
      var s = e.option("rotated");
      var l = t.actionData;
      var u = t.options;
      var d = true;
      if (l.fallback) {
        d &= u.argumentAxis[i] && r(e._argumentAxes, s ? "y" : "x", l, e.getArgumentAxis());
        d |= u.valueAxis[i] && r(l.valueAxes, s ? "x" : "y", l);
      } else {
        var c = n(t, i);
        S(c).forEach(function (e) {
          e.handleZooming(null, {
            start: true
          }, o, i);
        });
        d = c.length;
      }
      if (d) {
        e._requestChange(["VISUAL_RANGE"]);
      }
    }
    function d(t, n) {
      var i = e._argumentAxes.filter(function (e) {
        return C(w(e.getCanvas()), t);
      });
      return {
        fallback: e._lastRenderingTime > 300,
        cancel: !i.length || !(0, o.isDefined)(n),
        action: n,
        curAxisRect: i.length && w(i[0].getCanvas()),
        valueAxes: i.length && e._valueAxes.filter(function (e) {
          return C(w(e.getCanvas()), t);
        }),
        offset: {
          x: 0,
          y: 0
        },
        center: t,
        startCenter: t
      };
    }
    function c(e, n) {
      var i = t.getRootOffset();
      return {
        x: y(b(n.pageX - i.left, e.x), e.width + e.x),
        y: y(b(n.pageY - i.top, e.y), e.height + e.y)
      };
    }
    function E(e) {
      var n = t.getRootOffset();
      var i = e.pointers[0].pageX;
      var o = e.pointers[1].pageX;
      var a = e.pointers[0].pageY;
      var r = e.pointers[1].pageY;
      return {
        x: y(i, o) + x(o - i) / 2 - n.left,
        y: y(a, r) + x(r - a) / 2 - n.top
      };
    }
    function O(e) {
      var n = t.getRootOffset();
      return {
        x: e.pageX - n.left,
        y: e.pageY - n.top
      };
    }
    function A(e, t, n) {
      return e.offset[n] - t.offset[n];
    }
    function P(t) {
      if (t.cancelable !== false) {
        t.preventDefault();
        t.stopPropagation();
      }
      e._stopCurrentHandling();
    }
    var M = {
      dragStartHandler: function (e) {
        var n;
        var a = M.options;
        var s = e.pointerType === "touch";
        var l = a.argumentAxis.pan || a.valueAxis.pan;
        var u = a.argumentAxis.zoom || a.valueAxis.zoom;
        var h = (0, o.isDefined)(a.panKey) && e[(0, r.normalizeEnum)(a.panKey) + "Key"];
        var f = a.dragToZoom;
        e._cancelPreventDefault = true;
        if (s) {
          if (a.allowTouchGestures && l) {
            n = !M.panningVisualRangeEnabled() || M.skipEvent ? null : "pan";
          }
        } else if (f && l && h || !f && l) {
          n = "pan";
        } else if (f && u) {
          n = "zoom";
        }
        var p = d(O(e), n);
        if (p.cancel) {
          M.skipEvent = false;
          if (e.cancelable !== false) {
            e.cancel = true;
          }
          return;
        }
        M.actionData = p;
        if (n === "zoom") {
          p.startCoords = c(p.curAxisRect, e);
          p.rect = t.rect(0, 0, 0, 0).attr(a.dragBoxStyle).append(t.root);
        } else {
          i(M, "pan", e);
        }
      },
      dragHandler: function (t) {
        var n = e.option("rotated");
        var i = M.options;
        var o = M.actionData;
        var a = t.pointerType === "touch";
        t._cancelPreventDefault = true;
        if (o && (!a || M.panningVisualRangeEnabled())) {
          if (o.action === "zoom") {
            P(t);
            var r = o.curAxisRect;
            var s = o.startCoords;
            var u = c(r, t);
            var d = i.argumentAxis.zoom;
            var h = i.valueAxis.zoom;
            var f = {
              x: y(s.x, u.x),
              y: y(s.y, u.y),
              width: x(s.x - u.x),
              height: x(s.y - u.y)
            };
            if (!d || !h) {
              if (!d && !n || !h && n) {
                f.x = r.x;
                f.width = r.width;
              } else {
                f.y = r.y;
                f.height = r.height;
              }
            }
            o.rect.attr(f);
          } else if (o.action === "pan") {
            l(M, "pan", t, A, function (e) {
              return e.offset;
            });
            var p = Math.abs(t.offset.y - o.offset.y);
            var g = Math.abs(t.offset.x - o.offset.x);
            if (a && (p > 5 && p > Math.abs(o.offset.x) || g > 5 && g > Math.abs(o.offset.y))) {
              return;
            }
            P(t);
          }
        }
      },
      dragEndHandler: function (t) {
        var n = e.option("rotated");
        var i = M.options;
        var o = M.actionData;
        var a = t.pointerType === "touch";
        function r(e) {
          var t = e.translator;
          var n = e.startCoord;
          var i = e.curCoord;
          return function () {
            return [t.from(n), t.from(i)];
          };
        }
        function s(e, t, n) {
          return {
            curCoord: e[n],
            startCoord: t[n]
          };
        }
        function l(e, t) {
          return e.zoom && x(t.curCoord - t.startCoord) > 5;
        }
        var d = o && o.action === "pan" && !o.fallback && o.offset.x === 0 && o.offset.y === 0;
        if (o && (!a || M.panningVisualRangeEnabled()) && !d) {
          if (!a) {
            P(t);
          }
          if (o.action === "zoom") {
            var h = c(o.curAxisRect, t);
            var f = s(h, o.startCoords, n ? "y" : "x");
            var p = s(h, o.startCoords, n ? "x" : "y");
            var g = l(i.argumentAxis, f) && I(t, e._argumentAxes, r, true, f, e.getArgumentAxis());
            if (l(i.valueAxis, p) && I(t, o.valueAxes, r, true, p) || g) {
              e._requestChange(["VISUAL_RANGE"]);
            }
            o.rect.dispose();
          } else if (o.action === "pan") {
            u(M, "pan", t, A);
          }
          M.actionData = null;
        }
      },
      pinchStartHandler: function (e) {
        var t = d(E(e), "zoom");
        if (t.cancel) {
          T(e);
        } else {
          M.actionData = t;
          i(M, "zoom", e);
        }
      },
      pinchHandler: function (e) {
        if (M.actionData) {
          l(M, "zoom", e, function (e, t, n, i) {
            return E(e)[n] - t.center[n] + (t.center[n] - t.center[n] * i);
          }, E);
          P(e);
        }
      },
      pinchEndHandler: function (e) {
        if (M.actionData) {
          u(M, "zoom", e, function (e, t, n, i) {
            return t.center[n] - t.startCenter[n] + (t.startCenter[n] - t.startCenter[n] * i);
          });
          M.actionData = null;
        }
      },
      mouseWheelHandler: function (t) {
        var n;
        var i = M.options;
        var o = e.option("rotated");
        function a(e) {
          var t = e.translator;
          var n = e.coord;
          var i = e.scale;
          var o = e.axis;
          return function () {
            var e = t.zoom(-(n - n * i), i, o.getZoomBounds());
            return {
              startValue: e.min,
              endValue: e.max
            };
          };
        }
        var r = O(t);
        var s = false;
        if (i.valueAxis.zoom) {
          if ((n = e._valueAxes.filter(function (e) {
            return C(w(e.getCanvas()), r);
          })).length === 0) {
            var l = e._valueAxes.reduce(function (e, t) {
              if (!e && t.coordsIn(r.x, r.y)) {
                e = t.getCanvas();
              }
              return e;
            }, null);
            if (l) {
              n = e._valueAxes.filter(function (e) {
                return C(w(e.getCanvas()), {
                  x: l.left,
                  y: l.top
                });
              });
            }
          }
          s |= I(t, n, a, t.delta > 0, {
            coord: o ? r.x : r.y
          });
        }
        if (i.argumentAxis.zoom) {
          s |= e._argumentAxes.some(function (e) {
            return !!C(w(e.getCanvas()), r) || !!e.coordsIn(r.x, r.y);
          }) && I(t, e._argumentAxes, a, t.delta > 0, {
            coord: o ? r.y : r.x
          }, e.getArgumentAxis());
        }
        if (s) {
          e._requestChange(["VISUAL_RANGE"]);
          if (n && k(n) || !n && M.panningVisualRangeEnabled()) {
            P(t);
          }
        }
      },
      cleanup: function () {
        t.root.off(h);
        if (M.actionData && M.actionData.rect) {
          M.actionData.rect.dispose();
        }
        M.actionData = null;
        t.root.css({
          "touch-action": "",
          "-ms-touch-action": ""
        });
      },
      setup: function (e) {
        M.cleanup();
        if (!e.argumentAxis.pan) {
          t.root.on("dxc-scroll-start.zoomAndPanNS", T);
        }
        if (!e.argumentAxis.none || !e.valueAxis.none) {
          M.options = e;
          if ((e.argumentAxis.zoom || e.valueAxis.zoom) && e.allowMouseWheel) {
            t.root.on(s.name + h, M.mouseWheelHandler);
          }
          if ((e.argumentAxis.zoom || e.valueAxis.zoom) && e.allowTouchGestures) {
            t.root.on(m, {
              passive: false
            }, M.pinchStartHandler).on(_, {
              passive: false
            }, M.pinchHandler).on(v, M.pinchEndHandler);
          }
          t.root.on(f, {
            immediate: true,
            passive: false
          }, M.dragStartHandler).on(p, {
            immediate: true,
            passive: false
          }, M.dragHandler).on(g, M.dragEndHandler);
          t.root.on("dxc-scroll-start.zoomAndPanNS", function (e) {
            M.actionData = {
              valueAxes: [],
              offset: {
                x: 0,
                y: 0
              },
              center: {
                x: 0,
                y: 0
              }
            };
            P(e);
            i(M, "pan", e);
          }).on("dxc-scroll-move.zoomAndPanNS", function (e) {
            P(e);
            l(M, "pan", e, A, function (e) {
              return e.offset;
            });
          }).on("dxc-scroll-end.zoomAndPanNS", function (e) {
            P(e);
            u(M, "pan", e, A);
            M.actionData = null;
          });
        }
      },
      panningVisualRangeEnabled: function () {
        return k(e._valueAxes) || k(e._argumentAxes);
      }
    };
    this._zoomAndPan = M;
  },
  members: {
    _setupZoomAndPan: function () {
      this._zoomAndPan.setup(this._themeManager.getOptions("zoomAndPan"));
    }
  },
  dispose: function () {
    this._zoomAndPan.cleanup();
  },
  customize: function (e) {
    e.addChange({
      code: "ZOOM_AND_PAN",
      handler: function () {
        this._setupZoomAndPan();
      },
      isThemeDependent: true,
      isOptionChange: true,
      option: "zoomAndPan"
    });
  }
};
exports.default = E;
module.exports = exports.default;
module.exports.default = exports.default;