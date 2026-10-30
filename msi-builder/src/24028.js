exports.start = exports.end = undefined;
var i = d(require("./55994.js"));
var o = require("./97906.js");
var a = d(require("./38377.js"));
var r = d(require("./20530.js"));
var s = d(require("./85788.js"));
var l = require("./39611.js");
var u = d(require("./93786.js"));
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.start = "dxhoverstart";
var c = (0, l.addNamespace)(u.default.enter, "dxHoverStart");
exports.end = "dxhoverend";
var h = (0, l.addNamespace)(u.default.leave, "dxHoverEnd");
var f = a.default.inherit({
  noBubble: true,
  ctor: function () {
    this._handlerArrayKeyPath = this._eventNamespace + "_HandlerStore";
  },
  setup: function (e) {
    (0, o.data)(e, this._handlerArrayKeyPath, {});
  },
  add: function (e, t) {
    var n = this;
    function a(e) {
      n._handler(e);
    }
    i.default.on(e, this._originalEventName, t.selector, a);
    (0, o.data)(e, this._handlerArrayKeyPath)[t.guid] = a;
  },
  _handler: function (e) {
    if (!(0, l.isTouchEvent)(e) && !r.default.isSimulator()) {
      (0, l.fireEvent)({
        type: this._eventName,
        originalEvent: e,
        delegateTarget: e.delegateTarget
      });
    }
  },
  remove: function (e, t) {
    var n = (0, o.data)(e, this._handlerArrayKeyPath)[t.guid];
    i.default.off(e, this._originalEventName, t.selector, n);
  },
  teardown: function (e) {
    (0, o.removeData)(e, this._handlerArrayKeyPath);
  }
});
var p = f.inherit({
  ctor: function () {
    this._eventNamespace = "dxHoverStart";
    this._eventName = "dxhoverstart";
    this._originalEventName = c;
    this.callBase();
  },
  _handler: function (e) {
    if (!(e.pointers || []).length) {
      this.callBase(e);
    }
  }
});
var g = f.inherit({
  ctor: function () {
    this._eventNamespace = "dxHoverEnd";
    this._eventName = "dxhoverend";
    this._originalEventName = h;
    this.callBase();
  }
});
(0, s.default)("dxhoverstart", new p());
(0, s.default)("dxhoverend", new g());