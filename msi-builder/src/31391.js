exports.default = undefined;
var i = u(require("./68374.js"));
var o = require("./20576.js");
var a = u(require("./38377.js"));
var r = u(require("./44504.js"));
var s = require("./13306.js");
var l = require("./39611.js");
function u(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var d = a.default.inherit({
  ctor: function (e) {
    this._$element = (0, i.default)(e);
    this._cancelCallback = (0, r.default)();
    this._acceptCallback = (0, r.default)();
  },
  getElement: function () {
    return this._$element;
  },
  validate: function (e) {
    return !(0, l.isDxMouseWheelEvent)(e);
  },
  validatePointers: function (e) {
    return (0, l.hasTouches)(e) === 1;
  },
  allowInterruptionByMouseWheel: function () {
    return true;
  },
  configure: function (e) {
    (0, s.extend)(this, e);
  },
  addCancelCallback: function (e) {
    this._cancelCallback.add(e);
  },
  removeCancelCallback: function () {
    this._cancelCallback.empty();
  },
  _cancel: function (e) {
    this._cancelCallback.fire(this, e);
  },
  addAcceptCallback: function (e) {
    this._acceptCallback.add(e);
  },
  removeAcceptCallback: function () {
    this._acceptCallback.empty();
  },
  _accept: function (e) {
    this._acceptCallback.fire(this, e);
  },
  _requestAccept: function (e) {
    this._acceptRequestEvent = e;
  },
  _forgetAccept: function () {
    this._accept(this._acceptRequestEvent);
    this._acceptRequestEvent = null;
  },
  start: o.noop,
  move: o.noop,
  end: o.noop,
  cancel: o.noop,
  reset: function () {
    if (this._acceptRequestEvent) {
      this._accept(this._acceptRequestEvent);
    }
  },
  _fireEvent: function (e, t, n) {
    var i = (0, s.extend)({
      type: e,
      originalEvent: t,
      target: this._getEmitterTarget(t),
      delegateTarget: this.getElement().get(0)
    }, n);
    if ((t = (0, l.fireEvent)(i)).cancel) {
      this._cancel(t);
    }
    return t;
  },
  _getEmitterTarget: function (e) {
    return (this.delegateSelector ? (0, i.default)(e.target).closest(this.delegateSelector) : this.getElement()).get(0);
  },
  dispose: o.noop
});
exports.default = d;
module.exports = exports.default;
module.exports.default = exports.default;