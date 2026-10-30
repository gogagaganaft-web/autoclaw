exports.swipe = exports.start = exports.end = undefined;
var i = require("./58664.js");
var o = require("./39611.js");
var a = s(require("./98621.js"));
var r = s(require("./82495.js"));
function s(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.start = "dxswipestart";
exports.swipe = "dxswipe";
exports.end = "dxswipeend";
var l = {
  horizontal: {
    defaultItemSizeFunc: function () {
      return (0, i.getWidth)(this.getElement());
    },
    getBounds: function () {
      return [this._maxLeftOffset, this._maxRightOffset];
    },
    calcOffsetRatio: function (e) {
      return ((0, o.eventData)(e).x - (this._savedEventData && this._savedEventData.x || 0)) / this._itemSizeFunc().call(this, e);
    },
    isFastSwipe: function (e) {
      var t = (0, o.eventData)(e);
      return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(t.x - this._tickData.x) >= t.time - this._tickData.time;
    }
  },
  vertical: {
    defaultItemSizeFunc: function () {
      return (0, i.getHeight)(this.getElement());
    },
    getBounds: function () {
      return [this._maxTopOffset, this._maxBottomOffset];
    },
    calcOffsetRatio: function (e) {
      return ((0, o.eventData)(e).y - (this._savedEventData && this._savedEventData.y || 0)) / this._itemSizeFunc().call(this, e);
    },
    isFastSwipe: function (e) {
      var t = (0, o.eventData)(e);
      return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(t.y - this._tickData.y) >= t.time - this._tickData.time;
    }
  }
};
var u = a.default.inherit({
  TICK_INTERVAL: 300,
  FAST_SWIPE_SPEED_LIMIT: 10,
  ctor: function (e) {
    this.callBase(e);
    this.direction = "horizontal";
    this.elastic = true;
  },
  _getStrategy: function () {
    return l[this.direction];
  },
  _defaultItemSizeFunc: function () {
    return this._getStrategy().defaultItemSizeFunc.call(this);
  },
  _itemSizeFunc: function () {
    return this.itemSizeFunc || this._defaultItemSizeFunc;
  },
  _init: function (e) {
    this._tickData = (0, o.eventData)(e);
  },
  _start: function (e) {
    this._savedEventData = (0, o.eventData)(e);
    if (!(e = this._fireEvent("dxswipestart", e)).cancel) {
      this._maxLeftOffset = e.maxLeftOffset;
      this._maxRightOffset = e.maxRightOffset;
      this._maxTopOffset = e.maxTopOffset;
      this._maxBottomOffset = e.maxBottomOffset;
    }
  },
  _move: function (e) {
    var t = this._getStrategy();
    var n = (0, o.eventData)(e);
    var i = t.calcOffsetRatio.call(this, e);
    i = this._fitOffset(i, this.elastic);
    if (n.time - this._tickData.time > this.TICK_INTERVAL) {
      this._tickData = n;
    }
    this._fireEvent("dxswipe", e, {
      offset: i
    });
    if (e.cancelable !== false) {
      e.preventDefault();
    }
  },
  _end: function (e) {
    var t = this._getStrategy();
    var n = t.calcOffsetRatio.call(this, e);
    var i = t.isFastSwipe.call(this, e);
    var o = n;
    var a = this._calcTargetOffset(n, i);
    o = this._fitOffset(o, this.elastic);
    a = this._fitOffset(a, false);
    this._fireEvent("dxswipeend", e, {
      offset: o,
      targetOffset: a
    });
  },
  _fitOffset: function (e, t) {
    var n = this._getStrategy().getBounds.call(this);
    if (e < -n[0]) {
      if (t) {
        return (n[0] * -2 + e) / 3;
      } else {
        return -n[0];
      }
    } else if (e > n[1]) {
      if (t) {
        return (n[1] * 2 + e) / 3;
      } else {
        return n[1];
      }
    } else {
      return e;
    }
  },
  _calcTargetOffset: function (e, t) {
    var n;
    if (t) {
      n = Math.ceil(Math.abs(e));
      if (e < 0) {
        n = -n;
      }
    } else {
      n = Math.round(e);
    }
    return n;
  }
});
(0, r.default)({
  emitter: u,
  events: ["dxswipestart", "dxswipe", "dxswipeend"]
});