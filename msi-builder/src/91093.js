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
exports.zoomstart = exports.zoomend = exports.zoom = exports.translatestart = exports.translateend = exports.translate = exports.transformstart = exports.transformend = exports.transform = exports.rotatestart = exports.rotateend = exports.rotate = exports.pinchstart = exports.pinchend = exports.pinch = undefined;
var o = require("./60810.js");
var a = function (e, t) {
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
}(require("./95479.js"));
var r = require("./39611.js");
var s = u(require("./31391.js"));
var l = u(require("./82495.js"));
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
var c = "start";
var h = "";
var f = "end";
var p = [];
function g(e, t) {
  p.push({
    name: e,
    args: t
  });
}
g("transform", {
  scale: true,
  deltaScale: true,
  rotation: true,
  deltaRotation: true,
  translation: true,
  deltaTranslation: true
});
g("translate", {
  translation: true,
  deltaTranslation: true
});
g("pinch", {
  scale: true,
  deltaScale: true
});
g("rotate", {
  rotation: true,
  deltaRotation: true
});
function m(e) {
  var t;
  var n;
  var i = e.pointers;
  t = i[0];
  return {
    x: (n = i[1]).pageX - t.pageX,
    y: -n.pageY + t.pageY,
    centerX: (n.pageX + t.pageX) * 0.5,
    centerY: (n.pageY + t.pageY) * 0.5
  };
}
function _(e) {
  return Math.sqrt(e.x * e.x + e.y * e.y);
}
function v(e, t) {
  return _(e) / _(t);
}
function y(e, t) {
  var n = e.x * t.x + e.y * t.y;
  var i = _(e) * _(t);
  if (i === 0) {
    return 0;
  } else {
    return (0, o.sign)(e.x * t.y - t.x * e.y) * Math.acos((0, o.fitIntoRange)(n / i, -1, 1));
  }
}
function b(e, t) {
  return {
    x: e.centerX - t.centerX,
    y: e.centerY - t.centerY
  };
}
var x = s.default.inherit({
  validatePointers: function (e) {
    return (0, r.hasTouches)(e) > 1;
  },
  start: function (e) {
    this._accept(e);
    var t = m(e);
    this._startVector = t;
    this._prevVector = t;
    this._fireEventAliases(c, e);
  },
  move: function (e) {
    var t = m(e);
    var n = this._getEventArgs(t);
    this._fireEventAliases(h, e, n);
    this._prevVector = t;
  },
  end: function (e) {
    var t = this._getEventArgs(this._prevVector);
    this._fireEventAliases(f, e, t);
  },
  _getEventArgs: function (e) {
    return {
      scale: v(e, this._startVector),
      deltaScale: v(e, this._prevVector),
      rotation: y(e, this._startVector),
      deltaRotation: y(e, this._prevVector),
      translation: b(e, this._startVector),
      deltaTranslation: b(e, this._prevVector)
    };
  },
  _fireEventAliases: function (e, t, n) {
    n = n || {};
    a.each(p, function (i, o) {
      var r = {};
      a.each(o.args, function (e) {
        if (e in n) {
          r[e] = n[e];
        }
      });
      this._fireEvent("dx" + o.name + e, t, r);
    }.bind(this));
  }
});
var w = p.reduce(function (e, t) {
  [c, h, f].forEach(function (n) {
    e.push("dx" + t.name + n);
  });
  return e;
}, []);
(0, l.default)({
  emitter: x,
  events: w
});
var C = {};
a.each(w, function (e, t) {
  C[t.substring("dx".length)] = t;
});
var S = C.transformstart;
var k = C.transform;
var D = C.transformend;
var I = C.translatestart;
var T = C.translate;
var E = C.translateend;
var O = C.zoomstart;
var A = C.zoom;
var P = C.zoomend;
var M = C.pinchstart;
var R = C.pinch;
var B = C.pinchend;
var L = C.rotatestart;
var V = C.rotate;
var F = C.rotateend;
exports.rotateend = F;
exports.rotate = V;
exports.rotatestart = L;
exports.pinchend = B;
exports.pinch = R;
exports.pinchstart = M;
exports.zoomend = P;
exports.zoom = A;
exports.zoomstart = O;
exports.translateend = E;
exports.translate = T;
exports.translatestart = I;
exports.transformend = D;
exports.transform = k;
exports.transformstart = S;