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
exports.start = exports.move = exports.leave = exports.enter = exports.end = exports.drop = undefined;
var o = p(require("./68374.js"));
var a = require("./97906.js");
var r = require("./89386.js");
var s = function (e, t) {
  if (!t && e && e.__esModule) {
    return e;
  }
  if (e === null || i(e) !== "object" && typeof e != "function") {
    return {
      default: e
    };
  }
  var n = f(t);
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
var l = require("./3532.js");
var u = p(require("./85788.js"));
var d = require("./39611.js");
var c = p(require("./98621.js"));
var h = p(require("./82495.js"));
function f(e) {
  if (typeof WeakMap != "function") {
    return null;
  }
  var t = new WeakMap();
  var n = new WeakMap();
  return (f = function (e) {
    if (e) {
      return n;
    } else {
      return t;
    }
  })(e);
}
function p(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.start = "dxdragstart";
exports.move = "dxdrag";
exports.end = "dxdragend";
var g = "dxdragenter";
exports.enter = g;
var m = "dxdragleave";
exports.leave = m;
var _ = "dxdrop";
exports.drop = _;
var v = [];
var y = [];
var b = [];
var x = {
  setup: function (e, t) {
    if (!v.includes(e)) {
      v.push(e);
      y.push([]);
      b.push(t || {});
    }
  },
  add: function (e, t) {
    var n = v.indexOf(e);
    this.updateEventsCounter(e, t.type, 1);
    var i = t.selector;
    if (!y[n].includes(i)) {
      y[n].push(i);
    }
  },
  updateEventsCounter: function (e, t, n) {
    if ([g, m, _].indexOf(t) > -1) {
      var i = (0, a.data)(e, "dxDragEventsCount") || 0;
      (0, a.data)(e, "dxDragEventsCount", Math.max(0, i + n));
    }
  },
  remove: function (e, t) {
    this.updateEventsCounter(e, t.type, -1);
  },
  teardown: function (e) {
    if (!(0, a.data)(e, "dxDragEventsCount")) {
      var t = v.indexOf(e);
      v.splice(t, 1);
      y.splice(t, 1);
      b.splice(t, 1);
      (0, a.removeData)(e, "dxDragEventsCount");
    }
  }
};
(0, u.default)(g, x);
(0, u.default)(m, x);
(0, u.default)(_, x);
var w = c.default.inherit({
  ctor: function (e) {
    this.callBase(e);
    this.direction = "both";
  },
  _init: function (e) {
    this._initEvent = e;
  },
  _start: function (e) {
    e = this._fireEvent("dxdragstart", this._initEvent);
    this._maxLeftOffset = e.maxLeftOffset;
    this._maxRightOffset = e.maxRightOffset;
    this._maxTopOffset = e.maxTopOffset;
    this._maxBottomOffset = e.maxBottomOffset;
    if (e.targetElements || e.targetElements === null) {
      var t = (0, r.wrapToArray)(e.targetElements || []);
      this._dropTargets = s.map(t, function (e) {
        return (0, o.default)(e).get(0);
      });
    } else {
      this._dropTargets = v;
    }
  },
  _move: function (e) {
    var t = (0, d.eventData)(e);
    var n = this._calculateOffset(t);
    e = this._fireEvent("dxdrag", e, {
      offset: n
    });
    this._processDropTargets(e);
    if (!e._cancelPreventDefault) {
      e.preventDefault();
    }
  },
  _calculateOffset: function (e) {
    return {
      x: this._calculateXOffset(e),
      y: this._calculateYOffset(e)
    };
  },
  _calculateXOffset: function (e) {
    if (this.direction !== "vertical") {
      var t = e.x - this._startEventData.x;
      return this._fitOffset(t, this._maxLeftOffset, this._maxRightOffset);
    }
    return 0;
  },
  _calculateYOffset: function (e) {
    if (this.direction !== "horizontal") {
      var t = e.y - this._startEventData.y;
      return this._fitOffset(t, this._maxTopOffset, this._maxBottomOffset);
    }
    return 0;
  },
  _fitOffset: function (e, t, n) {
    if (t != null) {
      e = Math.max(e, -t);
    }
    if (n != null) {
      e = Math.min(e, n);
    }
    return e;
  },
  _processDropTargets: function (e) {
    var t = this._findDropTarget(e);
    if (t !== this._currentDropTarget) {
      this._fireDropTargetEvent(e, m);
      this._currentDropTarget = t;
      this._fireDropTargetEvent(e, g);
    }
  },
  _fireDropTargetEvent: function (e, t) {
    if (this._currentDropTarget) {
      var n = {
        type: t,
        originalEvent: e,
        draggingElement: this._$element.get(0),
        target: this._currentDropTarget
      };
      (0, d.fireEvent)(n);
    }
  },
  _findDropTarget: function (e) {
    var t;
    var n = this;
    s.each(v, function (i, a) {
      if (n._checkDropTargetActive(a)) {
        var r;
        var l;
        var u;
        var d;
        var c = (0, o.default)(a);
        s.each((r = c, l = v.indexOf(r.get(0)), u = y[l].filter(function (e) {
          return e;
        }), d = r.find(u.join(", ")), y[l].includes(undefined) && (d = d.add(r)), d), function (i, a) {
          var r = (0, o.default)(a);
          if (n._checkDropTarget(function (e) {
            var t = v.indexOf(e.get(0));
            return b[t];
          }(c), r, (0, o.default)(t), e)) {
            t = a;
          }
        });
      }
    });
    return t;
  },
  _checkDropTargetActive: function (e) {
    var t = false;
    s.each(this._dropTargets, function (n, i) {
      return !(t = t || i === e || (0, l.contains)(i, e));
    });
    return t;
  },
  _checkDropTarget: function (e, t, n, i) {
    if (t.get(0) === (0, o.default)(i.target).get(0)) {
      return false;
    }
    var a;
    var r;
    r = t;
    var s = (a = e).itemPositionFunc ? a.itemPositionFunc(r) : r.offset();
    if (i.pageX < s.left) {
      return false;
    }
    if (i.pageY < s.top) {
      return false;
    }
    var l = function (e, t) {
      if (e.itemSizeFunc) {
        return e.itemSizeFunc(t);
      } else {
        return {
          width: t.get(0).getBoundingClientRect().width,
          height: t.get(0).getBoundingClientRect().height
        };
      }
    }(e, t);
    return !(i.pageX > s.left + l.width) && !(i.pageY > s.top + l.height) && (!n.length || !n.closest(t).length) && (!e.checkDropTarget || !!e.checkDropTarget(t, i)) && t;
  },
  _end: function (e) {
    var t = (0, d.eventData)(e);
    this._fireEvent("dxdragend", e, {
      offset: this._calculateOffset(t)
    });
    this._fireDropTargetEvent(e, _);
    delete this._currentDropTarget;
  }
});
(0, h.default)({
  emitter: w,
  events: ["dxdragstart", "dxdrag", "dxdragend"]
});