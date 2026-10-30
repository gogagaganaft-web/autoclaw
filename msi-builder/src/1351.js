exports.default = undefined;
var i = require("./31648.js");
var o = c(require("./73349.js"));
var a = require("./58664.js");
var r = require("./60810.js");
var s = require("./35922.js");
var l = c(require("./55994.js"));
var u = require("./23174.js");
var d = require("./39611.js");
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var h = function () {
  function e(e) {
    this.init(e);
  }
  var t = e.prototype;
  t.init = function (e) {
    var t = e.dragEnabled;
    var n = e.handle;
    var i = e.draggableElement;
    var o = e.positionController;
    this._positionController = o;
    this._draggableElement = i;
    this._handle = n;
    this._dragEnabled = t;
    this.unsubscribe();
    if (t) {
      this.subscribe();
    }
  };
  t.moveDown = function (e) {
    this._moveTo(5, 0, e);
  };
  t.moveUp = function (e) {
    this._moveTo(-5, 0, e);
  };
  t.moveLeft = function (e) {
    this._moveTo(0, -5, e);
  };
  t.moveRight = function (e) {
    this._moveTo(0, 5, e);
  };
  t.subscribe = function () {
    var e = this;
    var t = this._getEventNames();
    l.default.on(this._handle, t.startEventName, function (t) {
      e._dragStartHandler(t);
    });
    l.default.on(this._handle, t.updateEventName, function (t) {
      e._dragUpdateHandler(t);
    });
    l.default.on(this._handle, t.endEventName, function (t) {
      e._dragEndHandler(t);
    });
  };
  t.unsubscribe = function () {
    var e = this._getEventNames();
    l.default.off(this._handle, e.startEventName);
    l.default.off(this._handle, e.updateEventName);
    l.default.off(this._handle, e.endEventName);
  };
  t._getEventNames = function () {
    return {
      startEventName: (0, d.addNamespace)(u.start, "overlayDrag"),
      updateEventName: (0, d.addNamespace)(u.move, "overlayDrag"),
      endEventName: (0, d.addNamespace)(u.end, "overlayDrag")
    };
  };
  t._dragStartHandler = function (e) {
    var t = this._getAllowedOffsets();
    this._prevOffset = {
      x: 0,
      y: 0
    };
    e.targetElements = [];
    e.maxTopOffset = t.top;
    e.maxBottomOffset = t.bottom;
    e.maxLeftOffset = t.left;
    e.maxRightOffset = t.right;
  };
  t._dragUpdateHandler = function (e) {
    var t = {
      top: e.offset.y - this._prevOffset.y,
      left: e.offset.x - this._prevOffset.x
    };
    this._moveByOffset(t);
    this._prevOffset = e.offset;
  };
  t._dragEndHandler = function (e) {
    this._positionController.dragHandled();
    this._positionController.detectVisualPositionChange(e);
  };
  t._moveTo = function (e, t, n) {
    if (this._dragEnabled) {
      n.preventDefault();
      n.stopPropagation();
      var i = this._fitOffsetIntoAllowedRange(e, t);
      this._moveByOffset(i);
      this._dragEndHandler(n);
    }
  };
  t._fitOffsetIntoAllowedRange = function (e, t) {
    var n = this._getAllowedOffsets();
    return {
      top: (0, r.fitIntoRange)(e, -n.top, n.bottom),
      left: (0, r.fitIntoRange)(t, -n.left, n.right)
    };
  };
  t._getContainerDimensions = function () {
    var e = o.default.getDocument();
    var t = this._positionController.$dragResizeContainer.get(0);
    var n = (0, a.getOuterWidth)(t);
    var i = (0, a.getOuterHeight)(t);
    if ((0, s.isWindow)(t)) {
      i = Math.max(e.body.clientHeight, i);
      n = Math.max(e.body.clientWidth, n);
    }
    return {
      width: n,
      height: i
    };
  };
  t._getContainerPosition = function () {
    var e = this._positionController.$dragResizeContainer.get(0);
    if ((0, s.isWindow)(e)) {
      return {
        top: 0,
        left: 0
      };
    } else {
      return (0, a.getOffset)(e);
    }
  };
  t._getElementPosition = function () {
    return (0, a.getOffset)(this._draggableElement);
  };
  t._getInnerDelta = function () {
    var e = this._getContainerDimensions();
    var t = this._getElementDimensions();
    return {
      x: e.width - t.width,
      y: e.height - t.height
    };
  };
  t._getOuterDelta = function () {
    var e = this._getElementDimensions();
    var t = e.width;
    var n = e.height;
    var i = this._positionController.outsideDragFactor;
    return {
      x: t * i,
      y: n * i
    };
  };
  t._getFullDelta = function () {
    var e = this._getInnerDelta();
    var t = this._getOuterDelta();
    return {
      x: e.x + t.x,
      y: e.y + t.y
    };
  };
  t._getElementDimensions = function () {
    return {
      width: this._draggableElement.offsetWidth,
      height: this._draggableElement.offsetHeight
    };
  };
  t._getAllowedOffsets = function () {
    var e = this._getFullDelta();
    if (!(e.y >= 0) || !(e.x >= 0)) {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
    }
    var t = this._getElementPosition();
    var n = this._getContainerPosition();
    var i = this._getOuterDelta();
    return {
      top: t.top - n.top + i.y,
      bottom: -t.top + n.top + e.y,
      left: t.left - n.left + i.x,
      right: -t.left + n.left + e.x
    };
  };
  t._moveByOffset = function (e) {
    var t = (0, i.locate)(this._draggableElement);
    var n = {
      left: t.left + e.left,
      top: t.top + e.top
    };
    (0, i.move)(this._draggableElement, n);
  };
  return e;
}();
exports.default = h;
module.exports = exports.default;
module.exports.default = exports.default;