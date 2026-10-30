exports.lock = exports.inactive = exports.active = undefined;
var i = c(require("./38377.js"));
var o = require("./20576.js");
var a = require("./3532.js");
var r = c(require("./20530.js"));
var s = require("./39611.js");
var l = c(require("./93786.js"));
var u = c(require("./31391.js"));
var d = c(require("./82495.js"));
function c(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.active = "dxactive";
exports.inactive = "dxinactive";
var h;
var f = i.default.inherit({
  ctor: function (e, t) {
    this._timeout = e;
    this._fire = t;
  },
  start: function () {
    var e = this;
    this._schedule(function () {
      e.force();
    });
  },
  _schedule: function (e) {
    this.stop();
    this._timer = setTimeout(e, this._timeout);
  },
  stop: function () {
    clearTimeout(this._timer);
  },
  force: function () {
    if (!this._fired) {
      this.stop();
      this._fire();
      this._fired = true;
    }
  },
  fired: function () {
    return this._fired;
  }
});
var p = u.default.inherit({
  ctor: function () {
    this.callBase.apply(this, arguments);
    this._active = new f(0, o.noop);
    this._inactive = new f(0, o.noop);
  },
  configure: function (e, t) {
    switch (t) {
      case "dxactive":
        e.activeTimeout = e.timeout;
        break;
      case "dxinactive":
        e.inactiveTimeout = e.timeout;
    }
    this.callBase(e);
  },
  start: function (e) {
    if (h) {
      var t = (0, a.contains)(this.getElement().get(0), h.getElement().get(0));
      var n = !h._active.fired();
      if (t && n) {
        this._cancel();
        return;
      }
      h._inactive.force();
    }
    h = this;
    this._initEvents(e);
    this._active.start();
  },
  _initEvents: function (e) {
    var t = this;
    var n = this._getEmitterTarget(e);
    var i = (0, s.isMouseEvent)(e);
    var a = r.default.isSimulator() || !i;
    var l = (0, o.ensureDefined)(this.activeTimeout, 30);
    var u = (0, o.ensureDefined)(this.inactiveTimeout, 400);
    this._active = new f(a ? l : 0, function () {
      t._fireEvent("dxactive", e, {
        target: n
      });
    });
    this._inactive = new f(a ? u : 0, function () {
      t._fireEvent("dxinactive", e, {
        target: n
      });
      h = null;
    });
  },
  cancel: function (e) {
    this.end(e);
  },
  end: function (e) {
    var t = e.type !== l.default.up;
    if (t) {
      this._active.stop();
    } else {
      this._active.force();
    }
    this._inactive.start();
    if (t) {
      this._inactive.force();
    }
  },
  dispose: function () {
    this._active.stop();
    this._inactive.stop();
    if (h === this) {
      h = null;
    }
    this.callBase();
  },
  lockInactive: function () {
    this._active.force();
    this._inactive.stop();
    h = null;
    this._cancel();
    return this._inactive.force.bind(this._inactive);
  }
});
p.lock = function (e) {
  var t = h ? h.lockInactive() : o.noop;
  e.done(t);
};
(0, d.default)({
  emitter: p,
  events: ["dxactive", "dxinactive"]
});
var g = p.lock;
exports.lock = g;