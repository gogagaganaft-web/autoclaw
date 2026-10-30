exports.name = undefined;
var i = d(require("./55994.js"));
var o = require("./3532.js");
var a = d(require("./73349.js"));
var r = d(require("./38377.js"));
var s = d(require("./85788.js"));
var l = require("./95429.js");
var u = require("./39611.js");
function d(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
exports.name = "dxdblclick";
var c = (0, u.addNamespace)(l.name, "dxDblClick");
var h = r.default.inherit({
  ctor: function () {
    this._handlerCount = 0;
    this._forgetLastClick();
  },
  _forgetLastClick: function () {
    this._firstClickTarget = null;
    this._lastClickTimeStamp = -300;
  },
  add: function () {
    if (this._handlerCount <= 0) {
      i.default.on(a.default.getDocument(), c, this._clickHandler.bind(this));
    }
    this._handlerCount++;
  },
  _clickHandler: function (e) {
    var t = e.timeStamp || Date.now();
    var n = t - this._lastClickTimeStamp;
    if (!(n < 0) && n < 300) {
      (0, u.fireEvent)({
        type: "dxdblclick",
        target: (0, o.closestCommonParent)(this._firstClickTarget, e.target),
        originalEvent: e
      });
      this._forgetLastClick();
    } else {
      this._firstClickTarget = e.target;
      this._lastClickTimeStamp = t;
    }
  },
  remove: function () {
    this._handlerCount--;
    if (this._handlerCount <= 0) {
      this._forgetLastClick();
      i.default.off(a.default.getDocument(), c);
    }
  }
});
(0, s.default)("dxdblclick", new h());