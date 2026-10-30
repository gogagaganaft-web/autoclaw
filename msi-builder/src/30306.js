exports.default = undefined;
var i = f(require("./68374.js"));
var o = f(require("./73349.js"));
var a = f(require("./55994.js"));
var r = f(require("./14390.js"));
var s = require("./13306.js");
var l = require("./39611.js");
var u = f(require("./93786.js"));
var d = require("./91633.js");
var c = f(require("./11699.js"));
var h = require("./62754.js");
function f(e) {
  if (e && e.__esModule) {
    return e;
  } else {
    return {
      default: e
    };
  }
}
var p = (0, l.addNamespace)(u.default.up, "dxNumberBox");
var g = (0, l.addNamespace)(u.default.cancel, "dxNumberBox");
var m = r.default.inherit({
  _getDefaultOptions: function () {
    return (0, s.extend)(this.callBase(), {
      direction: "up",
      onChange: null,
      activeStateEnabled: true,
      hoverStateEnabled: true
    });
  },
  _initMarkup: function () {
    this.callBase();
    var e = "dx-numberbox-spin-" + this.option("direction");
    this.$element().addClass("dx-numberbox-spin-button").addClass(e);
    this._spinIcon = (0, i.default)("<div>").addClass(e + "-icon").appendTo(this.$element());
  },
  _render: function () {
    this.callBase();
    var e = (0, l.addNamespace)(u.default.down, this.NAME);
    var t = this.$element();
    a.default.off(t, e);
    a.default.on(t, e, this._spinDownHandler.bind(this));
    this._spinChangeHandler = this._createActionByOption("onChange");
  },
  _spinDownHandler: function (e) {
    e.preventDefault();
    this._clearTimer();
    a.default.on(this.$element(), c.default.name, function () {
      this._feedBackDeferred = new h.Deferred();
      (0, d.lock)(this._feedBackDeferred);
      this._spinChangeHandler({
        event: e
      });
      this._holdTimer = setInterval(this._spinChangeHandler, 100, {
        event: e
      });
    }.bind(this));
    var t = o.default.getDocument();
    a.default.on(t, p, this._clearTimer.bind(this));
    a.default.on(t, g, this._clearTimer.bind(this));
    this._spinChangeHandler({
      event: e
    });
  },
  _dispose: function () {
    this._clearTimer();
    this.callBase();
  },
  _clearTimer: function () {
    a.default.off(this.$element(), c.default.name);
    var e = o.default.getDocument();
    a.default.off(e, p);
    a.default.off(e, g);
    if (this._feedBackDeferred) {
      this._feedBackDeferred.resolve();
    }
    if (this._holdTimer) {
      clearInterval(this._holdTimer);
    }
  },
  _optionChanged: function (e) {
    switch (e.name) {
      case "onChange":
      case "direction":
        this._invalidate();
        break;
      default:
        this.callBase(e);
    }
  }
});
exports.default = m;
module.exports = exports.default;
module.exports.default = exports.default;