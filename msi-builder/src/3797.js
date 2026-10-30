exports.GestureHandler = o;
var n = Math.log;
var i = Math.LN2;
function o(e) {
  this._projection = e.projection;
  this._renderer = e.renderer;
  this._x = this._y = 0;
  this._subscribeToTracker(e.tracker);
}
o.prototype = {
  constructor: o,
  dispose: function () {
    this._offTracker();
    this._offTracker = null;
  },
  _subscribeToTracker: function (e) {
    var t = this;
    var n = false;
    t._offTracker = e.on({
      start: function (e) {
        if (n = e.data.name !== "control-bar") {
          t._processStart(e);
        }
      },
      move: function (e) {
        if (n) {
          t._processMove(e);
        }
      },
      end: function () {
        if (n) {
          t._processEnd();
        }
      },
      zoom: function (e) {
        t._processZoom(e);
      }
    });
  },
  setInteraction: function (e) {
    this._processEnd();
    this._centeringEnabled = e.centeringEnabled;
    this._zoomingEnabled = e.zoomingEnabled;
  },
  _processStart: function (e) {
    if (this._centeringEnabled) {
      this._x = e.x;
      this._y = e.y;
      this._projection.beginMoveCenter();
    }
  },
  _processMove: function (e) {
    if (this._centeringEnabled) {
      this._renderer.root.attr({
        cursor: "move"
      });
      this._projection.moveCenter([this._x - e.x, this._y - e.y]);
      this._x = e.x;
      this._y = e.y;
    }
  },
  _processEnd: function () {
    if (this._centeringEnabled) {
      this._renderer.root.attr({
        cursor: "default"
      });
      this._projection.endMoveCenter();
    }
  },
  _processZoom: function (e) {
    var t;
    var o;
    var a;
    if (this._zoomingEnabled) {
      if (e.delta) {
        t = e.delta;
      } else if (e.ratio) {
        t = n(e.ratio) / i;
      }
      if (this._centeringEnabled) {
        o = this._renderer.getRootOffset();
        o = [e.x - o.left, e.y - o.top];
        a = this._projection.fromScreenPoint(o);
      }
      this._projection.changeScaledZoom(t);
      if (this._centeringEnabled) {
        this._projection.setCenterByPoint(a, o);
      }
    }
  }
};