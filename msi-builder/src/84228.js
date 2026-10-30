exports.PopoverPositionController = exports.POPOVER_POSITION_ALIASES = undefined;
var i;
var o = require("./35922.js");
var a = require("./13306.js");
var r = (i = require("./49387.js")) && i.__esModule ? i : {
  default: i
};
var s = require("./20576.js");
var l = require("./19234.js");
var u = require("./58664.js");
var d = require("./49314.js");
var c = ["shading", "target", "$arrow"];
function h() {
  return (h = Object.assign ? Object.assign.bind() : function (e) {
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
function f(e, t) {
  if (e == null) {
    return {};
  }
  var n;
  var i;
  var o = function (e, t) {
    if (e == null) {
      return {};
    }
    var n;
    var i;
    var o = {};
    var a = Object.keys(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        o[n] = e[n];
      }
    }
    return o;
  }(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++) {
      n = a[i];
      if (!(t.indexOf(n) >= 0)) {
        if (Object.prototype.propertyIsEnumerable.call(e, n)) {
          o[n] = e[n];
        }
      }
    }
  }
  return o;
}
function p(e, t) {
  return (p = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var g = {
  left: -1,
  top: -1,
  center: 0,
  right: 1,
  bottom: 1
};
var m = {
  top: {
    my: "bottom center",
    at: "top center",
    collision: "fit flip"
  },
  bottom: {
    my: "top center",
    at: "bottom center",
    collision: "fit flip"
  },
  right: {
    my: "left center",
    at: "right center",
    collision: "flip fit"
  },
  left: {
    my: "right center",
    at: "left center",
    collision: "flip fit"
  }
};
exports.POPOVER_POSITION_ALIASES = m;
var _ = {
  h: 10,
  v: 10
};
var v = function (e) {
  var t;
  var n;
  function i(t) {
    var n;
    var i = t.shading;
    var o = t.target;
    var a = t.$arrow;
    var r = f(t, c);
    (n = e.call(this, r) || this)._props = h({}, n._props, {
      shading: i,
      target: o
    });
    n._$arrow = a;
    n._positionSide = undefined;
    n.updatePosition(n._props.position);
    return n;
  }
  n = e;
  (t = i).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  p(t, n);
  var d = i.prototype;
  d.positionWrapper = function () {
    if (this._props.shading) {
      this._$wrapper.css({
        top: 0,
        left: 0
      });
    }
  };
  d.updateTarget = function (e) {
    this._props.target = e;
    this.updatePosition(this._props.position);
  };
  d._renderBoundaryOffset = function () {};
  d._getContainerPosition = function () {
    var e = (0, s.pairToObject)(this._position.offset || "");
    var t = e.h;
    var n = e.v;
    var i = this._isVerticalSide();
    var o = this._isHorizontalSide();
    if (i || o) {
      var r = (this._isPopoverInside() ? -1 : 1) * g[this._positionSide] * ((i ? (0, u.getHeight)(this._$arrow) : (0, u.getWidth)(this._$arrow)) - this._getContentBorderWidth(this._positionSide));
      if (i) {
        n += r;
      } else {
        t += r;
      }
    }
    return (0, a.extend)({}, this._position, {
      offset: t + " " + n
    });
  };
  d._getContentBorderWidth = function (e) {
    var t = this._$content.css(l.borderWidthStyles[e]);
    return parseInt(t) || 0;
  };
  d._isPopoverInside = function () {
    var e = r.default.setup.normalizeAlign(this._position.my);
    var t = r.default.setup.normalizeAlign(this._position.at);
    return e.h === t.h && e.v === t.v;
  };
  d._isVerticalSide = function (e = this._positionSide) {
    return e === "top" || e === "bottom";
  };
  d._isHorizontalSide = function (e = this._positionSide) {
    return e === "left" || e === "right";
  };
  d._getDisplaySide = function (e) {
    var t = r.default.setup.normalizeAlign(e.my);
    var n = r.default.setup.normalizeAlign(e.at);
    var i = g[t.h] === g[n.h] && g[t.v] === g[n.v] ? -1 : 1;
    if (Math.abs(g[t.h] - i * g[n.h]) > Math.abs(g[t.v] - i * g[n.v])) {
      return n.h;
    } else {
      return n.v;
    }
  };
  d._normalizePosition = function (e) {
    var t;
    var n = {
      of: this._props.target,
      boundaryOffset: _
    };
    t = (0, o.isDefined)(e) ? (0, a.extend)(true, {}, n, this._positionToObject(e)) : n;
    this._positionSide = this._getDisplaySide(t);
    return t;
  };
  d._positionToObject = function (e) {
    if ((0, o.isString)(e)) {
      return (0, a.extend)({}, m[e]);
    } else {
      return e;
    }
  };
  return i;
}(d.OverlayPositionController);
exports.PopoverPositionController = v;