exports.default = undefined;
var i = l(require("./55994.js"));
var o = l(require("./47810.js"));
var a = l(require("./73349.js"));
var r = l(require("./38377.js"));
var s = require("./39611.js");
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var u = r.default.inherit({
  ctor: function (e, t) {
    this._eventName = e;
    this._originalEvents = (0, s.addNamespace)(t, "dxPointerEvents");
    this._handlerCount = 0;
    this.noBubble = this._isNoBubble();
  },
  _isNoBubble: function () {
    var e = this._eventName;
    return e === "dxpointerenter" || e === "dxpointerleave";
  },
  _handler: function (e) {
    var t;
    var n = this._getDelegateTarget(e);
    var i = {
      type: this._eventName,
      pointerType: e.pointerType || (0, s.eventSource)(e),
      originalEvent: e,
      delegateTarget: n,
      timeStamp: o.default.mozilla ? new Date().getTime() : e.timeStamp
    };
    var a = e.originalEvent;
    if (a != null && (t = a.target) !== null && t !== undefined && t.shadowRoot) {
      var l;
      var u = a.path ?? ((l = a.composedPath) === null || l === undefined ? undefined : l.call(a));
      i.target = u[0];
    }
    return this._fireEvent(i);
  },
  _getDelegateTarget: function (e) {
    var t;
    if (this.noBubble) {
      t = e.delegateTarget;
    }
    return t;
  },
  _fireEvent: function (e) {
    return (0, s.fireEvent)(e);
  },
  _setSelector: function (e) {
    this._selector = this.noBubble && e ? e.selector : null;
  },
  _getSelector: function () {
    return this._selector;
  },
  setup: function () {
    return true;
  },
  add: function (e, t) {
    if (this._handlerCount <= 0 || this.noBubble) {
      e = this.noBubble ? e : a.default.getDocument();
      this._setSelector(t);
      var n = this;
      i.default.on(e, this._originalEvents, this._getSelector(), function (e) {
        n._handler(e);
      });
    }
    if (!this.noBubble) {
      this._handlerCount++;
    }
  },
  remove: function (e) {
    this._setSelector(e);
    if (!this.noBubble) {
      this._handlerCount--;
    }
  },
  teardown: function (e) {
    if (!this._handlerCount || !!this.noBubble) {
      e = this.noBubble ? e : a.default.getDocument();
      if (this._originalEvents !== ".dxPointerEvents") {
        i.default.off(e, this._originalEvents, this._getSelector());
      }
    }
  },
  dispose: function (e) {
    e = this.noBubble ? e : a.default.getDocument();
    i.default.off(e, this._originalEvents);
  }
});
exports.default = u;
module.exports = exports.default;
module.exports.default = exports.default;