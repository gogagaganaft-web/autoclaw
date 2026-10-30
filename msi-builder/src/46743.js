exports.default = undefined;
var i = require("./58664.js");
var o = require("./31648.js");
var a = v(require("./99393.js"));
var r = v(require("./13046.js"));
var s = v(require("./68374.js"));
var l = require("./20576.js");
var u = require("./13306.js");
var d = require("./95479.js");
var c = require("./60810.js");
var h = require("./35922.js");
var f = require("./58201.js");
var p = v(require("./55994.js"));
var g = require("./23174.js");
var m = require("./39611.js");
var _ = require("./80506.js");
function v(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function y() {
  return (y = Object.assign ? Object.assign.bind() : function (e) {
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
var b = (0, m.addNamespace)(g.start, "dxResizable");
var x = (0, m.addNamespace)(g.move, "dxResizable");
var w = (0, m.addNamespace)(g.end, "dxResizable");
var C = {
  left: "borderLeftWidth",
  top: "borderTopWidth",
  right: "borderRightWidth",
  bottom: "borderBottomWidth"
};
var S = r.default.inherit({
  _getDefaultOptions: function () {
    return (0, u.extend)(this.callBase(), {
      handles: "all",
      step: "1",
      stepPrecision: "simple",
      area: undefined,
      minWidth: 30,
      maxWidth: Infinity,
      minHeight: 30,
      maxHeight: Infinity,
      onResizeStart: null,
      onResize: null,
      onResizeEnd: null,
      roundStepValue: true,
      keepAspectRatio: true
    });
  },
  _init: function () {
    this.callBase();
    this.$element().addClass("dx-resizable");
  },
  _initMarkup: function () {
    this.callBase();
    this._renderHandles();
  },
  _render: function () {
    this.callBase();
    this._renderActions();
  },
  _renderActions: function () {
    this._resizeStartAction = this._createActionByOption("onResizeStart");
    this._resizeEndAction = this._createActionByOption("onResizeEnd");
    this._resizeAction = this._createActionByOption("onResize");
  },
  _renderHandles: function () {
    var e = this;
    this._handles = [];
    var t = this.option("handles");
    if (t !== "none" && t) {
      var n = t === "all" ? ["top", "bottom", "left", "right"] : t.split(" ");
      var i = {};
      (0, d.each)(n, function (t, n) {
        i[n] = true;
        e._renderHandle(n);
      });
      if (i.bottom && i.right) {
        this._renderHandle("corner-bottom-right");
      }
      if (i.bottom && i.left) {
        this._renderHandle("corner-bottom-left");
      }
      if (i.top && i.right) {
        this._renderHandle("corner-top-right");
      }
      if (i.top && i.left) {
        this._renderHandle("corner-top-left");
      }
      this._attachEventHandlers();
    }
  },
  _renderHandle: function (e) {
    var t = (0, s.default)("<div>").addClass("dx-resizable-handle").addClass("dx-resizable-handle-" + e).appendTo(this.$element());
    this._handles.push(t);
  },
  _attachEventHandlers: function () {
    if (!this.option("disabled")) {
      var e = {};
      e[b] = this._dragStartHandler.bind(this);
      e[x] = this._dragHandler.bind(this);
      e[w] = this._dragEndHandler.bind(this);
      this._handles.forEach(function (t) {
        p.default.on(t, e, {
          direction: "both",
          immediate: true
        });
      });
    }
  },
  _detachEventHandlers: function () {
    this._handles.forEach(function (e) {
      p.default.off(e);
    });
  },
  _toggleEventHandlers: function (e) {
    if (e) {
      this._attachEventHandlers();
    } else {
      this._detachEventHandlers();
    }
  },
  _getElementSize: function () {
    var e = this.$element();
    if (e.css("boxSizing") === "border-box") {
      return {
        width: (0, i.getOuterWidth)(e),
        height: (0, i.getOuterHeight)(e)
      };
    } else {
      return {
        width: (0, i.getWidth)(e),
        height: (0, i.getHeight)(e)
      };
    }
  },
  _dragStartHandler: function (e) {
    var t = this.$element();
    if (t.is(".dx-state-disabled, .dx-state-disabled *")) {
      e.cancel = true;
    } else {
      this._toggleResizingClass(true);
      this._movingSides = this._getMovingSides(e);
      this._elementLocation = (0, o.locate)(t);
      this._elementSize = this._getElementSize();
      this._renderDragOffsets(e);
      this._resizeStartAction({
        event: e,
        width: this._elementSize.width,
        height: this._elementSize.height,
        handles: this._movingSides
      });
      e.targetElements = null;
    }
  },
  _toggleResizingClass: function (e) {
    this.$element().toggleClass("dx-resizable-resizing", e);
  },
  _renderDragOffsets: function (e) {
    var t = this._getArea();
    if (t) {
      var n = (0, s.default)(e.target).closest(".dx-resizable-handle");
      var o = (0, i.getOuterWidth)(n);
      var a = (0, i.getOuterHeight)(n);
      var r = n.offset();
      var l = t.offset;
      var u = this._getAreaScrollOffset();
      e.maxLeftOffset = this._leftMaxOffset = r.left - l.left - u.scrollX;
      e.maxRightOffset = this._rightMaxOffset = l.left + t.width - r.left - o + u.scrollX;
      e.maxTopOffset = this._topMaxOffset = r.top - l.top - u.scrollY;
      e.maxBottomOffset = this._bottomMaxOffset = l.top + t.height - r.top - a + u.scrollY;
    }
  },
  _getBorderWidth: function (e, t) {
    if ((0, h.isWindow)(e.get(0))) {
      return 0;
    }
    var n = e.css(C[t]);
    return parseInt(n) || 0;
  },
  _proportionate: function (e, t) {
    var n = this._elementSize;
    return t * (e === "x" ? n.width / n.height : n.height / n.width);
  },
  _getProportionalDelta: function (e) {
    var t = e.x;
    var n = e.y;
    var i = this._proportionate("y", t);
    if (i >= n) {
      return {
        x: t,
        y: i
      };
    }
    var o = this._proportionate("x", n);
    if (o >= t) {
      return {
        x: o,
        y: n
      };
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  _getDirectionName: function (e) {
    var t = this._movingSides;
    if (e === "x") {
      if (t.left) {
        return "left";
      } else {
        return "right";
      }
    } else if (t.top) {
      return "top";
    } else {
      return "bottom";
    }
  },
  _fitIntoArea: function (e, t) {
    var i = this._getDirectionName(e);
    return Math.min(t, this[`_${i}MaxOffset`] ?? Infinity);
  },
  _fitDeltaProportionally: function (e) {
    var t = this;
    var n = y({}, e);
    var i = this._elementSize;
    var o = this.option();
    var a = o.minWidth;
    var r = o.minHeight;
    var s = o.maxWidth;
    var l = o.maxHeight;
    function u() {
      return i.width + n.x;
    }
    function d() {
      return i.height + n.y;
    }
    function h(e) {
      return n[e] === t._fitIntoArea(e, n[e]);
    }
    function f() {
      return (0, c.inRange)(u(), a, s) && h("x");
    }
    function p() {
      return (0, c.inRange)(d(), r, l) && h("y");
    }
    if (!f()) {
      var g = this._fitIntoArea("x", (0, c.fitIntoRange)(u(), a, s) - i.width);
      n = {
        x: g,
        y: this._proportionate("y", g)
      };
    }
    if (!p()) {
      var m = this._fitIntoArea("y", (0, c.fitIntoRange)(d(), r, l) - i.height);
      n = {
        x: this._proportionate("x", m),
        y: m
      };
    }
    if (f() && p()) {
      return n;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  _fitDelta: function (e) {
    var t = e.x;
    var n = e.y;
    var i = this._elementSize;
    var o = this.option();
    var a = o.minWidth;
    var r = o.minHeight;
    var s = o.maxWidth;
    var l = o.maxHeight;
    return {
      x: (0, c.fitIntoRange)(i.width + t, a, s) - i.width,
      y: (0, c.fitIntoRange)(i.height + n, r, l) - i.height
    };
  },
  _getDeltaByOffset: function (e) {
    var t = this._movingSides;
    var n = this._isCornerHandler(t) && this.option("keepAspectRatio");
    var i = {
      x: e.x * (t.left ? -1 : 1),
      y: e.y * (t.top ? -1 : 1)
    };
    if (n) {
      var o = this._getProportionalDelta(i);
      i = this._fitDeltaProportionally(o);
    } else {
      var a = this._fitDelta(i);
      i = this._roundByStep(a);
    }
    return i;
  },
  _updatePosition: function (e, t) {
    var n = t.width;
    var i = t.height;
    var a = this._elementLocation;
    var r = this._movingSides;
    var s = this.$element();
    var l = this._getElementSize();
    var u = e.y * (r.top ? -1 : 1) - ((l.height || i) - i);
    var d = e.x * (r.left ? -1 : 1) - ((l.width || n) - n);
    (0, o.move)(s, {
      top: a.top + (r.top ? u : 0),
      left: a.left + (r.left ? d : 0)
    });
  },
  _dragHandler: function (e) {
    var t = this._getOffset(e);
    var n = this._getDeltaByOffset(t);
    var i = this._updateDimensions(n);
    this._updatePosition(n, i);
    this._triggerResizeAction(e, i);
  },
  _updateDimensions: function (e) {
    function t(e) {
      return e.substring(e.length - 2) === "px";
    }
    var n = this.option("stepPrecision") === "strict";
    var i = this._elementSize;
    var o = i.width + e.x;
    var a = i.height + e.y;
    var r = this.$element().get(0).style;
    var s = e.x || n || t(r.width);
    var l = e.y || n || t(r.height);
    if (s) {
      this.option({
        width: o
      });
    }
    if (l) {
      this.option({
        height: a
      });
    }
    return {
      width: s ? o : i.width,
      height: l ? a : i.height
    };
  },
  _triggerResizeAction: function (e, t) {
    var n = t.width;
    var i = t.height;
    this._resizeAction({
      event: e,
      width: this.option("width") || n,
      height: this.option("height") || i,
      handles: this._movingSides
    });
    (0, _.triggerResizeEvent)(this.$element());
  },
  _isCornerHandler: function (e) {
    return Object.values(e).reduce(function (e, t) {
      return e ^ t;
    }, 0) === 0;
  },
  _getOffset: function (e) {
    var t = e.offset;
    var n = this._movingSides;
    if (!n.left && !n.right) {
      t.x = 0;
    }
    if (!n.top && !n.bottom) {
      t.y = 0;
    }
    return t;
  },
  _roundByStep: function (e) {
    if (this.option("stepPrecision") === "strict") {
      return this._roundStrict(e);
    } else {
      return this._roundNotStrict(e);
    }
  },
  _getSteps: function () {
    return (0, l.pairToObject)(this.option("step"), !this.option("roundStepValue"));
  },
  _roundNotStrict: function (e) {
    var t = this._getSteps();
    return {
      x: e.x - e.x % t.h,
      y: e.y - e.y % t.v
    };
  },
  _roundStrict: function (e) {
    var t = this._movingSides;
    var n = {
      x: e.x * (t.left ? -1 : 1),
      y: e.y * (t.top ? -1 : 1)
    };
    var i = this._getSteps();
    var o = this._elementLocation;
    var a = this._elementSize;
    var r = t.left ? o.left : o.left + a.width;
    var s = t.top ? o.top : o.top + a.height;
    var l = (r + n.x) % i.h;
    var u = (s + n.y) % i.v;
    var d = Math.sign || function (e) {
      if ((e = +e) === 0 || isNaN(e)) {
        return e;
      } else if (e > 0) {
        return 1;
      } else {
        return -1;
      }
    };
    function c(e, t) {
      return (1 + d(t) * 0.2) % 1 * e;
    }
    function h(e, t) {
      return Math.abs(e) < t * 0.2;
    }
    var f = n.x - l;
    var p = n.y - u;
    if (l > c(i.h, n.x)) {
      f += i.h;
    }
    if (u > c(i.v, n.y)) {
      p += i.v;
    }
    var g = !t.left && !t.right || h(n.x, i.h) ? 0 : f;
    var m = !t.top && !t.bottom || h(n.y, i.v) ? 0 : p;
    return {
      x: g * (t.left ? -1 : 1),
      y: m * (t.top ? -1 : 1)
    };
  },
  _getMovingSides: function (e) {
    var t = (0, s.default)(e.target);
    var n = t.hasClass("dx-resizable-handle-corner-top-left");
    var i = t.hasClass("dx-resizable-handle-corner-top-right");
    var o = t.hasClass("dx-resizable-handle-corner-bottom-left");
    var a = t.hasClass("dx-resizable-handle-corner-bottom-right");
    return {
      top: t.hasClass("dx-resizable-handle-top") || n || i,
      left: t.hasClass("dx-resizable-handle-left") || n || o,
      bottom: t.hasClass("dx-resizable-handle-bottom") || o || a,
      right: t.hasClass("dx-resizable-handle-right") || i || a
    };
  },
  _getArea: function () {
    var e = this.option("area");
    if ((0, h.isFunction)(e)) {
      e = e.call(this);
    }
    if ((0, h.isPlainObject)(e)) {
      return this._getAreaFromObject(e);
    } else {
      return this._getAreaFromElement(e);
    }
  },
  _getAreaScrollOffset: function () {
    var e = this.option("area");
    var t = {
      scrollY: 0,
      scrollX: 0
    };
    if (!(0, h.isFunction)(e) && !(0, h.isPlainObject)(e)) {
      var n = (0, s.default)(e)[0];
      if ((0, h.isWindow)(n)) {
        t.scrollX = n.pageXOffset;
        t.scrollY = n.pageYOffset;
      }
    }
    return t;
  },
  _getAreaFromObject: function (e) {
    var t = {
      width: e.right - e.left,
      height: e.bottom - e.top,
      offset: {
        left: e.left,
        top: e.top
      }
    };
    this._correctAreaGeometry(t);
    return t;
  },
  _getAreaFromElement: function (e) {
    var t;
    var n = (0, s.default)(e);
    if (n.length) {
      t = {
        width: (0, i.getInnerWidth)(n),
        height: (0, i.getInnerHeight)(n),
        offset: (0, u.extend)({
          top: 0,
          left: 0
        }, (0, h.isWindow)(n[0]) ? {} : n.offset())
      };
      this._correctAreaGeometry(t, n);
    }
    return t;
  },
  _correctAreaGeometry: function (e, t) {
    var n = t ? this._getBorderWidth(t, "left") : 0;
    var o = t ? this._getBorderWidth(t, "top") : 0;
    e.offset.left += n + this._getBorderWidth(this.$element(), "left");
    e.offset.top += o + this._getBorderWidth(this.$element(), "top");
    e.width -= (0, i.getOuterWidth)(this.$element()) - (0, i.getInnerWidth)(this.$element());
    e.height -= (0, i.getOuterHeight)(this.$element()) - (0, i.getInnerHeight)(this.$element());
  },
  _dragEndHandler: function (e) {
    var t = this.$element();
    this._resizeEndAction({
      event: e,
      width: (0, i.getOuterWidth)(t),
      height: (0, i.getOuterHeight)(t),
      handles: this._movingSides
    });
    this._toggleResizingClass(false);
  },
  _renderWidth: function (e) {
    this.option("width", (0, c.fitIntoRange)(e, this.option("minWidth"), this.option("maxWidth")));
  },
  _renderHeight: function (e) {
    this.option("height", (0, c.fitIntoRange)(e, this.option("minHeight"), this.option("maxHeight")));
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "disabled":
        this._toggleEventHandlers(!e.value);
        this.callBase(e);
        break;
      case "handles":
        this._invalidate();
        break;
      case "minWidth":
      case "maxWidth":
        if ((0, f.hasWindow)()) {
          this._renderWidth((0, i.getOuterWidth)(this.$element()));
        }
        break;
      case "minHeight":
      case "maxHeight":
        if ((0, f.hasWindow)()) {
          this._renderHeight((0, i.getOuterHeight)(this.$element()));
        }
        break;
      case "onResize":
      case "onResizeStart":
      case "onResizeEnd":
        this._renderActions();
        break;
      case "area":
      case "stepPrecision":
      case "step":
      case "roundStepValue":
      case "keepAspectRatio":
        break;
      default:
        this.callBase(e);
    }
  },
  _clean: function () {
    this.$element().find(".dx-resizable-handle").remove();
  },
  _useTemplates: function () {
    return false;
  }
});
(0, a.default)("dxResizable", S);
var k = S;
exports.default = k;
module.exports = exports.default;
module.exports.default = exports.default;