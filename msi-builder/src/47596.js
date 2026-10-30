exports.default = undefined;
var i = l(require("./68374.js"));
var o = l(require("./14390.js"));
var a = l(require("./55994.js"));
var r = require("./39611.js");
var s = l(require("./93786.js"));
function l(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
function u(e, t) {
  return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
    e.__proto__ = t;
    return e;
  })(e, t);
}
var d = (0, r.addNamespace)(s.default.up, "dxDiagramPanel");
var c = function (e) {
  var t;
  var n;
  function o() {
    return e.apply(this, arguments) || this;
  }
  n = e;
  (t = o).prototype = Object.create(n.prototype);
  t.prototype.constructor = t;
  u(t, n);
  var r = o.prototype;
  r._init = function () {
    e.prototype._init.call(this);
    this._createOnPointerUpAction();
  };
  r._render = function () {
    e.prototype._render.call(this);
    this._attachPointerUpEvent();
  };
  r._getPointerUpElements = function () {
    return [this.$element()];
  };
  r._attachPointerUpEvent = function () {
    var e = this;
    this._getPointerUpElements().forEach(function (t) {
      a.default.off(t, d);
      a.default.on(t, d, function (t) {
        if (!(0, i.default)(t.target).closest(".dx-textbox").length) {
          e._onPointerUpAction();
        }
      });
    });
  };
  r._createOnPointerUpAction = function () {
    this._onPointerUpAction = this._createActionByOption("onPointerUp");
  };
  r._optionChanged = function (t) {
    switch (t.name) {
      case "onPointerUp":
        this._createOnPointerUpAction();
        break;
      default:
        e.prototype._optionChanged.call(this, t);
    }
  };
  return o;
}(o.default);
exports.default = c;
module.exports = exports.default;
module.exports.default = exports.default;